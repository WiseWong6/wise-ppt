#!/usr/bin/env python3
"""Build the file://-safe Wise PPT icon catalog data artifact."""

from __future__ import annotations

import argparse
import json
from pathlib import Path


HERE = Path(__file__).resolve().parent
DEFAULT_SKILL_ROOT = HERE.parents[1] / "wise-ppt"
OUTPUT = HERE / "icon-catalog-data.js"
VALID_REDRAW_STATUS = {"todo", "in_progress", "candidate", "approved", "rejected"}


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


def build_payload(skill_root: Path) -> dict:
    vendor = skill_root / "capabilities" / "vendors" / "tabler-outline"
    outline = vendor / "icons" / "outline"
    source = _load_json(vendor / "SOURCE.json")
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

    entries = []
    status_counts = {status: 0 for status in VALID_REDRAW_STATUS}
    for name in source_names:
        item = progress_items.get(name, {})
        status = item.get("status", "todo")
        status_counts[status] += 1
        public_names = sorted(public_by_source.get(name, []))
        entries.append(
            {
                "name": name,
                "publicNames": public_names,
                "registered": bool(public_names),
                "redrawStatus": status,
                "batch": item.get("batch"),
                "updatedAt": item.get("updated_at"),
            }
        )

    return {
        "version": 1,
        "source": {
            "library": source.get("library"),
            "version": source.get("version"),
            "license": source.get("license"),
            "sha256": source.get("source_sha256"),
        },
        "paths": {
            "sourceSvg": "../../wise-ppt/capabilities/vendors/tabler-outline/icons/outline/",
            "redrawSvg": "../../wise-ppt/capabilities/vendors/tabler-outline/redraw-v3/svg/",
        },
        "counts": {
            "source": len(source_names),
            "registeredSources": len(public_by_source),
            "publicNames": len(registry.get("icons", {})),
            "redrawStatus": status_counts,
        },
        "entries": entries,
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
