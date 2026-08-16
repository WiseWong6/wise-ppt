# wise-ppt-glm

表驱动的网页 PPT 编排 skill:输入素材(PDF / 链接 / 口语稿 / 成型 PPT),产出 16:9 自包含 HTML deck 与 PDF。

本仓库是 wise-ppt 系列的现行版本,取代旧的 wise-ppt 与 wise-ppt-page-expression。

## 上手

| 想做什么 | 去哪 |
|---|---|
| 看规则(怎么判定版式/组件) | `SKILL.md` —— 唯一执行权威 |
| 看资产(模板/版式/结构/组件/图标) | `references/catalog.html`,浏览器直接打开 |
| 看范文(整副 deck 长什么样) | `themes/paper-ink/examples/wise-ppt-story-six-page/` |
| 查"为什么这么判" | `skill-design.md`(方法论 + 修订记录) |

## 首次准备

字体约 63MB,不入库,先下载(系统里已有就不重复下载;下载优先走国内镜像,自动校验指纹):

```bash
bash themes/paper-ink/assets/fonts/download-fonts.sh
```

## 交付验收

deck 生成后跑三件套(标准见 SKILL.md「交付」):

```bash
bash runtime/check-deck.sh <deck>   # 浏览器检查,console 零 error
bash runtime/export-deck.sh <deck>  # 无头打印 PDF,页数核对
bash runtime/audit-deck.sh <deck>   # 几何/字号/可见性审计
```

## 授权

本仓库代码 AGPL-3.0,见 `LICENSE`;第三方资产清单见 `NOTICE`。
