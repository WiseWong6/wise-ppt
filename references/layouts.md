# 登记骨架选择

本文件只负责查询、选择完整骨架和固定不适配顺序。进入本阶段时，`page_kind`、`page_role` 和关系页的唯一 `relation_key` 已经确定；它们的含义不在这里重判。

`references/catalog.html` 是人查看资产的唯一入口；`capabilities/layouts/layout-registry.json` 是当前可见骨架的确定性生产投影。Catalog、registry 和锁定 seed 不能一一对应时，standard 停止。

## 整副批量规划（生产默认）

分页和路由完成后，把整副页面一次写入绝对路径的计划文件。输入合同为 `wise-ppt-layout-plan-request@1`：

```json
{
  "format": "wise-ppt-layout-plan-request@1",
  "pages": [
    {
      "page_id": "cover",
      "page_kind": "nonrelationship",
      "page_role": "cover",
      "requires": ["text"]
    },
    {
      "page_id": "proof",
      "page_kind": "relationship",
      "page_role": "prove",
      "relation_key": "evidence",
      "requires": ["text"],
      "content_items": 3
    }
  ]
}
```

新聊天只在第一次整副规划时运行：

```text
node <skill>/bin/wise-ppt.mjs layouts plan <page-plan.json 绝对路径> --agent-brief --new-session
```

命令生成一次 32 位小写十六进制 `selection_seed`，并返回 `wise-ppt-layout-agent-brief@1`。同一聊天的后续 deck 把上一份 `deck-plan.json.layout_session` 的 `selection_seed/post_total/post_usage` 转成请求顶层 `layout_context`，不再传 `--new-session`。不得扫描当前目录或其他交付目录恢复旧账。

第一次输出是 `mode=proposal`：命令在内部按页序推进 usage，为每页给出候选和建议 `selected_layout_id`；页面只引用 ID，完整 `payload_schema`、容量、阅读顺序、强调和图标定义集中在 `layout_definitions`，同一骨架只返回一次。接受全部建议时一副 deck 只调用一次；若建议页仍标记 `requires_override_if_selected=true`，须按返回的容量原因在 spec 填写 `layout_override`。

若主 Agent 判断某页内容与建议骨架不适配，则给**整副所有页面**补齐 `selected_layout_id`，必要页补 `layout_override`，并把第一次输出的起始 `layout_context` 写回请求；不传 `--new-session`，整副再运行一次。第二次为 `mode=resolved`，会按真实选中结果从第 1 页重新推进账本；`layout_definition_policy=reuse-proposal-brief` 表示不重复第一次已给出的骨架定义。不得只重算改动页，也不得把第一次的 `projection.post_usage` 当成本 deck 的起点。整副最多两次模型/工具往返。

`projection.post_total/post_usage` 仅表示本次整副结果；正式续账仍以 build 生成的 `deck-plan.json.layout_session` 为准。多 Agent 可以并行判断 claim、`page_role` 和 `relation_key`，最终计划只能由主 Agent 整副定版，避免同时使用旧账。

`content_items` 只保留“至少一个公开槽接受 N 项”的骨架，不代表整页总条数一定合适。`fixed-slot` 是不可拆的完整内容块，容量固定为 1；`dom-explicit` 只证明 DOM 中有明确重复项，能否增减仍只看公开容量。

## 单页查询（诊断兼容）

旧的单页命令保留给排障和指定骨架详情，不再作为生产逐页循环：

```text
node <skill>/bin/wise-ppt.mjs layouts --new-session --page-kind relationship --page-role prove --relation-key evidence --requires text --compact
node <skill>/bin/wise-ppt.mjs layouts --selection-seed <selection_seed> --layout-usage <layout_id>:<count>:<last_sequence> --page-kind relationship --page-role prove --relation-key evidence --compact
node <skill>/bin/wise-ppt.mjs layouts --layout-id <完整 layout_id>
```

候选查询输出为 `wise-ppt-layout-query@2`。每个候选带 `usage_count`、`last_sequence`、`selection_rank` 和 `requires_override_if_selected`；单骨架详情的 `selection.mode` 为 `layout-detail`。候选状态只会是：

- `fresh-available`：有从未使用候选；
- `least-used-available`：没有新候选，但使用次数不齐；
- `balanced-reuse`：候选都已使用且次数相同；
- `forced-single`：硬条件下只有一个候选；
- `no-candidate`：没有合法候选。

候选顺序是会话轮换顺序，不是质量评分。新聊天只在 `--new-session` 时随机生成一次 seed；排序本身不再取随机数。相同 registry、条件、seed 和账本必得相同结果，不同新聊天通常有不同起点。批量规划与旧单页命令使用同一排序器，内部按页序推进 usage；查询不删除已用候选，也不改变关系。

`content_items`（单页命令为 `--content-items N`）只隐藏容量明显不匹配的显示项，不重排构建器采用的粗粒度权威 rank；因此过滤后即使只显示一个候选，它仍可能保留大于 1 的 `selection_rank` 并要求 override。只要仍有显示项，`selection.state` 和 `preferred_layout_id` 也按该权威池计算；一个都未显示时才是 `no-candidate`。单骨架详情只传 `--layout-id`，不传 seed 或 usage；状态和 rank 均不适用。

Agent brief 和单页详情会给出名称、说明、结构摘要、阅读顺序、槽用途/容量、`payload_schema`、`emphasis.targets` 与 `icon_slots`，因此无需打开 seed。没有登记槽就不能加图标或换插画。`max_chars` 是锁定字体与空间下的中文保守上限，不授权缩字、改 CSS 或改内部几何。不要打开 seed 猜私有字段。

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
