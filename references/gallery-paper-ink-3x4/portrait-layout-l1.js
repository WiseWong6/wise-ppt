(function () {
  'use strict';

  var svg = document.querySelector('.scene');
  var NS = 'http://www.w3.org/2000/svg';
  var INK = 'var(--ink)';
  var INK80 = 'var(--ink-80)';
  var INK70 = 'var(--ink-70)';
  var INK45 = 'var(--ink-45)';
  var FUNCTIONAL = 'var(--wp-color-functional)';
  var PAPER = 'var(--paper)';
  var SANS = 'var(--sans)';
  var MONO = 'var(--mono)';
  var SERIF = 'var(--serif)';

  var AXIS_X = 400;
  var TOKEN_Y = [400, 544, 688, 832, 976, 1120];
  var TOKENS = ['The', 'cat', 'sat', 'on', 'the', 'mat.'];
  var LINKS = [
    { key: 't0-t2', from: 0, to: 2, bulge: 130, side: 1, weightClass: 'weak', width: .6, opacity: .2 },
    { key: 't2-t4', from: 2, to: 4, bulge: 150, side: 1, weightClass: 'weak', width: .6, opacity: .2 },
    { key: 't1-t5', from: 1, to: 5, bulge: 210, side: 1, weightClass: 'weak', width: .6, opacity: .2 },
    { key: 't3-t4', from: 3, to: 4, bulge: 110, side: 1, weightClass: 'weak', width: .6, opacity: .2 },
    { key: 't4-t5', from: 4, to: 5, bulge: 100, side: 1, weightClass: 'weak', width: .6, opacity: .2 },
    { key: 't0-t3', from: 0, to: 3, bulge: 280, side: 1, weightClass: 'mid', width: 1.1, opacity: .4, label: 'w ≈ 0.46 · MID' },
    { key: 't1-t4', from: 1, to: 4, bulge: 330, side: 1, weightClass: 'mid', width: 1.1, opacity: .4 },
    { key: 't0-t4', from: 0, to: 4, bulge: 300, side: 1, weightClass: 'mid', width: 1.1, opacity: .4 },
    { key: 't0-t1', from: 0, to: 1, bulge: 400, side: 1, weightClass: 'strong', width: 1.8, opacity: .9, label: 'w ≈ 0.87 · STRONG ATTEND', focus: true },
    { key: 't2-t5', from: 2, to: 5, bulge: 430, side: 1, weightClass: 'break', width: .8, opacity: .55, dash: '5 5', label: 'w ≈ 0.04 · ATTENTION BREAK', broken: true }
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

  function drawSectionLabel() {
    var group = el('g', { 'data-layout-zone': 'l1.section', 'data-slot-id': 'section-label' });
    text('01 / WEIGHTED ARC NETWORK', 90, 309, {
      'font-family': MONO, 'font-size': 11, 'letter-spacing': 1.8, fill: INK45
    }, group);
    line(405, 305, 990, 305, { stroke: INK45, 'stroke-width': .65 }, group);
    text('10 LINKS · NO MAIN PATH', 990, 309, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.25,
      'text-anchor': 'end', fill: INK45
    }, group);
  }

  function drawToken(index, parent) {
    var cy = TOKEN_Y[index];
    var group = el('g', {
      'data-layout-zone': 'l1.token-' + index,
      'data-slot-id': 'token-' + index,
      'data-repeat-unit': 'attention-token-chip',
      'data-token-index': 't' + index
    }, parent);
    el('rect', {
      x: AXIS_X - 45, y: cy - 25, width: 90, height: 50,
      fill: PAPER, stroke: FUNCTIONAL, 'stroke-width': 1
    }, group);
    text(TOKENS[index], AXIS_X, cy + 6, {
      'font-size': 18, 'font-weight': 400, 'text-anchor': 'middle'
    }, group);
    text('t' + index, AXIS_X, cy + 42, {
      'font-family': MONO, 'font-size': 9, 'text-anchor': 'middle', fill: INK45
    }, group);
  }

  function drawTokenSequence() {
    var group = el('g', {
      'data-layout-zone': 'l1.token-sequence',
      'data-slot-id': 'ordered-token-spine',
      'data-fixed-quantity': '6',
      'data-component-id': 'native.paper-ink.sequence.horizontal-token-chips'
    });
    line(AXIS_X, 368, AXIS_X, 1152, { stroke: INK45, 'stroke-width': .55, 'stroke-dasharray': '2 6' }, group);
    TOKENS.forEach(function (_, index) { drawToken(index, group); });
  }

  function linkGeometry(link) {
    var y1 = TOKEN_Y[link.from];
    var y2 = TOKEN_Y[link.to];
    var ctrlX = AXIS_X + link.side * link.bulge;
    var midY = (y1 + y2) / 2;
    return {
      y1: y1, y2: y2, ctrlX: ctrlX, midY: midY,
      midX: AXIS_X + link.side * link.bulge / 2
    };
  }

  function drawBreakMark(geometry, parent) {
    var mx = geometry.midX + 16;
    el('rect', {
      x: mx - 15, y: geometry.midY - 15,
      width: 30, height: 30, fill: PAPER, stroke: 'none'
    }, parent);
    line(mx - 7, geometry.midY - 7, mx + 7, geometry.midY + 7, {
      stroke: INK, 'stroke-width': 1
    }, parent);
    line(mx + 7, geometry.midY - 7, mx - 7, geometry.midY + 7, {
      stroke: INK, 'stroke-width': 1
    }, parent);
    text('w ≈ 0.04 · ATTENTION BREAK', mx + 110, geometry.midY + 4, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': .8,
      'text-anchor': 'middle', fill: INK70
    }, parent);
  }

  function drawLink(link, index, parent) {
    var geometry = linkGeometry(link);
    var group = el('g', {
      'data-layout-zone': 'l1.' + link.weightClass + '-link-' + (index + 1),
      'data-slot-id': link.key,
      'data-repeat-unit': 'weighted-attention-link',
      'data-edge': link.key,
      'data-weight-class': link.weightClass
    }, parent);
    el('path', {
      id: link.focus ? 'l1-focus-edge' : '',
      d: 'M ' + AXIS_X + ' ' + geometry.y1 + ' Q ' + geometry.ctrlX + ' ' +
        geometry.midY + ' ' + AXIS_X + ' ' + geometry.y2,
      fill: 'none', stroke: INK, 'stroke-width': link.width,
      opacity: link.opacity, 'stroke-linecap': 'round',
      'stroke-dasharray': link.dash || 'none'
    }, group);
    el('circle', { cx: AXIS_X, cy: geometry.y1, r: 2, fill: INK, opacity: link.opacity }, group);
    el('circle', { cx: AXIS_X, cy: geometry.y2, r: 2, fill: INK, opacity: link.opacity }, group);
    text(TOKENS[link.from] + ' → ' + TOKENS[link.to], geometry.midX + 14, geometry.midY + 4, {
      'font-size': 13, fill: INK70
    }, group);
    if (link.focus) {
      text(link.label, geometry.midX + 14, geometry.midY - 14, {
        id: 'l1-focus-label', 'font-family': MONO, 'font-size': 9.5,
        'letter-spacing': .8, 'text-anchor': 'start', fill: INK45
      }, group);
    }
    if (link.key === 't0-t3') {
      text(link.label, geometry.midX + 14, geometry.midY - 14, {
        'font-family': MONO, 'font-size': 9, 'letter-spacing': .7,
        'text-anchor': 'start', fill: INK45
      }, group);
    }
    if (link.broken) drawBreakMark(geometry, group);
  }

  function drawWeightedNetwork() {
    var group = el('g', {
      'data-layout-zone': 'l1.weighted-network',
      'data-slot-id': 'attention-weighted-links',
      'data-fixed-quantity': '10',
      'data-component-id': 'native.paper-ink.network.weighted-curves'
    });
    LINKS.forEach(function (link, index) { drawLink(link, index, group); });
  }

  function drawWeightScale() {
    var group = el('g', {
      'data-layout-zone': 'l1.weight-scale',
      'data-slot-id': 'weight-index-scale',
      'data-fixed-quantity': '11'
    });
    line(90, 1202, 990, 1202, {
      stroke: INK, 'stroke-width': .55, opacity: .3, 'stroke-dasharray': '2 5'
    }, group);
    for (var index = 0; index <= 10; index += 1) {
      var x = 90 + index * 90;
      line(x, 1202, x, 1212, { stroke: INK, 'stroke-width': .55, opacity: .35 }, group);
      text(String(index * 10), x, 1232, {
        'font-family': MONO, 'font-size': 8.5, 'text-anchor': 'middle', fill: INK45
      }, group);
    }
  }

  function drawL1() {
    text('注意力网络，谁真正影响当前判断', 90, 214, {
      'font-family': SERIF, 'font-size': 46, 'font-weight': 500
    });
    text('token 沿纵向中轴推进，弧线分列左右，弧深与线宽共同表达连接权重。', 90, 266, {
      'font-size': 20, fill: INK70
    });
    drawSectionLabel();
    text('TOKEN SPINE · TOP → BOTTOM', 90, 365, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.35, fill: INK45
    });
    text('WIDTH × OPACITY = WEIGHT', 990, 365, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.35,
      'text-anchor': 'end', fill: INK45
    });
    drawWeightedNetwork();
    drawTokenSequence();
    drawWeightScale();
  }

  drawL1();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
