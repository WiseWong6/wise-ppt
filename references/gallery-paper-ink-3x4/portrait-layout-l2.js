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
  var SANS = 'var(--sans)';
  var MONO = 'var(--mono)';
  var SERIF = 'var(--serif)';

  var EVAL_X = 260;
  var CAPABILITY_X = 820;
  var ROW_Y = [500, 590, 680, 770, 860, 950];
  var EVALS = [
    { key: 'MMLU', en: 'MMLU', cn: '综合知识', y: ROW_Y[0] },
    { key: 'HUMANEVAL', en: 'HUMANEVAL', cn: '代码生成', y: ROW_Y[1] },
    { key: 'GSM8K', en: 'GSM8K', cn: '数学推理', y: ROW_Y[2] },
    { key: 'BBH', en: 'BBH', cn: '复杂推理', y: ROW_Y[3] },
    { key: 'TRUTHFULQA', en: 'TRUTHFULQA', cn: '事实准确', y: ROW_Y[4] },
    { key: 'MATH', en: 'MATH', cn: '高难数学', y: ROW_Y[5] }
  ];
  var CAPABILITIES = [
    { key: 'LANG', en: 'LANG', cn: '语言理解 / 常识问答', y: ROW_Y[0] - 10 },
    { key: 'CODE', en: 'CODE', cn: '代码生成 / 编程能力', y: ROW_Y[1] - 10 },
    { key: 'MATH', en: 'MATH', cn: '数学推理 / 数值计算', y: ROW_Y[2] - 10 },
    { key: 'LOGIC', en: 'LOGIC', cn: '逻辑推理 / 多步推导', y: ROW_Y[3] - 10 },
    { key: 'FACT', en: 'FACT', cn: '事实准确 / 抗幻觉', y: ROW_Y[4] - 10 },
    { key: 'COMPLEX', en: 'COMPLEX', cn: '复杂推理 / 综合任务', y: ROW_Y[5] - 10 }
  ];
  var LINKS = [
    { key: 'MMLU-LANG', source: 'MMLU', target: 'LANG', weightClass: 'primary', width: 1.8, opacity: .9 },
    { key: 'TRUTHFULQA-LANG', source: 'TRUTHFULQA', target: 'LANG', weightClass: 'shared', width: 1.1, opacity: .4 },
    { key: 'HUMANEVAL-CODE', source: 'HUMANEVAL', target: 'CODE', weightClass: 'primary', width: 1.8, opacity: .9 },
    { key: 'BBH-CODE', source: 'BBH', target: 'CODE', weightClass: 'shared', width: 1.1, opacity: .4 },
    { key: 'GSM8K-MATH', source: 'GSM8K', target: 'MATH', weightClass: 'primary', width: 1.8, opacity: .9 },
    { key: 'MATH-MATH', source: 'MATH', target: 'MATH', weightClass: 'shared', width: 1.1, opacity: .4 },
    { key: 'BBH-LOGIC', source: 'BBH', target: 'LOGIC', weightClass: 'primary', width: 1.8, opacity: .9 },
    { key: 'MMLU-LOGIC', source: 'MMLU', target: 'LOGIC', weightClass: 'shared', width: 1.1, opacity: .4 },
    { key: 'GSM8K-LOGIC', source: 'GSM8K', target: 'LOGIC', weightClass: 'weak', width: .6, opacity: .2 },
    { key: 'TRUTHFULQA-FACT', source: 'TRUTHFULQA', target: 'FACT', weightClass: 'primary', width: 1.8, opacity: .9 },
    { key: 'MMLU-FACT', source: 'MMLU', target: 'FACT', weightClass: 'shared', width: 1.1, opacity: .4 },
    { key: 'BBH-COMPLEX', source: 'BBH', target: 'COMPLEX', weightClass: 'primary', width: 1.8, opacity: .9 },
    { key: 'MATH-COMPLEX', source: 'MATH', target: 'COMPLEX', weightClass: 'shared', width: 1.1, opacity: .4 },
    { key: 'HUMANEVAL-COMPLEX', source: 'HUMANEVAL', target: 'COMPLEX', weightClass: 'weak', width: .6, opacity: .2 }
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

  function itemByKey(items, key) {
    return items.filter(function (item) { return item.key === key; })[0];
  }

  function drawSectionLabel() {
    var group = el('g', { 'data-layout-zone': 'l2.section', 'data-slot-id': 'section-label' });
    text('01 / BENCHMARK ↔ CAPABILITY', 90, 309, {
      'font-family': MONO, 'font-size': 11, 'letter-spacing': 1.8, fill: INK45
    }, group);
    line(420, 305, 990, 305, { stroke: INK45, 'stroke-width': .65 }, group);
    text('6 × 6 NODES · 14 LINKS', 990, 309, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.25,
      'text-anchor': 'end', fill: INK45
    }, group);
  }

  function drawColumnHeaders() {
    var group = el('g', { 'data-layout-zone': 'l2.column-headers', 'data-slot-id': 'mapping-roles' });
    text('ATOMIC EVAL', EVAL_X - 8, 414, { id: 'l2-focus-atomic-eval', 'data-xp-anchor': 'column',
      'font-family': MONO, 'font-size': 11, 'letter-spacing': 2.2,
      'text-anchor': 'end', fill: INK45
    }, group);
    line(EVAL_X - 168, 426, EVAL_X - 8, 426, {
      stroke: FUNCTIONAL, 'stroke-width': 2, opacity: .6
    }, group);
    text('CAPABILITY', CAPABILITY_X + 24, 414, { 'data-xp-anchor': 'column',
      'font-family': MONO, 'font-size': 11, 'letter-spacing': 2.2, fill: INK45
    }, group);
    line(CAPABILITY_X + 24, 426, CAPABILITY_X + 150, 426, {
      stroke: FUNCTIONAL, 'stroke-width': 2, opacity: .6
    }, group);
  }

  function drawLink(link, index, parent) {
    var source = itemByKey(EVALS, link.source);
    var target = itemByKey(CAPABILITIES, link.target);
    var x1 = EVAL_X + 8;
    var x2 = CAPABILITY_X - 8;
    var controlLeft = 505;
    var controlRight = 575;
    var group = el('g', {
      'data-layout-zone': 'l2.' + link.weightClass + '-link-' + (index + 1),
      'data-slot-id': link.key.toLowerCase(),
      'data-repeat-unit': 'benchmark-capability-link',
      'data-mapping-edge': link.key,
      'data-source-node': link.source,
      'data-target-node': link.target,
      'data-weight-class': link.weightClass
    }, parent);
    el('path', {
      d: 'M ' + x1 + ' ' + source.y + ' C ' + controlLeft + ' ' + source.y + ', ' +
        controlRight + ' ' + target.y + ', ' + x2 + ' ' + target.y,
      fill: 'none', stroke: INK, 'stroke-width': link.width,
      opacity: link.opacity, 'stroke-linecap': 'round'
    }, group);
    el('circle', { cx: x2, cy: target.y, r: 2.4, fill: INK, opacity: .6 }, group);
  }

  function drawMappingNetwork() {
    var group = el('g', {
      'data-layout-zone': 'l2.mapping-network',
      'data-slot-id': 'mapping-network',
      'data-fixed-quantity': '14',
      'data-component-id': 'native.paper-ink.mapping.constellation-network.mapping-network'
    });
    LINKS.forEach(function (link, index) { drawLink(link, index, group); });
  }

  function drawEvalNode(item, index, parent) {
    var group = el('g', {
      'data-layout-zone': 'l2.eval-node-' + (index + 1),
      'data-slot-id': 'eval-' + item.key.toLowerCase(),
      'data-repeat-unit': 'atomic-eval-node',
      'data-node-key': item.key
    }, parent);
    el('rect', {
      x: EVAL_X - 5, y: item.y - 5, width: 10, height: 10,
      fill: PAPER, stroke: INK80, 'stroke-width': 1.2
    }, group);
    el('circle', { cx: EVAL_X, cy: item.y, r: 1.6, fill: INK }, group);
    text(item.en, EVAL_X - 18, item.y + 2, {
      'font-family': MONO, 'font-size': 13, 'letter-spacing': 1.25,
      'text-anchor': 'end'
    }, group);
    text(item.cn, EVAL_X - 18, item.y + 23, {
      'font-size': 11, 'text-anchor': 'end', fill: INK45
    }, group);
  }

  function drawCapabilityNode(item, index, parent) {
    var group = el('g', {
      'data-layout-zone': 'l2.capability-node-' + (index + 1),
      'data-slot-id': 'capability-' + item.key.toLowerCase(),
      'data-repeat-unit': 'capability-node',
      'data-node-key': item.key
    }, parent);
    el('circle', {
      cx: CAPABILITY_X, cy: item.y, r: 7,
      fill: 'none', stroke: INK80, 'stroke-width': 1.2
    }, group);
    el('circle', { cx: CAPABILITY_X, cy: item.y, r: 2.4, fill: INK }, group);
    text(item.cn, CAPABILITY_X + 24, item.y + 2, {
      'font-size': 15, 'font-weight': 300
    }, group);
    text(item.en, CAPABILITY_X + 24, item.y + 25, {
      'font-family': MONO, 'font-size': 10, 'letter-spacing': 1.6, fill: INK45
    }, group);
  }

  function drawNodeAxes() {
    var evalGroup = el('g', {
      'data-layout-zone': 'l2.eval-axis',
      'data-slot-id': 'atomic-eval-nodes',
      'data-fixed-quantity': '6'
    });
    line(EVAL_X, 464, EVAL_X, 980, {
      stroke: INK, 'stroke-width': .5, opacity: .2, 'stroke-dasharray': '2 6'
    }, evalGroup);
    EVALS.forEach(function (item, index) { drawEvalNode(item, index, evalGroup); });

    var capabilityGroup = el('g', {
      'data-layout-zone': 'l2.capability-axis',
      'data-slot-id': 'capability-nodes',
      'data-fixed-quantity': '6'
    });
    line(CAPABILITY_X, 464, CAPABILITY_X, 980, {
      stroke: INK, 'stroke-width': .5, opacity: .2, 'stroke-dasharray': '2 6'
    }, capabilityGroup);
    CAPABILITIES.forEach(function (item, index) { drawCapabilityNode(item, index, capabilityGroup); });
  }

  function drawWeightLegend() {
    var group = el('g', {
      'data-layout-zone': 'l2.weight-legend',
      'data-slot-id': 'weight-legend',
      'data-fixed-quantity': '2'
    });
    line(600, 1054, 652, 1054, { stroke: INK, 'stroke-width': 1.8, opacity: .9 }, group);
    text('PRIMARY', 664, 1059, {
      id: 'sample-focus', 'font-family': MONO, 'font-size': 9,
      'letter-spacing': 1.5, fill: INK45
    }, group);
    line(785, 1054, 837, 1054, { stroke: INK, 'stroke-width': 1.1, opacity: .4 }, group);
    text('SHARED', 849, 1059, {
      'font-family': MONO, 'font-size': 9, 'letter-spacing': 1.5, fill: INK45
    }, group);
  }

  function drawL2() {
    text('一个能力，往往由多个基准共同证明', 90, 214, {
      'font-family': SERIF, 'font-size': 46, 'font-weight': 500
    });
    text('六项评测基准交叉映射六种能力；线宽区分主依赖、共享依赖与弱关联。', 90, 266, {
      'font-size': 20, fill: INK70
    });
    drawSectionLabel();
    drawColumnHeaders();
    drawMappingNetwork();
    drawNodeAxes();
    drawWeightLegend();
  }

  drawL2();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
