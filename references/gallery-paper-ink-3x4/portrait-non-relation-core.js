(function (global) {
  'use strict';

  var NS = 'http://www.w3.org/2000/svg';
  var svg = document.querySelector('.scene');
  if (!svg) throw new Error('3:4 非关系页缺少 .scene');

  function el(tag, attrs, parent) {
    var node = document.createElementNS(NS, tag);
    Object.keys(attrs || {}).forEach(function (key) { node.setAttribute(key, attrs[key]); });
    (parent || svg).appendChild(node);
    return node;
  }

  function text(value, x, y, attrs, parent) {
    var node = el('text', Object.assign({
      x: x, y: y, fill: 'var(--ink)', 'font-family': 'var(--sans)', 'font-weight': 300
    }, attrs || {}), parent);
    node.textContent = value;
    return node;
  }

  function line(x1, y1, x2, y2, attrs, parent) {
    return el('line', Object.assign({
      x1: x1, y1: y1, x2: x2, y2: y2, stroke: 'var(--ink)', 'stroke-width': 1
    }, attrs || {}), parent);
  }

  function rect(x, y, width, height, attrs, parent) {
    return el('rect', Object.assign({x: x, y: y, width: width, height: height}, attrs || {}), parent);
  }

  function circle(cx, cy, r, attrs, parent) {
    return el('circle', Object.assign({cx: cx, cy: cy, r: r}, attrs || {}), parent);
  }

  function path(d, attrs, parent) {
    return el('path', Object.assign({d: d}, attrs || {}), parent);
  }

  function group(attrs, parent) { return el('g', attrs || {}, parent); }

  function doublePanel(x, y, width, height, attrs, parent) {
    var g = group(attrs, parent);
    rect(x, y, width, height, {fill: 'var(--paper-panel)', stroke: 'var(--ink-80)', 'stroke-width': 1.2}, g);
    rect(x + 6, y + 6, width - 12, height - 12, {fill: 'none', stroke: 'var(--ink-45)', 'stroke-width': .6}, g);
    return g;
  }

  function cross(x, y, size, opacity, parent) {
    line(x - size, y, x + size, y, {stroke: 'var(--ink-45)', 'stroke-width': .7, opacity: opacity == null ? .55 : opacity}, parent);
    line(x, y - size, x, y + size, {stroke: 'var(--ink-45)', 'stroke-width': .7, opacity: opacity == null ? .55 : opacity}, parent);
  }

  function label(value, x, y, attrs, parent) {
    return text(value, x, y, Object.assign({
      'font-family': 'var(--mono)', 'font-size': 15, 'letter-spacing': 2.3, fill: 'var(--ink-45)'
    }, attrs || {}), parent);
  }

  function seeded(seed) {
    var state = seed >>> 0;
    return function () {
      state = (state * 1664525 + 1013904223) >>> 0;
      return state / 4294967296;
    };
  }

  function dotField(x, y, width, height, count, seed, attrs, parent) {
    var random = seeded(seed || 1);
    var g = group(attrs, parent);
    for (var i = 0; i < count; i += 1) {
      var r = .65 + random() * 1.65;
      circle(x + random() * width, y + random() * height, r, {
        fill: 'var(--ink)', opacity: .08 + random() * .34
      }, g);
    }
    return g;
  }

  function titleBlock(kicker, lines, x, y, options, parent) {
    var opts = options || {};
    var anchor = opts.anchor || 'start';
    label(kicker, x, y, {'text-anchor': anchor, fill: opts.kickerFill || 'var(--ink-70)'}, parent);
    (Array.isArray(lines) ? lines : [lines]).forEach(function (value, index) {
      text(value, x, y + 92 + index * (opts.leading || 88), {
        'text-anchor': anchor,
        'font-family': opts.family || 'var(--serif)',
        'font-size': opts.size || 78,
        'font-weight': opts.weight || 500,
        'letter-spacing': opts.letterSpacing || 2,
        fill: opts.fill || 'var(--ink)'
      }, parent);
    });
  }

  function finish() {
    document.documentElement.dataset.renderPending = 'false';
    if (typeof global.stageFit === 'function') global.stageFit();
  }

  global.PortraitNonRelation = Object.freeze({
    svg: svg, el: el, text: text, line: line, rect: rect, circle: circle, path: path,
    group: group, doublePanel: doublePanel, cross: cross, label: label,
    seeded: seeded, dotField: dotField, titleBlock: titleBlock, finish: finish
  });
})(window);
