# 登记骨架选择

本文件只负责查询、选择完整骨架和固定不适配顺序。进入本阶段时，`page_kind`、`page_role` 和关系页的唯一 `relation_key` 已经确定；它们的含义不在这里重判。

`references/catalog.html` 是人查看资产的唯一入口；`capabilities/layouts/layout-registry.json` 是当前可见骨架的确定性生产投影。Catalog、registry 和锁定 seed 不能一一对应时，standard 停止。

## 轻量查询

关系页示例：

```text
node <skill>/bin/wise-ppt.mjs layouts --page-kind relationship --page-role prove --relation-key evidence --compact
```

非关系页示例：

```text
node <skill>/bin/wise-ppt.mjs layouts --page-kind nonrelationship --page-role cover --compact
```

需要公开能力时可重复传 `--requires`：

```text
node <skill>/bin/wise-ppt.mjs layouts --page-kind relationship --page-role prove --relation-key evidence --requires text --requires icon --compact
```

已知某组内容项目数时可加 `--content-items N`。它只保留“至少一个公开槽接受 N 项”的骨架，不代表整页总条数一定合适。`fixed-slot` 是一个不可拆的完整内容块，容量固定为 1；`dom-explicit` 只证明 DOM 中有明确重复项，能否增减仍只看公开容量。

候选缩小后，用下面的查询读取一个骨架的完整公开接口：

```text
node <skill>/bin/wise-ppt.mjs layouts --layout-id <完整 layout_id>
```

轻量候选直接给出名称、说明、结构摘要、叶区数量、阅读顺序、主单元数量和必填槽用途/容量，因此无需打开 seed 就能区分 A1、C1 等骨架。详细结果中的 `payload_schema`、容量和 binding 才是作者填写接口。没有 icon binding 就不能填写图标；图片、插画和画布不是公开 payload。`max_chars` 是锁定字体与空间下的中文保守上限，不授权缩字、改 CSS 或改内部几何。不要打开 seed 猜私有字段。

`layout_id` 同时锁定页面结构、`core_component_ids` 和默认 renderer。standard 没有 `component_id` 作者字段，不能替换默认 renderer；查询里的 `recommended_component_ids` 只是内部确定性投影，不是可编辑入口。需要重组组件时走完下方不适配顺序，再申请隔离重绘。

## 选择完整骨架

按顺序过滤：

1. `page_kind` 一致；
2. 骨架支持既定 `page_role`；
3. 关系页支持既定 `relation_key`；
4. 所需 payload 类型有真实 binding；
5. 数量、主次和阅读顺序不超过公开容量，`fixed-slot` 整组填写。

硬条件通过后，只比较：

- 阅读顺序是否等于讲述顺序；
- primary/support 是否准确；
- 内容是否进入职责匹配的槽；
- 正常文案是否有余量，不依赖极限塞满。

选定后写完整 `layout_id`。是否重复只按完整 `layout_id` 判断。硬条件相同时，优先选本 deck 尚未使用的骨架；只有其他未使用候选确因容量、binding、主次或阅读顺序不适配时，才可复用，并记录页面和理由。不得为去重改变真实关系、强塞内容或无意义拆页。

## 固定不适配顺序

内容与骨架不适配时，只能依次处理：

1. **减字**：删除重复解释和非 must 修饰，保留 claim、来源事实和 must；
2. **换登记骨架**：保持既定 page role、claim 和 relation key，换另一个硬候选；
3. **拆页**：拆成两个完整 claim，两页重新走页型、关系和骨架判断；
4. **停止 standard**：记录尝试过的 Catalog 卡片、失败槽、容量或阅读顺序证据；若仍需重组组件，交回 `SKILL.md` 的模式路由申请隔离重绘。

不得跳级。缩小字号、压间距、隐藏内容、改关系、临时 CSS 或未登记整页生成都不能代替这四步。改变分区、列数、槽位、阅读顺序、几何或锁定核心组件就是结构变更，不能混进 standard。

## 节奏复核

- cover 只出现一次，closing/contact 位于合理结尾；
- transition 对应真实章节变化；
- 大字或情绪页不连续堆叠；
- 复用骨架时记录全部重复页、完整 `layout_id` 和必要理由；
- 不为形式多样拆散必须共同阅读的对象。

节奏问题优先通过页序、文案密度和现有登记骨架解决。没有复用时记录“无”。
