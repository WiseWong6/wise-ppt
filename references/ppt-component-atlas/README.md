# PPT Component Atlas Catalog

本目录保存 Wise PPT 内联使用的 PPT Component Atlas 组件目录。Wise PPT 在编排时直接读取这里的 catalog 按 `component_id` 校验和取用组件片段，不再依赖外部独立 skill。

- 上游仓库：`https://github.com/WiseWong6/wise-labs/tree/main/html-ppt-components`
- 上游 catalog：`https://raw.githubusercontent.com/WiseWong6/wise-labs/main/html-ppt-components/catalog-data.js`
- 唯一目标文件：`references/ppt-component-atlas/catalog-data.js`
- 组件数量：61 个 entry（`componentCss` + `componentMotionCss` 动效层 + `entries[]`）
- 许可证：`MIT`
- 本地许可证：`references/ppt-component-atlas/LICENSE`
- Catalog SHA-256：由 `capabilities/catalog-authority-manifest.json` 确定性记录，不手写双份摘要。

本文件是 `references/catalog.html` 预览和生产物化共用的唯一 Atlas 源，保留 `window.SWISS_CATALOG_DATA` 包装、动效层与全部 entries；Catalog 改良直接在这里发生，禁止在 `capabilities/vendors/` 再复制一份旧版。

更新时运行 `node scripts/build_catalog_authority_manifest.cjs` 重建源码、entry 与渲染栈收据，并重新执行 manifest 与本地 `file://` 加载检查。

catalog 文件落盘后，用以下命令记录并复核实际字节的 SHA-256：

```bash
shasum -a 256 references/ppt-component-atlas/catalog-data.js
```

## 解析与取用

- `references/catalog.html` 直接读取本文件显示可选卡。
- `scripts/materialize_atlas_component.cjs` 从本文件读取精确 entry，输出静态 HTML、完整适配 CSS 与哈希收据。
- `scripts/build_catalog_authority_manifest.cjs --check` 会拒绝第二份 Atlas 源、Catalog/路由漂移和错误渲染栈。
