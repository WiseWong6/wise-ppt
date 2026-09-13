(function () {
  'use strict';

  var svg = document.querySelector('.scene');
  var NS = 'http://www.w3.org/2000/svg';
  var INK = 'var(--ink)';
  var INK70 = 'var(--ink-70)';
  var INK45 = 'var(--ink-45)';
  var FUNCTIONAL = 'var(--wp-color-functional)';
  var SANS = 'var(--sans)';
  var MONO = 'var(--mono)';
  var SERIF = 'var(--serif)';
  var RING_CX = 540;
  var RING_CY = 524;
  var RING_RADIUS = 132;
  var CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
  var ROW_TOP = 790;
  var ROW_HEIGHT = 84;
  var PARTS = [
    { index: '01', name: '人工标注', percent: 26, evidence: '双人复核 1,260 条 · 一致率 0.91', stroke: FUNCTIONAL },
    { index: '02', name: '模型调用', percent: 20, evidence: '3 个模型交叉判分 · 失败重试 2.7%', stroke: 'color-mix(in srgb, var(--wp-color-functional) 65%, transparent)' },
    { index: '03', name: '工具回放', percent: 16, evidence: 'Trace 采样 640 条 · 缺失轨迹 18 条', stroke: 'url(#q2-hatch)' },
    { index: '04', name: '平台与治理', percent: 38, evidence: '环境、审计与版本留档 · 固定投入占主导', stroke: 'color-mix(in srgb, var(--wp-color-functional) 32%, transparent)' }
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
      x1: x1, y1: y1, x2: x2, y2: y2, stroke: INK, 'stroke-width': 1
    }, attrs || {}), parent);
  }

  function drawDefs() {
    var defs = el('defs', {});
    var hatch = el('pattern', {
      id: 'q2-hatch', width: 8, height: 8,
      patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)'
    }, defs);
    line(0, 0, 0, 8, { stroke: INK, 'stroke-width': .7, opacity: .32 }, hatch);
  }

  function drawSectionLabel() {
    var group = el('g', { 'data-layout-zone': 'q2.section', 'data-slot-id': 'section-label' });
    text('01 / WHOLE → PARTS', 90, 309, {
      'font-family': MONO, 'font-size': 11, 'letter-spacing': 1.8, fill: INK45
    }, group);
    line(340, 305, 990, 305, { stroke: INK45, 'stroke-width': .65 }, group);
    text('TOTAL 100% · 4 EVIDENCE ROWS', 990, 309, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.15,
      'text-anchor': 'end', fill: INK45
    }, group);
  }

  function drawWholePanel() {
    var group = el('g', {
      'data-layout-zone': 'q2.whole',
      'data-slot-id': 'monthly-evaluation-total',
      'data-component-id': 'native.paper-ink.containment.segmented-whole-ring',
      'data-fixed-quantity': '1'
    });
    text('WHOLE / 100%', 540, 361, {
      'font-family': MONO, 'font-size': 10, 'letter-spacing': 2,
      'text-anchor': 'middle', fill: INK45
    }, group);
    el('circle', {
      cx: RING_CX, cy: RING_CY, r: 177,
      fill: 'none', stroke: INK45, 'stroke-width': .55,
      'stroke-dasharray': '2 7', opacity: .62
    }, group);
    el('circle', {
      cx: RING_CX, cy: RING_CY, r: RING_RADIUS,
      fill: 'none', stroke: 'var(--ink-12)', 'stroke-width': 68
    }, group);
    var cumulative = 0;
    PARTS.forEach(function (part) {
      var segmentLength = CIRCUMFERENCE * part.percent / 100;
      el('circle', {
        cx: RING_CX, cy: RING_CY, r: RING_RADIUS,
        fill: 'none', stroke: part.stroke, 'stroke-width': 68,
        'stroke-dasharray': segmentLength.toFixed(2) + ' ' + (CIRCUMFERENCE - segmentLength).toFixed(2),
        'stroke-dashoffset': (-CIRCUMFERENCE * cumulative / 100).toFixed(2),
        transform: 'rotate(-90 ' + RING_CX + ' ' + RING_CY + ')',
        'data-repeat-unit': 'whole-segment',
        'data-part-index': part.index,
        'data-percent': String(part.percent)
      }, group);
      cumulative += part.percent;
    });
    text('MONTHLY', 540, 488, {
      id: 'q2-focus-period', 'font-family': MONO, 'font-size': 11,
      'letter-spacing': 1.8, 'text-anchor': 'middle', fill: INK45
    }, group);
    text('¥ 84.6K', 540, 543, {
      id: 'q2-focus-total', 'font-size': 47,
      'font-weight': 400, 'text-anchor': 'middle'
    }, group);
    text('评测总投入', 540, 578, {
      id: 'q2-focus-label', 'font-size': 16,
      'text-anchor': 'middle', fill: INK70
    }, group);
  }

  function drawEvidenceHeader() {
    var group = el('g', {
      'data-layout-zone': 'q2.evidence-header', 'data-slot-id': 'evidence-header'
    });
    text('02 / PARTS & EVIDENCE', 90, 753, {
      'font-family': MONO, 'font-size': 10.5, 'letter-spacing': 1.65, fill: INK45
    }, group);
    line(360, 749, 990, 749, { stroke: INK45, 'stroke-width': .6 }, group);
    text('SHARE', 990, 753, {
      'font-family': MONO, 'font-size': 9, 'letter-spacing': 1.5,
      'text-anchor': 'end', fill: INK45
    }, group);
  }

  function drawEvidenceRow(part, partIndex, parent) {
    var y = ROW_TOP + partIndex * ROW_HEIGHT;
    var group = el('g', {
      'data-layout-zone': 'q2.evidence-row-' + part.index,
      'data-slot-id': 'part-evidence-row',
      'data-repeat-unit': 'part-evidence',
      'data-part-index': part.index,
      'data-percent': String(part.percent)
    }, parent);
    if (partIndex > 0) {
      line(90, y, 990, y, { stroke: INK45, 'stroke-width': .55 }, group);
    }
    el('rect', {
      x: 112, y: y + 26, width: 26, height: 26,
      fill: 'none', stroke: part.stroke, 'stroke-width': 8
    }, group);
    text(part.index, 166, y + 30, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.4, fill: INK45
    }, group);
    text(part.name, 166, y + 57, { 'font-size': 18, 'font-weight': 400 }, group);
    text(part.evidence, 350, y + 49, { 'font-size': 13.5, fill: INK70 }, group);
    text(part.percent + '%', 950, y + 51, {
      'font-family': MONO, 'font-size': 22, 'text-anchor': 'end'
    }, group);
  }

  function drawEvidenceRows() {
    var group = el('g', {
      'data-layout-zone': 'q2.evidence-rows',
      'data-slot-id': 'four-part-evidence-rows',
      'data-fixed-quantity': '4',
      'data-allocation-sum': '100'
    });
    PARTS.forEach(function (part, partIndex) { drawEvidenceRow(part, partIndex, group); });
  }

  function drawReadingGuide() {
    var group = el('g', {
      'data-layout-zone': 'q2.reading-guide', 'data-slot-id': 'part-whole-reading-guide'
    });
    line(90, 1156, 990, 1156, { stroke: INK45, 'stroke-width': .6 }, group);
    text('READ TOTAL → MATCH SEGMENT → VERIFY EVIDENCE', 90, 1186, {
      'font-family': MONO, 'font-size': 9, 'letter-spacing': 1.15, fill: INK45
    }, group);
    text('四项占比合计 100%', 990, 1186, {
      'font-size': 12, 'text-anchor': 'end', fill: INK45
    }, group);
  }

  function drawQ2() {
    drawDefs();
    text('评测总投入，由四项成本共同构成', 90, 214, {
      'font-family': SERIF, 'font-size': 44, 'font-weight': 500
    });
    text('先看整体占比，再用每一项的过程证据核对可信度。', 90, 266, {
      'font-size': 19, fill: INK70
    });
    drawSectionLabel();
    drawWholePanel();
    drawEvidenceHeader();
    drawEvidenceRows();
    drawReadingGuide();
  }

  drawQ2();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
