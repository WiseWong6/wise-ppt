import os from "node:os";
import path from "node:path";
import { mkdir } from "node:fs/promises";
import { SUPPORTED_NODE_MAJORS } from "./constants.mjs";
import { writableDirectory, WisePPTError } from "./common.mjs";
import { verifyBundle } from "./bundle.mjs";
import { discoverChrome } from "./chrome.mjs";
import { inspectFonts } from "./fonts.mjs";
async function doctor(root) {
  const major = Number.parseInt(process.versions.node.split(".")[0], 10);
  if (!SUPPORTED_NODE_MAJORS.includes(major)) {
    throw new WisePPTError(`\u4EC5\u652F\u6301 Node 22/24 LTS\uFF0C\u5F53\u524D ${process.version}`);
  }
  const bundle = await verifyBundle(root);
  const chrome = await discoverChrome();
  const fonts = await inspectFonts(root);
  await mkdir(fonts.cacheRoot, { recursive: true });
  await writableDirectory(fonts.cacheRoot);
  await writableDirectory(os.tmpdir());
  const missing = fonts.records.filter((item) => item.status === "missing").map((item) => item.filename);
  return {
    format: "wise-ppt-doctor@2",
    status: "pass",
    platform: { os: process.platform, arch: process.arch },
    node: { version: process.version, supported_majors: [...SUPPORTED_NODE_MAJORS] },
    chrome,
    bundle,
    fonts: {
      cache: fonts.cacheRoot,
      ready: fonts.records.length - missing.length,
      missing,
      note: missing.length ? "build \u9996\u6B21\u8FD0\u884C\u65F6\u5C06\u4E0B\u8F7D\u7F3A\u5931\u5B57\u4F53" : "\u5B57\u4F53\u5DF2\u53EF\u79BB\u7EBF\u4F7F\u7528"
    },
    temp: os.tmpdir()
  };
}
export {
  doctor
};
