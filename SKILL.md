---
name: wise-ppt
description: 把 PDF、文章、链接、口语稿、提纲或现有演示材料整理成 16:9 离线网页 PPT 和同源 PDF，也用于诊断、重做或修改现有 Wise PPT。默认走已审核结构的 standard；只有用户明确批准突破该结构后，才在隔离副本中执行 experimental。
---

# Wise PPT

HTML 是渲染源，PDF 同源导出；Catalog 是资产选择唯一权威。

## 运行前检查

macOS/Windows 仅支持 Node 22/24 LTS 与 Google Chrome 132+。首次使用或更新后运行：

```text
node <skill>/bin/wise-ppt.mjs doctor
```

`doctor` 只检查不下载，失败即停；不额外安装依赖。缺字体由 `build` 下载校验。Chrome 打开 `references/catalog.html`；示例不定页数。详见 [指南](USER-GUIDE.md)。

## 先决定模式

1. 诊断、审查、规划只分析。
2. 不改已审核结构走 `standard`，只编辑 `deck-spec.json` 和公开槽；组件容量变更须 registry 已登记且用户批准。
3. 改结构、组件、分栏、阅读顺序或用未审核能力，获批后在副本执行 `experimental`。
4. Catalog、registry、runtime、主题或资产有缺陷，停止并登记修复。

沉默、模糊同意和历史授权都不算批准。

## 完成标准

`standard` 只输入 `deck-spec.json`，生成物无手改且四道命令全通过。`experimental` 隔离创建，只改获批页。

## 按阶段读取

逐阶段读取：

| 阶段 | 必读文件 | 唯一职责 |
|---|---|---|
| 内容分页 | [references/pagination.md](references/pagination.md) | claim 与页数 |
| 判断页型和关系 | [references/page-routing.md](references/page-routing.md) | `page_kind → page_role → relation_key` |
| 查询骨架 | [references/layouts.md](references/layouts.md) | 选择完整骨架 |
| 选择主题与主次 | [references/themes.md](references/themes.md)、[颜色语义](references/color-semantics.md) | deck 外观与逐页主次 |
| 写 standard JSON | [references/deck-spec.md](references/deck-spec.md) | `deck-spec@9` 与版式账本 |
| 检查交付 | [references/checklist.md](references/checklist.md) | 验证边界 |
| 申请/执行实验 | [references/experimental.md](references/experimental.md) | 授权与隔离重绘 |

## 1. 整理材料并分页

读取分页合同。提取事实、数字、来源和 must。材料不足时询问是否允许联网补充；已授权不再问。获准后仅用 Agent 宿主自带的网页搜索工具；补充事实按外部来源登记并与原材料区分，否则不编造或另接工具。

署名、配色、字体缺省不暂停：不署名，主题取 `themes/registry.json.default_theme_id`，字体取默认模式；品牌方向冲突时带推荐询问。署名不代填。写 thesis；页数只由用户约束或不可合并的 claim 推导，不用固定值、随机数或示例页数。同等必要的角色或关系拆页。此时不写 spec、不猜骨架。

图片、Logo、旧 PDF/PPT 可用于主题取证，但不复制进成品、不调用生图，也不成为 payload。插画只替换已审核槽。

## 2. 判断页型和关系

读取路由合同。先选 `page_kind` 和一个 `page_role`；关系页再选唯一 `relation_key`。路由来自 claim，不来自形状。

## 3. 查询并选择完整骨架

整副路由写入计划，运行 `layouts plan <绝对路径> --agent-brief`。新聊天加 `--new-session` 并保存 `selection_seed`；后续承接 `deck-plan.json.layout_session.post_usage`。按页序更新 usage；改建议时整副填 `selected_layout_id` 后再运行。多 Agent 不并行定版。少用→久未用→seed 哈希→registry 排序；rank>1 才写 `layout_override`。不适配依次减字、换骨架、拆页，改结构才申请实验。

## 4. 选择整副主题

读取主题与颜色语义文件，固定 deck 级主题和字体模式；主题不改路由、骨架或内容。

沿用旧材料从代表页取证；仅有 Logo 不虚构复杂轴。生成 `wise-ppt-theme@5` 后 resolve、preview，只接管显式语义。换色先查 `themes/core-colors.json`：广义色用 `themes recolor --core`，明确 HEX 用 `--hex`，RGB 只等值转写；不吸附，表外名称无色值就询问。直接使用命令输出的完整 `deck.theme`；纸墨单独选择，橙蓝为 registered，其余为白底 inline。封面、身份、强调和锁定规则均按主题与颜色语义文件执行；不在本文件复制算法。

## 5. 一次写完 spec 和 payload

前四步确定后一次写完整 `deck-spec.json`，只填公开槽。标题概括内容，底部论点不重复。仅当某候选更直接支撑 claim 时，从 `emphasis.targets` 选一并写内容原因；否则不填。不得新增能力。

## 6. 构建与交付

standard 唯一生产命令（`<skill>` 为技能根目录）：

```text
node <skill>/bin/wise-ppt.mjs preflight <deck-spec.json 绝对路径> --all-errors
node <skill>/bin/wise-ppt.mjs build <deck-spec.json 绝对路径> --out <deck 绝对目录>
node <skill>/bin/wise-ppt.mjs validate <deck 绝对目录>
node <skill>/bin/wise-ppt.mjs deliver <deck 绝对目录>
```

素材主题在写 spec 前使用：

```text
node <skill>/bin/wise-ppt.mjs themes resolve <theme.json 绝对路径>
node <skill>/bin/wise-ppt.mjs themes preview <已有 deck 绝对目录> --theme <theme.json 绝对路径> --out <预览绝对目录>
```

`preflight` 问题须修完；任一步非零都未完成。改 spec 或资产后从头重来；禁改 HTML/PDF 或绕过 validate。

成品输出后复核 claim、阅读顺序、主次与固定组件语义。不匹配时列出 `page_id` 和证据，询问用户是否进入 `experimental`；未批准不改成品。输出目录规则只认 deck-spec 合同。

## 7. 授权后的隔离实验

按实验合同和 prepare 简报重绘获批正文；页眉、页码、底部论点与主题锁定。恢复 standard 回原目录。

## 交付回报

说明模式、改动、页数依据、命令结果、build-id、绝对路径、风险和临时产物。standard 报骨架复用理由；experimental 写明“非 standard”、变化页和原成品未变；诊断或规划写“未生成或修改成品”。
