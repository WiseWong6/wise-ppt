# Wise PPT 用户指南

本指南对应公开发行仓 [WiseWong6/wise-ppt](https://github.com/WiseWong6/wise-ppt) 里的 `wise-ppt/` Skill。用户不需要克隆开发仓，也不需要执行 `npm install`。

## 安装条件

- macOS 或 Windows
- Node.js 22 或 24 LTS
- Google Chrome 132 或更高版本，也支持官方 Chrome for Testing

不需要安装 Python、pip、Beautiful Soup、lxml、Poppler、`pdfinfo`、Homebrew 或 `curl`。不支持 Edge、Chromium 或其他浏览器。

## 安装和更新

推荐把下面这句话发给 Agent，让它从公开发行仓安装：

```text
帮我安装这个 skill：https://github.com/WiseWong6/wise-ppt
```

手动安装时，先进入 Agent 的个人 Skill 目录，再执行：

```text
git clone --depth 1 https://github.com/WiseWong6/wise-ppt.git wise-ppt
node wise-ppt/bin/wise-ppt.mjs doctor
```

输出 `"status": "pass"` 才算安装完成。`doctor` 会读取 `bundle-manifest.json`，核对发行文件的字节数与 SHA-256，并检查 Node、Chrome 和字体环境。若输出里 `bundle_mode` 是 `development` 并附带 warnings，说明当前目录是开发仓而非发行包：这只验证了运行环境，不代表安装完成。

Git 安装可在同一目录更新。更新期间暂停使用该 Skill，逐步执行；任一步失败就停止，不继续制作。

1. 先确认旧版可用且目录干净：

```text
node wise-ppt/bin/wise-ppt.mjs doctor
git -C wise-ppt status --porcelain
git -C wise-ppt rev-parse HEAD
```

`doctor` 必须通过，`status` 必须没有输出。若有已修改或未跟踪文件，先保留并处理自己的修改，不强制覆盖、不自动删除。把 `rev-parse` 输出的完整提交标识记到 Skill 目录之外，作为本次更新的恢复点。

2. 更新并检查新版：

```text
git -C wise-ppt pull --ff-only
node wise-ppt/bin/wise-ppt.mjs doctor
```

3. 如果更新或新版检查失败，先运行 `git -C wise-ppt status --porcelain`。仅在目录仍干净时，把下面的占位符替换为本次更新前记录的完整提交标识，再恢复旧版：

```text
git -C wise-ppt reset --keep <更新前的完整提交标识>
node wise-ppt/bin/wise-ppt.mjs doctor
```

这会把当前本地分支和文件恢复到更新前，不修改远端；旧版 `doctor` 通过后才能恢复使用。如果目录有改动、恢复命令失败或旧版检查仍失败，保留现场和错误信息，停止使用并排查；不要改用 `reset --hard` 或 `clean` 强行清理。故障版本修复前不要再次更新到同一版本。新版验证通过后也保留恢复点，便于后续发现问题时回退。

如果现有安装不是 Git checkout，先把新版克隆到临时目录并运行 `doctor`；通过后再整目录替换旧版。验证或复制失败时保留旧目录，不要零散覆盖。普通用户建议保留独立 Git checkout；开发环境如使用符号链接，必须确认目标是正式发行仓而不是开发仓或临时 `dist/`，并理解源目录变更会立即生效。

常见 Skill 目录：

| Agent | 目标目录 |
|---|---|
| 通用（官方推荐） | `~/.agents/skills/wise-ppt`；OpenAI Skills 官方推荐的个人 Skill 位置，多数新 Agent 会从这里发现 |
| Codex | `$CODEX_HOME/skills/wise-ppt`；未自定义时通常是 `~/.codex/skills/wise-ppt` |
| Claude Code | `~/.claude/skills/wise-ppt` |
| Kimi Code | `$KIMI_CODE_HOME/skills/wise-ppt`；未自定义时是 `~/.kimi-code/skills/wise-ppt` |
| ZCode | `~/.zcode/skills/wise-ppt` |

## 先看画册和示例

- 离线 Catalog：用 Google Chrome 打开 `<skill>/references/catalog.html`。它包含非关系页、版式、结构、组件和 865 枚成品图标；所需 WOFF2 压缩字体已经随包提供，不会联网。
- 完整视觉与合同示例：打开 `<skill>/themes/examples/wise-ppt-story-six-page/index.html`；它恰好 6 页，但不是新任务的页数模板。同目录的 `deck.pdf` 可直接翻阅，`deck-spec.json` 是对应输入示例。
- 独立主题系统：纸墨、爱马仕橙和克莱因蓝是平级主题包，不是 Paper Ink 的换色预设。Catalog 仍只展示这三套。广义核心色可用 `themes recolor --core <id>`，明确 HEX 可用 `themes recolor --hex <HEX>`；橙蓝返回原注册主题，其他核心色和自定义色返回沿用橙蓝视觉语言的白底 inline 主题。用户给出的色值保持不变，小字和关键图形使用同色安全阶；表外颜色名称没有色值时不猜测。旧 PDF/PPT/PPTX、图片或 Logo 则从代表视觉、品牌锚点、重复母题、页面角色、字体对比、线条、Icon 和组件层级提炼完整 `wise-ppt-theme@5`。运行 `themes resolve` 校验，再用 `themes preview <已有 deck> --theme <json> --out <目录>` 比较完整主题。预览只产 HTML。纸墨使用重绘图标；橙蓝视觉语言使用同名 Tabler 3.46.0 原版图标，位置和尺寸不变。选定后把同一对象写入 `deck.theme`。

这两项是用户级资产，并受 `bundle-manifest.json` 的逐文件 SHA-256 保护。

用户未指定且材料没有明确主题证据时，Skill 不会暂停要求选配色或字体；它使用主题 registry 的默认主题和该主题的默认字体模式。只有多个品牌方向同等可信时，Agent 才会带推荐一次询问。

## 命令

统一入口：`node <skill>/bin/wise-ppt.mjs <command>`。

```text
node <skill>/bin/wise-ppt.mjs doctor
node <skill>/bin/wise-ppt.mjs layouts [filters]
node <skill>/bin/wise-ppt.mjs layouts plan <page-plan.json 绝对路径> --agent-brief [--new-session]
node <skill>/bin/wise-ppt.mjs themes recolor --core <core-color-id>
node <skill>/bin/wise-ppt.mjs themes recolor --hex <HEX> [--name <名称>]
node <skill>/bin/wise-ppt.mjs preflight <deck-spec.json 绝对路径> --all-errors
node <skill>/bin/wise-ppt.mjs build <deck-spec.json 绝对路径> --out <绝对目录>
node <skill>/bin/wise-ppt.mjs validate <绝对 deck 目录>
node <skill>/bin/wise-ppt.mjs deliver <绝对 deck 目录>
```

生产默认使用 `layouts plan ... --agent-brief` 整副查询。新聊天第一次加 `--new-session` 并保存返回的 `selection_seed`；同一聊天后续 deck 从上一份 `deck-plan.json.layout_session.post_usage` 续账。命令内部按页序更新 usage：全部接受建议只调用一次；Agent 改选时整副补齐 `selected_layout_id` 后再确认一次，不做逐页模型往返。候选按少用、久未用、seed 稳定哈希轮换；同一 seed 和账本可复现。旧的 `layouts --selection-seed <seed> ...` 只保留给单页排障和 `--layout-id` 详情。新聊天从空历史开始，不扫描目录恢复历史。

`preflight --all-errors` 会在 build 前一次列出当前 spec 中可独立发现的全部问题；它不写成品。损坏 JSON 或注册表仍立即失败。预检通过后仍要完整执行 build、validate、deliver。

只有用户明确批准结构重绘时才使用：

```text
node <skill>/bin/wise-ppt.mjs experimental prepare|build|validate|preview|deliver ...
```

standard 成品输出后，Agent 会复核 claim、阅读顺序、主次和固定组件语义。若发现语义与版式/组件不匹配，会点名页面和证据，并按 [主说明的授权规则](SKILL.md#先决定模式) 核对：已有该范围有效授权时按实验合同继续，否则询问是否进入 experimental；未经明确批准不会切换模式或修改成品。

## 字体规则

`doctor` 只检查、不下载。系统已经安装清单登记的同一字体家族和对应字重时，`build` 直接复用，不要求系统字体版本与下载源 SHA-256 相同。缺失字体才会下载到用户缓存；下载文件和缓存仍必须通过权威 SHA-256，损坏文件不会进入正式缓存。

字体缓存位置：

- macOS：`~/Library/Caches/wise-ppt/fonts/<manifest-hash>/`
- Windows：`%LOCALAPPDATA%/WisePPT/Cache/fonts/<manifest-hash>/`

断网且系统字体、缓存都缺失时，构建会在写入成品前失败，并列出缺失字体、缓存路径和重试命令。

## 交付边界

整副规划输入/输出为 `wise-ppt-layout-plan-request@1` / `wise-ppt-layout-agent-brief@1`，全量预检为 `wise-ppt-preflight@1`。成品输入使用 `wise-ppt-deck@9`，构建计划使用 `wise-ppt-deck-plan@5`，构建使用 `wise-ppt-build@7`，运行时使用 `wise-ppt-runtime@8`；正式交付为 `wise-ppt-delivery@3`，实验交付为 `wise-ppt-experimental-delivery@8`。逐页声明的强调会进入最终 HTML 和 PDF；普通/强调四态只用于验证。实验 PDF 不叠加可见水印，通过文件名与 manifest 表明实验身份。

`deck.pdf` 和 `delivery-manifest.json` 成对提交。任何导出或提交失败都不会破坏上一份正式交付物。
