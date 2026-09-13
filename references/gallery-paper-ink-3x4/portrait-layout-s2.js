(function () {
  'use strict';

  var svg = document.querySelector('.scene');
  var NS = 'http://www.w3.org/2000/svg';
  var INK = 'var(--ink)';
  var INK70 = 'var(--ink-70)';
  var INK55 = 'var(--ink-55)';
  var INK45 = 'var(--ink-45)';
  var FUNCTIONAL = 'var(--wp-color-functional)';
  var SANS = 'var(--sans)';
  var MONO = 'var(--mono)';
  var SERIF = 'var(--serif)';
  var RING_CX = 540;
  var RING_CY = 522;
  var RING_RADIUS = 130;
  var CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
  var GROUPS = [
    {
      key: 'variable', en: 'VARIABLE', cn: '可变成本', percent: 62,
      x: 90, stroke: INK,
      items: [
        { index: '01', name: '人工标注', percent: 26, evidence: '双人复核 1,260 条 · 一致率 0.91' },
        { index: '02', name: '模型调用与回放', percent: 36, evidence: '交叉判分 + Trace 采样 640 条' }
      ]
    },
    {
      key: 'fixed', en: 'FIXED', cn: '固定投入', percent: 38,
      x: 555, stroke: 'url(#s2-hatch)',
      items: [
        { index: '03', name: '平台与治理', percent: 24, evidence: '环境、审计与版本留档 · 按月摊销' },
        { index: '04', name: '工具回放底座', percent: 14, evidence: 'Trace 采样 640 条 · 缺失轨迹 18 条' }
      ]
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
      x1: x1, y1: y1, x2: x2, y2: y2, stroke: INK, 'stroke-width': 1
    }, attrs || {}), parent);
  }

  function drawDefs() {
    var defs = el('defs', {});
    var hatch = el('pattern', {
      id: 's2-hatch', width: 8, height: 8,
      patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)'
    }, defs);
    line(0, 0, 0, 8, { stroke: INK, 'stroke-width': .7, opacity: .32 }, hatch);
  }

  function drawSectionLabel() {
    var group = el('g', { 'data-layout-zone': 's2.section', 'data-slot-id': 'section-label' });
    text('01 / WHOLE → TWO COST TYPES', 90, 309, {
      'font-family': MONO, 'font-size': 11, 'letter-spacing': 1.65, fill: INK45
    }, group);
    line(423, 305, 990, 305, { stroke: INK45, 'stroke-width': .65 }, group);
    text('62% VARIABLE · 38% FIXED', 990, 309, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.1,
      'text-anchor': 'end', fill: INK45
    }, group);
  }

  function drawWholePanel() {
    var group = el('g', {
      'data-layout-zone': 's2.whole',
      'data-slot-id': 'whole',
      'data-anchor-id': 's2.whole',
      'data-component-id': 'native.paper-ink.containment.two-part-whole-ring',
      'data-fixed-quantity': '2',
      'data-allocation-sum': '100'
    });
    text('WHOLE / 100%', 540, 360, {
      'font-family': MONO, 'font-size': 10, 'letter-spacing': 2,
      'text-anchor': 'middle', fill: INK45
    }, group);
    el('circle', {
      cx: RING_CX, cy: RING_CY, r: 178,
      fill: 'none', stroke: INK45, 'stroke-width': .55,
      'stroke-dasharray': '2 7', opacity: .62
    }, group);
    el('circle', {
      cx: RING_CX, cy: RING_CY, r: RING_RADIUS,
      fill: 'none', stroke: 'var(--ink-12)', 'stroke-width': 68
    }, group);
    var variableLength = CIRCUMFERENCE * .62;
    el('circle', {
      cx: RING_CX, cy: RING_CY, r: RING_RADIUS,
      fill: 'none', stroke: FUNCTIONAL, 'stroke-width': 68,
      'stroke-dasharray': variableLength.toFixed(2) + ' ' + (CIRCUMFERENCE - variableLength).toFixed(2),
      transform: 'rotate(-90 ' + RING_CX + ' ' + RING_CY + ')',
      'data-repeat-unit': 'cost-type-segment',
      'data-cost-type': 'variable',
      'data-percent': '62'
    }, group);
    el('circle', {
      cx: RING_CX, cy: RING_CY, r: RING_RADIUS,
      fill: 'none', stroke: 'url(#s2-hatch)', 'stroke-width': 68,
      'stroke-dasharray': (CIRCUMFERENCE - variableLength).toFixed(2) + ' ' + variableLength.toFixed(2),
      'stroke-dashoffset': (-variableLength).toFixed(2),
      transform: 'rotate(-90 ' + RING_CX + ' ' + RING_CY + ')',
      'data-repeat-unit': 'cost-type-segment',
      'data-cost-type': 'fixed',
      'data-percent': '38'
    }, group);
    text('MONTHLY', 540, 486, {
      id: 's2-focus-period', 'font-family': MONO, 'font-size': 11,
      'letter-spacing': 1.8, 'text-anchor': 'middle', fill: INK45
    }, group);
    text('¥ 84.6K', 540, 541, {
      id: 's2-focus-value', 'font-size': 47, 'font-weight': 400,
      'text-anchor': 'middle'
    }, group);
    text('评测总投入', 540, 576, {
      id: 's2-focus-label', 'font-size': 16,
      'text-anchor': 'middle', fill: INK70
    }, group);
    text('可变 62% · 固定 38%', 540, 716, {
      'font-size': 14, 'text-anchor': 'middle', fill: FUNCTIONAL
    }, group);
  }

  function drawEvidenceItem(item, itemIndex, costGroup, parent) {
    var rowTop = 858 + itemIndex * 110;
    var x = costGroup.x;
    var group = el('g', {
      'data-layout-zone': 's2.evidence-item-' + item.index,
      'data-slot-id': 'evidence-item',
      'data-repeat-unit': 'cost-evidence',
      'data-evidence-index': item.index,
      'data-percent': String(item.percent)
    }, parent);
    if (itemIndex > 0) {
      line(x, rowTop, x + 435, rowTop, { stroke: INK45, 'stroke-width': .5 }, group);
    }
    text(item.index, x, rowTop + 28, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.4, fill: INK45
    }, group);
    text(item.percent + '%', x + 435, rowTop + 30, {
      'font-family': MONO, 'font-size': 19, 'text-anchor': 'end', fill: FUNCTIONAL
    }, group);
    text(item.name, x, rowTop + 59, { 'font-size': 18, 'font-weight': 400 }, group);
    text(item.evidence, x, rowTop + 87, { 'font-size': 12.5, fill: INK70 }, group);
  }

  function drawEvidencePanel(costGroup) {
    var x = costGroup.x;
    var group = el('g', {
      'data-layout-zone': 's2.' + costGroup.key + '-evidence',
      'data-slot-id': costGroup.key === 'variable' ? 'left' : 'right',
      'data-anchor-id': 's2.' + costGroup.key,
      'data-component-id': 'native.paper-ink.semantic.evidence-column',
      'data-repeat-unit': 'cost-type-evidence-column',
      'data-cost-type': costGroup.key,
      'data-percent': String(costGroup.percent),
      'data-fixed-quantity': '2'
    });
    el('rect', {
      x: x, y: 778, width: 30, height: 30,
      fill: 'none', stroke: costGroup.stroke, 'stroke-width': 9
    }, group);
    text(costGroup.en + ' / ' + costGroup.percent + '%', x + 52, 788, {
      'font-family': MONO, 'font-size': 10, 'letter-spacing': 1.35, fill: INK45
    }, group);
    text(costGroup.cn, x + 52, 822, {
      'font-size': 21, 'font-weight': 400
    }, group);
    costGroup.items.forEach(function (item, itemIndex) {
      drawEvidenceItem(item, itemIndex, costGroup, group);
    });
  }

  function drawReadingGuide() {
    var group = el('g', {
      'data-layout-zone': 's2.reading-guide', 'data-slot-id': 'containment-reading-guide'
    });
    line(90, 1110, 990, 1110, { stroke: INK45, 'stroke-width': .6 }, group);
    text('READ TOTAL → COST TYPE → TWO EVIDENCE ITEMS', 90, 1140, {
      'font-family': MONO, 'font-size': 9, 'letter-spacing': 1.1, fill: INK45
    }, group);
    text('62 = 26 + 36 · 38 = 24 + 14', 990, 1140, {
      'font-family': MONO, 'font-size': 9.5, 'text-anchor': 'end', fill: INK45
    }, group);
  }

  function drawS2() {
    drawDefs();
    text('评测投入，先分可变成本与固定投入', 90, 214, {
      'font-family': SERIF, 'font-size': 43, 'font-weight': 500
    });
    text('两类成本各自包含两条分项证据，合计回到每月总投入。', 90, 266, {
      'font-size': 19, fill: INK70
    });
    drawSectionLabel();
    drawWholePanel();
    GROUPS.forEach(drawEvidencePanel);
    drawReadingGuide();
  }

  drawS2();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
