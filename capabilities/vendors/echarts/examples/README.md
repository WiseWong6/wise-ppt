# ECharts 示例（wise-ppt 适配版）

本目录包含 13 个改编自 Apache ECharts 官方示例的图表配方，已适配 wise-ppt 的 **dataset 契约**（数据与 option 分离、`option.dataset` 与页面 `<script>` 数据块逐值相等）。组件清单的唯一事实源是同级 [`catalog.json`](../catalog.json)。

## 来源与许可

- **来源**：[Apache ECharts 官方示例](https://echarts.apache.org/examples/zh/index.html)（echarts.apache.org）
- **上游许可**：Apache License 2.0（ECharts 代码与官方示例均为 Apache-2.0）
- **改编说明**：原官方示例把数据硬编码在 `series[].data` 里；本目录的示例已把数据抽成行式 `dataset.source`，series 通过 `encode` 引用列名。数据结构与动画时序已适配 wise-ppt 的 dataset 契约。

## 索引

| example_id | 标题 | chart_type | 文件 |
|---|---|---|---|
| `echarts.line-basic` | 基础折线图 | line | [line-basic.json](line-basic.json) |
| `echarts.line-smooth` | 基础平滑折线图 | line | [line-smooth.json](line-smooth.json) |
| `echarts.line-stacked` | 堆叠折线图 | line | [line-stacked.json](line-stacked.json) |
| `echarts.bar-basic` | 基础柱状图 | bar | [bar-basic.json](bar-basic.json) |
| `echarts.bar-dynamic-sort` | 动态排序柱状图 | bar | [bar-dynamic-sort.json](bar-dynamic-sort.json) |
| `echarts.pie-access-source` | 某站点用户访问来源 | pie | [pie-access-source.json](pie-access-source.json) |
| `echarts.scatter-basic` | 基础散点图 | scatter | [scatter-basic.json](scatter-basic.json) |
| `echarts.scatter-to-bar-anim` | 散点图聚合为柱状图动画 | scatter | [scatter-to-bar-anim.json](scatter-to-bar-anim.json) |
| `echarts.radar-basic` | 基础雷达图 | radar | [radar-basic.json](radar-basic.json) |
| `echarts.tree-lr` | 从左到右树状图 | tree | [tree-lr.json](tree-lr.json) |
| `echarts.sankey-basic` | 基础桑基图 | sankey | [sankey-basic.json](sankey-basic.json) |
| `echarts.calendar-basic` | 日历图 | calendar | [calendar-basic.json](calendar-basic.json) |

`example_id` 即 render-plan 里的完整 `component_id`（如 `echarts.line-basic`）。

## JSON 结构

每个示例 JSON 包含：

- `example_id` / `title` / `source_url` / `upstream_license` / `chart_type` / `source_note`
- `dataset_shape`：`{dimensions, source}` 行式表，作为 content.json 的数据形态参考
- `render_plan_binding`：render-plan 里 renderer 字段的取值（`renderer_kind` / `component_source` / `component_id` / `theme_adapter_id` / `data_binding`）
- `html_template`：slide HTML 容器的 `data-*` 属性与 `<script data-wise-ppt-dataset>` 的 id
- `option`：ECharts 完整 option（含 `dataset` 字段，满足 `createEChart` 门禁）
- `notes`：改造说明

## ⚠️ 改造注意事项

### 动画类示例（动态排序柱状图、散点聚合为柱状图）

这两个示例的完整动画效果依赖运行时按周期更新数据并调用 `chart.setOption`。wise-ppt 的 `createEChart`（`runtime/deck-runtime.js`）**只调用一次** `setOption`，因此 option 渲染的是**初始静态状态**。若要呈现完整动画，需在 deck JS 中：

1. 准备完整数据序列（多年数据 / 聚合前后数据）
2. 用 `setInterval` 或交互触发周期更新 `option.dataset.source`
3. 调用 `chart.setOption(option)` 增量刷新

详见各示例的 `animation_notes` 字段。

### 非坐标系图（雷达图、树图、桑基图、日历图）

这几类图表的 ECharts series 不像 line/bar/scatter 那样直接消费行式 dataset：

- **雷达图**：`radar.indicator` 的 max 需手工声明，series.radar 对 dataset + encode 的支持不直接，可能需要把 dataset 转成 radar 期望的值数组。
- **树图**：series.data 是嵌套层级 `{name, children:[...]}`；dataset.source 用扁平 node/parent 表描述父子关系供追溯，两者语义等价但不自动同步。
- **桑基图**：series.data（nodes 列表）+ series.links（流向）两个结构；dataset.source 用 source/target/value 行式表描述流向，nodes 从端点推导。
- **日历图**：series.heatmap 传统用 `[[date,value]]` 二维数组；dataset + encode 方式可能需要退回 series.data。

这几类的 dataset 主要用于 content 追溯与 encode 校验，实际渲染可能需要 deck JS 把 dataset 转成 ECharts series 期望的结构。详见各示例的 `<chart>_dataset_caveat` 字段。

## 使用方式

1. 用 `python3 scripts/catalog.py components --component-source echarts --name "<关键词>"` 按语义查询候选。
2. 用 `python3 scripts/export_echarts_component.py --query "<精确 ID>"` 导出单个完整内联组件。
3. 复制 `dataset_shape` 到 content.json 的 `structured_data.rows`，替换示例数据为真实业务数据。
4. 复制 `render_plan_binding` 到 render-plan 的 renderer，调整 `data_ref.content_id` 和 `dataset_id`。
5. 把导出的 `snippet` 与 `init_script` 放入 slide，确保 content、页面数据块与 `option.dataset` 逐值一致。
