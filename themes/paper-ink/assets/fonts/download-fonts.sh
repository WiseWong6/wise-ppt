#!/bin/bash
# 兼容旧入口；唯一实现在 scripts/ensure_fonts.py。
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SKILL_ROOT="$(cd "$SCRIPT_DIR/../../../.." && pwd)"
exec python3 "$SKILL_ROOT/scripts/ensure_fonts.py" "$@"
