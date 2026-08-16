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
    assert len(rows) == 60, f"关系版式应为 60，当前 {len(rows)}"
    by_code = {code: (name, structure, relation) for code, name, structure, relation in rows}
    assert len(by_code) == 60, "关系版式编号有重复"

    corrected = {"A7", "F4", "A9", "E3", "E6", "I3", "H3", "H4", "E1", "E2", "K1", "C6"}
    wrong = sorted(code for code in corrected if by_code[code][1] != "单区")
    assert not wrong, f"组件内分格仍被误标为页面结构: {wrong}"
    expected_new = {
        "Q1": ("单区", ["overlap"]),
        "Q2": ("左右不对称", ["part-whole", "evidence"]),
        "Q3": ("上下2等分", ["comparison", "flow"]),
        "Q4": ("网格2×2", ["evidence", "display"]),
    }
    for code, (structure, relations) in expected_new.items():
        assert by_code[code][1] == structure, f"{code} 结构不符"
        assert relation_keys(by_code[code][2]) == relations, f"{code} 关系不符"

    counts = collections.Counter(structure_key(row[2]) for row in rows)
    expected_counts = {
        "single": 38,
        "heq": 7,
        "veq": 1,
        "hasym": 8,
        "vasym": 5,
        "grid": 1,
    }
    assert dict(counts) == expected_counts, f"六结构计数不符: {dict(counts)}"

    frame_codes = {
        path.stem.removeprefix("layout-").upper()
        for path in FRAMES.glob("layout-*.html")
    }
    assert len(frame_codes) == 72, f"画册帧应为 72，当前 {len(frame_codes)}"
    assert set(by_code).issubset(frame_codes), "有关系版式缺 HTML 帧"

    layouts = json.loads(LAYOUTS.read_text(encoding="utf-8"))
    recipes = layouts["recipes"]
    assert layouts["recipe_count"] == len(recipes) == 68, "recipe_count 不闭合"
    assert layouts["page_expression_contract"]["profile_count"] == 68, "profile_count 不闭合"
    recipes_by_code = {recipe["display_code"]: recipe for recipe in recipes}
    assert len(recipes_by_code) == 68, "gallery-manifest display_code 有重复"
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

    assert "./component-routing-data.js" in catalog, "Catalog 未加载组件路由投影"
    assert ROUTING_DATA.exists(), "缺 component-routing-data.js"
    assert "componentRelationLabels(c)" in catalog, "组件卡仍未使用生产关系标签"

    print("检查通过: 60 张关系版式 + 12 张非关系模板 = 72 帧。")
    print("六结构计数: 单区38 / 左右等分7 / 上下等分1 / 左右不对称8 / 上下不对称5 / 网格1。")
    print("23 细种均有版式与生产组件覆盖；Q1–Q4 槽位、配方、指纹和路由闭合。")
    print("边界: 本仓库只登记 GLM Catalog 与 gallery recipe；内核 blueprint/composition preset 未手填。")


if __name__ == "__main__":
    main()
