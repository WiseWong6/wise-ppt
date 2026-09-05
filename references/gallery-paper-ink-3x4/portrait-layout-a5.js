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
    text('AI 上线的三条责任链', 90, 222, { 'font-family': SERIF, 'font-size': 50, 'font-weight': 500 });
    text('三组条文彼此并列，竖版按章节从上到下完整阅读。', 90, 274, { 'font-size': 25, fill: INK70 });

    var chapters = [
      {
        code: 'CH.1 · GENERAL RULES', title: '数据与训练',
        items: ['训练语料来源合法', '个人信息取得同意并脱敏', '违法数据立即停止使用', '保证数据真实、准确、可靠', '模型重大变更重新评估']
      },
      {
        code: 'CH.2 · SERVICE PROVISION', title: '服务提供',
        items: ['上线前完成算法备案', '服务协议写清双方责任', '未成年人使用须监护同意', '承担个人信息处理责任', '建立投诉举报与反馈机制']
      },
      {
        code: 'CH.3 · CONTENT & SAFETY', title: '内容与安全',
        items: ['生成内容守住价值底线', '防范未成年人过度依赖', '显著标明 AI 生成内容', '违法内容立即处置并留档', '违规服务依法暂停或关闭']
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
