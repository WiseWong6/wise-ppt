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

  var PAINS = [
    ['幻觉频发', '长尾问题缺乏知识接地', '幻觉率一度超 12%'],
    ['知识滞后', '产品以周迭代、文档以月更新', '过期文档频繁命中'],
    ['工具断裂', '检索、工具、生成链路黑盒', '坏例定位平均 2.6 天']
  ];
  var STEPS = [
    ['意图解析', 'PARSE'], ['知识召回', 'RETRIEVE'], ['工具编排', 'ORCHESTRATE'],
    ['生成校验', 'VERIFY'], ['灰度放量', 'CANARY'], ['追踪回放', 'REPLAY']
  ];
  var MODULES = ['模型网关', '向量检索', '提示词版本', '评测台', '可观测'];
  var KPIS = [
    ['-58%', 'TTFT P95'], ['91%', '召回命中率'], ['420万', '日调用量'], ['96%', '质检达标率']
  ];
  var STEP_X = [130, 294, 458, 622, 786, 950];

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

  function sectionLabel(index, en, cn, y) {
    var group = el('g', {
      'data-layout-zone': 'k3.section-' + index,
      'data-slot-id': 'section-' + index
    });
    text('0' + index + ' / ' + en, 90, y, {
      'font-family': MONO, 'font-size': 10.5, 'letter-spacing': 1.6, fill: INK45
    }, group);
    line(90, y + 9, 170, y + 9, { stroke: FUNCTIONAL, 'stroke-width': 2 }, group);
    line(322, y - 4, 990, y - 4, { stroke: INK45, 'stroke-width': .65 }, group);
    text(cn, 990, y, { 'font-size': 14, 'text-anchor': 'end', fill: INK70 }, group);
  }

  function drawPain(item, index) {
    var x = 90 + index * 306;
    var group = el('g', {
      'data-layout-zone': 'k3.pain-' + (index + 1),
      'data-slot-id': 'pain-' + (index + 1)
    });
    el('circle', { cx: x + 18, cy: 434, r: 15, fill: PAPER, stroke: INK80, 'stroke-width': 1 }, group);
    text('0' + (index + 1), x + 18, 438, {
      'font-family': MONO, 'font-size': 9.5, 'text-anchor': 'middle'
    }, group);
    text(item[0], x + 48, 440, { 'font-size': 20, 'font-weight': 400 }, group);
    text(item[1], x + 48, 478, { 'font-size': 13, fill: INK70 }, group);
    text(item[2], x + 48, 506, { 'font-size': 13, fill: INK70 }, group);
    line(x, 542, x + 270, 542, { stroke: INK45, 'stroke-width': .6 }, group);
  }

  function drawProblemMerge() {
    var group = el('g', {
      'data-layout-zone': 'k3.problem-to-solution',
      'data-slot-id': 'problem-to-solution',
      'data-flow-shape': 'single-simple-down',
      'data-arrow-count': '1'
    });
    line(540, 584, 540, 642, { stroke: INK80, 'stroke-width': 1.2 }, group);
    el('path', {
      d: 'M 534 634 L 540 642 L 546 634',
      fill: 'none', stroke: INK80, 'stroke-width': 1.2,
      'stroke-linecap': 'round', 'stroke-linejoin': 'round'
    }, group);
  }

  function drawStep(step, index) {
    var cx = STEP_X[index];
    var group = el('g', {
      'data-layout-zone': 'k3.pipeline-step-' + (index + 1),
      'data-slot-id': 'pipeline-step-' + (index + 1)
    });
    text(('0' + (index + 1)).slice(-2), cx, 713, {
      'font-family': MONO, 'font-size': 9, 'letter-spacing': 1.1,
      'text-anchor': 'middle', fill: INK45
    }, group);
    el('circle', { cx: cx, cy: 756, r: 26, fill: PAPER, stroke: INK80, 'stroke-width': 1 }, group);
    if (index === 0) {
      line(cx - 10, 748, cx, 756, { stroke: INK70 }, group);
      line(cx - 10, 764, cx, 756, { stroke: INK70 }, group);
      line(cx, 756, cx + 11, 756, { stroke: INK80, 'stroke-width': 1.2 }, group);
    } else if (index === 1) {
      el('circle', { cx: cx - 3, cy: 753, r: 8, fill: 'none', stroke: INK70, 'stroke-width': 1 }, group);
      line(cx + 3, 759, cx + 11, 767, { stroke: INK80, 'stroke-width': 1.2 }, group);
    } else if (index === 2) {
      [-9, 9].forEach(function (offset) { el('circle', { cx: cx + offset, cy: 756 + offset / 2, r: 3, fill: INK }, group); });
      line(cx - 6, 754, cx + 6, 760, { stroke: INK70 }, group);
    } else if (index === 3) {
      el('path', { d: 'M ' + (cx - 10) + ' 756 L ' + (cx - 2) + ' 764 L ' + (cx + 11) + ' 746', fill: 'none', stroke: INK80, 'stroke-width': 1.4 }, group);
    } else if (index === 4) {
      [8, 14, 20].forEach(function (height, barIndex) {
        el('rect', { x: cx - 12 + barIndex * 9, y: 768 - height, width: 5, height: height, fill: INK70 }, group);
      });
    } else {
      el('path', { d: 'M ' + (cx + 8) + ' 748 A 11 11 0 1 0 ' + (cx + 8) + ' 764', fill: 'none', stroke: INK70, 'stroke-width': 1.1 }, group);
      el('path', { d: 'M ' + (cx + 5) + ' 743 L ' + (cx + 11) + ' 748 L ' + (cx + 4) + ' 751', fill: 'none', stroke: INK80, 'stroke-width': 1 }, group);
    }
    text(step[0], cx, 807, { 'font-size': 15, 'font-weight': 400, 'text-anchor': 'middle' }, group);
    text(step[1], cx, 830, {
      'font-family': MONO, 'font-size': 8.5, 'letter-spacing': .7,
      'text-anchor': 'middle', fill: INK45
    }, group);
  }

  function drawPipeline() {
    var flow = el('g', { 'data-layout-zone': 'k3.pipeline-flow', 'data-slot-id': 'pipeline-flow' });
    for (var index = 0; index < STEP_X.length - 1; index += 1) {
      var from = STEP_X[index] + 32;
      var to = STEP_X[index + 1] - 32;
      line(from, 756, to, 756, { stroke: INK80, 'stroke-width': 1.05 }, flow);
      el('path', { d: 'M ' + (to - 6) + ' 751 L ' + to + ' 756 L ' + (to - 6) + ' 761', fill: 'none', stroke: INK80, 'stroke-width': 1.05 }, flow);
    }
    STEPS.forEach(drawStep);
  }

  function drawInfrastructure() {
    var group = el('g', { 'data-layout-zone': 'k3.infra-band', 'data-slot-id': 'infra-band' });
    line(90, 884, 990, 884, { stroke: INK80, 'stroke-width': .9 }, group);
    line(90, 1008, 990, 1008, { stroke: INK45, 'stroke-width': .6 }, group);
    text('AGENT INFRA 1.0 · BASE', 90, 922, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.5, fill: INK45
    }, group);
    MODULES.forEach(function (module, index) {
      var x = 150 + index * 195;
      var moduleGroup = el('g', {
        'data-layout-zone': 'k3.infra-module-' + (index + 1),
        'data-slot-id': 'infra-module-' + (index + 1)
      }, group);
      el('circle', { cx: x, cy: 943, r: 4, fill: INK70 }, moduleGroup);
      text(module, x + 14, 948, { 'font-size': 13.5, fill: INK70 }, moduleGroup);
    });
  }

  function drawKpis() {
    var group = el('g', { 'data-layout-zone': 'k3.kpi-band', 'data-slot-id': 'kpi-band' });
    KPIS.forEach(function (kpi, index) {
      var width = 225;
      var x = 90 + index * width;
      var kpiGroup = el('g', {
        'data-layout-zone': 'k3.kpi-' + (index + 1),
        'data-slot-id': 'kpi-' + (index + 1)
      }, group);
      if (index > 0) line(x, 1100, x, 1235, { stroke: INK45, 'stroke-width': .55 }, kpiGroup);
      text(kpi[0], x + width / 2, 1166, {
        id: 'k3-num-' + index, 'font-family': SERIF, 'font-size': 42,
        'font-weight': 500, 'text-anchor': 'middle', fill: INK
      }, kpiGroup);
      text(kpi[1], x + width / 2, 1202, {
        id: 'k3-label-' + index, 'font-family': MONO, 'font-size': 9.5,
        'letter-spacing': .8, 'text-anchor': 'middle', fill: INK70
      }, kpiGroup);
    });
    line(90, window.PORTRAIT_SAFE.bottom, 990, window.PORTRAIT_SAFE.bottom, { stroke: INK45, 'stroke-width': .65 }, group);
  }

  function drawK3() {
    text('三个根因，落进一条 Agent 链路', 90, 220, {
      id: 'sample-focus', 'font-family': SERIF, 'font-size': 49, 'font-weight': 500
    });
    text('三项问题整体进入六步横向流水线，再落到统一底座与结果。', 90, 272, {
      'font-size': 22, fill: INK70
    });
    sectionLabel(1, 'WHY IT HURTS', '三个根因', 340);
    PAINS.forEach(drawPain);
    drawProblemMerge();
    sectionLabel(2, 'THE FIX · AGENT PIPELINE', '六步链路', 668);
    drawPipeline();
    drawInfrastructure();
    sectionLabel(3, 'MEASURED RESULT', '四项结果', 1052);
    drawKpis();
  }

  drawK3();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
