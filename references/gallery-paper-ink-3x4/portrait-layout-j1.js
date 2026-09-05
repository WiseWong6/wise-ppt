(function () {
  'use strict';

  var svg = document.querySelector('.scene');
  var NS = 'http://www.w3.org/2000/svg';
  var INK = 'var(--ink)';
  var INK80 = 'var(--ink-80)';
  var INK70 = 'var(--ink-70)';
  var INK45 = 'var(--ink-45)';
  var PAPER = 'var(--paper)';
  var PANEL = 'var(--paper-panel)';
  var FUNCTIONAL = 'var(--wp-color-functional)';
  var SANS = 'var(--sans)';
  var MONO = 'var(--mono)';
  var SERIF = 'var(--serif)';

  var CX = 540;
  var CY = 760;
  var R = 170;
  var CARD_W = 350;
  var CARD_H = 150;

  var STEPS = [
    {
      no: '01', en: 'DEFINE', title: '定位',
      lines: ['定义评测目标与基准，圈定能力范围', '与合格阈值'],
      x: 640, y: 410, nodeAngle: -45
    },
    {
      no: '02', en: 'TUNE', title: '调优',
      lines: ['迭代 prompt、参数与工具调用，逐轮逼近', '目标分数'],
      x: 640, y: 960, nodeAngle: 45
    },
    {
      no: '03', en: 'EVAL', title: '评测',
      lines: ['跑基准集，人工与自动双轨打分，记录', '失败样本'],
      x: 90, y: 960, nodeAngle: 135
    },
    {
      no: '04', en: 'GOVERN', title: '治理',
      lines: ['上线审批、线上监控与回滚，沉淀缺陷', '反哺下一轮'],
      x: 90, y: 410, nodeAngle: 225
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

  function polar(degrees, radius) {
    var angle = degrees * Math.PI / 180;
    return [CX + Math.cos(angle) * radius, CY + Math.sin(angle) * radius];
  }

  function drawDefs() {
    var defs = el('defs', {});
    var marker = el('marker', {
      id: 'j1-arrow-portrait', viewBox: '0 0 10 10', refX: 9, refY: 5,
      markerWidth: 7, markerHeight: 7, orient: 'auto'
    }, defs);
    el('path', {
      d: 'M 0 0 L 10 5 L 0 10', fill: 'none',
      stroke: INK80, 'stroke-width': 1.25
    }, marker);
  }

  function sectionLabel() {
    var group = el('g', { 'data-layout-zone': 'j1.section', 'data-slot-id': 'section' });
    text('01 / FOUR-STEP CLOCKWISE LOOP', 90, 316, {
      'font-family': MONO, 'font-size': 11, 'letter-spacing': 1.65, fill: INK45
    }, group);
    line(388, 312, 990, 312, { stroke: INK45, 'stroke-width': .65 }, group);
    text('四步顺时针闭环', 990, 316, { 'font-size': 15, 'text-anchor': 'end', fill: INK70 }, group);
  }

  function drawRing() {
    var group = el('g', { 'data-layout-zone': 'j1.cycle-ring', 'data-slot-id': 'cycle-ring' });
    el('circle', {
      id: 'j1-system-surface', cx: CX, cy: CY, r: R,
      fill: PANEL, stroke: INK80, 'stroke-width': 1.3,
      'data-overlap-audit-role': 'circle-boundary'
    }, group);
    el('circle', {
      cx: CX, cy: CY, r: R - 13, fill: 'none', stroke: INK,
      'stroke-width': .55, 'stroke-dasharray': '2 6', opacity: .3
    }, group);

    for (var degrees = 0; degrees < 360; degrees += 15) {
      if (degrees % 45 === 0) continue;
      var inner = polar(degrees, R - 11);
      var outer = polar(degrees, R - 5);
      line(inner[0], inner[1], outer[0], outer[1], {
        stroke: INK, 'stroke-width': .55, opacity: .3
      }, group);
    }

    var flow = el('g', { 'data-layout-zone': 'j1.cycle-flow', 'data-slot-id': 'cycle-flow' }, group);
    [0, 90, 180, 270].forEach(function (middleAngle) {
      var start = polar(middleAngle - 12, R);
      var end = polar(middleAngle + 12, R);
      el('path', {
        d: 'M ' + start[0].toFixed(1) + ' ' + start[1].toFixed(1) +
          ' A ' + R + ' ' + R + ' 0 0 1 ' + end[0].toFixed(1) + ' ' + end[1].toFixed(1),
        fill: 'none', stroke: INK80, 'stroke-width': 1.4,
        'marker-end': 'url(#j1-arrow-portrait)'
      }, flow);
    });

    line(CX - 16, CY, CX + 16, CY, { stroke: INK45, 'stroke-width': .5 }, group);
    line(CX, CY - 16, CX, CY + 16, { stroke: INK45, 'stroke-width': .5 }, group);
    text('LOOP', CX, CY - 10, { 'data-xp-anchor': 'loop',
      'font-family': MONO, 'font-size': 13, 'letter-spacing': 6,
      'text-anchor': 'middle', fill: FUNCTIONAL
    }, group);
    text('评测治理闭环', CX, CY + 24, { 'data-xp-anchor': 'loop',
      'font-size': 15, 'text-anchor': 'middle', fill: FUNCTIONAL
    }, group);
    text('FAILURE SAMPLES RETURN', CX, CY + 58, {
      'font-family': MONO, 'font-size': 8.5, 'letter-spacing': 1.35,
      'text-anchor': 'middle', fill: INK45
    }, group);
  }

  function drawNode(step, stepIndex) {
    var point = polar(step.nodeAngle, R);
    var anchorX = step.x + CARD_W / 2;
    var anchorY = step.y < CY ? step.y + CARD_H : step.y;
    var group = el('g', {
      'data-layout-zone': 'j1.cycle-node-' + (stepIndex + 1),
      'data-slot-id': 'cycle-node-' + (stepIndex + 1)
    });
    line(anchorX, anchorY, point[0], point[1], {
      stroke: INK45, 'stroke-width': .7, 'stroke-dasharray': '3 5'
    }, group);
    el('circle', {
      cx: (anchorX + point[0]) / 2, cy: (anchorY + point[1]) / 2,
      r: 2.2, fill: INK70
    }, group);
    el('circle', { cx: point[0], cy: point[1], r: 10, fill: 'var(--paper)', stroke: INK80, 'stroke-width': 1.25 }, group);
    el('circle', { cx: point[0], cy: point[1], r: 3.4, fill: INK }, group);
  }

  function drawStepCard(step, stepIndex) {
    var group = el('g', {
      'data-layout-zone': 'j1.step-card-' + (stepIndex + 1),
      'data-slot-id': 'step-' + (stepIndex + 1)
    });
    el('rect', {
      x: step.x, y: step.y, width: CARD_W, height: CARD_H,
      'data-j1-context-surface': 'true',
      fill: PAPER, stroke: INK80, 'stroke-width': 1.15,
      'data-overlap-audit-role': 'card-boundary'
    }, group);
    el('rect', {
      x: step.x + 5, y: step.y + 5, width: CARD_W - 10, height: CARD_H - 10,
      fill: 'none', stroke: INK45, 'stroke-width': .55
    }, group);
    text(step.no, step.x + 22, step.y + 30, {
      'data-j1-sequence-number': 'true',
      'data-number-kind': 'plain', 'data-number-role': 'sequence',
      'data-number-part': 'label', 'data-text-kind': 'number',
      'font-family': MONO, 'font-size': 11, 'letter-spacing': 1.2, fill: FUNCTIONAL
    }, group);
    line(step.x + 22, step.y + 42, step.x + 52, step.y + 42, {
      'data-j1-title-rule': 'true', stroke: FUNCTIONAL, 'stroke-width': 2
    }, group);
    text(step.en, step.x + CARD_W - 22, step.y + 29, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.7,
      'text-anchor': 'end', fill: INK45
    }, group);
    var titleAttrs = { 'font-size': 24, 'font-weight': 400 };
    if (stepIndex < 3) {
      titleAttrs.id = ['j1-focus-definition', 'j1-focus-tuning', 'j1-focus-score'][stepIndex];
      titleAttrs['data-j1-definition-score-part'] = ['definition', 'tuning', 'score'][stepIndex];
      titleAttrs['data-emphasis-candidate'] = 'true';
    }
    text(step.title, step.x + 22, step.y + 72, titleAttrs, group);
    step.lines.forEach(function (copy, lineIndex) {
      text(copy, step.x + 22, step.y + 108 + lineIndex * 22, {
        'font-size': 14.2, fill: INK70
      }, group);
    });
  }

  function drawJ1() {
    drawDefs();
    text('AI 评测治理闭环', 90, 220, {
      'font-family': SERIF, 'font-size': 48, 'font-weight': 500
    });
    text('目标定义、调优、评分与上线监控首尾闭合，失败样本持续进入下一轮。', 90, 272, {
      'font-size': 20.5, fill: INK70
    });
    sectionLabel();
    drawRing();
    STEPS.forEach(drawNode);
    STEPS.forEach(drawStepCard);
  }

  drawJ1();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
