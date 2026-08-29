# 登记骨架选择

本文件只负责查询、选择完整骨架和固定不适配顺序。进入本阶段时，`page_kind`、`page_role` 和关系页的唯一 `relation_key` 已经确定；它们的含义不在这里重判。

`references/catalog.html` 是人查看资产的唯一入口；`capabilities/layouts/layout-registry.json` 是当前可见骨架的确定性生产投影。Catalog、registry 和锁定 seed 不能一一对应时，standard 停止。

## 轻量查询

关系页示例：

```text
node <skill>/bin/wise-ppt.mjs layouts --new-session --page-kind relationship --page-role prove --relation-key evidence --compact
```

非关系页示例：

```text
node <skill>/bin/wise-ppt.mjs layouts --new-session --page-kind nonrelationship --page-role cover --compact
```

需要公开能力时可重复传 `--requires`：

```text
node <skill>/bin/wise-ppt.mjs layouts --new-session --page-kind relationship --page-role prove --relation-key evidence --requires text --requires icon --compact
```

`--new-session` 只用于新聊天的第一次候选查询：命令生成一个 32 位小写十六进制 `selection_seed` 并返回空账本。主 Agent 保存这个 seed；同一聊天之后每次候选查询都传 `--selection-seed <selection_seed>`，不能再次传 `--new-session`。

同一聊天从上一份 `deck-plan.json.layout_session.post_usage` 继续时，每项重复传：

```text
--selection-seed <selection_seed>
--layout-usage <完整 layout_id>:<count>:<last_sequence>
```

第一份 deck 的第 1 页从空 usage 查询。选中第 N 页后，立刻把该 `layout_id` 的 `count` 加 1、`last_sequence` 设为“deck 开始前的 `prior_total + N`”，再用更新后的 usage 查询第 N+1 页。spec 的 `layout_context` 只记录本 deck 第 1 页选择前的 seed 和账本；deck 内临时账本由逐页查询推进，构建器按页序复算。

不得扫描当前目录或其他交付目录恢复旧账；只有当前聊天中上一份收据可以续用。多 Agent 可以并行判断 claim、`page_role` 和 `relation_key`，最终骨架必须由主 Agent 按页序查询和分配，避免并行任务同时用同一份旧账。

已知某组内容项目数时可加 `--content-items N`。它只保留“至少一个公开槽接受 N 项”的骨架，不代表整页总条数一定合适。`fixed-slot` 是一个不可拆的完整内容块，容量固定为 1；`dom-explicit` 只证明 DOM 中有明确重复项，能否增减仍只看公开容量。

候选缩小后，用下面的查询读取一个骨架的完整公开接口：

```text
node <skill>/bin/wise-ppt.mjs layouts --layout-id <完整 layout_id>
```

候选查询输出为 `wise-ppt-layout-query@2`。每个候选带 `usage_count`、`last_sequence`、`selection_rank` 和 `requires_override_if_selected`；顶层 `selection.state` 只会是：

- `fresh-available`：有从未使用候选；
- `least-used-available`：没有新候选，但使用次数不齐；
- `balanced-reuse`：候选都已使用且次数相同；
- `forced-single`：硬条件下只有一个候选；
- `no-candidate`：没有合法候选。

候选顺序是会话轮换顺序，不是质量评分。新聊天只在 `--new-session` 时随机生成一次 seed；排序本身不再取随机数。相同 registry、条件、seed 和账本必得相同结果，不同新聊天通常有不同起点。查询不删除已用候选，也不改变关系。

`--content-items N` 只隐藏容量明显不匹配的显示项，不重排构建器采用的粗粒度权威 rank；因此过滤后即使只显示一个候选，它仍可能保留大于 1 的 `selection_rank` 并要求 override。单骨架详情查询只传 `--layout-id`，不传 seed 或 usage；其 `selection.mode` 为 `layout-detail`，状态和 rank 均不适用。

轻量候选还会给出名称、说明、结构摘要、叶区数量、阅读顺序、主单元数量、必填槽用途/容量、允许强调对象和图标槽，因此无需打开 seed。详细结果中的 `payload_schema`、`emphasis.targets`、`icon_slots` 和容量才是作者接口。没有登记槽就不能加图标或换插画。`max_chars` 是锁定字体与空间下的中文保守上限，不授权缩字、改 CSS 或改内部几何。不要打开 seed 猜私有字段。

`layout_id` 锁定页面结构、组件组合和默认 renderer。文案、已审核插画与图标可按公开槽替换；组件不得自动替换。查询里的 `recommended_component_ids` 只是内部投影，不是作者入口。用户明确授权后，只有公开容量已登记的同结构调整仍属 standard，例如同一流程槽允许五项时可把四步填成五步；需要换组件组合或 renderer 时申请隔离重绘。

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

内容适配通过后，按下列顺序轮换完整 `layout_id`：

1. 会话使用次数最少；
2. 次数相同时，最久未使用；
3. 仍相同时，按 `SHA-256(selection_seed + NUL + layout_id)` 的完整十六进制值升序；
4. 只有哈希碰撞时才保持 registry 固定顺序。

构建器以 `page_kind/page_role/relation_key` 和页面实际 payload 类型形成粗粒度硬候选池，并按上述规则给出权威 rank。最终选中 rank>1 的骨架必须填写 `layout_override`，`basis` 只允许 `capacity`、`binding`、`primary-support`、`reading-order`、`user-continuity`，`reason` 写清 rank 更靠前的候选为何不适配；`user-continuity` 仅在用户明确要求延续某个版式时使用。rank=1 禁止填写。单候选与正常 rank=1 复用由构建器自动记录，无需手写“只能复用”。不得为去重改变真实关系、强塞内容或无意义拆页。

## 固定不适配顺序

内容与骨架不适配时，只能依次处理：

1. **减字**：删除重复解释和非 must 修饰，保留 claim、来源事实和 must；
2. **换登记骨架**：保持既定 page role、claim 和 relation key，换另一个硬候选；
3. **拆页**：拆成两个完整 claim，两页重新走页型、关系和骨架判断；
4. **停止 standard**：记录尝试过的 Catalog 卡片、失败槽、容量或阅读顺序证据；若仍需突破结构或组件组合，交回 `SKILL.md` 的模式路由申请隔离重绘。

不得跳级。缩小字号、压间距、隐藏内容、改关系、临时 CSS 或未登记整页生成都不能代替这四步。替换已登记内容槽不改结构；改变结构骨架、组件组合、分栏、阅读顺序或引入未审核能力才进入 experimental。

## 节奏复核

- cover 只出现一次，closing/contact 位于合理结尾；
- transition 对应真实章节变化；
- 大字或情绪页不连续堆叠；
- 复用骨架时核对 `deck-plan.json` 的会话前后账本、逐页决策和必要 override；
- 不为形式多样拆散必须共同阅读的对象。

节奏问题优先通过页序、文案密度和现有登记骨架解决。没有复用时记录“无”。
