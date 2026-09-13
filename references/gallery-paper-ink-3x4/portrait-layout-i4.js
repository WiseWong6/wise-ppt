(function () {
  'use strict';

  var svg = document.querySelector('.scene');
  var NS = 'http://www.w3.org/2000/svg';
  var INK = 'var(--ink)';
  var INK80 = 'var(--ink-80)';
  var INK70 = 'var(--ink-70)';
  var INK45 = 'var(--ink-45)';
  var PANEL = 'var(--paper-panel)';
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

  function panel(x, y, width, height, zone, outerId) {
    var group = el('g', { 'data-layout-zone': zone });
    el('rect', Object.assign({ x: x, y: y, width: width, height: height, fill: PANEL, stroke: INK80, 'stroke-width': 1.2 },
      outerId ? { id: outerId } : {}), group);
    el('rect', { x: x + 5, y: y + 5, width: width - 10, height: height - 10, fill: 'none', stroke: INK45, 'stroke-width': .6 }, group);
    return group;
  }

  function arrow(x1, y1, x2, y2, parent) {
    line(x1, y1, x2, y2, { stroke: INK45, 'stroke-width': 1, 'stroke-dasharray': '4 5' }, parent);
    el('path', { d: 'M ' + (x2 - 8) + ' ' + (y2 - 6) + ' L ' + x2 + ' ' + y2 + ' L ' + (x2 - 8) + ' ' + (y2 + 6), fill: 'none', stroke: INK70, 'stroke-width': 1 }, parent);
  }

  function pill(label, x, y, width, parent, highlighted) {
    el('rect', { x: x, y: y, width: width, height: 38, fill: highlighted ? DEEP : 'none', stroke: INK45, 'stroke-width': .9 }, parent);
    text(label, x + width / 2, y + 25, { 'font-size': 15, 'letter-spacing': .8, fill: highlighted ? INK : INK70, 'text-anchor': 'middle' }, parent);
  }

  function routeNode(index, label, x, y, parent) {
    el('circle', { cx: x, cy: y, r: 30, fill: DEEP, stroke: INK80, 'stroke-width': 1.2 }, parent);
    text(('0' + index).slice(-2), x, y + 5, { 'font-family': MONO, 'font-size': 14, 'letter-spacing': 1, fill: INK70, 'text-anchor': 'middle' }, parent);
    text(label, x, y + 57, { 'font-size': 17, 'font-weight': 400, 'text-anchor': 'middle' }, parent);
  }

  function drawRoutePanel() {
    var group = panel(90, 322, 900, 386, 'i4.route-path');
    text('PATH 01 · ROUTING', 126, 360, { 'font-family': MONO, 'font-size': 13, 'letter-spacing': 2, fill: INK45 }, group);
    text('意图路由', 126, 401, { 'data-xp-anchor': 'path', 'font-size': 28, 'font-weight': 400 }, group);
    text('把问题分发给对的专家 Agent', 288, 401, { 'font-size': 18, fill: INK70 }, group);
    line(126, 423, 954, 423, { stroke: INK45, 'stroke-width': .7 }, group);

    var nodes = [
      ['用户输入', 164],
      ['槽位提取', 352],
      ['候选路由', 540],
      ['权限配额', 728],
      ['专家 Agent', 916]
    ];
    nodes.forEach(function (item, index) {
      routeNode(index + 1, item[0], item[1], 508, group);
      if (index < nodes.length - 1) arrow(item[1] + 38, 508, nodes[index + 1][1] - 38, 508, group);
    });

    line(728, 478, 728, 466, { stroke: INK45, 'stroke-dasharray': '3 4' }, group);
    pill('权限校验', 662, 428, 122, group, false);
    line(728, 538, 728, 598, { stroke: INK45, 'stroke-dasharray': '3 4' }, group);
    pill('配额校验', 662, 598, 122, group, false);

    ['更快响应', '减少升级', '满意兜底'].forEach(function (label, index) {
      pill(label, 218 + index * 216, 660, 172, group, index === 0);
    });
  }

  function drawFallbackPanel() {
    var group = panel(90, 746, 900, 428, 'i4.fallback-path', 'i4-focus-frame');
    text('PATH 02 · FALLBACK', 126, 784, { 'font-family': MONO, 'font-size': 13, 'letter-spacing': 2, fill: INK45 }, group);
    text('异常兜底', 126, 825, { id: 'i4-focus-title', 'data-xp-anchor': 'path', 'font-size': 28, 'font-weight': 400 }, group);
    text('识别失败类型，给出降级路径', 288, 825, { 'font-size': 18, fill: INK70 }, group);

    el('rect', { x: 126, y: 848, width: 828, height: 76, fill: 'none', stroke: INK45, 'stroke-width': .8, 'stroke-dasharray': '5 5' }, group);
    ['超时', '幻觉', '工具失败', '越权', '限流'].forEach(function (label, index) {
      pill(label, 146 + index * 158, 867, 136, group, index === 2);
    });

    el('circle', { cx: 188, cy: 1002, r: 31, fill: DEEP, stroke: INK80, 'stroke-width': 1.2 }, group);
    el('path', { d: 'M 171 1005 L 181 995 L 190 1004 M 197 985 A 13 13 0 1 1 197 1011 M 207 1008 L 220 1021', fill: 'none', stroke: INK70, 'stroke-width': 1.3 }, group);
    text('断点识别', 188, 1054, { 'font-size': 17, 'font-weight': 400, 'text-anchor': 'middle' }, group);

    arrow(226, 1002, 342, 1002, group);
    el('path', { d: 'M 342 1002 L 424 958 L 506 1002 L 424 1046 Z', fill: DEEP, stroke: INK80, 'stroke-width': 1.2 }, group);
    text('是否可重试', 424, 1008, { 'font-size': 17, 'font-weight': 400, 'text-anchor': 'middle' }, group);

    line(506, 1002, 594, 1002, { stroke: INK70, 'stroke-width': 1 }, group);
    line(594, 1002, 594, 965, { stroke: INK70, 'stroke-width': 1 }, group);
    line(594, 1002, 594, 1039, { stroke: INK70, 'stroke-width': 1 }, group);
    arrow(594, 965, 682, 965, group);
    arrow(594, 1039, 682, 1039, group);
    text('可重试', 620, 953, { 'font-family': MONO, 'font-size': 11, 'letter-spacing': .8, fill: INK45 }, group);
    text('不可重试', 610, 1027, { 'font-family': MONO, 'font-size': 11, 'letter-spacing': .8, fill: INK45 }, group);

    el('rect', { x: 682, y: 940, width: 246, height: 50, fill: 'none', stroke: INK80, 'stroke-width': 1 }, group);
    text('退避重试 / 换参再试', 805, 972, { 'font-size': 17, 'text-anchor': 'middle' }, group);
    el('rect', { x: 682, y: 1014, width: 246, height: 50, fill: DEEP, stroke: INK80, 'stroke-width': 1 }, group);
    text('降级兜底话术', 805, 1046, { 'font-size': 17, 'text-anchor': 'middle' }, group);

    pill('减少重试', 292, 1100, 210, group, false);
    pill('守住底线', 578, 1100, 210, group, true);
  }

  function drawI4() {
    text('两条并行解法，各自完成闭环', 90, 222, { 'font-family': SERIF, 'font-size': 50, 'font-weight': 500 });
    text('同一问题的两套处理路径：正常路由与异常兜底。', 90, 274, { 'font-size': 25, fill: INK70 });
    drawRoutePanel();
    drawFallbackPanel();
  }

  drawI4();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
