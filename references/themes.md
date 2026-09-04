# Wise PPT 独立主题合同

主题不是配色预设。版式决定页面怎么拆，组件决定区域里画什么，主题决定这些骨架和组件用什么视觉语言呈现。三套权威彼此独立：主题可以调整登记字号、字体、纸面、线条、Icon 组织和组件状态，但不能改变骨架几何、阅读顺序、页面内容或组件类型。

## 固定主题与素材主题

当前固定主题只有三个，彼此平级：

| `theme_id` | 名称 | 识别方向 |
|---|---|---|
| `paper-ink` | 纸墨 | 冷灰纸底、深墨线稿、克制红色焦点 |
| `hermes-orange` | 爱马仕橙 | 米白纸面、纯白前景、暖灰凹层、强黑正文、橙色线稿 |
| `klein-blue` | 克莱因蓝 | 米白纸面、纯白前景、暖灰凹层、强黑正文、蓝色线稿 |

用户未指定且材料没有明确主题证据时，不暂停询问：主题读取 `themes/registry.json.default_theme_id`，字体模式读取所选主题的登记默认值。材料中有多个同等可信的品牌方向时，Agent 先给出推荐及理由，再一次询问。

`source-derived` 不是第四个固定主题，也不是 preset。它是从旧 PDF、PPT/PPTX、图片、Logo 或组合证据生成完整 `wise-ppt-theme@5` 的 provider。

deck 只能声明一个主题权威。固定主题写：

```json
"theme": {
  "kind": "registered",
  "theme_id": "hermes-orange"
}
```

素材主题把同一份完整定义锁进 spec：

```json
"theme": {
  "kind": "inline",
  "definition": {
    "contract": "wise-ppt-theme@5"
  }
}
```

旧 `theme_preset`、`theme_family` 和旧主题 ID 不属于生产合同，也没有 alias。

## 核心色换色

Catalog 仍只展示纸墨、爱马仕橙、克莱因蓝。换色能力不是新增主题包，也不会生成新的 Catalog frame 或缩略图。10 个核心色、广义色名别名和橙蓝注册映射只以 `themes/core-colors.json` 为权威，不在文档另抄一份色表。

```text
node <skill>/bin/wise-ppt.mjs themes recolor --core <core-color-id>
node <skill>/bin/wise-ppt.mjs themes recolor --hex <HEX> [--name <名称>]
```

命令只向 stdout 输出可直接写入 spec 的完整 `deck.theme`，不写当前目录。爱马仕橙和克莱因蓝直接返回既有 registered 对象；其余核心色和明确 HEX 返回白底 inline 定义。RGB 输入先做通道等值的 `#RRGGBB` 转写；明确色值原样保留，不吸附到核心色。未登记的外部颜色名称没有明确色值时必须询问用户，不能猜值。

换色定义使用 `recolor-oklch`。画布和前景为纯白，凹层为 `#E8E5DF`，正文为 `#1A1A1A`；字体、线宽、Icon 和组件规则继承橙蓝视觉语言。原始主色承担大色块和身份锚点。六档数据色在 OKLCH 中保持色相，向 `#F2EFE9` 递减；超出 sRGB 时只降低色度。小字和关键图形分别使用内部安全角色，至少满足 4.5:1 和 3:1；同色深阶仍无法满足时回退正文墨色。19 个公共颜色角色不增加。

## 完整主题对象

一份 `wise-ppt-theme@5` 必须同时定义：

- `source`、不可丢失的 `recognition_anchor`、三个英文 `keywords`；
- 代表视觉、重复母题、情绪、季节、光线、空间、字体对比、线条、Icon 和组件证据；
- 5–8 个唯一 `source_colors`；
- 从来源色到 19 个语义角色的 `fixed`、`derive-oklch` 或 `recolor-oklch` 策略；
- 纸面明暗、材料、纹理、层级、阴影和圆角；
- 封面纸面与关系页主题强调的跨版式页面处理；
- `all-sans`、`all-serif`、`mixed` 三套字体模式；
- 四档线宽、线色、端点、连接方式和最低对比度；
- Icon 权威源、画法、颜色、载体、分组、节奏、能力和未登记处理；纸墨使用 `redraw-v3`，爱马仕橙和克莱因蓝使用 `tabler-original-v3.46.0`；
- 表头、数据行、选中行、卡片和面板状态；
- 空心编号、反白、未登记 Icon 和未声明组件状态例外。

19 个公共颜色角色保持唯一：`surface-canvas`、`surface-recessed`、`surface-panel`、`primary`、`functional`、`body`、`chart-label`、`metadata`、`divider`、`construction`、`focus`、`focus-secondary`、`focus-peripheral` 与 `data-1..6`。组件不另造自己的颜色接口。

`fixed` 主题显式填写 19 个角色；`derive-oklch` 主题只提供来源色、身份色索引与明暗模式；`recolor-oklch` 只提供明确身份锚点。compiler 确定性生成角色色、有序数据阶和调整记录。OKLCH 的感知颜色空间依据 [CSS Color 4](https://www.w3.org/TR/css-color-4/)；正文、小字及小号强调文字至少达到 4.5:1，大字与承担信息的关键图形至少达到 3:1，门槛依据 [WCAG 2.2](https://www.w3.org/TR/WCAG22/)。来源色、候选种子与角色色分层参考 [Material Color Utilities](https://github.com/material-foundation/material-color-utilities/blob/main/concepts/dynamic_color_scheme.md)，实现不增加第三方依赖。

## 素材取证顺序

1. 在旧 PDF/PPT 中找代表页、主视觉、嵌入图片、Logo、重复图形、表格和卡片；图片或 Logo 输入直接以其可见结构为证据。不要对整页截图做平均取色。
2. 记录识别锚点、字体对比、线条粗细、Icon 组织、组件层级、情绪、季节、光线和空间，再选 5–8 个来源色。
3. 只有 Logo 时，只登记可证实的品牌锚点、基础色彩、字体和图形语言；不得虚构纸面纹理、表格状态或复杂组件体系。
4. 输出完整 `wise-ppt-theme@5`，交给机器收敛 OKLCH、对比度、字体可用性和组件能力。
5. 不调用图片生成服务，不复制原图，不把本机路径或临时分析图写入主题、deck 或成品。

`source.kind` 只描述实际证据类型：`pdf`、`ppt`、`image`、`logo`、`mixed`、`manual`；固定主题使用 `registered`。`source.label` 写人能理解的来源说明，不写本机路径。

## 字体位置合同

字体不是靠浏览器扫描字面猜标题。Compiler 根据骨架登记位置投影 `data-theme-type-role`：

- 左上角题签：`top-left-kicker`
- 左下角页码：`bottom-left-folio`
- 底部结论文案：`bottom-takeaway`
- 中文内容标题：`zh-content-title`
- 封面主标题：`cover-title`
- 章节标题：`chapter-title`
- 收尾中心主句：`closing-statement`
- 英文内容标题：`en-content-title`
- 英文加粗：`en-bold`
- 正文、标签、数字、图表文字：`body`、`label`、`number`、`chart-text`

爱马仕橙和克莱因蓝的 `mixed` 固定为：左上题签与左下页码用 Oswald Bold，中文回退思源黑体；底部结论用思源宋体 Bold 700；普通中文内容标题用思源黑体 Bold；英文标题和英文加粗用 Oswald Bold；正文用思源黑体。封面主标题使用 `cover-title`，橙蓝 `mixed` 为思源宋体 Bold，`all-sans` 仍为思源黑体，`all-serif` 仍为思源宋体；英文封面标题仍归入 `en-content-title`。橙蓝的 `mixed` 与 `all-serif` 底部结论均固定为思源宋体 700。D5 章节主标题使用 `chapter-title`，D3 中心主句使用 `closing-statement`，两者在橙蓝 `mixed` 下均为思源宋体 Bold。

纸墨的 `mixed` 保持内容标题宋体、底部结论黑体 300；`all-serif` 的底部结论固定为思源宋体 700。字号比例可以由主题角色在 0.85–1.15 内登记调整，但不得改变骨架几何，并必须通过 overflow 与 fit 门禁。

默认字体档按主题独立登记：纸墨为 `all-sans`，爱马仕橙和克莱因蓝为 `mixed`。不得把某个主题的默认值提升为三主题共用默认值。

## 页面角色合同

`page_treatments` 不登记具体 D1、D7 或未来 D11，而只登记语义页面：`cover.canvas` 从三种纸面角色中选择，`relationship.accent` 从已登记强调角色中选择。Compiler 按 `data-page-role="cover"` 和 `data-page-kind="relationship"` 投影，因此新封面骨架注册后会自动继承同一规则。

当前爱马仕橙与克莱因蓝的封面都使用 `surface-canvas`，即 `#F2EFE9` 米色；关系页使用各自的 `functional`，即橙 `#D95E00`、蓝 `#002FA7`。其余核心色及自定义色使用纯白画布，关系页使用满足关键图形对比度的同色深阶。纸墨继续使用自己的冷灰纸面与墨色关系线；素材主题示例把关系页强调指向来源身份色 `focus`。页面处理只改语义 token，不改内容、字号、坐标、阅读顺序或骨架几何。

## 组件能力边界

- 线条只读取 `hairline/detail/main/emphasis` 四档。未声明阶梯的线条不自动变粗。
- 登记 Icon 才能读取主题线宽与颜色；改变载体、分组或排列节奏，还必须由组件声明相应能力。
- 未登记 Icon 保持原状并在审计中提示，禁止自动包圆、加底或重排。
- 表头、数据行、选中行、卡片和面板必须声明语义区域；未登记区域不得自动套背景。
- 空心编号和反白按主题的显式例外处理。
- SVG、Canvas、ECharts 读取同一份 resolved theme；切换预览时随 iframe 一起重建。

未经验证的表格背景、Icon 载体或组件特例不能因为出现在某个试验稿里就升级成全局规则。

## 逐版式语义绑定

默认主题身份、内容强调及 AI 的选择顺序统一见 [默认主题身份与内容强调](color-semantics.md)。本节只说明主题系统如何落实这些语义。

材料层、默认主题身份和内容强调都不是主题包里的 layout ID 页面 CSS。`themes/engine/contracts/layout-theme-bindings.json` 的 @3 是全部 88 个骨架的唯一逐页机器合同：它统一登记 canvas、surface、data、type、固定家具、正文身份、强调和来源，并锁定稳定 selector 与预期命中数量。`visual-treatment-grammar.json` 只规定动作，颜色由主题 token 解析。纸墨把已登记身份动作解析为中性墨阶；爱马仕橙与克莱因蓝用 functional 色做少量点缀。有效 Catalog 定稿没有持久正文身份的页面允许 0 组，但必须显式写 `provenance.identity_mode: neutral-only`；这不是漏迁，运行时也不得自动补色。`.doc`、`.folio`、`.caption` 只属于固定家具，不得冒充正文身份。

内容强调随 @3 逐页登记，`page-emphasis-contracts.json` v5 只是它的确定性投影，不是第二套作者权威；`visual-treatment-grammar.json` @4 统一定义 identity/focus 动作。页面默认不强调；AI 只能按 claim/evidence 从查询结果选择一个 `target_id`，不能填写 selector、颜色或 treatment。一个骨架可以有多个候选，但同时最多激活一个；其成员和动作固定。默认身份与强调可命中同一语义对象，但 treatment 必须不同，也不得新增第四种颜色；只用主墨色和字重建立重心也是合法 treatment。`focus.shadow-only` 只投影硬影、不重涂面板材料。compiler 在 ID 隔离后精确投影并复核结构哈希；少命中、多命中、重复命中、命中固定家具或结构漂移都会终止 build。

Catalog recipe、legacy default/emphasis 和 custom master 只是一轮迁移的冻结输入。迁移完成后，standard 不再同时读取它们来猜视觉结果；迁移边界与哈希见 `themes/engine/migrations/catalog-standard-parity-v1.receipt.json`，其 `recipe_status` 只照录，不代表 Catalog review 状态升级。

材料重分类仍单独受 surface binding 约束：纸墨保留自己的层级，橙蓝纸面为 `#F2EFE9`，凹层分别为橙 `#E8E5DF`、蓝 `#E4DFD5`。D3 的唯一中心主句精确绑定为 `closing-statement`；D7、G2、R3 不做材料重分类。D11 的文案删除属于版式内容合同，不能塞进主题；它作为 `cover` 自动继承封面纸面和标题角色。

## 解析、预览与锁定

先解析主题：

```text
node <skill>/bin/wise-ppt.mjs themes resolve <theme.json 绝对路径>
```

它只读校验并输出确定性 resolved JSON、调整记录和对比度结果。

再对已有 deck 生成隔离预览：

```text
node <skill>/bin/wise-ppt.mjs themes preview <deck 绝对目录> --theme <theme.json 绝对路径> --out <预览绝对目录>
```

预览提供“当前主题、纸墨、爱马仕橙、克莱因蓝、素材主题”五个按钮。每次切换销毁并重建 iframe；目标纸面遮罩覆盖加载过程，等待字体和连续两帧稳定后才显示，避免闪回纸墨或保留旧图表状态。

审计分别报告颜色与对比度、字体角色和字号、线宽、登记/未登记 Icon、空心编号与反白、表格/卡片/面板、SVG/Canvas/ECharts、overflow/锁定几何、硬编码颜色和未声明组件状态。预览只产 HTML，不修改原 deck，也不生成 PDF。

用户选定后，把预览使用的同一份完整主题定义写入 `deck.theme.definition`。正式 deck 只编译一个主题，HTML 不保留切换按钮。

固定主题 JSON 是权威；`assets/theme.css`、`theme-resolved.json`、registry 数据和 manifest 都由生成器投影，不能手改第二份权威。
