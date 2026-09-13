(function () {
  'use strict';

  var svg = document.querySelector('.scene');
  var NS = 'http://www.w3.org/2000/svg';
  var INK = 'var(--ink)';
  var INK80 = 'var(--ink-80)';
  var INK70 = 'var(--ink-70)';
  var INK55 = 'var(--ink-55)';
  var INK45 = 'var(--ink-45)';
  var DIVIDER = 'var(--wp-color-divider)';
  var MONO = 'var(--mono)';
  var SANS = 'var(--sans)';
  var SERIF = 'var(--serif)';
  var CELLS = [
    { number: '1.28', unit: 'M', label: '日均调用量', en: 'DAILY CALLS' },
    { number: '94.2', unit: '%', label: '任务完成率', en: 'TASK SUCCESS', focus: true },
    { number: '280', unit: 'ms', label: '平均延迟', en: 'AVG LATENCY' },
    { number: '86,400', unit: '人', label: '覆盖用户数', en: 'ACTIVE USERS' }
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
      x1: x1, y1: y1, x2: x2, y2: y2,
      stroke: INK, 'stroke-width': 1
    }, attrs || {}), parent);
  }

  function drawSectionLabel() {
    var group = el('g', { 'data-layout-zone': 'c6.section', 'data-slot-id': 'impact-ledger-heading' });
    text('AI IMPACT · 2026 H1', 90, 315, {
      'font-family': MONO, 'font-size': 10.5, 'letter-spacing': 1.7, fill: INK55
    }, group);
    line(275, 311, 990, 311, { stroke: INK45, 'stroke-width': .65 }, group);
    text('18 MONTHS AFTER LAUNCH', 990, 315, {
      'font-family': MONO, 'font-size': 9, 'letter-spacing': 1.35,
      'text-anchor': 'end', fill: INK45
    }, group);
  }

  function numberGeometry(item, centerX) {
    var charWidth = 36;
    var unitWidth = item.unit === 'ms' ? 28 : 20;
    var gap = 13;
    var numberWidth = item.number.length * charWidth;
    return {
      numberEnd: centerX + numberWidth / 2 - (unitWidth + gap) / 2,
      unitStart: centerX + numberWidth / 2 - (unitWidth + gap) / 2 + gap
    };
  }

  function drawKpiCell(item, index) {
    var col = index % 2;
    var row = Math.floor(index / 2);
    var x = 90 + col * 450;
    var y = 360 + row * 342;
    var centerX = x + 225;
    var sampleFocus = Boolean(item.focus);
    var geometry = numberGeometry(item, centerX);
    var group = el('g', {
      'data-layout-zone': 'c6.kpi-' + (index + 1),
      'data-slot-id': 'impact-kpi-' + (index + 1),
      'data-repeat-unit': 'impact-kpi',
      'data-kpi-value': item.number + item.unit
    });
    text('No.0' + (index + 1), centerX, y + 46, {
      id: sampleFocus ? 'c6-focus-index' : 'c6-index-' + (index + 1),
      'data-xp-anchor': 'index',
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.7,
      'text-anchor': 'middle', fill: INK45
    }, group);
    text(item.number, geometry.numberEnd, y + 165, {
      id: sampleFocus ? 'sample-focus' : 'c6-kpi-' + index,
      'font-family': MONO, 'font-size': 63, 'font-weight': 400,
      'letter-spacing': .8, 'text-anchor': 'end', fill: INK
    }, group);
    text(item.unit, geometry.unitStart, y + 165, {
      id: sampleFocus ? 'c6-focus-unit' : 'c6-unit-' + (index + 1),
      'data-text-kind': 'label', 'font-size': 18, fill: INK70
    }, group);
    text(item.label, centerX, y + 232, {
      id: sampleFocus ? 'c6-focus-label' : 'c6-label-' + (index + 1),
      'data-text-kind': 'label', 'font-size': 19,
      'text-anchor': 'middle', fill: INK
    }, group);
    text(item.en, centerX, y + 267, {
      id: sampleFocus ? 'c6-focus-en' : 'c6-en-' + (index + 1),
      'font-family': MONO, 'font-size': 9.2, 'letter-spacing': 1.65,
      'text-anchor': 'middle', fill: INK45
    }, group);
  }

  function drawKpiGrid() {
    var group = el('g', {
      'data-layout-zone': 'c6.kpi-grid',
      'data-slot-id': 'four-impact-kpis',
      'data-fixed-quantity': '4'
    });
    line(540, 388, 540, 1018, { id: 'c6-divider', stroke: DIVIDER, 'stroke-width': .7 }, group);
    line(118, 702, 962, 702, { stroke: DIVIDER, 'stroke-width': .7 }, group);
    CELLS.forEach(drawKpiCell);
  }

  function drawImpactChain() {
    var words = ['RETRIEVE', 'REASON', 'GENERATE', 'DELIVER'];
    var group = el('g', {
      'data-layout-zone': 'c6.impact-chain',
      'data-slot-id': 'impact-capability-chain',
      'data-fixed-quantity': '4'
    });
    line(90, 1077, 990, 1077, { stroke: INK45, 'stroke-width': .6 }, group);
    words.forEach(function (word, index) {
      var x = 195 + index * 230;
      text(word, x, 1128, {
        'font-family': MONO, 'font-size': 10, 'letter-spacing': 1.7,
        'text-anchor': 'middle', fill: INK70
      }, group);
      if (index < words.length - 1) {
        line(x + 112, 1115, x + 112, 1132, { stroke: DIVIDER, 'stroke-width': .8 }, group);
      }
    });
  }

  function drawReadingGuide() {
    var group = el('g', {
      'data-layout-zone': 'c6.reading-guide',
      'data-slot-id': 'impact-ledger-reading-guide'
    });
    line(90, 1204, 990, 1204, { stroke: INK45, 'stroke-width': .6 }, group);
    text('CALLS + SUCCESS + LATENCY + USERS', 90, 1235, {
      'font-family': MONO, 'font-size': 9.2, 'letter-spacing': 1.25, fill: INK45
    }, group);
    text('ONE IMPACT LEDGER', 990, 1235, {
      'font-family': MONO, 'font-size': 9.2, 'letter-spacing': 1.2,
      'text-anchor': 'end', fill: INK45
    }, group);
  }

  function drawC6() {
    text('四个指标，才是一份完整的 AI 成效总账', 90, 214, {
      'font-family': SERIF, 'font-size': 44, 'font-weight': 500
    });
    text('上线 18 个月后，四项等权结果共同回答产品是否真正产生价值。', 90, 266, {
      'font-size': 19, fill: INK70
    });
    drawSectionLabel();
    drawKpiGrid();
    drawImpactChain();
    drawReadingGuide();
  }

  drawC6();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
