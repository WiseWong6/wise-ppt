# PPT Component Atlas Catalog

本目录保存 Wise PPT 内联使用的 PPT Component Atlas 组件目录。Wise PPT 在编排时直接读取这里的 catalog 按 `component_id` 校验和取用组件片段，不再依赖外部独立 skill。

- 上游仓库：`https://github.com/WiseWong6/wise-labs/tree/main/html-ppt-components`
- 上游 catalog：`https://raw.githubusercontent.com/WiseWong6/wise-labs/main/html-ppt-components/catalog-data.js`
- 目标文件：`capabilities/vendors/ppt-component-atlas/catalog-data.js`
- 组件数量：61 个 entry（`componentCss` + `componentMotionCss` 动效层 + `entries[]`）
- 许可证：`MIT`
- 本地许可证：`capabilities/vendors/ppt-component-atlas/LICENSE`
- Catalog SHA-256：`4bb893d6d9f3e40f1f7d97fa0f5a5cb154cf211c82f8fe66bbff5304d5b9f048`

catalog 必须从上游 `WiseWong6/wise-labs/html-ppt-components/catalog-data.js` **逐字节复制**，不修改格式、不删字段，保留 `window.SWISS_CATALOG_DATA` 包装、`componentMotionCss` 动效层与全部 `entries`，以便后续可用上游 `--verify-source` 复核对齐。

更新版本时必须同时更新 `capabilities/registry.json`（`ppt-component-atlas` capability 的 `catalog` / `version` / `license` 字段）、本 README 的 SHA-256 与 catalog 文件本身，并重新执行 JSON、manifest 与本地 `file://` 加载检查。

catalog 文件落盘后，用以下命令记录并复核实际字节的 SHA-256：

```bash
shasum -a 256 capabilities/vendors/ppt-component-atlas/catalog-data.js
```

## 解析与取用

- `scripts/catalog.py` 与 `scripts/_ppt_contracts.py` 通过查找顺序「环境变量 `PPT_COMPONENT_ATLAS_CATALOG` > 本目录 > 外部 skill」定位 catalog，优先级见两个文件的 atlas 查找函数。
- `scripts/export_atlas_component.py` 从本目录读取 catalog，按中文 `label` / 英文 `name` / `num` 匹配 entry，输出可直接粘进 slide 的 `{snippet, component_css, motion_css}` 片段。
- `gallery/components/index.html` 直接读取本目录的 catalog，默认通过 `paper-ink.atlas` adapter 预览 61 个组件，并可切换回原始 Swiss 样式对照；画册不复制 entry 或改写 catalog。
