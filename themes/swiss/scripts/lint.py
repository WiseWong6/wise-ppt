#!/usr/bin/env python3
"""Static Swiss theme lint for repository goldens and delivered decks."""

from __future__ import annotations

import argparse
import re
from pathlib import Path


REQUIRED_TOKENS = (
    "--wp-color-surface-canvas",
    "--wp-color-surface-recessed",
    "--wp-color-surface-panel",
    "--wp-color-primary",
    "--wp-color-functional",
    "--wp-color-body",
    "--wp-color-chart-label",
    "--wp-color-metadata",
    "--wp-color-divider",
    "--wp-color-construction",
    "--wp-color-focus",
    "--wp-color-focus-secondary",
    "--wp-color-focus-peripheral",
    "--wp-color-data-1",
    "--wp-color-data-2",
    "--wp-color-data-3",
    "--wp-color-data-4",
    "--wp-color-data-5",
    "--wp-color-data-6",
    "--wp-font-serif",
    "--wp-font-sans",
    "--wp-font-mono",
    "--wp-font-brush",
)
REMOTE_ASSET = re.compile(
    r"<(?:script|link)\b[^>]*(?:src|href)=[\"']https?://",
    re.IGNORECASE,
)
BARE_COLOR = re.compile(
    r"(?<![\w-])#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})(?![\w-])"
    r"|\brgba?\s*\(",
    re.IGNORECASE,
)


def lint(target: Path) -> list[str]:
    theme_root = Path(__file__).resolve().parents[1]
    tokens_path = theme_root / "assets" / "design-tokens.css"
    try:
        token_css = tokens_path.read_text(encoding="utf-8")
    except OSError as exc:
        return [f"无法读取 Swiss token：{exc}"]
    failures = [
        f"Swiss token 未定义：{token}"
        for token in REQUIRED_TOKENS
        if not re.search(rf"{re.escape(token)}\s*:", token_css)
    ]

    html_files = [target / "index.html"] if target.is_dir() else [target]
    for path in html_files:
        if not path.is_file():
            failures.append(f"缺少 HTML：{path}")
            continue
        try:
            source = path.read_text(encoding="utf-8")
        except OSError as exc:
            failures.append(f"无法读取 HTML：{path}: {exc}")
            continue
        if REMOTE_ASSET.search(source):
            failures.append(f"{path}: 禁止远程 script/link 依赖")
        for selector in ('class="slide', 'class="doc', 'class="folio"'):
            if selector not in source:
                failures.append(f"{path}: 缺少 {selector}")
        for match in BARE_COLOR.finditer(source):
            line = source.count("\n", 0, match.start()) + 1
            failures.append(f"{path}:{line}: 页面必须引用 --wp-* 颜色 token")
    return failures


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("target", type=Path)
    parser.add_argument("--strict", action="store_true", help="保留与主题 lint 公共接口一致")
    args = parser.parse_args()
    failures = lint(args.target.expanduser().resolve())
    if failures:
        for failure in failures:
            print(f"FAIL {failure}")
        return 1
    print("PASS swiss-theme-lint")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
