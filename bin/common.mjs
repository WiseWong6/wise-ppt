import { createHash } from "node:crypto";
import { constants as fsConstants } from "node:fs";
import {
  access,
  copyFile,
  lstat,
  mkdir,
  open,
  readFile,
  readdir,
  rename,
  rm,
  stat,
  writeFile
} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
class WisePPTError extends Error {
  constructor(message) {
    super(message);
    this.name = "WisePPTError";
  }
}
function runtimeRoot(metaUrl = import.meta.url) {
  const current = path.dirname(fileURLToPath(metaUrl));
  if (path.basename(current) === "bin") return path.dirname(current);
  return path.resolve(current, "..", "..");
}
function sha256Bytes(value) {
  return createHash("sha256").update(value).digest("hex");
}
function sha256Text(value) {
  return sha256Bytes(Buffer.from(value, "utf8"));
}
async function shaFile(filePath) {
  const bytes = await readFile(filePath);
  return { sha256: sha256Bytes(bytes), bytes: bytes.length };
}
function canonicalJson(value) {
  if (value === void 0) return "null";
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}
function renderJson(value) {
  return `${JSON.stringify(sortKeysDeep(value), null, 2)}
`;
}
function sortKeysDeep(value) {
  if (Array.isArray(value)) return value.map(sortKeysDeep);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, sortKeysDeep(value[key])]));
  }
  return value;
}
async function readText(filePath, label = path.basename(filePath)) {
  try {
    return await readFile(filePath, "utf8");
  } catch (error) {
    throw new WisePPTError(`\u65E0\u6CD5\u8BFB\u53D6${label}: ${filePath}: ${error.message}`);
  }
}
async function readJson(filePath, label = path.basename(filePath)) {
  let value;
  try {
    value = JSON.parse(await readFile(filePath, "utf8"));
  } catch (error) {
    throw new WisePPTError(`${label} \u4E0D\u662F\u5408\u6CD5 JSON: ${filePath}: ${error.message}`);
  }
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new WisePPTError(`${label} \u9876\u5C42\u5FC5\u987B\u662F JSON object`);
  }
  assertFiniteNumbers(value, label);
  return value;
}
function assertFiniteNumbers(value, label) {
  if (typeof value === "number" && !Number.isFinite(value)) {
    throw new WisePPTError(`${label} \u542B NaN/Infinity \u975E\u6709\u9650\u6570\u5B57`);
  }
  if (Array.isArray(value)) value.forEach((item, index) => assertFiniteNumbers(item, `${label}[${index}]`));
  else if (value && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) assertFiniteNumbers(child, `${label}.${key}`);
  }
}
function assertAbsolute(raw, label) {
  const expanded = raw.startsWith("~/") ? path.join(os.homedir(), raw.slice(2)) : raw;
  if (!path.isAbsolute(expanded)) throw new WisePPTError(`${label}\u5FC5\u987B\u662F\u7EDD\u5BF9\u8DEF\u5F84`);
  return path.resolve(expanded);
}
async function assertNoSymlinkComponents(target, label) {
  const absolute = path.resolve(target);
  const parsed = path.parse(absolute);
  let current = parsed.root;
  for (const part of absolute.slice(parsed.root.length).split(path.sep).filter(Boolean)) {
    current = path.join(current, part);
    const info = await lstat(current).catch(() => null);
    if (info?.isSymbolicLink()) throw new WisePPTError(`${label} \u8DEF\u5F84\u7981\u6B62\u7B26\u53F7\u94FE\u63A5: ${current}`);
    if (!info) break;
  }
}
async function copyFileSafe(source, target) {
  await mkdir(path.dirname(target), { recursive: true });
  await copyFile(source, target);
}
async function atomicWrite(target, payload) {
  await mkdir(path.dirname(target), { recursive: true });
  const temporary = `${target}.tmp-${process.pid}-${Date.now()}`;
  try {
    const handle = await open(temporary, "wx", 384);
    try {
      await handle.writeFile(payload);
      await handle.sync();
    } finally {
      await handle.close();
    }
    await rename(temporary, target);
  } finally {
    await rm(temporary, { force: true }).catch(() => {
    });
  }
}
async function collectFiles(root, options = {}) {
  const { includeHidden = false, exclude = () => false } = options;
  const files = [];
  async function visit(current) {
    const entries = await readdir(current, { withFileTypes: true });
    entries.sort((a, b) => a.name.localeCompare(b.name, "en"));
    for (const entry of entries) {
      const absolute = path.join(current, entry.name);
      const relative = path.relative(root, absolute).split(path.sep).join("/");
      if (!includeHidden && entry.name.startsWith(".") || exclude(relative, entry)) continue;
      if (entry.isSymbolicLink()) throw new WisePPTError(`\u7981\u6B62\u7B26\u53F7\u94FE\u63A5: ${relative}`);
      if (entry.isDirectory()) await visit(absolute);
      else if (entry.isFile()) files.push(relative);
      else throw new WisePPTError(`\u4E0D\u652F\u6301\u7684\u6587\u4EF6\u7C7B\u578B: ${relative}`);
    }
  }
  await visit(root);
  return files;
}
async function fileRecord(root, relative) {
  const digest = await shaFile(path.join(root, relative));
  return { path: relative.split(path.sep).join("/"), ...digest };
}
async function writableDirectory(directory) {
  await mkdir(directory, { recursive: true });
  await access(directory, fsConstants.W_OK);
  const probe = path.join(directory, `.wise-ppt-write-${process.pid}-${Date.now()}`);
  await writeFile(probe, "ok", { flag: "wx" });
  await rm(probe, { force: true });
  return directory;
}
async function exists(filePath) {
  return stat(filePath).then(() => true, () => false);
}
function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
export {
  WisePPTError,
  assertAbsolute,
  assertFiniteNumbers,
  assertNoSymlinkComponents,
  atomicWrite,
  canonicalJson,
  collectFiles,
  copyFileSafe,
  exists,
  fileRecord,
  readJson,
  readText,
  renderJson,
  runtimeRoot,
  sha256Bytes,
  sha256Text,
  shaFile,
  sleep,
  sortKeysDeep,
  writableDirectory
};
