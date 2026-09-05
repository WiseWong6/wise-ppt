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

  var BASELINE = [
    { title: '输入', note: '固定问题集', icon: 'list' },
    { title: '回答', note: '只保留最终文本', icon: 'message' },
    { title: '评分', note: '结果看似合格', icon: 'star' }
  ];

  var TRACED = [
    { title: '路由', note: '选了哪个 Skill', icon: 'route' },
    { title: '工具', note: '参数与返回值', icon: 'tool' },
    { title: '校验', note: '门禁是否通过', icon: 'check' },
    { title: '证据', note: '结论可追溯', icon: 'file' }
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
    var marker = el('marker', {
      id: 'q3-arrow-portrait', viewBox: '0 0 10 10', refX: 9, refY: 5,
      markerWidth: 7, markerHeight: 7, orient: 'auto'
    }, defs);
    el('path', {
      d: 'M 0 0 L 10 5 L 0 10', fill: 'none',
      stroke: FUNCTIONAL, 'stroke-width': 1.2
    }, marker);
  }

  function drawIcon(kind, cx, cy, parent) {
    if (kind === 'list') {
      [cy - 11, cy, cy + 11].forEach(function (rowY) {
        el('path', {
          d: 'M ' + (cx - 17) + ' ' + rowY + ' L ' + (cx - 14) + ' ' + (rowY + 3) + ' L ' + (cx - 9) + ' ' + (rowY - 3),
          fill: 'none', stroke: FUNCTIONAL, 'stroke-width': 1.2,
          'stroke-linecap': 'round', 'stroke-linejoin': 'round'
        }, parent);
        line(cx - 3, rowY, cx + 18, rowY, { stroke: INK70, 'stroke-width': .8 }, parent);
      });
      return;
    }
    if (kind === 'message') {
      el('path', {
        d: 'M ' + (cx - 20) + ' ' + (cy - 17) + ' H ' + (cx + 20) + ' Q ' + (cx + 25) + ' ' + (cy - 17) + ' ' + (cx + 25) + ' ' + (cy - 12) +
          ' V ' + (cy + 11) + ' Q ' + (cx + 25) + ' ' + (cy + 16) + ' ' + (cx + 20) + ' ' + (cy + 16) + ' H ' + (cx - 4) +
          ' L ' + (cx - 15) + ' ' + (cy + 25) + ' L ' + (cx - 14) + ' ' + (cy + 16) + ' H ' + (cx - 20) + ' Q ' + (cx - 25) + ' ' + (cy + 16) + ' ' + (cx - 25) + ' ' + (cy + 11) +
          ' V ' + (cy - 12) + ' Q ' + (cx - 25) + ' ' + (cy - 17) + ' ' + (cx - 20) + ' ' + (cy - 17) + ' Z',
        fill: 'none', stroke: FUNCTIONAL, 'stroke-width': 1
      }, parent);
      line(cx - 14, cy - 6, cx + 14, cy - 6, { stroke: INK70, 'stroke-width': .7 }, parent);
      line(cx - 14, cy + 3, cx + 7, cy + 3, { stroke: INK70, 'stroke-width': .7 }, parent);
      return;
    }
    if (kind === 'star') {
      el('path', {
        d: 'M ' + cx + ' ' + (cy - 24) + ' L ' + (cx + 7) + ' ' + (cy - 7) + ' L ' + (cx + 25) + ' ' + (cy - 6) +
          ' L ' + (cx + 11) + ' ' + (cy + 5) + ' L ' + (cx + 16) + ' ' + (cy + 23) + ' L ' + cx + ' ' + (cy + 13) +
          ' L ' + (cx - 16) + ' ' + (cy + 23) + ' L ' + (cx - 11) + ' ' + (cy + 5) + ' L ' + (cx - 25) + ' ' + (cy - 6) +
          ' L ' + (cx - 7) + ' ' + (cy - 7) + ' Z',
        fill: 'none', stroke: FUNCTIONAL, 'stroke-width': 1
      }, parent);
      return;
    }
    if (kind === 'route') {
      el('path', {
        d: 'M ' + (cx - 22) + ' ' + (cy + 19) + ' H ' + (cx + 4) + ' Q ' + (cx + 19) + ' ' + (cy + 19) + ' ' + (cx + 19) + ' ' + (cy + 5) +
          ' Q ' + (cx + 19) + ' ' + (cy - 9) + ' ' + (cx + 4) + ' ' + (cy - 9) + ' H ' + (cx - 8) + ' Q ' + (cx - 22) + ' ' + (cy - 9) + ' ' + (cx - 22) + ' ' + (cy - 22) +
          ' Q ' + (cx - 22) + ' ' + (cy - 28) + ' ' + (cx - 15) + ' ' + (cy - 28) + ' H ' + (cx + 22),
        fill: 'none', stroke: FUNCTIONAL, 'stroke-width': 1
      }, parent);
      el('circle', { cx: cx - 27, cy: cy + 19, r: 3, fill: FUNCTIONAL }, parent);
      el('circle', { cx: cx + 27, cy: cy - 28, r: 3, fill: FUNCTIONAL }, parent);
      return;
    }
    if (kind === 'tool') {
      text('API', cx, cy + 8, {
        'font-family': MONO, 'font-size': 19, 'font-weight': 400,
        'letter-spacing': 1.5, 'text-anchor': 'middle', fill: FUNCTIONAL
      }, parent);
      line(cx - 30, cy - 19, cx + 30, cy - 19, { stroke: INK45, 'stroke-width': .7 }, parent);
      line(cx - 30, cy + 20, cx + 30, cy + 20, { stroke: INK45, 'stroke-width': .7 }, parent);
      return;
    }
    if (kind === 'check') {
      el('circle', { cx: cx, cy: cy, r: 25, fill: 'none', stroke: FUNCTIONAL, 'stroke-width': 1 }, parent);
      el('path', {
        d: 'M ' + (cx - 13) + ' ' + cy + ' L ' + (cx - 4) + ' ' + (cy + 9) + ' L ' + (cx + 15) + ' ' + (cy - 12),
        fill: 'none', stroke: FUNCTIONAL, 'stroke-width': 1.5,
        'stroke-linecap': 'round', 'stroke-linejoin': 'round'
      }, parent);
      return;
    }
    el('path', {
      d: 'M ' + (cx - 21) + ' ' + (cy - 26) + ' H ' + (cx + 8) + ' L ' + (cx + 21) + ' ' + (cy - 13) +
        ' V ' + (cy + 25) + ' H ' + (cx - 21) + ' Z M ' + (cx + 8) + ' ' + (cy - 26) + ' V ' + (cy - 13) + ' H ' + (cx + 21),
      fill: 'none', stroke: FUNCTIONAL, 'stroke-width': 1
    }, parent);
    el('path', {
      d: 'M ' + (cx - 10) + ' ' + (cy + 3) + ' L ' + (cx - 3) + ' ' + (cy + 10) + ' L ' + (cx + 11) + ' ' + (cy - 6),
      fill: 'none', stroke: FUNCTIONAL, 'stroke-width': 1.4,
      'stroke-linecap': 'round', 'stroke-linejoin': 'round'
    }, parent);
  }

  function drawFlowArrows(positions, width, y, zone, parent) {
    var group = el('g', { 'data-layout-zone': zone, 'data-slot-id': zone.split('.').pop() }, parent);
    positions.slice(0, -1).forEach(function (x, index) {
      line(x + width + 7, y, positions[index + 1] - 9, y, {
        stroke: FUNCTIONAL, 'stroke-width': 1,
        'marker-end': 'url(#q3-arrow-portrait)'
      }, group);
    });
  }

  function drawStep(step, index, x, y, width, zonePrefix, parent) {
    var group = el('g', {
      'data-layout-zone': zonePrefix + '-' + (index + 1),
      'data-slot-id': zonePrefix.split('.').pop() + '-' + (index + 1)
    }, parent);
    var iconGroup = el('g', { 'data-q3-icon-source': step.icon }, group);
    drawIcon(step.icon, x + width / 2, y + 70, iconGroup);
    text(step.title, x + width / 2, y + 127, {
      'font-size': 20, 'font-weight': 400, 'text-anchor': 'middle'
    }, group);
    text(step.note, x + width / 2, y + 158, {
      'font-size': width < 220 ? 12.2 : 13.5,
      'text-anchor': 'middle', fill: INK70
    }, group);
  }

  function drawBaseline() {
    var group = el('g', { 'data-layout-zone': 'q3.baseline-band', 'data-slot-id': 'baseline' });
    text('BASELINE / OUTPUT ONLY', 90, 342, {
      id: 'q3-focus-label', 'font-family': MONO, 'font-size': 10,
      'letter-spacing': 1.7, fill: INK45
    }, group);
    el('rect', {
      id: 'q3-focus-frame', x: 90, y: 360, width: 900, height: 340,
      fill: PANEL, stroke: FUNCTIONAL, 'stroke-width': 1,
      'data-comparison-frame': 'baseline'
    }, group);
    var positions = [110, 415, 720];
    drawFlowArrows(positions, 250, 530, 'q3.baseline-flow', group);
    BASELINE.forEach(function (step, index) {
      drawStep(step, index, positions[index], 440, 250, 'q3.baseline-step', group);
    });
  }

  function drawTraced() {
    var group = el('g', { 'data-layout-zone': 'q3.traced-band', 'data-slot-id': 'traced' });
    text('TRACED / PROCESS VISIBLE', 90, 762, {
      'font-family': MONO, 'font-size': 10, 'letter-spacing': 1.7, fill: FUNCTIONAL
    }, group);
    el('rect', {
      x: 90, y: 780, width: 900, height: 340,
      fill: PANEL, stroke: FUNCTIONAL, 'stroke-width': 1,
      'data-comparison-frame': 'traced'
    }, group);
    var positions = [110, 340, 570, 800];
    drawFlowArrows(positions, 190, 950, 'q3.traced-flow', group);
    TRACED.forEach(function (step, index) {
      drawStep(step, index, positions[index], 846, 190, 'q3.traced-step', group);
    });
  }

  function drawQ3() {
    drawDefs();
    text('只看结果，和追踪过程，是两套评测', 90, 220, {
      'font-family': SERIF, 'font-size': 46, 'font-weight': 500
    });
    text('上槽只保留最终文本；下槽记录路由、工具、校验和证据，答案才可追溯。', 90, 272, {
      'font-size': 20.5, fill: INK70
    });
    drawBaseline();
    drawTraced();
  }

  drawQ3();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
