#!/usr/bin/env python3
"""Build the file://-safe Wise PPT icon catalog data artifact."""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path


HERE = Path(__file__).resolve().parent
DEFAULT_SKILL_ROOT = HERE.parents[1] / "wise-ppt"
OUTPUT = HERE / "icon-catalog-data.js"
VALID_REDRAW_STATUS = {"todo", "in_progress", "candidate", "approved", "rejected"}
EXISTING_GROUPS = ("文档", "人物", "数据", "流程", "媒体", "AI")
OFFICIAL_CATEGORY_LABELS = {
    "Animals": "动物", "Arrows": "箭头", "Badges": "徽章", "Brand": "品牌",
    "Buildings": "建筑", "Charts": "图表", "Communication": "沟通", "Computers": "电脑",
    "Currencies": "货币", "Database": "数据库", "Design": "设计", "Development": "开发",
    "Devices": "设备", "Document": "文档", "E-commerce": "电商", "Electrical": "电气",
    "Extensions": "扩展", "Food": "食物", "Games": "游戏", "Gender": "性别",
    "Gestures": "手势", "Health": "健康", "Laundry": "洗护", "Letters": "字母",
    "Logic": "逻辑", "Map": "地图", "Math": "数学", "Media": "媒体",
    "Mood": "情绪", "Nature": "自然", "Numbers": "数字", "Photography": "摄影",
    "Shapes": "形状", "Sport": "运动", "Symbols": "符号", "System": "系统",
    "Text": "文本", "Vehicles": "交通", "Version control": "版本控制", "Weather": "天气",
    "Zodiac": "星座",
}


class CatalogBuildError(ValueError):
    pass


def _load_json(path: Path) -> dict:
    try:
        payload = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        raise CatalogBuildError(f"无法读取 {path}") from exc
    if not isinstance(payload, dict):
        raise CatalogBuildError(f"{path} 顶层必须是对象")
    return payload


def _existing_group(name: str) -> str:
    tokens = set(name.split("-"))
    if tokens & {"face", "hand", "user", "thumbs", "handshake"}:
        return "人物"
    if tokens & {"chart", "database", "network", "diagram", "layer", "object", "filter", "timeline", "sitemap", "bars"}:
        return "数据"
    if tokens & {"arrow", "caret", "check", "xmark", "plus", "minus", "location", "map", "compass", "plane", "list"}:
        return "流程"
    if tokens & {"camera", "image", "images", "eye", "headphones", "play", "pause", "stop", "futbol", "sun", "moon", "star", "gem", "heart"}:
        return "媒体"
    if tokens & {"robot", "wand", "gear", "shield", "bolt", "bullseye", "cloud", "building", "house", "lightbulb"}:
        return "AI"
    return "文档"


def _source_metadata(path: Path) -> tuple[str, list[str]]:
    text = path.read_text(encoding="utf-8")
    category_match = re.search(r"^category:\s*(.+?)\s*$", text, re.MULTILINE)
    tags_match = re.search(r"^tags:\s*\[(.*?)\]\s*$", text, re.MULTILINE)
    if not category_match or not tags_match:
        raise CatalogBuildError(f"Tabler SVG 缺少固定的 category/tags 元数据：{path.name}")
    category = category_match.group(1).strip()
    if category not in OFFICIAL_CATEGORY_LABELS:
        raise CatalogBuildError(f"Tabler SVG 含未知官方分类：{category}")
    tags = [tag.strip() for tag in tags_match.group(1).split(",") if tag.strip()]
    if not tags:
        raise CatalogBuildError(f"Tabler SVG tags 为空：{path.name}")
    return category, tags


def build_payload(skill_root: Path) -> dict:
    vendor = skill_root / "capabilities" / "vendors" / "tabler-outline"
    outline = vendor / "icons" / "outline"
    source = _load_json(vendor / "SOURCE.json")
    required_source_fields = {
        "library", "version", "project_url", "source_url", "source_sha256",
        "outline_count", "license", "license_url", "author", "copyright", "attribution",
    }
    if not required_source_fields <= set(source):
        raise CatalogBuildError("Tabler SOURCE.json 缺少作者、许可或上游链接")
    registry = _load_json(vendor / "registry-v2.json")
    source_names = sorted(path.stem for path in outline.glob("*.svg"))
    if len(source_names) != source.get("outline_count") or len(source_names) != len(set(source_names)):
        raise CatalogBuildError("Tabler Outline 本地母库数量与 SOURCE.json 不一致")

    public_by_source: dict[str, list[str]] = {}
    for public_name, record in registry.get("icons", {}).items():
        source_name = record.get("source", {}).get("icon")
        if not isinstance(source_name, str) or source_name not in source_names:
            raise CatalogBuildError(f"注册名称 {public_name} 的来源无效")
        public_by_source.setdefault(source_name, []).append(public_name)

    progress_path = vendor / "redraw-v3" / "progress.json"
    progress_items: dict[str, dict] = {}
    if progress_path.is_file():
        progress = _load_json(progress_path)
        raw_items = progress.get("items", {})
        if not isinstance(raw_items, dict):
            raise CatalogBuildError("redraw-v3/progress.json.items 必须是对象")
        for name, item in raw_items.items():
            if name not in source_names or not isinstance(item, dict):
                raise CatalogBuildError(f"重绘进度含非法名称：{name}")
            status = item.get("status", "todo")
            if status not in VALID_REDRAW_STATUS:
                raise CatalogBuildError(f"{name} 含非法重绘状态：{status}")
            progress_items[name] = item

    source_metadata = {name: _source_metadata(outline / f"{name}.svg") for name in source_names}
    existing = []
    existing_group_counts = {group: 0 for group in EXISTING_GROUPS}
    for public_name, record in sorted(registry.get("icons", {}).items()):
        source_name = record["source"]["icon"]
        category, tags = source_metadata[source_name]
        group = _existing_group(public_name)
        existing_group_counts[group] += 1
        item = progress_items.get(source_name, {})
        existing.append(
            {
                "name": public_name,
                "sourceName": source_name,
                "group": group,
                "category": category,
                "categoryLabel": OFFICIAL_CATEGORY_LABELS[category],
                "officialCategory": category,
                "officialCategoryLabel": OFFICIAL_CATEGORY_LABELS[category],
                "tags": tags,
                "redrawStatus": item.get("status", "todo"),
                "batch": item.get("batch"),
                "updatedAt": item.get("updated_at"),
            }
        )

    selection_path = DEFAULT_SKILL_ROOT / "capabilities" / "vendors" / "tabler-outline" / "redraw-v3" / "selection.json"
    selection = _load_json(selection_path) if selection_path.is_file() else {"groups": []}
    selection_groups: list[str] = [group.get("id") or group.get("label") for group in selection.get("groups", [])]
    group_of_source: dict[str, str] = {}
    for group in selection.get("groups", []):
        gid = group.get("id") or group.get("label")
        for name in group.get("icons", []):
            group_of_source.setdefault(name, gid)
    selection_set = set(group_of_source)

    pending = []
    ink = list(existing)
    ink_category_counts: dict[str, int] = {}
    pending_category_counts: dict[str, int] = {}
    status_counts = {status: 0 for status in VALID_REDRAW_STATUS}
    covered: set[str] = set()
    for entry in existing:
        source_name = entry["sourceName"]
        entry["group"] = group_of_source.get(source_name, entry.get("group", "文档"))
        entry["category"] = entry["group"]
        entry["categoryLabel"] = entry["group"]
        ink_category_counts[entry["group"]] = ink_category_counts.get(entry["group"], 0) + 1
        covered.add(source_name)
    for name in source_names:
        item = progress_items.get(name, {})
        status = item.get("status", "todo")
        status_counts[status] += 1
        category, tags = source_metadata[name]
        if name not in selection_set:
            continue
        if status in {"candidate", "approved"}:
            if name in public_by_source or name in covered:
                continue
            entry = {
                "name": name,
                "sourceName": name,
                "group": group_of_source[name],
                "category": group_of_source[name],
                "categoryLabel": group_of_source[name],
                "officialCategory": category,
                "officialCategoryLabel": OFFICIAL_CATEGORY_LABELS[category],
                "tags": tags,
                "redrawStatus": status,
                "batch": item.get("batch"),
                "updatedAt": item.get("updated_at"),
            }
            ink.append(entry)
            ink_category_counts[entry["group"]] = ink_category_counts.get(entry["group"], 0) + 1
            covered.add(name)
            continue
        if name in public_by_source:
            continue
        pending.append({
            "name": name,
            "group": group_of_source[name],
            "category": group_of_source[name],
            "categoryLabel": group_of_source[name],
            "tags": tags,
            "redrawStatus": status,
            "batch": item.get("batch"),
            "updatedAt": item.get("updated_at"),
        })
        pending_category_counts[group_of_source[name]] = pending_category_counts.get(group_of_source[name], 0) + 1
        covered.add(name)

    if not selection_set <= covered or len(existing) != 189:
        missing = sorted(selection_set - covered)
        raise CatalogBuildError(f"精选集没有被纸墨成品与待绘清单完整覆盖：{missing[:5]}")
    remainder: list[dict] = []
    remainder_category_counts: dict[str, int] = {}
    for name in source_names:
        if name in selection_set:
            continue
        item = progress_items.get(name, {})
        category, tags = source_metadata[name]
        remainder_category_counts[category] = remainder_category_counts.get(category, 0) + 1
        remainder.append({
            "name": name,
            "category": category,
            "categoryLabel": OFFICIAL_CATEGORY_LABELS[category],
            "tags": tags,
            "redrawStatus": item.get("status", "todo"),
            "batch": item.get("batch"),
            "updatedAt": item.get("updated_at"),
        })
    remainder_total = len(remainder)

    return {
        "version": 1,
        "source": {
            "library": source.get("library"),
            "version": source.get("version"),
            "license": source.get("license"),
            "sha256": source.get("source_sha256"),
            "projectUrl": source.get("project_url"),
            "licenseUrl": source.get("license_url"),
            "author": source.get("author"),
            "copyright": source.get("copyright"),
            "attribution": source.get("attribution"),
        },
        "paths": {
            "sourceSvg": "../../wise-ppt/capabilities/vendors/tabler-outline/icons/outline/",
            "redrawSvg": "../../wise-ppt/capabilities/vendors/tabler-outline/redraw-v3/svg/",
            "existingAcceptance": "../../wise-ppt/capabilities/vendors/tabler-outline/acceptance.html",
        },
        "counts": {
            "source": len(source_names),
            "registeredSources": len(public_by_source),
            "publicNames": len(registry.get("icons", {})),
            "inkSources": len(ink),
            "pendingSources": len(pending),
            "selectionTotal": len(selection_set),
            "remainderSources": remainder_total,
            "redrawStatus": status_counts,
        },
        "selectionGroups": [
            {
                "id": group,
                "label": group,
                "inkCount": ink_category_counts.get(group, 0),
                "pendingCount": pending_category_counts.get(group, 0),
                "count": ink_category_counts.get(group, 0) + pending_category_counts.get(group, 0),
            }
            for group in selection_groups
        ],
        "inkCategories": [
            {
                "id": group,
                "label": group,
                "sourceLabel": group,
                "count": ink_category_counts.get(group, 0),
            }
            for group in selection_groups if ink_category_counts.get(group, 0)
        ],
        "pendingCategories": [
            {
                "id": group,
                "label": group,
                "sourceLabel": group,
                "count": pending_category_counts.get(group, 0),
            }
            for group in selection_groups if pending_category_counts.get(group, 0)
        ],
        "ink": ink,
        "unredrawn": pending,
        "remainder": remainder,
        "remainderCategories": [
            {
                "id": category,
                "label": OFFICIAL_CATEGORY_LABELS[category],
                "sourceLabel": category,
                "count": remainder_category_counts[category],
            }
            for category in sorted(remainder_category_counts)
        ],
    }


def rendered(payload: dict) -> str:
    body = json.dumps(payload, ensure_ascii=False, separators=(",", ":"), sort_keys=True)
    return f"window.WISE_PPT_ICON_CATALOG_DATA={body};\n"


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--skill-root", type=Path, default=DEFAULT_SKILL_ROOT)
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    output = rendered(build_payload(args.skill_root.expanduser().resolve()))
    if args.check:
        if not OUTPUT.is_file() or OUTPUT.read_text(encoding="utf-8") != output:
            raise CatalogBuildError(f"图标目录数据已过期：{OUTPUT}")
        print(f"PASS icon-catalog-data: {OUTPUT}")
        return 0
    OUTPUT.write_text(output, encoding="utf-8")
    print(f"WROTE icon-catalog-data: {OUTPUT}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
