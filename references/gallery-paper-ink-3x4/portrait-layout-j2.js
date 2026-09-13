(function () {
  'use strict';

  var svg = document.querySelector('.scene');
  var NS = 'http://www.w3.org/2000/svg';
  var INK = 'var(--ink)';
  var INK80 = 'var(--ink-80)';
  var INK70 = 'var(--ink-70)';
  var INK45 = 'var(--ink-45)';
  var PANEL = 'var(--paper-panel)';
  var FUNCTIONAL = 'var(--wp-color-functional)';
  var SANS = 'var(--sans)';
  var MONO = 'var(--mono)';
  var SERIF = 'var(--serif)';
  var CARD_W = 315;
  var CARD_H = 150;

  var STEPS = [
    { no: '01', en: 'PERCEIVE', title: '感知输入', field: 'INPUT · 4HZ', glyph: 'telemetry', x: 150, y: 350 },
    { no: '02', en: 'PARSE', title: '意图解析', field: 'INTENT 1.2M / DAY', glyph: 'replay', x: 150, y: 540 },
    { no: '03', en: 'PLAN', title: '规划分解', field: 'STEPS SET V18', glyph: 'tune', x: 150, y: 730 },
    { no: '04', en: 'TOOL CALL', title: '工具调用', field: 'CALLS 860', glyph: 'sim', x: 150, y: 920 },
    { no: '05', en: 'VERIFY', title: '结果校验', field: '5% SAMPLE · 2 RULES', glyph: 'canary', x: 615, y: 920 },
    { no: '06', en: 'MEMORY', title: '记忆更新', field: '100% · 3 STORES', glyph: 'rollout', x: 615, y: 730 },
    { no: '07', en: 'REFLECT', title: '反思调整', field: 'P95 38S → 29S', glyph: 'monitor', x: 615, y: 540 },
    { no: '08', en: 'DELIVER', title: '输出交付', field: 'ISSUE 23 → 01', glyph: 'recover', x: 615, y: 350 }
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

  function drawDefs() {
    var defs = el('defs', {});
    var marker = el('marker', {
      id: 'j2-arrow-portrait', viewBox: '0 0 10 10', refX: 9, refY: 5,
      markerWidth: 7, markerHeight: 7, orient: 'auto'
    }, defs);
    el('path', {
      d: 'M 0 0 L 10 5 L 0 10', fill: 'none',
      stroke: INK80, 'stroke-width': 1.25
    }, marker);
    var pattern = el('pattern', {
      id: 'j2-hatch-portrait', width: 6, height: 6,
      patternTransform: 'rotate(45)', patternUnits: 'userSpaceOnUse'
    }, defs);
    line(0, 0, 0, 6, { stroke: INK, 'stroke-width': .7, opacity: .35 }, pattern);
  }

  function drawGlyph(kind, cx, cy, parent) {
    if (kind === 'telemetry') {
      [8, 14, 20].forEach(function (radius) {
        el('path', {
          d: 'M ' + (cx - radius) + ' ' + cy + ' A ' + radius + ' ' + radius + ' 0 0 1 ' + (cx + radius) + ' ' + cy,
          fill: 'none', stroke: INK80, 'stroke-width': 1.1
        }, parent);
      });
      el('circle', { cx: cx, cy: cy + 5, r: 2.4, fill: INK }, parent);
      return;
    }
    if (kind === 'replay') {
      el('circle', { cx: cx, cy: cy, r: 17, fill: 'none', stroke: INK80, 'stroke-width': 1.2 }, parent);
      line(cx - 5, cy - 8, cx + 9, cy, { stroke: INK80, 'stroke-width': 1.2 }, parent);
      line(cx + 9, cy, cx - 5, cy + 8, { stroke: INK80, 'stroke-width': 1.2 }, parent);
      return;
    }
    if (kind === 'tune') {
      el('circle', { cx: cx, cy: cy, r: 17, fill: 'none', stroke: INK80, 'stroke-width': 1.2 }, parent);
      for (var angle = 0; angle < 360; angle += 45) {
        var radians = angle * Math.PI / 180;
        line(cx + Math.cos(radians) * 12, cy + Math.sin(radians) * 12,
          cx + Math.cos(radians) * 17, cy + Math.sin(radians) * 17,
          { stroke: INK70, 'stroke-width': .7 }, parent);
      }
      line(cx, cy, cx + 9, cy - 9, { stroke: INK80, 'stroke-width': 1.2 }, parent);
      el('circle', { cx: cx, cy: cy, r: 2, fill: INK }, parent);
      return;
    }
    if (kind === 'sim') {
      [[-14, -10], [2, -10], [-14, 6], [2, 6]].forEach(function (offset, index) {
        el('rect', {
          x: cx + offset[0], y: cy + offset[1], width: 12, height: 9,
          fill: index === 1 ? 'url(#j2-hatch-portrait)' : 'none',
          stroke: INK80, 'stroke-width': 1
        }, parent);
      });
      return;
    }
    if (kind === 'canary') {
      el('path', {
        d: 'M ' + cx + ' ' + (cy - 16) + ' A 16 16 0 0 0 ' + cx + ' ' + (cy + 16) + ' Z',
        fill: 'url(#j2-hatch-portrait)', stroke: 'none'
      }, parent);
      el('circle', { cx: cx, cy: cy, r: 16, fill: 'none', stroke: INK80, 'stroke-width': 1.2 }, parent);
      return;
    }
    if (kind === 'rollout') {
      el('ellipse', { cx: cx, cy: cy - 10, rx: 14, ry: 5, fill: 'none', stroke: INK80, 'stroke-width': 1.2 }, parent);
      line(cx - 14, cy - 10, cx - 14, cy + 10, { stroke: INK80, 'stroke-width': 1.2 }, parent);
      line(cx + 14, cy - 10, cx + 14, cy + 10, { stroke: INK80, 'stroke-width': 1.2 }, parent);
      el('path', {
        d: 'M ' + (cx - 14) + ' ' + (cy + 10) + ' A 14 5 0 0 0 ' + (cx + 14) + ' ' + (cy + 10),
        fill: 'none', stroke: INK80, 'stroke-width': 1.2
      }, parent);
      return;
    }
    if (kind === 'monitor') {
      el('path', {
        d: 'M ' + (cx - 18) + ' ' + (cy + 9) + ' L ' + (cx - 8) + ' ' + (cy + 1) +
          ' L ' + (cx + 1) + ' ' + (cy + 6) + ' L ' + (cx + 9) + ' ' + (cy - 7) +
          ' L ' + (cx + 18) + ' ' + (cy - 2),
        fill: 'none', stroke: INK80, 'stroke-width': 1.2
      }, parent);
      el('circle', { cx: cx + 9, cy: cy - 7, r: 2.2, fill: INK }, parent);
      return;
    }
    el('path', {
      d: 'M ' + (cx + 13) + ' ' + (cy + 6) + ' A 15 15 0 1 1 ' + (cx + 14) + ' ' + (cy - 4),
      fill: 'none', stroke: INK80, 'stroke-width': 1.2
    }, parent);
    line(cx + 14, cy - 4, cx + 7, cy - 11, { stroke: INK80, 'stroke-width': 1.2 }, parent);
    line(cx + 14, cy - 4, cx + 21, cy - 11, { stroke: INK80, 'stroke-width': 1.2 }, parent);
  }

  function drawCard(step, stepIndex) {
    var group = el('g', {
      'data-layout-zone': 'j2.step-card-' + (stepIndex + 1),
      'data-slot-id': 'step-' + (stepIndex + 1)
    });
    el('rect', {
      x: step.x, y: step.y, width: CARD_W, height: CARD_H,
      fill: PANEL, stroke: INK80, 'stroke-width': 1.2
    }, group);
    el('rect', {
      x: step.x + 5, y: step.y + 5, width: CARD_W - 10, height: CARD_H - 10,
      fill: 'none', stroke: INK45, 'stroke-width': .55
    }, group);
    text(step.no, step.x + 18, step.y + 26, {
      'data-xp-anchor': 'step-no',
      'font-family': MONO, 'font-size': 10, 'letter-spacing': 1.4, fill: FUNCTIONAL
    }, group);
    var glyphGroup = el('g', {
      'data-layout-zone': 'j2.glyph-' + (stepIndex + 1),
      'data-slot-id': 'glyph-' + (stepIndex + 1)
    }, group);
    drawGlyph(step.glyph, step.x + CARD_W / 2, step.y + 42, glyphGroup);
    text(step.en, step.x + CARD_W / 2, step.y + 86, {
      'font-family': MONO, 'font-size': 9.2, 'letter-spacing': 1.45,
      'text-anchor': 'middle', fill: INK70
    }, group);
    text(step.title, step.x + CARD_W / 2, step.y + 111, {
      'font-size': 17, 'font-weight': 400, 'text-anchor': 'middle'
    }, group);
    text(step.field, step.x + CARD_W / 2, step.y + 136, {
      'font-family': MONO, 'font-size': 8.1, 'letter-spacing': .75,
      'text-anchor': 'middle', fill: INK45
    }, group);
  }

  function drawConnector(zone, pathData, attrs) {
    var group = el('g', { 'data-layout-zone': zone, 'data-slot-id': zone.split('.').pop() });
    el('path', Object.assign({
      d: pathData, fill: 'none', stroke: INK80, 'stroke-width': 1.2,
      'marker-end': 'url(#j2-arrow-portrait)'
    }, attrs || {}), group);
    return group;
  }

  function drawFlows() {
    svg.setAttribute('data-flow-layout', 'two-columns-four-rows');
    drawConnector('j2.flow-1', 'M 307.5 508 V 532');
    drawConnector('j2.flow-2', 'M 307.5 698 V 722');
    drawConnector('j2.flow-3', 'M 307.5 888 V 912');

    var gate = drawConnector(
      'j2.go-live-gate',
      'M 307.5 1070 C 307.5 1210, 772.5 1210, 772.5 1070',
      { id: 'j2-focus-gate', 'data-arc-profile': 'low-symmetric', 'stroke-width': 1.4 }
    );
    text('GO-LIVE', 540, 1104, {
      id: 'sample-focus', 'font-family': MONO, 'font-size': 9.5,
      'letter-spacing': 1.7, 'text-anchor': 'middle', fill: INK45
    }, gate);
    text('上线闸口', 540, 1132, { 'data-xp-anchor': 'gate',
      id: 'j2-focus-cn', 'font-size': 14, 'text-anchor': 'middle', fill: INK70
    }, gate);

    drawConnector('j2.flow-5', 'M 772.5 912 V 888');
    drawConnector('j2.flow-6', 'M 772.5 722 V 698');
    drawConnector('j2.flow-7', 'M 772.5 532 V 508');

    var returning = drawConnector(
      'j2.return-loop',
      'M 772.5 350 C 772.5 210, 307.5 210, 307.5 350',
      { class: 'j2-focus-iterate-arrow', 'data-arc-profile': 'low-symmetric', 'stroke-width': 1.4 }
    );
    text('ITERATE · W01', 540, 288, {
      id: 'j2-focus-iterate-en',
      'font-family': MONO, 'font-size': 9.3, 'letter-spacing': 1.5,
      'text-anchor': 'middle', fill: INK45
    }, returning);
    text('持续迭代', 540, 316, {
      id: 'j2-focus-iterate-cn',
      'font-size': 13.5, 'text-anchor': 'middle', fill: INK70
    }, returning);
  }

  function drawJ2() {
    drawDefs();
    text('Agent Loop Engineering', 90, 220, {
      'font-family': SERIF, 'font-size': 45, 'font-weight': 500
    });
    text('按原顺序重排为两列四行：左列向下、右列向上，再回到起点。', 90, 272, {
      'font-size': 20.5, fill: INK70
    });
    drawFlows();
    STEPS.forEach(drawCard);
  }

  drawJ2();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
