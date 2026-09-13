(function () {
  'use strict';
  var p = window.PortraitNonRelation;
  function drawM2() {
    var orderRing = p.group({'data-layout-zone': 'm2.order-ring', 'data-slot-id': 'order-ring', 'data-fixed-quantity': '28'});
    var statement = p.group({'data-layout-zone': 'm2.statement', 'data-slot-id': 'order-statement'});
    p.dotField(84, 184, 912, 980, 190, 1202, {opacity: .42}, orderRing);
    var cx = 540, cy = 628, radius = 132, count = 28, missing = 5;
    p.circle(cx, cy, radius + 18, {fill: 'none', stroke: 'var(--ink-45)', 'stroke-width': .65, opacity: .42, 'stroke-dasharray': '3 8'}, orderRing);
    for (var i = 0; i < count; i += 1) {
      if (i === missing) continue;
      var angle = -Math.PI / 2 + i / count * Math.PI * 2;
      p.circle(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius, 2.8, {fill: 'var(--ink)', opacity: .76}, orderRing);
    }
    var a = -Math.PI / 2 + missing / count * Math.PI * 2;
    var innerX = cx + Math.cos(a) * radius, innerY = cy + Math.sin(a) * radius;
    var outerX = cx + Math.cos(a) * (radius + 58), outerY = cy + Math.sin(a) * (radius + 58);
    p.line(innerX, innerY, outerX, outerY, {stroke: 'var(--ink-70)', 'stroke-width': .8, 'stroke-dasharray': '4 7'}, orderRing);
    p.circle((innerX + outerX) / 2, (innerY + outerY) / 2, 1.8, {fill: 'var(--ink-70)'}, orderRing);
    p.circle(outerX, outerY, 4.5, {fill: 'var(--ink)'}, orderRing);
    p.circle(cx, cy, 2.2, {fill: 'var(--ink)'}, orderRing);
    p.label('A THICK WALL', cx, 852, {'data-xp-anchor': 'wall', 'text-anchor': 'middle', 'font-size': 21, 'letter-spacing': 7, fill: 'var(--ink-70)'}, statement);
    p.text('秩序不是整齐站队，而是给变化留下位置。', cx, 922, {'data-xp-anchor': 'statement','text-anchor': 'middle', 'font-family': 'var(--serif)', 'font-size': 30, fill: 'var(--ink-80)'}, statement);
  }
  drawM2(); p.finish();
})();
