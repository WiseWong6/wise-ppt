(function () {
  'use strict';

  var svg = document.querySelector('.scene');
  var NS = 'http://www.w3.org/2000/svg';
  var INK = 'var(--ink)';
  var INK80 = 'var(--ink-80)';
  var INK70 = 'var(--ink-70)';
  var INK45 = 'var(--ink-45)';
  var PANEL = 'var(--paper-panel)';
  var SANS = 'var(--sans)';
  var MONO = 'var(--mono)';
  var SERIF = 'var(--serif)';
  var AXIS_X = 540;
  var CARD_W = 390;
  var CARD_H = 144;

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

  function sceneSite(cx, cy, parent) {
    el('rect', { x: cx - 50, y: cy - 29, width: 100, height: 58, fill: 'none', stroke: INK80, 'stroke-width': 1 }, parent);
    [-25, 0, 25].forEach(function (offsetX) { line(cx + offsetX, cy - 29, cx + offsetX, cy + 29, { stroke: INK45, 'stroke-width': .5 }, parent); });
    [[-34, -12], [0, 8], [34, -7]].forEach(function (point) {
      el('circle', { cx: cx + point[0], cy: cy + point[1], r: 3.5, fill: PANEL, stroke: INK80, 'stroke-width': .8 }, parent);
      el('circle', { cx: cx + point[0], cy: cy + point[1], r: 1.3, fill: INK80 }, parent);
    });
  }

  function sceneCurve(cx, cy, parent) {
    line(cx - 52, cy + 29, cx + 52, cy + 29, { stroke: INK70, 'stroke-width': .8 }, parent);
    line(cx - 52, cy - 29, cx - 52, cy + 29, { stroke: INK70, 'stroke-width': .8 }, parent);
    var points = [[-52, 20], [-28, 20], [-28, 6], [-4, 6], [-4, -8], [22, -8], [22, -22], [48, -22]];
    el('path', { d: 'M ' + points.map(function (point) { return (cx + point[0]) + ' ' + (cy + point[1]); }).join(' L '), fill: 'none', stroke: INK80, 'stroke-width': 1.2 }, parent);
  }

  function sceneGantt(cx, cy, parent) {
    var gx = cx - 50;
    el('rect', { x: gx, y: cy - 27, width: 48, height: 12, fill: 'url(#b4-hatch)', stroke: INK80, 'stroke-width': .9 }, parent);
    el('rect', { x: gx + 26, y: cy - 6, width: 56, height: 12, fill: 'none', stroke: INK80, 'stroke-width': .9 }, parent);
    el('rect', { x: gx + 58, y: cy + 15, width: 42, height: 12, fill: 'none', stroke: INK80, 'stroke-width': .9 }, parent);
    line(gx, cy + 33, gx + 100, cy + 33, { stroke: INK45, 'stroke-width': .7 }, parent);
  }

  function sceneForecast(cx, cy, parent) {
    for (var gridIndex = 0; gridIndex <= 4; gridIndex++) {
      line(cx - 48 + gridIndex * 24, cy - 28, cx - 48 + gridIndex * 24, cy + 28, { stroke: INK45, 'stroke-width': .4 }, parent);
      line(cx - 48, cy - 28 + gridIndex * 14, cx + 48, cy - 28 + gridIndex * 14, { stroke: INK45, 'stroke-width': .4 }, parent);
    }
    el('path', { d: 'M ' + (cx - 48) + ' ' + (cy + 20) + ' L ' + (cx - 23) + ' ' + (cy + 7) + ' L ' + cx + ' ' + (cy + 12) + ' L ' + (cx + 16) + ' ' + (cy - 8), fill: 'none', stroke: INK80, 'stroke-width': 1.1 }, parent);
    el('path', { d: 'M ' + (cx + 16) + ' ' + (cy - 8) + ' L ' + (cx + 32) + ' ' + (cy - 16) + ' L ' + (cx + 48) + ' ' + (cy - 27), fill: 'none', stroke: INK70, 'stroke-width': .8, 'stroke-dasharray': '3 4' }, parent);
  }

  function sceneLink(cx, cy, parent) {
    [-32, 32].forEach(function (offsetX) {
      el('rect', { x: cx + offsetX - 18, y: cy - 15, width: 36, height: 30, fill: 'none', stroke: INK80, 'stroke-width': 1 }, parent);
      line(cx + offsetX - 18, cy, cx + offsetX + 18, cy, { stroke: INK45, 'stroke-width': .5 }, parent);
      line(cx + offsetX, cy - 15, cx + offsetX, cy + 15, { stroke: INK45, 'stroke-width': .5 }, parent);
    });
    line(cx - 14, cy, cx + 14, cy, { stroke: INK80, 'stroke-width': 1.2 }, parent);
    el('circle', { cx: cx, cy: cy, r: 2.4, fill: INK80 }, parent);
    el('path', { d: 'M ' + (cx - 28) + ' ' + (cy - 22) + ' A 36 20 0 0 1 ' + (cx + 28) + ' ' + (cy - 22), fill: 'none', stroke: INK45, 'stroke-width': .7, 'stroke-dasharray': '3 4' }, parent);
  }

  function drawEvidence(item, itemIndex) {
    var isLeft = itemIndex % 2 === 0;
    var centerY = 365 + itemIndex * 174;
    var cardX = isLeft ? 70 : 620;
    var connectorStart = isLeft ? cardX + CARD_W : AXIS_X;
    var connectorEnd = isLeft ? AXIS_X : cardX;
    var group = el('g', {
      'data-layout-zone': 'b4.evidence-' + (itemIndex + 1),
      'data-slot-id': 'evidence-' + (itemIndex + 1)
    });

    line(connectorStart, centerY, connectorEnd, centerY, { stroke: INK70, 'stroke-width': .8 }, group);
    el('circle', { cx: AXIS_X, cy: centerY, r: 10, fill: PANEL, stroke: INK80, 'stroke-width': 1.2, 'data-xp-anchor': 'node' }, group);
    el('circle', { cx: AXIS_X, cy: centerY, r: 3.2, fill: INK80 }, group);
    el('rect', { id: item.focus ? 'b4-focus-card' : '', x: cardX, y: centerY - CARD_H / 2, width: CARD_W, height: CARD_H, fill: PANEL, stroke: INK80, 'stroke-width': 1 }, group);
    el('rect', { x: cardX + 5, y: centerY - CARD_H / 2 + 5, width: CARD_W - 10, height: CARD_H - 10, fill: 'none', stroke: INK45, 'stroke-width': .45 }, group);

    text(item.date, cardX + 20, centerY - 42, { id: item.focus ? 'b4-focus-date' : '', 'font-family': MONO, 'font-size': 17, 'font-weight': 400, fill: INK80 }, group);
    text(item.version, cardX + 20, centerY - 17, { 'font-family': MONO, 'font-size': 12, 'letter-spacing': .6, fill: INK45 }, group);
    text(item.name, cardX + 20, centerY + 15, { 'font-size': 19, 'font-weight': 400 }, group);
    text(item.data, cardX + 20, centerY + 45, { 'font-family': MONO, 'font-size': 12, 'letter-spacing': .25, fill: INK70 }, group);
    line(cardX + 248, centerY - 50, cardX + 248, centerY + 50, { stroke: INK45, 'stroke-width': .5 }, group);
    item.scene(cardX + 317, centerY, group);
  }

  function drawB4() {
    text('五次能力跃迁的证据时间轴', 90, 222, { 'font-family': SERIF, 'font-size': 50, 'font-weight': 500 });
    text('五张证据卡沿纵向主轴从 2017 推进到 2024。', 90, 274, { 'font-size': 24, fill: INK70 });
    line(AXIS_X, 326, AXIS_X, 1140, { id: 'b4-timeline-axis', stroke: INK80, 'stroke-width': 1.5, 'data-xp-anchor': 'axis' });
    [
      { date: '2017.06', version: 'V1 — TRANSFORMER', name: 'Transformer 诞生', data: 'WMT EN-DE 28.4 BLEU', scene: sceneSite, focus: false },
      { date: '2020.05', version: 'V3 — GPT-3', name: 'GPT-3 涌现', data: '175B PARAMS · FEW-SHOT', scene: sceneCurve, focus: false },
      { date: '2022.11', version: 'V4 — CHATGPT', name: 'ChatGPT 破圈', data: '5D · 100M USERS', scene: sceneGantt, focus: true },
      { date: '2023.03', version: 'V5 — GPT-4', name: 'GPT-4 多模态', data: 'MMLU 86.4%', scene: sceneForecast, focus: false },
      { date: '2024.12', version: 'V6 — O1', name: '推理模型 o1', data: 'GSM8K 96.4% · AIME 83%', scene: sceneLink, focus: false }
    ].forEach(drawEvidence);
    el('path', { d: 'M 532 1134 L 540 1144 L 548 1134', fill: 'none', stroke: INK80, 'stroke-width': 1.1 });
  }

  drawB4();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
