(function () {
  'use strict';

  var svg = document.querySelector('.scene');
  var NS = 'http://www.w3.org/2000/svg';
  var INK = 'var(--ink)';
  var INK80 = 'var(--ink-80)';
  var INK70 = 'var(--ink-70)';
  var INK45 = 'var(--ink-45)';
  var PANEL = 'var(--paper-panel)';
  var PAPER = 'var(--paper)';
  var FUNCTIONAL = 'var(--wp-color-functional)';
  var SANS = 'var(--sans)';
  var MONO = 'var(--mono)';
  var SERIF = 'var(--serif)';

  var LAYERS = [
    {
      slot: 'input', no: '01', en: 'INPUT', cn: '输入边界',
      detail: '数据来源 · 使用权限 · 质量门槛', proof: 'SOURCE · ACCESS · QUALITY',
      icon: 'filter', fill: PANEL, component: 'native.paper-ink.semantic.statement-band'
    },
    {
      slot: 'reasoning', no: '02', en: 'REASONING', cn: '推理约束',
      detail: '任务指令 · 工具权限 · 异常回退', proof: 'PROMPT · TOOL · FALLBACK',
      icon: 'brain', fill: PAPER, component: 'native.paper-ink.semantic.process-strip'
    },
    {
      slot: 'evaluation', no: '03', en: 'EVALUATION', cn: '结果评测',
      detail: '基准问题 · 通过阈值 · 失败样本', proof: 'BENCHMARK · GATE · FAILURE',
      icon: 'chart', fill: PANEL, component: 'native.paper-ink.semantic.metric-band'
    },
    {
      slot: 'governance', no: '04', en: 'GOVERNANCE', cn: '上线治理',
      detail: '审批责任 · 运行监控 · 全程审计', proof: 'OWNER · MONITOR · AUDIT',
      icon: 'shield', fill: PAPER, component: 'native.paper-ink.semantic.evidence-panel'
    }
  ];

  var BAND_X = 90;
  var BAND_WIDTH = 900;
  var BAND_HEIGHT = 188;
  var BAND_Y = [344, 568, 792, 1016];

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

  function sectionLabel(y) {
    var group = el('g', { 'data-layout-zone': 'r6.section', 'data-slot-id': 'section-label' });
    text('01 / TRUSTED DELIVERY STACK', 90, y, {
      'font-family': MONO, 'font-size': 11, 'letter-spacing': 1.8, fill: INK45
    }, group);
    line(384, y - 4, 990, y - 4, { stroke: INK45, 'stroke-width': .65 }, group);
    text('FOUR INDEPENDENT LAYERS', 990, y, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.35,
      'text-anchor': 'end', fill: INK45
    }, group);
  }

  function drawFilter(cx, cy, parent, stroke) {
    el('path', {
      d: 'M ' + (cx - 31) + ' ' + (cy - 29) + ' L ' + (cx + 31) + ' ' + (cy - 29) +
        ' L ' + (cx + 11) + ' ' + (cy - 5) + ' L ' + (cx + 11) + ' ' + (cy + 21) +
        ' L ' + (cx - 11) + ' ' + (cy + 31) + ' L ' + (cx - 11) + ' ' + (cy - 5) + ' Z',
      fill: 'none', stroke: stroke, 'stroke-width': 1.35,
      'stroke-linecap': 'round', 'stroke-linejoin': 'round'
    }, parent);
  }

  function drawBrain(cx, cy, parent, stroke) {
    el('path', {
      d: 'M ' + cx + ' ' + (cy - 32) + ' Q ' + (cx - 13) + ' ' + (cy - 39) + ' ' + (cx - 17) + ' ' + (cy - 26) +
        ' Q ' + (cx - 31) + ' ' + (cy - 25) + ' ' + (cx - 29) + ' ' + (cy - 10) +
        ' Q ' + (cx - 38) + ' ' + cy + ' ' + (cx - 29) + ' ' + (cy + 10) +
        ' Q ' + (cx - 34) + ' ' + (cy + 27) + ' ' + (cx - 18) + ' ' + (cy + 27) +
        ' Q ' + (cx - 12) + ' ' + (cy + 39) + ' ' + (cx - 2) + ' ' + (cy + 31) + ' L ' + cx + ' ' + (cy + 36) +
        ' M ' + cx + ' ' + (cy - 32) + ' Q ' + (cx + 13) + ' ' + (cy - 39) + ' ' + (cx + 17) + ' ' + (cy - 26) +
        ' Q ' + (cx + 31) + ' ' + (cy - 25) + ' ' + (cx + 29) + ' ' + (cy - 10) +
        ' Q ' + (cx + 38) + ' ' + cy + ' ' + (cx + 29) + ' ' + (cy + 10) +
        ' Q ' + (cx + 34) + ' ' + (cy + 27) + ' ' + (cx + 18) + ' ' + (cy + 27) +
        ' Q ' + (cx + 12) + ' ' + (cy + 39) + ' ' + (cx + 2) + ' ' + (cy + 31) + ' L ' + cx + ' ' + (cy + 36),
      fill: 'none', stroke: stroke, 'stroke-width': 1.25,
      'stroke-linecap': 'round', 'stroke-linejoin': 'round'
    }, parent);
    line(cx, cy - 31, cx, cy + 35, { stroke: stroke, 'stroke-width': .65, opacity: .48 }, parent);
  }

  function drawChart(cx, cy, parent, stroke) {
    [[-23, -5, 15], [-7, -24, 34], [9, 6, 10]].forEach(function (bar, index) {
      el('rect', {
        x: cx + bar[0], y: cy + bar[1], width: 10, height: bar[2], fill: 'none',
        stroke: stroke, 'stroke-width': index === 1 ? 1.55 : 1,
        opacity: index === 1 ? .9 : .68
      }, parent);
    });
    line(cx - 30, cy + 28, cx + 31, cy + 28, { stroke: INK45, 'stroke-width': .65 }, parent);
  }

  function drawShield(cx, cy, parent, stroke) {
    el('path', {
      d: 'M ' + cx + ' ' + (cy - 35) + ' Q ' + (cx + 18) + ' ' + (cy - 22) + ' ' + (cx + 34) + ' ' + (cy - 22) +
        ' L ' + (cx + 34) + ' ' + (cy + 1) + ' Q ' + (cx + 34) + ' ' + (cy + 25) + ' ' + cx + ' ' + (cy + 37) +
        ' Q ' + (cx - 34) + ' ' + (cy + 25) + ' ' + (cx - 34) + ' ' + (cy + 1) + ' L ' + (cx - 34) + ' ' + (cy - 22) +
        ' Q ' + (cx - 18) + ' ' + (cy - 22) + ' ' + cx + ' ' + (cy - 35) + ' Z',
      fill: 'none', stroke: stroke, 'stroke-width': 1.3, 'stroke-linejoin': 'round'
    }, parent);
    el('path', {
      d: 'M ' + (cx - 17) + ' ' + cy + ' L ' + (cx - 4) + ' ' + (cy + 13) + ' L ' + (cx + 20) + ' ' + (cy - 13),
      fill: 'none', stroke: stroke, 'stroke-width': 1.65,
      'stroke-linecap': 'round', 'stroke-linejoin': 'round'
    }, parent);
  }

  function drawIcon(kind, cx, cy, parent, stroke) {
    var icons = { filter: drawFilter, brain: drawBrain, chart: drawChart, shield: drawShield };
    icons[kind](cx, cy, parent, stroke);
  }

  function drawBand(layer, index) {
    var y = BAND_Y[index];
    var group = el('g', {
      'data-layout-zone': 'r6.band-' + (index + 1),
      'data-slot-id': layer.slot,
      'data-repeat-unit': 'layer',
      'data-component-id': layer.component
    });
    /* 横版仅输入边界层承载主题身份色;推理、评测、治理三层保持中性墨。 */
    var accent = index === 0;
    el('rect', {
      x: BAND_X, y: y, width: BAND_WIDTH, height: BAND_HEIGHT,
      fill: layer.fill, stroke: accent ? FUNCTIONAL : INK80, 'stroke-width': 1
    }, group);
    text(layer.no + ' / ' + layer.en, BAND_X + 28, y + 37, Object.assign({ 'data-xp-anchor': 'layer-code',
      'font-family': MONO, 'font-size': 11, 'letter-spacing': 1.8, fill: accent ? FUNCTIONAL : INK45
    }, index === 0 ? { id: 'r6-focus-input' } : {}), group);
    text(layer.proof, BAND_X + BAND_WIDTH - 28, y + 37, {
      'font-family': MONO, 'font-size': 10, 'letter-spacing': 1.25,
      'text-anchor': 'end', fill: INK45
    }, group);
    var iconGroup = el('g', {
      'data-layout-zone': 'r6.icon-' + (index + 1),
      'data-slot-id': layer.slot + '-icon',
      'data-icon-source': 'redraw-v3:' + (layer.icon === 'chart' ? 'chart-bar' : layer.icon === 'shield' ? 'shield-check' : layer.icon)
    }, group);
    drawIcon(layer.icon, BAND_X + 76, y + 123, iconGroup, accent ? FUNCTIONAL : INK80);
    text(layer.cn, BAND_X + 166, y + 111, {
      'font-size': 29, 'font-weight': 400, fill: INK
    }, group);
    text(layer.detail, BAND_X + 166, y + 153, {
      'font-size': 19, fill: INK70
    }, group);
  }

  function drawStack() {
    var group = el('g', {
      'data-layout-zone': 'r6.stack',
      'data-slot-id': 'input-reasoning-evaluation-governance',
      'data-fixed-quantity': '4'
    });
    LAYERS.forEach(function (layer, index) { drawBand(layer, index); });
    document.querySelectorAll('[data-layout-zone^="r6.band-"]').forEach(function (node) {
      group.appendChild(node);
    });
  }

  function drawR6() {
    text('可信交付，要把四层边界逐项守住', 90, 214, {
      'font-family': SERIF, 'font-size': 46, 'font-weight': 500
    });
    text('输入、推理、评测与治理彼此独立，又共同决定系统能否安全上线。', 90, 266, {
      'font-size': 20, fill: INK70
    });
    sectionLabel(309);
    drawStack();
  }

  drawR6();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
