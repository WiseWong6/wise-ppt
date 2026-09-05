(function () {
  'use strict';

  var svg = document.querySelector('.scene');
  var NS = 'http://www.w3.org/2000/svg';
  var INK = 'var(--ink)';
  var INK70 = 'var(--ink-70)';
  var SANS = 'var(--sans)';
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

  function drawAdminConnector() {
    document.getElementById('a8-link').setAttribute('d', 'M 982 576 L 1016 576 L 1016 936 L 980 936');
    document.getElementById('a8-link-arrow').setAttribute('d', 'M 992 928 L 980 936 L 992 944');
  }

  function drawA8() {
    text('一次失败运行，必须能追到具体节点', 70, 214, {
      'font-family': SERIF, 'font-size': 45, 'font-weight': 500
    });
    text('上半区定位会话，下半区展开节点、耗时、输入与输出。', 70, 266, {
      'font-size': 19, fill: INK70
    });
    drawAdminConnector();
  }

  drawA8();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
