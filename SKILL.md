---
name: wise-ppt
description: 把 PDF、文章、链接、口语稿、提纲或现有演示材料整理成 16:9 离线网页 PPT 和同源 PDF，也用于诊断、重做或修改现有 Wise PPT。默认走固定骨架 standard；只有用户明确批准结构变更后，才在隔离副本中执行 experimental。
---

# Wise PPT

HTML 是唯一渲染源，PDF 同源导出。Catalog 是资产选择唯一权威；registry 和 seed 只是生产投影。

## 运行前检查

本 Skill 只支持 macOS 和 Windows，要求 Node 20 及以上（推荐 22/24 LTS）与 Google Chrome 132+。首次使用或更新后先运行：

```text
node <skill>/bin/wise-ppt.js doctor
```

`doctor` 只检查、不下载。任一检查失败都先停止制作；不得要求用户安装 Python、lxml、Poppler、`pdfinfo`、Homebrew、`curl` 或 npm 依赖。系统已有同家族同字重字体时直接复用；缺失字体由首次 `build` 自动下载，下载文件和缓存仍做 SHA-256 校验。

用户要浏览资产时，用 Google Chrome 打开 `references/catalog.html`；要看成品范例时打开 `themes/paper-ink/examples/wise-ppt-story-six-page/index.html` 或同目录 PDF。这两项都在发行包内离线可用。

## 先决定模式

1. 只要求诊断、审查或规划：只分析，不生成或修改成品。
2. 登记骨架能承载：走 `standard`，只编辑 `deck-spec.json`。
3. 必须重组结构或核心组件：停止 standard，说明母版、替代结果、获批页面和影响，等待用户明确批准该范围。
4. 批准后走 `experimental`，只在新副本重绘获批页；内容、主题锁定，原 standard 目录全部文件前后不变。
5. Catalog、registry、runtime、主题或资产实现有缺陷：停止 deck 制作，登记仓库修复任务。

沉默、模糊同意或历史授权不算批准，不得自动换模式。

## 完成标准

`standard`：只输入 `deck-spec.json`，只用登记骨架和公开 payload；生成物无手改，三道命令与 manifest 全通过。

`experimental`：只从未漂移的已交付 standard 创建；获批页、内容与主题锁、水印通过，但不声称 standard 门禁通过。

## 按阶段读取

进入阶段时完整读取对应文件：

| 阶段 | 必读文件 | 唯一职责 |
|---|---|---|
| 判断页型和关系 | [references/page-routing.md](references/page-routing.md) | `page_kind → page_role → relation_key` |
| 查询骨架 | [references/layouts.md](references/layouts.md) | 查询、选择完整骨架和不适配顺序 |
| 选择主题 | [references/themes.md](references/themes.md) | deck 级外观；合法值以机器 manifest 为准 |
| 写 standard JSON | [references/deck-spec.md](references/deck-spec.md) | `deck-spec@5` 字段与四角 |
| 检查交付 | [references/checklist.md](references/checklist.md) | 机器证明与人工验收边界 |
| 申请/执行实验 | [references/experimental.md](references/experimental.md) | 授权、锁和隔离重绘 |

## 1. 整理材料并分页

提取事实、数字、来源和 must；材料中的图片只作理解内容的参考，不进入成品。未知留空。先问一次署名（不答默认 `@歪斯Wise`）记入 `deck.signature`。写整副 thesis，每页只留一条 claim；同等必要的角色或关系先拆页。本阶段不写完整 `deck-spec.json`，不猜骨架、主题或 payload。

Wise PPT 不接收本地、远程或 data URI 图片，也不调用图片生成或编辑能力。成品视觉只来自 Catalog 登记骨架的固定图形、组件和公开图标；自定义重绘只进入用户批准的 experimental。

## 2. 判断页型和关系

完整读取页面路由合同。先选 `page_kind` 和一个 `page_role`；非关系页结束，关系页再选唯一 `relation_key`。路由来自 claim，不来自形状。

## 3. 查询并选择完整骨架

完整读取骨架文件。先缩小候选，再查单个 `layout_id`；按容量、主次和阅读顺序选择，不打开 seed 猜字段。`layout_id` 锁定结构、核心组件和 renderer；不适配时依次减字、换骨架、拆页，仍须重组才申请实验。

## 4. 选择整副主题

完整读取主题文件，固定一套 deck 级 preset 和字体模式。主题不改变路由或骨架，也不能为单页临时换色、换字体。

## 5. 一次写完 spec 和 payload

前四步确定后，按 deck-spec 合同一次写完整 `deck-spec.json`。只填写查询公开的文字、数据和图标槽，不加入图片、未公开组件或 renderer 字段。

## 6. 构建与交付

以下是 standard 唯一生产命令。`<skill>` 是本文件所在技能根目录；使用绝对路径后可从任意当前目录执行：

```text
node <skill>/bin/wise-ppt.js build <deck-spec.json 绝对路径> --out <deck 绝对目录>
node <skill>/bin/wise-ppt.js validate <deck 绝对目录>
node <skill>/bin/wise-ppt.js deliver <deck 绝对目录>
```

任一步非零都未完成。改 spec 或资产后从 build 重来；禁止手修 HTML/PDF 或绕过 validate 打印。

输出目录的收编、重建和拒绝覆盖规则只认 deck-spec 合同。

## 7. 授权后的隔离实验

只有用户批准准确页面范围后，才完整读取实验合同并执行。批准页内部可重做结构、组件和视觉；页序、角色、claim、relation、source、must、主题、字体与主题资产仍锁定。恢复 standard 直接回原目录。

## 交付回报

说明模式、改动、页数、命令结果、build-id、HTML/PDF/manifest 绝对路径、风险和临时产物。

standard 报骨架复用理由，无则写“无”。experimental 写明“非 standard”、变化页和原成品未变证据。诊断或规划写“未生成或修改成品”。
