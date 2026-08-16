#!/usr/bin/env python3
"""将 gallery-manifest 的 relations 对齐到 catalog 的 23 细种口径。

默认写回 manifest；--check 只读核对。只改每份 recipe 的 relations 字段，
不改槽位、结构合同、指纹或其他配方数据。
"""

from __future__ import annotations

import argparse
import collections
import json
import re
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
CATALOG_PATH = REPO_ROOT / "references" / "catalog.html"
MANIFEST_PATH = REPO_ROOT / "capabilities" / "layouts" / "gallery-manifest.json"

# 与 SKILL.md 表 A / 表 B、routing-manifest relation_key_vocabulary 同口径。
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


def extract_const_block(source: str, start_marker: str, end_marker: str) -> str:
    start = source.index(start_marker)
    end = source.index(end_marker, start)
    return source[start:end]


def relation_keys(label: str) -> list[str]:
    hits = []
    for order, (zh_name, key) in enumerate(ZH_TO_KEY.items()):
        position = label.find(zh_name)
        if position >= 0:
            hits.append((position, order, key))
    hits.sort()
    return [key for _, _, key in hits]


def parse_catalog(source: str) -> tuple[dict[str, list[str]], set[str]]:
    relation_block = extract_const_block(
        source, "const SMARTART_TYPES=[", "/* 组件统一池"
    )
    relation_rows = re.findall(
        r"\[\s*'([A-Z]\d+)'\s*,\s*'[^']*'\s*,\s*'[^']*'\s*,\s*'([^']+)'\s*\]",
        relation_block,
    )
    relation_map: dict[str, list[str]] = {}
    for code, label in relation_rows:
        keys = relation_keys(label)
        if not keys:
            raise ValueError(f"catalog 版式 {code} 的关系标签无法识别: {label}")
        if code in relation_map:
            raise ValueError(f"catalog 版式编号重复: {code}")
        relation_map[code] = keys

    template_block = extract_const_block(
        source, "const NON_REL_GROUPS=[", "const NON_REL="
    )
    template_codes = set(
        re.findall(
            r"\[\s*'([A-Z]\d+)'\s*,\s*'[^']*'\s*,\s*'[^']*'\s*\]",
            template_block,
        )
    )
    overlap = sorted(set(relation_map) & template_codes)
    if overlap:
        raise ValueError(f"catalog 关系版式与非关系模板编号重叠: {overlap}")
    return relation_map, template_codes


def expected_relations(
    manifest: dict, relation_map: dict[str, list[str]], template_codes: set[str]
) -> dict[str, list[str]]:
    expected: dict[str, list[str]] = {}
    seen: set[str] = set()
    for recipe in manifest["recipes"]:
        code = recipe["display_code"]
        if code in seen:
            raise ValueError(f"gallery-manifest display_code 重复: {code}")
        seen.add(code)
        if code in relation_map:
            expected[code] = relation_map[code]
        elif code in template_codes:
            expected[code] = []
        else:
            raise ValueError(f"gallery-manifest 编号未登记进 catalog: {code}")
    return expected


def verify(
    manifest: dict,
    expected: dict[str, list[str]],
    relation_map: dict[str, list[str]],
    template_codes: set[str],
) -> None:
    vocabulary = set(ZH_TO_KEY.values())
    actual_by_code = {
        recipe["display_code"]: recipe.get("relations", [])
        for recipe in manifest["recipes"]
    }
    mismatches = {
        code: {"actual": actual_by_code[code], "expected": keys}
        for code, keys in expected.items()
        if actual_by_code[code] != keys
    }
    if mismatches:
        raise AssertionError(
            "relations 与 catalog 不一致:\n"
            + json.dumps(mismatches, ensure_ascii=False, indent=2)
        )

    invalid = sorted(
        {
            key
            for keys in actual_by_code.values()
            for key in keys
            if key not in vocabulary
        }
    )
    if invalid:
        raise AssertionError(f"relations 含 23 细种之外的键: {invalid}")

    relation_codes = {code for code, keys in expected.items() if keys}
    template_recipe_codes = {code for code, keys in expected.items() if not keys}
    if len(manifest["recipes"]) != manifest.get("recipe_count"):
        raise AssertionError(
            f"recipe_count={manifest.get('recipe_count')}，实际={len(manifest['recipes'])}"
        )

    coverage = collections.Counter(
        key for recipe in manifest["recipes"] for key in recipe.get("relations", [])
    )
    catalog_only_relations = sorted(set(relation_map) - set(expected))
    catalog_only_templates = sorted(template_codes - set(expected))
    print(f"OK: {len(manifest['recipes'])} 份 recipe 逐张对齐 catalog")
    print(
        f"关系版式 {len(relation_codes)} 份均非空；"
        f"非关系模板 {len(template_recipe_codes)} 份均为空数组"
    )
    print("23 细种覆盖计数:", dict(sorted(coverage.items())))
    if catalog_only_relations:
        print("提示: catalog 新增但尚未进入 gallery-manifest 的关系版式:", catalog_only_relations)
    if catalog_only_templates:
        print(
            "信息: catalog 画册模板按当前合同不进 gallery-manifest:",
            catalog_only_templates,
        )


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="只读核对，不写文件")
    args = parser.parse_args()

    catalog_source = CATALOG_PATH.read_text(encoding="utf-8")
    relation_map, template_codes = parse_catalog(catalog_source)
    manifest = json.loads(
        MANIFEST_PATH.read_text(encoding="utf-8"),
        object_pairs_hook=collections.OrderedDict,
    )
    expected = expected_relations(manifest, relation_map, template_codes)

    if not args.check:
        for recipe in manifest["recipes"]:
            recipe["relations"] = expected[recipe["display_code"]]
        MANIFEST_PATH.write_text(
            json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )

    verify(manifest, expected, relation_map, template_codes)


if __name__ == "__main__":
    main()
