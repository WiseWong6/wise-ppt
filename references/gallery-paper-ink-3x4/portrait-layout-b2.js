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
  var AXIS_LEFT = 248;
  var AXIS_RIGHT = 958;
  var AXIS_Y = 300;
  var BAR_H = 60;
  var GRID_BOTTOM = 1140;

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

  function mapSecond(second) {
    return AXIS_LEFT + second * (AXIS_RIGHT - AXIS_LEFT) / 90;
  }

  function drawRuler() {
    line(AXIS_LEFT, AXIS_Y, AXIS_RIGHT, AXIS_Y, { stroke: INK80, 'stroke-width': 1.1 });
    for (var second = 0; second <= 90; second += 5) {
      var x = mapSecond(second);
      var major = second % 15 === 0;
      line(x, AXIS_Y - (major ? 12 : 7), x, AXIS_Y + (major ? 12 : 7), {
        stroke: INK80, 'stroke-width': major ? 1 : .65, opacity: major ? .85 : .42
      });
      if (major) {
        text(String(second), x, AXIS_Y - 24, {
          'font-family': MONO, 'font-size': 16, 'text-anchor': 'middle', fill: INK70
        });
        line(x, AXIS_Y + 18, x, GRID_BOTTOM, {
          stroke: INK, 'stroke-width': .5, 'stroke-dasharray': '3 7', opacity: .18
        });
      }
    }
    text('SEC', AXIS_RIGHT + 30, AXIS_Y + 5, { 'font-family': MONO, 'font-size': 13, 'letter-spacing': 2, fill: INK45 });
    el('path', { d: 'M 948 368 L 958 376 L 948 384', fill: 'none', stroke: INK80, 'stroke-width': 1 });
  }

  function drawStageLabel(stage, stageIndex) {
    var group = el('g', {
      'data-layout-zone': 'b2.stage-' + (stageIndex + 1),
      'data-slot-id': stage.slot
    });
    text(('0' + (stageIndex + 1)).slice(-2), 92, stage.y - 15, {
      'font-family': MONO, 'font-size': 13, fill: INK45
    }, group);
    text(stage.en, 124, stage.y - 14, {
      'data-xp-anchor': 'stage-en',
      'font-family': MONO, 'font-size': 18, 'font-weight': 400, 'letter-spacing': 1,
      fill: FUNCTIONAL
    }, group);
    text(stage.zh, 124, stage.y + 16, { 'font-size': 18, fill: INK70 }, group);
    text(stage.range, 124, stage.y + 42, {
      'font-family': MONO, 'font-size': 13, 'letter-spacing': .4, fill: INK45
    }, group);
    line(90, stage.y + 65, 970, stage.y + 65, { stroke: INK45, 'stroke-width': .55, opacity: .34 }, group);
    return group;
  }

  function drawBar(x1, x2, y, parent, highlighted) {
    el('rect', {
      x: x1, y: y - BAR_H / 2, width: x2 - x1, height: BAR_H,
      fill: 'url(#b2-hatch)', stroke: INK80,
      'stroke-width': highlighted ? 1.5 : 1.05
    }, parent);
    line(x1, y - BAR_H / 2 - 6, x1, y + BAR_H / 2 + 6, { stroke: INK80 }, parent);
    line(x2, y - BAR_H / 2 - 6, x2, y + BAR_H / 2 + 6, { stroke: INK80 }, parent);
  }

  function drawSftBreak(stage, parent) {
    var startX = mapSecond(stage.start);
    var gapX1 = mapSecond(stage.gapStart);
    var gapX2 = mapSecond(stage.gapEnd);
    var endX = mapSecond(stage.end);
    var gapCenter = (gapX1 + gapX2) / 2;
    drawBar(startX, gapX1, stage.y, parent, true);
    drawBar(gapX2, endX, stage.y, parent, true);
    el('rect', {
      x: gapX1, y: stage.y - BAR_H / 2, width: gapX2 - gapX1, height: BAR_H,
      fill: PAPER, stroke: INK45, 'stroke-width': .7, 'stroke-dasharray': '4 5'
    }, parent);
    for (var frayIndex = 0; frayIndex < 6; frayIndex += 1) {
      var y = stage.y - 22 + frayIndex * 9;
      line(gapX1, y, gapX1 + 8, y + 5, { stroke: INK80, 'stroke-width': .8, opacity: .72 }, parent);
      line(gapX2, y, gapX2 - 8, y + 5, { stroke: INK80, 'stroke-width': .8, opacity: .72 }, parent);
    }
    el('ellipse', { id: 'b2-ring-1', cx: gapCenter, cy: stage.y, rx: 72, ry: 48, fill: 'none', stroke: INK80, 'stroke-width': 1.3, transform: 'rotate(-3 ' + gapCenter + ' ' + stage.y + ')' }, parent);
    el('ellipse', { id: 'b2-ring-2', cx: gapCenter + 2, cy: stage.y + 1, rx: 77, ry: 52, fill: 'none', stroke: INK80, 'stroke-width': .75, opacity: .48, transform: 'rotate(2 ' + gapCenter + ' ' + stage.y + ')' }, parent);
    text('34→47', gapCenter, stage.y + 5, { 'font-family': MONO, 'font-size': 12, 'text-anchor': 'middle', fill: INK }, parent);
    line(gapCenter, stage.y - 54, gapCenter, stage.y - 82, { stroke: INK80, 'stroke-width': .9 }, parent);
    text('SFT HALT · GPU OOM@N-128', gapCenter, stage.y - 108, {
      id: 'sample-focus', 'font-family': MONO, 'font-size': 13, 'font-weight': 400,
      'letter-spacing': .6, 'text-anchor': 'middle'
    }, parent);
    text('显存溢出中断 · 触发检查点回滚', gapCenter, stage.y - 82, {
      id: 'b2-failure-note', 'font-size': 15, 'text-anchor': 'middle', fill: INK70
    }, parent);
  }

  function drawB2() {
    text('模型训练的 90 秒甘特瀑布', 90, 222, { 'font-family': SERIF, 'font-size': 50, 'font-weight': 500 });
    text('四个阶段共用一条水平时间轴；越靠右，发生得越晚。', 90, 274, { 'font-size': 24, fill: INK70 });
    drawRuler();
    [
      { slot: 'data', y: 440, en: 'DATA', zh: '数据准备', start: 2, end: 11, duration: '9S', range: '02→11 · 9S' },
      { slot: 'pretrain', y: 650, en: 'PRETRAIN', zh: '预训练', start: 8, end: 24, duration: '16S', range: '08→24 · 16S' },
      { slot: 'sft', y: 860, en: 'SFT', zh: '监督微调', start: 20, end: 58, gapStart: 34, gapEnd: 47, range: '20→58 · GAP', hot: true },
      { slot: 'rlhf', y: 1070, en: 'RLHF', zh: '人类反馈对齐', start: 52, end: 84, duration: '32S', range: '52→84 · 32S' }
    ].forEach(function (stage, stageIndex) {
      var group = drawStageLabel(stage, stageIndex);
      if (stage.hot) drawSftBreak(stage, group);
      else {
        drawBar(mapSecond(stage.start), mapSecond(stage.end), stage.y, group, false);
        text(stage.duration, (mapSecond(stage.start) + mapSecond(stage.end)) / 2, stage.y + 5, {
          'font-family': MONO, 'font-size': 13, 'text-anchor': 'middle', fill: INK80
        }, group);
      }
    });
  }

  drawB2();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
