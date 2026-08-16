# 组件落地操作单(landing playbook)

选什么看 SKILL.md 表A/表B;**怎么放进去看本单**。本单只解决「从选中组件/版式帧,到槽里出现合法渲染」的最后一公里,全部步骤可照抄。仓库路径一律从仓库根写起。

## §1 版式帧 → slide 拆解(五步)

帧文件:`references/gallery-paper-ink/ai/frames/layout-<小写编号>.html`(E1→`layout-e1.html`,R5→`layout-r5.html`)。帧是图册标本(specimen),不是 slide——整文件复制进 deck 必挂:根标记是 `data-runtime="wise-ppt-specimen"`(check 第一步就要 `wise-ppt-deck`)、CSS 走仓库相对路径、末尾调 `stageFit()`。拆解五步:

1. 按 §7 建好 deck 骨架,拿到空的 `index.html`。
2. 打开帧,把 `<div class="stage" …>…</div>` **整块**剪出来,标签换成 `<main class="stage">…</main>`,放进一个新建的 `<section class="slide">`(section 属性照 SKILL.md「slide 结构样板」:data-render-pending / data-page-id / data-theme / data-page-title / data-section-id / data-section-title)。stage 上的 `data-content-ref` 等指纹属性原样保留;stage 级的 `data-component-id` 是图册标本指纹,**拆解时删除**(deck 合同只认槽级 `data-component-id`,门禁会查登记)。
3. 删三样:`<link … shell.css>`(图册浏览壳样式)、`<script … stage-fit.js>` 引用、末尾的 `stageFit();` 调用。缩放归 deck-runtime 管,deck 里调 `stageFit` 直接 check 红。
4. 帧头部内联的 `<style>` 原样带走;外链 CSS 的 `../../../../themes/paper-ink/assets/design-tokens.css`、`slide-components.css` 换成 deck 内 `assets/design-tokens.css`、`assets/slide-components.css`。
5. 帧**不带几何契约岛**,按 §5 给这页自建一个,然后跑 `bash runtime/check-deck.sh <deck>` 验证。

## §2 component_id 前缀 → 物化链路

物化链路看 **component_id 前缀**;`routing-manifest.json` 里的 renderer_kinds 只用来核对前缀判断没错(如 `echarts.` 必是 svg/canvas)。

| component_id 前缀 | renderer_kinds(核对用) | 复制进 deck 的文件 | 去向 |
|---|---|---|---|
| `atlas.` | native-html | `capabilities/vendors/ppt-component-atlas/catalog-data.js`、`themes/paper-ink/adapters/atlas.js` | `assets/components/` |
| `native.` | svg 或 native-html | `capabilities/layouts/paper-ink-components.js` | `assets/components/` |
| `echarts.` | svg、canvas | `capabilities/vendors/echarts/echarts.min.js`、`themes/paper-ink/adapters/echarts.js` | `assets/vendors/echarts/`、`assets/components/` |
| `codex-host.` | image | 图片本体文件 | `assets/components/` |

## §3 两份 catalog-data.js,用哪份

仓库有两份:`capabilities/vendors/ppt-component-atlas/catalog-data.js` 是**生产源**(`capabilities/registry.json` 登记,分组口径与 routing-manifest 一致);`references/ppt-component-atlas/catalog-data.js` 是图册浏览预览版(带实验性纸墨改良),**不复制进 deck**。

## §4 snippet 注入

### A · native. 组件(首选:零脚本,静态粘贴)

组件 id 形如 `native.paper-ink.<num>.<slug>`,按 `<num>` 在 `paper-ink-components.js` 的 `entries` 里找 `num` 相同的条目。三步:

1. 把 entry 的 `snippet` HTML **粘进槽 div 内部**(槽用 SKILL.md「组件槽标准样板」)。
2. 把 `componentCss + componentMotionCss` 两段粘进 `assets/registered-components.css`,**尾部追加三段覆写**(照 SKILL.md 红线:遗产碾压 / 字档对齐 / print 稳定化)。
3. 替换文案:snippet 里带 `data-field="…"` 的节点逐个改文字,**不动 DOM 结构**。

### B · atlas. 组件(要过纸墨适配)

atlas 原始 snippet 是 600px 方卡预览口径,直接粘贴会带裸字号,必须经 `paper-ink.atlas` 适配器。deck 末尾保留一段一次性注入脚本(app-template 的 `{{SLIDES}}` 之后):

```html
<script src="assets/components/catalog-data.js"></script>
<script src="assets/components/atlas.js"></script>
<script>
(function () {
  var A = window.WisePPTThemeAdapters['paper-ink.atlas'];
  var css = A.adaptCss(window.SWISS_CATALOG_DATA.componentCss);
  // ↑ 这段 css 构建期写进 assets/registered-components.css,不留运行时拼接
  document.querySelectorAll('[data-layout-slot]').forEach(function (host) {
    var num = Number(host.dataset.componentId.split('.')[1]);   // atlas.<num>.<slug>
    var entry = window.SWISS_CATALOG_DATA.entries.find(function (e) { return e.num === num; });
    if (!entry) throw new Error('缺少组件 ' + host.dataset.componentId);
    host.innerHTML = A.adaptMarkup(entry.snippet);
  });
})();
</script>
```

注入后同样按 `data-field` 改文案、在 registered-components.css 尾部补三段覆写。

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
3. 内联:把 `<svg>…</svg>` 整段粘进页面,尺寸用 width/height 控制,颜色跟 currentColor(父级设 `color: var(--ink-*)` 或直接改 color 属性)。
4. 红线禁的是**运行时按名查找**链路(icon-registry / `WisePPT.icons`),复制 SVG 本体内联是正确做法。没有贴合的图标才手绘几何细线。

## §7 deck 装配

| deck 内文件 | 从仓库复制 |
|---|---|
| `index.html` | `runtime/app-template.html` 填占位符(见下) |
| `assets/design-tokens.css` | `themes/paper-ink/assets/design-tokens.css` |
| `assets/slide-components.css` | `themes/paper-ink/assets/slide-components.css` |
| `assets/deck-shell.css` | `runtime/deck-shell.css` |
| `assets/deck-runtime.js` | `runtime/deck-runtime.js` |
| `assets/fonts/` | `themes/paper-ink/assets/fonts/`(本地缺字体先在仓库跑 `python3 scripts/ensure_fonts.py` 补齐再复制) |

app-template 六个占位符的填法:

| 占位符 | 填 |
|---|---|
| `{{LANG}}` | `zh-CN` |
| `{{DECK_TITLE}}` | deck 名(也进 `<title>`) |
| `{{PAGE_TITLE}}` | 首页标题文案 |
| `{{STYLESHEET_HREF}}` | `assets/slide-components.css`,并在 head 里按 **design-tokens → slide-components → deck-shell → registered-components** 顺序补齐四个 `<link>` |
| `{{RUNTIME_SCRIPT_SRC}}` | `assets/deck-runtime.js` |
| `{{SLIDES}}` | 全部 `<section class="slide">` 依次粘进 `WISE_PPT_SLIDES_START/END` 注释之间 |

design-tokens.css 里 @font-face 用 `fonts/…` 相对路径,保持 `assets/fonts/` 位置即可命中。装配完跑三件套:`runtime/check-deck.sh` → `runtime/export-deck.sh` → `runtime/audit-deck.sh`。
