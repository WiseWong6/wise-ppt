(function initSwissNativeAdapter(root, factory) {
  const adapterIds = Object.freeze([
    'swiss.native-components',
    'swiss.typography',
    'swiss.table',
    'swiss.image',
    'swiss.native-html',
    'swiss.svg',
    'swiss.canvas'
  ]);
  const api = factory(adapterIds);
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) {
    const registry = root.WisePPTThemeAdapters || (root.WisePPTThemeAdapters = {});
    adapterIds.forEach((adapterId) => { registry[adapterId] = api; });
  }
})(typeof window !== 'undefined' ? window : globalThis, function createSwissNativeAdapter(adapterIds) {
  'use strict';

  function identity(source) {
    return String(source || '');
  }

  return Object.freeze({
    adapterId: 'swiss.native-components',
    adapterIds,
    themeId: 'swiss',
    target: 'native-component',
    themeCss: '',
    adaptCss: identity,
    adaptMarkup: identity,
    adaptHtml: identity
  });
});
