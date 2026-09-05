(function () {
  'use strict';

  var root = document.documentElement;
  var code = String(root.dataset.layoutCode || '').toUpperCase();
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

  function doublePanel(x, y, width, height, attrs, parent) {
    var group = el('g', attrs || {}, parent);
    el('rect', { x: x, y: y, width: width, height: height, fill: PANEL, stroke: INK80, 'stroke-width': 1.2 }, group);
    el('rect', { x: x + 5, y: y + 5, width: width - 10, height: height - 10, fill: 'none', stroke: INK45, 'stroke-width': .6 }, group);
    return group;
  }

  function numberedBadge(value, x, y, parent, numberFill) {
    el('circle', { cx: x, cy: y, r: 22, fill: DEEP, stroke: INK, 'stroke-width': 1 }, parent);
    text(value, x, y + 6, { 'font-family': MONO, 'font-size': 17, 'text-anchor': 'middle', fill: numberFill || INK }, parent);
  }

  function drawE1() {
    text('传统软件与 Agent 的差别', 90, 220, {
      'font-family': SERIF, 'font-size': 50, 'font-weight': 500
    });
    text('保留横版左右对照：同一视线同时看到“中断”与“自愈”。', 90, 274, {
      'font-size': 23, fill: INK70
    });

    var left = el('g', { 'data-layout-zone': 'e1.slot-1', 'data-slot-id': 'classic-software' });
    var right = el('g', { 'data-layout-zone': 'e1.slot-2', 'data-slot-id': 'agentic-system' });
    [left, right].forEach(function (group, index) {
      el('rect', {
        'data-e1-surface': index === 0 ? 'previous' : 'current',
        x: index === 0 ? 90 : 585, y: 382, width: 405, height: 650,
        fill: 'none', stroke: index === 0 ? FUNCTIONAL : INK80, 'stroke-width': 1.1
      }, group);
    });

    text('传统软件', 292, 350, {
      'font-size': 20, 'text-anchor': 'middle', 'font-weight': 400
    }, left);
    text('CLASSIC SOFTWARE', 292, 374, {
      'font-family': MONO, 'font-size': 10, 'letter-spacing': 1.7,
      'text-anchor': 'middle', fill: INK45
    }, left);
    text('Agent', 787, 350, {
      'font-size': 20, 'text-anchor': 'middle', 'font-weight': 400, fill: FUNCTIONAL
    }, right);
    text('AGENTIC', 787, 374, {
      'font-family': MONO, 'font-size': 10, 'letter-spacing': 1.7,
      'text-anchor': 'middle', fill: INK45
    }, right);

    text('错了中断', 292, 485, {
      'font-size': 34, 'letter-spacing': 3, 'text-anchor': 'middle'
    }, left);
    line(376, 454, 398, 476, { stroke: FUNCTIONAL, 'stroke-width': 3, 'stroke-linecap': 'round' }, left);
    line(398, 454, 376, 476, { stroke: FUNCTIONAL, 'stroke-width': 3, 'stroke-linecap': 'round' }, left);
    text('ERRORS HALT THE FLOW', 292, 523, {
      'font-family': MONO, 'font-size': 10, 'letter-spacing': 1.7,
      'text-anchor': 'middle', fill: INK45
    }, left);

    [605, 666, 727].forEach(function (y) {
      for (var index = 0; index < 6; index += 1) {
        line(150 + index * 50, y, 178 + index * 50, y, { stroke: INK45, 'stroke-width': .8 }, left);
      }
    });
    el('path', {
      d: 'M 162 568 V 635 H 262 V 696 H 360 V 758 H 424',
      fill: 'none', stroke: FUNCTIONAL, 'stroke-width': 1.2, 'stroke-dasharray': '5 5'
    }, left);
    el('circle', { cx: 162, cy: 568, r: 3, fill: 'none', stroke: FUNCTIONAL, 'stroke-width': 1.1 }, left);
    el('circle', { cx: 424, cy: 758, r: 2.8, fill: FUNCTIONAL }, left);
    text('42 MIN · NEEDS HUMAN FIX', 292, 830, {
      'font-family': MONO, 'font-size': 11, 'letter-spacing': 1.5,
      'text-anchor': 'middle', fill: INK70
    }, left);
    text('报错即停，等人工介入', 292, 970, {
      'font-size': 18, 'text-anchor': 'middle', fill: INK70
    }, left);

    text('错了继续', 787, 485, {
      id: 'e1-focus-title', 'font-size': 34, 'letter-spacing': 3, 'text-anchor': 'middle'
    }, right);
    el('path', {
      id: 'e1-focus-check', d: 'M 866 467 L 877 478 L 899 451',
      fill: 'none', stroke: FUNCTIONAL, 'stroke-width': 3,
      'stroke-linecap': 'round', 'stroke-linejoin': 'round'
    }, right);
    text('SELF-HEALING RELAY', 787, 523, {
      'font-family': MONO, 'font-size': 10, 'letter-spacing': 1.7,
      'text-anchor': 'middle', fill: INK45
    }, right);

    el('rect', { x: 648, y: 653, width: 58, height: 38, fill: 'none', stroke: INK80, 'stroke-width': 1.1 }, right);
    line(648, 672, 706, 672, { stroke: INK45, 'stroke-width': .7 }, right);
    el('circle', { cx: 677, cy: 721, r: 17, fill: 'none', stroke: INK80, 'stroke-width': 1.1 }, right);
    el('circle', { cx: 677, cy: 721, r: 2.6, fill: FUNCTIONAL }, right);
    line(718, 721, 856, 721, { stroke: FUNCTIONAL, 'stroke-width': 1.3 }, right);
    el('path', { d: 'M 844 714 L 856 721 L 844 728', fill: 'none', stroke: FUNCTIONAL, 'stroke-width': 1.3 }, right);
    el('circle', { cx: 892, cy: 721, r: 17, fill: 'none', stroke: INK80, 'stroke-width': 1.1 }, right);
    el('circle', { cx: 892, cy: 721, r: 11, fill: 'none', stroke: INK45, 'stroke-width': .7 }, right);
    el('circle', { cx: 892, cy: 721, r: 2.8, fill: FUNCTIONAL }, right);
    text('3 MIN · SELF-RECOVERY', 787, 830, {
      'font-family': MONO, 'font-size': 11, 'letter-spacing': 1.5,
      'text-anchor': 'middle', fill: INK70
    }, right);
    text('Agent 自己重试、自己修复', 787, 970, {
      'font-size': 18, 'text-anchor': 'middle', fill: INK70
    }, right);

    line(507, 650, 522, 650, { stroke: INK45, 'stroke-dasharray': '3 5' });
    line(558, 650, 573, 650, { stroke: INK45, 'stroke-dasharray': '3 5' });
    el('circle', { cx: 540, cy: 650, r: 25, fill: 'var(--paper)', stroke: FUNCTIONAL, 'stroke-width': 1.1 });
    text('VS', 540, 657, { 'data-xp-anchor': 'vs',
      'font-family': MONO, 'font-size': 15, 'letter-spacing': 2, 'text-anchor': 'middle'
    });
  }

  function drawT1() {
    text('五步纵向编排链', 90, 236, { 'font-family': SERIF, 'font-size': 50, 'font-weight': 500 });
    text('3:4 把横向流水线改成从上到下的单手阅读。', 90, 286, { 'font-size': 25, fill: INK70 });
    var labels = ['读懂材料', '判断关系', '选择骨架', '填入内容', '检查交付'];
    var notes = ['提取唯一主张', '决定这一页怎么读', '只选已登记版式', '控制文字与证据容量', '检查边界与来源'];
    labels.forEach(function (label, index) {
      var y = 310 + index * 190;
      numberedBadge(String(index + 1).padStart(2, '0'), 142, y, null, FUNCTIONAL);
      if (index < labels.length - 1) line(142, y + 25, 142, y + 135, { stroke: INK45, 'stroke-dasharray': '3 6' });
      el('g', { 'data-layout-zone': 't1.step-' + (index + 1) });
      text(label, 250, y - 5, Object.assign({ 'data-xp-anchor': 'step', 'font-size': 36, 'font-weight': 400 },
        index === 0 ? { id: 't1-focus-analyse' } : {}));
      text(notes[index], 250, y + 39, { 'font-size': 24, fill: INK70 });
      text(index === 4 ? 'DELIVER' : 'NEXT', 930, y + 7, { 'font-family': MONO, 'font-size': 15, 'letter-spacing': 2, fill: INK45, 'text-anchor': 'end' });
    });
  }

  function miniLayout(kind, x, y, parent) {
    var w = 158, h = 96;
    el('rect', { x: x, y: y, width: w, height: h, fill: 'none', stroke: INK45, 'stroke-width': .8 }, parent);
    if (kind === 'compare') line(x, y + h / 2, x + w, y + h / 2, { stroke: INK }, parent);
    if (kind === 'flow') {
      line(x + 22, y + h / 2, x + w - 22, y + h / 2, { stroke: INK45 }, parent);
      [0, 1, 2].forEach(function (i) { el('circle', { cx: x + 30 + i * 49, cy: y + h / 2, r: 9, fill: DEEP, stroke: INK, 'stroke-width': .8 }, parent); });
    }
    if (kind === 'radial') {
      el('circle', { cx: x + w / 2, cy: y + h / 2, r: 14, fill: DEEP, stroke: INK, 'stroke-width': .8 }, parent);
      [[34, 22], [124, 22], [79, 78]].forEach(function (point) { line(x + 79, y + 48, x + point[0], y + point[1], { stroke: INK45 }, parent); el('circle', { cx: x + point[0], cy: y + point[1], r: 6, fill: INK }, parent); });
    }
    if (kind === 'concentric') [34, 23, 12].forEach(function (radius, index) {
      el('circle', { cx: x + w / 2, cy: y + h / 2, r: radius, fill: index === 0 ? DEEP : 'none', stroke: INK, 'stroke-width': .8 }, parent);
    });
    if (kind === 'stack') [0, 1, 2].forEach(function (i) { el('rect', { x: x + 18, y: y + 13 + i * 25, width: 122, height: 18, fill: i === 1 ? DEEP : 'none', stroke: INK45, 'stroke-width': .8 }, parent); });
    if (kind === 'matrix') { line(x + w / 2, y + 8, x + w / 2, y + h - 8, { stroke: INK }, parent); line(x + 12, y + h / 2, x + w - 12, y + h / 2, { stroke: INK }, parent); }
    if (kind === 'data') [0, 1, 2, 3].forEach(function (i) { el('rect', { x: x + 24 + i * 29, y: y + 72 - i * 12, width: 17, height: 12 + i * 12, fill: 'none', stroke: INK, 'stroke-width': .8 }, parent); });
  }

  function drawT2() {
    var rule = doublePanel(90, 170, 900, 300, { 'data-layout-zone': 't2.rule' });
    text('先看内容关系', 130, 250, { 'font-family': SERIF, 'font-size': 48, 'font-weight': 500 }, rule);
    text('再选页面怎么拆，最后才决定区块里画什么。', 130, 306, { 'font-size': 25, fill: INK70 }, rule);
    ['关系', '重心', '顺序'].forEach(function (label, index) {
      numberedBadge(String(index + 1).padStart(2, '0'), 165 + index * 275, 390, rule);
      text(label, 202 + index * 275, 398, { 'font-size': 24 }, rule);
    });
    var samples = [
      ['对比', '上下双面板', 'compare'], ['流程', '纵向步骤链', 'flow'],
      ['关系', '中心放射', 'radial'], ['层级', '分层架构', 'stack'],
      ['矩阵', '二维交叉', 'matrix'], ['数据', '指标证据', 'data']
    ];
    samples.forEach(function (item, index) {
      var col = index % 2, row = Math.floor(index / 2);
      var x = 90 + col * 465, y = 520 + row * 220;
      var card = doublePanel(x, y, 435, 190, {
        'data-layout-zone': 't2.sample-' + (index + 1),
        'data-repeat-unit': 'layout-sample', 'data-bind-index': index
      });
      text(String(index + 1).padStart(2, '0'), x + 22, y + 34, { 'font-family': MONO, 'font-size': 16, 'letter-spacing': 2, fill: INK45 }, card);
      text(item[0], x + 22, y + 82, { 'font-size': 28, 'font-weight': 400 }, card);
      text(item[1], x + 22, y + 119, { 'font-size': 18, fill: INK70 }, card);
      line(x + 220, y + 18, x + 220, y + 172, { stroke: INK45, 'stroke-width': .7 }, card);
      miniLayout(item[2], x + 248, y + 47, el('g', {
        'data-xp-anchor': 'preview', 'data-t2-preview': 'true'
      }, card));
    });
  }

  function drawT3() {
    /* 与 Desktop wise-video 的 3:4 真实页同构：上方判断，下方 2×3 组件样本。 */
    var decision = el('g', { id: 't3-decision', 'data-layout-zone': 't3.decision' });
    el('rect', {
      x: 90, y: 172, width: 900, height: 320,
      fill: 'none', stroke: INK80, 'stroke-width': 1,
      'data-t3-decision-surface': 'true'
    }, decision);
    text('内容决定是否调用', 130, 262, { 'font-family': SERIF, 'font-size': 44, 'font-weight': 500 }, decision);
    text('组件不是设计替身，', 130, 314, { 'font-size': 22, fill: INK70 }, decision);
    text('版式决定阅读结构。', 130, 350, { 'font-size': 22, fill: INK70 }, decision);
    line(500, 202, 500, 462, { stroke: INK45, 'stroke-width': .85 }, decision);
    ['沉淀成熟表达', '按内容按需调用', '让生成更加稳定'].forEach(function (label, index) {
      var y = 236 + index * 88;
      numberedBadge(String(index + 1).padStart(2, '0'), 560, y, decision);
      text(label, 598, y + 8, { 'data-xp-anchor': 'principle', 'font-size': 22 }, decision);
    });
    line(540, 504, 540, 558, { stroke: INK, 'stroke-width': 1 });
    el('path', { d: 'M 532 548 L 540 558 L 548 548', fill: 'none', stroke: INK, 'stroke-width': 1 });
    text('成熟表达沉淀为单元', 90, 598, {
      id: 't3-focus', 'font-family': SERIF, 'font-size': 34, 'font-weight': 500
    });
    text('按内容按需调用', 90, 636, { 'font-size': 20, fill: INK70 });
    var cards = [
      ['流程', '顺序表达', 'flow'], ['同心圆', '嵌套表达', 'concentric'], ['架构', '层级表达', 'stack'],
      ['统计卡片', '指标表达', 'data'], ['数据图表', '证据表达', 'data'], ['关系矩阵', '分类表达', 'matrix']
    ];
    cards.forEach(function (item, index) {
      var col = index % 2, row = Math.floor(index / 2);
      var x = 90 + col * 465, y = 668 + row * 190;
      var card = el('g', { 'data-layout-zone': 't3.component-' + (index + 1) });
      el('rect', { x: x, y: y, width: 435, height: 166, fill: 'none', stroke: INK80, 'stroke-width': .9 }, card);
      text(String(index + 1).padStart(2, '0'), x + 20, y + 28, { 'font-family': MONO, 'font-size': 12, fill: INK45 }, card);
      text(item[0], x + 22, y + 78, Object.assign({ 'font-size': 27, 'font-weight': 400 },
        index === 3 ? { 'data-t3-metric': 'a' } : index === 4 ? { 'data-t3-metric': 'b' } : {}), card);
      text(item[1], x + 22, y + 110, Object.assign({ 'font-size': 17, fill: INK70 },
        index === 3 ? { 'data-t3-metric': 'a' } : index === 4 ? { 'data-t3-metric': 'b' } : {}), card);
      line(x + 184, y + 18, x + 184, y + 148, { stroke: INK45, 'stroke-width': .65 }, card);
      miniLayout(item[2], x + 226, y + 35, card);
    });
  }

  var renderers = { E1: drawE1, T1: drawT1, T2: drawT2, T3: drawT3 };
  if (!renderers[code]) throw new Error('未登记的 3:4 Catalog 版式：' + code);
  renderers[code]();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
