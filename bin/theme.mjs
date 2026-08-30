import path from "node:path";
import { canonicalJson, readJson, WisePPTError } from "./common.mjs";
const THEME_CONTRACT = "wise-ppt-theme@3";
const RESOLVED_THEME_CONTRACT = "wise-ppt-theme-resolved@3";
const THEME_REGISTRY_CONTRACT = "wise-ppt-theme-registry@1";
const THEME_ENGINE_DESIGN_TOKENS = "themes/engine/assets/design-tokens.css";
const REGISTERED_THEME_IDS = Object.freeze(["paper-ink", "hermes-orange", "klein-blue"]);
const TYPOGRAPHY_MODES = Object.freeze(["all-sans", "all-serif", "mixed"]);
const PUBLIC_TOKEN_ORDER = Object.freeze([
  "surface-canvas",
  "surface-recessed",
  "surface-panel",
  "primary",
  "functional",
  "body",
  "chart-label",
  "metadata",
  "divider",
  "construction",
  "focus",
  "focus-secondary",
  "focus-peripheral",
  "data-1",
  "data-2",
  "data-3",
  "data-4",
  "data-5",
  "data-6"
]);
const PRIVATE_TOKEN_ORDER = Object.freeze(["ink-60", "ink-30", "focus-text-small", "identity-accent"]);
const THEME_TYPE_ROLES = Object.freeze([
  "top-left-kicker",
  "bottom-left-folio",
  "bottom-takeaway",
  "zh-content-title",
  "cover-title",
  "chapter-title",
  "closing-statement",
  "en-content-title",
  "en-bold",
  "body",
  "label",
  "number",
  "chart-text"
]);
const FONT_FAMILIES = /* @__PURE__ */ new Set(["han-sans", "han-serif", "oswald", "mono", "brush"]);
const THEME_KEYS = /* @__PURE__ */ new Set([
  "contract",
  "theme_id",
  "name",
  "source",
  "recognition_anchor",
  "keywords",
  "evidence",
  "source_colors",
  "color_strategy",
  "surface",
  "typography",
  "page_treatments",
  "lines",
  "icons",
  "components",
  "exceptions"
]);
const ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const HEX = /^#[0-9A-Fa-f]{6}$/;
const CSS_COLOR = /^(?:#[0-9A-Fa-f]{6}|rgba?\(\s*\d+(?:\.\d+)?(?:\s*,\s*\d+(?:\.\d+)?){2}(?:\s*,\s*(?:0|1|0?\.\d+))?\s*\))$/;
const LOCAL_PATH = /(?:file:\/\/|[A-Za-z]:[\\/]|(?:^|\s)(?:~|\.{1,2})[\\/]|(?:^|\s)\/(?!\/))/i;
const PUBLIC_TOKEN_SET = new Set(PUBLIC_TOKEN_ORDER);
const LINE_TIER_ORDER = Object.freeze(["hairline", "detail", "main", "emphasis"]);
const SURFACE_MATERIAL_KEYS = Object.freeze(["paper", "recessed", "foreground", "ink", "reverse", "accent"]);
const SURFACE_LAYER_KEYS = Object.freeze(["texture", "texture_opacity", "texture_blend", "panel_depth", "shadow", "corner_radius_px"]);
const SURFACE_TEXTURES = /* @__PURE__ */ new Set(["none", "paper-dots", "fine-grain"]);
const SURFACE_BLENDS = /* @__PURE__ */ new Set(["normal", "multiply", "screen", "overlay"]);
const PANEL_DEPTHS = /* @__PURE__ */ new Set(["flat", "layered"]);
const SURFACE_SHADOWS = /* @__PURE__ */ new Set(["none", "soft"]);
const PAGE_CANVAS_ROLES = /* @__PURE__ */ new Set(["surface-canvas", "surface-recessed", "surface-panel"]);
const PAGE_ACCENT_ROLES = /* @__PURE__ */ new Set(["functional", "focus", "focus-secondary", "focus-peripheral", "data-1", "data-2", "data-3", "data-4", "data-5", "data-6"]);
const SOURCE_OSWALD_URL = "../fonts/catalog/Oswald-Bold-Latin.catalog.woff2";
const PUBLISHED_OSWALD_URL = "fonts/Oswald-Bold-Latin.catalog.woff2";
function projectThemeAssetForPublishedAssets(sourceRelative, source) {
  if (sourceRelative !== THEME_ENGINE_DESIGN_TOKENS) return source;
  const occurrences = source.split(SOURCE_OSWALD_URL).length - 1;
  if (occurrences !== 1) {
    throw new WisePPTError(`主题引擎 Oswald 源路径必须且只能登记一次: ${SOURCE_OSWALD_URL}`);
  }
  return source.replace(SOURCE_OSWALD_URL, PUBLISHED_OSWALD_URL);
}
function assertObject(value, label) {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new WisePPTError(`${label} 必须是对象`);
}
function exactKeys(value, keys, label) {
  const unknown = Object.keys(value).filter((key) => !keys.has(key));
  if (unknown.length) throw new WisePPTError(`${label} 未登记字段: ${unknown.sort().join(", ")}`);
}
function sameKeys(value, keys) {
  return canonicalJson(Object.keys(value).sort()) === canonicalJson([...keys].sort());
}
function text(value, label) {
  if (typeof value !== "string" || !value.trim()) throw new WisePPTError(`${label} 必须是非空字符串`);
  const result = value.trim();
  if (LOCAL_PATH.test(result)) throw new WisePPTError(`${label} 不得保存本机路径`);
  return result;
}
function normalizeHex(value, label) {
  if (typeof value !== "string" || !HEX.test(value)) throw new WisePPTError(`${label} 必须是 #RRGGBB`);
  return value.toUpperCase();
}
function normalizeCssColor(value, label) {
  if (typeof value !== "string" || !CSS_COLOR.test(value)) throw new WisePPTError(`${label} 必须是确定性的 HEX/RGB/RGBA 颜色`);
  return value.startsWith("#") ? value.toUpperCase() : value.replace(/\s+/g, " ").trim();
}
function textList(value, label, minimum, maximum) {
  if (!Array.isArray(value) || value.length < minimum || value.length > maximum) throw new WisePPTError(`${label} 必须包含 ${minimum}–${maximum} 项`);
  const result = value.map((item, index) => text(item, `${label}[${index + 1}]`));
  if (new Set(result.map((item) => item.toLowerCase())).size !== result.length) throw new WisePPTError(`${label} 不得重复`);
  return result;
}
function normalizeRoleRecipe(value, label) {
  if (!Array.isArray(value) || value.length !== 3) throw new WisePPTError(`${label} 必须是 [字体, 字重, 字号倍率]`);
  const [family, weight, sizeScale] = value;
  if (!FONT_FAMILIES.has(family)) throw new WisePPTError(`${label} 字体未登记: ${family}`);
  if (!Number.isInteger(weight) || weight < 100 || weight > 900 || weight % 100) throw new WisePPTError(`${label} 字重必须是 100–900 的百位整数`);
  if (typeof sizeScale !== "number" || !Number.isFinite(sizeScale) || sizeScale < 0.85 || sizeScale > 1.15) throw new WisePPTError(`${label} 字号倍率必须在 0.85–1.15`);
  return [family, weight, Number(sizeScale.toFixed(4))];
}
function normalizeTypography(value) {
  assertObject(value, "theme.typography");
  exactKeys(value, /* @__PURE__ */ new Set(["default_mode", "modes"]), "theme.typography");
  if (!TYPOGRAPHY_MODES.includes(value.default_mode)) throw new WisePPTError("theme.typography.default_mode 未登记");
  assertObject(value.modes, "theme.typography.modes");
  if (canonicalJson(Object.keys(value.modes).sort()) !== canonicalJson([...TYPOGRAPHY_MODES].sort())) throw new WisePPTError("theme.typography.modes 必须精确包含 all-sans、all-serif、mixed");
  const modes = {};
  for (const mode of TYPOGRAPHY_MODES) {
    const recipe = value.modes[mode];
    assertObject(recipe, `theme.typography.modes.${mode}`);
    exactKeys(recipe, /* @__PURE__ */ new Set(["roles"]), `theme.typography.modes.${mode}`);
    assertObject(recipe.roles, `theme.typography.modes.${mode}.roles`);
    if (canonicalJson(Object.keys(recipe.roles).sort()) !== canonicalJson([...THEME_TYPE_ROLES].sort())) throw new WisePPTError(`theme.typography.modes.${mode}.roles 必须精确登记 ${THEME_TYPE_ROLES.length} 个语义位置`);
    modes[mode] = { roles: Object.fromEntries(THEME_TYPE_ROLES.map((role) => [role, normalizeRoleRecipe(recipe.roles[role], `theme.typography.modes.${mode}.roles.${role}`)])) };
  }
  return { default_mode: value.default_mode, modes };
}
function normalizeEvidence(value) {
  assertObject(value, "theme.evidence");
  const keys = ["representative_visuals", "repeated_motifs", "mood", "season", "light", "space", "typography_contrast", "line_evidence", "icon_evidence", "component_evidence"];
  const missing = keys.filter((key) => !(key in value));
  if (missing.length) throw new WisePPTError(`theme.evidence 缺少轴: ${missing.join(", ")}`);
  const unknown = Object.keys(value).filter((key) => !keys.includes(key));
  if (unknown.length) throw new WisePPTError(`theme.evidence 未登记字段: ${unknown.join(", ")}`);
  return {
    representative_visuals: textList(value.representative_visuals, "theme.evidence.representative_visuals", 1, 8),
    repeated_motifs: textList(value.repeated_motifs, "theme.evidence.repeated_motifs", 1, 12),
    ...Object.fromEntries(keys.slice(2).map((key) => [key, text(value[key], `theme.evidence.${key}`)]))
  };
}
function normalizeColorStrategy(value) {
  assertObject(value, "theme.color_strategy");
  if (value.strategy === "fixed") {
    exactKeys(value, /* @__PURE__ */ new Set(["strategy", "semantic_roles", "private_roles"]), "theme.color_strategy");
    assertObject(value.semantic_roles, "theme.color_strategy.semantic_roles");
    if (!sameKeys(value.semantic_roles, PUBLIC_TOKEN_ORDER)) throw new WisePPTError("theme.color_strategy.semantic_roles 必须精确映射 19 个角色");
    assertObject(value.private_roles, "theme.color_strategy.private_roles");
    if (!sameKeys(value.private_roles, PRIVATE_TOKEN_ORDER)) throw new WisePPTError("theme.color_strategy.private_roles 必须精确映射私有角色");
    return {
      strategy: "fixed",
      semantic_roles: Object.fromEntries(PUBLIC_TOKEN_ORDER.map((role) => [role, normalizeCssColor(value.semantic_roles[role], `theme.color_strategy.semantic_roles.${role}`)])),
      private_roles: Object.fromEntries(PRIVATE_TOKEN_ORDER.map((role) => [role, normalizeCssColor(value.private_roles[role], `theme.color_strategy.private_roles.${role}`)]))
    };
  }
  if (value.strategy !== "derive-oklch") throw new WisePPTError(`theme.color_strategy.strategy 未登记: ${value.strategy}`);
  exactKeys(value, /* @__PURE__ */ new Set(["strategy", "identity_index", "surface_mode"]), "theme.color_strategy");
  if (!Number.isInteger(value.identity_index) || value.identity_index < 0 || value.identity_index > 7) throw new WisePPTError("theme.color_strategy.identity_index 必须是来源色下标");
  if (!["light", "dark"].includes(value.surface_mode)) throw new WisePPTError("theme.color_strategy.surface_mode 必须是 light 或 dark");
  return { strategy: "derive-oklch", identity_index: value.identity_index, surface_mode: value.surface_mode };
}
function normalizeSurface(value) {
  assertObject(value, "theme.surface");
  exactKeys(value, /* @__PURE__ */ new Set(["mode", "materials", "layers"]), "theme.surface");
  if (!["light", "dark"].includes(value.mode)) throw new WisePPTError("theme.surface.mode 必须是 light 或 dark");
  assertObject(value.materials, "theme.surface.materials");
  if (!sameKeys(value.materials, SURFACE_MATERIAL_KEYS)) throw new WisePPTError("theme.surface.materials 必须精确登记六个材料角色");
  const materials = Object.fromEntries(SURFACE_MATERIAL_KEYS.map((key) => {
    const role = text(value.materials[key], `theme.surface.materials.${key}`);
    if (!PUBLIC_TOKEN_SET.has(role)) throw new WisePPTError(`theme.surface.materials.${key} 引用了未登记语义色: ${role}`);
    return [key, role];
  }));
  assertObject(value.layers, "theme.surface.layers");
  if (!sameKeys(value.layers, SURFACE_LAYER_KEYS)) throw new WisePPTError("theme.surface.layers 必须精确登记纹理与层级轴");
  const { texture, texture_opacity: opacity, texture_blend: blend, panel_depth: depth, shadow, corner_radius_px: radius } = value.layers;
  if (!SURFACE_TEXTURES.has(texture)) throw new WisePPTError(`theme.surface.layers.texture 未登记: ${texture}`);
  if (!SURFACE_BLENDS.has(blend)) throw new WisePPTError(`theme.surface.layers.texture_blend 未登记: ${blend}`);
  if (!PANEL_DEPTHS.has(depth)) throw new WisePPTError(`theme.surface.layers.panel_depth 未登记: ${depth}`);
  if (!SURFACE_SHADOWS.has(shadow)) throw new WisePPTError(`theme.surface.layers.shadow 未登记: ${shadow}`);
  if (typeof opacity !== "number" || !Number.isFinite(opacity) || opacity < 0 || opacity > 1) throw new WisePPTError("theme.surface.layers.texture_opacity 必须在 0–1");
  if (typeof radius !== "number" || !Number.isFinite(radius) || radius < 0 || radius > 64) throw new WisePPTError("theme.surface.layers.corner_radius_px 必须在 0–64");
  return { mode: value.mode, materials, layers: { texture, texture_opacity: opacity, texture_blend: blend, panel_depth: depth, shadow, corner_radius_px: radius } };
}
function normalizePageTreatments(value) {
  assertObject(value, "theme.page_treatments");
  exactKeys(value, /* @__PURE__ */ new Set(["cover", "relationship"]), "theme.page_treatments");
  const { cover, relationship } = value;
  for (const [key, entry, field] of [["cover", cover, "canvas"], ["relationship", relationship, "accent"]]) {
    assertObject(entry, `theme.page_treatments.${key}`);
    exactKeys(entry, /* @__PURE__ */ new Set([field]), `theme.page_treatments.${key}`);
  }
  const canvas = text(cover.canvas, "cover.canvas");
  const accent = text(relationship.accent, "relationship.accent");
  if (!PAGE_CANVAS_ROLES.has(canvas)) throw new WisePPTError(`cover.canvas 未登记: ${canvas}`);
  if (!PAGE_ACCENT_ROLES.has(accent)) throw new WisePPTError(`relationship.accent 未登记: ${accent}`);
  return { cover: { canvas }, relationship: { accent } };
}
function normalizeLines(value) {
  assertObject(value, "theme.lines");
  exactKeys(value, /* @__PURE__ */ new Set(["tiers", "colors", "cap", "join", "minimum_contrast"]), "theme.lines");
  assertObject(value.tiers, "theme.lines.tiers");
  if (!sameKeys(value.tiers, LINE_TIER_ORDER)) throw new WisePPTError("theme.lines.tiers 必须精确登记四档线宽");
  const widths = LINE_TIER_ORDER.map((role) => value.tiers[role]);
  if (widths.some((width) => typeof width !== "number" || !Number.isFinite(width) || width <= 0) || widths.some((width, index) => index && width <= widths[index - 1])) throw new WisePPTError("theme.lines.tiers 必须是严格递增的四档正数");
  assertObject(value.colors, "theme.lines.colors");
  if (!sameKeys(value.colors, ["structural", "focus", "divider"])) throw new WisePPTError("theme.lines.colors 必须精确登记 structural、focus、divider");
  const colors = Object.fromEntries(["structural", "focus", "divider"].map((key) => {
    const role = text(value.colors[key], `theme.lines.colors.${key}`);
    if (!PUBLIC_TOKEN_SET.has(role)) throw new WisePPTError(`theme.lines.colors.${key} 引用了未登记语义色: ${role}`);
    return [key, role];
  }));
  if (!["round", "butt", "square"].includes(value.cap)) throw new WisePPTError("theme.lines.cap 未登记");
  if (!["round", "miter", "bevel"].includes(value.join)) throw new WisePPTError("theme.lines.join 未登记");
  if (typeof value.minimum_contrast !== "number" || value.minimum_contrast < 3) throw new WisePPTError("theme.lines.minimum_contrast 至少为 3");
  return { tiers: Object.fromEntries(LINE_TIER_ORDER.map((role, index) => [role, widths[index]])), colors, cap: value.cap, join: value.join, minimum_contrast: value.minimum_contrast };
}
function normalizeIcons(value) {
  assertObject(value, "theme.icons");
  exactKeys(value, /* @__PURE__ */ new Set(["drawing", "stroke_tiers", "color_role", "carrier", "grouping", "rhythm", "capabilities", "unregistered"]), "theme.icons");
  if (!["outline", "solid", "duotone"].includes(value.drawing)) throw new WisePPTError(`theme.icons.drawing 未登记: ${value.drawing}`);
  if (!["none", "circle", "square", "card"].includes(value.carrier)) throw new WisePPTError(`theme.icons.carrier 未登记: ${value.carrier}`);
  if (!["native", "functional-neighbor", "grouped"].includes(value.grouping)) throw new WisePPTError(`theme.icons.grouping 未登记: ${value.grouping}`);
  if (!["measured", "compact", "spacious"].includes(value.rhythm)) throw new WisePPTError(`theme.icons.rhythm 未登记: ${value.rhythm}`);
  if (canonicalJson(value.stroke_tiers) !== canonicalJson(LINE_TIER_ORDER)) throw new WisePPTError("theme.icons.stroke_tiers 必须使用登记的四档线宽");
  const colorRole = text(value.color_role, "theme.icons.color_role");
  if (!PUBLIC_TOKEN_SET.has(colorRole)) throw new WisePPTError(`theme.icons.color_role 未登记: ${colorRole}`);
  const capabilities = textList(value.capabilities, "theme.icons.capabilities", 1, 8);
  if (value.unregistered !== "preserve-and-report") throw new WisePPTError("theme.icons.unregistered 必须保持 preserve-and-report");
  return { drawing: value.drawing, stroke_tiers: [...LINE_TIER_ORDER], color_role: colorRole, carrier: value.carrier, grouping: value.grouping, rhythm: value.rhythm, capabilities, unregistered: value.unregistered };
}
function normalizeComponents(value) {
  assertObject(value, "theme.components");
  exactKeys(value, /* @__PURE__ */ new Set(["table", "card", "panel", "application"]), "theme.components");
  assertObject(value.table, "theme.components.table");
  assertObject(value.card, "theme.components.card");
  assertObject(value.panel, "theme.components.panel");
  exactKeys(value.table, /* @__PURE__ */ new Set(["header", "body", "selected"]), "theme.components.table");
  exactKeys(value.card, /* @__PURE__ */ new Set(["surface", "border"]), "theme.components.card");
  exactKeys(value.panel, /* @__PURE__ */ new Set(["surface", "border"]), "theme.components.panel");
  const surfaces = /* @__PURE__ */ new Set(["transparent", "paper", "recessed", "foreground"]);
  const borders = /* @__PURE__ */ new Set(["none", "structural", "focus", "focus-outline"]);
  for (const [key, entry] of Object.entries({ header: value.table.header, body: value.table.body, "card.surface": value.card.surface, "panel.surface": value.panel.surface })) {
    if (!surfaces.has(entry)) throw new WisePPTError(`theme.components.${key} 材料未登记: ${entry}`);
  }
  for (const [key, entry] of Object.entries({ selected: value.table.selected, "card.border": value.card.border, "panel.border": value.panel.border })) {
    if (!borders.has(entry)) throw new WisePPTError(`theme.components.${key} 边框未登记: ${entry}`);
  }
  if (value.application !== "explicit-semantic-regions-only") throw new WisePPTError("theme.components.application 必须是 explicit-semantic-regions-only");
  return structuredClone(value);
}
function normalizeExceptions(value) {
  assertObject(value, "theme.exceptions");
  exactKeys(value, /* @__PURE__ */ new Set(["hollow_number", "reverse", "unregistered_icon", "undeclared_component_state"]), "theme.exceptions");
  assertObject(value.hollow_number, "theme.exceptions.hollow_number");
  assertObject(value.reverse, "theme.exceptions.reverse");
  exactKeys(value.hollow_number, /* @__PURE__ */ new Set(["fill", "stroke", "text"]), "theme.exceptions.hollow_number");
  exactKeys(value.reverse, /* @__PURE__ */ new Set(["surface", "text"]), "theme.exceptions.reverse");
  for (const [key, role] of [["stroke", value.hollow_number.stroke], ["text", value.hollow_number.text]]) {
    if (!PUBLIC_TOKEN_SET.has(role)) throw new WisePPTError(`theme.exceptions.${key} 引用了未登记语义色: ${role}`);
  }
  for (const [key, material] of [["reverse.surface", value.reverse.surface], ["reverse.text", value.reverse.text]]) {
    if (!SURFACE_MATERIAL_KEYS.includes(material)) throw new WisePPTError(`theme.exceptions.${key} 引用了未登记材料: ${material}`);
  }
  if (value.hollow_number.fill !== "none" || value.unregistered_icon !== "preserve" || value.undeclared_component_state !== "preserve-and-report") throw new WisePPTError("theme.exceptions 必须保留空心、未登记 Icon 与未声明组件状态");
  return structuredClone(value);
}
function normalizeTheme(input) {
  assertObject(input, "theme");
  exactKeys(input, THEME_KEYS, "theme");
  if (input.contract !== THEME_CONTRACT) throw new WisePPTError(`theme.contract 必须是 ${THEME_CONTRACT}`);
  const themeId = text(input.theme_id, "theme.theme_id");
  if (!ID.test(themeId)) throw new WisePPTError("theme.theme_id 必须是稳定的小写 ASCII kebab-case ID");
  assertObject(input.source, "theme.source");
  exactKeys(input.source, /* @__PURE__ */ new Set(["kind", "label"]), "theme.source");
  if (!(/* @__PURE__ */ new Set(["registered", "pdf", "ppt", "image", "logo", "mixed", "manual"])).has(input.source.kind)) throw new WisePPTError(`theme.source.kind 未登记: ${input.source.kind}`);
  const sourceColors = textList(input.source_colors, "theme.source_colors", 5, 8).map((value, index) => normalizeHex(value, `theme.source_colors[${index + 1}]`));
  if (new Set(sourceColors).size !== sourceColors.length) throw new WisePPTError("theme.source_colors 不得包含重复颜色");
  const keywords = textList(input.keywords, "theme.keywords", 3, 3);
  if (keywords.some((keyword) => !/^[A-Za-z][A-Za-z0-9 -]*$/.test(keyword))) throw new WisePPTError("theme.keywords 必须是三个具体英文关键词");
  const surface = normalizeSurface(input.surface);
  const colorStrategy = normalizeColorStrategy(input.color_strategy);
  if (colorStrategy.strategy === "derive-oklch" && colorStrategy.identity_index >= sourceColors.length) throw new WisePPTError("theme.color_strategy.identity_index 超出 source_colors");
  if (colorStrategy.strategy === "derive-oklch" && colorStrategy.surface_mode !== surface.mode) throw new WisePPTError("素材主题的 color_strategy.surface_mode 必须与 surface.mode 一致");
  const lines = normalizeLines(input.lines);
  const icons = normalizeIcons(input.icons);
  const components = normalizeComponents(input.components);
  const exceptions = normalizeExceptions(input.exceptions);
  const pageTreatments = normalizePageTreatments(input.page_treatments);
  return {
    ...structuredClone(input),
    theme_id: themeId,
    name: text(input.name, "theme.name"),
    source: { kind: input.source.kind, label: text(input.source.label, "theme.source.label") },
    recognition_anchor: text(input.recognition_anchor, "theme.recognition_anchor"),
    keywords,
    evidence: normalizeEvidence(input.evidence),
    source_colors: sourceColors,
    color_strategy: colorStrategy,
    surface,
    page_treatments: pageTreatments,
    typography: normalizeTypography(input.typography),
    lines,
    icons,
    components,
    exceptions
  };
}
function hexToRgb(value) {
  return [1, 3, 5].map((offset) => Number.parseInt(value.slice(offset, offset + 2), 16) / 255);
}
function srgbToLinear(value) {
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}
function linearToSrgb(value) {
  return value <= 31308e-7 ? 12.92 * value : 1.055 * value ** (1 / 2.4) - 0.055;
}
function byteHex(value) {
  return Math.round(Math.min(1, Math.max(0, linearToSrgb(value))) * 255).toString(16).padStart(2, "0").toUpperCase();
}
function rgbToOklch(rgb) {
  const [r, g, b] = rgb.map(srgbToLinear);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const labB = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  return { L, C: Math.hypot(a, labB), h: (Math.atan2(labB, a) * 180 / Math.PI + 360) % 360 };
}
function oklchToLinearRgb({ L, C, h }) {
  const radians = h * Math.PI / 180;
  const a = C * Math.cos(radians);
  const labB = C * Math.sin(radians);
  const l = (L + 0.3963377774 * a + 0.2158037573 * labB) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * labB) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * labB) ** 3;
  return [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s, -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s];
}
function oklchToHex(input) {
  const base = { L: Math.min(1, Math.max(0, input.L)), C: Math.max(0, input.C), h: input.h };
  let rgb = oklchToLinearRgb(base);
  const inGamut = (candidate) => candidate.every((item) => item >= -1e-7 && item <= 1.0000001);
  if (!inGamut(rgb)) {
    let low = 0;
    let high = base.C;
    for (let i = 0; i < 26; i += 1) {
      const middle = (low + high) / 2;
      const candidate = oklchToLinearRgb({ ...base, C: middle });
      if (inGamut(candidate)) {
        low = middle;
        rgb = candidate;
      } else high = middle;
    }
  }
  return `#${rgb.map(byteHex).join("")}`;
}
function tone(seed, lightness, cap = 0.18, scale = 1) {
  const value = rgbToOklch(hexToRgb(seed));
  return oklchToHex({ L: lightness, C: Math.min(value.C * scale, cap), h: value.h });
}
function luminance(value) {
  const [r, g, b] = hexToRgb(value).map(srgbToLinear);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function contrastRatio(foreground, background) {
  const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
}
function contrastSafe(seed, backgrounds, minimum, targetLightness, direction, adjustments, role) {
  let lightness = targetLightness;
  let candidate = tone(seed, lightness, 0.14);
  while (Math.min(...backgrounds.map((background) => contrastRatio(candidate, background))) < minimum && lightness > 0.02 && lightness < 0.98) {
    lightness += direction === "light" ? 5e-3 : -5e-3;
    candidate = tone(seed, lightness, 0.14);
  }
  if (Math.min(...backgrounds.map((background) => contrastRatio(candidate, background))) < minimum) candidate = direction === "light" ? "#FFFFFF" : "#000000";
  if (candidate !== seed) adjustments.push({ role, source: seed, resolved: candidate, reason: `OKLCH adjusted for ${minimum}:1 contrast` });
  return candidate;
}
function opaqueColor(value, background = "#FFFFFF") {
  if (HEX.test(value)) return value.toUpperCase();
  const match = String(value).match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)$/);
  if (!match) return "#000000";
  const alpha = match[4] === void 0 ? 1 : Number(match[4]);
  const bg = hexToRgb(background).map((item) => item * 255);
  return `#${[1, 2, 3].map((index) => Math.round(Number(match[index]) * alpha + bg[index - 1] * (1 - alpha)).toString(16).padStart(2, "0")).join("").toUpperCase()}`;
}
function deriveTokens(theme) {
  const colors = theme.source_colors;
  const ranked = colors.map((value) => ({ value, ...rgbToOklch(hexToRgb(value)) }));
  const light = [...ranked].sort((a, b) => b.L - a.L)[0].value;
  const dark = [...ranked].sort((a, b) => a.L - b.L)[0].value;
  const identity = colors[theme.color_strategy.identity_index];
  if (!identity) throw new WisePPTError("theme.color_strategy.identity_index 超出 source_colors");
  const chromatic = [...ranked].sort((a, b) => b.C - a.C).map((item) => item.value);
  const companion = chromatic.find((item) => item !== identity) || colors[1];
  const contrast = colors.find((item) => ![light, dark, identity, companion].includes(item)) || companion;
  const darkSurface = theme.color_strategy.surface_mode === "dark";
  const surfaceSeed = darkSurface ? dark : light;
  const textSeed = darkSurface ? light : dark;
  const surfaceCanvas = tone(surfaceSeed, darkSurface ? 0.19 : 0.97, darkSurface ? 0.065 : 0.025, 0.6);
  const surfaceRecessed = tone(surfaceSeed, darkSurface ? 0.25 : 0.93, darkSurface ? 0.075 : 0.035, 0.7);
  const surfacePanel = tone(surfaceSeed, darkSurface ? 0.31 : 0.99, darkSurface ? 0.085 : 0.018, 0.5);
  const backgrounds = [surfaceCanvas, surfaceRecessed, surfacePanel];
  const adjustments = [];
  const direction = darkSurface ? "light" : "dark";
  const primary = contrastSafe(textSeed, backgrounds, 4.5, darkSurface ? 0.94 : 0.22, direction, adjustments, "primary");
  const body = contrastSafe(textSeed, backgrounds, 4.5, darkSurface ? 0.86 : 0.29, direction, adjustments, "body");
  const focus = contrastSafe(identity, backgrounds, 3, darkSurface ? 0.72 : 0.47, direction, adjustments, "focus");
  const focusSmall = contrastSafe(identity, backgrounds, 4.5, darkSurface ? 0.82 : 0.38, direction, adjustments, "focus-text-small");
  const data = [0.82, 0.75, 0.68, 0.61, 0.54, 0.47].map((L, index) => tone(index % 2 ? companion : identity, darkSurface ? 1 - (L - 0.35) : L, 0.14, 0.9));
  return {
    semantic: {
      "surface-canvas": surfaceCanvas,
      "surface-recessed": surfaceRecessed,
      "surface-panel": surfacePanel,
      primary,
      functional: contrastSafe(textSeed, backgrounds, 3, darkSurface ? 0.75 : 0.4, direction, adjustments, "functional"),
      body,
      "chart-label": body,
      metadata: body,
      divider: tone(textSeed, darkSurface ? 0.62 : 0.55, 0.035),
      construction: tone(contrast, darkSurface ? 0.42 : 0.83, 0.05),
      focus,
      "focus-secondary": tone(identity, darkSurface ? 0.67 : 0.42, 0.16),
      "focus-peripheral": tone(companion, darkSurface ? 0.61 : 0.36, 0.14),
      ...Object.fromEntries(data.map((value, index) => [`data-${index + 1}`, value]))
    },
    private: { "ink-60": tone(textSeed, darkSurface ? 0.74 : 0.4, 0.04), "ink-30": tone(textSeed, darkSurface ? 0.57 : 0.62, 0.03), "focus-text-small": focusSmall, "identity-accent": identity },
    adjustments
  };
}
function resolveTheme(input) {
  const definition = normalizeTheme(input);
  const projected = definition.color_strategy.strategy === "fixed" ? { semantic: definition.color_strategy.semantic_roles, private: definition.color_strategy.private_roles, adjustments: [] } : deriveTokens(definition);
  const surface = opaqueColor(projected.semantic["surface-canvas"]);
  const structuralRole = definition.lines.colors.structural;
  const checks = [["primary", 4.5, "正文与小字"], ["body", 4.5, "正文"], ["chart-label", 4.5, "图表文字"], ["focus", 3, "关键图形"], ["focus-text-small", 4.5, "小号强调文字"], ["structural-line", 3, "承担信息的结构线"]].map(([role, minimum, usage]) => {
    const value = role === "focus-text-small" ? projected.private[role] : role === "structural-line" ? projected.semantic[structuralRole] : projected.semantic[role];
    const ratio = contrastRatio(opaqueColor(value, surface), surface);
    return { role, foreground: value, background: projected.semantic["surface-canvas"], minimum, ratio: Number(ratio.toFixed(3)), usage, pass: ratio + 1e-9 >= minimum };
  });
  const coverCanvas = projected.semantic[definition.page_treatments.cover.canvas];
  const relationshipAccent = projected.semantic[definition.page_treatments.relationship.accent];
  for (const [role, foreground, background, minimum, usage] of [
    ["cover-body", projected.semantic.body, coverCanvas, 4.5, "封面正文"],
    ["relationship-accent", relationshipAccent, projected.semantic["surface-canvas"], 3, "关系页主题强调"]
  ]) {
    const ratio = contrastRatio(opaqueColor(foreground, opaqueColor(background)), opaqueColor(background));
    checks.push({ role, foreground, background, minimum, ratio: Number(ratio.toFixed(3)), usage, pass: ratio + 1e-9 >= minimum });
  }
  if (definition.color_strategy.strategy === "derive-oklch" && checks.some((item) => !item.pass)) throw new WisePPTError("素材主题无法收敛到对比度门槛");
  return {
    contract: RESOLVED_THEME_CONTRACT,
    theme_id: definition.theme_id,
    name: definition.name,
    definition,
    method: { color_space: definition.color_strategy.strategy === "derive-oklch" ? "OKLCH" : "fixed-verified", gamut: "sRGB", text_contrast_minimum: 4.5, key_graphic_contrast_minimum: 3 },
    tokens: Object.fromEntries(PUBLIC_TOKEN_ORDER.map((role) => [role, projected.semantic[role]])),
    private_tokens: Object.fromEntries(PRIVATE_TOKEN_ORDER.map((role) => [role, projected.private[role]])),
    surface: structuredClone(definition.surface),
    page_treatments: structuredClone(definition.page_treatments),
    typography: structuredClone(definition.typography),
    lines: structuredClone(definition.lines),
    icons: structuredClone(definition.icons),
    components: structuredClone(definition.components),
    exceptions: structuredClone(definition.exceptions),
    renderers: {
      svg: { colors: "tokens", line_widths: structuredClone(definition.lines.tiers), fonts: "typography.roles" },
      canvas: { colors: "tokens", line_widths: structuredClone(definition.lines.tiers), fonts: "typography.roles" },
      echarts: { colors: PUBLIC_TOKEN_ORDER.filter((role) => role.startsWith("data-")), line_widths: structuredClone(definition.lines.tiers), fonts: "typography.roles" }
    },
    contrast_checks: checks,
    adjustments: projected.adjustments
  };
}
async function themeRegistry(root) {
  const registry = await readJson(path.join(root, "themes/registry.json"), "theme registry");
  if (registry.contract !== THEME_REGISTRY_CONTRACT || !Array.isArray(registry.themes)) throw new WisePPTError("theme registry 合同错误");
  if (canonicalJson(registry.themes.map((item) => item.theme_id)) !== canonicalJson(REGISTERED_THEME_IDS)) throw new WisePPTError("theme registry 必须精确登记三个固定主题");
  return registry;
}
async function loadRegisteredTheme(root, themeId) {
  if (!REGISTERED_THEME_IDS.includes(themeId)) throw new WisePPTError(`未登记 theme_id: ${themeId}`);
  const registry = await themeRegistry(root);
  const entry = registry.themes.find((item) => item.theme_id === themeId);
  const definition = await readJson(path.join(root, entry.definition), `theme ${themeId}`);
  if (definition.theme_id !== themeId) throw new WisePPTError(`theme registry 与定义 ID 不一致: ${themeId}`);
  return normalizeTheme(definition);
}
async function resolveDeckTheme(root, value) {
  assertObject(value, "deck.theme");
  if (value.kind === "registered") {
    exactKeys(value, /* @__PURE__ */ new Set(["kind", "theme_id"]), "deck.theme");
    return resolveTheme(await loadRegisteredTheme(root, text(value.theme_id, "deck.theme.theme_id")));
  }
  if (value.kind === "inline") {
    exactKeys(value, /* @__PURE__ */ new Set(["kind", "definition"]), "deck.theme");
    return resolveTheme(value.definition);
  }
  throw new WisePPTError("deck.theme.kind 必须是 registered 或 inline");
}
function familyCss(value) {
  return { "han-sans": "var(--wp-font-han-sans)", "han-serif": "var(--wp-font-han-serif)", oswald: "var(--wp-font-oswald)", mono: "var(--wp-font-mono)", brush: "var(--wp-font-brush)" }[value];
}
function componentSurface(value) {
  return { transparent: "transparent", paper: "var(--wp-color-surface-canvas)", recessed: "var(--wp-color-surface-recessed)", foreground: "var(--wp-color-surface-panel)", ink: "var(--wp-color-primary)" }[value] || "transparent";
}
function componentBorder(value, resolved) {
  return { none: "transparent", structural: `var(--wp-color-${resolved.lines.colors.structural})`, focus: "var(--wp-color-focus)", "focus-outline": "var(--wp-color-focus)" }[value] || "transparent";
}
function textureBackground(value) {
  if (value === "none") return "none";
  if (value === "fine-grain") return "radial-gradient(circle at 22% 31%, color-mix(in srgb, var(--wp-color-primary) 7%, transparent) 0 0.35px, transparent 0.55px), radial-gradient(circle at 71% 64%, color-mix(in srgb, var(--wp-color-primary) 5%, transparent) 0 0.3px, transparent 0.5px)";
  return "radial-gradient(circle at 18% 24%, color-mix(in srgb, var(--wp-color-primary) 2.5%, transparent) 0 0.55px, transparent 0.8px), radial-gradient(circle at 76% 68%, color-mix(in srgb, var(--wp-color-primary) 2%, transparent) 0 0.45px, transparent 0.75px)";
}
function renderThemeCss(resolved) {
  if (!resolved || resolved.contract !== RESOLVED_THEME_CONTRACT) throw new WisePPTError(`resolved theme 合同必须是 ${RESOLVED_THEME_CONTRACT}`);
  if (canonicalJson(Object.keys(resolved.tokens)) !== canonicalJson(PUBLIC_TOKEN_ORDER)) throw new WisePPTError("resolved theme 必须精确投影 19 个语义色");
  const selector = `:root[data-theme-id="${resolved.theme_id}"]`;
  const lines = [
    "/* Generated from wise-ppt-theme@3. One deck, one complete theme. Do not edit. */",
    `${selector} {`,
    `  --wp-theme-id: ${resolved.theme_id};`,
    `  --wp-theme-default-typography-mode: ${resolved.typography.default_mode};`,
    ...PUBLIC_TOKEN_ORDER.map((role) => `  --wp-color-${role}: ${resolved.tokens[role]};`),
    ...PRIVATE_TOKEN_ORDER.map((role) => `  --wp-private-${role}: ${resolved.private_tokens[role]};`),
    ...Object.entries(resolved.lines.tiers).map(([role, value]) => `  --wp-theme-line-${role}: ${value};`),
    `  --wp-theme-line-cap: ${resolved.lines.cap};`,
    `  --wp-theme-line-join: ${resolved.lines.join};`,
    `  --wp-theme-texture-opacity: ${resolved.surface.layers.texture_opacity};`,
    `  --wp-theme-texture-blend: ${resolved.surface.layers.texture_blend};`,
    `  --wp-theme-panel-depth: ${resolved.surface.layers.panel_depth};`,
    `  --wp-theme-shadow: ${resolved.surface.layers.shadow};`,
    `  --wp-theme-corner-radius: ${resolved.surface.layers.corner_radius_px}px;`,
    `  --wp-page-accent: var(--wp-color-${resolved.icons.color_role});`,
    "}",
    "",
    `${selector} .slide[data-page-role="cover"] {`,
    `  --wp-color-surface-canvas: ${resolved.tokens[resolved.page_treatments.cover.canvas]};`,
    `  --paper: ${resolved.tokens[resolved.page_treatments.cover.canvas]};`,
    "}",
    `${selector} .slide[data-page-kind="relationship"] {`,
    `  --wp-color-functional: ${resolved.tokens[resolved.page_treatments.relationship.accent]};`,
    `  --wp-page-accent: ${resolved.tokens[resolved.page_treatments.relationship.accent]};`,
    "}",
    ""
  ];
  for (const mode of TYPOGRAPHY_MODES) {
    lines.push(`${selector}[data-typography-mode="${mode}"] {`);
    for (const role of THEME_TYPE_ROLES) {
      const [family, weight, scale] = resolved.typography.modes[mode].roles[role];
      lines.push(`  --wp-theme-font-${role}: ${familyCss(family)};`, `  --wp-theme-weight-${role}: ${weight};`, `  --wp-theme-size-scale-${role}: ${scale};`);
    }
    lines.push("}");
    for (const role of THEME_TYPE_ROLES) {
      const [family, weight, scale] = resolved.typography.modes[mode].roles[role];
      lines.push(`${selector}[data-typography-mode="${mode}"] [data-theme-type-role="${role}"] { font-family: ${familyCss(family)} !important; font-weight: ${weight} !important; }`);
      if (family === "oswald") lines.push(`${selector}[data-typography-mode="${mode}"] svg [data-theme-type-role="${role}"] { font-family: 'Oswald', 'Han Sans', sans-serif !important; font-weight: ${weight} !important; }`);
    }
  }
  lines.push(
    "",
    `${selector} [data-theme-surface="paper"] { background-color: var(--wp-color-surface-canvas); }`,
    `${selector} [data-theme-surface="recessed"] { background-color: var(--wp-color-surface-recessed); }`,
    `${selector} [data-theme-surface="foreground"] { background-color: var(--wp-color-surface-panel); }`,
    `${selector} svg [data-theme-surface="paper"] { fill: var(--wp-color-surface-canvas); }`,
    `${selector} svg [data-theme-surface="recessed"] { fill: var(--wp-color-surface-recessed); }`,
    `${selector} svg [data-theme-surface="foreground"] { fill: var(--wp-color-surface-panel); }`,
    `${selector} [data-theme-corner="family"] { border-radius: var(--wp-theme-corner-radius); }`
  );
  for (const role of ["hairline", "detail", "main", "emphasis"]) lines.push(
    `${selector} [data-theme-line="${role}"] { border-width: calc(var(--wp-theme-line-${role}) * 1px); outline-width: calc(var(--wp-theme-line-${role}) * 1px); stroke-width: var(--wp-theme-line-${role}); }`,
    `${selector} svg[data-icon-source][data-theme-icon-verified="redraw-v3"] [data-theme-line="${role}"] { stroke-width: var(--wp-theme-line-${role}); }`
  );
  lines.push(
    `${selector} svg[data-icon-source][data-theme-icon-verified="redraw-v3"] { color: var(--wp-page-accent, var(--wp-color-${resolved.icons.color_role})); stroke-linecap: var(--wp-theme-line-cap); stroke-linejoin: var(--wp-theme-line-join); }`,
    `${selector} svg[data-icon-source][data-theme-icon-verified="redraw-v3"] [stroke]:not([stroke="none"]) { stroke-width: var(--wp-theme-line-main); }`,
    `${selector} [data-theme-table-region="header"][data-theme-surface] { background-color: ${componentSurface(resolved.components.table.header)}; }`,
    `${selector} [data-theme-table-region="body"][data-theme-surface] { background-color: ${componentSurface(resolved.components.table.body)}; }`,
    `${selector} [data-theme-table-region="selected"] { outline-color: ${componentBorder(resolved.components.table.selected, resolved)}; }`,
    `${selector} [data-theme-component="card"][data-theme-surface] { background-color: ${componentSurface(resolved.components.card.surface)}; border-color: ${componentBorder(resolved.components.card.border, resolved)}; }`,
    `${selector} [data-theme-component="panel"][data-theme-surface] { background-color: ${componentSurface(resolved.components.panel.surface)}; border-color: ${componentBorder(resolved.components.panel.border, resolved)}; }`,
    `${selector} [data-theme-role="structural-outline"] { border-color: var(--wp-color-${resolved.lines.colors.structural}); outline-color: var(--wp-color-${resolved.lines.colors.structural}); }`,
    `${selector} svg [data-theme-role="structural-outline"] { fill: none; stroke: var(--wp-color-${resolved.lines.colors.structural}); }`,
    `${selector} [data-theme-role="hollow-number"] { background: transparent; color: var(--wp-color-${resolved.exceptions.hollow_number.text}); border-color: var(--wp-color-${resolved.exceptions.hollow_number.stroke}); }`,
    `${selector} [data-theme-role="reverse"] { background-color: var(--wp-color-${resolved.surface.materials[resolved.exceptions.reverse.surface]}); color: var(--wp-color-${resolved.surface.materials[resolved.exceptions.reverse.text]}); }`,
    `${selector} svg [data-theme-role="reverse"] { fill: var(--wp-color-${resolved.surface.materials[resolved.exceptions.reverse.text]}); stroke: var(--wp-color-${resolved.surface.materials[resolved.exceptions.reverse.text]}); }`,
    `${selector} .stage::before { background-image: ${textureBackground(resolved.surface.layers.texture)}; opacity: var(--wp-theme-texture-opacity); mix-blend-mode: var(--wp-theme-texture-blend); }`,
    ""
  );
  return `${lines.join("\n").trimEnd()}
`;
}
export {
  PUBLIC_TOKEN_ORDER,
  REGISTERED_THEME_IDS,
  RESOLVED_THEME_CONTRACT,
  THEME_CONTRACT,
  THEME_ENGINE_DESIGN_TOKENS,
  THEME_REGISTRY_CONTRACT,
  THEME_TYPE_ROLES,
  TYPOGRAPHY_MODES,
  contrastRatio,
  loadRegisteredTheme,
  normalizeTheme,
  projectThemeAssetForPublishedAssets,
  renderThemeCss,
  resolveDeckTheme,
  resolveTheme,
  themeRegistry
};
