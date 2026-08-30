(function initWisePptNativeAdapter(root, factory) {
  const adapterIds = Object.freeze(['wise-ppt.native']);
  const api = factory(adapterIds);
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) {
    const registry = root.WisePPTThemeAdapters || (root.WisePPTThemeAdapters = {});
    adapterIds.forEach((adapterId) => { registry[adapterId] = api; });
  }
})(typeof window !== 'undefined' ? window : globalThis, function createWisePptNativeAdapter(adapterIds) {
  'use strict';

  const MONO_RE = /(?:\bpre\b|\bcode\b|\.mono\b|[-_](?:number|index|metric|value|year|date|id|code|count)\b)/i;
  const BRUSH_RE = /(?:\.brush\b|\.kai\b|handwrit|annotation)/i;
  const SVG_SMALL_KIND_RE = /(?:label|meta|caption|axis|tick|legend|tag|badge|kicker|eyebrow|note|source|index|number|year|date|code|mono|micro|annotation)/i;
  const CANVAS_COLOR_TOKENS = Object.freeze({
    canvas: '--wp-color-surface-canvas',
    recessed: '--wp-color-surface-recessed',
    panel: '--wp-color-surface-panel',
    primary: '--wp-color-primary',
    functional: '--wp-color-functional',
    body: '--wp-color-body',
    divider: '--wp-color-divider',
    construction: '--wp-color-construction',
    functional: '--wp-color-functional'
  });
  const CANVAS_LINE_TOKENS = Object.freeze({
    hairline: ['--wp-theme-line-hairline', .5],
    detail: ['--wp-theme-line-detail', 1],
    main: ['--wp-theme-line-main', 1.2],
    emphasis: ['--wp-theme-line-emphasis', 2]
  });

  function computedToken(root, name) {
    if (!root) return '';
    const view = root.ownerDocument && root.ownerDocument.defaultView;
    const getStyle = view && typeof view.getComputedStyle === 'function'
      ? view.getComputedStyle.bind(view)
      : (typeof getComputedStyle === 'function' ? getComputedStyle : null);
    return getStyle ? getStyle(root).getPropertyValue(name).trim() : '';
  }

  function canvasToken(context, name) {
    const value = context && typeof context.getToken === 'function'
      ? context.getToken(name)
      : computedToken(context && context.root, name);
    return String(value || '').trim() || `var(${name})`;
  }

  // Canvas 的绘制命令一旦执行就已固化成像素，运行时不能像 SVG/CSS 一样
  // 事后透明换色。这个 API 只为愿意在每次重绘时读取主题的组件提供同一份
  // 语义上下文；没有调用它的旧 Canvas 必须由预览审计标为“待人工确认”。
  function resolveCanvasTheme(context) {
    const colors = Object.fromEntries(Object.entries(CANVAS_COLOR_TOKENS).map(([role, name]) => [
      role, canvasToken(context, name)
    ]));
    const lineWidths = Object.fromEntries(Object.entries(CANVAS_LINE_TOKENS).map(([role, pair]) => {
      const numeric = Number.parseFloat(canvasToken(context, pair[0]));
      return [role, Number.isFinite(numeric) ? numeric : pair[1]];
    }));
    return Object.freeze({
      contract: 'wise-ppt-canvas-theme@1',
      integration: 'opt-in-redraw',
      auto_patch: false,
      colors: Object.freeze(colors),
      line_widths: Object.freeze(lineWidths)
    });
  }

  function applyCanvasStroke(drawingContext, canvasTheme, options) {
    if (!drawingContext || typeof drawingContext !== 'object') throw new TypeError('Canvas 主题需要 2D drawing context');
    const theme = canvasTheme && canvasTheme.contract === 'wise-ppt-canvas-theme@1'
      ? canvasTheme
      : resolveCanvasTheme(canvasTheme || {});
    const lineRole = options && options.line_role || 'main';
    const colorRole = options && options.color_role || 'divider';
    if (!Object.hasOwn(theme.line_widths, lineRole)) throw new TypeError(`未知 Canvas 线宽角色: ${lineRole}`);
    if (!Object.hasOwn(theme.colors, colorRole)) throw new TypeError(`未知 Canvas 颜色角色: ${colorRole}`);
    drawingContext.lineWidth = theme.line_widths[lineRole];
    drawingContext.strokeStyle = theme.colors[colorRole];
    return drawingContext;
  }

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
    adapterId: 'wise-ppt.native',
    adapterIds,
    themeAgnostic: true,
    target: 'native-component',
    themeCss: '',
    canvasIntegration: Object.freeze({
      mode: 'opt-in-redraw',
      autoPatch: false,
      contract: 'wise-ppt-canvas-theme@1'
    }),
    resolveCanvasTheme,
    applyCanvasStroke,
    adaptCss,
    adaptMarkup,
    adaptHtml
  });
});
