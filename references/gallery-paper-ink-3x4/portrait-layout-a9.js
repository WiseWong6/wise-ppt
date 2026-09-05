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
  var PHONE_W = 260;
  var PHONE_H = 540;

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

  function hintLines(x, y, widths, parent) {
    widths.forEach(function (width, index) {
      el('rect', { x: x, y: y + index * 10, width: width, height: index === 0 ? 3 : 2, fill: INK, opacity: index === 0 ? .52 : .25 }, parent);
    });
  }

  function phoneFrame(x, y, step, en, cn, parent) {
    var group = el('g', { 'data-layout-zone': 'a9.screen-' + step, 'data-slot-id': 'screen-' + step }, parent);
    el('rect', { x: x, y: y, width: PHONE_W, height: PHONE_H, rx: 28, fill: PANEL, stroke: INK80, 'stroke-width': 1.2 }, group);
    el('rect', { x: x + 6, y: y + 6, width: PHONE_W - 12, height: PHONE_H - 12, rx: 23, fill: 'none', stroke: INK45, 'stroke-width': .5 }, group);
    line(x + 98, y + 13, x + 142, y + 13, { stroke: INK45, 'stroke-width': 1.4 }, group);
    text('9:41', x + 20, y + 31, { 'font-family': MONO, 'font-size': 10, fill: INK45 }, group);
    line(x + 18, y + 43, x + PHONE_W - 18, y + 43, { stroke: INK45, 'stroke-width': .5 }, group);
    line(x + 92, y + PHONE_H - 15, x + 148, y + PHONE_H - 15, { stroke: INK45, 'stroke-width': 1.2 }, group);
    text('STEP 0' + step + ' — ' + en, x + PHONE_W / 2, y + PHONE_H + 27, Object.assign({ 'data-xp-anchor': 'step', 'font-family': MONO, 'font-size': 12, 'letter-spacing': 1.3, fill: FUNCTIONAL, 'text-anchor': 'middle' },
      step === 1 ? { id: 'a9-focus-step' } : {}), group);
    text(cn, x + PHONE_W / 2, y + PHONE_H + 49, { 'font-size': 15, fill: INK70, 'text-anchor': 'middle' }, group);
    return group;
  }

  function screenAsk(x, y, group) {
    text('AI 助手', x + 20, y + 78, { 'font-size': 17, 'font-weight': 400 }, group);
    text('8 条', x + PHONE_W - 20, y + 78, { 'font-family': MONO, 'font-size': 10, fill: INK45, 'text-anchor': 'end' }, group);
    [0, 1, 2, 3, 4, 5].forEach(function (index) {
      var rowY = y + 122 + index * 57;
      el('circle', { cx: x + 27, cy: rowY, r: 4, fill: index === 2 ? INK80 : 'none', stroke: INK80, 'stroke-width': .9 }, group);
      hintLines(x + 43, rowY - 5, [106 - index * 7, 72 + index * 4], group);
      text('Q' + (index + 1), x + PHONE_W - 21, rowY + 3, { 'font-family': MONO, 'font-size': 9, fill: INK45, 'text-anchor': 'end' }, group);
      line(x + 20, rowY + 23, x + PHONE_W - 20, rowY + 23, { stroke: INK45, 'stroke-width': .4 }, group);
    });
  }

  function screenGenerate(x, y, group) {
    text('生成中', x + 20, y + 78, { 'font-size': 17, 'font-weight': 400 }, group);
    text('GLM-5.2', x + PHONE_W - 20, y + 78, { 'font-family': MONO, 'font-size': 9, fill: INK45, 'text-anchor': 'end' }, group);
    var gx = x + 26;
    var gy = y + 98;
    var gw = PHONE_W - 52;
    var gh = 174;
    el('rect', { x: gx, y: gy, width: gw, height: gh, fill: 'none', stroke: INK45, 'stroke-width': .7 }, group);
    [1, 2, 3].forEach(function (index) { line(gx + gw * index / 4, gy, gx + gw * index / 4, gy + gh, { stroke: INK45, 'stroke-width': .4, 'stroke-dasharray': '3 4' }, group); });
    [1, 2, 3].forEach(function (index) { line(gx, gy + gh * index / 4, gx + gw, gy + gh * index / 4, { stroke: INK45, 'stroke-width': .4, 'stroke-dasharray': '3 4' }, group); });
    el('path', { d: 'M ' + (gx + 23) + ' ' + (gy + 150) + ' V ' + (gy + 91) + ' H ' + (gx + 96) + ' V ' + (gy + 42) + ' H ' + (gx + 157), fill: 'none', stroke: INK80, 'stroke-width': 1.2 }, group);
    el('circle', { cx: gx + 96, cy: gy + 42, r: 7, fill: PANEL, stroke: INK, 'stroke-width': 1.1 }, group);
    el('circle', { cx: gx + 96, cy: gy + 42, r: 2, fill: INK }, group);
    hintLines(x + 26, y + 294, [118, 82], group);
  }

  function screenEdit(x, y, group) {
    el('circle', { cx: x + PHONE_W / 2, cy: y + 105, r: 31, fill: 'none', stroke: INK80, 'stroke-width': 1.1 }, group);
    el('path', { d: 'M ' + (x + 107) + ' ' + (y + 117) + ' L ' + (x + 131) + ' ' + (y + 93) + ' L ' + (x + 138) + ' ' + (y + 100) + ' L ' + (x + 114) + ' ' + (y + 124) + ' Z', fill: 'none', stroke: INK, 'stroke-width': 1.3 }, group);
    text('润色建议', x + PHONE_W / 2, y + 158, { 'font-size': 17, 'font-weight': 400, 'text-anchor': 'middle' }, group);
    text('3 处可优化', x + PHONE_W / 2, y + 180, { 'font-family': MONO, 'font-size': 9, 'letter-spacing': 1.4, fill: INK45, 'text-anchor': 'middle' }, group);
    [['长度', '减 12%'], ['语气', '更正式'], ['错别字', '2 处']].forEach(function (item, index) {
      var rowY = y + 211 + index * 31;
      text(item[0], x + 24, rowY, { 'font-family': MONO, 'font-size': 10, fill: INK45 }, group);
      text(item[1], x + PHONE_W - 24, rowY, { 'font-family': MONO, 'font-size': 11, 'text-anchor': 'end' }, group);
      line(x + 24, rowY + 9, x + PHONE_W - 24, rowY + 9, { stroke: INK45, 'stroke-width': .4 }, group);
    });
    el('rect', { x: x + 24, y: y + 302, width: PHONE_W - 48, height: 28, fill: 'none', stroke: INK80, 'stroke-width': .8 }, group);
    text('采纳全部', x + PHONE_W / 2, y + 321, { 'font-size': 12, 'text-anchor': 'middle' }, group);
  }

  function screenInsights(x, y, group) {
    text('本周用量', x + 20, y + 78, { 'font-size': 17, 'font-weight': 400 }, group);
    text('W32', x + PHONE_W - 20, y + 78, { 'font-family': MONO, 'font-size': 9, fill: INK45, 'text-anchor': 'end' }, group);
    text('1,284', x + 22, y + 130, { 'font-family': MONO, 'font-size': 36, fill: INK80 }, group);
    text('TOKENS · 本周调用', x + 23, y + 151, { 'font-family': MONO, 'font-size': 8, 'letter-spacing': 1, fill: INK45 }, group);
    [['提问次数', .87], ['生成字数', .62], ['采纳率', .91]].forEach(function (item, index) {
      var rowY = y + 220 + index * 76;
      text(item[0], x + 24, rowY, { 'font-size': 11, fill: INK70 }, group);
      text(Math.round(item[1] * 100) + '%', x + PHONE_W - 24, rowY, { 'font-family': MONO, 'font-size': 10, 'text-anchor': 'end' }, group);
      el('rect', { x: x + 24, y: rowY + 9, width: PHONE_W - 48, height: 8, fill: 'none', stroke: INK45, 'stroke-width': .6 }, group);
      el('rect', { x: x + 26, y: rowY + 11, width: (PHONE_W - 52) * item[1], height: 4, fill: INK80 }, group);
    });
  }

  function openArrow(x1, y1, x2, y2, parent) {
    line(x1, y1, x2, y2, { stroke: INK70, 'stroke-width': 1, 'stroke-dasharray': '4 5' }, parent);
    el('path', { d: 'M ' + (x2 - 8) + ' ' + (y2 - 6) + ' L ' + x2 + ' ' + y2 + ' L ' + (x2 - 8) + ' ' + (y2 + 6), fill: 'none', stroke: INK70, 'stroke-width': 1 }, parent);
  }

  function drawA9() {
    text('移动助手的生产闭环', 90, 222, { 'font-family': SERIF, 'font-size': 50, 'font-weight': 500 });
    text('保留输入与结果两张关键屏；中间步骤用一条清楚的方向轴交代。', 90, 274, { 'font-size': 24, fill: INK70 });
    var content = el('g', { transform: 'translate(540 704) scale(1.18) translate(-540 -704)' });
    var screens = [
      { x: 130, y: 410, step: 1, en: 'ASK', cn: '提问', draw: screenAsk },
      { x: 690, y: 410, step: 4, en: 'INSIGHTS', cn: '统计', draw: screenInsights }
    ];
    screens.forEach(function (screen) {
      var group = phoneFrame(screen.x, screen.y, screen.step, screen.en, screen.cn, content);
      screen.draw(screen.x, screen.y, group);
    });
    openArrow(420, 680, 660, 680, content);
    text('02 生成  ·  03 润色', 540, 652, {
      'font-family': MONO, 'font-size': 13, 'letter-spacing': 1.6,
      'text-anchor': 'middle', fill: INK45
    }, content);
  }

  drawA9();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
