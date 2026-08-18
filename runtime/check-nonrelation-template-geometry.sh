#!/bin/bash
# wise-ppt · 直接套用模板/版式外壳对照（无截图）
set -euo pipefail

DECK="${1:?用法: check-nonrelation-template-geometry.sh <deck目录>}"
DECK="$(cd "$DECK" && pwd)"
HTML="$DECK/index.html"
[ -f "$HTML" ] || { echo "缺少 $HTML" >&2; exit 1; }

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TEMPLATE_MANIFEST="$ROOT/capabilities/layouts/nonrelation-template-contracts.json"
GALLERY_MANIFEST="$ROOT/capabilities/layouts/gallery-manifest.json"
[ -f "$TEMPLATE_MANIFEST" ] || { echo "缺少非关系模板合同: $TEMPLATE_MANIFEST" >&2; exit 1; }
[ -f "$GALLERY_MANIFEST" ] || { echo "缺少关系版式合同: $GALLERY_MANIFEST" >&2; exit 1; }

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
[ -x "$CHROME" ] || CHROME="$(command -v google-chrome || command -v chrome || command -v chromium || command -v chromium-browser || true)"
[ -x "$CHROME" ] || { echo "找不到 Chrome" >&2; exit 1; }
command -v node >/dev/null || { echo "缺少 node(>=21)" >&2; exit 1; }

TMP_ROOT="$(mktemp -d /tmp/wise-ppt-layout-fidelity.XXXXXX)"
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

node - "$HTML" "$ROOT" "$TEMPLATE_MANIFEST" "$GALLERY_MANIFEST" "$PORT" <<'NODE'
const [deckHtml, repoRoot, templateManifestPath, galleryManifestPath, port] = process.argv.slice(2);
const { readFileSync } = require('node:fs');
const { pathToFileURL } = require('node:url');
const { resolve } = require('node:path');
const { setTimeout: sleep } = require('node:timers/promises');
const templates = JSON.parse(readFileSync(templateManifestPath, 'utf8')).templates;
const recipes = JSON.parse(readFileSync(galleryManifestPath, 'utf8')).recipes;
const recipesById = Object.fromEntries(recipes.map(recipe => [recipe.recipe_id, recipe]));
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

const captureExpression = (selector, contract, kind) => `(() => {
  const scope = ${selector};
  if (!scope) return { error: '找不到测量范围' };
  const stage = scope.matches('.stage') ? scope : scope.querySelector('.stage');
  if (!stage) return { error: '找不到 .stage' };
  const contract = ${JSON.stringify(contract)};
  const kind = ${JSON.stringify(kind)};
  const skip = new Set(['SCRIPT','STYLE','DESC','TITLE','TEMPLATE']);
  const clean = value => String(value == null ? '' : value).replace(/\\s+/g, ' ').trim();
  const visible = el => {
    const cs = getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    return cs.display !== 'none' && cs.visibility !== 'hidden' && Number(cs.opacity || 1) > 0 && rect.width >= 0 && rect.height >= 0;
  };
  const hasOwnText = el => !skip.has(el.tagName) && Array.from(el.childNodes).some(node => node.nodeType === Node.TEXT_NODE && clean(node.nodeValue));
  const typography = el => {
    const cs = getComputedStyle(el);
    return {
      fontSize: clean(cs.fontSize), fontWeight: clean(cs.fontWeight),
      lineHeight: clean(cs.lineHeight), letterSpacing: clean(cs.letterSpacing), textAlign: clean(cs.textAlign),
      textTransform: clean(cs.textTransform)
    };
  };
  const declaredBoxProperties = el => {
    const names = ['position','left','right','top','bottom','z-index','width','height'];
    const declared = new Set();
    const inspectRules = rules => {
      for (const rule of Array.from(rules || [])) {
        if (rule.cssRules) { inspectRules(rule.cssRules); continue; }
        if (!rule.selectorText || !rule.style) continue;
        try {
          if (!el.matches(rule.selectorText)) continue;
        } catch { continue; }
        for (const name of names) if (rule.style.getPropertyValue(name)) declared.add(name);
      }
    };
    for (const sheet of Array.from(document.styleSheets)) {
      try { inspectRules(sheet.cssRules); } catch {}
    }
    for (const name of names) if (el.style.getPropertyValue(name)) declared.add(name);
    return declared;
  };
  const shellNode = el => {
    const cs = getComputedStyle(el);
    const tag = el.tagName.toLowerCase();
    const vector = tag === 'svg' || tag === 'canvas';
    const declared = declaredBoxProperties(el);
    const style = {};
    for (const name of ['position','left','right','top','bottom','z-index','width','height']) {
      if (!declared.has(name)) continue;
      style[name] = clean(cs.getPropertyValue(name));
    }
    return {
      tag,
      classes: Array.from(el.classList).sort(),
      attrs: vector ? Object.fromEntries(['width','height','viewBox'].filter(name => el.hasAttribute(name)).map(name => [name, clean(el.getAttribute(name))])) : {},
      style,
      typography: vector ? null : typography(el)
    };
  };
  const deepNode = el => {
    const keep = ['x','y','x1','y1','x2','y2','cx','cy','r','rx','ry','width','height','viewBox','d','points','transform','fill','stroke','stroke-width','stroke-dasharray','opacity','text-anchor'];
    return {
      tag: el.tagName.toLowerCase(),
      classes: Array.from(el.classList).sort(),
      attrs: Object.fromEntries(keep.filter(name => el.hasAttribute(name)).map(name => [name, clean(el.getAttribute(name))])),
      typography: hasOwnText(el) ? typography(el) : null
    };
  };
  const children = Array.from(stage.children).filter(el => !skip.has(el.tagName)).map(shellNode);
  if (kind === 'relationship') return { children };

  const editable = new Set(contract.editable_text_parts || []);
  const textViolations = [];
  for (const el of stage.querySelectorAll('*')) {
    if (!visible(el) || !hasOwnText(el)) continue;
    const owner = el.closest('[data-template-part]');
    const part = owner && owner.getAttribute('data-template-part');
    if (!part || !editable.has(part)) textViolations.push({ tag: el.tagName.toLowerCase(), part: part || '-', text: clean(el.textContent).slice(0, 48) });
  }
  const typeParts = {};
  const textSlotParts = new Set(Object.entries(contract.slots || {}).filter(([, slotKind]) => slotKind === 'text').map(([part]) => part));
  textSlotParts.add('folio');
  for (const part of textSlotParts) {
    const root = stage.querySelector('[data-template-part="' + CSS.escape(part) + '"]');
    if (root) typeParts[part] = typography(root);
  }
  const fixedParts = {};
  const slotParts = new Set(Object.keys(contract.slots || {}));
  for (const part of contract.parts || []) {
    if (slotParts.has(part)) continue;
    const root = stage.querySelector('[data-template-part="' + CSS.escape(part) + '"]');
    if (!root) continue;
    fixedParts[part] = [deepNode(root), ...Array.from(root.querySelectorAll('*')).filter(el => !skip.has(el.tagName)).map(deepNode)];
  }
  return { children, textViolations, typeParts, fixedParts };
})()`;

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
    const all = { left:(r.left-sr.left)/sx, top:(r.top-sr.top)/sy, width:r.width/sx, height:r.height/sy };
    values[part] = Object.fromEntries(fields.map(field => [field, +all[field].toFixed(2)]));
  }
  return { values };
})()`;

const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

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
  await send('Emulation.setDeviceMetricsOverride', { width:1920, height:1080, deviceScaleFactor:1, mobile:false });

  const deckUrl = pathToFileURL(deckHtml).href + '?selftest=1';
  await navigate(deckUrl, `document.readyState==='complete' && document.fonts.status==='loaded' && document.documentElement.getAttribute('data-deck-ready')==='true'`);
  await evaluate(`document.body.className='mode-deck'; true`);
  await sleep(250);
  const pages = await evaluate(`(() => { const all=Array.from(document.querySelectorAll('#track > .slide')); return all.map((slide,index)=>({index,page:slide.getAttribute('data-page-id')||('p'+String(index+1).padStart(2,'0')),template:slide.getAttribute('data-template-id'),recipe:slide.getAttribute('data-layout-source')==='gallery'?slide.getAttribute('data-recipe-id'):null})).filter(item=>item.template||item.recipe); })()`);
  const actual = {};
  for (const page of pages) {
    if (page.template) {
      const contract = templates[page.template];
      if (!contract) throw new Error(`${page.page} 未登记模板 ${page.template}`);
      actual[page.page] = {
        kind:'template', key:page.template,
        capture:await evaluate(captureExpression(`document.querySelectorAll('#track > .slide')[${page.index}]`, contract, 'template')),
        geometry:(await evaluate(measureExpression(`document.querySelectorAll('#track > .slide')[${page.index}]`, contract.geometry))).values,
        widths:contract.width_max
          ? (await evaluate(measureExpression(`document.querySelectorAll('#track > .slide')[${page.index}]`, Object.fromEntries(Object.keys(contract.width_max).map(part => [part, ['width']]))))).values
          : null
      };
    } else {
      const recipe = recipesById[page.recipe];
      if (!recipe) throw new Error(`${page.page} 未登记关系版式 ${page.recipe}`);
      actual[page.page] = { kind:'relationship', key:page.recipe, capture:await evaluate(captureExpression(`document.querySelectorAll('#track > .slide')[${page.index}]`, recipe, 'relationship')) };
    }
  }

  const reference = {};
  for (const item of Object.values(actual)) {
    if (reference[item.key]) continue;
    const contract = item.kind === 'template' ? templates[item.key] : recipesById[item.key];
    const source = item.kind === 'template' ? contract.source : `references/gallery-paper-ink/ai/frames/layout-${contract.display_code.toLowerCase()}.html`;
    await navigate(pathToFileURL(resolve(repoRoot, source)).href, `document.readyState==='complete' && document.fonts.status==='loaded'`);
    reference[item.key] = {
      capture:await evaluate(captureExpression(`document.querySelector('.stage')`, contract, item.kind)),
      geometry:item.kind === 'template' ? (await evaluate(measureExpression(`document.querySelector('.stage')`, contract.geometry))).values : null
    };
  }

  const failures = [];
  const tolerance = 1.5;
  const firstArrayDiff = (actualItems, expectedItems) => {
    const count = Math.max(actualItems.length, expectedItems.length);
    for (let index = 0; index < count; index++) {
      if (!same(actualItems[index], expectedItems[index])) {
        return `child[${index}] actual=${JSON.stringify(actualItems[index])} expected=${JSON.stringify(expectedItems[index])}`;
      }
    }
    return 'unknown';
  };
  const firstObjectDiff = (actualObject, expectedObject) => {
    const keys = Array.from(new Set([...Object.keys(actualObject || {}), ...Object.keys(expectedObject || {})]));
    for (const key of keys) {
      if (!same(actualObject?.[key], expectedObject?.[key])) {
        return `${key} actual=${JSON.stringify(actualObject?.[key])} expected=${JSON.stringify(expectedObject?.[key])}`;
      }
    }
    return 'unknown';
  };
  for (const [page, item] of Object.entries(actual)) {
    const expected = reference[item.key];
    if (item.capture.error) { failures.push(`${page} ${item.capture.error}`); continue; }
    if (!same(item.capture.children, expected.capture.children)) failures.push(`${page}/${item.key} 直接套用外壳、外壳字号或槽位位置发生变化: ${firstArrayDiff(item.capture.children, expected.capture.children)}`);
    if (item.kind === 'relationship') continue;
    if (item.capture.textViolations.length) {
      for (const problem of item.capture.textViolations) failures.push(`${page}/${item.key} 在未登记部件 ${problem.part} 新增文字: ${problem.text}`);
    }
    if (!same(item.capture.typeParts, expected.capture.typeParts)) failures.push(`${page}/${item.key} 模板文字槽字号或字体发生变化: ${firstObjectDiff(item.capture.typeParts, expected.capture.typeParts)}`);
    for (const [part, signature] of Object.entries(item.capture.fixedParts)) {
      if (!same(signature, expected.capture.fixedParts[part])) failures.push(`${page}/${item.key}/${part} 固定装饰或脚本绘制结果发生变化`);
    }
    for (const [part, fields] of Object.entries(item.geometry || {})) {
      for (const [field, value] of Object.entries(fields)) {
        const want = expected.geometry?.[part]?.[field];
        if (!Number.isFinite(want) || Math.abs(value-want)>tolerance) failures.push(`${page}/${item.key}/${part}.${field}: ${value}px != 参考 ${want}px`);
      }
    }
    for (const [part, max] of Object.entries((item.kind === 'template' ? templates[item.key] : {}).width_max || {})) {
      const value = item.widths?.[part]?.width;
      if (!Number.isFinite(value)) failures.push(`${page}/${item.key}/${part}.width: 未测得渲染宽`);
      else if (value > max + tolerance) failures.push(`${page}/${item.key}/${part}.width: ${value}px 超出可用宽上限 ${max}px(文字槽只锁 left/top,宽度不得越过邻区/外缘)`);
    }
  }
  if (failures.length) throw new Error(`直接套用外壳漂移\n${failures.join('\n')}`);
  const templateCount = pages.filter(page => page.template).length;
  const layoutCount = pages.filter(page => page.recipe).length;
  console.log(`PASS direct-use fidelity templates=${templateCount} relationship-layouts=${layoutCount} tolerance=${tolerance}px`);
  process.exit(0);
})().catch(error => {
  console.error(`FAIL ${error.message}`);
  process.exit(1);
});
NODE
