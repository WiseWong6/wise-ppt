#!/usr/bin/env python3
"""把 Catalog 的仅浏览抄录件转为稳定的 Paper Ink 生产组件。

默认执行迁移；--check 只读验证。迁移只处理原来标记 bo:1 的 14 张卡：
12 个 NEW_MARKUP 实际变体，以及 native 89/90/93 三个已有 snippet。
时间轴卡含横竖两个变体，因此最终新增 15 个 production component ID。
"""

from __future__ import annotations

import argparse
import json
import re
from collections import Counter
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / "references/catalog.html"
NATIVE_SOURCE = ROOT / "capabilities/layouts/paper-ink-components.js"
ROUTING = ROOT / "capabilities/components/routing-manifest.json"

BEGIN_MARKER = "  /* BEGIN promoted catalog components v120 */"
END_MARKER = "  /* END promoted catalog components v120 */"


def str_schema(max_length: int = 4000) -> dict:
    return {"type": "string", "minLength": 1, "maxLength": max_length}


def item_schema(*, with_value: bool = False) -> dict:
    properties = {
        "id": {
            "type": "string",
            "minLength": 1,
            "maxLength": 160,
            "pattern": "^[A-Za-z0-9][A-Za-z0-9._:-]{0,159}$",
        },
        "label": str_schema(240),
        "description": str_schema(),
        "code": str_schema(240),
    }
    if with_value:
        properties.update(
            {
                "value": {"type": ["string", "number"]},
                "unit": str_schema(80),
            }
        )
    return {
        "type": "object",
        "additionalProperties": False,
        "required": ["id", "label"],
        "properties": properties,
    }


def collection_schema(prop: str, minimum: int, maximum: int, *, with_value: bool = False) -> dict:
    return {
        "type": "object",
        "additionalProperties": False,
        "required": [prop],
        "properties": {
            "title": str_schema(240),
            prop: {
                "type": "array",
                "minItems": minimum,
                "maxItems": maximum,
                "items": item_schema(with_value=with_value),
            },
        },
    }


def graph_schema(minimum: int, maximum: int) -> dict:
    return {
        "type": "object",
        "additionalProperties": False,
        "required": ["nodes", "links"],
        "properties": {
            "title": str_schema(240),
            "nodes": {
                "type": "array",
                "minItems": minimum,
                "maxItems": maximum,
                "items": item_schema(),
            },
            "links": {
                "type": "array",
                "minItems": max(1, minimum - 1),
                "maxItems": maximum * 3,
                "items": {
                    "type": "object",
                    "additionalProperties": False,
                    "required": ["source", "target"],
                    "properties": {
                        "source": str_schema(160),
                        "target": str_schema(160),
                        "label": str_schema(240),
                        "weight": {"type": "number"},
                    },
                },
            },
        },
    }


def scenario_schema() -> dict:
    return {
        "type": "object",
        "additionalProperties": False,
        "required": ["title", "pain", "steps", "result"],
        "properties": {
            "title": str_schema(240),
            "code": str_schema(80),
            "pain": {
                "type": "array",
                "minItems": 1,
                "maxItems": 2,
                "items": str_schema(),
            },
            "steps": {
                "type": "array",
                "minItems": 3,
                "maxItems": 3,
                "items": item_schema(),
            },
            "stages": {
                "type": "array",
                "minItems": 3,
                "maxItems": 3,
                "items": item_schema(),
            },
            "result": str_schema(),
        },
    }


# new_index=None 表示 snippet 已在 paper-ink-components.js 中，只补路由。
PROMOTIONS = [
    dict(new_index=None, num=89, canonical="metric-strip", label="自适应指标横带", group="metric-data", group_label="指标与数据", relation="metric", input_family="quantitative-series", action="quantify", unit="metric", minimum=2, maximum=4, frame=(1050, 140), renderer="native-html", archetype="metric-band", schema=collection_schema("metrics", 2, 4, with_value=True), description="Two to four bound metrics in one adaptive horizontal band."),
    dict(new_index=None, num=90, canonical="scenario-column", label="单场景纵列（K4 固定版）", group="flow-temporal", group_label="流程与时序", relation="sequence", input_family="temporal-series", action="sequence", unit="scenario", minimum=1, maximum=1, frame=(540, 690), renderer="svg", archetype="scenario-pain-fix-ship", schema=scenario_schema(), description="One fixed K4 scenario column binding pain, three fix steps and rollout result."),
    dict(new_index=None, num=93, canonical="infra-strip", label="自适应基础设施横带", group="document-text", group_label="文档与文本", relation="display", input_family="hierarchy", action="show-hierarchy", unit="item", minimum=3, maximum=6, frame=(1050, 260), renderer="svg", archetype="capability-band", schema=collection_schema("items", 3, 6), description="Three to six infrastructure capabilities in one complete platform band."),
    dict(new_index=0, num=94, canonical="mapping-arc-network", label="映射弧线网", group="relation-mapping", group_label="关系与映射", relation="mapping", input_family="network-flow", action="show-flow", unit="node", minimum=4, maximum=12, frame=(1100, 619), renderer="svg", archetype="bipartite-mapping", schema=graph_schema(4, 12), description="A two-sided mapping network with primary and shared curved links."),
    dict(new_index=1, num=95, canonical="weighted-arc-web", label="权重弧网", group="relation-mapping", group_label="关系与映射", relation="network", input_family="causal-network", action="connect-causality", unit="node", minimum=4, maximum=8, frame=(1781, 1002), renderer="svg", archetype="weighted-arc-network", schema=graph_schema(4, 8), description="A fixed-geometry node row with weighted relationship arcs."),
    dict(new_index=2, num=96, canonical="three-way-radial", label="三向放射图", group="hierarchy-structure", group_label="层级与结构", relation="decomposition", input_family="hierarchy", action="show-hierarchy", unit="branch", minimum=3, maximum=3, frame=(1443, 812), renderer="svg", archetype="radial-decomposition", schema=collection_schema("branches", 3, 3), description="A central statement decomposed into exactly three radial branches."),
    dict(new_index=3, num=97, canonical="nested-frames", label="嵌套框", group="hierarchy-structure", group_label="层级与结构", relation="nesting", input_family="hierarchy", action="show-hierarchy", unit="layer", minimum=3, maximum=5, frame=(1476, 830), renderer="svg", archetype="nested-layers", schema=collection_schema("layers", 3, 5), description="Three to five nested frames for containment and zoom levels."),
    dict(new_index=4, num=98, canonical="ranking-bars", label="排行柱图", group="metric-data", group_label="指标与数据", relation="ranking", input_family="quantitative-series", action="show-distribution", unit="ranked-item", minimum=3, maximum=8, frame=(972, 547), renderer="svg", archetype="ranked-bars", schema=collection_schema("items", 3, 8, with_value=True), description="Three to eight ranked items rendered as specimen bars."),
    dict(new_index=5, num=99, canonical="serpentine-loop", label="蛇形回环", group="flow-temporal", group_label="流程与时序", relation="cycle", input_family="temporal-series", action="cycle", unit="step", minimum=5, maximum=8, frame=(1017, 572), renderer="svg", archetype="serpentine-cycle", schema=collection_schema("steps", 5, 8), description="A five-to-eight-step serpentine closed loop."),
    dict(new_index=6, num=100, canonical="cycle-ring", label="环形循环", group="flow-temporal", group_label="流程与时序", relation="cycle", input_family="temporal-series", action="cycle", unit="step", minimum=3, maximum=6, frame=(978, 550), renderer="svg", archetype="ring-cycle", schema=collection_schema("steps", 3, 6), description="A three-to-six-stage circular governance loop with callouts."),
    dict(new_index=7, num=101, canonical="journey-curve", label="旅程曲线", group="flow-temporal", group_label="流程与时序", relation="sequence", input_family="temporal-series", action="sequence", unit="milestone", minimum=4, maximum=6, frame=(1049, 590), renderer="svg", archetype="journey-curve", schema=collection_schema("milestones", 4, 6), description="A four-to-six-milestone journey plotted on a curved route."),
    dict(new_index=8, num=102, canonical="timeline-axis-horizontal", label="时间轴（横排）", group="flow-temporal", group_label="流程与时序", relation="sequence", input_family="temporal-series", action="sequence", unit="milestone", minimum=3, maximum=6, frame=(1044, 587), renderer="svg", archetype="timeline-horizontal", schema=collection_schema("milestones", 3, 6), description="A horizontal ruled timeline with milestone annotations."),
    dict(new_index=9, num=103, canonical="concentric-ring", label="同心环", group="hierarchy-structure", group_label="层级与结构", relation="nesting", input_family="hierarchy", action="show-hierarchy", unit="layer", minimum=3, maximum=5, frame=(1249, 702), renderer="svg", archetype="concentric-layers", schema=collection_schema("layers", 3, 5), description="Three to five concentric containment rings with side explanations."),
    dict(new_index=10, num=104, canonical="timeline-axis-vertical", label="时间轴（竖排）", group="flow-temporal", group_label="流程与时序", relation="sequence", input_family="temporal-series", action="sequence", unit="milestone", minimum=3, maximum=6, frame=(540, 600), renderer="svg", archetype="timeline-vertical", schema=collection_schema("milestones", 3, 6), description="A vertical ruled timeline for narrow slots."),
    dict(new_index=11, num=105, canonical="diamond-edge-labels", label="菱形四边标注", group="relation-mapping", group_label="关系与映射", relation="mapping", input_family="causal-network", action="connect-causality", unit="node", minimum=4, maximum=4, frame=(1100, 619), renderer="svg", archetype="diamond-edge-mapping", schema=graph_schema(4, 4), description="Four fixed nodes in a diamond with independently labelled edges."),
]


def component_id(meta: dict) -> str:
    return f"native.paper-ink.{meta['num']:03d}.{meta['canonical']}"


def extract_new_markup(catalog: str) -> list[str]:
    start = catalog.index("const NEW_MARKUP=[")
    end = catalog.index("/* 反向抽取:", start)
    block = catalog[start:end]
    markups = re.findall(r"`([\s\S]*?)`", block)
    if len(markups) != 12:
        raise AssertionError(f"NEW_MARKUP 应有 12 个实际变体，当前 {len(markups)}")
    for markup in markups:
        if "${" in markup or "`" in markup:
            raise AssertionError("抄录 markup 含模板插值或反引号，不能安全迁移")
    return markups


def native_entry(meta: dict, markup: str) -> str:
    width, height = meta["frame"]
    markup = "\n".join(line.rstrip() for line in markup.splitlines())
    markup = markup.replace('<div class="pi-card"', '<div class="pi-card" data-bind-root="record"', 1)
    markup = markup.replace("<svg ", '<svg class="pi-art" ', 1)
    data_contract = {
        "mode": "record" if meta["archetype"] in {"bipartite-mapping", "weighted-arc-network", "diamond-edge-mapping"} else "collection",
        "unit": meta["unit"],
        "pointer": "/structured_data",
        "minItems": meta["minimum"],
        "maxItems": meta["maximum"],
    }
    return "\n".join(
        [
            "  {",
            f"    name: {json.dumps(meta['canonical'], ensure_ascii=False)},",
            f"    group: {json.dumps(meta['group'], ensure_ascii=False)},",
            f"    groupLabel: {json.dumps(meta['group_label'], ensure_ascii=False)},",
            f"    description: {json.dumps(meta['description'], ensure_ascii=False)},",
            f"    label: {json.dumps(meta['label'], ensure_ascii=False)},",
            f"    num: {meta['num']},",
            "    variant: null,",
            "    paperInkNative: true,",
            f"    frame: {{ width: {width}, height: {height}, fit: 'fixed' }},",
            f"    dataContract: {json.dumps(data_contract, ensure_ascii=False, separators=(',', ':'))},",
            f"    /* production promotion: Catalog new:{meta['new_index']} → {component_id(meta)} */",
            f"    snippet: `{markup}`",
            "  }",
        ]
    )


def routing_entry(meta: dict) -> dict:
    width, height = meta["frame"]
    ratio = width / height
    min_width = max(240, round(width * 0.65 / 10) * 10)
    min_height = max(140, round(height * 0.65 / 10) * 10)
    min_ratio = round(max(0.45, ratio / 2.2), 2)
    max_ratio = round(min(10.0, ratio * 2.2), 2)
    cid = component_id(meta)
    relation = meta["relation"]
    primitive = {
        "metric": "metric-band",
        "display": "content-frame",
        "sequence": "linear-sequence",
        "cycle": "cyclic-sequence",
        "mapping": "node-link",
        "network": "node-link",
        "decomposition": "radial-axis",
        "nesting": "layered-stack",
        "ranking": "coordinate-plot",
    }[relation]
    return {
        "component_id": cid,
        "name": meta["label"],
        "canonical_name": meta["canonical"],
        "variant": None,
        "group": meta["group"],
        "group_label": meta["group_label"],
        "description": meta["description"],
        "aliases": [meta["canonical"], meta["label"], str(meta["num"])],
        "renderer_kinds": [meta["renderer"]],
        "component_sources": ["native"],
        "roles": ["explain", "prove"],
        "relations": [relation],
        "relation_keys": [relation],
        "primitives": [primitive],
        "tasks": [relation, "content"],
        "selection_notes": f"Use {cid} only when slot geometry and the typed data contract both fit.",
        "requires": [],
        "space_requirements": {
            "min_width": min_width,
            "min_height": min_height,
            "min_aspect_ratio": min_ratio,
            "max_aspect_ratio": max_ratio,
        },
        "capacity": {
            "min_items": meta["minimum"],
            "max_items": meta["maximum"],
            "unit": meta["unit"],
        },
        "frame": {"width": width, "height": height, "fit": "fixed"},
        "semantic_contract": {
            "input_family": meta["input_family"],
            "role": "primary-proof",
            "visual_action": meta["action"],
            "capacity": {
                "mode": "fixed" if meta["minimum"] == meta["maximum"] else "range",
                "unit": meta["unit"],
                "min": meta["minimum"],
                "max": meta["maximum"],
            },
            "derivation": "explicit-data-bound-v1",
        },
        "binding_archetype": meta["archetype"],
        "data_contract": {
            "mode": "typed-structured-content",
            "contract_id": f"{cid}@1",
            "reference_mode": "one-item-plus-owned-atoms",
            "content_ref_cardinality": {"min": 1, "max": 1},
            "schema": meta["schema"],
        },
        "production_readiness": {"status": "ready"},
        "dependencies": ["paper-ink-components"],
        "source": {
            "kind": "paper-ink-snippet",
            "module": "capabilities/layouts/paper-ink-components.js",
            "entry_num": meta["num"],
        },
        "binding_contract": {"mode": "collection", "unit": meta["unit"]},
    }


def source_counts(components: list[dict]) -> dict:
    counts = Counter()
    for component in components:
        sources = component.get("component_sources") or []
        if sources:
            counts[sources[0]] += 1
    return {
        "ppt-component-atlas": counts["ppt-component-atlas"],
        "echarts": counts["echarts"],
        "native": counts["native"],
        "codex-host": counts["codex-host"],
    }


def migrate() -> None:
    catalog = CATALOG.read_text()
    native = NATIVE_SOURCE.read_text()
    manifest = json.loads(ROUTING.read_text())

    if BEGIN_MARKER not in native:
        markups = extract_new_markup(catalog)
        entries = []
        for meta in PROMOTIONS:
            if meta["new_index"] is not None:
                entries.append(native_entry(meta, markups[meta["new_index"]]))
        insertion = BEGIN_MARKER + "\n" + ",\n\n".join(entries) + "\n" + END_MARKER
        match = re.search(r"\n  }\n  ]\n};\s*$", native)
        if not match:
            raise AssertionError("未找到 paper-ink-components entries 的结尾")
        native = native[: match.start()] + "\n  },\n\n" + insertion + "\n  ]\n};\n"

        start = catalog.index("/* ============ 版式抽取组件")
        end = catalog.index("/* 反向抽取:", start)
        catalog = (
            catalog[:start]
            + "/* 版式抄录组件已迁入 capabilities/layouts/paper-ink-components.js；不再保留 Catalog 私有源码。 */\n"
            + "const NEW_MARKUP=[];\n\n"
            + catalog[end:]
        )

    for meta in PROMOTIONS:
        index = meta["new_index"]
        if index is None:
            continue
        catalog = re.sub(
            rf"t:'new',mk:{index}(?=,)",
            f"t:'native',num:{meta['num']}",
            catalog,
        )
        catalog = catalog.replace(f"'new:{index}'", f"'native:{meta['num']}'")

    # v120 首次迁移时 new:1 的前缀曾误匹配 new:11；保留显式修复，确保脚本可自愈。
    catalog = catalog.replace(
        "t:'native',num:951,en:'diamond-edge-labels'",
        "t:'native',num:105,en:'diamond-edge-labels'",
    )

    browse_count = catalog.count("bo:1")
    if browse_count not in (0, 14):
        raise AssertionError(f"仅浏览标记预期为 14 或 0，当前 {browse_count}")
    catalog = catalog.replace(",bo:1", "")
    catalog = catalog.replace(
        "nm:'单场景纵列（K4 抄录）',note:'固定 540×690 版式抄录件；不同于 production 的 semantic.scenario-column'",
        "nm:'单场景纵列（K4 固定版）',note:'固定 540×690 生产组件；semantic.scenario-column 为流式替代'",
    )
    catalog = catalog.replace(
        "t: 'atlas' | 'native' | 'ec' | 'new';atlas/native 用 num,ec 用 id,new 用 mk",
        "t: 'atlas' | 'native' | 'ec';atlas/native 用 num,ec 用 id",
    )
    catalog = catalog.replace(
        "反向抽取:11 个抽取组件已按原版 scene 抄录入池(t:'new'),可并入项均不并入、独立入池;",
        "反向抽取:12 个实际变体已按原版 scene 抄录并转正为 native:94–105,可并入项仍独立入池;",
    )

    promoted_ids = {component_id(meta) for meta in PROMOTIONS}
    manifest["components"] = [
        component for component in manifest["components"] if component["component_id"] not in promoted_ids
    ]
    new_entries = [routing_entry(meta) for meta in PROMOTIONS]
    insert_at = next(
        (i for i, component in enumerate(manifest["components"]) if component["component_id"].startswith("native.paper-ink.media.")),
        len(manifest["components"]),
    )
    manifest["components"][insert_at:insert_at] = new_entries
    manifest["component_count"] = len(manifest["components"])
    manifest["source_counts"] = source_counts(manifest["components"])

    NATIVE_SOURCE.write_text(native)
    CATALOG.write_text(catalog)
    ROUTING.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n")


def check() -> None:
    catalog = CATALOG.read_text()
    native = NATIVE_SOURCE.read_text()
    manifest = json.loads(ROUTING.read_text())
    ids = {component["component_id"]: component for component in manifest["components"]}

    assert catalog.count("bo:1") == 0, "Catalog 仍有仅浏览卡片"
    assert "NEW_MARKUP" not in catalog, "Catalog 私有抄录源码未清空"
    assert BEGIN_MARKER in native and END_MARKER in native, "正式组件源缺少迁移区"
    assert manifest["component_count"] == len(manifest["components"]), "component_count 不闭合"
    assert manifest["source_counts"] == source_counts(manifest["components"]), "source_counts 不闭合"

    catalog_block_match = re.search(
        r"const SMARTART_COMPONENTS=\[(.*?)\n\];\n\n/\* 分类闭合",
        catalog,
        re.S,
    )
    assert catalog_block_match, "未找到 SMARTART_COMPONENTS"
    catalog_block = catalog_block_match.group(1)
    assert not re.search(r"\{t:'new'", catalog_block), "Catalog 主卡仍引用 new:*"
    assert not re.search(r"\['new:", catalog_block), "Catalog 变体仍引用 new:*"
    specs = []
    for kind, number, echarts_id in re.findall(
        r"\{t:'(atlas|native|ec)'(?:,num:(\d+)|,id:'([^']+)')",
        catalog_block,
    ):
        specs.append((kind, echarts_id or number))
    specs.extend(re.findall(r"\['(atlas|native|ec):([^']+)'", catalog_block))
    missing_routes = []
    for kind, key in sorted(set(specs)):
        if kind == "ec":
            found = key in ids
        elif kind == "atlas":
            found = any(cid.startswith(f"atlas.{int(key):03d}.") for cid in ids)
        else:
            found = any(cid.startswith(f"native.paper-ink.{int(key):03d}.") for cid in ids)
        if not found:
            missing_routes.append(f"{kind}:{key}")
    assert not missing_routes, "Catalog 缺生产路由: " + ", ".join(missing_routes)

    vocabulary = set(manifest.get("relation_key_vocabulary") or [])
    for meta in PROMOTIONS:
        cid = component_id(meta)
        assert cid in ids, f"路由缺少 {cid}"
        entry = ids[cid]
        assert entry.get("production_readiness", {}).get("status") == "ready", f"{cid} 未 ready"
        assert entry.get("data_contract", {}).get("schema"), f"{cid} 缺 data_contract"
        assert entry.get("source", {}).get("entry_num") == meta["num"], f"{cid} 源编号错误"
        assert meta["relation"] in vocabulary, f"{cid} relation_key 不在统一词表"
        assert re.search(rf"\bnum:\s*{meta['num']}\b", native), f"native 源缺少 num {meta['num']}"
        if meta["new_index"] == 10:
            assert f"'native:{meta['num']}'" in catalog, f"Catalog 变体未引用 {cid}"
        elif meta["new_index"] is not None:
            assert re.search(
                rf"\{{t:'native',num:{meta['num']}(?=,)", catalog
            ), f"Catalog 未引用 {cid}"

    assert len(manifest["components"]) == 126, f"路由应为 126，当前 {len(manifest['components'])}"
    assert manifest["source_counts"]["native"] == 57, "native 路由应为 57"
    print(
        "检查通过: 14 张原仅浏览卡全部转正，15 个稳定 ID ready；"
        f"Catalog {len(set(specs))} 个主卡/变体 spec 均有路由；routing 126 = native 57 + 其他 69。"
    )


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true", help="只读验证，不改文件")
    args = parser.parse_args()
    if not args.check:
        migrate()
    check()


if __name__ == "__main__":
    main()
