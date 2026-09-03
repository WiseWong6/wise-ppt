/* Generated from themes/registry.json and wise-ppt-theme@5 packages. Do not edit. */
window.WISE_PPT_THEME_REGISTRY_DATA = {
  "contract": "wise-ppt-theme-catalog-projection@1",
  "default_theme_id": "paper-ink",
  "catalog_projection": {
    "contract": "wise-ppt-catalog-theme-projection@1",
    "path": "themes/catalog-projections/hermes-klein",
    "master_theme_id": "hermes-orange",
    "derived_theme_ids": [
      "klein-blue"
    ]
  },
  "themes": [
    {
      "theme_id": "paper-ink",
      "name": "纸墨",
      "description": "克制、理性、纸本编辑感",
      "default_typography_mode": "all-sans",
      "icon_source_family": "redraw-v3",
      "catalog_aliases": [],
      "swatches": {
        "background": "#DFE0D9",
        "text": "#191917",
        "accent": "#C0392B"
      }
    },
    {
      "theme_id": "hermes-orange",
      "name": "爱马仕橙",
      "description": "明快、编辑化、品牌感",
      "default_typography_mode": "mixed",
      "icon_source_family": "tabler-original-v3.46.0",
      "catalog_aliases": [
        "scheme-k-hermes"
      ],
      "swatches": {
        "background": "#F2EFE9",
        "text": "#1A1A1A",
        "accent": "#D95E00"
      }
    },
    {
      "theme_id": "klein-blue",
      "name": "克莱因蓝",
      "description": "冷静、建筑化、品牌感",
      "default_typography_mode": "mixed",
      "icon_source_family": "tabler-original-v3.46.0",
      "catalog_aliases": [
        "scheme-l-klein"
      ],
      "swatches": {
        "background": "#F2EFE9",
        "text": "#1A1A1A",
        "accent": "#002FA7"
      }
    }
  ],
  "typography": {
    "contract": "wise-ppt-typography-modes@1",
    "deck_attribute": "data-typography-mode",
    "modes": [
      {
        "mode_id": "all-sans",
        "name": "黑体",
        "description": "使用当前主题登记的无衬线字体配方"
      },
      {
        "mode_id": "all-serif",
        "name": "宋体",
        "description": "使用当前主题登记的衬线字体配方"
      },
      {
        "mode_id": "mixed",
        "name": "混合",
        "description": "按当前主题的语义位置组合字体"
      }
    ]
  }
};
