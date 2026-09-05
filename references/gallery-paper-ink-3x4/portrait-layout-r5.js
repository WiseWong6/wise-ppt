(function () {
  'use strict';

  var svg = document.querySelector('.scene');
  var NS = 'http://www.w3.org/2000/svg';
  var INK = 'var(--ink)';
  var INK80 = 'var(--ink-80)';
  var INK70 = 'var(--ink-70)';
  var INK45 = 'var(--ink-45)';
  var PAPER = 'var(--paper)';
  var PANEL = 'var(--paper-panel)';
  var SANS = 'var(--sans)';
  var MONO = 'var(--mono)';
  var SERIF = 'var(--serif)';
  var MODULES = [
    {
      key: 'content', index: '01', en: 'CONTENT', cn: '内容', desc: '知识与任务',
      cx: 410, cy: 610, radius: 170, innerRadius: 96, rotation: 0, fill: 'url(#r5-gear-dots)'
    },
    {
      key: 'model', index: '02', en: 'MODEL', cn: '模型', desc: '推理与执行',
      cx: 696, cy: 504, radius: 132, innerRadius: 74, rotation: 7, fill: PANEL
    },
    {
      key: 'evaluation', index: '03', en: 'EVALUATION', cn: '评测', desc: '反馈与校准',
      cx: 682, cy: 770, radius: 142, innerRadius: 80, rotation: -5, fill: PANEL
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
      x1: x1, y1: y1, x2: x2, y2: y2,
      stroke: INK, 'stroke-width': 1
    }, attrs || {}), parent);
  }

  function gearPath(teeth, rootRadius, toothRadius) {
    var points = [];
    var steps = teeth * 4;
    for (var i = 0; i < steps; i += 1) {
      var phase = i % 4;
      var radius = phase === 1 || phase === 2 ? toothRadius : rootRadius;
      var angle = -Math.PI / 2 + i * Math.PI * 2 / steps;
      points.push((i ? 'L ' : 'M ') + (Math.cos(angle) * radius).toFixed(2) + ' ' + (Math.sin(angle) * radius).toFixed(2));
    }
    return points.join(' ') + ' Z';
  }

  function drawDefs() {
    var defs = el('defs', {});
    var dots = el('pattern', {
      id: 'r5-gear-dots', width: 13, height: 13, patternUnits: 'userSpaceOnUse'
    }, defs);
    el('circle', { cx: 3, cy: 3, r: 1.1, fill: INK, opacity: .24 }, dots);
  }

  function drawSectionLabel() {
    var group = el('g', { 'data-layout-zone': 'r5.section', 'data-slot-id': 'section-label' });
    text('01 / COUPLED SYSTEM', 90, 309, {
      'font-family': MONO, 'font-size': 11, 'letter-spacing': 1.8, fill: INK45
    }, group);
    line(345, 305, 990, 305, { stroke: INK45, 'stroke-width': .65 }, group);
    text('3 MODULES · MUTUAL DRIVE', 990, 309, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.25,
      'text-anchor': 'end', fill: INK45
    }, group);
  }

  function drawConstruction(parent) {
    var group = el('g', {
      'data-layout-zone': 'r5.construction', 'data-slot-id': 'coupled-system-construction'
    }, parent);
    line(410, 610, 696, 504, {
      stroke: INK, 'stroke-width': .5, opacity: .15, 'stroke-dasharray': '2 7'
    }, group);
    line(696, 504, 682, 770, {
      stroke: INK, 'stroke-width': .5, opacity: .15, 'stroke-dasharray': '2 7'
    }, group);
    line(682, 770, 410, 610, {
      stroke: INK, 'stroke-width': .5, opacity: .15, 'stroke-dasharray': '2 7'
    }, group);
    line(540, 340, 540, 1165, {
      stroke: INK, 'stroke-width': .45, opacity: .12, 'stroke-dasharray': '2 8'
    }, group);
  }

  function drawGear(module, index, parent) {
    var group = el('g', {
      'data-layout-zone': 'r5.gear-' + (index + 1),
      'data-slot-id': module.key + '-module',
      'data-repeat-unit': 'coupled-module',
      'data-module-id': module.key
    }, parent);
    var outline = el('g', {
      transform: 'translate(' + module.cx + ' ' + module.cy + ') rotate(' + module.rotation + ')'
    }, group);
    el('path', {
      d: gearPath(24, module.radius - 18, module.radius),
      fill: module.fill, stroke: INK, 'stroke-width': 1.25,
      'stroke-linejoin': 'round', style: 'mix-blend-mode:multiply'
    }, outline);
    el('circle', {
      cx: module.cx, cy: module.cy, r: module.innerRadius,
      fill: PAPER, stroke: INK, 'stroke-width': 1,
      'data-path-mask': 'r5.module-label-core'
    }, group);
    text(module.index, module.cx, module.cy - 70, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.4,
      'text-anchor': 'middle', fill: INK45
    }, group);
    text(module.en, module.cx, module.cy - 43, {
      'font-family': MONO, 'font-size': 10.5, 'letter-spacing': 2,
      'text-anchor': 'middle', fill: INK45,
      'data-text-kind': 'en-label'
    }, group);
    text(module.cn, module.cx, module.cy + 2, {
      'font-size': module.radius > 150 ? 26 : 23,
      'font-weight': 400, 'text-anchor': 'middle',
      'data-text-kind': 'label'
    }, group);
    text(module.desc, module.cx, module.cy + 38, {
      'font-size': 15, 'text-anchor': 'middle', fill: INK70
    }, group);
  }

  function drawGears(parent) {
    var group = el('g', {
      'data-layout-zone': 'r5.gear-system',
      'data-slot-id': 'content-model-evaluation-gears',
      'data-fixed-quantity': '3'
    }, parent);
    MODULES.forEach(function (module, index) { drawGear(module, index, group); });
  }

  function drawOutput(parent) {
    var group = el('g', {
      'data-layout-zone': 'r5.system-output',
      'data-slot-id': 'stable-delivery-output',
      'data-fixed-quantity': '1'
    }, parent);
    line(540, 932, 540, 1028, {
      id: 'r5-focus-line', stroke: INK, 'stroke-width': 1.25
    }, group);
    el('path', {
      id: 'r5-focus-arrow', d: 'M 531 1015 L 540 1028 L 549 1015',
      fill: 'none', stroke: INK, 'stroke-width': 1.25
    }, group);
    text('SYSTEM OUTPUT', 540, 1070, {
      id: 'r5-focus-en', 'font-family': MONO, 'font-size': 10,
      'letter-spacing': 2.4, 'text-anchor': 'middle', fill: INK45
    }, group);
    text('稳定交付', 540, 1118, {
      id: 'r5-focus-cn', 'font-size': 28, 'font-weight': 400,
      'letter-spacing': 4, 'text-anchor': 'middle'
    }, group);
  }

  function drawReadingGuide() {
    var group = el('g', {
      'data-layout-zone': 'r5.reading-guide', 'data-slot-id': 'network-reading-guide'
    });
    line(90, 1172, 990, 1172, { stroke: INK45, 'stroke-width': .6 }, group);
    text('READ AS A LOOP · NOT A PIPELINE', 90, 1203, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.5, fill: INK45
    }, group);
    text('三个模块互相驱动，不按步骤排队', 990, 1203, {
      'font-size': 12, 'text-anchor': 'end', fill: INK45
    }, group);
  }

  function drawCoupledSystem() {
    var group = el('g', {
      'data-layout-zone': 'r5.coupled-system',
      'data-slot-id': 'interlocking-system',
      'data-fixed-quantity': '3',
      'data-component-id': 'native.paper-ink.network.interlocking-system.three-modules'
    });
    drawConstruction(group);
    drawGears(group);
    drawOutput(group);
  }

  function drawR5() {
    drawDefs();
    text('内容、模型与评测相互咬合，驱动稳定交付', 90, 214, {
      'font-family': SERIF, 'font-size': 46, 'font-weight': 500
    });
    text('内容提供知识与任务，模型负责推理与执行，评测持续反馈与校准。', 90, 266, {
      'font-size': 20, fill: INK70
    });
    drawSectionLabel();
    drawCoupledSystem();
    drawReadingGuide();
  }

  drawR5();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
