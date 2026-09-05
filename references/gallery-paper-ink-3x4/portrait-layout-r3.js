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

  function el(tag, attrs, parent) {
    var node = document.createElementNS(NS, tag);
    Object.keys(attrs || {}).forEach(function (key) { node.setAttribute(key, attrs[key]); });
    (parent || svg).appendChild(node);
    return node;
  }

  function text(value, x, y, attrs, parent) {
    var node = el('text', Object.assign({ x: x, y: y, fill: INK, 'font-family': SANS, 'font-weight': 300 }, attrs || {}), parent);
    node.textContent = value;
    return node;
  }

  function line(x1, y1, x2, y2, attrs, parent) {
    return el('line', Object.assign({ x1: x1, y1: y1, x2: x2, y2: y2, stroke: INK, 'stroke-width': 1 }, attrs || {}), parent);
  }

  function drawIcon(kind, x, y, parent) {
    var group = el('g', { transform: 'translate(' + x + ' ' + y + ')', fill: 'none', stroke: INK, 'stroke-width': 1.15, opacity: .86 }, parent);
    if (kind === 'reasoning') {
      el('circle', { cx: -22, cy: 0, r: 5 }, group);
      el('circle', { cx: 21, cy: -13, r: 4 }, group);
      el('circle', { cx: 21, cy: 13, r: 4 }, group);
      el('path', { d: 'M -17 0 H -3 Q 8 0 12 -9 L 17 -12 M -17 0 H -3 Q 8 0 12 9 L 17 12' }, group);
      return;
    }
    if (kind === 'memory') {
      el('rect', { x: -25, y: -14, width: 44, height: 28 }, group);
      el('rect', { x: 19, y: -7, width: 6, height: 14 }, group);
      [-19, -7, 5].forEach(function (offset, index) {
        el('rect', { x: offset, y: -9, width: 9, height: 18, fill: index === 0 ? INK : 'none', opacity: index === 0 ? .2 : .7 }, group);
      });
      return;
    }
    if (kind === 'tools') {
      [-18, 0, 18].forEach(function (offsetX) {
        [-18, 0, 18].forEach(function (offsetY) { el('rect', { x: offsetX - 6, y: offsetY - 6, width: 12, height: 12 }, group); });
      });
      el('rect', { x: -6, y: -6, width: 12, height: 12, fill: INK, opacity: .2 }, group);
      return;
    }
    if (kind === 'multimodal') {
      el('circle', { cx: 0, cy: 12, r: 4 }, group);
      el('path', { d: 'M -13 6 A 15 15 0 0 1 13 6 M -22 0 A 25 25 0 0 1 22 0 M -30 -6 A 35 35 0 0 1 30 -6' }, group);
      return;
    }
    if (kind === 'comprehend') {
      el('path', { d: 'M -28 13 A 28 28 0 0 1 28 13 M 0 13 L 15 -12' }, group);
      line(-20, -3, -24, -8, {}, group);
      line(0, -15, 0, -22, {}, group);
      line(20, -3, 24, -8, {}, group);
      el('circle', { cx: 0, cy: 13, r: 3, fill: INK }, group);
      return;
    }
    el('path', { d: 'M -23 -18 H 23 V 4 Q 23 22 0 28 Q -23 22 -23 4 Z M -23 -10 H 23 M -11 3 L -3 11 L 13 -8' }, group);
  }

  function drawCell(item, cellIndex) {
    var col = cellIndex % 2;
    var row = Math.floor(cellIndex / 2);
    var x = 90 + col * 470;
    var y = 330 + row * 290;
    var group = el('g', { 'data-layout-zone': 'r3.cell-' + (cellIndex + 1), 'data-slot-id': item.slot });
    text(('0' + (cellIndex + 1)).slice(-2), x + 30, y + 38, { 'font-family': MONO, 'font-size': 13, 'letter-spacing': 1.5, fill: INK45 }, group);
    text(item.title, x + 30, y + 98, { 'data-r3-focus-capability': 'true', 'font-size': 29, 'font-weight': 400 }, group);
    text(item.en, x + 30, y + 126, { 'font-family': MONO, 'font-size': 12, 'letter-spacing': 2, fill: INK45 }, group);
    drawIcon(item.icon, x + 360, y + 112, group);
    line(x + 30, y + 145, x + 400, y + 145, { stroke: INK45, 'stroke-width': .6 }, group);
    line(x + 30, y + 145, x + 66, y + 145, { 'data-xp-anchor': 'underline', stroke: FUNCTIONAL, 'stroke-width': 2 }, group);
    el('rect', { x: x + 74, y: y + 142, width: 4, height: 4, fill: FUNCTIONAL }, group);
    text(item.note, x + 30, y + 196, { 'font-size': 17, fill: INK70 }, group);
    text(item.secondary, x + 30, y + 231, { 'font-size': 15, fill: INK45 }, group);
  }

  function drawR3() {
    text('AI 产品的六项基础能力', 90, 222, { 'font-family': SERIF, 'font-size': 50, 'font-weight': 500 });
    text('六个能力槽彼此等权；按左到右、从上到下阅读。', 90, 274, { 'font-size': 25, fill: INK70 });
    var grid = el('g', { 'data-layout-zone': 'r3.shared-grid', 'data-slot-id': 'capability-grid' });
    el('rect', {
      x: 75, y: 315, width: 930, height: 768, fill: 'none', stroke: INK45,
      'stroke-width': .6, 'stroke-dasharray': '2 6', opacity: .62
    }, grid);
    line(540, 315, 540, 1083, { stroke: INK45, 'stroke-width': .6, 'stroke-dasharray': '2 6', opacity: .62 }, grid);
    [571, 827].forEach(function (y) {
      line(75, y, 1005, y, { stroke: INK45, 'stroke-width': .6, 'stroke-dasharray': '2 6', opacity: .62 }, grid);
    });
    [
      { slot: 'cell-a', title: '推理', en: 'REASONING', icon: 'reasoning', note: '思维链 · 多步规划', secondary: '复杂问题分步求解' },
      { slot: 'cell-b', title: '记忆', en: 'MEMORY', icon: 'memory', note: '上下文窗口与容量', secondary: '向量检索召回相关片段' },
      { slot: 'cell-c', title: '工具', en: 'TOOLS', icon: 'tools', note: '函数调用 · API 编排', secondary: '多工具串行自动调度' },
      { slot: 'cell-d', title: '多模态', en: 'MULTIMODAL', icon: 'multimodal', note: '图文音视融合理解', secondary: '跨模态对齐与检索' },
      { slot: 'cell-e', title: '理解', en: 'COMPREHEND', icon: 'comprehend', note: '自然语言意图解析', secondary: '模糊提问精准定位' },
      { slot: 'cell-f', title: '生成', en: 'GENERATE', icon: 'generate', note: '文本 · 代码 · 图像产出', secondary: '一次成稿可读可运行' }
    ].forEach(drawCell);
  }

  drawR3();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
