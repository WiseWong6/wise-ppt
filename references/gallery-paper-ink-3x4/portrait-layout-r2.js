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

  var LEVELS = [
    {
      slot: 'strategy', no: '01', en: 'STRATEGY',
      statement: '战略层：先明确哪些决策值得交给 AI',
      proof: 'VALUE · RISK', icon: 'target', fill: PANEL,
      component: 'native.paper-ink.semantic.statement-band'
    },
    {
      slot: 'capability', no: '02', en: 'CAPABILITY',
      statement: '能力层：数据、模型、工具形成可复用底座',
      proof: 'DATA · MODEL · TOOL', icon: 'stack', fill: 'none',
      component: 'native.paper-ink.semantic.process-strip'
    },
    {
      slot: 'execution', no: '03', en: 'EXECUTION',
      statement: '执行层：场景上线后用指标持续校准',
      proof: 'OWNER · KPI · REVIEW', icon: 'chart', fill: PAPER,
      component: 'native.paper-ink.semantic.metric-band'
    }
  ];

  var STACK_X = 90;
  var STACK_WIDTH = 900;
  var BAND_HEIGHT = 250;
  var BAND_Y = [345, 655, 965];

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

  function sectionLabel(y) {
    var group = el('g', { 'data-layout-zone': 'r2.section', 'data-slot-id': 'section-label' });
    text('01 / STRATEGY TO EXECUTION', 90, y, {
      'font-family': MONO, 'font-size': 11, 'letter-spacing': 1.8, fill: INK45
    }, group);
    line(368, y - 4, 990, y - 4, { stroke: INK45, 'stroke-width': .65 }, group);
    text('THREE LEVELS', 990, y, {
      'font-family': MONO, 'font-size': 10, 'letter-spacing': 1.5,
      'text-anchor': 'end', fill: INK45
    }, group);
  }

  function drawTarget(cx, cy, parent, stroke) {
    el('circle', { cx: cx, cy: cy, r: 31, fill: 'none', stroke: stroke, 'stroke-width': 1.2 }, parent);
    el('circle', { cx: cx, cy: cy, r: 18, fill: 'none', stroke: stroke, 'stroke-width': .8, opacity: .62 }, parent);
    el('circle', { cx: cx, cy: cy, r: 6, fill: stroke, opacity: .78 }, parent);
  }

  function drawStackIcon(cx, cy, parent, stroke) {
    el('path', {
      d: 'M ' + cx + ' ' + (cy - 32) + ' L ' + (cx + 31) + ' ' + (cy - 15) + ' L ' + cx + ' ' + (cy + 2) + ' L ' + (cx - 31) + ' ' + (cy - 15) + ' Z',
      fill: 'none', stroke: stroke, 'stroke-width': 1.2, 'stroke-linejoin': 'round'
    }, parent);
    el('path', {
      d: 'M ' + (cx - 31) + ' ' + cy + ' L ' + cx + ' ' + (cy + 17) + ' L ' + (cx + 31) + ' ' + cy,
      fill: 'none', stroke: stroke, 'stroke-width': .8, opacity: .62, 'stroke-linejoin': 'round'
    }, parent);
    el('path', {
      d: 'M ' + (cx - 31) + ' ' + (cy + 15) + ' L ' + cx + ' ' + (cy + 32) + ' L ' + (cx + 31) + ' ' + (cy + 15),
      fill: 'none', stroke: stroke, 'stroke-width': .6, opacity: .42, 'stroke-linejoin': 'round'
    }, parent);
  }

  function drawChart(cx, cy, parent, stroke) {
    line(cx - 34, cy + 28, cx + 34, cy + 28, { stroke: INK45, 'stroke-width': .65 }, parent);
    el('path', {
      d: 'M ' + (cx - 31) + ' ' + (cy + 17) + ' L ' + (cx - 14) + ' ' + cy + ' L ' + (cx - 2) + ' ' + (cy + 8) + ' L ' + (cx + 18) + ' ' + (cy - 23),
      fill: 'none', stroke: stroke, 'stroke-width': 1.6,
      'stroke-linecap': 'round', 'stroke-linejoin': 'round'
    }, parent);
    [[-31, 17], [-14, 0], [-2, 8], [18, -23]].forEach(function (point) {
      el('circle', { cx: cx + point[0], cy: cy + point[1], r: 2.7, fill: stroke, opacity: .78 }, parent);
    });
  }

  function drawIcon(kind, cx, cy, parent, stroke) {
    if (kind === 'target') drawTarget(cx, cy, parent, stroke);
    if (kind === 'stack') drawStackIcon(cx, cy, parent, stroke);
    if (kind === 'chart') drawChart(cx, cy, parent, stroke);
  }

  function drawBand(level, index) {
    var y = BAND_Y[index];
    var group = el('g', {
      'data-layout-zone': 'r2.band-' + (index + 1),
      'data-slot-id': level.slot,
      'data-repeat-unit': 'level',
      'data-component-id': level.component
    });
    /* 横版仅战略层承载主题身份色;能力、执行两层保持中性墨。 */
    var accent = index === 0;
    el('rect', {
      x: STACK_X, y: y, width: STACK_WIDTH, height: BAND_HEIGHT,
      fill: level.fill, stroke: accent ? FUNCTIONAL : INK80, 'stroke-width': index === 1 ? 1.25 : 1
    }, group);
    text(level.no + ' / ' + level.en, STACK_X + 28, y + 43, {
      'font-family': MONO, 'font-size': 11, 'letter-spacing': 1.8, fill: accent ? FUNCTIONAL : INK45
    }, group);
    text(level.proof, STACK_X + STACK_WIDTH - 28, y + 43, {
      'font-family': MONO, 'font-size': 10.5, 'letter-spacing': 1.45,
      'text-anchor': 'end', fill: INK45
    }, group);
    var iconGroup = el('g', {
      'data-layout-zone': 'r2.icon-' + (index + 1),
      'data-slot-id': level.slot + '-icon',
      'data-icon-source': index === 0 ? 'redraw-v3:target' : index === 1 ? 'redraw-v3:stack-2' : 'redraw-v3:chart-line'
    }, group);
    drawIcon(level.icon, STACK_X + 86, y + 148, iconGroup, accent ? FUNCTIONAL : INK80);
    text(level.statement, STACK_X + 180, y + 158, {
      'font-size': 28.5, 'font-weight': 400, fill: INK
    }, group);
    text('LEVEL ' + level.no, STACK_X + 180, y + 218, { 'data-xp-anchor': 'level',
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.5, fill: INK45
    }, group);
  }

  function drawArrow(index, y1, y2) {
    var group = el('g', {
      'data-layout-zone': 'r2.arrow-' + index,
      'data-slot-id': 'level-arrow-' + index
    });
    line(540, y1, 540, y2, { stroke: INK80, 'stroke-width': 1.15 }, group);
    line(532, y2 - 10, 540, y2, { stroke: FUNCTIONAL, 'stroke-width': 1.25 }, group);
    line(548, y2 - 10, 540, y2, { stroke: FUNCTIONAL, 'stroke-width': 1.25 }, group);
  }

  function drawStack() {
    var group = el('g', {
      'data-layout-zone': 'r2.stack',
      'data-slot-id': 'strategy-capability-execution',
      'data-fixed-quantity': '3'
    });
    LEVELS.forEach(function (level, index) { drawBand(level, index); });
    drawArrow(1, 605, 644);
    drawArrow(2, 915, 954);
    document.querySelectorAll('[data-layout-zone^="r2.band-"], [data-layout-zone^="r2.arrow-"]').forEach(function (node) {
      group.appendChild(node);
    });
  }

  function drawR2() {
    text('战略、能力、执行，三层贯通落地', 90, 214, {
      'font-family': SERIF, 'font-size': 46, 'font-weight': 500
    });
    text('先判断价值与风险，再建设复用底座，最后用指标持续校准。', 90, 266, {
      'font-size': 20, fill: INK70
    });
    sectionLabel(309);
    drawStack();
  }

  drawR2();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
