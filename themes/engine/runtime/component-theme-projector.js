(function initWisePptComponentThemeProjector(root, factory) {
  const nodeContract = typeof module === 'object' && module.exports
    ? require('../contracts/component-theme-bindings.json')
    : null;
  const api = factory(root, nodeContract);
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.WisePPTComponentThemeProjector = api;
})(typeof window !== 'undefined' ? window : globalThis, function createComponentThemeProjector(root, nodeContract) {
  'use strict';

  const CONTRACT_ID = 'wise-ppt-component-theme-bindings@1';
  const CHROMATIC_THEMES = new Set(['hermes-orange', 'klein-blue']);

  function contract() {
    const value = nodeContract || (root && root.WISE_PPT_COMPONENT_THEME_BINDINGS);
    if (!value || value.contract !== CONTRACT_ID) throw new Error('组件配色合同未加载或版本错误');
    return value;
  }

  function directEntry(key) {
    const payload = contract();
    if (payload.components[key]) return payload.components[key];
    return Object.values(payload.components).find(item => item.catalog_spec === key) || null;
  }

  function resolveBinding(key) {
    let entry = directEntry(key);
    const visited = new Set();
    while (entry && entry.mode === 'inherit') {
      if (visited.has(entry.component_id)) throw new Error(`组件配色继承成环: ${entry.component_id}`);
      visited.add(entry.component_id);
      entry = directEntry(entry.inherit_from);
    }
    if (!entry) throw new Error(`组件配色合同未登记: ${key}`);
    return entry;
  }

  function nodesForDom(componentRoot, selector, textPattern) {
    const nodes = selector === ':scope' ? [componentRoot] : [...componentRoot.querySelectorAll(selector)];
    if (!textPattern) return nodes;
    const pattern = new RegExp(textPattern);
    return nodes.filter(node => pattern.test((node.textContent || '').trim()));
  }

  function assertCount(entry, binding, count) {
    if (count !== binding.expected_count) {
      throw new Error(`${entry.catalog_spec || entry.component_id} 的 ${binding.source_selector} 命中 ${count}，合同要求 ${binding.expected_count}`);
    }
  }

  function annotateRoot(componentRoot, entry, requestedEntry) {
    const request = requestedEntry || entry;
    componentRoot.setAttribute('data-component-theme-scope', 'true');
    componentRoot.setAttribute('data-component-theme-source', CONTRACT_ID);
    componentRoot.setAttribute('data-component-theme-mode', request.mode);
    componentRoot.setAttribute('data-component-theme-profile', entry.source_layout?.default_profile || 'default-rule');
    if (entry.neutral_only) componentRoot.setAttribute('data-component-theme-neutral-only', 'true');
    if (entry.default_rule_profile) {
      componentRoot.setAttribute('data-component-theme-archetype', entry.default_rule_profile.archetype);
      componentRoot.setAttribute('data-component-theme-identity-policy', entry.default_rule_profile.identity_policy);
    }
    if (request.mode === 'inherit') {
      componentRoot.setAttribute('data-component-theme-inherit-from', request.inherit_from);
    }
    if (entry.source_layout) {
      componentRoot.setAttribute('data-component-theme-layout', entry.source_layout.display_code);
      componentRoot.setAttribute('data-component-theme-layout-evidence', entry.source_layout.evidence);
    }
    const hash = contract().contract_sha256;
    if (hash) componentRoot.setAttribute('data-component-theme-contract-sha256', hash);
  }

  function applyToElement(componentRoot, key) {
    if (!componentRoot || typeof componentRoot.querySelectorAll !== 'function') throw new TypeError('组件配色投影需要 DOM 根元素');
    const requestedEntry = directEntry(key);
    const entry = resolveBinding(key);
    if (!entry.catalog_spec) throw new Error(`${key} 是无独立渲染收据的路由，不能伪造组件投影`);
    annotateRoot(componentRoot, entry, requestedEntry);
    const report = {component_id: requestedEntry?.component_id || entry.component_id, resolved_component_id: entry.component_id, catalog_spec: entry.catalog_spec, mode: requestedEntry?.mode || entry.mode, materials: [], identity_groups: [], appearances: []};
    for (const binding of entry.material_bindings) {
      const nodes = nodesForDom(componentRoot, binding.source_selector);
      assertCount(entry, binding, nodes.length);
      nodes.forEach(node => node.setAttribute('data-component-theme-material', binding.material));
      report.materials.push({binding_id: binding.binding_id, count: nodes.length});
    }
    for (const group of entry.identity_groups) {
      let count = 0;
      for (const member of group.members || []) {
        if (member.option_path) continue;
        const nodes = nodesForDom(componentRoot, member.source_selector, member.text_pattern);
        assertCount(entry, member, nodes.length);
        nodes.forEach(node => {
          node.setAttribute('data-component-theme-group', group.group_id);
          node.setAttribute('data-component-theme-treatment', member.treatment);
        });
        count += nodes.length;
      }
      report.identity_groups.push({group_id: group.group_id, count});
    }
    for (const binding of entry.appearance_bindings || []) {
      const nodes = nodesForDom(componentRoot, binding.source_selector, binding.text_pattern);
      assertCount(entry, binding, nodes.length);
      nodes.forEach(node => node.setAttribute('data-component-theme-appearance', binding.treatment));
      report.appearances.push({binding_id: binding.binding_id, count: nodes.length});
    }
    return report;
  }

  function nodesForCheerio($, componentRoot, selector, textPattern) {
    let nodes = selector === ':scope' ? [componentRoot] : $(componentRoot).find(selector).toArray();
    if (textPattern) {
      const pattern = new RegExp(textPattern);
      nodes = nodes.filter(node => pattern.test($(node).text().trim()));
    }
    return nodes;
  }

  function projectMarkup(markup, key) {
    if (typeof require !== 'function') throw new Error('projectMarkup 仅供 Node 物化器使用');
    const cheerio = require('cheerio/slim');
    const $ = cheerio.load(String(markup || ''), {xmlMode: false}, false);
    const componentRoot = $.root().children().first().get(0);
    if (!componentRoot) throw new Error(`${key} 缺组件根`);
    const requestedEntry = directEntry(key);
    const entry = resolveBinding(key);
    if (!entry.catalog_spec) throw new Error(`${key} 是无独立渲染收据的路由，不能伪造组件投影`);
    const set = (node, name, value) => $(node).attr(name, String(value));
    set(componentRoot, 'data-component-theme-scope', 'true');
    set(componentRoot, 'data-component-theme-source', CONTRACT_ID);
    set(componentRoot, 'data-component-theme-mode', requestedEntry?.mode || entry.mode);
    set(componentRoot, 'data-component-theme-profile', entry.source_layout?.default_profile || 'default-rule');
    if (entry.neutral_only) set(componentRoot, 'data-component-theme-neutral-only', 'true');
    if (entry.default_rule_profile) {
      set(componentRoot, 'data-component-theme-archetype', entry.default_rule_profile.archetype);
      set(componentRoot, 'data-component-theme-identity-policy', entry.default_rule_profile.identity_policy);
    }
    if (requestedEntry?.mode === 'inherit') {
      set(componentRoot, 'data-component-theme-inherit-from', requestedEntry.inherit_from);
    }
    if (entry.source_layout) {
      set(componentRoot, 'data-component-theme-layout', entry.source_layout.display_code);
      set(componentRoot, 'data-component-theme-layout-evidence', entry.source_layout.evidence);
    }
    const hash = contract().contract_sha256;
    if (hash) set(componentRoot, 'data-component-theme-contract-sha256', hash);
    const report = {component_id: requestedEntry?.component_id || entry.component_id, resolved_component_id: entry.component_id, catalog_spec: entry.catalog_spec, mode: requestedEntry?.mode || entry.mode, materials: [], identity_groups: [], appearances: []};
    for (const binding of entry.material_bindings) {
      const nodes = nodesForCheerio($, componentRoot, binding.source_selector);
      assertCount(entry, binding, nodes.length);
      nodes.forEach(node => set(node, 'data-component-theme-material', binding.material));
      report.materials.push({binding_id: binding.binding_id, count: nodes.length});
    }
    for (const group of entry.identity_groups) {
      let count = 0;
      for (const member of group.members || []) {
        const nodes = nodesForCheerio($, componentRoot, member.source_selector, member.text_pattern);
        assertCount(entry, member, nodes.length);
        nodes.forEach(node => {
          set(node, 'data-component-theme-group', group.group_id);
          set(node, 'data-component-theme-treatment', member.treatment);
        });
        count += nodes.length;
      }
      report.identity_groups.push({group_id: group.group_id, count});
    }
    for (const binding of entry.appearance_bindings || []) {
      const nodes = nodesForCheerio($, componentRoot, binding.source_selector, binding.text_pattern);
      assertCount(entry, binding, nodes.length);
      nodes.forEach(node => set(node, 'data-component-theme-appearance', binding.treatment));
      report.appearances.push({binding_id: binding.binding_id, count: nodes.length});
    }
    return {markup: $.html(componentRoot), report};
  }

  function themeId(context) {
    return context?.themeId || context?.root?.dataset?.themeId || '';
  }

  function tokenColor(context, token) {
    if (context && typeof context.getToken === 'function') return context.getToken(token);
    const target = context && context.root;
    const view = target?.ownerDocument?.defaultView || (typeof window !== 'undefined' ? window : null);
    return view && target ? view.getComputedStyle(target).getPropertyValue(token).trim() : '';
  }

  function functionalColor(context) {
    return tokenColor(context, '--wp-color-functional');
  }

  function rgbChannels(value) {
    const text = String(value || '').trim();
    const hex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(text);
    if (hex) {
      const expanded = hex[1].length === 3 ? hex[1].split('').map(char => char + char).join('') : hex[1];
      return [0, 2, 4].map(index => Number.parseInt(expanded.slice(index, index + 2), 16));
    }
    const rgb = /^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i.exec(text);
    return rgb ? rgb.slice(1, 4).map(Number) : null;
  }

  function alphaColor(value, alpha, fallback) {
    const channels = rgbChannels(value);
    return channels ? `rgba(${channels.join(',')},${alpha})` : fallback;
  }

  function sourceMapValueField(option, series) {
    const datasets = Array.isArray(option.dataset)
      ? option.dataset
      : option.dataset ? [option.dataset] : [];
    const datasetIndex = Number.isInteger(series.datasetIndex) ? series.datasetIndex : 0;
    const dataset = datasets[datasetIndex];
    const dimensions = (dataset?.dimensions || []).map(dimension => (
      typeof dimension === 'object' ? dimension.name : dimension
    ));
    let field = series.encode?.value;
    if (Array.isArray(field)) [field] = field;
    if (Number.isInteger(field) || typeof field === 'string') return field;
    return dimensions[1] ?? 1;
  }

  function sourceMapDatumValue(option, series, datum) {
    if (!datum || typeof datum !== 'object') return undefined;
    const valueField = sourceMapValueField(option, series);
    if (Array.isArray(datum)) return datum[valueField];
    if (!Object.prototype.hasOwnProperty.call(datum, 'value')) return datum[valueField];
    const rawValue = datum.value;
    return Array.isArray(rawValue) ? rawValue[valueField] : rawValue;
  }

  function sourceMapDatumColor(option, series, datum, functional, recessed, dataAlphas) {
    const value = Number(sourceMapDatumValue(option, series, datum));
    if (!Number.isFinite(value) || value < 0) return alphaColor(recessed, .55, recessed);
    const low = dataAlphas[dataAlphas.length - 1] ?? .12;
    const high = dataAlphas[0] ?? .55;
    const alpha = value <= 6
      ? low
      : value >= 42
        ? high
        : Number((low + (value - 6) / 36 * (high - low)).toFixed(3));
    return alphaColor(functional, alpha, functional);
  }

  function applySourceChartProjection(option, entry, context) {
    const projection = entry.chart_projection;
    if (!projection) return option;
    if (projection.policy !== 'source-functional-alpha-ramp') return option;

    const dataAlphas = projection.alpha_ramps?.data || [.55, .371, .275, .216, .156, .12];
    const legendAlphas = projection.alpha_ramps?.legend || [.172, .236, .292, .344, .4];
    const functional = functionalColor(context) || '#191917';
    const primary = tokenColor(context, '--wp-color-primary') || '#191917';
    const recessed = tokenColor(context, '--wp-color-surface-recessed') || '#D4D5CD';
    const dataRamp = dataAlphas.map(alpha => alphaColor(functional, alpha, functional));
    const legendRamp = legendAlphas.map(alpha => alphaColor(functional, alpha, functional));
    option.color = dataRamp.slice();
    option.backgroundColor = 'transparent';
    option.visualMap = option.visualMap || {};
    if (Array.isArray(option.visualMap.pieces)) {
      option.visualMap.pieces = option.visualMap.pieces.map((piece, index) => ({
        ...piece,
        color: dataRamp[Math.min(index, dataRamp.length - 1)],
      }));
    }
    option.visualMap.inRange = {...(option.visualMap.inRange || {}), color: legendRamp};
    option.visualMap.outOfRange = {
      ...(option.visualMap.outOfRange || {}),
      color: alphaColor(recessed, .55, recessed),
    };
    option.visualMap.textStyle = {
      ...(option.visualMap.textStyle || {}),
      color: alphaColor(primary, .32, primary),
    };
    const seriesList = Array.isArray(option.series) ? option.series : option.series ? [option.series] : [];
    seriesList.forEach(series => {
      if (series.type !== 'map') return;
      series.itemStyle = {
        ...(series.itemStyle || {}),
        areaColor: alphaColor(recessed, .55, recessed),
        borderColor: primary,
        borderWidth: .8,
        shadowBlur: 0,
      };
      series.label = {...(series.label || {}), color: alphaColor(primary, .32, primary)};
      /* C4 只投影材料与色阶，不重写业务数据。显式 series.data 保留原数组、
         原顺序、原 datum 及全部业务字段；对象 datum 仅合并中性 itemStyle。
         dataset + encode 路径继续由 visualMap 着色，不伪造一份 series.data。 */
      if (Array.isArray(series.data)) series.data.forEach(datum => {
        if (!datum || typeof datum !== 'object' || Array.isArray(datum)) return;
        const priorStyle = datum.itemStyle && typeof datum.itemStyle === 'object'
          ? datum.itemStyle
          : {};
        datum.itemStyle = {
          ...priorStyle,
          areaColor: sourceMapDatumColor(option, series, datum, functional, recessed, dataAlphas),
        };
      });
    });
    return option;
  }

  function projectEchartsOption(option, key, context) {
    const entry = resolveBinding(key);
    if (!entry.catalog_spec?.startsWith('ec:')) throw new Error(`${key} 不是 ECharts 组件`);
    const pathNodes = (source, path) => {
      const parts = String(path || '').match(/[A-Za-z_$][\w$]*|\[\d+\]/g) || [];
      let nodes = [source];
      for (const part of parts) {
        const keyPart = part[0] === '[' ? Number(part.slice(1, -1)) : part;
        nodes = nodes.flatMap(node => node != null && node[keyPart] != null ? [node[keyPart]] : []);
      }
      return nodes;
    };
    const setPath = (target, path, value) => {
      const parts = String(path || '').split('.').filter(Boolean);
      let node = target;
      parts.forEach((part, index) => {
        if (index === parts.length - 1) node[part] = value;
        else node = node[part] || (node[part] = {});
      });
    };
    applySourceChartProjection(option, entry, context || {});
    const members = entry.identity_groups.flatMap(group => group.members || []);
    const resolved = members.map(member => ({member, nodes: pathNodes(option, member.option_path)}));
    resolved.forEach(({member, nodes}) => assertCount(entry, member, nodes.length));
    if (!CHROMATIC_THEMES.has(themeId(context))) return option;
    const color = functionalColor(context) || 'var(--wp-color-functional)';
    resolved.forEach(({member, nodes}) => nodes.forEach(node => setPath(node, member.option_property, color)));
    return option;
  }

  return Object.freeze({
    contractId: CONTRACT_ID,
    resolveBinding,
    applyToElement,
    projectMarkup,
    projectEchartsOption,
  });
});
