(function () {
  'use strict';
  var p = window.PortraitNonRelation;
  function drawD1() {
    /* 横版的左右分栏在窄屏转置为上下两段，内容与插图各自获得完整宽度。 */
    p.label('AGENT ENGINEERING — 2026 SUMMER', 90, 260, {fill: 'var(--ink-70)'});
    p.text('AI 工程化', 90, 402, {'font-family': 'var(--serif)', 'font-size': 108, 'font-weight': 500, 'letter-spacing': 5});
    p.rect(92, 444, 190, 7, {'data-xp-anchor': 'title-underline', fill: 'var(--ink)'});
    p.text('从模型到产品的工程鸿沟 · Agent 实战第一课', 92, 520, {'font-size': 25, fill: 'var(--ink)'});

    var art = p.group({'data-layout-zone': 'd1.illustration', 'data-layout-part': 'ui-preview'});
    var X = 232, Y = 700, W = 616, H = 404;
    var ui = p.group({'data-layout-part': 'product-ui'}, art);
    p.rect(X, Y, W, H, {fill: 'var(--paper-panel)', stroke: 'var(--ink-45)', 'stroke-width': 1, 'stroke-dasharray': '4 6'}, ui);
    [[X,Y],[X+W,Y],[X,Y+H],[X+W,Y+H]].forEach(function (point) {
      p.cross(point[0], point[1], 7, .55, ui);
    });

    p.rect(X, Y, W, 48, {'data-xp-anchor': 'title-bar', fill: 'none', stroke: 'var(--ink-80)', 'stroke-width': .9}, ui);
    [0,1,2,3].forEach(function (index) {
      p.line(X + 46 + index * 64, Y + 18, X + 80 + index * 64, Y + 18, {stroke: 'var(--ink-70)', 'stroke-width': .8, opacity: .62}, ui);
    });
    p.circle(X + W - 28, Y + 24, 7, {fill: 'none', stroke: 'var(--ink-70)', 'stroke-width': .8}, ui);

    p.rect(X, Y + 48, 86, H - 48, {fill: 'none', stroke: 'var(--ink-80)', 'stroke-width': .8}, ui);
    [0,1,2,3,4].forEach(function (index) {
      p.rect(X + 22, Y + 76 + index * 56, 42, 26, {fill: 'none', stroke: 'var(--ink-45)', 'stroke-width': .7}, ui);
    });

    var contentX = X + 112;
    p.rect(contentX, Y + 76, 190, 126, {fill: 'none', stroke: 'var(--ink-80)', 'stroke-width': 1}, ui);
    p.line(contentX + 17, Y + 102, contentX + 112, Y + 102, {stroke: 'var(--ink-70)', 'stroke-width': .8, opacity: .68}, ui);
    p.line(contentX + 17, Y + 128, contentX + 148, Y + 128, {stroke: 'var(--ink-45)', 'stroke-width': .6}, ui);
    p.line(contentX + 17, Y + 150, contentX + 124, Y + 150, {stroke: 'var(--ink-45)', 'stroke-width': .6}, ui);

    p.rect(contentX + 210, Y + 76, 238, 126, {fill: 'none', stroke: 'var(--ink-80)', 'stroke-width': 1}, ui);
    p.line(contentX + 228, Y + 102, contentX + 330, Y + 102, {stroke: 'var(--ink-70)', 'stroke-width': .8, opacity: .68}, ui);
    p.circle(contentX + 252, Y + 154, 18, {fill: 'none', stroke: 'var(--ink-45)', 'stroke-width': .8}, ui);

    p.rect(contentX, Y + 226, 448, 112, {fill: 'none', stroke: 'var(--ink-80)', 'stroke-width': 1}, ui);
    p.line(contentX + 17, Y + 254, contentX + 187, Y + 254, {stroke: 'var(--ink-70)', 'stroke-width': .8, opacity: .68}, ui);
    p.line(contentX + 17, Y + 282, contentX + 260, Y + 282, {stroke: 'var(--ink-45)', 'stroke-width': .6}, ui);

    var aiX = X + W - 68, aiY = Y + H - 46;
    p.circle(aiX, aiY, 17, {fill: 'var(--paper)', stroke: 'var(--ink)', 'stroke-width': 1.1}, ui);
    p.circle(aiX, aiY, 10, {fill: 'none', stroke: 'var(--ink-70)', 'stroke-width': .7}, ui);
    p.circle(aiX, aiY, 4, {fill: 'var(--ink)'}, ui);
    p.line(aiX - 40, aiY, aiX - 22, aiY, {stroke: 'var(--ink-45)', 'stroke-width': .8}, ui);

    p.label('UI PREVIEW — NAV · CARD · AI', X + W / 2, Y + H + 54, {'text-anchor': 'middle', 'font-size': 13}, art);
  }
  drawD1(); p.finish();
})();
