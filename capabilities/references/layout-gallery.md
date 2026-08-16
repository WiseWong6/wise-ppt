# 画册版式配方与来源证据

版式机器数据权威是 `capabilities/layouts/gallery-manifest.json`:75 份可查询版式配方(67 个关系版式 + D1–D6/M1/M2 模板;D7–D10 为画册封面/目录模板,不进关系配方)。每份配方含槽位几何(space_contract:1920×1080 画布上的宽高/长宽比/空间类型)、条目容量、允许渲染源与推荐组件(`recommended_component_ids` 全部指向 `capabilities/components/routing-manifest.json`)。

视觉来源与几何底稿:

- `references/gallery-paper-ink/ai/frames/` 79 张整页版式帧(67 关系版式 + 12 模板),完整 1920×1080 可执行 HTML,套版式时的复制底稿;帧是图册标本,拆成 slide 的步骤见 `references/landing-playbook.md` §1。
- `references/taxonomy-empty/` 6 种结构 × 17 张空槽大图;`references/taxonomy-empty/manifest.json` 保存 topology 与同槽合并映射。

一致性门禁:

```bash
python3 -B scripts/audit_relationship_assets.py
```

校验关系页 ↔ manifest ↔ 组件三方闭合(含 R4/R5/Q3/R6/R7 专项反漂移门禁)。catalog 浏览入口为 `references/catalog.html`,其组件关系标签由 `references/component-routing-data.js`(`routing-manifest.json` 的确定性投影)生成,防止手写标签与生产路由漂移。
