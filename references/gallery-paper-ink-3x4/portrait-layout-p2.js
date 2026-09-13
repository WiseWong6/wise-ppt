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
  var NODE_WIDTH = 270;
  var NODE_HEIGHT = 96;
  var NODES = {
    input: { key: 'INPUT', cx: 210, cy: 740, en: 'USER INPUT', cn: '用户问题' },
    contexts: { key: 'CONTEXTS', cx: 540, cy: 450, en: 'RETRIEVED CONTEXTS', cn: '检索上下文' },
    response: { key: 'RESPONSE', cx: 870, cy: 740, en: 'RESPONSE', cn: '模型回答' },
    reference: { key: 'REFERENCE', cx: 540, cy: 1030, en: 'REFERENCE', cn: '参考答案' }
  };

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
      stroke: INK, 'stroke-width': 1, fill: 'none'
    }, attrs || {}), parent);
  }

  function edge(node, side) {
    if (side === 'left') return { x: node.cx - NODE_WIDTH / 2, y: node.cy };
    if (side === 'right') return { x: node.cx + NODE_WIDTH / 2, y: node.cy };
    if (side === 'top') return { x: node.cx, y: node.cy - NODE_HEIGHT / 2 };
    return { x: node.cx, y: node.cy + NODE_HEIGHT / 2 };
  }

  function midpoint(a, b) {
    return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
  }

  function drawSectionLabel() {
    var group = el('g', { 'data-layout-zone': 'p2.section', 'data-slot-id': 'section-label' });
    text('01 / RAG EVALUATION MAP', 90, 309, {
      'font-family': MONO, 'font-size': 11, 'letter-spacing': 1.8, fill: INK45
    }, group);
    line(382, 305, 990, 305, { stroke: INK45, 'stroke-width': .65 }, group);
    text('4 NODES · 6 LINKS · 4 METRICS', 990, 309, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.15,
      'text-anchor': 'end', fill: INK45
    }, group);
  }

  function drawConnection(key, a, b, parent, options) {
    var group = el('g', {
      'data-layout-zone': 'p2.edge-' + key.toLowerCase(),
      'data-slot-id': 'edge-' + key.toLowerCase(),
      'data-repeat-unit': 'rag-evaluation-edge',
      'data-mapping-edge': key
    }, parent);
    line(a.x, a.y, b.x, b.y, Object.assign({
      stroke: INK, 'stroke-width': .9, opacity: .5
    }, options || {}), group);
    return group;
  }

  function drawMappingEdges() {
    var group = el('g', {
      'data-layout-zone': 'p2.mapping-map',
      'data-slot-id': 'rag-evaluation-map',
      'data-fixed-quantity': '6',
      'data-component-id': 'native.paper-ink.mapping.diamond-edge-labels.rag-evaluation-map'
    });
    var perimeter = el('g', {
      'data-layout-zone': 'p2.diamond-perimeter',
      'data-slot-id': 'diamond-perimeter',
      'data-fixed-quantity': '4'
    }, group);
    drawConnection('INPUT-CONTEXTS', edge(NODES.input, 'top'), edge(NODES.contexts, 'left'), perimeter);
    drawConnection('CONTEXTS-RESPONSE', edge(NODES.contexts, 'right'), edge(NODES.response, 'top'), perimeter);
    drawConnection('REFERENCE-RESPONSE', edge(NODES.reference, 'right'), edge(NODES.response, 'bottom'), perimeter);
    drawConnection('INPUT-REFERENCE', edge(NODES.input, 'bottom'), edge(NODES.reference, 'left'), perimeter);

    var axes = el('g', {
      'data-layout-zone': 'p2.cross-axis',
      'data-slot-id': 'cross-axis',
      'data-fixed-quantity': '2'
    }, group);
    drawConnection('CONTEXTS-REFERENCE', edge(NODES.contexts, 'bottom'), edge(NODES.reference, 'top'), axes);
    var answerEdge = el('g', {
      'data-layout-zone': 'p2.edge-input-response',
      'data-slot-id': 'edge-input-response',
      'data-repeat-unit': 'rag-evaluation-edge',
      'data-mapping-edge': 'INPUT-RESPONSE'
    }, axes);
    line(edge(NODES.input, 'right').x, NODES.input.cy, 526, NODES.input.cy, {
      stroke: INK, 'stroke-width': .9, opacity: .5
    }, answerEdge);
    line(554, NODES.response.cy, edge(NODES.response, 'left').x, NODES.response.cy, {
      stroke: INK, 'stroke-width': .9, opacity: .5
    }, answerEdge);
  }

  function drawNode(node, index, parent) {
    var x = node.cx - NODE_WIDTH / 2;
    var y = node.cy - NODE_HEIGHT / 2;
    var isContext = node.key === 'CONTEXTS';
    var group = el('g', {
      'data-layout-zone': 'p2.node-' + (index + 1),
      'data-slot-id': 'node-' + node.key.toLowerCase(),
      'data-repeat-unit': 'rag-evaluation-node',
      'data-node-key': node.key
    }, parent);
    el('rect', Object.assign({
      class: 'p2-node-card', x: x, y: y, width: NODE_WIDTH, height: NODE_HEIGHT, fill: PAPER
    }, isContext ? { id: 'p2-context-card' } : {}), group);
    el('rect', Object.assign({
      x: x, y: y, width: NODE_WIDTH, height: NODE_HEIGHT,
      fill: 'none', stroke: INK80, 'stroke-width': 1.25
    }, isContext ? { id: 'p2-context-frame' } : {}), group);
    el('rect', Object.assign({
      x: x + 5, y: y + 5, width: NODE_WIDTH - 10, height: NODE_HEIGHT - 10,
      fill: 'none', stroke: INK, 'stroke-width': .6, opacity: .35
    }, isContext ? { id: 'p2-context-frame-inner' } : {}), group);
    text(node.en, node.cx, node.cy - 4, Object.assign({
      'font-family': MONO, 'font-size': 11.5, 'letter-spacing': 1.65,
      'text-anchor': 'middle', 'font-weight': 700
    }, isContext ? { id: 'p2-context-en' } : {}), group);
    text(node.cn, node.cx, node.cy + 27, Object.assign({ 'data-xp-anchor': 'node',
      'font-size': 18, 'font-weight': 500, 'text-anchor': 'middle'
    }, isContext ? { id: 'p2-context-cn' } : {}), group);
  }

  function drawNodes() {
    var group = el('g', {
      'data-layout-zone': 'p2.nodes',
      'data-slot-id': 'rag-evaluation-nodes',
      'data-fixed-quantity': '4'
    });
    [NODES.input, NODES.contexts, NODES.response, NODES.reference].forEach(function (node, index) {
      drawNode(node, index, group);
    });
  }

  function drawMetricLabel(metric, index, parent) {
    var group = el('g', {
      'data-layout-zone': 'p2.metric-label-' + (index + 1),
      'data-slot-id': metric.key,
      'data-repeat-unit': 'rag-evaluation-metric',
      'data-metric-key': metric.key
    }, parent);
    var backingLeft = metric.anchor === 'end'
      ? metric.x - metric.backingWidth
      : metric.anchor === 'middle'
        ? metric.x - metric.backingWidth / 2
        : metric.x;
    el('rect', {
      x: backingLeft - 8, y: metric.y - 16,
      width: metric.backingWidth + 16, height: 48,
      fill: PAPER, 'data-path-mask': 'p2.metric-label'
    }, group);
    text(metric.en, metric.x, metric.y, {
      'font-family': MONO, 'font-size': metric.size || 10.5,
      'letter-spacing': metric.spacing || 1.25,
      'text-anchor': metric.anchor, fill: INK
    }, group);
    text(metric.cn, metric.x, metric.y + 23, {
      'font-size': 12.5, 'text-anchor': metric.anchor, fill: INK70
    }, group);
    el('circle', { cx: metric.dot.x, cy: metric.dot.y, r: 2.4, fill: INK, opacity: .68 }, group);
  }

  function drawMetricLabels() {
    var group = el('g', {
      'data-layout-zone': 'p2.metric-labels',
      'data-slot-id': 'rag-evaluation-metrics',
      'data-fixed-quantity': '4'
    });
    var inputContextsMid = midpoint(edge(NODES.input, 'top'), edge(NODES.contexts, 'left'));
    var contextsResponseMid = midpoint(edge(NODES.contexts, 'right'), edge(NODES.response, 'top'));
    var referenceResponseMid = midpoint(edge(NODES.reference, 'right'), edge(NODES.response, 'bottom'));
    var metrics = [
      { key: 'context-recall-precision', en: 'CONTEXT RECALL / PRECISION', cn: '检索覆盖', x: 348, y: 535, anchor: 'end', backingWidth: 210, size: 9.6, spacing: 1.05, dot: inputContextsMid },
      { key: 'faithfulness', en: 'FAITHFULNESS', cn: '忠实度', x: 732, y: 535, anchor: 'start', backingWidth: 128, dot: contextsResponseMid },
      { key: 'response-relevancy', en: 'RESPONSE RELEVANCY', cn: '回答相关', x: 450, y: 696, anchor: 'middle', backingWidth: 180, dot: { x: 442, y: 740 } },
      { key: 'factual-correctness', en: 'FACTUAL CORRECTNESS', cn: '事实正确', x: 732, y: 946, anchor: 'start', backingWidth: 190, dot: referenceResponseMid }
    ];
    metrics.forEach(function (metric, index) { drawMetricLabel(metric, index, group); });

    var bridge = el('g', {
      'data-layout-zone': 'p2.metric-bridge',
      'data-slot-id': 'context-recall-precision-bridge'
    }, group);
    el('path', {
      d: 'M 362 541 L 523 610', fill: 'none', stroke: INK,
      'stroke-width': .6, opacity: .4, 'stroke-dasharray': '2 4'
    }, bridge);
    el('circle', { cx: 528, cy: 612, r: 2, fill: INK, opacity: .5 }, bridge);
  }

  function drawRetrievalMeasures() {
    var group = el('g', {
      'data-layout-zone': 'p2.retrieval-measures',
      'data-slot-id': 'retrieval-measures',
      'data-fixed-quantity': '4'
    });
    text('RECALL@K · PRECISION@K · MRR · NDCG@K', 540, 535, {
      'font-family': MONO, 'font-size': 9.4, 'letter-spacing': 1.25,
      'text-anchor': 'middle', fill: INK45
    }, group);
  }

  function drawLegend() {
    var group = el('g', { 'data-layout-zone': 'p2.legend', 'data-slot-id': 'reading-guide' });
    line(90, 1159, 990, 1159, { stroke: INK45, 'stroke-width': .6 }, group);
    text('READ THE EDGES, NOT A PIPELINE', 90, 1190, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.5, fill: INK45
    }, group);
    text('每条边对应一组评测依据 · 无箭头', 990, 1190, {
      'font-size': 12, 'text-anchor': 'end', fill: INK45
    }, group);
  }

  function drawP2() {
    text('RAG 质量，需要四组关系共同校验', 90, 214, {
      'font-family': SERIF, 'font-size': 46, 'font-weight': 500
    });
    text('问题、上下文、回答与参考答案组成四节点映射；每条边承担不同评测依据。', 90, 266, {
      'font-size': 20, fill: INK70
    });
    drawSectionLabel();
    drawMappingEdges();
    drawMetricLabels();
    drawNodes();
    drawRetrievalMeasures();
    drawLegend();
  }

  drawP2();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
