(function () {
  'use strict';

  var svg = document.querySelector('.scene');
  var NS = 'http://www.w3.org/2000/svg';
  var INK = 'var(--ink)';
  var INK80 = 'var(--ink-80)';
  var INK70 = 'var(--ink-70)';
  var INK55 = 'var(--ink-55)';
  var FUNCTIONAL = 'var(--wp-color-functional)';
  var INK45 = 'var(--ink-45)';
  var PANEL = 'var(--paper-panel)';
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

  function drawDefs() {
    var defs = el('defs', {});
    var pattern = el('pattern', {
      id: 'a4-hatch', width: 8, height: 8,
      patternTransform: 'rotate(45)', patternUnits: 'userSpaceOnUse'
    }, defs);
    line(0, 0, 0, 8, { stroke: INK, 'stroke-width': .7, opacity: .35 }, pattern);
  }

  function drawStrategyList() {
    var group = el('g', {
      'data-layout-zone': 'a4.strategy-list',
      'data-slot-id': 'upper',
      'data-component-id': 'native.paper-ink.evidence.strategy-list',
      'data-fixed-quantity': '4'
    });
    text('STRATEGY · HARNESS ENG', 90, 320, {
      'font-family': MONO, 'font-size': 11, 'letter-spacing': 2.2, fill: INK45
    }, group);
    text('四条工程化打法，各有实据', 990, 320, {
      'font-size': 18, 'text-anchor': 'end', fill: INK70
    }, group);
    line(90, 338, 990, 338, { 'data-xp-anchor': 'heading-rule', stroke: FUNCTIONAL, 'stroke-width': 2 }, group);

    var strategies = [
      ['01', '上下文管控', '摘要做成交接文档，窗口只留当下任务', '幻觉率比裸调下降一半'],
      ['02', '评测前置', '每个版本先过基准集再灰度，不靠手感', '回归用例从 40 条涨到 600 条'],
      ['03', '工具护栏', '高风险动作加确认门，Agent 不能擅自执行', '越权调用被拦在执行前'],
      ['04', '全链可溯', '每一步推理留 Trace，错了能定位到哪一跳', '故障定位从小时级到分钟级']
    ];
    strategies.forEach(function (strategy, index) {
      var y = 376 + index * 72;
      var row = el('g', {
        'data-layout-zone': 'a4.strategy-' + (index + 1),
        'data-slot-id': 'strategy-row',
        'data-repeat-unit': 'strategy',
        'data-strategy-index': String(index + 1)
      }, group);
      text(strategy[0], 90, y, {
        'font-family': MONO, 'font-size': 14, 'letter-spacing': 1.8
      }, row);
      line(90, y + 10, 126, y + 10, { stroke: INK45, 'stroke-width': .65 }, row);
      text(strategy[1], 154, y, { 'font-size': 24, 'font-weight': 400 }, row);
      text(strategy[2], 354, y - 6, { 'font-size': 18.5, fill: INK70 }, row);
      text(strategy[3], 990, y + 22, {
        'font-size': 16.5, 'text-anchor': 'end', fill: INK45
      }, row);
      if (index < strategies.length - 1) {
        line(90, y + 43, 990, y + 43, { stroke: INK45, 'stroke-width': .45 }, row);
      }
    });
  }

  function drawProofConnector() {
    var group = el('g', {
      'data-layout-zone': 'a4.proof-connector',
      'data-slot-id': 'connector'
    });
    text('PROOF', 540, 690, { 'data-xp-anchor': 'proof',
      'font-family': MONO, 'font-size': 10, 'letter-spacing': 2.8,
      'text-anchor': 'middle', fill: INK45
    }, group);
    line(540, 706, 540, 746, { stroke: INK80, 'stroke-width': 1.8 }, group);
    line(540, 746, 528, 732, { stroke: INK80, 'stroke-width': 1.1 }, group);
    line(540, 746, 552, 732, { stroke: INK80, 'stroke-width': 1.1 }, group);
    line(90, 726, 500, 726, { stroke: INK45, 'stroke-width': .5, 'stroke-dasharray': '2 5' }, group);
    line(580, 726, 990, 726, { stroke: INK45, 'stroke-width': .5, 'stroke-dasharray': '2 5' }, group);
  }

  function drawEvidenceFrame(x, y, tag, label, index) {
    var width = 430;
    var height = 198;
    var group = el('g', {
      'data-layout-zone': 'a4.evidence-' + index,
      'data-slot-id': 'evidence-cell',
      'data-repeat-unit': 'evidence',
      'data-evidence-index': String(index)
    });
    el('rect', {
      x: x, y: y, width: width, height: height,
      fill: PANEL, stroke: INK80, 'stroke-width': 1.15
    }, group);
    el('rect', {
      x: x + 5, y: y + 5, width: width - 10, height: height - 10,
      fill: 'none', stroke: INK45, 'stroke-width': .55
    }, group);
    text(tag, x + 22, y + 28, {
      'font-family': MONO, 'font-size': 11.5, 'letter-spacing': 1.25, fill: INK45
    }, group);
    line(x + 22, y + 156, x + width - 22, y + 156, {
      stroke: INK45, 'stroke-width': .55
    }, group);
    text(label, x + 22, y + 181, {
      'font-family': MONO, 'font-size': 14.5, 'letter-spacing': 1.15
    }, group);
    return group;
  }

  function drawContextManagerEvidence(x, y, parent) {
    var gx = x + 46;
    var gy = y + 48;
    var width = 338;
    var height = 84;
    el('rect', { x: gx, y: gy, width: width, height: height, fill: 'none', stroke: INK80, 'stroke-width': 1 }, parent);
    [1, 2, 3].forEach(function (index) {
      line(gx + index * width / 4, gy, gx + index * width / 4, gy + height, { stroke: INK45, 'stroke-width': .45 }, parent);
    });
    [1, 2].forEach(function (index) {
      line(gx, gy + index * height / 3, gx + width, gy + index * height / 3, { stroke: INK45, 'stroke-width': .45 }, parent);
    });
    var points = [[.12, .7], [.3, .28], [.54, .62], [.72, .2], [.87, .54]];
    points.forEach(function (point) {
      var px = gx + point[0] * width;
      var py = gy + point[1] * height;
      el('circle', { cx: px, cy: py, r: 4, fill: PANEL, stroke: INK80, 'stroke-width': 1 }, parent);
      el('circle', { cx: px, cy: py, r: 1.5, fill: INK }, parent);
    });
    el('path', {
      d: 'M ' + (gx + .12 * width) + ' ' + (gy + .7 * height) +
        ' L ' + (gx + .3 * width) + ' ' + (gy + .28 * height) +
        ' L ' + (gx + .72 * width) + ' ' + (gy + .2 * height),
      fill: 'none', stroke: INK55, 'stroke-width': .8, 'stroke-dasharray': '4 4'
    }, parent);
  }

  function drawEvalEvidence(x, y, parent) {
    var ax = x + 52;
    var ay = y + 50;
    var width = 326;
    var height = 80;
    line(ax, ay + height, ax + width, ay + height, { stroke: INK80, 'stroke-width': .9 }, parent);
    line(ax, ay, ax, ay + height, { stroke: INK80, 'stroke-width': .9 }, parent);
    [1, 2, 3, 4].forEach(function (index) {
      line(ax + index * width / 5, ay + height, ax + index * width / 5, ay + height + 5, { stroke: INK55, 'stroke-width': .6 }, parent);
    });
    var peakX = ax + width * .58;
    var peakY = ay + 10;
    el('path', {
      d: 'M ' + ax + ' ' + (ay + height - 10) +
        ' L ' + (ax + width * .2) + ' ' + (ay + height - 24) +
        ' L ' + (ax + width * .42) + ' ' + (ay + height - 42) +
        ' L ' + peakX + ' ' + peakY +
        ' L ' + (ax + width * .76) + ' ' + (ay + height - 34) +
        ' L ' + (ax + width) + ' ' + (ay + height - 18),
      fill: 'none', stroke: INK80, 'stroke-width': 1.25
    }, parent);
    el('circle', { cx: peakX, cy: peakY, r: 4.5, fill: PANEL, stroke: INK80, 'stroke-width': 1 }, parent);
    el('circle', { cx: peakX, cy: peakY, r: 1.7, fill: INK }, parent);
    line(ax, peakY, peakX, peakY, { stroke: INK45, 'stroke-width': .5, 'stroke-dasharray': '2 5' }, parent);
  }

  function drawGuardrailEvidence(x, y, parent) {
    var cx = x + 215;
    var baseY = y + 128;
    el('rect', { x: x + 52, y: baseY + 5, width: 326, height: 10, fill: 'url(#a4-hatch)', stroke: 'none' }, parent);
    line(x + 52, baseY + 5, x + 378, baseY + 5, { stroke: INK55, 'stroke-width': .8 }, parent);
    el('rect', { x: cx - 68, y: baseY - 42, width: 136, height: 42, rx: 7, fill: 'none', stroke: INK80, 'stroke-width': 1.2 }, parent);
    el('rect', { x: cx - 63, y: baseY - 37, width: 126, height: 32, rx: 4, fill: 'none', stroke: INK45, 'stroke-width': .55 }, parent);
    [-38, 38].forEach(function (offset) {
      el('circle', { cx: cx + offset, cy: baseY + 1, r: 9, fill: PANEL, stroke: INK80, 'stroke-width': 1 }, parent);
      el('circle', { cx: cx + offset, cy: baseY + 1, r: 1.7, fill: INK }, parent);
    });
    line(cx, baseY - 42, cx, baseY - 83, { stroke: INK80, 'stroke-width': 1 }, parent);
    el('rect', { x: cx - 27, y: baseY - 96, width: 54, height: 15, fill: 'none', stroke: INK80, 'stroke-width': 1 }, parent);
    el('circle', { cx: cx, cy: baseY - 102, r: 2.5, fill: PANEL, stroke: INK80, 'stroke-width': .8 }, parent);
  }

  function drawTraceEvidence(x, y, parent) {
    var gx = x + 54;
    var gy = y + 56;
    var width = 322;
    line(gx, gy + 76, gx + width, gy + 76, { stroke: INK80, 'stroke-width': .9 }, parent);
    for (var index = 0; index <= 6; index += 1) {
      line(gx + index * width / 6, gy + 76, gx + index * width / 6, gy + 81, { stroke: INK55, 'stroke-width': .6 }, parent);
    }
    [[0, .52, 0, true], [.28, .5, 27, false], [.62, .38, 54, true]].forEach(function (bar) {
      var bx = gx + bar[0] * width;
      var bw = bar[1] * width;
      var by = gy + bar[2];
      el('rect', {
        x: bx, y: by, width: bw, height: 17,
        fill: bar[3] ? 'url(#a4-hatch)' : 'none', stroke: INK80, 'stroke-width': 1
      }, parent);
      line(bx, by - 4, bx, by + 21, { stroke: INK55, 'stroke-width': .7 }, parent);
      line(bx + bw, by - 4, bx + bw, by + 21, { stroke: INK55, 'stroke-width': .7 }, parent);
    });
  }

  function drawEvidenceWall() {
    var wall = el('g', {
      'data-layout-zone': 'a4.evidence-wall',
      'data-slot-id': 'lower',
      'data-component-id': 'native.paper-ink.evidence.specimen-wall',
      'data-fixed-quantity': '4'
    });
    var entries = [
      [90, 772, 'EXHIBIT 01 — CONTEXT MGR', 'HALLUCINATION −48%', drawContextManagerEvidence],
      [560, 772, 'EXHIBIT 02 — EVAL SUITE', 'CASES · 40 → 600', drawEvalEvidence],
      [90, 994, 'EXHIBIT 03 — GUARDRAIL', 'BLOCKED · 312 CALLS', drawGuardrailEvidence],
      [560, 994, 'EXHIBIT 04 — TRACE', 'MTTR · 8 MIN', drawTraceEvidence]
    ];
    entries.forEach(function (entry, index) {
      var panel = drawEvidenceFrame(entry[0], entry[1], entry[2], entry[3], index + 1);
      entry[4](entry[0], entry[1], panel);
      wall.appendChild(panel);
    });
  }

  function drawA4() {
    drawDefs();
    text('策略写在上面，证据必须跟在后面', 90, 214, {
      'font-family': SERIF, 'font-size': 45, 'font-weight': 500
    });
    text('四条工程化打法逐项说明，四件现场标本负责证明。', 90, 266, {
      'font-size': 19, fill: INK70
    });
    drawStrategyList();
    drawProofConnector();
    drawEvidenceWall();
  }

  drawA4();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
