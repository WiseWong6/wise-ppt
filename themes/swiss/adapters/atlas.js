(function initSwissAtlasAdapter(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) {
    const registry = root.WisePPTThemeAdapters || (root.WisePPTThemeAdapters = {});
    registry[api.adapterId] = api;
  }
})(typeof window !== 'undefined' ? window : globalThis, function createSwissAtlasAdapter() {
  'use strict';

  function identity(source) {
    return String(source || '');
  }

  const COMPONENT_OVERRIDES = `
    /* 韦恩图：vendored 2px 圆线过粗，瑞士发丝线收敛为 1px */
    .swiss-card .venn .v-circle,
    .swiss-card .venn-three .circle {
      border-width: 1px !important;
    }
    .swiss-card .layout-grid.two-col p,
    .swiss-card .before-after--verification p,
    .swiss-card .arch-platform .ap-flat,
    .swiss-card .arch-platform .ap-flat *,
    .swiss-card .arch-platform .ap-grid-wrap,
    .swiss-card .arch-platform .ap-grid-wrap *,
    .swiss-card .arch-complex-v .av-content,
    .swiss-card .arch-complex-v .av-content * {
      font-family: var(--wp-font-sans) !important;
      font-weight: 300 !important;
    }`;

  return Object.freeze({
    adapterId: 'swiss.atlas',
    themeId: 'swiss',
    target: 'atlas-package',
    themeCss: '',
    TOKEN_CSS: '',
    COMPONENT_OVERRIDES,
    adaptCss: identity,
    adaptMarkup: identity,
    adaptHtml: identity
  });
});
