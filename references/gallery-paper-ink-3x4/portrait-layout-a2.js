(function () {
  'use strict';

  var svg = document.querySelector('.scene');
  var NS = 'http://www.w3.org/2000/svg';
  var INK = 'var(--ink)';
  var INK80 = 'var(--ink-80)';
  var INK70 = 'var(--ink-70)';
  var INK55 = 'var(--ink-55)';
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
    var defs = el('defs');
    var pattern = el('pattern', {
      id: 'a2-hatch', width: 8, height: 8,
      patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)'
    }, defs);
    line(0, 0, 0, 8, { stroke: INK, 'stroke-width': .8, opacity: .45 }, pattern);
  }

  function drawDialogue(kind, y, height, label, lines) {
    var group = el('g', {
      'data-layout-zone': 'a2.dialogue-' + kind,
      'data-slot-id': kind === 'question' ? 'upper' : 'lower',
      'data-repeat-unit': 'dialogue',
      'data-speaker': kind === 'question' ? 'user' : 'assistant'
    });
    el('rect', {
      x: 90, y: y, width: 900, height: height,
      rx: 12, fill: PANEL, stroke: INK45, 'stroke-width': .8
    }, group);
    el('circle', {
      cx: 138, cy: y + height / 2, r: 25,
      fill: PAPER, stroke: INK45, 'stroke-width': .8
    }, group);
    text(kind === 'question' ? '我' : 'AI', 138, y + height / 2 + 6, {
      'font-size': 16, 'font-weight': 400, 'text-anchor': 'middle'
    }, group);
    text(label, 192, y + 33, {
      'font-family': MONO, 'font-size': 10, 'letter-spacing': 1.9, fill: INK45
    }, group);
    lines.forEach(function (copy, lineIndex) {
      text(copy, 192, y + 70 + lineIndex * 34, {
        'font-size': kind === 'question' ? 22 : 21,
        'font-weight': lineIndex === 0 && kind === 'answer' ? 400 : 300
      }, group);
    });
  }

  function drawSectionLabel() {
    var group = el('g', { 'data-layout-zone': 'a2.section', 'data-slot-id': 'scene-label' });
    text('01 / SINGLE SCENE', 90, 650, {
      'font-family': MONO, 'font-size': 11, 'letter-spacing': 1.8, fill: INK45
    }, group);
    line(320, 646, 990, 646, { stroke: INK45, 'stroke-width': .65 }, group);
    text('INTENT ≠ ACTION', 990, 650, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.2,
      'text-anchor': 'end', fill: INK45
    }, group);
  }

  function drawGround(parent) {
    line(90, 1000, 990, 1000, { stroke: INK, 'stroke-width': 1.2 }, parent);
    for (var x = 105; x < 990; x += 35) {
      line(x, 1000, x - 10, 1009, { stroke: INK45, 'stroke-width': .55 }, parent);
    }
  }

  function drawCar(parent) {
    var group = el('g', {
      'data-layout-zone': 'a2.scene.car',
      'data-slot-id': 'car',
      'data-repeat-unit': 'scene-object'
    }, parent);
    var x = 104;
    var y = 1000;
    el('path', {
      d: 'M ' + x + ' ' + (y - 18) + ' L ' + x + ' ' + (y - 52) +
        ' Q ' + x + ' ' + (y - 64) + ' ' + (x + 14) + ' ' + (y - 66) +
        ' L ' + (x + 34) + ' ' + (y - 68) +
        ' Q ' + (x + 54) + ' ' + (y - 106) + ' ' + (x + 83) + ' ' + (y - 108) +
        ' L ' + (x + 112) + ' ' + (y - 108) +
        ' Q ' + (x + 143) + ' ' + (y - 102) + ' ' + (x + 162) + ' ' + (y - 70) +
        ' L ' + (x + 183) + ' ' + (y - 62) +
        ' Q ' + (x + 199) + ' ' + (y - 56) + ' ' + (x + 201) + ' ' + (y - 42) +
        ' L ' + (x + 201) + ' ' + (y - 18) + ' L ' + (x + 184) + ' ' + (y - 18) +
        ' A 22 22 0 0 0 ' + (x + 140) + ' ' + (y - 18) +
        ' L ' + (x + 68) + ' ' + (y - 18) +
        ' A 22 22 0 0 0 ' + (x + 24) + ' ' + (y - 18) + ' Z',
      fill: PANEL, stroke: INK, 'stroke-width': 1.2, 'stroke-linejoin': 'round'
    }, group);
    el('path', {
      d: 'M ' + (x + 48) + ' ' + (y - 72) + ' Q ' + (x + 60) + ' ' + (y - 98) +
        ' ' + (x + 82) + ' ' + (y - 100) + ' L ' + (x + 96) + ' ' + (y - 100) +
        ' L ' + (x + 96) + ' ' + (y - 72) + ' Z',
      fill: 'none', stroke: INK70, 'stroke-width': 1.1
    }, group);
    el('path', {
      d: 'M ' + (x + 104) + ' ' + (y - 100) + ' L ' + (x + 114) + ' ' + (y - 100) +
        ' Q ' + (x + 136) + ' ' + (y - 95) + ' ' + (x + 150) + ' ' + (y - 72) +
        ' L ' + (x + 104) + ' ' + (y - 72) + ' Z',
      fill: 'none', stroke: INK70, 'stroke-width': 1.1
    }, group);
    [x + 46, x + 162].forEach(function (wheelX) {
      el('circle', { cx: wheelX, cy: y - 18, r: 21, fill: PAPER, stroke: INK, 'stroke-width': 1.2 }, group);
      el('circle', { cx: wheelX, cy: y - 18, r: 8, fill: 'none', stroke: INK55, 'stroke-width': 1 }, group);
    });
    text('车：那我呢？', 118, 835, {
      id: 'accent-dialogue', 'font-family': 'var(--brush)',
      'font-size': 33, transform: 'rotate(-3 118 835)'
    }, group);
    el('ellipse', {
      id: 'accent-outline', cx: 203, cy: 944, rx: 120, ry: 76,
      fill: 'none', stroke: INK, 'stroke-width': 1.4,
      transform: 'rotate(-3 203 944)', opacity: .86
    }, group);
  }

  function drawHouse(parent) {
    var group = el('g', {
      'data-layout-zone': 'a2.scene.home',
      'data-slot-id': 'home',
      'data-repeat-unit': 'scene-object'
    }, parent);
    var x = 340;
    var y = 1000;
    var width = 190;
    var height = 150;
    el('rect', { x: x, y: y - height, width: width, height: height, fill: PANEL, stroke: INK, 'stroke-width': 1.2 }, group);
    el('path', {
      d: 'M ' + (x - 20) + ' ' + (y - height) + ' L ' + (x + width / 2) + ' ' + (y - height - 80) +
        ' L ' + (x + width + 20) + ' ' + (y - height) + ' Z',
      fill: 'url(#a2-hatch)', stroke: INK, 'stroke-width': 1.2
    }, group);
    el('rect', { x: x + 30, y: y - 84, width: 46, height: 84, fill: 'none', stroke: INK70, 'stroke-width': 1 }, group);
    el('rect', { x: x + 112, y: y - 112, width: 50, height: 46, fill: 'none', stroke: INK70, 'stroke-width': 1 }, group);
    line(x + 137, y - 112, x + 137, y - 66, { stroke: INK55, 'stroke-width': .8 }, group);
    line(x + 112, y - 89, x + 162, y - 89, { stroke: INK55, 'stroke-width': .8 }, group);
    text('HOME', x + width / 2, y - height - 100, {
      'font-family': MONO, 'font-size': 10, 'letter-spacing': 2.4,
      'text-anchor': 'middle', fill: INK45
    }, group);
  }

  function drawPerson(parent) {
    var group = el('g', {
      'data-layout-zone': 'a2.scene.person',
      'data-slot-id': 'pedestrian',
      'data-repeat-unit': 'scene-object'
    }, parent);
    var x = 617;
    var y = 1000;
    el('circle', { cx: x, cy: y - 103, r: 13, fill: PANEL, stroke: INK, 'stroke-width': 1.1 }, group);
    el('path', { d: 'M ' + x + ' ' + (y - 90) + ' Q ' + (x + 5) + ' ' + (y - 62) + ' ' + (x + 3) + ' ' + (y - 39), fill: 'none', stroke: INK, 'stroke-width': 1.5, 'stroke-linecap': 'round' }, group);
    el('path', { d: 'M ' + (x + 2) + ' ' + (y - 77) + ' Q ' + (x + 21) + ' ' + (y - 64) + ' ' + (x + 23) + ' ' + (y - 49), fill: 'none', stroke: INK, 'stroke-width': 1.8, 'stroke-linecap': 'round' }, group);
    el('path', { d: 'M ' + (x + 2) + ' ' + (y - 77) + ' Q ' + (x - 17) + ' ' + (y - 65) + ' ' + (x - 18) + ' ' + (y - 52), fill: 'none', stroke: INK, 'stroke-width': 1.8, 'stroke-linecap': 'round' }, group);
    el('path', { d: 'M ' + (x + 3) + ' ' + (y - 39) + ' Q ' + (x + 22) + ' ' + (y - 20) + ' ' + (x + 28) + ' ' + y, fill: 'none', stroke: INK, 'stroke-width': 1.5, 'stroke-linecap': 'round' }, group);
    el('path', { d: 'M ' + (x + 3) + ' ' + (y - 39) + ' Q ' + (x - 16) + ' ' + (y - 18) + ' ' + (x - 21) + ' ' + y, fill: 'none', stroke: INK, 'stroke-width': 1.5, 'stroke-linecap': 'round' }, group);
  }

  function drawCarWash(parent) {
    var group = el('g', {
      'data-layout-zone': 'a2.scene.car-wash',
      'data-slot-id': 'car-wash',
      'data-repeat-unit': 'scene-object'
    }, parent);
    var x = 710;
    var y = 1000;
    var width = 260;
    var height = 170;
    el('rect', { x: x, y: y - height, width: width, height: height, fill: PANEL, stroke: INK, 'stroke-width': 1.2 }, group);
    el('rect', { x: x + 32, y: y - height - 95, width: width - 64, height: 58, fill: PANEL, stroke: INK, 'stroke-width': 1.2 }, group);
    text('CAR WASH', x + width / 2, y - height - 108, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 2.4,
      'text-anchor': 'middle', fill: INK45
    }, group);
    text('洗 车', x + width / 2, y - height - 56, {
      'font-size': 23, 'font-weight': 400, 'letter-spacing': 5,
      'text-anchor': 'middle'
    }, group);
    el('rect', { x: x + 28, y: y - 116, width: 102, height: 116, fill: 'none', stroke: INK70, 'stroke-width': 1 }, group);
    for (var i = 1; i < 5; i += 1) {
      line(x + 28, y - 116 + i * 22, x + 130, y - 116 + i * 22, { stroke: INK45, 'stroke-width': .7 }, group);
    }
    el('rect', { x: x + 160, y: y - 102, width: 70, height: 66, fill: 'none', stroke: INK70, 'stroke-width': 1 }, group);
    line(x + 195, y - 102, x + 195, y - 36, { stroke: INK55, 'stroke-width': .8 }, group);
    [[978, 870, 3], [991, 895, 2], [980, 918, 4], [994, 943, 2], [983, 966, 3]].forEach(function (bubble) {
      el('circle', { cx: bubble[0], cy: bubble[1], r: bubble[2], fill: 'none', stroke: INK55, 'stroke-width': .8 }, group);
    });
  }

  function drawRoute(parent) {
    var group = el('g', {
      'data-layout-zone': 'a2.scene.route',
      'data-slot-id': 'walking-route'
    }, parent);
    el('path', {
      d: 'M 644 967 Q 672 948 710 952',
      fill: 'none', stroke: INK70, 'stroke-width': 1.5,
      'stroke-dasharray': '4 8'
    }, group);
    el('path', {
      d: 'M 701 945 L 712 952 L 702 960',
      fill: 'none', stroke: INK70, 'stroke-width': 1.6,
      'stroke-linecap': 'round', 'stroke-linejoin': 'round'
    }, group);
  }

  function drawMeasure(parent) {
    var group = el('g', {
      'data-layout-zone': 'a2.scene.measure',
      'data-slot-id': 'distance-evidence',
      'data-distance-meters': '50'
    }, parent);
    var x1 = 530;
    var x2 = 710;
    var y = 1062;
    line(x1, y, x2, y, { stroke: INK, 'stroke-width': 1.1 }, group);
    line(x1, y - 9, x1, y + 9, { stroke: INK, 'stroke-width': 1.1 }, group);
    line(x2, y - 9, x2, y + 9, { stroke: INK, 'stroke-width': 1.1 }, group);
    line(x1, y, x1, 1005, { stroke: INK45, 'stroke-width': .55, 'stroke-dasharray': '2 4' }, group);
    line(x2, y, x2, 1005, { stroke: INK45, 'stroke-width': .55, 'stroke-dasharray': '2 4' }, group);
    text('50 m', (x1 + x2) / 2, y + 34, {
      'font-family': MONO, 'font-size': 16, 'text-anchor': 'middle'
    }, group);
  }

  function drawScene() {
    var group = el('g', {
      'data-layout-zone': 'a2.scene',
      'data-slot-id': 'single-scenario-illustration',
      'data-component-id': 'native.paper-ink.evidence.scenario-illustration',
      'data-fixed-quantity': '4'
    });
    drawGround(group);
    drawCar(group);
    drawHouse(group);
    drawPerson(group);
    drawCarWash(group);
    drawRoute(group);
    drawMeasure(group);
  }

  function drawReadingGuide() {
    var group = el('g', { 'data-layout-zone': 'a2.reading-guide', 'data-slot-id': 'scenario-reading-guide' });
    line(90, 1140, 990, 1140, { stroke: INK45, 'stroke-width': .6 }, group);
    text('QUESTION → ANSWER → CHECK THE ACTUAL TASK', 90, 1169, {
      'font-family': MONO, 'font-size': 9, 'letter-spacing': 1.05, fill: INK45
    }, group);
    text('距离判断正确 · 行动对象错误', 990, 1169, {
      'font-size': 12, 'text-anchor': 'end', fill: INK45
    }, group);
  }

  function drawA2() {
    drawDefs();
    text('AI 看见了距离，却漏掉了真正的任务', 90, 214, {
      'font-family': SERIF, 'font-size': 43, 'font-weight': 500
    });
    text('“走路更近”没有错，但洗车需要把车送到店里。', 90, 266, {
      'font-size': 19, fill: INK70
    });
    drawDialogue('question', 318, 136, '我 · 提问', [
      '洗车店离我家 50 米，', '我应该开车去还是走路去？'
    ]);
    drawDialogue('answer', 474, 104, 'AI · 回答', [
      '建议您走路前往，绿色出行。'
    ]);
    drawSectionLabel();
    drawScene();
    drawReadingGuide();
  }

  drawA2();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
