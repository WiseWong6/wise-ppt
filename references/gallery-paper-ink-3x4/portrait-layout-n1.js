(function () {
  'use strict';

  var svg = document.querySelector('.scene');
  var NS = 'http://www.w3.org/2000/svg';
  var INK = 'var(--ink)';
  var INK80 = 'var(--ink-80)';
  var INK70 = 'var(--ink-70)';
  var INK45 = 'var(--ink-45)';
  var PAPER = 'var(--paper)';
  var FUNCTIONAL = 'var(--wp-color-functional)';
  var SANS = 'var(--sans)';
  var MONO = 'var(--mono)';
  var SERIF = 'var(--serif)';

  var SOURCES = [
    {
      no: '01', en: 'SYSTEM', title: '系统设定',
      items: [['角色设定', 'ROLE'], ['行为规则', 'RULES'], ['约束边界', 'CONSTRAINT'], ['风格语气', 'TONE']]
    },
    {
      no: '02', en: 'HISTORY', title: '对话历史',
      items: [['历史轮次', 'TURNS'], ['用户意图', 'INTENT'], ['上下文槽', 'CONTEXT'], ['已确认项', 'CONFIRMED']]
    }
  ];
  var COMPOSED_ITEMS = [
    ['任务指令', 'INSTRUCTION'], ['上下文片段', 'CONTEXT'], ['工具定义', 'TOOLS'],
    ['示例样本', 'EXAMPLES'], ['输出格式', 'FORMAT'], ['安全策略', 'SAFETY']
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

  function drawSourceCard(source, sourceIndex) {
    var x = sourceIndex === 0 ? 90 : 570;
    var y = 390;
    var width = 420;
    var height = 240;
    var group = el('g', {
      'data-layout-zone': 'n1.source-' + (sourceIndex + 1),
      'data-slot-id': sourceIndex === 0 ? 'system-source' : 'history-source'
    });
    el('rect', { x: x, y: y, width: width, height: height, fill: 'none', stroke: INK80, 'stroke-width': 1 }, group);
    text(source.no + ' · ' + source.en, x + 18, y + 30, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.2, fill: INK45
    }, group);
    text(source.title, x + 18, y + 66, { 'font-size': 20, 'font-weight': 400 }, group);
    line(x + 18, y + 82, x + width - 18, y + 82, { stroke: FUNCTIONAL, 'stroke-width': 2 }, group);
    line(x + 18, y + 87, x + 98, y + 87, { stroke: FUNCTIONAL, 'stroke-width': 1 }, group);
    source.items.forEach(function (item, itemIndex) {
      var rowY = y + 112 + itemIndex * 31;
      var itemGroup = el('g', {
        'data-layout-zone': 'n1.source-item-' + (sourceIndex * 4 + itemIndex + 1),
        'data-slot-id': 'source-item-' + (sourceIndex * 4 + itemIndex + 1)
      }, group);
      el('circle', { cx: x + 22, cy: rowY - 4, r: 2.5, fill: INK }, itemGroup);
      text(item[0], x + 38, rowY, { 'font-size': 14.5 }, itemGroup);
      text(item[1], x + width - 18, rowY, {
        'font-family': MONO, 'font-size': 8.5, 'letter-spacing': .8,
        'text-anchor': 'end', fill: INK45
      }, itemGroup);
    });
  }

  function drawConvergence() {
    var flow = el('g', {
      'data-layout-zone': 'n1.convergence-flow',
      'data-slot-id': 'source-merge-flow'
    });
    el('path', {
      d: 'M 300 630 C 300 660, 430 662, 522 684',
      fill: 'none', stroke: INK70, 'stroke-width': 1
    }, flow);
    el('path', {
      d: 'M 780 630 C 780 660, 650 662, 558 684',
      fill: 'none', stroke: INK70, 'stroke-width': 1
    }, flow);
    var merge = el('g', {
      'data-layout-zone': 'n1.merge-point', 'data-slot-id': 'merge-point'
    });
    el('circle', { cx: 540, cy: 690, r: 17, fill: PAPER, stroke: INK80, 'stroke-width': 1.1 }, merge);
    el('circle', { cx: 540, cy: 690, r: 3, fill: INK }, merge);
    text('MERGE', 566, 694, {
      id: 'sample-focus', 'font-family': MONO, 'font-size': 9.5,
      'letter-spacing': 1.4, fill: INK45
    }, merge);
    line(540, 707, 540, 738, { stroke: INK80, 'stroke-width': 1.2 }, merge);
    el('path', { d: 'M 534 730 L 540 738 L 546 730', fill: 'none', stroke: INK80, 'stroke-width': 1.2 }, merge);
  }

  function drawComposedPrompt() {
    var x = 90;
    var y = 748;
    var width = 900;
    var height = 320;
    var group = el('g', {
      'data-layout-zone': 'n1.composed-card', 'data-slot-id': 'composed-prompt'
    });
    el('rect', {
      id: 'n1-focus-frame', x: x, y: y, width: width, height: height,
      fill: 'none', stroke: INK80, 'stroke-width': 1.1
    }, group);
    text('COMPOSED PROMPT', x + 22, y + 32, {
      id: 'n1-focus-en', 'font-family': MONO, 'font-size': 10,
      'letter-spacing': 1.6, fill: INK45
    }, group);
    text('组装后提示词', x + 22, y + 72, {
      id: 'n1-focus-cn', 'font-size': 23, 'font-weight': 400
    }, group);
    line(x + 22, y + 88, x + width - 22, y + 88, { stroke: FUNCTIONAL, 'stroke-width': 2 }, group);
    line(x + 22, y + 93, x + 102, y + 93, { stroke: FUNCTIONAL, 'stroke-width': 1 }, group);
    text('6 PARTS', x + width - 22, y + 68, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.3,
      'text-anchor': 'end', fill: INK45
    }, group);
    line(x + 22, y + 92, x + width - 22, y + 92, { stroke: INK45, 'stroke-width': .6 }, group);
    COMPOSED_ITEMS.forEach(function (item, itemIndex) {
      var column = itemIndex % 2;
      var row = Math.floor(itemIndex / 2);
      var columnX = x + 22 + column * 438;
      var rowY = y + 132 + row * 58;
      var itemGroup = el('g', {
        'data-layout-zone': 'n1.composed-item-' + (itemIndex + 1),
        'data-slot-id': 'composed-item-' + (itemIndex + 1)
      }, group);
      text(String(itemIndex + 1).padStart(2, '0'), columnX, rowY, {
        'font-family': MONO, 'font-size': 9.5, fill: INK45
      }, itemGroup);
      text(item[0], columnX + 40, rowY + 1, { 'font-size': 16, 'font-weight': 400 }, itemGroup);
      text(item[1], columnX + 390, rowY, {
        'font-family': MONO, 'font-size': 9, 'letter-spacing': .9,
        'text-anchor': 'end', fill: INK45
      }, itemGroup);
      if (row < 2) {
        line(columnX, rowY + 25, columnX + 390, rowY + 25, {
          stroke: INK45, 'stroke-width': .45
        }, itemGroup);
      }
    });
  }

  function drawOutput() {
    var group = el('g', {
      'data-layout-zone': 'n1.output-flow', 'data-slot-id': 'llm-output-flow'
    });
    line(540, 1068, 540, 1100, { stroke: INK80, 'stroke-width': 1.1 }, group);
    el('path', { d: 'M 534 1092 L 540 1100 L 546 1092', fill: 'none', stroke: INK80, 'stroke-width': 1.1 }, group);
    var terminal = el('g', {
      'data-layout-zone': 'n1.llm-terminal', 'data-slot-id': 'llm-terminal'
    });
    el('rect', { x: 430, y: 1112, width: 220, height: 54, fill: 'none', stroke: INK80, 'stroke-width': 1 }, terminal);
    line(448, 1112, 448, 1166, { stroke: INK80, 'stroke-width': 2.5 }, terminal);
    text('TO LLM', 540, 1145, {
      'font-family': MONO, 'font-size': 12, 'letter-spacing': 2,
      'text-anchor': 'middle'
    }, terminal);
  }

  function drawN1() {
    text('两路上下文，在一个合并点组装', 90, 220, {
      'font-family': SERIF, 'font-size': 48, 'font-weight': 500
    });
    text('两路来源在上方并列，经单一汇聚点进入下方提示词。', 90, 272, {
      'font-size': 20.5, fill: INK70
    });
    text('01 / PARALLEL SOURCES', 90, 350, {
      'font-family': MONO, 'font-size': 10.5, 'letter-spacing': 1.6, fill: INK45
    });
    text('02 / COMPOSED OUTPUT', 990, 350, {
      'font-family': MONO, 'font-size': 10.5, 'letter-spacing': 1.6, fill: INK45
      , 'text-anchor': 'end'
    });
    SOURCES.forEach(drawSourceCard);
    drawConvergence();
    drawComposedPrompt();
    drawOutput();
  }

  drawN1();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
