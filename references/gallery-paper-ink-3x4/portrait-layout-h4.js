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

  var PRODUCT_ITEMS = [
    { glyph: 'robot', en: 'AGENT PLATFORM', cn: 'Agent 平台', note: '智能体编排与多步执行' },
    { glyph: 'dock', en: 'KNOWLEDGE BASE', cn: '知识库', note: '企业私有知识检索增强' },
    { glyph: 'drone', en: 'MULTIMODAL', cn: '多模态助手', note: '图文音视统一理解与生成' }
  ];

  var CAPABILITY_ITEMS = [
    { glyph: 'route', en: 'TRAINING', cn: '模型训练', note: '预训练与指令微调流水线' },
    { glyph: 'tree', en: 'INFERENCE', cn: '推理服务', note: '高并发低延迟在线推理' },
    { glyph: 'cross', en: 'EVALUATION', cn: '评测体系', note: '离线基准与线上质量监控' }
  ];

  var STACK_X = 90;
  var STACK_WIDTH = 900;
  var LAYER_HEIGHT = 290;
  var PRODUCT_Y = 335;
  var CAPABILITY_Y = 700;
  var FOUNDATION_Y = 1080;
  var CARD_WIDTH = 276;
  var CARD_HEIGHT = 212;
  var CARD_GAP = 18;
  var CARD_X = [108, 402, 696];
  var COLUMN_CENTERS = CARD_X.map(function (x) { return x + CARD_WIDTH / 2; });

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

  function sectionLabel(y) {
    var group = el('g', { 'data-layout-zone': 'h4.section', 'data-slot-id': 'section-label' });
    text('01 / FOUNDATION STACK', 90, y, {
      'font-family': MONO, 'font-size': 11, 'letter-spacing': 1.8, fill: INK45
    }, group);
    line(356, y - 4, 990, y - 4, { stroke: INK45, 'stroke-width': .65 }, group);
    text('THREE LAYERS', 990, y, {
      'font-family': MONO, 'font-size': 10, 'letter-spacing': 1.5, 'text-anchor': 'end', fill: INK45
    }, group);
  }

  function nodeDot(cx, cy, parent) {
    el('circle', { cx: cx, cy: cy, r: 4.5, fill: PAPER, stroke: INK80, 'stroke-width': 1 }, parent);
    el('circle', { cx: cx, cy: cy, r: 1.6, fill: INK }, parent);
  }

  function glyphRoute(cx, cy, parent) {
    el('path', {
      d: 'M ' + (cx - 27) + ' ' + (cy + 14) + ' C ' + (cx - 7) + ' ' + (cy - 22) + ', ' + (cx + 5) + ' ' + (cy + 26) + ', ' + (cx + 27) + ' ' + (cy - 14),
      fill: 'none', stroke: FUNCTIONAL, 'stroke-width': 1.2
    }, parent);
    nodeDot(cx - 27, cy + 14, parent);
    nodeDot(cx + 27, cy - 14, parent);
  }

  function glyphTree(cx, cy, parent) {
    nodeDot(cx - 27, cy, parent);
    [[15, -19], [15, 0], [15, 19]].forEach(function (point) {
      line(cx - 22, cy, cx + point[0] - 4, cy + point[1], { stroke: FUNCTIONAL, 'stroke-width': .9 }, parent);
      nodeDot(cx + point[0], cy + point[1], parent);
    });
  }

  function glyphCross(cx, cy, parent) {
    line(cx - 27, cy - 17, cx + 27, cy + 17, { stroke: FUNCTIONAL, 'stroke-width': 1.2 }, parent);
    line(cx - 27, cy + 17, cx + 27, cy - 17, { stroke: FUNCTIONAL, 'stroke-width': .9, 'stroke-dasharray': '4 3' }, parent);
    el('circle', {
      cx: cx, cy: cy, r: 9, fill: PAPER, stroke: FUNCTIONAL, 'stroke-width': 1.1,
      'data-path-mask': 'h4.cross-glyph-core'
    }, parent);
    text('~', cx, cy + 4, { 'font-family': MONO, 'font-size': 13, 'text-anchor': 'middle' }, parent);
  }

  function glyphRobot(cx, cy, parent) {
    el('rect', { x: cx - 20, y: cy - 17, width: 40, height: 26, rx: 5, fill: 'none', stroke: FUNCTIONAL, 'stroke-width': 1.2 }, parent);
    line(cx, cy - 17, cx, cy - 26, { stroke: FUNCTIONAL }, parent);
    el('circle', { cx: cx, cy: cy - 29, r: 2.3, fill: PAPER, stroke: INK, 'stroke-width': 1 }, parent);
    el('circle', { cx: cx - 8, cy: cy - 5, r: 1.7, fill: INK }, parent);
    el('circle', { cx: cx + 8, cy: cy - 5, r: 1.7, fill: INK }, parent);
    el('circle', { cx: cx - 12, cy: cy + 13, r: 5.7, fill: 'none', stroke: FUNCTIONAL, 'stroke-width': 1.1 }, parent);
    el('circle', { cx: cx + 12, cy: cy + 13, r: 5.7, fill: 'none', stroke: FUNCTIONAL, 'stroke-width': 1.1 }, parent);
  }

  function glyphDock(cx, cy, parent) {
    line(cx - 31, cy + 14, cx + 31, cy + 14, { stroke: FUNCTIONAL, 'stroke-width': 1.3 }, parent);
    [-23, 0, 23].forEach(function (dx) {
      line(cx + dx, cy + 14, cx + dx, cy + 23, { stroke: FUNCTIONAL }, parent);
    });
    el('rect', { x: cx - 25, y: cy - 9, width: 27, height: 17, fill: 'none', stroke: FUNCTIONAL, 'stroke-width': 1.1 }, parent);
    el('path', {
      d: 'M ' + (cx + 2) + ' ' + (cy + 8) + ' L ' + (cx + 2) + ' ' + (cy - 9) + ' L ' + (cx + 17) + ' ' + (cy - 9) + ' L ' + (cx + 25) + ' ' + (cy + 1) + ' L ' + (cx + 25) + ' ' + (cy + 8) + ' Z',
      fill: 'none', stroke: FUNCTIONAL, 'stroke-width': 1.1
    }, parent);
    el('circle', { cx: cx - 14, cy: cy + 10, r: 3.7, fill: PAPER, stroke: INK, 'stroke-width': 1 }, parent);
    el('circle', { cx: cx + 15, cy: cy + 10, r: 3.7, fill: PAPER, stroke: INK, 'stroke-width': 1 }, parent);
  }

  function glyphDrone(cx, cy, parent) {
    line(cx - 21, cy - 15, cx + 21, cy + 15, { stroke: FUNCTIONAL, 'stroke-width': 1.1 }, parent);
    line(cx - 21, cy + 15, cx + 21, cy - 15, { stroke: FUNCTIONAL, 'stroke-width': 1.1 }, parent);
    [[-21, -15], [21, 15], [-21, 15], [21, -15]].forEach(function (point) {
      el('ellipse', { cx: cx + point[0], cy: cy + point[1], rx: 7, ry: 3, fill: 'none', stroke: INK, 'stroke-width': 1 }, parent);
    });
    el('rect', { x: cx - 7, y: cy - 5, width: 14, height: 10, fill: PAPER, stroke: FUNCTIONAL, 'stroke-width': 1.1 }, parent);
    line(cx, cy + 5, cx, cy + 14, { stroke: FUNCTIONAL, 'stroke-width': .9, 'stroke-dasharray': '2 2' }, parent);
  }

  function drawGlyph(kind, cx, cy, parent) {
    var glyphs = {
      route: glyphRoute,
      tree: glyphTree,
      cross: glyphCross,
      robot: glyphRobot,
      dock: glyphDock,
      drone: glyphDrone
    };
    glyphs[kind](cx, cy, parent);
  }

  function drawCard(item, layerKind, cardIndex, x, y, parent) {
    var zonePrefix = layerKind === 'product' ? 'h4.product-card-' : 'h4.capability-card-';
    var group = el('g', {
      'data-layout-zone': zonePrefix + (cardIndex + 1),
      'data-slot-id': layerKind + '-card-' + (cardIndex + 1),
      'data-repeat-unit': 'card'
    }, parent);
    el('rect', { x: x, y: y, width: CARD_WIDTH, height: CARD_HEIGHT, fill: PAPER, stroke: INK80, 'stroke-width': 1.1 }, group);
    el('rect', { x: x + 5, y: y + 5, width: CARD_WIDTH - 10, height: CARD_HEIGHT - 10, fill: 'none', stroke: INK45, 'stroke-width': .55 }, group);
    line(x + 18, y + 18, x + 62, y + 18, { stroke: INK, 'stroke-width': 1.4 }, group);
    text(String(cardIndex + 1).padStart(2, '0'), x + CARD_WIDTH - 18, y + 22, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.3, 'text-anchor': 'end', fill: INK45
    }, group);
    var glyphGroup = el('g', {
      'data-layout-zone': 'h4.glyph-' + (layerKind === 'product' ? cardIndex + 1 : cardIndex + 4),
      'data-slot-id': layerKind + '-glyph-' + (cardIndex + 1)
    }, group);
    drawGlyph(item.glyph, x + CARD_WIDTH / 2, y + 65, glyphGroup);
    text(item.en, x + CARD_WIDTH / 2, y + 119, {
      'font-family': MONO, 'font-size': item.en.length > 13 ? 9.2 : 10,
      'letter-spacing': item.en.length > 13 ? 1.1 : 1.5, 'text-anchor': 'middle', fill: INK45
    }, group);
    text(item.cn, x + CARD_WIDTH / 2, y + 153, {
      'font-size': item.cn.length > 6 ? 20 : 23, 'font-weight': 400, 'text-anchor': 'middle'
    }, group);
    line(x + 36, y + 172, x + CARD_WIDTH - 36, y + 172, { stroke: INK45, 'stroke-width': .55 }, group);
    text(item.note, x + CARD_WIDTH / 2, y + 198, {
      'font-size': item.note.length > 12 ? 13.2 : 14.5, 'text-anchor': 'middle', fill: INK70
    }, group);
  }

  function drawLayer(kind, y, no, en, cn, items) {
    var group = el('g', {
      'data-layout-zone': 'h4.layer-' + kind,
      'data-slot-id': 'layer-' + kind,
      'data-repeat-unit': 'layer'
    });
    el('rect', { x: STACK_X, y: y, width: STACK_WIDTH, height: LAYER_HEIGHT, fill: 'none', stroke: INK80, 'stroke-width': 1.1 }, group);
    el('rect', { x: STACK_X + 1, y: y + 1, width: STACK_WIDTH - 2, height: 42, fill: PANEL, opacity: .78 }, group);
    text(no + ' / ' + en, STACK_X + 18, y + 28, {
      'font-family': MONO, 'font-size': 10.5, 'letter-spacing': 1.5, fill: INK45
    }, group);
    text(cn, STACK_X + STACK_WIDTH - 18, y + 29, {
      'font-size': 16, 'font-weight': 400, 'text-anchor': 'end', fill: INK70
    }, group);
    items.forEach(function (item, cardIndex) {
      drawCard(item, kind, cardIndex, CARD_X[cardIndex], y + 60, group);
    });
  }

  function drawLiftArrow(x, y1, y2, arrowIndex, label) {
    var group = el('g', {
      'data-layout-zone': 'h4.lift-' + arrowIndex,
      'data-slot-id': 'lift-' + arrowIndex
    });
    line(x, y1, x, y2, { stroke: INK80, 'stroke-width': 1.15 }, group);
    line(x - 7, y2 + 10, x, y2, { stroke: INK, 'stroke-width': 1.25 }, group);
    line(x + 7, y2 + 10, x, y2, { stroke: INK, 'stroke-width': 1.25 }, group);
    if (label) text(label, x + 14, (y1 + y2) / 2 + 4, {
      'font-family': MONO, 'font-size': 9, 'letter-spacing': 1.4, fill: INK45
    }, group);
  }

  function drawFoundation() {
    var group = el('g', {
      'data-layout-zone': 'h4.foundation-band',
      'data-slot-id': 'foundation-band',
      'data-repeat-unit': 'layer'
    });
    el('rect', {
      id: 'h4-focus-frame', x: STACK_X, y: FOUNDATION_Y, width: STACK_WIDTH, height: 140,
      fill: 'url(#h4-hatch)', stroke: INK80, 'stroke-width': 1.3
    }, group);
    el('rect', { x: STACK_X + 7, y: FOUNDATION_Y + 7, width: STACK_WIDTH - 14, height: 126, fill: 'none', stroke: INK45, 'stroke-width': .6 }, group);
    text('L1 / AI CORE — COMPUTE + TRAINING FRAMEWORK', 540, FOUNDATION_Y + 42, {
      'font-family': MONO, 'font-size': 11, 'letter-spacing': 1.8, 'text-anchor': 'middle', fill: INK
    }, group);
    text('AI 算力底座 · 训练与推理一体化框架', 540, FOUNDATION_Y + 82, {
      id: 'h4-focus-label', 'font-size': 22, 'font-weight': 400, 'text-anchor': 'middle'
    }, group);
    text('REV 4.2', STACK_X + 24, FOUNDATION_Y + 116, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.4, fill: INK45
    }, group);
    text('2,400 GPU', STACK_X + STACK_WIDTH - 24, FOUNDATION_Y + 116, {
      id: 'sample-focus', 'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.4,
      'text-anchor': 'end', fill: INK45
    }, group);
  }

  function drawStack() {
    var group = el('g', {
      'data-layout-zone': 'h4.stack',
      'data-slot-id': 'foundation-stack',
      'data-fixed-quantity': '3'
    });
    drawLayer('product', PRODUCT_Y, 'L3', 'PRODUCT & SCENE', '产品与场景层', PRODUCT_ITEMS);
    COLUMN_CENTERS.forEach(function (x, index) { drawLiftArrow(x, 688, 637, index + 1, index === 0 ? 'LIFT' : ''); });
    drawLayer('capability', CAPABILITY_Y, 'L2', 'CORE CAPABILITY', '训练 · 推理 · 评测', CAPABILITY_ITEMS);
    COLUMN_CENTERS.forEach(function (x, index) { drawLiftArrow(x, 1068, 1002, index + 4, index === 0 ? 'LIFT' : ''); });
    drawFoundation();
    group.appendChild(document.querySelector('[data-layout-zone="h4.layer-product"]'));
    document.querySelectorAll('[data-layout-zone^="h4.lift-"]').forEach(function (node) { group.appendChild(node); });
    group.appendChild(document.querySelector('[data-layout-zone="h4.layer-capability"]'));
    group.appendChild(document.querySelector('[data-layout-zone="h4.foundation-band"]'));
  }

  function drawH4() {
    text('同一算力底座，向上托起能力与产品', 90, 214, {
      'font-family': SERIF, 'font-size': 46, 'font-weight': 500
    });
    text('训练、推理与评测逐列承接，再分别交付 Agent、知识库与多模态场景。', 90, 266, {
      'font-size': 20, fill: INK70
    });
    sectionLabel(309);
    drawStack();
  }

  drawH4();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
