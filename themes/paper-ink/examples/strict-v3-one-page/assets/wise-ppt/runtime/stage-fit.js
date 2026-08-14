(function (global) {
  'use strict';

  var STAGE_WIDTH = 1920;
  var STAGE_HEIGHT = 1080;

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
      return null;
    }
    if (hostRuntime === 'wise-ppt-gallery') {
      root.dataset.specimenFit = 'noop-in-gallery';
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

  function stageFit() {
    var root = document.documentElement;
    if (new URLSearchParams(global.location.search).has('accent')) root.classList.add('accent');
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
    }
    return result;
  }

  global.WisePPTStageFit = {
    width: STAGE_WIDTH,
    height: STAGE_HEIGHT,
    viewportBounds: viewportBounds,
    contains: contains,
    embeddingRuntime: embeddingRuntime,
    fitDeck: fitDeck,
    fitGallery: fitGallery,
    fitSpecimen: fitSpecimen
  };
  global.stageFit = stageFit;
})(window);
