(function () {
  'use strict';
  var p = window.PortraitNonRelation;
  function drawD2() {
    var particleOutro = p.group({'data-layout-zone': 'd2.particle-outro', 'data-slot-id': 'particle-type-outro'});
    p.dotField(74, 258, 932, 750, 640, 202, {}, particleOutro);
    p.rect(98, 430, 884, 474, {fill: 'var(--paper)', opacity: .72}, particleOutro);
    p.text('AGENT', 540, 738, {'data-xp-anchor': 'statement','text-anchor': 'middle', 'font-family': 'var(--serif)', 'font-size': 190, 'font-weight': 500, 'letter-spacing': 6}, particleOutro);
    p.line(142, 790, 938, 790, {stroke: 'var(--ink-45)', 'stroke-width': .8, 'stroke-dasharray': '3 7'}, particleOutro);
    [[114,432],[966,432],[114,904],[966,904]].forEach(function (point) { p.cross(point[0], point[1], 11, .48, particleOutro); });
    p.line(110, 510, 110, 832, {'data-xp-anchor': 'measure', stroke: 'var(--ink-70)', 'stroke-width': .8}, particleOutro);
    p.line(102, 510, 118, 510, {stroke: 'var(--ink-70)'}, particleOutro);
    p.line(102, 832, 118, 832, {stroke: 'var(--ink-70)'}, particleOutro);
    p.label('X-HEIGHT 322', 82, 674, {transform: 'rotate(-90 82 674)', 'text-anchor': 'middle'}, particleOutro);
    p.label('FIG. D2 · PARTICLE OUTRO', 540, 984, {'text-anchor': 'middle'}, particleOutro);
  }
  drawD2(); p.finish();
})();
