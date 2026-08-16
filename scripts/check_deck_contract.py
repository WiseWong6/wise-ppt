#!/usr/bin/env python3
"""wise-ppt-glm · deck 合同静态检查(容量/节奏/组件登记)

用法: python3 scripts/check_deck_contract.py <deck目录>

三项检查,全部读静态文件,不起浏览器:
  1. 组件登记:index.html 里每个 data-component-id 必须能在 routing-manifest.json
     (component_id 或 aliases)查到;gallery-recipe 块指纹(native.<recipe-id>.<slot>)
     按 gallery-manifest.json 的 recipe/slot 解析;deck-plan.md ④列同样必须查到。
  2. 容量:deck-plan.md ④列 `component_id{N:x,...}` 的 N 必须落在 manifest 的
     min_items~max_items 内(未写 N 的条目跳过)。
  3. 节奏:关系页(primitive 为六结构之一)结构重复间隔必须 ≥3 页、相邻页禁同结构;
     同一组件跨页复用间隔必须 ≥3 页。deck-plan.md 里显式的 `- 节奏豁免: 理由` 行
     可将节奏违规降级为 WARN(豁免必须可见,静默违规仍然红)。

deck-plan.md 缺失时降级为 WARN(只跑 HTML 侧检查),方便夹具与非正式 deck。
"""
import json
import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
MANIFEST_PATH = REPO_ROOT / "capabilities" / "components" / "routing-manifest.json"
GALLERY_PATH = REPO_ROOT / "capabilities" / "layouts" / "gallery-manifest.json"

STRUCTURES = ("单区", "左右x等分", "上下x等分", "左右不对称", "上下不对称", "网格")
ID_PARAM_RE = re.compile(r"\b([a-z0-9-]+(?:\.[a-z0-9-]+)+)\{([^}]*)\}")
COMPONENT_ATTR_RE = re.compile(r'data-component-id="([^"]+)"')
PRIMITIVE_RE = re.compile(r'"primitive"\s*:\s*"([^"]+)"')
SLIDE_OPEN_RE = re.compile(r'<section[^>]*class="[^"]*slide[^"]*"[^>]*>')
RECIPE_BLOCK_RE = re.compile(r"^native\.(paper-ink\.[a-z0-9.-]+)\.([a-z0-9-]+)$")
WAIVER_RE = re.compile(r"^\s*-\s*\**节奏豁免\**[:：]\s*(.+)$", re.M)


def load_manifest():
    data = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    by_id = {}
    alias_map = {}
    for comp in data["components"]:
        by_id[comp["component_id"]] = comp
        for alias in comp.get("aliases", []):
            alias_map[alias] = comp["component_id"]
    gallery_slots = {}
    if GALLERY_PATH.is_file():
        gallery = json.loads(GALLERY_PATH.read_text(encoding="utf-8"))
        for recipe in gallery.get("recipes", []):
            gallery_slots[recipe["recipe_id"]] = {s["slot_id"] for s in recipe.get("slots", [])}
    return by_id, alias_map, gallery_slots


def resolve(component_id, by_id, alias_map, gallery_slots=None):
    """返回 ('component', 条目) / ('recipe-block', None) / (None, None)。"""
    if component_id in by_id:
        return "component", by_id[component_id]
    canonical = alias_map.get(component_id)
    if canonical and canonical in by_id:
        return "component", by_id[canonical]
    if gallery_slots:
        match = RECIPE_BLOCK_RE.match(component_id)
        if match and match.group(1) in gallery_slots and match.group(2) in gallery_slots[match.group(1)]:
            return "recipe-block", None
    return None, None


def split_slides(html):
    opens = list(SLIDE_OPEN_RE.finditer(html))
    for index, match in enumerate(opens):
        end = opens[index + 1].start() if index + 1 < len(opens) else len(html)
        yield html[match.start():end]


def main() -> int:
    if len(sys.argv) != 2:
        print(__doc__, file=sys.stderr)
        return 2
    deck = Path(sys.argv[1]).resolve()
    html_path = deck / "index.html"
    if not html_path.is_file():
        print(f"缺少 {html_path}", file=sys.stderr)
        return 1
    by_id, alias_map, gallery_slots = load_manifest()
    html = html_path.read_text(encoding="utf-8")
    fails = []
    warns = []

    # 节奏豁免:deck-plan 里显式登记的遗留豁免(豁免必须可见,静默违规仍然红)
    waiver = None
    plan_path = deck / "deck-plan.md"
    if plan_path.is_file():
        waiver_match = WAIVER_RE.search(plan_path.read_text(encoding="utf-8"))
        if waiver_match:
            waiver = waiver_match.group(1).strip()
            print(f"WARN 节奏豁免生效: {waiver}")

    # ── 1+3. HTML 侧:逐页组件登记与节奏 ──
    slides = list(split_slides(html))
    page_ids, page_primitives = [], []
    for number, block in enumerate(slides, 1):
        ids = sorted({m for m in COMPONENT_ATTR_RE.findall(block) if m})
        page_ids.append(ids)
        primitive_match = PRIMITIVE_RE.search(block)
        page_primitives.append(primitive_match.group(1) if primitive_match else None)

    for number, ids in enumerate(page_ids, 1):
        for component_id in ids:
            kind, comp = resolve(component_id, by_id, alias_map, gallery_slots)
            if kind is None:
                fails.append(f"p{number:02d} 组件未登记: {component_id} (routing-manifest/gallery-manifest 均查无此件)")

    def rhythm_fail(message):
        (warns if waiver else fails).append(message + (f"(已豁免: {waiver})" if waiver else ""))

    relation_pages = []
    for number, primitive in enumerate(page_primitives, 1):
        if primitive is None:
            continue
        if primitive.startswith(STRUCTURES):
            relation_pages.append((number, primitive))
        elif not primitive.startswith("非关系模板"):
            warns.append(f"p{number:02d} primitive 既不是六结构也不是非关系模板: {primitive}")

    for index, (number, primitive) in enumerate(relation_pages):
        for earlier_number, earlier_primitive in relation_pages[:index]:
            gap = number - earlier_number
            if primitive == earlier_primitive and gap < 3:
                kind = "相邻页同结构" if gap == 1 else f"结构重复间隔不足3页(隔{gap - 1}页)"
                rhythm_fail(f"p{earlier_number:02d}/p{number:02d} {kind}: {primitive}")

    flat_usage = [(number, component_id) for number, ids in enumerate(page_ids, 1) for component_id in ids]
    for index, (number, component_id) in enumerate(flat_usage):
        for earlier_number, earlier_id in flat_usage[:index]:
            if earlier_id == component_id and number != earlier_number and number - earlier_number < 3:
                rhythm_fail(f"p{earlier_number:02d}/p{number:02d} 组件复读间隔不足3页: {component_id}")

    # ── 2. deck-plan 侧:④列登记与容量 ──
    if plan_path.is_file():
        for number, line in enumerate(plan_path.read_text(encoding="utf-8").splitlines(), 1):
            if "④" not in line:
                continue
            for component_id, params in ID_PARAM_RE.findall(line):
                kind, comp = resolve(component_id, by_id, alias_map, gallery_slots)
                if kind is None:
                    fails.append(f"deck-plan L{number} 组件未登记: {component_id}")
                    continue
                if kind != "component":
                    continue
                match = re.search(r"\bN\s*:\s*(\d+)", params)
                if not match:
                    continue
                declared = int(match.group(1))
                capacity = comp.get("capacity", {})
                low, high = capacity.get("min_items"), capacity.get("max_items")
                if low is not None and declared < low or high is not None and declared > high:
                    fails.append(
                        f"deck-plan L{number} 容量越界: {component_id} 声明 N={declared},"
                        f"容量 {low}~{high}"
                    )
    else:
        warns.append("缺少 deck-plan.md,跳过容量与④列登记检查(正式 deck 必须有)")

    for warn in warns:
        print(f"WARN {warn}")
    if fails:
        for fail in fails:
            print(f"FAIL {fail}")
        print(f"deck 合同检查: {len(fails)} 项不合格", file=sys.stderr)
        return 1
    print(f"OK deck 合同: 组件登记 {len(flat_usage)} 项全命中,关系页 {len(relation_pages)}/{len(slides)},节奏合规")
    return 0


if __name__ == "__main__":
    sys.exit(main())
