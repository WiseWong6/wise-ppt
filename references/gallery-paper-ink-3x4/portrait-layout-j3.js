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

  var STAGES = [
    ['01', 'ONBOARD', '初次接触'],
    ['02', 'WOW', '上手惊艳'],
    ['03', 'DEPTH', '深度撞墙'],
    ['04', 'STAY', '突破依赖']
  ];
  var NODES = [
    { x: 202, score: 74, cn: '好奇', sc: 'SCORE 74', labelSide: 'below' },
    { x: 427, score: 92, cn: '惊艳', sc: 'SCORE 92 · PEAK', labelSide: 'above' },
    { x: 652, score: 41, cn: '撞墙', sc: 'SCORE 41 · PAIN', labelSide: 'below', focus: true },
    { x: 877, score: 90, cn: '持续依赖', sc: 'SCORE 90', labelSide: 'above' }
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

  function scoreY(score) {
    return 1020 - score * 4;
  }

  function drawDefs() {
    var defs = el('defs', {});
    var marker = el('marker', {
      id: 'j3-arrow-portrait', viewBox: '0 0 10 10', refX: 9, refY: 5,
      markerWidth: 7, markerHeight: 7, orient: 'auto'
    }, defs);
    el('path', {
      d: 'M 0 0 L 10 5 L 0 10', fill: 'none',
      stroke: INK80, 'stroke-width': 1.25
    }, marker);
  }

  function drawStageBand() {
    var group = el('g', { 'data-layout-zone': 'j3.stage-band', 'data-slot-id': 'stage-band' });
    STAGES.forEach(function (stage, index) {
      var x = 90 + index * 225;
      var y = 382;
      var width = 225;
      var height = 104;
      var tip = 17;
      var path = 'M ' + x + ' ' + y + ' H ' + (x + width - tip) +
        ' L ' + (x + width) + ' ' + (y + height / 2) +
        ' L ' + (x + width - tip) + ' ' + (y + height) + ' H ' + x +
        (index === 0 ? ' Z' : ' L ' + (x + tip) + ' ' + (y + height / 2) + ' Z');
      var stageGroup = el('g', {
        'data-layout-zone': 'j3.stage-' + (index + 1),
        'data-slot-id': 'stage-' + (index + 1)
      }, group);
      el('path', { d: path, fill: 'none', stroke: INK80, 'stroke-width': 1 }, stageGroup);
      text(stage[0] + ' ' + stage[1], x + width / 2, y + 42, {
        'data-xp-anchor': 'stage',
        'font-family': MONO, 'font-size': 10.5, 'letter-spacing': 1.1,
        'text-anchor': 'middle', fill: INK45
      }, stageGroup);
      text(stage[2], x + width / 2, y + 72, {
        'font-size': 16.5, 'text-anchor': 'middle', fill: INK70
      }, stageGroup);
    });
  }

  function drawExperienceGuide() {
    var group = el('g', { 'data-layout-zone': 'j3.experience-guide', 'data-slot-id': 'experience-guide' });
    var baselineY = scoreY(74);
    line(122, baselineY, 958, baselineY, {
      stroke: INK45, 'stroke-width': .55, opacity: .3, 'stroke-dasharray': '2 7'
    }, group);
    text('EXPERIENCE INDEX 0–100', 958, 574, {
      'font-family': MONO, 'font-size': 10.5, 'letter-spacing': 1.7,
      'text-anchor': 'end', fill: INK45
    }, group);
    NODES.forEach(function (node) {
      var y = scoreY(node.score);
      line(node.x, 506, node.x, y - (node.labelSide === 'above' ? 62 : 16), {
        stroke: INK45, 'stroke-width': .45, opacity: .22, 'stroke-dasharray': '2 8'
      }, group);
    });
  }

  function curvePath() {
    var path = 'M ' + NODES[0].x + ' ' + scoreY(NODES[0].score);
    for (var index = 1; index < NODES.length; index += 1) {
      var previous = NODES[index - 1];
      var current = NODES[index];
      var midX = (previous.x + current.x) / 2;
      path += ' C ' + midX + ' ' + scoreY(previous.score) + ', ' + midX + ' ' +
        scoreY(current.score) + ', ' + current.x + ' ' + scoreY(current.score);
    }
    return path;
  }

  function drawJourneyCurve() {
    var group = el('g', { 'data-layout-zone': 'j3.journey-curve', 'data-slot-id': 'journey-curve' });
    el('path', {
      d: curvePath(), fill: 'none', stroke: INK80, 'stroke-width': 1.7,
      'marker-end': 'url(#j3-arrow-portrait)', 'data-xp-anchor': 'curve'
    }, group);
    NODES.forEach(function (node, index) {
      var y = scoreY(node.score);
      var above = node.labelSide === 'above';
      var labelY = y + (above ? -48 : 58);
      var nodeGroup = el('g', {
        'data-layout-zone': 'j3.node-' + (index + 1),
        'data-slot-id': 'node-' + (index + 1)
      }, group);
      line(node.x, y + (above ? -15 : 15), node.x, y + (above ? -34 : 34), {
        id: node.focus ? 'j3-focus-leader' : '',
        stroke: INK45, 'stroke-width': .7, 'stroke-dasharray': '3 4'
      }, nodeGroup);
      el('circle', {
        id: node.focus ? 'j3-focus-node' : '', cx: node.x, cy: y, r: 12,
        fill: PAPER, stroke: INK80,
        'stroke-width': node.focus ? 1.5 : 1.2
      }, nodeGroup);
      el('circle', {
        id: node.focus ? 'j3-focus-node-core' : '', cx: node.x, cy: y, r: 3,
        fill: INK
      }, nodeGroup);
      text(node.cn, node.x, labelY, {
        id: node.focus ? 'j3-focus-cn' : '', 'font-size': 18,
        'font-weight': 400, 'text-anchor': 'middle'
      }, nodeGroup);
      text(node.sc, node.x, labelY + 25, {
        id: node.focus ? 'j3-focus-score' : '',
        'font-family': MONO, 'font-size': 9.5, 'letter-spacing': .8,
        'text-anchor': 'middle', fill: INK45
      }, nodeGroup);
    });
  }

  function drawJ3() {
    drawDefs();
    text('体验不会直线上升', 90, 220, {
      'font-family': SERIF, 'font-size': 52, 'font-weight': 500
    });
    text('四个阶段横向推进，曲线从左到右保留清楚的时间与指向。', 90, 274, {
      'font-size': 23, fill: INK70
    });
    drawStageBand();
    drawExperienceGuide();
    drawJourneyCurve();
  }

  drawJ3();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
