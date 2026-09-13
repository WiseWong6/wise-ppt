(function () {
  'use strict';

  var svg = document.querySelector('.scene');
  var NS = 'http://www.w3.org/2000/svg';
  var INK = 'var(--ink)';
  var INK80 = 'var(--ink-80)';
  var INK70 = 'var(--ink-70)';
  var INK45 = 'var(--ink-45)';
  var PAPER = 'var(--paper)';
  var SANS = 'var(--sans)';
  var MONO = 'var(--mono)';
  var SERIF = 'var(--serif)';

  var CENTER = { x: 540, y: 720 };
  var RADII = { core: 78, input: 170, output: 250, fallback: 330 };
  var INPUT_ITEMS = [
    { label: 'SCHEMA', angle: 45, mono: true },
    { label: '越狱拦截', angle: 135 },
    { label: '注入检测', angle: 225 },
    { label: '敏感词过滤', angle: 315 }
  ];
  var OUTPUT_ITEMS = [
    { label: '毒性过滤', angle: 45 },
    { label: 'PII 脱敏', angle: 135 },
    { label: '事实核查', angle: 225 },
    { label: '内容分级', angle: 315 }
  ];
  var FALLBACK_ITEMS = [
    { label: '人工接管', angle: 55 },
    { label: '告警上报', angle: 125 },
    { label: '安全回复', angle: 235 },
    { label: '降级模型', angle: 305 }
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

  function ringPoint(radius, degrees, offset) {
    var radians = degrees * Math.PI / 180;
    var distance = radius + (offset || 0);
    return {
      x: CENTER.x + distance * Math.sin(radians),
      y: CENTER.y - distance * Math.cos(radians)
    };
  }

  function drawSectionLabel() {
    var group = el('g', { 'data-layout-zone': 'h1.section', 'data-slot-id': 'section-label' });
    text('01 / NESTED DEFENSE', 90, 309, {
      'font-family': MONO, 'font-size': 11, 'letter-spacing': 1.8, fill: INK45
    }, group);
    line(343, 305, 990, 305, { stroke: INK45, 'stroke-width': .65 }, group);
    text('CORE · THREE RINGS', 990, 309, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.25,
      'text-anchor': 'end', fill: INK45
    }, group);
  }

  function drawConstruction(parent) {
    line(CENTER.x, 362, CENTER.x, 1078, {
      stroke: INK, 'stroke-width': .5, opacity: .14, 'stroke-dasharray': '2 7'
    }, parent);
    line(182, CENTER.y, 898, CENTER.y, {
      stroke: INK, 'stroke-width': .5, opacity: .14, 'stroke-dasharray': '2 7'
    }, parent);
  }

  function drawRingItem(item, itemIndex, radius, layerName, parent) {
    var point = ringPoint(radius, item.angle);
    var rail = ringPoint(radius, item.angle, 13);
    var label = ringPoint(radius, item.angle, 29);
    var right = Math.sin(item.angle * Math.PI / 180) > 0;
    var group = el('g', {
      'data-layout-zone': 'h1.' + layerName + '-item-' + (itemIndex + 1),
      'data-slot-id': layerName + '-item-' + (itemIndex + 1),
      'data-repeat-unit': layerName + '-item'
    }, parent);
    el('circle', { cx: point.x, cy: point.y, r: 2.5, fill: INK80 }, group);
    line(point.x, point.y, rail.x, rail.y, { stroke: INK70, 'stroke-width': .65 }, group);
    text(item.label, label.x, label.y + 4, {
      'font-family': item.mono ? MONO : SANS,
      'font-size': item.mono ? 11 : 14.5,
      'letter-spacing': item.mono ? 1.2 : .2,
      'text-anchor': right ? 'start' : 'end', fill: INK70
    }, group);
  }

  function drawLayer(layerName, radius, items, labelEn, labelCn, labelY, parent) {
    var group = el('g', {
      'data-layout-zone': 'h1.' + layerName + '-layer',
      'data-slot-id': layerName + '-layer',
      'data-fixed-quantity': '4'
    }, parent);
    el('circle', {
      'data-xp-anchor': 'defense-ring',
      id: layerName === 'fallback' ? 'h1-focus-frame' : '',
      cx: CENTER.x, cy: CENTER.y, r: radius,
      fill: 'none', stroke: INK80,
      'stroke-width': layerName === 'fallback' ? 1.25 : 1
    }, group);
    text(labelEn, CENTER.x, labelY, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.8,
      'text-anchor': 'middle', fill: INK45
    }, group);
    text(labelCn, CENTER.x, labelY + 27, {
      id: layerName === 'fallback' ? 'sample-focus' : '',
      'font-size': 16.5, 'font-weight': 400, 'text-anchor': 'middle'
    }, group);
    items.forEach(function (item, itemIndex) {
      drawRingItem(item, itemIndex, radius, layerName, group);
    });
  }

  function drawCore(parent) {
    var group = el('g', {
      'data-layout-zone': 'h1.core', 'data-slot-id': 'model-core',
      'data-component-id': 'native.paper-ink.nested.model-core'
    }, parent);
    el('circle', {
      'data-xp-anchor': 'core',
      cx: CENTER.x, cy: CENTER.y, r: RADII.core,
      fill: PAPER, stroke: INK80, 'stroke-width': 1.3
    }, group);
    text('LLM CORE', CENTER.x, CENTER.y - 9, {
      'font-family': MONO, 'font-size': 11, 'letter-spacing': 2.7,
      'text-anchor': 'middle'
    }, group);
    text('模型内核', CENTER.x, CENTER.y + 24, {
      'font-size': 19, 'font-weight': 400, 'text-anchor': 'middle'
    }, group);
  }

  function drawDefenseSystem() {
    var group = el('g', {
      'data-layout-zone': 'h1.defense-system',
      'data-slot-id': 'three-defense-rings',
      'data-fixed-quantity': '3'
    });
    drawConstruction(group);
    drawLayer('fallback', RADII.fallback, FALLBACK_ITEMS, '03 / FALLBACK · LAYER', '兜底接管', 408, group);
    drawLayer('output', RADII.output, OUTPUT_ITEMS, '02 / OUTPUT · LAYER', '输出防护', 487, group);
    drawLayer('input', RADII.input, INPUT_ITEMS, '01 / INPUT · LAYER', '输入校验', 567, group);
    drawCore(group);
  }

  function drawH1() {
    text('三道防线，共同包围模型内核', 90, 214, {
      'font-family': SERIF, 'font-size': 46, 'font-weight': 500
    });
    text('输入、输出与兜底各占一层同心环；必要时降级、接管、回复并告警。', 90, 266, {
      'font-size': 20, fill: INK70
    });
    drawSectionLabel();
    drawDefenseSystem();
  }

  drawH1();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
