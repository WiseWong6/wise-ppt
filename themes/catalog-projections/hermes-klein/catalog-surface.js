(function () {
  'use strict';

  var VERSION = 'catalog-theme-recipes-v1';
  var root = document.documentElement;
  var SVG_NS = 'http://www.w3.org/2000/svg';
  var SHAPES = 'path,line,rect,circle,ellipse,polygon,polyline,use';
  var PALETTES = {
    'hermes-orange': {
      accent: '#d95e00', recessed: '#e8e5df'
    },
    'klein-blue': {
      accent: '#002fa7', recessed: '#e8e5df'
    }
  };
  var PAPER = '#f2efe9';
  var WHITE = '#ffffff';
  var INK = '#1a1a1a';

  function recipe() {
    var node = document.getElementById('xp-surface-recipe');
    if (!node) return null;
    try {
      return JSON.parse(node.textContent || '{}');
    } catch (error) {
      console.error('catalog-page-recipe 不是合法 JSON', error);
      return null;
    }
  }

  function owner() {
    return root.hasAttribute('data-sample-focus-members')
      ? root
      : document.querySelector('.stage[data-sample-focus-members]');
  }

  function members(spec) {
    if (spec && Array.isArray(spec.focus_members)) return spec.focus_members;
    var target = owner();
    if (!target) return [];
    try {
      var parsed = JSON.parse(target.getAttribute('data-sample-focus-members') || '[]');
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error('focus-members 不是合法 JSON', error);
      return [];
    }
  }

  function textMembers(spec) {
    return spec && Array.isArray(spec.focus_text_members)
      ? spec.focus_text_members
      : [];
  }

  function textNodeWithPhrase(target, phrase) {
    var walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT);
    var current;
    while ((current = walker.nextNode())) {
      if (current.parentElement && current.parentElement.hasAttribute('data-xp-focus-text-index')) {
        continue;
      }
      if ((current.nodeValue || '').indexOf(phrase) !== -1) return current;
    }
    return null;
  }

  function applyTextFocus(item, index, preset) {
    var marker = '[data-xp-focus-text-index="' + index + '"]';
    var existing = Array.prototype.slice.call(document.querySelectorAll(marker));
    if (existing.length) {
      existing.forEach(function (node) { applyFocus(node, item, preset); });
      return existing.length;
    }

    var count = 0;
    document.querySelectorAll(item.selector).forEach(function (target) {
      var textNode = textNodeWithPhrase(target, item.text);
      if (!textNode) return;
      var value = textNode.nodeValue || '';
      var offset = value.indexOf(item.text);
      var before = value.slice(0, offset);
      var after = value.slice(offset + item.text.length);
      var focus = document.createElement('span');
      focus.dataset.xpFocusTextIndex = String(index);
      focus.textContent = item.text;
      if (before) textNode.parentNode.insertBefore(document.createTextNode(before), textNode);
      textNode.parentNode.insertBefore(focus, textNode);
      if (after) textNode.parentNode.insertBefore(document.createTextNode(after), textNode);
      textNode.remove();
      applyFocus(focus, item, preset);
      count += 1;
    });
    return count;
  }

  function rgba(hex, alpha) {
    var raw = hex.replace('#', '');
    var value = parseInt(raw.length === 3
      ? raw.split('').map(function (part) { return part + part; }).join('')
      : raw, 16);
    return 'rgba(' + ((value >> 16) & 255) + ', ' + ((value >> 8) & 255) + ', '
      + (value & 255) + ', ' + alpha + ')';
  }

  function setToken(name, value) {
    root.style.setProperty(name, value, 'important');
  }

  function canvasTokens(spec, palette) {
    var canvas = spec && spec.canvas && spec.canvas.value ? spec.canvas.value : PAPER;
    var token = spec && spec.canvas ? spec.canvas.token : 'paper';
    var dark = token === 'ink';
    var accentCanvas = token === 'accent' || token.indexOf('accent-') === 0;
    var structural = dark ? PAPER : INK;
    var focus = accentCanvas ? INK : palette.accent;
    var panel = dark ? 'rgba(255, 255, 255, .10)' : WHITE;
    var surfaces = Array.isArray(spec.surfaces) ? spec.surfaces : [];
    var raised = surfaces.find(function (item) {
      return item.material === 'top-white' || item.material === 'translucent-white';
    });
    if (raised && raised.material === 'translucent-white') {
      panel = raised.fill || 'rgba(255, 255, 255, .5)';
    }

    setToken('--xp-paper', PAPER);
    setToken('--xp-white', WHITE);
    setToken('--xp-ink', INK);
    setToken('--xp-accent', palette.accent);
    setToken('--xp-canvas', canvas);
    setToken('--xp-panel', panel);
    setToken('--xp-recessed', palette.recessed);
    setToken('--xp-structural', structural);
    setToken('--xp-structural-80', rgba(structural, .8));
    setToken('--xp-structural-70', rgba(structural, .7));
    setToken('--xp-structural-55', rgba(structural, .55));
    setToken('--xp-structural-45', rgba(structural, .45));
    setToken('--xp-structural-20', rgba(structural, .2));
    setToken('--xp-structural-12', rgba(structural, .12));

    setToken('--wp-color-surface-canvas', canvas);
    setToken('--wp-color-surface-recessed', palette.recessed);
    setToken('--wp-color-primary', structural);
    setToken('--wp-color-functional', rgba(structural, .8));
    setToken('--wp-color-body', rgba(structural, .7));
    setToken('--wp-color-chart-label', rgba(structural, .55));
    setToken('--wp-color-metadata', rgba(structural, .45));
    setToken('--wp-color-divider', rgba(structural, .2));
    setToken('--wp-color-construction', rgba(structural, .12));
    setToken('--wp-color-focus', focus);
    setToken('--wp-color-focus-secondary', rgba(focus, .72));
    setToken('--wp-color-focus-peripheral', rgba(focus, .42));
    setToken('--wp-private-identity-accent', structural);
    setToken('--wp-private-focus-text-small', focus);
    setToken('--wp-color-data-1', rgba(structural, .08));
    setToken('--wp-color-data-2', rgba(structural, .14));
    setToken('--wp-color-data-3', rgba(structural, .22));
    setToken('--wp-color-data-4', rgba(structural, .30));
    setToken('--wp-color-data-5', rgba(structural, .40));
    setToken('--wp-color-data-6', rgba(structural, .52));
    setToken('--wp-private-ink-60', rgba(structural, .6));
    setToken('--wp-private-ink-30', rgba(structural, .3));
    setToken('--shadow-soft', 'none');
    setToken('--shadow-specimen', 'none');

    root.dataset.xpCanvas = token;
    // 橙、蓝逐页同构：两套主题的家具/页码模式只由画布决定，不按主题分叉。
    var folioMode = spec && spec.accent ? spec.accent.folio_mode : '';
    if (folioMode === 'accent' && !accentCanvas) {
      root.dataset.xpFurniture = 'all-accent';
    } else {
      root.dataset.xpFurniture = accentCanvas ? 'inverse-neutral' : 'all-accent';
    }
  }

  function isSvg(node) {
    return node.namespaceURI === SVG_NS;
  }

  function shapes(node) {
    return node.tagName.toLowerCase() === 'g'
      ? Array.prototype.slice.call(node.querySelectorAll(SHAPES))
      : [node];
  }

  function hasPaint(node, name) {
    var value = node.getAttribute(name);
    return value !== null && value !== '' && value !== 'none' && value !== 'transparent';
  }

  function paintStroke(node, color, width) {
    shapes(node).forEach(function (shape) {
      if (!hasPaint(shape, 'stroke') && node.tagName.toLowerCase() === 'g') return;
      shape.style.setProperty('stroke', color, 'important');
      if (width) shape.style.setProperty('stroke-width', width, 'important');
    });
  }

  function paintFill(node, color) {
    shapes(node).forEach(function (shape) {
      if (!hasPaint(shape, 'fill') && node.tagName.toLowerCase() === 'g') return;
      shape.style.setProperty('fill', color, 'important');
    });
  }

  function applyFocus(node, member, preset) {
    var role = member.role || 'value';
    var focus = 'var(--wp-color-focus)';
    var secondary = 'var(--wp-color-focus-secondary)';
    var peripheral = 'var(--wp-color-focus-peripheral)';
    node.dataset.xpFocusRole = role;
    if (isSvg(node)) {
      var tag = node.tagName.toLowerCase();
      if (tag === 'text' || tag === 'tspan') {
        node.style.setProperty(
          'fill',
          role === 'texture' ? peripheral : role === 'annotation' ? secondary : focus,
          'important'
        );
        if (role === 'value') node.style.setProperty('font-weight', '700', 'important');
      } else if (member.paint === 'fill' || role === 'symbol' ||
          ((role === 'value' || role === 'status') && hasPaint(node, 'fill'))) {
        paintFill(node, focus);
      } else {
        paintStroke(
          node,
          role === 'texture' ? peripheral : role === 'annotation' ? secondary : focus,
          role === 'outline' ? '1.8px' : ''
        );
      }
      return;
    }
    if (role === 'outline') {
      node.style.setProperty('border-color', focus, 'important');
      node.style.setProperty('outline-color', focus, 'important');
      return;
    }
    node.style.setProperty(
      'color',
      role === 'texture' ? peripheral : role === 'annotation' ? secondary : focus,
      'important'
    );
    if (role === 'value') node.style.setProperty('font-weight', '700', 'important');
  }

  function bindingError(index, message) {
    return 'binding[' + index + '] ' + message;
  }

  function applyBindingNode(node, item, index) {
    node.dataset.xpSurfaceBinding = String(index);
    node.dataset.xpSurfaceBindingIndex = String(index);
    node.dataset.xpSurfaceRole = item.role;
    node.dataset.xpSurfaceMaterial = item.material;
    node.dataset.xpSurfaceFill = item.fill;
    node.dataset.xpSurfaceStack = String(item.stack);
    node.dataset.xpSurfaceShadow = item.shadow;
    node.style.setProperty('--xp-surface-stack', String(item.stack));

    if (item.fill !== 'preserve') {
      if (isSvg(node)) paintFill(node, item.fill);
      else node.style.setProperty('background-color', item.fill, 'important');
    }

    if (item.border) {
      var borderColor = item.border.color;
      var borderWidth = String(item.border.width) + 'px';
      node.dataset.xpPrimarySurface = 'true';
      node.dataset.xpBorder = 'binding';
      if (isSvg(node)) {
        paintStroke(node, borderColor, borderWidth);
      } else {
        node.style.setProperty('border-color', borderColor, 'important');
        node.style.setProperty('border-width', borderWidth, 'important');
        node.style.setProperty('border-style', 'solid', 'important');
      }
    }

    if (item.shadow === 'accent-hard') {
      node.dataset.xpPrimarySurface = 'true';
      node.dataset.xpShadow = item.shadow;
    } else if (item.shadow === 'preserve') {
      node.dataset.xpShadow = 'preserve';
    } else {
      node.dataset.xpShadow = 'none';
      if (!isSvg(node)) {
        node.style.setProperty('box-shadow', 'none', 'important');
      } else {
        var existingFilter = getComputedStyle(node).filter;
        if (!node.hasAttribute('filter') && existingFilter.indexOf('drop-shadow(') !== -1) {
          node.style.setProperty('filter', 'none', 'important');
        }
      }
    }
    if (!isSvg(node)) node.style.setProperty('z-index', String(item.stack), 'important');
  }

  function applySurfaceBindings(stage, spec) {
    var bindings = spec.surface_bindings;
    var errors = [];
    var records = [];
    var tasks = [];
    var expectedNodes = 0;
    var actualNodes = 0;
    var resolved = 0;

    if (!Array.isArray(bindings)) {
      errors.push('surface_bindings 必须是数组');
      bindings = [];
    }

    bindings.forEach(function (item, index) {
      var record = {
        index: index,
        selector: item && item.selector || '',
        expected_count: item && item.expected_count,
        actual_count: 0,
        role: item && item.role || '',
        material: item && item.material || '',
        fill: item && item.fill || '',
        stack: item && item.stack,
        border: item && item.border || null,
        shadow: item && item.shadow || '',
      };
      records.push(record);

      if (!item || typeof item !== 'object') {
        errors.push(bindingError(index, '不是对象'));
        return;
      }
      var requiredStrings = ['selector', 'role', 'material', 'fill'];
      requiredStrings.forEach(function (name) {
        if (typeof item[name] !== 'string' || !item[name]) {
          errors.push(bindingError(index, name + ' 必须是非空字符串'));
        }
      });
      if (!Number.isInteger(item.expected_count) || item.expected_count < 1) {
        errors.push(bindingError(index, 'expected_count 必须是正整数'));
      }
      if (!Number.isInteger(item.stack) || item.stack < 0) {
        errors.push(bindingError(index, 'stack 必须是非负整数'));
      }
      if (item.border && (
          typeof item.border !== 'object' ||
          typeof item.border.color !== 'string' || !item.border.color ||
          typeof item.border.width !== 'number' || item.border.width <= 0)) {
        errors.push(bindingError(index, 'border 必须包含 color 与正数 width'));
      }
      if (item.shadow !== 'none' && item.shadow !== 'accent-hard' && item.shadow !== 'preserve') {
        errors.push(bindingError(index, 'shadow 必须显式为 none、accent-hard 或 preserve'));
      }
      if (!item.selector || typeof item.selector !== 'string') return;

      var nodes = [];
      try {
        nodes = Array.prototype.slice.call(stage.querySelectorAll(item.selector));
      } catch (error) {
        errors.push(bindingError(index, 'selector 非法: ' + error.message));
        return;
      }
      record.actual_count = nodes.length;
      actualNodes += nodes.length;
      if (Number.isInteger(item.expected_count)) expectedNodes += item.expected_count;
      if (nodes.length !== item.expected_count) {
        errors.push(bindingError(
          index,
          'selector 数量不符: expected=' + item.expected_count + ' actual=' + nodes.length +
            ' selector=' + item.selector
        ));
        return;
      }
      resolved += 1;
      tasks.push({ item: item, index: index, nodes: nodes });
    });

    if (spec.surface_profile === 'layered-comparison' && spec.layout_code === 'q3') {
      ['output-only', 'process-visible'].forEach(function (role) {
        var matches = tasks.filter(function (task) { return task.item.role === role; });
        var count = matches.reduce(function (sum, task) { return sum + task.nodes.length; }, 0);
        if (matches.length !== 1 || count !== 1) {
          errors.push('Q3 layered-comparison 要求 ' + role + ' 恰好一个，实际=' + count);
        }
      });
    }

    stage.dataset.surfaceBindingDeclared = String(bindings.length);
    stage.dataset.surfaceBindingResolved = String(resolved);
    stage.dataset.surfaceBindingExpectedNodeCount = String(expectedNodes);
    stage.dataset.surfaceBindingNodeCount = String(actualNodes);
    stage.dataset.surfaceBindingErrorCount = String(errors.length);
    stage.dataset.surfaceBindingErrors = JSON.stringify(errors);
    stage.dataset.surfaceBindingAudit = JSON.stringify(records);

    if (errors.length) {
      root.dataset.xpRecipeReady = 'error';
      root.dataset.catalogSurfaceReady = 'false';
      throw new Error('surface binding 门禁失败: ' + errors.join(' | '));
    }

    tasks.forEach(function (task) {
      task.nodes.forEach(function (node) {
        applyBindingNode(node, task.item, task.index);
      });
    });
  }

  function radiusInPixels(value, side) {
    var text = String(value || '').trim();
    var amount = parseFloat(text) || 0;
    return text.indexOf('%') !== -1 ? side * amount / 100 : amount;
  }

  function isCircular(rect, style) {
    var side = Math.min(rect.width, rect.height);
    var radius = radiusInPixels(style.borderTopLeftRadius, side);
    return side > 0 && Math.abs(rect.width - rect.height) <= 2 && radius >= side * .42;
  }

  function normalizeGeometry(stage) {
    var squareCount = 0;
    stage.querySelectorAll('*').forEach(function (node) {
      if (!(node instanceof HTMLElement)) return;
      var style = getComputedStyle(node);
      var radius = parseFloat(style.borderTopLeftRadius) || 0;
      if (!radius) return;
      var rect = node.getBoundingClientRect();
      if (isCircular(rect, style)) {
        delete node.dataset.xpSquareSurface;
        node.dataset.xpRoundSymbol = 'true';
        return;
      }
      delete node.dataset.xpRoundSymbol;
      node.dataset.xpSquareSurface = 'true';
      squareCount += 1;
    });
    stage.dataset.xpSquareSurfaceCount = String(squareCount);
  }

  function apply() {
    var spec = recipe();
    if (!spec) return;
    var preset = spec.theme || root.dataset.themeId;
    var palette = PALETTES[preset];
    if (!palette) return;
    root.dataset.themeId = preset;
    root.dataset.xpRecipeId = preset + ':' + spec.layout_code;
    root.dataset.xpRecipeStatus = spec.status || '';
    root.dataset.xpSurfaceProfile = spec.surface_profile || '';
    root.dataset.xpTitleFurniture = spec.accent && spec.accent.furniture_mode || '';
    canvasTokens(spec, palette);
    root.dataset.xpRecipeReady = 'true';

    var count = 0;
    members(spec).forEach(function (member) {
      if (!member || !member.selector) return;
      document.querySelectorAll(member.selector).forEach(function (node) {
        applyFocus(node, member, preset);
        count += 1;
      });
    });
    textMembers(spec).forEach(function (member, index) {
      if (!member || !member.selector || !member.text) return;
      var actual = applyTextFocus(member, index, preset);
      if (Number.isInteger(member.expected_count) && actual !== member.expected_count) {
        root.dataset.xpRecipeReady = 'error';
        root.dataset.catalogSurfaceReady = 'false';
        throw new Error(
          'focus text 门禁失败: expected=' + member.expected_count +
          ' actual=' + actual + ' text=' + member.text
        );
      }
      count += actual;
    });
    var stage = document.querySelector('.stage');
    if (stage) {
      stage.dataset.xpSurfaceProfile = spec.surface_profile || '';
      applySurfaceBindings(stage, spec);
      normalizeGeometry(stage);
      stage.dataset.surfaceRebuild = VERSION;
      stage.dataset.surfaceFocusCount = String(count);
    }
    root.dataset.catalogSurfaceReady = 'true';
  }

  window.WisePPTCatalogSurface = { version: VERSION, apply: apply };
  apply();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(apply);
  document.addEventListener('wise-ppt:gallery-state-change', apply);
})();
