#!/usr/bin/env node
/** Build/check the machine contract that makes references/catalog.html the only selectable asset authority. */
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');

const root = path.resolve(__dirname, '..');
const outputRelative = 'capabilities/catalog-authority-manifest.json';
const routingRelative = 'capabilities/components/routing-manifest.json';
const catalogRelative = 'references/catalog.html';
const atlasRelative = 'references/ppt-component-atlas/catalog-data.js';
const nativeRelative = 'capabilities/layouts/paper-ink-components.js';
const echartsDataRelative = 'references/gallery-components/echarts-catalog-data.js';
const iconDataRelative = 'references/icon-catalog-data.js';
const atlasAdapterRelative = 'themes/paper-ink/adapters/atlas.js';
const echartsThemeAdapterRelative = 'themes/paper-ink/adapters/echarts.js';
const echartsGalleryAdapterRelative = 'references/gallery-components/echarts-theme-adapter.js';
const echartsRuntimeRelative = 'capabilities/vendors/echarts/echarts.min.js';
const materializerRelative = 'scripts/materialize_atlas_component.cjs';
const frameRootRelative = 'references/gallery-paper-ink/ai/frames';
const iconRootRelative = 'capabilities/vendors/tabler-outline/redraw-v3/svg';

function absolute(relative) { return path.join(root, relative); }
function read(relative) { return fs.readFileSync(absolute(relative)); }
function sha(value) { return crypto.createHash('sha256').update(value).digest('hex'); }
function shaFile(relative) { return sha(read(relative)); }
function canonical(value) {
  if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${canonical(value[key])}`).join(',')}}`;
  }
  return JSON.stringify(value);
}
function objectSha(value) { return sha(canonical(value)); }
function loadWindowData(relative, key) {
  const context = { window: {} };
  context.globalThis = context.window;
  vm.runInNewContext(read(relative).toString('utf8'), context, { filename: relative });
  const value = context.window[key];
  if (!value) throw new Error(`${relative} 未暴露 window.${key}`);
  return value;
}
function variableBlock(source, name, nextName) {
  const startPattern = new RegExp(`\\bconst\\s+${name}\\s*=`);
  const nextPattern = new RegExp(`\\bconst\\s+${nextName}\\s*=`);
  const startMatch = startPattern.exec(source);
  if (!startMatch) throw new Error(`Catalog 数据块缺失: ${name}`);
  const tail = source.slice(startMatch.index + startMatch[0].length);
  const nextMatch = nextPattern.exec(tail);
  if (!nextMatch) throw new Error(`Catalog 数据块结束标记缺失: ${nextName}`);
  return tail.slice(0, nextMatch.index);
}
function unique(values) { return [...new Set(values)].sort(); }

function catalogInventory(catalogSource) {
  const nonrelationBlock = variableBlock(catalogSource, 'NON_REL_GROUPS', 'NON_REL');
  const relationBlock = variableBlock(catalogSource, 'SMARTART_TYPES', 'CATALOG_FORMAL_EXAMPLES');
  const componentBlock = variableBlock(catalogSource, 'SMARTART_COMPONENTS', 'SMARTART_LAYOUT_COUNT');
  const codePattern = /\[\s*'([A-Z]\d{1,2})'\s*,/g;
  const codes = block => unique([...block.matchAll(codePattern)].map(match => match[1]));
  const specs = [];
  for (const match of componentBlock.matchAll(/\{t:'(atlas|native|ec)'(?:,num:(\d+)|,id:'([^']+)')/g)) {
    specs.push(`${match[1]}:${match[3] || match[2]}`);
  }
  for (const match of componentBlock.matchAll(/\['(atlas|native|ec):([^']+)'/g)) specs.push(`${match[1]}:${match[2]}`);
  return { nonrelationCodes: codes(nonrelationBlock), relationCodes: codes(relationBlock), componentSpecs: unique(specs) };
}

function routeForSpec(spec, routes) {
  const [kind, key] = spec.split(':', 2);
  let matches;
  if (kind === 'ec') matches = routes.filter(item => item.component_id === key);
  else if (kind === 'atlas') matches = routes.filter(item => item.component_id.startsWith(`atlas.${String(Number(key)).padStart(3, '0')}.`));
  else matches = routes.filter(item => item.component_id.startsWith(`native.paper-ink.${String(Number(key)).padStart(3, '0')}.`));
  if (matches.length !== 1) throw new Error(`${spec} 应唯一映射生产路由，当前 ${matches.length} 个`);
  return matches[0];
}

function sourceFile(relative) { return { path: relative, sha256: shaFile(relative) }; }

function main() {
  const check = process.argv.slice(2).includes('--check');
  if (process.argv.length > (check ? 3 : 2)) throw new Error('用法: node scripts/build_catalog_authority_manifest.cjs [--check]');
  const forbiddenVendor = absolute('capabilities/vendors/ppt-component-atlas/catalog-data.js');
  if (fs.existsSync(forbiddenVendor)) throw new Error('检测到第二份 Atlas 源码: capabilities/vendors/ppt-component-atlas/catalog-data.js');

  const catalogSource = read(catalogRelative).toString('utf8');
  const inventory = catalogInventory(catalogSource);
  if (inventory.relationCodes.length !== 68 || inventory.nonrelationCodes.length !== 12) {
    throw new Error(`Catalog 页面计数异常: 关系 ${inventory.relationCodes.length} / 非关系 ${inventory.nonrelationCodes.length}`);
  }

  const atlas = loadWindowData(atlasRelative, 'SWISS_CATALOG_DATA');
  const native = loadWindowData(nativeRelative, 'PAPER_INK_COMPONENT_DATA');
  const echarts = loadWindowData(echartsDataRelative, 'WISE_PPT_ECHARTS_GALLERY_DATA');
  const icons = loadWindowData(iconDataRelative, 'WISE_PPT_ICON_CATALOG_DATA');
  const routing = JSON.parse(read(routingRelative).toString('utf8'));
  const routeIds = new Set();
  const componentReceipts = {};

  for (const spec of inventory.componentSpecs) {
    const [kind, key] = spec.split(':', 2);
    const route = routeForSpec(spec, routing.components);
    routeIds.add(route.component_id);
    let entry, sourcePath, stack;
    if (kind === 'atlas') {
      entry = atlas.entries.find(item => item.num === Number(key));
      sourcePath = atlasRelative;
      stack = [sourceFile(atlasAdapterRelative), sourceFile(materializerRelative)];
    } else if (kind === 'native') {
      entry = native.entries.find(item => item.num === Number(key));
      sourcePath = nativeRelative;
      stack = [];
    } else {
      entry = echarts.components.find(item => item.component_id === key);
      sourcePath = echartsDataRelative;
      stack = [
        sourceFile(echartsRuntimeRelative),
        sourceFile(echartsThemeAdapterRelative),
        sourceFile(echartsGalleryAdapterRelative)
      ];
    }
    if (!entry) throw new Error(`${spec} 在 Catalog 加载源中不存在`);
    componentReceipts[route.component_id] = {
      catalog_spec: spec,
      source_path: sourcePath,
      source_sha256: shaFile(sourcePath),
      entry_sha256: objectSha(entry),
      ...(typeof entry.snippet === 'string' ? { snippet_sha256: sha(entry.snippet) } : {}),
      render_stack: stack
    };
  }

  const frameReceipt = code => {
    const source = `${frameRootRelative}/layout-${code.toLowerCase()}.html`;
    return { source, sha256: shaFile(source) };
  };
  const iconEntries = icons.ink.map(item => {
    const source = `${iconRootRelative}/${item.name}.svg`;
    return { name: item.name, source, sha256: shaFile(source) };
  }).sort((a, b) => a.name.localeCompare(b.name));
  if (new Set(iconEntries.map(item => item.name)).size !== iconEntries.length) throw new Error('Catalog 图标名重复');

  const manifest = {
    contract_version: 1,
    authority_id: 'wise-ppt.catalog',
    policy: 'references/catalog.html current visible assets are the only directly selectable production assets',
    retired_skill_names: ['wise-ppt', 'wise-ppt-page-expression'],
    entrypoint: { path: catalogRelative, sha256: shaFile(catalogRelative) },
    layouts: {
      relationship: inventory.relationCodes.map(code => ({ code, ...frameReceipt(code) })),
      nonrelationship: inventory.nonrelationCodes.map(code => ({ code, ...frameReceipt(code) }))
    },
    components: {
      visible_card_count: 80,
      selectable_spec_count: inventory.componentSpecs.length,
      receipts: Object.fromEntries(Object.entries(componentReceipts).sort(([a], [b]) => a.localeCompare(b)))
    },
    icons: {
      data: sourceFile(iconDataRelative),
      selectable_count: iconEntries.length,
      entries: iconEntries,
      selection_sha256: objectSha(iconEntries)
    }
  };

  routing.components.forEach(route => {
    if (componentReceipts[route.component_id]) route.catalog_receipt = componentReceipts[route.component_id];
    else delete route.catalog_receipt;
  });
  const manifestText = `${JSON.stringify(manifest, null, 2)}\n`;
  const routingText = `${JSON.stringify(routing, null, 2)}\n`;
  if (check) {
    const currentManifest = fs.existsSync(absolute(outputRelative)) ? read(outputRelative).toString('utf8') : '';
    if (currentManifest !== manifestText) throw new Error(`${outputRelative} 不是当前 Catalog 的确定性投影`);
    const currentRouting = read(routingRelative).toString('utf8');
    if (currentRouting !== routingText) throw new Error(`${routingRelative} 的 catalog_receipt 已漂移`);
    process.stdout.write(`PASS catalog authority layouts=68+12 components=${inventory.componentSpecs.length} icons=${iconEntries.length}\n`);
    return;
  }
  fs.writeFileSync(absolute(outputRelative), manifestText);
  fs.writeFileSync(absolute(routingRelative), routingText);
  process.stdout.write(`WROTE catalog authority layouts=68+12 components=${inventory.componentSpecs.length} icons=${iconEntries.length}\n`);
}

main();
