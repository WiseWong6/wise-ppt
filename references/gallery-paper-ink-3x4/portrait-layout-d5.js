(function () {
  'use strict';
  var p = window.PortraitNonRelation;
  function drawD5() {
    var chapterMark = p.group({'data-layout-zone': 'd5.chapter-mark', 'data-slot-id': 'chapter-number'});
    var chapterTitle = p.group({'data-layout-zone': 'd5.chapter-title', 'data-slot-id': 'chapter-title'});
    p.label('CHAPTER DIVIDER', 90, 244, {fill: 'var(--ink-70)'}, chapterMark);
    p.text('02', 88, 680, {'data-xp-anchor': 'chapter-mark','font-family': 'var(--mono)', 'font-size': 330, 'font-weight': 400, fill: 'none', stroke: 'var(--ink-45)', 'stroke-width': 1.5, opacity: .68}, chapterMark);
    p.line(104, 742, 972, 742, {stroke: 'var(--ink-45)', 'stroke-width': .8, 'stroke-dasharray': '4 8'}, chapterMark);
    p.cross(104, 742, 10, .55, chapterMark); p.cross(972, 742, 10, .55, chapterMark);
    p.dotField(720, 236, 270, 350, 120, 502, {}, chapterMark);
    p.text('工程化思维', 104, 890, {'font-family': 'var(--serif)', 'font-size': 88, 'font-weight': 500, 'letter-spacing': 6}, chapterTitle);
    p.rect(106, 932, 260, 9, {fill: 'var(--ink)'}, chapterTitle);
    p.label('FROM MODEL TO PRODUCT', 108, 1002, {'data-xp-anchor': 'chapter-sub', 'font-size': 19, 'letter-spacing': 4}, chapterTitle);
    p.text('把一次演示，变成可复用、可验证、可维护的生产系统。', 108, 1070, {'font-size': 25, fill: 'var(--ink-70)'}, chapterTitle);
  }
  drawD5(); p.finish();
})();
