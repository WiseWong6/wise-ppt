#!/usr/bin/env node
import path from "node:path";
import { SUPPORTED_NODE_MAJORS } from "./constants.mjs";
import { renderJson, runtimeRoot, WisePPTError } from "./common.mjs";
import { verifyBundle } from "./bundle.mjs";
import { doctor } from "./doctor.mjs";
import { deliverStandard } from "./deliver.mjs";
import { buildAndPublish, queryLayouts, registryState, validateDeck } from "./standard.mjs";
function usage() {
  return [
    "\u7528\u6CD5:",
    "  node <skill>/bin/wise-ppt.mjs doctor",
    "  node <skill>/bin/wise-ppt.mjs layouts [filters]",
    "  node <skill>/bin/wise-ppt.mjs build <deck-spec.json> --out <\u7EDD\u5BF9\u76EE\u5F55>",
    "  node <skill>/bin/wise-ppt.mjs validate <\u7EDD\u5BF9 deck \u76EE\u5F55>",
    "  node <skill>/bin/wise-ppt.mjs deliver <\u7EDD\u5BF9 deck \u76EE\u5F55>",
    "  node <skill>/bin/wise-ppt.mjs experimental <prepare|build|validate|preview|deliver> ..."
  ].join("\n");
}
function commandUsage(command) {
  const lines = {
    doctor: ["node <skill>/bin/wise-ppt.mjs doctor"],
    layouts: ["node <skill>/bin/wise-ppt.mjs layouts [--layout-id ID] [--page-kind KIND] [--page-role ROLE] [--relation-key KEY] [--requires TYPE] [--content-items N] [--compact]"],
    build: ["node <skill>/bin/wise-ppt.mjs build <deck-spec.json \u7EDD\u5BF9\u8DEF\u5F84> --out <\u7EDD\u5BF9\u76EE\u5F55>"],
    validate: ["node <skill>/bin/wise-ppt.mjs validate <\u7EDD\u5BF9 deck \u76EE\u5F55>"],
    deliver: ["node <skill>/bin/wise-ppt.mjs deliver <\u7EDD\u5BF9 deck \u76EE\u5F55>"],
    experimental: [
      "node <skill>/bin/wise-ppt.mjs experimental prepare <standard \u7EDD\u5BF9\u76EE\u5F55> --out <experiment \u7EDD\u5BF9\u76EE\u5F55> (--page ID ... | --all-pages)",
      "node <skill>/bin/wise-ppt.mjs experimental build <experiment \u7EDD\u5BF9\u76EE\u5F55>",
      "node <skill>/bin/wise-ppt.mjs experimental validate <experiment \u7EDD\u5BF9\u76EE\u5F55>",
      "node <skill>/bin/wise-ppt.mjs experimental preview <experiment \u7EDD\u5BF9\u76EE\u5F55> [--open]",
      "node <skill>/bin/wise-ppt.mjs experimental deliver <experiment \u7EDD\u5BF9\u76EE\u5F55>"
    ]
  };
  return `\u7528\u6CD5:
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
    if (item === "--compact" || item === "--all-pages" || item === "--open") {
      options[item.slice(2)] = true;
      continue;
    }
    if (index + 1 >= values.length) throw new WisePPTError(`\u53C2\u6570\u7F3A\u5C11\u503C: ${item}`);
    const key = item.slice(2);
    const value = values[++index];
    if (multiple.has(key)) (options[key] ||= []).push(value);
    else if (key in options) throw new WisePPTError(`\u53C2\u6570\u91CD\u590D: ${item}`);
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
    structure_summary: item.structure_summary || `${requiredSlots.length} \u4E2A\u53EF\u586B\u533A`,
    leaf_count: Number.isInteger(item.leaf_count) ? item.leaf_count : requiredSlots.length,
    reading_order: item.reading_order || [],
    primary_units: item.capacity?.primary_units,
    required_slots: requiredSlots
  };
}
async function main(argv = process.argv.slice(2)) {
  const nodeMajor = Number.parseInt(process.versions.node.split(".")[0], 10);
  if (!SUPPORTED_NODE_MAJORS.includes(nodeMajor)) {
    throw new WisePPTError(`\u4EC5\u652F\u6301 Node 22/24 LTS\uFF0C\u5F53\u524D ${process.version}`);
  }
  const root = runtimeRoot(import.meta.url);
  const [command, ...rest] = argv;
  if (!command) throw new WisePPTError(usage());
  if (command === "--help" || command === "-h") {
    process.stdout.write(`${usage()}
`);
    return;
  }
  if (rest.length === 1 && (rest[0] === "--help" || rest[0] === "-h") && ["doctor", "layouts", "build", "validate", "deliver", "experimental"].includes(command)) {
    process.stdout.write(commandUsage(command));
    return;
  }
  if (command === "doctor") {
    if (rest.length) throw new WisePPTError(`doctor \u4E0D\u63A5\u53D7\u989D\u5916\u53C2\u6570
${usage()}`);
    process.stdout.write(renderJson(await doctor(root)));
    return;
  }
  await verifyBundle(root);
  if (command === "layouts") {
    const { positionals, options } = parseOptions(rest, /* @__PURE__ */ new Set(["requires"]));
    if (positionals.length) throw new WisePPTError(`layouts \u4E0D\u63A5\u53D7\u4F4D\u7F6E\u53C2\u6570: ${positionals.join(" ")}`);
    const allowed = /* @__PURE__ */ new Set(["layout-id", "page-kind", "page-role", "relation-key", "requires", "content-items", "compact"]);
    const unknown = Object.keys(options).filter((key) => !allowed.has(key));
    if (unknown.length) throw new WisePPTError(`layouts \u542B\u672A\u767B\u8BB0\u53C2\u6570: ${unknown.join(", ")}`);
    const contentItems = options["content-items"] === void 0 ? void 0 : Number.parseInt(options["content-items"], 10);
    if (contentItems !== void 0 && (!Number.isInteger(contentItems) || contentItems < 0)) throw new WisePPTError("--content-items \u5FC5\u987B\u662F\u975E\u8D1F\u6574\u6570");
    const state = await registryState(root);
    const filters = {
      layoutId: options["layout-id"],
      pageKind: options["page-kind"],
      pageRole: options["page-role"],
      relationKey: options["relation-key"],
      requires: options.requires || [],
      contentItems
    };
    const matches = queryLayouts(state.registry, filters);
    process.stdout.write(renderJson({
      format: "wise-ppt-layout-query@1",
      registry_sha256: state.sha256,
      filters: { layout_id: filters.layoutId ?? null, page_kind: filters.pageKind ?? null, page_role: filters.pageRole ?? null, relation_key: filters.relationKey ?? null, requires: filters.requires, content_items: filters.contentItems ?? null },
      count: matches.length,
      layouts: options.compact ? matches.map(compactLayout) : matches
    }));
    return;
  }
  if (command === "build") {
    const { positionals, options } = parseOptions(rest);
    if (positionals.length !== 1 || !options.out || Object.keys(options).some((key) => key !== "out")) throw new WisePPTError(`build \u53C2\u6570\u9519\u8BEF
${usage()}`);
    const result = await buildAndPublish(root, positionals[0], options.out);
    process.stdout.write(`BUILT Wise PPT pages=${result.manifest.page_count} build_id=${result.manifest.build_id} out=${result.output}
`);
    return;
  }
  if (command === "validate") {
    if (rest.length !== 1) throw new WisePPTError(`validate \u53C2\u6570\u9519\u8BEF
${usage()}`);
    const result = await validateDeck(root, rest[0]);
    process.stdout.write(`PASS Wise PPT validate pages=${result.page_count} build_id=${result.build_id} forbidden=0 registry=71+12=83
`);
    return;
  }
  if (command === "deliver") {
    if (rest.length !== 1) throw new WisePPTError(`deliver \u53C2\u6570\u9519\u8BEF
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
  throw new WisePPTError(`\u672A\u77E5\u547D\u4EE4: ${command}
${usage()}`);
}
main().catch((error) => {
  process.stderr.write(`FAIL Wise PPT: ${error.message}
`);
  process.exitCode = 1;
});
