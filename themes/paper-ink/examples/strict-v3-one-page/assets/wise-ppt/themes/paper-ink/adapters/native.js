(function initPaperInkNativeAdapter(root, factory) {
  const adapterIds = Object.freeze([
    'paper-ink.native-components',
    'paper-ink.typography',
    'paper-ink.table',
    'paper-ink.image',
    'paper-ink.native-html',
    'paper-ink.svg',
    'paper-ink.canvas'
  ]);
  const api = factory(adapterIds);
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) {
    const registry = root.WisePPTThemeAdapters || (root.WisePPTThemeAdapters = {});
    adapterIds.forEach((adapterId) => { registry[adapterId] = api; });
  }
})(typeof window !== 'undefined' ? window : globalThis, function createPaperInkNativeAdapter(adapterIds) {
  'use strict';

  function identity(source) {
    return String(source || '');
  }

  return Object.freeze({
    adapterId: 'paper-ink.native-components',
    adapterIds,
    themeId: 'paper-ink',
    target: 'native-component',
    themeCss: '',
    adaptCss: identity,
    adaptMarkup: identity,
    adaptHtml: identity
  });
});
