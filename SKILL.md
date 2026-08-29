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

`doctor` 只检查、不下载；失败即停止。不得要求安装 Python、lxml、Poppler、`pdfinfo`、Homebrew、`curl` 或 npm 依赖。同家族同字重字体优先复用；缺失字体由首次 `build` 下载并做 SHA-256 校验。

用 Chrome 打开 `references/catalog.html`。示例不决定页数。

## 先决定模式

1. 诊断、审查或规划：只分析，不生成或修改成品。
2. 不突破已审核结构：走 `standard`，只编辑 `deck-spec.json`；可按公开槽替换文案、插画和图标。
3. 组件不得自动替换。用户明确授权且 registry 登记同结构受控容量时才留在 `standard`，例如四步改五步。
4. 改结构骨架、组件组合、分栏、阅读顺序或用未审核能力：停止 standard，说明影响；用户批准后才在新副本执行 `experimental`。
5. Catalog、registry、runtime、主题或资产有缺陷：停止制作，登记仓库修复任务。

沉默、模糊同意或历史授权不算批准，不得自动换模式。

## 完成标准

`standard`：只输入 `deck-spec.json`，只用登记结构和公开槽；生成物无手改，逐页强调、三道命令与 manifest 全通过。

`experimental`：只从未漂移的已交付 standard 创建；获批页、内容与主题锁、实验标记通过，不声称 standard 门禁通过。实验身份写入文件名和 manifest。

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

完整读取分页合同。提取事实、数字、来源和 must；未知留空。材料不足时说明缺口并询问是否允许联网补充；已授权不再问。获准后仅用 Agent 宿主自带的网页搜索工具，补充事实按外部来源登记并与原材料区分；否则不得编造或改用插件、MCP、API/脚本。

制作前一次问清尚未提供的署名、整副配色和字体类型。未回答时不署名，其余用默认；署名只原样使用用户提供的值。写 thesis；页数只由用户约束或不可合并的 claim 推导，不用固定值、随机数或示例页数。同等必要的角色或关系拆页。此时不写完整 spec，不猜骨架。

不接收本地、远程或 data URI 图片，也不调用生图。插画只能在查询返回的已审核槽中替换；无槽就保持 Catalog 原样。

## 2. 判断页型和关系

完整读取页面路由合同。先选 `page_kind` 和一个 `page_role`；非关系页结束，关系页再选唯一 `relation_key`。路由来自 claim，不来自形状。

## 3. 查询并选择完整骨架

读取骨架文件。新聊天首查用一次 `--new-session` 并保存 `selection_seed`；同一聊天复用 seed，从上一份 `deck-plan.json.layout_session.post_usage` 续账。主 Agent 逐页更新 usage、查询并定最终 `layout_id`，多 Agent 不并行定版；不得扫描目录。排序：少用→久未用→seed 哈希→registry，rank>1 仅因内容不适配才填 `layout_override`。查公开槽，不打开骨架 seed；不适配依次减字、换骨架、拆页，需改结构才申请实验。

## 4. 选择整副主题

完整读取主题文件，固定一套 deck 级 preset 和字体模式。主题不改变路由或骨架，也不能为单页临时换色、换字体。

## 5. 一次写完 spec 和 payload

前四步确定后，按合同一次写完整 `deck-spec.json`，只填公开内容槽。强调只从 `emphasis.targets` 选一个并写原因；未登记图标位、插画位、组件或 renderer 不得新增。

## 6. 构建与交付

以下是 standard 唯一生产命令。`<skill>` 是本技能根目录；使用绝对路径可从任意目录执行：

```text
node <skill>/bin/wise-ppt.mjs build <deck-spec.json 绝对路径> --out <deck 绝对目录>
node <skill>/bin/wise-ppt.mjs validate <deck 绝对目录>
node <skill>/bin/wise-ppt.mjs deliver <deck 绝对目录>
```

任一步非零都未完成。改 spec 或资产后从 build 重来；禁止手修 HTML/PDF 或绕过 validate 打印。

输出目录的收编、重建和拒绝覆盖规则只认 deck-spec 合同。

## 7. 授权后的隔离实验

只有用户批准准确页面范围后，才完整读取实验合同并执行。批准页可突破原结构、组件组合和分栏；页序、角色、claim、relation、source、must、主题、字体与主题资产仍锁定。恢复 standard 直接回原目录。

## 交付回报

说明模式、改动、页数依据、命令结果、build-id、产物绝对路径、风险和临时产物。

standard 报骨架复用理由，无则写“无”。experimental 写明“非 standard”、变化页和原成品未变证据。诊断或规划写“未生成或修改成品”。
