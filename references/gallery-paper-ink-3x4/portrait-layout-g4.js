(function () {
  'use strict';

  var svg = document.querySelector('.scene');
  var NS = 'http://www.w3.org/2000/svg';
  var INK = 'var(--ink)';
  var INK80 = 'var(--ink-80)';
  var INK70 = 'var(--ink-70)';
  var INK45 = 'var(--ink-45)';
  var PAPER = 'var(--paper)';
  var FUNCTIONAL = 'var(--wp-color-functional)';
  var SANS = 'var(--sans)';
  var MONO = 'var(--mono)';
  var SERIF = 'var(--serif)';

  var CENTER = { x: 540, y: 760, r: 280 };
  var MODULES = [
    {
      no: '01', code: 'SERV', title: '模型服务', side: 'top', angle: 90,
      lines: ['多模型统一接入与路由', '首字延迟 0.4 秒级']
    },
    {
      no: '02', code: 'DATA', title: '数据管线', side: 'left', angle: 150,
      lines: ['语料采集清洗到训练就绪', '管线日处理亿级']
    },
    {
      no: '03', code: 'EVAL', title: '评测体系', side: 'left', angle: 210,
      lines: ['离线基准与线上 A/B 双轨', '评测集覆盖率 99%']
    },
    {
      no: '04', code: 'GATE', title: '部署网关', side: 'right', angle: 30,
      lines: ['灰度发布与流量调度', '切流 200ms 内']
    },
    {
      no: '05', code: 'METER', title: '监控告警', side: 'right', angle: 330,
      lines: ['延迟·成本·质量三维监控', '告警响应 3 秒内']
    },
    {
      no: '06', code: 'GOVN', title: '治理合规', side: 'bottom', angle: 270,
      lines: ['内容安全与隐私脱敏审计', '审计定位到调用级']
    }
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
      x1: x1, y1: y1, x2: x2, y2: y2, stroke: INK, 'stroke-width': 1
    }, attrs || {}), parent);
  }

  function satellitePoint(angle) {
    var rad = angle * Math.PI / 180;
    return {
      x: CENTER.x + CENTER.r * Math.cos(rad),
      y: CENTER.y - CENTER.r * Math.sin(rad)
    };
  }

  function drawOrbit(parent) {
    var group = el('g', {
      'data-layout-zone': 'g4.orbit',
      'data-slot-id': 'capability-orbit'
    }, parent);
    el('circle', {
      cx: CENTER.x, cy: CENTER.y, r: CENTER.r,
      fill: 'none', stroke: INK, 'stroke-width': .75,
      opacity: .4, 'stroke-dasharray': '4 7'
    }, group);
  }

  function drawCenterHub(parent) {
    var group = el('g', {
      'data-layout-zone': 'g4.center',
      'data-slot-id': 'platform-core',
      'data-component-id': 'native.paper-ink.radial.hub-node'
    }, parent);
    el('circle', {
      id: 'g4-focus-outer', cx: CENTER.x, cy: CENTER.y, r: 108,
      fill: PAPER, stroke: INK45, 'stroke-width': .75, opacity: .55
    }, group);
    el('circle', {
      id: 'g4-focus-frame', cx: CENTER.x, cy: CENTER.y, r: 95,
      fill: PAPER, stroke: INK80, 'stroke-width': 1.7
    }, group);
    text('AI 平台中枢', CENTER.x, CENTER.y - 8, {
      id: 'g4-focus-title', 'font-size': 28, 'font-weight': 400,
      'letter-spacing': 3, 'text-anchor': 'middle'
    }, group);
    text('MAAS CORE', CENTER.x, CENTER.y + 31, {
      id: 'sample-focus', 'font-family': MONO, 'font-size': 12,
      'letter-spacing': 3, 'text-anchor': 'middle', fill: INK45
    }, group);
  }

  function drawModuleNote(module, point, index, parent) {
    if (module.side === 'top' || module.side === 'bottom') {
      var top = module.side === 'top';
      var codeY = top ? 330 : 1110;
      var titleY = codeY + 32;
      var bodyY = titleY + 27;
      var centeredGroup = el('g', {
        'data-layout-zone': 'g4.module-' + (index + 1),
        'data-slot-id': module.code.toLowerCase() + '-description',
        'data-repeat-unit': 'module-note',
        'data-component-id': 'native.paper-ink.radial.module-note'
      }, parent);
      line(point.x, top ? 418 : point.y + 43, point.x, top ? point.y - 43 : 1096, {
        stroke: INK, 'stroke-width': .7, opacity: .46, 'stroke-dasharray': '3 5'
      }, centeredGroup);
      text('MOD ' + module.no + ' · ' + module.code, point.x, codeY, {
        'font-family': MONO, 'font-size': 10.5, 'letter-spacing': 1.35,
        'text-anchor': 'middle', fill: INK45
      }, centeredGroup);
      text(module.title, point.x, titleY, {
        'font-size': 24, 'font-weight': 300, 'text-anchor': 'middle'
      }, centeredGroup);
      module.lines.forEach(function (value, lineIndex) {
        text(value, point.x, bodyY + lineIndex * 22, {
          'font-size': 14.5, 'text-anchor': 'middle', fill: INK70
        }, centeredGroup);
      });
      return;
    }
    var left = module.side === 'left';
    var anchor = left ? 'end' : 'start';
    var textX = left ? 220 : 860;
    var railX = left ? 245 : 835;
    var edgeX = point.x + (left ? -48 : 48);
    var group = el('g', {
      'data-layout-zone': 'g4.module-' + (index + 1),
      'data-slot-id': module.code.toLowerCase() + '-description',
      'data-repeat-unit': 'module-note',
      'data-component-id': 'native.paper-ink.radial.module-note'
    }, parent);
    line(railX, point.y - 48, railX, point.y + 52, {
      stroke: INK, 'stroke-width': .75, opacity: .46
    }, group);
    line(edgeX, point.y, railX, point.y, {
      stroke: INK, 'stroke-width': .7, opacity: .46, 'stroke-dasharray': '3 5'
    }, group);
    el('circle', { cx: railX, cy: point.y, r: 2.2, fill: INK, opacity: .58 }, group);
    text('MOD ' + module.no + ' · ' + module.code, textX, point.y - 36, {
      'font-family': MONO, 'font-size': 10.5, 'letter-spacing': 1.35,
      'text-anchor': anchor, fill: INK45
    }, group);
    text(module.title, textX, point.y - 4, {
      'font-size': 24, 'font-weight': 300, 'text-anchor': anchor
    }, group);
    module.lines.forEach(function (value, lineIndex) {
      text(value, textX, point.y + 23 + lineIndex * 24, {
        'font-size': 14.5, 'text-anchor': anchor, fill: INK70
      }, group);
    });
  }

  function drawSatellite(module, index, parent) {
    var point = satellitePoint(module.angle);
    var group = el('g', {
      'data-layout-zone': 'g4.satellite-' + (index + 1),
      'data-slot-id': module.code.toLowerCase(),
      'data-repeat-unit': 'satellite',
      'data-component-id': 'native.paper-ink.radial.satellite-node'
    }, parent);
    el('circle', {
      cx: point.x, cy: point.y, r: 43,
      fill: PAPER, stroke: INK80, 'stroke-width': 1.25
    }, group);
    el('circle', {
      cx: point.x, cy: point.y, r: 36,
      fill: 'none', stroke: INK, 'stroke-width': .6, opacity: .35
    }, group);
    text(module.code, point.x, point.y + 4, {
      'font-family': MONO, 'font-size': 11.5, 'letter-spacing': 1.25,
      'text-anchor': 'middle'
    }, group);
    drawModuleNote(module, point, index, parent);
  }

  function drawG4() {
    text('六项能力，围绕同一个平台中枢', 90, 214, {
      'font-family': SERIF, 'font-size': 46, 'font-weight': 500
    });
    text('六个模块围绕同一核心协作；编号表示职责，不是步骤。', 90, 266, {
      'font-size': 20, fill: INK70
    });
    var radial = el('g', {
      'data-layout-zone': 'g4.radial',
      'data-slot-id': 'hub-and-six-capabilities',
      'data-fixed-quantity': '6',
      'data-equal-radius': String(CENTER.r)
    });
    drawOrbit(radial);
    var satellites = el('g', {
      'data-layout-zone': 'g4.satellites',
      'data-slot-id': 'six-capability-nodes'
    }, radial);
    MODULES.forEach(function (module, index) { drawSatellite(module, index, satellites); });
    drawCenterHub(radial);
  }

  drawG4();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
