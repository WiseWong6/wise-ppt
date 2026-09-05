(function () {
  'use strict';

  var svg = document.querySelector('.scene');
  var NS = 'http://www.w3.org/2000/svg';
  var INK = 'var(--ink)';
  var INK80 = 'var(--ink-80)';
  var INK70 = 'var(--ink-70)';
  var INK55 = 'var(--ink-55)';
  var INK45 = 'var(--ink-45)';
  var PAPER = 'var(--paper)';
  var PANEL = 'var(--paper-panel)';
  var SANS = 'var(--sans)';
  var MONO = 'var(--mono)';
  var SERIF = 'var(--serif)';
  var PARTS = [
    { side: 'L', row: 0, code: 'PART 01 · NPU', cn: '算力芯片', spec: 'TOPS 48 · INT8', anchor: [540, 625], route: [[540, 625], [540, 470], [326, 470], [326, 448], [312, 448]] },
    { side: 'L', row: 1, code: 'PART 02 · THERMAL', cn: '散热模组', spec: 'VC 均热 · ΔT 8℃', anchor: [427, 585], route: [[427, 585], [340, 585], [340, 700], [312, 700]] },
    { side: 'L', row: 2, code: 'PART 03 · POWER', cn: '电源管理', spec: '65W PD · 92% 效率', anchor: [462, 838], route: [[462, 838], [340, 838], [340, 952], [312, 952]] },
    { side: 'R', row: 0, code: 'PART 04 · CAMERA', cn: '摄像模组', spec: '4K · FOV 120°', anchor: [694, 718], route: [[694, 718], [742, 718], [742, 448], [768, 448]] },
    { side: 'R', row: 1, code: 'PART 05 · MIC', cn: '麦克风阵列', spec: '6 阵元 · 波束成形', anchor: [648, 746], route: [[648, 746], [754, 746], [754, 700], [768, 700]] },
    { side: 'R', row: 2, code: 'PART 06 · NET', cn: '网络接口', spec: 'Wi-Fi 6E · 千兆以太', anchor: [698, 822], route: [[698, 822], [754, 822], [754, 952], [768, 952]] }
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

  function drawDefs() {
    var defs = el('defs', {});
    var pattern = el('pattern', {
      id: 'g2-hatch', width: 8, height: 8,
      patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)'
    }, defs);
    line(0, 0, 0, 8, { stroke: INK, 'stroke-width': .7, opacity: .28 }, pattern);
  }

  function drawSectionLabel() {
    var group = el('g', { 'data-layout-zone': 'g2.section', 'data-slot-id': 'section-label' });
    text('01 / ANNOTATED EDGE DEVICE', 90, 309, {
      'font-family': MONO, 'font-size': 11, 'letter-spacing': 1.8, fill: INK45
    }, group);
    line(372, 305, 990, 305, { stroke: INK45, 'stroke-width': .65 }, group);
    text('HERO + 6 HARDWARE LIMITS', 990, 309, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.25,
      'text-anchor': 'end', fill: INK45
    }, group);
  }

  function drawConstructionGrid(parent) {
    var group = el('g', {
      'data-layout-zone': 'g2.construction-grid',
      'data-slot-id': 'technical-reference'
    }, parent);
    line(328, 370, 328, 1128, { stroke: INK45, 'stroke-width': .45, 'stroke-dasharray': '2 7', opacity: .55 }, group);
    line(752, 370, 752, 1128, { stroke: INK45, 'stroke-width': .45, 'stroke-dasharray': '2 7', opacity: .55 }, group);
    line(540, 392, 540, 1092, { stroke: INK45, 'stroke-width': .45, 'stroke-dasharray': '2 7', opacity: .5 }, group);
    line(350, 700, 730, 700, { stroke: INK45, 'stroke-width': .45, 'stroke-dasharray': '2 7', opacity: .45 }, group);
    el('circle', {
      cx: 540, cy: 715, r: 238,
      fill: 'none', stroke: INK45, 'stroke-width': .5,
      'stroke-dasharray': '3 8', opacity: .45
    }, group);
    text('DEVICE DATUM / 1080×1440', 540, 1142, {
      'font-family': MONO, 'font-size': 8.5, 'letter-spacing': 1.25,
      'text-anchor': 'middle', fill: INK45
    }, group);
  }

  function drawDevice(parent) {
    var group = el('g', {
      'data-layout-zone': 'g2.device-hero',
      'data-slot-id': 'edge-device-hero',
      'data-fixed-quantity': '1'
    }, parent);
    line(350, 874, 730, 874, { stroke: INK70, 'stroke-width': 1 }, group);
    line(350, 867, 350, 881, { stroke: INK70, 'stroke-width': .8 }, group);
    line(730, 867, 730, 881, { stroke: INK70, 'stroke-width': .8 }, group);

    el('rect', {
      id: 'sample-focus', x: 382, y: 682, width: 316, height: 160, rx: 16,
      fill: PAPER, stroke: INK80, 'stroke-width': 1.35
    }, group);
    el('path', {
      d: 'M 398 796 L 682 796 L 682 826 Q 682 842 666 842 L 414 842 Q 398 842 398 826 Z',
      fill: 'url(#g2-hatch)', stroke: 'none'
    }, group);
    line(398, 796, 682, 796, { stroke: INK45, 'stroke-width': .65 }, group);
    el('rect', {
      x: 522, y: 718, width: 126, height: 62,
      fill: 'none', stroke: INK55, 'stroke-width': .75,
      'stroke-dasharray': '5 4'
    }, group);
    line(648, 739, 661, 739, { stroke: INK70, 'stroke-width': .8 }, group);
    line(648, 761, 661, 761, { stroke: INK70, 'stroke-width': .8 }, group);

    [462, 622].forEach(function (wheelX) {
      el('circle', { cx: wheelX, cy: 854, r: 31, fill: PAPER, stroke: INK80, 'stroke-width': 1.25 }, group);
      el('circle', { cx: wheelX, cy: 854, r: 13, fill: 'none', stroke: INK55, 'stroke-width': .75 }, group);
      el('circle', { cx: wheelX, cy: 854, r: 2.4, fill: INK }, group);
    });

    line(420, 682, 420, 504, { stroke: INK80, 'stroke-width': 1.3 }, group);
    line(435, 682, 435, 504, { stroke: INK80, 'stroke-width': 1.3 }, group);
    line(416, 504, 439, 504, { stroke: INK80, 'stroke-width': 1.2 }, group);
    for (var braceY = 530; braceY <= 660; braceY += 43) {
      line(420, braceY, 435, braceY, { stroke: INK45, 'stroke-width': .6 }, group);
    }
    el('rect', { x: 408, y: 568, width: 39, height: 36, fill: PANEL, stroke: INK80, 'stroke-width': 1 }, group);
    line(408, 604, 408, 616, { stroke: INK80, 'stroke-width': 1.2 }, group);
    line(338, 616, 408, 616, { stroke: INK80, 'stroke-width': 1.2 }, group);

    el('rect', { x: 522, y: 640, width: 36, height: 42, fill: PAPER, stroke: INK80, 'stroke-width': 1.1 }, group);
    el('path', { d: 'M 522 640 A 18 18 0 0 1 558 640', fill: 'none', stroke: INK80, 'stroke-width': 1.2 }, group);
    el('circle', { cx: 540, cy: 634, r: 2.2, fill: INK }, group);
    el('path', { d: 'M 514 616 A 34 34 0 0 1 526 602', fill: 'none', stroke: INK55, 'stroke-width': .65 }, group);
    el('path', { d: 'M 566 616 A 34 34 0 0 0 554 602', fill: 'none', stroke: INK55, 'stroke-width': .65 }, group);

    el('rect', { x: 694, y: 705, width: 26, height: 25, fill: PANEL, stroke: INK80, 'stroke-width': 1 }, group);
    el('circle', { cx: 707, cy: 717.5, r: 5, fill: 'none', stroke: INK70, 'stroke-width': .8 }, group);
    el('path', { d: 'M 687 796 A 27 27 0 0 1 696 823', fill: 'none', stroke: INK80, 'stroke-width': 1.1 }, group);
    el('path', { d: 'M 698 792 A 35 35 0 0 1 709 823', fill: 'none', stroke: INK45, 'stroke-width': .6, 'stroke-dasharray': '3 4' }, group);
    [0, 1, 2, 3, 4, 5].forEach(function (micIndex) {
      el('circle', { cx: 618 + micIndex * 12, cy: 746, r: 1.8, fill: micIndex === 2 ? INK : INK55 }, group);
    });

    text('EDGE AI / M1', 540, 735, { 'data-xp-anchor': 'hero',
      'font-family': MONO, 'font-size': 10, 'letter-spacing': 1.8,
      'text-anchor': 'middle', fill: INK45
    }, group);
    text('48 TOPS', 540, 770, { 'data-xp-anchor': 'hero',
      'font-family': MONO, 'font-size': 19, 'letter-spacing': 1.8,
      'text-anchor': 'middle'
    }, group);
  }

  function drawAnchor(x, y, partIndex, parent) {
    el('circle', {
      'data-g2-identity-dot': 'true', 'data-part-index': String(partIndex + 1),
      cx: x, cy: y, r: 5, fill: PAPER, stroke: INK80, 'stroke-width': 1
    }, parent);
    el('circle', {
      'data-g2-identity-dot': 'true', 'data-part-index': String(partIndex + 1),
      cx: x, cy: y, r: 1.6, fill: INK
    }, parent);
  }

  function drawElbow(points, parent) {
    var path = points.map(function (point, pointIndex) {
      return (pointIndex ? 'L ' : 'M ') + point[0] + ' ' + point[1];
    }).join(' ');
    el('path', {
      d: path, fill: 'none', stroke: INK, 'stroke-width': .75,
      opacity: .5, 'stroke-dasharray': '3 5'
    }, parent);
    var end = points[points.length - 1];
    el('circle', { cx: end[0], cy: end[1], r: 2.2, fill: INK, opacity: .65 }, parent);
  }

  function drawAnnotationBlock(part, partIndex, parent) {
    var y = 448 + part.row * 252;
    var isLeft = part.side === 'L';
    var textX = isLeft ? 294 : 786;
    var ruleX = isLeft ? 310 : 770;
    var anchorMode = isLeft ? 'end' : 'start';
    var group = el('g', {
      'data-layout-zone': 'g2.annotation-' + (partIndex + 1),
      'data-slot-id': 'part-' + String(partIndex + 1).padStart(2, '0'),
      'data-repeat-unit': 'hardware-annotation',
      'data-annotation-side': part.side,
      'data-annotation-row': String(part.row + 1)
    }, parent);
    line(ruleX, y - 48, ruleX, y + 58, { stroke: INK55, 'stroke-width': .8 }, group);
    text(part.code, textX, y - 28, Object.assign({
      'data-g2-part-label': 'true', 'data-part-index': String(partIndex + 1),
      'font-family': MONO, 'font-size': 9.3, 'letter-spacing': 1.35,
      'text-anchor': anchorMode, fill: INK45
    }, partIndex === 0 ? { id: 'g2-focus-part-01' } : {}), group);
    text(part.cn, textX, y + 8, {
      'font-size': 18, 'font-weight': 300, 'text-anchor': anchorMode
    }, group);
    text(part.spec, textX, y + 39, {
      'font-family': MONO, 'font-size': 9.3, 'letter-spacing': 1.05,
      'text-anchor': anchorMode, fill: INK45
    }, group);
    drawElbow(part.route, group);
    drawAnchor(part.anchor[0], part.anchor[1], partIndex, group);
  }

  function drawAnnotations() {
    var group = el('g', {
      'data-layout-zone': 'g2.annotation-ring',
      'data-slot-id': 'six-part-callouts',
      'data-fixed-quantity': '6',
      'data-left-quantity': '3',
      'data-right-quantity': '3'
    });
    PARTS.forEach(function (part, partIndex) { drawAnnotationBlock(part, partIndex, group); });
  }

  function drawReadingGuide() {
    var group = el('g', {
      'data-layout-zone': 'g2.reading-guide',
      'data-slot-id': 'focus-decomposition-guide'
    });
    line(90, 1197, 990, 1197, { stroke: INK45, 'stroke-width': .6 }, group);
    text('ONE HERO · SIX CONSTRAINTS', 90, 1227, {
      'font-family': MONO, 'font-size': 9.2, 'letter-spacing': 1.4, fill: INK45
    }, group);
    text('NO PROCESS ORDER', 990, 1227, {
      'font-family': MONO, 'font-size': 9.2, 'letter-spacing': 1.4,
      'text-anchor': 'end', fill: INK45
    }, group);
  }

  function drawG2() {
    drawDefs();
    text('端侧能力，由六个硬件约束共同决定', 90, 214, {
      'font-family': SERIF, 'font-size': 45, 'font-weight': 500
    });
    text('中央设备是唯一焦点，左右标注分别拆解算力、热、电、感知与连接。', 90, 266, {
      'font-size': 19, fill: INK70
    });
    drawSectionLabel();
    drawConstructionGrid();
    drawDevice(svg);
    drawAnnotations();
    drawReadingGuide();
  }

  drawG2();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
