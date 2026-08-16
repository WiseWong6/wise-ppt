#!/usr/bin/env python3
"""Build, validate and audit Catalog static thumbnails.

The HTML/component sources remain the source of truth.  Files under
references/catalog-thumbnails/ are a reproducible cache for catalog.html.
"""

from __future__ import annotations

import argparse
import contextlib
import hashlib
import io
import json
import os
import re
import shutil
import sys
import threading
import time
from datetime import datetime, timezone
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import quote


ROOT = Path(__file__).resolve().parents[1]
REFERENCES = ROOT / "references"
CATALOG = REFERENCES / "catalog.html"
OUTPUT_DIR = REFERENCES / "catalog-thumbnails"
MANIFEST = OUTPUT_DIR / "manifest.json"
WIDTH = 640
HEIGHT = 360
QUALITY = 82
EXPECTED_PAGES = 81
EXPECTED_COMPONENTS = 72
EXPECTED_TOTAL = EXPECTED_PAGES + EXPECTED_COMPONENTS
CHROME_CANDIDATES = (
    Path("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"),
    Path("/Applications/Chromium.app/Contents/MacOS/Chromium"),
)
COMPONENT_INPUTS = (
    "references/catalog.html",
    "themes/paper-ink/assets/design-tokens.css",
    "themes/paper-ink/adapters/atlas.js",
    "themes/paper-ink/adapters/echarts.js",
    "references/ppt-component-atlas/catalog-data.js",
    "capabilities/layouts/paper-ink-components.js",
    "capabilities/vendors/echarts/echarts.min.js",
    "references/gallery-components/echarts-catalog-data.js",
    "references/gallery-components/echarts-theme-adapter.js",
)
LOCAL_REF_RE = re.compile(
    r"(?:\b(?:src|href)\s*=\s*['\"]([^'\"]+)['\"]|url\(\s*['\"]?([^)'\"]+))",
    re.IGNORECASE,
)


def fail(message: str) -> "NoReturn":
    print(f"错误: {message}", file=sys.stderr)
    raise SystemExit(1)


def require_dependencies():
    try:
        from PIL import Image, features
    except ImportError as exc:
        fail(f"缺少 Pillow: {exc}。请先在当前 Python 环境安装，脚本不会自动安装依赖。")
    if not features.check("webp"):
        fail("当前 Pillow 不支持 WebP。请换用带 WebP 支持的 Pillow，脚本不会自动安装依赖。")
    try:
        from playwright.sync_api import sync_playwright
    except ImportError as exc:
        fail(f"缺少 Python Playwright: {exc}。请先安装并配置，脚本不会自动安装依赖。")

    configured = os.environ.get("CATALOG_CHROME_PATH")
    candidates = ([Path(configured)] if configured else []) + list(CHROME_CANDIDATES)
    executable = next((path for path in candidates if path.is_file()), None)
    if executable is None:
        fallback = shutil.which("google-chrome") or shutil.which("chromium")
        executable = Path(fallback) if fallback else None
    if executable is None:
        fail("未找到 Chrome/Chromium。可通过 CATALOG_CHROME_PATH 指定可执行文件。")
    return Image, sync_playwright, executable


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, _format, *_args):
        return


@contextlib.contextmanager
def local_server():
    handler = partial(QuietHandler, directory=str(ROOT))
    server = ThreadingHTTPServer(("127.0.0.1", 0), handler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    try:
        yield f"http://127.0.0.1:{server.server_address[1]}"
    finally:
        server.shutdown()
        server.server_close()
        thread.join(timeout=5)


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def inside_root(path: Path) -> bool:
    try:
        path.resolve().relative_to(ROOT)
        return True
    except ValueError:
        return False


class SourceDigests:
    def __init__(self):
        self.file_hashes: dict[Path, str] = {}
        self.graph_hashes: dict[Path, str] = {}

    def file_hash(self, path: Path) -> str:
        path = path.resolve()
        if path not in self.file_hashes:
            self.file_hashes[path] = sha256_file(path)
        return self.file_hashes[path]

    def dependencies(self, path: Path) -> list[Path]:
        if path.suffix.lower() not in {".html", ".css", ".js"}:
            return []
        try:
            text = path.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            return []
        found: list[Path] = []
        for match in LOCAL_REF_RE.finditer(text):
            raw = (match.group(1) or match.group(2) or "").strip()
            raw = raw.split("#", 1)[0].split("?", 1)[0]
            if not raw or raw.startswith(("data:", "http:", "https:", "//", "#")):
                continue
            candidate = (path.parent / raw).resolve()
            if inside_root(candidate) and candidate.is_file():
                found.append(candidate)
        return found

    def graph_hash(self, path: Path) -> str:
        path = path.resolve()
        if path in self.graph_hashes:
            return self.graph_hashes[path]
        visited: set[Path] = set()
        rows: list[str] = []

        def walk(current: Path):
            current = current.resolve()
            if current in visited or not current.is_file():
                return
            visited.add(current)
            rows.append(f"{current.relative_to(ROOT)}\0{self.file_hash(current)}")
            for child in self.dependencies(current):
                walk(child)

        walk(path)
        value = sha256_bytes("\n".join(sorted(rows)).encode())
        self.graph_hashes[path] = value
        return value


def browser_inventory(browser, base_url: str) -> list[dict]:
    page = browser.new_page(viewport={"width": 1280, "height": 720})
    try:
        page.goto(f"{base_url}/references/catalog.html?thumbgen=1", wait_until="load")
        page.wait_for_function("() => !!(window.WiseCatalogThumbgen && WiseCatalogThumbgen.inventory)")
        inventory = page.evaluate("WiseCatalogThumbgen.inventory()")
    finally:
        page.close()
    return inventory


def normalize_inventory(inventory: list[dict]) -> dict[str, dict]:
    unique: dict[str, dict] = {}
    for item in inventory:
        thumb = item.get("thumb") or ""
        if not thumb.startswith("catalog-thumbnails/") or not thumb.endswith(".webp"):
            fail(f"非法 data-thumb 路径: {thumb!r}")
        identity = (item.get("frame"), item.get("spec"))
        if bool(identity[0]) == bool(identity[1]):
            fail(f"缩略图映射必须且只能有 frame/spec 之一: {item}")
        previous = unique.get(thumb)
        if previous and (previous.get("frame"), previous.get("spec")) != identity:
            fail(f"data-thumb 碰撞: {thumb} 同时映射到 {previous} 与 {item}")
        unique.setdefault(thumb, item)
    pages = sum(bool(item.get("frame")) for item in unique.values())
    components = sum(bool(item.get("spec")) for item in unique.values())
    if (pages, components, len(unique)) != (EXPECTED_PAGES, EXPECTED_COMPONENTS, EXPECTED_TOTAL):
        fail(
            f"映射数量不符: 页面 {pages}/{EXPECTED_PAGES}，组件 {components}/{EXPECTED_COMPONENTS}，"
            f"总计 {len(unique)}/{EXPECTED_TOTAL}"
        )
    return dict(sorted(unique.items()))


def component_renderer_digest(digests: SourceDigests) -> str:
    rows = []
    for relative in COMPONENT_INPUTS:
        path = ROOT / relative
        if not path.is_file():
            fail(f"组件渲染依赖不存在: {path}")
        rows.append(f"{relative}\0{digests.graph_hash(path)}")
    rows.append(f"generator\0{digests.file_hash(Path(__file__))}")
    return sha256_bytes("\n".join(rows).encode())


def expected_entries(inventory: dict[str, dict]) -> dict[str, dict]:
    digests = SourceDigests()
    component_digest = component_renderer_digest(digests)
    entries: dict[str, dict] = {}
    for thumb, item in inventory.items():
        row = {
            "kind": "page" if item.get("frame") else "component",
            "frame": item.get("frame"),
            "spec": item.get("spec"),
            "title": item.get("title") or "",
        }
        if row["kind"] == "page":
            source = (REFERENCES / row["frame"]).resolve()
            if not inside_root(source) or not source.is_file():
                fail(f"页面源不存在: {row['frame']}")
            source_digest = digests.graph_hash(source)
            seed = f"catalog-thumb-v1\0{row['frame']}\0{source_digest}\0{WIDTH}x{HEIGHT}\0q{QUALITY}"
        else:
            seed = f"catalog-thumb-v1\0{row['spec']}\0{component_digest}\0{WIDTH}x{HEIGHT}\0q{QUALITY}"
        row["fingerprint"] = sha256_bytes(seed.encode())
        entries[thumb] = row
    return entries


def load_manifest() -> dict:
    if not MANIFEST.is_file():
        return {}
    try:
        return json.loads(MANIFEST.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        fail(f"manifest 无法读取: {exc}")


def image_is_valid(path: Path, Image) -> bool:
    try:
        with Image.open(path) as image:
            return image.format == "WEBP" and image.size == (WIDTH, HEIGHT)
    except (OSError, ValueError):
        return False


def save_webp(png: bytes, target: Path, Image):
    target.parent.mkdir(parents=True, exist_ok=True)
    temporary = target.with_name(target.name + ".tmp")
    with Image.open(io.BytesIO(png)) as source:
        image = source.convert("RGB")
        if image.size != (WIDTH, HEIGHT):
            image = image.resize((WIDTH, HEIGHT), Image.Resampling.LANCZOS)
        image.save(temporary, format="WEBP", quality=QUALITY, method=6, exact=True)
    os.replace(temporary, target)


def install_determinism(context):
    context.add_init_script(
        """
        (() => {
          let state = 0x5eed1234;
          Math.random = () => {
            state |= 0; state = state + 0x6D2B79F5 | 0;
            let t = Math.imul(state ^ state >>> 15, 1 | state);
            t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
            return ((t ^ t >>> 14) >>> 0) / 4294967296;
          };
        })();
        """
    )


def wait_page_ready(page):
    page.evaluate(
        """async () => {
          if (document.fonts && document.fonts.ready) await document.fonts.ready;
          await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        }"""
    )
    page.wait_for_timeout(180)


def build(browser, base_url: str, inventory: dict[str, dict], expected: dict[str, dict], Image):
    prior = load_manifest().get("entries", {})
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    pending = []
    for thumb, row in expected.items():
        target = REFERENCES / thumb
        old = prior.get(thumb, {})
        if (
            old.get("fingerprint") == row["fingerprint"]
            and image_is_valid(target, Image)
            and old.get("sha256") == sha256_file(target)
        ):
            row.update({"sha256": old["sha256"], "bytes": target.stat().st_size})
        else:
            pending.append((thumb, row))

    page_jobs = [(thumb, row) for thumb, row in pending if row["kind"] == "page"]
    component_jobs = [(thumb, row) for thumb, row in pending if row["kind"] == "component"]
    print(f"缩略图: {len(expected) - len(pending)} 张命中缓存，{len(pending)} 张需要生成")

    context = browser.new_context(viewport={"width": 1920, "height": 1080}, device_scale_factor=1)
    install_determinism(context)
    frame_page = context.new_page()
    component_page = context.new_page()
    try:
        for index, (thumb, row) in enumerate(page_jobs, 1):
            url = f"{base_url}/references/{quote(row['frame'], safe='/')}"
            frame_page.set_viewport_size({"width": 1920, "height": 1080})
            frame_page.goto(url, wait_until="load")
            frame_page.add_style_tag(
                content="*,*::before,*::after{animation-duration:0s!important;animation-delay:0s!important;transition:none!important}"
            )
            wait_page_ready(frame_page)
            png = frame_page.screenshot(type="png", animations="disabled")
            target = REFERENCES / thumb
            save_webp(png, target, Image)
            row.update({"sha256": sha256_file(target), "bytes": target.stat().st_size})
            print(f"  页面 {index:02d}/{len(page_jobs):02d} {row['frame']}")

        if component_jobs:
            component_page.set_viewport_size({"width": 1280, "height": 720})
            component_page.goto(f"{base_url}/references/catalog.html?thumbgen=1", wait_until="load")
            component_page.wait_for_function("() => !!(window.WiseCatalogThumbgen && WiseCatalogThumbgen.renderSpec)")
            component_page.add_style_tag(
                content="*,*::before,*::after{animation-duration:0s!important;animation-delay:0s!important;transition:none!important}"
            )
        for index, (thumb, row) in enumerate(component_jobs, 1):
            component_page.evaluate("spec => WiseCatalogThumbgen.renderSpec(spec)", row["spec"])
            component_page.wait_for_function(
                "document.querySelector('#thumbgen-stage').dataset.renderReady === '1'"
            )
            png = component_page.locator("#thumbgen-stage").screenshot(type="png", animations="disabled")
            target = REFERENCES / thumb
            save_webp(png, target, Image)
            row.update({"sha256": sha256_file(target), "bytes": target.stat().st_size})
            print(f"  组件 {index:02d}/{len(component_jobs):02d} {row['spec']}")
    finally:
        context.close()

    expected_targets = {(REFERENCES / thumb).resolve() for thumb in expected}
    stale_files = sorted(path for path in OUTPUT_DIR.glob("*.webp") if path.resolve() not in expected_targets)
    for path in stale_files:
        path.unlink()
    if stale_files:
        print(f"清理: {len(stale_files)} 张已摘牌的缩略图缓存")

    manifest = {
        "version": 1,
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "width": WIDTH,
        "height": HEIGHT,
        "format": "webp",
        "quality": QUALITY,
        "entries": expected,
    }
    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    total_bytes = sum(row["bytes"] for row in expected.values())
    print(f"完成: {len(expected)} 张，{total_bytes / 1024 / 1024:.2f} MB，manifest={MANIFEST}")


def check(inventory: dict[str, dict], expected: dict[str, dict], Image, quiet: bool = False) -> list[str]:
    problems: list[str] = []
    manifest = load_manifest()
    if not manifest:
        problems.append(f"缺少 manifest: {MANIFEST}")
        return problems
    if (manifest.get("width"), manifest.get("height"), manifest.get("quality")) != (WIDTH, HEIGHT, QUALITY):
        problems.append("manifest 输出参数与脚本不一致")
    actual = manifest.get("entries", {})
    expected_keys = set(expected)
    actual_keys = set(actual)
    expected_targets = {(REFERENCES / thumb).resolve() for thumb in expected}
    for path in sorted(OUTPUT_DIR.glob("*.webp")):
        if path.resolve() not in expected_targets:
            problems.append(f"存在已摘牌的缩略图缓存: {path.relative_to(REFERENCES)}")
    for missing in sorted(expected_keys - actual_keys):
        problems.append(f"manifest 缺少映射: {missing}")
    for extra in sorted(actual_keys - expected_keys):
        problems.append(f"manifest 存在多余映射: {extra}")
    for thumb, row in expected.items():
        target = REFERENCES / thumb
        recorded = actual.get(thumb, {})
        if recorded.get("fingerprint") != row["fingerprint"]:
            problems.append(f"缩略图已过期: {thumb}")
            continue
        if not target.is_file():
            problems.append(f"缺少缩略图: {thumb}")
            continue
        if not image_is_valid(target, Image):
            problems.append(f"格式或尺寸错误: {thumb}，要求 WebP {WIDTH}×{HEIGHT}")
            continue
        digest = sha256_file(target)
        if recorded.get("sha256") != digest:
            problems.append(f"文件摘要不匹配: {thumb}")
    if not quiet and not problems:
        print(
            f"检查通过: {len(expected)} 个唯一映射（页面 {EXPECTED_PAGES} + 组件 {EXPECTED_COMPONENTS}），"
            f"无缺失、碰撞、尺寸错误或过期缓存"
        )
    return problems


def audit_startup(browser, url: str, label: str) -> dict:
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    requests: list[str] = []
    errors: list[str] = []
    page.on("request", lambda request: requests.append(request.url))
    page.on("pageerror", lambda error: errors.append(str(error)))
    page.on("console", lambda message: errors.append(message.text) if message.type == "error" else None)
    try:
        page.goto(url, wait_until="load")
        page.wait_for_timeout(250)
        metrics = page.evaluate(
            r"""() => ({
              loadEventEnd: performance.getEntriesByType('navigation')[0].loadEventEnd,
              iframes: document.querySelectorAll('iframe').length,
              fonts: [...performance.getEntriesByType('resource')].filter(x => /\/fonts\//.test(x.name)).map(x => x.name),
              componentResources: [...performance.getEntriesByType('resource')].filter(x => /catalog-data\.js|paper-ink-components\.js|echarts/i.test(x.name)).map(x => x.name),
              tabs: [...document.querySelectorAll('.tab')].map(x => x.dataset.t),
              counts: {
                tpl: document.querySelectorAll('#m-tpl [data-frame]').length,
                lyt: document.querySelectorAll('#m-lyt [data-frame]').length,
                structures: document.querySelectorAll('#m-str .struct-section').length,
                structurePages: new Set([...document.querySelectorAll('#m-str [data-frame]')].map(x => x.dataset.frame)).size,
                cmp: document.querySelectorAll('#m-cmp [data-spec]').length
              }
            })"""
        )
        metrics["errors"] = errors
        metrics["requestCount"] = len(requests)
        if metrics["loadEventEnd"] > 1500:
            fail(f"{label} 冷启动 {metrics['loadEventEnd']:.1f}ms，超过 1500ms")
        if metrics["iframes"] != 0 or metrics["fonts"] or metrics["componentResources"] or errors:
            fail(f"{label} 首屏资源门禁失败: {metrics}")
        return metrics
    finally:
        page.close()


def run_interaction_audit(browser, file_url: str) -> dict:
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    errors: list[str] = []
    page.on("pageerror", lambda error: errors.append(str(error)))
    page.on("console", lambda message: errors.append(message.text) if message.type == "error" else None)
    try:
        page.goto(file_url, wait_until="load")
        page.wait_for_timeout(250)
        for tab in ("tpl", "lyt", "str", "cmp"):
            page.evaluate("tab => switchTab(tab)", tab)
            if tab == "str":
                buttons = page.locator("[data-struct-jump]")
                for index in range(buttons.count()):
                    buttons.nth(index).evaluate("button => button.click()")
                    page.evaluate("scrollTo(0, document.body.scrollHeight)")
                    page.wait_for_timeout(40)
            else:
                height = page.evaluate("document.body.scrollHeight")
                for y in range(0, height + 1, 900):
                    page.evaluate("y => scrollTo(0, y)", y)
                    page.wait_for_timeout(20)
        heap1 = page.evaluate("performance.memory ? performance.memory.usedJSHeapSize : 0")
        for tab in ("tpl", "lyt", "str", "cmp"):
            page.evaluate("tab => switchTab(tab)", tab)
            page.evaluate("scrollTo(0, document.body.scrollHeight)")
            page.wait_for_timeout(40)
        heap2 = page.evaluate("performance.memory ? performance.memory.usedJSHeapSize : 0")
        if heap2 and heap2 > 80 * 1024 * 1024:
            fail(f"滚动全部页签后 JS heap {heap2 / 1024 / 1024:.1f} MB，超过 80 MB")
        if page.locator("main iframe").count() != 0:
            fail("卡片列表出现 iframe")

        page.evaluate("switchTab('tpl'); scrollTo(0,0)")
        first = page.locator("#m-tpl [data-modal]").first
        first.click()
        page.wait_for_function("document.querySelector('#layer').classList.contains('on')")
        immediate_thumb = page.locator("#layer-stage .layer-thumb").count()
        page.wait_for_function("document.querySelector('#layer-stage').dataset.liveReady === '1'", timeout=12000)
        if page.locator("#layer-stage iframe").count() != 1:
            fail("页面浮层实时 iframe 数不是 1")
        page.keyboard.press("ArrowRight")
        page.wait_for_function("document.querySelector('#layer-stage').dataset.liveReady === '1'", timeout=12000)
        if page.locator("#layer-stage iframe").count() > 1:
            fail("浮层翻页后存在多个 iframe")
        page.keyboard.press("Escape")
        if page.locator("iframe").count() != 0:
            fail("关闭浮层后 iframe 未归零")

        page.evaluate("switchTab('cmp'); scrollTo(0,0)")
        page.locator("#m-cmp [data-spec]").first.click()
        page.wait_for_function("document.querySelector('#layer-stage').dataset.liveReady === '1'", timeout=20000)
        page.keyboard.press("Escape")
        ec_card = page.locator('#m-cmp [data-spec^="ec:"]').first
        ec_card.evaluate("card => card.click()")
        page.wait_for_function("document.querySelector('#layer-stage').dataset.liveReady === '1'", timeout=20000)
        page.keyboard.press("Escape")
        variant = page.locator("#m-cmp [data-vr]").first
        variant.evaluate("card => card.click()")
        page.wait_for_function("document.querySelector('#layer-stage').dataset.liveReady === '1'", timeout=20000)
        trigger = page.locator("#layer-variants .variant-trigger")
        if trigger.count() != 1:
            fail("组件变体浮层未生成选择器")
        trigger.click()
        options = page.locator("#layer-variants .variant-option")
        if options.count() < 2:
            fail("组件变体选择器未生成完整菜单")
        options.nth(1).click()
        page.wait_for_function("document.querySelector('#layer-stage').dataset.liveReady === '1'", timeout=20000)
        page.keyboard.press("Escape")
        timeline = page.locator('#m-cmp [data-spec="new:8"]')
        timeline.evaluate("card => card.click()")
        page.wait_for_function("document.querySelector('#layer-stage').dataset.liveReady === '1'", timeout=20000)
        timeline_trigger = page.locator("#layer-variants .variant-trigger")
        if timeline_trigger.count() != 1:
            fail("时间轴横竖变体未生成选择器")
        timeline_trigger.click()
        timeline_options = page.locator("#layer-variants .variant-option")
        if timeline_options.count() != 2:
            fail("时间轴横竖变体数量不是 2")
        timeline_options.nth(1).click()
        page.wait_for_function("document.querySelector('#layer-stage').dataset.liveReady === '1'", timeout=20000)
        if page.locator('#layer-stage svg[viewBox="0 0 900 1000"]').count() != 1:
            fail("时间轴竖排变体未渲染正确画布")
        page.keyboard.press("Escape")
        if errors:
            fail("交互回归出现控制台错误: " + " | ".join(errors[:5]))
        return {
            "heapFirstMB": round(heap1 / 1024 / 1024, 2) if heap1 else None,
            "heapSecondMB": round(heap2 / 1024 / 1024, 2) if heap2 else None,
            "immediateFacade": bool(immediate_thumb),
            "iframesAfterClose": page.locator("iframe").count(),
        }
    finally:
        page.close()


def audit(browser, base_url: str):
    file_url = CATALOG.resolve().as_uri()
    file_metrics = audit_startup(browser, file_url, "file://")
    http_metrics = audit_startup(browser, f"{base_url}/references/catalog.html", "HTTP")
    interaction = run_interaction_audit(browser, file_url)
    print(
        "审计通过: "
        f"file:// load={file_metrics['loadEventEnd']:.1f}ms，"
        f"HTTP load={http_metrics['loadEventEnd']:.1f}ms，"
        f"heap={interaction['heapSecondMB']}MB，列表 iframe=0，关闭浮层 iframe=0"
    )


def main():
    parser = argparse.ArgumentParser(description="生成、检查和审计 Catalog 640×360 WebP 缩略图缓存")
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument("--check", action="store_true", help="只检查映射、尺寸、摘要和过期状态")
    mode.add_argument("--audit", action="store_true", help="检查后执行 file:// 与 HTTP 性能/交互审计")
    args = parser.parse_args()

    Image, sync_playwright, chrome = require_dependencies()
    with local_server() as base_url, sync_playwright() as playwright:
        browser = playwright.chromium.launch(
            executable_path=str(chrome),
            headless=True,
            args=["--enable-precise-memory-info"],
        )
        try:
            inventory = normalize_inventory(browser_inventory(browser, base_url))
            expected = expected_entries(inventory)
            if args.check or args.audit:
                problems = check(inventory, expected, Image)
                if problems:
                    for problem in problems:
                        print(f"- {problem}", file=sys.stderr)
                    fail(f"检查失败，共 {len(problems)} 项")
                if args.audit:
                    audit(browser, base_url)
            else:
                build(browser, base_url, inventory, expected, Image)
                problems = check(inventory, expected, Image, quiet=True)
                if problems:
                    fail("生成后自检失败: " + " | ".join(problems[:5]))
        finally:
            browser.close()


if __name__ == "__main__":
    main()
