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
  var BRUSH = 'var(--brush)';

  var STEPS = [
    { no: '01', text: '选了哪个 Skill？' },
    { no: '02', text: '调了什么工具？' },
    { no: '03', text: '校验跑了吗？' }
  ];
  var ANNOTATIONS = [
    { no: '01', en: 'NON-DETERMINISM', title: '非确定性', lines: ['同样输入，不保证同样输出；', '一次跑通，只证明这次可以。'] },
    { no: '02', en: 'PROCESS BLACK-BOX', title: '过程黑盒', lines: ['最终回答正确，也可能选错 Skill、', '跳过校验或依赖偶然路径。'] },
    { no: '03', en: 'ERROR CASCADE', title: '错误级联', lines: ['路由、召回、工具参数的小偏差，', '会在多步执行中持续放大。'] }
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

  function downArrow(y1, y2, parent) {
    line(540, y1, 540, y2, {
      stroke: INK80, 'stroke-width': 1.15
    }, parent);
    el('path', {
      d: 'M 534 ' + (y2 - 8) + ' L 540 ' + y2 + ' L 546 ' + (y2 - 8),
      fill: 'none', stroke: INK80, 'stroke-width': 1.15
    }, parent);
  }

  function drawEndpoint(kind, y, titleValue) {
    var x = 410;
    var group = el('g', {
      'data-layout-zone': 'p1.' + kind,
      'data-slot-id': kind === 'input' ? 'known-input' : 'known-output'
    });
    el('rect', {
      x: x, y: y, width: 260, height: 104, rx: 10,
      fill: 'none', stroke: INK80, 'stroke-width': 1.1
    }, group);
    text(kind.toUpperCase(), x + 130, y + 30, {
      'font-family': MONO, 'font-size': 10, 'letter-spacing': 1.8,
      'text-anchor': 'middle', fill: INK45
    }, group);
    text(titleValue, x + 130, y + 70, {
      'font-size': 19, 'font-weight': 400, 'text-anchor': 'middle'
    }, group);
    if (kind === 'output') {
      el('path', {
        d: 'M ' + (x + 196) + ' ' + (y + 61) + ' L ' + (x + 206) + ' ' + (y + 71) + ' L ' + (x + 225) + ' ' + (y + 50),
        fill: 'none', stroke: INK, 'stroke-width': 1.8,
        'stroke-linecap': 'round', 'stroke-linejoin': 'round'
      }, group);
      line(x + 215, y + 54, x + 225, y + 64, { stroke: INK80, 'stroke-width': 1.1 }, group);
      line(x + 225, y + 54, x + 215, y + 64, { stroke: INK80, 'stroke-width': 1.1 }, group);
    }
  }

  function drawBlackbox() {
    var x = 180;
    var y = 500;
    var width = 720;
    var height = 286;
    var group = el('g', {
      'data-layout-zone': 'p1.blackbox', 'data-slot-id': 'process-blackbox'
    });
    el('rect', { x: x, y: y, width: width, height: height, fill: 'none', stroke: INK80, 'stroke-width': 1.2 }, group);
    text('PROCESS BLACK-BOX', x + 18, y + 30, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.5, fill: INK45
    }, group);
    text('THE PROCESS IN BETWEEN IS INVISIBLE', x + width - 18, y + 30, {
      'data-xp-anchor': 'blackbox-note',
      'font-family': MONO, 'font-size': 8, 'letter-spacing': .9,
      'text-anchor': 'end', fill: INK45
    }, group);
    line(x + width - 158, y + 41, x + width - 18, y + 41, { stroke: FUNCTIONAL, 'stroke-width': 2 }, group);

    var positions = [220, 465, 710];
    var flow = el('g', {
      'data-layout-zone': 'p1.blackbox-flow', 'data-slot-id': 'blackbox-step-flow'
    }, group);
    STEPS.forEach(function (step, index) {
      var stepX = positions[index];
      var stepGroup = el('g', {
        'data-layout-zone': 'p1.blackbox-step-' + (index + 1),
        'data-slot-id': 'blackbox-step-' + (index + 1)
      }, group);
      el('rect', {
        x: stepX, y: 590, width: 150, height: 104, rx: 8,
        fill: PAPER, stroke: INK70, 'stroke-width': 1,
        'stroke-dasharray': '6 5'
      }, stepGroup);
      text(step.no, stepX + 14, 612, {
        'font-family': MONO, 'font-size': 8.5, fill: INK45
      }, stepGroup);
      text('?', stepX + 75, 647, {
        'font-family': MONO, 'font-size': 24, 'text-anchor': 'middle', fill: INK45
      }, stepGroup);
      text(step.text.replace('？', ''), stepX + 75, 676, {
        'font-size': 11, 'text-anchor': 'middle', fill: INK70
      }, stepGroup);
      if (index < 2) {
        line(stepX + 158, 642, positions[index + 1] - 8, 642, {
          stroke: INK80, 'stroke-width': 1
        }, flow);
        el('path', {
          d: 'M ' + (positions[index + 1] - 16) + ' 636 L ' + (positions[index + 1] - 8) + ' 642 L ' + (positions[index + 1] - 16) + ' 648',
          fill: 'none', stroke: INK80, 'stroke-width': 1
        }, flow);
      }
    });

    var cascade = el('g', {
      'data-layout-zone': 'p1.error-cascade', 'data-slot-id': 'error-cascade'
    }, group);
    el('polyline', {
      points: '220,742 318,724 416,750 514,726 612,754 710,730 860,760',
      fill: 'none', stroke: INK70, 'stroke-width': 1,
      'stroke-dasharray': '3 4'
    }, cascade);
  }

  function drawVerticalFlow() {
    var group = el('g', {
      'data-layout-zone': 'p1.primary-flow',
      'data-slot-id': 'input-blackbox-output-flow',
      'data-flow-layout': 'vertical-input-blackbox-output'
    });
    downArrow(454, 492, group);
    downArrow(794, 832, group);
  }

  function drawAnnotations() {
    var band = el('g', {
      'data-layout-zone': 'p1.annotation-band',
      'data-slot-id': 'numbered-annotations'
    });
    ANNOTATIONS.forEach(function (annotation, index) {
      var x = 90 + index * 310;
      var group = el('g', {
        'data-layout-zone': 'p1.annotation-' + (index + 1),
        'data-slot-id': 'annotation-' + (index + 1)
      }, band);
      line(x, 1014, x + 280, 1014, {
        stroke: INK80, 'stroke-width': index === 1 ? 1.4 : .9
      }, group);
      text(annotation.no + ' · ' + annotation.en, x, 1048, {
        'font-family': MONO, 'font-size': 8.5, 'letter-spacing': .9, fill: INK45
      }, group);
      text(annotation.title, x, 1088, { 'font-size': 19, 'font-weight': 400 }, group);
      annotation.lines.forEach(function (copy, lineIndex) {
        text(copy, x, 1125 + lineIndex * 27, { 'font-size': 12.5, fill: INK70 }, group);
      });
    });
  }

  function drawP1() {
    text('答案过关，不等于过程可靠', 90, 220, {
      'font-family': SERIF, 'font-size': 48, 'font-weight': 500
    });
    text('输入、不可见过程与输出沿纵向依次展开，风险仍在下方解释。', 90, 272, {
      'font-size': 20.5, fill: INK70
    });
    text('01 / INVISIBLE PROCESS', 90, 350, {
      'font-family': MONO, 'font-size': 10.5, 'letter-spacing': 1.6, fill: INK45
    });
    text('INPUT → BLACK BOX → OUTPUT', 990, 350, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.2,
      'text-anchor': 'end', fill: INK45
    });
    drawEndpoint('input', 350, '同一输入');
    drawBlackbox();
    drawEndpoint('output', 840, '看似正确的回答');
    drawVerticalFlow();
    text('答对了，也可能只是运气', 810, 925, {
      id: 'sample-focus', 'font-family': BRUSH, 'font-size': 18,
      'text-anchor': 'middle', fill: INK, transform: 'rotate(-2 810 925)'
    });
    text('02 / NUMBERED RISKS', 90, 980, {
      'font-family': MONO, 'font-size': 10.5, 'letter-spacing': 1.6, fill: INK45
    });
    drawAnnotations();
  }

  drawP1();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
