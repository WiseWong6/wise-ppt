(function initPaperInkAtlasAdapter(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) {
    const registry = root.WisePPTThemeAdapters || (root.WisePPTThemeAdapters = {});
    registry[api.adapterId] = api;
  }
})(typeof window !== 'undefined' ? window : globalThis, function createPaperInkAtlasAdapter() {
  'use strict';

  const COLOR_LITERAL_RE = /#[0-9a-f]{3,8}\b|rgba?\([^)]*\)|hsla?\([^)]*\)|\b(?:white|black|red|green|blue|yellow|orange|gr[ae]y)\b/gi;
  const CUSTOM_COLOR_VAR_RE = /var\(--(?:swiss|atlas|morndraft|arch|tone|color)[^)]+\)/gi;
  const GRADIENT_RE = /(?:linear|radial|conic)-gradient\([^;}]*(?:\)[^;}]*)?\)/gi;
  const MONO_RE = /(?:\bpre\b|\bcode\b|\.mono\b|[-_](?:number|index|metric|value|year|date|id|code)\b)/i;
  const BRUSH_RE = /(?:\.brush\b|\.kai\b|handwrit|annotation)/i;
  const META_RE = /(?:meta|caption|note|hint|source|legend|axis|tick|label|date|year|eyebrow|subtitle|secondary|dim|muted)/i;
  const BODY_RE = /(?:\bp\b|\bli\b|description|\bdesc\b|body|copy|content)/i;
  const HEADING_RE = /(?:\bh[1-6]\b|title|heading|strong|metric|value|kpi|year)/i;
  const WEAK_LINE_RE = /(?:grid|axis|tick|construction|guide|divider|separator|\bhr\b|table|\btd\b|\bth\b|caption)/i;
  const FUNCTIONAL_LINE_RE = /(?:track|edge|connector|link|arrow|path|spine|rib|timeline|outline|ring|shape|line)/i;
  const LINE_PSEUDO_RE = /(?:::before|::after|\bhr\b|divider|separator|track|connector|timeline|spine|rib|guide|axis|line)/i;
  const SMALL_MARK_RE = /(?:^|[-_. ])(?:dot|bullet|marker|core|point)(?:$|[-_. :])/i;
  const DATA_RE = /(?:chart|series|bar\b|heat|map\b|wedge|slice|segment|radar|data-|tone-[a-f]\b)/i;
  const TEXT_RE = /(?:\btext\b|\btspan\b|label|title|caption|axis|legend|value|year)/i;

  // Real token values are owned by the theme stylesheet. The adapter emits only
  // theme-owned compatibility tokens (plus public font tokens), preserving the
  // established Atlas neutral ramp across Gallery, Runtime and Node exporters.
  const TOKEN_CSS = '';

  const COMPONENT_OVERRIDES = `
    .swiss-card {
      --swiss-accent: var(--wp-compat-atlas-ink-80);
      --atlas-orange: var(--wp-compat-atlas-ink-80);
      background: var(--wp-compat-atlas-paper) !important;
      color: var(--wp-compat-atlas-ink);
      border-radius: 0 !important;
      box-shadow: none !important;
      font-family: var(--wp-font-sans) !important;
    }
    .swiss-card--cover { background: var(--wp-compat-atlas-paper-deep) !important; }
    .swiss-card--body { background: var(--wp-compat-atlas-paper) !important; }
    .swiss-card *, .swiss-card *::before, .swiss-card *::after {
      box-shadow: none !important;
      text-shadow: none !important;
    }
    .swiss-card h1, .swiss-card h2, .swiss-card h3,
    .swiss-card h4, .swiss-card h5, .swiss-card h6 {
      color: var(--wp-compat-atlas-ink) !important;
      font-family: var(--wp-font-sans) !important;
    }
    .swiss-card p, .swiss-card li, .swiss-card blockquote {
      color: var(--wp-compat-atlas-ink-70);
      font-family: var(--wp-font-sans) !important;
    }
    .swiss-card pre, .swiss-card code, .swiss-card .mono,
    .swiss-card [class*="number"], .swiss-card [class*="metric"],
    .swiss-card [class*="value"] {
      font-family: var(--wp-font-mono) !important;
    }
    .swiss-card pre, .swiss-card .code-block, .swiss-card .code-header {
      background: var(--wp-compat-atlas-paper-deep) !important;
      color: var(--wp-compat-atlas-ink) !important;
      border-radius: 0 !important;
    }
    .swiss-card hr {
      height: 1px !important;
      background: var(--wp-compat-atlas-ink-25) !important;
    }
    .swiss-card svg text, .swiss-card svg tspan {
      fill: var(--wp-compat-atlas-ink) !important;
      stroke: none !important;
      font-family: var(--wp-font-sans) !important;
    }
    .swiss-card table, .swiss-card th, .swiss-card td,
    .swiss-card .card, .swiss-card .box, .swiss-card .panel,
    .swiss-card [class*="card"], .swiss-card [class*="panel"] {
      border-radius: 0 !important;
    }

    /* ===== 专项组件覆盖 ===== */
    /* 修正三类通用启发式误判：深底白字（dark-on-dark）、容器误命中数据阶梯、
       SVG 自定义属性落入纯色兜底。只使用纸墨 token，不新增颜色。 */

    /* --- 004 工作流列表：11px 轻字在详情 contain-fit 下发虚，提升到可读正文档 --- */
    .swiss-card .list-card--workflow .workflow-kicker {
      font-size: 12px !important;
      line-height: 1.2 !important;
      color: var(--wp-compat-atlas-ink-55) !important;
    }
    .swiss-card .list-card--workflow .workflow-item-title {
      font-size: 16px !important;
      line-height: 1.4 !important;
    }
    .swiss-card .list-card--workflow .workflow-item-copy {
      font-size: 13px !important;
      line-height: 1.65 !important;
      color: var(--wp-compat-atlas-ink-70) !important;
    }

    /* --- 008 三栏：小图标允许功能性反白，其余保持纸面中性层级 --- */
    .swiss-card .three-col-item {
      background: var(--wp-compat-atlas-paper-panel) !important;
      border: 1px solid var(--wp-compat-atlas-ink-25) !important;
    }
    .swiss-card .three-col-item::before {
      height: 1px !important;
      background: var(--wp-compat-atlas-ink-55) !important;
    }
    .swiss-card .three-col-icon {
      background: var(--wp-compat-atlas-ink-80) !important;
      color: var(--wp-compat-atlas-paper) !important;
    }
    .swiss-card .three-col-number {
      color: var(--wp-compat-atlas-ink-55) !important;
    }
    .swiss-card .three-col-label {
      color: var(--wp-compat-atlas-ink) !important;
    }
    .swiss-card .three-col-desc {
      color: var(--wp-compat-atlas-ink-55) !important;
    }

    /* --- 007 双栏、015 对比：宽屏审阅时保持明确的居中主体，不随舞台无限拉宽 --- */
    .swiss-card .layout-grid.two-col,
    .swiss-card .vs-grid {
      width: 100% !important;
      max-width: 500px !important;
      margin-inline: auto !important;
    }

    /* --- 014 代码块：终端容器保留单一圆角矩形身份，内部仍无装饰性圆角 --- */
    .swiss-card .code-block {
      overflow: hidden !important;
      border: 1px solid var(--wp-compat-atlas-ink-25) !important;
      border-radius: 10px !important;
    }
    .swiss-card .code-header {
      border-radius: 9px 9px 0 0 !important;
    }
    .swiss-card .code-block pre {
      border-radius: 0 0 9px 9px !important;
    }

    /* --- 020 SWOT：不用彩色象限，靠大首字、细规则与字阶建立四块辨识度 --- */
    .swiss-card .swot {
      gap: 14px !important;
    }
    .swiss-card .swot .cell {
      background: var(--wp-compat-atlas-paper-panel) !important;
      border-left: 1.2px solid var(--wp-compat-atlas-ink-80) !important;
    }
    .swiss-card .swot .cell::before {
      color: var(--wp-compat-atlas-ink) !important;
      font-size: 60px !important;
      opacity: .28 !important;
    }
    .swiss-card .swot .cell h4 {
      padding-bottom: 8px !important;
      border-bottom: .6px solid var(--wp-compat-atlas-ink-25) !important;
      color: var(--wp-compat-atlas-ink) !important;
      font-size: 16px !important;
    }

    /* --- 021 象限：恢复清楚坐标骨架，中心为唯一功能焦点，四区用线面分层 --- */
    .swiss-card .quadrant-axis {
      gap: 14px 16px !important;
      padding: 38px 34px !important;
    }
    .swiss-card .quadrant-axis::before,
    .swiss-card .quadrant-axis::after {
      background: var(--wp-compat-atlas-ink-55) !important;
      opacity: 1 !important;
    }
    .swiss-card .quadrant-axis .axis-label {
      color: var(--wp-compat-atlas-ink-55) !important;
    }
    .swiss-card .quadrant-axis .axis-center {
      width: 52px !important;
      height: 52px !important;
      background: var(--wp-compat-atlas-ink-80) !important;
      color: var(--wp-compat-atlas-paper) !important;
      border: 1px solid var(--wp-compat-atlas-ink) !important;
    }
    .swiss-card .quadrant-axis .quadrant {
      background: var(--wp-compat-atlas-paper-panel) !important;
      border: .6px solid var(--wp-compat-atlas-ink-25) !important;
    }
    .swiss-card .quadrant-axis .quadrant .marker {
      color: var(--wp-compat-atlas-ink-45) !important;
    }
    .swiss-card .quadrant-axis .quadrant h4 {
      color: var(--wp-compat-atlas-ink) !important;
    }
    .swiss-card .quadrant-axis .quadrant p {
      color: var(--wp-compat-atlas-ink-70) !important;
    }

    /* --- 038 旅程图：整体等比收窄，保留路径、节点和标签的相对几何 --- */
    .swiss-card .journey {
      width: 72% !important;
      margin-inline: auto !important;
    }

    /* --- 040 垂直时间线：收束内容宽度后水平居中，避免视觉重量偏左 --- */
    .swiss-card .timeline[data-type="vertical"] {
      width: min(100%, 420px) !important;
      margin-inline: auto !important;
    }

    /* --- 043–047 同心圆、052/053 韦恩图：集合轮廓统一为 0.4px 发丝线 --- */
    .swiss-card .concentric .layer,
    .swiss-card .venn .v-circle,
    .swiss-card .venn-three .circle {
      border-width: .4px !important;
      border-color: var(--wp-compat-atlas-ink-55) !important;
    }

    /* --- 流程-换行变体：纸面步骤块 + 墨线直角边框 --- */
    .swiss-card .process-chain[data-type="wrap"] .step {
      background: var(--wp-compat-atlas-paper-panel) !important;
      border: 1px solid var(--wp-compat-atlas-ink-80) !important;
      color: var(--wp-compat-atlas-ink) !important;
    }
    .swiss-card .process-chain[data-type="wrap"] .step::after {
      color: var(--wp-compat-atlas-ink-55) !important;
    }
    .swiss-card .process-chain[data-type="wrap"] .step:nth-child(1)::after,
    .swiss-card .process-chain[data-type="wrap"] .step:nth-child(3)::after,
    .swiss-card .process-chain[data-type="wrap"] .step:nth-child(5)::after,
    .swiss-card .process-chain[data-type="wrap"] .step:nth-child(7)::after,
    .swiss-card .process-chain[data-type="wrap"] .step:nth-child(9)::after {
      color: var(--wp-compat-atlas-ink-55) !important;
      background: transparent !important;
    }

    /* --- 流程-箭头变体：步骤按序取数据阶梯，深色档反白 --- */
    .swiss-card .process-chain[data-type="arrow"] .step:nth-child(1) {
      background: var(--wp-compat-atlas-data-2) !important; color: var(--wp-compat-atlas-ink) !important;
    }
    .swiss-card .process-chain[data-type="arrow"] .step:nth-child(3) {
      background: var(--wp-compat-atlas-data-3) !important; color: var(--wp-compat-atlas-ink) !important;
    }
    .swiss-card .process-chain[data-type="arrow"] .step:nth-child(5) {
      background: var(--wp-compat-atlas-data-4) !important; color: var(--wp-compat-atlas-paper) !important;
    }
    .swiss-card .process-chain[data-type="arrow"] .step:nth-child(7) {
      background: var(--wp-compat-atlas-data-5) !important; color: var(--wp-compat-atlas-paper) !important;
    }
    .swiss-card .process-chain[data-type="arrow"] .step:nth-child(9) {
      background: var(--wp-compat-atlas-data-6) !important; color: var(--wp-compat-atlas-paper) !important;
    }

    /* --- 流程-标注箭头变体：tone 节点同样按序取阶梯 --- */
    .swiss-card .process-annotated-grid--arrow .step-node.tone-1 {
      background: var(--wp-compat-atlas-data-2) !important; color: var(--wp-compat-atlas-ink) !important;
    }
    .swiss-card .process-annotated-grid--arrow .step-node.tone-2 {
      background: var(--wp-compat-atlas-data-3) !important; color: var(--wp-compat-atlas-ink) !important;
    }
    .swiss-card .process-annotated-grid--arrow .step-node.tone-3 {
      background: var(--wp-compat-atlas-data-4) !important; color: var(--wp-compat-atlas-paper) !important;
    }
    .swiss-card .process-annotated-grid--arrow .step-node.tone-4 {
      background: var(--wp-compat-atlas-data-5) !important; color: var(--wp-compat-atlas-paper) !important;
    }
    .swiss-card .process-chain .arrow,
    .swiss-card .process-annotated-grid .step-link {
      color: var(--wp-compat-atlas-ink-55) !important;
    }

    /* --- 循环流程 / 闭环流程：纸面圆点 + 墨环，虚线连接环降为构造线 --- */
    .swiss-card .process-loop .loop-item {
      background: var(--wp-compat-atlas-paper) !important;
      border: 1px solid var(--wp-compat-atlas-ink-80) !important;
      color: var(--wp-compat-atlas-ink) !important;
    }
    .swiss-card .process-loop::before {
      border: 0.6px dashed var(--wp-compat-atlas-ink-25) !important;
    }

    /* --- 甘特图：纸深轨道 + 墨条进度，表头降为弱分隔 --- */
    .swiss-card .gantt .task-bar {
      background: var(--wp-compat-atlas-paper-deep) !important;
    }
    .swiss-card .gantt .task-bar .fill {
      background: var(--wp-compat-atlas-ink-80) !important;
    }
    .swiss-card .gantt-header {
      border-bottom: 0.6px solid var(--wp-compat-atlas-ink-25) !important;
    }

    /* --- 金字塔（正/倒）：五层连续阶梯，顶层最深，深色档反白 --- */
    .swiss-card .pyramid .level-1 {
      background: var(--wp-compat-atlas-data-6) !important; color: var(--wp-compat-atlas-paper) !important;
    }
    .swiss-card .pyramid .level-2 {
      background: var(--wp-compat-atlas-data-5) !important; color: var(--wp-compat-atlas-paper) !important;
    }
    .swiss-card .pyramid .level-3 {
      background: var(--wp-compat-atlas-data-4) !important; color: var(--wp-compat-atlas-paper) !important;
    }
    .swiss-card .pyramid .level-4 {
      background: var(--wp-compat-atlas-data-3) !important; color: var(--wp-compat-atlas-ink) !important;
    }
    .swiss-card .pyramid .level-5 {
      background: var(--wp-compat-atlas-data-2) !important; color: var(--wp-compat-atlas-ink) !important;
    }

    /* --- 冰山图：自定义属性回到纸墨 token，去掉纯黑兜底块 --- */
    .swiss-card .iceberg {
      --iceberg-line: var(--wp-compat-atlas-ink-55);
      --iceberg-top: var(--wp-compat-atlas-paper-panel);
      --iceberg-top-facet: var(--wp-compat-atlas-paper-deep);
      --iceberg-bottom: var(--wp-compat-atlas-paper-deep);
      --iceberg-bottom-facet: var(--wp-compat-atlas-data-2);
    }
    .swiss-card .iceberg__stage::after {
      background: none !important;
    }
    .swiss-card .iceberg__shadow {
      fill: var(--wp-compat-atlas-ink-12) !important;
    }

    /* --- 架构图系：tone 色族归一为纸墨中性层级，芯片改线稿 --- */
    .swiss-card .arch-tone-fill {
      background: var(--wp-compat-atlas-paper) !important;
      color: var(--wp-compat-atlas-ink) !important;
      border: 1px solid var(--wp-compat-atlas-ink-55) !important;
    }
    .swiss-card .arch-tone-label {
      background: var(--wp-compat-atlas-paper-deep) !important;
      color: var(--wp-compat-atlas-ink-70) !important;
    }
    .swiss-card .arch-tone-card {
      background: var(--wp-compat-atlas-paper-panel) !important;
      border-color: var(--wp-compat-atlas-ink-25) !important;
    }
    .swiss-card .arch-tone-wrap,
    .swiss-card .arch-tone-panel {
      background: var(--wp-compat-atlas-paper-deep) !important;
    }
    .swiss-card .av-item {
      background: var(--wp-compat-atlas-paper-deep) !important;
    }
    .swiss-card .arch-layer::after {
      color: var(--wp-compat-atlas-paper) !important;
    }

    /* --- 思维导图：节点改线稿，根节点小面积功能反白 --- */
    .swiss-card .mind-map .root-node {
      background: var(--wp-compat-atlas-ink-80) !important;
      color: var(--wp-compat-atlas-paper) !important;
    }
    .swiss-card .mind-map .node,
    .swiss-card .mind-map .sub-node {
      background: var(--wp-compat-atlas-paper) !important;
      border: 1px solid var(--wp-compat-atlas-ink-80) !important;
      color: var(--wp-compat-atlas-ink) !important;
    }
    .swiss-card .mind-map[data-type="vertical"] {
      margin-inline: auto !important;
      transform-origin: center center !important;
    }

    /* --- 雷达图 / 六边形雷达：纸面面板，数据区淡填 + 墨线轮廓 --- */
    .swiss-card .radar {
      background: var(--wp-compat-atlas-paper-panel) !important;
      border: 1px solid var(--wp-compat-atlas-ink-25) !important;
    }
    .swiss-card .radar-data {
      fill: var(--wp-compat-atlas-ink-12) !important;
      stroke: var(--wp-compat-atlas-ink-80) !important;
      stroke-width: 1.2 !important;
    }
    .swiss-card .radar-point {
      fill: var(--wp-compat-atlas-ink-80) !important;
      stroke: var(--wp-compat-atlas-paper) !important;
      stroke-width: 1.2 !important;
    }
    .swiss-card .radar-grid {
      stroke: var(--wp-compat-atlas-ink-12) !important;
    }
    .swiss-card .radar-axis {
      stroke: var(--wp-compat-atlas-ink-25) !important;
    }
    .swiss-card .radar-label {
      fill: var(--wp-compat-atlas-ink-55) !important;
    }
    .swiss-card .radar-legend-color {
      background: var(--wp-compat-atlas-ink-80) !important;
      border-color: var(--wp-compat-atlas-ink-80) !important;
    }

    .swiss-card .layout-grid.two-col p,
    .swiss-card .before-after--verification p,
    .swiss-card .arch-platform .ap-flat,
    .swiss-card .arch-platform .ap-flat *,
    .swiss-card .arch-platform .ap-grid-wrap,
    .swiss-card .arch-platform .ap-grid-wrap *,
    .swiss-card .arch-complex-v .av-content,
    .swiss-card .arch-complex-v .av-content * {
      font-family: var(--wp-font-sans) !important;
      font-weight: 300 !important;
    }`;

  function hasPaint(value) {
    COLOR_LITERAL_RE.lastIndex = 0;
    CUSTOM_COLOR_VAR_RE.lastIndex = 0;
    return COLOR_LITERAL_RE.test(String(value)) || CUSTOM_COLOR_VAR_RE.test(String(value));
  }

  function hasGradient(value) {
    GRADIENT_RE.lastIndex = 0;
    return GRADIENT_RE.test(String(value));
  }

  function replacePaint(value, token) {
    COLOR_LITERAL_RE.lastIndex = 0;
    CUSTOM_COLOR_VAR_RE.lastIndex = 0;
    return String(value)
      .replace(GRADIENT_RE, token)
      .replace(COLOR_LITERAL_RE, token)
      .replace(CUSTOM_COLOR_VAR_RE, token);
  }

  function dataRampFor(value) {
    const text = String(value).toLowerCase();
    const known = [
      ['5470c6', 6], ['3b658e', 6], ['002fa7', 6],
      ['91cc75', 5], ['28a745', 5], ['27c93f', 5],
      ['fac858', 4], ['ffc107', 4], ['ffbd2e', 4],
      ['ee6666', 3], ['e74c3c', 3], ['dc3545', 3],
      ['73c0de', 2], ['75c0df', 2], ['4aa9cd', 2]
    ];
    const match = known.find(([needle]) => text.includes(needle));
    if (match) return `var(--wp-compat-atlas-data-${match[1]})`;
    let hash = 0;
    for (const char of text) hash = ((hash << 5) - hash + char.charCodeAt(0)) | 0;
    return `var(--wp-compat-atlas-data-${Math.abs(hash) % 6 + 1})`;
  }

  function textToken(selector) {
    if (META_RE.test(selector)) return 'var(--wp-compat-atlas-ink-45)';
    if (BODY_RE.test(selector) && !HEADING_RE.test(selector)) return 'var(--wp-compat-atlas-ink-70)';
    return 'var(--wp-compat-atlas-ink)';
  }

  function lineToken(selector) {
    if (WEAK_LINE_RE.test(selector)) return 'var(--wp-compat-atlas-ink-25)';
    if (FUNCTIONAL_LINE_RE.test(selector)) return 'var(--wp-compat-atlas-ink-55)';
    return 'var(--wp-compat-atlas-ink-80)';
  }

  function fillToken(selector, value) {
    if (TEXT_RE.test(selector)) return textToken(selector);
    if (DATA_RE.test(selector)) return dataRampFor(value);
    if (SMALL_MARK_RE.test(selector)) return 'var(--wp-compat-atlas-ink-80)';
    if (FUNCTIONAL_LINE_RE.test(selector)) return 'var(--wp-compat-atlas-ink-55)';
    return 'var(--wp-compat-atlas-paper-deep)';
  }

  function surfaceToken(selector, value) {
    if (LINE_PSEUDO_RE.test(selector)) return lineToken(selector);
    if (SMALL_MARK_RE.test(selector) && !/step-node/i.test(selector)) return 'var(--wp-compat-atlas-ink-80)';
    if (DATA_RE.test(selector)) return dataRampFor(value);
    if (/(?:recess|muted|inactive|code|header|body|cell|step|node|item|layer)/i.test(selector)) {
      return 'var(--wp-compat-atlas-paper-deep)';
    }
    return 'var(--wp-compat-atlas-paper-panel)';
  }

  function normalizeBorder(selector, value) {
    const trimmed = String(value).trim();
    if (/^(?:none|0)(?:\s|$)/i.test(trimmed)) return value;
    const width = WEAK_LINE_RE.test(selector) ? 0.6 : 1;
    if (/^[0-9.]+px\b/i.test(trimmed)) return trimmed.replace(/^[0-9.]+px/i, `${width}px`);
    return trimmed;
  }

  function normalizeStrokeWidth(selector, value) {
    const numeric = Number.parseFloat(value);
    if (!Number.isFinite(numeric) || numeric === 0) return value;
    if (WEAK_LINE_RE.test(selector)) return '0.6';
    if (FUNCTIONAL_LINE_RE.test(selector)) return '1';
    return '1.2';
  }

  function normalizeLineDimension(selector, property, value) {
    if (!LINE_PSEUDO_RE.test(selector) || !['width', 'height'].includes(property)) return value;
    const match = String(value).trim().match(/^([0-9.]+)px$/i);
    if (!match || Number(match[1]) > 4 || Number(match[1]) === 0) return value;
    return WEAK_LINE_RE.test(selector) ? '0.6px' : '0.8px';
  }

  function fontToken(selector, value) {
    if (BRUSH_RE.test(selector) || /(?:WenKai|Xingkai|cursive)/i.test(value)) return 'var(--wp-font-brush)';
    if (MONO_RE.test(selector) || /(?:Mono|Courier|Menlo|Monaco|monospace)/i.test(value)) return 'var(--wp-font-mono)';
    return 'var(--wp-font-sans)';
  }

  function transformDeclaration(selector, property, rawValue) {
    const prop = property.toLowerCase();
    const value = String(rawValue).trim();

    if (prop === 'box-shadow' || prop === 'text-shadow') return 'none';
    if (prop === 'filter' && /drop-shadow/i.test(value)) return 'none';
    if (prop === 'background-image') return 'none';
    if (prop === 'border-radius') return /(?:^|\s)50%(?:\s|$)/.test(value) ? '50%' : '0';
    if (prop === 'font-family') return fontToken(selector, value);
    if (prop === 'stroke-width') return normalizeStrokeWidth(selector, value);
    if (/^border(?:-(?:top|right|bottom|left))?$/.test(prop)) {
      return replacePaint(normalizeBorder(selector, value), lineToken(selector));
    }
    if (/^border-(?:top-|right-|bottom-|left-)?width$/.test(prop)) {
      return WEAK_LINE_RE.test(selector) ? '0.6px' : '1px';
    }
    if (/^border-(?:top-|right-|bottom-|left-)?color$/.test(prop) || prop === 'outline-color') {
      return lineToken(selector);
    }
    if (prop.endsWith('-color')) return hasPaint(value) ? textToken(selector) : value;
    if (prop === 'color') return hasPaint(value) ? textToken(selector) : value;
    if (prop === 'stroke') return /^(?:none|transparent)$/i.test(value) ? value : replacePaint(value, lineToken(selector));
    if (prop === 'fill') return /^(?:none|transparent)$/i.test(value) ? value : replacePaint(value, fillToken(selector, value));
    if (prop === 'stop-color') return replacePaint(value, dataRampFor(value));
    if (prop === 'background' || prop === 'background-color') {
      if (/^(?:none|transparent)$/i.test(value)) return value;
      return hasPaint(value) || hasGradient(value)
        ? surfaceToken(selector, value)
        : value;
    }
    if (prop.startsWith('--') && hasPaint(value)) {
      if (/(?:paper|surface|background|bg)/i.test(prop)) return 'var(--wp-compat-atlas-paper-deep)';
      if (/(?:data|tone|series)/i.test(prop)) return dataRampFor(value);
      if (/(?:line|border|stroke)/i.test(prop)) return lineToken(selector);
      return 'var(--wp-compat-atlas-ink)';
    }
    return normalizeLineDimension(selector, prop, value);
  }

  function transformDeclarations(selector, body) {
    return String(body).replace(/(^|;)\s*([a-z-]+|--[\w-]+)\s*:\s*([^;{}]+)(?=;|$)/gi,
      (match, prefix, property, value) => `${prefix}\n  ${property}: ${transformDeclaration(selector, property, value)}`);
  }

  function adaptCss(source) {
    return String(source || '').replace(/([^{}]+)\{([^{}]*)\}/g,
      (match, selector, body) => `${selector}{${transformDeclarations(selector.trim(), body)}}`);
  }

  function repairArchitectureCopy(source) {
    const text = String(source || '');
    if (!/\b(?:arch-platform|arch-complex-v)\b/.test(text)) return text;
    return text
      .replace(/>Prompt配置</g, '>Prompt<')
      .replace(/>内部API接入</g, '>内部API<');
  }

  function adaptMarkup(source) {
    return repairArchitectureCopy(source).replace(/<([a-z][\w:-]*)([^>]*)>/gi, (tagSource, tagName, attributes) => {
      const className = attributes.match(/\bclass=(['"])(.*?)\1/i)?.[2] || '';
      const selector = `${tagName}.${className.trim().replace(/\s+/g, '.')}`;
      let next = attributes.replace(/\bstyle=(['"])(.*?)\1/gi,
        (styleSource, quote, declarations) => `style=${quote}${transformDeclarations(selector, declarations)}${quote}`);
      next = next.replace(/\b(fill|stroke|flood-color|stop-color|color)=(['"])(.*?)\2/gi, (attrSource, property, quote, value) => {
        if (/^(?:none|transparent|currentColor)$/i.test(value)) return attrSource;
        const prop = property.toLowerCase();
        const token = prop === 'fill'
          ? fillToken(selector, value)
          : prop === 'stop-color'
            ? dataRampFor(value)
            : prop === 'flood-color'
              ? 'var(--wp-compat-atlas-ink-12)'
              : prop === 'color'
                ? textToken(selector)
                : lineToken(selector);
        return `${property}=${quote}${token}${quote}`;
      });
      next = next.replace(/\bfilter=(['"])(.*?)\1/gi, 'filter="none"');
      next = next.replace(/\bstroke-width=(['"])(.*?)\1/gi,
        (attrSource, quote, value) => `stroke-width=${quote}${normalizeStrokeWidth(selector, value)}${quote}`);
      next = next.replace(/\bfont-family=(['"])(.*?)\1/gi,
        (attrSource, quote, value) => `font-family=${quote}${fontToken(selector, value)}${quote}`);
      return `<${tagName}${next}>`;
    });
  }

  function adaptHtml(source) {
    const withCss = String(source || '').replace(/(<style\b[^>]*>)([\s\S]*?)(<\/style>)/gi,
      (match, open, css, close) => `${open}${adaptCss(css)}${close}`);
    return adaptMarkup(withCss);
  }

  return Object.freeze({
    adapterId: 'paper-ink.atlas',
    themeId: 'paper-ink',
    target: 'atlas-package',
    themeCss: TOKEN_CSS,
    TOKEN_CSS,
    COMPONENT_OVERRIDES,
    repairArchitectureCopy,
    adaptCss,
    adaptMarkup,
    adaptHtml
  });
});
