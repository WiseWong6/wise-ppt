(function exposePaperInkAtlasCompatibility(root) {
  'use strict';

  let api = root && root.WisePPTThemeAdapters
    ? root.WisePPTThemeAdapters['paper-ink.atlas']
    : null;
  if (!api && typeof module === 'object' && module.exports) {
    api = require('../../themes/paper-ink/adapters/atlas.js');
  }
  if (!api) throw new Error('paper-ink.atlas adapter must load before the Gallery compatibility shim');
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.WisePaperInkAtlasAdapter = api;
})(typeof window !== 'undefined' ? window : globalThis);
