(function () {
  'use strict';

  var svg = document.querySelector('.scene');
  var NS = 'http://www.w3.org/2000/svg';
  var INK = 'var(--ink)';
  var INK80 = 'var(--ink-80)';
  var INK70 = 'var(--ink-70)';
  var INK45 = 'var(--ink-45)';
  var FUNCTIONAL = 'var(--wp-color-functional)';
  var PAPER = 'var(--paper)';
  var PANEL = 'var(--paper-panel)';
  var SANS = 'var(--sans)';
  var MONO = 'var(--mono)';
  var SERIF = 'var(--serif)';
  var MATRIX_X = 90;
  var MATRIX_RIGHT = 990;
  var STAGE_RIGHT = 310;
  var HEADER_TOP = 348;
  var HEADER_BOTTOM = 408;
  var ROW_HEIGHT = (window.PORTRAIT_SAFE.bottom - HEADER_BOTTOM) / 4;
  var ROW_TOPS = [0, 1, 2, 3].map(function (i) { return HEADER_BOTTOM + i * ROW_HEIGHT; });
  var DIMENSION_WIDTH = (MATRIX_RIGHT - STAGE_RIGHT) / 3;
  var DIMENSIONS = [
    { key: 'action', en: 'ACTION', cn: '关键动作' },
    { key: 'metric', en: 'METRIC', cn: '核心指标' },
    { key: 'stack', en: 'STACK', cn: '技术栈' }
  ];
  var STAGES = [
    {
      index: '01', en: 'AWARE', cn: '认知', outcome: 'SPARK INTEREST',
      action: [['DEMO', '场景演示'], ['EDU', '全员科普']],
      metric: [['8 %', '渗透率'], ['120', '调用量/日']],
      stack: [['API', '模型接口'], ['CHAT', '对话工具']]
    },
    {
      index: '02', en: 'PILOT', cn: '试点', outcome: 'PROVE VALUE',
      action: [['PILOT', '小范围试点'], ['PROMPT', '提示工程']],
      metric: [['35 %', '渗透率'], ['4.6K', '调用量/日']],
      stack: [['RAG', '检索增强'], ['EVAL', '评测平台']]
    },
    {
      index: '03', en: 'SCALE', cn: '推广', outcome: 'SCALE ORG-WIDE',
      action: [['ROLL', '跨部门推广'], ['FLOW', '流程改造']],
      metric: [['68 %', '渗透率'], ['38K', '调用量/日']],
      stack: [['AGENT', '智能体框架'], ['VECTOR', '向量库']]
    },
    {
      index: '04', en: 'NATIVE', cn: '原生', outcome: 'AI-NATIVE OPS', focus: true,
      action: [['EMBED', '业务原生'], ['AGENT', '智能体编排']],
      metric: [['92 %', '渗透率'], ['260K', '调用量/日']],
      stack: [['MESH', '智能体网络'], ['MEMORY', '长期记忆']]
    }
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

  function drawSectionLabel() {
    var group = el('g', { 'data-layout-zone': 'k1.section', 'data-slot-id': 'section-label' });
    text('01 / STAGE × DIMENSION', 90, 309, {
      'font-family': MONO, 'font-size': 11, 'letter-spacing': 1.8, fill: INK45
    }, group);
    line(363, 305, 990, 305, { stroke: INK45, 'stroke-width': .65 }, group);
    text('4 STAGES · 3 DIMENSIONS · 12 CELLS', 990, 309, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.15,
      'text-anchor': 'end', fill: INK45
    }, group);
  }

  function drawMatrixBackgrounds() {
    var group = el('g', { 'data-layout-zone': 'k1.matrix-backgrounds' });
    el('rect', {
      x: MATRIX_X, y: HEADER_TOP, width: MATRIX_RIGHT - MATRIX_X,
      height: HEADER_BOTTOM - HEADER_TOP, fill: PANEL
    }, group);
    el('rect', {
      id: 'k1-native-stage-surface',
      x: MATRIX_X, y: ROW_TOPS[3], width: MATRIX_RIGHT - MATRIX_X,
      height: ROW_HEIGHT, fill: PANEL
    }, group);
  }

  function drawMatrixFrame() {
    var group = el('g', {
      'data-layout-zone': 'k1.stage-dimension-matrix',
      'data-slot-id': 'four-stage-three-dimension-matrix',
      'data-fixed-quantity': '12',
      'data-matrix-rows': '4',
      'data-matrix-columns': '3'
    });
    line(MATRIX_X, HEADER_TOP, MATRIX_RIGHT, HEADER_TOP, {
      stroke: INK45, 'stroke-width': .75
    }, group);
    line(MATRIX_X, ROW_TOPS[3] + ROW_HEIGHT, MATRIX_RIGHT, ROW_TOPS[3] + ROW_HEIGHT, {
      stroke: INK45, 'stroke-width': .75
    }, group);
    line(STAGE_RIGHT, HEADER_TOP, STAGE_RIGHT, ROW_TOPS[3] + ROW_HEIGHT, {
      stroke: INK45, 'stroke-width': .7
    }, group);
    for (var columnIndex = 1; columnIndex < 3; columnIndex += 1) {
      var x = STAGE_RIGHT + DIMENSION_WIDTH * columnIndex;
      line(x, HEADER_TOP, x, ROW_TOPS[3] + ROW_HEIGHT, {
        stroke: INK45, 'stroke-width': .55, 'stroke-dasharray': '3 5'
      }, group);
    }
    line(MATRIX_X, HEADER_BOTTOM, MATRIX_RIGHT, HEADER_BOTTOM, {
      stroke: INK, 'stroke-width': 1
    }, group);
    ROW_TOPS.slice(1).forEach(function (rowTop) {
      line(MATRIX_X, rowTop, MATRIX_RIGHT, rowTop, { stroke: FUNCTIONAL, 'stroke-width': .6 }, group);
    });
  }

  function drawMatrixHeader() {
    var group = el('g', {
      'data-layout-zone': 'k1.matrix-header',
      'data-slot-id': 'dimension-column-header',
      'data-fixed-quantity': '3'
    });
    text('STAGE', 112, 376, {
      'font-family': MONO, 'font-size': 10, 'letter-spacing': 1.6, fill: INK45
    }, group);
    text('阶段', 112, 397, { 'font-size': 12, fill: INK45 }, group);
    DIMENSIONS.forEach(function (dimension, dimensionIndex) {
      var centerX = STAGE_RIGHT + DIMENSION_WIDTH * (dimensionIndex + .5);
      text(dimension.en, centerX, 375, {
        'font-family': MONO, 'font-size': 10.5, 'letter-spacing': 1.55,
        'text-anchor': 'middle', fill: INK70
      }, group);
      text(dimension.cn, centerX, 398, {
        'font-size': 13, 'text-anchor': 'middle', fill: INK45
      }, group);
    });
  }

  function drawOpenArrow(x, y, parent) {
    line(x - 6, y - 8, x, y, { stroke: INK45, 'stroke-width': .9 }, parent);
    line(x + 6, y - 8, x, y, { stroke: INK45, 'stroke-width': .9 }, parent);
  }

  function drawStageChain() {
    var group = el('g', {
      'data-layout-zone': 'k1.stage-chain',
      'data-slot-id': 'stage-order-guide',
      'data-fixed-quantity': '4'
    });
    var x = 126;
    var centers = ROW_TOPS.map(function (rowTop) { return rowTop + 54; });
    for (var index = 0; index < centers.length - 1; index += 1) {
      line(x, centers[index] + 24, x, centers[index + 1] - 24, {
        stroke: INK45, 'stroke-width': .85,
        'data-overlap-audit-role': 'connector'
      }, group);
      drawOpenArrow(x, centers[index + 1] - 28, group);
    }
  }

  function drawCellEntries(stage, dimension, dimensionIndex, rowTop, parent) {
    var cellLeft = STAGE_RIGHT + DIMENSION_WIDTH * dimensionIndex;
    var cellCenter = cellLeft + DIMENSION_WIDTH / 2;
    var entries = stage[dimension.key];
    var group = el('g', {
      'data-layout-zone': 'k1.' + stage.en.toLowerCase() + '-' + dimension.key,
      'data-slot-id': dimension.key + '-cell',
      'data-repeat-unit': 'matrix-cell',
      'data-fixed-quantity': '2'
    }, parent);
    entries.forEach(function (entry, entryIndex) {
      var baseline = rowTop + 78 + entryIndex * 82;
      text(entry[0], cellCenter, baseline, {
        'font-family': MONO, 'font-size': dimension.key === 'metric' ? 16 : 12,
        'letter-spacing': dimension.key === 'metric' ? .5 : 1.05,
        'text-anchor': 'middle', fill: dimension.key === 'metric' ? INK : INK70
      }, group);
      text(entry[1], cellCenter, baseline + 27, {
        'font-size': 14.5, 'text-anchor': 'middle', fill: INK70
      }, group);
    });
  }

  function drawStageRow(stage, stageIndex) {
    var rowTop = ROW_TOPS[stageIndex];
    var group = el('g', {
      'data-layout-zone': 'k1.stage-row-' + (stageIndex + 1),
      'data-slot-id': 'maturity-stage-row',
      'data-repeat-unit': 'stage-row',
      'data-stage-index': stage.index
    });
    var nodeIds = stage.focus ? {
      frame: 'k1-focus-frame', inner: 'k1-focus-frame-inner', no: 'k1-focus-no',
      en: 'k1-focus-en', divider: 'k1-focus-divider', cn: 'k1-focus-cn',
      outcome: 'k1-focus-outcome'
    } : {};
    el('circle', {
      id: nodeIds.frame || '', cx: 126, cy: rowTop + 62, r: 18,
      fill: PAPER, stroke: INK, 'stroke-width': 1.15
    }, group);
    el('circle', {
      id: nodeIds.inner || '', cx: 126, cy: rowTop + 62, r: 14,
      fill: 'none', stroke: INK, 'stroke-width': .55, opacity: .32
    }, group);
    text(stage.index, 126, rowTop + 66, {
      id: nodeIds.no || '', 'font-family': MONO, 'font-size': 10,
      'text-anchor': 'middle'
    }, group);
    text(stage.en, 162, rowTop + 48, {
      id: nodeIds.en || '', 'font-family': MONO, 'font-size': 10.5,
      'letter-spacing': 1.3, fill: INK70
    }, group);
    line(162, rowTop + 57, 286, rowTop + 57, {
      id: nodeIds.divider || '', stroke: INK45, 'stroke-width': .55
    }, group);
    text(stage.cn, 162, rowTop + 87, {
      id: nodeIds.cn || '', 'font-size': 19, 'font-weight': 400
    }, group);
    el('rect', {
      x: 162, y: rowTop + 132, width: 128, height: 34, rx: 2,
      fill: 'none', stroke: INK45, 'stroke-width': .65,
      'data-overlap-audit-role': 'card-boundary'
    }, group);
    text(stage.outcome, 226, rowTop + 154, {
      id: nodeIds.outcome || '', 'font-family': MONO, 'font-size': 8.2,
      'letter-spacing': .75, 'text-anchor': 'middle', fill: INK70
    }, group);
    DIMENSIONS.forEach(function (dimension, dimensionIndex) {
      drawCellEntries(stage, dimension, dimensionIndex, rowTop, group);
    });
  }

  function drawK1() {
    text('四个阶段，都要同时升级三条能力线', 90, 214, {
      'font-family': SERIF, 'font-size': 44, 'font-weight': 500
    });
    text('成熟度沿纵向推进；每一行横向核对关键动作、核心指标与技术栈。', 90, 266, {
      'font-size': 19, fill: INK70
    });
    drawSectionLabel();
    drawMatrixBackgrounds();
    drawMatrixFrame();
    drawMatrixHeader();
    drawStageChain();
    STAGES.forEach(function (stage, stageIndex) { drawStageRow(stage, stageIndex); });
  }

  drawK1();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
