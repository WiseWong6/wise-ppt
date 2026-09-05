(function () {
  'use strict';

  var svg = document.querySelector('.scene');
  var NS = 'http://www.w3.org/2000/svg';
  var INK = 'var(--ink)';
  var INK80 = 'var(--ink-80)';
  var INK70 = 'var(--ink-70)';
  var INK45 = 'var(--ink-45)';
  var FUNCTIONAL = 'var(--wp-color-functional)';
  var SANS = 'var(--sans)';
  var MONO = 'var(--mono)';
  var SERIF = 'var(--serif)';

  var PRINCIPLES = [
    {
      no: '01', slot: 'content', title: '内容先于装饰',
      lines: ['先回答这页要讲什么，', '再决定它需要什么形式。'],
      endpoint: [220, 1030], blockY: 1070
    },
    {
      no: '02', slot: 'color', title: '颜色必须有语义',
      lines: ['大面积保持克制，', '强调只服务关键信息。'],
      endpoint: [860, 1030], blockY: 1070
    },
    {
      no: '03', slot: 'density', title: '密度服从层级',
      lines: ['该留白的留白，该密集的有序；', '让信息有进入和停留的位置。'],
      endpoint: [540, 390], blockY: 180
    }
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

  function drawCenterIntent(parent) {
    var group = el('g', {
      'data-layout-zone': 'g5.center',
      'data-slot-id': 'design-intent',
      'data-component-id': 'native.paper-ink.radial.intent-node'
    }, parent);
    el('rect', {
      x: 350, y: 625, width: 380, height: 155,
      fill: 'none', stroke: INK80, 'stroke-width': 1.15
    }, group);
    text('DESIGN INTENT', 540, 660, {
      'font-family': MONO, 'font-size': 10.5, 'letter-spacing': 2.4,
      'text-anchor': 'middle', fill: INK70
    }, group);
    text('一页一个重心', 540, 710, {
      id: 'g5-focus-title', 'font-size': 34, 'font-weight': 300,
      'text-anchor': 'middle'
    }, group);
    text('先决定观众应该先看见什么', 540, 758, {
      'font-size': 15.5, 'text-anchor': 'middle', fill: INK70
    }, group);
  }

  function endpointBeforeCircle(from, to, clearance) {
    var dx = to[0] - from[0];
    var dy = to[1] - from[1];
    var length = Math.sqrt(dx * dx + dy * dy);
    var ux = dx / length;
    var uy = dy / length;
    return [to[0] - ux * clearance, to[1] - uy * clearance];
  }

  function drawConnectors(parent) {
    var group = el('g', {
      'data-layout-zone': 'g5.connectors',
      'data-slot-id': 'three-principle-branches',
      'data-connection-shape': 'implied-isosceles-radial',
      'data-branch-count': '3'
    }, parent);
    [
      { id: 'content', anchor: [425, 780], principle: 0 },
      { id: 'color', anchor: [655, 780], principle: 1 },
      { id: 'density', anchor: [540, 625], principle: 2 }
    ].forEach(function (branch) {
      var endpoint = endpointBeforeCircle(
        branch.anchor,
        PRINCIPLES[branch.principle].endpoint,
        21
      );
      var connector = el('g', {
        'data-layout-zone': 'g5.connector-' + branch.id,
        'data-slot-id': branch.id + '-connector'
      }, group);
      line(branch.anchor[0], branch.anchor[1], endpoint[0], endpoint[1], {
        stroke: INK45, 'stroke-width': 1.1, 'stroke-dasharray': '4 7'
      }, connector);
      el('circle', { cx: branch.anchor[0], cy: branch.anchor[1], r: 2.6, fill: INK70 }, connector);
    });
  }

  function drawPrinciple(principle, index, parent) {
    var centerX = principle.endpoint[0];
    var y = principle.blockY;
    var group = el('g', {
      'data-layout-zone': 'g5.principle-' + (index + 1),
      'data-slot-id': principle.slot,
      'data-repeat-unit': 'principle',
      'data-component-id': 'native.paper-ink.radial.principle-note'
    }, parent);
    el('circle', {
      cx: principle.endpoint[0], cy: principle.endpoint[1], r: 21,
      fill: 'none', stroke: INK80, 'stroke-width': 1.1,
      'data-path-mask': 'g5.principle-index'
    }, group);
    text(principle.no, principle.endpoint[0], principle.endpoint[1] + 5, {
      'font-family': MONO, 'font-size': 11, 'text-anchor': 'middle', fill: INK70
    }, group);
    text(principle.title, centerX, y + 50, {
      'font-size': 25, 'font-weight': 400, 'text-anchor': 'middle'
    }, group);
    principle.lines.forEach(function (value, lineIndex) {
      text(value, centerX, y + 90 + lineIndex * 32, {
        'font-size': 16, 'text-anchor': 'middle', fill: INK70
      }, group);
    });
  }

  function drawRadial() {
    var group = el('g', {
      'data-layout-zone': 'g5.radial',
      'data-slot-id': 'content-color-density',
      'data-fixed-quantity': '3',
      'data-radial-layout': 'one-top-two-bottom'
    });
    drawConnectors(group);
    drawCenterIntent(group);
    PRINCIPLES.forEach(function (principle, index) { drawPrinciple(principle, index, group); });
  }

  function drawG5() {
    text('三条设计原则，共同服务一个重心', 90, 214, {
      'font-family': SERIF, 'font-size': 46, 'font-weight': 500
    });
    text('内容、颜色与密度分别作出取舍；三项并列，不按步骤推进。', 90, 266, {
      'font-size': 20, fill: INK70
    });
    drawRadial();
  }

  drawG5();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
