(function () {
  'use strict';

  var svg = document.querySelector('.scene');
  var NS = 'http://www.w3.org/2000/svg';
  var INK = 'var(--ink)';
  var INK80 = 'var(--ink-80)';
  var INK70 = 'var(--ink-70)';
  var INK55 = 'var(--ink-55)';
  var INK45 = 'var(--ink-45)';
  var FUNCTIONAL = 'var(--wp-color-functional)';
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
    var group = el('g', { 'data-layout-zone': 'a3.section', 'data-slot-id': 'evidence-label' });
    text('01 / PARAPHRASE + SOURCE', 90, 308, {
      'font-family': MONO, 'font-size': 11, 'letter-spacing': 1.75, fill: INK45
    }, group);
    line(390, 304, 990, 304, { stroke: INK45, 'stroke-width': .65 }, group);
    text('CLAIM ABOVE · EVIDENCE BELOW', 990, 308, {
      'font-family': MONO, 'font-size': 9, 'letter-spacing': 1.05,
      'text-anchor': 'end', fill: INK45
    }, group);
  }

  function drawSummary() {
    var group = el('g', {
      'data-layout-zone': 'a3.summary',
      'data-slot-id': 'upper',
      'data-component-id': 'native.paper-ink.evidence.paraphrase'
    });
    text('《xx 服务管理暂行办法》提出：提供者应当对训练数据来源的合法性负责，', 90, 364, {
      'font-size': 18.5, fill: INK
    }, group);
    text('并采取有效措施防范未成年人过度依赖，同时不得生成煽动颠覆国家政权的内容。', 90, 402, {
      'font-size': 18.5, fill: INK
    }, group);

    text('文件首次将「训练数据合规」与「生成内容可溯源」并列写入。', 90, 482, {
      id: 'a3-compliance', 'font-size': 22, 'font-weight': 400
    }, group);
    line(90, 496, 792, 496, {
      id: 'a3-compliance-line-1', stroke: INK, 'stroke-width': .9, opacity: .7
    }, group);
    line(90, 502, 792, 502, {
      id: 'a3-compliance-line-2', stroke: INK55, 'stroke-width': .6
    }, group);

    text('—— 每一个上线 AI 产品的合规清单，正来自这一条。', 90, 558, {
      'font-size': 18, fill: INK70
    }, group);
  }

  function drawDocumentHeader(frame, frameX, frameY, frameWidth) {
    var tabWidth = 292;
    el('rect', {
      x: frameX + (frameWidth - tabWidth) / 2, y: frameY - 22,
      width: tabWidth, height: 44, fill: PAPER,
      stroke: INK, 'stroke-width': 1
    }, frame);
    text('SOURCE', frameX + frameWidth / 2 - 18, frameY + 7, {
      'font-family': MONO, 'font-size': 10, 'letter-spacing': 1.8,
      'text-anchor': 'end'
    }, frame);
    text('原文标本', frameX + frameWidth / 2 + 4, frameY + 7, {
      'font-size': 14, fill: INK70
    }, frame);
    text('xx 行业主管办公室', frameX + frameWidth / 2, frameY + 88, {
      'font-size': 25, 'font-weight': 400, 'letter-spacing': 5,
      'text-anchor': 'middle'
    }, frame);
    text('XX [2023] NO.7', frameX + frameWidth / 2, frameY + 120, {
      'font-family': MONO, 'font-size': 10, 'letter-spacing': 2.5,
      'text-anchor': 'middle', fill: INK45
    }, frame);
    line(frameX + 46, frameY + 146, frameX + frameWidth - 46, frameY + 146, {
      stroke: INK80, 'stroke-width': 1.2
    }, frame);
    line(frameX + 46, frameY + 152, frameX + 410, frameY + 152, {
      stroke: INK45, 'stroke-width': .55
    }, frame);
  }

  function drawArticleRows(frame, frameX, frameY) {
    text('ART. 15', frameX + 64, frameY + 326, {
      'font-family': MONO, 'font-size': 10, 'letter-spacing': 1.8, fill: INK45
    }, frame);
    [650, 706, 575, 430].forEach(function (width, rowIndex) {
      var rowY = frameY + 330 + rowIndex * 40;
      var rowGroup = el('g', {
        'data-layout-zone': 'a3.document-row-' + (rowIndex + 1),
        'data-slot-id': 'article-row',
        'data-repeat-unit': 'article-row',
        'data-row-index': String(rowIndex + 1)
      }, frame);
      el('circle', { cx: frameX + 82, cy: rowY - 5, r: 2.2, fill: INK55 }, rowGroup);
      line(frameX + 98, rowY, frameX + 98 + width, rowY, {
        stroke: INK45, 'stroke-width': .8
      }, rowGroup);
    });
  }

  function drawSeal(frame, frameX, frameY, frameWidth, frameHeight) {
    var sealX = frameX + frameWidth - 78;
    var sealY = frameY + frameHeight - 62;
    var group = el('g', {
      'data-layout-zone': 'a3.document-seal', 'data-slot-id': 'source-seal'
    }, frame);
    el('circle', { cx: sealX, cy: sealY, r: 21, fill: 'none', stroke: FUNCTIONAL, 'stroke-width': 1.1, opacity: .8 }, group);
    el('circle', { cx: sealX, cy: sealY, r: 14, fill: 'none', stroke: FUNCTIONAL, 'stroke-width': .6 }, group);
    el('path', {
      d: 'M ' + (sealX - 6) + ' ' + sealY + ' L ' + (sealX - 1) + ' ' + (sealY + 5) +
        ' L ' + (sealX + 7) + ' ' + (sealY - 6),
      fill: 'none', stroke: FUNCTIONAL, 'stroke-width': 1.3,
      'stroke-linecap': 'round', 'stroke-linejoin': 'round'
    }, group);
  }

  function drawDocumentSpecimen() {
    var frameX = 90;
    var frameY = 628;
    var frameWidth = 900;
    var frameHeight = 530;
    var frame = el('g', {
      'data-layout-zone': 'a3.document',
      'data-slot-id': 'lower',
      'data-component-id': 'native.paper-ink.evidence.document-specimen',
      'data-fixed-quantity': '4'
    });
    el('rect', {
      x: frameX, y: frameY, width: frameWidth, height: frameHeight,
      fill: PANEL, stroke: INK80, 'stroke-width': 1.2
    }, frame);
    el('rect', {
      x: frameX + 5, y: frameY + 5, width: frameWidth - 10, height: frameHeight - 10,
      fill: 'none', stroke: INK45, 'stroke-width': .55
    }, frame);

    drawDocumentHeader(frame, frameX, frameY, frameWidth);
    text('xx 服务管理暂行办法', frameX + frameWidth / 2, frameY + 218, {
      'font-size': 26, 'font-weight': 400, 'text-anchor': 'middle'
    }, frame);
    text('INTERIM MEASURES · CHAPTER IV', frameX + frameWidth / 2, frameY + 252, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 2.2,
      'text-anchor': 'middle', fill: INK45
    }, frame);
    drawArticleRows(frame, frameX, frameY);
    drawSeal(frame, frameX, frameY, frameWidth, frameHeight);
    text('PAGE 03 / 11', frameX + 64, frameY + frameHeight - 54, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.8, fill: INK45
    }, frame);
  }

  function drawA3() {
    text('先解释规则，再把原文放回现场', 90, 214, {
      'font-family': SERIF, 'font-size': 45, 'font-weight': 500
    });
    text('转述负责说明意义，原文标本负责提供可追溯证据。', 90, 266, {
      'font-size': 19, fill: INK70
    });
    drawSectionLabel();
    drawSummary();
    drawDocumentSpecimen();
  }

  drawA3();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
