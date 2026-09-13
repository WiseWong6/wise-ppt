(function () {
  'use strict';
  var p = window.PortraitNonRelation;
  function drawD7() {
    var art = p.group({'data-layout-zone': 'd7.illustration', 'data-layout-part': 'agent-engineering-stack'});
    p.rect(90, 188, 900, 570, {fill: 'none', stroke: 'var(--ink-25)', 'stroke-width': 1, 'stroke-dasharray': '4 8'}, art);
    p.dotField(120, 214, 840, 510, 360, 707, {opacity: .42}, art);

    /* 与 16:9 原版同义：模型核心、编排、记忆/工具、评测四层组成一台系统。 */
    var CX = 540;
    p.line(CX, 226, CX, 698, {stroke: 'var(--ink-45)', 'stroke-width': .8, opacity: .5, 'stroke-dasharray': '4 8'}, art);
    [347, 463, 578].forEach(function (y) {
      p.circle(CX, y, 6, {fill: 'var(--paper)', stroke: 'var(--ink-70)', 'stroke-width': .8}, art);
      p.circle(CX, y, 2, {fill: 'var(--ink)'}, art);
    });

    var model = p.group({'data-layout-part': 'model-core'}, art);
    p.path('M 354 290 L 540 238 L 726 290 L 540 342 Z', {fill: 'var(--paper-panel)', stroke: 'var(--ink-70)', 'stroke-width': 1.1}, model);
    p.path('M 383 290 L 540 247 L 697 290 L 540 333 Z', {fill: 'none', stroke: 'var(--ink-25)', 'stroke-width': .7, 'stroke-dasharray': '4 6'}, model);
    for (var ray = 0; ray < 8; ray += 1) {
      var angle = ray * Math.PI / 4;
      var x1 = CX + 34 * Math.cos(angle), y1 = 290 + 23 * Math.sin(angle);
      var x2 = CX + 78 * Math.cos(angle), y2 = 290 + 42 * Math.sin(angle);
      p.line(x1, y1, x2, y2, {stroke: 'var(--ink-70)', 'stroke-width': .8, opacity: .72}, model);
      p.circle(x2, y2, ray % 2 ? 3.5 : 5, {fill: 'var(--paper)', stroke: 'var(--ink-70)', 'stroke-width': .8}, model);
    }
    p.el('ellipse', {cx: CX, cy: 290, rx: 42, ry: 29, fill: 'var(--paper)', stroke: 'var(--ink)', 'stroke-width': 1}, model);
    p.el('ellipse', {cx: CX, cy: 290, rx: 23, ry: 15, fill: 'none', stroke: 'var(--ink-70)', 'stroke-width': .7}, model);
    p.circle(CX, 290, 5, {fill: 'var(--ink)'}, model);
    p.label('MODEL CORE / 01', 744, 294, {'font-size': 12, 'letter-spacing': 1.7}, art);

    var orchestration = p.group({'data-layout-part': 'orchestration'}, art);
    p.path('M 314 405 L 540 362 L 766 405 L 540 448 Z', {fill: 'var(--paper-panel)', stroke: 'var(--ink-70)', 'stroke-width': 1.1}, orchestration);
    p.path('M 314 405 L 540 448 L 540 464 L 314 421 Z', {fill: 'none', stroke: 'var(--ink-45)', 'stroke-width': .75}, orchestration);
    p.path('M 540 448 L 766 405 L 766 421 L 540 464 Z', {fill: 'none', stroke: 'var(--ink-45)', 'stroke-width': .75}, orchestration);
    [0,1,2,3,4].forEach(function (index) {
      var x = 392 + index * 74;
      p.circle(x, 405, index === 2 ? 11 : 8, {fill: 'var(--paper)', stroke: 'var(--ink-70)', 'stroke-width': .8}, orchestration);
      p.circle(x, 405, index === 2 ? 3.5 : 2.5, {fill: 'var(--ink)'}, orchestration);
      if (index < 4) p.path('M ' + (x + 12) + ' 405 L ' + (x + 61) + ' 405 M ' + (x + 55) + ' 400 L ' + (x + 61) + ' 405 L ' + (x + 55) + ' 410', {fill: 'none', stroke: 'var(--ink-45)', 'stroke-width': .75}, orchestration);
    });
    p.label('ORCHESTRATION / 02', 294, 409, {'text-anchor': 'end', 'font-size': 12, 'letter-spacing': 1.5}, art);

    var memory = p.group({'data-layout-part': 'memory-tools'}, art);
    p.path('M 286 520 L 540 476 L 794 520 L 540 565 Z', {fill: 'var(--paper-panel)', stroke: 'var(--ink-70)', 'stroke-width': 1.1}, memory);
    p.path('M 286 520 L 540 565 L 540 581 L 286 536 Z', {fill: 'none', stroke: 'var(--ink-45)', 'stroke-width': .75}, memory);
    p.path('M 540 565 L 794 520 L 794 536 L 540 581 Z', {fill: 'none', stroke: 'var(--ink-45)', 'stroke-width': .75}, memory);
    [412,540,668].forEach(function (x, index) {
      p.path('M ' + (x - 52) + ' 520 L ' + x + ' 505 L ' + (x + 52) + ' 520 L ' + x + ' 535 Z', {fill: 'var(--paper)', stroke: 'var(--ink-70)', 'stroke-width': .8}, memory);
      if (index === 0) {
        [0,1,2].forEach(function (row) { p.path('M ' + (x - 22) + ' ' + (516 + row * 5) + ' Q ' + x + ' ' + (509 + row * 5) + ' ' + (x + 22) + ' ' + (516 + row * 5), {fill: 'none', stroke: 'var(--ink-45)', 'stroke-width': .6}, memory); });
      } else if (index === 1) {
        p.circle(x, 520, 9, {fill: 'none', stroke: 'var(--ink-70)', 'stroke-width': .8}, memory);
        p.circle(x, 520, 2.5, {fill: 'var(--ink)'}, memory);
      } else {
        [0,1,2,3].forEach(function (bar) { p.line(x - 22 + bar * 15, 529, x - 22 + bar * 15, 526 - bar * 5, {stroke: 'var(--ink-70)', 'stroke-width': 2}, memory); });
      }
    });
    p.label('MEMORY + TOOLS / 03', 812, 524, {'font-size': 12, 'letter-spacing': 1.4}, art);

    var evaluation = p.group({'data-layout-part': 'evaluation'}, art);
    p.path('M 254 638 L 540 588 L 826 638 L 540 689 Z', {fill: 'var(--paper-panel)', stroke: 'var(--ink-70)', 'stroke-width': 1.15}, evaluation);
    p.path('M 254 638 L 540 689 L 540 708 L 254 657 Z', {fill: 'none', stroke: 'var(--ink-45)', 'stroke-width': .8}, evaluation);
    p.path('M 540 689 L 826 638 L 826 657 L 540 708 Z', {fill: 'none', stroke: 'var(--ink-45)', 'stroke-width': .8}, evaluation);
    p.path('M 360 646 L 410 634 L 456 642 L 507 621 L 555 631 L 605 612 L 653 625 L 704 610', {fill: 'none', stroke: 'var(--ink-70)', 'stroke-width': 1}, evaluation);
    [[360,646],[410,634],[456,642],[507,621],[555,631],[605,612],[653,625],[704,610]].forEach(function (point) {
      p.circle(point[0], point[1], 2.6, {fill: 'var(--paper)', stroke: 'var(--ink-70)', 'stroke-width': .7}, evaluation);
    });
    p.label('EVALUATION / 04', 236, 642, {'text-anchor': 'end', 'font-size': 12, 'letter-spacing': 1.7}, art);

    p.label('AGENT ENGINEERING STACK', 540, 736, {'text-anchor': 'middle', 'font-size': 12, 'letter-spacing': 2.3}, art);
    [[90,188],[990,188],[90,758],[990,758]].forEach(function (point) { p.cross(point[0], point[1], 10, .45, art); });

    p.label('AGENT ENGINEERING — 2026 SUMMER', 540, 886, {'text-anchor': 'middle', fill: 'var(--ink-70)'});
    p.text('AI 工程化', 540, 1015, {'text-anchor': 'middle', 'font-family': 'var(--serif)', 'font-size': 104, 'font-weight': 500, 'letter-spacing': 6});
    p.rect(430, 1056, 220, 8, {'data-xp-anchor': 'title-underline', fill: 'var(--ink)'});
    p.text('从模型到产品的工程鸿沟 · Agent 实战第一课', 540, 1128, {'text-anchor': 'middle', 'font-size': 25, fill: 'var(--ink)'});
  }
  drawD7(); p.finish();
})();
