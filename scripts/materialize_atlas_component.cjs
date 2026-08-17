#!/usr/bin/env node
/** Deterministically materialize one Atlas component through the paper-ink adapter. */
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const repoRoot = path.resolve(__dirname, '..');
const catalogRelativePath = 'references/ppt-component-atlas/catalog-data.js';
const adapterRelativePath = 'themes/paper-ink/adapters/atlas.js';
const materializerRelativePath = 'scripts/materialize_atlas_component.cjs';
const catalogPath = path.join(repoRoot, catalogRelativePath);
const adapterPath = path.join(repoRoot, 'themes/paper-ink/adapters/atlas.js');

function usage(message) {
  if (message) process.stderr.write(`错误: ${message}\n`);
  process.stderr.write('用法: node scripts/materialize_atlas_component.cjs atlas.<num>.<slug> --out-dir <absolute-or-relative-dir>\n');
  process.exit(message ? 2 : 0);
}

const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) usage();
const componentId = args[0];
const outIndex = args.indexOf('--out-dir');
if (!componentId || outIndex < 0 || !args[outIndex + 1]) usage('缺少 component_id 或 --out-dir');
if (args.length !== 3 || outIndex !== 1) usage('只接受 component_id 与 --out-dir');

const match = /^atlas\.(\d{3})\.([a-z0-9-]+)$/.exec(componentId);
if (!match) usage(`非法 Atlas component_id: ${componentId}`);
const num = Number(match[1]);
const requestedSlug = match[2];

global.window = globalThis;
delete require.cache[require.resolve(catalogPath)];
require(catalogPath);
const catalog = globalThis.SWISS_CATALOG_DATA;
const adapter = require(adapterPath);
if (!catalog || !Array.isArray(catalog.entries)) throw new Error('Atlas catalog-data.js 未暴露 SWISS_CATALOG_DATA.entries');
const entry = catalog.entries.find(item => item.num === num);
if (!entry) throw new Error(`Atlas catalog 中不存在 #${String(num).padStart(3, '0')}`);
if (entry.name !== requestedSlug) throw new Error(`component_id slug 错配: 请求 ${requestedSlug}，catalog 为 ${entry.name}`);

const digest = value => crypto.createHash('sha256').update(value).digest('hex');
const sourceSha256 = digest(fs.readFileSync(catalogPath));
const snippetSha256 = digest(entry.snippet);
const adapterSha256 = digest(fs.readFileSync(adapterPath));
const materializerSha256 = digest(fs.readFileSync(__filename));
const receiptAttributes = [
  `data-materialized-component-id="${componentId}"`,
  `data-catalog-spec="atlas:${num}"`,
  `data-catalog-source-sha256="${sourceSha256}"`,
  `data-catalog-snippet-sha256="${snippetSha256}"`,
  `data-catalog-adapter-sha256="${adapterSha256}"`,
  'data-component-materialization="static"'
].join(' ');
const adaptedMarkup = adapter.adaptMarkup(entry.snippet).trim();
if (!/^<[^>]+>/.test(adaptedMarkup)) throw new Error(`Atlas #${num} snippet 缺根元素`);
const html = `${adaptedMarkup.replace(/^<([a-z][a-z0-9-]*)(\s|>)/i, `<$1 ${receiptAttributes}$2`)}\n`;
const css = `${adapter.adaptCss(catalog.componentCss).trim()}\n\n${adapter.COMPONENT_OVERRIDES.trim()}\n`;
const manifest = {
  format: 'wise-ppt-atlas-materialization@2',
  component_id: componentId,
  adapter_id: adapter.adapterId,
  catalog_spec: `atlas:${num}`,
  source: catalogRelativePath,
  source_sha256: sourceSha256,
  snippet_sha256: snippetSha256,
  adapter: adapterRelativePath,
  adapter_sha256: adapterSha256,
  materializer: materializerRelativePath,
  materializer_sha256: materializerSha256,
  html_sha256: digest(html),
  css_sha256: digest(css),
  includes_component_overrides: css.includes(adapter.COMPONENT_OVERRIDES.trim())
};

const outDir = path.resolve(process.cwd(), args[outIndex + 1]);
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'component.html'), html);
fs.writeFileSync(path.join(outDir, 'component.css'), css);
fs.writeFileSync(path.join(outDir, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
process.stdout.write(`${componentId} -> ${outDir}\n`);
