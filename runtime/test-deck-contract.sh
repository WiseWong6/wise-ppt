#!/bin/bash
# wise-ppt · 成品合同 v2 正反例回归
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SAMPLE="$ROOT/themes/paper-ink/examples/wise-ppt-story-six-page"
TMP_ROOT="$(mktemp -d "$ROOT/themes/paper-ink/examples/.deck-contract.XXXXXX")"
cleanup() { rm -rf "$TMP_ROOT"; }
trap cleanup EXIT INT TERM

python3 - "$SAMPLE" "$TMP_ROOT" <<'PY'
from pathlib import Path
import json, shutil, sys
from bs4 import BeautifulSoup

sample, root = Path(sys.argv[1]), Path(sys.argv[2])

def clone(name):
    target = root / name
    shutil.copytree(sample, target)
    pdf = target / 'wise-ppt-story-six-page.pdf'
    if pdf.exists(): pdf.unlink()
    hp = target / 'index.html'
    html = hp.read_text()
    html = html.replace('../../assets/shared.css', '../../../assets/shared.css')
    html = html.replace('../../assets/deck-component-contract.css', '../../../assets/deck-component-contract.css')
    html = html.replace('../../../../runtime/deck-runtime.js', '../../../../../runtime/deck-runtime.js')
    hp.write_text(html)
    return target

def write_variant(name, html_mutator=lambda s:s, plan_mutator=lambda s:s):
    target = clone(name)
    hp, pp = target/'index.html', target/'deck-plan.md'
    hp.write_text(html_mutator(hp.read_text()), encoding='utf-8')
    pp.write_text(plan_mutator(pp.read_text()), encoding='utf-8')

write_variant('same-relation',
    lambda s:s.replace('data-primary-relation="sequence"','data-primary-relation="comparison"',1),
    lambda s:s.replace('主关系=sequence | 视觉族=horizontal-timeline','主关系=comparison | 视觉族=horizontal-timeline',1))

def same_visual_html(s):
    s=s.replace('data-visual-family="horizontal-timeline"','data-visual-family="dual-panel"',1)
    start=s.index('data-page-id="page.story.workflow"'); end=s.index('data-page-id="page.story.principles"')
    block=s[start:end].replace('"primitive":"单区"','"primitive":"左右x等分"',1)
    return s[:start]+block+s[end:]
write_variant('same-visual', same_visual_html,
    lambda s:s.replace('视觉族=horizontal-timeline','视觉族=dual-panel',1))

def insert_p01(s, markup):
    needle='<main class="stage" data-balance="structural" data-balance-frame="0,140,1920,980">'
    return s.replace(needle, needle+markup, 1)

slot = '''<div data-layout-slot="true" style="position:absolute;left:200px;top:300px;width:460px;height:490px"><div data-component-id="atlas.002.list-card" data-contract-min-width="620" data-contract-min-height="370" data-contract-min-aspect="0.75" data-contract-max-aspect="3.82"><div class="swiss-card"><div class="swiss-card__content" style="font-size:var(--type-body)">合法正文</div></div></div></div>'''
write_variant('narrow-slot', lambda s:insert_p01(s,slot))

missing='<svg data-icon-source="redraw-v3:not-found" viewBox="0 0 64 64"><path d="M0 0L1 1"/></svg>'
write_variant('missing-icon', lambda s:insert_p01(s,missing), lambda s:s.replace('图标=无图标','图标=redraw-v3:not-found',1))
forged='<svg data-icon-source="redraw-v3:search" viewBox="0 0 64 64"><path d="M0 0L1 1"/></svg>'
write_variant('forged-icon', lambda s:insert_p01(s,forged), lambda s:s.replace('图标=无图标','图标=redraw-v3:search',1))
cross='<svg viewBox="0 0 100 100"><rect x="10" y="10" width="64" height="64"/><line x1="10" y1="10" x2="74" y2="74"/><line x1="10" y1="74" x2="74" y2="10"/></svg>'
write_variant('cross-placeholder', lambda s:insert_p01(s,cross))

wrapper=slot.replace('width:460px','width:1000px').replace(
    'atlas.002.list-card" data-contract-min-width="620" data-contract-min-height="370" data-contract-min-aspect="0.75" data-contract-max-aspect="3.82"',
    'native.paper-ink.107.interlocking-gears" data-contract-min-width="680" data-contract-min-height="360" data-contract-min-aspect="0.85" data-contract-max-aspect="4.13"')
write_variant('wrapper-600',
    lambda s:insert_p01(s,wrapper).replace('</head>','<style>[data-layout-slot] .swiss-card{min-height:600px!important;border:2px solid #000!important;background:#fff!important}</style></head>',1))
write_variant('two-titles', lambda s:insert_p01(s,'<div style="font-size:var(--type-title)">大字一</div><div style="font-size:var(--type-title)">大字二</div>'))
write_variant('body-15', lambda s:insert_p01(s,'<div style="font-family:var(--mono);font-size:var(--type-label)">这是一段正文而不是标签</div>'))
write_variant('template-geometry-drift',
    lambda s:s.replace('</head>', '<style>.slide[data-template-id="D6"] .scene{left:12px!important;right:12px!important}</style></head>', 1))
write_variant('virtual-primary-component',
    lambda s:s.replace('native.paper-ink.108.three-principles-radial', 'native.paper-ink.radial.three-principles.dimensions', 1))
write_variant('gallery-plan-mismatch',
    plan_mutator=lambda s:s.replace('套版式:E1', '套版式:E2', 1))
write_variant('gallery-missing-required-slot',
    lambda s:s.replace('data-slot-id="comparison"', 'data-slot-id="comparison-missing"', 1))
write_variant('free-build-pretends-gallery',
    lambda s:s.replace('data-layout-source="gallery"', 'data-layout-source="free_build"', 1))

def shallow_free_build(s):
    soup=BeautifulSoup(s, 'html.parser')
    slide=soup.select_one('[data-page-id="page.story.layout-atlas"]')
    contract_node=slide.select_one('script[data-geometry-contract]')
    contract=json.loads(contract_node.get_text())
    internal={'p04.left-content','p04.divider','p04.right-content'}
    contract['anchors']=[item for item in contract['anchors'] if item['anchor_id'] not in internal]
    contract['relations']=[item for item in contract['relations'] if not (set(item['anchors']) & internal)]
    contract_node.string=json.dumps(contract, ensure_ascii=False)
    return str(soup)
write_variant('free-build-shallow', shallow_free_build)

def mini(waiver=True, template2='D3', extra=''):
    waiver_line='- **节奏页对豁免**: p01→p02 | p01 定调工程边界，p02 收束行动，两个职责均不可合并。\n' if waiver else ''
    html=f'''<!doctype html><html data-runtime="wise-ppt-deck" data-geometry-contract-version="1" data-deck-contract-version="2"><head><link rel="stylesheet" href="assets/deck-component-contract.css"></head><body><div id="track">
<section class="slide" data-template-id="M2" data-primary-type-role="heading"><div class="stage" data-component-id="native.paper-ink.emotion.quote.motif-label"><div class="doc tl" data-template-part="support" data-template-slot="support" data-template-slot-kind="text">M2</div><div class="folio" data-template-part="folio">1</div><canvas class="px" width="1920" height="1080" data-template-part="canvas" data-template-slot="canvas" data-template-slot-kind="illustration"></canvas><svg class="marks" width="1920" height="1080" viewBox="0 0 1920 1080" data-template-part="marks"><g id="draw"></g></svg><div class="motif-label" data-template-part="motif-label" data-template-slot="motif-label" data-template-slot-kind="text" data-primary-text>过渡</div>{extra}</div><script type="application/json" data-geometry-contract>{{"primitive":"非关系模板:M2"}}</script></section>
<section class="slide" data-template-id="{template2}" data-primary-type-role="title"><div class="stage" data-component-id="native.paper-ink.scaffold.minimal-outro.outro-lockup"><div class="doc tl" data-template-part="support" data-template-slot="support" data-template-slot-kind="text">D3</div><div class="folio" data-template-part="folio">2</div><svg class="scene" width="1920" height="1080" viewBox="0 0 1920 1080" data-template-part="illustration" data-template-slot="illustration" data-template-slot-kind="illustration"></svg><div class="big" data-template-part="primary" data-template-slot="primary" data-template-slot-kind="text" data-primary-text>收尾</div><div class="sig" data-template-part="signature" data-template-slot="signature" data-template-slot-kind="text">署名</div></div><script type="application/json" data-geometry-contract>{{"primitive":"非关系模板:{template2}"}}</script></section>
</div></body></html>'''
    plan=f'''# mini\n{waiver_line}\n### p01 · 非关系页\n- 成品合同: 模板=M2 | 主字档=heading | 图标=无图标\n\n### p02 · 非关系页\n- 成品合同: 模板={template2} | 主字档=title | 图标=无图标\n'''
    return html, plan

for name, args in [('transition-no-waiver',(False,'D3','')),('transition-waiver',(True,'D3','')),('template-mismatch',(True,'D3','')),('template-extra',(True,'D3','<div class="new-signature">新增署名</div>'))]:
    target=root/name; target.mkdir(); html,plan=mini(*args)
    if name == 'template-mismatch': plan=plan.replace('模板=D3 | 主字档=title','模板=D2 | 主字档=title')
    (target/'index.html').write_text(html); (target/'deck-plan.md').write_text(plan)

target=root/'template-class-drift'; target.mkdir(); html,plan=mini(True,'D3','')
(target/'index.html').write_text(html.replace('class="big" data-template-part="primary"', 'class="big changed" data-template-part="primary"', 1))
(target/'deck-plan.md').write_text(plan)
PY

expect_fail() {
  local name="$1" needle="$2" mode="${3:-static}" output
  if [ "$mode" = "browser" ]; then
    output="$(bash "$ROOT/runtime/check-deck.sh" "$TMP_ROOT/$name" 2>&1 || true)"
  else
    output="$(python3 "$ROOT/scripts/check_deck_contract.py" "$TMP_ROOT/$name" 2>&1 || true)"
  fi
  if ! printf '%s' "$output" | rg -q "$needle"; then
    echo "FAIL fixture=$name 未命中: $needle" >&2
    printf '%s\n' "$output" >&2
    exit 1
  fi
  echo "PASS expected-fail $name → $needle"
}

python3 "$ROOT/scripts/check_deck_contract.py" "$SAMPLE" >/dev/null
echo "PASS positive six-page"
node "$ROOT/scripts/build_catalog_authority_manifest.cjs" --check >/dev/null
echo "PASS Catalog sole-authority projection"
expect_fail same-relation '相邻关系页主关系相同'
expect_fail same-visual '视觉签名三页内重复'
expect_fail transition-no-waiver '过渡模板紧接收尾模板'
python3 "$ROOT/scripts/check_deck_contract.py" "$TMP_ROOT/transition-waiver" >/dev/null
echo "PASS pair waiver p01→p02"
expect_fail template-mismatch '模板错配'
expect_fail template-extra '新增未登记节点'
expect_fail template-class-drift '模板部件 primary 的标签/类名/定位属性变化'
expect_fail narrow-slot '组件槽过窄'
expect_fail wrapper-600 '组件预览外壳未归零' browser
expect_fail two-titles '多个 title/hero/display' browser
expect_fail body-15 '正文使用 15px 小字档' browser
expect_fail template-geometry-drift '直接套用外壳漂移' browser
expect_fail virtual-primary-component '版式主槽 dimensions 必须物化正式组件'
expect_fail gallery-plan-mismatch '套版式登记错配'
expect_fail gallery-missing-required-slot '版式缺必需槽位: comparison'
expect_fail free-build-pretends-gallery '自由构建页不得在 deck-plan 冒充套版式'
expect_fail free-build-shallow '自由构建关系页至少声明 2 个内部几何锚点'
expect_fail cross-placeholder '矩形加双对角线叉号'
expect_fail missing-icon '图标不在 Catalog 精选资产中'
expect_fail forged-icon '图标几何与 redraw-v3 不一致'
MATERIALIZED="$TMP_ROOT/materialized-atlas-051"
node "$ROOT/scripts/materialize_atlas_component.cjs" atlas.051.iceberg --out-dir "$MATERIALIZED" >/dev/null
rg -Fq -- '.swiss-card .iceberg-diagram {' "$MATERIALIZED/component.css"
for field in visible_label visible_description behavior_label behavior_description root_label root_description; do
  rg -Fq -- "data-field=\"$field\"" "$MATERIALIZED/component.html"
done
if rg -q -- 'ICEBERG MODEL|VISIBLE / HIDDEN|10 / 90|x1="0" y1="26" x2="480" y2="26"' "$MATERIALIZED/component.html"; then
  echo "FAIL atlas.051 仍含已删除的顶部元数据带" >&2
  exit 1
fi
python3 - "$MATERIALIZED/manifest.json" "$MATERIALIZED/component.html" <<'PY'
from pathlib import Path
import json, sys
data = json.loads(Path(sys.argv[1]).read_text())
html = Path(sys.argv[2]).read_text()
assert data['component_id'] == 'atlas.051.iceberg'
assert data['format'] == 'wise-ppt-atlas-materialization@2'
assert data['includes_component_overrides'] is True
for key in ['source_sha256','snippet_sha256','adapter_sha256','materializer_sha256','html_sha256','css_sha256']:
    assert len(data[key]) == 64
for attr in ['data-catalog-source-sha256','data-catalog-snippet-sha256','data-catalog-adapter-sha256']:
    assert attr in html
PY
echo "PASS atlas.051 deterministic materializer"
echo "PASS deck contract v2 fixtures=20"
