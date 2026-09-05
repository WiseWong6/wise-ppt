(function () {
  'use strict';
  var p = window.PortraitNonRelation;
  function drawD9() {
    var agendaHeading = p.group({'data-layout-zone': 'd9.agenda-heading', 'data-slot-id': 'agenda-heading'});
    var chapterList = p.group({'data-layout-zone': 'd9.chapter-list', 'data-slot-id': 'chapter-navigation', 'data-fixed-quantity': '5'});
    p.label('AGENDA / FIVE CHAPTERS', 90, 214, {fill: 'var(--ink-70)'}, agendaHeading);
    p.line(90, 250, 990, 250, {stroke: 'var(--ink-45)', 'stroke-width': .8}, agendaHeading);
    p.text('目', 124, 474, {'data-xp-anchor': 'catalog','font-family': 'var(--serif)', 'font-size': 150, 'font-weight': 500}, agendaHeading);
    p.text('录', 124, 644, {'data-xp-anchor': 'catalog','font-family': 'var(--serif)', 'font-size': 150, 'font-weight': 500}, agendaHeading);
    p.rect(128, 690, 170, 9, {fill: 'var(--ink)'}, agendaHeading);
    p.label('CONTENTS', 132, 744, {'font-size': 18, 'letter-spacing': 5}, agendaHeading);
    p.line(392, 314, 392, 1122, {stroke: 'var(--ink-45)', 'stroke-width': .8}, agendaHeading);
    var items = [['01','认知奠基'],['02','工程化思维'],['03','Agent 实战'],['04','评测体系'],['05','落地路径']];
    items.forEach(function (item, index) {
      var y = 360 + index * 152;
      p.label(item[0], 448, y, {'data-xp-anchor': 'index', fill: 'var(--ink-45)', 'font-size': 18}, chapterList);
      p.text(item[1], 448, y + 50, {'font-size': 36, 'font-weight': index === 1 ? 500 : 300}, chapterList);
      p.line(448, y + 80, 930, y + 80, {stroke: 'var(--ink-25)', 'stroke-width': .7}, chapterList);
    });
    p.label('READ FROM TOP TO BOTTOM', 930, 1148, {'text-anchor': 'end'}, chapterList);
  }
  drawD9(); p.finish();
})();
