(function (global) {
  'use strict';

  // Canvas size is declared per deck (data-canvas-width/height on <html>);
  // 16:9 decks declare nothing and keep the 1920×1080 default.
  var declaredWidth = Number(document.documentElement.dataset.canvasWidth);
  var declaredHeight = Number(document.documentElement.dataset.canvasHeight);
  var STAGE_WIDTH = declaredWidth > 0 ? declaredWidth : 1920;
  var STAGE_HEIGHT = declaredHeight > 0 ? declaredHeight : 1080;
  var GALLERY_KEY_MESSAGE = 'wise-ppt-gallery-key';
  var GALLERY_ACTIVITY_MESSAGE = 'wise-ppt-gallery-activity';
  var FRAME_READY_MESSAGE = 'wise-ppt-frame-ready';
  var FRAME_STATE_MESSAGE = 'wise-ppt-frame-state';
  var FRAME_STATE_READY_MESSAGE = 'wise-ppt-frame-state-ready';
  var FRAME_PROTOCOL = 'wise-ppt-frame/v1';
  var PAPER_NOISE_DEFS_ID = 'wise-ppt-paper-noise-defs';
  var PAPER_NOISE_FILTER_ID = 'wise-ppt-paper-noise';
  var FOCUS_TREATMENTS = [
    'focus.color',
    'focus.reverse-text',
    'focus.text',
    'focus.outline-depth',
    'focus.solid-reverse',
    'focus.ink-weight',
    'focus.hard-shadow',
    'focus.shadow-only',
    'focus.texture',
    'focus.path-depth',
    'focus.contrast-isolation'
  ];
  var stateSerial = 0;

  function isSourceCatalog(root) {
    return root.dataset.layoutSource === 'gallery' && root.hasAttribute('data-emphasis-targets') &&
      !root.hasAttribute('data-layout-visual-plan');
  }

  function bootstrapSpecimen() {
    var root = document.documentElement;
    if (!root || root.dataset.runtime !== 'wise-ppt-specimen') return;
    var params = new URLSearchParams(global.location.search);
    var emphasisTarget = params.get('emphasis') || '';
    root.dataset.emphasisTarget = emphasisTarget;
    // Source pages draw their default geometry first. Applying accent before
    // their drawing script runs can bake focus colors into permanent attributes.
    root.classList.toggle('accent', Boolean(emphasisTarget) && !isSourceCatalog(root));
    if (params.get('wise-ppt-embed') === 'gallery') root.dataset.wiseCatalogFonts = 'true';
  }

  bootstrapSpecimen();

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
    var declaredHost = new URLSearchParams(global.location.search).get('wise-ppt-embed');
    if (declaredHost === 'gallery') return 'wise-ppt-gallery';
    if (global.parent === global) return '';
    if (global.location.protocol === 'file:') return '';
    try { return global.parent.document.documentElement.dataset.runtime || ''; }
    catch (_error) { return ''; }
  }

  function fitDeck(deckStage, options) {
    if (!deckStage) throw new Error('fitDeck 需要 #deck-stage');
    if (document.documentElement.dataset.runtime !== 'wise-ppt-deck') {
      throw new Error('fitDeck 只允许 wise-ppt-deck runtime');
    }
    ensurePaperNoiseFilter();
    var bounds = viewportBounds();
    var host = deckStage.closest('#deck');
    var scale = scaleFor(bounds.width, bounds.height, Boolean(options && options.allowUpscale));
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

  function restoreProjectedEmphasis() {
    document.querySelectorAll('[data-theme-emphasis-runtime-applied="true"]').forEach(function (target) {
      ['content-ref', 'emphasis-role', 'emphasis-treatment', 'emphasis-paint', 'emphasis-active'].forEach(function (name) {
        var originalName = 'data-theme-emphasis-original-' + name;
        var original = target.getAttribute(originalName);
        if (original === '__missing__') target.removeAttribute('data-' + name);
        else if (original !== null) target.setAttribute('data-' + name, original);
        target.removeAttribute(originalName);
      });
      target.removeAttribute('data-theme-emphasis-runtime-applied');
      target.removeAttribute('data-sample-focus-applied');
    });
  }

  function projectedMemberships() {
    var carriers = Array.prototype.slice.call(
      document.querySelectorAll('[data-theme-emphasis-members]')
    );
    var targets = new Set();
    var records = [];
    carriers.forEach(function (carrier) {
      var memberships;
      try { memberships = JSON.parse(carrier.dataset.themeEmphasisMembers || '[]'); }
      catch (_error) { throw new Error('data-theme-emphasis-members 不是合法 JSON'); }
      if (!Array.isArray(memberships) || !memberships.length) {
        throw new Error('data-theme-emphasis-members 必须是非空数组');
      }
      memberships.forEach(function (membership) {
        if (!membership || typeof membership.target_id !== 'string' || !membership.target_id ||
          typeof membership.role !== 'string' || !membership.role ||
          FOCUS_TREATMENTS.indexOf(membership.treatment) < 0 ||
          (membership.paint !== undefined && membership.paint !== 'fill' && membership.paint !== 'stroke')) {
          throw new Error('data-theme-emphasis-members 条目不符合共享视觉 plan');
        }
        targets.add(membership.target_id);
        records.push({ carrier: carrier, membership: membership });
      });
    });
    return { carriers: carriers, targets: targets, records: records };
  }

  function sourceMemberships(root, requestedTarget) {
    var targets = JSON.parse(root.dataset.emphasisTargets);
    if (!Array.isArray(targets)) throw new Error('Catalog 强调对象名单必须是数组');
    var selected = targets.filter(function (target) { return target.target_id === requestedTarget; });
    if (selected.length !== 1) throw new Error('未登记或重复的强调目标: ' + requestedTarget);
    var members = selected[0].members;
    if (!Array.isArray(members) || !members.length) throw new Error('Catalog 强调目标缺少成员');
    var stage = document.querySelector('.stage');
    if (!stage) throw new Error('Catalog 缺少 stage');
    var textMap = JSON.parse(root.dataset.vnextSemanticKeyMap || '[]');
    var records = [];
    var seen = new Set();
    members.forEach(function (member) {
      if (!member || typeof member.selector !== 'string' || !member.selector ||
        typeof member.role !== 'string' || !member.role ||
        FOCUS_TREATMENTS.indexOf(member.treatment) < 0 ||
        !Number.isInteger(member.expected_count) || member.expected_count < 1 ||
        (member.paint !== undefined && member.paint !== 'fill' && member.paint !== 'stroke')) {
        throw new Error('Catalog 强调成员声明无效');
      }
      // The source already owns the exact text-to-key map. Add only the anchors
      // requested by its selectors; never guess a replacement node or treatment.
      var keyPattern = /\[data-vnext-text-key="([^"]+)"\]/g;
      var match;
      while ((match = keyPattern.exec(member.selector))) {
        if (stage.querySelector(match[0])) continue;
        var key = match[1];
        var entries = textMap.filter(function (entry) { return entry.key === key; });
        if (entries.length !== 1) throw new Error('Catalog 缺少唯一文字锚点: ' + key);
        var entry = entries[0];
        var normalize = function (text) { return String(text).replace(/\s+/g, ' ').trim(); };
        var candidates = Array.prototype.filter.call(stage.querySelectorAll(entry.tag), function (node) {
          return normalize(node.textContent) === normalize(entry.text);
        });
        var node = candidates[entry.occurrence];
        if (!node || (node.dataset.vnextTextKey && node.dataset.vnextTextKey !== key)) {
          throw new Error('Catalog 文字锚点不匹配: ' + key);
        }
        node.dataset.vnextTextKey = key;
      }
      var carriers = stage.querySelectorAll(member.selector);
      if (carriers.length !== member.expected_count) {
        throw new Error('Catalog 强调成员数量不符: ' + member.selector + ' expected=' + member.expected_count + ' actual=' + carriers.length);
      }
      Array.prototype.forEach.call(carriers, function (carrier) {
        if (seen.has(carrier)) throw new Error('Catalog 强调成员重复命中: ' + member.selector);
        seen.add(carrier);
        records.push({ carrier: carrier, membership: Object.assign({}, member, { target_id: requestedTarget }) });
      });
    });
    return { carriers: Array.from(seen), targets: new Set([requestedTarget]), records: records };
  }

  function bindSpecimenEmphasis(root) {
    if (root.dataset.runtime !== 'wise-ppt-specimen') return false;
    restoreProjectedEmphasis();
    var requestedTarget = root.dataset.emphasisTarget || '';
    root.classList.toggle('accent', Boolean(requestedTarget));
    var projected = projectedMemberships();
    if (!requestedTarget) {
      document.body.removeAttribute('data-emphasis-mode');
      root.dataset.sampleFocusBound = '0';
      delete root.dataset.sampleFocusRef;
      return true;
    }
    if (!projected.carriers.length && isSourceCatalog(root)) {
      projected = sourceMemberships(root, requestedTarget);
    }
    if (!projected.carriers.length) {
      throw new Error('当前 frame 缺少编译期强调投影');
    }
    if (!projected.targets.has(requestedTarget)) {
      throw new Error('未登记强调目标: ' + requestedTarget);
    }
    var matched = projected.records.filter(function (record) {
      return record.membership.target_id === requestedTarget;
    });
    if (!matched.length) throw new Error('强调目标没有投影载体: ' + requestedTarget);
    var ref = 'sample.' + (root.dataset.pageId || 'page') + '.' + requestedTarget;
    document.body.dataset.emphasisMode = 'semantic-focus';
    matched.forEach(function (record) {
      var target = record.carrier;
      var membership = record.membership;
      ['content-ref', 'emphasis-role', 'emphasis-treatment', 'emphasis-paint', 'emphasis-active'].forEach(function (name) {
        var originalName = 'data-theme-emphasis-original-' + name;
        var current = target.getAttribute('data-' + name);
        target.setAttribute(originalName, current === null ? '__missing__' : current);
      });
      target.dataset.contentRef = ref;
      target.dataset.emphasisRole = membership.role;
      target.dataset.emphasisTreatment = membership.treatment;
      if (membership.paint) target.dataset.emphasisPaint = membership.paint;
      else target.removeAttribute('data-emphasis-paint');
      target.dataset.emphasisActive = 'true';
      target.dataset.themeEmphasisRuntimeApplied = 'true';
      target.dataset.sampleFocusApplied = 'true';
    });
    root.dataset.sampleFocusRef = ref;
    root.dataset.sampleFocusBound = String(matched.length);
    return true;
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
    document.addEventListener('pointermove', function () { postActivity('pointermove'); }, { passive: true });
    document.addEventListener('pointerdown', function () { postActivity('pointerdown'); }, { passive: true });
    document.addEventListener('wheel', function () { postActivity('wheel'); }, { passive: true });
    document.addEventListener('keydown', function () { postActivity('keydown'); });
    return true;
  }

  function frameState(root) {
    return {
      emphasisTarget: root.dataset.emphasisTarget || '',
      frameId: root.dataset.catalogFrameId || '',
      layoutVisualPlan: root.dataset.layoutVisualPlan || '',
      frameReady: root.dataset.catalogFrameReady === 'true'
    };
  }

  function postGalleryState(root, requestId, status, reason) {
    if (global.parent === global || embeddingRuntime() !== 'wise-ppt-gallery') return;
    var state = frameState(root);
    global.parent.postMessage({
      type: FRAME_STATE_READY_MESSAGE,
      protocol: FRAME_PROTOCOL,
      requestId: requestId,
      status: status,
      emphasisTarget: state.emphasisTarget,
      frameId: state.frameId,
      layoutVisualPlan: state.layoutVisualPlan,
      frameReady: state.frameReady,
      reason: reason || ''
    }, '*');
  }

  function bindGalleryStateBridge(root) {
    if (global.parent === global || embeddingRuntime() !== 'wise-ppt-gallery') return false;
    if (root.dataset.galleryStateBridgeBound === 'true') return true;
    root.dataset.galleryStateBridgeBound = 'true';
    global.addEventListener('message', function (event) {
      if (event.source !== global.parent) return;
      var data = event.data;
      if (!data || data.type !== FRAME_STATE_MESSAGE || data.protocol !== FRAME_PROTOCOL || !data.requestId) return;
      var serial = ++stateSerial;
      try {
        var emphasisTarget = typeof data.emphasisTarget === 'string' ? data.emphasisTarget : '';
        root.dataset.emphasisTarget = emphasisTarget;
        root.classList.toggle('accent', Boolean(emphasisTarget));
        bindSpecimenEmphasis(root);
        document.dispatchEvent(new CustomEvent('wise-ppt:gallery-state-change', {
          detail: { emphasisTarget: emphasisTarget }
        }));
        global.requestAnimationFrame(function () {
          global.requestAnimationFrame(function () {
            if (serial !== stateSerial) return;
            root.getBoundingClientRect();
            postGalleryState(root, data.requestId, 'ready');
          });
        });
      } catch (error) {
        postGalleryState(root, data.requestId, 'fail', error && error.message ? error.message : String(error));
      }
    });
    return true;
  }

  function applySpecimenStaticFreeze(root) {
    if (root.dataset.runtime !== 'wise-ppt-specimen') return;
    var style = document.getElementById('wise-ppt-specimen-static-freeze');
    if (new URLSearchParams(global.location.search).get('motion') === '1') {
      if (style) style.remove();
      root.dataset.specimenStatic = 'false';
      return;
    }
    if (!style) {
      style = document.createElement('style');
      style.id = 'wise-ppt-specimen-static-freeze';
      style.textContent = '*,*::before,*::after{animation-duration:0s!important;animation-delay:0s!important;animation-iteration-count:1!important;transition:none!important}';
      document.head.appendChild(style);
    }
    root.dataset.specimenStatic = 'true';
  }

  function markRootRenderReady(root) {
    if (root.dataset.renderReady === 'true' || root.dataset.renderReadyScheduled === 'true') return;
    root.dataset.renderReadyScheduled = 'true';
    var fonts = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    var images = Array.prototype.map.call(document.images || [], function (image) {
      if (image.complete) return Promise.resolve();
      return new Promise(function (resolve) {
        image.addEventListener('load', resolve, { once: true });
        image.addEventListener('error', resolve, { once: true });
      });
    });
    var finished = false;
    function finish() {
      if (finished) return;
      finished = true;
      global.requestAnimationFrame(function () {
        global.requestAnimationFrame(function () {
          root.getBoundingClientRect();
          root.dataset.catalogFrameReady = 'true';
          root.dataset.renderReady = 'true';
          delete root.dataset.renderReadyScheduled;
        });
      });
    }
    Promise.all([fonts].concat(images)).then(finish, finish);
    global.setTimeout(finish, 3000);
  }

  function postSpecimenStatus(root, status, reason) {
    if (root.dataset.runtime !== 'wise-ppt-specimen' || embeddingRuntime() !== 'wise-ppt-gallery') return false;
    var nonce = new URLSearchParams(global.location.search).get('wise-ppt-frame-nonce');
    if (!nonce || root.dataset.frameStatusPosted === status) return false;
    var state = frameState(root);
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
      emphasisTarget: state.emphasisTarget,
      frameId: state.frameId,
      layoutVisualPlan: state.layoutVisualPlan,
      frameReady: state.frameReady,
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
    function finishSourceFrame() {
      if (!isSourceCatalog(root) || root.dataset.renderReady !== 'true' || root.dataset.catalogFrameReady === 'true') return;
      try {
        bindSpecimenEmphasis(root);
        root.dataset.catalogFrameReady = 'true';
      } catch (error) {
        root.dataset.catalogFrameError = error.message;
        postSpecimenStatus(root, 'fail', error.message);
      }
    }
    var observer = new MutationObserver(function () {
      finishSourceFrame();
      if (root.dataset.renderReady === 'true' && root.dataset.catalogFrameReady === 'true') {
        postSpecimenStatus(root, 'ready');
      }
    });
    observer.observe(root, {
      attributes: true,
      attributeFilter: ['data-render-ready', 'data-catalog-frame-ready']
    });
    finishSourceFrame();
    global.addEventListener('error', function (event) {
      postSpecimenStatus(root, 'fail', event.message || 'frame error');
    });
    global.addEventListener('unhandledrejection', function (event) {
      var reason = event.reason && event.reason.message
        ? event.reason.message
        : String(event.reason || 'unhandled rejection');
      postSpecimenStatus(root, 'fail', reason);
    });
    if (root.dataset.renderReady === 'true' && root.dataset.catalogFrameReady === 'true') {
      postSpecimenStatus(root, 'ready');
    }
  }

  function bindSpecimenResize(root) {
    if (root.dataset.specimenFitBound === 'true') return;
    root.dataset.specimenFitBound = 'true';
    var resize = function () { fitSpecimen(); };
    global.addEventListener('resize', resize);
    if (global.visualViewport) {
      global.visualViewport.addEventListener('resize', resize);
      global.visualViewport.addEventListener('scroll', resize);
    }
  }

  function stageFit() {
    var root = document.documentElement;
    ensurePaperNoiseFilter();
    if (root.dataset.runtime === 'wise-ppt-gallery') {
      return fitGallery(
        document.getElementById('stagebox'),
        document.getElementById('viewport'),
        document.getElementById('frame-line')
      );
    }
    if (root.dataset.runtime === 'wise-ppt-deck') {
      root.dataset.specimenFit = 'noop-in-deck';
      return null;
    }
    applySpecimenStaticFreeze(root);
    bindSpecimenReadiness(root);
    bindGalleryStateBridge(root);
    if (!isSourceCatalog(root) || root.dataset.renderPending !== 'true') bindSpecimenEmphasis(root);
    bindGalleryKeyBridge(root);
    bindGalleryActivityBridge(root);
    var result = fitSpecimen();
    bindSpecimenResize(root);
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
    focusTreatments: FOCUS_TREATMENTS.slice(),
    viewportBounds: viewportBounds,
    contains: contains,
    embeddingRuntime: embeddingRuntime,
    fitDeck: fitDeck,
    fitGallery: fitGallery,
    fitSpecimen: fitSpecimen,
    bindGalleryStateBridge: bindGalleryStateBridge,
    bindSpecimenReadiness: bindSpecimenReadiness,
    bindSpecimenEmphasis: bindSpecimenEmphasis,
    bindGalleryKeyBridge: bindGalleryKeyBridge,
    bindGalleryActivityBridge: bindGalleryActivityBridge,
    applySpecimenStaticFreeze: applySpecimenStaticFreeze,
    ensurePaperNoiseFilter: ensurePaperNoiseFilter
  };
  global.stageFit = stageFit;
})(window);
