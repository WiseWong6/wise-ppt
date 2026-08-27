# 整副主题选择

## 一句话规则

一副 deck 只选择一个 Catalog 当前登记的 `theme_preset` 和一个 `typography_mode`。主题由 compiler 绑定到 registry 当前全部锁定骨架；代理不能在页面里写颜色、字体或 treatment。

## 唯一权威

当前合法值只认 `capabilities/runtime-authority-manifest.json` 的 `appearance_presets` 与 `typography`。本文帮助选择，不是第二套枚举；若本文示例与运行时 authority 不同，以当前投影为准并停止构建排查漂移。

当前默认值：

```json
{
  "theme_preset": "paper-ink-original",
  "typography_mode": "all-sans"
}
```

## 当前三套外观预设

| theme_preset | 人话说明 | 默认字体 | 适用倾向 |
|---|---|---|---|
| `paper-ink-original` | 冷灰纸底、深墨、克制红色焦点 | `all-sans` | 默认；研究、分析、内部分享 |
| `scheme-k-hermes` | 爱马仕橙；正白纸、墨字、整页 multiply 纸纹 | `mixed` | 品牌、商业、编辑感 |
| `scheme-l-klein` | 克莱因蓝；正白纸、墨字、整页 multiply 纸纹 | `mixed` | 科技、产品、发布表达 |

没有明确偏好时使用 `paper-ink-original`。不要为了页面节奏在同一 deck 中切换 preset。

## 当前三种字体模式

| typography_mode | 人话说明 | 使用边界 |
|---|---|---|
| `all-sans` | 全部中文以黑体建立清晰层级 | 默认和高信息密度内容 |
| `all-serif` | 全部中文使用宋体体系 | 需要持续的人文、出版语气 |
| `mixed` | 大标题/强调用宋体，正文用黑体 | 品牌编辑和发布表达 |

`typography_mode` 可省略，compiler 采用 preset 的默认模式。显式覆盖只能选 Catalog 当前登记值，不能写字体名、font-family 或字重补丁。

## 选择顺序

1. 先看用户是否点名现有 preset；点名则直接使用。
2. 没点名时按材料语气选择；不确定就用默认纸墨。
3. 默认采用 preset 自带 typography；只有用户明确要求或整副材料明显需要时才覆盖。
4. 在写完整 `deck-spec.json` 和 payload 前固定整副主题；之后不因某一页“不够亮”而换主题。

主题不参与 page role、relation key 或 layout 选择。先选正确骨架，再由同一主题渲染。

## 禁止事项

standard 模式禁止：

- 自定义 hex、渐变、阴影、圆角或页面级 style；
- 一页一个 preset、局部换字体、局部调字重；
- 把强调色当作装饰色大面积随机使用；
- 修改组件内部颜色来绕过主题 adapter；
- 写入未登记的主题属性或查询参数；
- 为主题效果改结构、换核心组件或增删槽。

主题适配由 compiler/runtime 统一完成。某骨架在合法 preset 下显示异常，是仓库实现缺陷；standard 必须停止并登记修复任务，不能用页面补丁或 deck 实验掩盖。

## 验收

机器检查至少确认：

- spec 的 preset/mode 均在 Catalog authority；
- HTML 根只声明一个 preset 和一个 typography mode；
- 全部页面继承同一 deck 级设置；
- normal/accent/print 都没有页面级颜色或字体覆盖；
- HTML 与 PDF 记录相同 preset、mode 和 build-id。

人工只需确认整副视觉气质是否适合内容，以及正文、小字、图表标签在投屏与 PDF 中是否可读；不要逐页重新设计主题。
