#!/usr/bin/env python3
"""Read-only closure audit for relationship layouts, structures and components."""

from __future__ import annotations

import collections
import hashlib
import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / "references" / "catalog.html"
SKILL = ROOT / "SKILL.md"
FRAMES = ROOT / "references" / "gallery-paper-ink" / "ai" / "frames"
LAYOUTS = ROOT / "capabilities" / "layouts" / "gallery-manifest.json"
ROUTING = ROOT / "capabilities" / "components" / "routing-manifest.json"
ROUTING_DATA = ROOT / "references" / "component-routing-data.js"
NATIVE_COMPONENTS = ROOT / "capabilities" / "layouts" / "paper-ink-components.js"

ZH_TO_KEY = collections.OrderedDict(
    [
        ("焦点", "focus"),
        ("示意", "illustration"),
        ("陈列", "display"),
        ("并行", "parallel"),
        ("指标", "metric"),
        ("分布", "distribution"),
        ("层级", "hierarchy"),
        ("拆解", "decomposition"),
        ("部分整体", "part-whole"),
        ("嵌套", "nesting"),
        ("时序", "sequence"),
        ("流动", "flow"),
        ("循环", "cycle"),
        ("汇聚", "convergence"),
        ("漏斗", "funnel"),
        ("因果", "causal"),
        ("对比", "comparison"),
        ("矩阵", "matrix"),
        ("映射", "mapping"),
        ("交叠", "overlap"),
        ("排名", "ranking"),
        ("网络", "network"),
        ("证据", "evidence"),
    ]
)


def relation_keys(label: str) -> list[str]:
    hits = []
    for order, (zh_name, key) in enumerate(ZH_TO_KEY.items()):
        position = label.find(zh_name)
        if position >= 0:
            hits.append((position, order, key))
    return [key for _, _, key in sorted(hits)]


def structure_key(label: str) -> str:
    if label == "单区":
        return "single"
    if re.fullmatch(r"左右\d+等分", label):
        return "heq"
    if re.fullmatch(r"上下\d+等分", label):
        return "veq"
    if label == "左右不对称":
        return "hasym"
    if label == "上下不对称":
        return "vasym"
    if label.startswith("网格"):
        return "grid"
    raise AssertionError(f"未知结构标签: {label}")


def fingerprint(recipe: dict) -> str:
    slots = [
        {
            key: slot.get(key)
            for key in (
                "slot_id",
                "required",
                "visual_role",
                "min_items",
                "max_items",
                "count_unit",
            )
        }
        for slot in recipe.get("slots", [])
    ]
    canonical = {
        "reading_order": recipe.get("reading_order"),
        "structure_contract": recipe.get("structure_contract"),
        "slots": slots,
    }
    digest = hashlib.sha256(
        json.dumps(canonical, sort_keys=True, separators=(",", ":")).encode()
    ).hexdigest()
    return "sha256:" + digest


def main() -> None:
    catalog = CATALOG.read_text(encoding="utf-8")
    relation_block = catalog[
        catalog.index("const SMARTART_TYPES=[") : catalog.index("/* 组件统一池")
    ]
    rows = re.findall(
        r"\[\s*'([A-Z]\d+)'\s*,\s*'([^']*)'\s*,\s*'([^']*)'\s*,\s*'([^']*)'\s*\]",
        relation_block,
    )
    assert len(rows) == 68, f"关系版式应为 68，当前 {len(rows)}"
    by_code = {code: (name, structure, relation) for code, name, structure, relation in rows}
    assert len(by_code) == 68, "关系版式编号有重复"

    corrected = {"A7", "F4", "A9", "E3", "E6", "I3", "H3", "H4", "E1", "E2", "K1", "C6"}
    wrong = sorted(code for code in corrected if by_code[code][1] != "单区")
    assert not wrong, f"组件内分格仍被误标为页面结构: {wrong}"
    expected_new = {
        "Q1": ("单区", ["overlap"]),
        "Q2": ("左右不对称", ["part-whole", "evidence"]),
        "Q3": ("上下2等分", ["comparison", "flow"]),
        "Q4": ("网格2×2", ["evidence", "matrix"]),
        "R1": ("左右4等分", ["display"]),
        "R2": ("上下3等分", ["hierarchy"]),
        "R3": ("网格2×3", ["display"]),
        "R4": ("单区", ["comparison"]),
        "R5": ("单区", ["network"]),
        "R6": ("上下4等分", ["hierarchy"]),
        "R7": ("网格4×7", ["display"]),
    }
    for code, (structure, relations) in expected_new.items():
        assert by_code[code][1] == structure, f"{code} 结构不符"
        assert relation_keys(by_code[code][2]) == relations, f"{code} 关系不符"

    counts = collections.Counter(structure_key(row[2]) for row in rows)
    expected_counts = {
        "single": 41,
        "heq": 8,
        "veq": 3,
        "hasym": 8,
        "vasym": 5,
        "grid": 3,
    }
    assert dict(counts) == expected_counts, f"六结构计数不符: {dict(counts)}"

    skill_text = SKILL.read_text(encoding="utf-8")
    table_a = skill_text.split("## 表A")[1].split("## 表B")[0]
    example_codes = set()
    for line in table_a.splitlines():
        if not line.startswith("|"):
            continue
        cells = [cell.strip() for cell in line.strip("|").split("|")]
        if len(cells) >= 4:
            example_codes.update(re.findall(r"[A-Z]\d{1,2}", cells[-1]))
    assert example_codes == set(by_code), (
        f"表A 版式例未覆盖 68 版式: 漏 {sorted(set(by_code) - example_codes)}"
        f" / 多 {sorted(example_codes - set(by_code))}"
    )

    frame_codes = {
        path.stem.removeprefix("layout-").upper()
        for path in FRAMES.glob("layout-*.html")
    }
    assert len(frame_codes) == 80, f"画册帧应为 80，当前 {len(frame_codes)}"
    assert set(by_code).issubset(frame_codes), "有关系版式缺 HTML 帧"

    layouts = json.loads(LAYOUTS.read_text(encoding="utf-8"))
    recipes = layouts["recipes"]
    assert layouts["recipe_count"] == len(recipes) == 76, "recipe_count 不闭合"
    assert layouts["page_expression_contract"]["profile_count"] == 76, "profile_count 不闭合"
    recipes_by_code = {recipe["display_code"]: recipe for recipe in recipes}
    assert len(recipes_by_code) == 76, "gallery-manifest display_code 有重复"
    assert set(by_code).issubset(recipes_by_code), "有关系版式缺 gallery recipe"
    for code, (_, _, label) in by_code.items():
        recipe = recipes_by_code[code]
        assert recipe.get("relations") == relation_keys(label), f"{code} relations 与 Catalog 不一致"
        assert recipe.get("structure_fingerprint") == fingerprint(recipe), f"{code} 结构指纹失效"

    g1_component = "native.paper-ink.096.three-way-radial"
    g5_component = "native.paper-ink.108.three-principles-radial"
    assert not recipes_by_code["G1"].get("formal_examples"), "G1 不得被 P03 正式样例覆盖"
    g5_examples = recipes_by_code["G5"].get("formal_examples") or []
    assert g5_examples == [
        {
            "deck_id": "wise-ppt-story-six-page",
            "page": "P03",
            "page_id": "page.story.principles",
            "source": "themes/paper-ink/examples/wise-ppt-story-six-page/index.html",
            "component_id": g5_component,
        }
    ], "G5 必须唯一登记六页正式样例 P03"
    g1_slot = next(
        slot for slot in recipes_by_code["G1"]["slots"] if slot["slot_id"] == "dimensions"
    )
    assert g1_slot["default_renderer"]["component_id"] == g1_component, "G1 主槽未绑定正式组件 096"
    assert g1_slot.get("recommended_component_ids") == [g1_component], "G1 推荐组件未唯一指向 096"
    g5_slot = next(
        slot for slot in recipes_by_code["G5"]["slots"] if slot["slot_id"] == "dimensions"
    )
    assert g5_slot["default_renderer"]["component_id"] == g5_component, "G5 主槽未绑定正式组件 108"
    assert g5_slot.get("recommended_component_ids") == [g5_component], "G5 推荐组件未唯一指向 108"
    g1_frame = (FRAMES / "layout-g1.html").read_text(encoding="utf-8")
    g5_frame = (FRAMES / "layout-g5.html").read_text(encoding="utf-8")
    assert "LLM 调用节点" in g1_frame, "G1 原 LLM 节点内容被覆盖"
    assert 'data-formal-example=' not in g1_frame, "G1 不得冒充 P03 正式样例"
    assert f'data-component-id="{g1_component}"' in g1_frame, "G1 帧缺原组件 096"
    assert 'data-formal-example="wise-ppt-story-six-page:P03"' in g5_frame, "G5 帧缺 P03 正式样例标记"
    assert f'data-component-id="{g5_component}"' in g5_frame, "G5 帧缺正式组件 108"
    native_components = NATIVE_COMPONENTS.read_text(encoding="utf-8")
    assert 'name: "three-way-radial"' in native_components and 'num: 96' in native_components, (
        "原组件 096 未恢复"
    )
    assert 'name: "three-principles-radial"' in native_components and 'num: 108' in native_components, (
        "P03 新组件 108 未登记"
    )
    routing = json.loads(ROUTING.read_text(encoding="utf-8"))
    routes_by_id = {item["component_id"]: item for item in routing["components"]}
    assert routing["component_count"] == len(routes_by_id) == 126, "生产组件路由计数不闭合"
    assert g1_component in routes_by_id, "原组件 096 缺生产路由"
    assert g5_component in routes_by_id, "P03 新组件 108 缺生产路由"
    assert routes_by_id[g5_component]["relation_keys"] == ["decomposition"], "组件 108 关系路由错误"
    assert "CATALOG_FORMAL_EXAMPLES" in catalog and "G5:Object.freeze" in catalog, "Catalog 缺 G5/P03 正式入口"
    assert "sample:'P03'" in catalog and g5_component in catalog, "Catalog 组件卡缺 P03/108 追溯"
    for code in expected_new:
        frame = (FRAMES / f"layout-{code.lower()}.html").read_text(encoding="utf-8")
        required = recipes_by_code[code]["structure_contract"]["required_slot_ids"]
        missing = [slot for slot in required if f'data-slot-id="{slot}"' not in frame]
        assert not missing, f"{code} 帧缺必需槽位: {missing}"

    for code, expected_slot_count in (("Q4", 4), ("R3", 6), ("R6", 4), ("R7", 28)):
        frame = (FRAMES / f"layout-{code.lower()}.html").read_text(encoding="utf-8")
        page_slots = re.findall(r'data-slot-id="([^"]+)"', frame)
        required = recipes_by_code[code]["structure_contract"]["required_slot_ids"]
        assert len(required) == expected_slot_count, f"{code} 配方必需槽位数不符"
        assert len(page_slots) == expected_slot_count == len(set(page_slots)), (
            f"{code} 必须逐槽独立绑定，当前页面槽位 {len(page_slots)} / 唯一 {len(set(page_slots))}"
        )
        assert set(page_slots) == set(required), f"{code} 页面槽位与配方不一致"

    r3_frame = (FRAMES / "layout-r3.html").read_text(encoding="utf-8")
    assert "#006" in r3_frame and "1500" in r3_frame and "620" in r3_frame, (
        "R3 必须保留组件目录 #006 母板视觉和 1500×620 的严格 2×3 版心"
    )

    q4_frame = (FRAMES / "layout-q4.html").read_text(encoding="utf-8")
    assert "atlas.021.quadrant-axis" in q4_frame, (
        "Q4 必须保留象限图组件母板来源，同时维持四槽独立绑定"
    )

    for code, number, label in (("R4", 106, "天平"), ("R5", 107, "齿轮")):
        frame = (FRAMES / f"layout-{code.lower()}.html").read_text(encoding="utf-8")
        assert "../../../../capabilities/layouts/paper-ink-components.js" in frame, (
            f"{code} 未加载{label}组件源码"
        )
        assert f"item.num==={number}" in frame and "host.innerHTML=entry.snippet" in frame, (
            f"{code} 必须直接物化 {number} 号组件，不得另画一套{label}"
        )
    assert "const full=FRAMES+'layout-'+it[0].toLowerCase()+'.html';" in catalog, (
        "结构页示例必须直接复用关系页帧，不得维护第三套页面图形"
    )
    q3_frame = (FRAMES / "layout-q3.html").read_text(encoding="utf-8")
    traced = re.search(
        r'<g data-slot-id="traced".*?<rect x="210" y="([\d.]+)" width="1500" height="([\d.]+)"',
        q3_frame,
        re.S,
    )
    assert traced, "Q3 缺 traced 流程框几何"
    traced_bottom = float(traced.group(1)) + float(traced.group(2))
    assert traced_bottom <= 890, (
        f"Q3 下层流程框侵入页底结论安全区: bottom={traced_bottom:g} > 890"
    )

    routing = json.loads(ROUTING.read_text(encoding="utf-8"))
    vocabulary = routing.get("relation_key_vocabulary") or {}
    assert vocabulary == {key: zh for zh, key in ZH_TO_KEY.items()}, "23 细种词表不一致"
    override_vocab = layouts["page_expression_contract"]["vocabulary"][
        "semantic_override_relations"
    ]
    assert override_vocab == list(vocabulary.keys()), (
        "semantic_override_relations 必须与 23 细种词表同键同序，不得混入词表外键(如 spatial)"
    )
    for recipe in recipes:
        declared = (
            (recipe.get("expression_profile") or {}).get("semantic_override") or {}
        ).get("relations") or []
        beyond = [key for key in declared if key not in override_vocab]
        assert not beyond, f"{recipe['recipe_id']} semantic_override 用了词表外关系键: {beyond}"
    layout_coverage = collections.Counter(
        key for _, _, label in by_code.values() for key in relation_keys(label)
    )
    component_coverage = collections.Counter(
        key for item in routing["components"] for key in item.get("relation_keys", [])
    )
    assert not [key for key in vocabulary if not layout_coverage[key]], "存在零版式覆盖关系"
    assert not [key for key in vocabulary if not component_coverage[key]], "存在零组件覆盖关系"
    venn = [
        item
        for item in routing["components"]
        if item["component_id"] in {"atlas.052.venn.double", "atlas.053.venn.three"}
    ]
    assert len(venn) == 2 and all(
        item.get("relation_keys") == ["overlap", "comparison"] for item in venn
    ), "Venn 路由未明确交叠关系"
    classics = {
        item["component_id"]: item
        for item in routing["components"]
        if item["component_id"] in {
            "native.paper-ink.106.balance-scale",
            "native.paper-ink.107.interlocking-gears",
        }
    }
    assert set(classics) == {
        "native.paper-ink.106.balance-scale",
        "native.paper-ink.107.interlocking-gears",
    }, "经典关系组件缺生产路由"
    assert classics["native.paper-ink.106.balance-scale"].get("relation_keys") == ["comparison"]
    assert classics["native.paper-ink.107.interlocking-gears"].get("relation_keys") == ["network"]

    echarts_vendor = json.loads(
        (ROOT / "capabilities/vendors/echarts/catalog.json").read_text(encoding="utf-8")
    )
    echarts_gallery_text = (ROOT / "references/gallery-components/echarts-catalog-data.js").read_text(
        encoding="utf-8"
    )
    echarts_gallery = json.JSONDecoder().raw_decode(
        echarts_gallery_text[echarts_gallery_text.index("{"):]
    )[0]
    echarts_vendor_ids = {item["component_id"] for item in echarts_vendor["components"]}
    echarts_gallery_ids = {item["component_id"] for item in echarts_gallery["components"]}
    assert echarts_gallery_ids == echarts_vendor_ids, (
        "echarts 画册镜像与 vendors catalog 不闭合:"
        f" 漏 {sorted(echarts_vendor_ids - echarts_gallery_ids)}"
        f" / 多 {sorted(echarts_gallery_ids - echarts_vendor_ids)}"
    )
    assert len(echarts_gallery_ids) == echarts_vendor["component_count"] == 13, "echarts 计数不闭合"
    assert '"generated_from"' not in echarts_gallery_text, "echarts 镜像是手工维护,不得声称生成物"

    assert "./component-routing-data.js" in catalog, "Catalog 未加载组件路由投影"
    assert ROUTING_DATA.exists(), "缺 component-routing-data.js"
    assert "componentRelationLabels(c)" in catalog, "组件卡仍未使用生产关系标签"
    for forbidden in (
        "variant-empty-meta",
        "taxonomy 无此空槽版式",
        "taxonomy 空槽版式 ·",
        "同槽合并 ·",
        "A7 是 4×7",
        "F4 是 2×3",
    ):
        assert forbidden not in catalog, f"结构空槽卡仍显示来源说明: {forbidden}"
    for required_grid_example in ("Q4 是 2×2", "R3 是 2×3", "R7 是 4×7"):
        assert required_grid_example in catalog, f"真实页面网格说明缺失: {required_grid_example}"

    print("检查通过: 68 张关系版式 + 12 张非关系模板 = 80 帧。")
    print("六结构计数: 单区41 / 左右等分8 / 上下等分3 / 左右不对称8 / 上下不对称5 / 网格3。")
    print("表A 版式例列覆盖全部 68 版式;semantic_override 词表与 23 细种同键同序。")
    print("23 细种均有版式与生产组件覆盖；Q1–Q4、R1–R7 槽位、配方、指纹和路由闭合。")
    print("Q4 四槽、R3 六槽、R6 四槽、R7 二十八槽均逐槽独立绑定；没有用组件内部重复单元冒充页面结构。")
    print("R4/R5 关系页直接物化组件；结构页示例直接复用关系页帧，三入口无私有副本。")
    print("Q3 下层流程框已收在 y<=890，页底结论保留独立安全区。")
    print("echarts 画册镜像 13 条与 vendors catalog 逐 id 闭合(手工镜像,不得声称生成物)。")
    print("边界: 本仓库只登记 GLM Catalog 与 gallery recipe；内核 blueprint/composition preset 未手填。")


if __name__ == "__main__":
    main()
