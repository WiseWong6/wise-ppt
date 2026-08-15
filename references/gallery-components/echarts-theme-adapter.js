/* Wise PPT · ECharts Gallery 预览编排层。
 * 静态视觉唯一归 themes/<theme>/adapters/echarts.js；本兼容文件名模块只保留
 * iframe 的预览几何与画册本地动效预览，并旁路 Theme 返回的色彩、字体与线条结果。
 */
(function initEchartsThemeAdapter(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.WiseEchartsThemeAdapter = api;
})(typeof window !== 'undefined' ? window : globalThis, function createEchartsThemeAdapter() {
  'use strict';

  function mapOption(value, callback) {
    if (Array.isArray(value)) value.forEach(callback);
    else if (value) callback(value);
  }

  function adaptSeriesGeometry(series, isDetail) {
    if (series.type === 'line') {
      series.symbol = 'circle';
      if (!isDetail) series.symbolSize = 3;
    }
    if (series.type === 'radar' && !isDetail) series.symbolSize = 3;
    if (series.type === 'tree') series.symbol = 'circle';
  }

  function previewTypeSize(typeSize, role, fallback) {
    if (typeof typeSize !== 'function') return fallback;
    const value = Number(typeSize(role));
    return Number.isFinite(value) ? value : fallback;
  }

  function adaptGalleryGeometry(option, entry, isDetail, typeSize) {
    if (entry.component_id === 'echarts.pie-access-source') {
      mapOption(option.legend, (legend) => {
        legend.orient = 'horizontal';
        legend.left = 'center';
        /* 与饼图合并计算边界:图例钉在饼缘下方 16–20px,组合在 16:9 画布内垂直居中,不钉画布底 */
        delete legend.bottom;
        legend.top = isDetail ? '72%' : '74%';
        legend.itemWidth = isDetail ? 14 : 10;
        legend.itemHeight = isDetail ? 8 : 6;
        legend.itemGap = isDetail ? 18 : 7;
      });
      mapOption(option.series, (series) => {
        series.center = ['50%', '47%'];
        series.radius = isDetail ? '44%' : '48%';
        series.label = Object.assign({}, series.label, isDetail ? {
          show: true,
          alignTo: 'edge',
          edgeDistance: 12,
          bleedMargin: 5,
          width: 170,
          overflow: 'truncate'
        } : { show: false });
        series.labelLine = Object.assign({}, series.labelLine, isDetail ? {
          show: true,
          length: 12,
          length2: 8
        } : { show: false });
      });
    }

    if (entry.component_id === 'echarts.sankey-basic') {
      /* 左右留白基本对称,标签宽度计入右缘,整图在画布内水平居中 */
      mapOption(option.series, (series) => {
        series.orient = 'horizontal';
        series.left = isDetail ? '6%' : '5%';
        series.right = isDetail ? '12%' : '11%';
        series.top = isDetail ? '10%' : '9%';
        series.bottom = isDetail ? '10%' : '9%';
        series.nodeWidth = isDetail ? 18 : 14;
        series.nodeGap = isDetail ? 12 : 10;
        series.label = Object.assign({}, series.label, {
          distance: isDetail ? 6 : 4,
          width: isDetail ? 110 : 96,
          overflow: 'truncate',
          fontSize: isDetail
            ? previewTypeSize(typeSize, 'meta', 10)
            : Math.max(9, previewTypeSize(typeSize, 'meta', 10) - 1)
        });
      });
    }

    if (entry.component_id === 'echarts.calendar-basic') {
      /* 日历是天然宽扁构图:16:9 画布下格宽按 53 周锁定近方形(11px),整块内容水平居中,
         不拉伸格子去填满宽度;详情逐项保留官方 calendar-heatmap 构图,缩略图只做可读性降噪 */
      if (isDetail) {
        /* 说明、分段图例与日历作为一个组合在画布内垂直居中 */
        mapOption(option.title, (title) => { title.top = '33%'; });
        mapOption(option.visualMap, (visualMap) => {
          visualMap.show = true;
          visualMap.top = '39%';
          visualMap.itemWidth = 10;
          visualMap.itemHeight = 10;
          visualMap.itemGap = 4;
          visualMap.textStyle = Object.assign({}, visualMap.textStyle, {
            fontSize: Math.min(10, previewTypeSize(typeSize, 'meta', 10))
          });
        });
        mapOption(option.calendar, (calendar) => {
          calendar.top = '51%';
          calendar.left = 'center';
          delete calendar.right;
          calendar.cellSize = [11, 13];
        });
      } else {
        mapOption(option.title, (title) => { title.show = false; });
        mapOption(option.visualMap, (visualMap) => { visualMap.show = false; });
        mapOption(option.calendar, (calendar) => {
          calendar.top = '45%';
          calendar.left = 'center';
          delete calendar.right;
          calendar.cellSize = [11, 12];
          calendar.monthLabel = Object.assign({}, calendar.monthLabel, { show: true });
          calendar.yearLabel = Object.assign({}, calendar.yearLabel, { show: false });
        });
      }
    }
  }

  /* opts: { isDetail, themeAdapter, themeContext, typeSize, animated } */
  function previewOption(entry, opts) {
    const settings = opts || {};
    const isDetail = !!settings.isDetail;
    const themeAdapter = settings.themeAdapter;
    if (!entry || !entry.option) throw new Error('ECharts Gallery entry is missing option');
    if (!themeAdapter || typeof themeAdapter.adaptOption !== 'function') {
      throw new Error('ECharts Theme adapter is unavailable');
    }
    const option = themeAdapter.adaptOption(entry.option, settings.themeContext || {});
    if (!option || typeof option !== 'object' || option === entry.option) {
      throw new Error('ECharts Theme adapter must return a cloned option');
    }
    if (settings.animated) {
      /* Gallery 动态预览：只控制 ECharts 原生动画参数，不归 Theme 所有。 */
      option.animation = true;
      option.animationDuration = 900;
      option.animationEasing = 'cubicOut';
      option.animationDelay = function (idx) { return Math.min(idx * 40, 800); };
      option.animationDurationUpdate = 600;
      option.animationEasingUpdate = 'cubicOut';
    } else {
      option.animation = false;
    }
    mapOption(option.series, (series) => adaptSeriesGeometry(series, isDetail));
    adaptGalleryGeometry(option, entry, isDetail, settings.typeSize);
    return option;
  }

  return Object.freeze({ previewOption });
});
