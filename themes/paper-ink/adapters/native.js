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

  const MONO_RE = /(?:\bpre\b|\bcode\b|\.mono\b|[-_](?:number|index|metric|value|year|date|id|code|count)\b)/i;
  const BRUSH_RE = /(?:\.brush\b|\.kai\b|handwrit|annotation)/i;
  const SVG_SMALL_KIND_RE = /(?:label|meta|caption|axis|tick|legend|tag|badge|kicker|eyebrow|note|source|index|number|year|date|code|mono|micro|annotation)/i;

  function fontSizeToken(selector, value) {
    // v4 keeps the master's authored size. Semantic resizing is applied only
    // through behavior_contract.type_roles, never inferred from a number.
    void selector;
    return value;
  }

  function fontToken(selector, value) {
    const source = String(value);
    if (/(?:pi-brush|wp-adapter-pi-font-brush|WenKai|Xingkai|cursive)/i.test(source)) return 'var(--brush)';
    if (/(?:pi-mono|wp-adapter-pi-font-mono|Courier|Menlo|Monaco|monospace)/i.test(source)) return 'var(--mono)';
    if (/(?:pi-sans|wp-adapter-pi-font-sans|Han Sans|PingFang|sans-serif)/i.test(source)) return 'var(--sans)';
    if (/(?:pi-serif|wp-adapter-pi-font-serif|Han Serif|Songti|serif)/i.test(source)) return 'var(--serif)';
    if (BRUSH_RE.test(selector)) return 'var(--brush)';
    if (MONO_RE.test(selector)) return 'var(--mono)';
    return 'var(--sans)';
  }

  function transformDeclarations(selector, body) {
    return String(body).replace(/(^|;)\s*(font-family|font-size)\s*:\s*([^;{}]+)(?=;|$)/gi,
      (match, prefix, property, value) => {
        const next = property.toLowerCase() === 'font-family'
          ? fontToken(selector, value)
          : fontSizeToken(selector, value);
        return `${prefix}\n  ${property}: ${next}`;
      });
  }

  function adaptCss(source) {
    return String(source || '').replace(/([^{}]+)\{([^{}]*)\}/g,
      (match, selector, body) => `${selector}{${transformDeclarations(selector.trim(), body)}}`);
  }

  // 原生件的显式 SVG 小字属于 Catalog 工程标注，可带来源标记；没有字号的
  // 未知 text/tspan 不再自动猜成 label。普通成品手写 data-text-kind 不能免责。
  function tagSvgTextKinds(source) {
    return String(source || '').replace(/<((?:tspan|text))\b([^>]*)>/gi, (tagSource, tagName, attributes) => {
      if (/\bdata-text-kind=/.test(attributes)) {
        if (/\bdata-catalog-text-kind=/.test(attributes)) return tagSource;
        return `<${tagName}${attributes} data-catalog-text-kind="true">`;
      }
      const sizeMatch = attributes.match(/\bfont-size=(['"]?)([0-9.]+)\1/i);
      const tokenMatch = attributes.match(/\bfont-size=(['"])var\(--type-(meta|label|micro-secondary)\)\1/i);
      if (!tokenMatch && sizeMatch && Number.parseFloat(sizeMatch[2]) >= 18) return tagSource;
      if (!tokenMatch && /\bfont-size=(['"])var\(--type-(?:body-small|body|subheading|emphasis|heading|metric|title|hero|display|particle-sample|display-mark)\)\1/i.test(attributes)) {
        return tagSource;
      }
      if (!tokenMatch && !sizeMatch) return tagSource;
      if (!tokenMatch && !SVG_SMALL_KIND_RE.test(attributes)) return tagSource;
      const kind = tokenMatch && tokenMatch[2] === 'meta' ? 'meta' : 'label';
      return `<${tagName}${attributes} data-text-kind="${kind}" data-catalog-text-kind="true">`;
    });
  }

  function adaptMarkup(source) {
    const normalized = String(source || '').replace(/<([a-z][\w:-]*)([^>]*)>/gi, (tagSource, tagName, attributes) => {
      const className = attributes.match(/\bclass=(['"])(.*?)\1/i)?.[2] || '';
      const kind = attributes.match(/\bdata-text-kind=(['"])(.*?)\1/i)?.[2] || '';
      const field = attributes.match(/\bdata-field=(['"])(.*?)\1/i)?.[2] || '';
      const selector = `${tagName}.${className.trim().replace(/\s+/g, '.')}.${kind}.${field}`;
      let next = attributes.replace(/\bstyle=(['"])(.*?)\1/gi,
        (styleSource, quote, declarations) => `style=${quote}${transformDeclarations(selector, declarations)}${quote}`);
      next = next.replace(/\bfont-family=(['"])(.*?)\1/gi,
        (attrSource, quote, value) => `font-family=${quote}${fontToken(selector, value)}${quote}`);
      next = next.replace(/\bfont-size=(['"])(.*?)\1/gi,
        (attrSource, quote, value) => `font-size=${quote}${fontSizeToken(selector, value)}${quote}`);
      return `<${tagName}${next}>`;
    });
    return tagSvgTextKinds(normalized);
  }

  function adaptHtml(source) {
    const withCss = String(source || '').replace(/(<style\b[^>]*>)([\s\S]*?)(<\/style>)/gi,
      (match, open, css, close) => `${open}${adaptCss(css)}${close}`);
    return adaptMarkup(withCss);
  }

  return Object.freeze({
    adapterId: 'paper-ink.native-components',
    adapterIds,
    themeId: 'paper-ink',
    target: 'native-component',
    themeCss: '',
    adaptCss,
    adaptMarkup,
    adaptHtml
  });
});
