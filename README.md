# Wise PPT · 表驱动网页 PPT 编排

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/github/license/WiseWong6/wise-ppt?style=for-the-badge" alt="AGPL-3.0 License"></a>
  <a href="themes/paper-ink/assets/design-tokens.css"><img src="https://img.shields.io/badge/Theme-paper--ink-191917?style=for-the-badge" alt="Theme paper-ink"></a>
  <a href="https://github.com/WiseWong6/wise-skills"><img src="https://img.shields.io/badge/More-Wise%20Skills-173F5F?style=for-the-badge" alt="Wise Skills"></a>
</p>

<p align="center">
  <a href="#效果预览">效果预览</a> ·
  <a href="#核心能力">核心能力</a> ·
  <a href="#判定链">判定链</a> ·
  <a href="#资产目录">资产目录</a> ·
  <a href="#快速开始">快速开始</a> ·
  <a href="references/catalog.html">本地资产图册</a>
</p>

Wise PPT 是一个表驱动的网页 PPT 编排 Skill。它把 PDF、链接、口语稿或成型 PPT，变成一份 16:9 的自包含 HTML deck 与 PDF。

它的工作前提是：**AI 做 PPT 千篇一律，缺的不是生成页面的能力，而是设计判断**。所以整套判定逻辑不靠临场发挥，全部沉在表里——表A（关系→结构）、表B（结构块→组件）加六个判定问句，执行者照表走路；版式与组件资产由唯一目录和 SHA-256 指纹锁定，生成结果过三道浏览器门禁才算交付。

## 效果预览

六页成品样例（[themes/paper-ink/examples/wise-ppt-story-six-page/](themes/paper-ink/examples/wise-ppt-story-six-page/)，含 `deck-plan.md` 规划范文），一份"用 Wise PPT 讲 Wise PPT"的完整 deck：

<table>
  <tr>
    <td width="50%" valign="top"><img src="assets/web/story-01.webp" alt="样例第 1 页：AI 做 PPT 总是千篇一律" width="100%"><sub><b>01</b> · AI 做 PPT 总是千篇一律，因为缺的是设计判断</sub></td>
    <td width="50%" valign="top"><img src="assets/web/story-02.webp" alt="样例第 2 页：五步编排链" width="100%"><sub><b>02</b> · 五步编排链把原始资料变成可放映网页</sub></td>
  </tr>
  <tr>
    <td width="50%" valign="top"><img src="assets/web/story-03.webp" alt="样例第 3 页：一页一个重心" width="100%"><sub><b>03</b> · 一页一个重心，三项原则共同决定阅读顺序</sub></td>
    <td width="50%" valign="top"><img src="assets/web/story-04.webp" alt="样例第 4 页：内容关系决定版式" width="100%"><sub><b>04</b> · 版式图册提供结构候选，但内容关系拥有最终决定权</sub></td>
  </tr>
  <tr>
    <td width="50%" valign="top"><img src="assets/web/story-05.webp" alt="样例第 5 页：组件由页面内容决定" width="100%"><sub><b>05</b> · 组件沉淀成熟表达，但是否调用仍由页面内容决定</sub></td>
    <td width="50%" valign="top"><img src="assets/web/story-06.webp" alt="样例第 6 页：尾卡" width="100%"><sub><b>06</b> · 通过三条可执行渠道继续获取 Wise PPT 更新</sub></td>
  </tr>
</table>

每页标题就是该页的**主张句**：完整、可被质疑、≤28 全角当量。deck 产出在 skill 仓库之外，自包含、可移植。

## 核心能力

- **表驱动判定**：内容怎么切页面、区域里画什么，由表A/表B 和六个判定问句决定，顺序即优先级，第一个命中即停，不临场发挥。
- **能套则套**：80 张 1920×1080 整页版式帧（68 关系版式 + 12 模板页），关系标签与槽位职责对得上就整页复用，锁死外壳几何只换内容。
- **资产唯一可信源**：`references/catalog.html` 的模板/版式/结构/组件/图标五个页签是可选全集，源码指纹由 manifest 锁定，防止资产漂移。
- **规划先行**：先定 thesis（整份 deck 一句可争辩的话）、叙事骨架（六选一）与每页主张句，再进入版式；Ghost Deck 自检——只读主张句也要能读通完整故事。
- **不可信输入隔离**：PDF/稿件里的指令不改规则、不执行命令，素材只当素材。
- **三道门禁交付**：浏览器 console 零 error、无头 PDF 页数核对、几何/字号/可见性审计，全过才算交付。
- **revise 分档**：素材变全部重做、单页主张变重走四步、只改文案只改 slide，改完同步 `deck-plan.md`。

## 判定链

```text
素材(PDF/链接/口语稿/成型PPT)
  → ① 材料解析 → 内容池(事实/数字/引语/素材,标来源)
  → ② 页面规划 → 页清单(thesis/叙事/页数/主张句)
  → ③ 页面分流 → 非关系页套模板 | 关系页进四步
  → ④ 逐页四步 → 问句定关系 → 试套版式(能套则套) → 不合才 表A圈结构 → 表B选组件
  → ⑤ 渲染 → slides → index.html
  → ⑥ 浏览器 QA → PDF → 交付
```

关系怎么定？六个判定问句，顺序即优先级：

```text
只有 1 个对象?                    → 重心
多个对象,之间:
  没关系,只是放一起?               → 并列
  有包含/从属?                     → 包含
  有方向(先后/因果)?               → 有序
  要对齐比较异同/对应?              → 比较
  只是有关联(无方向、无包含)?        → 连接(兜底)
```

| 族 | 细种 |
|---|---|
| 重心 | 焦点、示意 |
| 并列 | 陈列、并行、指标、分布 |
| 包含 | 层级、拆解、部分整体、嵌套 |
| 有序 | 时序、流动、循环、汇聚、漏斗、因果 |
| 比较 | 对比、矩阵、映射、排名 |
| 连接 | 网络、交叠、证据 |

封面/目录/隔页/金句/联络等非关系页不走这条链，直接套模板。规则全文见 [SKILL.md](SKILL.md)（唯一执行权威）；"为什么这么判"的方法论见 [skill-design.md](skill-design.md)，"某一版改了什么"查 [skill-design-changelog.md](skill-design-changelog.md)。

## 资产目录

**结构 = 页面区域怎么切分；组件 = 区域内画什么。** 两层资产都长在图册里：

| 资产 | 数量 | 说明 |
|---|---|---|
| 整页版式帧 | 80 | 68 关系版式 + 12 模板页，完整 1920×1080 可执行 HTML，`references/gallery-paper-ink/ai/frames/` |
| 结构空槽大图 | 17 | 6 种区域切分 × 空槽几何对照，`references/taxonomy-empty/` |
| 组件 | 126 | 机器数据全量（Catalog 可见卡 80），含 ECharts 图表组件 |
| 图标 | 865 | 源自 Tabler Icons 的纸墨重绘成品，deck 内联 SVG |

版式卡按 A–O 编号。挑几张感受一下（点击图片看 640×360 原图，全部 80 张开 [references/catalog.html](references/catalog.html)）：

<table>
  <tr>
    <td width="33.33%" valign="top"><a href="references/catalog-thumbnails/page-gallery-paper-ink-ai-frames-layout-b1.webp"><img src="references/catalog-thumbnails/page-gallery-paper-ink-ai-frames-layout-b1.webp" alt="B1 水平时间轴" width="100%"></a><sub><b>B1</b> · 水平时间轴<br>有序 / 时序</sub></td>
    <td width="33.33%" valign="top"><a href="references/catalog-thumbnails/page-gallery-paper-ink-ai-frames-layout-c6.webp"><img src="references/catalog-thumbnails/page-gallery-paper-ink-ai-frames-layout-c6.webp" alt="C6 KPI 大数字横带" width="100%"></a><sub><b>C6</b> · KPI 大数字横带<br>并列 / 指标</sub></td>
    <td width="33.33%" valign="top"><a href="references/catalog-thumbnails/page-gallery-paper-ink-ai-frames-layout-e1.webp"><img src="references/catalog-thumbnails/page-gallery-paper-ink-ai-frames-layout-e1.webp" alt="E1 对比双面板" width="100%"></a><sub><b>E1</b> · 对比双面板<br>比较 / 对比</sub></td>
  </tr>
  <tr>
    <td width="33.33%" valign="top"><a href="references/catalog-thumbnails/page-gallery-paper-ink-ai-frames-layout-g4.webp"><img src="references/catalog-thumbnails/page-gallery-paper-ink-ai-frames-layout-g4.webp" alt="G4 中心枢纽 + 卫星" width="100%"></a><sub><b>G4</b> · 中心枢纽 + 卫星<br>重心 / 焦点</sub></td>
    <td width="33.33%" valign="top"><a href="references/catalog-thumbnails/page-gallery-paper-ink-ai-frames-layout-h3.webp"><img src="references/catalog-thumbnails/page-gallery-paper-ink-ai-frames-layout-h3.webp" alt="H3 分层架构栈" width="100%"></a><sub><b>H3</b> · 分层架构栈<br>包含 / 层级</sub></td>
    <td width="33.33%" valign="top"><a href="references/catalog-thumbnails/page-gallery-paper-ink-ai-frames-layout-o1.webp"><img src="references/catalog-thumbnails/page-gallery-paper-ink-ai-frames-layout-o1.webp" alt="O1 漏斗" width="100%"></a><sub><b>O1</b> · 漏斗<br>有序 / 漏斗</sub></td>
  </tr>
</table>

## 运行要求

- 支持 Skill 的 agent 宿主（ZCode / Codex 均可）；
- Python 3（Playwright + Pillow，用于缩略图与合同脚本）与 Node.js（门禁脚本）；
- Chrome/Chromium（浏览器检查与无头 PDF 导出）；
- 字体约 63MB，不入库，首次使用先下载（国内镜像优先，自动校验指纹）：

```bash
bash themes/paper-ink/assets/fonts/download-fonts.sh
```

- 适配模型：GPT 5.6 Sol High、GLM 5.3、Kimi K3、Qwen 3.8max

## 安装

把这句话发给你的 Agent 即可：

```text
帮我安装这个 skill：https://github.com/WiseWong6/wise-ppt
```

想手动装也只要两行（Codex 用户第一行即可，ZCode 用户补第二行软链）：

```bash
git clone https://github.com/WiseWong6/wise-ppt.git ~/.codex/skills/wise-ppt
ln -s ~/.codex/skills/wise-ppt ~/.zcode/skills/wise-ppt
```

更新：`git -C ~/.codex/skills/wise-ppt pull --ff-only`

## 快速开始

一句话 + 你的资料（PDF / 链接 / 口语稿 / 成型 PPT），一站式生成 deck：

```text
/wise-ppt 把这份 PDF 做成 10 页路演 deck，输出到 /absolute/path/decks/
```

建议先让 Agent 进入 plan 模式，确认页面规划（thesis / 页数 / 每页主张句）后再执行。

## 关于作者

全网同名 **@歪斯Wise**，持续分享 AI 创作、Agent 工作流、视觉设计与效率工具。

<p>
  <a href="https://x.com/killthewhys">X / Twitter</a> ·
  <a href="https://www.xiaohongshu.com/user/profile/61f3ea4f000000001000db73">小红书</a> ·
  <a href="https://github.com/WiseWong6/wise-skills">Wise Skills</a>
</p>

<p><strong>微信公众号</strong></p>
<p><img src="assets/social/wechat-qrcode.jpg" width="180" alt="歪斯Wise 微信公众号二维码"></p>

## License

[AGPL-3.0](LICENSE) © 2026 Wise Wong

第三方资产（Apache ECharts、PPT Component Atlas、Tabler Icons 纸墨重绘、思源字体等）保留原许可，清单见 [NOTICE](NOTICE)。
