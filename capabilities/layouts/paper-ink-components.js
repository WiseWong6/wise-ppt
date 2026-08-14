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
 * - snippet 统一包一层 .pi-card（600×600 构图），SVG 用 viewBox 缩放；
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
.pi-card text { user-select: none; }`,
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
      frame: { width: 600, height: 600, fit: 'fixed' },
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
    <text x="24" y="396" font-family="var(--pi-mono)" font-size="12" letter-spacing="2" fill="var(--pi-ink)">2022</text>
    <line x1="24" y1="405" x2="68" y2="405" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
    <text x="24" y="429" font-family="var(--pi-sans)" font-weight="300" font-size="15" fill="var(--pi-ink)">单点工具</text>
    <text x="24" y="449" font-family="var(--pi-sans)" font-weight="300" font-size="10.5" fill="var(--pi-ink-70)">单任务模型调用跑通</text>
  </g>
  <g>
    <circle cx="160" cy="459" r="4" fill="var(--pi-paper)" stroke="var(--pi-ink-80)" stroke-width="1"/>
    <circle cx="160" cy="459" r="1.6" fill="var(--pi-ink)"/>
    <line x1="160" y1="453" x2="160" y2="413" stroke="var(--pi-ink)" stroke-width=".7" opacity=".45"/>
    <text x="132" y="355" font-family="var(--pi-mono)" font-size="12" letter-spacing="2" fill="var(--pi-ink)">2023</text>
    <line x1="132" y1="364" x2="176" y2="364" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
    <text x="132" y="388" font-family="var(--pi-sans)" font-weight="300" font-size="15" fill="var(--pi-ink)">工作流自动化</text>
    <text x="132" y="408" font-family="var(--pi-sans)" font-weight="300" font-size="10.5" fill="var(--pi-ink-70)">12 条流水线上线</text>
  </g>
  <g>
    <circle cx="268" cy="418" r="4" fill="var(--pi-paper)" stroke="var(--pi-ink-80)" stroke-width="1"/>
    <circle cx="268" cy="418" r="1.6" fill="var(--pi-ink)"/>
    <line x1="268" y1="412" x2="268" y2="372" stroke="var(--pi-ink)" stroke-width=".7" opacity=".45"/>
    <text x="240" y="314" font-family="var(--pi-mono)" font-size="12" letter-spacing="2" fill="var(--pi-ink)">2024</text>
    <line x1="240" y1="323" x2="284" y2="323" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
    <text x="240" y="347" font-family="var(--pi-sans)" font-weight="300" font-size="15" fill="var(--pi-ink)">Agent 协同</text>
    <text x="240" y="367" font-family="var(--pi-sans)" font-weight="300" font-size="10.5" fill="var(--pi-ink-70)">路径规划 V2 发布</text>
  </g>
  <g>
    <circle cx="376" cy="377" r="4" fill="var(--pi-paper)" stroke="var(--pi-ink-80)" stroke-width="1"/>
    <circle cx="376" cy="377" r="1.6" fill="var(--pi-ink)"/>
    <line x1="376" y1="371" x2="376" y2="331" stroke="var(--pi-ink)" stroke-width=".7" opacity=".45"/>
    <text x="348" y="273" font-family="var(--pi-mono)" font-size="12" letter-spacing="2" fill="var(--pi-ink)">2025</text>
    <line x1="348" y1="282" x2="392" y2="282" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
    <text x="348" y="306" font-family="var(--pi-sans)" font-weight="300" font-size="15" fill="var(--pi-ink)">多 Agent 编排</text>
    <text x="348" y="326" font-family="var(--pi-sans)" font-weight="300" font-size="10.5" fill="var(--pi-ink-70)">统一编排</text>
  </g>
  <g>
    <circle cx="484" cy="336" r="4" fill="var(--pi-paper)" stroke="var(--pi-ink-80)" stroke-width="1"/>
    <circle cx="484" cy="336" r="1.6" fill="var(--pi-ink)"/>
    <line x1="484" y1="330" x2="484" y2="290" stroke="var(--pi-ink)" stroke-width=".7" opacity=".45"/>
    <text x="456" y="232" font-family="var(--pi-mono)" font-size="12" letter-spacing="2" fill="var(--pi-ink)">2026</text>
    <line x1="456" y1="241" x2="500" y2="241" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
    <text x="456" y="265" font-family="var(--pi-sans)" font-weight="300" font-size="15" fill="var(--pi-ink)">自主组织</text>
    <text x="456" y="285" font-family="var(--pi-sans)" font-weight="300" font-size="10.5" fill="var(--pi-ink-70)">百 Agent 互联</text>
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
    frame: { width: 600, height: 600, fit: 'fixed' },
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
    frame: { width: 600, height: 600, fit: 'fixed' },
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
    frame: { width: 600, height: 600, fit: 'fixed' },
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
    frame: { width: 600, height: 600, fit: 'fixed' },
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
    frame: { width: 600, height: 600, fit: 'fixed' },
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
    frame: { width: 600, height: 600, fit: 'fixed' },
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
    frame: { width: 600, height: 600, fit: 'fixed' },
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
    frame: { width: 600, height: 600, fit: 'fixed' },
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
    frame: { width: 600, height: 600, fit: 'fixed' },
    /* 出自样张 layout-b6.html */
    snippet: `<div class="pi-card">
<svg class="pi-art" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
  <text x="48" y="52" font-family="var(--pi-mono)" font-size="9" letter-spacing="3" fill="var(--pi-ink-45)">S-ROAD · DECADE TRACE</text>
  <line x1="48" y1="62" x2="176" y2="62" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>

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
    frame: { width: 600, height: 600, fit: 'fixed' },
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
    frame: { width: 600, height: 600, fit: 'fixed' },
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
    frame: { width: 600, height: 600, fit: 'fixed' },
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
    frame: { width: 600, height: 600, fit: 'fixed' },
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
    frame: { width: 600, height: 600, fit: 'fixed' },
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
    frame: { width: 600, height: 600, fit: 'fixed' },
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
    frame: { width: 600, height: 600, fit: 'fixed' },
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
    frame: { width: 600, height: 600, fit: 'fixed' },
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
  <line x1="140" y1="552" x2="240" y2="552" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
  <line x1="360" y1="552" x2="460" y2="552" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
  <text x="300" y="556" font-family="var(--pi-mono)" font-size="8" letter-spacing="3" text-anchor="middle" fill="var(--pi-ink-45)">WATERSHED · 4 PAIRS</text>
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
    frame: { width: 600, height: 600, fit: 'fixed' },
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
    frame: { width: 600, height: 600, fit: 'fixed' },
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
    description: 'Parallel double-framed persona cards with avatar placeholder and key-value attribute rows.',
    label: '人物画像卡',
    num: 84,
    variant: null,
    paperInkNative: true,
    frame: { width: 600, height: 600, fit: 'fixed' },
    /* 出自样张 layout-c3.html（C3 顶图卡列阵：三卡等宽并列，卡内 图区→角标→卡题→履历→底脚） */
    snippet: `<div class="pi-card">
<svg class="pi-art" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="pi-hatch-pc" width="8" height="8" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="0" y2="8" stroke="var(--pi-ink)" stroke-width=".7" opacity=".35"/>
    </pattern>
  </defs>

  <!-- 卡一 · 个人用户 -->
  <rect x="30" y="36" width="168" height="528" fill="var(--pi-paper-panel)" stroke="var(--pi-ink-80)" stroke-width="1.3"/>
  <rect x="34" y="40" width="160" height="520" fill="none" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
  <circle cx="114" cy="140" r="34" fill="url(#pi-hatch-pc)" stroke="var(--pi-ink-80)" stroke-width="1.1"/>
  <circle cx="114" cy="132" r="11" fill="var(--pi-paper)" stroke="var(--pi-ink-80)" stroke-width="1"/>
  <path d="M 92 166 A 22 22 0 0 1 136 166" fill="var(--pi-paper)" stroke="var(--pi-ink-80)" stroke-width="1"/>
  <text x="114" y="196" font-family="var(--pi-mono)" font-size="7.5" letter-spacing="2" text-anchor="middle" fill="var(--pi-ink-45)">PERSONA · DAILY USE</text>
  <line x1="46" y1="216" x2="182" y2="216" stroke="var(--pi-ink)" stroke-width=".8" opacity=".5"/>
  <line x1="46" y1="219" x2="82" y2="219" stroke="var(--pi-ink)" stroke-width=".6" opacity=".25"/>
  <text x="46" y="240" font-family="var(--pi-mono)" font-size="8" letter-spacing="1.5" fill="var(--pi-ink-45)">USER 01</text>
  <text x="182" y="240" font-family="var(--pi-mono)" font-size="8" letter-spacing="1.5" text-anchor="end" fill="var(--pi-ink-45)">PERSONAL</text>
  <text x="46" y="268" font-family="var(--pi-sans)" font-weight="300" font-size="12.5" fill="var(--pi-ink)">个人用户 · 随手记录</text>
  <line x1="46" y1="282" x2="182" y2="282" stroke="var(--pi-ink)" stroke-width=".8" opacity=".5"/>
  <circle cx="52" cy="304" r="2.6" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".8"/><circle cx="52" cy="304" r=".9" fill="var(--pi-ink)"/>
  <text x="64" y="308" font-family="var(--pi-sans)" font-weight="300" font-size="10.5" fill="var(--pi-ink)">核心目标</text>
  <text x="182" y="307" font-family="var(--pi-mono)" font-size="8" letter-spacing=".5" text-anchor="end" fill="var(--pi-ink-55)">快速记下</text>
  <line x1="46" y1="324" x2="182" y2="324" stroke="var(--pi-ink)" stroke-width=".6" opacity=".22"/>
  <circle cx="52" cy="336" r="2.6" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".8"/><circle cx="52" cy="336" r=".9" fill="var(--pi-ink)"/>
  <text x="64" y="340" font-family="var(--pi-sans)" font-weight="300" font-size="10.5" fill="var(--pi-ink)">使用频率</text>
  <text x="182" y="339" font-family="var(--pi-mono)" font-size="8" letter-spacing=".5" text-anchor="end" fill="var(--pi-ink-55)">4 DAYS/WK</text>
  <line x1="46" y1="356" x2="182" y2="356" stroke="var(--pi-ink)" stroke-width=".6" opacity=".22"/>
  <circle cx="52" cy="368" r="2.6" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".8"/><circle cx="52" cy="368" r=".9" fill="var(--pi-ink)"/>
  <text x="64" y="372" font-family="var(--pi-sans)" font-weight="300" font-size="10.5" fill="var(--pi-ink)">完成时间</text>
  <text x="182" y="371" font-family="var(--pi-mono)" font-size="8" letter-spacing=".5" text-anchor="end" fill="var(--pi-ink-55)">3 MIN</text>
  <line x1="46" y1="388" x2="182" y2="388" stroke="var(--pi-ink)" stroke-width=".6" opacity=".22"/>
  <circle cx="52" cy="400" r="2.6" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".8"/><circle cx="52" cy="400" r=".9" fill="var(--pi-ink)"/>
  <text x="64" y="404" font-family="var(--pi-sans)" font-weight="300" font-size="10.5" fill="var(--pi-ink)">常用方式</text>
  <text x="182" y="403" font-family="var(--pi-mono)" font-size="8" letter-spacing=".5" text-anchor="end" fill="var(--pi-ink-55)">QUICK TMPL</text>
  <line x1="46" y1="488" x2="182" y2="488" stroke="var(--pi-ink)" stroke-width=".6" opacity=".25"/>
  <text x="46" y="508" font-family="var(--pi-mono)" font-size="8" letter-spacing="1.5" fill="var(--pi-ink-45)">PERSONA P-01 · SAMPLE</text>

  <!-- 卡二 · 团队用户 -->
  <rect x="216" y="36" width="168" height="528" fill="var(--pi-paper-panel)" stroke="var(--pi-ink-80)" stroke-width="1.3"/>
  <rect x="220" y="40" width="160" height="520" fill="none" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
  <circle cx="300" cy="140" r="34" fill="url(#pi-hatch-pc)" stroke="var(--pi-ink-80)" stroke-width="1.1"/>
  <circle cx="300" cy="132" r="11" fill="var(--pi-paper)" stroke="var(--pi-ink-80)" stroke-width="1"/>
  <path d="M 278 166 A 22 22 0 0 1 322 166" fill="var(--pi-paper)" stroke="var(--pi-ink-80)" stroke-width="1"/>
  <text x="300" y="196" font-family="var(--pi-mono)" font-size="7.5" letter-spacing="2" text-anchor="middle" fill="var(--pi-ink-45)">PERSONA · TEAM USE</text>
  <line x1="232" y1="216" x2="368" y2="216" stroke="var(--pi-ink)" stroke-width=".8" opacity=".5"/>
  <line x1="232" y1="219" x2="268" y2="219" stroke="var(--pi-ink)" stroke-width=".6" opacity=".25"/>
  <text x="232" y="240" font-family="var(--pi-mono)" font-size="8" letter-spacing="1.5" fill="var(--pi-ink-45)">USER 02</text>
  <text x="368" y="240" font-family="var(--pi-mono)" font-size="8" letter-spacing="1.5" text-anchor="end" fill="var(--pi-ink-45)">TEAM</text>
  <text x="232" y="268" font-family="var(--pi-sans)" font-weight="300" font-size="12.5" fill="var(--pi-ink)">团队用户 · 协同推进</text>
  <line x1="232" y1="282" x2="368" y2="282" stroke="var(--pi-ink)" stroke-width=".8" opacity=".5"/>
  <circle cx="238" cy="304" r="2.6" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".8"/><circle cx="238" cy="304" r=".9" fill="var(--pi-ink)"/>
  <text x="250" y="308" font-family="var(--pi-sans)" font-weight="300" font-size="10.5" fill="var(--pi-ink)">核心目标</text>
  <text x="368" y="307" font-family="var(--pi-mono)" font-size="8" letter-spacing=".5" text-anchor="end" fill="var(--pi-ink-55)">一起完成</text>
  <line x1="232" y1="324" x2="368" y2="324" stroke="var(--pi-ink)" stroke-width=".6" opacity=".22"/>
  <circle cx="238" cy="336" r="2.6" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".8"/><circle cx="238" cy="336" r=".9" fill="var(--pi-ink)"/>
  <text x="250" y="340" font-family="var(--pi-sans)" font-weight="300" font-size="10.5" fill="var(--pi-ink)">使用频率</text>
  <text x="368" y="339" font-family="var(--pi-mono)" font-size="8" letter-spacing=".5" text-anchor="end" fill="var(--pi-ink-55)">5 DAYS/WK</text>
  <line x1="232" y1="356" x2="368" y2="356" stroke="var(--pi-ink)" stroke-width=".6" opacity=".22"/>
  <circle cx="238" cy="368" r="2.6" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".8"/><circle cx="238" cy="368" r=".9" fill="var(--pi-ink)"/>
  <text x="250" y="372" font-family="var(--pi-sans)" font-weight="300" font-size="10.5" fill="var(--pi-ink)">协作成员</text>
  <text x="368" y="371" font-family="var(--pi-mono)" font-size="8" letter-spacing=".5" text-anchor="end" fill="var(--pi-ink-55)">6 MEMBERS</text>
  <line x1="232" y1="388" x2="368" y2="388" stroke="var(--pi-ink)" stroke-width=".6" opacity=".22"/>
  <circle cx="238" cy="400" r="2.6" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".8"/><circle cx="238" cy="400" r=".9" fill="var(--pi-ink)"/>
  <text x="250" y="404" font-family="var(--pi-sans)" font-weight="300" font-size="10.5" fill="var(--pi-ink)">常用提醒</text>
  <text x="368" y="403" font-family="var(--pi-mono)" font-size="8" letter-spacing=".5" text-anchor="end" fill="var(--pi-ink-55)">WEEKLY PLAN</text>
  <line x1="232" y1="488" x2="368" y2="488" stroke="var(--pi-ink)" stroke-width=".6" opacity=".25"/>
  <text x="232" y="508" font-family="var(--pi-mono)" font-size="8" letter-spacing="1.5" fill="var(--pi-ink-45)">PERSONA P-02 · SAMPLE</text>

  <!-- 卡三 · 项目负责人 -->
  <rect x="402" y="36" width="168" height="528" fill="var(--pi-paper-panel)" stroke="var(--pi-ink-80)" stroke-width="1.3"/>
  <rect x="406" y="40" width="160" height="520" fill="none" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
  <circle cx="486" cy="140" r="34" fill="url(#pi-hatch-pc)" stroke="var(--pi-ink-80)" stroke-width="1.1"/>
  <circle cx="486" cy="132" r="11" fill="var(--pi-paper)" stroke="var(--pi-ink-80)" stroke-width="1"/>
  <path d="M 464 166 A 22 22 0 0 1 508 166" fill="var(--pi-paper)" stroke="var(--pi-ink-80)" stroke-width="1"/>
  <text x="486" y="196" font-family="var(--pi-mono)" font-size="7.5" letter-spacing="2" text-anchor="middle" fill="var(--pi-ink-45)">PERSONA · OVERVIEW</text>
  <line x1="418" y1="216" x2="554" y2="216" stroke="var(--pi-ink)" stroke-width=".8" opacity=".5"/>
  <line x1="418" y1="219" x2="454" y2="219" stroke="var(--pi-ink)" stroke-width=".6" opacity=".25"/>
  <text x="418" y="240" font-family="var(--pi-mono)" font-size="8" letter-spacing="1.5" fill="var(--pi-ink-45)">USER 03</text>
  <text x="554" y="240" font-family="var(--pi-mono)" font-size="8" letter-spacing="1.5" text-anchor="end" fill="var(--pi-ink-45)">LEAD</text>
  <text x="418" y="268" font-family="var(--pi-sans)" font-weight="300" font-size="12.5" fill="var(--pi-ink)">负责人 · 进度总览</text>
  <line x1="418" y1="282" x2="554" y2="282" stroke="var(--pi-ink)" stroke-width=".8" opacity=".5"/>
  <circle cx="424" cy="304" r="2.6" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".8"/><circle cx="424" cy="304" r=".9" fill="var(--pi-ink)"/>
  <text x="436" y="308" font-family="var(--pi-sans)" font-weight="300" font-size="10.5" fill="var(--pi-ink)">核心目标</text>
  <text x="554" y="307" font-family="var(--pi-mono)" font-size="8" letter-spacing=".5" text-anchor="end" fill="var(--pi-ink-55)">掌握进度</text>
  <line x1="418" y1="324" x2="554" y2="324" stroke="var(--pi-ink)" stroke-width=".6" opacity=".22"/>
  <circle cx="424" cy="336" r="2.6" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".8"/><circle cx="424" cy="336" r=".9" fill="var(--pi-ink)"/>
  <text x="436" y="340" font-family="var(--pi-sans)" font-weight="300" font-size="10.5" fill="var(--pi-ink)">查看频率</text>
  <text x="554" y="339" font-family="var(--pi-mono)" font-size="8" letter-spacing=".5" text-anchor="end" fill="var(--pi-ink-55)">2 TIMES/WK</text>
  <line x1="418" y1="356" x2="554" y2="356" stroke="var(--pi-ink)" stroke-width=".6" opacity=".22"/>
  <circle cx="424" cy="368" r="2.6" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".8"/><circle cx="424" cy="368" r=".9" fill="var(--pi-ink)"/>
  <text x="436" y="372" font-family="var(--pi-sans)" font-weight="300" font-size="10.5" fill="var(--pi-ink)">关注事项</text>
  <text x="554" y="371" font-family="var(--pi-mono)" font-size="8" letter-spacing=".5" text-anchor="end" fill="var(--pi-ink-55)">5 ITEMS</text>
  <line x1="418" y1="388" x2="554" y2="388" stroke="var(--pi-ink)" stroke-width=".6" opacity=".22"/>
  <circle cx="424" cy="400" r="2.6" fill="none" stroke="var(--pi-ink)" stroke-width=".9" opacity=".8"/><circle cx="424" cy="400" r=".9" fill="var(--pi-ink)"/>
  <text x="436" y="404" font-family="var(--pi-sans)" font-weight="300" font-size="10.5" fill="var(--pi-ink)">复盘节奏</text>
  <text x="554" y="403" font-family="var(--pi-mono)" font-size="8" letter-spacing=".5" text-anchor="end" fill="var(--pi-ink-55)">FRI REVIEW</text>
  <line x1="418" y1="488" x2="554" y2="488" stroke="var(--pi-ink)" stroke-width=".6" opacity=".25"/>
  <text x="418" y="508" font-family="var(--pi-mono)" font-size="8" letter-spacing="1.5" fill="var(--pi-ink-45)">PERSONA P-03 · SAMPLE</text>
</svg>
</div>`
  },

  {
    name: 'radial-progress',
    group: 'metric-data',
    groupLabel: '指标与数据',
    description: 'Instrument-style radial progress rings with big mono percent readouts.',
    label: '环形进度指标',
    num: 85,
    variant: null,
    paperInkNative: true,
    frame: { width: 600, height: 600, fit: 'fixed' },
    /* 出自样张 layout-c5.html */
    snippet: `<div class="pi-card">
<svg class="pi-art" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
  <!-- 顶部 mono 引题（证据帧顶部 TOTAL 注记的组件化收束；总量大数字由同页 stats 组件承担） -->
  <text x="300" y="48" font-family="var(--pi-mono)" font-size="9.5" letter-spacing="3" text-anchor="middle" fill="var(--pi-ink-45)">CAPACITY ALLOCATION · FY2026</text>
  <line x1="232" y1="62" x2="368" y2="62" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
  <circle cx="224" cy="62" r="1.8" fill="var(--pi-ink)" opacity=".6"/>
  <circle cx="376" cy="62" r="1.8" fill="var(--pi-ink)" opacity=".6"/>

  <!-- 环一 · 内容制作 38% -->
  <g>
    <circle cx="170" cy="190" r="90" fill="none" stroke="var(--pi-ink)" stroke-width=".5" stroke-dasharray="2 6" opacity=".28"/>
    <g stroke="var(--pi-ink)" opacity=".4">
      <line x1="252" y1="190" x2="260" y2="190" stroke-width=".8"/>
      <line x1="241" y1="231" x2="244.5" y2="233" stroke-width=".5"/>
      <line x1="211" y1="261" x2="213" y2="264.5" stroke-width=".5"/>
      <line x1="170" y1="272" x2="170" y2="280" stroke-width=".8"/>
      <line x1="129" y1="261" x2="127" y2="264.5" stroke-width=".5"/>
      <line x1="99" y1="231" x2="95.5" y2="233" stroke-width=".5"/>
      <line x1="88" y1="190" x2="80" y2="190" stroke-width=".8"/>
      <line x1="99" y1="149" x2="95.5" y2="147" stroke-width=".5"/>
      <line x1="129" y1="119" x2="127" y2="115.5" stroke-width=".5"/>
      <line x1="170" y1="108" x2="170" y2="100" stroke-width=".8"/>
      <line x1="211" y1="119" x2="213" y2="115.5" stroke-width=".5"/>
      <line x1="241" y1="149" x2="244.5" y2="147" stroke-width=".5"/>
    </g>
    <circle cx="170" cy="190" r="72" fill="none" stroke="var(--pi-ink)" stroke-width=".8" opacity=".3"/>
    <path d="M 170 118 A 72 72 0 0 1 219.3 242.5" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.4"/>
    <circle cx="219.3" cy="242.5" r="3" fill="var(--pi-ink)"/>
    <text x="170" y="199" font-family="var(--pi-mono)" font-size="26" text-anchor="middle" fill="var(--pi-ink)">38%</text>
    <text x="170" y="220" font-family="var(--pi-mono)" font-size="8.5" letter-spacing="1" text-anchor="middle" fill="var(--pi-ink-45)">38 / 100</text>
    <text x="170" y="306" font-family="var(--pi-sans)" font-weight="300" font-size="13" text-anchor="middle" fill="var(--pi-ink)">内容制作</text>
  </g>

  <!-- 环二 · 活动执行 27% -->
  <g>
    <circle cx="430" cy="190" r="90" fill="none" stroke="var(--pi-ink)" stroke-width=".5" stroke-dasharray="2 6" opacity=".28"/>
    <g stroke="var(--pi-ink)" opacity=".4">
      <line x1="512" y1="190" x2="520" y2="190" stroke-width=".8"/>
      <line x1="501" y1="231" x2="504.5" y2="233" stroke-width=".5"/>
      <line x1="471" y1="261" x2="473" y2="264.5" stroke-width=".5"/>
      <line x1="430" y1="272" x2="430" y2="280" stroke-width=".8"/>
      <line x1="389" y1="261" x2="387" y2="264.5" stroke-width=".5"/>
      <line x1="359" y1="231" x2="355.5" y2="233" stroke-width=".5"/>
      <line x1="348" y1="190" x2="340" y2="190" stroke-width=".8"/>
      <line x1="359" y1="149" x2="355.5" y2="147" stroke-width=".5"/>
      <line x1="389" y1="119" x2="387" y2="115.5" stroke-width=".5"/>
      <line x1="430" y1="108" x2="430" y2="100" stroke-width=".8"/>
      <line x1="471" y1="119" x2="473" y2="115.5" stroke-width=".5"/>
      <line x1="501" y1="149" x2="504.5" y2="147" stroke-width=".5"/>
    </g>
    <circle cx="430" cy="190" r="72" fill="none" stroke="var(--pi-ink)" stroke-width=".8" opacity=".3"/>
    <path d="M 430 118 A 72 72 0 0 1 501.4 199" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.4"/>
    <circle cx="501.4" cy="199" r="3" fill="var(--pi-ink)"/>
    <text x="430" y="199" font-family="var(--pi-mono)" font-size="26" text-anchor="middle" fill="var(--pi-ink)">27%</text>
    <text x="430" y="220" font-family="var(--pi-mono)" font-size="8.5" letter-spacing="1" text-anchor="middle" fill="var(--pi-ink-45)">27 / 100</text>
    <text x="430" y="306" font-family="var(--pi-sans)" font-weight="300" font-size="13" text-anchor="middle" fill="var(--pi-ink)">活动执行</text>
  </g>

  <!-- 环三 · 用户沟通 21% -->
  <g>
    <circle cx="170" cy="430" r="90" fill="none" stroke="var(--pi-ink)" stroke-width=".5" stroke-dasharray="2 6" opacity=".28"/>
    <g stroke="var(--pi-ink)" opacity=".4">
      <line x1="252" y1="430" x2="260" y2="430" stroke-width=".8"/>
      <line x1="241" y1="471" x2="244.5" y2="473" stroke-width=".5"/>
      <line x1="211" y1="501" x2="213" y2="504.5" stroke-width=".5"/>
      <line x1="170" y1="512" x2="170" y2="520" stroke-width=".8"/>
      <line x1="129" y1="501" x2="127" y2="504.5" stroke-width=".5"/>
      <line x1="99" y1="471" x2="95.5" y2="473" stroke-width=".5"/>
      <line x1="88" y1="430" x2="80" y2="430" stroke-width=".8"/>
      <line x1="99" y1="389" x2="95.5" y2="387" stroke-width=".5"/>
      <line x1="129" y1="359" x2="127" y2="355.5" stroke-width=".5"/>
      <line x1="170" y1="348" x2="170" y2="340" stroke-width=".8"/>
      <line x1="211" y1="359" x2="213" y2="355.5" stroke-width=".5"/>
      <line x1="241" y1="389" x2="244.5" y2="387" stroke-width=".5"/>
    </g>
    <circle cx="170" cy="430" r="72" fill="none" stroke="var(--pi-ink)" stroke-width=".8" opacity=".3"/>
    <path d="M 170 358 A 72 72 0 0 1 239.7 412.1" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.4"/>
    <circle cx="239.7" cy="412.1" r="3" fill="var(--pi-ink)"/>
    <text x="170" y="439" font-family="var(--pi-mono)" font-size="26" text-anchor="middle" fill="var(--pi-ink)">21%</text>
    <text x="170" y="460" font-family="var(--pi-mono)" font-size="8.5" letter-spacing="1" text-anchor="middle" fill="var(--pi-ink-45)">21 / 100</text>
    <text x="170" y="546" font-family="var(--pi-sans)" font-weight="300" font-size="13" text-anchor="middle" fill="var(--pi-ink)">用户沟通</text>
  </g>

  <!-- 环四 · 数据复盘 14% -->
  <g>
    <circle cx="430" cy="430" r="90" fill="none" stroke="var(--pi-ink)" stroke-width=".5" stroke-dasharray="2 6" opacity=".28"/>
    <g stroke="var(--pi-ink)" opacity=".4">
      <line x1="512" y1="430" x2="520" y2="430" stroke-width=".8"/>
      <line x1="501" y1="471" x2="504.5" y2="473" stroke-width=".5"/>
      <line x1="471" y1="501" x2="473" y2="504.5" stroke-width=".5"/>
      <line x1="430" y1="512" x2="430" y2="520" stroke-width=".8"/>
      <line x1="389" y1="501" x2="387" y2="504.5" stroke-width=".5"/>
      <line x1="359" y1="471" x2="355.5" y2="473" stroke-width=".5"/>
      <line x1="348" y1="430" x2="340" y2="430" stroke-width=".8"/>
      <line x1="359" y1="389" x2="355.5" y2="387" stroke-width=".5"/>
      <line x1="389" y1="359" x2="387" y2="355.5" stroke-width=".5"/>
      <line x1="430" y1="348" x2="430" y2="340" stroke-width=".8"/>
      <line x1="471" y1="359" x2="473" y2="355.5" stroke-width=".5"/>
      <line x1="501" y1="389" x2="504.5" y2="387" stroke-width=".5"/>
    </g>
    <circle cx="430" cy="430" r="72" fill="none" stroke="var(--pi-ink)" stroke-width=".8" opacity=".3"/>
    <path d="M 430 358 A 72 72 0 0 1 485.5 384.1" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.4"/>
    <circle cx="485.5" cy="384.1" r="3" fill="var(--pi-ink)"/>
    <text x="430" y="439" font-family="var(--pi-mono)" font-size="26" text-anchor="middle" fill="var(--pi-ink)">14%</text>
    <text x="430" y="460" font-family="var(--pi-mono)" font-size="8.5" letter-spacing="1" text-anchor="middle" fill="var(--pi-ink-45)">14 / 100</text>
    <text x="430" y="546" font-family="var(--pi-sans)" font-weight="300" font-size="13" text-anchor="middle" fill="var(--pi-ink)">数据复盘</text>
  </g>
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
    frame: { width: 600, height: 600, fit: 'fixed' },
    /* 出自样张 layout-f4.html（2 行 × 3 列规则格阵；格内：细线图标居中 → 标题 → mono EN code →
       短规线 → 两行说明；格阵上下缘各一条构造虚线；底部居中说明句） */
    snippet: `<div class="pi-card">
<svg class="pi-art" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="piHatch86" width="6" height="6" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="0" y2="6" stroke="var(--pi-ink)" stroke-width=".6" opacity=".3"/>
    </pattern>
  </defs>

  <!-- 格阵上缘构造虚线 -->
  <line x1="36" y1="84" x2="564" y2="84" stroke="var(--pi-ink)" stroke-width=".6" opacity=".22" stroke-dasharray="2 6"/>

  <!-- 格 1 · 用户洞察：分叉路径 + 节点 -->
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

  <!-- 格 4 · 团队协作：三道沟通弧 + 共识点 -->
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

  <!-- 格阵下缘构造虚线 -->
  <line x1="36" y1="472" x2="564" y2="472" stroke="var(--pi-ink)" stroke-width=".6" opacity=".22" stroke-dasharray="2 6"/>

  <!-- 底部居中说明句（对应帧 caption） -->
  <text x="300" y="516" font-family="var(--pi-sans)" font-weight="300" font-size="10.5" letter-spacing=".4" text-anchor="middle" fill="var(--pi-ink)">洞察、规划、设计、协作、数据与质量，构成持续交付用户价值的六项能力。</text>
  <text x="300" y="540" font-family="var(--pi-mono)" font-size="7" letter-spacing="2" text-anchor="middle" fill="var(--pi-ink-45)">SIX CAPABILITIES · GRID 2 × 3</text>
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
    frame: { width: 600, height: 600, fit: 'fixed' },
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
    description: 'Hand-drawn double-ellipse callouts and anchor-dot elbow leaders overlaid on host content.',
    label: '圈注引线批注装置',
    num: 88,
    variant: null,
    paperInkNative: true,
    frame: { width: 600, height: 600, fit: 'fixed' },
    /* 出自样张 layout-b2.html / layout-g2.html / layout-a1.html 的圈注与引线形制 */
    snippet: `<div class="pi-card">
<svg class="pi-art" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
  <!-- 栏签 + 顶部规线 -->
  <text x="48" y="52" font-family="var(--pi-mono)" font-size="11" letter-spacing="3" fill="var(--pi-ink-45)">ANNOTATION OVERLAY</text>
  <text x="552" y="52" font-family="var(--pi-mono)" font-size="9" letter-spacing="2" text-anchor="end" fill="var(--pi-ink-45)">3 NOTES</text>
  <line x1="48" y1="66" x2="552" y2="66" stroke="var(--pi-ink)" stroke-width=".6" opacity=".22"/>
  <line x1="48" y1="66" x2="118" y2="66" stroke="var(--pi-ink)" stroke-width="1.4" opacity=".7"/>

  <!-- 宿主内容占位层（被批注层，集成时由宿主槽位替换） -->
  <rect x="48" y="88" width="376" height="320" fill="var(--pi-paper-panel)" stroke="var(--pi-ink-80)" stroke-width=".9" stroke-dasharray="4 5" opacity=".5"/>
  <line x1="418" y1="88" x2="430" y2="88" stroke="var(--pi-ink)" stroke-width=".7" opacity=".4"/>
  <line x1="424" y1="82" x2="424" y2="94" stroke="var(--pi-ink)" stroke-width=".7" opacity=".4"/>
  <text x="64" y="112" font-family="var(--pi-mono)" font-size="8" letter-spacing="2" fill="var(--pi-ink-45)">HOST CONTENT · 被批注层（占位）</text>
  <text x="64" y="156" font-family="var(--pi-sans)" font-weight="300" font-size="12.5" fill="var(--pi-ink)">本季召回率提升至 92%，首字延迟降至 0.38s</text>
  <text x="64" y="196" font-family="var(--pi-sans)" font-weight="300" font-size="12.5" fill="var(--pi-ink)">灰度环境出现 3 次超时回退，集中在晚高峰</text>
  <text x="64" y="236" font-family="var(--pi-sans)" font-weight="300" font-size="12.5" fill="var(--pi-ink)">知识库 v14 已全量切换，索引重建 42min</text>
  <text x="64" y="286" font-family="var(--pi-sans)" font-weight="300" font-size="12.5" fill="var(--pi-ink)">下一步：重排策略 A/B，扩展 3 条业务线</text>

  <!-- 批注 01 · 手绘双椭圆圈注 + 贝塞尔引线 → 底部注释带（b2 形制） -->
  <ellipse cx="228" cy="148" rx="152" ry="21" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.3" transform="rotate(-2.5 228 148)"/>
  <ellipse cx="231" cy="150" rx="159" ry="23.5" fill="none" stroke="var(--pi-ink-80)" stroke-width=".8" opacity=".5" transform="rotate(3 231 150)"/>
  <path d="M 168 166 Q 108 300 80 438" fill="none" stroke="var(--pi-ink-80)" stroke-width="1" opacity=".7"/>
  <line x1="48" y1="442" x2="72" y2="442" stroke="var(--pi-ink-80)" stroke-width=".8" opacity=".5"/>
  <text x="84" y="446" font-family="var(--pi-mono)" font-size="9" letter-spacing="2" fill="var(--pi-ink-45)">NOTE 01 · METRIC VERIFIED</text>
  <text x="84" y="470" font-family="var(--pi-sans)" font-weight="300" font-size="12.5" fill="var(--pi-ink)">92% 为去重后口径，已与数据组核对</text>
  <text x="84" y="492" font-family="var(--pi-mono)" font-size="8.5" letter-spacing="1.5" fill="var(--pi-ink-45)">SOURCE · DW-042 · 去重口径</text>

  <!-- 批注 02 · 手绘双椭圆圈注 + 曲线引线 → 右列注释块（b2 + g2 形制） -->
  <ellipse cx="222" cy="228" rx="150" ry="21" fill="none" stroke="var(--pi-ink-80)" stroke-width="1.3" transform="rotate(-3 222 228)"/>
  <ellipse cx="225" cy="230" rx="157" ry="23" fill="none" stroke="var(--pi-ink-80)" stroke-width=".8" opacity=".5" transform="rotate(3.5 225 230)"/>
  <path d="M 372 234 Q 412 226 436 214" fill="none" stroke="var(--pi-ink-80)" stroke-width="1" opacity=".7"/>
  <line x1="444" y1="178" x2="444" y2="248" stroke="var(--pi-ink)" stroke-width=".8" opacity=".5"/>
  <text x="456" y="190" font-family="var(--pi-mono)" font-size="9" letter-spacing="2" fill="var(--pi-ink-45)">NOTE 02 · INDEX</text>
  <text x="456" y="216" font-family="var(--pi-sans)" font-weight="300" font-size="13" fill="var(--pi-ink)">索引重建 42min</text>
  <text x="456" y="240" font-family="var(--pi-mono)" font-size="8.5" letter-spacing="1.5" fill="var(--pi-ink-45)">OFF-PEAK · 可接受</text>

  <!-- 批注 03 · 锚点双圈 + 肘形虚线引线 → 右列注释块（g2 形制） -->
  <circle cx="176" cy="278" r="5" fill="var(--pi-paper)" stroke="var(--pi-ink-80)" stroke-width="1"/>
  <circle cx="176" cy="278" r="1.6" fill="var(--pi-ink)"/>
  <path d="M 176 278 L 396 278 L 396 330 L 436 330" fill="none" stroke="var(--pi-ink)" stroke-width=".7" opacity=".45" stroke-dasharray="3 5"/>
  <circle cx="436" cy="330" r="2.2" fill="var(--pi-ink)" opacity=".6"/>
  <line x1="444" y1="294" x2="444" y2="364" stroke="var(--pi-ink)" stroke-width=".8" opacity=".5"/>
  <text x="456" y="306" font-family="var(--pi-mono)" font-size="9" letter-spacing="2" fill="var(--pi-ink-45)">NOTE 03 · ROLLOUT</text>
  <text x="456" y="332" font-family="var(--pi-sans)" font-weight="300" font-size="13" fill="var(--pi-ink)">重排策略 A/B</text>
  <text x="456" y="356" font-family="var(--pi-mono)" font-size="8.5" letter-spacing="1.5" fill="var(--pi-ink-45)">3 BIZ LINES · W34</text>

  <!-- 页脚：定位约定 -->
  <line x1="48" y1="528" x2="552" y2="528" stroke="var(--pi-ink)" stroke-width=".6" opacity=".22"/>
  <text x="48" y="550" font-family="var(--pi-mono)" font-size="7.5" letter-spacing="1.5" fill="var(--pi-ink-45)">定位约定 · ANCHOR=(X,Y) 基于 600×600 VIEWBOX · 双椭圆圈注 + 肘形/曲线引线 · 1–4 条</text>
</svg>
</div>`
  }
  ]
};
