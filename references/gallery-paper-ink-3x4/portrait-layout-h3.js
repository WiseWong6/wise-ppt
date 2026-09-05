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

  var LAYERS = [
    {
      no: 'L1', cn: '应用层', en: 'APPLICATION',
      items: [
        { glyph: 'chat', en: 'CHAT', cn: '对话界面' },
        { glyph: 'assist', en: 'ASSIST', cn: '助手面板' },
        { glyph: 'api', en: 'API HUB', cn: '开放接口' }
      ]
    },
    {
      no: 'L2', cn: '模型层', en: 'MODEL', focus: true,
      items: [
        { glyph: 'llm', en: 'LLM', cn: '大语言模型' },
        { glyph: 'rag', en: 'RAG', cn: '检索增强' },
        { glyph: 'agent', en: 'AGENT', cn: '智能体' }
      ]
    },
    {
      no: 'L3', cn: '数据层', en: 'DATA',
      items: [
        { glyph: 'vector', en: 'VEC DB', cn: '向量库' },
        { glyph: 'knowledge', en: 'KNOWLEDGE', cn: '知识库' },
        { glyph: 'feedback', en: 'FEEDBACK', cn: '反馈管线' }
      ]
    },
    {
      no: 'L4', cn: '基础层', en: 'INFRA',
      items: [
        { glyph: 'gpu', en: 'GPU POOL', cn: '算力集群' },
        { glyph: 'gateway', en: 'GATEWAY', cn: '网关' },
        { glyph: 'monitor', en: 'MONITOR', cn: '监控告警' }
      ]
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
      x1: x1, y1: y1, x2: x2, y2: y2, stroke: INK, 'stroke-width': 1
    }, attrs || {}), parent);
  }

  function sectionLabel(y) {
    var group = el('g', { 'data-layout-zone': 'h3.section', 'data-slot-id': 'section-label' });
    text('01 / ARCHITECTURE STACK', 90, y, {
      'font-family': MONO, 'font-size': 11, 'letter-spacing': 1.8, fill: INK45
    }, group);
    line(354, y - 4, 990, y - 4, { stroke: INK45, 'stroke-width': .65 }, group);
    text('四层依赖', 990, y, { 'font-size': 15, 'text-anchor': 'end', fill: INK70 }, group);
  }

  function nodeDot(cx, cy, parent) {
    el('circle', { cx: cx, cy: cy, r: 4.6, fill: PAPER, stroke: INK80, 'stroke-width': 1 }, parent);
    el('circle', { cx: cx, cy: cy, r: 1.6, fill: INK }, parent);
  }

  function glyphChat(cx, cy, parent) {
    el('rect', { x: cx - 28, y: cy - 20, width: 56, height: 34, rx: 7, fill: 'none', stroke: INK80, 'stroke-width': 1.2 }, parent);
    el('path', { d: 'M ' + (cx - 8) + ' ' + (cy + 14) + ' L ' + (cx - 14) + ' ' + (cy + 24) + ' L ' + (cx + 2) + ' ' + (cy + 14), fill: 'none', stroke: INK80, 'stroke-width': 1.2, 'stroke-linejoin': 'round' }, parent);
    [-11, 0, 11].forEach(function (dx) { el('circle', { cx: cx + dx, cy: cy - 4, r: 2, fill: INK }, parent); });
  }

  function glyphAssist(cx, cy, parent) {
    el('rect', { x: cx - 27, y: cy - 22, width: 54, height: 44, rx: 3, fill: 'none', stroke: INK80, 'stroke-width': 1.2 }, parent);
    line(cx - 27, cy - 10, cx + 27, cy - 10, { stroke: INK45, 'stroke-width': .7 }, parent);
    el('circle', { cx: cx - 20, cy: cy - 16, r: 1.8, fill: INK }, parent);
    [-6, 8].forEach(function (dy) {
      [-12, 6].forEach(function (dx) {
        el('rect', { x: cx + dx, y: cy + dy, width: 12, height: 10, fill: 'none', stroke: INK70, 'stroke-width': .8 }, parent);
      });
    });
  }

  function glyphBranch(cx, cy, parent) {
    line(cx, cy + 23, cx, cy, { stroke: INK80, 'stroke-width': 1.2 }, parent);
    [[-22, -14], [0, -19], [22, -14]].forEach(function (point) {
      line(cx, cy, cx + point[0], cy + point[1], { stroke: INK80, 'stroke-width': 1.1 }, parent);
      nodeDot(cx + point[0], cy + point[1], parent);
    });
    nodeDot(cx, cy + 24, parent);
  }

  function glyphGear(cx, cy, parent) {
    el('circle', { cx: cx, cy: cy, r: 20, fill: 'none', stroke: INK80, 'stroke-width': 1.2 }, parent);
    el('circle', { cx: cx, cy: cy, r: 6, fill: 'none', stroke: INK80, 'stroke-width': 1.1 }, parent);
    for (var index = 0; index < 8; index += 1) {
      var angle = index * Math.PI / 4;
      line(cx + Math.cos(angle) * 20, cy + Math.sin(angle) * 20, cx + Math.cos(angle) * 27, cy + Math.sin(angle) * 27, { stroke: INK80, 'stroke-width': 1.5 }, parent);
    }
  }

  function glyphRag(cx, cy, parent) {
    el('rect', { x: cx - 28, y: cy - 20, width: 26, height: 34, fill: 'none', stroke: INK80, 'stroke-width': 1.2 }, parent);
    [-12, -5, 2].forEach(function (dy) { line(cx - 23, cy + dy, cx - 8, cy + dy, { stroke: INK45, 'stroke-width': .8 }, parent); });
    el('circle', { cx: cx + 12, cy: cy - 2, r: 11, fill: 'none', stroke: INK80, 'stroke-width': 1.2 }, parent);
    line(cx + 20, cy + 6, cx + 29, cy + 15, { stroke: INK, 'stroke-width': 1.7, 'stroke-linecap': 'round' }, parent);
  }

  function glyphNetwork(cx, cy, parent) {
    nodeDot(cx, cy, parent);
    [[-25, -14], [25, -14], [-25, 16], [25, 16]].forEach(function (point) {
      line(cx, cy, cx + point[0], cy + point[1], { stroke: INK80, 'stroke-width': 1.1 }, parent);
      nodeDot(cx + point[0], cy + point[1], parent);
    });
    line(cx - 25, cy - 14, cx + 25, cy - 14, { stroke: INK45, 'stroke-width': .6, 'stroke-dasharray': '3 4' }, parent);
    line(cx - 25, cy + 16, cx + 25, cy + 16, { stroke: INK45, 'stroke-width': .6, 'stroke-dasharray': '3 4' }, parent);
  }

  function glyphCylinder(cx, cy, parent) {
    el('ellipse', { cx: cx, cy: cy - 19, rx: 23, ry: 7, fill: 'none', stroke: INK80, 'stroke-width': 1.2 }, parent);
    line(cx - 23, cy - 19, cx - 23, cy + 19, { stroke: INK80, 'stroke-width': 1.2 }, parent);
    line(cx + 23, cy - 19, cx + 23, cy + 19, { stroke: INK80, 'stroke-width': 1.2 }, parent);
    el('path', { d: 'M ' + (cx - 23) + ' ' + (cy + 19) + ' A 23 7 0 0 0 ' + (cx + 23) + ' ' + (cy + 19), fill: 'none', stroke: INK80, 'stroke-width': 1.2 }, parent);
  }

  function glyphBook(cx, cy, parent) {
    el('path', { d: 'M ' + (cx - 2) + ' ' + (cy - 18) + ' C ' + (cx - 14) + ' ' + (cy - 22) + ', ' + (cx - 29) + ' ' + (cy - 20) + ', ' + (cx - 29) + ' ' + (cy - 14) + ' L ' + (cx - 29) + ' ' + (cy + 16) + ' C ' + (cx - 29) + ' ' + (cy + 22) + ', ' + (cx - 14) + ' ' + (cy + 24) + ', ' + (cx - 2) + ' ' + (cy + 20), fill: 'none', stroke: INK80, 'stroke-width': 1.2 }, parent);
    el('path', { d: 'M ' + (cx + 2) + ' ' + (cy - 18) + ' C ' + (cx + 14) + ' ' + (cy - 22) + ', ' + (cx + 29) + ' ' + (cy - 20) + ', ' + (cx + 29) + ' ' + (cy - 14) + ' L ' + (cx + 29) + ' ' + (cy + 16) + ' C ' + (cx + 29) + ' ' + (cy + 22) + ', ' + (cx + 14) + ' ' + (cy + 24) + ', ' + (cx + 2) + ' ' + (cy + 20), fill: 'none', stroke: INK80, 'stroke-width': 1.2 }, parent);
    line(cx, cy - 18, cx, cy + 20, { stroke: INK, 'stroke-width': 1 }, parent);
  }

  function glyphLoop(cx, cy, parent) {
    var radius = 21;
    el('path', { d: 'M ' + (cx + radius) + ' ' + (cy - 8) + ' A ' + radius + ' ' + radius + ' 0 1 1 ' + (cx - 15) + ' ' + (cy - 15), fill: 'none', stroke: INK80, 'stroke-width': 1.3 }, parent);
    el('path', { d: 'M ' + (cx - radius) + ' ' + (cy + 8) + ' A ' + radius + ' ' + radius + ' 0 1 1 ' + (cx + 15) + ' ' + (cy + 15), fill: 'none', stroke: INK80, 'stroke-width': 1.3 }, parent);
    el('path', { d: 'M ' + (cx + radius) + ' ' + (cy - 8) + ' l 5 -6 l -11 3', fill: 'none', stroke: INK, 'stroke-width': 1.3, 'stroke-linecap': 'round' }, parent);
    el('path', { d: 'M ' + (cx - radius) + ' ' + (cy + 8) + ' l -5 6 l 11 -3', fill: 'none', stroke: INK, 'stroke-width': 1.3, 'stroke-linecap': 'round' }, parent);
  }

  function glyphGpu(cx, cy, parent) {
    var size = 13;
    var gap = 4;
    for (var row = 0; row < 3; row += 1) {
      for (var column = 0; column < 3; column += 1) {
        var x = cx - 23.5 + column * (size + gap);
        var y = cy - 23.5 + row * (size + gap);
        var active = (row + column) % 2 === 0;
        el('rect', { x: x, y: y, width: size, height: size, fill: active ? PANEL : 'none', stroke: INK80, 'stroke-width': 1 }, parent);
      }
    }
  }

  function glyphCluster(cx, cy, parent) {
    [[-14, -14], [14, -14], [-14, 14], [14, 14]].forEach(function (point, index) {
      el('rect', { x: cx + point[0] - 9, y: cy + point[1] - 9, width: 18, height: 18, fill: 'none', stroke: INK80, 'stroke-width': 1.1, 'stroke-dasharray': index === 3 ? '3 3' : 'none' }, parent);
    });
    line(cx - 14, cy, cx + 14, cy, { stroke: INK45, 'stroke-width': .7 }, parent);
    line(cx, cy - 14, cx, cy + 14, { stroke: INK45, 'stroke-width': .7 }, parent);
  }

  function drawGlyph(kind, cx, cy, parent) {
    var glyphs = {
      chat: glyphChat,
      assist: glyphAssist,
      api: glyphBranch,
      llm: glyphGear,
      rag: glyphRag,
      agent: glyphNetwork,
      vector: glyphCylinder,
      knowledge: glyphBook,
      feedback: glyphLoop,
      gpu: glyphGpu,
      gateway: glyphBranch,
      monitor: glyphCluster
    };
    glyphs[kind](cx, cy, parent);
  }

  function drawItem(item, layerIndex, itemIndex, rowY) {
    var itemWidth = 740 / 3;
    var x = 250 + itemIndex * itemWidth;
    var centerX = x + itemWidth / 2;
    var group = el('g', {
      'data-layout-zone': 'h3.item-' + (layerIndex * 3 + itemIndex + 1),
      'data-slot-id': 'layer-' + (layerIndex + 1) + '-item-' + (itemIndex + 1)
    });
    var glyphGroup = el('g', {
      'data-layout-zone': 'h3.glyph-' + (layerIndex * 3 + itemIndex + 1),
      'data-slot-id': 'glyph-' + (layerIndex * 3 + itemIndex + 1)
    }, group);
    drawGlyph(item.glyph, centerX, rowY + 96, glyphGroup);
    text(item.en, centerX, rowY + 156, {
      'font-family': MONO, 'font-size': 10, 'letter-spacing': 1.4, 'text-anchor': 'middle', fill: INK45
    }, group);
    text(item.cn, centerX, rowY + 187, {
      'font-size': 17, 'font-weight': 400, 'text-anchor': 'middle', fill: INK
    }, group);
  }

  function drawLayer(layer, layerIndex) {
    var stackY = 350;
    var rowHeight = (window.PORTRAIT_SAFE.bottom - stackY) / 4;
    var rowY = stackY + layerIndex * rowHeight;
    var group = el('g', {
      'data-layout-zone': 'h3.layer-' + (layerIndex + 1),
      'data-slot-id': 'layer-' + (layerIndex + 1),
      'data-repeat-unit': 'layer'
    });
    if (layerIndex === 1) {
      el('rect', { x: 91, y: rowY + 1, width: 898, height: rowHeight - 2, fill: PANEL, opacity: .72 }, group);
      line(90, rowY, 990, rowY, { stroke: INK45, 'stroke-width': 1.2 }, group);
    }
    text(layer.no, 112, rowY + 62, { 'data-xp-anchor': 'layer-code',
      'font-family': MONO, 'font-size': 12, 'letter-spacing': 2, fill: INK
    }, group);
    text(layer.en, 228, rowY + 61, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.3, 'text-anchor': 'end', fill: INK45
    }, group);
    text(layer.cn, 112, rowY + 108, {
      id: layer.focus ? 'sample-focus' : 'h3-layer-' + layer.no,
      'font-size': 21, 'font-weight': 400, fill: INK
    }, group);
    text('03 UNITS', 112, rowY + 139, {
      'font-family': MONO, 'font-size': 9, 'letter-spacing': 1.2, fill: INK45
    }, group);
    line(112, rowY + 163, 202, rowY + 163, { stroke: layer.focus ? INK80 : INK45, 'stroke-width': .8 }, group);
    layer.items.forEach(function (item, itemIndex) { drawItem(item, layerIndex, itemIndex, rowY); });
  }

  function drawStack() {
    var x = 90;
    var y = 350;
    var width = 900;
    var rowHeight = 210;
    var height = (window.PORTRAIT_SAFE.bottom - 350);
    var group = el('g', {
      'data-layout-zone': 'h3.stack',
      'data-slot-id': 'architecture-stack',
      'data-fixed-quantity': '4'
    });
    line(x, y, x + width, y, { stroke: INK80, 'stroke-width': .8 }, group);
    line(x, y + height, x + width, y + height, { stroke: INK80, 'stroke-width': .8 }, group);
    line(250, y, 250, y + height, { stroke: INK45, 'stroke-width': .65 }, group);
    for (var boundary = 1; boundary < LAYERS.length; boundary += 1) {
      line(x, y + boundary * rowHeight, x + width, y + boundary * rowHeight, { stroke: INK45, 'stroke-width': .7 }, group);
    }
    LAYERS.forEach(drawLayer);
  }

  function drawH3() {
    text('四层架构，问题常发生在层与层之间', 90, 220, {
      'font-family': SERIF, 'font-size': 47, 'font-weight': 500
    });
    text('应用、模型、数据与基础设施连续相接，每层保留三个核心能力件。', 90, 272, {
      'font-size': 20.5, fill: INK70
    });
    sectionLabel(318);
    drawStack();
  }

  drawH3();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
