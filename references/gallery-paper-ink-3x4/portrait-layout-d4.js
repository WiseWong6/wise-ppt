(function () {
  'use strict';
  var p = window.PortraitNonRelation;
  function drawD4() {
    var agendaHeading = p.group({'data-layout-zone': 'd4.agenda-heading', 'data-slot-id': 'agenda-heading'});
    var chapterList = p.group({'data-layout-zone': 'd4.chapter-list', 'data-slot-id': 'chapter-navigation', 'data-fixed-quantity': '5'});
    p.label('AGENDA / CONTENTS', 110, 236, {fill: 'var(--ink-70)'}, agendaHeading);
    p.text('目录', 110, 326, {'font-family': 'var(--serif)', 'font-size': 68, 'font-weight': 500, 'letter-spacing': 4}, agendaHeading);
    p.line(110, 370, 970, 370, {stroke: 'var(--ink-45)', 'stroke-width': .8}, agendaHeading);
    var items = [
      ['01','认知奠基','认识模型能力与边界'],
      ['02','工程化思维','从演示走向可维护系统'],
      ['03','Agent 实战','把任务拆成可执行闭环'],
      ['04','评测体系','用证据判断真实效果'],
      ['05','落地路径','从试点扩展到生产环境']
    ];
    items.forEach(function (item, index) {
      var y = 418 + index * 142;
      var active = index === 1;
      p.circle(138, y + 50, 21, Object.assign({fill: active ? 'var(--ink)' : 'none', stroke: active ? 'var(--ink)' : 'var(--ink-45)', 'stroke-width': .9}, active ? {'data-xp-anchor': 'active-dot'} : {}), chapterList);
      p.text(item[0], 138, y + 57, {'font-family': 'var(--mono)', 'font-size': 17, 'text-anchor': 'middle', fill: active ? 'var(--paper)' : 'var(--ink-70)'}, chapterList);
      p.text(item[1], 196, y + 43, {'font-size': 28, 'font-weight': active ? 500 : 400}, chapterList);
      p.text(item[2], 196, y + 76, {'font-size': 18, fill: 'var(--ink-70)'}, chapterList);
      p.label('CHAPTER ' + item[0], 950, y + 53, {'text-anchor': 'end', fill: 'var(--ink-45)'}, chapterList);
      p.line(110, y + 108, 970, y + 108, {'data-xp-anchor': 'chapter',stroke: active ? 'var(--ink-70)' : 'var(--ink-25)', 'stroke-width': active ? 1 : .65}, chapterList);
    });
  }
  drawD4(); p.finish();
})();
