import { spawn, spawnSync } from "node:child_process";
import { mkdir, mkdtemp, open, readFile, rm, stat } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { MIN_CHROME_MAJOR } from "./constants.js";
import { sleep, WisePPTError } from "./common.js";
function windowsCandidates(env) {
  return [
    env.LOCALAPPDATA && path.join(env.LOCALAPPDATA, "Google", "Chrome", "Application", "chrome.exe"),
    env.PROGRAMFILES && path.join(env.PROGRAMFILES, "Google", "Chrome", "Application", "chrome.exe"),
    env["PROGRAMFILES(X86)"] && path.join(env["PROGRAMFILES(X86)"], "Google", "Chrome", "Application", "chrome.exe")
  ].filter(Boolean);
}
function platformCandidates(env = process.env, platform = process.platform) {
  if (platform === "darwin") return ["/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"];
  if (platform === "win32") return windowsCandidates(env);
  throw new WisePPTError(`Wise PPT \u4EC5\u652F\u6301 macOS \u548C Windows\uFF0C\u5F53\u524D\u5E73\u53F0\uFF1A${platform}`);
}
function pathEntries(env = process.env, platform = process.platform) {
  return String(env.PATH || "").split(path.delimiter).filter(Boolean).map((entry) => path.resolve(entry));
}
async function resolveCandidate(candidate, env, platform) {
  const isPath = path.isAbsolute(candidate) || candidate.includes(path.sep) || platform === "win32" && candidate.includes("/");
  if (isPath) {
    const info = await stat(path.resolve(candidate)).catch(() => null);
    return info?.isFile() ? path.resolve(candidate) : null;
  }
  const names = platform === "win32" && !candidate.toLowerCase().endsWith(".exe") ? [candidate, `${candidate}.exe`] : [candidate];
  for (const directory of pathEntries(env, platform)) {
    for (const name of names) {
      const file = path.join(directory, name);
      const info = await stat(file).catch(() => null);
      if (info?.isFile()) return file;
    }
  }
  return null;
}
function parseChromeVersion(product, binary) {
  const text = String(product || "").trim();
  if (!/(Google Chrome|Chrome for Testing|Chrome\/)/i.test(text)) {
    throw new WisePPTError(`\u53EA\u652F\u6301 Google Chrome\uFF0C\u68C0\u6D4B\u5230\uFF1A${text || binary}`);
  }
  const version = text.match(/(\d+)\.(\d+)\.(\d+)\.(\d+)/)?.[0];
  const major = Number.parseInt(version?.split(".")[0] || "", 10);
  if (!Number.isInteger(major)) throw new WisePPTError(`\u65E0\u6CD5\u8BC6\u522B Chrome \u7248\u672C\uFF1A${text}`);
  if (major < MIN_CHROME_MAJOR) throw new WisePPTError(`\u9700\u8981 Google Chrome >= ${MIN_CHROME_MAJOR}\uFF0C\u5F53\u524D ${version}`);
  return { product: text, version, major };
}
async function probeChromeVersion(binary) {
  const temporaryDir = await mkdtemp(path.join(os.tmpdir(), "wise-ppt-chrome-version-"));
  try {
    return await runChromeTask({
      binary,
      temporaryDir,
      run: async ({ port }) => {
        for (let attempt = 0; attempt < 100; attempt += 1) {
          try {
            const response = await fetch(`http://127.0.0.1:${port}/json/version`);
            const value = await response.json();
            if (value?.Browser) return parseChromeVersion(value.Browser, binary);
          } catch {
          }
          await sleep(100);
        }
        throw new WisePPTError(`CDP \u4E0D\u53EF\u8FBE: 127.0.0.1:${port}`);
      }
    });
  } finally {
    await rm(temporaryDir, { recursive: true, force: true }).catch(() => {
    });
  }
}
async function readChromeVersion(binary, platform) {
  if (platform === "win32") return probeChromeVersion(binary);
  const result = spawnSync(binary, ["--version"], { encoding: "utf8", windowsHide: true, timeout: 15e3 });
  if (result.error) throw new WisePPTError(`\u65E0\u6CD5\u8FD0\u884C Google Chrome: ${binary}: ${result.error.message}`);
  const text = `${result.stdout || ""}
${result.stderr || ""}`.trim();
  if (result.status !== 0) throw new WisePPTError(`Google Chrome --version \u5931\u8D25: ${text || `exit=${result.status}`}`);
  return parseChromeVersion(text, binary);
}
async function discoverChrome(options = {}) {
  const env = options.env || process.env;
  const platform = options.platform || process.platform;
  const override = env.WISE_PPT_CHROME;
  if (override && !path.isAbsolute(override)) throw new WisePPTError("WISE_PPT_CHROME \u5FC5\u987B\u662F Chrome \u53EF\u6267\u884C\u6587\u4EF6\u7EDD\u5BF9\u8DEF\u5F84");
  const candidates = override ? [override] : platformCandidates(env, platform);
  for (const candidate of candidates) {
    const binary = await resolveCandidate(candidate, env, platform);
    if (!binary) continue;
    return { binary, ...await readChromeVersion(binary, platform), source: override ? "WISE_PPT_CHROME" : "platform" };
  }
  throw new WisePPTError("\u627E\u4E0D\u5230 Google Chrome\u3002\u8BF7\u5B89\u88C5 Chrome\uFF0C\u6216\u8BBE\u7F6E WISE_PPT_CHROME \u4E3A\u53EF\u6267\u884C\u6587\u4EF6\u7EDD\u5BF9\u8DEF\u5F84\u3002");
}
async function processAlive(child) {
  if (child.exitCode !== null || child.signalCode !== null) return false;
  try {
    process.kill(child.pid, 0);
    return true;
  } catch {
    return false;
  }
}
async function stopProcess(child, platform = process.platform) {
  if (!child || !await processAlive(child)) return;
  if (platform === "win32") {
    spawnSync("taskkill", ["/PID", String(child.pid), "/T", "/F"], { windowsHide: true, timeout: 15e3 });
  } else {
    try {
      process.kill(-child.pid, "SIGTERM");
    } catch {
      child.kill("SIGTERM");
    }
    for (let index = 0; index < 30 && await processAlive(child); index += 1) await sleep(100);
    if (await processAlive(child)) {
      try {
        process.kill(-child.pid, "SIGKILL");
      } catch {
        child.kill("SIGKILL");
      }
    }
  }
  await new Promise((resolve) => {
    if (child.exitCode !== null || child.signalCode !== null) resolve();
    else {
      child.once("exit", resolve);
      setTimeout(resolve, 5e3).unref();
    }
  });
}
async function startChrome({ binary, profileDir, logPath }) {
  const log = await open(logPath, "w");
  const args = [
    "--headless",
    "--disable-gpu",
    "--disable-background-networking",
    "--disable-component-update",
    "--disable-default-apps",
    "--disable-extensions",
    "--disable-sync",
    "--no-first-run",
    "--no-default-browser-check",
    "--metrics-recording-only",
    "--allow-file-access-from-files",
    "--force-device-scale-factor=1",
    "--hide-scrollbars",
    "--remote-debugging-address=127.0.0.1",
    "--remote-debugging-port=0",
    `--user-data-dir=${profileDir}`,
    "--window-size=1920,1080",
    "about:blank"
  ];
  const child = spawn(binary, args, {
    detached: process.platform !== "win32",
    stdio: ["ignore", log.fd, log.fd],
    windowsHide: true
  });
  const portFile = path.join(profileDir, "DevToolsActivePort");
  try {
    for (let index = 0; index < 300; index += 1) {
      const value = await readFile(portFile, "utf8").catch(() => "");
      const port = Number.parseInt(value.split(/\r?\n/, 1)[0] || "", 10);
      if (Number.isInteger(port) && port > 0) {
        return {
          child,
          port,
          stop: async () => {
            await stopProcess(child);
            await log.close().catch(() => {
            });
          }
        };
      }
      if (!await processAlive(child)) break;
      await sleep(100);
    }
    const detail = (await readFile(logPath, "utf8").catch(() => "")).trim().split(/\r?\n/).slice(-30).join("\n");
    throw new WisePPTError(`Chrome CDP \u672A\u542F\u52A8${detail ? `\uFF1A
${detail}` : ""}`);
  } catch (error) {
    await stopProcess(child);
    await log.close().catch(() => {
    });
    throw error;
  }
}
function isTransientChromeError(error) {
  const message = String(error?.message || error || "");
  return /Chrome CDP 未启动|CDP (?:不可达|超时)|CDP WebSocket|WebSocket 已关闭|Target closed/i.test(message);
}
async function transientChromeError(error, logPath, attempt, attempts) {
  const detail = (await readFile(logPath, "utf8").catch(() => "")).trim().split(/\r?\n/).slice(-30).join("\n");
  if (!detail) return error;
  return new WisePPTError(`${error.message}
Chrome \u5C1D\u8BD5 ${attempt}/${attempts} \u65E5\u5FD7\uFF1A
${detail}`);
}
async function runChromeTask({
  binary,
  temporaryDir,
  run,
  attempts = 2,
  start = startChrome
}) {
  if (!Number.isInteger(attempts) || attempts < 1) throw new WisePPTError("Chrome \u5C1D\u8BD5\u6B21\u6570\u5FC5\u987B\u662F\u6B63\u6574\u6570");
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const profileDir = path.join(temporaryDir, `profile-${attempt}`);
    const logPath = path.join(temporaryDir, `chrome-${attempt}.log`);
    await mkdir(profileDir, { recursive: true });
    let session;
    try {
      session = await start({ binary, profileDir, logPath });
      return await run(session, attempt);
    } catch (error) {
      lastError = error;
      const transient = isTransientChromeError(error);
      if (!transient) throw error;
      if (attempt === attempts) throw await transientChromeError(error, logPath, attempt, attempts);
    } finally {
      if (session) await session.stop().catch(() => {
      });
    }
  }
  throw lastError;
}
function deckFileUrl(deck) {
  return pathToFileURL(path.join(deck, "index.html")).href;
}
export {
  deckFileUrl,
  discoverChrome,
  isTransientChromeError,
  runChromeTask,
  startChrome
};
