# 字体说明

wise-ppt skill 依赖 4 个本地开源字体，字形是纸墨线稿风的视觉根基。
字体文件（共约 63MB）**不进 git**，避免仓库膨胀。首次使用时由
`scripts/ensure_fonts.py` 按锁定 SHA-256 解析。它依次检查当前
Skill、本机持久缓存和系统字体；只有三者都没有精确副本时才联网。
缓存默认位于 macOS 的 `~/Library/Caches/wise-ppt/fonts`，可用
`WISE_PPT_FONT_CACHE_DIR` 覆盖。不同 worktree 共用同一缓存和进程锁。

## 快速就绪

```bash
python3 <SKILL_ROOT>/scripts/ensure_fonts.py
```

兼容旧命令 `bash download-fonts.sh`。只做离线校验：
`python3 <SKILL_ROOT>/scripts/ensure_fonts.py --check`。强制重下：加 `--force`。

## 字体清单

| 本地文件名 | 字体 | 字重 | 用途 | 协议 |
|---|---|---|---|---|
| `SourceHanSerifCN-Medium.otf` | 思源宋体 CN | 500 | 大字标题、金句、结论 | SIL OFL 1.1 |
| `SourceHanSansCN-Light.otf` | 思源黑体 CN | 300 | 正文、说明、标签 | SIL OFL 1.1 |
| `CourierPrime-Regular.ttf` | Courier Prime | 400 | 编号、图题、刻度、页脚 | SIL OFL 1.1 |
| `LXGWWenKai-Regular.ttf` | 霞鹜文楷 | 400 | 手写批注、引用大字 | SIL OFL 1.1 |

全部为 **SIL Open Font License 1.1**，可免费商用。

## 关于 SC / CN 命名

思源字体早期叫 `SC`（简体）/ `TC`（繁体），后改 `CN`/`TW`/`HK`。
本 skill 的落地文件统一采用 **`CN` 命名**（`SourceHanSerifCN-*`），
与 `design-tokens.css` 的 `@font-face` 引用保持一致。为冻结现有视觉结果，
下载源锁定到官方仓库中的 SC 全量 OTF；SC 与 CN 在这里表示同一简体中文字形区域。

## 下载源

均为官方/权威仓库：

- 思源宋体：https://github.com/adobe-fonts/source-han-serif （SubsetOTF/CN/）
- 思源黑体：https://github.com/adobe-fonts/source-han-sans  （SubsetOTF/CN/）
- Courier Prime：https://github.com/google/fonts （ofl/courierprime/）
- 霞鹜文楷：https://github.com/lxgw/LxgwWenKai （fonts/TTF/）

脚本使用不可变提交 URL 与 SHA-256 双重锁定。若需要升级字体，必须同时更新
URL、摘要、布局 implementation registry，并重跑浏览器与 PDF 验收；不得只替换本地文件。
