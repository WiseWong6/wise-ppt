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
  var RADIUS = 270;
  var SETS = [
    { key: 'domain', cx: 340, cy: 620, en: 'DOMAIN', cn: '领域知识', labelX: 230, labelY: 575, pattern: 'q1-domain-hatch' },
    { key: 'action', cx: 740, cy: 620, en: 'ACTION', cn: '工具执行', labelX: 850, labelY: 575, pattern: 'q1-action-hatch' },
    { key: 'check', cx: 540, cy: 820, en: 'CHECK', cn: '过程校验', labelX: 540, labelY: 968, pattern: 'q1-check-dots' }
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
    var domain = el('pattern', {
      id: 'q1-domain-hatch', width: 10, height: 10,
      patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)'
    }, defs);
    line(0, 0, 0, 10, { stroke: INK, 'stroke-width': .8, opacity: .24 }, domain);

    var action = el('pattern', {
      id: 'q1-action-hatch', width: 11, height: 11,
      patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(-45)'
    }, defs);
    line(0, 0, 0, 11, { stroke: INK, 'stroke-width': .8, opacity: .2 }, action);

    var check = el('pattern', {
      id: 'q1-check-dots', width: 14, height: 14,
      patternUnits: 'userSpaceOnUse'
    }, defs);
    el('circle', { cx: 3, cy: 3, r: 1.15, fill: INK, opacity: .24 }, check);
  }

  function drawSectionLabel() {
    var group = el('g', { 'data-layout-zone': 'q1.section', 'data-slot-id': 'section-label' });
    text('01 / SHARED INTERSECTION', 90, 309, {
      'font-family': MONO, 'font-size': 11, 'letter-spacing': 1.8, fill: INK45
    }, group);
    line(390, 305, 990, 305, { stroke: INK45, 'stroke-width': .65 }, group);
    text('3 EQUAL SETS · 1 COMMON AREA', 990, 309, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.15,
      'text-anchor': 'end', fill: INK45
    }, group);
  }

  function drawConstruction(parent) {
    var group = el('g', {
      'data-layout-zone': 'q1.construction', 'data-slot-id': 'venn-construction'
    }, parent);
    line(540, 340, 540, 1110, {
      stroke: INK, 'stroke-width': .5, opacity: .16, 'stroke-dasharray': '2 7'
    }, group);
    line(90, 720, 990, 720, {
      stroke: INK, 'stroke-width': .5, opacity: .16, 'stroke-dasharray': '2 7'
    }, group);
  }

  function drawSetCircle(set, index, parent) {
    var group = el('g', {
      'data-layout-zone': 'q1.circle-' + (index + 1),
      'data-slot-id': 'set-' + set.key,
      'data-repeat-unit': 'reliable-answer-set',
      'data-set-key': set.key
    }, parent);
    el('circle', {
      'data-xp-anchor': 'venn-circle',
      cx: set.cx, cy: set.cy, r: RADIUS,
      fill: PAPER, 'fill-opacity': .01,
      stroke: FUNCTIONAL, 'stroke-width': 1.35
    }, group);
    el('circle', {
      cx: set.cx, cy: set.cy, r: RADIUS - 7,
      fill: 'url(#' + set.pattern + ')', stroke: 'none',
      style: 'mix-blend-mode:multiply'
    }, group);
  }

  function drawSetCircles(parent) {
    var group = el('g', {
      'data-layout-zone': 'q1.set-circles',
      'data-slot-id': 'three-overlap-circles',
      'data-fixed-quantity': '3'
    }, parent);
    SETS.forEach(function (set, index) { drawSetCircle(set, index, group); });
  }

  function drawSetLabel(set, index, parent) {
    var group = el('g', {
      'data-layout-zone': 'q1.set-label-' + (index + 1),
      'data-slot-id': set.key + '-label',
      'data-repeat-unit': 'reliable-answer-set-label',
      'data-set-key': set.key
    }, parent);
    text(set.en, set.labelX, set.labelY, {
      'font-family': MONO, 'font-size': 11, 'letter-spacing': 2,
      'text-anchor': 'middle', fill: FUNCTIONAL,
      'data-text-kind': 'label'
    }, group);
    text(set.cn, set.labelX, set.labelY + 34, {
      'font-size': 19, 'font-weight': 400, 'text-anchor': 'middle',
      'data-text-kind': 'label', fill: FUNCTIONAL
    }, group);
  }

  function drawSetLabels(parent) {
    var group = el('g', {
      'data-layout-zone': 'q1.set-labels',
      'data-slot-id': 'three-set-labels',
      'data-fixed-quantity': '3'
    }, parent);
    SETS.forEach(function (set, index) { drawSetLabel(set, index, group); });
  }

  function drawIntersection(parent) {
    var group = el('g', {
      'data-layout-zone': 'q1.intersection',
      'data-slot-id': 'shared-intersection',
      'data-fixed-quantity': '1',
      'data-component-id': 'native.paper-ink.relationship.overlap-venn.shared-intersection'
    }, parent);
    text('可靠回答', 540, 657, {
      id: 'sample-focus',
      'font-size': 18, 'font-weight': 400,
      'letter-spacing': 4,
      'text-anchor': 'start',
      'writing-mode': 'vertical-rl',
      'text-orientation': 'upright'
    }, group);
  }

  function drawReadingGuide() {
    var group = el('g', {
      'data-layout-zone': 'q1.reading-guide', 'data-slot-id': 'reading-guide'
    });
    line(90, 1136, 990, 1136, { stroke: INK45, 'stroke-width': .6 }, group);
    text('LEFT → RIGHT → LOWER → CENTER', 90, 1167, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.5, fill: INK45
    }, group);
    text('三个集合没有先后与主次', 990, 1167, {
      'font-size': 12, 'text-anchor': 'end', fill: INK45
    }, group);
  }

  function drawVennSystem() {
    var group = el('g', {
      'data-layout-zone': 'q1.venn-system',
      'data-slot-id': 'reliable-answer-venn',
      'data-fixed-quantity': '3',
      'data-component-id': 'native.paper-ink.relationship.overlap-venn.three-equal-sets'
    });
    drawConstruction(group);
    drawSetCircles(group);
    drawSetLabels(group);
    drawIntersection(group);
  }

  function drawQ1() {
    drawDefs();
    text('可靠回答，落在三项能力的共同区域', 90, 214, {
      'font-family': SERIF, 'font-size': 46, 'font-weight': 500
    });
    text('领域知识、工具执行与过程校验同权交叠；中心不是第四项能力。', 90, 266, {
      'font-size': 20, fill: INK70
    });
    drawSectionLabel();
    drawVennSystem();
    drawReadingGuide();
  }

  drawQ1();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
