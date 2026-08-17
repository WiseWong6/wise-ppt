#!/usr/bin/env python3
"""wise-ppt 成品合同 v2 静态门禁。

正式检查: python3 scripts/check_deck_contract.py <deck目录>
旧成品诊断: python3 scripts/check_deck_contract.py --diagnose-legacy <deck目录>
"""
from __future__ import annotations

import json
import hashlib
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

try:
    from bs4 import BeautifulSoup
except ImportError as exc:
    raise SystemExit("缺少 beautifulsoup4，无法执行成品 DOM 合同检查") from exc

REPO_ROOT = Path(__file__).resolve().parents[1]
COMPONENT_MANIFEST = REPO_ROOT / "capabilities/components/routing-manifest.json"
GALLERY_MANIFEST = REPO_ROOT / "capabilities/layouts/gallery-manifest.json"
TEMPLATE_MANIFEST = REPO_ROOT / "capabilities/layouts/nonrelation-template-contracts.json"
CATALOG_AUTHORITY = REPO_ROOT / "capabilities/catalog-authority-manifest.json"
ICON_ROOT = REPO_ROOT / "capabilities/vendors/tabler-outline/redraw-v3/svg"
TYPE_ROLES = {"display", "hero", "title", "metric", "heading", "emphasis", "caption", "subheading", "body", "body-small", "micro-secondary", "label", "meta"}
LARGE_ROLES = {"display", "hero", "title"}
TRANSITIONS, CLOSINGS = {"D5", "M1", "M2"}, {"D2", "D3", "D6"}
ID_PARAM_RE = re.compile(r"\b([a-z0-9-]+(?:\.[a-z0-9-]+)+)\{([^}]*)\}")
RECIPE_BLOCK_RE = re.compile(r"^native\.(paper-ink\.[a-z0-9.-]+)\.([a-z0-9-]+)$")
PLAN_PAGE_RE = re.compile(r"^###\s+p(\d+)\b", re.M | re.I)
PLAN_CONTRACT_RE = re.compile(r"成品合同\*{0,2}\s*[:：]\s*(.+)")
PLAN_LAYOUT_RE = re.compile(r"套版式\s*[:：]\s*([A-Z]\d{1,2})", re.I)
PAIR_WAIVER_RE = re.compile(r"^\s*-\s*\**节奏页对豁免\**\s*[:：]\s*p(\d+)\s*→\s*p(\d+)\s*\|\s*(\S.+)$", re.M | re.I)
LAYOUT_CODE_RE = re.compile(r"\b([A-Z]\d{1,2})\b")
FIT_WAIVER_RE = re.compile(r"拒套\s*[:：]\s*([A-Z]\d{1,2})\s*\|\s*\S+")
PLAN_SELECT_RE = re.compile(r"③\s*选定\s*[:：]\s*\*\*(.+?)\*\*")
PRIMITIVE_RE = re.compile(r"^(?:单区|(?:左右|上下)x等分|左右不对称|上下不对称|网格\d{1,2}x\d{1,2}|非关系模板:\S+)$")
TITLE_FW_BUDGET = 28.0


def fullwidth_units(text: str) -> float:
    """画册卡标题宽度当量:汉字类=1、半角=0.7(画册卡 mono 13px,半角 advance 实测 ≈0.69em)。"""
    return sum(1.0 if ord(ch) > 0xFF else 0.7 for ch in text)


def load_manifests():
    data = json.loads(COMPONENT_MANIFEST.read_text(encoding="utf-8"))
    by_id, aliases = {}, {}
    for comp in data["components"]:
        by_id[comp["component_id"]] = comp
        for alias in comp.get("aliases", []):
            aliases[alias] = comp["component_id"]
    gallery_slots, gallery_recipes = {}, {}
    if GALLERY_MANIFEST.is_file():
        gallery = json.loads(GALLERY_MANIFEST.read_text(encoding="utf-8"))
        for recipe in gallery.get("recipes", []):
            gallery_slots[recipe["recipe_id"]] = {s["slot_id"]: s for s in recipe.get("slots", [])}
            gallery_recipes[recipe["recipe_id"]] = recipe
    templates = json.loads(TEMPLATE_MANIFEST.read_text(encoding="utf-8"))["templates"]
    authority = json.loads(CATALOG_AUTHORITY.read_text(encoding="utf-8"))
    selected_icons = {item["name"]: item for item in authority["icons"]["entries"]}
    relations = set(data["relation_key_vocabulary"])
    return by_id, aliases, gallery_slots, gallery_recipes, templates, authority, selected_icons, relations


def resolve_component(component_id, by_id, aliases, gallery_slots):
    if component_id in by_id:
        return "component", by_id[component_id]
    canonical = aliases.get(component_id)
    if canonical in by_id:
        return "component", by_id[canonical]
    match = RECIPE_BLOCK_RE.match(component_id)
    if match and match.group(1) in gallery_slots and match.group(2) in gallery_slots[match.group(1)]:
        return "recipe-block", None
    return None, None


def parse_plan(text: str):
    pages = {}
    starts = list(PLAN_PAGE_RE.finditer(text))
    for index, match in enumerate(starts):
        page = int(match.group(1))
        end = starts[index + 1].start() if index + 1 < len(starts) else len(text)
        block = text[match.start():end]
        fields = {}
        found = PLAN_CONTRACT_RE.search(block)
        if found:
            for item in found.group(1).split("|"):
                if "=" in item:
                    key, value = item.split("=", 1)
                    fields[key.strip()] = value.strip().strip("`* ")
        pages[page] = {"block": block, "fields": fields}
    waivers = {(int(a), int(b)): reason.strip() for a, b, reason in PAIR_WAIVER_RE.findall(text)}
    return pages, waivers


def geometry_primitive(slide) -> str | None:
    contract = geometry_contract(slide)
    return contract.get("primitive") if contract else None


def geometry_contract(slide) -> dict | None:
    script = slide.select_one("script[data-geometry-contract]")
    if not script:
        return None
    try:
        value = json.loads(script.get_text())
        return value if isinstance(value, dict) else None
    except (json.JSONDecodeError, TypeError):
        return None


def normalize_svg_geometry(text: str) -> tuple:
    try:
        root = ET.fromstring(text)
    except ET.ParseError:
        return ()
    keep = {"d", "points", "x", "y", "x1", "y1", "x2", "y2", "cx", "cy", "r", "rx", "ry", "width", "height", "transform"}
    result = []
    for node in root.iter():
        tag = node.tag.rsplit("}", 1)[-1]
        if tag in {"path", "line", "polyline", "polygon", "circle", "ellipse", "rect"}:
            result.append((tag, tuple(sorted((k, v) for k, v in node.attrib.items() if k in keep))))
    return tuple(result)


def style_px(style: str, name: str) -> float | None:
    match = re.search(rf"(?:^|;)\s*{re.escape(name)}\s*:\s*(-?\d+(?:\.\d+)?)px\b", style, re.I)
    return float(match.group(1)) if match else None


def contract_only_is_visible(node) -> bool:
    if node.get_text(strip=True):
        return True
    style = (node.get("style") or "").replace(" ", "").lower()
    return not (node.get("aria-hidden") == "true" and any(v in style for v in ("display:none", "visibility:hidden", "opacity:0")))


POSITION_STYLE_FIELDS = {
    "position", "left", "right", "top", "bottom", "inset", "width", "height",
    "min-width", "min-height", "max-width", "max-height", "transform",
}
POSITION_ATTR_FIELDS = ("width", "height", "viewbox", "transform")


def normalized_position_style(style: str) -> tuple[tuple[str, str], ...]:
    fields = []
    for declaration in style.split(";"):
        if ":" not in declaration:
            continue
        key, value = declaration.split(":", 1)
        key = key.strip().lower()
        if key in POSITION_STYLE_FIELDS:
            fields.append((key, re.sub(r"\s+", " ", value.strip())))
    return tuple(sorted(fields))


def template_node_signature(node, include_children: bool = False) -> tuple:
    """只锁模板结构/类名/定位；文字和其他内容属性允许替换。"""
    attrs = tuple((name, node.get(name)) for name in POSITION_ATTR_FIELDS if node.get(name) is not None)
    children = ()
    if include_children:
        children = tuple(
            template_node_signature(child, include_children=True)
            for child in node.find_all(recursive=False)
            if getattr(child, "name", None) not in {"script", "style"}
        )
    return (
        node.name,
        tuple(sorted(node.get("class") or [])),
        attrs,
        normalized_position_style(node.get("style") or ""),
        children,
    )


def template_reference(contract: dict):
    path = REPO_ROOT / contract["source"]
    soup = BeautifulSoup(path.read_text(encoding="utf-8"), "html.parser")
    stage = soup.select_one(".stage")
    if not stage:
        raise ValueError(f"参考帧缺少 .stage: {contract['source']}")
    parts = [node for node in stage.find_all(attrs={"data-template-part": True}, recursive=False)]
    return stage, parts


def diagnose_legacy(soup, plan_text: str, fails: list[str], deck: Path):
    slides = soup.select("#track > section.slide") or soup.select("section.slide")
    plan_pages, _ = parse_plan(plan_text)
    asset_texts = []
    for node, attr in [(n, "href") for n in soup.select("link[href]")] + [(n, "src") for n in soup.select("script[src]")]:
        value = (node.get(attr) or "").split("?", 1)[0].split("#", 1)[0]
        if not value or re.match(r"^(?:[a-z]+:|//)", value, re.I):
            continue
        path = (deck / value).resolve()
        if path.is_file():
            try:
                asset_texts.append(path.read_text(encoding="utf-8"))
            except (UnicodeDecodeError, OSError):
                pass
    assets = "\n".join(asset_texts)
    shell_border = bool(re.search(
        r"\[data-layout-slot\]\s+\.swiss-card\s*\{[^}]*\bborder\s*:\s*(?!0(?:\D|$))[^;}]+",
        assets,
        re.I | re.S,
    ))
    inner_preview_height = bool(re.search(r"\.swiss-card__content\s*\{[^}]*min-height\s*:\s*600px", assets, re.I | re.S))
    inner_reset = bool(re.search(
        r"\[data-layout-slot\]\s+\.swiss-card__content[^{}]*\{[^}]*min-height\s*:\s*(?:0|auto)",
        assets,
        re.I | re.S,
    ))
    for number, slide in enumerate(slides, 1):
        block = str(slide)
        sizes = [float(v) for v in re.findall(r"font-size\s*:\s*(\d+(?:\.\d+)?)px", block, re.I)]
        large_tokens = re.findall(
            r"(?:WisePPT\.typeSize\(\s*['\"]|var\(--type-)(display|hero|title)(?:['\"]\s*\)|\))",
            block,
            re.I,
        )
        large_count = sum(v >= 60 for v in sizes) + len(large_tokens)
        if large_count > 1:
            fails.append(f"p{number:02d} 字阶: 同页出现 {large_count} 个 title/hero/display 级主文字")
        if re.search(r"\b(?:placeholder|todo)\b", slide.get_text(" ", strip=True), re.I):
            fails.append(f"p{number:02d} 占位符: 出现 placeholder/TODO")
        scripted_cross = re.search(
            r"el\(\s*['\"]rect['\"]\s*,\s*\{\s*x\s*:\s*(?P<x1>\d+(?:\.\d+)?)\s*,\s*y\s*:\s*(?P<y1>[^,}]+)\s*,\s*width\s*:\s*64\s*,\s*height\s*:\s*64\b[^}]*\}.*?"
            r"el\(\s*['\"]line['\"]\s*,\s*\{\s*x1\s*:\s*(?P=x1)\s*,\s*y1\s*:\s*(?P=y1)\s*,\s*x2\s*:\s*(?P<x2>\d+(?:\.\d+)?)\s*,\s*y2\s*:\s*(?P<y2>[^,}]+).*?"
            r"el\(\s*['\"]line['\"]\s*,\s*\{\s*x1\s*:\s*(?P=x2)\s*,\s*y1\s*:\s*(?P=y1)\s*,\s*x2\s*:\s*(?P=x1)\s*,\s*y2\s*:\s*(?P=y2)",
            block,
            re.I | re.S,
        )
        if scripted_cross:
            fails.append(f"p{number:02d} 占位符: 疑似矩形加双对角线叉号")
        atlas_on_page = False
        for slot in slide.select("[data-layout-slot]"):
            width = style_px(slot.get("style") or "", "width")
            component_id = slot.get("data-component-id")
            if not component_id:
                component = slot.select_one("[data-component-id]")
                component_id = component.get("data-component-id") if component else None
            atlas_on_page = atlas_on_page or bool(component_id and component_id.startswith("atlas."))
            if width and component_id == "atlas.002.list-card" and width < 620:
                fails.append(f"p{number:02d} 组件槽: atlas.002.list-card 实际 {width:g}px < 620px")
        if atlas_on_page and (shell_border or (inner_preview_height and not inner_reset)):
            details = []
            if shell_border:
                details.append("外框 border 未归零")
            if inner_preview_height and not inner_reset:
                details.append("__content 的 600px 预览高度未归零")
            fails.append(f"p{number:02d} 组件外壳: {'；'.join(details)}")
    template_by_page = {}
    for number, page in plan_pages.items():
        found = re.search(r"\b([DM]\d+)\b", page["block"])
        if found:
            template_by_page[number] = found.group(1).upper()
    for number in range(1, len(slides)):
        if template_by_page.get(number) in TRANSITIONS and template_by_page.get(number + 1) in CLOSINGS:
            fails.append(f"p{number:02d}→p{number + 1:02d} 节奏: 过渡模板紧接收尾模板")
    for number, declared in template_by_page.items():
        if number > len(slides):
            continue
        actual = re.search(r"\b([DM]\d+)\b", str(slides[number - 1]))
        if actual and actual.group(1).upper() != declared:
            fails.append(f"p{number:02d} 模板错配: deck-plan={declared} HTML={actual.group(1).upper()}")


def main() -> int:
    args = sys.argv[1:]
    legacy = bool(args and args[0] == "--diagnose-legacy")
    if legacy:
        args = args[1:]
    if len(args) != 1:
        print(__doc__, file=sys.stderr)
        return 2
    deck = Path(args[0]).resolve()
    html_path, plan_path = deck / "index.html", deck / "deck-plan.md"
    if not html_path.is_file():
        print(f"缺少 {html_path}", file=sys.stderr)
        return 1
    html = html_path.read_text(encoding="utf-8")
    plan_text = plan_path.read_text(encoding="utf-8") if plan_path.is_file() else ""
    soup = BeautifulSoup(html, "html.parser")
    root = soup.find("html")
    slides = soup.select("#track > section.slide") or soup.select("section.slide")
    fails = []
    if legacy:
        diagnose_legacy(soup, plan_text, fails, deck)
        for fail in fails:
            print(f"FAIL {fail}")
        print(f"LEGACY 诊断完成: {len(fails)} 项问题；v1 成品不能作为正式交付通过")
        return 1

    if not root or root.get("data-deck-contract-version") != "2":
        fails.append("根节点缺少 data-deck-contract-version=2；旧 HTML 可打开但不能正式交付")
    if not soup.find("link", href=re.compile(r"(?:^|/)deck-component-contract\.css(?:\?|$)")):
        fails.append("缺少公共 deck-component-contract.css")
    if not plan_path.is_file():
        fails.append("缺少 deck-plan.md")

    by_id, aliases, gallery_slots, gallery_recipes, templates, authority, selected_icons, relations = load_manifests()
    protected_digests = set()
    protected_path = REPO_ROOT / "capabilities/layouts/protected-references.json"
    if protected_path.is_file():
        for item in json.loads(protected_path.read_text(encoding="utf-8"))["files"]:
            digest = str(item.get("sha256", "")).split(":")[-1]
            if digest:
                protected_digests.add(digest)
    deck_protected = hashlib.sha256(html_path.read_bytes()).hexdigest() in protected_digests
    atlas_receipts = [
        receipt for component_id, receipt in authority["components"]["receipts"].items()
        if component_id.startswith("atlas.")
    ]
    atlas_source_sha = atlas_receipts[0]["source_sha256"] if atlas_receipts else None
    atlas_adapter_sha = atlas_receipts[0]["render_stack"][0]["sha256"] if atlas_receipts else None
    for script in soup.select("script[src]"):
        value = (script.get("src") or "").split("?", 1)[0].split("#", 1)[0]
        if not value or re.match(r"^(?:[a-z]+:|//)", value, re.I):
            continue
        asset = (deck / value).resolve()
        if not asset.is_file():
            continue
        raw = asset.read_bytes()
        digest = hashlib.sha256(raw).hexdigest()
        if b"SWISS_CATALOG_DATA" in raw and digest != atlas_source_sha:
            fails.append(f"Atlas 运行时源码副本不是 Catalog 当前版本: {value}")
        if b"paper-ink.atlas" in raw and b"COMPONENT_OVERRIDES" in raw and digest != atlas_adapter_sha:
            fails.append(f"Atlas adapter 副本不是 Catalog 当前渲染栈: {value}")
    plan_pages, pair_waivers = parse_plan(plan_text)
    page_ids, relation_pages, template_pages, big_pages = [], [], [], []

    for number, slide in enumerate(slides, 1):
        geometry = geometry_contract(slide)
        primitive = geometry.get("primitive") if geometry else None
        ids = sorted({n.get("data-component-id") for n in slide.select("[data-component-id]") if n.get("data-component-id")})
        page_ids.append(ids)
        for component_id in ids:
            if resolve_component(component_id, by_id, aliases, gallery_slots)[0] is None:
                fails.append(f"p{number:02d} 组件未登记: {component_id}")
        recipe_id = slide.get("data-recipe-id")
        if recipe_id in gallery_slots:
            required_slots = {
                slot_id for slot_id, slot in gallery_slots[recipe_id].items()
                if slot.get("required")
            }
            actual_slots = {node.get("data-slot-id") for node in slide.select("[data-slot-id]")}
            missing_slots = sorted(required_slots - actual_slots)
            if missing_slots:
                fails.append(f"p{number:02d} 版式缺必需槽位: {','.join(missing_slots)}")
            for node in slide.select("[data-slot-id][data-component-id]"):
                slot_id, actual_id = node.get("data-slot-id"), node.get("data-component-id")
                slot = gallery_slots[recipe_id].get(slot_id)
                expected_id = ((slot or {}).get("default_renderer") or {}).get("component_id")
                if expected_id not in by_id:
                    continue
                kind, actual = resolve_component(actual_id, by_id, aliases, gallery_slots)
                canonical_id = actual.get("component_id") if kind == "component" and actual else None
                if canonical_id != expected_id:
                    fails.append(f"p{number:02d} 版式主槽 {slot_id} 必须物化正式组件: {expected_id}，实际 {actual_id}")
        plan = plan_pages.get(number, {"fields": {}, "block": ""})
        fields = plan["fields"]
        if not fields:
            fails.append(f"p{number:02d} deck-plan 缺少成品合同登记")
        title_text = (slide.get("data-page-title") or "").strip()
        if not title_text:
            fails.append(f"p{number:02d} 缺少 data-page-title(画册卡标题=主张句)")
        else:
            title_units = fullwidth_units(title_text)
            if title_units > TITLE_FW_BUDGET:
                fails.append(
                    f"p{number:02d} 主张句超画册一行预算: {title_units:.1f} > {TITLE_FW_BUDGET:g} 全角当量"
                    "(汉字类=1、半角=0.7;超出画册卡标题换行,卡片行高被撑破),先砍修饰词再拆主张"
                )
        primary_role = slide.get("data-primary-type-role")
        if primary_role not in TYPE_ROLES:
            fails.append(f"p{number:02d} data-primary-type-role 缺失或非法: {primary_role or '-'}")
        markers = slide.select("[data-primary-text], canvas[data-canvas-type-role]")
        if len(markers) != 1:
            fails.append(f"p{number:02d} 主文字标记应恰好 1 个，实际 {len(markers)}")
        if primary_role in LARGE_ROLES:
            big_pages.append(number)
        if fields.get("主字档") != primary_role:
            fails.append(f"p{number:02d} 主字档不一致: deck-plan={fields.get('主字档') or '-'} HTML={primary_role or '-'}")

        template_id = (slide.get("data-template-id") or "").upper()
        if template_id:
            template_pages.append((number, template_id))
            contract = templates.get(template_id)
            if not contract:
                fails.append(f"p{number:02d} 未登记非关系模板: {template_id}")
            if fields.get("模板", "").upper() != template_id:
                fails.append(f"p{number:02d} 模板错配: deck-plan={fields.get('模板') or '-'} HTML={template_id}")
            if slide.get("data-primary-relation") or slide.get("data-visual-family"):
                fails.append(f"p{number:02d} 非关系页不得声明主关系/视觉族")
            if contract:
                stage = slide.select_one(":scope > main.stage, :scope > div.stage") or slide.select_one(".stage")
                actual_component = stage.get("data-component-id") if stage else None
                if actual_component != contract["stage_component_id"]:
                    fails.append(f"p{number:02d} 模板组件错配: {actual_component or '-'} != {contract['stage_component_id']}")
                actual_part_nodes = slide.select("[data-template-part]")
                actual_parts = [n.get("data-template-part") for n in actual_part_nodes]
                if actual_parts != contract["parts"]:
                    fails.append(f"p{number:02d} 模板固定结构变化: expected={contract['parts']} actual={actual_parts}")
                actual_slots = [(n.get("data-template-slot"), n.get("data-template-slot-kind")) for n in slide.select("[data-template-slot]")]
                expected_slots = list(contract["slots"].items())
                if actual_slots != expected_slots:
                    fails.append(f"p{number:02d} 模板槽变化: expected={expected_slots} actual={actual_slots}")
                if stage:
                    try:
                        reference_stage, reference_parts = template_reference(contract)
                    except (OSError, ValueError) as exc:
                        fails.append(f"p{number:02d} 模板参考帧不可用: {exc}")
                    else:
                        if template_node_signature(stage) != template_node_signature(reference_stage):
                            fails.append(f"p{number:02d} 模板 stage 标签/类名/定位属性变化")
                        reference_by_part = {n.get("data-template-part"): n for n in reference_parts}
                        actual_by_part = {n.get("data-template-part"): n for n in actual_part_nodes}
                        for part in contract["parts"]:
                            reference_node, actual_node = reference_by_part.get(part), actual_by_part.get(part)
                            if not reference_node or not actual_node:
                                continue
                            include_children = part not in contract["slots"]
                            if template_node_signature(actual_node, include_children) != template_node_signature(reference_node, include_children):
                                fails.append(f"p{number:02d} 模板部件 {part} 的标签/类名/定位属性变化")
                if stage:
                    for child in stage.find_all(recursive=False):
                        if child.name in {"script", "style"} or child.get("data-contract-only") == "true":
                            continue
                        if not child.get("data-template-part"):
                            fails.append(f"p{number:02d} 非关系模板新增未登记节点: <{child.name} class=\"{' '.join(child.get('class', []))}\">")
        else:
            relation, family = slide.get("data-primary-relation"), slide.get("data-visual-family")
            layout_source = slide.get("data-layout-source")
            planned_layouts = [code.upper() for code in PLAN_LAYOUT_RE.findall(plan["block"])]
            if layout_source == "gallery":
                recipe = gallery_recipes.get(recipe_id)
                if not recipe:
                    fails.append(f"p{number:02d} 直接套版式但 recipe 未登记: {recipe_id or '-'}")
                else:
                    expected_code = recipe.get("display_code", "").upper()
                    if planned_layouts != [expected_code]:
                        fails.append(f"p{number:02d} 套版式登记错配: deck-plan={planned_layouts or ['-']} HTML={expected_code}")
            elif layout_source == "free_build":
                if planned_layouts:
                    fails.append(f"p{number:02d} 自由构建页不得在 deck-plan 冒充套版式: {','.join(planned_layouts)}")
                mentioned = set(LAYOUT_CODE_RE.findall(plan["block"]))
                waived = {code for code in FIT_WAIVER_RE.findall(plan["block"])}
                unwaived = sorted(mentioned - waived)
                if unwaived:
                    fails.append(f"p{number:02d} 自由构建页提及版式 {','.join(unwaived)} 未登记拒套豁免(④列 `拒套: 版式号 | 理由`,或回到该版式走锁版复制)")
            else:
                fails.append(f"p{number:02d} 关系页 data-layout-source 缺失或非法: {layout_source or '-'}")
            if relation not in relations:
                fails.append(f"p{number:02d} 关系页 data-primary-relation 缺失或非法: {relation or '-'}")
            if not family:
                fails.append(f"p{number:02d} 关系页缺少 data-visual-family")
            if fields.get("主关系") != relation:
                fails.append(f"p{number:02d} 主关系不一致: deck-plan={fields.get('主关系') or '-'} HTML={relation or '-'}")
            if fields.get("视觉族") != family:
                fails.append(f"p{number:02d} 视觉族不一致: deck-plan={fields.get('视觉族') or '-'} HTML={family or '-'}")
            if slide.get("data-layout-source") == "free_build" and not deck_protected and primitive in {"左右x等分", "上下x等分", "左右不对称", "上下不对称"}:
                furniture_suffixes = (".doc", ".folio", ".caption", ".scene", ".region")
                content_aligned = False
                for item in (geometry or {}).get("relations", []):
                    if not isinstance(item, dict) or item.get("type") not in {"edgeEq", "bottomEq", "offsetEq", "centerBetween", "mirrorEq", "pathAnchor"}:
                        continue
                    anchor_list = [a for a in (item.get("anchors") or []) if not str(a).endswith(furniture_suffixes)]
                    if len(anchor_list) >= 2:
                        content_aligned = True
                        break
                if not content_aligned:
                    fails.append(f"p{number:02d} 自由构建 {primitive} 页契约缺少内容组之间的对齐关系(edgeEq/bottomEq/offsetEq/centerBetween/mirrorEq 且两侧均非家具锚点)")
            if slide.get("data-layout-source") == "free_build":
                anchors = geometry.get("anchors", []) if geometry else []
                anchor_ids = {item.get("anchor_id") for item in anchors if isinstance(item, dict) and item.get("anchor_id")}
                infrastructure = {((geometry or {}).get("content_region") or {}).get("anchor_id")}
                infrastructure.update(anchor_id for anchor_id in anchor_ids if anchor_id.endswith((".doc", ".folio", ".caption", ".scene", ".region")))
                internal_ids = anchor_ids - infrastructure - {None}
                if len(internal_ids) < 2:
                    fails.append(f"p{number:02d} 自由构建关系页至少声明 2 个内部几何锚点，实际 {len(internal_ids)}")
                internal_covered = set()
                for item in (geometry or {}).get("relations", []):
                    if not isinstance(item, dict) or item.get("type") not in {"contain", "hardBoundary", "avoid", "clear", "pathClear", "ownerOverlap"}:
                        continue
                    relation_anchors = set(item.get("anchors") or [])
                    if len(relation_anchors & internal_ids) >= 2:
                        internal_covered.update(relation_anchors & internal_ids)
                uncovered = sorted(internal_ids - internal_covered)
                if uncovered:
                    fails.append(f"p{number:02d} 自由构建页内部锚点未参与内部边界关系: {','.join(uncovered)}")
            if primitive is not None:
                if not PRIMITIVE_RE.match(primitive):
                    fails.append(f"p{number:02d} 几何契约 primitive 非法(只填六结构或非关系模板): {primitive}")
                elif slide.get("data-layout-source") == "free_build" and not deck_protected:
                    stage_el = slide.select_one(".stage")
                    balance = stage_el.get("data-balance") if stage_el else None
                    if primitive == "单区" and balance != "centered":
                        fails.append(f"p{number:02d} primitive=单区 必须 data-balance=centered(水平垂直居中同 ≤3px 实测),实际 {balance or '-'}")
                    if primitive != "单区" and balance != "structural":
                        fails.append(f"p{number:02d} primitive={primitive} 必须 data-balance=structural,实际 {balance or '-'}")
                selected = PLAN_SELECT_RE.search(plan["block"])
                if selected:
                    selected_norm = re.sub(r"^(左右|上下)\d{1,2}等分$", r"\1x等分", selected.group(1).strip())
                    if selected_norm != primitive:
                        fails.append(f"p{number:02d} ③选定结构({selected.group(1).strip()})与 primitive({primitive})不一致,禁止骑墙")
            relation_pages.append((number, relation, primitive, family))

        icon_sources = sorted({n.get("data-icon-source") for n in slide.select("[data-icon-source]")})
        plan_icons = fields.get("图标", "")
        expected_icons = [] if plan_icons == "无图标" else sorted(v.strip() for v in plan_icons.split(",") if v.strip())
        if expected_icons != icon_sources:
            fails.append(f"p{number:02d} 图标清单不一致: deck-plan={expected_icons or ['无图标']} HTML={icon_sources or ['无图标']}")
        for icon in slide.select("[data-icon-source]"):
            source = icon.get("data-icon-source", "")
            if source.startswith("redraw-v3:"):
                name = source.split(":", 1)[1]
                source_path = ICON_ROOT / f"{name}.svg"
                if name not in selected_icons:
                    fails.append(f"p{number:02d} 图标不在 Catalog 精选资产中: {source}")
                elif not source_path.is_file():
                    fails.append(f"p{number:02d} 图标不存在: {source}")
                elif icon.name != "svg" or normalize_svg_geometry(str(icon)) != normalize_svg_geometry(source_path.read_text(encoding="utf-8")):
                    fails.append(f"p{number:02d} 图标几何与 redraw-v3 不一致: {source}")
            elif source.startswith("handdraw:"):
                reason = source.split(":", 1)[1]
                if not reason or reason not in plan["block"]:
                    fails.append(f"p{number:02d} handdraw 缺少 deck-plan 理由: {source}")
            else:
                fails.append(f"p{number:02d} 非法图标来源: {source}")
        for helper in slide.select('[data-contract-only="true"]'):
            if contract_only_is_visible(helper):
                fails.append(f"p{number:02d} contract-only 辅助节点产生可见内容")
        if re.search(r"\b(?:placeholder|todo)\b", slide.get_text(" ", strip=True), re.I):
            fails.append(f"p{number:02d} 出现 placeholder/TODO 文案")
        for svg in slide.select("svg"):
            for rect in svg.select("rect"):
                try:
                    x, y = float(rect.get("x", 0)), float(rect.get("y", 0))
                    width, height = float(rect.get("width")), float(rect.get("height"))
                except (TypeError, ValueError):
                    continue
                diagonals = 0
                for line in svg.select("line"):
                    try:
                        x1, y1, x2, y2 = (float(line.get(k)) for k in ("x1", "y1", "x2", "y2"))
                    except (TypeError, ValueError):
                        continue
                    pairs = [
                        ((x, y), (x + width, y + height)),
                        ((x, y + height), (x + width, y)),
                    ]
                    if any(
                        (abs(x1-a[0]) <= 2 and abs(y1-a[1]) <= 2 and abs(x2-b[0]) <= 2 and abs(y2-b[1]) <= 2)
                        or (abs(x2-a[0]) <= 2 and abs(y2-a[1]) <= 2 and abs(x1-b[0]) <= 2 and abs(y1-b[1]) <= 2)
                        for a, b in pairs
                    ):
                        diagonals += 1
                if diagonals >= 2:
                    fails.append(f"p{number:02d} 出现矩形加双对角线叉号占位符")

        for slot in slide.select("[data-layout-slot]"):
            component_node = slot if slot.get("data-component-id") else slot.select_one("[data-component-id]")
            if not component_node:
                continue
            component_id = component_node.get("data-component-id")
            kind, comp = resolve_component(component_id, by_id, aliases, gallery_slots)
            if kind != "component" or not comp:
                continue
            receipt = comp.get("catalog_receipt")
            if not receipt:
                fails.append(f"p{number:02d} 组件不在 Catalog 可选资产中: {component_id}")
                continue
            if component_id.startswith("atlas."):
                materialized = component_node if component_node.get("data-materialized-component-id") else component_node.find(attrs={"data-materialized-component-id": True})
                if not materialized:
                    fails.append(f"p{number:02d} Atlas 组件未静态物化: {component_id}")
                else:
                    expected_attrs = {
                        "data-materialized-component-id": component_id,
                        "data-catalog-spec": receipt.get("catalog_spec"),
                        "data-catalog-source-sha256": receipt.get("source_sha256"),
                        "data-catalog-snippet-sha256": receipt.get("snippet_sha256"),
                        "data-catalog-adapter-sha256": (receipt.get("render_stack") or [{}])[0].get("sha256"),
                    }
                    for attr_name, expected in expected_attrs.items():
                        if not expected or materialized.get(attr_name) != expected:
                            fails.append(f"p{number:02d} Atlas 物化收据错配: {component_id} {attr_name}")
                    if materialized.find(recursive=False) is None:
                        fails.append(f"p{number:02d} Atlas 物化 DOM 为空: {component_id}")
                    if component_id == "atlas.051.iceberg":
                        iceberg = materialized.select_one(".iceberg-diagram")
                        if not iceberg:
                            fails.append(f"p{number:02d} 冰山未使用 Catalog 当前 .iceberg-diagram")
                        else:
                            fields = {node.get("data-field") for node in iceberg.select("[data-field]")}
                            expected_fields = {"visible_label", "visible_description", "behavior_label", "behavior_description", "root_label", "root_description"}
                            if fields != expected_fields:
                                fails.append(f"p{number:02d} 冰山字段合同错配: {sorted(fields)}")
                            iceberg_text = iceberg.get_text(" ", strip=True)
                            has_retired_text = any(label in iceberg_text for label in ("ICEBERG MODEL", "VISIBLE / HIDDEN", "10 / 90"))
                            has_retired_divider = iceberg.select_one('line[x1="0"][y1="26"][x2="480"][y2="26"]') is not None
                            if has_retired_text or has_retired_divider:
                                fails.append(f"p{number:02d} 冰山含已删除的顶部元数据带")
            req = comp.get("space_requirements", {})
            declared_space = {
                "data-contract-min-width": req.get("min_width"),
                "data-contract-min-height": req.get("min_height"),
                "data-contract-min-aspect": req.get("min_aspect_ratio"),
                "data-contract-max-aspect": req.get("max_aspect_ratio"),
            }
            for attr_name, expected in declared_space.items():
                if expected is None:
                    continue
                try:
                    actual = float(component_node.get(attr_name))
                except (TypeError, ValueError):
                    actual = None
                if actual is None or abs(actual - float(expected)) > 0.001:
                    fails.append(f"p{number:02d} 组件空间声明缺失/伪造: {component_id} {attr_name} 应为 {expected}")
            width, height = style_px(slot.get("style") or "", "width"), style_px(slot.get("style") or "", "height")
            if width is not None and req.get("min_width") is not None and width < req["min_width"]:
                fails.append(f"p{number:02d} 组件槽过窄: {component_id} {width:g}px < {req['min_width']}px")
            if height is not None and req.get("min_height") is not None and height < req["min_height"]:
                fails.append(f"p{number:02d} 组件槽过矮: {component_id} {height:g}px < {req['min_height']}px")
            if width and height:
                aspect = width / height
                if req.get("min_aspect_ratio") is not None and aspect < req["min_aspect_ratio"]:
                    fails.append(f"p{number:02d} 组件槽宽高比过小: {component_id} {aspect:.2f}")
                if req.get("max_aspect_ratio") is not None and aspect > req["max_aspect_ratio"]:
                    fails.append(f"p{number:02d} 组件槽宽高比过大: {component_id} {aspect:.2f}")

    for index, (number, relation, primitive, family) in enumerate(relation_pages):
        if index and relation_pages[index - 1][0] == number - 1 and relation_pages[index - 1][1] == relation:
            fails.append(f"p{number - 1:02d}/p{number:02d} 相邻关系页主关系相同: {relation}")
        signature = f"{primitive}|{family}"
        for earlier_number, _, earlier_primitive, earlier_family in relation_pages[:index]:
            if number - earlier_number < 3 and signature == f"{earlier_primitive}|{earlier_family}":
                fails.append(f"p{earlier_number:02d}/p{number:02d} 视觉签名三页内重复: {signature}")
    for number, ids in enumerate(page_ids, 1):
        for earlier_number in range(max(1, number - 2), number):
            for component_id in sorted(set(ids) & set(page_ids[earlier_number - 1])):
                fails.append(f"p{earlier_number:02d}/p{number:02d} 组件三页内复读: {component_id}")
    template_map = dict(template_pages)
    for left in range(1, len(slides)):
        if template_map.get(left) in TRANSITIONS and template_map.get(left + 1) in CLOSINGS and (left, left + 1) not in pair_waivers:
            fails.append(f"p{left:02d}→p{left + 1:02d} 过渡模板紧接收尾模板，且无页对级豁免")
    for left, right in zip(big_pages, big_pages[1:]):
        if right == left + 1:
            fails.append(f"p{left:02d}→p{right:02d} 大字页连续出现")
    for pair, reason in pair_waivers.items():
        if pair[1] != pair[0] + 1 or not reason:
            fails.append(f"非法节奏页对豁免: p{pair[0]:02d}→p{pair[1]:02d}")

    for line_number, line in enumerate(plan_text.splitlines(), 1):
        if "④" not in line:
            continue
        for component_id, params in ID_PARAM_RE.findall(line):
            kind, comp = resolve_component(component_id, by_id, aliases, gallery_slots)
            if kind is None:
                fails.append(f"deck-plan L{line_number} 组件未登记: {component_id}")
                continue
            match = re.search(r"\bN\s*:\s*(\d+)", params)
            if kind != "component" or not match:
                continue
            declared, capacity = int(match.group(1)), comp.get("capacity", {})
            low, high = capacity.get("min_items"), capacity.get("max_items")
            if (low is not None and declared < low) or (high is not None and declared > high):
                fails.append(f"deck-plan L{line_number} 容量越界: {component_id} N={declared}, 容量 {low}~{high}")

    if fails:
        for fail in fails:
            print(f"FAIL {fail}")
        print(f"deck 成品合同 v2: {len(fails)} 项不合格", file=sys.stderr)
        return 1
    print(f"OK deck 成品合同 v2: {len(slides)} 页，关系页 {len(relation_pages)}，非关系页 {len(template_pages)}，节奏/模板/组件/icon 一致")
    return 0


if __name__ == "__main__":
    sys.exit(main())
