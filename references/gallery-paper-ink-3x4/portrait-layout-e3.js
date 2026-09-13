(function () {
  'use strict';

  var svg = document.querySelector('.scene');
  var NS = 'http://www.w3.org/2000/svg';
  var INK = 'var(--ink)';
  var INK80 = 'var(--ink-80)';
  var INK70 = 'var(--ink-70)';
  var INK45 = 'var(--ink-45)';
  var PANEL = 'var(--paper-panel)';
  var PAPER = 'var(--paper)';
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

  function issueIcon(kind, cx, cy, group) {
    if (kind === 'gate') {
      el('rect', { x: cx - 31, y: cy - 32, width: 10, height: 64, fill: 'none', stroke: INK80, 'stroke-width': 1.2 }, group);
      el('rect', { x: cx + 21, y: cy - 32, width: 10, height: 64, fill: 'none', stroke: INK80, 'stroke-width': 1.2 }, group);
      [-72, -49, -17].forEach(function (offset, index) {
        el('rect', { x: cx + offset, y: cy - 16 + index * 12, width: 16, height: 16, fill: index === 2 ? PAPER : 'none', stroke: INK80, 'stroke-width': 1 }, group);
      });
    } else if (kind === 'loop') {
      el('path', { d: 'M ' + (cx - 42) + ' ' + (cy + 20) + ' C ' + (cx - 60) + ' ' + (cy - 34) + ', ' + (cx + 50) + ' ' + (cy - 45) + ', ' + (cx + 45) + ' ' + (cy + 7), fill: 'none', stroke: INK80, 'stroke-width': 1.4 }, group);
      el('path', { d: 'M ' + (cx + 45) + ' ' + (cy + 7) + ' l -14 -12 M ' + (cx + 45) + ' ' + (cy + 7) + ' l -17 7', fill: 'none', stroke: INK80, 'stroke-width': 1.4 }, group);
      el('circle', { cx: cx - 42, cy: cy + 20, r: 5, fill: INK }, group);
      text('原地打转', cx, cy + 42, { 'font-size': 12, 'text-anchor': 'middle', fill: INK45 }, group);
    } else if (kind === 'context') {
      el('path', { d: 'M ' + (cx - 48) + ' ' + (cy - 29) + ' H ' + (cx + 18) + ' L ' + (cx + 47) + ' ' + cy + ' L ' + (cx + 18) + ' ' + (cy + 29) + ' H ' + (cx - 48) + ' Z', fill: 'none', stroke: INK80, 'stroke-width': 1.2 }, group);
      el('circle', { cx: cx + 25, cy: cy, r: 4, fill: 'none', stroke: INK80, 'stroke-width': 1 }, group);
      line(cx - 26, cy - 12, cx - 4, cy + 12, { stroke: INK, 'stroke-width': 1.6 }, group);
      line(cx - 4, cy - 12, cx - 26, cy + 12, { stroke: INK, 'stroke-width': 1.6 }, group);
    } else {
      [-40, 40].forEach(function (offset) {
        el('rect', { x: cx + offset - 22, y: cy - 13, width: 44, height: 31, fill: 'none', stroke: INK80, 'stroke-width': 1.2 }, group);
        el('path', { d: 'M ' + (cx + offset - 26) + ' ' + (cy - 13) + ' L ' + (cx + offset) + ' ' + (cy - 32) + ' L ' + (cx + offset + 26) + ' ' + (cy - 13), fill: 'none', stroke: INK80, 'stroke-width': 1.2 }, group);
      });
      line(cx - 16, cy + 2, cx + 16, cy + 2, { stroke: INK45, 'stroke-dasharray': '3 5' }, group);
      line(cx - 7, cy - 6, cx + 7, cy + 9, { stroke: INK, 'stroke-width': 1.4 }, group);
      line(cx + 7, cy - 6, cx - 7, cy + 9, { stroke: INK, 'stroke-width': 1.4 }, group);
    }
  }

  function solutionIcon(kind, cx, cy, group) {
    if (kind === 'retry') {
      el('circle', { cx: cx, cy: cy, r: 28, fill: 'none', stroke: FUNCTIONAL, 'stroke-width': 1.2 }, group);
      el('circle', { cx: cx, cy: cy, r: 14, fill: 'none', stroke: INK45, 'stroke-width': .8 }, group);
      for (var tooth = 0; tooth < 8; tooth++) {
        var angle = tooth * Math.PI / 4;
        line(cx + Math.cos(angle) * 29, cy + Math.sin(angle) * 29, cx + Math.cos(angle) * 37, cy + Math.sin(angle) * 37, { stroke: FUNCTIONAL, 'stroke-width': 1.2 }, group);
      }
      el('circle', { cx: cx, cy: cy, r: 2.5, fill: FUNCTIONAL }, group);
    } else if (kind === 'cap') {
      [[-33, -20, 50], [-5, 0, 64], [24, 20, 42]].forEach(function (bar) {
        el('rect', { x: cx + bar[0], y: cy + bar[1], width: bar[2], height: 11, fill: 'none', stroke: FUNCTIONAL, 'stroke-width': 1.1 }, group);
      });
      line(cx - 43, cy + 39, cx + 54, cy + 39, { stroke: INK45, 'stroke-width': .8 }, group);
    } else if (kind === 'compress') {
      el('rect', { x: cx - 13, y: cy - 18, width: 26, height: 36, fill: PAPER, stroke: FUNCTIONAL, 'stroke-width': 1.1 }, group);
      line(cx - 7, cy - 7, cx + 7, cy - 7, { stroke: INK45, 'stroke-width': .7 }, group);
      el('path', { d: 'M ' + (cx - 34) + ' ' + cy + ' A 34 34 0 1 1 ' + (cx + 24) + ' ' + (cy - 24), fill: 'none', stroke: FUNCTIONAL, 'stroke-width': 1.2 }, group);
      el('path', { d: 'M ' + (cx + 24) + ' ' + (cy - 24) + ' l -4 -12 M ' + (cx + 24) + ' ' + (cy - 24) + ' l -12 -4', fill: 'none', stroke: FUNCTIONAL, 'stroke-width': 1.2 }, group);
    } else {
      [-34, 34].forEach(function (offset) {
        el('circle', { cx: cx + offset, cy: cy, r: 11, fill: 'none', stroke: FUNCTIONAL, 'stroke-width': 1.2 }, group);
        el('circle', { cx: cx + offset, cy: cy, r: 3, fill: FUNCTIONAL }, group);
      });
      line(cx - 22, cy, cx + 22, cy, { stroke: FUNCTIONAL, 'stroke-width': 1.3 }, group);
      el('circle', { cx: cx, cy: cy, r: 2.5, fill: INK80 }, group);
      el('path', { d: 'M ' + (cx - 30) + ' ' + (cy - 17) + ' Q ' + cx + ' ' + (cy - 43) + ' ' + (cx + 30) + ' ' + (cy - 17), fill: 'none', stroke: INK45, 'stroke-width': .8, 'stroke-dasharray': '3 5' }, group);
    }
  }

  function drawPair(item, pairIndex) {
    var y = 388 + pairIndex * 198;
    var group = el('g', { 'data-layout-zone': 'e3.pair-' + (pairIndex + 1), 'data-slot-id': 'pair-' + (pairIndex + 1) });
    line(90, y + 166, 480, y + 166, { stroke: INK45, 'stroke-width': .65 }, group);
    line(600, y + 166, 990, y + 166, { stroke: INK45, 'stroke-width': .65 }, group);

    text(('0' + (pairIndex + 1)).slice(-2), 540, y + 28, {
      'font-family': MONO, 'font-size': 11, 'letter-spacing': 1.4,
      'text-anchor': 'middle', fill: INK45
    }, group);
    line(493, y + 82, 587, y + 82, { stroke: FUNCTIONAL, 'stroke-width': 1.15 }, group);
    el('path', {
      d: 'M 578 ' + (y + 76) + ' L 587 ' + (y + 82) + ' L 578 ' + (y + 88),
      fill: 'none', stroke: FUNCTIONAL, 'stroke-width': 1.15
    }, group);

    issueIcon(item.issueIcon, 175, y + 82, group);
    text(item.issueCode, 245, y + 34, {
      'font-family': MONO, 'font-size': 10.5, 'letter-spacing': 1.15, fill: INK45
    }, group);
    text(item.issueTitle, 245, y + 78, { 'font-size': 22, 'font-weight': 400 }, group);
    text(item.issueNote, 245, y + 108, { 'font-size': 14, fill: INK70 }, group);

    solutionIcon(item.solutionIcon, 690, y + 82, group);
    text(item.solutionCode, 760, y + 34, {
      'font-family': MONO, 'font-size': 10.5, 'letter-spacing': 1.15, fill: FUNCTIONAL
    }, group);
    text(item.solutionTitle, 760, y + 78, {
      'font-size': item.compact ? 17.5 : 20, 'font-weight': 400
    }, group);
    text(item.solutionNote, 760, y + 108, { 'font-size': 13.5, fill: INK70 }, group);
  }

  function drawE3() {
    text('四个 Agent 坑，逐项落到治理机制', 90, 220, { 'font-family': SERIF, 'font-size': 50, 'font-weight': 500 });
    text('左列 WHY，右列 HOW；每一行只表达一组因果对位。', 90, 272, { 'font-size': 24, fill: INK70 });
    text('WHY · 问题', 90, 338, { id: 'e3-focus-axis', 'data-xp-anchor': 'axis',
      'font-family': MONO, 'font-size': 12, 'letter-spacing': 2, fill: INK45
    });
    text('HOW · 对策', 600, 338, { 'data-xp-anchor': 'axis',
      'font-family': MONO, 'font-size': 12, 'letter-spacing': 2, fill: INK45
    });

    [
      { issueCode: 'RATE-LIMIT', issueTitle: '限流中断', issueNote: '峰值请求挤过窄门', issueIcon: 'gate', solutionCode: 'RETRY', solutionTitle: '重试退避 + 熔断', solutionNote: '把瞬时失败变成可控恢复', solutionIcon: 'retry' },
      { issueCode: 'LOOP STUCK', issueTitle: '思考死循环', issueNote: '执行路径原地打转', issueIcon: 'loop', solutionCode: 'STEP CAP', solutionTitle: '步骤上限 + 早停', solutionNote: '限定迭代并及时退出', solutionIcon: 'cap' },
      { issueCode: 'CTX OVERFLOW', issueTitle: '上下文窗口乱', issueNote: '信息堆叠导致错拣漏拣', issueIcon: 'context', solutionCode: 'CTX COMPRESS', solutionTitle: '上下文压缩 + 交接文档', solutionNote: '收拢状态并留下交接依据', solutionIcon: 'compress', compact: true },
      { issueCode: 'UNTRACEABLE', issueTitle: '不可追踪', issueNote: '跨环节记录彼此割裂', issueIcon: 'trace', solutionCode: 'TRACE', solutionTitle: '全链 Trace + 日志', solutionNote: '连接每个落点与执行证据', solutionIcon: 'trace' }
    ].forEach(drawPair);
  }

  drawE3();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
