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
    selection_path = vendor / "redraw-v3" / "selection.json"
    selection = _load_json(selection_path)
    raw_groups = selection.get("groups", [])
    if not isinstance(raw_groups, list) or not raw_groups:
        raise CatalogBuildError("redraw-v3/selection.json.groups 必须是非空数组")

    selection_groups: list[str] = []
    group_of_source: dict[str, str] = {}
    for group in raw_groups:
        if not isinstance(group, dict):
            raise CatalogBuildError("精选分组必须是对象")
        gid = group.get("id") or group.get("label")
        names = group.get("icons", [])
        if not isinstance(gid, str) or not gid or not isinstance(names, list):
            raise CatalogBuildError("精选分组缺少有效 id/label/icons")
        if gid in selection_groups:
            raise CatalogBuildError(f"精选分组重复：{gid}")
        selection_groups.append(gid)
        for name in names:
            if not isinstance(name, str) or name not in source_names:
                raise CatalogBuildError(f"精选集含未知 Tabler 来源：{name}")
            if name in group_of_source:
                raise CatalogBuildError(f"精选图标重复分组：{name}")
            group_of_source[name] = gid

    selection_set = set(group_of_source)
    if selection.get("total") != len(selection_set):
        raise CatalogBuildError("selection.json.total 与去重后的精选数量不一致")

    status_counts = {status: 0 for status in VALID_REDRAW_STATUS}
    for name in source_names:
        status = progress_items.get(name, {}).get("status", "todo")
        status_counts[status] += 1

    redraw_root = vendor / "redraw-v3"
    ink: list[dict] = []
    ink_category_counts = {group: 0 for group in selection_groups}
    not_approved: list[str] = []
    missing_artifacts: list[str] = []
    for name in source_names:
        if name not in selection_set:
            continue
        item = progress_items.get(name, {})
        if item.get("status", "todo") != "approved":
            not_approved.append(name)
            continue
        if not (redraw_root / "records" / f"{name}.json").is_file() or not (redraw_root / "svg" / f"{name}.svg").is_file():
            missing_artifacts.append(name)
            continue
        group = group_of_source[name]
        category, tags = source_metadata[name]
        ink.append({
            "name": name,
            "sourceName": name,
            "group": group,
            "category": group,
            "categoryLabel": group,
            "officialCategory": category,
            "officialCategoryLabel": OFFICIAL_CATEGORY_LABELS[category],
            "tags": tags,
            "redrawStatus": "approved",
            "batch": item.get("batch"),
            "updatedAt": item.get("updated_at"),
        })
        ink_category_counts[group] += 1

    if not_approved:
        raise CatalogBuildError(f"精选集仍含未通过图标：{not_approved[:5]}")
    if missing_artifacts:
        raise CatalogBuildError(f"精选集缺少最终 record/svg：{missing_artifacts[:5]}")
    if len(ink) != len(selection_set):
        raise CatalogBuildError("最终纸墨成品数量与精选集不一致")

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
            "selectionTotal": len(selection_set),
            "redrawStatus": status_counts,
        },
        "selectionGroups": [
            {
                "id": group,
                "label": group,
                "inkCount": ink_category_counts.get(group, 0),
                "count": ink_category_counts.get(group, 0),
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
        "ink": ink,
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
