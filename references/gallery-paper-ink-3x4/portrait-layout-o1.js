(function () {
  'use strict';

  var svg = document.querySelector('.scene');
  var NS = 'http://www.w3.org/2000/svg';
  var INK = 'var(--ink)';
  var INK80 = 'var(--ink-80)';
  var INK70 = 'var(--ink-70)';
  var INK55 = 'var(--ink-55)';
  var INK45 = 'var(--ink-45)';
  var PANEL = 'var(--paper-panel)';
  var SANS = 'var(--sans)';
  var MONO = 'var(--mono)';
  var SERIF = 'var(--serif)';
  var TOP_Y = 370;
  var BOTTOM_Y = 880;
  var CENTER_X = 420;
  var TOP_WIDTH = 600;
  var LAYERS = [
    {
      y0: TOP_Y, y1: 570, number: '≈ 1,200,000', tag: 'CORPUS', label: '语料库', en: 'CHUNKS',
      notes: ['文档切片', '向量化入库', '语义召回', '混合检索']
    },
    {
      y0: 570, y1: 730, number: '≈ 8,600', tag: 'RECALL', label: '召回', en: 'CANDIDATES',
      notes: ['向量召回', '关键词匹配', '相关度过滤', '去重合并']
    },
    {
      y0: 730, y1: 870, number: '≈ 48', tag: 'RERANK', label: '重排', en: 'TOP-K', focus: true,
      notes: ['交叉编码重排', '业务规则加权', '截断 Top-K', '拼装上下文']
    }
  ];
  var RETRIEVED = [
    ['CHK #04217', 'API 文档', 'score .92'],
    ['CHK #04188', 'FAQ', 'score .89'],
    ['CHK #04155', '产品手册', 'score .86'],
    ['CHK #04102', '博客', 'score .82'],
    ['CHK #04071', '工单', 'score .78']
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

  function widthAt(y) {
    return TOP_WIDTH * (BOTTOM_Y - y) / (BOTTOM_Y - TOP_Y);
  }

  function drawSectionLabel() {
    var group = el('g', { 'data-layout-zone': 'o1.section', 'data-slot-id': 'section-label' });
    text('01 / CONTINUOUS FUNNEL', 90, 309, {
      'font-family': MONO, 'font-size': 11, 'letter-spacing': 1.75, fill: INK45
    }, group);
    line(375, 305, 990, 305, { stroke: INK45, 'stroke-width': .65 }, group);
    text('1.2M → 8.6K → 48 → LLM', 990, 309, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.15,
      'text-anchor': 'end', fill: INK45
    }, group);
  }

  function drawFunnelOutline(parent) {
    var group = el('g', {
      'data-layout-zone': 'o1.funnel-outline',
      'data-slot-id': 'continuous-funnel-outline'
    }, parent);
    line(CENTER_X - TOP_WIDTH / 2, TOP_Y, CENTER_X + TOP_WIDTH / 2, TOP_Y, {
      stroke: INK80, 'stroke-width': 1.3
    }, group);
    var focusWidth = widthAt(730);
    line(CENTER_X - TOP_WIDTH / 2, TOP_Y, CENTER_X - focusWidth / 2, 730, {
      stroke: INK80, 'stroke-width': 1.3
    }, group);
    line(CENTER_X + TOP_WIDTH / 2, TOP_Y, CENTER_X + focusWidth / 2, 730, {
      stroke: INK80, 'stroke-width': 1.3
    }, group);
    line(CENTER_X - focusWidth / 2, 730, CENTER_X, BOTTOM_Y, {
      id: 'o1-focus-side-left', stroke: INK80, 'stroke-width': 1.3
    }, group);
    line(CENTER_X + focusWidth / 2, 730, CENTER_X, BOTTOM_Y, {
      id: 'o1-focus-side-right', stroke: INK80, 'stroke-width': 1.3
    }, group);
    [570, 730].forEach(function (separatorY) {
      var separatorWidth = widthAt(separatorY);
      line(CENTER_X - separatorWidth / 2, separatorY, CENTER_X + separatorWidth / 2, separatorY, {
        id: separatorY === 730 ? 'o1-focus-divider' : '',
        stroke: INK, 'stroke-width': .8, opacity: .56
      }, group);
    });
    for (var tickIndex = 0; tickIndex <= 20; tickIndex += 1) {
      var tickX = CENTER_X - TOP_WIDTH / 2 + tickIndex * TOP_WIDTH / 20;
      line(tickX, TOP_Y, tickX, TOP_Y - (tickIndex % 5 === 0 ? 11 : 6), {
        stroke: INK45, 'stroke-width': .55
      }, group);
    }
  }

  function drawFunnelLayer(layer, layerIndex, parent) {
    var midY = (layer.y0 + layer.y1) / 2;
    var width = widthAt(midY);
    var leftEdge = CENTER_X - width / 2;
    var group = el('g', {
      'data-layout-zone': 'o1.funnel-layer-' + (layerIndex + 1),
      'data-slot-id': 'funnel-layer',
      'data-repeat-unit': 'funnel-layer',
      'data-layer-index': String(layerIndex + 1),
      'data-layer-tag': layer.tag
    }, parent);
    text(layer.label, CENTER_X, midY - 4, {
      id: layer.focus ? 'o1-focus-label' : '',
      'font-size': 20, 'font-weight': 400, 'text-anchor': 'middle'
    }, group);
    text(layer.en, CENTER_X, midY + 24, {
      id: layer.focus ? 'o1-focus-top-k' : '',
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.8,
      'text-anchor': 'middle', fill: INK45
    }, group);
    line(leftEdge - 8, midY, leftEdge - 30, midY, {
      stroke: INK45, 'stroke-width': .55, 'stroke-dasharray': '3 4'
    }, group);
    text(layer.number, leftEdge - 42, midY - 4, {
      id: layer.focus ? 'o1-focus-number' : '',
      'font-family': MONO, 'font-size': 15, 'text-anchor': 'end'
    }, group);
    text(layer.tag, leftEdge - 42, midY + 21, {
      id: layer.focus ? 'o1-focus-tag' : '',
      'font-family': MONO, 'font-size': 8.5, 'letter-spacing': 1.55,
      'text-anchor': 'end', fill: INK45
    }, group);
    line(CENTER_X + width / 2 + 8, midY, 710, midY, {
      stroke: INK45, 'stroke-width': .55
    }, group);
    layer.notes.forEach(function (note, noteIndex) {
      text(note, 740, midY - 43 + noteIndex * 28, {
        'font-size': 13.5, fill: INK70,
        'data-repeat-unit': 'layer-note'
      }, group);
    });
  }

  function drawFunnel() {
    var group = el('g', {
      'data-layout-zone': 'o1.funnel',
      'data-slot-id': 'three-layer-conversion-funnel',
      'data-fixed-quantity': '3',
      'data-component-id': 'native.paper-ink.funnel.conversion.continuous'
    });
    drawFunnelOutline(group);
    LAYERS.forEach(function (layer, layerIndex) {
      drawFunnelLayer(layer, layerIndex, group);
    });
  }

  function drawOutput() {
    var group = el('g', {
      'data-layout-zone': 'o1.output', 'data-slot-id': 'llm-output'
    });
    line(CENTER_X, BOTTOM_Y, CENTER_X, 915, { stroke: INK80, 'stroke-width': 1.1 }, group);
    el('circle', { cx: CENTER_X, cy: 922, r: 3.2, fill: INK }, group);
    el('rect', {
      x: CENTER_X - 65, y: 932, width: 130, height: 38,
      fill: 'none', stroke: INK80, 'stroke-width': 1.05
    }, group);
    el('rect', {
      x: CENTER_X - 61, y: 936, width: 122, height: 30,
      fill: 'none', stroke: INK45, 'stroke-width': .5
    }, group);
    text('TO LLM', CENTER_X, 957, {
      'data-xp-anchor': 'to-llm',
      'font-family': MONO, 'font-size': 10, 'letter-spacing': 1.7,
      'text-anchor': 'middle'
    }, group);
  }

  function drawRetrievedPanel() {
    var group = el('g', {
      'data-layout-zone': 'o1.retrieved',
      'data-slot-id': 'retrieved-evidence-panel',
      'data-fixed-quantity': '5',
      'data-component-id': 'native.paper-ink.semantic.retrieved-specimen'
    });
    el('rect', {
      x: 90, y: 988, width: 900, height: 202,
      fill: PANEL, stroke: INK80, 'stroke-width': .9
    }, group);
    el('rect', {
      x: 95, y: 993, width: 890, height: 192,
      fill: 'none', stroke: INK45, 'stroke-width': .5
    }, group);
    text('RETRIEVED', 120, 1020, {
      'font-family': MONO, 'font-size': 10, 'letter-spacing': 1.8
    }, group);
    line(120, 1032, 210, 1032, { stroke: INK80, 'stroke-width': .8 }, group);
    text('本次查询 · 召回 48 片段', 950, 1020, {
      'font-size': 13, 'text-anchor': 'end', fill: INK55
    }, group);
    RETRIEVED.forEach(function (row, rowIndex) {
      var rowY = 1058 + rowIndex * 28;
      var rowGroup = el('g', {
        'data-layout-zone': 'o1.retrieved-row-' + (rowIndex + 1),
        'data-slot-id': 'retrieved-row',
        'data-repeat-unit': 'retrieved-row',
        'data-rank': String(rowIndex + 1)
      }, group);
      text(row[0], 120, rowY, { 'font-family': MONO, 'font-size': 10.5 }, rowGroup);
      text(row[1], 720, rowY, {
        'font-size': 12, 'text-anchor': 'end', fill: INK70
      }, rowGroup);
      text(row[2], 950, rowY, {
        'font-family': MONO, 'font-size': 9.5, 'text-anchor': 'end', fill: INK45
      }, rowGroup);
      if (rowIndex < RETRIEVED.length - 1) {
        line(120, rowY + 9, 950, rowY + 9, {
          stroke: INK45, 'stroke-width': .45, 'stroke-dasharray': '2 5'
        }, rowGroup);
      }
    });
  }

  function drawReadingGuide() {
    var group = el('g', {
      'data-layout-zone': 'o1.reading-guide', 'data-slot-id': 'funnel-reading-guide'
    });
    line(90, 1210, 990, 1210, { stroke: INK45, 'stroke-width': .6 }, group);
    text('WIDE CORPUS → CONTINUOUS NARROWING → TOP-K', 90, 1238, {
      'font-family': MONO, 'font-size': 9, 'letter-spacing': 1.05, fill: INK45
    }, group);
    text('检索结果是漏斗出口的证据', 990, 1238, {
      'font-size': 12, 'text-anchor': 'end', fill: INK45
    }, group);
  }

  function drawO1() {
    text('检索不是一步命中，而是连续收敛', 90, 214, {
      'font-family': SERIF, 'font-size': 44, 'font-weight': 500
    });
    text('语料库经过召回、过滤、去重与重排，最后只送入高相关片段。', 90, 266, {
      'font-size': 19, fill: INK70
    });
    drawSectionLabel();
    drawFunnel();
    drawOutput();
    drawRetrievedPanel();
    drawReadingGuide();
  }

  drawO1();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
