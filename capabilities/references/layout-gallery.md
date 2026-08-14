# 画册空槽蓝图与来源证据

生产版式权威是 `capabilities/layouts/layout-blueprint-registry.json`，格式为 `wise-ppt-layout-blueprint-registry@1`。它由 `scripts/generate_layout_blueprints.py` 从 62 个 Gallery recipe、General/AI implementation 和 composition presets 确定性生成；生产运行时只读取生成后的 registry 与内嵌空槽片段，不解析 Gallery HTML。

每个 recipe 生成 `general` 与 `ai` 两个蓝图，共 124 个：57 个内容 recipe 生成 114 个可生产蓝图；D1–D5 共 5 个 scaffold recipe 生成 10 个 blocked 蓝图，由现有页面壳 scaffold 负责，不得伪装成内容组件。

蓝图保留画册的槽位边界、比例、阅读顺序、装饰结构与视觉形态，删除组件、样例文字、业务内容和 page shell 家具。标题、页眉、页码与页面结论继续由 page shell 负责。每个蓝图记录 recipe/variant/source path/SHA256、派生来源和构建指纹；`topology_audit_id` 只用于几何审计，不决定生产版式。

同一 deck 只使用一个 variant，默认 `general`；只有用户明确要求才使用 `ai`。F4 等蓝图必须保留画册真实槽位，例如 `1320×680`，禁止再由通用 leaf 拉伸。

生成与新鲜度门禁：

```bash
python3 -B scripts/generate_layout_blueprints.py --check
```

`--check` 必须验证 124/114/10 数量、来源 SHA256、registry 构建指纹和蓝图纯净度，并保证 Gallery 源文件不被改写。

General、AI frame 与 components Gallery 继续保存视觉来源、内部 renderer 和设计证据。唯一人工画册入口仍为：

```text
gallery/taxonomy/index.html
```

统一 taxonomy 是 registry、composition presets 与 component routing 的派生浏览视图，不能反向影响生产选择。
