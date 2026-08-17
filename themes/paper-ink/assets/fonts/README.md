# 字体说明

wise-ppt 依赖 4 个本地开源字体,字形是纸墨线稿风的视觉根基。
字体文件(共约 63MB)**不进 git**,避免仓库膨胀。

## 快速就绪

```bash
bash themes/paper-ink/assets/fonts/download-fonts.sh
# 或
python3 scripts/ensure_fonts.py
```

`--check` 只校验不获取;`--force` 忽略本地已有全部重取。

## 获取机制(按顺序)

1. **本地已有且指纹一致** → 跳过,不重复下载;
2. **系统字体目录里有指纹一致的副本** → 直接拷入,免下载;
3. **联网下载** → 按 `font-manifest.json` 里 `urls` 的顺序尝试,**国内镜像在前**,官方源在最后兜底。

每个文件都以 SHA-256 指纹收货:镜像挂了、被污染或下载损坏,都会被校验拦下并自动换下一个源。

## 字体清单

| 本地文件名 | 字体 | 字重 | 用途 | 协议 |
|---|---|---|---|---|
| `SourceHanSerifCN-Medium.otf` | 思源宋体 CN | 500 | 大字标题、金句、结论 | SIL OFL 1.1 |
| `SourceHanSansCN-Light.otf` | 思源黑体 CN | 300 | 正文、说明、标签 | SIL OFL 1.1 |
| `CourierPrime-Regular.ttf` | Courier Prime | 400 | 编号、图题、刻度、页脚 | SIL OFL 1.1 |
| `LXGWWenKai-Regular.ttf` | 霞鹜文楷 | 400 | 手写批注、引用大字 | SIL OFL 1.1 |

全部为 **SIL Open Font License 1.1**,可免费商用。

## 关于 SC / CN 命名

思源字体早期叫 `SC`(简体)/ `TC`(繁体),后改 `CN`/`TW`/`HK`。
本仓库的落地文件统一采用 **`CN` 命名**(`SourceHanSerifCN-*`),
与 `design-tokens.css` 的 `@font-face` 引用保持一致。为冻结现有视觉结果,
下载源锁定到官方仓库中的 SC 全量 OTF;SC 与 CN 在这里表示同一简体中文字形区域。

## 下载源

上游出处(实际下载走 `font-manifest.json` 的镜像链,国内镜像在前):

- 思源宋体:https://github.com/adobe-fonts/source-han-serif (OTF/SimplifiedChinese/)
- 思源黑体:https://github.com/adobe-fonts/source-han-sans (OTF/SimplifiedChinese/)
- Courier Prime:https://github.com/google/fonts (ofl/courierprime/)
- 霞鹜文楷:https://github.com/lxgw/LxgwWenKai (fonts/TTF/)

脚本使用不可变提交 URL 与 SHA-256 双重锁定。若要升级字体,必须同时更新
清单里的 `urls` 与 `sha256`,并重跑浏览器与 PDF 验收;不得只替换本地文件。
