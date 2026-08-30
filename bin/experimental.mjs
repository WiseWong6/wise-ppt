import { spawn } from "node:child_process";
import { copyFile, mkdir, mkdtemp, readFile, rename, rm, stat } from "node:fs/promises";
import path from "node:path";
import { checkDelivery, exportExperimentalDeck } from "#wise-export-deck";
import { load } from "#wise-html";
import { getPdfPageCount } from "#wise-pdf-reader";
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
} from "./common.mjs";
import { deckFileUrl, discoverChrome, runChromeTask } from "./chrome.mjs";
import { validateDeck } from "./standard.mjs";
const STANDARD_BUILD_CONTRACT = "wise-ppt-build@6";
const EXPERIMENTAL_WORKSPACE_CONTRACT = "wise-ppt-experimental-workspace@2";
const EXPERIMENTAL_BUILD_CONTRACT = "wise-ppt-experimental-build@4";
const EXPERIMENTAL_DELIVERY_CONTRACT = "wise-ppt-experimental-delivery@5";
const OUTPUT_MARKER = ".wise-ppt-output";
const EXPERIMENT_MARKER = ".wise-ppt-experiment";
const BUILD_MANIFEST = "build-manifest.json";
const STANDARD_DELIVERY_MANIFEST = "delivery-manifest.json";
const EXPERIMENTAL_BUILD_MANIFEST = "experimental-build-manifest.json";
const EXPERIMENTAL_DELIVERY_MANIFEST = "experimental-delivery-manifest.json";
const PDF_NAME = "experimental.pdf";
const EXPERIMENTAL_MARKER_ATTRIBUTE = "data-wise-ppt-experimental-delivery";
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
function utcNow() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
async function resolveDeck(raw) {
  const deck = assertAbsolute(raw, "deck 目录");
  await assertNoSymlinkComponents(deck, "deck");
  const info = await stat(deck).catch(() => null);
  if (!info?.isDirectory()) throw new WisePPTError(`deck 目录不存在: ${deck}`);
  return deck;
}
async function resolveNewOutput(raw, source) {
  const output = assertAbsolute(raw, "--out ");
  await assertNoSymlinkComponents(output, "--out");
  if (await exists(output)) throw new WisePPTError(`--out 必须是尚不存在的新目录: ${output}`);
  const relative = path.relative(source, output);
  const reverse = path.relative(output, source);
  if (!relative || !relative.startsWith("..") && !path.isAbsolute(relative) || !reverse.startsWith("..") && !path.isAbsolute(reverse)) {
    throw new WisePPTError("standard 与实验目录不得相同或互相嵌套");
  }
  return output;
}
function safeRelative(value, label) {
  if (typeof value !== "string" || !value || value.startsWith("/") || value.includes("\\") || path.posix.normalize(value) !== value || value.split("/").some((part) => !part || [".", ".."].includes(part))) {
    throw new WisePPTError(`${label}.path 非法: ${JSON.stringify(value)}`);
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
    throw new WisePPTError(`实验必须从 ${STANDARD_BUILD_CONTRACT} 成品开始，实际 ${JSON.stringify(manifest.contract)}`);
  }
  if (!/^[0-9a-f]{64}$/.test(String(manifest.build_id || ""))) throw new WisePPTError("build-manifest.build_id 非法");
  if (!Number.isInteger(manifest.page_count) || manifest.page_count < 1) throw new WisePPTError("build-manifest.page_count 必须是正整数");
  if (!Array.isArray(manifest.managed_files)) throw new WisePPTError("build-manifest.managed_files 必须是完整数组");
  const entries = /* @__PURE__ */ new Map();
  for (const [index, item] of manifest.managed_files.entries()) {
    const label = `build-manifest.managed_files[${index + 1}]`;
    if (!item || typeof item !== "object" || Array.isArray(item) || canonicalJson(Object.keys(item).sort()) !== canonicalJson(["bytes", "path", "sha256"])) {
      throw new WisePPTError(`${label} 字段非法`);
    }
    const relative = safeRelative(item.path, label);
    if (entries.has(relative)) throw new WisePPTError(`build-manifest.managed_files 路径重复: ${relative}`);
    if (!/^[0-9a-f]{64}$/.test(String(item.sha256 || ""))) throw new WisePPTError(`${label}.sha256 非法`);
    if (!Number.isInteger(item.bytes) || item.bytes < 0) throw new WisePPTError(`${label}.bytes 非法`);
    const target = await safeManagedPath(deck, relative, label);
    const info = await stat(target).catch(() => null);
    if (!info?.isFile()) throw new WisePPTError(`基础 standard 受管文件缺失: ${relative}`);
    if (!allowIndexDrift || relative !== "index.html") {
      if (canonicalJson(await fileRecord(deck, relative)) !== canonicalJson(item)) {
        throw new WisePPTError(`基础 standard 受管文件已漂移: ${relative}`);
      }
    }
    entries.set(relative, item);
  }
  for (const required of ["index.html", "deck-plan.json", "deck-spec.json"]) {
    if (!entries.has(required)) throw new WisePPTError("build-manifest 缺少 index.html/deck-plan.json/deck-spec.json");
  }
  if (await readText(path.join(deck, OUTPUT_MARKER), OUTPUT_MARKER) !== `${STANDARD_BUILD_CONTRACT}
`) {
    throw new WisePPTError(`${OUTPUT_MARKER} 合同标记错误`);
  }
  return { manifest, entries, sha256: (await shaFile(manifestPath)).sha256 };
}
async function validateStandardSource(root, source) {
  try {
    await validateDeck(root, source);
    await checkDelivery({ deckDir: source });
  } catch (error) {
    throw new WisePPTError(`standard 来源不是当前完整交付: ${error.message}`);
  }
}
async function pageLock(source) {
  const plan = await readJson(path.join(source, "deck-plan.json"), "deck-plan.json");
  const spec = await readJson(path.join(source, "deck-spec.json"), "deck-spec.json");
  if (!Array.isArray(plan.pages) || !plan.pages.length) throw new WisePPTError("deck-plan.pages 必须是非空数组");
  const seen = /* @__PURE__ */ new Set();
  const pages = plan.pages.map((page, index) => {
    if (!page || typeof page !== "object" || Array.isArray(page)) throw new WisePPTError(`deck-plan.pages[${index + 1}] 必须是对象`);
    if (typeof page.page_id !== "string" || !page.page_id || seen.has(page.page_id)) {
      throw new WisePPTError(`deck-plan.pages[${index + 1}].page_id 缺失或重复`);
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
  if (!html.length) throw new WisePPTError("standard index.html 缺少 html 根节点");
  const cssRecords = [...entries.entries()].filter(([name]) => name.endsWith(".css")).map(([, item]) => item);
  const fontRecords = [...entries.entries()].filter(([name]) => name.startsWith("assets/fonts/")).map(([, item]) => item);
  const variables = /* @__PURE__ */ new Set();
  for (const record of cssRecords) {
    const css = await readText(path.join(source, ...record.path.split("/")), record.path);
    for (const match of css.matchAll(/(--[-A-Za-z0-9_]+)\s*:/g)) variables.add(match[1]);
  }
  const value = {
    theme: spec.deck?.theme ?? null,
    typography_mode: spec.deck?.typography_mode || html.attr("data-typography-mode") || null,
    root_attributes: {
      "data-theme-id": html.attr("data-theme-id") ?? null,
      "data-typography-mode": html.attr("data-typography-mode") ?? null
    },
    theme_assets: cssRecords,
    fonts: fontRecords,
    allowed_css_variables: [...variables].sort()
  };
  return { ...value, sha256: sha256Text(canonicalJson(value)) };
}
function selectScope(pageIds, approvedPageIds, allPages) {
  if (allPages === Boolean(approvedPageIds?.length)) throw new WisePPTError("--page 与 --all-pages 必须二选一");
  const requested = allPages ? pageIds : [...new Set(approvedPageIds || [])];
  const unknown = [...new Set(requested)].filter((item) => !pageIds.includes(item)).sort();
  if (unknown.length) throw new WisePPTError(`批准范围含未知页面: ${unknown.join(", ")}`);
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
    if (await exists(output)) throw new WisePPTError(`--out 在准备期间已出现，拒绝覆盖: ${output}`);
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
    throw new WisePPTError(`${EXPERIMENT_MARKER} 必须重新 prepare 为 ${EXPERIMENTAL_WORKSPACE_CONTRACT}`);
  }
  if (!workspace.source || typeof workspace.source.path !== "string" || !path.isAbsolute(workspace.source.path)) {
    throw new WisePPTError(`${EXPERIMENT_MARKER}.source 非法`);
  }
  const source = workspace.source.path;
  const sourceInfo = await stat(source).catch(() => null);
  if (!sourceInfo?.isDirectory()) throw new WisePPTError("基础 standard 来源不存在");
  await validateStandardSource(root, source);
  const sourceState = await loadStandardManifest(source, { allowIndexDrift: false });
  if (workspace.source.build_id !== sourceState.manifest.build_id || workspace.source.build_manifest_sha256 !== sourceState.sha256 || canonicalJson(workspace.source.tree_snapshot) !== canonicalJson(await directorySnapshot(source))) {
    throw new WisePPTError("基础 standard 来源已漂移；实验失效");
  }
  const current = await loadStandardManifest(deck, { allowIndexDrift: true });
  if (current.manifest.build_id !== sourceState.manifest.build_id || current.sha256 !== sourceState.sha256) {
    throw new WisePPTError("实验副本与基础 standard build 不一致");
  }
  if (canonicalJson(await pageLock(source)) !== canonicalJson(workspace.content_lock)) throw new WisePPTError("内容锁与基础 standard 不一致");
  if (canonicalJson(await themeLock(source, sourceState.entries)) !== canonicalJson(workspace.theme_lock)) throw new WisePPTError("主题锁与基础 standard 不一致");
  if (!Array.isArray(workspace.approved_page_ids) || !workspace.approved_page_ids.length || workspace.approved_page_ids.some((item) => !workspace.content_lock.page_order.includes(item))) {
    throw new WisePPTError("实验 workspace 的 approved_page_ids 非法");
  }
  const optional = /* @__PURE__ */ new Set([PDF_NAME, EXPERIMENTAL_BUILD_MANIFEST, EXPERIMENTAL_DELIVERY_MANIFEST]);
  const expected = /* @__PURE__ */ new Set([...current.entries.keys(), BUILD_MANIFEST, OUTPUT_MARKER, EXPERIMENT_MARKER]);
  const disk = new Set(await collectFiles(deck, { includeHidden: true }));
  const missing = [...expected].filter((item) => !disk.has(item)).sort();
  const unknown = [...disk].filter((item) => !expected.has(item) && !optional.has(item)).sort();
  if (missing.length || unknown.length) {
    throw new WisePPTError(`实验 deck 文件集不闭合: 缺失=${JSON.stringify(missing)}，未知=${JSON.stringify(unknown)}`);
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
  $(`section.slide[${EXPERIMENTAL_MARKER_ATTRIBUTE}]`).removeAttr(EXPERIMENTAL_MARKER_ATTRIBUTE);
}
function slides($) {
  const list = $("section.slide[data-page-id]").toArray();
  const ids = list.map((node) => String($(node).attr("data-page-id") || "").trim());
  if (!list.length || ids.some((item) => !item) || new Set(ids).size !== ids.length) {
    throw new WisePPTError("实验 HTML 的 page_id 缺失或重复");
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
  return $("style").toArray();
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
    if (name.startsWith("--")) throw new WisePPTError(`${label} 禁止新增或覆盖主题变量: ${name}`);
    const variables = new Set([...value.matchAll(/var\(\s*(--[-A-Za-z0-9_]+)/gi)].map((item) => item[1]));
    const unknown = [...variables].filter((item) => !allowedVariables.has(item)).sort();
    if (unknown.length) throw new WisePPTError(`${label} 使用未登记主题变量: ${unknown.join(", ")}`);
    if (COLOR_PROPERTIES.has(name) && /(#[0-9a-f]{3,8}\b|\brgba?\s*\(|\bhsla?\s*\(|\boklab\s*\(|\boklch\s*\()/i.test(value)) {
      throw new WisePPTError(`${label} 禁止硬编码主题外色值: ${name}: ${value}`);
    }
    if (["font", "font-family"].includes(name) && !/var\(/i.test(value)) {
      throw new WisePPTError(`${label} 字体必须使用原主题变量: ${value}`);
    }
    if (name === "font-size" && !/var\(/i.test(value)) {
      const pixels = [...value.matchAll(/(-?\d+(?:\.\d+)?)px\b/gi)].map((item) => Number(item[1]));
      if (!pixels.length || Math.min(...pixels) < 18) throw new WisePPTError(`${label} 最小字号不得低于 18px: ${value}`);
    }
    if (["left", "right", "top", "bottom", "width", "height", "max-width", "max-height"].includes(name)) {
      for (const item of value.matchAll(/(-?\d+(?:\.\d+)?)px\b/gi)) {
        const numeric = Number(item[1]);
        const limit = name.includes("width") || ["left", "right"].includes(name) ? 1920 : 1080;
        if (numeric < 0 || numeric > limit) throw new WisePPTError(`${label} 存在边界风险: ${name}: ${value}`);
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
    if (!approved.has(pageId)) throw new WisePPTError("新增样式必须用 data-experimental-page-style 限定到批准页面");
    const css = current$(node).text();
    if (css.replace(/\/\*.*?\*\//gs, "").includes("@")) {
      throw new WisePPTError(`实验页 ${pageId} 新增样式禁止 @import/@font-face/@media`);
    }
    const rules = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/gs)];
    const remainder = css.replace(/([^{}]+)\{([^{}]*)\}/gs, "").trim();
    if (!rules.length || remainder) throw new WisePPTError(`实验页 ${pageId} 新增 CSS 结构无法安全验证`);
    const scope = `[data-page-id="${pageId}"]`;
    for (const rule of rules) {
      for (const selector of rule[1].split(",")) {
        const normalized = selector.trim().replace(/\s+/g, " ");
        if (!normalized.includes(scope) || normalized.includes(":root") || /(^|\s)(html|body)(\s|$)/.test(normalized)) {
          throw new WisePPTError(`实验页 ${pageId} CSS 未限定到本页: ${normalized}`);
        }
      }
      validateDeclarations(rule[2], allowedVariables, `实验页 ${pageId} CSS`);
    }
    additions.push(node);
    if (!grouped.has(pageId)) grouped.set(pageId, []);
    grouped.get(pageId).push(node);
  }
  if ([...counts.values()].some((value) => value)) throw new WisePPTError("禁止删除或修改原 standard 样式");
  return { grouped, additions };
}
function validateRedrawMarkup($, slide, pageId, allowedVariables) {
  $(slide).find("*").each((_index, node) => {
    const inline = $(node).attr("style");
    if (inline) validateDeclarations(inline, allowedVariables, `实验页 ${pageId} 行内样式`);
    for (const attr of ["fill", "stroke", "color"]) {
      const value = $(node).attr(attr);
      if (value && /(#[0-9a-f]{3,8}\b|\brgba?\s*\(|\bhsla?\s*\(|\boklab\s*\(|\boklch\s*\()/i.test(value)) {
        throw new WisePPTError(`实验页 ${pageId} 禁止硬编码主题外色值: ${attr}=${value}`);
      }
    }
  });
}
function canonicalSlide($, slide, baseline$, baselineSlide) {
  const clone$ = load(outerHtml($, slide));
  const clone = clone$("section.slide[data-page-id]").first();
  clone.removeAttr(EXPERIMENTAL_MARKER_ATTRIBUTE);
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
      if (actual !== void 0 && actual !== "") throw new WisePPTError(`实验页 ${pageId} 修改了 ${field}`);
    } else if (actual !== String(expected)) {
      throw new WisePPTError(`实验页 ${pageId} 修改或删除了 ${field}`);
    }
  }
  const expectedJson = {
    "data-source-refs": page.source_refs || [],
    "data-source-evidence": page.source_evidence || {},
    "data-must-refs": page.must_refs || []
  };
  for (const [attribute, expected] of Object.entries(expectedJson)) {
    const raw = $(slide).attr(attribute);
    if (raw === void 0) throw new WisePPTError(`实验页 ${pageId} 删除了内容锁属性 ${attribute}`);
    let actual;
    try {
      actual = JSON.parse(raw);
    } catch {
      throw new WisePPTError(`实验页 ${pageId} 的 ${attribute} 不是合法 JSON`);
    }
    if (canonicalJson(actual) !== canonicalJson(expected)) throw new WisePPTError(`实验页 ${pageId} 修改了 ${attribute}`);
  }
  for (const attribute of ["data-page-title", "data-page-summary"]) {
    const actual = $(slide).attr(attribute);
    if (actual !== void 0 && actual !== page.claim) throw new WisePPTError(`实验页 ${pageId} 修改了 claim 元数据`);
  }
  const claimNodes = $(slide).find(`[${EXPERIMENT_CLAIM_ATTRIBUTE}="true"]`).toArray();
  const expectedClaim = String(page.claim || "").trim().replace(/\s+/g, " ");
  if (claimNodes.length !== 1 || visibleText($, claimNodes[0]) !== expectedClaim) {
    throw new WisePPTError(`重绘页 ${pageId} 必须保留唯一可见 claim 节点且文本完全一致`);
  }
  const visible = visibleText($, slide);
  for (const evidence of requiredVisibleText(page, mustIndex)) {
    if (!visible.includes(evidence)) throw new WisePPTError(`重绘页 ${pageId} 缺少 source/must 可见证据: ${evidence}`);
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
    if ($(node).attr("srcdoc") !== void 0) throw new WisePPTError("实验 HTML 禁止 srcdoc");
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
      throw new WisePPTError("实验重绘禁止新增 data URI 或图片生成内联资源");
    }
    if (value.startsWith("//") || /^[A-Za-z][A-Za-z0-9+.-]*:/.test(value)) {
      throw new WisePPTError(`实验 HTML 禁止远程资源或绝对 scheme 资源: ${value}`);
    }
    let decoded;
    try {
      decoded = decodeURIComponent(value.split(/[?#]/, 1)[0]);
    } catch {
      throw new WisePPTError(`实验 HTML 资源路径编码非法: ${value}`);
    }
    const segments = decoded.split("/");
    if (path.posix.isAbsolute(decoded) || segments.includes("..")) throw new WisePPTError(`实验 HTML 资源越出 deck: ${value}`);
    const target = path.resolve(deck, ...segments);
    const relative = path.relative(deck, target);
    if (relative.startsWith("..") || path.isAbsolute(relative)) throw new WisePPTError(`实验 HTML 资源越出 deck: ${value}`);
    await assertNoSymlinkComponents(target, "实验 HTML 资源");
    const info = await stat(target).catch(() => null);
    if (!info?.isFile()) throw new WisePPTError(`实验 HTML 本地资源不存在或不安全: ${value}`);
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
function injectExperimentalMarkers($) {
  stripFramework($);
  for (const slide of slides($).list) $(slide).attr(EXPERIMENTAL_MARKER_ATTRIBUTE, "true");
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
    throw new WisePPTError("实验页数或页序与 standard 不一致");
  }
  for (const [attribute, expected] of Object.entries(workspace.theme_lock.root_attributes)) {
    if ((current$("html").attr(attribute) ?? null) !== expected || (baseline$("html").attr(attribute) ?? null) !== expected) {
      throw new WisePPTError(`实验修改了根级主题属性 ${attribute}`);
    }
  }
  if (canonicalJson(signatures(current$, "script")) !== canonicalJson(signatures(baseline$, "script"))) {
    throw new WisePPTError("实验禁止新增、删除或修改脚本");
  }
  if (canonicalJson(signatures(current$, "link")) !== canonicalJson(signatures(baseline$, "link"))) {
    throw new WisePPTError("实验禁止新增、删除或修改主题/字体资源");
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
    if (!approved.has(pageId) && isChanged) throw new WisePPTError(`未授权页面发生变化: ${pageId}`);
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
  if (!changed.length) throw new WisePPTError("批准页面中至少一页必须发生真实变化");
  const shell$ = load(current$.html());
  const shellBaseline$ = load(baseline$.html());
  shell$(`style[${EXPERIMENT_STYLE_ATTRIBUTE}]`).remove();
  shell$("section.slide[data-page-id]").remove();
  shellBaseline$("section.slide[data-page-id]").remove();
  if (canonicalJson(domSignature(shell$.root()[0])) !== canonicalJson(domSignature(shellBaseline$.root()[0]))) {
    throw new WisePPTError("实验修改超出批准页面或限定样式");
  }
  const resources = await validateLocalResources(deck, current$, baseline$);
  if (stamp) injectExperimentalMarkers(current$);
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
      if (!info.isFile()) throw new WisePPTError(`拒绝删除非普通实验交付文件: ${target}`);
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
      nonvisual_experimental_marker_each_page: "pass"
    }
  };
  await atomicWrite(path.join(deck, EXPERIMENTAL_BUILD_MANIFEST), renderJson(manifest));
  return { deck, manifest };
}
function validateExperimentalMarkers(source) {
  const $ = load(source);
  const state = slides($);
  const pageIds = [];
  for (const slide of state.list) {
    const pageId = $(slide).attr("data-page-id");
    pageIds.push(pageId);
    if ($(slide).attr(EXPERIMENTAL_MARKER_ATTRIBUTE) !== "true") {
      throw new WisePPTError(`实验页缺少非视觉实验标记: ${pageId}`);
    }
  }
  return { pageCount: state.list.length, pageIds };
}
async function validateExperimentalBuild(root, rawDeck) {
  const deck = await resolveDeck(rawDeck);
  const state = await loadWorkspace(root, deck);
  const manifest = await readJson(path.join(deck, EXPERIMENTAL_BUILD_MANIFEST), EXPERIMENTAL_BUILD_MANIFEST);
  if (manifest.contract !== EXPERIMENTAL_BUILD_CONTRACT || manifest.mode !== "redraw") {
    throw new WisePPTError(`${EXPERIMENTAL_BUILD_MANIFEST} 合同错误`);
  }
  const htmlRecord = await fileRecord(deck, "index.html");
  if (canonicalJson(manifest.artifacts?.html) !== canonicalJson(htmlRecord)) {
    throw new WisePPTError("index.html 在实验 build 后已漂移；请重新运行 experimental build");
  }
  const validation = await validateHtmlContract(deck, state.workspace, { stamp: true });
  const currentHtml = await readText(path.join(deck, "index.html"), "index.html");
  if (validation.rendered !== currentHtml) throw new WisePPTError("实验 HTML 标记不稳定；请重新运行 experimental build");
  const markers = validateExperimentalMarkers(validation.rendered);
  if (markers.pageCount !== manifest.page_count || canonicalJson(markers.pageIds) !== canonicalJson(manifest.page_ids)) {
    throw new WisePPTError("实验 HTML 页数或页序与 manifest 不一致");
  }
  if (canonicalJson(manifest.approved_page_ids) !== canonicalJson(validation.checks.approved_page_ids) || canonicalJson(manifest.actual_changed_page_ids) !== canonicalJson(validation.checks.actual_changed_page_ids)) {
    throw new WisePPTError("批准页或实际变化页与 manifest 不一致");
  }
  const expectedId = buildIdentity(state.baseline.build_id, state.workspaceSha, htmlRecord.sha256, validation.checks);
  if (manifest.experimental_build_id !== expectedId) throw new WisePPTError("experimental_build_id 无法重算");
  const unchanged = [...state.entries.keys()].filter((item) => item !== "index.html").sort();
  if (canonicalJson(manifest.unchanged_managed_files) !== canonicalJson(unchanged)) {
    throw new WisePPTError("未改动受管文件记录不完整");
  }
  if (await exists(path.join(deck, STANDARD_DELIVERY_MANIFEST))) {
    throw new WisePPTError("实验目录不得保留标准 delivery-manifest.json");
  }
  return { deck, manifest, baseline: state.baseline };
}
async function openPreview(indexPath) {
  if (!["darwin", "win32"].includes(process.platform)) {
    throw new WisePPTError(`Wise PPT 仅支持 macOS 和 Windows，当前平台：${process.platform}`);
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
  return getPdfPageCount(await readFile(filePath));
}
async function checkExperimentalDelivery(deck) {
  const manifest = await readJson(
    path.join(deck, EXPERIMENTAL_DELIVERY_MANIFEST),
    EXPERIMENTAL_DELIVERY_MANIFEST
  );
  if (manifest.contract !== EXPERIMENTAL_DELIVERY_CONTRACT || manifest.mode !== "redraw") {
    throw new WisePPTError("实验 delivery manifest 合同错误");
  }
  if (!/^Chrome\//.test(String(manifest.renderer?.product || "").replace(/^Google /, ""))) {
    throw new WisePPTError("实验 delivery manifest 缺少 Google Chrome 渲染器证据");
  }
  if (canonicalJson(manifest.artifacts?.pdf) !== canonicalJson(await fileRecord(deck, PDF_NAME))) {
    throw new WisePPTError("实验 PDF 与 delivery manifest 不一致");
  }
  if (canonicalJson(manifest.artifacts?.html) !== canonicalJson(await fileRecord(deck, "index.html"))) {
    throw new WisePPTError("实验 HTML 与 delivery manifest 不一致");
  }
  if (manifest.page_count !== await pdfPageCount(path.join(deck, PDF_NAME))) {
    throw new WisePPTError("实验 PDF 页数与 delivery manifest 不一致");
  }
  const buildSha = (await shaFile(path.join(deck, EXPERIMENTAL_BUILD_MANIFEST))).sha256;
  if (manifest.experimental_build?.sha256 !== buildSha) {
    throw new WisePPTError("实验 build manifest 与 delivery manifest 不一致");
  }
  return manifest;
}
async function installExperimentalPair(deck, temporaryPdf, temporaryManifest) {
  const pdf = path.join(deck, PDF_NAME);
  const manifest = path.join(deck, EXPERIMENTAL_DELIVERY_MANIFEST);
  const pair = await Promise.all([exists(pdf), exists(manifest)]);
  if (pair[0] !== pair[1]) throw new WisePPTError("实验 PDF 与 manifest 必须成对存在");
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
    if (pdfInstalled) await rm(pdf, { force: true }).catch((item) => rollbackErrors.push(`删除新 PDF: ${item.message}`));
    if (manifestInstalled) await rm(manifest, { force: true }).catch((item) => rollbackErrors.push(`删除新 manifest: ${item.message}`));
    if (pdfBackedUp) await rename(pdfBackup, pdf).catch((item) => rollbackErrors.push(`恢复旧 PDF: ${item.message}`));
    if (manifestBackedUp) await rename(manifestBackup, manifest).catch((item) => rollbackErrors.push(`恢复旧 manifest: ${item.message}`));
    const rollback = rollbackErrors.length ? `回滚不完整（备份保留在输出目录）：${rollbackErrors.join("；")}` : "旧交付已回滚";
    throw new WisePPTError(`实验 PDF/manifest 成对提交失败，${rollback}: ${error.message}`);
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
      throw new WisePPTError(`实验 PDF 页数 ${pages} 与 HTML 页面数 ${initial.manifest.page_count} 不一致`);
    }
    const current = await validateExperimentalBuild(root, initial.deck);
    if (current.manifest.experimental_build_id !== initial.manifest.experimental_build_id || current.baseline.build_id !== initial.baseline.build_id) {
      throw new WisePPTError("Chrome 打印期间实验输入发生变化");
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
    throw new WisePPTError("experimental 命令必须是 prepare|build|validate|preview|deliver");
  }
  if (command !== "prepare") {
    const open = rest.includes("--open");
    const values = rest.filter((item) => item !== "--open");
    if (values.length !== 1 || open && command !== "preview") {
      throw new WisePPTError(`experimental ${command} 参数错误`);
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
      if (index + 1 >= rest.length) throw new WisePPTError(`${item} 缺少值`);
      const value = rest[++index];
      if (item === "--page") pages.push(value);
      else if (output === void 0) output = value;
      else throw new WisePPTError("--out 参数重复");
      continue;
    }
    if (item.startsWith("--")) throw new WisePPTError(`experimental prepare 未登记参数: ${item}`);
    positionals.push(item);
  }
  if (positionals.length !== 1 || !output || allPages === Boolean(pages.length)) {
    throw new WisePPTError("experimental prepare 需要 source、--out，且 --page 与 --all-pages 二选一");
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
