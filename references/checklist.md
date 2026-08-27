# standard 成品检查边界

本文件只回答两件事：机器门禁证明什么，人工还要检查什么。命令、字段、关系和选骨架规则由各自主人负责，这里不复制。

机器全绿只说明：已登记输入、锁定骨架、生成文件和 HTML/PDF 渲染链彼此闭合。它不说明材料没有漏读、事实一定正确、Catalog 固定视觉一定适合内容或页面已经好看。

## 机器会证明什么

### 输入与编译产物

机器检查：

- spec 字段、枚举、引用和 standard 禁区；
- source-backed 输入的逐页来源引用与可见证据；
- 已登记 must 的 placed/omitted 去向、页级引用和可见证据；
- payload 非空，槽、binding key、字符和项目数量都在公开合同内；
- 多字段 `fields` 与 item groups 精确一致，成品没有整槽照抄公开 example；
- 逐页强调目标与原因来自 spec，目标只落到该骨架已审核对象；
- 图标只出现在登记槽位，来源、尺寸、线宽、颜色和位置符合槽位合同；
- Catalog 可见项、authority、registry 和 seed 的数量与哈希一一对应；
- DOM、CSS、结构、核心组件、几何和冻结资产没有被成品手改；
- deck plan、来源账本、组件收据、几何合同和 build manifest 与 spec/HTML 一致。

### 浏览器与 PDF

deliver 在同一个 Chrome/CDP 会话中执行 ready、normal/accent、screen/print 和 PDF 导出。机器检查：

- 每页除 claim 外至少有一个真实可见 payload；
- 最小字号、不可见内容、文字/容器 overflow、父级裁切和 1920×1080 页面边界；
- `text/data/claim` 的可见文字墨迹位于登记 fit allocation；
- 文字碰撞只覆盖可见 `text/claim` 的大面积独立块；正常行内相邻文字和小面积墨迹相交不会触发该门禁；
- source/must 属性与 spec、来源账本一致，登记证据仍可见；
- normal screen、accent screen、normal print、accent print 四态证据齐全；
- 最终 HTML 按 spec 呈现强调，PDF 从最终 accent print 状态导出；
- screen/print 锚点误差不超过 1px，计算字体属性一致；
- 逐页模糊栅格 RMSE 不超过 2.5%；
- HTML、PDF 和 spec 页数相等；
- spec、HTML、runtime、字体、资产和 PDF 哈希写入 delivery manifest；normal/accent 两份 runtime selftest 都记录 `checks.fit_check=pass`。

runtime selftest 缺失、合同不匹配、任一子检查失败或 manifest 不能重算时，deliver 必须失败，也不得用失败结果覆盖已有 PDF/manifest。

## 机器不能证明什么

下面必须由人判断：

- [ ] 原材料中的 must 是否全部被作者登记；
- [ ] 来源陈述是否真实完整，数字和引语是否解释正确；
- [ ] relation、page role 和骨架是否最适合内容；
- [ ] Catalog 固定图形、组件和图标语义是否适合内容；
- [ ] `data` 文字、门禁阈值以下的小面积墨迹相交，真实阅读时是否仍冲突；
- [ ] 页面节奏、留白、主次、风格和演讲可读性是否达到成品标准。

机器核对的是“已登记证据真的出现在页面里”，不是“事实已经独立核验”。

## 人工验收

打开交付目录中的 `index.html` 和 `deck.pdf`，至少检查：

1. 封面、第一张内容页、最密页和最后一页；
2. 全屏下能否一眼读出每页主张、主次和阅读顺序；
3. 相邻页面是否机械重复，过渡页是否对应真实章节；
4. 固定图形、组件、图标、数据、引语和来源是否语义正确；
5. PDF 与 HTML 是否同内容、同页序、同主题且没有打印漂移。

失败信号包括：文字靠缩小才放下、大片无意义空白、关系和结构相反、固定图形与内容无关、连续三页像同一张卡、HTML 好而 PDF 坏。

人工发现 standard 问题后，只回到 `deck-spec.json` 修改并重跑完整标准链；不能直接修 HTML 或 PDF。在用户打开成品前，只能说“机器门禁通过，等待人工视觉验收”。
