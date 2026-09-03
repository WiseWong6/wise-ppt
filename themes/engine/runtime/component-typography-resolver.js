(function initWisePptComponentTypographyResolver(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.WisePPTComponentTypographyResolver = api;
})(typeof window !== 'undefined' ? window : globalThis, function createComponentTypographyResolver() {
  'use strict';

  const CONTRACT_ID = 'wise-ppt-component-typography-resolution@1';
  const COMPONENT_ROLES = new Set([
    'heading', 'subheading', 'body', 'body-small', 'metric',
    'label', 'meta', 'number', 'source',
  ]);
  const CJK = /[\u3400-\u9fff\uf900-\ufaff\u3040-\u30ff\uac00-\ud7af]/;
  const LATIN_OR_DIGIT = /[A-Za-z0-9]/;
  const BRAND_THEME_IDS = new Set(['hermes-orange', 'klein-blue']);
  const SOURCE_MONO_FAMILY = /(?:--(?:[a-z0-9-]*-)?mono\b|\bCourier(?:\s+Prime)?\b|\bMenlo\b|\bMonaco\b|\bmonospace\b)/i;
  const SOURCE_SYSTEM_SANS_FAMILY = /(?:-apple-system|\bsystem-ui\b|\bPingFang\s+SC\b|\bMicrosoft\s+YaHei\b)/i;
  const DEFAULT_TITLE_CLASS = /(?:^|[-_])(?:title|heading|headline|header)(?:$|[-_])/i;

  function textValue(value) {
    return String(value == null ? '' : value).replace(/\s+/g, ' ').trim();
  }

  function isLatinOrNumber(value) {
    const text = textValue(value);
    return LATIN_OR_DIGIT.test(text) && !CJK.test(text);
  }

  function scriptProfile(value) {
    const text = textValue(value);
    const hasCjk = CJK.test(text);
    const hasLatinOrDigit = LATIN_OR_DIGIT.test(text);
    if (hasCjk && hasLatinOrDigit) return 'cjk-mixed';
    if (hasCjk) return 'cjk';
    if (hasLatinOrDigit) return 'latin-number';
    return 'neutral-symbol';
  }

  function contextThemeId(context) {
    if (context && textValue(context.themeId)) return textValue(context.themeId);
    const target = context && (context.element || context.root);
    const declared = target?.closest?.('[data-theme-id]')?.dataset?.themeId
      || target?.ownerDocument?.documentElement?.dataset?.themeId
      || target?.dataset?.themeId
      || '';
    return String(declared).trim();
  }

  function isSourceMonoFamily(value) {
    return SOURCE_MONO_FAMILY.test(String(value || ''));
  }

  function isSourceSystemSansFamily(value) {
    return SOURCE_SYSTEM_SANS_FAMILY.test(String(value || ''));
  }

  function sourceMonoForDom(node, componentRoot) {
    let current = node;
    while (current) {
      if (current.getAttribute) {
        if (current.getAttribute('data-component-source-mono') === 'true') return true;
        if (isSourceMonoFamily(current.getAttribute('font-family'))) return true;
        if (isSourceMonoFamily(current.getAttribute('style'))) return true;
      }
      if (current === componentRoot) break;
      current = current.parentElement;
    }
    return false;
  }

  function layoutDefaultRoot(componentRoot) {
    if (componentRoot?.matches?.('[data-component-theme-mode="layout-default"]')) return componentRoot;
    return componentRoot?.querySelector?.('[data-component-theme-mode="layout-default"]') || null;
  }

  function restoreOriginalInlineTypography(node) {
    const captured = node.getAttribute('data-component-source-typography-captured') === 'true';
    for (const property of ['font-family', 'font-weight', 'font-size']) {
      const suffix = property === 'font-family'
        ? 'family'
        : property === 'font-weight' ? 'weight' : 'size';
      const valueAttribute = `data-component-source-inline-${suffix}`;
      const priorityAttribute = `data-component-source-inline-${suffix}-priority`;
      if (!captured) {
        node.setAttribute(valueAttribute, node.style.getPropertyValue(property));
        node.setAttribute(priorityAttribute, node.style.getPropertyPriority(property));
        continue;
      }
      const value = node.getAttribute(valueAttribute) || '';
      const priority = node.getAttribute(priorityAttribute) || '';
      if (value) node.style.setProperty(property, value, priority);
      else node.style.removeProperty(property);
    }
    if (!captured) node.setAttribute('data-component-source-typography-captured', 'true');
    node.removeAttribute('data-theme-type-role');
  }

  function isHanSansFamily(value) {
    return /Han Sans/i.test(String(value || ''));
  }

  function isHanSansLightFamily(value) {
    return /Han Sans[^,]*Light/i.test(String(value || ''));
  }

  function sourceLayoutCode(sourceLayout) {
    return String(sourceLayout?.dataset?.componentThemeLayout || '').trim().toUpperCase();
  }

  function sourceLayoutExactPresentation(node, sourceLayout, themeId) {
    if (!sourceLayout || !(node === sourceLayout || sourceLayout.contains(node))) return {};
    const layoutCode = sourceLayoutCode(sourceLayout);
    if (layoutCode === 'Q1') {
      if (node.matches?.('.venn-three__kicker')) {
        return {fontFamilyToken: '--wp-font-mono', fontSize: '13px'};
      }
      if (node.matches?.('.venn-three__label')) {
        return {fontFamilyToken: '--wp-font-sans', fontSize: '13px'};
      }
      if (node.matches?.('.venn-three__intersection')) {
        return {
          fontFamilyToken: '--wp-font-sans',
          fontSize: BRAND_THEME_IDS.has(themeId) ? '30px' : '26px',
          title: true,
        };
      }
    }
    if (
      layoutCode === 'C5'
      && node.matches?.('.pi-progress-ring text[data-field$=".label"]')
    ) {
      return {
        fontSize: '26px',
        fontWeight: BRAND_THEME_IDS.has(themeId) ? 700 : undefined,
      };
    }
    if (
      layoutCode === 'C3'
      && node.matches?.('text[font-size="var(--type-subheading)"]')
    ) {
      return {fontWeight: 700};
    }
    if (
      layoutCode === 'G2'
      && node.matches?.('#pi-88-draw text[font-size="var(--type-body)"]')
    ) {
      return {
        fontSize: '26px',
        fontWeight: BRAND_THEME_IDS.has(themeId) ? 700 : undefined,
      };
    }
    if (
      layoutCode === 'P2'
      && node.matches?.('svg[viewBox="328 230 1264 536"] text[font-size="var(--type-body)"]')
    ) {
      return {
        fontSize: '26px',
        fontWeight: BRAND_THEME_IDS.has(themeId) ? 700 : undefined,
      };
    }
    if (layoutCode === 'R7' && node.matches?.('[data-r7-brand-name]')) {
      return {
        fontSize: '13px',
        fontWeight: BRAND_THEME_IDS.has(themeId) ? 700 : 300,
      };
    }
    if (layoutCode === 'R5') {
      if (node.matches?.('svg[aria-label="互锁齿轮关系图"] > text:first-of-type')) {
        return {fontSize: '13px'};
      }
      if (node.matches?.('svg[aria-label="互锁齿轮关系图"] [data-field$="_desc"]')) {
        return {fontSize: '13px'};
      }
      if (node.matches?.('#r5-focus-en, svg[aria-label="互锁齿轮关系图"] g[transform="translate(690 280)"] > text:first-child')) {
        return {fontSize: '13px'};
      }
    }
    if (layoutCode === 'U2') {
      if (node.matches?.('.pi-cmt-head')) {
        return {
          fontFamilyToken: '--wp-font-mono',
          fontSize: '17px',
          fontWeight: 300,
          lockFontFamily: true,
        };
      }
      if (node.matches?.('.pi-cmt-row-title')) {
        return {fontFamilyToken: '--wp-font-sans', fontSize: '20px'};
      }
      if (node.matches?.('.pi-cmt-plan-a, .pi-cmt-plan-b, .pi-cmt-delta')) {
        return {fontFamilyToken: '--wp-font-mono', fontSize: '18px'};
      }
    }
    if (layoutCode === 'K3') {
      if (node.matches?.('.pi-metric-value')) {
        return {
          fontFamilyToken: BRAND_THEME_IDS.has(themeId)
            && scriptProfile(node.textContent) === 'cjk-mixed'
            ? '--wp-font-han-sans'
            : undefined,
          fontSize: '40px',
        };
      }
      if (node.matches?.('.pi-metric-label')) return {fontSize: '15px'};
    }
    return {};
  }

  function sourceTitleCandidate(node, componentRoot, style) {
    if (hasDomAncestor(node, componentRoot, '.doc.tl,.folio,.caption,[data-template-part="takeaway"]')) return false;
    if (hasDomAncestor(node, componentRoot, 'code,pre,.mono,[data-text-kind="number"],[data-text-kind="meta"],[data-text-kind="source"],[data-text-kind="furniture"],[data-text-kind="label"]')) return false;
    if (node.matches?.('h1,h2,h3,h4,h5,h6,[data-primary-text]')) return true;
    if (hasDomAncestor(node, componentRoot, '[data-template-part="primary"][data-template-slot-kind="text"]')) return true;
    const root = componentRoot.ownerDocument?.documentElement;
    const view = componentRoot.ownerDocument?.defaultView;
    const minimum = Number.parseFloat(view?.getComputedStyle(root).getPropertyValue('--type-subheading'));
    const size = Number.parseFloat(style.fontSize);
    return Number.isFinite(minimum) && minimum > 0 && Number.isFinite(size) && size >= minimum;
  }

  function sourceCatalogLeaf(node) {
    return !Array.prototype.some.call(node.children || [], child => textValue(child.textContent));
  }

  // 来源组件复用 Catalog 来源页自己的字体转换顺序：先保留原始版式排版，
  // 品牌主题只把 Han Sans Light/300 升为 Regular，mixed 的纯中文大标题
  // 按页面规则升为 Bold，最后把不含中文的英文/数字投影为 Oswald 700。
  // 中英/中数混排保留来源字体族与合法字重，不由 behavior 角色反向改写。
  function sourceLayoutPresentation(node, componentRoot, text, componentRole, options) {
    const settings = options || {};
    const view = componentRoot.ownerDocument?.defaultView;
    const style = view?.getComputedStyle(node);
    const sourceFamily = style?.fontFamily || 'sans-serif';
    const sourceMono = Boolean(settings.sourceMono) || isSourceMonoFamily(sourceFamily);
    const parsedWeight = Number.parseInt(style?.fontWeight, 10);
    const sourceWeight = Number.isFinite(parsedWeight) ? parsedWeight : 400;
    const themeId = contextThemeId({root: componentRoot});
    const profile = scriptProfile(text);
    const catalogLeaf = sourceCatalogLeaf(node);
    const preserveExplicitMono = Boolean(settings.explicitMono) && !(
      catalogLeaf && profile === 'latin-number' && BRAND_THEME_IDS.has(themeId)
    );
    const exact = sourceLayoutExactPresentation(node, settings.sourceLayout, themeId);
    const title = exact.title || (
      catalogLeaf && profile === 'cjk' && sourceTitleCandidate(node, componentRoot, style || {})
    );
    const mixedTitle = catalogLeaf
      && profile === 'cjk-mixed'
      && sourceTitleCandidate(node, componentRoot, style || {});
    let themeRole = resolveThemeRole(componentRole, text);
    let fontFamily = sourceFamily;
    let fontWeight = sourceWeight;
    let fontSource = 'source-layout:computed-font-family';
    let weightSource = 'source-layout:computed-font-weight';

    /* 来源页把抽取组件里的 pi/通用族名接回页面字体 token。组件脱离
       页面后浏览器会把它们算成 Menlo 或 system-ui；这不是来源页最终
       呈现，必须先恢复为同一主题的 mono/sans，再比较三套默认态。 */
    if (sourceMono) {
      fontFamily = resolvedToken(
        {root: componentRoot, element: componentRoot},
        '--wp-font-mono',
        sourceFamily,
      );
      fontSource = 'source-layout:source-mono:--wp-font-mono';
    } else if (isSourceSystemSansFamily(sourceFamily)) {
      fontFamily = resolvedToken(
        {root: componentRoot, element: componentRoot},
        '--wp-font-sans',
        sourceFamily,
      );
      fontSource = 'source-layout:source-system-sans:--wp-font-sans';
    }
    if (exact.fontFamilyToken) {
      fontFamily = resolvedToken(
        {root: componentRoot, element: componentRoot},
        exact.fontFamilyToken,
        fontFamily,
      );
      fontSource = `source-layout:exact:${exact.fontFamilyToken}`;
    }

    if (preserveExplicitMono) {
      themeRole = 'component-mono';
      fontFamily = resolvedToken(
        {root: componentRoot, element: componentRoot},
        '--wp-font-mono',
        sourceFamily,
      );
      fontWeight = 400;
      fontSource = 'source-layout:explicit-mono:--wp-font-mono';
      weightSource = 'source-layout:explicit-mono:400';
    }

    if (!preserveExplicitMono && BRAND_THEME_IDS.has(themeId)) {
      const root = componentRoot.ownerDocument?.documentElement;
      const typographyMode = root?.dataset?.typographyMode || '';
      if (catalogLeaf && profile === 'latin-number') {
        themeRole = componentRole === 'heading' || componentRole === 'subheading'
          ? 'en-content-title'
          : componentRole === 'metric' || componentRole === 'number'
            ? 'en-bold'
            : themeRole;
        fontFamily = resolvedToken({root: componentRoot, element: componentRoot}, '--wp-font-oswald', sourceFamily);
        fontWeight = 700;
        fontSource = 'source-layout:catalog-latin-numeric:--wp-font-oswald';
        weightSource = 'source-layout:catalog-latin-numeric:700';
      } else if (title && typographyMode === 'mixed') {
        themeRole = 'zh-content-title';
        fontFamily = resolvedToken({root: componentRoot, element: componentRoot}, '--wp-font-han-sans', sourceFamily);
        fontWeight = 700;
        fontSource = 'source-layout:catalog-mixed-title:--wp-font-han-sans';
        weightSource = 'source-layout:catalog-mixed-title:700';
      } else if (mixedTitle && typographyMode === 'mixed') {
        /* 来源页会把达到标题字阶的混排文字升到 700，但这里不改字体族：
           中英/中数混排保留来源族，避免再次把它们一刀切成 Han Sans。 */
        fontWeight = 700;
        weightSource = 'source-layout:catalog-mixed-title-preserved-family:700';
      } else if (settings.bold) {
        /* identity.text-bold 是来源版式的常驻身份样式，不是组件侧重新
           猜测出来的标题角色。纯英文/数字已由上一分支落到 Oswald 700；
           这里仅恢复来源页对中文或混排正文实际使用的 650。 */
        fontWeight = 650;
        weightSource = 'source-layout:identity.text-bold:650';
        if (isHanSansLightFamily(sourceFamily)) {
          fontFamily = resolvedToken(
            {root: componentRoot, element: componentRoot},
            '--wp-font-han-sans',
            sourceFamily,
          );
          fontSource = 'source-layout:identity.text-bold:--wp-font-han-sans';
        }
      } else {
        /* Catalog 的 Regular 化只处理原本就是 Han Sans 的 Light/300。
           Courier、宋体以及中英/中数混排的来源字体不得被统一洗成黑体。 */
        if (catalogLeaf && (
          isHanSansFamily(sourceFamily) || isSourceSystemSansFamily(sourceFamily)
        )) {
          if (isHanSansLightFamily(sourceFamily)) {
            fontFamily = resolvedToken(
              {root: componentRoot, element: componentRoot},
              '--wp-font-han-sans',
              sourceFamily,
            );
            fontSource = 'source-layout:catalog-han-light-regular:--wp-font-han-sans';
          }
          if (sourceWeight < 400) {
            fontWeight = 400;
            weightSource = 'source-layout:catalog-han-light-regular:400';
          }
        }
      }
    }
    if (Number.isFinite(exact.fontWeight)) {
      fontWeight = exact.fontWeight;
      weightSource = `source-layout:exact:${exact.fontWeight}`;
    }
    if (exact.lockFontFamily && exact.fontFamilyToken) {
      fontFamily = resolvedToken(
        {root: componentRoot, element: componentRoot},
        exact.fontFamilyToken,
        fontFamily,
      );
      fontSource = `source-layout:exact-locked:${exact.fontFamilyToken}`;
    }

    return {
      themeRole,
      scriptProfile: profile,
      fontSource,
      weightSource,
      fontFamily,
      fontWeight,
      fontSize: exact.fontSize || '',
    };
  }

  function resolveThemeRole(componentRole, text, options) {
    const settings = options || {};
    if (settings.explicitMono) return 'component-mono';
    if (!COMPONENT_ROLES.has(componentRole)) componentRole = 'body';
    if (settings.bold) return CJK.test(textValue(text)) ? 'zh-content-title' : 'en-bold';
    if (componentRole === 'heading' || componentRole === 'subheading') {
      return CJK.test(textValue(text)) ? 'zh-content-title' : 'en-content-title';
    }
    if (componentRole === 'metric' || componentRole === 'number') {
      return isLatinOrNumber(text) ? 'en-bold' : 'number';
    }
    if (componentRole === 'label' || componentRole === 'meta' || componentRole === 'source') {
      return 'label';
    }
    return 'body';
  }

  function rawToken(context, name) {
    if (context && typeof context.getToken === 'function') {
      const value = String(context.getToken(name) || '').trim();
      if (value && value !== name) return value;
    }
    // Component previews may scope their local font subset on the rendered
    // element while keeping color/theme tokens on the document root. Resolve
    // from the nearest text owner first so ECharts and DOM text see the same
    // font contract.
    const target = context && (context.element || context.root);
    const view = target?.ownerDocument?.defaultView || (typeof window !== 'undefined' ? window : null);
    return view && target ? view.getComputedStyle(target).getPropertyValue(name).trim() : '';
  }

  function resolvedToken(context, name, fallback) {
    let value = rawToken(context, name);
    const visited = new Set([name]);
    for (let depth = 0; depth < 8; depth += 1) {
      const match = /^var\(\s*(--[A-Za-z0-9_-]+)(?:\s*,[^)]*)?\s*\)$/.exec(value);
      if (!match || visited.has(match[1])) break;
      visited.add(match[1]);
      value = rawToken(context, match[1]);
    }
    return value && !/^var\(/.test(value) ? value : fallback;
  }

  function browserRolePresentation(scope, themeRole) {
    if (!scope || !scope.ownerDocument || typeof scope.appendChild !== 'function') return null;
    const documentValue = scope.ownerDocument;
    const view = documentValue.defaultView;
    if (!view || typeof view.getComputedStyle !== 'function') return null;
    const isSvg = scope.namespaceURI === 'http://www.w3.org/2000/svg';
    const probe = isSvg
      ? documentValue.createElementNS('http://www.w3.org/2000/svg', 'text')
      : documentValue.createElement('span');
    probe.setAttribute('data-theme-type-role', themeRole);
    probe.setAttribute('aria-hidden', 'true');
    probe.textContent = 'Aa 字';
    probe.style.setProperty('position', 'absolute', 'important');
    probe.style.setProperty('visibility', 'hidden', 'important');
    probe.style.setProperty('pointer-events', 'none', 'important');
    scope.appendChild(probe);
    const style = view.getComputedStyle(probe);
    const weight = Number.parseInt(style.fontWeight, 10);
    const result = {
      fontFamily: style.fontFamily,
      fontWeight: Number.isFinite(weight) ? weight : 400,
    };
    probe.remove();
    return result;
  }

  function optionTextStyle(componentRole, text, context, options) {
    const settings = options || {};
    const resolvedThemeRole = resolveThemeRole(componentRole, text, settings);
    const profile = scriptProfile(text);
    const semanticMono = resolvedThemeRole === 'component-mono';
    // A font-family authored as var(--pi-mono)/var(--mono) is visual source
    // evidence, not a semantic code declaration. Paper Ink may preserve that
    // source face for Latin/numeric content; chromatic themes still apply their
    // Oswald/Chinese script contract. Explicit code/pre/.mono remains mono in
    // every theme through semanticMono.
    const sourceMonoPreserved = !semanticMono
      && Boolean(settings.sourceMono)
      && profile === 'latin-number'
      && contextThemeId(context) === 'paper-ink';
    const mono = semanticMono || sourceMonoPreserved;
    const themeRole = mono ? 'component-mono' : resolvedThemeRole;
    const brandLatin = !mono
      && profile === 'latin-number'
      && BRAND_THEME_IDS.has(contextThemeId(context));
    const localScope = context && (context.element || (
      context.root && context.root !== context.root.ownerDocument?.documentElement
        ? context.root
        : null
    ));
    if (!mono && !brandLatin) {
      const browserPresentation = browserRolePresentation(localScope, themeRole);
      if (browserPresentation) return {
        themeRole,
        scriptProfile: profile,
        fontSource: `--wp-theme-font-${themeRole}`,
        weightSource: `--wp-theme-weight-${themeRole}`,
        ...browserPresentation,
      };
    }
    const familyToken = mono
      ? '--wp-font-mono'
      : brandLatin ? '--wp-font-oswald' : `--wp-theme-font-${themeRole}`;
    const weightToken = mono
      ? '400'
      : brandLatin ? '700' : `--wp-theme-weight-${themeRole}`;
    const family = resolvedToken(
      context,
      familyToken,
      resolvedToken(context, mono ? '--wp-font-mono' : '--wp-font-sans', mono ? 'monospace' : 'sans-serif'),
    );
    const weightValue = mono
      ? '400'
      : brandLatin ? '700' : resolvedToken(context, weightToken, '400');
    const weight = Number.parseInt(weightValue, 10);
    return {
      themeRole,
      scriptProfile: profile,
      fontSource: sourceMonoPreserved ? `source-markup:${familyToken}` : familyToken,
      weightSource: sourceMonoPreserved ? `source-markup:${weightToken}` : weightToken,
      fontFamily: family,
      fontWeight: Number.isFinite(weight) ? weight : 400,
    };
  }

  function domTextOwners(componentRoot) {
    const candidates = [componentRoot, ...componentRoot.querySelectorAll('*')];
    return candidates.filter(node => Array.prototype.some.call(node.childNodes || [], child => (
      child.nodeType === 3 && textValue(child.nodeValue)
    )));
  }

  function componentRoleForDom(node, componentRoot) {
    let current = node;
    while (current) {
      const role = current.getAttribute && current.getAttribute('data-component-type-role');
      if (role && COMPONENT_ROLES.has(role)) return role;
      if (current === componentRoot) break;
      current = current.parentElement;
    }
    const kind = node.getAttribute && node.getAttribute('data-text-kind');
    return COMPONENT_ROLES.has(kind) ? kind : 'body';
  }

  function hasDomAncestor(node, componentRoot, selector) {
    const match = node.closest && node.closest(selector);
    return Boolean(match && (match === componentRoot || componentRoot.contains(match)));
  }

  // 没有版式来源时，标题粗细来自组件自身的语义结构，而不是某个卡号补丁。
  // 只认标题标签、明确主文本或 class 的完整 title/header 词段；正文中的
  // 普通 identity.text、code-header 等容器不会因此被整块加粗。
  function defaultTitleForDom(node, componentRoot, componentRole) {
    if (componentRole === 'heading' || componentRole === 'subheading') return true;
    if (node.matches?.('h1,h2,h3,h4,h5,h6,th,[data-primary-text]')) return true;
    const className = typeof node.className === 'string'
      ? node.className
      : node.getAttribute?.('class') || '';
    return String(className).split(/\s+/).some(name => DEFAULT_TITLE_CLASS.test(name))
      && !hasDomAncestor(node, componentRoot, 'code,pre,.mono,[data-component-mono="true"]');
  }

  function applyToElement(componentRoot) {
    if (!componentRoot || typeof componentRoot.querySelectorAll !== 'function') {
      throw new TypeError('组件字体解析需要 DOM 根元素');
    }
    componentRoot.setAttribute('data-component-typography-contract', CONTRACT_ID);
    const counts = {};
    const presentations = new Map();
    const owners = domTextOwners(componentRoot);
    const sourceLayout = layoutDefaultRoot(componentRoot);
    if (sourceLayout) owners.forEach(restoreOriginalInlineTypography);
    const sourcePresentations = new Map();
    if (sourceLayout) {
      /* 先读取整棵组件树的原始计算样式，再统一写回。若边读边写，父节点
         的新字重会改变后代 b/strong 的 bolder 计算，组件便会偏离来源页。 */
      owners.forEach(node => {
        const text = textValue(node.textContent);
        const componentRole = componentRoleForDom(node, componentRoot);
        const explicitMono = hasDomAncestor(node, componentRoot, 'code,pre,.mono,[data-component-mono="true"]');
        const sourceMono = sourceMonoForDom(node, componentRoot);
        const bold = hasDomAncestor(node, componentRoot, '[data-component-theme-treatment="identity.text-bold"]');
        sourcePresentations.set(node, sourceLayoutPresentation(
          node,
          componentRoot,
          text,
          componentRole,
          {explicitMono, sourceMono, bold, sourceLayout},
        ));
      });
    }
    owners.forEach(node => {
      const text = textValue(node.textContent);
      const componentRole = componentRoleForDom(node, componentRoot);
      const explicitMono = hasDomAncestor(node, componentRoot, 'code,pre,.mono,[data-component-mono="true"]');
      const sourceMono = sourceMonoForDom(node, componentRoot);
      const semanticTitle = !sourceLayout
        && defaultTitleForDom(node, componentRoot, componentRole);
      const inferredTitle = semanticTitle
        && componentRole !== 'heading'
        && componentRole !== 'subheading';
      const bold = hasDomAncestor(node, componentRoot, '[data-component-theme-treatment="identity.text-bold"]')
        || inferredTitle;
      const themeRole = resolveThemeRole(componentRole, text, {explicitMono, bold});
      const profile = scriptProfile(text);
      const brandLatin = themeRole !== 'component-mono'
        && profile === 'latin-number'
        && BRAND_THEME_IDS.has(contextThemeId({root: componentRoot}));
      const sourceMonoPreserved = themeRole !== 'component-mono'
        && sourceMono
        && profile === 'latin-number'
        && contextThemeId({root: componentRoot}) === 'paper-ink';
      const presentationKey = `${themeRole}:${profile}:${brandLatin ? 'brand-latin' : sourceMonoPreserved ? 'source-mono' : 'theme-role'}`;
      let presentation;
      if (sourceLayout) {
        presentation = sourcePresentations.get(node);
      } else {
        if (!presentations.has(presentationKey)) {
          presentations.set(presentationKey, optionTextStyle(
            componentRole,
            text,
            {root: componentRoot, element: componentRoot},
            {explicitMono, sourceMono, bold},
          ));
        }
        presentation = presentations.get(presentationKey);
      }
      const appliedThemeRole = presentation.themeRole;
      if (sourceMono) node.setAttribute('data-component-source-mono', 'true');
      node.setAttribute('data-theme-type-role', appliedThemeRole);
      node.setAttribute('data-component-typography-source', CONTRACT_ID);
      node.setAttribute('data-component-script-profile', profile);
      node.setAttribute('data-component-font-source', presentation.fontSource);
      node.setAttribute('data-component-weight-source', presentation.weightSource);
      if (semanticTitle) {
        node.setAttribute('data-component-title-source', 'default-rule-semantic-title');
      }
      // Atlas 源样式有合法的 !important，但字体的最终裁决必须属于主题角色。
      // 先用无源样式干扰的探针解析当前主题角色，再以内联 important 封印结果。
      // Catalog 切换主题或字体档会重新走该解析器，因此四条渲染路径结果一致。
      node.style.setProperty('font-family', presentation?.fontFamily || 'sans-serif', 'important');
      node.style.setProperty('font-weight', String(presentation?.fontWeight || 400), 'important');
      if (presentation?.fontSize) {
        node.style.setProperty('font-size', presentation.fontSize, 'important');
      }
      counts[appliedThemeRole] = (counts[appliedThemeRole] || 0) + 1;
    });
    return {contract: CONTRACT_ID, count: Object.values(counts).reduce((sum, value) => sum + value, 0), roles: counts};
  }

  function nodesForCheerio($, componentRoot, selector) {
    if (selector === ':scope') return [componentRoot];
    // parse5 preserves SVG's camel-cased `foreignObject`, while css-select in
    // HTML mode lower-cases type selectors and therefore cannot address it by
    // tag name. Resolve that one HTML/SVG boundary through a temporary
    // attribute so the same browser-authored :scope selector remains exact.
    const marker = 'data-component-typography-foreign-object-selector';
    const foreignObjects = $(componentRoot).find('*').filter((_index, node) => node.name === 'foreignObject');
    if (!foreignObjects.length || !/\bforeignObject\b/.test(selector)) {
      return $(componentRoot).find(selector).toArray();
    }
    if (foreignObjects.filter(`[${marker}]`).length) {
      throw new Error(`组件源码占用了字体选择器临时属性: ${marker}`);
    }
    foreignObjects.attr(marker, 'true');
    try {
      return $(componentRoot).find(selector.replace(/\bforeignObject\b/g, `[${marker}]`)).toArray();
    } finally {
      foreignObjects.removeAttr(marker);
    }
  }

  function directCheerioText(node) {
    return (node.children || [])
      .filter(child => child.type === 'text')
      .map(child => child.data || '')
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function componentRoleForCheerio($, node, componentRoot) {
    let current = node;
    while (current) {
      const role = $(current).attr('data-component-type-role');
      if (role && COMPONENT_ROLES.has(role)) return role;
      if (current === componentRoot) break;
      current = current.parent;
    }
    const kind = $(node).attr('data-text-kind');
    return COMPONENT_ROLES.has(kind) ? kind : 'body';
  }

  function hasCheerioAncestor($, node, componentRoot, predicate) {
    let current = node;
    while (current) {
      if (predicate(current)) return true;
      if (current === componentRoot) break;
      current = current.parent;
    }
    return false;
  }

  function sourceMonoForCheerio($, node, componentRoot) {
    return hasCheerioAncestor($, node, componentRoot, current => (
      $(current).attr('data-component-source-mono') === 'true'
      || isSourceMonoFamily($(current).attr('font-family'))
      || isSourceMonoFamily($(current).attr('style'))
    ));
  }

  function defaultTitleForCheerio($, node, componentRoot, componentRole) {
    if (componentRole === 'heading' || componentRole === 'subheading') return true;
    const name = String(node.tagName || '').toLowerCase();
    if (/^h[1-6]$/.test(name) || name === 'th' || $(node).attr('data-primary-text') != null) return true;
    const classes = String($(node).attr('class') || '').split(/\s+/).filter(Boolean);
    const mono = hasCheerioAncestor($, node, componentRoot, current => {
      const currentName = String(current.tagName || '').toLowerCase();
      const currentClasses = String($(current).attr('class') || '').split(/\s+/).filter(Boolean);
      return currentName === 'code' || currentName === 'pre' || currentClasses.includes('mono')
        || $(current).attr('data-component-mono') === 'true';
    });
    return !mono && classes.some(className => DEFAULT_TITLE_CLASS.test(className));
  }

  function projectMarkup(markup, typeRoles) {
    if (typeof require !== 'function') throw new Error('字体 markup 投影仅供 Node 物化器使用');
    // Use Cheerio's parse5-backed HTML parser so Node materialization observes
    // the same implicit HTML structure as browsers (for example <tbody>).
    const cheerio = require('cheerio');
    const $ = cheerio.load(String(markup || ''), {xmlMode: false}, false);
    const componentRoot = $.root().children().first().get(0);
    if (!componentRoot) throw new Error('组件字体投影缺组件根');
    $(componentRoot).attr('data-component-typography-contract', CONTRACT_ID);
    const layoutDefault = $(componentRoot).is('[data-component-theme-mode="layout-default"]')
      || $(componentRoot).find('[data-component-theme-mode="layout-default"]').length > 0;
    Object.entries(typeRoles || {}).forEach(([selector, role]) => {
      if (!COMPONENT_ROLES.has(role)) throw new Error(`未知组件字体角色: ${role}`);
      const nodes = nodesForCheerio($, componentRoot, selector);
      if (!nodes.length) throw new Error(`type_roles 选择器未命中: ${selector}`);
      nodes.forEach(node => {
        $(node).attr('data-component-type-role', role);
        $(node).attr('data-component-type-authority', 'behavior-v4');
      });
    });
    const counts = {};
    const candidates = [componentRoot, ...$(componentRoot).find('*').toArray()]
      .filter(node => directCheerioText(node));
    candidates.forEach(node => {
      const text = $(node).text().replace(/\s+/g, ' ').trim();
      const componentRole = componentRoleForCheerio($, node, componentRoot);
      const explicitMono = hasCheerioAncestor($, node, componentRoot, current => {
        const name = String(current.tagName || '').toLowerCase();
        const classes = String($(current).attr('class') || '').split(/\s+/);
        return name === 'code' || name === 'pre' || classes.includes('mono')
          || $(current).attr('data-component-mono') === 'true';
      });
      const sourceMono = sourceMonoForCheerio($, node, componentRoot);
      const declaredBold = hasCheerioAncestor($, node, componentRoot, current => (
        $(current).attr('data-component-theme-treatment') === 'identity.text-bold'
      ));
      const semanticTitle = !layoutDefault
        && defaultTitleForCheerio($, node, componentRoot, componentRole);
      const inferredTitle = semanticTitle
        && componentRole !== 'heading'
        && componentRole !== 'subheading';
      const bold = declaredBold || inferredTitle;
      const themeRole = resolveThemeRole(componentRole, text, {explicitMono, bold});
      const profile = scriptProfile(text);
      const familySource = themeRole === 'component-mono'
        ? '--wp-font-mono'
        : sourceMono
          ? `source-markup:paper-ink=--wp-font-mono;brand-latin=--wp-font-oswald;fallback=--wp-theme-font-${themeRole}`
        : profile === 'latin-number'
          ? `brand-latin:--wp-font-oswald;fallback:--wp-theme-font-${themeRole}`
          : `--wp-theme-font-${themeRole}`;
      const weightSource = themeRole === 'component-mono'
        ? '400'
        : sourceMono
          ? `source-markup:paper-ink=400;brand-latin=700;fallback=--wp-theme-weight-${themeRole}`
        : profile === 'latin-number'
          ? `brand-latin:700;fallback:--wp-theme-weight-${themeRole}`
          : `--wp-theme-weight-${themeRole}`;
      $(node).attr('data-theme-type-role', themeRole);
      $(node).attr('data-component-typography-source', CONTRACT_ID);
      $(node).attr('data-component-script-profile', profile);
      if (sourceMono) $(node).attr('data-component-source-mono', 'true');
      $(node).attr('data-component-font-source', familySource);
      $(node).attr('data-component-weight-source', weightSource);
      if (semanticTitle) {
        $(node).attr('data-component-title-source', 'default-rule-semantic-title');
      }
      counts[themeRole] = (counts[themeRole] || 0) + 1;
    });
    return {
      markup: $.html(componentRoot),
      report: {contract: CONTRACT_ID, count: candidates.length, roles: counts},
    };
  }

  return Object.freeze({
    contractId: CONTRACT_ID,
    resolveThemeRole,
    scriptProfile,
    optionTextStyle,
    applyToElement,
    projectMarkup,
  });
});
