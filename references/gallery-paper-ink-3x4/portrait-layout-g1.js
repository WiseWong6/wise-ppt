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

  var INPUT_FIELDS = [
    ['system_prompt', '系统提示词与人设'],
    ['user_message', '用户消息与意图'],
    ['context', '上下文与检索片段'],
    ['tools', '可调用工具声明']
  ];
  var PARAM_FIELDS = [
    ['temperature', '采样温度'],
    ['top_p', '核采样阈值'],
    ['max_tokens', '最大生成长度'],
    ['frequency_penalty', '频率惩罚'],
    ['stop', '停止序列']
  ];
  var OUTPUT_FIELDS = [
    ['completion', '生成文本与回复'],
    ['tool_calls', '工具调用请求'],
    ['token_usage', 'Token 用量统计'],
    ['finish_reason', '结束原因与状态'],
    ['logprobs', '对数概率回传'],
    ['latency', '首字与总耗时']
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

  function sectionLabel() {
    var group = el('g', { 'data-layout-zone': 'g1.section', 'data-slot-id': 'section-label' });
    text('01 / THREE-WAY RADIAL', 90, 309, {
      'font-family': MONO, 'font-size': 11, 'letter-spacing': 1.8, fill: INK45
    }, group);
    line(358, 305, 990, 305, { stroke: INK45, 'stroke-width': .65 }, group);
    text('ONE NODE · THREE FIELD GROUPS', 990, 309, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.25,
      'text-anchor': 'end', fill: INK45
    }, group);
  }

  function branchHeading(cn, en, count, x, y, anchor, parent) {
    text(cn, x, y, {
      'font-size': 25, 'font-weight': 400, 'letter-spacing': 4,
      'text-anchor': anchor
    }, parent);
    text(en + ' / ' + String(count).padStart(2, '0'), x, y + 28, {
      'font-family': MONO, 'font-size': 10, 'letter-spacing': 1.7,
      'text-anchor': anchor, fill: INK45
    }, parent);
  }

  function drawInputField(field, index, parent) {
    var x = 118 + index * 220;
    var group = el('g', {
      'data-layout-zone': 'g1.field-input-' + (index + 1),
      'data-slot-id': 'input-' + (index + 1),
      'data-repeat-unit': 'field'
    }, parent);
    if (index > 0) line(x - 28, 393, x - 28, 510, { stroke: INK45, 'stroke-width': .55 }, group);
    text(String(index + 1).padStart(2, '0'), x, 421, {
      'font-family': MONO, 'font-size': 10, 'letter-spacing': 1.2, fill: INK45
    }, group);
    text(field[0], x, 458, {
      'font-family': MONO, 'font-size': 15, 'font-weight': 400
    }, group);
    text(field[1], x, 491, { 'font-size': 16, fill: INK70 }, group);
    line(x, 510, x + 176, 510, { stroke: INK45, 'stroke-width': .75, opacity: .72 }, group);
  }

  function drawInputBranch() {
    var group = el('g', {
      'data-layout-zone': 'g1.branch-input',
      'data-slot-id': 'input',
      'data-fixed-quantity': '4',
      'data-component-id': 'native.paper-ink.radial.field-strip'
    });
    branchHeading('输 入', 'INPUT', INPUT_FIELDS.length, 118, 379, 'start', group);
    text('PROMPT · INTENT · CONTEXT · TOOLS', 962, 378, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.15,
      'text-anchor': 'end', fill: INK45
    }, group);
    INPUT_FIELDS.forEach(function (field, index) { drawInputField(field, index, group); });
  }

  function drawVerticalField(field, index, side, x, y, width, parent) {
    var group = el('g', {
      'data-layout-zone': 'g1.field-' + side + '-' + (index + 1),
      'data-slot-id': side + '-' + (index + 1),
      'data-repeat-unit': 'field'
    }, parent);
    text(String(index + 1).padStart(2, '0'), x, y + 18, {
      'font-family': MONO, 'font-size': 10, 'letter-spacing': 1, fill: INK45
    }, group);
    text(field[0], x + 42, y + 18, {
      'font-family': MONO, 'font-size': 14.5, 'font-weight': 400
    }, group);
    text(field[1], x + 42, y + 42, { 'font-size': 15.5, fill: INK70 }, group);
    line(x + 42, y + 52, x + width, y + 52, {
      stroke: INK45,
      'stroke-width': index === 0 ? .8 : .45,
      opacity: index === 0 ? .8 : .62
    }, group);
  }

  function drawVerticalBranch(side, cn, en, fields, x, y, width, height) {
    var group = el('g', {
      'data-layout-zone': 'g1.branch-' + side,
      'data-slot-id': side,
      'data-fixed-quantity': String(fields.length),
      'data-component-id': 'native.paper-ink.radial.field-list'
    });
    branchHeading(cn, en, fields.length, x + 28, y + 43, 'start', group);
    line(x + 28, y + 82, x + width - 28, y + 82, { stroke: INK45, 'stroke-width': .65 }, group);
    fields.forEach(function (field, index) {
      drawVerticalField(field, index, side, x + 28, y + 96 + index * 56, width - 56, group);
    });
  }

  function drawCenterNode() {
    var group = el('g', {
      'data-layout-zone': 'g1.center',
      'data-slot-id': 'model-node',
      'data-component-id': 'native.paper-ink.radial.model-node'
    });
    el('rect', {
      id: 'g1-focus-frame', x: 330, y: 600, width: 420, height: 132,
      fill: PANEL, stroke: INK80, 'stroke-width': 1.5
    }, group);
    el('rect', {
      x: 336, y: 606, width: 408, height: 120,
      fill: 'none', stroke: INK45, 'stroke-width': .65
    }, group);
    text('MODEL NODE', 540, 653, {
      id: 'sample-focus', 'font-family': MONO, 'font-size': 24,
      'letter-spacing': 3, 'text-anchor': 'middle'
    }, group);
    text('LLM 调用节点', 540, 696, {
      id: 'g1-focus-cn', 'font-size': 25, 'font-weight': 300,
      'letter-spacing': 4, 'text-anchor': 'middle'
    }, group);
  }

  function drawConnectors() {
    var group = el('g', {
      'data-layout-zone': 'g1.connectors',
      'data-slot-id': 'three-way-branches'
    });
    line(540, 534, 540, 600, { stroke: INK, 'stroke-width': 1, opacity: .72 }, group);
    line(438, 732, 295, 804, { stroke: INK, 'stroke-width': 1, opacity: .72 }, group);
    line(642, 732, 785, 804, { stroke: INK, 'stroke-width': 1, opacity: .72 }, group);
    [[540, 567], [295, 804], [785, 804]].forEach(function (point) {
      el('circle', { cx: point[0], cy: point[1], r: 3, fill: INK }, group);
    });
    el('rect', {
      x: 299, y: 770, width: 72, height: 22,
      fill: PAPER, 'data-path-mask': 'g1.connector-label'
    }, group);
    el('rect', {
      x: 720, y: 770, width: 50, height: 22,
      fill: PAPER, 'data-path-mask': 'g1.connector-label'
    }, group);
    text('IN', 557, 575, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.5, fill: INK45
    }, group);
    text('PARAMS', 335, 786, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.5,
      'text-anchor': 'middle', fill: INK45
    }, group);
    text('OUT', 745, 786, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.5,
      'text-anchor': 'middle', fill: INK45
    }, group);
  }

  function drawG1() {
    text('LLM 调用节点的三组字段', 90, 214, {
      'font-family': SERIF, 'font-size': 48, 'font-weight': 500
    });
    text('输入、参数与输出围绕同一节点展开；它们是字段分类，不是三个步骤。', 90, 266, {
      'font-size': 20, fill: INK70
    });
    sectionLabel();
    var radial = el('g', {
      'data-layout-zone': 'g1.radial',
      'data-slot-id': 'input-params-output',
      'data-fixed-quantity': '3'
    });
    drawInputBranch();
    drawConnectors();
    drawCenterNode();
    drawVerticalBranch('params', '参 数', 'PARAMS', PARAM_FIELDS, 90, 804, 410, 454);
    drawVerticalBranch('output', '输 出', 'OUTPUT', OUTPUT_FIELDS, 580, 804, 410, 454);
    ['g1.branch-input', 'g1.connectors', 'g1.center', 'g1.branch-params', 'g1.branch-output'].forEach(function (zone) {
      var node = document.querySelector('[data-layout-zone="' + zone + '"]');
      if (node) radial.appendChild(node);
    });
  }

  drawG1();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
