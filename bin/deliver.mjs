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
  if (pairExists[0] !== pairExists[1]) throw new WisePPTError("deck.pdf \u4E0E delivery-manifest.json \u5FC5\u987B\u6210\u5BF9\u5B58\u5728");
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
    if (pdfInstalled) await rm(pdf, { force: true }).catch((item) => rollbackErrors.push(`\u5220\u9664\u65B0 PDF: ${item.message}`));
    if (manifestInstalled) await rm(manifest, { force: true }).catch((item) => rollbackErrors.push(`\u5220\u9664\u65B0 manifest: ${item.message}`));
    if (pdfBackedUp) await rename(pdfBackup, pdf).catch((item) => rollbackErrors.push(`\u6062\u590D\u65E7 PDF: ${item.message}`));
    if (manifestBackedUp) await rename(manifestBackup, manifest).catch((item) => rollbackErrors.push(`\u6062\u590D\u65E7 manifest: ${item.message}`));
    const rollback = rollbackErrors.length ? `\u56DE\u6EDA\u4E0D\u5B8C\u6574\uFF08\u5907\u4EFD\u4FDD\u7559\u5728\u8F93\u51FA\u76EE\u5F55\uFF09\uFF1A${rollbackErrors.join("\uFF1B")}` : "\u65E7\u4EA4\u4ED8\u5DF2\u56DE\u6EDA";
    throw new WisePPTError(`PDF/manifest \u6210\u5BF9\u63D0\u4EA4\u5931\u8D25\uFF0C${rollback}: ${error.message}`);
  }
}
async function deliverStandard(root, rawDeck) {
  const deck = assertAbsolute(rawDeck, "deck \u8DEF\u5F84");
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
