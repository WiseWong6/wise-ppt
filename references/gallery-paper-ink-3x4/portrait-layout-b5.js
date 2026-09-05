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

  function drawStep(item, stepIndex) {
    var treadY = 1120 - stepIndex * 164;
    var treadX = 120 + stepIndex * 145;
    var nodeX = treadX + 30;
    var labelX = treadX + 54;
    var labelY = treadY - 84;
    var labelBackingX = labelX - 18;
    var labelBackingWidth = Math.min(330, 958 - labelBackingX);
    var group = el('g', {
      'data-layout-zone': 'b5.stage-' + (stepIndex + 1),
      'data-slot-id': 'stage-' + (stepIndex + 1)
    });

    /* 标签背板只负责隔开后方阶梯竖线，不画边框，保持横版的轻量标注语气。 */
    el('rect', {
      x: labelBackingX,
      y: labelY - 32,
      width: labelBackingWidth,
      height: 84,
      fill: PAPER,
      'data-path-mask': 'b5.stage-label'
    }, group);

    line(nodeX, treadY - 7, nodeX, labelY + 50, {
      id: item.focus ? 'b5-focus-leader' : '',
      stroke: INK70,
      'stroke-width': item.focus ? 1.3 : .8
    }, group);
    el('circle', {
      id: item.focus ? 'b5-focus-node' : 'b5-step-' + stepIndex,
      cx: nodeX,
      cy: treadY,
      r: 8,
      fill: PANEL,
      stroke: INK80,
      'stroke-width': item.focus ? 1.5 : 1.1
    }, group);
    el('circle', {
      id: item.focus ? 'b5-focus-dot' : '',
      cx: nodeX,
      cy: treadY,
      r: 2.6,
      fill: INK80
    }, group);

    text(item.year, labelX, labelY, {
      id: item.focus ? 'b5-focus-year' : '',
      'font-family': MONO,
      'font-size': 18,
      'font-weight': 400,
      'letter-spacing': 1.2,
      fill: INK80
    }, group);
    line(labelX, labelY + 12, labelX + 62, labelY + 12, { stroke: FUNCTIONAL, 'stroke-width': 2 }, group);
    text(item.event, labelX + 86, labelY + 1, {
      id: item.focus ? 'b5-focus-event' : '',
      'font-size': 27,
      'font-weight': 400
    }, group);
    text(item.note, labelX, labelY + 39, {
      id: item.focus ? 'b5-focus-note' : '',
      'font-size': 17,
      fill: INK70
    }, group);
  }

  function drawB5() {
    text('五级成熟度的阶梯爬升', 90, 222, { 'font-family': SERIF, 'font-size': 50, 'font-weight': 500 });
    text('从单点工具到自主组织，每一级都补齐下一层协作能力。', 90, 274, { 'font-size': 24, fill: INK70 });

    el('path', {
      id: 'b5-stair-path',
      d: 'M 120 1120 H 265 V 956 H 410 V 792 H 555 V 628 H 700 V 464 H 950',
      fill: 'none',
      stroke: INK80,
      'stroke-width': 1.5
    });
    el('path', {
      id: 'b5-rise-arrow',
      d: 'M 100 1154 H 285 V 990 H 430 V 826 H 575 V 662 H 720 V 498 H 930 L 914 489 M 930 498 L 914 507',
      fill: 'none',
      stroke: INK,
      'stroke-width': 2.2,
      opacity: .82
    });

    el('circle', { cx: 120, cy: 1120, r: 10, fill: 'none', stroke: INK80, 'stroke-width': 1.1 });
    el('circle', { cx: 120, cy: 1120, r: 3, fill: INK80 });
    line(958, 464, 978, 464, { stroke: INK70, 'stroke-width': .8 });
    line(968, 454, 968, 474, { stroke: INK70, 'stroke-width': .8 });

    [
      { year: '2022', event: '单点工具', note: '单任务模型调用跑通', focus: false },
      { year: '2023', event: '工作流自动化', note: '多步骤编排 12 条流水线上线', focus: false },
      { year: '2024', event: 'Agent 协同', note: '多 Agent 路径规划 V2 发布', focus: false },
      { year: '2025', event: '多 Agent 编排', note: '多 Agent 编排 · 统一编排', focus: false },
      { year: '2026', event: '自主组织', note: '开放协议 · 百 Agent 互联', focus: true }
    ].forEach(drawStep);

    line(982, 464, 982, 1120, { stroke: INK45, 'stroke-width': .6, 'stroke-dasharray': '3 7' });
    line(974, 464, 990, 464, { stroke: INK45, 'stroke-width': .8 });
    line(974, 1120, 990, 1120, { stroke: INK45, 'stroke-width': .8 });
    text('Δ STAGE × 5', 1000, 792, {
      'font-family': MONO,
      'font-size': 12,
      'letter-spacing': 1.6,
      fill: INK45,
      transform: 'rotate(90 1000 792)'
    });
  }

  drawB5();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
