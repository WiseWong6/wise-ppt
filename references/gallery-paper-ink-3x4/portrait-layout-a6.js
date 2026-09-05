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

  function drawLaurel(centerX, centerY, radius, parent) {
    [-1, 1].forEach(function (side) {
      el('path', {
        d: 'M ' + (centerX + side * 34) + ' ' + (centerY + radius * .72) +
          ' A ' + (radius * .72) + ' ' + (radius * .72) + ' 0 0 ' + (side < 0 ? 1 : 0) +
          ' ' + (centerX + side * radius * .68) + ' ' + (centerY - radius * .28),
        fill: 'none', stroke: INK, 'stroke-width': .8, opacity: .55
      }, parent);
      for (var index = 0; index < 6; index += 1) {
        var angle = (68 + index * 15) * Math.PI / 180;
        var px = centerX + side * Math.cos(angle) * radius * .7;
        var py = centerY + Math.sin(angle) * radius * .7;
        line(px, py, px + side * 9, py - 11, { stroke: INK45, 'stroke-width': .65 }, parent);
      }
    });
  }

  function drawPrimaryCredential() {
    var centerX = 540;
    var centerY = 430;
    var group = el('g', {
      'data-layout-zone': 'a6.primary-credential',
      'data-slot-id': 'upper',
      'data-component-id': 'native.paper-ink.evidence.primary-credential'
    });
    el('circle', { cx: centerX, cy: centerY, r: 145, fill: 'none', stroke: INK45, 'stroke-width': .55, 'stroke-dasharray': '2 6' }, group);
    el('circle', { cx: centerX, cy: centerY, r: 127, fill: PANEL, stroke: INK80, 'stroke-width': 1.25 }, group);
    el('circle', { cx: centerX, cy: centerY, r: 119, fill: 'none', stroke: INK45, 'stroke-width': .6 }, group);
    el('circle', { cx: centerX, cy: centerY, r: 76, fill: 'none', stroke: INK80, 'stroke-width': 1.15 }, group);
    el('circle', { cx: centerX, cy: centerY, r: 70, fill: 'none', stroke: INK45, 'stroke-width': .55 }, group);
    drawLaurel(centerX, centerY, 112, group);
    text('MODEL EVALUATION', centerX, centerY - 88, {
      'font-family': MONO, 'font-size': 10.5, 'letter-spacing': 2.3,
      'text-anchor': 'middle'
    }, group);
    line(centerX - 48, centerY - 76, centerX + 48, centerY - 76, { stroke: INK45, 'stroke-width': .55 }, group);
    el('path', {
      d: 'M ' + centerX + ' ' + (centerY - 60) + ' l 7 11 l -7 11 l -7 -11 Z',
      fill: 'none', stroke: INK80, 'stroke-width': 1
    }, group);
    text('TIER S', centerX, centerY + 8, { 'data-xp-anchor': 'tier',
      'font-family': MONO, 'font-size': 27, 'letter-spacing': 4,
      'text-anchor': 'middle', 'font-weight': 400
    }, group);
    el('rect', {
      x: centerX - 92, y: centerY + 21, width: 184, height: 56,
      fill: PANEL, 'data-path-mask': 'a6.primary-labels'
    }, group);
    text('综合能力 · 顶级', centerX, centerY + 42, {
      'font-size': 18, 'text-anchor': 'middle'
    }, group);
    text('WISE-BENCH', centerX, centerY + 66, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.5,
      'text-anchor': 'middle', fill: INK45
    }, group);
  }

  function drawArchiveNotes() {
    var group = el('g', { 'data-layout-zone': 'a6.archive-notes', 'data-slot-id': 'credential-notes' });
    line(90, 596, 190, 596, { stroke: INK45, 'stroke-width': .6 }, group);
    text('ARCHIVE NO. HJ-Q-2026-018', 90, 620, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.4, fill: INK45
    }, group);
    text('ISSUED BY FICTIONAL BOARD', 990, 620, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.4,
      'text-anchor': 'end', fill: INK45
    }, group);
    text('SPECIMEN — NOT A REAL CERT', 990, 640, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.4,
      'text-anchor': 'end', fill: INK45
    }, group);
  }

  function drawBadgeGlyph(centerX, centerY, size, style, parent) {
    if (style === 0) {
      el('circle', { cx: centerX, cy: centerY, r: size, fill: 'none', stroke: INK80, 'stroke-width': 1 }, parent);
    } else if (style === 1) {
      el('circle', { cx: centerX, cy: centerY, r: size, fill: 'none', stroke: INK80, 'stroke-width': 1 }, parent);
      el('circle', { cx: centerX, cy: centerY, r: size - 5, fill: 'none', stroke: INK45, 'stroke-width': .6 }, parent);
      el('circle', { cx: centerX, cy: centerY, r: 2, fill: INK }, parent);
    } else if (style === 2) {
      var points = '';
      for (var index = 0; index < 6; index += 1) {
        var angle = Math.PI / 6 + index * Math.PI / 3;
        points += (index ? ' L ' : 'M ') + (centerX + Math.cos(angle) * size) + ' ' + (centerY + Math.sin(angle) * size);
      }
      el('path', { d: points + ' Z', fill: 'none', stroke: INK80, 'stroke-width': 1 }, parent);
    } else if (style === 3) {
      el('path', {
        d: 'M ' + centerX + ' ' + (centerY - size) + ' L ' + (centerX + size) + ' ' + centerY +
          ' L ' + centerX + ' ' + (centerY + size) + ' L ' + (centerX - size) + ' ' + centerY + ' Z',
        fill: 'none', stroke: INK80, 'stroke-width': 1
      }, parent);
      line(centerX - size - 7, centerY + size + 5, centerX + size + 7, centerY + size + 5, { stroke: INK45, 'stroke-width': .6 }, parent);
    } else {
      el('circle', { cx: centerX, cy: centerY, r: size, fill: 'none', stroke: INK80, 'stroke-width': 1 }, parent);
      el('path', {
        d: 'M ' + (centerX - size - 4) + ' ' + (centerY + 5) +
          ' A ' + (size + 5) + ' ' + (size + 5) + ' 0 0 1 ' + (centerX - size + 2) + ' ' + (centerY - size - 2),
        fill: 'none', stroke: INK45, 'stroke-width': .7
      }, parent);
      el('path', {
        d: 'M ' + (centerX + size + 4) + ' ' + (centerY + 5) +
          ' A ' + (size + 5) + ' ' + (size + 5) + ' 0 0 0 ' + (centerX + size - 2) + ' ' + (centerY - size - 2),
        fill: 'none', stroke: INK45, 'stroke-width': .7
      }, parent);
    }
  }

  function drawCertificate(x, y, item, index, parent) {
    var width = 280;
    var height = 126;
    var group = el('g', {
      'data-layout-zone': 'a6.certificate-' + index,
      'data-slot-id': 'credential-cell',
      'data-repeat-unit': 'credential',
      'data-credential-index': String(index)
    }, parent);
    el('rect', { x: x, y: y, width: width, height: height, fill: PANEL, stroke: INK80, 'stroke-width': 1 }, group);
    el('rect', { x: x + 4, y: y + 4, width: width - 8, height: height - 8, fill: 'none', stroke: INK45, 'stroke-width': .55 }, group);
    drawBadgeGlyph(x + 54, y + 53, 20, item[2], group);
    text(item[0], x + 92, y + 48, {
      'font-family': MONO, 'font-size': 12.5, 'letter-spacing': .9
    }, group);
    text(item[1], x + 92, y + 72, {
      'font-family': MONO, 'font-size': 11.5, 'letter-spacing': .8, fill: INK45
    }, group);
    [0, 1].forEach(function (lineIndex) {
      line(x + 24, y + 96 + lineIndex * 10, x + width - 24 - lineIndex * 38, y + 96 + lineIndex * 10, {
        stroke: INK45, 'stroke-width': .55
      }, group);
    });
  }

  function drawCredentialWall() {
    var group = el('g', {
      'data-layout-zone': 'a6.credential-wall',
      'data-slot-id': 'lower',
      'data-component-id': 'native.paper-ink.evidence.credential-wall',
      'data-fixed-quantity': '12'
    });
    var items = [
      ['MMLU PRO', 'ACC 82.3', 1], ['HUMANEVAL', 'PASS 74.1', 4], ['GSM8K', 'ACC 89.5', 2],
      ['MATH', 'ACC 52.7', 0], ['BBH', 'ACC 83.0', 3], ['PATENT', 'ZL-7741-A', 2],
      ['PATENT', 'ZL-8126-C', 1], ['SAFETY ALIGN', 'TIER III', 4], ['TOXICITY', 'FILTER V3', 0],
      ['PRIVACY', 'ISO 27001', 3], ['MULTI-LANG', '54 LANG', 2], ['CONTEXT', '128K PASS', 4]
    ];
    items.forEach(function (item, index) {
      var col = index % 3;
      var row = Math.floor(index / 3);
      drawCertificate(90 + col * 310, 680 + row * 140, item, index + 1, group);
    });
  }

  function drawA6() {
    text('一枚主徽章，十二项交叉证据', 90, 214, {
      'font-family': SERIF, 'font-size': 45, 'font-weight': 500
    });
    text('综合能力先定级，细分 benchmark 与合规资质再逐项背书。', 90, 266, {
      'font-size': 19, fill: INK70
    });
    text('CREDENTIALS / 12 ITEMS', 90, 312, { id: 'a6-focus-credentials',
      'font-family': MONO, 'font-size': 11, 'letter-spacing': 2, fill: INK45
    });
    text('模型评测与合规背书', 990, 312, {
      'font-size': 18, 'text-anchor': 'end', fill: INK70
    });
    drawPrimaryCredential();
    drawArchiveNotes();
    drawCredentialWall();
  }

  drawA6();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
