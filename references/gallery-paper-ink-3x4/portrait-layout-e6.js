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

  function drawBadge(kind, cx, cy, group) {
    el('circle', { id: kind === 'after' ? 'e6-focus-badge' : '', cx: cx, cy: cy, r: 15, fill: PAPER, stroke: INK80, 'stroke-width': 1.2 }, group);
    if (kind === 'after') {
      el('path', { id: 'e6-focus-check', d: 'M ' + (cx - 7) + ' ' + cy + ' L ' + (cx - 2) + ' ' + (cy + 6) + ' L ' + (cx + 8) + ' ' + (cy - 7), fill: 'none', stroke: INK, 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, group);
    } else {
      line(cx - 6, cy - 6, cx + 6, cy + 6, { stroke: INK, 'stroke-width': 2.6, 'stroke-linecap': 'round' }, group);
      line(cx + 6, cy - 6, cx - 6, cy + 6, { stroke: INK, 'stroke-width': 2.6, 'stroke-linecap': 'round' }, group);
    }
  }

  function drawDocumentMark(kind, x, y, width, height, group) {
    var left = x + 15;
    var top = y + 12;
    var innerWidth = width - 30;
    var innerHeight = height - 42;
    if (kind === 'lines' || kind === 'head') {
      if (kind === 'head') line(left, top + 2, left + innerWidth * .68, top + 2, { stroke: INK80, 'stroke-width': 1.2 }, group);
      [12, 24, 36].forEach(function (offset) { line(left, top + offset, left + innerWidth, top + offset, { stroke: INK45, 'stroke-width': .7 }, group); });
    } else if (kind === 'fold') {
      el('path', { d: 'M ' + left + ' ' + top + ' H ' + (left + innerWidth - 13) + ' L ' + (left + innerWidth) + ' ' + (top + 13) + ' V ' + (top + innerHeight) + ' H ' + left + ' Z', fill: 'none', stroke: INK80, 'stroke-width': 1 }, group);
      [22, 33].forEach(function (offset) { line(left + 8, top + offset, left + innerWidth - 8, top + offset, { stroke: INK45, 'stroke-width': .7 }, group); });
    } else if (kind === 'grid') {
      el('rect', { x: left, y: top, width: innerWidth, height: innerHeight, fill: 'none', stroke: INK80, 'stroke-width': 1 }, group);
      line(left, top + 14, left + innerWidth, top + 14, { stroke: INK45, 'stroke-width': .7 }, group);
      line(left + innerWidth / 2, top, left + innerWidth / 2, top + innerHeight, { stroke: INK45, 'stroke-width': .7 }, group);
    } else if (kind === 'pic') {
      el('rect', { x: left, y: top, width: innerWidth, height: 28, fill: 'none', stroke: INK80, 'stroke-width': 1 }, group);
      el('circle', { cx: left + 10, cy: top + 9, r: 3, fill: 'none', stroke: INK70, 'stroke-width': .7 }, group);
      el('path', { d: 'M ' + left + ' ' + (top + 25) + ' L ' + (left + 22) + ' ' + (top + 12) + ' L ' + (left + 36) + ' ' + (top + 24) + ' L ' + (left + 51) + ' ' + (top + 14), fill: 'none', stroke: INK70, 'stroke-width': .7 }, group);
      line(left, top + 36, left + innerWidth, top + 36, { stroke: INK45, 'stroke-width': .7 }, group);
    } else {
      [0, 15, 30].forEach(function (offset) {
        el('rect', { x: left, y: top + offset, width: 8, height: 8, fill: 'none', stroke: INK70, 'stroke-width': .8 }, group);
        line(left + 15, top + offset + 4, left + innerWidth, top + offset + 4, { stroke: INK45, 'stroke-width': .7 }, group);
      });
    }
  }

  function drawDocumentCard(item, documentIndex, parent) {
    var cx = 155 + documentIndex * 154;
    var x = cx - 55;
    var y = 370;
    var width = 120;
    var height = 122;
    var group = el('g', { 'data-layout-zone': 'e6.before-document-' + (documentIndex + 1), 'data-slot-id': 'document-' + (documentIndex + 1) }, parent);
    el('rect', { x: x, y: y, width: width, height: height, fill: 'none', stroke: INK80, 'stroke-width': 1 }, group);
    drawDocumentMark(item.mark, x, y, width, height, group);
    text(item.label, cx, y + height + 32, { 'font-size': 16, 'text-anchor': 'middle', fill: INK70 }, group);
  }

  function drawNotes(notes, x, y, gap, prefix, parent) {
    notes.forEach(function (note, noteIndex) {
      var group = el('g', { 'data-layout-zone': prefix + '-note-' + (noteIndex + 1) }, parent);
      el('rect', { x: x, y: y + noteIndex * gap - 8, width: 5, height: 5, fill: INK70 }, group);
      text(note, x + 18, y + noteIndex * gap, { 'font-size': 14, fill: INK70 }, group);
    });
  }

  function pipelineIcon(kind, cx, cy, group) {
    if (kind === 'ingest') {
      [-18, 0, 18].forEach(function (offset) { line(cx + offset, cy - 18, cx, cy - 4, { stroke: INK70, 'stroke-width': 1 }, group); });
      el('path', { d: 'M ' + (cx - 15) + ' ' + (cy - 4) + ' H ' + (cx + 15) + ' L ' + (cx + 6) + ' ' + (cy + 13) + ' H ' + (cx - 6) + ' Z', fill: 'none', stroke: INK80, 'stroke-width': 1.2 }, group);
    } else if (kind === 'parse') {
      el('rect', { x: cx - 11, y: cy - 17, width: 22, height: 32, fill: 'none', stroke: INK80, 'stroke-width': 1.1 }, group);
      [-7, 1, 9].forEach(function (offset) { line(cx - 6, cy + offset, cx + 6, cy + offset, { stroke: INK45, 'stroke-width': .7 }, group); });
      el('path', { d: 'M ' + (cx - 18) + ' ' + (cy - 13) + ' H ' + (cx - 22) + ' V ' + (cy + 13) + ' H ' + (cx - 18) + ' M ' + (cx + 18) + ' ' + (cy - 13) + ' H ' + (cx + 22) + ' V ' + (cy + 13) + ' H ' + (cx + 18), fill: 'none', stroke: INK70, 'stroke-width': .9 }, group);
    } else if (kind === 'slice') {
      el('rect', { x: cx - 20, y: cy - 14, width: 40, height: 28, fill: 'none', stroke: INK80, 'stroke-width': 1.1 }, group);
      [-7, 7].forEach(function (offset) { line(cx + offset, cy - 14, cx + offset, cy + 14, { stroke: INK70, 'stroke-width': .7, 'stroke-dasharray': '3 3' }, group); });
    } else if (kind === 'index') {
      el('rect', { x: cx - 16, y: cy - 14, width: 32, height: 22, fill: 'none', stroke: INK80, 'stroke-width': 1.1 }, group);
      [-8, 8].forEach(function (offset) { el('circle', { cx: cx + offset, cy: cy + 17, r: 3, fill: 'none', stroke: INK70, 'stroke-width': .8 }, group); });
      line(cx - 5, cy + 17, cx + 5, cy + 17, { stroke: INK70, 'stroke-width': .8 }, group);
    } else if (kind === 'retrieve') {
      el('rect', { x: cx - 19, y: cy - 16, width: 24, height: 29, fill: 'none', stroke: INK80, 'stroke-width': 1.1 }, group);
      el('circle', { cx: cx + 8, cy: cy + 5, r: 10, fill: PAPER, stroke: INK80, 'stroke-width': 1.2 }, group);
      line(cx + 15, cy + 12, cx + 22, cy + 19, { stroke: INK80, 'stroke-width': 1.4 }, group);
    } else {
      el('circle', { cx: cx, cy: cy - 5, r: 5, fill: 'none', stroke: INK80, 'stroke-width': 1.1 }, group);
      [-17, 0, 17].forEach(function (offset) {
        line(cx, cy, cx + offset, cy + 16, { stroke: INK70, 'stroke-width': .8 }, group);
        el('rect', { x: cx + offset - 4, y: cy + 16, width: 8, height: 7, fill: 'none', stroke: INK80, 'stroke-width': .9 }, group);
      });
    }
  }

  function drawPipelineStep(item, stepIndex, parent) {
    var cx = 155 + stepIndex * 154;
    var cy = 900;
    var group = el('g', { 'data-layout-zone': 'e6.after-step-' + (stepIndex + 1), 'data-slot-id': 'step-' + (stepIndex + 1) }, parent);
    text(('0' + (stepIndex + 1)).slice(-2), cx, cy - 62, {
      'font-family': MONO, 'font-size': 11, 'letter-spacing': 1.2,
      'text-anchor': 'middle', fill: INK45
    }, group);
    el('circle', { cx: cx, cy: cy, r: 40, fill: 'none', stroke: INK80, 'stroke-width': 1 }, group);
    pipelineIcon(item.icon, cx, cy, group);
    text(item.label, cx, cy + 72, { 'font-size': 18, 'font-weight': 400, 'text-anchor': 'middle' }, group);
    text(item.english, cx, cy + 100, {
      'font-family': MONO, 'font-size': 10.5, 'letter-spacing': .9,
      'text-anchor': 'middle', fill: INK45
    }, group);
  }

  function drawFlowArrows(parent) {
    for (var index = 0; index < 5; index += 1) {
      var from = 155 + index * 154 + 43;
      var to = 155 + (index + 1) * 154 - 43;
      line(from, 900, to, 900, {
        stroke: INK80, 'stroke-width': 1.1, 'stroke-dasharray': '3 4'
      }, parent);
      el('path', {
        d: 'M ' + (to - 7) + ' 895 L ' + to + ' 900 L ' + (to - 7) + ' 905',
        fill: 'none', stroke: INK80, 'stroke-width': 1.1
      }, parent);
    }
  }

  function drawAlignmentGuides(parent) {
    for (var index = 0; index < 6; index += 1) {
      var x = 155 + index * 154;
      line(x, 322, x, 1110, {
        stroke: INK45, 'stroke-width': .45, opacity: .24, 'stroke-dasharray': '2 8'
      }, parent);
    }
  }

  function drawBandFrame(y, height, kind, titleValue, tagValue) {
    var group = el('g', { 'data-layout-zone': 'e6.' + kind, 'data-slot-id': kind });
    line(90, y, 990, y, { stroke: INK80, 'stroke-width': 1 }, group);
    line(90, y + height, 990, y + height, { stroke: INK45, 'stroke-width': .65 }, group);
    drawBadge(kind, 110, y + 38, group);
    text(titleValue, 140, y + 46, { id: kind === 'after' ? 'e6-focus-title' : '', 'font-size': 26, 'font-weight': 400 }, group);
    text(tagValue, 990, y + 43, { 'font-family': MONO, 'font-size': 10.5, 'letter-spacing': 1.8, 'text-anchor': 'end', fill: INK45 }, group);
    return group;
  }

  function drawE6() {
    text('同一批文档，从散件变成可追溯上下文', 90, 220, { 'font-family': SERIF, 'font-size': 48, 'font-weight': 500 });
    text('上下两带共用六条列锚：同一份资料，对齐看治理前后。', 90, 272, { 'font-size': 23, fill: INK70 });

    var guides = el('g', { 'data-layout-zone': 'e6.column-guides', 'data-slot-id': 'shared-six-column-guides' });
    drawAlignmentGuides(guides);

    var before = drawBandFrame(250, 390, 'before', 'Before：文档只是散件', 'SCATTERED');
    [
      { label: 'PDF 手册', mark: 'lines' },
      { label: '工单导出', mark: 'fold' },
      { label: 'Wiki 页', mark: 'grid' },
      { label: '聊天沉淀', mark: 'pic' },
      { label: '旧 FAQ', mark: 'check' },
      { label: '会议纪要', mark: 'head' }
    ].forEach(function (item, index) { drawDocumentCard(item, index, before); });
    text('来源分散 · 格式不一 · 无切片 · 无法回溯', 540, 616, {
      'font-size': 17, 'text-anchor': 'middle', fill: INK70
    }, before);

    var after = drawBandFrame(700, 430, 'after', 'After：文档进入召回链路', 'PIPELINED');
    drawFlowArrows(after);
    [
      { label: '统一接入', english: 'INGEST', icon: 'ingest' },
      { label: '版式解析', english: 'PARSE', icon: 'parse' },
      { label: '语义切片', english: 'CHUNK', icon: 'slice' },
      { label: '向量索引', english: 'INDEX', icon: 'index' },
      { label: '重排召回', english: 'RETRIEVE', icon: 'retrieve' },
      { label: 'Agent 复用', english: 'REUSE', icon: 'reuse' }
    ].forEach(function (item, index) { drawPipelineStep(item, index, after); });
    text('每一步都沿同一列锚推进，来源与版本跟随切片进入调用链。', 540, 1092, {
      'font-size': 17, 'text-anchor': 'middle', fill: INK70
    }, after);
  }

  drawE6();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
