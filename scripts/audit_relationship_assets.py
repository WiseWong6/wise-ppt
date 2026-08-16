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
FRAMES = ROOT / "references" / "gallery-paper-ink" / "ai" / "frames"
LAYOUTS = ROOT / "capabilities" / "layouts" / "gallery-manifest.json"
ROUTING = ROOT / "capabilities" / "components" / "routing-manifest.json"
ROUTING_DATA = ROOT / "references" / "component-routing-data.js"

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
    assert len(rows) == 67, f"关系版式应为 67，当前 {len(rows)}"
    by_code = {code: (name, structure, relation) for code, name, structure, relation in rows}
    assert len(by_code) == 67, "关系版式编号有重复"

    corrected = {"A7", "F4", "A9", "E3", "E6", "I3", "H3", "H4", "E1", "E2", "K1", "C6"}
    wrong = sorted(code for code in corrected if by_code[code][1] != "单区")
    assert not wrong, f"组件内分格仍被误标为页面结构: {wrong}"
    expected_new = {
        "Q1": ("单区", ["overlap"]),
        "Q2": ("左右不对称", ["part-whole", "evidence"]),
        "Q3": ("上下2等分", ["comparison", "flow"]),
        "Q4": ("网格2×2", ["evidence", "display"]),
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
        "single": 40,
        "heq": 8,
        "veq": 3,
        "hasym": 8,
        "vasym": 5,
        "grid": 3,
    }
    assert dict(counts) == expected_counts, f"六结构计数不符: {dict(counts)}"

    frame_codes = {
        path.stem.removeprefix("layout-").upper()
        for path in FRAMES.glob("layout-*.html")
    }
    assert len(frame_codes) == 79, f"画册帧应为 79，当前 {len(frame_codes)}"
    assert set(by_code).issubset(frame_codes), "有关系版式缺 HTML 帧"

    layouts = json.loads(LAYOUTS.read_text(encoding="utf-8"))
    recipes = layouts["recipes"]
    assert layouts["recipe_count"] == len(recipes) == 75, "recipe_count 不闭合"
    assert layouts["page_expression_contract"]["profile_count"] == 75, "profile_count 不闭合"
    recipes_by_code = {recipe["display_code"]: recipe for recipe in recipes}
    assert len(recipes_by_code) == 75, "gallery-manifest display_code 有重复"
    assert set(by_code).issubset(recipes_by_code), "有关系版式缺 gallery recipe"
    for code, (_, _, label) in by_code.items():
        recipe = recipes_by_code[code]
        assert recipe.get("relations") == relation_keys(label), f"{code} relations 与 Catalog 不一致"
        assert recipe.get("structure_fingerprint") == fingerprint(recipe), f"{code} 结构指纹失效"
    for code in expected_new:
        frame = (FRAMES / f"layout-{code.lower()}.html").read_text(encoding="utf-8")
        required = recipes_by_code[code]["structure_contract"]["required_slot_ids"]
        missing = [slot for slot in required if f'data-slot-id="{slot}"' not in frame]
        assert not missing, f"{code} 帧缺必需槽位: {missing}"

    for code, expected_slot_count in (("R3", 6), ("R6", 4), ("R7", 28)):
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

    print("检查通过: 67 张关系版式 + 12 张非关系模板 = 79 帧。")
    print("六结构计数: 单区40 / 左右等分8 / 上下等分3 / 左右不对称8 / 上下不对称5 / 网格3。")
    print("23 细种均有版式与生产组件覆盖；Q1–Q4、R1–R7 槽位、配方、指纹和路由闭合。")
    print("R3 六槽、R6 四槽、R7 二十八槽均逐槽独立绑定；没有用组件内部重复单元冒充页面结构。")
    print("R4/R5 关系页直接物化组件；结构页示例直接复用关系页帧，三入口无私有副本。")
    print("Q3 下层流程框已收在 y<=890，页底结论保留独立安全区。")
    print("边界: 本仓库只登记 GLM Catalog 与 gallery recipe；内核 blueprint/composition preset 未手填。")


if __name__ == "__main__":
    main()
