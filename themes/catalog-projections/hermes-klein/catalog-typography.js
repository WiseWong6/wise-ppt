(function () {
  'use strict';

  var VERSION = 'accent-english-title-match-v1';
  var MIXED_VERSION = 'brand-mixed-han-title-v1';
  var root = document.documentElement;
  var CJK = /[\u3400-\u9fff\uf900-\ufaff\u3040-\u30ff\uac00-\ud7af]/;
  var LATIN = /[A-Za-z]/;

  function isEnglish(value) {
    var text = String(value || '').trim();
    return LATIN.test(text) && !CJK.test(text);
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

  function englishLeafTextElements(stage) {
    return leafTextElements(stage).filter(function (node) {
      return isEnglish(node.textContent);
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

  function textColor(node, style) {
    return node instanceof SVGElement ? style.fill : style.color;
  }

  function apply() {
    var stage = document.querySelector('.stage');
    var title = stage && stage.querySelector('.doc-title');
    if (!stage || !title) return;

    var titleStyle = getComputedStyle(title);
    var expectedFamily = titleStyle.fontFamily;
    var expectedWeight = titleStyle.fontWeight;
    var matched = 0;
    var invariantErrors = [];

    classifyTitleLanguages(stage);

    englishLeafTextElements(stage).forEach(function (node) {
      var before = getComputedStyle(node);
      if (!isVisible(node, before) || numericWeight(before.fontWeight) < 600) return;

      var size = before.fontSize;
      var color = textColor(node, before);
      node.style.setProperty('font-family', expectedFamily, 'important');
      node.style.setProperty('font-weight', expectedWeight, 'important');
      node.dataset.xpBoldEnglish = 'true';
      node.dataset.xpBoldEnglishTypography = VERSION;

      var after = getComputedStyle(node);
      if (after.fontSize !== size) {
        invariantErrors.push(node.textContent.trim() + ': font-size ' + size + ' -> ' + after.fontSize);
      }
      if (textColor(node, after) !== color) {
        invariantErrors.push(
          node.textContent.trim() + ': color ' + color + ' -> ' + textColor(node, after)
        );
      }
      matched += 1;
    });

    stage.dataset.xpBoldEnglishTypography = VERSION;
    stage.dataset.xpBoldEnglishCount = String(matched);
    stage.dataset.xpBoldEnglishInvariantErrors = JSON.stringify(invariantErrors);
    root.dataset.xpBoldEnglishTypographyReady = invariantErrors.length ? 'error' : 'true';
    root.dataset.xpMixedTypographyReady = invariantErrors.length ? 'error' : 'true';
    if (invariantErrors.length) {
      throw new Error('加粗英文排版不变量失败: ' + invariantErrors.join(' | '));
    }
  }

  window.WisePPTAccentEnglishTypography = {
    version: VERSION,
    mixedVersion: MIXED_VERSION,
    apply: apply
  };
  apply();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(apply);
  document.addEventListener('wise-ppt:gallery-state-change', apply);
})();
