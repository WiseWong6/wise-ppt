(function () {
  'use strict';

  var svg = document.querySelector('.scene');
  var NS = 'http://www.w3.org/2000/svg';
  var INK = 'var(--ink)';
  var INK80 = 'var(--ink-80)';
  var INK70 = 'var(--ink-70)';
  var INK55 = 'var(--ink-55)';
  var INK45 = 'var(--ink-45)';
  var PAPER = 'var(--paper)';
  var PANEL = 'var(--paper-panel)';
  var SANS = 'var(--sans)';
  var MONO = 'var(--mono)';
  var SERIF = 'var(--serif)';
  var WEEK_SCORES = [31, 34, 33, 38, 42, 41, 47, 52];
  var BENCHMARKS = [
    { value: 92, label: 'MMLU', focus: true },
    { value: 87, label: 'HEVAL' },
    { value: 81, label: 'GSM8K' },
    { value: 76, label: 'BBH' },
    { value: 68, label: 'TRUTH' },
    { value: 61, label: 'ARC' }
  ];
  var CALL_MIX = [
    { value: 46, label: '推理', start: -90, end: 75.6, pattern: true, labelAngle: -7.2 },
    { value: 33, label: '训练', start: 75.6, end: 194.4, labelAngle: 135 },
    { value: 21, label: '嵌入', start: 194.4, end: 270, labelAngle: 232.2 }
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
    var hatch33 = el('pattern', {
      id: 'c2-hatch33', width: 7, height: 7,
      patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)'
    }, defs);
    line(0, 0, 0, 7, { stroke: INK, 'stroke-width': .7, opacity: .32 }, hatch33);
    var hatch92 = el('pattern', {
      id: 'c2-hatch92', width: 7, height: 7,
      patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)'
    }, defs);
    line(0, 0, 0, 7, {
      id: 'hatch92-line', stroke: INK, 'stroke-width': .7, opacity: .55
    }, hatch92);
  }

  function drawSectionLabel() {
    var group = el('g', { 'data-layout-zone': 'c2.section', 'data-slot-id': 'section-label' });
    text('01 / MODEL BENCHMARK WALL', 90, 309, {
      'font-family': MONO, 'font-size': 11, 'letter-spacing': 1.8, fill: INK45
    }, group);
    line(370, 305, 990, 305, { stroke: INK45, 'stroke-width': .65 }, group);
    text('TREND + TASK SCORE + CALL MIX', 990, 309, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.2,
      'text-anchor': 'end', fill: INK45
    }, group);
  }

  function drawChartTitle(label, x, y, width, parent) {
    text(label, x, y, {
      'data-xp-anchor': 'chart-title',
      'font-family': MONO, 'font-size': 10, 'letter-spacing': 1.5, fill: INK
    }, parent);
    line(x, y + 13, x + width, y + 13, { stroke: INK45, 'stroke-width': .6 }, parent);
  }

  function drawTrendChart() {
    var group = el('g', {
      'data-layout-zone': 'c2.trend-chart',
      'data-slot-id': 'weekly-benchmark-score',
      'data-fixed-quantity': '8',
      'data-repeat-unit': 'week-score'
    });
    drawChartTitle('CHART 01 — WEEKLY BENCHMARK SCORE', 120, 378, 300, group);
    var left = 150, right = 950, top = 426, bottom = 674;
    line(left, top, left, bottom, { stroke: INK70, 'stroke-width': .8 }, group);
    line(left, bottom, right, bottom, { stroke: INK70, 'stroke-width': .8 }, group);
    [0, 20, 40, 60].forEach(function (tick) {
      var y = bottom - tick * 3.8;
      line(left - 6, y, left, y, { stroke: INK55, 'stroke-width': .75 }, group);
      text(String(tick), left - 12, y + 4, {
        'font-family': MONO, 'font-size': 9, 'text-anchor': 'end', fill: INK45
      }, group);
      line(left, y, right, y, { stroke: INK45, 'stroke-width': .4, 'stroke-dasharray': '2 6', opacity: .6 }, group);
    });
    var points = WEEK_SCORES.map(function (score, scoreIndex) {
      return [190 + scoreIndex * 106, bottom - score * 3.8];
    });
    el('path', {
      d: 'M ' + points.map(function (point) { return point[0] + ' ' + point[1]; }).join(' L '),
      fill: 'none', stroke: INK80, 'stroke-width': 1.35
    }, group);
    points.forEach(function (point, scoreIndex) {
      var peak = scoreIndex === points.length - 1;
      el('circle', {
        cx: point[0], cy: point[1], r: peak ? 4.5 : 3.4,
        fill: peak ? INK : PAPER, stroke: INK80, 'stroke-width': peak ? 1.35 : 1
      }, group);
      text('W' + (24 + scoreIndex), point[0], bottom + 26, {
        'font-family': MONO, 'font-size': 8.8, 'text-anchor': 'middle', fill: INK45
      }, group);
    });
    var peakPoint = points[points.length - 1];
    line(peakPoint[0], peakPoint[1] - 8, peakPoint[0], top, {
      stroke: INK55, 'stroke-width': .6, 'stroke-dasharray': '3 4'
    }, group);
    text('PEAK 52', peakPoint[0], top - 10, {
      'font-family': MONO, 'font-size': 9.2, 'letter-spacing': 1.4,
      'text-anchor': 'middle'
    }, group);
  }

  function drawBenchmarkChart() {
    var group = el('g', {
      'data-layout-zone': 'c2.benchmark-bars',
      'data-slot-id': 'task-benchmark-bars',
      'data-fixed-quantity': '6'
    });
    drawChartTitle('CHART 02 — TASK BENCHMARK (%)', 116, 798, 250, group);
    var left = 126, right = 500, top = 844, bottom = 1092;
    line(left, top, left, bottom, { stroke: INK70, 'stroke-width': .8 }, group);
    line(left, bottom, right, bottom, { stroke: INK70, 'stroke-width': .8 }, group);
    BENCHMARKS.forEach(function (item, itemIndex) {
      var x = 146 + itemIndex * 57;
      var height = item.value * 2.32;
      var y = bottom - height;
      var bar = el('g', {
        'data-layout-zone': 'c2.benchmark-' + (itemIndex + 1),
        'data-repeat-unit': 'benchmark-bar',
        'data-score': String(item.value)
      }, group);
      el('rect', {
        id: item.focus ? 'c2-focus-bar' : 'c2-bar-' + (itemIndex + 1),
        x: x, y: y, width: 34, height: height,
        fill: item.focus ? 'url(#c2-hatch92)' : 'none',
        stroke: INK80, 'stroke-width': 1.05
      }, bar);
      text(item.value + '%', x + 17, y - 8, {
        id: item.focus ? 'c2-focus-value' : 'c2-value-' + (itemIndex + 1),
        'font-family': MONO, 'font-size': 8.6, 'text-anchor': 'middle'
      }, bar);
      text(item.label, x + 17, bottom + 23, {
        'font-family': MONO, 'font-size': 7.6, 'text-anchor': 'middle', fill: INK45
      }, bar);
    });
    text('6 TASKS · DESCENDING SCORE', 116, 1140, {
      'font-family': MONO, 'font-size': 8.5, 'letter-spacing': 1.15, fill: INK45
    }, group);
  }

  function pointOnCircle(cx, cy, radius, angle) {
    var radians = angle * Math.PI / 180;
    return { x: cx + radius * Math.cos(radians), y: cy - radius * Math.sin(radians) };
  }

  function ringSegment(cx, cy, outerRadius, innerRadius, startAngle, endAngle) {
    var outerStart = pointOnCircle(cx, cy, outerRadius, startAngle);
    var innerStart = pointOnCircle(cx, cy, innerRadius, startAngle);
    var outerEnd = pointOnCircle(cx, cy, outerRadius, endAngle);
    var innerEnd = pointOnCircle(cx, cy, innerRadius, endAngle);
    var large = Math.abs(endAngle - startAngle) > 180 ? 1 : 0;
    return 'M ' + innerStart.x + ' ' + innerStart.y +
      ' L ' + outerStart.x + ' ' + outerStart.y +
      ' A ' + outerRadius + ' ' + outerRadius + ' 0 ' + large + ' 1 ' + outerEnd.x + ' ' + outerEnd.y +
      ' L ' + innerEnd.x + ' ' + innerEnd.y +
      ' A ' + innerRadius + ' ' + innerRadius + ' 0 ' + large + ' 0 ' + innerStart.x + ' ' + innerStart.y + ' Z';
  }

  function drawCallMixChart() {
    var group = el('g', {
      'data-layout-zone': 'c2.call-mix',
      'data-slot-id': 'three-load-call-mix',
      'data-fixed-quantity': '3'
    });
    drawChartTitle('CHART 03 — CALL MIX', 581, 798, 190, group);
    var cx = 772, cy = 955, outerRadius = 104, innerRadius = 63;
    CALL_MIX.forEach(function (item, itemIndex) {
      var segment = el('g', {
        'data-layout-zone': 'c2.call-segment-' + (itemIndex + 1),
        'data-repeat-unit': 'call-mix-segment',
        'data-call-type': item.label,
        'data-call-percent': String(item.value)
      }, group);
      el('path', {
        d: ringSegment(cx, cy, outerRadius, innerRadius, item.start, item.end),
        fill: item.pattern ? 'url(#c2-hatch33)' : 'none',
        stroke: INK80, 'stroke-width': .9
      }, segment);
      var edge = pointOnCircle(cx, cy, outerRadius, item.labelAngle);
      var labelPoint = pointOnCircle(cx, cy, 143, item.labelAngle);
      line(edge.x, edge.y, labelPoint.x, labelPoint.y, {
        stroke: INK55, 'stroke-width': .6, 'stroke-dasharray': '3 4'
      }, segment);
      el('rect', {
        x: labelPoint.x - 29, y: labelPoint.y - 20, width: 58, height: 41,
        fill: PAPER, 'data-path-mask': 'c2.call-mix-label'
      }, segment);
      text(item.value + '%', labelPoint.x, labelPoint.y - 6, {
        'font-family': MONO, 'font-size': 10, 'letter-spacing': .8,
        'text-anchor': 'middle'
      }, segment);
      text(item.label, labelPoint.x, labelPoint.y + 15, {
        'font-size': 10.5, 'text-anchor': 'middle', fill: INK70
      }, segment);
    });
    text('100%', cx, cy + 2, {
      'font-family': MONO, 'font-size': 18, 'letter-spacing': .8,
      'text-anchor': 'middle'
    }, group);
    text('N=3 MIX', cx, cy + 26, {
      'font-family': MONO, 'font-size': 8.5, 'letter-spacing': 1.3,
      'text-anchor': 'middle', fill: INK45
    }, group);
    text('INFERENCE · TRAINING · EMBEDDING', 772, 1140, {
      'font-family': MONO, 'font-size': 8.2, 'letter-spacing': 1.05,
      'text-anchor': 'middle', fill: INK45
    }, group);
  }

  function drawReadingGuide() {
    var group = el('g', {
      'data-layout-zone': 'c2.reading-guide',
      'data-slot-id': 'chart-wall-reading-guide'
    });
    line(90, 1194, 990, 1194, { stroke: INK45, 'stroke-width': .6 }, group);
    text('TREND → TASK SCORE + LOAD MIX', 90, 1224, {
      'font-family': MONO, 'font-size': 9.2, 'letter-spacing': 1.35, fill: INK45
    }, group);
    text('3 CHARTS · ONE BENCHMARK VIEW', 990, 1224, {
      'font-family': MONO, 'font-size': 9.2, 'letter-spacing': 1.25,
      'text-anchor': 'end', fill: INK45
    }, group);
  }

  function drawC2() {
    drawDefs();
    text('单项峰值，不等于完整资源表现', 90, 214, {
      'font-family': SERIF, 'font-size': 45, 'font-weight': 500
    });
    text('先读八周趋势，再对照六项任务得分与三类调用负载。', 90, 266, {
      'font-size': 19, fill: INK70
    });
    drawSectionLabel();
    drawTrendChart();
    drawBenchmarkChart();
    drawCallMixChart();
    drawReadingGuide();
  }

  drawC2();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
