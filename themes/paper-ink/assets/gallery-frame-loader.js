(function (global) {
  'use strict';

  function createFrame(container, name) {
    var frame = document.createElement('iframe');
    frame.className = 'gallery-frame';
    frame.title = name;
    /* 样张仅用于视觉预览；移出 Tab 顺序，键盘导航统一留在 Gallery 壳。 */
    frame.tabIndex = -1;
    frame.setAttribute('aria-hidden', 'true');
    container.appendChild(frame);
    return frame;
  }

  function withGalleryContext(src) {
    if (src.indexOf('wise-ppt-embed=gallery') >= 0) return src;
    return src + (src.indexOf('?') >= 0 ? '&' : '?') + 'wise-ppt-embed=gallery';
  }

  function waitForRenderProtocol(doc) {
    if (doc.documentElement.dataset.renderReady === 'true') return Promise.resolve();
    return new Promise(function (resolve) {
      /* 不把 iframe realm 的 Node 交给父 realm 的 MutationObserver；部分浏览器
         会因此抛类型错误。只读轮询保留原有“就绪或 3.5 秒超时放行”语义。 */
      var deadline = Date.now() + 3500;
      function check() {
        if (doc.documentElement.dataset.renderReady === 'true' || Date.now() >= deadline) {
          resolve();
          return;
        }
        setTimeout(check, 50);
      }
      check();
    });
  }

  function createGalleryFrameLoader(container) {
    if (!container) throw new Error('gallery frame container is required');

    var visibleFrame = createFrame(container, '当前版式预览');
    var loadingFrame = createFrame(container, '下一版式预览');
    var navigationId = 0;
    /* 加载锁：同一时刻只允许一条 load 流水线在跑。
       busy 时新进来的 src 暂存到 pendingSrc，reveal 完成后只消费最后一次，
       从根上消除"连点 → token 失效 → 页码与画面不同步"的竞态。 */
    var state = 'idle';       /* 'idle' | 'loading' */
    var pendingSrc = null;    /* 加载窗口内最新一次被吞的请求 */
    var readyCallbacks = [];

    visibleFrame.classList.add('is-visible');
    visibleFrame.removeAttribute('aria-hidden');
    container.dataset.previewState = 'idle';

    function fireReady() {
      var cbs = readyCallbacks.slice();
      for (var i = 0; i < cbs.length; i++) {
        try { cbs[i](); } catch (e) { /* 单个回调异常不影响后续 */ }
      }
    }

    function consumePending() {
      if (pendingSrc === null) return;
      var next = pendingSrc;
      pendingSrc = null;
      load(next);
    }

    function reveal(frame, token) {
      if (token !== navigationId || frame !== loadingFrame) return;

      visibleFrame.classList.remove('is-visible');
      visibleFrame.setAttribute('aria-hidden', 'true');
      frame.classList.add('is-visible');
      frame.removeAttribute('aria-hidden');

      var previousFrame = visibleFrame;
      visibleFrame = frame;
      loadingFrame = previousFrame;
      state = 'idle';
      container.dataset.previewState = 'ready';
      fireReady();
      /* reveal 完成 → 若连点期间攒下了更新目标，立即接力加载 */
      consumePending();
    }

    function awaitFrame(frame, token) {
      /* 现代浏览器通常把每个 file:// 文档视为独立不透明安全源。
         load 已保证样张文档与本地资源完成加载；此处直接双 rAF reveal，
         不探测 contentDocument，避免 Unsafe attempt 控制台警告。 */
      if (global.location.protocol === 'file:') {
        requestAnimationFrame(function () {
          requestAnimationFrame(function () { reveal(frame, token); });
        });
        return;
      }

      var doc;
      try {
        doc = frame.contentDocument;
      } catch (error) {
        reveal(frame, token);
        return;
      }
      if (!doc || !doc.documentElement) {
        reveal(frame, token);
        return;
      }

      var fontsReady = doc.fonts && doc.fonts.ready
        ? doc.fonts.ready.catch(function () {})
        : Promise.resolve();

      Promise.all([fontsReady, waitForRenderProtocol(doc)]).then(function () {
        requestAnimationFrame(function () {
          requestAnimationFrame(function () { reveal(frame, token); });
        });
      });
    }

    function load(src) {
      /* 加载锁：忙时只记最后一次意图，不 ++token、不覆盖 onload，
         保证 reveal 守卫始终能匹配到当前流水线。 */
      if (state === 'loading') {
        pendingSrc = src;
        return;
      }
      state = 'loading';
      var token = ++navigationId;
      container.dataset.previewState = 'loading';
      /* addEventListener + token 守卫：避免属性赋值在连点时互相覆盖丢失回调 */
      var onLoad = function () {
        if (token !== navigationId) return;
        awaitFrame(loadingFrame, token);
      };
      loadingFrame.addEventListener('load', onLoad, { once: true });
      loadingFrame.src = withGalleryContext(src);
    }

    function isBusy() { return state === 'loading'; }

    function onReady(cb) {
      if (typeof cb === 'function') readyCallbacks.push(cb);
    }

    return { load: load, isBusy: isBusy, onReady: onReady };
  }

  global.createGalleryFrameLoader = createGalleryFrameLoader;
})(window);
