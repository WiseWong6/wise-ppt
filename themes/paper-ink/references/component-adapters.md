# 纸墨主题组件适配

本文件只定义组件进入 `paper-ink` 后的视觉适配。Renderer、组件来源和稳定组件 ID 由公共能力层登记与校验：

- `capabilities/registry.json`
- `capabilities/references/component-routing.md`
- `capabilities/references/media-contract.md`

Gallery、ECharts、PPT Component Atlas 与 Codex 宿主图片能力都不属于 Theme。主题 adapter 不能改变组件语义、数据、区域、阅读顺序或来源。

## 通用视觉接口

组件根节点使用 v2 属性表达既有决定：

```html
<section
  data-block-id="block.metric"
  data-renderer-kind="svg"
  data-component-source="echarts"
  data-component-id="echarts.retention-line"
  data-theme-adapter-id="paper-ink.echarts"
  data-content-ref="item.metric-retention-series">
</section>
```

纸墨 adapter 只读取这些属性并应用视觉 token。组件仍须由公共校验器证明内容引用、数据绑定、素材血缘和能力组合合法。

所有组件遵守以下视觉边界：

- 纸底、墨色阶梯、番茄红语义焦点和字体角色只从 `design-tokens.css` 读取；
- 去除渐变、大面积彩色填充、重阴影、装饰性圆角和无语义装饰；
- 不反转 [`deck-planning.md`](../../../core/references/deck-planning.md) 已确定的页面主次；辅助表格、标注、KPI 与来源注保持既定层级；
- 正文、关键结论和必留内容使用正式字阶；容量与溢出回退按 [`page-expression.md`](../../../core/references/page-expression.md) 执行；
- PDF 中的关键状态必须静态可见，不能依赖悬停或点击才能理解。

## Typography 与 Table

- 标题、结论、金句和单个大数据按整套 `typography_mode` 映射 serif 或 sans；正文、说明、卡片标题与 UI 按同一模式映射。
- 表格数字、时间、编号和坐标固定使用 Courier Prime；真实手写批注固定使用 LXGW WenKai。
- 表头、行列、单位和来源保持真实查值关系，不把表格拆成同构卡片。
- `micro-secondary` 的用途与正文 token 边界以 `design-tokens.md` §3 为准。
- 表格超出安全区时按 `page-expression.md` 的容量与溢出规则回到 Core，adapter 不另设逃生字号。

## Image

- 图片进入主题前必须已经通过公共媒体合同，主题不得放宽重构、来源或披露门禁。
- 重构产物使用 1px 墨线、图题、来源和局部批注融入纸墨体系；关键内容不叠加纸纹或装饰滤镜。
- `media-contract.md` 要求的媒体披露必须保持清晰可读，adapter 不改变其文字或含义。
- `paper-ink.image` 只处理边框、留白、题注与视觉层级，不决定素材来源或生成方式。

## Native HTML

- 产品 UI、终端、代码、筛选器和规格单使用直角面板、细线分隔、墨色状态和清晰字段层级。
- 状态差异优先使用线型、hatch、字重和受控强调色，不使用彩色状态底或重阴影。
- 输入框、可编辑区域和正文选择状态必须保留公共 runtime 的交互让行规则。

## ECharts

ECharts 的版本、runtime、数据合同和字段映射由公共 Capabilities 管理。`paper-ink.echarts` 只提供视觉参数：

- 图表背景透明，色板使用墨色阶梯；语义焦点才可使用番茄红；
- 轴线与网格使用 0.6–1px 细线，避免渐变、圆角、面积重填充和阴影；
- 图例、刻度、单位与来源保持墨色，不因位置邻近被误染；
- 图表文字通过 `WisePPT.typeSize(role)` 读取正式字阶，数字和坐标使用 Courier Prime；
- readiness、SVG/Canvas 输出和数据消费沿用公共 runtime，不在主题中复制实现。

## PPT Component Atlas

Atlas 的唯一组件目录是 `references/ppt-component-atlas/catalog-data.js`，Catalog 预览与生产物化共用同一 entry。使用 `scripts/materialize_atlas_component.cjs` 按精确 component_id 生成静态 HTML/CSS 与指纹收据。atlas 组件统一绑定纸墨 adapter `paper-ink.atlas`。适配规则：

- 保留组件结构与语义连线，只替换字体、颜色、线宽、面板和静态状态；
- swiss-card 系的橙色（`#d95e00`）用于文字或描边时默认重映射到对应墨色阶梯，不得因为原组件带色就自动启用强调色；只有 Render Plan 已声明的单一语义焦点，才由统一强调机制映射到 `--accent-red`；背景 `#f2efe9`/`#ffffff` 重映射到 `--paper`/`--paper-deep`；墨色 `#1a1a1a`/`#444`/`#666` 重映射到 `--ink` 与 `--ink-70`；
- 颜色必须按 CSS 属性和语义角色适配：文字、描边可进入墨色阶梯，彩色或深色 `background` 不得机械改成 `--ink`，必须回到 `--paper` / `--paper-deep` / `--paper-panel`；只有真实有序数据才可使用 `--data-ramp-*`；
- 原组件的 2–4px Swiss 线宽必须归一化：DOM 边框 1px、弱分隔 0.6px、SVG 主轮廓 1.2px、连接线 0.7–1px；除已声明的唯一强调主干外，不得保留大于 1.6px 的线条；
- 字体族映射到纸墨角色；默认 `all-sans` 时中文正文与标题均为 `--sans`，数字/代码与批注仍按既定角色使用 `--mono` / `--brush`；
- 移除组件自带的大面积色块、渐变、重阴影和不必要圆角；
- 不让组件自带画布突破页面安全区，也不让 adapter 改变节点顺序或比例含义。

通用启发式之外，正式 Theme adapter `themes/paper-ink/adapters/atlas.js` 的 `COMPONENT_OVERRIDES` 末尾维护一组组件级专项覆盖；Gallery shim 只复用该 adapter，不拥有这些规则。统一导出器也必须把同一覆盖层写入导出 CSS。专项覆盖处理三类通用规则无法正确落地的情形：

1. **深底白字组件**（流程换行/箭头变体、思维导图、架构图 tone 芯片等）：实底必须回到纸面 + 墨线轮廓，白字改 `--ink`；只有根节点、徽章等小面积功能图形允许 `--ink-80` 反白。
2. **有序分级组件**（金字塔、流程箭头步骤）：按序从 `data-2` 到 `data-6` 连续取色，不跳阶；ramp ≥4 的深色档文字用 `--paper` 反白，浅档用 `--ink`。
3. **SVG 组件**：保持 Catalog entry 的 token 化 fill/stroke；051 必须使用 `.iceberg-diagram` 三层结构，禁止恢复旧 `.iceberg` 或把面全部压成同一种墨色。

## SVG 与 Canvas

- SVG 主轮廓、构造线、引线和 hatch 使用 `design-tokens.md` 的线型系统；实虚、粗细和断口必须继续表达原有语义。
- Canvas 文字与颜色通过公共 runtime helper 读取主题 token，不在绘制代码中复制字号或色值。
- adapter 只改变外观；组件使用哪份数据、如何追溯内容，仍由公共能力合同决定。
