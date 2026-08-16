#!/bin/bash
# wise-ppt · deck 无截图浏览器检查
set -euo pipefail
DECK="${1:?用法: check-deck.sh <deck目录> [--mode normal|accent]}"
shift
MODE="normal"
if [ "${1:-}" = "--mode" ]; then
  MODE="${2:-}"
  shift 2
fi
[ "$#" -eq 0 ] || { echo "未知参数: $*" >&2; exit 2; }
case "$MODE" in
  normal|accent) ;;
  *) echo "--mode 只允许 normal 或 accent" >&2; exit 2 ;;
esac
DECK="$(cd "$DECK" && pwd)"
HTML="$DECK/index.html"
[ -f "$HTML" ] || { echo "缺少 $HTML" >&2; exit 1; }
rg -q 'data-runtime="wise-ppt-deck"' "$HTML" || { echo "不是 Wise PPT deck" >&2; exit 1; }
rg -q 'data-geometry-contract-version="1"' "$HTML" || { echo "不是新版几何契约 deck：根节点缺少 data-geometry-contract-version=1" >&2; exit 1; }
if rg -ni '<iframe|thumb-[a-z0-9_-]+' "$HTML"; then echo "deck runtime 不得引用 frame 或缩略图" >&2; exit 1; fi
if rg -n '\bstageFit\s*\(' "$HTML"; then echo "正式 deck 不得调用 specimen stageFit()" >&2; exit 1; fi
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
[ -x "$CHROME" ] || CHROME="$(command -v google-chrome || command -v chrome || command -v chromium || command -v chromium-browser || true)"
[ -x "$CHROME" ] || { echo "找不到 Chrome" >&2; exit 1; }
TMP_ROOT="$(mktemp -d /tmp/wise-ppt-check.XXXXXX)"
CHROME_PID=""
stop_chrome() {
  [ -n "$CHROME_PID" ] || return 0
  if kill -0 "$CHROME_PID" 2>/dev/null; then
    kill "$CHROME_PID" 2>/dev/null || true
    for _ in $(seq 1 20); do
      kill -0 "$CHROME_PID" 2>/dev/null || break
      sleep 0.1
    done
    kill -9 "$CHROME_PID" 2>/dev/null || true
  fi
  wait "$CHROME_PID" 2>/dev/null || true
  CHROME_PID=""
}
cleanup() {
  stop_chrome
  rm -rf "$TMP_ROOT"
}
trap cleanup EXIT INT TERM
URL="$(python3 - "$HTML" "$MODE" <<'PY'
from pathlib import Path
import sys
query = '?accent&selftest=1' if sys.argv[2] == 'accent' else '?selftest=1'
print(Path(sys.argv[1]).resolve().as_uri()+query)
PY
)"
"$CHROME" --headless --disable-gpu --hide-scrollbars --allow-file-access-from-files --disable-background-networking --disable-component-update --disable-default-apps --disable-sync --no-first-run --no-default-browser-check --metrics-recording-only --user-data-dir="$TMP_ROOT/profile" --virtual-time-budget=12000 --dump-dom "$URL" >"$TMP_ROOT/dom.html" 2>"$TMP_ROOT/chrome.log" &
CHROME_PID=$!
for _ in $(seq 1 240); do
  if rg -q 'data-runtime-check="(pass|fail)"' "$TMP_ROOT/dom.html" 2>/dev/null; then break; fi
  kill -0 "$CHROME_PID" 2>/dev/null || break
  sleep 0.1
done
stop_chrome
rg -q 'data-deck-ready="true"' "$TMP_ROOT/dom.html" || {
  echo "deck readiness 失败" >&2
  rg -o 'data-(?:deck|font|runtime)-[^= ]+="[^"]*"' "$TMP_ROOT/dom.html" >&2 || true
  rg -o 'data-page-id="[^"]*"[^>]*data-render-(?:ready|pending|error)="[^"]*"' "$TMP_ROOT/dom.html" >&2 || true
  tail -20 "$TMP_ROOT/chrome.log" >&2
  exit 1
}
rg -q 'data-runtime-check="pass"' "$TMP_ROOT/dom.html" || { echo "runtime 交互检查失败" >&2; rg -o 'data-runtime-check-error="[^"]*"' "$TMP_ROOT/dom.html" >&2 || true; exit 1; }
rg -q 'data-copy-check="pass"' "$TMP_ROOT/dom.html" || { echo "放映正文选择/复制检查失败" >&2; exit 1; }
rg -q 'data-selection-check="pass"' "$TMP_ROOT/dom.html" || { echo "逐页文本选择检查失败" >&2; exit 1; }
rg -q 'data-input-check="pass"' "$TMP_ROOT/dom.html" || { echo "input 键盘保留检查失败" >&2; exit 1; }
rg -q 'data-contenteditable-check="pass"' "$TMP_ROOT/dom.html" || { echo "contenteditable 键盘保留检查失败" >&2; exit 1; }
rg -q 'data-type-check="pass"' "$TMP_ROOT/dom.html" || { echo "全局字阶解析检查失败" >&2; exit 1; }
rg -q 'data-font-check="pass"' "$TMP_ROOT/dom.html" || { echo "必需字体真实加载检查失败" >&2; rg -o 'data-font-check-error="[^"]*"' "$TMP_ROOT/dom.html" >&2 || true; exit 1; }
rg -q 'data-viewport-fit-check="pass"' "$TMP_ROOT/dom.html" || { echo "1920×1080 视口完整性检查失败" >&2; exit 1; }
rg -q 'data-controls-check="pass"' "$TMP_ROOT/dom.html" || { echo "放映控件/安全区检查失败" >&2; exit 1; }
rg -q 'data-geometry-check="pass"' "$TMP_ROOT/dom.html" || { echo "几何门禁失败：层叠/对齐/包含检查未通过" >&2; rg -o 'data-runtime-check-error="[^"]*"' "$TMP_ROOT/dom.html" >&2 || true; exit 1; }
rg -q 'data-esc-check="pass"' "$TMP_ROOT/dom.html" || { echo "真实 ESC KeyboardEvent 检查失败" >&2; exit 1; }
rg -q 'data-resource-check="pass"' "$TMP_ROOT/dom.html" || { echo "file:// 相对资源检查失败" >&2; exit 1; }
rg -q 'data-stage-fit-owner="deck-runtime"' "$TMP_ROOT/dom.html" || { echo "舞台缩放权威错误" >&2; exit 1; }
if rg -q 'data-render-error=|data-deck-error=' "$TMP_ROOT/dom.html"; then echo "页面资源或渲染失败" >&2; exit 1; fi
COUNT="$(rg -o 'class="slide[^"]*"' "$HTML" | wc -l | tr -d ' ')"
echo "PASS browser deck mode=$MODE slides=$COUNT fonts=ok viewport-fit=ok controls=ok geometry=ok board=ok canvas=ok deeplink=ok navigation=ok selection-copy=all editable=ok esc=keyboard-event"
