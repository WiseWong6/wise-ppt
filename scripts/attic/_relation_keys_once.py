#!/usr/bin/env python3
"""一次性脚本:为 routing-manifest 组件补 relation_keys(23 细种统一口径)。

- relation_keys 是 glm skill 逐页四步④的查表键;relations 保留原值(上游生成器口径)。
- 顺带补 4 处改名 aliases(swimlane/weighted-arcs/constellation/terminal)。
"""
import json, collections

PATH = 'capabilities/components/routing-manifest.json'

# 23 细种英文键 → 中文名(与 SKILL.md 表A/表B/第五章同一套)
VOCAB = {
    'focus': '焦点', 'illustration': '示意', 'display': '陈列', 'parallel': '并行',
    'metric': '指标', 'distribution': '分布', 'hierarchy': '层级', 'decomposition': '拆解',
    'part-whole': '部分整体', 'nesting': '嵌套', 'sequence': '时序', 'flow': '流动',
    'cycle': '循环', 'convergence': '汇聚', 'funnel': '漏斗', 'causal': '因果',
    'comparison': '对比', 'matrix': '矩阵', 'mapping': '映射', 'overlap': '交叠', 'ranking': '排名',
    'network': '网络', 'evidence': '证据',
}

# 按组件 id 前缀/canonical_name 建 relation_keys 映射
BY_NAME = {
    'list-card': ['display'],
    'form-card': ['focus'],
    'quote': ['focus'],
    'alert-box': ['focus'],
    'terminal-box': ['focus'],
    'code': ['focus'],
    'vs': ['comparison'],
    'before-after': ['comparison'],
    'swot': ['matrix'],
    'quadrant-axis': ['matrix'],
    'comparison-table': ['matrix'],
    'matrix': ['matrix'],
    'impossible-triangle': ['comparison', 'matrix'],
    'process': ['flow'],
    'process-loop': ['cycle'],
    'journey': ['sequence'],
    'timeline': ['sequence'],
    'gantt': ['flow'],
    'concentric': ['nesting', 'decomposition'],
    'pyramid': ['part-whole', 'decomposition'],
    'fishbone': ['causal'],
    'iceberg': ['decomposition'],
    'venn': ['overlap', 'comparison'],
    'architecture': ['hierarchy'],
    'arch-platform': ['nesting'],
    'arch-platform-complex-v': ['nesting'],
    'mind-map': ['hierarchy'],
    'stats': ['metric'],
    'radar': ['comparison'],
    'radar-hex': ['comparison'],
    'generated-image': ['illustration'],
    'reconstructed-image': ['illustration', 'evidence'],
    'step-rise': ['sequence'],
    'doc-excerpt': ['evidence'],
    'official-doc': ['evidence'],
    'evidence-wall': ['evidence', 'matrix'],
    'logo-cloud': ['display'],
    'mobile-gallery': ['evidence'],
    'admin-console': ['illustration', 'evidence'],
    'trace-tree': ['hierarchy'],
    'gantt-ink': ['flow'],
    'timeline-gallery': ['sequence'],
    'winding-road': ['sequence'],
    'contact-card': ['focus'],
    'district-map': ['distribution'],
    'why-how-bands': ['causal', 'mapping'],
    'before-after-bands': ['comparison'],
    'chat-dialog': ['evidence'],
    'radial-hub': ['decomposition'],
    'merge-confluence': ['convergence'],
    'watershed-axis': ['comparison'],
    'swimlane-roadmap': ['parallel'],
    'profile-card': ['focus'],
    'radial-progress': ['metric'],
    'icon-grid': ['display'],
    'funnel': ['funnel'],
    'annotation-callout': ['focus'],
    'wide comparison matrix': ['matrix'],
    'arch-table-band': ['hierarchy'],
    'constellation relationship network': ['network'],
    'compact credential badge': ['focus'],
    'evidence status panel': ['evidence'],
    'hierarchy levels': ['hierarchy'],
    'semantic icon grid': ['display'],
    'wide metric band': ['metric'],
    'particle metaphor comparison': ['comparison'],
    'ordered process strip': ['flow'],
    'compact scenario column': ['display'],
    'compact statement band': ['focus'],
    'weighted relationship arcs': ['mapping', 'network'],
    # ECharts 中文名
    '基础柱状图': ['comparison', 'ranking'],
    '动态排序柱状图': ['ranking'],
    '日历热力图': ['distribution'],
    '分级填色地图': ['distribution'],
    '基础折线图': ['sequence'],
    '平滑折线图': ['sequence'],
    '堆叠折线图': ['sequence', 'part-whole'],
    '访问来源饼图': ['part-whole'],
    '基础雷达图': ['comparison'],
    '基础桑基图': ['flow', 'convergence'],
    '基础散点图': ['distribution'],
    '散点聚合柱状动画': ['distribution'],
    '从左到右树状图': ['hierarchy'],
}

ALIAS_FIXES = {
    'native.paper-ink.083.swimlane-roadmap': 'swimlane',
    'native.paper-ink.semantic.weighted-arcs': 'weighted-arcs',
    'native.paper-ink.semantic.constellation-network': 'constellation',
    'atlas.013.terminal-box': 'terminal',
}

m = json.load(open(PATH), object_pairs_hook=collections.OrderedDict)
missing = []
for c in m['components']:
    keys = BY_NAME.get(c['canonical_name'])
    if keys is None:
        missing.append((c['component_id'], c['canonical_name']))
        keys = []
    new = collections.OrderedDict()
    for k, v in c.items():
        new[k] = v
        if k == 'relations':
            new['relation_keys'] = keys
    if 'relations' not in c:
        new['relation_keys'] = keys
    c.clear(); c.update(new)
    aid = ALIAS_FIXES.get(c['component_id'])
    if aid and aid not in c['aliases']:
        c['aliases'].append(aid)

assert not missing, f'未映射组件: {missing}'
m['relation_key_vocabulary'] = {k: v for k, v in VOCAB.items()}

# 校验:23 细种每个至少 1 个组件;relation_keys 全部落在词表内
cover = {k: 0 for k in VOCAB}
for c in m['components']:
    for k in c['relation_keys']:
        assert k in VOCAB, f'词表外的键: {k} ({c["component_id"]})'
        cover[k] += 1
empty = [k for k, n in cover.items() if n == 0]
assert not empty, f'零覆盖细种: {empty}'
print('覆盖计数:', {k: v for k, v in sorted(cover.items(), key=lambda x: -x[1])})

json.dump(m, open(PATH, 'w'), ensure_ascii=False, indent=2)
print(f'OK: {len(m["components"])} 条全部写入 relation_keys;词表 23 键全有组件')
