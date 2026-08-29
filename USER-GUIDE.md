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

输出 `"status": "pass"` 才算安装完成。`doctor` 会读取 `bundle-manifest.json`，核对发行文件的字节数与 SHA-256，并检查 Node、Chrome 和字体环境。

Git 安装可在同一目录更新：

```text
git -C wise-ppt pull --ff-only
node wise-ppt/bin/wise-ppt.mjs doctor
```

如果现有安装不是 Git checkout，先把新版克隆到临时目录并运行 `doctor`；通过后再整目录替换旧版。验证或复制失败时保留旧目录，不要零散覆盖。普通用户建议保留独立 Git checkout；开发环境如使用符号链接，必须确认目标是正式发行仓而不是开发仓或临时 `dist/`，并理解源目录变更会立即生效。

常见 Skill 目录：

| Agent | 目标目录 |
|---|---|
| Codex | `$CODEX_HOME/skills/wise-ppt`；未自定义时通常是 `~/.codex/skills/wise-ppt` |
| Claude Code | `~/.claude/skills/wise-ppt` |
| Kimi Code | `$KIMI_CODE_HOME/skills/wise-ppt`；未自定义时是 `~/.kimi-code/skills/wise-ppt` |
| ZCode | `~/.zcode/skills/wise-ppt` |

## 先看画册和示例

- 离线 Catalog：用 Google Chrome 打开 `<skill>/references/catalog.html`。它包含非关系页、版式、结构、组件和 865 枚成品图标；所需 WOFF2 压缩字体已经随包提供，不会联网。
- 六页示例：打开 `<skill>/themes/paper-ink/examples/wise-ppt-story-six-page/index.html`；同目录的 `deck.pdf` 可直接翻阅，`deck-spec.json` 是对应输入示例。

这两项是用户级资产，并受 `bundle-manifest.json` 的逐文件 SHA-256 保护。

## 命令

统一入口：`node <skill>/bin/wise-ppt.mjs <command>`。

```text
node <skill>/bin/wise-ppt.mjs doctor
node <skill>/bin/wise-ppt.mjs layouts [filters]
node <skill>/bin/wise-ppt.mjs build <deck-spec.json 绝对路径> --out <绝对目录>
node <skill>/bin/wise-ppt.mjs validate <绝对 deck 目录>
node <skill>/bin/wise-ppt.mjs deliver <绝对 deck 目录>
```

新聊天第一次候选查询使用 `layouts --new-session ...`，保存返回的 `selection_seed`；同一聊天后续页和 deck 都改传 `--selection-seed <seed>`。Agent 会逐页更新账本，并把上一份 `deck-plan.json.layout_session.post_usage` 转为重复的 `--layout-usage <layout_id>:<count>:<last_sequence>`。候选按少用、久未用、seed 稳定哈希轮换，registry 顺序只在哈希碰撞时兜底；不同聊天通常有不同起点，同一 seed 和账本可复现。新聊天从空历史开始，不扫描旧目录恢复历史。

只有用户明确批准结构重绘时才使用：

```text
node <skill>/bin/wise-ppt.mjs experimental prepare|build|validate|preview|deliver ...
```

## 字体规则

`doctor` 只检查、不下载。系统已经安装清单登记的同一字体家族和对应字重时，`build` 直接复用，不要求系统字体版本与下载源 SHA-256 相同。缺失字体才会下载到用户缓存；下载文件和缓存仍必须通过权威 SHA-256，损坏文件不会进入正式缓存。

字体缓存位置：

- macOS：`~/Library/Caches/wise-ppt/fonts/<manifest-hash>/`
- Windows：`%LOCALAPPDATA%/WisePPT/Cache/fonts/<manifest-hash>/`

断网且系统字体、缓存都缺失时，构建会在写入成品前失败，并列出缺失字体、缓存路径和重试命令。

## 交付边界

输入使用 `wise-ppt-deck@7`，构建计划使用 `wise-ppt-deck-plan@5`，构建使用 `wise-ppt-build@4`，运行时使用 `wise-ppt-runtime@4`；正式交付为 `wise-ppt-delivery@3`，实验交付为 `wise-ppt-experimental-delivery@5`。逐页声明的强调会进入最终 HTML 和 PDF；普通/强调四态只用于验证。实验 PDF 不叠加可见水印，通过文件名与 manifest 表明实验身份。

`deck.pdf` 和 `delivery-manifest.json` 成对提交。任何导出或提交失败都不会破坏上一份正式交付物。
