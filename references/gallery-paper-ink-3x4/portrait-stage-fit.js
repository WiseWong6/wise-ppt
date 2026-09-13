(function (global) {
  'use strict';

  /* 安全区合同(用户定义):安全高度 = 副标题底部 → 页底文案顶部;
     安全宽度 = 页宽 − 2×左标题边距。竖版 1080×1440 固定值如下,
     行带/波段布局必须从这两个界推导,禁止手调越界像素。 */
  var PORTRAIT_SAFE = {
    top: 290,
    bottom: 1249,
    left: 90,
    right: 990,
    get height() { return this.bottom - this.top; },
    get width() { return this.right - this.left; }
  };
  global.PORTRAIT_SAFE = PORTRAIT_SAFE;
  var STAGE_WIDTH = 1080;
  var STAGE_HEIGHT = 1440;
  var GALLERY_KEY_MESSAGE = 'wise-ppt-gallery-key';
  var GALLERY_ACTIVITY_MESSAGE = 'wise-ppt-gallery-activity';
  var FRAME_READY_MESSAGE = 'wise-ppt-frame-ready';
  var FRAME_STATE_MESSAGE = 'wise-ppt-frame-state';
  var FRAME_STATE_READY_MESSAGE = 'wise-ppt-frame-state-ready';
  var FRAME_PROTOCOL = 'wise-ppt-frame/v1';
  var PAPER_NOISE_DEFS_ID = 'wise-ppt-paper-noise-defs';
  var PAPER_NOISE_FILTER_ID = 'wise-ppt-paper-noise';
  var PORTRAIT_FURNITURE_SELECTOR = '.doc,.folio,.caption,.portrait-label';
  var PORTRAIT_CAPTION_TOP_PROPERTY = '--portrait-caption-top';
  var PORTRAIT_STRUCTURAL_PAGE_ROLES = ['cover', 'closing', 'agenda', 'transition', 'contact'];
  var GALLERY_THEMES = ['paper-ink', 'hermes-orange', 'klein-blue'];
  var GALLERY_TYPOGRAPHY_MODES = ['all-sans', 'all-serif', 'mixed'];
  var galleryStateSerial = 0;
  var galleryStateRenderers = [];

  /* 该脚本只服务 gallery-3x4 参考 frame，并在首个主题 CSS 之前加载。
     直开与 Catalog 嵌入都启用本仓库随附的 Catalog 字体子集，避免继续探测
     未随工作树提交的完整生产字库；嵌入态再提前写入目标主题/字体属性。 */
  function bootstrapGallerySpecimen() {
    var root = document.documentElement;
    if (!root || root.dataset.runtime !== 'wise-ppt-specimen') return;
    var params = new URLSearchParams(global.location.search);
    var themeId = params.get('theme');
    var typography = params.get('typography');
    var defaultColorProfile = params.get('default-color-profile') === 'legacy' ? 'legacy' : 'standard';
    var emphasisTarget = params.get('emphasis') || '';
    var emphasisProfile = params.get('emphasis-profile') === 'legacy' ? 'legacy' : 'standard';
    if (GALLERY_THEMES.indexOf(themeId) >= 0) root.dataset.themeId = themeId;
    if (GALLERY_TYPOGRAPHY_MODES.indexOf(typography) >= 0) root.dataset.typographyMode = typography;
    root.dataset.defaultColorProfile = defaultColorProfile;
    root.dataset.emphasisTarget = emphasisTarget;
    root.dataset.emphasisProfile = emphasisProfile;
    root.classList.toggle('accent', Boolean(emphasisTarget));
    root.dataset.wiseCatalogFonts = 'true';
    if (params.get('wise-ppt-embed') !== 'gallery') return;
  }

  bootstrapGallerySpecimen();

  /* 爱马仕橙参考稿使用 display:none 的全局 SVG filter。Chrome 对这种隐藏
     filter 与 CSS data-URI 的栅格结果不同，因此保留参考 DOM 结构；克莱因蓝
     继续由生成 CSS 使用参考稿自己的 data-URI renderer。 */
  function ensurePaperNoiseFilter() {
    var root = document.documentElement;
    var existing = document.getElementById(PAPER_NOISE_DEFS_ID);
    if (existing) {
      root.dataset.paperNoiseReady = 'true';
      return existing;
    }
    if (!document.body) return null;
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    var filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    var turbulence = document.createElementNS('http://www.w3.org/2000/svg', 'feTurbulence');
    svg.id = PAPER_NOISE_DEFS_ID;
    svg.setAttribute('width', '0');
    svg.setAttribute('height', '0');
    svg.setAttribute('aria-hidden', 'true');
    svg.style.display = 'none';
    filter.id = PAPER_NOISE_FILTER_ID;
    turbulence.setAttribute('type', 'fractalNoise');
    turbulence.setAttribute('baseFrequency', '0.8');
    turbulence.setAttribute('numOctaves', '3');
    turbulence.setAttribute('stitchTiles', 'stitch');
    filter.appendChild(turbulence);
    svg.appendChild(filter);
    document.body.prepend(svg);
    root.dataset.paperNoiseReady = 'true';
    return svg;
  }

  function viewportBounds() {
    var viewport = global.visualViewport;
    return {
      left: viewport ? viewport.offsetLeft : 0,
      top: viewport ? viewport.offsetTop : 0,
      width: viewport ? viewport.width : global.innerWidth,
      height: viewport ? viewport.height : global.innerHeight
    };
  }

  function scaleFor(width, height, allowUpscale) {
    var scale = Math.min(width / STAGE_WIDTH, height / STAGE_HEIGHT);
    return allowUpscale ? scale : Math.min(scale, 1);
  }

  function contains(bounds, rect, tolerance) {
    var epsilon = tolerance == null ? 1 : tolerance;
    return rect.left >= bounds.left - epsilon &&
      rect.top >= bounds.top - epsilon &&
      rect.right <= bounds.left + bounds.width + epsilon &&
      rect.bottom <= bounds.top + bounds.height + epsilon;
  }

  function portraitContentNodes(stage) {
    return Array.prototype.filter.call(stage.children, function (node) {
      if (node.matches(PORTRAIT_FURNITURE_SELECTOR)) return false;
      var style = global.getComputedStyle(node);
      var rect = node.getBoundingClientRect();
      return style.display !== 'none' && style.visibility !== 'hidden' &&
        Number.parseFloat(style.opacity || '1') > .01 && rect.width > .5 && rect.height > .5;
    });
  }

  function portraitLocalRect(rect, stageRect, scaleX, scaleY) {
    return {
      left: (rect.left - stageRect.left) / scaleX,
      top: (rect.top - stageRect.top) / scaleY,
      right: (rect.right - stageRect.left) / scaleX,
      bottom: (rect.bottom - stageRect.top) / scaleY
    };
  }

  function portraitSvgInkRect(svg, stageRect, scaleX, scaleY) {
    var box;
    try { box = svg.getBBox(); }
    catch (error) { return null; }
    if (!(box.width > .5 && box.height > .5)) return null;
    var matrix = svg.getScreenCTM();
    if (!matrix) return null;
    var points = [
      [box.x, box.y], [box.x + box.width, box.y],
      [box.x, box.y + box.height], [box.x + box.width, box.y + box.height]
    ].map(function (point) {
      return new global.DOMPoint(point[0], point[1]).matrixTransform(matrix);
    });
    return portraitLocalRect({
      left: Math.min.apply(null, points.map(function (point) { return point.x; })),
      top: Math.min.apply(null, points.map(function (point) { return point.y; })),
      right: Math.max.apply(null, points.map(function (point) { return point.x; })),
      bottom: Math.max.apply(null, points.map(function (point) { return point.y; }))
    }, stageRect, scaleX, scaleY);
  }

  function portraitUnion(rects) {
    if (!rects.length) return null;
    var left = Math.min.apply(null, rects.map(function (rect) { return rect.left; }));
    var top = Math.min.apply(null, rects.map(function (rect) { return rect.top; }));
    var right = Math.max.apply(null, rects.map(function (rect) { return rect.right; }));
    var bottom = Math.max.apply(null, rects.map(function (rect) { return rect.bottom; }));
    return {
      left: left, top: top, right: right, bottom: bottom,
      width: right - left, height: bottom - top,
      centerX: (left + right) / 2, centerY: (top + bottom) / 2
    };
  }

  /* Wise PPT 的内容页标题只存在于左上角两行小页眉 `.doc.tl`。
     早期 3:4 适配曾在 SVG 内容区重复绘制“大标题 + 解释句”；这些文字既不在
     16:9 原版中，也会错误挤占安全高度。封面、章节、过渡页，以及 T2/T3
     组件内部的标题不属于重复页面标题，必须保留。 */
  function stripUnauthorizedPortraitPageHeadings(stage) {
    var root = document.documentElement;
    var target = stage || document.querySelector('.stage');
    if (!target || PORTRAIT_STRUCTURAL_PAGE_ROLES.indexOf(root.dataset.pageRole || '') >= 0) {
      root.dataset.portraitPageHeadingContract = 'structural-page';
      return 0;
    }

    var removed = 0;
    Array.prototype.forEach.call(
      target.querySelectorAll(':scope > .page-title,:scope > .page-subtitle'),
      function (element) {
        element.remove();
        removed += 1;
      }
    );

    var scene = target.querySelector('svg.scene');
    if (scene) {
      var texts = Array.prototype.slice.call(scene.querySelectorAll('text'));
      var eligibleZone = function (element) {
        var zoneOwner = element.closest('[data-layout-zone]');
        var zone = zoneOwner ? zoneOwner.getAttribute('data-layout-zone') || '' : '';
        return !zone || /\.section$/.test(zone);
      };
      var headings = texts.filter(function (element) {
        var x = Number.parseFloat(element.getAttribute('x'));
        var y = Number.parseFloat(element.getAttribute('y'));
        var size = Number.parseFloat(global.getComputedStyle(element).fontSize);
        return eligibleZone(element) && Number.isFinite(x) && Number.isFinite(y) &&
          x <= 180 && y >= 185 && y <= 300 && size >= 40;
      });
      headings.forEach(function (heading) {
        var headingX = Number.parseFloat(heading.getAttribute('x'));
        var headingY = Number.parseFloat(heading.getAttribute('y'));
        texts.filter(function (element) {
          if (element === heading || !element.isConnected || !eligibleZone(element)) return false;
          var x = Number.parseFloat(element.getAttribute('x'));
          var y = Number.parseFloat(element.getAttribute('y'));
          var size = Number.parseFloat(global.getComputedStyle(element).fontSize);
          return Number.isFinite(x) && Number.isFinite(y) && Number.isFinite(size) &&
            Math.abs(x - headingX) <= 30 && y > headingY && y <= headingY + 80 &&
            size >= 14 && size <= 28;
        }).forEach(function (subtitle) {
          subtitle.remove();
          removed += 1;
        });
        heading.remove();
        removed += 1;
      });
    }

    var previous = Number.parseInt(root.dataset.portraitRemovedPageHeadingNodes || '0', 10) || 0;
    root.dataset.portraitRemovedPageHeadingNodes = String(previous + removed);
    root.dataset.portraitPageHeadingContract = 'furniture-only';
    return removed;
  }

  function measurePortraitSafeArea(stage) {
    var target = stage || document.querySelector('.stage');
    if (!target) return null;
    var stageRect = target.getBoundingClientRect();
    var scaleX = stageRect.width / STAGE_WIDTH || 1;
    var scaleY = stageRect.height / STAGE_HEIGHT || scaleX;
    var doc = target.querySelector('.doc.tl');
    if (!doc) return null;
    var docRect = portraitLocalRect(doc.getBoundingClientRect(), stageRect, scaleX, scaleY);
    var caption = target.querySelector('.caption');
    /* 无文案页也从 portrait-frame.css 读取同一个槽位，避免 CSS 与运行时各存一套 y。 */
    var captionTop = Number.parseFloat(
      global.getComputedStyle(target).getPropertyValue(PORTRAIT_CAPTION_TOP_PROPERTY)
    );
    if (!Number.isFinite(captionTop)) return null;
    if (caption && caption.textContent.trim()) {
      captionTop = portraitLocalRect(caption.getBoundingClientRect(), stageRect, scaleX, scaleY).top;
    }
    var safe = {
      left: docRect.left,
      top: docRect.bottom,
      right: STAGE_WIDTH - docRect.left,
      bottom: captionTop
    };
    safe.width = safe.right - safe.left;
    safe.height = safe.bottom - safe.top;
    safe.centerX = (safe.left + safe.right) / 2;
    safe.centerY = (safe.top + safe.bottom) / 2;
    var nodes = portraitContentNodes(target);
    var rects = nodes.map(function (node) {
      if (node instanceof global.SVGSVGElement) {
        return portraitSvgInkRect(node, stageRect, scaleX, scaleY);
      }
      return portraitLocalRect(node.getBoundingClientRect(), stageRect, scaleX, scaleY);
    }).filter(Boolean);
    return { safe: safe, content: portraitUnion(rects), nodes: nodes };
  }

  function normalizePortraitSafeArea(stage) {
    var root = document.documentElement;
    if (root.dataset.runtime !== 'wise-ppt-specimen') return null;
    var target = stage || document.querySelector('.stage');
    if (!target) return null;
    stripUnauthorizedPortraitPageHeadings(target);
    var nodes = portraitContentNodes(target);
    nodes.forEach(function (node) { node.style.translate = ''; });
    target.getBoundingClientRect();
    var measured = measurePortraitSafeArea(target);
    if (!measured || !measured.content) {
      root.dataset.portraitSafeAreaReady = 'false';
      return measured;
    }
    var safe = measured.safe;
    var content = measured.content;
    var dx = safe.centerX - content.centerX;
    var dy = safe.centerY - content.centerY;
    measured.nodes.forEach(function (node) {
      node.style.translate = dx + 'px ' + dy + 'px';
    });
    var finalContent = {
      left: content.left + dx,
      top: content.top + dy,
      right: content.right + dx,
      bottom: content.bottom + dy,
      width: content.width,
      height: content.height,
      centerX: content.centerX + dx,
      centerY: content.centerY + dy
    };
    var epsilon = .75;
    var contained = finalContent.left >= safe.left - epsilon &&
      finalContent.top >= safe.top - epsilon &&
      finalContent.right <= safe.right + epsilon &&
      finalContent.bottom <= safe.bottom + epsilon;
    root.dataset.portraitSafeAreaReady = 'true';
    root.dataset.portraitSafeAreaContained = String(contained);
    root.dataset.portraitSafeLeft = safe.left.toFixed(2);
    root.dataset.portraitSafeTop = safe.top.toFixed(2);
    root.dataset.portraitSafeRight = safe.right.toFixed(2);
    root.dataset.portraitSafeBottom = safe.bottom.toFixed(2);
    root.dataset.portraitSafeDx = dx.toFixed(2);
    root.dataset.portraitSafeDy = dy.toFixed(2);
    return { safe: safe, content: finalContent, dx: dx, dy: dy, contained: contained };
  }

  function embeddingRuntime() {
    /* Gallery 加载器显式声明宿主，避免 file:// iframe 读取 parent.document。
       现代浏览器会把相邻本地文件也视作不同的不透明安全源。 */
    var declaredHost = new URLSearchParams(global.location.search).get('wise-ppt-embed');
    if (declaredHost === 'gallery') return 'wise-ppt-gallery';
    if (global.parent === global) return '';
    if (global.location.protocol === 'file:') return '';
    try { return global.parent.document.documentElement.dataset.runtime || ''; }
    catch (error) { return ''; }
  }

  function fitDeck(deckStage, options) {
    if (!deckStage) throw new Error('fitDeck 需要 #deck-stage');
    if (document.documentElement.dataset.runtime !== 'wise-ppt-deck') {
      throw new Error('fitDeck 只允许 wise-ppt-deck runtime');
    }
    ensurePaperNoiseFilter();
    var bounds = viewportBounds();
    var host = deckStage.closest('#deck');
    var allowUpscale = Boolean(options && options.allowUpscale);
    var scale = scaleFor(bounds.width, bounds.height, allowUpscale);
    if (host) {
      host.style.setProperty('--wise-viewport-left', bounds.left + 'px');
      host.style.setProperty('--wise-viewport-top', bounds.top + 'px');
      host.style.setProperty('--wise-viewport-width', bounds.width + 'px');
      host.style.setProperty('--wise-viewport-height', bounds.height + 'px');
    }
    deckStage.style.transform = 'scale(' + scale + ')';
    deckStage.style.transformOrigin = 'center center';
    document.documentElement.dataset.stageFitOwner = 'deck-runtime';
    return { bounds: bounds, scale: scale, rect: deckStage.getBoundingClientRect() };
  }

  function fitGallery(stagebox, viewport, frameLine) {
    if (!stagebox || !viewport) throw new Error('fitGallery 需要 #stagebox 与 #viewport');
    if (document.documentElement.dataset.runtime !== 'wise-ppt-gallery') {
      throw new Error('fitGallery 只允许 wise-ppt-gallery runtime');
    }
    var availableWidth = Math.max(1, viewport.clientWidth - 140);
    var availableHeight = Math.max(1, viewport.clientHeight - 60);
    var scale = scaleFor(availableWidth, availableHeight, false);
    var width = STAGE_WIDTH * scale;
    var height = STAGE_HEIGHT * scale;
    var left = (viewport.clientWidth - width) / 2;
    var top = (viewport.clientHeight - height) / 2;
    stagebox.style.transform = 'translate(' + left + 'px,' + top + 'px) scale(' + scale + ')';
    stagebox.style.transformOrigin = 'top left';
    if (frameLine) {
      frameLine.style.left = (left - 1) + 'px';
      frameLine.style.top = (top - 1) + 'px';
      frameLine.style.width = (width + 2) + 'px';
      frameLine.style.height = (height + 2) + 'px';
    }
    document.documentElement.dataset.stageFitOwner = 'gallery-runtime';
    return { scale: scale, left: left, top: top, width: width, height: height };
  }

  function fitSpecimen(stage) {
    var root = document.documentElement;
    var hostRuntime = embeddingRuntime();
    if (root.dataset.runtime === 'wise-ppt-deck' || hostRuntime === 'wise-ppt-deck') {
      root.dataset.specimenFit = 'noop-in-deck';
      root.dataset.stageFitOwner = 'deck-runtime';
      return null;
    }
    if (hostRuntime === 'wise-ppt-gallery') {
      root.dataset.specimenFit = 'noop-in-gallery';
      root.dataset.stageFitOwner = 'gallery-runtime';
      return null;
    }
    if (root.dataset.runtime !== 'wise-ppt-specimen') {
      throw new Error('fitSpecimen 只允许 wise-ppt-specimen runtime');
    }
    var target = stage || document.querySelector('.stage');
    if (!target) throw new Error('独立样张缺少 .stage');
    var bounds = viewportBounds();
    var scale = scaleFor(bounds.width, bounds.height, false);
    target.style.transform = 'scale(' + scale + ')';
    target.style.transformOrigin = 'center center';
    root.dataset.stageFitOwner = 'specimen-runtime';
    return { bounds: bounds, scale: scale, rect: target.getBoundingClientRect() };
  }

  function bindSpecimenEmphasis(root) {
    var ref = root.dataset.sampleFocusRef;
    var profile = root.dataset.sampleFocusProfile;
    if (root.dataset.runtime !== 'wise-ppt-specimen') return;
    if (profile === 'none') {
      document.body.removeAttribute('data-emphasis-mode');
      root.dataset.sampleFocusBound = '0';
      return;
    }
    if (!ref) return;
    var slide = document.body;
    var members = [];
    try {
      var declared = JSON.parse(root.dataset.sampleFocusMembers || '[]');
      declared.forEach(function (member) {
        document.querySelectorAll(member.selector).forEach(function (target) {
          members.push({ target: target, role: member.role, paint: member.paint || '' });
        });
      });
    } catch (error) {
      root.dataset.sampleFocusBound = 'invalid-members';
      return;
    }
    if (!members.length) {
      root.dataset.sampleFocusBound = 'missing';
      return;
    }
    slide.dataset.emphasisMode = 'semantic-focus';
    members.forEach(function (member) {
      var target = member.target;
      target.removeAttribute('data-typography-emphasis-size');
      target.dataset.contentRef = ref;
      target.dataset.emphasisRole = member.role;
      if (member.paint) target.dataset.emphasisPaint = member.paint;
      else target.removeAttribute('data-emphasis-paint');
      if (root.classList.contains('accent')) target.dataset.emphasisActive = 'true';
      else target.removeAttribute('data-emphasis-active');
      var shapeTags = ['PATH', 'LINE', 'POLYLINE', 'POLYGON', 'CIRCLE', 'ELLIPSE', 'RECT', 'USE'];
      var minimum = Number.parseFloat(getComputedStyle(root).getPropertyValue('--wp-private-typography-large-emphasis-min'));
      var fontSize = Number.parseFloat(getComputedStyle(target).fontSize);
      var excluded = target.closest('code, pre, .mono, [data-text-kind="number"], [data-text-kind="meta"], [data-text-kind="source"], [data-text-kind="furniture"], [data-text-kind="label"]');
      if (!shapeTags.includes(target.tagName) && !excluded && Number.isFinite(minimum) && minimum > 0 && Number.isFinite(fontSize) && fontSize >= minimum) {
        target.dataset.typographyEmphasisSize = 'large';
      }
    });
    root.dataset.sampleFocusBound = String(members.length);
  }

  function bindGalleryKeyBridge(root) {
    if (global.parent === global || embeddingRuntime() !== 'wise-ppt-gallery') return false;
    if (root.dataset.galleryKeyBridgeBound === 'true') return true;
    root.dataset.galleryKeyBridgeBound = 'true';
    document.addEventListener('keydown', function (event) {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
      if (event.key !== 'Escape' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      var target = event.target;
      var tagName = target && target.tagName ? target.tagName.toUpperCase() : '';
      if (target && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(tagName))) return;
      event.preventDefault();
      global.parent.postMessage({ type: GALLERY_KEY_MESSAGE, key: event.key }, '*');
    });
    return true;
  }

  function bindGalleryActivityBridge(root) {
    if (global.parent === global || embeddingRuntime() !== 'wise-ppt-gallery') return false;
    if (root.dataset.galleryActivityBridgeBound === 'true') return true;
    root.dataset.galleryActivityBridgeBound = 'true';
    var lastPointerActivityAt = 0;
    function postActivity(kind) {
      var now = global.performance && typeof global.performance.now === 'function'
        ? global.performance.now()
        : Date.now();
      if (kind === 'pointermove' && now - lastPointerActivityAt < 80) return;
      if (kind === 'pointermove') lastPointerActivityAt = now;
      global.parent.postMessage({ type: GALLERY_ACTIVITY_MESSAGE, kind: kind }, '*');
    }
    document.addEventListener('pointermove', function () { postActivity('pointermove'); }, {passive:true});
    document.addEventListener('pointerdown', function () { postActivity('pointerdown'); }, {passive:true});
    document.addEventListener('wheel', function () { postActivity('wheel'); }, {passive:true});
    document.addEventListener('keydown', function () { postActivity('keydown'); });
    return true;
  }

  function applySpecimenTheme(root) {
    if (root.dataset.runtime !== 'wise-ppt-specimen') return;
    var params = new URLSearchParams(global.location.search);
    var requested = params.get('theme');
    if (GALLERY_THEMES.indexOf(requested) >= 0) root.dataset.themeId = requested;
  }

  function applySpecimenTypography(root) {
    if (root.dataset.runtime !== 'wise-ppt-specimen') return;
    var requested = new URLSearchParams(global.location.search).get('typography');
    if (requested) root.dataset.typographyMode = requested;
  }

  /* 竖版家具三件套与 16:9 同一语义合同：左上两行页眉 = top-left-kicker，
     左下页脚 = bottom-left-folio，底部结论 = bottom-takeaway。
     Catalog 明确请求字体档时补齐角色标记，字体与字重完全交给主题包决定。 */
  function bindSpecimenThemeTypeRoles(root) {
    if (root.dataset.runtime !== 'wise-ppt-specimen') return;
    if (!new URLSearchParams(global.location.search).get('typography')) return;
    var stage = document.querySelector('.stage');
    if (!stage) return;
    var roleBySelector = [
      ['.doc.tl', 'top-left-kicker'],
      ['.folio', 'bottom-left-folio'],
      ['.caption', 'bottom-takeaway']
    ];
    roleBySelector.forEach(function (pair) {
      stage.querySelectorAll(pair[0]).forEach(function (container) {
        [container].concat(Array.prototype.slice.call(container.querySelectorAll('*')))
          .forEach(function (node) {
            if (!node.hasAttribute('data-theme-type-role')) {
              node.dataset.themeTypeRole = pair[1];
            }
          });
      });
    });
  }

  function galleryFontFaces(mode, themeId) {
    var brandRegular = themeId === 'hermes-orange' || themeId === 'klein-blue';
    var brandSans = brandRegular
      ? ['400', 'Han Sans Catalog', '纸墨正文']
      : ['300', 'Han Sans Catalog Light', '纸墨正文'];
    var mono = [
      ['400', 'Courier Prime Catalog', 'AI ENGINEERING'],
      ['700', 'Courier Prime Catalog', 'FIG. 02']
    ];
    if (mode === 'all-serif') {
      return [
        ['500', 'Han Serif Catalog', '纸墨正文'],
        ['700', 'Han Serif Catalog', '纸墨标题']
      ].concat(mono);
    }
    if (mode === 'mixed') {
      var mixed = [
        brandSans,
        ['500', 'Han Serif Catalog', '纸墨正文'],
        ['700', 'Han Serif Catalog', '纸墨标题']
      ].concat(mono);
      if (themeId === 'hermes-orange' || themeId === 'klein-blue') mixed.push(['700', 'Oswald', 'WISE PPT']);
      return mixed;
    }
    return [
      brandSans
    ].concat(mono);
  }

  function preloadGalleryFonts(mode, themeId) {
    if (!document.fonts || typeof document.fonts.load !== 'function') return Promise.resolve();
    var requests = galleryFontFaces(mode, themeId).map(function (face) {
      return document.fonts.load(face[0] + ' 96px "' + face[1] + '"', face[2]);
    });
    return Promise.allSettled(requests).then(function () {});
  }

  /* 品牌投影页的 HTML 预先声明 recipe id；Catalog 握手会核对配方真实跑完。
     竖版投影全部由生成器产出（recipe-generated），没有 custom-redraw 分支，
     完成态与 16:9 runtime/stage-fit.js 同构，便于两侧门禁共用一套断言。 */
  function recipeCompletionState(root) {
    var recipeId = root.dataset.xpRecipeId || '';
    var marker = root.dataset.xpRecipeReady || '';
    var status = root.dataset.xpRecipeStatus || '';
    var customFrame = root.dataset.xpFrameKind === 'custom-redraw';
    var surfaceReady = root.dataset.catalogSurfaceReady === 'true';
    var generatedReady = !customFrame && marker === 'true' &&
      (status === 'recipe-ready' || status === 'user-correction-specified');
    var customReady = marker === 'custom' && (status === 'recipe-ready' || status === 'approved');
    return {
      required: Boolean(recipeId),
      complete: Boolean(recipeId) && surfaceReady && (generatedReady || customReady),
      marker: marker,
      status: status,
      surfaceReady: surfaceReady
    };
  }

  function postGalleryState(root, requestId, status, reason) {
    if (global.parent === global || embeddingRuntime() !== 'wise-ppt-gallery') return;
    var recipe = recipeCompletionState(root);
    global.parent.postMessage({
      type: FRAME_STATE_READY_MESSAGE,
      protocol: FRAME_PROTOCOL,
      requestId: requestId,
      status: status,
      themeId: root.dataset.themeId || '',
      typographyMode: root.dataset.typographyMode || '',
      defaultColorProfile: root.dataset.defaultColorProfile || 'standard',
      emphasisTarget: root.dataset.emphasisTarget || '',
      emphasisProfile: root.dataset.emphasisProfile || 'standard',
      recipeId: root.dataset.xpRecipeId || '',
      recipeStatus: root.dataset.xpRecipeStatus || '',
      recipeReady: root.dataset.xpRecipeReady || '',
      recipeComplete: recipe.complete,
      surfaceReady: root.dataset.catalogSurfaceReady || '',
      reason: reason || ''
    }, '*');
  }

  function registerGalleryStateRenderer(renderer) {
    if (typeof renderer !== 'function') throw new Error('Catalog 状态重绘器必须是函数');
    galleryStateRenderers.push(renderer);
    return function () {
      var index = galleryStateRenderers.indexOf(renderer);
      if (index >= 0) galleryStateRenderers.splice(index, 1);
    };
  }

  function bindGalleryStateBridge(root) {
    if (global.parent === global || embeddingRuntime() !== 'wise-ppt-gallery') return false;
    if (root.dataset.galleryStateBridgeBound === 'true') return true;
    root.dataset.galleryStateBridgeBound = 'true';
    global.addEventListener('message', function (event) {
      if (event.source !== global.parent) return;
      var data = event.data;
      if (!data || data.type !== FRAME_STATE_MESSAGE || data.protocol !== FRAME_PROTOCOL || !data.requestId) return;
      var themeId = GALLERY_THEMES.indexOf(data.themeId) >= 0 ? data.themeId : root.dataset.themeId;
      var typography = GALLERY_TYPOGRAPHY_MODES.indexOf(data.typographyMode) >= 0 ? data.typographyMode : root.dataset.typographyMode;
      var defaultColorProfile = data.defaultColorProfile === 'legacy' ? 'legacy' : 'standard';
      var emphasisTarget = typeof data.emphasisTarget === 'string' ? data.emphasisTarget : '';
      var emphasisProfile = data.emphasisProfile === 'legacy' ? 'legacy' : 'standard';
      var themeChanged = themeId !== root.dataset.themeId;
      var typographyChanged = typography !== root.dataset.typographyMode;
      var defaultColorChanged = defaultColorProfile !== (root.dataset.defaultColorProfile || 'standard');
      var emphasisChanged = emphasisTarget !== (root.dataset.emphasisTarget || '') ||
        emphasisProfile !== (root.dataset.emphasisProfile || 'standard');
      /* Canvas/ECharts 把 token 颜色固化进像素，焦点页也可能在构建 SVG 时分支。
         没有显式注册重绘器时由父层只重载这一页，普通 CSS/SVG 页继续原地切换。 */
      if ((document.querySelector('canvas') && (themeChanged || typographyChanged)) ||
          ((defaultColorChanged || emphasisChanged) && !galleryStateRenderers.length)) {
        postGalleryState(root, data.requestId, 'reload-required');
        return;
      }
      var serial = ++galleryStateSerial;
      root.dataset.galleryStatePending = data.requestId;
      /* 缓存页若已经是目标字体档，不再触发隐藏 Document 的 FontFaceSet；
         这条路径应当是纯搬运 + 两帧确认。 */
      var fontsReady = (themeChanged || typographyChanged) ? preloadGalleryFonts(typography, themeId) : Promise.resolve();
      fontsReady.then(function () {
        if (serial !== galleryStateSerial) return;
        root.dataset.themeId = themeId;
        root.dataset.typographyMode = typography;
        root.dataset.defaultColorProfile = defaultColorProfile;
        root.dataset.emphasisTarget = emphasisTarget;
        root.dataset.emphasisProfile = emphasisProfile;
        root.classList.toggle('accent', Boolean(emphasisTarget));
        bindSpecimenThemeTypeRoles(root);
        bindSpecimenEmphasis(root);
        var detail = {themeId:themeId, typographyMode:typography, defaultColorProfile:defaultColorProfile, emphasisTarget:emphasisTarget, emphasisProfile:emphasisProfile};
        document.dispatchEvent(new CustomEvent('wise-ppt:gallery-state-change', {detail:detail}));
        return Promise.allSettled(galleryStateRenderers.map(function (renderer) { return renderer(detail); }));
      }).then(function () {
        if (serial !== galleryStateSerial) return;
        global.requestAnimationFrame(function () {
          global.requestAnimationFrame(function () {
            if (serial !== galleryStateSerial) return;
            normalizePortraitSafeArea();
            root.getBoundingClientRect();
            delete root.dataset.galleryStatePending;
            root.dataset.galleryStateReady = data.requestId;
            postGalleryState(root, data.requestId, 'ready');
          });
        });
      }).catch(function (error) {
        if (serial !== galleryStateSerial) return;
        delete root.dataset.galleryStatePending;
        postGalleryState(root, data.requestId, 'fail', error && error.message ? error.message : String(error));
      });
    });
    return true;
  }

  /* 静态冻结:参考样张默认把全部动画压到零时长(终态)。
     样张静止态就是标称几何 —— 直开、Catalog、缩略图与审计默认都静止；
     只有显式 ?motion=1 才允许播放演示动效。 */
  function applySpecimenStaticFreeze(root) {
    if (root.dataset.runtime !== 'wise-ppt-specimen') return;
    var params = new URLSearchParams(global.location.search);
    var style = document.getElementById('wise-ppt-specimen-static-freeze');
    if (params.get('motion') === '1') {
      if (style) style.remove();
      root.dataset.specimenStatic = 'false';
      return;
    }
    if (style) {
      root.dataset.specimenStatic = 'true';
      return;
    }
    style = document.createElement('style');
    style.id = 'wise-ppt-specimen-static-freeze';
    style.textContent = '*,*::before,*::after{animation-duration:0s!important;animation-delay:0s!important;animation-iteration-count:1!important;transition:none!important}';
    document.head.appendChild(style);
    root.dataset.specimenStatic = 'true';
  }

  function markRootRenderReady(root) {
    if (root.dataset.renderReady === 'true' || root.dataset.renderReadyScheduled === 'true') return;
    root.dataset.renderReadyScheduled = 'true';
    var fonts = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    var images = Array.prototype.map.call(document.images || [], function (img) {
      if (img.complete) return Promise.resolve();
      return new Promise(function (resolve) {
        img.addEventListener('load', resolve, {once:true});
        img.addEventListener('error', resolve, {once:true});
      });
    });
    var done = false;
    function finish() {
      if (done) return;
      done = true;
      global.requestAnimationFrame(function () {
        global.requestAnimationFrame(function () {
          normalizePortraitSafeArea();
          root.getBoundingClientRect();
          root.dataset.renderReady = 'true';
          delete root.dataset.renderReadyScheduled;
        });
      });
    }
    Promise.all([fonts].concat(images)).then(finish, finish);
    setTimeout(finish, 3000);
  }

  function postSpecimenStatus(root, status, reason) {
    if (root.dataset.runtime !== 'wise-ppt-specimen' || embeddingRuntime() !== 'wise-ppt-gallery') return false;
    var nonce = new URLSearchParams(global.location.search).get('wise-ppt-frame-nonce');
    if (!nonce || root.dataset.frameStatusPosted === status) return false;
    /* 品牌投影页在 HTML 上预先声明 recipe id。它们必须等 surface renderer
       真正完成后再回报 ready，避免“页面 ready、recipe 没运行”的拆分假绿灯。 */
    var recipe = recipeCompletionState(root);
    if (status === 'ready' && recipe.required && !recipe.complete) return false;
    global.parent.postMessage({
      type: FRAME_READY_MESSAGE,
      protocol: FRAME_PROTOCOL,
      status: status,
      nonce: nonce,
      pageId: root.dataset.pageId || '',
      frameWidth: STAGE_WIDTH,
      frameHeight: STAGE_HEIGHT,
      specimenFit: root.dataset.specimenFit || '',
      scaleOwner: root.dataset.stageFitOwner || '',
      specimenStatic: root.dataset.specimenStatic || '',
      recipeId: root.dataset.xpRecipeId || '',
      recipeStatus: root.dataset.xpRecipeStatus || '',
      recipeReady: root.dataset.xpRecipeReady || '',
      recipeComplete: recipe.complete,
      surfaceReady: root.dataset.catalogSurfaceReady || '',
      reason: reason || ''
    }, '*');
    root.dataset.frameStatusPosted = status;
    return true;
  }

  function bindSpecimenReadiness(root) {
    if (root.dataset.runtime !== 'wise-ppt-specimen') return;
    root.dataset.frameWidth = String(STAGE_WIDTH);
    root.dataset.frameHeight = String(STAGE_HEIGHT);
    root.dataset.renderProtocol = FRAME_PROTOCOL;
    if (root.dataset.frameReadyBridgeBound === 'true') return;
    root.dataset.frameReadyBridgeBound = 'true';
    var observer = new MutationObserver(function () {
      if (root.dataset.renderReady === 'true') postSpecimenStatus(root, 'ready');
    });
    /* 投影页的 surface renderer 会在页面 ready 之后才落 recipe 标记，
       marker/status/surface 任一翻转都要重试握手，与 16:9 同一观察集。 */
    observer.observe(root, {attributes:true, attributeFilter:[
      'data-render-ready',
      'data-catalog-surface-ready',
      'data-xp-recipe-ready',
      'data-xp-recipe-status'
    ]});
    global.addEventListener('error', function (event) {
      postSpecimenStatus(root, 'fail', event.message || 'frame error');
    });
    global.addEventListener('unhandledrejection', function (event) {
      var reason = event.reason && event.reason.message ? event.reason.message : String(event.reason || 'unhandled rejection');
      postSpecimenStatus(root, 'fail', reason);
    });
    if (root.dataset.renderReady === 'true') postSpecimenStatus(root, 'ready');
  }

  function stageFit() {
    var root = document.documentElement;
    ensurePaperNoiseFilter();
    applySpecimenTheme(root);
    applySpecimenTypography(root);
    applySpecimenStaticFreeze(root);
    bindSpecimenReadiness(root);
    bindGalleryStateBridge(root);
    bindSpecimenThemeTypeRoles(root);
    bindSpecimenEmphasis(root);
    bindGalleryKeyBridge(root);
    bindGalleryActivityBridge(root);
    normalizePortraitSafeArea();
    if (root.dataset.runtime === 'wise-ppt-deck') {
      root.dataset.specimenFit = 'noop-in-deck';
      return null;
    }
    if (root.dataset.runtime === 'wise-ppt-gallery') {
      return fitGallery(
        document.getElementById('stagebox'),
        document.getElementById('viewport'),
        document.getElementById('frame-line')
      );
    }
    var result = fitSpecimen();
    if (root.dataset.specimenFitBound !== 'true') {
      root.dataset.specimenFitBound = 'true';
      global.addEventListener('resize', stageFit);
      if (global.visualViewport) {
        global.visualViewport.addEventListener('resize', stageFit);
        global.visualViewport.addEventListener('scroll', stageFit);
      }
    }
    if (root.dataset.renderPending !== 'true' && typeof global.markRenderReady === 'function') {
      global.markRenderReady();
    } else if (root.dataset.renderPending !== 'true') {
      markRootRenderReady(root);
    }
    return result;
  }

  global.WisePPTStageFit = {
    width: STAGE_WIDTH,
    height: STAGE_HEIGHT,
    frameProtocol: FRAME_PROTOCOL,
    frameReadyMessage: FRAME_READY_MESSAGE,
    frameStateMessage: FRAME_STATE_MESSAGE,
    frameStateReadyMessage: FRAME_STATE_READY_MESSAGE,
    viewportBounds: viewportBounds,
    contains: contains,
    measurePortraitSafeArea: measurePortraitSafeArea,
    normalizePortraitSafeArea: normalizePortraitSafeArea,
    stripUnauthorizedPortraitPageHeadings: stripUnauthorizedPortraitPageHeadings,
    embeddingRuntime: embeddingRuntime,
    fitDeck: fitDeck,
    fitGallery: fitGallery,
    fitSpecimen: fitSpecimen,
    applySpecimenTheme: applySpecimenTheme,
    applySpecimenTypography: applySpecimenTypography,
    applySpecimenStaticFreeze: applySpecimenStaticFreeze,
    registerGalleryStateRenderer: registerGalleryStateRenderer,
    bindGalleryStateBridge: bindGalleryStateBridge,
    bindSpecimenReadiness: bindSpecimenReadiness,
    bindSpecimenEmphasis: bindSpecimenEmphasis,
    bindGalleryKeyBridge: bindGalleryKeyBridge,
    bindGalleryActivityBridge: bindGalleryActivityBridge,
    ensurePaperNoiseFilter: ensurePaperNoiseFilter
  };
  global.stageFit = stageFit;
})(window);
