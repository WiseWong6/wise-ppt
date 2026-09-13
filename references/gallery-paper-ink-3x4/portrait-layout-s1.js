(function () {
  'use strict';

  var svg = document.querySelector('.scene');
  var NS = 'http://www.w3.org/2000/svg';
  var INK = 'var(--ink)';
  var INK80 = 'var(--ink-80)';
  var INK70 = 'var(--ink-70)';
  var INK45 = 'var(--ink-45)';
  var PANEL = 'var(--paper-panel)';
  var PAPER = 'var(--paper)';
  var FUNCTIONAL = 'var(--wp-color-functional)';
  var SANS = 'var(--sans)';
  var MONO = 'var(--mono)';
  var SERIF = 'var(--serif)';

  var LAYERS = [
    {
      no: 'L1', label: '应用', kind: 'simple',
      nodes: ['应用管理', '资源配置', 'Agent框架', 'Multi-Agent编排']
    },
    {
      no: 'L2', label: '资源', kind: 'groups', columns: 2,
      groups: [
        { label: '提示词', items: ['Prompt配置', '模型配置', '变量应用', '自动化'] },
        { label: '工具接入', items: ['内部API接入', 'MCP接入', '工具注册', '调用监控'] },
        { label: 'Skills组件', items: ['调用框架', 'Skills注册', 'Skills市场', 'Skills推荐'] },
        { label: '知识库', items: ['上传解析', '召回配置', '切片配置', '召回测试'] }
      ]
    },
    {
      no: 'L3', label: '评测', kind: 'simple',
      nodes: ['评测集', '评测指标', '评测任务']
    },
    {
      no: 'L4', label: '追踪', kind: 'simple',
      nodes: ['Trace上报', '业务质检', '用户反馈', '数据看板']
    },
    {
      no: 'L5', label: '基础设施', kind: 'groups', columns: 3,
      groups: [
        { label: '模型管理', items: ['供应商管理', '模型管理', '路由策略', '成本监控'] },
        { label: '日志治理', items: ['审计日志', '操作日志', '登录日志', '异常日志'] },
        { label: '权限管理', items: ['组织架构', '角色管理', '功能权限', '操作权限'] }
      ]
    }
  ];

  var SAFE = window.PORTRAIT_SAFE;
  var ROW_WEIGHTS = [116, 330, 116, 116, 241];
  var ROW_TOTAL = ROW_WEIGHTS.reduce(function (sum, value) { return sum + value; }, 0);
  var ROW_HEIGHTS = ROW_WEIGHTS.map(function (weight) { return weight / ROW_TOTAL * (SAFE.bottom - 330); });
  var ARCH_X = 90;
  var ARCH_Y = 330;
  var ARCH_WIDTH = 900;
  var LABEL_WIDTH = 140;
  var CONTENT_X = ARCH_X + LABEL_WIDTH;
  var CONTENT_WIDTH = ARCH_WIDTH - LABEL_WIDTH;
  var simpleNodeIndex = 0;
  var groupCardIndex = 0;
  var itemIndex = 0;

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

  function sectionLabel(y) {
    var group = el('g', { 'data-layout-zone': 's1.section', 'data-slot-id': 'section-label' });
    text('01 / PRODUCT PLATFORM', 90, y, {
      'font-family': MONO, 'font-size': 11, 'letter-spacing': 1.8, fill: INK45
    }, group);
    line(346, y - 4, 990, y - 4, { stroke: INK45, 'stroke-width': .65 }, group);
    text('FIVE LAYERS', 990, y, {
      'font-family': MONO, 'font-size': 10, 'letter-spacing': 1.5, 'text-anchor': 'end', fill: INK45
    }, group);
  }

  function drawLayerRail(layer, layerIndex, rowY, rowHeight, parent) {
    var group = el('g', {
      'data-layout-zone': 's1.layer-label-' + (layerIndex + 1),
      'data-slot-id': 'layer-label-' + (layerIndex + 1)
    }, parent);
    el('rect', {
      'data-xp-anchor': 'layer', 'data-s1-layer-tone': 'true',
      x: ARCH_X + 1, y: rowY + 1, width: LABEL_WIDTH - 2, height: rowHeight - 2,
      fill: layerIndex === 1 || layerIndex === 4 ? PANEL : INK,
      opacity: layerIndex === 1 || layerIndex === 4 ? .72 : .045
    }, group);
    el('circle', {
      'data-xp-anchor': 'rail-dot',
      cx: ARCH_X + 12, cy: rowY + 27, r: 4.5, fill: FUNCTIONAL
    }, group);
    text(layer.no, ARCH_X + 24, rowY + 31, {
      'data-s1-layer-tone-copy': 'true',
      'font-family': MONO, 'font-size': 10, 'letter-spacing': 1.6, fill: INK45
    }, group);
    text(layer.label, ARCH_X + LABEL_WIDTH / 2, rowY + rowHeight / 2 + 8, {
      'data-s1-layer-tone-copy': 'true',
      'font-size': layer.label.length > 3 ? 18 : 22,
      'font-weight': 500,
      'text-anchor': 'middle',
      fill: INK
    }, group);
    text((layer.nodes || layer.groups).length + (layer.kind === 'groups' ? ' GROUPS' : ' UNITS'), ARCH_X + LABEL_WIDTH / 2, rowY + rowHeight - 20, {
      'data-s1-layer-tone-copy': 'true',
      'font-family': MONO, 'font-size': 8.5, 'letter-spacing': 1.1, 'text-anchor': 'middle', fill: INK45
    }, group);
  }

  function drawSimpleNode(label, nodeX, nodeY, nodeWidth, nodeHeight, parent) {
    simpleNodeIndex += 1;
    var group = el('g', {
      'data-layout-zone': 's1.simple-node-' + simpleNodeIndex,
      'data-slot-id': 'simple-node-' + simpleNodeIndex,
      'data-repeat-unit': 'node'
    }, parent);
    el('rect', {
      x: nodeX, y: nodeY, width: nodeWidth, height: nodeHeight,
      fill: PAPER, stroke: INK45, 'stroke-width': .65
    }, group);
    line(nodeX + 12, nodeY + 10, nodeX + 42, nodeY + 10, {
      stroke: INK45, 'stroke-width': 1.2
    }, group);
    text(label, nodeX + nodeWidth / 2, nodeY + nodeHeight / 2 + 6, {
      'font-size': label.length > 12 ? 13 : 15.5,
      'font-weight': 400,
      'text-anchor': 'middle'
    }, group);
  }

  function drawSimpleLayer(layer, rowY, rowHeight, parent) {
    var gap = 8;
    var count = layer.nodes.length;
    var nodeWidth = (CONTENT_WIDTH - 28 - gap * (count - 1)) / count;
    var nodeHeight = 60;
    var nodeY = rowY + (rowHeight - nodeHeight) / 2;
    layer.nodes.forEach(function (label, nodeIndex) {
      drawSimpleNode(label, CONTENT_X + 14 + nodeIndex * (nodeWidth + gap), nodeY, nodeWidth, nodeHeight, parent);
    });
  }

  function drawGroupItem(label, x, y, width, height, parent) {
    itemIndex += 1;
    var group = el('g', {
      'data-layout-zone': 's1.item-' + itemIndex,
      'data-slot-id': 'group-item-' + itemIndex,
      'data-repeat-unit': 'item'
    }, parent);
    el('rect', {
      x: x, y: y, width: width, height: height,
      fill: PAPER, stroke: INK45, 'stroke-width': .45
    }, group);
    text(label, x + width / 2, y + height / 2 + 4.5, {
      'font-size': label.length > 7 ? 11.5 : 13,
      'text-anchor': 'middle', fill: INK70
    }, group);
  }

  function drawGroupCard(groupData, x, y, width, height, parent) {
    groupCardIndex += 1;
    var group = el('g', {
      'data-layout-zone': 's1.group-card-' + groupCardIndex,
      'data-slot-id': 'group-card-' + groupCardIndex,
      'data-repeat-unit': 'group'
    }, parent);
    el('rect', {
      x: x, y: y, width: width, height: height,
      fill: PAPER, stroke: INK, 'stroke-width': .8
    }, group);
    el('rect', {
      x: x + 1, y: y + 1, width: width - 2, height: 34,
      fill: PANEL, opacity: .84
    }, group);
    text(groupData.label, x + 14, y + 23, {
      'data-xp-anchor': 'group-title',
      'font-size': 14, 'font-weight': 500
    }, group);
    text(String(groupData.items.length).padStart(2, '0'), x + width - 14, y + 22, {
      'font-family': MONO, 'font-size': 9, 'letter-spacing': 1.2,
      'text-anchor': 'end', fill: INK45
    }, group);

    var padding = 12;
    var gap = 10;
    var gridY = y + 42;
    var gridHeight = height - 50;
    var itemWidth = (width - padding * 2 - gap) / 2;
    var itemHeight = (gridHeight - gap) / 2;
    groupData.items.forEach(function (label, localIndex) {
      var column = localIndex % 2;
      var row = Math.floor(localIndex / 2);
      drawGroupItem(
        label,
        x + padding + column * (itemWidth + gap),
        gridY + row * (itemHeight + gap),
        itemWidth,
        itemHeight,
        group
      );
    });
  }

  function drawGroupLayer(layer, rowY, rowHeight, parent) {
    var padding = 12;
    var gap = layer.columns === 2 ? 10 : 8;
    var columns = layer.columns;
    var rows = Math.ceil(layer.groups.length / columns);
    var cardWidth = (CONTENT_WIDTH - padding * 2 - gap * (columns - 1)) / columns;
    var cardHeight = (rowHeight - padding * 2 - gap * (rows - 1)) / rows;
    layer.groups.forEach(function (groupData, localIndex) {
      var column = localIndex % columns;
      var row = Math.floor(localIndex / columns);
      drawGroupCard(
        groupData,
        CONTENT_X + padding + column * (cardWidth + gap),
        rowY + padding + row * (cardHeight + gap),
        cardWidth,
        cardHeight,
        parent
      );
    });
  }

  function drawArchitecture() {
    var totalHeight = ROW_HEIGHTS.reduce(function (sum, value) { return sum + value; }, 0);
    var group = el('g', {
      'data-layout-zone': 's1.architecture',
      'data-slot-id': 'product-platform-architecture',
      'data-fixed-quantity': '5'
    });
    el('rect', {
      x: ARCH_X, y: ARCH_Y, width: ARCH_WIDTH, height: totalHeight,
      fill: 'none', stroke: INK, 'stroke-width': 1.2
    }, group);
    line(CONTENT_X, ARCH_Y, CONTENT_X, ARCH_Y + totalHeight, {
      stroke: INK45, 'stroke-width': .7
    }, group);

    var rowY = ARCH_Y;
    LAYERS.forEach(function (layer, layerIndex) {
      var rowHeight = ROW_HEIGHTS[layerIndex];
      var layerGroup = el('g', {
        'data-layout-zone': 's1.layer-' + (layerIndex + 1),
        'data-slot-id': 'layer-' + (layerIndex + 1),
        'data-repeat-unit': 'layer'
      }, group);
      if (layerIndex > 0) {
        line(ARCH_X, rowY, ARCH_X + ARCH_WIDTH, rowY, {
          stroke: INK45,
          'stroke-width': layerIndex === 4 ? 1.1 : .7
        }, group);
      }
      drawLayerRail(layer, layerIndex, rowY, rowHeight, layerGroup);
      if (layer.kind === 'simple') drawSimpleLayer(layer, rowY, rowHeight, layerGroup);
      else drawGroupLayer(layer, rowY, rowHeight, layerGroup);
      rowY += rowHeight;
    });
  }

  function drawS1() {
    text('五层平台，把应用能力托在统一底座之上', 90, 215, {
      'font-family': SERIF, 'font-size': 46, 'font-weight': 500
    });
    text('应用、资源、评测、追踪与基础设施保持一座完整架构塔。', 90, 267, {
      'font-size': 20.5, fill: INK70
    });
    sectionLabel(310);
    drawArchitecture();
  }

  drawS1();
  document.documentElement.dataset.renderPending = 'false';
  stageFit();
})();
