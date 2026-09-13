(function () {
  'use strict';

  var svg = document.querySelector('.scene');
  var NS = 'http://www.w3.org/2000/svg';
  var INK = 'var(--ink)';
  var INK80 = 'var(--ink-80)';
  var INK70 = 'var(--ink-70)';
  var INK45 = 'var(--ink-45)';
  var PANEL = 'var(--paper-panel)';
  var DEEP = 'var(--paper-deep)';
  var FUNCTIONAL = 'var(--wp-color-functional)';
  var SANS = 'var(--sans)';
  var MONO = 'var(--mono)';
  var SERIF = 'var(--serif)';

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

  function doublePanel(x, y, width, height, attrs, parent) {
    var group = el('g', attrs || {}, parent);
    el('rect', { x: x, y: y, width: width, height: height, fill: PANEL, stroke: INK80, 'stroke-width': 1.2 }, group);
    el('rect', { x: x + 5, y: y + 5, width: width - 10, height: height - 10, fill: 'none', stroke: INK45, 'stroke-width': .6 }, group);
    return group;
  }

  function drawReader(x, y, parent) {
    line(x - 68, y + 64, x + 68, y + 64, { stroke: INK45, 'stroke-dasharray': '3 5' }, parent);
    [x - 34, x + 34].forEach(function (wheelX) {
      el('circle', { cx: wheelX, cy: y + 45, r: 17, fill: DEEP, stroke: INK80, 'stroke-width': 1.1 }, parent);
      el('circle', { cx: wheelX, cy: y + 45, r: 5, fill: 'none', stroke: INK45, 'stroke-width': .7 }, parent);
    });
    el('rect', { x: x - 58, y: y - 24, width: 116, height: 62, rx: 12, fill: 'none', stroke: INK80, 'stroke-width': 1.2 }, parent);
    line(x, y - 24, x, y - 52, { stroke: INK80 }, parent);
    el('circle', { cx: x, cy: y - 63, r: 10, fill: DEEP, stroke: INK80, 'stroke-width': 1.1 }, parent);
    el('path', { d: 'M' + (x - 34) + ' ' + (y - 82) + ' A38 38 0 0 1 ' + (x + 34) + ' ' + (y - 82), fill: 'none', stroke: INK45, 'stroke-width': .7, 'stroke-dasharray': '3 5' }, parent);
  }

  function drawSkillGraph(x, y, parent) {
    line(x, y - 82, x, y + 78, { stroke: INK45, 'stroke-dasharray': '3 5' }, parent);
    el('path', { d: 'M' + (x - 4) + ' ' + (y + 68) + ' C' + (x - 52) + ' ' + (y + 28) + ' ' + (x + 46) + ' ' + (y - 8) + ' ' + (x + 4) + ' ' + (y - 52) + ' C' + (x - 30) + ' ' + (y - 78) + ' ' + (x + 24) + ' ' + (y - 92) + ' ' + (x + 6) + ' ' + (y - 102), fill: 'none', stroke: INK80, 'stroke-width': 1.1, 'stroke-dasharray': '5 5' }, parent);
    [[-64, -50], [62, -18], [-42, 34], [58, 62]].forEach(function (point, index) {
      line(x, y + point[1], x + point[0], y + point[1], { stroke: INK45 }, parent);
      el('circle', { cx: x + point[0], cy: y + point[1], r: 7, fill: DEEP, stroke: INK80, 'stroke-width': 1 }, parent);
    });
  }

  function drawGauge(x, y, parent) {
    var radius = 84;
    el('path', { d: 'M' + (x - radius) + ' ' + y + ' A' + radius + ' ' + radius + ' 0 0 1 ' + (x + radius) + ' ' + y, fill: 'none', stroke: INK80, 'stroke-width': 1.2 }, parent);
    for (var index = 0; index <= 8; index++) {
      var angle = Math.PI - index * Math.PI / 8;
      line(x + Math.cos(angle) * 70, y - Math.sin(angle) * 70, x + Math.cos(angle) * 84, y - Math.sin(angle) * 84, { stroke: INK45, 'stroke-width': index % 2 ? .6 : 1 }, parent);
    }
    var needle = Math.PI * .72;
    line(x, y, x + Math.cos(needle) * 70, y - Math.sin(needle) * 70, { stroke: INK, 'stroke-width': 1.5, opacity: .9 }, parent);
    el('circle', { cx: x, cy: y, r: 6, fill: DEEP, stroke: INK80, 'stroke-width': 1 }, parent);
    text('280ms', x, y + 34, { 'font-family': MONO, 'font-size': 15, 'letter-spacing': 1.4, 'text-anchor': 'middle' }, parent);
  }

  function drawC3() {
    text('三个案例，三种能力证据', 90, 222, { 'font-family': SERIF, 'font-size': 50, 'font-weight': 500 });
    text('卡片等权排列；图形说明对象，指标说明结果。', 90, 274, { 'font-size': 25, fill: INK70 });

    var cards = [
      { tag: 'CASE 01 · AI READER', title: 'AI 阅读系统', foot: 'PRODUCT RD-01 · SINCE 2022', draw: drawReader,
        metrics: [['语料规模', '82,000 DOCS'], ['活跃用户', '68 K'], ['日处理量', '410 K'], ['错误率', '0.02 %']] },
      { tag: 'CASE 02 · SKILLS', title: 'Skills 平台', foot: 'PRODUCT SP-04 · SINCE 2023', draw: drawSkillGraph,
        metrics: [['语料规模', '45,000 SKILLS'], ['活跃用户', '34 K'], ['支持语言', '22 LANGS'], ['平均延迟', '180 MS']] },
      { tag: 'CASE 03 · KNOWLEDGE', title: 'AI 名人知识库', foot: 'PRODUCT KB-02 · SINCE 2024', draw: drawGauge,
        metrics: [['向量维度', '1,536 DIM'], ['活跃用户', '26 K'], ['召回精度', '0.96 @10'], ['存储同比', '-19 %']] }
    ];

    cards.forEach(function (card, cardIndex) {
      var y = 330 + cardIndex * 292;
      var panel = doublePanel(90, y, 900, 274, { 'data-layout-zone': 'c3.case-' + (cardIndex + 1) });
      card.draw(225, y + 142, panel);
      line(360, y + 30, 360, y + 252, { stroke: INK, 'stroke-width': .8, opacity: .5 }, panel);
      line(364, y + 30, 364, y + 142, { stroke: INK, 'stroke-width': .6, opacity: .25 }, panel);
      text(card.tag, 402, y + 46, Object.assign({
        'font-family': MONO, 'font-size': 14, 'letter-spacing': 2, fill: INK45
      }, cardIndex === 0 ? { id: 'c3-focus-tag', 'data-c3-focus-case': 'true' } : {}), panel);
      text(card.title, 402, y + 90, Object.assign({
        'data-xp-anchor': 'case', 'font-size': 30, 'font-weight': 400
      }, cardIndex === 0 ? { id: 'c3-focus-title', 'data-c3-focus-case': 'true' } : {}), panel);
      line(402, y + 108, 494, y + 108, { 'data-xp-anchor': 'case-rule', stroke: FUNCTIONAL, 'stroke-width': 2.4 }, panel);
      card.metrics.forEach(function (metric, metricIndex) {
        var col = metricIndex % 2;
        var row = Math.floor(metricIndex / 2);
        var x = 402 + col * 280;
        var metricY = y + 156 + row * 72;
        text(metric[0], x, metricY, { 'font-size': 16, fill: INK45 }, panel);
        text(metric[1], x, metricY + 25, { 'font-family': MONO, 'font-size': 18, 'font-weight': 400, fill: INK80 }, panel);
      });
      text(card.foot, 950, y + 254, { 'font-family': MONO, 'font-size': 12, 'letter-spacing': 1.5, fill: INK45, 'text-anchor': 'end' }, panel);
    });
  }

  drawC3();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
