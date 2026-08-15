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
    if (!['pie', 'sankey', 'heatmap'].includes(series.type)) series.itemStyle.color = tone;
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
        color: tokens.surfaceRecessed,
        borderRadius: 0
      });
    }
    if (series.type === 'pie') {
      series.itemStyle = Object.assign({}, series.itemStyle, {
        borderColor: tokens.surfaceCanvas,
        borderWidth: 1
      });
      series.labelLine = Object.assign({}, series.labelLine, {
        length2: 15,
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
      series.lineStyle = Object.assign({}, series.lineStyle, {
        color: tokens.chartLabel,
        shadowBlur: 0
      });
      series.itemStyle = Object.assign({}, series.itemStyle, {
        borderColor: tokens.surfaceCanvas,
        borderWidth: 1
      });
    }
    if (series.type === 'heatmap') {
      series.itemStyle = Object.assign({}, series.itemStyle, {
        borderColor: tokens.surfaceCanvas,
        borderWidth: .5
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
      visualMap.textStyle = Object.assign({}, visualMap.textStyle, withDefined({
        color: tokens.chartLabel,
        fontFamily: tokens.mono,
        fontSize: tokens.metaSize
      }));
    });
    (option.series || []).forEach((series, index) => adaptSeries(series, index, tokens));
    return option;
  }

  return Object.freeze({ adapterId, themeId, target: 'echarts-option', adaptOption });
});
