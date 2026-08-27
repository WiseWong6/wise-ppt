(function initPaperInkEChartsAdapter(root, factory) {
  const api = factory('paper-ink.echarts', 'paper-ink');
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) {
    const registry = root.WisePPTThemeAdapters || (root.WisePPTThemeAdapters = {});
    registry[api.adapterId] = api;
  }
})(typeof window !== 'undefined' ? window : globalThis, function createEChartsAdapter(adapterId, themeId) {
  'use strict';

  const COLOR_TOKENS = Object.freeze({
    surfaceCanvas: '--wp-color-surface-canvas',
    surfaceRecessed: '--wp-color-surface-recessed',
    primary: '--wp-color-primary',
    functional: '--wp-color-functional',
    body: '--wp-color-body',
    chartLabel: '--wp-color-chart-label',
    divider: '--wp-color-divider',
    construction: '--wp-color-construction',
    sans: '--wp-font-sans',
    mono: '--wp-font-mono'
  });

  function deepClone(value, seen) {
    if (value === null || typeof value !== 'object') return value;
    const visited = seen || new Map();
    if (visited.has(value)) return visited.get(value);
    if (value instanceof Date) return new Date(value.getTime());
    const output = Array.isArray(value) ? [] : {};
    visited.set(value, output);
    Reflect.ownKeys(value).forEach((key) => { output[key] = deepClone(value[key], visited); });
    return output;
  }

  function computedToken(root, name) {
    if (!root) return '';
    const view = root.ownerDocument && root.ownerDocument.defaultView;
    const getStyle = view && typeof view.getComputedStyle === 'function'
      ? view.getComputedStyle.bind(view)
      : (typeof getComputedStyle === 'function' ? getComputedStyle : null);
    return getStyle ? getStyle(root).getPropertyValue(name).trim() : '';
  }

  function getToken(context, name) {
    const value = context && typeof context.getToken === 'function'
      ? context.getToken(name)
      : computedToken(context && context.root, name);
    return String(value || '').trim() || `var(${name})`;
  }

  function getSize(context, name) {
    const value = getToken(context, name);
    const numeric = Number.parseFloat(value);
    return Number.isFinite(numeric) ? numeric : undefined;
  }

  function withDefined(values) {
    const result = {};
    Object.keys(values).forEach((key) => {
      if (values[key] !== undefined) result[key] = values[key];
    });
    return result;
  }

  function appendCssDeclaration(source, declaration) {
    const text = String(source || '');
    if (!text) return declaration;
    return `${text}${/;\s*$/.test(text) ? '' : ';'}${declaration}`;
  }

  function mapOption(value, callback) {
    if (Array.isArray(value)) value.forEach(callback);
    else if (value) callback(value);
  }

  function resolveTokens(context) {
    const tokens = {};
    Object.keys(COLOR_TOKENS).forEach((key) => { tokens[key] = getToken(context, COLOR_TOKENS[key]); });
    tokens.dataRamp = [1, 2, 3, 4, 5, 6]
      .map((step) => getToken(context, `--wp-color-data-${step}`));
    tokens.labelSize = getSize(context, '--type-label');
    tokens.metaSize = getSize(context, '--type-meta');
    tokens.titleSize = getSize(context, '--type-subheading');
    return tokens;
  }

  function adaptAxis(axis, tokens) {
    axis.axisLine = Object.assign({}, axis.axisLine, {
      lineStyle: Object.assign({}, axis.axisLine && axis.axisLine.lineStyle, {
        color: tokens.divider,
        width: 1
      })
    });
    axis.axisTick = Object.assign({}, axis.axisTick, {
      lineStyle: Object.assign({}, axis.axisTick && axis.axisTick.lineStyle, {
        color: tokens.divider,
        width: 1
      })
    });
    axis.splitLine = Object.assign({}, axis.splitLine, {
      lineStyle: Object.assign({}, axis.splitLine && axis.splitLine.lineStyle, {
        color: tokens.construction,
        width: 1
      })
    });
    axis.axisLabel = Object.assign({}, axis.axisLabel, withDefined({
      color: tokens.chartLabel,
      fontFamily: tokens.mono,
      fontSize: tokens.metaSize
    }));
    axis.nameTextStyle = Object.assign({}, axis.nameTextStyle, withDefined({
      color: tokens.chartLabel,
      fontFamily: tokens.sans,
      fontSize: tokens.metaSize
    }));
  }

  function adaptSeries(series, index, tokens) {
    const tone = tokens.dataRamp[tokens.dataRamp.length - 1 - (index % tokens.dataRamp.length)];
    series.itemStyle = Object.assign({}, series.itemStyle, {
      borderRadius: 0,
      shadowBlur: 0,
      shadowColor: 'transparent'
    });
    if (!['pie', 'sankey', 'heatmap', 'map'].includes(series.type)) series.itemStyle.color = tone;
    else delete series.itemStyle.color;
    series.label = Object.assign({}, series.label, withDefined({
      color: tokens.chartLabel,
      fontFamily: tokens.sans,
      fontSize: tokens.metaSize
    }));

    if (series.type === 'line') {
      series.lineStyle = Object.assign({}, series.lineStyle, { color: tone, width: 1 });
      series.itemStyle = Object.assign({}, series.itemStyle, {
        color: tokens.surfaceCanvas,
        borderColor: tone,
        borderWidth: 1
      });
      if (series.areaStyle) {
        series.areaStyle = Object.assign({}, series.areaStyle, {
          color: tokens.dataRamp[Math.min(index + 1, tokens.dataRamp.length - 1)]
        });
      }
    }
    if (series.type === 'bar') {
      series.backgroundStyle = Object.assign({}, series.backgroundStyle, {
        color: tokens.construction,
        borderRadius: 0
      });
      series.label = Object.assign({}, series.label, {
        color: tokens.chartLabel
      });
    }
    if (series.type === 'pie') {
      series.radius = series.radius || ['30%', '68%'];
      series.center = series.center || ['50%', '52%'];
      series.itemStyle = Object.assign({}, series.itemStyle, {
        borderColor: tokens.surfaceCanvas,
        borderWidth: 1
      });
      series.labelLine = Object.assign({}, series.labelLine, {
        length2: 7.5,
        lineStyle: Object.assign({}, series.labelLine && series.labelLine.lineStyle, {
          color: tokens.divider,
          width: 1
        })
      });
    }
    if (series.type === 'radar') {
      series.lineStyle = Object.assign({}, series.lineStyle, { color: tone, width: 1.2 });
      series.areaStyle = Object.assign({}, series.areaStyle, {
        color: tokens.dataRamp[Math.min(index + 1, tokens.dataRamp.length - 1)]
      });
    }
    if (series.type === 'tree') {
      series.lineStyle = Object.assign({}, series.lineStyle, { color: tokens.divider, width: 1 });
      series.itemStyle = Object.assign({}, series.itemStyle, {
        color: tokens.surfaceCanvas,
        borderColor: tokens.functional,
        borderWidth: 1.2
      });
    }
    if (series.type === 'sankey') {
      if (series.left === undefined) series.left = '5%';
      if (series.right === undefined) series.right = '8%';
      if (series.top === undefined) series.top = '8%';
      if (series.bottom === undefined) series.bottom = '8%';
      /* 官方 Sankey 母板用 gradient 表达“从哪流向哪”。旧适配器把它强制改成
         chartLabel 单灰色，再叠 ECharts 的低透明度，流带会糊成一片浅灰。
         保留 gradient/source/target 这三类真实流向着色；无语义色时才回落到墨阶。 */
      const sourceLineStyle = series.lineStyle || {};
      const sourceLinkColor = sourceLineStyle.color;
      const semanticLinkColor = ['gradient', 'source', 'target'].includes(sourceLinkColor)
        ? sourceLinkColor
        : tokens.chartLabel;
      /* 节点是实心图形标记，配色合同里属于 always_on_identity 组：只能取
         functional 与 data 阶梯，不能借用 primary/body/chart-label 这些
         neutral_text 墨色——白橙/白蓝下文字墨色会渲染成黑块。主节点用
         functional 建立骨架，其余按 data 阶梯递减；保留母板显式节点颜色。 */
      const nodeTones = [
        tokens.functional,
        tokens.dataRamp[5],
        tokens.dataRamp[4],
        tokens.dataRamp[3],
        tokens.dataRamp[2],
        tokens.dataRamp[1]
      ];
      if (Array.isArray(series.data)) {
        series.data = series.data.map((node, nodeIndex) => {
          if (!node || typeof node !== 'object') return node;
          const itemStyle = Object.assign({}, node.itemStyle);
          if (!itemStyle.color) itemStyle.color = nodeTones[nodeIndex % nodeTones.length];
          return Object.assign({}, node, { itemStyle });
        });
      }
      series.lineStyle = Object.assign({}, series.lineStyle, {
        color: semanticLinkColor,
        opacity: Number.isFinite(sourceLineStyle.opacity) ? sourceLineStyle.opacity : .5,
        shadowBlur: 0
      });
      series.label = Object.assign({}, series.label, {
        color: tokens.primary,
        backgroundColor: tokens.surfaceCanvas,
        padding: [2, 4]
      });
      series.itemStyle = Object.assign({}, series.itemStyle, {
        borderColor: tokens.functional,
        borderWidth: 1.2
      });
    }
    if (series.type === 'heatmap') {
      series.itemStyle = Object.assign({}, series.itemStyle, {
        borderColor: tokens.surfaceCanvas,
        borderWidth: .5
      });
    }
    if (series.type === 'map') {
      series.itemStyle = Object.assign({}, series.itemStyle, {
        areaColor: tokens.construction,
        borderColor: tokens.divider,
        borderWidth: .8
      });
    }
  }

  function adaptOption(source, context) {
    const option = deepClone(source || {});
    const tokens = resolveTokens(context || {});
    option.backgroundColor = 'transparent';
    option.color = tokens.dataRamp.slice().reverse();
    option.textStyle = Object.assign({}, option.textStyle, withDefined({
      color: tokens.body,
      fontFamily: tokens.sans,
      fontSize: tokens.labelSize
    }));
    option.tooltip = Object.assign({}, option.tooltip, {
      backgroundColor: tokens.surfaceCanvas,
      borderColor: tokens.divider,
      borderWidth: 1,
      borderRadius: 0,
      extraCssText: appendCssDeclaration(
        option.tooltip && option.tooltip.extraCssText,
        'box-shadow:none;'
      ),
      textStyle: Object.assign({}, option.tooltip && option.tooltip.textStyle, withDefined({
        color: tokens.body,
        fontFamily: tokens.sans,
        fontSize: tokens.metaSize
      }))
    });
    mapOption(option.legend, (legend) => {
      legend.textStyle = Object.assign({}, legend.textStyle, withDefined({
        color: tokens.chartLabel,
        fontFamily: tokens.sans,
        fontSize: tokens.metaSize
      }));
    });
    mapOption(option.title, (title) => {
      title.textStyle = Object.assign({}, title.textStyle, withDefined({
        color: tokens.body,
        fontFamily: tokens.sans,
        fontSize: tokens.titleSize,
        fontWeight: 500
      }));
    });
    mapOption(option.xAxis, (axis) => adaptAxis(axis, tokens));
    mapOption(option.yAxis, (axis) => adaptAxis(axis, tokens));
    mapOption(option.radar, (radar) => {
      radar.axisName = Object.assign({}, radar.axisName, withDefined({
        color: tokens.chartLabel,
        fontFamily: tokens.sans,
        fontSize: tokens.metaSize
      }));
      radar.axisLine = Object.assign({}, radar.axisLine, {
        lineStyle: Object.assign({}, radar.axisLine && radar.axisLine.lineStyle, {
          color: tokens.divider,
          width: 1
        })
      });
      radar.splitLine = Object.assign({}, radar.splitLine, {
        lineStyle: Object.assign({}, radar.splitLine && radar.splitLine.lineStyle, {
          color: tokens.construction,
          width: 1
        })
      });
      radar.splitArea = Object.assign({}, radar.splitArea, {
        areaStyle: Object.assign({}, radar.splitArea && radar.splitArea.areaStyle, {
          color: ['transparent']
        })
      });
    });
    mapOption(option.calendar, (calendar) => {
      const host = context && context.element;
      const hostHeight = host && Number(host.clientHeight);
      if (Number.isFinite(hostHeight) && hostHeight > 0) {
        const usableHeight = Math.max(112, hostHeight - 150);
        calendar.cellSize = ['auto', Math.max(16, Math.min(42, Math.floor(usableHeight / 7)))];
        calendar.top = Math.max(88, Math.round((hostHeight - Math.min(usableHeight, 294)) / 2));
        calendar.bottom = 'auto';
      }
      calendar.itemStyle = Object.assign({}, calendar.itemStyle, {
        color: tokens.surfaceCanvas,
        borderColor: tokens.divider,
        borderWidth: .5
      });
      calendar.splitLine = Object.assign({}, calendar.splitLine, {
        lineStyle: Object.assign({}, calendar.splitLine && calendar.splitLine.lineStyle, {
          color: tokens.divider,
          width: 1
        })
      });
      ['dayLabel', 'monthLabel', 'yearLabel'].forEach((labelName) => {
        calendar[labelName] = Object.assign({}, calendar[labelName], withDefined({
          color: tokens.chartLabel,
          fontFamily: tokens.mono,
          fontSize: tokens.metaSize
        }));
      });
    });
    mapOption(option.visualMap, (visualMap) => {
      visualMap.inRange = Object.assign({}, visualMap.inRange, { color: tokens.dataRamp.slice() });
      if (Array.isArray(visualMap.pieces)) {
        const ramp = tokens.dataRamp.slice().reverse();
        visualMap.pieces = visualMap.pieces.map((piece, index) => Object.assign({}, piece, {
          color: ramp[Math.min(index, ramp.length - 1)]
        }));
        visualMap.outOfRange = Object.assign({}, visualMap.outOfRange, {
          color: tokens.construction
        });
      }
      visualMap.textStyle = Object.assign({}, visualMap.textStyle, withDefined({
        color: tokens.chartLabel,
        fontFamily: tokens.mono,
        fontSize: tokens.metaSize
      }));
    });
    (option.series || []).forEach((series, index) => adaptSeries(series, index, tokens));
    return option;
  }

  const META_TEXT_COMPONENTS = new Set([
    'xAxis', 'yAxis', 'angleAxis', 'radiusAxis', 'singleAxis', 'parallelAxis',
    'calendar', 'radar', 'legend', 'visualMap', 'dataZoom', 'timeline'
  ]);
  const TEXT_SEMANTIC_HANDLERS = new WeakMap();

  function componentTypeForElement(element) {
    for (let current = element; current; current = current.parent) {
      const info = current.__ecComponentInfo;
      if (info && typeof info.mainType === 'string') return info.mainType;
    }
    return '';
  }

  function semanticTextSpans(chart) {
    const zr = chart && typeof chart.getZr === 'function' ? chart.getZr() : null;
    const storage = zr && zr.storage;
    const displayList = storage && typeof storage.getDisplayList === 'function'
      ? storage.getDisplayList(true)
      : [];
    const textOwners = new Map();
    displayList.forEach((candidate) => {
      const text = candidate && typeof candidate.getTextContent === 'function'
        ? candidate.getTextContent()
        : null;
      if (text) textOwners.set(text, candidate);
    });
    return displayList
      .filter(element => element && element.type === 'tspan' && element.style
        && String(element.style.text == null ? '' : element.style.text).trim())
      .map((span) => {
        const textElement = span.parent || span;
        const owner = textOwners.get(textElement) || textElement;
        const mainType = componentTypeForElement(owner) || componentTypeForElement(textElement);
        const kind = mainType === 'series'
          ? 'label'
          : (META_TEXT_COMPONENTS.has(mainType) ? 'meta' : '');
        return { text: String(span.style.text), kind, mainType };
      });
  }

  function directSvgTextOwners(chart) {
    const host = chart && typeof chart.getDom === 'function' ? chart.getDom() : null;
    if (!host || typeof host.querySelectorAll !== 'function') return [];
    return Array.from(host.querySelectorAll('svg text, svg tspan')).filter((element) => (
      Array.from(element.childNodes || []).some(node => node.nodeType === 3 && String(node.nodeValue || '').trim())
    ));
  }

  function applyRenderedTextSemantics(chart) {
    const rendered = semanticTextSpans(chart);
    const owners = directSvgTextOwners(chart);
    let renderedIndex = 0;
    let annotated = 0;
    owners.forEach((owner) => {
      const text = String(owner.textContent || '');
      let matchIndex = renderedIndex;
      while (matchIndex < rendered.length && rendered[matchIndex].text !== text) matchIndex += 1;
      if (matchIndex >= rendered.length) return;
      const semantic = rendered[matchIndex];
      renderedIndex = matchIndex + 1;
      owner.removeAttribute('data-text-kind');
      owner.removeAttribute('data-wise-echarts-text-role');
      if (!semantic.kind) return;
      owner.setAttribute('data-text-kind', semantic.kind);
      owner.setAttribute('data-wise-echarts-text-role', semantic.mainType);
      annotated += 1;
    });
    return annotated;
  }

  function annotateRenderedText(chart) {
    if (!chart || typeof chart.on !== 'function') return 0;
    if (!TEXT_SEMANTIC_HANDLERS.has(chart)) {
      const handler = () => applyRenderedTextSemantics(chart);
      TEXT_SEMANTIC_HANDLERS.set(chart, handler);
      chart.on('rendered', handler);
    }
    return applyRenderedTextSemantics(chart);
  }

  return Object.freeze({
    adapterId,
    themeId,
    target: 'echarts-option',
    adaptOption,
    annotateRenderedText
  });
});
