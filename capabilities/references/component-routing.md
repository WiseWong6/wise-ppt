# 组件路由

机器权威是 `capabilities/components/routing-manifest.json`。生产顺序固定为：从 Content/Deck Plan 推导组件中立 BindingProfile → 对当前 variant 的全部 ready 空槽蓝图评估 slot → 为每个 slot 显式选择组件 → 核对 renderer、空间、容量、adapter 和依赖 → 写入 Render Plan v6。蓝图不能携带默认内容组件，前端画册筛选结果也不能进入生产链。

> **relation_keys 口径(v122)**:每条组件在 `relations`(上游生成器多标签)之外带 `relation_keys` 字段——映射到 glm skill 的 23 关系细种统一词表(与 SKILL.md 表A/表B/第五章同一套;词表见 manifest 顶层 `relation_key_vocabulary`)。glm 逐页四步④按 `relation_keys` 过滤;23 细种每个至少 1 个组件；新增 `overlap/交叠`，Atlas Venn `.052/.053` 明确登记为 `[overlap,comparison]`。基础映射脚本是 `scripts/_relation_keys_once.py`；Catalog 可见标签由 `scripts/build_component_routing_data.py` 从生产 manifest 确定性生成，禁止再手写第二套关系。改过名的组件查 `aliases`(swimlane→swimlane-roadmap、weighted-arcs、constellation、terminal→terminal-box)。

## 单向生成链

基础路由由 Atlas、ECharts 和 Paper Ink 原生 catalog 的稳定 ID、浏览标签与来源元数据组成；原 14 张“仅浏览”卡由 `scripts/promote_catalog_components.py` 确定性转成 15 个稳定 ID（横/竖时间轴拆开），同时核对 snippet、typed data contract 与 production readiness。该脚本不读取或改写 `gallery-manifest.json`。

每个 production component 同时声明：

- `renderer_kinds` 与 `component_sources`：怎样渲染、代码来自哪里；
- `space_requirements`：最小宽高与可接受长宽比；
- `semantic_contract.input_family`：唯一主输入族；
- `semantic_contract.visual_action`：唯一主视觉动作；
- `semantic_contract.capacity`：带单位的最小/最大容量；
- `dependencies`：需要的公共 capability。

输入族与视觉动作均由 catalog 的 canonical name、group、tasks、relations 和 renderer 确定性派生，保留原多标签作为 affordance，但不会产生第二套主分类。

当前 routing 闭合为 123 个 production-ready ID：55 个 Atlas、13 个 ECharts、54 个 native（原 39 个 + 本轮转正 15 个）以及 1 个 Codex Host 冻结图片入口。上游 Atlas snapshot 仍保留完整 61 条设计证据；以下 6 个页面脚手架或导航构件不作为内容组件进入路由：

- `atlas.001.cover` → `topology.leaf`
- `atlas.005.toc-card` → `scaffold.agenda`
- `atlas.007.two-col` → `topology.split-x-2.equal`
- `atlas.008.three-col` → `topology.split-x-3.equal`
- `atlas.009.split-v` → `topology.split-x-2.equal`
- `atlas.010.split-v.accent` → `topology.split-x-2.equal`

Paper Ink catalog 中的 `native.paper-ink.062.agenda-ink` 同样是页面导航脚手架，映射为 `scaffold.agenda`，不作为内容组件进入路由。因此退役映射总数是 7：6 个 Atlas 页面构件，加 1 个 Native agenda 构件。

## 旧组件的真实数据绑定

55 个 Atlas 与 26 个旧 Paper Ink 原生组件不再把 catalog 中的示例 HTML 直接带入成品，也不再按文本出现顺序替换。组件 adapter 从 BindingProfile 与真实 Content 生成 typed data；呈现专用默认值由 adapter 确定性派生，不要求 Content 预写组件字段。每个稳定组件 ID 都登记一份组件自有合同，选择阶段先用完整 Content item 预物化：

- 缺字段、字段类型错误、容量越界或组件专属关系不成立时，候选直接拒绝；
- 甘特图、雷达图、进度环、漏斗、路线图等数据图形必须同时重算文字和几何；
- 选择结果只把合同指纹、内容指纹和内容引用写成闭合回执，不把 DOM selector 或业务值写进 Render Plan；
- 最终物化时再次读取真实内容、重算组件和回执，并与 Render Plan 精确比较；任何内容、合同或绑定漂移都失败关闭；
- production DOM 由无样例的 typed renderer 生成；旧 catalog snippet 只保留为设计证据，不是成品数据源。

这意味着组件能否进入成品取决于“当前真实内容是否完整适配该组件”，而不是组件是否存在一份可预览的样例代码。

## 空间与容量门禁

组件必须适应蓝图登记的真实 slot，不能修改 slot 来迁就组件。Cartesian line/bar ECharts 是响应式导出，其 `min_aspect_ratio` 为 `0.85`；calendar、tree、sankey、radar 和 pie 仍使用各自更严格的空间合同。

容量必须同时满足组件 `capacity.min_items/max_items/unit` 与同源 `semantic_contract.capacity`；统一画册只原样投影，不得重新定义。

## 来源与导出

- Native：`native.paper-ink.*`。语义组件与原有稳定 ID 继续按各自 typed renderer 物化；本轮转正的 15 个固定几何组件以 `capabilities/layouts/paper-ink-components.js` 为正式 snippet 源，并在 routing manifest 中声明独立 data contract、frame 与容量。
- ECharts：catalog 位于 `capabilities/vendors/echarts/catalog.json`，业务数据与 option 分离。
- Atlas：catalog 位于 `capabilities/vendors/ppt-component-atlas/catalog-data.js`，保留精确稳定 ID 和设计证据；production 使用对应 typed renderer。
- 图片：仅允许 `native.paper-ink.media.reconstructed-image` 和 `codex-host.paper-ink.media.generated-image`，生成完成后必须冻结为 deck 内本地文件。

`scripts/export_component.py` 只接受精确 `component_id` 与已启用 theme。零候选、空间不兼容、容量越界、依赖缺失、adapter 不支持或 ID 未登记时均失败关闭。

```bash
python3 -B scripts/promote_catalog_components.py --check
python3 -B scripts/build_component_routing_data.py --check
python3 -B scripts/audit_relationship_assets.py
python3 -B references/build_catalog_thumbnails.py --check
```
