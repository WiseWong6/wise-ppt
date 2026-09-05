(function () {
  'use strict';

  var svg = document.querySelector('.scene');
  var NS = 'http://www.w3.org/2000/svg';
  var INK = 'var(--ink)';
  var INK80 = 'var(--ink-80)';
  var INK70 = 'var(--ink-70)';
  var INK45 = 'var(--ink-45)';
  var PANEL = 'var(--paper-panel)';
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

  function defineHatch() {
    var defs = el('defs', {});
    var pattern = el('pattern', { id: 'r1-portrait-hatch', width: 9, height: 9, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(35)' }, defs);
    line(0, 0, 0, 9, { stroke: INK80, 'stroke-width': .65, opacity: .16 }, pattern);
  }

  function drawIcon(kind, x, y, parent, stroke) {
    var group = el('g', { transform: 'translate(' + x + ' ' + y + ')', fill: 'none', stroke: stroke, 'stroke-width': 1.3, opacity: .85 }, parent);
    if (kind === 'database') {
      el('ellipse', { cx: 0, cy: -13, rx: 18, ry: 6 }, group);
      el('path', { d: 'M -18 -13 V 13 A 18 6 0 0 0 18 13 V -13 M -18 0 A 18 6 0 0 0 18 0' }, group);
      return;
    }
    if (kind === 'cpu') {
      el('rect', { x: -16, y: -16, width: 32, height: 32, rx: 3 }, group);
      el('rect', { x: -7, y: -7, width: 14, height: 14, rx: 2, opacity: .65 }, group);
      [-10, 10].forEach(function (offset) {
        line(offset, -23, offset, -16, {}, group);
        line(offset, 16, offset, 23, {}, group);
        line(-23, offset, -16, offset, {}, group);
        line(16, offset, 23, offset, {}, group);
      });
      return;
    }
    if (kind === 'tools') {
      el('path', { d: 'M -20 20 L 12 -12 M 7 -17 L 17 -7 M -18 -17 L 18 19 M -22 -13 L -13 -22 L -4 -13 M 13 10 L 22 19 L 13 28', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, group);
      return;
    }
    el('path', { d: 'M 0 -23 Q 10 -15 22 -15 V 0 Q 22 16 0 25 Q -22 16 -22 0 V -15 Q -10 -15 0 -23 Z' }, group);
    el('path', { d: 'M -10 1 L -2 9 L 13 -8', 'stroke-width': 1.7 }, group);
  }

  function drawPillar(item, cardIndex) {
    var col = cardIndex % 2;
    var row = Math.floor(cardIndex / 2);
    var x = 90 + col * 470;
    var y = 336 + row * 370;
    var width = 430;
    var height = 334;
    var group = el('g', { 'data-layout-zone': 'r1.pillar-' + (cardIndex + 1), 'data-slot-id': item.slot });
    /* 横版只让 Data、Tool 两柱承载主题身份色；竖版 2×2 里对应第 1、3 张卡。 */
    var accent = cardIndex === 0 || cardIndex === 2;
    el('rect', Object.assign({ x: x, y: y, width: width, height: height, fill: cardIndex % 2 ? 'url(#r1-portrait-hatch)' : PANEL, stroke: accent ? FUNCTIONAL : INK80, 'stroke-width': 1.1 },
      cardIndex === 0 ? { id: 'r1-focus-frame' } : {}), group);
    el('rect', { x: x + 5, y: y + 5, width: width - 10, height: height - 10, fill: 'none', stroke: INK45, 'stroke-width': .5 }, group);
    text(('0' + (cardIndex + 1)).slice(-2) + ' / ' + item.en, x + 32, y + 42, { 'font-family': MONO, 'font-size': 13, 'letter-spacing': 2, fill: INK45 }, group);
    drawIcon(item.icon, x + width - 58, y + 49, el('g', { 'data-xp-anchor': 'icon' }, group), accent ? FUNCTIONAL : INK80);
    text(item.title, x + 32, y + 104, { 'data-r1-focus-capability': 'true', 'font-size': 31, 'font-weight': 400 }, group);
    line(x + 32, y + 126, x + width - 32, y + 126, { stroke: INK45, 'stroke-width': .7 }, group);
    item.points.forEach(function (point, pointIndex) {
      el('circle', { cx: x + 37, cy: y + 164 + pointIndex * 38, r: 2.4, fill: INK45 }, group);
      text(point, x + 52, y + 170 + pointIndex * 38, { 'font-size': 18, fill: INK70 }, group);
    });
    text(('0' + (cardIndex + 1)).slice(-2), x + width - 34, y + height - 28, { 'font-family': MONO, 'font-size': 42, fill: INK80, 'text-anchor': 'end' }, group);
    text('INDEPENDENT PILLAR', x + 32, y + height - 31, { 'font-family': MONO, 'font-size': 10, 'letter-spacing': 1.4, fill: INK45 }, group);
  }

  function drawR1() {
    defineHatch();
    text('AI 落地的四个独立支柱', 90, 222, { 'font-family': SERIF, 'font-size': 50, 'font-weight': 500 });
    text('四项能力彼此等权；按 2×2 阅读，不存在先后顺序。', 90, 274, { 'font-size': 25, fill: INK70 });

    [
      { slot: 'pillar-a', en: 'DATA', title: '数据', icon: 'database', points: ['可信来源', '统一口径', '持续更新'] },
      { slot: 'pillar-b', en: 'MODEL', title: '模型', icon: 'cpu', points: ['能力边界', '成本速度', '版本治理'] },
      { slot: 'pillar-c', en: 'TOOL', title: '工具', icon: 'tools', points: ['动作闭环', '权限隔离', '失败回退'] },
      { slot: 'pillar-d', en: 'GOVERN', title: '治理', icon: 'shield', points: ['过程留痕', '质量门禁', '责任归属'] }
    ].forEach(drawPillar);
  }

  drawR1();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
