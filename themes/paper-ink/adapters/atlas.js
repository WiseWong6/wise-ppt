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
  const DISPLAY_RE = /(?:metric|value|kpi|stat-(?:number|amount)|big-number)/i;
  const HEADING_RE = /(?:\bh[1-6]\b|title|heading|strong|root)/i;
  const WEAK_LINE_RE = /(?:grid|axis|tick|construction|guide|divider|separator|\bhr\b|table|\btd\b|\bth\b|caption)/i;
  const FUNCTIONAL_LINE_RE = /(?:track|edge|connector|link|arrow|path|spine|rib|timeline|outline|ring|shape|line)/i;
  const LINE_PSEUDO_RE = /(?:::before|::after|\bhr\b|divider|separator|track|connector|timeline|spine|rib|guide|axis|line)/i;
  const SMALL_MARK_RE = /(?:^|[-_. ])(?:dot|bullet|marker|core|point)(?:$|[-_. :])/i;
  const DATA_RE = /(?:chart|series|bar\b|heat|map\b|wedge|slice|segment|radar|data-|tone-[a-f]\b)/i;
  const TEXT_RE = /(?:\btext\b|\btspan\b|label|title|caption|axis|legend|value|year)/i;

  // Atlas upstream owns a 600px specimen canvas and brings its own 5.5–200px
  // type scale. Once the specimen is enlarged into a real PPT slot those values
  // no longer form a coherent hierarchy. Snap them to the paper-ink type roles
  // here, while keeping the nearest source size so component hierarchy survives.
  const TYPE_ROLES = Object.freeze([
    ['meta', 13],
    ['label', 15],
    ['micro-secondary', 16],
    ['body-small', 18],
    ['body', 22],
    ['subheading', 26],
    ['emphasis', 36],
    ['heading', 40],
    ['metric', 52],
    ['title', 60],
    ['hero', 76],
    ['display', 96],
    ['particle-sample', 240],
    ['display-mark', 300]
  ]);

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
      font-weight: 300 !important;
    }
    .swiss-card--cover { background: var(--wp-compat-atlas-paper-deep) !important; }
    .swiss-card--body { background: var(--wp-compat-atlas-paper) !important; }
    .swiss-card .swiss-card__content:not([style]) {
      padding: 48px !important;
    }
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
      font-weight: 400 !important;
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
    .swiss-card th {
      font-size: var(--type-label) !important;
      font-weight: 400 !important;
      color: var(--wp-compat-atlas-ink) !important;
    }
    .swiss-card td {
      font-size: var(--type-label) !important;
      font-weight: 300 !important;
      color: var(--wp-compat-atlas-ink-70) !important;
    }
    .swiss-card strong,
    .swiss-card h1, .swiss-card h2, .swiss-card h3,
    .swiss-card h4, .swiss-card h5, .swiss-card h6 {
      font-weight: 400 !important;
    }

    /* Atlas 原始终端使用 Emoji 灯泡；纸墨主题改为本地可控的信息符号。 */
    .swiss-card .terminal-box .term-header::before {
      content: 'i' !important;
      width: 16px !important;
      height: 16px !important;
      box-sizing: border-box !important;
      display: inline-grid !important;
      place-items: center !important;
      flex: 0 0 16px !important;
      border: .6px solid var(--wp-compat-atlas-ink-55) !important;
      border-radius: 50% !important;
      color: var(--wp-compat-atlas-ink-70) !important;
      font-family: var(--wp-font-mono) !important;
      font-size: 11px !important;
      line-height: 1 !important;
    }

    /* ===== 专项组件覆盖 ===== */
    /* 修正三类通用启发式误判：深底白字（dark-on-dark）、容器误命中数据阶梯、
       SVG 自定义属性落入纯色兜底。只使用纸墨 token，不新增颜色。 */

    /* --- 004 工作流列表：11px 轻字在详情 contain-fit 下发虚，提升到可读正文档 --- */
    .swiss-card .list-card--workflow .workflow-kicker {
      font-size: var(--type-meta) !important;
      line-height: 1.2 !important;
      color: var(--wp-compat-atlas-ink-55) !important;
    }
    .swiss-card .list-card--workflow .workflow-item-title {
      font-size: var(--type-micro-secondary) !important;
      line-height: 1.4 !important;
    }
    .swiss-card .list-card--workflow .workflow-item-copy {
      font-size: var(--type-meta) !important;
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

    /* --- 012 提示框：保留框内留白，只收紧三条提示之间的纵向节奏 --- */
    .swiss-card .alert-box {
      margin: 8px 0 !important;
    }

    /* --- 014 代码块：保留细线纸墨外框，恢复完整的 macOS 窗口圆角 --- */
    .swiss-card .code-block {
      overflow: hidden !important;
      border: 1px solid var(--wp-compat-atlas-ink-25) !important;
      border-radius: 12px !important;
    }
    .swiss-card .code-header {
      border-radius: 12px 12px 0 0 !important;
    }
    .swiss-card .code-block pre {
      border-radius: 0 0 12px 12px !important;
    }
    .swiss-card .code-block .code-dot {
      width: 14px !important;
      height: 14px !important;
      position: relative !important;
      display: block !important;
      background: transparent !important;
      border: 1px solid var(--wp-compat-atlas-ink-55) !important;
      border-radius: 50% !important;
    }
    .swiss-card .code-block .code-dot::before,
    .swiss-card .code-block .code-dot::after {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      background: var(--wp-compat-atlas-ink-70);
    }
    .swiss-card .code-block .code-dot.red::before,
    .swiss-card .code-block .code-dot.red::after {
      width: 7px;
      height: 1px;
    }
    .swiss-card .code-block .code-dot.red::before {
      transform: translate(-50%, -50%) rotate(45deg);
    }
    .swiss-card .code-block .code-dot.red::after {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
    .swiss-card .code-block .code-dot.yellow::before {
      width: 7px;
      height: 1px;
      transform: translate(-50%, -50%);
    }
    .swiss-card .code-block .code-dot.yellow::after,
    .swiss-card .code-block .code-dot.green::after {
      display: none;
    }
    .swiss-card .code-block .code-dot.green::before {
      width: 5px;
      height: 5px;
      box-sizing: border-box;
      background: transparent;
      border: 1px solid var(--wp-compat-atlas-ink-70);
      transform: translate(-50%, -50%);
    }

    /* --- 006 表单：由竖向方卡改成 PPT 内的横向规格单，字段关系与顺序不变 --- */
    .swiss-card:has(.form-card) {
      width: 840px !important;
      min-height: 0 !important;
    }
    .swiss-card:has(.form-card) .swiss-card__content {
      min-height: 0 !important;
      padding: 32px !important;
    }
    .swiss-card .form-card {
      min-height: 0 !important;
      gap: 12px !important;
      padding: 16px !important;
    }
    .swiss-card .form-card-title {
      font-size: var(--type-subheading) !important;
      line-height: 1.25 !important;
    }
    .swiss-card .form-card-meta,
    .swiss-card .form-field-label,
    .swiss-card .form-card-action {
      font-size: var(--type-meta) !important;
    }
    .swiss-card .form-card-prompt {
      font-size: var(--type-label) !important;
      line-height: 1.5 !important;
    }
    .swiss-card .form-card-fields {
      grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
      gap: 8px 12px !important;
    }
    .swiss-card .form-field {
      min-height: 72px !important;
      padding: 12px !important;
    }
    .swiss-card .form-field--wide {
      grid-column: 1 / -1 !important;
      min-height: 64px !important;
    }
    .swiss-card .form-field-value {
      font-size: var(--type-micro-secondary) !important;
      line-height: 1.45 !important;
    }

    /* --- 055 平台架构：四列资源卡需要真实横向槽位，避免 13px 标签越出小格 --- */
    .swiss-card:has(.arch-platform .ap-grid) {
      width: 840px !important;
      min-height: 0 !important;
    }
    .swiss-card:has(.arch-platform .ap-grid) .swiss-card__content {
      min-height: 0 !important;
      padding: 32px !important;
    }
    .swiss-card:has(.arch-platform .ap-grid) .arch-platform {
      width: 776px !important;
      margin-inline: auto !important;
    }

    /* --- 056 复杂垂直架构：去 480px 方卡挤压，放宽后再压缩纵向密度 --- */
    .swiss-card:has(.arch-complex-v) {
      width: 840px !important;
      min-height: 0 !important;
    }
    .swiss-card:has(.arch-complex-v) .swiss-card__content {
      min-height: 0 !important;
      padding: 32px !important;
    }
    .swiss-card .arch-complex-v {
      width: 776px !important;
      margin: 0 auto !important;
    }
    .swiss-card .arch-complex-v .av-row {
      grid-template-columns: 52px minmax(0, 1fr) !important;
      min-height: 60px !important;
      border-bottom-width: .6px !important;
    }
    .swiss-card .arch-complex-v .av-content {
      padding: 8px !important;
    }
    .swiss-card .arch-complex-v .av-label {
      padding: 4px 0 !important;
      font-size: var(--type-meta) !important;
      font-weight: 400 !important;
    }
    .swiss-card .arch-complex-v .av-chip {
      min-height: 32px !important;
      padding: 4px !important;
      font-size: var(--type-meta) !important;
      font-weight: 300 !important;
    }
    .swiss-card .arch-complex-v .av-card-title {
      min-height: 28px !important;
      padding: 4px !important;
      font-size: var(--type-label) !important;
      font-weight: 400 !important;
    }
    .swiss-card .arch-complex-v .av-items {
      padding: 4px !important;
      gap: 4px !important;
    }
    .swiss-card .arch-complex-v .av-item {
      min-height: 20px !important;
      padding: 4px !important;
      font-size: var(--type-meta) !important;
      line-height: 1.2 !important;
      font-weight: 300 !important;
    }

    /* --- 020 SWOT：不用彩色象限，靠大首字、细规则与字阶建立四块辨识度 --- */
    .swiss-card .swot {
      gap: 16px !important;
    }
    .swiss-card .swot .cell {
      background: var(--wp-compat-atlas-paper-panel) !important;
      border-left: 1.2px solid var(--wp-compat-atlas-ink-80) !important;
    }
    .swiss-card .swot .cell::before {
      color: var(--wp-compat-atlas-ink) !important;
      font-size: var(--type-title) !important;
      opacity: .28 !important;
    }
    .swiss-card .swot .cell h4 {
      padding-bottom: 8px !important;
      border-bottom: .6px solid var(--wp-compat-atlas-ink-25) !important;
      color: var(--wp-compat-atlas-ink) !important;
      font-size: var(--type-micro-secondary) !important;
    }

    /* --- 021 象限：恢复清楚坐标骨架，中心为唯一功能焦点，四区用线面分层 --- */
    .swiss-card .quadrant-axis {
      gap: 16px !important;
      padding: 40px 32px !important;
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
      background: var(--wp-compat-atlas-paper) !important;
      color: var(--wp-compat-atlas-ink) !important;
      border: .6px solid var(--wp-compat-atlas-ink-55) !important;
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

    /* --- 023 矩阵：两列轨道锁为零最小宽，四格不再受长文案撑列 --- */
    .swiss-card .matrix-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    }
    .swiss-card .matrix-grid .cell {
      box-sizing: border-box !important;
      width: 100% !important;
      min-width: 0 !important;
    }

    /* --- 038 旅程图：整体等比收窄，节点圆点再缩小约 20% --- */
    .swiss-card .journey {
      width: 72% !important;
      margin-inline: auto !important;
    }
    .swiss-card .journey-point:not(.journey-point--milestone) .journey-ring {
      r: 9.5px !important;
    }
    .swiss-card .journey-point:not(.journey-point--milestone) .journey-core {
      r: 6.5px !important;
    }
    .swiss-card .journey-point--milestone .journey-ring {
      r: 12px !important;
    }
    .swiss-card .journey-point--milestone .journey-core {
      r: 9.5px !important;
    }

    /* --- 040 垂直时间线：收束内容宽度后水平居中，避免视觉重量偏左 --- */
    .swiss-card .timeline[data-type="vertical"] {
      width: min(100%, 420px) !important;
      margin-inline: auto !important;
    }

    /* --- 043–047 同心圆：圆环去底色，透明纸面 + 0.6px 发丝墨线（对齐 037 放射卫星的线稿圆） --- */
    .swiss-card .concentric .layer {
      background: transparent !important;
      border-width: .6px !important;
      border-color: var(--wp-compat-atlas-ink-55) !important;
    }

    /* --- 052–053 韦恩图：圆去底色，透明 + 0.6px 墨线内描边（与 043–047 同心圆同档）；标签只放各集合独占区，不压交集 --- */
    .swiss-card .venn .v-circle,
    .swiss-card .venn-three .circle {
      box-sizing: border-box !important;
      border: 0 !important;
      background: transparent !important;
      box-shadow: inset 0 0 0 .6px var(--wp-compat-atlas-ink-55) !important;
    }
    .swiss-card .venn .v-a {
      justify-content: flex-start !important;
      padding-left: 32px !important;
    }
    .swiss-card .venn .v-b {
      justify-content: flex-end !important;
      padding-right: 32px !important;
    }
    .swiss-card .venn-three .circle-a {
      align-items: flex-start !important;
      padding-top: 18px !important;
    }
    .swiss-card .venn-three .circle-b {
      align-items: flex-end !important;
      justify-content: flex-start !important;
      padding: 0 0 18px 18px !important;
    }
    .swiss-card .venn-three .circle-c {
      align-items: flex-end !important;
      justify-content: flex-end !important;
      padding: 0 18px 18px 0 !important;
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
      background: var(--wp-compat-atlas-data-4) !important; color: var(--wp-compat-atlas-ink) !important;
    }
    .swiss-card .process-chain[data-type="arrow"] .step:nth-child(7) {
      background: var(--wp-compat-atlas-data-5) !important; color: var(--wp-compat-atlas-ink) !important;
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
      background: var(--wp-compat-atlas-data-4) !important; color: var(--wp-compat-atlas-ink) !important;
    }
    .swiss-card .process-annotated-grid--arrow .step-node.tone-4 {
      background: var(--wp-compat-atlas-data-5) !important; color: var(--wp-compat-atlas-ink) !important;
    }
    .swiss-card .process-chain .arrow,
    .swiss-card .process-annotated-grid .step-link {
      color: var(--wp-compat-atlas-ink-55) !important;
    }

    /* --- 032 流程-标注箭头：说明框去掉白雾底，改纸面+墨线边框，小标题加深一档 --- */
    .swiss-card .process-annotated-grid .caption-node {
      background: var(--wp-compat-atlas-paper) !important;
      border: 0.6px solid var(--wp-compat-atlas-ink-55) !important;
    }
    .swiss-card .process-annotated-grid .caption-label {
      color: var(--wp-compat-atlas-ink-70) !important;
    }

    /* --- 循环流程 / 闭环流程：纸面圆点 + 墨环，虚线连接环比节点框深一档 --- */
    .swiss-card .process-loop .loop-item {
      background: var(--wp-compat-atlas-paper) !important;
      border: 0 !important;
      box-shadow: inset 0 0 0 0.4px var(--wp-compat-atlas-ink-80) !important;
      color: var(--wp-compat-atlas-ink) !important;
    }
    .swiss-card .process-loop::before {
      border: 0 !important;
      background: var(--wp-compat-atlas-ink-45) !important;
      -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='49.5' fill='none' stroke='white' stroke-width='.28' stroke-dasharray='2.4 2.8'/%3E%3C/svg%3E") center / 100% 100% no-repeat;
      mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='49.5' fill='none' stroke='white' stroke-width='.28' stroke-dasharray='2.4 2.8'/%3E%3C/svg%3E") center / 100% 100% no-repeat;
    }
    .swiss-card .process-loop .loop-closed-track {
      stroke: var(--wp-compat-atlas-ink-45) !important;
      stroke-width: 0.8px !important;
      opacity: 1 !important;
      vector-effect: non-scaling-stroke;
    }

    /* --- 034–036 循环(三角/四边/五边)：虚线环加粗到闭环轨道同档(约0.8px)，与 037 观感对齐 --- */
    .swiss-card .process-loop:not(.process-loop-closed)::before {
      -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='49.5' fill='none' stroke='white' stroke-width='.45' stroke-dasharray='4.2 4.9'/%3E%3C/svg%3E") center / 100% 100% no-repeat;
      mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='49.5' fill='none' stroke='white' stroke-width='.45' stroke-dasharray='4.2 4.9'/%3E%3C/svg%3E") center / 100% 100% no-repeat;
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
      background: var(--wp-compat-atlas-data-5) !important; color: var(--wp-compat-atlas-ink) !important;
    }
    .swiss-card .pyramid .level-3 {
      background: var(--wp-compat-atlas-data-4) !important; color: var(--wp-compat-atlas-ink) !important;
    }
    .swiss-card .pyramid .level-4 {
      background: var(--wp-compat-atlas-data-3) !important; color: var(--wp-compat-atlas-ink) !important;
    }
    .swiss-card .pyramid .level-5 {
      background: var(--wp-compat-atlas-data-2) !important; color: var(--wp-compat-atlas-ink) !important;
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

    /* --- 思维导图：节点改线稿，子节点边框收细到 018 画廊卡档；根节点小面积功能反白 --- */
    .swiss-card .mind-map .root-node {
      background: var(--wp-compat-atlas-ink-80) !important;
      color: var(--wp-compat-atlas-paper) !important;
    }
    .swiss-card .mind-map .node,
    .swiss-card .mind-map .sub-node {
      background: var(--wp-compat-atlas-paper) !important;
      border: .6px solid var(--wp-compat-atlas-ink-80) !important;
      color: var(--wp-compat-atlas-ink) !important;
    }
    .swiss-card .mind-map[data-type="vertical"] {
      margin-inline: auto !important;
      transform-origin: center center !important;
    }

    /* 057–058 思维导图：旧 SVG 坐标不会跟字阶后的节点尺寸同步，改为跟随 DOM 的连线。 */
    .swiss-card .mind-map .mind-map-overlay {
      display: none !important;
    }
    .swiss-card .mind-map .root-node::after,
    .swiss-card .mind-map .branches::before,
    .swiss-card .mind-map .branch::before,
    .swiss-card .mind-map[data-type="vertical"] .node::after,
    .swiss-card .mind-map[data-type="vertical"] .sub-branches::before,
    .swiss-card .mind-map[data-type="vertical"] .sub-node::before {
      content: '';
      position: absolute;
      display: block;
      background: var(--wp-compat-atlas-ink-55);
      pointer-events: none;
    }
    .swiss-card .mind-map:not([data-type="vertical"]) {
      --mind-map-root-gap: 52px;
      --mind-map-branch-gap: 32px;
      --mind-map-node-gap: 20px;
    }
    .swiss-card .mind-map:not([data-type="vertical"]) .branches {
      gap: var(--mind-map-branch-gap) !important;
      margin-top: var(--mind-map-root-gap) !important;
    }
    .swiss-card .mind-map:not([data-type="vertical"]) .node {
      margin-top: var(--mind-map-node-gap) !important;
    }
    .swiss-card .mind-map:not([data-type="vertical"]) .root-node::after {
      top: 100%;
      left: 50%;
      width: .6px;
      height: var(--mind-map-root-gap);
      transform: translateX(-50%);
    }
    .swiss-card .mind-map:not([data-type="vertical"]) .branches::before {
      top: 0;
      left: calc((100% - (3 * var(--mind-map-branch-gap))) / 8);
      right: calc((100% - (3 * var(--mind-map-branch-gap))) / 8);
      height: .6px;
    }
    .swiss-card .mind-map:not([data-type="vertical"]) .branch {
      flex: 1 1 0 !important;
      min-width: 0 !important;
    }
    .swiss-card .mind-map:not([data-type="vertical"]) .branch::before {
      top: 0;
      left: 50%;
      width: .6px;
      height: var(--mind-map-node-gap);
      transform: translateX(-50%);
    }
    .swiss-card .mind-map[data-type="vertical"] {
      --mind-map-root-gap: 80px;
      --mind-map-branch-gap: 48px;
      gap: var(--mind-map-root-gap) !important;
    }
    .swiss-card .mind-map[data-type="vertical"] .root-node::after {
      top: 50%;
      left: 100%;
      width: calc(var(--mind-map-root-gap) / 2);
      height: .6px;
      transform: translateY(-50%);
    }
    .swiss-card .mind-map[data-type="vertical"] .branches::before {
      top: 18px;
      bottom: 18px;
      left: calc(var(--mind-map-root-gap) / -2);
      width: .6px;
    }
    .swiss-card .mind-map[data-type="vertical"] .branches:has(.branch:first-child .sub-node:nth-child(2))::before {
      top: 41px;
    }
    .swiss-card .mind-map[data-type="vertical"] .branches:has(.branch:last-child .sub-node:nth-child(2))::before {
      bottom: 41px;
    }
    .swiss-card .mind-map[data-type="vertical"] .branch {
      gap: var(--mind-map-branch-gap) !important;
    }
    .swiss-card .mind-map[data-type="vertical"] .branch::before {
      top: 50%;
      right: 100%;
      width: calc(var(--mind-map-root-gap) / 2);
      height: .6px;
      transform: translateY(-50%);
    }
    .swiss-card .mind-map[data-type="vertical"] .sub-branches {
      padding-left: 0 !important;
    }
    .swiss-card .mind-map[data-type="vertical"] .node::after {
      top: 50%;
      left: 100%;
      width: calc(var(--mind-map-branch-gap) / 2);
      height: .6px;
      transform: translateY(-50%);
    }
    .swiss-card .mind-map[data-type="vertical"] .sub-branches::before {
      top: 18px;
      bottom: 18px;
      left: calc(var(--mind-map-branch-gap) / -2);
      width: .6px;
    }
    .swiss-card .mind-map[data-type="vertical"] .sub-node::before {
      top: 50%;
      right: 100%;
      width: calc(var(--mind-map-branch-gap) / 2);
      height: .6px;
      transform: translateY(-50%);
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
    }

    /* --- 054–056 架构图：全文统一 13px，模块标题只用字重分层，矩形收为 0.5px 发丝内描边 --- */
    .swiss-card .arch-platform .ap-label,
    .swiss-card .arch-platform .ap-chip,
    .swiss-card .arch-platform .ap-card-title,
    .swiss-card .arch-platform .ap-item,
    .swiss-card .arch-complex-v .av-label,
    .swiss-card .arch-complex-v .av-chip,
    .swiss-card .arch-complex-v .av-card-title,
    .swiss-card .arch-complex-v .av-item {
      font-size: var(--type-meta) !important;
    }
    .swiss-card .arch-platform .ap-label,
    .swiss-card .arch-platform .ap-card-title,
    .swiss-card .arch-complex-v .av-label,
    .swiss-card .arch-complex-v .av-card-title {
      font-weight: 400 !important;
    }
    .swiss-card .arch-platform .ap-flat,
    .swiss-card .arch-platform .ap-grid-wrap,
    .swiss-card .arch-platform .ap-card {
      border: 0 !important;
      box-shadow: inset 0 0 0 .5px var(--wp-compat-atlas-ink-25) !important;
    }
    .swiss-card .arch-platform .ap-chip,
    .swiss-card .arch-platform .ap-item {
      border: 0 !important;
      box-shadow: inset 0 0 0 .5px var(--wp-compat-atlas-ink-55) !important;
    }
    .swiss-card .arch-platform .ap-card-title {
      border: 0 !important;
      box-shadow: inset 0 -.5px 0 var(--wp-compat-atlas-ink-25) !important;
    }
    .swiss-card .arch-complex-v {
      border: 0 !important;
      box-shadow: inset 0 0 0 .5px var(--wp-compat-atlas-ink-55) !important;
    }
    .swiss-card .arch-complex-v .av-row {
      border: 0 !important;
      box-shadow: inset 0 -.5px 0 var(--wp-compat-atlas-ink-55) !important;
    }
    .swiss-card .arch-complex-v .av-row:last-child {
      box-shadow: none !important;
    }
    .swiss-card .arch-complex-v .av-label {
      border: 0 !important;
      box-shadow: inset -.5px 0 0 var(--wp-compat-atlas-ink-55) !important;
    }
    .swiss-card .arch-complex-v .av-chip,
    .swiss-card .arch-complex-v .av-card,
    .swiss-card .arch-complex-v .av-item {
      border: 0 !important;
      box-shadow: inset 0 0 0 .5px var(--wp-compat-atlas-ink-55) !important;
    }
    .swiss-card .arch-complex-v .av-card-title {
      border: 0 !important;
      box-shadow: inset 0 -.5px 0 var(--wp-compat-atlas-ink-25) !important;
    }

    /* --- 059 指标单元：不同字号的数字与单位按视觉底边对齐 --- */
    .swiss-card .stat-grid .stat-card-value {
      display: flex !important;
      align-items: flex-end !important;
    }

    /* --- 051 冰山图：Atlas 字阶吸附后错开百分比与英文标签基线 --- */
    .swiss-card .iceberg-diagram > text:nth-of-type(4) {
      transform: translateY(11px);
    }
    .swiss-card .iceberg-diagram > text:nth-of-type(6) {
      transform: translateY(13px);
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
    if (HEADING_RE.test(selector)) return 'var(--wp-compat-atlas-ink)';
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
    if (/(?:recess|muted|inactive|code|header|body)/i.test(selector)) {
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

  function nearestTypeRole(numeric, roles = TYPE_ROLES) {
    return roles.reduce((best, candidate) => {
      const delta = Math.abs(candidate[1] - numeric);
      return delta < best.delta ? { role: candidate[0], delta } : best;
    }, { role: roles[0][0], delta: Infinity }).role;
  }

  function fontSizeToken(selector, value) {
    const numeric = Number.parseFloat(String(value));
    if (!Number.isFinite(numeric) || numeric <= 0) return value;
    let roles = TYPE_ROLES.slice(0, 6);
    if (DISPLAY_RE.test(selector)) roles = TYPE_ROLES.slice(6, 9);
    else if (HEADING_RE.test(selector)) roles = TYPE_ROLES.slice(3, 6);
    else if (/(?:^|[\s,.>])t[hd](?:$|[\s,.>:#[])/i.test(selector)) roles = TYPE_ROLES.slice(1, 4);
    else if (META_RE.test(selector)) roles = TYPE_ROLES.slice(0, 2);
    else if (BODY_RE.test(selector)) roles = TYPE_ROLES.slice(1, 4);
    else if (MONO_RE.test(selector)) roles = TYPE_ROLES.slice(0, 4);
    return `var(--type-${nearestTypeRole(numeric, roles)})`;
  }

  function fontWeightToken(selector, value) {
    const lowered = String(value).trim().toLowerCase();
    const numeric = lowered === 'bold' || lowered === 'bolder'
      ? 700
      : lowered === 'normal' || lowered === 'lighter'
        ? 300
        : Number.parseFloat(lowered);
    if (!Number.isFinite(numeric)) return value;
    if (MONO_RE.test(selector) || BRUSH_RE.test(selector)) return '400';
    return numeric > 300 && /(?:strong|bold|title|heading|metric|value|number|index|root|\bh[1-6]\b)/i.test(selector)
      ? '400'
      : '300';
  }

  function normalizeSpaceScale(value) {
    return String(value).replace(/(-?[0-9.]+)px\b/gi, (match, raw) => {
      const numeric = Number(raw);
      if (!Number.isFinite(numeric) || numeric <= 0) return match;
      const snapped = Math.max(4, Math.round(numeric / 4) * 4);
      return `${snapped}px`;
    });
  }

  function transformDeclaration(selector, property, rawValue) {
    const prop = property.toLowerCase();
    const value = String(rawValue).trim();

    if (prop === 'box-shadow' || prop === 'text-shadow') return 'none';
    if (prop === 'filter' && /drop-shadow/i.test(value)) return 'none';
    if (prop === 'background-image') return 'none';
    if (prop === 'border-radius') return /(?:^|\s)50%(?:\s|$)/.test(value) ? '50%' : '0';
    if (prop === 'font-family') return fontToken(selector, value);
    if (prop === 'font-size') return fontSizeToken(selector, value);
    if (prop === 'font-weight') return fontWeightToken(selector, value);
    if (/^(?:gap|row-gap|column-gap|padding(?:-(?:top|right|bottom|left))?|margin(?:-(?:top|right|bottom|left))?)$/.test(prop)) {
      return normalizeSpaceScale(value);
    }
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
      next = next.replace(/\bfont-size=(['"])(.*?)\1/gi,
        (attrSource, quote, value) => `font-size=${quote}${fontSizeToken(selector, value)}${quote}`);
      next = next.replace(/\bfont-weight=(['"])(.*?)\1/gi,
        (attrSource, quote, value) => `font-weight=${quote}${fontWeightToken(selector, value)}${quote}`);
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
