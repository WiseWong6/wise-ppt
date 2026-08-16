#!/usr/bin/env python3
"""字体保障脚本。

机制(按顺序):
1. 本地已有且指纹一致 → 跳过;
2. 系统字体目录里有指纹一致的副本 → 拷入,免下载;
3. 联网下载:按清单 urls 顺序尝试,国内镜像在前,官方源兜底;
   每个文件下载后校验 SHA-256,不符自动换下一个源。

用法:
  python3 scripts/ensure_fonts.py            # 常规:补齐缺失字体
  python3 scripts/ensure_fonts.py --check    # 只校验,不下载不拷贝
  python3 scripts/ensure_fonts.py --force    # 忽略本地已有,全部重新获取
"""
from __future__ import annotations

import argparse
import hashlib
import json
import os
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "themes/paper-ink/assets/fonts/font-manifest.json"

# 常见系统字体目录(macOS / Linux)
SYSTEM_FONT_DIRS = [
    Path.home() / "Library/Fonts",
    Path("/Library/Fonts"),
    Path("/System/Library/Fonts"),
    Path("/usr/share/fonts"),
    Path("/usr/local/share/fonts"),
    Path.home() / ".fonts",
]


def sha256_of(path: Path) -> str:
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def find_in_system(font: dict) -> Path | None:
    """在系统字体目录里找指纹完全一致的副本;同名但指纹不同只提示,不采用。"""
    names = font.get("system_filenames") or [font["filename"]]
    for directory in SYSTEM_FONT_DIRS:
        if not directory.is_dir():
            continue
        for name in names:
            candidate = directory / name
            if not candidate.is_file():
                continue
            if sha256_of(candidate) == font["sha256"]:
                return candidate
            print(f"  [提示] 系统字体 {candidate} 与锁定指纹不一致,不采用")
    return None


def download(font: dict, dest: Path) -> bool:
    urls = font.get("urls") or ([font["url"]] if font.get("url") else [])
    dest.parent.mkdir(parents=True, exist_ok=True)
    for url in urls:
        print(f"  [下载] {url}")
        fd, tmp_name = tempfile.mkstemp(dir=dest.parent, suffix=".part")
        os.close(fd)
        tmp = Path(tmp_name)
        try:
            result = subprocess.run(
                [
                    "curl", "-fSL", "-sS",
                    "--connect-timeout", "15",
                    "--retry", "2",
                    "--max-time", "600",
                    "-o", str(tmp), url,
                ],
                check=False,
            )
            if result.returncode == 0 and sha256_of(tmp) == font["sha256"]:
                os.replace(tmp, dest)
                print("  [完成] 指纹校验通过")
                return True
            print("  [失败] 该源不可用或文件指纹不符,换下一个源")
        finally:
            if tmp.exists():
                tmp.unlink()
    return False


def main() -> int:
    parser = argparse.ArgumentParser(description="按清单补齐本地字体")
    parser.add_argument("--check", action="store_true", help="只校验指纹,不下载不拷贝")
    parser.add_argument("--force", action="store_true", help="忽略本地已有,全部重新获取")
    args = parser.parse_args()

    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    missing: list[str] = []

    for font in manifest["fonts"]:
        name = font["filename"]
        dest = ROOT / font["asset"]
        wanted = font["sha256"]
        print(f"◆ {name}")

        if not args.force and dest.is_file() and sha256_of(dest) == wanted:
            print("  [跳过] 本地已就绪")
            continue

        if args.check:
            print("  [缺失] --check 模式不执行下载")
            missing.append(name)
            continue

        system_copy = find_in_system(font)
        if system_copy is not None:
            dest.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(system_copy, dest)
            print(f"  [系统] 从 {system_copy} 拷入,免下载")
            continue

        if download(font, dest):
            continue

        print("  [未就绪] 所有下载源均失败")
        missing.append(name)

    if missing:
        print(f"\n未就绪字体: {'、'.join(missing)}")
        return 1
    print("\n全部字体就绪。")
    return 0


if __name__ == "__main__":
    sys.exit(main())
