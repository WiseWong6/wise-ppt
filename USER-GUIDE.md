# Wise PPT 用户指南

本指南对应 GitHub Release 里的精简 `wise-ppt/` Skill 包。用户不需要克隆开发仓，也不需要执行 `npm install`。

## 安装条件

- macOS 或 Windows
- Node.js 22 或 24 LTS
- Google Chrome 132 或更高版本，也支持官方 Chrome for Testing

不需要安装 Python、pip、Beautiful Soup、lxml、Poppler、`pdfinfo`、Homebrew 或 `curl`。不支持 Edge、Chromium 或其他浏览器。

## 安装和更新

1. 下载 `wise-ppt-skill.zip` 与 `wise-ppt-skill.sha256`。
2. 校验 SHA-256：macOS 使用 `shasum -a 256 wise-ppt-skill.zip`；Windows PowerShell 使用 `Get-FileHash .\wise-ppt-skill.zip -Algorithm SHA256`。
3. 解压后得到固定根目录 `wise-ppt/`，把整个目录复制到 Agent 的个人 Skill 目录，不要创建软链。
4. 运行 `node <skill>/bin/wise-ppt.mjs doctor`。输出 `"status": "pass"` 才算安装完成。

更新时先把新包解压到临时目录并运行 `doctor`；通过后再整目录替换旧包。验证或复制失败时保留旧目录，不要零散覆盖。

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

输入使用 `wise-ppt-deck@6`，构建使用 `wise-ppt-build@4`，运行时使用 `wise-ppt-runtime@4`；正式交付为 `wise-ppt-delivery@3`，实验交付为 `wise-ppt-experimental-delivery@5`。逐页声明的强调会进入最终 HTML 和 PDF；普通/强调四态只用于验证。实验 PDF 不叠加可见水印，通过文件名与 manifest 表明实验身份。

`deck.pdf` 和 `delivery-manifest.json` 成对提交。任何导出或提交失败都不会破坏上一份正式交付物。
