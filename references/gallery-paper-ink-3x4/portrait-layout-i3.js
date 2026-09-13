(function () {
  'use strict';

  var svg = document.querySelector('.scene');
  var NS = 'http://www.w3.org/2000/svg';
  var INK = 'var(--ink)';
  var INK80 = 'var(--ink-80)';
  var INK70 = 'var(--ink-70)';
  var INK45 = 'var(--ink-45)';
  var PAPER = 'var(--paper)';
  var FUNCTIONAL = 'var(--wp-color-functional)';
  var SANS = 'var(--sans)';
  var MONO = 'var(--mono)';
  var SERIF = 'var(--serif)';
  var STAGE_CENTERS = [430, 597, 765, 932, 1100];
  var OLD = [
    ['01', '需求接入', 'UNIFIED IN'],
    ['02', '人工调研', 'HUMAN RESEARCH'],
    ['03', '手写文档', 'HAND DRAFT'],
    ['04', '人工审阅', 'MANUAL REVIEW'],
    ['05', '手动发布', 'MANUAL SHIP']
  ];
  var NEW = [
    ['01', '需求接入', 'UNIFIED IN'],
    ['02', 'AI 检索', 'AI RETRIEVE'],
    ['03', 'AI 生成', 'AI GENERATE'],
    ['04', 'AI 校验', 'AI VERIFY'],
    ['05', '一键发布', 'ONE-CLICK SHIP']
  ];
  var DELTAS = [
    ['02', 'HUMAN RESEARCH → AI RETRIEVE'],
    ['03', 'HAND DRAFT → AI GENERATE'],
    ['04', 'MANUAL REVIEW → AI VERIFY']
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

  function trackHeader(x, eyebrow, titleValue, strong, zone) {
    var group = el('g', { 'data-layout-zone': zone, 'data-slot-id': zone.split('.')[1] });
    text(eyebrow, x + 22, 342, {
      'font-family': MONO, 'font-size': 11, 'letter-spacing': 1.7, fill: INK45
    }, group);
    text(titleValue, x + 22, 374, { 'font-size': 23, 'font-weight': 400 }, group);
    line(x + 22, 389, x + 210, 389, {
      stroke: FUNCTIONAL, 'stroke-width': 2
    }, group);
  }

  function station(track, item, stageIndex, x, strong) {
    var centerY = STAGE_CENTERS[stageIndex];
    var focus = track === 'new' && stageIndex === 4;
    var zone = 'i3.' + track + '-stage-' + (stageIndex + 1);
    var group = el('g', { 'data-layout-zone': zone, 'data-slot-id': track + '-stage-' + (stageIndex + 1) });
    el('circle', Object.assign({
      cx: x + 50, cy: centerY, r: 25, fill: PAPER,
      stroke: INK70, 'stroke-width': strong ? 1.35 : 1
    }, focus ? { id: 'i3-focus-ring' } : {}), group);
    text(item[0], x + 50, centerY + 5, Object.assign({
      'font-family': MONO, 'font-size': 13, 'letter-spacing': 1, 'text-anchor': 'middle',
      fill: INK70
    }, focus ? { id: 'i3-focus-no' } : {}), group);
    text(item[1], x + 92, centerY - 4, Object.assign({
      'font-size': 22, 'font-weight': 400
    }, focus ? { id: 'i3-focus-cn' } : {}), group);
    text(item[2], x + 92, centerY + 25, Object.assign({
      'font-family': MONO, 'font-size': 10.5, 'letter-spacing': 1.15, fill: INK45
    }, focus ? { id: 'i3-focus-en' } : {}), group);
  }

  function verticalRail(x, strong) {
    line(x, STAGE_CENTERS[0], x, STAGE_CENTERS[4], {
      stroke: INK45,
      'stroke-width': strong ? 1.25 : .8,
      'stroke-dasharray': strong ? '' : '3 7'
    });
    for (var y = STAGE_CENTERS[0] + 24; y < STAGE_CENTERS[4]; y += 34) {
      line(x - 4, y, x + 4, y, { stroke: INK45, 'stroke-width': .5, opacity: .65 });
    }
  }

  function deltaBadge(stageNo, label) {
    var stageIndex = Number(stageNo) - 1;
    var y = STAGE_CENTERS[stageIndex];
    var group = el('g', {
      'data-layout-zone': 'i3.delta-' + stageNo,
      'data-slot-id': 'delta-' + stageNo,
      'data-flow-direction': 'left-to-right'
    });
    line(416, y, 496, y, { stroke: INK45, 'stroke-width': .7, 'stroke-dasharray': '3 5' }, group);
    el('circle', { 'data-xp-anchor': 'station', cx: 456, cy: y, r: 20, fill: PAPER, stroke: INK80, 'stroke-width': 1 }, group);
    el('path', {
      d: 'M 449 ' + (y - 8) + ' L 458 ' + y + ' L 449 ' + (y + 8),
      fill: 'none', stroke: INK80, 'stroke-width': 1.2,
      'stroke-linecap': 'round', 'stroke-linejoin': 'round'
    }, group);
    text(label, 456, y + 74, {
      'font-family': MONO, 'font-size': 8.5, 'letter-spacing': .55,
      'text-anchor': 'middle', fill: INK45
    }, group);
  }

  function outcome() {
    var group = el('g', { 'data-layout-zone': 'i3.outcome', 'data-slot-id': 'outcome' });
    line(640, 1110, 640, 1168, { stroke: INK, 'stroke-width': 1.2 }, group);
    el('path', {
      d: 'M 634 1159 L 640 1168 L 646 1159', fill: 'none',
      stroke: INK, 'stroke-width': 1.2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round'
    }, group);
    text('E2E -58%', 618, 1207, { 'font-family': MONO, 'font-size': 23, 'letter-spacing': 2, fill: INK }, group);
    text('每一站仍需质量门', 618, 1234, { 'font-size': 15, fill: INK70 }, group);
  }

  function drawI3() {
    text('同一入口，两条转化路径', 90, 220, { 'font-family': SERIF, 'font-size': 50, 'font-weight': 500 });
    text('五个站点逐级对位：旧流程与 AI 工作流沿同一阅读方向推进。', 90, 274, { 'font-size': 23, fill: INK70 });

    trackHeader(90, 'OLD LINK · MANUAL OPS', '传统工作流', false, 'i3.track-old');
    trackHeader(590, 'NEW LINK · AI WORKFLOW', 'AI 工作流', true, 'i3.track-new');
    verticalRail(140, false);
    verticalRail(640, true);

    OLD.forEach(function (item, index) { station('old', item, index, 90, false); });
    NEW.forEach(function (item, index) { station('new', item, index, 590, true); });
    DELTAS.forEach(function (item) { deltaBadge(item[0], item[1]); });
    outcome();
  }

  drawI3();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
