(function () {
  'use strict';

  var VERSION = 'brand-latin-numeric-oswald-v1';
  var MIXED_VERSION = 'brand-mixed-han-title-v1';
  var BRAND_SANS_REGULAR_VERSION = 'brand-han-sans-regular-v1';
  var root = document.documentElement;
  var CJK = /[\u3400-\u9fff\uf900-\ufaff\u3040-\u30ff\uac00-\ud7af]/;
  var LATIN = /[A-Za-z]/;
  var LATIN_OR_DIGIT = /[A-Za-z0-9]/;

  function isEnglish(value) {
    var text = String(value || '').trim();
    return LATIN.test(text) && !CJK.test(text);
  }

  function isLatinOrNumber(value) {
    var text = String(value || '').trim();
    return LATIN_OR_DIGIT.test(text) && !CJK.test(text);
  }

  function isMetricOrCode(value) {
    var text = String(value || '').trim();
    return /^[¥$€£]?\s*\d+(?:[.,]\d+)*\s*[A-Za-z%]*$/i.test(text)
      || /^[A-Z]\d+$/i.test(text)
      || /^[A-Z]$/i.test(text)
      || /^(?:ms|s|m|h|cm|mm|km|kb|mb|gb|tb|w|kw)$/i.test(text);
  }

  function numericWeight(value) {
    if (value === 'bold' || value === 'bolder') return 700;
    var parsed = Number.parseInt(value, 10);
    return Number.isFinite(parsed) ? parsed : 400;
  }

  function isVisible(node, style) {
    return style.display !== 'none'
      && style.visibility !== 'hidden'
      && Number.parseFloat(style.opacity || '1') > 0
      && !node.closest('[aria-hidden="true"]');
  }

  function leafTextElements(stage) {
    return Array.prototype.slice.call(stage.querySelectorAll('*')).filter(function (node) {
      if (!String(node.textContent || '').trim()) return false;
      return !Array.prototype.some.call(node.children, function (child) {
        return String(child.textContent || '').trim();
      });
    });
  }

  function latinNumericLeafTextElements(stage) {
    return leafTextElements(stage).filter(function (node) {
      return isLatinOrNumber(node.textContent)
        && !node.closest('[data-xp-latin-numeric-style="sans-regular"]');
    });
  }

  function typeSize(name) {
    return Number.parseFloat(getComputedStyle(root).getPropertyValue('--type-' + name));
  }

  function isTitleClass(node, style) {
    if (node.closest('.doc.tl, .folio, .caption, [data-template-part="takeaway"]')) return false;
    if (node.closest('code, pre, .mono, [data-text-kind="number"], [data-text-kind="meta"], [data-text-kind="source"], [data-text-kind="furniture"], [data-text-kind="label"]')) return false;
    if (node.matches('h1, h2, h3, h4, h5, h6, [data-primary-text]')) return true;
    if (node.closest('[data-template-part="primary"][data-template-slot-kind="text"]')) return true;
    var minimum = typeSize('subheading');
    var size = Number.parseFloat(style.fontSize);
    return Number.isFinite(minimum) && minimum > 0 && Number.isFinite(size) && size >= minimum;
  }

  function classifyTitleLanguages(stage) {
    stage.querySelectorAll('[data-xp-mixed-han-title], [data-xp-english-title-candidate]').forEach(function (node) {
      node.removeAttribute('data-xp-mixed-han-title');
      node.removeAttribute('data-xp-english-title-candidate');
    });
    var hanCount = 0;
    var englishCount = 0;
    leafTextElements(stage).forEach(function (node) {
      var style = getComputedStyle(node);
      if (!isVisible(node, style) || !isTitleClass(node, style)) return;
      var text = String(node.textContent || '').trim();
      if (CJK.test(text)) {
        node.dataset.xpMixedHanTitle = 'true';
        hanCount += 1;
      } else if (isEnglish(text) && !isMetricOrCode(text)) {
        node.dataset.xpEnglishTitleCandidate = 'true';
        englishCount += 1;
      }
    });
    stage.dataset.xpMixedHanTitleCount = String(hanCount);
    stage.dataset.xpEnglishTitleCandidateCount = String(englishCount);
    stage.dataset.xpMixedTypography = MIXED_VERSION;
  }

  function isBrandTheme() {
    return root.dataset.themeId === 'hermes-orange'
      || root.dataset.themeId === 'klein-blue';
  }

  function isHanSansFamily(value) {
    return /Han Sans/i.test(String(value || ''));
  }

  function restoreInlineProperty(node, property, valueAttribute, priorityAttribute) {
    if (!node.hasAttribute(valueAttribute)) return;
    var value = node.getAttribute(valueAttribute) || '';
    var priority = node.getAttribute(priorityAttribute) || '';
    if (value) node.style.setProperty(property, value, priority);
    else node.style.removeProperty(property);
    node.removeAttribute(valueAttribute);
    node.removeAttribute(priorityAttribute);
  }

  function rememberInlineProperty(node, property, valueAttribute, priorityAttribute) {
    node.setAttribute(valueAttribute, node.style.getPropertyValue(property));
    node.setAttribute(priorityAttribute, node.style.getPropertyPriority(property));
  }

  function restoreLatinNumericOswald(stage) {
    stage.querySelectorAll('[data-xp-latin-numeric-oswald]').forEach(function (node) {
      restoreInlineProperty(
        node,
        'font-family',
        'data-xp-latin-numeric-original-family',
        'data-xp-latin-numeric-original-family-priority'
      );
      restoreInlineProperty(
        node,
        'font-weight',
        'data-xp-latin-numeric-original-weight',
        'data-xp-latin-numeric-original-weight-priority'
      );
      node.removeAttribute('data-xp-latin-numeric-oswald');
      node.removeAttribute('data-xp-latin-numeric-typography');
    });
  }

  function applyBrandHanSansRegular(stage) {
    stage.querySelectorAll(
      '[data-xp-brand-sans-family], [data-xp-brand-sans-weight]'
    ).forEach(function (node) {
      restoreInlineProperty(
        node,
        'font-family',
        'data-xp-brand-sans-original-family',
        'data-xp-brand-sans-original-family-priority'
      );
      restoreInlineProperty(
        node,
        'font-weight',
        'data-xp-brand-sans-original-weight',
        'data-xp-brand-sans-original-weight-priority'
      );
      node.removeAttribute('data-xp-brand-sans-family');
      node.removeAttribute('data-xp-brand-sans-weight');
    });

    if (!isBrandTheme()) {
      stage.dataset.xpBrandSansRegular = 'not-applicable';
      stage.dataset.xpBrandSansFamilyCount = '0';
      stage.dataset.xpBrandSansWeightCount = '0';
      stage.dataset.xpBrandSansRegularErrors = '[]';
      root.dataset.xpBrandSansRegularReady = 'not-applicable';
      return [];
    }

    var familyCount = 0;
    var weightCount = 0;
    var errors = [];
    leafTextElements(stage).forEach(function (node) {
      var before = getComputedStyle(node);
      if (!isVisible(node, before) || !isHanSansFamily(before.fontFamily)) return;
      var lightFamily = /Han Sans[^,]*Light/i.test(before.fontFamily);
      var lightWeight = numericWeight(before.fontWeight) < 400;
      if (lightFamily) {
        rememberInlineProperty(
          node,
          'font-family',
          'data-xp-brand-sans-original-family',
          'data-xp-brand-sans-original-family-priority'
        );
        node.dataset.xpBrandSansFamily = 'regular';
        node.style.setProperty('font-family', 'var(--font-sans-family)', 'important');
        familyCount += 1;
      }
      if (lightWeight) {
        rememberInlineProperty(
          node,
          'font-weight',
          'data-xp-brand-sans-original-weight',
          'data-xp-brand-sans-original-weight-priority'
        );
        node.dataset.xpBrandSansWeight = 'regular';
        node.style.setProperty('font-weight', '400', 'important');
        weightCount += 1;
      }
      if (!lightFamily && !lightWeight) return;

      var after = getComputedStyle(node);
      if (!isHanSansFamily(after.fontFamily)
          || /Han Sans[^,]*Light/i.test(after.fontFamily)
          || numericWeight(after.fontWeight) < 400) {
        errors.push(
          String(node.textContent || '').trim()
          + ': ' + before.fontFamily + '/' + before.fontWeight
          + ' -> ' + after.fontFamily + '/' + after.fontWeight
        );
      }
    });
    stage.dataset.xpBrandSansRegular = BRAND_SANS_REGULAR_VERSION;
    stage.dataset.xpBrandSansFamilyCount = String(familyCount);
    stage.dataset.xpBrandSansWeightCount = String(weightCount);
    stage.dataset.xpBrandSansRegularErrors = JSON.stringify(errors);
    root.dataset.xpBrandSansRegularReady = errors.length ? 'error' : 'true';
    return errors;
  }

  function textColor(node, style) {
    return node instanceof SVGElement ? style.fill : style.color;
  }

  function apply() {
    var stage = document.querySelector('.stage');
    var title = stage && stage.querySelector('.doc-title');
    if (!stage || !title) return;

    var matched = 0;

    restoreLatinNumericOswald(stage);
    classifyTitleLanguages(stage);
    var invariantErrors = applyBrandHanSansRegular(stage);
    if (!isBrandTheme()) {
      stage.dataset.xpLatinNumericTypography = 'not-applicable';
      stage.dataset.xpLatinNumericCount = '0';
      stage.dataset.xpLatinNumericInvariantErrors = JSON.stringify(invariantErrors);
      root.dataset.xpLatinNumericTypographyReady = 'not-applicable';
      return;
    }
    var expectedFamily = getComputedStyle(root).getPropertyValue('--xp-oswald').trim()
      || "'Oswald Replica', 'Arial Narrow', 'Han Sans Catalog', sans-serif";

    latinNumericLeafTextElements(stage).forEach(function (node) {
      var before = getComputedStyle(node);
      if (!isVisible(node, before)) return;

      var size = before.fontSize;
      var color = textColor(node, before);
      var lineHeight = before.lineHeight;
      var letterSpacing = before.letterSpacing;
      rememberInlineProperty(
        node,
        'font-family',
        'data-xp-latin-numeric-original-family',
        'data-xp-latin-numeric-original-family-priority'
      );
      rememberInlineProperty(
        node,
        'font-weight',
        'data-xp-latin-numeric-original-weight',
        'data-xp-latin-numeric-original-weight-priority'
      );
      node.style.setProperty('font-family', expectedFamily, 'important');
      node.style.setProperty('font-weight', '700', 'important');
      node.dataset.xpLatinNumericOswald = 'true';
      node.dataset.xpLatinNumericTypography = VERSION;

      var after = getComputedStyle(node);
      if (after.fontSize !== size) {
        invariantErrors.push(node.textContent.trim() + ': font-size ' + size + ' -> ' + after.fontSize);
      }
      if (textColor(node, after) !== color) {
        invariantErrors.push(
          node.textContent.trim() + ': color ' + color + ' -> ' + textColor(node, after)
        );
      }
      if (after.lineHeight !== lineHeight) {
        invariantErrors.push(
          node.textContent.trim() + ': line-height ' + lineHeight + ' -> ' + after.lineHeight
        );
      }
      if (after.letterSpacing !== letterSpacing) {
        invariantErrors.push(
          node.textContent.trim() + ': letter-spacing ' + letterSpacing + ' -> ' + after.letterSpacing
        );
      }
      matched += 1;
    });

    stage.dataset.xpLatinNumericTypography = VERSION;
    stage.dataset.xpLatinNumericCount = String(matched);
    stage.dataset.xpLatinNumericInvariantErrors = JSON.stringify(invariantErrors);
    root.dataset.xpLatinNumericTypographyReady = invariantErrors.length ? 'error' : 'true';
    root.dataset.xpMixedTypographyReady = invariantErrors.length ? 'error' : 'true';
    if (invariantErrors.length) {
      throw new Error('英文数字 Oswald 排版不变量失败: ' + invariantErrors.join(' | '));
    }
  }

  window.WisePPTLatinNumericOswaldTypography = {
    version: VERSION,
    mixedVersion: MIXED_VERSION,
    brandSansRegularVersion: BRAND_SANS_REGULAR_VERSION,
    apply: apply
  };
  apply();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(apply);
  document.addEventListener('wise-ppt:gallery-state-change', apply);
  var stage = document.querySelector('.stage');
  if (stage && window.MutationObserver) {
    var mutationApplyScheduled = false;
    new MutationObserver(function (mutations) {
      var hasTextMutation = mutations.some(function (mutation) {
        return mutation.type === 'characterData'
          || Array.prototype.some.call(mutation.addedNodes, function (node) {
            return node.nodeType === Node.TEXT_NODE
              || (node.nodeType === Node.ELEMENT_NODE && String(node.textContent || '').trim());
          });
      });
      if (!hasTextMutation || mutationApplyScheduled) return;
      mutationApplyScheduled = true;
      if (isBrandTheme()) root.dataset.xpBrandSansRegularReady = 'pending';
      if (isBrandTheme()) root.dataset.xpLatinNumericTypographyReady = 'pending';
      requestAnimationFrame(function () {
        mutationApplyScheduled = false;
        apply();
      });
    }).observe(stage, { childList: true, subtree: true, characterData: true });
  }
})();
