(function () {
  var params = new URLSearchParams(window.location.search);
  var requested = params.get('preset');
  var root = document.documentElement;
  if (requested) root.dataset.themePreset = requested;

  /* 空槽蓝图是结构 Catalog 的正式预览页，也必须走与 Deck 样张相同的 ready / 键盘桥。
     只在 Catalog iframe 中按需加载，保持直接打开蓝图时原有的固定 1920×1080 行为。 */
  if (params.get('wise-ppt-embed') === 'gallery') {
    root.dataset.runtime = 'wise-ppt-specimen';
    var runtime = document.createElement('script');
    runtime.src = '../../runtime/stage-fit.js';
    runtime.onload = function () {
      var start = function () { window.stageFit(); };
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start, { once: true });
      } else {
        start();
      }
    };
    document.head.appendChild(runtime);
  }
})();
