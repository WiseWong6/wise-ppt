(function () {
  'use strict';

  var svg = document.querySelector('.scene');
  var NS = 'http://www.w3.org/2000/svg';
  var INK = 'var(--ink)';
  var INK80 = 'var(--ink-80)';
  var INK70 = 'var(--ink-70)';
  var INK45 = 'var(--ink-45)';
  var FUNCTIONAL = 'var(--wp-color-functional)';
  var SANS = 'var(--sans)';
  var MONO = 'var(--mono)';
  var SERIF = 'var(--serif)';

  var TOP = 452;
  var BASE = 1002;
  var HALF = 205;
  var LX = 300;
  var RX = 780;
  var LEVEL_Y = [566, 646, 782, 930];
  var DIVIDER_Y = [604, 714, 856];
  var TOWERS = [
    {
      key: 'legacy', cx: LX,
      title: '传统职级体系', subtitle: 'LEGACY CAREER LADDER',
      layers: [
        ['总监', 'L4'], ['经理', 'L3 · MGR'], ['组长', 'L2 · LEAD'], ['专员', 'L1 · OPS']
      ]
    },
    {
      key: 'ai', cx: RX,
      title: 'AI 能力分级体系', subtitle: 'AI CAPABILITY TIERS',
      layers: [
        ['架构者', 'S4'], ['决策者', 'S3 · POLICY'], ['协调者', 'S2 · COORD'], ['执行者', 'S1 · EXEC']
      ]
    }
  ];
  var MAPPINGS = [
    { key: 'l4-s4', fromY: LEVEL_Y[0], toY: LEVEL_Y[0], weight: 'w .31', width: .8, dash: '4 5', opacity: .55 },
    { key: 'l3-s3', fromY: LEVEL_Y[1], toY: LEVEL_Y[1], weight: 'w .92', width: 2.2, focus: true },
    { key: 'l3-s2', fromY: LEVEL_Y[1], toY: LEVEL_Y[2], weight: 'w .48', width: 1, curve: true, opacity: .7 },
    { key: 'l2-s2', fromY: LEVEL_Y[2], toY: LEVEL_Y[2], weight: 'w .74', width: 1.3, opacity: .85 },
    { key: 'l1-s1', fromY: LEVEL_Y[3], toY: LEVEL_Y[3], weight: 'w .36', width: .9, opacity: .65 }
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

  function halfAt(y) {
    return HALF * (y - TOP) / (BASE - TOP);
  }

  function edge(cx, y, direction) {
    return cx + direction * halfAt(y);
  }

  function drawSectionLabel() {
    var group = el('g', { 'data-layout-zone': 'e5.section', 'data-slot-id': 'section-label' });
    text('01 / HIERARCHY MAPPING', 90, 309, {
      'font-family': MONO, 'font-size': 11, 'letter-spacing': 1.8, fill: INK45
    }, group);
    line(370, 305, 990, 305, { stroke: INK45, 'stroke-width': .65 }, group);
    text('5 WEIGHTED EDGES', 990, 309, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.25,
      'text-anchor': 'end', fill: INK45
    }, group);
  }

  function drawContextNotes() {
    var left = el('g', {
      'data-layout-zone': 'e5.source-note', 'data-slot-id': 'human-role-context'
    });
    text('HUMAN ROLES IN', 90, 347, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.45, fill: INK45
    }, left);
    text('人的职级与分工', 90, 374, { 'font-size': 17.5, fill: INK70 }, left);
    text('映射为 AI 能力', 90, 400, { 'font-size': 17.5, fill: INK70 }, left);
    line(90, 412, 320, 412, { stroke: INK45, 'stroke-width': .6, 'stroke-dasharray': '3 5' }, left);

    var right = el('g', {
      'data-layout-zone': 'e5.target-note', 'data-slot-id': 'ai-capability-context'
    });
    text('CAPABILITY OUT', 990, 347, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.45,
      'text-anchor': 'end', fill: INK45
    }, right);
    text('AI 能力分级', 990, 374, {
      'font-size': 17.5, 'text-anchor': 'end', fill: INK70
    }, right);
    text('逐层对译人的职级', 990, 400, {
      'font-size': 17.5, 'text-anchor': 'end', fill: INK70
    }, right);
    line(760, 412, 990, 412, { stroke: INK45, 'stroke-width': .6, 'stroke-dasharray': '3 5' }, right);
  }

  function drawAlignmentGuides(parent) {
    var group = el('g', {
      'data-layout-zone': 'e5.alignment-guides', 'data-slot-id': 'level-alignment-guides'
    }, parent);
    LEVEL_Y.forEach(function (y, index) {
      line(112, y, 968, y, {
        stroke: INK, 'stroke-width': .5, opacity: .16, 'stroke-dasharray': '2 6',
        'data-level-index': String(index + 1)
      }, group);
    });
    line(540, 430, 540, 1012, {
      stroke: INK, 'stroke-width': .5, opacity: .18, 'stroke-dasharray': '2 6'
    }, group);
  }

  function drawTower(tower, parent) {
    var group = el('g', {
      'data-layout-zone': 'e5.tower-' + tower.key,
      'data-slot-id': tower.key + '-hierarchy',
      'data-fixed-quantity': '4',
      'data-component-id': 'native.paper-ink.hierarchy.four-level-pyramid'
    }, parent);
    el('path', {
      d: 'M ' + tower.cx + ' ' + TOP + ' L ' + (tower.cx + HALF) + ' ' + BASE +
        ' L ' + (tower.cx - HALF) + ' ' + BASE + ' Z',
      fill: 'none', stroke: INK80, 'stroke-width': 1.25
    }, group);
    DIVIDER_Y.forEach(function (y) {
      var half = halfAt(y);
      line(tower.cx - half, y, tower.cx + half, y, {
        stroke: INK, 'stroke-width': .85, opacity: .48
      }, group);
    });
    tower.layers.forEach(function (layer, index) {
      var layerGroup = el('g', {
        'data-layout-zone': 'e5.' + tower.key + '-layer-' + (index + 1),
        'data-slot-id': tower.key + '-level-' + (index + 1),
        'data-repeat-unit': tower.key + '-hierarchy-level'
      }, group);
      text(layer[0], tower.cx, LEVEL_Y[index] - 2, {
        'font-size': index === 0 ? 16 : 18.5,
        'font-weight': 400, 'text-anchor': 'middle'
      }, layerGroup);
      text(layer[1], tower.cx, LEVEL_Y[index] + 25, {
        'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.35,
        'text-anchor': 'middle', fill: INK45
      }, layerGroup);
    });
    line(tower.cx - 72, 1045, tower.cx + 72, 1045, {
      stroke: INK, 'stroke-width': .6, opacity: .3
    }, group);
    text(tower.title, tower.cx, 1078, {
      'font-size': 19, 'font-weight': 400, 'text-anchor': 'middle'
    }, group);
    text(tower.subtitle, tower.cx, 1107, {
      'font-family': MONO, 'font-size': 9, 'letter-spacing': 1.45,
      'text-anchor': 'middle', fill: FUNCTIONAL
    }, group);
  }

  function drawArrowHead(x, y, angle, width, opacity, parent) {
    var length = 12;
    var spread = .48;
    line(x, y, x - length * Math.cos(angle - spread), y - length * Math.sin(angle - spread), {
      stroke: INK, 'stroke-width': width, opacity: opacity
    }, parent);
    line(x, y, x - length * Math.cos(angle + spread), y - length * Math.sin(angle + spread), {
      stroke: INK, 'stroke-width': width, opacity: opacity
    }, parent);
  }

  function drawMapping(mapping, index, parent) {
    var x1 = edge(LX, mapping.fromY, 1) + 10;
    var x2 = edge(RX, mapping.toY, -1) - 10;
    var opacity = mapping.opacity || 1;
    var group = el('g', {
      'data-layout-zone': 'e5.mapping-edge-' + (index + 1),
      'data-slot-id': mapping.key,
      'data-repeat-unit': 'weighted-role-capability-mapping',
      'data-mapping-weight': mapping.weight.slice(2)
    }, parent);
    if (mapping.curve) {
      var control1X = x1 + (x2 - x1) * .35;
      var control2X = x1 + (x2 - x1) * .68;
      var control2Y = mapping.toY - 30;
      el('path', {
        d: 'M ' + x1 + ' ' + (mapping.fromY + 8) + ' C ' + control1X + ' ' +
          (mapping.fromY + 36) + ', ' + control2X + ' ' + control2Y + ', ' + x2 + ' ' + (mapping.toY - 10),
        fill: 'none', stroke: INK, 'stroke-width': mapping.width, opacity: opacity
      }, group);
      drawArrowHead(x2, mapping.toY - 10, .55, 1.05, opacity, group);
      text(mapping.weight, 516, 730, {
        'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.35,
        'text-anchor': 'end', fill: INK45
      }, group);
    } else {
      line(x1, mapping.fromY, x2, mapping.toY, {
        id: mapping.focus ? 'e5-focus-edge' : '',
        stroke: INK, 'stroke-width': mapping.width, opacity: opacity,
        'stroke-dasharray': mapping.dash || 'none'
      }, group);
      drawArrowHead(x2, mapping.toY, 0, Math.max(1, mapping.width * .7), opacity, group);
      text(mapping.weight, 540, mapping.fromY - 12, {
        id: mapping.focus ? 'sample-focus' : '',
        'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.35,
        'text-anchor': 'middle', fill: INK45
      }, group);
    }
  }

  function drawMappingSystem() {
    var system = el('g', {
      'data-layout-zone': 'e5.mapping-system',
      'data-slot-id': 'role-to-capability-mapping',
      'data-fixed-quantity': '5',
      'data-component-id': 'native.paper-ink.mapping.dual-hierarchy-weighted-edges'
    });
    drawAlignmentGuides(system);
    TOWERS.forEach(function (tower) { drawTower(tower, system); });
    MAPPINGS.forEach(function (mapping, index) { drawMapping(mapping, index, system); });
  }

  function drawE5() {
    text('人的职级，如何映射为 AI 能力', 90, 214, {
      'font-family': SERIF, 'font-size': 46, 'font-weight': 500
    });
    text('两套四级金字塔逐层对译；线宽表示映射强度。', 90, 266, {
      'font-size': 20, fill: INK70
    });
    drawSectionLabel();
    drawContextNotes();
    drawMappingSystem();
  }

  drawE5();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
