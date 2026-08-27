import { copyFile, mkdir, open, readdir, rename, rm, stat, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import os from "node:os";
import path from "node:path";
import { shaFile, readJson, WisePPTError } from "./common.mjs";
async function loadFontManifest(root) {
  const manifestPath = path.join(root, "themes/paper-ink/assets/fonts/font-manifest.json");
  const manifest = await readJson(manifestPath, "font-manifest");
  if (manifest.contract_version !== 4 || !Array.isArray(manifest.fonts) || !manifest.fonts.length) {
    throw new WisePPTError("font-manifest \u5408\u540C\u9519\u8BEF");
  }
  for (const font of manifest.fonts) {
    if (!font.filename || !Array.isArray(font.system_filenames) || !font.system_filenames.length || !Array.isArray(font.system_family_names) || !font.system_family_names.length || !Number.isInteger(font.weight) || font.weight < 100 || font.weight > 900) {
      throw new WisePPTError(`font-manifest \u5B57\u4F53\u5BB6\u65CF\u6216\u5B57\u91CD\u9519\u8BEF: ${font.filename || "unknown"}`);
    }
  }
  const digest = (await shaFile(manifestPath)).sha256;
  return { manifest, manifestPath, digest };
}
function fontCacheRoot(manifestDigest, env = process.env, platform = process.platform) {
  let base;
  if (platform === "darwin") base = path.join(os.homedir(), "Library", "Caches", "wise-ppt", "fonts");
  else if (platform === "win32") {
    const local = env.LOCALAPPDATA;
    if (!local) throw new WisePPTError("Windows \u7F3A\u5C11 LOCALAPPDATA\uFF0C\u65E0\u6CD5\u786E\u5B9A Wise PPT \u5B57\u4F53\u7F13\u5B58");
    base = path.join(local, "WisePPT", "Cache", "fonts");
  } else throw new WisePPTError(`Wise PPT \u4EC5\u652F\u6301 macOS \u548C Windows\uFF0C\u5F53\u524D\u5E73\u53F0\uFF1A${platform}`);
  return path.join(base, manifestDigest);
}
function systemFontDirectories(env = process.env, platform = process.platform) {
  if (platform === "darwin") {
    return [path.join(os.homedir(), "Library", "Fonts"), "/Library/Fonts", "/System/Library/Fonts"];
  }
  if (platform === "win32") {
    return [
      env.WINDIR ? path.join(env.WINDIR, "Fonts") : null,
      env.LOCALAPPDATA ? path.join(env.LOCALAPPDATA, "Microsoft", "Windows", "Fonts") : null
    ].filter(Boolean);
  }
  throw new WisePPTError(`Wise PPT \u4EC5\u652F\u6301 macOS \u548C Windows\uFF0C\u5F53\u524D\u5E73\u53F0\uFF1A${platform}`);
}
async function collectFontFiles(root, output, depth = 0) {
  if (depth > 8) return;
  const entries = await readdir(root, { withFileTypes: true }).catch(() => []);
  for (const entry of entries) {
    if (entry.isFile() && /\.(?:otf|ttf|ttc)$/i.test(entry.name)) output.push(path.join(root, entry.name));
  }
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    await collectFontFiles(path.join(root, entry.name), output, depth + 1);
  }
}
function normalizedFontLabel(value) {
  return String(value || "").toLocaleLowerCase("en-US").replace(/\([^)]*\)/g, " ").replace(/[^\p{L}\p{N}]+/gu, " ").trim();
}
function systemFontLabelMatches(font, label) {
  const normalized = normalizedFontLabel(label);
  const family = font.system_family_names.some((name) => normalized.includes(normalizedFontLabel(name)));
  if (!family) return false;
  const styles = {
    300: ["light"],
    400: ["regular", "normal"],
    500: ["medium"],
    700: ["bold"]
  }[font.weight] || [String(font.weight)];
  if (styles.some((style) => normalized.includes(style))) return true;
  if (font.weight !== 400) return false;
  return !/(?:thin|light|medium|semibold|demibold|bold|black|heavy)/.test(normalized);
}
function decodeFontName(bytes, platformId) {
  if (platformId === 0 || platformId === 3) {
    let output = "";
    for (let offset = 0; offset + 1 < bytes.length; offset += 2) {
      output += String.fromCharCode(bytes.readUInt16BE(offset));
    }
    return output.replaceAll("\0", "").trim();
  }
  return bytes.toString("latin1").replaceAll("\0", "").trim();
}
async function readAt(handle, length, position) {
  const bytes = Buffer.alloc(length);
  const { bytesRead } = await handle.read(bytes, 0, length, position);
  if (bytesRead !== length) throw new Error("\u5B57\u4F53\u8868\u5DF2\u622A\u65AD");
  return bytes;
}
async function sfntFaceOffsets(handle) {
  const header = await readAt(handle, 12, 0);
  if (header.toString("ascii", 0, 4) !== "ttcf") return [0];
  const count = header.readUInt32BE(8);
  if (!count || count > 256) throw new Error("TTC face \u6570\u91CF\u975E\u6CD5");
  const offsets = await readAt(handle, count * 4, 12);
  return Array.from({ length: count }, (_unused, index) => offsets.readUInt32BE(index * 4));
}
async function readSfntFace(handle, faceOffset) {
  const header = await readAt(handle, 12, faceOffset);
  const signature = header.toString("ascii", 0, 4);
  if (!["OTTO", "true", "typ1"].includes(signature) && header.readUInt32BE(0) !== 65536) return null;
  const tableCount = header.readUInt16BE(4);
  if (!tableCount || tableCount > 512) return null;
  const directory = await readAt(handle, tableCount * 16, faceOffset + 12);
  const tables = /* @__PURE__ */ new Map();
  for (let index = 0; index < tableCount; index += 1) {
    const offset = index * 16;
    tables.set(directory.toString("ascii", offset, offset + 4), {
      offset: directory.readUInt32BE(offset + 8),
      length: directory.readUInt32BE(offset + 12)
    });
  }
  const name = tables.get("name");
  if (!name || name.length < 6 || name.length > 4 * 1024 * 1024) return null;
  const nameBytes = await readAt(handle, name.length, name.offset);
  const count = nameBytes.readUInt16BE(2);
  const strings = nameBytes.readUInt16BE(4);
  if (6 + count * 12 > nameBytes.length) return null;
  const values = /* @__PURE__ */ new Map();
  for (let index = 0; index < count; index += 1) {
    const offset = 6 + index * 12;
    const platformId = nameBytes.readUInt16BE(offset);
    const languageId = nameBytes.readUInt16BE(offset + 4);
    const nameId = nameBytes.readUInt16BE(offset + 6);
    if (![1, 2, 16, 17].includes(nameId)) continue;
    const length = nameBytes.readUInt16BE(offset + 8);
    const stringOffset = strings + nameBytes.readUInt16BE(offset + 10);
    if (stringOffset + length > nameBytes.length) continue;
    const value = decodeFontName(nameBytes.subarray(stringOffset, stringOffset + length), platformId);
    if (!value) continue;
    const priority = (platformId === 3 ? 4 : platformId === 0 ? 3 : 1) + ([1033, 0].includes(languageId) ? 1 : 0);
    const current = values.get(nameId);
    if (!current || priority > current.priority) values.set(nameId, { value, priority });
  }
  const os2 = tables.get("OS/2");
  let weight = null;
  if (os2?.length >= 6) weight = (await readAt(handle, 2, os2.offset + 4)).readUInt16BE(0);
  return {
    family: values.get(16)?.value || values.get(1)?.value || "",
    style: values.get(17)?.value || values.get(2)?.value || "",
    weight
  };
}
async function readSfntFaces(file) {
  const handle = await open(file, "r").catch(() => null);
  if (!handle) return [];
  try {
    const offsets = await sfntFaceOffsets(handle);
    const faces = [];
    for (const offset of offsets) {
      const face = await readSfntFace(handle, offset).catch(() => null);
      if (face) faces.push(face);
    }
    return faces;
  } catch {
    return [];
  } finally {
    await handle.close().catch(() => {
    });
  }
}
function systemFontFaceMatches(font, face) {
  const family = normalizedFontLabel(face.family);
  if (!font.system_family_names.some((name) => family === normalizedFontLabel(name))) return false;
  if (Number.isInteger(face.weight)) return face.weight === font.weight;
  return systemFontLabelMatches(font, `${face.family} ${face.style}`);
}
async function windowsRegistryFont(font, env) {
  const roots = [
    "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Fonts",
    "HKCU\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Fonts"
  ];
  for (const registryRoot of roots) {
    const result = spawnSync("reg.exe", ["query", registryRoot], { encoding: "utf8", windowsHide: true, timeout: 15e3 });
    if (result.status !== 0) continue;
    for (const line of String(result.stdout || "").split(/\r?\n/)) {
      const match = line.match(/^\s*(.*?)\s+REG_(?:EXPAND_)?SZ\s+(.+?)\s*$/i);
      if (!match || !systemFontLabelMatches(font, match[1])) continue;
      const raw = match[2].replace(/%([^%]+)%/g, (_whole, key) => env[key] || env[key.toUpperCase()] || "");
      const candidates = path.isAbsolute(raw) ? [raw] : [
        env.WINDIR ? path.join(env.WINDIR, "Fonts", raw) : null,
        env.LOCALAPPDATA ? path.join(env.LOCALAPPDATA, "Microsoft", "Windows", "Fonts", raw) : null
      ].filter(Boolean);
      for (const candidate of candidates) {
        const info = await stat(candidate).catch(() => null);
        if (info?.isFile()) return candidate;
      }
    }
  }
  return null;
}
async function matchingSystemFonts(fonts, directories, options = {}) {
  const files = [];
  for (const directory of directories) await collectFontFiles(directory, files);
  const uniqueFiles = [...new Set(files)];
  const byFilename = new Map(uniqueFiles.map((file) => [path.basename(file).toLocaleLowerCase("en-US"), file]));
  const matches = /* @__PURE__ */ new Map();
  for (const font of fonts) {
    const candidate = (font.system_filenames || [font.filename]).map((name) => byFilename.get(name.toLocaleLowerCase("en-US"))).find(Boolean);
    if (candidate) matches.set(font.filename, candidate);
  }
  if ((options.platform || process.platform) === "win32") {
    for (const font of fonts) {
      if (matches.has(font.filename)) continue;
      const candidate = await windowsRegistryFont(font, options.env || process.env);
      if (candidate) matches.set(font.filename, candidate);
    }
  }
  const unresolved = fonts.filter((font) => !matches.has(font.filename));
  if (!unresolved.length) return matches;
  for (const file of uniqueFiles) {
    const faces = await readSfntFaces(file);
    for (const font of unresolved) {
      if (!matches.has(font.filename) && faces.some((face) => systemFontFaceMatches(font, face))) {
        matches.set(font.filename, file);
      }
    }
    if (unresolved.every((font) => matches.has(font.filename))) break;
  }
  return matches;
}
async function downloadFont(font, target, { retries = 2, timeoutMs = 6e5, fetchImpl = globalThis.fetch } = {}) {
  await mkdir(path.dirname(target), { recursive: true });
  const errors = [];
  for (const url of font.urls || []) {
    for (let attempt = 1; attempt <= retries + 1; attempt += 1) {
      const temporary = `${target}.part-${process.pid}-${Date.now()}`;
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), timeoutMs);
        try {
          const response = await fetchImpl(url, { redirect: "follow", signal: controller.signal });
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          const bytes = Buffer.from(await response.arrayBuffer());
          await writeFile(temporary, bytes, { flag: "wx" });
        } finally {
          clearTimeout(timer);
        }
        const digest = await shaFile(temporary);
        if (digest.sha256 !== font.sha256) throw new Error(`SHA-256 ${digest.sha256} != ${font.sha256}`);
        await rename(temporary, target);
        return target;
      } catch (error) {
        errors.push(`${url} [${attempt}/${retries + 1}]: ${error.message}`);
      } finally {
        await rm(temporary, { force: true }).catch(() => {
        });
      }
    }
  }
  throw new WisePPTError(`${font.filename} \u6240\u6709\u4E0B\u8F7D\u6E90\u5747\u5931\u8D25\uFF1A${errors.join("\uFF1B")}`);
}
async function inspectFonts(root, options = {}) {
  const { manifest, digest } = await loadFontManifest(root);
  const cacheRoot = fontCacheRoot(digest, options.env, options.platform);
  const directories = options.systemDirectories ?? systemFontDirectories(options.env, options.platform);
  const cacheDigests = /* @__PURE__ */ new Map();
  for (const font of manifest.fonts) {
    cacheDigests.set(font.filename, await shaFile(path.join(cacheRoot, font.filename)).catch(() => null));
  }
  const unresolved = manifest.fonts.filter((font) => cacheDigests.get(font.filename)?.sha256 !== font.sha256);
  const systemMatches = await matchingSystemFonts(unresolved, directories, options);
  const records = [];
  for (const font of manifest.fonts) {
    const cachePath = path.join(cacheRoot, font.filename);
    const identity = { filename: font.filename, family: font.system_family_names[0], weight: font.weight };
    const cacheDigest = cacheDigests.get(font.filename);
    if (cacheDigest?.sha256 === font.sha256) {
      records.push({ ...identity, status: "cache", path: cachePath, sha256: font.sha256 });
      continue;
    }
    const systemPath = systemMatches.get(font.filename);
    if (systemPath) records.push({ ...identity, status: "system", path: systemPath, sha256: null });
    else records.push({ ...identity, status: "missing", path: cachePath, sha256: font.sha256 });
  }
  return { cacheRoot, manifestDigest: digest, records };
}
async function resolveFonts(root, options = {}) {
  const { manifest, digest } = await loadFontManifest(root);
  const cacheRoot = fontCacheRoot(digest, options.env, options.platform);
  await mkdir(cacheRoot, { recursive: true });
  const directories = options.systemDirectories ?? systemFontDirectories(options.env, options.platform);
  const sources = /* @__PURE__ */ new Map();
  const unresolved = [];
  for (const font of manifest.fonts) {
    const target = path.join(cacheRoot, font.filename);
    const cached = await shaFile(target).catch(() => null);
    if (cached?.sha256 === font.sha256) {
      sources.set(font.filename, { source: target, origin: "cache" });
      continue;
    }
    if (cached) await rm(target, { force: true });
    const developmentSource = path.join(root, ...String(font.asset || "").split("/"));
    const developmentDigest = options.useDevelopmentSources === false ? null : await shaFile(developmentSource).catch(() => null);
    if (developmentDigest?.sha256 === font.sha256) {
      sources.set(font.filename, { source: developmentSource, origin: "development-source" });
    } else unresolved.push(font);
  }
  const systemMatches = await matchingSystemFonts(unresolved, directories, options);
  const records = [];
  for (const font of manifest.fonts) {
    const target = path.join(cacheRoot, font.filename);
    const prepared = sources.get(font.filename);
    if (prepared?.origin === "cache") {
      records.push({ font, ...prepared });
      continue;
    }
    if (prepared?.origin === "development-source") {
      const temporary = `${target}.part-${process.pid}-${Date.now()}`;
      await copyFile(prepared.source, temporary);
      await rename(temporary, target);
      records.push({ font, source: target, origin: "development-source" });
      continue;
    }
    const systemPath = systemMatches.get(font.filename);
    if (systemPath) {
      records.push({ font, source: systemPath, origin: "system" });
      continue;
    }
    try {
      await downloadFont(font, target, options);
    } catch (error) {
      throw new WisePPTError(`${error.message}\u3002\u7F13\u5B58\u76EE\u5F55\uFF1A${cacheRoot}\u3002\u8054\u7F51\u540E\u91CD\u65B0\u6267\u884C build\u3002`);
    }
    records.push({ font, source: target, origin: "download" });
  }
  return { cacheRoot, manifestDigest: digest, records };
}
async function copyResolvedFonts(resolved, outputRoot) {
  const written = [];
  for (const { font, source } of resolved.records) {
    const relative = `assets/fonts/${font.filename}`;
    const target = path.join(outputRoot, ...relative.split("/"));
    await mkdir(path.dirname(target), { recursive: true });
    await copyFile(source, target);
    written.push(relative);
  }
  return written.sort();
}
export {
  copyResolvedFonts,
  fontCacheRoot,
  inspectFonts,
  loadFontManifest,
  resolveFonts,
  systemFontDirectories,
  systemFontFaceMatches,
  systemFontLabelMatches
};
