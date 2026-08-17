#!/bin/bash
# wise-ppt-glm · 轻量 PDF 导出:Chrome 无头打印,等待 data-deck-ready,核对页数。
# 用法: export-deck.sh <deck目录> [输出PDF路径]
set -euo pipefail

DECK="${1:?用法: export-deck.sh <deck目录> [输出PDF路径]}"
OUT_ARG="${2:-}"
DECK="$(cd "$DECK" && pwd)"
NAME="$(basename "$DECK")"
OUT="${OUT_ARG:-$DECK/$NAME.pdf}"
mkdir -p "$(dirname "$OUT")"

HTML="$DECK/index.html"
[ -f "$HTML" ] || { echo "缺少 deck HTML 输出:$HTML" >&2; exit 1; }
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
node "$REPO_ROOT/scripts/build_catalog_authority_manifest.cjs" --check >/dev/null || { echo "Catalog 唯一资产合同失败" >&2; exit 1; }
python3 "$REPO_ROOT/scripts/check_deck_contract.py" "$DECK" >/dev/null || { echo "deck 成品合同 v2 静态检查失败" >&2; exit 1; }

COUNT="$(python3 - "$HTML" <<'PY'
from html.parser import HTMLParser
import sys
class P(HTMLParser):
    def __init__(self):
        super().__init__()
        self.count = 0
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'section' and 'slide' in a.get('class', '').split() and a.get('data-page-id'):
            self.count += 1
p = P()
p.feed(open(sys.argv[1], encoding='utf-8').read())
print(p.count)
PY
)"
[ "$COUNT" -gt 0 ] || { echo "index.html 中没有 slide" >&2; exit 1; }

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
[ -x "$CHROME" ] || CHROME="$(command -v google-chrome || command -v chrome || command -v chromium || true)"
[ -x "$CHROME" ] || { echo "找不到 Chrome/Chromium" >&2; exit 1; }

URL="$(python3 - "$HTML" <<'PY'
from pathlib import Path
import sys
print(Path(sys.argv[1]).resolve().as_uri() + '?print=1')
PY
)"

TMP_ROOT="$(mktemp -d /tmp/wise-glm-pdf.XXXXXX)"
TMP_PDF="$TMP_ROOT/rendered.pdf"
trap 'rm -rf "$TMP_ROOT"' EXIT INT TERM
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

COMMON=(--headless --disable-gpu --allow-file-access-from-files --disable-background-networking
  --disable-component-update --disable-default-apps --disable-sync --no-first-run
  --no-default-browser-check --metrics-recording-only)

# 第一遍:确认 deck 完成渲染(字体就绪后 deck-runtime 会置 data-deck-ready)
DOM="$TMP_ROOT/ready.html"
"$CHROME" "${COMMON[@]}" --user-data-dir="$TMP_ROOT/ready-profile" --virtual-time-budget=12000 --dump-dom "$URL" >"$DOM" 2>"$TMP_ROOT/load.log" &
CHROME_PID=$!
for _ in $(seq 1 240); do
  if grep -q 'data-deck-ready="true"\|data-deck-error=' "$DOM" 2>/dev/null; then break; fi
  kill -0 "$CHROME_PID" 2>/dev/null || break
  sleep 0.1
done
stop_chrome
grep -q 'data-deck-ready="true"' "$DOM" || { echo "deck 未在时限内完成渲染" >&2; tail -20 "$TMP_ROOT/load.log" >&2; exit 1; }

# 第二遍:打印 PDF
"$CHROME" "${COMMON[@]}" --user-data-dir="$TMP_ROOT/print-profile" --no-pdf-header-footer --virtual-time-budget=12000 --print-to-pdf="$TMP_PDF" "$URL" >"$TMP_ROOT/print.log" 2>&1 &
CHROME_PID=$!
for _ in $(seq 1 300); do
  if [ -s "$TMP_PDF" ] && [ "$(head -c 5 "$TMP_PDF" 2>/dev/null || true)" = "%PDF-" ]; then break; fi
  kill -0 "$CHROME_PID" 2>/dev/null || break
  sleep 0.1
done
stop_chrome
[ -s "$TMP_PDF" ] || { echo "PDF 生成失败:$OUT" >&2; exit 1; }
[ "$(head -c 5 "$TMP_PDF")" = "%PDF-" ] || { echo "PDF 文件头无效:$OUT" >&2; exit 1; }

if command -v pdfinfo >/dev/null 2>&1; then
  PDF_PAGES="$(pdfinfo "$TMP_PDF" | awk '/^Pages:/ {print $2}')"
  [ "$PDF_PAGES" = "$COUNT" ] || { echo "PDF 页数 $PDF_PAGES,与 slide 数 $COUNT 不一致" >&2; exit 1; }
fi

mv "$TMP_PDF" "$OUT"
echo "PASS pdf pages=$COUNT output=$OUT"
