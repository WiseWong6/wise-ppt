#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""纸墨线稿 · 单页机检（checklist P0 中可机检部分的闸门）

同时支持两份明确分流的页面合同：带 ``data-wise-ppt-page-shell="v5|v6"``
marker 的生产 deck 按现代 page shell 检查；未带 marker 的 Gallery 与受保护样张
继续按 legacy 规则检查。不得用现代规则全局放宽 legacy 页面。

用法：
    python3 themes/paper-ink/scripts/lint.py <deck目录 | 单个HTML> [--strict]

检查项（对应 references/visual-checklist.md P0）：
    L1 配色白名单：页面只能引用主题颜色 token；裸 HEX/RGB/HSL/命名色非法并给出替代 token
    L2 渐变/阴影/滤镜：linear-gradient、box-shadow（允许标本偏移影豁免值）、filter:
    L3 粗线：stroke-width ≥ 2 超过 1 处
    L4 中文长句落 mono：txt(...) 调用中 font-family MONO 且含 ≥8 个 CJK 字符
    L5 页面家具：v5/v6 每页唯一 header/title/folio，并按 conclusion_mode 检查 conclusion；
       legacy 保持 .doc tl、.folio、.caption 规则
    L6 不做“同尺寸矩形即违规”的静态猜测；Grid/证据墙/矩阵由 manifest 关系与浏览器目检判断
    L7 runtime/缩放所有权：三种 runtime 必须声明且正式 deck 禁止 stageFit/slide-stage inline transform
    L9 深色页面底色：.stage / body 背景亮度 < 50%（skill 拒绝暗色系，全部纸底纯色）
    L10 字阶：页面只能引用共享 --type-* token；CSS/SVG/Canvas/ECharts 禁止裸字号
    L11 文案边界：页角只写档案注记；legacy caption / v5/v6 conclusion 只写页面结论，不泄漏选版式元数据
    L12 图标语义：禁止用 Emoji 充当图标或装饰；保留方向、勾叉等纯文本符号
    L13 data-typography-mode 只能是 mixed / all-sans / all-serif
    L14 字体引用：family 字面量仅允许出现在 canvas 语境（ctx.font / fonts.load / ECharts fontFamily）
    L15 folio 格式：v5/v6 为两位数字 ``NN / NN`` 且无署名；legacy 保持
        ``{页码} / {总数} — BY {署名}``，Gallery 帧页码须与文件名 code 一致
    L16 外链依赖：禁止 Font Awesome / 图标字体 / CDN 字体与脚本
    L17 颜色语义：data-color-role / WisePPT.color 只能使用固定角色
    L18 功能图形与有序区域数据必须使用登记的语义角色
    L19 caption 固定视觉样式只能由共享组件定义

退出码：有 FAIL 则 1（--strict 时 WARN 也为 1），否则 0。
注意：静态检查有边界——循环里用变量画的 rect/线无法计数，机检全过 ≠ 目检通过，
     仍须按 visual-checklist 在真实浏览器中人工验收。
"""
import argparse
import html
import os
import re
import sys
from html.parser import HTMLParser

COLOR_TOKEN_NAMES = (
    '--paper', '--paper-deep', '--paper-panel', '--ink', '--ink-80', '--ink-70',
    '--ink-55', '--ink-45', '--ink-25', '--ink-12',
    '--accent-red', '--accent-red-85', '--accent-red-65',
    '--data-ramp-1', '--data-ramp-2', '--data-ramp-3', '--data-ramp-4',
    '--data-ramp-5', '--data-ramp-6',
)
COLOR_ROLES = {
    'surface-canvas', 'surface-recessed', 'surface-panel',
    'primary', 'functional', 'body', 'chart-label', 'metadata', 'divider', 'construction',
    'focus', 'focus-secondary', 'focus-peripheral',
    'data-1', 'data-2', 'data-3', 'data-4', 'data-5', 'data-6',
}
COLOR_TARGETS = {'color', 'background-color', 'fill', 'stroke', 'border-color'}
NAMED_OK = {'none', 'currentcolor', 'inherit', 'transparent'}
COLOR_FUNCTIONS = {'rgb', 'rgba', 'var', 'url', 'color-mix', 'linear-gradient', 'radial-gradient'}
CSS_NAMED_COLORS = {
    'black', 'white', 'red', 'blue', 'green', 'gray', 'grey', 'orange', 'yellow',
    'purple', 'pink', 'brown', 'cyan', 'magenta', 'navy', 'teal', 'maroon', 'olive',
    'lime', 'aqua', 'silver', 'gold', 'coral', 'salmon', 'tomato', 'violet', 'indigo',
}
CJK = re.compile(r'[一-鿿　-〿＀-￯]')
TYPE_ROLES = {
    'display-mark', 'particle-sample', 'display', 'hero', 'title', 'metric',
    'heading', 'emphasis', 'caption', 'subheading', 'body', 'body-small',
    'micro-secondary', 'label', 'meta',
}
EMOJI_GLYPH = re.compile(r'[\U0001F000-\U0001FAFF\u2300-\u23FF\u2600-\u27BF\uFE0F]')
TEXT_SYMBOLS = {'←', '↑', '→', '↓', '↔', '✓', '✗', '✕'}
V5_PAGE_SHELL_ATTRIBUTE = 'data-wise-ppt-page-shell'
_VOID_HTML_TAGS = {
    'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta',
    'param', 'source', 'track', 'wbr',
}


def _class_tokens(attrs):
    return set(str(attrs.get('class', '')).split())


class _V5MarkerParser(HTMLParser):
    """Recognize the marker only as an actual HTML attribute, not text/comments."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.version = None

    def _inspect(self, raw_attrs):
        attrs = {name: (value or '') for name, value in raw_attrs}
        version = attrs.get(V5_PAGE_SHELL_ATTRIBUTE, '').casefold()
        if version in {'v5', 'v6'}:
            self.version = version

    def handle_starttag(self, _tag, raw_attrs):
        self._inspect(raw_attrs)

    def handle_startendtag(self, _tag, raw_attrs):
        self._inspect(raw_attrs)


class _V5PageShellParser(HTMLParser):
    """Collect v5 furniture per slide without interpreting component markup."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.pages = []
        self._page = None
        self._stack = []
        self._captures = []

    @staticmethod
    def _attrs(raw_attrs):
        return {name: (value or '') for name, value in raw_attrs}

    def handle_starttag(self, tag, raw_attrs):
        tag = tag.casefold()
        attrs = self._attrs(raw_attrs)
        if self._page is None:
            if tag != 'section' or 'slide' not in _class_tokens(attrs):
                return
            self._page = {'attrs': attrs, 'furniture': {}}
            self._stack = [(tag, None, True)]
            return

        node = None
        furniture = attrs.get('data-page-furniture')
        if furniture:
            node = {'tag': tag, 'attrs': attrs, 'text': []}
            self._page['furniture'].setdefault(furniture, []).append(node)
            self._captures.append(node)
        if tag not in _VOID_HTML_TAGS:
            self._stack.append((tag, node, False))

    def handle_startendtag(self, tag, raw_attrs):
        if self._page is None:
            return
        attrs = self._attrs(raw_attrs)
        furniture = attrs.get('data-page-furniture')
        if furniture:
            node = {'tag': tag.casefold(), 'attrs': attrs, 'text': []}
            self._page['furniture'].setdefault(furniture, []).append(node)

    def handle_data(self, data):
        for node in self._captures:
            node['text'].append(data)

    def handle_endtag(self, tag):
        if self._page is None:
            return
        tag = tag.casefold()
        match_index = next(
            (index for index in range(len(self._stack) - 1, -1, -1)
             if self._stack[index][0] == tag),
            None,
        )
        if match_index is None:
            return
        popped = self._stack[match_index:]
        del self._stack[match_index:]
        for _, node, _ in popped:
            if node is not None:
                self._captures = [item for item in self._captures if item is not node]
        if any(is_root for _, _, is_root in popped):
            self.pages.append(self._page)
            self._page = None
            self._stack = []
            self._captures = []

    def close(self):
        super().close()
        if self._page is not None:
            self.pages.append(self._page)
            self._page = None
            self._stack = []
            self._captures = []


def _page_shell_version(src):
    parser = _V5MarkerParser()
    parser.feed(src)
    parser.close()
    return parser.version


def _uses_v5_page_shell(src):
    """Backward-compatible probe retained for existing v5 lint consumers."""
    return _page_shell_version(src) == 'v5'


def _parse_v5_pages(src):
    parser = _V5PageShellParser()
    parser.feed(src)
    parser.close()
    return parser.pages


def _visible_text(markup):
    if isinstance(markup, list):
        markup = ' '.join(str(item) for item in markup)
    return html.unescape(re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', str(markup)))).strip()


def _v5_page_label(page, index):
    page_id = page['attrs'].get('data-page-id')
    return page_id or f'第 {index + 1} 页'


def _compact_color(value):
    compact = re.sub(r'\s+', '', value).lower()
    return re.sub(r'(?<=[,(])0\.', '.', compact)


def _load_color_token_values():
    token_path = os.path.realpath(os.path.join(os.path.dirname(__file__), '../assets/design-tokens.css'))
    with open(token_path, encoding='utf-8') as handle:
        css = handle.read()
    values = {}
    for token in COLOR_TOKEN_NAMES:
        match = re.search(rf'{re.escape(token)}\s*:\s*([^;]+);', css)
        if not match:
            raise RuntimeError(f'颜色 token 未定义: {token}')
        values[token] = _compact_color(match.group(1))
    return values


COLOR_TOKEN_VALUES = _load_color_token_values()


def _load_color_token_allowed_values():
    token_path = os.path.realpath(os.path.join(os.path.dirname(__file__), '../assets/design-tokens.css'))
    with open(token_path, encoding='utf-8') as handle:
        css = handle.read()
    return {
        token: {_compact_color(value) for value in re.findall(rf'{re.escape(token)}\s*:\s*([^;]+);', css)}
        for token in COLOR_TOKEN_NAMES
    }


COLOR_TOKEN_ALLOWED_VALUES = _load_color_token_allowed_values()


def _is_color_token_definition(src, start, raw):
    """主题 token 的定义值可出现一次；页面其余位置必须引用 var(--token)。"""
    line_start = src.rfind('\n', 0, start) + 1
    prefix = src[line_start:start]
    match = re.search(r'(--[a-z0-9-]+)\s*:\s*$', prefix, re.I)
    if not match:
        return False
    token = match.group(1).lower()
    return _compact_color(raw) in COLOR_TOKEN_ALLOWED_VALUES.get(token, set())


def _is_protected_reference(path):
    """已定档页面只作只读设计证据；复制或新建页面不继承这个历史代码豁免。"""
    root = os.path.realpath(os.path.join(os.path.dirname(__file__), '../../..'))
    actual = os.path.realpath(path)
    gallery_frames = (
        os.path.join(root, 'gallery/paper-ink/general/frames') + os.sep,
        os.path.join(root, 'gallery/paper-ink/ai/frames') + os.sep,
    )
    story = os.path.join(root, 'themes/paper-ink/examples/wise-ppt-story-six-page/index.html')
    return actual == story or any(actual.startswith(prefix) for prefix in gallery_frames)


def _parse_rgb(raw):
    body = raw[raw.find('(') + 1:raw.rfind(')')].strip()
    if re.search(r'[A-Za-z_$+]', body):
        return None
    parts = [part for part in re.split(r'\s*[,/]\s*|\s+', body) if part]
    if len(parts) not in {3, 4}:
        return None
    values = []
    for index, part in enumerate(parts):
        try:
            if part.endswith('%'):
                number = float(part[:-1]) / 100
                values.append(number if index == 3 else number * 255)
            else:
                values.append(float(part))
        except ValueError:
            return None
    if len(values) == 3:
        values.append(1.0)
    return tuple(values)


def _suggest_color(raw, parsed=None):
    lowered = _compact_color(raw)
    if lowered in {'#000', '#000000', '#000000ff', 'black'}:
        return '--ink；功能图形用 --ink-80'
    if lowered in {'#fff', '#ffffff', '#ffffffff', 'white'}:
        return '--paper；抬起面板用 --paper-panel'
    if parsed:
        r, g, b, alpha = parsed
        if max(abs(r - 25), abs(g - 25), abs(b - 23)) < 2:
            tiers = [(1, '--ink'), (.8, '--ink-80'), (.7, '--ink-70'), (.55, '--ink-55'),
                     (.45, '--ink-45'), (.25, '--ink-25'), (.12, '--ink-12')]
            return min(tiers, key=lambda item: abs(item[0] - alpha))[1]
        if max(abs(r - 255), abs(g - 255), abs(b - 255)) < 1:
            return '--paper-panel；无抬升语义则用 --paper'
        if max(abs(r - 192), abs(g - 57), abs(b - 43)) < 2:
            return '--accent-red（仅限已声明的语义焦点）'
    if lowered in COLOR_TOKEN_VALUES.values():
        return next(token for token, value in COLOR_TOKEN_VALUES.items() if value == lowered)
    return '--ink；仅已声明的语义焦点可用 --accent-red'

def lint_file(path):
    fails, warns = [], []
    with open(path, encoding='utf-8') as handle:
        src = handle.read()
    page_shell_version = _page_shell_version(src)
    v5_page_shell = bool(page_shell_version)
    v5_pages = _parse_v5_pages(src) if v5_page_shell else []
    # L1：颜色值只有 design-tokens.css 有定义权。已定档样页保留历史字面量，
    # 但豁免只绑定仓库原路径；复制、实例化或新建页面仍执行硬门禁。
    protected_reference = _is_protected_reference(path)
    if not protected_reference:
        for m in re.finditer(r'(?<![\w-])#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{4}|[0-9a-fA-F]{3})(?![\w-])', src):
            raw = m.group(0)
            if _is_color_token_definition(src, m.start(), raw):
                continue
            line = src[:m.start()].count('\n') + 1
            fails.append(f'L1 非法裸色 {raw} (line {line})；建议 {_suggest_color(raw)}')
        for m in re.finditer(r'rgba?\([^)]*\)', src, re.I):
            raw = m.group(0)
            if _is_color_token_definition(src, m.start(), raw):
                continue
            parsed = _parse_rgb(raw)
            line = src[:m.start()].count('\n') + 1
            if parsed is None:
                fails.append(f'L1 动态或非法 RGB {raw[:40]} (line {line})；必须读取主题 token')
            else:
                fails.append(f'L1 非法裸色 {raw} (line {line})；建议 {_suggest_color(raw, parsed)}')
        for m in re.finditer(r'(?<![.\w])(?:hsl|hsla|hwb|lab|lch|oklab|oklch|color)\([^)]*\)', src, re.I):
            line = src[:m.start()].count('\n') + 1
            fails.append(f'L1 非法颜色函数 {m.group(0)[:40]} (line {line})；建议 --ink')
        for m in re.finditer(r"(?:stroke|fill|color|background(?:-color)?)\s*[:=]\s*['\"]?\s*([a-z][a-z-]*)\b", src, re.I):
            name = m.group(1).lower()
            if name in NAMED_OK or name in COLOR_FUNCTIONS or name not in CSS_NAMED_COLORS:
                continue
            line = src[:m.start()].count('\n') + 1
            fails.append(f'L1 非法命名色 {name} (line {line})；建议 {_suggest_color(name)}')

    # L2 渐变/阴影/滤镜（硬停双拼填充不算渐变：如 50% 半填墨点）
    for pat, label in [(r'(?<!-)filter\s*:', 'filter')]:
        for m in re.finditer(pat, src):
            line = src[:m.start()].count('\n') + 1
            fails.append(f'L2 {label} (line {line})')
    for m in re.finditer(r'(?:linear|radial)-gradient\(([^;]*)\)', src):
        stops = m.group(1)
        if '50%' in stops and ('var(--ink)' in stops or '#191917' in stops) and 'transparent' in stops:
            continue  # 三态墨点半填技法（封面/图例可用）
        line = src[:m.start()].count('\n') + 1
        fails.append(f'L2 渐变 (line {line})')
    for m in re.finditer(r'box-shadow\s*:\s*([^;]+)', src):
        shadow = m.group(1).replace(' ', '')
        if not (
            shadow in {'var(--shadow-soft)', 'var(--shadow-specimen)'} or
            'rgba(25,25,23,.04)' in shadow or
            ('color-mix(' in shadow and 'var(--ink)' in shadow)
        ):
            line = src[:m.start()].count('\n') + 1
            fails.append(f'L2 box-shadow {m.group(1).strip()[:40]} (line {line})')

    # L3 粗线 ≥2px 多于一处（短 path 的 ✓/✗/手写符号笔触豁免）
    thick = 0
    for m in re.finditer(r"el\(\s*'(path|line|rect|circle)'\s*,\s*\{(.*?)\}\s*\)", src, re.S):
        body = m.group(2)
        wm = re.search(r"stroke-width['\"]?\s*:\s*['\"]?(\d+(?:\.\d+)?)", body)
        if not wm or float(wm.group(1)) < 2:
            continue
        dm = re.search(r"\bd\s*:\s*'([^']*)'", body)
        if m.group(1) == 'path' and dm and len(dm.group(1)) < 100:
            continue  # 符号笔触
        thick += 1
    if thick > 1:
        fails.append(f'L3 粗线(≥2px) {thick} 处，允许 ≤1（短 path 符号笔触已豁免）')

    # L4 中文长句落 mono：短标签可混排，长句会依赖不稳定 fallback，必须换 sans/serif。
    for m in re.finditer(r"txt\((.*?)\)", src, re.S):
        call = m.group(1)
        cjk_count = len(CJK.findall(call))
        if 'MONO' in call and cjk_count >= 8:
            line = src[:m.start()].count('\n') + 1
            snippet = re.sub(r'\s+', ' ', call)[:60]
            fails.append(f'L4 mono 内含中文长句（{cjk_count} 字）：txt({snippet}…) (line {line})')

    # L5 页面家具。只有显式 v5/v6 marker 才启用新合同；Gallery 与受保护样张
    # 即使局部出现同名 data 属性，也继续执行原有 legacy 三件套规则。
    if v5_page_shell:
        if not v5_pages:
            fails.append(f'L5 {page_shell_version} page shell marker 未找到 .slide 页面')
        for index, page in enumerate(v5_pages):
            label = _v5_page_label(page, index)
            furniture = page['furniture']
            for name in ('header', 'title', 'folio'):
                count = len(furniture.get(name, []))
                if count != 1:
                    fails.append(
                        f'L5 {page_shell_version} {label} 的 {name} 必须唯一，实际 {count} 个'
                    )
            mode = page['attrs'].get('data-conclusion-mode', '')
            conclusion_count = len(furniture.get('conclusion', []))
            if mode == 'bottom-statement':
                if conclusion_count != 1:
                    fails.append(
                        f'L5 {page_shell_version} {label} 的 bottom-statement 必须有唯一 conclusion，'
                        f'实际 {conclusion_count} 个'
                    )
            elif mode in {'none', 'hero-statement'}:
                if conclusion_count:
                    fails.append(
                        f'L5 {page_shell_version} {label} 的 {mode} 禁止 page-shell conclusion，'
                        f'实际 {conclusion_count} 个'
                    )
            else:
                fails.append(
                    f'L5 {page_shell_version} {label} 的 data-conclusion-mode 非法：{mode!r}'
                )
    else:
        if not re.search(r'class="doc\b[^"]*\btl\b|class="doc tl"', src):
            fails.append('L5 缺 .doc.tl 角注')
        if 'class="folio"' not in src:
            fails.append('L5 缺 .folio 页脚')
        page_role = re.search(r'data-page-role="([^"]+)"', src)
        layout = re.search(r'data-layout="([^"]+)"', src)
        caption_optional_layouts = {
            'paper-ink.scaffold.cover',
            'paper-ink.scaffold.particle-outro',
            'paper-ink.scaffold.minimal-outro',
            'paper-ink.scaffold.section-divider',
        }
        caption_optional = bool(
            (page_role and page_role.group(1) in {'hook', 'orient', 'close'}) or
            (layout and layout.group(1) in caption_optional_layouts)
        )
        if not caption_optional and not re.search(r'class="[^"]*\bcaption\b', src):
            fails.append('L5 无 .caption')

    # L6：不从几何重复推断语义错误。同尺寸 rect 可能是合法的矩阵、证据墙、
    # 表格或同行比较；关系正确性由 render plan、layout contract 与人工目检负责。

    # L7 三种 runtime 各有唯一缩放目标。正式 deck 只允许 runtime/stage-fit.js
    # 缩放 #deck-stage，页面片段不得保留 Gallery 的 stageFit() 或根舞台 inline transform。
    runtime_match = re.search(r'data-runtime="([^"]+)"', src)
    runtime = runtime_match.group(1) if runtime_match else ''
    allowed_runtimes = {'wise-ppt-deck', 'wise-ppt-gallery', 'wise-ppt-specimen'}
    if runtime not in allowed_runtimes:
        fails.append(f'L7 data-runtime 必须是 {sorted(allowed_runtimes)}')
    if runtime == 'wise-ppt-deck':
        if re.search(r'\bstageFit\s*\(', src):
            fails.append('L7 正式 deck 禁止调用 stageFit()；只能由 deck runtime 缩放 #deck-stage')
        for match in re.finditer(r'<(?:section|div|main)\b[^>]*class="[^"]*\b(?:slide|stage)\b[^"]*"[^>]*>', src, re.I):
            tag = match.group(0)
            style = re.search(r'\bstyle="([^"]*)"', tag, re.I)
            if style and re.search(r'\btransform\s*:', style.group(1), re.I):
                line = src[:match.start()].count('\n') + 1
                fails.append(f'L7 正式 slide/stage 禁止 inline transform (line {line})')
        if re.search(r"querySelector\(\s*['\"]\.stage['\"]\s*\).*?style\.transform", src, re.S):
            fails.append('L7 正式 deck 禁止脚本直接缩放 .stage')
    elif runtime == 'wise-ppt-gallery':
        if 'WisePPTStageFit.fitGallery' not in src or 'id="stagebox"' not in src:
            fails.append('L7 Gallery 必须只通过 WisePPTStageFit.fitGallery() 缩放 #stagebox')
    elif runtime == 'wise-ppt-specimen':
        if 'runtime/stage-fit.js' not in src or not re.search(r'\bstageFit\s*\(', src):
            fails.append('L7 独立样张必须加载唯一 runtime/stage-fit.js 并调用 stageFit()')

    # L9 深色页面底色（skill 拒绝暗色系：全部纸底纯色，墨只做线条与文字）
    def lum_of(token):
        token = token.strip().lower().replace(' ', '')
        hm = re.match(r'#([0-9a-f]{6})', token)
        if hm:
            h = hm.group(1)
            r, g, b = int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)
        else:
            rm = re.match(r'rgba?\(([^)]+)\)', token)
            if not rm:
                return None
            try:
                r, g, b = (float(p) for p in rm.group(1).split(',')[:3])
            except ValueError:
                return None
        return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
    for m in re.finditer(r'\.(stage|swiss-card)\s*\{([^}]*)\}|body\s*\{([^}]*)\}', src):
        rule = m.group(2) or m.group(3) or ''
        bm = re.search(r'background(?:-color)?\s*:\s*([^;}]+)', rule)
        if not bm or 'var(' in bm.group(1):
            continue
        lum = lum_of(bm.group(1))
        if lum is not None and lum < 0.5:
            line = src[:m.start()].count('\n') + 1
            fails.append(f'L9 深色页面底色 {bm.group(1).strip()[:24]} (line {line})：拒绝暗色系，必须纸底')

    # L10 全局字阶。布局只能选择语义 token，不能用局部字号补丁绕开类型系统。
    raw_type_patterns = (
        r'font-size\s*:\s*[0-9.]+px',
        r'font\s*:\s*(?:[^;{}]*\s)?[0-9.]+px(?:\s*/\s*[0-9.]+)?',
        r'["\']font-size["\']\s*:\s*["\']?[0-9.]+',
        r'font-size\s*=\s*["\'][0-9.]+',
        r'\bfontSize\s*:\s*[0-9.]+',
        r'\.font\s*=\s*["\'][^"\']*[0-9.]+px',
    )
    seen_raw_lines = set()
    for pattern in raw_type_patterns:
        for m in re.finditer(pattern, src):
            line = src[:m.start()].count('\n') + 1
            if line in seen_raw_lines:
                continue
            seen_raw_lines.add(line)
            fails.append(f'L10 裸字号（必须引用 --type-* token）(line {line})')
    for m in re.finditer(r'["\']font-size["\']\s*:\s*([^,}\n]+)', src):
        value = m.group(1)
        if (
            'var(--type-' in value
            or re.fullmatch(r"\s*WisePPT[.]typeSize\(\s*['\"][a-z-]+['\"]\s*\)\s*", value)
            or re.fullmatch(r"\s*paperInkTypeSize\(\s*['\"][a-z-]+['\"]\s*\)\s*", value)
        ):
            continue
        line = src[:m.start()].count('\n') + 1
        if line not in seen_raw_lines:
            seen_raw_lines.add(line)
            fails.append(f'L10 动态字号绕过字阶（必须引用 --type-* token）(line {line})')
    for m in re.finditer(r'var\(--type-([a-z-]+)\)', src):
        role = m.group(1)
        if role not in TYPE_ROLES:
            line = src[:m.start()].count('\n') + 1
            fails.append(f'L10 未声明字阶 --type-{role} (line {line})')
    for m in re.finditer(r"(?:WisePPT[.]typeSize|paperInkTypeSize)\(\s*['\"]([a-z-]+)['\"]\s*\)", src):
        role = m.group(1)
        if role not in TYPE_ROLES:
            line = src[:m.start()].count('\n') + 1
            fails.append(f'L10 未声明字阶 helper {role!r} (line {line})')
    for style_block in re.finditer(r'<style\b[^>]*>(.*?)</style>', src, re.S | re.I):
        css = style_block.group(1)
        for m in re.finditer(r'([^{}]+)\{[^{}]*var\(--type-micro-secondary\)[^{}]*\}', css, re.S):
            selector = re.sub(r'\s+', ' ', m.group(1)).strip().lower()
            if re.search(r'\b(?:body|caption|lead|verdict|title|heading|paragraph|copy)\b', selector):
                absolute_start = style_block.start(1) + m.start()
                line = src[:absolute_start].count('\n') + 1
                fails.append(f'L10 micro-secondary 只能用于元信息或次要表格说明 (line {line})')

    # L11 选择说明与页面文案分层。元数据只服务选版式，不得混入成品页角或结论。
    caption_meta = re.compile(
        r'当页面角色|优先复用|版式|布局|画册|样张|全\s*deck|几栏|几格|图题|主角|'
        r'兜底版式|兜底页型|用来|用于|一页讲清|严格对位|列阵|宫格|横带让|时间轴把|'
        r'环形进度环|分栏清单柱|同心防线用|嵌套变焦框表达|横向流水线解释|'
        r'循环圆环表达|蛇形回环装下|汇聚流把|漏斗只讲|^[A-O]\d+\s',
        re.I,
    )
    if v5_page_shell:
        conclusion_texts = [
            (_v5_page_label(page, index), _visible_text(node['text']))
            for index, page in enumerate(v5_pages)
            for node in page['furniture'].get('conclusion', [])
        ]
        for label, conclusion in conclusion_texts:
            if caption_meta.search(conclusion):
                fails.append(f'L11 {page_shell_version} {label} conclusion 混入版式选择或制作说明')
            if len(conclusion) > 52:
                fails.append(
                    f'L11 {page_shell_version} {label} conclusion 过长（{len(conclusion)} 字，允许 ≤52）'
                )
    else:
        caption_match = re.search(r'<[^>]+class="[^"]*\bcaption\b[^"]*"[^>]*>(.*?)</[^>]+>', src, re.S)
        if caption_match:
            caption = _visible_text(caption_match.group(1))
            if caption_meta.search(caption):
                fails.append('L11 caption 混入版式选择或制作说明')
            if len(caption) > 52:
                fails.append(f'L11 caption 过长（{len(caption)} 字，允许 ≤52）')

    doc_match = re.search(r'<[^>]+class="[^"]*\bdoc\b[^"]*\btl\b[^"]*"[^>]*>(.*?)</[^>]+>', src, re.S)
    if doc_match:
        doc = _visible_text(doc_match.group(1))
        if re.search(r'PAPER-INK\s+GALLERY|AI\s+LAYOUT\s+GALLERY|\bLAYOUT\b|\bMOCK\b', doc, re.I):
            fails.append('L11 doc tl 混入 gallery/layout/mock 元数据')

    # L12 禁止把彩色/平台相关 Emoji 当成图标。有限的纯文本方向和勾叉符号
    # 用于流程、状态或数学语义，不依赖 emoji presentation，允许保留。
    for match in EMOJI_GLYPH.finditer(src):
        glyph = match.group(0)
        if glyph in TEXT_SYMBOLS:
            continue
        line = src[:match.start()].count('\n') + 1
        fails.append(f'L12 Emoji {glyph!r}（请改用本地图标 registry 或自绘 SVG）(line {line})')

    # L13 data-typography-mode 枚举
    for m in re.finditer(r'data-typography-mode="([^"]+)"', src):
        if m.group(1) not in {'mixed', 'all-sans', 'all-serif'}:
            line = src[:m.start()].count('\n') + 1
            fails.append(f'L13 data-typography-mode 非法值 {m.group(1)!r} (line {line})')

    # L14 字体一律走 var(--serif/--sans/--mono/--brush)；canvas 语境
    # （ctx.font / fonts.load / ECharts fontFamily）不解析 CSS 变量，此类文件整页豁免。
    canvas_file = bool(re.search(r'ctx\.font|fonts\.load|echarts\.init', src))
    if not canvas_file:
        for m in re.finditer(r"'(?:Han Serif|Han Sans|Courier Prime|LXGW WenKai)'", src):
            line = src[:m.start()].count('\n') + 1
            fails.append(f'L14 字体字面量 {m.group(0)}（应引用 var(--*) token）(line {line})')

    # L15 v5/v6 动态页码无署名；legacy 与 Gallery 保持原格式和 code 绑定。
    if v5_page_shell:
        for index, page in enumerate(v5_pages):
            label = _v5_page_label(page, index)
            folios = page['furniture'].get('folio', [])
            if len(folios) != 1:
                continue  # 唯一性已由 L5 报告。
            folio = _visible_text(folios[0]['text'])
            if not re.fullmatch(r'\d{2} / \d{2}', folio):
                fails.append(
                    f'L15 {page_shell_version} {label} folio 格式应为 "NN / NN" 且无署名，实际 {folio!r}'
                )
    else:
        folio_match = re.search(r'class="folio"[^>]*>([^<]+)<', src)
        if folio_match:
            folio = folio_match.group(1).strip()
            base = os.path.basename(path)
            code_match = re.fullmatch(r'layout-([a-o]\d+)\.html', base)
            if code_match:
                want_prefix = code_match.group(1).upper() + ' / '
                if not folio.startswith(want_prefix) or ' — BY ' not in folio:
                    fails.append(f'L15 folio 格式应为 "{code_match.group(1).upper()} / {{总数}} — BY {{署名}}"，实际 {folio!r}')
            elif not re.fullmatch(r'\d+ / \d+ — BY \S.*', folio):
                fails.append(f'L15 folio 格式应为 "{{页码}} / {{总数}} — BY {{署名}}"，实际 {folio!r}')

    # L16 外链依赖（图标字体 / CDN）
    for m in re.finditer(r'(?:src|href)\s*=\s*["\']([^"\']+)["\']', src, re.I):
        url = m.group(1).lower()
        if re.search(r'font-?awesome|cdnjs|unpkg|jsdelivr|fonts\.googleapis|fonts\.gstatic|https?://', url):
            line = src[:m.start()].count('\n') + 1
            fails.append(f'L16 外链依赖 {m.group(1)[:60]}（只允许本地资产）(line {line})')

    # L17 颜色角色把“使用哪个透明度”收口为语义选择；关键 DOM/SVG 可由 runtime 复核 computed color。
    for m in re.finditer(r'data-color-role="([^"]+)"', src):
        role = m.group(1)
        if role not in COLOR_ROLES:
            line = src[:m.start()].count('\n') + 1
            fails.append(f'L17 未知颜色角色 {role!r} (line {line})')
            continue
        tag_start = src.rfind('<', 0, m.start())
        tag_end = src.find('>', m.end())
        tag = src[tag_start:tag_end + 1] if tag_start >= 0 and tag_end >= 0 else ''
        target = re.search(r'data-color-target="([^"]+)"', tag)
        if not target or target.group(1) not in COLOR_TARGETS:
            line = src[:m.start()].count('\n') + 1
            fails.append(f'L17 颜色角色 {role!r} 缺少合法 data-color-target (line {line})')
    for m in re.finditer(r"WisePPT[.]color\(\s*['\"]([^'\"]+)['\"]\s*\)", src):
        role = m.group(1)
        if role not in COLOR_ROLES:
            line = src[:m.start()].count('\n') + 1
            fails.append(f'L17 未知 WisePPT.color 角色 {role!r} (line {line})')

    # L18 识别视觉语义，不绑定具体版式：二值机器图形使用 functional；
    # 有序区域数据使用 recessed 底面和连续 data ramp。
    # 冻结参考页由 SHA-256 防漂移，不用新规则重新解释历史实现；复制或新建页面仍须通过 L18。
    if not protected_reference:
        qr_signal = re.search(r'data-qr-payload|\bpayload[.]qr\b|\bqrcode\b', src, re.I)
        functional_ink = (
            "WisePPT.color('functional')" in src
            or 'data-color-role="functional"' in src
            or 'var(--ink-80)' in src
            or bool(re.search(r'rgba\(\s*25\s*,\s*25\s*,\s*23\s*,\s*[.]?80?\s*\)', src, re.I))
        )
        if qr_signal and not functional_ink:
            fails.append('L18 机器可读二值图形必须使用 functional 颜色角色（建议 --ink-80）')
        map_signal = re.search(r'echarts[.]registerMap|\btype\s*:\s*[\'\"]map[\'\"]', src)
        if map_signal:
            if "WisePPT.color('surface-recessed')" not in src:
                fails.append('L18 有序区域数据必须用 surface-recessed 表示底图或无数据区域')
            data_roles = set(re.findall(r"WisePPT[.]color\(\s*['\"](data-[1-6])['\"]\s*\)", src))
            dynamic_ramp = bool(re.search(r"WisePPT[.]color\(\s*['\"]data-['\"]\s*\+", src))
            if len(data_roles) < 2 and not dynamic_ramp:
                fails.append('L18 有序区域数据必须使用连续 data-1..6 色阶，不能临时造色')

    # L19 caption 是跨页公共组件。页面只能放内容与位置关系，不能重新定义
    # 字体、字重、字号、颜色等固定视觉属性，避免 300/400 等局部冲突。
    if not protected_reference:
        fixed_caption_properties = (
            r'\b(?:font-family|font-size|font-style|font-weight|letter-spacing|line-height|color)\s*:'
        )
        for style_block in re.finditer(r'<style\b[^>]*>(.*?)</style>', src, re.S | re.I):
            css = style_block.group(1)
            for match in re.finditer(r'([^{}]*[.]caption[^{}]*)\{([^{}]*)\}', css, re.S):
                if re.search(fixed_caption_properties, match.group(2), re.I):
                    absolute_start = style_block.start(1) + match.start()
                    line = src[:absolute_start].count('\n') + 1
                    fails.append(f'L19 caption 固定视觉样式只能由 slide-components.css 定义 (line {line})')

    return fails, warns

def main():
    parser = argparse.ArgumentParser(description='纸墨主题静态机检')
    parser.add_argument('target', help='deck 目录、Gallery 目录或单个 HTML')
    parser.add_argument('--strict', action='store_true', help='将 WARN 视为失败')
    args = parser.parse_args()
    target = args.target
    strict = args.strict
    if os.path.isdir(target):
        frames = os.path.join(target, 'frames')
        files = sorted(
            os.path.join(frames, f) for f in os.listdir(frames)
            if re.fullmatch(r'layout-[a-z0-9]+\.html', f)  # Gallery 样页；跳过 -lab / -bak 等实验稿
        ) if os.path.isdir(frames) else []
        if not files and os.path.isfile(os.path.join(target, 'index.html')):
            files = [os.path.join(target, 'index.html')]
    else:
        files = [target]
    if not files:
        print('没有找到 index.html 或 Gallery layout-*.html')
        sys.exit(2)

    total_fail = total_warn = 0
    for f in files:
        fails, warns = lint_file(f)
        total_fail += len(fails)
        total_warn += len(warns)
        name = os.path.basename(f)
        if not fails and not warns:
            print(f'PASS  {name}')
            continue
        for x in fails:
            print(f'FAIL  {name}  {x}')
        for x in warns:
            print(f'WARN  {name}  {x}')
    print(f'\n{len(files)} 页：{total_fail} FAIL / {total_warn} WARN')
    if total_fail or (strict and total_warn):
        sys.exit(1)
    print('机检通过（仍须真实浏览器人工验收）')

if __name__ == '__main__':
    main()
