# 纸墨线稿 · 设计标准

本文件只定义 `paper-ink` 的视觉语法。叙事、分页、关系与空间原语由 Core 决定；主题不拥有布局目录或内容承载量判断。

## 1. 颜色与纸面

### 默认模式

| 角色 | Token | 值 | 用途 |
|---|---|---|---|
| 纸底 | `--paper` | `#DFE0D9` | 冷调灰白纸底 |
| 纸底深档 | `--paper-deep` | `#D4D5CD` | 次要面板或凹陷区 |
| 纸面板 | `--paper-panel` | `rgba(255,255,255,.22)` | 需要轻微抬起的卡片或面板 |
| 墨 | `--ink` | `#191917` | 主文字、主轮廓和图形本体 |
| 墨 80% | `--ink-80` | `rgba(25,25,23,.8)` | 强轮廓、图标、二维码等功能图形 |
| 墨 70% | `--ink-70` | `rgba(25,25,23,.7)` | 正文和次级文字 |
| 墨 55% | `--ink-55` | `rgba(25,25,23,.55)` | 图表标签和次要注释 |
| 墨 45% | `--ink-45` | `rgba(25,25,23,.45)` | 图题、角注和元信息 |
| 墨 25% | `--ink-25` | `rgba(25,25,23,.25)` | 分隔线和弱边框 |
| 墨 12% | `--ink-12` | `rgba(25,25,23,.12)` | 构造线和背景格线 |
| 数据阶梯 | `--data-ramp-1..6` | 由主题定义 | 地图、热力与有序数据分级；不得跳阶造色 |

颜色按语义选择，不按组件临时调色：

1. **表面**：画布用 `--paper`；凹陷、无数据、未激活区域用 `--paper-deep`；抬起的卡片才用 `--paper-panel`。
2. **信息层级**：主信息用 `--ink`；功能图形用 `--ink-80`；正文用 `--ink-70`；图表标签用 `--ink-55`；元信息用 `--ink-45`；分隔线用 `--ink-25`；构造线用 `--ink-12`。
3. **语义焦点**：只有 §2 声明的单一焦点可用 `--accent-red*`；颜色不得只为了“更好看”而增加。

机器可读的二值功能图形统一使用 `functional`（`--ink-80`）叠在纸色表面上，不得使用纯黑配纯白；有序区域数据统一使用 `surface-recessed` 表示无数据/底图，并从 `data-1..6` 连续取色，不能把最低档调到接近纸底而失去区域轮廓。

上述 token 是完整白名单。页面 CSS 与 SVG 属性只能引用 token；正式 deck 的 Canvas / ECharts 只能按语义角色取色，例如 `WisePPT.color('chart-label')`、`WisePPT.color('functional')`、`WisePPT.color('data-4')`，不得直接挑透明度。独立样张通过 `getComputedStyle` 读取。禁止新增 HEX、RGB、HSL、命名色或自定透明度。`none`、`transparent` 只表示没有颜料，不属于新增颜色。

语义角色固定为：表面 `surface-canvas` / `surface-recessed` / `surface-panel`；信息 `primary` / `functional` / `body` / `chart-label` / `metadata` / `divider` / `construction`；焦点 `focus` / `focus-secondary` / `focus-peripheral`；有序数据 `data-1..6`。DOM 可用 `data-color-role` 与 `data-color-target` 声明关键元素，运行时会核对实际颜色与角色是否一致。

两册 Gallery frame 与 story 示例是只读设计证据，保留历史字面量；该豁免只绑定仓库原路径。复制、实例化或新建页面时必须改用本白名单，不能把旧代码当成新颜色来源。

非法值按语义回退：纯黑改 `--ink`，功能图形改 `--ink-80`；纯白改 `--paper`，需要层次时在 `--paper-deep` 与 `--paper-panel` 中选择；任意灰色改到对应墨色阶；任意彩色默认改 `--ink`，只有已声明的语义焦点可改 `--accent-red`。不得为单个组件新增颜色。

默认模式只使用纸底与墨色阶梯；禁止纯白大面、彩色色块和整页深色底。禁止平滑渐变；两个色标同位置的硬切双色允许，仅用于半填状态语义。`box-shadow` 只允许下面两个 token，同一父元素内 `box-shadow` 最多出现 1 次，不得使用彩色阴影：

- `--shadow-soft: 0 0 4px color-mix(in srgb, var(--ink) 2%, transparent)`：卡片或面板；零偏移、模糊不超过 6px。
- `--shadow-specimen: 2px 2px 0 color-mix(in srgb, var(--ink) 4%, transparent)`：仅用于标本卡或贴纸。

### 纸面质感

- `.stage::before` 使用低透明度纸纹噪点；不能盖住文字或证据。
- `.stage::after` 绘制距两侧 64px 的档案格线；内容元素不得与该格线相交。
- 手工质地建议每页控制在 2–3 种以内；可选质地为：木刻粗线、压印细线、局部 dust、字符成图、保留构造线、hatch、手绘描边。
- 装饰性档案标记（微型 mono 装饰字、十字准星、刻度、角落符号）每页合计 ≤2 处，可以漂浮，但必须明显不承载信息；不得伪装成来源、状态、编号、结论或操作提示，也不得与任何无所属关系的元素重叠。结构性编号承担内容角色，不计入。
- 有信息含义的档案注记（文档编号、法规/系统副标题、运行 ID、日期版本等）只允许五类落位：左上 `.doc.tl`；左下 `.folio`；底部图例行；无 `.caption` 页的底部锚定家具 `.meta`；卡片内部。右上角与画布其他居中位置不得承载有含义的注记；纯装饰按上一条处理。
- 排除 `.doc.tl` 与底部 `.caption`/家具后，主要内容先合成一个包围盒，再选择唯一内容区：`core-content`（150,170–1800,880）、`full-frame-ui`（100,140–1820,920）、`functional-edge`（64,120–1856,960）或 `breath-page`（120,150–1800,900）。内容区是硬边界；是否视觉居中是最后的配平，不得覆盖已声明的顶部、底部、侧边或连接关系。

## 2. 强调模式

`?accent` 是唯一主题变体。强调色只有番茄红；具体值只在 `assets/design-tokens.css` 的 `--accent-red` 及其透明度 token 中定义。任何页面（含 Gallery 样页）都禁止番茄红字面量。

Gallery 独立样页走轻量机制，是合法路径：样页在脚本首行解析 `location.search` 自加 `.accent` 类；染色用 `:root.accent` CSS 规则或 `getComputedStyle` 读取 `--accent-red`；角色组用 `data-accent-group` 标记（现有角色词：`source-identity`、`positive-outcome`、`narrative-focus`）。样页不强制 `data-emphasis-*` 声明。

以下声明体系只约束正式 deck。正式 deck 的统一运行时在页面脚本执行前给文档根节点添加 `.accent`；正式页面不得自行解析 URL，也不得依赖 Gallery 独立样页的 `stageFit()` 激活模式。Render Plan 是强调语义的唯一权威源：

- `emphasis.mode=none`：普通与 accent 模式都保持单色。
- `emphasis.mode=semantic-focus`：`content_ref` 指向本页已渲染内容；`member_roles` 只允许 `value`、`label`、`outline`、`status`、`symbol`、`texture`、`annotation`。

正式 deck 的 HTML 页根用 `data-emphasis-mode`、`data-emphasis-ref`、`data-emphasis-roles` 声明派生状态，载体用 `data-content-ref` 和 `data-emphasis-role` 标记成员。只有同时属于指定 `content_ref` 与 `member_roles` 的现有载体可以响应 `.accent`；ECharts 等绘制代码通过 `WisePPT.emphasisColor()` 读取相同语义，不自行判断 URL。

取色路径：DOM 使用共享 CSS token；正式 deck 的 Canvas / ECharts 使用 `WisePPT.emphasisColor()`；Gallery 样页使用 `getComputedStyle` 读取 `--accent-red`。这样关闭 accent 时不会残留彩色。

硬规则：

1. 一页最多一个语义焦点组，整份 deck 只使用番茄红这一种高饱和色。
2. 高饱和色优先用于线、字、边、小图元和 hatch；禁止大面积彩色填充。
3. 高饱和色面积不超过页面的 2.5%。
4. 不得为了上色新增圆圈、图标、标签或装饰；没有真实载体就保持单色。
5. 图例、刻度、轴标签、页脚、FIG 编号、来源角注、运行 ID 和 hash 永不响应强调色。
6. 单位和副标签默认保持墨色；只有明确列入 `member_roles` 才能以降低透明度响应。
7. ECharts 的数据焦点由 renderer `encode` 指向同一个 `content_ref`；主题 adapter 不得按 DOM 邻近、数组位置或颜色猜测焦点。

强调色阶：主值使用 `--accent-red`，必要的标签使用 `--accent-red-85`，外围注记使用 `--accent-red-65`。

地理分级填色页（choropleth）例外：地图面与配套图例允许同染番茄红色阶，面积按图面本体计、不受 2.5% 限制；图例必须与地图同一 ramp，其余元素仍守全部硬规则。

## 3. 字体与字阶

| 职责 | 字体 | Token | 声明字重 |
|---|---|---|---|
| 封面主标题、章节大字 | Source Han Serif CN | `--serif` | 400 |
| 正文、说明、标签、UI、页内标题 | Source Han Sans CN | `--sans` | 300 |
| 数据、编号、字段码、页脚 | Courier Prime | `--mono` | 400 |
| 手写批注 | LXGW WenKai | `--brush` | 400 |

注册字面（Han Serif Medium 500 / Han Sans Light 300）的唯一出处是 `assets/design-tokens.css` 的 `@font-face`；本表的"声明字重"是元素上写的值，浏览器按最近匹配落到注册字面。caption 与其他说明文字一致使用 sans 300。

大字使用衬线气质，正文和 UI 使用无衬线，数据与档案字段使用 mono。mono 字体不得承载 ≥8 个连续汉字（`.doc.tl` 两行档案头除外）。手写体每份 deck 最多三处，只允许两类载体：手写批注、手写体对话。CSS / SVG / JS 一律通过 `var(--serif)` / `var(--sans)` / `var(--mono)` / `var(--brush)` 引用字体；源码出现四个 family 字面量即违规。唯一例外是 canvas 语境（`ctx.font`、`document.fonts.load`、ECharts canvas 的 `fontFamily`）不解析 CSS 变量，允许 family 字面量。

`data-typography-mode` 有且只有 `mixed`、`all-sans`、`all-serif` 三种值。paper-ink 默认必须是 `all-sans`：中文标题与正文统一映射到思源黑体；只有用户明确要求并在 Render Plan 记录字体决策时，才可改用 `mixed` 或 `all-serif`。Deck 根节点声明默认模式；页面只有在 Render Plan 存在 `typography_decision` 时才稀疏覆写。三种模式只重映射 serif / sans 两个角色，mono / brush 始终固定，禁止被全局模式替换。

图标与符号遵循全局 Emoji 禁用规则。唯一通用图标源是本地 `WisePPT.icons` registry，通过 `WisePPT.createIcon()` 生成自包含 SVG；不得依赖 Font Awesome、图标字体、外链 kit 或 Emoji。自绘 SVG 也须复用本文件的线宽与色彩 token。

字号是全局类型系统，不是页面调参。相同语义层级在所有页面、Gallery 样张、SVG、Canvas 和 ECharts 中必须引用同一个 token；禁止裸写 `font-size: 33px`、`font: 22px ...`、`fontSize: 12` 或 `ctx.font='18px ...'`。CSS / SVG / Gallery 样页直接使用 `var(--type-*)`，正式 deck 的 Canvas / ECharts 使用 `WisePPT.typeSize(role)`。

| 层级 Token | 固定字号 | 用途 |
|---|---|---:|
| `--type-display-mark` | 300px | 空心章节编号等文字图形；禁止承载正文 |
| `--type-particle-sample` | 240px | 离屏粒子文字采样；禁止直接显示为正文 |
| `--type-display` | 96px | 封面主标题、唯一超大命题 |
| `--type-hero` | 76px | 金句、大数据主值 |
| `--type-title` | 60px | 页面主标题 |
| `--type-metric` | 52px | KPI 与数据主值 |
| `--type-heading` | 40px | 二级标题、提问 |
| `--type-emphasis` | 36px | 局部强调句、短结论 |
| `--type-caption` | 33px | 页底 takeaway；全 deck 固定，≤52 字 |
| `--type-subheading` | 26px | 卡题、栏题、封面副标题 |
| `--type-body` | 22px | 正文、条目、说明、气泡 |
| `--type-body-small` | 18px | 次级说明、图内注释 |
| `--type-label` | 15px | 图题、短标签、字段名 |
| `--type-meta` | 13px | 档案码、来源、坐标、folio |
| `--type-micro-secondary` | 16px | 图内 mono 编码标签（轴标签、节点码、字段名、预览内标签），letter-spacing ≥1.5 |

caption 七属性固定：`bottom:118px`、`left:0;right:0` 水平居中、`--sans`、`--type-caption`、字重 300、`letter-spacing:.04em`、`color:--ink`；只由 `assets/slide-components.css` 定义，页面不得重复声明。页面级主标签（卡题、栏题、节点中文名）必须使用 ≥ `--type-body-small`。

FIG 档案头为可选固定格式：mono、`--type-label`、`--ink-45`、`letter-spacing:2.2`、基线 y=176，下接 0.7px `--ink-45` 横线自 (200,194) 至 (560,194)；六个参数逐值固定。

正文只有 `body` 与 `body-small` 两级；不得把 `micro-secondary`、`label` 或 `meta` 当作正文 token，也不得新增或覆盖字号。容量和溢出处理只按 [`page-expression.md`](../../../core/references/page-expression.md) 执行。

## 4. 线条与图形

| 线型 | 宽度 | 用途 |
|---|---:|---|
| DOM UI 边框 | 1px | DOM 卡片、面板、表格、chip |
| SVG 卡框与主轮廓 | 1.2–1.4px | SVG 双线卡外框、主图形轮廓 |
| 内框线 | 0.6px | 双线卡片内圈 |
| 主分隔线 | 0.8–1px | 栏间或区块分隔 |
| 卡内弱分隔 | 0.5–0.6px | 卡内行间分隔，opacity ≤.35 |
| 构造线 | 0.5–0.7px | 基准、象限轴 |
| 引线 | 0.7px | dash `3 5`、opacity .45、末端 r2.2–2.4 实心墨点 |
| 次级图元线 | 1.0–1.1px | 小图元内部结构、次级连接线 |
| 符号笔画 | 1.5–1.6px | 图标/符号内部笔画，每图元最多一处 |
| 强调线 | 1.8–2.6px | 每页最多一条独立长线 |
| hatch | 0.7px，间距 5–9px | 实体、投影或选中 |

强调线 = 承载本页视觉权重的独立长线（主干、轨迹、主分隔），每页 ≤1 条；符号内部笔画（✓/✗/指针/齿轮齿）不计入强调线，笔画 >2.2px 的符号每页 ≤2 个。

常用制式（参数逐值固定）：

- 双线容器：外框 1.2–1.4px `--ink-80` + 内框 0.6px、四边内缩 4–7px、opacity ≤.35。
- 节点：外圈 1.2px `--ink-80`、纸底填充、r∈[9,24]，实心核 r≤3.5；压在线上的节点必须纸色镂空，禁止透明填充压线。
- 开放箭头：标准型的主线与两翼同宽同透明度，宽 0.7–1.4px、翼长 8–12px。仅当箭杆是本页唯一强调线时可用“主干强调型”：主线 1.8–2.2px，两翼 1.2–1.4px 且墨色不强于主线。
- 构造虚线：0.5–0.7px、opacity ≤.35、dasharray 限 `2 4` / `2 5` / `2 6` / `3 5` / `3 6`。
- 刻度齿：0.5–0.6px、opacity ≤.5、长短两档（长度比 1.5–2）；齿与节点中心距 <12px 时省略该齿。
- 栏头三段式：mono EN（`--type-meta`、letter-spacing 2–3、`--ink-45`）→ 短横（100px、0.6–0.8px）→ 中文栏题（`--type-subheading`），三段左缘共线（容差 ≤1px）。
- mono EN 标签一律大写，letter-spacing ∈ [1.5,3]，墨色不超过 45% 档。
- 回环弧必须挂 ≥`--type-meta` 的 mono 标签说明循环语义；无标签回环弧视为装饰，禁止。
- 页内唯一 KPI 主值用 `--type-display` 或 `--type-hero`；同页不得出现第二个 display / hero。
- `.doc.tl` 固定两行：上行「领域 · 场景 — 页码」，下行页题。

承担内容关系的图形必须编码语义：实虚表示确定性，线宽表示权重，断口表示缺失，hatch 表示实体或选中。箭头使用开放细线箭头。纯装饰可以存在，但须遵守 Core 的不重叠与不伪装规则。

粒子只在密度、秩序或消散本身承担语义时使用。`cluster` 表示聚合，`arc` / `brokenArc` 表示连接或断裂，`textPoints` 表示字符成形，`dust` 只作局部氛围且避开文字。

## 5. 画布、承载与对齐

- 坐标系固定为 1920×1080，`.stage` 必须裁切并等比适配。
- 内容区选择与边界只遵守 §1 的四区定义；每页只选一个，不再维护第二套单一安全区坐标。
页面主次只来自 [`deck-planning.md`](../../../core/references/deck-planning.md)，承载能力与溢出回退只来自 [`page-expression.md`](../../../core/references/page-expression.md)。本文件只提供画布、安全区、对齐和视觉 token，不重新定义这两类规则。

关系对齐、重叠判定与冲突顺序只遵守 [`layout-primitives.md`](../../../core/references/layout-primitives.md) §6–7。本主题只补充以下纸墨参数：

1. 包含：文字包围盒必须完整落在其载体内。圆载体按文字行所在 y 处的弦宽判定，左右各留 ≥8px；矩形载体四向内边距 ≥8px。不得以缩小字号满足包含（容量规则见 page-expression.md）。
2. 不压线：文字包围盒不得与任何非所属线条或描边相交；引线、垂挂线必须在文字包围盒外 ≥4px 处终止、绕过或在文字带处断开。
3. 不重叠：无所属关系的元素包围盒不得相交。合法重叠不按案例列白名单，必须通过 Core 的 `ownerOverlap` 声明“谁属于谁”及其关系；背景字、编号牌、双线框、镂空节点等都用同一规则。
4. 不穿越：分隔线、面板边、栏界是硬边界——元素包围盒可贴（间隙 ≤2px）不可穿越（两侧各 >2px）。构造线上的图形节点（站点骑轨、引导线穿圆）豁免。

无明确关系目标的整体位移落在 4px 网格；有关系目标时使用精确坐标差。

垂直配平只用于没有已声明顶、底、侧边或连接锚点的单一内容组，并且只能整体 `translate(0, Δ)`。`scripts/recenter_gallery.py audit` 只提供诊断参考，不是硬门禁；关系锚点始终优先，禁止逐元素手调。

盒模型间距优先使用 `--space-*` token，并保持 4px 基线。形态尺寸、节点半径、刻度齿和安全区坐标不属于盒模型间距。

整套节奏由叙事与实际内容关系决定。连续复合页只有在内容确实需要时保留；不得机械规定每隔固定页数插入呼吸页。

## 6. 运行与输出

- 唯一入口为根级 `index.html`，所有 `.slide` 同处一个 DOM。
- `data-runtime` 只有 `wise-ppt-deck`、`wise-ppt-gallery`、`wise-ppt-specimen` 三种值。`runtime/stage-fit.js` 是唯一缩放实现：Deck 只缩放 `#deck-stage`，Gallery 只缩放 `#stagebox`，独立 Specimen 才缩放 `.stage`；Specimen 脚本嵌入 Deck 时 `stageFit()` 必须 no-op。
- Deck runtime 负责画册、深链、键盘、触控、accent、print 和 readiness；主题不得复制运行逻辑。
- 画册从真实 slide 克隆，不维护 iframe、thumb、逐页 PNG 或第二份页面数组。
- `.folio` 在单页放映和打印模式显示，在实时画册隐藏；格式固定为 `{页码} / {总数} — BY {署名}`，页码与页面 code 一致，署名全册统一。
- 放映模式的真实 slide 正文必须可框选、可复制；画册克隆和放映控制铬件保持不可选。存在文本选区或 input/contenteditable 焦点时，键盘与触控翻页必须让出交互；ESC 必须走真实 `KeyboardEvent` 路径。
- 放映控制水平居中于视口底部（`left:50%` + `translateX(-50%)`），全部控件等高 40px（`box-sizing: border-box`），落在 visual viewport 安全区内；deck 模式静止 1.5s 自动淡出，任意输入（mousemove / touchstart / keydown）即恢复；打印时完全隐藏。控件使用纸墨浅色细线和本地语义 SVG。
- 字体 readiness 必须对每个必需 face 调用 `document.fonts.load(family + weight)` 并核验实际 `FontFace.status=loaded`，缺字库即失败，不得用 fallback 冒充完成。
- ECharts 版本、runtime 与本地依赖由 `capabilities/registry.json` 统一登记；主题只通过 `paper-ink.echarts` 提供颜色、字体、线型和状态外观。
- 脚本、字体、图标和媒体来源遵守公共 Capabilities 与运行时合同；主题不得登记另一套来源，也不得从输入资料复制未知依赖。
