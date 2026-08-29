# deck-spec@7 唯一输入合同

## 权威

standard 只编辑 `deck-spec.json`。`index.html`、deck plan、来源账本、组件收据、几何合同、build/delivery manifest 和 PDF 都是编译产物，不能反过来成为第二份输入。

先完成材料分页、页型/关系、完整骨架和整副主题选择，再一次性写本合同。不要在 `layout_id`、`relation_key` 或 `theme_preset` 尚未确定时先造一份“完整 spec”供后续返工。

字段允许表和校验实现以打包后的 `bin/wise-ppt.mjs` 为机器权威；本文只解释作者必须知道的输入语义。文档与编译器不一致时停止构建并修合同，不能以“编译器能猜”为准。

## 顶层字段

| 字段 | 要求 |
|---|---|
| `contract` | 必须等于 `wise-ppt-deck@7` |
| `mode` | 可省略；出现时只能是 `standard` |
| `deck` | 必填对象 |
| `layout_context` | 必填对象；选择本 deck 前的当前聊天版式历史 |
| `sources` | 必填数组；没有外部来源时写 `[]` |
| `must` | 必填数组；用户没有点名必保内容时写 `[]` |
| `slides` | 必填非空数组，顺序就是最终页序 |

standard 顶层不接受其他字段。

## layout_context

每份 spec 必须显式写选择本 deck 前的会话状态：

```json
"layout_context": {
  "scope": "session",
  "selection_seed": "6c4a68e91e4d7c2f106a29c502ca74cd",
  "prior_total": 12,
  "usage": [
    {
      "layout_id": "paper-ink.relationship.A1",
      "count": 2,
      "last_sequence": 9
    }
  ]
}
```

- `scope` 只能是 `session`；
- `selection_seed` 是新聊天第一次候选查询用 `--new-session` 生成的 32 位小写十六进制字符串，同一聊天始终复用；
- `prior_total` 是当前聊天此前已分配的总页数，必须是非负整数；
- `usage` 只保留已使用骨架，按完整 `layout_id` 升序排列，ID 不得重复；
- `count`、`last_sequence` 都是正安全整数；所有 `count` 总和必须等于 `prior_total`，最后一次序号不得重复、必须可由账本实现，最大值必须等于 `prior_total`；
- 当前聊天首份 deck 使用新 seed、`prior_total: 0` 与 `usage: []`；后续 deck 原样承接上一份 `deck-plan.json.layout_session` 的 `selection_seed/post_total/post_usage`；
- 只有新聊天才生成新 seed 并清零。不得自动扫描目录、旧文件或其他聊天的收据。

这不是隐藏缓存，编译器也无法从目录或平台猜出聊天边界。会话连续性由主 Agent 显式携带；spec 固定 seed 与历史后，相同输入仍生成相同产物。

## deck

必填：

- `title`：整副标题；
- `thesis`：一句可被反对的中心判断；
- `input_type`：`pdf`、`url`、`multi-doc`、`existing-deck`、`oral`、`short-text` 之一；
- `theme_preset`：Catalog 当前登记的整副主题。

可选：`typography_mode`、`lang`、`signature`。`lang` 省略时为 `zh-CN`；出现时只能是安全的 ASCII language tag，不能含引号、空格或 HTML 属性。`signature` 是页脚与收尾署名槽共用的署名；只原样使用用户明确提供的非空值，省略表示不署名，不得代填作者、品牌或 Agent 名称。`deck.subtitle` 不是登记字段；封面副标题属于所选封面骨架的 `payload.text`。

`pdf/url/multi-doc/existing-deck` 属于 source-backed 输入，必须有来源并逐页登记来源证据。`oral/short-text` 可以没有外部来源；一旦主动登记来源，引用和证据仍必须闭合。

## sources

每项必须且只能包含唯一非空 `source_id` 和非空 `title`。`source_id` 是本 spec 内稳定引用，不使用临时数组下标。`path`、`note`、本地绝对路径和其他未知字段都会失败，防止工作机信息被复制到交付账本。

不要在来源账本里补写无法确认的作者、时间、页码或链接。来源只证明“材料来自哪里”，不会自动证明页面已经保留相关内容；页面还必须提供 `source_evidence`。

## must

每项只允许：`must_id`、`content`、`status`、`page_id`、`reason`、`visible_evidence`、`source_refs`。

共同要求：

- `must_id` 在 deck 内唯一；
- `content` 是用户明确要求保留的内容；
- `source_refs` 始终是数组，且只能引用 `sources`；source-backed must 不得为空。

落页项：

```json
{
  "must_id": "must.core-claim",
  "content": "必须保留的判断",
  "status": "placed",
  "page_id": "p03",
  "visible_evidence": "页面中实际可见的核对词",
  "source_refs": ["src.main"]
}
```

`page_id` 必须存在；目标页的 `must_refs` 必须精确引用一次。关系页的 `visible_evidence` 可以落在可见 claim 或真实 payload；非关系页没有独立 claim 插口，证据必须在真实 payload 中可见。落页项不得填写删除理由。
must 的 `source_refs` 还必须包含在目标页的 `source_refs` 中，不能把来源登记在 must 上却从落点页账本中删掉。

删除项：

```json
{
  "must_id": "must.raw-table",
  "content": "用户点名但最终删除的原表",
  "status": "omitted",
  "reason": "具体、可核对的删除原因",
  "source_refs": ["src.main"]
}
```

删除项必须有非空 `reason`，不得填写 `page_id/visible_evidence`，任何页面也不得引用。机器只能验证已登记 must 是否闭合；材料中的 must 是否全部登记仍需人工对照用户请求。

## slides

每页必填：

- `page_id`：唯一稳定 ID，只能使用小写 ASCII 字母、数字和连字符，且必须以字母开头；
- `page_role`：页面在论证中的职责；
- `layout_id`：查询返回的完整登记 ID；
- `claim`：本页要让观众接受的一句话；
- `payload`：至少含一个真实非空登记值；
- `source_refs`：来源 ID 数组；
- `source_evidence`：`source_id → 非空可见词条数组` 的对象；
- `must_refs`：本页承载的 must ID 数组。

关系页额外必填 `relation_key`；非关系页不得填写。`section_id/section_title` 可选，用于章节导航。`emphasis` 也可选；只有页面确实需要突出一个已审核对象时才填写。`layout_override` 只在最终骨架的权威 `selection_rank > 1` 时填写。

source-backed 页面必须有非空 `source_refs`，且 `source_evidence` 的 key 与引用集合完全一致。关系页词条可以在可见 claim 或真实 payload 中出现；非关系页的 claim 只用于计划和导航元数据，词条必须由真实 payload 可见承载。无来源页面使用 `source_refs: []` 与 `source_evidence: {}`。

## 版式越级说明

构建器先按 `page_kind/page_role/relation_key` 和页面实际 payload 类型形成粗粒度硬候选池，再按“使用次数最少 → 最久未用 → 会话 seed 哈希 → registry 碰撞兜底”排列。容量、binding、主次与阅读顺序仍由作者判断；若选中骨架的权威 `selection_rank > 1`，页面必须声明：

```json
"layout_override": {
  "basis": "reading-order",
  "reason": "较少使用的候选阅读方向与本页讲述顺序相反"
}
```

`basis` 只允许 `capacity`、`binding`、`primary-support`、`reading-order`、`user-continuity`；`reason` 必须非空。`user-continuity` 只用于用户明确要求继续沿用某版式。rank=1 禁止填写；单候选和正常复用由编译器记录，不要求作者补无意义理由。

`deck-plan@5.layout_session` 会记录 `selection_seed`、排序依据、选择前后的 usage，以及每页候选数、首选 ID、选中前计数、权威 rank、决策类型和 override。它按 spec 中的 deck 起始账本逐页推进，可用来为当前聊天的下一份 deck 续账。

## 逐页强调

先查询单个 `layout_id`。只有结果中的 `emphasis.targets` 非空时，该页才可声明：

```json
"emphasis": {
  "target": "focus.primary",
  "reason": "这一步是整页结论，观众需要先看到它"
}
```

`target` 必须原样取查询结果；`reason` 必须说明内容原因，不能写“更好看”。每页最多一个目标。编译器只强调该骨架已审核的对象，不接受选择器、颜色或样式。声明后，最终 `index.html` 和 `deck.pdf` 都呈现强调；normal/accent 只保留给机器做双态核对。

## payload

payload 只允许 `text`、`data`、`icons` 三个分组；不存在的分组省略。每组都是 `slot_id → value` 对象，槽名、允许类型、binding key、字符和数量上限只取 `node <skill>/bin/wise-ppt.mjs layouts` 输出的 `payload_schema`。

- 单字段固定槽可以直接传字符串或数字，此时项目数固定为 1；
- 多字段槽必须同时传 `fields` 和 `items`，key 只能来自公开 `binding_keys`；用每条 `binding_keys[].example` 判断它对应的标签、数值或说明职责，再填写同职责的真实内容，不能把 example 原样当作成品；
- `fields` 必须精确覆盖全部 slot-scope 字段，以及 `item_index < items` 的完整 item 字段；少一项、多一项、跳号或填写范围外字段都会失败；
- 项目分组、可增减边界与 `fixed-slot/dom-explicit` 的唯一解释见 `references/layouts.md`；本文件只规定 JSON 写法；
- icon 只在查询返回的 `icon_slots` 和真实 icon binding 中填写 Catalog 已登记的本地图标名；语义必须符合该槽的 `semantic_purpose`。

任意图片不是 payload。`payload.media`、本地或绝对图片路径、远程图片地址和 data URI 都不接受；材料图片只作理解内容的参考。标准规则允许替换已审核插画，但只能使用查询明确公开的插画槽和资产范围；没有公开槽时，骨架中的插画、画布和装饰图形保持固定。

`payload: {"text": {}}`、只有空字符串/空数组/空对象、未登记槽或未公开 binding key都会失败。required 槽必须有真实值；不能靠 Catalog 样例文案或隐藏文字交付空页面。
公开 `max_chars` 是锁定字体和内部空间下的字符上限；它不允许作者缩小字号、压间距、改 CSS/DOM 或绕过浏览器 fit 门禁。
`text/data/icons` 的控制对象只能且必须含 `fields/items`。`items` 必须是非负整数，填写真实字段时不能写 0。没有内容就省略整个槽或分组。多字段槽不接受位置数组，也不接受省略 `fields` 包装的 binding-key 直传对象。

同一槽的 `text` 与 `data` 共用同一文字 binding surface，二者不能同时填写；否则后写值会覆盖前写值，编译器必须在 spec 校验阶段拒绝。`text + icons` 使用不同 surface；只有骨架同时公开 text 与 icon binding 时才合法。

关系页的独立 claim 插口由 `claim` 唯一填写，不在 payload 重复声明；该插口不再借用或暴露为 takeaway payload 槽。

## 页面四角

- 左上（support 槽）两行：第一行 `deck.title`，第二行该页 `claim`；关系页 `support.text.001/002` 各一行，非关系页单键换行分两行，违反即编译失败。
- 左下（folio）由编译器自动填写 `页码 / 总页数`；仅当 `deck.signature` 存在时追加 `— BY 署名`。D3 收尾页署名大槽取同一值；不署名时留空，不得在 payload 另填一套署名。

## standard 禁区

standard spec 不接受任意图片、页面 CSS/HTML/SVG、手写 geometry/structure、临时组件、页面级主题、未登记 layout、隐藏内容或任何未登记的整页生成方式。代理不得新写 SVG/HTML/CSS 后伪装成图片；不得修改编译产物，也不得读取 seed 私有字段绕过公开接口。

内容不适配时只走 `references/layouts.md` 的固定顺序。文案、已登记插画和图标可按槽替换；组件不自动替换。用户明确授权且 registry 已公开同结构受控容量时仍属 standard；改变结构骨架、组件组合、分栏、阅读顺序或使用未审核能力才停止 standard 并申请 experimental。

## 输出目录收编与重建

1. 在用户启动 Skill 的目录建立一个交付文件夹，`deck-spec.json` 就写在其中，`build --out` 指向同一目录。
2. 首建时目录只允许存在这份制作稿。编译器核对输入后将它规范化，再生成 HTML、账本、manifest、PDF 和资产；存在其他文件就失败关闭，禁止猜测是否可覆盖。
3. 改稿后对同一目录重新 build；`.wise-ppt-output` 与当前 build manifest 必须保留，编译器按新 spec 刷新受管文件。
4. 重建时出现账本外未知文件必须拒绝。不得删除输出标记或 manifest 来强行覆盖普通目录。
