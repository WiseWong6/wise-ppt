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
  var MONO = 'var(--mono)';
  var SANS = 'var(--sans)';
  var SERIF = 'var(--serif)';
  var ROWS = [
    { name: 'GLM-X', code: 'MODEL-01', value: 428, avatar: 'lift', field: 'REASONING', focus: true },
    { name: 'GPT-X', code: 'MODEL-02', value: 391, avatar: 'fork', field: 'CODING' },
    { name: 'Claude-X', code: 'MODEL-03', value: 355, avatar: 'tote', field: 'MATH' },
    { name: 'Llama-X', code: 'MODEL-04', value: 298 },
    { name: 'Gemini-X', code: 'MODEL-05', value: 264 },
    { name: 'Mistral-X', code: 'MODEL-06', value: 227 },
    { name: 'DeepSeek-X', code: 'MODEL-07', value: 196 },
    { name: 'Qwen-X', code: 'MODEL-08', value: 168 }
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
    var hatch = el('pattern', {
      id: 'c7-hatch30', width: 7, height: 7,
      patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)'
    }, defs);
    line(0, 0, 0, 7, {
      id: 'c7-focus-hatch', stroke: INK, 'stroke-width': .7, opacity: .35
    }, hatch);
  }

  function drawSectionLabel() {
    var group = el('g', { 'data-layout-zone': 'c7.section', 'data-slot-id': 'ranking-heading' });
    text('MODEL BENCHMARK · SCORE', 90, 313, {
      'font-family': MONO, 'font-size': 10.5, 'letter-spacing': 1.7, fill: INK55
    }, group);
    line(342, 309, 990, 309, { stroke: INK45, 'stroke-width': .65 }, group);
    text('TOP 3 SPECIMENS + TOP 8 RANKING', 990, 313, {
      'font-family': MONO, 'font-size': 8.8, 'letter-spacing': 1.2,
      'text-anchor': 'end', fill: INK45
    }, group);
  }

  function drawAvatar(cx, cy, kind, parent) {
    var style = { stroke: INK80, 'stroke-width': 1.05, fill: 'none' };
    if (kind === 'lift') {
      el('circle', Object.assign({ cx: cx, cy: cy - 13, r: 13 }, style), parent);
      el('path', Object.assign({ d: 'M ' + (cx - 21) + ' ' + (cy + 14) + ' Q ' + cx + ' ' + (cy - 5) + ' ' + (cx + 21) + ' ' + (cy + 14) }, style), parent);
    } else if (kind === 'fork') {
      el('ellipse', Object.assign({ cx: cx, cy: cy - 10, rx: 12, ry: 13 }, style), parent);
      line(cx - 17, cy - 18, cx + 17, cy - 18, style, parent);
      el('path', Object.assign({ d: 'M ' + (cx - 20) + ' ' + (cy + 14) + ' Q ' + cx + ' ' + (cy - 2) + ' ' + (cx + 20) + ' ' + (cy + 14) }, style), parent);
    } else {
      el('circle', Object.assign({ cx: cx, cy: cy - 13, r: 13 }, style), parent);
      el('rect', Object.assign({ x: cx - 12, y: cy - 18, width: 10, height: 7 }, style), parent);
      el('rect', Object.assign({ x: cx + 2, y: cy - 18, width: 10, height: 7 }, style), parent);
      line(cx - 2, cy - 15, cx + 2, cy - 15, style, parent);
      el('path', Object.assign({ d: 'M ' + (cx - 21) + ' ' + (cy + 14) + ' Q ' + cx + ' ' + (cy - 5) + ' ' + (cx + 21) + ' ' + (cy + 14) }, style), parent);
    }
  }

  function drawSpecimenCard(item, index) {
    var x = 90 + index * 310;
    var y = 338;
    var group = el('g', {
      'data-layout-zone': 'c7.specimen-' + (index + 1),
      'data-repeat-unit': 'top-three-specimen',
      'data-rank': String(index + 1),
      'data-model': item.name
    });
    el('rect', { x: x, y: y, width: 280, height: 166, fill: PANEL, stroke: INK80, 'stroke-width': .9 }, group);
    el('rect', { x: x + 5, y: y + 5, width: 270, height: 156, fill: 'none', stroke: INK45, 'stroke-width': .55 }, group);
    text('0' + (index + 1), x + 18, y + 27, {
      'font-family': MONO, 'font-size': 9.2, 'letter-spacing': 1.5
    }, group);
    text(item.field, x + 262, y + 27, {
      'data-xp-anchor': 'field',
      'font-family': MONO, 'font-size': 8.2, 'letter-spacing': 1.2,
      'text-anchor': 'end', fill: INK45
    }, group);
    drawAvatar(x + 140, y + 88, item.avatar, group);
    text('SAMPLE · ' + item.code, x + 140, y + 143, {
      'font-family': MONO, 'font-size': 8.2, 'letter-spacing': 1,
      'text-anchor': 'middle', fill: INK45
    }, group);
  }

  function drawTopThreeSpecimens() {
    var group = el('g', {
      'data-layout-zone': 'c7.top-three',
      'data-slot-id': 'top-three-specimens',
      'data-fixed-quantity': '3'
    });
    ROWS.slice(0, 3).forEach(drawSpecimenCard);
    line(230, 504, 230, 527, { stroke: INK45, 'stroke-width': .65, 'stroke-dasharray': '3 5' }, group);
    line(540, 504, 540, 527, { stroke: INK45, 'stroke-width': .65, 'stroke-dasharray': '3 5' }, group);
    line(850, 504, 850, 527, { stroke: INK45, 'stroke-width': .65, 'stroke-dasharray': '3 5' }, group);
  }

  function drawRankingAxis(parent) {
    var x0 = 330;
    var width = 600;
    [0, 100, 200, 300, 400].forEach(function (tick) {
      var x = x0 + tick / 450 * width;
      line(x, 555, x, 1123, {
        stroke: INK45, 'stroke-width': .45, 'stroke-dasharray': '2 7', opacity: .75
      }, parent);
      text(String(tick), x, 548, {
        'font-family': MONO, 'font-size': 8.2, 'text-anchor': 'middle', fill: INK45
      }, parent);
    });
    text('SCORE', 960, 548, {
      'font-family': MONO, 'font-size': 8.2, 'letter-spacing': 1.2,
      'text-anchor': 'end', fill: INK45
    }, parent);
  }

  function drawRankingRow(item, index) {
    var y = 579 + index * 68;
    var x0 = 330;
    var width = item.value / 450 * 600;
    var sampleFocus = Boolean(item.focus);
    var group = el('g', {
      'data-layout-zone': 'c7.rank-' + (index + 1),
      'data-repeat-unit': 'ranked-model',
      'data-rank': String(index + 1),
      'data-score': String(item.value)
    });
    text(String(index + 1).padStart(2, '0'), 112, y + 18, {
      'font-family': MONO, 'font-size': 9, 'letter-spacing': 1.1, fill: INK45
    }, group);
    text(item.name, 154, y + 15, {
      id: sampleFocus ? 'c7-focus-name' : 'c7-name-' + (index + 1),
      'font-size': 15.5, fill: INK
    }, group);
    text(item.code, 154, y + 34, {
      'font-family': MONO, 'font-size': 7.8, 'letter-spacing': 1, fill: INK45
    }, group);
    el('rect', {
      id: sampleFocus ? 'c7-focus-bar' : 'c7-bar-' + (index + 1),
      x: x0, y: y - 5, width: width, height: 29,
      fill: sampleFocus ? 'url(#c7-hatch30)' : PAPER,
      stroke: INK80, 'stroke-width': 1
    }, group);
    text(String(item.value), x0 + width + 12, y + 15, {
      id: sampleFocus ? 'c7-focus-value' : 'c7-value-' + (index + 1),
      'font-family': MONO, 'font-size': 10.5, 'letter-spacing': .7, fill: INK
    }, group);
    line(112, y + 47, 968, y + 47, { stroke: INK45, 'stroke-width': .45 }, group);
  }

  function drawRanking() {
    var group = el('g', {
      'data-layout-zone': 'c7.ranking',
      'data-slot-id': 'descending-benchmark-ranking',
      'data-fixed-quantity': '8'
    });
    drawRankingAxis(group);
    ROWS.forEach(drawRankingRow);
  }

  function drawReadingGuide() {
    var group = el('g', {
      'data-layout-zone': 'c7.reading-guide',
      'data-slot-id': 'ranking-reading-guide'
    });
    line(90, 1190, 990, 1190, { stroke: INK45, 'stroke-width': .6 }, group);
    text('TOP 3 SPECIMENS → TOP 8 SCORES', 90, 1222, {
      'font-family': MONO, 'font-size': 9.2, 'letter-spacing': 1.25, fill: INK45
    }, group);
    text('DESCENDING · 428 → 168', 990, 1222, {
      'font-family': MONO, 'font-size': 9.2, 'letter-spacing': 1.15,
      'text-anchor': 'end', fill: INK45
    }, group);
  }

  function drawC7() {
    drawDefs();
    text('头部分差决定位置，总分之后还要拆能力', 90, 214, {
      'font-family': SERIF, 'font-size': 45, 'font-weight': 500
    });
    text('前三名保留标本证据，八个模型继续按综合分从高到低对齐。', 90, 266, {
      'font-size': 19, fill: INK70
    });
    drawSectionLabel();
    drawTopThreeSpecimens();
    drawRanking();
    drawReadingGuide();
  }

  drawC7();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
