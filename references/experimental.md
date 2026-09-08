# 隔离重绘合同

本文件是 experimental 的唯一 Markdown 权威。experimental 只做一件事：在已交付 standard 的隔离副本中，突破获批页面的已审核结构；内容合同与原主题不变。

## 授权

先按 [主说明的授权规则](../SKILL.md#先决定模式) 核对当前任务的有效授权。已明确批准本次页面和变更范围且未撤销时，直接在该范围内继续，不重复申请；暂停、跨轮对话或继续任务不使授权失效。以下申请流程只用于尚未获批或新增的范围，已有授权部分可继续。

standard 已依次减字、换骨架、拆页，仍需改变结构骨架、组件组合、分栏、阅读顺序或引入未审核能力时，先停止制作并提交申请。替换公开文案、插画、图标槽，或用户授权后使用 registry 已登记的同结构受控容量，不进入 experimental。

standard 成品后的语义适配复核若发现 claim、阅读顺序、主次或固定组件与内容不匹配，也只能形成逐页申请：列明 `page_id`、证据、已尝试的 standard 调整和建议范围，询问用户是否进入 experimental。复核本身不构成授权。

- **母版**：最接近的 Catalog 卡片与完整 `layout_id`；
- **替代方案**：减字、换骨架、拆页分别为何不够；
- **变更点**：准确列出允许重绘的 `page_id`；
- **影响**：说明结构、组件、阅读节奏和验收变化；
- **后果**：一次性重绘不会进入 Catalog，也不再冒充登记骨架；
- **验证**：实验路径、失败条件和原 standard 不变的证据。

最后询问：“是否同意以上范围进入隔离实验？”只有用户明确批准该页范围后才可继续。授权不自动扩大到其他页面、deck 或仓库资产。

Catalog、registry、runtime、主题或资产本身有缺陷时，停止并登记仓库修复任务，不能用 experimental 遮盖。

## 唯一入口

来源必须是已经 validate、deliver 且未漂移的 standard 绝对路径；输出必须是尚不存在、与来源不嵌套且不经过符号链接的新绝对路径。

单页或多页批准时重复 `--page`：

```text
node <skill>/bin/wise-ppt.mjs experimental prepare <standard 绝对目录> --out <experiment 绝对目录> --page <page-id>
```

全 deck 批准时改用 `--all-pages`；它仍会展开并记录每个 `page_id`。`--page` 与 `--all-pages` 必须二选一。

只编辑实验目录的 `index.html`，再运行：

```text
node <skill>/bin/wise-ppt.mjs experimental build <experiment 绝对目录>
node <skill>/bin/wise-ppt.mjs experimental validate <experiment 绝对目录>
node <skill>/bin/wise-ppt.mjs experimental preview <experiment 绝对目录>
node <skill>/bin/wise-ppt.mjs experimental deliver <experiment 绝对目录>
```

`preview` 默认只校验，不打开浏览器。只有用户明确要求打开时才加 `--open`；打开浏览器不属于机器完成条件。

## 机器合同

- `.wise-ppt-experiment` 使用 `wise-ppt-experimental-workspace@4`：固定 `mode: redraw`、批准页、standard 快照、内容锁、主题锁、主题语义锁和简报摘要；
- `experimental-theme-brief.json` 使用 `wise-ppt-experimental-theme-brief@2`：给 AI 公开当前主题的身份解析、可选 target、允许动作和拒绝条件，不公开 standard 私有 selector；
- `experimental-build-manifest.json` 使用 `wise-ppt-experimental-build@7`：记录批准页、实际变化页、锁、默认主题身份、强调对象与 treatment 审计；
- `experimental-delivery-manifest.json` 使用 `wise-ppt-experimental-delivery@8`：记录同一 HTML/PDF、页数、Google Chrome 渲染器证据、浏览器门禁和未声明的 standard 检查。

workspace 只记录待构建状态；实际变化页以 build/delivery manifest 为准。批准页中至少一页必须真实变化。

## 内容与主题锁

每次 build、validate、preview、deliver 都重新核对原 standard：

- 页数、页序、`page_role`、`page_kind`、claim、relation、source、source evidence 和 must 完全不变；
- 原 `deck.theme`、`typography_mode`、字体、主题资产和根级主题属性不变；
- 未授权页面与 standard 等价；只有批准页和其限定样式可以变化；
- 保留原 `.doc.tl`、`.folio`、`.caption` 节点、文字、属性、定位容器与样式，只重绘正文。左上第二行是页面标题，底部是核心论点，两者职责不同；
- 重绘页在原底部 `.caption` 标记唯一 `data-experimental-claim="true"`；没有独立 caption 的非关系页在正文保留唯一原 claim。禁止拿左上标题或左下页码充当 claim；source evidence 和已落页 must 仍须实际可见；
- 重绘页标为 `data-layout-source="experimental-redraw"`，记录 `data-baseline-layout-id`，并移除登记骨架身份。

每个真实变化页还必须显式保留主题语义：先读取同目录的 `experimental-theme-brief.json`，登记 1–2 个 `data-experimental-theme-identity="identity.*"` 默认身份组，所有 `functional` token 都只能用在这些组内；`.doc`、`.folio`、`.caption` 不得成为身份组或强调组。页面用 `data-experimental-emphasis-target="none|已登记 target_id"` 和不少于 8 字的 `data-experimental-emphasis-rationale` 说明取舍。选中目标时必须且只能有一个同 ID 的 `data-experimental-emphasis-group`，并在该组登记 `data-experimental-emphasis-treatment="focus.*"`；除 `focus.ink-weight` 只使用主墨色与字重外，其余动作必须使用 focus token。选择 `none` 时不得出现强调组、treatment 或 focus token。构建结果按相对 standard 的 `added`、`removed`、`changed`、`retained` 记录对象变化，并单独记录 treatment。

## 允许与禁止

批准页内部可用 HTML/CSS/SVG 重做已获批的结构、组件组合和视觉。新增样式必须写在带 `data-experimental-page-style="<page-id>"` 的 style 中，所有选择器都限定到该页，并只使用原主题变量。此权限只属于用户明确批准的 experimental，不得进入 standard。

禁止：新增或修改脚本、本地或远程图片文件、远程资源、data URI 图片、图片生成分支、新字体、硬编码主题外色值、根级主题修改、未限定 CSS、越出目录的本地资源，以及改动其他受管文件。重绘组件只属于本次实验；要长期复用，另开 Catalog 登记任务。

编辑 SVG 属性使用 DOM API，保留自闭合或成对闭合标签，不用正则截取标签。`path` 等几何节点只能带允许的描述或动画子元素，不能把支点、标签等图形嵌进去。结构正确不代表语义正确：提交前逐页核对正文是否仍表达批准的关系，缺失关键部件时不得只靠文字命名通过。

## 交付门禁

build/validate 检查固定家具不变、claim 所在区域、SVG 子结构和已有内容锁。deliver 再用真实浏览器对照原 standard 的固定家具位置与样式，并检查正文实际可见文字、16:9、页面边界、正文最小 18px 字号、离线资源、HTML/PDF 页数一致、逐页非视觉实验标记。固定家具沿用原主题字号，不受正文 18px 下限驱动而放大。成品不叠加可见实验水印，实验身份只通过交付文件名与 manifest 表明。实验不生成标准 `delivery-manifest.json`，也不声明 standard 四态、registry fit、runtime selftest、screen/print 几何或栅格一致性。

各命令逐条运行并检查实际退出码；命令失败即修复，禁止用 `| tail` 等管道的成功状态代替门禁状态。

交付时报告 standard 与实验绝对路径、批准页、实际变化页、三个实验标记/manifest、HTML/PDF、锁和门禁结果，以及原 standard 前后不变的证据。视觉层级、节奏和完整度由用户打开成品人工验收。
