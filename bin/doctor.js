import os from "node:os";
import path from "node:path";
import { mkdir } from "node:fs/promises";
import { MIN_NODE_MAJOR } from "./constants.js";
import { writableDirectory, WisePPTError } from "./common.js";
import { verifyBundle } from "./bundle.js";
import { discoverChrome } from "./chrome.js";
import { inspectFonts } from "./fonts.js";
async function doctor(root) {
  const major = Number.parseInt(process.versions.node.split(".")[0], 10);
  if (major < MIN_NODE_MAJOR) throw new WisePPTError(`\u9700\u8981 Node >= ${MIN_NODE_MAJOR}\uFF0C\u5F53\u524D ${process.version}`);
  const bundle = await verifyBundle(root);
  const chrome = await discoverChrome();
  const fonts = await inspectFonts(root);
  await mkdir(fonts.cacheRoot, { recursive: true });
  await writableDirectory(fonts.cacheRoot);
  await writableDirectory(os.tmpdir());
  const missing = fonts.records.filter((item) => item.status === "missing").map((item) => item.filename);
  return {
    format: "wise-ppt-doctor@1",
    status: "pass",
    platform: { os: process.platform, arch: process.arch },
    node: { version: process.version, required_major: MIN_NODE_MAJOR },
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
