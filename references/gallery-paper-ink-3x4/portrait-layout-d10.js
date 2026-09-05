(function () {
  'use strict';
  var p = window.PortraitNonRelation;
  function drawD10() {
    var field = p.group({'data-layout-zone': 'd10.texture'});
    for (var row = 0; row < 62; row += 1) {
      var base = 174 + row * 16.4;
      var d = '';
      for (var x = 76; x <= 1004; x += 8) {
        var centerPull = Math.exp(-Math.pow((x - 540) / 300, 2));
        var longWave = 16 * Math.sin(x * .012 + row * .22);
        var shortWave = 5 * Math.sin(x * .034 - row * .37);
        var contour = 20 * centerPull * Math.sin(row * .31 + x * .004);
        var y = base + longWave + shortWave + contour;
        d += (x === 76 ? 'M ' : ' L ') + x.toFixed(1) + ' ' + y.toFixed(1);
      }
      p.path(d, {
        fill: 'none', stroke: 'var(--ink)',
        'stroke-width': row % 5 === 0 ? .9 : .52,
        opacity: row % 5 === 0 ? .17 : .075,
        'stroke-linecap': 'round'
      }, field);
    }
    p.rect(206, 470, 668, 430, {'data-xp-anchor': 'art',
      rx: 120, fill: 'var(--paper)', opacity: .84, stroke: 'none',
      'data-path-mask': 'title-wash'
    }, field);
    p.label('AGENT ENGINEERING — 2026 SUMMER', 540, 570, {'data-xp-anchor': 'kicker-mark', 'text-anchor': 'middle', fill: 'var(--ink-70)'}, field);
    p.text('AI 工程化', 540, 714, {'text-anchor': 'middle', 'font-family': 'var(--serif)', 'font-size': 108, 'font-weight': 500, 'letter-spacing': 6}, field);
    p.rect(432, 754, 216, 8, {fill: 'var(--ink)'}, field);
    p.text('从模型到产品的工程鸿沟 · Agent 实战第一课', 540, 832, {'text-anchor': 'middle', 'font-size': 24, fill: 'var(--ink)'}, field);
  }
  drawD10(); p.finish();
})();
