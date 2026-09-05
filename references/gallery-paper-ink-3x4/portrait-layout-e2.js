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

  var DIVIDER_X = 540;
  var COLUMN_WIDTH = 420;
  var ROW_TOP = 500;
  var ROW_HEIGHT = 160;
  var COLUMNS = [
    {
      key: 'rag', x: 90,
      title: 'RAG · 来一条查一条',
      tag: 'MODE: RETRIEVE · LATENCY: 200 MS',
      rows: [
        { label: '触发时机', code: 'TRIGGER', lines: ['每条提问实时检索，', '命中即拼进上下文'] },
        { label: '更新成本', code: 'UPDATE', lines: ['知识改了即生效，', '无需重训、零额外算力'] },
        { label: '知识时效', code: 'FRESH', lines: ['知识库可随时增删，', '永远是最新版本'] },
        { label: '适用场景', code: 'SCENE', lines: ['动态知识库、文档', '频繁变动的业务'] }
      ]
    },
    {
      key: 'finetune', x: 570,
      title: '微调 · 攒一批训一次',
      tag: 'MODE: FINETUNE · CYCLE: 数日',
      rows: [
        { label: '触发时机', code: 'TRIGGER', lines: ['攒一批语料统一训练，', '训完才更新权重'] },
        { label: '更新成本', code: 'UPDATE', lines: ['改知识要重训，', '算力与时间成本高'] },
        { label: '知识时效', code: 'FRESH', lines: ['知识固化进权重，', '更新一次滞后数日'] },
        { label: '适用场景', code: 'SCENE', lines: ['任务稳定、风格固定', '的高频重复场景'] }
      ]
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

  function drawSectionLabel() {
    var group = el('g', { 'data-layout-zone': 'e2.section', 'data-slot-id': 'section-label' });
    text('01 / WATERSHED', 90, 309, {
      'font-family': MONO, 'font-size': 11, 'letter-spacing': 1.8, fill: INK45
    }, group);
    line(334, 305, 990, 305, { stroke: INK45, 'stroke-width': .65 }, group);
    text('FOUR ALIGNED FIELDS', 990, 309, {
      'font-family': MONO, 'font-size': 9.5, 'letter-spacing': 1.25,
      'text-anchor': 'end', fill: INK45
    }, group);
  }

  function drawWatershed(parent) {
    var group = el('g', {
      'data-layout-zone': 'e2.watershed', 'data-slot-id': 'comparison-divider',
      'data-component-id': 'native.paper-ink.comparison.watershed-divider'
    }, parent);
    line(DIVIDER_X, 366, DIVIDER_X, 756, {
      stroke: INK80, 'stroke-width': 1.15
    }, group);
    line(DIVIDER_X, 844, DIVIDER_X, 1148, {
      stroke: INK80, 'stroke-width': 1.15
    }, group);
    for (var y = 386; y <= 1136; y += 32) {
      if (y > 746 && y < 854) continue;
      line(DIVIDER_X - 7, y, DIVIDER_X + 7, y, {
        stroke: INK, 'stroke-width': .7, opacity: .48
      }, group);
    }
    line(DIVIDER_X - 13, 366, DIVIDER_X + 13, 366, {
      stroke: INK, 'stroke-width': .8, opacity: .52
    }, group);
    line(DIVIDER_X - 13, 1148, DIVIDER_X + 13, 1148, {
      stroke: INK, 'stroke-width': .8, opacity: .52
    }, group);
    text('VS', DIVIDER_X, 798, { id: 'e2-focus-vs', 'data-xp-anchor': 'vs',
      'font-family': MONO, 'font-size': 19, 'letter-spacing': 2,
      'text-anchor': 'middle'
    }, group);
    text('RAG × FINETUNE', DIVIDER_X, 826, {
      id: 'sample-focus', 'font-family': MONO, 'font-size': 9.5,
      'letter-spacing': 1.25, 'text-anchor': 'middle', fill: INK45
    }, group);
  }

  function drawColumnHeader(column, parent) {
    var group = el('g', {
      'data-layout-zone': 'e2.' + column.key + '-header',
      'data-slot-id': column.key + '-header'
    }, parent);
    text(column.title, column.x, 405, {
      'font-size': 25, 'font-weight': 400
    }, group);
    text(column.tag, column.x, 446, {
      'font-family': MONO, 'font-size': 10.5, 'letter-spacing': 1.1, fill: INK45
    }, group);
    line(column.x, 474, column.x + COLUMN_WIDTH, 474, {
      stroke: FUNCTIONAL, 'stroke-width': 2, opacity: .8
    }, group);
    line(column.x, 480, column.x + 92, 480, {
      stroke: FUNCTIONAL, 'stroke-width': 1
    }, group);
    line(column.key === 'rag' ? column.x + COLUMN_WIDTH : DIVIDER_X + 8, 474,
      column.key === 'rag' ? DIVIDER_X - 8 : column.x, 474, {
        stroke: INK45, 'stroke-width': .6, 'stroke-dasharray': '2 5'
      }, group);
  }

  function drawFieldRow(column, row, rowIndex, parent) {
    var y = ROW_TOP + rowIndex * ROW_HEIGHT;
    var group = el('g', {
      'data-layout-zone': 'e2.' + column.key + '-row-' + (rowIndex + 1),
      'data-slot-id': column.key + '-' + row.code.toLowerCase(),
      'data-repeat-unit': column.key + '-comparison-field'
    }, parent);
    el('circle', {
      cx: column.x + 5, cy: y + 30, r: 2.7,
      fill: 'none', stroke: INK80,
      'stroke-width': 1
    }, group);
    text(row.label, column.x + 22, y + 37, {
      'font-size': 20, 'font-weight': 400
    }, group);
    text(row.code, column.x + COLUMN_WIDTH, y + 34, {
      'font-family': MONO, 'font-size': 10.5, 'letter-spacing': 1.5,
      'text-anchor': 'end', fill: INK45
    }, group);
    row.lines.forEach(function (value, lineIndex) {
      text(value, column.x + 22, y + 84 + lineIndex * 31, {
        'font-size': 17.5, fill: INK70
      }, group);
    });
    if (rowIndex < column.rows.length - 1) {
      line(column.x, y + ROW_HEIGHT - 12, column.x + COLUMN_WIDTH, y + ROW_HEIGHT - 12, {
        stroke: INK45, 'stroke-width': .65
      }, group);
    }
  }

  function drawComparisonColumn(column, parent) {
    var group = el('g', {
      'data-layout-zone': 'e2.' + column.key + '-column',
      'data-slot-id': column.key + '-comparison-column',
      'data-fixed-quantity': '4',
      'data-component-id': 'native.paper-ink.comparison.field-column'
    }, parent);
    drawColumnHeader(column, group);
    column.rows.forEach(function (row, rowIndex) {
      drawFieldRow(column, row, rowIndex, group);
    });
  }

  function drawE2() {
    text('更新频率，决定 RAG 还是微调', 90, 214, {
      'font-family': SERIF, 'font-size': 46, 'font-weight': 500
    });
    text('四个同维字段一起看：触发、成本、时效与场景。', 90, 266, {
      'font-size': 20, fill: INK70
    });
    drawSectionLabel();
    var comparison = el('g', {
      'data-layout-zone': 'e2.comparison',
      'data-slot-id': 'rag-versus-finetune',
      'data-fixed-quantity': '2'
    });
    drawWatershed(comparison);
    COLUMNS.forEach(function (column) { drawComparisonColumn(column, comparison); });
  }

  drawE2();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
