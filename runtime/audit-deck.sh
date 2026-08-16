#!/bin/bash
# wise-ppt-glm · deck 几何/字号/可见性审计(screen + PDF 双管线)
# 用法: audit-deck.sh <deck目录>
# 验收口径(v89):垂直居中量「文字主体并集」(叶子文本+分隔线,排除容器 padding 盒/隐形元素),
#   水平居中量「结构框」;print 是独立布局 pass,screen 全绿≠PDF 全绿,须对 PDF 本体验收(v90)。
# screen: 逐页主体垂直偏差(|Δ|≤3px)、结构框水平、同 slot-role 主字 computed 一致;
#   文字主体缺失(隐形内容)即 FAIL。
# PDF: CDP printToPDF(等字体) → pdftotext -bbox 词坐标(排除页眉<75pt/题注页脚>645pt 家具带)
#   → 与 screen 主体中点比残差(≤15px);主体区词数=0 即 FAIL;页数≠slide 数即 FAIL。
# 依赖: Chrome、node≥21(内置 WebSocket)、pdftotext、pdfinfo
set -euo pipefail

DECK="${1:?用法: audit-deck.sh <deck目录>}"
DECK="$(cd "$DECK" && pwd)"
HTML="$DECK/index.html"
[ -f "$HTML" ] || { echo "缺少 $HTML" >&2; exit 1; }
rg -q 'data-runtime="wise-ppt-deck"' "$HTML" || { echo "不是 Wise PPT deck" >&2; exit 1; }

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
[ -x "$CHROME" ] || CHROME="$(command -v google-chrome || command -v chrome || command -v chromium || true)"
[ -x "$CHROME" ] || { echo "找不到 Chrome/Chromium" >&2; exit 1; }
command -v node >/dev/null || { echo "缺少 node(≥21)" >&2; exit 1; }
command -v pdftotext >/dev/null || { echo "缺少 pdftotext" >&2; exit 1; }
command -v pdfinfo >/dev/null || { echo "缺少 pdfinfo" >&2; exit 1; }
command -v pdftoppm >/dev/null || { echo "缺少 pdftoppm" >&2; exit 1; }
python3 -c 'import PIL' 2>/dev/null || { echo "缺少 python3-Pillow" >&2; exit 1; }

TMP_ROOT="$(mktemp -d /tmp/wise-audit-deck.XXXXXX)"
PORT=$(( 20000 + RANDOM % 20000 ))
"$CHROME" --headless=new --disable-gpu --allow-file-access-from-files --disable-background-networking \
  --no-first-run --user-data-dir="$TMP_ROOT/profile" --remote-debugging-port="$PORT" \
  --window-size=1920,1080 about:blank >/dev/null 2>&1 &
CHROME_PID=$!
cleanup() {
  kill "$CHROME_PID" 2>/dev/null || true
  for _ in $(seq 1 20); do kill -0 "$CHROME_PID" 2>/dev/null || break; sleep 0.1; done
  kill -9 "$CHROME_PID" 2>/dev/null || true
  rm -rf "$TMP_ROOT" 2>/dev/null || true
}
trap cleanup EXIT INT TERM

URL="file://$HTML"

# ─── 1. screen 审计(CDP) ───
node - "$URL" "$PORT" "$TMP_ROOT/screen.json" <<'NODE'
const [url, port, outPath] = process.argv.slice(2);
const { writeFileSync } = require('node:fs');
const { setTimeout: sleep } = require('node:timers/promises');
let ws, msgId = 0; const pending = new Map();
const send = (m, p = {}) => new Promise((res, rej) => {
  const id = ++msgId; pending.set(id, { res, rej });
  ws.send(JSON.stringify({ id, method: m, params: p }));
});
(async () => {
  let wsUrl;
  for (let i = 0; i < 80; i++) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      const page = list.find(t => t.type === 'page');
      if (page) { wsUrl = page.webSocketDebuggerUrl; break; }
    } catch {}
    await sleep(250);
  }
  if (!wsUrl) throw new Error('CDP 不可达');
  ws = new WebSocket(wsUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
  ws.onmessage = ev => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) {
      const { res, rej } = pending.get(m.id); pending.delete(m.id);
      m.error ? rej(new Error(m.error.message)) : res(m.result);
    }
  };
  await send('Page.enable'); await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1920, height: 1080, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url });
  let ok = false;
  for (let i = 0; i < 160; i++) {
    const r = await send('Runtime.evaluate', { expression: `(function(){var q=document.querySelector('[data-deck-ready]');return q&&q.getAttribute('data-deck-ready')==='true'&&document.fonts.status==='loaded'})()` });
    if (r.result.value === true) { ok = true; break; }
    await sleep(250);
  }
  if (!ok) throw new Error('deck 未 ready(含字体)');
  await send('Runtime.evaluate', { expression: "document.body.className='mode-deck'" });
  await sleep(600);
  const expr = `(() => {
    const pages = [];
    document.querySelectorAll('#track > .slide').forEach(slide => {
      const stage = slide.querySelector('.stage'); if (!stage) return;
      const st = stage.getBoundingClientRect(); const scale = st.width / 1920 || 1;
      const rel = r => ({ top:(r.top-st.top)/scale, bottom:(r.bottom-st.top)/scale, left:(r.left-st.left)/scale, right:(r.right-st.left)/scale });
      const doc = slide.querySelector('.doc.tl'), cap = slide.querySelector('.caption'), folio = slide.querySelector('.folio');
      const topEdge = doc ? rel(doc.getBoundingClientRect()).bottom : 0;
      const bottomEdge = cap ? rel(cap.getBoundingClientRect()).top : (folio ? rel(folio.getBoundingClientRect()).top : 1080);
      let sub = null, texts = 0, maxFont = 0, minFont = Infinity;
      const consider = el => {
        if (el.closest('[data-balance-exclude="true"]')) return;
        if (el.closest('.doc') || el.closest('.folio') || el.closest('.caption')) return;
        const inSlot = el.closest('[data-layout-slot]') !== null;
        if (!inSlot && !el.matches('text,p')) return;
        const cs = getComputedStyle(el);
        if (cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity) === 0) return;
        const isLeaf = el.tagName === 'TEXT' || (el.children.length === 0 && el.textContent.trim().length > 0);
        if (!isLeaf && !el.matches('.divider')) return;
        const r = rel(el.getBoundingClientRect());
        if (r.bottom - r.top < 1 && !el.matches('.divider')) return;
        texts++;
        const fs = parseFloat(cs.fontSize) || 0;
        if (fs > 0) minFont = Math.min(minFont, fs);
        if (el.tagName !== 'TEXT' && !el.matches('.divider')) maxFont = Math.max(maxFont, fs);
        if (!sub) sub = r; else {
          sub.top = Math.min(sub.top, r.top); sub.bottom = Math.max(sub.bottom, r.bottom);
          sub.left = Math.min(sub.left, r.left); sub.right = Math.max(sub.right, r.right);
        }
      };
      stage.querySelectorAll('blockquote,.author-name,.author-title,td,th,.year,.hot-num,p,h1,h2,h3,span,text,.divider').forEach(consider);
      stage.querySelectorAll('rect,line,circle,ellipse,path,polygon').forEach(el => {
        const cs = getComputedStyle(el);
        const hasStroke = cs.stroke !== 'none' && parseFloat(cs.strokeOpacity || '1') > 0.05;
        const hasFill = cs.fill !== 'none' && cs.fill !== 'transparent' && parseFloat(cs.fillOpacity || '1') > 0.05;
        if (!hasStroke && !hasFill) return;
        if (parseFloat(cs.opacity) === 0) return;
        const r = rel(el.getBoundingClientRect());
        if (r.right - r.left >= 1919 || r.bottom - r.top >= 1079) return;
        if (!sub) sub = r; else {
          sub.top = Math.min(sub.top, r.top); sub.bottom = Math.max(sub.bottom, r.bottom);
          sub.left = Math.min(sub.left, r.left); sub.right = Math.max(sub.right, r.right);
        }
      });
      let frame = null;
      stage.querySelectorAll('[data-layout-slot], svg.scene, [data-content-ref]').forEach(el => {
        const r = rel(el.getBoundingClientRect());
        if (r.right - r.left >= 1919) return;
        if (!frame) frame = r; else {
          frame.left = Math.min(frame.left, r.left); frame.right = Math.max(frame.right, r.right);
        }
      });
      pages.push({
        page: slide.getAttribute('data-page-id'),
        topEdge: +topEdge.toFixed(1), bottomEdge: +bottomEdge.toFixed(1),
        subject: sub ? { t: +sub.top.toFixed(1), b: +sub.bottom.toFixed(1) } : null,
        frame: frame ? { l: +frame.left.toFixed(1), r: +frame.right.toFixed(1) } : null,
        texts, maxFont: maxFont ? +maxFont.toFixed(0) : 0,
        minFont: isFinite(minFont) ? +minFont.toFixed(1) : 0,
      });
    });
    const roleFonts = {};
    document.querySelectorAll('#track [data-slot-role]').forEach(slot => {
      const key = slot.getAttribute('data-slot-role');
      const main = slot.querySelector('blockquote,h1,h2');
      if (main) (roleFonts[key] = roleFonts[key] || []).push(getComputedStyle(main).fontSize);
    });
    return { pages, roleFonts };
  })()`;
  const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true });
  writeFileSync(outPath, JSON.stringify(r.result.value));
  process.exit(0);
})().catch(e => { console.error('SCREEN-ERR: ' + e.message); process.exit(1); });
NODE
[ -s "$TMP_ROOT/screen.json" ] || { echo "screen 审计失败" >&2; exit 1; }

SCREEN_FAILS=0
echo "── screen 报告(文字主体口径,|Δ|≤3px) ──"
node - "$TMP_ROOT/screen.json" <<'NODE' || SCREEN_FAILS=1
const data = require('node:fs').readFileSync(process.argv[2], 'utf8') ? JSON.parse(require('node:fs').readFileSync(process.argv[2], 'utf8')) : null;
(() => {
  const pad = (s, n) => String(s).padEnd(n);
  let fails = 0;
  console.log(pad('page',5), pad('subjT',7), pad('subjB',7), pad('dMid',7), pad('frameL',7), pad('frameR',7), pad('hMid',7), pad('maxF',5), pad('minF',5), 'verdict');
  for (const p of data.pages) {
    if (!p.subject || p.texts === 0) { console.log(pad(p.page,5) + ' FAIL(无文字主体/隐形内容)'); fails++; continue; }
    const mid = (p.subject.t + p.subject.b) / 2, avail = (p.topEdge + p.bottomEdge) / 2;
    const dMid = +(mid - avail).toFixed(1);
    const hMid = p.frame ? +(((p.frame.l + p.frame.r) / 2 - 960).toFixed(1)) : 0;
    const vOk = Math.abs(dMid) <= 3;
    const fOk = !p.minFont || p.minFont >= 12.5;   // 字阶下限 --type-meta=13px,0.5 容浮点
    if (!vOk || !fOk) fails++;
    const verdict = !vOk ? 'FAIL' : (!fOk ? 'FAIL(minF<13)' : 'OK');
    console.log(pad(p.page,5), pad(p.subject.t,7), pad(p.subject.b,7), pad(dMid,7),
      pad(p.frame?p.frame.l:'-',7), pad(p.frame?p.frame.r:'-',7), pad(hMid,7), pad(p.maxFont,5), pad(p.minFont||'-',5), verdict);
  }
  for (const [role, fonts] of Object.entries(data.roleFonts || {})) {
    const uniq = [...new Set(fonts)];
    if (uniq.length > 1) { console.log(`FAIL 字号不一致 role=${role}: ${fonts.join(' vs ')}`); fails++; }
  }
  console.log(fails === 0 ? 'screen: PASS' : `screen: ${fails} FAIL`);
  if (fails > 0) process.exitCode = 1;
})();
NODE

# ─── 2. PDF 样本:与 export-deck.sh 完全同款 CLI 管线(验的就是交付的那份) ───
NAME="$(basename "$DECK")"
NEWEST_SRC="$(find "$DECK" -name index.html -o -name '*.css' -o -name '*.js' | xargs ls -t | head -1)"
if [ -s "$DECK/$NAME.pdf" ] && [ "$DECK/$NAME.pdf" -nt "$NEWEST_SRC" ]; then
  cp "$DECK/$NAME.pdf" "$TMP_ROOT/print.pdf"
  echo "(复用现有 $NAME.pdf)"
else
  "$CHROME" --headless --disable-gpu --allow-file-access-from-files --disable-background-networking \
    --disable-component-update --disable-default-apps --disable-sync --no-first-run --no-default-browser-check \
    --metrics-recording-only --user-data-dir="$TMP_ROOT/print-profile" --no-pdf-header-footer \
    --virtual-time-budget=12000 --print-to-pdf="$TMP_ROOT/print.pdf" "$URL?print=1" >/dev/null 2>&1
fi
[ -s "$TMP_ROOT/print.pdf" ] && [ "$(head -c 5 "$TMP_ROOT/print.pdf")" = "%PDF-" ] || { echo "PDF 生成失败" >&2; exit 1; }

# ─── 3. PDF 主体对比 + 可见性 ───
PDF_PAGES=$(pdfinfo "$TMP_ROOT/print.pdf" | awk '/^Pages:/ {print $2}')
SCREEN_PAGES=$(node -e "console.log(JSON.parse(require('fs').readFileSync(process.argv[1],'utf8')).pages.length)" "$TMP_ROOT/screen.json")
if [ "$PDF_PAGES" != "$SCREEN_PAGES" ]; then
  echo "FAIL: PDF 页数 $PDF_PAGES ≠ slide 数 $SCREEN_PAGES" >&2
  exit 1
fi

echo "── PDF 报告(渲染真值像素带,|Δ|≤35px;150dpi) ──"
python3 - "$TMP_ROOT/print.pdf" "$TMP_ROOT/screen.json" "$TMP_ROOT" <<'PY'
import sys, subprocess, glob, os, re
pdf, screen_path, tmp = sys.argv[1], sys.argv[2], sys.argv[3]
import json
from PIL import Image
pages = json.load(open(screen_path))['pages']
# 词层仅做存在性判断(防分页丢字);位置度量用浓墨像素带(词框是行框级,与 DOM 口径有系统差,不并集)
def word_bands(pdf, page_no, top_e, bot_e):
    xml = subprocess.run(['pdftotext', '-bbox', '-f', str(page_no), '-l', str(page_no), pdf, '-'],
                         capture_output=True, text=True).stdout
    ys = [(float(m.group(1)) * 4/3, float(m.group(2)) * 4/3)
          for m in re.finditer(r'<word xMin="[\d.-]+" yMin="([\d.-]+)" xMax="[\d.-]+" yMax="([\d.-]+)"', xml)]
    ys = [(a, b) for a, b in ys if a >= top_e - 6 and b <= bot_e - 20]
    return ys
fails = 0
print(f"{'page':<5}{'availMid':<9}{'pdfMid':<8}{'drift':<7}{'bands':<7}verdict")
for i, sp in enumerate(pages, 1):
    subprocess.run(['pdftoppm','-png','-r','150','-f',str(i),'-l',str(i),pdf,f'{tmp}/px'], check=True)
    files = glob.glob(f'{tmp}/px-*.png')
    if not files:
        print(f"{sp['page']:<5}FAIL(渲染失败)"); fails += 1; continue
    im = Image.open(files[0]).convert('L'); w, h = im.size
    sc = h / 1080.0; px = im.load()
    top_e, bot_e = sp['topEdge'], sp['bottomEdge']
    bands = []
    cur = None
    step = max(1, round(6 * sc))
    for yy in range(0, h, step):
        # 家具排除:眉题带(<topEdge)与题注/页码带(>bottomEdge-24)
        y1080 = yy / sc
        if y1080 < top_e - 2 or y1080 > bot_e - 24:
            if cur: bands.append(tuple(cur)); cur = None
            continue
        dark = 0
        for x in range(int(120*sc), int((w-120*sc)), max(1, round(6*sc))):
            if px[x, yy] < 175: dark += 1
        if dark >= max(3, round(3*sc)):
            if cur is None: cur = [yy, yy]
            else: cur[1] = yy
        else:
            if cur: bands.append(tuple(cur)); cur = None
    if cur: bands.append(tuple(cur))
    for f in files: os.remove(f)
    words = word_bands(pdf, i, top_e, bot_e)
    if not bands and not words:
        print(f"{sp['page']:<5}FAIL(PDF 内容区无墨无字——分页丢失或隐形)"); fails += 1; continue
    if bands:
        t = min(b[0] for b in bands); b = max(b[1] for b in bands)
    else:
        t = min(w[0] for w in words); b = max(w[1] for w in words)
    avail_mid = (top_e + bot_e) / 2
    pdf_mid = ((t + b) / 2) / sc
    drift = round(pdf_mid - avail_mid, 1)
    ok = abs(drift) <= 35
    if not ok: fails += 1
    print(f"{sp['page']:<5}{avail_mid:<9}{round(pdf_mid,1):<8}{drift:<7}{len(bands):<7}{'OK' if ok else 'FAIL'}")
print('pdf: ' + ('PASS' if fails == 0 else f'{fails} FAIL'))
sys.exit(1 if fails else 0)
PY

echo "── 汇总 ──"
if [ "$SCREEN_FAILS" -eq 0 ]; then
  echo "PASS audit-deck(screen 主体居中/字档一致 + PDF 残差/可见性/页数)"
else
  echo "FAIL audit-deck:见上方 screen 报告" >&2
  exit 1
fi
