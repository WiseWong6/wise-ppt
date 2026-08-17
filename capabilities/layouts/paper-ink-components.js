/* Paper Ink 原生组件目录
 *
 * 从 gallery/paper-ink/ai/frames/ 样张烘焙的可复用组件（snippet 为确定性静态
 * SVG/HTML，无 JS 依赖、无随机量）。与 capabilities/vendors/ppt-component-atlas/
 * catalog-data.js（上游 Swiss 组件，逐字节对齐）相互独立：本文件是 Wise PPT
 * 自有的 native 组件源，gallery/components/index.html 会把两个 catalog 合并展示。
 *
 * 约定：
 * - entry.num 从 62 起顺延（1–61 为上游 atlas 占用），全库唯一。
 * - entry.paperInkNative === true：图册据此跳过 paper-ink-adapter 的 Swiss→纸墨改写。
 * - entry.frame 声明固有画布 {width, height, fit}：图册与 deck 导出统一按
 *   contain-fit 规则（scale = min(容器宽/w, 容器高/h, 1)）适配，新增组件必须声明。
 * - 每个 entry 以行内注释标记出处样张（自有组件，详情页不展示来源行）。
 * - snippet 统一包一层 .pi-card（默认 600×600；横向组件按 entry.frame 声明固有宽度），SVG 用 viewBox 缩放；
 *   字体/墨色一律引用 componentCss 里的 --pi-* 变量，遵守纸墨线稿纪律
 *   （线条 ≤1.6px、墨色层级、mono 标注）。
 */
window.PAPER_INK_COMPONENT_DATA = {
  componentCss: `:root {
  --pi-paper: var(--wp-compat-pi-paper);
  --pi-paper-deep: var(--wp-compat-pi-paper-deep);
  --pi-paper-panel: var(--wp-compat-pi-paper-panel);
  --pi-ink: var(--wp-compat-pi-ink);
  --pi-ink-80: var(--wp-compat-pi-ink-80);
  --pi-ink-70: var(--wp-compat-pi-ink-70);
  --pi-ink-60: var(--wp-compat-pi-ink-60);
  --pi-ink-55: var(--wp-compat-pi-ink-55);
  --pi-ink-45: var(--wp-compat-pi-ink-45);
  --pi-ink-30: var(--wp-compat-pi-ink-30);
  --pi-data-1: var(--wp-compat-pi-data-1);
  --pi-data-2: var(--wp-compat-pi-data-2);
  --pi-data-3: var(--wp-compat-pi-data-3);
  --pi-data-4: var(--wp-compat-pi-data-4);
  --pi-data-5: var(--wp-compat-pi-data-5);
  --pi-data-6: var(--wp-compat-pi-data-6);
  --pi-sans: var(--wp-compat-pi-font-sans);
  --pi-serif: var(--wp-compat-pi-font-serif);
  --pi-mono: var(--wp-compat-pi-font-mono);
  --pi-brush: var(--wp-compat-pi-font-brush);
}
.pi-card {
  width: 600px;
  min-height: 600px;
  background: var(--pi-paper);
  color: var(--pi-ink);
  font-family: var(--pi-sans);
  overflow: hidden;
  position: relative;
}
.pi-card > svg.pi-art {
  display: block;
  width: 100%;
  height: auto;
}
.pi-card text { user-select: none; }
.pi-metric-strip {
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  align-items: stretch;
  width: 1050px;
  min-height: 140px;
  border-top: 1.3px solid var(--pi-ink-80);
  border-bottom: .6px solid color-mix(in srgb, var(--pi-ink) 30%, transparent);
}
.pi-metric-strip [data-repeat-unit="metric"] {
  box-sizing: border-box;
  display: grid;
  align-content: center;
  justify-items: center;
  min-width: 0;
  padding: 14px 22px 12px;
  text-align: center;
}
.pi-metric-strip [data-repeat-unit="metric"] + [data-repeat-unit="metric"] {
  border-left: .6px solid color-mix(in srgb, var(--pi-ink) 30%, transparent);
}
.pi-metric-strip .pi-metric-value {
  font-family: var(--pi-serif);
  font-size: 42px;
  font-weight: 400;
  line-height: 1;
}
.pi-metric-strip .pi-metric-label {
  margin-top: 10px;
  font-family: var(--pi-sans);
  font-size: 13px;
  font-weight: 300;
  line-height: 1.2;
}
.pi-metric-strip .pi-metric-code {
  margin-top: 6px;
  color: var(--pi-ink-45);
  font-family: var(--pi-mono);
  font-size: 9px;
  letter-spacing: 2px;
  line-height: 1.1;
}
.pi-pain-list {
  box-sizing: border-box;
  display: grid;
  grid-template-rows: auto 1fr;
  width: 440px;
  min-height: 650px;
  padding: 22px 20px 18px;
}
.pi-pain-list-head {
  padding-bottom: 22px;
  border-bottom: .8px solid color-mix(in srgb, var(--pi-ink) 34%, transparent);
}
.pi-pain-list-kicker,
.pi-pipeline-kicker,
.pi-infra-kicker {
  color: var(--pi-ink-45);
  font-family: var(--pi-mono);
  font-size: 9px;
  letter-spacing: 2.6px;
}
.pi-pain-list-title,
.pi-pipeline-title {
  margin-top: 15px;
  font-family: var(--pi-sans);
  font-size: 21px;
  font-weight: 300;
  letter-spacing: .4px;
}
.pi-pain-list-items {
  display: grid;
  align-content: stretch;
  grid-auto-rows: 1fr;
}
.pi-pain-list [data-repeat-unit="cause"] {
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 78px minmax(0, 1fr);
  align-content: center;
  gap: 18px;
  min-height: 0;
  padding: 18px 0;
  border-bottom: .6px dashed color-mix(in srgb, var(--pi-ink) 24%, transparent);
}
.pi-pain-list [data-repeat-unit="cause"]:last-child { border-bottom: 0; }
.pi-cause-marker {
  box-sizing: border-box;
  display: grid;
  place-items: center;
  width: 64px;
  height: 50px;
  border: 1px solid var(--pi-ink-70);
  color: var(--pi-ink-45);
  font-family: var(--pi-mono);
  font-size: 8px;
  letter-spacing: 1.3px;
  text-align: center;
}
.pi-cause-title {
  display: block;
  font-family: var(--pi-sans);
  font-size: 17px;
  font-weight: 300;
  line-height: 1.25;
}
.pi-cause-detail {
  display: block;
  margin-top: 9px;
  color: var(--pi-ink-60);
  font-family: var(--pi-sans);
  font-size: 12px;
  font-weight: 300;
  line-height: 1.7;
}
.pi-pipeline-strip {
  box-sizing: border-box;
  display: grid;
  grid-template-rows: auto 1fr;
  width: 1050px;
  min-height: 260px;
  padding: 18px 0 12px;
  border-bottom: .8px solid color-mix(in srgb, var(--pi-ink) 32%, transparent);
}
.pi-pipeline-head { padding-bottom: 16px; }
.pi-pipeline-title { margin-top: 10px; }
.pi-pipeline-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  align-items: stretch;
}
.pi-pipeline-strip [data-repeat-unit="step"] {
  box-sizing: border-box;
  display: grid;
  align-content: center;
  justify-items: center;
  min-width: 0;
  padding: 12px 16px 8px;
  position: relative;
  text-align: center;
}
.pi-pipeline-strip [data-repeat-unit="step"]:not(:last-child)::after {
  content: '›';
  position: absolute;
  top: 42%;
  right: -4px;
  color: var(--pi-ink-30);
  font-family: var(--pi-serif);
  font-size: 25px;
  line-height: 1;
}
.pi-step-index {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border: 1px solid var(--pi-ink-70);
  font-family: var(--pi-mono);
  font-size: 9px;
}
.pi-step-title {
  display: block;
  margin-top: 16px;
  font-family: var(--pi-sans);
  font-size: 14px;
  font-weight: 300;
  line-height: 1.2;
}
.pi-step-code {
  display: block;
  margin-top: 7px;
  color: var(--pi-ink-45);
  font-family: var(--pi-mono);
  font-size: 8px;
  letter-spacing: 1.5px;
}
.pi-infra-strip {
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 26px 1fr;
  width: 1050px;
  min-height: 140px;
  padding: 12px 18px 14px;
  border: 1px dashed var(--pi-ink-45);
}
.pi-infra-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(135px, 1fr));
  gap: 12px;
  align-items: stretch;
}
.pi-infra-strip [data-repeat-unit="item"] {
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 24px minmax(0, 1fr);
  align-items: center;
  min-width: 0;
  padding: 8px 12px;
  border: .8px dashed color-mix(in srgb, var(--pi-ink) 52%, transparent);
  background: color-mix(in srgb, var(--pi-paper-panel) 52%, transparent);
}
.pi-infra-code {
  color: var(--pi-ink-45);
  font-family: var(--pi-mono);
  font-size: 8px;
  letter-spacing: .8px;
}
.pi-infra-label {
  min-width: 0;
  overflow: hidden;
  color: var(--pi-ink-70);
  font-family: var(--pi-sans);
  font-size: 11px;
  font-weight: 300;
  text-overflow: ellipsis;
  white-space: nowrap;
}`,
  /* 动效层（图册「动态」模式与导出时注入；纯 CSS：入场播一次 + 可选持续微动效）
   * 与 atlas componentMotionCss 同一设计语言：分带交错入场；SVG 坐标系内不做
   * 位移动画（避免错位），HTML 列表行用 translate 属性上浮（与 position 无关）。 */
  componentMotionCss: `@keyframes pi-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes pi-rise { from { opacity: 0; translate: 0 12px; } to { opacity: 1; translate: 0 0; } }
@keyframes pi-pulse { 0%, 100% { opacity: 1; } 50% { opacity: .3; } }

/* SVG 组件：顶层节点分带交错淡入 */
.pi-card > svg.pi-art > * { animation: pi-fade .5s ease-out both; }
.pi-card > svg.pi-art > *:nth-child(n+3) { animation-delay: .1s; }
.pi-card > svg.pi-art > *:nth-child(n+7) { animation-delay: .2s; }
.pi-card > svg.pi-art > *:nth-child(n+13) { animation-delay: .3s; }
.pi-card > svg.pi-art > *:nth-child(n+21) { animation-delay: .4s; }

/* HTML 组件：顶层区块分带交错淡入（不含 SVG 组件的画布本身） */
.pi-card > :not(svg.pi-art) { animation: pi-fade .5s ease-out both; }
.pi-card > :not(svg.pi-art):nth-child(n+3) { animation-delay: .1s; }
.pi-card > :not(svg.pi-art):nth-child(n+6) { animation-delay: .2s; }
.pi-card > :not(svg.pi-art):nth-child(n+10) { animation-delay: .3s; }

/* HTML 列表行：上浮交错入场（translate 属性与绝对/相对定位无冲突） */
.pi-card .pi-admin-t .r,
.pi-card .pi-trace .n { animation: pi-rise .45s cubic-bezier(.22,.61,.36,1) both; }
.pi-card .pi-admin-t .r:nth-child(n+2),
.pi-card .pi-trace .n:nth-child(n+2) { animation-delay: .1s; }
.pi-card .pi-admin-t .r:nth-child(n+4),
.pi-card .pi-trace .n:nth-child(n+4) { animation-delay: .18s; }
.pi-card .pi-admin-t .r:nth-child(n+6),
.pi-card .pi-trace .n:nth-child(n+6) { animation-delay: .26s; }

/* 持续微动效挂钩：组件给活动标记加 .pi-live 即得呼吸脉冲（2.4s 循环） */
.pi-card .pi-live { animation: pi-pulse 2.4s ease-in-out infinite; }`,
  entries: [
    {
      name: 'agenda-ink',
      group: 'document-text',
      groupLabel: '文档与文本',
      description: 'Archival numbered table of contents.',
      label: '档案目录',
      num: 62,
      variant: null,
      paperInkNative: true,
      frame: { width: 600, height: 600, fit: 'fixed' },
      /* 出自样张 layout-d4.html */
      snippet: `<div class="pi-card">
<svg class="pi-art" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
  <text x="32" y="54" font-family="var(--pi-mono)" font-size="11" letter-spacing="3" fill="var(--pi-ink-45)">CONTENTS</text>
  <line x1="118" y1="50" x2="190" y2="50" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
  <line x1="32" y1="70" x2="568" y2="70" stroke="var(--pi-ink)" stroke-width=".6" opacity=".22"/>

  <g opacity=".45">
    <circle cx="54" cy="116" r="18" fill="none" stroke="var(--pi-ink)" stroke-width="1"/>
    <text x="54" y="121" font-family="var(--pi-mono)" font-size="14" text-anchor="middle" fill="var(--pi-ink)">01</text>
    <text x="112" y="121" font-family="var(--pi-sans)" font-weight="300" font-size="16" fill="var(--pi-ink)">认知奠基</text>
    <text x="192" y="119" font-family="var(--pi-mono)" font-size="9.5" letter-spacing="2" fill="var(--pi-ink-60)">FOUNDATIONS</text>
    <text x="112" y="146" font-family="var(--pi-sans)" font-weight="300" font-size="11" fill="var(--pi-ink-70)">AI 产品的四类角色与能力边界</text>
    <text x="568" y="120" font-family="var(--pi-mono)" font-size="9.5" letter-spacing="2" text-anchor="end" fill="var(--pi-ink-45)">P.03</text>
  </g>
  <line x1="32" y1="158" x2="568" y2="158" stroke="var(--pi-ink)" stroke-width=".6" opacity=".22"/>

  <g>
    <circle cx="54" cy="204" r="18" fill="var(--pi-ink)"/>
    <circle cx="54" cy="204" r="21" fill="none" stroke="var(--pi-ink)" stroke-width=".6" opacity=".35"/>
    <text x="54" y="209" font-family="var(--pi-mono)" font-size="14" text-anchor="middle" fill="var(--pi-paper)">02</text>
    <line x1="80" y1="204" x2="104" y2="204" stroke="var(--pi-ink)" stroke-width="1.8"/>
    <text x="112" y="209" font-family="var(--pi-sans)" font-weight="300" font-size="16" fill="var(--pi-ink)">工程化思维</text>
    <text x="208" y="207" font-family="var(--pi-mono)" font-size="9.5" letter-spacing="2" fill="var(--pi-ink-60)">HARNESS ENG</text>
    <text x="112" y="234" font-family="var(--pi-sans)" font-weight="300" font-size="11" fill="var(--pi-ink-70)">从模型到产品的工程鸿沟</text>
    <text x="568" y="208" font-family="var(--pi-mono)" font-size="9.5" letter-spacing="2" text-anchor="end" fill="var(--pi-ink-45)">P.07</text>
  </g>
  <line x1="32" y1="246" x2="568" y2="246" stroke="var(--pi-ink)" stroke-width=".6" opacity=".22"/>

  <g opacity=".45">
    <circle cx="54" cy="292" r="18" fill="none" stroke="var(--pi-ink)" stroke-width="1"/>
    <text x="54" y="297" font-family="var(--pi-mono)" font-size="14" text-anchor="middle" fill="var(--pi-ink)">03</text>
    <text x="112" y="297" font-family="var(--pi-sans)" font-weight="300" font-size="16" fill="var(--pi-ink)">Agent 实战</text>
    <text x="207" y="295" font-family="var(--pi-mono)" font-size="9.5" letter-spacing="2" fill="var(--pi-ink-60)">AGENT IN ACTION</text>
    <text x="112" y="322" font-family="var(--pi-sans)" font-weight="300" font-size="11" fill="var(--pi-ink-70)">工具调用、状态机与失败恢复</text>
    <text x="568" y="296" font-family="var(--pi-mono)" font-size="9.5" letter-spacing="2" text-anchor="end" fill="var(--pi-ink-45)">P.11</text>
  </g>
  <line x1="32" y1="334" x2="568" y2="334" stroke="var(--pi-ink)" stroke-width=".6" opacity=".22"/>

  <g opacity=".45">
    <circle cx="54" cy="380" r="18" fill="none" stroke="var(--pi-ink)" stroke-width="1"/>
    <text x="54" y="385" font-family="var(--pi-mono)" font-size="14" text-anchor="middle" fill="var(--pi-ink)">04</text>
    <text x="112" y="385" font-family="var(--pi-sans)" font-weight="300" font-size="16" fill="var(--pi-ink)">评测体系</text>
    <text x="192" y="383" font-family="var(--pi-mono)" font-size="9.5" letter-spacing="2" fill="var(--pi-ink-60)">EVAL FRAMEWORK</text>
    <text x="112" y="410" font-family="var(--pi-sans)" font-weight="300" font-size="11" fill="var(--pi-ink-70)">离线指标与在线尺子的双层护栏</text>
    <text x="568" y="384" font-family="var(--pi-mono)" font-size="9.5" letter-spacing="2" text-anchor="end" fill="var(--pi-ink-45)">P.15</text>
  </g>
  <line x1="32" y1="422" x2="568" y2="422" stroke="var(--pi-ink)" stroke-width=".6" opacity=".22"/>

  <g opacity=".45">
    <circle cx="54" cy="468" r="18" fill="none" stroke="var(--pi-ink)" stroke-width="1"/>
    <text x="54" y="473" font-family="var(--pi-mono)" font-size="14" text-anchor="middle" fill="var(--pi-ink)">05</text>
    <text x="112" y="473" font-family="var(--pi-sans)" font-weight="300" font-size="16" fill="var(--pi-ink)">落地路径</text>
    <text x="192" y="471" font-family="var(--pi-mono)" font-size="9.5" letter-spacing="2" fill="var(--pi-ink-60)">ROLLOUT ROADMAP</text>
    <text x="112" y="498" font-family="var(--pi-sans)" font-weight="300" font-size="11" fill="var(--pi-ink-70)">从 Demo 到生产的渐进上线计划</text>
    <text x="568" y="472" font-family="var(--pi-mono)" font-size="9.5" letter-spacing="2" text-anchor="end" fill="var(--pi-ink-45)">P.19</text>
  </g>
  <line x1="32" y1="510" x2="568" y2="510" stroke="var(--pi-ink)" stroke-width=".6" opacity=".22"/>
</svg>
</div>`
    },
    {
      name: 'step-rise',
      group: 'flow-temporal',
      groupLabel: '流程与时序',
      description: 'Step-rise maturity path.',
      label: '阶梯爬升图',
      num: 63,
      variant: null,
      paperInkNative: true,
      frame: { width: 960, height: 440, fit: 'fixed' },
      /* 出自样张 layout-b5.html（已复原样张坡度：级宽 108 : 级高 41 ≈ 原稿 340:130，标签块贴台阶；
         内容 bbox x24..592 y220..526，translate(-8 -73) 使视觉中心对准 600×600 画布中心） */
      snippet: `<div class="pi-card">
<svg class="pi-art" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(-8 -73)">
  <!-- 楼梯折线主角 -->
  <path d="M 30 500 H 138 V 459 H 246 V 418 H 354 V 377 H 462 V 336 H 570" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.4"/>
  <!-- 平行上升强调箭头 -->
  <path d="M 26 526 H 136 V 485 H 244 V 444 H 352 V 403 H 460 V 362 H 552 L 538 353 M 552 362 L 538 371" fill="none" stroke="var(--pi-ink)" stroke-width="2" opacity=".85"/>
  <!-- 起点套准 / 终点十字 -->
  <circle cx="30" cy="500" r="6" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.1"/>
  <circle cx="30" cy="500" r="2" fill="var(--pi-ink)"/>
  <line x1="560" y1="336" x2="576" y2="336" stroke="var(--pi-ink)" stroke-width=".8" opacity=".45"/>
  <line x1="568" y1="330" x2="568" y2="342" stroke="var(--pi-ink)" stroke-width=".8" opacity=".45"/>

  <!-- 踏步节点块 -->
  <g>
    <circle cx="52" cy="500" r="4" fill="var(--pi-paper)" stroke="var(--pi-ink-80)" stroke-width="1"/>
    <circle cx="52" cy="500" r="1.6" fill="var(--pi-ink)"/>
    <line x1="52" y1="494" x2="52" y2="454" stroke="var(--pi-ink)" stroke-width=".7" opacity=".45"/>
    <text x="24" y="396" font-family="var(--pi-mono)" font-size="10" letter-spacing="2" fill="var(--pi-ink)">2022</text>
    <line x1="24" y1="405" x2="68" y2="405" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
    <text x="24" y="429" font-family="var(--pi-sans)" font-weight="300" font-size="12" fill="var(--pi-ink)">单点工具</text>
    <text x="24" y="449" font-family="var(--pi-sans)" font-weight="300" font-size="9" fill="var(--pi-ink-70)">单任务模型调用跑通</text>
  </g>
  <g>
    <circle cx="160" cy="459" r="4" fill="var(--pi-paper)" stroke="var(--pi-ink-80)" stroke-width="1"/>
    <circle cx="160" cy="459" r="1.6" fill="var(--pi-ink)"/>
    <line x1="160" y1="453" x2="160" y2="413" stroke="var(--pi-ink)" stroke-width=".7" opacity=".45"/>
    <text x="132" y="355" font-family="var(--pi-mono)" font-size="10" letter-spacing="2" fill="var(--pi-ink)">2023</text>
    <line x1="132" y1="364" x2="176" y2="364" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
    <text x="132" y="388" font-family="var(--pi-sans)" font-weight="300" font-size="12" fill="var(--pi-ink)">工作流自动化</text>
    <text x="132" y="408" font-family="var(--pi-sans)" font-weight="300" font-size="9" fill="var(--pi-ink-70)">12 条流水线上线</text>
  </g>
  <g>
    <circle cx="268" cy="418" r="4" fill="var(--pi-paper)" stroke="var(--pi-ink-80)" stroke-width="1"/>
    <circle cx="268" cy="418" r="1.6" fill="var(--pi-ink)"/>
    <line x1="268" y1="412" x2="268" y2="372" stroke="var(--pi-ink)" stroke-width=".7" opacity=".45"/>
    <text x="240" y="314" font-family="var(--pi-mono)" font-size="10" letter-spacing="2" fill="var(--pi-ink)">2024</text>
    <line x1="240" y1="323" x2="284" y2="323" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
    <text x="240" y="347" font-family="var(--pi-sans)" font-weight="300" font-size="12" fill="var(--pi-ink)">Agent 协同</text>
    <text x="240" y="367" font-family="var(--pi-sans)" font-weight="300" font-size="9" fill="var(--pi-ink-70)">路径规划 V2 发布</text>
  </g>
  <g>
    <circle cx="376" cy="377" r="4" fill="var(--pi-paper)" stroke="var(--pi-ink-80)" stroke-width="1"/>
    <circle cx="376" cy="377" r="1.6" fill="var(--pi-ink)"/>
    <line x1="376" y1="371" x2="376" y2="331" stroke="var(--pi-ink)" stroke-width=".7" opacity=".45"/>
    <text x="348" y="273" font-family="var(--pi-mono)" font-size="10" letter-spacing="2" fill="var(--pi-ink)">2025</text>
    <line x1="348" y1="282" x2="392" y2="282" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
    <text x="348" y="306" font-family="var(--pi-sans)" font-weight="300" font-size="12" fill="var(--pi-ink)">多 Agent 编排</text>
    <text x="348" y="326" font-family="var(--pi-sans)" font-weight="300" font-size="9" fill="var(--pi-ink-70)">统一编排</text>
  </g>
  <g>
    <circle cx="484" cy="336" r="4" fill="var(--pi-paper)" stroke="var(--pi-ink-80)" stroke-width="1"/>
    <circle cx="484" cy="336" r="1.6" fill="var(--pi-ink)"/>
    <line x1="484" y1="330" x2="484" y2="290" stroke="var(--pi-ink)" stroke-width=".7" opacity=".45"/>
    <text x="456" y="232" font-family="var(--pi-mono)" font-size="10" letter-spacing="2" fill="var(--pi-ink)">2026</text>
    <line x1="456" y1="241" x2="500" y2="241" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
    <text x="456" y="265" font-family="var(--pi-sans)" font-weight="300" font-size="12" fill="var(--pi-ink)">自主组织</text>
    <text x="456" y="285" font-family="var(--pi-sans)" font-weight="300" font-size="9" fill="var(--pi-ink-70)">百 Agent 互联</text>
  </g>

  <!-- 竖向 Δ 高度标注 -->
  <line x1="586" y1="336" x2="586" y2="500" stroke="var(--pi-ink)" stroke-width=".5" opacity=".3" stroke-dasharray="2 6"/>
  <line x1="580" y1="336" x2="592" y2="336" stroke="var(--pi-ink)" stroke-width=".7" opacity=".4"/>
  <line x1="580" y1="500" x2="592" y2="500" stroke="var(--pi-ink)" stroke-width=".7" opacity=".4"/>
  <text x="574" y="418" font-family="var(--pi-mono)" font-size="8.5" letter-spacing="2" fill="var(--pi-ink-45)" transform="rotate(90 574 418)">Δ STAGE × 5</text>
  </g>
</svg>
</div>`
    },
{
    name: 'doc-excerpt',
    group: 'document-text',
    groupLabel: '文档与文本',
    description: 'Literature excerpt block with double-underlined key sentence.',
    label: '文献摘引块',
    num: 64,
    variant: null,
    paperInkNative: true,
    frame: { width: 720, height: 580, fit: 'fixed' },
    /* 出自样张 layout-a3.html */
    snippet: `<div class="pi-card">
<svg class="pi-art" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
  <!-- 栏签 + 顶部规线 -->
  <text x="48" y="64" font-family="var(--pi-mono)" font-size="11" letter-spacing="3" fill="var(--pi-ink-45)">ABSTRACT</text>
  <text x="140" y="64" font-family="var(--pi-sans)" font-weight="300" font-size="12" fill="var(--pi-ink-45)">转述</text>
  <line x1="48" y1="78" x2="552" y2="78" stroke="var(--pi-ink)" stroke-width=".6" opacity=".22"/>
  <line x1="48" y1="78" x2="120" y2="78" stroke="var(--pi-ink)" stroke-width="1.4" opacity=".7"/>

  <!-- 引文段落 -->
  <text x="48" y="132" font-family="var(--pi-sans)" font-weight="300" font-size="16.5" fill="var(--pi-ink)">《xx 服务管理暂行办法》提出：提供者应当对训练数</text>
  <text x="48" y="168" font-family="var(--pi-sans)" font-weight="300" font-size="16.5" fill="var(--pi-ink)">据来源的合法性负责，并采取有效措施防范未成年人</text>
  <text x="48" y="204" font-family="var(--pi-sans)" font-weight="300" font-size="16.5" fill="var(--pi-ink)">过度依赖，同时不得生成煽动颠覆国家政权的内容。</text>

  <!-- 关键句：升字重 + 双线 underline -->
  <text x="48" y="280" font-family="var(--pi-sans)" font-weight="400" font-size="17" fill="var(--pi-ink)">文件首次将「训练数据合规」与「生成内容可溯源」并列写入。</text>
  <line x1="48" y1="293" x2="510" y2="293" stroke="var(--pi-ink)" stroke-width=".8" opacity=".7"/>
  <line x1="48" y1="298" x2="510" y2="298" stroke="var(--pi-ink)" stroke-width=".6" opacity=".35"/>

  <!-- 破折号阐释句 -->
  <text x="48" y="352" font-family="var(--pi-sans)" font-weight="300" font-size="15" fill="var(--pi-ink-70)">—— 每一个上线 AI 产品的合规清单，正来自这一条。</text>

  <!-- 构造十字 + 竖向暗示线 -->
  <line x1="544" y1="120" x2="544" y2="204" stroke="var(--pi-ink)" stroke-width=".5" opacity=".3" stroke-dasharray="2 6"/>
  <line x1="538" y1="162" x2="550" y2="162" stroke="var(--pi-ink)" stroke-width=".7" opacity=".4"/>
  <line x1="544" y1="156" x2="544" y2="168" stroke="var(--pi-ink)" stroke-width=".7" opacity=".4"/>

  <!-- 底部署名行 -->
  <line x1="48" y1="516" x2="552" y2="516" stroke="var(--pi-ink)" stroke-width=".6" opacity=".22"/>
  <circle cx="48" cy="546" r="4" fill="none" stroke="var(--pi-ink-80)" stroke-width="1"/>
  <circle cx="48" cy="546" r="1.5" fill="var(--pi-ink)"/>
  <text x="64" y="550" font-family="var(--pi-mono)" font-size="10" letter-spacing="2" fill="var(--pi-ink-45)">SOURCE · 《XX 服务管理暂行办法》</text>
  <text x="552" y="550" font-family="var(--pi-mono)" font-size="10" letter-spacing="2" text-anchor="end" fill="var(--pi-ink-45)">网信办等七部门 · 2023</text>
</svg>
</div>`
  },
  {
    name: 'official-doc',
    group: 'document-text',
    groupLabel: '文档与文本',
    description: 'Official document specimen in a double-ruled frame.',
    label: '公文标本框',
    num: 65,
    variant: null,
    paperInkNative: true,
    frame: { width: 700, height: 600, fit: 'fixed' },
    /* 出自样张 layout-a3.html */
    snippet: `<div class="pi-card">
<svg class="pi-art" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
  <!-- 双线外框 -->
  <rect x="48" y="92" width="504" height="460" fill="var(--pi-paper-panel)" stroke="var(--pi-ink-80)" stroke-width="1.3"/>
  <rect x="53" y="97" width="494" height="450" fill="none" stroke="var(--pi-ink)" stroke-width=".6" opacity=".35"/>

  <!-- 骑缝页签 -->
  <rect x="190" y="72" width="220" height="40" fill="var(--pi-paper)" stroke="var(--pi-ink)" stroke-width="1.2"/>
  <text x="282" y="98" font-family="var(--pi-mono)" font-size="11" letter-spacing="2" text-anchor="end" fill="var(--pi-ink)">SOURCE</text>
  <text x="302" y="98" font-family="var(--pi-sans)" font-weight="300" font-size="12" fill="var(--pi-ink)">原文标本</text>

  <!-- 报头：机构名 + 文号 + 双横线 -->
  <text x="300" y="160" font-family="var(--pi-sans)" font-weight="300" font-size="19" letter-spacing="6" text-anchor="middle" fill="var(--pi-ink)">xx 行业主管办公室</text>
  <text x="300" y="190" font-family="var(--pi-mono)" font-size="10" letter-spacing="3" text-anchor="middle" fill="var(--pi-ink-45)">XX [2023] NO.7</text>
  <line x1="92" y1="210" x2="508" y2="210" stroke="var(--pi-ink-80)" stroke-width="1.4"/>
  <line x1="92" y1="215" x2="268" y2="215" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>

  <!-- 居中大标题 -->
  <text x="300" y="262" font-family="var(--pi-sans)" font-weight="300" font-size="21" text-anchor="middle" fill="var(--pi-ink)">xx 服务管理暂行办法</text>
  <text x="300" y="292" font-family="var(--pi-mono)" font-size="10" letter-spacing="3" text-anchor="middle" fill="var(--pi-ink-45)">INTERIM MEASURES · CHAPTER IV</text>

  <!-- 条文灰行暗示（圆点 + 递减长度横线） -->
  <text x="84" y="336" font-family="var(--pi-mono)" font-size="10" letter-spacing="2" fill="var(--pi-ink-45)">ART. 15</text>
  <circle cx="148" cy="332" r="2" fill="var(--pi-ink)" opacity=".55"/>
  <line x1="164" y1="336" x2="494" y2="336" stroke="var(--pi-ink)" stroke-width=".8" opacity=".4"/>
  <circle cx="148" cy="362" r="2" fill="var(--pi-ink)" opacity=".55"/>
  <line x1="164" y1="366" x2="524" y2="366" stroke="var(--pi-ink)" stroke-width=".8" opacity=".4"/>
  <circle cx="148" cy="392" r="2" fill="var(--pi-ink)" opacity=".55"/>
  <line x1="164" y1="396" x2="444" y2="396" stroke="var(--pi-ink)" stroke-width=".8" opacity=".4"/>
  <circle cx="148" cy="422" r="2" fill="var(--pi-ink)" opacity=".55"/>
  <line x1="164" y1="426" x2="354" y2="426" stroke="var(--pi-ink)" stroke-width=".8" opacity=".4"/>

  <!-- 右下双圈印章（内含对勾） -->
  <circle cx="468" cy="496" r="18" fill="none" stroke="var(--pi-ink)" stroke-width="1.2" opacity=".8"/>
  <circle cx="468" cy="496" r="12" fill="none" stroke="var(--pi-ink)" stroke-width=".6" opacity=".45"/>
  <path d="M 462 496 L 466.5 501 L 475 490" fill="none" stroke="var(--pi-ink)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>

  <!-- 左下 mono 页码 -->
  <text x="84" y="516" font-family="var(--pi-mono)" font-size="10" letter-spacing="2" fill="var(--pi-ink-45)">PAGE 03 / 11</text>
</svg>
</div>`
  },
  {
    name: 'evidence-wall',
    group: 'evidence-media',
    groupLabel: '证据与媒体',
    description: 'Two-by-two evidence wall of framed specimen cells.',
    label: '证据墙标本格',
    num: 66,
    variant: null,
    paperInkNative: true,
    frame: { width: 910, height: 460, fit: 'fixed' },
    /* 出自样张 layout-a4.html */
    snippet: `<div class="pi-card">
<svg class="pi-art" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="piHatch66" width="6" height="6" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="0" y2="6" stroke="var(--pi-ink)" stroke-width=".7" opacity=".35"/>
    </pattern>
  </defs>

  <!-- 栏签 -->
  <text x="40" y="52" font-family="var(--pi-mono)" font-size="11" letter-spacing="3" fill="var(--pi-ink-45)">EVIDENCE WALL · SPECIMENS</text>
  <line x1="40" y1="64" x2="560" y2="64" stroke="var(--pi-ink)" stroke-width=".6" opacity=".22"/>

  <!-- 格 1 · 调度网格地图 -->
  <rect x="40" y="84" width="248" height="218" fill="var(--pi-paper-panel)" stroke="var(--pi-ink-80)" stroke-width="1.3"/>
  <rect x="45" y="89" width="238" height="208" fill="none" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
  <text x="56" y="108" font-family="var(--pi-mono)" font-size="8.5" letter-spacing="2.5" fill="var(--pi-ink-45)">EXHIBIT 01 — CONTEXT MGR</text>
  <rect x="60" y="126" width="208" height="110" fill="none" stroke="var(--pi-ink)" stroke-width="1.1" opacity=".8"/>
  <line x1="112" y1="126" x2="112" y2="236" stroke="var(--pi-ink)" stroke-width=".5" opacity=".3"/>
  <line x1="164" y1="126" x2="164" y2="236" stroke="var(--pi-ink)" stroke-width=".5" opacity=".3"/>
  <line x1="216" y1="126" x2="216" y2="236" stroke="var(--pi-ink)" stroke-width=".5" opacity=".3"/>
  <line x1="60" y1="162.7" x2="268" y2="162.7" stroke="var(--pi-ink)" stroke-width=".5" opacity=".3"/>
  <line x1="60" y1="199.3" x2="268" y2="199.3" stroke="var(--pi-ink)" stroke-width=".5" opacity=".3"/>
  <path d="M 89.1 205.2 L 126.6 159 L 205.6 150.2" fill="none" stroke="var(--pi-ink)" stroke-width=".8" opacity=".55" stroke-dasharray="4 4"/>
  <circle cx="89.1" cy="205.2" r="4.2" fill="none" stroke="var(--pi-ink-80)" stroke-width="1"/>
  <circle cx="89.1" cy="205.2" r="1.5" fill="var(--pi-ink)"/>
  <circle cx="126.6" cy="159" r="4.2" fill="none" stroke="var(--pi-ink-80)" stroke-width="1"/>
  <circle cx="126.6" cy="159" r="1.5" fill="var(--pi-ink)"/>
  <circle cx="174.4" cy="194.2" r="4.2" fill="none" stroke="var(--pi-ink-80)" stroke-width="1"/>
  <circle cx="174.4" cy="194.2" r="1.5" fill="var(--pi-ink)"/>
  <circle cx="205.6" cy="150.2" r="4.2" fill="none" stroke="var(--pi-ink-80)" stroke-width="1"/>
  <circle cx="205.6" cy="150.2" r="1.5" fill="var(--pi-ink)"/>
  <circle cx="239.3" cy="186.5" r="4.2" fill="none" stroke="var(--pi-ink-80)" stroke-width="1"/>
  <circle cx="239.3" cy="186.5" r="1.5" fill="var(--pi-ink)"/>
  <line x1="56" y1="266" x2="272" y2="266" stroke="var(--pi-ink)" stroke-width=".6" opacity=".35"/>
  <text x="56" y="290" font-family="var(--pi-mono)" font-size="9.5" letter-spacing="2" fill="var(--pi-ink)">HALLUCINATION −48%</text>

  <!-- 格 2 · 峰值折线 -->
  <rect x="312" y="84" width="248" height="218" fill="var(--pi-paper-panel)" stroke="var(--pi-ink-80)" stroke-width="1.3"/>
  <rect x="317" y="89" width="238" height="208" fill="none" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
  <text x="328" y="108" font-family="var(--pi-mono)" font-size="8.5" letter-spacing="2.5" fill="var(--pi-ink-45)">EXHIBIT 02 — EVAL SUITE</text>
  <line x1="346" y1="236" x2="526" y2="236" stroke="var(--pi-ink)" stroke-width=".9" opacity=".7"/>
  <line x1="346" y1="126" x2="346" y2="236" stroke="var(--pi-ink)" stroke-width=".9" opacity=".7"/>
  <line x1="382" y1="236" x2="382" y2="242" stroke="var(--pi-ink)" stroke-width=".7" opacity=".5"/>
  <line x1="418" y1="236" x2="418" y2="242" stroke="var(--pi-ink)" stroke-width=".7" opacity=".5"/>
  <line x1="454" y1="236" x2="454" y2="242" stroke="var(--pi-ink)" stroke-width=".7" opacity=".5"/>
  <line x1="490" y1="236" x2="490" y2="242" stroke="var(--pi-ink)" stroke-width=".7" opacity=".5"/>
  <line x1="346" y1="142" x2="450.4" y2="142" stroke="var(--pi-ink)" stroke-width=".5" opacity=".35" stroke-dasharray="2 5"/>
  <path d="M 346 222 L 382 206 L 421.6 184 L 450.4 142 L 482.8 192 L 526 212" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.3"/>
  <circle cx="450.4" cy="142" r="4.5" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.1"/>
  <circle cx="450.4" cy="142" r="1.8" fill="var(--pi-ink)"/>
  <line x1="328" y1="266" x2="544" y2="266" stroke="var(--pi-ink)" stroke-width=".6" opacity=".35"/>
  <text x="328" y="290" font-family="var(--pi-mono)" font-size="9.5" letter-spacing="2" fill="var(--pi-ink)">CASES · 40 → 600</text>

  <!-- 格 3 · 巡检机器人立绘 -->
  <rect x="40" y="326" width="248" height="218" fill="var(--pi-paper-panel)" stroke="var(--pi-ink-80)" stroke-width="1.3"/>
  <rect x="45" y="331" width="238" height="208" fill="none" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
  <text x="56" y="350" font-family="var(--pi-mono)" font-size="8.5" letter-spacing="2.5" fill="var(--pi-ink-45)">EXHIBIT 03 — GUARDRAIL</text>
  <rect x="60" y="484" width="208" height="10" fill="url(#piHatch66)" stroke="none"/>
  <line x1="60" y1="484" x2="268" y2="484" stroke="var(--pi-ink)" stroke-width=".9" opacity=".6"/>
  <rect x="108" y="432" width="112" height="44" rx="6" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.3"/>
  <rect x="112" y="436" width="104" height="36" rx="4" fill="none" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
  <circle cx="130" cy="478" r="9" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
  <circle cx="130" cy="478" r="1.8" fill="var(--pi-ink)"/>
  <circle cx="198" cy="478" r="9" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
  <circle cx="198" cy="478" r="1.8" fill="var(--pi-ink)"/>
  <line x1="164" y1="432" x2="164" y2="384" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
  <rect x="140" y="368" width="48" height="16" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.1"/>
  <line x1="150" y1="376" x2="178" y2="376" stroke="var(--pi-ink)" stroke-width=".6" opacity=".4"/>
  <circle cx="164" cy="360" r="2.5" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".7"/>
  <line x1="56" y1="508" x2="272" y2="508" stroke="var(--pi-ink)" stroke-width=".6" opacity=".35"/>
  <text x="56" y="532" font-family="var(--pi-mono)" font-size="9.5" letter-spacing="2" fill="var(--pi-ink)">BLOCKED · 312 CALLS</text>

  <!-- 格 4 · 波次甘特 -->
  <rect x="312" y="326" width="248" height="218" fill="var(--pi-paper-panel)" stroke="var(--pi-ink-80)" stroke-width="1.3"/>
  <rect x="317" y="331" width="238" height="208" fill="none" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
  <text x="328" y="350" font-family="var(--pi-mono)" font-size="8.5" letter-spacing="2.5" fill="var(--pi-ink-45)">EXHIBIT 04 — TRACE</text>
  <rect x="342" y="382" width="97.8" height="16" fill="url(#piHatch66)" stroke="var(--pi-ink-80)" stroke-width="1.1"/>
  <line x1="342" y1="377" x2="342" y2="403" stroke="var(--pi-ink)" stroke-width=".9" opacity=".6"/>
  <line x1="439.8" y1="377" x2="439.8" y2="403" stroke="var(--pi-ink)" stroke-width=".9" opacity=".6"/>
  <rect x="394.6" y="410" width="94" height="16" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.1"/>
  <line x1="394.6" y1="405" x2="394.6" y2="431" stroke="var(--pi-ink)" stroke-width=".9" opacity=".6"/>
  <line x1="488.6" y1="405" x2="488.6" y2="431" stroke="var(--pi-ink)" stroke-width=".9" opacity=".6"/>
  <rect x="458.6" y="438" width="71.4" height="16" fill="url(#piHatch66)" stroke="var(--pi-ink-80)" stroke-width="1.1"/>
  <line x1="458.6" y1="433" x2="458.6" y2="459" stroke="var(--pi-ink)" stroke-width=".9" opacity=".6"/>
  <line x1="530" y1="433" x2="530" y2="459" stroke="var(--pi-ink)" stroke-width=".9" opacity=".6"/>
  <line x1="342" y1="452" x2="530" y2="452" stroke="var(--pi-ink)" stroke-width=".9" opacity=".7"/>
  <line x1="342" y1="452" x2="342" y2="458" stroke="var(--pi-ink)" stroke-width=".7" opacity=".5"/>
  <line x1="373.3" y1="452" x2="373.3" y2="458" stroke="var(--pi-ink)" stroke-width=".7" opacity=".5"/>
  <line x1="404.7" y1="452" x2="404.7" y2="458" stroke="var(--pi-ink)" stroke-width=".7" opacity=".5"/>
  <line x1="436" y1="452" x2="436" y2="458" stroke="var(--pi-ink)" stroke-width=".7" opacity=".5"/>
  <line x1="467.3" y1="452" x2="467.3" y2="458" stroke="var(--pi-ink)" stroke-width=".7" opacity=".5"/>
  <line x1="498.7" y1="452" x2="498.7" y2="458" stroke="var(--pi-ink)" stroke-width=".7" opacity=".5"/>
  <line x1="530" y1="452" x2="530" y2="458" stroke="var(--pi-ink)" stroke-width=".7" opacity=".5"/>
  <line x1="328" y1="508" x2="544" y2="508" stroke="var(--pi-ink)" stroke-width=".6" opacity=".35"/>
  <text x="328" y="532" font-family="var(--pi-mono)" font-size="9.5" letter-spacing="2" fill="var(--pi-ink)">MTTR · 8 MIN</text>
</svg>
</div>`
  },
  {
    name: 'logo-cloud',
    group: 'evidence-media',
    groupLabel: '证据与媒体',
    description: 'Brand cloud wall of geometric line marks.',
    label: '品牌云墙',
    num: 67,
    variant: null,
    paperInkNative: true,
    frame: { width: 910, height: 460, fit: 'fixed' },
    /* 出自样张 layout-a7.html */
    snippet: `<div class="pi-card">
<svg class="pi-art" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
  <!-- 统计导语（整组水平居中） -->
  <text x="214" y="96" font-family="var(--pi-mono)" font-size="26" letter-spacing="2" text-anchor="end" fill="var(--pi-ink)">28</text>
  <text x="230" y="96" font-family="var(--pi-sans)" font-weight="300" font-size="15" fill="var(--pi-ink)">款 AI 工具已接入个人工作流</text>
  <text x="300" y="126" font-family="var(--pi-mono)" font-size="8.5" letter-spacing="3" text-anchor="middle" fill="var(--pi-ink-45)">AI STACK · DAILY DRIVERS · ALL MARKS FICTIONAL</text>
  <line x1="80" y1="150" x2="520" y2="150" stroke="var(--pi-ink)" stroke-width=".6" opacity=".22"/>

  <!-- 第 1 行 -->
  <circle cx="105" cy="216" r="16" fill="none" stroke="var(--pi-ink)" stroke-width="1.1" opacity=".7"/>
  <circle cx="105" cy="216" r="8.8" fill="none" stroke="var(--pi-ink)" stroke-width=".7" opacity=".5"/>
  <circle cx="105" cy="216" r="2" fill="var(--pi-ink)" opacity=".7"/>
  <text x="105" y="264" font-family="var(--pi-mono)" font-size="9" letter-spacing="2" text-anchor="middle" fill="var(--pi-ink-60)">CLAUDEAI</text>

  <path d="M 235 200 L 248.9 208 L 248.9 224 L 235 232 L 221.1 224 L 221.1 208 Z" fill="none" stroke="var(--pi-ink)" stroke-width="1.1" opacity=".7"/>
  <line x1="235" y1="207.2" x2="235" y2="224.8" stroke="var(--pi-ink)" stroke-width=".8" opacity=".5"/>
  <text x="235" y="264" font-family="var(--pi-mono)" font-size="9" letter-spacing="2" text-anchor="middle" fill="var(--pi-ink-60)">GPT-4O</text>

  <path d="M 365 198 L 378.9 220 L 351.1 220 Z" fill="none" stroke="var(--pi-ink)" stroke-width="1.1" opacity=".7"/>
  <line x1="352.2" y1="228.8" x2="377.8" y2="228.8" stroke="var(--pi-ink)" stroke-width=".8" opacity=".5"/>
  <text x="365" y="264" font-family="var(--pi-mono)" font-size="9" letter-spacing="2" text-anchor="middle" fill="var(--pi-ink-60)">GEMINI</text>

  <path d="M 479 222.4 A 16 16 0 0 1 488.6 200" fill="none" stroke="var(--pi-ink)" stroke-width="1.1" opacity=".7"/>
  <path d="M 485.4 220.8 A 9.6 9.6 0 0 1 491.8 207.2" fill="none" stroke="var(--pi-ink)" stroke-width=".8" opacity=".5"/>
  <circle cx="502.2" cy="223.2" r="2.2" fill="var(--pi-ink)" opacity=".7"/>
  <text x="495" y="264" font-family="var(--pi-mono)" font-size="9" letter-spacing="2" text-anchor="middle" fill="var(--pi-ink-60)">DEEPSEEK</text>

  <!-- 第 2 行 -->
  <path d="M 121 346 L 105 362 L 89 346 L 105 330 Z" fill="none" stroke="var(--pi-ink)" stroke-width="1.1" opacity=".7"/>
  <line x1="98.6" y1="346" x2="111.4" y2="346" stroke="var(--pi-ink)" stroke-width=".7" opacity=".5"/>
  <line x1="105" y1="339.6" x2="105" y2="352.4" stroke="var(--pi-ink)" stroke-width=".7" opacity=".5"/>
  <text x="105" y="394" font-family="var(--pi-mono)" font-size="9" letter-spacing="2" text-anchor="middle" fill="var(--pi-ink-60)">KIMI</text>

  <circle cx="235" cy="346" r="16" fill="none" stroke="var(--pi-ink)" stroke-width="1.1" opacity=".7"/>
  <line x1="223.8" y1="357.2" x2="246.2" y2="334.8" stroke="var(--pi-ink)" stroke-width=".9" opacity=".6"/>
  <text x="235" y="394" font-family="var(--pi-mono)" font-size="9" letter-spacing="2" text-anchor="middle" fill="var(--pi-ink-60)">DOUBAO</text>

  <path d="M 349 352.4 L 359.4 338 L 365 346.8 L 370.6 338 L 381 352.4" fill="none" stroke="var(--pi-ink)" stroke-width="1.1" opacity=".7"/>
  <line x1="353.8" y1="358" x2="376.2" y2="358" stroke="var(--pi-ink)" stroke-width=".7" opacity=".45"/>
  <text x="365" y="394" font-family="var(--pi-mono)" font-size="9" letter-spacing="2" text-anchor="middle" fill="var(--pi-ink-60)">QWEN</text>

  <path d="M 479 353.2 A 16 15.2 0 0 1 511 353.2" fill="none" stroke="var(--pi-ink)" stroke-width="1.1" opacity=".7"/>
  <line x1="474" y1="353.2" x2="516" y2="353.2" stroke="var(--pi-ink)" stroke-width=".8" opacity=".5"/>
  <circle cx="495" cy="343.6" r="1.8" fill="var(--pi-ink)" opacity=".6"/>
  <text x="495" y="394" font-family="var(--pi-mono)" font-size="9" letter-spacing="2" text-anchor="middle" fill="var(--pi-ink-60)">LLAMA</text>

  <!-- 第 3 行 -->
  <circle cx="105" cy="476" r="16" fill="none" stroke="var(--pi-ink)" stroke-width="1.1" opacity=".7"/>
  <circle cx="105" cy="476" r="8.8" fill="none" stroke="var(--pi-ink)" stroke-width=".7" opacity=".5"/>
  <circle cx="105" cy="476" r="2" fill="var(--pi-ink)" opacity=".7"/>
  <text x="105" y="524" font-family="var(--pi-mono)" font-size="9" letter-spacing="2" text-anchor="middle" fill="var(--pi-ink-60)">MISTRAL</text>

  <path d="M 235 460 L 248.9 468 L 248.9 484 L 235 492 L 221.1 484 L 221.1 468 Z" fill="none" stroke="var(--pi-ink)" stroke-width="1.1" opacity=".7"/>
  <line x1="235" y1="467.2" x2="235" y2="484.8" stroke="var(--pi-ink)" stroke-width=".8" opacity=".5"/>
  <text x="235" y="524" font-family="var(--pi-mono)" font-size="9" letter-spacing="2" text-anchor="middle" fill="var(--pi-ink-60)">COPILOT</text>

  <path d="M 365 458 L 378.9 480 L 351.1 480 Z" fill="none" stroke="var(--pi-ink)" stroke-width="1.1" opacity=".7"/>
  <line x1="352.2" y1="488.8" x2="377.8" y2="488.8" stroke="var(--pi-ink)" stroke-width=".8" opacity=".5"/>
  <text x="365" y="524" font-family="var(--pi-mono)" font-size="9" letter-spacing="2" text-anchor="middle" fill="var(--pi-ink-60)">CURSOR</text>

  <path d="M 479 482.4 A 16 16 0 0 1 488.6 460" fill="none" stroke="var(--pi-ink)" stroke-width="1.1" opacity=".7"/>
  <path d="M 485.4 480.8 A 9.6 9.6 0 0 1 491.8 467.2" fill="none" stroke="var(--pi-ink)" stroke-width=".8" opacity=".5"/>
  <circle cx="502.2" cy="483.2" r="2.2" fill="var(--pi-ink)" opacity=".7"/>
  <text x="495" y="524" font-family="var(--pi-mono)" font-size="9" letter-spacing="2" text-anchor="middle" fill="var(--pi-ink-60)">WINDSURF</text>
</svg>
</div>`
  },
  {
    name: 'mobile-gallery',
    group: 'evidence-media',
    groupLabel: '证据与媒体',
    description: 'Two-phone screen step gallery with flow arrow.',
    label: '手机屏步骤画廊',
    num: 68,
    variant: null,
    paperInkNative: true,
    frame: { width: 600, height: 600, fit: 'fixed' },
    /* 出自样张 layout-a9.html */
    snippet: `<div class="pi-card">
<svg class="pi-art" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
  <!-- 栏签 -->
  <text x="60" y="52" font-family="var(--pi-mono)" font-size="10" letter-spacing="3" fill="var(--pi-ink-45)">APP FLOW · SCREEN SPECIMENS</text>
  <line x1="60" y1="64" x2="540" y2="64" stroke="var(--pi-ink)" stroke-width=".6" opacity=".22"/>

  <!-- 手机 1 · 对话列表屏 -->
  <rect x="60" y="100" width="170" height="360" rx="16" fill="var(--pi-paper-panel)" stroke="var(--pi-ink-80)" stroke-width="1.3"/>
  <rect x="66" y="106" width="158" height="348" rx="12" fill="none" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
  <line x1="133" y1="112" x2="157" y2="112" stroke="var(--pi-ink)" stroke-width="1.6" opacity=".5"/>
  <text x="76" y="132" font-family="var(--pi-mono)" font-size="8" letter-spacing="1" fill="var(--pi-ink-45)">9:41</text>
  <rect x="178" y="122" width="12" height="8" fill="none" stroke="var(--pi-ink)" stroke-width=".8" opacity=".5"/>
  <rect x="194" y="122" width="20" height="8" fill="none" stroke="var(--pi-ink)" stroke-width=".8" opacity=".5"/>
  <rect x="196" y="124" width="10" height="4" fill="var(--pi-ink)" opacity=".5"/>
  <line x1="74" y1="140" x2="216" y2="140" stroke="var(--pi-ink)" stroke-width=".6" opacity=".25"/>
  <text x="78" y="168" font-family="var(--pi-sans)" font-weight="300" font-size="12" fill="var(--pi-ink)">AI 助手</text>
  <text x="212" y="166" font-family="var(--pi-mono)" font-size="8" text-anchor="end" fill="var(--pi-ink-45)">8 条</text>
  <circle cx="82" cy="196" r="4" fill="none" stroke="var(--pi-ink)" stroke-width="1.1" opacity=".8"/>
  <rect x="98" y="192" width="70" height="3" fill="var(--pi-ink)" opacity=".55"/>
  <rect x="98" y="202" width="46" height="2.5" fill="var(--pi-ink)" opacity=".28"/>
  <text x="212" y="198" font-family="var(--pi-mono)" font-size="8" text-anchor="end" fill="var(--pi-ink-45)">Q1</text>
  <line x1="78" y1="216" x2="212" y2="216" stroke="var(--pi-ink)" stroke-width=".6" opacity=".18"/>
  <circle cx="82" cy="244" r="4" fill="none" stroke="var(--pi-ink)" stroke-width="1.1" opacity=".8"/>
  <path d="M 82 240 A 4 4 0 0 1 82 248 Z" fill="var(--pi-ink)" opacity=".8"/>
  <rect x="98" y="240" width="60" height="3" fill="var(--pi-ink)" opacity=".55"/>
  <rect x="98" y="250" width="42" height="2.5" fill="var(--pi-ink)" opacity=".28"/>
  <text x="212" y="246" font-family="var(--pi-mono)" font-size="8" text-anchor="end" fill="var(--pi-ink-45)">Q2</text>
  <line x1="78" y1="264" x2="212" y2="264" stroke="var(--pi-ink)" stroke-width=".6" opacity=".18"/>
  <circle cx="82" cy="292" r="4" fill="var(--pi-ink)" opacity=".8"/>
  <rect x="98" y="288" width="66" height="3" fill="var(--pi-ink)" opacity=".55"/>
  <rect x="98" y="298" width="40" height="2.5" fill="var(--pi-ink)" opacity=".28"/>
  <text x="212" y="294" font-family="var(--pi-mono)" font-size="8" text-anchor="end" fill="var(--pi-ink-45)">Q3</text>
  <line x1="78" y1="312" x2="212" y2="312" stroke="var(--pi-ink)" stroke-width=".6" opacity=".18"/>
  <circle cx="82" cy="340" r="4" fill="none" stroke="var(--pi-ink)" stroke-width="1.1" opacity=".8"/>
  <rect x="98" y="336" width="56" height="3" fill="var(--pi-ink)" opacity=".55"/>
  <rect x="98" y="346" width="38" height="2.5" fill="var(--pi-ink)" opacity=".28"/>
  <text x="212" y="342" font-family="var(--pi-mono)" font-size="8" text-anchor="end" fill="var(--pi-ink-45)">Q4</text>
  <line x1="125" y1="446" x2="165" y2="446" stroke="var(--pi-ink)" stroke-width="1.4" opacity=".6"/>
  <text x="145" y="492" font-family="var(--pi-mono)" font-size="9.5" letter-spacing="2" text-anchor="middle" fill="var(--pi-ink-45)">STEP 01 — ASK</text>
  <text x="145" y="514" font-family="var(--pi-sans)" font-weight="300" font-size="10" text-anchor="middle" fill="var(--pi-ink-60)">提问</text>

  <!-- 屏间开放箭头 + 构造十字 + 步骤标签 -->
  <text x="300" y="256" font-family="var(--pi-mono)" font-size="10" text-anchor="middle" fill="var(--pi-ink-45)">+</text>
  <line x1="246" y1="280" x2="336" y2="280" stroke="var(--pi-ink)" stroke-width="1.1" opacity=".7"/>
  <path d="M 324 272 L 336 280 L 324 288" fill="none" stroke="var(--pi-ink)" stroke-width="1.1" opacity=".7"/>
  <text x="300" y="312" font-family="var(--pi-mono)" font-size="9" letter-spacing="2" text-anchor="middle" fill="var(--pi-ink-45)">STEP 01 → 02</text>

  <!-- 手机 2 · 统计横条屏 -->
  <rect x="370" y="100" width="170" height="360" rx="16" fill="var(--pi-paper-panel)" stroke="var(--pi-ink-80)" stroke-width="1.3"/>
  <rect x="376" y="106" width="158" height="348" rx="12" fill="none" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
  <line x1="443" y1="112" x2="467" y2="112" stroke="var(--pi-ink)" stroke-width="1.6" opacity=".5"/>
  <text x="386" y="132" font-family="var(--pi-mono)" font-size="8" letter-spacing="1" fill="var(--pi-ink-45)">9:41</text>
  <rect x="488" y="122" width="12" height="8" fill="none" stroke="var(--pi-ink)" stroke-width=".8" opacity=".5"/>
  <rect x="504" y="122" width="20" height="8" fill="none" stroke="var(--pi-ink)" stroke-width=".8" opacity=".5"/>
  <rect x="506" y="124" width="10" height="4" fill="var(--pi-ink)" opacity=".5"/>
  <line x1="384" y1="140" x2="526" y2="140" stroke="var(--pi-ink)" stroke-width=".6" opacity=".25"/>
  <text x="388" y="168" font-family="var(--pi-sans)" font-weight="300" font-size="12" fill="var(--pi-ink)">本周用量</text>
  <text x="522" y="166" font-family="var(--pi-mono)" font-size="8" text-anchor="end" fill="var(--pi-ink-45)">W32</text>
  <text x="388" y="212" font-family="var(--pi-mono)" font-size="20" fill="var(--pi-ink)">1,284</text>
  <text x="388" y="232" font-family="var(--pi-sans)" font-weight="300" font-size="9" fill="var(--pi-ink-45)">TOKENS · 本周调用</text>
  <text x="388" y="264" font-family="var(--pi-sans)" font-weight="300" font-size="10" fill="var(--pi-ink-70)">提问次数</text>
  <text x="522" y="264" font-family="var(--pi-mono)" font-size="9.5" text-anchor="end" fill="var(--pi-ink)">87%</text>
  <rect x="388" y="274" width="134" height="10" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".7"/>
  <rect x="391" y="277" width="111.4" height="4" fill="var(--pi-ink)" opacity=".55"/>
  <text x="388" y="310" font-family="var(--pi-sans)" font-weight="300" font-size="10" fill="var(--pi-ink-70)">生成字数</text>
  <text x="522" y="310" font-family="var(--pi-mono)" font-size="9.5" text-anchor="end" fill="var(--pi-ink)">62%</text>
  <rect x="388" y="320" width="134" height="10" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".7"/>
  <rect x="391" y="323" width="79.4" height="4" fill="var(--pi-ink)" opacity=".55"/>
  <text x="388" y="356" font-family="var(--pi-sans)" font-weight="300" font-size="10" fill="var(--pi-ink-70)">采纳率</text>
  <text x="522" y="356" font-family="var(--pi-mono)" font-size="9.5" text-anchor="end" fill="var(--pi-ink)">91%</text>
  <rect x="388" y="366" width="134" height="10" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".7"/>
  <rect x="391" y="369" width="116.5" height="4" fill="var(--pi-ink)" opacity=".55"/>
  <rect x="388" y="414" width="64" height="3" fill="var(--pi-ink)" opacity=".55"/>
  <rect x="388" y="425" width="44" height="2.5" fill="var(--pi-ink)" opacity=".28"/>
  <line x1="435" y1="446" x2="475" y2="446" stroke="var(--pi-ink)" stroke-width="1.4" opacity=".6"/>
  <text x="455" y="492" font-family="var(--pi-mono)" font-size="9.5" letter-spacing="2" text-anchor="middle" fill="var(--pi-ink-45)">STEP 02 — INSIGHTS</text>
  <text x="455" y="514" font-family="var(--pi-sans)" font-weight="300" font-size="10" text-anchor="middle" fill="var(--pi-ink-60)">统计</text>
</svg>
</div>`
  },
{
    name: 'admin-console',
    group: 'evidence-media',
    groupLabel: '证据与媒体',
    description: 'Admin console mock: filter bar, run list and trace tree.',
    label: '后台管理台线稿',
    num: 69,
    variant: null,
    paperInkNative: true,
    frame: { width: 910, height: 460, fit: 'fixed' },
    /* 出自样张 layout-a8.html */
    snippet: `<div class="pi-card">
<style>
.pi-admin-top { position: absolute; top: 26px; left: 26px; font-family: var(--pi-mono); font-size: 9px; letter-spacing: 3px; color: var(--pi-ink-45); }
.pi-admin-rule { position: absolute; top: 46px; left: 26px; right: 26px; border-top: .6px solid var(--pi-ink-30); }
.pi-admin { position: absolute; left: 24px; right: 24px; top: 62px; bottom: 78px; border: 1px solid var(--pi-ink-45); display: flex; flex-direction: column; }
.pi-admin-f { display: flex; align-items: center; gap: 8px; height: 44px; padding: 0 12px; border-bottom: 1px solid var(--pi-ink-30); flex: 0 0 auto; }
.pi-admin-f .chip { font-family: var(--pi-mono); font-size: 8.5px; color: var(--pi-ink-70); border: 1px solid var(--pi-ink-30); padding: 3px 7px; white-space: nowrap; }
.pi-admin-f .chip .d { color: var(--pi-ink-45); margin-right: 5px; }
.pi-admin-f .go { margin-left: auto; font-family: var(--pi-sans); font-weight: 400; font-size: 9.5px; color: var(--pi-ink); border: 1px solid var(--pi-ink); padding: 3px 14px; }
.pi-admin-b { flex: 1; display: flex; min-height: 0; }
.pi-admin-t { width: 332px; padding: 8px 12px 10px; display: flex; flex-direction: column; }
.pi-admin-t .th { display: flex; justify-content: space-between; font-family: var(--pi-mono); font-size: 7.5px; letter-spacing: 2px; color: var(--pi-ink-45); padding: 2px 4px 7px; border-bottom: 1px solid var(--pi-ink-45); }
.pi-admin-t .r { display: grid; grid-template-columns: 1fr 40px; gap: 8px; align-items: center; padding: 9px 4px; border-bottom: 1px solid var(--pi-ink-30); position: relative; }
.pi-admin-t .l1 { display: flex; align-items: center; gap: 8px; font-family: var(--pi-mono); font-size: 8.5px; color: var(--pi-ink-70); }
.pi-admin-t .l1 .md { color: var(--pi-ink-45); }
.pi-admin-t .l1 .tm { margin-left: auto; color: var(--pi-ink-45); font-size: 7.5px; }
.pi-admin-t .l2 { margin-top: 5px; font-family: var(--pi-sans); font-weight: 300; font-size: 10px; color: var(--pi-ink-80); }
.pi-admin-t .dot { width: 8px; height: 8px; border-radius: 50%; border: 1px solid var(--pi-ink); flex: 0 0 auto; position: relative; overflow: hidden; }
.pi-admin-t .dot.full { background: var(--pi-ink); }
.pi-admin-t .dot.half::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 50%; background: var(--pi-ink); }
.pi-admin-t .ops { display: flex; flex-direction: column; gap: 4px; align-items: stretch; }
.pi-admin-t .ops span { border: 1px solid var(--pi-ink-45); padding: 1px 0; font-family: var(--pi-sans); font-weight: 300; font-size: 7.5px; color: var(--pi-ink-70); text-align: center; white-space: nowrap; }
.pi-admin-t .r.sel { outline: 1px solid var(--pi-ink); outline-offset: -1px; }
.pi-admin-t .r.sel .sel-tag { position: absolute; right: 8px; top: -7px; background: var(--pi-paper); padding: 0 5px; font-family: var(--pi-mono); font-size: 7px; letter-spacing: 2px; color: var(--pi-ink-45); }
.pi-admin-t .tf { margin-top: auto; padding-top: 8px; font-family: var(--pi-mono); font-size: 7px; letter-spacing: 1.5px; color: var(--pi-ink-45); display: flex; justify-content: space-between; }
.pi-admin-l { flex: 1; border-left: 1px solid var(--pi-ink-30); padding: 8px 12px 10px; display: flex; flex-direction: column; min-width: 0; }
.pi-admin-l .lh { display: flex; justify-content: space-between; font-family: var(--pi-mono); font-size: 8.5px; letter-spacing: 2px; color: var(--pi-ink); border-bottom: 1px solid var(--pi-ink-45); padding: 2px 0 7px; margin-bottom: 2px; }
.pi-admin-l .lh .id { color: var(--pi-ink-45); letter-spacing: 1px; }
.pi-admin-l .n { display: flex; align-items: baseline; gap: 6px; padding: 7px 2px; font-family: var(--pi-sans); font-weight: 300; font-size: 9.5px; color: var(--pi-ink-70); }
.pi-admin-l .n .tg { font-family: var(--pi-mono); font-size: 7px; color: var(--pi-ink-45); flex: 0 0 auto; }
.pi-admin-l .n .tm { margin-left: auto; font-family: var(--pi-mono); font-size: 7.5px; color: var(--pi-ink-45); flex: 0 0 auto; }
.pi-admin-l .n .tm.err { color: var(--pi-ink); }
.pi-admin-l .n.d2 { margin-left: 14px; }
.pi-admin-l .n.sel { outline: 1px solid var(--pi-ink); outline-offset: -1px; padding: 7px 8px; }
.pi-admin-l .n.off { opacity: .35; }
.pi-admin-l .io { margin: 5px 0 2px 14px; padding: 6px 8px; border: 1px dashed var(--pi-ink-45); font-family: var(--pi-mono); font-size: 7.5px; line-height: 1.9; color: var(--pi-ink-70); }
.pi-admin-l .io b { color: var(--pi-ink); font-weight: 400; }
.pi-admin-l .io .lb { color: var(--pi-ink-45); letter-spacing: 1px; }
.pi-admin-l .lf { margin-top: auto; border-top: 1px dashed var(--pi-ink-30); padding-top: 8px; font-family: var(--pi-mono); font-size: 7px; letter-spacing: 1.5px; color: var(--pi-ink-45); display: flex; justify-content: space-between; }
.pi-admin-cap { position: absolute; left: 0; right: 0; bottom: 28px; text-align: center; font-family: var(--pi-sans); font-weight: 400; font-size: 10.5px; letter-spacing: .04em; color: var(--pi-ink); }
</style>
<div class="pi-admin-top">AGENT OPS — TRACE CONSOLE</div>
<div class="pi-admin-rule"></div>
<div class="pi-admin">
  <div class="pi-admin-f">
    <span class="chip"><span class="d">工作区</span>wise-ppt ▾</span>
    <span class="chip"><span class="d">任务类型</span>全部 ▾</span>
    <span class="chip"><span class="d">状态</span>全部 ▾</span>
    <span class="chip"><span class="d">时段</span>近 12H ▾</span>
    <span class="go">查询</span>
  </div>
  <div class="pi-admin-b">
    <div class="pi-admin-t">
      <div class="th"><span>RUN ID · MODEL · INSTRUCTION / RESULT</span><span>操作</span></div>
      <div class="r">
        <div>
          <div class="l1"><i class="dot"></i><span>t7f3a2****</span><span class="md">glm-5.2</span><span class="tm">14:22</span></div>
          <div class="l2">生成 A1 标本卡 · 估分梗 → 已完成</div>
        </div>
        <div class="ops"><span>详情</span><span>日志</span><span>回放</span></div>
      </div>
      <div class="r">
        <div>
          <div class="l1"><i class="dot half"></i><span>k2d8e1****</span><span class="md">claude-4.5</span><span class="tm">13:58</span></div>
          <div class="l2">重构 B1 流水线 · 4 段 · 已挂起</div>
        </div>
        <div class="ops"><span>详情</span><span>日志</span><span>回放</span></div>
      </div>
      <div class="r sel">
        <span class="sel-tag">SELECTED</span>
        <div>
          <div class="l1"><i class="dot full"></i><span>a91c5e****</span><span class="md">glm-5.2</span><span class="tm">13:41</span></div>
          <div class="l2">工具调用 · 读 layout-c4 → 超时 · 未执行</div>
        </div>
        <div class="ops"><span>详情</span><span>日志</span><span>回放</span></div>
      </div>
      <div class="r">
        <div>
          <div class="l1"><i class="dot"></i><span>f55b92****</span><span class="md">deepseek-v3</span><span class="tm">12:30</span></div>
          <div class="l2">批量改 D 族 6 页 → 已完成</div>
        </div>
        <div class="ops"><span>详情</span><span>日志</span><span>回放</span></div>
      </div>
      <div class="r">
        <div>
          <div class="l1"><i class="dot"></i><span>b73e08****</span><span class="md">glm-5.2</span><span class="tm">11:15</span></div>
          <div class="l2">机检 shot-lint.py · 59 页 → 已完成</div>
        </div>
        <div class="ops"><span>详情</span><span>日志</span><span>回放</span></div>
      </div>
      <div class="tf"><span>SHOWING 5 / 128 RUNS</span><span>PAGE 1</span></div>
    </div>
    <div class="pi-admin-l">
      <div class="lh"><span>推理过程 · 节点树</span><span class="id">a91c5e****</span></div>
      <div class="n"><span>▸ 读文件 layout-c4</span><span class="tg">ROOT</span><span class="tm">✓ 受理</span></div>
      <div class="n d2"><span>意图解析</span><span class="tg">PARSER</span><span class="tm">✓ 8ms</span></div>
      <div class="n d2"><span>路径解析</span><span class="tg">PLANNER</span><span class="tm">✓ 214ms</span></div>
      <div class="n d2 sel"><span>read_file · layout-c4</span><span class="tg">TOOL</span><span class="tm err">✕ 60s 超时</span></div>
      <div class="io">
        <span class="lb">ERROR</span>　<b>ToolTimeoutError</b>：超过 60s<br>
        <span class="lb">INPUT</span>　{ path: "layout-c4.html" }<br>
        <span class="lb">OUTPUT</span>　无（调用未返回）
      </div>
      <div class="n d2 off"><span>任务挂起</span><span class="tg">SUSPEND</span><span class="tm">未执行</span></div>
      <div class="n d2 off"><span>人工接管告警</span><span class="tg">ALERT</span><span class="tm">未执行</span></div>
      <div class="lf"><span>Σ 6 NODES · 1 ERROR</span><span>60.2S</span></div>
    </div>
  </div>
</div>
<div class="pi-admin-cap">每次推理的节点、耗时与输入输出都能回溯到同一会话。</div>
</div>`
  },
  {
    name: 'trace-tree',
    group: 'flow-temporal',
    groupLabel: '流程与时序',
    description: 'Execution trace tree with node timings and error I/O detail.',
    label: '树形过程日志',
    num: 70,
    variant: null,
    paperInkNative: true,
    frame: { width: 830, height: 510, fit: 'fixed' },
    /* 出自样张 layout-a8.html */
    snippet: `<div class="pi-card">
<style>
.pi-trace { position: absolute; inset: 40px 44px; display: flex; flex-direction: column; }
.pi-trace .hd { display: flex; justify-content: space-between; align-items: baseline; font-family: var(--pi-mono); font-size: 11px; letter-spacing: 3px; color: var(--pi-ink); }
.pi-trace .hd .id { font-size: 9px; letter-spacing: 1px; color: var(--pi-ink-45); }
.pi-trace .r1 { border-top: 1.3px solid var(--pi-ink); margin-top: 10px; }
.pi-trace .r2 { border-top: .6px solid var(--pi-ink-30); margin-top: 3px; margin-bottom: 6px; }
.pi-trace .n { display: flex; align-items: baseline; gap: 10px; padding: 11px 4px; font-family: var(--pi-sans); font-weight: 300; font-size: 12px; color: var(--pi-ink-70); position: relative; }
.pi-trace .n .tg { font-family: var(--pi-mono); font-size: 8px; letter-spacing: 1px; color: var(--pi-ink-45); }
.pi-trace .n .tm { margin-left: auto; font-family: var(--pi-mono); font-size: 9px; color: var(--pi-ink-45); }
.pi-trace .n .tm.err { color: var(--pi-ink); }
.pi-trace .n.d2 { margin-left: 28px; }
.pi-trace .n.d2::before { content: ''; position: absolute; left: -16px; top: -4px; height: 58%; width: 10px; border-left: .6px solid var(--pi-ink-30); border-bottom: .6px solid var(--pi-ink-30); }
.pi-trace .n.sel { outline: 1px solid var(--pi-ink); outline-offset: -1px; padding: 11px 10px; }
.pi-trace .n.off { opacity: .35; }
.pi-trace .io { margin: 3px 0 4px 28px; padding: 9px 12px; border: 1px dashed var(--pi-ink-45); font-family: var(--pi-mono); font-size: 9px; line-height: 2; color: var(--pi-ink-70); }
.pi-trace .io b { color: var(--pi-ink); font-weight: 400; }
.pi-trace .io .lb { color: var(--pi-ink-45); letter-spacing: 1.5px; }
.pi-trace .ft { margin-top: auto; }
.pi-trace .ft .fr { border-top: .6px solid var(--pi-ink-30); margin-bottom: 9px; }
.pi-trace .ft .row { display: flex; justify-content: space-between; font-family: var(--pi-mono); font-size: 8px; letter-spacing: 2px; color: var(--pi-ink-45); }
</style>
<div class="pi-trace">
  <div class="hd"><span>TRACE · EXECUTION LOG</span><span class="id">RUN a91c5e****</span></div>
  <div class="r1"></div>
  <div class="r2"></div>
  <div class="n"><span>▸ 读文件 layout-c4 · 任务树</span><span class="tg">ROOT</span><span class="tm">✓ 受理</span></div>
  <div class="n d2"><span>意图解析</span><span class="tg">PARSER</span><span class="tm">✓ 8ms</span></div>
  <div class="n d2"><span>路径解析</span><span class="tg">PLANNER</span><span class="tm">✓ 214ms</span></div>
  <div class="n d2 sel"><span>read_file · layout-c4</span><span class="tg">TOOL</span><span class="tm err">✕ 60s 超时</span></div>
  <div class="io">
    <span class="lb">ERROR</span>　<b>ToolTimeoutError</b>：工具调用超时（超过 60s）<br>
    <span class="lb">INPUT</span>　{ path: "gallery/paper-ink/ai/frames/layout-c4.html" }<br>
    <span class="lb">OUTPUT</span>　无（调用未返回）<br>
    <span class="lb">TRACE</span>　已写入 audit.log · 会话保持现场
  </div>
  <div class="n d2 off"><span>任务挂起</span><span class="tg">SUSPEND</span><span class="tm">未执行</span></div>
  <div class="n d2 off"><span>人工接管告警</span><span class="tg">ALERT</span><span class="tm">未执行</span></div>
  <div class="n d2 off"><span>写入审计日志</span><span class="tg">AUDIT</span><span class="tm">未执行</span></div>
  <div class="ft">
    <div class="fr"></div>
    <div class="row"><span>Σ 7 NODES · 1 ERROR · TOTAL 60.4S</span><span>EOF · SUSPENDED</span></div>
  </div>
</div>
</div>`
  },
  {
    name: 'gantt-ink',
    group: 'flow-temporal',
    groupLabel: '流程与时序',
    description: 'Hatched ink gantt with specimen ruler and a broken span.',
    label: '墨线甘特图',
    num: 71,
    variant: null,
    paperInkNative: true,
    frame: { width: 970, height: 430, fit: 'fixed' },
    /* 出自样张 layout-b2.html */
    snippet: `<div class="pi-card">
<svg class="pi-art" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="pi-hatch-gantt" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="6" stroke="var(--pi-ink)" stroke-width="0.7" opacity="0.35"/>
    </pattern>
  </defs>

  <!-- 标本刻度尺 0–90S -->
  <line x1="156" y1="110" x2="574" y2="110" stroke="var(--pi-ink-80)" stroke-width="1.4"/>
  <line x1="170" y1="110" x2="170" y2="125" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
  <line x1="191.7" y1="110" x2="191.7" y2="118" stroke="var(--pi-ink-80)" stroke-width=".8" opacity=".55"/>
  <line x1="213.3" y1="110" x2="213.3" y2="118" stroke="var(--pi-ink-80)" stroke-width=".8" opacity=".55"/>
  <line x1="235" y1="110" x2="235" y2="125" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
  <line x1="256.7" y1="110" x2="256.7" y2="118" stroke="var(--pi-ink-80)" stroke-width=".8" opacity=".55"/>
  <line x1="278.3" y1="110" x2="278.3" y2="118" stroke="var(--pi-ink-80)" stroke-width=".8" opacity=".55"/>
  <line x1="300" y1="110" x2="300" y2="125" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
  <line x1="321.7" y1="110" x2="321.7" y2="118" stroke="var(--pi-ink-80)" stroke-width=".8" opacity=".55"/>
  <line x1="343.3" y1="110" x2="343.3" y2="118" stroke="var(--pi-ink-80)" stroke-width=".8" opacity=".55"/>
  <line x1="365" y1="110" x2="365" y2="125" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
  <line x1="386.7" y1="110" x2="386.7" y2="118" stroke="var(--pi-ink-80)" stroke-width=".8" opacity=".55"/>
  <line x1="408.3" y1="110" x2="408.3" y2="118" stroke="var(--pi-ink-80)" stroke-width=".8" opacity=".55"/>
  <line x1="430" y1="110" x2="430" y2="125" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
  <line x1="451.7" y1="110" x2="451.7" y2="118" stroke="var(--pi-ink-80)" stroke-width=".8" opacity=".55"/>
  <line x1="473.3" y1="110" x2="473.3" y2="118" stroke="var(--pi-ink-80)" stroke-width=".8" opacity=".55"/>
  <line x1="495" y1="110" x2="495" y2="125" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
  <line x1="516.7" y1="110" x2="516.7" y2="118" stroke="var(--pi-ink-80)" stroke-width=".8" opacity=".55"/>
  <line x1="538.3" y1="110" x2="538.3" y2="118" stroke="var(--pi-ink-80)" stroke-width=".8" opacity=".55"/>
  <line x1="560" y1="110" x2="560" y2="125" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
  <text x="170" y="96" font-family="var(--pi-mono)" font-size="11" text-anchor="middle" fill="var(--pi-ink-70)">0</text>
  <text x="235" y="96" font-family="var(--pi-mono)" font-size="11" text-anchor="middle" fill="var(--pi-ink-70)">15</text>
  <text x="300" y="96" font-family="var(--pi-mono)" font-size="11" text-anchor="middle" fill="var(--pi-ink-70)">30</text>
  <text x="365" y="96" font-family="var(--pi-mono)" font-size="11" text-anchor="middle" fill="var(--pi-ink-70)">45</text>
  <text x="430" y="96" font-family="var(--pi-mono)" font-size="11" text-anchor="middle" fill="var(--pi-ink-70)">60</text>
  <text x="495" y="96" font-family="var(--pi-mono)" font-size="11" text-anchor="middle" fill="var(--pi-ink-70)">75</text>
  <text x="560" y="96" font-family="var(--pi-mono)" font-size="11" text-anchor="middle" fill="var(--pi-ink-70)">90</text>
  <text x="150" y="100" font-family="var(--pi-mono)" font-size="9" text-anchor="end" fill="var(--pi-ink-45)">T0</text>
  <text x="580" y="100" font-family="var(--pi-mono)" font-size="8.5" letter-spacing="2" fill="var(--pi-ink-45)">SEC</text>

  <!-- 主刻度竖向构造栅格 -->
  <line x1="170" y1="134" x2="170" y2="486" stroke="var(--pi-ink)" stroke-width=".6" stroke-dasharray="3 6" opacity=".3"/>
  <line x1="235" y1="134" x2="235" y2="486" stroke="var(--pi-ink)" stroke-width=".6" stroke-dasharray="3 6" opacity=".3"/>
  <line x1="300" y1="134" x2="300" y2="486" stroke="var(--pi-ink)" stroke-width=".6" stroke-dasharray="3 6" opacity=".3"/>
  <line x1="365" y1="134" x2="365" y2="486" stroke="var(--pi-ink)" stroke-width=".6" stroke-dasharray="3 6" opacity=".3"/>
  <line x1="430" y1="134" x2="430" y2="486" stroke="var(--pi-ink)" stroke-width=".6" stroke-dasharray="3 6" opacity=".3"/>
  <line x1="495" y1="134" x2="495" y2="486" stroke="var(--pi-ink)" stroke-width=".6" stroke-dasharray="3 6" opacity=".3"/>
  <line x1="560" y1="134" x2="560" y2="486" stroke="var(--pi-ink)" stroke-width=".6" stroke-dasharray="3 6" opacity=".3"/>

  <!-- 行 1 · DATA -->
  <text x="46" y="216" font-family="var(--pi-mono)" font-size="9" fill="var(--pi-ink-30)">SPAN 01</text>
  <text x="150" y="208" font-family="var(--pi-mono)" font-size="11" letter-spacing="2" text-anchor="end" fill="var(--pi-ink-80)">DATA</text>
  <text x="150" y="230" font-family="var(--pi-sans)" font-weight="300" font-size="12" text-anchor="end" fill="var(--pi-ink-45)">数据准备</text>
  <rect x="178.7" y="190" width="39" height="44" fill="url(#pi-hatch-gantt)" stroke="var(--pi-ink-80)" stroke-width="1.4"/>
  <line x1="178.7" y1="184" x2="178.7" y2="240" stroke="var(--pi-ink-80)" stroke-width="1.4"/>
  <line x1="217.7" y1="184" x2="217.7" y2="240" stroke="var(--pi-ink-80)" stroke-width="1.4"/>
  <text x="188.7" y="178" font-family="var(--pi-mono)" font-size="9" letter-spacing="1" fill="var(--pi-ink-60)">02 → 11 · 9S</text>
  <line x1="46" y1="252" x2="574" y2="252" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>

  <!-- 行 2 · PRETRAIN -->
  <text x="46" y="326" font-family="var(--pi-mono)" font-size="9" fill="var(--pi-ink-30)">SPAN 02</text>
  <text x="150" y="318" font-family="var(--pi-mono)" font-size="11" letter-spacing="2" text-anchor="end" fill="var(--pi-ink-80)">PRETRAIN</text>
  <text x="150" y="340" font-family="var(--pi-sans)" font-weight="300" font-size="12" text-anchor="end" fill="var(--pi-ink-45)">预训练</text>
  <rect x="204.7" y="300" width="69.3" height="44" fill="url(#pi-hatch-gantt)" stroke="var(--pi-ink-80)" stroke-width="1.4"/>
  <line x1="204.7" y1="294" x2="204.7" y2="350" stroke="var(--pi-ink-80)" stroke-width="1.4"/>
  <line x1="274" y1="294" x2="274" y2="350" stroke="var(--pi-ink-80)" stroke-width="1.4"/>
  <text x="214.7" y="288" font-family="var(--pi-mono)" font-size="9" letter-spacing="1" fill="var(--pi-ink-60)">08 → 24 · 16S</text>
  <line x1="46" y1="362" x2="574" y2="362" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>

  <!-- 行 3 · SFT（中段断裂） -->
  <text x="46" y="436" font-family="var(--pi-mono)" font-size="9" fill="var(--pi-ink-30)">SPAN 03</text>
  <text x="150" y="428" font-family="var(--pi-mono)" font-size="11" letter-spacing="2" text-anchor="end" fill="var(--pi-ink-80)">SFT</text>
  <text x="150" y="450" font-family="var(--pi-sans)" font-weight="300" font-size="12" text-anchor="end" fill="var(--pi-ink-45)">监督微调</text>
  <rect x="256.7" y="410" width="60.6" height="44" fill="url(#pi-hatch-gantt)" stroke="var(--pi-ink-80)" stroke-width="1.4"/>
  <line x1="256.7" y1="404" x2="256.7" y2="460" stroke="var(--pi-ink-80)" stroke-width="1.4"/>
  <line x1="317.3" y1="404" x2="317.3" y2="460" stroke="var(--pi-ink-80)" stroke-width="1.4"/>
  <rect x="373.7" y="410" width="47.6" height="44" fill="url(#pi-hatch-gantt)" stroke="var(--pi-ink-80)" stroke-width="1.4"/>
  <line x1="373.7" y1="404" x2="373.7" y2="460" stroke="var(--pi-ink-80)" stroke-width="1.4"/>
  <line x1="421.3" y1="404" x2="421.3" y2="460" stroke="var(--pi-ink-80)" stroke-width="1.4"/>
  <text x="266.7" y="398" font-family="var(--pi-mono)" font-size="9" letter-spacing="1" fill="var(--pi-ink-60)">20 → 58</text>
  <!-- 断口：虚线占位 + 两端毛边（烘焙固定锯齿） -->
  <rect x="317.3" y="417" width="56.4" height="30" fill="none" stroke="var(--pi-ink)" stroke-width=".6" stroke-dasharray="3 5" opacity=".3"/>
  <line x1="317.3" y1="416" x2="310.3" y2="419" stroke="var(--pi-ink-80)" stroke-width=".9" opacity=".6"/>
  <line x1="317.3" y1="424" x2="309.3" y2="427" stroke="var(--pi-ink-80)" stroke-width=".9" opacity=".6"/>
  <line x1="317.3" y1="432" x2="311.3" y2="436" stroke="var(--pi-ink-80)" stroke-width=".9" opacity=".6"/>
  <line x1="317.3" y1="440" x2="308.3" y2="444" stroke="var(--pi-ink-80)" stroke-width=".9" opacity=".6"/>
  <line x1="317.3" y1="448" x2="312.3" y2="452" stroke="var(--pi-ink-80)" stroke-width=".9" opacity=".6"/>
  <line x1="373.7" y1="416" x2="380.7" y2="419" stroke="var(--pi-ink-80)" stroke-width=".9" opacity=".6"/>
  <line x1="373.7" y1="424" x2="382.7" y2="428" stroke="var(--pi-ink-80)" stroke-width=".9" opacity=".6"/>
  <line x1="373.7" y1="432" x2="379.7" y2="436" stroke="var(--pi-ink-80)" stroke-width=".9" opacity=".6"/>
  <line x1="373.7" y1="440" x2="383.7" y2="443" stroke="var(--pi-ink-80)" stroke-width=".9" opacity=".6"/>
  <line x1="373.7" y1="448" x2="378.7" y2="453" stroke="var(--pi-ink-80)" stroke-width=".9" opacity=".6"/>
  <line x1="46" y1="472" x2="574" y2="472" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>

  <!-- 断口归因：T+40S 构造线 + 引线标注 -->
  <line x1="345.5" y1="368" x2="345.5" y2="134" stroke="var(--pi-ink)" stroke-width=".6" stroke-dasharray="3 6" opacity=".3"/>
  <circle cx="345.5" cy="110" r="3.5" fill="none" stroke="var(--pi-ink-80)" stroke-width="1"/>
  <text x="357.5" y="152" font-family="var(--pi-mono)" font-size="9" fill="var(--pi-ink-45)">T+40S</text>
  <path d="M 366 458 Q 412 478 446 484" fill="none" stroke="var(--pi-ink-80)" stroke-width="1" opacity=".7"/>
  <text x="560" y="492" font-family="var(--pi-mono)" font-size="10" letter-spacing="1.5" text-anchor="end" fill="var(--pi-ink)">SFT HALT · GPU OOM</text>
  <text x="560" y="511" font-family="var(--pi-sans)" font-weight="300" font-size="10" text-anchor="end" fill="var(--pi-ink-60)">显存溢出中断，触发检查点回滚</text>
  <line x1="468" y1="501" x2="490" y2="501" stroke="var(--pi-ink-80)" stroke-width=".8" opacity=".5"/>

  <!-- 页脚 -->
  <line x1="46" y1="545" x2="180" y2="545" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
  <line x1="420" y1="545" x2="554" y2="545" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
  <text x="300" y="549" font-family="var(--pi-mono)" font-size="8.5" letter-spacing="3" text-anchor="middle" fill="var(--pi-ink-45)">MODEL TRAINING · SINGLE RUN</text>
</svg>
</div>`
  },
  {
    name: 'timeline-gallery',
    group: 'flow-temporal',
    groupLabel: '流程与时序',
    description: 'Horizontal timeline with hanging double-framed evidence cards.',
    label: '时间轴垂挂画廊',
    num: 72,
    variant: null,
    paperInkNative: true,
    frame: { width: 960, height: 440, fit: 'fixed' },
    /* 出自样张 layout-b4.html */
    /* 出自样张 layout-b4.html：卡片复原原稿 300×240 横版比例（150×120），
       卡间留 25px 呼吸间隙（节点 x125/300/475），上下排交错 110 */
    snippet: `<div class="pi-card">
<svg class="pi-art" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="pi-hatch-tl" width="8" height="8" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="0" y2="8" stroke="var(--pi-ink)" stroke-width=".7" opacity=".35"/>
    </pattern>
  </defs>

  <!-- 主骨：水平时间轴（本卡唯一强调线） -->
  <line x1="60" y1="170" x2="540" y2="170" stroke="var(--pi-ink)" stroke-width="2"/>
  <line x1="60" y1="162" x2="60" y2="178" stroke="var(--pi-ink-80)" stroke-width="1"/>
  <line x1="540" y1="162" x2="540" y2="178" stroke="var(--pi-ink-80)" stroke-width="1"/>

  <!-- 节点 1 · 仓库平面微场景（上排卡） -->
  <text x="125" y="144" font-family="var(--pi-mono)" font-size="9.5" letter-spacing="2" text-anchor="middle" fill="var(--pi-ink)">2017.06</text>
  <circle cx="125" cy="170" r="6" fill="var(--pi-paper)" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
  <circle cx="125" cy="170" r="2.2" fill="var(--pi-ink)"/>
  <line x1="125" y1="177" x2="125" y2="210" stroke="var(--pi-ink)" stroke-width=".7" opacity=".55"/>
  <circle cx="125" cy="194" r="2.4" fill="var(--pi-ink)" opacity=".55"/>
  <rect x="50" y="210" width="150" height="120" fill="var(--pi-paper-panel)" stroke="var(--pi-ink-80)" stroke-width="1.3"/>
  <rect x="55" y="215" width="140" height="110" fill="none" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
  <text x="59" y="225" font-family="var(--pi-mono)" font-size="8" letter-spacing="2" fill="var(--pi-ink-45)">V1 — TRANSFORMER</text>
  <rect x="79" y="244" width="92" height="44" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
  <line x1="102" y1="244" x2="102" y2="288" stroke="var(--pi-ink)" stroke-width=".6" opacity=".35"/>
  <line x1="125" y1="244" x2="125" y2="288" stroke="var(--pi-ink)" stroke-width=".6" opacity=".35"/>
  <line x1="148" y1="244" x2="148" y2="288" stroke="var(--pi-ink)" stroke-width=".6" opacity=".35"/>
  <circle cx="91" cy="257" r="2.5" fill="none" stroke="var(--pi-ink-80)" stroke-width="1"/>
  <circle cx="91" cy="257" r="1.1" fill="var(--pi-ink)"/>
  <circle cx="125" cy="272" r="2.5" fill="none" stroke="var(--pi-ink-80)" stroke-width="1"/>
  <circle cx="125" cy="272" r="1.1" fill="var(--pi-ink)"/>
  <circle cx="159" cy="261" r="2.5" fill="none" stroke="var(--pi-ink-80)" stroke-width="1"/>
  <circle cx="159" cy="261" r="1.1" fill="var(--pi-ink)"/>
  <line x1="79" y1="294" x2="171" y2="294" stroke="var(--pi-ink)" stroke-width=".5" opacity=".3" stroke-dasharray="2 5"/>
  <line x1="59" y1="307" x2="191" y2="307" stroke="var(--pi-ink)" stroke-width=".6" opacity=".35"/>
  <text x="59" y="321" font-family="var(--pi-sans)" font-weight="300" font-size="11" fill="var(--pi-ink)">Transformer 诞生</text>

  <!-- 节点 2 · 迷你甘特微场景（下排交错卡，对照样张 b4 的 360/560 交错） -->
  <text x="300" y="144" font-family="var(--pi-mono)" font-size="9.5" letter-spacing="2" text-anchor="middle" fill="var(--pi-ink)">2022.11</text>
  <circle cx="300" cy="170" r="6" fill="var(--pi-paper)" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
  <circle cx="300" cy="170" r="2.2" fill="var(--pi-ink)"/>
  <line x1="300" y1="177" x2="300" y2="320" stroke="var(--pi-ink)" stroke-width=".7" opacity=".55"/>
  <circle cx="300" cy="248" r="2.4" fill="var(--pi-ink)" opacity=".55"/>
  <rect x="225" y="320" width="150" height="120" fill="var(--pi-paper-panel)" stroke="var(--pi-ink-80)" stroke-width="1.3"/>
  <rect x="230" y="325" width="140" height="110" fill="none" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
  <text x="234" y="335" font-family="var(--pi-mono)" font-size="8" letter-spacing="2" fill="var(--pi-ink-45)">V4 — CHATGPT</text>
  <line x1="258" y1="396" x2="342" y2="396" stroke="var(--pi-ink)" stroke-width=".8" opacity=".6"/>
  <line x1="258" y1="396" x2="258" y2="398.5" stroke="var(--pi-ink)" stroke-width=".6" opacity=".5"/>
  <line x1="272" y1="396" x2="272" y2="398.5" stroke="var(--pi-ink)" stroke-width=".6" opacity=".5"/>
  <line x1="286" y1="396" x2="286" y2="398.5" stroke="var(--pi-ink)" stroke-width=".6" opacity=".5"/>
  <line x1="300" y1="396" x2="300" y2="398.5" stroke="var(--pi-ink)" stroke-width=".6" opacity=".5"/>
  <line x1="314" y1="396" x2="314" y2="398.5" stroke="var(--pi-ink)" stroke-width=".6" opacity=".5"/>
  <line x1="328" y1="396" x2="328" y2="398.5" stroke="var(--pi-ink)" stroke-width=".6" opacity=".5"/>
  <line x1="342" y1="396" x2="342" y2="398.5" stroke="var(--pi-ink)" stroke-width=".6" opacity=".5"/>
  <rect x="258" y="358" width="39" height="8" fill="url(#pi-hatch-tl)" stroke="var(--pi-ink-80)" stroke-width="1.1"/>
  <rect x="280" y="372" width="44" height="8" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.1"/>
  <rect x="308" y="385" width="31" height="8" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.1"/>
  <line x1="234" y1="417" x2="366" y2="417" stroke="var(--pi-ink)" stroke-width=".6" opacity=".35"/>
  <text x="234" y="431" font-family="var(--pi-sans)" font-weight="300" font-size="11" fill="var(--pi-ink)">ChatGPT 破圈</text>

  <!-- 节点 3 · 预测渐虚线微场景（上排卡） -->
  <text x="475" y="144" font-family="var(--pi-mono)" font-size="9.5" letter-spacing="2" text-anchor="middle" fill="var(--pi-ink)">2023.03</text>
  <circle cx="475" cy="170" r="6" fill="var(--pi-paper)" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
  <circle cx="475" cy="170" r="2.2" fill="var(--pi-ink)"/>
  <line x1="475" y1="177" x2="475" y2="210" stroke="var(--pi-ink)" stroke-width=".7" opacity=".55"/>
  <circle cx="475" cy="194" r="2.4" fill="var(--pi-ink)" opacity=".55"/>
  <rect x="400" y="210" width="150" height="120" fill="var(--pi-paper-panel)" stroke="var(--pi-ink-80)" stroke-width="1.3"/>
  <rect x="405" y="215" width="140" height="110" fill="none" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
  <text x="409" y="225" font-family="var(--pi-mono)" font-size="8" letter-spacing="2" fill="var(--pi-ink-45)">V5 — GPT-4</text>
  <line x1="435" y1="226" x2="435" y2="306" stroke="var(--pi-ink)" stroke-width=".5" opacity=".28"/>
  <line x1="455" y1="226" x2="455" y2="306" stroke="var(--pi-ink)" stroke-width=".5" opacity=".28"/>
  <line x1="475" y1="226" x2="475" y2="306" stroke="var(--pi-ink)" stroke-width=".5" opacity=".28"/>
  <line x1="495" y1="226" x2="495" y2="306" stroke="var(--pi-ink)" stroke-width=".5" opacity=".28"/>
  <line x1="515" y1="226" x2="515" y2="306" stroke="var(--pi-ink)" stroke-width=".5" opacity=".28"/>
  <line x1="435" y1="226" x2="515" y2="226" stroke="var(--pi-ink)" stroke-width=".5" opacity=".28"/>
  <line x1="435" y1="246" x2="515" y2="246" stroke="var(--pi-ink)" stroke-width=".5" opacity=".28"/>
  <line x1="435" y1="266" x2="515" y2="266" stroke="var(--pi-ink)" stroke-width=".5" opacity=".28"/>
  <line x1="435" y1="286" x2="515" y2="286" stroke="var(--pi-ink)" stroke-width=".5" opacity=".28"/>
  <line x1="435" y1="306" x2="515" y2="306" stroke="var(--pi-ink)" stroke-width=".5" opacity=".28"/>
  <path d="M 435 279 L 455 271 L 473 274 L 486 260" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.3"/>
  <path d="M 486 260 L 500 255 L 514 247" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".5" stroke-dasharray="3 5"/>
  <circle cx="486" cy="260" r="2" fill="none" stroke="var(--pi-ink-80)" stroke-width="1"/>
  <circle cx="514" cy="247" r="1.5" fill="var(--pi-ink)" opacity=".6"/>
  <line x1="409" y1="307" x2="541" y2="307" stroke="var(--pi-ink)" stroke-width=".6" opacity=".35"/>
  <text x="409" y="321" font-family="var(--pi-sans)" font-weight="300" font-size="11" fill="var(--pi-ink)">GPT-4 多模态</text>
</svg>
</div>`
  },
  {
    name: 'winding-road',
    group: 'flow-temporal',
    groupLabel: '流程与时序',
    description: 'Winding S-road timeline with walked and future segments.',
    label: '蜿蜒道路时间轴',
    num: 73,
    variant: null,
    paperInkNative: true,
    frame: { width: 920, height: 460, fit: 'fixed' },
    /* 出自样张 layout-b6.html */
    snippet: `<div class="pi-card">
<svg class="pi-art" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
  <!-- 路带双轮廓：走过段实线 / 未来段渐虚（离线采样烘焙） -->
  <path d="M 66.8 470.2 L 86.5 467.9 L 105.0 465.3 L 122.4 462.4 L 138.8 459.2 L 154.2 455.7 L 168.7 451.9 L 182.5 447.8 L 195.5 443.5 L 207.8 438.9 L 219.6 434.1 L 230.9 429.0 L 241.8 423.7 L 252.4 418.1 L 262.7 412.3 L 272.9 406.2 L 283.0 399.9 L 293.0 393.3 L 303.1 386.5 L 313.3 379.5 L 323.7 372.2 L 333.2 365.3 L 341.9 358.6 L 349.8 352.1 L 356.8 345.7 L 363.0 339.5 L 368.5 333.5 L 373.1 327.8 L 377.0 322.3 L 380.1 317.0 L 382.6 312.0 L 384.5 307.3 L 385.8 302.7 L 386.6 298.3 L 386.9 293.9 L 386.8 289.5 L 386.1 284.8 L 385.0 279.9 L 383.2 274.7 L 380.8 269.2 L 377.7 263.4 L 372.3 252.6 L 368.6 241.3 L 366.8 229.6 L 367.0 217.9 L 369.0 206.5 L 372.8 195.6 L 378.1 185.5 L 384.6 176.0" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.3"/>
  <path d="M 73.2 529.8 L 94.3 527.2 L 114.4 524.2 L 133.4 520.8 L 151.4 517.0 L 168.6 512.9 L 184.9 508.4 L 200.5 503.6 L 215.3 498.4 L 229.4 493.0 L 242.9 487.2 L 255.9 481.1 L 268.3 474.8 L 280.3 468.3 L 291.8 461.5 L 303.1 454.6 L 314.0 447.5 L 324.7 440.2 L 335.3 432.8 L 345.8 425.4 L 356.3 417.8 L 367.0 409.7 L 377.1 401.7 L 386.5 393.5 L 395.2 385.4 L 403.2 377.1 L 410.5 368.6 L 417.1 360.1 L 423.0 351.3 L 428.1 342.2 L 432.4 333.0 L 435.8 323.5 L 438.2 313.7 L 439.7 303.9 L 440.1 293.9 L 439.5 284.0 L 437.9 274.1 L 435.3 264.5 L 431.8 255.0 L 427.4 245.7 L 422.3 236.6 L 420.0 232.4 L 418.7 228.8 L 418.1 225.6 L 418.0 222.4 L 418.5 219.1 L 419.6 215.4 L 421.6 211.2 L 424.7 206.5" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.3"/>
  <path d="M 384.6 176.0 L 386.4 173.8 L 388.3 171.5 L 390.2 169.3 L 392.2 167.2 L 394.2 165.1 L 396.4 163.0 L 398.5 160.9 L 400.8 158.9 L 403.1 156.9 L 405.4 155.0 L 407.8 153.0 L 410.3 151.1 L 412.8 149.2 L 415.4 147.4 L 418.0 145.6 L 420.7 143.7 L 423.5 142.0 L 426.2 140.2 L 429.1 138.5 L 432.0 136.7 L 434.9 135.0 L 438.0 133.4 L 441.0 131.7 L 444.1 130.1 L 447.3 128.5 L 450.5 126.9 L 453.8 125.3 L 457.1 123.8 L 460.5 122.2 L 463.9 120.7 L 467.3 119.2 L 470.9 117.8 L 474.4 116.3 L 478.0 114.9 L 481.7 113.4 L 485.4 112.1 L 489.2 110.7 L 493.0 109.3 L 496.9 108.0 L 500.8 106.7 L 504.7 105.4 L 508.7 104.1 L 512.8 102.8 L 516.9 101.6 L 521.0 100.4 L 525.2 99.2 L 529.4 98.0 L 533.7 96.8" fill="none" stroke="var(--pi-ink)" stroke-width="1" opacity=".55" stroke-dasharray="7 6"/>
  <path d="M 424.7 206.5 L 425.6 205.3 L 426.6 204.0 L 427.7 202.8 L 428.9 201.5 L 430.1 200.1 L 431.4 198.8 L 432.8 197.4 L 434.2 196.1 L 435.7 194.7 L 437.3 193.3 L 439.0 191.9 L 440.7 190.5 L 442.6 189.1 L 444.4 187.7 L 446.4 186.3 L 448.4 184.9 L 450.5 183.5 L 452.7 182.1 L 454.9 180.7 L 457.2 179.2 L 459.5 177.8 L 462.0 176.4 L 464.5 175.0 L 467.0 173.6 L 469.7 172.2 L 472.3 170.9 L 475.1 169.5 L 477.9 168.1 L 480.8 166.8 L 483.7 165.4 L 486.7 164.1 L 489.8 162.7 L 492.9 161.4 L 496.1 160.1 L 499.3 158.8 L 502.6 157.5 L 505.9 156.2 L 509.3 155.0 L 512.8 153.7 L 516.3 152.5 L 519.9 151.3 L 523.5 150.1 L 527.2 148.9 L 530.9 147.7 L 534.7 146.5 L 538.5 145.4 L 542.4 144.3 L 546.3 143.2" fill="none" stroke="var(--pi-ink)" stroke-width="1" opacity=".55" stroke-dasharray="7 6"/>
  <!-- 中央分道线：走过段强调线 / 未来段疏虚 -->
  <path d="M 70.0 500.0 L 90.4 497.6 L 109.7 494.8 L 127.9 491.6 L 145.1 488.1 L 161.4 484.3 L 176.8 480.2 L 191.5 475.7 L 205.4 471.0 L 218.6 465.9 L 231.3 460.6 L 243.4 455.1 L 255.0 449.2 L 266.3 443.2 L 277.3 436.9 L 288.0 430.4 L 298.5 423.7 L 308.9 416.8 L 319.2 409.7 L 329.6 402.4 L 340.0 395.0 L 350.1 387.5 L 359.5 380.1 L 368.1 372.8 L 376.0 365.5 L 383.1 358.3 L 389.5 351.1 L 395.1 343.9 L 400.0 336.8 L 404.1 329.6 L 407.5 322.5 L 410.1 315.4 L 412.0 308.2 L 413.1 301.1 L 413.5 293.9 L 413.1 286.7 L 412.0 279.5 L 410.1 272.2 L 407.5 264.9 L 404.1 257.5 L 400.0 250.0 L 396.2 242.5 L 393.7 235.0 L 392.4 227.6 L 392.5 220.2 L 393.8 212.8 L 396.2 205.5 L 399.9 198.4 L 404.6 191.3" fill="none" stroke="var(--pi-ink)" stroke-width="2.2"/>
  <path d="M 404.6 191.3 L 406.0 189.5 L 407.4 187.8 L 409.0 186.0 L 410.5 184.3 L 412.2 182.6 L 413.9 180.9 L 415.7 179.2 L 417.5 177.5 L 419.4 175.8 L 421.4 174.1 L 423.4 172.5 L 425.5 170.8 L 427.7 169.2 L 429.9 167.6 L 432.2 165.9 L 434.6 164.3 L 437.0 162.7 L 439.5 161.1 L 442.0 159.6 L 444.6 158.0 L 447.2 156.4 L 450.0 154.9 L 452.7 153.4 L 455.6 151.9 L 458.5 150.4 L 461.4 148.9 L 464.4 147.4 L 467.5 145.9 L 470.6 144.5 L 473.8 143.1 L 477.0 141.6 L 480.3 140.2 L 483.7 138.9 L 487.1 137.5 L 490.5 136.1 L 494.0 134.8 L 497.6 133.5 L 501.2 132.1 L 504.8 130.9 L 508.5 129.6 L 512.3 128.3 L 516.1 127.1 L 520.0 125.9 L 523.9 124.6 L 527.8 123.5 L 531.8 122.3 L 535.9 121.1 L 540.0 120.0" fill="none" stroke="var(--pi-ink)" stroke-width="1" opacity=".4" stroke-dasharray="3 9"/>

  <!-- 起讫套准十字 -->
  <line x1="60" y1="500" x2="80" y2="500" stroke="var(--pi-ink)" stroke-width=".8" opacity=".4"/>
  <line x1="70" y1="490" x2="70" y2="510" stroke="var(--pi-ink)" stroke-width=".8" opacity=".4"/>
  <line x1="530" y1="120" x2="550" y2="120" stroke="var(--pi-ink)" stroke-width=".8" opacity=".4"/>
  <line x1="540" y1="110" x2="540" y2="130" stroke="var(--pi-ink)" stroke-width=".8" opacity=".4"/>

  <!-- 节点 1 · 2017（注记下挂） -->
  <circle cx="194.3" cy="474.8" r="7" fill="var(--pi-paper)" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
  <circle cx="194.3" cy="474.8" r="4" fill="none" stroke="var(--pi-ink)" stroke-width=".6" opacity=".5"/>
  <circle cx="194.3" cy="474.8" r="2" fill="var(--pi-ink)"/>
  <line x1="194.3" y1="485.8" x2="194.3" y2="518.8" stroke="var(--pi-ink)" stroke-width=".7" opacity=".45" stroke-dasharray="3 5"/>
  <circle cx="194.3" cy="502.3" r="2.4" fill="var(--pi-ink)" opacity=".6"/>
  <text x="194.3" y="530.8" font-family="var(--pi-mono)" font-size="8" letter-spacing="2" text-anchor="middle" fill="var(--pi-ink-45)">TRANSFORMER</text>
  <text x="186.3" y="552.8" font-family="var(--pi-mono)" font-size="11" letter-spacing="2" text-anchor="end" fill="var(--pi-ink)">2017</text>
  <text x="202.3" y="552.8" font-family="var(--pi-sans)" font-weight="300" font-size="11" text-anchor="start" fill="var(--pi-ink)">Transformer</text>
  <text x="194.3" y="572.8" font-family="var(--pi-sans)" font-weight="300" font-size="10" text-anchor="middle" fill="var(--pi-ink-70)">自注意架构，并行训练成为可能</text>

  <!-- 节点 2 · 2018（注记上挂） -->
  <circle cx="366.5" cy="374.3" r="7" fill="var(--pi-paper)" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
  <circle cx="366.5" cy="374.3" r="4" fill="none" stroke="var(--pi-ink)" stroke-width=".6" opacity=".5"/>
  <circle cx="366.5" cy="374.3" r="2" fill="var(--pi-ink)"/>
  <line x1="366.5" y1="363.3" x2="300" y2="320.3" stroke="var(--pi-ink)" stroke-width=".7" opacity=".45" stroke-dasharray="3 5"/>
  <circle cx="333.3" cy="341.8" r="2.4" fill="var(--pi-ink)" opacity=".6"/>
  <text x="300" y="266.3" font-family="var(--pi-mono)" font-size="8" letter-spacing="2" text-anchor="middle" fill="var(--pi-ink-45)">PRETRAIN ERA</text>
  <text x="292" y="290.3" font-family="var(--pi-mono)" font-size="11" letter-spacing="2" text-anchor="end" fill="var(--pi-ink)">2018</text>
  <text x="308" y="290.3" font-family="var(--pi-sans)" font-weight="300" font-size="11" text-anchor="start" fill="var(--pi-ink)">预训练时代</text>
  <text x="300" y="312.3" font-family="var(--pi-sans)" font-weight="300" font-size="10" text-anchor="middle" fill="var(--pi-ink-70)">BERT / GPT 双线登场</text>

  <!-- 节点 3 · 2022（注记下挂） -->
  <circle cx="409.7" cy="270.7" r="7" fill="var(--pi-paper)" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
  <circle cx="409.7" cy="270.7" r="4" fill="none" stroke="var(--pi-ink)" stroke-width=".6" opacity=".5"/>
  <circle cx="409.7" cy="270.7" r="2" fill="var(--pi-ink)"/>
  <line x1="409.7" y1="281.7" x2="470" y2="336.7" stroke="var(--pi-ink)" stroke-width=".7" opacity=".45" stroke-dasharray="3 5"/>
  <circle cx="439.9" cy="309.2" r="2.4" fill="var(--pi-ink)" opacity=".6"/>
  <text x="470" y="350.7" font-family="var(--pi-mono)" font-size="8" letter-spacing="2" text-anchor="middle" fill="var(--pi-ink-45)">RLHF</text>
  <text x="462" y="374.7" font-family="var(--pi-mono)" font-size="11" letter-spacing="2" text-anchor="end" fill="var(--pi-ink)">2022</text>
  <text x="478" y="374.7" font-family="var(--pi-sans)" font-weight="300" font-size="11" text-anchor="start" fill="var(--pi-ink)">RLHF 对齐</text>
  <text x="470" y="396.7" font-family="var(--pi-sans)" font-weight="300" font-size="10" text-anchor="middle" fill="var(--pi-ink-70)">人类反馈强化学习，对齐可用</text>

  <!-- 节点 4 · 2026（未来，注记下挂） -->
  <circle cx="455.6" cy="151.9" r="7" fill="var(--pi-paper)" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
  <circle cx="455.6" cy="151.9" r="4" fill="none" stroke="var(--pi-ink)" stroke-width=".6" opacity=".5"/>
  <circle cx="455.6" cy="151.9" r="2" fill="var(--pi-ink)"/>
  <line x1="455.6" y1="162.9" x2="490" y2="217.9" stroke="var(--pi-ink)" stroke-width=".7" opacity=".45" stroke-dasharray="3 5"/>
  <circle cx="472.8" cy="190.4" r="2.4" fill="var(--pi-ink)" opacity=".6"/>
  <text x="490" y="231.9" font-family="var(--pi-mono)" font-size="8" letter-spacing="2" text-anchor="middle" fill="var(--pi-ink-45)">FUTURE · UNKNOWN</text>
  <text x="482" y="255.9" font-family="var(--pi-mono)" font-size="11" letter-spacing="2" text-anchor="end" fill="var(--pi-ink)">2026</text>
  <text x="498" y="255.9" font-family="var(--pi-sans)" font-weight="300" font-size="11" text-anchor="start" fill="var(--pi-ink)">? 未来</text>
  <text x="490" y="277.9" font-family="var(--pi-sans)" font-weight="300" font-size="10" text-anchor="middle" fill="var(--pi-ink-70)">下一形态未定，路还在延伸</text>

  <!-- 图例 -->
  <line x1="436" y1="524" x2="472" y2="524" stroke="var(--pi-ink-80)" stroke-width="1.3"/>
  <text x="480" y="527" font-family="var(--pi-mono)" font-size="8" letter-spacing="1" fill="var(--pi-ink-60)">PAST · 已行驶</text>
  <line x1="436" y1="546" x2="472" y2="546" stroke="var(--pi-ink)" stroke-width="1" opacity=".55" stroke-dasharray="7 6"/>
  <text x="480" y="549" font-family="var(--pi-mono)" font-size="8" letter-spacing="1" fill="var(--pi-ink-60)">FUTURE · 未至</text>
</svg>
</div>`
  },
{
    name: 'contact-card',
    group: 'evidence-media',
    groupLabel: '证据与媒体',
    description: 'Double-framed contact card with channel rows and QR matrix.',
    label: '联络名片卡',
    num: 74,
    variant: null,
    paperInkNative: true,
    frame: { width: 580, height: 720, fit: 'fixed' },
    /* 出自样张 layout-d6.html */
    snippet: `<div class="pi-card">
<svg class="pi-art" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
  <!-- 双线框大卡 -->
  <rect x="90" y="40" width="420" height="520" fill="var(--pi-paper-panel)" stroke="var(--pi-ink-80)" stroke-width="1.3"/>
  <rect x="95" y="45" width="410" height="510" fill="none" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
  <!-- 卡头 -->
  <text x="124" y="92" font-family="var(--pi-mono)" font-size="12" letter-spacing="3" fill="var(--pi-ink-45)">WISE — CONTACT</text>
  <line x1="124" y1="112" x2="234" y2="112" stroke="var(--pi-ink)" stroke-width=".8" opacity=".5"/>
  <!-- 姓名 + handle -->
  <text x="124" y="172" font-family="var(--pi-sans)" font-weight="300" font-size="26" fill="var(--pi-ink)">歪斯 Wise</text>
  <text x="126" y="206" font-family="var(--pi-mono)" font-size="12" letter-spacing="2" fill="var(--pi-ink-60)">@歪斯WISE</text>
  <line x1="124" y1="238" x2="476" y2="238" stroke="var(--pi-ink)" stroke-width=".8" opacity=".4"/>
  <!-- 渠道行 -->
  <text x="124" y="288" font-family="var(--pi-mono)" font-size="10" letter-spacing="3" fill="var(--pi-ink-45)">小红书</text>
  <text x="208" y="288" font-family="var(--pi-mono)" font-size="12.5" letter-spacing="1" fill="var(--pi-ink)">@歪斯Wise</text>
  <line x1="124" y1="306" x2="476" y2="306" stroke="var(--pi-ink)" stroke-width=".6" opacity=".18"/>
  <text x="124" y="340" font-family="var(--pi-mono)" font-size="10" letter-spacing="3" fill="var(--pi-ink-45)">微信搜一搜</text>
  <text x="208" y="340" font-family="var(--pi-mono)" font-size="12.5" letter-spacing="1" fill="var(--pi-ink)">歪斯Wise</text>
  <line x1="124" y1="358" x2="476" y2="358" stroke="var(--pi-ink)" stroke-width=".6" opacity=".18"/>
  <text x="124" y="392" font-family="var(--pi-mono)" font-size="10" letter-spacing="3" fill="var(--pi-ink-45)">WEB</text>
  <text x="208" y="392" font-family="var(--pi-mono)" font-size="12.5" letter-spacing="1" fill="var(--pi-ink)">wisewong.com</text>
  <line x1="124" y1="410" x2="476" y2="410" stroke="var(--pi-ink)" stroke-width=".6" opacity=".18"/>
  <text x="124" y="444" font-family="var(--pi-mono)" font-size="10" letter-spacing="3" fill="var(--pi-ink-45)">ADDR</text>
  <text x="208" y="444" font-family="var(--pi-mono)" font-size="12.5" letter-spacing="1" fill="var(--pi-ink)">SHENZHEN</text>
  <!-- QR 位图矩阵（37×37 预计算，按行合并连续深色格烘焙为单 path）
       对齐样张 d6：QR 整体缩 .844 置于卡右下，右缘=渠道分隔线右端 x476，
       顶部对齐 ADDR 行、底部对齐页脚小注基线，不压渠道行分隔线 -->
  <g data-qr-payload="http://weixin.qq.com/r/mp/sDgNFUrEMRdOrQ52922i" transform="translate(74.2 132.6) scale(.844)">
    <rect x="341" y="350" width="135" height="135" fill="none" stroke="var(--pi-ink)" stroke-width=".7" opacity=".7"/>
    <path d="M353 362h21v3h-21zM377 362h3v3h-3zM386 362h3v3h-3zM392 362h3v3h-3zM401 362h15v3h-15zM443 362h21v3h-21zM353 365h3v3h-3zM371 365h3v3h-3zM380 365h6v3h-6zM392 365h6v3h-6zM401 365h6v3h-6zM410 365h3v3h-3zM416 365h3v3h-3zM422 365h6v3h-6zM431 365h6v3h-6zM443 365h3v3h-3zM461 365h3v3h-3zM353 368h3v3h-3zM359 368h9v3h-9zM371 368h3v3h-3zM383 368h3v3h-3zM389 368h3v3h-3zM395 368h3v3h-3zM404 368h6v3h-6zM416 368h9v3h-9zM443 368h3v3h-3zM449 368h9v3h-9zM461 368h3v3h-3zM353 371h3v3h-3zM359 371h9v3h-9zM371 371h3v3h-3zM380 371h3v3h-3zM389 371h6v3h-6zM401 371h3v3h-3zM410 371h6v3h-6zM419 371h6v3h-6zM431 371h9v3h-9zM443 371h3v3h-3zM449 371h9v3h-9zM461 371h3v3h-3zM353 374h3v3h-3zM359 374h9v3h-9zM371 374h3v3h-3zM377 374h3v3h-3zM383 374h3v3h-3zM392 374h3v3h-3zM398 374h9v3h-9zM413 374h6v3h-6zM422 374h9v3h-9zM437 374h3v3h-3zM443 374h3v3h-3zM449 374h9v3h-9zM461 374h3v3h-3zM353 377h3v3h-3zM371 377h3v3h-3zM377 377h3v3h-3zM389 377h12v3h-12zM407 377h9v3h-9zM428 377h12v3h-12zM443 377h3v3h-3zM461 377h3v3h-3zM353 380h21v3h-21zM377 380h3v3h-3zM383 380h3v3h-3zM389 380h3v3h-3zM395 380h3v3h-3zM401 380h3v3h-3zM407 380h3v3h-3zM413 380h3v3h-3zM419 380h3v3h-3zM425 380h3v3h-3zM431 380h3v3h-3zM437 380h3v3h-3zM443 380h21v3h-21zM380 383h12v3h-12zM398 383h12v3h-12zM413 383h9v3h-9zM428 383h3v3h-3zM437 383h3v3h-3zM356 386h21v3h-21zM380 386h6v3h-6zM392 386h3v3h-3zM401 386h3v3h-3zM413 386h9v3h-9zM431 386h3v3h-3zM437 386h3v3h-3zM446 386h6v3h-6zM461 386h3v3h-3zM353 389h6v3h-6zM368 389h3v3h-3zM374 389h3v3h-3zM380 389h9v3h-9zM392 389h6v3h-6zM404 389h3v3h-3zM410 389h9v3h-9zM422 389h3v3h-3zM434 389h3v3h-3zM443 389h15v3h-15zM461 389h3v3h-3zM356 392h3v3h-3zM365 392h3v3h-3zM371 392h3v3h-3zM386 392h3v3h-3zM392 392h3v3h-3zM404 392h6v3h-6zM428 392h12v3h-12zM443 392h3v3h-3zM449 392h3v3h-3zM458 392h6v3h-6zM353 395h3v3h-3zM359 395h3v3h-3zM365 395h6v3h-6zM374 395h6v3h-6zM389 395h3v3h-3zM395 395h3v3h-3zM401 395h9v3h-9zM416 395h3v3h-3zM422 395h3v3h-3zM431 395h6v3h-6zM443 395h12v3h-12zM353 398h6v3h-6zM362 398h3v3h-3zM371 398h6v3h-6zM380 398h6v3h-6zM389 398h9v3h-9zM404 398h6v3h-6zM422 398h15v3h-15zM443 398h3v3h-3zM452 398h3v3h-3zM458 398h3v3h-3zM356 401h6v3h-6zM365 401h6v3h-6zM374 401h3v3h-3zM383 401h12v3h-12zM401 401h12v3h-12zM416 401h9v3h-9zM428 401h3v3h-3zM437 401h6v3h-6zM446 401h3v3h-3zM452 401h9v3h-9zM362 404h12v3h-12zM377 404h3v3h-3zM386 404h9v3h-9zM398 404h6v3h-6zM407 404h6v3h-6zM416 404h3v3h-3zM425 404h12v3h-12zM440 404h3v3h-3zM449 404h6v3h-6zM458 404h6v3h-6zM353 407h3v3h-3zM368 407h3v3h-3zM377 407h3v3h-3zM383 407h9v3h-9zM404 407h3v3h-3zM410 407h12v3h-12zM425 407h3v3h-3zM431 407h3v3h-3zM440 407h3v3h-3zM458 407h6v3h-6zM353 410h3v3h-3zM368 410h30v3h-30zM401 410h3v3h-3zM410 410h3v3h-3zM416 410h3v3h-3zM422 410h3v3h-3zM428 410h18v3h-18zM449 410h3v3h-3zM455 410h3v3h-3zM461 410h3v3h-3zM362 413h3v3h-3zM368 413h3v3h-3zM374 413h3v3h-3zM380 413h3v3h-3zM386 413h3v3h-3zM392 413h3v3h-3zM398 413h3v3h-3zM404 413h3v3h-3zM410 413h6v3h-6zM419 413h3v3h-3zM425 413h6v3h-6zM437 413h3v3h-3zM446 413h3v3h-3zM452 413h3v3h-3zM371 416h6v3h-6zM380 416h6v3h-6zM389 416h3v3h-3zM398 416h3v3h-3zM407 416h3v3h-3zM419 416h3v3h-3zM428 416h24v3h-24zM458 416h6v3h-6zM359 419h9v3h-9zM374 419h3v3h-3zM383 419h3v3h-3zM395 419h3v3h-3zM404 419h3v3h-3zM413 419h6v3h-6zM425 419h3v3h-3zM431 419h3v3h-3zM437 419h9v3h-9zM452 419h3v3h-3zM353 422h3v3h-3zM362 422h6v3h-6zM371 422h3v3h-3zM377 422h3v3h-3zM383 422h3v3h-3zM392 422h3v3h-3zM401 422h6v3h-6zM413 422h3v3h-3zM428 422h6v3h-6zM440 422h21v3h-21zM359 425h6v3h-6zM377 425h3v3h-3zM383 425h9v3h-9zM395 425h3v3h-3zM401 425h18v3h-18zM422 425h6v3h-6zM431 425h3v3h-3zM443 425h6v3h-6zM353 428h6v3h-6zM362 428h6v3h-6zM371 428h6v3h-6zM380 428h3v3h-3zM389 428h3v3h-3zM395 428h9v3h-9zM410 428h12v3h-12zM434 428h6v3h-6zM443 428h3v3h-3zM452 428h12v3h-12zM359 431h3v3h-3zM368 431h3v3h-3zM392 431h3v3h-3zM401 431h3v3h-3zM413 431h6v3h-6zM425 431h3v3h-3zM431 431h3v3h-3zM437 431h12v3h-12zM362 434h12v3h-12zM383 434h6v3h-6zM395 434h6v3h-6zM404 434h9v3h-9zM419 434h3v3h-3zM425 434h3v3h-3zM443 434h6v3h-6zM461 434h3v3h-3zM353 437h3v3h-3zM365 437h3v3h-3zM374 437h3v3h-3zM386 437h3v3h-3zM395 437h3v3h-3zM401 437h6v3h-6zM422 437h6v3h-6zM431 437h15v3h-15zM455 437h3v3h-3zM461 437h3v3h-3zM353 440h3v3h-3zM359 440h15v3h-15zM377 440h6v3h-6zM386 440h3v3h-3zM392 440h9v3h-9zM404 440h3v3h-3zM410 440h3v3h-3zM416 440h3v3h-3zM425 440h3v3h-3zM431 440h3v3h-3zM446 440h3v3h-3zM452 440h12v3h-12zM353 443h3v3h-3zM362 443h3v3h-3zM368 443h3v3h-3zM374 443h9v3h-9zM386 443h9v3h-9zM398 443h3v3h-3zM404 443h6v3h-6zM413 443h9v3h-9zM425 443h3v3h-3zM431 443h3v3h-3zM437 443h3v3h-3zM455 443h6v3h-6zM353 446h6v3h-6zM365 446h3v3h-3zM371 446h6v3h-6zM380 446h3v3h-3zM386 446h3v3h-3zM404 446h3v3h-3zM410 446h3v3h-3zM428 446h6v3h-6zM437 446h18v3h-18zM458 446h6v3h-6zM377 449h3v3h-3zM383 449h3v3h-3zM389 449h6v3h-6zM404 449h3v3h-3zM419 449h6v3h-6zM428 449h3v3h-3zM437 449h3v3h-3zM449 449h3v3h-3zM458 449h3v3h-3zM353 452h21v3h-21zM377 452h12v3h-12zM401 452h3v3h-3zM419 452h3v3h-3zM431 452h9v3h-9zM443 452h3v3h-3zM449 452h6v3h-6zM458 452h6v3h-6zM353 455h3v3h-3zM371 455h3v3h-3zM377 455h6v3h-6zM386 455h3v3h-3zM395 455h15v3h-15zM425 455h3v3h-3zM431 455h3v3h-3zM437 455h3v3h-3zM449 455h3v3h-3zM353 458h3v3h-3zM359 458h9v3h-9zM371 458h3v3h-3zM377 458h6v3h-6zM386 458h3v3h-3zM392 458h9v3h-9zM404 458h6v3h-6zM413 458h39v3h-39zM455 458h6v3h-6zM353 461h3v3h-3zM359 461h9v3h-9zM371 461h3v3h-3zM377 461h12v3h-12zM401 461h3v3h-3zM407 461h3v3h-3zM416 461h3v3h-3zM431 461h3v3h-3zM443 461h9v3h-9zM455 461h3v3h-3zM353 464h3v3h-3zM359 464h9v3h-9zM371 464h3v3h-3zM377 464h3v3h-3zM383 464h3v3h-3zM395 464h9v3h-9zM413 464h3v3h-3zM422 464h9v3h-9zM437 464h3v3h-3zM446 464h3v3h-3zM452 464h6v3h-6zM461 464h3v3h-3zM353 467h3v3h-3zM371 467h3v3h-3zM377 467h3v3h-3zM392 467h3v3h-3zM401 467h3v3h-3zM416 467h3v3h-3zM422 467h3v3h-3zM434 467h9v3h-9zM446 467h3v3h-3zM461 467h3v3h-3zM353 470h21v3h-21zM380 470h6v3h-6zM389 470h3v3h-3zM395 470h3v3h-3zM401 470h3v3h-3zM407 470h3v3h-3zM413 470h3v3h-3zM422 470h3v3h-3zM431 470h6v3h-6zM440 470h9v3h-9zM452 470h12v3h-12z" fill="var(--pi-ink-80)"/>
  </g>
  <!-- 卡内左下小注 -->
  <text x="124" y="512" font-family="var(--pi-sans)" font-weight="300" font-size="12.5" fill="var(--pi-ink-70)">扫码或微信搜一搜“歪斯Wise”</text>
  <text x="124" y="542" font-family="var(--pi-mono)" font-size="9" letter-spacing="2.5" fill="var(--pi-ink-45)">WECHAT SEARCH · 歪斯WISE</text>
</svg>
</div>`
  },
  {
    name: 'district-map',
    group: 'relation-mapping',
    groupLabel: '关系与映射',
    description: 'Schematic district map with road hierarchy, river trace and locator pin.',
    label: '街区示意地图',
    num: 75,
    variant: null,
    paperInkNative: true,
    frame: { width: 890, height: 470, fit: 'fixed' },
    /* 出自样张 layout-d6.html */
    snippet: `<div class="pi-card">
<svg class="pi-art" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
  <!-- 虚线外框 + 四角套准十字 -->
  <rect x="30" y="30" width="540" height="540" fill="none" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3" stroke-dasharray="2 6"/>
  <g stroke="var(--pi-ink)" stroke-width=".7" opacity=".35">
    <line x1="22" y1="30" x2="38" y2="30"/><line x1="30" y1="22" x2="30" y2="38"/>
    <line x1="562" y1="30" x2="578" y2="30"/><line x1="570" y1="22" x2="570" y2="38"/>
    <line x1="22" y1="570" x2="38" y2="570"/><line x1="30" y1="562" x2="30" y2="578"/>
    <line x1="562" y1="570" x2="578" y2="570"/><line x1="570" y1="562" x2="570" y2="578"/>
  </g>
  <!-- 河：贝塞尔双细线 + 旋转注 -->
  <path d="M 384 30 C 436 118, 396 226, 470 310 C 522 372, 534 470, 512 570" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".5"/>
  <path d="M 404 30 C 456 118, 416 226, 490 310 C 542 372, 554 470, 532 570" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".5"/>
  <text x="492" y="240" font-family="var(--pi-mono)" font-size="9" letter-spacing="2" fill="var(--pi-ink-45)" transform="rotate(74 492 240)">ABSTRACT TRACE</text>
  <!-- 横向路网（主干道 1.2 / 次道 .7） -->
  <path d="M 30 150 C 210 138, 400 162, 570 148" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
  <path d="M 30 300 C 240 292, 420 308, 570 298" fill="none" stroke="var(--pi-ink)" stroke-width=".7" opacity=".6"/>
  <path d="M 30 462 C 230 472, 430 456, 570 466" fill="none" stroke="var(--pi-ink)" stroke-width=".7" opacity=".6"/>
  <!-- 纵向路网 -->
  <path d="M 220 30 C 214 190, 226 390, 218 570" fill="none" stroke="var(--pi-ink)" stroke-width=".7" opacity=".6"/>
  <path d="M 420 30 C 426 180, 414 400, 422 570" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
  <!-- 街区名注 -->
  <text x="58" y="132" font-family="var(--pi-mono)" font-size="9" letter-spacing="2" fill="var(--pi-ink-45)">CONTACT GRID</text>
  <text x="436" y="96" font-family="var(--pi-mono)" font-size="9" letter-spacing="2" fill="var(--pi-ink-45)" transform="rotate(88 436 96)">LINK PATH</text>
  <!-- 园区块：双线框 -->
  <rect x="270" y="232" width="110" height="68" fill="var(--pi-paper-panel)" stroke="var(--pi-ink)" stroke-width=".9" opacity=".85"/>
  <rect x="275" y="237" width="100" height="58" fill="none" stroke="var(--pi-ink)" stroke-width=".5" opacity=".3"/>
  <text x="325" y="264" font-family="var(--pi-mono)" font-size="10" letter-spacing="3" text-anchor="middle" fill="var(--pi-ink)" opacity=".7">WISE</text>
  <text x="325" y="282" font-family="var(--pi-mono)" font-size="10" letter-spacing="3" text-anchor="middle" fill="var(--pi-ink)" opacity=".7">CONTACT</text>
  <!-- 定位钉：双圈 + L 形引线 -->
  <circle cx="420" cy="300" r="8" fill="none" stroke="var(--pi-ink)" stroke-width="1.2"/>
  <circle cx="420" cy="300" r="12" fill="none" stroke="var(--pi-ink)" stroke-width=".6" opacity=".4"/>
  <circle cx="420" cy="300" r="2.5" fill="var(--pi-ink)"/>
  <path d="M 420 312 L 420 344 L 452 344" fill="none" stroke="var(--pi-ink)" stroke-width=".8" opacity=".5"/>
  <text x="460" y="349" font-family="var(--pi-mono)" font-size="10" letter-spacing="2" fill="var(--pi-ink)" opacity=".75">WISE · SHENZHEN</text>
  <!-- 比例尺 -->
  <line x1="58" y1="536" x2="138" y2="536" stroke="var(--pi-ink)" stroke-width="1" opacity=".6"/>
  <line x1="58" y1="530" x2="58" y2="542" stroke="var(--pi-ink)" stroke-width="1" opacity=".6"/>
  <line x1="138" y1="530" x2="138" y2="542" stroke="var(--pi-ink)" stroke-width="1" opacity=".6"/>
  <text x="150" y="540" font-family="var(--pi-mono)" font-size="9" letter-spacing="2" fill="var(--pi-ink-45)">NOT TO SCALE</text>
</svg>
</div>`
  },
  {
    name: 'why-how-bands',
    group: 'comparison',
    groupLabel: '对比与对照',
    description: 'Paired WHY/HOW bands mapping causes to countermeasures column by column.',
    label: '因果对位双带',
    num: 76,
    variant: null,
    paperInkNative: true,
    frame: { width: 920, height: 460, fit: 'fixed' },
    /* 出自样张 layout-e3.html */
    snippet: `<div class="pi-card">
<svg class="pi-art" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="hatch23" width="8" height="8" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="0" y2="8" stroke="var(--pi-ink)" stroke-width=".7" opacity=".35"/>
    </pattern>
  </defs>
  <!-- 三列对位构造虚线 -->
  <line x1="140" y1="64" x2="140" y2="544" stroke="var(--pi-ink)" stroke-width=".5" opacity=".16" stroke-dasharray="2 6"/>
  <line x1="300" y1="64" x2="300" y2="544" stroke="var(--pi-ink)" stroke-width=".5" opacity=".16" stroke-dasharray="2 6"/>
  <line x1="460" y1="64" x2="460" y2="544" stroke="var(--pi-ink)" stroke-width=".5" opacity=".16" stroke-dasharray="2 6"/>
  <!-- 带题 -->
  <text x="26" y="182" font-family="var(--pi-mono)" font-size="12" letter-spacing="4" fill="var(--pi-ink)">WHY</text>
  <text x="26" y="204" font-family="var(--pi-sans)" font-weight="300" font-size="10" fill="var(--pi-ink-45)">动因</text>
  <text x="26" y="422" font-family="var(--pi-mono)" font-size="12" letter-spacing="4" fill="var(--pi-ink)">HOW</text>
  <text x="26" y="444" font-family="var(--pi-sans)" font-weight="300" font-size="10" fill="var(--pi-ink-45)">对策</text>

  <!-- 因 1 · 限流窄门 -->
  <text x="140" y="92" font-family="var(--pi-mono)" font-size="8.5" letter-spacing="2" text-anchor="middle" fill="var(--pi-ink-45)">01 · RATE-LIMIT</text>
  <rect x="114" y="152" width="9" height="56" fill="url(#hatch23)" stroke="var(--pi-ink-80)" stroke-width="1"/>
  <rect x="157" y="152" width="9" height="56" fill="url(#hatch23)" stroke="var(--pi-ink-80)" stroke-width="1"/>
  <rect x="74" y="160" width="15" height="15" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.1"/>
  <rect x="90" y="182" width="12" height="12" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.1"/>
  <rect x="132" y="172" width="14" height="14" fill="var(--pi-paper-panel)" stroke="var(--pi-ink)" stroke-width="1.3"/>
  <line x1="62" y1="208" x2="106" y2="208" stroke="var(--pi-ink)" stroke-width=".6" opacity=".4" stroke-dasharray="2 4"/>
  <text x="140" y="256" font-family="var(--pi-sans)" font-weight="300" font-size="13.5" text-anchor="middle" fill="var(--pi-ink)">限流中断</text>

  <!-- 因 2 · 死循环往返箭头 -->
  <text x="300" y="92" font-family="var(--pi-mono)" font-size="8.5" letter-spacing="2" text-anchor="middle" fill="var(--pi-ink-45)">02 · LOOP STUCK</text>
  <circle cx="242" cy="194" r="5" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.1"/>
  <circle cx="242" cy="194" r="2" fill="var(--pi-ink)"/>
  <path d="M 248 190 L 348 162" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
  <path d="M 348 162 L 332 152" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
  <path d="M 348 162 L 334 170" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
  <path d="M 346 174 L 254 208" fill="none" stroke="var(--pi-ink)" stroke-width=".8" opacity=".5" stroke-dasharray="4 5"/>
  <path d="M 254 208 L 270 202" fill="none" stroke="var(--pi-ink)" stroke-width=".8" opacity=".5"/>
  <path d="M 254 208 L 266 194" fill="none" stroke="var(--pi-ink)" stroke-width=".8" opacity=".5"/>
  <text x="304" y="228" font-family="var(--pi-sans)" font-weight="300" font-size="9.5" fill="var(--pi-ink-45)">原地打转</text>
  <text x="300" y="256" font-family="var(--pi-sans)" font-weight="300" font-size="13.5" text-anchor="middle" fill="var(--pi-ink)">思考死循环</text>

  <!-- 因 3 · 吊牌打叉 -->
  <text x="460" y="92" font-family="var(--pi-mono)" font-size="8.5" letter-spacing="2" text-anchor="middle" fill="var(--pi-ink-45)">03 · CTX OVERFLOW</text>
  <path d="M 418 156 L 478 156 L 502 180 L 478 204 L 418 204 Z" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
  <circle cx="482" cy="180" r="3.5" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".7"/>
  <path d="M 432 167 L 458 193" fill="none" stroke="var(--pi-ink)" stroke-width="1.6"/>
  <path d="M 458 167 L 432 193" fill="none" stroke="var(--pi-ink)" stroke-width="1.6"/>
  <line x1="428" y1="146" x2="476" y2="146" stroke="var(--pi-ink)" stroke-width=".6" opacity=".35" stroke-dasharray="2 4"/>
  <text x="460" y="256" font-family="var(--pi-sans)" font-weight="300" font-size="13.5" text-anchor="middle" fill="var(--pi-ink)">上下文窗口乱</text>

  <!-- 对位竖向开放箭头（因 → 策） -->
  <g stroke="var(--pi-ink-80)" stroke-width="1.3">
    <line x1="140" y1="282" x2="140" y2="342"/><line x1="140" y1="342" x2="132" y2="326"/><line x1="140" y1="342" x2="148" y2="326"/>
    <line x1="300" y1="282" x2="300" y2="342"/><line x1="300" y1="342" x2="292" y2="326"/><line x1="300" y1="342" x2="308" y2="326"/>
    <line x1="460" y1="282" x2="460" y2="342"/><line x1="460" y1="342" x2="452" y2="326"/><line x1="460" y1="342" x2="468" y2="326"/>
  </g>
  <circle cx="140" cy="282" r="2.2" fill="var(--pi-ink)" opacity=".6"/>
  <circle cx="300" cy="282" r="2.2" fill="var(--pi-ink)" opacity=".6"/>
  <circle cx="460" cy="282" r="2.2" fill="var(--pi-ink)" opacity=".6"/>

  <!-- 策 1 · 齿轮 -->
  <text x="140" y="368" font-family="var(--pi-mono)" font-size="8.5" letter-spacing="2" text-anchor="middle" fill="var(--pi-ink-45)">RETRY</text>
  <g stroke="var(--pi-ink-80)" stroke-width="1.2">
    <line x1="176" y1="430" x2="184" y2="430"/><line x1="165.5" y1="455.5" x2="171.1" y2="461.1"/>
    <line x1="140" y1="466" x2="140" y2="474"/><line x1="114.5" y1="455.5" x2="108.9" y2="461.1"/>
    <line x1="104" y1="430" x2="96" y2="430"/><line x1="114.5" y1="404.5" x2="108.9" y2="398.9"/>
    <line x1="140" y1="394" x2="140" y2="386"/><line x1="165.5" y1="404.5" x2="171.1" y2="398.9"/>
  </g>
  <circle cx="140" cy="430" r="32" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.3"/>
  <circle cx="140" cy="430" r="19" fill="none" stroke="var(--pi-ink)" stroke-width=".6" opacity=".4"/>
  <circle cx="140" cy="430" r="2.6" fill="var(--pi-ink)"/>
  <text x="140" y="512" font-family="var(--pi-sans)" font-weight="300" font-size="13.5" text-anchor="middle" fill="var(--pi-ink)">重试退避 + 熔断</text>

  <!-- 策 2 · 错峰甘特条 -->
  <text x="300" y="368" font-family="var(--pi-mono)" font-size="8.5" letter-spacing="2" text-anchor="middle" fill="var(--pi-ink-45)">STEP CAP</text>
  <line x1="244" y1="464" x2="356" y2="464" stroke="var(--pi-ink)" stroke-width=".8" opacity=".6"/>
  <g stroke="var(--pi-ink)" stroke-width=".6" opacity=".5">
    <line x1="244" y1="464" x2="244" y2="469"/><line x1="272" y1="464" x2="272" y2="469"/>
    <line x1="300" y1="464" x2="300" y2="469"/><line x1="328" y1="464" x2="328" y2="469"/>
    <line x1="356" y1="464" x2="356" y2="469"/>
  </g>
  <rect x="244" y="400" width="48" height="12" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.1"/>
  <rect x="274" y="424" width="58" height="12" fill="url(#hatch23)" stroke="var(--pi-ink-80)" stroke-width="1.1"/>
  <rect x="316" y="446" width="40" height="12" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.1"/>
  <text x="300" y="512" font-family="var(--pi-sans)" font-weight="300" font-size="13.5" text-anchor="middle" fill="var(--pi-ink)">步骤上限 + 早停</text>

  <!-- 策 3 · 双落点连线 -->
  <text x="460" y="368" font-family="var(--pi-mono)" font-size="8.5" letter-spacing="2" text-anchor="middle" fill="var(--pi-ink-45)">TRACE</text>
  <circle cx="412" cy="430" r="10" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
  <circle cx="412" cy="430" r="5" fill="none" stroke="var(--pi-ink)" stroke-width=".6" opacity=".4"/>
  <circle cx="412" cy="430" r="2.2" fill="var(--pi-ink)"/>
  <circle cx="508" cy="430" r="10" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
  <circle cx="508" cy="430" r="5" fill="none" stroke="var(--pi-ink)" stroke-width=".6" opacity=".4"/>
  <circle cx="508" cy="430" r="2.2" fill="var(--pi-ink)"/>
  <line x1="424" y1="430" x2="496" y2="430" stroke="var(--pi-ink-80)" stroke-width="1.3"/>
  <circle cx="460" cy="430" r="2.2" fill="var(--pi-ink)" opacity=".7"/>
  <path d="M 416 414 A 46 22 0 0 1 504 414" fill="none" stroke="var(--pi-ink)" stroke-width=".7" opacity=".45" stroke-dasharray="3 5"/>
  <text x="460" y="400" font-family="var(--pi-sans)" font-weight="300" font-size="9.5" text-anchor="middle" fill="var(--pi-ink-45)">全链路</text>
  <text x="460" y="512" font-family="var(--pi-sans)" font-weight="300" font-size="13.5" text-anchor="middle" fill="var(--pi-ink)">全链 Trace + 日志</text>
</svg>
</div>`
  },
  {
    name: 'before-after-bands',
    group: 'comparison',
    groupLabel: '对比与对照',
    description: 'Before/after evolution panel: scattered documents vs retrieval pipeline.',
    label: '前后双带演进面板',
    num: 77,
    variant: null,
    paperInkNative: true,
    frame: { width: 930, height: 450, fit: 'fixed' },
    /* 出自样张 layout-e6.html */
    snippet: `<div class="pi-card">
<svg class="pi-art" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(0 20)">
  <!-- 带一 · BEFORE -->
  <rect x="30" y="40" width="540" height="230" fill="var(--pi-paper-panel)" stroke="var(--pi-ink-80)" stroke-width="1"/>
  <rect x="35" y="45" width="530" height="220" fill="none" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
  <circle cx="66" cy="84" r="13" fill="var(--pi-paper)" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
  <path d="M 61 79 L 71 89 M 71 79 L 61 89" stroke="var(--pi-ink)" stroke-width="2.2" stroke-linecap="round"/>
  <text x="92" y="90" font-family="var(--pi-sans)" font-weight="300" font-size="15" fill="var(--pi-ink)">Before：文档只是文档</text>
  <text x="556" y="88" font-family="var(--pi-mono)" font-size="9" letter-spacing="3" text-anchor="end" fill="var(--pi-ink-45)">SCATTERED</text>
  <!-- 散件文档卡 · 横线 -->
  <rect x="64" y="112" width="96" height="118" fill="var(--pi-paper)" stroke="var(--pi-ink-80)" stroke-width="1.1"/>
  <g stroke="var(--pi-ink)" stroke-width=".8" opacity=".5">
    <line x1="80" y1="126" x2="144" y2="126"/><line x1="80" y1="138" x2="144" y2="138"/>
    <line x1="80" y1="150" x2="144" y2="150"/><line x1="80" y1="162" x2="144" y2="162"/>
    <line x1="80" y1="174" x2="144" y2="174"/>
  </g>
  <text x="112" y="216" font-family="var(--pi-sans)" font-weight="300" font-size="9.5" text-anchor="middle" fill="var(--pi-ink-70)">PDF 手册</text>
  <!-- 散件文档卡 · 折角 -->
  <rect x="178" y="112" width="96" height="118" fill="var(--pi-paper)" stroke="var(--pi-ink-80)" stroke-width="1.1"/>
  <path d="M 194 126 h 48 l 16 16 v 42 h -64 z" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".7"/>
  <g stroke="var(--pi-ink)" stroke-width=".7" opacity=".45">
    <line x1="200" y1="146" x2="252" y2="146"/><line x1="200" y1="156" x2="252" y2="156"/>
    <line x1="200" y1="166" x2="252" y2="166"/><line x1="200" y1="176" x2="252" y2="176"/>
  </g>
  <text x="226" y="216" font-family="var(--pi-sans)" font-weight="300" font-size="9.5" text-anchor="middle" fill="var(--pi-ink-70)">工单导出</text>
  <!-- 散件文档卡 · 网格 -->
  <rect x="292" y="112" width="96" height="118" fill="var(--pi-paper)" stroke="var(--pi-ink-80)" stroke-width="1.1"/>
  <rect x="308" y="126" width="64" height="58" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".7"/>
  <line x1="308" y1="142" x2="372" y2="142" stroke="var(--pi-ink)" stroke-width=".8" opacity=".6"/>
  <line x1="329" y1="126" x2="329" y2="184" stroke="var(--pi-ink)" stroke-width=".7" opacity=".5"/>
  <line x1="351" y1="126" x2="351" y2="184" stroke="var(--pi-ink)" stroke-width=".7" opacity=".5"/>
  <line x1="308" y1="158" x2="372" y2="158" stroke="var(--pi-ink)" stroke-width=".7" opacity=".5"/>
  <line x1="308" y1="170" x2="372" y2="170" stroke="var(--pi-ink)" stroke-width=".7" opacity=".5"/>
  <text x="340" y="216" font-family="var(--pi-sans)" font-weight="300" font-size="9.5" text-anchor="middle" fill="var(--pi-ink-70)">Wiki 页</text>
  <!-- 虚线分隔 + 注记列 -->
  <line x1="412" y1="64" x2="412" y2="246" stroke="var(--pi-ink)" stroke-width=".6" opacity=".35" stroke-dasharray="3 5"/>
  <rect x="430" y="131" width="5" height="5" fill="var(--pi-ink)" opacity=".55"/>
  <text x="446" y="140" font-family="var(--pi-sans)" font-weight="300" font-size="9.5" fill="var(--pi-ink-70)">散在 Wiki 与群聊</text>
  <rect x="430" y="175" width="5" height="5" fill="var(--pi-ink)" opacity=".55"/>
  <text x="446" y="184" font-family="var(--pi-sans)" font-weight="300" font-size="9.5" fill="var(--pi-ink-70)">格式杂乱难解析</text>
  <rect x="430" y="219" width="5" height="5" fill="var(--pi-ink)" opacity=".55"/>
  <text x="446" y="228" font-family="var(--pi-sans)" font-weight="300" font-size="9.5" fill="var(--pi-ink-70)">进不了召回链路</text>

  <!-- 带二 · AFTER -->
  <rect x="30" y="300" width="540" height="230" fill="var(--pi-paper-panel)" stroke="var(--pi-ink-80)" stroke-width="1"/>
  <rect x="35" y="305" width="530" height="220" fill="none" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
  <circle cx="66" cy="344" r="13" fill="var(--pi-paper)" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
  <path d="M 60 344 L 64.5 349.5 L 72 338.5" fill="none" stroke="var(--pi-ink)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="92" y="350" font-family="var(--pi-sans)" font-weight="300" font-size="15" fill="var(--pi-ink)">After：文档进入召回链路</text>
  <text x="556" y="348" font-family="var(--pi-mono)" font-size="9" letter-spacing="3" text-anchor="end" fill="var(--pi-ink-45)">PIPELINED</text>
  <!-- 虚线双 chevron 串联 -->
  <g fill="none" stroke="var(--pi-ink)" stroke-width=".8" opacity=".5" stroke-dasharray="3 3">
    <path d="M 124 390 L 130 396 L 124 402"/><path d="M 130 390 L 136 396 L 130 402"/>
    <path d="M 214 390 L 220 396 L 214 402"/><path d="M 220 390 L 226 396 L 220 402"/>
    <path d="M 304 390 L 310 396 L 304 402"/><path d="M 310 390 L 316 396 L 310 402"/>
  </g>
  <!-- 工序 1 · 漏斗 -->
  <g stroke="var(--pi-ink)" stroke-width="1" opacity=".6">
    <line x1="68" y1="380" x2="84" y2="392"/><line x1="84" y1="376" x2="84" y2="392"/><line x1="100" y1="380" x2="84" y2="392"/>
  </g>
  <path d="M 74 392 L 94 392 L 88 404 L 80 404 Z" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
  <line x1="87" y1="404" x2="87" y2="412" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
  <!-- 工序 2 · 解析括号 -->
  <rect x="165" y="382" width="18" height="26" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
  <g stroke="var(--pi-ink)" stroke-width=".8" opacity=".55">
    <line x1="169" y1="390" x2="179" y2="390"/><line x1="169" y1="396" x2="179" y2="396"/><line x1="169" y1="402" x2="179" y2="402"/>
  </g>
  <path d="M 160 386 L 157 386 L 157 406 L 160 406" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".6"/>
  <path d="M 188 386 L 191 386 L 191 406 L 188 406" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".6"/>
  <!-- 工序 3 · 放大镜 -->
  <rect x="250" y="382" width="20" height="26" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.1"/>
  <g stroke="var(--pi-ink)" stroke-width=".7" opacity=".5">
    <line x1="254" y1="389" x2="266" y2="389"/><line x1="254" y1="395" x2="266" y2="395"/><line x1="254" y1="401" x2="266" y2="401"/>
  </g>
  <circle cx="272" cy="400" r="8.5" fill="var(--pi-paper)" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
  <line x1="278" y1="406" x2="284" y2="412" stroke="var(--pi-ink-80)" stroke-width="1.4"/>
  <!-- 工序 4 · 扇出 -->
  <circle cx="354" cy="392" r="5" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
  <g stroke="var(--pi-ink)" stroke-width=".9" opacity=".6">
    <line x1="354" y1="397" x2="338" y2="410"/><line x1="354" y1="397" x2="354" y2="414"/><line x1="354" y1="397" x2="370" y2="410"/>
  </g>
  <rect x="333" y="410" width="9" height="7" fill="none" stroke="var(--pi-ink-80)" stroke-width="1"/>
  <rect x="350" y="414" width="9" height="7" fill="none" stroke="var(--pi-ink-80)" stroke-width="1"/>
  <rect x="365" y="410" width="9" height="7" fill="none" stroke="var(--pi-ink-80)" stroke-width="1"/>
  <!-- 工序中文标签 -->
  <text x="84" y="448" font-family="var(--pi-sans)" font-weight="300" font-size="10.5" text-anchor="middle" fill="var(--pi-ink)">统一接入</text>
  <text x="174" y="448" font-family="var(--pi-sans)" font-weight="300" font-size="10.5" text-anchor="middle" fill="var(--pi-ink)">版式解析</text>
  <text x="264" y="448" font-family="var(--pi-sans)" font-weight="300" font-size="10.5" text-anchor="middle" fill="var(--pi-ink)">重排召回</text>
  <text x="354" y="448" font-family="var(--pi-sans)" font-weight="300" font-size="10.5" text-anchor="middle" fill="var(--pi-ink)">Agent 复用</text>
  <!-- 虚线分隔 + 注记列 -->
  <line x1="412" y1="324" x2="412" y2="506" stroke="var(--pi-ink)" stroke-width=".6" opacity=".35" stroke-dasharray="3 5"/>
  <rect x="430" y="389" width="5" height="5" fill="var(--pi-ink)" opacity=".55"/>
  <text x="446" y="398" font-family="var(--pi-sans)" font-weight="300" font-size="9.5" fill="var(--pi-ink-70)">统一进入向量库</text>
  <rect x="430" y="426" width="5" height="5" fill="var(--pi-ink)" opacity=".55"/>
  <text x="446" y="435" font-family="var(--pi-sans)" font-weight="300" font-size="9.5" fill="var(--pi-ink-70)">带来源元数据</text>
  <rect x="430" y="463" width="5" height="5" fill="var(--pi-ink)" opacity=".55"/>
  <text x="446" y="472" font-family="var(--pi-sans)" font-weight="300" font-size="9.5" fill="var(--pi-ink-70)">三路召回</text>
  <rect x="430" y="500" width="5" height="5" fill="var(--pi-ink)" opacity=".55"/>
  <text x="446" y="509" font-family="var(--pi-sans)" font-weight="300" font-size="9.5" fill="var(--pi-ink-70)">回溯段落级出处</text>
  </g>
</svg>
</div>`
  },
  {
    name: 'chat-dialog',
    group: 'evidence-media',
    groupLabel: '证据与媒体',
    description: 'Alternating chat bubbles with speaker avatars inside a specimen panel.',
    label: '对话气泡标本',
    num: 78,
    variant: null,
    paperInkNative: true,
    frame: { width: 780, height: 540, fit: 'fixed' },
    /* 出自样张 layout-a1.html */
    snippet: `<div class="pi-card">
<svg class="pi-art" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
  <!-- 标本面板：对话原件 -->
  <rect x="44" y="52" width="512" height="496" rx="16" fill="var(--pi-paper-panel)" stroke="var(--pi-ink-80)" stroke-width="1"/>
  <rect x="49" y="57" width="502" height="486" rx="12" fill="none" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>

  <!-- 面板栏：三枚窗口点 + 会话编号 -->
  <circle cx="74" cy="88" r="4" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".55"/>
  <circle cx="92" cy="88" r="4" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".55"/>
  <circle cx="110" cy="88" r="4" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".55"/>
  <text x="130" y="92" font-family="var(--pi-mono)" font-size="9" letter-spacing="2.5" fill="var(--pi-ink-45)">AI ASSISTANT · CONVERSATION NO.017</text>
  <line x1="44" y1="112" x2="556" y2="112" stroke="var(--pi-ink)" stroke-width=".8" opacity=".5"/>

  <!-- 轮 1 · 用户（右侧） -->
  <circle cx="512" cy="152" r="15" fill="var(--pi-paper)" stroke="var(--pi-ink-80)" stroke-width="1.1"/>
  <text x="512" y="156" font-family="var(--pi-sans)" font-weight="400" font-size="11" text-anchor="middle" fill="var(--pi-ink)">我</text>
  <rect x="164" y="128" width="322" height="48" rx="12" fill="var(--pi-paper)" stroke="var(--pi-ink-80)" stroke-width="1"/>
  <path d="M 466 176 L 474 188 L 484 176" fill="var(--pi-paper)" stroke="var(--pi-ink-80)" stroke-width="1" stroke-linejoin="round"/>
  <text x="184" y="157" font-family="var(--pi-sans)" font-weight="400" font-size="12" fill="var(--pi-ink)">你要是参加高考，能考多少分呢？</text>

  <!-- 轮 2 · AI（左侧，带估分条目与错处圈注） -->
  <circle cx="88" cy="236" r="15" fill="var(--pi-paper)" stroke="var(--pi-ink-80)" stroke-width="1.1"/>
  <text x="88" y="240" font-family="var(--pi-mono)" font-size="8.5" text-anchor="middle" fill="var(--pi-ink)">AI</text>
  <rect x="116" y="196" width="368" height="104" rx="12" fill="none" stroke="var(--pi-ink-80)" stroke-width="1"/>
  <path d="M 136 300 L 126 312 L 150 300" fill="none" stroke="var(--pi-ink-80)" stroke-width="1" stroke-linejoin="round"/>
  <text x="134" y="224" font-family="var(--pi-sans)" font-weight="300" font-size="11.5" fill="var(--pi-ink)">按新高考 750 分制，最贴近真实阅卷的估分：</text>
  <circle cx="140" cy="245" r="2.2" fill="none" stroke="var(--pi-ink)" stroke-width=".8" opacity=".8"/>
  <text x="152" y="249" font-family="var(--pi-sans)" font-weight="300" font-size="11" fill="var(--pi-ink-70)">语文</text>
  <text x="186" y="250" font-family="var(--pi-mono)" font-size="13" fill="var(--pi-ink)">143</text>
  <text x="222" y="249" font-family="var(--pi-sans)" font-weight="300" font-size="10" fill="var(--pi-ink-45)">分 —— 作文缺个人情感，扣 17 分</text>
  <circle cx="140" cy="273" r="2.2" fill="none" stroke="var(--pi-ink)" stroke-width=".8" opacity=".8"/>
  <text x="152" y="277" font-family="var(--pi-sans)" font-weight="300" font-size="11" fill="var(--pi-ink-70)">数学</text>
  <text x="186" y="278" font-family="var(--pi-mono)" font-size="13" fill="var(--pi-ink)">150</text>
  <text x="222" y="277" font-family="var(--pi-sans)" font-weight="300" font-size="10" fill="var(--pi-ink-45)">分 —— 计算、推理都能满分</text>
  <!-- 错处标本圈注：双椭圆手绘圈 -->
  <ellipse cx="200" cy="245" rx="20" ry="11" fill="none" stroke="var(--pi-ink)" stroke-width="1.1" transform="rotate(-4 200 245)"/>
  <ellipse cx="202" cy="246" rx="22" ry="12" fill="none" stroke="var(--pi-ink)" stroke-width=".7" opacity=".45" transform="rotate(5 202 246)"/>

  <!-- 轮 3 · 用户（右侧） -->
  <circle cx="512" cy="368" r="15" fill="var(--pi-paper)" stroke="var(--pi-ink-80)" stroke-width="1.1"/>
  <text x="512" y="372" font-family="var(--pi-sans)" font-weight="400" font-size="11" text-anchor="middle" fill="var(--pi-ink)">我</text>
  <rect x="316" y="344" width="170" height="48" rx="12" fill="var(--pi-paper)" stroke="var(--pi-ink-80)" stroke-width="1"/>
  <path d="M 466 392 L 474 404 L 484 392" fill="var(--pi-paper)" stroke="var(--pi-ink-80)" stroke-width="1" stroke-linejoin="round"/>
  <text x="336" y="373" font-family="var(--pi-sans)" font-weight="400" font-size="12" fill="var(--pi-ink)">150 − 17 是多少？</text>

  <!-- 轮 4 · AI（左侧） -->
  <circle cx="88" cy="452" r="15" fill="var(--pi-paper)" stroke="var(--pi-ink-80)" stroke-width="1.1"/>
  <text x="88" y="456" font-family="var(--pi-mono)" font-size="8.5" text-anchor="middle" fill="var(--pi-ink)">AI</text>
  <rect x="116" y="424" width="300" height="56" rx="12" fill="none" stroke="var(--pi-ink-80)" stroke-width="1"/>
  <path d="M 136 480 L 126 492 L 150 480" fill="none" stroke="var(--pi-ink-80)" stroke-width="1" stroke-linejoin="round"/>
  <text x="134" y="449" font-family="var(--pi-sans)" font-weight="300" font-size="11.5" fill="var(--pi-ink)">是 <tspan font-family="var(--pi-mono)" font-size="13">133</tspan>，之前估分写错了。</text>
  <text x="134" y="469" font-family="var(--pi-sans)" font-weight="300" font-size="10" fill="var(--pi-ink-45)">解释正确、计算错误的典型幻觉。</text>

  <!-- 页脚 -->
  <line x1="70" y1="524" x2="180" y2="524" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
  <line x1="420" y1="524" x2="530" y2="524" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
  <text x="300" y="528" font-family="var(--pi-mono)" font-size="8" letter-spacing="3" text-anchor="middle" fill="var(--pi-ink-45)">SPECIMEN · 4 TURNS</text>
</svg>
</div>`
  },
  {
    name: 'radial-hub',
    group: 'hierarchy-structure',
    groupLabel: '层级与结构',
    description: 'Central hub with orbiting satellite nodes and elbow leader annotations.',
    label: '放射中心卫星图',
    num: 79,
    variant: null,
    paperInkNative: true,
    frame: { width: 760, height: 550, fit: 'fixed' },
    /* 出自样张 layout-g4.html */
    snippet: `<div class="pi-card">
<svg class="pi-art" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
  <!-- 构造基准：十字虚线（在墨核与水平卫星处断开） -->
  <line x1="180" y1="300" x2="236" y2="300" stroke="var(--pi-ink)" stroke-width=".5" opacity=".16" stroke-dasharray="2 6"/>
  <line x1="364" y1="300" x2="420" y2="300" stroke="var(--pi-ink)" stroke-width=".5" opacity=".16" stroke-dasharray="2 6"/>
  <line x1="300" y1="118" x2="300" y2="236" stroke="var(--pi-ink)" stroke-width=".5" opacity=".16" stroke-dasharray="2 6"/>
  <line x1="300" y1="364" x2="300" y2="482" stroke="var(--pi-ink)" stroke-width=".5" opacity=".16" stroke-dasharray="2 6"/>

  <!-- 轨道虚线圆 -->
  <circle cx="300" cy="300" r="150" fill="none" stroke="var(--pi-ink)" stroke-width=".7" opacity=".4" stroke-dasharray="4 7"/>

  <!-- 中心空心墨核（双圈） -->
  <circle cx="300" cy="300" r="64" fill="none" stroke="var(--pi-ink)" stroke-width=".6" opacity=".45"/>
  <circle cx="300" cy="300" r="57" fill="none" stroke="var(--pi-ink)" stroke-width="1.5"/>
  <text x="300" y="297" font-family="var(--pi-sans)" font-weight="400" font-size="13" letter-spacing="3" text-anchor="middle" fill="var(--pi-ink)">AI 平台中枢</text>
  <text x="300" y="317" font-family="var(--pi-mono)" font-size="8.5" letter-spacing="3" text-anchor="middle" fill="var(--pi-ink-45)">MAAS CORE</text>

  <!-- 六颗卫星：双圈节点 + mono 码 -->
  <g>
    <circle cx="170" cy="225" r="30" fill="var(--pi-paper-deep)" stroke="var(--pi-ink-80)" stroke-width="1.1"/>
    <circle cx="170" cy="225" r="25" fill="none" stroke="var(--pi-ink)" stroke-width=".6" opacity=".35"/>
    <text x="170" y="228" font-family="var(--pi-mono)" font-size="8" letter-spacing="1.5" text-anchor="middle" fill="var(--pi-ink)">SERV</text>
    <circle cx="150" cy="300" r="30" fill="var(--pi-paper-deep)" stroke="var(--pi-ink-80)" stroke-width="1.1"/>
    <circle cx="150" cy="300" r="25" fill="none" stroke="var(--pi-ink)" stroke-width=".6" opacity=".35"/>
    <text x="150" y="303" font-family="var(--pi-mono)" font-size="8" letter-spacing="1.5" text-anchor="middle" fill="var(--pi-ink)">DATA</text>
    <circle cx="170" cy="375" r="30" fill="var(--pi-paper-deep)" stroke="var(--pi-ink-80)" stroke-width="1.1"/>
    <circle cx="170" cy="375" r="25" fill="none" stroke="var(--pi-ink)" stroke-width=".6" opacity=".35"/>
    <text x="170" y="378" font-family="var(--pi-mono)" font-size="8" letter-spacing="1.5" text-anchor="middle" fill="var(--pi-ink)">EVAL</text>
    <circle cx="430" cy="225" r="30" fill="var(--pi-paper-deep)" stroke="var(--pi-ink-80)" stroke-width="1.1"/>
    <circle cx="430" cy="225" r="25" fill="none" stroke="var(--pi-ink)" stroke-width=".6" opacity=".35"/>
    <text x="430" y="228" font-family="var(--pi-mono)" font-size="8" letter-spacing="1.5" text-anchor="middle" fill="var(--pi-ink)">GATE</text>
    <circle cx="450" cy="300" r="30" fill="var(--pi-paper-deep)" stroke="var(--pi-ink-80)" stroke-width="1.1"/>
    <circle cx="450" cy="300" r="25" fill="none" stroke="var(--pi-ink)" stroke-width=".6" opacity=".35"/>
    <text x="450" y="303" font-family="var(--pi-mono)" font-size="8" letter-spacing="1.5" text-anchor="middle" fill="var(--pi-ink)">METER</text>
    <circle cx="430" cy="375" r="30" fill="var(--pi-paper-deep)" stroke="var(--pi-ink-80)" stroke-width="1.1"/>
    <circle cx="430" cy="375" r="25" fill="none" stroke="var(--pi-ink)" stroke-width=".6" opacity=".35"/>
    <text x="430" y="378" font-family="var(--pi-mono)" font-size="8" letter-spacing="1.5" text-anchor="middle" fill="var(--pi-ink)">GOVN</text>
  </g>

  <!-- 肘形引线（虚线 + 端点墨点） -->
  <g fill="none" stroke="var(--pi-ink)" stroke-width=".7" opacity=".45" stroke-dasharray="3 5">
    <path d="M 140 225 L 134 225 L 134 160 L 128 160"/>
    <path d="M 120 300 L 128 300"/>
    <path d="M 140 375 L 134 375 L 134 440 L 128 440"/>
    <path d="M 460 225 L 466 225 L 466 160 L 472 160"/>
    <path d="M 480 300 L 472 300"/>
    <path d="M 460 375 L 466 375 L 466 440 L 472 440"/>
  </g>
  <g fill="var(--pi-ink)" opacity=".6">
    <circle cx="128" cy="160" r="2"/><circle cx="128" cy="300" r="2"/><circle cx="128" cy="440" r="2"/>
    <circle cx="472" cy="160" r="2"/><circle cx="472" cy="300" r="2"/><circle cx="472" cy="440" r="2"/>
  </g>

  <!-- 左列注释块（右对齐，镜像右列） -->
  <g stroke="var(--pi-ink)" stroke-width=".8" opacity=".5">
    <line x1="122" y1="136" x2="122" y2="192"/>
    <line x1="122" y1="276" x2="122" y2="332"/>
    <line x1="122" y1="416" x2="122" y2="472"/>
    <line x1="478" y1="136" x2="478" y2="192"/>
    <line x1="478" y1="276" x2="478" y2="332"/>
    <line x1="478" y1="416" x2="478" y2="472"/>
  </g>
  <g text-anchor="end">
    <text x="114" y="146" font-family="var(--pi-mono)" font-size="7.5" letter-spacing="1.5" fill="var(--pi-ink-45)">MOD 01 · SERV</text>
    <text x="114" y="164" font-family="var(--pi-sans)" font-weight="300" font-size="11.5" fill="var(--pi-ink)">模型服务</text>
    <text x="114" y="182" font-family="var(--pi-sans)" font-weight="300" font-size="9" fill="var(--pi-ink-70)">多模型统一接入与路由</text>
    <text x="114" y="286" font-family="var(--pi-mono)" font-size="7.5" letter-spacing="1.5" fill="var(--pi-ink-45)">MOD 02 · DATA</text>
    <text x="114" y="304" font-family="var(--pi-sans)" font-weight="300" font-size="11.5" fill="var(--pi-ink)">数据管线</text>
    <text x="114" y="322" font-family="var(--pi-sans)" font-weight="300" font-size="9" fill="var(--pi-ink-70)">语料清洗到训练就绪</text>
    <text x="114" y="426" font-family="var(--pi-mono)" font-size="7.5" letter-spacing="1.5" fill="var(--pi-ink-45)">MOD 03 · EVAL</text>
    <text x="114" y="444" font-family="var(--pi-sans)" font-weight="300" font-size="11.5" fill="var(--pi-ink)">评测体系</text>
    <text x="114" y="462" font-family="var(--pi-sans)" font-weight="300" font-size="9" fill="var(--pi-ink-70)">离线基准与线上双轨</text>
  </g>
  <g>
    <text x="486" y="146" font-family="var(--pi-mono)" font-size="7.5" letter-spacing="1.5" fill="var(--pi-ink-45)">MOD 04 · GATE</text>
    <text x="486" y="164" font-family="var(--pi-sans)" font-weight="300" font-size="11.5" fill="var(--pi-ink)">部署网关</text>
    <text x="486" y="182" font-family="var(--pi-sans)" font-weight="300" font-size="9" fill="var(--pi-ink-70)">灰度发布与流量调度</text>
    <text x="486" y="286" font-family="var(--pi-mono)" font-size="7.5" letter-spacing="1.5" fill="var(--pi-ink-45)">MOD 05 · METER</text>
    <text x="486" y="304" font-family="var(--pi-sans)" font-weight="300" font-size="11.5" fill="var(--pi-ink)">监控告警</text>
    <text x="486" y="322" font-family="var(--pi-sans)" font-weight="300" font-size="9" fill="var(--pi-ink-70)">延迟·成本·质量三维</text>
    <text x="486" y="426" font-family="var(--pi-mono)" font-size="7.5" letter-spacing="1.5" fill="var(--pi-ink-45)">MOD 06 · GOVN</text>
    <text x="486" y="444" font-family="var(--pi-sans)" font-weight="300" font-size="11.5" fill="var(--pi-ink)">治理合规</text>
    <text x="486" y="462" font-family="var(--pi-sans)" font-weight="300" font-size="9" fill="var(--pi-ink-70)">内容安全与脱敏审计</text>
  </g>

  <!-- 页脚 -->
  <line x1="140" y1="556" x2="240" y2="556" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
  <line x1="360" y1="556" x2="460" y2="556" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
  <text x="300" y="560" font-family="var(--pi-mono)" font-size="8" letter-spacing="3" text-anchor="middle" fill="var(--pi-ink-45)">PLATFORM HUB · 6 MODULES</text>
</svg>
</div>`
  },
  {
    name: 'merge-confluence',
    group: 'relation-mapping',
    groupLabel: '关系与映射',
    description: 'Two source cards converge through a merge node into one result card.',
    label: '双路汇流图',
    num: 80,
    variant: null,
    paperInkNative: true,
    frame: { width: 910, height: 460, fit: 'fixed' },
    /* 出自样张 layout-n1.html */
    snippet: `<div class="pi-card">
<svg class="pi-art" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="pi-arrow-mc" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10" fill="none" stroke="var(--pi-ink)" stroke-width="1.4"/>
    </marker>
  </defs>

  <!-- 源卡一 · SYSTEM -->
  <text x="40" y="96" font-family="var(--pi-mono)" font-size="8" letter-spacing="2" fill="var(--pi-ink-45)">01</text>
  <line x1="58" y1="92" x2="104" y2="92" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
  <rect x="40" y="106" width="196" height="164" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.3"/>
  <rect x="45" y="111" width="186" height="154" fill="none" stroke="var(--pi-ink)" stroke-width=".6" opacity=".35"/>
  <text x="60" y="132" font-family="var(--pi-mono)" font-size="8" letter-spacing="2.5" fill="var(--pi-ink-45)">SYSTEM</text>
  <text x="60" y="152" font-family="var(--pi-sans)" font-weight="300" font-size="12.5" fill="var(--pi-ink)">系统设定</text>
  <line x1="60" y1="162" x2="216" y2="162" stroke="var(--pi-ink)" stroke-width=".8" opacity=".5"/>
  <line x1="60" y1="166" x2="112" y2="166" stroke="var(--pi-ink)" stroke-width=".6" opacity=".25"/>
  <g font-family="var(--pi-sans)" font-weight="300" font-size="10.5" fill="var(--pi-ink)">
    <circle cx="66" cy="180" r="2.6" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".8"/><circle cx="66" cy="180" r=".9" fill="var(--pi-ink)"/>
    <text x="78" y="184">角色设定</text><text x="216" y="183" font-family="var(--pi-mono)" font-size="7.5" letter-spacing="1.5" text-anchor="end" fill="var(--pi-ink-45)">ROLE</text>
    <circle cx="66" cy="204" r="2.6" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".8"/><circle cx="66" cy="204" r=".9" fill="var(--pi-ink)"/>
    <text x="78" y="208">行为规则</text><text x="216" y="207" font-family="var(--pi-mono)" font-size="7.5" letter-spacing="1.5" text-anchor="end" fill="var(--pi-ink-45)">RULES</text>
    <circle cx="66" cy="228" r="2.6" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".8"/><circle cx="66" cy="228" r=".9" fill="var(--pi-ink)"/>
    <text x="78" y="232">约束边界</text><text x="216" y="231" font-family="var(--pi-mono)" font-size="7.5" letter-spacing="1.5" text-anchor="end" fill="var(--pi-ink-45)">CONSTRAINT</text>
    <circle cx="66" cy="252" r="2.6" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".8"/><circle cx="66" cy="252" r=".9" fill="var(--pi-ink)"/>
    <text x="78" y="256">风格语气</text><text x="216" y="255" font-family="var(--pi-mono)" font-size="7.5" letter-spacing="1.5" text-anchor="end" fill="var(--pi-ink-45)">TONE</text>
  </g>
  <g stroke="var(--pi-ink)" stroke-width=".6" opacity=".22">
    <line x1="60" y1="192" x2="216" y2="192"/><line x1="60" y1="216" x2="216" y2="216"/><line x1="60" y1="240" x2="216" y2="240"/>
  </g>

  <!-- 源卡二 · HISTORY -->
  <text x="40" y="312" font-family="var(--pi-mono)" font-size="8" letter-spacing="2" fill="var(--pi-ink-45)">02</text>
  <line x1="58" y1="308" x2="104" y2="308" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
  <rect x="40" y="322" width="196" height="164" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.3"/>
  <rect x="45" y="327" width="186" height="154" fill="none" stroke="var(--pi-ink)" stroke-width=".6" opacity=".35"/>
  <text x="60" y="348" font-family="var(--pi-mono)" font-size="8" letter-spacing="2.5" fill="var(--pi-ink-45)">HISTORY</text>
  <text x="60" y="368" font-family="var(--pi-sans)" font-weight="300" font-size="12.5" fill="var(--pi-ink)">对话历史</text>
  <line x1="60" y1="378" x2="216" y2="378" stroke="var(--pi-ink)" stroke-width=".8" opacity=".5"/>
  <line x1="60" y1="382" x2="112" y2="382" stroke="var(--pi-ink)" stroke-width=".6" opacity=".25"/>
  <g font-family="var(--pi-sans)" font-weight="300" font-size="10.5" fill="var(--pi-ink)">
    <circle cx="66" cy="396" r="2.6" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".8"/><circle cx="66" cy="396" r=".9" fill="var(--pi-ink)"/>
    <text x="78" y="400">历史轮次</text><text x="216" y="399" font-family="var(--pi-mono)" font-size="7.5" letter-spacing="1.5" text-anchor="end" fill="var(--pi-ink-45)">TURNS</text>
    <circle cx="66" cy="420" r="2.6" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".8"/><circle cx="66" cy="420" r=".9" fill="var(--pi-ink)"/>
    <text x="78" y="424">用户意图</text><text x="216" y="423" font-family="var(--pi-mono)" font-size="7.5" letter-spacing="1.5" text-anchor="end" fill="var(--pi-ink-45)">INTENT</text>
    <circle cx="66" cy="444" r="2.6" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".8"/><circle cx="66" cy="444" r=".9" fill="var(--pi-ink)"/>
    <text x="78" y="448">上下文槽</text><text x="216" y="447" font-family="var(--pi-mono)" font-size="7.5" letter-spacing="1.5" text-anchor="end" fill="var(--pi-ink-45)">CONTEXT</text>
    <circle cx="66" cy="468" r="2.6" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".8"/><circle cx="66" cy="468" r=".9" fill="var(--pi-ink)"/>
    <text x="78" y="472">已确认项</text><text x="216" y="471" font-family="var(--pi-mono)" font-size="7.5" letter-spacing="1.5" text-anchor="end" fill="var(--pi-ink-45)">CONFIRMED</text>
  </g>
  <g stroke="var(--pi-ink)" stroke-width=".6" opacity=".22">
    <line x1="60" y1="408" x2="216" y2="408"/><line x1="60" y1="432" x2="216" y2="432"/><line x1="60" y1="456" x2="216" y2="456"/>
  </g>

  <!-- 两条贝塞尔细流弯入合并点 -->
  <path d="M 242 188 C 286 188, 288 296, 306 296" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.1"/>
  <path d="M 242 404 C 286 404, 288 296, 306 296" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.1"/>
  <text x="272" y="176" font-family="var(--pi-mono)" font-size="7" letter-spacing="1.5" text-anchor="middle" fill="var(--pi-ink-45)">SYSTEM</text>
  <text x="272" y="424" font-family="var(--pi-mono)" font-size="7" letter-spacing="1.5" text-anchor="middle" fill="var(--pi-ink-45)">HISTORY</text>

  <!-- 合并点：竖向构造虚线 + 双圈实心核 -->
  <line x1="320" y1="252" x2="320" y2="340" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3" stroke-dasharray="3 5"/>
  <circle cx="320" cy="296" r="10" fill="var(--pi-paper)" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
  <circle cx="320" cy="296" r="14" fill="none" stroke="var(--pi-ink)" stroke-width=".6" opacity=".35"/>
  <circle cx="320" cy="296" r="2.4" fill="var(--pi-ink)"/>
  <text x="320" y="326" font-family="var(--pi-mono)" font-size="7" letter-spacing="2" text-anchor="middle" fill="var(--pi-ink-45)">MERGE</text>

  <!-- 合并后的粗干线（唯一强调线） -->
  <line x1="334" y1="296" x2="390" y2="296" stroke="var(--pi-ink)" stroke-width="2.4" marker-end="url(#pi-arrow-mc)"/>
  <line x1="334" y1="290" x2="334" y2="302" stroke="var(--pi-ink)" stroke-width=".8" opacity=".5"/>

  <!-- 结果卡 · 组装后提示词 -->
  <rect x="396" y="146" width="164" height="300" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.3"/>
  <rect x="401" y="151" width="154" height="290" fill="none" stroke="var(--pi-ink)" stroke-width=".6" opacity=".35"/>
  <text x="414" y="172" font-family="var(--pi-mono)" font-size="7.5" letter-spacing="2" fill="var(--pi-ink-45)">COMPOSED PROMPT</text>
  <text x="414" y="194" font-family="var(--pi-sans)" font-weight="300" font-size="12.5" fill="var(--pi-ink)">组装后提示词</text>
  <line x1="414" y1="206" x2="542" y2="206" stroke="var(--pi-ink)" stroke-width=".8" opacity=".5"/>
  <line x1="414" y1="210" x2="462" y2="210" stroke="var(--pi-ink)" stroke-width=".6" opacity=".25"/>
  <g font-family="var(--pi-sans)" font-weight="300" font-size="10.5" fill="var(--pi-ink)">
    <circle cx="420" cy="228" r="2.6" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".8"/><circle cx="420" cy="228" r=".9" fill="var(--pi-ink)"/>
    <text x="432" y="232">任务指令</text><text x="542" y="231" font-family="var(--pi-mono)" font-size="7" letter-spacing="1.5" text-anchor="end" fill="var(--pi-ink-45)">INSTRUCT</text>
    <circle cx="420" cy="264" r="2.6" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".8"/><circle cx="420" cy="264" r=".9" fill="var(--pi-ink)"/>
    <text x="432" y="268">上下文片段</text><text x="542" y="267" font-family="var(--pi-mono)" font-size="7" letter-spacing="1.5" text-anchor="end" fill="var(--pi-ink-45)">CONTEXT</text>
    <circle cx="420" cy="300" r="2.6" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".8"/><circle cx="420" cy="300" r=".9" fill="var(--pi-ink)"/>
    <text x="432" y="304">工具定义</text><text x="542" y="303" font-family="var(--pi-mono)" font-size="7" letter-spacing="1.5" text-anchor="end" fill="var(--pi-ink-45)">TOOLS</text>
    <circle cx="420" cy="336" r="2.6" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".8"/><circle cx="420" cy="336" r=".9" fill="var(--pi-ink)"/>
    <text x="432" y="340">示例样本</text><text x="542" y="339" font-family="var(--pi-mono)" font-size="7" letter-spacing="1.5" text-anchor="end" fill="var(--pi-ink-45)">EXAMPLES</text>
    <circle cx="420" cy="372" r="2.6" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".8"/><circle cx="420" cy="372" r=".9" fill="var(--pi-ink)"/>
    <text x="432" y="376">输出格式</text><text x="542" y="375" font-family="var(--pi-mono)" font-size="7" letter-spacing="1.5" text-anchor="end" fill="var(--pi-ink-45)">FORMAT</text>
    <circle cx="420" cy="408" r="2.6" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".8"/><circle cx="420" cy="408" r=".9" fill="var(--pi-ink)"/>
    <text x="432" y="412">安全策略</text><text x="542" y="411" font-family="var(--pi-mono)" font-size="7" letter-spacing="1.5" text-anchor="end" fill="var(--pi-ink-45)">SAFETY</text>
  </g>
  <g stroke="var(--pi-ink)" stroke-width=".6" opacity=".22">
    <line x1="414" y1="246" x2="542" y2="246"/><line x1="414" y1="282" x2="542" y2="282"/>
    <line x1="414" y1="318" x2="542" y2="318"/><line x1="414" y1="354" x2="542" y2="354"/><line x1="414" y1="390" x2="542" y2="390"/>
  </g>

  <!-- 页脚 -->
  <line x1="140" y1="540" x2="240" y2="540" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
  <line x1="360" y1="540" x2="460" y2="540" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
  <text x="300" y="544" font-family="var(--pi-mono)" font-size="8" letter-spacing="3" text-anchor="middle" fill="var(--pi-ink-45)">CONFLUENCE · 2 → 1</text>
</svg>
</div>`
  },
  {
    name: 'watershed-axis',
    group: 'comparison',
    groupLabel: '对比与对照',
    description: 'Vertical watershed axis with paired fields mirrored on both sides.',
    label: '分水岭中轴对照',
    num: 81,
    variant: null,
    paperInkNative: true,
    frame: { width: 850, height: 490, fit: 'fixed' },
    /* 出自样张 layout-e2.html */
    snippet: `<div class="pi-card">
<svg class="pi-art" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
  <!-- 分水岭中轴 x300（刻度齿，中段留 VS 缺口） -->
  <line x1="300" y1="92" x2="300" y2="262" stroke="var(--pi-ink-80)" stroke-width="1.3"/>
  <line x1="300" y1="338" x2="300" y2="520" stroke="var(--pi-ink-80)" stroke-width="1.3"/>
  <g stroke="var(--pi-ink)" stroke-width=".8" opacity=".5">
    <line x1="292" y1="112" x2="308" y2="112"/><line x1="292" y1="136" x2="308" y2="136"/>
    <line x1="292" y1="160" x2="308" y2="160"/><line x1="292" y1="184" x2="308" y2="184"/>
    <line x1="292" y1="208" x2="308" y2="208"/><line x1="292" y1="232" x2="308" y2="232"/>
    <line x1="292" y1="256" x2="308" y2="256"/>
    <line x1="292" y1="352" x2="308" y2="352"/><line x1="292" y1="376" x2="308" y2="376"/>
    <line x1="292" y1="400" x2="308" y2="400"/><line x1="292" y1="424" x2="308" y2="424"/>
    <line x1="292" y1="448" x2="308" y2="448"/><line x1="292" y1="472" x2="308" y2="472"/>
    <line x1="292" y1="496" x2="308" y2="496"/>
  </g>
  <line x1="288" y1="92" x2="312" y2="92" stroke="var(--pi-ink)" stroke-width=".8" opacity=".5"/>
  <line x1="288" y1="520" x2="312" y2="520" stroke="var(--pi-ink)" stroke-width=".8" opacity=".5"/>
  <text x="300" y="300" font-family="var(--pi-mono)" font-size="13" letter-spacing="2" text-anchor="middle" fill="var(--pi-ink)">VS</text>
  <text x="300" y="320" font-family="var(--pi-mono)" font-size="7.5" letter-spacing="1.5" text-anchor="middle" fill="var(--pi-ink-45)">RAG × FINETUNE</text>

  <!-- 左栏 · RAG -->
  <text x="56" y="120" font-family="var(--pi-sans)" font-weight="300" font-size="13" fill="var(--pi-ink)">RAG · 来一条查一条</text>
  <text x="272" y="118" font-family="var(--pi-mono)" font-size="7.5" letter-spacing="1.5" text-anchor="end" fill="var(--pi-ink-45)">MODE: RETRIEVE</text>
  <line x1="56" y1="134" x2="272" y2="134" stroke="var(--pi-ink)" stroke-width=".8" opacity=".5"/>
  <line x1="56" y1="139" x2="116" y2="139" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
  <line x1="272" y1="134" x2="292" y2="134" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3" stroke-dasharray="2 5"/>

  <!-- 右栏 · 微调 -->
  <text x="328" y="120" font-family="var(--pi-sans)" font-weight="300" font-size="13" fill="var(--pi-ink)">微调 · 攒一批训一次</text>
  <text x="544" y="118" font-family="var(--pi-mono)" font-size="7.5" letter-spacing="1.5" text-anchor="end" fill="var(--pi-ink-45)">MODE: FINETUNE</text>
  <line x1="328" y1="134" x2="544" y2="134" stroke="var(--pi-ink)" stroke-width=".8" opacity=".5"/>
  <line x1="328" y1="139" x2="388" y2="139" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
  <line x1="308" y1="134" x2="328" y2="134" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3" stroke-dasharray="2 5"/>

  <!-- 四对跨轴对齐字段 -->
  <g>
    <!-- 对 1 · 触发时机 TRIGGER -->
    <circle cx="56" cy="180" r="2.4" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".8"/>
    <text x="68" y="184" font-family="var(--pi-sans)" font-weight="300" font-size="11" fill="var(--pi-ink)">触发时机</text>
    <text x="68" y="200" font-family="var(--pi-mono)" font-size="7.5" letter-spacing="1.5" fill="var(--pi-ink-45)">TRIGGER</text>
    <line x1="150" y1="166" x2="150" y2="214" stroke="var(--pi-ink)" stroke-width=".6" opacity=".2" stroke-dasharray="2 5"/>
    <text x="162" y="182" font-family="var(--pi-sans)" font-weight="300" font-size="9.5" fill="var(--pi-ink-70)">每条提问实时检索</text>
    <text x="162" y="200" font-family="var(--pi-sans)" font-weight="300" font-size="9.5" fill="var(--pi-ink-70)">命中即拼进上下文</text>
    <circle cx="328" cy="180" r="2.4" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".8"/>
    <text x="340" y="184" font-family="var(--pi-sans)" font-weight="300" font-size="11" fill="var(--pi-ink)">触发时机</text>
    <text x="340" y="200" font-family="var(--pi-mono)" font-size="7.5" letter-spacing="1.5" fill="var(--pi-ink-45)">TRIGGER</text>
    <line x1="422" y1="166" x2="422" y2="214" stroke="var(--pi-ink)" stroke-width=".6" opacity=".2" stroke-dasharray="2 5"/>
    <text x="434" y="182" font-family="var(--pi-sans)" font-weight="300" font-size="9.5" fill="var(--pi-ink-70)">攒一批语料统一训练</text>
    <text x="434" y="200" font-family="var(--pi-sans)" font-weight="300" font-size="9.5" fill="var(--pi-ink-70)">训完才更新权重</text>
    <line x1="56" y1="230" x2="272" y2="230" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
    <line x1="328" y1="230" x2="544" y2="230" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>

    <!-- 对 2 · 更新成本 UPDATE -->
    <circle cx="56" cy="272" r="2.4" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".8"/>
    <text x="68" y="276" font-family="var(--pi-sans)" font-weight="300" font-size="11" fill="var(--pi-ink)">更新成本</text>
    <text x="68" y="292" font-family="var(--pi-mono)" font-size="7.5" letter-spacing="1.5" fill="var(--pi-ink-45)">UPDATE</text>
    <line x1="150" y1="258" x2="150" y2="306" stroke="var(--pi-ink)" stroke-width=".6" opacity=".2" stroke-dasharray="2 5"/>
    <text x="162" y="274" font-family="var(--pi-sans)" font-weight="300" font-size="9.5" fill="var(--pi-ink-70)">知识改了即生效</text>
    <text x="162" y="292" font-family="var(--pi-sans)" font-weight="300" font-size="9.5" fill="var(--pi-ink-70)">零额外算力</text>
    <circle cx="328" cy="272" r="2.4" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".8"/>
    <text x="340" y="276" font-family="var(--pi-sans)" font-weight="300" font-size="11" fill="var(--pi-ink)">更新成本</text>
    <text x="340" y="292" font-family="var(--pi-mono)" font-size="7.5" letter-spacing="1.5" fill="var(--pi-ink-45)">UPDATE</text>
    <line x1="422" y1="258" x2="422" y2="306" stroke="var(--pi-ink)" stroke-width=".6" opacity=".2" stroke-dasharray="2 5"/>
    <text x="434" y="274" font-family="var(--pi-sans)" font-weight="300" font-size="9.5" fill="var(--pi-ink-70)">改知识要重训</text>
    <text x="434" y="292" font-family="var(--pi-sans)" font-weight="300" font-size="9.5" fill="var(--pi-ink-70)">算力时间成本高</text>
    <line x1="56" y1="322" x2="272" y2="322" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
    <line x1="328" y1="322" x2="544" y2="322" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>

    <!-- 对 3 · 知识时效 FRESH -->
    <circle cx="56" cy="364" r="2.4" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".8"/>
    <text x="68" y="368" font-family="var(--pi-sans)" font-weight="300" font-size="11" fill="var(--pi-ink)">知识时效</text>
    <text x="68" y="384" font-family="var(--pi-mono)" font-size="7.5" letter-spacing="1.5" fill="var(--pi-ink-45)">FRESH</text>
    <line x1="150" y1="350" x2="150" y2="398" stroke="var(--pi-ink)" stroke-width=".6" opacity=".2" stroke-dasharray="2 5"/>
    <text x="162" y="366" font-family="var(--pi-sans)" font-weight="300" font-size="9.5" fill="var(--pi-ink-70)">知识库随时增删</text>
    <text x="162" y="384" font-family="var(--pi-sans)" font-weight="300" font-size="9.5" fill="var(--pi-ink-70)">永远是最新版本</text>
    <circle cx="328" cy="364" r="2.4" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".8"/>
    <text x="340" y="368" font-family="var(--pi-sans)" font-weight="300" font-size="11" fill="var(--pi-ink)">知识时效</text>
    <text x="340" y="384" font-family="var(--pi-mono)" font-size="7.5" letter-spacing="1.5" fill="var(--pi-ink-45)">FRESH</text>
    <line x1="422" y1="350" x2="422" y2="398" stroke="var(--pi-ink)" stroke-width=".6" opacity=".2" stroke-dasharray="2 5"/>
    <text x="434" y="366" font-family="var(--pi-sans)" font-weight="300" font-size="9.5" fill="var(--pi-ink-70)">知识固化进权重</text>
    <text x="434" y="384" font-family="var(--pi-sans)" font-weight="300" font-size="9.5" fill="var(--pi-ink-70)">更新滞后数日</text>
    <line x1="56" y1="414" x2="272" y2="414" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
    <line x1="328" y1="414" x2="544" y2="414" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>

    <!-- 对 4 · 适用场景 SCENE -->
    <circle cx="56" cy="456" r="2.4" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".8"/>
    <text x="68" y="460" font-family="var(--pi-sans)" font-weight="300" font-size="11" fill="var(--pi-ink)">适用场景</text>
    <text x="68" y="476" font-family="var(--pi-mono)" font-size="7.5" letter-spacing="1.5" fill="var(--pi-ink-45)">SCENE</text>
    <line x1="150" y1="442" x2="150" y2="490" stroke="var(--pi-ink)" stroke-width=".6" opacity=".2" stroke-dasharray="2 5"/>
    <text x="162" y="458" font-family="var(--pi-sans)" font-weight="300" font-size="9.5" fill="var(--pi-ink-70)">动态知识库</text>
    <text x="162" y="476" font-family="var(--pi-sans)" font-weight="300" font-size="9.5" fill="var(--pi-ink-70)">频繁变动的业务</text>
    <circle cx="328" cy="456" r="2.4" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".8"/>
    <text x="340" y="460" font-family="var(--pi-sans)" font-weight="300" font-size="11" fill="var(--pi-ink)">适用场景</text>
    <text x="340" y="476" font-family="var(--pi-mono)" font-size="7.5" letter-spacing="1.5" fill="var(--pi-ink-45)">SCENE</text>
    <line x1="422" y1="442" x2="422" y2="490" stroke="var(--pi-ink)" stroke-width=".6" opacity=".2" stroke-dasharray="2 5"/>
    <text x="434" y="458" font-family="var(--pi-sans)" font-weight="300" font-size="9.5" fill="var(--pi-ink-70)">任务稳定风格固定</text>
    <text x="434" y="476" font-family="var(--pi-sans)" font-weight="300" font-size="9.5" fill="var(--pi-ink-70)">高频重复场景</text>
  </g>

  <!-- 页脚 -->
  <line x1="140" y1="522" x2="240" y2="522" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
  <line x1="360" y1="522" x2="460" y2="522" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
  <text x="300" y="526" font-family="var(--pi-mono)" font-size="8" letter-spacing="3" text-anchor="middle" fill="var(--pi-ink-45)">WATERSHED · 4 PAIRS</text>
</svg>
</div>`
  },
  {
    name: 'arch-table-band',
    group: 'hierarchy-structure',
    groupLabel: '层级与结构',
    description: 'Layered architecture bands above a spec table band in one composition.',
    label: '架构带表',
    num: 82,
    variant: null,
    paperInkNative: true,
    frame: { width: 800, height: 520, fit: 'fixed' },
    /* 出自样张 layout-h3.html */
    snippet: `<div class="pi-card">
<svg class="pi-art" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
  <!-- 架构骨架：3 层横带，层间 0.6px 贯通，左列层标 -->
  <line x1="40" y1="64" x2="560" y2="64" stroke="var(--pi-ink)" stroke-width=".8" opacity=".45"/>
  <line x1="40" y1="164" x2="560" y2="164" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
  <line x1="40" y1="264" x2="560" y2="264" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
  <line x1="40" y1="364" x2="560" y2="364" stroke="var(--pi-ink)" stroke-width=".8" opacity=".45"/>
  <line x1="150" y1="64" x2="150" y2="364" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>

  <!-- L1 应用层 -->
  <text x="52" y="104" font-family="var(--pi-mono)" font-size="10" letter-spacing="2" fill="var(--pi-ink)">L1</text>
  <text x="52" y="122" font-family="var(--pi-sans)" font-weight="300" font-size="11" fill="var(--pi-ink)">应用层</text>
  <text x="52" y="138" font-family="var(--pi-mono)" font-size="7" letter-spacing="1.5" fill="var(--pi-ink-45)">APPLICATION</text>
  <!-- 图元 · 对话气泡 -->
  <rect x="196" y="102" width="34" height="20" rx="5" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.1"/>
  <path d="M 208 122 L 204 130 L 214 122" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.1" stroke-linejoin="round"/>
  <circle cx="206" cy="112" r="1.6" fill="var(--pi-ink)"/><circle cx="213" cy="112" r="1.6" fill="var(--pi-ink)"/><circle cx="220" cy="112" r="1.6" fill="var(--pi-ink)"/>
  <text x="242" y="110" font-family="var(--pi-mono)" font-size="7.5" letter-spacing="1.5" fill="var(--pi-ink-55)">CHAT</text>
  <text x="242" y="126" font-family="var(--pi-sans)" font-weight="300" font-size="9.5" fill="var(--pi-ink)">对话界面</text>
  <!-- 图元 · 助手面板 -->
  <rect x="330" y="100" width="30" height="26" rx="2" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.1"/>
  <line x1="330" y1="107" x2="360" y2="107" stroke="var(--pi-ink)" stroke-width=".7" opacity=".45"/>
  <rect x="335" y="111" width="9" height="7" fill="none" stroke="var(--pi-ink)" stroke-width=".8" opacity=".7"/>
  <rect x="347" y="111" width="9" height="7" fill="none" stroke="var(--pi-ink)" stroke-width=".8" opacity=".7"/>
  <text x="370" y="110" font-family="var(--pi-mono)" font-size="7.5" letter-spacing="1.5" fill="var(--pi-ink-55)">ASSIST</text>
  <text x="370" y="126" font-family="var(--pi-sans)" font-weight="300" font-size="9.5" fill="var(--pi-ink)">助手面板</text>
  <!-- 图元 · 接口分支 -->
  <line x1="472" y1="130" x2="472" y2="114" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
  <line x1="472" y1="114" x2="460" y2="106" stroke="var(--pi-ink-80)" stroke-width="1.1"/>
  <line x1="472" y1="114" x2="472" y2="104" stroke="var(--pi-ink-80)" stroke-width="1.1"/>
  <line x1="472" y1="114" x2="484" y2="106" stroke="var(--pi-ink-80)" stroke-width="1.1"/>
  <circle cx="472" cy="132" r="3" fill="none" stroke="var(--pi-ink-80)" stroke-width=".9"/>
  <circle cx="459" cy="105" r="3" fill="none" stroke="var(--pi-ink-80)" stroke-width=".9"/>
  <circle cx="472" cy="101" r="3" fill="none" stroke="var(--pi-ink-80)" stroke-width=".9"/>
  <circle cx="485" cy="105" r="3" fill="none" stroke="var(--pi-ink-80)" stroke-width=".9"/>
  <text x="496" y="110" font-family="var(--pi-mono)" font-size="7.5" letter-spacing="1.5" fill="var(--pi-ink-55)">API HUB</text>
  <text x="496" y="126" font-family="var(--pi-sans)" font-weight="300" font-size="9.5" fill="var(--pi-ink)">开放接口</text>

  <!-- L2 模型层 -->
  <text x="52" y="204" font-family="var(--pi-mono)" font-size="10" letter-spacing="2" fill="var(--pi-ink)">L2</text>
  <text x="52" y="222" font-family="var(--pi-sans)" font-weight="300" font-size="11" fill="var(--pi-ink)">模型层</text>
  <text x="52" y="238" font-family="var(--pi-mono)" font-size="7" letter-spacing="1.5" fill="var(--pi-ink-45)">MODEL</text>
  <!-- 图元 · 齿轮 -->
  <circle cx="213" cy="214" r="13" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
  <circle cx="213" cy="214" r="4" fill="none" stroke="var(--pi-ink-80)" stroke-width="1"/>
  <g stroke="var(--pi-ink-80)" stroke-width="1.4">
    <line x1="213" y1="201" x2="213" y2="197"/><line x1="213" y1="227" x2="213" y2="231"/>
    <line x1="200" y1="214" x2="196" y2="214"/><line x1="226" y1="214" x2="230" y2="214"/>
    <line x1="203.8" y1="204.8" x2="201" y2="202"/><line x1="222.2" y1="223.2" x2="225" y2="226"/>
    <line x1="222.2" y1="204.8" x2="225" y2="202"/><line x1="203.8" y1="223.2" x2="201" y2="226"/>
  </g>
  <text x="242" y="210" font-family="var(--pi-mono)" font-size="7.5" letter-spacing="1.5" fill="var(--pi-ink-55)">LLM</text>
  <text x="242" y="226" font-family="var(--pi-sans)" font-weight="300" font-size="9.5" fill="var(--pi-ink)">大语言模型</text>
  <!-- 图元 · 文档 + 放大镜 -->
  <rect x="330" y="202" width="16" height="22" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.1"/>
  <line x1="333" y1="208" x2="343" y2="208" stroke="var(--pi-ink)" stroke-width=".8" opacity=".6"/>
  <line x1="333" y1="213" x2="343" y2="213" stroke="var(--pi-ink)" stroke-width=".8" opacity=".6"/>
  <circle cx="354" cy="212" r="7" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
  <line x1="359" y1="217" x2="364" y2="222" stroke="var(--pi-ink-80)" stroke-width="1.6" stroke-linecap="round"/>
  <text x="370" y="210" font-family="var(--pi-mono)" font-size="7.5" letter-spacing="1.5" fill="var(--pi-ink-55)">RAG</text>
  <text x="370" y="226" font-family="var(--pi-sans)" font-weight="300" font-size="9.5" fill="var(--pi-ink)">检索增强</text>
  <!-- 图元 · 节点连线 -->
  <circle cx="472" cy="214" r="3" fill="none" stroke="var(--pi-ink-80)" stroke-width=".9"/>
  <g stroke="var(--pi-ink-80)" stroke-width="1">
    <line x1="472" y1="214" x2="458" y2="206"/><line x1="472" y1="214" x2="486" y2="206"/>
    <line x1="472" y1="214" x2="458" y2="222"/><line x1="472" y1="214" x2="486" y2="222"/>
  </g>
  <circle cx="458" cy="206" r="2.6" fill="none" stroke="var(--pi-ink-80)" stroke-width=".9"/>
  <circle cx="486" cy="206" r="2.6" fill="none" stroke="var(--pi-ink-80)" stroke-width=".9"/>
  <circle cx="458" cy="222" r="2.6" fill="none" stroke="var(--pi-ink-80)" stroke-width=".9"/>
  <circle cx="486" cy="222" r="2.6" fill="none" stroke="var(--pi-ink-80)" stroke-width=".9"/>
  <text x="496" y="210" font-family="var(--pi-mono)" font-size="7.5" letter-spacing="1.5" fill="var(--pi-ink-55)">AGENT</text>
  <text x="496" y="226" font-family="var(--pi-sans)" font-weight="300" font-size="9.5" fill="var(--pi-ink)">智能体</text>

  <!-- L3 数据层 -->
  <text x="52" y="304" font-family="var(--pi-mono)" font-size="10" letter-spacing="2" fill="var(--pi-ink)">L3</text>
  <text x="52" y="322" font-family="var(--pi-sans)" font-weight="300" font-size="11" fill="var(--pi-ink)">数据层</text>
  <text x="52" y="338" font-family="var(--pi-mono)" font-size="7" letter-spacing="1.5" fill="var(--pi-ink-45)">DATA</text>
  <!-- 图元 · 圆柱向量库 -->
  <ellipse cx="213" cy="306" rx="13" ry="5" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.1"/>
  <line x1="200" y1="306" x2="200" y2="322" stroke="var(--pi-ink-80)" stroke-width="1.1"/>
  <line x1="226" y1="306" x2="226" y2="322" stroke="var(--pi-ink-80)" stroke-width="1.1"/>
  <path d="M 200 322 A 13 5 0 0 0 226 322" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.1"/>
  <text x="242" y="310" font-family="var(--pi-mono)" font-size="7.5" letter-spacing="1.5" fill="var(--pi-ink-55)">VEC DB</text>
  <text x="242" y="326" font-family="var(--pi-sans)" font-weight="300" font-size="9.5" fill="var(--pi-ink)">向量库</text>
  <!-- 图元 · 翻开的书 -->
  <path d="M 344 306 C 336 303, 330 304, 330 308 L 330 322 C 330 326, 336 327, 344 324" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.1" stroke-linejoin="round"/>
  <path d="M 346 306 C 354 303, 360 304, 360 308 L 360 322 C 360 326, 354 327, 346 324" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.1" stroke-linejoin="round"/>
  <line x1="345" y1="306" x2="345" y2="324" stroke="var(--pi-ink-80)" stroke-width=".9" opacity=".5"/>
  <text x="370" y="310" font-family="var(--pi-mono)" font-size="7.5" letter-spacing="1.5" fill="var(--pi-ink-55)">KNOWLEDGE</text>
  <text x="370" y="326" font-family="var(--pi-sans)" font-weight="300" font-size="9.5" fill="var(--pi-ink)">知识库</text>
  <!-- 图元 · 循环反馈 -->
  <path d="M 485 309 A 13 13 0 1 1 463 305" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.3"/>
  <path d="M 459 323 A 13 13 0 1 1 481 327" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.3"/>
  <path d="M 485 309 L 488 305 L 481 306" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.3" stroke-linejoin="round"/>
  <path d="M 459 323 L 456 327 L 463 326" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.3" stroke-linejoin="round"/>
  <text x="496" y="310" font-family="var(--pi-mono)" font-size="7.5" letter-spacing="1.5" fill="var(--pi-ink-55)">FEEDBACK</text>
  <text x="496" y="326" font-family="var(--pi-sans)" font-weight="300" font-size="9.5" fill="var(--pi-ink)">反馈管线</text>

  <!-- 规格表带：列头 + 三行参数 -->
  <text x="40" y="396" font-family="var(--pi-mono)" font-size="8" letter-spacing="2.5" fill="var(--pi-ink-45)">SPEC BAND · 部署规格</text>
  <line x1="170" y1="392" x2="230" y2="392" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
  <line x1="40" y1="408" x2="560" y2="408" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
  <g font-family="var(--pi-mono)" font-size="7.5" letter-spacing="1.5" fill="var(--pi-ink-45)">
    <text x="56" y="426">LAYER</text>
    <text x="200" y="426">SLA · 延迟</text>
    <text x="340" y="426">OWNER</text>
    <text x="476" y="426">STATUS</text>
  </g>
  <line x1="40" y1="434" x2="560" y2="434" stroke="var(--pi-ink)" stroke-width=".8" opacity=".5"/>
  <g font-family="var(--pi-sans)" font-weight="300" font-size="10.5" fill="var(--pi-ink)">
    <text x="56" y="464">应用层</text>
    <text x="200" y="464">P95 &lt; 0.4s 首字</text>
    <text x="340" y="464">产品体验组</text>
    <text x="476" y="464" font-family="var(--pi-mono)" font-size="9" letter-spacing="1" fill="var(--pi-ink-70)">GA · 已上线</text>
    <text x="56" y="508">模型层</text>
    <text x="200" y="508">可用性 99.9%</text>
    <text x="340" y="508">模型平台组</text>
    <text x="476" y="508" font-family="var(--pi-mono)" font-size="9" letter-spacing="1" fill="var(--pi-ink-70)">GA · 已上线</text>
    <text x="56" y="552">数据层</text>
    <text x="200" y="552">召回 &gt; 92%</text>
    <text x="340" y="552">数据工程组</text>
    <text x="476" y="552" font-family="var(--pi-mono)" font-size="9" letter-spacing="1" fill="var(--pi-ink-70)">BETA · 灰度</text>
  </g>
  <line x1="40" y1="478" x2="560" y2="478" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
  <line x1="40" y1="522" x2="560" y2="522" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
  <line x1="40" y1="566" x2="560" y2="566" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
</svg>
</div>`
  },

  {
    name: 'swimlane-roadmap',
    group: 'flow-temporal',
    groupLabel: '流程与时序',
    description: 'Multi-lane ink roadmap with specimen quarter ruler, hatched spans and ring milestones.',
    label: '泳道路线图',
    num: 83,
    variant: null,
    paperInkNative: true,
    frame: { width: 980, height: 430, fit: 'fixed' },
    /* 出自样张 layout-b3.html */
    snippet: `<div class="pi-card">
<svg class="pi-art" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="pi-hatch-swim" width="8" height="8" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="0" y2="8" stroke="var(--pi-ink)" stroke-width=".7" opacity=".35"/>
    </pattern>
  </defs>

  <!-- 竖向虚线构造栅格（先画沉底，六列） -->
  <line x1="140" y1="108" x2="140" y2="486" stroke="var(--pi-ink)" stroke-width=".6" opacity=".22" stroke-dasharray="2 6"/>
  <line x1="212.3" y1="108" x2="212.3" y2="486" stroke="var(--pi-ink)" stroke-width=".6" opacity=".22" stroke-dasharray="2 6"/>
  <line x1="284.7" y1="108" x2="284.7" y2="486" stroke="var(--pi-ink)" stroke-width=".6" opacity=".22" stroke-dasharray="2 6"/>
  <line x1="357" y1="108" x2="357" y2="486" stroke="var(--pi-ink)" stroke-width=".6" opacity=".22" stroke-dasharray="2 6"/>
  <line x1="429.3" y1="108" x2="429.3" y2="486" stroke="var(--pi-ink)" stroke-width=".6" opacity=".22" stroke-dasharray="2 6"/>
  <line x1="501.7" y1="108" x2="501.7" y2="486" stroke="var(--pi-ink)" stroke-width=".6" opacity=".22" stroke-dasharray="2 6"/>
  <line x1="574" y1="108" x2="574" y2="486" stroke="var(--pi-ink)" stroke-width=".6" opacity=".22" stroke-dasharray="2 6"/>

  <!-- 标本刻度尺：本卡唯一强调线（2px 尺脊 + 主/半刻度 + mono 阶段标签） -->
  <line x1="140" y1="92" x2="574" y2="92" stroke="var(--pi-ink)" stroke-width="2"/>
  <line x1="140" y1="92" x2="140" y2="104" stroke="var(--pi-ink-80)" stroke-width="1"/>
  <line x1="212.3" y1="92" x2="212.3" y2="104" stroke="var(--pi-ink-80)" stroke-width="1"/>
  <line x1="284.7" y1="92" x2="284.7" y2="104" stroke="var(--pi-ink-80)" stroke-width="1"/>
  <line x1="357" y1="92" x2="357" y2="104" stroke="var(--pi-ink-80)" stroke-width="1"/>
  <line x1="429.3" y1="92" x2="429.3" y2="104" stroke="var(--pi-ink-80)" stroke-width="1"/>
  <line x1="501.7" y1="92" x2="501.7" y2="104" stroke="var(--pi-ink-80)" stroke-width="1"/>
  <line x1="574" y1="92" x2="574" y2="104" stroke="var(--pi-ink-80)" stroke-width="1"/>
  <line x1="176.2" y1="92" x2="176.2" y2="98" stroke="var(--pi-ink)" stroke-width=".5" opacity=".5"/>
  <line x1="248.5" y1="92" x2="248.5" y2="98" stroke="var(--pi-ink)" stroke-width=".5" opacity=".5"/>
  <line x1="320.8" y1="92" x2="320.8" y2="98" stroke="var(--pi-ink)" stroke-width=".5" opacity=".5"/>
  <line x1="393.2" y1="92" x2="393.2" y2="98" stroke="var(--pi-ink)" stroke-width=".5" opacity=".5"/>
  <line x1="465.5" y1="92" x2="465.5" y2="98" stroke="var(--pi-ink)" stroke-width=".5" opacity=".5"/>
  <line x1="537.8" y1="92" x2="537.8" y2="98" stroke="var(--pi-ink)" stroke-width=".5" opacity=".5"/>
  <text x="176.2" y="80" font-family="var(--pi-mono)" font-size="9" letter-spacing="2" text-anchor="middle" fill="var(--pi-ink-45)">25Q3</text>
  <text x="248.5" y="80" font-family="var(--pi-mono)" font-size="9" letter-spacing="2" text-anchor="middle" fill="var(--pi-ink-45)">25Q4</text>
  <text x="320.8" y="80" font-family="var(--pi-mono)" font-size="9" letter-spacing="2" text-anchor="middle" fill="var(--pi-ink-45)">26Q1</text>
  <text x="393.2" y="80" font-family="var(--pi-mono)" font-size="9" letter-spacing="2" text-anchor="middle" fill="var(--pi-ink-45)">26Q2</text>
  <text x="465.5" y="80" font-family="var(--pi-mono)" font-size="9" letter-spacing="2" text-anchor="middle" fill="var(--pi-ink-45)">26Q3</text>
  <text x="537.8" y="80" font-family="var(--pi-mono)" font-size="9" letter-spacing="2" text-anchor="middle" fill="var(--pi-ink-45)">26Q4</text>

  <!-- 泳道分隔线 -->
  <line x1="140" y1="234" x2="574" y2="234" stroke="var(--pi-ink)" stroke-width=".6" opacity=".2"/>
  <line x1="140" y1="360" x2="574" y2="360" stroke="var(--pi-ink)" stroke-width=".6" opacity=".2"/>

  <!-- 泳道标签列（mono 道号·英文 + 中文道名 + 接入刻度尺的短引线） -->
  <text x="34" y="165" font-family="var(--pi-mono)" font-size="9" letter-spacing="1.5" fill="var(--pi-ink)">L1 · EXPERIENCE</text>
  <text x="34" y="186" font-family="var(--pi-sans)" font-weight="300" font-size="11" fill="var(--pi-ink-70)">产品体验</text>
  <line x1="122" y1="171" x2="136" y2="171" stroke="var(--pi-ink)" stroke-width=".8" opacity=".4"/>
  <text x="34" y="291" font-family="var(--pi-mono)" font-size="9" letter-spacing="1.5" fill="var(--pi-ink)">L2 · GROWTH</text>
  <text x="34" y="312" font-family="var(--pi-sans)" font-weight="300" font-size="11" fill="var(--pi-ink-70)">用户增长</text>
  <line x1="122" y1="297" x2="136" y2="297" stroke="var(--pi-ink)" stroke-width=".8" opacity=".4"/>
  <text x="34" y="417" font-family="var(--pi-mono)" font-size="9" letter-spacing="1.5" fill="var(--pi-ink)">L3 · BUSINESS</text>
  <text x="34" y="438" font-family="var(--pi-sans)" font-weight="300" font-size="11" fill="var(--pi-ink-70)">商业化</text>
  <line x1="122" y1="423" x2="136" y2="423" stroke="var(--pi-ink)" stroke-width=".8" opacity=".4"/>

  <!-- L1 产品体验：斜纹 span + 留白 span + 环形里程碑 -->
  <rect x="140" y="154" width="144.7" height="34" fill="url(#pi-hatch-swim)" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
  <line x1="140" y1="144" x2="140" y2="198" stroke="var(--pi-ink)" stroke-width="1" opacity=".7"/>
  <line x1="284.7" y1="144" x2="284.7" y2="198" stroke="var(--pi-ink)" stroke-width="1" opacity=".7"/>
  <text x="212.3" y="175" font-family="var(--pi-mono)" font-size="8.5" letter-spacing="1.5" text-anchor="middle" fill="var(--pi-ink)">V1 · ONBOARDING</text>
  <text x="142" y="140" font-family="var(--pi-sans)" font-weight="300" font-size="10.5" fill="var(--pi-ink-70)">新手引导 v1 上线</text>
  <rect x="284.7" y="154" width="144.6" height="34" fill="var(--pi-paper-panel)" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
  <line x1="429.3" y1="144" x2="429.3" y2="198" stroke="var(--pi-ink)" stroke-width="1" opacity=".7"/>
  <text x="357" y="175" font-family="var(--pi-mono)" font-size="8.5" letter-spacing="1.5" text-anchor="middle" fill="var(--pi-ink)">V2 · INSIGHT</text>
  <text x="286.7" y="140" font-family="var(--pi-sans)" font-weight="300" font-size="10.5" fill="var(--pi-ink-70)">用户洞察 v2 灰度</text>
  <circle cx="465.5" cy="171" r="7" fill="var(--pi-paper)" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
  <circle cx="465.5" cy="171" r="2.5" fill="var(--pi-ink)"/>
  <circle cx="465.5" cy="171" r="11" fill="none" stroke="var(--pi-ink)" stroke-width=".6" opacity=".35"/>
  <text x="465.5" y="147" font-family="var(--pi-mono)" font-size="8" letter-spacing="1.5" text-anchor="middle" fill="var(--pi-ink)">TEST 1K</text>
  <text x="465.5" y="213" font-family="var(--pi-sans)" font-weight="300" font-size="10" text-anchor="middle" fill="var(--pi-ink-70)">千人验证</text>

  <!-- L2 用户增长 -->
  <rect x="212.3" y="280" width="144.7" height="34" fill="var(--pi-paper-panel)" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
  <line x1="212.3" y1="270" x2="212.3" y2="324" stroke="var(--pi-ink)" stroke-width="1" opacity=".7"/>
  <line x1="357" y1="270" x2="357" y2="324" stroke="var(--pi-ink)" stroke-width="1" opacity=".7"/>
  <text x="284.7" y="301" font-family="var(--pi-mono)" font-size="8.5" letter-spacing="1.5" text-anchor="middle" fill="var(--pi-ink)">GROWTH LOOP</text>
  <text x="214.3" y="266" font-family="var(--pi-sans)" font-weight="300" font-size="10.5" fill="var(--pi-ink-70)">成长任务适配</text>
  <rect x="357" y="280" width="217" height="34" fill="url(#pi-hatch-swim)" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
  <line x1="574" y1="270" x2="574" y2="324" stroke="var(--pi-ink)" stroke-width="1" opacity=".7"/>
  <text x="465.5" y="301" font-family="var(--pi-mono)" font-size="8.5" letter-spacing="1.5" text-anchor="middle" fill="var(--pi-ink)">RETENTION PLAN</text>
  <text x="431" y="266" font-family="var(--pi-sans)" font-weight="300" font-size="10.5" fill="var(--pi-ink-70)">留存机制验证</text>
  <circle cx="357" cy="297" r="7" fill="var(--pi-paper)" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
  <circle cx="357" cy="297" r="2.5" fill="var(--pi-ink)"/>
  <circle cx="357" cy="297" r="11" fill="none" stroke="var(--pi-ink)" stroke-width=".6" opacity=".35"/>
  <text x="357" y="273" font-family="var(--pi-mono)" font-size="8" letter-spacing="1.5" text-anchor="middle" fill="var(--pi-ink)">FIRST RELEASE</text>
  <text x="357" y="339" font-family="var(--pi-sans)" font-weight="300" font-size="10" text-anchor="middle" fill="var(--pi-ink-70)">首版交付</text>

  <!-- L3 商业化 -->
  <rect x="140" y="406" width="217" height="34" fill="url(#pi-hatch-swim)" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
  <line x1="140" y1="396" x2="140" y2="450" stroke="var(--pi-ink)" stroke-width="1" opacity=".7"/>
  <line x1="357" y1="396" x2="357" y2="450" stroke="var(--pi-ink)" stroke-width="1" opacity=".7"/>
  <text x="248.5" y="427" font-family="var(--pi-mono)" font-size="8.5" letter-spacing="1.5" text-anchor="middle" fill="var(--pi-ink)">MEMBER BASE</text>
  <text x="142" y="392" font-family="var(--pi-sans)" font-weight="300" font-size="10.5" fill="var(--pi-ink-70)">会员数据底座</text>
  <rect x="429.3" y="406" width="144.7" height="34" fill="var(--pi-paper-panel)" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
  <line x1="429.3" y1="396" x2="429.3" y2="450" stroke="var(--pi-ink)" stroke-width="1" opacity=".7"/>
  <line x1="574" y1="396" x2="574" y2="450" stroke="var(--pi-ink)" stroke-width="1" opacity=".7"/>
  <text x="501.7" y="427" font-family="var(--pi-mono)" font-size="8.5" letter-spacing="1.5" text-anchor="middle" fill="var(--pi-ink)">VALUE MODEL</text>
  <text x="431.3" y="392" font-family="var(--pi-sans)" font-weight="300" font-size="10.5" fill="var(--pi-ink-70)">增值服务模型</text>
  <circle cx="393.2" cy="423" r="7" fill="var(--pi-paper)" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
  <circle cx="393.2" cy="423" r="2.5" fill="var(--pi-ink)"/>
  <circle cx="393.2" cy="423" r="11" fill="none" stroke="var(--pi-ink)" stroke-width=".6" opacity=".35"/>
  <text x="393.2" y="397" font-family="var(--pi-mono)" font-size="8" letter-spacing="1.5" text-anchor="middle" fill="var(--pi-ink)">AUTO REVIEW</text>
  <text x="393.2" y="465" font-family="var(--pi-sans)" font-weight="300" font-size="10" text-anchor="middle" fill="var(--pi-ink-70)">自动复盘</text>

  <!-- 页脚 mono 注 -->
  <line x1="46" y1="545" x2="180" y2="545" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
  <line x1="420" y1="545" x2="554" y2="545" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
  <text x="300" y="549" font-family="var(--pi-mono)" font-size="8" letter-spacing="3" text-anchor="middle" fill="var(--pi-ink-45)">PRODUCT ROADMAP · EXPERIENCE / GROWTH / BUSINESS</text>
</svg>
</div>`
  },

  {
    name: 'profile-card',
    group: 'evidence-media',
    groupLabel: '证据与媒体',
    description: 'One independently replaceable portrait profile record in the original C3 tall-card proportions.',
    label: '人物画像卡',
    num: 84,
    variant: null,
    paperInkNative: true,
    frame: { width: 500, height: 660, fit: 'fixed' },
    dataContract: { mode: 'record', unit: 'profile', pointer: '/structured_data/profile', minItems: 1, maxItems: 1 },
    /* 出自样张 layout-c3.html；单卡自然边界 500×660，C3 由 split-x-3 的三个叶槽各绑定一次 */
    snippet: `<div class="pi-card" style="width:500px!important;min-height:660px!important">
<svg class="pi-art" viewBox="0 0 500 660" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="pi-hatch-pc" width="8" height="8" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="0" y2="8" stroke="var(--pi-ink)" stroke-width=".7" opacity=".32"/>
    </pattern>
  </defs>

  <!-- 单张画像卡；实例数量由 topology 叶槽数决定 -->
  <g data-bind-root="record" data-profile-card="record" transform="scale(1.2690355)">
    <rect x="15" y="24" width="364" height="472" fill="var(--pi-paper-panel)" stroke="var(--pi-ink-80)" stroke-width="1.3"/>
    <rect x="19" y="28" width="356" height="464" fill="none" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
    <circle cx="197" cy="94" r="34" fill="url(#pi-hatch-pc)" stroke="var(--pi-ink-80)" stroke-width="1.1"/>
    <circle cx="197" cy="86" r="10" fill="var(--pi-paper)" stroke="var(--pi-ink-80)" stroke-width="1"/>
    <path d="M 176 124 A 21 21 0 0 1 218 124" fill="var(--pi-paper)" stroke="var(--pi-ink-80)" stroke-width="1"/>
    <text data-field="illustration_label" x="197" y="146" font-family="var(--pi-mono)" font-size="8" letter-spacing="2" text-anchor="middle" fill="var(--pi-ink-45)">PERSONA · DAILY USE</text>
    <line x1="35" y1="164" x2="359" y2="164" stroke="var(--pi-ink)" stroke-width=".8" opacity=".5"/>
    <line x1="35" y1="168" x2="127" y2="168" stroke="var(--pi-ink)" stroke-width=".6" opacity=".25"/>
    <text data-field="tag" x="35" y="190" font-family="var(--pi-mono)" font-size="8.5" letter-spacing="1.5" fill="var(--pi-ink-45)">USER 01</text>
    <text data-field="role" x="359" y="190" font-family="var(--pi-mono)" font-size="8.5" letter-spacing="1.5" text-anchor="end" fill="var(--pi-ink-45)">PERSONAL</text>
    <text data-field="name" x="35" y="218" font-family="var(--pi-sans)" font-weight="300" font-size="15" fill="var(--pi-ink)">个人用户 · 随手记录</text>
    <line x1="35" y1="234" x2="359" y2="234" stroke="var(--pi-ink)" stroke-width=".8" opacity=".5"/>
    <circle cx="43" cy="263" r="2.8" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".8"/><circle cx="43" cy="263" r=".9" fill="var(--pi-ink)"/>
    <text data-field="attribute_1_label" x="57" y="267" font-family="var(--pi-sans)" font-weight="300" font-size="11.5" fill="var(--pi-ink)">核心目标</text>
    <text data-field="attribute_1_value" x="359" y="266" font-family="var(--pi-mono)" font-size="9" letter-spacing=".6" text-anchor="end" fill="var(--pi-ink-55)">快速记下</text>
    <line x1="35" y1="282" x2="359" y2="282" stroke="var(--pi-ink)" stroke-width=".6" opacity=".22"/>
    <circle cx="43" cy="307" r="2.8" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".8"/><circle cx="43" cy="307" r=".9" fill="var(--pi-ink)"/>
    <text data-field="attribute_2_label" x="57" y="311" font-family="var(--pi-sans)" font-weight="300" font-size="11.5" fill="var(--pi-ink)">使用频率</text>
    <text data-field="attribute_2_value" x="359" y="310" font-family="var(--pi-mono)" font-size="9" letter-spacing=".6" text-anchor="end" fill="var(--pi-ink-55)">4 DAYS / WK</text>
    <line x1="35" y1="326" x2="359" y2="326" stroke="var(--pi-ink)" stroke-width=".6" opacity=".22"/>
    <circle cx="43" cy="351" r="2.8" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".8"/><circle cx="43" cy="351" r=".9" fill="var(--pi-ink)"/>
    <text data-field="attribute_3_label" x="57" y="355" font-family="var(--pi-sans)" font-weight="300" font-size="11.5" fill="var(--pi-ink)">完成时间</text>
    <text data-field="attribute_3_value" x="359" y="354" font-family="var(--pi-mono)" font-size="9" letter-spacing=".6" text-anchor="end" fill="var(--pi-ink-55)">3 MIN</text>
    <line x1="35" y1="370" x2="359" y2="370" stroke="var(--pi-ink)" stroke-width=".6" opacity=".22"/>
    <circle cx="43" cy="395" r="2.8" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".8"/><circle cx="43" cy="395" r=".9" fill="var(--pi-ink)"/>
    <text data-field="attribute_4_label" x="57" y="399" font-family="var(--pi-sans)" font-weight="300" font-size="11.5" fill="var(--pi-ink)">常用方式</text>
    <text data-field="attribute_4_value" x="359" y="398" font-family="var(--pi-mono)" font-size="9" letter-spacing=".6" text-anchor="end" fill="var(--pi-ink-55)">QUICK TEMPLATE</text>
    <line x1="35" y1="450" x2="359" y2="450" stroke="var(--pi-ink)" stroke-width=".6" opacity=".25"/>
    <text data-field="footnote" x="35" y="474" font-family="var(--pi-mono)" font-size="8" letter-spacing="1.5" fill="var(--pi-ink-45)">PERSONA P-01 · SAMPLE</text>
  </g>

</svg>
</div>`
  },

  {
    name: 'radial-progress',
    group: 'metric-data',
    groupLabel: '指标与数据',
    description: 'Instrument-style row of radial progress rings derived from C5.',
    label: '环形进度指标',
    num: 85,
    variant: null,
    paperInkNative: true,
    frame: { width: 950, height: 440, fit: 'fixed' },
    /* 出自样张 layout-c5.html；真实 950×440 画布内四环同轴等距，不再走旧 600×600 反归一化。 */
    snippet: `<div class="pi-card" style="width:950px;height:440px;min-height:0">
<svg class="pi-art" data-declared-frame-applied="1" viewBox="0 0 950 440" xmlns="http://www.w3.org/2000/svg">
  <!-- 环1 · 内容制作 38% -->
  <g transform="translate(120 180) scale(1.2) translate(-97.5 -200)">
    <circle cx="97.5" cy="200" r="56" fill="none" stroke="var(--pi-ink)" stroke-width=".5" stroke-dasharray="2 6" opacity=".28"/>
    <g stroke="var(--pi-ink)" opacity=".4">
      <line x1="97.5" y1="150.0" x2="97.5" y2="144.0" stroke-width=".8"/>
      <line x1="122.5" y1="156.7" x2="125.5" y2="151.5" stroke-width=".5"/>
      <line x1="140.8" y1="175.0" x2="146.0" y2="172.0" stroke-width=".5"/>
      <line x1="147.5" y1="200.0" x2="153.5" y2="200.0" stroke-width=".8"/>
      <line x1="140.8" y1="225.0" x2="146.0" y2="228.0" stroke-width=".5"/>
      <line x1="122.5" y1="243.3" x2="125.5" y2="248.5" stroke-width=".5"/>
      <line x1="97.5" y1="250.0" x2="97.5" y2="256.0" stroke-width=".8"/>
      <line x1="72.5" y1="243.3" x2="69.5" y2="248.5" stroke-width=".5"/>
      <line x1="54.2" y1="225.0" x2="49.0" y2="228.0" stroke-width=".5"/>
      <line x1="47.5" y1="200.0" x2="41.5" y2="200.0" stroke-width=".8"/>
      <line x1="54.2" y1="175.0" x2="49.0" y2="172.0" stroke-width=".5"/>
      <line x1="72.5" y1="156.7" x2="69.5" y2="151.5" stroke-width=".5"/>
    </g>
    <circle cx="97.5" cy="200" r="45" fill="none" stroke="var(--pi-ink)" stroke-width=".8" opacity=".3"/>
    <path d="M 97.5 155 A 45 45 0 0 1 128.3 232.8" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.4"/>
    <circle cx="128.3" cy="232.8" r="3" fill="var(--pi-ink)"/>
    <text x="97.5" y="206" font-family="var(--pi-mono)" font-size="17" text-anchor="middle" fill="var(--pi-ink)">38%</text>
    <text x="97.5" y="221" font-family="var(--pi-mono)" font-size="7.5" letter-spacing="1" text-anchor="middle" fill="var(--pi-ink-45)">38 / 100</text>
    <text x="97.5" y="278" font-family="var(--pi-sans)" font-weight="300" font-size="11.5" text-anchor="middle" fill="var(--pi-ink)">内容制作</text>
    <text x="97.5" y="295" font-family="var(--pi-mono)" font-size="6.5" letter-spacing="1.4" text-anchor="middle" fill="var(--pi-ink-45)">CONTENT</text>
  </g>

  <!-- 环2 · 活动执行 27% -->
  <g transform="translate(356.7 180) scale(1.2) translate(-232.5 -200)">
    <circle cx="232.5" cy="200" r="56" fill="none" stroke="var(--pi-ink)" stroke-width=".5" stroke-dasharray="2 6" opacity=".28"/>
    <g stroke="var(--pi-ink)" opacity=".4">
      <line x1="232.5" y1="150.0" x2="232.5" y2="144.0" stroke-width=".8"/>
      <line x1="257.5" y1="156.7" x2="260.5" y2="151.5" stroke-width=".5"/>
      <line x1="275.8" y1="175.0" x2="281.0" y2="172.0" stroke-width=".5"/>
      <line x1="282.5" y1="200.0" x2="288.5" y2="200.0" stroke-width=".8"/>
      <line x1="275.8" y1="225.0" x2="281.0" y2="228.0" stroke-width=".5"/>
      <line x1="257.5" y1="243.3" x2="260.5" y2="248.5" stroke-width=".5"/>
      <line x1="232.5" y1="250.0" x2="232.5" y2="256.0" stroke-width=".8"/>
      <line x1="207.5" y1="243.3" x2="204.5" y2="248.5" stroke-width=".5"/>
      <line x1="189.2" y1="225.0" x2="184.0" y2="228.0" stroke-width=".5"/>
      <line x1="182.5" y1="200.0" x2="176.5" y2="200.0" stroke-width=".8"/>
      <line x1="189.2" y1="175.0" x2="184.0" y2="172.0" stroke-width=".5"/>
      <line x1="207.5" y1="156.7" x2="204.5" y2="151.5" stroke-width=".5"/>
    </g>
    <circle cx="232.5" cy="200" r="45" fill="none" stroke="var(--pi-ink)" stroke-width=".8" opacity=".3"/>
    <path d="M 232.5 155 A 45 45 0 0 1 277.1 205.6" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.4"/>
    <circle cx="277.1" cy="205.6" r="3" fill="var(--pi-ink)"/>
    <text x="232.5" y="206" font-family="var(--pi-mono)" font-size="17" text-anchor="middle" fill="var(--pi-ink)">27%</text>
    <text x="232.5" y="221" font-family="var(--pi-mono)" font-size="7.5" letter-spacing="1" text-anchor="middle" fill="var(--pi-ink-45)">27 / 100</text>
    <text x="232.5" y="278" font-family="var(--pi-sans)" font-weight="300" font-size="11.5" text-anchor="middle" fill="var(--pi-ink)">活动执行</text>
    <text x="232.5" y="295" font-family="var(--pi-mono)" font-size="6.5" letter-spacing="1.4" text-anchor="middle" fill="var(--pi-ink-45)">EVENT OPS</text>
  </g>

  <!-- 环3 · 用户沟通 21% -->
  <g transform="translate(593.3 180) scale(1.2) translate(-367.5 -200)">
    <circle cx="367.5" cy="200" r="56" fill="none" stroke="var(--pi-ink)" stroke-width=".5" stroke-dasharray="2 6" opacity=".28"/>
    <g stroke="var(--pi-ink)" opacity=".4">
      <line x1="367.5" y1="150.0" x2="367.5" y2="144.0" stroke-width=".8"/>
      <line x1="392.5" y1="156.7" x2="395.5" y2="151.5" stroke-width=".5"/>
      <line x1="410.8" y1="175.0" x2="416.0" y2="172.0" stroke-width=".5"/>
      <line x1="417.5" y1="200.0" x2="423.5" y2="200.0" stroke-width=".8"/>
      <line x1="410.8" y1="225.0" x2="416.0" y2="228.0" stroke-width=".5"/>
      <line x1="392.5" y1="243.3" x2="395.5" y2="248.5" stroke-width=".5"/>
      <line x1="367.5" y1="250.0" x2="367.5" y2="256.0" stroke-width=".8"/>
      <line x1="342.5" y1="243.3" x2="339.5" y2="248.5" stroke-width=".5"/>
      <line x1="324.2" y1="225.0" x2="319.0" y2="228.0" stroke-width=".5"/>
      <line x1="317.5" y1="200.0" x2="311.5" y2="200.0" stroke-width=".8"/>
      <line x1="324.2" y1="175.0" x2="319.0" y2="172.0" stroke-width=".5"/>
      <line x1="342.5" y1="156.7" x2="339.5" y2="151.5" stroke-width=".5"/>
    </g>
    <circle cx="367.5" cy="200" r="45" fill="none" stroke="var(--pi-ink)" stroke-width=".8" opacity=".3"/>
    <path d="M 367.5 155 A 45 45 0 0 1 411.1 188.8" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.4"/>
    <circle cx="411.1" cy="188.8" r="3" fill="var(--pi-ink)"/>
    <text x="367.5" y="206" font-family="var(--pi-mono)" font-size="17" text-anchor="middle" fill="var(--pi-ink)">21%</text>
    <text x="367.5" y="221" font-family="var(--pi-mono)" font-size="7.5" letter-spacing="1" text-anchor="middle" fill="var(--pi-ink-45)">21 / 100</text>
    <text x="367.5" y="278" font-family="var(--pi-sans)" font-weight="300" font-size="11.5" text-anchor="middle" fill="var(--pi-ink)">用户沟通</text>
    <text x="367.5" y="295" font-family="var(--pi-mono)" font-size="6.5" letter-spacing="1.4" text-anchor="middle" fill="var(--pi-ink-45)">USER CARE</text>
  </g>

  <!-- 环4 · 数据复盘 14% -->
  <g transform="translate(830 180) scale(1.2) translate(-502.5 -200)">
    <circle cx="502.5" cy="200" r="56" fill="none" stroke="var(--pi-ink)" stroke-width=".5" stroke-dasharray="2 6" opacity=".28"/>
    <g stroke="var(--pi-ink)" opacity=".4">
      <line x1="502.5" y1="150.0" x2="502.5" y2="144.0" stroke-width=".8"/>
      <line x1="527.5" y1="156.7" x2="530.5" y2="151.5" stroke-width=".5"/>
      <line x1="545.8" y1="175.0" x2="551.0" y2="172.0" stroke-width=".5"/>
      <line x1="552.5" y1="200.0" x2="558.5" y2="200.0" stroke-width=".8"/>
      <line x1="545.8" y1="225.0" x2="551.0" y2="228.0" stroke-width=".5"/>
      <line x1="527.5" y1="243.3" x2="530.5" y2="248.5" stroke-width=".5"/>
      <line x1="502.5" y1="250.0" x2="502.5" y2="256.0" stroke-width=".8"/>
      <line x1="477.5" y1="243.3" x2="474.5" y2="248.5" stroke-width=".5"/>
      <line x1="459.2" y1="225.0" x2="454.0" y2="228.0" stroke-width=".5"/>
      <line x1="452.5" y1="200.0" x2="446.5" y2="200.0" stroke-width=".8"/>
      <line x1="459.2" y1="175.0" x2="454.0" y2="172.0" stroke-width=".5"/>
      <line x1="477.5" y1="156.7" x2="474.5" y2="151.5" stroke-width=".5"/>
    </g>
    <circle cx="502.5" cy="200" r="45" fill="none" stroke="var(--pi-ink)" stroke-width=".8" opacity=".3"/>
    <path d="M 502.5 155 A 45 45 0 0 1 537.2 171.3" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.4"/>
    <circle cx="537.2" cy="171.3" r="3" fill="var(--pi-ink)"/>
    <text x="502.5" y="206" font-family="var(--pi-mono)" font-size="17" text-anchor="middle" fill="var(--pi-ink)">14%</text>
    <text x="502.5" y="221" font-family="var(--pi-mono)" font-size="7.5" letter-spacing="1" text-anchor="middle" fill="var(--pi-ink-45)">14 / 100</text>
    <text x="502.5" y="278" font-family="var(--pi-sans)" font-weight="300" font-size="11.5" text-anchor="middle" fill="var(--pi-ink)">数据复盘</text>
    <text x="502.5" y="295" font-family="var(--pi-mono)" font-size="6.5" letter-spacing="1.4" text-anchor="middle" fill="var(--pi-ink-45)">DATA REVIEW</text>
  </g>

  <!-- 共享基线与合计校验 -->
  <line x1="45" y1="340" x2="905" y2="340" stroke="var(--pi-ink)" stroke-width=".8" opacity=".5"/>
  <line x1="45" y1="334" x2="45" y2="346" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
  <line x1="905" y1="334" x2="905" y2="346" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
  <text data-field="sum_label" x="905" y="368" font-family="var(--pi-mono)" font-size="8" letter-spacing="1.8" text-anchor="end" fill="var(--pi-ink-45)">ALLOCATION SUM · 100%</text>
</svg>
</div>`
  },

  {
    name: 'icon-grid',
    group: 'evidence-media',
    groupLabel: '证据与媒体',
    description: 'Regular grid of fine-line icon cells with title, mono code and two-line note.',
    label: '图标格阵',
    num: 86,
    variant: null,
    paperInkNative: true,
    frame: { width: 810, height: 520, fit: 'fixed' },
    /* 出自样张 layout-f4.html（2 行 × 3 列规则格阵；格内：细线图标居中 → 标题 → mono EN code →
       短规线 → 两行说明；格阵上下缘各一条构造虚线；上下两行各占一半版心,行内容在行带内居中） */
    snippet: `<div class="pi-card">
<svg class="pi-art" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="piHatch86" width="6" height="6" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="0" y2="6" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
    </pattern>
  </defs>

  <!-- 格阵上缘构造虚线 -->
  <line x1="36" y1="64" x2="564" y2="64" stroke="var(--pi-ink)" stroke-width=".6" opacity=".22" stroke-dasharray="2 6"/>

  <g transform="translate(0 -6)"><!-- 格 1 · 用户洞察：分叉路径 + 节点 -->
  <g>
    <circle cx="102" cy="140" r="3.5" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.1"/>
    <circle cx="102" cy="140" r="1.2" fill="var(--pi-ink)"/>
    <circle cx="146" cy="125" r="3" fill="none" stroke="var(--pi-ink-80)" stroke-width="1"/>
    <circle cx="146" cy="155" r="3" fill="none" stroke="var(--pi-ink-80)" stroke-width="1"/>
    <path d="M 105 140 Q 124 140 125 140 Q 132 140 136 131 L 143 126" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
    <path d="M 105 140 Q 132 140 136 149 L 143 154" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
    <circle cx="125" cy="140" r="1.8" fill="var(--pi-ink)" opacity=".7"/>
    <text x="124" y="196" font-family="var(--pi-sans)" font-weight="300" font-size="12.5" text-anchor="middle" fill="var(--pi-ink)">用户洞察</text>
    <text x="124" y="211" font-family="var(--pi-mono)" font-size="6.5" letter-spacing="1.6" text-anchor="middle" fill="var(--pi-ink-45)">INSIGHT</text>
    <line x1="112" y1="218" x2="136" y2="218" stroke="var(--pi-ink)" stroke-width=".6" opacity=".4"/>
    <text x="124" y="235" font-family="var(--pi-sans)" font-weight="300" font-size="9" text-anchor="middle" fill="var(--pi-ink-70)">访谈与反馈持续归因</text>
    <text x="124" y="250" font-family="var(--pi-sans)" font-weight="300" font-size="9" text-anchor="middle" fill="var(--pi-ink-55)">找到真实需求与阻力</text>
  </g>

  <!-- 格 2 · 产品规划：进度槽 + 阶段刻度 -->
  <g>
    <rect x="280" y="128" width="36" height="24" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
    <rect x="316" y="134" width="4" height="12" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.1"/>
    <rect x="284" y="132" width="10" height="16" fill="url(#piHatch86)" stroke="none"/>
    <rect x="294" y="132" width="10" height="16" fill="none" stroke="var(--pi-ink)" stroke-width=".5" opacity=".3"/>
    <rect x="304" y="132" width="10" height="16" fill="none" stroke="var(--pi-ink)" stroke-width=".5" opacity=".3"/>
    <line x1="280" y1="155" x2="280" y2="159" stroke="var(--pi-ink)" stroke-width=".6" opacity=".4"/>
    <line x1="289" y1="155" x2="289" y2="159" stroke="var(--pi-ink)" stroke-width=".6" opacity=".4"/>
    <line x1="298" y1="155" x2="298" y2="159" stroke="var(--pi-ink)" stroke-width=".6" opacity=".4"/>
    <line x1="307" y1="155" x2="307" y2="159" stroke="var(--pi-ink)" stroke-width=".6" opacity=".4"/>
    <text x="300" y="196" font-family="var(--pi-sans)" font-weight="300" font-size="12.5" text-anchor="middle" fill="var(--pi-ink)">产品规划</text>
    <text x="300" y="211" font-family="var(--pi-mono)" font-size="6.5" letter-spacing="1.6" text-anchor="middle" fill="var(--pi-ink-45)">ROADMAP</text>
    <line x1="288" y1="218" x2="312" y2="218" stroke="var(--pi-ink)" stroke-width=".6" opacity=".4"/>
    <text x="300" y="235" font-family="var(--pi-sans)" font-weight="300" font-size="9" text-anchor="middle" fill="var(--pi-ink-70)">目标拆解为阶段路线</text>
    <text x="300" y="250" font-family="var(--pi-sans)" font-weight="300" font-size="9" text-anchor="middle" fill="var(--pi-ink-55)">关键假设进入验证队列</text>
  </g>

  <!-- 格 3 · 功能设计：3×3 功能网格 + 焦点 -->
  <g>
    <rect x="457" y="121" width="12" height="12" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".55"/>
    <rect x="470" y="121" width="12" height="12" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".55"/>
    <rect x="483" y="121" width="12" height="12" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".55"/>
    <rect x="457" y="134" width="12" height="12" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".55"/>
    <rect x="483" y="134" width="12" height="12" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".55"/>
    <rect x="457" y="147" width="12" height="12" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".55"/>
    <rect x="470" y="147" width="12" height="12" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".55"/>
    <rect x="483" y="147" width="12" height="12" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".55"/>
    <rect x="470" y="134" width="12" height="12" fill="url(#piHatch86)" stroke="var(--pi-ink-80)" stroke-width="1"/>
    <circle cx="476" cy="140" r="1.3" fill="var(--pi-ink)"/>
    <text x="476" y="196" font-family="var(--pi-sans)" font-weight="300" font-size="12.5" text-anchor="middle" fill="var(--pi-ink)">功能设计</text>
    <text x="476" y="211" font-family="var(--pi-mono)" font-size="6.5" letter-spacing="1.6" text-anchor="middle" fill="var(--pi-ink-45)">FEATURE</text>
    <line x1="464" y1="218" x2="488" y2="218" stroke="var(--pi-ink)" stroke-width=".6" opacity=".4"/>
    <text x="476" y="235" font-family="var(--pi-sans)" font-weight="300" font-size="9" text-anchor="middle" fill="var(--pi-ink-70)">信息架构保持清晰</text>
    <text x="476" y="250" font-family="var(--pi-sans)" font-weight="300" font-size="9" text-anchor="middle" fill="var(--pi-ink-55)">核心流程减少无效步骤</text>
  </g>
  </g>

  <g transform="translate(0 37)"><!-- 格 4 · 团队协作：三道沟通弧 + 共识点 -->
  <g>
    <circle cx="124" cy="335" r="3" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
    <circle cx="124" cy="335" r="1.2" fill="var(--pi-ink)"/>
    <path d="M 115 329 A 10 10 0 0 1 133 329" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.1" opacity=".7"/>
    <path d="M 109 326 A 17 17 0 0 1 139 326" fill="none" stroke="var(--pi-ink)" stroke-width="1" opacity=".5"/>
    <path d="M 103 322 A 24 24 0 0 1 145 322" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".3"/>
    <text x="124" y="384" font-family="var(--pi-sans)" font-weight="300" font-size="12.5" text-anchor="middle" fill="var(--pi-ink)">团队协作</text>
    <text x="124" y="399" font-family="var(--pi-mono)" font-size="6.5" letter-spacing="1.6" text-anchor="middle" fill="var(--pi-ink-45)">COLLAB</text>
    <line x1="112" y1="406" x2="136" y2="406" stroke="var(--pi-ink)" stroke-width=".6" opacity=".4"/>
    <text x="124" y="423" font-family="var(--pi-sans)" font-weight="300" font-size="9" text-anchor="middle" fill="var(--pi-ink-70)">设计研发运营共同决策</text>
    <text x="124" y="438" font-family="var(--pi-sans)" font-weight="300" font-size="9" text-anchor="middle" fill="var(--pi-ink-55)">边界与交付节奏透明</text>
  </g>

  <!-- 格 5 · 数据分析：刻度表盘 + 指针 -->
  <g>
    <path d="M 280 335 A 20 20 0 0 1 320 335" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
    <line x1="289.8" y1="321.4" x2="287.4" y2="318.2" stroke="var(--pi-ink)" stroke-width=".7" opacity=".5"/>
    <line x1="294.6" y1="318.9" x2="293.4" y2="315.1" stroke="var(--pi-ink)" stroke-width=".7" opacity=".5"/>
    <line x1="300" y1="318" x2="300" y2="314" stroke="var(--pi-ink)" stroke-width=".7" opacity=".5"/>
    <line x1="305.4" y1="318.9" x2="306.6" y2="315.1" stroke="var(--pi-ink)" stroke-width=".7" opacity=".5"/>
    <line x1="310.1" y1="321.4" x2="312.5" y2="318.2" stroke="var(--pi-ink)" stroke-width=".7" opacity=".5"/>
    <line x1="300" y1="335" x2="310" y2="321" stroke="var(--pi-ink)" stroke-width="1.5"/>
    <circle cx="300" cy="335" r="1.8" fill="var(--pi-ink)"/>
    <text x="300" y="384" font-family="var(--pi-sans)" font-weight="300" font-size="12.5" text-anchor="middle" fill="var(--pi-ink)">数据分析</text>
    <text x="300" y="399" font-family="var(--pi-mono)" font-size="6.5" letter-spacing="1.6" text-anchor="middle" fill="var(--pi-ink-45)">METRICS</text>
    <line x1="288" y1="406" x2="312" y2="406" stroke="var(--pi-ink)" stroke-width=".6" opacity=".4"/>
    <text x="300" y="423" font-family="var(--pi-sans)" font-weight="300" font-size="9" text-anchor="middle" fill="var(--pi-ink-70)">定义北极星与护栏指标</text>
    <text x="300" y="438" font-family="var(--pi-sans)" font-weight="300" font-size="9" text-anchor="middle" fill="var(--pi-ink-55)">用结果校准产品判断</text>
  </g>

  <!-- 格 6 · 质量守门：盾牌轮廓 + 对勾 -->
  <g>
    <path d="M 461 312 L 491 312 L 491 331 Q 491 345 476 349 Q 461 345 461 331 Z" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
    <path d="M 461 312 L 461 331" fill="none" stroke="var(--pi-ink)" stroke-width=".5" opacity=".3"/>
    <path d="M 461 317 L 491 317" fill="none" stroke="var(--pi-ink)" stroke-width=".5" opacity=".3"/>
    <path d="M 469 328 L 474 334 L 484 321" fill="none" stroke="var(--pi-ink)" stroke-width="1.6"/>
    <text x="476" y="384" font-family="var(--pi-sans)" font-weight="300" font-size="12.5" text-anchor="middle" fill="var(--pi-ink)">质量守门</text>
    <text x="476" y="399" font-family="var(--pi-mono)" font-size="6.5" letter-spacing="1.6" text-anchor="middle" fill="var(--pi-ink-45)">QUALITY</text>
    <line x1="464" y1="406" x2="488" y2="406" stroke="var(--pi-ink)" stroke-width=".6" opacity=".4"/>
    <text x="476" y="423" font-family="var(--pi-sans)" font-weight="300" font-size="9" text-anchor="middle" fill="var(--pi-ink-70)">上线前覆盖关键场景</text>
    <text x="476" y="438" font-family="var(--pi-sans)" font-weight="300" font-size="9" text-anchor="middle" fill="var(--pi-ink-55)">风险可追踪可回滚</text>
  </g>
  </g>

  <!-- 格阵下缘构造虚线 -->
  <line x1="36" y1="528" x2="564" y2="528" stroke="var(--pi-ink)" stroke-width=".6" opacity=".22" stroke-dasharray="2 6"/>

</svg>
</div>`
  },

  {
    name: 'funnel',
    group: 'flow-temporal',
    groupLabel: '流程与时序',
    description: 'Continuous converging funnel with stage values and inter-stage conversion rates.',
    label: '转化漏斗',
    num: 87,
    variant: null,
    paperInkNative: true,
    frame: { width: 840, height: 500, fit: 'fixed' },
    /* 出自样张 layout-o1.html（连续漏斗：单一大倒三角收为塔尖，横线切层，左侧虚线引 mono 数量、
       右侧实线引级间转化率，顶部刻度尺，塔尖墨点 + 双线小框出口） */
    snippet: `<div class="pi-card">
<svg class="pi-art" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
  <!-- 外轮廓：顶线 + 两条连续侧边一路收为塔尖 -->
  <line x1="108" y1="104" x2="492" y2="104" stroke="var(--pi-ink-80)" stroke-width="1.4"/>
  <line x1="108" y1="104" x2="300" y2="464" stroke="var(--pi-ink-80)" stroke-width="1.4"/>
  <line x1="492" y1="104" x2="300" y2="464" stroke="var(--pi-ink-80)" stroke-width="1.4"/>

  <!-- 横向分隔线切出四层 -->
  <line x1="162.4" y1="206" x2="437.6" y2="206" stroke="var(--pi-ink)" stroke-width=".9" opacity=".55"/>
  <line x1="210.4" y1="296" x2="389.6" y2="296" stroke="var(--pi-ink)" stroke-width=".9" opacity=".55"/>
  <line x1="232" y1="360" x2="368" y2="360" stroke="var(--pi-ink)" stroke-width=".9" opacity=".55"/>

  <!-- 顶部刻度尺（21 刻度，每 5 格一长） -->
  <g stroke="var(--pi-ink)" stroke-width=".6" opacity=".35">
    <line x1="108" y1="104" x2="108" y2="92"/><line x1="127.2" y1="104" x2="127.2" y2="98"/>
    <line x1="146.4" y1="104" x2="146.4" y2="98"/><line x1="165.6" y1="104" x2="165.6" y2="98"/>
    <line x1="184.8" y1="104" x2="184.8" y2="98"/><line x1="204" y1="104" x2="204" y2="92"/>
    <line x1="223.2" y1="104" x2="223.2" y2="98"/><line x1="242.4" y1="104" x2="242.4" y2="98"/>
    <line x1="261.6" y1="104" x2="261.6" y2="98"/><line x1="280.8" y1="104" x2="280.8" y2="98"/>
    <line x1="300" y1="104" x2="300" y2="92"/><line x1="319.2" y1="104" x2="319.2" y2="98"/>
    <line x1="338.4" y1="104" x2="338.4" y2="98"/><line x1="357.6" y1="104" x2="357.6" y2="98"/>
    <line x1="376.8" y1="104" x2="376.8" y2="98"/><line x1="396" y1="104" x2="396" y2="92"/>
    <line x1="415.2" y1="104" x2="415.2" y2="98"/><line x1="434.4" y1="104" x2="434.4" y2="98"/>
    <line x1="453.6" y1="104" x2="453.6" y2="98"/><line x1="472.8" y1="104" x2="472.8" y2="98"/>
    <line x1="492" y1="104" x2="492" y2="92"/>
  </g>

  <!-- 层 1 · 触达 -->
  <text x="300" y="153" font-family="var(--pi-sans)" font-weight="300" font-size="14.5" text-anchor="middle" fill="var(--pi-ink)">触达</text>
  <text x="300" y="171" font-family="var(--pi-mono)" font-size="7" letter-spacing="2" text-anchor="middle" fill="var(--pi-ink-45)">AWARE</text>
  <line x1="125.2" y1="155" x2="95.2" y2="155" stroke="var(--pi-ink)" stroke-width=".6" stroke-dasharray="3 4" opacity=".5"/>
  <text x="87.2" y="153" font-family="var(--pi-mono)" font-size="12.5" text-anchor="end" fill="var(--pi-ink)">≈ 120万</text>
  <text x="87.2" y="169" font-family="var(--pi-mono)" font-size="7" letter-spacing="2" text-anchor="end" fill="var(--pi-ink-45)">REACH</text>

  <!-- 层 2 · 报名 -->
  <text x="300" y="249" font-family="var(--pi-sans)" font-weight="300" font-size="14.5" text-anchor="middle" fill="var(--pi-ink)">报名</text>
  <text x="300" y="267" font-family="var(--pi-mono)" font-size="7" letter-spacing="2" text-anchor="middle" fill="var(--pi-ink-45)">SIGN-UP</text>
  <line x1="176.4" y1="251" x2="146.4" y2="251" stroke="var(--pi-ink)" stroke-width=".6" stroke-dasharray="3 4" opacity=".5"/>
  <text x="138.4" y="249" font-family="var(--pi-mono)" font-size="12.5" text-anchor="end" fill="var(--pi-ink)">≈ 8.6万</text>
  <text x="138.4" y="265" font-family="var(--pi-mono)" font-size="7" letter-spacing="2" text-anchor="end" fill="var(--pi-ink-45)">REGISTRATION</text>

  <!-- 层 3 · 到场 -->
  <text x="300" y="326" font-family="var(--pi-sans)" font-weight="300" font-size="14" text-anchor="middle" fill="var(--pi-ink)">到场</text>
  <text x="300" y="344" font-family="var(--pi-mono)" font-size="7" letter-spacing="2" text-anchor="middle" fill="var(--pi-ink-45)">ATTEND</text>
  <line x1="217.4" y1="328" x2="187.4" y2="328" stroke="var(--pi-ink)" stroke-width=".6" stroke-dasharray="3 4" opacity=".5"/>
  <text x="179.4" y="326" font-family="var(--pi-mono)" font-size="12.5" text-anchor="end" fill="var(--pi-ink)">≈ 9,600</text>
  <text x="179.4" y="342" font-family="var(--pi-mono)" font-size="7" letter-spacing="2" text-anchor="end" fill="var(--pi-ink-45)">CHECK-IN</text>

  <!-- 层 4 · 成交（塔尖层，层名收小） -->
  <text x="300" y="410" font-family="var(--pi-sans)" font-weight="300" font-size="12.5" text-anchor="middle" fill="var(--pi-ink)">成交</text>
  <text x="300" y="423" font-family="var(--pi-mono)" font-size="6" letter-spacing="1.5" text-anchor="middle" fill="var(--pi-ink-45)">CONVERT</text>
  <line x1="262.2" y1="412" x2="232.2" y2="412" stroke="var(--pi-ink)" stroke-width=".6" stroke-dasharray="3 4" opacity=".5"/>
  <text x="224.2" y="410" font-family="var(--pi-mono)" font-size="12.5" text-anchor="end" fill="var(--pi-ink)">≈ 1,240</text>
  <text x="224.2" y="426" font-family="var(--pi-mono)" font-size="7" letter-spacing="2" text-anchor="end" fill="var(--pi-ink-45)">DEAL</text>

  <!-- 级间转化率：右侧实线引出（分隔线中点向右） -->
  <line x1="447.6" y1="206" x2="477.6" y2="206" stroke="var(--pi-ink)" stroke-width=".6" opacity=".5"/>
  <text x="485.6" y="209" font-family="var(--pi-mono)" font-size="9.5" fill="var(--pi-ink-70)">→ 7.2%</text>
  <line x1="399.6" y1="296" x2="429.6" y2="296" stroke="var(--pi-ink)" stroke-width=".6" opacity=".5"/>
  <text x="437.6" y="299" font-family="var(--pi-mono)" font-size="9.5" fill="var(--pi-ink-70)">→ 11.2%</text>
  <line x1="378" y1="360" x2="408" y2="360" stroke="var(--pi-ink)" stroke-width=".6" opacity=".5"/>
  <text x="416" y="363" font-family="var(--pi-mono)" font-size="9.5" fill="var(--pi-ink-70)">→ 12.9%</text>

  <!-- 底部收口：塔尖墨点 → 双线小框（出口） -->
  <line x1="300" y1="464" x2="300" y2="494" stroke="var(--pi-ink)" stroke-width="1.2"/>
  <circle cx="300" cy="502" r="3.5" fill="var(--pi-ink)"/>
  <rect x="240" y="510" width="120" height="40" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
  <rect x="244" y="514" width="112" height="32" fill="none" stroke="var(--pi-ink)" stroke-width=".6" opacity=".35"/>
  <text x="300" y="534" font-family="var(--pi-mono)" font-size="10" letter-spacing="2" text-anchor="middle" fill="var(--pi-ink)">TO CONVERT</text>

  <!-- 页脚 -->
  <line x1="140" y1="578" x2="240" y2="578" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
  <line x1="360" y1="578" x2="460" y2="578" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
  <text x="300" y="582" font-family="var(--pi-mono)" font-size="8" letter-spacing="3" text-anchor="middle" fill="var(--pi-ink-45)">FUNNEL · 4 STAGES</text>
</svg>
</div>`
  },

  {
    name: 'annotation-callout',
    group: 'evidence-media',
    groupLabel: '证据与媒体',
    description: 'Self-contained wide annotated hero with a central device, owned anchor-dot leaders, and four expanded side callouts.',
    label: '立绘环绕引线标注',
    num: 88,
    variant: null,
    paperInkNative: true,
    frame: { width: 840, height: 600, fit: 'fixed' },
    /* 出自样张 layout-g2.html；中心立绘、锚点、引线和注释由同一 leaf renderer 完整拥有 */
    snippet: `<div class="pi-card" style="width:840px!important;min-height:600px!important">
<svg class="pi-art" viewBox="0 0 840 600" xmlns="http://www.w3.org/2000/svg">
  <!-- 栏签 + 顶部规线 -->
  <text x="42" y="44" font-family="var(--pi-mono)" font-size="10" letter-spacing="2.6" fill="var(--pi-ink-45)">ANNOTATED HERO · DEVICE</text>
  <text x="798" y="44" font-family="var(--pi-mono)" font-size="8.5" letter-spacing="1.6" text-anchor="end" fill="var(--pi-ink-45)">4 CALLOUTS</text>
  <line x1="42" y1="60" x2="798" y2="60" stroke="var(--pi-ink)" stroke-width=".6" opacity=".22"/>
  <line x1="42" y1="60" x2="148" y2="60" stroke="var(--pi-ink)" stroke-width="1.3" opacity=".7"/>

  <!-- 构造基准：十字虚线 + 地面线 -->
  <line x1="292" y1="310" x2="548" y2="310" stroke="var(--pi-ink)" stroke-width=".5" opacity=".18" stroke-dasharray="2 6"/>
  <line x1="420" y1="174" x2="420" y2="468" stroke="var(--pi-ink)" stroke-width=".5" opacity=".18" stroke-dasharray="2 6"/>
  <line x1="318" y1="444" x2="522" y2="444" stroke="var(--pi-ink)" stroke-width=".9" opacity=".55"/>
  <line x1="318" y1="438" x2="318" y2="450" stroke="var(--pi-ink)" stroke-width=".7" opacity=".55"/>
  <line x1="522" y1="438" x2="522" y2="450" stroke="var(--pi-ink)" stroke-width=".7" opacity=".55"/>

  <!-- 完整中心对象：端侧 AI 设备立绘 -->
  <rect x="338" y="294" width="164" height="112" rx="8" fill="var(--pi-paper-panel)" stroke="var(--pi-ink-80)" stroke-width="1.3"/>
  <path d="M 346 378 L 494 378 L 494 397 Q 494 406 485 406 L 355 406 Q 346 406 346 397 Z" fill="var(--pi-paper-deep)" stroke="none"/>
  <line x1="346" y1="378" x2="494" y2="378" stroke="var(--pi-ink)" stroke-width=".6" opacity=".35"/>
  <path d="M 352 389 L 366 378 M 370 402 L 394 378 M 400 406 L 428 378 M 436 406 L 464 378 M 472 406 L 494 384" fill="none" stroke="var(--pi-ink)" stroke-width=".6" opacity=".24"/>
  <rect x="398" y="320" width="66" height="40" fill="none" stroke="var(--pi-ink)" stroke-width=".8" opacity=".6" stroke-dasharray="4 3"/>
  <line x1="464" y1="333" x2="473" y2="333" stroke="var(--pi-ink)" stroke-width=".8" opacity=".7"/>
  <line x1="464" y1="347" x2="473" y2="347" stroke="var(--pi-ink)" stroke-width=".8" opacity=".7"/>
  <circle cx="372" cy="418" r="17" fill="var(--pi-paper-deep)" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
  <circle cx="372" cy="418" r="6" fill="none" stroke="var(--pi-ink)" stroke-width=".7" opacity=".6"/>
  <circle cx="468" cy="418" r="17" fill="var(--pi-paper-deep)" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
  <circle cx="468" cy="418" r="6" fill="none" stroke="var(--pi-ink)" stroke-width=".7" opacity=".6"/>

  <!-- 左侧升降结构 -->
  <line x1="358" y1="294" x2="358" y2="214" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
  <line x1="367" y1="294" x2="367" y2="214" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
  <line x1="354" y1="214" x2="371" y2="214" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
  <line x1="358" y1="236" x2="367" y2="236" stroke="var(--pi-ink)" stroke-width=".6" opacity=".4"/>
  <line x1="358" y1="258" x2="367" y2="258" stroke="var(--pi-ink)" stroke-width=".6" opacity=".4"/>
  <rect x="349" y="246" width="27" height="24" fill="var(--pi-paper-panel)" stroke="var(--pi-ink-80)" stroke-width="1"/>
  <line x1="349" y1="270" x2="349" y2="279" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
  <line x1="316" y1="279" x2="349" y2="279" stroke="var(--pi-ink-80)" stroke-width="1.2"/>

  <!-- 雷达、相机与安全扫描件 -->
  <rect x="408" y="268" width="24" height="26" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.1"/>
  <path d="M 408 268 A 12 12 0 0 1 432 268" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
  <circle cx="420" cy="263" r="2" fill="var(--pi-ink)"/>
  <path d="M 402 251 A 24 24 0 0 1 411 241 M 438 251 A 24 24 0 0 0 429 241" fill="none" stroke="var(--pi-ink)" stroke-width=".7" opacity=".45"/>
  <rect x="498" y="315" width="19" height="17" fill="var(--pi-paper-panel)" stroke="var(--pi-ink-80)" stroke-width="1"/>
  <circle cx="507.5" cy="323.5" r="3.5" fill="none" stroke="var(--pi-ink)" stroke-width=".8" opacity=".75"/>
  <path d="M 498 378 A 20 20 0 0 1 504 398 M 506 376 A 27 27 0 0 1 514 399" fill="none" stroke="var(--pi-ink-80)" stroke-width=".9" opacity=".7"/>

  <!-- 左上批注：锚点 → 肘形引线 → 注释块 -->
  <g data-callout-id="p01">
    <circle data-anchor-id="p01" cx="420" cy="263" r="5" fill="var(--pi-paper)" stroke="var(--pi-ink-80)" stroke-width="1"/>
    <circle cx="420" cy="263" r="1.6" fill="var(--pi-ink)"/>
    <path data-leader-for="p01" d="M 420 263 L 420 174 L 260 174 L 260 126" fill="none" stroke="var(--pi-ink)" stroke-width=".7" opacity=".45" stroke-dasharray="3 5"/>
    <circle cx="260" cy="126" r="2.2" fill="var(--pi-ink)" opacity=".6"/>
    <line x1="250" y1="88" x2="250" y2="160" stroke="var(--pi-ink)" stroke-width=".8" opacity=".5"/>
    <text x="230" y="105" font-family="var(--pi-mono)" font-size="8" letter-spacing="1.2" text-anchor="end" fill="var(--pi-ink-45)">P01 · NPU</text>
    <text x="230" y="128" font-family="var(--pi-sans)" font-weight="300" font-size="12.5" text-anchor="end" fill="var(--pi-ink)">算力芯片</text>
    <text x="230" y="150" font-family="var(--pi-mono)" font-size="7.5" letter-spacing=".8" text-anchor="end" fill="var(--pi-ink-45)">48 TOPS · INT8</text>
  </g>

  <!-- 左下批注 -->
  <g data-callout-id="p02">
    <circle data-anchor-id="p02" cx="372" cy="401" r="5" fill="var(--pi-paper)" stroke="var(--pi-ink-80)" stroke-width="1"/>
    <circle cx="372" cy="401" r="1.6" fill="var(--pi-ink)"/>
    <path data-leader-for="p02" d="M 372 401 L 296 401 L 296 366 L 260 366" fill="none" stroke="var(--pi-ink)" stroke-width=".7" opacity=".45" stroke-dasharray="3 5"/>
    <circle cx="260" cy="366" r="2.2" fill="var(--pi-ink)" opacity=".6"/>
    <line x1="250" y1="328" x2="250" y2="400" stroke="var(--pi-ink)" stroke-width=".8" opacity=".5"/>
    <text x="230" y="345" font-family="var(--pi-mono)" font-size="8" letter-spacing="1.2" text-anchor="end" fill="var(--pi-ink-45)">P02 · POWER</text>
    <text x="230" y="368" font-family="var(--pi-sans)" font-weight="300" font-size="12.5" text-anchor="end" fill="var(--pi-ink)">电源管理</text>
    <text x="230" y="390" font-family="var(--pi-mono)" font-size="7.5" letter-spacing=".8" text-anchor="end" fill="var(--pi-ink-45)">65W PD · 92%</text>
  </g>

  <!-- 右上批注 -->
  <g data-callout-id="p03">
    <circle data-anchor-id="p03" cx="507.5" cy="323.5" r="5" fill="var(--pi-paper)" stroke="var(--pi-ink-80)" stroke-width="1"/>
    <circle cx="507.5" cy="323.5" r="1.6" fill="var(--pi-ink)"/>
    <path data-leader-for="p03" d="M 507.5 323.5 L 580 323.5 L 580 126 L 594 126" fill="none" stroke="var(--pi-ink)" stroke-width=".7" opacity=".45" stroke-dasharray="3 5"/>
    <circle cx="594" cy="126" r="2.2" fill="var(--pi-ink)" opacity=".6"/>
    <line x1="604" y1="88" x2="604" y2="160" stroke="var(--pi-ink)" stroke-width=".8" opacity=".5"/>
    <text x="624" y="105" font-family="var(--pi-mono)" font-size="8" letter-spacing="1.2" fill="var(--pi-ink-45)">P03 · CAMERA</text>
    <text x="624" y="128" font-family="var(--pi-sans)" font-weight="300" font-size="12.5" fill="var(--pi-ink)">摄像模组</text>
    <text x="624" y="150" font-family="var(--pi-mono)" font-size="7.5" letter-spacing=".8" fill="var(--pi-ink-45)">4K · FOV 120°</text>
  </g>

  <!-- 右下批注 -->
  <g data-callout-id="p04">
    <circle data-anchor-id="p04" cx="464" cy="340" r="5" fill="var(--pi-paper)" stroke="var(--pi-ink-80)" stroke-width="1"/>
    <circle cx="464" cy="340" r="1.6" fill="var(--pi-ink)"/>
    <path data-leader-for="p04" d="M 464 340 L 570 340 L 570 366 L 594 366" fill="none" stroke="var(--pi-ink)" stroke-width=".7" opacity=".45" stroke-dasharray="3 5"/>
    <circle cx="594" cy="366" r="2.2" fill="var(--pi-ink)" opacity=".6"/>
    <line x1="604" y1="328" x2="604" y2="400" stroke="var(--pi-ink)" stroke-width=".8" opacity=".5"/>
    <text x="624" y="345" font-family="var(--pi-mono)" font-size="8" letter-spacing="1.2" fill="var(--pi-ink-45)">P04 · NET</text>
    <text x="624" y="368" font-family="var(--pi-sans)" font-weight="300" font-size="12.5" fill="var(--pi-ink)">网络接口</text>
    <text x="624" y="390" font-family="var(--pi-mono)" font-size="7.5" letter-spacing=".8" fill="var(--pi-ink-45)">WI-FI 6E · GBE</text>
  </g>

  <!-- 图注 + 页脚 -->
  <text x="420" y="474" font-family="var(--pi-mono)" font-size="8.5" letter-spacing="2" text-anchor="middle" fill="var(--pi-ink-45)">EDGE AI DEVICE · SIDE VIEW</text>
  <line x1="304" y1="492" x2="536" y2="492" stroke="var(--pi-ink)" stroke-width=".6" opacity=".25"/>
  <text x="420" y="522" font-family="var(--pi-sans)" font-weight="300" font-size="13" text-anchor="middle" fill="var(--pi-ink)">算力、供电、摄像与网络共同限定设备的端侧能力</text>
  <line x1="42" y1="552" x2="798" y2="552" stroke="var(--pi-ink)" stroke-width=".6" opacity=".22"/>
  <text x="420" y="573" font-family="var(--pi-mono)" font-size="7.5" letter-spacing="1.5" text-anchor="middle" fill="var(--pi-ink-45)">DEVICE ANATOMY · FOUR-PART ANNOTATION</text>
</svg>
</div>`
  },

  {
    name: 'metric-strip',
    group: 'metric-data',
    groupLabel: '指标与数据',
    description: 'One coherent KPI strip that reflows two to four bound metric records into equal columns.',
    label: '自适应指标横带',
    num: 89,
    variant: null,
    paperInkNative: true,
    frame: { width: 1050, height: 140, fit: 'fixed' },
    dataContract: { mode: 'collection', unit: 'metric', pointer: '/structured_data/metrics', minItems: 2, maxItems: 4 },
    previewRecords: [
      { value: '91%', label: '召回命中率', code: 'RECALL@10' },
      { value: '1.2s', label: '平均响应时间', code: 'P95 LATENCY' },
      { value: '37%', label: '人工成本下降', code: 'COST SAVED' }
    ],
    /* 出自样张 layout-k3.html 第三层 KPI 总账带；只保留一个可重复模板，2–4 条由 materializer 克隆 */
    snippet: `<div class="pi-card" style="width:1050px!important;min-height:140px!important" data-bind-root="collection">
  <div class="pi-metric-strip">
    <div data-repeat-unit="metric">
      <span class="pi-metric-value" data-field="value">91%</span>
      <span class="pi-metric-label" data-field="label">召回命中率</span>
      <span class="pi-metric-code" data-field="code">RECALL@10</span>
    </div>
  </div>
</div>`
  },

  {
    name: 'scenario-column',
    group: 'flow-temporal',
    groupLabel: '流程与时序',
    description: 'One independently replaceable scenario record with pain, a three-step fix, and a shipment result.',
    label: '单场景纵列',
    num: 90,
    variant: null,
    paperInkNative: true,
    frame: { width: 540, height: 690, fit: 'fixed' },
    dataContract: { mode: 'record', unit: 'scenario', pointer: '/structured_data/scenario', minItems: 1, maxItems: 1 },
    /* 出自样张 layout-k4.html 单栏自然边界 CW=540、y=226..915；K4 由三叶槽各绑定一次 */
    snippet: `<div class="pi-card" style="width:540px!important;min-height:690px!important">
<svg class="pi-art" viewBox="0 0 540 690" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="pi-hatch-sc" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="7" stroke="var(--pi-ink)" stroke-width=".7" opacity=".35"/>
    </pattern>
  </defs>
  <g data-bind-root="record" data-scenario-column="record">
    <rect x="0" y="0" width="540" height="42" fill="var(--pi-paper-panel)" stroke="var(--pi-ink-80)" stroke-width="1.2"/>
    <rect x="0" y="0" width="10" height="42" fill="url(#pi-hatch-sc)" stroke="var(--pi-ink-80)" stroke-width=".9"/>
    <text data-field="title" x="275" y="28" font-family="var(--pi-sans)" font-weight="300" font-size="19" letter-spacing="2" text-anchor="middle" fill="var(--pi-ink)">智能客服</text>
    <text data-field="code" x="524" y="26" font-family="var(--pi-mono)" font-size="9" letter-spacing="2" text-anchor="end" fill="var(--pi-ink-45)">SCENE 01</text>

    <line x1="0" y1="74" x2="540" y2="74" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3" stroke-dasharray="3 6"/>
    <rect x="190" y="58" width="160" height="32" fill="var(--pi-paper)"/>
    <text x="270" y="80" font-family="var(--pi-mono)" font-size="10" letter-spacing="2" text-anchor="middle" fill="var(--pi-ink-70)">PAIN · 现状</text>
    <text data-field="pain_1" x="270" y="129" font-family="var(--pi-sans)" font-weight="300" font-size="14" text-anchor="middle" fill="var(--pi-ink-70)">人工客服承接大量重复咨询，</text>
    <text data-field="pain_2" x="270" y="174" font-family="var(--pi-sans)" font-weight="300" font-size="14" text-anchor="middle" fill="var(--pi-ink-70)">平均响应慢，夜班无人覆盖。</text>

    <line x1="0" y1="224" x2="540" y2="224" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3" stroke-dasharray="3 6"/>
    <rect x="190" y="208" width="160" height="32" fill="var(--pi-paper)"/>
    <text x="270" y="230" font-family="var(--pi-mono)" font-size="10" letter-spacing="2" text-anchor="middle" fill="var(--pi-ink-70)">FIX · 解法</text>
    <g transform="translate(184 275)">
      <path d="M -14 -10 h 28 v 16 h -18 l -6 6 v -6 h -4 z" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.1"/>
      <line x1="-8" y1="-4" x2="8" y2="-4" stroke="var(--pi-ink)" stroke-width=".8" opacity=".55"/>
      <text data-field="step_1" x="30" y="-2" font-family="var(--pi-sans)" font-weight="300" font-size="14" fill="var(--pi-ink)">问句改写</text>
      <text x="30" y="18" font-family="var(--pi-mono)" font-size="9" letter-spacing="2" fill="var(--pi-ink-45)">STEP 01</text>
    </g>
    <path d="M 179 303 l 5 6 l 5 -6 M 179 309 l 5 6 l 5 -6" fill="none" stroke="var(--pi-ink)" stroke-width=".8" opacity=".5" stroke-dasharray="3 3"/>
    <g transform="translate(184 340)">
      <path d="M -12 -8 h 14 l 10 8 l -10 8 h -14 z" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.1"/>
      <circle cx="-6" cy="0" r="2" fill="none" stroke="var(--pi-ink)" stroke-width=".9"/>
      <text data-field="step_2" x="30" y="-2" font-family="var(--pi-sans)" font-weight="300" font-size="14" fill="var(--pi-ink)">意图路由</text>
      <text x="30" y="18" font-family="var(--pi-mono)" font-size="9" letter-spacing="2" fill="var(--pi-ink-45)">STEP 02</text>
    </g>
    <path d="M 179 368 l 5 6 l 5 -6 M 179 374 l 5 6 l 5 -6" fill="none" stroke="var(--pi-ink)" stroke-width=".8" opacity=".5" stroke-dasharray="3 3"/>
    <g transform="translate(184 405)">
      <path d="M -12 -8 L 12 0 L -12 8 L -6 0 Z" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.1"/>
      <text data-field="step_3" x="30" y="-2" font-family="var(--pi-sans)" font-weight="300" font-size="14" fill="var(--pi-ink)">答案生成</text>
      <text x="30" y="18" font-family="var(--pi-mono)" font-size="9" letter-spacing="2" fill="var(--pi-ink-45)">STEP 03</text>
    </g>
    <text data-field="fix_note" x="500" y="345" font-family="var(--pi-sans)" font-weight="300" font-size="11" text-anchor="end" fill="var(--pi-ink-45)">首答 &lt; 3 s</text>

    <line x1="0" y1="464" x2="540" y2="464" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3" stroke-dasharray="3 6"/>
    <rect x="190" y="448" width="160" height="32" fill="var(--pi-paper)"/>
    <text x="270" y="470" font-family="var(--pi-mono)" font-size="10" letter-spacing="2" text-anchor="middle" fill="var(--pi-ink-70)">SHIP · 落地</text>
    <g transform="translate(72 564)">
      <rect x="0" y="-20" width="96" height="40" fill="var(--pi-paper-panel)" stroke="var(--pi-ink-80)" stroke-width="1.1"/>
      <line x1="96" y1="0" x2="150" y2="0" stroke="var(--pi-ink)" stroke-width="1" opacity=".6"/>
      <rect x="150" y="-20" width="96" height="40" fill="url(#pi-hatch-sc)" stroke="var(--pi-ink-80)" stroke-width="1.1"/>
      <line x1="246" y1="0" x2="300" y2="0" stroke="var(--pi-ink)" stroke-width="1" opacity=".6"/>
      <rect x="300" y="-20" width="96" height="40" fill="var(--pi-paper-panel)" stroke="var(--pi-ink-80)" stroke-width="1.1"/>
      <text data-field="ship_stage_1" x="48" y="5" font-family="var(--pi-sans)" font-weight="300" font-size="11" text-anchor="middle" fill="var(--pi-ink-70)">试点</text>
      <text data-field="ship_stage_2" x="198" y="5" font-family="var(--pi-sans)" font-weight="300" font-size="11" text-anchor="middle" fill="var(--pi-ink)">铺开</text>
      <text data-field="ship_stage_3" x="348" y="5" font-family="var(--pi-sans)" font-weight="300" font-size="11" text-anchor="middle" fill="var(--pi-ink-70)">常态</text>
    </g>
    <text data-field="result" x="270" y="635" font-family="var(--pi-sans)" font-weight="300" font-size="11" text-anchor="middle" fill="var(--pi-ink-45)">覆盖 32 个客服场景</text>
    <line x1="0" y1="689" x2="540" y2="689" stroke="var(--pi-ink)" stroke-width=".8" opacity=".5"/>
  </g>
</svg>
</div>`
  },

  {
    name: 'pain-list',
    group: 'document-text',
    groupLabel: '文档与文本',
    description: 'One vertical diagnosis component that reflows two to four bound cause records without multiplying the slot renderer.',
    label: '自适应痛点根因列',
    num: 91,
    variant: null,
    paperInkNative: true,
    frame: { width: 440, height: 650, fit: 'fixed' },
    dataContract: { mode: 'collection', unit: 'cause', pointer: '/structured_data/causes', minItems: 2, maxItems: 4 },
    /* 出自样张 layout-k3.html 左侧 WHY IT HURTS，自然纵横比约 0.68；一个 renderer 内部重复 cause */
    snippet: `<div class="pi-card" style="width:440px!important;min-height:650px!important" data-bind-root="collection">
  <div class="pi-pain-list">
    <div class="pi-pain-list-head">
      <div class="pi-pain-list-kicker">WHY IT HURTS</div>
      <div class="pi-pain-list-title">效果不稳的关键根因</div>
    </div>
    <div class="pi-pain-list-items">
      <div data-repeat-unit="cause">
        <span class="pi-cause-marker" data-field="code">CAUSE 01</span>
        <span>
          <span class="pi-cause-title" data-field="title">幻觉频发</span>
          <span class="pi-cause-detail" data-field="detail">长尾问题缺乏知识库接地，生成答案缺少可靠依据。</span>
        </span>
      </div>
    </div>
  </div>
</div>`
  },

  {
    name: 'pipeline-strip',
    group: 'flow-temporal',
    groupLabel: '流程与时序',
    description: 'One horizontal pipeline component that reflows three to seven bound steps while preserving the K3 process-band aspect ratio.',
    label: '自适应流水线横带',
    num: 92,
    variant: null,
    paperInkNative: true,
    frame: { width: 1050, height: 260, fit: 'fixed' },
    dataContract: { mode: 'collection', unit: 'step', pointer: '/structured_data/steps', minItems: 3, maxItems: 7 },
    /* 出自样张 layout-k3.html 右侧第一层 AGENT PIPELINE，自然横向比例约 4.04 */
    snippet: `<div class="pi-card" style="width:1050px!important;min-height:260px!important" data-bind-root="collection">
  <div class="pi-pipeline-strip">
    <div class="pi-pipeline-head">
      <div class="pi-pipeline-kicker">THE FIX · AGENT PIPELINE</div>
      <div class="pi-pipeline-title">Agent 基座平台</div>
    </div>
    <div class="pi-pipeline-steps">
      <div data-repeat-unit="step">
        <span class="pi-step-index" data-field="index">01</span>
        <span class="pi-step-title" data-field="title">意图解析</span>
        <span class="pi-step-code" data-field="code">PARSE</span>
      </div>
    </div>
  </div>
</div>`
  },

  {
    name: 'infra-strip',
    group: 'document-text',
    groupLabel: '文档与文本',
    description: 'Complete platform-base band: layer label plus three to six fine-line service glyphs between two rules.',
    label: '自适应基础设施横带',
    num: 93,
    variant: null,
    paperInkNative: true,
    frame: { width: 1050, height: 260, fit: 'fixed' },
    dataContract: { mode: 'collection', unit: 'item', pointer: '/structured_data/items', minItems: 3, maxItems: 6 },
    /* 出自样张 layout-k3.html 第二层 AGENT INFRA 边界带;补全为完整层带:上下规线 + 左层标 + 5 个
       细线图标能力件,图标画法对齐 H3 分层架构栈基础层(gAntenna / gRoute / gDial 同族) */
    snippet: `<div class="pi-card" style="width:1050px!important;min-height:260px!important">
<svg class="pi-art" viewBox="0 0 1050 260" xmlns="http://www.w3.org/2000/svg">
  <!-- 头部 mono 引题 -->
  <text x="40" y="36" font-family="var(--pi-mono)" font-size="9" letter-spacing="2.2" fill="var(--pi-ink-45)">AGENT INFRA · PLATFORM BASE</text>
  <text x="1010" y="36" font-family="var(--pi-mono)" font-size="8" letter-spacing="1.6" text-anchor="end" fill="var(--pi-ink-45)">5 SERVICES</text>

  <!-- 横带骨架:上下两条规线 + 左侧层标分隔线(画法对齐 H3 分层架构栈的层带) -->
  <line x1="40" y1="70" x2="1010" y2="70" stroke="var(--pi-ink)" stroke-width=".8" opacity=".45"/>
  <line x1="40" y1="210" x2="1010" y2="210" stroke="var(--pi-ink)" stroke-width=".8" opacity=".45"/>
  <line x1="240" y1="70" x2="240" y2="210" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>

  <!-- 左列层标 -->
  <text x="60" y="116" font-family="var(--pi-mono)" font-size="17" letter-spacing="2" fill="var(--pi-ink)">L4</text>
  <text x="60" y="142" font-family="var(--pi-sans)" font-weight="300" font-size="15" fill="var(--pi-ink)">基础层</text>
  <text x="60" y="160" font-family="var(--pi-mono)" font-size="7" letter-spacing="1.8" fill="var(--pi-ink-45)">INFRASTRUCTURE</text>
  <line x1="60" y1="176" x2="140" y2="176" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>

  <!-- 件 1 · 模型网关:主干 + 三向分支端点(H3 gAntenna 同族画法) -->
  <g>
    <line x1="294" y1="157" x2="294" y2="140" stroke="var(--pi-ink-80)" stroke-width="1"/>
    <line x1="294" y1="140" x2="278.6" y2="130.2" stroke="var(--pi-ink-80)" stroke-width=".9"/>
    <line x1="294" y1="140" x2="294" y2="127.4" stroke="var(--pi-ink-80)" stroke-width=".9"/>
    <line x1="294" y1="140" x2="309.4" y2="130.2" stroke="var(--pi-ink-80)" stroke-width=".9"/>
    <circle cx="294" cy="158.2" r="3.4" fill="none" stroke="var(--pi-ink-80)" stroke-width=".8"/>
    <circle cx="294" cy="158.2" r="1.2" fill="var(--pi-ink)"/>
    <circle cx="277.2" cy="129.5" r="3.4" fill="none" stroke="var(--pi-ink-80)" stroke-width=".8"/>
    <circle cx="277.2" cy="129.5" r="1.2" fill="var(--pi-ink)"/>
    <circle cx="294" cy="126" r="3.4" fill="none" stroke="var(--pi-ink-80)" stroke-width=".8"/>
    <circle cx="294" cy="126" r="1.2" fill="var(--pi-ink)"/>
    <circle cx="310.8" cy="129.5" r="3.4" fill="none" stroke="var(--pi-ink-80)" stroke-width=".8"/>
    <circle cx="310.8" cy="129.5" r="1.2" fill="var(--pi-ink)"/>
    <text x="330" y="133" font-family="var(--pi-mono)" font-size="7.5" letter-spacing="1.5" fill="rgba(25,25,23,.55)">GATEWAY</text>
    <text x="330" y="156" font-family="var(--pi-sans)" font-weight="300" font-size="12.5" fill="var(--pi-ink)">模型网关</text>
  </g>

  <!-- 件 2 · 向量检索:中心节点连四外围节点(H3 gRoute 同族画法) -->
  <g>
    <line x1="444" y1="140" x2="426" y2="130" stroke="var(--pi-ink-80)" stroke-width=".8"/>
    <line x1="444" y1="140" x2="462" y2="130" stroke="var(--pi-ink-80)" stroke-width=".8"/>
    <line x1="444" y1="140" x2="426" y2="150" stroke="var(--pi-ink-80)" stroke-width=".8"/>
    <line x1="444" y1="140" x2="462" y2="150" stroke="var(--pi-ink-80)" stroke-width=".8"/>
    <circle cx="444" cy="140" r="3.4" fill="none" stroke="var(--pi-ink-80)" stroke-width=".8"/>
    <circle cx="444" cy="140" r="1.2" fill="var(--pi-ink)"/>
    <circle cx="426" cy="130" r="3.4" fill="none" stroke="var(--pi-ink-80)" stroke-width=".8"/>
    <circle cx="426" cy="130" r="1.2" fill="var(--pi-ink)"/>
    <circle cx="462" cy="130" r="3.4" fill="none" stroke="var(--pi-ink-80)" stroke-width=".8"/>
    <circle cx="462" cy="130" r="1.2" fill="var(--pi-ink)"/>
    <circle cx="426" cy="150" r="3.4" fill="none" stroke="var(--pi-ink-80)" stroke-width=".8"/>
    <circle cx="426" cy="150" r="1.2" fill="var(--pi-ink)"/>
    <circle cx="462" cy="150" r="3.4" fill="none" stroke="var(--pi-ink-80)" stroke-width=".8"/>
    <circle cx="462" cy="150" r="1.2" fill="var(--pi-ink)"/>
    <line x1="426" y1="130" x2="462" y2="130" stroke="var(--pi-ink)" stroke-width=".5" opacity=".35" stroke-dasharray="3 4"/>
    <line x1="426" y1="150" x2="462" y2="150" stroke="var(--pi-ink)" stroke-width=".5" opacity=".35" stroke-dasharray="3 4"/>
    <text x="480" y="133" font-family="var(--pi-mono)" font-size="7.5" letter-spacing="1.5" fill="rgba(25,25,23,.55)">VECTOR</text>
    <text x="480" y="156" font-family="var(--pi-sans)" font-weight="300" font-size="12.5" fill="var(--pi-ink)">向量检索</text>
  </g>

  <!-- 件 3 · 提示词版本:文档 + 行线(H3 gDial 文档侧同族画法) -->
  <g>
    <rect x="584" y="126" width="18.2" height="23.8" fill="none" stroke="var(--pi-ink-80)" stroke-width=".9"/>
    <line x1="587.5" y1="131.6" x2="598.7" y2="131.6" stroke="var(--pi-ink)" stroke-width=".6" opacity=".6"/>
    <line x1="587.5" y1="136.6" x2="598.7" y2="136.6" stroke="var(--pi-ink)" stroke-width=".6" opacity=".6"/>
    <line x1="587.5" y1="141.6" x2="595.3" y2="141.6" stroke="var(--pi-ink)" stroke-width=".6" opacity=".6"/>
    <line x1="610" y1="145" x2="619" y2="154" stroke="var(--pi-ink-80)" stroke-width="1.3" stroke-linecap="round"/>
    <circle cx="606" cy="141" r="7.7" fill="none" stroke="var(--pi-ink-80)" stroke-width=".9"/>
    <text x="630" y="133" font-family="var(--pi-mono)" font-size="7.5" letter-spacing="1.5" fill="rgba(25,25,23,.55)">PROMPT OPS</text>
    <text x="630" y="156" font-family="var(--pi-sans)" font-weight="300" font-size="12.5" fill="var(--pi-ink)">提示词版本</text>
  </g>

  <!-- 件 4 · 评测台:刻度表盘 + 指针(icon-grid 表盘同族画法) -->
  <g>
    <path d="M 726 144 A 14 14 0 0 1 754 144" fill="none" stroke="var(--pi-ink-80)" stroke-width=".9"/>
    <line x1="732.9" y1="134.5" x2="731.2" y2="132.3" stroke="var(--pi-ink)" stroke-width=".5" opacity=".5"/>
    <line x1="736.2" y1="132.8" x2="735.4" y2="130.1" stroke="var(--pi-ink)" stroke-width=".5" opacity=".5"/>
    <line x1="740" y1="132.2" x2="740" y2="129.4" stroke="var(--pi-ink)" stroke-width=".5" opacity=".5"/>
    <line x1="743.8" y1="132.8" x2="744.6" y2="130.1" stroke="var(--pi-ink)" stroke-width=".5" opacity=".5"/>
    <line x1="747.1" y1="134.5" x2="748.8" y2="132.3" stroke="var(--pi-ink)" stroke-width=".5" opacity=".5"/>
    <line x1="740" y1="144" x2="747" y2="134.2" stroke="var(--pi-ink)" stroke-width="1.1"/>
    <circle cx="740" cy="144" r="1.3" fill="var(--pi-ink)"/>
    <text x="770" y="133" font-family="var(--pi-mono)" font-size="7.5" letter-spacing="1.5" fill="rgba(25,25,23,.55)">EVALUATION</text>
    <text x="770" y="156" font-family="var(--pi-sans)" font-weight="300" font-size="12.5" fill="var(--pi-ink)">评测台</text>
  </g>

  <!-- 件 5 · 可观测:表盘时钟(K3 infra 边界带 clock 记号同族画法) -->
  <g>
    <circle cx="894" cy="140" r="10" fill="none" stroke="var(--pi-ink-80)" stroke-width=".9"/>
    <line x1="894" y1="140" x2="894" y2="133" stroke="var(--pi-ink)" stroke-width=".8"/>
    <line x1="894" y1="140" x2="898.5" y2="141.4" stroke="var(--pi-ink)" stroke-width=".8"/>
    <line x1="894" y1="128" x2="894" y2="125" stroke="var(--pi-ink)" stroke-width=".6" opacity=".5"/>
    <line x1="906" y1="140" x2="909" y2="140" stroke="var(--pi-ink)" stroke-width=".6" opacity=".5"/>
    <line x1="894" y1="152" x2="894" y2="155" stroke="var(--pi-ink)" stroke-width=".6" opacity=".5"/>
    <line x1="882" y1="140" x2="879" y2="140" stroke="var(--pi-ink)" stroke-width=".6" opacity=".5"/>
    <text x="920" y="133" font-family="var(--pi-mono)" font-size="7.5" letter-spacing="1.5" fill="rgba(25,25,23,.55)">OBSERVE</text>
    <text x="920" y="156" font-family="var(--pi-sans)" font-weight="300" font-size="12.5" fill="var(--pi-ink)">可观测</text>
  </g>
</svg>
</div>`
  },

  /* BEGIN promoted catalog components v120 */
  {
    name: "mapping-arc-network",
    group: "relation-mapping",
    groupLabel: "关系与映射",
    description: "A two-sided mapping network with primary and shared curved links.",
    label: "映射弧线网",
    num: 94,
    variant: null,
    paperInkNative: true,
    frame: { width: 1100, height: 619, fit: 'fixed' },
    dataContract: {"mode":"record","unit":"node","pointer":"/structured_data","minItems":4,"maxItems":12},
    /* production promotion: Catalog new:0 → native.paper-ink.094.mapping-arc-network */
    snippet: `<div class="pi-card" data-bind-root="record" style="width:auto;min-height:0;overflow:visible"><svg class="pi-art" viewBox="0 0 1920 1080" width="1100" height="619">
    <g transform="translate(0 -34.7)">
      <text x="352" y="246" font-family="var(--pi-mono)" font-size="var(--type-meta)" letter-spacing="3" text-anchor="end" fill="rgba(25,25,23,.45)">
ATOMIC EVAL
      </text>
      <line x1="192" y1="258" x2="352" y2="258" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <text x="1404" y="246" font-family="var(--pi-mono)" font-size="var(--type-meta)" letter-spacing="3" fill="rgba(25,25,23,.45)">
CAPABILITY
      </text>
      <line x1="1404" y1="258" x2="1530" y2="258" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <line x1="360" y1="270" x2="360" y2="810" stroke="#191917" stroke-width="0.5" opacity="0.2" stroke-dasharray="2 6"/>
      <line x1="1380" y1="270" x2="1380" y2="810" stroke="#191917" stroke-width="0.5" opacity="0.2" stroke-dasharray="2 6"/>
      <path d="M 368 300 C 870 300, 870 290, 1372 290" fill="none" stroke="#191917" stroke-width="1.8" opacity="0.9"/>
      <circle cx="1372" cy="290" r="2.4" fill="#191917" opacity="0.6"/>
      <path d="M 368 684 C 870 684, 870 290, 1372 290" fill="none" stroke="#191917" stroke-width="1.1" opacity="0.4"/>
      <circle cx="1372" cy="290" r="2.4" fill="#191917" opacity="0.6"/>
      <path d="M 368 396 C 870 396, 870 386, 1372 386" fill="none" stroke="#191917" stroke-width="1.8" opacity="0.9"/>
      <circle cx="1372" cy="386" r="2.4" fill="#191917" opacity="0.6"/>
      <path d="M 368 588 C 870 588, 870 386, 1372 386" fill="none" stroke="#191917" stroke-width="1.1" opacity="0.4"/>
      <circle cx="1372" cy="386" r="2.4" fill="#191917" opacity="0.6"/>
      <path d="M 368 492 C 870 492, 870 482, 1372 482" fill="none" stroke="#191917" stroke-width="1.8" opacity="0.9"/>
      <circle cx="1372" cy="482" r="2.4" fill="#191917" opacity="0.6"/>
      <path d="M 368 780 C 870 780, 870 482, 1372 482" fill="none" stroke="#191917" stroke-width="1.1" opacity="0.4"/>
      <circle cx="1372" cy="482" r="2.4" fill="#191917" opacity="0.6"/>
      <path d="M 368 588 C 870 588, 870 578, 1372 578" fill="none" stroke="#191917" stroke-width="1.8" opacity="0.9"/>
      <circle cx="1372" cy="578" r="2.4" fill="#191917" opacity="0.6"/>
      <path d="M 368 300 C 870 300, 870 578, 1372 578" fill="none" stroke="#191917" stroke-width="1.1" opacity="0.4"/>
      <circle cx="1372" cy="578" r="2.4" fill="#191917" opacity="0.6"/>
      <path d="M 368 492 C 870 492, 870 578, 1372 578" fill="none" stroke="#191917" stroke-width="0.6" opacity="0.2"/>
      <circle cx="1372" cy="578" r="2.4" fill="#191917" opacity="0.6"/>
      <path d="M 368 684 C 870 684, 870 674, 1372 674" fill="none" stroke="#191917" stroke-width="1.8" opacity="0.9"/>
      <circle cx="1372" cy="674" r="2.4" fill="#191917" opacity="0.6"/>
      <path d="M 368 300 C 870 300, 870 674, 1372 674" fill="none" stroke="#191917" stroke-width="1.1" opacity="0.4"/>
      <circle cx="1372" cy="674" r="2.4" fill="#191917" opacity="0.6"/>
      <path d="M 368 588 C 870 588, 870 770, 1372 770" fill="none" stroke="#191917" stroke-width="1.8" opacity="0.9"/>
      <circle cx="1372" cy="770" r="2.4" fill="#191917" opacity="0.6"/>
      <path d="M 368 780 C 870 780, 870 770, 1372 770" fill="none" stroke="#191917" stroke-width="1.1" opacity="0.4"/>
      <circle cx="1372" cy="770" r="2.4" fill="#191917" opacity="0.6"/>
      <path d="M 368 396 C 870 396, 870 770, 1372 770" fill="none" stroke="#191917" stroke-width="0.6" opacity="0.2"/>
      <circle cx="1372" cy="770" r="2.4" fill="#191917" opacity="0.6"/>
      <rect x="355" y="295" width="10" height="10" fill="#DFE0D9" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <circle cx="360" cy="300" r="1.6" fill="#191917"/>
      <text x="342" y="302" font-family="var(--pi-mono)" font-size="var(--type-label)" letter-spacing="1.5" text-anchor="end" fill="#191917">
MMLU
      </text>
      <text x="342" y="322" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-meta)" text-anchor="end" fill="rgba(25,25,23,.45)">
综合知识
      </text>
      <rect x="355" y="391" width="10" height="10" fill="#DFE0D9" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <circle cx="360" cy="396" r="1.6" fill="#191917"/>
      <text x="342" y="398" font-family="var(--pi-mono)" font-size="var(--type-label)" letter-spacing="1.5" text-anchor="end" fill="#191917">
HUMANEVAL
      </text>
      <text x="342" y="418" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-meta)" text-anchor="end" fill="rgba(25,25,23,.45)">
代码生成
      </text>
      <rect x="355" y="487" width="10" height="10" fill="#DFE0D9" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <circle cx="360" cy="492" r="1.6" fill="#191917"/>
      <text x="342" y="494" font-family="var(--pi-mono)" font-size="var(--type-label)" letter-spacing="1.5" text-anchor="end" fill="#191917">
GSM8K
      </text>
      <text x="342" y="514" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-meta)" text-anchor="end" fill="rgba(25,25,23,.45)">
数学推理
      </text>
      <rect x="355" y="583" width="10" height="10" fill="#DFE0D9" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <circle cx="360" cy="588" r="1.6" fill="#191917"/>
      <text x="342" y="590" font-family="var(--pi-mono)" font-size="var(--type-label)" letter-spacing="1.5" text-anchor="end" fill="#191917">
BBH
      </text>
      <text x="342" y="610" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-meta)" text-anchor="end" fill="rgba(25,25,23,.45)">
复杂推理
      </text>
      <rect x="355" y="679" width="10" height="10" fill="#DFE0D9" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <circle cx="360" cy="684" r="1.6" fill="#191917"/>
      <text x="342" y="686" font-family="var(--pi-mono)" font-size="var(--type-label)" letter-spacing="1.5" text-anchor="end" fill="#191917">
TRUTHFULQA
      </text>
      <text x="342" y="706" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-meta)" text-anchor="end" fill="rgba(25,25,23,.45)">
事实准确
      </text>
      <rect x="355" y="775" width="10" height="10" fill="#DFE0D9" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <circle cx="360" cy="780" r="1.6" fill="#191917"/>
      <text x="342" y="782" font-family="var(--pi-mono)" font-size="var(--type-label)" letter-spacing="1.5" text-anchor="end" fill="#191917">
MATH
      </text>
      <text x="342" y="802" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-meta)" text-anchor="end" fill="rgba(25,25,23,.45)">
高难数学
      </text>
      <circle cx="1380" cy="290" r="7" fill="none" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <circle cx="1380" cy="290" r="2.4" fill="#191917"/>
      <text x="1404" y="292" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body)" fill="#191917">
语言理解 / 常识问答
      </text>
      <text x="1404" y="318" font-family="var(--pi-mono)" font-size="var(--type-meta)" letter-spacing="2" fill="rgba(25,25,23,.45)">
LANG
      </text>
      <circle cx="1380" cy="386" r="7" fill="none" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <circle cx="1380" cy="386" r="2.4" fill="#191917"/>
      <text x="1404" y="388" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body)" fill="#191917">
代码生成 / 编程能力
      </text>
      <text x="1404" y="414" font-family="var(--pi-mono)" font-size="var(--type-meta)" letter-spacing="2" fill="rgba(25,25,23,.45)">
CODE
      </text>
      <circle cx="1380" cy="482" r="7" fill="none" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <circle cx="1380" cy="482" r="2.4" fill="#191917"/>
      <text x="1404" y="484" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body)" fill="#191917">
数学推理 / 数值计算
      </text>
      <text x="1404" y="510" font-family="var(--pi-mono)" font-size="var(--type-meta)" letter-spacing="2" fill="rgba(25,25,23,.45)">
MATH
      </text>
      <circle cx="1380" cy="578" r="7" fill="none" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <circle cx="1380" cy="578" r="2.4" fill="#191917"/>
      <text x="1404" y="580" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body)" fill="#191917">
逻辑推理 / 多步推导
      </text>
      <text x="1404" y="606" font-family="var(--pi-mono)" font-size="var(--type-meta)" letter-spacing="2" fill="rgba(25,25,23,.45)">
LOGIC
      </text>
      <circle cx="1380" cy="674" r="7" fill="none" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <circle cx="1380" cy="674" r="2.4" fill="#191917"/>
      <text x="1404" y="676" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body)" fill="#191917">
事实准确 / 抗幻觉
      </text>
      <text x="1404" y="702" font-family="var(--pi-mono)" font-size="var(--type-meta)" letter-spacing="2" fill="rgba(25,25,23,.45)">
FACT
      </text>
      <circle cx="1380" cy="770" r="7" fill="none" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <circle cx="1380" cy="770" r="2.4" fill="#191917"/>
      <text x="1404" y="772" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body)" fill="#191917">
复杂推理 / 综合任务
      </text>
      <text x="1404" y="798" font-family="var(--pi-mono)" font-size="var(--type-meta)" letter-spacing="2" fill="rgba(25,25,23,.45)">
COMPLEX
      </text>
      <line x1="1380" y1="836" x2="1432" y2="836" stroke="#191917" stroke-width="1.8" opacity="0.9"/>
      <text x="1444" y="841" font-family="var(--pi-mono)" font-size="var(--type-micro-secondary)" letter-spacing="2" fill="rgba(25,25,23,.45)">
PRIMARY
      </text>
      <line x1="1550" y1="836" x2="1602" y2="836" stroke="#191917" stroke-width="1.1" opacity="0.4"/>
      <text x="1614" y="841" font-family="var(--pi-mono)" font-size="var(--type-micro-secondary)" letter-spacing="2" fill="rgba(25,25,23,.45)">
SHARED
      </text>
    </g>
</svg></div>`
  },

  {
    name: "weighted-arc-web",
    group: "relation-mapping",
    groupLabel: "关系与映射",
    description: "A fixed-geometry node row with weighted relationship arcs.",
    label: "权重弧网",
    num: 95,
    variant: null,
    paperInkNative: true,
    frame: { width: 1781, height: 1002, fit: 'fixed' },
    dataContract: {"mode":"record","unit":"node","pointer":"/structured_data","minItems":4,"maxItems":8},
    /* production promotion: Catalog new:1 → native.paper-ink.095.weighted-arc-web */
    snippet: `<div class="pi-card" data-bind-root="record" style="width:auto;min-height:0;overflow:visible"><svg class="pi-art" viewBox="0 0 1920 1080" width="1781" height="1002">
    <g transform="translate(0 -5.2)">
      <rect x="534" y="532" width="120" height="56" fill="rgba(255,255,255,.22)" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <rect x="538" y="536" width="112" height="48" fill="none" stroke="#191917" stroke-width="0.7" opacity="0.5"/>
      <text x="594" y="568" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body)" text-anchor="middle" fill="#191917">
The
      </text>
      <line x1="594" y1="588" x2="594" y2="597" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <text x="594" y="618" font-family="var(--pi-mono)" font-size="var(--type-meta)" text-anchor="middle" fill="rgba(25,25,23,.45)">
t0
      </text>
      <rect x="694" y="532" width="110" height="56" fill="rgba(255,255,255,.22)" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <rect x="698" y="536" width="102" height="48" fill="none" stroke="#191917" stroke-width="0.7" opacity="0.5"/>
      <text x="749" y="568" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body)" text-anchor="middle" fill="#191917">
cat
      </text>
      <line x1="749" y1="588" x2="749" y2="597" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <text x="749" y="618" font-family="var(--pi-mono)" font-size="var(--type-meta)" text-anchor="middle" fill="rgba(25,25,23,.45)">
t1
      </text>
      <rect x="844" y="532" width="96" height="56" fill="rgba(255,255,255,.22)" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <rect x="848" y="536" width="88" height="48" fill="none" stroke="#191917" stroke-width="0.7" opacity="0.5"/>
      <text x="892" y="568" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body)" text-anchor="middle" fill="#191917">
sat
      </text>
      <line x1="892" y1="588" x2="892" y2="597" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <text x="892" y="618" font-family="var(--pi-mono)" font-size="var(--type-meta)" text-anchor="middle" fill="rgba(25,25,23,.45)">
t2
      </text>
      <rect x="980" y="532" width="96" height="56" fill="rgba(255,255,255,.22)" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <rect x="984" y="536" width="88" height="48" fill="none" stroke="#191917" stroke-width="0.7" opacity="0.5"/>
      <text x="1028" y="568" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body)" text-anchor="middle" fill="#191917">
on
      </text>
      <line x1="1028" y1="588" x2="1028" y2="597" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <text x="1028" y="618" font-family="var(--pi-mono)" font-size="var(--type-meta)" text-anchor="middle" fill="rgba(25,25,23,.45)">
t3
      </text>
      <rect x="1116" y="532" width="110" height="56" fill="rgba(255,255,255,.22)" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <rect x="1120" y="536" width="102" height="48" fill="none" stroke="#191917" stroke-width="0.7" opacity="0.5"/>
      <text x="1171" y="568" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body)" text-anchor="middle" fill="#191917">
the
      </text>
      <line x1="1171" y1="588" x2="1171" y2="597" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <text x="1171" y="618" font-family="var(--pi-mono)" font-size="var(--type-meta)" text-anchor="middle" fill="rgba(25,25,23,.45)">
t4
      </text>
      <rect x="1266" y="532" width="120" height="56" fill="rgba(255,255,255,.22)" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <rect x="1270" y="536" width="112" height="48" fill="none" stroke="#191917" stroke-width="0.7" opacity="0.5"/>
      <text x="1326" y="568" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body)" text-anchor="middle" fill="#191917">
mat.
      </text>
      <line x1="1326" y1="588" x2="1326" y2="597" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <text x="1326" y="618" font-family="var(--pi-mono)" font-size="var(--type-meta)" text-anchor="middle" fill="rgba(25,25,23,.45)">
t5
      </text>
      <line x1="510" y1="636" x2="1410" y2="636" stroke="#191917" stroke-width="0.6" stroke-dasharray="2 5" opacity="0.3"/>
      <path d="M 594 532 Q 743 412 892 532" fill="none" stroke="#191917" stroke-width="0.6" opacity="0.2" stroke-linecap="round"/>
      <path d="M 892 532 Q 1031.5 448 1171 532" fill="none" stroke="#191917" stroke-width="0.6" opacity="0.2" stroke-linecap="round"/>
      <path d="M 749 532 Q 1037.5 192 1326 532" fill="none" stroke="#191917" stroke-width="0.6" opacity="0.2" stroke-linecap="round"/>
      <path d="M 1028 532 Q 1099.5 472 1171 532" fill="none" stroke="#191917" stroke-width="0.6" opacity="0.2" stroke-linecap="round"/>
      <path d="M 1171 532 Q 1248.5 460 1326 532" fill="none" stroke="#191917" stroke-width="0.6" opacity="0.2" stroke-linecap="round"/>
      <path d="M 594 532 Q 811 252 1028 532" fill="none" stroke="#191917" stroke-width="1.1" opacity="0.4" stroke-linecap="round"/>
      <path d="M 749 532 Q 960 312 1171 532" fill="none" stroke="#191917" stroke-width="1.1" opacity="0.4" stroke-linecap="round"/>
      <path d="M 594 532 Q 882.5 152 1171 532" fill="none" stroke="#191917" stroke-width="1.1" opacity="0.4" stroke-linecap="round"/>
      <circle cx="1028" cy="532" r="2" fill="#191917" opacity="0.5"/>
      <circle cx="1171" cy="532" r="2" fill="#191917" opacity="0.5"/>
      <text x="811" y="372" font-family="var(--pi-mono)" font-size="var(--type-meta)" text-anchor="middle" fill="rgba(25,25,23,.55)">
w ≈ 0.46 · MID
      </text>
      <path d="M 594 532 Q 671.5 312 749 532" fill="none" stroke="#191917" stroke-width="1.8" opacity="0.9" stroke-linecap="round"/>
      <circle cx="594" cy="532" r="2.4" fill="#191917" opacity="0.9"/>
      <circle cx="749" cy="532" r="2.4" fill="#191917" opacity="0.9"/>
      <text x="672" y="400" font-family="var(--pi-mono)" font-size="var(--type-label)" text-anchor="middle" fill="rgba(25,25,23,.8)">
w ≈ 0.87 · STRONG ATTEND
      </text>
      <line x1="672" y1="408" x2="672" y2="416" stroke="#191917" stroke-width="0.6" opacity="0.6"/>
      <path d="M 892 532 Q 1109 332 1326 532" fill="none" stroke="#191917" stroke-width="0.8" opacity="0.55" stroke-linecap="round" stroke-dasharray="5 5"/>
      <rect x="1090" y="412" width="40" height="36" fill="#DFE0D9" stroke="none"/>
      <line x1="1102" y1="424" x2="1116" y2="438" stroke="#191917" stroke-width="1.1" opacity="0.85"/>
      <line x1="1116" y1="424" x2="1102" y2="438" stroke="#191917" stroke-width="1.1" opacity="0.85"/>
      <line x1="1136" y1="430" x2="1204" y2="404" stroke="#191917" stroke-width="0.6" opacity="0.5"/>
      <circle cx="1136" cy="430" r="1.4" fill="#191917" opacity="0.5"/>
      <text x="1212" y="408" font-family="var(--pi-mono)" font-size="var(--type-meta)" text-anchor="start" fill="rgba(25,25,23,.7)">
w ≈ 0.04 · ATTENTION BREAK
      </text>
      <line x1="510" y1="652" x2="510" y2="660" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <text x="510" y="676" font-family="var(--pi-mono)" font-size="var(--type-micro-secondary)" text-anchor="middle" fill="rgba(25,25,23,.45)">
0
      </text>
      <line x1="600" y1="652" x2="600" y2="660" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <text x="600" y="676" font-family="var(--pi-mono)" font-size="var(--type-micro-secondary)" text-anchor="middle" fill="rgba(25,25,23,.45)">
10
      </text>
      <line x1="690" y1="652" x2="690" y2="660" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <text x="690" y="676" font-family="var(--pi-mono)" font-size="var(--type-micro-secondary)" text-anchor="middle" fill="rgba(25,25,23,.45)">
20
      </text>
      <line x1="780" y1="652" x2="780" y2="660" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <text x="780" y="676" font-family="var(--pi-mono)" font-size="var(--type-micro-secondary)" text-anchor="middle" fill="rgba(25,25,23,.45)">
30
      </text>
      <line x1="870" y1="652" x2="870" y2="660" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <text x="870" y="676" font-family="var(--pi-mono)" font-size="var(--type-micro-secondary)" text-anchor="middle" fill="rgba(25,25,23,.45)">
40
      </text>
      <line x1="960" y1="652" x2="960" y2="660" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <text x="960" y="676" font-family="var(--pi-mono)" font-size="var(--type-micro-secondary)" text-anchor="middle" fill="rgba(25,25,23,.45)">
50
      </text>
      <line x1="1050" y1="652" x2="1050" y2="660" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <text x="1050" y="676" font-family="var(--pi-mono)" font-size="var(--type-micro-secondary)" text-anchor="middle" fill="rgba(25,25,23,.45)">
60
      </text>
      <line x1="1140" y1="652" x2="1140" y2="660" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <text x="1140" y="676" font-family="var(--pi-mono)" font-size="var(--type-micro-secondary)" text-anchor="middle" fill="rgba(25,25,23,.45)">
70
      </text>
      <line x1="1230" y1="652" x2="1230" y2="660" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <text x="1230" y="676" font-family="var(--pi-mono)" font-size="var(--type-micro-secondary)" text-anchor="middle" fill="rgba(25,25,23,.45)">
80
      </text>
      <line x1="1320" y1="652" x2="1320" y2="660" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <text x="1320" y="676" font-family="var(--pi-mono)" font-size="var(--type-micro-secondary)" text-anchor="middle" fill="rgba(25,25,23,.45)">
90
      </text>
      <line x1="1410" y1="652" x2="1410" y2="660" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <text x="1410" y="676" font-family="var(--pi-mono)" font-size="var(--type-micro-secondary)" text-anchor="middle" fill="rgba(25,25,23,.45)">
100
      </text>
    </g>
</svg></div>`
  },

  {
    name: "three-way-radial",
    group: "hierarchy-structure",
    groupLabel: "层级与结构",
    description: "A central statement decomposed into exactly three radial branches.",
    label: "三向放射图",
    num: 96,
    variant: null,
    paperInkNative: true,
    frame: { width: 1443, height: 812, fit: 'fixed' },
    dataContract: {"mode":"collection","unit":"branch","pointer":"/structured_data","minItems":3,"maxItems":3},
    /* production promotion: Catalog new:2 → native.paper-ink.096.three-way-radial */
    snippet: `<div class="pi-card" data-bind-root="record" style="width:auto;min-height:0;overflow:visible"><svg class="pi-art" viewBox="0 0 1920 1080" width="1443" height="812">
    <g transform="translate(0 -55.2)">
      <rect x="770" y="462" width="380" height="116" fill="rgba(255,255,255,.22)" stroke="rgba(25,25,23,.8)" stroke-width="1.4"/>
      <rect x="775" y="467" width="370" height="106" fill="none" stroke="#191917" stroke-width="0.6" opacity="0.4"/>
      <text x="960" y="508" font-family="var(--pi-mono)" font-size="var(--type-subheading)" letter-spacing="3" text-anchor="middle" fill="#191917">
MODEL NODE
      </text>
      <text x="960" y="546" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body)" letter-spacing="4" text-anchor="middle" fill="#191917">
LLM 调用节点
      </text>
      <line x1="770" y1="520" x2="560" y2="520" stroke="#191917" stroke-width="0.8" opacity="0.5"/>
      <line x1="1150" y1="520" x2="1360" y2="520" stroke="#191917" stroke-width="0.8" opacity="0.5"/>
      <line x1="960" y1="578" x2="960" y2="700" stroke="#191917" stroke-width="0.8" opacity="0.5"/>
      <circle cx="560" cy="520" r="2.4" fill="#191917" opacity="0.7"/>
      <circle cx="1360" cy="520" r="2.4" fill="#191917" opacity="0.7"/>
      <circle cx="960" cy="700" r="2.4" fill="#191917" opacity="0.7"/>
      <text x="665" y="506" font-family="var(--pi-mono)" font-size="var(--type-meta)" letter-spacing="2" text-anchor="middle" fill="rgba(25,25,23,.45)">
IN
      </text>
      <text x="1255" y="506" font-family="var(--pi-mono)" font-size="var(--type-meta)" letter-spacing="2" text-anchor="middle" fill="rgba(25,25,23,.45)">
OUT
      </text>
      <text x="560" y="268" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-subheading)" text-anchor="end" fill="#191917">
输 入
      </text>
      <text x="560" y="296" font-family="var(--pi-mono)" font-size="var(--type-meta)" letter-spacing="2" text-anchor="end" fill="rgba(25,25,23,.45)">
INPUT
      </text>
      <line x1="560" y1="320" x2="560" y2="800" stroke="#191917" stroke-width="0.8" opacity="0.5"/>
      <line x1="560" y1="348" x2="542" y2="348" stroke="#191917" stroke-width="0.8" opacity="0.5"/>
      <text x="530" y="354" font-family="var(--pi-mono)" font-size="var(--type-body-small)" text-anchor="end" fill="#191917">
system_prompt
      </text>
      <text x="530" y="380" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body-small)" text-anchor="end" fill="rgba(25,25,23,.55)">
系统提示词与人设
      </text>
      <line x1="560" y1="464" x2="542" y2="464" stroke="#191917" stroke-width="0.8" opacity="0.5"/>
      <text x="530" y="470" font-family="var(--pi-mono)" font-size="var(--type-body-small)" text-anchor="end" fill="#191917">
user_message
      </text>
      <text x="530" y="496" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body-small)" text-anchor="end" fill="rgba(25,25,23,.55)">
用户消息与意图
      </text>
      <line x1="560" y1="580" x2="542" y2="580" stroke="#191917" stroke-width="0.8" opacity="0.5"/>
      <text x="530" y="586" font-family="var(--pi-mono)" font-size="var(--type-body-small)" text-anchor="end" fill="#191917">
context
      </text>
      <text x="530" y="612" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body-small)" text-anchor="end" fill="rgba(25,25,23,.55)">
上下文与检索片段
      </text>
      <line x1="560" y1="696" x2="542" y2="696" stroke="#191917" stroke-width="0.8" opacity="0.5"/>
      <text x="530" y="702" font-family="var(--pi-mono)" font-size="var(--type-body-small)" text-anchor="end" fill="#191917">
tools
      </text>
      <text x="530" y="728" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body-small)" text-anchor="end" fill="rgba(25,25,23,.55)">
可调用工具声明
      </text>
      <text x="1360" y="268" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-subheading)" fill="#191917">
输 出
      </text>
      <text x="1360" y="296" font-family="var(--pi-mono)" font-size="var(--type-meta)" letter-spacing="2" fill="rgba(25,25,23,.45)">
OUTPUT
      </text>
      <line x1="1360" y1="320" x2="1360" y2="860" stroke="#191917" stroke-width="0.8" opacity="0.5"/>
      <line x1="1360" y1="348" x2="1378" y2="348" stroke="#191917" stroke-width="0.8" opacity="0.5"/>
      <text x="1390" y="354" font-family="var(--pi-mono)" font-size="var(--type-body-small)" text-anchor="start" fill="#191917">
completion
      </text>
      <text x="1390" y="380" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body-small)" text-anchor="start" fill="rgba(25,25,23,.55)">
生成文本与回复
      </text>
      <line x1="1360" y1="448" x2="1378" y2="448" stroke="#191917" stroke-width="0.8" opacity="0.5"/>
      <text x="1390" y="454" font-family="var(--pi-mono)" font-size="var(--type-body-small)" text-anchor="start" fill="#191917">
tool_calls
      </text>
      <text x="1390" y="480" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body-small)" text-anchor="start" fill="rgba(25,25,23,.55)">
工具调用请求
      </text>
      <line x1="1360" y1="548" x2="1378" y2="548" stroke="#191917" stroke-width="0.8" opacity="0.5"/>
      <text x="1390" y="554" font-family="var(--pi-mono)" font-size="var(--type-body-small)" text-anchor="start" fill="#191917">
token_usage
      </text>
      <text x="1390" y="580" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body-small)" text-anchor="start" fill="rgba(25,25,23,.55)">
Token 用量统计
      </text>
      <line x1="1360" y1="648" x2="1378" y2="648" stroke="#191917" stroke-width="0.8" opacity="0.5"/>
      <text x="1390" y="654" font-family="var(--pi-mono)" font-size="var(--type-body-small)" text-anchor="start" fill="#191917">
finish_reason
      </text>
      <text x="1390" y="680" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body-small)" text-anchor="start" fill="rgba(25,25,23,.55)">
结束原因与状态
      </text>
      <line x1="1360" y1="748" x2="1378" y2="748" stroke="#191917" stroke-width="0.8" opacity="0.5"/>
      <text x="1390" y="754" font-family="var(--pi-mono)" font-size="var(--type-body-small)" text-anchor="start" fill="#191917">
logprobs
      </text>
      <text x="1390" y="780" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body-small)" text-anchor="start" fill="rgba(25,25,23,.55)">
对数概率回传
      </text>
      <line x1="1360" y1="848" x2="1378" y2="848" stroke="#191917" stroke-width="0.8" opacity="0.5"/>
      <text x="1390" y="854" font-family="var(--pi-mono)" font-size="var(--type-body-small)" text-anchor="start" fill="#191917">
latency
      </text>
      <text x="1390" y="880" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body-small)" text-anchor="start" fill="rgba(25,25,23,.55)">
首字与总耗时
      </text>
      <text x="984" y="668" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-subheading)" fill="#191917">
参 数
      </text>
      <text x="984" y="696" font-family="var(--pi-mono)" font-size="var(--type-meta)" letter-spacing="2" fill="rgba(25,25,23,.45)">
PARAMS
      </text>
      <line x1="620" y1="700" x2="1300" y2="700" stroke="#191917" stroke-width="0.8" opacity="0.5"/>
      <line x1="660" y1="700" x2="660" y2="716" stroke="#191917" stroke-width="0.8" opacity="0.5"/>
      <text x="660" y="744" font-family="var(--pi-mono)" font-size="var(--type-body-small)" text-anchor="middle" fill="#191917">
temperature
      </text>
      <text x="660" y="772" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body-small)" text-anchor="middle" fill="rgba(25,25,23,.55)">
采样温度
      </text>
      <line x1="810" y1="700" x2="810" y2="716" stroke="#191917" stroke-width="0.8" opacity="0.5"/>
      <text x="810" y="744" font-family="var(--pi-mono)" font-size="var(--type-body-small)" text-anchor="middle" fill="#191917">
top_p
      </text>
      <text x="810" y="772" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body-small)" text-anchor="middle" fill="rgba(25,25,23,.55)">
核采样阈值
      </text>
      <line x1="960" y1="700" x2="960" y2="716" stroke="#191917" stroke-width="0.8" opacity="0.5"/>
      <text x="960" y="744" font-family="var(--pi-mono)" font-size="var(--type-body-small)" text-anchor="middle" fill="#191917">
max_tokens
      </text>
      <text x="960" y="772" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body-small)" text-anchor="middle" fill="rgba(25,25,23,.55)">
最大生成长度
      </text>
      <line x1="1110" y1="700" x2="1110" y2="716" stroke="#191917" stroke-width="0.8" opacity="0.5"/>
      <text x="1110" y="744" font-family="var(--pi-mono)" font-size="var(--type-body-small)" text-anchor="middle" fill="#191917">
frequency_penalty
      </text>
      <text x="1110" y="772" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body-small)" text-anchor="middle" fill="rgba(25,25,23,.55)">
频率惩罚
      </text>
      <line x1="1260" y1="700" x2="1260" y2="716" stroke="#191917" stroke-width="0.8" opacity="0.5"/>
      <text x="1260" y="744" font-family="var(--pi-mono)" font-size="var(--type-body-small)" text-anchor="middle" fill="#191917">
stop
      </text>
      <text x="1260" y="772" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body-small)" text-anchor="middle" fill="rgba(25,25,23,.55)">
停止序列
      </text>
    </g>
</svg></div>`
  },


  {
    name: "three-principles-radial",
    group: "hierarchy-structure",
    groupLabel: "层级与结构",
    description: "A central design intent decomposed into exactly three named principles with supporting explanations.",
    label: "三原则放射图",
    num: 108,
    variant: null,
    paperInkNative: true,
    frame: { width: 1443, height: 493, fit: 'fixed' },
    dataContract: {"mode":"collection","unit":"branch","pointer":"/structured_data","minItems":3,"maxItems":3},
    /* formal example P03 → native.paper-ink.108.three-principles-radial;坐标与 G5 整页帧同系,viewBox 即主体内容带(框顶 304 → 末行基线 776+下行),分支序号小字行已删,01/02 标题墨迹中心对齐圆点(基线 396,偏差 -0.8px) */
    snippet: `<div class="pi-card" data-bind-root="record" data-formal-example="P03" style="width:auto;min-height:0;overflow:visible"><svg class="pi-art" viewBox="252 304 1400 478" width="1443" height="493" role="img" aria-label="三项原则围绕一个中心意图展开">
    <g>
      <line x1="478" y1="386" x2="760" y2="386" stroke="rgba(25,25,23,.45)" stroke-width="1" stroke-dasharray="3 5"/>
      <line x1="1160" y1="386" x2="1442" y2="386" stroke="rgba(25,25,23,.45)" stroke-width="1" stroke-dasharray="3 5"/>
      <line x1="960" y1="468" x2="960" y2="656" stroke="rgba(25,25,23,.45)" stroke-width="1" stroke-dasharray="3 5"/>
      <circle cx="760" cy="386" r="3.2" fill="#191917"/><circle cx="1160" cy="386" r="3.2" fill="#191917"/><circle cx="960" cy="468" r="3.2" fill="#191917"/>
      <rect x="760" y="304" width="400" height="164" fill="rgba(255,255,255,.22)" stroke="rgba(25,25,23,.8)" stroke-width="1.4"/>
      <rect x="767" y="311" width="386" height="150" fill="none" stroke="#191917" stroke-width="0.6" opacity=".35"/>
      <text x="960" y="354" font-family="var(--pi-mono)" font-size="var(--type-label)" letter-spacing="2.8" text-anchor="middle" fill="rgba(25,25,23,.7)">DESIGN INTENT</text>
      <text x="960" y="406" font-family="var(--pi-sans)" font-size="var(--type-heading)" font-weight="300" text-anchor="middle" fill="#191917">一页一个重心</text>
      <text x="960" y="440" font-family="var(--pi-sans)" font-size="var(--type-body-small)" font-weight="300" text-anchor="middle" fill="rgba(25,25,23,.7)">先决定观众应该先看见什么</text>
      <text x="450" y="396" font-family="var(--pi-sans)" font-size="var(--type-subheading)" font-weight="300" text-anchor="end" fill="#191917">内容先于装饰</text>
      <text x="450" y="434" font-family="var(--pi-sans)" font-size="var(--type-body-small)" font-weight="300" text-anchor="end" fill="rgba(25,25,23,.7)">先回答这页要讲什么，</text>
      <text x="450" y="462" font-family="var(--pi-sans)" font-size="var(--type-body-small)" font-weight="300" text-anchor="end" fill="rgba(25,25,23,.7)">再决定它需要什么形式。</text>
      <text x="1470" y="396" font-family="var(--pi-sans)" font-size="var(--type-subheading)" font-weight="300" fill="#191917">颜色必须有语义</text>
      <text x="1470" y="434" font-family="var(--pi-sans)" font-size="var(--type-body-small)" font-weight="300" fill="rgba(25,25,23,.7)">大面积保持克制，</text>
      <text x="1470" y="462" font-family="var(--pi-sans)" font-size="var(--type-body-small)" font-weight="300" fill="rgba(25,25,23,.7)">强调只服务关键信息。</text>
      <text x="960" y="710" font-family="var(--pi-sans)" font-size="var(--type-subheading)" font-weight="300" text-anchor="middle" fill="#191917">密度服从层级</text>
      <text x="960" y="748" font-family="var(--pi-sans)" font-size="var(--type-body-small)" font-weight="300" text-anchor="middle" fill="rgba(25,25,23,.7)">该留白的留白，该密集的有序；</text>
      <text x="960" y="776" font-family="var(--pi-sans)" font-size="var(--type-body-small)" font-weight="300" text-anchor="middle" fill="rgba(25,25,23,.7)">让信息有进入和停留的位置。</text>
      <circle cx="478" cy="386" r="18" fill="#DFE0D9" stroke="#191917" stroke-width="1.1"/><text x="478" y="391" font-family="var(--pi-mono)" font-size="var(--type-meta)" text-anchor="middle" fill="#191917">01</text>
      <circle cx="1442" cy="386" r="18" fill="#DFE0D9" stroke="#191917" stroke-width="1.1"/><text x="1442" y="391" font-family="var(--pi-mono)" font-size="var(--type-meta)" text-anchor="middle" fill="#191917">02</text>
      <circle cx="960" cy="656" r="18" fill="#DFE0D9" stroke="#191917" stroke-width="1.1"/><text x="960" y="661" font-family="var(--pi-mono)" font-size="var(--type-meta)" text-anchor="middle" fill="#191917">03</text>
    </g>
</svg></div>`
  },

  {
    name: "nested-frames",
    group: "hierarchy-structure",
    groupLabel: "层级与结构",
    description: "Three to five nested frames for containment and zoom levels.",
    label: "嵌套框",
    num: 97,
    variant: null,
    paperInkNative: true,
    frame: { width: 1476, height: 830, fit: 'fixed' },
    dataContract: {"mode":"collection","unit":"layer","pointer":"/structured_data","minItems":3,"maxItems":5},
    /* production promotion: Catalog new:3 → native.paper-ink.097.nested-frames */
    snippet: `<div class="pi-card" data-bind-root="record" style="width:auto;min-height:0;overflow:visible"><svg class="pi-art" viewBox="0 0 1920 1080" width="1476" height="830">
  <defs>

        <pattern id="h2-hatch16" width="8" height="8" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="8" stroke="#191917" stroke-width=".7" opacity=".35"/>
        </pattern>

  </defs>
    <g transform="translate(0 -13.7)">
      <line x1="460" y1="520" x2="1100" y2="520" stroke="#191917" stroke-width="0.5" opacity="0.22" stroke-dasharray="2 6"/>
      <line x1="780" y1="200" x2="780" y2="840" stroke="#191917" stroke-width="0.5" opacity="0.22" stroke-dasharray="2 6"/>
      <line x1="475" y1="224" x2="493" y2="224" stroke="#191917" stroke-width="0.8" opacity="0.4"/>
      <line x1="484" y1="215" x2="484" y2="233" stroke="#191917" stroke-width="0.8" opacity="0.4"/>
      <line x1="1067" y1="224" x2="1085" y2="224" stroke="#191917" stroke-width="0.8" opacity="0.4"/>
      <line x1="1076" y1="215" x2="1076" y2="233" stroke="#191917" stroke-width="0.8" opacity="0.4"/>
      <line x1="475" y1="816" x2="493" y2="816" stroke="#191917" stroke-width="0.8" opacity="0.4"/>
      <line x1="484" y1="807" x2="484" y2="825" stroke="#191917" stroke-width="0.8" opacity="0.4"/>
      <line x1="1067" y1="816" x2="1085" y2="816" stroke="#191917" stroke-width="0.8" opacity="0.4"/>
      <line x1="1076" y1="807" x2="1076" y2="825" stroke="#191917" stroke-width="0.8" opacity="0.4"/>
      <rect x="514" y="254" width="532" height="532" fill="none" stroke="#191917" stroke-width="1.1" opacity="0.5" stroke-dasharray="3 6"/>
      <rect x="578" y="318" width="404" height="404" fill="none" stroke="#191917" stroke-width="1.1" opacity="0.6" stroke-dasharray="6 4"/>
      <rect x="642" y="382" width="276" height="276" fill="none" stroke="#191917" stroke-width="1.2" opacity="0.7" stroke-dasharray="none"/>
      <rect x="706" y="446" width="148" height="148" fill="url(#h2-hatch16)" stroke="#191917" stroke-width="1.4" opacity="0.9" stroke-dasharray="none"/>
      <circle cx="780" cy="520" r="3" fill="#191917"/>
      <circle cx="780" cy="520" r="8" fill="none" stroke="#191917" stroke-width="0.8" opacity="0.6"/>
      <circle cx="1046" cy="254" r="5" fill="none" stroke="rgba(25,25,23,.8)" stroke-width="1"/>
      <circle cx="1046" cy="254" r="1.8" fill="#191917"/>
      <path d="M 1046 254 L 1116 254 L 1160 280" fill="none" stroke="#191917" stroke-width="0.7" opacity="0.45" stroke-dasharray="3 5"/>
      <circle cx="1160" cy="280" r="2.4" fill="#191917" opacity="0.6"/>
      <line x1="1160" y1="280" x2="1200" y2="280" stroke="#191917" stroke-width="0.7" opacity="0.45"/>
      <text x="1210" y="278" font-family="var(--pi-mono)" font-size="var(--type-body-small)" letter-spacing="2" fill="#191917">
04 · OUTCOME
      </text>
      <text x="1210" y="312" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body)" fill="#191917">
业务结果
      </text>
      <text x="1210" y="340" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body-small)" fill="rgba(25,25,23,.7)">
（最终的产出影响）
      </text>
      <circle cx="982" cy="318" r="5" fill="none" stroke="rgba(25,25,23,.8)" stroke-width="1"/>
      <circle cx="982" cy="318" r="1.8" fill="#191917"/>
      <path d="M 982 318 L 1052 318 L 1160 430" fill="none" stroke="#191917" stroke-width="0.7" opacity="0.45" stroke-dasharray="3 5"/>
      <circle cx="1160" cy="430" r="2.4" fill="#191917" opacity="0.6"/>
      <line x1="1160" y1="430" x2="1200" y2="430" stroke="#191917" stroke-width="0.7" opacity="0.45"/>
      <text x="1210" y="428" font-family="var(--pi-mono)" font-size="var(--type-body-small)" letter-spacing="2" fill="#191917">
03 · TASK
      </text>
      <text x="1210" y="462" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body)" fill="#191917">
任务过程
      </text>
      <text x="1210" y="490" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body-small)" fill="rgba(25,25,23,.7)">
（这一整轮执行）
      </text>
      <circle cx="918" cy="382" r="5" fill="none" stroke="rgba(25,25,23,.8)" stroke-width="1"/>
      <circle cx="918" cy="382" r="1.8" fill="#191917"/>
      <path d="M 918 382 L 988 382 L 1160 580" fill="none" stroke="#191917" stroke-width="0.7" opacity="0.45" stroke-dasharray="3 5"/>
      <circle cx="1160" cy="580" r="2.4" fill="#191917" opacity="0.6"/>
      <line x1="1160" y1="580" x2="1200" y2="580" stroke="#191917" stroke-width="0.7" opacity="0.45"/>
      <text x="1210" y="578" font-family="var(--pi-mono)" font-size="var(--type-body-small)" letter-spacing="2" fill="#191917">
02 · SESSION
      </text>
      <text x="1210" y="612" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body)" fill="#191917">
单次会话
      </text>
      <text x="1210" y="640" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body-small)" fill="rgba(25,25,23,.7)">
（这一段对话）
      </text>
      <circle cx="854" cy="446" r="5" fill="none" stroke="rgba(25,25,23,.8)" stroke-width="1"/>
      <circle cx="854" cy="446" r="1.8" fill="#191917"/>
      <path d="M 854 446 L 924 446 L 1160 730" fill="none" stroke="#191917" stroke-width="0.7" opacity="0.45" stroke-dasharray="3 5"/>
      <circle cx="1160" cy="730" r="2.4" fill="#191917" opacity="0.6"/>
      <line x1="1160" y1="730" x2="1200" y2="730" stroke="#191917" stroke-width="0.7" opacity="0.45"/>
      <text x="1210" y="728" font-family="var(--pi-mono)" font-size="var(--type-body-small)" letter-spacing="2" fill="#191917">
01 · CALL
      </text>
      <text x="1210" y="762" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body)" fill="#191917">
单轮调用
      </text>
      <text x="1210" y="790" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body-small)" fill="rgba(25,25,23,.7)">
（这一次请求）
      </text>
    </g>
</svg></div>`
  },

  {
    name: "ranking-bars",
    group: "metric-data",
    groupLabel: "指标与数据",
    description: "Three to eight ranked items rendered as specimen bars.",
    label: "排行柱图",
    num: 98,
    variant: null,
    paperInkNative: true,
    frame: { width: 972, height: 547, fit: 'fixed' },
    dataContract: {"mode":"collection","unit":"ranked-item","pointer":"/structured_data","minItems":3,"maxItems":8},
    /* production promotion: Catalog new:4 → native.paper-ink.098.ranking-bars */
    snippet: `<div class="pi-card" data-bind-root="record" style="width:auto;min-height:0;overflow:visible"><svg class="pi-art" viewBox="0 0 1920 1080" width="972" height="547">
  <defs>

        <pattern id="c7-hatch30" width="7" height="7" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="7" stroke="#191917" stroke-width=".7" opacity=".35"/>
        </pattern>

  </defs>
    <g transform="translate(0 -24.2)">
      <line x1="192" y1="820" x2="200" y2="820" stroke="#191917" stroke-width="0.9" opacity="0.6"/>
      <text x="184" y="824" font-family="var(--pi-mono)" font-size="var(--type-micro-secondary)" text-anchor="end" fill="rgba(25,25,23,.45)">
0
      </text>
      <line x1="200" y1="712" x2="1720" y2="712" stroke="#191917" stroke-width="0.5" opacity="0.12" stroke-dasharray="2 6"/>
      <line x1="192" y1="712" x2="200" y2="712" stroke="#191917" stroke-width="0.9" opacity="0.6"/>
      <text x="184" y="716" font-family="var(--pi-mono)" font-size="var(--type-micro-secondary)" text-anchor="end" fill="rgba(25,25,23,.45)">
100
      </text>
      <line x1="200" y1="604" x2="1720" y2="604" stroke="#191917" stroke-width="0.5" opacity="0.12" stroke-dasharray="2 6"/>
      <line x1="192" y1="604" x2="200" y2="604" stroke="#191917" stroke-width="0.9" opacity="0.6"/>
      <text x="184" y="608" font-family="var(--pi-mono)" font-size="var(--type-micro-secondary)" text-anchor="end" fill="rgba(25,25,23,.45)">
200
      </text>
      <line x1="200" y1="496" x2="1720" y2="496" stroke="#191917" stroke-width="0.5" opacity="0.12" stroke-dasharray="2 6"/>
      <line x1="192" y1="496" x2="200" y2="496" stroke="#191917" stroke-width="0.9" opacity="0.6"/>
      <text x="184" y="500" font-family="var(--pi-mono)" font-size="var(--type-micro-secondary)" text-anchor="end" fill="rgba(25,25,23,.45)">
300
      </text>
      <line x1="200" y1="388" x2="1720" y2="388" stroke="#191917" stroke-width="0.5" opacity="0.12" stroke-dasharray="2 6"/>
      <line x1="192" y1="388" x2="200" y2="388" stroke="#191917" stroke-width="0.9" opacity="0.6"/>
      <text x="184" y="392" font-family="var(--pi-mono)" font-size="var(--type-micro-secondary)" text-anchor="end" fill="rgba(25,25,23,.45)">
400
      </text>
      <line x1="200" y1="300" x2="200" y2="820" stroke="#191917" stroke-width="1" opacity="0.6"/>
      <text x="184" y="290" font-family="var(--pi-mono)" font-size="var(--type-micro-secondary)" letter-spacing="2" text-anchor="end" fill="rgba(25,25,23,.45)">
综 合 分 · SCORE
      </text>
      <line x1="200" y1="820" x2="1720" y2="820" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <line x1="300" y1="820" x2="300" y2="830" stroke="#191917" stroke-width="1" opacity="0.7"/>
      <line x1="395" y1="820" x2="395" y2="826" stroke="#191917" stroke-width="0.5" opacity="0.4"/>
      <line x1="490" y1="820" x2="490" y2="830" stroke="#191917" stroke-width="1" opacity="0.7"/>
      <line x1="585" y1="820" x2="585" y2="826" stroke="#191917" stroke-width="0.5" opacity="0.4"/>
      <line x1="680" y1="820" x2="680" y2="830" stroke="#191917" stroke-width="1" opacity="0.7"/>
      <line x1="775" y1="820" x2="775" y2="826" stroke="#191917" stroke-width="0.5" opacity="0.4"/>
      <line x1="870" y1="820" x2="870" y2="830" stroke="#191917" stroke-width="1" opacity="0.7"/>
      <line x1="965" y1="820" x2="965" y2="826" stroke="#191917" stroke-width="0.5" opacity="0.4"/>
      <line x1="1060" y1="820" x2="1060" y2="830" stroke="#191917" stroke-width="1" opacity="0.7"/>
      <line x1="1155" y1="820" x2="1155" y2="826" stroke="#191917" stroke-width="0.5" opacity="0.4"/>
      <line x1="1250" y1="820" x2="1250" y2="830" stroke="#191917" stroke-width="1" opacity="0.7"/>
      <line x1="1345" y1="820" x2="1345" y2="826" stroke="#191917" stroke-width="0.5" opacity="0.4"/>
      <line x1="1440" y1="820" x2="1440" y2="830" stroke="#191917" stroke-width="1" opacity="0.7"/>
      <line x1="1535" y1="820" x2="1535" y2="826" stroke="#191917" stroke-width="0.5" opacity="0.4"/>
      <line x1="1630" y1="820" x2="1630" y2="830" stroke="#191917" stroke-width="1" opacity="0.7"/>
      <rect x="268" y="357.76" width="64" height="462.24" fill="url(#c7-hatch30)" stroke="rgba(25,25,23,.8)" stroke-width="1.4"/>
      <text x="300" y="343.76" font-family="var(--pi-mono)" font-size="var(--type-body-small)" letter-spacing="1" text-anchor="middle" fill="#191917">
428
      </text>
      <text x="300" y="854" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body-small)" text-anchor="middle" fill="#191917">
GLM-X
      </text>
      <text x="300" y="876" font-family="var(--pi-mono)" font-size="var(--type-micro-secondary)" letter-spacing="2" text-anchor="middle" fill="rgba(25,25,23,.45)">
MODEL-01
      </text>
      <rect x="458" y="397.71999999999997" width="64" height="422.28000000000003" fill="none" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <text x="490" y="383.71999999999997" font-family="var(--pi-mono)" font-size="var(--type-body-small)" letter-spacing="1" text-anchor="middle" fill="#191917">
391
      </text>
      <text x="490" y="854" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body-small)" text-anchor="middle" fill="#191917">
GPT-X
      </text>
      <text x="490" y="876" font-family="var(--pi-mono)" font-size="var(--type-micro-secondary)" letter-spacing="2" text-anchor="middle" fill="rgba(25,25,23,.45)">
MODEL-02
      </text>
      <rect x="648" y="436.59999999999997" width="64" height="383.40000000000003" fill="none" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <text x="680" y="422.59999999999997" font-family="var(--pi-mono)" font-size="var(--type-body-small)" letter-spacing="1" text-anchor="middle" fill="#191917">
355
      </text>
      <text x="680" y="854" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body-small)" text-anchor="middle" fill="#191917">
Claude-X
      </text>
      <text x="680" y="876" font-family="var(--pi-mono)" font-size="var(--type-micro-secondary)" letter-spacing="2" text-anchor="middle" fill="rgba(25,25,23,.45)">
MODEL-03
      </text>
      <rect x="838" y="498.15999999999997" width="64" height="321.84000000000003" fill="none" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <text x="870" y="484.15999999999997" font-family="var(--pi-mono)" font-size="var(--type-body-small)" letter-spacing="1" text-anchor="middle" fill="#191917">
298
      </text>
      <text x="870" y="854" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body-small)" text-anchor="middle" fill="#191917">
Llama-X
      </text>
      <text x="870" y="876" font-family="var(--pi-mono)" font-size="var(--type-micro-secondary)" letter-spacing="2" text-anchor="middle" fill="rgba(25,25,23,.45)">
MODEL-04
      </text>
      <rect x="1028" y="534.88" width="64" height="285.12" fill="none" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <text x="1060" y="520.88" font-family="var(--pi-mono)" font-size="var(--type-body-small)" letter-spacing="1" text-anchor="middle" fill="#191917">
264
      </text>
      <text x="1060" y="854" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body-small)" text-anchor="middle" fill="#191917">
Gemini-X
      </text>
      <text x="1060" y="876" font-family="var(--pi-mono)" font-size="var(--type-micro-secondary)" letter-spacing="2" text-anchor="middle" fill="rgba(25,25,23,.45)">
MODEL-05
      </text>
      <rect x="1218" y="574.8399999999999" width="64" height="245.16000000000003" fill="none" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <text x="1250" y="560.8399999999999" font-family="var(--pi-mono)" font-size="var(--type-body-small)" letter-spacing="1" text-anchor="middle" fill="#191917">
227
      </text>
      <text x="1250" y="854" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body-small)" text-anchor="middle" fill="#191917">
Mistral-X
      </text>
      <text x="1250" y="876" font-family="var(--pi-mono)" font-size="var(--type-micro-secondary)" letter-spacing="2" text-anchor="middle" fill="rgba(25,25,23,.45)">
MODEL-06
      </text>
      <rect x="1408" y="608.3199999999999" width="64" height="211.68" fill="none" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <text x="1440" y="594.3199999999999" font-family="var(--pi-mono)" font-size="var(--type-body-small)" letter-spacing="1" text-anchor="middle" fill="#191917">
196
      </text>
      <text x="1440" y="854" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body-small)" text-anchor="middle" fill="#191917">
DeepSeek-X
      </text>
      <text x="1440" y="876" font-family="var(--pi-mono)" font-size="var(--type-micro-secondary)" letter-spacing="2" text-anchor="middle" fill="rgba(25,25,23,.45)">
MODEL-07
      </text>
      <rect x="1598" y="638.56" width="64" height="181.44" fill="none" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <text x="1630" y="624.56" font-family="var(--pi-mono)" font-size="var(--type-body-small)" letter-spacing="1" text-anchor="middle" fill="#191917">
168
      </text>
      <text x="1630" y="854" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body-small)" text-anchor="middle" fill="#191917">
Qwen-X
      </text>
      <text x="1630" y="876" font-family="var(--pi-mono)" font-size="var(--type-micro-secondary)" letter-spacing="2" text-anchor="middle" fill="rgba(25,25,23,.45)">
MODEL-08
      </text>
      <line x1="300" y1="298" x2="300" y2="317.76" stroke="#191917" stroke-width="0.7" opacity="0.45" stroke-dasharray="3 5"/>
      <circle cx="300" cy="303" r="2.2" fill="#191917" opacity="0.6"/>
      <rect x="194" y="180" width="212" height="118" fill="rgba(255,255,255,.22)" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <rect x="199" y="185" width="202" height="108" fill="none" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <text x="208" y="204" font-family="var(--pi-mono)" font-size="var(--type-meta)" letter-spacing="2" fill="#191917">
01
      </text>
      <text x="392" y="204" font-family="var(--pi-mono)" font-size="var(--type-micro-secondary)" letter-spacing="1" text-anchor="end" fill="rgba(25,25,23,.45)">
REASONING
      </text>
      <circle cx="300" cy="230" r="14" stroke="rgba(25,25,23,.8)" stroke-width="1.1" fill="none"/>
      <path d="M 278 258 Q 300 238 322 258" stroke="rgba(25,25,23,.8)" stroke-width="1.1" fill="none"/>
      <text x="300" y="279" font-family="var(--pi-mono)" font-size="var(--type-micro-secondary)" text-anchor="middle" fill="rgba(25,25,23,.45)">
SAMPLE · MODEL-01
      </text>
      <line x1="490" y1="298" x2="490" y2="357.71999999999997" stroke="#191917" stroke-width="0.7" opacity="0.45" stroke-dasharray="3 5"/>
      <circle cx="490" cy="303" r="2.2" fill="#191917" opacity="0.6"/>
      <rect x="384" y="180" width="212" height="118" fill="rgba(255,255,255,.22)" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <rect x="389" y="185" width="202" height="108" fill="none" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <text x="398" y="204" font-family="var(--pi-mono)" font-size="var(--type-meta)" letter-spacing="2" fill="#191917">
02
      </text>
      <text x="582" y="204" font-family="var(--pi-mono)" font-size="var(--type-micro-secondary)" letter-spacing="1" text-anchor="end" fill="rgba(25,25,23,.45)">
CODING
      </text>
      <ellipse cx="490" cy="234" rx="13" ry="14" stroke="rgba(25,25,23,.8)" stroke-width="1.1" fill="none"/>
      <line x1="472" y1="226" x2="508" y2="226" stroke="rgba(25,25,23,.8)" stroke-width="1.1" fill="none"/>
      <path d="M 470 258 Q 490 242 510 258" stroke="rgba(25,25,23,.8)" stroke-width="1.1" fill="none"/>
      <text x="490" y="279" font-family="var(--pi-mono)" font-size="var(--type-micro-secondary)" text-anchor="middle" fill="rgba(25,25,23,.45)">
SAMPLE · MODEL-02
      </text>
      <line x1="680" y1="298" x2="680" y2="396.59999999999997" stroke="#191917" stroke-width="0.7" opacity="0.45" stroke-dasharray="3 5"/>
      <circle cx="680" cy="303" r="2.2" fill="#191917" opacity="0.6"/>
      <rect x="574" y="180" width="212" height="118" fill="rgba(255,255,255,.22)" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <rect x="579" y="185" width="202" height="108" fill="none" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <text x="588" y="204" font-family="var(--pi-mono)" font-size="var(--type-meta)" letter-spacing="2" fill="#191917">
03
      </text>
      <text x="772" y="204" font-family="var(--pi-mono)" font-size="var(--type-micro-secondary)" letter-spacing="1" text-anchor="end" fill="rgba(25,25,23,.45)">
MATH
      </text>
      <circle cx="680" cy="230" r="14" stroke="rgba(25,25,23,.8)" stroke-width="1.1" fill="none"/>
      <rect x="668" y="226" width="10" height="7" stroke="rgba(25,25,23,.8)" stroke-width="1.1" fill="none"/>
      <rect x="682" y="226" width="10" height="7" stroke="rgba(25,25,23,.8)" stroke-width="1.1" fill="none"/>
      <line x1="678" y1="229" x2="682" y2="229" stroke="rgba(25,25,23,.8)" stroke-width="1.1" fill="none"/>
      <path d="M 658 258 Q 680 238 702 258" stroke="rgba(25,25,23,.8)" stroke-width="1.1" fill="none"/>
      <text x="680" y="279" font-family="var(--pi-mono)" font-size="var(--type-micro-secondary)" text-anchor="middle" fill="rgba(25,25,23,.45)">
SAMPLE · MODEL-03
      </text>
    </g>
</svg></div>`
  },

  {
    name: "serpentine-loop",
    group: "flow-temporal",
    groupLabel: "流程与时序",
    description: "A five-to-eight-step serpentine closed loop.",
    label: "蛇形回环",
    num: 99,
    variant: null,
    paperInkNative: true,
    frame: { width: 1017, height: 572, fit: 'fixed' },
    dataContract: {"mode":"collection","unit":"step","pointer":"/structured_data","minItems":5,"maxItems":8},
    /* production promotion: Catalog new:5 → native.paper-ink.099.serpentine-loop */
    snippet: `<div class="pi-card" data-bind-root="record" style="width:auto;min-height:0;overflow:visible"><svg class="pi-art" viewBox="0 0 1920 1080" width="1017" height="572">
  <defs>

        <pattern id="j2-hatch17" width="6" height="6" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="6" stroke="#191917" stroke-width=".7" opacity=".35"/>
        </pattern>

  </defs>
    <g transform="translate(0 -13.7)">
      <rect x="320" y="290" width="200" height="160" fill="rgba(255,255,255,.22)" stroke="rgba(25,25,23,.8)" stroke-width="1.3"/>
      <rect x="325" y="295" width="190" height="150" fill="none" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <text x="336" y="318" font-family="var(--pi-mono)" font-size="var(--type-meta)" letter-spacing="2" fill="rgba(25,25,23,.45)">
01
      </text>
      <path d="M 412 330 A 8 8 0 0 1 428 330" fill="none" stroke="rgba(25,25,23,.8)" stroke-width="1.1"/>
      <path d="M 406 330 A 14 14 0 0 1 434 330" fill="none" stroke="rgba(25,25,23,.8)" stroke-width="1.1"/>
      <path d="M 400 330 A 20 20 0 0 1 440 330" fill="none" stroke="rgba(25,25,23,.8)" stroke-width="1.1"/>
      <circle cx="420" cy="335" r="2.4" fill="#191917"/>
      <text x="420" y="384" font-family="var(--pi-mono)" font-size="var(--type-label)" letter-spacing="2" text-anchor="middle" fill="#191917">
PERCEIVE
      </text>
      <text x="420" y="410" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body)" text-anchor="middle" fill="#191917">
感知输入
      </text>
      <text x="420" y="435" font-family="var(--pi-mono)" font-size="var(--type-micro-secondary)" letter-spacing="1" text-anchor="middle" fill="rgba(25,25,23,.45)">
INPUT · 4HZ
      </text>
      <rect x="662" y="290" width="216" height="160" fill="rgba(255,255,255,.22)" stroke="rgba(25,25,23,.8)" stroke-width="1.3"/>
      <rect x="667" y="295" width="206" height="150" fill="none" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <text x="678" y="318" font-family="var(--pi-mono)" font-size="var(--type-meta)" letter-spacing="2" fill="rgba(25,25,23,.45)">
02
      </text>
      <circle cx="770" cy="330" r="17" fill="none" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <line x1="765" y1="322" x2="779" y2="330" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <line x1="779" y1="330" x2="765" y2="338" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <text x="770" y="384" font-family="var(--pi-mono)" font-size="var(--type-label)" letter-spacing="2" text-anchor="middle" fill="#191917">
PARSE
      </text>
      <text x="770" y="410" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body)" text-anchor="middle" fill="#191917">
意图解析
      </text>
      <text x="770" y="435" font-family="var(--pi-mono)" font-size="var(--type-micro-secondary)" letter-spacing="1" text-anchor="middle" fill="rgba(25,25,23,.45)">
INTENT 1.2M / DAY
      </text>
      <rect x="1016" y="290" width="208" height="160" fill="rgba(255,255,255,.22)" stroke="rgba(25,25,23,.8)" stroke-width="1.3"/>
      <rect x="1021" y="295" width="198" height="150" fill="none" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <text x="1032" y="318" font-family="var(--pi-mono)" font-size="var(--type-meta)" letter-spacing="2" fill="rgba(25,25,23,.45)">
03
      </text>
      <circle cx="1120" cy="330" r="17" fill="none" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <line x1="1132" y1="330" x2="1137" y2="330" stroke="#191917" stroke-width="0.7" opacity="0.5"/>
      <line x1="1128.4852813742386" y1="338.4852813742386" x2="1132.0208152801713" y2="342.0208152801713" stroke="#191917" stroke-width="0.7" opacity="0.5"/>
      <line x1="1120" y1="342" x2="1120" y2="347" stroke="#191917" stroke-width="0.7" opacity="0.5"/>
      <line x1="1111.5147186257614" y1="338.4852813742386" x2="1107.9791847198287" y2="342.0208152801713" stroke="#191917" stroke-width="0.7" opacity="0.5"/>
      <line x1="1108" y1="330" x2="1103" y2="330" stroke="#191917" stroke-width="0.7" opacity="0.5"/>
      <line x1="1111.5147186257614" y1="321.5147186257614" x2="1107.9791847198287" y2="317.9791847198287" stroke="#191917" stroke-width="0.7" opacity="0.5"/>
      <line x1="1120" y1="318" x2="1120" y2="313" stroke="#191917" stroke-width="0.7" opacity="0.5"/>
      <line x1="1128.4852813742386" y1="321.5147186257614" x2="1132.0208152801713" y2="317.9791847198287" stroke="#191917" stroke-width="0.7" opacity="0.5"/>
      <line x1="1120" y1="330" x2="1129" y2="321" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <circle cx="1120" cy="330" r="2" fill="#191917"/>
      <text x="1120" y="384" font-family="var(--pi-mono)" font-size="var(--type-label)" letter-spacing="2" text-anchor="middle" fill="#191917">
PLAN
      </text>
      <text x="1120" y="410" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body)" text-anchor="middle" fill="#191917">
规划分解
      </text>
      <text x="1120" y="435" font-family="var(--pi-mono)" font-size="var(--type-micro-secondary)" letter-spacing="1" text-anchor="middle" fill="rgba(25,25,23,.45)">
STEPS SET V18
      </text>
      <rect x="1354" y="290" width="232" height="160" fill="rgba(255,255,255,.22)" stroke="rgba(25,25,23,.8)" stroke-width="1.3"/>
      <rect x="1359" y="295" width="222" height="150" fill="none" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <text x="1370" y="318" font-family="var(--pi-mono)" font-size="var(--type-meta)" letter-spacing="2" fill="rgba(25,25,23,.45)">
04
      </text>
      <rect x="1456" y="320" width="12" height="9" fill="none" stroke="rgba(25,25,23,.8)" stroke-width="1"/>
      <rect x="1472" y="320" width="12" height="9" fill="url(#j2-hatch17)" stroke="rgba(25,25,23,.8)" stroke-width="1"/>
      <rect x="1456" y="336" width="12" height="9" fill="none" stroke="rgba(25,25,23,.8)" stroke-width="1"/>
      <rect x="1472" y="336" width="12" height="9" fill="none" stroke="rgba(25,25,23,.8)" stroke-width="1"/>
      <text x="1470" y="384" font-family="var(--pi-mono)" font-size="var(--type-label)" letter-spacing="2" text-anchor="middle" fill="#191917">
TOOL CALL
      </text>
      <text x="1470" y="410" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body)" text-anchor="middle" fill="#191917">
工具调用
      </text>
      <text x="1470" y="435" font-family="var(--pi-mono)" font-size="var(--type-micro-secondary)" letter-spacing="1" text-anchor="middle" fill="rgba(25,25,23,.45)">
CALLS 860
      </text>
      <line x1="528" y1="370" x2="654" y2="370" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <line x1="654" y1="370" x2="644" y2="364" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <line x1="654" y1="370" x2="644" y2="376" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <line x1="886" y1="370" x2="1008" y2="370" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <line x1="1008" y1="370" x2="998" y2="364" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <line x1="1008" y1="370" x2="998" y2="376" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <line x1="1232" y1="370" x2="1346" y2="370" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <line x1="1346" y1="370" x2="1336" y2="364" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <line x1="1346" y1="370" x2="1336" y2="376" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <path d="M 1586 370 C 1746 370, 1746 670, 1586 670" fill="none" stroke="rgba(25,25,23,.8)" stroke-width="1.4"/>
      <line x1="1586" y1="670" x2="1598" y2="662" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <line x1="1586" y1="670" x2="1598" y2="678" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <text x="1662" y="500" font-family="var(--pi-mono)" font-size="var(--type-meta)" letter-spacing="2" text-anchor="middle" fill="#191917">
GO-LIVE
      </text>
      <text x="1662" y="530" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body-small)" text-anchor="middle" fill="rgba(25,25,23,.7)">
上线闸口
      </text>
      <rect x="1354" y="590" width="232" height="160" fill="rgba(255,255,255,.22)" stroke="rgba(25,25,23,.8)" stroke-width="1.3"/>
      <rect x="1359" y="595" width="222" height="150" fill="none" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <text x="1370" y="618" font-family="var(--pi-mono)" font-size="var(--type-meta)" letter-spacing="2" fill="rgba(25,25,23,.45)">
05
      </text>
      <path d="M 1470 614 A 16 16 0 0 0 1470 646 Z" fill="url(#j2-hatch17)" stroke="none"/>
      <circle cx="1470" cy="630" r="16" fill="none" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <text x="1470" y="684" font-family="var(--pi-mono)" font-size="var(--type-label)" letter-spacing="2" text-anchor="middle" fill="#191917">
VERIFY
      </text>
      <text x="1470" y="710" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body)" text-anchor="middle" fill="#191917">
结果校验
      </text>
      <text x="1470" y="735" font-family="var(--pi-mono)" font-size="var(--type-micro-secondary)" letter-spacing="1" text-anchor="middle" fill="rgba(25,25,23,.45)">
5% SAMPLE · 2 RULES
      </text>
      <rect x="1008" y="590" width="224" height="160" fill="rgba(255,255,255,.22)" stroke="rgba(25,25,23,.8)" stroke-width="1.3"/>
      <rect x="1013" y="595" width="214" height="150" fill="none" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <text x="1024" y="618" font-family="var(--pi-mono)" font-size="var(--type-meta)" letter-spacing="2" fill="rgba(25,25,23,.45)">
06
      </text>
      <ellipse cx="1120" cy="620" rx="14" ry="5" fill="none" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <line x1="1106" y1="620" x2="1106" y2="640" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <line x1="1134" y1="620" x2="1134" y2="640" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <path d="M 1106 640 A 14 5 0 0 0 1134 640" fill="none" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <text x="1120" y="684" font-family="var(--pi-mono)" font-size="var(--type-label)" letter-spacing="2" text-anchor="middle" fill="#191917">
MEMORY
      </text>
      <text x="1120" y="710" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body)" text-anchor="middle" fill="#191917">
记忆更新
      </text>
      <text x="1120" y="735" font-family="var(--pi-mono)" font-size="var(--type-micro-secondary)" letter-spacing="1" text-anchor="middle" fill="rgba(25,25,23,.45)">
100% · 3 STORES
      </text>
      <rect x="668" y="590" width="204" height="160" fill="rgba(255,255,255,.22)" stroke="rgba(25,25,23,.8)" stroke-width="1.3"/>
      <rect x="673" y="595" width="194" height="150" fill="none" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <text x="684" y="618" font-family="var(--pi-mono)" font-size="var(--type-meta)" letter-spacing="2" fill="rgba(25,25,23,.45)">
07
      </text>
      <path d="M 752 639 L 762 631 L 771 636 L 779 623 L 788 628" fill="none" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <circle cx="779" cy="623" r="2.2" fill="#191917"/>
      <text x="770" y="684" font-family="var(--pi-mono)" font-size="var(--type-label)" letter-spacing="2" text-anchor="middle" fill="#191917">
REFLECT
      </text>
      <text x="770" y="710" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body)" text-anchor="middle" fill="#191917">
反思调整
      </text>
      <text x="770" y="735" font-family="var(--pi-mono)" font-size="var(--type-micro-secondary)" letter-spacing="1" text-anchor="middle" fill="rgba(25,25,23,.45)">
P95 38S → 29S
      </text>
      <rect x="320" y="590" width="200" height="160" fill="rgba(255,255,255,.22)" stroke="rgba(25,25,23,.8)" stroke-width="1.3"/>
      <rect x="325" y="595" width="190" height="150" fill="none" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <text x="336" y="618" font-family="var(--pi-mono)" font-size="var(--type-meta)" letter-spacing="2" fill="rgba(25,25,23,.45)">
08
      </text>
      <path d="M 433 636 A 15 15 0 1 1 434 626" fill="none" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <line x1="434" y1="626" x2="427" y2="619" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <line x1="434" y1="626" x2="441" y2="619" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <text x="420" y="684" font-family="var(--pi-mono)" font-size="var(--type-label)" letter-spacing="2" text-anchor="middle" fill="#191917">
DELIVER
      </text>
      <text x="420" y="710" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body)" text-anchor="middle" fill="#191917">
输出交付
      </text>
      <text x="420" y="735" font-family="var(--pi-mono)" font-size="var(--type-micro-secondary)" letter-spacing="1" text-anchor="middle" fill="rgba(25,25,23,.45)">
ISSUE 23 → 01
      </text>
      <line x1="1346" y1="670" x2="1240" y2="670" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <line x1="1240" y1="670" x2="1250" y2="664" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <line x1="1240" y1="670" x2="1250" y2="676" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <line x1="1000" y1="670" x2="880" y2="670" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <line x1="880" y1="670" x2="890" y2="664" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <line x1="880" y1="670" x2="890" y2="676" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <line x1="660" y1="670" x2="528" y2="670" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <line x1="528" y1="670" x2="538" y2="664" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <line x1="528" y1="670" x2="538" y2="676" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <path d="M 320 670 C 172 670, 172 370, 320 370" fill="none" stroke="rgba(25,25,23,.8)" stroke-width="1.4"/>
      <line x1="320" y1="370" x2="308" y2="362" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <line x1="320" y1="370" x2="308" y2="378" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <text x="246" y="500" font-family="var(--pi-mono)" font-size="var(--type-meta)" letter-spacing="2" text-anchor="middle" fill="#191917">
ITERATE · W01
      </text>
      <text x="246" y="530" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body-small)" text-anchor="middle" fill="rgba(25,25,23,.7)">
持续迭代
      </text>
      <line x1="180" y1="370" x2="330" y2="370" stroke="#191917" stroke-width="0.5" opacity="0.18" stroke-dasharray="2 6"/>
      <line x1="1586" y1="370" x2="1780" y2="370" stroke="#191917" stroke-width="0.5" opacity="0.18" stroke-dasharray="2 6"/>
      <line x1="180" y1="670" x2="330" y2="670" stroke="#191917" stroke-width="0.5" opacity="0.18" stroke-dasharray="2 6"/>
      <line x1="1586" y1="670" x2="1780" y2="670" stroke="#191917" stroke-width="0.5" opacity="0.18" stroke-dasharray="2 6"/>
    </g>
</svg></div>`
  },

  {
    name: "cycle-ring",
    group: "flow-temporal",
    groupLabel: "流程与时序",
    description: "A three-to-six-stage circular governance loop with callouts.",
    label: "环形循环",
    num: 100,
    variant: null,
    paperInkNative: true,
    frame: { width: 978, height: 550, fit: 'fixed' },
    dataContract: {"mode":"collection","unit":"step","pointer":"/structured_data","minItems":3,"maxItems":6},
    /* production promotion: Catalog new:6 → native.paper-ink.100.cycle-ring */
    snippet: `<div class="pi-card" data-bind-root="record" style="width:auto;min-height:0;overflow:visible"><svg class="pi-art" viewBox="0 0 1920 1080" width="978" height="550">
  <defs>

        <marker id="j1-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10" fill="none" stroke="#191917" stroke-width="1.4"/>
        </marker>

  </defs>
    <g transform="translate(0 -8.7)">
      <circle cx="960" cy="515" r="240" fill="none" stroke="rgba(25,25,23,.8)" stroke-width="1.4"/>
      <circle cx="960" cy="515" r="226" fill="none" stroke="#191917" stroke-width="0.6" stroke-dasharray="2 6" opacity="0.3"/>
      <line x1="1180.2310883939076" y1="574.0107422833747" x2="1186.992569177931" y2="575.8224755990924" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <line x1="1157.453792062852" y1="629" x2="1163.515969889343" y2="632.5" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <line x1="1074" y1="712.453792062852" x2="1077.5" y2="718.5159698893431" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <line x1="1019.0107422833747" y1="735.2310883939076" x2="1020.8224755990924" y2="741.992569177931" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <line x1="900.9892577166253" y1="735.2310883939076" x2="899.1775244009076" y2="741.992569177931" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <line x1="846" y1="712.453792062852" x2="842.5" y2="718.5159698893431" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <line x1="762.546207937148" y1="629" x2="756.4840301106569" y2="632.5" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <line x1="739.7689116060924" y1="574.0107422833748" x2="733.007430822069" y2="575.8224755990924" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <line x1="739.7689116060924" y1="455.9892577166254" x2="733.007430822069" y2="454.1775244009077" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <line x1="762.546207937148" y1="401" x2="756.4840301106569" y2="397.5" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <line x1="845.9999999999999" y1="317.546207937148" x2="842.4999999999999" y2="311.48403011065693" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <line x1="900.9892577166253" y1="294.7689116060924" x2="899.1775244009076" y2="288.00743082206895" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <line x1="1019.0107422833748" y1="294.76891160609244" x2="1020.8224755990925" y2="288.00743082206895" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <line x1="1074" y1="317.546207937148" x2="1077.5" y2="311.48403011065693" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <line x1="1157.453792062852" y1="400.9999999999999" x2="1163.515969889343" y2="397.4999999999999" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <line x1="1180.2310883939076" y1="455.9892577166253" x2="1186.992569177931" y2="454.17752440090766" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <path d="M 1197.7 481.6 A 240 240 0 0 1 1197.7 548.4" fill="none" stroke="#191917" stroke-width="1.4" marker-end="url(#j1-arrow)"/>
      <path d="M 993.4 752.7 A 240 240 0 0 1 926.6 752.7" fill="none" stroke="#191917" stroke-width="1.4" marker-end="url(#j1-arrow)"/>
      <path d="M 722.3 548.4 A 240 240 0 0 1 722.3 481.6" fill="none" stroke="#191917" stroke-width="1.4" marker-end="url(#j1-arrow)"/>
      <path d="M 926.6 277.3 A 240 240 0 0 1 993.4 277.3" fill="none" stroke="#191917" stroke-width="1.4" marker-end="url(#j1-arrow)"/>
      <line x1="944" y1="515" x2="976" y2="515" stroke="#191917" stroke-width="0.5" opacity="0.3"/>
      <line x1="960" y1="499" x2="960" y2="531" stroke="#191917" stroke-width="0.5" opacity="0.3"/>
      <text x="960" y="505" font-family="var(--pi-mono)" font-size="var(--type-body-small)" letter-spacing="6" text-anchor="middle" fill="#191917">
LOOP
      </text>
      <text x="960" y="537" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body-small)" text-anchor="middle" fill="rgba(25,25,23,.55)">
评测治理闭环
      </text>
      <line x1="1240" y1="344" x2="1141.7" y2="345.3" stroke="#191917" stroke-width="0.7" stroke-dasharray="3 5" opacity="0.45"/>
      <circle cx="1184.85" cy="344.65" r="2.4" fill="#191917" opacity="0.6"/>
      <circle cx="1129.7" cy="345.3" r="10" fill="none" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <circle cx="1129.7" cy="345.3" r="3.5" fill="#191917"/>
      <rect x="1240" y="268" width="556" height="152" fill="rgba(255,255,255,.22)" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <rect x="1245" y="273" width="546" height="142" fill="none" stroke="#191917" stroke-width="0.6" opacity="0.35"/>
      <text x="1270" y="314" font-family="var(--pi-mono)" font-size="var(--type-body)" fill="#191917">
01
      </text>
      <line x1="1270" y1="326" x2="1302" y2="326" stroke="#191917" stroke-width="1"/>
      <text x="1766" y="312" font-family="var(--pi-mono)" font-size="var(--type-meta)" letter-spacing="2" text-anchor="end" fill="rgba(25,25,23,.45)">
DEFINE
      </text>
      <text x="1270" y="362" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-subheading)" fill="#191917">
定位
      </text>
      <text x="1270" y="396" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body-small)" fill="rgba(25,25,23,.7)">
定义评测目标与基准，圈定能力范围与合格阈值
      </text>
      <line x1="1240" y1="686" x2="1141.7" y2="684.7" stroke="#191917" stroke-width="0.7" stroke-dasharray="3 5" opacity="0.45"/>
      <circle cx="1184.85" cy="685.35" r="2.4" fill="#191917" opacity="0.6"/>
      <circle cx="1129.7" cy="684.7" r="10" fill="none" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <circle cx="1129.7" cy="684.7" r="3.5" fill="#191917"/>
      <rect x="1240" y="610" width="556" height="152" fill="rgba(255,255,255,.22)" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <rect x="1245" y="615" width="546" height="142" fill="none" stroke="#191917" stroke-width="0.6" opacity="0.35"/>
      <text x="1270" y="656" font-family="var(--pi-mono)" font-size="var(--type-body)" fill="#191917">
02
      </text>
      <line x1="1270" y1="668" x2="1302" y2="668" stroke="#191917" stroke-width="1"/>
      <text x="1766" y="654" font-family="var(--pi-mono)" font-size="var(--type-meta)" letter-spacing="2" text-anchor="end" fill="rgba(25,25,23,.45)">
TUNE
      </text>
      <text x="1270" y="704" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-subheading)" fill="#191917">
调优
      </text>
      <text x="1270" y="738" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body-small)" fill="rgba(25,25,23,.7)">
迭代 prompt、参数与工具调用，逐轮逼近目标分数
      </text>
      <line x1="680" y1="686" x2="778.3" y2="684.7" stroke="#191917" stroke-width="0.7" stroke-dasharray="3 5" opacity="0.45"/>
      <circle cx="735.15" cy="685.35" r="2.4" fill="#191917" opacity="0.6"/>
      <circle cx="790.3" cy="684.7" r="10" fill="none" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <circle cx="790.3" cy="684.7" r="3.5" fill="#191917"/>
      <rect x="124" y="610" width="556" height="152" fill="rgba(255,255,255,.22)" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <rect x="129" y="615" width="546" height="142" fill="none" stroke="#191917" stroke-width="0.6" opacity="0.35"/>
      <text x="154" y="656" font-family="var(--pi-mono)" font-size="var(--type-body)" fill="#191917">
03
      </text>
      <line x1="154" y1="668" x2="186" y2="668" stroke="#191917" stroke-width="1"/>
      <text x="650" y="654" font-family="var(--pi-mono)" font-size="var(--type-meta)" letter-spacing="2" text-anchor="end" fill="rgba(25,25,23,.45)">
EVAL
      </text>
      <text x="154" y="704" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-subheading)" fill="#191917">
评测
      </text>
      <text x="154" y="738" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body-small)" fill="rgba(25,25,23,.7)">
跑基准集，人工与自动双轨打分，记录失败样本
      </text>
      <line x1="680" y1="344" x2="778.3" y2="345.3" stroke="#191917" stroke-width="0.7" stroke-dasharray="3 5" opacity="0.45"/>
      <circle cx="735.15" cy="344.65" r="2.4" fill="#191917" opacity="0.6"/>
      <circle cx="790.3" cy="345.3" r="10" fill="none" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <circle cx="790.3" cy="345.3" r="3.5" fill="#191917"/>
      <rect x="124" y="268" width="556" height="152" fill="rgba(255,255,255,.22)" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <rect x="129" y="273" width="546" height="142" fill="none" stroke="#191917" stroke-width="0.6" opacity="0.35"/>
      <text x="154" y="314" font-family="var(--pi-mono)" font-size="var(--type-body)" fill="#191917">
04
      </text>
      <line x1="154" y1="326" x2="186" y2="326" stroke="#191917" stroke-width="1"/>
      <text x="650" y="312" font-family="var(--pi-mono)" font-size="var(--type-meta)" letter-spacing="2" text-anchor="end" fill="rgba(25,25,23,.45)">
GOVERN
      </text>
      <text x="154" y="362" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-subheading)" fill="#191917">
治理
      </text>
      <text x="154" y="396" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body-small)" fill="rgba(25,25,23,.7)">
上线审批、线上监控与回滚，沉淀缺陷反哺下一轮
      </text>
    </g>
</svg></div>`
  },

  {
    name: "journey-curve",
    group: "flow-temporal",
    groupLabel: "流程与时序",
    description: "A four-to-six-milestone journey plotted on a curved route.",
    label: "旅程曲线",
    num: 101,
    variant: null,
    paperInkNative: true,
    frame: { width: 1049, height: 590, fit: 'fixed' },
    dataContract: {"mode":"collection","unit":"milestone","pointer":"/structured_data","minItems":4,"maxItems":6},
    /* production promotion: Catalog new:7 → native.paper-ink.101.journey-curve */
    snippet: `<div class="pi-card" data-bind-root="record" style="width:auto;min-height:0;overflow:visible"><svg class="pi-art" viewBox="0 0 1920 1080" width="1049" height="590">
    <g transform="translate(0 -54.2)">
      <path d="M 180 240 L 448 240 L 470 266 L 448 292 L 180 292 L 202 266 Z" fill="rgba(255,255,255,.22)" stroke="rgba(25,25,23,.8)" stroke-width="1.1"/>
      <text x="331" y="256" font-family="var(--pi-mono)" font-size="var(--type-meta)" letter-spacing="2" text-anchor="middle" fill="#191917">
01 ONBOARD
      </text>
      <text x="331" y="285" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-label)" text-anchor="middle" fill="rgba(25,25,23,.7)">
初次接触
      </text>
      <path d="M 492 240 L 760 240 L 782 266 L 760 292 L 492 292 L 514 266 Z" fill="rgba(255,255,255,.22)" stroke="rgba(25,25,23,.8)" stroke-width="1.1"/>
      <text x="643" y="256" font-family="var(--pi-mono)" font-size="var(--type-meta)" letter-spacing="2" text-anchor="middle" fill="#191917">
02 WOW
      </text>
      <text x="643" y="285" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-label)" text-anchor="middle" fill="rgba(25,25,23,.7)">
上手使用
      </text>
      <path d="M 804 240 L 1072 240 L 1094 266 L 1072 292 L 804 292 L 826 266 Z" fill="rgba(255,255,255,.22)" stroke="rgba(25,25,23,.8)" stroke-width="1.1"/>
      <text x="955" y="256" font-family="var(--pi-mono)" font-size="var(--type-meta)" letter-spacing="2" text-anchor="middle" fill="#191917">
03 DEPTH
      </text>
      <text x="955" y="285" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-label)" text-anchor="middle" fill="rgba(25,25,23,.7)">
深度使用
      </text>
      <path d="M 1116 240 L 1384 240 L 1406 266 L 1384 292 L 1116 292 L 1138 266 Z" fill="rgba(255,255,255,.22)" stroke="rgba(25,25,23,.8)" stroke-width="1.1"/>
      <text x="1267" y="256" font-family="var(--pi-mono)" font-size="var(--type-meta)" letter-spacing="2" text-anchor="middle" fill="#191917">
04 STALL
      </text>
      <text x="1267" y="285" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-label)" text-anchor="middle" fill="rgba(25,25,23,.7)">
遇到瓶颈
      </text>
      <path d="M 1428 240 L 1696 240 L 1718 266 L 1696 292 L 1428 292 L 1450 266 Z" fill="rgba(255,255,255,.22)" stroke="rgba(25,25,23,.8)" stroke-width="1.1"/>
      <text x="1579" y="256" font-family="var(--pi-mono)" font-size="var(--type-meta)" letter-spacing="2" text-anchor="middle" fill="#191917">
05 BREAK
      </text>
      <text x="1579" y="285" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-label)" text-anchor="middle" fill="rgba(25,25,23,.7)">
突破理解
      </text>
      <line x1="180" y1="560" x2="1740" y2="560" stroke="#191917" stroke-width="0.5" opacity="0.3" stroke-dasharray="2 6"/>
      <text x="1740" y="548" font-family="var(--pi-mono)" font-size="var(--type-micro-secondary)" letter-spacing="2" text-anchor="end" fill="rgba(25,25,23,.45)">
EXPERIENCE INDEX 0–100
      </text>
      <line x1="300" y1="298" x2="300" y2="461" stroke="#191917" stroke-width="0.5" opacity="0.22" stroke-dasharray="2 6"/>
      <line x1="590" y1="298" x2="590" y2="331" stroke="#191917" stroke-width="0.5" opacity="0.22" stroke-dasharray="2 6"/>
      <line x1="830" y1="298" x2="830" y2="686" stroke="#191917" stroke-width="0.5" opacity="0.22" stroke-dasharray="2 6"/>
      <line x1="1090" y1="298" x2="1090" y2="351" stroke="#191917" stroke-width="0.5" opacity="0.22" stroke-dasharray="2 6"/>
      <line x1="1330" y1="298" x2="1330" y2="646" stroke="#191917" stroke-width="0.5" opacity="0.22" stroke-dasharray="2 6"/>
      <line x1="1640" y1="298" x2="1640" y2="401" stroke="#191917" stroke-width="0.5" opacity="0.22" stroke-dasharray="2 6"/>
      <path d="M 300 560 C 420 560, 470 430, 590 430 C 710 430, 710 700, 830 700 C 950 700, 960 450, 1090 450 C 1220 450, 1210 660, 1330 660 C 1450 660, 1510 500, 1640 500" fill="none" stroke="rgba(25,25,23,.8)" stroke-width="1.4"/>
      <circle cx="300" cy="560" r="9" fill="#DFE0D9" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <circle cx="300" cy="560" r="2.4" fill="#191917"/>
      <line x1="300" y1="547" x2="300" y2="528" stroke="#191917" stroke-width="0.7" opacity="0.45" stroke-dasharray="3 4"/>
      <text x="300" y="514" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body)" text-anchor="middle" fill="#191917">
初次接触·好奇
      </text>
      <text x="300" y="477" font-family="var(--pi-mono)" font-size="var(--type-meta)" letter-spacing="2" text-anchor="middle" fill="rgba(25,25,23,.45)">
SCORE 74
      </text>
      <circle cx="590" cy="430" r="9" fill="#DFE0D9" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <circle cx="590" cy="430" r="2.4" fill="#191917"/>
      <line x1="590" y1="417" x2="590" y2="398" stroke="#191917" stroke-width="0.7" opacity="0.45" stroke-dasharray="3 4"/>
      <text x="590" y="384" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body)" text-anchor="middle" fill="#191917">
上手使用·惊艳
      </text>
      <text x="590" y="347" font-family="var(--pi-mono)" font-size="var(--type-meta)" letter-spacing="2" text-anchor="middle" fill="rgba(25,25,23,.45)">
SCORE 92 · PEAK
      </text>
      <circle cx="830" cy="700" r="9" fill="#DFE0D9" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <circle cx="830" cy="700" r="2.4" fill="#191917"/>
      <line x1="830" y1="713" x2="830" y2="734" stroke="#191917" stroke-width="0.7" opacity="0.45" stroke-dasharray="3 4"/>
      <text x="830" y="758" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body)" text-anchor="middle" fill="#191917">
深度使用·撞墙
      </text>
      <text x="830" y="784" font-family="var(--pi-mono)" font-size="var(--type-meta)" letter-spacing="2" text-anchor="middle" fill="rgba(25,25,23,.45)">
SCORE 41 · PAIN
      </text>
      <circle cx="1090" cy="450" r="9" fill="#DFE0D9" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <circle cx="1090" cy="450" r="2.4" fill="#191917"/>
      <line x1="1090" y1="437" x2="1090" y2="418" stroke="#191917" stroke-width="0.7" opacity="0.45" stroke-dasharray="3 4"/>
      <text x="1090" y="404" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body)" text-anchor="middle" fill="#191917">
突破理解·掌控
      </text>
      <text x="1090" y="367" font-family="var(--pi-mono)" font-size="var(--type-meta)" letter-spacing="2" text-anchor="middle" fill="rgba(25,25,23,.45)">
SCORE 88 · PEAK
      </text>
      <circle cx="1330" cy="660" r="9" fill="#DFE0D9" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <circle cx="1330" cy="660" r="2.4" fill="#191917"/>
      <line x1="1330" y1="673" x2="1330" y2="694" stroke="#191917" stroke-width="0.7" opacity="0.45" stroke-dasharray="3 4"/>
      <text x="1330" y="718" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body)" text-anchor="middle" fill="#191917">
遇到幻觉·挫败
      </text>
      <text x="1330" y="744" font-family="var(--pi-mono)" font-size="var(--type-meta)" letter-spacing="2" text-anchor="middle" fill="rgba(25,25,23,.45)">
SCORE 55 · PAIN
      </text>
      <circle cx="1640" cy="500" r="9" fill="#DFE0D9" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <circle cx="1640" cy="500" r="2.4" fill="#191917"/>
      <line x1="1640" y1="487" x2="1640" y2="468" stroke="#191917" stroke-width="0.7" opacity="0.45" stroke-dasharray="3 4"/>
      <text x="1640" y="454" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body)" text-anchor="middle" fill="#191917">
持续依赖·离不开
      </text>
      <text x="1640" y="417" font-family="var(--pi-mono)" font-size="var(--type-meta)" letter-spacing="2" text-anchor="middle" fill="rgba(25,25,23,.45)">
SCORE 90
      </text>
      <path d="M 1330 672 C 1340 850, 600 852, 592 452" fill="none" stroke="#191917" stroke-width="0.9" opacity="0.55" stroke-dasharray="6 5"/>
      <line x1="592" y1="452" x2="583" y2="466" stroke="#191917" stroke-width="1.1" opacity="0.7"/>
      <line x1="592" y1="452" x2="601" y2="466" stroke="#191917" stroke-width="1.1" opacity="0.7"/>
      <text x="960" y="876" font-family="var(--pi-mono)" font-size="var(--type-micro-secondary)" letter-spacing="2" text-anchor="middle" fill="rgba(25,25,23,.45)">
FEEDBACK: PAIN POINTS → ONBOARDING
      </text>
    </g>
</svg></div>`
  },

  {
    name: "timeline-axis-horizontal",
    group: "flow-temporal",
    groupLabel: "流程与时序",
    description: "A horizontal ruled timeline with milestone annotations.",
    label: "时间轴（横排）",
    num: 102,
    variant: null,
    paperInkNative: true,
    frame: { width: 1044, height: 587, fit: 'fixed' },
    dataContract: {"mode":"collection","unit":"milestone","pointer":"/structured_data","minItems":3,"maxItems":6},
    /* production promotion: Catalog new:8 → native.paper-ink.102.timeline-axis-horizontal */
    snippet: `<div class="pi-card" data-bind-root="record" style="width:auto;min-height:0;overflow:visible"><svg class="pi-art" viewBox="0 0 1920 1080" width="1044" height="587">
    <g transform="translate(0 -50.7)">
      <line x1="200" y1="560" x2="1720" y2="560" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <line x1="200" y1="560" x2="200" y2="572" stroke="#191917" stroke-width="1" opacity="0.4"/>
      <line x1="238" y1="560" x2="238" y2="567" stroke="#191917" stroke-width="0.5" opacity="0.25"/>
      <line x1="276" y1="560" x2="276" y2="567" stroke="#191917" stroke-width="0.5" opacity="0.25"/>
      <line x1="314" y1="560" x2="314" y2="567" stroke="#191917" stroke-width="0.5" opacity="0.25"/>
      <line x1="352" y1="560" x2="352" y2="567" stroke="#191917" stroke-width="0.5" opacity="0.25"/>
      <line x1="390" y1="560" x2="390" y2="572" stroke="#191917" stroke-width="1" opacity="0.4"/>
      <line x1="428" y1="560" x2="428" y2="567" stroke="#191917" stroke-width="0.5" opacity="0.25"/>
      <line x1="466" y1="560" x2="466" y2="567" stroke="#191917" stroke-width="0.5" opacity="0.25"/>
      <line x1="504" y1="560" x2="504" y2="567" stroke="#191917" stroke-width="0.5" opacity="0.25"/>
      <line x1="542" y1="560" x2="542" y2="567" stroke="#191917" stroke-width="0.5" opacity="0.25"/>
      <line x1="580" y1="560" x2="580" y2="572" stroke="#191917" stroke-width="1" opacity="0.4"/>
      <line x1="618" y1="560" x2="618" y2="567" stroke="#191917" stroke-width="0.5" opacity="0.25"/>
      <line x1="656" y1="560" x2="656" y2="567" stroke="#191917" stroke-width="0.5" opacity="0.25"/>
      <line x1="694" y1="560" x2="694" y2="567" stroke="#191917" stroke-width="0.5" opacity="0.25"/>
      <line x1="732" y1="560" x2="732" y2="567" stroke="#191917" stroke-width="0.5" opacity="0.25"/>
      <line x1="770" y1="560" x2="770" y2="572" stroke="#191917" stroke-width="1" opacity="0.4"/>
      <line x1="808" y1="560" x2="808" y2="567" stroke="#191917" stroke-width="0.5" opacity="0.25"/>
      <line x1="846" y1="560" x2="846" y2="567" stroke="#191917" stroke-width="0.5" opacity="0.25"/>
      <line x1="884" y1="560" x2="884" y2="567" stroke="#191917" stroke-width="0.5" opacity="0.25"/>
      <line x1="922" y1="560" x2="922" y2="567" stroke="#191917" stroke-width="0.5" opacity="0.25"/>
      <line x1="960" y1="560" x2="960" y2="572" stroke="#191917" stroke-width="1" opacity="0.4"/>
      <line x1="998" y1="560" x2="998" y2="567" stroke="#191917" stroke-width="0.5" opacity="0.25"/>
      <line x1="1036" y1="560" x2="1036" y2="567" stroke="#191917" stroke-width="0.5" opacity="0.25"/>
      <line x1="1074" y1="560" x2="1074" y2="567" stroke="#191917" stroke-width="0.5" opacity="0.25"/>
      <line x1="1112" y1="560" x2="1112" y2="567" stroke="#191917" stroke-width="0.5" opacity="0.25"/>
      <line x1="1150" y1="560" x2="1150" y2="572" stroke="#191917" stroke-width="1" opacity="0.4"/>
      <line x1="1188" y1="560" x2="1188" y2="567" stroke="#191917" stroke-width="0.5" opacity="0.25"/>
      <line x1="1226" y1="560" x2="1226" y2="567" stroke="#191917" stroke-width="0.5" opacity="0.25"/>
      <line x1="1264" y1="560" x2="1264" y2="567" stroke="#191917" stroke-width="0.5" opacity="0.25"/>
      <line x1="1302" y1="560" x2="1302" y2="567" stroke="#191917" stroke-width="0.5" opacity="0.25"/>
      <line x1="1340" y1="560" x2="1340" y2="572" stroke="#191917" stroke-width="1" opacity="0.4"/>
      <line x1="1378" y1="560" x2="1378" y2="567" stroke="#191917" stroke-width="0.5" opacity="0.25"/>
      <line x1="1416" y1="560" x2="1416" y2="567" stroke="#191917" stroke-width="0.5" opacity="0.25"/>
      <line x1="1454" y1="560" x2="1454" y2="567" stroke="#191917" stroke-width="0.5" opacity="0.25"/>
      <line x1="1492" y1="560" x2="1492" y2="567" stroke="#191917" stroke-width="0.5" opacity="0.25"/>
      <line x1="1530" y1="560" x2="1530" y2="572" stroke="#191917" stroke-width="1" opacity="0.4"/>
      <line x1="1568" y1="560" x2="1568" y2="567" stroke="#191917" stroke-width="0.5" opacity="0.25"/>
      <line x1="1606" y1="560" x2="1606" y2="567" stroke="#191917" stroke-width="0.5" opacity="0.25"/>
      <line x1="1644" y1="560" x2="1644" y2="567" stroke="#191917" stroke-width="0.5" opacity="0.25"/>
      <line x1="1682" y1="560" x2="1682" y2="567" stroke="#191917" stroke-width="0.5" opacity="0.25"/>
      <line x1="1720" y1="560" x2="1720" y2="572" stroke="#191917" stroke-width="1" opacity="0.4"/>
      <circle cx="280" cy="560" r="9" fill="#DFE0D9" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <circle cx="280" cy="560" r="3" fill="#191917"/>
      <text x="280" y="456" font-family="var(--pi-mono)" font-size="var(--type-subheading)" text-anchor="middle" fill="#191917">
2018
      </text>
      <text x="280" y="494" font-family="var(--pi-mono)" font-size="var(--type-body-small)" letter-spacing="1" text-anchor="middle" fill="rgba(25,25,23,.8)">
GPT-1
      </text>
      <text x="280" y="518" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-meta)" text-anchor="middle" fill="rgba(25,25,23,.45)">
预训练雏形
      </text>
      <line x1="280" y1="532" x2="280" y2="548" stroke="#191917" stroke-width="0.6" opacity="0.4"/>
      <text x="280" y="612" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body)" text-anchor="middle" fill="rgba(25,25,23,.7)">
1.17 亿参数 · 证明可行性
      </text>
      <circle cx="548" cy="560" r="9" fill="#DFE0D9" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <circle cx="548" cy="560" r="3" fill="#191917"/>
      <text x="548" y="456" font-family="var(--pi-mono)" font-size="var(--type-subheading)" text-anchor="middle" fill="#191917">
2019
      </text>
      <text x="548" y="494" font-family="var(--pi-mono)" font-size="var(--type-body-small)" letter-spacing="1" text-anchor="middle" fill="rgba(25,25,23,.8)">
GPT-2
      </text>
      <text x="548" y="518" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-meta)" text-anchor="middle" fill="rgba(25,25,23,.45)">
规模跃迁
      </text>
      <line x1="548" y1="532" x2="548" y2="548" stroke="#191917" stroke-width="0.6" opacity="0.4"/>
      <circle cx="816" cy="560" r="9" fill="#DFE0D9" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <circle cx="816" cy="560" r="3" fill="#191917"/>
      <text x="816" y="456" font-family="var(--pi-mono)" font-size="var(--type-subheading)" text-anchor="middle" fill="#191917">
2020
      </text>
      <text x="816" y="494" font-family="var(--pi-mono)" font-size="var(--type-body-small)" letter-spacing="1" text-anchor="middle" fill="rgba(25,25,23,.8)">
GPT-3
      </text>
      <text x="816" y="518" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-meta)" text-anchor="middle" fill="rgba(25,25,23,.45)">
涌现能力
      </text>
      <line x1="816" y1="532" x2="816" y2="548" stroke="#191917" stroke-width="0.6" opacity="0.4"/>
      <circle cx="1084" cy="560" r="9" fill="#DFE0D9" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <circle cx="1084" cy="560" r="3" fill="#191917"/>
      <text x="1084" y="456" font-family="var(--pi-mono)" font-size="var(--type-subheading)" text-anchor="middle" fill="#191917">
2022
      </text>
      <text x="1084" y="494" font-family="var(--pi-mono)" font-size="var(--type-body-small)" letter-spacing="1" text-anchor="middle" fill="rgba(25,25,23,.8)">
ChatGPT
      </text>
      <text x="1084" y="518" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-meta)" text-anchor="middle" fill="rgba(25,25,23,.45)">
对话破圈
      </text>
      <line x1="1084" y1="532" x2="1084" y2="548" stroke="#191917" stroke-width="0.6" opacity="0.4"/>
      <circle cx="1352" cy="560" r="5" fill="#191917"/>
      <circle cx="1352" cy="560" r="16" fill="none" stroke="#191917" stroke-width="1.4"/>
      <circle cx="1352" cy="560" r="20" fill="none" stroke="#191917" stroke-width="0.6" opacity="0.4"/>
      <text x="1352" y="456" font-family="var(--pi-mono)" font-size="var(--type-subheading)" text-anchor="middle" fill="#191917">
2023
      </text>
      <text x="1352" y="494" font-family="var(--pi-mono)" font-size="var(--type-body-small)" letter-spacing="1" text-anchor="middle" fill="rgba(25,25,23,.8)">
GPT-4
      </text>
      <text x="1352" y="518" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-meta)" text-anchor="middle" fill="rgba(25,25,23,.45)">
多模态
      </text>
      <line x1="1352" y1="532" x2="1352" y2="548" stroke="#191917" stroke-width="0.6" opacity="0.4"/>
      <text x="1352" y="612" font-family="var(--pi-sans)" font-weight="400" font-size="var(--type-body)" text-anchor="middle" fill="#191917">
推理 · 多模态 · 月活破亿
      </text>
      <line x1="1232" y1="626" x2="1472" y2="626" stroke="#191917" stroke-width="1.2" opacity="0.8"/>
      <circle cx="1620" cy="560" r="9" fill="#DFE0D9" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <circle cx="1620" cy="560" r="3" fill="#191917"/>
      <text x="1620" y="456" font-family="var(--pi-mono)" font-size="var(--type-subheading)" text-anchor="middle" fill="#191917">
2025
      </text>
      <text x="1620" y="494" font-family="var(--pi-mono)" font-size="var(--type-body-small)" letter-spacing="1" text-anchor="middle" fill="rgba(25,25,23,.8)">
o1 / o3
      </text>
      <text x="1620" y="518" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-meta)" text-anchor="middle" fill="rgba(25,25,23,.45)">
推理模型
      </text>
      <line x1="1620" y1="532" x2="1620" y2="548" stroke="#191917" stroke-width="0.6" opacity="0.4"/>
      <text x="1620" y="612" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body)" text-anchor="middle" fill="rgba(25,25,23,.7)">
思维链 · 自我反思
      </text>
      <path d="M 1276 646 Q 1352 700 1428 646" fill="none" stroke="#191917" stroke-width="0.8" opacity="0.35"/>
      <path d="M 1284 654 Q 1352 702 1420 654" fill="none" stroke="#191917" stroke-width="0.6" opacity="0.2"/>
    </g>
</svg></div>`
  },

  {
    name: "concentric-ring",
    group: "hierarchy-structure",
    groupLabel: "层级与结构",
    description: "Three to five concentric containment rings with side explanations.",
    label: "同心环",
    num: 103,
    variant: null,
    paperInkNative: true,
    frame: { width: 1249, height: 702, fit: 'fixed' },
    dataContract: {"mode":"collection","unit":"layer","pointer":"/structured_data","minItems":3,"maxItems":5},
    /* production promotion: Catalog new:9 → native.paper-ink.103.concentric-ring */
    snippet: `<div class="pi-card" data-bind-root="record" style="width:auto;min-height:0;overflow:visible"><svg class="pi-art" viewBox="0 0 1920 1080" width="1249" height="702">
  <defs>

        <pattern id="h1-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="#191917" stroke-width="0.7" opacity="0.35"/>
        </pattern>

  </defs>
    <g transform="translate(0 -23.7)">
      <line x1="1050" y1="170" x2="1050" y2="890" stroke="#191917" stroke-width="0.5" stroke-dasharray="2 6" opacity="0.22"/>
      <line x1="660" y1="530" x2="1460" y2="530" stroke="#191917" stroke-width="0.5" stroke-dasharray="2 6" opacity="0.22"/>
      <circle cx="1050" cy="530" r="300" fill="none" stroke="rgba(25,25,23,.8)" stroke-width="1.3"/>
      <circle cx="1050" cy="530" r="292" fill="none" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <circle cx="1050" cy="530" r="190" fill="none" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <circle cx="1050" cy="530" r="183" fill="none" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <circle cx="1050" cy="530" r="80" fill="none" stroke="rgba(25,25,23,.8)" stroke-width="1.4"/>
      <circle cx="1050" cy="530" r="73" fill="none" stroke="#191917" stroke-width="0.6" opacity="0.35"/>
      <line x1="1127.6457135307562" y1="240.22225211327952" x2="1129.975084936679" y2="231.5289196766779" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <line x1="1200" y1="270.1923788646684" x2="1204.5" y2="262.39815023060845" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <line x1="1309.8076211353316" y1="380" x2="1317.6018497693915" y2="375.5" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <line x1="1339.7777478867206" y1="452.3542864692438" x2="1348.471080323322" y2="450.0249150633211" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <line x1="1339.7777478867206" y1="607.6457135307562" x2="1348.471080323322" y2="609.975084936679" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <line x1="1309.8076211353316" y1="680" x2="1317.6018497693915" y2="684.5" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <line x1="1200" y1="789.8076211353316" x2="1204.5" y2="797.6018497693915" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <line x1="1127.6457135307562" y1="819.7777478867205" x2="1129.975084936679" y2="828.4710803233221" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <line x1="972.3542864692439" y1="819.7777478867206" x2="970.0249150633213" y2="828.4710803233222" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <line x1="900" y1="789.8076211353316" x2="895.5" y2="797.6018497693915" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <line x1="790.1923788646684" y1="680.0000000000001" x2="782.3981502306085" y2="684.5000000000001" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <line x1="760.2222521132795" y1="607.6457135307562" x2="751.5289196766779" y2="609.9750849366789" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <line x1="760.2222521132795" y1="452.3542864692437" x2="751.5289196766779" y2="450.024915063321" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <line x1="790.1923788646684" y1="380" x2="782.3981502306085" y2="375.5" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <line x1="899.9999999999999" y1="270.1923788646685" x2="895.4999999999999" y2="262.39815023060856" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <line x1="972.3542864692438" y1="240.22225211327952" x2="970.0249150633211" y2="231.5289196766779" stroke="#191917" stroke-width="0.6" opacity="0.3"/>
      <line x1="1145" y1="365.4551732809566" x2="1148.5" y2="359.39299545446556" stroke="#191917" stroke-width="0.5" opacity="0.25"/>
      <line x1="1214.5448267190434" y1="435" x2="1220.6070045455344" y2="431.5" stroke="#191917" stroke-width="0.5" opacity="0.25"/>
      <line x1="1214.5448267190434" y1="625" x2="1220.6070045455344" y2="628.5" stroke="#191917" stroke-width="0.5" opacity="0.25"/>
      <line x1="1145" y1="694.5448267190434" x2="1148.5" y2="700.6070045455344" stroke="#191917" stroke-width="0.5" opacity="0.25"/>
      <line x1="955" y1="694.5448267190434" x2="951.5" y2="700.6070045455344" stroke="#191917" stroke-width="0.5" opacity="0.25"/>
      <line x1="885.4551732809567" y1="625.0000000000001" x2="879.3929954544656" y2="628.5000000000001" stroke="#191917" stroke-width="0.5" opacity="0.25"/>
      <line x1="885.4551732809566" y1="435" x2="879.3929954544656" y2="431.5" stroke="#191917" stroke-width="0.5" opacity="0.25"/>
      <line x1="954.9999999999999" y1="365.4551732809567" x2="951.4999999999999" y2="359.3929954544657" stroke="#191917" stroke-width="0.5" opacity="0.25"/>
      <text x="1050" y="522" font-family="var(--pi-mono)" font-size="var(--type-body-small)" letter-spacing="3" text-anchor="middle" fill="#191917">
LLM CORE
      </text>
      <text x="1050" y="552" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body)" text-anchor="middle" fill="#191917">
模型内核
      </text>
      <text x="1050" y="184" font-family="var(--pi-mono)" font-size="var(--type-meta)" letter-spacing="3" text-anchor="middle" fill="rgba(25,25,23,.55)">
OUTPUT · LAYER
      </text>
      <text x="1050" y="212" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body)" text-anchor="middle" fill="#191917">
输出防护
      </text>
      <text x="1050" y="272" font-family="var(--pi-mono)" font-size="var(--type-meta)" letter-spacing="3" text-anchor="middle" fill="rgba(25,25,23,.55)">
INPUT · LAYER
      </text>
      <text x="1050" y="300" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body)" text-anchor="middle" fill="#191917">
输入校验
      </text>
      <circle cx="1184.350288425444" cy="395.64971157455597" r="2.2" fill="#191917" opacity="0.6"/>
      <line x1="1184.350288425444" y1="395.64971157455597" x2="1194.2497833620557" y2="385.7502166379443" stroke="#191917" stroke-width="0.6" opacity="0.35"/>
      <text x="1204.1492782986675" y="380.85072170133265" font-family="var(--pi-mono)" font-weight="300" font-size="var(--type-label)" text-anchor="start" fill="rgba(25,25,23,.8)">
SCHEMA
      </text>
      <circle cx="1184.350288425444" cy="664.350288425444" r="2.2" fill="#191917" opacity="0.6"/>
      <line x1="1184.350288425444" y1="664.350288425444" x2="1194.2497833620557" y2="674.2497833620557" stroke="#191917" stroke-width="0.6" opacity="0.35"/>
      <text x="1204.1492782986675" y="689.1492782986674" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body-small)" text-anchor="start" fill="rgba(25,25,23,.8)">
越狱拦截
      </text>
      <circle cx="915.649711574556" cy="664.3502884254441" r="2.2" fill="#191917" opacity="0.6"/>
      <line x1="915.649711574556" y1="664.3502884254441" x2="905.7502166379443" y2="674.2497833620557" stroke="#191917" stroke-width="0.6" opacity="0.35"/>
      <text x="895.8507217013326" y="689.1492782986674" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body-small)" text-anchor="end" fill="rgba(25,25,23,.8)">
注入检测
      </text>
      <circle cx="915.6497115745559" cy="395.649711574556" r="2.2" fill="#191917" opacity="0.6"/>
      <line x1="915.6497115745559" y1="395.649711574556" x2="905.7502166379443" y2="385.75021663794433" stroke="#191917" stroke-width="0.6" opacity="0.35"/>
      <text x="895.8507217013326" y="380.85072170133265" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body-small)" text-anchor="end" fill="rgba(25,25,23,.8)">
敏感词过滤
      </text>
      <circle cx="1262.1320343559642" cy="317.86796564403573" r="2.2" fill="#191917" opacity="0.6"/>
      <line x1="1262.1320343559642" y1="317.86796564403573" x2="1272.031529292576" y2="307.9684707074241" stroke="#191917" stroke-width="0.6" opacity="0.35"/>
      <text x="1281.9310242291876" y="303.06897577081236" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body-small)" text-anchor="start" fill="rgba(25,25,23,.8)">
毒性过滤
      </text>
      <circle cx="1262.1320343559642" cy="742.1320343559643" r="2.2" fill="#191917" opacity="0.6"/>
      <line x1="1262.1320343559642" y1="742.1320343559643" x2="1272.031529292576" y2="752.0315292925759" stroke="#191917" stroke-width="0.6" opacity="0.35"/>
      <text x="1281.9310242291876" y="766.9310242291875" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body-small)" text-anchor="start" fill="rgba(25,25,23,.8)">
PII 脱敏
      </text>
      <circle cx="837.8679656440357" cy="742.1320343559643" r="2.2" fill="#191917" opacity="0.6"/>
      <line x1="837.8679656440357" y1="742.1320343559643" x2="827.9684707074241" y2="752.031529292576" stroke="#191917" stroke-width="0.6" opacity="0.35"/>
      <text x="818.0689757708125" y="766.9310242291876" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body-small)" text-anchor="end" fill="rgba(25,25,23,.8)">
事实核查
      </text>
      <circle cx="837.8679656440357" cy="317.8679656440358" r="2.2" fill="#191917" opacity="0.6"/>
      <line x1="837.8679656440357" y1="317.8679656440358" x2="827.968470707424" y2="307.9684707074241" stroke="#191917" stroke-width="0.6" opacity="0.35"/>
      <text x="818.0689757708124" y="303.0689757708125" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body-small)" text-anchor="end" fill="rgba(25,25,23,.8)">
内容分级
      </text>
      <rect x="150" y="570" width="400" height="280" fill="rgba(255,255,255,.22)" stroke="rgba(25,25,23,.8)" stroke-width="1.3"/>
      <rect x="155" y="575" width="390" height="270" fill="none" stroke="#191917" stroke-width="0.6" opacity="0.35"/>
      <text x="184" y="628" font-family="var(--pi-mono)" font-size="var(--type-subheading)" fill="#191917">
01
      </text>
      <line x1="182" y1="644" x2="238" y2="644" stroke="#191917" stroke-width="1.2"/>
      <rect x="490" y="594" width="30" height="30" fill="url(#h1-hatch)" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
      <text x="184" y="682" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body)" fill="#191917">
FALLBACK 兜底接管
      </text>
      <text x="184" y="706" font-family="var(--pi-mono)" font-size="var(--type-meta)" letter-spacing="2" fill="rgba(25,25,23,.55)">
FALLBACK · LAYER
      </text>
      <line x1="184" y1="722" x2="516" y2="722" stroke="#191917" stroke-width="0.8" opacity="0.5"/>
      <line x1="184" y1="726" x2="516" y2="726" stroke="#191917" stroke-width="0.6" opacity="0.25"/>
      <path d="M 186 745 L 191 751 L 202 738" fill="none" stroke="#191917" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="218" y="752" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body-small)" fill="rgba(25,25,23,.8)">
降级模型
      </text>
      <path d="M 186 771 L 191 777 L 202 764" fill="none" stroke="#191917" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="218" y="778" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body-small)" fill="rgba(25,25,23,.8)">
人工接管
      </text>
      <path d="M 186 797 L 191 803 L 202 790" fill="none" stroke="#191917" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="218" y="804" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body-small)" fill="rgba(25,25,23,.8)">
安全回复
      </text>
      <path d="M 186 823 L 191 829 L 202 816" fill="none" stroke="#191917" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="218" y="830" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body-small)" fill="rgba(25,25,23,.8)">
告警上报
      </text>
      <path d="M 550 624 C 720 620, 840 560, 964 528" fill="none" stroke="#191917" stroke-width="0.7" stroke-dasharray="3 5" opacity="0.45"/>
      <circle cx="964" cy="528" r="2.4" fill="#191917" opacity="0.6"/>
      <text x="1050" y="866" font-family="var(--pi-mono)" font-size="var(--type-micro-secondary)" letter-spacing="2" text-anchor="middle" fill="rgba(25,25,23,.45)">
FAIL-SAFE · AUDITED PER CALL
      </text>
    </g>
</svg></div>`
  },

  {
    name: "timeline-axis-vertical",
    group: "flow-temporal",
    groupLabel: "流程与时序",
    description: "A vertical ruled timeline for narrow slots.",
    label: "时间轴（竖排）",
    num: 104,
    variant: null,
    paperInkNative: true,
    frame: { width: 540, height: 600, fit: 'fixed' },
    dataContract: {"mode":"collection","unit":"milestone","pointer":"/structured_data","minItems":3,"maxItems":6},
    /* production promotion: Catalog new:10 → native.paper-ink.104.timeline-axis-vertical */
    snippet: `<div class="pi-card" data-bind-root="record" style="width:auto;min-height:0;overflow:visible"><svg class="pi-art" viewBox="0 0 900 1000" width="540" height="600">
  <line x1="250" y1="72" x2="250" y2="928" stroke="rgba(25,25,23,.8)" stroke-width="1.2"/>
  <g stroke="#191917" fill="none">
    <line x1="238" y1="72" x2="250" y2="72" stroke-width="1" opacity=".4"/>
    <line x1="243" y1="112" x2="250" y2="112" stroke-width=".5" opacity=".25"/>
    <line x1="243" y1="152" x2="250" y2="152" stroke-width=".5" opacity=".25"/>
    <line x1="243" y1="192" x2="250" y2="192" stroke-width=".5" opacity=".25"/>
    <line x1="243" y1="232" x2="250" y2="232" stroke-width=".5" opacity=".25"/>
    <line x1="238" y1="272" x2="250" y2="272" stroke-width="1" opacity=".4"/>
    <line x1="243" y1="312" x2="250" y2="312" stroke-width=".5" opacity=".25"/>
    <line x1="243" y1="352" x2="250" y2="352" stroke-width=".5" opacity=".25"/>
    <line x1="243" y1="392" x2="250" y2="392" stroke-width=".5" opacity=".25"/>
    <line x1="238" y1="432" x2="250" y2="432" stroke-width="1" opacity=".4"/>
    <line x1="243" y1="472" x2="250" y2="472" stroke-width=".5" opacity=".25"/>
    <line x1="243" y1="512" x2="250" y2="512" stroke-width=".5" opacity=".25"/>
    <line x1="243" y1="552" x2="250" y2="552" stroke-width=".5" opacity=".25"/>
    <line x1="238" y1="592" x2="250" y2="592" stroke-width="1" opacity=".4"/>
    <line x1="243" y1="632" x2="250" y2="632" stroke-width=".5" opacity=".25"/>
    <line x1="243" y1="672" x2="250" y2="672" stroke-width=".5" opacity=".25"/>
    <line x1="243" y1="712" x2="250" y2="712" stroke-width=".5" opacity=".25"/>
    <line x1="238" y1="752" x2="250" y2="752" stroke-width="1" opacity=".4"/>
    <line x1="243" y1="792" x2="250" y2="792" stroke-width=".5" opacity=".25"/>
    <line x1="243" y1="832" x2="250" y2="832" stroke-width=".5" opacity=".25"/>
    <line x1="243" y1="872" x2="250" y2="872" stroke-width=".5" opacity=".25"/>
    <line x1="238" y1="928" x2="250" y2="928" stroke-width="1" opacity=".4"/>
  </g>
  <g font-family="var(--pi-mono)" font-size="var(--type-subheading)" text-anchor="end" fill="#191917">
    <text x="205" y="124">2018</text><text x="205" y="284">2019</text><text x="205" y="444">2020</text>
    <text x="205" y="604">2022</text><text x="205" y="764">2023</text><text x="205" y="924">2025</text>
  </g>
  <g fill="#DFE0D9" stroke="rgba(25,25,23,.8)" stroke-width="1.2">
    <circle cx="250" cy="118" r="9"/><circle cx="250" cy="278" r="9"/><circle cx="250" cy="438" r="9"/>
    <circle cx="250" cy="598" r="9"/><circle cx="250" cy="918" r="9"/>
  </g>
  <g fill="#191917">
    <circle cx="250" cy="118" r="3"/><circle cx="250" cy="278" r="3"/><circle cx="250" cy="438" r="3"/>
    <circle cx="250" cy="598" r="3"/><circle cx="250" cy="758" r="5"/><circle cx="250" cy="918" r="3"/>
  </g>
  <circle cx="250" cy="758" r="16" fill="none" stroke="#191917" stroke-width="1.4"/>
  <circle cx="250" cy="758" r="20" fill="none" stroke="#191917" stroke-width=".6" opacity=".4"/>
  <g stroke="#191917" stroke-width=".6" opacity=".4">
    <line x1="262" y1="118" x2="286" y2="118"/><line x1="262" y1="278" x2="286" y2="278"/>
    <line x1="262" y1="438" x2="286" y2="438"/><line x1="262" y1="598" x2="286" y2="598"/>
    <line x1="272" y1="758" x2="286" y2="758"/><line x1="262" y1="918" x2="286" y2="918"/>
  </g>
  <g text-anchor="start">
    <text x="312" y="103" font-family="var(--pi-mono)" font-size="var(--type-body-small)" letter-spacing="1" fill="rgba(25,25,23,.8)">GPT-1</text>
    <text x="312" y="130" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body)" fill="#191917">预训练雏形</text>
    <text x="312" y="154" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-meta)" fill="rgba(25,25,23,.55)">1.17 亿参数 · 证明可行性</text>
    <text x="312" y="263" font-family="var(--pi-mono)" font-size="var(--type-body-small)" letter-spacing="1" fill="rgba(25,25,23,.8)">GPT-2</text>
    <text x="312" y="290" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body)" fill="#191917">规模跃迁</text>
    <text x="312" y="423" font-family="var(--pi-mono)" font-size="var(--type-body-small)" letter-spacing="1" fill="rgba(25,25,23,.8)">GPT-3</text>
    <text x="312" y="450" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body)" fill="#191917">涌现能力</text>
    <text x="312" y="583" font-family="var(--pi-mono)" font-size="var(--type-body-small)" letter-spacing="1" fill="rgba(25,25,23,.8)">CHATGPT</text>
    <text x="312" y="610" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body)" fill="#191917">对话破圈</text>
    <text x="312" y="743" font-family="var(--pi-mono)" font-size="var(--type-body-small)" letter-spacing="1" fill="rgba(25,25,23,.8)">GPT-4</text>
    <text x="312" y="770" font-family="var(--pi-sans)" font-weight="400" font-size="var(--type-body)" fill="#191917">多模态</text>
    <text x="312" y="796" font-family="var(--pi-sans)" font-weight="400" font-size="var(--type-meta)" fill="#191917">推理 · 多模态 · 月活破亿</text>
    <line x1="312" y1="810" x2="596" y2="810" stroke="#191917" stroke-width="1.2" opacity=".8"/>
    <text x="312" y="903" font-family="var(--pi-mono)" font-size="var(--type-body-small)" letter-spacing="1" fill="rgba(25,25,23,.8)">o1 / o3</text>
    <text x="312" y="930" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-body)" fill="#191917">推理模型</text>
    <text x="312" y="954" font-family="var(--pi-sans)" font-weight="300" font-size="var(--type-meta)" fill="rgba(25,25,23,.55)">思维链 · 自我反思</text>
  </g>
</svg></div>`
  },

  {
    name: "diamond-edge-labels",
    group: "relation-mapping",
    groupLabel: "关系与映射",
    description: "Four fixed nodes in a diamond with independently labelled edges.",
    label: "菱形四边标注",
    num: 105,
    variant: null,
    paperInkNative: true,
    frame: { width: 1100, height: 619, fit: 'fixed' },
    dataContract: {"mode":"record","unit":"node","pointer":"/structured_data","minItems":4,"maxItems":4},
    /* production promotion: Catalog new:11 → native.paper-ink.105.diamond-edge-labels */
    snippet: `<div class="pi-card" data-bind-root="record" style="width:auto;min-height:0;overflow:visible"><svg class="pi-art" viewBox="0 0 1920 1080" width="1100" height="619">
<line x1="480" y1="566" x2="810" y2="740" transform="translate(0 -22)" stroke="#191917" stroke-width="0.9" opacity="0.5"></line>
<g transform="translate(0 -22)"><line x1="480" y1="474" x2="810" y2="300" stroke="#191917" stroke-width="0.9" opacity="0.5"></line><line x1="960" y1="694" x2="960" y2="394" stroke="#191917" stroke-width="0.9" opacity="0.5"></line><line x1="1110" y1="300" x2="1440" y2="474" stroke="#191917" stroke-width="0.9" opacity="0.5"></line><line x1="1110" y1="740" x2="1440" y2="566" stroke="#191917" stroke-width="0.9" opacity="0.5"></line><line x1="630" y1="520" x2="948" y2="520" stroke="#191917" stroke-width="0.9" opacity="0.5"></line><line x1="972" y1="520" x2="1290" y2="520" stroke="#191917" stroke-width="0.9" opacity="0.5"></line><text x="605" y="355" font-family="var(--pi-mono)" font-size="var(--type-meta)" letter-spacing="1.5" text-anchor="end" fill="#191917">CONTEXT RECALL / PRECISION</text><text x="605" y="379" font-family="var(--pi-sans)" font-weight="400" font-size="var(--type-label)" text-anchor="end" fill="rgba(25,25,23,.6)">检索覆盖</text><path d="M 637 363 L 946 402" stroke="#191917" stroke-width="0.6" opacity="0.4" stroke-dasharray="2 4" fill="none"></path><circle cx="950" cy="404" r="2" fill="#191917" opacity="0.5"></circle><circle cx="645" cy="387" r="2.4" fill="#191917" opacity="0.7"></circle><text x="1315" y="355" font-family="var(--pi-mono)" font-size="var(--type-meta)" letter-spacing="1.5" text-anchor="start" fill="#191917">FAITHFULNESS</text><text x="1315" y="379" font-family="var(--pi-sans)" font-weight="400" font-size="var(--type-label)" text-anchor="start" fill="rgba(25,25,23,.6)">忠实度</text><circle cx="1275" cy="387" r="2.4" fill="#191917" opacity="0.7"></circle><text x="720" y="552" font-family="var(--pi-mono)" font-size="var(--type-meta)" letter-spacing="1.5" text-anchor="middle" fill="#191917">RESPONSE RELEVANCY</text><text x="720" y="576" font-family="var(--pi-sans)" font-weight="400" font-size="var(--type-label)" text-anchor="middle" fill="rgba(25,25,23,.6)">回答相关</text><circle cx="720" cy="520" r="2.4" fill="#191917" opacity="0.7"></circle><text x="1315" y="687" font-family="var(--pi-mono)" font-size="var(--type-meta)" letter-spacing="1.5" text-anchor="start" fill="#191917">FACTUAL CORRECTNESS</text><text x="1315" y="711" font-family="var(--pi-sans)" font-weight="400" font-size="var(--type-label)" text-anchor="start" fill="rgba(25,25,23,.6)">事实正确</text><circle cx="1275" cy="653" r="2.4" fill="#191917" opacity="0.7"></circle><rect x="330" y="474" width="300" height="92" fill="#DFE0D9" stroke="none"></rect><rect x="330" y="474" width="300" height="92" fill="none" stroke="rgba(25,25,23,.8)" stroke-width="1.3"></rect><rect x="335" y="479" width="290" height="82" fill="none" stroke="#191917" stroke-width="0.6" opacity="0.35"></rect><text x="480" y="516" font-family="var(--pi-mono)" font-size="var(--type-label)" letter-spacing="2" text-anchor="middle" fill="#191917">USER INPUT</text><text x="480" y="548" font-family="var(--pi-sans)" font-weight="400" font-size="var(--type-body)" text-anchor="middle" fill="rgba(25,25,23,.8)">用户问题</text><rect x="810" y="254" width="300" height="92" fill="#DFE0D9" stroke="none"></rect><rect x="810" y="254" width="300" height="92" fill="none" stroke="rgba(25,25,23,.8)" stroke-width="1.3"></rect><rect x="815" y="259" width="290" height="82" fill="none" stroke="#191917" stroke-width="0.6" opacity="0.35"></rect><text x="960" y="296" font-family="var(--pi-mono)" font-size="var(--type-label)" letter-spacing="2" text-anchor="middle" fill="#191917">RETRIEVED CONTEXTS</text><text x="960" y="328" font-family="var(--pi-sans)" font-weight="400" font-size="var(--type-body)" text-anchor="middle" fill="rgba(25,25,23,.8)">检索上下文</text><rect x="1290" y="474" width="300" height="92" fill="#DFE0D9" stroke="none"></rect><rect x="1290" y="474" width="300" height="92" fill="none" stroke="rgba(25,25,23,.8)" stroke-width="1.3"></rect><rect x="1295" y="479" width="290" height="82" fill="none" stroke="#191917" stroke-width="0.6" opacity="0.35"></rect><text x="1440" y="516" font-family="var(--pi-mono)" font-size="var(--type-label)" letter-spacing="2" text-anchor="middle" fill="#191917">RESPONSE</text><text x="1440" y="548" font-family="var(--pi-sans)" font-weight="400" font-size="var(--type-body)" text-anchor="middle" fill="rgba(25,25,23,.8)">模型回答</text><rect x="810" y="694" width="300" height="92" fill="#DFE0D9" stroke="none"></rect><rect x="810" y="694" width="300" height="92" fill="none" stroke="rgba(25,25,23,.8)" stroke-width="1.3"></rect><rect x="815" y="699" width="290" height="82" fill="none" stroke="#191917" stroke-width="0.6" opacity="0.35"></rect><text x="960" y="736" font-family="var(--pi-mono)" font-size="var(--type-label)" letter-spacing="2" text-anchor="middle" fill="#191917">REFERENCE</text><text x="960" y="768" font-family="var(--pi-sans)" font-weight="400" font-size="var(--type-body)" text-anchor="middle" fill="rgba(25,25,23,.8)">参考答案</text><text x="960" y="376" font-family="var(--pi-mono)" font-size="var(--type-meta)" letter-spacing="2" text-anchor="middle" fill="rgba(25,25,23,.45)">RECALL@K · PRECISION@K · MRR · NDCG@K</text></g>
</svg></div>`
  },

  {
    name: "balance-scale",
    group: "comparison",
    groupLabel: "对比与对照",
    description: "A two-sided balance for explicit trade-offs, with independently bound evidence on both sides.",
    label: "权衡天平",
    num: 106,
    variant: null,
    paperInkNative: true,
    frame: { width: 1050, height: 560, fit: 'fixed' },
    dataContract: { mode: 'record', unit: 'side', pointer: '/structured_data', minItems: 2, maxItems: 2 },
    /* classic relationship component → native.paper-ink.106.balance-scale */
    snippet: `<div class="pi-card" data-bind-root="record" style="width:1050px!important;min-height:560px!important;background:transparent"><svg class="pi-art" viewBox="0 0 1050 560" xmlns="http://www.w3.org/2000/svg" aria-label="双侧权衡天平">
  <g fill="var(--pi-ink)" font-family="var(--pi-sans)">
    <line x1="525" y1="0" x2="525" y2="455" stroke="var(--pi-ink)" stroke-width="1.8"/>
    <path d="M 415 485 H 635 L 587 451 H 463 Z" fill="var(--pi-paper)" stroke="var(--pi-ink)" stroke-width="1"/>
    <circle cx="525" cy="32" r="28" fill="var(--pi-paper)" stroke="var(--pi-ink)" stroke-width="1.4"/>
    <line x1="65" y1="95" x2="985" y2="15" stroke="var(--pi-ink)" stroke-width="2"/>

    <line x1="130" y1="89" x2="130" y2="290" stroke="var(--pi-ink)" stroke-width="1"/>
    <line x1="0" y1="290" x2="260" y2="290" stroke="var(--pi-ink)" stroke-width="1"/>
    <path d="M 0 290 Q 130 460 260 290" fill="rgba(255,255,255,.25)" stroke="var(--pi-ink)" stroke-width="1"/>

    <line x1="920" y1="21" x2="920" y2="222" stroke="var(--pi-ink)" stroke-width="1"/>
    <line x1="790" y1="222" x2="1050" y2="222" stroke="var(--pi-ink)" stroke-width="1"/>
    <path d="M 790 222 Q 920 392 1050 222" fill="var(--pi-paper)" stroke="var(--pi-ink)" stroke-width="1"/>

    <text x="130" y="415" text-anchor="middle" font-family="var(--pi-mono)" font-size="14" letter-spacing="3" fill="var(--pi-ink-45)">SPEED</text>
    <text data-field="left_title" x="130" y="460" text-anchor="middle" font-size="31" font-weight="300">增长速度</text>
    <text x="130" y="504" text-anchor="middle" font-size="17" font-weight="300" fill="var(--pi-ink-60)"><tspan data-field="left_point_1">更快验证市场</tspan><tspan> · </tspan><tspan data-field="left_point_2">更早形成反馈</tspan></text>

    <text x="920" y="347" text-anchor="middle" font-family="var(--pi-mono)" font-size="14" letter-spacing="3" fill="var(--pi-ink-45)">GOVERNANCE</text>
    <text data-field="right_title" x="920" y="392" text-anchor="middle" font-size="31" font-weight="300">风险控制</text>
    <text x="920" y="436" text-anchor="middle" font-size="17" font-weight="300" fill="var(--pi-ink-60)"><tspan data-field="right_point_1">降低返工概率</tspan><tspan> · </tspan><tspan data-field="right_point_2">保留审计证据</tspan></text>

    <text data-field="decision" x="525" y="548" text-anchor="middle" font-size="22" font-weight="300"></text>
  </g>
</svg></div>`
  },

  {
    name: "interlocking-gears",
    group: "relation-mapping",
    groupLabel: "关系与映射",
    description: "Two to four mutually driving modules shown as an interlocking gear system.",
    label: "互锁齿轮",
    num: 107,
    variant: null,
    paperInkNative: true,
    frame: { width: 790, height: 560, fit: 'fixed' },
    dataContract: { mode: 'collection', unit: 'module', pointer: '/structured_data/modules', minItems: 2, maxItems: 4 },
    /* classic relationship component → native.paper-ink.107.interlocking-gears */
    snippet: `<div class="pi-card" data-bind-root="collection" style="width:1050px!important;min-height:560px!important"><svg class="pi-art" viewBox="0 0 1050 560" xmlns="http://www.w3.org/2000/svg" aria-label="互锁齿轮关系图">
  <defs>
    <pattern id="pi-gear-dots" width="10" height="10" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".8" fill="var(--pi-ink)" opacity=".2"/></pattern>
    <path id="pi-gear-outline" d="M -21.7 -81.1 L -13.1 -83.0 L -10.5 -99.5 L 10.5 -99.5 L 13.1 -83.0 L 21.7 -81.1 L 30.1 -78.4 L 40.7 -91.4 L 58.8 -80.9 L 52.9 -65.3 L 59.4 -59.4 L 65.3 -52.9 L 80.9 -58.8 L 91.4 -40.7 L 78.4 -30.1 L 81.1 -21.7 L 83.0 -13.1 L 99.5 -10.5 L 99.5 10.5 L 83.0 13.1 L 81.1 21.7 L 78.4 30.1 L 91.4 40.7 L 80.9 58.8 L 65.3 52.9 L 59.4 59.4 L 52.9 65.3 L 58.8 80.9 L 40.7 91.4 L 30.1 78.4 L 21.7 81.1 L 13.1 83.0 L 10.5 99.5 L -10.5 99.5 L -13.1 83.0 L -21.7 81.1 L -30.1 78.4 L -40.7 91.4 L -58.8 80.9 L -52.9 65.3 L -59.4 59.4 L -65.3 52.9 L -80.9 58.8 L -91.4 40.7 L -78.4 30.1 L -81.1 21.7 L -83.0 13.1 L -99.5 10.5 L -99.5 -10.5 L -83.0 -13.1 L -81.1 -21.7 L -78.4 -30.1 L -91.4 -40.7 L -80.9 -58.8 L -65.3 -52.9 L -59.4 -59.4 L -52.9 -65.3 L -58.8 -80.9 L -40.7 -91.4 L -30.1 -78.4 Z"/>
  </defs>
  <text x="525" y="36" text-anchor="middle" font-family="var(--pi-mono)" font-size="10" letter-spacing="2.6" fill="var(--pi-ink-45)">COUPLED SYSTEM · MUTUAL DRIVE</text>
  <g data-repeat-unit="module">
    <g transform="translate(327 286) scale(1.28)">
      <use href="#pi-gear-outline" fill="url(#pi-gear-dots)" stroke="var(--pi-ink-80)" stroke-width="1.15" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
      <circle r="57" fill="var(--pi-paper)" stroke="var(--pi-ink-80)" stroke-width=".85" vector-effect="non-scaling-stroke"/>
      <text data-field="module_1" x="0" y="-4" text-anchor="middle" font-family="var(--pi-sans)" font-size="18" font-weight="300" fill="var(--pi-ink)">内容</text>
      <text data-field="module_1_desc" x="0" y="22" text-anchor="middle" font-family="var(--pi-sans)" font-size="10" font-weight="300" fill="var(--pi-ink-60)">知识与任务</text>
    </g>
    <g transform="translate(543 202) rotate(15) scale(.98)">
      <use href="#pi-gear-outline" fill="rgba(255,255,255,.24)" stroke="var(--pi-ink-80)" stroke-width="1.15" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
      <circle r="57" fill="var(--pi-paper)" stroke="var(--pi-ink-80)" stroke-width=".85" vector-effect="non-scaling-stroke"/>
      <g transform="rotate(-15)"><text data-field="module_2" x="0" y="-4" text-anchor="middle" font-family="var(--pi-sans)" font-size="18" font-weight="300" fill="var(--pi-ink)">模型</text><text data-field="module_2_desc" x="0" y="22" text-anchor="middle" font-family="var(--pi-sans)" font-size="10" font-weight="300" fill="var(--pi-ink-60)">推理与执行</text></g>
    </g>
    <g transform="translate(530 403) rotate(15) scale(1.02)">
      <use href="#pi-gear-outline" fill="rgba(255,255,255,.14)" stroke="var(--pi-ink-80)" stroke-width="1.15" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
      <circle r="57" fill="var(--pi-paper)" stroke="var(--pi-ink-80)" stroke-width=".85" vector-effect="non-scaling-stroke"/>
      <g transform="rotate(-15)"><text data-field="module_3" x="0" y="-4" text-anchor="middle" font-family="var(--pi-sans)" font-size="18" font-weight="300" fill="var(--pi-ink)">评测</text><text data-field="module_3_desc" x="0" y="22" text-anchor="middle" font-family="var(--pi-sans)" font-size="10" font-weight="300" fill="var(--pi-ink-60)">反馈与校准</text></g>
    </g>
  </g>
  <g transform="translate(690 280)">
    <text x="115" y="-30" text-anchor="middle" font-family="var(--pi-mono)" font-size="9" letter-spacing="2" fill="var(--pi-ink-45)">SYSTEM OUTPUT</text>
    <line x1="0" y1="0" x2="230" y2="0" stroke="var(--pi-ink-80)" stroke-width="1"/>
    <path d="M 218 -8 L 230 0 L 218 8" fill="none" stroke="var(--pi-ink-80)" stroke-width="1"/>
    <text data-field="system_result" x="115" y="49" text-anchor="middle" font-family="var(--pi-sans)" font-size="23" font-weight="300" fill="var(--pi-ink)">稳定交付</text>
  </g>
  <text x="525" y="530" text-anchor="middle" font-family="var(--pi-sans)" font-size="14" font-weight="300" fill="var(--pi-ink-60)">齿轮只表达彼此驱动：任一模块停转，系统能力都会失速</text>
</svg></div>`
  }
  /* END promoted catalog components v120 */
  ]
};
