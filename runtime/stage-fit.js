(function (global) {
  'use strict';

  var STAGE_WIDTH = 1920;
  var STAGE_HEIGHT = 1080;
  var GALLERY_KEY_MESSAGE = 'wise-ppt-gallery-key';
  var GALLERY_ACTIVITY_MESSAGE = 'wise-ppt-gallery-activity';
  var FRAME_READY_MESSAGE = 'wise-ppt-frame-ready';
  var FRAME_STATE_MESSAGE = 'wise-ppt-frame-state';
  var FRAME_STATE_READY_MESSAGE = 'wise-ppt-frame-state-ready';
  var FRAME_PROTOCOL = 'wise-ppt-frame/v1';
  var PAPER_NOISE_DEFS_ID = 'wise-ppt-paper-noise-defs';
  var PAPER_NOISE_FILTER_ID = 'wise-ppt-paper-noise';
  var GALLERY_THEMES = ['paper-ink', 'hermes-orange', 'klein-blue'];
  var GALLERY_TYPOGRAPHY_MODES = ['all-sans', 'all-serif', 'mixed'];
  var galleryStateSerial = 0;
  var galleryStateRenderers = [];

  /* 该脚本在参考 frame 的首个主题 CSS 之前加载。Catalog 嵌入态先写入目标
     配色/字体属性，避免 CSS 短暂采用默认纸墨色；生产直开与 deck 不启用子集字体。 */
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
    if (params.get('wise-ppt-embed') !== 'gallery') return;
    root.dataset.wiseCatalogFonts = 'true';
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

  /* Catalog 原始 frame 与生产 seed 共用语义合同，但 data-vnext-text-key 只存在于
     seed。构建脚本把合同实际使用的键投影成 tag + 文案 + 同名序位指纹；这里在
     页面业务脚本完成绘制后把键重新绑定到真实节点。它不是选择器特例，也不按
     主题分叉：三套主题与 standard 始终消费同一 target/member 合同。 */
  function bindSpecimenSemanticKeys(root) {
    if (root.dataset.runtime !== 'wise-ppt-specimen') return true;
    var raw = root.dataset.vnextSemanticKeyMap;
    if (!raw) return true;
    var descriptors;
    try { descriptors = JSON.parse(raw); }
    catch (error) {
      root.dataset.vnextSemanticKeysReady = 'false';
      root.dataset.vnextSemanticKeyError = 'invalid-map';
      return false;
    }
    if (!Array.isArray(descriptors)) {
      root.dataset.vnextSemanticKeysReady = 'false';
      root.dataset.vnextSemanticKeyError = 'invalid-map';
      return false;
    }
    var stage = document.querySelector('.stage');
    if (!stage) return false;
    var normalize = function (value) { return String(value || '').replace(/\s+/g, ' ').trim(); };
    var missing = [];
    descriptors.forEach(function (descriptor, index) {
      if (!descriptor || typeof descriptor.key !== 'string'
        || !/^[a-z][a-z0-9-]*$/i.test(descriptor.tag)
        || typeof descriptor.text !== 'string'
        || !Number.isInteger(descriptor.occurrence) || descriptor.occurrence < 0) {
        missing.push('invalid:' + index);
        return;
      }
      var existing = Array.prototype.filter.call(
        stage.querySelectorAll('[data-vnext-text-key]'),
        function (node) { return node.dataset.vnextTextKey === descriptor.key; }
      );
      if (existing.length === 1) return;
      if (existing.length > 1) {
        missing.push('duplicate:' + descriptor.key);
        return;
      }
      var candidates = Array.prototype.filter.call(
        stage.querySelectorAll(descriptor.tag),
        function (node) { return normalize(node.textContent) === descriptor.text; }
      );
      var target = candidates[descriptor.occurrence];
      if (!target || (target.dataset.vnextTextKey && target.dataset.vnextTextKey !== descriptor.key)) {
        missing.push(descriptor.key);
        return;
      }
      target.dataset.vnextTextKey = descriptor.key;
      target.dataset.vnextSemanticKeySource = 'seed-fingerprint-v1';
    });
    root.dataset.vnextSemanticKeyBound = String(descriptors.length - missing.length);
    root.dataset.vnextSemanticKeyExpected = String(descriptors.length);
    if (missing.length) {
      root.dataset.vnextSemanticKeysReady = 'false';
      root.dataset.vnextSemanticKeyError = missing.join(',');
      return false;
    }
    var becameReady = root.dataset.vnextSemanticKeysReady !== 'true';
    root.dataset.vnextSemanticKeysReady = 'true';
    delete root.dataset.vnextSemanticKeyError;
    if (becameReady) document.dispatchEvent(new CustomEvent('wise-ppt:semantic-keys-ready'));
    return true;
  }

  function prepareSpecimenSemanticKeys(root) {
    if (bindSpecimenSemanticKeys(root) || root.dataset.vnextSemanticKeyObserver === 'true') return;
    var stage = document.querySelector('.stage');
    if (!stage || !global.MutationObserver) return;
    root.dataset.vnextSemanticKeyObserver = 'true';
    var observer = new MutationObserver(function () {
      if (!bindSpecimenSemanticKeys(root)) return;
      observer.disconnect();
      delete root.dataset.vnextSemanticKeyObserver;
      if (root.dataset.emphasisTarget) bindSpecimenEmphasis(root);
    });
    observer.observe(stage, { childList: true, subtree: true });
  }

  function bindSpecimenEmphasis(root) {
    var requestedTarget = root.dataset.emphasisTarget || '';
    var emphasisProfile = root.dataset.emphasisProfile === 'legacy' ? 'legacy' : 'standard';
    var legacy = emphasisProfile === 'legacy';
    var ref = legacy ? root.dataset.catalogLegacyEmphasisRef : root.dataset.sampleFocusRef;
    var profile = legacy ? root.dataset.catalogLegacyEmphasisProfile : root.dataset.sampleFocusProfile;
    var declaredTargets = [];
    if (root.dataset.runtime !== 'wise-ppt-specimen') return;
    if (!legacy && !bindSpecimenSemanticKeys(root)) {
      root.dataset.sampleFocusBound = 'semantic-keys-pending';
      if (requestedTarget) throw new Error('强调目标的运行时语义键尚未完整绑定');
      return;
    }
    document.querySelectorAll('[data-sample-focus-applied="true"]').forEach(function (target) {
      ['data-content-ref', 'data-emphasis-role', 'data-emphasis-treatment', 'data-emphasis-paint', 'data-emphasis-active', 'data-typography-emphasis-size', 'data-sample-focus-applied'].forEach(function (name) {
        target.removeAttribute(name);
      });
    });
    document.querySelectorAll('[data-xp-focus-foreground="true"]').forEach(function (target) {
      ['data-xp-focus-foreground', 'data-xp-focus-foreground-neutral', 'data-xp-focus-foreground-active'].forEach(function (name) {
        target.removeAttribute(name);
      });
    });
    if (legacy) {
      try {
        var foregroundMembers = JSON.parse(root.dataset.catalogLegacyEmphasisForegroundMembers || '[]');
        if (!Array.isArray(foregroundMembers)) throw new Error('invalid legacy foreground members');
        foregroundMembers.forEach(function (member) {
          if (!member || typeof member.selector !== 'string' || !member.selector) throw new Error('invalid legacy foreground member');
          var targets = document.querySelectorAll(member.selector);
          if (!targets.length || (Number.isInteger(member.expected_count) && targets.length !== member.expected_count)) {
            throw new Error('legacy foreground selector mismatch');
          }
          targets.forEach(function (target) {
            target.dataset.xpFocusForeground = 'true';
            if (member.neutral_tone) target.dataset.xpFocusForegroundNeutral = member.neutral_tone;
            if (member.active_tone) target.dataset.xpFocusForegroundActive = member.active_tone;
          });
        });
      } catch (error) {
        root.dataset.sampleFocusBound = 'invalid-foreground-members';
        return;
      }
    }
    if (legacy) {
      if (!requestedTarget || profile === 'none') {
        document.body.removeAttribute('data-emphasis-mode');
        root.dataset.sampleFocusBound = '0';
        return;
      }
      if (!ref) {
        root.dataset.sampleFocusBound = 'missing';
        return;
      }
    } else {
      try {
        declaredTargets = JSON.parse(root.dataset.emphasisTargets || '[]');
      } catch (error) {
        root.dataset.sampleFocusBound = 'invalid-targets';
        return;
      }
      if (declaredTargets.length) {
        var selected = declaredTargets.find(function (item) { return item.target_id === requestedTarget; });
        if (!selected) {
          document.body.removeAttribute('data-emphasis-mode');
          root.dataset.sampleFocusBound = requestedTarget ? 'invalid-target' : '0';
          if (requestedTarget) throw new Error('未登记强调目标: ' + requestedTarget);
          return;
        }
        profile = 'registered-target';
        ref = 'sample.' + (root.dataset.pageId || 'page') + '.' + selected.target_id;
        root.dataset.sampleFocusMembers = JSON.stringify(selected.members || []);
        root.dataset.sampleFocusRef = ref;
      }
      if (!requestedTarget || profile === 'none') {
        document.body.removeAttribute('data-emphasis-mode');
        root.dataset.sampleFocusBound = '0';
        return;
      }
      if (!ref) return;
    }
    var slide = document.body;
    var members = [];
    try {
      var declared = JSON.parse(legacy
        ? (root.dataset.catalogLegacyEmphasisMembers || '[]')
        : (root.dataset.sampleFocusMembers || '[]'));
      declared.forEach(function (member) {
        if (legacy) {
          if (!member || typeof member.selector !== 'string' || !member.selector || typeof member.role !== 'string' || !member.role) {
            throw new Error('invalid legacy emphasis member');
          }
          var legacyTargets = document.querySelectorAll(member.selector);
          if (!legacyTargets.length || (Number.isInteger(member.expected_count) && legacyTargets.length !== member.expected_count)) {
            throw new Error('legacy emphasis selector mismatch');
          }
          legacyTargets.forEach(function (target) {
            members.push({ target: target, role: member.role, treatment: '', paint: member.paint || '' });
          });
          return;
        }
        var treatments = [
          'focus.color', 'focus.reverse-text', 'focus.text', 'focus.outline-depth', 'focus.solid-reverse',
          'focus.ink-weight', 'focus.hard-shadow', 'focus.texture', 'focus.path-depth',
          'focus.contrast-isolation'
        ];
        if (!member || treatments.indexOf(member.treatment) < 0 || !Number.isInteger(member.expected_count) || member.expected_count < 1) throw new Error('invalid emphasis member');
        var targets = document.querySelectorAll(member.selector);
        if (targets.length !== member.expected_count) throw new Error('emphasis exact-count mismatch');
        targets.forEach(function (target) {
          members.push({ target: target, role: member.role, treatment: member.treatment, paint: member.paint || '' });
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
      if (member.treatment) target.dataset.emphasisTreatment = member.treatment;
      else target.removeAttribute('data-emphasis-treatment');
      target.dataset.sampleFocusApplied = 'true';
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

  /* 生产编译器会给底部总结写入 bottom-takeaway；历史 Catalog frame 只有
     .caption / takeaway 结构标记。Catalog 明确请求字体档时补齐同一语义合同，
     字体与字重完全交给主题包决定；静态 seed 生成仍保留原始生产骨架。 */
  function bindSpecimenThemeTypeRoles(root) {
    if (root.dataset.runtime !== 'wise-ppt-specimen') return;
    if (!new URLSearchParams(global.location.search).get('typography')) return;
    var stage = document.querySelector('.stage');
    if (!stage) return;
    stage.querySelectorAll('.caption, [data-template-part="takeaway"]').forEach(function (container) {
      [container].concat(Array.prototype.slice.call(container.querySelectorAll('*')))
        .forEach(function (node) {
          if (!node.hasAttribute('data-theme-type-role')) {
            node.dataset.themeTypeRole = 'bottom-takeaway';
          }
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

  /* recipe renderer 与手调母版保留各自的原始标记，但统一投影成一个布尔完成态。
     recipe-generated: true + recipe-ready/user-correction-specified
     custom-redraw: custom + recipe-ready/approved
     user-correction-specified 代表页面已按反馈生成、仍待用户验收，不应阻断
     Catalog 的清晰实时预览。Catalog 只消费 complete；raw marker/status 继续用于诊断与审计。 */
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
        bindSpecimenEmphasis(root);
        var detail = {themeId:themeId, typographyMode:typography, defaultColorProfile:defaultColorProfile, emphasisTarget:emphasisTarget, emphasisProfile:emphasisProfile};
        document.dispatchEvent(new CustomEvent('wise-ppt:gallery-state-change', {detail:detail}));
        return Promise.allSettled(galleryStateRenderers.map(function (renderer) { return renderer(detail); }));
      }).then(function () {
        if (serial !== galleryStateSerial) return;
        global.requestAnimationFrame(function () {
          global.requestAnimationFrame(function () {
            if (serial !== galleryStateSerial) return;
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
    /* 主题投影页在 HTML 上预先声明 recipe id。它们必须等 recipe renderer
       真正完成后再回报 ready，避免“页面 ready、recipe 没运行”的拆分假绿灯。 */
    var recipe = recipeCompletionState(root);
    if (status === 'ready' && recipe.required && !recipe.complete) {
      return false;
    }
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
    observer.observe(root, {
      attributes:true,
      /* custom-redraw 会在共享 surface renderer 之后把 recipe marker 从
         true 切换为 custom。approved 母版只有这一步完成后才算 ready，
         因此 recipe marker/status 也必须触发握手，不能只观察 surface。 */
      attributeFilter:[
        'data-render-ready',
        'data-catalog-surface-ready',
        'data-xp-recipe-ready',
        'data-xp-recipe-status'
      ]
    });
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
    bindSpecimenThemeTypeRoles(root);
    applySpecimenStaticFreeze(root);
    bindSpecimenReadiness(root);
    bindGalleryStateBridge(root);
    prepareSpecimenSemanticKeys(root);
    var emphasisParams = new URLSearchParams(global.location.search);
    var initialDefaultColorProfile = emphasisParams.get('default-color-profile') === 'legacy' ? 'legacy' : 'standard';
    var initialEmphasisTarget = emphasisParams.get('emphasis') || '';
    var initialEmphasisProfile = emphasisParams.get('emphasis-profile') === 'legacy' ? 'legacy' : 'standard';
    root.dataset.defaultColorProfile = initialDefaultColorProfile;
    root.dataset.emphasisTarget = initialEmphasisTarget;
    root.dataset.emphasisProfile = initialEmphasisProfile;
    root.classList.toggle('accent', Boolean(initialEmphasisTarget));
    bindSpecimenEmphasis(root);
    bindGalleryKeyBridge(root);
    bindGalleryActivityBridge(root);
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
    embeddingRuntime: embeddingRuntime,
    fitDeck: fitDeck,
    fitGallery: fitGallery,
    fitSpecimen: fitSpecimen,
    applySpecimenTheme: applySpecimenTheme,
    applySpecimenTypography: applySpecimenTypography,
    bindSpecimenThemeTypeRoles: bindSpecimenThemeTypeRoles,
    bindSpecimenSemanticKeys: bindSpecimenSemanticKeys,
    applySpecimenStaticFreeze: applySpecimenStaticFreeze,
    recipeCompletionState: recipeCompletionState,
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
