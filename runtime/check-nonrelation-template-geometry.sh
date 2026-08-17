#!/bin/bash
# wise-ppt-glm · 非关系模板参考帧几何对照（无截图）
set -euo pipefail

DECK="${1:?用法: check-nonrelation-template-geometry.sh <deck目录>}"
DECK="$(cd "$DECK" && pwd)"
HTML="$DECK/index.html"
[ -f "$HTML" ] || { echo "缺少 $HTML" >&2; exit 1; }

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MANIFEST="$ROOT/capabilities/layouts/nonrelation-template-contracts.json"
[ -f "$MANIFEST" ] || { echo "缺少非关系模板合同: $MANIFEST" >&2; exit 1; }

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
[ -x "$CHROME" ] || CHROME="$(command -v google-chrome || command -v chrome || command -v chromium || command -v chromium-browser || true)"
[ -x "$CHROME" ] || { echo "找不到 Chrome" >&2; exit 1; }
command -v node >/dev/null || { echo "缺少 node(>=21)" >&2; exit 1; }

TMP_ROOT="$(mktemp -d /tmp/wise-ppt-template-geometry.XXXXXX)"
PORT=$(( 20000 + RANDOM % 20000 ))
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --allow-file-access-from-files \
  --disable-background-networking --disable-component-update --disable-default-apps --disable-sync \
  --no-first-run --no-default-browser-check --metrics-recording-only \
  --user-data-dir="$TMP_ROOT/profile" --remote-debugging-port="$PORT" \
  --window-size=1920,1080 about:blank >/dev/null 2>&1 &
CHROME_PID=$!
cleanup() {
  kill "$CHROME_PID" 2>/dev/null || true
  for _ in $(seq 1 20); do kill -0 "$CHROME_PID" 2>/dev/null || break; sleep 0.1; done
  kill -9 "$CHROME_PID" 2>/dev/null || true
  rm -rf "$TMP_ROOT"
}
trap cleanup EXIT INT TERM

node - "$HTML" "$ROOT" "$MANIFEST" "$PORT" <<'NODE'
const [deckHtml, repoRoot, manifestPath, port] = process.argv.slice(2);
const { readFileSync } = require('node:fs');
const { pathToFileURL } = require('node:url');
const { resolve } = require('node:path');
const { setTimeout: sleep } = require('node:timers/promises');
const contracts = JSON.parse(readFileSync(manifestPath, 'utf8')).templates;
let ws, msgId = 0;
const pending = new Map();
const send = (method, params = {}) => new Promise((res, rej) => {
  const id = ++msgId;
  pending.set(id, { res, rej });
  ws.send(JSON.stringify({ id, method, params }));
});

async function navigate(url, readyExpression) {
  await send('Page.navigate', { url });
  for (let i = 0; i < 160; i++) {
    const result = await send('Runtime.evaluate', { expression: readyExpression });
    if (result.result.value === true) {
      await sleep(250);
      return;
    }
    await sleep(125);
  }
  throw new Error(`页面未 ready: ${url}`);
}

async function evaluate(expression) {
  const result = await send('Runtime.evaluate', { expression, returnByValue: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text || '页面表达式执行失败');
  return result.result.value;
}

const measureExpression = (selector, geometry) => `(() => {
  const scope = ${selector};
  if (!scope) return { error: '找不到测量范围' };
  const stage = scope.matches('.stage') ? scope : scope.querySelector('.stage');
  if (!stage) return { error: '找不到 .stage' };
  const sr = stage.getBoundingClientRect();
  const sx = sr.width / 1920 || 1, sy = sr.height / 1080 || sx;
  const spec = ${JSON.stringify(geometry)};
  const values = {};
  for (const [part, fields] of Object.entries(spec)) {
    const el = stage.querySelector('[data-template-part="' + CSS.escape(part) + '"]');
    if (!el) { values[part] = { error: 'missing' }; continue; }
    const r = el.getBoundingClientRect();
    const all = {
      left: (r.left - sr.left) / sx,
      top: (r.top - sr.top) / sy,
      width: r.width / sx,
      height: r.height / sy,
    };
    values[part] = Object.fromEntries(fields.map(field => [field, +all[field].toFixed(2)]));
  }
  return { values };
})()`;

(async () => {
  let wsUrl;
  for (let i = 0; i < 80; i++) {
    try {
      const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      const page = targets.find(target => target.type === 'page');
      if (page) { wsUrl = page.webSocketDebuggerUrl; break; }
    } catch {}
    await sleep(250);
  }
  if (!wsUrl) throw new Error('CDP 不可达');
  ws = new WebSocket(wsUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
  ws.onmessage = event => {
    const message = JSON.parse(event.data);
    if (!message.id || !pending.has(message.id)) return;
    const { res, rej } = pending.get(message.id);
    pending.delete(message.id);
    message.error ? rej(new Error(message.error.message)) : res(message.result);
  };
  await send('Page.enable');
  await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1920, height: 1080, deviceScaleFactor: 1, mobile: false });

  const deckUrl = pathToFileURL(deckHtml).href + '?selftest=1';
  await navigate(deckUrl, `document.readyState==='complete' && document.fonts.status==='loaded' && document.documentElement.getAttribute('data-deck-ready')==='true'`);
  await evaluate(`document.body.className='mode-deck'; true`);
  await sleep(250);
  const pages = await evaluate(`(() => { const all=Array.from(document.querySelectorAll('#track > .slide')); return all.filter(slide=>slide.hasAttribute('data-template-id')).map(slide=>{const index=all.indexOf(slide);return {index,template:slide.getAttribute('data-template-id'),page:slide.getAttribute('data-page-id')||('p'+String(index+1).padStart(2,'0'))};}); })()`);
  const actual = {};
  for (const page of pages) {
    const contract = contracts[page.template];
    if (!contract) throw new Error(`${page.page} 未登记模板 ${page.template}`);
    const measured = await evaluate(measureExpression(`document.querySelectorAll('#track > .slide')[${page.index}]`, contract.geometry));
    if (measured.error) throw new Error(`${page.page} ${measured.error}`);
    actual[page.page] = { template: page.template, values: measured.values };
  }

  const reference = {};
  for (const template of [...new Set(pages.map(page => page.template))]) {
    const contract = contracts[template];
    const referenceUrl = pathToFileURL(resolve(repoRoot, contract.source)).href;
    await navigate(referenceUrl, `document.readyState==='complete' && document.fonts.status==='loaded'`);
    const measured = await evaluate(measureExpression(`document.querySelector('.stage')`, contract.geometry));
    if (measured.error) throw new Error(`${template} 参考帧 ${measured.error}`);
    reference[template] = measured.values;
  }

  const failures = [];
  const tolerance = 1.5;
  for (const [page, item] of Object.entries(actual)) {
    const expected = reference[item.template];
    for (const [part, fields] of Object.entries(item.values)) {
      if (fields.error || expected[part]?.error) {
        failures.push(`${page}/${item.template}/${part} 缺少几何节点(actual=${fields.error || 'ok'}, reference=${expected[part]?.error || 'ok'})`);
        continue;
      }
      for (const [field, value] of Object.entries(fields)) {
        const want = expected[part][field];
        if (!Number.isFinite(want) || Math.abs(value - want) > tolerance) {
          failures.push(`${page}/${item.template}/${part}.${field}: ${value}px != 参考 ${want}px`);
        }
      }
    }
  }
  if (failures.length) throw new Error(`非关系模板几何漂移\n${failures.join('\n')}`);
  console.log(`PASS nonrelation template geometry pages=${pages.length} tolerance=${tolerance}px`);
  process.exit(0);
})().catch(error => {
  console.error(`FAIL ${error.message}`);
  process.exit(1);
});
NODE
