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
  var PROBLEM_GROUPS = [
    {
      eyebrow: 'WHY IT HURTS', title: '两个失效信号',
      items: [
        { title: '答非所问', note1: '长尾问题命中错误知识', note2: '用户反复追问同一件事', icon: 'doc' },
        { title: '知识过期', note1: '文档月更、产品周更', note2: '检索常命中旧口径', icon: 'ruler' }
      ]
    },
    {
      eyebrow: 'THE COST', title: '落到季度账上的两笔',
      items: [
        { title: '幻觉入账', note1: '生成幻觉率一度到 12%', note2: '长尾抽检 480 条', icon: 'ledger' },
        { title: '定位耗时', note1: '坏例平均 2.6 天定位', note2: '跨三个团队复盘', icon: 'clock' }
      ]
    }
  ];
  var STEPS = [
    { title: '意图解析', code: 'PARSE', note: '三路信号汇入槽位', icon: 'parse' },
    { title: '知识召回', code: 'RETRIEVE', note: '当周口径一次对齐', icon: 'retrieve' },
    { title: '工具编排', code: 'ORCHESTRATE', note: '工具与回写交叠', icon: 'orchestrate' },
    { title: '生成校验', code: 'VERIFY', note: '生成前拦下越界', icon: 'verify' },
    { title: '灰度放量', code: 'CANARY', note: '小流量观察再放量', icon: 'canary' }
  ];
  var EVIDENCE = [
    { title: '评测与复核', note: '320 例 · 双人一致率 0.91' },
    { title: '灰度与采样', note: '灰度 2 周 · Trace 640 条' },
    { title: '回归保障', note: '旧例通过率 100% · 零退化' }
  ];
  var KPIS = [
    { value: '91%', label: '召回命中率' },
    { value: '-58%', label: 'TTFT P95' },
    { value: '96%', label: '质检达标率' },
    { value: '420万', label: '日调用量' }
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

  function sectionLabel(index, en, cn, y) {
    var group = el('g', { 'data-layout-zone': 's3.section-' + index, 'data-slot-id': 'section-' + index });
    text('0' + index + ' / ' + en, 90, y, {
      'font-family': MONO, 'font-size': 10.5, 'letter-spacing': 1.55, fill: INK45
    }, group);
    line(350, y - 4, 865, y - 4, { stroke: INK45, 'stroke-width': .6 }, group);
    text(cn, 990, y, { 'font-size': 13, 'text-anchor': 'end', fill: INK70 }, group);
  }

  function drawProblemIcon(kind, x, y, parent) {
    if (kind === 'doc' || kind === 'ledger') {
      el('rect', { x: x - 12, y: y - 15, width: 24, height: 30, fill: PAPER, stroke: INK80, 'stroke-width': 1 }, parent);
      line(x - 7, y - 6, x + 7, y - 6, { stroke: INK45, 'stroke-width': .7 }, parent);
      line(x - 7, y, x + 7, y, { stroke: INK45, 'stroke-width': .7 }, parent);
      line(x - 7, y + 6, x + 5, y + 6, { stroke: INK45, 'stroke-width': .7 }, parent);
      if (kind === 'doc') {
        line(x - 10, y + 12, x + 10, y - 12, { stroke: INK70, 'stroke-width': 1 }, parent);
      } else {
        el('circle', { cx: x + 8, cy: y - 11, r: 2.5, fill: INK70 }, parent);
      }
      return;
    }
    if (kind === 'ruler') {
      line(x - 17, y - 5, x + 17, y - 5, { stroke: INK80 }, parent);
      line(x - 17, y + 7, x + 17, y + 7, { stroke: INK80 }, parent);
      [-13, -5, 3, 11].forEach(function (offset) {
        line(x + offset, y - 5, x + offset, y, { stroke: INK45, 'stroke-width': .7 }, parent);
      });
      line(x, y - 12, x, y + 14, { stroke: INK70, 'stroke-width': .7, 'stroke-dasharray': '2 3' }, parent);
      return;
    }
    el('circle', { cx: x, cy: y, r: 14, fill: PAPER, stroke: INK80, 'stroke-width': 1 }, parent);
    line(x, y, x, y - 9, { stroke: INK70 }, parent);
    line(x, y, x + 8, y + 4, { stroke: INK70, 'stroke-width': 1.1 }, parent);
    el('circle', { cx: x, cy: y, r: 2, fill: INK }, parent);
  }

  function drawProblemGroup(group, groupIndex) {
    var x = groupIndex === 0 ? 90 : 555;
    var width = 435;
    var node = el('g', {
      'data-layout-zone': 's3.problem-group-' + (groupIndex + 1),
      'data-slot-id': groupIndex === 0 ? 'problem-list' : 'problem-cost'
    });
    text(group.eyebrow, x, 356, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.45, fill: INK45
    }, node);
    text(group.title, x, 388, { 'font-size': 20, 'font-weight': 400 }, node);
    line(x, 405, x + width, 405, { stroke: INK45, 'stroke-width': .55 }, node);
    group.items.forEach(function (item, itemIndex) {
      var itemY = 452 + itemIndex * 104;
      var itemGroup = el('g', {
        'data-layout-zone': 's3.problem-item-' + (groupIndex * 2 + itemIndex + 1),
        'data-slot-id': 'problem-item-' + (groupIndex * 2 + itemIndex + 1)
      }, node);
      drawProblemIcon(item.icon, x + 18, itemY, itemGroup);
      text(item.title, x + 52, itemY - 3, { 'font-size': 16.5, 'font-weight': 400 }, itemGroup);
      text(item.note1 + '；' + item.note2, x + 52, itemY + 22, {
        'font-size': 12.2, fill: INK70
      }, itemGroup);
    });
  }

  function drawProblemToFix() {
    var group = el('g', {
      'data-layout-zone': 's3.problem-to-fix',
      'data-slot-id': 'problem-to-fix',
      'data-flow-shape': 'single-simple-down',
      'data-arrow-count': '1'
    });
    line(540, 590, 540, 634, { stroke: INK80, 'stroke-width': 1.1 }, group);
    el('path', {
      d: 'M 534 626 L 540 634 L 546 626', fill: 'none',
      stroke: INK80, 'stroke-width': 1.1,
      'stroke-linecap': 'round', 'stroke-linejoin': 'round'
    }, group);
  }

  function drawStepIcon(kind, x, y, parent) {
    if (kind === 'parse') {
      line(x - 10, y - 8, x, y, { stroke: INK70 }, parent);
      line(x - 10, y + 8, x, y, { stroke: INK70 }, parent);
      line(x, y, x + 11, y, { stroke: INK80, 'stroke-width': 1.2 }, parent);
      return;
    }
    if (kind === 'retrieve') {
      el('circle', { cx: x - 2, cy: y - 2, r: 8, fill: 'none', stroke: INK80, 'stroke-width': 1 }, parent);
      line(x + 4, y + 4, x + 11, y + 11, { stroke: INK80, 'stroke-width': 1.2 }, parent);
      return;
    }
    if (kind === 'orchestrate') {
      el('circle', { cx: x - 9, cy: y, r: 3, fill: INK70 }, parent);
      el('circle', { cx: x + 9, cy: y - 8, r: 3, fill: INK70 }, parent);
      el('circle', { cx: x + 9, cy: y + 8, r: 3, fill: INK70 }, parent);
      line(x - 6, y, x + 6, y - 8, { stroke: INK70 }, parent);
      line(x - 6, y, x + 6, y + 8, { stroke: INK70 }, parent);
      return;
    }
    if (kind === 'verify') {
      el('rect', { x: x - 10, y: y - 10, width: 20, height: 20, fill: 'none', stroke: INK80, 'stroke-width': 1 }, parent);
      el('path', {
        d: 'M ' + (x - 6) + ' ' + y + ' L ' + (x - 1) + ' ' + (y + 5) + ' L ' + (x + 7) + ' ' + (y - 5),
        fill: 'none', stroke: INK80, 'stroke-width': 1.2
      }, parent);
      return;
    }
    line(x - 10, y + 9, x + 10, y + 9, { stroke: INK70 }, parent);
    [6, 11, 17].forEach(function (height, index) {
      el('rect', { x: x - 8 + index * 7, y: y + 8 - height, width: 4, height: height, fill: index === 2 ? INK : INK70 }, parent);
    });
  }

  function drawPipelineFlow(positions) {
    var group = el('g', { 'data-layout-zone': 's3.pipeline-flow', 'data-slot-id': 'pipeline-flow' });
    for (var index = 0; index < positions.length - 1; index += 1) {
      line(positions[index].x + 30, 741, positions[index + 1].x - 30, 741, {
        stroke: INK70, 'stroke-width': .9
      }, group);
      el('path', {
        d: 'M ' + (positions[index + 1].x - 38) + ' 735 L ' + (positions[index + 1].x - 30) + ' 741 L ' + (positions[index + 1].x - 38) + ' 747',
        fill: 'none', stroke: INK80, 'stroke-width': 1
      }, group);
    }
  }

  function drawStep(step, index, position) {
    var group = el('g', {
      'data-layout-zone': 's3.pipeline-step-' + (index + 1),
      'data-slot-id': 'pipeline-step-' + (index + 1)
    });
    text(String(index + 1).padStart(2, '0'), position.x, 697, {
      'font-family': MONO, 'font-size': 9, 'letter-spacing': 1.1,
      'text-anchor': 'middle', fill: FUNCTIONAL
    }, group);
    el('circle', {
      cx: position.x, cy: 741, r: 29, fill: PAPER, stroke: INK80, 'stroke-width': 1
    }, group);
    drawStepIcon(step.icon, position.x, 741, group);
    text(step.title, position.x, 802, {
      'font-size': 16.5, 'font-weight': 400, 'text-anchor': 'middle'
    }, group);
    text(step.code, position.x, 824, {
      'font-family': MONO, 'font-size': 8.3, 'letter-spacing': .8,
      'text-anchor': 'middle', fill: INK45
    }, group);
    text(step.note, position.x, 848, {
      'font-size': 11.5, 'text-anchor': 'middle', fill: INK70
    }, group);
  }

  function drawPipeline() {
    var positions = [130, 335, 540, 745, 950].map(function (x) { return { x: x }; });
    drawPipelineFlow(positions);
    STEPS.forEach(function (step, index) { drawStep(step, index, positions[index]); });
  }

  function drawEvidence() {
    var group = el('g', { 'data-layout-zone': 's3.evidence-band', 'data-slot-id': 'evidence-band' });
    EVIDENCE.forEach(function (item, index) {
      var x = 90 + index * 300;
      var itemGroup = el('g', {
        'data-layout-zone': 's3.evidence-' + (index + 1),
        'data-slot-id': 'evidence-' + (index + 1)
      }, group);
      line(x, 941, x + 280, 941, { stroke: INK45, 'stroke-width': .55 }, itemGroup);
      el('path', {
        d: 'M ' + x + ' 978 L ' + (x + 7) + ' 985 L ' + (x + 18) + ' 971',
        fill: 'none', stroke: INK80, 'stroke-width': 1.15
      }, itemGroup);
      text(item.title, x + 28, 984, { 'font-size': 16, 'font-weight': 400 }, itemGroup);
      text(item.note, x, 982, { 'font-size': 11.5, fill: INK70 }, itemGroup);
    });
  }

  function drawKpis() {
    var group = el('g', { 'data-layout-zone': 's3.kpi-band', 'data-slot-id': 'result-band' });
    line(90, 1092, 990, 1092, { stroke: INK80, 'stroke-width': .8 }, group);
    line(90, window.PORTRAIT_SAFE.bottom, 990, window.PORTRAIT_SAFE.bottom, { stroke: INK45, 'stroke-width': .55 }, group);
    KPIS.forEach(function (kpi, index) {
      var width = 225;
      var x = 90 + index * width;
      var kpiGroup = el('g', {
        'data-layout-zone': 's3.kpi-' + (index + 1),
        'data-slot-id': 'kpi-' + (index + 1)
      }, group);
      if (index > 0) line(x, 1108, x, 1235, { stroke: INK45, 'stroke-width': .55 }, kpiGroup);
      text(kpi.value, x + width / 2, 1172, {
        id: 's3-num-' + index, 'font-family': SERIF, 'font-size': 39,
        'font-weight': 500, 'text-anchor': 'middle'
      }, kpiGroup);
      text(kpi.label, x + width / 2, 1203, {
        id: 's3-label-' + index, 'font-size': 12,
        'text-anchor': 'middle', fill: INK70
      }, kpiGroup);
    });
  }

  function drawS3() {
    text('四项问题，落进五步 Agent 修复链', 90, 220, {
      id: 'sample-focus', 'font-family': SERIF, 'font-size': 48, 'font-weight': 500
    });
    text('失效信号和成本分组呈现，再用评测、灰度与回归证据校验结果。', 90, 272, {
      'font-size': 21.5, fill: INK70
    });
    sectionLabel(1, 'PROBLEM & COST', '两组问题', 316);
    PROBLEM_GROUPS.forEach(drawProblemGroup);
    drawProblemToFix();
    sectionLabel(2, 'THE FIX · AGENT PIPELINE', '五步横向链', 660);
    drawPipeline();
    sectionLabel(3, 'RELEASE EVIDENCE', '三道发布证据', 908);
    drawEvidence();
    sectionLabel(4, 'MEASURED RESULT', '四项结果', 1060);
    drawKpis();
  }

  drawS3();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
