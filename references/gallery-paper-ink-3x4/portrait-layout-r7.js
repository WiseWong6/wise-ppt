(function () {
  'use strict';

  var svg = document.querySelector('.scene');
  var NS = 'http://www.w3.org/2000/svg';
  var INK = 'var(--ink)';
  var INK80 = 'var(--ink-80)';
  var INK45 = 'var(--ink-45)';
  var FUNCTIONAL = 'var(--wp-color-functional)';
  var SANS = 'var(--sans)';
  var MONO = 'var(--mono)';
  var SERIF = 'var(--serif)';

  var ACCENT_BRANDS = { 1: true, 6: true, 9: true, 13: true, 17: true, 20: true, 22: true, 27: true };
  var FOCUS_BRANDS = { 3: true, 4: true, 5: true, 6: true, 27: true };

  function el(tag, attrs, parent) {
    var node = document.createElementNS(NS, tag);
    Object.keys(attrs || {}).forEach(function (key) { node.setAttribute(key, attrs[key]); });
    (parent || svg).appendChild(node);
    return node;
  }

  function text(value, x, y, attrs, parent) {
    var node = el('text', Object.assign({ x: x, y: y, fill: INK, 'font-family': SANS, 'font-weight': 300 }, attrs || {}), parent);
    node.textContent = value;
    return node;
  }

  function line(x1, y1, x2, y2, attrs, parent) {
    return el('line', Object.assign({ x1: x1, y1: y1, x2: x2, y2: y2, stroke: INK, 'stroke-width': 1 }, attrs || {}), parent);
  }

  function accentAttrs(attrs, accentKind, isAccent) {
    if (!isAccent) return attrs;
    attrs['data-r7-accent-mark'] = '';
    attrs['data-r7-accent-kind'] = accentKind;
    attrs.opacity = 1;
    if (accentKind === 'fill') {
      attrs.fill = FUNCTIONAL;
    } else {
      attrs.stroke = FUNCTIONAL;
    }
    return attrs;
  }

  function drawMark(kind, x, y, parent, isAccent) {
    var stroke = INK;
    var group = el('g', {
      'data-r7-logo-body': 'true',
      transform: 'translate(' + x + ' ' + y + ')',
      fill: 'none', stroke: stroke, 'stroke-width': 1.15
    }, parent);
    if (kind === 0) {
      el('circle', { r: 21 }, group);
      el('circle', { r: 11, opacity: .55 }, group);
      el('circle', { r: 2.2, fill: stroke, stroke: 'none' }, group);
    } else if (kind === 1) {
      el('path', { d: 'M 0 -22 L 20 -11 L 20 11 L 0 22 L -20 11 L -20 -11 Z' }, group);
      line(0, -10, 0, 10, accentAttrs({ stroke: stroke, opacity: .55 }, 'stroke', isAccent), group);
    } else if (kind === 2) {
      el('path', { d: 'M 0 -23 L 21 14 L -21 14 Z' }, group);
      line(-18, 22, 18, 22, { stroke: stroke, opacity: .55 }, group);
    } else if (kind === 3) {
      el('path', { d: 'M -18 9 A 19 19 0 0 1 -6 -18 M -10 7 A 11 11 0 0 1 -3 -10' }, group);
      el('circle', accentAttrs({ cx: 11, cy: 9, r: 2.5, fill: stroke, stroke: 'none' }, 'fill', isAccent), group);
    } else if (kind === 4) {
      el('path', { d: 'M 0 -18 L 18 0 L 0 18 L -18 0 Z' }, group);
      line(-8, 0, 8, 0, accentAttrs({ stroke: stroke, opacity: .55 }, 'stroke', isAccent), group);
      line(0, -8, 0, 8, { stroke: stroke, opacity: .55 }, group);
    } else if (kind === 5) {
      el('circle', { r: 17 }, group);
      line(-12, 12, 12, -12, accentAttrs({ stroke: stroke, opacity: .65 }, 'stroke', isAccent), group);
    } else if (kind === 6) {
      el('path', { d: 'M -20 8 L -8 -10 L 0 2 L 8 -10 L 20 8' }, group);
      line(-15, 16, 15, 16, accentAttrs({ stroke: stroke, opacity: .55 }, 'stroke', isAccent), group);
    } else {
      el('path', { d: 'M -18 8 A 18 17 0 0 1 18 8' }, group);
      line(-23, 8, 23, 8, accentAttrs({ stroke: stroke, opacity: .55 }, 'stroke', isAccent), group);
      el('circle', { cy: -3, r: 2.2, fill: stroke, stroke: 'none' }, group);
    }
  }

  function drawBrand(name, brandIndex) {
    var col = brandIndex % 4;
    var row = Math.floor(brandIndex / 4);
    var x = 90 + col * 225;
    var y = 274 + row * 128;
    var group = el('g', { 'data-layout-zone': 'r7.brand-' + (brandIndex + 1), 'data-slot-id': 'capability-' + ('0' + (brandIndex + 1)).slice(-2) });
    var markParent = brandIndex < 8 ? el('g', { 'data-r7-logo-wrap': 'true' }, group) : group;
    drawMark(brandIndex % 8, x + 112.5, y + 42, markParent, Boolean(ACCENT_BRANDS[brandIndex]));
    var brandAttrs = {
      'class': 'brand-name', 'data-r7-brand-name': 'true',
      'font-family': MONO, 'font-size': name.length > 9 ? 12.5 : 14,
      'letter-spacing': name.length > 9 ? 1.1 : 1.7,
      fill: INK45, 'text-anchor': 'middle'
    };
    if (FOCUS_BRANDS[brandIndex]) brandAttrs['data-r7-focus-brand'] = 'true';
    text(name, x + 112.5, y + 101, brandAttrs, group);
  }

  function drawR7() {
    var brands = [
      'CLAUDEAI', 'GPT-4O', 'GEMINI', 'DEEPSEEK',
      'KIMI', 'DOUBAO', 'QWEN', 'LLAMA',
      'MISTRAL', 'COPILOT', 'CURSOR', 'WINDSURF',
      'COZE', 'DIAN', 'MIDJOURNEY', 'NANOBAN',
      'SEEDREAM', 'SORA', 'RUNWAY', 'PINOKIO',
      'OLLAMA', 'LANGCHAIN', 'LITELLM', 'VOYAGE',
      'PINECONE', 'LMSTUDIO', 'ANYLLM', 'GLM'
    ];
    text('AI 全链路生态图谱', 90, 222, { 'font-family': SERIF, 'font-size': 50, 'font-weight': 500 });
    text('28 个品牌等权陈列；从模型、开发工具延伸到生成平台。', 90, 274, { 'font-size': 25, fill: INK45 });
    brands.forEach(drawBrand);
  }

  drawR7();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
