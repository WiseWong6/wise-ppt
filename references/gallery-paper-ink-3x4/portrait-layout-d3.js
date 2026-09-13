(function () {
  'use strict';
  var p = window.PortraitNonRelation;
  function drawD3() {
    var quoteLockup = p.group({'data-layout-zone': 'd3.quote-lockup', 'data-slot-id': 'closing-quote'});
    p.line(452, 574, 594, 574, {stroke: 'var(--ink-70)', 'stroke-width': .9}, quoteLockup);
    p.circle(616, 574, 7, {fill: 'none', stroke: 'var(--ink-70)', 'stroke-width': .9}, quoteLockup);
    p.circle(616, 574, 2.2, {fill: 'var(--ink-70)'}, quoteLockup);
    p.text('进一寸有进一寸的欢喜。', 540, 740, {'data-xp-anchor': 'statement','text-anchor': 'middle', 'font-family': 'var(--serif)', 'font-size': 58, 'font-weight': 500, 'letter-spacing': 5}, quoteLockup);
    p.label('@歪斯WISE', 540, 834, {'data-xp-anchor': 'signature', 'text-anchor': 'middle', 'font-size': 19, 'letter-spacing': 5}, quoteLockup);
    p.cross(540, 910, 12, .42, quoteLockup);
  }
  drawD3(); p.finish();
})();
