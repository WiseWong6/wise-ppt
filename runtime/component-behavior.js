(function (global) {
  'use strict';

  var CONTRACT_VERSION = 4;
  // Catalog #077 “一页一个重心”在标准横槽中的最终视觉字号：40px × 0.838095。
  // 组件可以继续使用语义字阶，但任何组件文字经过自身/内部缩放后都不得超过该基准。
  var COMPONENT_VISUAL_TYPE_CEILING = 33.5238;
  var SLOT_SHAPES = Object.freeze(['portrait', 'square', 'landscape']);
  var SLOT_PLACEMENTS = Object.freeze(['fill', 'safe']);
  var TYPE_ROLE_TOKENS = Object.freeze({
    heading: 'heading',
    subheading: 'subheading',
    body: 'body',
    'body-small': 'body-small',
    metric: 'heading',
    label: 'label',
    meta: 'meta',
    number: 'meta',
    source: 'meta'
  });
  var TYPE_ROLE_FONTS = Object.freeze({
    heading: 'sans',
    subheading: 'sans',
    body: 'sans',
    'body-small': 'sans',
    metric: 'mono',
    label: 'sans',
    meta: 'mono',
    number: 'mono',
    source: 'mono'
  });
  var MAIN_TYPE_ROLES = Object.freeze(['heading', 'subheading', 'body', 'body-small']);
  var SMALL_EXEMPT_TYPE_ROLES = Object.freeze(['label', 'meta', 'number', 'source']);

  function positiveNumber(value, label) {
    var number = Number(value);
    if (!Number.isFinite(number) || number <= 0) throw new Error(label + ' 必须是正数');
    return number;
  }

  function parseContract(value) {
    if (!value) throw new Error('缺少 behavior_contract v4');
    var contract = typeof value === 'string' ? JSON.parse(value) : value;
    if (!contract || typeof contract !== 'object' || Array.isArray(contract)) {
      throw new Error('behavior_contract v4 必须是对象');
    }
    var expectedFit = {
      'fixed-visual': 'contain',
      'data-renderer': 'renderer-responsive'
    }[contract.render_mode];
    if (!expectedFit || contract.fit_mode !== expectedFit) {
      throw new Error('behavior_contract.render_mode/fit_mode 非法');
    }
    if (!Array.isArray(contract.allowed_slot_shapes) || !contract.allowed_slot_shapes.length) {
      throw new Error('behavior_contract.allowed_slot_shapes 不能为空');
    }
    if (contract.outer_alignment !== 'center') {
      throw new Error('behavior_contract.outer_alignment 必须为 center');
    }
    contract.allowed_slot_shapes.forEach(function (shape) {
      if (!SLOT_SHAPES.includes(shape)) throw new Error('未知槽型: ' + shape);
    });
    if (contract.render_mode === 'fixed-visual') {
      positiveNumber(contract.intrinsic_frame && contract.intrinsic_frame.width, 'intrinsic_frame.width');
      positiveNumber(contract.intrinsic_frame && contract.intrinsic_frame.height, 'intrinsic_frame.height');
    } else if (contract.intrinsic_frame != null) {
      throw new Error('data-renderer 不得声明 intrinsic_frame');
    }
    return contract;
  }

  function parsePlacementContract(value) {
    if (value == null || value === '') return null;
    var contract = typeof value === 'string' ? JSON.parse(value) : value;
    if (!contract || typeof contract !== 'object' || Array.isArray(contract)) {
      throw new Error('placement_contract 必须是对象');
    }
    if (Object.keys(contract).length !== 1 || !SLOT_PLACEMENTS.includes(contract.default)) {
      throw new Error('placement_contract.default 必须为 fill 或 safe');
    }
    return contract;
  }

  function resolvePlacement(value, placementContract) {
    var contract = parsePlacementContract(placementContract);
    if (!contract) throw new Error('组件缺少 placement_contract');
    if (value == null || value === '') return contract.default;
    if (!SLOT_PLACEMENTS.includes(value)) throw new Error('slot_placement 必须为 fill 或 safe');
    return value;
  }

  function slotShape(width, height) {
    var ratio = positiveNumber(width, '槽位宽度') / positiveNumber(height, '槽位高度');
    if (ratio < 0.9) return 'portrait';
    if (ratio <= 1.1) return 'square';
    return 'landscape';
  }

  function slotInsetTier(length) {
    var value = positiveNumber(length, '槽位轴长');
    return value < 480 ? 16 : (value < 960 ? 32 : 48);
  }

  function normalizedSlot(slot) {
    var width = positiveNumber(slot && slot.width, '槽位宽度');
    var height = positiveNumber(slot && slot.height, '槽位高度');
    var originLeft = Number(slot && slot.originLeft);
    var originTop = Number(slot && slot.originTop);
    return {
      width: width,
      height: height,
      shape: slotShape(width, height),
      originLeft: Number.isFinite(originLeft) ? originLeft : 0,
      originTop: Number.isFinite(originTop) ? originTop : 0
    };
  }

  function placementBox(slot, placement, inset) {
    if (placement !== 'safe') {
      return {
        left: slot.originLeft,
        top: slot.originTop,
        width: slot.width,
        height: slot.height
      };
    }
    var width = slot.width - inset.x * 2;
    var height = slot.height - inset.y * 2;
    if (width <= 0 || height <= 0) throw new Error('safe placement 可用区域不足');
    return {
      left: slot.originLeft + inset.x,
      top: slot.originTop + inset.y,
      width: width,
      height: height
    };
  }

  function slotAllows(routeOrContract, slot, options) {
    var route = routeOrContract && routeOrContract.behavior_contract ? routeOrContract : null;
    var contract = parseContract(route ? route.behavior_contract : routeOrContract);
    var target = normalizedSlot(slot);
    var placementContract = route ? route.placement_contract : (options && options.placementContract);
    var placement = resolvePlacement(options && options.placement, placementContract);
    var inset = siblingInset(target, options && options.siblingSlots);
    var effective = placementBox(target, placement, inset);
    if (!contract.allowed_slot_shapes.includes(target.shape)) return false;
    var need = (route && route.space_requirements) || {};
    var ratio = effective.width / effective.height;
    if (Number.isFinite(Number(need.min_width)) && effective.width < Number(need.min_width)) return false;
    if (Number.isFinite(Number(need.min_height)) && effective.height < Number(need.min_height)) return false;
    if (Number.isFinite(Number(need.min_aspect_ratio)) && ratio < Number(need.min_aspect_ratio)) return false;
    if (Number.isFinite(Number(need.max_aspect_ratio)) && ratio > Number(need.max_aspect_ratio)) return false;
    if (contract.fit_mode === 'contain') {
      var intrinsic = contract.intrinsic_frame;
      var scale = Math.min(effective.width / intrinsic.width, effective.height / intrinsic.height);
      var mainRoles = Object.keys(contract.type_roles || {}).map(function (selector) {
        return contract.type_roles[selector];
      }).filter(function (role) { return MAIN_TYPE_ROLES.includes(role); });
      var fallbackSizes = { heading: 40, subheading: 26, body: 22, 'body-small': 18 };
      var unreadable = mainRoles.some(function (role) {
        var token = global.getComputedStyle
          ? Number.parseFloat(global.getComputedStyle(document.documentElement).getPropertyValue('--type-' + role))
          : NaN;
        var size = Number.isFinite(token) ? token : fallbackSizes[role];
        return size * scale < 18 - 0.01;
      });
      if (unreadable) return false;
    }
    return true;
  }

  function uniqueSubject(host, selector) {
    var subjects = [];
    if (host.matches && host.matches(selector)) subjects.push(host);
    subjects = subjects.concat(Array.prototype.slice.call(host.querySelectorAll(selector)));
    subjects = subjects.filter(function (node, index) { return subjects.indexOf(node) === index; });
    if (subjects.length !== 1) {
      throw new Error('visual_subject_selector 应唯一命中，实际 ' + subjects.length + ' 个：' + selector);
    }
    return subjects[0];
  }

  function applyTypeRoles(host, contract) {
    var roles = contract.type_roles || {};
    var stale = Array.prototype.slice.call(host.querySelectorAll('[data-component-type-role],[data-component-type-authority]'));
    if (host.hasAttribute('data-component-type-role') || host.hasAttribute('data-component-type-authority')) stale.unshift(host);
    stale.forEach(function (node) {
      delete node.dataset.componentTypeRole;
      delete node.dataset.componentTypeAuthority;
    });
    Object.keys(roles).forEach(function (selector) {
      var role = roles[selector];
      if (!TYPE_ROLE_TOKENS[role]) throw new Error('未知组件字阶角色: ' + role);
      var nodes = [];
      if (host.matches && host.matches(selector)) nodes.push(host);
      nodes = nodes.concat(Array.prototype.slice.call(host.querySelectorAll(selector)));
      if (!nodes.length) throw new Error('type_roles 选择器未命中: ' + selector);
      var exactLeafSelectors = selector.split(',').map(function (item) { return item.trim(); });
      if (exactLeafSelectors.every(function (item) { return item.indexOf(':scope >') === 0; })
          && nodes.length !== exactLeafSelectors.length) {
        throw new Error('type_roles 权威叶数量错配: 预期 '
          + exactLeafSelectors.length + '，实际 ' + nodes.length + '：' + selector);
      }
      nodes.forEach(function (node) {
        var inlineTransition = node.style.getPropertyValue('transition');
        var inlineTransitionPriority = node.style.getPropertyPriority('transition');
        node.style.setProperty('transition', 'none', 'important');
        node.dataset.componentTypeRole = role;
        node.dataset.componentTypeAuthority = 'behavior-v4';
        node.style.setProperty('--wp-component-type-token', 'var(--type-' + TYPE_ROLE_TOKENS[role] + ')');
        node.style.setProperty('--wp-component-font-token', 'var(--' + TYPE_ROLE_FONTS[role] + ')');
        node.style.setProperty('font-size', 'var(--wp-component-type-token)', 'important');
        node.style.setProperty('font-family', 'var(--wp-component-font-token)', 'important');
        // Atlas 有些组件声明 transition:all。同步 mount 若在字号过渡中量值，
        // 会把旧 13px 当成最终正文并误报；先在无过渡状态强制落一帧。
        global.getComputedStyle(node).fontSize;
        if (inlineTransition) node.style.setProperty('transition', inlineTransition, inlineTransitionPriority);
        else node.style.removeProperty('transition');
        if (role === 'label') node.dataset.textKind = 'label';
        if (role === 'meta') node.dataset.textKind = 'meta';
        if (role === 'number') node.dataset.textKind = 'number';
        if (role === 'source') node.dataset.textKind = 'source';
      });
    });
  }

  function authorizedSmallText(node) {
    return !!node
      && node.dataset.componentTypeAuthority === 'behavior-v4'
      && SMALL_EXEMPT_TYPE_ROLES.includes(node.dataset.componentTypeRole || '');
  }

  // 画册模式会用 #deck{visibility:hidden} 隐藏整套演示。visibility 会继承，
  // 若直接读取 computed style，非当前页的组件会被误判为“不可见”，从而跳过
  // 可见墨迹适配和字号下限。测量阶段只在同一同步任务内覆盖 host，量完即还原；
  // 组件内部自己声明的 hidden 仍然生效，也不会改变最终页面显示状态。
  function makeHostMeasurable(host) {
    var priorValue = host.style.getPropertyValue('visibility');
    var priorPriority = host.style.getPropertyPriority('visibility');
    var forced = global.getComputedStyle(host).visibility !== 'visible';
    if (forced) host.style.setProperty('visibility', 'visible', 'important');
    return function restoreMeasurementVisibility() {
      if (!forced) return;
      if (priorValue) host.style.setProperty('visibility', priorValue, priorPriority);
      else host.style.removeProperty('visibility');
    };
  }

  function siblingInset(slot, siblings) {
    var candidates = Array.isArray(siblings) && siblings.length ? siblings : [slot];
    var widths = candidates.map(function (item) { return positiveNumber(item.width, '兄弟槽宽度'); });
    var heights = candidates.map(function (item) { return positiveNumber(item.height, '兄弟槽高度'); });
    return { x: slotInsetTier(Math.min.apply(Math, widths)), y: slotInsetTier(Math.min.apply(Math, heights)) };
  }

  function setFrame(host, fitMode, slot, contract, inset, placement) {
    host.style.position = 'absolute';
    host.style.transformOrigin = '0 0';
    host.style.removeProperty('right');
    host.style.removeProperty('bottom');
    var effective = placementBox(slot, placement, inset);
    if (fitMode === 'renderer-responsive') {
      host.style.left = effective.left + 'px';
      host.style.top = effective.top + 'px';
      host.style.width = effective.width + 'px';
      host.style.height = effective.height + 'px';
      host.style.transform = 'none';
      return { scale: 1, effective: effective };
    }
    var intrinsic = contract.intrinsic_frame;
    var scale = Math.min(effective.width / intrinsic.width, effective.height / intrinsic.height);
    if (!Number.isFinite(scale) || scale <= 0) throw new Error('contain 可用区域不足');
    var renderedWidth = intrinsic.width * scale;
    var renderedHeight = intrinsic.height * scale;
    host.style.left = (effective.left + (effective.width - renderedWidth) / 2) + 'px';
    host.style.top = (effective.top + (effective.height - renderedHeight) / 2) + 'px';
    host.style.setProperty('--wp-component-frame-width', intrinsic.width + 'px');
    host.style.setProperty('--wp-component-frame-height', intrinsic.height + 'px');
    host.style.width = intrinsic.width + 'px';
    host.style.height = intrinsic.height + 'px';
    host.style.transform = 'scale(' + scale + ')';
    return { scale: scale, effective: effective };
  }

  function visibleColor(value) {
    if (!value || value === 'none' || value === 'transparent') return false;
    if (!/^rgba\(/.test(value)) return true;
    var channels = value.match(/[\d.]+/g) || [];
    return channels.length < 4 || Number(channels[3]) > 0;
  }

  function hasVisibleBorder(style) {
    return ['Top', 'Right', 'Bottom', 'Left'].some(function (side) {
      return Number.parseFloat(style['border' + side + 'Width']) > 0
        && style['border' + side + 'Style'] !== 'none'
        && visibleColor(style['border' + side + 'Color']);
    });
  }

  function unionRect(bounds, rect) {
    if (!rect || !Number.isFinite(rect.left) || !Number.isFinite(rect.top)
      || (!rect.width && !rect.height)) return bounds;
    if (!bounds) {
      return { left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom };
    }
    bounds.left = Math.min(bounds.left, rect.left);
    bounds.top = Math.min(bounds.top, rect.top);
    bounds.right = Math.max(bounds.right, rect.right);
    bounds.bottom = Math.max(bounds.bottom, rect.bottom);
    return bounds;
  }

  // 外框居中不等于墨迹居中。这里量实际可见图形和文字，不把透明 wrapper
  // 当成内容，也不靠 overflow:hidden 掩盖越界。
  function effectiveOpacity(node, subject) {
    var opacity = 1;
    for (var current = node; current; current = current.parentElement) {
      var value = Number.parseFloat(global.getComputedStyle(current).opacity);
      if (Number.isFinite(value)) opacity *= value;
      if (current === subject) break;
    }
    return opacity;
  }

  function visibleInkRects(subject) {
    var all = null;
    var primary = null;
    var svgExcluded = /^(defs|clippath|mask|pattern|lineargradient|radialgradient|filter|marker)$/;
    function add(rect, opacity) {
      all = unionRect(all, rect);
      if (opacity >= 0.35) primary = unionRect(primary, rect);
    }
    var nodes = Array.prototype.slice.call(subject.querySelectorAll('*'));
    nodes.forEach(function (node) {
      var style = global.getComputedStyle(node);
      var opacity = effectiveOpacity(node, subject);
      if (style.display === 'none' || style.visibility === 'hidden' || opacity === 0) return;
      var tag = node.tagName.toLowerCase();
      var isSvg = !!(global.SVGElement && node instanceof global.SVGElement);
      if (isSvg) {
        if (tag === 'svg' || svgExcluded.test(tag)) return;
        if (!visibleColor(style.fill) && !visibleColor(style.stroke)
          && tag !== 'image' && tag !== 'use' && tag !== 'foreignobject') return;
        add(node.getBoundingClientRect(), opacity);
        return;
      }
      var isMedia = /^(img|canvas|video|iframe)$/.test(tag);
      var hasBoxPaint = visibleColor(style.backgroundColor)
        || (style.backgroundImage && style.backgroundImage !== 'none')
        || hasVisibleBorder(style)
        || (style.boxShadow && style.boxShadow !== 'none');
      if (isMedia || hasBoxPaint) add(node.getBoundingClientRect(), opacity);
    });

    var walker = document.createTreeWalker(subject, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      if (!walker.currentNode.nodeValue.trim()) continue;
      var parent = walker.currentNode.parentElement;
      if (!parent || (global.SVGElement && parent instanceof global.SVGElement)) continue;
      var textStyle = global.getComputedStyle(parent);
      var opacity = effectiveOpacity(parent, subject);
      if (textStyle.display === 'none' || textStyle.visibility === 'hidden' || opacity === 0) continue;
      var range = document.createRange();
      range.selectNodeContents(walker.currentNode);
      Array.prototype.forEach.call(range.getClientRects(), function (rect) {
        add(rect, opacity);
      });
    }
    return { all: all, primary: primary || all };
  }

  function fitVisibleInk(host, subject, contract, frame, maxScale) {
    if (contract.fit_mode !== 'contain' || contract.inner_alignment !== 'center') {
      return { scale: frame.scale, fitted: false };
    }
    var inkRects = visibleInkRects(subject);
    var ink = inkRects.all;
    var primary = inkRects.primary;
    if (!ink || !primary) return { scale: frame.scale, fitted: false };
    var hostRect = host.getBoundingClientRect();
    var hostStyle = global.getComputedStyle(host);
    var hostWidth = Number.parseFloat(hostStyle.width) || host.offsetWidth;
    var hostHeight = Number.parseFloat(hostStyle.height) || host.offsetHeight;
    var screenScaleX = hostWidth > 0 ? hostRect.width / hostWidth : NaN;
    var screenScaleY = hostHeight > 0 ? hostRect.height / hostHeight : NaN;
    if (!(screenScaleX > 0) || !(screenScaleY > 0)) return { scale: frame.scale, fitted: false };

    var inkLeft = (ink.left - hostRect.left) / screenScaleX;
    var inkTop = (ink.top - hostRect.top) / screenScaleY;
    var inkRight = (ink.right - hostRect.left) / screenScaleX;
    var inkBottom = (ink.bottom - hostRect.top) / screenScaleY;
    var inkWidth = inkRight - inkLeft;
    var inkHeight = inkBottom - inkTop;
    if (!(inkWidth > 0) || !(inkHeight > 0)) return { scale: frame.scale, fitted: false };

    var centerX = ((primary.left + primary.right) / 2 - hostRect.left) / screenScaleX;
    var centerY = ((primary.top + primary.bottom) / 2 - hostRect.top) / screenScaleY;
    var centeredWidth = 2 * Math.max(centerX - inkLeft, inkRight - centerX);
    var centeredHeight = 2 * Math.max(centerY - inkTop, inkBottom - centerY);
    // 强墨迹负责居中；全部可见墨迹（含淡墨）负责 contain。申报外框仍是
    // 缩放上限，真实墨迹更大时只允许进一步缩小。
    var scale = Math.min(
      frame.scale,
      frame.effective.width / centeredWidth,
      frame.effective.height / centeredHeight,
      Number.isFinite(maxScale) ? maxScale : Infinity
    );
    host.style.left = (frame.effective.left + frame.effective.width / 2 - centerX * scale) + 'px';
    host.style.top = (frame.effective.top + frame.effective.height / 2 - centerY * scale) + 'px';
    host.style.transform = 'scale(' + scale + ')';
    host.dataset.visibleInkWidth = inkWidth.toFixed(3);
    host.dataset.visibleInkHeight = inkHeight.toFixed(3);
    host.dataset.visibleInkCentered = 'true';
    return { scale: scale, fitted: true };
  }

  function elementVisualScale(node, host, appliedScale, includeInnerShrink) {
    // SVG 的 viewBox、g transform 与宿主 scale 会叠加。getComputedStyle(fontSize)
    // 只返回字形坐标系里的字号，所以用 screen CTM 算出子树内层缩放，
    // 再除掉 Catalog/舞台的外部预览缩放。
    if (global.SVGGraphicsElement && node instanceof global.SVGGraphicsElement && typeof node.getScreenCTM === 'function') {
      var ctm = node.getScreenCTM();
      var hostRect = host.getBoundingClientRect();
      var hostHeight = Number.parseFloat(global.getComputedStyle(host).height) || host.offsetHeight;
      var hostScreenScale = hostHeight > 0 ? hostRect.height / hostHeight : NaN;
      var screenScale = ctm ? Math.hypot(ctm.c, ctm.d) : NaN;
      if (Number.isFinite(screenScale) && Number.isFinite(hostScreenScale) && hostScreenScale > 0) {
        var svgInnerScale = screenScale / hostScreenScale;
        // 封顶不得借离屏装配阶段的临时缩小放宽字号；可读性检查则必须
        // 使用真实正缩放，否则 18px × .5 会被误算成 18px。
        return appliedScale * (includeInnerShrink ? svgInnerScale : Math.max(svgInnerScale, 1));
      }
    }

    // HTML 组件也可能在宿主内有局部 transform。只累积宿主以内的矩阵，
    // 避免把整个 1920 舞台的视口缩放误算成组件字号。
    var Matrix = global.DOMMatrixReadOnly || global.DOMMatrix;
    if (!Matrix) return appliedScale;
    var transforms = [];
    var current = node;
    while (current && current !== host) {
      var transform = global.getComputedStyle(current).transform;
      if (transform && transform !== 'none') transforms.unshift(new Matrix(transform));
      current = current.parentElement;
    }
    var combined = new Matrix();
    transforms.forEach(function (matrix) { combined = combined.multiply(matrix); });
    var innerScale = Math.hypot(combined.c, combined.d);
    if (!Number.isFinite(innerScale) || innerScale <= 0) return appliedScale;
    return appliedScale * (includeInnerShrink ? innerScale : Math.max(innerScale, 1));
  }

  function capVisualType(host, appliedScale) {
    var visualScale = positiveNumber(appliedScale == null ? 1 : appliedScale, '组件可见缩放');
    var capped = [];
    var changed = 0;
    var scaleLimit = Infinity;
    var seen = [];
    var walker = document.createTreeWalker(host, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      if (!walker.currentNode.nodeValue.trim()) continue;
      var node = walker.currentNode.parentElement;
      if (!node || seen.indexOf(node) !== -1) continue;
      seen.push(node);
      var style = global.getComputedStyle(node);
      if (style.display === 'none' || style.visibility === 'hidden') continue;
      var size = Number.parseFloat(style.fontSize);
      var nodeScale = elementVisualScale(node, host, visualScale);
      var visualSize = size * nodeScale;
      if (!Number.isFinite(visualSize) || visualSize <= COMPONENT_VISUAL_TYPE_CEILING + 0.01) continue;
      // 封顶只能落到正式 design token；写任意 25.1109px 会与 deck 字阶门禁自相矛盾。
      var smallSemantic = authorizedSmallText(node);
      var tokenNames = smallSemantic
        ? ['label', 'meta']
        : ['heading', 'subheading', 'body', 'body-small'];
      var rootStyle = global.getComputedStyle(document.documentElement);
      var candidates = tokenNames.map(function (token) {
        return { token: token, size: Number.parseFloat(rootStyle.getPropertyValue('--type-' + token)) };
      }).filter(function (candidate) {
        if (!Number.isFinite(candidate.size) || candidate.size > size + 0.01) return false;
        var candidateVisual = candidate.size * nodeScale;
        return candidateVisual <= COMPONENT_VISUAL_TYPE_CEILING + 0.001
          && (smallSemantic || candidateVisual >= 18 - 0.01);
      }).sort(function (left, right) { return right.size - left.size; });
      if (!candidates.length) {
        // 当前节点已经是最小正式主字阶时，继续改小字号会破坏语义。
        // 固定视觉组件应改为整体缩小，保持组件内部比例与 design token。
        scaleLimit = Math.min(
          scaleLimit,
          visualScale * COMPONENT_VISUAL_TYPE_CEILING / visualSize
        );
        continue;
      }
      var cappedToken = candidates[0].token;
      var cappedValue = 'var(--type-' + cappedToken + ')';
      if (node.dataset.componentTypeCapToken === cappedToken
          && node.style.getPropertyValue('font-size').trim() === cappedValue) {
        capped.push(node);
        continue;
      }
      // atlas 原稿有 transition: all；若直接改字号，过渡中的 computed font-size
      // 会在短时间内继续越线。封顶属于版式约束，写入时先暂停过渡并强制落帧。
      var inlineTransition = node.style.getPropertyValue('transition');
      var inlineTransitionPriority = node.style.getPropertyPriority('transition');
      node.style.setProperty('transition', 'none', 'important');
      try {
        node.style.setProperty('font-size', cappedValue, 'important');
      } finally {
        if (inlineTransition) node.style.setProperty('transition', inlineTransition, inlineTransitionPriority);
        else node.style.removeProperty('transition');
      }
      node.dataset.componentTypeCapped = 'true';
      node.dataset.componentTypeCapScale = elementVisualScale(node, host, visualScale).toFixed(6);
      node.dataset.componentTypeCapToken = cappedToken;
      capped.push(node);
      changed++;
    }
    var total = host.querySelectorAll('[data-component-type-capped="true"]').length
      + (host.dataset.componentTypeCapped === 'true' ? 1 : 0);
    host.dataset.componentVisualTypeCeiling = String(COMPONENT_VISUAL_TYPE_CEILING);
    host.dataset.componentCappedTypeCount = String(total);
    host.dataset.componentTypeCapChangedCount = String(changed);
    return { total: total, changed: changed, scaleLimit: scaleLimit };
  }

  function resetVisualTypeCaps(host) {
    var nodes = Array.prototype.slice.call(host.querySelectorAll('[data-component-type-capped="true"]'));
    if (host.dataset.componentTypeCapped === 'true') nodes.unshift(host);
    nodes.forEach(function (node) {
      node.style.removeProperty('font-size');
      delete node.dataset.componentTypeCapped;
      delete node.dataset.componentTypeCapScale;
      delete node.dataset.componentTypeCapToken;
    });
    host.dataset.componentCappedTypeCount = '0';
    host.dataset.componentTypeCapChangedCount = '0';
    delete host.dataset.componentVisualScaleLimit;
  }

  function assertRegisteredComponentCss(host) {
    var componentId = host.dataset.materializedComponentId || host.dataset.componentId || '';
    if (componentId.indexOf('native.paper-ink.') !== 0) return;
    var style = global.getComputedStyle(host);
    ['--pi-paper', '--pi-ink'].forEach(function (token) {
      if (!style.getPropertyValue(token).trim()) {
        throw new Error(componentId + ' 缺 registered-components.css 主题变量: ' + token);
      }
    });
  }

  // 全文本口径：遍历宿主子树全部文本节点，正文最终可见字号不得低于 18px。
  // 小字只认本轮 mount 从 authority behavior type_roles 写出的叶级授权；
  // data-text-kind / data-catalog-text-kind 都只是说明，不能提供豁免。
  function assertReadableType(host, appliedScale) {
    var visualScale = positiveNumber(appliedScale == null ? 1 : appliedScale, '组件可见缩放');
    var tooSmall = [];
    var seen = [];
    var walker = document.createTreeWalker(host, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      if (!walker.currentNode.nodeValue.trim()) continue;
      var node = walker.currentNode.parentElement;
      if (!node || seen.indexOf(node) !== -1) continue;
      seen.push(node);
      if (authorizedSmallText(node)) continue;
      var style = global.getComputedStyle(node);
      if (style.display === 'none' || style.visibility === 'hidden') continue;
      if (!node.getClientRects().length) continue;
      var size = Number.parseFloat(style.fontSize);
      var visualSize = size * elementVisualScale(node, host, visualScale, true);
      if (!Number.isFinite(visualSize) || visualSize < 18 - 0.01) {
        var classes = typeof node.className === 'string' && node.className.trim()
          ? '.' + node.className.trim().replace(/\s+/g, '.') : '';
        tooSmall.push(node.tagName.toLowerCase() + classes + ':' + visualSize.toFixed(2));
      }
    }
    if (tooSmall.length) throw new Error('主体文字低于 18px: ' + tooSmall.slice(0, 12).join(', '));
  }

  function mount(host, options) {
    if (!host || host.nodeType !== 1) throw new Error('组件行为运行器需要元素 host');
    var settings = options || {};
    var contract = parseContract(settings.contract || host.dataset.behaviorContract);
    var placementContract = parsePlacementContract(settings.placementContract || host.dataset.placementContract);
    var placement = resolvePlacement(settings.placement, placementContract);
    var slot = normalizedSlot(settings.slot || {});
    if (!contract.allowed_slot_shapes.includes(slot.shape)) throw new Error('组件不允许进入 ' + slot.shape + ' 槽');
    assertRegisteredComponentCss(host);
    var inset = siblingInset(slot, settings.siblingSlots);
    host.dataset.componentBehaviorHost = 'true';
    host.dataset.behaviorContractVersion = String(CONTRACT_VERSION);
    host.dataset.renderMode = contract.render_mode;
    host.dataset.fitMode = contract.fit_mode;
    host.dataset.slotShape = slot.shape;
    host.dataset.slotPlacement = placement;
    host.dataset.outerAlignment = contract.outer_alignment;
    host.dataset.innerAlignment = contract.inner_alignment;
    host.style.setProperty('--wp-slot-inset-x', inset.x + 'px');
    host.style.setProperty('--wp-slot-inset-y', inset.y + 'px');
    var subject = uniqueSubject(host, contract.visual_subject_selector);
    // type_roles 的权威叶路径始终相对 adapter 物化出的组件根生成；该根
    // 不一定等于用于 contain 的视觉主体（例如后台台只缩放内部 .ui）。
    // 成品页把物化收据盖在组件根上，host 即根；catalog 预览把组件根包在
    // .slot-fill host 内，必须下钻唯一子元素再套权威叶选择器。
    var hasTypeRoles = Object.keys(contract.type_roles || {}).length > 0;
    var typeScope = contract.render_mode === 'fixed-visual' && hasTypeRoles
      ? (host.hasAttribute('data-materialized-component-id') ? host : uniqueSubject(host, ':scope > *'))
      : host;
    subject.dataset.visualSubject = 'true';
    if (contract.fit_mode === 'contain') {
      subject.style.setProperty('--wp-intrinsic-width', contract.intrinsic_frame.width + 'px');
      subject.style.setProperty('--wp-intrinsic-height', contract.intrinsic_frame.height + 'px');
    }
    var restoreMeasurementVisibility = makeHostMeasurable(host);
    var frame;
    var scale;
    var capResult = { total: 0, changed: 0 };
    var maxVisualScale = Infinity;
    try {
      resetVisualTypeCaps(host);
      applyTypeRoles(typeScope, contract);
      frame = setFrame(host, contract.fit_mode, slot, contract, inset, placement);
      var fitted = fitVisibleInk(host, subject, contract, frame, maxVisualScale);
      scale = fitted.scale;
      host.dataset.appliedScale = scale.toFixed(6);
      host.dataset.slotInsetX = String(inset.x);
      host.dataset.slotInsetY = String(inset.y);
      host.dataset.effectivePlacementLeft = String(frame.effective.left);
      host.dataset.effectivePlacementTop = String(frame.effective.top);
      host.dataset.effectivePlacementWidth = String(frame.effective.width);
      host.dataset.effectivePlacementHeight = String(frame.effective.height);
      var converged = false;
      for (var typePass = 0; typePass < 6; typePass++) {
        capResult = capVisualType(host, scale);
        if (Number.isFinite(capResult.scaleLimit)) {
          if (contract.fit_mode !== 'contain') {
            throw new Error('响应式组件字号无法同时满足 18px 下限、视觉封顶与 design token');
          }
          maxVisualScale = Math.min(maxVisualScale, capResult.scaleLimit);
          host.dataset.componentVisualScaleLimit = maxVisualScale.toFixed(6);
        }
        fitted = fitVisibleInk(host, subject, contract, frame, maxVisualScale);
        var nextScale = fitted.scale;
        host.dataset.appliedScale = nextScale.toFixed(6);
        if (capResult.changed === 0 && Math.abs(nextScale - scale) <= 0.000001) {
          scale = nextScale;
          converged = true;
          break;
        }
        scale = nextScale;
      }
      if (!converged) throw new Error('组件字号封顶与可见墨迹适配未在 6 轮内收敛');
      assertReadableType(host, scale);
    } finally {
      restoreMeasurementVisibility();
    }
    return {
      compatible: true,
      slotShape: slot.shape,
      fitMode: contract.fit_mode,
      insetX: inset.x,
      insetY: inset.y,
      placement: placement,
      effectiveFrame: frame.effective,
      scale: scale,
      visualTypeCeiling: COMPONENT_VISUAL_TYPE_CEILING,
      cappedTypeCount: capResult.total,
      intrinsicFrame: contract.intrinsic_frame || null,
      subject: subject
    };
  }

  function dimensionsFor(element) {
    var rect = element.getBoundingClientRect();
    // 舞台整体带 transform:scale(视口/1920)，getBoundingClientRect 量到的是缩小后的视觉尺寸，
    // 必须除回 scale 得到 1920 逻辑坐标（与 deck-runtime 的槽位契约检查同口径；print 模式无 scale 自动为 1）
    var stageWidth = global.WisePPTStageFit && global.WisePPTStageFit.width ? global.WisePPTStageFit.width : 1920;
    var scale = 1;
    var stage = element.closest('.stage');
    if (stage) scale = stage.getBoundingClientRect().width / stageWidth || 1;
    return {
      width: Number(element.dataset.slotWidth) || rect.width / scale,
      height: Number(element.dataset.slotHeight) || rect.height / scale
    };
  }

  // Some locked Catalog skeletons materialize the component directly on the
  // data-layout-slot node. mount() normally positions a child in slot-local
  // coordinates; treating a self-hosted slot the same way drops the slot's
  // stage origin and moves the complete component toward (0,0). Freeze the
  // original logical box once and pass its origin explicitly instead.
  function selfSlotDimensions(host) {
    var cachedWidth = Number(host.dataset.behaviorSelfSlotWidth);
    var cachedHeight = Number(host.dataset.behaviorSelfSlotHeight);
    var cachedLeft = Number(host.dataset.behaviorSelfSlotLeft);
    var cachedTop = Number(host.dataset.behaviorSelfSlotTop);
    if ([cachedWidth, cachedHeight, cachedLeft, cachedTop].every(Number.isFinite)
        && cachedWidth > 0 && cachedHeight > 0) {
      return {
        width: cachedWidth,
        height: cachedHeight,
        originLeft: cachedLeft,
        originTop: cachedTop
      };
    }
    var measured = dimensionsFor(host);
    var left = Number(host.offsetLeft);
    var top = Number(host.offsetTop);
    if (!Number.isFinite(left) || !Number.isFinite(top)) {
      throw new Error('组件自承载槽缺少稳定逻辑坐标');
    }
    host.dataset.behaviorSelfSlotWidth = String(measured.width);
    host.dataset.behaviorSelfSlotHeight = String(measured.height);
    host.dataset.behaviorSelfSlotLeft = String(left);
    host.dataset.behaviorSelfSlotTop = String(top);
    return {
      width: measured.width,
      height: measured.height,
      originLeft: left,
      originTop: top
    };
  }

  function mountAll(scope) {
    var root = scope || document;
    return Array.prototype.map.call(root.querySelectorAll('[data-behavior-contract]'), function (host) {
      var slotElement = host.closest('[data-layout-slot]');
      if (!slotElement) throw new Error('behavior_contract 组件必须位于 data-layout-slot 内');
      var selfHostedSlot = slotElement === host;
      var insetGroup = slotElement.dataset.insetGroup || '';
      var siblingElements = Array.prototype.filter.call(
        slotElement.parentElement.querySelectorAll(':scope > [data-layout-slot]'),
        function (candidate) { return !insetGroup || (candidate.dataset.insetGroup || '') === insetGroup; }
      );
      var siblings = siblingElements.map(function (candidate) {
        return candidate === host && selfHostedSlot
          ? selfSlotDimensions(host)
          : dimensionsFor(candidate);
      });
      return mount(host, {
        contract: host.dataset.behaviorContract,
        placementContract: host.dataset.placementContract,
        placement: slotElement.dataset.slotPlacement,
        slot: selfHostedSlot ? selfSlotDimensions(host) : dimensionsFor(slotElement),
        siblingSlots: siblings
      });
    });
  }

  global.WisePPTComponentBehavior = Object.freeze({
    contractVersion: CONTRACT_VERSION,
    slotShapes: SLOT_SHAPES,
    slotPlacements: SLOT_PLACEMENTS,
    visualTypeCeiling: COMPONENT_VISUAL_TYPE_CEILING,
    slotShape: slotShape,
    slotInsetTier: slotInsetTier,
    slotAllows: slotAllows,
    parseContract: parseContract,
    parsePlacementContract: parsePlacementContract,
    // deck-runtime 的固定组件几何门禁必须与 behavior-v4 的实际拟合口径一致：
    // HTML 文字用 Range 字形框，SVG/有漆盒用可见框，并累计祖先 opacity。
    measureVisibleInk: visibleInkRects,
    mount: mount,
    mountAll: mountAll
  });
})(window);
