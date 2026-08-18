#!/bin/bash
# wise-ppt · 无截图 PDF 导出：完整 delivery 通过后才原子替换最终文件。
set -euo pipefail
DECK="${1:?用法: export-pdf.sh <deck目录> [输出PDF路径] --workspace <工作区根目录>}"
shift
OUT_ARG=""
WORKSPACE=""
if [ "${1:-}" != "" ] && [ "${1#--}" = "$1" ]; then
  OUT_ARG="$1"
  shift
fi
while [ "$#" -gt 0 ]; do
  case "$1" in
    --workspace)
      [ "$#" -ge 2 ] || { echo "--workspace 缺少路径" >&2; exit 2; }
      WORKSPACE="$2"
      shift 2
      ;;
    *)
      echo "未知参数：$1" >&2
      exit 2
      ;;
  esac
done
[ -n "$WORKSPACE" ] || { echo "必须指定 --workspace <工作区根目录>" >&2; exit 2; }
DECK="$(cd "$DECK" && pwd)"
WORKSPACE="$(cd "$WORKSPACE" && pwd)"
NAME="$(basename "$DECK")"
OUT="${OUT_ARG:-$DECK/$NAME.pdf}"
mkdir -p "$(dirname "$OUT")"
OUT_DIR="$(cd "$(dirname "$OUT")" && pwd)"
OUT="$OUT_DIR/$(basename "$OUT")"
SKILL_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

TMP_ROOT="$(mktemp -d /tmp/wise-ppt-pdf.XXXXXX)"
TMP_OUT_DIR="$(mktemp -d "$OUT_DIR/.wise-ppt-pdf.XXXXXX")"
mkdir -p "$TMP_ROOT/ready-profile" "$TMP_ROOT/print-profile"
TMP_PDF="$TMP_OUT_DIR/rendered.pdf"
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
cleanup(){ stop_chrome; rm -rf "$TMP_ROOT" "$TMP_OUT_DIR"; }
trap cleanup EXIT INT TERM

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
[ -x "$CHROME" ] || CHROME="$(command -v google-chrome || command -v chrome || command -v chromium || command -v chromium-browser || true)"
if [ ! -x "$CHROME" ] && [ -x "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge" ]; then CHROME="/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge"; fi
[ -x "$CHROME" ] || { echo "找不到 Chrome/Edge" >&2; exit 1; }

HTML="$DECK/index.html"
[ -f "$HTML" ] || { echo "缺少 deck HTML 输出：$HTML" >&2; exit 1; }
COUNT="$(python3 - "$HTML" <<'PY'
from html.parser import HTMLParser
import sys
class P(HTMLParser):
    def __init__(self): super().__init__(); self.count=0
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if tag=='section' and 'slide' in a.get('class','').split() and a.get('data-page-id'): self.count+=1
p=P(); p.feed(open(sys.argv[1],encoding='utf-8').read()); print(p.count)
PY
)"
[ "$COUNT" -gt 0 ] || { echo "index.html 中没有 slide" >&2; exit 1; }
URL="$(python3 - "$HTML" <<'PY'
from pathlib import Path
import sys
print(Path(sys.argv[1]).resolve().as_uri()+'?print=1')
PY
)"

DOM="$TMP_ROOT/ready.html"
COMMON=(--headless --disable-gpu --allow-file-access-from-files --disable-background-networking --disable-component-update --disable-default-apps --disable-sync --no-first-run --no-default-browser-check --metrics-recording-only)
"$CHROME" "${COMMON[@]}" --user-data-dir="$TMP_ROOT/ready-profile" --virtual-time-budget=12000 --dump-dom "$URL" >"$DOM" 2>"$TMP_ROOT/load.log" &
CHROME_PID=$!
for _ in $(seq 1 240); do
  if rg -q 'data-deck-ready="true"|data-deck-error=' "$DOM" 2>/dev/null; then break; fi
  kill -0 "$CHROME_PID" 2>/dev/null || break
  sleep 0.1
done
stop_chrome
rg -q 'data-deck-ready="true"' "$DOM" || { echo "deck 未在时限内完成渲染" >&2; tail -20 "$TMP_ROOT/load.log" >&2; exit 1; }
"$CHROME" "${COMMON[@]}" --user-data-dir="$TMP_ROOT/print-profile" --no-pdf-header-footer --virtual-time-budget=12000 --print-to-pdf="$TMP_PDF" "$URL" >"$TMP_ROOT/print.log" 2>&1 &
CHROME_PID=$!
for _ in $(seq 1 300); do
  if [ -s "$TMP_PDF" ] && [ "$(head -c 5 "$TMP_PDF" 2>/dev/null || true)" = "%PDF-" ]; then break; fi
  kill -0 "$CHROME_PID" 2>/dev/null || break
  sleep 0.1
done
stop_chrome
[ -s "$TMP_PDF" ] || { echo "PDF 生成失败：$OUT" >&2; exit 1; }
[ "$(head -c 5 "$TMP_PDF")" = "%PDF-" ] || { echo "PDF 文件头无效：$OUT" >&2; exit 1; }
if command -v pdfinfo >/dev/null 2>&1; then
  PDF_PAGES="$(pdfinfo "$TMP_PDF" | awk '/^Pages:/ {print $2}')"
  [ "$PDF_PAGES" = "$COUNT" ] || { echo "PDF 页数 $PDF_PAGES，与 slide 数 $COUNT 不一致" >&2; exit 1; }
fi
mv "$TMP_PDF" "$OUT"
echo "PASS pdf pages=$COUNT output=$OUT"
