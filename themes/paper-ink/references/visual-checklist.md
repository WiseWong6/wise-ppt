# 纸墨主题视觉自检

主题或仓库维护时可单独跑以下诊断；正式 deck 以本仓库现有 runtime 检查与 PDF 导出为准：

```bash
python3 themes/paper-ink/scripts/lint.py <deck-dir> --strict
bash runtime/check-deck.sh <deck-dir> --mode normal
bash runtime/check-deck.sh <deck-dir> --mode accent
bash runtime/test-geometry-contract.sh
```

机器检查通过后，由用户在实际浏览器逐页目检。只有用户明确要求视觉代验或截图交付时才生成截图；构建成功不能替代人工视觉验收。

## P0：必须通过

- 页面为 1920×1080，`.stage` 等比适配且无横纵溢出。
- 页面根节点的 `data-page-id`、`data-page-role`、`data-theme`、`data-layout-id`、`data-blueprint-id`、`data-contract-fingerprint`、`data-conclusion-mode`、`data-emphasis-mode` 与 `data-typography-mode` 齐全；蓝图 ID 与 fingerprint 必须与 Render Plan v6 及 blueprint registry 精确一致。这些值必须由 v6 materializer 派生，页面自行填写无效。
- 每个 blueprint slot 必须与 Render Plan v6 的 `slot_assignments[]` 一一对应且同序，并显式携带 `data-slot-id`、`data-renderer-kind`、`data-component-source`、`data-component-id`、`data-theme-adapter-id`、`data-content-ref` 与 `data-asset-ref`；组件与 binding receipt 必须和 routing manifest 及 assignment 精确一致。不存在默认组件、样例 payload 或自由 DOM 补位路径。
- page shell 必须唯一物化 header、title 与动态 folio；`data-conclusion-mode="bottom-statement"` 时还必须恰好有一个 `data-page-furniture="conclusion"`，其文字精确等于 Deck Plan takeaway，`hero-statement` / `none` 时不得渲染页底结论。所有 page furniture 都在内容槽与组件选择之外。
- 纸底、墨色、字体、线宽符合 `design-tokens.md`；无未声明的彩色、渐变、重阴影和大面积深色底。
- 页面没有用 Emoji 代替图标或装饰；通用图标来自本地 `WisePPT.icons` registry 或符合主题线宽的自绘 SVG，不存在 Font Awesome / 图标字体依赖。
- 全 deck 字号只引用共享 `--type-*` 字阶；相同语义层级字号一致，CSS/SVG/Canvas/ECharts 都没有页面级裸字号或 shorthand 绕过。
- 页面呈现通过 [`skill-design.md`](../../../skill-design.md) 第七章的主次、阅读顺序与关系锚点规则，主题没有反转既定层级。
- 事实、数字、表格、图表和重构图通过 [`media-contract.md`](../../../capabilities/references/media-contract.md) 与 Content 引用门禁。
- renderer 与结构区域通过 [`skill-design.md`](../../../skill-design.md) 第八章的容量和溢出回退规则。
- 居中只用于中心型原语；非对称、时间轴、UI、证据墙、架构和流程按自身结构线对齐。
- ECharts、图片和每个必需字体 face 真实加载完成后才调用 `WisePPT.markSlideReady(slide)`；全部页面完成后根节点必须同时是 `data-font-check="pass"` 与 `data-deck-ready="true"`。
- caption 没有被主体压住且全 deck 固定为 `--type-caption`；正文只用 `--type-body` / `--type-body-small`；图表刻度与来源可读。
- 放映正文逐页可框选复制；input 与 contenteditable 分别获得焦点时，方向键、空格、Home/End 和触控滑动不抢占；真实 ESC KeyboardEvent 返回画册。
- 1920×1080 `#deck-stage` 的 bounding rect 始终完整落在 visual viewport；正式 `.slide` / `.stage` 没有 inline transform，也没有第二次缩放。
- 放映控制符合 `design-tokens.md` §6：水平居中于视口底部、控件等高 40px、静止自动隐藏、打印时隐藏。
- 几何门禁 `data-geometry-check="pass"`：新版 deck 根节点声明 `data-geometry-contract-version="1"`，每页恰有一个几何契约；内容组不越过所选内容区，组件不越过矩形/圆形容器，路径不穿字，slot 无未声明重叠；每页至少声明一条边界/冲突关系与一条关系对齐。契约写法与优先级见 [`skill-design.md`](../../../skill-design.md) 第七章。

## P1：主题一致

- 全 deck 只选择一种登记字体模式：默认 `all-sans`，中文标题、正文与 UI 都映射到思源黑体；只有用户明确要求并在 Render Plan 记录字体决策时，才可改用 `mixed` 或 `all-serif`。表格数字、时间、编号与坐标固定 Courier Prime，真实手写批注固定霞鹜文楷。
- 线宽符合 `design-tokens.md` §4；强调线每页最多一条。
- 构造线、引线、节点、hatch 都在表达语义，不是填空装饰。
- `?accent` 开启时一页一色、面积 ≤2.5%；正式 deck 只染 Render Plan 指定主角的语义焦点组（`data-emphasis-ref`、`data-emphasis-roles` 和载体 `data-emphasis-role` 必须精确对应），Gallery 样页按 `design-tokens.md` §2 的轻量机制染色；关闭后回到纯单色。
- 检查是否为了上色新增了原稿不存在的圆圈、图标、标签或装饰；没有语义对应物时应保持单色，不得硬造载体。
- ID、hash、运行状态圆点、栏题、图例、刻度、FIG 与页脚默认保持墨色；空间邻近不能成为跟随上色的理由。
- 主角图表使用 hatch 时，内部斜线须和数值/边框共同响应；同时确认复用 pattern 的其他图形没有被误染。
- Grid 仅用于同级并列或二维关系；证据墙、六宫格和矩阵都能说明“为什么是这些格”。
- `data-blueprint-id` 通过 blueprint registry 与 Gallery 来源门禁，每槽显式组件通过 routing manifest、binding receipt、容量与安全区门禁；本清单只检查这些 v6 合同在 paper-ink 下的视觉落位。

## P2：整套节奏

- 页数与叙事弧来自 deck plan，不强制固定骨架；封面和收尾服务真实场景，不为凑格式存在。
- 复合信息页前后有必要的节奏变化，但不机械规定每若干页必须插入固定页型。
- 大字、金句、粒子、手写批注都克制使用；重复是为了形成节奏，而非暴露模板痕迹。

## 浏览器目检顺序

1. 远观：主张、主角和阅读方向是否一眼可见。
2. 中距：证据、层级、组件组合和留白是否服务主张。
3. 近看：同层级字阶是否跨页一致，线宽、对齐、来源、单位、标注和溢出是否合格。
4. 合同对照：核对页面 `data-blueprint-id`、blueprint fingerprint、逐槽 binding receipt 和 page shell conclusion 是否与 Render Plan v6、blueprint registry、routing manifest 及 Deck Plan 一致。

## 对齐审查五问

1. 我对齐的是哪些对象？
2. 它们为什么应该对齐？
3. 使用的是共同边、底线、偏移、中心、镜像还是路径锚点？
4. 这种对齐是否强化了主次和阅读顺序？
5. 去掉辅助线后，观众还能否看懂它们的关系？

## Legacy design evidence maintenance（非生产）

- 只有维护受保护的 General / AI 旧设计证据时，才按同一 legacy recipe 对照两册结构、内容主题与 Gallery manifest 数量；该对照不得用于正式 deck 的版式或组件选择，也不是生产浏览器验收步骤。
