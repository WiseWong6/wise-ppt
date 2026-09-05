(function () {
  'use strict';

  var svg = document.querySelector('.scene');
  var NS = 'http://www.w3.org/2000/svg';
  var INK = 'var(--ink)';
  var INK80 = 'var(--ink-80)';
  var INK70 = 'var(--ink-70)';
  var INK45 = 'var(--ink-45)';
  var SANS = 'var(--sans)';
  var MONO = 'var(--mono)';
  var SERIF = 'var(--serif)';
  var SAFE = window.PORTRAIT_SAFE;
  var ROW_START = 402;
  var KPI_HEIGHT = 60;
  var KPI_TOP = SAFE.bottom - KPI_HEIGHT;
  var ROW_PITCH = (KPI_TOP - 12 - ROW_START) / 4;
  var ROW_TOPS = [0, 1, 2, 3].map(function (i) { return Math.round(ROW_START + i * ROW_PITCH); });
  var STAGES = [
    { index: '01', en: 'CREATE', cn: '创作', oldV: 'AVG 3 天', oldNote: '手写文稿', newV: 'AI 0.5 天', newNote: '辅助生成' },
    { index: '02', en: 'REVIEW', cn: '审阅', oldV: '邮件 48 H', oldNote: '邮件往返', newV: '实时 2 H', newNote: '协作批注' },
    { index: '03', en: 'PUBLISH', cn: '发布', oldV: '手动排版', oldNote: '逐端适配', newV: '一键多端', newNote: '统一发布' },
    { index: '04', en: 'ANALYZE', cn: '复盘', oldV: 'Excel 统计', oldNote: '人工汇总', newV: '看板自动', newNote: '实时回流' }
  ];
  var KPIS = [
    { num: '-65%', label: '产出周期', note: 'CYCLE TIME' },
    { num: '×3.1', label: '内容量', note: 'OUTPUT' },
    { num: '92%', label: '准时率', note: 'ON-TIME' }
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
      id: 'e4-hatch', width: 7, height: 7,
      patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)'
    }, defs);
    line(0, 0, 0, 7, { stroke: INK, 'stroke-width': .7, opacity: .28 }, hatch);
  }

  function drawSectionLabel() {
    var group = el('g', { 'data-layout-zone': 'e4.section', 'data-slot-id': 'section-label' });
    text('01 / BEFORE × AFTER', 90, 309, {
      'font-family': MONO, 'font-size': 11, 'letter-spacing': 1.8, fill: INK45
    }, group);
    line(334, 305, 990, 305, { stroke: INK45, 'stroke-width': .65 }, group);
    text('4 STAGES · SAME-DIMENSION COMPARE', 990, 309, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.15,
      'text-anchor': 'end', fill: INK45
    }, group);
  }

  function drawMatrixHeader() {
    var group = el('g', {
      'data-layout-zone': 'e4.matrix-header',
      'data-slot-id': 'before-after-column-header',
      'data-fixed-quantity': '2'
    });
    text('STAGE', 112, 365, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.7, fill: INK45
    }, group);
    text('BEFORE / 旧流程', 378, 365, {
      'font-family': MONO, 'font-size': 10, 'letter-spacing': 1.6,
      'text-anchor': 'middle', fill: INK45
    }, group);
    text('AFTER / 新平台', 772, 365, {
      id: 'sample-focus', 'font-family': MONO, 'font-size': 10,
      'letter-spacing': 1.6, 'text-anchor': 'middle', fill: INK
    }, group);
    line(90, 378, 990, 378, { stroke: INK45, 'stroke-width': .7 }, group);
  }

  function drawOldIcon(stageIndex, x, y, parent) {
    var group = el('g', {
      'data-layout-zone': 'e4.old-icon-' + (stageIndex + 1),
      'data-slot-id': 'before-icon', opacity: .52
    }, parent);
    var style = { fill: 'none', stroke: INK, 'stroke-width': 1.1, 'stroke-dasharray': '4 4' };
    if (stageIndex === 0) {
      el('rect', Object.assign({ x: x + 5, y: y + 2, width: 42, height: 52 }, style), group);
      [y + 16, y + 28, y + 40].forEach(function (yy) { line(x + 13, yy, x + 39, yy, style, group); });
      line(x + 37, y + 18, x + 56, y + 37, style, group);
      el('path', { d: 'M ' + (x + 56) + ' ' + (y + 37) + ' l -6 -2 l 2 6 z', fill: INK45 }, group);
    } else if (stageIndex === 1) {
      el('rect', Object.assign({ x: x + 4, y: y + 12, width: 54, height: 38, rx: 2 }, style), group);
      el('path', Object.assign({ d: 'M ' + (x + 4) + ' ' + (y + 15) + ' L ' + (x + 31) + ' ' + (y + 36) + ' L ' + (x + 58) + ' ' + (y + 15) }, style), group);
    } else if (stageIndex === 2) {
      el('rect', Object.assign({ x: x + 3, y: y + 4, width: 56, height: 48 }, style), group);
      el('rect', Object.assign({ x: x + 10, y: y + 11, width: 17, height: 13 }, style), group);
      [y + 31, y + 39, y + 47].forEach(function (yy) { line(x + 10, yy, x + 51, yy, style, group); });
    } else {
      el('rect', Object.assign({ x: x + 3, y: y + 5, width: 56, height: 46 }, style), group);
      line(x + 3, y + 18, x + 59, y + 18, style, group);
      [x + 22, x + 41].forEach(function (xx) { line(xx, y + 5, xx, y + 51, style, group); });
      [y + 29, y + 40].forEach(function (yy) { line(x + 3, yy, x + 59, yy, style, group); });
      el('rect', { x: x + 22, y: y + 29, width: 19, height: 11, fill: 'url(#e4-hatch)', opacity: .7 }, group);
    }
  }

  function drawNewIcon(stageIndex, x, y, parent) {
    var group = el('g', {
      'data-layout-zone': 'e4.new-icon-' + (stageIndex + 1),
      'data-slot-id': 'after-icon'
    }, parent);
    var style = { fill: 'none', stroke: INK80, 'stroke-width': 1.25 };
    if (stageIndex === 0) {
      el('rect', Object.assign({ x: x + 4, y: y + 6, width: 54, height: 43, rx: 3 }, style), group);
      line(x + 31, y + 15, x + 31, y + 40, style, group);
      line(x + 18, y + 28, x + 44, y + 28, style, group);
      text('AI', x + 31, y + 2, {
        'font-family': MONO, 'font-size': 8.5, 'letter-spacing': 1.4,
        'text-anchor': 'middle', fill: INK70
      }, group);
    } else if (stageIndex === 1) {
      el('rect', Object.assign({ x: x + 2, y: y + 4, width: 34, height: 48, rx: 2 }, style), group);
      [y + 16, y + 27, y + 38].forEach(function (yy) { line(x + 9, yy, x + 29, yy, style, group); });
      el('path', Object.assign({ d: 'M ' + (x + 43) + ' ' + (y + 12) + ' H ' + (x + 60) + ' V ' + (y + 35) + ' H ' + (x + 54) + ' L ' + (x + 49) + ' ' + (y + 42) + ' V ' + (y + 35) + ' H ' + (x + 43) + ' Z' }, style), group);
    } else if (stageIndex === 2) {
      el('rect', Object.assign({ x: x + 22, y: y + 37, width: 22, height: 14, rx: 2 }, style), group);
      line(x + 33, y + 37, x + 9, y + 14, style, group);
      line(x + 33, y + 37, x + 33, y + 8, style, group);
      line(x + 33, y + 37, x + 57, y + 14, style, group);
      el('rect', Object.assign({ x: x + 4, y: y + 4, width: 10, height: 16, rx: 1 }, style), group);
      el('rect', Object.assign({ x: x + 25, y: y + 1, width: 16, height: 12, rx: 1 }, style), group);
      el('rect', Object.assign({ x: x + 51, y: y + 4, width: 16, height: 12, rx: 1 }, style), group);
    } else {
      el('rect', Object.assign({ x: x + 1, y: y + 3, width: 62, height: 50, rx: 2 }, style), group);
      line(x + 1, y + 16, x + 63, y + 16, style, group);
      el('rect', { x: x + 10, y: y + 34, width: 8, height: 12, fill: 'url(#e4-hatch)', stroke: INK80, 'stroke-width': .9 }, group);
      el('rect', { x: x + 23, y: y + 28, width: 8, height: 18, fill: 'url(#e4-hatch)', stroke: INK80, 'stroke-width': .9 }, group);
      el('rect', { x: x + 36, y: y + 21, width: 8, height: 25, fill: 'url(#e4-hatch)', stroke: INK80, 'stroke-width': .9 }, group);
      el('polyline', { points: (x + 47) + ',' + (y + 43) + ' ' + (x + 54) + ',' + (y + 32) + ' ' + (x + 60) + ',' + (y + 21), fill: 'none', stroke: INK80, 'stroke-width': 1.1 }, group);
    }
  }

  function drawTransition(rowTop, rowIndex, parent) {
    var group = el('g', {
      'data-layout-zone': 'e4.row-transition-' + (rowIndex + 1),
      'data-slot-id': 'before-to-after'
    }, parent);
    line(528, rowTop + 106, 568, rowTop + 106, { stroke: INK80, 'stroke-width': 1.1 }, group);
    el('path', {
      d: 'M 558 ' + (rowTop + 99) + ' L 568 ' + (rowTop + 106) + ' L 558 ' + (rowTop + 113),
      fill: 'none', stroke: INK80, 'stroke-width': 1.1
    }, group);
  }

  function drawStateCard(stage, stageIndex, mode, rowTop, parent) {
    var isNew = mode === 'new';
    var x = isNew ? 578 : 236;
    var group = el('g', {
      'data-layout-zone': 'e4.' + mode + '-state-' + (stageIndex + 1),
      'data-slot-id': mode === 'old' ? 'before-state' : 'after-state',
      'data-state-id': mode
    }, parent);
    if (isNew) drawNewIcon(stageIndex, x + 22, rowTop + 75, group);
    else drawOldIcon(stageIndex, x + 22, rowTop + 75, group);
    text(isNew ? stage.newV : stage.oldV, x + 108, rowTop + 102, {
      'font-family': MONO, 'font-size': 16, 'letter-spacing': .5,
      fill: isNew ? INK : INK45
    }, group);
    text(isNew ? stage.newNote : stage.oldNote, x + 108, rowTop + 140, {
      'font-size': 15, fill: isNew ? INK70 : INK45
    }, group);
  }

  function drawStageRow(stage, stageIndex, parent) {
    var rowTop = ROW_TOPS[stageIndex];
    var group = el('g', {
      'data-layout-zone': 'e4.stage-row-' + (stageIndex + 1),
      'data-slot-id': 'workflow-stage-compare',
      'data-repeat-unit': 'before-after-row',
      'data-stage-index': stage.index
    }, parent);
    text(stage.index, 108, rowTop + 70, {
      'data-xp-anchor': 'step',
      'font-family': MONO, 'font-size': 10, 'letter-spacing': 1.6, fill: INK45
    }, group);
    text(stage.en, 108, rowTop + 106, {
      'data-xp-anchor': 'step',
      'font-family': MONO, 'font-size': 10, 'letter-spacing': 1.2, fill: INK70
    }, group);
    text(stage.cn, 108, rowTop + 148, {
      'font-size': 20, 'font-weight': 400
    }, group);
    line(206, rowTop + 8, 206, rowTop + 176, { stroke: INK45, 'stroke-width': .55 }, group);
    drawStateCard(stage, stageIndex, 'old', rowTop, group);
    drawTransition(rowTop, stageIndex, group);
    drawStateCard(stage, stageIndex, 'new', rowTop, group);
    line(90, rowTop + 178, 990, rowTop + 178, { stroke: INK45, 'stroke-width': .5 }, group);
  }

  function drawComparisonMatrix() {
    var group = el('g', {
      'data-layout-zone': 'e4.comparison-matrix',
      'data-slot-id': 'four-stage-before-after-matrix',
      'data-fixed-quantity': '4'
    });
    STAGES.forEach(function (stage, stageIndex) { drawStageRow(stage, stageIndex, group); });
  }

  function drawKpi(kpi, index, parent) {
    var x = 90 + index * 300;
    var group = el('g', {
      'data-layout-zone': 'e4.kpi-' + (index + 1),
      'data-slot-id': 'result-kpi',
      'data-repeat-unit': 'kpi'
    }, parent);
    text(kpi.num, x + 92, KPI_TOP + 40, {
      id: 'e4-kpi-num-' + (index + 1), 'font-family': SERIF,
      'font-size': 38, 'font-weight': 500, 'text-anchor': 'end'
    }, group);
    text(kpi.label, x + 112, KPI_TOP + 20, {
      id: 'e4-kpi-label-' + (index + 1), 'font-size': 15, fill: INK70
    }, group);
    text(kpi.note, x + 112, KPI_TOP + 48, {
      id: 'e4-kpi-note-' + (index + 1), 'font-family': MONO,
      'font-size': 8.5, 'letter-spacing': 1.5, fill: INK45
    }, group);
  }

  function drawKpiBand() {
    var group = el('g', {
      'data-layout-zone': 'e4.kpi-band',
      'data-slot-id': 'workflow-outcome-kpis',
      'data-fixed-quantity': '3'
    });
    line(90, KPI_TOP, 990, KPI_TOP, { stroke: INK80, 'stroke-width': 1.2 }, group);
    line(90, KPI_TOP + KPI_HEIGHT, 990, KPI_TOP + KPI_HEIGHT, { stroke: INK45, 'stroke-width': .55 }, group);
    line(390, KPI_TOP + 13, 390, KPI_TOP + 51, { stroke: INK45, 'stroke-width': .5 }, group);
    line(690, KPI_TOP + 13, 690, KPI_TOP + 51, { stroke: INK45, 'stroke-width': .5 }, group);
    KPIS.forEach(function (kpi, index) { drawKpi(kpi, index, group); });
  }

  function drawReadingGuide() {
    var group = el('g', {
      'data-layout-zone': 'e4.reading-guide',
      'data-slot-id': 'matrix-reading-guide'
    });
    text('READ TOP TO BOTTOM · COMPARE LEFT TO RIGHT', 90, 1212, {
      'font-family': MONO, 'font-size': 9.2, 'letter-spacing': 1.25, fill: INK45
    }, group);
    text('每一行只比较同一个环节', 990, 1212, {
      'font-size': 12, 'text-anchor': 'end', fill: INK45
    }, group);
  }

  function drawE4() {
    drawDefs();
    text('AI 工作流重构创作、审阅、发布与复盘', 90, 214, {
      'font-family': SERIF, 'font-size': 46, 'font-weight': 500
    });
    text('四个环节逐行比较旧流程与新平台，底部用三项 KPI 收束结果。', 90, 266, {
      'font-size': 20, fill: INK70
    });
    drawSectionLabel();
    drawMatrixHeader();
    drawComparisonMatrix();
    drawKpiBand();
    drawReadingGuide();
  }

  drawE4();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
