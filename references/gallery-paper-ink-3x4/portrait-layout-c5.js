(function () {
  'use strict';

  var svg = document.querySelector('.scene');
  var NS = 'http://www.w3.org/2000/svg';
  var INK = 'var(--ink)';
  var INK80 = 'var(--ink-80)';
  var INK70 = 'var(--ink-70)';
  var INK45 = 'var(--ink-45)';
  var FUNCTIONAL = 'var(--wp-color-functional)';
  var PAPER = 'var(--paper)';
  var SANS = 'var(--sans)';
  var MONO = 'var(--mono)';
  var SERIF = 'var(--serif)';
  var ALLOCATIONS = [
    { index: '01', pct: .38, display: '38%', zh: '训练算力', en: 'TRAINING', money: '¥ 15.96M', cx: 310, cy: 692 },
    { index: '02', pct: .27, display: '27%', zh: '推理服务', en: 'INFERENCE', money: '¥ 11.34M', cx: 770, cy: 692 },
    { index: '03', pct: .21, display: '21%', zh: '数据存储', en: 'DATA STORAGE', money: '¥ 8.82M', cx: 310, cy: 1006 },
    { index: '04', pct: .14, display: '14%', zh: '人力研发', en: 'R&D STAFF', money: '¥ 5.88M', cx: 770, cy: 1006 }
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

  function pointOnCircle(cx, cy, radius, angle) {
    return {
      x: cx + Math.cos(angle) * radius,
      y: cy + Math.sin(angle) * radius
    };
  }

  function arcPath(cx, cy, radius, pct) {
    var startAngle = -Math.PI / 2;
    var endAngle = startAngle + pct * Math.PI * 2;
    var start = pointOnCircle(cx, cy, radius, startAngle);
    var end = pointOnCircle(cx, cy, radius, endAngle);
    return 'M ' + start.x.toFixed(2) + ' ' + start.y.toFixed(2) +
      ' A ' + radius + ' ' + radius + ' 0 ' + (pct > .5 ? 1 : 0) + ' 1 ' +
      end.x.toFixed(2) + ' ' + end.y.toFixed(2);
  }

  function drawSectionLabel() {
    var group = el('g', { 'data-layout-zone': 'c5.section', 'data-slot-id': 'section-label' });
    text('01 / BUDGET ALLOCATION', 90, 309, {
      'font-family': MONO, 'font-size': 11, 'letter-spacing': 1.8, fill: INK45
    }, group);
    line(352, 305, 990, 305, { stroke: INK45, 'stroke-width': .65 }, group);
    text('TOTAL → 4 PARTS', 990, 309, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.35,
      'text-anchor': 'end', fill: INK45
    }, group);
  }

  function drawTotal() {
    var group = el('g', {
      'data-layout-zone': 'c5.total-budget',
      'data-slot-id': 'annual-budget-total',
      'data-fixed-quantity': '1'
    });
    text('TOTAL COMPUTE BUDGET / FY2026', 540, 380, {
      'font-family': MONO, 'font-size': 10, 'letter-spacing': 2.2,
      'text-anchor': 'middle', fill: INK45
    }, group);
    line(126, 431, 232, 431, { 'data-xp-anchor': 'total-rule', stroke: FUNCTIONAL, 'stroke-width': 2 }, group);
    line(848, 431, 954, 431, { 'data-xp-anchor': 'total-rule', stroke: FUNCTIONAL, 'stroke-width': 2 }, group);
    el('circle', { cx: 116, cy: 431, r: 2.3, fill: INK45 }, group);
    el('circle', { cx: 964, cy: 431, r: 2.3, fill: INK45 }, group);
    text('¥ 42,000,000', 540, 454, {
      id: 'sample-focus', 'font-family': MONO, 'font-size': 62,
      'letter-spacing': 1.2, 'text-anchor': 'middle', fill: INK
    }, group);
    text('年度算力预算总额 · 下方四项合计 100%', 540, 492, {
      id: 'c5-focus-label', 'font-size': 16, 'text-anchor': 'middle', fill: INK70
    }, group);
  }

  function drawGridFrame() {
    var group = el('g', {
      'data-layout-zone': 'c5.allocation-grid',
      'data-slot-id': 'four-part-progress-grid',
      'data-fixed-quantity': '4',
      'data-allocation-sum': '100'
    });
    return group;
  }

  function drawTickRing(item, parent) {
    var tickGroup = el('g', {
      'data-layout-zone': 'c5.ticks-' + item.index,
      'data-slot-id': 'instrument-ticks'
    }, parent);
    el('circle', {
      cx: item.cx, cy: item.cy, r: 112,
      fill: 'none', stroke: INK45, 'stroke-width': .5,
      'stroke-dasharray': '2 6', opacity: .65
    }, tickGroup);
    for (var tickIndex = 0; tickIndex < 12; tickIndex += 1) {
      var angle = -Math.PI / 2 + tickIndex * Math.PI / 6;
      var major = tickIndex % 3 === 0;
      var inner = pointOnCircle(item.cx, item.cy, major ? 103 : 107, angle);
      var outer = pointOnCircle(item.cx, item.cy, 114, angle);
      line(inner.x, inner.y, outer.x, outer.y, {
        stroke: INK45, 'stroke-width': major ? 1 : .6
      }, tickGroup);
    }
  }

  function drawRing(item, ringIndex, parent) {
    var group = el('g', {
      'data-layout-zone': 'c5.ring-' + (ringIndex + 1),
      'data-slot-id': 'allocation-' + item.en.toLowerCase().replace(/[^a-z]+/g, '-'),
      'data-repeat-unit': 'progress-ring',
      'data-allocation-index': item.index,
      'data-allocation-percent': String(Math.round(item.pct * 100))
    }, parent);
    text(item.index, item.cx - 184, item.cy - 112, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.6, fill: INK45
    }, group);
    drawTickRing(item, group);
    el('circle', {
      cx: item.cx, cy: item.cy, r: 83,
      fill: PAPER, stroke: INK45, 'stroke-width': 1.1
    }, group);
    el('path', {
      d: arcPath(item.cx, item.cy, 83, item.pct),
      fill: 'none', stroke: INK80, 'stroke-width': 5.5,
      'stroke-linecap': 'round'
    }, group);
    var endpoint = pointOnCircle(item.cx, item.cy, 83, -Math.PI / 2 + item.pct * Math.PI * 2);
    el('circle', { cx: endpoint.x, cy: endpoint.y, r: 4.2, fill: INK80 }, group);
    text(item.display, item.cx, item.cy + 8, {
      'font-family': MONO, 'font-size': 30, 'letter-spacing': .8,
      'text-anchor': 'middle'
    }, group);
    text(item.money, item.cx, item.cy + 39, {
      'font-family': MONO, 'font-size': 11, 'letter-spacing': 1,
      'text-anchor': 'middle', fill: INK45
    }, group);
    text(item.zh, item.cx, item.cy + 142, {
      'font-size': 20, 'font-weight': 400, 'text-anchor': 'middle'
    }, group);
    text(item.en, item.cx, item.cy + 168, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.8,
      'text-anchor': 'middle', fill: INK45
    }, group);
  }

  function drawAllocationGrid() {
    var group = drawGridFrame();
    ALLOCATIONS.forEach(function (item, ringIndex) { drawRing(item, ringIndex, group); });
  }

  function drawCheck() {
    var group = el('g', {
      'data-layout-zone': 'c5.allocation-check',
      'data-slot-id': 'allocation-sum-check',
      'data-fixed-quantity': '1'
    });
    line(90, 1210, 990, 1210, { stroke: INK45, 'stroke-width': .6 }, group);
    text('READ ROW BY ROW · NOT AS A SEQUENCE', 90, 1239, {
      'font-family': MONO, 'font-size': 9.2, 'letter-spacing': 1.35, fill: INK45
    }, group);
    text('ALLOCATION CHECK · 38 + 27 + 21 + 14 = 100%', 990, 1239, {
      'font-family': MONO, 'font-size': 9.2, 'letter-spacing': 1.1,
      'text-anchor': 'end', fill: INK45
    }, group);
  }

  function drawC5() {
    text('4200 万预算，65% 投向训练与推理', 90, 214, {
      'font-family': SERIF, 'font-size': 46, 'font-weight': 500
    });
    text('训练、推理、数据与研发四项分配合计 100%，先看总额，再读各项占比。', 90, 266, {
      'font-size': 20, fill: INK70
    });
    drawSectionLabel();
    drawTotal();
    drawAllocationGrid();
    drawCheck();
  }

  drawC5();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
