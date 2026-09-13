(function () {
  'use strict';

  var svg = document.querySelector('.scene');
  var NS = 'http://www.w3.org/2000/svg';
  var INK = 'var(--ink)';
  var INK80 = 'var(--ink-80)';
  var INK70 = 'var(--ink-70)';
  var INK45 = 'var(--ink-45)';
  var PAPER = 'var(--paper)';
  var FUNCTIONAL = 'var(--wp-color-functional)';
  var SANS = 'var(--sans)';
  var MONO = 'var(--mono)';
  var SERIF = 'var(--serif)';
  var AXIS_X = 540;
  var UNKNOWN_Y = [585, 685, 785, 885, 985];

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

  function arrow(startY, endY, x, parent) {
    line(x, startY, x, endY, {
      class: 'i2-unknown-track', 'data-i2-unknown-track': 'true',
      stroke: INK, 'stroke-width': 1.15, 'stroke-dasharray': '5 6'
    }, parent);
    el('path', {
      class: 'i2-unknown-track', 'data-i2-unknown-track': 'true',
      d: 'M ' + (x - 5) + ' ' + (endY - 7) + ' L ' + x + ' ' + endY +
        ' L ' + (x + 5) + ' ' + (endY - 7),
      fill: 'none', stroke: INK, 'stroke-width': 1.15
    }, parent);
  }

  function knownEndpoint(kind, cardY, eyebrow, titleValue, noteValue) {
    var group = el('g', {
      'data-layout-zone': 'i2.known-' + kind,
      'data-slot-id': 'known-' + kind
    });
    el('rect', {
      x: 360, y: cardY, width: 360, height: 110,
      fill: 'none', stroke: INK, 'stroke-width': 1.1
    }, group);
    text(eyebrow, 540, cardY + 32, {
      'font-family': MONO, 'font-size': 12, 'letter-spacing': 1.5,
      'text-anchor': 'middle', fill: INK45
    }, group);
    var cy = cardY + 72;
    el('circle', { cx: 442, cy: cy, r: 24, fill: PAPER, stroke: INK, 'stroke-width': 1 }, group);
    if (kind === 'input') {
      line(430, cy, 454, cy, { stroke: INK, 'stroke-width': 1.3 }, group);
      el('path', { d: 'M 447 ' + (cy - 7) + ' L 455 ' + cy + ' L 447 ' + (cy + 7), fill: 'none', stroke: INK, 'stroke-width': 1.3 }, group);
    } else {
      el('path', { d: 'M 429 ' + cy + ' L 438 ' + (cy + 9) + ' L 456 ' + (cy - 11), fill: 'none', stroke: INK, 'stroke-width': 1.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, group);
    }
    text(titleValue, 486, cy + 2, {
      'font-size': 22, 'font-weight': 400
    }, group);
    text(noteValue, 486, cy + 30, {
      'font-size': 15, fill: INK70
    }, group);
  }

  function unknownStage(question, stageIndex) {
    var cy = UNKNOWN_Y[stageIndex];
    var group = el('g', {
      'data-layout-zone': 'i2.unknown-stage-' + (stageIndex + 1),
      'data-slot-id': 'unknown-stage-' + (stageIndex + 1)
    });
    el('circle', {
      class: 'i2-unknown-frame', 'data-i2-unknown-frame': 'true',
      cx: AXIS_X, cy: cy, r: 30, fill: PAPER,
      stroke: INK, 'stroke-width': 1.05, 'stroke-dasharray': '4 4'
    }, group);
    text('?', AXIS_X, cy + 10, {
      'font-family': MONO, 'font-size': 30, 'text-anchor': 'middle', fill: INK70
    }, group);
    text(('0' + (stageIndex + 1)).slice(-2), AXIS_X - 62, cy + 4, {
      'font-family': MONO, 'font-size': 12, 'letter-spacing': 1.1,
      'text-anchor': 'end', fill: INK45
    }, group);
    text(question, AXIS_X + 62, cy + 5, {
      'font-size': 16, fill: INK70
    }, group);
  }

  function drawI2() {
    text('大模型推理黑盒', 90, 220, {
      'font-family': SERIF, 'font-size': 52, 'font-weight': 500
    });
    text('输入与输出两端可见，中间推理只显示为纵向未知链。', 90, 274, {
      'font-size': 23, fill: INK70
    });

    text('INVISIBLE · WHAT THE LLM DOES INSIDE', 540, 372, { 'data-xp-anchor': 'unknown',
      'font-family': MONO, 'font-size': 11, 'letter-spacing': 2,
      'text-anchor': 'middle', fill: INK45
    });
    line(260, 396, 820, 396, { stroke: INK45, 'stroke-width': .65 }, svg);

    knownEndpoint('input', 420, 'KNOWN · INPUT', 'Prompt', '100 tokens');
    knownEndpoint('output', 1040, 'KNOWN · OUTPUT', 'Completion', 'answer returned');

    ['解析', '检索', '推演', '校验', '生成'].forEach(unknownStage);
    arrow(530, 552, AXIS_X, svg);
    for (var index = 0; index < UNKNOWN_Y.length - 1; index += 1) {
      arrow(UNKNOWN_Y[index] + 36, UNKNOWN_Y[index + 1] - 36, AXIS_X, svg);
    }
    arrow(1021, 1033, AXIS_X, svg);

    text('外部只能观察两端，不能把中间步骤误画成已知流程。', 540, 1196, {
      'font-size': 21, 'text-anchor': 'middle', fill: INK70
    });
    text('OBSERVED FROM OUTSIDE · TOTAL 1.8 S', 540, 1234, {
      'font-family': MONO, 'font-size': 12, 'letter-spacing': 1.5,
      'text-anchor': 'middle', fill: INK45
    });
  }

  drawI2();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
