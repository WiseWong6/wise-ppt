# 版式与组件生产语义目录

> 状态：**production / deterministic derived view**。本目录不是第二套分类真相；它只投影 blueprint registry、topology 审计、composition presets 与 component routing。

## 边界

- 生产版式来自 Gallery 派生的空槽蓝图；topology 只用于几何审计，不携带内容组件。
- 骨架版式（封面/目录/章节隔页/尾卡）是整页页面类型，由 page shell 按 Deck Plan 元数据直接渲染，不进拓扑与组件目录。
- 组件只有一个主输入族、一个主视觉动作和一个带单位的容量合同。
- 62 个旧版式 recipe 只作为 composition preset 与设计证据保留；General / AI / components Gallery 不是生产语义输入。
- 页眉、页码、标题与可选页面结论属于 page shell，不进入内容组件目录。

## 总览

- 画册空槽蓝图：124（ready 114；blocked 10）。
- 几何审计拓扑：14。
- 骨架版式：5。
- 组合预设：62（ready 57；待抽组件 5）。
- 生产组件：108。
- 组件来源：Atlas 55，ECharts 13，Native 39，Codex Host 1。

## 几何审计拓扑

| layout_id | 名称 | 操作序列 | 对称性 | 槽位 | 容量 | 预设数 |
|---|---|---|---|---:|---|---:|
| `topology.leaf` | 单一内容槽 | leaf | symmetric | 1 | 1–1 groups / complexity ≤ 12 | 43 |
| `topology.split-x-2.equal` | 左右2槽 等分 | split-x | symmetric | 2 | 2–2 groups / complexity ≤ 12 | 4 |
| `topology.split-x-2.dominant-start` | 左右2槽 非对称 | split-x | asymmetric | 2 | 2–2 groups / complexity ≤ 12 | 2 |
| `topology.split-x-2.dominant-end` | 左右2槽 非对称 | split-x | asymmetric | 2 | 2–2 groups / complexity ≤ 12 | 2 |
| `topology.split-y-2.equal` | 上下2槽 等分 | split-y | symmetric | 2 | 2–2 groups / complexity ≤ 12 | 0 |
| `topology.split-y-2.dominant-start` | 上下2槽 非对称 | split-y | asymmetric | 2 | 2–2 groups / complexity ≤ 12 | 1 |
| `topology.split-y-2.dominant-end` | 上下2槽 非对称 | split-y | asymmetric | 2 | 2–2 groups / complexity ≤ 12 | 2 |
| `topology.split-x-3.equal` | 左右3槽 等分 | split-x | symmetric | 3 | 3–3 groups / complexity ≤ 12 | 6 |
| `topology.split-y-3.equal` | 上下3槽 等分 | split-y | symmetric | 3 | 3–3 groups / complexity ≤ 12 | 0 |
| `topology.recursive-x-then-y` | 复合槽位：左右切分 → 上下切分 | split-x → split-y | asymmetric | 3 | 3–3 groups / complexity ≤ 13 | 0 |
| `topology.recursive-y-then-x` | 复合槽位：上下切分 → 左右切分 | split-y → split-x | asymmetric | 3 | 3–3 groups / complexity ≤ 13 | 0 |
| `topology.recursive-y-equal-then-x` | 复合槽位：上下切分 → 左右切分 | split-y → split-x | asymmetric | 3 | 3–3 groups / complexity ≤ 12 | 1 |
| `topology.split-x-y3@1` | 复合槽位：左右切分 → 上下切分 | split-x → split-y | asymmetric | 4 | 4–4 groups / complexity ≤ 12 | 1 |
| `topology.grid-2x2` | 2×2 等分网格 | grid-2x2 | symmetric | 4 | 4–4 groups / complexity ≤ 12 | 0 |

## 骨架版式

| scaffold_id | 名称 | page_kind | 金样 | 输入 |
|---|---|---|---|---|
| `scaffold.cover` | 封面 | cover | D1 | deck.title、deck.subtitle、deck.kicker、deck.meta |
| `scaffold.agenda` | 目录导航页 | agenda | D4 | deck.sections[] (section_id, title, 页码范围) |
| `scaffold.section-divider` | 章节隔页 | section-divider | D5 | page.section_id、section.title、section.index |
| `scaffold.outro-minimal` | 极简尾卡 | outro | D3 | deck.title、deck.meta |
| `scaffold.outro-particle` | 粒子大字尾卡 | outro | D2 | deck.title |

## 生产组件

| component_id | 名称 | 来源 | 输入族 | 角色 | 视觉动作 | 容量 |
|---|---|---|---|---|---|---|
| `atlas.002.list-card` | 列表卡片 | Atlas | ordered-items | primary-proof | sequence | 2–6 item |
| `atlas.003.list-card.default` | 列表卡片-默认变体 | Atlas | ordered-items | primary-proof | sequence | 3–7 item |
| `atlas.004.list-card.workflow` | 列表卡片-工作流变体 | Atlas | ordered-items | primary-proof | sequence | 3–5 item |
| `atlas.006.form-card` | 表单卡片 | Atlas | document-fragment | supporting-evidence | present | 2–6 form-field |
| `atlas.011.quote` | 引用 | Atlas | document-fragment | supporting-evidence | present | 1–1 quote |
| `atlas.012.alert-box` | 提示框 | Atlas | document-fragment | supporting-evidence | present | 2–6 message |
| `atlas.013.terminal-box` | 终端框 | Atlas | document-fragment | supporting-evidence | present | 1–4 section |
| `atlas.014.code` | 代码块 | Atlas | document-fragment | supporting-evidence | present | 1–1 code-block |
| `atlas.015.vs` | 对比 | Atlas | comparison-set | primary-proof | compare | 2–2 state |
| `atlas.016.before-after.default` | 前后对比-默认变体 | Atlas | comparison-set | primary-proof | compare | 2–2 state |
| `atlas.017.before-after.with-arrow` | 前后对比-箭头变体 | Atlas | comparison-set | primary-proof | compare | 2–2 state |
| `atlas.018.before-after.no-bg` | 前后对比-无背景变体 | Atlas | comparison-set | primary-proof | compare | 2–2 state |
| `atlas.019.before-after.verification` | 前后对比-验证变体 | Atlas | comparison-set | primary-proof | compare | 2–4 comparison-row |
| `atlas.020.swot` | SWOT 分析 | Atlas | matrix | primary-proof | compare | 4–4 cell |
| `atlas.021.quadrant-axis` | 象限图 | Atlas | matrix | primary-proof | compare | 4–4 cell |
| `atlas.022.comparison-table` | 对比表格 | Atlas | matrix | primary-proof | compare | 2–6 row |
| `atlas.023.matrix` | 矩阵 | Atlas | matrix | primary-proof | compare | 2–6 cell |
| `atlas.024.impossible-triangle.impossible-triangle` | 不可能三角 | Atlas | comparison-set | primary-proof | compare | 3–3 state |
| `atlas.025.process.default` | 流程-默认变体(3步) | Atlas | temporal-series | primary-proof | sequence | 3–3 step |
| `atlas.026.process.default` | 流程-默认变体(4步) | Atlas | temporal-series | primary-proof | sequence | 4–4 step |
| `atlas.027.process.annotated` | 流程-标注变体 | Atlas | temporal-series | primary-proof | sequence | 4–4 step |
| `atlas.028.process.default` | 流程-默认变体(5步) | Atlas | temporal-series | primary-proof | sequence | 5–5 step |
| `atlas.029.process.wrapped` | 流程-换行变体 | Atlas | temporal-series | primary-proof | sequence | 6–6 step |
| `atlas.030.process.arrow` | 流程-箭头变体(3步) | Atlas | temporal-series | primary-proof | sequence | 3–3 step |
| `atlas.031.process.arrow` | 流程-箭头变体(4步) | Atlas | temporal-series | primary-proof | sequence | 4–4 step |
| `atlas.032.process.annotated-arrow` | 流程-标注箭头变体 | Atlas | temporal-series | primary-proof | sequence | 4–4 step |
| `atlas.033.process.arrow` | 流程-箭头变体(5步) | Atlas | temporal-series | primary-proof | sequence | 5–5 step |
| `atlas.034.process-loop.triangle` | 循环流程-三角变体 | Atlas | temporal-series | primary-proof | cycle | 3–3 cycle-node |
| `atlas.035.process-loop.quad` | 循环流程-四边变体 | Atlas | temporal-series | primary-proof | cycle | 4–4 cycle-node |
| `atlas.036.process-loop.pentagon` | 循环流程-五边变体 | Atlas | temporal-series | primary-proof | cycle | 5–5 cycle-node |
| `atlas.037.process-loop.closed-loop` | 闭环流程 | Atlas | temporal-series | primary-proof | cycle | 4–4 cycle-node |
| `atlas.038.journey` | 旅程图 | Atlas | temporal-series | primary-proof | sequence | 3–7 journey-stage |
| `atlas.039.timeline` | 时间线 | Atlas | temporal-series | primary-proof | sequence | 3–6 milestone |
| `atlas.040.timeline.vertical` | 时间线-垂直变体 | Atlas | temporal-series | primary-proof | sequence | 3–6 milestone |
| `atlas.041.timeline.horizontal` | 时间线-水平变体 | Atlas | temporal-series | primary-proof | sequence | 3–6 milestone |
| `atlas.042.gantt` | 甘特图 | Atlas | temporal-series | primary-proof | sequence | 2–6 task |
| `atlas.043.concentric` | 同心圆 | Atlas | hierarchy | primary-proof | show-hierarchy | 3–5 layer |
| `atlas.044.concentric.align-center` | 同心圆-居中变体 | Atlas | hierarchy | primary-proof | show-hierarchy | 3–5 layer |
| `atlas.045.concentric.center-text-bottom` | 同心圆-底部文字变体 | Atlas | hierarchy | primary-proof | show-hierarchy | 3–5 layer |
| `atlas.046.concentric.align-top` | 同心圆-顶部对齐变体 | Atlas | hierarchy | primary-proof | show-hierarchy | 3–5 layer |
| `atlas.047.concentric.align-bottom` | 同心圆-底部对齐变体 | Atlas | hierarchy | primary-proof | show-hierarchy | 3–5 layer |
| `atlas.048.pyramid` | 金字塔 | Atlas | hierarchy | primary-proof | show-hierarchy | 3–6 layer |
| `atlas.049.pyramid.inverted` | 金字塔-倒置变体 | Atlas | hierarchy | primary-proof | show-hierarchy | 3–6 layer |
| `atlas.050.fishbone` | 鱼骨图 | Atlas | causal-network | primary-proof | connect-causality | 4–8 cause |
| `atlas.051.iceberg` | 冰山图 | Atlas | hierarchy | primary-proof | show-hierarchy | 2–2 layer |
| `atlas.052.venn.double` | 韦恩图-双圆变体 | Atlas | set-relation | primary-proof | show-overlap | 2–2 set |
| `atlas.053.venn.three` | 韦恩图-三圆变体 | Atlas | set-relation | primary-proof | show-overlap | 3–3 set |
| `atlas.054.architecture` | 架构图 | Atlas | hierarchy | primary-proof | show-hierarchy | 2–5 layer |
| `atlas.055.arch-platform` | 平台架构图 | Atlas | hierarchy | primary-proof | show-hierarchy | 2–5 layer |
| `atlas.056.arch-platform-complex-v` | 平台架构图-复杂垂直变体 | Atlas | hierarchy | primary-proof | show-hierarchy | 2–5 layer |
| `atlas.057.mind-map.horizontal` | 思维导图-水平变体 | Atlas | hierarchy | primary-proof | show-hierarchy | 3–8 node |
| `atlas.058.mind-map.vertical` | 思维导图-垂直变体 | Atlas | hierarchy | primary-proof | show-hierarchy | 3–10 node |
| `atlas.059.stats` | 统计卡片 | Atlas | quantitative-series | primary-proof | quantify | 2–4 metric |
| `atlas.060.radar` | 雷达图 | Atlas | quantitative-series | primary-proof | quantify | 5–5 metric-axis |
| `atlas.061.radar-hex` | 六边形雷达图 | Atlas | quantitative-series | primary-proof | quantify | 6–6 metric-axis |
| `codex-host.paper-ink.media.generated-image` | 宿主生成后冻结图片 | Codex Host | media | supporting-evidence | reconstruct-example | 1–1 image |
| `echarts.bar-basic` | 基础柱状图 | ECharts | comparison-set | primary-proof | compare | 1–12 state |
| `echarts.bar-dynamic-sort` | 动态排序柱状图 | ECharts | quantitative-series | primary-proof | compare | 1–12 data-point |
| `echarts.calendar-basic` | 日历热力图 | ECharts | temporal-series | primary-proof | quantify | 1–12 milestone |
| `echarts.geo-choropleth-map` | 分级填色地图 | ECharts | spatial-set | primary-proof | locate-spatially | 3–40 location |
| `echarts.line-basic` | 基础折线图 | ECharts | comparison-set | primary-proof | compare | 1–12 state |
| `echarts.line-smooth` | 平滑折线图 | ECharts | quantitative-series | primary-proof | show-trend | 1–12 data-point |
| `echarts.line-stacked` | 堆叠折线图 | ECharts | comparison-set | primary-proof | compare | 1–12 state |
| `echarts.pie-access-source` | 访问来源饼图 | ECharts | quantitative-series | primary-proof | quantify | 1–12 data-point |
| `echarts.radar-basic` | 基础雷达图 | ECharts | quantitative-series | primary-proof | quantify | 1–12 data-point |
| `echarts.sankey-basic` | 基础桑基图 | ECharts | network-flow | primary-proof | show-flow | 1–12 flow-node |
| `echarts.scatter-basic` | 基础散点图 | ECharts | quantitative-series | primary-proof | show-distribution | 1–12 data-point |
| `echarts.scatter-to-bar-anim` | 散点聚合柱状动画 | ECharts | quantitative-series | primary-proof | show-distribution | 1–12 data-point |
| `echarts.tree-lr` | 从左到右树状图 | ECharts | hierarchy | primary-proof | show-hierarchy | 1–12 node |
| `native.paper-ink.063.step-rise` | 阶梯爬升图 | Native | temporal-series | primary-proof | sequence | 3–6 step |
| `native.paper-ink.064.doc-excerpt` | 文献摘引块 | Native | document-fragment | supporting-evidence | present | 1–3 excerpt |
| `native.paper-ink.065.official-doc` | 公文标本框 | Native | document-fragment | supporting-evidence | present | 1–2 document |
| `native.paper-ink.066.evidence-wall` | 证据墙标本格 | Native | evidence-set | supporting-evidence | present | 2–12 evidence-item |
| `native.paper-ink.067.logo-cloud` | 品牌云墙 | Native | evidence-set | supporting-evidence | present | 4–28 logo |
| `native.paper-ink.068.mobile-gallery` | 手机屏步骤画廊 | Native | interface-snapshot | supporting-evidence | reconstruct-example | 2–4 screen |
| `native.paper-ink.069.admin-console` | 后台管理台线稿 | Native | interface-snapshot | supporting-evidence | reconstruct-example | 1–2 ui-view |
| `native.paper-ink.070.trace-tree` | 树形过程日志 | Native | temporal-series | primary-proof | sequence | 3–12 trace-node |
| `native.paper-ink.071.gantt-ink` | 墨线甘特图 | Native | temporal-series | primary-proof | sequence | 3–8 task |
| `native.paper-ink.072.timeline-gallery` | 时间轴垂挂画廊 | Native | temporal-series | primary-proof | sequence | 3–5 milestone |
| `native.paper-ink.073.winding-road` | 蜿蜒道路时间轴 | Native | temporal-series | primary-proof | sequence | 4–8 milestone |
| `native.paper-ink.074.contact-card` | 联络名片卡 | Native | contact-record | action | present | 2–6 contact-channel |
| `native.paper-ink.075.district-map` | 街区示意地图 | Native | spatial-set | primary-proof | locate-spatially | 1–12 location |
| `native.paper-ink.076.why-how-bands` | 因果对位双带 | Native | causal-network | primary-proof | connect-causality | 2–6 cause |
| `native.paper-ink.077.before-after-bands` | 前后双带演进面板 | Native | comparison-set | primary-proof | compare | 2–6 state |
| `native.paper-ink.078.chat-dialog` | 对话气泡标本 | Native | document-fragment | supporting-evidence | present | 2–8 message |
| `native.paper-ink.079.radial-hub` | 放射中心卫星图 | Native | hierarchy | primary-proof | show-hierarchy | 3–8 node |
| `native.paper-ink.080.merge-confluence` | 双路汇流图 | Native | hierarchy | primary-proof | show-hierarchy | 3–3 node |
| `native.paper-ink.081.watershed-axis` | 分水岭中轴对照 | Native | comparison-set | primary-proof | compare | 3–6 state |
| `native.paper-ink.082.arch-table-band` | 架构带表 | Native | hierarchy | primary-proof | show-hierarchy | 2–4 node |
| `native.paper-ink.083.swimlane-roadmap` | 泳道路线图 | Native | temporal-series | primary-proof | sequence | 6–24 milestone |
| `native.paper-ink.084.profile-card` | 人物画像卡 | Native | comparison-set | primary-proof | compare | 1–3 state |
| `native.paper-ink.085.radial-progress` | 环形进度指标 | Native | quantitative-series | primary-proof | quantify | 1–4 data-point |
| `native.paper-ink.086.icon-grid` | 图标格阵 | Native | hierarchy | primary-proof | show-hierarchy | 4–12 node |
| `native.paper-ink.087.funnel` | 转化漏斗 | Native | temporal-series | primary-proof | sequence | 3–6 milestone |
| `native.paper-ink.088.annotation-callout` | 圈注引线批注装置 | Native | document-fragment | supporting-evidence | present | 1–4 message |
| `native.paper-ink.media.reconstructed-image` | 已重构本地图片 | Native | media | supporting-evidence | reconstruct-example | 1–1 image |
| `native.paper-ink.semantic.comparison-matrix-wide` | wide comparison matrix | Native | comparison-set | primary-proof | compare | 2–6 state |
| `native.paper-ink.semantic.constellation-network` | constellation relationship network | Native | hierarchy | primary-proof | show-hierarchy | 3–12 node |
| `native.paper-ink.semantic.credential-badge` | compact credential badge | Native | evidence-set | supporting-evidence | present | 1–4 evidence-item |
| `native.paper-ink.semantic.evidence-panel` | evidence status panel | Native | evidence-set | supporting-evidence | present | 2–8 evidence-item |
| `native.paper-ink.semantic.hierarchy-levels` | hierarchy levels | Native | hierarchy | primary-proof | show-hierarchy | 2–12 node |
| `native.paper-ink.semantic.icon-grid` | semantic icon grid | Native | document-fragment | primary-proof | present | 3–8 item |
| `native.paper-ink.semantic.metric-band` | wide metric band | Native | quantitative-series | primary-proof | quantify | 2–6 metric |
| `native.paper-ink.semantic.particle-hero` | particle metaphor comparison | Native | comparison-set | primary-proof | compare | 1–2 state |
| `native.paper-ink.semantic.process-strip` | ordered process strip | Native | temporal-series | primary-proof | sequence | 2–8 step |
| `native.paper-ink.semantic.scenario-column` | compact scenario column | Native | document-fragment | primary-proof | present | 1–4 item |
| `native.paper-ink.semantic.statement-band` | compact statement band | Native | document-fragment | supporting-evidence | present | 1–6 item |
| `native.paper-ink.semantic.weighted-arcs` | weighted relationship arcs | Native | causal-network | primary-proof | connect-causality | 3–8 node |

## 可复现性

```bash
python3 -B scripts/generate_component_routing.py
python3 -B scripts/generate-asset-taxonomy.py --check
```
