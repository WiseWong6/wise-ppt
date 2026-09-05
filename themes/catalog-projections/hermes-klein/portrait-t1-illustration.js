(function () {
  'use strict';

  /*
   * T1 illustration harmonisation.
   *
   * Geometry, copy, data and element counts remain owned by each page. The
   * runtime only annotates existing nodes with page-audited material,
   * typography and narrative roles. No SVG, label, badge or decorative motif
   * is created here; objects, counts, copy and geometry remain unchanged.
   */
  var root = document.documentElement;
  var stage = document.querySelector('.stage[data-t1-code]');
  if (!stage) return;

  var SHAPES = 'path,line,polyline,polygon,circle,ellipse,rect,use';
  var PAGE_BINDINGS = {
    a4: [
      { selector: '#draw > g > rect[width="400"][height="276"][fill="var(--paper-panel)"]', count: 4, material: 'top' }
    ],
    a6: [
      { selector: '#draw > g > circle[fill="var(--paper-panel)"]', count: 1, material: 'recessed' },
      { selector: '#draw > g > rect[fill="var(--paper-panel)"]', count: 12, material: 'top' }
    ],
    b4: [
      { selector: '#b4-focus-card', count: 1, material: 'top', depth: 'raised' },
      { selector: '#draw > g > rect[width="300"][height="240"][fill="var(--paper-panel)"]:not(#b4-focus-card)', count: 4, material: 'recessed' }
    ],
    c3: [
      { selector: '#draw > g > rect[width="500"][height="660"][fill="var(--paper-panel)"]', count: 3, material: 'top' }
    ],
    c7: [
      { selector: '#draw > g > rect[fill="var(--paper-panel)"]', count: 3, material: 'top' }
    ],
    e3: [],
    e4: [
      { selector: '#draw > g > g[opacity="0.45"]', count: 1, material: 'muted' }
    ],
    g2: [
      { selector: '#sample-focus', count: 1, material: 'top', depth: 'raised' },
      { selector: '#draw > g > rect[x="900"][y="646"][width="180"][height="70"]', count: 1, material: 'recessed' }
    ],
    i1: [
      { selector: '#i1-focus-dial', count: 1, material: 'top' }
    ],
    j2: [
      { selector: '#draw > g > rect[fill="var(--paper-panel)"][height="160"]', count: 8, material: 'top' }
    ],
    q4: [],
    r3: [
      { selector: '#v2-r3 .slot-icon [fill="url(#r3-hatch)"]', count: 2, material: 'recessed' }
    ],
    r4: [
      { selector: '#balance-host path[data-side-id="governance"]', count: 1, material: 'top' },
      { selector: '#balance-host path[data-side-id="speed"]', count: 1, material: 'recessed' }
    ],
    r5: [],
    r7: [],
    s3: [
      { selector: ':is(#s3-problem-list, #s3-problem-cost) rect[fill="var(--paper)"]', count: 2, material: 'top' },
      { selector: ':is(#s3-problem-list, #s3-problem-cost) rect[fill="none"]', count: 2, material: 'recessed' }
    ],
    t3: [
      { selector: '#t3-decision > rect:first-of-type', count: 1, material: 'top', depth: 'raised' },
      { selector: '#t3-samples > g[data-repeat-unit="component-sample"] > rect:first-of-type', count: 6, material: 'recessed' }
    ],
  };

  var PAGE_ZONES = {
    e3: [
      { name: 'solution', selector: '#draw > g > *', startText: 'RETRY', shapesOnly: true }
    ]
  };

  function focusOwner() {
    return root.hasAttribute('data-sample-focus-members') ? root : stage;
  }

  function focusMembers() {
    var owner = focusOwner();
    if (!owner || !owner.hasAttribute('data-sample-focus-members')) return [];
    try {
      var parsed = JSON.parse(owner.getAttribute('data-sample-focus-members') || '[]');
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      stage.dataset.t1IllustrationError = 'focus-members 不是合法 JSON';
      return [];
    }
  }

  function focusForegroundMembers() {
    var owner = focusOwner();
    if (!owner || !owner.hasAttribute('data-sample-focus-foreground-members')) return [];
    try {
      var parsed = JSON.parse(owner.getAttribute('data-sample-focus-foreground-members') || '[]');
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      stage.dataset.t1IllustrationError = 'focus-foreground-members 不是合法 JSON';
      return [];
    }
  }

  function markExistingVectors() {
    stage.querySelectorAll('svg:not([data-t1-ignore])').forEach(function (svg) {
      svg.querySelectorAll(SHAPES).forEach(function (shape) {
        shape.dataset.t1ExistingVector = 'true';
      });
    });
  }

  function applyMaterialBindings() {
    var code = stage.dataset.t1Code;
    if (!Object.prototype.hasOwnProperty.call(PAGE_BINDINGS, code)) {
      throw new Error('页面未经 T1 材质审计: ' + code);
    }
    var materialCount = 0;
    var depthCount = 0;
    PAGE_BINDINGS[code].forEach(function (binding) {
      var nodes = stage.querySelectorAll(binding.selector);
      if (nodes.length !== binding.count) {
        throw new Error(
          code.toUpperCase() + ' 绑定数量漂移: ' + binding.selector +
          ' expected=' + binding.count + ' actual=' + nodes.length
        );
      }
      nodes.forEach(function (node) {
        if (binding.material) {
          node.dataset.t1Material = binding.material;
          materialCount += 1;
        }
        if (binding.depth) {
          node.dataset.t1Depth = binding.depth;
          depthCount += 1;
        }
      });
    });
    stage.dataset.t1MaterialCount = String(materialCount);
    stage.dataset.t1DepthCount = String(depthCount);
  }

  function markTypography() {
    var latinCount = 0;
    var numberCount = 0;
    stage.querySelectorAll('svg text, svg tspan').forEach(function (node) {
      var value = (node.textContent || '').trim();
      if (!value || /[\u3400-\u9fff]/.test(value)) return;
      if (/^(?:Q?\d|[+\-]?\d)/i.test(value)) {
        node.dataset.t1Type = 'number';
        numberCount += 1;
        return;
      }
      if (/[A-Za-z]/.test(value)) {
        node.dataset.t1Type = 'latin';
        latinCount += 1;
      }
    });
    stage.dataset.t1LatinCount = String(latinCount);
    stage.dataset.t1NumberCount = String(numberCount);
  }

  function markNarrativeZones() {
    var code = stage.dataset.t1Code;
    var rules = PAGE_ZONES[code] || [];
    var count = 0;
    rules.forEach(function (rule) {
      var started = !rule.startText;
      stage.querySelectorAll(rule.selector).forEach(function (node) {
        if (!started && (node.textContent || '').trim() === rule.startText) started = true;
        if (!started) return;
        if (rule.shapesOnly && !node.matches(SHAPES)) return;
        node.dataset.t1Zone = rule.name;
        count += 1;
      });
    });
    if (rules.length && count === 0) {
      throw new Error(code.toUpperCase() + ' 对比叙事区域未命中任何现有图形');
    }
    stage.dataset.t1NarrativeZoneCount = String(count);
  }

  function markSemanticFocus() {
    var count = 0;
    focusMembers().forEach(function (member, index) {
      if (!member || !member.selector) return;
      var nodes = stage.querySelectorAll(member.selector);
      if (Number.isInteger(member.expected_count) && nodes.length !== member.expected_count) {
        throw new Error(
          'focus_members[' + index + '] 数量漂移: ' + member.selector +
          ' expected=' + member.expected_count + ' actual=' + nodes.length
        );
      }
      nodes.forEach(function (node) {
        node.dataset.t1FocusRole = member.role || 'value';
        if (member.paint) {
          node.dataset.t1FocusPaint = member.paint;
          node.dataset.xpFocusPaint = member.paint;
        }
        count += 1;
      });
    });
    var foregroundCount = 0;
    focusForegroundMembers().forEach(function (member, index) {
      if (!member || !member.selector) return;
      var nodes = stage.querySelectorAll(member.selector);
      if (Number.isInteger(member.expected_count) && nodes.length !== member.expected_count) {
        throw new Error(
          'foreground_members[' + index + '] 数量漂移: ' + member.selector +
          ' expected=' + member.expected_count + ' actual=' + nodes.length
        );
      }
      nodes.forEach(function (node) {
        node.dataset.t1FocusForeground = 'true';
        node.dataset.xpFocusForeground = 'true';
        foregroundCount += 1;
      });
    });
    stage.dataset.t1SemanticFocusCount = String(count);
    stage.dataset.t1FocusForegroundCount = String(foregroundCount);
  }

  function render() {
    markExistingVectors();
    applyMaterialBindings();
    markTypography();
    markNarrativeZones();
    markSemanticFocus();
    stage.dataset.t1IllustrationReady = 'semantic-redraw';
    root.dataset.t1IllustrationReady = 'semantic-redraw';
    root.dataset.renderPending = 'false';
    if (typeof window.stageFit === 'function') window.stageFit();
  }

  root.dataset.renderPending = 'true';
  try {
    render();
  } catch (error) {
    root.dataset.t1IllustrationReady = 'error';
    root.dataset.renderPending = 'false';
    stage.dataset.t1IllustrationError = String(error && error.message || error);
    throw error;
  }
})();
