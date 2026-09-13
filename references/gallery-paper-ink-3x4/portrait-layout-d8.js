(function () {
  'use strict';
  var p = window.PortraitNonRelation;
  function drawD8() {
    /* 横版的左图右题转置为上图下题，保持工作站线稿的原始比例。 */
    var art = p.group({
      'data-layout-zone': 'd8.illustration',
      'data-layout-part': 'agent-workstation',
      /* 新字幕锚点把安全区下界收至 y=1258；工作站下移 6px 后完整落入安全高度。 */
      transform: 'translate(150 -254) scale(1.3)'
    });

    /* 与 16:9 原版同义：主机、任务链、工具舱、评测走势和输入输出是一台工作台。 */
    var workstation = p.group({'data-layout-part': 'workstation-body'}, art);
    p.el('ellipse', {cx: 289, cy: 634, rx: 220, ry: 274, fill: 'none', stroke: 'var(--ink-25)', 'stroke-width': .8, 'stroke-dasharray': '3 9'}, workstation);
    p.path('M 72 610 A 220 274 0 0 1 420 394', {fill: 'none', stroke: 'var(--ink-45)', 'stroke-width': 1}, workstation);
    p.path('M 504 634 A 220 274 0 0 1 168 872', {fill: 'none', stroke: 'var(--ink-45)', 'stroke-width': 1}, workstation);

    var screen = p.group({'data-layout-part': 'dual-line-screen'}, workstation);
    p.rect(112, 446, 354, 260, {'data-xp-anchor': 'screen',rx: 11, fill: 'var(--paper-panel)', stroke: 'var(--ink-80)', 'stroke-width': 1.2}, screen);
    p.rect(119, 453, 340, 246, {rx: 8, fill: 'none', stroke: 'var(--ink-25)', 'stroke-width': .6}, screen);
    p.line(112, 486, 466, 486, {stroke: 'var(--ink-70)', 'stroke-width': .9}, screen);
    [0,1,2].forEach(function (index) {
      p.circle(132 + index * 16, 468, 2.8, {fill: index === 2 ? 'var(--ink)' : 'none', stroke: 'var(--ink-70)', 'stroke-width': .65}, screen);
    });
    p.circle(444, 468, 6, {fill: 'none', stroke: 'var(--ink-70)', 'stroke-width': .8}, screen);
    p.circle(444, 468, 2, {fill: 'var(--ink)'}, screen);
    p.line(169, 486, 169, 706, {stroke: 'var(--ink-45)', 'stroke-width': .8}, screen);
    [0,1,2,3,4].forEach(function (index) {
      p.rect(130, 509 + index * 35, 23, 17, {rx: 2.5, fill: 'none', stroke: 'var(--ink-45)', 'stroke-width': .7}, screen);
      if (index === 1) p.circle(141.5, 552.5, 2.2, {fill: 'var(--ink)'}, screen);
    });

    var tasks = p.group({'data-layout-part': 'task-chain'}, screen);
    p.rect(188, 510, 147, 62, {rx: 6, fill: 'none', stroke: 'var(--ink-70)', 'stroke-width': .9}, tasks);
    [0,1,2].forEach(function (index) {
      var x = 211 + index * 48;
      p.circle(x, 541, 7, {fill: 'var(--paper)', stroke: 'var(--ink-70)', 'stroke-width': .75}, tasks);
      if (index < 2) p.line(x + 9, 541, x + 39, 541, {stroke: 'var(--ink-45)', 'stroke-width': .7, 'stroke-dasharray': '3 4'}, tasks);
    });

    var toolsBay = p.group({'data-layout-part': 'tool-bay'}, screen);
    p.rect(348, 510, 92, 62, {rx: 6, fill: 'none', stroke: 'var(--ink-70)', 'stroke-width': .9}, toolsBay);
    p.circle(375, 541, 11, {fill: 'none', stroke: 'var(--ink-70)', 'stroke-width': .8}, toolsBay);
    p.circle(375, 541, 3, {fill: 'var(--ink)'}, toolsBay);
    p.line(394, 531, 427, 531, {stroke: 'var(--ink-45)', 'stroke-width': .7}, toolsBay);
    p.line(394, 546, 420, 546, {stroke: 'var(--ink-45)', 'stroke-width': .7}, toolsBay);

    var trend = p.group({'data-layout-part': 'evaluation-trend'}, screen);
    p.rect(188, 592, 252, 82, {rx: 6, fill: 'none', stroke: 'var(--ink-70)', 'stroke-width': .9}, trend);
    var trendPoints = [[205,653],[239,640],[273,647],[310,622],[347,634],[383,614],[423,624]];
    p.path('M 205 653 L 239 640 L 273 647 L 310 622 L 347 634 L 383 614 L 423 624', {fill: 'none', stroke: 'var(--ink-70)', 'stroke-width': 1}, trend);
    trendPoints.forEach(function (point) { p.circle(point[0], point[1], 2.4, {fill: 'var(--paper)', stroke: 'var(--ink-70)', 'stroke-width': .65}, trend); });

    [
      {x: 40, y: 555, side: 'input'},
      {x: 448, y: 555, side: 'output'}
    ].forEach(function (card, index) {
      var port = p.group({'data-layout-part': card.side + '-card'}, workstation);
      p.rect(card.x, card.y, 90, 62, {rx: 9, fill: 'var(--paper)', stroke: 'var(--ink-70)', 'stroke-width': .9}, port);
      p.rect(card.x + 6, card.y + 6, 78, 50, {rx: 6, fill: 'none', stroke: 'var(--ink-25)', 'stroke-width': .5}, port);
      p.circle(card.x + 24, card.y + 31, 6, {fill: 'none', stroke: 'var(--ink-70)', 'stroke-width': .75}, port);
      p.circle(card.x + 24, card.y + 31, 2, {fill: 'var(--ink)'}, port);
      p.line(card.x + 40, card.y + 24, card.x + 73, card.y + 24, {stroke: 'var(--ink-45)', 'stroke-width': .7}, port);
      p.line(card.x + 40, card.y + 38, card.x + 65, card.y + 38, {stroke: 'var(--ink-45)', 'stroke-width': .7}, port);
      p.path(index === 0 ? 'M 130 586 C 143 586 99 576 112 576' : 'M 466 576 C 480 576 434 586 448 586', {fill: 'none', stroke: 'var(--ink-45)', 'stroke-width': .8, 'stroke-dasharray': '3 4'}, port);
    });

    p.path('M 101 728 L 475 728 L 514 770 L 61 770 Z', {fill: 'var(--paper-panel)', stroke: 'var(--ink-70)', 'stroke-width': 1.05}, workstation);
    p.path('M 61 770 L 514 770 L 497 801 L 78 801 Z', {fill: 'none', stroke: 'var(--ink-45)', 'stroke-width': .8}, workstation);
    [0,1,2,3,4].forEach(function (index) {
      p.circle(220 + index * 34, 765, 3.5, {fill: index === 2 ? 'var(--ink)' : 'var(--paper)', stroke: 'var(--ink-70)', 'stroke-width': .65}, workstation);
    });

    [
      {x: 112, y: 828, turn: -2},
      {x: 239, y: 837, turn: 0},
      {x: 366, y: 828, turn: 2}
    ].forEach(function (card, index) {
      var module = p.group({'data-layout-part': ['memory-module','tool-module','evaluation-module'][index], transform: 'rotate(' + card.turn + ' ' + (card.x + 51) + ' ' + (card.y + 28) + ')'}, workstation);
      p.rect(card.x, card.y, 102, 56, {rx: 7, fill: 'var(--paper-panel)', stroke: 'var(--ink-45)', 'stroke-width': .8}, module);
      p.line(card.x + 13, card.y + 19, card.x + 89, card.y + 19, {stroke: 'var(--ink-45)', 'stroke-width': .7}, module);
      p.line(card.x + 13, card.y + 35, card.x + 72, card.y + 35, {stroke: 'var(--ink-25)', 'stroke-width': .7}, module);
    });

    [[72,610],[168,408],[420,394],[504,634],[392,850],[168,872]].forEach(function (point, index) {
      p.circle(point[0], point[1], index % 2 ? 4 : 6, {fill: 'var(--paper)', stroke: 'var(--ink-70)', 'stroke-width': .8}, workstation);
      p.circle(point[0], point[1], 1.7, {fill: 'var(--ink)'}, workstation);
    });

    [[46,300],[536,300],[46,1014],[536,1014]].forEach(function (point) { p.cross(point[0], point[1], 9, .4, art); });
    p.label('FIG. 08 · AGENT ENGINEERING WORKSTATION', 291, 972, {'text-anchor': 'middle', 'font-size': 12}, art);

    p.label('AGENT ENGINEERING', 540, 1072, {'data-xp-anchor': 'kicker-mark', 'text-anchor': 'middle', fill: 'var(--ink-70)'});
    p.text('AI 工程化实战', 540, 1172, {'text-anchor': 'middle', 'font-family': 'var(--serif)', 'font-size': 82, 'font-weight': 500, 'letter-spacing': 4});
    p.rect(430, 1208, 220, 7, {fill: 'var(--wp-color-functional)'});
    p.text('从模型到产品的工程鸿沟 · Agent 实战第一课', 540, 1276, {'text-anchor': 'middle', 'font-size': 24, fill: 'var(--ink-70)'});
  }
  drawD8(); p.finish();
})();
