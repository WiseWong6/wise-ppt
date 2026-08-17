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

  function emphasisColor(slide, contentRef, role, fallback) {
    if (!slide || !root.classList.contains('accent')) return fallback;
    var roles = (slide.dataset.emphasisRoles || '').split(/\s+/).filter(Boolean);
    if (slide.dataset.emphasisMode !== 'semantic-focus' || slide.dataset.emphasisRef !== contentRef || !roles.includes(role)) return fallback;
    return color('focus');
  }

  function color(role) {
    var roles = {
      'surface-canvas': 'paper', 'surface-recessed': 'paper-deep', 'surface-panel': 'paper-panel',
      'primary': 'ink', 'functional': 'ink-80', 'body': 'ink-70', 'chart-label': 'ink-55',
      'metadata': 'ink-45', 'divider': 'ink-25', 'construction': 'ink-12',
      'focus': 'accent-red', 'focus-secondary': 'accent-red-85', 'focus-peripheral': 'accent-red-65',
      'data-1': 'data-ramp-1', 'data-2': 'data-ramp-2', 'data-3': 'data-ramp-3',
      'data-4': 'data-ramp-4', 'data-5': 'data-ramp-5', 'data-6': 'data-ramp-6'
    };
    var token = roles[role];
    if (!token) throw new Error('未知主题颜色角色: ' + role);
    var value = getComputedStyle(root).getPropertyValue('--' + token).trim();
    if (!value) throw new Error('主题缺少 --' + token + ' token');
    return value;
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
        /* @import keeps the compatibility shared.css usable as a font source. */
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
    return Array.from(unique.values());
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
        var sample = face.family === 'Courier Prime' ? 'Aa01' : '汉字Aa01';
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

  function markSlideReady(slide) {
    if (!slide || !slide.classList.contains('slide')) throw new Error('markSlideReady 需要 .slide 节点');
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
      return Promise.all([fontReady].concat(images, registeredTasks.get(slide) || []));
    }).then(function () {
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
    color: color,
    typeSize: typeSize,
    updateDeckReady: updateDeckReady,
    createIcon: createIcon,
    icons: ICON_PATHS,
    fontReady: fontReady
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
      var summary = document.createElement('div');
      summary.className = 'board-summary';
      summary.textContent = slide.dataset.pageSummary;
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
        body.className = 'mode-board';
        rebuildBoard();
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
    function assertGeometryContract(slide, pageNo) {
      var sources = slide.querySelectorAll('script[type="application/json"][data-geometry-contract]');
      var coverageRequired = root.dataset.geometryContractVersion === '1';
      if (!sources.length) {
        if (coverageRequired) throw new Error('第 ' + pageNo + ' 页缺少 data-geometry-contract');
        slide.dataset.geometryContractCheck = 'legacy-skip';
        return;
      }
      if (sources.length !== 1) throw new Error('第 ' + pageNo + ' 页必须且只能声明一个几何契约');
      var source = sources[0];
      var contract;
      try { contract = JSON.parse(source.textContent); }
      catch (error) { throw new Error('第 ' + pageNo + ' 页几何契约不是合法 JSON: ' + error.message); }
      if (!contract || typeof contract !== 'object' || Array.isArray(contract)) throw new Error('第 ' + pageNo + ' 页几何契约顶层必须是对象');
      var topLevelKeys = ['format', 'primitive', 'canvas', 'content_region', 'anchors', 'relations'];
      var unknownTopLevelKeys = Object.keys(contract).filter(function (key) { return !topLevelKeys.includes(key); });
      if (unknownTopLevelKeys.length) throw new Error('第 ' + pageNo + ' 页几何契约包含未知字段: ' + unknownTopLevelKeys.join(','));
      if (contract.format !== 'wise-ppt-geometry@1') throw new Error('第 ' + pageNo + ' 页几何契约版本错误');
      if (typeof contract.primitive !== 'string' || !contract.primitive.trim()) throw new Error('第 ' + pageNo + ' 页几何契约缺少 primitive');
      if (!contract.canvas || contract.canvas.width !== 1920 || contract.canvas.height !== 1080) throw new Error('第 ' + pageNo + ' 页几何画布必须为 1920×1080');
      if (!Array.isArray(contract.anchors) || !contract.anchors.length) throw new Error('第 ' + pageNo + ' 页几何契约必须声明 anchors');
      if (!Array.isArray(contract.relations) || !contract.relations.length) throw new Error('第 ' + pageNo + ' 页几何契约必须声明 relations');

      var relationArity = {
        contain: 2, hardBoundary: 2, avoid: 2, clear: 2, pathClear: 2, ownerOverlap: 2,
        edgeEq: 2, bottomEq: 2, offsetEq: 2, centerBetween: 3, mirrorEq: 3, pathAnchor: 2
      };
      var boundaryRelationTypes = ['contain', 'hardBoundary', 'avoid', 'clear', 'pathClear', 'ownerOverlap'];
      var alignmentRelationTypes = ['edgeEq', 'bottomEq', 'offsetEq', 'centerBetween', 'mirrorEq', 'pathAnchor'];
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
      if (Object.keys(contract.content_region).sort().join('|') !== 'anchor_id|zone') throw new Error('第 ' + pageNo + ' 页 content_region 只能声明 anchor_id 与 zone');
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
        else if (['centerBetween', 'mirrorEq'].includes(relation.type)) allowedRelationKeys.push('axis');
        else if (relation.type === 'pathAnchor') allowedRelationKeys.push('max_distance');
        var unknownRelationKeys = Object.keys(relation).filter(function (key) { return !allowedRelationKeys.includes(key); });
        if (unknownRelationKeys.length) throw new Error('第 ' + pageNo + ' 页关系[' + relation.relation_id + '] 包含未知字段: ' + unknownRelationKeys.join(','));
        if (!Array.isArray(relation.anchors) || relation.anchors.length !== relationArity[relation.type]) throw new Error('第 ' + pageNo + ' 页关系[' + relation.relation_id + '] anchor 数量错误');
        var unknownRelationAnchors = relation.anchors.filter(function (anchorId) { return !declaredAnchorIds.includes(anchorId); });
        if (unknownRelationAnchors.length) throw new Error('第 ' + pageNo + ' 页关系[' + relation.relation_id + '] 引用未知 anchor[' + unknownRelationAnchors.join(',') + ']');
        var declaredTolerance = Number(relation.tolerance || 0);
        if (!Number.isFinite(declaredTolerance) || declaredTolerance < 0) throw new Error('第 ' + pageNo + ' 页关系[' + relation.relation_id + '] tolerance 非法');
        var toleranceLimit = relation.type === 'centerBetween' ? 3 : 1;
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
      var rects = {}, nodes = {};
      contract.anchors.forEach(function (anchor) {
        if (!anchor || typeof anchor.anchor_id !== 'string' || anchor.selector !== '[data-anchor-id="' + anchor.anchor_id + '"]') throw new Error('第 ' + pageNo + ' 页 anchor 非法');
        var matches = slide.querySelectorAll(anchor.selector);
        if (matches.length !== 1) throw new Error('第 ' + pageNo + ' 页 anchor[' + anchor.anchor_id + '] 应唯一，实际 ' + matches.length);
        nodes[anchor.anchor_id] = matches[0];
        rects[anchor.anchor_id] = logicalRect(nodes[anchor.anchor_id]);
      });
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
        } else if (relation.type === 'centerBetween') {
          var triple = requireAnchors(relation, 3);
          var first = triple[1], second = triple[2];
          var axis = relation.axis || 'x';
          if (axis !== 'x' && axis !== 'y') throw new Error('第 ' + pageNo + ' 页关系[' + relation.relation_id + '] axis 非法');
          if (axis === 'x') expected = center(first, axis) <= center(second, axis) ? (first.right + second.left) / 2 : (second.right + first.left) / 2;
          else expected = center(first, axis) <= center(second, axis) ? (first.bottom + second.top) / 2 : (second.bottom + first.top) / 2;
          actual = center(triple[0], axis);
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
      if (slide.dataset.layoutSource === 'free_build' && slide.dataset.primaryRelation) {
        var internalNodes = Array.prototype.slice.call(slide.querySelectorAll('[data-geometry-role]'));
        var internalContents = internalNodes.filter(function (node) { return node.dataset.geometryRole === 'content'; });
        if (internalContents.length < 2) throw new Error('第 ' + pageNo + ' 页自由构建关系页至少声明 2 个 data-geometry-role="content" 内部内容组');
        var allowedInternalRoles = ['content', 'boundary', 'path'];
        var internalIds = [];
        internalNodes.forEach(function (node) {
          var role = node.dataset.geometryRole, anchorId = node.dataset.anchorId;
          if (!allowedInternalRoles.includes(role)) throw new Error('第 ' + pageNo + ' 页内部几何角色非法: ' + role);
          if (!anchorId || !declaredAnchorIds.includes(anchorId)) throw new Error('第 ' + pageNo + ' 页内部几何节点必须以 data-anchor-id 进入 geometry: ' + (anchorId || '-'));
          internalIds.push(anchorId);
        });
        var internalCoverage = {};
        contract.relations.forEach(function (relation) {
          if (!boundaryRelationTypes.includes(relation.type)) return;
          var participants = relation.anchors.filter(function (anchorId) { return internalIds.includes(anchorId); });
          if (participants.length < 2) return;
          participants.forEach(function (anchorId) { internalCoverage[anchorId] = true; });
        });
        var uncoveredInternal = internalIds.filter(function (anchorId) { return !internalCoverage[anchorId]; });
        if (uncoveredInternal.length) throw new Error('第 ' + pageNo + ' 页自由构建页内部节点未参与内部边界关系: ' + uncoveredInternal.join(','));
      }
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
    function assertDeckContractV2(all) {
      if (root.dataset.deckContractVersion !== '2') throw new Error('正式成品缺少 data-deck-contract-version=2');
      var tokenRoles = ['display','hero','title','metric','heading','emphasis','caption','subheading','body','body-small','micro-secondary','label','meta'];
      var tokenSizes = {};
      tokenRoles.forEach(function (role) { tokenSizes[role] = typeSize(role); });
      var large = { display:true, hero:true, title:true };
      var componentTypePaths = {};
      function visible(el) {
        if (!el || el.closest('script,style,defs,desc,title,[aria-hidden="true"],[data-contract-only="true"]')) return false;
        var cs = getComputedStyle(el), r = el.getBoundingClientRect();
        return cs.display !== 'none' && cs.visibility !== 'hidden' && Number.parseFloat(cs.opacity || '1') > 0 && r.width > .1 && r.height > .1;
      }
      function roleForSize(size) {
        var match = tokenRoles.find(function (role) { return Math.abs(tokenSizes[role] - size) <= .25; });
        return match || null;
      }
      function textElements(slide) {
        var result = [], seen = new Set();
        var walker = document.createTreeWalker(slide, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) {
          if (!walker.currentNode.nodeValue.trim()) continue;
          var el = walker.currentNode.parentElement;
          if (!visible(el) || seen.has(el)) continue;
          seen.add(el); result.push(el);
        }
        return result;
      }
      function componentPath(el, owner) {
        var parts = [], node = el;
        while (node && node !== owner) {
          var part = node.tagName.toLowerCase();
          if (node.classList.length) part += '.' + Array.from(node.classList).sort().join('.');
          if (node.parentElement) {
            var sameTag = Array.prototype.filter.call(node.parentElement.children, function (sibling) { return sibling.tagName === node.tagName; });
            if (sameTag.length > 1) part += ':nth-of-type(' + (sameTag.indexOf(node) + 1) + ')';
          }
          parts.unshift(part); node = node.parentElement;
        }
        return parts.join('>');
      }
      function assertNoCrossPlaceholder(slide, pageNo) {
        Array.prototype.forEach.call(slide.querySelectorAll('svg rect'), function (rect) {
          var x = Number(rect.getAttribute('x')), y = Number(rect.getAttribute('y'));
          var w = Number(rect.getAttribute('width')), h = Number(rect.getAttribute('height'));
          if (![x,y,w,h].every(Number.isFinite) || w < 18 || h < 18) return;
          var diagonal = 0;
          Array.prototype.forEach.call(rect.ownerSVGElement.querySelectorAll('line'), function (line) {
            var x1=Number(line.getAttribute('x1')), y1=Number(line.getAttribute('y1')), x2=Number(line.getAttribute('x2')), y2=Number(line.getAttribute('y2'));
            var a = Math.abs(x1-x)<=2 && Math.abs(y1-y)<=2 && Math.abs(x2-(x+w))<=2 && Math.abs(y2-(y+h))<=2;
            var b = Math.abs(x2-x)<=2 && Math.abs(y2-y)<=2 && Math.abs(x1-(x+w))<=2 && Math.abs(y1-(y+h))<=2;
            var c = Math.abs(x1-x)<=2 && Math.abs(y1-(y+h))<=2 && Math.abs(x2-(x+w))<=2 && Math.abs(y2-y)<=2;
            var d = Math.abs(x2-x)<=2 && Math.abs(y2-(y+h))<=2 && Math.abs(x1-(x+w))<=2 && Math.abs(y1-y)<=2;
            if (a || b || c || d) diagonal++;
          });
          if (diagonal >= 2) throw new Error('第 ' + pageNo + ' 页出现矩形加双对角线叉号占位符');
        });
      }
      all.forEach(function (slide, index) {
        var pageNo = index + 1;
        var primary = slide.querySelectorAll('[data-primary-text],canvas[data-canvas-type-role]');
        if (primary.length !== 1) throw new Error('第 ' + pageNo + ' 页主文字标记不是恰好一个');
        var declaredPrimary = slide.dataset.primaryTypeRole;
        var primaryRole = primary[0].tagName === 'CANVAS' ? primary[0].dataset.canvasTypeRole : roleForSize(Number.parseFloat(getComputedStyle(primary[0]).fontSize));
        if (primaryRole !== declaredPrimary) throw new Error('第 ' + pageNo + ' 页主字档声明为 ' + declaredPrimary + '，实际为 ' + primaryRole);
        var pageLargeCount = 0, relationOversize = null;
        textElements(slide).forEach(function (el) {
          var size = Number.parseFloat(getComputedStyle(el).fontSize);
          var role = roleForSize(size);
          if (!role) throw new Error('第 ' + pageNo + ' 页存在无法映射 design token 的字号 ' + size + 'px');
          var furniture = !!el.closest('.doc,.folio,[data-text-kind="furniture"]');
          var smallAllowed = furniture || !!el.closest('[data-text-kind="label"],[data-text-kind="number"],[data-text-kind="source"]');
          if (size < tokenSizes['body-small'] && !smallAllowed) throw new Error('第 ' + pageNo + ' 页正文使用 ' + size + 'px 小字档');
          if (large[role] && !furniture) pageLargeCount++;
          if (slide.dataset.primaryRelation && slide.dataset.primaryRelation !== 'focus' && size > tokenSizes.heading && !furniture) {
            relationOversize = relationOversize || role;
          }
          var owner = el.closest('[data-component-id]');
          if (owner) {
            var key = owner.dataset.componentId + '|' + componentPath(el, owner);
            var prior = componentTypePaths[key];
            if (prior && prior !== role) throw new Error('同一组件文本路径字档不一致: ' + key + ' (' + prior + ' vs ' + role + ')');
            componentTypePaths[key] = role;
          }
        });
        if (pageLargeCount > 1) throw new Error('第 ' + pageNo + ' 页出现多个 title/hero/display 级文字');
        if (relationOversize) throw new Error('第 ' + pageNo + ' 页普通关系页超过 heading 字档: ' + relationOversize);
        Array.prototype.forEach.call(slide.querySelectorAll('img'), function (img) {
          if (!img.complete || img.naturalWidth === 0) throw new Error('第 ' + pageNo + ' 页存在失效图片: ' + (img.getAttribute('src') || '-'));
        });
        if (/\b(?:placeholder|todo)\b/i.test(slide.innerText || '')) throw new Error('第 ' + pageNo + ' 页出现 placeholder/TODO');
        assertNoCrossPlaceholder(slide, pageNo);
        Array.prototype.forEach.call(slide.querySelectorAll('[data-layout-slot]'), function (slot) {
          var comp = slot.matches('[data-component-id]') ? slot : slot.querySelector('[data-component-id]');
          if (!comp) return;
          var r = slot.getBoundingClientRect(), stageRect=slide.querySelector('.stage').getBoundingClientRect(), scale=stageRect.width/1920 || 1;
          var slotWidth=r.width/scale, slotHeight=r.height/scale, minW=Number(comp.dataset.contractMinWidth), minH=Number(comp.dataset.contractMinHeight);
          var minA=Number(comp.dataset.contractMinAspect), maxA=Number(comp.dataset.contractMaxAspect), aspect=slotWidth/slotHeight;
          if (minW && slotWidth + .5 < minW) throw new Error('第 ' + pageNo + ' 页组件槽宽 ' + slotWidth.toFixed(0) + 'px < ' + minW + 'px');
          if (minH && slotHeight + .5 < minH) throw new Error('第 ' + pageNo + ' 页组件槽高 ' + slotHeight.toFixed(0) + 'px < ' + minH + 'px');
          if (minA && aspect < minA) throw new Error('第 ' + pageNo + ' 页组件槽宽高比过小');
          if (maxA && aspect > maxA) throw new Error('第 ' + pageNo + ' 页组件槽宽高比过大');
        });
        Array.prototype.forEach.call(slide.querySelectorAll('[data-layout-slot] .swiss-card,[data-layout-slot] .pi-card'), function (card) {
          var cs=getComputedStyle(card), inner=card.querySelector('.swiss-card__content,.pi-card__content');
          if (Number.parseFloat(cs.minHeight) > .5 || Number.parseFloat(cs.borderTopWidth) > .1 || cs.backgroundColor !== 'rgba(0, 0, 0, 0)') throw new Error('第 ' + pageNo + ' 页组件预览外壳未归零');
          if (inner) {
            var ci=getComputedStyle(inner);
            if (Number.parseFloat(ci.minHeight) > .5 || Number.parseFloat(ci.paddingTop) > .1 || Number.parseFloat(ci.borderTopWidth) > .1 || ci.display === 'flex') throw new Error('第 ' + pageNo + ' 页组件内容预览样式未归零');
          }
        });
        if (slide.dataset.templateId) {
          var stage = slide.querySelector(':scope > .stage');
          Array.prototype.forEach.call(stage ? stage.children : [], function (node) {
            if (node.matches('script,[data-contract-only="true"]')) return;
            if (visible(node) && !node.dataset.templatePart) throw new Error('第 ' + pageNo + ' 页非关系模板新增可见节点');
          });
        }
        slide.dataset.deckContractCheck = 'pass';
      });
      root.dataset.deckContractCheck = 'pass';
    }
    function selfTest() {
      if (selfTestStarted) return;
      selfTestStarted = true;
      try {
        rebuildBoard();
        var all = allSlides();
        var cards = board.querySelectorAll('.board-card');
        if (cards.length !== all.length) throw new Error('画册卡片数量不一致');
        var canvasCount = track.querySelectorAll('canvas').length;
        var copied = board.querySelectorAll('canvas[data-canvas-copied="true"]').length;
        if (copied !== canvasCount) throw new Error('Canvas 克隆像素未完整复制');
        if (query.has('accent') !== root.classList.contains('accent')) throw new Error('强调模式未按 URL 激活');
        all.filter(function (slide) { return slide.dataset.emphasisMode === 'semantic-focus'; }).forEach(function (slide) {
          var target = slide.querySelector('[data-emphasis-role]');
          if (!target) throw new Error('semantic-focus 页面缺少强调载体');
          var style = getComputedStyle(target);
          var red = 'rgb(192, 57, 43)';
          var isRed = style.color === red || style.borderColor === red || style.outlineColor === red;
          if (query.has('accent') && !isRed) throw new Error('强调载体没有应用主题强调色');
          if (!query.has('accent') && isRed) throw new Error('默认模式残留主题强调色');
        });
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

        assertDeckContractV2(all);
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
          root.dataset.geometryCheck = 'legacy-skip';
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
    global.WisePPTRuntime = { rebuildBoard: rebuildBoard, enterDeck: enterDeck, exitDeck: exitDeck, go: go, fit: fit };
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
