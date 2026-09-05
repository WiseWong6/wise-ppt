(function () {
  'use strict';

  var svg = document.querySelector('.scene');
  var NS = 'http://www.w3.org/2000/svg';
  var INK = 'var(--ink)';
  var INK80 = 'var(--ink-80)';
  var INK70 = 'var(--ink-70)';
  var INK45 = 'var(--ink-45)';
  var PANEL = 'var(--paper-panel)';
  var PAPER = 'var(--paper)';
  var FUNCTIONAL = 'var(--wp-color-functional)';
  var SANS = 'var(--sans)';
  var MONO = 'var(--mono)';
  var SERIF = 'var(--serif)';
  var AXIS_X = 126;
  var CARD_X = 220;
  var ICON_X = 400;
  var TEXT_X = 600;
  var CENTERS = [410, 626, 842, 1058];

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

  function drawRuler() {
    line(AXIS_X, 340, AXIS_X, 1146, { stroke: INK80, 'stroke-width': 1.2 });
    for (var y = 346, tickIndex = 0; y <= 1140; y += 18, tickIndex++) {
      var major = tickIndex % 4 === 0;
      line(AXIS_X - (major ? 12 : 7), y, AXIS_X + (major ? 12 : 7), y, {
        stroke: INK,
        'stroke-width': major ? .9 : .5,
        opacity: major ? .35 : .18
      });
    }
    for (var stepIndex = 0; stepIndex < CENTERS.length - 1; stepIndex++) {
      var startY = CENTERS[stepIndex] + 29;
      var endY = CENTERS[stepIndex + 1] - 29;
      line(AXIS_X, startY, AXIS_X, endY, { stroke: INK80, 'stroke-width': 1.5 });
      el('path', {
        d: 'M ' + (AXIS_X - 7) + ' ' + (endY - 9) + ' L ' + AXIS_X + ' ' + endY + ' L ' + (AXIS_X + 7) + ' ' + (endY - 9),
        fill: 'none', stroke: INK80, 'stroke-width': 1.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round'
      });
    }
  }

  /* ---------- ① QUERY：折角单据（镜像 16:9） ---------- */
  function drawQueryIcon(cx, cy, group) {
    var w = 104, h = 106, f = 16;
    var x = cx - w / 2, y = cy - h / 2;
    el('path', {
      d: 'M ' + x + ' ' + y + ' L ' + (x + w - f) + ' ' + y + ' L ' + (x + w) + ' ' + (y + f) + ' L ' + (x + w) + ' ' + (y + h) + ' L ' + x + ' ' + (y + h) + ' Z',
      fill: PANEL, stroke: INK80, 'stroke-width': 1.3
    }, group);
    el('path', {
      d: 'M ' + (x + w - f) + ' ' + y + ' L ' + (x + w - f) + ' ' + (y + f) + ' L ' + (x + w) + ' ' + (y + f),
      fill: 'none', stroke: INK, 'stroke-width': .8, opacity: .6
    }, group);
    [[27, 74], [45, 92], [62, 59]].forEach(function (row) {
      el('circle', { cx: x + 15, cy: y + row[0], r: 2, fill: INK, opacity: .55 }, group);
      line(x + 23, y + row[0], x + 23 + row[1], y + row[0], { stroke: INK, 'stroke-width': .8, opacity: .5 }, group);
    });
    line(x + 23, y + 80, x + 80, y + 80, { stroke: INK, 'stroke-width': .6, opacity: .3, 'stroke-dasharray': '2 5' }, group);
  }

  /* ---------- ② RETRIEVE：hatch 甘特条带（镜像 16:9） ---------- */
  function drawRetrieveIcon(cx, cy, group) {
    var ax0 = cx - 71, ax1 = cx + 71, ay = cy + 38;
    [
      { x: ax0 + 4, y: cy - 64, w: 79 },
      { x: ax0 + 32, y: cy - 42, w: 103 },
      { x: ax0 + 18, y: cy - 20, w: 59 }
    ].forEach(function (s) {
      el('rect', { x: s.x, y: s.y, width: s.w, height: 10, fill: 'url(#i1-span-hatch)', stroke: INK80, 'stroke-width': 1 }, group);
      line(s.x, s.y - 3, s.x, s.y + 13, { stroke: INK, 'stroke-width': 1, opacity: .7 }, group);
    });
    line(ax0, ay, ax1, ay, { stroke: INK, 'stroke-width': .9, opacity: .6 }, group);
    for (var t = ax0; t <= ax1; t += 14) {
      line(t, ay - 3, t, ay + 3, { stroke: INK, 'stroke-width': .5, opacity: .4 }, group);
    }
    text('t', ax1 + 4, ay + 4, { 'font-family': MONO, 'font-size': 11, fill: INK45 }, group);
  }

  /* ---------- ③ RERANK：刻度表盘（镜像 16:9，本页视觉重心） ---------- */
  function drawRerankIcon(cx, cy, group) {
    var r = 55;
    el('circle', { id: 'i1-focus-dial', cx: cx, cy: cy, r: r, fill: PANEL, stroke: INK80, 'stroke-width': 1.4 }, group);
    el('circle', { cx: cx, cy: cy, r: r - 5, fill: 'none', stroke: INK, 'stroke-width': .6, opacity: .35 }, group);
    for (var a = 0; a < 360; a += 12) {
      var major = (a % 60 === 0);
      var r1 = major ? r - 14 : r - 9, r2 = r - 4;
      var rad = a * Math.PI / 180;
      line(cx + Math.cos(rad) * r1, cy + Math.sin(rad) * r1, cx + Math.cos(rad) * r2, cy + Math.sin(rad) * r2,
        { stroke: INK, 'stroke-width': major ? 1 : .5, opacity: major ? .7 : .45 }, group);
    }
    var needleAngle = -42 * Math.PI / 180;
    line(cx, cy, cx + Math.cos(needleAngle) * 34, cy + Math.sin(needleAngle) * 34, {
      id: 'i1-focus-needle', stroke: INK, 'stroke-width': 1.4
    }, group);
    el('circle', { cx: cx, cy: cy, r: 2.2, fill: INK }, group);
    el('circle', { cx: cx, cy: cy, r: 5, fill: 'none', stroke: INK, 'stroke-width': .7, opacity: .6 }, group);
    text('312 DOCS', cx, cy + r - 19, {
      id: 'i1-focus-count', 'font-family': MONO, 'font-size': 9, 'letter-spacing': 1.2,
      'text-anchor': 'middle', fill: INK45
    }, group);
  }

  /* ---------- ④ GENERATE：芯片组（镜像 16:9） ---------- */
  function drawGenerateIcon(cx, cy, group) {
    var s = 94, x = cx - s / 2, y = cy - s / 2;
    for (var pin = 0; pin < 5; pin++) {
      var off = 11 + pin * 18;
      line(x + off, y - 10, x + off, y, { stroke: INK80, 'stroke-width': 1.1 }, group);
      line(x + off, y + s, x + off, y + s + 10, { stroke: INK80, 'stroke-width': 1.1 }, group);
      line(x - 10, y + off, x, y + off, { stroke: INK80, 'stroke-width': 1.1 }, group);
      line(x + s, y + off, x + s + 10, y + off, { stroke: INK80, 'stroke-width': 1.1 }, group);
    }
    el('rect', { x: x, y: y, width: s, height: s, fill: PANEL, stroke: INK80, 'stroke-width': 1.3 }, group);
    el('rect', { x: x + 6, y: y + 6, width: s - 12, height: s - 12, fill: 'none', stroke: INK, 'stroke-width': .6, opacity: .35 }, group);
    el('circle', { cx: cx, cy: cy, r: 15, fill: 'none', stroke: INK80, 'stroke-width': 1.2 }, group);
    el('circle', { cx: cx, cy: cy, r: 10, fill: 'none', stroke: INK, 'stroke-width': .6, opacity: .45 }, group);
    el('circle', { cx: cx, cy: cy, r: 2, fill: INK }, group);
    text('RAG-V1', cx, y + s - 10, { 'font-family': MONO, 'font-size': 9, 'letter-spacing': 1.2, 'text-anchor': 'middle', fill: INK45 }, group);
  }

  function drawStage(item, stageIndex) {
    var centerY = CENTERS[stageIndex];
    var group = el('g', {
      'data-layout-zone': 'i1.stage-' + (stageIndex + 1),
      'data-slot-id': 'stage-' + (stageIndex + 1)
    });
    line(AXIS_X + 22, centerY, CARD_X, centerY, { stroke: INK70, 'stroke-width': item.focus ? 1.5 : .9 }, group);
    el('circle', {
      id: item.focus ? 'i1-focus-rerank-node' : '',
      cx: AXIS_X, cy: centerY, r: item.focus ? 18 : 13,
      fill: PANEL, stroke: INK80, 'stroke-width': item.focus ? 1.7 : 1.1
    }, group);
    el('circle', { cx: AXIS_X, cy: centerY, r: 4, fill: INK80 }, group);
    text(('0' + (stageIndex + 1)).slice(-2), CARD_X + 22, centerY - 51, {
      'font-family': MONO, 'font-size': 13, 'letter-spacing': 1.4, fill: INK45
    }, group);
    item.icon(ICON_X, centerY, group);
    text(item.english, TEXT_X, centerY - 29, Object.assign({
      'font-family': MONO, 'font-size': 26, 'font-weight': 400, 'letter-spacing': 2.4
    }, item.focus ? { id: 'i1-focus-rerank-label' } : {}), group);
    text(item.chinese, TEXT_X, centerY + 11, {
      'font-size': 28, 'font-weight': 400
    }, group);
    text(item.note, TEXT_X, centerY + 49, {
      'font-family': item.mono ? MONO : SANS, 'font-size': item.mono ? 14 : 18,
      'letter-spacing': item.mono ? 1.2 : 0, fill: INK70
    }, group);
  }

  function defineSpanHatch() {
    var defs = el('defs', {});
    var pattern = el('pattern', { id: 'i1-span-hatch', width: 7, height: 7, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)' }, defs);
    line(0, 0, 0, 7, { stroke: INK45, 'stroke-width': .7, opacity: .5 }, pattern);
  }

  function drawI1() {
    defineSpanHatch();
    text('RAG 检索流水线', 90, 220, { 'font-family': SERIF, 'font-size': 52, 'font-weight': 500 });
    text('四个站位共用一条流程尺；从原始问题向下收敛到生成上下文。', 90, 274, { 'font-size': 23, fill: INK70 });
    text('INPUT', AXIS_X, 320, { 'font-family': MONO, 'font-size': 11, 'letter-spacing': 1.8, 'text-anchor': 'middle', fill: INK45 });
    drawRuler();
    [
      { english: 'QUERY', chinese: '查询改写', note: '原始问题 · 意图归一', icon: drawQueryIcon, focus: false },
      { english: 'RETRIEVE', chinese: '向量召回', note: '多路候选 · 时间窗检索', icon: drawRetrieveIcon, focus: false },
      { english: 'RERANK', chinese: '重排过滤', note: '312 DOCS · 相关性排序', icon: drawRerankIcon, focus: true, mono: true },
      { english: 'GENERATE', chinese: '生成下发', note: 'DOCS → LLM · NO.0512', icon: drawGenerateIcon, focus: false, mono: true }
    ].forEach(drawStage);
    text('CONTEXT', AXIS_X, 1180, { 'font-family': MONO, 'font-size': 11, 'letter-spacing': 1.8, 'text-anchor': 'middle', fill: INK45 });
  }

  drawI1();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
