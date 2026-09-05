(function () {
  'use strict';

  var svg = document.querySelector('.scene');
  var overlay = document.getElementById('c4-nodes');
  var NS = 'http://www.w3.org/2000/svg';
  var INK = 'var(--ink)';
  var INK80 = 'var(--ink-80)';
  var INK70 = 'var(--ink-70)';
  var INK55 = 'var(--ink-55)';
  var FUNCTIONAL = 'var(--wp-color-functional)';
  var INK45 = 'var(--ink-45)';
  var MONO = 'var(--mono)';
  var SANS = 'var(--sans)';
  var SERIF = 'var(--serif)';
  var CHART_X = 90;
  var CHART_Y = 332;
  var NODES = [
    { city: '广州市', lng: 113.26, lat: 23.13, value: 42, tag: '广州', en: 'GUANGZHOU', dir: Math.PI, focus: true },
    { city: '深圳市', lng: 114.06, lat: 22.55, value: 27, tag: '深圳', en: 'SHENZHEN', dir: .48 },
    { city: '佛山市', lng: 113.12, lat: 23.02, value: 19, tag: '佛山', en: 'FOSHAN', dir: -2.25 },
    { city: '东莞市', lng: 113.75, lat: 23.05, value: 14, tag: '东莞', en: 'DONGGUAN', dir: -.58 },
    { city: '珠海市', lng: 113.58, lat: 22.27, value: 9, tag: '珠海', en: 'ZHUHAI', dir: 1.2 },
    { city: '汕头市', lng: 116.68, lat: 23.35, value: 6, tag: '汕头', en: 'SHANTOU', dir: 0 }
  ];
  var KPIS = [
    { value: '117', label: '部署节点总数（个）', en: 'DEPLOYED NODES' },
    { value: '3,842', label: '在线推理实例（路）', en: 'ONLINE INFERENCE' },
    { value: '21', label: '覆盖城市（个）', en: 'CITIES COVERED' },
    { value: '96', label: '日均调用量（万次）', en: 'DAILY CALLS' }
  ];

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
      x1: x1, y1: y1, x2: x2, y2: y2,
      stroke: INK, 'stroke-width': 1
    }, attrs || {}), parent);
  }

  function resolveCssColor(value) {
    var probe = document.createElement('span');
    probe.style.color = value;
    document.body.appendChild(probe);
    var resolved = getComputedStyle(probe).color;
    probe.remove();
    return resolved;
  }

  function rampRgb() {
    var value = getComputedStyle(document.documentElement)
      .getPropertyValue('--wp-private-identity-accent').trim();
    var match = /^#([0-9a-f]{6})$/i.exec(value);
    if (!match) return '25,25,23';
    var number = parseInt(match[1], 16);
    return ((number >> 16) & 255) + ',' + ((number >> 8) & 255) + ',' + (number & 255);
  }

  function rampAlpha(value) {
    var low = .12, high = .55;
    if (value <= 6) return low;
    if (value >= 42) return high;
    return +(low + (value - 6) / 36 * (high - low)).toFixed(3);
  }

  function drawLegend(group) {
    var rgb = rampRgb();
    var alphas = [.12, .19, .27, .38, .55];
    text('少', 112, 894, { 'font-size': 10, fill: INK45 }, group);
    alphas.forEach(function (alpha, index) {
      el('rect', {
        x: 140 + index * 28, y: 883, width: 25, height: 12,
        fill: 'rgba(' + rgb + ',' + alpha + ')', stroke: INK55, 'stroke-width': .5
      }, group);
    });
    text('多', 292, 894, { 'font-size': 10, fill: INK45 }, group);
  }

  function drawMapFrame() {
    var group = el('g', {
      'data-layout-zone': 'c4.map',
      'data-slot-id': 'guangdong-city-node-map',
      'data-fixed-quantity': '6'
    });
    text('MAP 01 — GUANGDONG AI SERVICE NETWORK', 112, 366, {
      'font-family': MONO, 'font-size': 10, 'letter-spacing': 1.45
    }, group);
    line(112, 379, 510, 379, { stroke: INK45, 'stroke-width': .6 }, group);
    text('FILL INTENSITY = NODES · 112°E–117°E', 968, 366, {
      'font-family': MONO, 'font-size': 8.6, 'letter-spacing': 1.05,
      'text-anchor': 'end', fill: INK45
    }, group);
    line(325, 404, 325, 868, { stroke: INK45, 'stroke-width': .45, 'stroke-dasharray': '2 7', opacity: .6 }, group);
    line(718, 404, 718, 868, { stroke: INK45, 'stroke-width': .45, 'stroke-dasharray': '2 7', opacity: .6 }, group);
    drawLegend(group);
    text('MAP DATA © DATAV.GEOATLAS', 968, 894, {
      'font-family': MONO, 'font-size': 8.2, 'letter-spacing': 1.1,
      'text-anchor': 'end', fill: INK45
    }, group);
  }

  function drawKpiGrid() {
    var group = el('g', {
      'data-layout-zone': 'c4.province-totals',
      'data-slot-id': 'province-kpi-grid',
      'data-fixed-quantity': '4'
    });
    text('PROVINCE TOTALS', 90, 963, {
      'data-xp-anchor': 'kpi-head', 'font-family': MONO, 'font-size': 10, 'letter-spacing': 1.7, fill: FUNCTIONAL
    }, group);
    line(266, 959, 990, 959, { 'data-xp-anchor': 'kpi-head-rule', stroke: FUNCTIONAL, 'stroke-width': 2 }, group);
    KPIS.forEach(function (item, index) {
      var col = index % 2;
      var row = Math.floor(index / 2);
      var x = 90 + col * 465;
      var y = 986 + row * 123;
      var cell = el('g', {
        'data-layout-zone': 'c4.kpi-' + (index + 1),
        'data-repeat-unit': 'province-kpi',
        'data-kpi-value': item.value
      }, group);
      text(String(index + 1).padStart(2, '0'), x + 22, y + 29, {
        'font-family': MONO, 'font-size': 8.5, 'letter-spacing': 1.1, fill: INK45
      }, cell);
      text(item.value, x + 22, y + 69, {
        'font-family': MONO, 'font-size': 32, 'letter-spacing': .6
      }, cell);
      text(item.label, x + 176, y + 50, { 'font-size': 13, fill: INK70 }, cell);
      text(item.en, x + 176, y + 72, {
        'font-family': MONO, 'font-size': 7.9, 'letter-spacing': 1.05, fill: INK45
      }, cell);
    });
    line(90, 1098, 990, 1098, { stroke: INK45, 'stroke-width': .55 }, group);
  }

  function drawReadingGuide() {
    var group = el('g', {
      'data-layout-zone': 'c4.reading-guide',
      'data-slot-id': 'map-to-province-totals'
    });
    line(90, 1230, 990, 1230, { stroke: INK45, 'stroke-width': .6 }, group);
    text('6 COVERED CITIES → PROVINCE TOTALS', 90, 1255, {
      'font-family': MONO, 'font-size': 9, 'letter-spacing': 1.25, fill: INK45
    }, group);
    text('GUANGZHOU · SHENZHEN CORE', 990, 1255, {
      'font-family': MONO, 'font-size': 9, 'letter-spacing': 1.15,
      'text-anchor': 'end', fill: INK45
    }, group);
  }

  function drawC4() {
    text('六城成网，广深构成服务密度核心', 90, 214, {
      'font-family': SERIF, 'font-size': 45, 'font-weight': 500
    });
    text('真实市界承载节点分布，下方四项指标补足全省规模证据。', 90, 266, {
      'font-size': 19, fill: INK70
    });
    drawMapFrame();
    drawKpiGrid();
    drawReadingGuide();
  }

  function overlayEl(tag, attrs, parent) {
    return el(tag, attrs, parent || overlay);
  }

  function overlayText(value, x, y, attrs, parent) {
    return text(value, x, y, attrs, parent || overlay);
  }

  function drawCityCallouts(chart) {
    overlay.replaceChildren();
    NODES.forEach(function (item, index) {
      var point = chart.convertToPixel({ seriesIndex: 0 }, [item.lng, item.lat]);
      if (!point || !Number.isFinite(point[0]) || !Number.isFinite(point[1])) return;
      var x = point[0] + CHART_X;
      var y = point[1] + CHART_Y;
      var length = item.city === '汕头市' ? 72 : 84;
      var ax = x + Math.cos(item.dir) * length;
      var ay = y + Math.sin(item.dir) * length;
      var anchor = Math.cos(item.dir) >= 0 ? 'start' : 'end';
      var tx = ax + (anchor === 'start' ? 8 : -8);
      var group = overlayEl('g', {
        'data-layout-zone': 'c4.city-' + (index + 1),
        'data-repeat-unit': 'covered-city',
        'data-city': item.city,
        'data-node-count': String(item.value)
      });
      overlayEl('circle', {
        id: item.focus ? 'c4-focus-marker' : 'c4-city-marker-' + (index + 1),
        cx: x, cy: y, r: 3, fill: INK
      }, group).setAttribute('data-callout-owner', item.city);
      overlayEl('line', {
        x1: x + Math.cos(item.dir) * 5, y1: y + Math.sin(item.dir) * 5,
        x2: ax, y2: ay, stroke: INK55, 'stroke-width': .75
      }, group);
      overlayEl('line', {
        x1: ax, y1: ay - 5, x2: ax, y2: ay + 5,
        stroke: INK70, 'stroke-width': .8
      }, group);
      overlayText(item.value + ' 节点', tx, ay - 5, {
        id: item.focus ? 'sample-focus' : 'c4-node-value-' + (index + 1),
        'font-family': MONO, 'font-size': 11, 'letter-spacing': .7,
        'text-anchor': anchor, fill: INK
      }, group);
      overlayText(item.tag + ' · ' + item.en, tx, ay + 14, {
        id: item.focus ? 'c4-focus-city' : 'c4-city-label-' + (index + 1),
        'font-size': 8.6, 'letter-spacing': .65,
        'text-anchor': anchor, fill: INK70
      }, group);
    });
  }

  function renderMap() {
    if (!window.echarts) throw new Error('C4 缺少 ECharts');
    if (!window.WISE_GUANGDONG_GEO) throw new Error('C4 缺少广东地图资产');
    window.echarts.registerMap('guangdong-c4-portrait', window.WISE_GUANGDONG_GEO);
    var chart = window.echarts.init(document.getElementById('c4-chart'), null, { renderer: 'canvas' });
    var rgb = rampRgb();
    var neutral = resolveCssColor('color-mix(in srgb, var(--paper-deep) 55%, transparent)');
    var label = resolveCssColor('color-mix(in srgb, var(--ink) 30%, transparent)');
    var focus = getComputedStyle(document.documentElement).getPropertyValue('--wp-color-focus-peripheral').trim();
    var accentOn = document.documentElement.classList.contains('accent');
    chart.setOption({
      animation: false,
      backgroundColor: 'transparent',
      series: [{
        type: 'map', map: 'guangdong-c4-portrait', roam: false,
        data: NODES.map(function (item) {
          return {
            name: item.city, value: item.value,
            itemStyle: { areaColor: accentOn && item.focus ? focus : 'rgba(' + rgb + ',' + rampAlpha(item.value) + ')' }
          };
        }),
        itemStyle: { areaColor: neutral, borderColor: INK, borderWidth: .85, shadowBlur: 0 },
        emphasis: { disabled: true, label: { show: false } },
        select: { disabled: true },
        label: { show: true, color: label, fontFamily: MONO, fontSize: 8.2 },
        layoutCenter: ['50%', '51%'], layoutSize: '75%'
      }]
    });
    drawCityCallouts(chart);
    return chart;
  }

  function markReady() {
    document.documentElement.dataset.renderPending = 'false';
    stageFit();
  }

  drawC4();
  stageFit();
  var chart = renderMap();
  requestAnimationFrame(function () {
    chart.resize();
    drawCityCallouts(chart);
    markReady();
  });
})();
