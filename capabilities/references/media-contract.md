# 媒体契约

本文件是图片与其他媒体处理的唯一规则源。

## 素材必须重构

用户提供的图片、参考图和现有页面截图只能用于提取事实、结构、构图和风格方向，不得直接插入最终设计。先把需要保留的信息重构成新的本地媒体，再进入页面。

素材本身是证据时（内容项声明 `epistemic_role: evidence` 即视为证据素材），也不能把原图当作装饰性画面。把可核验的信息重构为结构化证据，保留来源和状态，并避免制造原素材中不存在的事实。

每个 reconstruct 成品必须声明 `fact_change_risk: none | possible`。只要选择 `possible`，Deck Plan 就必须登记 `reconstruction_fact_risk`、用通俗问题说明风险并等待用户决定；用户决定前停止 Render Plan、HTML 和 PDF。不得用原图兜底继续出成品。

只有承载 `epistemic_role: evidence` 内容的重构图必须登记并显示“重构示意”。普通说明性重构图可以披露，但不强制占用页面文字。

## 图片能力

需要生成或编辑图片时，只使用 Codex 宿主内置的 `image_gen.imagegen`。对应字段固定为：

- `renderer_kind: image`
- `component_source: codex-host`
- 稳定且可追溯的 `component_id`

内置图片能力不可用或失败时，停止并说明阻塞原因。不得自动回退到 Ark、Doubao、Gemini、本地模型、第三方 Skill、CLI 或 API。

## 落盘与引用

最终页面只引用已经落盘到 deck 资产目录的本地媒体。记录素材来源、重构目标和最终文件之间的对应关系，避免远程链接漂移或未说明的临时文件。

图片 renderer 的 `output_asset_ref` 必须出现在其 `content_refs` 对应内容项的 `asset_refs` 中；reconstruct 的来源必须同时由成品 `derived_from[]` 追溯。仅仅登记一张无关的重构图，不能把它用在任意内容上。

图片门禁覆盖所有实际入口，不只检查 `<img>`：还包括 `picture/source srcset`、SVG `image href/xlink:href`、行内 style、style block、video poster，以及 deck 本地 CSS 的 `url()` 和递归 `@import`。任何入口命中原素材路径或 SHA-256 都失败；内容图片不是登记过的重构成品也失败。

重构后的媒体仍需满足内容保真、可读性、版权和来源要求。不能为了视觉统一而改写关键数字、引语、身份、时间或因果关系。
