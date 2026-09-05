(function () {
  'use strict';

  var svg = document.querySelector('.scene');
  var NS = 'http://www.w3.org/2000/svg';
  var INK = 'var(--ink)';
  var INK80 = 'var(--ink-80)';
  var INK70 = 'var(--ink-70)';
  var INK45 = 'var(--ink-45)';
  var PANEL = 'var(--paper-panel)';
  var FUNCTIONAL = 'var(--wp-color-functional)';
  var SANS = 'var(--sans)';
  var MONO = 'var(--mono)';
  var SERIF = 'var(--serif)';
  var AXIS_X = 540;

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

  function drawTicks() {
    for (var tickY = 338, tickIndex = 0; tickY <= 1148; tickY += 18, tickIndex++) {
      var major = tickIndex % 5 === 0;
      line(AXIS_X - (major ? 10 : 6), tickY, AXIS_X + (major ? 10 : 6), tickY, {
        stroke: INK,
        'stroke-width': major ? 1 : .5,
        opacity: major ? .34 : .18
      });
    }
  }

  function drawMilestone(item, milestoneIndex) {
    var isLeft = milestoneIndex % 2 === 0;
    var centerY = 365 + milestoneIndex * 150;
    var cardX = isLeft ? 90 : 620;
    var cardW = 370;
    var innerX = cardX + 24;
    var connectorStart = isLeft ? cardX + cardW : AXIS_X;
    var connectorEnd = isLeft ? AXIS_X : cardX;
    var group = el('g', {
      'data-layout-zone': 'b1.milestone-' + (milestoneIndex + 1),
      'data-slot-id': 'milestone-' + (milestoneIndex + 1)
    });

    line(connectorStart, centerY, connectorEnd, centerY, {
      stroke: INK70,
      'stroke-width': item.hot ? 1.4 : .8
    }, group);

    if (item.hot) {
      el('circle', { id: 'b1-hot-dot', cx: AXIS_X, cy: centerY, r: 5, fill: INK }, group);
      el('circle', { id: 'b1-hot-ring-1', cx: AXIS_X, cy: centerY, r: 16, fill: PANEL, stroke: INK, 'stroke-width': 1.5 }, group);
      el('circle', { id: 'b1-hot-ring-2', cx: AXIS_X, cy: centerY, r: 22, fill: 'none', stroke: INK, 'stroke-width': .7, opacity: .48 }, group);
      el('circle', { cx: AXIS_X, cy: centerY, r: 5, fill: INK }, group);
    } else {
      el('circle', { cx: AXIS_X, cy: centerY, r: 10, fill: PANEL, stroke: INK80, 'stroke-width': 1.1 }, group);
      el('circle', { cx: AXIS_X, cy: centerY, r: 3, fill: INK80 }, group);
    }

    text(item.year, innerX, centerY - 18, {
      id: item.hot ? 'b1-hot-year' : '',
      'font-family': MONO,
      'font-size': 25,
      'font-weight': 400,
      fill: INK80
    }, group);
    text(item.name, innerX + 102, centerY - 18, {
      id: item.hot ? 'b1-hot-name' : '',
      'font-family': MONO,
      'font-size': 21,
      'font-weight': 400,
      'letter-spacing': .8,
      fill: FUNCTIONAL
    }, group);
    text(item.org, innerX, centerY + 17, {
      id: item.hot ? 'b1-hot-org' : '',
      'font-size': 18,
      fill: INK70
    }, group);
    if (item.note) {
      text(item.note, innerX, centerY + 43, {
        id: item.hot ? 'b1-hot-note' : '',
        'font-size': 15,
        'font-weight': item.hot ? 400 : 300,
        fill: item.hot ? INK : INK45
      }, group);
    }
    if (item.hot) {
      line(innerX, centerY + 50, cardX + cardW - 24, centerY + 50, {
        id: 'b1-hot-underline',
        stroke: INK,
        'stroke-width': 1,
        opacity: .75
      }, group);
    }
  }

  function drawB1() {
    text('大模型演进的六个里程碑', 90, 222, { 'font-family': SERIF, 'font-size': 50, 'font-weight': 500 });
    text('沿纵向时间轴从 2018 推进到 2025；左右交替，顺序不变。', 90, 274, { 'font-size': 24, fill: INK70 });
    line(AXIS_X, 330, AXIS_X, 1168, { stroke: INK80, 'stroke-width': 1.2 });
    drawTicks();
    [
      { year: '2018', name: 'GPT-1', org: '预训练雏形', note: '1.17 亿参数 · 证明可行性', hot: false },
      { year: '2019', name: 'GPT-2', org: '规模跃迁', note: '', hot: false },
      { year: '2020', name: 'GPT-3', org: '涌现能力', note: '', hot: false },
      { year: '2022', name: 'ChatGPT', org: '对话破圈', note: '', hot: false },
      { year: '2023', name: 'GPT-4', org: '多模态', note: '推理 · 多模态 · 月活破亿', hot: true },
      { year: '2025', name: 'o1 / o3', org: '推理模型', note: '思维链 · 自我反思', hot: false }
    ].forEach(drawMilestone);
    el('path', { d: 'M 531 1161 L 540 1171 L 549 1161', fill: 'none', stroke: INK80, 'stroke-width': 1.2 });
  }

  drawB1();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
