(function (global) {
  'use strict';

  var root = document.documentElement;
  var query = new URLSearchParams(global.location.search);
  var runtimeScript = document.currentScript;
  var runtimeBase = new URL('.', runtimeScript.src);
  var tasks = new WeakMap();
  var registeredTasks = new WeakMap();

  if (query.has('accent')) root.classList.add('accent');
  if (query.get('print') === '1') root.classList.add('print-mode');

  function loadStylesheet(name) {
    var href = new URL(name, runtimeBase).href;
    var existing = document.querySelector('link[data-wise-runtime-style="' + name + '"]');
    if (existing) return Promise.resolve(existing);
    return new Promise(function (resolve, reject) {
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.dataset.wiseRuntimeStyle = name;
      link.addEventListener('load', function () { resolve(link); }, { once: true });
      link.addEventListener('error', function () { reject(new Error('运行时样式加载失败: ' + href)); }, { once: true });
      document.head.appendChild(link);
    });
  }

  function loadRuntimeScript(name, ready) {
    if (ready()) return Promise.resolve();
    var src = new URL(name, runtimeBase).href;
    return new Promise(function (resolve, reject) {
      var script = document.createElement('script');
      script.src = src;
      script.async = false;
      script.dataset.wiseRuntimeScript = name;
      script.addEventListener('load', function () {
        if (!ready()) reject(new Error('运行时脚本未导出预期接口: ' + src));
        else resolve();
      }, { once: true });
      script.addEventListener('error', function () { reject(new Error('运行时脚本加载失败: ' + src)); }, { once: true });
      document.head.appendChild(script);
    });
  }

  var shellReady = loadStylesheet('deck-shell.css');
  var stageFitReady = loadRuntimeScript('stage-fit.js', function () { return Boolean(global.WisePPTStageFit); });
  var componentBehaviorReady = loadRuntimeScript('component-behavior.js', function () {
    return Boolean(global.WisePPTComponentBehavior);
  });

  function slides() {
    return Array.prototype.slice.call(document.querySelectorAll('#track>.slide'));
  }

  function updateDeckReady() {
    var all = slides();
    var failed = all.some(function (slide) { return slide.dataset.renderError; });
    var fontsReady = root.dataset.fontCheck === 'pass';
    var ready = fontsReady && all.length > 0 && all.every(function (slide) {
      return slide.dataset.renderReady === 'true';
    });
    root.dataset.deckReady = ready && !failed ? 'true' : 'false';
    if (failed || root.dataset.fontCheck === 'fail') root.dataset.deckError = 'true';
    else delete root.dataset.deckError;
    if (ready && !failed) document.dispatchEvent(new CustomEvent('wise-ppt:ready'));
    return ready && !failed;
  }

  function markSlideError(slide, error) {
    if (!slide) return;
    slide.dataset.renderError = error && error.message ? error.message : String(error || 'unknown error');
    delete slide.dataset.renderReady;
    updateDeckReady();
  }

  function registerSlideTask(slide, task) {
    if (!slide || !slide.classList.contains('slide')) throw new Error('registerSlideTask 需要 .slide 节点');
    var items = registeredTasks.get(slide) || [];
    items.push(Promise.resolve(task));
    registeredTasks.set(slide, items);
    slide.dataset.renderPending = 'true';
    return task;
  }

  function emphasisColor(slide, contentRef, role, fallback, options) {
    if (!slide || !root.classList.contains('accent')) return fallback;
    var roles = (slide.dataset.emphasisRoles || '').split(/\s+/).filter(Boolean);
    if (slide.dataset.emphasisMode !== 'semantic-focus' || slide.dataset.emphasisRef !== contentRef || !roles.includes(role)) return fallback;
    var target = options && options.target;
    var fontSize = options && Number.parseFloat(options.fontSize);
    if (target === 'text' && Number.isFinite(fontSize) && fontSize < 24) {
      var smallText = getComputedStyle(root).getPropertyValue('--wp-private-focus-text-small').trim();
      if (smallText) return smallText;
    }
    return color(emphasisThemeRole(role));
  }

  function emphasisThemeRole(memberRole) {
    var tiers = {
      value: 'focus', outline: 'focus', status: 'focus', symbol: 'focus',
      label: 'focus-secondary', annotation: 'focus-secondary',
      texture: 'focus-peripheral'
    };
    if (!tiers[memberRole]) throw new Error('未知语义焦点成员角色: ' + memberRole);
    return tiers[memberRole];
  }

  function bindSemanticEmphasis(slide) {
    var carriers = Array.prototype.slice.call(slide.querySelectorAll('[data-emphasis-role]'));
    carriers.forEach(function (node) {
      delete node.dataset.emphasisActive;
      delete node.dataset.emphasisTextSize;
      delete node.dataset.typographyEmphasisSize;
    });
    var mode = slide.dataset.emphasisMode || 'none';
    if (mode === 'none') return [];
    if (mode !== 'semantic-focus') throw new Error('未知页面强调模式: ' + mode);
    var contentRef = (slide.dataset.emphasisRef || '').trim();
    var reason = (slide.dataset.emphasisReason || '').trim();
    var memberRoles = (slide.dataset.emphasisRoles || '').split(/\s+/).filter(Boolean);
    if (!contentRef) throw new Error('semantic-focus 页面缺少 data-emphasis-ref');
    if (!reason) throw new Error('semantic-focus 页面缺少 data-emphasis-reason');
    if (!memberRoles.length || new Set(memberRoles).size !== memberRoles.length) throw new Error('semantic-focus 页面成员角色缺失或重复');
    memberRoles.forEach(emphasisThemeRole);
    var active = carriers.filter(function (node) {
      return node.dataset.contentRef === contentRef && memberRoles.includes(node.dataset.emphasisRole);
    });
    if (!active.length) throw new Error('semantic-focus 页面没有与 content_ref 和 member_roles 同时匹配的载体');
    active.forEach(function (node) {
      if (root.classList.contains('accent')) node.dataset.emphasisActive = 'true';
      var shapeTags = ['PATH', 'LINE', 'POLYLINE', 'POLYGON', 'CIRCLE', 'ELLIPSE', 'RECT', 'USE'];
      var fontSize = Number.parseFloat(getComputedStyle(node).fontSize);
      if (!shapeTags.includes(node.tagName) && Number.isFinite(fontSize)) {
        node.dataset.emphasisTextSize = fontSize < 24 ? 'small' : 'large';
        var minimum = typographyLargeEmphasisMinimum();
        if (minimum > 0 && fontSize >= minimum && typographyEmphasisEligible(node, slide)) {
          node.dataset.typographyEmphasisSize = 'large';
        }
      }
    });
    return active;
  }

  function color(role) {
    var roles = {
      'surface-canvas': 'wp-color-surface-canvas', 'surface-recessed': 'wp-color-surface-recessed', 'surface-panel': 'wp-color-surface-panel',
      'primary': 'wp-color-primary', 'functional': 'wp-color-functional', 'body': 'wp-color-body', 'chart-label': 'wp-color-chart-label',
      'metadata': 'wp-color-metadata', 'divider': 'wp-color-divider', 'construction': 'wp-color-construction',
      'focus': 'wp-color-focus', 'focus-secondary': 'wp-color-focus-secondary', 'focus-peripheral': 'wp-color-focus-peripheral',
      'data-1': 'wp-color-data-1', 'data-2': 'wp-color-data-2', 'data-3': 'wp-color-data-3',
      'data-4': 'wp-color-data-4', 'data-5': 'wp-color-data-5', 'data-6': 'wp-color-data-6'
    };
    var token = roles[role];
    if (!token) throw new Error('未知主题颜色角色: ' + role);
    var value = getComputedStyle(root).getPropertyValue('--' + token).trim();
    if (!value) throw new Error('主题缺少 --' + token + ' token');
    return value;
  }

  function resolvedPreset() {
    return getComputedStyle(root).getPropertyValue('--wp-theme-preset-id').trim();
  }

  function presetDefaultTypography() {
    return getComputedStyle(root).getPropertyValue('--wp-theme-default-typography-mode').trim() || 'all-sans';
  }

  function typographyLargeEmphasisMinimum() {
    var value = Number.parseFloat(getComputedStyle(root).getPropertyValue('--wp-private-typography-large-emphasis-min'));
    return Number.isFinite(value) ? value : 0;
  }

  function typographyEmphasisEligible(node, slide) {
    if (node.closest('code, pre, .mono, [data-text-kind="number"], [data-text-kind="meta"], [data-text-kind="source"], [data-text-kind="furniture"], [data-text-kind="label"]')) return false;
    return !(slide.dataset.primaryTypeRole === 'metric' && (node.matches('[data-primary-text]') || node.closest('[data-primary-text]')));
  }

  function serifTitlesActive() {
    var mode = (root.dataset.typographyMode || 'all-sans').trim();
    return mode === 'mixed' || mode === 'all-serif';
  }

  function paletteFont(role) {
    var titleRoles = ['display', 'hero', 'title', 'heading'];
    var monoRoles = ['mono', 'code', 'number', 'metric'];
    var token = monoRoles.includes(role) ? '--wp-font-mono' : '--wp-font-sans';
    if ((titleRoles.includes(role) || role === 'large-emphasis') && serifTitlesActive()) token = '--wp-font-serif';
    var value = getComputedStyle(root).getPropertyValue(token).trim();
    if (!value) throw new Error('主题缺少 ' + token + ' 字体 token');
    return value;
  }

  function assertThemePreset() {
    var computed = resolvedPreset();
    var declared = (root.dataset.themePreset || '').trim();
    if (!computed) {
      if (declared) throw new Error('当前主题未声明 appearance preset contract，不能使用外观预设属性');
      return;
    }
    if (declared && declared !== computed) throw new Error('非法 data-theme-preset: ' + declared);
    var deckTrack = document.getElementById('track');
    if (deckTrack && deckTrack.querySelector('[data-theme-preset]')) {
      throw new Error('外观预设只能声明在 deck 根节点，禁止逐页混搭');
    }
    root.dataset.themePresetResolved = computed;
    if (!root.dataset.typographyModeSource) {
      if (!(root.dataset.typographyMode || '').trim()) {
        root.dataset.typographyMode = presetDefaultTypography();
        root.dataset.typographyModeSource = 'preset-default';
      } else {
        root.dataset.typographyModeSource = 'explicit';
      }
    }
  }

  /* runtime 在 head 中加载；先解析根合同和缺省字体，逐页混搭检查在 DOM 就绪后复核。 */
  assertThemePreset();

  function resolvedEmphasisColor(target) {
    if (target.dataset.emphasisTextSize === 'small') {
      var override = getComputedStyle(target).getPropertyValue('--wp-private-focus-text-small').trim();
      if (override) return override;
    }
    return color(emphasisThemeRole(target.dataset.emphasisRole));
  }

  function normalizedCssColor(value) {
    var probe = document.createElement('span');
    probe.style.cssText = 'position:fixed;left:-9999px;color:' + value;
    document.body.appendChild(probe);
    var normalized = getComputedStyle(probe).color;
    probe.remove();
    return normalized;
  }

  function typeSize(role) {
    var allowed = [
      'display-mark', 'particle-sample', 'display', 'hero', 'title', 'metric',
      'heading', 'emphasis', 'caption', 'subheading', 'body', 'body-small',
      'micro-secondary', 'label', 'meta'
    ];
    if (!allowed.includes(role)) throw new Error('未知 paper-ink 字阶: ' + role);
    var value = Number.parseFloat(getComputedStyle(root).getPropertyValue('--type-' + role).trim());
    if (!Number.isFinite(value)) throw new Error('主题缺少 --type-' + role + ' token');
    return value;
  }

  function visitRules(ruleList, output) {
    Array.prototype.forEach.call(ruleList || [], function (rule) {
      if (rule.type === CSSRule.FONT_FACE_RULE) {
        var family = rule.style.getPropertyValue('font-family').trim().replace(/^['"]|['"]$/g, '');
        if (family) output.push({
          family: family,
          style: rule.style.getPropertyValue('font-style').trim() || 'normal',
          weight: rule.style.getPropertyValue('font-weight').trim() || '400'
        });
      } else if (rule.cssRules) {
        visitRules(rule.cssRules, output);
      } else if (rule.styleSheet) {
        /* @import stylesheets may also declare the active font sources. */
        try { visitRules(rule.styleSheet.cssRules, output); } catch (error) { /* local import not ready */ }
      }
    });
  }

  function declaredFontFaces() {
    var faces = [];
    Array.prototype.forEach.call(document.styleSheets, function (sheet) {
      try { visitRules(sheet.cssRules, faces); } catch (error) { /* only local styles are required */ }
    });
    var unique = new Map();
    faces.forEach(function (face) { unique.set([face.family, face.style, face.weight].join('|'), face); });
    var declared = Array.from(unique.values());
    if (root.dataset.wiseCatalogFonts === 'true') {
      declared = declared.filter(function (face) { return / Catalog$/.test(face.family); });
    }
    return declared;
  }

  function loadRequiredFonts() {
    if (!document.fonts || typeof document.fonts.load !== 'function') {
      return Promise.reject(new Error('浏览器不支持 FontFaceSet 加载门禁'));
    }
    root.dataset.fontCheck = 'pending';
    return Promise.all([shellReady, document.fonts.ready]).then(function () {
      var faces = declaredFontFaces();
      if (faces.length < 4) throw new Error('主题必需字体声明不完整，实际 ' + faces.length + ' 个');
      return Promise.all(faces.map(function (face) {
        var family = '"' + face.family.replace(/"/g, '\\"') + '"';
        var spec = face.style + ' ' + face.weight + ' 16px ' + family;
        var sample = face.family.indexOf('Courier Prime') === 0 ? 'Aa01' : '汉字Aa01';
        return document.fonts.load(spec, sample).then(function (loaded) {
          if (!loaded.length || loaded.some(function (font) { return font.status !== 'loaded'; })) {
            throw new Error('字体文件未真实加载: ' + face.family + ' ' + face.weight);
          }
          if (!document.fonts.check(spec, sample)) throw new Error('字体检查失败: ' + face.family + ' ' + face.weight);
          return face;
        });
      }));
    }).then(function (faces) {
      root.dataset.fontCheck = 'pass';
      root.dataset.fontFaceCount = String(faces.length);
      updateDeckReady();
      return faces;
    }).catch(function (error) {
      root.dataset.fontCheck = 'fail';
      root.dataset.fontCheckError = error.message;
      root.dataset.deckError = 'true';
      if (query.get('selftest') === '1') {
        root.dataset.runtimeCheck = 'fail';
        root.dataset.runtimeCheckError = error.message;
      }
      throw error;
    });
  }

  var fontReady = loadRequiredFonts();
  fontReady.catch(function (error) { console.error(error); });

  function assertMaterializedComponents(slide) {
    Array.prototype.forEach.call(slide.querySelectorAll('[data-layout-slot]'), function (slot) {
      var component = slot.matches('[data-component-id]') ? slot : slot.querySelector('[data-component-id]');
      if (!component) return;
      var componentId = String(component.dataset.componentId || '').trim();
      if (!componentId) throw new Error('组件槽缺少 data-component-id');
      var materialized = component.matches('[data-materialized-component-id]')
        ? component
        : component.querySelector('[data-materialized-component-id]');
      var staticFamily = componentId.indexOf('atlas.') === 0
        ? 'atlas'
        : /^native\.paper-ink\.\d{3}\.[a-z0-9-]+$/.test(componentId)
        ? 'native'
        : '';
      if (staticFamily && !materialized) {
        throw new Error(componentId + ' 在 markSlideReady 前未完成 Catalog 物化');
      }
      if (!materialized) {
        if (!component.children.length && !String(component.textContent || '').trim()) {
          throw new Error(componentId + ' 在 markSlideReady 前仍是空组件槽');
        }
        return;
      }
      if (materialized.dataset.materializedComponentId !== componentId) {
        throw new Error(componentId + ' 的物化收据 component_id 错配');
      }
      if (!materialized.children.length) throw new Error(componentId + ' 的物化 DOM 为空');
      if (staticFamily) {
        ['catalogSpec','catalogSourceSha256','catalogSnippetSha256','catalogAdapterSha256'].forEach(function (key) {
          var value = String(materialized.dataset[key] || '').trim();
          if (!value || (key !== 'catalogSpec' && !/^[a-f0-9]{64}$/.test(value))) {
            throw new Error(componentId + ' 的 Catalog 物化收据不完整: ' + key);
          }
        });
        var behavior;
        try { behavior = JSON.parse(materialized.dataset.behaviorContract || ''); }
        catch (error) { throw new Error(componentId + ' 的 behavior_contract 物化收据不是合法 JSON'); }
        var fixedMaterialization = behavior
          && behavior.render_mode === 'fixed-visual'
          && behavior.fit_mode === 'contain';
        var responsiveMaterialization = staticFamily === 'native'
          && behavior
          && behavior.render_mode === 'data-renderer'
          && behavior.fit_mode === 'renderer-responsive';
        if (!fixedMaterialization && !responsiveMaterialization) {
          throw new Error(componentId + ' 的 behavior_contract 物化收据不完整');
        }
        if (fixedMaterialization && (
          materialized.dataset.fixedComponentSource !== 'true'
          || materialized.dataset.componentMaterialization !== 'static'
        )) {
          throw new Error(componentId + ' 没有声明固定组件源码');
        }
        if (responsiveMaterialization) {
          var quantity = Number(materialized.dataset.materializedQuantity);
          var requestedQuantity = Number(component.dataset.itemCount || slot.dataset.itemCount);
          if (materialized.dataset.responsiveComponentSource !== 'true'
            || materialized.dataset.componentMaterialization !== 'quantity-bound'
            || !Number.isInteger(quantity)
            || quantity < 1
            || !Number.isInteger(requestedQuantity)
            || quantity !== requestedQuantity) {
            throw new Error(componentId + ' 的响应式物化收据不完整');
          }
        }
        var placement;
        try { placement = JSON.parse(materialized.dataset.placementContract || ''); }
        catch (error) { throw new Error(componentId + ' 的 placement_contract 物化收据不是合法 JSON'); }
        if (!placement || !/^(safe|fill)$/.test(String(placement.default || ''))) {
          throw new Error(componentId + ' 的 placement_contract 物化收据不完整');
        }
        ['materializedSnippetSha256'].forEach(function (key) {
          if (!/^[a-f0-9]{64}$/.test(String(materialized.dataset[key] || ''))) {
            throw new Error(componentId + ' 的固定源码物化收据不完整: ' + key);
          }
        });
        if (staticFamily === 'native') {
          ['catalogEntrySha256'].forEach(function (key) {
            if (!/^[a-f0-9]{64}$/.test(String(materialized.dataset[key] || ''))) {
              throw new Error(componentId + ' 的 native 物化收据不完整: ' + key);
            }
          });
        }
      }
    });
  }

  function markSlideReady(slide) {
    if (!slide || !slide.classList.contains('slide')) throw new Error('markSlideReady 需要 .slide 节点');
    assertMaterializedComponents(slide);
    if (tasks.has(slide)) return tasks.get(slide);
    var task = Promise.resolve().then(function () {
      var images = Array.prototype.map.call(slide.querySelectorAll('img'), function (img) {
        if (img.dataset.materialMode === 'source') {
          return Promise.reject(new Error('原始图片不得直接插入 DOM，请使用 data-material-mode="reconstruction"'));
        }
        if (img.complete && img.naturalWidth > 0) return Promise.resolve();
        return new Promise(function (resolve, reject) {
          img.addEventListener('load', resolve, { once: true });
          img.addEventListener('error', function () { reject(new Error('图片加载失败: ' + (img.currentSrc || img.src))); }, { once: true });
        });
      });
      return Promise.all([fontReady, componentBehaviorReady].concat(images, registeredTasks.get(slide) || []));
    }).then(function () {
      global.WisePPTComponentBehavior.mountAll(slide);
      slide.getBoundingClientRect();
      slide.dataset.renderReady = 'true';
      delete slide.dataset.renderPending;
      delete slide.dataset.renderError;
      updateDeckReady();
      return slide;
    }).catch(function (error) {
      markSlideError(slide, error);
      throw error;
    });
    tasks.set(slide, task);
    return task;
  }

  function parseDatasetBlock(block, datasetId) {
    var id = String(datasetId || '').trim();
    if (!block) throw new Error('找不到 ECharts dataset 数据块: ' + (id || '(missing id)'));
    var type = String(block.getAttribute('type') || '').toLowerCase();
    if (type !== 'application/json') throw new Error('ECharts dataset 数据块必须使用 application/json: ' + id);
    var raw = String(block.textContent || '').trim();
    if (!raw) throw new Error('ECharts dataset 数据块为空: ' + id);
    try {
      var dataset = JSON.parse(raw);
      if (dataset === null || typeof dataset !== 'object') throw new Error('dataset 必须是 JSON 对象或数组');
      return dataset;
    } catch (error) {
      throw new Error('ECharts dataset JSON 解析失败 [' + id + ']: ' + error.message);
    }
  }

  function readDataset(slide, target) {
    if (!slide || !slide.classList.contains('slide')) throw new Error('readDataset 需要 .slide 节点');
    var element = typeof target === 'string' ? slide.querySelector(target) : target;
    if (!element) throw new Error('找不到 ECharts 容器');
    if (typeof slide.contains === 'function' && !slide.contains(element)) throw new Error('ECharts 容器必须位于当前 slide 内');
    var datasetId = String(element.getAttribute('data-dataset-id') || '').trim();
    if (!datasetId) throw new Error('ECharts 容器缺少 data-dataset-id');
    var blocks = Array.prototype.filter.call(
      slide.querySelectorAll('script[type="application/json"][data-wise-ppt-dataset]'),
      function (block) { return block.getAttribute('data-wise-ppt-dataset') === datasetId; }
    );
    if (blocks.length !== 1) {
      throw new Error('ECharts dataset [' + datasetId + '] 在当前页必须且只能声明一次，实际 ' + blocks.length + ' 个');
    }
    return parseDatasetBlock(blocks[0], datasetId);
  }

  function datasetsEqual(left, right) {
    if (Object.is(left, right)) return true;
    if (left === null || right === null || typeof left !== 'object' || typeof right !== 'object') return false;
    var leftIsDate = Object.prototype.toString.call(left) === '[object Date]';
    var rightIsDate = Object.prototype.toString.call(right) === '[object Date]';
    if (leftIsDate || rightIsDate) {
      return leftIsDate && rightIsDate && left.getTime() === right.getTime();
    }
    var leftIsArray = Array.isArray(left);
    if (leftIsArray !== Array.isArray(right)) return false;
    if (leftIsArray) {
      if (left.length !== right.length) return false;
      return left.every(function (item, index) { return datasetsEqual(item, right[index]); });
    }
    var leftKeys = Object.keys(left).sort();
    var rightKeys = Object.keys(right).sort();
    if (leftKeys.length !== rightKeys.length) return false;
    return leftKeys.every(function (key, index) {
      return key === rightKeys[index] && datasetsEqual(left[key], right[key]);
    });
  }

  function cloneChartOption(value, seen, active) {
    if (value === null || typeof value !== 'object') return value;
    var visited = seen || new WeakMap();
    var visiting = active || new WeakSet();
    if (visiting.has(value)) {
      throw new Error('ECharts option 不支持循环引用');
    }
    if (visited.has(value)) return visited.get(value);
    if (Object.prototype.toString.call(value) === '[object Date]') return new Date(value.getTime());
    if (Array.isArray(value)) {
      var list = [];
      visited.set(value, list);
      visiting.add(value);
      value.forEach(function (item) { list.push(cloneChartOption(item, visited, visiting)); });
      visiting.delete(value);
      return list;
    }
    var prototype = Object.getPrototypeOf(value);
    if (
      Object.prototype.toString.call(value) !== '[object Object]' ||
      (prototype !== null && Object.getPrototypeOf(prototype) !== null)
    ) {
      throw new Error('ECharts option 仅支持普通对象、数组、基础值、Date 与回调函数');
    }
    var clone = {};
    visited.set(value, clone);
    visiting.add(value);
    Object.keys(value).forEach(function (key) {
      clone[key] = cloneChartOption(value[key], visited, visiting);
    });
    visiting.delete(value);
    return clone;
  }

  function protectedChartContract(option, referenceOption) {
    var compareToReference = arguments.length > 1;
    var textContainers = new Set([
      'textStyle', 'axisLabel', 'nameTextStyle', 'axisName', 'label',
      'dayLabel', 'monthLabel', 'yearLabel', 'subtextStyle', 'pageTextStyle',
      'edgeLabel', 'endLabel', 'upperLabel'
    ]);
    var paintContainers = new Set([
      'lineStyle', 'itemStyle', 'areaStyle', 'backgroundStyle',
      'inRange', 'outOfRange'
    ]);
    var textLeaves = new Set([
      'color', 'fontFamily', 'fontSize', 'fontStyle', 'fontWeight', 'lineHeight',
      'textBorderColor', 'textBorderWidth', 'textShadowColor', 'textShadowBlur',
      'textShadowOffsetX', 'textShadowOffsetY', 'backgroundColor',
      'borderColor', 'borderWidth', 'borderType', 'borderRadius', 'opacity',
      'shadowBlur', 'shadowColor', 'shadowOffsetX', 'shadowOffsetY'
    ]);
    var paintLeaves = new Set([
      'color', 'backgroundColor', 'borderColor', 'borderWidth', 'borderType',
      'borderRadius', 'borderDashOffset', 'borderCap', 'borderJoin',
      'borderMiterLimit', 'opacity', 'shadowBlur', 'shadowColor',
      'shadowOffsetX', 'shadowOffsetY', 'decal'
    ]);
    var graphicLeaves = new Set([
      'fill', 'stroke', 'lineWidth', 'lineDash', 'lineDashOffset', 'lineCap',
      'lineJoin', 'miterLimit', 'fillOpacity', 'strokeOpacity', 'opacity',
      'shadowBlur', 'shadowColor', 'shadowOffsetX', 'shadowOffsetY', 'decal',
      'font', 'fontFamily', 'fontSize', 'fontStyle', 'fontWeight', 'lineHeight',
      'textFill', 'textStroke', 'textStrokeWidth', 'textShadowColor',
      'textShadowBlur', 'textShadowOffsetX', 'textShadowOffsetY'
    ]);
    var chartLayoutLeaves = new Set([
      'left', 'right', 'top', 'bottom', 'width', 'height', 'center', 'radius', 'cellSize',
      'length', 'length2'
    ]);
    var opaqueStructuralKeys = new Set([
      'dataset', 'data', 'encode', 'links', 'nodes', 'categories',
      'indicator', 'pieces'
    ]);

    function tail(path) {
      var match = path.match(/\.([^.[\]]+)$/);
      return match ? match[1] : '';
    }

    function isVisualLeaf(path, key, allowVisual) {
      if (!allowVisual) return false;
      var container = tail(path);
      if (path === '$' && (key === 'color' || key === 'backgroundColor')) return true;
      if (/^\$\.(?:series|calendar)(?:\[\d+\])?$/.test(path) && chartLayoutLeaves.has(key)) return true;
      if (tail(path) === 'labelLine' && chartLayoutLeaves.has(key)) return true;
      if (container === 'tooltip') {
        return paintLeaves.has(key) || textLeaves.has(key);
      }
      if (textContainers.has(container) && textLeaves.has(key)) return true;
      if (paintContainers.has(container) && paintLeaves.has(key)) return true;
      if (
        container === 'style' &&
        /(?:^|\.)graphic(?:\[|\.|$)/.test(path) &&
        graphicLeaves.has(key)
      ) return true;
      if (/(?:^|\.)rich\.[^.[\]]+$/.test(path)) {
        return textLeaves.has(key) || paintLeaves.has(key);
      }
      if (container === 'lineStyle' && ['width', 'type', 'cap', 'join', 'dashOffset', 'miterLimit'].includes(key)) return true;
      return false;
    }

    function protectedTooltipCssText(value, reference, hasReference) {
      var adaptedText = String(value || '');
      if (!hasReference) {
        return adaptedText === 'box-shadow:none;' ? undefined : (adaptedText || undefined);
      }
      var sourceText = String(reference || '');
      if (adaptedText === sourceText) return sourceText || undefined;
      var separator = sourceText && !/;\s*$/.test(sourceText) ? ';' : '';
      if (adaptedText === sourceText + separator + 'box-shadow:none;') {
        return sourceText || undefined;
      }
      return adaptedText || undefined;
    }

    function visit(value, path, allowVisual, reference, active) {
      if (value === null || typeof value !== 'object') return value;
      if (Object.prototype.toString.call(value) === '[object Date]') return new Date(value.getTime());
      var visiting = active || new WeakSet();
      if (visiting.has(value)) throw new Error('ECharts option 不支持循环引用');
      visiting.add(value);
      if (Array.isArray(value)) {
        var mapped = value.map(function (item, index) {
          var referenceItem = Array.isArray(reference) ? reference[index] : undefined;
          return visit(item, path + '[' + index + ']', allowVisual, referenceItem, visiting);
        });
        visiting.delete(value);
        return mapped;
      }
      var output = {};
      Object.keys(value).sort().forEach(function (key) {
        if (tail(path) === 'tooltip' && key === 'extraCssText') {
          var hasReference = !!reference && Object.prototype.hasOwnProperty.call(reference, key);
          var protectedCss = compareToReference
            ? protectedTooltipCssText(
              value[key],
              hasReference ? reference[key] : undefined,
              hasReference
            )
            : (String(value[key] || '') || undefined);
          if (protectedCss !== undefined) output[key] = protectedCss;
          return;
        }
        if (isVisualLeaf(path, key, allowVisual)) return;
        var childPath = path + '.' + key;
        var childReference = reference && Object.prototype.hasOwnProperty.call(reference, key)
          ? reference[key]
          : undefined;
        var child = visit(
          value[key],
          childPath,
          allowVisual && !opaqueStructuralKeys.has(key),
          childReference,
          visiting
        );
        if (child !== undefined) output[key] = child;
      });
      visiting.delete(value);
      return Object.keys(output).length ? output : undefined;
    }

    return visit(option, '$', true, referenceOption, new WeakSet()) || {};
  }

  function adaptEChartOption(slide, element, option) {
    var adapterId = String(element.getAttribute('data-theme-adapter-id') || '').trim();
    if (!adapterId) throw new Error('ECharts 容器缺少 data-theme-adapter-id');
    var registry = global.WisePPTThemeAdapters;
    var adapter = registry && Object.prototype.hasOwnProperty.call(registry, adapterId) ? registry[adapterId] : null;
    if (!adapter || typeof adapter.adaptOption !== 'function') {
      throw new Error('未知或未加载的 ECharts 主题 adapter: ' + adapterId);
    }
    var optionClone = cloneChartOption(option);
    var optionReference = cloneChartOption(optionClone);
    var before = protectedChartContract(optionReference);
    var adapted = adapter.adaptOption(optionClone, {
      adapterId: adapterId,
      slide: slide,
      element: element,
      root: root,
      color: color,
      typeSize: typeSize
    });
    if (!adapted || typeof adapted !== 'object' || Array.isArray(adapted)) {
      throw new Error('ECharts 主题 adapter 必须返回 option clone: ' + adapterId);
    }
    if (adapted === option) {
      throw new Error('ECharts 主题 adapter 不得返回调用方原始 option: ' + adapterId);
    }
    adapted = cloneChartOption(adapted);
    var after = protectedChartContract(adapted, optionReference);
    if (!datasetsEqual(before, after)) {
      throw new Error('ECharts 主题 adapter 改写了受保护的数据或结构字段: ' + adapterId);
    }
    return adapted;
  }

  function createEChart(slide, target, option) {
    var rejectRender;
    try {
      var element = typeof target === 'string' ? slide.querySelector(target) : target;
      if (!element) throw new Error('找不到 ECharts 容器');
      var declaredDataset = readDataset(slide, element);
      if (!option || typeof option !== 'object' || !Object.prototype.hasOwnProperty.call(option, 'dataset')) {
        throw new Error('ECharts option 缺少 dataset');
      }
      if (!datasetsEqual(option.dataset, declaredDataset)) {
        throw new Error('ECharts option.dataset 与页面 JSON 数据块不一致: ' + element.getAttribute('data-dataset-id'));
      }
      var adaptedOption = adaptEChartOption(slide, element, option);
      if (!datasetsEqual(adaptedOption.dataset, declaredDataset)) {
        throw new Error('ECharts 主题 adapter 改写了页面 dataset: ' + element.getAttribute('data-theme-adapter-id'));
      }
      if (!global.echarts) throw new Error('ECharts 未加载');
      var chart = global.echarts.init(element, null, { renderer:'svg' });
      var settled = false;
      var rendered = new Promise(function (resolve, reject) {
        var timer = setTimeout(function () {
          if (!settled) { settled = true; reject(new Error('ECharts 渲染超时')); }
        }, 8000);
        rejectRender = function (error) {
          if (!settled) { settled = true; clearTimeout(timer); reject(error); }
        };
        chart.on('finished', function () {
          if (!settled) { settled = true; clearTimeout(timer); resolve(chart); }
        });
      });
      registerSlideTask(slide, rendered);
      markSlideReady(slide);
      chart.setOption(adaptedOption);
      var adapterId = String(element.getAttribute('data-theme-adapter-id') || '').trim();
      var adapterRegistry = global.WisePPTThemeAdapters;
      var themeAdapter = adapterRegistry && Object.prototype.hasOwnProperty.call(adapterRegistry, adapterId)
        ? adapterRegistry[adapterId]
        : null;
      if (themeAdapter && typeof themeAdapter.annotateRenderedText === 'function') {
        themeAdapter.annotateRenderedText(chart);
      }
      if (typeof global.ResizeObserver === 'function') {
        var resizeQueued = false;
        var observer = new global.ResizeObserver(function () {
          if (resizeQueued) return;
          resizeQueued = true;
          global.requestAnimationFrame(function () {
            resizeQueued = false;
            if (chart.isDisposed && chart.isDisposed()) return;
            chart.resize();
            chart.setOption(adaptEChartOption(slide, element, option), { notMerge: true, lazyUpdate: true });
          });
        });
        observer.observe(element);
        element.__wisePptEChartResizeObserver = observer;
      }
      return chart;
    } catch (error) {
      if (rejectRender) rejectRender(error);
      markSlideError(slide, error);
      throw error;
    }
  }

  var ICON_PATHS = Object.freeze({
    gallery: Object.freeze([
      'M3.5 4.5h6v6h-6z',
      'M14.5 4.5h6v6h-6z',
      'M3.5 15.5h6v6h-6z',
      'M14.5 15.5h6v6h-6z'
    ])
  });

  function createIcon(name, attributes) {
    var paths = ICON_PATHS[name];
    if (!paths) throw new Error('未知本地图标: ' + name);
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    svg.dataset.iconName = name;
    Object.keys(attributes || {}).forEach(function (key) { svg.setAttribute(key, attributes[key]); });
    paths.forEach(function (pathData) {
      var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', pathData);
      svg.appendChild(path);
    });
    return svg;
  }

  function hydrateIcons(scope) {
    (scope || document).querySelectorAll('[data-icon]').forEach(function (node) {
      if (!node.querySelector('svg[data-icon-name]')) node.prepend(createIcon(node.dataset.icon));
    });
  }

  global.WisePPT = {
    markSlideReady: markSlideReady,
    markSlideError: markSlideError,
    registerSlideTask: registerSlideTask,
    parseDatasetBlock: parseDatasetBlock,
    readDataset: readDataset,
    adaptEChartOption: adaptEChartOption,
    createEChart: createEChart,
    emphasisColor: emphasisColor,
    bindSemanticEmphasis: bindSemanticEmphasis,
    color: color,
    paletteFont: paletteFont,
    typeSize: typeSize,
    updateDeckReady: updateDeckReady,
    createIcon: createIcon,
    icons: ICON_PATHS,
    fontReady: fontReady,
    componentBehaviorReady: componentBehaviorReady
  };

  function initialize() {
    var body = document.body;
    var track = document.getElementById('track');
    var board = document.getElementById('board-sections');
    var pager = document.getElementById('pager');
    var deckStage = document.getElementById('deck-stage');
    var current = 0;
    var touchStartX = null;
    var selfTestStarted = false;
    if (!track || !board || !deckStage) return;

    hydrateIcons(document);
    allSlides().forEach(bindSemanticEmphasis);

    function allSlides() { return Array.prototype.slice.call(track.querySelectorAll(':scope>.slide')); }
    function clamp(number) { return Math.max(0, Math.min(allSlides().length - 1, number)); }
    function hasTextSelection() {
      var selection = global.getSelection && global.getSelection();
      return Boolean(selection && !selection.isCollapsed && selection.toString().trim());
    }
    function hasEditableTarget(target) {
      return Boolean(target && target.closest && target.closest('input,textarea,select,button,[contenteditable="true"]'));
    }
    function navigationIsReserved(event) {
      return event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey || hasEditableTarget(event.target) || hasTextSelection();
    }
    function copyCanvasPixels(original, clone) {
      var originals = original.querySelectorAll('canvas');
      var clones = clone.querySelectorAll('canvas');
      originals.forEach(function (canvas, index) {
        var target = clones[index];
        if (!target) return;
        target.width = canvas.width;
        target.height = canvas.height;
        try {
          target.getContext('2d').drawImage(canvas, 0, 0);
          target.dataset.canvasCopied='true';
        } catch (error) {
          target.dataset.canvasCopied = 'error';
        }
      });
    }
    function cloneSlide(slide) {
      var clone = slide.cloneNode(true);
      clone.querySelectorAll('script').forEach(function (script) { script.remove(); });
      clone.removeAttribute('id');
      clone.querySelectorAll('[id]').forEach(function (node) { node.removeAttribute('id'); });
      clone.classList.add('board-clone');
      clone.setAttribute('aria-hidden','true');
      clone.inert=true;
      copyCanvasPixels(slide, clone);
      return clone;
    }
    function makeCard(slide, index) {
      var card = document.createElement('button');
      card.type = 'button';
      card.className = 'board-card';
      card.dataset.index = String(index);
      var preview = document.createElement('div');
      preview.className = 'board-preview';
      preview.appendChild(cloneSlide(slide));
      var title = document.createElement('div');
      title.className = 'board-title';
      title.textContent = 'S' + String(index + 1).padStart(2, '0') + ' · ' + slide.dataset.pageTitle;
      title.title = title.textContent;
      var summary = document.createElement('div');
      summary.className = 'board-summary';
      summary.textContent = slide.dataset.pageSummary;
      summary.title = summary.textContent || '';
      card.append(preview, title, summary);
      card.addEventListener('click', function () { enterDeck(index); });
      return card;
    }
    function syncScales() {
      board.querySelectorAll('.board-preview').forEach(function (preview) {
        preview.style.setProperty('--board-scale', String(preview.clientWidth / 1920));
      });
    }
    function rebuildBoard() {
      board.replaceChildren();
      var groups = new Map();
      allSlides().forEach(function (slide, index) {
        var key = slide.dataset.sectionId || 'section.default';
        if (!groups.has(key)) groups.set(key, { title: slide.dataset.sectionTitle || '', items: [] });
        groups.get(key).items.push([slide, index]);
      });
      groups.forEach(function (group) {
        var label = document.createElement('div');
        label.className = 'section-label';
        label.textContent = group.title;
        var grid = document.createElement('div');
        grid.className = 'board-grid';
        group.items.forEach(function (item) { grid.appendChild(makeCard(item[0], item[1])); });
        board.append(label, grid);
      });
      var deckTitle = document.getElementById('deck-title');
      var subtitle = document.getElementById('deck-subtitle');
      if (deckTitle) deckTitle.textContent = root.dataset.deckTitle || document.title;
      if (subtitle) subtitle.textContent = allSlides().length + ' SLIDES · 点击任意页面进入横向放映';
      var active = board.querySelector('[data-index="' + current + '"]');
      if (active) active.classList.add('active');
      syncScales();
      requestAnimationFrame(syncScales);
    }
    function fit() {
      return global.WisePPTStageFit.fitDeck(deckStage, { allowUpscale: false });
    }
    function go(index, updateHash) {
      current = clamp(index);
      track.style.transform = 'translate3d(' + (-current * 1920) + 'px,0,0)';
      if (pager) pager.textContent = (current + 1) + ' / ' + allSlides().length;
      if (updateHash !== false) history.replaceState(null, '', '#' + (current + 1));
    }
    function enterDeck(index, updateHash) {
      body.className = 'mode-deck';
      fit();
      go(index, updateHash);
      scrollTo(0, 0);
      showControls();
    }
    function exitDeck() {
      body.className = 'mode-board';
      showControls();
      history.replaceState(null, '', location.pathname + location.search);
      rebuildBoard();
      var card = board.querySelector('[data-index="' + current + '"]');
      if (card) card.scrollIntoView({ block: 'center' });
    }
    /* 放映控制自动隐藏：deck 模式下静止 1.5s 淡出，任何输入即恢复 */
    var controls = document.getElementById('presentation-controls');
    var controlsTimer = null;
    function showControls() {
      if (!controls) return;
      controls.classList.remove('controls-idle');
      clearTimeout(controlsTimer);
      if (body.classList.contains('mode-deck')) {
        controlsTimer = setTimeout(function () { controls.classList.add('controls-idle'); }, 1500);
      }
    }
    ['mousemove', 'touchstart', 'keydown'].forEach(function (type) {
      addEventListener(type, showControls, { passive: true });
    });
    function fromHash() {
      var match = location.hash.match(/^#(\d+)$/);
      if (match) enterDeck(Number(match[1]) - 1, false);
      else if (!root.classList.contains('print-mode')) {
        if (query.get('board') !== '1') {
          enterDeck(0, false);
        } else {
          body.className = 'mode-board';
          rebuildBoard();
        }
      }
    }
    function dispatchKey(target, key) {
      target.dispatchEvent(new KeyboardEvent('keydown', { key: key, bubbles: true, cancelable: true }));
    }
    function selectText(target) {
      var range = document.createRange();
      var selection = global.getSelection();
      range.selectNodeContents(target);
      selection.removeAllRanges();
      selection.addRange(range);
      return selection;
    }
    function testEditableReservation(slide, index, kind) {
      go(index);
      var node = document.createElement(kind === 'input' ? 'input' : 'div');
      if (kind === 'input') node.value = 'editable';
      else { node.contentEditable = 'true'; node.textContent = 'editable'; }
      node.setAttribute('aria-label', 'runtime editable test');
      slide.appendChild(node);
      node.focus();
      var before = location.hash;
      dispatchKey(node, 'ArrowRight');
      var held = location.hash === before;
      node.remove();
      if (!held) throw new Error(kind + ' 编辑态被翻页快捷键抢占');
    }
    function assertRelativeRuntimeAssets() {
      var themeLink = document.querySelector('link[rel="stylesheet"]:not([data-wise-runtime-style])');
      var authored = [themeLink && themeLink.getAttribute('href'), runtimeScript.getAttribute('src')];
      authored.forEach(function (value) {
        if (!value || /^(?:[a-z]+:|\/)/i.test(value)) throw new Error('Deck 资源必须使用相对路径: ' + value);
      });
      document.querySelectorAll('[data-wise-runtime-style],[data-wise-runtime-script]').forEach(function (node) {
        var value = node.href || node.src;
        if (new URL(value, document.baseURI).protocol !== location.protocol) throw new Error('运行时资源协议不一致: ' + value);
      });
      root.dataset.resourceCheck = 'pass';
    }
    function assertViewportFit() {
      var result = fit();
      if (!global.WisePPTStageFit.contains(result.bounds, result.rect, 1)) {
        throw new Error('1920×1080 舞台超出可视视口: viewport=' + [result.bounds.left, result.bounds.top, result.bounds.width, result.bounds.height].join(',') + ' rect=' + [result.rect.left, result.rect.top, result.rect.width, result.rect.height].join(','));
      }
      allSlides().forEach(function (slide) {
        var stage = slide.querySelector(':scope>.stage');
        if (!stage) throw new Error('slide 缺少直属 .stage');
        if (slide.style.transform || stage.style.transform) throw new Error('正式 slide/stage 禁止 inline transform');
        if (getComputedStyle(stage).transform !== 'none') throw new Error('正式 .stage 发生二次缩放');
      });
      root.dataset.viewportFitCheck = 'pass';
    }
    function assertControls() {
      var controls = document.getElementById('presentation-controls');
      var toggle = document.getElementById('board-toggle');
      if (!controls || !toggle || !toggle.querySelector('svg[data-icon-name="gallery"]')) throw new Error('放映控件缺少本地语义 SVG');
      [toggle, pager].forEach(function (node) {
        var rect = node.getBoundingClientRect();
        if (rect.width < 40 || rect.height < 40) throw new Error('放映控件触控区小于 40px');
      });
      var bounds = global.WisePPTStageFit.viewportBounds();
      if (!global.WisePPTStageFit.contains(bounds, controls.getBoundingClientRect(), 1)) throw new Error('放映控件超出安全区');
      var style = getComputedStyle(toggle);
      if (style.backgroundColor === 'rgb(25, 25, 23)') throw new Error('放映控件不得使用深色胶囊');
      root.dataset.controlsCheck = 'pass';
    }
    function structureNumber(value) {
      return typeof value === 'number' && Number.isFinite(value) && !Number.isNaN(value);
    }
    function structureWeightsEqual(weights) {
      return weights.slice(1).every(function (value) { return Math.abs(value - weights[0]) <= 1e-9; });
    }
    function structureNumberText(value) {
      return Math.abs(value - Math.round(value)) <= 1e-9 ? String(Math.round(value)) : value.toFixed(6).replace(/0+$/, '').replace(/\.$/, '');
    }
    function structureRatioText(weights) {
      var minimum = Math.min.apply(null, weights);
      var normalized = weights.map(function (value) { return value / minimum; });
      if (normalized.every(function (value) { return Math.abs(value - Math.round(value)) <= 1e-9; })) {
        return normalized.map(function (value) { return String(Math.round(value)); }).join(':');
      }
      return weights.map(structureNumberText).join(':');
    }
    function structureSplitText(node) {
      var direction = node.axis === 'x' ? '左右' : '上下';
      return structureWeightsEqual(node.weights)
        ? direction + node.weights.length + '等分'
        : direction + structureRatioText(node.weights);
    }
    function structureChildLabels(axis, count) {
      if (axis === 'x') {
        if (count === 2) return ['左', '右'];
        if (count === 3) return ['左', '中', '右'];
        return Array.from({length:count}, function (_, index) { return '第' + (index + 1) + '列'; });
      }
      if (count === 2) return ['上', '下'];
      if (count === 3) return ['上', '中', '下'];
      return Array.from({length:count}, function (_, index) { return '第' + (index + 1) + '行'; });
    }
    function structureGridShape(tree) {
      if (tree.type !== 'split' || tree.axis !== 'x' || tree.gap !== 0 || !structureWeightsEqual(tree.weights)) return null;
      var columns = tree.children;
      if (!columns.length || columns.some(function (child) { return child.type !== 'split' || child.axis !== 'y'; })) return null;
      var first = columns[0], rows = first.children.length;
      if (rows < 2 || first.gap !== 0) return null;
      for (var c = 0; c < columns.length; c += 1) {
        var column = columns[c];
        if (column.children.length !== rows || column.children.some(function (child) { return child.type !== 'slot'; })) return null;
        if (!structureWeightsEqual(column.weights) || JSON.stringify(column.weights) !== JSON.stringify(first.weights) || column.gap !== first.gap) return null;
      }
      return [rows, columns.length];
    }
    function structureSummary(tree) {
      if (tree.type === 'slot') return '单区';
      var shape = structureGridShape(tree);
      if (shape) return '网格' + shape[0] + '×' + shape[1];
      var parts = [structureSplitText(tree)];
      var labels = structureChildLabels(tree.axis, tree.children.length);
      tree.children.forEach(function (child, index) {
        if (child.type === 'split') parts.push(labels[index] + '·' + structureSplitText(child));
      });
      return parts.join(' / ');
    }
    function assertStructureContract(contract, slide, pageNo) {
      var relationPage = !slide.dataset.templateId;
      var coverageRequired = root.dataset.structureContractVersion === '1';
      if (!relationPage) {
        if (Object.prototype.hasOwnProperty.call(contract, 'structure')) throw new Error('第 ' + pageNo + ' 页非关系模板不得声明 structure');
        return {};
      }
      if (!Object.prototype.hasOwnProperty.call(contract, 'structure')) {
        if (coverageRequired) throw new Error('第 ' + pageNo + ' 页关系页几何契约缺少 structure 树');
        return {};
      }
      var tree = contract.structure;
      var bounds = contract.content_region || {};
      var expectedBounds = {x:120, y:131, width:1680, height:750};
      if (Object.keys(expectedBounds).some(function (key) { return bounds[key] !== expectedBounds[key]; })) {
        throw new Error('第 ' + pageNo + ' 页最终槽越出固定内容区 x=120、y=131、1680×750');
      }
      var slotIds = [];
      var leafRects = {};
      function overlap(a, b) {
        return a.x < b.x + b.width - 1e-7 && b.x < a.x + a.width - 1e-7 && a.y < b.y + b.height - 1e-7 && b.y < a.y + a.height - 1e-7;
      }
      function walk(node, rect, splitDepth) {
        if (!node || typeof node !== 'object' || Array.isArray(node)) throw new Error('第 ' + pageNo + ' 页结构节点必须是对象');
        if (node.type === 'slot') {
          if (Object.keys(node).sort().join('|') !== 'content_group|slot_id|type') throw new Error('第 ' + pageNo + ' 页最终槽只能包含 type/slot_id/content_group');
          if (typeof node.slot_id !== 'string' || !node.slot_id.trim()) throw new Error('第 ' + pageNo + ' 页最终槽缺少 slot_id');
          if (slotIds.includes(node.slot_id)) throw new Error('第 ' + pageNo + ' 页 slot_id 重复: ' + node.slot_id);
          if (typeof node.content_group !== 'string' || !node.content_group.trim()) throw new Error('第 ' + pageNo + ' 页最终槽[' + node.slot_id + ']缺少 content_group');
          if (rect.width <= 0 || rect.height <= 0 || rect.x < bounds.x - 1e-7 || rect.y < bounds.y - 1e-7 || rect.x + rect.width > bounds.x + bounds.width + 1e-7 || rect.y + rect.height > bounds.y + bounds.height + 1e-7) {
            throw new Error('第 ' + pageNo + ' 页最终槽[' + node.slot_id + ']越出内容区');
          }
          slotIds.push(node.slot_id);
          leafRects[node.slot_id] = {x:rect.x, y:rect.y, width:rect.width, height:rect.height};
          return;
        }
        if (node.type !== 'split') throw new Error('第 ' + pageNo + ' 页未知结构节点类型: ' + String(node.type));
        if (Object.keys(node).sort().join('|') !== 'axis|children|gap|type|weights') throw new Error('第 ' + pageNo + ' 页拆分节点只能包含 type/axis/weights/gap/children');
        if (splitDepth >= 2) throw new Error('第 ' + pageNo + ' 页结构超过两层拆分；请拆页');
        if (node.axis !== 'x' && node.axis !== 'y') throw new Error('第 ' + pageNo + ' 页拆分 axis 只能是 x 或 y');
        if (!Array.isArray(node.children) || node.children.length < 2) throw new Error('第 ' + pageNo + ' 页每次拆分必须有 2 个以上子区');
        if (!Array.isArray(node.weights) || node.weights.length !== node.children.length) throw new Error('第 ' + pageNo + ' 页 weights 必须明确，且数量与 children 一致');
        if (node.weights.some(function (weight) { return !structureNumber(weight) || weight <= 0; })) throw new Error('第 ' + pageNo + ' 页 weights 必须是明确的正数比例');
        if (!structureNumber(node.gap) || node.gap < 0) throw new Error('第 ' + pageNo + ' 页 gap 必须是非负有限数字');
        var axisLength = node.axis === 'x' ? rect.width : rect.height;
        var usable = axisLength - node.gap * (node.children.length - 1);
        if (usable <= 0) throw new Error('第 ' + pageNo + ' 页槽间距吃掉了全部可用空间');
        var total = node.weights.reduce(function (sum, weight) { return sum + weight; }, 0);
        var cursor = node.axis === 'x' ? rect.x : rect.y;
        var childRects = [];
        node.children.forEach(function (child, index) {
          var length = usable * node.weights[index] / total;
          var childRect = node.axis === 'x'
            ? {x:cursor, y:rect.y, width:length, height:rect.height}
            : {x:rect.x, y:cursor, width:rect.width, height:length};
          childRects.push(childRect);
          walk(child, childRect, splitDepth + 1);
          cursor += length + (index < node.children.length - 1 ? node.gap : 0);
        });
        for (var left = 0; left < childRects.length; left += 1) for (var right = left + 1; right < childRects.length; right += 1) {
          if (overlap(childRects[left], childRects[right])) throw new Error('第 ' + pageNo + ' 页兄弟槽发生重叠');
        }
      }
      walk(tree, bounds, 0);
      var expected = structureSummary(tree);
      if (contract.primitive !== expected) throw new Error('第 ' + pageNo + ' 页 primitive 与 structure 不一致: 应为 ' + expected + '，实际 ' + contract.primitive);
      slide.dataset.structureContractCheck = 'pass';
      return leafRects;
    }
    function assertGeometryContract(slide, pageNo) {
      var sources = slide.querySelectorAll('script[type="application/json"][data-geometry-contract]');
      var coverageRequired = root.dataset.geometryContractVersion === '1';
      if (!sources.length) {
        if (coverageRequired) throw new Error('第 ' + pageNo + ' 页缺少 data-geometry-contract');
        slide.dataset.geometryContractCheck = 'not-applicable';
        return;
      }
      if (sources.length !== 1) throw new Error('第 ' + pageNo + ' 页必须且只能声明一个几何契约');
      var source = sources[0];
      var contract;
      try { contract = JSON.parse(source.textContent); }
      catch (error) { throw new Error('第 ' + pageNo + ' 页几何契约不是合法 JSON: ' + error.message); }
      if (!contract || typeof contract !== 'object' || Array.isArray(contract)) throw new Error('第 ' + pageNo + ' 页几何契约顶层必须是对象');
      var topLevelKeys = ['format', 'primitive', 'structure', 'canvas', 'content_region', 'anchors', 'relations'];
      var unknownTopLevelKeys = Object.keys(contract).filter(function (key) { return !topLevelKeys.includes(key); });
      if (unknownTopLevelKeys.length) throw new Error('第 ' + pageNo + ' 页几何契约包含未知字段: ' + unknownTopLevelKeys.join(','));
      if (contract.format !== 'wise-ppt-geometry@1') throw new Error('第 ' + pageNo + ' 页几何契约版本错误');
      if (typeof contract.primitive !== 'string' || !contract.primitive.trim()) throw new Error('第 ' + pageNo + ' 页几何契约缺少 primitive');
      if (!contract.canvas || contract.canvas.width !== 1920 || contract.canvas.height !== 1080) throw new Error('第 ' + pageNo + ' 页几何画布必须为 1920×1080');
      if (!Array.isArray(contract.anchors) || !contract.anchors.length) throw new Error('第 ' + pageNo + ' 页几何契约必须声明 anchors');
      if (!Array.isArray(contract.relations) || !contract.relations.length) throw new Error('第 ' + pageNo + ' 页几何契约必须声明 relations');
      var structureLeaves = assertStructureContract(contract, slide, pageNo);

      var relationArity = {
        contain: 2, hardBoundary: 2, avoid: 2, clear: 2, pathClear: 2, ownerOverlap: 2,
        edgeEq: 2, bottomEq: 2, offsetEq: 2, centerEq: 2, centerBetween: 3, mirrorEq: 3, pathAnchor: 2
      };
      var boundaryRelationTypes = ['contain', 'hardBoundary', 'avoid', 'clear', 'pathClear', 'ownerOverlap'];
      var alignmentRelationTypes = ['edgeEq', 'bottomEq', 'offsetEq', 'centerEq', 'centerBetween', 'mirrorEq', 'pathAnchor'];
      var relationPriorities = [];
      var relationIds = [];
      var declaredAnchorIds = [];

      contract.anchors.forEach(function (anchor) {
        if (!anchor || typeof anchor !== 'object' || Array.isArray(anchor)) throw new Error('第 ' + pageNo + ' 页 anchor 必须是对象');
        var unknownAnchorKeys = Object.keys(anchor).filter(function (key) { return !['anchor_id', 'selector'].includes(key); });
        if (unknownAnchorKeys.length) throw new Error('第 ' + pageNo + ' 页 anchor 包含未知字段: ' + unknownAnchorKeys.join(','));
        if (typeof anchor.anchor_id !== 'string' || !anchor.anchor_id) throw new Error('第 ' + pageNo + ' 页 anchor 缺少 anchor_id');
        if (anchor.selector !== '[data-anchor-id="' + anchor.anchor_id + '"]') throw new Error('第 ' + pageNo + ' 页 anchor[' + anchor.anchor_id + '] selector 必须由 anchor_id 唯一推导');
        if (declaredAnchorIds.includes(anchor.anchor_id)) throw new Error('第 ' + pageNo + ' 页 anchor_id 重复: ' + anchor.anchor_id);
        declaredAnchorIds.push(anchor.anchor_id);
      });

      if (!contract.content_region || typeof contract.content_region !== 'object' || Array.isArray(contract.content_region)) throw new Error('第 ' + pageNo + ' 页 content_region 非法');
      var expectedRegionKeys = Object.prototype.hasOwnProperty.call(contract, 'structure')
        ? 'anchor_id|height|width|x|y|zone'
        : 'anchor_id|zone';
      if (Object.keys(contract.content_region).sort().join('|') !== expectedRegionKeys) throw new Error('第 ' + pageNo + ' 页 content_region 字段与结构合同不一致');
      if (!declaredAnchorIds.includes(contract.content_region.anchor_id)) throw new Error('第 ' + pageNo + ' 页 content_region 引用未知 anchor[' + contract.content_region.anchor_id + ']');

      contract.relations.forEach(function (relation) {
        if (!relation || typeof relation !== 'object' || Array.isArray(relation)) throw new Error('第 ' + pageNo + ' 页 relation 必须是对象');
        if (typeof relation.relation_id !== 'string' || !relation.relation_id) throw new Error('第 ' + pageNo + ' 页存在无 ID 的几何关系');
        if (relationIds.includes(relation.relation_id)) throw new Error('第 ' + pageNo + ' 页 relation_id 重复: ' + relation.relation_id);
        relationIds.push(relation.relation_id);
        if (!Object.prototype.hasOwnProperty.call(relationArity, relation.type)) throw new Error('第 ' + pageNo + ' 页关系[' + relation.relation_id + '] 类型未知: ' + relation.type);
        var allowedRelationKeys = ['relation_id', 'type', 'anchors', 'tolerance'];
        if (['avoid', 'clear', 'pathClear'].includes(relation.type)) allowedRelationKeys.push('min_gap');
        else if (relation.type === 'contain') allowedRelationKeys.push('shape', 'inset');
        else if (relation.type === 'ownerOverlap') allowedRelationKeys.push('reason');
        else if (['edgeEq', 'hardBoundary'].includes(relation.type)) allowedRelationKeys.push('edge');
        else if (relation.type === 'offsetEq') allowedRelationKeys.push('axis', 'offset');
        else if (['centerEq', 'centerBetween', 'mirrorEq'].includes(relation.type)) allowedRelationKeys.push('axis');
        else if (relation.type === 'pathAnchor') allowedRelationKeys.push('max_distance');
        var unknownRelationKeys = Object.keys(relation).filter(function (key) { return !allowedRelationKeys.includes(key); });
        if (unknownRelationKeys.length) throw new Error('第 ' + pageNo + ' 页关系[' + relation.relation_id + '] 包含未知字段: ' + unknownRelationKeys.join(','));
        if (!Array.isArray(relation.anchors) || relation.anchors.length !== relationArity[relation.type]) throw new Error('第 ' + pageNo + ' 页关系[' + relation.relation_id + '] anchor 数量错误');
        var unknownRelationAnchors = relation.anchors.filter(function (anchorId) { return !declaredAnchorIds.includes(anchorId); });
        if (unknownRelationAnchors.length) throw new Error('第 ' + pageNo + ' 页关系[' + relation.relation_id + '] 引用未知 anchor[' + unknownRelationAnchors.join(',') + ']');
        var declaredTolerance = Number(relation.tolerance || 0);
        if (!Number.isFinite(declaredTolerance) || declaredTolerance < 0) throw new Error('第 ' + pageNo + ' 页关系[' + relation.relation_id + '] tolerance 非法');
        var toleranceLimit = ['centerEq', 'centerBetween'].includes(relation.type) ? 3 : 1;
        if (declaredTolerance > toleranceLimit) throw new Error('第 ' + pageNo + ' 页关系[' + relation.relation_id + '] tolerance 超过 ' + toleranceLimit + 'px');
        if (relation.type === 'ownerOverlap' && (typeof relation.reason !== 'string' || !relation.reason.trim())) throw new Error('第 ' + pageNo + ' 页关系[' + relation.relation_id + '] 必须说明归属重叠原因');
        if (relation.type === 'pathClear' && Number(relation.min_gap) < 4) throw new Error('第 ' + pageNo + ' 页关系[' + relation.relation_id + '] 路径与文字间距不得小于 4px');
        relationPriorities.push(boundaryRelationTypes.includes(relation.type) ? 0 : 1);
      });
      if (relationPriorities.some(function (priority, index) { return index > 0 && priority < relationPriorities[index - 1]; })) throw new Error('第 ' + pageNo + ' 页 relations 必须按边界/不重叠优先、对齐其次的顺序声明');
      var relationTypes = contract.relations.map(function (relation) { return relation.type; });
      if (!relationTypes.some(function (type) { return boundaryRelationTypes.includes(type); })) throw new Error('第 ' + pageNo + ' 页几何契约至少声明一条边界或不重叠关系');
      if (!relationTypes.some(function (type) { return alignmentRelationTypes.includes(type); })) throw new Error('第 ' + pageNo + ' 页几何契约至少声明一条关系对齐');
      var unanchoredSlots = Array.prototype.filter.call(slide.querySelectorAll('[data-slot-id]'), function (node) { return !node.getAttribute('data-anchor-id'); });
      if (unanchoredSlots.length) throw new Error('第 ' + pageNo + ' 页 slot 缺少 data-anchor-id: ' + unanchoredSlots.map(function (node) { return node.getAttribute('data-slot-id'); }).join(','));
      var pageAnchorCounts = {};
      Array.prototype.forEach.call(slide.querySelectorAll('[data-anchor-id]'), function (node) {
        var anchorId = node.getAttribute('data-anchor-id');
        pageAnchorCounts[anchorId] = (pageAnchorCounts[anchorId] || 0) + 1;
      });
      var undeclaredPageAnchors = Object.keys(pageAnchorCounts).filter(function (anchorId) { return !declaredAnchorIds.includes(anchorId); });
      if (undeclaredPageAnchors.length) throw new Error('第 ' + pageNo + ' 页包含未写入 geometry 的 anchor: ' + undeclaredPageAnchors.join(','));
      var duplicatedPageAnchors = Object.keys(pageAnchorCounts).filter(function (anchorId) { return pageAnchorCounts[anchorId] !== 1; });
      if (duplicatedPageAnchors.length) throw new Error('第 ' + pageNo + ' 页 data-anchor-id 不唯一: ' + duplicatedPageAnchors.join(','));

      var stage = slide.querySelector(':scope>.stage');
      var stageRect = stage.getBoundingClientRect();
      var scale = stageRect.width / contract.canvas.width;
      if (!Number.isFinite(scale) || scale <= 0) throw new Error('第 ' + pageNo + ' 页骨架舞台缩放不可测量');
      function logicalRect(node) {
        var value = node.getBoundingClientRect();
        return {
          left: (value.left - stageRect.left) / scale,
          top: (value.top - stageRect.top) / scale,
          right: (value.right - stageRect.left) / scale,
          bottom: (value.bottom - stageRect.top) / scale,
          width: value.width / scale,
          height: value.height / scale
        };
      }
      Object.keys(structureLeaves).forEach(function (slotId) {
        var matches = Array.prototype.filter.call(
          slide.querySelectorAll('[data-layout-slot][data-slot-id]'),
          function (node) { return node.getAttribute('data-slot-id') === slotId; }
        );
        if (matches.length > 1) throw new Error('第 ' + pageNo + ' 页结构叶槽[' + slotId + ']存在多个 data-layout-slot');
        if (!matches.length) return; // 没有组件容器的叶槽由锁定几何关系继续验证。
        var actual = logicalRect(matches[0]), expectedLeaf = structureLeaves[slotId];
        var drift = [
          ['left', actual.left, expectedLeaf.x],
          ['top', actual.top, expectedLeaf.y],
          ['width', actual.width, expectedLeaf.width],
          ['height', actual.height, expectedLeaf.height]
        ].filter(function (item) { return Math.abs(item[1] - item[2]) > .05; });
        if (drift.length) {
          throw new Error('第 ' + pageNo + ' 页组件槽[' + slotId + ']浏览器几何漂移: ' + drift.map(function (item) {
            return item[0] + '=' + item[1].toFixed(2) + '/' + item[2].toFixed(2);
          }).join(' '));
        }
      });
      var rects = {}, nodes = {};
      contract.anchors.forEach(function (anchor) {
        if (!anchor || typeof anchor.anchor_id !== 'string' || anchor.selector !== '[data-anchor-id="' + anchor.anchor_id + '"]') throw new Error('第 ' + pageNo + ' 页 anchor 非法');
        var matches = slide.querySelectorAll(anchor.selector);
        if (matches.length !== 1) throw new Error('第 ' + pageNo + ' 页 anchor[' + anchor.anchor_id + '] 应唯一，实际 ' + matches.length);
        nodes[anchor.anchor_id] = matches[0];
        rects[anchor.anchor_id] = logicalRect(nodes[anchor.anchor_id]);
      });
      if (contract.primitive === '单区') {
        var rawCenterAxes = new Set(contract.relations.filter(function (relation) {
          return relation.type === 'centerEq' || relation.type === 'centerBetween';
        }).map(function (relation) { return relation.axis || 'x'; }));
        var missingCenterAxes = ['x', 'y'].filter(function (axis) { return !rawCenterAxes.has(axis); });
        if (missingCenterAxes.length) throw new Error('第 ' + pageNo + ' 页单区必须用真实内容声明 x/y 两轴居中关系，缺少: ' + missingCenterAxes.join(','));

        var leafSlotId = contract.structure && contract.structure.type === 'slot' ? contract.structure.slot_id : '';
        var leafSlots = Array.prototype.filter.call(
          slide.querySelectorAll('[data-layout-slot][data-slot-id]'),
          function (node) { return node.getAttribute('data-slot-id') === leafSlotId; }
        );
        if (leafSlots.length !== 1) throw new Error('第 ' + pageNo + ' 页单区必须有且只有一个真实结构叶槽[' + (leafSlotId || '-') + ']');
        var leafSlot = leafSlots[0], leafAnchor = leafSlot.getAttribute('data-anchor-id');
        if (!leafAnchor || !nodes[leafAnchor]) throw new Error('第 ' + pageNo + ' 页单区真实结构叶槽必须以 data-anchor-id 进入 geometry');

        var subjectsByAxis = {x:new Set(), y:new Set()};
        function boundCenterSubject(relation) {
          var subjectId = null;
          if (relation.type === 'centerEq') {
            if (!relation.anchors.includes(leafAnchor)) return null;
            var others = relation.anchors.filter(function (anchorId) { return anchorId !== leafAnchor; });
            if (others.length !== 1) return null;
            subjectId = others[0];
          } else if (relation.type === 'centerBetween') subjectId = relation.anchors[0];
          if (!subjectId || !nodes[subjectId]) return null;
          var subject = nodes[subjectId];
          var role = subject.getAttribute('data-geometry-role');
          var honest = role === 'content' && !subject.matches('[data-layout-slot],.stage');
          var bound = leafSlot.contains(subject);
          return honest && bound ? subjectId : null;
        }
        contract.relations.forEach(function (relation) {
          if (!relation || !['centerEq', 'centerBetween'].includes(relation.type)) return;
          var axis = relation.axis || 'x';
          var subjectId = boundCenterSubject(relation);
          if (subjectsByAxis[axis] && subjectId) subjectsByAxis[axis].add(subjectId);
        });
        var sharedCenterSubjects = Array.from(subjectsByAxis.x).filter(function (subjectId) { return subjectsByAxis.y.has(subjectId); });
        if (!sharedCenterSubjects.length) {
          throw new Error('第 ' + pageNo + ' 页单区 x/y 必须绑定同一真实 content anchor 与结构叶槽[' + leafSlotId + ']');
        }
      }
      function requireAnchors(relation, count) {
        if (!Array.isArray(relation.anchors) || relation.anchors.length !== count) throw new Error('第 ' + pageNo + ' 页关系[' + relation.relation_id + '] anchor 数量错误');
        return relation.anchors.map(function (id) {
          if (!rects[id]) throw new Error('第 ' + pageNo + ' 页关系[' + relation.relation_id + '] 引用未知 anchor[' + id + ']');
          return rects[id];
        });
      }
      function edge(rect, name) {
        if (!['top', 'right', 'bottom', 'left'].includes(name)) throw new Error('第 ' + pageNo + ' 页关系 edge 非法: ' + name);
        return rect[name];
      }
      function separated(a, b, tolerance) {
        return a.right <= b.left + tolerance || b.right <= a.left + tolerance || a.bottom <= b.top + tolerance || b.bottom <= a.top + tolerance;
      }
      function gap(a, b) {
        var horizontal = Math.max(b.left - a.right, a.left - b.right, 0);
        var vertical = Math.max(b.top - a.bottom, a.top - b.bottom, 0);
        return Math.max(horizontal, vertical);
      }
      function center(rect, axis) {
        return axis === 'y' ? (rect.top + rect.bottom) / 2 : (rect.left + rect.right) / 2;
      }
      function visibleGeometryInkRect(node) {
        if (!node || node.getAttribute('aria-hidden') === 'true' || node.getAttribute('data-contract-only') === 'true') return null;
        var inkSelector = 'text,tspan,path,line,polyline,polygon,circle,ellipse,rect,img,canvas,video,div,span,h1,h2,h3,h4,h5,h6,p,li,blockquote,figcaption,label,[data-icon-source]';
        var candidates = node.matches(inkSelector) ? [node] : [];
        candidates = candidates.concat(Array.prototype.slice.call(node.querySelectorAll(inkSelector)));
        var seen = new Set(), union = null;
        function colorVisible(value) {
          if (!value || value === 'transparent') return false;
          var alpha = value.match(/rgba\([^)]*,\s*([0-9.]+)\s*\)$/);
          return !alpha || Number(alpha[1]) > .05;
        }
        function paintedHtmlBox(candidate, style) {
          if (colorVisible(style.backgroundColor)) return true;
          return ['Top', 'Right', 'Bottom', 'Left'].some(function (side) {
            return style['border' + side + 'Style'] !== 'none' &&
              Number.parseFloat(style['border' + side + 'Width'] || '0') > .1 &&
              colorVisible(style['border' + side + 'Color']);
          });
        }
        candidates.forEach(function (candidate) {
          if (seen.has(candidate) || candidate.closest('defs,[aria-hidden="true"],[data-contract-only="true"]')) return;
          seen.add(candidate);
          var style = getComputedStyle(candidate);
          if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity || 1) <= .05) return;
          var bounds = candidate.getBoundingClientRect();
          if (bounds.width < .5 && bounds.height < .5) return;
          var tag = candidate.tagName.toLowerCase(), visible = false;
          if (['text', 'tspan', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'li', 'blockquote', 'figcaption', 'label'].includes(tag)) {
            visible = Boolean(candidate.textContent && candidate.textContent.trim());
          } else if (tag === 'div' || tag === 'span') {
            var directText = Array.prototype.some.call(candidate.childNodes, function (child) {
              return child.nodeType === 3 && child.textContent.trim();
            });
            visible = directText || paintedHtmlBox(candidate, style);
          } else if (['path', 'line', 'polyline', 'polygon', 'circle', 'ellipse', 'rect'].includes(tag)) {
            var hasStroke = style.stroke !== 'none' && style.stroke !== 'transparent' && Number(style.strokeOpacity || 1) > .05;
            var hasFill = style.fill !== 'none' && style.fill !== 'transparent' && Number(style.fillOpacity || 1) > .05;
            visible = hasStroke || hasFill;
          } else visible = true;
          if (!visible) return;
          var logical = logicalRect(candidate);
          if (!union) union = logical;
          else {
            union.left = Math.min(union.left, logical.left);
            union.top = Math.min(union.top, logical.top);
            union.right = Math.max(union.right, logical.right);
            union.bottom = Math.max(union.bottom, logical.bottom);
            union.width = union.right - union.left;
            union.height = union.bottom - union.top;
          }
        });
        return union;
      }
      function hasVisibleGeometryInk(node) {
        return Boolean(visibleGeometryInkRect(node));
      }
      function centeredFixedComponentInkRect(node) {
        if (!node || node.dataset.fixedComponentSource !== 'true' ||
          node.dataset.componentBehaviorHost !== 'true' ||
          node.dataset.visibleInkCentered !== 'true') return null;
        var behavior = global.WisePPTComponentBehavior;
        if (!behavior || typeof behavior.measureVisibleInk !== 'function') return null;
        var subject = node.dataset.visualSubject === 'true'
          ? node
          : node.querySelector('[data-visual-subject="true"]');
        if (!subject) return null;
        var measured = behavior.measureVisibleInk(subject);
        var ink = measured && measured.primary;
        if (!ink) return null;
        return {
          left: (ink.left - stageRect.left) / scale,
          top: (ink.top - stageRect.top) / scale,
          right: (ink.right - stageRect.left) / scale,
          bottom: (ink.bottom - stageRect.top) / scale,
          width: (ink.right - ink.left) / scale,
          height: (ink.bottom - ink.top) / scale
        };
      }
      function centerMeasurementRect(anchorId) {
        return centeredFixedComponentInkRect(nodes[anchorId]) || rects[anchorId];
      }
      function isHonestCenterTarget(node) {
        if (!node || node.getAttribute('data-geometry-role') !== 'content' || node.matches('[data-layout-slot],.stage')) return false;
        var fixedInk = centeredFixedComponentInkRect(node);
        var ink = fixedInk || visibleGeometryInkRect(node);
        if (!ink) return false;
        // behavior-v4 proves that a fixed component's *visible ink* was fitted
        // around the slot center. Its host box may intentionally remain larger.
        if (fixedInk) return true;
        var target = logicalRect(node), slack = 64;
        return Math.abs(target.left - ink.left) <= slack && Math.abs(target.top - ink.top) <= slack &&
          Math.abs(target.right - ink.right) <= slack && Math.abs(target.bottom - ink.bottom) <= slack;
      }
      function visibleContentUnion() {
        var union = null;
        Object.keys(nodes).forEach(function (anchorId) {
          var node = nodes[anchorId];
          if (!node || node.getAttribute('data-geometry-role') !== 'content') return;
          var ink = centeredFixedComponentInkRect(node) || visibleGeometryInkRect(node);
          if (!ink) return;
          if (!union) union = Object.assign({}, ink);
          else {
            union.left = Math.min(union.left, ink.left);
            union.top = Math.min(union.top, ink.top);
            union.right = Math.max(union.right, ink.right);
            union.bottom = Math.max(union.bottom, ink.bottom);
            union.width = union.right - union.left;
            union.height = union.bottom - union.top;
          }
        });
        return union;
      }
      function pathDistance(pointRect, pathNode) {
        if (!pathNode || typeof pathNode.getTotalLength !== 'function' || typeof pathNode.getPointAtLength !== 'function') {
          throw new Error('第 ' + pageNo + ' 页 pathAnchor 的第二个 anchor 必须是可测量 SVG 路径');
        }
        var length = pathNode.getTotalLength();
        var matrix = pathNode.getScreenCTM();
        if (!Number.isFinite(length) || !matrix) throw new Error('第 ' + pageNo + ' 页 SVG 路径不可测量');
        var samples = Math.max(16, Math.min(256, Math.ceil(length / 8)));
        var px = center(pointRect, 'x'), py = center(pointRect, 'y'), closest = Infinity;
        for (var i = 0; i <= samples; i += 1) {
          var local = pathNode.getPointAtLength(length * i / samples);
          var sx = matrix.a * local.x + matrix.c * local.y + matrix.e;
          var sy = matrix.b * local.x + matrix.d * local.y + matrix.f;
          var lx = (sx - stageRect.left) / scale, ly = (sy - stageRect.top) / scale;
          closest = Math.min(closest, Math.hypot(lx - px, ly - py));
        }
        return closest;
      }
      function pathClearance(rect, pathNode) {
        if (!pathNode || typeof pathNode.getTotalLength !== 'function' || typeof pathNode.getPointAtLength !== 'function') {
          throw new Error('第 ' + pageNo + ' 页 pathClear 的第二个 anchor 必须是可测量 SVG 路径');
        }
        var length = pathNode.getTotalLength();
        var matrix = pathNode.getScreenCTM();
        if (!Number.isFinite(length) || !matrix) throw new Error('第 ' + pageNo + ' 页 SVG 路径不可测量');
        var samples = Math.max(24, Math.min(512, Math.ceil(length / 4)));
        var closest = Infinity;
        for (var i = 0; i <= samples; i += 1) {
          var local = pathNode.getPointAtLength(length * i / samples);
          var x = (matrix.a * local.x + matrix.c * local.y + matrix.e - stageRect.left) / scale;
          var y = (matrix.b * local.x + matrix.d * local.y + matrix.f - stageRect.top) / scale;
          var dx = Math.max(rect.left - x, 0, x - rect.right);
          var dy = Math.max(rect.top - y, 0, y - rect.bottom);
          closest = Math.min(closest, Math.hypot(dx, dy));
        }
        return closest;
      }
      var zoneBounds = {
        'core-content': {left:150, top:170, right:1800, bottom:880},
        'full-frame-ui': {left:100, top:140, right:1820, bottom:920},
        'functional-edge': {left:64, top:120, right:1856, bottom:960},
        'breath-page': {left:120, top:150, right:1800, bottom:900}
      };
      var contentRegion = contract.content_region;
      if (!contentRegion || !zoneBounds[contentRegion.zone] || !rects[contentRegion.anchor_id]) throw new Error('第 ' + pageNo + ' 页 content_region 非法');
      var zone = zoneBounds[contentRegion.zone], contentRect = rects[contentRegion.anchor_id];
      if (contentRect.left < zone.left - .01 || contentRect.top < zone.top - .01 || contentRect.right > zone.right + .01 || contentRect.bottom > zone.bottom + .01) {
        throw new Error('第 ' + pageNo + ' 页内容组[' + contentRegion.anchor_id + ']超出 ' + contentRegion.zone + ' 内容区');
      }
      var metrics = {};
      contract.relations.forEach(function (relation) {
        if (!relation || typeof relation.relation_id !== 'string') throw new Error('第 ' + pageNo + ' 页存在无 ID 的几何关系');
        var tolerance = Number(relation.tolerance || 0);
        if (!Number.isFinite(tolerance) || tolerance < 0) throw new Error('第 ' + pageNo + ' 页关系[' + relation.relation_id + '] tolerance 非法');
        tolerance += .01; // 仅吸收缩放后的浮点舍入，不是可见设计容差。
        var pair, actual, expected;
        if (relation.type === 'contain') {
          pair = requireAnchors(relation, 2);
          var inset = Number(relation.inset || 0);
          if (!Number.isFinite(inset) || inset < 0) throw new Error('第 ' + pageNo + ' 页关系[' + relation.relation_id + '] inset 非法');
          var containedNode = nodes[relation.anchors[1]];
          var textCarrier = containedNode.matches('h1,h2,h3,h4,h5,h6,p,li,blockquote,figcaption,label,[data-content-ref]');
          if (textCarrier && inset < 8) throw new Error('第 ' + pageNo + ' 页关系[' + relation.relation_id + '] 文字载体内距不得小于 8px');
          if ((relation.shape || 'rect') === 'circle') {
            var radius = Math.min(pair[0].width, pair[0].height) / 2 - inset;
            var circleX = center(pair[0], 'x'), circleY = center(pair[0], 'y');
            var corners = [[pair[1].left,pair[1].top],[pair[1].right,pair[1].top],[pair[1].right,pair[1].bottom],[pair[1].left,pair[1].bottom]];
            if (radius < 0 || corners.some(function (point) { return Math.hypot(point[0] - circleX, point[1] - circleY) > radius + tolerance; })) throw new Error('第 ' + pageNo + ' 页关系[' + relation.relation_id + '] 内容越过圆形边界');
          } else if (pair[1].left < pair[0].left + inset - tolerance || pair[1].top < pair[0].top + inset - tolerance || pair[1].right > pair[0].right - inset + tolerance || pair[1].bottom > pair[0].bottom - inset + tolerance) throw new Error('第 ' + pageNo + ' 页关系[' + relation.relation_id + '] 子元素越界');
          metrics[relation.relation_id] = 0;
        } else if (relation.type === 'hardBoundary') {
          pair = requireAnchors(relation, 2);
          actual = edge(pair[1], relation.edge); expected = edge(pair[0], relation.edge);
          var outside = relation.edge === 'left' || relation.edge === 'top' ? actual < expected - tolerance : actual > expected + tolerance;
          if (outside) throw new Error('第 ' + pageNo + ' 页关系[' + relation.relation_id + '] 越过硬边界: ' + actual.toFixed(1) + ' / ' + expected.toFixed(1));
          metrics[relation.relation_id] = actual - expected;
        } else if (relation.type === 'avoid' || relation.type === 'clear') {
          pair = requireAnchors(relation, 2);
          var minimum = Number(relation.min_gap);
          if (!Number.isFinite(minimum) || minimum < 0) throw new Error('第 ' + pageNo + ' 页关系[' + relation.relation_id + '] min_gap 非法');
          if (!separated(pair[0], pair[1], tolerance)) throw new Error('第 ' + pageNo + ' 页关系[' + relation.relation_id + '] 发生重叠');
          actual = gap(pair[0], pair[1]);
          if (actual + tolerance < minimum) throw new Error('第 ' + pageNo + ' 页关系[' + relation.relation_id + '] 间隙不足: ' + actual.toFixed(1) + ' < ' + minimum);
          metrics[relation.relation_id] = actual;
        } else if (relation.type === 'pathClear') {
          pair = requireAnchors(relation, 2);
          actual = pathClearance(pair[0], nodes[relation.anchors[1]]);
          expected = Number(relation.min_gap);
          if (!Number.isFinite(expected) || expected < 0 || actual + tolerance < expected) throw new Error('第 ' + pageNo + ' 页关系[' + relation.relation_id + '] 路径穿过内容: ' + actual.toFixed(1) + ' < ' + expected);
          metrics[relation.relation_id] = actual;
        } else if (relation.type === 'ownerOverlap') {
          pair = requireAnchors(relation, 2);
          var overlapWidth = Math.min(pair[0].right, pair[1].right) - Math.max(pair[0].left, pair[1].left);
          var overlapHeight = Math.min(pair[0].bottom, pair[1].bottom) - Math.max(pair[0].top, pair[1].top);
          if (overlapWidth <= tolerance || overlapHeight <= tolerance) throw new Error('第 ' + pageNo + ' 页关系[' + relation.relation_id + '] 声明了归属重叠但两者未相交');
          metrics[relation.relation_id] = Math.min(overlapWidth, overlapHeight);
        } else if (relation.type === 'edgeEq') {
          pair = requireAnchors(relation, 2);
          actual = edge(pair[1], relation.edge) - edge(pair[0], relation.edge);
          if (Math.abs(actual) > tolerance) throw new Error('第 ' + pageNo + ' 页关系[' + relation.relation_id + '] 边缘未对齐: Δ' + actual.toFixed(1));
          metrics[relation.relation_id] = actual;
        } else if (relation.type === 'bottomEq') {
          pair = requireAnchors(relation, 2);
          actual = pair[1].bottom - pair[0].bottom;
          if (Math.abs(actual) > tolerance) throw new Error('第 ' + pageNo + ' 页关系[' + relation.relation_id + '] 包围盒底边未对齐: Δ' + actual.toFixed(1));
          metrics[relation.relation_id] = actual;
        } else if (relation.type === 'offsetEq') {
          pair = requireAnchors(relation, 2);
          if (relation.axis !== 'x' && relation.axis !== 'y') throw new Error('第 ' + pageNo + ' 页关系[' + relation.relation_id + '] axis 非法');
          expected = Number(relation.offset);
          actual = relation.axis === 'x' ? pair[1].left - pair[0].left : pair[1].top - pair[0].top;
          if (!Number.isFinite(expected) || Math.abs(actual - expected) > tolerance) throw new Error('第 ' + pageNo + ' 页关系[' + relation.relation_id + '] 偏移错误: ' + actual.toFixed(1) + ' / ' + expected);
          metrics[relation.relation_id] = actual;
        } else if (relation.type === 'centerEq') {
          pair = requireAnchors(relation, 2);
          if (!relation.anchors.some(function (anchorId) { return isHonestCenterTarget(nodes[anchorId]); })) {
            throw new Error('第 ' + pageNo + ' 页关系[' + relation.relation_id + '] 居中目标必须是真实可见内容 anchor(data-geometry-role=content)，不得使用空安全框/整槽代理，且包围盒须贴合墨迹');
          }
          var centerAxis = relation.axis || 'x';
          if (centerAxis !== 'x' && centerAxis !== 'y') throw new Error('第 ' + pageNo + ' 页关系[' + relation.relation_id + '] axis 非法');
          var centerPair = relation.anchors.map(centerMeasurementRect);
          actual = center(centerPair[1], centerAxis) - center(centerPair[0], centerAxis);
          if (Math.abs(actual) > tolerance) throw new Error('第 ' + pageNo + ' 页关系[' + relation.relation_id + '] 中心未对齐: Δ' + actual.toFixed(1));
          metrics[relation.relation_id] = actual;
          if (relation.anchors.includes(contentRegion.anchor_id)) {
            var visibleUnion = visibleContentUnion();
            if (!visibleUnion) throw new Error('第 ' + pageNo + ' 页关系[' + relation.relation_id + '] 页面级居中缺少可见内容并集');
            var visibleUnionDelta = center(visibleUnion, centerAxis) - center(contentRect, centerAxis);
            if (Math.abs(visibleUnionDelta) > tolerance) throw new Error('第 ' + pageNo + ' 页关系[' + relation.relation_id + '] 页面级居中只对准局部锚点，完整可见内容并集偏移: Δ' + visibleUnionDelta.toFixed(1));
            metrics[relation.relation_id + '.visible-union'] = visibleUnionDelta;
          }
        } else if (relation.type === 'centerBetween') {
          var triple = requireAnchors(relation, 3);
          if (!isHonestCenterTarget(nodes[relation.anchors[0]]) || !hasVisibleGeometryInk(nodes[relation.anchors[1]]) || !hasVisibleGeometryInk(nodes[relation.anchors[2]])) {
            throw new Error('第 ' + pageNo + ' 页关系[' + relation.relation_id + '] 三点居中必须以真实可见内容为主体，并使用两个可见边界锚点');
          }
          var first = triple[1], second = triple[2];
          var axis = relation.axis || 'x';
          if (axis !== 'x' && axis !== 'y') throw new Error('第 ' + pageNo + ' 页关系[' + relation.relation_id + '] axis 非法');
          if (axis === 'x') expected = center(first, axis) <= center(second, axis) ? (first.right + second.left) / 2 : (second.right + first.left) / 2;
          else expected = center(first, axis) <= center(second, axis) ? (first.bottom + second.top) / 2 : (second.bottom + first.top) / 2;
          actual = center(centerMeasurementRect(relation.anchors[0]), axis);
          if (Math.abs(actual - expected) > tolerance) throw new Error('第 ' + pageNo + ' 页关系[' + relation.relation_id + '] 未在两侧整体间居中: Δ' + (actual - expected).toFixed(1));
          metrics[relation.relation_id] = actual - expected;
        } else if (relation.type === 'mirrorEq') {
          var mirrored = requireAnchors(relation, 3);
          var mirrorAxis = relation.axis || 'x';
          if (mirrorAxis !== 'x' && mirrorAxis !== 'y') throw new Error('第 ' + pageNo + ' 页关系[' + relation.relation_id + '] axis 非法');
          var axisCenter = center(mirrored[2], mirrorAxis);
          var firstOffset = center(mirrored[0], mirrorAxis) - axisCenter;
          var secondOffset = center(mirrored[1], mirrorAxis) - axisCenter;
          actual = Math.abs(firstOffset) - Math.abs(secondOffset);
          if (firstOffset * secondOffset >= 0 || Math.abs(actual) > tolerance) throw new Error('第 ' + pageNo + ' 页关系[' + relation.relation_id + '] 未关于共同中轴镜像等距');
          metrics[relation.relation_id] = actual;
        } else if (relation.type === 'pathAnchor') {
          pair = requireAnchors(relation, 2);
          actual = pathDistance(pair[0], nodes[relation.anchors[1]]);
          expected = Number(relation.max_distance);
          if (!Number.isFinite(expected) || expected < 0 || actual > expected + tolerance) throw new Error('第 ' + pageNo + ' 页关系[' + relation.relation_id + '] 节点未锚定路径: ' + actual.toFixed(1) + ' > ' + expected);
          metrics[relation.relation_id] = actual;
        } else {
          throw new Error('第 ' + pageNo + ' 页关系[' + relation.relation_id + '] 类型未知: ' + relation.type);
        }
      });
      var owned = {};
      contract.relations.filter(function (relation) { return relation.type === 'ownerOverlap'; }).forEach(function (relation) {
        owned[relation.anchors.slice().sort().join('|')] = true;
      });
      function assertSvgTextLineClearance() {
        function visibleSvg(node) {
          if (!node || node.closest('defs,[aria-hidden="true"]')) return false;
          var cs = getComputedStyle(node), r = node.getBoundingClientRect();
          return cs.display !== 'none' && cs.visibility !== 'hidden' && Number.parseFloat(cs.opacity || '1') > 0 && r.width + r.height > .1;
        }
        function point(node, x, y) {
          var svg = node.ownerSVGElement, value = svg.createSVGPoint();
          value.x = x; value.y = y;
          return value.matrixTransform(node.getScreenCTM());
        }
        function segmentHitsRect(a, b, rect, pad) {
          var vertical = Math.abs(a.x - b.x) <= Math.max(.5, scale);
          var horizontal = Math.abs(a.y - b.y) <= Math.max(.5, scale);
          if (vertical) return a.x > rect.left + pad && a.x < rect.right - pad && Math.max(a.y,b.y) > rect.top + pad && Math.min(a.y,b.y) < rect.bottom - pad;
          if (horizontal) return a.y > rect.top + pad && a.y < rect.bottom - pad && Math.max(a.x,b.x) > rect.left + pad && Math.min(a.x,b.x) < rect.right - pad;
          return false;
        }
        function hasSmallOwnedCarrier(text, a, b) {
          var textRect = text.getBoundingClientRect(), centerX = (textRect.left + textRect.right) / 2, centerY = (textRect.top + textRect.bottom) / 2;
          return Array.prototype.some.call(text.ownerSVGElement.querySelectorAll('rect,circle,ellipse'), function (shape) {
            if (!visibleSvg(shape)) return false;
            var r = shape.getBoundingClientRect();
            if (r.width / scale > 180 || r.height / scale > 180) return false;
            if (centerX < r.left || centerX > r.right || centerY < r.top || centerY > r.bottom) return false;
            return segmentHitsRect(a, b, r, 0);
          });
        }
        Array.prototype.forEach.call(slide.querySelectorAll('svg line'), function (line) {
          if (!visibleSvg(line) || getComputedStyle(line).stroke === 'none') return;
          var x1=Number(line.getAttribute('x1')), y1=Number(line.getAttribute('y1')), x2=Number(line.getAttribute('x2')), y2=Number(line.getAttribute('y2'));
          if (![x1,y1,x2,y2].every(Number.isFinite)) return;
          var a=point(line,x1,y1), b=point(line,x2,y2);
          if (Math.hypot(a.x-b.x,a.y-b.y) / scale < 64) return;
          Array.prototype.forEach.call(line.ownerSVGElement.querySelectorAll('text'), function (text) {
            if (!visibleSvg(text)) return;
            var lineId=line.dataset.anchorId, textId=text.dataset.anchorId;
            if (lineId && textId && owned[[lineId,textId].sort().join('|')]) return;
            var rect=text.getBoundingClientRect(), pad=Math.max(1,1.5*scale);
            if (!segmentHitsRect(a,b,rect,pad) || hasSmallOwnedCarrier(text,a,b)) return;
            var excerpt=(text.textContent || '').trim().replace(/\s+/g,' ').slice(0,24);
            throw new Error('第 ' + pageNo + ' 页 SVG 文字与长分隔线发生未声明重叠: ' + (excerpt || '-'));
          });
        });
      }
      assertSvgTextLineClearance();
      var slots = Array.prototype.slice.call(slide.querySelectorAll('[data-slot-id][data-anchor-id]')).filter(function (node) {
        var rect = logicalRect(node);
        return rect.width > .01 && rect.height > .01 && getComputedStyle(node).visibility !== 'hidden';
      });
      for (var s = 0; s < slots.length; s += 1) for (var t = s + 1; t < slots.length; t += 1) {
        if (slots[s].contains(slots[t]) || slots[t].contains(slots[s])) continue;
        var firstId = slots[s].getAttribute('data-anchor-id'), secondId = slots[t].getAttribute('data-anchor-id');
        if (owned[[firstId, secondId].sort().join('|')]) continue;
        var firstRect = logicalRect(slots[s]), secondRect = logicalRect(slots[t]);
        if (!separated(firstRect, secondRect, .01)) throw new Error('第 ' + pageNo + ' 页 slot[' + slots[s].getAttribute('data-slot-id') + '] 与 slot[' + slots[t].getAttribute('data-slot-id') + '] 发生未声明重叠');
      }
      slide.dataset.geometryContractMetrics = JSON.stringify(metrics);
      slide.dataset.geometryContractCheck = 'pass';
    }
    function assertSemanticColors(slide, pageNo) {
      var targets = {
        'color': 'color',
        'background-color': 'backgroundColor',
        'fill': 'fill',
        'stroke': 'stroke',
        'border-color': 'borderTopColor'
      };
      var probe = document.createElement('span');
      probe.style.position = 'absolute';
      probe.style.visibility = 'hidden';
      slide.appendChild(probe);
      function normalized(value) {
        probe.style.color = '';
        probe.style.color = value;
        return getComputedStyle(probe).color;
      }
      try {
        Array.prototype.forEach.call(slide.querySelectorAll('[data-color-role]'), function (node) {
          var role = node.getAttribute('data-color-role');
          var target = node.getAttribute('data-color-target');
          var property = targets[target];
          if (!property) throw new Error('第 ' + pageNo + ' 页颜色角色[' + role + '] 缺少合法 data-color-target');
          var expected = normalized(color(role));
          var actual = getComputedStyle(node)[property];
          if (actual !== expected) throw new Error('第 ' + pageNo + ' 页颜色角色[' + role + '] 实际为 ' + actual + '，应为 ' + expected);
        });
      } finally {
        probe.remove();
      }
      slide.dataset.semanticColorCheck = 'pass';
    }
    function assertGeometry(slide, index) {
      var pageNo = index + 1;
      var stage = slide.querySelector(':scope>.stage');
      if (!stage) return;
      // 层叠正确性：声明 z-index 的语义元素必须压过 stage::before 纸纹。
      var beforeZ = Number.parseFloat(getComputedStyle(stage, '::before').zIndex);
      if (Number.isFinite(beforeZ)) {
        var semantic = stage.querySelectorAll('.caption, .doc, .folio, .verdict');
        Array.prototype.forEach.call(semantic, function (el) {
          var z = Number.parseFloat(getComputedStyle(el).zIndex);
          if (Number.isFinite(z) && z <= beforeZ) {
            throw new Error('第 ' + pageNo + ' 页 ' + (el.className.split(' ')[0] || '元素') + ' 层叠被压低(z-index=' + z + ' ≤ stage::before=' + beforeZ + ')，可能被纸纹遮挡');
          }
        });
      }
      try {
        assertGeometryContract(slide, pageNo);
      } catch (error) {
        slide.dataset.geometryContractCheck = 'fail';
        slide.dataset.geometryContractError = error.message;
        throw error;
      }
      assertSemanticColors(slide, pageNo);
    }
    function vNextVisible(node) {
      if (!node || node.closest('script,style,defs,desc,title,[aria-hidden="true"],[data-contract-only="true"]')) return false;
      var style = getComputedStyle(node), rect = node.getBoundingClientRect();
      return style.display !== 'none'
        && style.visibility !== 'hidden'
        && Number.parseFloat(style.opacity || '1') > 0
        && rect.width > .1
        && rect.height > .1;
    }
    function vNextJsonAttribute(slide, attribute, pageNo) {
      if (!slide.hasAttribute(attribute)) throw new Error('第 ' + pageNo + ' 页缺少 ' + attribute);
      var raw = slide.getAttribute(attribute);
      try { return JSON.parse(raw); }
      catch (error) { throw new Error('第 ' + pageNo + ' 页 ' + attribute + ' 不是合法 JSON'); }
    }
    function vNextNormalizedText(value) {
      return String(value || '').normalize('NFKC').replace(/\s+/g, ' ').trim();
    }
    function vNextVisiblePayloadText(slide) {
      var parts = [];
      Array.prototype.forEach.call(slide.querySelectorAll('[data-vnext-payload-value]:not([data-vnext-payload-value="empty"])'), function (carrier) {
        var walker = document.createTreeWalker(carrier, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) {
          var value = vNextNormalizedText(walker.currentNode.nodeValue);
          var parent = walker.currentNode.parentElement;
          if (value && vNextVisible(parent)) parts.push(value);
        }
      });
      return vNextNormalizedText(parts.join(' '));
    }
    function vNextAssertEvidence(visibleText, evidence, pageNo, label) {
      var normalized = vNextNormalizedText(evidence);
      if (!normalized) throw new Error('第 ' + pageNo + ' 页' + label + '为空');
      if (!visibleText.includes(normalized)) {
        throw new Error('第 ' + pageNo + ' 页' + label + '未出现在 claim/真实 payload 的可见文字中: ' + normalized);
      }
    }
    function vNextAssertPayloadContent(slide, pageNo) {
      var carriers = Array.prototype.slice.call(slide.querySelectorAll('[data-vnext-payload-value]'));
      var populated = carriers.filter(function (node) { return node.dataset.vnextPayloadValue !== 'empty'; });
      var authored = populated.filter(function (node) { return node.dataset.vnextPayloadValue !== 'claim'; });
      if (!authored.length) throw new Error('第 ' + pageNo + ' 页没有任何非 claim 的真实 payload');
      populated.forEach(function (node) {
        var kind = node.dataset.vnextPayloadValue;
        if (!['text', 'data', 'icon', 'claim'].includes(kind)) {
          throw new Error('第 ' + pageNo + ' 页存在未登记 payload 值: ' + kind);
        }
        if (!vNextVisible(node)) throw new Error('第 ' + pageNo + ' 页 payload[' + kind + ']不可见');
        if (kind === 'text' || kind === 'data' || kind === 'claim') {
          if (!vNextNormalizedText(node.textContent)) throw new Error('第 ' + pageNo + ' 页 payload[' + kind + ']可见节点为空');
        } else if (kind === 'icon') {
          if (!node.matches('svg,path,[data-icon],[data-icon-source]') && !node.querySelector('svg,path,[data-icon-source]')) {
            throw new Error('第 ' + pageNo + ' 页 icon payload 没有真实图标');
          }
        }
      });
      slide.dataset.vnextContentCheck = 'pass';
    }
    function vNextAssertTypography(slide, pageNo) {
      var minimum = typeSize('meta');
      var seen = new Set();
      Array.prototype.forEach.call(slide.querySelectorAll('[data-vnext-payload-value]:not([data-vnext-payload-value="empty"])'), function (carrier) {
        var walker = document.createTreeWalker(carrier, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) {
          if (!vNextNormalizedText(walker.currentNode.nodeValue)) continue;
          var node = walker.currentNode.parentElement;
          if (!vNextVisible(node) || seen.has(node)) continue;
          seen.add(node);
          var size = Number.parseFloat(getComputedStyle(node).fontSize);
          if (!Number.isFinite(size) || size + .25 < minimum) {
            throw new Error('第 ' + pageNo + ' 页 payload 文字字号 ' + (Number.isFinite(size) ? size : 'NaN') + 'px 小于 --type-meta ' + minimum + 'px');
          }
        }
      });
      slide.dataset.vnextTypographyCheck = 'pass';
    }
    function vNextPayloadDiagnostic(node, rect, slideRect) {
      var key = node.dataset.vnextTextKey
        || node.dataset.vnextIconKey
        || node.dataset.vnextClaimKey
        || node.dataset.vnextPayloadValue
        || node.tagName.toLowerCase();
      function relative(value, origin) { return Math.round((value - origin) * 100) / 100; }
      return key + ' rect=(' + [
        relative(rect.left, slideRect.left),
        relative(rect.top, slideRect.top),
        relative(rect.right, slideRect.left),
        relative(rect.bottom, slideRect.top)
      ].join(',') + ')';
    }
    function vNextPayloadBindingKey(node) {
      return node.dataset.vnextTextKey
        || node.dataset.vnextClaimKey
        || node.dataset.vnextPayloadValue
        || node.tagName.toLowerCase();
    }
    function vNextUnionRects(rects) {
      if (!rects.length) return null;
      return rects.reduce(function (union, rect) {
        if (!union) {
          return {left:rect.left, top:rect.top, right:rect.right, bottom:rect.bottom};
        }
        union.left = Math.min(union.left, rect.left);
        union.top = Math.min(union.top, rect.top);
        union.right = Math.max(union.right, rect.right);
        union.bottom = Math.max(union.bottom, rect.bottom);
        return union;
      }, null);
    }
    function vNextTextInkRect(carrier) {
      var htmlRects = [];
      var svgTextNodes = new Set();
      var walker = document.createTreeWalker(carrier, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) {
        var textNode = walker.currentNode;
        var raw = String(textNode.nodeValue || '');
        if (!vNextNormalizedText(raw)) continue;
        var parent = textNode.parentElement;
        if (!vNextVisible(parent)) continue;
        var svgText = parent.closest && parent.closest('text,tspan');
        if (svgText
          && svgText.namespaceURI === 'http://www.w3.org/2000/svg'
          && carrier.contains(svgText)) {
          svgTextNodes.add(svgText);
          continue;
        }
        var start = raw.search(/\S/);
        var trailing = raw.match(/\s*$/);
        var end = trailing ? raw.length - trailing[0].length : raw.length;
        if (start < 0 || end <= start) continue;
        var range = document.createRange();
        range.setStart(textNode, start);
        range.setEnd(textNode, end);
        Array.prototype.forEach.call(range.getClientRects(), function (rect) {
          if (rect.width > .01 && rect.height > .01) htmlRects.push(rect);
        });
        range.detach();
      }
      svgTextNodes.forEach(function (node) {
        var rect = node.getBoundingClientRect();
        if (rect.width > .01 && rect.height > .01) htmlRects.push(rect);
      });
      return vNextUnionRects(htmlRects);
    }
    function vNextFormatLogicalRect(rect) {
      if (!rect) return '(unavailable)';
      function rounded(value) { return Math.round(value * 100) / 100; }
      return '(' + [rect.left, rect.top, rect.right, rect.bottom].map(rounded).join(',') + ')';
    }
    function vNextParseFitBox(carrier) {
      var raw = carrier.getAttribute('data-vnext-fit-box');
      if (raw == null) return {valid:false, diagnostic:'(missing)'};
      var parts = raw.split(',');
      if (parts.length !== 4 || parts.some(function (part) { return !part.trim(); })) {
        return {valid:false, diagnostic:'(invalid:' + JSON.stringify(raw) + ')'};
      }
      var values = parts.map(function (part) { return Number(part.trim()); });
      if (values.some(function (value) { return !Number.isFinite(value); })) {
        return {valid:false, diagnostic:'(invalid:' + JSON.stringify(raw) + ')'};
      }
      var box = {left:values[0], top:values[1], right:values[2], bottom:values[3]};
      if (box.left < 0 || box.top < 0 || box.right > 1920 || box.bottom > 1080
        || box.left >= box.right || box.top >= box.bottom) {
        return {valid:false, diagnostic:'(invalid:' + JSON.stringify(raw) + ')'};
      }
      return {valid:true, box:box, diagnostic:vNextFormatLogicalRect(box)};
    }
    function vNextSharesNormalInlineFlow(left, right) {
      if (!left || !right || left.parentElement !== right.parentElement || !left.parentElement) return false;
      if (left.namespaceURI === 'http://www.w3.org/2000/svg'
        || right.namespaceURI === 'http://www.w3.org/2000/svg') return false;
      var parentDisplay = getComputedStyle(left.parentElement).display;
      if (parentDisplay === 'flex' || parentDisplay === 'inline-flex'
        || parentDisplay === 'grid' || parentDisplay === 'inline-grid') return false;
      return [left, right].every(function (node) {
        var style = getComputedStyle(node);
        return style.display === 'inline'
          && style.position === 'static'
          && style.float === 'none'
          && style.transform === 'none'
          && Number.parseFloat(style.marginLeft || '0') >= 0
          && Number.parseFloat(style.marginRight || '0') >= 0;
      });
    }
    function vNextAssertPayloadInternalFit(slide, pageNo) {
      var slideRect = slide.getBoundingClientRect();
      var scaleX = slideRect.width / 1920;
      var scaleY = slideRect.height / 1080;
      if (!Number.isFinite(scaleX) || !Number.isFinite(scaleY) || scaleX <= 0 || scaleY <= 0) {
        throw new Error('第 ' + pageNo + ' 页无法解析当前 slide 比例');
      }
      var carriers = slide.querySelectorAll(
        '[data-vnext-payload-value="text"],'
        + '[data-vnext-payload-value="data"],'
        + '[data-vnext-payload-value="claim"]'
      );
      var overlapCandidates = [];
      try {
        Array.prototype.forEach.call(carriers, function (carrier) {
          if (!vNextNormalizedText(carrier.textContent)) return;
          var bindingKey = vNextPayloadBindingKey(carrier);
          var inkRect = vNextTextInkRect(carrier);
          var logicalInk = inkRect ? {
            left:(inkRect.left - slideRect.left) / scaleX,
            top:(inkRect.top - slideRect.top) / scaleY,
            right:(inkRect.right - slideRect.left) / scaleX,
            bottom:(inkRect.bottom - slideRect.top) / scaleY
          } : null;
          var parsed = vNextParseFitBox(carrier);
          var prefix = '第 ' + pageNo + ' 页内部 fit 失败: binding_key=' + bindingKey
            + ' ink_rect=' + vNextFormatLogicalRect(logicalInk)
            + ' fit_box=' + parsed.diagnostic;
          if (!inkRect) throw new Error(prefix + '；无法取得可见文字墨迹');
          if (!parsed.valid) throw new Error(prefix + '；缺失或非法 data-vnext-fit-box');
          var box = parsed.box;
          var scaledBox = {
            left:slideRect.left + box.left * scaleX,
            top:slideRect.top + box.top * scaleY,
            right:slideRect.left + box.right * scaleX,
            bottom:slideRect.top + box.bottom * scaleY
          };
          var tolerance = 1;
          if (inkRect.left < scaledBox.left - tolerance || inkRect.top < scaledBox.top - tolerance
            || inkRect.right > scaledBox.right + tolerance || inkRect.bottom > scaledBox.bottom + tolerance) {
            throw new Error(prefix + '；文字墨迹越过内部 fit box');
          }
          var payloadKind = carrier.getAttribute('data-vnext-payload-value');
          if ((payloadKind === 'text' || payloadKind === 'claim') && vNextVisible(carrier)) {
            overlapCandidates.push({node:carrier, bindingKey:bindingKey, inkRect:inkRect, logicalInk:logicalInk});
          }
        });
        for (var leftIndex = 0; leftIndex < overlapCandidates.length; leftIndex += 1) {
          for (var rightIndex = leftIndex + 1; rightIndex < overlapCandidates.length; rightIndex += 1) {
            var leftCarrier = overlapCandidates[leftIndex];
            var rightCarrier = overlapCandidates[rightIndex];
            var overlapX = Math.min(leftCarrier.inkRect.right, rightCarrier.inkRect.right)
              - Math.max(leftCarrier.inkRect.left, rightCarrier.inkRect.left);
            var overlapY = Math.min(leftCarrier.inkRect.bottom, rightCarrier.inkRect.bottom)
              - Math.max(leftCarrier.inkRect.top, rightCarrier.inkRect.top);
            // Range/SVG text boxes include font ascent, descent and glyph
            // overhang; adjacent locked rows can therefore intersect without
            // painted glyphs colliding. Require more than half of the smaller
            // text box on both axes (and at least 4 screen px) before reporting
            // an independent-block collision. Fit containment keeps its 1px gate.
            var materialX = Math.max(4, Math.min(
              leftCarrier.inkRect.right - leftCarrier.inkRect.left,
              rightCarrier.inkRect.right - rightCarrier.inkRect.left
            ) * .5);
            var materialY = Math.max(4, Math.min(
              leftCarrier.inkRect.bottom - leftCarrier.inkRect.top,
              rightCarrier.inkRect.bottom - rightCarrier.inkRect.top
            ) * .5);
            if (overlapX > materialX && overlapY > materialY) {
              // A single sentence is often split into several payload bindings so one
              // token can be emphasized. Normal inline layout owns the spacing between
              // those direct siblings; their Range boxes may overlap slightly because
              // of glyph overhang even though two independent text blocks do not collide.
              if (vNextSharesNormalInlineFlow(leftCarrier.node, rightCarrier.node)) continue;
              throw new Error('第 ' + pageNo + ' 页 payload 文字墨迹重叠: binding_key_a=' + leftCarrier.bindingKey
                + ' ink_rect_a=' + vNextFormatLogicalRect(leftCarrier.logicalInk)
                + ' binding_key_b=' + rightCarrier.bindingKey
                + ' ink_rect_b=' + vNextFormatLogicalRect(rightCarrier.logicalInk)
                + ' screen_overlap=(' + (Math.round(overlapX * 100) / 100)
                + ',' + (Math.round(overlapY * 100) / 100) + ')px');
            }
          }
        }
      } catch (error) {
        slide.dataset.vnextFitCheck = 'fail';
        slide.dataset.vnextFitError = error.message;
        throw error;
      }
      slide.dataset.vnextFitCheck = 'pass';
      delete slide.dataset.vnextFitError;
    }
    function vNextAssertSafeAreaAndOverflow(slide, pageNo) {
      var slideRect = slide.getBoundingClientRect();
      var tolerance = 1;
      Array.prototype.forEach.call(slide.querySelectorAll('[data-vnext-payload-value]:not([data-vnext-payload-value="empty"])'), function (node) {
        if (!vNextVisible(node)) return;
        var rect = node.getBoundingClientRect();
        if (rect.left < slideRect.left - tolerance || rect.top < slideRect.top - tolerance
          || rect.right > slideRect.right + tolerance || rect.bottom > slideRect.bottom + tolerance) {
          throw new Error('第 ' + pageNo + ' 页 payload[' + vNextPayloadDiagnostic(node, rect, slideRect) + ']越过 1920×1080 页面安全区');
        }
        if (!(global.SVGElement && node instanceof global.SVGElement)) {
          var style = getComputedStyle(node);
          var clipsX = ['hidden', 'clip', 'auto', 'scroll'].includes(style.overflowX);
          var clipsY = ['hidden', 'clip', 'auto', 'scroll'].includes(style.overflowY);
          if (clipsX && node.clientWidth > .1 && node.scrollWidth > node.clientWidth + tolerance) {
            throw new Error('第 ' + pageNo + ' 页 payload 水平 overflow/crop');
          }
          if (clipsY && node.clientHeight > .1 && node.scrollHeight > node.clientHeight + tolerance) {
            throw new Error('第 ' + pageNo + ' 页 payload 垂直 overflow/crop');
          }
        }
        var ancestor = node.parentElement;
        while (ancestor && ancestor !== slide) {
          var ancestorStyle = getComputedStyle(ancestor);
          var clips = ['hidden', 'clip'].includes(ancestorStyle.overflowX) || ['hidden', 'clip'].includes(ancestorStyle.overflowY);
          if (clips) {
            var ancestorRect = ancestor.getBoundingClientRect();
            if (rect.left < ancestorRect.left - tolerance || rect.top < ancestorRect.top - tolerance
              || rect.right > ancestorRect.right + tolerance || rect.bottom > ancestorRect.bottom + tolerance) {
              throw new Error('第 ' + pageNo + ' 页 payload 被父级容器裁切');
            }
          }
          ancestor = ancestor.parentElement;
        }
      });
      slide.dataset.vnextOverflowCheck = 'pass';
      slide.dataset.vnextSafeAreaCheck = 'pass';
    }
    function vNextAssertSources(slide, pageNo, context) {
      var refs = vNextJsonAttribute(slide, 'data-source-refs', pageNo);
      var evidence = vNextJsonAttribute(slide, 'data-source-evidence', pageNo);
      var mustRefs = vNextJsonAttribute(slide, 'data-must-refs', pageNo);
      if (!Array.isArray(refs) || refs.some(function (value) { return typeof value !== 'string' || !value; }) || new Set(refs).size !== refs.length) {
        throw new Error('第 ' + pageNo + ' 页 data-source-refs 必须是无重复非空字符串数组');
      }
      if (!evidence || typeof evidence !== 'object' || Array.isArray(evidence)) throw new Error('第 ' + pageNo + ' 页 data-source-evidence 必须是对象');
      if (!Array.isArray(mustRefs) || mustRefs.some(function (value) { return typeof value !== 'string' || !value; })) {
        throw new Error('第 ' + pageNo + ' 页 data-must-refs 必须是字符串数组');
      }
      var evidenceKeys = Object.keys(evidence).sort();
      if (JSON.stringify(evidenceKeys) !== JSON.stringify(refs.slice().sort())) {
        throw new Error('第 ' + pageNo + ' 页 source evidence 与 source refs 不是一一对应');
      }
      var visibleText = vNextVisiblePayloadText(slide);
      refs.forEach(function (sourceId) {
        var terms = evidence[sourceId];
        if (!Array.isArray(terms) || !terms.length) throw new Error('第 ' + pageNo + ' 页 source[' + sourceId + ']没有可见证据词条');
        terms.forEach(function (term) { vNextAssertEvidence(visibleText, term, pageNo, '来源[' + sourceId + ']证据'); });
      });
      var ledger = context && context.source_ledger;
      var specMust = context && context.must;
      if (!ledger || !Array.isArray(ledger.sources) || !Array.isArray(ledger.page_sources) || !Array.isArray(specMust)) {
        root.dataset.vnextLedgerCheck = 'context-skip';
        slide.dataset.vnextSourceVisibilityCheck = 'pass';
        return;
      }
      var knownSources = new Set(ledger.sources.map(function (item) { return item && item.source_id; }).filter(Boolean));
      refs.forEach(function (sourceId) {
        if (!knownSources.has(sourceId)) throw new Error('第 ' + pageNo + ' 页引用了 source-ledger 未登记来源: ' + sourceId);
      });
      var pageEntries = ledger.page_sources.filter(function (item) { return item && item.page_id === slide.dataset.pageId; });
      if (pageEntries.length !== 1) throw new Error('第 ' + pageNo + ' 页在 source-ledger 中不是恰好一条');
      var pageEntry = pageEntries[0];
      if (JSON.stringify(pageEntry.source_refs) !== JSON.stringify(refs)
        || JSON.stringify(pageEntry.source_evidence) !== JSON.stringify(evidence)
        || JSON.stringify(pageEntry.must_refs) !== JSON.stringify(mustRefs)) {
        throw new Error('第 ' + pageNo + ' 页 DOM 来源/must 与 source-ledger 不一致');
      }
      var mustById = {};
      specMust.forEach(function (item) { if (item && item.must_id) mustById[item.must_id] = item; });
      mustRefs.forEach(function (mustId) {
        var item = mustById[mustId];
        if (!item || item.status !== 'placed' || item.page_id !== slide.dataset.pageId) {
          throw new Error('第 ' + pageNo + ' 页 must[' + mustId + ']去向与 deck-spec 不一致');
        }
        vNextAssertEvidence(visibleText, item.visible_evidence, pageNo, 'must[' + mustId + ']证据');
      });
      slide.dataset.vnextSourceVisibilityCheck = 'pass';
    }
    function assertDeckContractV3(all, context) {
      if (!root.dataset.buildId || !root.dataset.layoutRegistryVersion || !root.dataset.runtimeVersion) {
        throw new Error('Wise PPT 成品缺少 build/layout-registry/runtime 版本');
      }
      all.forEach(function (slide, index) {
        var pageNo = index + 1;
        if (slide.dataset.layoutSource !== 'registered' || !slide.dataset.layoutId || !slide.dataset.layoutSeedSha256) {
          throw new Error('第 ' + pageNo + ' 页不是锁定 registered layout');
        }
        if (slide.querySelector('style')) throw new Error('第 ' + pageNo + ' 页含页面级 CSS');
        if (slide.querySelector('[data-page-css],[data-handwritten-geometry]')) {
          throw new Error('第 ' + pageNo + ' 页含标准模式禁项标记');
        }
        vNextAssertPayloadContent(slide, pageNo);
        vNextAssertPayloadInternalFit(slide, pageNo);
        vNextAssertTypography(slide, pageNo);
        vNextAssertSafeAreaAndOverflow(slide, pageNo);
        vNextAssertSources(slide, pageNo, context);
        slide.dataset.deckContractCheck = 'pass';
      });
      if (root.dataset.vnextLedgerCheck !== 'context-skip') root.dataset.vnextLedgerCheck = 'pass';
      root.dataset.vnextContentCheck = all.every(function (slide) { return slide.dataset.vnextContentCheck === 'pass'; }) ? 'pass' : 'fail';
      root.dataset.vnextFitCheck = all.every(function (slide) { return slide.dataset.vnextFitCheck === 'pass'; }) ? 'pass' : 'fail';
      root.dataset.vnextTypographyCheck = all.every(function (slide) { return slide.dataset.vnextTypographyCheck === 'pass'; }) ? 'pass' : 'fail';
      root.dataset.vnextOverflowCheck = all.every(function (slide) { return slide.dataset.vnextOverflowCheck === 'pass'; }) ? 'pass' : 'fail';
      root.dataset.vnextSafeAreaCheck = all.every(function (slide) { return slide.dataset.vnextSafeAreaCheck === 'pass'; }) ? 'pass' : 'fail';
      root.dataset.vnextSourceVisibilityCheck = all.every(function (slide) { return slide.dataset.vnextSourceVisibilityCheck === 'pass'; }) ? 'pass' : 'fail';
      root.dataset.deckContractCheck = 'pass';
    }
    function assertDeckContract(all, context) {
      if (root.dataset.deckContractVersion !== '5') {
        throw new Error('正式成品必须声明 data-deck-contract-version=5');
      }
      assertDeckContractV3(all, context);
    }
    function selfTestResult() {
      return {
        status: root.dataset.runtimeCheck || '',
        error: root.dataset.runtimeCheckError || '',
        deck_contract_check: root.dataset.deckContractCheck || '',
        content_check: root.dataset.vnextContentCheck || '',
        fit_check: root.dataset.vnextFitCheck || '',
        typography_check: root.dataset.vnextTypographyCheck || '',
        overflow_check: root.dataset.vnextOverflowCheck || '',
        safe_area_check: root.dataset.vnextSafeAreaCheck || '',
        source_visibility_check: root.dataset.vnextSourceVisibilityCheck || '',
        ledger_check: root.dataset.vnextLedgerCheck || '',
        font_check: root.dataset.fontCheck || ''
      };
    }
    function selfTest(context) {
      if (selfTestStarted) return selfTestResult();
      selfTestStarted = true;
      root.dataset.runtimeCheck = 'running';
      delete root.dataset.runtimeCheckError;
      try {
        rebuildBoard();
        var all = allSlides();
        var cards = board.querySelectorAll('.board-card');
        if (cards.length !== all.length) throw new Error('画册卡片数量不一致');
        if (!query.has('accent') && track.querySelector('[data-emphasis-active="true"]')) {
          throw new Error('关闭主题焦点时不得保留 data-emphasis-active');
        }
        if (serifTitlesActive()) {
          all.filter(function (slide) {
            return ['display', 'hero', 'title', 'heading'].includes(slide.dataset.primaryTypeRole);
          }).forEach(function (slide) {
            var primary = slide.querySelector('[data-primary-text]');
            if (!primary || !getComputedStyle(primary).fontFamily.includes('Han Serif')) {
              throw new Error('mixed/all-serif 字体档的 heading/title/hero/display 主文字必须使用思源宋体');
            }
          });
          if (track.querySelector('[data-typography-emphasis-size="large"]:is(code,pre,.mono,[data-text-kind="number"],[data-text-kind="meta"],[data-text-kind="source"],[data-text-kind="furniture"],[data-text-kind="label"])')) {
            throw new Error('数字、代码、图表标签或元信息不得切换为字体档宋体');
          }
        }
        var canvasCount = track.querySelectorAll('canvas').length;
        var copied = board.querySelectorAll('canvas[data-canvas-copied="true"]').length;
        if (copied !== canvasCount) throw new Error('Canvas 克隆像素未完整复制');
        if (query.has('accent') !== root.classList.contains('accent')) throw new Error('强调模式未按 URL 激活');
        all.filter(function (slide) { return slide.dataset.emphasisMode === 'semantic-focus'; }).forEach(function (slide) {
          var active = bindSemanticEmphasis(slide);
          var refs = new Set(active.map(function (node) { return node.dataset.contentRef; }));
          if (refs.size !== 1 || !refs.has(slide.dataset.emphasisRef)) throw new Error('semantic-focus 页面激活了多个焦点组');
          slide.querySelectorAll('[data-emphasis-active="true"]').forEach(function (target) {
            var expected = normalizedCssColor(resolvedEmphasisColor(target));
            var style = getComputedStyle(target);
            var actual = [style.color, style.fill, style.borderColor, style.outlineColor, style.stroke];
            var hasThemeFocus = actual.includes(expected);
            if (query.has('accent') && !hasThemeFocus) throw new Error('强调载体没有应用当前主题焦点色');
            if (!query.has('accent') && hasThemeFocus) throw new Error('默认模式残留当前主题焦点色');
          });
        });
        if (query.has('accent')) {
          var typographyProperties = [
            'fontFamily', 'fontSize', 'fontStyle', 'fontWeight', 'fontStretch',
            'fontFeatureSettings', 'fontVariationSettings', 'letterSpacing', 'wordSpacing',
            'lineHeight', 'textDecorationLine', 'textShadow', 'textTransform'
          ];
          function typographySnapshot(node) {
            var style = getComputedStyle(node);
            var snapshot = {};
            typographyProperties.forEach(function (property) { snapshot[property] = style[property]; });
            snapshot.stroke = style.stroke;
            snapshot.strokeWidth = style.strokeWidth;
            return snapshot;
          }
          var typographyTargets = [];
          var typographySeen = new Set();
          all.forEach(function (slide) {
            slide.querySelectorAll('[data-emphasis-active="true"]').forEach(function (carrier) {
              var candidates = [carrier].concat(Array.prototype.slice.call(carrier.querySelectorAll('*')));
              candidates.forEach(function (node) {
                var hasDirectText = Array.prototype.some.call(node.childNodes || [], function (child) {
                  return child.nodeType === Node.TEXT_NODE && child.nodeValue.trim();
                });
                if (!hasDirectText && !node.matches('text, tspan')) return;
                if (typographySeen.has(node)) return;
                typographySeen.add(node);
                typographyTargets.push({ node: node, accent: typographySnapshot(node) });
              });
            });
          });
          root.classList.remove('accent');
          typographyTargets.forEach(function (item) { item.normal = typographySnapshot(item.node); });
          root.classList.add('accent');
          typographyTargets.forEach(function (item) {
            typographyProperties.forEach(function (property) {
              if (item.accent[property] !== item.normal[property]) {
                throw new Error('主题焦点不得改变文字排印属性: ' + property);
              }
            });
            var accentStroke = item.accent.stroke + '|' + item.accent.strokeWidth;
            var normalStroke = item.normal.stroke + '|' + item.normal.strokeWidth;
            if (accentStroke !== normalStroke) throw new Error('主题焦点不得通过 SVG 文字描边制造视觉加粗');
          });
        }
        var svgTypeTarget = track.querySelector('[font-size*="var(--type-"]');
        if (svgTypeTarget) {
          var svgRole = svgTypeTarget.getAttribute('font-size').match(/--type-([a-z-]+)/);
          var svgSize = Number.parseFloat(getComputedStyle(svgTypeTarget).fontSize);
          if (!svgRole || !Number.isFinite(svgSize) || Math.abs(svgSize - typeSize(svgRole[1])) > .1) throw new Error('SVG 字阶 token 未解析');
        }
        typeSize('caption');
        typeSize('micro-secondary');
        root.dataset.typeCheck = 'pass';
        assertRelativeRuntimeAssets();
        history.replaceState(null, '', '#' + all.length);
        fromHash();
        if (!body.classList.contains('mode-deck')) throw new Error('深链未进入放映');
        assertViewportFit();
        assertControls();

        assertDeckContract(all, context || null);
        all.forEach(function (slide, index) {
          go(index);
          assertGeometry(slide, index);
          var caption = slide.querySelector('.caption');
          var candidates = [caption].concat(Array.prototype.slice.call(slide.querySelectorAll('h1,h2,p,[data-content-ref]'))).filter(Boolean);
          var copyTarget = candidates.find(function (node) { return node.textContent && node.textContent.trim(); });
          if (!copyTarget || getComputedStyle(copyTarget).userSelect === 'none') throw new Error('第 ' + (index + 1) + ' 页正文不可选择');
          var selection = selectText(copyTarget);
          if (!selection.toString().trim()) throw new Error('第 ' + (index + 1) + ' 页无法建立文本选区');
          var before = location.hash;
          dispatchKey(global, 'ArrowRight');
          if (location.hash !== before) throw new Error('文本选区被翻页快捷键抢占');
          selection.removeAllRanges();
          testEditableReservation(slide, index, 'input');
          testEditableReservation(slide, index, 'contenteditable');
        });
        root.dataset.selectionCheck = 'pass';
        root.dataset.inputCheck = 'pass';
        root.dataset.contenteditableCheck = 'pass';
        root.dataset.copyCheck='pass';
        if (root.dataset.geometryContractVersion === '1') {
          if (all.some(function (slide) { return slide.dataset.geometryContractCheck !== 'pass'; })) throw new Error('几何契约覆盖不完整');
          root.dataset.geometryCheck = 'pass';
        } else {
          root.dataset.geometryCheck = 'not-applicable';
        }

        go(0);
        if (all.length > 1) {
          dispatchKey(global, 'ArrowRight');
          if (location.hash !== '#2') throw new Error('键盘翻页失败');
        }
        dispatchKey(global, 'Escape');
        if (!body.classList.contains('mode-board') || location.hash) throw new Error('真实 ESC KeyboardEvent 状态切换失败');
        root.dataset.escCheck = 'pass';
        if (root.dataset.fontCheck !== 'pass') throw new Error('字体加载门禁未通过');
        root.dataset.runtimeCheck = 'pass';
      } catch (error) {
        root.dataset.deckContractCheck = 'fail';
        root.dataset.runtimeCheck = 'fail';
        root.dataset.runtimeCheckError = error.message;
        console.error(error);
      }
      return selfTestResult();
    }

    function onViewportChange() {
      fit();
      if (body.classList.contains('mode-board')) rebuildBoard();
    }
    addEventListener('resize', onViewportChange);
    if (global.visualViewport) {
      global.visualViewport.addEventListener('resize', onViewportChange);
      global.visualViewport.addEventListener('scroll', onViewportChange);
    }
    addEventListener('hashchange', fromHash);
    addEventListener('keydown', function (event) {
      if (!body.classList.contains('mode-deck')) return;
      if (event.key === 'Escape') { event.preventDefault(); exitDeck(); return; }
      if (navigationIsReserved(event)) return;
      if (['ArrowRight', 'ArrowDown', ' ', 'PageDown'].includes(event.key)) { event.preventDefault(); go(current + 1); }
      else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(event.key)) { event.preventDefault(); go(current - 1); }
      else if (event.key === 'Home') { event.preventDefault(); go(0); }
      else if (event.key === 'End') { event.preventDefault(); go(allSlides().length - 1); }
    });

    var toggle = document.getElementById('board-toggle');
    var deck = document.getElementById('deck');
    if (toggle) toggle.addEventListener('click', exitDeck);
    if (deck) {
      deck.addEventListener('touchstart', function (event) {
        touchStartX = hasTextSelection() ? null : event.changedTouches[0].clientX;
      }, { passive: true });
      deck.addEventListener('touchend', function (event) {
        if (touchStartX === null || hasTextSelection()) { touchStartX = null; return; }
        var delta = event.changedTouches[0].clientX - touchStartX;
        if (Math.abs(delta) > 48) go(current + (delta < 0 ? 1 : -1));
        touchStartX = null;
      }, { passive: true });
    }

    document.addEventListener('wise-ppt:ready', function () {
      if (!root.classList.contains('print-mode')) rebuildBoard();
      if (query.get('selftest') === '1') selfTest();
    });
    allSlides().forEach(function (slide) {
      if (slide.dataset.renderPending !== 'true' && slide.dataset.renderReady !== 'true') markSlideReady(slide);
    });
    updateDeckReady();
    fit();
    fromHash();
    if (query.get('selftest') === '1' && updateDeckReady()) selfTest();
    var runtimeApi = {
      rebuildBoard: rebuildBoard,
      enterDeck: enterDeck,
      exitDeck: exitDeck,
      go: go,
      fit: fit,
      selfTest: selfTest,
      selfTestContract: 'wise-ppt-runtime-selftest@2'
    };
    if (root.dataset.runtimeTestProbe === 'internal-fit') {
      runtimeApi.assertPayloadInternalFit = vNextAssertPayloadInternalFit;
    }
    global.WisePPTRuntime = runtimeApi;
  }

  function start() {
    Promise.all([shellReady, stageFitReady]).then(function () {
      if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize, { once: true });
      else initialize();
    }).catch(function (error) {
      root.dataset.runtimeCheck = 'fail';
      root.dataset.runtimeCheckError = error.message;
      root.dataset.deckError = 'true';
      console.error(error);
    });
  }

  start();
})(window);
