# 组件落地操作单(landing playbook)

选什么看 SKILL.md 表A/表B;**怎么放进去看本单**。本单只解决「从选中组件/版式帧,到槽里出现合法渲染」的最后一公里,全部步骤可照抄。仓库路径一律从仓库根写起。

## §1 版式帧 → slide 拆解(五步)

帧文件:`references/gallery-paper-ink/ai/frames/layout-<小写编号>.html`(E1→`layout-e1.html`,R5→`layout-r5.html`)。帧是图册标本(specimen),不是 slide——整文件复制进 deck 必挂:根标记是 `data-runtime="wise-ppt-specimen"`(check 第一步就要 `wise-ppt-deck`)、CSS 走仓库相对路径、末尾调 `stageFit()`。拆解五步:

1. 按 §7 建好 deck 骨架,拿到空的 `index.html`。
2. 打开帧,把 `<div class="stage" …>…</div>` **整块**剪出来,放进新建的 `<section class="slide">`。关系页可把 stage 标签换成 `<main>`，并补 `data-primary-relation/data-visual-family/data-primary-type-role`；非关系页不得改 stage 标签，补 `data-template-id/data-primary-type-role`。关系帧的 stage 级组件指纹删除；D1–D10/M1/M2 非关系帧必须保留 stage `data-component-id` 与全部 `data-template-part/data-template-slot` 标记。**直接套用只开放登记槽 payload**：文字槽改文案，插画/component/icon 槽可换组件、图标或自绘插画；外壳标签/类名/字号/坐标/装饰/固定脚本一字不改。需要改外壳就回到自由构建，不得继续写 `data-layout-source="gallery"`。
3. 删三样:`<link … shell.css>`(图册浏览壳样式)、`<script … stage-fit.js>` 引用、末尾的 `stageFit();` 调用。缩放归 deck-runtime 管,deck 里调 `stageFit` 直接 check 红。
4. 帧头部内联的 `<style>` 原样带走;外链 CSS 的 `../../../../themes/paper-ink/assets/design-tokens.css`、`slide-components.css` 换成 deck 内 `assets/design-tokens.css`、`assets/slide-components.css`。
5. 帧**不带几何契约岛**,按 §5 给这页自建一个,然后跑 `bash runtime/check-deck.sh <deck>` 验证。

小字语义同样是合同:13–16px 只允许家具、标签、编号、出处；后三类节点必须显式写 `data-text-kind="label|number|source"`，mono 字体或短文案本身不构成豁免。

## §2 component_id 前缀 → 物化链路

物化链路看 **component_id 前缀**;`routing-manifest.json` 里的 renderer_kinds 只用来核对前缀判断没错(如 `echarts.` 必是 svg/canvas)。

先查所选版式槽的 `default_renderer.component_id`：若它指向 routing manifest 中的正式组件，槽上必须写这个精确 canonical id 并真实注入组件；不得改写成 `native.<recipe>.<slot>` 冒充已物化。虚拟 id 只给没有正式组件的辅助/排版槽。

| component_id 前缀 | renderer_kinds(核对用) | 复制进 deck 的文件 | 去向 |
|---|---|---|---|
| `atlas.` | native-html | `references/ppt-component-atlas/catalog-data.js`、`themes/paper-ink/adapters/atlas.js` | 由静态物化器写入 slide/CSS |
| `native.` | svg 或 native-html | `capabilities/layouts/paper-ink-components.js` | `assets/components/` |
| `echarts.` | svg、canvas | `capabilities/vendors/echarts/echarts.min.js`、`themes/paper-ink/adapters/echarts.js` | `assets/vendors/echarts/`、`assets/components/` |
| `codex-host.` | image | 图片本体文件 | `assets/components/` |

## §3 Atlas 只有一份源码

`references/ppt-component-atlas/catalog-data.js` 同时服务 Catalog 预览与生产物化，是唯一源码。仓库若再次出现 `capabilities/vendors/ppt-component-atlas/catalog-data.js`，`build_catalog_authority_manifest.cjs` 必须直接失败；禁止“预览一份、生产一份”的双源通路。

## §4 snippet 注入

### A · native. 组件(首选:零脚本,静态粘贴)

组件 id 形如 `native.paper-ink.<num>.<slug>`,按 `<num>` 在 `paper-ink-components.js` 的 `entries` 里找 `num` 相同的条目。三步:

1. 把 entry 的 `snippet` HTML **粘进槽 div 内部**(槽用 SKILL.md「组件槽标准样板」)。
2. 把 `componentCss + componentMotionCss` 两段粘进 `assets/registered-components.css`,**尾部追加三段覆写**(照 SKILL.md 红线:遗产碾压 / 字档对齐 / print 稳定化)。
3. 替换文案:snippet 里带 `data-field="…"` 的节点逐个改文字,**不动 DOM 结构**。

### B · atlas. 组件(要过纸墨适配)

atlas 原始 snippet 是 600px 方卡预览口径,直接粘贴会带裸字号,必须经 `paper-ink.atlas` 适配器。**首选唯一物化器**，它会同时拼上不能漏的组件级覆写：

```bash
node scripts/materialize_atlas_component.cjs atlas.051.iceberg --out-dir /absolute/path/to/deck/assets/materialized/atlas.051.iceberg
```

命令产出 `component.html`、`component.css` 和 `manifest.json`；HTML 根节点自带 component id、Catalog spec、源码/snippet/adapter 指纹，CSS 固定为 `adaptCss(componentCss) + COMPONENT_OVERRIDES`。把 HTML 放进对应 `data-layout-slot`，把 CSS 合并进 `assets/registered-components.css`。按 `data-field` 改文案，不能删除收据属性或改 DOM 结构；最后加载公共 `assets/deck-component-contract.css`。

Atlas 默认只允许构建期静态物化。确需运行时物化时，也必须写出同样的收据属性、注入出非空真实 DOM，并在全部动作结束后才调用 `WisePPT.markSlideReady(slide)`；空 host 先 ready 会被 runtime 直接拒绝。051 使用 Catalog 当前 `.iceberg-diagram` 三层模型与六个 `data-field`，不得恢复旧 `.iceberg` 结构或旧 CSS 自定义属性。

### C · echarts. 组件

1. 复制 `echarts.min.js` → `assets/vendors/echarts/`、`adapters/echarts.js` → `assets/components/`。
2. slide 内放数据块:`<script type="application/json" data-echarts-data>…</script>`,并调 `WisePPT.createEChart(容器, option)`;option.dataset 必须与数据块逐值相等(deck-runtime 会核),option 经纸墨 adapter 适配(线 1.2px、墨阶色、无渐变阴影),不改数据。

## §5 几何契约岛(可抄样例 + 速查表)

三条硬规则:每页**恰好一个** `<script type="application/json" data-geometry-contract>`;根节点带 `data-geometry-contract-version="1"`(app-template 已带);每个 anchor 的 selector 必须字面等于 `[data-anchor-id="<anchor_id>"]`。每个 `data-slot-id` 必须同时带唯一 `data-anchor-id` 并进入 anchors。

**最小合法样例**(摘自 `runtime/fixtures/geometry-contract/index.html`,可直接改用):

```html
<script type="application/json" data-geometry-contract>{
  "format":"wise-ppt-geometry@1","primitive":"左右x等分","canvas":{"width":1920,"height":1080},
  "content_region":{"anchor_id":"edge.region","zone":"core-content"},
  "anchors":[
    {"anchor_id":"edge.region","selector":"[data-anchor-id=\"edge.region\"]"},
    {"anchor_id":"edge.left","selector":"[data-anchor-id=\"edge.left\"]"},
    {"anchor_id":"edge.left.text","selector":"[data-anchor-id=\"edge.left.text\"]"},
    {"anchor_id":"edge.right","selector":"[data-anchor-id=\"edge.right\"]"}
  ],
  "relations":[
    {"relation_id":"edge.left-boundary","type":"hardBoundary","anchors":["edge.region","edge.left"],"edge":"left","tolerance":1},
    {"relation_id":"edge.left-contained","type":"contain","anchors":["edge.region","edge.left"],"shape":"rect","inset":8,"tolerance":1},
    {"relation_id":"edge.left-text-contained","type":"contain","anchors":["edge.left","edge.left.text"],"shape":"rect","inset":8,"tolerance":1},
    {"relation_id":"edge.separate","type":"avoid","anchors":["edge.left","edge.right"],"min_gap":40,"tolerance":1},
    {"relation_id":"edge.top","type":"edgeEq","anchors":["edge.left","edge.right"],"edge":"top","tolerance":1}
  ]
}</script>
```

笨 AI 默认套路:一个 region 槽包住全部内容(即 content_region),各内容块各自 anchor;relations = 若干 contain(边界组)+ 一条 edgeEq 或 bottomEq(对齐组),再按页面实际关系补。

**`free_build` 关系页不能只声明整张 scene。** 至少把两个真实内部内容组标出来；可见分隔线或连接路径也要进入合同：

```html
<g data-anchor-id="copy" data-geometry-role="content">…</g>
<line data-anchor-id="divider" data-geometry-role="boundary" … />
<g data-anchor-id="proof" data-geometry-role="content">…</g>
```

这些节点都要出现在 `anchors`，并分别参与与另一内部节点的 `contain/hardBoundary/avoid/clear/pathClear/ownerOverlap` 关系；否则整页外框没越界也算失败。浏览器还会自动拦截可见文字穿过长度 ≥64px 的横/竖 SVG 分隔线；节点内的小圆/小框文字属于合法载体，其他确需重叠必须用 `ownerOverlap` 明示。

最终配平不是所有页都强制水平居中：只有中心型或无方向锚点的单一内容组把 stage 写成 `data-balance="centered"`，audit 才检查其排除家具后的可见结构水平偏差 ≤3px；流程、时间轴、架构等锚定型页写 `structural`，保留自己的主轴。

**关系类型速查(12 种;公共字段 relation_id / type / anchors / tolerance)**

| 类型 | anchor 数 | 额外必填 | 表达 |
|---|---|---|---|
| contain | 2 | shape(rect/circle)、inset(被含者是文字载体时 ≥8) | A 包住 B |
| hardBoundary | 2 | edge(top/right/bottom/left) | B 贴住 A 的某条边 |
| avoid | 2 | min_gap | 两块不相交且留缝 |
| clear | 2 | min_gap | B 不压 A |
| pathClear | 2 | min_gap(≥4) | 文字不穿路径 |
| ownerOverlap | 2 | reason(非空) | 声明合法重叠 |
| edgeEq | 2 | edge | 共同边对齐 |
| bottomEq | 2 | — | 底线对齐 |
| offsetEq | 2 | axis、offset | 固定间距 |
| centerBetween | 3 | axis | B 在 A、C 的中点 |
| mirrorEq | 3 | axis | 镜像对称 |
| pathAnchor | 2 | max_distance | 节点锚在路径上 |

- tolerance ≤1(仅 centerBetween 放宽到 3);它是测量容差,不是设计留量。
- relations 必须**边界/冲突组在前、对齐组在后**,且每组至少 1 条。
- zone 四档(左/上/右/下边界,内容组包围盒不得越出):core-content 150/170/1800/880 · full-frame-ui 100/140/1820/920 · functional-edge 64/120/1856/960 · breath-page 120/150/1800/900。
- `primitive` 填第六章六结构或非关系模板名,不是新的判断层。
- 验证:check-deck 的 `data-geometry-check`;失败原因看该 slide 的 `data-geometry-contract-error` 属性。

## §6 图标内联

1. 查名:`references/icon-catalog-data.js` 的 `window.WISE_PPT_ICON_CATALOG_DATA.ink[]`(每条有 name / tags / redrawStatus),按名或 tags grep。
2. 取本体:`capabilities/vendors/tabler-outline/redraw-v3/svg/<name>.svg`(approved 成品,viewBox 0 0 64 64,细线 1.2px,stroke 用 currentColor)。
3. 内联:把 `<svg>…</svg>` 整段粘进页面,并在根 `<svg>` 加 `data-icon-source="redraw-v3:<name>"`；尺寸用 width/height 控制，几何节点不改。
4. 没有贴合图标才手绘；根节点写 `data-icon-source="handdraw:<reason-id>"`，同页 deck-plan 必须记录 reason-id 与理由。

## §7 deck 装配

| deck 内文件 | 从仓库复制 |
|---|---|
| `index.html` | `runtime/app-template.html` 填占位符(见下) |
| `assets/design-tokens.css` | `themes/paper-ink/assets/design-tokens.css` |
| `assets/slide-components.css` | `themes/paper-ink/assets/slide-components.css` |
| `assets/deck-component-contract.css` | `themes/paper-ink/assets/deck-component-contract.css`（所有组件 CSS 之后加载） |
| `assets/deck-shell.css` | `runtime/deck-shell.css` |
| `assets/deck-runtime.js` | `runtime/deck-runtime.js` |
| `assets/stage-fit.js` | `runtime/stage-fit.js`(deck-runtime 启动时同目录加载,漏复制直接 runtime 红) |
| `assets/fonts/` | `themes/paper-ink/assets/fonts/`(本地缺字体先在仓库跑 `python3 scripts/ensure_fonts.py` 补齐再复制) |

app-template 七个占位符的填法:

| 占位符 | 填 |
|---|---|
| `{{LANG}}` | `zh-CN` |
| `{{DECK_TITLE}}` | deck 名(也进 `<title>`) |
| `{{PAGE_TITLE}}` | 首页标题文案 |
| `{{STYLESHEET_HREF}}` | `assets/slide-components.css`,并在 head 里按 **design-tokens → slide-components → deck-shell → registered-components** 顺序补齐四个 `<link>` |
| `{{COMPONENT_CONTRACT_HREF}}` | `assets/deck-component-contract.css`，必须在 registered-components 之后 |
| `{{RUNTIME_SCRIPT_SRC}}` | `assets/deck-runtime.js` |
| `{{SLIDES}}` | 全部 `<section class="slide">` 依次粘进 `WISE_PPT_SLIDES_START/END` 注释之间 |

design-tokens.css 里 @font-face 用 `fonts/…` 相对路径,保持 `assets/fonts/` 位置即可命中。装配完跑三件套:`runtime/check-deck.sh` → `runtime/export-deck.sh` → `runtime/audit-deck.sh`。
