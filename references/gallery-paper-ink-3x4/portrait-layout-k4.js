(function () {
  'use strict';

  var svg = document.querySelector('.scene');
  var NS = 'http://www.w3.org/2000/svg';
  var INK = 'var(--ink)';
  var INK80 = 'var(--ink-80)';
  var INK70 = 'var(--ink-70)';
  var INK45 = 'var(--ink-45)';
  var PAPER = 'var(--paper)';
  var PANEL = 'var(--paper-panel)';
  var SANS = 'var(--sans)';
  var MONO = 'var(--mono)';
  var SERIF = 'var(--serif)';
  var MATRIX_X = 90;
  var MATRIX_RIGHT = 990;
  var SCENE_RIGHT = 310;
  var HEADER_TOP = 336;
  var HEADER_BOTTOM = 400;
  var ROW_HEIGHT = (window.PORTRAIT_SAFE.bottom - HEADER_BOTTOM) / 3;
  var ROW_TOPS = [0, 1, 2].map(function (i) { return HEADER_BOTTOM + i * ROW_HEIGHT; });
  var DIMENSION_WIDTH = (MATRIX_RIGHT - SCENE_RIGHT) / 3;
  var DIMENSIONS = [
    { key: 'pain', en: 'PAIN', cn: '现状' },
    { key: 'fix', en: 'FIX', cn: '解法' },
    { key: 'ship', en: 'SHIP', cn: '落地' }
  ];
  var SCENES = [
    {
      index: '01', en: 'CUSTOMER SERVICE', cn: '智能客服', metric: '首答 < 3 s', metricEn: 'FIRST RESPONSE',
      pain: ['人工客服承接 70%', '重复咨询，', '平均响应 6 分钟，', '夜班无人覆盖。'],
      fix: [['chat', '问句改写'], ['tag', '意图路由'], ['send', '答案生成']],
      ship: 'service'
    },
    {
      index: '02', en: 'KNOWLEDGE BASE', cn: '企业知识库', metric: '命中率 89%', metricEn: 'HIT RATE',
      pain: ['文档十万页，检索靠', '关键词碰运气；', '命中率不足四成，', '答案无出处。'],
      fix: [['chart', '文档解析'], ['gear', '语义检索'], ['route', '引用作答']],
      ship: 'knowledge'
    },
    {
      index: '03', en: 'CODE ASSISTANT', cn: '代码助手', metric: '采纳率 76%', metricEn: 'ADOPTION',
      pain: ['代码评审靠资深', '工程师口口相传，', '风格与安全问题', '反复出现。'],
      fix: [['doc', '静态扫描'], ['flag', '建议标注'], ['book', '一键修复']],
      ship: 'code'
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

  function drawDefs() {
    var defs = el('defs', {});
    var hatch = el('pattern', {
      id: 'k4-hatch', width: 7, height: 7,
      patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)'
    }, defs);
    line(0, 0, 0, 7, { stroke: INK, 'stroke-width': .7, opacity: .32 }, hatch);
  }

  function drawSectionLabel() {
    var group = el('g', { 'data-layout-zone': 'k4.section', 'data-slot-id': 'section-label' });
    text('01 / SCENARIO MATRIX', 90, 309, {
      'font-family': MONO, 'font-size': 11, 'letter-spacing': 1.8, fill: INK45
    }, group);
    line(341, 305, 990, 305, { stroke: INK45, 'stroke-width': .65 }, group);
    text('3 SCENES · PAIN → FIX → SHIP', 990, 309, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.2,
      'text-anchor': 'end', fill: INK45
    }, group);
  }

  function drawMatrixBackgrounds() {
    var group = el('g', { 'data-layout-zone': 'k4.matrix-backgrounds' });
    el('rect', {
      x: MATRIX_X, y: HEADER_TOP, width: MATRIX_RIGHT - MATRIX_X,
      height: HEADER_BOTTOM - HEADER_TOP, fill: PANEL
    }, group);
    el('rect', {
      x: MATRIX_X, y: ROW_TOPS[1], width: MATRIX_RIGHT - MATRIX_X,
      height: ROW_HEIGHT, fill: PANEL
    }, group);
    line(MATRIX_X, ROW_TOPS[2] + ROW_HEIGHT, MATRIX_RIGHT, ROW_TOPS[2] + ROW_HEIGHT, { stroke: INK45, 'stroke-width': .6 }, group);
  }

  function drawMatrixFrame() {
    var group = el('g', {
      'data-layout-zone': 'k4.scenario-dimension-matrix',
      'data-slot-id': 'three-scenario-three-dimension-matrix',
      'data-fixed-quantity': '9',
      'data-matrix-rows': '3',
      'data-matrix-columns': '3'
    });
    line(MATRIX_X, HEADER_BOTTOM, MATRIX_RIGHT, HEADER_BOTTOM, {
      stroke: INK80, 'stroke-width': 1
    }, group);
    ROW_TOPS.slice(1).forEach(function (rowTop) {
      line(MATRIX_X, rowTop, MATRIX_RIGHT, rowTop, { stroke: INK45, 'stroke-width': .6 }, group);
    });
  }

  function drawMatrixHeader() {
    var group = el('g', {
      'data-layout-zone': 'k4.matrix-header',
      'data-slot-id': 'scenario-dimension-header',
      'data-fixed-quantity': '3'
    });
    text('SCENE', 112, 362, {
      'font-family': MONO, 'font-size': 10, 'letter-spacing': 1.6, fill: INK45
    }, group);
    text('场景', 112, 386, { 'font-size': 12, fill: INK45 }, group);
    DIMENSIONS.forEach(function (dimension, dimensionIndex) {
      var centerX = SCENE_RIGHT + DIMENSION_WIDTH * (dimensionIndex + .5);
      text(dimension.en, centerX, 362, {
        'font-family': MONO, 'font-size': 10.5, 'letter-spacing': 1.65,
        'text-anchor': 'middle', fill: INK70
      }, group);
      text(dimension.cn, centerX, 386, {
        'font-size': 13, 'text-anchor': 'middle', fill: INK45
      }, group);
    });
  }

  function drawSceneLabel(scene, rowTop, parent) {
    var group = el('g', {
      'data-layout-zone': 'k4.scene-label-' + scene.index,
      'data-slot-id': 'scenario-label'
    }, parent);
    el('circle', {
      cx: 124, cy: rowTop + 56, r: 18,
      fill: PAPER, stroke: INK80, 'stroke-width': 1.1
    }, group);
    text(scene.index, 124, rowTop + 60, {
      'font-family': MONO, 'font-size': 10, 'text-anchor': 'middle'
    }, group);
    text(scene.en, 160, rowTop + 46, {
      'font-family': MONO, 'font-size': 9, 'letter-spacing': .7, fill: INK45
    }, group);
    line(160, rowTop + 56, 286, rowTop + 56, { stroke: INK45, 'stroke-width': .55 }, group);
    text(scene.cn, 160, rowTop + 86, { 'font-size': 18, 'font-weight': 400 }, group);
    el('rect', {
      x: 110, y: rowTop + 140, width: 180, height: 54, rx: 2,
      fill: 'none', stroke: INK45, 'stroke-width': .65
    }, group);
    text(scene.metric, 200, rowTop + 164, {
      'font-size': 14, 'font-weight': 400, 'text-anchor': 'middle'
    }, group);
    text(scene.metricEn, 200, rowTop + 182, {
      'font-family': MONO, 'font-size': 7.4, 'letter-spacing': 1.05,
      'text-anchor': 'middle', fill: INK45
    }, group);
    text('SCENE ' + scene.index, 200, rowTop + 262, { 'data-xp-anchor': 'scene',
      'font-family': MONO, 'font-size': 8.5, 'letter-spacing': 1.25,
      'text-anchor': 'middle', fill: INK45
    }, group);
  }

  function drawPainCell(scene, rowTop, parent) {
    var left = SCENE_RIGHT;
    var centerX = left + DIMENSION_WIDTH / 2;
    var group = el('g', {
      'data-layout-zone': 'k4.pain-' + scene.index,
      'data-slot-id': 'pain-cell',
      'data-repeat-unit': 'matrix-cell',
      'data-cell-dimension': 'pain'
    }, parent);
    text('CURRENT SIGNAL', centerX, rowTop + 46, {
      'font-family': MONO, 'font-size': 8.2, 'letter-spacing': 1.35,
      'text-anchor': 'middle', fill: INK45
    }, group);
    scene.pain.forEach(function (painLine, lineIndex) {
      text(painLine, centerX, rowTop + 98 + lineIndex * 40, {
        'font-size': 13.2, 'text-anchor': 'middle', fill: lineIndex < 2 ? INK70 : INK
      }, group);
    });
  }

  function drawMiniIcon(kind, x, y, parent) {
    var stroke = { fill: 'none', stroke: INK80, 'stroke-width': 1.05 };
    if (kind === 'chat') {
      el('path', Object.assign({ d: 'M ' + (x - 13) + ' ' + (y - 9) + ' h 26 v 15 h -17 l -6 6 v -6 h -3 z' }, stroke), parent);
      line(x - 7, y - 3, x + 7, y - 3, { stroke: INK45, 'stroke-width': .75 }, parent);
    } else if (kind === 'tag') {
      el('path', Object.assign({ d: 'M ' + (x - 12) + ' ' + (y - 8) + ' h 13 l 10 8 l -10 8 h -13 z' }, stroke), parent);
      el('circle', { cx: x - 6, cy: y, r: 2, fill: 'none', stroke: INK80, 'stroke-width': .8 }, parent);
    } else if (kind === 'send') {
      el('path', Object.assign({ d: 'M ' + (x - 12) + ' ' + (y - 8) + ' L ' + (x + 12) + ' ' + y + ' L ' + (x - 12) + ' ' + (y + 8) + ' L ' + (x - 6) + ' ' + y + ' Z' }, stroke), parent);
    } else if (kind === 'chart') {
      line(x - 12, y + 9, x + 12, y + 9, stroke, parent);
      el('polyline', { points: (x - 10) + ',' + (y + 5) + ' ' + (x - 2) + ',' + (y - 4) + ' ' + (x + 4) + ',' + (y + 1) + ' ' + (x + 11) + ',' + (y - 8), fill: 'none', stroke: INK80, 'stroke-width': 1.05 }, parent);
    } else if (kind === 'gear') {
      el('circle', Object.assign({ cx: x, cy: y, r: 10 }, stroke), parent);
      el('circle', Object.assign({ cx: x, cy: y, r: 3 }, stroke), parent);
    } else if (kind === 'route') {
      el('path', Object.assign({ d: 'M ' + (x - 12) + ' ' + (y + 8) + ' H ' + (x - 2) + ' L ' + (x + 4) + ' ' + (y - 6) + ' H ' + (x + 12) }, stroke), parent);
    } else if (kind === 'doc') {
      el('rect', Object.assign({ x: x - 10, y: y - 12, width: 20, height: 24 }, stroke), parent);
      [y - 5, y, y + 5].forEach(function (yy) { line(x - 5, yy, x + 5, yy, { stroke: INK45, 'stroke-width': .7 }, parent); });
    } else if (kind === 'flag') {
      line(x - 6, y + 12, x - 6, y - 12, stroke, parent);
      el('path', { d: 'M ' + (x - 6) + ' ' + (y - 12) + ' L ' + (x + 10) + ' ' + (y - 8) + ' L ' + (x - 6) + ' ' + (y - 4) + ' Z', fill: 'url(#k4-hatch)', stroke: INK80, 'stroke-width': .9 }, parent);
    } else {
      el('path', Object.assign({ d: 'M ' + (x - 12) + ' ' + (y - 9) + ' Q ' + (x - 4) + ' ' + (y - 13) + ' ' + x + ' ' + (y - 9) + ' Q ' + (x + 4) + ' ' + (y - 13) + ' ' + (x + 12) + ' ' + (y - 9) + ' V ' + (y + 9) + ' Q ' + (x + 4) + ' ' + (y + 5) + ' ' + x + ' ' + (y + 9) + ' Q ' + (x - 4) + ' ' + (y + 5) + ' ' + (x - 12) + ' ' + (y + 9) + ' Z' }, stroke), parent);
      line(x, y - 9, x, y + 9, { stroke: INK45, 'stroke-width': .7 }, parent);
    }
  }

  function drawFixCell(scene, rowTop, parent) {
    var left = SCENE_RIGHT + DIMENSION_WIDTH;
    var group = el('g', {
      'data-layout-zone': 'k4.fix-' + scene.index,
      'data-slot-id': 'three-step-fix-cell',
      'data-repeat-unit': 'matrix-cell',
      'data-cell-dimension': 'fix',
      'data-fixed-quantity': '3',
      'data-transition-style': 'simple-down',
      'data-arrow-count': '2'
    }, parent);
    scene.fix.forEach(function (step, stepIndex) {
      var y = rowTop + 60 + stepIndex * 80;
      drawMiniIcon(step[0], left + 40, y, group);
      text(step[1], left + 72, y - 2, { 'font-size': 14, fill: INK }, group);
      text('STEP 0' + (stepIndex + 1), left + 72, y + 20, {
        'font-family': MONO, 'font-size': 7.8, 'letter-spacing': 1.2, fill: INK45
      }, group);
      if (stepIndex < 2) {
        line(left + 40, y + 28, left + 40, y + 51, {
          stroke: INK45, 'stroke-width': .75
        }, group);
        el('path', {
          d: 'M ' + (left + 36) + ' ' + (y + 36) + ' L ' + (left + 40) + ' ' + (y + 42) + ' L ' + (left + 44) + ' ' + (y + 36),
          fill: 'none', stroke: INK45, 'stroke-width': .75
        }, group);
      }
    });
  }

  function drawServiceShip(left, rowTop, parent) {
    var labels = ['试点', '铺开', '常态'];
    labels.forEach(function (label, index) {
      var x = left + 18 + index * 73;
      el('rect', {
        x: x, y: rowTop + 104, width: 57, height: 40,
        fill: index === 1 ? 'url(#k4-hatch)' : PAPER,
        stroke: INK80, 'stroke-width': 1
      }, parent);
      text(label, x + 28.5, rowTop + 129, {
        'font-size': 11.5, 'text-anchor': 'middle', fill: index === 1 ? INK : INK70
      }, parent);
      if (index < 2) {
        line(x + 57, rowTop + 124, x + 73, rowTop + 124, { stroke: INK70, 'stroke-width': .9 }, parent);
        el('path', {
          d: 'M ' + (x + 68) + ' ' + (rowTop + 88) + ' L ' + (x + 73) + ' ' + (rowTop + 92) + ' L ' + (x + 68) + ' ' + (rowTop + 96),
          fill: 'none', stroke: INK70, 'stroke-width': .9
        }, parent);
      }
    });
    text('覆盖 32 个客服场景', left + DIMENSION_WIDTH / 2, rowTop + 240, {
      'font-size': 12.5, 'text-anchor': 'middle', fill: INK45
    }, parent);
  }

  function drawKnowledgeShip(left, rowTop, parent) {
    var items = [['接入', 0, 0], ['切片', 1, 0], ['嵌入', 0, 1], ['重排', 1, 1]];
    items.forEach(function (item) {
      var x = left + 36 + item[1] * 88;
      var y = rowTop + 48 + item[2] * 48;
      el('rect', {
        x: x, y: y, width: 76, height: 36,
        fill: item[1] === 1 && item[2] === 0 ? 'url(#k4-hatch)' : PAPER,
        stroke: INK80, 'stroke-width': .9
      }, parent);
      text(item[0], x + 38, y + 23, { 'font-size': 11.5, 'text-anchor': 'middle', fill: INK70 }, parent);
    });
    line(left + DIMENSION_WIDTH / 2, rowTop + 172, left + DIMENSION_WIDTH / 2, rowTop + 191, {
      stroke: INK70, 'stroke-width': .9
    }, parent);
    el('path', {
      d: 'M ' + (left + DIMENSION_WIDTH / 2 - 5) + ' ' + (rowTop + 186) + ' L ' + (left + DIMENSION_WIDTH / 2) + ' ' + (rowTop + 192) + ' L ' + (left + DIMENSION_WIDTH / 2 + 5) + ' ' + (rowTop + 186),
      fill: 'none', stroke: INK70, 'stroke-width': .9
    }, parent);
    el('rect', {
      x: left + 36, y: rowTop + 212, width: 164, height: 38,
      fill: PANEL, stroke: INK80, 'stroke-width': 1
    }, parent);
    text('检索闭环', left + DIMENSION_WIDTH / 2, rowTop + 237, {
      id: 'sample-focus', 'font-size': 12.5, 'text-anchor': 'middle'
    }, parent);
  }

  function drawCodeShip(left, rowTop, parent) {
    var cx = left + DIMENSION_WIDTH / 2;
    var cy = rowTop + 142;
    var satellites = [
      { x: cx - 72, y: cy - 58, label: '会话' },
      { x: cx + 72, y: cy - 58, label: '工单' },
      { x: cx, y: cy + 70, label: 'IDE' }
    ];
    satellites.forEach(function (item) {
      line(cx, cy, item.x, item.y, { stroke: INK45, 'stroke-width': .75, 'stroke-dasharray': '2 4' }, parent);
    });
    el('circle', {
      cx: cx, cy: cy, r: 30, fill: PAPER, stroke: INK80, 'stroke-width': 1.1,
      'data-path-mask': 'k4.code-ship-core'
    }, parent);
    el('circle', { cx: cx, cy: cy, r: 23, fill: 'none', stroke: INK45, 'stroke-width': .55 }, parent);
    text('7×24', cx, cy + 4, { 'font-family': MONO, 'font-size': 8.5, 'text-anchor': 'middle' }, parent);
    satellites.forEach(function (item) {
      el('circle', {
        cx: item.x, cy: item.y, r: 24, fill: PAPER, stroke: INK80, 'stroke-width': .9,
        'data-path-mask': 'k4.code-ship-satellite'
      }, parent);
      text(item.label, item.x, item.y + 4, { 'font-size': 10.5, 'text-anchor': 'middle', fill: INK70 }, parent);
    });
    text('评审时长减半', cx, rowTop + 266, {
      'font-size': 12.5, 'text-anchor': 'middle', fill: INK45
    }, parent);
  }

  function drawShipCell(scene, rowTop, parent) {
    var left = SCENE_RIGHT + DIMENSION_WIDTH * 2;
    var group = el('g', {
      'data-layout-zone': 'k4.ship-' + scene.index,
      'data-slot-id': 'ship-cell',
      'data-repeat-unit': 'matrix-cell',
      'data-cell-dimension': 'ship',
      'data-ship-variant': scene.ship
    }, parent);
    if (scene.ship === 'service') drawServiceShip(left, rowTop, group);
    else if (scene.ship === 'knowledge') drawKnowledgeShip(left, rowTop, group);
    else drawCodeShip(left, rowTop, group);
  }

  function drawScenarioRow(scene, sceneIndex) {
    var rowTop = ROW_TOPS[sceneIndex];
    var group = el('g', {
      'data-layout-zone': 'k4.scenario-row-' + scene.index,
      'data-slot-id': 'scenario-row',
      'data-repeat-unit': 'scenario-row',
      'data-scene-index': scene.index
    });
    drawSceneLabel(scene, rowTop, group);
    drawPainCell(scene, rowTop, group);
    drawFixCell(scene, rowTop, group);
    drawShipCell(scene, rowTop, group);
  }

  function drawK4() {
    drawDefs();
    text('三类 AI 场景，都要走完现状、解法与落地', 90, 214, {
      'font-family': SERIF, 'font-size': 42, 'font-weight': 500
    });
    text('三行分别看客服、知识库与代码助手；三列始终对齐同一实施维度。', 90, 266, {
      'font-size': 19, fill: INK70
    });
    drawSectionLabel();
    drawMatrixBackgrounds();
    drawMatrixFrame();
    drawMatrixHeader();
    SCENES.forEach(function (scene, sceneIndex) { drawScenarioRow(scene, sceneIndex); });
  }

  drawK4();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
