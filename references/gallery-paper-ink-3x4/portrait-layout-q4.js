(function () {
  'use strict';

  var svg = document.querySelector('.scene');
  var NS = 'http://www.w3.org/2000/svg';
  var INK = 'var(--ink)';
  var INK80 = 'var(--ink-80)';
  var INK70 = 'var(--ink-70)';
  var INK55 = 'var(--ink-55)';
  var INK45 = 'var(--ink-45)';
  var FUNCTIONAL = 'var(--wp-color-functional)';
  var PAPER = 'var(--paper)';
  var PANEL = 'var(--paper-panel)';
  var SANS = 'var(--sans)';
  var MONO = 'var(--mono)';
  var SERIF = 'var(--serif)';
  var QUADRANTS = [
    {
      index: 'Q1', code: 'ANSWER · CONTENT OUTPUT', title: '最终回答',
      primary: '主张句完整，引用位置可定位', secondary: '结论没有超出证据边界',
      side: 'content', level: 'output', icon: 'answer', x: 110, y: 368
    },
    {
      index: 'Q2', code: 'RECEIPT · SYSTEM OUTPUT', title: '校验收据',
      primary: '内容、结构、引用三项门禁通过', secondary: '失败项为 0，生成时间已留档',
      side: 'system', level: 'output', icon: 'receipt', x: 570, y: 368
    },
    {
      index: 'Q3', code: 'RETRIEVAL · CONTENT TRACE', title: '检索证据',
      primary: '命中文档 6 / 8，关键段落均覆盖', secondary: '版本、权限与有效期均已核对',
      side: 'content', level: 'trace', icon: 'document', x: 110, y: 842
    },
    {
      index: 'Q4', code: 'TOOL TRACE · SYSTEM TRACE', title: '工具轨迹',
      primary: '路由、参数、返回值均可重放', secondary: '无隐藏重试，也没有越权调用',
      side: 'system', level: 'trace', icon: 'trace', x: 570, y: 842
    }
  ];

  function el(tag, attrs, parent) {
    var node = document.createElementNS(NS, tag);
    Object.keys(attrs || {}).forEach(function (key) { node.setAttribute(key, attrs[key]); });
    (parent || svg).appendChild(node);
    return node;
  }

  function text(value, x, y, attrs, parent) {
    var node = el('text', Object.assign({
      x: x, y: y, fill: INK, 'font-family': SANS, 'font-weight': 300
    }, attrs || {}), parent);
    node.textContent = value;
    return node;
  }

  function line(x1, y1, x2, y2, attrs, parent) {
    return el('line', Object.assign({
      x1: x1, y1: y1, x2: x2, y2: y2,
      stroke: INK, 'stroke-width': 1
    }, attrs || {}), parent);
  }

  function drawSectionLabel() {
    var group = el('g', { 'data-layout-zone': 'q4.section', 'data-slot-id': 'section-label' });
    text('01 / ANSWER ACCEPTANCE MAP', 90, 309, {
      'font-family': MONO, 'font-size': 11, 'letter-spacing': 1.8, fill: INK45
    }, group);
    line(382, 305, 990, 305, { stroke: INK45, 'stroke-width': .65 }, group);
    text('CONTENT ↔ SYSTEM · OUTPUT ↕ TRACE', 990, 309, {
      'font-family': MONO, 'font-size': 9.2, 'letter-spacing': 1.05,
      'text-anchor': 'end', fill: INK45
    }, group);
  }

  function drawAxisTag(code, label, x, y, anchor, parent) {
    var group = el('g', { 'data-layout-zone': 'q4.axis-' + code.toLowerCase() }, parent);
    text(code, x, y, Object.assign({
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.6,
      'text-anchor': anchor, fill: INK45
    }, code === 'OUTPUT' ? { id: 'q4-focus-output' } : {}), group);
    text(label, x, y + 22, {
      'font-size': 12.5, 'text-anchor': anchor, fill: INK55
    }, group);
  }

  function drawAxes() {
    var group = el('g', {
      'data-layout-zone': 'q4.axes',
      'data-slot-id': 'content-system-output-trace-axes',
      'data-horizontal-axis': 'content-to-system',
      'data-vertical-axis': 'trace-to-output'
    });
    line(540, 360, 540, 1150, { stroke: INK, opacity: .72, 'stroke-width': 1.05 }, group);
    el('path', {
      d: 'M 540 360 L 532 376 M 540 360 L 548 376',
      fill: 'none', stroke: INK, opacity: .72, 'stroke-width': 1.05
    }, group);
    line(90, 755, 990, 755, { stroke: INK, opacity: .72, 'stroke-width': 1.05 }, group);
    el('path', {
      d: 'M 990 755 L 974 747 M 990 755 L 974 763',
      fill: 'none', stroke: INK, opacity: .72, 'stroke-width': 1.05
    }, group);
    el('circle', { cx: 540, cy: 755, r: 3, fill: INK }, group);
    drawAxisTag('OUTPUT', '最终产物 ↑', 540, 342, 'middle', group);
    drawAxisTag('TRACE', '过程证据 ↓', 540, 1174, 'middle', group);
    drawAxisTag('CONTENT', '内容侧 ←', 104, 743, 'start', group);
    drawAxisTag('SYSTEM', '系统侧 →', 976, 743, 'end', group);
  }

  function drawAnswerIcon(x, y, parent) {
    el('rect', { x: x, y: y, width: 70, height: 54, fill: 'none', stroke: INK45, 'stroke-width': 1 }, parent);
    line(x + 14, y + 17, x + 55, y + 17, { stroke: INK45, 'stroke-width': .8 }, parent);
    line(x + 14, y + 31, x + 47, y + 31, { stroke: INK45, 'stroke-width': .8 }, parent);
    line(x + 14, y + 43, x + 39, y + 43, { stroke: INK45, 'stroke-width': .8 }, parent);
  }

  function drawReceiptIcon(x, y, parent) {
    el('circle', { cx: x + 34, cy: y + 29, r: 29, fill: 'none', stroke: INK45, 'stroke-width': 1 }, parent);
    el('path', { d: 'M ' + (x + 19) + ' ' + (y + 29) + ' L ' + (x + 31) + ' ' + (y + 40) + ' L ' + (x + 52) + ' ' + (y + 14), fill: 'none', stroke: INK55, 'stroke-width': 1.5 }, parent);
  }

  function drawDocumentIcon(x, y, parent) {
    el('rect', { x: x, y: y, width: 70, height: 54, fill: 'none', stroke: INK45, 'stroke-width': 1 }, parent);
    line(x + 13, y + 15, x + 57, y + 15, { stroke: INK45, 'stroke-width': .75 }, parent);
    line(x + 13, y + 28, x + 49, y + 28, { stroke: INK45, 'stroke-width': .75 }, parent);
    line(x + 13, y + 41, x + 54, y + 41, { stroke: INK45, 'stroke-width': .75 }, parent);
  }

  function drawTraceIcon(x, y, parent) {
    var nodes = [[x + 4, y + 29], [x + 37, y + 5], [x + 68, y + 36]];
    line(nodes[0][0] + 5, nodes[0][1] - 4, nodes[1][0] - 5, nodes[1][1] + 4, { stroke: INK45, 'stroke-width': .9 }, parent);
    line(nodes[1][0] + 5, nodes[1][1] + 5, nodes[2][0] - 5, nodes[2][1] - 5, { stroke: INK45, 'stroke-width': .9 }, parent);
    nodes.forEach(function (node) { el('circle', { cx: node[0], cy: node[1], r: 6, fill: PANEL, stroke: INK55, 'stroke-width': 1 }, parent); });
  }

  function drawEvidenceIcon(kind, x, y, parent) {
    if (kind === 'answer') drawAnswerIcon(x, y, parent);
    if (kind === 'receipt') drawReceiptIcon(x, y, parent);
    if (kind === 'document') drawDocumentIcon(x, y, parent);
    if (kind === 'trace') drawTraceIcon(x, y, parent);
  }

  function drawEvidencePanel(item, panelIndex, parent) {
    var group = el('g', {
      'data-layout-zone': 'q4.evidence-' + (panelIndex + 1),
      'data-slot-id': 'evidence-' + String.fromCharCode(97 + panelIndex),
      'data-component-id': 'native.paper-ink.semantic.evidence-panel',
      'data-repeat-unit': 'evidence-quadrant',
      'data-evidence-side': item.side,
      'data-evidence-level': item.level
    }, parent);
    text(item.index, item.x + 20, item.y + 72, {
      'font-family': MONO, 'font-size': 46, 'letter-spacing': 2.5,
      fill: FUNCTIONAL, opacity: .4
    }, group);
    text(item.code, item.x + 20, item.y + 106, {
      'font-family': MONO, 'font-size': 9.2, 'letter-spacing': 1.3, fill: INK45
    }, group);
    line(item.x + 20, item.y + 124, item.x + 84, item.y + 124, {
      'data-q4-quadrant-rule': 'true', 'data-evidence-index': String(panelIndex + 1),
      stroke: FUNCTIONAL, 'stroke-width': 2
    }, group);
    text(item.title, item.x + 20, item.y + 192, { 'data-xp-anchor': 'quadrant',
      'font-size': 25, 'font-weight': 300
    }, group);
    text(item.primary, item.x + 20, item.y + 250, {
      'font-size': 14.5, fill: INK70
    }, group);
    text(item.secondary, item.x + 20, item.y + 286, {
      'font-size': 13.5, fill: INK55
    }, group);
    drawEvidenceIcon(item.icon, item.x + 300, item.y + 152, group);
  }

  function drawEvidenceGrid() {
    var group = el('g', {
      'data-layout-zone': 'q4.evidence-grid',
      'data-slot-id': 'four-evidence-quadrants',
      'data-fixed-quantity': '4',
      'data-grid-columns': '2',
      'data-grid-rows': '2'
    });
    QUADRANTS.forEach(function (item, panelIndex) { drawEvidencePanel(item, panelIndex, group); });
  }

  function drawReadingGuide() {
    var group = el('g', {
      'data-layout-zone': 'q4.reading-guide',
      'data-slot-id': 'matrix-reading-guide'
    });
    line(90, 1212, 990, 1212, { stroke: INK45, 'stroke-width': .6 }, group);
    text('READ BY POSITION · NOT BY SEQUENCE', 90, 1241, {
      'font-family': MONO, 'font-size': 9.2, 'letter-spacing': 1.35, fill: INK45
    }, group);
    text('4 / 4 EVIDENCE TYPES', 990, 1241, {
      'font-family': MONO, 'font-size': 9.2, 'letter-spacing': 1.35,
      'text-anchor': 'end', fill: INK45
    }, group);
  }

  function drawQ4() {
    text('可靠回答，要同时留下四类验收物', 90, 214, {
      'font-family': SERIF, 'font-size': 45, 'font-weight': 500
    });
    text('横向区分内容与系统，纵向区分最终产物与过程证据。', 90, 266, {
      'font-size': 19, fill: INK70
    });
    drawSectionLabel();
    drawAxes();
    drawEvidenceGrid();
    drawReadingGuide();
  }

  drawQ4();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
