(function () {
  'use strict';

  var svg = document.querySelector('.scene');
  var NS = 'http://www.w3.org/2000/svg';
  var INK = 'var(--ink)';
  var INK80 = 'var(--ink-80)';
  var INK70 = 'var(--ink-70)';
  var INK45 = 'var(--ink-45)';
  var FUNCTIONAL = 'var(--wp-color-functional)';
  var PANEL = 'var(--paper-panel)';
  var SANS = 'var(--sans)';
  var MONO = 'var(--mono)';
  var SERIF = 'var(--serif)';
  var X0 = 200;
  var X1 = 990;
  var QUARTER_W = (X1 - X0) / 6;
  var QUARTERS = ['25Q3', '25Q4', '26Q1', '26Q2', '26Q3', '26Q4'];

  function el(tag, attrs, parent) {
    var node = document.createElementNS(NS, tag);
    Object.keys(attrs || {}).forEach(function (key) { node.setAttribute(key, attrs[key]); });
    (parent || svg).appendChild(node);
    return node;
  }

  function text(value, x, y, attrs, parent) {
    var node = el('text', Object.assign({ x: x, y: y, fill: INK, 'font-family': SANS, 'font-weight': 300 }, attrs || {}), parent);
    node.textContent = value;
    return node;
  }

  function line(x1, y1, x2, y2, attrs, parent) {
    return el('line', Object.assign({ x1: x1, y1: y1, x2: x2, y2: y2, stroke: INK, 'stroke-width': 1 }, attrs || {}), parent);
  }

  function quarterX(index) {
    return X0 + index * QUARTER_W;
  }

  function drawQuarterRuler() {
    line(X0, 350, X1, 350, { id: 'b3-quarter-axis', stroke: INK80, 'stroke-width': 1.6 });
    for (var quarterIndex = 0; quarterIndex <= 6; quarterIndex++) {
      var x = quarterX(quarterIndex);
      line(x, 350, x, 1120, { stroke: INK, 'stroke-width': .55, 'stroke-dasharray': '3 7', opacity: .22 });
      line(x, 350, x, 365, { stroke: INK80, 'stroke-width': 1 });
      if (quarterIndex < 6) {
        text(QUARTERS[quarterIndex], x + QUARTER_W / 2, 332, Object.assign({ 'data-xp-anchor': 'quarter',
          'font-family': MONO,
          'font-size': 14,
          'letter-spacing': 1.1,
          'text-anchor': 'middle',
          fill: INK70
        }, quarterIndex === 0 ? { id: 'b3-focus-quarter' } : {}));
        line(x + QUARTER_W / 2, 350, x + QUARTER_W / 2, 358, { stroke: INK45, 'stroke-width': .6 });
      }
    }
  }

  function drawLaneLabel(lane, laneIndex) {
    var group = el('g', {
      'data-layout-zone': 'b3.lane-' + (laneIndex + 1),
      'data-slot-id': lane.slot
    });
    text(lane.no + ' · ' + lane.en, 90, lane.y - 11, { 'font-family': MONO, 'font-size': 13, 'letter-spacing': 1.2, fill: FUNCTIONAL }, group);
    text(lane.cn, 90, lane.y + 19, { 'font-size': 18, fill: INK70 }, group);
    line(154, lane.y, X0 - 12, lane.y, { stroke: INK45, 'stroke-width': .8 }, group);
    return group;
  }

  function drawSpan(start, end, laneY, en, cn, filled, parent, cnLift) {
    var x1 = quarterX(start);
    var x2 = quarterX(end);
    el('rect', {
      x: x1,
      y: laneY - 32,
      width: x2 - x1,
      height: 64,
      fill: filled ? 'url(#b3-hatch)' : PANEL,
      stroke: INK80,
      'stroke-width': 1.15
    }, parent);
    line(x1, laneY - 43, x1, laneY + 43, { stroke: INK80, 'stroke-width': 1 }, parent);
    line(x2, laneY - 43, x2, laneY + 43, { stroke: INK80, 'stroke-width': 1 }, parent);
    text(en, (x1 + x2) / 2, laneY + 5, {
      'font-family': MONO,
      'font-size': 14,
      'font-weight': 400,
      'letter-spacing': .7,
      'text-anchor': 'middle'
    }, parent);
    text(cn, x1 + 4, laneY - (cnLift || 49), { 'font-size': 16, fill: INK70 }, parent);
  }

  function drawMilestone(at, laneY, en, cn, parent) {
    var x = quarterX(at);
    el('circle', { cx: x, cy: laneY, r: 11, fill: PANEL, stroke: INK80, 'stroke-width': 1.2 }, parent);
    el('circle', { cx: x, cy: laneY, r: 4, fill: INK80 }, parent);
    el('circle', { cx: x, cy: laneY, r: 17, fill: 'none', stroke: INK45, 'stroke-width': .6 }, parent);
    text(en, x, laneY - 43, { 'font-family': MONO, 'font-size': 12, 'font-weight': 400, 'letter-spacing': .6, 'text-anchor': 'middle' }, parent);
    text(cn, x, laneY + 59, { 'font-size': 15, fill: INK70, 'text-anchor': 'middle' }, parent);
  }

  function drawB3() {
    text('AI 产品三泳道并行路线图', 90, 222, { 'font-family': SERIF, 'font-size': 50, 'font-weight': 500 });
    text('模型、数据、应用共享六个季度；纵向对齐表示同期推进。', 90, 274, { 'font-size': 24, fill: INK70 });
    drawQuarterRuler();
    line(X0, 615, X1, 615, { stroke: INK45, 'stroke-width': .6, opacity: .5 });
    line(X0, 865, X1, 865, { stroke: INK45, 'stroke-width': .6, opacity: .5 });

    var modelLane = drawLaneLabel({ no: 'L1', en: 'MODEL', cn: '模型层', y: 490, slot: 'model' }, 0);
    drawSpan(0, 2, 490, 'V1 · BASE MODEL', '基座模型 v1 上线', true, modelLane);
    drawSpan(2, 4, 490, 'V2 · FINE-TUNE', '微调 v2 灰度', false, modelLane);
    drawMilestone(4.5, 490, 'STRESS 10K', '万级语料压测', modelLane);

    var dataLane = drawLaneLabel({ no: 'L2', en: 'DATA', cn: '数据层', y: 740, slot: 'data' }, 1);
    drawSpan(1, 3, 740, 'PIPELINE-2', '第二条管线接入', false, dataLane);
    drawSpan(3, 6, 740, 'CLEANROOM CERT', '清洗间认证', true, dataLane, 72);
    drawMilestone(3, 740, 'FIRST PIPE', '首个数据管线交付', dataLane);

    var appsLane = drawLaneLabel({ no: 'L3', en: 'APPS', cn: '应用层', y: 990, slot: 'apps' }, 2);
    drawSpan(0, 3, 990, 'CORPUS BASE', '语料底座', true, appsLane);
    drawSpan(4, 6, 990, 'MULTIMODAL', '多模态融合', false, appsLane);
    drawMilestone(3.5, 990, 'AUTO EVAL', '评测自动化', appsLane);

    text('AI PRODUCT · MODEL / DATA / APPS SWIMLANE ROADMAP', 595, 1164, { 'font-family': MONO, 'font-size': 11, 'letter-spacing': 1.8, 'text-anchor': 'middle', fill: INK45 });
    text('ALL DATA FICTIONAL', 595, 1184, { 'font-family': MONO, 'font-size': 10, 'letter-spacing': 1.5, 'text-anchor': 'middle', fill: INK45 });
  }

  drawB3();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
