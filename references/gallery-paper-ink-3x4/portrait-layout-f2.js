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

  var STEPS = [
    { no: '01', title: '意图接入', meta: 'INTENT · PARSE', tick: '4MS' },
    { no: '02', title: '任务拆解', meta: 'PLAN ×6', tick: '18MS' },
    { no: '03', title: '工具选择', meta: 'TOOL · MATCH', tick: '42MS' },
    { no: '04', title: '执行调用', meta: 'CALL · TRACE', tick: '9MS' },
    { no: '05', title: '结果校验', meta: 'CHECK · GUARD', tick: '310MS' },
    { no: '06', title: '记忆更新', meta: 'MEM · WRITE', tick: '26MS' }
  ];

  var FIELDS = [
    ['TASK_ID', '任务编号与来源'],
    ['TOOL', '调用的工具与模型'],
    ['TRACE', '推理路径与步骤'],
    ['TOKEN', 'Token 预算与耗时'],
    ['ETA', '预计完成与重试策略'],
    ['HANDOVER', '异常阻塞人工确认点']
  ];

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

  function sectionLabel(index, en, cn, x, y, width) {
    var group = el('g', { 'data-layout-zone': 'f2.section-' + index, 'data-slot-id': 'section-' + index });
    text('0' + index + ' / ' + en, x, y, { 'font-family': MONO, 'font-size': 11, 'letter-spacing': 1.5, fill: INK45 }, group);
    line(x + 146, y - 4, x + width - 54, y - 4, { stroke: INK45, 'stroke-width': .65 }, group);
    text(cn, x + width, y, { 'font-size': 14, 'text-anchor': 'end', fill: INK70 }, group);
  }

  function cornerTicks(x, y, width, height, parent) {
    var length = 11;
    [[x,y,x+length,y],[x,y,x,y+length],[x+width,y,x+width-length,y],[x+width,y,x+width,y+length],
      [x,y+height,x+length,y+height],[x,y+height,x,y+height-length],
      [x+width,y+height,x+width-length,y+height],[x+width,y+height,x+width,y+height-length]
    ].forEach(function (points) {
      line(points[0], points[1], points[2], points[3], { stroke: INK80, 'stroke-width': 1 }, parent);
    });
  }

  function drawTaskRoot() {
    var x = 90, y = 350, width = 390, height = 72;
    var group = el('g', { 'data-layout-zone': 'f2.task-root', 'data-slot-id': 'task-root' });
    el('rect', { x: x, y: y, width: width, height: height, fill: 'none', stroke: INK80, 'stroke-width': 1 }, group);
    el('rect', { x: x + 14, y: y + 14, width: 86, height: 34, fill: PAPER, stroke: INK80, 'stroke-width': .9 }, group);
    text('TASK RUN', x + 57, y + 41, { 'font-family': MONO, 'font-size': 11, 'letter-spacing': 1.2, 'text-anchor': 'middle', fill: FUNCTIONAL }, group);
    text('一次 Agent 执行', x + 118, y + 43, { 'font-size': 20, 'font-weight': 400 }, group);
    cornerTicks(x, y, width, height, group);
  }

  function drawTree() {
    var trunkX = 104, cardX = 132, cardWidth = 330, cardHeight = 66, startY = 448, gap = 22;
    var group = el('g', { 'data-layout-zone': 'f2.tree-trunk', 'data-slot-id': 'step-tree' });
    line(trunkX, 422, trunkX, 980, { stroke: INK70, 'stroke-width': .85 }, group);
    STEPS.forEach(function (step, stepIndex) {
      var y = startY + stepIndex * (cardHeight + gap);
      var cy = y + cardHeight / 2;
      var stepGroup = el('g', { 'data-layout-zone': 'f2.step-' + (stepIndex + 1), 'data-slot-id': 'step-' + (stepIndex + 1) });
      line(trunkX, cy, cardX, cy, { stroke: INK70, 'stroke-width': .8 }, stepGroup);
      el('circle', { cx: trunkX, cy: cy, r: 3, fill: PAPER, stroke: INK80, 'stroke-width': .9 }, stepGroup);
      el('rect', { x: cardX, y: y, width: cardWidth, height: cardHeight, fill: 'none', stroke: INK45, 'stroke-width': .75 }, stepGroup);
      text(step.no, cardX + 14, y + 27, { 'font-family': MONO, 'font-size': 10, fill: INK45 }, stepGroup);
      text(step.title, cardX + 48, y + 28, { 'font-size': 18, 'font-weight': 400 }, stepGroup);
      text(step.meta, cardX + 48, y + 52, { 'font-family': MONO, 'font-size': 10, 'letter-spacing': .6, fill: INK45 }, stepGroup);
      text(step.tick, cardX + cardWidth - 12, y + 38, { 'font-family': MONO, 'font-size': 10, 'text-anchor': 'end', fill: INK45 }, stepGroup);
    });
  }

  function drawTaskOutput() {
    var x = 132, y = 1000, width = 330, height = 70;
    var group = el('g', { 'data-layout-zone': 'f2.task-output', 'data-slot-id': 'task-output' });
    line(104, 980, 104, y + height / 2, { stroke: INK70, 'stroke-width': .85 }, group);
    line(104, y + height / 2, x, y + height / 2, { stroke: INK80, 'stroke-width': 1.1 }, group);
    el('circle', { cx: 104, cy: y + height / 2, r: 3, fill: INK80 }, group);
    el('rect', { x: x, y: y, width: width, height: height, fill: 'none', stroke: INK80, 'stroke-width': 1.1, 'stroke-dasharray': '7 5' }, group);
    text('任务完成', x + 18, y + 43, { 'font-size': 20, 'font-weight': 400 }, group);
    text('OUTPUT', x + width - 16, y + 41, { 'font-family': MONO, 'font-size': 10, 'letter-spacing': 1.3, 'text-anchor': 'end', fill: INK45 }, group);
  }

  function drawSpecSheet() {
    var x = 550, y = 350, width = 440, height = 720;
    var group = el('g', { 'data-layout-zone': 'f2.spec-sheet', 'data-slot-id': 'field-specification' });
    el('rect', { id: 'f2-focus-frame', x: x, y: y, width: width, height: height, fill: 'none', stroke: INK80, 'stroke-width': 1 }, group);
    text('每个环节的核心要素', x + 20, y + 42, { id: 'sample-focus', 'font-size': 21, 'font-weight': 400 }, group);
    text('FIELD SPEC · 06 + ALARM', x + width - 18, y + 36, { 'font-family': MONO, 'font-size': 9, 'letter-spacing': 1, 'text-anchor': 'end', fill: INK45 }, group);
    line(x + 20, y + 58, x + width - 20, y + 58, { stroke: INK45, 'stroke-width': .65 }, group);
    FIELDS.forEach(function (field, fieldIndex) {
      var rowY = y + 78 + fieldIndex * 78;
      var rowGroup = el('g', { 'data-layout-zone': 'f2.spec-row-' + (fieldIndex + 1), 'data-slot-id': 'spec-row-' + (fieldIndex + 1) }, group);
      text(String(fieldIndex + 1).padStart(2, '0'), x + 20, rowY + 29, { 'font-family': MONO, 'font-size': 10, fill: INK45 }, rowGroup);
      text(field[0], x + 48, rowY + 29, { 'font-family': MONO, 'font-size': 11, 'letter-spacing': .7 }, rowGroup);
      line(x + 146, rowY + 8, x + 146, rowY + 44, { stroke: INK45, 'stroke-width': .5 }, rowGroup);
      text(field[1], x + 166, rowY + 29, { 'font-size': 16, fill: INK70 }, rowGroup);
      line(x + 20, rowY + 58, x + width - 20, rowY + 58, { stroke: INK45, 'stroke-width': .4 }, rowGroup);
    });
    var alarmY = y + 596;
    var alarmGroup = el('g', { 'data-layout-zone': 'f2.alarm-row', 'data-slot-id': 'alarm-row' }, group);
    el('rect', { x: x + 18, y: alarmY, width: width - 36, height: 64, fill: PAPER, stroke: INK80, 'stroke-width': .9, 'stroke-dasharray': '5 4' }, alarmGroup);
    text('ALARM', x + 34, alarmY + 25, { 'font-family': MONO, 'font-size': 9, 'letter-spacing': 1, fill: INK45 }, alarmGroup);
    text('阻塞与异常（自动上报）', x + 34, alarmY + 48, { 'font-size': 14 }, alarmGroup);
    text('AUTO ESCALATE', x + width - 34, alarmY + 37, { 'font-family': MONO, 'font-size': 8.5, 'letter-spacing': 1, 'text-anchor': 'end', fill: INK45 }, alarmGroup);
    cornerTicks(x, y, width, height, group);
  }

  function drawF2() {
    text('一次任务，拆成六个可追踪环节', 90, 220, { 'font-family': SERIF, 'font-size': 48, 'font-weight': 500 });
    text('环节树与字段规格单保持左右并列，整体按可用宽高等比居中。', 90, 272, { 'font-size': 21, fill: INK70 });
    sectionLabel(1, 'TASK DECOMPOSITION', '环节树', 90, 300, 390);
    sectionLabel(2, 'FIELD SPECIFICATION', '规格单', 550, 300, 440);
    drawTaskRoot();
    drawTree();
    drawTaskOutput();
    drawSpecSheet();
  }

  drawF2();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
