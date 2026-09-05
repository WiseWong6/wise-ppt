(function () {
  'use strict';

  var svg = document.querySelector('.scene');
  var NS = 'http://www.w3.org/2000/svg';
  var INK = 'var(--ink)';
  var INK80 = 'var(--ink-80)';
  var INK70 = 'var(--ink-70)';
  var INK45 = 'var(--ink-45)';
  var DEEP = 'var(--paper-deep)';
  var FUNCTIONAL = 'var(--wp-color-functional)';
  var SANS = 'var(--sans)';
  var MONO = 'var(--mono)';
  var SERIF = 'var(--serif)';

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

  function marker(kind, value, x, y, parent, focusKind) {
    if (kind === 'dot') {
      el('circle', { cx: x, cy: y, r: 8, fill: DEEP, stroke: INK80, 'stroke-width': 1 }, parent);
      el('circle', Object.assign({ cx: x, cy: y, r: 2.4, fill: INK },
        focusKind === 'boundary' ? { id: 'f3-boundary-dot' } : {}), parent);
      return;
    }
    if (kind === 'box') {
      var harnessAttrs = focusKind === 'harness' ? { 'data-f3-icon': 'harness' } : {};
      el('rect', Object.assign({ x: x - 9, y: y - 9, width: 18, height: 18, fill: 'none', stroke: INK80, 'stroke-width': 1 }, harnessAttrs), parent);
      line(x - 5, y, x + 5, y, Object.assign({ stroke: INK45 }, harnessAttrs), parent);
      line(x, y - 5, x, y + 5, Object.assign({ stroke: INK45 }, harnessAttrs), parent);
      return;
    }
    text(value, x, y + 5, { 'font-family': MONO, 'font-size': 13, 'letter-spacing': 1, fill: INK45, 'text-anchor': 'middle' }, parent);
  }

  function drawF3() {
    text('AI 产品负责人的三柱能力', 90, 222, { 'font-family': SERIF, 'font-size': 50, 'font-weight': 500 });
    text('每一柱包含四个能力点；并列检查，不按步骤阅读。', 90, 274, { 'font-size': 25, fill: INK70 });

    var groups = [
      { title: '认知奠基', en: 'FOUNDATIONS', kind: 'dot', items: [
        ['模型原理', '理解 Transformer 与注意力', 'ARCH'],
        ['能力边界', '清楚能做与做不到', 'BOUNDARY'],
        ['幻觉机理', '识别来源与触发条件', 'HALLU'],
        ['成本与延迟', '权衡效果、Token 与时延', 'TRADE-OFF']
      ] },
      { title: '工程思维', en: 'ENGINEERING', kind: 'box', items: [
        ['Harness 设计', '提示词、上下文与流程一体化', 'PROMPT'],
        ['上下文管控', '压缩、记忆与窗口策略', 'CONTEXT'],
        ['评测体系', '离线与线上双轨基准', 'EVAL'],
        ['语料与反馈', '标注治理与反馈闭环', 'DATA']
      ] },
      { title: '落地推进', en: 'DELIVERY', kind: 'index', items: [
        ['场景定义', '从业务痛点切出真实场景', 'SCOPE'],
        ['指标对齐', '模型指标译成业务北极星', 'KPI'],
        ['迭代节奏', '灰度发布与回滚预案', 'CADENCE'],
        ['合规治理', '隐私脱敏与内容安全', 'COMPLY']
      ] }
    ];

    groups.forEach(function (group, groupIndex) {
      var y = 300 + groupIndex * 332;
      var panel = el('g', { 'data-layout-zone': 'f3.group-' + (groupIndex + 1) });
      text(group.en, 108, y + 42, { 'font-family': MONO, 'font-size': 15, 'letter-spacing': 2.2, fill: INK45 }, panel);
      text(group.title, 108, y + 91, { 'data-xp-anchor': 'group', 'font-size': 34, 'font-weight': 400 }, panel);
      line(108, y + 114, 198, y + 114, { stroke: FUNCTIONAL, 'stroke-width': 2 }, panel);
      line(108, y + 120, 302, y + 120, { stroke: FUNCTIONAL, 'stroke-width': 1 }, panel);
      text('04', 108, y + 224, { 'font-family': MONO, 'font-size': 50, 'font-weight': 400, fill: INK80 }, panel);
      text('CAPABILITIES', 108, y + 248, { 'font-family': MONO, 'font-size': 13, 'letter-spacing': 1.8, fill: INK45 }, panel);
      line(336, y + 20, 336, y + 254, { stroke: INK45, 'stroke-width': .7 }, panel);

      group.items.forEach(function (item, itemIndex) {
        var col = itemIndex % 2;
        var row = Math.floor(itemIndex / 2);
        var x = 378 + col * 310;
        var itemY = y + 74 + row * 130;
        var focusKind = item[0] === '能力边界' ? 'boundary' : item[0] === 'Harness 设计' ? 'harness' : '';
        marker(group.kind, group.kind === 'index' ? 'C' + (itemIndex + 1) : '', x, itemY - 7, panel, focusKind);
        text(item[0], x + 26, itemY, Object.assign({ 'font-size': 23, 'font-weight': 400 },
          focusKind ? { id: focusKind === 'boundary' ? 'f3-boundary-title' : 'f3-harness-title', 'data-f3-focus-capability': 'true' } : {}), panel);
        text(item[2], x + 276, itemY, { 'font-family': MONO, 'font-size': 12, 'letter-spacing': .8, fill: INK45, 'text-anchor': 'end' }, panel);
        text(item[1], x + 26, itemY + 32, Object.assign({ 'font-size': 18, fill: INK70 },
          focusKind ? { id: focusKind === 'boundary' ? 'f3-boundary-note' : 'f3-harness-note', 'data-f3-focus-capability': 'true' } : {}), panel);
      });
    });
  }

  drawF3();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
