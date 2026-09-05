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

  var PAINS = [
    ['收藏夹是坟场', '文章无限期积压', '存了等于没看'],
    ['读完就忘', '没有提炼与归档', '一周后内容全忘光'],
    ['不会用', '不知道能问什么', '拿到 AI 也只查天气']
  ];
  var FIXES = [
    ['AI 阅读系统', '链接自动生成卡片', '收藏即整理'],
    ['知识卡片', '结构化提炼要点', '长文压缩成 5 张卡'],
    ['个人智能体', '基于知识库问答', '随时反查与调用']
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

  function columnHeader(index, en, cn, x, width) {
    var group = el('g', {
      'data-layout-zone': 'k2.section-' + index,
      'data-slot-id': 'section-' + index
    });
    text('0' + index + ' / ' + en, x, 326, {
      'font-family': MONO, 'font-size': 12, 'letter-spacing': 1.5, fill: INK45
    }, group);
    text(cn, x, 370, { 'font-size': 26, 'font-weight': 400 }, group);
    line(x, 394, x + width, 394, { stroke: FUNCTIONAL, 'stroke-width': 2 }, group);
  }

  function listItem(kind, item, index, x) {
    var y = 460 + index * 240;
    var isFix = kind === 'fix';
    var group = el('g', {
      'data-layout-zone': 'k2.' + kind + '-' + (index + 1),
      'data-slot-id': kind + '-' + (index + 1)
    });
    el('circle', {
      cx: x + 12, cy: y + 2, r: 11, fill: PAPER,
      stroke: INK, 'stroke-width': 1
    }, group);
    text(String(index + 1), x + 12, y + 6, {
      'font-family': MONO, 'font-size': 9, 'text-anchor': 'middle',
      fill: INK
    }, group);
    text(item[0], x + 36, y + 9, { 'font-size': 22, 'font-weight': 400 }, group);
    text(item[1], x + 36, y + 46, { 'font-size': 17, fill: INK70 }, group);
    text(item[2], x + 36, y + 77, { 'font-size': 17, fill: INK70 }, group);
  }

  function flowArrow(x1, x2, y, slot) {
    var group = el('g', {
      'data-layout-zone': 'k2.' + slot,
      'data-slot-id': slot,
      'data-flow-direction': 'left-to-right',
      'data-arrow-length': String(x2 - x1)
    });
    line(x1, y, x2, y, { stroke: INK, 'stroke-width': 1.2 }, group);
    el('path', {
      d: 'M ' + (x2 - 8) + ' ' + (y - 6) + ' L ' + x2 + ' ' + y +
        ' L ' + (x2 - 8) + ' ' + (y + 6),
      fill: 'none', stroke: INK, 'stroke-width': 1.2
    }, group);
  }

  function drawOutcome() {
    var group = el('g', { 'data-layout-zone': 'k2.outcome', 'data-slot-id': 'outcome' });
    text('KPI · 01', 855, 490, {
      'font-family': MONO, 'font-size': 10, 'letter-spacing': 1.7,
      'text-anchor': 'middle', fill: INK45
    }, group);
    text('600', 855, 600, {
      'font-family': SERIF, 'font-size': 74, 'text-anchor': 'middle'
    }, group);
    text('份文章已整理', 855, 642, {
      'font-size': 18, 'text-anchor': 'middle', fill: INK70
    }, group);
    line(770, 740, 940, 740, { stroke: INK45, 'stroke-width': .65 }, group);
    text('KPI · 02', 855, 850, {
      id: 'k2-focus-kpi-code', 'font-family': MONO, 'font-size': 10,
      'letter-spacing': 1.7, 'text-anchor': 'middle', fill: INK45
    }, group);
    text('1分钟', 855, 965, {
      id: 'sample-focus', 'font-family': SERIF, 'font-size': 64,
      'text-anchor': 'middle'
    }, group);
    text('每篇速读耗时', 855, 1007, {
      id: 'k2-focus-kpi-label', 'font-size': 18,
      'text-anchor': 'middle', fill: INK70
    }, group);
  }

  function drawK2() {
    text('从阅读痛点到真实成效', 90, 220, {
      'font-family': SERIF, 'font-size': 50, 'font-weight': 500
    });
    text('恢复横版三段关系：问题、解法、结果从左到右一次读完。', 90, 272, {
      'font-size': 23, fill: INK70
    });

    columnHeader(1, 'PAIN POINTS', '阅读痛点', 90, 250);
    columnHeader(2, 'THE FIX', 'AI 解法', 420, 250);
    columnHeader(3, 'OUTCOME', '真实成效', 770, 220);
    PAINS.forEach(function (item, index) { listItem('pain', item, index, 90); });
    FIXES.forEach(function (item, index) { listItem('fix', item, index, 420); });
    flowArrow(358, 402, 700, 'pain-to-fix');
    flowArrow(698, 742, 700, 'fix-to-outcome');
    drawOutcome();
    text('自动归档、知识卡片与个人智能体，让 600 篇收藏重新可用。', 540, 1130, {
      'font-size': 21, 'text-anchor': 'middle', fill: INK70
    });
  }

  drawK2();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
