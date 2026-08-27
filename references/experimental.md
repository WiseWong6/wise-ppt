# 隔离重绘合同

本文件是 experimental 的唯一 Markdown 权威。experimental 只做一件事：在已交付 standard 的隔离副本中，突破获批页面的已审核结构；内容合同与原主题不变。

## 授权

standard 已依次减字、换骨架、拆页，仍需改变结构骨架、组件组合、分栏、阅读顺序或引入未审核能力时，先停止制作并提交申请。替换公开文案、插画、图标槽，或用户授权后使用 registry 已登记的同结构受控容量，不进入 experimental。

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

- `.wise-ppt-experiment` 使用 `wise-ppt-experimental-workspace@2`：固定 `mode: redraw`、批准页、standard 快照、内容锁和主题锁；
- `experimental-build-manifest.json` 使用 `wise-ppt-experimental-build@4`：记录批准页、实际变化页、锁与构建检查；
- `experimental-delivery-manifest.json` 使用 `wise-ppt-experimental-delivery@5`：记录同一 HTML/PDF、页数、Google Chrome 渲染器证据、浏览器门禁和未声明的 standard 检查。

workspace 只记录待构建状态；实际变化页以 build/delivery manifest 为准。批准页中至少一页必须真实变化。

## 内容与主题锁

每次 build、validate、preview、deliver 都重新核对原 standard：

- 页数、页序、`page_role`、`page_kind`、claim、relation、source、source evidence 和 must 完全不变；
- 原 `theme_preset`、`typography_mode`、字体、主题资产和根级主题属性不变；
- 未授权页面与 standard 等价；只有批准页和其限定样式可以变化；
- 重绘页保留唯一可见的原 claim，source evidence 和已落页 must 仍须可见；
- 重绘页标为 `data-layout-source="experimental-redraw"`，记录 `data-baseline-layout-id`，并移除登记骨架身份。

## 允许与禁止

批准页内部可用 HTML/CSS/SVG 重做已获批的结构、组件组合和视觉。新增样式必须写在带 `data-experimental-page-style="<page-id>"` 的 style 中，所有选择器都限定到该页，并只使用原主题变量。此权限只属于用户明确批准的 experimental，不得进入 standard。

禁止：新增或修改脚本、本地或远程图片文件、远程资源、data URI 图片、图片生成分支、新字体、硬编码主题外色值、根级主题修改、未限定 CSS、越出目录的本地资源，以及改动其他受管文件。重绘组件只属于本次实验；要长期复用，另开 Catalog 登记任务。

## 交付门禁

机器检查 16:9、页面边界、最小 18px 字号、离线资源、HTML/PDF 页数一致、逐页非视觉实验标记。成品不叠加可见实验水印，实验身份只通过交付文件名与 manifest 表明。实验不生成标准 `delivery-manifest.json`，也不声明 standard 四态、registry fit、runtime selftest、screen/print 几何或栅格一致性。

交付时报告 standard 与实验绝对路径、批准页、实际变化页、三个实验标记/manifest、HTML/PDF、锁和门禁结果，以及原 standard 前后不变的证据。视觉层级、节奏和完整度由用户打开成品人工验收。
