(function () {
  'use strict';

  var svg = document.querySelector('.scene');
  var NS = 'http://www.w3.org/2000/svg';
  var INK = 'var(--ink)';
  var INK80 = 'var(--ink-80)';
  var INK70 = 'var(--ink-70)';
  var INK45 = 'var(--ink-45)';
  var FUNCTIONAL = 'var(--wp-color-functional)';
  var SANS = 'var(--sans)';
  var MONO = 'var(--mono)';
  var SERIF = 'var(--serif)';

  function el(tag, attrs, parent) {
    var node = document.createElementNS(NS, tag);
    Object.keys(attrs || {}).forEach(function (key) { node.setAttribute(key, attrs[key]); });
    (parent || svg).appendChild(node);
    return node;
  }

  function text(value, x, y, attrs, parent) {
    var node = el('text', Object.assign({
      x: x, y: y, fill: INK, 'font-family': SANS, 'font-weight': 300
    }, attrs || {}), parent);
    node.textContent = value;
    return node;
  }

  function line(x1, y1, x2, y2, attrs, parent) {
    return el('line', Object.assign({
      x1: x1, y1: y1, x2: x2, y2: y2, stroke: INK, 'stroke-width': 1
    }, attrs || {}), parent);
  }

  function drawA5() {
    text('项目交付的三条责任链', 90, 222, { 'font-family': SERIF, 'font-size': 50, 'font-weight': 500 });
    text('三组条文彼此并列，竖版按章节从上到下完整阅读。', 90, 274, { 'font-size': 25, fill: INK70 });

    var chapters = [
      {
        code: 'CH.1 · SCHEDULE', title: '进度与里程碑',
        items: ['里程碑计划评审确认', '评审意见按时闭环留档', '进度偏差说明追赶方案', '提升成果完整与可复用性', '交付范围变更重新评审']
      },
      {
        code: 'CH.2 · SERVICE PROVISION', title: '服务提供',
        items: ['启动前完成制度培训', '服务协议写清双方责任', '紧急问题优先响应同步', '季度服务运行报告留档', '建立投诉举报与反馈机制']
      },
      {
        code: 'CH.3 · CONTENT & REVIEW', title: '内容与质检',
        items: ['内容遵循统一风格规范', '外部数据核对来源口径', '素材授权状态留存凭证', '质检问题当日退回修正', '未过质检整改重新复检']
      }
    ];

    chapters.forEach(function (chapter, chapterIndex) {
      var y = 306 + chapterIndex * 300;
      var panel = el('g', { 'data-layout-zone': 'a5.chapter-' + (chapterIndex + 1) });
      text(chapter.title, 90, y + 50, { 'font-size': 32, 'font-weight': 400 }, panel);
      text(chapter.code, 990, y + 45, {
        'font-family': MONO, 'font-size': 12, 'letter-spacing': 1.5,
        'text-anchor': 'end', fill: INK45
      }, panel);
      line(90, y + 70, 390, y + 70, {
        'data-a5-title-rule': 'primary',
        stroke: FUNCTIONAL, 'stroke-width': 2, opacity: 1
      }, panel);
      line(90, y + 76, 218, y + 76, {
        'data-a5-title-rule': 'secondary',
        stroke: FUNCTIONAL, 'stroke-width': 1, opacity: 1
      }, panel);
      chapter.items.forEach(function (item, itemIndex) {
        var col = itemIndex % 2;
        var row = Math.floor(itemIndex / 2);
        var x = 90 + col * 480;
        var itemY = y + 120 + row * 64;
        text(String(itemIndex + 1).padStart(2, '0'), x, itemY, {
          'data-xp-anchor': 'index',
          'font-family': MONO, 'font-size': 13, 'letter-spacing': 1.5,
          fill: INK45
        }, panel);
        var itemAttrs = { 'font-size': 24, fill: INK };
        if (chapterIndex === 1 && itemIndex === 0) {
          itemAttrs.id = 'a5-regulation-portrait';
          itemAttrs['data-a5-regulation-focus'] = 'true';
          itemAttrs['data-emphasis-candidate'] = 'true';
        }
        text(item, x + 56, itemY, itemAttrs, panel);
      });
    });
  }

  drawA5();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
