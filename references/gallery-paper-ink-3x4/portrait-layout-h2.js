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

  var CENTER = { x: 390, y: 760 };
  var LEVELS = [
    { no: '01', en: 'CALL', cn: '单轮调用', note: '（这一次请求）', half: 78, dash: null, width: 1.55, opacity: .94, labelY: 1030, focus: true },
    { no: '02', en: 'SESSION', cn: '单次会话', note: '（这一段对话）', half: 152, dash: null, width: 1.3, opacity: .76, labelY: 846 },
    { no: '03', en: 'TASK', cn: '任务过程', note: '（这一整轮执行）', half: 226, dash: '6 4', width: 1.15, opacity: .64, labelY: 662 },
    { no: '04', en: 'OUTCOME', cn: '业务结果', note: '（最终的产出影响）', half: 300, dash: '3 6', width: 1.15, opacity: .54, labelY: 478 }
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
    var pattern = el('pattern', {
      id: 'h2-hatch', width: 8, height: 8, patternUnits: 'userSpaceOnUse',
      patternTransform: 'rotate(45)'
    }, defs);
    line(0, 0, 0, 8, {
      id: 'h2-focus-hatch', stroke: INK, 'stroke-width': .75, opacity: .32
    }, pattern);
  }

  function drawSectionLabel() {
    var group = el('g', { 'data-layout-zone': 'h2.section', 'data-slot-id': 'section-label' });
    text('01 / OBSERVATION SCALE', 90, 309, {
      'font-family': MONO, 'font-size': 11, 'letter-spacing': 1.8, fill: INK45
    }, group);
    line(392, 305, 990, 305, { stroke: INK45, 'stroke-width': .65 }, group);
    text('OUTSIDE → INSIDE', 990, 309, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.25,
      'text-anchor': 'end', fill: INK45
    }, group);
  }

  function drawConstruction(parent) {
    var group = el('g', {
      'data-layout-zone': 'h2.construction', 'data-slot-id': 'frame-construction'
    }, parent);
    line(CENTER.x - 338, CENTER.y, CENTER.x + 338, CENTER.y, {
      stroke: INK, 'stroke-width': .5, opacity: .2, 'stroke-dasharray': '2 7'
    }, group);
    line(CENTER.x, CENTER.y - 338, CENTER.x, CENTER.y + 338, {
      stroke: INK, 'stroke-width': .5, opacity: .2, 'stroke-dasharray': '2 7'
    }, group);
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (sign) {
      var x = CENTER.x + sign[0] * 326;
      var y = CENTER.y + sign[1] * 326;
      line(x - 9, y, x + 9, y, { stroke: INK, 'stroke-width': .75, opacity: .4 }, group);
      line(x, y - 9, x, y + 9, { stroke: INK, 'stroke-width': .75, opacity: .4 }, group);
    });
  }

  function drawLevelFrame(level, parent) {
    var group = el('g', {
      'data-layout-zone': 'h2.level-' + level.en.toLowerCase(),
      'data-slot-id': level.en.toLowerCase() + '-observation-frame',
      'data-repeat-unit': 'observation-level'
    }, parent);
    el('rect', {
      id: level.no === '04' ? 'h2-focus-frame' : 'h2-level-' + level.en,
      x: CENTER.x - level.half, y: CENTER.y - level.half,
      width: level.half * 2, height: level.half * 2,
      fill: level.no === '04' ? 'url(#h2-hatch)' : 'none',
      stroke: INK,
      'stroke-width': level.width, opacity: level.opacity,
      'stroke-dasharray': level.dash || 'none'
    }, group);
  }

  function drawLevelLabel(level, parent) {
    var frameX = CENTER.x + level.half;
    var frameY = CENTER.y - level.half;
    var railX = 734;
    var labelX = 772;
    var group = el('g', {
      'data-layout-zone': 'h2.level-label-' + level.en.toLowerCase(),
      'data-slot-id': level.en.toLowerCase() + '-level-label',
      'data-repeat-unit': 'observation-label'
    }, parent);
    el('circle', {
      cx: frameX, cy: frameY, r: 4.8, fill: PAPER,
      stroke: INK80, 'stroke-width': 1
    }, group);
    el('circle', { cx: frameX, cy: frameY, r: 1.8, fill: INK }, group);
    el('path', {
      d: 'M ' + frameX + ' ' + frameY + ' H ' + (frameX + 38) + ' L ' + railX + ' ' + level.labelY,
      fill: 'none', stroke: INK, 'stroke-width': .7,
      opacity: .46, 'stroke-dasharray': '3 5'
    }, group);
    el('circle', { cx: railX, cy: level.labelY, r: 2.5, fill: INK, opacity: .62 }, group);
    line(railX, level.labelY, labelX - 12, level.labelY, {
      stroke: INK, 'stroke-width': .7, opacity: .46
    }, group);
    text(level.no + ' · ' + level.en, labelX, level.labelY - 28, {
      id: level.no === '04' ? 'h2-focus-code' : '',
      'font-family': MONO, 'font-size': 12, 'letter-spacing': 1.65,
      fill: INK45
    }, group);
    text(level.cn, labelX, level.labelY + 7, {
      id: level.no === '04' ? 'h2-focus-cn' : '',
      'font-size': 23, 'font-weight': 400
    }, group);
    text(level.note, labelX, level.labelY + 36, {
      'font-size': 15.5, fill: INK70
    }, group);
  }

  function drawZoomSystem() {
    var group = el('g', {
      'data-layout-zone': 'h2.zoom-system',
      'data-slot-id': 'four-observation-levels',
      'data-fixed-quantity': '4',
      'data-component-id': 'native.paper-ink.nested.zoom-frames'
    });
    drawConstruction(group);
    var frames = el('g', {
      'data-layout-zone': 'h2.nested-frames', 'data-slot-id': 'nested-frames'
    }, group);
    LEVELS.slice().reverse().forEach(function (level) { drawLevelFrame(level, frames); });
    var labels = el('g', {
      'data-layout-zone': 'h2.level-labels', 'data-slot-id': 'outside-to-inside-labels'
    }, group);
    LEVELS.slice().reverse().forEach(function (level) { drawLevelLabel(level, labels); });
    el('circle', { cx: CENTER.x, cy: CENTER.y, r: 3.2, fill: INK }, group);
    el('circle', {
      cx: CENTER.x, cy: CENTER.y, r: 9, fill: 'none',
      stroke: INK, 'stroke-width': .8, opacity: .62
    }, group);
  }

  function drawH2() {
    drawDefs();
    text('四层观察粒度，逐层接近真实价值', 90, 214, {
      'font-family': SERIF, 'font-size': 46, 'font-weight': 500
    });
    text('中心从一次调用起步；会话、任务与业务结果一层层包住它。', 90, 266, {
      'font-size': 20, fill: INK70
    });
    drawSectionLabel();
    drawZoomSystem();
  }

  drawH2();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
