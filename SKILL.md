---
name: wise-ppt
description: 把 PDF、文章、链接、口语稿、提纲或现有演示材料整理成 16:9 离线网页 PPT 和同源 PDF，也用于诊断、重做或修改现有 Wise PPT。默认走已审核结构的 standard；只有用户明确批准突破该结构后，才在隔离副本中执行 experimental。
---

# Wise PPT

HTML 是唯一渲染源，PDF 同源导出。Catalog 是资产选择唯一权威；registry 和 seed 只是生产投影。

## 运行前检查

macOS/Windows 仅支持 Node 22/24 LTS 与 Google Chrome 132+。首次使用或更新后运行：

```text
node <skill>/bin/wise-ppt.mjs doctor
```

`doctor` 只检查、不下载；失败即停止。不得要求额外安装 Python、Poppler、Homebrew 或 npm 依赖；缺失字体由首次 `build` 下载并校验。

用 Chrome 打开 `references/catalog.html`。示例不决定页数。

## 先决定模式

1. 诊断、审查或规划：只分析，不生成或修改成品。
2. 不突破已审核结构：走 `standard`，只编辑 `deck-spec.json`；可按公开槽替换文案、插画和图标。
3. 组件不自动替换；用户批准且 registry 登记同结构容量时才留在 `standard`，例如四步改五步。
4. 改结构、组件、分栏、阅读顺序或用未审核能力：停止 standard；用户批准后才在新副本执行 `experimental`。
5. Catalog、registry、runtime、主题或资产有缺陷：停止制作，登记仓库修复任务。

沉默、模糊同意或历史授权不算批准，不得自动换模式。

## 完成标准

`standard`：只输入 `deck-spec.json`，只用登记结构和公开槽；生成物无手改，逐页强调、四道命令与 manifest 全通过。

`experimental`：从未漂移的 standard 隔离创建，只改获批页，不声称 standard 全绿。

## 按阶段读取

逐阶段完整读取：

| 阶段 | 必读文件 | 唯一职责 |
|---|---|---|
| 内容分页 | [references/pagination.md](references/pagination.md) | claim 拆分与页数依据 |
| 判断页型和关系 | [references/page-routing.md](references/page-routing.md) | `page_kind → page_role → relation_key` |
| 查询骨架 | [references/layouts.md](references/layouts.md) | 查询、选择完整骨架和不适配顺序 |
| 选择主题 | [references/themes.md](references/themes.md) | deck 级外观；合法值以机器 manifest 为准 |
| 写 standard JSON | [references/deck-spec.md](references/deck-spec.md) | `deck-spec@7` 字段、会话版式账本、强调与四角 |
| 检查交付 | [references/checklist.md](references/checklist.md) | 机器证明与人工验收边界 |
| 申请/执行实验 | [references/experimental.md](references/experimental.md) | 授权、锁和隔离重绘 |

## 1. 整理材料并分页

读取分页合同。提取事实、数字、来源和 must，未知留空。材料不足时说明缺口并询问是否允许联网补充；已授权不再问。获准后仅用 Agent 宿主自带的网页搜索工具；补充事实按外部来源登记并与原材料区分，否则不编造或改用插件、MCP、API/脚本。

制作前一次问清尚未提供的署名、整副配色和字体类型。未回答时不署名，其余用默认；署名只原样使用用户提供的值。写 thesis；页数只由用户约束或不可合并的 claim 推导，不用固定值、随机数或示例页数。同等必要的角色或关系拆页。不写完整 spec，不猜骨架。

不接收图片或调用生图。插画只可替换已审核槽；无槽保持 Catalog 原样。

## 2. 判断页型和关系

完整读取页面路由合同。先选 `page_kind` 和一个 `page_role`；非关系页结束，关系页再选唯一 `relation_key`。路由来自 claim，不来自形状。

## 3. 查询并选择完整骨架

整副路由写入计划，运行 `layouts plan <绝对路径> --agent-brief`。新聊天加 `--new-session` 并保存 `selection_seed`；后续承接 `deck-plan.json.layout_session.post_usage`。命令按页序更新 usage；改建议时整副填 `selected_layout_id` 后再运行。多 Agent 不并行定版，不扫描目录。少用→久未用→seed 哈希→registry 排序；rank>1 才写 `layout_override`。只查槽；不适配依次减字、换骨架、拆页，改结构才申请实验。

## 4. 选择整副主题

完整读取主题文件，固定一套 deck 级 preset 和字体模式。主题不改变路由或骨架，也不能为单页临时换色、换字体。

## 5. 一次写完 spec 和 payload

前四步确定后，按合同一次写完整 `deck-spec.json`，只填公开内容槽。强调只从 `emphasis.targets` 选一个并写原因；未登记图标位、插画位、组件或 renderer 不得新增。

## 6. 构建与交付

以下是 standard 唯一生产命令。`<skill>` 是本技能根目录；使用绝对路径可从任意目录执行：

```text
node <skill>/bin/wise-ppt.mjs preflight <deck-spec.json 绝对路径> --all-errors
node <skill>/bin/wise-ppt.mjs build <deck-spec.json 绝对路径> --out <deck 绝对目录>
node <skill>/bin/wise-ppt.mjs validate <deck 绝对目录>
node <skill>/bin/wise-ppt.mjs deliver <deck 绝对目录>
```

`preflight` 问题须全部修完；任一步非零都未完成。改 spec 或资产后从 preflight 重来；禁改 HTML/PDF 或绕过 validate。

成品输出后复核 claim、阅读顺序、主次与固定组件语义。若不匹配，列出 `page_id`、证据和建议实验页，询问用户是否进入 `experimental`；未批准不改成品，也不替代人工视觉验收。

输出目录的收编、重建和拒绝覆盖规则只认 deck-spec 合同。

## 7. 授权后的隔离实验

用户批准页面范围后才读取实验合同并执行。获批页可突破结构、组件组合和分栏；页序、角色、claim、relation、source、must、主题和字体仍锁定。恢复 standard 回原目录。

## 交付回报

说明模式、改动、页数依据、命令结果、build-id、产物绝对路径、风险和临时产物。

standard 报骨架复用理由，无则写“无”。experimental 写明“非 standard”、变化页和原成品未变证据。诊断或规划写“未生成或修改成品”。
