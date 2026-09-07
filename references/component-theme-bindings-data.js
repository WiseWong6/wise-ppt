/* Generated from component-theme-bindings.json; file:// safe. */
window.WISE_PPT_COMPONENT_THEME_BINDINGS = Object.freeze({
  "contract": "wise-ppt-component-theme-bindings@1",
  "projection": "component-local-exact-count",
  "geometry_policy": "preserve-markup-data-and-bounds",
  "source_comparison_policy": {
    "scope": "structure-and-provenance-only",
    "component_visual_owner": "wise-ppt-component-theme-bindings@1",
    "page_visual_owner": "wise-ppt-layout-theme-bindings@3",
    "page_instance_gate": "catalog-standard-parity",
    "forbidden_comparisons": [
      "component-to-page-computed-style",
      "component-to-page-typography",
      "component-to-page-material-paint"
    ]
  },
  "generated_by": "scripts/build_component_theme_bindings.mjs",
  "counts": {
    "concrete_catalog_specs": 102,
    "route_ids": 126,
    "route_only": 24,
    "layout_default_specs": 52,
    "default_rule_specs": 50
  },
  "default_rule": {
    "materials": {
      "canvas": {
        "token": "--wp-color-surface-canvas",
        "neutral_value": "#F2EFE9"
      },
      "recessed": {
        "token": "--wp-color-surface-recessed",
        "neutral_value": "#E8E5DF"
      },
      "panel": {
        "token": "--wp-color-surface-panel",
        "neutral_value": "#FFFFFF"
      },
      "ink": {
        "token": "--wp-color-body",
        "neutral_value": "#1A1A1A"
      }
    },
    "identity_channel": "--wp-color-functional",
    "identity_group_limit": 2,
    "chart_policy": "neutral-data-ramp-with-semantic-text-identity",
    "emphasis_mode": "none",
    "paper_ink_resolution": "neutral-no-visual-change",
    "visual_grammar": {
      "open_canvas": "默认使用开放纸面，白色面只属于真实有界的独立容器",
      "semantic_identity": "身份色只落在稳定语义锚点，不按 DOM 顺序猜测第一个重点",
      "symmetric_peers": "同级对等节点成组处理，禁止只染第一个",
      "relation_first": "关系类优先路径、连接线、中心或根节点，节点文字保持墨色",
      "neutral_data": "数据图形使用墨色明度、线型和形状区分，允许零身份色组",
      "family_consistency": "同一组件家族共用材料与线条语法，只保留必要的规格数量差异",
      "theme_resolution": "纸墨保留中性原生表现；爱马仕橙与克莱因蓝在同一语义节点上解析各自功能色"
    }
  },
  "components": {
    "atlas.002.list-card": {
      "component_id": "atlas.002.list-card",
      "catalog_spec": "atlas:2",
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.list-heading",
          "label": "列表标题",
          "members": [
            {
              "source_selector": ".list-card-header",
              "treatment": "identity.text",
              "expected_count": 1,
              "evidence": "derived-from-sourced-component-grammar",
              "selector": "[data-component-theme-group=\"identity.list-heading\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [],
      "default_rule_profile": {
        "archetype": "list",
        "identity_policy": "semantic-anchor",
        "pattern_evidence": [
          {
            "layout_id": "P2",
            "catalog_spec": "native:105",
            "observation": "同级对等节点必须成组一致处理"
          }
        ],
        "rule": "列表仅用标题建立组件身份，列表项保持墨色"
      },
      "thumbnail_policy": "catalog-card"
    },
    "atlas.003.list-card.default": {
      "component_id": "atlas.003.list-card.default",
      "catalog_spec": null,
      "mode": "inherit",
      "inherit_from": "atlas.002.list-card",
      "source_layout": null,
      "material_bindings": [],
      "identity_groups": [],
      "appearance_bindings": [],
      "thumbnail_policy": "none-route-only"
    },
    "atlas.004.list-card.workflow": {
      "component_id": "atlas.004.list-card.workflow",
      "catalog_spec": null,
      "mode": "inherit",
      "inherit_from": "atlas.002.list-card",
      "source_layout": null,
      "material_bindings": [],
      "identity_groups": [],
      "appearance_bindings": [],
      "thumbnail_policy": "none-route-only"
    },
    "atlas.006.form-card": {
      "component_id": "atlas.006.form-card",
      "catalog_spec": "atlas:6",
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.action-sequence",
          "label": "动作编号 01–03",
          "members": [
            {
              "source_selector": ".form-card-action strong",
              "treatment": "identity.text",
              "expected_count": 3,
              "evidence": "derived-from-sourced-component-grammar",
              "selector": "[data-component-theme-group=\"identity.action-sequence\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [],
      "default_rule_profile": {
        "archetype": "form",
        "identity_policy": "full-sequence",
        "pattern_evidence": [
          {
            "layout_id": "J2",
            "catalog_spec": "native:99",
            "observation": "同一序列的编号必须全部一致，不仅取第一个"
          }
        ],
        "rule": "三个动作编号是一组完整序列，表单值不作为身份色"
      },
      "thumbnail_policy": "catalog-card"
    },
    "atlas.012.alert-box": {
      "component_id": "atlas.012.alert-box",
      "catalog_spec": "atlas:12",
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.alert-kinds",
          "label": "四类提示图标与标题",
          "members": [
            {
              "source_selector": ".alert-box .icon",
              "treatment": "identity.icon",
              "expected_count": 4,
              "evidence": "derived-from-sourced-component-grammar",
              "selector": "[data-component-theme-group=\"identity.alert-kinds\"]"
            },
            {
              "source_selector": ".alert-box .title",
              "treatment": "identity.text",
              "expected_count": 4,
              "evidence": "derived-from-sourced-component-grammar",
              "selector": "[data-component-theme-group=\"identity.alert-kinds\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [
        {
          "binding_id": "alert-open-surfaces",
          "source_selector": ".alert-box",
          "treatment": "default.open-surface",
          "expected_count": 4,
          "evidence": "derived-from-sourced-component-grammar",
          "selector": "[data-component-theme-appearance=\"default.open-surface\"]"
        }
      ],
      "default_rule_profile": {
        "archetype": "alert-set",
        "identity_policy": "semantic-peers",
        "pattern_evidence": [
          {
            "layout_id": "P2",
            "catalog_spec": "native:105",
            "observation": "同级对等节点必须成组一致处理"
          },
          {
            "layout_id": "H2",
            "catalog_spec": "native:97",
            "observation": "开放纸面是默认材料，只有真实有界卡片才使用白色面"
          }
        ],
        "rule": "四类同级提示的图标与标题成组统一，容器保持开放纸面"
      },
      "thumbnail_policy": "catalog-card"
    },
    "atlas.013.terminal-box": {
      "component_id": "atlas.013.terminal-box",
      "catalog_spec": "atlas:13",
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.term-marker",
          "label": "术语顶部标记",
          "members": [
            {
              "source_selector": ".terminal-marker",
              "treatment": "identity.functional-surface",
              "expected_count": 1,
              "evidence": "derived-from-sourced-component-grammar",
              "selector": "[data-component-theme-group=\"identity.term-marker\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [],
      "default_rule_profile": {
        "archetype": "term-definition",
        "identity_policy": "semantic-anchor",
        "pattern_evidence": [
          {
            "layout_id": "D4",
            "catalog_spec": "native:62",
            "observation": "结构编号只在稳定导航标记上使用身份色"
          }
        ],
        "rule": "术语卡只使用顶部短标记作身份锚点"
      },
      "thumbnail_policy": "catalog-card"
    },
    "atlas.014.code": {
      "component_id": "atlas.014.code",
      "catalog_spec": "atlas:14",
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.code-chrome",
          "label": "代码窗口标记",
          "members": [
            {
              "source_selector": ".code-dot",
              "treatment": "identity.border",
              "expected_count": 3,
              "evidence": "derived-from-sourced-component-grammar",
              "selector": "[data-component-theme-group=\"identity.code-chrome\"]"
            },
            {
              "source_selector": ".code-lang",
              "treatment": "identity.text",
              "expected_count": 1,
              "evidence": "derived-from-sourced-component-grammar",
              "selector": "[data-component-theme-group=\"identity.code-chrome\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [],
      "default_rule_profile": {
        "archetype": "code",
        "identity_policy": "semantic-peers",
        "pattern_evidence": [
          {
            "layout_id": "P2",
            "catalog_spec": "native:105",
            "observation": "同级对等节点必须成组一致处理"
          }
        ],
        "rule": "代码窗口的三个控制点与语言标签共用一组身份色，代码本身保持中性"
      },
      "thumbnail_policy": "catalog-card"
    },
    "atlas.016.before-after.default": {
      "component_id": "atlas.016.before-after.default",
      "catalog_spec": "atlas:16",
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.target-side",
          "label": "After 目标标记",
          "members": [
            {
              "source_selector": ".before-after .after .badge",
              "treatment": "identity.functional-surface",
              "expected_count": 1,
              "evidence": "derived-from-sourced-component-grammar",
              "selector": "[data-component-theme-group=\"identity.target-side\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [
        {
          "binding_id": "comparison-open-sides",
          "source_selector": ".before-after .side",
          "treatment": "default.open-ink-outline",
          "expected_count": 2,
          "evidence": "derived-from-sourced-component-grammar",
          "selector": "[data-component-theme-appearance=\"default.open-ink-outline\"]"
        }
      ],
      "default_rule_profile": {
        "archetype": "before-after",
        "identity_policy": "semantic-target",
        "pattern_evidence": [
          {
            "layout_id": "E6",
            "catalog_spec": "native:77",
            "observation": "对比类只标记语义明确的目标侧"
          },
          {
            "layout_id": "H2",
            "catalog_spec": "native:97",
            "observation": "开放纸面是默认材料，只有真实有界卡片才使用白色面"
          }
        ],
        "rule": "对比仅突出 After 标记，两侧面板改为开放墨线"
      },
      "thumbnail_policy": "catalog-card"
    },
    "atlas.017.before-after.with-arrow": {
      "component_id": "atlas.017.before-after.with-arrow",
      "catalog_spec": "atlas:17",
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.target-transition",
          "label": "目标侧与转换箭头",
          "members": [
            {
              "source_selector": ".before-after .after .badge",
              "treatment": "identity.functional-surface",
              "expected_count": 1,
              "evidence": "derived-from-sourced-component-grammar",
              "selector": "[data-component-theme-group=\"identity.target-transition\"]"
            },
            {
              "source_selector": ".before-after.with-arrow > .arrow",
              "treatment": "identity.text",
              "expected_count": 1,
              "evidence": "derived-from-sourced-component-grammar",
              "selector": "[data-component-theme-group=\"identity.target-transition\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [
        {
          "binding_id": "transition-open-sides",
          "source_selector": ".before-after .side",
          "treatment": "default.open-ink-outline",
          "expected_count": 2,
          "evidence": "derived-from-sourced-component-grammar",
          "selector": "[data-component-theme-appearance=\"default.open-ink-outline\"]"
        }
      ],
      "default_rule_profile": {
        "archetype": "current-target",
        "identity_policy": "semantic-target",
        "pattern_evidence": [
          {
            "layout_id": "E6",
            "catalog_spec": "native:77",
            "observation": "对比类只标记语义明确的目标侧"
          },
          {
            "layout_id": "J3",
            "catalog_spec": "native:101",
            "observation": "关系类优先把主路径与关键里程碑作为身份锚点"
          }
        ],
        "rule": "目标标记与转换箭头共同表达语义方向，两侧保持开放墨线"
      },
      "thumbnail_policy": "catalog-card"
    },
    "atlas.018.before-after.no-bg": {
      "component_id": "atlas.018.before-after.no-bg",
      "catalog_spec": null,
      "mode": "inherit",
      "inherit_from": "atlas.016.before-after.default",
      "source_layout": null,
      "material_bindings": [],
      "identity_groups": [],
      "appearance_bindings": [],
      "thumbnail_policy": "none-route-only"
    },
    "atlas.019.before-after.verification": {
      "component_id": "atlas.019.before-after.verification",
      "catalog_spec": "atlas:19",
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.precise-target",
          "label": "Precise 目标标记",
          "members": [
            {
              "source_selector": ".compare-side--precise .compare-tag",
              "treatment": "identity.functional-surface",
              "expected_count": 1,
              "evidence": "derived-from-sourced-component-grammar",
              "selector": "[data-component-theme-group=\"identity.precise-target\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [
        {
          "binding_id": "verification-open-sides",
          "source_selector": ".compare-side",
          "treatment": "default.open-ink-outline",
          "expected_count": 6,
          "evidence": "derived-from-sourced-component-grammar",
          "selector": "[data-component-theme-appearance=\"default.open-ink-outline\"]"
        }
      ],
      "default_rule_profile": {
        "archetype": "verification-contrast",
        "identity_policy": "semantic-target",
        "pattern_evidence": [
          {
            "layout_id": "E6",
            "catalog_spec": "native:77",
            "observation": "对比类只标记语义明确的目标侧"
          },
          {
            "layout_id": "H2",
            "catalog_spec": "native:97",
            "observation": "开放纸面是默认材料，只有真实有界卡片才使用白色面"
          }
        ],
        "rule": "只保留已存在的 Precise 语义标记，三组对比不以大面积白底分隔"
      },
      "thumbnail_policy": "catalog-card"
    },
    "atlas.020.swot": {
      "component_id": "atlas.020.swot",
      "catalog_spec": "atlas:20",
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.swot-headings",
          "label": "SWOT 四象限标题",
          "members": [
            {
              "source_selector": ".swot .cell h4",
              "treatment": "identity.text",
              "expected_count": 4,
              "evidence": "derived-from-sourced-component-grammar",
              "selector": "[data-component-theme-group=\"identity.swot-headings\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [
        {
          "binding_id": "swot-open-cells",
          "source_selector": ".swot .cell",
          "treatment": "default.open-surface",
          "expected_count": 4,
          "evidence": "derived-from-sourced-component-grammar",
          "selector": "[data-component-theme-appearance=\"default.open-surface\"]"
        }
      ],
      "default_rule_profile": {
        "archetype": "swot",
        "identity_policy": "semantic-peers",
        "pattern_evidence": [
          {
            "layout_id": "P2",
            "catalog_spec": "native:105",
            "observation": "同级对等节点必须成组一致处理"
          },
          {
            "layout_id": "H2",
            "catalog_spec": "native:97",
            "observation": "开放纸面是默认材料，只有真实有界卡片才使用白色面"
          }
        ],
        "rule": "SWOT 四个对等象限标题共用一组身份色，单元格保持开放"
      },
      "thumbnail_policy": "catalog-card"
    },
    "atlas.021.quadrant-axis": {
      "component_id": "atlas.021.quadrant-axis",
      "catalog_spec": "atlas:21",
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.axis-center",
          "label": "象限中心轴",
          "members": [
            {
              "source_selector": ".axis-center",
              "treatment": "identity.border",
              "expected_count": 1,
              "evidence": "derived-from-sourced-component-grammar",
              "selector": "[data-component-theme-group=\"identity.axis-center\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [
        {
          "binding_id": "quadrant-open-cells",
          "source_selector": ".quadrant-axis .quadrant",
          "treatment": "default.open-surface",
          "expected_count": 4,
          "evidence": "derived-from-sourced-component-grammar",
          "selector": "[data-component-theme-appearance=\"default.open-surface\"]"
        }
      ],
      "default_rule_profile": {
        "archetype": "quadrant",
        "identity_policy": "root-or-center",
        "pattern_evidence": [
          {
            "layout_id": "G1",
            "catalog_spec": "native:96",
            "observation": "层级类只突出根节点或中枢"
          },
          {
            "layout_id": "H2",
            "catalog_spec": "native:97",
            "observation": "开放纸面是默认材料，只有真实有界卡片才使用白色面"
          }
        ],
        "rule": "象限图只用中心轴建立身份，四象限保持开放"
      },
      "thumbnail_policy": "catalog-card"
    },
    "atlas.022.comparison-table": {
      "component_id": "atlas.022.comparison-table",
      "catalog_spec": "atlas:22",
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        },
        {
          "binding_id": "comparison-cells",
          "source_selector": ".comparison-table th, .comparison-table td",
          "material": "panel",
          "expected_count": 16,
          "evidence": "user-approved-neutral-surface",
          "selector": "[data-component-theme-material=\"panel\"]"
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.table-headers",
          "label": "对比表头",
          "members": [
            {
              "source_selector": ".comparison-table th",
              "treatment": "identity.text",
              "expected_count": 4,
              "evidence": "derived-from-sourced-component-grammar",
              "selector": "[data-component-theme-group=\"identity.table-headers\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [
        {
          "binding_id": "comparison-cell-lines",
          "source_selector": ".comparison-table th, .comparison-table td",
          "treatment": "default.ink-border",
          "expected_count": 16,
          "evidence": "derived-from-sourced-component-grammar",
          "selector": "[data-component-theme-appearance=\"default.ink-border\"]"
        }
      ],
      "default_rule_profile": {
        "archetype": "comparison-table",
        "identity_policy": "semantic-peers",
        "pattern_evidence": [
          {
            "layout_id": "U2",
            "catalog_spec": "native:130",
            "observation": "数据与表格优先使用中性墨阶，可以没有身份色"
          },
          {
            "layout_id": "H2",
            "catalog_spec": "native:97",
            "observation": "彩色主题中真实有界容器使用白面和墨色边界"
          }
        ],
        "rule": "表头是同级标识，全部十六个单元格使用白色面与墨线"
      },
      "thumbnail_policy": "catalog-card"
    },
    "atlas.024.impossible-triangle.impossible-triangle": {
      "component_id": "atlas.024.impossible-triangle.impossible-triangle",
      "catalog_spec": "atlas:24",
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.constraint-outline",
          "label": "不可能三角主边界",
          "members": [
            {
              "source_selector": ".impossible-triangle-shape",
              "treatment": "identity.stroke",
              "expected_count": 1,
              "evidence": "derived-from-sourced-component-grammar",
              "selector": "[data-component-theme-group=\"identity.constraint-outline\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [],
      "default_rule_profile": {
        "archetype": "constraint-triangle",
        "identity_policy": "relation-first",
        "pattern_evidence": [
          {
            "layout_id": "J3",
            "catalog_spec": "native:101",
            "observation": "关系类优先把主路径与关键里程碑作为身份锚点"
          }
        ],
        "rule": "不可能三角以主结构边界承载身份色，三个标签保持墨色"
      },
      "thumbnail_policy": "catalog-card"
    },
    "atlas.025.process.default": {
      "component_id": "atlas.025.process.default",
      "catalog_spec": "atlas:25",
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.process-links",
          "label": "两个流程箭头",
          "members": [
            {
              "source_selector": ".process-chain > .arrow",
              "treatment": "identity.text",
              "expected_count": 2,
              "evidence": "derived-from-sourced-component-grammar",
              "selector": "[data-component-theme-group=\"identity.process-links\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [
        {
          "binding_id": "process-open-nodes",
          "source_selector": ".process-chain > .step",
          "treatment": "default.open-ink-outline",
          "expected_count": 3,
          "evidence": "derived-from-sourced-component-grammar",
          "selector": "[data-component-theme-appearance=\"default.open-ink-outline\"]"
        }
      ],
      "default_rule_profile": {
        "archetype": "process-chain",
        "identity_policy": "relation-first",
        "pattern_evidence": [
          {
            "layout_id": "J3",
            "catalog_spec": "native:101",
            "observation": "关系类优先把主路径与关键里程碑作为身份锚点"
          },
          {
            "layout_id": "H2",
            "catalog_spec": "native:97",
            "observation": "开放纸面是默认材料，只有真实有界卡片才使用白色面"
          }
        ],
        "rule": "流程链仅箭头使用身份色，节点为开放墨线"
      },
      "thumbnail_policy": "catalog-card"
    },
    "atlas.026.process.default": {
      "component_id": "atlas.026.process.default",
      "catalog_spec": "atlas:26",
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.process-links",
          "label": "三个流程箭头",
          "members": [
            {
              "source_selector": ".process-chain > .arrow",
              "treatment": "identity.text",
              "expected_count": 3,
              "evidence": "derived-from-sourced-component-grammar",
              "selector": "[data-component-theme-group=\"identity.process-links\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [
        {
          "binding_id": "process-open-nodes",
          "source_selector": ".process-chain > .step",
          "treatment": "default.open-ink-outline",
          "expected_count": 4,
          "evidence": "derived-from-sourced-component-grammar",
          "selector": "[data-component-theme-appearance=\"default.open-ink-outline\"]"
        }
      ],
      "default_rule_profile": {
        "archetype": "process-chain",
        "identity_policy": "relation-first",
        "pattern_evidence": [
          {
            "layout_id": "J3",
            "catalog_spec": "native:101",
            "observation": "关系类优先把主路径与关键里程碑作为身份锚点"
          },
          {
            "layout_id": "H2",
            "catalog_spec": "native:97",
            "observation": "开放纸面是默认材料，只有真实有界卡片才使用白色面"
          }
        ],
        "rule": "四步流程仅三个箭头使用身份色，节点为开放墨线"
      },
      "thumbnail_policy": "catalog-card"
    },
    "atlas.027.process.annotated": {
      "component_id": "atlas.027.process.annotated",
      "catalog_spec": "atlas:27",
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.process-links",
          "label": "注释流程连接箭头",
          "members": [
            {
              "source_selector": ".process-annotated-grid--plain .step-link",
              "treatment": "identity.text",
              "expected_count": 3,
              "evidence": "derived-from-sourced-component-grammar",
              "selector": "[data-component-theme-group=\"identity.process-links\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [
        {
          "binding_id": "annotated-process-nodes",
          "source_selector": ".process-annotated-grid--plain .step-node",
          "treatment": "default.open-ink-outline",
          "expected_count": 4,
          "evidence": "derived-from-sourced-component-grammar",
          "selector": "[data-component-theme-appearance=\"default.open-ink-outline\"]"
        },
        {
          "binding_id": "annotated-process-captions",
          "source_selector": ".process-annotated-grid--plain > div:nth-of-type(n+8)",
          "treatment": "default.open-ink-outline",
          "expected_count": 4,
          "evidence": "derived-from-sourced-component-grammar",
          "component_content_region": true,
          "selector": "[data-component-theme-appearance=\"default.open-ink-outline\"]"
        }
      ],
      "default_rule_profile": {
        "archetype": "annotated-process",
        "identity_policy": "relation-first",
        "pattern_evidence": [
          {
            "layout_id": "J3",
            "catalog_spec": "native:101",
            "observation": "关系类优先把主路径与关键里程碑作为身份锚点"
          },
          {
            "layout_id": "H2",
            "catalog_spec": "native:97",
            "observation": "开放纸面是默认材料，只有真实有界卡片才使用白色面"
          }
        ],
        "rule": "注释流程仅三个连接箭头使用身份色，节点与注释保持开放墨线"
      },
      "thumbnail_policy": "catalog-card"
    },
    "atlas.030.process.arrow": {
      "component_id": "atlas.030.process.arrow",
      "catalog_spec": "atlas:30",
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        },
        {
          "binding_id": "arrow-steps",
          "source_selector": ".process-chain[data-type=\"arrow\"] .step",
          "material": "panel",
          "expected_count": 3,
          "evidence": "user-approved-neutral-surface",
          "selector": "[data-component-theme-material=\"panel\"]"
        }
      ],
      "identity_groups": [],
      "appearance_bindings": [
        {
          "binding_id": "arrow-step-ink",
          "source_selector": ".process-chain[data-type=\"arrow\"] .step",
          "treatment": "default.ink-current-color",
          "expected_count": 3,
          "evidence": "derived-from-sourced-component-grammar",
          "selector": "[data-component-theme-appearance=\"default.ink-current-color\"]"
        }
      ],
      "default_rule_profile": {
        "archetype": "arrow-process",
        "identity_policy": "neutral-only",
        "pattern_evidence": [
          {
            "layout_id": "H2",
            "catalog_spec": "native:97",
            "observation": "彩色主题中真实有界容器使用白面和墨色边界"
          }
        ],
        "rule": "箭头流程按用户验收固定为白底墨线，不使用身份色"
      },
      "neutral_only": true,
      "thumbnail_policy": "catalog-card"
    },
    "atlas.031.process.arrow": {
      "component_id": "atlas.031.process.arrow",
      "catalog_spec": "atlas:31",
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        },
        {
          "binding_id": "arrow-steps",
          "source_selector": ".process-chain[data-type=\"arrow\"] .step",
          "material": "panel",
          "expected_count": 4,
          "evidence": "family-consistent-neutral-surface",
          "selector": "[data-component-theme-material=\"panel\"]"
        }
      ],
      "identity_groups": [],
      "appearance_bindings": [
        {
          "binding_id": "arrow-step-ink",
          "source_selector": ".process-chain[data-type=\"arrow\"] .step",
          "treatment": "default.ink-current-color",
          "expected_count": 4,
          "evidence": "derived-from-sourced-component-grammar",
          "selector": "[data-component-theme-appearance=\"default.ink-current-color\"]"
        }
      ],
      "default_rule_profile": {
        "archetype": "arrow-process",
        "identity_policy": "neutral-only",
        "pattern_evidence": [
          {
            "layout_id": "H2",
            "catalog_spec": "native:97",
            "observation": "彩色主题中真实有界容器使用白面和墨色边界"
          }
        ],
        "rule": "同一箭头流程家族统一为白底墨线，不使用身份色"
      },
      "neutral_only": true,
      "thumbnail_policy": "catalog-card"
    },
    "atlas.032.process.annotated-arrow": {
      "component_id": "atlas.032.process.annotated-arrow",
      "catalog_spec": "atlas:32",
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        },
        {
          "binding_id": "arrow-step-nodes",
          "source_selector": ".process-annotated-grid--arrow .step-node",
          "material": "panel",
          "expected_count": 4,
          "evidence": "family-consistent-neutral-surface",
          "selector": "[data-component-theme-material=\"panel\"]"
        }
      ],
      "identity_groups": [],
      "appearance_bindings": [
        {
          "binding_id": "arrow-node-ink",
          "source_selector": ".process-annotated-grid--arrow .step-node",
          "treatment": "default.ink-current-color",
          "expected_count": 4,
          "evidence": "derived-from-sourced-component-grammar",
          "selector": "[data-component-theme-appearance=\"default.ink-current-color\"]"
        },
        {
          "binding_id": "arrow-caption-open",
          "source_selector": ".process-annotated-grid--arrow > div:nth-of-type(n+5)",
          "treatment": "default.open-ink-outline",
          "expected_count": 4,
          "evidence": "derived-from-sourced-component-grammar",
          "component_content_region": true,
          "selector": "[data-component-theme-appearance=\"default.open-ink-outline\"]"
        }
      ],
      "default_rule_profile": {
        "archetype": "annotated-arrow-process",
        "identity_policy": "neutral-only",
        "pattern_evidence": [
          {
            "layout_id": "H2",
            "catalog_spec": "native:97",
            "observation": "彩色主题中真实有界容器使用白面和墨色边界"
          },
          {
            "layout_id": "H2",
            "catalog_spec": "native:97",
            "observation": "开放纸面是默认材料，只有真实有界卡片才使用白色面"
          }
        ],
        "rule": "带注释的箭头流程与同家族一致：步骤白底墨线，注释开放"
      },
      "neutral_only": true,
      "thumbnail_policy": "catalog-card"
    },
    "atlas.034.process-loop.triangle": {
      "component_id": "atlas.034.process-loop.triangle",
      "catalog_spec": "atlas:34",
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.cycle-path",
          "label": "循环轨道与箭头",
          "members": [
            {
              "source_selector": ".cycle-track",
              "treatment": "identity.stroke",
              "expected_count": 1,
              "evidence": "derived-from-sourced-component-grammar",
              "selector": "[data-component-theme-group=\"identity.cycle-path\"]"
            },
            {
              "source_selector": ".cycle-arrow",
              "treatment": "identity.fill",
              "expected_count": 1,
              "evidence": "derived-from-sourced-component-grammar",
              "selector": "[data-component-theme-group=\"identity.cycle-path\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [
        {
          "binding_id": "cycle-ink-nodes",
          "source_selector": ".loop-item",
          "treatment": "default.ink-current-color",
          "expected_count": 3,
          "evidence": "derived-from-sourced-component-grammar",
          "selector": "[data-component-theme-appearance=\"default.ink-current-color\"]"
        }
      ],
      "default_rule_profile": {
        "archetype": "cycle",
        "identity_policy": "relation-first",
        "pattern_evidence": [
          {
            "layout_id": "J1",
            "catalog_spec": "native:100",
            "observation": "循环类强调环路或中心，不给每个节点染色"
          }
        ],
        "rule": "循环仅强调环轨与方向箭头，三个节点保持墨色"
      },
      "thumbnail_policy": "catalog-card"
    },
    "atlas.035.process-loop.quad": {
      "component_id": "atlas.035.process-loop.quad",
      "catalog_spec": "atlas:35",
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.cycle-path",
          "label": "循环轨道与箭头",
          "members": [
            {
              "source_selector": ".cycle-track",
              "treatment": "identity.stroke",
              "expected_count": 1,
              "evidence": "derived-from-sourced-component-grammar",
              "selector": "[data-component-theme-group=\"identity.cycle-path\"]"
            },
            {
              "source_selector": ".cycle-arrow",
              "treatment": "identity.fill",
              "expected_count": 2,
              "evidence": "derived-from-sourced-component-grammar",
              "selector": "[data-component-theme-group=\"identity.cycle-path\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [
        {
          "binding_id": "cycle-ink-nodes",
          "source_selector": ".loop-item",
          "treatment": "default.ink-current-color",
          "expected_count": 4,
          "evidence": "derived-from-sourced-component-grammar",
          "selector": "[data-component-theme-appearance=\"default.ink-current-color\"]"
        }
      ],
      "default_rule_profile": {
        "archetype": "cycle",
        "identity_policy": "relation-first",
        "pattern_evidence": [
          {
            "layout_id": "J1",
            "catalog_spec": "native:100",
            "observation": "循环类强调环路或中心，不给每个节点染色"
          }
        ],
        "rule": "四节点循环仅强调环轨与方向箭头，节点保持墨色"
      },
      "thumbnail_policy": "catalog-card"
    },
    "atlas.036.process-loop.pentagon": {
      "component_id": "atlas.036.process-loop.pentagon",
      "catalog_spec": "atlas:36",
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.cycle-path",
          "label": "循环轨道与箭头",
          "members": [
            {
              "source_selector": ".cycle-track",
              "treatment": "identity.stroke",
              "expected_count": 1,
              "evidence": "derived-from-sourced-component-grammar",
              "selector": "[data-component-theme-group=\"identity.cycle-path\"]"
            },
            {
              "source_selector": ".cycle-arrow",
              "treatment": "identity.fill",
              "expected_count": 2,
              "evidence": "derived-from-sourced-component-grammar",
              "selector": "[data-component-theme-group=\"identity.cycle-path\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [
        {
          "binding_id": "cycle-ink-nodes",
          "source_selector": ".loop-item",
          "treatment": "default.ink-current-color",
          "expected_count": 5,
          "evidence": "derived-from-sourced-component-grammar",
          "selector": "[data-component-theme-appearance=\"default.ink-current-color\"]"
        }
      ],
      "default_rule_profile": {
        "archetype": "cycle",
        "identity_policy": "relation-first",
        "pattern_evidence": [
          {
            "layout_id": "J1",
            "catalog_spec": "native:100",
            "observation": "循环类强调环路或中心，不给每个节点染色"
          }
        ],
        "rule": "五节点循环仅强调环轨与方向箭头，节点保持墨色"
      },
      "thumbnail_policy": "catalog-card"
    },
    "atlas.037.process-loop.closed-loop": {
      "component_id": "atlas.037.process-loop.closed-loop",
      "catalog_spec": "atlas:37",
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.cycle-path",
          "label": "闭环轨道与箭头",
          "members": [
            {
              "source_selector": ".cycle-track",
              "treatment": "identity.stroke",
              "expected_count": 1,
              "evidence": "derived-from-sourced-component-grammar",
              "selector": "[data-component-theme-group=\"identity.cycle-path\"]"
            },
            {
              "source_selector": ".cycle-arrow",
              "treatment": "identity.fill",
              "expected_count": 4,
              "evidence": "derived-from-sourced-component-grammar",
              "selector": "[data-component-theme-group=\"identity.cycle-path\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [
        {
          "binding_id": "cycle-ink-nodes",
          "source_selector": ".loop-item",
          "treatment": "default.ink-current-color",
          "expected_count": 4,
          "evidence": "derived-from-sourced-component-grammar",
          "selector": "[data-component-theme-appearance=\"default.ink-current-color\"]"
        }
      ],
      "default_rule_profile": {
        "archetype": "closed-cycle",
        "identity_policy": "relation-first",
        "pattern_evidence": [
          {
            "layout_id": "J1",
            "catalog_spec": "native:100",
            "observation": "循环类强调环路或中心，不给每个节点染色"
          }
        ],
        "rule": "闭环仅强调完整环轨与四个方向箭头，节点保持墨色"
      },
      "thumbnail_policy": "catalog-card"
    },
    "atlas.038.journey": {
      "component_id": "atlas.038.journey",
      "catalog_spec": "atlas:38",
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.journey-path",
          "label": "旅程主路径与决策里程碑",
          "members": [
            {
              "source_selector": ".journey-track",
              "treatment": "identity.stroke",
              "expected_count": 1,
              "evidence": "derived-from-sourced-component-grammar",
              "selector": "[data-component-theme-group=\"identity.journey-path\"]"
            },
            {
              "source_selector": ".journey-point--milestone .journey-ring",
              "treatment": "identity.stroke",
              "expected_count": 1,
              "evidence": "derived-from-sourced-component-grammar",
              "selector": "[data-component-theme-group=\"identity.journey-path\"]"
            },
            {
              "source_selector": ".journey-point--milestone .journey-core",
              "treatment": "identity.fill",
              "expected_count": 1,
              "evidence": "derived-from-sourced-component-grammar",
              "selector": "[data-component-theme-group=\"identity.journey-path\"]"
            },
            {
              "source_selector": ".journey-badge-text",
              "treatment": "identity.text",
              "expected_count": 1,
              "evidence": "derived-from-sourced-component-grammar",
              "selector": "[data-component-theme-group=\"identity.journey-path\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [
        {
          "binding_id": "journey-open-badge",
          "source_selector": ".journey-badge-bg",
          "treatment": "default.open-surface",
          "expected_count": 1,
          "evidence": "derived-from-sourced-component-grammar",
          "selector": "[data-component-theme-appearance=\"default.open-surface\"]"
        },
        {
          "binding_id": "journey-peer-rings",
          "source_selector": ".journey-point:not(.journey-point--milestone) .journey-ring",
          "treatment": "default.ink-stroke",
          "expected_count": 4,
          "evidence": "derived-from-sourced-component-grammar",
          "selector": "[data-component-theme-appearance=\"default.ink-stroke\"]"
        },
        {
          "binding_id": "journey-peer-cores",
          "source_selector": ".journey-point:not(.journey-point--milestone) .journey-core",
          "treatment": "default.ink-fill",
          "expected_count": 4,
          "evidence": "derived-from-sourced-component-grammar",
          "selector": "[data-component-theme-appearance=\"default.ink-fill\"]"
        }
      ],
      "default_rule_profile": {
        "archetype": "journey",
        "identity_policy": "relation-first",
        "pattern_evidence": [
          {
            "layout_id": "J3",
            "catalog_spec": "native:101",
            "observation": "关系类优先把主路径与关键里程碑作为身份锚点"
          }
        ],
        "rule": "旅程图以主路径、里程碑与已存在的决策标签建立身份，其他节点保持墨阶"
      },
      "thumbnail_policy": "catalog-card"
    },
    "atlas.039.timeline": {
      "component_id": "atlas.039.timeline",
      "catalog_spec": null,
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [],
      "identity_groups": [],
      "appearance_bindings": [],
      "thumbnail_policy": "none-route-only"
    },
    "atlas.040.timeline.vertical": {
      "component_id": "atlas.040.timeline.vertical",
      "catalog_spec": null,
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [],
      "identity_groups": [],
      "appearance_bindings": [],
      "thumbnail_policy": "none-route-only"
    },
    "atlas.041.timeline.horizontal": {
      "component_id": "atlas.041.timeline.horizontal",
      "catalog_spec": null,
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [],
      "identity_groups": [],
      "appearance_bindings": [],
      "thumbnail_policy": "none-route-only"
    },
    "atlas.042.gantt": {
      "component_id": "atlas.042.gantt",
      "catalog_spec": "atlas:42",
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [],
      "appearance_bindings": [
        {
          "binding_id": "gantt-neutral-bars",
          "source_selector": ".gantt .task-bar .fill",
          "treatment": "default.ink-fill-55",
          "expected_count": 4,
          "evidence": "derived-from-sourced-component-grammar",
          "selector": "[data-component-theme-appearance=\"default.ink-fill-55\"]"
        }
      ],
      "default_rule_profile": {
        "archetype": "gantt",
        "identity_policy": "neutral-data",
        "pattern_evidence": [
          {
            "layout_id": "U2",
            "catalog_spec": "native:130",
            "observation": "数据与表格优先使用中性墨阶，可以没有身份色"
          },
          {
            "layout_id": "C7",
            "catalog_spec": "native:98",
            "observation": "图表数据本身保持墨阶，只有可证明的语义标题使用身份色"
          }
        ],
        "rule": "甘特图的任务长度是数据，全部使用中性墨阶，不伪造重点"
      },
      "thumbnail_policy": "catalog-card"
    },
    "atlas.043.concentric": {
      "component_id": "atlas.043.concentric",
      "catalog_spec": "atlas:43",
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.inner-layer",
          "label": "数据内层边界",
          "members": [
            {
              "source_selector": ".concentric .layer-1",
              "treatment": "identity.border",
              "expected_count": 1,
              "evidence": "derived-from-sourced-component-grammar",
              "selector": "[data-component-theme-group=\"identity.inner-layer\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [
        {
          "binding_id": "outer-layer-ink",
          "source_selector": ".concentric .layer-2, .concentric .layer-3",
          "treatment": "default.ink-current-color",
          "expected_count": 2,
          "evidence": "derived-from-sourced-component-grammar",
          "selector": "[data-component-theme-appearance=\"default.ink-current-color\"]"
        }
      ],
      "default_rule_profile": {
        "archetype": "concentric",
        "identity_policy": "root-or-center",
        "pattern_evidence": [
          {
            "layout_id": "H1",
            "catalog_spec": "native:103",
            "observation": "嵌套类只突出最内层，外层保持墨线"
          }
        ],
        "rule": "同心层级只突出最内层，外两层保持墨线"
      },
      "thumbnail_policy": "catalog-card"
    },
    "atlas.044.concentric.align-center": {
      "component_id": "atlas.044.concentric.align-center",
      "catalog_spec": "atlas:44",
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.inner-layer",
          "label": "内核边界",
          "members": [
            {
              "source_selector": ".concentric .layer-1",
              "treatment": "identity.border",
              "expected_count": 1,
              "evidence": "derived-from-sourced-component-grammar",
              "selector": "[data-component-theme-group=\"identity.inner-layer\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [
        {
          "binding_id": "outer-layer-ink",
          "source_selector": ".concentric .layer-2, .concentric .layer-3",
          "treatment": "default.ink-current-color",
          "expected_count": 2,
          "evidence": "derived-from-sourced-component-grammar",
          "selector": "[data-component-theme-appearance=\"default.ink-current-color\"]"
        }
      ],
      "default_rule_profile": {
        "archetype": "concentric",
        "identity_policy": "root-or-center",
        "pattern_evidence": [
          {
            "layout_id": "H1",
            "catalog_spec": "native:103",
            "observation": "嵌套类只突出最内层，外层保持墨线"
          }
        ],
        "rule": "同心层级只突出最内层，外两层保持墨线"
      },
      "thumbnail_policy": "catalog-card"
    },
    "atlas.045.concentric.center-text-bottom": {
      "component_id": "atlas.045.concentric.center-text-bottom",
      "catalog_spec": null,
      "mode": "inherit",
      "inherit_from": "atlas.043.concentric",
      "source_layout": null,
      "material_bindings": [],
      "identity_groups": [],
      "appearance_bindings": [],
      "thumbnail_policy": "none-route-only"
    },
    "atlas.046.concentric.align-top": {
      "component_id": "atlas.046.concentric.align-top",
      "catalog_spec": "atlas:46",
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.inner-layer",
          "label": "内核边界",
          "members": [
            {
              "source_selector": ".concentric .layer-1",
              "treatment": "identity.border",
              "expected_count": 1,
              "evidence": "derived-from-sourced-component-grammar",
              "selector": "[data-component-theme-group=\"identity.inner-layer\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [
        {
          "binding_id": "outer-layer-ink",
          "source_selector": ".concentric .layer-2, .concentric .layer-3",
          "treatment": "default.ink-current-color",
          "expected_count": 2,
          "evidence": "derived-from-sourced-component-grammar",
          "selector": "[data-component-theme-appearance=\"default.ink-current-color\"]"
        }
      ],
      "default_rule_profile": {
        "archetype": "concentric",
        "identity_policy": "root-or-center",
        "pattern_evidence": [
          {
            "layout_id": "H1",
            "catalog_spec": "native:103",
            "observation": "嵌套类只突出最内层，外层保持墨线"
          }
        ],
        "rule": "顶对齐同心层级只突出最内层，外两层保持墨线"
      },
      "thumbnail_policy": "catalog-card"
    },
    "atlas.047.concentric.align-bottom": {
      "component_id": "atlas.047.concentric.align-bottom",
      "catalog_spec": "atlas:47",
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.inner-layer",
          "label": "内核边界",
          "members": [
            {
              "source_selector": ".concentric .layer-1",
              "treatment": "identity.border",
              "expected_count": 1,
              "evidence": "derived-from-sourced-component-grammar",
              "selector": "[data-component-theme-group=\"identity.inner-layer\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [
        {
          "binding_id": "outer-layer-ink",
          "source_selector": ".concentric .layer-2, .concentric .layer-3",
          "treatment": "default.ink-current-color",
          "expected_count": 2,
          "evidence": "derived-from-sourced-component-grammar",
          "selector": "[data-component-theme-appearance=\"default.ink-current-color\"]"
        }
      ],
      "default_rule_profile": {
        "archetype": "concentric",
        "identity_policy": "root-or-center",
        "pattern_evidence": [
          {
            "layout_id": "H1",
            "catalog_spec": "native:103",
            "observation": "嵌套类只突出最内层，外层保持墨线"
          }
        ],
        "rule": "底对齐同心层级只突出最内层，外两层保持墨线"
      },
      "thumbnail_policy": "catalog-card"
    },
    "atlas.048.pyramid": {
      "component_id": "atlas.048.pyramid",
      "catalog_spec": "atlas:48",
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        },
        {
          "binding_id": "pyramid-levels",
          "source_selector": ".pyramid .level",
          "material": "panel",
          "expected_count": 5,
          "evidence": "user-approved-neutral-surface",
          "selector": "[data-component-theme-material=\"panel\"]"
        }
      ],
      "identity_groups": [],
      "appearance_bindings": [
        {
          "binding_id": "pyramid-level-lines",
          "source_selector": ".pyramid .level",
          "treatment": "default.ink-current-color",
          "expected_count": 5,
          "evidence": "derived-from-sourced-component-grammar",
          "selector": "[data-component-theme-appearance=\"default.ink-current-color\"]"
        }
      ],
      "default_rule_profile": {
        "archetype": "pyramid",
        "identity_policy": "neutral-only",
        "pattern_evidence": [
          {
            "layout_id": "H2",
            "catalog_spec": "native:97",
            "observation": "彩色主题中真实有界容器使用白面和墨色边界"
          }
        ],
        "rule": "正金字塔按用户验收固定为五层白底墨色轮廓，不使用身份色"
      },
      "neutral_only": true,
      "thumbnail_policy": "catalog-card"
    },
    "atlas.049.pyramid.inverted": {
      "component_id": "atlas.049.pyramid.inverted",
      "catalog_spec": "atlas:49",
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        },
        {
          "binding_id": "pyramid-levels",
          "source_selector": ".pyramid .level",
          "material": "panel",
          "expected_count": 5,
          "evidence": "family-consistent-neutral-surface",
          "selector": "[data-component-theme-material=\"panel\"]"
        }
      ],
      "identity_groups": [],
      "appearance_bindings": [
        {
          "binding_id": "pyramid-level-lines",
          "source_selector": ".pyramid .level",
          "treatment": "default.ink-current-color",
          "expected_count": 5,
          "evidence": "derived-from-sourced-component-grammar",
          "selector": "[data-component-theme-appearance=\"default.ink-current-color\"]"
        }
      ],
      "default_rule_profile": {
        "archetype": "pyramid",
        "identity_policy": "neutral-only",
        "pattern_evidence": [
          {
            "layout_id": "H2",
            "catalog_spec": "native:97",
            "observation": "彩色主题中真实有界容器使用白面和墨色边界"
          }
        ],
        "rule": "倒金字塔与同家族一致：五层白底墨色轮廓，不使用身份色"
      },
      "neutral_only": true,
      "thumbnail_policy": "catalog-card"
    },
    "atlas.050.fishbone": {
      "component_id": "atlas.050.fishbone",
      "catalog_spec": "atlas:50",
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.effect-target",
          "label": "结果端",
          "members": [
            {
              "source_selector": ".fb-effect",
              "treatment": "identity.stroke",
              "expected_count": 1,
              "evidence": "derived-from-sourced-component-grammar",
              "selector": "[data-component-theme-group=\"identity.effect-target\"]"
            },
            {
              "source_selector": "text",
              "treatment": "identity.text",
              "expected_count": 2,
              "evidence": "derived-from-sourced-component-grammar",
              "text_pattern": "^(?:结果|EFFECT)$",
              "selector": "[data-component-theme-group=\"identity.effect-target\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [],
      "default_rule_profile": {
        "archetype": "fishbone",
        "identity_policy": "semantic-target",
        "pattern_evidence": [
          {
            "layout_id": "E6",
            "catalog_spec": "native:77",
            "observation": "对比类只标记语义明确的目标侧"
          },
          {
            "layout_id": "J3",
            "catalog_spec": "native:101",
            "observation": "关系类优先把主路径与关键里程碑作为身份锚点"
          }
        ],
        "rule": "鱼骨图仅突出结果端的边界与标签，主骨和全部原因保持墨线"
      },
      "thumbnail_policy": "catalog-card"
    },
    "atlas.051.iceberg": {
      "component_id": "atlas.051.iceberg",
      "catalog_spec": "atlas:51",
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [],
      "appearance_bindings": [],
      "default_rule_profile": {
        "archetype": "iceberg",
        "identity_policy": "neutral-data",
        "pattern_evidence": [
          {
            "layout_id": "U2",
            "catalog_spec": "native:130",
            "observation": "数据与表格优先使用中性墨阶，可以没有身份色"
          },
          {
            "layout_id": "H2",
            "catalog_spec": "native:97",
            "observation": "开放纸面是默认材料，只有真实有界卡片才使用白色面"
          }
        ],
        "rule": "冰山的明度、纹理和百分比都是数据结构，使用中性墨阶且不伪造重点"
      },
      "thumbnail_policy": "catalog-card"
    },
    "atlas.052.venn.double": {
      "component_id": "atlas.052.venn.double",
      "catalog_spec": "atlas:52",
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.venn-outlines",
          "label": "两集合边界",
          "members": [
            {
              "source_selector": ".venn .v-circle",
              "treatment": "identity.border",
              "expected_count": 2,
              "evidence": "derived-from-sourced-component-grammar",
              "selector": "[data-component-theme-group=\"identity.venn-outlines\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [],
      "default_rule_profile": {
        "archetype": "venn",
        "identity_policy": "semantic-peers",
        "pattern_evidence": [
          {
            "layout_id": "Q1",
            "catalog_spec": "atlas:53",
            "observation": "维恩集合的对等边界作为同一身份组"
          }
        ],
        "rule": "两个对等集合边界共用同一身份组，与 Q1 三集合规则一致"
      },
      "thumbnail_policy": "catalog-card"
    },
    "atlas.053.venn.three": {
      "component_id": "atlas.053.venn.three",
      "catalog_spec": "atlas:53",
      "mode": "layout-default",
      "inherit_from": null,
      "source_layout": {
        "layout_id": "wise-ppt.layout.relationship.Q1",
        "display_code": "Q1",
        "layout_contract": "wise-ppt-layout-theme-bindings@3",
        "frame_contract": "wise-ppt-catalog-theme-frames@6",
        "comparison_scope": "structure-and-provenance-only",
        "evidence": "layout-embeds-same-component",
        "source_ref": "references/gallery-paper-ink/ai/frames/layout-q1.html",
        "source_regions": [
          "q1-component"
        ],
        "extraction": "same-component",
        "frame_paths": {
          "hermes-orange": "themes/catalog-projections/hermes-klein/frames/hermes-orange/layout-q1.html",
          "klein-blue": "themes/catalog-projections/hermes-klein/frames/klein-blue/layout-q1.html"
        },
        "identity_projection": "component-localized-from-source-region"
      },
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.venn-outlines",
          "label": "三集合轮廓",
          "members": [
            {
              "source_selector": ".circle.circle-a, .circle.circle-b, .circle.circle-c",
              "treatment": "identity.border",
              "expected_count": 3,
              "layout_selector": "#q1-component .circle.circle-a, #q1-component .circle.circle-b, #q1-component .circle.circle-c",
              "evidence": "source-region-identity-anchor",
              "selector": "[data-component-theme-group=\"identity.venn-outlines\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [
        {
          "binding_id": "venn-outline-weight",
          "source_selector": ".circle.circle-a, .circle.circle-b, .circle.circle-c",
          "treatment": "source.identity-border-2",
          "expected_count": 3,
          "layout_selector": "#q1-component .circle.circle-a, #q1-component .circle.circle-b, #q1-component .circle.circle-c",
          "evidence": "source-region-appearance-anchor",
          "selector": "[data-component-theme-appearance=\"source.identity-border-2\"]"
        }
      ],
      "thumbnail_policy": "catalog-card"
    },
    "atlas.054.architecture": {
      "component_id": "atlas.054.architecture",
      "catalog_spec": "atlas:54",
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.architecture-labels",
          "label": "四个架构层标签",
          "members": [
            {
              "source_selector": ".arch-platform .ap-label",
              "treatment": "identity.text",
              "expected_count": 4,
              "evidence": "derived-from-sourced-component-grammar",
              "selector": "[data-component-theme-group=\"identity.architecture-labels\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [
        {
          "binding_id": "architecture-module-lines",
          "source_selector": ".arch-platform .ap-chip",
          "treatment": "default.open-ink-outline",
          "expected_count": 12,
          "evidence": "derived-from-sourced-component-grammar",
          "selector": "[data-component-theme-appearance=\"default.open-ink-outline\"]"
        }
      ],
      "default_rule_profile": {
        "archetype": "architecture",
        "identity_policy": "semantic-peers",
        "pattern_evidence": [
          {
            "layout_id": "H3",
            "catalog_spec": "native:82",
            "observation": "架构类使用层级编号或边界标签建立身份，模块本体保持中性"
          },
          {
            "layout_id": "S1",
            "catalog_spec": "atlas:55",
            "observation": "完整架构栈用单一层级轨道建立身份，内部模块不铺满主题色"
          }
        ],
        "rule": "四层架构仅层级标签使用身份色，十二个模块保持墨线"
      },
      "thumbnail_policy": "catalog-card"
    },
    "atlas.055.arch-platform": {
      "component_id": "atlas.055.arch-platform",
      "catalog_spec": "atlas:55",
      "mode": "layout-default",
      "inherit_from": null,
      "source_layout": {
        "layout_id": "wise-ppt.layout.relationship.S1",
        "display_code": "S1",
        "layout_contract": "wise-ppt-layout-theme-bindings@3",
        "frame_contract": "wise-ppt-catalog-theme-frames@6",
        "comparison_scope": "structure-and-provenance-only",
        "evidence": "layout-embeds-same-component",
        "source_ref": "references/gallery-paper-ink/ai/frames/layout-s1.html",
        "source_regions": [
          "architecture-slot"
        ],
        "extraction": "same-component",
        "frame_paths": {
          "hermes-orange": "themes/catalog-projections/hermes-klein/frames/hermes-orange/layout-s1.html",
          "klein-blue": "themes/catalog-projections/hermes-klein/frames/klein-blue/layout-s1.html"
        },
        "identity_projection": "component-localized-from-source-region"
      },
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        },
        {
          "binding_id": "architecture-face",
          "source_selector": ".arch-platform",
          "material": "transparent",
          "expected_count": 1,
          "layout_selector": "#architecture-slot .arch-platform",
          "evidence": "source-region-material-anchor",
          "selector": "[data-component-theme-material=\"transparent\"]"
        },
        {
          "binding_id": "layer-labels",
          "source_selector": ".arch-tone-label",
          "material": "transparent",
          "expected_count": 5,
          "layout_selector": "#architecture-slot .arch-tone-label",
          "evidence": "source-region-material-anchor",
          "selector": "[data-component-theme-material=\"transparent\"]"
        },
        {
          "binding_id": "layer-bands",
          "source_selector": ".arch-tone-wrap",
          "material": "transparent",
          "expected_count": 5,
          "layout_selector": "#architecture-slot .arch-tone-wrap",
          "evidence": "source-region-material-anchor",
          "selector": "[data-component-theme-material=\"transparent\"]"
        },
        {
          "binding_id": "internal-cards",
          "source_selector": ".arch-tone-card",
          "material": "transparent",
          "expected_count": 7,
          "layout_selector": "#architecture-slot .arch-tone-card",
          "evidence": "source-region-material-anchor",
          "selector": "[data-component-theme-material=\"transparent\"]"
        },
        {
          "binding_id": "leaf-capabilities",
          "source_selector": ".arch-tone-fill",
          "material": "transparent",
          "expected_count": 39,
          "layout_selector": "#architecture-slot .arch-tone-fill",
          "evidence": "source-region-material-anchor",
          "selector": "[data-component-theme-material=\"transparent\"]"
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.architecture-navigation",
          "label": "关系节点与能力组标题",
          "members": [
            {
              "source_selector": ".arch-tone-node",
              "treatment": "identity.fill",
              "expected_count": 5,
              "layout_selector": "#architecture-slot .arch-tone-node",
              "evidence": "source-region-identity-anchor",
              "selector": "[data-component-theme-group=\"identity.architecture-navigation\"]"
            },
            {
              "source_selector": ".arch-tone-title",
              "treatment": "identity.text",
              "expected_count": 7,
              "layout_selector": "#architecture-slot .arch-tone-title",
              "evidence": "source-region-identity-anchor",
              "selector": "[data-component-theme-group=\"identity.architecture-navigation\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [],
      "thumbnail_policy": "catalog-card"
    },
    "atlas.056.arch-platform-complex-v": {
      "component_id": "atlas.056.arch-platform-complex-v",
      "catalog_spec": "atlas:56",
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.architecture-labels",
          "label": "五个架构层标签",
          "members": [
            {
              "source_selector": ".arch-complex-v .av-label",
              "treatment": "identity.text",
              "expected_count": 5,
              "evidence": "derived-from-sourced-component-grammar",
              "selector": "[data-component-theme-group=\"identity.architecture-labels\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [
        {
          "binding_id": "architecture-module-lines",
          "source_selector": ".arch-complex-v .av-chip, .arch-complex-v .av-card",
          "treatment": "default.open-ink-outline",
          "expected_count": 18,
          "evidence": "derived-from-sourced-component-grammar",
          "selector": "[data-component-theme-appearance=\"default.open-ink-outline\"]"
        }
      ],
      "default_rule_profile": {
        "archetype": "architecture",
        "identity_policy": "semantic-peers",
        "pattern_evidence": [
          {
            "layout_id": "H3",
            "catalog_spec": "native:82",
            "observation": "架构类使用层级编号或边界标签建立身份，模块本体保持中性"
          },
          {
            "layout_id": "S1",
            "catalog_spec": "atlas:55",
            "observation": "完整架构栈用单一层级轨道建立身份，内部模块不铺满主题色"
          }
        ],
        "rule": "五层复杂架构仅层级标签使用身份色，内部模块保持中性"
      },
      "thumbnail_policy": "catalog-card"
    },
    "atlas.057.mind-map.horizontal": {
      "component_id": "atlas.057.mind-map.horizontal",
      "catalog_spec": "atlas:57",
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.root-node",
          "label": "思维导图根节点",
          "members": [
            {
              "source_selector": ".mind-map .root-node",
              "treatment": "identity.functional-surface",
              "expected_count": 1,
              "evidence": "derived-from-sourced-component-grammar",
              "selector": "[data-component-theme-group=\"identity.root-node\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [
        {
          "binding_id": "mind-map-ink-lines",
          "source_selector": ".mind-map .mind-map-line",
          "treatment": "default.ink-stroke",
          "expected_count": 5,
          "evidence": "derived-from-sourced-component-grammar",
          "selector": "[data-component-theme-appearance=\"default.ink-stroke\"]"
        },
        {
          "binding_id": "mind-map-open-children",
          "source_selector": ".mind-map .node",
          "treatment": "default.open-ink-outline",
          "expected_count": 3,
          "evidence": "derived-from-sourced-component-grammar",
          "selector": "[data-component-theme-appearance=\"default.open-ink-outline\"]"
        }
      ],
      "default_rule_profile": {
        "archetype": "mind-map",
        "identity_policy": "root-or-center",
        "pattern_evidence": [
          {
            "layout_id": "G1",
            "catalog_spec": "native:96",
            "observation": "层级类只突出根节点或中枢"
          },
          {
            "layout_id": "J3",
            "catalog_spec": "native:101",
            "observation": "关系类优先把主路径与关键里程碑作为身份锚点"
          }
        ],
        "rule": "思维导图只突出根节点，分支连接线和子节点保持墨色"
      },
      "thumbnail_policy": "catalog-card"
    },
    "atlas.058.mind-map.vertical": {
      "component_id": "atlas.058.mind-map.vertical",
      "catalog_spec": "atlas:58",
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.root-node",
          "label": "思维导图根节点",
          "members": [
            {
              "source_selector": ".mind-map .root-node",
              "treatment": "identity.functional-surface",
              "expected_count": 1,
              "evidence": "derived-from-sourced-component-grammar",
              "selector": "[data-component-theme-group=\"identity.root-node\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [
        {
          "binding_id": "mind-map-ink-lines",
          "source_selector": ".mind-map .mind-map-line",
          "treatment": "default.ink-stroke",
          "expected_count": 5,
          "evidence": "derived-from-sourced-component-grammar",
          "selector": "[data-component-theme-appearance=\"default.ink-stroke\"]"
        },
        {
          "binding_id": "mind-map-open-children",
          "source_selector": ".mind-map .node",
          "treatment": "default.open-ink-outline",
          "expected_count": 3,
          "evidence": "derived-from-sourced-component-grammar",
          "selector": "[data-component-theme-appearance=\"default.open-ink-outline\"]"
        }
      ],
      "default_rule_profile": {
        "archetype": "mind-map",
        "identity_policy": "root-or-center",
        "pattern_evidence": [
          {
            "layout_id": "G1",
            "catalog_spec": "native:96",
            "observation": "层级类只突出根节点或中枢"
          },
          {
            "layout_id": "J3",
            "catalog_spec": "native:101",
            "observation": "关系类优先把主路径与关键里程碑作为身份锚点"
          }
        ],
        "rule": "竖向思维导图只突出根节点，分支连接线和子节点保持墨色"
      },
      "thumbnail_policy": "catalog-card"
    },
    "atlas.059.stats": {
      "component_id": "atlas.059.stats",
      "catalog_spec": "atlas:59",
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.metric-values",
          "label": "两个主指标值",
          "members": [
            {
              "source_selector": ".stat-card-value",
              "treatment": "identity.text",
              "expected_count": 2,
              "evidence": "derived-from-sourced-component-grammar",
              "selector": "[data-component-theme-group=\"identity.metric-values\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [],
      "default_rule_profile": {
        "archetype": "metric-cards",
        "identity_policy": "metric-key",
        "pattern_evidence": [
          {
            "layout_id": "D4",
            "catalog_spec": "native:62",
            "observation": "结构编号只在稳定导航标记上使用身份色"
          },
          {
            "layout_id": "U2",
            "catalog_spec": "native:130",
            "observation": "数据与表格优先使用中性墨阶，可以没有身份色"
          }
        ],
        "rule": "两张对等指标卡只将主数值作为身份锚点，趋势和说明保持墨阶"
      },
      "thumbnail_policy": "catalog-card"
    },
    "atlas.060.radar": {
      "component_id": "atlas.060.radar",
      "catalog_spec": null,
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [],
      "identity_groups": [],
      "appearance_bindings": [],
      "thumbnail_policy": "none-route-only"
    },
    "atlas.061.radar-hex": {
      "component_id": "atlas.061.radar-hex",
      "catalog_spec": null,
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [],
      "identity_groups": [],
      "appearance_bindings": [],
      "thumbnail_policy": "none-route-only"
    },
    "atlas.062.form-card.horizontal": {
      "component_id": "atlas.062.form-card.horizontal",
      "catalog_spec": null,
      "mode": "inherit",
      "inherit_from": "atlas.006.form-card",
      "source_layout": null,
      "material_bindings": [],
      "identity_groups": [],
      "appearance_bindings": [],
      "thumbnail_policy": "none-route-only"
    },
    "echarts.bar-basic": {
      "component_id": "echarts.bar-basic",
      "catalog_spec": "ec:echarts.bar-basic",
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [],
      "appearance_bindings": [],
      "default_rule_profile": {
        "archetype": "chart",
        "identity_policy": "neutral-data",
        "pattern_evidence": [
          {
            "layout_id": "U2",
            "catalog_spec": "native:130",
            "observation": "数据与表格优先使用中性墨阶，可以没有身份色"
          },
          {
            "layout_id": "C7",
            "catalog_spec": "native:98",
            "observation": "图表数据本身保持墨阶，只有可证明的语义标题使用身份色"
          }
        ],
        "rule": "柱状图数据使用中性墨阶，没有可证明标题时不使用身份色"
      },
      "thumbnail_policy": "catalog-card"
    },
    "echarts.bar-dynamic-sort": {
      "component_id": "echarts.bar-dynamic-sort",
      "catalog_spec": "ec:echarts.bar-dynamic-sort",
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [],
      "appearance_bindings": [],
      "default_rule_profile": {
        "archetype": "chart",
        "identity_policy": "neutral-data",
        "pattern_evidence": [
          {
            "layout_id": "U2",
            "catalog_spec": "native:130",
            "observation": "数据与表格优先使用中性墨阶，可以没有身份色"
          },
          {
            "layout_id": "C7",
            "catalog_spec": "native:98",
            "observation": "图表数据本身保持墨阶，只有可证明的语义标题使用身份色"
          }
        ],
        "rule": "动态排序柱图使用中性墨阶，不将第一系列伪造为重点"
      },
      "thumbnail_policy": "catalog-card"
    },
    "echarts.calendar-basic": {
      "component_id": "echarts.calendar-basic",
      "catalog_spec": "ec:echarts.calendar-basic",
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.semantic-title",
          "label": "日历图语义标题",
          "members": [
            {
              "source_selector": "title",
              "treatment": "identity.text",
              "expected_count": 1,
              "evidence": "derived-from-sourced-component-grammar",
              "option_path": "title",
              "option_property": "textStyle.color",
              "selector": "[data-component-theme-group=\"identity.semantic-title\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [],
      "default_rule_profile": {
        "archetype": "chart",
        "identity_policy": "existing-semantic-title",
        "pattern_evidence": [
          {
            "layout_id": "C7",
            "catalog_spec": "native:98",
            "observation": "图表数据本身保持墨阶，只有可证明的语义标题使用身份色"
          }
        ],
        "rule": "日历热力数据使用中性明度梯度，只保留已存在的语义标题为身份色"
      },
      "thumbnail_policy": "catalog-card"
    },
    "echarts.geo-choropleth-map": {
      "component_id": "echarts.geo-choropleth-map",
      "catalog_spec": "ec:echarts.geo-choropleth-map",
      "mode": "layout-default",
      "inherit_from": null,
      "source_layout": {
        "layout_id": "wise-ppt.layout.relationship.C4",
        "display_code": "C4",
        "layout_contract": "wise-ppt-layout-theme-bindings@3",
        "frame_contract": "wise-ppt-catalog-theme-frames@6",
        "comparison_scope": "structure-and-provenance-only",
        "evidence": "user-confirmed-style-reference",
        "source_ref": "references/gallery-paper-ink/ai/frames/layout-c4.html",
        "source_regions": [
          "chart"
        ],
        "extraction": "style-reference",
        "frame_paths": {
          "hermes-orange": "themes/catalog-projections/hermes-klein/frames/hermes-orange/layout-c4.html",
          "klein-blue": "themes/catalog-projections/hermes-klein/frames/klein-blue/layout-c4.html"
        },
        "identity_projection": "neutral-in-source-region"
      },
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [],
      "appearance_bindings": [],
      "chart_projection": {
        "policy": "source-functional-alpha-ramp",
        "evidence": "C4-current-default-map-style",
        "option_paths": {
          "data": "visualMap.pieces[0-5].color",
          "legend": "visualMap.inRange.color[0-4]"
        },
        "expected_counts": {
          "data": 6,
          "legend": 5
        },
        "alpha_ramps": {
          "data": [
            0.55,
            0.371,
            0.275,
            0.216,
            0.156,
            0.12
          ],
          "legend": [
            0.172,
            0.236,
            0.292,
            0.344,
            0.4
          ]
        }
      },
      "thumbnail_policy": "catalog-card"
    },
    "echarts.line-basic": {
      "component_id": "echarts.line-basic",
      "catalog_spec": "ec:echarts.line-basic",
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [],
      "appearance_bindings": [],
      "default_rule_profile": {
        "archetype": "chart",
        "identity_policy": "neutral-data",
        "pattern_evidence": [
          {
            "layout_id": "U2",
            "catalog_spec": "native:130",
            "observation": "数据与表格优先使用中性墨阶，可以没有身份色"
          },
          {
            "layout_id": "C7",
            "catalog_spec": "native:98",
            "observation": "图表数据本身保持墨阶，只有可证明的语义标题使用身份色"
          }
        ],
        "rule": "折线用墨阶、线型与节点形状区分，不将第一系列伪造为重点"
      },
      "thumbnail_policy": "catalog-card"
    },
    "echarts.line-smooth": {
      "component_id": "echarts.line-smooth",
      "catalog_spec": "ec:echarts.line-smooth",
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [],
      "appearance_bindings": [],
      "default_rule_profile": {
        "archetype": "chart",
        "identity_policy": "neutral-data",
        "pattern_evidence": [
          {
            "layout_id": "U2",
            "catalog_spec": "native:130",
            "observation": "数据与表格优先使用中性墨阶，可以没有身份色"
          },
          {
            "layout_id": "C7",
            "catalog_spec": "native:98",
            "observation": "图表数据本身保持墨阶，只有可证明的语义标题使用身份色"
          }
        ],
        "rule": "平滑折线使用中性墨阶和线型区分，不使用身份色"
      },
      "thumbnail_policy": "catalog-card"
    },
    "echarts.line-stacked": {
      "component_id": "echarts.line-stacked",
      "catalog_spec": "ec:echarts.line-stacked",
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [],
      "appearance_bindings": [],
      "default_rule_profile": {
        "archetype": "chart",
        "identity_policy": "neutral-data",
        "pattern_evidence": [
          {
            "layout_id": "U2",
            "catalog_spec": "native:130",
            "observation": "数据与表格优先使用中性墨阶，可以没有身份色"
          },
          {
            "layout_id": "C7",
            "catalog_spec": "native:98",
            "observation": "图表数据本身保持墨阶，只有可证明的语义标题使用身份色"
          }
        ],
        "rule": "堆叠折线使用中性墨阶与虚实线区分，不使用身份色"
      },
      "thumbnail_policy": "catalog-card"
    },
    "echarts.pie-access-source": {
      "component_id": "echarts.pie-access-source",
      "catalog_spec": "ec:echarts.pie-access-source",
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [],
      "appearance_bindings": [],
      "default_rule_profile": {
        "archetype": "chart",
        "identity_policy": "neutral-data",
        "pattern_evidence": [
          {
            "layout_id": "U2",
            "catalog_spec": "native:130",
            "observation": "数据与表格优先使用中性墨阶，可以没有身份色"
          },
          {
            "layout_id": "C7",
            "catalog_spec": "native:98",
            "observation": "图表数据本身保持墨阶，只有可证明的语义标题使用身份色"
          }
        ],
        "rule": "饼图保留数据梯度，但使用中性明度序列；多版式候选不构成唯一来源"
      },
      "source_review": {
        "status": "multi-source-candidate",
        "candidates": [
          {
            "layout_id": "Q2",
            "evidence": "layout-embeds-same-component"
          },
          {
            "layout_id": "S2",
            "evidence": "layout-embeds-same-component"
          }
        ]
      },
      "thumbnail_policy": "catalog-card"
    },
    "echarts.radar-basic": {
      "component_id": "echarts.radar-basic",
      "catalog_spec": "ec:echarts.radar-basic",
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [],
      "appearance_bindings": [],
      "default_rule_profile": {
        "archetype": "chart",
        "identity_policy": "neutral-data",
        "pattern_evidence": [
          {
            "layout_id": "U2",
            "catalog_spec": "native:130",
            "observation": "数据与表格优先使用中性墨阶，可以没有身份色"
          },
          {
            "layout_id": "C7",
            "catalog_spec": "native:98",
            "observation": "图表数据本身保持墨阶，只有可证明的语义标题使用身份色"
          }
        ],
        "rule": "雷达图使用中性轮廓与透明度层级，不使用身份色"
      },
      "thumbnail_policy": "catalog-card"
    },
    "echarts.sankey-basic": {
      "component_id": "echarts.sankey-basic",
      "catalog_spec": "ec:echarts.sankey-basic",
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [],
      "appearance_bindings": [],
      "default_rule_profile": {
        "archetype": "chart",
        "identity_policy": "neutral-data",
        "pattern_evidence": [
          {
            "layout_id": "U2",
            "catalog_spec": "native:130",
            "observation": "数据与表格优先使用中性墨阶，可以没有身份色"
          },
          {
            "layout_id": "C7",
            "catalog_spec": "native:98",
            "observation": "图表数据本身保持墨阶，只有可证明的语义标题使用身份色"
          }
        ],
        "rule": "桑基图节点和流带使用中性层级，不使用身份色"
      },
      "thumbnail_policy": "catalog-card"
    },
    "echarts.scatter-basic": {
      "component_id": "echarts.scatter-basic",
      "catalog_spec": "ec:echarts.scatter-basic",
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [],
      "appearance_bindings": [],
      "default_rule_profile": {
        "archetype": "chart",
        "identity_policy": "neutral-data",
        "pattern_evidence": [
          {
            "layout_id": "U2",
            "catalog_spec": "native:130",
            "observation": "数据与表格优先使用中性墨阶，可以没有身份色"
          },
          {
            "layout_id": "C7",
            "catalog_spec": "native:98",
            "observation": "图表数据本身保持墨阶，只有可证明的语义标题使用身份色"
          }
        ],
        "rule": "散点图使用中性节点与轮廓，不使用身份色"
      },
      "thumbnail_policy": "catalog-card"
    },
    "echarts.scatter-to-bar-anim": {
      "component_id": "echarts.scatter-to-bar-anim",
      "catalog_spec": null,
      "mode": "inherit",
      "inherit_from": "echarts.bar-dynamic-sort",
      "source_layout": null,
      "material_bindings": [],
      "identity_groups": [],
      "appearance_bindings": [],
      "thumbnail_policy": "none-route-only"
    },
    "echarts.tree-lr": {
      "component_id": "echarts.tree-lr",
      "catalog_spec": "ec:echarts.tree-lr",
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.semantic-title",
          "label": "树图根节点文字",
          "members": [
            {
              "source_selector": "series[0].data[0]",
              "treatment": "identity.text",
              "expected_count": 1,
              "evidence": "derived-from-sourced-component-grammar",
              "option_path": "series[0].data[0]",
              "option_property": "label.color",
              "selector": "[data-component-theme-group=\"identity.semantic-title\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [],
      "default_rule_profile": {
        "archetype": "chart",
        "identity_policy": "root-or-center",
        "pattern_evidence": [
          {
            "layout_id": "G1",
            "catalog_spec": "native:96",
            "observation": "层级类只突出根节点或中枢"
          },
          {
            "layout_id": "C7",
            "catalog_spec": "native:98",
            "observation": "图表数据本身保持墨阶，只有可证明的语义标题使用身份色"
          }
        ],
        "rule": "树图连线与子节点保持中性，只保留已存在的根节点文字为身份色"
      },
      "thumbnail_policy": "catalog-card"
    },
    "native.wise-ppt.062.agenda-ink": {
      "component_id": "native.wise-ppt.062.agenda-ink",
      "catalog_spec": "native:62",
      "mode": "layout-default",
      "inherit_from": null,
      "source_layout": {
        "layout_id": "wise-ppt.layout.nonrelationship.D4",
        "display_code": "D4",
        "layout_contract": "wise-ppt-layout-theme-bindings@3",
        "frame_contract": "wise-ppt-catalog-theme-frames@6",
        "comparison_scope": "structure-and-provenance-only",
        "evidence": "sourceLayout/sourceRegion",
        "source_ref": "references/gallery-paper-ink/ai/frames/layout-d4.html",
        "source_regions": [
          "draw"
        ],
        "extraction": "include-only",
        "frame_paths": {
          "hermes-orange": "themes/catalog-projections/hermes-klein/frames/hermes-orange/layout-d4.html",
          "klein-blue": "themes/catalog-projections/hermes-klein/frames/klein-blue/layout-d4.html"
        },
        "identity_projection": "component-localized-from-source-region"
      },
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.contents-heading",
          "label": "目录英文标题",
          "members": [
            {
              "source_selector": "[data-source-d4-role=\"contents\"]",
              "treatment": "identity.text",
              "expected_count": 1,
              "layout_selector": "#draw > g > text:first-of-type",
              "evidence": "source-region-identity-anchor",
              "selector": "[data-component-theme-group=\"identity.contents-heading\"]"
            }
          ]
        },
        {
          "group_id": "identity.toc-markers",
          "label": "目录序号与当前项引线",
          "members": [
            {
              "source_selector": "g[data-number-state=\"outline\"] > circle[data-number-part=\"disc\"]",
              "treatment": "identity.stroke",
              "expected_count": 4,
              "layout_selector": "#draw > g > g[data-number-state=\"outline\"] > circle[data-number-part=\"disc\"]",
              "evidence": "source-region-identity-anchor",
              "selector": "[data-component-theme-group=\"identity.toc-markers\"]"
            },
            {
              "source_selector": "[data-source-d4-role=\"current-disc\"]",
              "treatment": "identity.fill",
              "expected_count": 1,
              "layout_selector": "#draw > g > g[data-number-state=\"filled\"] > circle[data-number-part=\"disc\"]",
              "evidence": "source-region-identity-anchor",
              "selector": "[data-component-theme-group=\"identity.toc-markers\"]"
            },
            {
              "source_selector": "[data-source-d4-role=\"current-ring\"]",
              "treatment": "identity.stroke",
              "expected_count": 1,
              "layout_selector": "#draw > g > g[data-number-state=\"filled\"] > circle[data-number-part=\"outer-ring\"]",
              "evidence": "source-region-identity-anchor",
              "selector": "[data-component-theme-group=\"identity.toc-markers\"]"
            },
            {
              "source_selector": "[data-source-d4-role=\"current-rule\"]",
              "treatment": "identity.stroke",
              "expected_count": 1,
              "layout_selector": "#draw > g > line[x1=\"378\"][y1=\"418\"][x2=\"406\"][y2=\"418\"]",
              "evidence": "source-region-identity-anchor",
              "selector": "[data-component-theme-group=\"identity.toc-markers\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [
        {
          "binding_id": "agenda-current-number",
          "source_selector": "[data-source-d4-role=\"current-number\"]",
          "treatment": "source.surface-panel-text",
          "expected_count": 1,
          "layout_selector": "#draw > g > g[data-number-state=\"filled\"] > text[data-number-part=\"label\"]",
          "evidence": "source-region-appearance-anchor",
          "selector": "[data-component-theme-appearance=\"source.surface-panel-text\"]"
        }
      ],
      "thumbnail_policy": "catalog-card"
    },
    "native.wise-ppt.063.step-rise": {
      "component_id": "native.wise-ppt.063.step-rise",
      "catalog_spec": "native:63",
      "mode": "layout-default",
      "inherit_from": null,
      "source_layout": {
        "layout_id": "wise-ppt.layout.relationship.B5",
        "display_code": "B5",
        "layout_contract": "wise-ppt-layout-theme-bindings@3",
        "frame_contract": "wise-ppt-catalog-theme-frames@6",
        "comparison_scope": "structure-and-provenance-only",
        "evidence": "sourceLayout/sourceRegion",
        "source_ref": "references/gallery-paper-ink/ai/frames/layout-b5.html",
        "source_regions": [
          "stages"
        ],
        "extraction": "include-only",
        "frame_paths": {
          "hermes-orange": "themes/catalog-projections/hermes-klein/frames/hermes-orange/layout-b5.html",
          "klein-blue": "themes/catalog-projections/hermes-klein/frames/klein-blue/layout-b5.html"
        },
        "identity_projection": "component-localized-from-source-region"
      },
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        },
        {
          "binding_id": "stage-open-dots",
          "source_selector": "circle[fill*=\"paper-deep\"]",
          "material": "canvas",
          "expected_count": 5,
          "evidence": "source-region-material-anchor",
          "layout_selector": "#draw circle[r=\"5\"]",
          "layout_expected_count": 5,
          "selector": "[data-component-theme-material=\"canvas\"]"
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.stage-title-rules",
          "label": "五阶段标题短线",
          "members": [
            {
              "source_selector": "line[x1=\"250\"][x2=\"308\"][y1=\"712\"], line[x1=\"590\"][x2=\"648\"][y1=\"582\"], line[x1=\"930\"][x2=\"988\"][y1=\"452\"], line[x1=\"1270\"][x2=\"1328\"][y1=\"322\"], line[x1=\"1540\"][x2=\"1598\"][y1=\"198\"]",
              "treatment": "identity.stroke-strong",
              "expected_count": 5,
              "layout_selector": "#draw line[x1=\"250\"][x2=\"308\"][y1=\"712\"], #draw line[x1=\"590\"][x2=\"648\"][y1=\"582\"], #draw line[x1=\"930\"][x2=\"988\"][y1=\"452\"], #draw line[x1=\"1270\"][x2=\"1328\"][y1=\"322\"], #draw line[x1=\"1540\"][x2=\"1598\"][y1=\"198\"]",
              "layout_expected_count": 5,
              "evidence": "source-region-identity-anchor",
              "selector": "[data-component-theme-group=\"identity.stage-title-rules\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [],
      "thumbnail_policy": "catalog-card"
    },
    "native.wise-ppt.064.doc-excerpt": {
      "component_id": "native.wise-ppt.064.doc-excerpt",
      "catalog_spec": "native:64",
      "mode": "layout-default",
      "inherit_from": null,
      "source_layout": {
        "layout_id": "wise-ppt.layout.relationship.A3",
        "display_code": "A3",
        "layout_contract": "wise-ppt-layout-theme-bindings@3",
        "frame_contract": "wise-ppt-catalog-theme-frames@6",
        "comparison_scope": "structure-and-provenance-only",
        "evidence": "sourceLayout/sourceRegion",
        "source_ref": "references/gallery-paper-ink/ai/frames/layout-a3.html",
        "source_regions": [
          "excerpt"
        ],
        "extraction": "include-only",
        "frame_paths": {
          "hermes-orange": "themes/catalog-projections/hermes-klein/frames/hermes-orange/layout-a3.html",
          "klein-blue": "themes/catalog-projections/hermes-klein/frames/klein-blue/layout-a3.html"
        },
        "identity_projection": "neutral-in-source-region"
      },
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [],
      "appearance_bindings": [],
      "thumbnail_policy": "catalog-card"
    },
    "native.wise-ppt.065.official-doc": {
      "component_id": "native.wise-ppt.065.official-doc",
      "catalog_spec": "native:65",
      "mode": "layout-default",
      "inherit_from": null,
      "source_layout": {
        "layout_id": "wise-ppt.layout.relationship.A3",
        "display_code": "A3",
        "layout_contract": "wise-ppt-layout-theme-bindings@3",
        "frame_contract": "wise-ppt-catalog-theme-frames@6",
        "comparison_scope": "structure-and-provenance-only",
        "evidence": "sourceLayout/sourceRegion",
        "source_ref": "references/gallery-paper-ink/ai/frames/layout-a3.html",
        "source_regions": [
          "official-doc"
        ],
        "extraction": "include-only",
        "frame_paths": {
          "hermes-orange": "themes/catalog-projections/hermes-klein/frames/hermes-orange/layout-a3.html",
          "klein-blue": "themes/catalog-projections/hermes-klein/frames/klein-blue/layout-a3.html"
        },
        "identity_projection": "component-localized-from-source-region"
      },
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        },
        {
          "binding_id": "document-specimen",
          "source_selector": "rect[x=\"300\"][y=\"478\"][width=\"1320\"][height=\"396\"]",
          "material": "panel",
          "expected_count": 1,
          "evidence": "source-region-material-anchor",
          "layout_selector": "#draw > g > rect[x=\"300\"][y=\"478\"][width=\"1320\"][height=\"396\"]",
          "layout_expected_count": 1,
          "selector": "[data-component-theme-material=\"panel\"]"
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.document-stamp",
          "label": "公文印章双圈与签记",
          "members": [
            {
              "source_selector": "circle[cx=\"1530\"][cy=\"816\"]:is([r=\"20\"],[r=\"14\"]), path[d=\"M 1524 816 L 1528.5 821 L 1537 810\"]",
              "treatment": "identity.stroke",
              "expected_count": 3,
              "layout_selector": "#draw circle[cx=\"1530\"][cy=\"816\"]:is([r=\"20\"],[r=\"14\"]), #draw path[d=\"M 1524 816 L 1528.5 821 L 1537 810\"]",
              "layout_expected_count": 3,
              "evidence": "source-region-identity-anchor",
              "selector": "[data-component-theme-group=\"identity.document-stamp\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [
        {
          "binding_id": "document-outline",
          "source_selector": "rect[x=\"300\"][y=\"478\"][width=\"1320\"][height=\"396\"]",
          "treatment": "source.a3-document-outline",
          "expected_count": 1,
          "layout_selector": "#draw > g > rect[x=\"300\"][y=\"478\"][width=\"1320\"][height=\"396\"]",
          "layout_expected_count": 1,
          "evidence": "source-region-appearance-anchor",
          "selector": "[data-component-theme-appearance=\"source.a3-document-outline\"]"
        },
        {
          "binding_id": "document-source-label",
          "source_selector": "text",
          "text_pattern": "^SOURCE$",
          "treatment": "source.a3-source-label",
          "expected_count": 1,
          "layout_selector": "#draw text",
          "layout_expected_count": 1,
          "layout_text_pattern": "^SOURCE$",
          "evidence": "source-region-appearance-anchor",
          "selector": "[data-component-theme-appearance=\"source.a3-source-label\"]"
        }
      ],
      "thumbnail_policy": "catalog-card"
    },
    "native.wise-ppt.066.evidence-wall": {
      "component_id": "native.wise-ppt.066.evidence-wall",
      "catalog_spec": "native:66",
      "mode": "layout-default",
      "inherit_from": null,
      "source_layout": {
        "layout_id": "wise-ppt.layout.relationship.A4",
        "display_code": "A4",
        "layout_contract": "wise-ppt-layout-theme-bindings@3",
        "frame_contract": "wise-ppt-catalog-theme-frames@6",
        "comparison_scope": "structure-and-provenance-only",
        "evidence": "sourceLayout/sourceRegion",
        "source_ref": "references/gallery-paper-ink/ai/frames/layout-a4.html",
        "source_regions": [
          "evidence-wall"
        ],
        "extraction": "include-only",
        "frame_paths": {
          "hermes-orange": "themes/catalog-projections/hermes-klein/frames/hermes-orange/layout-a4.html",
          "klein-blue": "themes/catalog-projections/hermes-klein/frames/klein-blue/layout-a4.html"
        },
        "identity_projection": "neutral-in-source-region"
      },
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        },
        {
          "binding_id": "equal-evidence-cards",
          "source_selector": "rect[fill*=\"paper-panel\"]",
          "material": "panel",
          "expected_count": 4,
          "layout_selector": "#draw > g > rect[fill=\"var(--paper-panel)\"]",
          "evidence": "source-region-material-anchor",
          "selector": "[data-component-theme-material=\"panel\"]"
        }
      ],
      "identity_groups": [],
      "appearance_bindings": [
        {
          "binding_id": "equal-evidence-card-outlines",
          "source_selector": "rect[width=\"400\"][height=\"276\"]",
          "treatment": "source.ink-stroke",
          "expected_count": 4,
          "layout_selector": "#draw > g > rect[width=\"400\"][height=\"276\"]",
          "evidence": "source-region-appearance-anchor",
          "selector": "[data-component-theme-appearance=\"source.ink-stroke\"]"
        }
      ],
      "thumbnail_policy": "catalog-card"
    },
    "native.wise-ppt.067.logo-cloud": {
      "component_id": "native.wise-ppt.067.logo-cloud",
      "catalog_spec": "native:67",
      "mode": "layout-default",
      "inherit_from": null,
      "source_layout": {
        "layout_id": "wise-ppt.layout.relationship.R7",
        "display_code": "R7",
        "layout_contract": "wise-ppt-layout-theme-bindings@3",
        "frame_contract": "wise-ppt-catalog-theme-frames@6",
        "comparison_scope": "structure-and-provenance-only",
        "evidence": "sourceLayout/sourceRegion",
        "source_ref": "references/gallery-paper-ink/ai/frames/layout-r7.html",
        "source_regions": [
          "logo-wall"
        ],
        "extraction": "current-layout-successor",
        "frame_paths": {
          "hermes-orange": "themes/catalog-projections/hermes-klein/frames/hermes-orange/layout-r7.html",
          "klein-blue": "themes/catalog-projections/hermes-klein/frames/klein-blue/layout-r7.html"
        },
        "identity_projection": "component-localized-from-source-region"
      },
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.logo-accent-lines",
          "label": "品牌 Logo 内部点缀线",
          "members": [
            {
              "source_selector": "[data-r7-accent-mark]",
              "treatment": "identity.stroke",
              "expected_count": 8,
              "layout_selector": "[data-r7-accent-mark]",
              "evidence": "source-region-identity-anchor",
              "selector": "[data-component-theme-group=\"identity.logo-accent-lines\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [
        {
          "binding_id": "r7-brand-labels",
          "source_selector": "[data-r7-brand-name]",
          "treatment": "source.r7-brand-label",
          "expected_count": 28,
          "layout_selector": ".scene > g[data-slot-id] > .brand-name",
          "evidence": "source-region-appearance-anchor",
          "selector": "[data-component-theme-appearance=\"source.r7-brand-label\"]"
        },
        {
          "binding_id": "r7-accent-mark-weight",
          "source_selector": "[data-r7-accent-mark]",
          "treatment": "source.r7-accent-mark",
          "expected_count": 8,
          "layout_selector": "[data-r7-accent-mark]",
          "evidence": "source-region-appearance-anchor",
          "selector": "[data-component-theme-appearance=\"source.r7-accent-mark\"]"
        }
      ],
      "thumbnail_policy": "catalog-card"
    },
    "native.wise-ppt.068.mobile-gallery": {
      "component_id": "native.wise-ppt.068.mobile-gallery",
      "catalog_spec": "native:68",
      "mode": "layout-default",
      "inherit_from": null,
      "source_layout": {
        "layout_id": "wise-ppt.layout.relationship.A9",
        "display_code": "A9",
        "layout_contract": "wise-ppt-layout-theme-bindings@3",
        "frame_contract": "wise-ppt-catalog-theme-frames@6",
        "comparison_scope": "structure-and-provenance-only",
        "evidence": "sourceLayout/sourceRegion",
        "source_ref": "references/gallery-paper-ink/ai/frames/layout-a9.html",
        "source_regions": [
          "screens"
        ],
        "extraction": "include-only",
        "frame_paths": {
          "hermes-orange": "themes/catalog-projections/hermes-klein/frames/hermes-orange/layout-a9.html",
          "klein-blue": "themes/catalog-projections/hermes-klein/frames/klein-blue/layout-a9.html"
        },
        "identity_projection": "component-localized-from-source-region"
      },
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        },
        {
          "binding_id": "component-source-panels",
          "source_selector": "[fill*=\"paper-panel\"], [fill*=\"pi-paper-panel\"], [style*=\"paper-panel\"], [style*=\"pi-paper-panel\"]",
          "selector": "[data-component-theme-material=\"panel\"]",
          "material": "panel",
          "expected_count": 4,
          "evidence": "component-neutral-material-token"
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.step-labels",
          "label": "四步标签",
          "members": [
            {
              "source_selector": "text",
              "text_pattern": "^STEP 0[1-4] — ",
              "treatment": "identity.text",
              "expected_count": 4,
              "layout_selector": "#draw text",
              "layout_expected_count": 4,
              "layout_text_pattern": "^STEP 0[1-4] — ",
              "evidence": "source-region-identity-anchor",
              "selector": "[data-component-theme-group=\"identity.step-labels\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [],
      "thumbnail_policy": "catalog-card"
    },
    "native.wise-ppt.069.admin-console": {
      "component_id": "native.wise-ppt.069.admin-console",
      "catalog_spec": "native:69",
      "mode": "layout-default",
      "inherit_from": null,
      "source_layout": {
        "layout_id": "wise-ppt.layout.relationship.A8",
        "display_code": "A8",
        "layout_contract": "wise-ppt-layout-theme-bindings@3",
        "frame_contract": "wise-ppt-catalog-theme-frames@6",
        "comparison_scope": "structure-and-provenance-only",
        "evidence": "sourceLayout/sourceRegion",
        "source_ref": "references/gallery-paper-ink/ai/frames/layout-a8.html",
        "source_regions": [
          "a8-admin-console"
        ],
        "extraction": "include-only",
        "frame_paths": {
          "hermes-orange": "themes/catalog-projections/hermes-klein/frames/hermes-orange/layout-a8.html",
          "klein-blue": "themes/catalog-projections/hermes-klein/frames/klein-blue/layout-a8.html"
        },
        "identity_projection": "neutral-in-source-region"
      },
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        },
        {
          "binding_id": "application-artifact",
          "source_selector": ".pi-a8-master .ui",
          "material": "panel",
          "expected_count": 1,
          "evidence": "source-region-material-anchor",
          "layout_selector": ".ui",
          "layout_expected_count": 1,
          "selector": "[data-component-theme-material=\"panel\"]"
        }
      ],
      "identity_groups": [],
      "appearance_bindings": [
        {
          "binding_id": "application-outline",
          "source_selector": ".pi-a8-master .ui",
          "treatment": "source.ink-border-2",
          "expected_count": 1,
          "layout_selector": ".ui",
          "layout_expected_count": 1,
          "evidence": "source-region-appearance-anchor",
          "selector": "[data-component-theme-appearance=\"source.ink-border-2\"]"
        }
      ],
      "thumbnail_policy": "catalog-card"
    },
    "native.wise-ppt.071.gantt-ink": {
      "component_id": "native.wise-ppt.071.gantt-ink",
      "catalog_spec": "native:71",
      "mode": "layout-default",
      "inherit_from": null,
      "source_layout": {
        "layout_id": "wise-ppt.layout.relationship.B2",
        "display_code": "B2",
        "layout_contract": "wise-ppt-layout-theme-bindings@3",
        "frame_contract": "wise-ppt-catalog-theme-frames@6",
        "comparison_scope": "structure-and-provenance-only",
        "evidence": "sourceLayout/sourceRegion",
        "source_ref": "references/gallery-paper-ink/ai/frames/layout-b2.html",
        "source_regions": [
          "durations"
        ],
        "extraction": "include-only",
        "frame_paths": {
          "hermes-orange": "themes/catalog-projections/hermes-klein/frames/hermes-orange/layout-b2.html",
          "klein-blue": "themes/catalog-projections/hermes-klein/frames/klein-blue/layout-b2.html"
        },
        "identity_projection": "component-localized-from-source-region"
      },
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.stage-labels",
          "label": "四阶段英文标签",
          "members": [
            {
              "source_selector": "text",
              "text_pattern": "^(?:DATA|PRETRAIN|SFT|RLHF)$",
              "treatment": "identity.text-source-70",
              "expected_count": 4,
              "layout_selector": "#draw text",
              "layout_expected_count": 4,
              "layout_text_pattern": "^(?:DATA|PRETRAIN|SFT|RLHF)$",
              "evidence": "source-region-identity-anchor",
              "selector": "[data-component-theme-group=\"identity.stage-labels\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [],
      "thumbnail_policy": "catalog-card"
    },
    "native.wise-ppt.072.timeline-gallery": {
      "component_id": "native.wise-ppt.072.timeline-gallery",
      "catalog_spec": "native:72",
      "mode": "layout-default",
      "inherit_from": null,
      "source_layout": {
        "layout_id": "wise-ppt.layout.relationship.B4",
        "display_code": "B4",
        "layout_contract": "wise-ppt-layout-theme-bindings@3",
        "frame_contract": "wise-ppt-catalog-theme-frames@6",
        "comparison_scope": "structure-and-provenance-only",
        "evidence": "sourceLayout/sourceRegion",
        "source_ref": "references/gallery-paper-ink/ai/frames/layout-b4.html",
        "source_regions": [
          "milestone-evidence"
        ],
        "extraction": "include-only",
        "frame_paths": {
          "hermes-orange": "themes/catalog-projections/hermes-klein/frames/hermes-orange/layout-b4.html",
          "klein-blue": "themes/catalog-projections/hermes-klein/frames/klein-blue/layout-b4.html"
        },
        "identity_projection": "component-localized-from-source-region"
      },
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        },
        {
          "binding_id": "timeline-evidence-cards",
          "source_selector": "rect[fill*=\"paper-panel\"]",
          "material": "panel",
          "expected_count": 5,
          "layout_selector": "#draw > g > rect[fill=\"var(--paper-panel)\"]",
          "evidence": "source-region-material-anchor",
          "selector": "[data-component-theme-material=\"panel\"]"
        },
        {
          "binding_id": "timeline-open-dots",
          "source_selector": "circle[fill*=\"paper-deep\"]",
          "material": "canvas",
          "expected_count": 9,
          "layout_selector": "#draw circle[cy=\"290\"][r=\"7\"], #draw circle[cx=\"588\"][cy=\"702\"][r=\"3\"], #draw circle[cx=\"632\"][cy=\"680\"][r=\"3\"], #draw circle[cx=\"678\"][cy=\"658\"][r=\"3\"], #draw circle[cx=\"720\"][cy=\"636\"][r=\"3\"]",
          "evidence": "source-region-material-anchor",
          "selector": "[data-component-theme-material=\"canvas\"]"
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.timeline-track",
          "label": "时间轴主轨与节点",
          "members": [
            {
              "source_selector": "line[x1=\"220\"][y1=\"290\"][x2=\"1720\"][y2=\"290\"]",
              "treatment": "identity.stroke",
              "expected_count": 1,
              "layout_selector": "#sample-focus",
              "evidence": "source-region-identity-anchor",
              "selector": "[data-component-theme-group=\"identity.timeline-track\"]"
            },
            {
              "source_selector": "circle[cy=\"290\"][r=\"7\"]",
              "treatment": "identity.stroke",
              "expected_count": 5,
              "layout_selector": "#draw circle[cy=\"290\"][r=\"7\"]",
              "evidence": "source-region-identity-anchor",
              "selector": "[data-component-theme-group=\"identity.timeline-track\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [
        {
          "binding_id": "timeline-card-outlines",
          "source_selector": "rect[width=\"300\"][height=\"240\"]",
          "treatment": "source.ink-stroke",
          "expected_count": 5,
          "layout_selector": "#draw > g > rect[width=\"300\"][height=\"240\"]",
          "evidence": "source-region-appearance-anchor",
          "selector": "[data-component-theme-appearance=\"source.ink-stroke\"]"
        }
      ],
      "thumbnail_policy": "catalog-card"
    },
    "native.wise-ppt.073.winding-road": {
      "component_id": "native.wise-ppt.073.winding-road",
      "catalog_spec": "native:73",
      "mode": "layout-default",
      "inherit_from": null,
      "source_layout": {
        "layout_id": "wise-ppt.layout.relationship.B6",
        "display_code": "B6",
        "layout_contract": "wise-ppt-layout-theme-bindings@3",
        "frame_contract": "wise-ppt-catalog-theme-frames@6",
        "comparison_scope": "structure-and-provenance-only",
        "evidence": "sourceLayout/sourceRegion",
        "source_ref": "references/gallery-paper-ink/ai/frames/layout-b6.html",
        "source_regions": [
          "road-stages"
        ],
        "extraction": "include-only",
        "frame_paths": {
          "hermes-orange": "themes/catalog-projections/hermes-klein/frames/hermes-orange/layout-b6.html",
          "klein-blue": "themes/catalog-projections/hermes-klein/frames/klein-blue/layout-b6.html"
        },
        "identity_projection": "component-localized-from-source-region"
      },
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        },
        {
          "binding_id": "road-open-dots",
          "source_selector": "circle[fill*=\"paper-deep\"][r=\"9\"]",
          "material": "canvas",
          "expected_count": 6,
          "evidence": "source-region-material-anchor",
          "layout_selector": "#draw circle[r=\"9\"]",
          "layout_expected_count": 6,
          "selector": "[data-component-theme-material=\"canvas\"]"
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.road-midline",
          "label": "路线主连接线",
          "members": [
            {
              "source_selector": "path[stroke-width=\"2.2\"]",
              "treatment": "identity.stroke",
              "expected_count": 1,
              "layout_selector": "#draw path[stroke-width=\"2.2\"]",
              "layout_expected_count": 1,
              "evidence": "source-region-identity-anchor",
              "selector": "[data-component-theme-group=\"identity.road-midline\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [],
      "thumbnail_policy": "catalog-card"
    },
    "native.wise-ppt.074.contact-card": {
      "component_id": "native.wise-ppt.074.contact-card",
      "catalog_spec": "native:74",
      "mode": "layout-default",
      "inherit_from": null,
      "source_layout": {
        "layout_id": "wise-ppt.layout.nonrelationship.D6",
        "display_code": "D6",
        "layout_contract": "wise-ppt-layout-theme-bindings@3",
        "frame_contract": "wise-ppt-catalog-theme-frames@6",
        "comparison_scope": "structure-and-provenance-only",
        "evidence": "sourceLayout/sourceRegion",
        "source_ref": "references/gallery-paper-ink/ai/frames/layout-d6.html",
        "source_regions": [
          "contact"
        ],
        "extraction": "include-only",
        "frame_paths": {
          "hermes-orange": "themes/catalog-projections/hermes-klein/frames/hermes-orange/layout-d6.html",
          "klein-blue": "themes/catalog-projections/hermes-klein/frames/klein-blue/layout-d6.html"
        },
        "identity_projection": "neutral-in-source-region"
      },
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        },
        {
          "binding_id": "contact-panel",
          "source_selector": "rect[x=\"1100\"][y=\"220\"][width=\"620\"][height=\"630\"]",
          "material": "panel",
          "expected_count": 1,
          "layout_selector": "#draw rect[x=\"1100\"][y=\"220\"][width=\"620\"][height=\"630\"]",
          "evidence": "source-region-material-anchor",
          "selector": "[data-component-theme-material=\"panel\"]"
        }
      ],
      "identity_groups": [],
      "appearance_bindings": [
        {
          "binding_id": "contact-panel-outline",
          "source_selector": "rect[x=\"1100\"][y=\"220\"][width=\"620\"][height=\"630\"]",
          "treatment": "source.ink-stroke-2",
          "expected_count": 1,
          "layout_selector": "#draw rect[x=\"1100\"][y=\"220\"][width=\"620\"][height=\"630\"]",
          "evidence": "source-region-appearance-anchor",
          "selector": "[data-component-theme-appearance=\"source.ink-stroke-2\"]"
        }
      ],
      "thumbnail_policy": "catalog-card"
    },
    "native.wise-ppt.075.district-map": {
      "component_id": "native.wise-ppt.075.district-map",
      "catalog_spec": "native:75",
      "mode": "layout-default",
      "inherit_from": null,
      "source_layout": {
        "layout_id": "wise-ppt.layout.nonrelationship.D6",
        "display_code": "D6",
        "layout_contract": "wise-ppt-layout-theme-bindings@3",
        "frame_contract": "wise-ppt-catalog-theme-frames@6",
        "comparison_scope": "structure-and-provenance-only",
        "evidence": "sourceLayout/sourceRegion",
        "source_ref": "references/gallery-paper-ink/ai/frames/layout-d6.html",
        "source_regions": [
          "map"
        ],
        "extraction": "include-only",
        "frame_paths": {
          "hermes-orange": "themes/catalog-projections/hermes-klein/frames/hermes-orange/layout-d6.html",
          "klein-blue": "themes/catalog-projections/hermes-klein/frames/klein-blue/layout-d6.html"
        },
        "identity_projection": "neutral-in-source-region"
      },
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [],
      "appearance_bindings": [],
      "thumbnail_policy": "catalog-card"
    },
    "native.wise-ppt.076.why-how-bands": {
      "component_id": "native.wise-ppt.076.why-how-bands",
      "catalog_spec": "native:76",
      "mode": "layout-default",
      "inherit_from": null,
      "source_layout": {
        "layout_id": "wise-ppt.layout.relationship.E3",
        "display_code": "E3",
        "layout_contract": "wise-ppt-layout-theme-bindings@3",
        "frame_contract": "wise-ppt-catalog-theme-frames@6",
        "comparison_scope": "structure-and-provenance-only",
        "evidence": "sourceLayout/sourceRegion",
        "source_ref": "references/gallery-paper-ink/ai/frames/layout-e3.html",
        "source_regions": [
          "paired-items"
        ],
        "extraction": "include-only",
        "frame_paths": {
          "hermes-orange": "themes/catalog-projections/hermes-klein/frames/hermes-orange/layout-e3.html",
          "klein-blue": "themes/catalog-projections/hermes-klein/frames/klein-blue/layout-e3.html"
        },
        "identity_projection": "component-localized-from-source-region"
      },
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        },
        {
          "binding_id": "component-source-panels",
          "source_selector": "[fill*=\"paper-panel\"], [fill*=\"pi-paper-panel\"], [style*=\"paper-panel\"], [style*=\"pi-paper-panel\"]",
          "selector": "[data-component-theme-material=\"panel\"]",
          "material": "panel",
          "expected_count": 1,
          "evidence": "component-neutral-material-token"
        },
        {
          "binding_id": "failure-open-marker",
          "source_selector": "rect[x=\"1549\"][y=\"343\"][width=\"22\"][height=\"18\"]",
          "material": "canvas",
          "expected_count": 1,
          "evidence": "source-region-material-anchor",
          "layout_selector": "#draw rect[x=\"1549\"][y=\"343\"][width=\"22\"][height=\"18\"]",
          "layout_expected_count": 1,
          "selector": "[data-component-theme-material=\"canvas\"]"
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.solution-glyphs",
          "label": "下半区四组解法图元",
          "members": [
            {
              "source_selector": "text[x=\"420\"][y=\"562\"] ~ :is(path,line,circle,rect)",
              "treatment": "identity.stroke",
              "expected_count": 36,
              "layout_selector": "#draw text[x=\"420\"][y=\"562\"] ~ :is(path,line,circle,rect)",
              "layout_expected_count": 36,
              "evidence": "source-region-identity-anchor",
              "selector": "[data-component-theme-group=\"identity.solution-glyphs\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [
        {
          "binding_id": "failure-codes",
          "source_selector": "text",
          "text_pattern": "^0[1-4] · (?:RATE-LIMIT|LOOP STUCK|CTX OVERFLOW|UNTRACEABLE)$",
          "treatment": "source.ink-text",
          "expected_count": 4,
          "layout_selector": "#draw text",
          "layout_expected_count": 4,
          "layout_text_pattern": "^0[1-4] · (?:RATE-LIMIT|LOOP STUCK|CTX OVERFLOW|UNTRACEABLE)$",
          "evidence": "source-region-appearance-anchor",
          "selector": "[data-component-theme-appearance=\"source.ink-text\"]"
        },
        {
          "binding_id": "solution-glyph-weight",
          "source_selector": "text[x=\"420\"][y=\"562\"] ~ :is(path,line,circle,rect)",
          "treatment": "source.solution-stroke",
          "expected_count": 36,
          "layout_selector": "#draw text[x=\"420\"][y=\"562\"] ~ :is(path,line,circle,rect)",
          "layout_expected_count": 36,
          "evidence": "source-region-appearance-anchor",
          "selector": "[data-component-theme-appearance=\"source.solution-stroke\"]"
        }
      ],
      "thumbnail_policy": "catalog-card"
    },
    "native.wise-ppt.077.before-after-bands": {
      "component_id": "native.wise-ppt.077.before-after-bands",
      "catalog_spec": "native:77",
      "mode": "layout-default",
      "inherit_from": null,
      "source_layout": {
        "layout_id": "wise-ppt.layout.relationship.E6",
        "display_code": "E6",
        "layout_contract": "wise-ppt-layout-theme-bindings@3",
        "frame_contract": "wise-ppt-catalog-theme-frames@6",
        "comparison_scope": "structure-and-provenance-only",
        "evidence": "sourceLayout/sourceRegion",
        "source_ref": "references/gallery-paper-ink/ai/frames/layout-e6.html",
        "source_regions": [
          "before-after-flow"
        ],
        "extraction": "include-only",
        "frame_paths": {
          "hermes-orange": "themes/catalog-projections/hermes-klein/frames/hermes-orange/layout-e6.html",
          "klein-blue": "themes/catalog-projections/hermes-klein/frames/klein-blue/layout-e6.html"
        },
        "identity_projection": "neutral-in-source-region"
      },
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        },
        {
          "binding_id": "before-band",
          "source_selector": "rect[x=\"150\"][y=\"190\"][width=\"1620\"][height=\"280\"]",
          "material": "panel",
          "expected_count": 1,
          "layout_selector": "#draw rect[x=\"150\"][y=\"190\"][width=\"1620\"][height=\"280\"]",
          "evidence": "source-region-material-anchor",
          "selector": "[data-component-theme-material=\"panel\"]"
        },
        {
          "binding_id": "after-band",
          "source_selector": "rect[x=\"150\"][y=\"500\"][width=\"1620\"][height=\"280\"]",
          "material": "ink",
          "expected_count": 1,
          "layout_selector": "#draw rect[x=\"150\"][y=\"500\"][width=\"1620\"][height=\"280\"]",
          "evidence": "source-region-material-anchor",
          "selector": "[data-component-theme-material=\"ink\"]"
        },
        {
          "binding_id": "after-canvas-marker",
          "source_selector": "circle[cx=\"918\"][cy=\"616\"][r=\"10\"]",
          "material": "canvas",
          "expected_count": 1,
          "layout_selector": "#draw circle[cx=\"918\"][cy=\"616\"][r=\"10\"]",
          "evidence": "source-region-material-anchor",
          "selector": "[data-component-theme-material=\"canvas\"]"
        }
      ],
      "identity_groups": [],
      "appearance_bindings": [
        {
          "binding_id": "comparison-band-outlines",
          "source_selector": "rect[x=\"150\"][width=\"1620\"][height=\"280\"]",
          "treatment": "source.ink-stroke-2-all",
          "expected_count": 2,
          "layout_selector": "#draw > g > rect[x=\"150\"][width=\"1620\"][height=\"280\"]",
          "evidence": "source-region-appearance-anchor",
          "selector": "[data-component-theme-appearance=\"source.ink-stroke-2-all\"]"
        }
      ],
      "thumbnail_policy": "catalog-card"
    },
    "native.wise-ppt.078.chat-dialog": {
      "component_id": "native.wise-ppt.078.chat-dialog",
      "catalog_spec": "native:78",
      "mode": "layout-default",
      "inherit_from": null,
      "source_layout": {
        "layout_id": "wise-ppt.layout.relationship.A1",
        "display_code": "A1",
        "layout_contract": "wise-ppt-layout-theme-bindings@3",
        "frame_contract": "wise-ppt-catalog-theme-frames@6",
        "comparison_scope": "structure-and-provenance-only",
        "evidence": "sourceLayout/sourceRegion",
        "source_ref": "references/gallery-paper-ink/ai/frames/layout-a1.html",
        "source_regions": [
          "a1-chat-bubbles"
        ],
        "extraction": "include-only",
        "frame_paths": {
          "hermes-orange": "themes/catalog-projections/hermes-klein/frames/hermes-orange/layout-a1.html",
          "klein-blue": "themes/catalog-projections/hermes-klein/frames/klein-blue/layout-a1.html"
        },
        "identity_projection": "component-localized-from-source-region"
      },
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.chat-rings",
          "label": "对话气泡环线",
          "members": [
            {
              "source_selector": "ellipse[stroke=\"var(--wp-color-functional)\"]",
              "treatment": "identity.stroke",
              "expected_count": 2,
              "layout_selector": "#a1-ring, #a1-ring + ellipse",
              "layout_expected_count": 2,
              "evidence": "source-region-identity-anchor",
              "selector": "[data-component-theme-group=\"identity.chat-rings\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [
        {
          "binding_id": "message-borders",
          "source_selector": ".msg .avatar, .msg .bub",
          "treatment": "source.a1-message-border",
          "expected_count": 4,
          "layout_selector": ".msg .avatar, .msg .bub",
          "layout_expected_count": 4,
          "evidence": "source-region-appearance-anchor",
          "selector": "[data-component-theme-appearance=\"source.a1-message-border\"]"
        }
      ],
      "thumbnail_policy": "catalog-card"
    },
    "native.wise-ppt.079.radial-hub": {
      "component_id": "native.wise-ppt.079.radial-hub",
      "catalog_spec": "native:79",
      "mode": "layout-default",
      "inherit_from": null,
      "source_layout": {
        "layout_id": "wise-ppt.layout.relationship.G4",
        "display_code": "G4",
        "layout_contract": "wise-ppt-layout-theme-bindings@3",
        "frame_contract": "wise-ppt-catalog-theme-frames@6",
        "comparison_scope": "structure-and-provenance-only",
        "evidence": "sourceLayout/sourceRegion",
        "source_ref": "references/gallery-paper-ink/ai/frames/layout-g4.html",
        "source_regions": [
          "capabilities"
        ],
        "extraction": "include-only",
        "frame_paths": {
          "hermes-orange": "themes/catalog-projections/hermes-klein/frames/hermes-orange/layout-g4.html",
          "klein-blue": "themes/catalog-projections/hermes-klein/frames/klein-blue/layout-g4.html"
        },
        "identity_projection": "component-localized-from-source-region"
      },
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        },
        {
          "binding_id": "satellites",
          "source_selector": "circle[r=\"62\"]",
          "material": "translucent-panel",
          "expected_count": 6,
          "layout_selector": "#draw circle[r=\"62\"]",
          "evidence": "source-region-material-anchor",
          "selector": "[data-component-theme-material=\"translucent-panel\"]"
        },
        {
          "binding_id": "hub-disc",
          "source_selector": "circle[cx=\"960\"][cy=\"540\"][r=\"120\"]",
          "material": "panel",
          "expected_count": 1,
          "layout_selector": "#g4-focus-frame",
          "evidence": "source-region-material-anchor",
          "selector": "[data-component-theme-material=\"panel\"]"
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.primary-label",
          "label": "AI 平台中枢",
          "members": [
            {
              "source_selector": "text",
              "text_pattern": "^AI 平台中枢$",
              "treatment": "identity.text",
              "expected_count": 1,
              "layout_selector": "[data-vnext-text-key=\"capabilities.text.001\"]",
              "evidence": "source-region-identity-anchor",
              "selector": "[data-component-theme-group=\"identity.primary-label\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [
        {
          "binding_id": "hub-orbit",
          "source_selector": "circle[cx=\"960\"][cy=\"540\"][r=\"134\"]",
          "treatment": "source.ink-stroke-45",
          "expected_count": 1,
          "layout_selector": "#draw circle[cx=\"960\"][cy=\"540\"][r=\"134\"]",
          "evidence": "source-region-appearance-anchor",
          "selector": "[data-component-theme-appearance=\"source.ink-stroke-45\"]"
        }
      ],
      "thumbnail_policy": "catalog-card"
    },
    "native.wise-ppt.080.merge-confluence": {
      "component_id": "native.wise-ppt.080.merge-confluence",
      "catalog_spec": "native:80",
      "mode": "layout-default",
      "inherit_from": null,
      "source_layout": {
        "layout_id": "wise-ppt.layout.relationship.N1",
        "display_code": "N1",
        "layout_contract": "wise-ppt-layout-theme-bindings@3",
        "frame_contract": "wise-ppt-catalog-theme-frames@6",
        "comparison_scope": "structure-and-provenance-only",
        "evidence": "sourceLayout/sourceRegion",
        "source_ref": "references/gallery-paper-ink/ai/frames/layout-n1.html",
        "source_regions": [
          "sources"
        ],
        "extraction": "include-only",
        "frame_paths": {
          "hermes-orange": "themes/catalog-projections/hermes-klein/frames/hermes-orange/layout-n1.html",
          "klein-blue": "themes/catalog-projections/hermes-klein/frames/klein-blue/layout-n1.html"
        },
        "identity_projection": "component-localized-from-source-region"
      },
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        },
        {
          "binding_id": "composed-prompt",
          "source_selector": "rect[x=\"1200\"][y=\"330\"][width=\"500\"][height=\"450\"]",
          "material": "panel",
          "expected_count": 1,
          "evidence": "source-region-material-anchor",
          "layout_selector": "#n1-focus-frame",
          "layout_expected_count": 1,
          "selector": "[data-component-theme-material=\"panel\"]"
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.node-title-rules",
          "label": "三节点标题双线",
          "members": [
            {
              "source_selector": "line[x1=\"252\"][y1=\"384\"][x2=\"658\"][y2=\"384\"], line[x1=\"252\"][y1=\"714\"][x2=\"658\"][y2=\"714\"], line[x1=\"1232\"][y1=\"448\"][x2=\"1668\"][y2=\"448\"]",
              "treatment": "identity.stroke-strong",
              "expected_count": 3,
              "layout_selector": "#draw line[x1=\"252\"][y1=\"384\"][x2=\"658\"][y2=\"384\"], #draw line[x1=\"252\"][y1=\"714\"][x2=\"658\"][y2=\"714\"], #draw line[x1=\"1232\"][y1=\"448\"][x2=\"1668\"][y2=\"448\"]",
              "layout_expected_count": 3,
              "evidence": "source-region-identity-anchor",
              "selector": "[data-component-theme-group=\"identity.node-title-rules\"]"
            },
            {
              "source_selector": "line[x1=\"252\"][y1=\"388\"][x2=\"340\"][y2=\"388\"], line[x1=\"252\"][y1=\"718\"][x2=\"340\"][y2=\"718\"], line[x1=\"1232\"][y1=\"452\"][x2=\"1320\"][y2=\"452\"]",
              "treatment": "identity.stroke-detail",
              "expected_count": 3,
              "layout_selector": "#draw line[x1=\"252\"][y1=\"388\"][x2=\"340\"][y2=\"388\"], #draw line[x1=\"252\"][y1=\"718\"][x2=\"340\"][y2=\"718\"], #draw line[x1=\"1232\"][y1=\"452\"][x2=\"1320\"][y2=\"452\"]",
              "layout_expected_count": 3,
              "evidence": "source-region-identity-anchor",
              "selector": "[data-component-theme-group=\"identity.node-title-rules\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [
        {
          "binding_id": "prompt-outline",
          "source_selector": "rect[x=\"1200\"][y=\"330\"][width=\"500\"][height=\"450\"]",
          "treatment": "source.ink-stroke-2",
          "expected_count": 1,
          "layout_selector": "#n1-focus-frame",
          "layout_expected_count": 1,
          "evidence": "source-region-appearance-anchor",
          "selector": "[data-component-theme-appearance=\"source.ink-stroke-2\"]"
        },
        {
          "binding_id": "node-sequence-numbers",
          "source_selector": "text",
          "text_pattern": "^0[12]$",
          "treatment": "source.ink-text",
          "expected_count": 2,
          "layout_selector": "#draw text",
          "layout_expected_count": 2,
          "layout_text_pattern": "^0[12]$",
          "evidence": "source-region-appearance-anchor",
          "selector": "[data-component-theme-appearance=\"source.ink-text\"]"
        }
      ],
      "thumbnail_policy": "catalog-card"
    },
    "native.wise-ppt.081.watershed-axis": {
      "component_id": "native.wise-ppt.081.watershed-axis",
      "catalog_spec": "native:81",
      "mode": "layout-default",
      "inherit_from": null,
      "source_layout": {
        "layout_id": "wise-ppt.layout.relationship.E2",
        "display_code": "E2",
        "layout_contract": "wise-ppt-layout-theme-bindings@3",
        "frame_contract": "wise-ppt-catalog-theme-frames@6",
        "comparison_scope": "structure-and-provenance-only",
        "evidence": "sourceLayout/sourceRegion",
        "source_ref": "references/gallery-paper-ink/ai/frames/layout-e2.html",
        "source_regions": [
          "comparison-fields"
        ],
        "extraction": "include-only",
        "frame_paths": {
          "hermes-orange": "themes/catalog-projections/hermes-klein/frames/hermes-orange/layout-e2.html",
          "klein-blue": "themes/catalog-projections/hermes-klein/frames/klein-blue/layout-e2.html"
        },
        "identity_projection": "component-localized-from-source-region"
      },
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.vs-label",
          "label": "对比中心 VS",
          "members": [
            {
              "source_selector": "text",
              "text_pattern": "^VS$",
              "treatment": "identity.text",
              "expected_count": 1,
              "layout_selector": "[data-vnext-text-key=\"comparison-fields.text.001\"]",
              "evidence": "source-region-identity-anchor",
              "selector": "[data-component-theme-group=\"identity.vs-label\"]"
            }
          ]
        },
        {
          "group_id": "identity.comparison-title-rules",
          "label": "左右标题双线",
          "members": [
            {
              "source_selector": "line[x1=\"200\"][y1=\"322\"], line[x1=\"1040\"][y1=\"322\"]",
              "treatment": "identity.stroke-strong",
              "expected_count": 2,
              "layout_selector": "#draw line[x1=\"200\"][y1=\"322\"], #draw line[x1=\"1040\"][y1=\"322\"]",
              "evidence": "source-region-identity-anchor",
              "selector": "[data-component-theme-group=\"identity.comparison-title-rules\"]"
            },
            {
              "source_selector": "line[x1=\"200\"][y1=\"327\"], line[x1=\"1040\"][y1=\"327\"]",
              "treatment": "identity.stroke-detail",
              "expected_count": 2,
              "layout_selector": "#draw line[x1=\"200\"][y1=\"327\"], #draw line[x1=\"1040\"][y1=\"327\"]",
              "evidence": "source-region-identity-anchor",
              "selector": "[data-component-theme-group=\"identity.comparison-title-rules\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [],
      "thumbnail_policy": "catalog-card"
    },
    "native.wise-ppt.082.arch-table-band": {
      "component_id": "native.wise-ppt.082.arch-table-band",
      "catalog_spec": "native:82",
      "mode": "layout-default",
      "inherit_from": null,
      "source_layout": {
        "layout_id": "wise-ppt.layout.relationship.H3",
        "display_code": "H3",
        "layout_contract": "wise-ppt-layout-theme-bindings@3",
        "frame_contract": "wise-ppt-catalog-theme-frames@6",
        "comparison_scope": "structure-and-provenance-only",
        "evidence": "sourceLayout/sourceRegion",
        "source_ref": "references/gallery-paper-ink/ai/frames/layout-h3.html",
        "source_regions": [
          "architecture"
        ],
        "extraction": "include-only",
        "frame_paths": {
          "hermes-orange": "themes/catalog-projections/hermes-klein/frames/hermes-orange/layout-h3.html",
          "klein-blue": "themes/catalog-projections/hermes-klein/frames/klein-blue/layout-h3.html"
        },
        "identity_projection": "component-localized-from-source-region"
      },
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.layer-codes",
          "label": "L1–L4 层级编号",
          "members": [
            {
              "source_selector": "text",
              "text_pattern": "^L[1-4]$",
              "treatment": "identity.text",
              "expected_count": 4,
              "layout_selector": ".h3-layer-code",
              "evidence": "source-region-identity-anchor",
              "selector": "[data-component-theme-group=\"identity.layer-codes\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [],
      "thumbnail_policy": "catalog-card"
    },
    "native.wise-ppt.083.swimlane-roadmap": {
      "component_id": "native.wise-ppt.083.swimlane-roadmap",
      "catalog_spec": "native:83",
      "mode": "layout-default",
      "inherit_from": null,
      "source_layout": {
        "layout_id": "wise-ppt.layout.relationship.B3",
        "display_code": "B3",
        "layout_contract": "wise-ppt-layout-theme-bindings@3",
        "frame_contract": "wise-ppt-catalog-theme-frames@6",
        "comparison_scope": "structure-and-provenance-only",
        "evidence": "sourceLayout/sourceRegion",
        "source_ref": "references/gallery-paper-ink/ai/frames/layout-b3.html",
        "source_regions": [
          "roadmap"
        ],
        "extraction": "include-only",
        "frame_paths": {
          "hermes-orange": "themes/catalog-projections/hermes-klein/frames/hermes-orange/layout-b3.html",
          "klein-blue": "themes/catalog-projections/hermes-klein/frames/klein-blue/layout-b3.html"
        },
        "identity_projection": "component-localized-from-source-region"
      },
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        },
        {
          "binding_id": "component-source-panels",
          "source_selector": "[fill*=\"paper-panel\"], [fill*=\"pi-paper-panel\"], [style*=\"paper-panel\"], [style*=\"pi-paper-panel\"]",
          "selector": "[data-component-theme-material=\"panel\"]",
          "material": "panel",
          "expected_count": 3,
          "evidence": "component-neutral-material-token"
        },
        {
          "binding_id": "lane-open-dots",
          "source_selector": "circle[fill*=\"paper-deep\"][r=\"8\"]",
          "material": "canvas",
          "expected_count": 3,
          "evidence": "source-region-material-anchor",
          "layout_selector": "#draw circle[r=\"8\"]",
          "layout_expected_count": 3,
          "selector": "[data-component-theme-material=\"canvas\"]"
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.lane-labels",
          "label": "三泳道标签",
          "members": [
            {
              "source_selector": "text",
              "text_pattern": "^L[1-3] · ",
              "treatment": "identity.text",
              "expected_count": 3,
              "layout_selector": "#draw text",
              "layout_expected_count": 3,
              "layout_text_pattern": "^L[1-3] · ",
              "evidence": "source-region-identity-anchor",
              "selector": "[data-component-theme-group=\"identity.lane-labels\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [],
      "thumbnail_policy": "catalog-card"
    },
    "native.wise-ppt.084.profile-card": {
      "component_id": "native.wise-ppt.084.profile-card",
      "catalog_spec": "native:84",
      "mode": "layout-default",
      "inherit_from": null,
      "source_layout": {
        "layout_id": "wise-ppt.layout.relationship.C3",
        "display_code": "C3",
        "layout_contract": "wise-ppt-layout-theme-bindings@3",
        "frame_contract": "wise-ppt-catalog-theme-frames@6",
        "comparison_scope": "structure-and-provenance-only",
        "evidence": "sourceLayout/sourceRegion",
        "source_ref": "references/gallery-paper-ink/ai/frames/layout-c3.html",
        "source_regions": [
          "c3-profile-card-1"
        ],
        "extraction": "include-only",
        "frame_paths": {
          "hermes-orange": "themes/catalog-projections/hermes-klein/frames/hermes-orange/layout-c3.html",
          "klein-blue": "themes/catalog-projections/hermes-klein/frames/klein-blue/layout-c3.html"
        },
        "identity_projection": "component-localized-from-source-region"
      },
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        },
        {
          "binding_id": "component-source-panels",
          "source_selector": "[fill*=\"paper-panel\"], [fill*=\"pi-paper-panel\"], [style*=\"paper-panel\"], [style*=\"pi-paper-panel\"]",
          "selector": "[data-component-theme-material=\"panel\"]",
          "material": "panel",
          "expected_count": 1,
          "evidence": "component-neutral-material-token"
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.persona-title-rule",
          "label": "首张画像卡标题线",
          "members": [
            {
              "source_selector": "line[x1=\"176\"][y1=\"578\"][x2=\"604\"]",
              "treatment": "identity.stroke-strong",
              "expected_count": 1,
              "layout_selector": "#draw line[x1=\"176\"][y1=\"578\"][x2=\"604\"]",
              "layout_expected_count": 1,
              "evidence": "source-region-identity-anchor",
              "selector": "[data-component-theme-group=\"identity.persona-title-rule\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [
        {
          "binding_id": "profile-card-outline",
          "source_selector": "rect[x=\"140\"][y=\"210\"][width=\"500\"][height=\"660\"]",
          "treatment": "source.ink-stroke",
          "expected_count": 1,
          "layout_selector": "#draw rect[x=\"140\"][y=\"210\"][width=\"500\"][height=\"660\"]",
          "layout_expected_count": 1,
          "evidence": "source-region-appearance-anchor",
          "selector": "[data-component-theme-appearance=\"source.ink-stroke\"]"
        }
      ],
      "thumbnail_policy": "catalog-card"
    },
    "native.wise-ppt.085.radial-progress": {
      "component_id": "native.wise-ppt.085.radial-progress",
      "catalog_spec": "native:85",
      "mode": "layout-default",
      "inherit_from": null,
      "source_layout": {
        "layout_id": "wise-ppt.layout.relationship.C5",
        "display_code": "C5",
        "layout_contract": "wise-ppt-layout-theme-bindings@3",
        "frame_contract": "wise-ppt-catalog-theme-frames@6",
        "comparison_scope": "structure-and-provenance-only",
        "evidence": "sourceLayout/sourceRegion",
        "source_ref": "references/gallery-paper-ink/ai/frames/layout-c5.html",
        "source_regions": [
          "c5-progress-ring-1",
          "c5-progress-ring-2",
          "c5-progress-ring-3",
          "c5-progress-ring-4"
        ],
        "extraction": "include-only",
        "frame_paths": {
          "hermes-orange": "themes/catalog-projections/hermes-klein/frames/hermes-orange/layout-c5.html",
          "klein-blue": "themes/catalog-projections/hermes-klein/frames/klein-blue/layout-c5.html"
        },
        "identity_projection": "neutral-in-source-region"
      },
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [],
      "appearance_bindings": [],
      "thumbnail_policy": "catalog-card"
    },
    "native.wise-ppt.087.funnel": {
      "component_id": "native.wise-ppt.087.funnel",
      "catalog_spec": "native:87",
      "mode": "layout-default",
      "inherit_from": null,
      "source_layout": {
        "layout_id": "wise-ppt.layout.relationship.O1",
        "display_code": "O1",
        "layout_contract": "wise-ppt-layout-theme-bindings@3",
        "frame_contract": "wise-ppt-catalog-theme-frames@6",
        "comparison_scope": "structure-and-provenance-only",
        "evidence": "sourceLayout/sourceRegion",
        "source_ref": "references/gallery-paper-ink/ai/frames/layout-o1.html",
        "source_regions": [
          "o1-funnel"
        ],
        "extraction": "include-only",
        "frame_paths": {
          "hermes-orange": "themes/catalog-projections/hermes-klein/frames/hermes-orange/layout-o1.html",
          "klein-blue": "themes/catalog-projections/hermes-klein/frames/klein-blue/layout-o1.html"
        },
        "identity_projection": "component-localized-from-source-region"
      },
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        },
        {
          "binding_id": "funnel-body",
          "source_selector": "[data-source-surface=\"o1-funnel\"]",
          "material": "panel",
          "expected_count": 1,
          "layout_selector": "#o1-funnel-surface",
          "evidence": "source-region-material-anchor",
          "selector": "[data-component-theme-material=\"panel\"]"
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.to-llm",
          "label": "漏斗底部 TO LLM",
          "members": [
            {
              "source_selector": "text",
              "text_pattern": "^TO LLM$",
              "treatment": "identity.text",
              "expected_count": 1,
              "layout_selector": "[data-vnext-text-key=\"funnel-stages.text.025\"]",
              "evidence": "source-region-identity-anchor",
              "selector": "[data-component-theme-group=\"identity.to-llm\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [
        {
          "binding_id": "funnel-dividers",
          "source_selector": "line[y1=\"440\"], line[y1=\"600\"]",
          "treatment": "source.ink-stroke-80-exact",
          "expected_count": 2,
          "layout_selector": "#draw [data-o1-divider]",
          "evidence": "source-region-appearance-anchor",
          "selector": "[data-component-theme-appearance=\"source.ink-stroke-80-exact\"]"
        }
      ],
      "thumbnail_policy": "catalog-card"
    },
    "native.wise-ppt.088.annotation-callout": {
      "component_id": "native.wise-ppt.088.annotation-callout",
      "catalog_spec": "native:88",
      "mode": "layout-default",
      "inherit_from": null,
      "source_layout": {
        "layout_id": "wise-ppt.layout.relationship.G2",
        "display_code": "G2",
        "layout_contract": "wise-ppt-layout-theme-bindings@3",
        "frame_contract": "wise-ppt-catalog-theme-frames@6",
        "comparison_scope": "structure-and-provenance-only",
        "evidence": "sourceLayout/sourceRegion",
        "source_ref": "references/gallery-paper-ink/ai/frames/layout-g2.html",
        "source_regions": [
          "hero-callouts"
        ],
        "extraction": "include-only",
        "frame_paths": {
          "hermes-orange": "themes/catalog-projections/hermes-klein/frames/hermes-orange/layout-g2.html",
          "klein-blue": "themes/catalog-projections/hermes-klein/frames/klein-blue/layout-g2.html"
        },
        "identity_projection": "component-localized-from-source-region"
      },
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        },
        {
          "binding_id": "hero-open-anchor-circles",
          "source_selector": "circle[fill*=\"paper-deep\"]",
          "material": "canvas",
          "expected_count": 8,
          "layout_selector": "#draw circle[r=\"38\"], #draw circle[r=\"5\"]",
          "evidence": "source-region-material-anchor",
          "selector": "[data-component-theme-material=\"canvas\"]"
        },
        {
          "binding_id": "hero-focus-frame",
          "source_selector": "rect[x=\"740\"][y=\"616\"][width=\"440\"][height=\"150\"]",
          "material": "panel",
          "expected_count": 1,
          "layout_selector": "#draw rect[x=\"740\"][y=\"616\"][width=\"440\"][height=\"150\"]",
          "evidence": "source-region-material-anchor",
          "selector": "[data-component-theme-material=\"panel\"]"
        },
        {
          "binding_id": "hero-inner-chip",
          "source_selector": "rect[x=\"900\"][y=\"646\"][width=\"180\"][height=\"70\"]",
          "material": "recessed",
          "expected_count": 1,
          "layout_selector": "#draw rect[x=\"900\"][y=\"646\"][width=\"180\"][height=\"70\"]",
          "evidence": "source-region-material-anchor",
          "selector": "[data-component-theme-material=\"recessed\"]"
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.part-labels",
          "label": "六项硬件能力英文眉题",
          "members": [
            {
              "source_selector": "text",
              "text_pattern": "^PART 0[1-6] · ",
              "treatment": "identity.text",
              "expected_count": 6,
              "layout_selector": "[data-vnext-text-key=\"hero.text.001\"], [data-vnext-text-key=\"hero.text.004\"], [data-vnext-text-key=\"hero.text.007\"], [data-vnext-text-key=\"hero.text.010\"], [data-vnext-text-key=\"hero.text.013\"], [data-vnext-text-key=\"hero.text.016\"]",
              "evidence": "source-region-identity-anchor",
              "selector": "[data-component-theme-group=\"identity.part-labels\"]"
            }
          ]
        },
        {
          "group_id": "identity.annotation-dots",
          "label": "锚点与引线端点",
          "members": [
            {
              "source_selector": "circle[r=\"1.6\"]",
              "treatment": "identity.fill",
              "expected_count": 6,
              "layout_selector": "circle[data-anchor-dot]",
              "evidence": "source-region-identity-anchor",
              "selector": "[data-component-theme-group=\"identity.annotation-dots\"]"
            },
            {
              "source_selector": "circle[r=\"2.2\"]",
              "treatment": "identity.fill",
              "expected_count": 6,
              "layout_selector": "circle[data-elbow-dot]",
              "evidence": "source-region-identity-anchor",
              "selector": "[data-component-theme-group=\"identity.annotation-dots\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [
        {
          "binding_id": "hero-focus-outline",
          "source_selector": "rect[x=\"740\"][y=\"616\"][width=\"440\"][height=\"150\"]",
          "treatment": "source.ink-stroke",
          "expected_count": 1,
          "layout_selector": "#draw rect[x=\"740\"][y=\"616\"][width=\"440\"][height=\"150\"]",
          "evidence": "source-region-appearance-anchor",
          "selector": "[data-component-theme-appearance=\"source.ink-stroke\"]"
        }
      ],
      "thumbnail_policy": "catalog-card"
    },
    "native.wise-ppt.089.metric-strip": {
      "component_id": "native.wise-ppt.089.metric-strip",
      "catalog_spec": "native:89",
      "mode": "layout-default",
      "inherit_from": null,
      "source_layout": {
        "layout_id": "wise-ppt.layout.relationship.K3",
        "display_code": "K3",
        "layout_contract": "wise-ppt-layout-theme-bindings@3",
        "frame_contract": "wise-ppt-catalog-theme-frames@6",
        "comparison_scope": "structure-and-provenance-only",
        "evidence": "sourceLayout/sourceRegion",
        "source_ref": "references/gallery-paper-ink/ai/frames/layout-k3.html",
        "source_regions": [
          "k3-kpi-ledger-strip"
        ],
        "extraction": "include-only",
        "frame_paths": {
          "hermes-orange": "themes/catalog-projections/hermes-klein/frames/hermes-orange/layout-k3.html",
          "klein-blue": "themes/catalog-projections/hermes-klein/frames/klein-blue/layout-k3.html"
        },
        "identity_projection": "neutral-in-source-region"
      },
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [],
      "appearance_bindings": [],
      "thumbnail_policy": "catalog-card"
    },
    "native.wise-ppt.090.scenario-column": {
      "component_id": "native.wise-ppt.090.scenario-column",
      "catalog_spec": "native:90",
      "mode": "layout-default",
      "inherit_from": null,
      "source_layout": {
        "layout_id": "wise-ppt.layout.relationship.K4",
        "display_code": "K4",
        "layout_contract": "wise-ppt-layout-theme-bindings@3",
        "frame_contract": "wise-ppt-catalog-theme-frames@6",
        "comparison_scope": "structure-and-provenance-only",
        "evidence": "sourceLayout/sourceRegion",
        "source_ref": "references/gallery-paper-ink/ai/frames/layout-k4.html",
        "source_regions": [
          "k4-scenario-column-1"
        ],
        "extraction": "include-only",
        "frame_paths": {
          "hermes-orange": "themes/catalog-projections/hermes-klein/frames/hermes-orange/layout-k4.html",
          "klein-blue": "themes/catalog-projections/hermes-klein/frames/klein-blue/layout-k4.html"
        },
        "identity_projection": "component-localized-from-source-region"
      },
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        },
        {
          "binding_id": "scenario-header",
          "source_selector": "rect[y=\"226\"][height=\"42\"][fill*=\"paper-panel\"]",
          "material": "panel",
          "expected_count": 1,
          "layout_selector": "#draw > g > rect[y=\"226\"][height=\"42\"][fill=\"var(--paper-panel)\"]",
          "evidence": "source-region-material-anchor",
          "layout_expected_count": 3,
          "selector": "[data-component-theme-material=\"panel\"]"
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.scene-labels",
          "label": "场景编号 01",
          "members": [
            {
              "source_selector": "text",
              "text_pattern": "^SCENE 01$",
              "treatment": "identity.text",
              "expected_count": 1,
              "layout_selector": "[data-vnext-text-key=\"scenario-matrix.text.002\"]",
              "evidence": "source-region-identity-anchor",
              "selector": "[data-component-theme-group=\"identity.scene-labels\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [],
      "thumbnail_policy": "catalog-card"
    },
    "native.wise-ppt.093.infra-strip": {
      "component_id": "native.wise-ppt.093.infra-strip",
      "catalog_spec": "native:93",
      "mode": "layout-default",
      "inherit_from": null,
      "source_layout": {
        "layout_id": "wise-ppt.layout.relationship.H3",
        "display_code": "H3",
        "layout_contract": "wise-ppt-layout-theme-bindings@3",
        "frame_contract": "wise-ppt-catalog-theme-frames@6",
        "comparison_scope": "structure-and-provenance-only",
        "evidence": "sourceLayout/sourceRegion",
        "source_ref": "references/gallery-paper-ink/ai/frames/layout-h3.html",
        "source_regions": [
          "architecture"
        ],
        "extraction": "include-only",
        "frame_paths": {
          "hermes-orange": "themes/catalog-projections/hermes-klein/frames/hermes-orange/layout-h3.html",
          "klein-blue": "themes/catalog-projections/hermes-klein/frames/klein-blue/layout-h3.html"
        },
        "identity_projection": "component-localized-from-source-region"
      },
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.layer-codes",
          "label": "L1–L4 层级编号",
          "members": [
            {
              "source_selector": "text",
              "text_pattern": "^L[1-4]$",
              "treatment": "identity.text",
              "expected_count": 4,
              "layout_selector": ".h3-layer-code",
              "evidence": "source-region-identity-anchor",
              "selector": "[data-component-theme-group=\"identity.layer-codes\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [],
      "thumbnail_policy": "catalog-card"
    },
    "native.wise-ppt.094.mapping-arc-network": {
      "component_id": "native.wise-ppt.094.mapping-arc-network",
      "catalog_spec": "native:94",
      "mode": "layout-default",
      "inherit_from": null,
      "source_layout": {
        "layout_id": "wise-ppt.layout.relationship.L2",
        "display_code": "L2",
        "layout_contract": "wise-ppt-layout-theme-bindings@3",
        "frame_contract": "wise-ppt-catalog-theme-frames@6",
        "comparison_scope": "structure-and-provenance-only",
        "evidence": "sourceLayout/sourceRegion",
        "source_ref": "references/gallery-paper-ink/ai/frames/layout-l2.html",
        "source_regions": [
          "mapping-network"
        ],
        "extraction": "include-only",
        "frame_paths": {
          "hermes-orange": "themes/catalog-projections/hermes-klein/frames/hermes-orange/layout-l2.html",
          "klein-blue": "themes/catalog-projections/hermes-klein/frames/klein-blue/layout-l2.html"
        },
        "identity_projection": "component-localized-from-source-region"
      },
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.mapping-title-rules",
          "label": "左右标题短线",
          "members": [
            {
              "source_selector": "line[x1=\"192\"][x2=\"352\"][y1=\"258\"], line[x1=\"1404\"][x2=\"1530\"][y1=\"258\"]",
              "treatment": "identity.stroke-strong",
              "expected_count": 2,
              "layout_selector": "#draw line[x1=\"192\"][x2=\"352\"][y1=\"258\"], #draw line[x1=\"1404\"][x2=\"1530\"][y1=\"258\"]",
              "layout_expected_count": 2,
              "evidence": "source-region-identity-anchor",
              "selector": "[data-component-theme-group=\"identity.mapping-title-rules\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [],
      "thumbnail_policy": "catalog-card"
    },
    "native.wise-ppt.095.weighted-arc-web": {
      "component_id": "native.wise-ppt.095.weighted-arc-web",
      "catalog_spec": "native:95",
      "mode": "layout-default",
      "inherit_from": null,
      "source_layout": {
        "layout_id": "wise-ppt.layout.relationship.L1",
        "display_code": "L1",
        "layout_contract": "wise-ppt-layout-theme-bindings@3",
        "frame_contract": "wise-ppt-catalog-theme-frames@6",
        "comparison_scope": "structure-and-provenance-only",
        "evidence": "sourceLayout/sourceRegion",
        "source_ref": "references/gallery-paper-ink/ai/frames/layout-l1.html",
        "source_regions": [
          "weighted-links"
        ],
        "extraction": "include-only",
        "frame_paths": {
          "hermes-orange": "themes/catalog-projections/hermes-klein/frames/hermes-orange/layout-l1.html",
          "klein-blue": "themes/catalog-projections/hermes-klein/frames/klein-blue/layout-l1.html"
        },
        "identity_projection": "component-localized-from-source-region"
      },
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        },
        {
          "binding_id": "token-labels",
          "source_selector": "rect[fill*=\"paper-panel\"]",
          "material": "panel",
          "expected_count": 6,
          "layout_selector": "#draw > g > rect[fill=\"var(--paper-panel)\"]",
          "evidence": "source-region-material-anchor",
          "selector": "[data-component-theme-material=\"panel\"]"
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.token-boxes",
          "label": "六个权重令牌框",
          "members": [
            {
              "source_selector": "rect[fill*=\"paper-panel\"]",
              "treatment": "identity.border",
              "expected_count": 6,
              "layout_selector": "#draw > g > rect[fill=\"var(--paper-panel)\"]",
              "evidence": "source-region-identity-anchor",
              "selector": "[data-component-theme-group=\"identity.token-boxes\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [
        {
          "binding_id": "attention-mid-label",
          "source_selector": "text",
          "text_pattern": "^w ≈ 0.46 · MID$",
          "treatment": "source.ink-text-60",
          "expected_count": 1,
          "layout_selector": "#draw text",
          "layout_text_pattern": "^w ≈ 0.46 · MID$",
          "evidence": "source-region-appearance-anchor",
          "selector": "[data-component-theme-appearance=\"source.ink-text-60\"]"
        },
        {
          "binding_id": "attention-strong-label",
          "source_selector": "text",
          "text_pattern": "^w ≈ 0.87 · STRONG ATTEND$",
          "treatment": "source.ink-text-85",
          "expected_count": 1,
          "layout_selector": "#draw text",
          "layout_text_pattern": "^w ≈ 0.87 · STRONG ATTEND$",
          "evidence": "source-region-appearance-anchor",
          "selector": "[data-component-theme-appearance=\"source.ink-text-85\"]"
        },
        {
          "binding_id": "attention-break-label",
          "source_selector": "text",
          "text_pattern": "^w ≈ 0.04 · ATTENTION BREAK$",
          "treatment": "source.ink-text-75",
          "expected_count": 1,
          "layout_selector": "#draw text",
          "layout_text_pattern": "^w ≈ 0.04 · ATTENTION BREAK$",
          "evidence": "source-region-appearance-anchor",
          "selector": "[data-component-theme-appearance=\"source.ink-text-75\"]"
        }
      ],
      "thumbnail_policy": "catalog-card"
    },
    "native.wise-ppt.096.three-way-radial": {
      "component_id": "native.wise-ppt.096.three-way-radial",
      "catalog_spec": "native:96",
      "mode": "layout-default",
      "inherit_from": null,
      "source_layout": {
        "layout_id": "wise-ppt.layout.relationship.G1",
        "display_code": "G1",
        "layout_contract": "wise-ppt-layout-theme-bindings@3",
        "frame_contract": "wise-ppt-catalog-theme-frames@6",
        "comparison_scope": "structure-and-provenance-only",
        "evidence": "sourceLayout/sourceRegion",
        "source_ref": "references/gallery-paper-ink/ai/frames/layout-g1.html",
        "source_regions": [
          "branches"
        ],
        "extraction": "include-only",
        "frame_paths": {
          "hermes-orange": "themes/catalog-projections/hermes-klein/frames/hermes-orange/layout-g1.html",
          "klein-blue": "themes/catalog-projections/hermes-klein/frames/klein-blue/layout-g1.html"
        },
        "identity_projection": "component-localized-from-source-region"
      },
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        },
        {
          "binding_id": "focus-frame",
          "source_selector": "rect[x=\"770\"][y=\"462\"][width=\"380\"][height=\"116\"]",
          "material": "panel",
          "expected_count": 1,
          "layout_selector": "#g1-focus-frame",
          "evidence": "source-region-material-anchor",
          "selector": "[data-component-theme-material=\"panel\"]"
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.hub-label",
          "label": "MODEL NODE",
          "members": [
            {
              "source_selector": "text",
              "text_pattern": "^MODEL NODE$",
              "treatment": "identity.text",
              "expected_count": 1,
              "layout_selector": "#sample-focus",
              "evidence": "source-region-identity-anchor",
              "selector": "[data-component-theme-group=\"identity.hub-label\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [
        {
          "binding_id": "focus-frame-outline",
          "source_selector": "rect[x=\"770\"][y=\"462\"][width=\"380\"][height=\"116\"]",
          "treatment": "source.g1-focus-outline",
          "expected_count": 1,
          "layout_selector": "#g1-focus-frame",
          "evidence": "source-region-appearance-anchor",
          "selector": "[data-component-theme-appearance=\"source.g1-focus-outline\"]"
        }
      ],
      "thumbnail_policy": "catalog-card"
    },
    "native.wise-ppt.097.nested-frames": {
      "component_id": "native.wise-ppt.097.nested-frames",
      "catalog_spec": "native:97",
      "mode": "layout-default",
      "inherit_from": null,
      "source_layout": {
        "layout_id": "wise-ppt.layout.relationship.H2",
        "display_code": "H2",
        "layout_contract": "wise-ppt-layout-theme-bindings@3",
        "frame_contract": "wise-ppt-catalog-theme-frames@6",
        "comparison_scope": "structure-and-provenance-only",
        "evidence": "sourceLayout/sourceRegion",
        "source_ref": "references/gallery-paper-ink/ai/frames/layout-h2.html",
        "source_regions": [
          "zoom-levels"
        ],
        "extraction": "include-only",
        "frame_paths": {
          "hermes-orange": "themes/catalog-projections/hermes-klein/frames/hermes-orange/layout-h2.html",
          "klein-blue": "themes/catalog-projections/hermes-klein/frames/klein-blue/layout-h2.html"
        },
        "identity_projection": "component-localized-from-source-region"
      },
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        },
        {
          "binding_id": "zoom-system",
          "source_selector": "[data-source-surface=\"h2-system\"]",
          "material": "panel",
          "expected_count": 1,
          "evidence": "source-region-material-anchor",
          "layout_selector": "#h2-system-surface",
          "layout_expected_count": 1,
          "selector": "[data-component-theme-material=\"panel\"]"
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.zoom-level-outlines",
          "label": "四层缩放边界",
          "members": [
            {
              "source_selector": "rect[x=\"514\"][y=\"254\"][width=\"532\"][height=\"532\"]:not([data-source-surface]), rect[x=\"578\"][y=\"318\"][width=\"404\"][height=\"404\"], rect[x=\"642\"][y=\"382\"][width=\"276\"][height=\"276\"], rect[x=\"706\"][y=\"446\"][width=\"148\"][height=\"148\"]",
              "treatment": "identity.stroke",
              "expected_count": 4,
              "layout_selector": "#h2-level-OUTCOME, #h2-level-TASK, #h2-level-SESSION, #h2-focus-frame",
              "layout_expected_count": 4,
              "evidence": "source-region-identity-anchor",
              "selector": "[data-component-theme-group=\"identity.zoom-level-outlines\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [],
      "thumbnail_policy": "catalog-card"
    },
    "native.wise-ppt.098.ranking-bars": {
      "component_id": "native.wise-ppt.098.ranking-bars",
      "catalog_spec": "native:98",
      "mode": "layout-default",
      "inherit_from": null,
      "source_layout": {
        "layout_id": "wise-ppt.layout.relationship.C7",
        "display_code": "C7",
        "layout_contract": "wise-ppt-layout-theme-bindings@3",
        "frame_contract": "wise-ppt-catalog-theme-frames@6",
        "comparison_scope": "structure-and-provenance-only",
        "evidence": "sourceLayout/sourceRegion",
        "source_ref": "references/gallery-paper-ink/ai/frames/layout-c7.html",
        "source_regions": [
          "ranking"
        ],
        "extraction": "include-only",
        "frame_paths": {
          "hermes-orange": "themes/catalog-projections/hermes-klein/frames/hermes-orange/layout-c7.html",
          "klein-blue": "themes/catalog-projections/hermes-klein/frames/klein-blue/layout-c7.html"
        },
        "identity_projection": "component-localized-from-source-region"
      },
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        },
        {
          "binding_id": "ranking-selectors",
          "source_selector": "rect[fill*=\"paper-panel\"]",
          "material": "panel",
          "expected_count": 3,
          "layout_selector": "#draw > g > rect[fill=\"var(--paper-panel)\"]",
          "evidence": "source-region-material-anchor",
          "selector": "[data-component-theme-material=\"panel\"]"
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.selector-headers",
          "label": "下方样本选择器标题",
          "members": [
            {
              "source_selector": "text",
              "text_pattern": "^(?:REASONING|CODING|MATH)$",
              "treatment": "identity.text",
              "expected_count": 3,
              "layout_selector": "[data-vnext-text-key=\"ranking.text.032\"], [data-vnext-text-key=\"ranking.text.035\"], [data-vnext-text-key=\"ranking.text.038\"]",
              "evidence": "source-region-identity-anchor",
              "selector": "[data-component-theme-group=\"identity.selector-headers\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [
        {
          "binding_id": "ranking-primary-bar",
          "source_selector": "rect[x=\"268\"][width=\"64\"]",
          "treatment": "source.line-width-1_2",
          "expected_count": 1,
          "layout_selector": "#draw rect[x=\"268\"][width=\"64\"]",
          "evidence": "source-region-appearance-anchor",
          "selector": "[data-component-theme-appearance=\"source.line-width-1_2\"]"
        },
        {
          "binding_id": "ranking-selector-outlines",
          "source_selector": "rect[y=\"180\"][width=\"182\"][height=\"118\"]",
          "treatment": "source.ink-stroke",
          "expected_count": 3,
          "layout_selector": "#draw rect[y=\"180\"][width=\"182\"][height=\"118\"]",
          "evidence": "source-region-appearance-anchor",
          "selector": "[data-component-theme-appearance=\"source.ink-stroke\"]"
        },
        {
          "binding_id": "ranking-axis-ticks",
          "source_selector": "text",
          "text_pattern": "^(?:0|100|200|300|400)$",
          "treatment": "source.c7-axis-tick-text",
          "expected_count": 5,
          "layout_selector": "#draw text",
          "layout_text_pattern": "^(?:0|100|200|300|400)$",
          "evidence": "source-region-appearance-anchor",
          "selector": "[data-component-theme-appearance=\"source.c7-axis-tick-text\"]"
        },
        {
          "binding_id": "ranking-focus-hatch",
          "source_selector": "defs #c7-hatch30 > line",
          "treatment": "source.c7-focus-hatch",
          "expected_count": 1,
          "layout_selector": "defs #c7-focus-hatch",
          "include_defs": true,
          "evidence": "source-region-appearance-anchor",
          "selector": "[data-component-theme-appearance=\"source.c7-focus-hatch\"]"
        }
      ],
      "thumbnail_policy": "catalog-card"
    },
    "native.wise-ppt.099.serpentine-loop": {
      "component_id": "native.wise-ppt.099.serpentine-loop",
      "catalog_spec": "native:99",
      "mode": "layout-default",
      "inherit_from": null,
      "source_layout": {
        "layout_id": "wise-ppt.layout.relationship.J2",
        "display_code": "J2",
        "layout_contract": "wise-ppt-layout-theme-bindings@3",
        "frame_contract": "wise-ppt-catalog-theme-frames@6",
        "comparison_scope": "structure-and-provenance-only",
        "evidence": "sourceLayout/sourceRegion",
        "source_ref": "references/gallery-paper-ink/ai/frames/layout-j2.html",
        "source_regions": [
          "j2-serpentine-loop"
        ],
        "extraction": "include-only",
        "frame_paths": {
          "hermes-orange": "themes/catalog-projections/hermes-klein/frames/hermes-orange/layout-j2.html",
          "klein-blue": "themes/catalog-projections/hermes-klein/frames/klein-blue/layout-j2.html"
        },
        "identity_projection": "component-localized-from-source-region"
      },
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        },
        {
          "binding_id": "serpentine-step-cards",
          "source_selector": "rect[fill*=\"paper-panel\"]",
          "material": "panel",
          "expected_count": 8,
          "evidence": "source-region-material-anchor",
          "layout_selector": "#draw rect[fill=\"var(--paper-panel)\"]",
          "layout_expected_count": 8,
          "selector": "[data-component-theme-material=\"panel\"]"
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.sequence-numbers",
          "label": "01–08 全序列编号",
          "members": [
            {
              "source_selector": "text",
              "text_pattern": "^0[1-8]$",
              "treatment": "identity.text-all-themes",
              "expected_count": 8,
              "layout_selector": "#draw text",
              "layout_expected_count": 8,
              "layout_text_pattern": "^0[1-8]$",
              "evidence": "source-region-identity-anchor",
              "selector": "[data-component-theme-group=\"identity.sequence-numbers\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [
        {
          "binding_id": "step-card-outlines",
          "source_selector": "rect[fill*=\"paper-panel\"]",
          "treatment": "source.ink-stroke",
          "expected_count": 8,
          "layout_selector": "#draw rect[fill=\"var(--paper-panel)\"]",
          "layout_expected_count": 8,
          "evidence": "source-region-appearance-anchor",
          "selector": "[data-component-theme-appearance=\"source.ink-stroke\"]"
        }
      ],
      "thumbnail_policy": "catalog-card"
    },
    "native.wise-ppt.100.cycle-ring": {
      "component_id": "native.wise-ppt.100.cycle-ring",
      "catalog_spec": "native:100",
      "mode": "layout-default",
      "inherit_from": null,
      "source_layout": {
        "layout_id": "wise-ppt.layout.relationship.J1",
        "display_code": "J1",
        "layout_contract": "wise-ppt-layout-theme-bindings@3",
        "frame_contract": "wise-ppt-catalog-theme-frames@6",
        "comparison_scope": "structure-and-provenance-only",
        "evidence": "sourceLayout/sourceRegion",
        "source_ref": "references/gallery-paper-ink/ai/frames/layout-j1.html",
        "source_regions": [
          "cycle-steps"
        ],
        "extraction": "include-only",
        "frame_paths": {
          "hermes-orange": "themes/catalog-projections/hermes-klein/frames/hermes-orange/layout-j1.html",
          "klein-blue": "themes/catalog-projections/hermes-klein/frames/klein-blue/layout-j1.html"
        },
        "identity_projection": "component-localized-from-source-region"
      },
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        },
        {
          "binding_id": "cycle-context",
          "source_selector": "rect[fill*=\"paper-panel\"]",
          "material": "canvas",
          "expected_count": 4,
          "layout_selector": "#draw > g > rect[fill=\"var(--paper-panel)\"]",
          "evidence": "source-region-material-anchor",
          "selector": "[data-component-theme-material=\"canvas\"]"
        },
        {
          "binding_id": "cycle-system",
          "source_selector": "[data-source-surface=\"j1-system\"]",
          "material": "panel",
          "expected_count": 1,
          "layout_selector": "#j1-system-surface",
          "evidence": "source-region-material-anchor",
          "selector": "[data-component-theme-material=\"panel\"]"
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.loop-core",
          "label": "循环核心",
          "members": [
            {
              "source_selector": "text",
              "text_pattern": "^(?:LOOP|评测治理闭环)$",
              "treatment": "identity.text",
              "expected_count": 2,
              "layout_selector": "#j1-focus-loop, #j1-focus-cn",
              "evidence": "source-region-identity-anchor",
              "selector": "[data-component-theme-group=\"identity.loop-core\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [
        {
          "binding_id": "cycle-context-fill",
          "source_selector": "rect[fill*=\"paper-panel\"]",
          "treatment": "source.j1-context-fill",
          "expected_count": 4,
          "layout_selector": "#draw > g > rect[fill=\"var(--paper-panel)\"]",
          "evidence": "source-region-appearance-anchor",
          "selector": "[data-component-theme-appearance=\"source.j1-context-fill\"]"
        },
        {
          "binding_id": "cycle-numbers",
          "source_selector": "text",
          "text_pattern": "^0[1-4]$",
          "treatment": "source.sequence-text",
          "expected_count": 4,
          "layout_selector": "#draw text[data-number-role=\"sequence\"]",
          "evidence": "source-region-appearance-anchor",
          "selector": "[data-component-theme-appearance=\"source.sequence-text\"]"
        },
        {
          "binding_id": "cycle-title-rules",
          "source_selector": "line[stroke-width=\"1\"]",
          "treatment": "source.functional-stroke-strong",
          "expected_count": 4,
          "layout_selector": "#draw line[x1=\"1270\"][y1=\"326\"][x2=\"1302\"][y2=\"326\"], #draw line[x1=\"1270\"][y1=\"668\"][x2=\"1302\"][y2=\"668\"], #draw line[x1=\"154\"][y1=\"668\"][x2=\"186\"][y2=\"668\"], #draw line[x1=\"154\"][y1=\"326\"][x2=\"186\"][y2=\"326\"]",
          "evidence": "source-region-appearance-anchor",
          "selector": "[data-component-theme-appearance=\"source.functional-stroke-strong\"]"
        }
      ],
      "thumbnail_policy": "catalog-card"
    },
    "native.wise-ppt.101.journey-curve": {
      "component_id": "native.wise-ppt.101.journey-curve",
      "catalog_spec": "native:101",
      "mode": "layout-default",
      "inherit_from": null,
      "source_layout": {
        "layout_id": "wise-ppt.layout.relationship.J3",
        "display_code": "J3",
        "layout_contract": "wise-ppt-layout-theme-bindings@3",
        "frame_contract": "wise-ppt-catalog-theme-frames@6",
        "comparison_scope": "structure-and-provenance-only",
        "evidence": "sourceLayout/sourceRegion",
        "source_ref": "references/gallery-paper-ink/ai/frames/layout-j3.html",
        "source_regions": [
          "journey"
        ],
        "extraction": "include-only",
        "frame_paths": {
          "hermes-orange": "themes/catalog-projections/hermes-klein/frames/hermes-orange/layout-j3.html",
          "klein-blue": "themes/catalog-projections/hermes-klein/frames/klein-blue/layout-j3.html"
        },
        "identity_projection": "component-localized-from-source-region"
      },
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        },
        {
          "binding_id": "journey-tabs",
          "source_selector": "path[fill*=\"paper-panel\"]",
          "material": "panel",
          "expected_count": 5,
          "layout_selector": "#draw > g > path[fill=\"var(--paper-panel)\"]",
          "evidence": "source-region-material-anchor",
          "selector": "[data-component-theme-material=\"panel\"]"
        },
        {
          "binding_id": "journey-open-markers",
          "source_selector": "circle[fill*=\"paper-deep\"][r=\"9\"]",
          "material": "canvas",
          "expected_count": 6,
          "layout_selector": "#draw circle[r=\"9\"]",
          "evidence": "source-region-material-anchor",
          "selector": "[data-component-theme-material=\"canvas\"]"
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.journey-curve",
          "label": "用户旅程主曲线",
          "members": [
            {
              "source_selector": "svg g > path:nth-of-type(6)",
              "treatment": "identity.stroke",
              "expected_count": 1,
              "layout_selector": "#draw > g > path:nth-of-type(6)",
              "evidence": "source-region-identity-anchor",
              "selector": "[data-component-theme-group=\"identity.journey-curve\"]"
            }
          ]
        },
        {
          "group_id": "identity.journey-stage-codes",
          "label": "五个旅程阶段码",
          "members": [
            {
              "source_selector": "text",
              "text_pattern": "^0[1-5] (?:ONBOARD|WOW|DEPTH|STALL|BREAK)$",
              "treatment": "identity.text-source-80",
              "expected_count": 5,
              "layout_selector": "#draw text",
              "layout_text_pattern": "^0[1-5] (?:ONBOARD|WOW|DEPTH|STALL|BREAK)$",
              "evidence": "source-region-identity-anchor",
              "selector": "[data-component-theme-group=\"identity.journey-stage-codes\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [],
      "thumbnail_policy": "catalog-card"
    },
    "native.wise-ppt.102.timeline-axis-horizontal": {
      "component_id": "native.wise-ppt.102.timeline-axis-horizontal",
      "catalog_spec": "native:102",
      "mode": "layout-default",
      "inherit_from": null,
      "source_layout": {
        "layout_id": "wise-ppt.layout.relationship.B1",
        "display_code": "B1",
        "layout_contract": "wise-ppt-layout-theme-bindings@3",
        "frame_contract": "wise-ppt-catalog-theme-frames@6",
        "comparison_scope": "structure-and-provenance-only",
        "evidence": "sourceLayout/sourceRegion",
        "source_ref": "references/gallery-paper-ink/ai/frames/layout-b1.html",
        "source_regions": [
          "milestones"
        ],
        "extraction": "include-only",
        "frame_paths": {
          "hermes-orange": "themes/catalog-projections/hermes-klein/frames/hermes-orange/layout-b1.html",
          "klein-blue": "themes/catalog-projections/hermes-klein/frames/klein-blue/layout-b1.html"
        },
        "identity_projection": "component-localized-from-source-region"
      },
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.model-names",
          "label": "六个模型里程碑名称",
          "members": [
            {
              "source_selector": "text",
              "text_pattern": "^(?:PTM-[1-4]|CHAT-M|R1 / R3)$",
              "treatment": "identity.text",
              "expected_count": 6,
              "layout_selector": "#draw text",
              "layout_expected_count": 6,
              "layout_text_pattern": "^(?:PTM-[1-4]|CHAT-M|R1 / R3)$",
              "evidence": "source-region-identity-anchor",
              "selector": "[data-component-theme-group=\"identity.model-names\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [
        {
          "binding_id": "edge-descriptions",
          "source_selector": "text",
          "text_pattern": "^(?:亿级参数 · 证明可行性|思维链 · 自我反思)$",
          "treatment": "source.ink-text-60",
          "expected_count": 2,
          "layout_selector": "#draw text",
          "layout_expected_count": 2,
          "layout_text_pattern": "^(?:亿级参数 · 证明可行性|思维链 · 自我反思)$",
          "evidence": "source-region-appearance-anchor",
          "selector": "[data-component-theme-appearance=\"source.ink-text-60\"]"
        }
      ],
      "thumbnail_policy": "catalog-card"
    },
    "native.wise-ppt.103.concentric-ring": {
      "component_id": "native.wise-ppt.103.concentric-ring",
      "catalog_spec": "native:103",
      "mode": "layout-default",
      "inherit_from": null,
      "source_layout": {
        "layout_id": "wise-ppt.layout.relationship.H1",
        "display_code": "H1",
        "layout_contract": "wise-ppt-layout-theme-bindings@3",
        "frame_contract": "wise-ppt-catalog-theme-frames@6",
        "comparison_scope": "structure-and-provenance-only",
        "evidence": "sourceLayout/sourceRegion",
        "source_ref": "references/gallery-paper-ink/ai/frames/layout-h1.html",
        "source_regions": [
          "layers"
        ],
        "extraction": "include-only",
        "frame_paths": {
          "hermes-orange": "themes/catalog-projections/hermes-klein/frames/hermes-orange/layout-h1.html",
          "klein-blue": "themes/catalog-projections/hermes-klein/frames/klein-blue/layout-h1.html"
        },
        "identity_projection": "component-localized-from-source-region"
      },
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        },
        {
          "binding_id": "defense-system",
          "source_selector": "[data-source-surface=\"h1-system\"]",
          "material": "panel",
          "expected_count": 1,
          "layout_selector": "#h1-system-surface",
          "evidence": "source-region-material-anchor",
          "selector": "[data-component-theme-material=\"panel\"]"
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.core-outline",
          "label": "模型内核轮廓",
          "members": [
            {
              "source_selector": "[data-source-identity=\"h1-core\"]",
              "treatment": "identity.stroke-detail",
              "expected_count": 1,
              "layout_selector": "#h1-focus-core",
              "evidence": "source-region-identity-anchor",
              "selector": "[data-component-theme-group=\"identity.core-outline\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [
        {
          "binding_id": "defense-layer-labels",
          "source_selector": "text",
          "text_pattern": "^(?:OUTPUT · LAYER|INPUT · LAYER)$",
          "treatment": "source.ink-text-50",
          "expected_count": 2,
          "layout_selector": "#draw text",
          "layout_text_pattern": "^(?:OUTPUT · LAYER|INPUT · LAYER)$",
          "evidence": "source-region-appearance-anchor",
          "selector": "[data-component-theme-appearance=\"source.ink-text-50\"]"
        },
        {
          "binding_id": "defense-guardrail-copy",
          "source_selector": "text",
          "text_pattern": "^(?:SCHEMA|越狱拦截|注入检测|敏感词过滤|毒性过滤|PII 脱敏|事实核查|内容分级)$",
          "treatment": "source.ink-text-70",
          "expected_count": 8,
          "layout_selector": "#draw text",
          "layout_text_pattern": "^(?:SCHEMA|越狱拦截|注入检测|敏感词过滤|毒性过滤|PII 脱敏|事实核查|内容分级)$",
          "evidence": "source-region-appearance-anchor",
          "selector": "[data-component-theme-appearance=\"source.ink-text-70\"]"
        },
        {
          "binding_id": "defense-core-copy",
          "source_selector": "text",
          "text_pattern": "^LLM CORE$",
          "treatment": "source.ink-text-70-brand",
          "expected_count": 1,
          "layout_selector": "#draw text",
          "layout_text_pattern": "^LLM CORE$",
          "evidence": "source-region-appearance-anchor",
          "selector": "[data-component-theme-appearance=\"source.ink-text-70-brand\"]"
        }
      ],
      "thumbnail_policy": "catalog-card"
    },
    "native.wise-ppt.104.timeline-axis-vertical": {
      "component_id": "native.wise-ppt.104.timeline-axis-vertical",
      "catalog_spec": "native:104",
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.key-milestone",
          "label": "PTM-4 关键里程碑",
          "members": [
            {
              "source_selector": "text",
              "treatment": "identity.text",
              "expected_count": 1,
              "evidence": "derived-from-sourced-component-grammar",
              "text_pattern": "^PTM-4$",
              "selector": "[data-component-theme-group=\"identity.key-milestone\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [],
      "default_rule_profile": {
        "archetype": "timeline-milestone",
        "identity_policy": "semantic-anchor",
        "pattern_evidence": [
          {
            "layout_id": "J2",
            "catalog_spec": "native:99",
            "observation": "同一序列的编号必须全部一致，不仅取第一个"
          }
        ],
        "rule": "只将 PTM-4 作为已审查的关键里程碑，不根据 Catalog 分组伪造版式来源"
      },
      "source_review": {
        "status": "reviewed-default-rule",
        "candidates": [
          {
            "layout_id": "B1",
            "evidence": "catalog-grouping-only"
          }
        ]
      },
      "thumbnail_policy": "catalog-card"
    },
    "native.wise-ppt.105.diamond-edge-labels": {
      "component_id": "native.wise-ppt.105.diamond-edge-labels",
      "catalog_spec": "native:105",
      "mode": "layout-default",
      "inherit_from": null,
      "source_layout": {
        "layout_id": "wise-ppt.layout.relationship.P2",
        "display_code": "P2",
        "layout_contract": "wise-ppt-layout-theme-bindings@3",
        "frame_contract": "wise-ppt-catalog-theme-frames@6",
        "comparison_scope": "structure-and-provenance-only",
        "evidence": "sourceLayout/sourceRegion",
        "source_ref": "references/gallery-paper-ink/ai/frames/layout-p2.html",
        "source_regions": [
          "diamond-map"
        ],
        "extraction": "include-only",
        "frame_paths": {
          "hermes-orange": "themes/catalog-projections/hermes-klein/frames/hermes-orange/layout-p2.html",
          "klein-blue": "themes/catalog-projections/hermes-klein/frames/klein-blue/layout-p2.html"
        },
        "identity_projection": "component-localized-from-source-region"
      },
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        },
        {
          "binding_id": "diamond-nodes",
          "source_selector": "rect[fill*=\"pi-paper\"][stroke=\"none\"]",
          "material": "panel",
          "expected_count": 4,
          "layout_selector": "#draw > g > rect[fill=\"var(--paper)\"][stroke=\"none\"]",
          "evidence": "source-region-material-anchor",
          "selector": "[data-component-theme-material=\"panel\"]"
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.node-headings",
          "label": "菱形四节点英文标题",
          "members": [
            {
              "source_selector": "text",
              "text_pattern": "^(?:USER INPUT|RETRIEVED CONTEXTS|RESPONSE|REFERENCE)$",
              "treatment": "identity.text",
              "expected_count": 4,
              "layout_selector": "[data-vnext-text-key=\"diamond-map.text.009\"], [data-vnext-text-key=\"diamond-map.text.011\"], [data-vnext-text-key=\"diamond-map.text.013\"], [data-vnext-text-key=\"diamond-map.text.015\"]",
              "evidence": "source-region-identity-anchor",
              "selector": "[data-component-theme-group=\"identity.node-headings\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [
        {
          "binding_id": "diamond-cjk-headings",
          "source_selector": "text",
          "text_pattern": "^(?:用户问题|检索上下文|模型回答|参考答案)$",
          "treatment": "source.ink-text",
          "expected_count": 4,
          "layout_selector": "#draw text",
          "layout_text_pattern": "^(?:用户问题|检索上下文|模型回答|参考答案)$",
          "evidence": "source-region-appearance-anchor",
          "selector": "[data-component-theme-appearance=\"source.ink-text\"]"
        }
      ],
      "thumbnail_policy": "catalog-card"
    },
    "native.wise-ppt.106.balance-scale": {
      "component_id": "native.wise-ppt.106.balance-scale",
      "catalog_spec": "native:106",
      "mode": "layout-default",
      "inherit_from": null,
      "source_layout": {
        "layout_id": "wise-ppt.layout.relationship.R4",
        "display_code": "R4",
        "layout_contract": "wise-ppt-layout-theme-bindings@3",
        "frame_contract": "wise-ppt-catalog-theme-frames@6",
        "comparison_scope": "structure-and-provenance-only",
        "evidence": "sourceLayout/sourceRegion",
        "source_ref": "capabilities/layouts/native-components.js#106",
        "source_regions": [
          "balance-component"
        ],
        "extraction": "component-first",
        "frame_paths": {
          "hermes-orange": "themes/catalog-projections/hermes-klein/frames/hermes-orange/layout-r4.html",
          "klein-blue": "themes/catalog-projections/hermes-klein/frames/klein-blue/layout-r4.html"
        },
        "identity_projection": "component-localized-from-source-region"
      },
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        },
        {
          "binding_id": "speed-pan",
          "source_selector": "path[data-side-id=\"speed\"]",
          "material": "recessed",
          "expected_count": 1,
          "layout_selector": "#balance-host path[data-side-id=\"speed\"]",
          "evidence": "source-region-material-anchor",
          "selector": "[data-component-theme-material=\"recessed\"]"
        },
        {
          "binding_id": "governance-pan",
          "source_selector": "path[data-side-id=\"governance\"]",
          "material": "panel",
          "expected_count": 1,
          "layout_selector": "#balance-host path[data-side-id=\"governance\"]",
          "evidence": "source-region-material-anchor",
          "selector": "[data-component-theme-material=\"panel\"]"
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.balance-labels",
          "label": "天平两端关键指标",
          "members": [
            {
              "source_selector": "text",
              "text_pattern": "^(?:增长速度|风险控制)$",
              "treatment": "identity.text",
              "expected_count": 2,
              "layout_selector": "#balance-host text",
              "layout_text_pattern": "^(?:上线速度|治理强度)$",
              "evidence": "source-region-identity-anchor",
              "selector": "[data-component-theme-group=\"identity.balance-labels\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [
        {
          "binding_id": "speed-pan-fill",
          "source_selector": "path[data-side-id=\"speed\"]",
          "treatment": "source.r4-speed-fill",
          "expected_count": 1,
          "layout_selector": "#balance-host path[data-side-id=\"speed\"]",
          "evidence": "source-region-appearance-anchor",
          "selector": "[data-component-theme-appearance=\"source.r4-speed-fill\"]"
        }
      ],
      "thumbnail_policy": "catalog-card"
    },
    "native.wise-ppt.107.interlocking-gears": {
      "component_id": "native.wise-ppt.107.interlocking-gears",
      "catalog_spec": "native:107",
      "mode": "layout-default",
      "inherit_from": null,
      "source_layout": {
        "layout_id": "wise-ppt.layout.relationship.R5",
        "display_code": "R5",
        "layout_contract": "wise-ppt-layout-theme-bindings@3",
        "frame_contract": "wise-ppt-catalog-theme-frames@6",
        "comparison_scope": "structure-and-provenance-only",
        "evidence": "sourceLayout/sourceRegion",
        "source_ref": "capabilities/layouts/native-components.js#107",
        "source_regions": [
          "r5-interlocking-gears"
        ],
        "extraction": "component-first",
        "frame_paths": {
          "hermes-orange": "themes/catalog-projections/hermes-klein/frames/hermes-orange/layout-r5.html",
          "klein-blue": "themes/catalog-projections/hermes-klein/frames/klein-blue/layout-r5.html"
        },
        "identity_projection": "component-localized-from-source-region"
      },
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.gear-white-fill",
          "label": "三枚齿轮外形与内圈白色填充",
          "members": [
            {
              "source_selector": "[data-repeat-unit=\"module\"] use, [data-repeat-unit=\"module\"] > circle[r=\"57\"]",
              "treatment": "identity.white-fill",
              "expected_count": 6,
              "layout_selector": "#gears-host [data-repeat-unit=\"module\"] use[href=\"#pi-gear-outline\"], #gears-host [data-repeat-unit=\"module\"] > circle[r=\"57\"]",
              "evidence": "source-region-identity-anchor",
              "selector": "[data-component-theme-group=\"identity.gear-white-fill\"]"
            }
          ]
        },
        {
          "group_id": "identity.gear-labels",
          "label": "内容、模型与评测",
          "members": [
            {
              "source_selector": "text",
              "text_pattern": "^(?:内容|模型|评测)$",
              "treatment": "identity.text-bold",
              "expected_count": 3,
              "layout_selector": "[data-vnext-text-key=\"system.text.004\"], [data-vnext-text-key=\"system.text.006\"], [data-vnext-text-key=\"system.text.008\"]",
              "evidence": "source-region-identity-anchor",
              "selector": "[data-component-theme-group=\"identity.gear-labels\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [],
      "thumbnail_policy": "catalog-card"
    },
    "native.wise-ppt.108.three-principles-radial": {
      "component_id": "native.wise-ppt.108.three-principles-radial",
      "catalog_spec": "native:108",
      "mode": "layout-default",
      "inherit_from": null,
      "source_layout": {
        "layout_id": "wise-ppt.layout.relationship.G5",
        "display_code": "G5",
        "layout_contract": "wise-ppt-layout-theme-bindings@3",
        "frame_contract": "wise-ppt-catalog-theme-frames@6",
        "comparison_scope": "structure-and-provenance-only",
        "evidence": "sourceLayout/sourceRegion",
        "source_ref": "references/gallery-paper-ink/ai/frames/layout-g5.html",
        "source_regions": [
          "dimensions"
        ],
        "extraction": "include-only",
        "frame_paths": {
          "hermes-orange": "themes/catalog-projections/hermes-klein/frames/hermes-orange/layout-g5.html",
          "klein-blue": "themes/catalog-projections/hermes-klein/frames/klein-blue/layout-g5.html"
        },
        "identity_projection": "component-localized-from-source-region"
      },
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        },
        {
          "binding_id": "principle-focus",
          "source_selector": "rect[x=\"760\"][y=\"304\"][width=\"400\"][height=\"164\"]",
          "material": "panel",
          "expected_count": 1,
          "layout_selector": "#draw > g > rect[fill=\"var(--paper-panel)\"]",
          "evidence": "source-region-material-anchor",
          "selector": "[data-component-theme-material=\"panel\"]"
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.focus-statement",
          "label": "一页一个重心",
          "members": [
            {
              "source_selector": "text",
              "text_pattern": "^一页一个重心$",
              "treatment": "identity.text",
              "expected_count": 1,
              "layout_selector": "#g5-focus-title",
              "evidence": "source-region-identity-anchor",
              "selector": "[data-component-theme-group=\"identity.focus-statement\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [
        {
          "binding_id": "principle-spokes",
          "source_selector": "line[x1=\"478\"], line[x1=\"1160\"], line[x1=\"960\"][y1=\"468\"]",
          "treatment": "source.g5-principle-spokes",
          "expected_count": 3,
          "layout_selector": "#draw line[x1=\"478\"], #draw line[x1=\"1160\"], #draw line[x1=\"960\"][y1=\"468\"]",
          "evidence": "source-region-appearance-anchor",
          "selector": "[data-component-theme-appearance=\"source.g5-principle-spokes\"]"
        },
        {
          "binding_id": "principle-focus-outline",
          "source_selector": "rect[x=\"760\"][y=\"304\"][width=\"400\"][height=\"164\"]",
          "treatment": "source.g5-focus-outline",
          "expected_count": 1,
          "layout_selector": "#draw > g > rect[fill=\"var(--paper-panel)\"]",
          "evidence": "source-region-appearance-anchor",
          "selector": "[data-component-theme-appearance=\"source.g5-focus-outline\"]"
        }
      ],
      "thumbnail_policy": "catalog-card"
    },
    "native.wise-ppt.112.credential-cell": {
      "component_id": "native.wise-ppt.112.credential-cell",
      "catalog_spec": "native:112",
      "mode": "layout-default",
      "inherit_from": null,
      "source_layout": {
        "layout_id": "wise-ppt.layout.relationship.A6",
        "display_code": "A6",
        "layout_contract": "wise-ppt-layout-theme-bindings@3",
        "frame_contract": "wise-ppt-catalog-theme-frames@6",
        "comparison_scope": "structure-and-provenance-only",
        "evidence": "sourceLayout/sourceRegion",
        "source_ref": "references/gallery-paper-ink/ai/frames/layout-a6.html",
        "source_regions": [
          "a6-credential-wall"
        ],
        "extraction": "include-only",
        "frame_paths": {
          "hermes-orange": "themes/catalog-projections/hermes-klein/frames/hermes-orange/layout-a6.html",
          "klein-blue": "themes/catalog-projections/hermes-klein/frames/klein-blue/layout-a6.html"
        },
        "identity_projection": "neutral-in-source-region"
      },
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        },
        {
          "binding_id": "credential-cards",
          "source_selector": "rect[fill*=\"paper-panel\"]",
          "material": "panel",
          "expected_count": 12,
          "layout_selector": "#draw > g > rect[fill=\"var(--paper-panel)\"]",
          "evidence": "source-region-material-anchor",
          "selector": "[data-component-theme-material=\"panel\"]"
        }
      ],
      "identity_groups": [],
      "appearance_bindings": [],
      "thumbnail_policy": "catalog-card"
    },
    "native.wise-ppt.113.capability-pillar": {
      "component_id": "native.wise-ppt.113.capability-pillar",
      "catalog_spec": "native:113",
      "mode": "layout-default",
      "inherit_from": null,
      "source_layout": {
        "layout_id": "wise-ppt.layout.relationship.R1",
        "display_code": "R1",
        "layout_contract": "wise-ppt-layout-theme-bindings@3",
        "frame_contract": "wise-ppt-catalog-theme-frames@6",
        "comparison_scope": "structure-and-provenance-only",
        "evidence": "sourceLayout/sourceRegion",
        "source_ref": "references/gallery-paper-ink/ai/frames/layout-r1.html",
        "source_regions": [
          "pillar-a"
        ],
        "extraction": "include-only",
        "frame_paths": {
          "hermes-orange": "themes/catalog-projections/hermes-klein/frames/hermes-orange/layout-r1.html",
          "klein-blue": "themes/catalog-projections/hermes-klein/frames/klein-blue/layout-r1.html"
        },
        "identity_projection": "component-localized-from-source-region"
      },
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        },
        {
          "binding_id": "pillar-a-surface",
          "source_selector": "[data-slot-id=\"pillar-a\"] > rect",
          "material": "panel",
          "expected_count": 1,
          "evidence": "source-region-material-anchor",
          "layout_selector": "#r1-focus-frame",
          "layout_expected_count": 1,
          "selector": "[data-component-theme-material=\"panel\"]"
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.pillar-a",
          "label": "数据柱框与核心图标",
          "members": [
            {
              "source_selector": "[data-slot-id=\"pillar-a\"] > rect",
              "treatment": "identity.border-source-80",
              "expected_count": 1,
              "layout_selector": "#r1-focus-frame",
              "layout_expected_count": 1,
              "evidence": "source-region-identity-anchor",
              "selector": "[data-component-theme-group=\"identity.pillar-a\"]"
            },
            {
              "source_selector": "[data-slot-id=\"pillar-a\"] > svg[data-icon-source] > :is(path,line,polyline,polygon,circle,ellipse,rect,use)",
              "treatment": "identity.stroke-source-80",
              "expected_count": 3,
              "layout_selector": "[data-slot-id=\"pillar-a\"] > svg[data-icon-source] > :is(path,line,polyline,polygon,circle,ellipse,rect,use)",
              "layout_expected_count": 3,
              "evidence": "source-region-identity-anchor",
              "selector": "[data-component-theme-group=\"identity.pillar-a\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [
        {
          "binding_id": "pillar-a-icon-weight",
          "source_selector": "[data-slot-id=\"pillar-a\"] > svg[data-icon-source] > :is(path,line,polyline,polygon,circle,ellipse,rect,use)",
          "treatment": "source.pillar-a-icon",
          "expected_count": 3,
          "layout_selector": "[data-slot-id=\"pillar-a\"] > svg[data-icon-source] > :is(path,line,polyline,polygon,circle,ellipse,rect,use)",
          "layout_expected_count": 3,
          "evidence": "source-region-appearance-anchor",
          "selector": "[data-component-theme-appearance=\"source.pillar-a-icon\"]"
        },
        {
          "binding_id": "pillar-a-divider",
          "source_selector": "[data-slot-id=\"pillar-a\"] > line",
          "treatment": "source.ink-stroke-20",
          "expected_count": 1,
          "layout_selector": "[data-slot-id=\"pillar-a\"] > line",
          "layout_expected_count": 1,
          "evidence": "source-region-appearance-anchor",
          "selector": "[data-component-theme-appearance=\"source.ink-stroke-20\"]"
        }
      ],
      "thumbnail_policy": "catalog-card"
    },
    "native.wise-ppt.120.scenario-column-knowledge": {
      "component_id": "native.wise-ppt.120.scenario-column-knowledge",
      "catalog_spec": "native:120",
      "mode": "layout-default",
      "inherit_from": null,
      "source_layout": {
        "layout_id": "wise-ppt.layout.relationship.K4",
        "display_code": "K4",
        "layout_contract": "wise-ppt-layout-theme-bindings@3",
        "frame_contract": "wise-ppt-catalog-theme-frames@6",
        "comparison_scope": "structure-and-provenance-only",
        "evidence": "sourceLayout/sourceRegion",
        "source_ref": "references/gallery-paper-ink/ai/frames/layout-k4.html",
        "source_regions": [
          "k4-scenario-column-2"
        ],
        "extraction": "include-only",
        "frame_paths": {
          "hermes-orange": "themes/catalog-projections/hermes-klein/frames/hermes-orange/layout-k4.html",
          "klein-blue": "themes/catalog-projections/hermes-klein/frames/klein-blue/layout-k4.html"
        },
        "identity_projection": "component-localized-from-source-region"
      },
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        },
        {
          "binding_id": "scenario-header",
          "source_selector": "rect[y=\"226\"][height=\"42\"][fill*=\"paper-panel\"]",
          "material": "panel",
          "expected_count": 1,
          "layout_selector": "#draw > g > rect[y=\"226\"][height=\"42\"][fill=\"var(--paper-panel)\"]",
          "evidence": "source-region-material-anchor",
          "layout_expected_count": 3,
          "selector": "[data-component-theme-material=\"panel\"]"
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.scene-labels",
          "label": "场景编号 02",
          "members": [
            {
              "source_selector": "text",
              "text_pattern": "^SCENE 02$",
              "treatment": "identity.text",
              "expected_count": 1,
              "layout_selector": "[data-vnext-text-key=\"scenario-matrix.text.004\"]",
              "evidence": "source-region-identity-anchor",
              "selector": "[data-component-theme-group=\"identity.scene-labels\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [],
      "thumbnail_policy": "catalog-card"
    },
    "native.wise-ppt.121.scenario-column-code": {
      "component_id": "native.wise-ppt.121.scenario-column-code",
      "catalog_spec": "native:121",
      "mode": "layout-default",
      "inherit_from": null,
      "source_layout": {
        "layout_id": "wise-ppt.layout.relationship.K4",
        "display_code": "K4",
        "layout_contract": "wise-ppt-layout-theme-bindings@3",
        "frame_contract": "wise-ppt-catalog-theme-frames@6",
        "comparison_scope": "structure-and-provenance-only",
        "evidence": "sourceLayout/sourceRegion",
        "source_ref": "references/gallery-paper-ink/ai/frames/layout-k4.html",
        "source_regions": [
          "k4-scenario-column-3"
        ],
        "extraction": "include-only",
        "frame_paths": {
          "hermes-orange": "themes/catalog-projections/hermes-klein/frames/hermes-orange/layout-k4.html",
          "klein-blue": "themes/catalog-projections/hermes-klein/frames/klein-blue/layout-k4.html"
        },
        "identity_projection": "component-localized-from-source-region"
      },
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        },
        {
          "binding_id": "scenario-header",
          "source_selector": "rect[y=\"226\"][height=\"42\"][fill*=\"paper-panel\"]",
          "material": "panel",
          "expected_count": 1,
          "layout_selector": "#draw > g > rect[y=\"226\"][height=\"42\"][fill=\"var(--paper-panel)\"]",
          "evidence": "source-region-material-anchor",
          "layout_expected_count": 3,
          "selector": "[data-component-theme-material=\"panel\"]"
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.scene-labels",
          "label": "场景编号 03",
          "members": [
            {
              "source_selector": "text",
              "text_pattern": "^SCENE 03$",
              "treatment": "identity.text",
              "expected_count": 1,
              "layout_selector": "[data-vnext-text-key=\"scenario-matrix.text.006\"]",
              "evidence": "source-region-identity-anchor",
              "selector": "[data-component-theme-group=\"identity.scene-labels\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [],
      "thumbnail_policy": "catalog-card"
    },
    "native.wise-ppt.127.capability-pillar-model": {
      "component_id": "native.wise-ppt.127.capability-pillar-model",
      "catalog_spec": "native:127",
      "mode": "layout-default",
      "inherit_from": null,
      "source_layout": {
        "layout_id": "wise-ppt.layout.relationship.R1",
        "display_code": "R1",
        "layout_contract": "wise-ppt-layout-theme-bindings@3",
        "frame_contract": "wise-ppt-catalog-theme-frames@6",
        "comparison_scope": "structure-and-provenance-only",
        "evidence": "sourceLayout/sourceRegion",
        "source_ref": "references/gallery-paper-ink/ai/frames/layout-r1.html",
        "source_regions": [
          "pillar-b"
        ],
        "extraction": "include-only",
        "frame_paths": {
          "hermes-orange": "themes/catalog-projections/hermes-klein/frames/hermes-orange/layout-r1.html",
          "klein-blue": "themes/catalog-projections/hermes-klein/frames/klein-blue/layout-r1.html"
        },
        "identity_projection": "neutral-in-source-region"
      },
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [],
      "appearance_bindings": [
        {
          "binding_id": "pillar-b-outline",
          "source_selector": "[data-slot-id=\"pillar-b\"] > rect",
          "treatment": "source.pillar-b-outline",
          "expected_count": 1,
          "layout_selector": "[data-slot-id=\"pillar-b\"] > rect",
          "layout_expected_count": 1,
          "evidence": "source-region-appearance-anchor",
          "selector": "[data-component-theme-appearance=\"source.pillar-b-outline\"]"
        },
        {
          "binding_id": "pillar-b-icon-outer",
          "source_selector": "[data-slot-id=\"pillar-b\"] > svg[data-icon-source] > :is(path,line,polyline,polygon,circle,ellipse,rect,use):nth-child(1)",
          "treatment": "source.pillar-b-icon",
          "expected_count": 1,
          "layout_selector": "[data-slot-id=\"pillar-b\"] > svg[data-icon-source] > :is(path,line,polyline,polygon,circle,ellipse,rect,use):nth-child(1)",
          "layout_expected_count": 1,
          "evidence": "source-region-appearance-anchor",
          "selector": "[data-component-theme-appearance=\"source.pillar-b-icon\"]"
        },
        {
          "binding_id": "pillar-b-icon-core",
          "source_selector": "[data-slot-id=\"pillar-b\"] > svg[data-icon-source] > :is(path,line,polyline,polygon,circle,ellipse,rect,use):nth-child(2)",
          "treatment": "source.pillar-b-icon",
          "expected_count": 1,
          "layout_selector": "[data-slot-id=\"pillar-b\"] > svg[data-icon-source] > :is(path,line,polyline,polygon,circle,ellipse,rect,use):nth-child(2)",
          "layout_expected_count": 1,
          "evidence": "source-region-appearance-anchor",
          "selector": "[data-component-theme-appearance=\"source.pillar-b-icon\"]"
        },
        {
          "binding_id": "pillar-b-icon-pins",
          "source_selector": "[data-slot-id=\"pillar-b\"] > svg[data-icon-source] > :is(path,line,polyline,polygon,circle,ellipse,rect,use):nth-child(n+3)",
          "treatment": "source.pillar-b-icon",
          "expected_count": 1,
          "layout_selector": "[data-slot-id=\"pillar-b\"] > svg[data-icon-source] > :is(path,line,polyline,polygon,circle,ellipse,rect,use):nth-child(n+3)",
          "layout_expected_count": 1,
          "evidence": "source-region-appearance-anchor",
          "selector": "[data-component-theme-appearance=\"source.pillar-b-icon\"]"
        },
        {
          "binding_id": "pillar-b-divider",
          "source_selector": "[data-slot-id=\"pillar-b\"] > line",
          "treatment": "source.ink-stroke-20",
          "expected_count": 1,
          "layout_selector": "[data-slot-id=\"pillar-b\"] > line",
          "layout_expected_count": 1,
          "evidence": "source-region-appearance-anchor",
          "selector": "[data-component-theme-appearance=\"source.ink-stroke-20\"]"
        },
        {
          "binding_id": "pillar-b-hatch",
          "source_selector": "pattern[id^=\"r1-127-hatch\"] line",
          "treatment": "source.hatch-line",
          "expected_count": 1,
          "include_defs": true,
          "layout_selector": "pattern#r1-hatch > line",
          "layout_expected_count": 1,
          "evidence": "source-region-appearance-anchor",
          "selector": "[data-component-theme-appearance=\"source.hatch-line\"]"
        }
      ],
      "thumbnail_policy": "catalog-card"
    },
    "native.wise-ppt.130.compare-metrics-table": {
      "component_id": "native.wise-ppt.130.compare-metrics-table",
      "catalog_spec": "native:130",
      "mode": "layout-default",
      "inherit_from": null,
      "source_layout": {
        "layout_id": "wise-ppt.layout.relationship.U2",
        "display_code": "U2",
        "layout_contract": "wise-ppt-layout-theme-bindings@3",
        "frame_contract": "wise-ppt-catalog-theme-frames@6",
        "comparison_scope": "structure-and-provenance-only",
        "evidence": "sourceLayout/sourceRegion",
        "source_ref": "references/gallery-paper-ink/ai/frames/layout-u2.html",
        "source_regions": [
          "scorecard"
        ],
        "extraction": "include-only",
        "frame_paths": {
          "hermes-orange": "themes/catalog-projections/hermes-klein/frames/hermes-orange/layout-u2.html",
          "klein-blue": "themes/catalog-projections/hermes-klein/frames/klein-blue/layout-u2.html"
        },
        "identity_projection": "neutral-in-source-region"
      },
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        }
      ],
      "identity_groups": [],
      "appearance_bindings": [
        {
          "binding_id": "metric-table-headers",
          "source_selector": ".pi-cmt-head",
          "treatment": "source.u2-metric-header-text",
          "expected_count": 4,
          "layout_selector": "#scorecard > text",
          "layout_text_pattern": "^(?:指标|方案 A|方案 B|涨幅)$",
          "evidence": "source-region-appearance-anchor",
          "selector": "[data-component-theme-appearance=\"source.u2-metric-header-text\"]"
        }
      ],
      "thumbnail_policy": "catalog-card"
    },
    "native.wise-ppt.131.lever-balance": {
      "component_id": "native.wise-ppt.131.lever-balance",
      "catalog_spec": "native:131",
      "mode": "layout-default",
      "inherit_from": null,
      "source_layout": {
        "layout_id": "wise-ppt.layout.relationship.U3",
        "display_code": "U3",
        "layout_contract": "wise-ppt-layout-theme-bindings@3",
        "frame_contract": "wise-ppt-catalog-theme-frames@6",
        "comparison_scope": "structure-and-provenance-only",
        "evidence": "sourceLayout/sourceRegion",
        "source_ref": "references/gallery-paper-ink/ai/frames/layout-u3.html",
        "source_regions": [
          "lever-balance"
        ],
        "extraction": "include-only",
        "frame_paths": {
          "hermes-orange": "themes/catalog-projections/hermes-klein/frames/hermes-orange/layout-u3.html",
          "klein-blue": "themes/catalog-projections/hermes-klein/frames/klein-blue/layout-u3.html"
        },
        "identity_projection": "component-localized-from-source-region"
      },
      "material_bindings": [
        {
          "binding_id": "component-canvas",
          "source_selector": ":scope",
          "selector": "[data-component-theme-material=\"canvas\"]",
          "material": "canvas",
          "expected_count": 1
        },
        {
          "binding_id": "component-source-panels",
          "source_selector": "[fill*=\"paper-panel\"], [fill*=\"pi-paper-panel\"], [style*=\"paper-panel\"], [style*=\"pi-paper-panel\"]",
          "selector": "[data-component-theme-material=\"panel\"]",
          "material": "panel",
          "expected_count": 1,
          "evidence": "component-neutral-material-token"
        }
      ],
      "identity_groups": [
        {
          "group_id": "identity.lever-nodes",
          "label": "杠杆主线与两端节点",
          "members": [
            {
              "source_selector": "#lever-stock-node, #lever-outcome-node",
              "treatment": "identity.data-series",
              "expected_count": 2,
              "layout_selector": "#lever-stock-node, #lever-outcome-node",
              "layout_expected_count": 2,
              "evidence": "source-region-identity-anchor",
              "selector": "[data-component-theme-group=\"identity.lever-nodes\"]"
            },
            {
              "source_selector": "#lever-beam, #lever-pivot",
              "treatment": "identity.stroke",
              "expected_count": 2,
              "layout_selector": "#lever-beam, #lever-pivot",
              "layout_expected_count": 2,
              "evidence": "source-region-identity-anchor",
              "selector": "[data-component-theme-group=\"identity.lever-nodes\"]"
            }
          ]
        }
      ],
      "appearance_bindings": [],
      "thumbnail_policy": "catalog-card"
    },
    "native.wise-ppt.media.reconstructed-image": {
      "component_id": "native.wise-ppt.media.reconstructed-image",
      "catalog_spec": null,
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [],
      "identity_groups": [],
      "appearance_bindings": [],
      "thumbnail_policy": "none-route-only"
    },
    "native.wise-ppt.semantic.comparison-matrix-wide": {
      "component_id": "native.wise-ppt.semantic.comparison-matrix-wide",
      "catalog_spec": null,
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [],
      "identity_groups": [],
      "appearance_bindings": [],
      "thumbnail_policy": "none-route-only"
    },
    "native.wise-ppt.semantic.constellation-network": {
      "component_id": "native.wise-ppt.semantic.constellation-network",
      "catalog_spec": null,
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [],
      "identity_groups": [],
      "appearance_bindings": [],
      "thumbnail_policy": "none-route-only"
    },
    "native.wise-ppt.semantic.credential-badge": {
      "component_id": "native.wise-ppt.semantic.credential-badge",
      "catalog_spec": null,
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [],
      "identity_groups": [],
      "appearance_bindings": [],
      "thumbnail_policy": "none-route-only"
    },
    "native.wise-ppt.semantic.evidence-panel": {
      "component_id": "native.wise-ppt.semantic.evidence-panel",
      "catalog_spec": null,
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [],
      "identity_groups": [],
      "appearance_bindings": [],
      "source_review": {
        "status": "multi-source-route-provenance",
        "candidates": [
          {
            "layout_id": "wise-ppt.layout.relationship.Q2",
            "display_code": "Q2",
            "evidence": "layout-embeds-same-component",
            "source_ref": "references/gallery-paper-ink/ai/frames/layout-q2.html"
          },
          {
            "layout_id": "wise-ppt.layout.relationship.Q4",
            "display_code": "Q4",
            "evidence": "layout-embeds-same-component",
            "source_ref": "references/gallery-paper-ink/ai/frames/layout-q4.html"
          },
          {
            "layout_id": "wise-ppt.layout.relationship.R6",
            "display_code": "R6",
            "evidence": "layout-embeds-same-component",
            "source_ref": "references/gallery-paper-ink/ai/frames/layout-r6.html"
          },
          {
            "layout_id": "wise-ppt.layout.relationship.S2",
            "display_code": "S2",
            "evidence": "layout-embeds-same-component",
            "source_ref": "references/gallery-paper-ink/ai/frames/layout-s2.html"
          },
          {
            "layout_id": "wise-ppt.layout.relationship.S3",
            "display_code": "S3",
            "evidence": "layout-embeds-same-component",
            "source_ref": "references/gallery-paper-ink/ai/frames/layout-s3.html"
          }
        ]
      },
      "thumbnail_policy": "none-route-only"
    },
    "native.wise-ppt.semantic.hierarchy-levels": {
      "component_id": "native.wise-ppt.semantic.hierarchy-levels",
      "catalog_spec": null,
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [],
      "identity_groups": [],
      "appearance_bindings": [],
      "thumbnail_policy": "none-route-only"
    },
    "native.wise-ppt.semantic.icon-grid": {
      "component_id": "native.wise-ppt.semantic.icon-grid",
      "catalog_spec": null,
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [],
      "identity_groups": [],
      "appearance_bindings": [],
      "source_review": {
        "status": "multi-source-route-provenance",
        "candidates": [
          {
            "layout_id": "wise-ppt.layout.relationship.R3",
            "display_code": "R3",
            "evidence": "layout-embeds-same-component",
            "source_ref": "references/gallery-paper-ink/ai/frames/layout-r3.html"
          },
          {
            "layout_id": "wise-ppt.layout.relationship.R7",
            "display_code": "R7",
            "evidence": "layout-embeds-same-component",
            "source_ref": "references/gallery-paper-ink/ai/frames/layout-r7.html"
          }
        ]
      },
      "thumbnail_policy": "none-route-only"
    },
    "native.wise-ppt.semantic.metric-band": {
      "component_id": "native.wise-ppt.semantic.metric-band",
      "catalog_spec": null,
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [],
      "identity_groups": [],
      "appearance_bindings": [],
      "source_review": {
        "status": "multi-source-route-provenance",
        "candidates": [
          {
            "layout_id": "wise-ppt.layout.relationship.R2",
            "display_code": "R2",
            "evidence": "layout-embeds-same-component",
            "source_ref": "references/gallery-paper-ink/ai/frames/layout-r2.html"
          },
          {
            "layout_id": "wise-ppt.layout.relationship.R6",
            "display_code": "R6",
            "evidence": "layout-embeds-same-component",
            "source_ref": "references/gallery-paper-ink/ai/frames/layout-r6.html"
          },
          {
            "layout_id": "wise-ppt.layout.relationship.S3",
            "display_code": "S3",
            "evidence": "layout-embeds-same-component",
            "source_ref": "references/gallery-paper-ink/ai/frames/layout-s3.html"
          }
        ]
      },
      "thumbnail_policy": "none-route-only"
    },
    "native.wise-ppt.semantic.particle-hero": {
      "component_id": "native.wise-ppt.semantic.particle-hero",
      "catalog_spec": null,
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [],
      "identity_groups": [],
      "appearance_bindings": [],
      "thumbnail_policy": "none-route-only"
    },
    "native.wise-ppt.semantic.process-strip": {
      "component_id": "native.wise-ppt.semantic.process-strip",
      "catalog_spec": null,
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [],
      "identity_groups": [],
      "appearance_bindings": [],
      "source_review": {
        "status": "multi-source-route-provenance",
        "candidates": [
          {
            "layout_id": "wise-ppt.layout.relationship.Q3",
            "display_code": "Q3",
            "evidence": "layout-embeds-same-component",
            "source_ref": "references/gallery-paper-ink/ai/frames/layout-q3.html"
          },
          {
            "layout_id": "wise-ppt.layout.relationship.R2",
            "display_code": "R2",
            "evidence": "layout-embeds-same-component",
            "source_ref": "references/gallery-paper-ink/ai/frames/layout-r2.html"
          },
          {
            "layout_id": "wise-ppt.layout.relationship.R6",
            "display_code": "R6",
            "evidence": "layout-embeds-same-component",
            "source_ref": "references/gallery-paper-ink/ai/frames/layout-r6.html"
          },
          {
            "layout_id": "wise-ppt.layout.relationship.S3",
            "display_code": "S3",
            "evidence": "layout-embeds-same-component",
            "source_ref": "references/gallery-paper-ink/ai/frames/layout-s3.html"
          }
        ]
      },
      "thumbnail_policy": "none-route-only"
    },
    "native.wise-ppt.semantic.scenario-column": {
      "component_id": "native.wise-ppt.semantic.scenario-column",
      "catalog_spec": null,
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [],
      "identity_groups": [],
      "appearance_bindings": [],
      "source_review": {
        "status": "route-only-unique-provenance",
        "candidates": [
          {
            "layout_id": "wise-ppt.layout.relationship.R1",
            "display_code": "R1",
            "evidence": "layout-embeds-same-component",
            "source_ref": "references/gallery-paper-ink/ai/frames/layout-r1.html"
          }
        ],
        "instance_resolution": {
          "pillar-a": "native.wise-ppt.113.capability-pillar",
          "pillar-b": "native.wise-ppt.127.capability-pillar-model",
          "pillar-c": "native.wise-ppt.113.capability-pillar",
          "pillar-d": "native.wise-ppt.127.capability-pillar-model"
        }
      },
      "thumbnail_policy": "none-route-only"
    },
    "native.wise-ppt.semantic.statement-band": {
      "component_id": "native.wise-ppt.semantic.statement-band",
      "catalog_spec": null,
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [],
      "identity_groups": [],
      "appearance_bindings": [],
      "source_review": {
        "status": "multi-source-route-provenance",
        "candidates": [
          {
            "layout_id": "wise-ppt.layout.relationship.R2",
            "display_code": "R2",
            "evidence": "layout-embeds-same-component",
            "source_ref": "references/gallery-paper-ink/ai/frames/layout-r2.html"
          },
          {
            "layout_id": "wise-ppt.layout.relationship.R6",
            "display_code": "R6",
            "evidence": "layout-embeds-same-component",
            "source_ref": "references/gallery-paper-ink/ai/frames/layout-r6.html"
          }
        ]
      },
      "thumbnail_policy": "none-route-only"
    },
    "native.wise-ppt.semantic.weighted-arcs": {
      "component_id": "native.wise-ppt.semantic.weighted-arcs",
      "catalog_spec": null,
      "mode": "default-rule",
      "inherit_from": null,
      "source_layout": null,
      "material_bindings": [],
      "identity_groups": [],
      "appearance_bindings": [],
      "thumbnail_policy": "none-route-only"
    }
  },
  "contract_sha256": "ba817c9d8a7e57bfb0347af46e5548860d469d23f36799fb36352228f93e5426"
});
