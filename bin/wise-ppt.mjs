#!/usr/bin/env node
import { randomBytes } from "node:crypto";
import path from "node:path";
import {
  LAYOUT_AGENT_BRIEF_FORMAT,
  LAYOUT_QUERY_FORMAT,
  PREFLIGHT_REPORT_FORMAT,
  SUPPORTED_NODE_MAJORS
} from "./constants.mjs";
import {
  assertAbsolute,
  assertNoSymlinkComponents,
  readJson,
  renderJson,
  runtimeRoot,
  WisePPTError
} from "./common.mjs";
import { verifyBundle } from "./bundle.mjs";
import { doctor } from "./doctor.mjs";
import { deliverStandard } from "./deliver.mjs";
import { resolveTheme } from "./theme.mjs";
import { createThemePreview } from "./theme-preview.mjs";
import {
  buildAndPublish,
  layoutSelectionState,
  normalizeLayoutUsage,
  planLayouts,
  preflightSpec,
  queryLayouts,
  registryState,
  validateDeck
} from "./standard.mjs";
function usage() {
  return [
    "用法:",
    "  node <skill>/bin/wise-ppt.mjs doctor",
    "  node <skill>/bin/wise-ppt.mjs layouts [filters]",
    "  node <skill>/bin/wise-ppt.mjs layouts plan <page-plan.json> --agent-brief [--new-session]",
    "  node <skill>/bin/wise-ppt.mjs preflight <deck-spec.json> --all-errors",
    "  node <skill>/bin/wise-ppt.mjs build <deck-spec.json> --out <绝对目录>",
    "  node <skill>/bin/wise-ppt.mjs validate <绝对 deck 目录>",
    "  node <skill>/bin/wise-ppt.mjs themes resolve <theme.json 绝对路径>",
    "  node <skill>/bin/wise-ppt.mjs themes preview <deck 绝对目录> --theme <theme.json 绝对路径> --out <绝对目录>",
    "  node <skill>/bin/wise-ppt.mjs deliver <绝对 deck 目录>",
    "  node <skill>/bin/wise-ppt.mjs experimental <prepare|build|validate|preview|deliver> ..."
  ].join("\n");
}
function commandUsage(command) {
  const lines = {
    doctor: ["node <skill>/bin/wise-ppt.mjs doctor"],
    layouts: [
      "整副规划: node <skill>/bin/wise-ppt.mjs layouts plan <page-plan.json 绝对路径> --agent-brief [--new-session]",
      "候选查询: node <skill>/bin/wise-ppt.mjs layouts (--new-session | --selection-seed SEED) [--page-kind KIND] [--page-role ROLE] [--relation-key KEY] [--requires TYPE] [--content-items N] [--layout-usage ID:COUNT:LAST_SEQUENCE] [--compact]",
      "详情查询: node <skill>/bin/wise-ppt.mjs layouts --layout-id ID"
    ],
    preflight: ["node <skill>/bin/wise-ppt.mjs preflight <deck-spec.json 绝对路径> --all-errors"],
    build: ["node <skill>/bin/wise-ppt.mjs build <deck-spec.json 绝对路径> --out <绝对目录>"],
    validate: ["node <skill>/bin/wise-ppt.mjs validate <绝对 deck 目录>"],
    themes: [
      "node <skill>/bin/wise-ppt.mjs themes resolve <theme.json 绝对路径>",
      "node <skill>/bin/wise-ppt.mjs themes preview <deck 绝对目录> --theme <theme.json 绝对路径> --out <绝对目录>"
    ],
    deliver: ["node <skill>/bin/wise-ppt.mjs deliver <绝对 deck 目录>"],
    experimental: [
      "node <skill>/bin/wise-ppt.mjs experimental prepare <standard 绝对目录> --out <experiment 绝对目录> (--page ID ... | --all-pages)",
      "node <skill>/bin/wise-ppt.mjs experimental build <experiment 绝对目录>",
      "node <skill>/bin/wise-ppt.mjs experimental validate <experiment 绝对目录>",
      "node <skill>/bin/wise-ppt.mjs experimental preview <experiment 绝对目录> [--open]",
      "node <skill>/bin/wise-ppt.mjs experimental deliver <experiment 绝对目录>"
    ]
  };
  return `用法:
  ${(lines[command] || []).join("\n  ")}
`;
}
function parseOptions(values, multiple = /* @__PURE__ */ new Set()) {
  const positionals = [];
  const options = {};
  for (let index = 0; index < values.length; index += 1) {
    const item = values[index];
    if (!item.startsWith("--")) {
      positionals.push(item);
      continue;
    }
    if (item === "--compact" || item === "--all-pages" || item === "--open" || item === "--new-session" || item === "--agent-brief" || item === "--all-errors") {
      options[item.slice(2)] = true;
      continue;
    }
    if (index + 1 >= values.length) throw new WisePPTError(`参数缺少值: ${item}`);
    const key = item.slice(2);
    const value = values[++index];
    if (multiple.has(key)) (options[key] ||= []).push(value);
    else if (key in options) throw new WisePPTError(`参数重复: ${item}`);
    else options[key] = value;
  }
  return { positionals, options };
}
function compactLayout(item) {
  const requiredSlots = (item.slots || []).filter((slot) => slot.required).map((slot) => ({
    slot_id: slot.slot_id,
    purpose: slot.purpose || "",
    visual_role: slot.visual_role || (slot.required ? "primary" : "support"),
    capacity: slot.capacity || {}
  }));
  return {
    layout_id: item.layout_id,
    display_code: item.display_code,
    page_kind: item.page_kind,
    page_role: item.page_role,
    page_roles: item.page_roles || [],
    relations: item.relations || [],
    allowed_payload_types: item.allowed_payload_types || [],
    name: item.name || item.display_code,
    description: item.description || "",
    structure_summary: item.structure_summary || `${requiredSlots.length} 个可填区`,
    leaf_count: Number.isInteger(item.leaf_count) ? item.leaf_count : requiredSlots.length,
    reading_order: item.reading_order || [],
    primary_units: item.capacity?.primary_units,
    emphasis: item.emphasis || { access: "none", targets: [] },
    icon_slots: item.icon_slots || [],
    required_slots: requiredSlots,
    usage_count: item.usage_count,
    last_sequence: item.last_sequence,
    selection_rank: item.selection_rank,
    requires_override_if_selected: item.requires_override_if_selected
  };
}
function parseLayoutUsageArgument(value, offset) {
  const parts = String(value).split(":");
  if (parts.length !== 3 || !parts[0] || !/^[1-9]\d*$/.test(parts[1]) || !/^[1-9]\d*$/.test(parts[2])) {
    throw new WisePPTError(`--layout-usage 第 ${offset + 1} 项必须是 <layout_id>:<正整数 count>:<正整数 last_sequence>`);
  }
  return {
    layout_id: parts[0],
    count: Number.parseInt(parts[1], 10),
    last_sequence: Number.parseInt(parts[2], 10)
  };
}
function parseNonnegativeIntegerArgument(value, label) {
  const raw = String(value);
  if (!/^(0|[1-9]\d*)$/.test(raw)) throw new WisePPTError(`${label} 必须是非负整数`);
  const parsed = Number(raw);
  if (!Number.isSafeInteger(parsed)) throw new WisePPTError(`${label} 必须是非负安全整数`);
  return parsed;
}
async function main(argv = process.argv.slice(2)) {
  const nodeMajor = Number.parseInt(process.versions.node.split(".")[0], 10);
  if (!SUPPORTED_NODE_MAJORS.includes(nodeMajor)) {
    throw new WisePPTError(`仅支持 Node 22/24 LTS，当前 ${process.version}`);
  }
  const root = runtimeRoot(import.meta.url);
  const [command, ...rest] = argv;
  if (!command) throw new WisePPTError(usage());
  if (command === "--help" || command === "-h") {
    process.stdout.write(`${usage()}
`);
    return;
  }
  if (rest.length === 1 && (rest[0] === "--help" || rest[0] === "-h") && ["doctor", "layouts", "preflight", "build", "validate", "themes", "deliver", "experimental"].includes(command)) {
    process.stdout.write(commandUsage(command));
    return;
  }
  if (command === "doctor") {
    if (rest.length) throw new WisePPTError(`doctor 不接受额外参数
${usage()}`);
    process.stdout.write(renderJson(await doctor(root)));
    return;
  }
  await verifyBundle(root);
  if (command === "layouts") {
    if (rest[0] === "plan") {
      if (rest.length === 2 && (rest[1] === "--help" || rest[1] === "-h")) {
        process.stdout.write(`用法:
  ${commandUsage("layouts").split("\n").find((line) => line.includes("整副规划:")).trim().replace("整副规划: ", "")}
`);
        return;
      }
      const { positionals: positionals2, options: options2 } = parseOptions(rest.slice(1));
      const allowed2 = /* @__PURE__ */ new Set(["agent-brief", "new-session"]);
      const unknown2 = Object.keys(options2).filter((key) => !allowed2.has(key));
      if (positionals2.length !== 1 || unknown2.length || options2["agent-brief"] !== true) {
        throw new WisePPTError(`layouts plan 参数错误
${commandUsage("layouts")}`);
      }
      const requestPath = assertAbsolute(positionals2[0], "layout plan 输入");
      await assertNoSymlinkComponents(requestPath, "layout plan 输入");
      const request = await readJson(requestPath, "layout plan");
      const state2 = await registryState(root);
      const result = planLayouts(state2.registry, request, {
        newSelectionSeed: options2["new-session"] ? randomBytes(16).toString("hex") : void 0
      });
      process.stdout.write(renderJson({
        format: LAYOUT_AGENT_BRIEF_FORMAT,
        registry_sha256: state2.sha256,
        ...result
      }));
      if (result.status !== "pass") process.exitCode = 1;
      return;
    }
    const { positionals, options } = parseOptions(rest, /* @__PURE__ */ new Set(["requires", "layout-usage"]));
    if (positionals.length) throw new WisePPTError(`layouts 不接受位置参数: ${positionals.join(" ")}`);
    const allowed = /* @__PURE__ */ new Set(["layout-id", "page-kind", "page-role", "relation-key", "requires", "content-items", "layout-usage", "selection-seed", "new-session", "compact"]);
    const unknown = Object.keys(options).filter((key) => !allowed.has(key));
    if (unknown.length) throw new WisePPTError(`layouts 含未登记参数: ${unknown.join(", ")}`);
    const contentItems = options["content-items"] === void 0 ? void 0 : parseNonnegativeIntegerArgument(options["content-items"], "--content-items");
    const state = await registryState(root);
    const layoutUsage = (options["layout-usage"] || []).map(parseLayoutUsageArgument);
    const detailOnly = Boolean(options["layout-id"]);
    const newSession = options["new-session"] === true;
    if (detailOnly && (newSession || options["selection-seed"] !== void 0 || layoutUsage.length)) {
      throw new WisePPTError("单骨架详情查询不得传 --new-session、--selection-seed 或 --layout-usage");
    }
    if (!detailOnly && newSession && options["selection-seed"] !== void 0) throw new WisePPTError("--new-session 与 --selection-seed 不能同时使用");
    if (!detailOnly && newSession && layoutUsage.length) throw new WisePPTError("--new-session 必须从空 usage 开始");
    if (!detailOnly && !newSession && options["selection-seed"] === void 0) throw new WisePPTError("候选查询必须传 --new-session 或 --selection-seed");
    const selectionSeed = detailOnly ? null : newSession ? randomBytes(16).toString("hex") : options["selection-seed"];
    const normalizedUsage = normalizeLayoutUsage(state.registry, layoutUsage);
    const filters = {
      layoutId: options["layout-id"],
      pageKind: options["page-kind"],
      pageRole: options["page-role"],
      relationKey: options["relation-key"],
      requires: options.requires || [],
      contentItems,
      layoutUsage: normalizedUsage.usage,
      selectionSeed: selectionSeed ?? void 0
    };
    const matches = queryLayouts(state.registry, filters);
    const rankingPool = detailOnly || contentItems === void 0 ? matches : queryLayouts(state.registry, { ...filters, contentItems: void 0 });
    process.stdout.write(renderJson({
      format: LAYOUT_QUERY_FORMAT,
      registry_sha256: state.sha256,
      filters: { layout_id: filters.layoutId ?? null, page_kind: filters.pageKind ?? null, page_role: filters.pageRole ?? null, relation_key: filters.relationKey ?? null, requires: filters.requires, content_items: filters.contentItems ?? null },
      layout_context: detailOnly ? null : { scope: "session", selection_seed: selectionSeed, prior_total: normalizedUsage.prior_total, usage: normalizedUsage.usage },
      selection: {
        mode: detailOnly ? "layout-detail" : "candidate-ranking",
        state: detailOnly ? null : matches.length ? layoutSelectionState(rankingPool) : "no-candidate",
        order_basis: detailOnly ? [] : ["usage-count-asc", "last-sequence-asc", "session-seed-hash", "registry-order"],
        seed_source: detailOnly ? null : newSession ? "generated" : "provided",
        preferred_layout_id: detailOnly ? null : rankingPool[0]?.layout_id ?? null,
        note: detailOnly ? "单骨架详情不代表候选决策，selection_rank 不适用。" : "新聊天只随机生成一次 seed；同一 seed 与 usage 下顺序可复现。content-items 只隐藏不适配项，不重排权威 rank；rank>1 需 override。"
      },
      count: matches.length,
      layouts: options.compact ? matches.map(compactLayout) : matches
    }));
    return;
  }
  if (command === "preflight") {
    const { positionals, options } = parseOptions(rest);
    if (positionals.length !== 1 || options["all-errors"] !== true || Object.keys(options).some((key) => key !== "all-errors")) {
      throw new WisePPTError(`preflight 参数错误
${commandUsage("preflight")}`);
    }
    const specPath = assertAbsolute(positionals[0], "preflight 输入");
    await assertNoSymlinkComponents(specPath, "preflight 输入");
    const spec = await readJson(specPath, "deck-spec");
    const state = await registryState(root);
    const result = await preflightSpec(root, spec, state.index);
    process.stdout.write(renderJson({
      format: PREFLIGHT_REPORT_FORMAT,
      registry_sha256: state.sha256,
      checks: { browser_started: false, files_written: 0, fonts_copied: 0 },
      ...result
    }));
    if (result.status !== "pass") process.exitCode = 1;
    return;
  }
  if (command === "build") {
    const { positionals, options } = parseOptions(rest);
    if (positionals.length !== 1 || !options.out || Object.keys(options).some((key) => key !== "out")) throw new WisePPTError(`build 参数错误
${usage()}`);
    const result = await buildAndPublish(root, positionals[0], options.out);
    process.stdout.write(`BUILT Wise PPT pages=${result.manifest.page_count} build_id=${result.manifest.build_id} out=${result.output}
`);
    return;
  }
  if (command === "validate") {
    if (rest.length !== 1) throw new WisePPTError(`validate 参数错误
${usage()}`);
    const result = await validateDeck(root, rest[0]);
    process.stdout.write(`PASS Wise PPT validate pages=${result.page_count} build_id=${result.build_id} forbidden=0 registry=75+13=88
`);
    return;
  }
  if (command === "themes") {
    const [action, ...themeArgs] = rest;
    if (action === "resolve") {
      if (themeArgs.length !== 1) throw new WisePPTError(`themes resolve 参数错误
${commandUsage("themes")}`);
      const themePath = assertAbsolute(themeArgs[0], "theme 输入");
      await assertNoSymlinkComponents(themePath, "theme 输入");
      process.stdout.write(renderJson(resolveTheme(await readJson(themePath, "theme"))));
      return;
    }
    if (action === "preview") {
      const { positionals, options } = parseOptions(themeArgs);
      const unknown = Object.keys(options).filter((key) => !["theme", "out"].includes(key));
      if (positionals.length !== 1 || !options.theme || !options.out || unknown.length) throw new WisePPTError(`themes preview 参数错误
${commandUsage("themes")}`);
      const themePath = assertAbsolute(options.theme, "theme 输入");
      await assertNoSymlinkComponents(themePath, "theme 输入");
      const result = await createThemePreview(root, positionals[0], await readJson(themePath, "theme"), options.out);
      process.stdout.write(`BUILT Wise PPT theme preview theme=${result.resolved.theme_id} compatibility=${result.manifest.source.compatibility} out=${result.output}
`);
      return;
    }
    throw new WisePPTError(`themes 子命令错误
${commandUsage("themes")}`);
  }
  if (command === "deliver") {
    if (rest.length !== 1) throw new WisePPTError(`deliver 参数错误
${usage()}`);
    const result = await deliverStandard(root, rest[0]);
    process.stdout.write(`PASS Wise PPT pdf=${result.pdf} manifest=${result.manifest}
`);
    return;
  }
  if (command === "experimental") {
    const module = await import("./experimental.mjs");
    await module.runExperimental(root, rest);
    return;
  }
  throw new WisePPTError(`未知命令: ${command}
${usage()}`);
}
main().catch((error) => {
  process.stderr.write(`FAIL Wise PPT: ${error.message}
`);
  process.exitCode = 1;
});
