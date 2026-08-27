import { spawn } from "node:child_process";
import { copyFile, mkdir, mkdtemp, readFile, rename, rm, stat } from "node:fs/promises";
import path from "node:path";
import { load } from "./vendor-cheerio.js";
import { PDFDocument } from "./vendor-pdf-lib.js";
import { checkDelivery, exportExperimentalDeck } from "./export-deck.js";
import {
  assertAbsolute,
  assertNoSymlinkComponents,
  atomicWrite,
  canonicalJson,
  collectFiles,
  exists,
  fileRecord,
  readJson,
  readText,
  renderJson,
  sha256Text,
  shaFile,
  WisePPTError
} from "./common.js";
import { deckFileUrl, discoverChrome, runChromeTask } from "./chrome.js";
import { validateDeck } from "./standard.js";
const STANDARD_BUILD_CONTRACT = "wise-ppt-build@3";
const EXPERIMENTAL_WORKSPACE_CONTRACT = "wise-ppt-experimental-workspace@2";
const EXPERIMENTAL_BUILD_CONTRACT = "wise-ppt-experimental-build@3";
const EXPERIMENTAL_DELIVERY_CONTRACT = "wise-ppt-experimental-delivery@4";
const OUTPUT_MARKER = ".wise-ppt-output";
const EXPERIMENT_MARKER = ".wise-ppt-experiment";
const BUILD_MANIFEST = "build-manifest.json";
const STANDARD_DELIVERY_MANIFEST = "delivery-manifest.json";
const EXPERIMENTAL_BUILD_MANIFEST = "experimental-build-manifest.json";
const EXPERIMENTAL_DELIVERY_MANIFEST = "experimental-delivery-manifest.json";
const PDF_NAME = "deck.pdf";
const WATERMARK_ATTRIBUTE = "data-wise-ppt-experimental-watermark";
const WATERMARK_STYLE_ID = "wise-ppt-experimental-watermark-style";
const WATERMARK_TEXT = "EXPERIMENTAL / NOT STANDARD DELIVERY";
const EXPERIMENT_STYLE_ATTRIBUTE = "data-experimental-page-style";
const EXPERIMENT_CLAIM_ATTRIBUTE = "data-experimental-claim";
const LOCKED_PAGE_ATTRIBUTES = {
  page_role: "data-page-role",
  page_kind: "data-page-kind",
  relation_key: "data-relation-key"
};
const COLOR_PROPERTIES = /* @__PURE__ */ new Set([
  "color",
  "background",
  "background-color",
  "border",
  "border-color",
  "border-top",
  "border-right",
  "border-bottom",
  "border-left",
  "box-shadow",
  "text-shadow",
  "fill",
  "stroke",
  "outline",
  "outline-color"
]);
const WATERMARK_STYLE = `<style id="${WATERMARK_STYLE_ID}">
[${WATERMARK_ATTRIBUTE}="true"] {
  position: absolute !important;
  z-index: 2147483647 !important;
  top: 18px !important;
  right: 22px !important;
  padding: 8px 12px !important;
  border: 2px solid #8f2419 !important;
  background: rgba(255, 248, 235, 0.94) !important;
  color: #8f2419 !important;
  font: 800 18px/1.1 Arial, sans-serif !important;
  letter-spacing: 0.06em !important;
  pointer-events: none !important;
  opacity: 1 !important;
  visibility: visible !important;
}
</style>`;
const WATERMARK_NODE = `<div ${WATERMARK_ATTRIBUTE}="true" aria-label="Experimental delivery">${WATERMARK_TEXT}</div>`;
function utcNow() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
async function resolveDeck(raw) {
  const deck = assertAbsolute(raw, "deck \u76EE\u5F55");
  await assertNoSymlinkComponents(deck, "deck");
  const info = await stat(deck).catch(() => null);
  if (!info?.isDirectory()) throw new WisePPTError(`deck \u76EE\u5F55\u4E0D\u5B58\u5728: ${deck}`);
  return deck;
}
async function resolveNewOutput(raw, source) {
  const output = assertAbsolute(raw, "--out ");
  await assertNoSymlinkComponents(output, "--out");
  if (await exists(output)) throw new WisePPTError(`--out \u5FC5\u987B\u662F\u5C1A\u4E0D\u5B58\u5728\u7684\u65B0\u76EE\u5F55: ${output}`);
  const relative = path.relative(source, output);
  const reverse = path.relative(output, source);
  if (!relative || !relative.startsWith("..") && !path.isAbsolute(relative) || !reverse.startsWith("..") && !path.isAbsolute(reverse)) {
    throw new WisePPTError("standard \u4E0E\u5B9E\u9A8C\u76EE\u5F55\u4E0D\u5F97\u76F8\u540C\u6216\u4E92\u76F8\u5D4C\u5957");
  }
  return output;
}
function safeRelative(value, label) {
  if (typeof value !== "string" || !value || value.startsWith("/") || value.includes("\\") || path.posix.normalize(value) !== value || value.split("/").some((part) => !part || [".", ".."].includes(part))) {
    throw new WisePPTError(`${label}.path \u975E\u6CD5: ${JSON.stringify(value)}`);
  }
  return value;
}
async function safeManagedPath(deck, raw, label) {
  const relative = safeRelative(raw, label);
  const target = path.join(deck, ...relative.split("/"));
  await assertNoSymlinkComponents(target, label);
  return target;
}
async function directorySnapshot(deck) {
  const files = await collectFiles(deck, { includeHidden: true });
  const records = [];
  for (const relative of files) records.push(await fileRecord(deck, relative));
  return { digest: sha256Text(canonicalJson(records)), file_count: records.length };
}
async function loadStandardManifest(deck, { allowIndexDrift }) {
  const manifestPath = path.join(deck, BUILD_MANIFEST);
  const manifest = await readJson(manifestPath, BUILD_MANIFEST);
  if (manifest.contract !== STANDARD_BUILD_CONTRACT) {
    throw new WisePPTError(`\u5B9E\u9A8C\u5FC5\u987B\u4ECE ${STANDARD_BUILD_CONTRACT} \u6210\u54C1\u5F00\u59CB\uFF0C\u5B9E\u9645 ${JSON.stringify(manifest.contract)}`);
  }
  if (!/^[0-9a-f]{64}$/.test(String(manifest.build_id || ""))) throw new WisePPTError("build-manifest.build_id \u975E\u6CD5");
  if (!Number.isInteger(manifest.page_count) || manifest.page_count < 1) throw new WisePPTError("build-manifest.page_count \u5FC5\u987B\u662F\u6B63\u6574\u6570");
  if (!Array.isArray(manifest.managed_files)) throw new WisePPTError("build-manifest.managed_files \u5FC5\u987B\u662F\u5B8C\u6574\u6570\u7EC4");
  const entries = /* @__PURE__ */ new Map();
  for (const [index, item] of manifest.managed_files.entries()) {
    const label = `build-manifest.managed_files[${index + 1}]`;
    if (!item || typeof item !== "object" || Array.isArray(item) || canonicalJson(Object.keys(item).sort()) !== canonicalJson(["bytes", "path", "sha256"])) {
      throw new WisePPTError(`${label} \u5B57\u6BB5\u975E\u6CD5`);
    }
    const relative = safeRelative(item.path, label);
    if (entries.has(relative)) throw new WisePPTError(`build-manifest.managed_files \u8DEF\u5F84\u91CD\u590D: ${relative}`);
    if (!/^[0-9a-f]{64}$/.test(String(item.sha256 || ""))) throw new WisePPTError(`${label}.sha256 \u975E\u6CD5`);
    if (!Number.isInteger(item.bytes) || item.bytes < 0) throw new WisePPTError(`${label}.bytes \u975E\u6CD5`);
    const target = await safeManagedPath(deck, relative, label);
    const info = await stat(target).catch(() => null);
    if (!info?.isFile()) throw new WisePPTError(`\u57FA\u7840 standard \u53D7\u7BA1\u6587\u4EF6\u7F3A\u5931: ${relative}`);
    if (!allowIndexDrift || relative !== "index.html") {
      if (canonicalJson(await fileRecord(deck, relative)) !== canonicalJson(item)) {
        throw new WisePPTError(`\u57FA\u7840 standard \u53D7\u7BA1\u6587\u4EF6\u5DF2\u6F02\u79FB: ${relative}`);
      }
    }
    entries.set(relative, item);
  }
  for (const required of ["index.html", "deck-plan.json", "deck-spec.json"]) {
    if (!entries.has(required)) throw new WisePPTError("build-manifest \u7F3A\u5C11 index.html/deck-plan.json/deck-spec.json");
  }
  if (await readText(path.join(deck, OUTPUT_MARKER), OUTPUT_MARKER) !== `${STANDARD_BUILD_CONTRACT}
`) {
    throw new WisePPTError(`${OUTPUT_MARKER} \u5408\u540C\u6807\u8BB0\u9519\u8BEF`);
  }
  return { manifest, entries, sha256: (await shaFile(manifestPath)).sha256 };
}
async function validateStandardSource(root, source) {
  try {
    await validateDeck(root, source);
    await checkDelivery({ deckDir: source });
  } catch (error) {
    throw new WisePPTError(`standard \u6765\u6E90\u4E0D\u662F\u5F53\u524D\u5B8C\u6574\u4EA4\u4ED8: ${error.message}`);
  }
}
async function pageLock(source) {
  const plan = await readJson(path.join(source, "deck-plan.json"), "deck-plan.json");
  const spec = await readJson(path.join(source, "deck-spec.json"), "deck-spec.json");
  if (!Array.isArray(plan.pages) || !plan.pages.length) throw new WisePPTError("deck-plan.pages \u5FC5\u987B\u662F\u975E\u7A7A\u6570\u7EC4");
  const seen = /* @__PURE__ */ new Set();
  const pages = plan.pages.map((page, index) => {
    if (!page || typeof page !== "object" || Array.isArray(page)) throw new WisePPTError(`deck-plan.pages[${index + 1}] \u5FC5\u987B\u662F\u5BF9\u8C61`);
    if (typeof page.page_id !== "string" || !page.page_id || seen.has(page.page_id)) {
      throw new WisePPTError(`deck-plan.pages[${index + 1}].page_id \u7F3A\u5931\u6216\u91CD\u590D`);
    }
    seen.add(page.page_id);
    return Object.fromEntries(
      ["page_id", "page_role", "page_kind", "relation_key", "layout_id", "claim", "source_refs", "source_evidence", "must_refs"].map((key) => [key, page[key] ?? null])
    );
  });
  const value = {
    page_order: pages.map((page) => page.page_id),
    pages,
    sources: spec.sources ?? null,
    must: spec.must ?? null
  };
  return { ...value, sha256: sha256Text(canonicalJson(value)) };
}
async function themeLock(source, entries) {
  const spec = await readJson(path.join(source, "deck-spec.json"), "deck-spec.json");
  const $ = load(await readText(path.join(source, "index.html"), "index.html"));
  const html = $("html").first();
  if (!html.length) throw new WisePPTError("standard index.html \u7F3A\u5C11 html \u6839\u8282\u70B9");
  const cssRecords = [...entries.entries()].filter(([name]) => name.endsWith(".css")).map(([, item]) => item);
  const fontRecords = [...entries.entries()].filter(([name]) => name.startsWith("assets/fonts/")).map(([, item]) => item);
  const variables = /* @__PURE__ */ new Set();
  for (const record of cssRecords) {
    const css = await readText(path.join(source, ...record.path.split("/")), record.path);
    for (const match of css.matchAll(/(--[-A-Za-z0-9_]+)\s*:/g)) variables.add(match[1]);
  }
  const value = {
    theme_preset: spec.deck?.theme_preset ?? null,
    typography_mode: spec.deck?.typography_mode || html.attr("data-typography-mode") || null,
    root_attributes: {
      "data-theme-preset": html.attr("data-theme-preset") ?? null,
      "data-typography-mode": html.attr("data-typography-mode") ?? null
    },
    theme_assets: cssRecords,
    fonts: fontRecords,
    allowed_css_variables: [...variables].sort()
  };
  return { ...value, sha256: sha256Text(canonicalJson(value)) };
}
function selectScope(pageIds, approvedPageIds, allPages) {
  if (allPages === Boolean(approvedPageIds?.length)) throw new WisePPTError("--page \u4E0E --all-pages \u5FC5\u987B\u4E8C\u9009\u4E00");
  const requested = allPages ? pageIds : [...new Set(approvedPageIds || [])];
  const unknown = [...new Set(requested)].filter((item) => !pageIds.includes(item)).sort();
  if (unknown.length) throw new WisePPTError(`\u6279\u51C6\u8303\u56F4\u542B\u672A\u77E5\u9875\u9762: ${unknown.join(", ")}`);
  return pageIds.filter((pageId) => requested.includes(pageId));
}
async function prepareExperiment(root, sourceRaw, outputRaw, approvedPageIds, allPages) {
  const source = await resolveDeck(sourceRaw);
  const output = await resolveNewOutput(outputRaw, source);
  await validateStandardSource(root, source);
  const state = await loadStandardManifest(source, { allowIndexDrift: false });
  const contentLock = await pageLock(source);
  const approved = selectScope(contentLock.page_order, approvedPageIds, allPages);
  const theme = await themeLock(source, state.entries);
  const sourceSnapshot = await directorySnapshot(source);
  await mkdir(path.dirname(output), { recursive: true });
  const temporary = await mkdtemp(path.join(path.dirname(output), `.${path.basename(output)}-wise-ppt-redraw-`));
  let published = false;
  try {
    for (const relative of [...state.entries.keys()].sort()) {
      const from = await safeManagedPath(source, relative, "managed_files");
      const to = await safeManagedPath(temporary, relative, "managed_files");
      await mkdir(path.dirname(to), { recursive: true });
      await copyFile(from, to);
    }
    await copyFile(path.join(source, BUILD_MANIFEST), path.join(temporary, BUILD_MANIFEST));
    await copyFile(path.join(source, OUTPUT_MARKER), path.join(temporary, OUTPUT_MARKER));
    const workspace = {
      contract: EXPERIMENTAL_WORKSPACE_CONTRACT,
      mode: "redraw",
      prepared_at: utcNow(),
      approved_page_ids: approved,
      actual_changed_page_ids: [],
      changed_page_status: "pending-build",
      source: {
        path: source,
        build_id: state.manifest.build_id,
        build_manifest_sha256: state.sha256,
        tree_snapshot: sourceSnapshot
      },
      content_lock: contentLock,
      theme_lock: theme,
      checks: {
        standard_validate: "pass",
        standard_delivery: "pass",
        page_scope: "pass",
        content_lock: "pass",
        theme_lock: "pass"
      }
    };
    await atomicWrite(path.join(temporary, EXPERIMENT_MARKER), renderJson(workspace));
    if (await exists(output)) throw new WisePPTError(`--out \u5728\u51C6\u5907\u671F\u95F4\u5DF2\u51FA\u73B0\uFF0C\u62D2\u7EDD\u8986\u76D6: ${output}`);
    await rename(temporary, output);
    published = true;
    return { workspace, source, output };
  } finally {
    if (!published) await rm(temporary, { recursive: true, force: true }).catch(() => {
    });
  }
}
async function loadWorkspace(root, deck) {
  const workspacePath = path.join(deck, EXPERIMENT_MARKER);
  const workspace = await readJson(workspacePath, EXPERIMENT_MARKER);
  if (workspace.contract !== EXPERIMENTAL_WORKSPACE_CONTRACT || workspace.mode !== "redraw") {
    throw new WisePPTError(`${EXPERIMENT_MARKER} \u5FC5\u987B\u91CD\u65B0 prepare \u4E3A ${EXPERIMENTAL_WORKSPACE_CONTRACT}`);
  }
  if (!workspace.source || typeof workspace.source.path !== "string" || !path.isAbsolute(workspace.source.path)) {
    throw new WisePPTError(`${EXPERIMENT_MARKER}.source \u975E\u6CD5`);
  }
  const source = workspace.source.path;
  const sourceInfo = await stat(source).catch(() => null);
  if (!sourceInfo?.isDirectory()) throw new WisePPTError("\u57FA\u7840 standard \u6765\u6E90\u4E0D\u5B58\u5728");
  await validateStandardSource(root, source);
  const sourceState = await loadStandardManifest(source, { allowIndexDrift: false });
  if (workspace.source.build_id !== sourceState.manifest.build_id || workspace.source.build_manifest_sha256 !== sourceState.sha256 || canonicalJson(workspace.source.tree_snapshot) !== canonicalJson(await directorySnapshot(source))) {
    throw new WisePPTError("\u57FA\u7840 standard \u6765\u6E90\u5DF2\u6F02\u79FB\uFF1B\u5B9E\u9A8C\u5931\u6548");
  }
  const current = await loadStandardManifest(deck, { allowIndexDrift: true });
  if (current.manifest.build_id !== sourceState.manifest.build_id || current.sha256 !== sourceState.sha256) {
    throw new WisePPTError("\u5B9E\u9A8C\u526F\u672C\u4E0E\u57FA\u7840 standard build \u4E0D\u4E00\u81F4");
  }
  if (canonicalJson(await pageLock(source)) !== canonicalJson(workspace.content_lock)) throw new WisePPTError("\u5185\u5BB9\u9501\u4E0E\u57FA\u7840 standard \u4E0D\u4E00\u81F4");
  if (canonicalJson(await themeLock(source, sourceState.entries)) !== canonicalJson(workspace.theme_lock)) throw new WisePPTError("\u4E3B\u9898\u9501\u4E0E\u57FA\u7840 standard \u4E0D\u4E00\u81F4");
  if (!Array.isArray(workspace.approved_page_ids) || !workspace.approved_page_ids.length || workspace.approved_page_ids.some((item) => !workspace.content_lock.page_order.includes(item))) {
    throw new WisePPTError("\u5B9E\u9A8C workspace \u7684 approved_page_ids \u975E\u6CD5");
  }
  const optional = /* @__PURE__ */ new Set([PDF_NAME, EXPERIMENTAL_BUILD_MANIFEST, EXPERIMENTAL_DELIVERY_MANIFEST]);
  const expected = /* @__PURE__ */ new Set([...current.entries.keys(), BUILD_MANIFEST, OUTPUT_MARKER, EXPERIMENT_MARKER]);
  const disk = new Set(await collectFiles(deck, { includeHidden: true }));
  const missing = [...expected].filter((item) => !disk.has(item)).sort();
  const unknown = [...disk].filter((item) => !expected.has(item) && !optional.has(item)).sort();
  if (missing.length || unknown.length) {
    throw new WisePPTError(`\u5B9E\u9A8C deck \u6587\u4EF6\u96C6\u4E0D\u95ED\u5408: \u7F3A\u5931=${JSON.stringify(missing)}\uFF0C\u672A\u77E5=${JSON.stringify(unknown)}`);
  }
  return {
    workspace,
    baseline: current.manifest,
    entries: current.entries,
    baselineSha: current.sha256,
    workspaceSha: (await shaFile(workspacePath)).sha256
  };
}
function stripFramework($) {
  $(`[${WATERMARK_ATTRIBUTE}="true"]`).remove();
  $(`style#${WATERMARK_STYLE_ID}`).remove();
}
function slides($) {
  const list = $("section.slide[data-page-id]").toArray();
  const ids = list.map((node) => String($(node).attr("data-page-id") || "").trim());
  if (!list.length || ids.some((item) => !item) || new Set(ids).size !== ids.length) {
    throw new WisePPTError("\u5B9E\u9A8C HTML \u7684 page_id \u7F3A\u5931\u6216\u91CD\u590D");
  }
  return { list, map: new Map(ids.map((id, index) => [id, list[index]])) };
}
function outerHtml($, node) {
  return $.html(node);
}
function domSignature(node) {
  if (!node) return null;
  if (node.type === "comment") return ["comment", String(node.data || "")];
  if (node.type === "text") {
    const value = String(node.data || "").trim().replace(/\s+/g, " ");
    return value ? ["text", value] : null;
  }
  if (["tag", "script", "style"].includes(node.type) || node.name) {
    const attrs = Object.entries(node.attribs || {}).sort(([a], [b]) => a.localeCompare(b, "en")).map(([key, value]) => [String(key), String(value)]);
    return [
      "tag",
      String(node.name || "").toLowerCase(),
      attrs,
      (node.children || []).map(domSignature).filter(Boolean)
    ];
  }
  return ["root", (node.children || []).map(domSignature).filter(Boolean)];
}
function styleNodes($) {
  return $("style").toArray().filter((node) => $(node).attr("id") !== WATERMARK_STYLE_ID);
}
function signatures($, selector) {
  return $(selector).toArray().map((node) => outerHtml($, node));
}
function visibleText($, node) {
  const clone = load(outerHtml($, node));
  clone('script, style, template, [hidden], [aria-hidden="true"]').remove();
  return clone.root().text().trim().replace(/\s+/g, " ");
}
function validateDeclarations(css, allowedVariables, label) {
  for (const match of css.matchAll(/(--[-A-Za-z0-9_]+|[-A-Za-z][-A-Za-z0-9_]*)\s*:\s*([^;{}]+)/g)) {
    const name = match[1].toLowerCase();
    const value = match[2].trim();
    if (name.startsWith("--")) throw new WisePPTError(`${label} \u7981\u6B62\u65B0\u589E\u6216\u8986\u76D6\u4E3B\u9898\u53D8\u91CF: ${name}`);
    const variables = new Set([...value.matchAll(/var\(\s*(--[-A-Za-z0-9_]+)/gi)].map((item) => item[1]));
    const unknown = [...variables].filter((item) => !allowedVariables.has(item)).sort();
    if (unknown.length) throw new WisePPTError(`${label} \u4F7F\u7528\u672A\u767B\u8BB0\u4E3B\u9898\u53D8\u91CF: ${unknown.join(", ")}`);
    if (COLOR_PROPERTIES.has(name) && /(#[0-9a-f]{3,8}\b|\brgba?\s*\(|\bhsla?\s*\(|\boklab\s*\(|\boklch\s*\()/i.test(value)) {
      throw new WisePPTError(`${label} \u7981\u6B62\u786C\u7F16\u7801\u4E3B\u9898\u5916\u8272\u503C: ${name}: ${value}`);
    }
    if (["font", "font-family"].includes(name) && !/var\(/i.test(value)) {
      throw new WisePPTError(`${label} \u5B57\u4F53\u5FC5\u987B\u4F7F\u7528\u539F\u4E3B\u9898\u53D8\u91CF: ${value}`);
    }
    if (name === "font-size" && !/var\(/i.test(value)) {
      const pixels = [...value.matchAll(/(-?\d+(?:\.\d+)?)px\b/gi)].map((item) => Number(item[1]));
      if (!pixels.length || Math.min(...pixels) < 18) throw new WisePPTError(`${label} \u6700\u5C0F\u5B57\u53F7\u4E0D\u5F97\u4F4E\u4E8E 18px: ${value}`);
    }
    if (["left", "right", "top", "bottom", "width", "height", "max-width", "max-height"].includes(name)) {
      for (const item of value.matchAll(/(-?\d+(?:\.\d+)?)px\b/gi)) {
        const numeric = Number(item[1]);
        const limit = name.includes("width") || ["left", "right"].includes(name) ? 1920 : 1080;
        if (numeric < 0 || numeric > limit) throw new WisePPTError(`${label} \u5B58\u5728\u8FB9\u754C\u98CE\u9669: ${name}: ${value}`);
      }
    }
  }
}
function validateExperimentalStyles(current$, baseline$, approved, allowedVariables) {
  const counts = /* @__PURE__ */ new Map();
  for (const node of styleNodes(baseline$)) {
    const signature = outerHtml(baseline$, node);
    counts.set(signature, (counts.get(signature) || 0) + 1);
  }
  const grouped = /* @__PURE__ */ new Map();
  const additions = [];
  for (const node of styleNodes(current$)) {
    const signature = outerHtml(current$, node);
    if (counts.get(signature)) {
      counts.set(signature, counts.get(signature) - 1);
      continue;
    }
    const pageId = String(current$(node).attr(EXPERIMENT_STYLE_ATTRIBUTE) || "").trim();
    if (!approved.has(pageId)) throw new WisePPTError("\u65B0\u589E\u6837\u5F0F\u5FC5\u987B\u7528 data-experimental-page-style \u9650\u5B9A\u5230\u6279\u51C6\u9875\u9762");
    const css = current$(node).text();
    if (css.replace(/\/\*.*?\*\//gs, "").includes("@")) {
      throw new WisePPTError(`\u5B9E\u9A8C\u9875 ${pageId} \u65B0\u589E\u6837\u5F0F\u7981\u6B62 @import/@font-face/@media`);
    }
    const rules = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/gs)];
    const remainder = css.replace(/([^{}]+)\{([^{}]*)\}/gs, "").trim();
    if (!rules.length || remainder) throw new WisePPTError(`\u5B9E\u9A8C\u9875 ${pageId} \u65B0\u589E CSS \u7ED3\u6784\u65E0\u6CD5\u5B89\u5168\u9A8C\u8BC1`);
    const scope = `[data-page-id="${pageId}"]`;
    for (const rule of rules) {
      for (const selector of rule[1].split(",")) {
        const normalized = selector.trim().replace(/\s+/g, " ");
        if (!normalized.includes(scope) || normalized.includes(":root") || /(^|\s)(html|body)(\s|$)/.test(normalized)) {
          throw new WisePPTError(`\u5B9E\u9A8C\u9875 ${pageId} CSS \u672A\u9650\u5B9A\u5230\u672C\u9875: ${normalized}`);
        }
      }
      validateDeclarations(rule[2], allowedVariables, `\u5B9E\u9A8C\u9875 ${pageId} CSS`);
    }
    additions.push(node);
    if (!grouped.has(pageId)) grouped.set(pageId, []);
    grouped.get(pageId).push(node);
  }
  if ([...counts.values()].some((value) => value)) throw new WisePPTError("\u7981\u6B62\u5220\u9664\u6216\u4FEE\u6539\u539F standard \u6837\u5F0F");
  return { grouped, additions };
}
function validateRedrawMarkup($, slide, pageId, allowedVariables) {
  $(slide).find("*").each((_index, node) => {
    const inline = $(node).attr("style");
    if (inline) validateDeclarations(inline, allowedVariables, `\u5B9E\u9A8C\u9875 ${pageId} \u884C\u5185\u6837\u5F0F`);
    for (const attr of ["fill", "stroke", "color"]) {
      const value = $(node).attr(attr);
      if (value && /(#[0-9a-f]{3,8}\b|\brgba?\s*\(|\bhsla?\s*\(|\boklab\s*\(|\boklch\s*\()/i.test(value)) {
        throw new WisePPTError(`\u5B9E\u9A8C\u9875 ${pageId} \u7981\u6B62\u786C\u7F16\u7801\u4E3B\u9898\u5916\u8272\u503C: ${attr}=${value}`);
      }
    }
  });
}
function canonicalSlide($, slide, baseline$, baselineSlide) {
  const clone$ = load(outerHtml($, slide));
  const clone = clone$("section.slide[data-page-id]").first();
  clone$(`[${WATERMARK_ATTRIBUTE}="true"]`).remove();
  for (const attribute of [
    "data-layout-source",
    "data-baseline-layout-id",
    "data-experimental-required-visible",
    "data-layout-id",
    "data-layout-code",
    "data-seed-id",
    "data-structure-id"
  ]) {
    const expected = baseline$(baselineSlide).attr(attribute);
    if (expected === void 0) clone.removeAttr(attribute);
    else clone.attr(attribute, expected);
  }
  return canonicalJson(domSignature(clone[0]));
}
function requiredVisibleText(page, mustIndex) {
  const required = Object.values(page.source_evidence || {}).flat().map(String);
  for (const mustId of page.must_refs || []) {
    const evidence = mustIndex.get(mustId)?.visible_evidence;
    if (evidence) required.push(String(evidence));
  }
  return [...new Set(required)];
}
function assertLockedPage($, slide, page, mustIndex) {
  const pageId = page.page_id;
  for (const [field, attribute] of Object.entries(LOCKED_PAGE_ATTRIBUTES)) {
    const expected = page[field];
    const actual = $(slide).attr(attribute);
    if (expected === null || expected === void 0) {
      if (actual !== void 0 && actual !== "") throw new WisePPTError(`\u5B9E\u9A8C\u9875 ${pageId} \u4FEE\u6539\u4E86 ${field}`);
    } else if (actual !== String(expected)) {
      throw new WisePPTError(`\u5B9E\u9A8C\u9875 ${pageId} \u4FEE\u6539\u6216\u5220\u9664\u4E86 ${field}`);
    }
  }
  const expectedJson = {
    "data-source-refs": page.source_refs || [],
    "data-source-evidence": page.source_evidence || {},
    "data-must-refs": page.must_refs || []
  };
  for (const [attribute, expected] of Object.entries(expectedJson)) {
    const raw = $(slide).attr(attribute);
    if (raw === void 0) throw new WisePPTError(`\u5B9E\u9A8C\u9875 ${pageId} \u5220\u9664\u4E86\u5185\u5BB9\u9501\u5C5E\u6027 ${attribute}`);
    let actual;
    try {
      actual = JSON.parse(raw);
    } catch {
      throw new WisePPTError(`\u5B9E\u9A8C\u9875 ${pageId} \u7684 ${attribute} \u4E0D\u662F\u5408\u6CD5 JSON`);
    }
    if (canonicalJson(actual) !== canonicalJson(expected)) throw new WisePPTError(`\u5B9E\u9A8C\u9875 ${pageId} \u4FEE\u6539\u4E86 ${attribute}`);
  }
  for (const attribute of ["data-page-title", "data-page-summary"]) {
    const actual = $(slide).attr(attribute);
    if (actual !== void 0 && actual !== page.claim) throw new WisePPTError(`\u5B9E\u9A8C\u9875 ${pageId} \u4FEE\u6539\u4E86 claim \u5143\u6570\u636E`);
  }
  const claimNodes = $(slide).find(`[${EXPERIMENT_CLAIM_ATTRIBUTE}="true"]`).toArray();
  const expectedClaim = String(page.claim || "").trim().replace(/\s+/g, " ");
  if (claimNodes.length !== 1 || visibleText($, claimNodes[0]) !== expectedClaim) {
    throw new WisePPTError(`\u91CD\u7ED8\u9875 ${pageId} \u5FC5\u987B\u4FDD\u7559\u552F\u4E00\u53EF\u89C1 claim \u8282\u70B9\u4E14\u6587\u672C\u5B8C\u5168\u4E00\u81F4`);
  }
  const visible = visibleText($, slide);
  for (const evidence of requiredVisibleText(page, mustIndex)) {
    if (!visible.includes(evidence)) throw new WisePPTError(`\u91CD\u7ED8\u9875 ${pageId} \u7F3A\u5C11 source/must \u53EF\u89C1\u8BC1\u636E: ${evidence}`);
  }
}
function resourceValues($) {
  const values = [];
  $("*").each((_index, node) => {
    for (const attribute of ["src", "poster"]) {
      const value = $(node).attr(attribute);
      if (value?.trim()) values.push(value.trim());
    }
    const name = String(node.name || "").toLowerCase();
    if (["base", "link", "image", "use"].includes(name)) {
      const value = $(node).attr("href") || $(node).attr("xlink:href");
      if (value?.trim()) values.push(value.trim());
    }
    if (name === "object" && $(node).attr("data")?.trim()) values.push($(node).attr("data").trim());
    if ($(node).attr("srcdoc") !== void 0) throw new WisePPTError("\u5B9E\u9A8C HTML \u7981\u6B62 srcdoc");
    const inline = $(node).attr("style") || "";
    for (const match of inline.matchAll(/url\(\s*(['"]?)(.*?)\1\s*\)/gis)) values.push(match[2].trim());
    for (const match of inline.matchAll(/@import\s+(['"])(.*?)\1/gis)) values.push(match[2].trim());
  });
  $("style").each((_index, node) => {
    const css = $(node).text();
    for (const match of css.matchAll(/url\(\s*(['"]?)(.*?)\1\s*\)/gis)) values.push(match[2].trim());
    for (const match of css.matchAll(/@import\s+(['"])(.*?)\1/gis)) values.push(match[2].trim());
  });
  return values;
}
async function validateLocalResources(deck, current$, baseline$) {
  const baselineData = /* @__PURE__ */ new Map();
  for (const value of resourceValues(baseline$).filter((item) => item.startsWith("data:"))) {
    baselineData.set(value, (baselineData.get(value) || 0) + 1);
  }
  const local = /* @__PURE__ */ new Set();
  for (const value of resourceValues(current$)) {
    if (!value || value.startsWith("#")) continue;
    if (value.startsWith("data:")) {
      if (baselineData.get(value)) {
        baselineData.set(value, baselineData.get(value) - 1);
        continue;
      }
      throw new WisePPTError("\u5B9E\u9A8C\u91CD\u7ED8\u7981\u6B62\u65B0\u589E data URI \u6216\u56FE\u7247\u751F\u6210\u5185\u8054\u8D44\u6E90");
    }
    if (value.startsWith("//") || /^[A-Za-z][A-Za-z0-9+.-]*:/.test(value)) {
      throw new WisePPTError(`\u5B9E\u9A8C HTML \u7981\u6B62\u8FDC\u7A0B\u8D44\u6E90\u6216\u7EDD\u5BF9 scheme \u8D44\u6E90: ${value}`);
    }
    let decoded;
    try {
      decoded = decodeURIComponent(value.split(/[?#]/, 1)[0]);
    } catch {
      throw new WisePPTError(`\u5B9E\u9A8C HTML \u8D44\u6E90\u8DEF\u5F84\u7F16\u7801\u975E\u6CD5: ${value}`);
    }
    const segments = decoded.split("/");
    if (path.posix.isAbsolute(decoded) || segments.includes("..")) throw new WisePPTError(`\u5B9E\u9A8C HTML \u8D44\u6E90\u8D8A\u51FA deck: ${value}`);
    const target = path.resolve(deck, ...segments);
    const relative = path.relative(deck, target);
    if (relative.startsWith("..") || path.isAbsolute(relative)) throw new WisePPTError(`\u5B9E\u9A8C HTML \u8D44\u6E90\u8D8A\u51FA deck: ${value}`);
    await assertNoSymlinkComponents(target, "\u5B9E\u9A8C HTML \u8D44\u6E90");
    const info = await stat(target).catch(() => null);
    if (!info?.isFile()) throw new WisePPTError(`\u5B9E\u9A8C HTML \u672C\u5730\u8D44\u6E90\u4E0D\u5B58\u5728\u6216\u4E0D\u5B89\u5168: ${value}`);
    local.add(segments.join("/"));
  }
  return { local_files: [...local].sort(), local_file_count: local.size, new_inline_data_count: 0 };
}
function stampPage($, slide, baseline$, baselineSlide, changed) {
  if (!changed) {
    for (const attribute of ["data-layout-id", "data-layout-code", "data-seed-id", "data-structure-id"]) {
      const expected = baseline$(baselineSlide).attr(attribute);
      if (expected === void 0) $(slide).removeAttr(attribute);
      else $(slide).attr(attribute, expected);
    }
    $(slide).removeAttr("data-layout-source data-baseline-layout-id data-experimental-required-visible");
    return;
  }
  const baselineLayout = baseline$(baselineSlide).attr("data-layout-id") || "";
  $(slide).removeAttr("data-layout-id data-layout-code data-seed-id data-structure-id");
  $(slide).attr("data-layout-source", "experimental-redraw");
  $(slide).attr("data-baseline-layout-id", baselineLayout);
}
function injectWatermarks($) {
  stripFramework($);
  if (!$("head").length) throw new WisePPTError("index.html \u7F3A\u5C11 head");
  $("head").append(WATERMARK_STYLE);
  for (const slide of slides($).list) $(slide).prepend(WATERMARK_NODE);
}
async function validateHtmlContract(deck, workspace, { stamp }) {
  const baseline$ = load(await readText(path.join(workspace.source.path, "index.html"), "standard index.html"));
  const current$ = load(await readText(path.join(deck, "index.html"), "index.html"));
  stripFramework(baseline$);
  stripFramework(current$);
  const baselineSlides = slides(baseline$);
  const currentSlides = slides(current$);
  const pageOrder = workspace.content_lock.page_order;
  if (canonicalJson(currentSlides.list.map((node) => current$(node).attr("data-page-id"))) !== canonicalJson(pageOrder) || canonicalJson(baselineSlides.list.map((node) => baseline$(node).attr("data-page-id"))) !== canonicalJson(pageOrder)) {
    throw new WisePPTError("\u5B9E\u9A8C\u9875\u6570\u6216\u9875\u5E8F\u4E0E standard \u4E0D\u4E00\u81F4");
  }
  for (const [attribute, expected] of Object.entries(workspace.theme_lock.root_attributes)) {
    if ((current$("html").attr(attribute) ?? null) !== expected || (baseline$("html").attr(attribute) ?? null) !== expected) {
      throw new WisePPTError(`\u5B9E\u9A8C\u4FEE\u6539\u4E86\u6839\u7EA7\u4E3B\u9898\u5C5E\u6027 ${attribute}`);
    }
  }
  if (canonicalJson(signatures(current$, "script")) !== canonicalJson(signatures(baseline$, "script"))) {
    throw new WisePPTError("\u5B9E\u9A8C\u7981\u6B62\u65B0\u589E\u3001\u5220\u9664\u6216\u4FEE\u6539\u811A\u672C");
  }
  if (canonicalJson(signatures(current$, "link")) !== canonicalJson(signatures(baseline$, "link"))) {
    throw new WisePPTError("\u5B9E\u9A8C\u7981\u6B62\u65B0\u589E\u3001\u5220\u9664\u6216\u4FEE\u6539\u4E3B\u9898/\u5B57\u4F53\u8D44\u6E90");
  }
  const approved = new Set(workspace.approved_page_ids);
  const allowedVariables = new Set(workspace.theme_lock.allowed_css_variables);
  const styles = validateExperimentalStyles(current$, baseline$, approved, allowedVariables);
  const pagesById = new Map(workspace.content_lock.pages.map((page) => [page.page_id, page]));
  const mustIndex = new Map(
    (workspace.content_lock.must || []).filter((item) => item?.must_id).map((item) => [item.must_id, item])
  );
  const changed = [];
  for (const pageId of pageOrder) {
    const currentSlide = currentSlides.map.get(pageId);
    const baselineSlide = baselineSlides.map.get(pageId);
    const slideChanged = canonicalSlide(current$, currentSlide, baseline$, baselineSlide) !== canonicalJson(domSignature(baselineSlide));
    const isChanged = slideChanged || Boolean(styles.grouped.get(pageId)?.length);
    if (!approved.has(pageId) && isChanged) throw new WisePPTError(`\u672A\u6388\u6743\u9875\u9762\u53D1\u751F\u53D8\u5316: ${pageId}`);
    if (isChanged) {
      assertLockedPage(current$, currentSlide, pagesById.get(pageId), mustIndex);
      validateRedrawMarkup(current$, currentSlide, pageId, allowedVariables);
      changed.push(pageId);
    }
    stampPage(current$, currentSlide, baseline$, baselineSlide, isChanged);
    if (isChanged) {
      current$(currentSlide).attr(
        "data-experimental-required-visible",
        canonicalJson(requiredVisibleText(pagesById.get(pageId), mustIndex))
      );
    }
  }
  if (!changed.length) throw new WisePPTError("\u6279\u51C6\u9875\u9762\u4E2D\u81F3\u5C11\u4E00\u9875\u5FC5\u987B\u53D1\u751F\u771F\u5B9E\u53D8\u5316");
  const shell$ = load(current$.html());
  const shellBaseline$ = load(baseline$.html());
  shell$(`style[${EXPERIMENT_STYLE_ATTRIBUTE}]`).remove();
  shell$("section.slide[data-page-id]").remove();
  shellBaseline$("section.slide[data-page-id]").remove();
  if (canonicalJson(domSignature(shell$.root()[0])) !== canonicalJson(domSignature(shellBaseline$.root()[0]))) {
    throw new WisePPTError("\u5B9E\u9A8C\u4FEE\u6539\u8D85\u51FA\u6279\u51C6\u9875\u9762\u6216\u9650\u5B9A\u6837\u5F0F");
  }
  const resources = await validateLocalResources(deck, current$, baseline$);
  if (stamp) injectWatermarks(current$);
  return {
    rendered: current$.html(),
    checks: {
      approved_page_ids: workspace.approved_page_ids,
      actual_changed_page_ids: changed,
      page_count: currentSlides.list.length,
      content_lock_sha256: workspace.content_lock.sha256,
      theme_lock_sha256: workspace.theme_lock.sha256,
      new_scoped_style_count: styles.additions.length,
      resources
    }
  };
}
function buildIdentity(baselineId, workspaceSha, htmlSha, checks) {
  return sha256Text(canonicalJson({
    baseline_build_id: baselineId,
    workspace_sha256: workspaceSha,
    html_sha256: htmlSha,
    approved_page_ids: checks.approved_page_ids,
    actual_changed_page_ids: checks.actual_changed_page_ids
  }));
}
async function buildExperiment(root, rawDeck) {
  const deck = await resolveDeck(rawDeck);
  const state = await loadWorkspace(root, deck);
  const { rendered, checks } = await validateHtmlContract(deck, state.workspace, { stamp: true });
  await atomicWrite(path.join(deck, "index.html"), rendered);
  const htmlRecord = await fileRecord(deck, "index.html");
  const experimentalId = buildIdentity(state.baseline.build_id, state.workspaceSha, htmlRecord.sha256, checks);
  const removed = [];
  for (const relative of [PDF_NAME, EXPERIMENTAL_DELIVERY_MANIFEST]) {
    const target = path.join(deck, relative);
    if (await exists(target)) {
      const info = await stat(target);
      if (!info.isFile()) throw new WisePPTError(`\u62D2\u7EDD\u5220\u9664\u975E\u666E\u901A\u5B9E\u9A8C\u4EA4\u4ED8\u6587\u4EF6: ${target}`);
      await rm(target);
      removed.push(relative);
    }
  }
  const manifest = {
    contract: EXPERIMENTAL_BUILD_CONTRACT,
    mode: "redraw",
    generated_at: utcNow(),
    experimental_build_id: experimentalId,
    workspace: { path: EXPERIMENT_MARKER, contract: state.workspace.contract, sha256: state.workspaceSha },
    baseline: {
      contract: state.baseline.contract,
      build_id: state.baseline.build_id,
      build_manifest_sha256: state.baselineSha,
      source_tree_snapshot: state.workspace.source.tree_snapshot
    },
    approved_page_ids: checks.approved_page_ids,
    actual_changed_page_ids: checks.actual_changed_page_ids,
    locks: {
      content: { status: "pass", sha256: checks.content_lock_sha256 },
      theme: { status: "pass", sha256: checks.theme_lock_sha256 }
    },
    artifacts: { html: htmlRecord },
    page_count: checks.page_count,
    page_ids: state.workspace.content_lock.page_order,
    resources: checks.resources,
    unchanged_managed_files: [...state.entries.keys()].filter((item) => item !== "index.html").sort(),
    invalidated_artifacts_removed: removed,
    checks: {
      source_standard_current: "pass",
      approved_scope: "pass",
      unapproved_pages_byte_equivalent: "pass",
      content_lock: "pass",
      theme_lock: "pass",
      scoped_css: "pass",
      no_new_scripts: "pass",
      offline_resources: "pass",
      unique_visible_claim: "pass",
      source_and_must_visibility: "pass",
      watermark_each_page: "pass"
    }
  };
  await atomicWrite(path.join(deck, EXPERIMENTAL_BUILD_MANIFEST), renderJson(manifest));
  return { deck, manifest };
}
function validateWatermarks(source) {
  const $ = load(source);
  const state = slides($);
  const pageIds = [];
  for (const slide of state.list) {
    const pageId = $(slide).attr("data-page-id");
    pageIds.push(pageId);
    const marks = $(slide).children(`[${WATERMARK_ATTRIBUTE}="true"]`).toArray();
    if (marks.length !== 1 || !visibleText($, marks[0]).includes(WATERMARK_TEXT)) {
      throw new WisePPTError(`\u5B9E\u9A8C\u9875\u7F3A\u5C11\u552F\u4E00\u53EF\u89C1\u6807\u8BB0: ${pageId}`);
    }
  }
  const styles = $(`style#${WATERMARK_STYLE_ID}`).toArray();
  if (styles.length !== 1 || !$(styles[0]).text().includes("visibility: visible")) {
    throw new WisePPTError("\u5B9E\u9A8C HTML \u7F3A\u5C11\u552F\u4E00\u53EF\u89C1\u6C34\u5370\u6837\u5F0F");
  }
  return { pageCount: state.list.length, pageIds };
}
async function validateExperimentalBuild(root, rawDeck) {
  const deck = await resolveDeck(rawDeck);
  const state = await loadWorkspace(root, deck);
  const manifest = await readJson(path.join(deck, EXPERIMENTAL_BUILD_MANIFEST), EXPERIMENTAL_BUILD_MANIFEST);
  if (manifest.contract !== EXPERIMENTAL_BUILD_CONTRACT || manifest.mode !== "redraw") {
    throw new WisePPTError(`${EXPERIMENTAL_BUILD_MANIFEST} \u5408\u540C\u9519\u8BEF`);
  }
  const htmlRecord = await fileRecord(deck, "index.html");
  if (canonicalJson(manifest.artifacts?.html) !== canonicalJson(htmlRecord)) {
    throw new WisePPTError("index.html \u5728\u5B9E\u9A8C build \u540E\u5DF2\u6F02\u79FB\uFF1B\u8BF7\u91CD\u65B0\u8FD0\u884C experimental build");
  }
  const validation = await validateHtmlContract(deck, state.workspace, { stamp: true });
  const currentHtml = await readText(path.join(deck, "index.html"), "index.html");
  if (validation.rendered !== currentHtml) throw new WisePPTError("\u5B9E\u9A8C HTML \u6807\u8BB0\u4E0D\u7A33\u5B9A\uFF1B\u8BF7\u91CD\u65B0\u8FD0\u884C experimental build");
  const watermark = validateWatermarks(validation.rendered);
  if (watermark.pageCount !== manifest.page_count || canonicalJson(watermark.pageIds) !== canonicalJson(manifest.page_ids)) {
    throw new WisePPTError("\u5B9E\u9A8C HTML \u9875\u6570\u6216\u9875\u5E8F\u4E0E manifest \u4E0D\u4E00\u81F4");
  }
  if (canonicalJson(manifest.approved_page_ids) !== canonicalJson(validation.checks.approved_page_ids) || canonicalJson(manifest.actual_changed_page_ids) !== canonicalJson(validation.checks.actual_changed_page_ids)) {
    throw new WisePPTError("\u6279\u51C6\u9875\u6216\u5B9E\u9645\u53D8\u5316\u9875\u4E0E manifest \u4E0D\u4E00\u81F4");
  }
  const expectedId = buildIdentity(state.baseline.build_id, state.workspaceSha, htmlRecord.sha256, validation.checks);
  if (manifest.experimental_build_id !== expectedId) throw new WisePPTError("experimental_build_id \u65E0\u6CD5\u91CD\u7B97");
  const unchanged = [...state.entries.keys()].filter((item) => item !== "index.html").sort();
  if (canonicalJson(manifest.unchanged_managed_files) !== canonicalJson(unchanged)) {
    throw new WisePPTError("\u672A\u6539\u52A8\u53D7\u7BA1\u6587\u4EF6\u8BB0\u5F55\u4E0D\u5B8C\u6574");
  }
  if (await exists(path.join(deck, STANDARD_DELIVERY_MANIFEST))) {
    throw new WisePPTError("\u5B9E\u9A8C\u76EE\u5F55\u4E0D\u5F97\u4FDD\u7559\u6807\u51C6 delivery-manifest.json");
  }
  return { deck, manifest, baseline: state.baseline };
}
async function openPreview(indexPath) {
  if (!["darwin", "win32"].includes(process.platform)) {
    throw new WisePPTError(`Wise PPT \u4EC5\u652F\u6301 macOS \u548C Windows\uFF0C\u5F53\u524D\u5E73\u53F0\uFF1A${process.platform}`);
  }
  const command = process.platform === "darwin" ? "open" : "cmd.exe";
  const args = process.platform === "darwin" ? [indexPath] : ["/d", "/s", "/c", "start", "", indexPath];
  await new Promise((resolve, reject) => {
    const child = spawn(command, args, { detached: true, stdio: "ignore", windowsHide: true });
    child.once("error", reject);
    child.once("spawn", () => {
      child.unref();
      resolve();
    });
  });
}
async function pdfPageCount(filePath) {
  const pdf = await PDFDocument.load(await readFile(filePath), { updateMetadata: false });
  return pdf.getPageCount();
}
async function checkExperimentalDelivery(deck) {
  const manifest = await readJson(
    path.join(deck, EXPERIMENTAL_DELIVERY_MANIFEST),
    EXPERIMENTAL_DELIVERY_MANIFEST
  );
  if (manifest.contract !== EXPERIMENTAL_DELIVERY_CONTRACT || manifest.mode !== "redraw") {
    throw new WisePPTError("\u5B9E\u9A8C delivery manifest \u5408\u540C\u9519\u8BEF");
  }
  if (!/^Chrome\//.test(String(manifest.renderer?.product || "").replace(/^Google /, ""))) {
    throw new WisePPTError("\u5B9E\u9A8C delivery manifest \u7F3A\u5C11 Google Chrome \u6E32\u67D3\u5668\u8BC1\u636E");
  }
  if (canonicalJson(manifest.artifacts?.pdf) !== canonicalJson(await fileRecord(deck, PDF_NAME))) {
    throw new WisePPTError("\u5B9E\u9A8C PDF \u4E0E delivery manifest \u4E0D\u4E00\u81F4");
  }
  if (canonicalJson(manifest.artifacts?.html) !== canonicalJson(await fileRecord(deck, "index.html"))) {
    throw new WisePPTError("\u5B9E\u9A8C HTML \u4E0E delivery manifest \u4E0D\u4E00\u81F4");
  }
  if (manifest.page_count !== await pdfPageCount(path.join(deck, PDF_NAME))) {
    throw new WisePPTError("\u5B9E\u9A8C PDF \u9875\u6570\u4E0E delivery manifest \u4E0D\u4E00\u81F4");
  }
  const buildSha = (await shaFile(path.join(deck, EXPERIMENTAL_BUILD_MANIFEST))).sha256;
  if (manifest.experimental_build?.sha256 !== buildSha) {
    throw new WisePPTError("\u5B9E\u9A8C build manifest \u4E0E delivery manifest \u4E0D\u4E00\u81F4");
  }
  return manifest;
}
async function installExperimentalPair(deck, temporaryPdf, temporaryManifest) {
  const pdf = path.join(deck, PDF_NAME);
  const manifest = path.join(deck, EXPERIMENTAL_DELIVERY_MANIFEST);
  const pair = await Promise.all([exists(pdf), exists(manifest)]);
  if (pair[0] !== pair[1]) throw new WisePPTError("\u5B9E\u9A8C PDF \u4E0E manifest \u5FC5\u987B\u6210\u5BF9\u5B58\u5728");
  const token = `${process.pid}-${Date.now()}`;
  const pdfBackup = path.join(deck, `.${PDF_NAME}.backup-${token}`);
  const manifestBackup = path.join(deck, `.${EXPERIMENTAL_DELIVERY_MANIFEST}.backup-${token}`);
  let pdfBackedUp = false;
  let manifestBackedUp = false;
  let pdfInstalled = false;
  let manifestInstalled = false;
  try {
    if (pair[0]) {
      await rename(pdf, pdfBackup);
      pdfBackedUp = true;
      await rename(manifest, manifestBackup);
      manifestBackedUp = true;
    }
    await rename(temporaryPdf, pdf);
    pdfInstalled = true;
    await rename(temporaryManifest, manifest);
    manifestInstalled = true;
    await checkExperimentalDelivery(deck);
    if (pdfBackedUp || manifestBackedUp) {
      await Promise.all([rm(pdfBackup, { force: true }).catch(() => {
      }), rm(manifestBackup, { force: true }).catch(() => {
      })]);
    }
  } catch (error) {
    const rollbackErrors = [];
    if (pdfInstalled) await rm(pdf, { force: true }).catch((item) => rollbackErrors.push(`\u5220\u9664\u65B0 PDF: ${item.message}`));
    if (manifestInstalled) await rm(manifest, { force: true }).catch((item) => rollbackErrors.push(`\u5220\u9664\u65B0 manifest: ${item.message}`));
    if (pdfBackedUp) await rename(pdfBackup, pdf).catch((item) => rollbackErrors.push(`\u6062\u590D\u65E7 PDF: ${item.message}`));
    if (manifestBackedUp) await rename(manifestBackup, manifest).catch((item) => rollbackErrors.push(`\u6062\u590D\u65E7 manifest: ${item.message}`));
    const rollback = rollbackErrors.length ? `\u56DE\u6EDA\u4E0D\u5B8C\u6574\uFF08\u5907\u4EFD\u4FDD\u7559\u5728\u8F93\u51FA\u76EE\u5F55\uFF09\uFF1A${rollbackErrors.join("\uFF1B")}` : "\u65E7\u4EA4\u4ED8\u5DF2\u56DE\u6EDA";
    throw new WisePPTError(`\u5B9E\u9A8C PDF/manifest \u6210\u5BF9\u63D0\u4EA4\u5931\u8D25\uFF0C${rollback}: ${error.message}`);
  }
}
async function deliverExperiment(root, rawDeck) {
  const initial = await validateExperimentalBuild(root, rawDeck);
  const chrome = await discoverChrome();
  const temporary = await mkdtemp(path.join(path.dirname(initial.deck), ".wise-ppt-experimental-deliver-"));
  const temporaryPdf = path.join(temporary, PDF_NAME);
  const temporaryManifest = path.join(temporary, EXPERIMENTAL_DELIVERY_MANIFEST);
  try {
    const rendered = await runChromeTask({
      binary: chrome.binary,
      temporaryDir: temporary,
      run: (session) => exportExperimentalDeck({
        deckDir: initial.deck,
        url: deckFileUrl(initial.deck),
        port: session.port,
        pdfPath: temporaryPdf
      })
    });
    const pages = await pdfPageCount(temporaryPdf);
    if (pages !== initial.manifest.page_count || pages !== rendered.page_count) {
      throw new WisePPTError(`\u5B9E\u9A8C PDF \u9875\u6570 ${pages} \u4E0E HTML \u9875\u9762\u6570 ${initial.manifest.page_count} \u4E0D\u4E00\u81F4`);
    }
    const current = await validateExperimentalBuild(root, initial.deck);
    if (current.manifest.experimental_build_id !== initial.manifest.experimental_build_id || current.baseline.build_id !== initial.baseline.build_id) {
      throw new WisePPTError("Chrome \u6253\u5370\u671F\u95F4\u5B9E\u9A8C\u8F93\u5165\u53D1\u751F\u53D8\u5316");
    }
    const delivery = {
      contract: EXPERIMENTAL_DELIVERY_CONTRACT,
      mode: "redraw",
      generated_at: utcNow(),
      workspace: initial.manifest.workspace,
      baseline: initial.manifest.baseline,
      experimental_build: {
        path: EXPERIMENTAL_BUILD_MANIFEST,
        sha256: (await shaFile(path.join(initial.deck, EXPERIMENTAL_BUILD_MANIFEST))).sha256,
        experimental_build_id: initial.manifest.experimental_build_id
      },
      approved_page_ids: initial.manifest.approved_page_ids,
      actual_changed_page_ids: initial.manifest.actual_changed_page_ids,
      locks: initial.manifest.locks,
      page_count: pages,
      page_ids: initial.manifest.page_ids,
      artifacts: {
        html: await fileRecord(initial.deck, "index.html"),
        pdf: { path: PDF_NAME, ...await shaFile(temporaryPdf) }
      },
      local_resources: initial.manifest.resources,
      renderer: rendered.renderer,
      browser: {
        executable: chrome.binary,
        product: chrome.product,
        version: chrome.version,
        driver: "node-cdp",
        exit_code: 0,
        result: "pass"
      },
      checks: {
        ...initial.manifest.checks,
        browser_16_9_and_bounds: "pass",
        browser_minimum_font_size: "pass",
        browser_load_and_print: "pass",
        pdf_header: "pass",
        pdf_page_count: "pass",
        renderer_evidence: "pass"
      },
      standard_checks_not_claimed: [
        "normal/accent four-state",
        "runtime selftest",
        "registry fit",
        "screen/print geometry parity",
        "blurred raster RMSE"
      ]
    };
    await atomicWrite(temporaryManifest, renderJson(delivery));
    await installExperimentalPair(initial.deck, temporaryPdf, temporaryManifest);
    return { deck: initial.deck, delivery };
  } finally {
    await rm(temporary, { recursive: true, force: true }).catch(() => {
    });
  }
}
function parseExperimentalArgs(args) {
  const [command, ...rest] = args;
  if (!["prepare", "build", "validate", "preview", "deliver"].includes(command)) {
    throw new WisePPTError("experimental \u547D\u4EE4\u5FC5\u987B\u662F prepare|build|validate|preview|deliver");
  }
  if (command !== "prepare") {
    const open = rest.includes("--open");
    const values = rest.filter((item) => item !== "--open");
    if (values.length !== 1 || open && command !== "preview") {
      throw new WisePPTError(`experimental ${command} \u53C2\u6570\u9519\u8BEF`);
    }
    return { command, deck: values[0], open };
  }
  const positionals = [];
  const pages = [];
  let output;
  let allPages = false;
  for (let index = 0; index < rest.length; index += 1) {
    const item = rest[index];
    if (item === "--all-pages") {
      allPages = true;
      continue;
    }
    if (item === "--page" || item === "--out") {
      if (index + 1 >= rest.length) throw new WisePPTError(`${item} \u7F3A\u5C11\u503C`);
      const value = rest[++index];
      if (item === "--page") pages.push(value);
      else if (output === void 0) output = value;
      else throw new WisePPTError("--out \u53C2\u6570\u91CD\u590D");
      continue;
    }
    if (item.startsWith("--")) throw new WisePPTError(`experimental prepare \u672A\u767B\u8BB0\u53C2\u6570: ${item}`);
    positionals.push(item);
  }
  if (positionals.length !== 1 || !output || allPages === Boolean(pages.length)) {
    throw new WisePPTError("experimental prepare \u9700\u8981 source\u3001--out\uFF0C\u4E14 --page \u4E0E --all-pages \u4E8C\u9009\u4E00");
  }
  return { command, source: positionals[0], output, pages, allPages };
}
async function runExperimental(root, args) {
  const parsed = parseExperimentalArgs(args);
  if (parsed.command === "prepare") {
    const result2 = await prepareExperiment(root, parsed.source, parsed.output, parsed.pages, parsed.allPages);
    process.stdout.write(`PASS Wise PPT experimental prepare pages=${result2.workspace.approved_page_ids.join(",")} source=${result2.source} out=${result2.output}
`);
    return;
  }
  if (parsed.command === "build") {
    const result2 = await buildExperiment(root, parsed.deck);
    process.stdout.write(`PASS Wise PPT experimental build changed=${result2.manifest.actual_changed_page_ids.join(",")} build_id=${result2.manifest.experimental_build_id}
`);
    return;
  }
  if (parsed.command === "validate") {
    const result2 = await validateExperimentalBuild(root, parsed.deck);
    process.stdout.write(`PASS Wise PPT experimental validate pages=${result2.manifest.page_count}
`);
    return;
  }
  if (parsed.command === "preview") {
    const result2 = await validateExperimentalBuild(root, parsed.deck);
    if (parsed.open) await openPreview(path.join(result2.deck, "index.html"));
    process.stdout.write(`PASS Wise PPT experimental preview pages=${result2.manifest.page_count} opened=${parsed.open ? "yes" : "no"}
`);
    return;
  }
  const result = await deliverExperiment(root, parsed.deck);
  process.stdout.write(`PASS Wise PPT experimental delivery pages=${result.delivery.page_count} pdf=${path.join(result.deck, PDF_NAME)}
`);
}
export {
  buildExperiment,
  deliverExperiment,
  installExperimentalPair,
  parseExperimentalArgs,
  prepareExperiment,
  runExperimental,
  validateExperimentalBuild
};
