# Wise PPT Theme Contract v1

`themes/visual-contract.json` 是机器权威合同；本文解释所有权与兼容边界。主题只替换视觉规范，不改变内容、版式槽位、组件稳定 ID 或 Render Plan v2 的 renderer 字段。

## 所有权

| 层 | 拥有 | 不拥有 |
| --- | --- | --- |
| Layout | 1920×1080 slot 几何、阅读顺序、容量、允许 renderer/source | 颜色、字体、组件内部结构 |
| Component | 稳定 ID、结构、数据合同、renderer/source | 页面 slot 几何、主题真实色值 |
| Theme | 公共语义颜色/字体、私有兼容 token、字体资产、静态 adapter | 内容、版式结构、组件选择 |
| Gallery | 可视预览、主题选择入口、组件/版式对照 | 主题值的第二份定义、生产期隐式选择 |
| Runtime | 加载构建器已选择并打包的主题 CSS/adapter，执行 Render Plan | 猜测主题、改写版式或组件 ID |
| Exporter | 按精确组件 ID 与显式 adapter implementation 导出代码包 | 猜测脚本、样式或 target |

人工浏览画册的唯一入口是 `gallery/taxonomy/index.html`；`gallery/components/` 已退位为统一画册嵌入的内部 iframe 渲染宿主，Atlas、Native 与 ECharts 预览共用同一个 deck 级 Theme 选择；旧 `gallery/echarts/` 不再是独立来源。画册中的 ECharts preview 模块只负责预览几何与画册本地动效预览，颜色、字体、线型等静态视觉必须调用本目录登记的正式 Theme adapter；该预览行为不构成 Theme 或 Runtime 的 Motion Contract。

## 公共接口

视觉合同固定 19 个 `--wp-color-*` 与 4 个 `--wp-font-*`；完整名称以 `themes/visual-contract.json` 为准。每个启用主题必须逐项实现，缺项失败关闭。`--wp-compat-*` 是主题私有兼容值，用于保持已标准化 Native/Atlas 的历史视觉，不是组件可随意扩展的公共语义角色。

每个 adapter 必须声明：

```json
{
  "implementation": {
    "scripts": ["themes/<theme>/adapters/<kind>.js"],
    "styles": ["themes/<theme>/assets/design-tokens.css"],
    "targets": ["atlas-package | native-component | echarts-option"]
  }
}
```

组件 adapter ID 固定为 `<theme>.atlas`、`<theme>.native-components`、`<theme>.echarts`。模块必须注册到 `globalThis.WisePPTThemeAdapters[adapter_id]`，模块导出的 `target` 必须与 manifest 完全一致。Paper Ink 的 typography/table/image/native-html/svg/canvas 旧 ID 继续有效。

## 版式认证与字体

Paper Ink 支持全部 Gallery exact-fit。Swiss 只认证以下五个可执行 skeleton：

- `paper-ink.evidence.strategy-evidence-wall`
- `paper-ink.evidence.credential-wall`
- `paper-ink.data.chart-wall`
- `paper-ink.data.geo-bubble-map`
- `paper-ink.scaffold.contact`

Swiss 对其他 exact-fit 必须失败关闭；`composition` 与 `custom` 仍可使用。字体 `required_faces[].asset` 可以指向任意仓库内文件，`bundle_path` 必须是主题内部 `fonts/...` 安全相对路径；路径穿越和目标碰撞均为确定性错误。构建器只打包当前选中主题，并在 deck runtime 前加载该主题的 adapter 样式与脚本。

## 扩展边界

Theme Contract v1 的 `extensions` 必须为空对象。本轮不定义 motion 字段、API、profile 或运行时行为；现有组件动效不接入 Theme Contract。未来若要扩展，必须先提升合同版本并单独定义可验证的所有权和降级规则，不能借 `extensions` 静默启用行为。
