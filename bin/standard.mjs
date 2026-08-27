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
  DEFAULT_SIGNATURE,
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
const ALLOWED_TOP_LEVEL = /* @__PURE__ */ new Set(["contract", "mode", "deck", "sources", "must", "slides"]);
const ALLOWED_DECK_FIELDS = /* @__PURE__ */ new Set(["title", "thesis", "input_type", "theme_preset", "typography_mode", "lang", "signature"]);
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
  "section_title"
]);
const ALLOWED_MUST_FIELDS = /* @__PURE__ */ new Set(["must_id", "content", "status", "page_id", "reason", "visible_evidence", "source_refs"]);
const PAYLOAD_CATEGORIES = Object.freeze({ text: "text", data: "data", icons: "icon" });
const PAYLOAD_SURFACES = Object.freeze({ text: "text", data: "text", icons: "icon" });
const INPUT_TYPES = /* @__PURE__ */ new Set(["pdf", "url", "multi-doc", "existing-deck", "oral", "short-text"]);
const SOURCE_BACKED_INPUT_TYPES = /* @__PURE__ */ new Set(["pdf", "url", "multi-doc", "existing-deck"]);
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
function setDifference(left, right) {
  return [...left].filter((value) => !right.has(value));
}
function assertKnownKeys(value, allowed, label) {
  const unknown = Object.keys(value).filter((key) => !allowed.has(key));
  if (unknown.length) throw new WisePPTError(`${label} \u672A\u767B\u8BB0\u5B57\u6BB5: ${unknown.sort().join(", ")}`);
}
function plainString(value, label, allowEmpty = false) {
  if (typeof value !== "string" || !allowEmpty && !value.trim()) {
    throw new WisePPTError(`${label}\u5FC5\u987B\u662F${allowEmpty ? "\u53EF\u7A7A" : "\u975E\u7A7A"}\u5B57\u7B26\u4E32`);
  }
  return value;
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
    throw new WisePPTError(`${label} \u5FC5\u987B\u662F\u7531\u975E\u7A7A\u5B57\u7B26\u4E32\u7EC4\u6210\u7684\u6570\u7EC4`);
  }
  if (requireNonempty && !value.length) throw new WisePPTError(`${label} \u5BF9\u5F53\u524D input_type \u5FC5\u987B\u975E\u7A7A`);
  if (new Set(value).size !== value.length) throw new WisePPTError(`${label} \u4E0D\u5F97\u91CD\u590D`);
  const unknown = value.filter((item) => !allowed.has(item));
  if (unknown.length) throw new WisePPTError(`${label} \u542B\u672A\u767B\u8BB0\u5F15\u7528: ${unknown.sort().join(", ")}`);
  return value;
}
function sourceEvidenceMap(value, refs, label) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new WisePPTError(`${label} \u5FC5\u987B\u662F source_id \u2192 \u53EF\u89C1\u8BCD\u6761\u6570\u7EC4\u7684\u5BF9\u8C61`);
  }
  const expected = new Set(refs);
  const actual = new Set(Object.keys(value));
  if (expected.size !== actual.size || setDifference(expected, actual).length || setDifference(actual, expected).length) {
    throw new WisePPTError(`${label} \u5FC5\u987B\u4E0E source_refs \u4E00\u4E00\u5BF9\u5E94`);
  }
  for (const sourceId of refs) {
    const terms = value[sourceId];
    if (!Array.isArray(terms) || !terms.length || !terms.every((term) => typeof term === "string" && term.trim())) {
      throw new WisePPTError(`${label}.${sourceId} \u5FC5\u987B\u662F\u975E\u7A7A\u53EF\u89C1\u8BCD\u6761\u6570\u7EC4`);
    }
    if (new Set(terms).size !== terms.length) throw new WisePPTError(`${label}.${sourceId} \u53EF\u89C1\u8BCD\u6761\u4E0D\u5F97\u91CD\u590D`);
  }
  return value;
}
function walkForbidden(value, current = "") {
  if (Array.isArray(value)) {
    value.forEach((child, index) => walkForbidden(child, `${current}[${index}]`));
    return;
  }
  if (!value || typeof value !== "object") return;
  for (const [key, child] of Object.entries(value)) {
    const normalized = key.toLowerCase().replaceAll("-", "_");
    if (FORBIDDEN_KEYS.has(normalized)) throw new WisePPTError(`\u6807\u51C6\u6A21\u5F0F\u7981\u6B62\u5B57\u6BB5: ${current ? `${current}.` : ""}${key}`);
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
  if (Number.isInteger(minimum) && count < minimum) throw new WisePPTError(`${label}.items=${count} \u5C0F\u4E8E\u9AA8\u67B6\u6700\u5C0F\u5BB9\u91CF ${minimum}`);
  if (Number.isInteger(maximum) && count > maximum) throw new WisePPTError(`${label}.items=${count} \u8D85\u8FC7\u9AA8\u67B6\u6700\u5927\u5BB9\u91CF ${maximum}\uFF1B\u8BF7\u7CBE\u7B80\u3001\u6362\u9AA8\u67B6\u6216\u62C6\u9875`);
}
function expectedBindingKeys(bindings, declaredItems, label) {
  const indexes = new Set(bindings.filter((item) => item.item_scope === "item").map((item) => item.item_index));
  if (!indexes.size || [...indexes].some((index) => !Number.isInteger(index) || index < 0)) {
    throw new WisePPTError(`${label} \u7684\u767B\u8BB0 binding \u7F3A\u5C11\u5408\u6CD5 item grouping`);
  }
  const available = Math.max(...indexes) + 1;
  if (declaredItems > available) throw new WisePPTError(`${label}.items=${declaredItems} \u8D85\u8FC7\u767B\u8BB0 item groups ${available}\uFF1B\u8BF7\u6362\u9AA8\u67B6\u6216\u62C6\u9875`);
  return new Set(bindings.filter((item) => item.item_scope === "slot" || item.item_scope === "item" && item.item_index < declaredItems).map((item) => item.key));
}
function validateExactFields(fields, bindings, items, label) {
  const expected = expectedBindingKeys(bindings, items, label);
  const actual = new Set(Object.keys(fields));
  const missing = setDifference(expected, actual);
  const extra = setDifference(actual, expected);
  if (missing.length || extra.length) throw new WisePPTError(`${label}.fields \u5FC5\u987B\u7CBE\u786E\u586B\u5199 declared items \u5BF9\u5E94\u7684\u5B8C\u6574 binding\uFF1A\u7F3A\u5931=${missing.sort()}\uFF0C\u8D85\u51FA=${extra.sort()}`);
}
function normalizedExample(value) {
  return ["string", "number"].includes(typeof value) ? String(value).trim().replace(/\s+/g, " ") : "";
}
function validatePayloadShape(category, value, label, slot) {
  const bindings = registeredBindings(category, slot);
  if (!bindings.length) throw new WisePPTError(`${label} \u6CA1\u6709\u516C\u5F00 binding key`);
  if (Array.isArray(value)) throw new WisePPTError(`${label} \u7981\u6B62\u4F4D\u7F6E\u6570\u7EC4\uFF1B\u8BF7\u6309\u516C\u5F00 binding key \u586B\u5199 fields`);
  if (bindings.length > 1 && (!value || typeof value !== "object")) throw new WisePPTError(`${label} \u662F\u591A\u5B57\u6BB5\u69FD\uFF0C\u5FC5\u987B\u4F7F\u7528 fields/items \u63A7\u5236\u5BF9\u8C61`);
  let fields;
  let items;
  if (value && typeof value === "object") {
    const keys = Object.keys(value);
    if (keys.length !== 2 || !keys.includes("fields") || !keys.includes("items")) {
      throw new WisePPTError(`${label} \u53EA\u80FD\u4F7F\u7528 {fields: {binding_key: value}, items: n}`);
    }
    fields = value.fields;
    items = value.items;
    if (!fields || typeof fields !== "object" || Array.isArray(fields)) throw new WisePPTError(`${label}.fields \u5FC5\u987B\u662F binding key \u2192 \u503C\u7684\u5BF9\u8C61`);
    if (!Number.isInteger(items) || items < 0) throw new WisePPTError(`${label}.items \u5FC5\u987B\u662F\u975E\u8D1F\u6574\u6570`);
  } else {
    fields = { [bindings[0].key]: value };
    items = 1;
  }
  const known = new Set(bindings.map((item) => item.key));
  const unknown = Object.keys(fields).filter((key) => !known.has(key));
  if (unknown.length) throw new WisePPTError(`${label}.fields \u4F7F\u7528\u672A\u77E5 binding key: ${unknown.sort().join(", ")}`);
  const empty = Object.entries(fields).filter(([, field]) => !semanticValue(field)).map(([key]) => key);
  if (empty.length) throw new WisePPTError(`${label}.fields \u542B\u7A7A\u767D\u767B\u8BB0\u503C: ${empty.sort().join(", ")}`);
  validateCapacity(slot, items, label);
  validateExactFields(fields, bindings, items, label);
  if (category !== "icons") {
    const byKey = new Map(bindings.map((binding) => [binding.key, normalizedExample(binding.example)]));
    if (Object.keys(fields).length && Object.entries(fields).every(([key, field]) => byKey.get(key) && normalizedExample(field) === byKey.get(key))) {
      throw new WisePPTError(`${label} \u6574\u69FD\u7167\u6284 Catalog example\uFF1B\u81F3\u5C11\u66FF\u6362\u4E00\u4E2A\u5B57\u6BB5\u4E3A\u771F\u5B9E\u5185\u5BB9`);
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
      if (previous && previous !== category) throw new WisePPTError(`${pageId}.payload \u540C\u4E00\u69FD ${slotId} \u7684 ${PAYLOAD_SURFACES[category]} binding surface \u4E0D\u80FD\u540C\u65F6\u7531 ${previous} \u4E0E ${category} \u586B\u5199`);
      owners.set(key, category);
    }
  }
}
async function registryState(root) {
  const file = path.join(root, "capabilities/layouts/layout-registry.json");
  const registry = await readJson(file, "Wise PPT \u9AA8\u67B6\u6CE8\u518C\u8868");
  if (!registry.counts || registry.counts.total !== 83 || registry.counts.relationship !== 71 || registry.counts.nonrelationship !== 12) {
    throw new WisePPTError(`Wise PPT \u9AA8\u67B6\u6CE8\u518C\u8868\u6570\u91CF\u9519\u8BEF: ${JSON.stringify(registry.counts)}`);
  }
  if (!Array.isArray(registry.layouts) || registry.layouts.length !== registry.counts.total) throw new WisePPTError("Wise PPT \u9AA8\u67B6\u6CE8\u518C\u8868 layouts \u6570\u91CF\u9519\u8BEF");
  const index = /* @__PURE__ */ new Map();
  for (const layout of registry.layouts) {
    if (!layout.layout_id || index.has(layout.layout_id)) throw new WisePPTError(`Wise PPT \u6CE8\u518C\u8868 layout_id \u7F3A\u5931\u6216\u91CD\u590D: ${layout.layout_id || ""}`);
    index.set(layout.layout_id, layout);
  }
  return { registry, index, sha256: (await shaFile(file)).sha256 };
}
async function resolvedAppearance(root, deck) {
  const authority = await readJson(path.join(root, "capabilities/runtime-authority-manifest.json"), "Runtime authority");
  if (authority.format !== "wise-ppt-runtime-authority@1") throw new WisePPTError("Runtime authority \u5408\u540C\u9519\u8BEF");
  const appearance = authority.appearance_presets || {};
  const presets = new Set(appearance.preset_ids || []);
  const defaults = appearance.preset_defaults || {};
  const theme = String(deck.theme_preset || "");
  if (!presets.has(theme) || !defaults[theme]) throw new WisePPTError(`\u672A\u767B\u8BB0 theme_preset: ${theme}`);
  const modes = new Set(authority.typography?.mode_ids || []);
  const typography = String(deck.typography_mode || defaults[theme].default_typography_mode || "");
  if (!modes.has(typography)) throw new WisePPTError(`\u672A\u767B\u8BB0 typography_mode: ${typography}`);
  return { theme, typography };
}
async function validateSpec(root, spec, layoutIndex = null) {
  assertKnownKeys(spec, ALLOWED_TOP_LEVEL, "deck-spec \u9876\u5C42");
  if (spec.contract !== DECK_CONTRACT) throw new WisePPTError(`deck-spec.contract \u5FC5\u987B\u662F ${DECK_CONTRACT}`);
  if ((spec.mode || "standard") !== "standard") throw new WisePPTError("\u516C\u5F00 build \u53EA\u63A5\u53D7 mode=standard\uFF1B\u5B9E\u9A8C\u9AA8\u67B6\u4E0D\u80FD\u6DF7\u5165\u6807\u51C6\u6210\u54C1");
  walkForbidden(spec);
  const deck = spec.deck;
  if (!deck || typeof deck !== "object" || Array.isArray(deck)) throw new WisePPTError("deck-spec.deck \u5FC5\u987B\u662F\u5BF9\u8C61");
  assertKnownKeys(deck, ALLOWED_DECK_FIELDS, "deck-spec.deck");
  plainString(deck.title, "deck.title");
  plainString(deck.thesis, "deck.thesis");
  const inputType = plainString(deck.input_type, "deck.input_type");
  if (!INPUT_TYPES.has(inputType)) throw new WisePPTError(`deck.input_type \u672A\u767B\u8BB0: ${inputType}`);
  plainString(deck.theme_preset, "deck.theme_preset");
  if (deck.lang !== void 0 && !/^[A-Za-z]{2,8}(?:-[A-Za-z0-9]{1,8})*$/.test(plainString(deck.lang, "deck.lang"))) throw new WisePPTError("deck.lang \u5FC5\u987B\u662F\u53D7\u9650 ASCII language tag");
  if (deck.signature !== void 0 && !plainString(deck.signature, "deck.signature").trim()) throw new WisePPTError("deck.signature \u5FC5\u987B\u662F\u975E\u7A7A\u767D\u7F72\u540D");
  await resolvedAppearance(root, deck);
  const { index } = layoutIndex ? { index: layoutIndex } : await registryState(root);
  if (!Array.isArray(spec.sources)) throw new WisePPTError("deck-spec.sources \u5FC5\u987B\u662F\u6570\u7EC4");
  if (SOURCE_BACKED_INPUT_TYPES.has(inputType) && !spec.sources.length) throw new WisePPTError(`deck.input_type=${inputType} \u5FC5\u987B\u767B\u8BB0\u81F3\u5C11\u4E00\u4E2A source`);
  const sourceIds = /* @__PURE__ */ new Set();
  const usedSourceIds = /* @__PURE__ */ new Set();
  spec.sources.forEach((source, offset) => {
    if (!source || typeof source !== "object" || Array.isArray(source)) throw new WisePPTError(`sources[${offset + 1}] \u5FC5\u987B\u662F\u5BF9\u8C61`);
    assertKnownKeys(source, ALLOWED_SOURCE_FIELDS, `sources[${offset + 1}]`);
    const sourceId = plainString(source.source_id, `sources[${offset + 1}].source_id`);
    plainString(source.title, `sources[${offset + 1}].title`);
    if (sourceIds.has(sourceId)) throw new WisePPTError(`source_id \u91CD\u590D: ${sourceId}`);
    sourceIds.add(sourceId);
  });
  if (!Array.isArray(spec.must)) throw new WisePPTError("deck-spec.must \u5FC5\u987B\u662F\u6570\u7EC4");
  const mustById = /* @__PURE__ */ new Map();
  for (const [offset, item] of spec.must.entries()) {
    const label = `must[${offset + 1}]`;
    if (!item || typeof item !== "object" || Array.isArray(item)) throw new WisePPTError(`${label} \u5FC5\u987B\u662F\u5BF9\u8C61`);
    assertKnownKeys(item, ALLOWED_MUST_FIELDS, label);
    const mustId = plainString(item.must_id, `${label}.must_id`);
    if (mustById.has(mustId)) throw new WisePPTError(`must_id \u91CD\u590D: ${mustId}`);
    plainString(item.content, `${label}.content`);
    if (!["placed", "omitted"].includes(plainString(item.status, `${label}.status`))) throw new WisePPTError(`${label}.status \u53EA\u80FD\u662F placed \u6216 omitted`);
    const refs = referenceList(item.source_refs, `${label}.source_refs`, sourceIds, SOURCE_BACKED_INPUT_TYPES.has(inputType));
    refs.forEach((id) => usedSourceIds.add(id));
    if (item.status === "placed") {
      plainString(item.page_id, `${label}.page_id`);
      plainString(item.visible_evidence, `${label}.visible_evidence`);
      if (![void 0, null, ""].includes(item.reason)) throw new WisePPTError(`${label} \u5DF2\u843D\u9875\uFF0C\u4E0D\u5F97\u58F0\u660E omitted reason`);
    } else {
      plainString(item.reason, `${label}.reason`);
      if (![void 0, null, ""].includes(item.page_id) || ![void 0, null, ""].includes(item.visible_evidence)) throw new WisePPTError(`${label} \u5DF2\u7701\u7565\uFF0C\u4E0D\u5F97\u58F0\u660E page_id/visible_evidence`);
    }
    mustById.set(mustId, item);
  }
  if (!Array.isArray(spec.slides) || !spec.slides.length) throw new WisePPTError("deck-spec.slides \u5FC5\u987B\u662F\u975E\u7A7A\u6570\u7EC4");
  const pageIds = /* @__PURE__ */ new Set();
  const mustPages = new Map([...mustById.keys()].map((id) => [id, []]));
  const pageSources = /* @__PURE__ */ new Map();
  const resolved = [];
  for (const [offset, slide] of spec.slides.entries()) {
    const label = `slides[${offset + 1}]`;
    if (!slide || typeof slide !== "object" || Array.isArray(slide)) throw new WisePPTError(`${label} \u5FC5\u987B\u662F\u5BF9\u8C61`);
    assertKnownKeys(slide, ALLOWED_SLIDE_FIELDS, label);
    const pageId = plainString(slide.page_id, `${label}.page_id`);
    if (!/^[a-z][a-z0-9-]*$/.test(pageId)) throw new WisePPTError(`${label}.page_id \u5FC5\u987B\u5339\u914D ^[a-z][a-z0-9-]*$: ${pageId}`);
    if (pageIds.has(pageId)) throw new WisePPTError(`page_id \u91CD\u590D: ${pageId}`);
    pageIds.add(pageId);
    const pageRole = plainString(slide.page_role, `${label}.page_role`);
    const layoutId = plainString(slide.layout_id, `${label}.layout_id`);
    plainString(slide.claim, `${label}.claim`);
    const layout = index.get(layoutId);
    if (!layout) throw new WisePPTError(`${label} \u4F7F\u7528\u672A\u767B\u8BB0 layout_id: ${layoutId}`);
    if (layout.page_kind === "relationship") {
      const relation = plainString(slide.relation_key, `${label}.relation_key`);
      if (!(layout.relations || []).includes(relation)) throw new WisePPTError(`${pageId} relation_key=${relation} \u4E0D\u53D7 ${layoutId} \u652F\u6301`);
      if (!(layout.page_roles || []).includes(pageRole)) throw new WisePPTError(`${pageId} page_role=${pageRole} \u4E0D\u53D7 ${layoutId} \u652F\u6301`);
    } else {
      if (![void 0, null, ""].includes(slide.relation_key)) throw new WisePPTError(`${pageId} \u662F\u975E\u5173\u7CFB\u9875\uFF0C\u4E0D\u5F97\u58F0\u660E relation_key`);
      if (pageRole !== layout.page_role) throw new WisePPTError(`${pageId} page_role \u5FC5\u987B\u662F ${layout.page_role}`);
    }
    const refs = referenceList(slide.source_refs, `${pageId}.source_refs`, sourceIds, SOURCE_BACKED_INPUT_TYPES.has(inputType));
    refs.forEach((id) => usedSourceIds.add(id));
    sourceEvidenceMap(slide.source_evidence, refs, `${pageId}.source_evidence`);
    pageSources.set(pageId, refs);
    const mustRefs = referenceList(slide.must_refs, `${pageId}.must_refs`, new Set(mustById.keys()));
    mustRefs.forEach((id) => mustPages.get(id).push(pageId));
    const payload = slide.payload;
    if (!payload || typeof payload !== "object" || Array.isArray(payload) || !Object.keys(payload).length) throw new WisePPTError(`${pageId}.payload \u5FC5\u987B\u662F\u975E\u7A7A\u5BF9\u8C61`);
    const unknownTypes = Object.keys(payload).filter((key) => !(key in PAYLOAD_CATEGORIES));
    if (unknownTypes.length) throw new WisePPTError(`${pageId}.payload \u672A\u767B\u8BB0\u7C7B\u578B: ${unknownTypes.sort().join(", ")}`);
    validatePayloadExclusivity(payload, pageId);
    const slotMap = new Map((layout.slots || []).map((slot) => [slot.slot_id, slot]));
    const populated = /* @__PURE__ */ new Set();
    let hasPayload = false;
    for (const [category, payloadType] of Object.entries(PAYLOAD_CATEGORIES)) {
      const values = payload[category] || {};
      if (!values || typeof values !== "object" || Array.isArray(values)) throw new WisePPTError(`${pageId}.payload.${category} \u5FC5\u987B\u662F slot_id \u2192 payload \u7684\u5BF9\u8C61`);
      if (category in payload && !Object.keys(values).length) throw new WisePPTError(`${pageId}.payload.${category} \u4E0D\u5F97\u662F\u7A7A\u5BF9\u8C61`);
      for (const [slotId, slotValue] of Object.entries(values)) {
        const slot = slotMap.get(slotId);
        if (!slot) throw new WisePPTError(`${pageId} payload \u4F7F\u7528\u672A\u767B\u8BB0 slot_id: ${slotId}`);
        const itemLabel = `${pageId}.payload.${category}.${slotId}`;
        validatePayloadShape(category, slotValue, itemLabel, slot);
        if (!payloadSemanticValue(slotValue)) throw new WisePPTError(`${itemLabel} \u5FC5\u987B\u6709\u771F\u5B9E\u975E\u7A7A\u8BED\u4E49`);
        if (!(slot.allowed_payload_types || []).includes(payloadType)) throw new WisePPTError(`${pageId}/${slotId} \u4E0D\u5141\u8BB8 payload \u7C7B\u578B ${payloadType}`);
        populated.add(slotId);
        hasPayload = true;
      }
    }
    if (!hasPayload) throw new WisePPTError(`${pageId}.payload \u81F3\u5C11\u8981\u6709\u4E00\u4E2A\u767B\u8BB0\u503C\u5177\u5907\u771F\u5B9E\u975E\u7A7A\u8BED\u4E49`);
    const required = new Set((layout.slots || []).filter((slot) => slot.required).map((slot) => slot.slot_id));
    const missing = setDifference(required, populated);
    if (missing.length) throw new WisePPTError(`${pageId} \u7F3A\u5C11\u5FC5\u586B payload slot: ${missing.sort().join(", ")}`);
    resolved.push({ slide, layout });
  }
  for (const [mustId, item] of mustById.entries()) {
    const pages = mustPages.get(mustId);
    if (item.status === "placed") {
      if (!pageIds.has(item.page_id)) throw new WisePPTError(`must ${mustId} \u843D\u5230\u4E0D\u5B58\u5728\u9875\u9762: ${item.page_id}`);
      if (pages.length !== 1 || pages[0] !== item.page_id) throw new WisePPTError(`must ${mustId} \u5FC5\u987B\u53EA\u7531 page_id=${item.page_id} \u7684 slide.must_refs \u7CBE\u786E\u5F15\u7528`);
      const missing = item.source_refs.filter((source) => !pageSources.get(item.page_id).includes(source));
      if (missing.length) throw new WisePPTError(`must ${mustId} \u7684\u6765\u6E90\u672A\u767B\u8BB0\u5230\u843D\u70B9\u9875 ${item.page_id}: ${missing.sort().join(", ")}`);
    } else if (pages.length) throw new WisePPTError(`omitted must ${mustId} \u4E0D\u5F97\u88AB slide.must_refs \u5F15\u7528`);
  }
  const unused = setDifference(sourceIds, usedSourceIds);
  if (unused.length) throw new WisePPTError(`sources \u542B\u672A\u88AB\u4F7F\u7528\u7684\u6765\u6E90: ${unused.sort().join(", ")}`);
  return resolved;
}
function queryLayouts(registry, filters) {
  const required = new Set(filters.requires || []);
  if ([...required].some((item) => !["text", "data", "icon"].includes(item))) throw new WisePPTError("\u67E5\u8BE2\u542B\u672A\u767B\u8BB0 payload \u7C7B\u578B");
  if (filters.pageKind === "nonrelationship" && filters.relationKey) throw new WisePPTError("\u975E\u5173\u7CFB\u9875\u67E5\u8BE2\u4E0D\u5F97\u4F20 --relation-key");
  return (registry.layouts || []).filter((layout) => {
    if (filters.layoutId && layout.layout_id !== filters.layoutId) return false;
    if (filters.pageKind && layout.page_kind !== filters.pageKind) return false;
    const roles = layout.page_kind === "relationship" ? layout.page_roles : [layout.page_role];
    if (filters.pageRole && !(roles || []).includes(filters.pageRole)) return false;
    if (filters.relationKey && !(layout.relations || []).includes(filters.relationKey)) return false;
    if ([...required].some((type) => !(layout.allowed_payload_types || []).includes(type))) return false;
    if (filters.contentItems !== void 0 && !(layout.slots || []).some((slot) => Number.isInteger(slot.capacity?.min_items) && Number.isInteger(slot.capacity?.max_items) && slot.capacity.min_items <= filters.contentItems && filters.contentItems <= slot.capacity.max_items && (slot.allowed_payload_types || []).length)) return false;
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
    slots: (layout.slots || []).map((slot) => Object.fromEntries(["slot_id", "purpose", "required", "visual_role", "capacity", "allowed_payload_types", "payload_schema"].filter((key) => key in slot).map((key) => [key, slot[key]])))
  }));
}
async function loadSeed(root, displayCode) {
  const seed = await readJson(path.join(root, "capabilities/layouts/seeds", `${displayCode.toUpperCase()}.json`), `\u9AA8\u67B6 ${displayCode} seed`);
  if (seed.contract !== "wise-ppt-layout-seed@4") throw new WisePPTError(`\u9AA8\u67B6 ${displayCode} seed \u5408\u540C\u9519\u8BEF`);
  if (!/^[0-9a-f]{64}$/.test(String(seed.seed_sha256 || ""))) throw new WisePPTError(`\u9AA8\u67B6 ${displayCode} seed \u7F3A\u5C11\u5408\u6CD5\u54C8\u5E0C`);
  return seed;
}
function elementAttributes(node, idMap) {
  const result = {};
  for (const originalName of Object.keys(node.attribs || {}).sort()) {
    const name = originalName.toLowerCase();
    if (name === "data-vnext-payload-value") continue;
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
function structureDigest(stageHtml) {
  const $ = load(stageHtml, null, false);
  const stage = $(".stage").first();
  if (!stage.length) throw new WisePPTError("seed \u7F3A\u5C11 .stage");
  const idMap = /* @__PURE__ */ new Map();
  stage.find("[id]").each((index, node) => {
    if (node.attribs?.id) idMap.set(node.attribs.id, `ID${String(index + 1).padStart(4, "0")}`);
  });
  function walk(node, insideText = false) {
    const attrs = node.attribs || {};
    const textSurface = insideText || "data-vnext-text-key" in attrs || "data-vnext-claim-key" in attrs;
    const opaqueIcon = "data-vnext-icon-key" in attrs;
    const children = [];
    if (!opaqueIcon) {
      for (const child of node.children || []) {
        if (child.type === "tag" || child.type === "script" || child.type === "style") children.push(walk(child, textSurface));
        else if (["text", "comment"].includes(child.type) && child.data.trim() && !textSurface) children.push(["#text"]);
      }
    }
    return [String(node.name).toLowerCase(), elementAttributes(node, idMap), children];
  }
  return sha256Text(canonicalJson(walk(stage[0])));
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
function payloadFields(raw, bindings, label) {
  const keys = bindings.map((item) => item.key);
  if (!keys.length) throw new WisePPTError(`${label} \u6CA1\u6709\u767B\u8BB0 binding key`);
  if (Array.isArray(raw)) throw new WisePPTError(`${label} \u7981\u6B62\u4F4D\u7F6E\u6570\u7EC4`);
  if (keys.length > 1 && (!raw || typeof raw !== "object")) throw new WisePPTError(`${label} \u6709 ${keys.length} \u4E2A\u5B57\u6BB5\uFF0C\u5FC5\u987B\u4F7F\u7528 fields/items \u63A7\u5236\u5BF9\u8C61`);
  if (raw && typeof raw === "object") {
    if (Object.keys(raw).length !== 2 || !("fields" in raw) || !("items" in raw)) throw new WisePPTError(`${label} \u53EA\u80FD\u4F7F\u7528 {fields, items}`);
    if (!raw.fields || typeof raw.fields !== "object" || Array.isArray(raw.fields)) throw new WisePPTError(`${label}.fields \u5FC5\u987B\u662F\u5BF9\u8C61`);
    if (!Number.isInteger(raw.items) || raw.items < 0) throw new WisePPTError(`${label}.items \u5FC5\u987B\u662F\u975E\u8D1F\u6574\u6570`);
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
  if (parts.length > nodes.length) throw new WisePPTError(`\u5B57\u6BB5 ${selection.attr("data-vnext-text-key") || selection.attr("data-vnext-claim-key") || ""} \u7684\u6362\u884C\u6570\u8D85\u8FC7\u9501\u5B9A DOM \u5BB9\u91CF`);
  nodes.forEach((node, index) => {
    node.data = parts[index] || "";
  });
}
async function iconAuthority(root) {
  const authority = await readJson(path.join(root, "capabilities/runtime-authority-manifest.json"), "Runtime authority");
  if (authority.format !== "wise-ppt-runtime-authority@1") throw new WisePPTError("Runtime authority \u5408\u540C\u9519\u8BEF");
  const entries = authority.icons?.entries;
  if (!Array.isArray(entries) || entries.length !== authority.icons?.selectable_count) throw new WisePPTError("Catalog authority \u56FE\u6807\u767B\u8BB0\u6570\u91CF\u4E0D\u95ED\u5408");
  const result = /* @__PURE__ */ new Map();
  for (const entry of entries) {
    if (!entry || typeof entry !== "object" || !/^[a-z0-9][a-z0-9-]*$/.test(String(entry.name || "")) || result.has(entry.name)) throw new WisePPTError(`Catalog authority \u56FE\u6807\u6761\u76EE\u975E\u6CD5\u6216\u91CD\u590D: ${entry?.name || "-"}`);
    const source = path.resolve(root, ...String(entry.source || "").split("/"));
    if (!source.startsWith(`${path.resolve(root)}${path.sep}`)) throw new WisePPTError(`Catalog authority \u56FE\u6807\u8D8A\u51FA\u4ED3\u5E93: ${entry.source}`);
    const digest = await shaFile(source).catch(() => null);
    if (digest?.sha256 !== entry.sha256) throw new WisePPTError(`Catalog authority \u56FE\u6807\u7F3A\u5931\u6216\u54C8\u5E0C\u9519\u8BEF: ${entry.name}`);
    result.set(entry.name, source);
  }
  return result;
}
function bindingsFor(seed, slotId, kind) {
  const value = seed.bindings?.slots?.[slotId]?.[kind];
  if (!Array.isArray(value)) throw new WisePPTError(`${seed.display_code}/${slotId} seed ${kind} \u7ED1\u5B9A\u975E\u6CD5`);
  return value;
}
function characterCount(value) {
  return [...String(value).replace(/\s/g, "")].length;
}
function applyTextPayload($, stage, seed, slot, raw, label, payloadValue) {
  const bindings = bindingsFor(seed, slot.slot_id, "text");
  if (!bindings.length) throw new WisePPTError(`${label} \u6CA1\u6709\u9501\u5B9A text binding`);
  const { fields, items } = payloadFields(raw, bindings, label);
  validateCapacity(slot, items, label);
  if (Object.keys(fields).length && items === 0) throw new WisePPTError(`${label}.items=0 \u65F6\u4E0D\u5F97\u586B\u5199\u5B57\u6BB5`);
  const byKey = new Map(bindings.map((item) => [item.key, item]));
  for (const [key, value] of Object.entries(fields)) {
    if (!["string", "number"].includes(typeof value) || typeof value === "boolean" || typeof value === "number" && !Number.isFinite(value)) throw new WisePPTError(`${label}.${key} \u5FC5\u987B\u662F\u6587\u5B57\u6216\u6570\u5B57`);
    if (typeof value === "string" && !value.trim()) throw new WisePPTError(`${label}.${key} \u4E0D\u5F97\u662F\u7A7A\u767D\u6587\u5B57`);
    const capacity = Number(byKey.get(key)?.max_chars || 0);
    if (capacity && characterCount(value) > capacity) throw new WisePPTError(`${label}.${key} \u8D85\u8FC7 ${capacity} \u5B57\uFF1B\u7981\u6B62\u7F29\u5B57\u53F7\u5F3A\u585E`);
    const target = stage.find(`[data-vnext-text-key="${key}"]`).first();
    if (!target.length) throw new WisePPTError(`${label}.${key} \u672A\u843D\u5230\u9501\u5B9A DOM`);
    replaceText($, target, value);
    target.attr("data-vnext-payload-value", payloadValue);
  }
  return items;
}
async function applyIconPayload($, stage, root, icons, seed, slot, raw, label) {
  const bindings = bindingsFor(seed, slot.slot_id, "icon");
  if (!bindings.length) throw new WisePPTError(`${label} \u6CA1\u6709\u9501\u5B9A icon binding`);
  const { fields, items } = payloadFields(raw, bindings, label);
  validateCapacity(slot, items, label);
  for (const [key, value] of Object.entries(fields)) {
    const iconName = plainString(value, `${label}.${key}`);
    if (!/^[a-z0-9][a-z0-9-]*$/.test(iconName) || !icons.has(iconName)) throw new WisePPTError(`${label}.${key} \u4E0D\u662F Catalog \u5DF2\u767B\u8BB0\u672C\u5730\u56FE\u6807: ${iconName}`);
    const target = stage.find(`[data-vnext-icon-key="${key}"]`).first();
    if (!target.length) throw new WisePPTError(`${label}.${key} \u672A\u843D\u5230\u9501\u5B9A DOM`);
    const sourceText = await readText(icons.get(iconName), `\u672C\u5730\u56FE\u6807 ${iconName}`);
    const source$ = load(sourceText, { xmlMode: true }, false);
    const sourceSvg = source$("svg").first();
    const viewBox = sourceSvg.attr("viewBox") || sourceSvg.attr("viewbox");
    if (!sourceSvg.length || !viewBox || !sourceSvg.children().length) throw new WisePPTError(`Catalog \u672C\u5730\u56FE\u6807\u4E0D\u662F\u5B8C\u6574 SVG: ${iconName}`);
    const iconSource = `redraw-v3:${iconName}`;
    if (String(target[0].name).toLowerCase() === "svg") {
      target.empty().attr("viewBox", viewBox).attr("data-icon-source", iconSource).removeAttr("data-icon").append(sourceSvg.html() || "");
    } else {
      target.children("svg[data-icon-name], svg[data-icon-source]").remove();
      target.attr("data-icon", iconName).prepend(`<svg viewBox="${escapeHtml(viewBox)}" aria-hidden="true" data-icon-name="${iconName}" data-icon-source="${iconSource}">${sourceSvg.html() || ""}</svg>`);
    }
    target.attr("data-vnext-payload-value", "icon");
  }
  return items;
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
    if (!visible.some((text) => text.includes(term))) throw new WisePPTError(`${slide.page_id} \u7684 ${label} visible_evidence \u672A\u51FA\u73B0\u5728\u771F\u5B9E payload/claim \u53EF\u89C1\u6587\u5B57: ${raw}`);
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
async function materializeSlide(root, slide, layout, seed, deckTitle, folioText, signature, icons) {
  if (seed.layout_id !== layout.layout_id || canonicalJson(seed.source) !== canonicalJson(layout.source)) throw new WisePPTError(`${layout.layout_id} seed \u4E0E\u6CE8\u518C\u8868\u6765\u6E90\u4E0D\u4E00\u81F4`);
  const $ = load(seed.locked.stage_html, null, false);
  const stage = $(".stage").first();
  if (!stage.length) throw new WisePPTError(`${layout.layout_id} seed \u7F3A\u5C11 .stage`);
  if (structureDigest(stage.toString()) !== seed.locked.stage_structure_sha256) throw new WisePPTError(`${layout.layout_id} seed \u7ED3\u6784\u54C8\u5E0C\u6F02\u79FB`);
  const slotMap = new Map((layout.slots || []).map((slot) => [slot.slot_id, slot]));
  const receipt = [];
  if (layout.page_kind === "relationship") {
    const claim = seed.bindings?.claim;
    const target = stage.find(`[data-vnext-claim-key="${claim?.key || ""}"]`);
    if (claim?.key !== "claim.text.001" || target.length !== 1) throw new WisePPTError(`${slide.page_id} \u7684\u5173\u7CFB\u9AA8\u67B6\u7F3A\u5C11\u552F\u4E00 claim binding`);
    if (characterCount(slide.claim) > claim.max_chars) throw new WisePPTError(`${slide.page_id}.claim \u8D85\u8FC7\u9AA8\u67B6\u7ED3\u8BBA\u5BB9\u91CF ${claim.max_chars} \u5B57`);
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
  const doc = stage.find(".doc.tl").first();
  if (!doc.length) throw new WisePPTError(`${slide.page_id} \u9AA8\u67B6\u7F3A\u5C11\u5DE6\u4E0A\u89D2 .doc.tl`);
  const [line1, line2] = cornerLines($, doc);
  if (line1 !== deckTitle.trim()) throw new WisePPTError(`${slide.page_id} \u5DE6\u4E0A\u89D2\u7B2C\u4E00\u884C\u5FC5\u987B\u662F\u6574\u526F\u6807\u9898 deck.title\uFF08${deckTitle}\uFF09\uFF1B\u5F53\u524D\u662F ${line1 || "\u7A7A"}`);
  if (line2 !== slide.claim.trim()) throw new WisePPTError(`${slide.page_id} \u5DE6\u4E0A\u89D2\u7B2C\u4E8C\u884C\u5FC5\u987B\u662F\u672C\u9875\u6807\u9898 claim\uFF08${slide.claim}\uFF09\uFF1B\u5F53\u524D\u662F ${line2 || "\u7A7A"}`);
  const folios = stage.find(".folio");
  if (folios.length !== 1) throw new WisePPTError(`${slide.page_id} \u9AA8\u67B6\u7F3A\u5C11\u552F\u4E00\u5DE6\u4E0B\u89D2 folio\uFF1B\u627E\u5230 ${folios.length} \u4E2A`);
  replaceText($, folios.first(), folioText);
  const signatures = stage.find('[data-template-part="signature"]');
  if (signatures.length > 1) throw new WisePPTError(`\u9AA8\u67B6\u7F72\u540D\u69FD\u5FC5\u987B\u81F3\u591A\u4E00\u4E2A\uFF1B\u627E\u5230 ${signatures.length} \u4E2A`);
  if (signatures.length) replaceText($, signatures.first(), signature);
  if (structureDigest(stage.toString()) !== seed.locked.stage_structure_sha256) throw new WisePPTError(`${slide.page_id} payload \u6539\u53D8\u4E86\u9501\u5B9A DOM/\u7ED3\u6784/\u7EC4\u4EF6/\u51E0\u4F55`);
  const idMap = prefixDomIds($, stage, safePagePrefix(slide.page_id));
  if (structureDigest(stage.toString()) !== seed.locked.stage_structure_sha256) throw new WisePPTError(`${slide.page_id} ID \u9694\u79BB\u6539\u53D8\u4E86\u9AA8\u67B6\u7ED3\u6784`);
  if (canonicalJson(receipt) !== canonicalJson(expectedPayloadReceipt(slide))) throw new WisePPTError(`${slide.page_id} payload receipt \u4E0E\u5B9E\u9645 materialization \u8BA1\u6570\u4E0D\u4E00\u81F4`);
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
    "data-must-refs": canonicalJson(slide.must_refs)
  };
  if (slide.relation_key) attributes["data-relation-key"] = slide.relation_key;
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
    if (!await exists(source)) throw new WisePPTError(`\u7F3A\u5C11\u6743\u5A01\u8FD0\u884C\u65F6\u8D44\u4EA7: ${sourceRelative}`);
    await copyFileSafe(source, path.join(outputRoot, ...outputRelative.split("/")));
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
    if (!digest) throw new WisePPTError(`\u7F3A\u5C11 Wise PPT \u7F16\u8BD1\u5668\u6587\u4EF6: ${relative}`);
    result[relative] = digest.sha256;
  }
  return result;
}
async function currentAuthorityHashes(root, resolvedFonts = null) {
  const result = {};
  for (const relative of REQUIRED_THEME_FILES) {
    const outputRelative = `assets/${path.basename(relative)}`;
    result[outputRelative] = (await shaFile(path.join(root, ...relative.split("/")))).sha256;
  }
  for (const relative of REQUIRED_RUNTIME_FILES) result[relative] = (await shaFile(path.join(root, ...relative.split("/")))).sha256;
  if (resolvedFonts) {
    for (const { font, source } of resolvedFonts.records) result[`assets/fonts/${font.filename}`] = (await shaFile(source)).sha256;
  } else {
    const manifest = await readJson(path.join(root, "themes/paper-ink/assets/fonts/font-manifest.json"), "font-manifest");
    for (const font of manifest.fonts || []) result[`assets/fonts/${font.filename}`] = font.sha256;
  }
  return Object.fromEntries(Object.entries(result).sort(([a], [b]) => a.localeCompare(b, "en")));
}
async function buildTo(root, specPath, outputRoot, options = {}) {
  const { registry, index, sha256: registrySha } = await registryState(root);
  const spec = await readJson(specPath, "deck-spec");
  const resolved = await validateSpec(root, spec, index);
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
  const signature = String(spec.deck.signature || DEFAULT_SIGNATURE).trim();
  for (const [offset, { slide, layout }] of resolved.entries()) {
    const seed = await loadSeed(root, layout.display_code);
    const built = await materializeSlide(root, slide, layout, seed, String(spec.deck.title), `${offset + 1} / ${total} \u2014 BY ${signature}`, signature, icons);
    const section$ = load(built.section, null, false);
    validatePageEvidence(section$, section$("section.slide").first(), slide, mustById);
    sections.push(built.section);
    cssBlocks.push(`/* ${slide.page_id} \xB7 ${layout.layout_id} \xB7 locked */
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
  await writeFile(path.join(outputRoot, "deck-spec.json"), renderJson(canonicalSpec));
  const deckPlan = {
    contract: "wise-ppt-deck-plan@3",
    title: spec.deck.title,
    thesis: spec.deck.thesis,
    input_type: spec.deck.input_type,
    must: structuredClone(spec.must),
    pages: resolved.map(({ slide, layout }) => ({
      page_id: slide.page_id,
      page_role: slide.page_role,
      page_kind: layout.page_kind,
      relation_key: slide.relation_key ?? null,
      layout_id: layout.layout_id,
      claim: slide.claim,
      source_refs: slide.source_refs,
      source_evidence: structuredClone(slide.source_evidence),
      must_refs: slide.must_refs
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
  const authoritativeHashes = await currentAuthorityHashes(root, resolvedFonts);
  const compilerHashes = await currentCompilerHashes(root);
  const buildId = sha256Text(canonicalJson({
    spec: inputDigest,
    registry: registrySha,
    seeds: usedSeeds,
    authoritative_files: authoritativeHashes,
    compiler_sources: compilerHashes,
    runtime_version: RUNTIME_VERSION
  }));
  const { theme, typography } = await resolvedAppearance(root, spec.deck);
  let html = await readText(path.join(root, "runtime/app-template.html"), "Wise PPT app \u6A21\u677F");
  const replacements = {
    "{{LANG}}": escapeHtml(spec.deck.lang || "zh-CN"),
    "{{PAGE_TITLE}}": escapeHtml(spec.deck.title, false),
    "{{DECK_TITLE_ATTR}}": escapeHtml(spec.deck.title),
    "{{THEME_PRESET}}": escapeHtml(theme),
    "{{TYPOGRAPHY_MODE}}": escapeHtml(typography),
    "{{BUILD_ID}}": buildId,
    "{{LAYOUT_REGISTRY_VERSION}}": registrySha,
    "{{RUNTIME_VERSION}}": RUNTIME_VERSION,
    "{{SLIDES}}": sections.join("\n")
  };
  for (const [marker, value] of Object.entries(replacements)) html = html.replaceAll(marker, value);
  const unresolved = [...new Set(html.match(/\{\{[A-Z0-9_]+\}\}/g) || [])];
  if (unresolved.length) throw new WisePPTError(`Wise PPT \u6A21\u677F\u4ECD\u6709\u672A\u66FF\u6362\u53D8\u91CF: ${unresolved.sort().join(", ")}`);
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
    runtime_version: RUNTIME_VERSION,
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
      if (entry.isSymbolicLink()) throw new WisePPTError(`Wise PPT \u8F93\u51FA\u76EE\u5F55\u542B\u4E0D\u5B89\u5168\u7B26\u53F7\u94FE\u63A5: ${relative}`);
      if (entry.isDirectory()) {
        directories.add(relative);
        await visit(absolute);
      } else if (entry.isFile()) files.add(relative);
      else throw new WisePPTError(`Wise PPT \u8F93\u51FA\u76EE\u5F55\u542B\u4E0D\u652F\u6301\u7684\u6587\u4EF6\u7C7B\u578B: ${relative}`);
    }
  }
  await visit(root);
  return { files, directories };
}
function validateManifestEntries(rawEntries, label) {
  if (!Array.isArray(rawEntries)) throw new WisePPTError(`${label}.managed_files \u5FC5\u987B\u662F\u5B8C\u6574\u6570\u7EC4`);
  const entries = /* @__PURE__ */ new Map();
  rawEntries.forEach((item, offset) => {
    const itemLabel = `${label}.managed_files[${offset + 1}]`;
    if (!item || typeof item !== "object" || Object.keys(item).sort().join(",") !== "bytes,path,sha256") throw new WisePPTError(`${itemLabel} \u5B57\u6BB5\u975E\u6CD5`);
    const relative = item.path;
    if (typeof relative !== "string" || !relative || relative.startsWith("/") || relative.includes("\\") || relative.split("/").some((part) => ["", ".", ".."].includes(part))) throw new WisePPTError(`${itemLabel}.path \u975E\u6CD5: ${relative}`);
    if (entries.has(relative)) throw new WisePPTError(`${label}.managed_files \u8DEF\u5F84\u91CD\u590D: ${relative}`);
    if (!/^[0-9a-f]{64}$/.test(String(item.sha256 || "")) || !Number.isInteger(item.bytes) || item.bytes < 0) throw new WisePPTError(`${itemLabel} \u54C8\u5E0C\u6216\u5927\u5C0F\u975E\u6CD5`);
    entries.set(relative, item);
  });
  return entries;
}
async function validatePreviousOutput(output, specPath) {
  const { files } = await directoryEntries(output);
  if (!files.size) return;
  if (!files.has(OUTPUT_MARKER) || !files.has("build-manifest.json")) {
    if (files.size !== 1 || !files.has("deck-spec.json")) throw new WisePPTError(`\u62D2\u7EDD\u8986\u76D6\u975E Wise PPT \u751F\u6210\u76EE\u5F55: ${output}`);
    const [draft, source] = await Promise.all([readJson(path.join(output, "deck-spec.json"), "\u5DF2\u6709 deck-spec"), readJson(specPath, "\u8F93\u5165 deck-spec")]);
    if (canonicalJson(draft) !== canonicalJson(source)) throw new WisePPTError(`\u8F93\u51FA\u76EE\u5F55\u91CC\u7684 deck-spec.json \u4E0E\u672C\u6B21\u6784\u5EFA\u8F93\u5165\u4E0D\u4E00\u81F4\uFF0C\u62D2\u7EDD\u6536\u7F16: ${output}`);
    return;
  }
  if (await readText(path.join(output, OUTPUT_MARKER), OUTPUT_MARKER) !== `${BUILD_CONTRACT}
`) throw new WisePPTError(`${OUTPUT_MARKER} \u5408\u540C\u6807\u8BB0\u9519\u8BEF\uFF0C\u62D2\u7EDD\u8986\u76D6`);
  const previous = await readJson(path.join(output, "build-manifest.json"), "\u5DF2\u6709 build-manifest");
  if (previous.contract !== BUILD_CONTRACT) throw new WisePPTError(`\u62D2\u7EDD\u8986\u76D6\u672A\u77E5\u751F\u6210\u76EE\u5F55: ${output}`);
  const entries = validateManifestEntries(previous.managed_files, "\u5DF2\u6709 build-manifest");
  const delivery = new Set([...files].filter((item) => ["deck.pdf", "delivery-manifest.json"].includes(item)));
  if (delivery.size === 1) throw new WisePPTError("\u5DF2\u6709\u8F93\u51FA\u7684 deck.pdf \u4E0E delivery-manifest.json \u5FC5\u987B\u6210\u5BF9\u5B58\u5728\uFF0C\u62D2\u7EDD\u8986\u76D6");
  const expected = /* @__PURE__ */ new Set([...entries.keys(), OUTPUT_MARKER, "build-manifest.json", ...delivery]);
  if (expected.size !== files.size || setDifference(expected, files).length || setDifference(files, expected).length) throw new WisePPTError("Wise PPT \u5DF2\u6709\u8F93\u51FA\u76EE\u5F55\u6587\u4EF6\u96C6\u4E0D\u95ED\u5408\uFF0C\u542B\u672A\u77E5\u6587\u4EF6\uFF0C\u62D2\u7EDD\u8986\u76D6");
  for (const [relative, record] of entries) {
    if (relative === "deck-spec.json") continue;
    const digest = await shaFile(path.join(output, ...relative.split("/")));
    if (digest.sha256 !== record.sha256 || digest.bytes !== record.bytes) throw new WisePPTError(`\u5DF2\u6709 Wise PPT \u53D7\u7BA1\u4EA7\u7269\u5DF2\u6F02\u79FB\uFF0C\u62D2\u7EDD\u8986\u76D6: ${relative}`);
  }
  if (delivery.size) {
    const manifest = await readJson(path.join(output, "delivery-manifest.json"), "\u5DF2\u6709 delivery-manifest");
    const record = manifest.artifacts?.pdf;
    const digest = await shaFile(path.join(output, "deck.pdf"));
    if (record?.path !== "deck.pdf" || record.sha256 !== digest.sha256 || record.bytes !== digest.bytes) throw new WisePPTError("\u5DF2\u6709 delivery-manifest \u7684 PDF \u54C8\u5E0C\u6216\u5927\u5C0F\u5DF2\u6F02\u79FB\uFF0C\u62D2\u7EDD\u8986\u76D6");
  }
}
async function publishBuilt(tempRoot, output, specPath) {
  await assertNoSymlinkComponents(output, "--out");
  const existing = await stat(output).catch(() => null);
  if (existing?.isFile()) throw new WisePPTError(`--out \u5FC5\u987B\u662F\u76EE\u5F55: ${output}`);
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
    throw new WisePPTError(`Wise PPT \u539F\u5B50\u53D1\u5E03\u5931\u8D25\uFF0C\u65E7\u8F93\u51FA\u5DF2\u56DE\u6EDA: ${error.message}`);
  }
}
function validateZeroCounts(value, keys, label) {
  if (!value || typeof value !== "object" || Array.isArray(value) || Object.keys(value).sort().join(",") !== [...keys].sort().join(",")) throw new WisePPTError(`${label} \u5FC5\u987B\u7CBE\u786E\u5305\u542B\u56FA\u5B9A\u7981\u533A\u8BA1\u6570`);
  const invalid = Object.entries(value).filter(([, item]) => !Number.isInteger(item) || item !== 0);
  if (invalid.length) throw new WisePPTError(`${label} \u7684\u503C\u5FC5\u987B\u662F\u6574\u6570 0`);
}
async function expectedManagedSet(root) {
  const result = new Set(FIXED_GENERATED_FILES);
  REQUIRED_THEME_FILES.forEach((relative) => result.add(`assets/${path.basename(relative)}`));
  REQUIRED_RUNTIME_FILES.forEach((relative) => result.add(relative));
  const manifest = await readJson(path.join(root, "themes/paper-ink/assets/fonts/font-manifest.json"), "font-manifest");
  for (const font of manifest.fonts || []) result.add(`assets/fonts/${font.filename}`);
  return result;
}
async function validateManagedClosure(root, deckRoot, build) {
  const expectedManaged = await expectedManagedSet(root);
  const entries = validateManifestEntries(build.managed_files, "build-manifest");
  if (expectedManaged.size !== entries.size || setDifference(expectedManaged, new Set(entries.keys())).length || setDifference(new Set(entries.keys()), expectedManaged).length) throw new WisePPTError("build-manifest \u53D7\u7BA1\u6587\u4EF6\u96C6\u4E0D\u5B8C\u6574");
  const { files } = await directoryEntries(deckRoot);
  const delivery = new Set([...files].filter((item) => ["deck.pdf", "delivery-manifest.json"].includes(item)));
  if (delivery.size === 1) throw new WisePPTError("deck.pdf \u4E0E delivery-manifest.json \u5FC5\u987B\u6210\u5BF9\u5B58\u5728");
  if (delivery.size) {
    const manifest = await readJson(path.join(deckRoot, "delivery-manifest.json"), "delivery-manifest");
    if (manifest.artifacts?.pdf?.path !== "deck.pdf") throw new WisePPTError("delivery-manifest.artifacts.pdf.path \u5FC5\u987B\u56FA\u5B9A\u4E3A deck.pdf");
  }
  const expectedDisk = /* @__PURE__ */ new Set([...expectedManaged, OUTPUT_MARKER, "build-manifest.json", ...delivery]);
  if (expectedDisk.size !== files.size || setDifference(expectedDisk, files).length || setDifference(files, expectedDisk).length) throw new WisePPTError("\u78C1\u76D8\u53D7\u7BA1\u6587\u4EF6\u96C6\u4E0D\u95ED\u5408");
  if (await readText(path.join(deckRoot, OUTPUT_MARKER), OUTPUT_MARKER) !== `${BUILD_CONTRACT}
`) throw new WisePPTError(`${OUTPUT_MARKER} \u5408\u540C\u6807\u8BB0\u9519\u8BEF`);
  for (const [relative, record] of entries) {
    const digest = await shaFile(path.join(deckRoot, ...relative.split("/")));
    if (digest.sha256 !== record.sha256 || digest.bytes !== record.bytes) throw new WisePPTError(`\u51BB\u7ED3\u4EA7\u7269\u5DF2\u6F02\u79FB: ${relative}`);
  }
}
function validateProjectionPageSet(document, contract, expectedPageIds, label) {
  if (document.contract !== contract || !Array.isArray(document.pages)) throw new WisePPTError(`${label} \u5408\u540C\u6216 pages \u9519\u8BEF`);
  const pageIds = document.pages.map((item) => item?.page_id);
  if (pageIds.some((item) => typeof item !== "string") || new Set(pageIds).size !== pageIds.length) throw new WisePPTError(`${label} page_id \u975E\u6CD5\u6216\u91CD\u590D`);
  const expected = new Set(expectedPageIds);
  const actual = new Set(pageIds);
  if (expected.size !== actual.size || setDifference(expected, actual).length || setDifference(actual, expected).length) throw new WisePPTError(`${label} \u9875\u96C6\u5408\u4E0D\u5B8C\u6574`);
  return document.pages;
}
async function validateDeck(root, rawDeck) {
  const deckRoot = path.resolve(rawDeck);
  const required = ["index.html", "deck-spec.json", "deck-plan.json", "source-ledger.json", "component-receipts.json", "geometry-contracts.json", "build-manifest.json", OUTPUT_MARKER];
  const missing = [];
  for (const relative of required) if (!await exists(path.join(deckRoot, relative))) missing.push(relative);
  if (missing.length) throw new WisePPTError(`Wise PPT deck \u7F3A\u5C11\u4EA7\u7269: ${missing.join(", ")}`);
  const { registry, index, sha256: registrySha } = await registryState(root);
  const spec = await readJson(path.join(deckRoot, "deck-spec.json"), "deck-spec");
  const resolved = await validateSpec(root, spec, index);
  const build = await readJson(path.join(deckRoot, "build-manifest.json"), "build-manifest");
  if (build.contract !== BUILD_CONTRACT) throw new WisePPTError("build-manifest \u5408\u540C\u9519\u8BEF");
  if (build.layout_registry?.sha256 !== registrySha || canonicalJson(build.layout_registry?.counts) !== canonicalJson(registry.counts)) throw new WisePPTError("build \u4F7F\u7528\u7684\u9AA8\u67B6\u6CE8\u518C\u8868\u5DF2\u8FC7\u671F");
  if (build.page_count !== resolved.length || build.input_type !== spec.deck.input_type) throw new WisePPTError("build page_count/input_type \u4E0E deck-spec \u4E0D\u4E00\u81F4");
  if (canonicalJson(build.must_outcomes) !== canonicalJson(mustOutcomes(spec))) throw new WisePPTError("build must_outcomes \u4E0E deck-spec \u4E0D\u4E00\u81F4");
  if (build.runtime_version !== RUNTIME_VERSION) throw new WisePPTError(`build runtime_version \u5FC5\u987B\u662F ${RUNTIME_VERSION}`);
  validateZeroCounts(build.standard_mode_forbidden_counts, BUILD_FORBIDDEN_KEYS, "build-manifest.standard_mode_forbidden_counts");
  await validateManagedClosure(root, deckRoot, build);
  if (canonicalJson(build.compiler_sources) !== canonicalJson(await currentCompilerHashes(root))) throw new WisePPTError("build \u4F7F\u7528\u7684 Wise PPT \u7F16\u8BD1\u5668/\u6A21\u677F\u5DF2\u8FC7\u671F\uFF1B\u8BF7\u91CD\u65B0 build");
  if (canonicalJson(build.authoritative_files) !== canonicalJson(await currentAuthorityHashes(root))) throw new WisePPTError("build \u4F7F\u7528\u7684\u4E3B\u9898/\u5B57\u4F53/runtime \u5DF2\u8FC7\u671F\uFF1B\u8BF7\u91CD\u65B0 build");
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
    must_refs: slide.must_refs
  }));
  if (deckPlan.contract !== "wise-ppt-deck-plan@3" || deckPlan.input_type !== spec.deck.input_type || canonicalJson(deckPlan.must) !== canonicalJson(spec.must) || canonicalJson(deckPlan.pages) !== canonicalJson(expectedPlanPages)) throw new WisePPTError("deck-plan \u4E0E deck-spec \u4E0D\u4E00\u81F4");
  const sourceLedger = await readJson(path.join(deckRoot, "source-ledger.json"), "source-ledger");
  const expectedMustSources = spec.must.map((item) => ({ must_id: item.must_id, status: item.status, page_id: item.page_id ?? null, source_refs: item.source_refs }));
  const expectedPageSources = resolved.map(({ slide }) => ({ page_id: slide.page_id, source_refs: slide.source_refs, source_evidence: slide.source_evidence, must_refs: slide.must_refs }));
  if (sourceLedger.contract !== "wise-ppt-source-ledger@4" || sourceLedger.input_type !== spec.deck.input_type || canonicalJson(sourceLedger.sources) !== canonicalJson(spec.sources) || canonicalJson(sourceLedger.must_sources) !== canonicalJson(expectedMustSources) || canonicalJson(sourceLedger.page_sources) !== canonicalJson(expectedPageSources)) throw new WisePPTError("source-ledger \u4E0E deck-spec \u6765\u6E90/must \u53BB\u5411\u4E0D\u4E00\u81F4");
  const html = await readText(path.join(deckRoot, "index.html"), "index.html");
  const $ = load(html);
  const htmlRoot = $("html").first();
  if (htmlRoot.attr("data-deck-contract-version") !== "5" || htmlRoot.attr("data-runtime-version") !== RUNTIME_VERSION) throw new WisePPTError("index.html deck/runtime \u5408\u540C\u9519\u8BEF");
  if (htmlRoot.attr("data-build-id") !== build.build_id || htmlRoot.attr("data-layout-registry-version") !== registrySha) throw new WisePPTError("index.html build/registry \u5143\u6570\u636E\u4E0D\u4E00\u81F4");
  if (!$('link[rel="stylesheet"][href="runtime/deck-shell.css"]').length) throw new WisePPTError("index.html \u672A\u52A0\u8F7D HTML/PDF \u5171\u7528 deck-shell.css");
  const slideNodes = $("#track > .slide").toArray();
  if (slideNodes.length !== resolved.length) throw new WisePPTError("index.html slide \u6570\u4E0E deck-spec \u4E0D\u4E00\u81F4");
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
    if (node.attr("data-page-id") !== slide.page_id || node.attr("data-layout-id") !== layout.layout_id || node.attr("data-layout-source") !== "registered") throw new WisePPTError(`${slide.page_id} HTML \u5143\u6570\u636E\u4E0E spec \u4E0D\u4E00\u81F4`);
    if (node.attr("data-source-refs") !== canonicalJson(slide.source_refs) || node.attr("data-source-evidence") !== canonicalJson(slide.source_evidence) || node.attr("data-must-refs") !== canonicalJson(slide.must_refs)) throw new WisePPTError(`${slide.page_id} HTML \u6765\u6E90\u5143\u6570\u636E\u4E0E spec \u4E0D\u4E00\u81F4`);
    validatePageEvidence($, node, slide, mustById);
    if (node.find("style").length) throw new WisePPTError(`${slide.page_id} \u542B\u9875\u9762\u7EA7 CSS`);
    const seed = await loadSeed(root, layout.display_code);
    const stage = node.children(".stage").first();
    const stageDigest = stage.length ? structureDigest(stage.toString()) : null;
    if (!stage.length || stageDigest !== seed.locked.stage_structure_sha256) {
      throw new WisePPTError(`${slide.page_id} DOM/CSS/\u7ED3\u6784/\u7EC4\u4EF6/\u51E0\u4F55\u5DF2\u504F\u79BB\u9501\u5B9A seed\uFF08${stageDigest || "missing"} != ${seed.locked.stage_structure_sha256}\uFF09`);
    }
    const seed$ = load(seed.locked.stage_html, null, false);
    const seedStage = seed$(".stage").first();
    const idMap = prefixDomIds(seed$, seedStage, safePagePrefix(slide.page_id));
    expectedCss.push(`/* ${slide.page_id} \xB7 ${layout.layout_id} \xB7 locked */
${rewriteScopedCss(seed.locked.scoped_css, layout.layout_id, slide.page_id, idMap)}`);
    expectedReceipts.push(expectedComponentReceipt(slide, layout, seed, stage));
    expectedGeometries.push(expectedGeometryContract(slide, layout, seed));
  }
  if (canonicalJson(receipts) !== canonicalJson({ contract: "wise-ppt-component-receipts@3", pages: expectedReceipts })) throw new WisePPTError("component-receipts \u4E0D\u662F\u786E\u5B9A\u6027\u5B8C\u6574\u6295\u5F71");
  if (canonicalJson(geometry) !== canonicalJson({ contract: "wise-ppt-geometry-contracts@3", pages: expectedGeometries })) throw new WisePPTError("geometry-contracts \u4E0D\u662F\u786E\u5B9A\u6027\u5B8C\u6574\u6295\u5F71");
  const actualCss = await readText(path.join(deckRoot, "assets/layouts.css"), "assets/layouts.css");
  if (actualCss !== `${expectedCss.join("\n").trimEnd()}
`) throw new WisePPTError("assets/layouts.css \u4E0D\u662F\u9501\u5B9A seed \u7684\u786E\u5B9A\u6027\u6295\u5F71");
  return { page_count: slideNodes.length, build_id: build.build_id, registry_sha256: registrySha };
}
async function buildAndPublish(root, rawSpec, rawOutput, options = {}) {
  const specPath = assertAbsolute(rawSpec, "deck-spec \u8DEF\u5F84");
  const output = assertAbsolute(rawOutput, "--out ");
  if (!await exists(specPath)) throw new WisePPTError(`deck-spec \u4E0D\u5B58\u5728: ${specPath}`);
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
  loadSeed,
  publishBuilt,
  queryLayouts,
  registryState,
  resolvedAppearance,
  structureDigest,
  validateDeck,
  validateSpec
};
