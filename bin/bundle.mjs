import path from "node:path";
import { collectFiles, exists, readJson, shaFile, WisePPTError } from "./common.mjs";
function isGitMetadata(relative) {
  return relative === ".git" || relative.startsWith(".git/");
}
async function verifyBundle(root) {
  const manifestPath = path.join(root, "bundle-manifest.json");
  if (!await exists(manifestPath)) {
    if (await exists(path.join(root, ".git"))) return { mode: "development", source_commit: null, files: 0 };
    throw new WisePPTError("\u7F3A\u5C11 bundle-manifest.json\uFF1A\u5F53\u524D\u76EE\u5F55\u4E0D\u662F\u5B8C\u6574 Wise PPT \u53D1\u5E03\u5305");
  }
  const manifest = await readJson(manifestPath, "bundle-manifest");
  if (manifest.format !== "wise-ppt-skill-bundle@2" || JSON.stringify(manifest.node?.supported_majors) !== JSON.stringify([22, 24]) || !Array.isArray(manifest.files) || !manifest.files.length) throw new WisePPTError("bundle-manifest \u5408\u540C\u9519\u8BEF");
  const seen = /* @__PURE__ */ new Set();
  for (const [offset, record] of manifest.files.entries()) {
    const label = `bundle-manifest.files[${offset + 1}]`;
    if (!record || typeof record !== "object" || Object.keys(record).sort().join(",") !== "bytes,path,sha256") throw new WisePPTError(`${label} \u5B57\u6BB5\u975E\u6CD5`);
    const relative = record.path;
    if (typeof relative !== "string" || !relative || relative.startsWith("/") || relative.includes("\\") || relative.split("/").some((part) => ["", ".", ".."].includes(part)) || seen.has(relative)) throw new WisePPTError(`${label}.path \u975E\u6CD5\u6216\u91CD\u590D`);
    seen.add(relative);
    const target = path.join(root, ...relative.split("/"));
    const digest = await shaFile(target).catch(() => null);
    if (!digest || digest.sha256 !== record.sha256 || digest.bytes !== record.bytes) throw new WisePPTError(`Wise PPT \u53D1\u5E03\u5305\u6587\u4EF6\u7F3A\u5931\u6216\u6F02\u79FB: ${relative}`);
  }
  const actual = (await collectFiles(root, {
    includeHidden: true,
    exclude: (relative) => relative === "bundle-manifest.json" || isGitMetadata(relative)
  })).sort();
  const expected = [...seen].sort();
  if (actual.length !== expected.length || actual.some((item, index) => item !== expected[index])) {
    throw new WisePPTError("Wise PPT \u53D1\u5E03\u5305\u6587\u4EF6\u96C6\u5408\u4E0E bundle-manifest \u4E0D\u4E00\u81F4");
  }
  return { mode: "release", source_commit: manifest.source_commit, files: manifest.files.length };
}
export {
  verifyBundle
};
