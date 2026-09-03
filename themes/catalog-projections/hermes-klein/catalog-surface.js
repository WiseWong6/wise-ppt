(function () {
  'use strict';

  var VERSION = 'catalog-theme-recipes-v2';
  var root = document.documentElement;
  var SVG_NS = 'http://www.w3.org/2000/svg';
  var SHAPES = 'path,line,rect,circle,ellipse,polygon,polyline,use';
  var PALETTES = {
    'hermes-orange': {
      accent: '#d95e00',
      focusSecondary: '#b24d00',
      focusPeripheral: '#8f3900',
      focusTextSmall: '#b24d00',
      focusForeground: '#1a1a1a',
      recessed: '#e8e5df',
      data: ['#EDD2BA', '#EAC19E', '#E7AF82', '#E49E67', '#E18C4B', '#DE7B2F']
    },
    'klein-blue': {
      accent: '#002fa7',
      focusSecondary: '#1b44b8',
      focusPeripheral: '#3b63cc',
      focusTextSmall: '#002fa7',
      focusForeground: '#ffffff',
      recessed: '#e8e5df',
      data: ['#D0D4E0', '#BDC5DA', '#A5B2D4', '#8C9ECD', '#748BC7', '#5C78C0']
    }
  };
  var PAPER = '#f2efe9';
  var WHITE = '#ffffff';
  var INK = '#1a1a1a';
  var renderPendingObserver = null;
  var legacyFocusRetryFrame = 0;
  var legacyFocusRetryCount = 0;

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
    return root;
  }

  function members(spec) {
    if (root.dataset.emphasisProfile === 'legacy') {
      try {
        var legacy = JSON.parse(root.dataset.catalogLegacyEmphasisMembers || '[]');
        return Array.isArray(legacy) ? legacy : [];
      } catch (error) {
        throw new Error('旧强调成员不是合法 JSON: ' + error.message);
      }
    }
    var targetId = root.dataset.emphasisTarget || '';
    var targets = spec && Array.isArray(spec.emphasis_targets) ? spec.emphasis_targets : [];
    var target = targets.find(function (item) { return item.target_id === targetId; });
    return target && Array.isArray(target.members) ? target.members : [];
  }

  function deferWhilePageRenders() {
    if (root.dataset.renderPending !== 'true') return false;
    root.dataset.xpRecipeReady = 'render-pending';
    root.dataset.catalogSurfaceReady = 'false';
    if (!renderPendingObserver && window.MutationObserver) {
      renderPendingObserver = new MutationObserver(function () {
        if (root.dataset.renderPending === 'true') return;
        renderPendingObserver.disconnect();
        renderPendingObserver = null;
        apply();
      });
      renderPendingObserver.observe(root, {
        attributes: true,
        attributeFilter: ['data-render-pending']
      });
    }
    return true;
  }

  function stageIsVisible() {
    var stage = document.querySelector('.stage');
    if (!stage) return true;
    var rect = stage.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }

  function resetLegacyFocusRetry() {
    if (legacyFocusRetryFrame) cancelAnimationFrame(legacyFocusRetryFrame);
    legacyFocusRetryFrame = 0;
    legacyFocusRetryCount = 0;
    delete root.dataset.xpLegacyFocusState;
  }

  function deferLegacyFocusMismatch() {
    /* Catalog 会把相邻 iframe 停泊到 display:none 的缓存里。动态批注在隐藏态
       没有可用几何，恢复可见后会自行重画并再次调用 apply。 */
    if (!stageIsVisible()) {
      root.dataset.xpLegacyFocusState = 'hidden-deferred';
      return true;
    }
    if (legacyFocusRetryCount >= 2) return false;
    root.dataset.xpLegacyFocusState = 'members-pending';
    root.dataset.catalogSurfaceReady = 'false';
    if (!legacyFocusRetryFrame) {
      legacyFocusRetryFrame = requestAnimationFrame(function () {
        legacyFocusRetryFrame = 0;
        legacyFocusRetryCount += 1;
        apply();
      });
    }
    return true;
  }

  function applyCatalogComparisonCopy(stage) {
    var standard = root.dataset.emphasisProfile !== 'legacy';
    stage.querySelectorAll('[data-catalog-legacy-copy][data-catalog-standard-copy]').forEach(function (node) {
      node.textContent = standard ? node.dataset.catalogStandardCopy : node.dataset.catalogLegacyCopy;
    });
  }

  function dataBindings(spec) {
    return spec && Array.isArray(spec.data_bindings) ? spec.data_bindings : [];
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
    var focusSecondary = accentCanvas ? INK : palette.focusSecondary;
    var focusPeripheral = accentCanvas ? INK : palette.focusPeripheral;
    var focusTextSmall = accentCanvas ? INK : palette.focusTextSmall;
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
    setToken('--xp-focus-foreground', palette.focusForeground);
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
    setToken('--wp-color-functional', palette.accent);
    setToken('--wp-color-body', rgba(structural, .7));
    setToken('--wp-color-chart-label', rgba(structural, .55));
    setToken('--wp-color-metadata', rgba(structural, .45));
    setToken('--wp-color-divider', rgba(structural, .2));
    setToken('--wp-color-construction', rgba(structural, .12));
    setToken('--wp-color-focus', focus);
    setToken('--wp-color-focus-secondary', focusSecondary);
    setToken('--wp-color-focus-peripheral', focusPeripheral);
    setToken('--wp-private-identity-accent', palette.accent);
    setToken('--wp-private-focus-text-small', focusTextSmall);
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
    // 页码署名跟随元信息通道：颜色只由画布明暗在 CSS 里决定（浅底墨 45%、墨底纸 45%），不按主题分叉。
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

  function paintStrokeWidth(node, width) {
    if (!width) return;
    shapes(node).forEach(function (shape) {
      if (!hasPaint(shape, 'stroke') && node.tagName.toLowerCase() === 'g') return;
      shape.style.setProperty('stroke-width', width, 'important');
    });
  }

  function paintFill(node, color) {
    shapes(node).forEach(function (shape) {
      if (!hasPaint(shape, 'fill') && node.tagName.toLowerCase() === 'g') return;
      shape.style.setProperty('fill', color, 'important');
    });
  }

  function bindFocusMetadata(node, member) {
    var role = member.role || 'value';
    var target = owner();
    var ref = root.dataset.emphasisProfile === 'legacy'
      ? root.dataset.catalogLegacyEmphasisRef
      : target && target.getAttribute('data-sample-focus-ref');
    node.dataset.xpFocusRole = role;
    if (!ref) return;
    node.dataset.contentRef = ref;
    node.dataset.emphasisRole = role;
    /* 旧档没有 treatment；dataset 直接接 undefined 会生成字符串 "undefined"，
       从而让旧版的 :not([data-emphasis-treatment]) 规则全部失效。 */
    if (member.treatment) node.dataset.emphasisTreatment = member.treatment;
    else node.removeAttribute('data-emphasis-treatment');
    if (member.paint) node.dataset.emphasisPaint = member.paint;
    else node.removeAttribute('data-emphasis-paint');
    if (member.paint) node.dataset.xpFocusPaint = member.paint;
    else node.removeAttribute('data-xp-focus-paint');
    if (root.classList.contains('accent')) node.dataset.emphasisActive = 'true';
    else node.removeAttribute('data-emphasis-active');
  }

  function applyThemeIdentity(stage, spec) {
    stage.querySelectorAll('[data-theme-identity-source],[data-theme-identity-group],[data-theme-identity-treatment]').forEach(function (node) {
      node.removeAttribute('data-theme-identity-source');
      node.removeAttribute('data-theme-identity-group');
      node.removeAttribute('data-theme-identity-treatment');
    });
    if (root.dataset.defaultColorProfile === 'legacy') {
      stage.dataset.themeIdentityProfile = 'legacy-native';
      stage.dataset.themeIdentityGroupCount = '0';
      stage.dataset.themeIdentityNodeCount = '0';
      return;
    }
    var groups = spec && Array.isArray(spec.theme_identity) ? spec.theme_identity : [];
    if (groups.length < 1 || groups.length > 2) throw new Error('theme_identity 必须登记 1–2 个 group');
    var claimed = new Set();
    var count = 0;
    groups.forEach(function (group, groupIndex) {
      if (!group || typeof group.group_id !== 'string' || !Array.isArray(group.members) || !group.members.length) {
        throw new Error('theme_identity[' + groupIndex + '] 非法');
      }
      group.members.forEach(function (item, memberIndex) {
        if (!item || typeof item.treatment !== 'string' || item.treatment.indexOf('identity.') !== 0) {
          throw new Error('theme_identity[' + groupIndex + '].members[' + memberIndex + '] treatment 非法');
        }
        exactNodes(stage, item, 'theme_identity.' + group.group_id, memberIndex).forEach(function (node) {
          if (claimed.has(node)) throw new Error('theme_identity 多个 member 命中同一节点');
          if (node.closest('.doc,.folio,.caption')) throw new Error('theme_identity 命中固定家具');
          claimed.add(node);
          node.dataset.themeIdentitySource = 'wise-ppt-layout-theme-bindings@2';
          node.dataset.themeIdentityGroup = group.group_id;
          node.dataset.themeIdentityTreatment = item.treatment;
          count += 1;
        });
      });
    });
    stage.dataset.themeIdentityGroupCount = String(groups.length);
    stage.dataset.themeIdentityNodeCount = String(count);
    stage.dataset.themeIdentityProfile = 'standard';
  }

  function exactNodes(stage, item, label, index) {
    var nodes;
    try {
      nodes = Array.prototype.slice.call(stage.querySelectorAll(item.selector));
    } catch (error) {
      throw new Error(label + '[' + index + '] selector 非法: ' + error.message);
    }
    if (!Number.isInteger(item.expected_count) || item.expected_count < 1) {
      throw new Error(label + '[' + index + '] expected_count 必须是正整数');
    }
    if (nodes.length !== item.expected_count) {
      throw new Error(
        label + '[' + index + '] selector 数量不符: expected=' + item.expected_count +
        ' actual=' + nodes.length + ' selector=' + item.selector
      );
    }
    return nodes;
  }

  function applyDataBindings(stage, spec, palette) {
    var count = 0;
    dataBindings(spec).forEach(function (item, index) {
      if (!item || typeof item.role !== 'string' || !/^(?:data-[1-6]|focus-secondary)$/.test(item.role)) {
        throw new Error('data_bindings[' + index + '] role 必须是 data-1 至 data-6 或 focus-secondary');
      }
      if (item.paint !== 'fill' && item.paint !== 'stroke' && item.paint !== 'text') {
        throw new Error('data_bindings[' + index + '] paint 必须是 fill、stroke 或 text');
      }
      var color = item.role === 'focus-secondary'
        ? palette.focusSecondary
        : palette.data[Number(item.role.slice(5)) - 1];
      exactNodes(stage, item, 'data_bindings', index).forEach(function (node) {
        node.dataset.xpDataRole = item.role;
        node.dataset.xpDataPaint = item.paint;
        if (item.paint === 'stroke') paintStroke(node, color);
        else if (item.paint === 'fill') {
          if (isSvg(node)) paintFill(node, color);
          else node.style.setProperty('background-color', color, 'important');
        } else if (isSvg(node)) {
          node.style.setProperty('fill', color, 'important');
        } else {
          node.style.setProperty('color', color, 'important');
        }
        count += 1;
      });
    });
    stage.dataset.xpDataBindingCount = String(count);
  }

  function semanticFocusChannel(node) {
    var role = node.dataset.emphasisRole;
    if (!role) return '';
    if (!isSvg(node)) {
      if (node.dataset.emphasisPaint === 'fill') return 'fill';
      return role === 'outline' ? 'border' : 'color';
    }

    var tag = node.tagName.toLowerCase();
    if (tag === 'text' || tag === 'tspan' || node.dataset.emphasisPaint === 'fill') {
      return 'fill';
    }
    if (tag === 'g') {
      var descendants = Array.prototype.slice.call(node.querySelectorAll(SHAPES));
      if (descendants.some(function (shape) { return hasPaint(shape, 'stroke'); })) return 'stroke';
      if (node.querySelector('text,tspan') || descendants.some(function (shape) {
        return hasPaint(shape, 'fill');
      })) return 'fill';
    }
    if (hasPaint(node, 'stroke')) return 'stroke';
    return 'fill';
  }

  function bindingError(index, message) {
    return 'binding[' + index + '] ' + message;
  }

  function applyBindingNode(node, item, index) {
    var focusChannel = semanticFocusChannel(node);
    node.dataset.xpSurfaceBinding = String(index);
    node.dataset.xpSurfaceBindingIndex = String(index);
    node.dataset.xpSurfaceRole = item.role;
    node.dataset.xpSurfaceMaterial = item.material;
    node.dataset.xpSurfaceFill = item.fill;
    node.dataset.xpSurfaceStack = String(item.stack);
    node.dataset.xpSurfaceShadow = item.shadow;
    node.style.setProperty('--xp-surface-stack', String(item.stack));

    if (item.tokens && typeof item.tokens === 'object') {
      Object.keys(item.tokens).forEach(function (name) {
        node.style.setProperty(name, item.tokens[name], 'important');
      });
    }

    if (item.fill !== 'preserve') {
      if (isSvg(node)) {
        if (focusChannel === 'fill') {
          node.dataset.xpFocusNeutralFill = 'true';
          node.style.setProperty('--xp-focus-neutral-fill', item.fill);
        } else {
          paintFill(node, item.fill);
        }
      } else if (focusChannel === 'fill') {
        node.dataset.xpFocusNeutralFill = 'true';
        node.style.setProperty('--xp-focus-neutral-fill', item.fill);
      } else {
        node.style.setProperty('background-color', item.fill, 'important');
      }
    }

    if (item.border) {
      var borderColor = item.border.color;
      var borderWidth = String(item.border.width) + 'px';
      node.dataset.xpPrimarySurface = 'true';
      node.dataset.xpBorder = 'binding';
      if (isSvg(node)) {
        if (focusChannel === 'stroke') paintStrokeWidth(node, borderWidth);
        else paintStroke(node, borderColor, borderWidth);
      } else {
        if (focusChannel !== 'border') {
          node.style.setProperty('border-color', borderColor, 'important');
        }
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
      if (item.tokens && (
          typeof item.tokens !== 'object' || Array.isArray(item.tokens) ||
          Object.keys(item.tokens).some(function (name) {
            return name.indexOf('--') !== 0 ||
              typeof item.tokens[name] !== 'string' || !item.tokens[name];
          }))) {
        errors.push(bindingError(index, 'tokens 必须是 CSS 自定义属性到非空字符串的对象'));
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

  function syncLeadBarIcons(stage) {
    var icons = Array.prototype.slice.call(
      stage.querySelectorAll('[data-follow-lead-bar="true"]')
    );
    icons.forEach(function (icon) {
      var slot = icon.closest('[data-slot-id]');
      var leadBar = slot && slot.querySelector(':scope > [data-lead-bar]');
      if (!leadBar) {
        throw new Error('跟随左竖线的 icon 缺少同槽 data-lead-bar');
      }
      var leadColor = getComputedStyle(leadBar).fill;
      if (!leadColor || leadColor === 'none') {
        throw new Error('跟随左竖线的 icon 读取不到有效颜色');
      }
      icon.style.setProperty('color', leadColor, 'important');
      icon.dataset.xpLeadBarColor = leadColor;
    });
    stage.dataset.xpLeadBarIconCount = String(icons.length);
  }

  function apply() {
    var spec = recipe();
    if (!spec) return;
    if (root.dataset.vnextSemanticKeyMap && root.dataset.vnextSemanticKeysReady !== 'true') {
      root.dataset.xpRecipeReady = 'semantic-keys-pending';
      root.dataset.catalogSurfaceReady = 'false';
      return;
    }
    if (deferWhilePageRenders()) return;
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

    var legacyEmphasis = root.dataset.emphasisProfile === 'legacy';
    var focusMembers = members(spec);
    var legacyNodeSets = [];
    if (legacyEmphasis) {
      var legacyMismatch = null;
      focusMembers.forEach(function (member, index) {
        if (!member || !member.selector) {
          throw new Error('focus_members[' + index + '] 缺 selector/treatment');
        }
        var nodes;
        try {
          nodes = Array.prototype.slice.call(document.querySelectorAll(member.selector));
        } catch (error) {
          throw new Error('focus_members[' + index + '] selector 非法: ' + error.message);
        }
        legacyNodeSets[index] = nodes;
        if (!legacyMismatch && (!nodes.length ||
          (Number.isInteger(member.expected_count) && nodes.length !== member.expected_count))) {
          legacyMismatch = member;
        }
      });
      if (legacyMismatch) {
        if (deferLegacyFocusMismatch()) return;
        throw new Error('旧强调成员数量不符: ' + legacyMismatch.selector);
      }
      resetLegacyFocusRetry();
    }
    var targets = Array.isArray(spec.emphasis_targets) ? spec.emphasis_targets : [];
    root.dataset.emphasisTargets = JSON.stringify(targets);
    var requestedTarget = root.dataset.emphasisTarget || '';
    var selected = legacyEmphasis
      ? null
      : targets.find(function (item) { return item.target_id === requestedTarget; });
    if (!legacyEmphasis && requestedTarget && !selected) throw new Error('未登记强调目标: ' + requestedTarget);
    document.querySelectorAll('[data-xp-focus-role],[data-sample-focus-applied="true"]').forEach(function (node) {
      ['data-xp-focus-role', 'data-xp-focus-paint', 'data-content-ref', 'data-emphasis-role', 'data-emphasis-treatment', 'data-emphasis-paint', 'data-emphasis-active', 'data-sample-focus-applied'].forEach(function (name) {
        node.removeAttribute(name);
      });
    });
    root.classList.toggle('accent', legacyEmphasis ? Boolean(requestedTarget) : Boolean(selected));
    if (legacyEmphasis && requestedTarget) {
      root.dataset.sampleFocusProfile = root.dataset.catalogLegacyEmphasisProfile || 'content-only';
      root.dataset.sampleFocusRef = root.dataset.catalogLegacyEmphasisRef || '';
      root.dataset.sampleFocusMembers = root.dataset.catalogLegacyEmphasisMembers || '[]';
      document.body.dataset.emphasisMode = 'semantic-focus';
    } else if (selected) {
      root.dataset.sampleFocusProfile = 'registered-target';
      root.dataset.sampleFocusRef = 'sample.' + spec.layout_code + '.' + selected.target_id;
      root.dataset.sampleFocusMembers = JSON.stringify(selected.members || []);
      document.body.dataset.emphasisMode = 'semantic-focus';
    } else {
      root.dataset.sampleFocusProfile = 'none';
      delete root.dataset.sampleFocusRef;
      root.dataset.sampleFocusMembers = '[]';
      document.body.removeAttribute('data-emphasis-mode');
    }

    var count = 0;
    focusMembers.forEach(function (member, index) {
      if (!member || !member.selector || (!legacyEmphasis && (typeof member.treatment !== 'string' || member.treatment.indexOf('focus.') !== 0))) {
        throw new Error('focus_members[' + index + '] 缺 selector/treatment');
      }
      var nodes = legacyEmphasis
        ? legacyNodeSets[index]
        : exactNodes(document, member, 'focus_members', index);
      nodes.forEach(function (node) {
        bindFocusMetadata(node, member);
        count += 1;
      });
    });
    var stage = document.querySelector('.stage');
    if (stage) {
      stage.dataset.xpSurfaceProfile = spec.surface_profile || '';
      applyCatalogComparisonCopy(stage);
      applyThemeIdentity(stage, spec);
      applySurfaceBindings(stage, spec);
      applyDataBindings(stage, spec, palette);
      syncLeadBarIcons(stage);
      normalizeGeometry(stage);
      stage.dataset.surfaceRebuild = VERSION;
      stage.dataset.surfaceFocusCount = String(count);
    }
    root.dataset.catalogSurfaceReady = 'true';
  }

  window.WisePPTCatalogSurface = { version: VERSION, apply: apply };
  apply();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(apply);
  document.addEventListener('wise-ppt:semantic-keys-ready', apply);
  document.addEventListener('wise-ppt:gallery-state-change', apply);
})();
