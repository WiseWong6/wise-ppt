(function () {
  'use strict';

  var svg = document.querySelector('.scene');
  var NS = 'http://www.w3.org/2000/svg';
  var INK = 'var(--ink)';
  var INK80 = 'var(--ink-80)';
  var INK70 = 'var(--ink-70)';
  var INK55 = 'var(--ink-55)';
  var FUNCTIONAL = 'var(--wp-color-functional)';
  var INK45 = 'var(--ink-45)';
  var PAPER = 'var(--paper)';
  var PANEL = 'var(--paper-panel)';
  var SANS = 'var(--sans)';
  var MONO = 'var(--mono)';
  var SERIF = 'var(--serif)';
  var METRICS = [
    { value: '94.2%', label: '准确率', note: 'ACCURACY · 30D AVG', focus: true },
    { value: '1,284', label: '日均调用量（万）', note: 'DAILY CALLS · AVG' },
    { value: '3,200', label: '峰值 QPS', note: 'PEAK QPS · RPS' },
    { value: '280ms', label: '平均延迟', note: 'AVG LATENCY · P95' }
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

  function drawDefs() {
    var defs = el('defs', {});
    var pattern = el('pattern', {
      id: 'c1-hatch', width: 7, height: 7, patternUnits: 'userSpaceOnUse',
      patternTransform: 'rotate(45)'
    }, defs);
    line(0, 0, 0, 7, { stroke: INK, 'stroke-width': .7, opacity: .35 }, pattern);
  }

  function drawSectionLabel() {
    var group = el('g', { 'data-layout-zone': 'c1.section', 'data-slot-id': 'section-label' });
    text('01 / PRODUCT SPECIMEN + KPI PROOF', 90, 309, {
      'font-family': MONO, 'font-size': 11, 'letter-spacing': 1.8, fill: INK45
    }, group);
    line(412, 305, 990, 305, { stroke: INK45, 'stroke-width': .65 }, group);
    text('ONE OBJECT · FOUR SIGNALS', 990, 309, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.25,
      'text-anchor': 'end', fill: INK45
    }, group);
  }

  function drawSpecimenFrame(parent) {
    el('rect', {
      x: 90, y: 342, width: 900, height: 462,
      fill: PANEL, stroke: INK80, 'stroke-width': 1.1
    }, parent);
    el('rect', {
      x: 98, y: 350, width: 884, height: 446,
      fill: 'none', stroke: INK45, 'stroke-width': .55
    }, parent);
    el('rect', {
      x: 124, y: 326, width: 318, height: 34,
      fill: PAPER, stroke: INK, 'stroke-width': 1
    }, parent);
    text('SPECIMEN 01 — AI-AGENT M1', 283, 348, {
      'font-family': MONO, 'font-size': 10, 'letter-spacing': 1.6,
      'text-anchor': 'middle'
    }, parent);
    line(540, 370, 540, 764, {
      stroke: INK45, 'stroke-width': .5, 'stroke-dasharray': '2 6', opacity: .7
    }, parent);
    el('circle', {
      cx: 540, cy: 560, r: 184,
      fill: 'none', stroke: INK45, 'stroke-width': .55,
      'stroke-dasharray': '3 7', opacity: .55
    }, parent);
  }

  function drawShelf(parent) {
    var group = el('g', {
      'data-layout-zone': 'c1.specimen-shelf',
      'data-slot-id': 'warehouse-context'
    }, parent);
    line(824, 468, 824, 724, { stroke: INK70, 'stroke-width': 1 }, group);
    line(768, 508, 918, 508, { stroke: INK55, 'stroke-width': .8 }, group);
    line(768, 608, 918, 608, { stroke: INK55, 'stroke-width': .8 }, group);
    line(768, 708, 918, 708, { stroke: INK55, 'stroke-width': .8 }, group);
    el('rect', {
      x: 790, y: 476, width: 58, height: 30,
      fill: 'url(#c1-hatch)', stroke: INK55, 'stroke-width': .7
    }, group);
    el('rect', {
      x: 844, y: 574, width: 52, height: 32,
      fill: 'url(#c1-hatch)', stroke: INK55, 'stroke-width': .7
    }, group);
    el('rect', {
      x: 780, y: 675, width: 72, height: 31,
      fill: 'url(#c1-hatch)', stroke: INK55, 'stroke-width': .7
    }, group);
    text('WAREHOUSE / ZONE 03', 932, 724, {
      'font-family': MONO, 'font-size': 8.5, 'letter-spacing': 1.15,
      'text-anchor': 'end', fill: INK45
    }, group);
  }

  function drawRobot(parent) {
    var group = el('g', {
      'data-layout-zone': 'c1.product-illustration',
      'data-slot-id': 'ai-agent-m1',
      'data-fixed-quantity': '1',
      'data-repeat-unit': 'product-specimen'
    }, parent);
    line(208, 724, 918, 724, { stroke: INK80, 'stroke-width': 1.2 }, group);
    for (var tickX = 228; tickX <= 908; tickX += 40) {
      line(tickX, 724, tickX, 731, { stroke: INK45, 'stroke-width': .55 }, group);
    }

    [455, 625].forEach(function (cx) {
      el('circle', { cx: cx, cy: 694, r: 25, fill: PAPER, stroke: FUNCTIONAL, 'stroke-width': 1.2 }, group);
      el('circle', { cx: cx, cy: 694, r: 16, fill: 'none', stroke: INK55, 'stroke-width': .7 }, group);
      el('circle', { cx: cx, cy: 694, r: 2.5, fill: INK }, group);
    });
    el('rect', {
      x: 426, y: 662, width: 228, height: 13,
      fill: PAPER, stroke: INK80, 'stroke-width': 1
    }, group);
    el('rect', {
      x: 435, y: 490, width: 210, height: 172, rx: 12,
      fill: PAPER, stroke: INK80, 'stroke-width': 1.35
    }, group);
    el('rect', {
      x: 451, y: 506, width: 178, height: 140,
      fill: 'none', stroke: INK45, 'stroke-width': .55
    }, group);
    el('rect', {
      x: 451, y: 585, width: 92, height: 61,
      fill: 'url(#c1-hatch)', stroke: INK55, 'stroke-width': .7
    }, group);
    line(566, 535, 620, 535, { stroke: INK45, 'stroke-width': .65 }, group);
    line(566, 553, 620, 553, { stroke: INK45, 'stroke-width': .65 }, group);
    el('circle', { cx: 437, cy: 537, r: 9, fill: PAPER, stroke: FUNCTIONAL, 'stroke-width': 1 }, group);
    el('circle', { cx: 437, cy: 537, r: 2.5, fill: INK }, group);
    el('rect', {
      x: 429, y: 634, width: 222, height: 24, rx: 12,
      fill: 'none', stroke: INK70, 'stroke-width': 1
    }, group);
    el('rect', {
      x: 410, y: 473, width: 260, height: 17, rx: 4,
      fill: PAPER, stroke: INK80, 'stroke-width': 1.1
    }, group);
    el('rect', {
      x: 443, y: 418, width: 194, height: 55,
      fill: 'url(#c1-hatch)', stroke: INK80, 'stroke-width': 1.1
    }, group);
    line(465, 446, 615, 446, { stroke: INK45, 'stroke-width': .65 }, group);
    line(532, 418, 532, 394, { stroke: INK70, 'stroke-width': .9 }, group);
    line(548, 418, 548, 394, { stroke: INK70, 'stroke-width': .9 }, group);
    el('ellipse', { cx: 540, cy: 390, rx: 26, ry: 8, fill: PAPER, stroke: INK80, 'stroke-width': 1 }, group);
    el('ellipse', { cx: 540, cy: 379, rx: 26, ry: 8, fill: 'none', stroke: INK55, 'stroke-width': .7 }, group);
    line(514, 379, 514, 390, { stroke: INK55, 'stroke-width': .7 }, group);
    line(566, 379, 566, 390, { stroke: INK55, 'stroke-width': .7 }, group);
    text('AI-AGENT', 540, 567, {
      'font-family': MONO, 'font-size': 10, 'letter-spacing': 2,
      'text-anchor': 'middle', fill: INK45
    }, group);
    text('M1', 540, 612, {
      'font-family': MONO, 'font-size': 29, 'letter-spacing': 3,
      'text-anchor': 'middle'
    }, group);
  }

  function drawDimensions(parent) {
    var group = el('g', {
      'data-layout-zone': 'c1.product-dimensions',
      'data-slot-id': 'technical-dimensions',
      'data-fixed-quantity': '2'
    }, parent);
    line(378, 379, 378, 718, { stroke: INK55, 'stroke-width': .6, 'stroke-dasharray': '3 5' }, group);
    line(369, 379, 387, 379, { stroke: INK70, 'stroke-width': .85 }, group);
    line(369, 718, 387, 718, { stroke: INK70, 'stroke-width': .85 }, group);
    text('940 MM', 364, 551, {
      'font-family': MONO, 'font-size': 10, 'letter-spacing': 1.15,
      'text-anchor': 'middle', fill: INK55, transform: 'rotate(-90 364 551)'
    }, group);
    line(410, 762, 670, 762, { stroke: INK55, 'stroke-width': .6, 'stroke-dasharray': '3 5' }, group);
    line(410, 753, 410, 771, { stroke: INK70, 'stroke-width': .85 }, group);
    line(670, 753, 670, 771, { stroke: INK70, 'stroke-width': .85 }, group);
    text('655 MM', 540, 785, {
      'font-family': MONO, 'font-size': 10, 'letter-spacing': 1.15,
      'text-anchor': 'middle', fill: INK55
    }, group);
  }

  function drawIllustration() {
    var group = el('g', {
      'data-layout-zone': 'c1.specimen',
      'data-slot-id': 'product-specimen-panel'
    });
    drawSpecimenFrame(group);
    drawShelf(group);
    drawRobot(group);
    drawDimensions(group);
  }

  function drawMetric(item, metricIndex, parent) {
    var column = metricIndex % 2;
    var row = Math.floor(metricIndex / 2);
    var cx = column === 0 ? 315 : 765;
    var top = row === 0 ? 842 : 1015;
    var group = el('g', {
      'data-layout-zone': 'c1.metric-' + (metricIndex + 1),
      'data-slot-id': 'kpi-' + (metricIndex + 1),
      'data-repeat-unit': 'kpi',
      'data-kpi-label': item.label
    }, parent);
    text('0' + (metricIndex + 1), cx - 190, top + 31, {
      'font-family': MONO, 'font-size': 9, 'letter-spacing': 1.3, fill: INK45
    }, group);
    text(item.value, cx, top + 69, {
      id: item.focus ? 'sample-focus' : 'c1-value-' + (metricIndex + 1),
      'font-family': SERIF, 'font-size': 46, 'font-weight': 500,
      'text-anchor': 'middle'
    }, group);
    text(item.label, cx, top + 109, {
      id: item.focus ? 'c1-focus-label' : 'c1-label-' + (metricIndex + 1),
      'font-size': 17, 'font-weight': 300, 'text-anchor': 'middle', fill: INK70
    }, group);
    text(item.note, cx, top + 134, {
      id: item.focus ? 'c1-focus-note' : 'c1-note-' + (metricIndex + 1),
      'font-family': MONO, 'font-size': 9, 'letter-spacing': 1.25,
      'text-anchor': 'middle', fill: INK45
    }, group);
    line(cx - 30, top + 151, cx + 30, top + 151, {
      id: item.focus ? 'c1-focus-rule' : 'c1-rule-' + (metricIndex + 1),
      stroke: FUNCTIONAL, 'stroke-width': .7
    }, group);
  }

  function drawMetricsGrid() {
    var group = el('g', {
      'data-layout-zone': 'c1.kpi-grid',
      'data-slot-id': 'four-signal-grid',
      'data-fixed-quantity': '4'
    });
    line(540, 830, 540, 1176, { stroke: INK45, 'stroke-width': .55 }, group);
    line(90, 1003, 990, 1003, { stroke: INK45, 'stroke-width': .55 }, group);
    METRICS.forEach(function (item, metricIndex) { drawMetric(item, metricIndex, group); });
  }

  function drawReadingGuide() {
    var group = el('g', {
      'data-layout-zone': 'c1.reading-guide',
      'data-slot-id': 'evidence-reading-guide'
    });
    line(90, 1205, 990, 1205, { stroke: INK45, 'stroke-width': .6 }, group);
    text('PRODUCT → PERFORMANCE EVIDENCE', 90, 1234, {
      'font-family': MONO, 'font-size': 9.2, 'letter-spacing': 1.4, fill: INK45
    }, group);
    text('ACCURACY ≠ AVAILABILITY', 990, 1234, {
      'font-family': MONO, 'font-size': 9.2, 'letter-spacing': 1.4,
      'text-anchor': 'end', fill: INK45
    }, group);
  }

  function drawC1() {
    drawDefs();
    text('94.2% 准确率，只是可用性的起点', 90, 214, {
      'font-family': SERIF, 'font-size': 45, 'font-weight': 500
    });
    text('先看 AI-AGENT M1 产品标本，再用调用量、吞吐与延迟交叉判断。', 90, 266, {
      'font-size': 19, fill: INK70
    });
    drawSectionLabel();
    drawIllustration();
    drawMetricsGrid();
    drawReadingGuide();
  }

  drawC1();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
