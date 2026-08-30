import { mkdir, mkdtemp, rename, rm } from "node:fs/promises";
import path from "node:path";
import { checkDelivery, exportDeck } from "#wise-export-deck";
import { assertAbsolute, exists, WisePPTError } from "./common.mjs";
import { deckFileUrl, discoverChrome, runChromeTask } from "./chrome.mjs";
import { validateDeck } from "./standard.mjs";
async function installDeliveryPair(deck, temporaryPdf, temporaryManifest) {
  const pdf = path.join(deck, "deck.pdf");
  const manifest = path.join(deck, "delivery-manifest.json");
  const pairExists = await Promise.all([exists(pdf), exists(manifest)]);
  if (pairExists[0] !== pairExists[1]) throw new WisePPTError("deck.pdf 与 delivery-manifest.json 必须成对存在");
  const token = `${process.pid}-${Date.now()}`;
  const pdfBackup = path.join(deck, `.deck.pdf.backup-${token}`);
  const manifestBackup = path.join(deck, `.delivery-manifest.json.backup-${token}`);
  let pdfBackedUp = false;
  let manifestBackedUp = false;
  let pdfInstalled = false;
  let manifestInstalled = false;
  try {
    if (pairExists[0]) {
      await rename(pdf, pdfBackup);
      pdfBackedUp = true;
      await rename(manifest, manifestBackup);
      manifestBackedUp = true;
    }
    await rename(temporaryPdf, pdf);
    pdfInstalled = true;
    await rename(temporaryManifest, manifest);
    manifestInstalled = true;
    await checkDelivery({ deckDir: deck });
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
    throw new WisePPTError(`PDF/manifest 成对提交失败，${rollback}: ${error.message}`);
  }
}
async function deliverStandard(root, rawDeck) {
  const deck = assertAbsolute(rawDeck, "deck 路径");
  await validateDeck(root, deck);
  const chrome = await discoverChrome();
  const parent = path.dirname(deck);
  await mkdir(parent, { recursive: true });
  const temporary = await mkdtemp(path.join(parent, ".wise-ppt-deliver-"));
  const temporaryPdf = path.join(temporary, "deck.pdf");
  const temporaryManifest = path.join(temporary, "delivery-manifest.json");
  try {
    const result = await runChromeTask({
      binary: chrome.binary,
      temporaryDir: temporary,
      run: (session) => exportDeck({
        deckDir: deck,
        url: deckFileUrl(deck),
        port: session.port,
        pdfPath: temporaryPdf,
        manifestPath: temporaryManifest
      })
    });
    await installDeliveryPair(deck, temporaryPdf, temporaryManifest);
    return { ...result, chrome, pdf: path.join(deck, "deck.pdf"), manifest: path.join(deck, "delivery-manifest.json") };
  } finally {
    await rm(temporary, { recursive: true, force: true }).catch(() => {
    });
  }
}
export {
  deliverStandard,
  installDeliveryPair
};
