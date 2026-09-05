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

  var SEGMENTS = [
    [[410, 370], [560, 350], [735, 410], [690, 500]],
    [[690, 500], [650, 575], [350, 570], [390, 650]],
    [[390, 650], [430, 730], [735, 720], [690, 800]],
    [[690, 800], [645, 880], [345, 875], [390, 950]],
    [[390, 950], [455, 1015], [675, 1040], [610, 1100]],
    [[610, 1100], [570, 1130], [620, 1150], [660, 1170]]
  ];

  function bezier(points, unit) {
    var inverse = 1 - unit;
    return [
      inverse * inverse * inverse * points[0][0] + 3 * inverse * inverse * unit * points[1][0] + 3 * inverse * unit * unit * points[2][0] + unit * unit * unit * points[3][0],
      inverse * inverse * inverse * points[0][1] + 3 * inverse * inverse * unit * points[1][1] + 3 * inverse * unit * unit * points[2][1] + unit * unit * unit * points[3][1]
    ];
  }

  function bezierDerivative(points, unit) {
    var inverse = 1 - unit;
    return [
      3 * inverse * inverse * (points[1][0] - points[0][0]) + 6 * inverse * unit * (points[2][0] - points[1][0]) + 3 * unit * unit * (points[3][0] - points[2][0]),
      3 * inverse * inverse * (points[1][1] - points[0][1]) + 6 * inverse * unit * (points[2][1] - points[1][1]) + 3 * unit * unit * (points[3][1] - points[2][1])
    ];
  }

  function routePosition(progress) {
    if (progress >= 1) return bezier(SEGMENTS[SEGMENTS.length - 1], 1);
    var scaled = Math.max(0, progress) * SEGMENTS.length;
    var segmentIndex = Math.min(SEGMENTS.length - 1, Math.floor(scaled));
    return bezier(SEGMENTS[segmentIndex], scaled - segmentIndex);
  }

  function routeNormal(progress) {
    var safeProgress = progress >= 1 ? 1 - .000001 : Math.max(0, progress);
    var scaled = safeProgress * SEGMENTS.length;
    var segmentIndex = Math.min(SEGMENTS.length - 1, Math.floor(scaled));
    var direction = bezierDerivative(SEGMENTS[segmentIndex], scaled - segmentIndex);
    var length = Math.hypot(direction[0], direction[1]);
    return [-direction[1] / length, direction[0] / length];
  }

  function halfWidth(progress) {
    return 31 - 4 * progress;
  }

  function roadEdge(progressStart, progressEnd, side) {
    var path = '';
    var sampleCount = 90;
    for (var sampleIndex = 0; sampleIndex <= sampleCount; sampleIndex++) {
      var progress = progressStart + (progressEnd - progressStart) * sampleIndex / sampleCount;
      var point = routePosition(progress);
      var normal = routeNormal(progress);
      var offset = halfWidth(progress) * side;
      path += (sampleIndex ? ' L ' : 'M ') + (point[0] + normal[0] * offset).toFixed(1) + ' ' + (point[1] + normal[1] * offset).toFixed(1);
    }
    return path;
  }

  function roadCenter(progressStart, progressEnd) {
    var path = '';
    var sampleCount = 90;
    for (var sampleIndex = 0; sampleIndex <= sampleCount; sampleIndex++) {
      var point = routePosition(progressStart + (progressEnd - progressStart) * sampleIndex / sampleCount);
      path += (sampleIndex ? ' L ' : 'M ') + point[0].toFixed(1) + ' ' + point[1].toFixed(1);
    }
    return path;
  }

  function drawMilestone(item, milestoneIndex) {
    var point = routePosition(item.progress);
    var labelOnRight = point[0] < 540;
    var labelX = labelOnRight ? 635 : 90;
    var labelWidth = 355;
    var connectorEnd = labelOnRight ? labelX - 18 : labelX + labelWidth + 18;
    var group = el('g', {
      'data-layout-zone': 'b6.milestone-' + (milestoneIndex + 1),
      'data-slot-id': 'milestone-' + (milestoneIndex + 1)
    });

    /* 道路先画、标签后画；这块同纸色留白保证道路只负责串联节点，不穿过说明文字。 */
    el('rect', {
      x: labelX - 18,
      y: point[1] - 52,
      width: labelWidth + 36,
      height: 100,
      fill: PAPER,
      'data-path-mask': 'b6.milestone-label'
    }, group);

    line(point[0], point[1], connectorEnd, point[1], {
      id: item.focus ? 'b6-focus-leader' : '',
      stroke: INK70,
      'stroke-width': item.focus ? 1.3 : .8,
      'stroke-dasharray': '3 5'
    }, group);
    el('circle', {
      id: item.focus ? 'b6-focus-leader-dot' : '',
      cx: (point[0] + connectorEnd) / 2,
      cy: point[1],
      r: 2.4,
      fill: INK70,
      opacity: .7
    }, group);

    el('circle', {
      id: item.focus ? 'b6-focus-node' : 'b6-step-' + milestoneIndex,
      cx: point[0],
      cy: point[1],
      r: 10,
      fill: PANEL,
      stroke: INK80,
      'stroke-width': item.focus ? 1.5 : 1.2
    }, group);
    el('circle', {
      id: item.focus ? 'b6-focus-node-inner' : '',
      cx: point[0],
      cy: point[1],
      r: 5.6,
      fill: 'none',
      stroke: INK70,
      'stroke-width': .7
    }, group);
    el('circle', {
      id: item.focus ? 'b6-focus-node-core' : '',
      cx: point[0],
      cy: point[1],
      r: 2.4,
      fill: INK80
    }, group);

    text(item.english, labelX, point[1] - 34, {
      id: item.focus ? 'b6-focus-en' : '',
      'font-family': MONO,
      'font-size': 11,
      'letter-spacing': 1.2,
      fill: INK45
    }, group);
    text(item.year, labelX, point[1], {
      id: item.focus ? 'b6-focus-year' : '',
      'font-family': MONO,
      'font-size': 18,
      'font-weight': 400,
      'letter-spacing': 1.2,
      fill: INK80
    }, group);
    line(labelX + 72, point[1] - 22, labelX + 72, point[1] + 7, { stroke: INK45, 'stroke-width': .6 }, group);
    text(item.title, labelX + 90, point[1] + 1, {
      id: item.focus ? 'b6-focus-title' : '',
      'font-size': 22,
      'font-weight': 400
    }, group);
    text(item.note, labelX, point[1] + 34, {
      id: item.focus ? 'b6-focus-note' : '',
      'font-size': 15,
      fill: INK70
    }, group);
  }

  function drawB6() {
    text('十年演进，沿一条路继续蜿蜒', 90, 222, { 'font-family': SERIF, 'font-size': 50, 'font-weight': 500 });
    text('六个节点自上而下推进，2024 之后转入尚未确定的未来段。', 90, 274, { 'font-size': 24, fill: INK70 });

    var T_SPLIT = 4 / 6;
    [-1, 1].forEach(function (side) {
      el('path', { d: roadEdge(0, T_SPLIT, side), fill: 'none', stroke: INK80, 'stroke-width': 1.4 });
      el('path', { d: roadEdge(T_SPLIT, 1, side), fill: 'none', stroke: INK70, 'stroke-width': 1.1, opacity: .58, 'stroke-dasharray': '7 7' });
    });
    el('path', { id: 'b6-road-travelled', d: roadCenter(0, T_SPLIT), fill: 'none', stroke: FUNCTIONAL, 'stroke-width': 2.2 });
    el('path', { id: 'b6-road-future', d: roadCenter(T_SPLIT, 1), fill: 'none', stroke: INK70, 'stroke-width': 1.1, opacity: .55, 'stroke-dasharray': '3 9' });

    [routePosition(0), routePosition(1)].forEach(function (point) {
      line(point[0] - 10, point[1], point[0] + 10, point[1], { stroke: INK45, 'stroke-width': .8 });
      line(point[0], point[1] - 10, point[0], point[1] + 10, { stroke: INK45, 'stroke-width': .8 });
    });

    [
      { progress: 0 / 6, year: '2014', english: 'ATTENTION MECHANISM', title: 'Attention 机制', note: '序列建模对齐走向，长程依赖被打通', focus: false },
      { progress: 1 / 6, year: '2017', english: 'TRANSFORMER', title: 'Transformer', note: '完全自注意架构，并行训练成为可能', focus: false },
      { progress: 2 / 6, year: '2018', english: 'PRETRAIN ERA', title: '预训练时代', note: 'BERT / GPT 双线登场，迁移学习爆发', focus: false },
      { progress: 3 / 6, year: '2022', english: 'RLHF', title: 'RLHF 对齐', note: '人类反馈强化学习，对齐走向可用', focus: false },
      { progress: 4 / 6, year: '2024', english: 'AGENT', title: 'Agent 上线', note: '模型开始调用工具，任务闭环成形', focus: false },
      { progress: 5 / 6, year: '2026', english: 'FUTURE · UNKNOWN', title: '? 未来', note: '下一形态未定，路还在延伸', focus: true }
    ].forEach(drawMilestone);
  }

  drawB6();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
