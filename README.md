# Wise PPT Skill

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/github/license/WiseWong6/wise-ppt?style=for-the-badge" alt="AGPL-3.0 License"></a>
  <a href="themes/paper-ink/assets/design-tokens.css"><img src="https://img.shields.io/badge/Theme-paper--ink-191917?style=for-the-badge" alt="Theme paper-ink"></a>
  <a href="https://github.com/WiseWong6/wise-skills"><img src="https://img.shields.io/badge/More-Wise%20Skills-173F5F?style=for-the-badge" alt="Wise Skills"></a>
</p>

<p align="center">
  <a href="#核心逻辑">核心逻辑</a> ·
  <a href="#关系怎么判定">关系判定</a> ·
  <a href="#效果预览">效果预览</a> ·
  <a href="#资产目录">资产目录</a> ·
  <a href="#快速开始">快速开始</a> ·
  <a href="references/catalog.html">本地资产图册</a>
</p>

这个Skill它可以把 PDF、链接、口语稿，变成一份 16:9 纸墨风格的 PPT；当然也可以把旧配色的 PPT，用来做视觉优化。

在过去，AI 做 PPT 非常喜欢排布格子，格子里面几乎都是 icon 和文案，信息密度极低，配色也很一般。

但 AI 其实缺少的不是生成页面的能力，只是不知道要用什么配色，要怎么规划内容。

于是我设计了一套完整的 PPT 设计流程，用规则、版式、结构、组件来驱动PPT的制作。

## 核心逻辑

1. **先规划再动笔**：根据内容规划页数，先为每一页写出核心论点（主张句）。
2. **论点决定画法**：拿着论点回到原始材料，分析这一页的论述逻辑和信息密度。
3. **固定页套模板**：封面、目录、隔页、金句这类页面不承载论证，只能使用固定模板。
4. **其余页面进判定链**，能套则套，顺序即优先级：
   - 关系版式适用 → 整页复用，只微调文案与图标；
   - 版式不合但只需局部调整 → 保留页面结构，区域内换组件；
   - 都不适用 → 用定制的六种结构切分页面，再逐区选组件。
5. **风格统一硬约束**：只用三套字体——思源宋体 Medium（标题）、思源黑体 Light（正文）、霞鹜文楷（引语点缀），865 个图标全部按纸墨风格重绘。

## 关系怎么判定

```text
只有 1 个对象?                    → 重心
多个对象,之间:
  没关系,只是放一起?               → 并列
  有包含/从属?                     → 包含
  有方向(先后/因果)?               → 有序
  要对齐比较异同/对应?              → 比较
  只是有关联(无方向、无包含)?        → 连接(兜底)
```

<table width="100%">
  <tr><th>族</th><th>细种</th></tr>
  <tr><td>重心</td><td>焦点、示意</td></tr>
  <tr><td>并列</td><td>陈列、并行、指标、分布</td></tr>
  <tr><td>包含</td><td>层级、拆解、部分整体、嵌套</td></tr>
  <tr><td>有序</td><td>时序、流动、循环、汇聚、漏斗、因果</td></tr>
  <tr><td>比较</td><td>对比、矩阵、映射、排名</td></tr>
  <tr><td>连接</td><td>网络、交叠、证据</td></tr>
</table>

## 效果预览

六页成品样例（[themes/paper-ink/examples/wise-ppt-story-six-page/](themes/paper-ink/examples/wise-ppt-story-six-page/)）：

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

## 资产目录

| 资产 | 数量 | 说明 |
|---|---|---|
| 整页版式 | 80 | 68 关系版式 + 12 模板页 |
| 结构切分 | 17 | 6 种区域切分 × 空槽几何对照，`references/taxonomy-empty/` |
| 组件 | 126 | 机器数据全量（Catalog 可见卡 80），含 ECharts 图表组件 |
| 图标 | 865 | 源自 Tabler Icons 的纸墨重绘成品，deck 内联 SVG |

这是几张示例，点击图片可以查看原图，完整画册需下载并打开 [references/catalog.html](references/catalog.html)：

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

- 建议环境：Codex、ZCode、Kimi CLI、Claude Code；
- 适配模型：GPT 5.6 Sol High 及以上、GLM 5.3、Kimi K3、Qwen 3.8max
- Python 3（Playwright + Pillow，用于缩略图与合同脚本）与 Node.js（门禁脚本）；
- Chrome/Chromium（浏览器检查与无头 PDF 导出）；
- 字体约 63MB，不入库，首次使用先下载（国内镜像优先，自动校验指纹）：

```bash
bash themes/paper-ink/assets/fonts/download-fonts.sh
```

## 安装

把这句话发给你的 Agent 即可：

```text
帮我安装这个 skill：https://github.com/WiseWong6/wise-ppt
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
