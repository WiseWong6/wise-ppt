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
        delete legend.top;
        legend.bottom = isDetail ? 12 : 2;
        legend.itemWidth = isDetail ? 14 : 10;
        legend.itemHeight = isDetail ? 8 : 6;
        legend.itemGap = isDetail ? 18 : 7;
      });
      mapOption(option.series, (series) => {
        series.center = ['50%', isDetail ? '43%' : '42%'];
        series.radius = isDetail ? '39%' : '34%';
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
      mapOption(option.series, (series) => {
        series.left = isDetail ? '7%' : '4%';
        series.right = isDetail ? '16%' : '26%';
        series.top = isDetail ? '7%' : '6%';
        series.bottom = isDetail ? '7%' : '6%';
        series.nodeWidth = isDetail ? 18 : 8;
        series.nodeGap = isDetail ? 10 : 6;
        series.label = Object.assign({}, series.label, {
          distance: isDetail ? 5 : 2,
          width: isDetail ? 92 : 52,
          overflow: 'truncate',
          fontSize: isDetail
            ? previewTypeSize(typeSize, 'meta', 10)
            : Math.max(9, previewTypeSize(typeSize, 'meta', 10) - 1)
        });
      });
    }

    if (entry.component_id === 'echarts.calendar-basic') {
      /* 日历是天然宽扁构图：格宽被 53 周锁死（≈11px），格高取 12 保持近方形，
         整块内容在外框内垂直居中，不拉伸格子去填满高度 */
      mapOption(option.visualMap, (visualMap) => {
        visualMap.show = isDetail;
        visualMap.top = isDetail ? 250 : 8;
      });
      mapOption(option.calendar, (calendar) => {
        calendar.top = isDetail ? 350 : 258;
        calendar.left = isDetail ? 40 : 28;
        calendar.right = isDetail ? 40 : 8;
        calendar.cellSize = ['auto', 12];
        calendar.yearLabel = Object.assign({}, calendar.yearLabel, { show: isDetail });
        calendar.monthLabel = Object.assign({}, calendar.monthLabel, { show: isDetail });
      });
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
