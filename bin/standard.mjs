import { load } from "#wise-html";
import {
  cp,
  mkdir,
  readFile,
  readdir,
  rename,
  rm,
  stat,
  writeFile
} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import {
  BUILD_CONTRACT,
  DECK_CONTRACT,
  DECK_PLAN_CONTRACT,
  DEFAULT_SIGNATURE,
  LAYOUT_PLAN_REQUEST_FORMAT,
  OUTPUT_MARKER,
  REQUIRED_RUNTIME_FILES,
  REQUIRED_THEME_FILES,
  RUNTIME_VERSION
} from "./constants.mjs";
import {
  assertAbsolute,
  assertNoSymlinkComponents,
  canonicalJson,
  collectFiles,
  copyFileSafe,
  exists,
  fileRecord,
  readJson,
  readText,
  renderJson,
  sha256Text,
  shaFile,
  WisePPTError
} from "./common.mjs";
import { copyResolvedFonts, resolveFonts } from "./fonts.mjs";
import {
  projectThemeAssetForPublishedAssets,
  renderThemeCss,
  resolveDeckTheme,
  THEME_ENGINE_DESIGN_TOKENS,
  THEME_TYPE_ROLES,
  TYPOGRAPHY_MODES
} from "./theme.mjs";
const ALLOWED_TOP_LEVEL = /* @__PURE__ */ new Set(["contract", "mode", "deck", "layout_context", "sources", "must", "slides"]);
const ALLOWED_DECK_FIELDS = /* @__PURE__ */ new Set(["title", "thesis", "input_type", "theme", "typography_mode", "lang", "signature"]);
const ALLOWED_LAYOUT_CONTEXT_FIELDS = /* @__PURE__ */ new Set(["scope", "selection_seed", "prior_total", "usage"]);
const ALLOWED_LAYOUT_USAGE_FIELDS = /* @__PURE__ */ new Set(["layout_id", "count", "last_sequence"]);
const ALLOWED_SOURCE_FIELDS = /* @__PURE__ */ new Set(["source_id", "title"]);
const ALLOWED_SLIDE_FIELDS = /* @__PURE__ */ new Set([
  "page_id",
  "page_role",
  "layout_id",
  "relation_key",
  "claim",
  "payload",
  "source_refs",
  "source_evidence",
  "must_refs",
  "section_id",
  "section_title",
  "emphasis",
  "layout_override"
]);
const ALLOWED_EMPHASIS_FIELDS = /* @__PURE__ */ new Set(["target", "reason"]);
const ALLOWED_LAYOUT_OVERRIDE_FIELDS = /* @__PURE__ */ new Set(["basis", "reason"]);
const ALLOWED_MUST_FIELDS = /* @__PURE__ */ new Set(["must_id", "content", "status", "page_id", "reason", "visible_evidence", "source_refs"]);
const ALLOWED_LAYOUT_PLAN_FIELDS = /* @__PURE__ */ new Set(["format", "layout_context", "pages"]);
const ALLOWED_LAYOUT_PLAN_PAGE_FIELDS = /* @__PURE__ */ new Set([
  "page_id",
  "page_kind",
  "page_role",
  "relation_key",
  "requires",
  "content_items",
  "selected_layout_id",
  "layout_override"
]);
const PAYLOAD_CATEGORIES = Object.freeze({ text: "text", data: "data", icons: "icon" });
const PAYLOAD_SURFACES = Object.freeze({ text: "text", data: "text", icons: "icon" });
const INPUT_TYPES = /* @__PURE__ */ new Set(["pdf", "url", "multi-doc", "existing-deck", "oral", "short-text"]);
const SOURCE_BACKED_INPUT_TYPES = /* @__PURE__ */ new Set(["pdf", "url", "multi-doc", "existing-deck"]);
const LAYOUT_OVERRIDE_BASES = /* @__PURE__ */ new Set(["capacity", "binding", "primary-support", "reading-order", "user-continuity"]);
const SELECTION_SEED_PATTERN = /^[0-9a-f]{32}$/;
const FORBIDDEN_KEYS = /* @__PURE__ */ new Set(["css", "style", "page_css", "geometry", "structure", "components", "component", "component_id", "renderer", "renderer_id", "svg"]);
const FIXED_GENERATED_FILES = /* @__PURE__ */ new Set([
  "index.html",
  "deck-spec.json",
  "deck-plan.json",
  "source-ledger.json",
  "component-receipts.json",
  "geometry-contracts.json",
  "assets/layouts.css"
]);
const BUILD_FORBIDDEN_KEYS = ["unregistered_layout", "page_css", "handwritten_geometry"];
const RECEIPT_FORBIDDEN_KEYS = ["page_css", "handwritten_geometry"];
const THEME_SEMANTIC_VALUES = Object.freeze({
  "data-theme-surface": /* @__PURE__ */ new Set(["paper", "recessed", "foreground", "ink"]),
  "data-theme-layer": /* @__PURE__ */ new Set(["foreground"]),
  "data-theme-corner": /* @__PURE__ */ new Set(["family"]),
  "data-theme-line": /* @__PURE__ */ new Set(["hairline", "detail", "main", "emphasis"]),
  "data-theme-role": /* @__PURE__ */ new Set(["structural-outline", "focus-outline", "hollow-number", "reverse"]),
  "data-theme-table-region": /* @__PURE__ */ new Set(["header", "body", "selected"]),
  "data-theme-component": /* @__PURE__ */ new Set(["card", "panel"])
});
const LAYOUT_THEME_BINDING_CONTRACT = "wise-ppt-layout-theme-bindings@1";
const LAYOUT_THEME_BINDING_SOURCE = LAYOUT_THEME_BINDING_CONTRACT;
const LAYOUT_THEME_SURFACES = /* @__PURE__ */ new Set(["paper", "recessed", "foreground"]);
const LAYOUT_THEME_BINDING_ID = /^[a-z][a-z0-9-]*$/;
function setDifference(left, right) {
  return [...left].filter((value) => !right.has(value));
}
function assertKnownKeys(value, allowed, label) {
  const unknown = Object.keys(value).filter((key) => !allowed.has(key));
  if (unknown.length) throw new WisePPTError(`${label} 未登记字段: ${unknown.sort().join(", ")}`);
}
function assertExactKeys(value, expected, label) {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new WisePPTError(`${label} 必须是对象`);
  const actual = Object.keys(value).sort();
  const required = [...expected].sort();
  if (canonicalJson(actual) !== canonicalJson(required)) throw new WisePPTError(`${label} 字段必须精确为: ${required.join(", ")}`);
}
async function loadLayoutThemeBindings(root, layoutIds) {
  const authority = await readJson(path.join(root, "themes/engine/contracts/layout-theme-bindings.json"), "逐版式主题语义绑定");
  assertExactKeys(authority, ["contract", "projection", "geometry_policy", "invariants", "layouts"], "逐版式主题语义绑定");
  if (authority.contract !== LAYOUT_THEME_BINDING_CONTRACT || authority.projection !== "compile-time-exact-count" || authority.geometry_policy !== "preserve-all-layouts") throw new WisePPTError("逐版式主题语义绑定合同错误");
  assertExactKeys(authority.invariants, ["geometry_baseline", "no_surface_reclassification"], "逐版式主题语义绑定.invariants");
  const knownLayouts = layoutIds instanceof Set ? layoutIds : new Set(layoutIds);
  const normalizeInvariant = (name) => {
    const values = authority.invariants[name];
    if (!Array.isArray(values) || values.some((value) => typeof value !== "string") || new Set(values).size !== values.length) {
      throw new WisePPTError(`逐版式主题语义绑定.invariants.${name} 必须是无重复 layout_id 数组`);
    }
    const unknown = values.filter((value) => !knownLayouts.has(value));
    if (unknown.length) throw new WisePPTError(`逐版式主题语义绑定.invariants.${name} 含未知 layout_id: ${unknown.join(", ")}`);
    return [...values];
  };
  const invariants = {
    geometry_baseline: normalizeInvariant("geometry_baseline"),
    no_surface_reclassification: normalizeInvariant("no_surface_reclassification")
  };
  if (!authority.layouts || typeof authority.layouts !== "object" || Array.isArray(authority.layouts)) throw new WisePPTError("逐版式主题语义绑定.layouts 必须是对象");
  const byLayout = /* @__PURE__ */ new Map();
  for (const [layoutId, entry] of Object.entries(authority.layouts)) {
    if (!knownLayouts.has(layoutId)) throw new WisePPTError(`逐版式主题语义绑定含未知 layout_id: ${layoutId}`);
    if (byLayout.has(layoutId)) throw new WisePPTError(`逐版式主题语义绑定 layout_id 重复: ${layoutId}`);
    assertExactKeys(entry, ["surface_bindings", "type_bindings"], `逐版式主题语义绑定.${layoutId}`);
    if (!Array.isArray(entry.surface_bindings) || !Array.isArray(entry.type_bindings)) throw new WisePPTError(`${layoutId} 的主题绑定必须是数组`);
    const bindingIds = /* @__PURE__ */ new Set();
    const surfaceBindings = entry.surface_bindings.map((binding, offset) => {
      const label = `${layoutId}.surface_bindings[${offset + 1}]`;
      assertExactKeys(binding, ["binding_id", "selector", "expected_count", "surface", "layer"], label);
      if (!LAYOUT_THEME_BINDING_ID.test(String(binding.binding_id || "")) || bindingIds.has(binding.binding_id)) throw new WisePPTError(`${label}.binding_id 非法或重复`);
      bindingIds.add(binding.binding_id);
      plainString(binding.selector, `${label}.selector`);
      positiveInteger(binding.expected_count, `${label}.expected_count`);
      if (!LAYOUT_THEME_SURFACES.has(binding.surface)) throw new WisePPTError(`${label}.surface 未登记: ${binding.surface}`);
      if (binding.layer !== null && binding.layer !== "foreground") throw new WisePPTError(`${label}.layer 只能是 null 或 foreground`);
      if (binding.layer === "foreground" && binding.surface !== "foreground") throw new WisePPTError(`${label} foreground layer 必须对应 foreground surface`);
      return structuredClone(binding);
    });
    const typeBindings = entry.type_bindings.map((binding, offset) => {
      const label = `${layoutId}.type_bindings[${offset + 1}]`;
      assertExactKeys(binding, ["binding_id", "selector", "expected_count", "role"], label);
      if (!LAYOUT_THEME_BINDING_ID.test(String(binding.binding_id || "")) || bindingIds.has(binding.binding_id)) throw new WisePPTError(`${label}.binding_id 非法或重复`);
      bindingIds.add(binding.binding_id);
      plainString(binding.selector, `${label}.selector`);
      positiveInteger(binding.expected_count, `${label}.expected_count`);
      if (!THEME_TYPE_ROLES.includes(binding.role)) throw new WisePPTError(`${label}.role 未登记: ${binding.role}`);
      return structuredClone(binding);
    });
    byLayout.set(layoutId, { surface_bindings: surfaceBindings, type_bindings: typeBindings });
  }
  for (const layoutId of invariants.no_surface_reclassification) {
    if ((byLayout.get(layoutId)?.surface_bindings || []).length) throw new WisePPTError(`${layoutId} 已锁定为不重分类材料，不得登记 surface binding`);
  }
  return { contract: authority.contract, invariants, byLayout };
}
function plainString(value, label, allowEmpty = false) {
  if (typeof value !== "string" || !allowEmpty && !value.trim()) {
    throw new WisePPTError(`${label}必须是${allowEmpty ? "可空" : "非空"}字符串`);
  }
  return value;
}
function positiveInteger(value, label) {
  if (!Number.isSafeInteger(value) || value < 1) throw new WisePPTError(`${label} 必须是正整数`);
  return value;
}
function nonnegativeInteger(value, label) {
  if (!Number.isSafeInteger(value) || value < 0) throw new WisePPTError(`${label} 必须是非负整数`);
  return value;
}
function compareAscii(left, right) {
  return left < right ? -1 : left > right ? 1 : 0;
}
function normalizeSelectionSeed(value, label = "selection_seed") {
  if (typeof value !== "string" || !SELECTION_SEED_PATTERN.test(value)) {
    throw new WisePPTError(`${label} 必须是 32 位小写十六进制字符串`);
  }
  return value;
}
function registryIndex(registry) {
  return new Map((registry.layouts || []).map((layout, index) => [layout.layout_id, index]));
}
function normalizeUsageEntries(entries, layoutIds, label, options = {}) {
  if (!Array.isArray(entries)) throw new WisePPTError(`${label} 必须是数组`);
  const seen = /* @__PURE__ */ new Set();
  const usage = entries.map((entry, offset) => {
    const entryLabel = `${label}[${offset + 1}]`;
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) throw new WisePPTError(`${entryLabel} 必须是对象`);
    assertKnownKeys(entry, ALLOWED_LAYOUT_USAGE_FIELDS, entryLabel);
    const layoutId = plainString(entry.layout_id, `${entryLabel}.layout_id`);
    if (!layoutIds.has(layoutId)) throw new WisePPTError(`${entryLabel}.layout_id 未登记: ${layoutId}`);
    if (seen.has(layoutId)) throw new WisePPTError(`${label} 含重复 layout_id: ${layoutId}`);
    seen.add(layoutId);
    return {
      layout_id: layoutId,
      count: positiveInteger(entry.count, `${entryLabel}.count`),
      last_sequence: positiveInteger(entry.last_sequence, `${entryLabel}.last_sequence`)
    };
  });
  const derivedTotal = usage.reduce((sum, entry) => {
    const next = sum + entry.count;
    if (!Number.isSafeInteger(next)) throw new WisePPTError(`${label} 的 count 总和超过安全整数范围`);
    return next;
  }, 0);
  const total = options.priorTotal === void 0 ? derivedTotal : nonnegativeInteger(options.priorTotal, `${options.contextLabel || label}.prior_total`);
  if (derivedTotal !== total) throw new WisePPTError(`${label} 的 count 总和必须等于 prior_total=${total}`);
  const lastSequences = /* @__PURE__ */ new Set();
  for (const entry of usage) {
    if (entry.last_sequence > total) throw new WisePPTError(`${label} 的 last_sequence 不得大于 prior_total=${total}`);
    if (entry.last_sequence < entry.count) throw new WisePPTError(`${label} 的 last_sequence 不得小于 count`);
    if (lastSequences.has(entry.last_sequence)) throw new WisePPTError(`${label} 的 last_sequence 不得重复`);
    lastSequences.add(entry.last_sequence);
  }
  if (total === 0 && usage.length || total > 0 && Math.max(...lastSequences) !== total) {
    throw new WisePPTError(`${label} 的最大 last_sequence 必须等于 prior_total=${total}`);
  }
  let cumulativeCount = 0;
  for (const entry of [...usage].sort((left, right) => left.last_sequence - right.last_sequence)) {
    cumulativeCount += entry.count;
    if (cumulativeCount > entry.last_sequence) {
      throw new WisePPTError(`${label} 在 last_sequence=${entry.last_sequence} 前无法容纳累计 count=${cumulativeCount}`);
    }
  }
  const sorted = [...usage].sort((left, right) => compareAscii(left.layout_id, right.layout_id));
  if (options.requireSorted && canonicalJson(usage) !== canonicalJson(sorted)) {
    throw new WisePPTError(`${label} 必须按完整 layout_id 升序排列`);
  }
  return { prior_total: total, usage: sorted };
}
function normalizeLayoutUsage(registry, entries = []) {
  return normalizeUsageEntries(entries, new Set((registry.layouts || []).map((layout) => layout.layout_id)), "layout usage");
}
function normalizeLayoutContext(value, layoutIds) {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new WisePPTError("deck-spec.layout_context 必须是对象");
  assertKnownKeys(value, ALLOWED_LAYOUT_CONTEXT_FIELDS, "deck-spec.layout_context");
  if (value.scope !== "session") throw new WisePPTError("deck-spec.layout_context.scope 必须是 session");
  const selectionSeed = normalizeSelectionSeed(value.selection_seed, "deck-spec.layout_context.selection_seed");
  const normalized = normalizeUsageEntries(value.usage, layoutIds, "deck-spec.layout_context.usage", {
    priorTotal: value.prior_total,
    contextLabel: "deck-spec.layout_context",
    requireSorted: true
  });
  return { scope: "session", selection_seed: selectionSeed, ...normalized };
}
function usageMap(normalized) {
  return new Map(normalized.usage.map((entry) => [entry.layout_id, structuredClone(entry)]));
}
function usageFor(map, layoutId) {
  return map.get(layoutId) || { layout_id: layoutId, count: 0, last_sequence: null };
}
function selectionHash(seed, layoutId) {
  return sha256Text(`${seed}\0${layoutId}`);
}
function compareByUsage(left, right, usage, seed, order) {
  const leftUsage = usageFor(usage, left.layout_id);
  const rightUsage = usageFor(usage, right.layout_id);
  if (leftUsage.count !== rightUsage.count) return leftUsage.count - rightUsage.count;
  const leftLast = leftUsage.last_sequence ?? -1;
  const rightLast = rightUsage.last_sequence ?? -1;
  if (leftLast !== rightLast) return leftLast - rightLast;
  const hashOrder = compareAscii(selectionHash(seed, left.layout_id), selectionHash(seed, right.layout_id));
  if (hashOrder) return hashOrder;
  return order.get(left.layout_id) - order.get(right.layout_id);
}
function layoutSelectionState(layouts) {
  if (!layouts.length) return "no-candidate";
  if (layouts.length === 1) return "forced-single";
  const counts = layouts.map((layout) => layout.usage_count);
  if (counts.some((count) => count === 0)) return "fresh-available";
  if (Math.min(...counts) < Math.max(...counts)) return "least-used-available";
  return "balanced-reuse";
}
function semanticValue(value) {
  if (typeof value === "string") return Boolean(value.trim());
  if (typeof value === "number") return Number.isFinite(value);
  if (Array.isArray(value)) return value.some(semanticValue);
  if (value && typeof value === "object") return Object.values(value).some(semanticValue);
  return false;
}
function payloadSemanticValue(value) {
  if (value && typeof value === "object" && !Array.isArray(value) && ("fields" in value || "items" in value)) {
    return semanticValue(value.fields);
  }
  return semanticValue(value);
}
function referenceList(value, label, allowed, requireNonempty = false) {
  if (!Array.isArray(value) || !value.every((item) => typeof item === "string" && item.trim())) {
    throw new WisePPTError(`${label} 必须是由非空字符串组成的数组`);
  }
  if (requireNonempty && !value.length) throw new WisePPTError(`${label} 对当前 input_type 必须非空`);
  if (new Set(value).size !== value.length) throw new WisePPTError(`${label} 不得重复`);
  const unknown = value.filter((item) => !allowed.has(item));
  if (unknown.length) throw new WisePPTError(`${label} 含未登记引用: ${unknown.sort().join(", ")}`);
  return value;
}
function sourceEvidenceMap(value, refs, label) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new WisePPTError(`${label} 必须是 source_id → 可见词条数组的对象`);
  }
  const expected = new Set(refs);
  const actual = new Set(Object.keys(value));
  if (expected.size !== actual.size || setDifference(expected, actual).length || setDifference(actual, expected).length) {
    throw new WisePPTError(`${label} 必须与 source_refs 一一对应`);
  }
  for (const sourceId of refs) {
    const terms = value[sourceId];
    if (!Array.isArray(terms) || !terms.length || !terms.every((term) => typeof term === "string" && term.trim())) {
      throw new WisePPTError(`${label}.${sourceId} 必须是非空可见词条数组`);
    }
    if (new Set(terms).size !== terms.length) throw new WisePPTError(`${label}.${sourceId} 可见词条不得重复`);
  }
  return value;
}
function walkForbidden(value, current = "") {
  if (current === "deck.theme_preset" || current === "deck.theme_family") throw new WisePPTError("deck@9 已删除 theme_preset/theme_family；只允许 deck.theme");
  if (current === "deck.theme.definition") return;
  if (Array.isArray(value)) {
    value.forEach((child, index) => walkForbidden(child, `${current}[${index}]`));
    return;
  }
  if (!value || typeof value !== "object") return;
  for (const [key, child] of Object.entries(value)) {
    const normalized = key.toLowerCase().replaceAll("-", "_");
    if (FORBIDDEN_KEYS.has(normalized)) throw new WisePPTError(`标准模式禁止字段: ${current ? `${current}.` : ""}${key}`);
    if (normalized === "payload" && current.startsWith("slides[")) continue;
    walkForbidden(child, current ? `${current}.${key}` : key);
  }
}
function registeredBindings(category, slot) {
  const kind = category === "icons" ? "icon" : "text";
  const bindings = slot?.payload_schema?.[kind]?.binding_keys;
  return Array.isArray(bindings) ? bindings.filter((item) => item && typeof item.key === "string" && item.key) : [];
}
function validateCapacity(slot, count, label) {
  const minimum = slot?.capacity?.min_items;
  const maximum = slot?.capacity?.max_items;
  if (Number.isInteger(minimum) && count < minimum) throw new WisePPTError(`${label}.items=${count} 小于骨架最小容量 ${minimum}`);
  if (Number.isInteger(maximum) && count > maximum) throw new WisePPTError(`${label}.items=${count} 超过骨架最大容量 ${maximum}；请精简、换骨架或拆页`);
}
function expectedBindingKeys(bindings, declaredItems, label) {
  const indexes = new Set(bindings.filter((item) => item.item_scope === "item").map((item) => item.item_index));
  if (!indexes.size || [...indexes].some((index) => !Number.isInteger(index) || index < 0)) {
    throw new WisePPTError(`${label} 的登记 binding 缺少合法 item grouping`);
  }
  const available = Math.max(...indexes) + 1;
  if (declaredItems > available) throw new WisePPTError(`${label}.items=${declaredItems} 超过登记 item groups ${available}；请换骨架或拆页`);
  return new Set(bindings.filter((item) => item.item_scope === "slot" || item.item_scope === "item" && item.item_index < declaredItems).map((item) => item.key));
}
function validateExactFields(fields, bindings, items, label) {
  const expected = expectedBindingKeys(bindings, items, label);
  const actual = new Set(Object.keys(fields));
  const missing = setDifference(expected, actual);
  const extra = setDifference(actual, expected);
  if (missing.length || extra.length) throw new WisePPTError(`${label}.fields 必须精确填写 declared items 对应的完整 binding：缺失=${missing.sort()}，超出=${extra.sort()}`);
}
function normalizedExample(value) {
  return ["string", "number"].includes(typeof value) ? String(value).trim().replace(/\s+/g, " ") : "";
}
function validatePayloadShape(category, value, label, slot) {
  const bindings = registeredBindings(category, slot);
  if (!bindings.length) throw new WisePPTError(`${label} 没有公开 binding key`);
  if (Array.isArray(value)) throw new WisePPTError(`${label} 禁止位置数组；请按公开 binding key 填写 fields`);
  if (bindings.length > 1 && (!value || typeof value !== "object")) throw new WisePPTError(`${label} 是多字段槽，必须使用 fields/items 控制对象`);
  let fields;
  let items;
  if (value && typeof value === "object") {
    const keys = Object.keys(value);
    if (keys.length !== 2 || !keys.includes("fields") || !keys.includes("items")) {
      throw new WisePPTError(`${label} 只能使用 {fields: {binding_key: value}, items: n}`);
    }
    fields = value.fields;
    items = value.items;
    if (!fields || typeof fields !== "object" || Array.isArray(fields)) throw new WisePPTError(`${label}.fields 必须是 binding key → 值的对象`);
    if (!Number.isInteger(items) || items < 0) throw new WisePPTError(`${label}.items 必须是非负整数`);
  } else {
    fields = { [bindings[0].key]: value };
    items = 1;
  }
  const known = new Set(bindings.map((item) => item.key));
  const unknown = Object.keys(fields).filter((key) => !known.has(key));
  if (unknown.length) throw new WisePPTError(`${label}.fields 使用未知 binding key: ${unknown.sort().join(", ")}`);
  const empty = Object.entries(fields).filter(([, field]) => !semanticValue(field)).map(([key]) => key);
  if (empty.length) throw new WisePPTError(`${label}.fields 含空白登记值: ${empty.sort().join(", ")}`);
  validateCapacity(slot, items, label);
  validateExactFields(fields, bindings, items, label);
  if (category !== "icons") {
    const byKey = new Map(bindings.map((binding) => [binding.key, normalizedExample(binding.example)]));
    if (Object.keys(fields).length && Object.entries(fields).every(([key, field]) => byKey.get(key) && normalizedExample(field) === byKey.get(key))) {
      throw new WisePPTError(`${label} 整槽照抄 Catalog example；至少替换一个字段为真实内容`);
    }
  }
}
function validatePayloadExclusivity(payload, pageId) {
  const owners = /* @__PURE__ */ new Map();
  for (const category of Object.keys(PAYLOAD_CATEGORIES)) {
    const slots = payload[category];
    if (!slots || typeof slots !== "object" || Array.isArray(slots)) continue;
    for (const slotId of Object.keys(slots)) {
      const key = `${slotId}\0${PAYLOAD_SURFACES[category]}`;
      const previous = owners.get(key);
      if (previous && previous !== category) throw new WisePPTError(`${pageId}.payload 同一槽 ${slotId} 的 ${PAYLOAD_SURFACES[category]} binding surface 不能同时由 ${previous} 与 ${category} 填写`);
      owners.set(key, category);
    }
  }
}
async function attachCapabilityContracts(root, registry) {
  const [emphasisContract, iconContract] = await Promise.all([
    readJson(path.join(root, "capabilities/layouts/page-emphasis-contracts.json"), "页面强调合同"),
    readJson(path.join(root, "capabilities/layouts/icon-slot-contracts.json"), "图标槽位合同")
  ]);
  if (emphasisContract.contract_version !== 3 || emphasisContract.capability_id !== "wise-ppt.page-emphasis") throw new WisePPTError("页面强调合同版本错误");
  if (iconContract.contract !== "wise-ppt-icon-slots@1" || iconContract.capability_id !== "wise-ppt.icon-slots") throw new WisePPTError("图标槽位合同版本错误");
  const generatedSources = {
    layout_registry: "capabilities/layouts/layout-registry.json",
    component_routing: "capabilities/components/routing-manifest.json",
    runtime_authority: "capabilities/runtime-authority-manifest.json"
  };
  for (const [key, relative] of Object.entries(generatedSources)) {
    const record = iconContract.generated_from?.[key];
    const current = await shaFile(path.join(root, ...relative.split("/")));
    if (record?.path !== relative || record.sha256 !== current.sha256) throw new WisePPTError(`图标槽位合同的 ${key} 来源已过期`);
  }
  const targetContract = emphasisContract.production_target_contract || {};
  if (targetContract.reason_required !== true || targetContract.selector_visibility !== "compiler-private") {
    throw new WisePPTError("页面强调生产合同必须要求原因并隐藏私有选择器");
  }
  const allowedMemberRoles = new Set(emphasisContract.allowed_member_roles || []);
  if (!allowedMemberRoles.size) throw new WisePPTError("页面强调合同未登记允许的成员角色");
  const componentRouting = await readJson(path.join(root, generatedSources.component_routing), "组件路由");
  const routingComponents = componentRouting.components || [];
  const componentIds = new Set(routingComponents.map((item) => item.component_id));
  if (!Array.isArray(componentRouting.components) || componentIds.size !== routingComponents.length) throw new WisePPTError("组件路由集合非法或重复");
  const iconScope = iconContract.allowed_icon_scope || {};
  const iconPaint = new Set(iconScope.paint || []);
  if (iconScope.source_family !== "tabler-outline-redraw-v3" || iconScope.viewBox !== "0 0 64 64" || iconScope.source_hash_required !== true || iconPaint.size !== 2 || !iconPaint.has("currentColor") || !iconPaint.has("none") || !(iconScope.stroke_widths || []).length || iconScope.stroke_widths.some((value) => !Number.isFinite(Number(value)) || Number(value) < 0)) {
    throw new WisePPTError("图标来源、尺寸、线宽或颜色合同非法");
  }
  const emphasisPages = emphasisContract.pages || {};
  const iconLayouts = iconContract.layouts || {};
  const expectedIds = new Set((registry.layouts || []).map((layout) => layout.layout_id));
  if (Object.keys(emphasisPages).length !== expectedIds.size || Object.keys(iconLayouts).length !== expectedIds.size) throw new WisePPTError("强调或图标槽位合同页面集合不闭合");
  const counts = iconContract.counts || {};
  const relationshipLayouts = (registry.layouts || []).filter((layout) => layout.page_kind === "relationship").length;
  const nonrelationshipLayouts = (registry.layouts || []).filter((layout) => layout.page_kind === "nonrelationship").length;
  if (counts.layouts !== expectedIds.size || counts.relationship_layouts !== relationshipLayouts || counts.nonrelationship_layouts !== nonrelationshipLayouts || counts.components !== componentIds.size) {
    throw new WisePPTError("图标槽位合同的页面或组件计数已过期");
  }
  const placementsByComponent = new Map([...componentIds].map((componentId) => [componentId, []]));
  let registeredIconSlots = 0;
  for (const layout of registry.layouts || []) {
    const page = emphasisPages[layout.display_code];
    const iconPage = iconLayouts[layout.layout_id];
    if (!page || page.page_kind !== layout.page_kind) throw new WisePPTError(`${layout.display_code} 页面强调合同缺失或类型错误`);
    if (!iconPage || iconPage.display_code !== layout.display_code || iconPage.page_kind !== layout.page_kind) throw new WisePPTError(`${layout.display_code} 图标槽位合同缺失或类型错误`);
    if (!["none", "contrast-only", "semantic-focus", "conditional-semantic-focus"].includes(page.access)) throw new WisePPTError(`${layout.display_code} 页面强调权限非法`);
    const members = structuredClone(page.production_focus_members ?? page.sample_focus_members ?? []);
    if (!Array.isArray(members)) throw new WisePPTError(`${layout.display_code} 生产焦点成员必须是数组`);
    const targetId = page.production_target_id || targetContract.relationship_target_id;
    const enabled = ["semantic-focus", "conditional-semantic-focus"].includes(page.access);
    if (enabled && (!/^[a-z][a-z0-9]*(?:[._-][a-z0-9]+)*$/.test(String(targetId || "")) || !members.length)) throw new WisePPTError(`${layout.display_code} 开放强调但没有合法的生产焦点目标或成员`);
    if (!enabled && members.length) throw new WisePPTError(`${layout.display_code} 未开放强调却登记了生产焦点成员`);
    if (enabled && (!Array.isArray(page.focus_candidates) || !page.focus_candidates.length || page.focus_candidates.some((item) => typeof item !== "string" || !item.trim()))) {
      throw new WisePPTError(`${layout.display_code} 开放强调但没有可见焦点说明`);
    }
    const roles = [...new Set(members.map((member) => member.role))];
    const memberKeys = new Set(members.map((member) => `${member.selector}\0${member.role}`));
    if (memberKeys.size !== members.length || members.some((member) => typeof member.selector !== "string" || !member.selector.trim() || !allowedMemberRoles.has(member.role) || !(page.theme_focus_carriers || []).includes(member.role))) {
      throw new WisePPTError(`${layout.display_code} 生产焦点成员重复或不受逐页合同允许`);
    }
    layout.emphasis = {
      access: page.access,
      targets: enabled ? [{
        target_id: targetId,
        label: (page.focus_candidates || []).join(" / "),
        focus_candidates: structuredClone(page.focus_candidates || []),
        member_roles: roles,
        reason_required: targetContract.reason_required
      }] : []
    };
    layout._emphasis_members = members;
    layout.icon_slots = structuredClone(iconPage.icon_slots || []);
    if (!Array.isArray(layout.icon_slots) || layout.icon_slots.length !== iconPage.icon_slot_count) throw new WisePPTError(`${layout.display_code} 图标槽位计数错误`);
    const registeredBindings2 = /* @__PURE__ */ new Set();
    for (const slot of layout.slots || []) {
      for (const binding of slot.payload_schema?.icon?.binding_keys || []) {
        const bindingId = `${slot.slot_id}\0${binding.key}`;
        if (registeredBindings2.has(bindingId)) throw new WisePPTError(`${layout.display_code}/${binding.key} 图标 binding 重复`);
        registeredBindings2.add(bindingId);
      }
    }
    const contractBindings = /* @__PURE__ */ new Set();
    for (const iconSlot of layout.icon_slots) {
      const slot = (layout.slots || []).find((item) => item.slot_id === iconSlot.slot_id);
      const keys = new Set(slot?.payload_schema?.icon?.binding_keys?.map((item) => item.key) || []);
      const bindingId = `${iconSlot.slot_id}\0${iconSlot.binding_key}`;
      const geometry = iconSlot.position?.geometry || {};
      const componentId = iconSlot.component_id;
      if (contractBindings.has(bindingId)) throw new WisePPTError(`${layout.display_code}/${iconSlot.binding_key} 图标槽位重复`);
      contractBindings.add(bindingId);
      if (!slot || !keys.has(iconSlot.binding_key) || iconSlot.layout_id !== layout.layout_id || iconSlot.display_code !== layout.display_code || typeof iconSlot.semantic_purpose !== "string" || iconSlot.semantic_purpose !== slot.purpose || !componentIds.has(componentId) || !(layout.locks?.core_component_ids || []).includes(componentId)) {
        throw new WisePPTError(`${layout.display_code}/${iconSlot.binding_key} 图标槽位未落入当前 layout binding 或组件路由`);
      }
      if (!Array.isArray(iconSlot.position?.fit_box) || iconSlot.position?.target_tag !== "svg" || !["x", "y", "width", "height"].every((key) => typeof geometry[key] === "string" && Number.isFinite(Number(geometry[key]))) || Number(geometry.width) <= 0 || Number(geometry.width) !== Number(geometry.height) || geometry.viewBox !== iconScope.viewBox || iconSlot.visual_lock?.size_and_position !== "seed-locked" || iconSlot.visual_lock?.color !== "var(--wp-color-functional)" || iconSlot.visual_lock?.stroke_and_shape !== "selected-authority-svg-locked") {
        throw new WisePPTError(`${layout.display_code}/${iconSlot.binding_key} 图标的位置、尺寸、颜色或线条锁定非法`);
      }
      placementsByComponent.get(componentId).push({
        layout_id: layout.layout_id,
        display_code: layout.display_code,
        slot_id: iconSlot.slot_id,
        binding_key: iconSlot.binding_key
      });
    }
    const missingBindings = setDifference(registeredBindings2, contractBindings);
    const extraBindings = setDifference(contractBindings, registeredBindings2);
    if (missingBindings.length || extraBindings.length) throw new WisePPTError(`${layout.display_code} 图标 binding 与槽位合同不一致`);
    registeredIconSlots += layout.icon_slots.length;
  }
  if (counts.registered_icon_slots !== registeredIconSlots) throw new WisePPTError("图标槽位合同的总槽位计数错误");
  const componentContracts = iconContract.components || {};
  if (Object.keys(componentContracts).length !== componentIds.size || setDifference(componentIds, new Set(Object.keys(componentContracts))).length) {
    throw new WisePPTError("图标槽位合同的组件集合不闭合");
  }
  for (const component of routingComponents) {
    const contract = componentContracts[component.component_id];
    const expectedPlacements = placementsByComponent.get(component.component_id);
    const actualPlacements = Array.isArray(contract?.registered_placements) ? contract.registered_placements : [];
    const expectedSet = new Set(expectedPlacements.map((item) => canonicalJson(item)));
    const actualSet = new Set(actualPlacements.map((item) => canonicalJson(item)));
    if (!contract || contract.component_name !== component.name || contract.icon_slot_count !== expectedPlacements.length || expectedSet.size !== expectedPlacements.length || actualSet.size !== actualPlacements.length || setDifference(expectedSet, actualSet).length || setDifference(actualSet, expectedSet).length) {
      throw new WisePPTError(`${component.component_id} 组件图标槽位投影已过期`);
    }
  }
  return { emphasisContract, iconContract };
}
async function registryState(root) {
  const file = path.join(root, "capabilities/layouts/layout-registry.json");
  const registry = await readJson(file, "Wise PPT 骨架注册表");
  if (registry.contract_version !== 3 || registry.registry_id !== "wise-ppt.layouts") throw new WisePPTError("Wise PPT 骨架注册表版本错误");
  if (!registry.counts || registry.counts.total !== 88 || registry.counts.relationship !== 75 || registry.counts.nonrelationship !== 13) {
    throw new WisePPTError(`Wise PPT 骨架注册表数量错误: ${JSON.stringify(registry.counts)}`);
  }
  if (!Array.isArray(registry.layouts) || registry.layouts.length !== registry.counts.total) throw new WisePPTError("Wise PPT 骨架注册表 layouts 数量错误");
  await attachCapabilityContracts(root, registry);
  const index = /* @__PURE__ */ new Map();
  for (const layout of registry.layouts) {
    if (!layout.layout_id || index.has(layout.layout_id)) throw new WisePPTError(`Wise PPT 注册表 layout_id 缺失或重复: ${layout.layout_id || ""}`);
    index.set(layout.layout_id, layout);
  }
  return { registry, index, sha256: (await shaFile(file)).sha256 };
}
async function resolvedAppearance(root, deck) {
  if (Object.hasOwn(deck, "theme_preset") || Object.hasOwn(deck, "theme_family")) throw new WisePPTError("deck@9 已删除 theme_preset/theme_family；只允许 deck.theme");
  const theme = await resolveDeckTheme(root, deck.theme);
  const typography = String(deck.typography_mode || theme.typography.default_mode);
  if (!TYPOGRAPHY_MODES.includes(typography)) throw new WisePPTError(`未登记 typography_mode: ${typography}`);
  return { theme, themeId: theme.theme_id, typography };
}
function hardLayoutCandidates(index, slide, chosenLayout) {
  const requiredPayloadTypes = new Set(Object.keys(slide.payload || {}).map((category) => PAYLOAD_CATEGORIES[category]).filter(Boolean));
  return [...index.values()].filter((layout) => {
    if (layout.page_kind !== chosenLayout.page_kind) return false;
    const roles = layout.page_kind === "relationship" ? layout.page_roles : [layout.page_role];
    if (!(roles || []).includes(slide.page_role)) return false;
    if (layout.page_kind === "relationship" && !(layout.relations || []).includes(slide.relation_key)) return false;
    if ([...requiredPayloadTypes].some((type) => !(layout.allowed_payload_types || []).includes(type))) return false;
    return true;
  });
}
function normalizedLayoutOverride(slide, requiresOverride, selectionRank, preferredLayoutId) {
  if (slide.layout_override !== void 0) {
    if (!slide.layout_override || typeof slide.layout_override !== "object" || Array.isArray(slide.layout_override)) throw new WisePPTError(`${slide.page_id}.layout_override 必须是对象`);
    assertKnownKeys(slide.layout_override, ALLOWED_LAYOUT_OVERRIDE_FIELDS, `${slide.page_id}.layout_override`);
    const basis = plainString(slide.layout_override.basis, `${slide.page_id}.layout_override.basis`);
    if (!LAYOUT_OVERRIDE_BASES.has(basis)) throw new WisePPTError(`${slide.page_id}.layout_override.basis 未登记: ${basis}`);
    plainString(slide.layout_override.reason, `${slide.page_id}.layout_override.reason`);
  }
  if (requiresOverride && slide.layout_override === void 0) {
    throw new WisePPTError(`${slide.page_id} 选择的 ${slide.layout_id} 在硬候选排序中为第 ${selectionRank}，首选为 ${preferredLayoutId}；必须填写 layout_override`);
  }
  if (!requiresOverride && slide.layout_override !== void 0) {
    throw new WisePPTError(`${slide.page_id}.layout_override 没有越过排序更靠前的硬候选，不得填写`);
  }
  return slide.layout_override ? structuredClone(slide.layout_override) : null;
}
function buildLayoutSessionReceipt(resolved, index, layoutContext) {
  const currentUsage = usageMap(layoutContext);
  const order = new Map([...index.keys()].map((layoutId, offset) => [layoutId, offset]));
  const postTotal = layoutContext.prior_total + resolved.length;
  if (!Number.isSafeInteger(postTotal)) throw new WisePPTError("layout session post_total 超过安全整数范围");
  const pages = [];
  for (const [offset, { slide, layout }] of resolved.entries()) {
    const candidates = hardLayoutCandidates(index, slide, layout);
    const ranked = [...candidates].sort((left, right) => compareByUsage(left, right, currentUsage, layoutContext.selection_seed, order));
    const selectedBefore = usageFor(currentUsage, layout.layout_id);
    const minimumUsage = Math.min(...candidates.map((candidate) => usageFor(currentUsage, candidate.layout_id).count));
    const selectionRank = ranked.findIndex((candidate) => candidate.layout_id === layout.layout_id) + 1;
    const requiresOverride = selectionRank > 1;
    const layoutOverride = normalizedLayoutOverride(slide, requiresOverride, selectionRank, ranked[0].layout_id);
    const enrichedCandidates = candidates.map((candidate) => ({
      usage_count: usageFor(currentUsage, candidate.layout_id).count
    }));
    pages.push({
      page_id: slide.page_id,
      layout_id: layout.layout_id,
      candidate_count: candidates.length,
      chosen_usage_before: selectedBefore.count,
      chosen_last_sequence_before: selectedBefore.last_sequence,
      minimum_usage_before: minimumUsage,
      selection_rank: selectionRank,
      preferred_layout_id: ranked[0].layout_id,
      decision_type: layoutSelectionState(enrichedCandidates),
      layout_override: layoutOverride
    });
    const sequence = layoutContext.prior_total + offset + 1;
    currentUsage.set(layout.layout_id, {
      layout_id: layout.layout_id,
      count: selectedBefore.count + 1,
      last_sequence: sequence
    });
  }
  const postUsage = [...currentUsage.values()].sort((left, right) => compareAscii(left.layout_id, right.layout_id));
  return {
    scope: "session",
    selection_seed: layoutContext.selection_seed,
    order_basis: ["usage-count-asc", "last-sequence-asc", "session-seed-hash", "registry-order"],
    prior_total: layoutContext.prior_total,
    prior_usage: structuredClone(layoutContext.usage),
    post_total: postTotal,
    post_usage: postUsage,
    pages
  };
}
function preflightCollector() {
  const errors = [];
  const seen = /* @__PURE__ */ new Set();
  const add = (code, pathName, pageId, error) => {
    if (!(error instanceof WisePPTError)) throw error;
    const issue = { code, page_id: pageId || null, path: pathName, message: error.message };
    const key = canonicalJson(issue);
    if (!seen.has(key)) {
      seen.add(key);
      errors.push(issue);
    }
  };
  const check = (code, pathName, pageId, operation, fallback = null) => {
    try {
      return operation();
    } catch (error) {
      add(code, pathName, pageId, error);
      return fallback;
    }
  };
  const checkAsync = async (code, pathName, pageId, operation, fallback = null) => {
    try {
      return await operation();
    } catch (error) {
      add(code, pathName, pageId, error);
      return fallback;
    }
  };
  return { errors, add, check, checkAsync };
}
function forbiddenSpecPaths(value, current = "", found = []) {
  if (Array.isArray(value)) {
    value.forEach((child, index) => forbiddenSpecPaths(child, `${current}[${index}]`, found));
    return found;
  }
  if (!value || typeof value !== "object") return found;
  for (const [key, child] of Object.entries(value)) {
    const normalized = key.toLowerCase().replaceAll("-", "_");
    const keyPath = current ? `${current}.${key}` : key;
    if (FORBIDDEN_KEYS.has(normalized)) found.push(keyPath);
    else if (!(normalized === "payload" && current.startsWith("slides["))) forbiddenSpecPaths(child, keyPath, found);
  }
  return found;
}
function assertKnownPreflightKeys(value, allowed, label) {
  const unknown = Object.keys(value).filter((key) => {
    const normalized = key.toLowerCase().replaceAll("-", "_");
    return !allowed.has(key) && !FORBIDDEN_KEYS.has(normalized);
  });
  if (unknown.length) throw new WisePPTError(`${label} 未登记字段: ${unknown.sort().join(", ")}`);
}
function collectLayoutSessionIssues(resolved, index, layoutContext, collector) {
  const currentUsage = usageMap(layoutContext);
  const order = new Map([...index.keys()].map((layoutId, offset) => [layoutId, offset]));
  const postTotal = layoutContext.prior_total + resolved.length;
  if (!Number.isSafeInteger(postTotal)) {
    collector.add("layout-session.total", "layout_context.prior_total", null, new WisePPTError("layout session post_total 超过安全整数范围"));
    return;
  }
  for (const [offset, { slide, layout, slideOffset }] of resolved.entries()) {
    const candidates = hardLayoutCandidates(index, slide, layout);
    const ranked = [...candidates].sort((left, right) => compareByUsage(left, right, currentUsage, layoutContext.selection_seed, order));
    const selectionRank = ranked.findIndex((candidate) => candidate.layout_id === layout.layout_id) + 1;
    if (selectionRank > 0) {
      collector.check(
        "layout.override-invalid",
        `slides[${slideOffset + 1}].layout_override`,
        slide.page_id,
        () => normalizedLayoutOverride(slide, selectionRank > 1, selectionRank, ranked[0].layout_id)
      );
      const before = usageFor(currentUsage, layout.layout_id);
      currentUsage.set(layout.layout_id, {
        layout_id: layout.layout_id,
        count: before.count + 1,
        last_sequence: layoutContext.prior_total + offset + 1
      });
    }
  }
}
async function preflightSpec(root, spec, layoutIndex = null) {
  const collector = preflightCollector();
  const { add, check, checkAsync } = collector;
  const record = spec && typeof spec === "object" && !Array.isArray(spec);
  if (!record) {
    add("spec.object-required", "$", null, new WisePPTError("deck-spec 顶层必须是对象"));
    return { status: "fail", error_count: collector.errors.length, errors: collector.errors };
  }
  check("spec.unknown-field", "$", null, () => assertKnownPreflightKeys(spec, ALLOWED_TOP_LEVEL, "deck-spec 顶层"));
  if (spec.contract !== DECK_CONTRACT) add("spec.contract", "contract", null, new WisePPTError(`deck-spec.contract 必须是 ${DECK_CONTRACT}`));
  if ((spec.mode || "standard") !== "standard") add("spec.mode", "mode", null, new WisePPTError("公开 build 只接受 mode=standard；实验骨架不能混入标准成品"));
  for (const forbiddenPath of forbiddenSpecPaths(spec)) {
    add("spec.forbidden-field", forbiddenPath, null, new WisePPTError(`标准模式禁止字段: ${forbiddenPath}`));
  }
  const { index } = layoutIndex ? { index: layoutIndex } : await registryState(root);
  const layoutContext = check(
    "layout-context.invalid",
    "layout_context",
    null,
    () => normalizeLayoutContext(spec.layout_context, new Set(index.keys()))
  );
  const deck = spec.deck && typeof spec.deck === "object" && !Array.isArray(spec.deck) ? spec.deck : null;
  let inputType = null;
  if (!deck) add("deck.object-required", "deck", null, new WisePPTError("deck-spec.deck 必须是对象"));
  else {
    check("deck.unknown-field", "deck", null, () => assertKnownPreflightKeys(deck, ALLOWED_DECK_FIELDS, "deck-spec.deck"));
    check("deck.title", "deck.title", null, () => plainString(deck.title, "deck.title"));
    check("deck.thesis", "deck.thesis", null, () => plainString(deck.thesis, "deck.thesis"));
    inputType = check("deck.input-type", "deck.input_type", null, () => plainString(deck.input_type, "deck.input_type"));
    if (inputType && !INPUT_TYPES.has(inputType)) add("deck.input-type", "deck.input_type", null, new WisePPTError(`deck.input_type 未登记: ${inputType}`));
    if (deck.typography_mode !== void 0) check("deck.typography", "deck.typography_mode", null, () => plainString(deck.typography_mode, "deck.typography_mode"));
    if (deck.lang !== void 0) check("deck.lang", "deck.lang", null, () => {
      if (!/^[A-Za-z]{2,8}(?:-[A-Za-z0-9]{1,8})*$/.test(plainString(deck.lang, "deck.lang"))) throw new WisePPTError("deck.lang 必须是受限 ASCII language tag");
    });
    if (deck.signature !== void 0) check("deck.signature", "deck.signature", null, () => {
      if (!plainString(deck.signature, "deck.signature").trim()) throw new WisePPTError("deck.signature 必须是非空白署名");
    });
    await checkAsync("deck.appearance", "deck.theme", null, () => resolvedAppearance(root, deck));
  }
  const sourceBacked = SOURCE_BACKED_INPUT_TYPES.has(inputType);
  const sourceIds = /* @__PURE__ */ new Set();
  let referencesReliable = true;
  if (!Array.isArray(spec.sources)) add("sources.array-required", "sources", null, new WisePPTError("deck-spec.sources 必须是数组"));
  else {
    if (sourceBacked && !spec.sources.length) add("sources.required", "sources", null, new WisePPTError(`deck.input_type=${inputType} 必须登记至少一个 source`));
    spec.sources.forEach((source, offset) => {
      const label = `sources[${offset + 1}]`;
      if (!source || typeof source !== "object" || Array.isArray(source)) {
        add("source.object-required", label, null, new WisePPTError(`${label} 必须是对象`));
        referencesReliable = false;
        return;
      }
      check("source.unknown-field", label, null, () => assertKnownPreflightKeys(source, ALLOWED_SOURCE_FIELDS, label));
      const sourceId = check("source.id", `${label}.source_id`, null, () => plainString(source.source_id, `${label}.source_id`));
      check("source.title", `${label}.title`, null, () => plainString(source.title, `${label}.title`));
      if (!sourceId) referencesReliable = false;
      else if (sourceIds.has(sourceId)) {
        add("source.duplicate-id", `${label}.source_id`, null, new WisePPTError(`source_id 重复: ${sourceId}`));
        referencesReliable = false;
      } else sourceIds.add(sourceId);
    });
  }
  const usedSourceIds = /* @__PURE__ */ new Set();
  const mustById = /* @__PURE__ */ new Map();
  if (!Array.isArray(spec.must)) add("must.array-required", "must", null, new WisePPTError("deck-spec.must 必须是数组"));
  else for (const [offset, item] of spec.must.entries()) {
    const label = `must[${offset + 1}]`;
    if (!item || typeof item !== "object" || Array.isArray(item)) {
      add("must.object-required", label, null, new WisePPTError(`${label} 必须是对象`));
      continue;
    }
    check("must.unknown-field", label, null, () => assertKnownPreflightKeys(item, ALLOWED_MUST_FIELDS, label));
    const mustId = check("must.id", `${label}.must_id`, null, () => plainString(item.must_id, `${label}.must_id`));
    if (mustId && mustById.has(mustId)) add("must.duplicate-id", `${label}.must_id`, null, new WisePPTError(`must_id 重复: ${mustId}`));
    check("must.content", `${label}.content`, null, () => plainString(item.content, `${label}.content`));
    const status = check("must.status", `${label}.status`, null, () => plainString(item.status, `${label}.status`));
    if (status && !["placed", "omitted"].includes(status)) add("must.status", `${label}.status`, null, new WisePPTError(`${label}.status 只能是 placed 或 omitted`));
    const refs = check("must.source-refs", `${label}.source_refs`, null, () => referenceList(item.source_refs, `${label}.source_refs`, sourceIds, sourceBacked));
    if (refs) refs.forEach((id) => usedSourceIds.add(id));
    else referencesReliable = false;
    if (status === "placed") {
      check("must.page-id", `${label}.page_id`, null, () => plainString(item.page_id, `${label}.page_id`));
      check("must.visible-evidence", `${label}.visible_evidence`, null, () => plainString(item.visible_evidence, `${label}.visible_evidence`));
      if (![void 0, null, ""].includes(item.reason)) add("must.placed-reason", `${label}.reason`, null, new WisePPTError(`${label} 已落页，不得声明 omitted reason`));
    } else if (status === "omitted") {
      check("must.reason", `${label}.reason`, null, () => plainString(item.reason, `${label}.reason`));
      if (![void 0, null, ""].includes(item.page_id) || ![void 0, null, ""].includes(item.visible_evidence)) {
        add("must.omitted-placement", label, null, new WisePPTError(`${label} 已省略，不得声明 page_id/visible_evidence`));
      }
    }
    if (mustId && !mustById.has(mustId)) mustById.set(mustId, { ...item, source_refs: refs || [] });
  }
  const pageIds = /* @__PURE__ */ new Set();
  const pageSources = /* @__PURE__ */ new Map();
  const mustPages = new Map([...mustById.keys()].map((id) => [id, []]));
  const resolved = [];
  let slidesReliableForSession = true;
  if (!Array.isArray(spec.slides) || !spec.slides.length) add("slides.nonempty-array-required", "slides", null, new WisePPTError("deck-spec.slides 必须是非空数组"));
  else for (const [offset, slide] of spec.slides.entries()) {
    const label = `slides[${offset + 1}]`;
    if (!slide || typeof slide !== "object" || Array.isArray(slide)) {
      add("slide.object-required", label, null, new WisePPTError(`${label} 必须是对象`));
      slidesReliableForSession = false;
      continue;
    }
    check("slide.unknown-field", label, slide.page_id, () => assertKnownPreflightKeys(slide, ALLOWED_SLIDE_FIELDS, label));
    const pageId = check("slide.page-id", `${label}.page_id`, null, () => plainString(slide.page_id, `${label}.page_id`));
    const validPageId = pageId && /^[a-z][a-z0-9-]*$/.test(pageId);
    if (pageId && !validPageId) add("slide.page-id", `${label}.page_id`, null, new WisePPTError(`${label}.page_id 必须匹配 ^[a-z][a-z0-9-]*$: ${pageId}`));
    if (validPageId && pageIds.has(pageId)) add("slide.duplicate-page-id", `${label}.page_id`, pageId, new WisePPTError(`page_id 重复: ${pageId}`));
    else if (validPageId) pageIds.add(pageId);
    const issuePageId = validPageId ? pageId : null;
    const pageRole = check("slide.page-role", `${label}.page_role`, issuePageId, () => plainString(slide.page_role, `${label}.page_role`));
    const layoutId = check("slide.layout-id", `${label}.layout_id`, issuePageId, () => plainString(slide.layout_id, `${label}.layout_id`));
    check("slide.claim", `${label}.claim`, issuePageId, () => plainString(slide.claim, `${label}.claim`));
    const layout = layoutId ? index.get(layoutId) : null;
    let routeValid = Boolean(validPageId && pageRole && layout);
    if (layoutId && !layout) add("slide.layout-unregistered", `${label}.layout_id`, issuePageId, new WisePPTError(`${label} 使用未登记 layout_id: ${layoutId}`));
    if (layout && pageRole) {
      if (layout.page_kind === "relationship") {
        const relation = check("slide.relation", `${label}.relation_key`, issuePageId, () => plainString(slide.relation_key, `${label}.relation_key`));
        if (!relation || !(layout.relations || []).includes(relation)) {
          if (relation) add("slide.relation", `${label}.relation_key`, issuePageId, new WisePPTError(`${pageId} relation_key=${relation} 不受 ${layoutId} 支持`));
          routeValid = false;
        }
        if (!(layout.page_roles || []).includes(pageRole)) {
          add("slide.page-role", `${label}.page_role`, issuePageId, new WisePPTError(`${pageId} page_role=${pageRole} 不受 ${layoutId} 支持`));
          routeValid = false;
        }
      } else {
        if (![void 0, null, ""].includes(slide.relation_key)) {
          add("slide.relation", `${label}.relation_key`, issuePageId, new WisePPTError(`${pageId} 是非关系页，不得声明 relation_key`));
          routeValid = false;
        }
        if (pageRole !== layout.page_role) {
          add("slide.page-role", `${label}.page_role`, issuePageId, new WisePPTError(`${pageId} page_role 必须是 ${layout.page_role}`));
          routeValid = false;
        }
      }
    }
    if (slide.emphasis !== void 0 && layout) check("slide.emphasis", `${label}.emphasis`, issuePageId, () => {
      if (!slide.emphasis || typeof slide.emphasis !== "object" || Array.isArray(slide.emphasis)) throw new WisePPTError(`${pageId}.emphasis 必须是对象`);
      assertKnownPreflightKeys(slide.emphasis, ALLOWED_EMPHASIS_FIELDS, `${pageId}.emphasis`);
      const target = plainString(slide.emphasis.target, `${pageId}.emphasis.target`);
      plainString(slide.emphasis.reason, `${pageId}.emphasis.reason`);
      const allowedTargets = new Set((layout.emphasis?.targets || []).map((item) => item.target_id));
      if (!allowedTargets.has(target)) throw new WisePPTError(`${pageId}.emphasis.target=${target} 不在 ${layoutId} 已审核焦点对象中`);
    });
    const refs = check("slide.source-refs", `${label}.source_refs`, issuePageId, () => referenceList(slide.source_refs, `${pageId}.source_refs`, sourceIds, sourceBacked));
    if (refs) {
      refs.forEach((id) => usedSourceIds.add(id));
      check("slide.source-evidence", `${label}.source_evidence`, issuePageId, () => sourceEvidenceMap(slide.source_evidence, refs, `${pageId}.source_evidence`));
      if (validPageId) pageSources.set(pageId, refs);
    } else referencesReliable = false;
    const mustRefs = check("slide.must-refs", `${label}.must_refs`, issuePageId, () => referenceList(slide.must_refs, `${pageId}.must_refs`, new Set(mustById.keys())));
    if (mustRefs) mustRefs.forEach((id) => mustPages.get(id).push(pageId));
    const payload = slide.payload;
    let payloadValidForSession = true;
    if (!payload || typeof payload !== "object" || Array.isArray(payload) || !Object.keys(payload).length) {
      add("slide.payload", `${label}.payload`, issuePageId, new WisePPTError(`${pageId}.payload 必须是非空对象`));
      payloadValidForSession = false;
    } else if (layout) {
      const unknownTypes = Object.keys(payload).filter((key) => !(key in PAYLOAD_CATEGORIES));
      if (unknownTypes.length) {
        add("slide.payload-type", `${label}.payload`, issuePageId, new WisePPTError(`${pageId}.payload 未登记类型: ${unknownTypes.sort().join(", ")}`));
        payloadValidForSession = false;
      }
      check("slide.payload-exclusive", `${label}.payload`, issuePageId, () => validatePayloadExclusivity(payload, pageId));
      const slotMap = new Map((layout.slots || []).map((slot) => [slot.slot_id, slot]));
      const populated = /* @__PURE__ */ new Set();
      let hasPayload = false;
      for (const [category, payloadType] of Object.entries(PAYLOAD_CATEGORIES)) {
        const values = payload[category] || {};
        if (!values || typeof values !== "object" || Array.isArray(values)) {
          add("slide.payload-category", `${label}.payload.${category}`, issuePageId, new WisePPTError(`${pageId}.payload.${category} 必须是 slot_id → payload 的对象`));
          payloadValidForSession = false;
          continue;
        }
        if (category in payload && !Object.keys(values).length) add("slide.payload-empty-category", `${label}.payload.${category}`, issuePageId, new WisePPTError(`${pageId}.payload.${category} 不得是空对象`));
        for (const [slotId, slotValue] of Object.entries(values)) {
          const slot = slotMap.get(slotId);
          const itemPath = `${label}.payload.${category}.${slotId}`;
          if (!slot) {
            add("slide.payload-slot", itemPath, issuePageId, new WisePPTError(`${pageId} payload 使用未登记 slot_id: ${slotId}`));
            payloadValidForSession = false;
            continue;
          }
          const shape = check("slide.payload-shape", itemPath, issuePageId, () => {
            validatePayloadShape(category, slotValue, `${pageId}.payload.${category}.${slotId}`, slot);
            return true;
          }, false);
          if (!payloadSemanticValue(slotValue)) add("slide.payload-semantic", itemPath, issuePageId, new WisePPTError(`${pageId}.payload.${category}.${slotId} 必须有真实非空语义`));
          if (!(slot.allowed_payload_types || []).includes(payloadType)) {
            add("slide.payload-type", itemPath, issuePageId, new WisePPTError(`${pageId}/${slotId} 不允许 payload 类型 ${payloadType}`));
            payloadValidForSession = false;
          }
          if (shape) {
            populated.add(slotId);
            hasPayload = true;
          } else payloadValidForSession = false;
        }
      }
      if (!hasPayload) add("slide.payload-empty", `${label}.payload`, issuePageId, new WisePPTError(`${pageId}.payload 至少要有一个登记值具备真实非空语义`));
      const required = new Set((layout.slots || []).filter((slot) => slot.required).map((slot) => slot.slot_id));
      const missing = setDifference(required, populated);
      if (missing.length) add("slide.payload-required", `${label}.payload`, issuePageId, new WisePPTError(`${pageId} 缺少必填 payload slot: ${missing.sort().join(", ")}`));
    }
    if (routeValid && payloadValidForSession && layout) resolved.push({ slide, layout, slideOffset: offset });
    else slidesReliableForSession = false;
  }
  if (Array.isArray(spec.slides)) for (const [mustId, item] of mustById.entries()) {
    const pages = mustPages.get(mustId) || [];
    if (item.status === "placed") {
      if (!pageIds.has(item.page_id)) add("must.page-missing", "must", null, new WisePPTError(`must ${mustId} 落到不存在页面: ${item.page_id}`));
      else if (pages.length !== 1 || pages[0] !== item.page_id) add("must.reference-mismatch", "must", null, new WisePPTError(`must ${mustId} 必须只由 page_id=${item.page_id} 的 slide.must_refs 精确引用`));
      const pageRefs = pageSources.get(item.page_id);
      if (pageRefs) {
        const missing = (item.source_refs || []).filter((source) => !pageRefs.includes(source));
        if (missing.length) add("must.source-mismatch", "must", null, new WisePPTError(`must ${mustId} 的来源未登记到落点页 ${item.page_id}: ${missing.sort().join(", ")}`));
      }
    } else if (item.status === "omitted" && pages.length) add("must.omitted-referenced", "must", null, new WisePPTError(`omitted must ${mustId} 不得被 slide.must_refs 引用`));
  }
  if (referencesReliable) {
    const unused = setDifference(sourceIds, usedSourceIds);
    if (unused.length) add("sources.unused", "sources", null, new WisePPTError(`sources 含未被使用的来源: ${unused.sort().join(", ")}`));
  }
  if (layoutContext && slidesReliableForSession && resolved.length === spec.slides.length) collectLayoutSessionIssues(resolved, index, layoutContext, collector);
  try {
    await validateSpec(root, spec, index);
  } catch (error) {
    if (!(error instanceof WisePPTError)) throw error;
    if (!collector.errors.some((issue) => issue.message === error.message)) add("spec.validation", "$", null, error);
  }
  return {
    status: collector.errors.length ? "fail" : "pass",
    error_count: collector.errors.length,
    errors: collector.errors
  };
}
async function validateSpec(root, spec, layoutIndex = null) {
  assertKnownKeys(spec, ALLOWED_TOP_LEVEL, "deck-spec 顶层");
  if (spec.contract !== DECK_CONTRACT) throw new WisePPTError(`deck-spec.contract 必须是 ${DECK_CONTRACT}`);
  if ((spec.mode || "standard") !== "standard") throw new WisePPTError("公开 build 只接受 mode=standard；实验骨架不能混入标准成品");
  walkForbidden(spec);
  const deck = spec.deck;
  if (!deck || typeof deck !== "object" || Array.isArray(deck)) throw new WisePPTError("deck-spec.deck 必须是对象");
  assertKnownKeys(deck, ALLOWED_DECK_FIELDS, "deck-spec.deck");
  plainString(deck.title, "deck.title");
  plainString(deck.thesis, "deck.thesis");
  const inputType = plainString(deck.input_type, "deck.input_type");
  if (!INPUT_TYPES.has(inputType)) throw new WisePPTError(`deck.input_type 未登记: ${inputType}`);
  if (deck.typography_mode !== void 0) plainString(deck.typography_mode, "deck.typography_mode");
  if (deck.lang !== void 0 && !/^[A-Za-z]{2,8}(?:-[A-Za-z0-9]{1,8})*$/.test(plainString(deck.lang, "deck.lang"))) throw new WisePPTError("deck.lang 必须是受限 ASCII language tag");
  if (deck.signature !== void 0 && !plainString(deck.signature, "deck.signature").trim()) throw new WisePPTError("deck.signature 必须是非空白署名");
  await resolvedAppearance(root, deck);
  const { index } = layoutIndex ? { index: layoutIndex } : await registryState(root);
  const layoutContext = normalizeLayoutContext(spec.layout_context, new Set(index.keys()));
  if (!Array.isArray(spec.sources)) throw new WisePPTError("deck-spec.sources 必须是数组");
  if (SOURCE_BACKED_INPUT_TYPES.has(inputType) && !spec.sources.length) throw new WisePPTError(`deck.input_type=${inputType} 必须登记至少一个 source`);
  const sourceIds = /* @__PURE__ */ new Set();
  const usedSourceIds = /* @__PURE__ */ new Set();
  spec.sources.forEach((source, offset) => {
    if (!source || typeof source !== "object" || Array.isArray(source)) throw new WisePPTError(`sources[${offset + 1}] 必须是对象`);
    assertKnownKeys(source, ALLOWED_SOURCE_FIELDS, `sources[${offset + 1}]`);
    const sourceId = plainString(source.source_id, `sources[${offset + 1}].source_id`);
    plainString(source.title, `sources[${offset + 1}].title`);
    if (sourceIds.has(sourceId)) throw new WisePPTError(`source_id 重复: ${sourceId}`);
    sourceIds.add(sourceId);
  });
  if (!Array.isArray(spec.must)) throw new WisePPTError("deck-spec.must 必须是数组");
  const mustById = /* @__PURE__ */ new Map();
  for (const [offset, item] of spec.must.entries()) {
    const label = `must[${offset + 1}]`;
    if (!item || typeof item !== "object" || Array.isArray(item)) throw new WisePPTError(`${label} 必须是对象`);
    assertKnownKeys(item, ALLOWED_MUST_FIELDS, label);
    const mustId = plainString(item.must_id, `${label}.must_id`);
    if (mustById.has(mustId)) throw new WisePPTError(`must_id 重复: ${mustId}`);
    plainString(item.content, `${label}.content`);
    if (!["placed", "omitted"].includes(plainString(item.status, `${label}.status`))) throw new WisePPTError(`${label}.status 只能是 placed 或 omitted`);
    const refs = referenceList(item.source_refs, `${label}.source_refs`, sourceIds, SOURCE_BACKED_INPUT_TYPES.has(inputType));
    refs.forEach((id) => usedSourceIds.add(id));
    if (item.status === "placed") {
      plainString(item.page_id, `${label}.page_id`);
      plainString(item.visible_evidence, `${label}.visible_evidence`);
      if (![void 0, null, ""].includes(item.reason)) throw new WisePPTError(`${label} 已落页，不得声明 omitted reason`);
    } else {
      plainString(item.reason, `${label}.reason`);
      if (![void 0, null, ""].includes(item.page_id) || ![void 0, null, ""].includes(item.visible_evidence)) throw new WisePPTError(`${label} 已省略，不得声明 page_id/visible_evidence`);
    }
    mustById.set(mustId, item);
  }
  if (!Array.isArray(spec.slides) || !spec.slides.length) throw new WisePPTError("deck-spec.slides 必须是非空数组");
  const pageIds = /* @__PURE__ */ new Set();
  const mustPages = new Map([...mustById.keys()].map((id) => [id, []]));
  const pageSources = /* @__PURE__ */ new Map();
  const resolved = [];
  for (const [offset, slide] of spec.slides.entries()) {
    const label = `slides[${offset + 1}]`;
    if (!slide || typeof slide !== "object" || Array.isArray(slide)) throw new WisePPTError(`${label} 必须是对象`);
    assertKnownKeys(slide, ALLOWED_SLIDE_FIELDS, label);
    const pageId = plainString(slide.page_id, `${label}.page_id`);
    if (!/^[a-z][a-z0-9-]*$/.test(pageId)) throw new WisePPTError(`${label}.page_id 必须匹配 ^[a-z][a-z0-9-]*$: ${pageId}`);
    if (pageIds.has(pageId)) throw new WisePPTError(`page_id 重复: ${pageId}`);
    pageIds.add(pageId);
    const pageRole = plainString(slide.page_role, `${label}.page_role`);
    const layoutId = plainString(slide.layout_id, `${label}.layout_id`);
    plainString(slide.claim, `${label}.claim`);
    const layout = index.get(layoutId);
    if (!layout) throw new WisePPTError(`${label} 使用未登记 layout_id: ${layoutId}`);
    if (layout.page_kind === "relationship") {
      const relation = plainString(slide.relation_key, `${label}.relation_key`);
      if (!(layout.relations || []).includes(relation)) throw new WisePPTError(`${pageId} relation_key=${relation} 不受 ${layoutId} 支持`);
      if (!(layout.page_roles || []).includes(pageRole)) throw new WisePPTError(`${pageId} page_role=${pageRole} 不受 ${layoutId} 支持`);
    } else {
      if (![void 0, null, ""].includes(slide.relation_key)) throw new WisePPTError(`${pageId} 是非关系页，不得声明 relation_key`);
      if (pageRole !== layout.page_role) throw new WisePPTError(`${pageId} page_role 必须是 ${layout.page_role}`);
    }
    if (slide.emphasis !== void 0) {
      if (!slide.emphasis || typeof slide.emphasis !== "object" || Array.isArray(slide.emphasis)) throw new WisePPTError(`${pageId}.emphasis 必须是对象`);
      assertKnownKeys(slide.emphasis, ALLOWED_EMPHASIS_FIELDS, `${pageId}.emphasis`);
      const target = plainString(slide.emphasis.target, `${pageId}.emphasis.target`);
      plainString(slide.emphasis.reason, `${pageId}.emphasis.reason`);
      const allowedTargets = new Set((layout.emphasis?.targets || []).map((item) => item.target_id));
      if (!allowedTargets.has(target)) throw new WisePPTError(`${pageId}.emphasis.target=${target} 不在 ${layoutId} 已审核焦点对象中`);
    }
    const refs = referenceList(slide.source_refs, `${pageId}.source_refs`, sourceIds, SOURCE_BACKED_INPUT_TYPES.has(inputType));
    refs.forEach((id) => usedSourceIds.add(id));
    sourceEvidenceMap(slide.source_evidence, refs, `${pageId}.source_evidence`);
    pageSources.set(pageId, refs);
    const mustRefs = referenceList(slide.must_refs, `${pageId}.must_refs`, new Set(mustById.keys()));
    mustRefs.forEach((id) => mustPages.get(id).push(pageId));
    const payload = slide.payload;
    if (!payload || typeof payload !== "object" || Array.isArray(payload) || !Object.keys(payload).length) throw new WisePPTError(`${pageId}.payload 必须是非空对象`);
    const unknownTypes = Object.keys(payload).filter((key) => !(key in PAYLOAD_CATEGORIES));
    if (unknownTypes.length) throw new WisePPTError(`${pageId}.payload 未登记类型: ${unknownTypes.sort().join(", ")}`);
    validatePayloadExclusivity(payload, pageId);
    const slotMap = new Map((layout.slots || []).map((slot) => [slot.slot_id, slot]));
    const populated = /* @__PURE__ */ new Set();
    let hasPayload = false;
    for (const [category, payloadType] of Object.entries(PAYLOAD_CATEGORIES)) {
      const values = payload[category] || {};
      if (!values || typeof values !== "object" || Array.isArray(values)) throw new WisePPTError(`${pageId}.payload.${category} 必须是 slot_id → payload 的对象`);
      if (category in payload && !Object.keys(values).length) throw new WisePPTError(`${pageId}.payload.${category} 不得是空对象`);
      for (const [slotId, slotValue] of Object.entries(values)) {
        const slot = slotMap.get(slotId);
        if (!slot) throw new WisePPTError(`${pageId} payload 使用未登记 slot_id: ${slotId}`);
        const itemLabel = `${pageId}.payload.${category}.${slotId}`;
        validatePayloadShape(category, slotValue, itemLabel, slot);
        if (!payloadSemanticValue(slotValue)) throw new WisePPTError(`${itemLabel} 必须有真实非空语义`);
        if (!(slot.allowed_payload_types || []).includes(payloadType)) throw new WisePPTError(`${pageId}/${slotId} 不允许 payload 类型 ${payloadType}`);
        populated.add(slotId);
        hasPayload = true;
      }
    }
    if (!hasPayload) throw new WisePPTError(`${pageId}.payload 至少要有一个登记值具备真实非空语义`);
    const required = new Set((layout.slots || []).filter((slot) => slot.required).map((slot) => slot.slot_id));
    const missing = setDifference(required, populated);
    if (missing.length) throw new WisePPTError(`${pageId} 缺少必填 payload slot: ${missing.sort().join(", ")}`);
    resolved.push({ slide, layout });
  }
  for (const [mustId, item] of mustById.entries()) {
    const pages = mustPages.get(mustId);
    if (item.status === "placed") {
      if (!pageIds.has(item.page_id)) throw new WisePPTError(`must ${mustId} 落到不存在页面: ${item.page_id}`);
      if (pages.length !== 1 || pages[0] !== item.page_id) throw new WisePPTError(`must ${mustId} 必须只由 page_id=${item.page_id} 的 slide.must_refs 精确引用`);
      const missing = item.source_refs.filter((source) => !pageSources.get(item.page_id).includes(source));
      if (missing.length) throw new WisePPTError(`must ${mustId} 的来源未登记到落点页 ${item.page_id}: ${missing.sort().join(", ")}`);
    } else if (pages.length) throw new WisePPTError(`omitted must ${mustId} 不得被 slide.must_refs 引用`);
  }
  const unused = setDifference(sourceIds, usedSourceIds);
  if (unused.length) throw new WisePPTError(`sources 含未被使用的来源: ${unused.sort().join(", ")}`);
  Object.defineProperty(resolved, "layoutSession", {
    value: buildLayoutSessionReceipt(resolved, index, layoutContext),
    enumerable: false
  });
  return resolved;
}
function queryLayouts(registry, filters) {
  const required = new Set(filters.requires || []);
  if ([...required].some((item) => !["text", "data", "icon"].includes(item))) throw new WisePPTError("查询含未登记 payload 类型");
  if (filters.pageKind === "nonrelationship" && filters.relationKey) throw new WisePPTError("非关系页查询不得传 --relation-key");
  if (filters.contentItems !== void 0 && (!Number.isSafeInteger(filters.contentItems) || filters.contentItems < 0)) {
    throw new WisePPTError("contentItems 必须是非负安全整数");
  }
  const detailOnly = Boolean(filters.layoutId);
  if (detailOnly && (filters.selectionSeed !== void 0 || (filters.layoutUsage || []).length)) {
    throw new WisePPTError("单骨架详情查询不得传 selection seed 或 layout usage");
  }
  const selectionSeed = detailOnly ? null : normalizeSelectionSeed(filters.selectionSeed, "layout query selection_seed");
  const normalizedUsage = normalizeLayoutUsage(registry, filters.layoutUsage || []);
  const currentUsage = usageMap(normalizedUsage);
  const order = registryIndex(registry);
  const ranked = (registry.layouts || []).filter((layout) => {
    if (filters.layoutId && layout.layout_id !== filters.layoutId) return false;
    if (filters.pageKind && layout.page_kind !== filters.pageKind) return false;
    const roles = layout.page_kind === "relationship" ? layout.page_roles : [layout.page_role];
    if (filters.pageRole && !(roles || []).includes(filters.pageRole)) return false;
    if (filters.relationKey && !(layout.relations || []).includes(filters.relationKey)) return false;
    if ([...required].some((type) => !(layout.allowed_payload_types || []).includes(type))) return false;
    return true;
  }).map((layout) => ({
    layout_id: layout.layout_id,
    display_code: layout.display_code,
    page_kind: layout.page_kind,
    name: layout.name || layout.display_code,
    description: layout.description || "",
    structure_summary: layout.structure?.summary || "",
    leaf_count: layout.structure?.leaf_count,
    page_role: layout.page_role,
    page_roles: layout.page_roles || [],
    relations: layout.relations || [],
    reading_order: layout.reading_order || [],
    capacity: layout.capacity || {},
    allowed_payload_types: layout.allowed_payload_types || [],
    claim_binding: layout.claim_binding,
    derivation: layout.derivation,
    emphasis: structuredClone(layout.emphasis || { access: "none", targets: [] }),
    icon_slots: structuredClone(layout.icon_slots || []),
    slots: (layout.slots || []).map((slot) => Object.fromEntries(["slot_id", "purpose", "required", "visual_role", "capacity", "allowed_payload_types", "payload_schema"].filter((key) => key in slot).map((key) => [key, slot[key]]))),
    usage_count: usageFor(currentUsage, layout.layout_id).count,
    last_sequence: usageFor(currentUsage, layout.layout_id).last_sequence
  })).sort((left, right) => detailOnly ? order.get(left.layout_id) - order.get(right.layout_id) : compareByUsage(left, right, currentUsage, selectionSeed, order)).map((layout, offset) => ({
    ...layout,
    selection_rank: detailOnly ? null : offset + 1,
    requires_override_if_selected: detailOnly ? null : offset > 0
  }));
  if (filters.contentItems === void 0) return ranked;
  return ranked.filter((layout) => (layout.slots || []).some((slot) => Number.isInteger(slot.capacity?.min_items) && Number.isInteger(slot.capacity?.max_items) && slot.capacity.min_items <= filters.contentItems && filters.contentItems <= slot.capacity.max_items && (slot.allowed_payload_types || []).length));
}
function layoutAgentDefinition(layout) {
  return {
    layout_id: layout.layout_id,
    display_code: layout.display_code,
    page_kind: layout.page_kind,
    page_role: layout.page_role,
    page_roles: structuredClone(layout.page_roles || []),
    relations: structuredClone(layout.relations || []),
    allowed_payload_types: structuredClone(layout.allowed_payload_types || []),
    name: layout.name || layout.display_code,
    description: layout.description || "",
    structure_summary: layout.structure_summary || "",
    leaf_count: layout.leaf_count,
    reading_order: structuredClone(layout.reading_order || []),
    capacity: structuredClone(layout.capacity || {}),
    claim_binding: structuredClone(layout.claim_binding ?? null),
    emphasis: structuredClone(layout.emphasis || { access: "none", targets: [] }),
    icon_slots: structuredClone(layout.icon_slots || []),
    slots: structuredClone(layout.slots || [])
  };
}
function layoutPlanIssue(code, pageId, pathName, message) {
  return { code, page_id: pageId, path: pathName, message };
}
function planLayouts(registry, request, options = {}) {
  assertKnownKeys(request, ALLOWED_LAYOUT_PLAN_FIELDS, "layout plan 顶层");
  if (request.format !== LAYOUT_PLAN_REQUEST_FORMAT) throw new WisePPTError(`layout plan format 必须是 ${LAYOUT_PLAN_REQUEST_FORMAT}`);
  if (!Array.isArray(request.pages) || !request.pages.length) throw new WisePPTError("layout plan pages 必须是非空数组");
  const index = new Map((registry.layouts || []).map((layout) => [layout.layout_id, layout]));
  const layoutIds = new Set(index.keys());
  const hasContext = request.layout_context !== void 0;
  const hasNewSeed = options.newSelectionSeed !== void 0;
  if (hasContext === hasNewSeed) throw new WisePPTError("layout plan 必须且只能在 request.layout_context 与 --new-session 中选择一个");
  const layoutContext = hasContext ? normalizeLayoutContext(request.layout_context, layoutIds) : { scope: "session", selection_seed: normalizeSelectionSeed(options.newSelectionSeed, "layout plan new selection_seed"), prior_total: 0, usage: [] };
  if (!Number.isSafeInteger(layoutContext.prior_total + request.pages.length)) throw new WisePPTError("layout plan post_total 超过安全整数范围");
  const selectedCount = request.pages.filter((page) => page && typeof page === "object" && !Array.isArray(page) && Object.hasOwn(page, "selected_layout_id")).length;
  if (selectedCount !== 0 && selectedCount !== request.pages.length) throw new WisePPTError("layout plan selected_layout_id 必须整副全部填写或全部省略");
  const mode = selectedCount ? "resolved" : "proposal";
  const currentUsage = usageMap(layoutContext);
  const definitions = /* @__PURE__ */ new Map();
  const pageIds = /* @__PURE__ */ new Set();
  const pages = [];
  const errors = [];
  for (const [offset, page] of request.pages.entries()) {
    const label = `pages[${offset + 1}]`;
    if (!page || typeof page !== "object" || Array.isArray(page)) throw new WisePPTError(`${label} 必须是对象`);
    assertKnownKeys(page, ALLOWED_LAYOUT_PLAN_PAGE_FIELDS, label);
    const pageId = plainString(page.page_id, `${label}.page_id`);
    if (!/^[a-z][a-z0-9-]*$/.test(pageId)) throw new WisePPTError(`${label}.page_id 必须匹配 ^[a-z][a-z0-9-]*$: ${pageId}`);
    if (pageIds.has(pageId)) throw new WisePPTError(`layout plan page_id 重复: ${pageId}`);
    pageIds.add(pageId);
    const pageKind = plainString(page.page_kind, `${label}.page_kind`);
    if (!["relationship", "nonrelationship"].includes(pageKind)) throw new WisePPTError(`${label}.page_kind 只能是 relationship 或 nonrelationship`);
    const pageRole = plainString(page.page_role, `${label}.page_role`);
    const relationKey = page.relation_key === void 0 || page.relation_key === null ? null : plainString(page.relation_key, `${label}.relation_key`);
    if (pageKind === "relationship" && !relationKey) throw new WisePPTError(`${label}.relation_key 对关系页必须非空`);
    if (pageKind === "nonrelationship" && relationKey) throw new WisePPTError(`${label} 是非关系页，不得声明 relation_key`);
    const requires = page.requires === void 0 ? [] : page.requires;
    if (!Array.isArray(requires) || requires.some((item) => !["text", "data", "icon"].includes(item)) || new Set(requires).size !== requires.length) {
      throw new WisePPTError(`${label}.requires 必须是 text/data/icon 组成的无重复数组`);
    }
    const contentItems = page.content_items === void 0 ? void 0 : nonnegativeInteger(page.content_items, `${label}.content_items`);
    if (mode === "proposal" && page.layout_override !== void 0) throw new WisePPTError(`${label}.layout_override 只能在整副填写 selected_layout_id 后使用`);
    const currentUsageEntries = [...currentUsage.values()].sort((left, right) => compareAscii(left.layout_id, right.layout_id));
    const filters = {
      pageKind,
      pageRole,
      relationKey: relationKey ?? void 0,
      requires,
      contentItems,
      layoutUsage: currentUsageEntries,
      selectionSeed: layoutContext.selection_seed
    };
    const matches = queryLayouts(registry, filters);
    const rankingPool = contentItems === void 0 ? matches : queryLayouts(registry, { ...filters, contentItems: void 0 });
    const selectedLayoutId = mode === "resolved" ? plainString(page.selected_layout_id, `${label}.selected_layout_id`) : matches[0]?.layout_id ?? null;
    const selected = matches.find((layout) => layout.layout_id === selectedLayoutId);
    if (mode === "proposal") {
      for (const layout of matches) if (!definitions.has(layout.layout_id)) definitions.set(layout.layout_id, layoutAgentDefinition(layout));
    }
    if (!matches.length) {
      errors.push(layoutPlanIssue("layout.no-candidate", pageId, label, `${pageId} 没有符合页型、关系、payload 与容量条件的登记骨架`));
    } else if (!selected) {
      const hardCandidate = rankingPool.some((layout) => layout.layout_id === selectedLayoutId);
      errors.push(layoutPlanIssue(
        hardCandidate ? "layout.selected-capacity-mismatch" : "layout.selected-not-candidate",
        pageId,
        `${label}.selected_layout_id`,
        hardCandidate ? `${pageId} 选择的 ${selectedLayoutId} 不接受 content_items=${contentItems}` : `${pageId} 选择的 ${selectedLayoutId} 不符合页型、关系或 payload 硬条件`
      ));
    }
    const selectionRank = selected?.selection_rank ?? null;
    const requiresOverride = Number.isInteger(selectionRank) && selectionRank > 1;
    let layoutOverride = null;
    if (selected && mode === "resolved") {
      try {
        layoutOverride = normalizedLayoutOverride({
          page_id: pageId,
          layout_id: selected.layout_id,
          layout_override: page.layout_override
        }, requiresOverride, selectionRank, rankingPool[0]?.layout_id ?? null);
      } catch (error) {
        if (!(error instanceof WisePPTError)) throw error;
        errors.push(layoutPlanIssue("layout.override-invalid", pageId, `${label}.layout_override`, error.message));
      }
    }
    pages.push({
      page_id: pageId,
      page_kind: pageKind,
      page_role: pageRole,
      relation_key: relationKey,
      requires: structuredClone(requires),
      content_items: contentItems ?? null,
      selection_state: matches.length ? layoutSelectionState(rankingPool) : "no-candidate",
      preferred_layout_id: rankingPool[0]?.layout_id ?? null,
      suggested_layout_id: matches[0]?.layout_id ?? null,
      selected_layout_id: selected?.layout_id ?? selectedLayoutId,
      selection_rank: selectionRank,
      requires_override_if_selected: requiresOverride,
      suggested_override_basis: mode === "proposal" && requiresOverride && contentItems !== void 0 ? "capacity" : null,
      layout_override: layoutOverride,
      candidates: matches.map((layout) => ({
        layout_id: layout.layout_id,
        usage_count: layout.usage_count,
        last_sequence: layout.last_sequence,
        selection_rank: layout.selection_rank,
        requires_override_if_selected: layout.requires_override_if_selected
      }))
    });
    if (selected) {
      const selectedBefore = usageFor(currentUsage, selected.layout_id);
      currentUsage.set(selected.layout_id, {
        layout_id: selected.layout_id,
        count: selectedBefore.count + 1,
        last_sequence: layoutContext.prior_total + offset + 1
      });
    }
  }
  const order = registryIndex(registry);
  const layoutDefinitions = [...definitions.values()].sort((left, right) => order.get(left.layout_id) - order.get(right.layout_id));
  const projectedPostUsage = [...currentUsage.values()].sort((left, right) => compareAscii(left.layout_id, right.layout_id));
  return {
    status: errors.length ? "fail" : "pass",
    mode,
    registry_count: registry.layouts.length,
    layout_context: structuredClone(layoutContext),
    projection: {
      valid: errors.length === 0,
      basis: mode === "proposal" ? "first-compatible-candidate" : "explicit-selected-layouts",
      post_total: errors.length ? null : layoutContext.prior_total + request.pages.length,
      post_usage: errors.length ? [] : projectedPostUsage
    },
    page_count: pages.length,
    pages,
    layout_definition_policy: mode === "proposal" ? "all-candidates-once" : "reuse-proposal-brief",
    layout_definitions: layoutDefinitions,
    error_count: errors.length,
    errors
  };
}
async function loadSeed(root, displayCode) {
  const seed = await readJson(path.join(root, "capabilities/layouts/seeds", `${displayCode.toUpperCase()}.json`), `骨架 ${displayCode} seed`);
  if (seed.contract !== "wise-ppt-layout-seed@4") throw new WisePPTError(`骨架 ${displayCode} seed 合同错误`);
  if (!/^[0-9a-f]{64}$/.test(String(seed.seed_sha256 || ""))) throw new WisePPTError(`骨架 ${displayCode} seed 缺少合法哈希`);
  return seed;
}
function elementAttributes(node, idMap) {
  const result = {};
  const projectedSurface = node.attribs?.["data-theme-binding-projected"] === "surface";
  for (const originalName of Object.keys(node.attribs || {}).sort()) {
    const name = originalName.toLowerCase();
    if (name === "data-vnext-payload-value") continue;
    if (name === "data-theme-type-role") continue;
    if (["data-theme-binding-source", "data-theme-binding-id", "data-theme-binding-projected"].includes(name)) continue;
    if (projectedSurface && ["data-theme-surface", "data-theme-layer"].includes(name)) continue;
    if ("data-vnext-icon-key" in (node.attribs || {}) && name === "data-theme-icon-verified") continue;
    let value = String(node.attribs[originalName]);
    if (name === "id" && idMap.has(value)) value = idMap.get(value);
    else {
      for (const [old, replacement] of idMap.entries()) {
        value = value.replaceAll(`url(#${old})`, `url(#${replacement})`);
        if (value === `#${old}`) value = `#${replacement}`;
      }
    }
    if ("data-vnext-icon-key" in (node.attribs || {}) && ["data-icon", "data-icon-source"].includes(name)) value = "__PAYLOAD_ICON__";
    result[name] = value;
  }
  return result;
}
function rewriteMemberSelector(selector, idMap) {
  let result = String(selector);
  for (const [old, replacement] of [...idMap.entries()].sort((a, b) => b[0].length - a[0].length)) {
    result = result.replace(new RegExp(`#${old.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?![A-Za-z0-9_-])`, "g"), `#${replacement}`);
  }
  return result;
}
function selectExactThemeBinding(stage, rawSelector, idMap, binding, label) {
  const selector = rewriteMemberSelector(rawSelector, idMap);
  let matched;
  try {
    matched = stage.find(selector).addBack(selector);
  } catch (error) {
    throw new WisePPTError(`${label}.${binding.binding_id} 选择器非法: ${selector}: ${error.message}`);
  }
  if (matched.length !== binding.expected_count) {
    throw new WisePPTError(`${label}.${binding.binding_id} 必须精确命中 ${binding.expected_count} 个节点，实际 ${matched.length}`);
  }
  return matched;
}
function projectLayoutThemeBindings(stage, idMap, entry, label) {
  if (!entry) return;
  const claimed = /* @__PURE__ */ new Set();
  const claimNodes = (matched, binding) => matched.each((_index, node) => {
    if (claimed.has(node)) throw new WisePPTError(`${label}.${binding.binding_id} 与另一个主题绑定命中同一节点`);
    claimed.add(node);
    const carrier = stage._make ? stage._make(node) : null;
    const attributes = node.attribs || {};
    if (attributes["data-theme-binding-source"] || attributes["data-theme-binding-id"]) throw new WisePPTError(`${label}.${binding.binding_id} 命中了预置主题绑定标记`);
    if (carrier) carrier.attr("data-theme-binding-source", LAYOUT_THEME_BINDING_SOURCE).attr("data-theme-binding-id", binding.binding_id);
    else {
      attributes["data-theme-binding-source"] = LAYOUT_THEME_BINDING_SOURCE;
      attributes["data-theme-binding-id"] = binding.binding_id;
    }
  });
  for (const binding of entry.surface_bindings || []) {
    const matched = selectExactThemeBinding(stage, binding.selector, idMap, binding, label);
    claimNodes(matched, binding);
    matched.each((_index, node) => {
      const carrier = stage._make ? stage._make(node) : null;
      const attrs = node.attribs || {};
      const existingSurface = attrs["data-theme-surface"];
      const existingLayer = attrs["data-theme-layer"];
      if (existingSurface && existingSurface !== binding.surface) throw new WisePPTError(`${label}.${binding.binding_id} 与 seed 的 surface 语义冲突`);
      if (existingLayer && existingLayer !== binding.layer) throw new WisePPTError(`${label}.${binding.binding_id} 与 seed 的 layer 语义冲突`);
      const changed = existingSurface !== binding.surface || binding.layer !== null && existingLayer !== binding.layer;
      if (carrier) {
        carrier.attr("data-theme-surface", binding.surface);
        if (binding.layer !== null) carrier.attr("data-theme-layer", binding.layer);
        if (changed) carrier.attr("data-theme-binding-projected", "surface");
      } else {
        attrs["data-theme-surface"] = binding.surface;
        if (binding.layer !== null) attrs["data-theme-layer"] = binding.layer;
        if (changed) attrs["data-theme-binding-projected"] = "surface";
      }
    });
  }
  for (const binding of entry.type_bindings || []) {
    const matched = selectExactThemeBinding(stage, binding.selector, idMap, binding, label);
    claimNodes(matched, binding);
    matched.attr("data-theme-type-role", binding.role);
  }
}
function validateProjectedLayoutThemeBindings(stage, entry, label) {
  const marked = stage.find("[data-theme-binding-source], [data-theme-binding-id], [data-theme-binding-projected]").addBack("[data-theme-binding-source], [data-theme-binding-id], [data-theme-binding-projected]");
  marked.each((_index, node) => {
    const attrs = node.attribs || {};
    if (attrs["data-theme-binding-source"] !== LAYOUT_THEME_BINDING_SOURCE || !attrs["data-theme-binding-id"] || attrs["data-theme-binding-projected"] !== void 0 && attrs["data-theme-binding-projected"] !== "surface") {
      throw new WisePPTError(`${label} 含不完整或伪造的逐版式主题绑定标记`);
    }
  });
  const all = stage.find(`[data-theme-binding-source="${LAYOUT_THEME_BINDING_SOURCE}"]`).addBack(`[data-theme-binding-source="${LAYOUT_THEME_BINDING_SOURCE}"]`);
  const expected = [...entry?.surface_bindings || [], ...entry?.type_bindings || []];
  if (!entry) {
    if (marked.length) throw new WisePPTError(`${label} 不应含逐版式主题绑定标记`);
    return;
  }
  const expectedIds = new Set(expected.map((binding) => binding.binding_id));
  all.each((_index, node) => {
    const bindingId = node.attribs?.["data-theme-binding-id"];
    if (!expectedIds.has(bindingId)) throw new WisePPTError(`${label} 含未知主题绑定标记: ${bindingId || "-"}`);
  });
  for (const binding of entry.surface_bindings || []) {
    const matched = all.filter(`[data-theme-binding-id="${binding.binding_id}"]`);
    if (matched.length !== binding.expected_count) throw new WisePPTError(`${label}.${binding.binding_id} 投影数量漂移`);
    matched.each((_index, node) => {
      if (node.attribs?.["data-theme-surface"] !== binding.surface || binding.layer !== null && node.attribs?.["data-theme-layer"] !== binding.layer) {
        throw new WisePPTError(`${label}.${binding.binding_id} 材料语义投影漂移`);
      }
    });
  }
  for (const binding of entry.type_bindings || []) {
    const matched = all.filter(`[data-theme-binding-id="${binding.binding_id}"]`);
    if (matched.length !== binding.expected_count || matched.filter(`[data-theme-type-role="${binding.role}"]`).length !== binding.expected_count) {
      throw new WisePPTError(`${label}.${binding.binding_id} 字体角色投影漂移`);
    }
  }
}
function structureDigest(stageHtml) {
  const $ = load(stageHtml, null, false);
  const stage = $(".stage").first();
  if (!stage.length) throw new WisePPTError("seed 缺少 .stage");
  const idMap = /* @__PURE__ */ new Map();
  stage.find("[id]").each((index, node) => {
    if (node.attribs?.id) idMap.set(node.attribs.id, `ID${String(index + 1).padStart(4, "0")}`);
  });
  function walk(node, insideText = false) {
    const attrs = node.attribs || {};
    const signatureSurface = attrs["data-template-part"] === "signature";
    const textSurface = insideText || "data-vnext-text-key" in attrs || "data-vnext-claim-key" in attrs || signatureSurface;
    const opaqueIcon = "data-vnext-icon-key" in attrs;
    const children = [];
    if (!opaqueIcon) {
      for (const child of node.children || []) {
        if (child.type === "tag" || child.type === "script" || child.type === "style") children.push(walk(child, textSurface));
        else if (["text", "comment"].includes(child.type) && child.data.trim() && !textSurface) children.push(["#text"]);
      }
      if (signatureSurface) children.push(["#text"]);
    }
    return [String(node.name).toLowerCase(), elementAttributes(node, idMap), children];
  }
  return sha256Text(canonicalJson(walk(stage[0])));
}
function projectThemeTypeRoles(sectionHtml) {
  const $ = load(sectionHtml, null, false);
  const pageRole = $("section.slide").first().attr("data-page-role");
  const locked = /* @__PURE__ */ new Map();
  $("[data-theme-binding-source][data-theme-type-role]").each((_index, node) => locked.set(node, $(node).attr("data-theme-type-role")));
  const assign = (selector, role) => $(selector).attr("data-theme-type-role", role);
  const isEnglish = (value) => {
    const source = String(value || "");
    const latin = (source.match(/[A-Za-z]/g) || []).length;
    const han = (source.match(/[\u3400-\u9FFF]/g) || []).length;
    return latin >= 2 && latin > han;
  };
  assign('p, [data-text-kind="body"], [data-template-slot-kind="text"]:not([data-template-part="primary"])', "body");
  assign('.doc.tl, [data-page-shell="top-left"]', "top-left-kicker");
  assign('.folio, [data-page-shell="bottom-left"]', "bottom-left-folio");
  assign('.caption, [data-page-shell="bottom-takeaway"]', "bottom-takeaway");
  assign('[data-template-part="primary"][data-template-slot-kind="text"], [data-primary-text]', pageRole === "cover" ? "cover-title" : "zh-content-title");
  assign('[data-text-kind="english-title"], [data-theme-language="en"][data-primary-text]', "en-content-title");
  assign('strong[data-text-kind="english"], [data-theme-language="en"] strong', "en-bold");
  assign('[data-text-kind="label"]', "label");
  assign('[data-text-kind="number"], [data-text-kind="metric"]', "number");
  assign('[data-text-kind="chart-label"], [data-theme-chart-text]', "chart-text");
  $('[data-theme-type-role="zh-content-title"], [data-theme-type-role="cover-title"]').each((_index, node) => {
    if (isEnglish($(node).text())) $(node).attr("data-theme-type-role", "en-content-title").attr("data-theme-language", "en");
  });
  $("strong").each((_index, node) => {
    if (isEnglish($(node).text())) $(node).attr("data-theme-type-role", "en-bold").attr("data-theme-language", "en");
  });
  for (const [node, role] of locked) $(node).attr("data-theme-type-role", role);
  return $.html().replace(/&#x([0-9a-f]+);/gi, (entity, hex) => {
    const codePoint = Number.parseInt(hex, 16);
    return codePoint >= 128 ? String.fromCodePoint(codePoint) : entity;
  });
}
function prefixDomIds($, stage, prefix) {
  const mapping = /* @__PURE__ */ new Map();
  stage.find("[id]").addBack("[id]").each((_index, node) => {
    const old = node.attribs?.id;
    if (old) mapping.set(old, `${prefix}${old}`);
  });
  stage.find("*").addBack().each((_index, node) => {
    for (const [name, raw] of Object.entries(node.attribs || {})) {
      let value = String(raw);
      if (name === "id" && mapping.has(value)) value = mapping.get(value);
      else {
        for (const [old, replacement] of mapping.entries()) {
          value = value.replaceAll(`url(#${old})`, `url(#${replacement})`);
          if (value === `#${old}`) value = `#${replacement}`;
        }
      }
      node.attribs[name] = value;
    }
  });
  return mapping;
}
function safePagePrefix(pageId) {
  const slug = pageId.replace(/[^a-zA-Z0-9_-]+/g, "-").replace(/^-+|-+$/g, "") || "page";
  return `vnext-${slug}-`;
}
function rewriteScopedCss(css, layoutId, pageId, idMap) {
  let result = css.replace(`.slide[data-layout-id="${layoutId}"]`, `.slide[data-page-id="${pageId}"]`);
  for (const [old, replacement] of [...idMap.entries()].sort((a, b) => b[0].length - a[0].length)) {
    result = result.replace(new RegExp(`#${old.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?![A-Za-z0-9_-])`, "g"), `#${replacement}`);
  }
  return result;
}
function materializedEmphasis(slide, layout, stage, idMap) {
  if (!slide.emphasis) return null;
  const target = (layout.emphasis?.targets || []).find((item) => item.target_id === slide.emphasis.target);
  if (!target) throw new WisePPTError(`${slide.page_id}.emphasis.target 未落到已审核焦点对象`);
  const members = (layout._emphasis_members || []).map((member) => ({
    selector: rewriteMemberSelector(member.selector, idMap),
    role: member.role,
    ...member.paint ? { paint: member.paint } : {}
  }));
  for (const member of members) {
    let matched;
    try {
      matched = stage.find(member.selector);
    } catch (error) {
      throw new WisePPTError(`${slide.page_id} 强调目标选择器非法: ${member.selector}: ${error.message}`);
    }
    if (!matched.length) throw new WisePPTError(`${slide.page_id} 强调目标未落到锁定 DOM: ${member.selector}`);
  }
  return {
    target: slide.emphasis.target,
    ref: `emphasis.${slide.page_id}.${slide.emphasis.target}`,
    reason: slide.emphasis.reason,
    roles: target.member_roles,
    members
  };
}
function payloadFields(raw, bindings, label) {
  const keys = bindings.map((item) => item.key);
  if (!keys.length) throw new WisePPTError(`${label} 没有登记 binding key`);
  if (Array.isArray(raw)) throw new WisePPTError(`${label} 禁止位置数组`);
  if (keys.length > 1 && (!raw || typeof raw !== "object")) throw new WisePPTError(`${label} 有 ${keys.length} 个字段，必须使用 fields/items 控制对象`);
  if (raw && typeof raw === "object") {
    if (Object.keys(raw).length !== 2 || !("fields" in raw) || !("items" in raw)) throw new WisePPTError(`${label} 只能使用 {fields, items}`);
    if (!raw.fields || typeof raw.fields !== "object" || Array.isArray(raw.fields)) throw new WisePPTError(`${label}.fields 必须是对象`);
    if (!Number.isInteger(raw.items) || raw.items < 0) throw new WisePPTError(`${label}.items 必须是非负整数`);
    validateExactFields(raw.fields, bindings, raw.items, label);
    return { fields: { ...raw.fields }, items: raw.items };
  }
  const fields = { [keys[0]]: raw };
  validateExactFields(fields, bindings, 1, label);
  return { fields, items: 1 };
}
function textNodes(node) {
  const result = [];
  function visit(current) {
    for (const child of current.children || []) {
      if (child.type === "text" && child.data.trim()) result.push(child);
      else if (child.children) visit(child);
    }
  }
  visit(node);
  return result;
}
function replaceText($, selection, value) {
  const text = String(value);
  const nodes = textNodes(selection[0]);
  if (!nodes.length) {
    selection.text(text);
    return;
  }
  const parts = text.split("\n");
  if (parts.length > nodes.length) throw new WisePPTError(`字段 ${selection.attr("data-vnext-text-key") || selection.attr("data-vnext-claim-key") || ""} 的换行数超过锁定 DOM 容量`);
  nodes.forEach((node, index) => {
    node.data = parts[index] || "";
  });
}
function svgBodyDigest(svg) {
  function canonicalNode(node) {
    if (node.type === "text") return node.data.trim() ? ["#text", node.data] : null;
    if (node.type === "comment") return ["#comment", node.data];
    if (!node.name) return null;
    const attributes = Object.fromEntries(
      Object.entries(node.attribs || {}).map(([name, value]) => [name.toLowerCase(), String(value)]).sort(([left], [right]) => compareAscii(left, right))
    );
    const children = (node.children || []).map(canonicalNode).filter(Boolean);
    return [String(node.name).toLowerCase(), attributes, children];
  }
  return sha256Text(canonicalJson((svg[0]?.children || []).map(canonicalNode).filter(Boolean)));
}
async function iconAuthority(root) {
  const [authority, slots] = await Promise.all([
    readJson(path.join(root, "capabilities/runtime-authority-manifest.json"), "Runtime authority"),
    readJson(path.join(root, "capabilities/layouts/icon-slot-contracts.json"), "图标槽位合同")
  ]);
  if (authority.format !== "wise-ppt-runtime-authority@3") throw new WisePPTError("Runtime authority 合同错误");
  if (slots.contract !== "wise-ppt-icon-slots@1") throw new WisePPTError("图标槽位合同错误");
  const entries = authority.icons?.entries;
  if (!Array.isArray(entries) || entries.length !== authority.icons?.selectable_count) throw new WisePPTError("Catalog authority 图标登记数量不闭合");
  const allowed = slots.allowed_icon_scope || {};
  if (allowed.selectable_count !== entries.length || allowed.names_sha256 !== sha256Text(entries.map((entry) => entry.name).join("\n"))) throw new WisePPTError("图标槽位合同的允许图标范围已过期");
  const allowedPaint = new Set(allowed.paint || []);
  const allowedWidths = new Set((allowed.stroke_widths || []).map(Number));
  const result = /* @__PURE__ */ new Map();
  for (const entry of entries) {
    if (!entry || typeof entry !== "object" || !/^[a-z0-9][a-z0-9-]*$/.test(String(entry.name || "")) || result.has(entry.name)) throw new WisePPTError(`Catalog authority 图标条目非法或重复: ${entry?.name || "-"}`);
    const source = path.resolve(root, ...String(entry.source || "").split("/"));
    if (!source.startsWith(`${path.resolve(root)}${path.sep}`)) throw new WisePPTError(`Catalog authority 图标越出仓库: ${entry.source}`);
    const digest = await shaFile(source).catch(() => null);
    if (digest?.sha256 !== entry.sha256) throw new WisePPTError(`Catalog authority 图标缺失或哈希错误: ${entry.name}`);
    const sourceText = await readText(source, `本地图标 ${entry.name}`);
    const source$ = load(sourceText, { xmlMode: true }, false);
    const sourceSvg = source$("svg").first();
    if ((sourceSvg.attr("viewBox") || sourceSvg.attr("viewbox")) !== allowed.viewBox) throw new WisePPTError(`Catalog 本地图标 viewBox 越出槽位合同: ${entry.name}`);
    for (const attribute of ["fill", "stroke"]) {
      sourceSvg.find(`[${attribute}]`).each((_index, node) => {
        const value = String(node.attribs?.[attribute] || "");
        if (!allowedPaint.has(value)) throw new WisePPTError(`Catalog 本地图标 ${attribute} 越出槽位合同: ${entry.name}`);
      });
    }
    sourceSvg.find("[stroke-width]").each((_index, node) => {
      if (!allowedWidths.has(Number(node.attribs?.["stroke-width"]))) throw new WisePPTError(`Catalog 本地图标线宽越出槽位合同: ${entry.name}`);
    });
    result.set(entry.name, { source, body_sha256: svgBodyDigest(sourceSvg) });
  }
  return result;
}
function bindingsFor(seed, slotId, kind) {
  const value = seed.bindings?.slots?.[slotId]?.[kind];
  if (!Array.isArray(value)) throw new WisePPTError(`${seed.display_code}/${slotId} seed ${kind} 绑定非法`);
  return value;
}
function characterCount(value) {
  return [...String(value).replace(/\s/g, "")].length;
}
function applyTextPayload($, stage, seed, slot, raw, label, payloadValue) {
  const bindings = bindingsFor(seed, slot.slot_id, "text");
  if (!bindings.length) throw new WisePPTError(`${label} 没有锁定 text binding`);
  const { fields, items } = payloadFields(raw, bindings, label);
  validateCapacity(slot, items, label);
  if (Object.keys(fields).length && items === 0) throw new WisePPTError(`${label}.items=0 时不得填写字段`);
  const byKey = new Map(bindings.map((item) => [item.key, item]));
  for (const [key, value] of Object.entries(fields)) {
    if (!["string", "number"].includes(typeof value) || typeof value === "boolean" || typeof value === "number" && !Number.isFinite(value)) throw new WisePPTError(`${label}.${key} 必须是文字或数字`);
    if (typeof value === "string" && !value.trim()) throw new WisePPTError(`${label}.${key} 不得是空白文字`);
    const capacity = Number(byKey.get(key)?.max_chars || 0);
    if (capacity && characterCount(value) > capacity) throw new WisePPTError(`${label}.${key} 超过 ${capacity} 字；禁止缩字号强塞`);
    const target = stage.find(`[data-vnext-text-key="${key}"]`).first();
    if (!target.length) throw new WisePPTError(`${label}.${key} 未落到锁定 DOM`);
    replaceText($, target, value);
    target.attr("data-vnext-payload-value", payloadValue);
  }
  return items;
}
async function applyIconPayload($, stage, root, icons, seed, slot, raw, label) {
  const bindings = bindingsFor(seed, slot.slot_id, "icon");
  if (!bindings.length) throw new WisePPTError(`${label} 没有锁定 icon binding`);
  const { fields, items } = payloadFields(raw, bindings, label);
  validateCapacity(slot, items, label);
  for (const [key, value] of Object.entries(fields)) {
    const iconName = plainString(value, `${label}.${key}`);
    if (!/^[a-z0-9][a-z0-9-]*$/.test(iconName) || !icons.has(iconName)) throw new WisePPTError(`${label}.${key} 不是 Catalog 已登记本地图标: ${iconName}`);
    const target = stage.find(`[data-vnext-icon-key="${key}"]`).first();
    if (!target.length) throw new WisePPTError(`${label}.${key} 未落到锁定 DOM`);
    const sourceText = await readText(icons.get(iconName).source, `本地图标 ${iconName}`);
    const source$ = load(sourceText, { xmlMode: true }, false);
    const sourceSvg = source$("svg").first();
    const viewBox = sourceSvg.attr("viewBox") || sourceSvg.attr("viewbox");
    if (!sourceSvg.length || !viewBox || !sourceSvg.children().length) throw new WisePPTError(`Catalog 本地图标不是完整 SVG: ${iconName}`);
    const iconSource = `redraw-v3:${iconName}`;
    if (String(target[0].name).toLowerCase() === "svg") {
      target.empty().attr("viewBox", viewBox).attr("data-icon-source", iconSource).removeAttr("data-icon").append(sourceSvg.contents());
    } else {
      target.children("svg[data-icon-name], svg[data-icon-source]").remove();
      target.attr("data-icon", iconName).prepend(`<svg viewBox="${escapeHtml(viewBox)}" aria-hidden="true" data-icon-name="${iconName}" data-icon-source="${iconSource}"></svg>`);
      target.children("svg[data-icon-source]").first().append(sourceSvg.contents());
    }
    target.attr("data-vnext-payload-value", "icon");
  }
  return items;
}
function validateSourceThemeSemantics($, stage, label, { allowVerifiedIcons = false } = {}) {
  const select = (selector) => stage.find(selector).addBack(selector);
  if (!allowVerifiedIcons && select("[data-theme-icon-verified]").length) {
    throw new WisePPTError(`${label} 不得预置 data-theme-icon-verified；该标记只能由 standard 验证图标后投影`);
  }
  for (const [attribute, allowed] of Object.entries(THEME_SEMANTIC_VALUES)) {
    select(`[${attribute}]`).each((_index, node) => {
      const value = String(node.attribs?.[attribute] || "");
      if (!allowed.has(value)) throw new WisePPTError(`${label} ${attribute} 非法: ${value || "-"}`);
    });
  }
  select('[data-theme-layer="foreground"]').each((_index, node) => {
    if (node.attribs?.["data-theme-surface"] !== "foreground") {
      throw new WisePPTError(`${label} foreground layer 必须同时声明 foreground surface`);
    }
  });
  select('[data-theme-role="reverse"]').each((_index, node) => {
    if (!$(node).closest('[data-theme-surface="ink"]').length) {
      throw new WisePPTError(`${label} reverse 角色必须落在显式 ink surface 内`);
    }
  });
  select("[data-theme-table-region]").each((_index, node) => {
    const attrs = node.attribs || {};
    if (!attrs["data-theme-surface"] || !attrs["data-theme-line"]) {
      throw new WisePPTError(`${label} 表格区域必须同时声明显式 surface 与 line，禁止按类名猜测`);
    }
    if (attrs["data-theme-table-region"] === "selected" && attrs["data-theme-role"]) {
      throw new WisePPTError(`${label} selected 表格状态不得另设 theme focus；逐页焦点只认 emphasis 合同`);
    }
  });
  select("svg[data-icon-source]").each((_index, node) => {
    if (!$(node).closest("[data-vnext-icon-key]").length) {
      throw new WisePPTError(`${label} data-icon-source 必须属于已登记 icon binding`);
    }
  });
}
function iconSourceName(raw) {
  const match = /^redraw-v3:([a-z0-9][a-z0-9-]*)$/.exec(String(raw || ""));
  return match?.[1] || null;
}
function projectVerifiedIcons($, stage, icons, label) {
  validateSourceThemeSemantics($, stage, label);
  stage.find("svg[data-icon-source]").each((_index, node) => {
    const svg = $(node);
    const iconName = iconSourceName(svg.attr("data-icon-source"));
    if (!iconName || !icons.has(iconName)) {
      throw new WisePPTError(`${label} 图标来源未通过 Catalog registry/authority 验证: ${svg.attr("data-icon-source") || "-"}`);
    }
    if (!(svg.html() || "").trim()) throw new WisePPTError(`${label} 已登记图标缺少 SVG 内容: ${iconName}`);
    svg.attr("data-theme-icon-verified", "redraw-v3");
  });
}
function validateMaterializedThemeSemantics($, stage, icons, label) {
  validateSourceThemeSemantics($, stage, label, { allowVerifiedIcons: true });
  const verified = stage.find("[data-theme-icon-verified]").addBack("[data-theme-icon-verified]");
  verified.each((_index, node) => {
    const carrier = $(node);
    const iconName = iconSourceName(carrier.attr("data-icon-source"));
    if (String(node.name).toLowerCase() !== "svg" || carrier.attr("data-theme-icon-verified") !== "redraw-v3" || !iconName || !icons.has(iconName)) {
      throw new WisePPTError(`${label} 含未验证或位置非法的 theme icon marker`);
    }
  });
  stage.find("svg[data-icon-source]").each((_index, node) => {
    const svg = $(node);
    const iconName = iconSourceName(svg.attr("data-icon-source"));
    const actualBodySha256 = svgBodyDigest(svg);
    const expectedBodySha256 = iconName && icons.has(iconName) ? icons.get(iconName).body_sha256 : null;
    if (!iconName || !icons.has(iconName) || svg.attr("data-theme-icon-verified") !== "redraw-v3" || actualBodySha256 !== expectedBodySha256) {
      throw new WisePPTError(
        `${label} 登记图标 ${iconName || "-"} 的 marker 或 SVG 子树与 Catalog authority 不一致（${actualBodySha256} != ${expectedBodySha256 || "-"}）`
      );
    }
  });
}
function escapeHtml(value, quote = true) {
  let result = String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  if (quote) result = result.replaceAll('"', "&quot;").replaceAll("'", "&#x27;");
  return result;
}
function expectedPayloadReceipt(slide) {
  const result = [];
  for (const [category, payloadType] of Object.entries(PAYLOAD_CATEGORIES)) {
    for (const [slotId, raw] of Object.entries(slide.payload[category] || {}).sort(([left], [right]) => left.localeCompare(right, "en"))) {
      result.push({ slot_id: slotId, payload_type: payloadType, item_count: raw && typeof raw === "object" && !Array.isArray(raw) ? Number(raw.items ?? 1) : 1 });
    }
  }
  return result;
}
function materializedComponentIds(stage) {
  const ids = /* @__PURE__ */ new Set();
  stage.find("[data-component-id]").addBack("[data-component-id]").each((_index, node) => {
    if (node.attribs?.["data-component-id"]) ids.add(node.attribs["data-component-id"]);
  });
  return [...ids].sort();
}
function zeroCounts(keys) {
  return Object.fromEntries(keys.map((key) => [key, 0]));
}
function expectedComponentReceipt(slide, layout, seed, stage) {
  return {
    page_id: slide.page_id,
    layout_id: layout.layout_id,
    layout_seed_sha256: seed.seed_sha256,
    structure_sha256: seed.locked.stage_structure_sha256,
    core_component_ids: layout.locks?.core_component_ids || [],
    materialized_component_ids: materializedComponentIds(stage),
    payload: expectedPayloadReceipt(slide),
    forbidden_counts: zeroCounts(RECEIPT_FORBIDDEN_KEYS)
  };
}
function expectedGeometryContract(slide, layout, seed) {
  return {
    page_id: slide.page_id,
    layout_id: layout.layout_id,
    canvas: { width: 1920, height: 1080 },
    structure_fingerprint: layout.locks?.structure_fingerprint ?? null,
    stage_structure_sha256: seed.locked.stage_structure_sha256,
    locked_geometry: layout.locks?.slot_spaces || layout.locks?.geometry || {},
    screen_print_tolerance_px: 1
  };
}
function normalizedVisibleText(value) {
  return String(value).trim().replace(/\s+/g, " ");
}
function validatePageEvidence($, container, slide, mustById) {
  const visible = [];
  container.find('[data-vnext-payload-value="claim"], [data-vnext-payload-value="text"], [data-vnext-payload-value="data"]').addBack('[data-vnext-payload-value="claim"], [data-vnext-payload-value="text"], [data-vnext-payload-value="data"]').each((_index, node) => {
    const text = normalizedVisibleText($(node).text());
    if (text) visible.push(text);
  });
  const evidence = [];
  for (const [sourceId, terms] of Object.entries(slide.source_evidence)) terms.forEach((term) => evidence.push([`source ${sourceId}`, term]));
  for (const mustId of slide.must_refs) evidence.push([`must ${mustId}`, mustById.get(mustId).visible_evidence]);
  for (const [label, raw] of evidence) {
    const term = normalizedVisibleText(raw);
    if (!visible.some((text) => text.includes(term))) throw new WisePPTError(`${slide.page_id} 的 ${label} visible_evidence 未出现在真实 payload/claim 可见文字: ${raw}`);
  }
}
function cornerLines($, doc) {
  const lines = ["", ""];
  let index = 0;
  for (const child of doc[0].children || []) {
    if (child.type === "tag" && String(child.name).toLowerCase() === "br") {
      index = 1;
      continue;
    }
    const text = child.type === "text" ? child.data : $(child).text();
    lines[index] += String(text || "").trim();
  }
  return lines;
}
async function materializeSlide(root, slide, layout, seed, deckTitle, folioText, signature, icons, themeBinding) {
  if (seed.layout_id !== layout.layout_id || canonicalJson(seed.source) !== canonicalJson(layout.source)) throw new WisePPTError(`${layout.layout_id} seed 与注册表来源不一致`);
  const $ = load(seed.locked.stage_html, null, false);
  const stage = $(".stage").first();
  if (!stage.length) throw new WisePPTError(`${layout.layout_id} seed 缺少 .stage`);
  if (structureDigest(stage.toString()) !== seed.locked.stage_structure_sha256) throw new WisePPTError(`${layout.layout_id} seed 结构哈希漂移`);
  validateSourceThemeSemantics($, stage, `${layout.display_code} seed`);
  const slotMap = new Map((layout.slots || []).map((slot) => [slot.slot_id, slot]));
  const receipt = [];
  if (layout.page_kind === "relationship") {
    const claim = seed.bindings?.claim;
    const target = stage.find(`[data-vnext-claim-key="${claim?.key || ""}"]`);
    if (claim?.key !== "claim.text.001" || target.length !== 1) throw new WisePPTError(`${slide.page_id} 的关系骨架缺少唯一 claim binding`);
    if (characterCount(slide.claim) > claim.max_chars) throw new WisePPTError(`${slide.page_id}.claim 超过骨架结论容量 ${claim.max_chars} 字`);
    replaceText($, target.first(), slide.claim);
    target.attr("data-vnext-payload-value", "claim");
  }
  for (const [category, payloadType] of Object.entries(PAYLOAD_CATEGORIES)) {
    for (const [slotId, raw] of Object.entries(slide.payload[category] || {}).sort(([left], [right]) => left.localeCompare(right, "en"))) {
      const slot = slotMap.get(slotId);
      const label = `${slide.page_id}.payload.${category}.${slotId}`;
      const count = category === "icons" ? await applyIconPayload($, stage, root, icons, seed, slot, raw, label) : applyTextPayload($, stage, seed, slot, raw, label, category);
      receipt.push({ slot_id: slotId, payload_type: payloadType, item_count: count });
    }
  }
  stage.find("[data-vnext-text-key]").each((_index, node) => {
    const target = $(node);
    if (!target.attr("data-vnext-payload-value")) {
      replaceText($, target, "");
      target.attr("data-vnext-payload-value", "empty");
    }
  });
  projectVerifiedIcons($, stage, icons, slide.page_id);
  validateMaterializedThemeSemantics($, stage, icons, slide.page_id);
  const doc = stage.find(".doc.tl").first();
  if (!doc.length) throw new WisePPTError(`${slide.page_id} 骨架缺少左上角 .doc.tl`);
  const [line1, line2] = cornerLines($, doc);
  if (line1 !== deckTitle.trim()) throw new WisePPTError(`${slide.page_id} 左上角第一行必须是整副标题 deck.title（${deckTitle}）；当前是 ${line1 || "空"}`);
  if (line2 !== slide.claim.trim()) throw new WisePPTError(`${slide.page_id} 左上角第二行必须是本页标题 claim（${slide.claim}）；当前是 ${line2 || "空"}`);
  const folios = stage.find(".folio");
  if (folios.length !== 1) throw new WisePPTError(`${slide.page_id} 骨架缺少唯一左下角 folio；找到 ${folios.length} 个`);
  replaceText($, folios.first(), folioText);
  const signatures = stage.find('[data-template-part="signature"]');
  if (signatures.length > 1) throw new WisePPTError(`骨架署名槽必须至多一个；找到 ${signatures.length} 个`);
  if (signatures.length) replaceText($, signatures.first(), signature);
  if (structureDigest(stage.toString()) !== seed.locked.stage_structure_sha256) throw new WisePPTError(`${slide.page_id} payload 改变了锁定 DOM/结构/组件/几何`);
  const idMap = prefixDomIds($, stage, safePagePrefix(slide.page_id));
  if (structureDigest(stage.toString()) !== seed.locked.stage_structure_sha256) throw new WisePPTError(`${slide.page_id} ID 隔离改变了骨架结构`);
  projectLayoutThemeBindings(stage, idMap, themeBinding, slide.page_id);
  validateProjectedLayoutThemeBindings(stage, themeBinding, slide.page_id);
  validateMaterializedThemeSemantics($, stage, icons, slide.page_id);
  if (structureDigest(stage.toString()) !== seed.locked.stage_structure_sha256) throw new WisePPTError(`${slide.page_id} 主题语义投影改变了锁定 DOM/结构/组件/几何`);
  const emphasis = materializedEmphasis(slide, layout, stage, idMap);
  if (canonicalJson(receipt) !== canonicalJson(expectedPayloadReceipt(slide))) throw new WisePPTError(`${slide.page_id} payload receipt 与实际 materialization 计数不一致`);
  const attributes = {
    class: "slide",
    "data-page-id": slide.page_id,
    "data-page-title": slide.claim,
    "data-page-summary": slide.claim,
    "data-page-role": slide.page_role,
    "data-page-kind": layout.page_kind,
    "data-layout-id": layout.layout_id,
    "data-layout-code": layout.display_code,
    "data-layout-source": "registered",
    "data-layout-seed-sha256": seed.seed_sha256,
    "data-layout-structure-sha256": seed.locked.stage_structure_sha256,
    "data-section-id": String(slide.section_id || "section.default"),
    "data-section-title": String(slide.section_title || ""),
    "data-source-refs": canonicalJson(slide.source_refs),
    "data-source-evidence": canonicalJson(slide.source_evidence),
    "data-must-refs": canonicalJson(slide.must_refs),
    "data-emphasis-mode": emphasis ? "semantic-focus" : "none"
  };
  if (slide.relation_key) attributes["data-relation-key"] = slide.relation_key;
  if (emphasis) {
    attributes["data-emphasis-target"] = emphasis.target;
    attributes["data-emphasis-ref"] = emphasis.ref;
    attributes["data-emphasis-reason"] = emphasis.reason;
    attributes["data-emphasis-roles"] = emphasis.roles.join(" ");
    attributes["data-emphasis-members"] = canonicalJson(emphasis.members);
  }
  const attrText = Object.entries(attributes).map(([name, value]) => `${name}="${escapeHtml(value)}"`).join(" ");
  return {
    section: `<section ${attrText}>
${stage.toString()}
</section>`,
    css: rewriteScopedCss(seed.locked.scoped_css, layout.layout_id, slide.page_id, idMap),
    receipt: expectedComponentReceipt(slide, layout, seed, stage),
    geometry: expectedGeometryContract(slide, layout, seed)
  };
}
function mustOutcomes(spec) {
  return spec.must.map((item) => ({
    must_id: item.must_id,
    status: item.status,
    page_id: item.page_id ?? null,
    reason: item.reason ?? null,
    visible_evidence: item.visible_evidence ?? null,
    source_refs: item.source_refs || []
  }));
}
async function copyAuthoritativeFiles(root, outputRoot, resolvedFonts) {
  const mapping = new Map([
    ...REQUIRED_THEME_FILES.map((relative) => [relative, `assets/${path.basename(relative)}`]),
    ...REQUIRED_RUNTIME_FILES.map((relative) => [relative, relative])
  ]);
  const written = [];
  for (const [sourceRelative, outputRelative] of mapping.entries()) {
    const source = path.join(root, ...sourceRelative.split("/"));
    if (!await exists(source)) throw new WisePPTError(`缺少权威运行时资产: ${sourceRelative}`);
    const output = path.join(outputRoot, ...outputRelative.split("/"));
    if (sourceRelative === THEME_ENGINE_DESIGN_TOKENS) {
      await mkdir(path.dirname(output), { recursive: true });
      await writeFile(output, projectThemeAssetForPublishedAssets(sourceRelative, await readText(source, sourceRelative)));
    } else {
      await copyFileSafe(source, output);
    }
    written.push(outputRelative);
  }
  written.push(...await copyResolvedFonts(resolvedFonts, outputRoot));
  return written.sort();
}
async function currentCompilerHashes(root) {
  const compilerModules = (await readdir(path.join(root, "bin"), { withFileTypes: true })).filter((entry) => entry.isFile() && (entry.name.endsWith(".mjs") || entry.name === "package.json")).map((entry) => `bin/${entry.name}`).sort((left, right) => left.localeCompare(right, "en"));
  const paths = [...compilerModules, "runtime/app-template.html"];
  const result = {};
  for (const relative of paths) {
    const file = path.join(root, ...relative.split("/"));
    const digest = await shaFile(file).catch(() => null);
    if (!digest) throw new WisePPTError(`缺少 Wise PPT 编译器文件: ${relative}`);
    result[relative] = digest.sha256;
  }
  return result;
}
async function currentAuthorityHashes(root) {
  const result = {};
  for (const relative of REQUIRED_THEME_FILES) {
    const outputRelative = `assets/${path.basename(relative)}`;
    const source = path.join(root, ...relative.split("/"));
    result[outputRelative] = relative === THEME_ENGINE_DESIGN_TOKENS ? sha256Text(projectThemeAssetForPublishedAssets(relative, await readText(source, relative))) : (await shaFile(source)).sha256;
  }
  for (const relative of REQUIRED_RUNTIME_FILES) result[relative] = (await shaFile(path.join(root, ...relative.split("/")))).sha256;
  const manifest = await readJson(path.join(root, "themes/engine/fonts/font-manifest.json"), "font-manifest");
  for (const font of manifest.fonts || []) result[`assets/fonts/${font.filename}`] = font.sha256;
  return Object.fromEntries(Object.entries(result).sort(([a], [b]) => a.localeCompare(b, "en")));
}
async function currentCapabilityHashes(root) {
  const paths = [
    "capabilities/layouts/page-emphasis-contracts.json",
    "capabilities/layouts/icon-slot-contracts.json",
    "themes/engine/contracts/layout-theme-bindings.json"
  ];
  const result = {};
  for (const relative of paths) result[relative] = (await shaFile(path.join(root, ...relative.split("/")))).sha256;
  return result;
}
async function buildTo(root, specPath, outputRoot, options = {}) {
  const { registry, index, sha256: registrySha } = await registryState(root);
  const themeBindings = await loadLayoutThemeBindings(root, new Set(index.keys()));
  const spec = await readJson(specPath, "deck-spec");
  const resolved = await validateSpec(root, spec, index);
  const appearance = await resolvedAppearance(root, spec.deck);
  await mkdir(outputRoot, { recursive: true });
  const resolvedFonts = await resolveFonts(root, options.fonts || {});
  await copyAuthoritativeFiles(root, outputRoot, resolvedFonts);
  const icons = await iconAuthority(root);
  const sections = [];
  const cssBlocks = [];
  const receipts = [];
  const geometries = [];
  const usedSeeds = {};
  const mustById = new Map(spec.must.map((item) => [item.must_id, item]));
  const total = resolved.length;
  const signature = String(spec.deck.signature ?? DEFAULT_SIGNATURE).trim();
  for (const [offset, { slide, layout }] of resolved.entries()) {
    const seed = await loadSeed(root, layout.display_code);
    const folioText = `${offset + 1} / ${total}${signature ? ` — BY ${signature}` : ""}`;
    const built = await materializeSlide(root, slide, layout, seed, String(spec.deck.title), folioText, signature, icons, themeBindings.byLayout.get(layout.layout_id));
    const section$ = load(built.section, null, false);
    validatePageEvidence(section$, section$("section.slide").first(), slide, mustById);
    sections.push(projectThemeTypeRoles(built.section));
    cssBlocks.push(`/* ${slide.page_id} · ${layout.layout_id} · locked */
${built.css}`);
    receipts.push(built.receipt);
    geometries.push(built.geometry);
    usedSeeds[layout.layout_id] = seed.seed_sha256;
  }
  await mkdir(path.join(outputRoot, "assets"), { recursive: true });
  await writeFile(path.join(outputRoot, "assets/layouts.css"), `${cssBlocks.join("\n").trimEnd()}
`);
  const canonicalSpec = structuredClone(spec);
  canonicalSpec.mode = "standard";
  if (canonicalSpec.deck.theme.kind === "inline") canonicalSpec.deck.theme.definition = appearance.theme.definition;
  await writeFile(path.join(outputRoot, "deck-spec.json"), renderJson(canonicalSpec));
  await Promise.all([
    writeFile(path.join(outputRoot, "assets/theme.css"), renderThemeCss(appearance.theme)),
    writeFile(path.join(outputRoot, "theme-resolved.json"), renderJson(appearance.theme))
  ]);
  const deckPlan = {
    contract: DECK_PLAN_CONTRACT,
    title: spec.deck.title,
    thesis: spec.deck.thesis,
    input_type: spec.deck.input_type,
    must: structuredClone(spec.must),
    layout_session: structuredClone(resolved.layoutSession),
    pages: resolved.map(({ slide, layout }) => ({
      page_id: slide.page_id,
      page_role: slide.page_role,
      page_kind: layout.page_kind,
      relation_key: slide.relation_key ?? null,
      layout_id: layout.layout_id,
      claim: slide.claim,
      source_refs: slide.source_refs,
      source_evidence: structuredClone(slide.source_evidence),
      must_refs: slide.must_refs,
      emphasis: slide.emphasis ? structuredClone(slide.emphasis) : null,
      layout_override: slide.layout_override ? structuredClone(slide.layout_override) : null
    }))
  };
  const sourceLedger = {
    contract: "wise-ppt-source-ledger@4",
    input_type: spec.deck.input_type,
    sources: structuredClone(spec.sources),
    must_sources: spec.must.map((item) => ({ must_id: item.must_id, status: item.status, page_id: item.page_id ?? null, source_refs: item.source_refs })),
    page_sources: resolved.map(({ slide }) => ({ page_id: slide.page_id, source_refs: slide.source_refs, source_evidence: structuredClone(slide.source_evidence), must_refs: slide.must_refs }))
  };
  const componentReceipts = { contract: "wise-ppt-component-receipts@3", pages: receipts };
  const geometryContracts = { contract: "wise-ppt-geometry-contracts@3", pages: geometries };
  await Promise.all([
    writeFile(path.join(outputRoot, "deck-plan.json"), renderJson(deckPlan)),
    writeFile(path.join(outputRoot, "source-ledger.json"), renderJson(sourceLedger)),
    writeFile(path.join(outputRoot, "component-receipts.json"), renderJson(componentReceipts)),
    writeFile(path.join(outputRoot, "geometry-contracts.json"), renderJson(geometryContracts))
  ]);
  const inputDigest = sha256Text(canonicalJson(canonicalSpec));
  const authoritativeHashes = await currentAuthorityHashes(root);
  const capabilityHashes = await currentCapabilityHashes(root);
  const compilerHashes = await currentCompilerHashes(root);
  const buildId = sha256Text(canonicalJson({
    spec: inputDigest,
    registry: registrySha,
    seeds: usedSeeds,
    authoritative_files: authoritativeHashes,
    capability_contracts: capabilityHashes,
    compiler_sources: compilerHashes,
    runtime_version: RUNTIME_VERSION,
    theme: appearance.theme,
    typography_mode: appearance.typography
  }));
  const { theme, themeId, typography } = appearance;
  let html = await readText(path.join(root, "runtime/app-template.html"), "Wise PPT app 模板");
  const replacements = {
    "{{LANG}}": escapeHtml(spec.deck.lang || "zh-CN"),
    "{{PAGE_TITLE}}": escapeHtml(spec.deck.title, false),
    "{{DECK_TITLE_ATTR}}": escapeHtml(spec.deck.title),
    "{{THEME_ID}}": escapeHtml(themeId),
    "{{TYPOGRAPHY_MODE}}": escapeHtml(typography),
    "{{BUILD_ID}}": buildId,
    "{{LAYOUT_REGISTRY_VERSION}}": registrySha,
    "{{RUNTIME_VERSION}}": RUNTIME_VERSION,
    "{{FINAL_EMPHASIS}}": resolved.some(({ slide }) => slide.emphasis) ? "semantic-focus" : "none",
    "{{SLIDES}}": sections.join("\n")
  };
  for (const [marker, value] of Object.entries(replacements)) html = html.replaceAll(marker, value);
  const unresolved = [...new Set(html.match(/\{\{[A-Z0-9_]+\}\}/g) || [])];
  if (unresolved.length) throw new WisePPTError(`Wise PPT 模板仍有未替换变量: ${unresolved.sort().join(", ")}`);
  await writeFile(path.join(outputRoot, "index.html"), html);
  await writeFile(path.join(outputRoot, OUTPUT_MARKER), `${BUILD_CONTRACT}
`);
  const managedPaths = (await collectFiles(outputRoot, {
    includeHidden: true,
    exclude: (relative) => [OUTPUT_MARKER, "build-manifest.json"].includes(relative)
  })).sort((a, b) => a.localeCompare(b, "en"));
  const managedFiles = [];
  for (const relative of managedPaths) managedFiles.push(await fileRecord(outputRoot, relative));
  const assetsEntries = managedFiles.filter((item) => item.path.startsWith("assets/"));
  const buildManifest = {
    contract: BUILD_CONTRACT,
    build_id: buildId,
    input_type: spec.deck.input_type,
    must_outcomes: mustOutcomes(spec),
    input: { path: "deck-spec.json", sha256: (await shaFile(path.join(outputRoot, "deck-spec.json"))).sha256 },
    layout_registry: { registry_id: registry.registry_id, sha256: registrySha, counts: registry.counts },
    layout_seeds: Object.fromEntries(Object.entries(usedSeeds).sort(([a], [b]) => a.localeCompare(b, "en"))),
    compiler_sources: compilerHashes,
    authoritative_files: authoritativeHashes,
    capability_contracts: capabilityHashes,
    runtime_version: RUNTIME_VERSION,
    theme: {
      kind: spec.deck.theme.kind,
      theme_id: theme.theme_id,
      definition_contract: theme.definition.contract,
      resolved_contract: theme.contract,
      resolved_path: "theme-resolved.json",
      resolved_sha256: (await shaFile(path.join(outputRoot, "theme-resolved.json"))).sha256,
      css_path: "assets/theme.css",
      css_sha256: (await shaFile(path.join(outputRoot, "assets/theme.css"))).sha256,
      typography_mode: typography
    },
    page_count: sections.length,
    determinism: {
      input_digest: inputDigest,
      html_sha256: (await shaFile(path.join(outputRoot, "index.html"))).sha256,
      plan_sha256: (await shaFile(path.join(outputRoot, "deck-plan.json"))).sha256,
      assets_sha256: sha256Text(canonicalJson(assetsEntries))
    },
    standard_mode_forbidden_counts: zeroCounts(BUILD_FORBIDDEN_KEYS),
    managed_files: managedFiles
  };
  await writeFile(path.join(outputRoot, "build-manifest.json"), renderJson(buildManifest));
  return buildManifest;
}
async function directoryEntries(root) {
  const files = /* @__PURE__ */ new Set();
  const directories = /* @__PURE__ */ new Set();
  async function visit(current) {
    for (const entry of await readdir(current, { withFileTypes: true })) {
      const absolute = path.join(current, entry.name);
      const relative = path.relative(root, absolute).split(path.sep).join("/");
      if (entry.isSymbolicLink()) throw new WisePPTError(`Wise PPT 输出目录含不安全符号链接: ${relative}`);
      if (entry.isDirectory()) {
        directories.add(relative);
        await visit(absolute);
      } else if (entry.isFile()) files.add(relative);
      else throw new WisePPTError(`Wise PPT 输出目录含不支持的文件类型: ${relative}`);
    }
  }
  await visit(root);
  return { files, directories };
}
function validateManifestEntries(rawEntries, label) {
  if (!Array.isArray(rawEntries)) throw new WisePPTError(`${label}.managed_files 必须是完整数组`);
  const entries = /* @__PURE__ */ new Map();
  rawEntries.forEach((item, offset) => {
    const itemLabel = `${label}.managed_files[${offset + 1}]`;
    if (!item || typeof item !== "object" || Object.keys(item).sort().join(",") !== "bytes,path,sha256") throw new WisePPTError(`${itemLabel} 字段非法`);
    const relative = item.path;
    if (typeof relative !== "string" || !relative || relative.startsWith("/") || relative.includes("\\") || relative.split("/").some((part) => ["", ".", ".."].includes(part))) throw new WisePPTError(`${itemLabel}.path 非法: ${relative}`);
    if (entries.has(relative)) throw new WisePPTError(`${label}.managed_files 路径重复: ${relative}`);
    if (!/^[0-9a-f]{64}$/.test(String(item.sha256 || "")) || !Number.isInteger(item.bytes) || item.bytes < 0) throw new WisePPTError(`${itemLabel} 哈希或大小非法`);
    entries.set(relative, item);
  });
  return entries;
}
async function validatePreviousOutput(output, specPath) {
  const { files } = await directoryEntries(output);
  if (!files.size) return;
  if (!files.has(OUTPUT_MARKER) || !files.has("build-manifest.json")) {
    if (files.size !== 1 || !files.has("deck-spec.json")) throw new WisePPTError(`拒绝覆盖非 Wise PPT 生成目录: ${output}`);
    const [draft, source] = await Promise.all([readJson(path.join(output, "deck-spec.json"), "已有 deck-spec"), readJson(specPath, "输入 deck-spec")]);
    if (canonicalJson(draft) !== canonicalJson(source)) throw new WisePPTError(`输出目录里的 deck-spec.json 与本次构建输入不一致，拒绝收编: ${output}`);
    return;
  }
  if (await readText(path.join(output, OUTPUT_MARKER), OUTPUT_MARKER) !== `${BUILD_CONTRACT}
`) throw new WisePPTError(`${OUTPUT_MARKER} 合同标记错误，拒绝覆盖`);
  const previous = await readJson(path.join(output, "build-manifest.json"), "已有 build-manifest");
  if (previous.contract !== BUILD_CONTRACT) throw new WisePPTError(`拒绝覆盖未知生成目录: ${output}`);
  const entries = validateManifestEntries(previous.managed_files, "已有 build-manifest");
  const delivery = new Set([...files].filter((item) => ["deck.pdf", "delivery-manifest.json"].includes(item)));
  if (delivery.size === 1) throw new WisePPTError("已有输出的 deck.pdf 与 delivery-manifest.json 必须成对存在，拒绝覆盖");
  const expected = /* @__PURE__ */ new Set([...entries.keys(), OUTPUT_MARKER, "build-manifest.json", ...delivery]);
  if (expected.size !== files.size || setDifference(expected, files).length || setDifference(files, expected).length) throw new WisePPTError("Wise PPT 已有输出目录文件集不闭合，含未知文件，拒绝覆盖");
  for (const [relative, record] of entries) {
    if (relative === "deck-spec.json") continue;
    const digest = await shaFile(path.join(output, ...relative.split("/")));
    if (digest.sha256 !== record.sha256 || digest.bytes !== record.bytes) throw new WisePPTError(`已有 Wise PPT 受管产物已漂移，拒绝覆盖: ${relative}`);
  }
  if (delivery.size) {
    const manifest = await readJson(path.join(output, "delivery-manifest.json"), "已有 delivery-manifest");
    const record = manifest.artifacts?.pdf;
    const digest = await shaFile(path.join(output, "deck.pdf"));
    if (record?.path !== "deck.pdf" || record.sha256 !== digest.sha256 || record.bytes !== digest.bytes) throw new WisePPTError("已有 delivery-manifest 的 PDF 哈希或大小已漂移，拒绝覆盖");
  }
}
async function publishBuilt(tempRoot, output, specPath) {
  await assertNoSymlinkComponents(output, "--out");
  const existing = await stat(output).catch(() => null);
  if (existing?.isFile()) throw new WisePPTError(`--out 必须是目录: ${output}`);
  if (existing) await validatePreviousOutput(output, specPath);
  await mkdir(path.dirname(output), { recursive: true });
  const backup = `${output}.backup-${process.pid}-${Date.now()}`;
  let movedOld = false;
  try {
    if (existing) {
      await rename(output, backup);
      movedOld = true;
    }
    await rename(tempRoot, output);
    if (movedOld) await rm(backup, { recursive: true, force: true });
  } catch (error) {
    if (await exists(output)) await rm(output, { recursive: true, force: true }).catch(() => {
    });
    if (movedOld && await exists(backup)) await rename(backup, output).catch(() => {
    });
    throw new WisePPTError(`Wise PPT 原子发布失败，旧输出已回滚: ${error.message}`);
  }
}
function validateZeroCounts(value, keys, label) {
  if (!value || typeof value !== "object" || Array.isArray(value) || Object.keys(value).sort().join(",") !== [...keys].sort().join(",")) throw new WisePPTError(`${label} 必须精确包含固定禁区计数`);
  const invalid = Object.entries(value).filter(([, item]) => !Number.isInteger(item) || item !== 0);
  if (invalid.length) throw new WisePPTError(`${label} 的值必须是整数 0`);
}
async function expectedManagedSet(root) {
  const result = new Set(FIXED_GENERATED_FILES);
  REQUIRED_THEME_FILES.forEach((relative) => result.add(`assets/${path.basename(relative)}`));
  REQUIRED_RUNTIME_FILES.forEach((relative) => result.add(relative));
  const manifest = await readJson(path.join(root, "themes/engine/fonts/font-manifest.json"), "font-manifest");
  for (const font of manifest.fonts || []) result.add(`assets/fonts/${font.filename}`);
  result.add("assets/theme.css");
  result.add("theme-resolved.json");
  return result;
}
async function validateManagedClosure(root, deckRoot, build) {
  const expectedManaged = await expectedManagedSet(root);
  const entries = validateManifestEntries(build.managed_files, "build-manifest");
  if (expectedManaged.size !== entries.size || setDifference(expectedManaged, new Set(entries.keys())).length || setDifference(new Set(entries.keys()), expectedManaged).length) throw new WisePPTError("build-manifest 受管文件集不完整");
  const { files } = await directoryEntries(deckRoot);
  const delivery = new Set([...files].filter((item) => ["deck.pdf", "delivery-manifest.json"].includes(item)));
  if (delivery.size === 1) throw new WisePPTError("deck.pdf 与 delivery-manifest.json 必须成对存在");
  if (delivery.size) {
    const manifest = await readJson(path.join(deckRoot, "delivery-manifest.json"), "delivery-manifest");
    if (manifest.artifacts?.pdf?.path !== "deck.pdf") throw new WisePPTError("delivery-manifest.artifacts.pdf.path 必须固定为 deck.pdf");
  }
  const expectedDisk = /* @__PURE__ */ new Set([...expectedManaged, OUTPUT_MARKER, "build-manifest.json", ...delivery]);
  if (expectedDisk.size !== files.size || setDifference(expectedDisk, files).length || setDifference(files, expectedDisk).length) throw new WisePPTError("磁盘受管文件集不闭合");
  if (await readText(path.join(deckRoot, OUTPUT_MARKER), OUTPUT_MARKER) !== `${BUILD_CONTRACT}
`) throw new WisePPTError(`${OUTPUT_MARKER} 合同标记错误`);
  for (const [relative, record] of entries) {
    const digest = await shaFile(path.join(deckRoot, ...relative.split("/")));
    if (digest.sha256 !== record.sha256 || digest.bytes !== record.bytes) throw new WisePPTError(`冻结产物已漂移: ${relative}`);
  }
}
function validateProjectionPageSet(document, contract, expectedPageIds, label) {
  if (document.contract !== contract || !Array.isArray(document.pages)) throw new WisePPTError(`${label} 合同或 pages 错误`);
  const pageIds = document.pages.map((item) => item?.page_id);
  if (pageIds.some((item) => typeof item !== "string") || new Set(pageIds).size !== pageIds.length) throw new WisePPTError(`${label} page_id 非法或重复`);
  const expected = new Set(expectedPageIds);
  const actual = new Set(pageIds);
  if (expected.size !== actual.size || setDifference(expected, actual).length || setDifference(actual, expected).length) throw new WisePPTError(`${label} 页集合不完整`);
  return document.pages;
}
async function validateDeck(root, rawDeck) {
  const deckRoot = path.resolve(rawDeck);
  const required = ["index.html", "deck-spec.json", "deck-plan.json", "source-ledger.json", "component-receipts.json", "geometry-contracts.json", "build-manifest.json", OUTPUT_MARKER];
  const missing = [];
  for (const relative of required) if (!await exists(path.join(deckRoot, relative))) missing.push(relative);
  if (missing.length) throw new WisePPTError(`Wise PPT deck 缺少产物: ${missing.join(", ")}`);
  const { registry, index, sha256: registrySha } = await registryState(root);
  const themeBindings = await loadLayoutThemeBindings(root, new Set(index.keys()));
  const spec = await readJson(path.join(deckRoot, "deck-spec.json"), "deck-spec");
  const resolved = await validateSpec(root, spec, index);
  const appearance = await resolvedAppearance(root, spec.deck);
  const icons = await iconAuthority(root);
  const build = await readJson(path.join(deckRoot, "build-manifest.json"), "build-manifest");
  if (build.contract !== BUILD_CONTRACT) throw new WisePPTError("build-manifest 合同错误");
  if (build.layout_registry?.sha256 !== registrySha || canonicalJson(build.layout_registry?.counts) !== canonicalJson(registry.counts)) throw new WisePPTError("build 使用的骨架注册表已过期");
  if (build.page_count !== resolved.length || build.input_type !== spec.deck.input_type) throw new WisePPTError("build page_count/input_type 与 deck-spec 不一致");
  if (canonicalJson(build.must_outcomes) !== canonicalJson(mustOutcomes(spec))) throw new WisePPTError("build must_outcomes 与 deck-spec 不一致");
  if (build.runtime_version !== RUNTIME_VERSION) throw new WisePPTError(`build runtime_version 必须是 ${RUNTIME_VERSION}`);
  const expectedResolved = appearance.theme;
  const actualResolved = await readJson(path.join(deckRoot, "theme-resolved.json"), "theme-resolved");
  const actualThemeCss = await readText(path.join(deckRoot, "assets/theme.css"), "theme.css");
  if (canonicalJson(actualResolved) !== canonicalJson(expectedResolved)) throw new WisePPTError("theme-resolved.json 不是 deck.theme 的确定性投影");
  if (actualThemeCss !== renderThemeCss(expectedResolved)) throw new WisePPTError("assets/theme.css 不是 deck.theme 的确定性投影");
  const expectedThemeManifest = {
    kind: spec.deck.theme.kind,
    theme_id: expectedResolved.theme_id,
    definition_contract: expectedResolved.definition.contract,
    resolved_contract: expectedResolved.contract,
    resolved_path: "theme-resolved.json",
    resolved_sha256: (await shaFile(path.join(deckRoot, "theme-resolved.json"))).sha256,
    css_path: "assets/theme.css",
    css_sha256: (await shaFile(path.join(deckRoot, "assets/theme.css"))).sha256,
    typography_mode: appearance.typography
  };
  if (canonicalJson(build.theme) !== canonicalJson(expectedThemeManifest)) throw new WisePPTError("build-manifest.theme 与锁定主题不一致");
  validateZeroCounts(build.standard_mode_forbidden_counts, BUILD_FORBIDDEN_KEYS, "build-manifest.standard_mode_forbidden_counts");
  await validateManagedClosure(root, deckRoot, build);
  if (canonicalJson(build.compiler_sources) !== canonicalJson(await currentCompilerHashes(root))) throw new WisePPTError("build 使用的 Wise PPT 编译器/模板已过期；请重新 build");
  if (canonicalJson(build.authoritative_files) !== canonicalJson(await currentAuthorityHashes(root))) throw new WisePPTError("build 使用的主题/字体/runtime 已过期；请重新 build");
  if (canonicalJson(build.capability_contracts) !== canonicalJson(await currentCapabilityHashes(root))) throw new WisePPTError("build 使用的主题绑定、强调或图标槽位合同已过期；请重新 build");
  const deckPlan = await readJson(path.join(deckRoot, "deck-plan.json"), "deck-plan");
  const expectedPlanPages = resolved.map(({ slide, layout }) => ({
    page_id: slide.page_id,
    page_role: slide.page_role,
    page_kind: layout.page_kind,
    relation_key: slide.relation_key ?? null,
    layout_id: layout.layout_id,
    claim: slide.claim,
    source_refs: slide.source_refs,
    source_evidence: slide.source_evidence,
    must_refs: slide.must_refs,
    emphasis: slide.emphasis ?? null,
    layout_override: slide.layout_override ?? null
  }));
  if (deckPlan.contract !== DECK_PLAN_CONTRACT || deckPlan.input_type !== spec.deck.input_type || canonicalJson(deckPlan.must) !== canonicalJson(spec.must) || canonicalJson(deckPlan.layout_session) !== canonicalJson(resolved.layoutSession) || canonicalJson(deckPlan.pages) !== canonicalJson(expectedPlanPages)) throw new WisePPTError("deck-plan 与 deck-spec 不一致");
  const sourceLedger = await readJson(path.join(deckRoot, "source-ledger.json"), "source-ledger");
  const expectedMustSources = spec.must.map((item) => ({ must_id: item.must_id, status: item.status, page_id: item.page_id ?? null, source_refs: item.source_refs }));
  const expectedPageSources = resolved.map(({ slide }) => ({ page_id: slide.page_id, source_refs: slide.source_refs, source_evidence: slide.source_evidence, must_refs: slide.must_refs }));
  if (sourceLedger.contract !== "wise-ppt-source-ledger@4" || sourceLedger.input_type !== spec.deck.input_type || canonicalJson(sourceLedger.sources) !== canonicalJson(spec.sources) || canonicalJson(sourceLedger.must_sources) !== canonicalJson(expectedMustSources) || canonicalJson(sourceLedger.page_sources) !== canonicalJson(expectedPageSources)) throw new WisePPTError("source-ledger 与 deck-spec 来源/must 去向不一致");
  const html = await readText(path.join(deckRoot, "index.html"), "index.html");
  const $ = load(html);
  const htmlRoot = $("html").first();
  if (htmlRoot.attr("data-deck-contract-version") !== "9" || htmlRoot.attr("data-runtime-version") !== RUNTIME_VERSION) throw new WisePPTError("index.html deck/runtime 合同错误");
  if (htmlRoot.attr("data-theme-id") !== appearance.themeId) throw new WisePPTError("index.html theme id 与 deck-spec 不一致");
  if ($('link[rel="stylesheet"][href="assets/theme.css"]').length !== 1) throw new WisePPTError("index.html 必须且只能加载一个 assets/theme.css");
  if (htmlRoot.attr("data-theme-preset") !== void 0 || htmlRoot.attr("data-theme-family") !== void 0) throw new WisePPTError("deck@9 HTML 不得残留旧主题接口");
  const expectedFinalEmphasis = resolved.some(({ slide }) => slide.emphasis) ? "semantic-focus" : "none";
  if (htmlRoot.attr("data-final-emphasis") !== expectedFinalEmphasis) throw new WisePPTError("index.html 最终强调状态与 deck-spec 不一致");
  if (htmlRoot.attr("data-build-id") !== build.build_id || htmlRoot.attr("data-layout-registry-version") !== registrySha) throw new WisePPTError("index.html build/registry 元数据不一致");
  if (!$('link[rel="stylesheet"][href="runtime/deck-shell.css"]').length) throw new WisePPTError("index.html 未加载 HTML/PDF 共用 deck-shell.css");
  const slideNodes = $("#track > .slide").toArray();
  if (slideNodes.length !== resolved.length) throw new WisePPTError("index.html slide 数与 deck-spec 不一致");
  const expectedPageIds = resolved.map(({ slide }) => slide.page_id);
  const receipts = await readJson(path.join(deckRoot, "component-receipts.json"), "component-receipts");
  const receiptPages = validateProjectionPageSet(receipts, "wise-ppt-component-receipts@3", expectedPageIds, "component-receipts");
  receiptPages.forEach((page, indexValue) => validateZeroCounts(page.forbidden_counts, RECEIPT_FORBIDDEN_KEYS, `component-receipts.pages[${indexValue + 1}].forbidden_counts`));
  const geometry = await readJson(path.join(deckRoot, "geometry-contracts.json"), "geometry-contracts");
  validateProjectionPageSet(geometry, "wise-ppt-geometry-contracts@3", expectedPageIds, "geometry-contracts");
  const expectedReceipts = [];
  const expectedGeometries = [];
  const expectedCss = [];
  const mustById = new Map(spec.must.map((item) => [item.must_id, item]));
  for (let offset = 0; offset < resolved.length; offset += 1) {
    const { slide, layout } = resolved[offset];
    const node = $(slideNodes[offset]);
    if (node.attr("data-page-id") !== slide.page_id || node.attr("data-layout-id") !== layout.layout_id || node.attr("data-layout-source") !== "registered") throw new WisePPTError(`${slide.page_id} HTML 元数据与 spec 不一致`);
    if (node.attr("data-source-refs") !== canonicalJson(slide.source_refs) || node.attr("data-source-evidence") !== canonicalJson(slide.source_evidence) || node.attr("data-must-refs") !== canonicalJson(slide.must_refs)) throw new WisePPTError(`${slide.page_id} HTML 来源元数据与 spec 不一致`);
    if (slide.emphasis) {
      const seedForEmphasis = await loadSeed(root, layout.display_code);
      const seedForEmphasis$ = load(seedForEmphasis.locked.stage_html, null, false);
      const seedForEmphasisStage = seedForEmphasis$(".stage").first();
      const emphasisIdMap = prefixDomIds(seedForEmphasis$, seedForEmphasisStage, safePagePrefix(slide.page_id));
      const expectedEmphasis = materializedEmphasis(slide, layout, seedForEmphasisStage, emphasisIdMap);
      if (node.attr("data-emphasis-mode") !== "semantic-focus" || node.attr("data-emphasis-target") !== expectedEmphasis.target || node.attr("data-emphasis-ref") !== expectedEmphasis.ref || node.attr("data-emphasis-reason") !== expectedEmphasis.reason || node.attr("data-emphasis-roles") !== expectedEmphasis.roles.join(" ") || node.attr("data-emphasis-members") !== canonicalJson(expectedEmphasis.members)) throw new WisePPTError(`${slide.page_id} HTML 强调元数据与 spec/逐页合同不一致`);
    } else if (node.attr("data-emphasis-mode") !== "none" || node.attr("data-emphasis-target") || node.attr("data-emphasis-members")) {
      throw new WisePPTError(`${slide.page_id} 未声明强调却残留强调元数据`);
    }
    validatePageEvidence($, node, slide, mustById);
    if (node.find("style").length) throw new WisePPTError(`${slide.page_id} 含页面级 CSS`);
    const seed = await loadSeed(root, layout.display_code);
    const stage = node.children(".stage").first();
    const stageDigest = stage.length ? structureDigest(stage.toString()) : null;
    if (!stage.length || stageDigest !== seed.locked.stage_structure_sha256) {
      throw new WisePPTError(`${slide.page_id} DOM/CSS/结构/组件/几何已偏离锁定 seed（${stageDigest || "missing"} != ${seed.locked.stage_structure_sha256}）`);
    }
    validateMaterializedThemeSemantics($, stage, icons, slide.page_id);
    validateProjectedLayoutThemeBindings(stage, themeBindings.byLayout.get(layout.layout_id), slide.page_id);
    const seed$ = load(seed.locked.stage_html, null, false);
    const seedStage = seed$(".stage").first();
    const idMap = prefixDomIds(seed$, seedStage, safePagePrefix(slide.page_id));
    expectedCss.push(`/* ${slide.page_id} · ${layout.layout_id} · locked */
${rewriteScopedCss(seed.locked.scoped_css, layout.layout_id, slide.page_id, idMap)}`);
    expectedReceipts.push(expectedComponentReceipt(slide, layout, seed, stage));
    expectedGeometries.push(expectedGeometryContract(slide, layout, seed));
  }
  if (canonicalJson(receipts) !== canonicalJson({ contract: "wise-ppt-component-receipts@3", pages: expectedReceipts })) throw new WisePPTError("component-receipts 不是确定性完整投影");
  if (canonicalJson(geometry) !== canonicalJson({ contract: "wise-ppt-geometry-contracts@3", pages: expectedGeometries })) throw new WisePPTError("geometry-contracts 不是确定性完整投影");
  const actualCss = await readText(path.join(deckRoot, "assets/layouts.css"), "assets/layouts.css");
  if (actualCss !== `${expectedCss.join("\n").trimEnd()}
`) throw new WisePPTError("assets/layouts.css 不是锁定 seed 的确定性投影");
  return { page_count: slideNodes.length, build_id: build.build_id, registry_sha256: registrySha };
}
async function buildAndPublish(root, rawSpec, rawOutput, options = {}) {
  const specPath = assertAbsolute(rawSpec, "deck-spec 路径");
  const output = assertAbsolute(rawOutput, "--out ");
  if (!await exists(specPath)) throw new WisePPTError(`deck-spec 不存在: ${specPath}`);
  await assertNoSymlinkComponents(specPath, "deck-spec");
  await assertNoSymlinkComponents(output, "--out");
  await mkdir(path.dirname(output), { recursive: true });
  const tempRoot = await (await import("node:fs/promises")).mkdtemp(path.join(path.dirname(output), ".wise-ppt-build-"));
  let published = false;
  try {
    const manifest = await buildTo(root, specPath, tempRoot, options);
    await validateDeck(root, tempRoot);
    await publishBuilt(tempRoot, output, specPath);
    published = true;
    await validateDeck(root, output);
    return { manifest, output };
  } finally {
    if (!published) await rm(tempRoot, { recursive: true, force: true }).catch(() => {
    });
  }
}
export {
  buildAndPublish,
  buildTo,
  layoutSelectionState,
  loadLayoutThemeBindings,
  loadSeed,
  normalizeLayoutContext,
  normalizeLayoutUsage,
  normalizeSelectionSeed,
  planLayouts,
  preflightSpec,
  projectLayoutThemeBindings,
  projectThemeTypeRoles,
  publishBuilt,
  queryLayouts,
  registryState,
  resolvedAppearance,
  structureDigest,
  validateDeck,
  validateSpec
};
