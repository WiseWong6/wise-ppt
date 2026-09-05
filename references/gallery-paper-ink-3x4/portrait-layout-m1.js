(function () {
  'use strict';
  var p = window.PortraitNonRelation;
  function drawM1() {
    var visual = p.group({
      transform: 'translate(80 0)',
      'data-layout-zone': 'm1.primary-visual'
    });
    p.label('RULE ENGINE', 128, 308, {'font-size': 18}, visual);
    p.text('可解释', 128, 362, {'font-size': 28, fill: 'var(--ink-70)'}, visual);
    p.line(274, 346, 446, 346, {stroke: 'var(--ink-45)', 'stroke-width': .8}, visual);
    p.text('→', 462, 361, {'font-size': 28, fill: 'var(--ink-45)'}, visual);
    p.label('LARGE MODEL', 612, 308, {'font-size': 18}, visual);
    p.text('？', 612, 370, {'font-family': 'var(--serif)', 'font-size': 52, 'font-weight': 500}, visual);
    p.rect(310, 482, 460, 460, {fill: 'var(--ink)'}, visual);
    p.dotField(284, 456, 512, 512, 480, 1101, {opacity: .48}, visual);
    p.rect(290, 462, 500, 500, {'data-xp-anchor': 'frame',fill: 'none', stroke: 'var(--ink-80)', 'stroke-width': .8, 'stroke-dasharray': '4 8'}, visual);
    [[290,462],[790,462],[290,962],[790,962]].forEach(function (point) { p.cross(point[0], point[1], 10, .5, visual); });
    p.text('LLM', 540, 678, {'text-anchor': 'middle', 'font-family': 'var(--mono)', 'font-size': 74, 'font-weight': 400, 'letter-spacing': 10, fill: 'var(--paper)'}, visual);
    p.line(448, 724, 632, 724, {'data-xp-anchor': 'compare-divider', stroke: 'var(--paper)', opacity: .5}, visual);
    p.label('GIANT BLACKBOX', 540, 780, {'text-anchor': 'middle', fill: 'var(--paper)', 'font-size': 18, 'letter-spacing': 5}, visual);
    p.line(236, 482, 236, 942, {stroke: 'var(--ink-70)', 'stroke-width': 1}, visual);
    p.line(226, 482, 246, 482, {stroke: 'var(--ink-70)'}, visual);
    p.line(226, 942, 246, 942, {stroke: 'var(--ink-70)'}, visual);
    p.label('460 PX', 210, 718, {transform: 'rotate(-90 210 718)', 'text-anchor': 'middle'}, visual);
    p.label('FIG. M1 · PARTICLE MASS', 540, 1026, {'text-anchor': 'middle'}, visual);
  }
  drawM1(); p.finish();
})();
