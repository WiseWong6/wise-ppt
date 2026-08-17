# Tabler Outline for Wise PPT

> **本仓库收录范围(wise-ppt)**:只收录 catalog 所需子集——母库 `icons/outline/`、
> 重绘成品 `redraw-v3/svg/`、`selection.json` / `progress.json` / `records/`、
> `registry-v2.json` / `SOURCE.json` / `LICENSE` / `acceptance.html`。下文提到的
> `icon-map.json`、`build_registry.py`、`icon-registry.js` 等按名引用链路**不在本仓库**:
> deck 图标一律内联手绘,不按名引用。

本目录固定 Tabler Icons `v3.46.0` 的完整 Outline SVG 母库，共 5,130 枚。
源版本、下载地址与归档校验值记录在 `SOURCE.json`，许可见 `LICENSE`。

来源署名：**Tabler Icons by Paweł Kuna，MIT License**。Paper Ink 重绘只改变
视觉几何，不改变来源事实；公开目录、验收页、注册表和交付包都必须保留这条署名。

生产链只读取 `icon-map.json` 中已登记的公开名称，并由
`build_registry.py` 生成 64×64、带纸墨角色的 `registry-v2.json` 和本地
JavaScript 注册表。业务内容只保存 kebab-case 名称；运行时不依赖 CDN、
图标字体或 npm。

重新生成：

```bash
python3 -B capabilities/vendors/tabler-outline/build_registry.py
```

生成器会 fail closed：来源文件缺失、SVG 含不受支持结构、元素超过 32、
几何越出 8–56 安全框、角色覆盖缺失或 alias 冲突都会终止。
