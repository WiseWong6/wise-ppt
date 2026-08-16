#!/bin/bash
# wise-ppt-glm · 几何契约浏览器回归（无截图、临时产物自动清理）
set -euo pipefail

RUNTIME_DIR="$(cd "$(dirname "$0")" && pwd)"
FIXTURE_DIR="$RUNTIME_DIR/fixtures/geometry-contract"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
[ -x "$CHROME" ] || CHROME="$(command -v google-chrome || command -v chrome || command -v chromium || command -v chromium-browser || true)"
[ -x "$CHROME" ] || { echo "找不到 Chrome" >&2; exit 1; }

TMP_ROOT="$(mktemp -d /tmp/wise-ppt-geometry-test.XXXXXX)"
cleanup() { rm -rf "$TMP_ROOT"; }
trap cleanup EXIT INT TERM

fixture_url() {
  python3 -B - "$FIXTURE_DIR/index.html" "$1" <<'PY'
from pathlib import Path
from urllib.parse import quote
import sys
print(Path(sys.argv[1]).resolve().as_uri() + '?case=' + quote(sys.argv[2]) + '&selftest=1')
PY
}

run_failure_case() {
  local case_name="$1" expected="$2" dom="$TMP_ROOT/$1.html" log="$TMP_ROOT/$1.log"
  "$CHROME" --headless --disable-gpu --hide-scrollbars --allow-file-access-from-files \
    --disable-background-networking --disable-component-update --disable-default-apps --disable-sync \
    --no-first-run --no-default-browser-check --metrics-recording-only \
    --user-data-dir="$TMP_ROOT/profile-$case_name" --virtual-time-budget=12000 \
    --dump-dom "$(fixture_url "$case_name")" >"$dom" 2>"$log" &
  local chrome_pid=$!
  local ready=0
  for _ in $(seq 1 240); do
    if rg -q 'data-runtime-check="(pass|fail)"' "$dom" 2>/dev/null; then
      ready=1
      break
    fi
    kill -0 "$chrome_pid" 2>/dev/null || break
    sleep 0.1
  done
  if kill -0 "$chrome_pid" 2>/dev/null; then
    kill "$chrome_pid" 2>/dev/null || true
    for _ in $(seq 1 20); do
      kill -0 "$chrome_pid" 2>/dev/null || break
      sleep 0.1
    done
    kill -9 "$chrome_pid" 2>/dev/null || true
  fi
  wait "$chrome_pid" 2>/dev/null || true
  [ "$ready" -eq 1 ] || { echo "FAIL $case_name: 浏览器未在 24 秒内返回运行结果" >&2; tail -20 "$log" >&2; exit 1; }
  rg -q 'data-runtime-check="fail"' "$dom" || { echo "FAIL $case_name: 未按预期失败" >&2; tail -20 "$log" >&2; exit 1; }
  rg -Fq "$expected" "$dom" || { echo "FAIL $case_name: 未找到错误片段 $expected" >&2; rg -o 'data-runtime-check-error="[^"]*"' "$dom" >&2 || true; exit 1; }
  echo "PASS failure case=$case_name"
}

bash "$RUNTIME_DIR/check-deck.sh" "$FIXTURE_DIR" --mode normal
bash "$RUNTIME_DIR/check-deck.sh" "$FIXTURE_DIR" --mode accent

run_failure_case missing-contract '第 1 页缺少 data-geometry-contract'
run_failure_case duplicate-contract '第 1 页必须且只能声明一个几何契约'
run_failure_case invalid-json '第 1 页几何契约不是合法 JSON'
run_failure_case missing-boundary '第 1 页几何契约至少声明一条边界或不重叠关系'
run_failure_case missing-alignment '第 1 页几何契约至少声明一条关系对齐'
run_failure_case unanchored-slot '第 1 页 slot 缺少 data-anchor-id: orphan'
run_failure_case undeclared-anchor '第 1 页包含未写入 geometry 的 anchor: undeclared'
run_failure_case pseudoalignment '第 1 页关系[edge.top] 边缘未对齐'
run_failure_case unowned-overlap '第 1 页关系[edge.separate] 发生重叠'
run_failure_case owner-no-reason '第 4 页关系[overlap.owned] 必须说明归属重叠原因'
run_failure_case text-inset '第 1 页关系[edge.left-text-contained] 文字载体内距不得小于 8px'
run_failure_case contain-overflow '第 1 页关系[edge.left-text-contained] 子元素越界'
run_failure_case hard-boundary '第 1 页关系[edge.left-boundary] 越过硬边界'
run_failure_case path-clear '第 2 页关系[path.label-clear] 路径穿过内容'
run_failure_case relation-order '第 1 页 relations 必须按边界/不重叠优先、对齐其次的顺序声明'

echo "PASS geometry-contract normal=ok accent=ok failure-cases=15 temp=cleaned"
