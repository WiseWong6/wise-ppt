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
  var PANEL = 'var(--paper-panel)';
  var SANS = 'var(--sans)';
  var MONO = 'var(--mono)';
  var SERIF = 'var(--serif)';
  var PIVOT = { x: 540, y: 466, r: 34 };
  var BEAM = { x1: 120, y1: 535, x2: 960, y2: 455 };
  var SIDES = [
    {
      key: 'speed', index: '01', en: 'SPEED', cn: '上线速度',
      point1: '试点快 · 反馈早', point2: '成本低',
      suspensionX: 200, suspensionTop: 527, railY: 745,
      panLeft: 70, panRight: 330, panControlY: 950,
      labelY: 900, tilt: 'down'
    },
    {
      key: 'governance', index: '02', en: 'GOVERNANCE', cn: '治理强度',
      point1: '权限清 · 证据全', point2: '风险稳',
      suspensionX: 880, suspensionTop: 463, railY: 680,
      panLeft: 750, panRight: 1010, panControlY: 885,
      labelY: 835, tilt: 'up'
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
    var group = el('g', { 'data-layout-zone': 'r4.section', 'data-slot-id': 'section-label' });
    text('01 / CONTROLLED TRADE-OFF', 90, 309, {
      'font-family': MONO, 'font-size': 11, 'letter-spacing': 1.8, fill: INK45
    }, group);
    line(408, 305, 990, 305, { stroke: INK45, 'stroke-width': .65 }, group);
    text('2 SIDES · 1 PIVOT · NO WINNER', 990, 309, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.1,
      'text-anchor': 'end', fill: INK45
    }, group);
  }

  function drawBeam(parent) {
    var group = el('g', {
      'data-layout-zone': 'r4.beam', 'data-slot-id': 'tilted-balance-beam',
      'data-balance-tilt': 'speed-down-governance-up'
    }, parent);
    line(BEAM.x1, BEAM.y1, BEAM.x2, BEAM.y2, {
      stroke: INK, 'stroke-width': 2.2
    }, group);
    el('circle', { cx: BEAM.x1, cy: BEAM.y1, r: 3, fill: INK }, group);
    el('circle', { cx: BEAM.x2, cy: BEAM.y2, r: 3, fill: INK }, group);
  }

  function drawPivot(parent) {
    var group = el('g', {
      'data-layout-zone': 'r4.pivot', 'data-slot-id': 'balance-pivot',
      'data-fixed-quantity': '1'
    }, parent);
    line(PIVOT.x, 365, PIVOT.x, 1018, {
      stroke: INK, 'stroke-width': 1.6
    }, group);
    el('circle', {
      cx: PIVOT.x, cy: PIVOT.y, r: PIVOT.r,
      fill: PAPER, stroke: INK, 'stroke-width': 1.5
    }, group);
    el('circle', {
      cx: PIVOT.x, cy: PIVOT.y, r: 5,
      fill: INK, stroke: PAPER, 'stroke-width': 1
    }, group);
    el('path', {
      d: 'M 390 1060 H 690 L 632 1018 H 448 Z',
      fill: PAPER, stroke: INK, 'stroke-width': 1.2
    }, group);
    text('BALANCE POINT', 578, 401, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.45, fill: INK45
    }, group);
    text('平衡支点', 578, 429, { 'font-size': 15, fill: INK70 }, group);
  }

  function drawPan(side, index, parent) {
    var group = el('g', {
      'data-layout-zone': 'r4.pan-' + (index + 1),
      'data-slot-id': side.key + '-pan',
      'data-repeat-unit': 'tradeoff-side',
      'data-side-id': side.key,
      'data-pan-level': side.tilt
    }, parent);
    line(side.suspensionX, side.suspensionTop, side.suspensionX, side.railY, {
      stroke: INK, 'stroke-width': 1.05
    }, group);
    line(side.panLeft, side.railY, side.panRight, side.railY, {
      stroke: INK, 'stroke-width': 1.15
    }, group);
    el('path', {
      d: 'M ' + side.panLeft + ' ' + side.railY + ' Q ' + side.suspensionX + ' ' + side.panControlY + ' ' + side.panRight + ' ' + side.railY,
      fill: index === 0 ? PANEL : PAPER,
      'fill-opacity': index === 0 ? .72 : 1,
      stroke: INK, 'stroke-width': 1.2
    }, group);
  }

  function drawPans(parent) {
    var group = el('g', {
      'data-layout-zone': 'r4.pan-system',
      'data-slot-id': 'speed-governance-pans',
      'data-fixed-quantity': '2'
    }, parent);
    SIDES.forEach(function (side, index) { drawPan(side, index, group); });
  }

  function drawSideLabel(side, index, parent) {
    var group = el('g', {
      'data-layout-zone': 'r4.side-label-' + (index + 1),
      'data-slot-id': side.key + '-tradeoff-copy',
      'data-repeat-unit': 'tradeoff-side-copy',
      'data-side-id': side.key
    }, parent);
    text(side.index, side.suspensionX - 108, side.labelY - 1, {
      'font-family': MONO, 'font-size': 10, 'letter-spacing': 1.4, fill: INK45
    }, group);
    text(side.en, side.suspensionX, side.labelY, Object.assign({
      'font-family': MONO, 'font-size': 11, 'letter-spacing': 2.2,
      'text-anchor': 'middle', fill: INK45,
      'data-text-kind': 'label'
    }, index === 0 ? { id: 'r4-focus-speed' } : {}), group);
    text(side.cn, side.suspensionX, side.labelY + 38, {
      'data-xp-anchor': 'pan-label',
      'font-size': 21, 'font-weight': 400, 'text-anchor': 'middle',
      'data-text-kind': 'label', fill: FUNCTIONAL
    }, group);
    text(side.point1, side.suspensionX, side.labelY + 76, {
      'font-size': 15.5, 'text-anchor': 'middle', fill: INK70
    }, group);
    text(side.point2, side.suspensionX, side.labelY + 106, {
      'font-size': 15.5, 'text-anchor': 'middle', fill: INK70
    }, group);
  }

  function drawSideLabels(parent) {
    var group = el('g', {
      'data-layout-zone': 'r4.side-labels',
      'data-slot-id': 'speed-governance-copy',
      'data-fixed-quantity': '2'
    }, parent);
    SIDES.forEach(function (side, index) { drawSideLabel(side, index, group); });
  }

  function drawBalanceSystem() {
    var group = el('g', {
      'data-layout-zone': 'r4.balance-system',
      'data-slot-id': 'speed-governance-balance',
      'data-fixed-quantity': '2',
      'data-component-id': 'native.paper-ink.comparison.balance-scale.tradeoff'
    });
    drawPivot(group);
    drawBeam(group);
    drawPans(group);
    drawSideLabels(group);
  }

  function drawR4() {
    text('上线速度与治理强度，不是二选一', 90, 214, {
      'font-family': SERIF, 'font-size': 46, 'font-weight': 500
    });
    text('左盘争取更快试点，右盘守住权限、证据与风险；中央支点承载取舍。', 90, 266, {
      'font-size': 20, fill: INK70
    });
    drawSectionLabel();
    drawBalanceSystem();
  }

  drawR4();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
