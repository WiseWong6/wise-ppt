window.WISE_PPT_ECHARTS_GALLERY_DATA = {
  "contract_version": 1,
  "gallery_id": "wise-ppt-echarts-gallery",
  "generated_from": "capabilities/vendors/echarts/catalog.json",
  "component_count": 12,
  "components": [
    {
      "component_id": "echarts.line-basic",
      "series_type": "line",
      "name": "基础折线图",
      "aliases": [
        "折线图",
        "趋势图",
        "line"
      ],
      "tasks": [
        "trend",
        "time-series",
        "comparison"
      ],
      "roles": [
        "explain",
        "prove"
      ],
      "relations": [
        "trend",
        "comparison"
      ],
      "primitives": [
        "coordinate-plot"
      ],
      "renderer_kinds": [
        "svg",
        "canvas"
      ],
      "component_sources": [
        "echarts"
      ],
      "dataset_mode": "direct",
      "example": "capabilities/vendors/echarts/examples/line-basic.json",
      "selection_notes": "连续序列趋势；类目轴或时间轴上的单数值系列。",
      "group": "trend",
      "group_label": "趋势",
      "title": "基础折线图",
      "chart_type": "line",
      "source_url": "https://echarts.apache.org/examples/zh/index.html#chart-type-line",
      "source_note": "改编自 Apache ECharts 官方示例 doc-example/tutorial-api-1。原示例 series[].data 硬编码，已抽成 dataset.source 并通过 series.encode 引用列名。",
      "upstream_license": "Apache-2.0",
      "render_plan_binding": {
        "renderer_kind": "svg",
        "component_source": "echarts",
        "component_id": "echarts.line-basic",
        "theme_adapter_id": "paper-ink.echarts",
        "data_binding": {
          "data_ref": {
            "content_id": "item.weekly-visits",
            "json_pointer": "/structured_data/rows"
          },
          "dataset_id": "dataset.line-basic",
          "encode": {
            "x": "week",
            "y": "amount"
          }
        }
      },
      "dataset_shape": {
        "dimensions": [
          "week",
          "amount"
        ],
        "source": [
          {
            "week": "周一",
            "amount": 150
          },
          {
            "week": "周二",
            "amount": 230
          },
          {
            "week": "周三",
            "amount": 224
          },
          {
            "week": "周四",
            "amount": 218
          },
          {
            "week": "周五",
            "amount": 135
          },
          {
            "week": "周六",
            "amount": 147
          },
          {
            "week": "周日",
            "amount": 260
          }
        ]
      },
      "option": {
        "dataset": {
          "dimensions": [
            "week",
            "amount"
          ],
          "source": [
            {
              "week": "周一",
              "amount": 150
            },
            {
              "week": "周二",
              "amount": 230
            },
            {
              "week": "周三",
              "amount": 224
            },
            {
              "week": "周四",
              "amount": 218
            },
            {
              "week": "周五",
              "amount": 135
            },
            {
              "week": "周六",
              "amount": 147
            },
            {
              "week": "周日",
              "amount": 260
            }
          ]
        },
        "tooltip": {
          "trigger": "axis"
        },
        "xAxis": {
          "type": "category"
        },
        "yAxis": {
          "type": "value"
        },
        "series": [
          {
            "name": "访问量",
            "type": "line",
            "encode": {
              "x": "week",
              "y": "amount"
            },
            "smooth": false
          }
        ]
      },
      "snippet": "<div class=\"wise-ppt-echart\" data-block-id=\"block.main\" data-renderer-kind=\"svg\" data-component-source=\"echarts\" data-component-id=\"echarts.line-basic\" data-theme-adapter-id=\"paper-ink.echarts\" data-content-ref=\"item.weekly-visits\" data-dataset-id=\"dataset.line-basic\" style=\"width:100%;height:100%\"><\/div>\n<script type=\"application/json\" data-wise-ppt-dataset=\"dataset.line-basic\">{\"dimensions\":[\"week\",\"amount\"],\"source\":[{\"week\":\"周一\",\"amount\":150},{\"week\":\"周二\",\"amount\":230},{\"week\":\"周三\",\"amount\":224},{\"week\":\"周四\",\"amount\":218},{\"week\":\"周五\",\"amount\":135},{\"week\":\"周六\",\"amount\":147},{\"week\":\"周日\",\"amount\":260}]}<\/script>",
      "init_script": "<script>\n(function(){\n  var slide=document.currentScript.closest('.slide');\n  var target=slide.querySelector('[data-component-id=\"echarts.line-basic\"]');\n  var option={\"dataset\":{\"dimensions\":[\"week\",\"amount\"],\"source\":[{\"week\":\"周一\",\"amount\":150},{\"week\":\"周二\",\"amount\":230},{\"week\":\"周三\",\"amount\":224},{\"week\":\"周四\",\"amount\":218},{\"week\":\"周五\",\"amount\":135},{\"week\":\"周六\",\"amount\":147},{\"week\":\"周日\",\"amount\":260}]},\"tooltip\":{\"trigger\":\"axis\"},\"xAxis\":{\"type\":\"category\"},\"yAxis\":{\"type\":\"value\"},\"series\":[{\"name\":\"访问量\",\"type\":\"line\",\"encode\":{\"x\":\"week\",\"y\":\"amount\"},\"smooth\":false}]};\n  WisePPT.createEChart(slide,target,option);\n})();\n<\/script>",
      "caveats": {},
      "notes": "原官方示例把数据写在 series[0].data 里；本版用 dataset + encode，数据与页面 JSON 块逐值相等，满足 wise-ppt 运行时门禁 createEChart 的 dataset 一致性校验。"
    },
    {
      "component_id": "echarts.line-smooth",
      "series_type": "line",
      "name": "平滑折线图",
      "aliases": [
        "平滑趋势图",
        "smooth line"
      ],
      "tasks": [
        "trend",
        "time-series"
      ],
      "roles": [
        "explain",
        "prove"
      ],
      "relations": [
        "trend"
      ],
      "primitives": [
        "coordinate-plot"
      ],
      "renderer_kinds": [
        "svg",
        "canvas"
      ],
      "component_sources": [
        "echarts"
      ],
      "dataset_mode": "direct",
      "example": "capabilities/vendors/echarts/examples/line-smooth.json",
      "selection_notes": "强调连续变化形态；数据点之间没有连续含义时不用平滑。",
      "group": "trend",
      "group_label": "趋势",
      "title": "基础平滑折线图",
      "chart_type": "line",
      "source_url": "https://echarts.apache.org/examples/zh/index.html#chart-type-line",
      "source_note": "改编自 Apache ECharts 官方示例 doc-example/tutorial-api-2。series.smooth=true 实现平滑曲线；数据已抽成 dataset + encode。",
      "upstream_license": "Apache-2.0",
      "render_plan_binding": {
        "renderer_kind": "svg",
        "component_source": "echarts",
        "component_id": "echarts.line-smooth",
        "theme_adapter_id": "paper-ink.echarts",
        "data_binding": {
          "data_ref": {
            "content_id": "item.temperature-range",
            "json_pointer": "/structured_data/rows"
          },
          "dataset_id": "dataset.line-smooth",
          "encode": {
            "x": "date",
            "y": [
              "min",
              "max"
            ]
          }
        }
      },
      "dataset_shape": {
        "dimensions": [
          "date",
          "min",
          "max"
        ],
        "source": [
          {
            "date": "05-01",
            "min": 14,
            "max": 23
          },
          {
            "date": "05-02",
            "min": 16,
            "max": 25
          },
          {
            "date": "05-03",
            "min": 15,
            "max": 24
          },
          {
            "date": "05-04",
            "min": 13,
            "max": 21
          },
          {
            "date": "05-05",
            "min": 12,
            "max": 20
          },
          {
            "date": "05-06",
            "min": 14,
            "max": 22
          },
          {
            "date": "05-07",
            "min": 17,
            "max": 26
          }
        ]
      },
      "option": {
        "dataset": {
          "dimensions": [
            "date",
            "min",
            "max"
          ],
          "source": [
            {
              "date": "05-01",
              "min": 14,
              "max": 23
            },
            {
              "date": "05-02",
              "min": 16,
              "max": 25
            },
            {
              "date": "05-03",
              "min": 15,
              "max": 24
            },
            {
              "date": "05-04",
              "min": 13,
              "max": 21
            },
            {
              "date": "05-05",
              "min": 12,
              "max": 20
            },
            {
              "date": "05-06",
              "min": 14,
              "max": 22
            },
            {
              "date": "05-07",
              "min": 17,
              "max": 26
            }
          ]
        },
        "tooltip": {
          "trigger": "axis"
        },
        "legend": {
          "data": [
            "最低气温",
            "最高气温"
          ]
        },
        "xAxis": {
          "type": "category",
          "boundaryGap": false
        },
        "yAxis": {
          "type": "value",
          "axisLabel": {
            "formatter": "{value} °C"
          }
        },
        "series": [
          {
            "name": "最低气温",
            "type": "line",
            "encode": {
              "x": "date",
              "y": "min"
            },
            "smooth": true
          },
          {
            "name": "最高气温",
            "type": "line",
            "encode": {
              "x": "date",
              "y": "max"
            },
            "smooth": true
          }
        ]
      },
      "snippet": "<div class=\"wise-ppt-echart\" data-block-id=\"block.main\" data-renderer-kind=\"svg\" data-component-source=\"echarts\" data-component-id=\"echarts.line-smooth\" data-theme-adapter-id=\"paper-ink.echarts\" data-content-ref=\"item.temperature-range\" data-dataset-id=\"dataset.line-smooth\" style=\"width:100%;height:100%\"><\/div>\n<script type=\"application/json\" data-wise-ppt-dataset=\"dataset.line-smooth\">{\"dimensions\":[\"date\",\"min\",\"max\"],\"source\":[{\"date\":\"05-01\",\"min\":14,\"max\":23},{\"date\":\"05-02\",\"min\":16,\"max\":25},{\"date\":\"05-03\",\"min\":15,\"max\":24},{\"date\":\"05-04\",\"min\":13,\"max\":21},{\"date\":\"05-05\",\"min\":12,\"max\":20},{\"date\":\"05-06\",\"min\":14,\"max\":22},{\"date\":\"05-07\",\"min\":17,\"max\":26}]}<\/script>",
      "init_script": "<script>\n(function(){\n  var slide=document.currentScript.closest('.slide');\n  var target=slide.querySelector('[data-component-id=\"echarts.line-smooth\"]');\n  var option={\"dataset\":{\"dimensions\":[\"date\",\"min\",\"max\"],\"source\":[{\"date\":\"05-01\",\"min\":14,\"max\":23},{\"date\":\"05-02\",\"min\":16,\"max\":25},{\"date\":\"05-03\",\"min\":15,\"max\":24},{\"date\":\"05-04\",\"min\":13,\"max\":21},{\"date\":\"05-05\",\"min\":12,\"max\":20},{\"date\":\"05-06\",\"min\":14,\"max\":22},{\"date\":\"05-07\",\"min\":17,\"max\":26}]},\"tooltip\":{\"trigger\":\"axis\"},\"legend\":{\"data\":[\"最低气温\",\"最高气温\"]},\"xAxis\":{\"type\":\"category\",\"boundaryGap\":false},\"yAxis\":{\"type\":\"value\",\"axisLabel\":{\"formatter\":\"{value} °C\"}},\"series\":[{\"name\":\"最低气温\",\"type\":\"line\",\"encode\":{\"x\":\"date\",\"y\":\"min\"},\"smooth\":true},{\"name\":\"最高气温\",\"type\":\"line\",\"encode\":{\"x\":\"date\",\"y\":\"max\"},\"smooth\":true}]};\n  WisePPT.createEChart(slide,target,option);\n})();\n<\/script>",
      "caveats": {},
      "notes": "多 series 共享同一 dataset：每个 series 通过 encode.y 指向不同列（min / max）。原官方示例每条线各自带 data 数组，本版统一由 dataset 驱动。"
    },
    {
      "component_id": "echarts.line-stacked",
      "series_type": "line",
      "name": "堆叠折线图",
      "aliases": [
        "累计趋势图",
        "stacked line"
      ],
      "tasks": [
        "trend",
        "composition",
        "comparison"
      ],
      "roles": [
        "explain",
        "prove"
      ],
      "relations": [
        "trend",
        "composition"
      ],
      "primitives": [
        "coordinate-plot"
      ],
      "renderer_kinds": [
        "svg",
        "canvas"
      ],
      "component_sources": [
        "echarts"
      ],
      "dataset_mode": "direct",
      "example": "capabilities/vendors/echarts/examples/line-stacked.json",
      "selection_notes": "多个系列的累计变化；若只比较单系列，使用基础折线图。",
      "group": "trend",
      "group_label": "趋势",
      "title": "堆叠折线图",
      "chart_type": "line",
      "source_url": "https://echarts.apache.org/examples/zh/index.html#chart-type-line",
      "source_note": "改编自 Apache ECharts 官方示例 stacked-line。堆叠通过 series.stack + series.areaStyle 实现；数据抽成 dataset，三条线各引用一列。",
      "upstream_license": "Apache-2.0",
      "render_plan_binding": {
        "renderer_kind": "svg",
        "component_source": "echarts",
        "component_id": "echarts.line-stacked",
        "theme_adapter_id": "paper-ink.echarts",
        "data_binding": {
          "data_ref": {
            "content_id": "item.traffic-by-channel",
            "json_pointer": "/structured_data/rows"
          },
          "dataset_id": "dataset.line-stacked",
          "encode": {
            "x": "day",
            "y": [
              "email",
              "ads",
              "video"
            ]
          }
        }
      },
      "dataset_shape": {
        "dimensions": [
          "day",
          "email",
          "ads",
          "video"
        ],
        "source": [
          {
            "day": "周一",
            "email": 120,
            "ads": 220,
            "video": 150
          },
          {
            "day": "周二",
            "email": 132,
            "ads": 182,
            "video": 232
          },
          {
            "day": "周三",
            "email": 101,
            "ads": 191,
            "video": 201
          },
          {
            "day": "周四",
            "email": 134,
            "ads": 234,
            "video": 154
          },
          {
            "day": "周五",
            "email": 90,
            "ads": 290,
            "video": 190
          },
          {
            "day": "周六",
            "email": 230,
            "ads": 330,
            "video": 330
          },
          {
            "day": "周日",
            "email": 210,
            "ads": 310,
            "video": 410
          }
        ]
      },
      "option": {
        "dataset": {
          "dimensions": [
            "day",
            "email",
            "ads",
            "video"
          ],
          "source": [
            {
              "day": "周一",
              "email": 120,
              "ads": 220,
              "video": 150
            },
            {
              "day": "周二",
              "email": 132,
              "ads": 182,
              "video": 232
            },
            {
              "day": "周三",
              "email": 101,
              "ads": 191,
              "video": 201
            },
            {
              "day": "周四",
              "email": 134,
              "ads": 234,
              "video": 154
            },
            {
              "day": "周五",
              "email": 90,
              "ads": 290,
              "video": 190
            },
            {
              "day": "周六",
              "email": 230,
              "ads": 330,
              "video": 330
            },
            {
              "day": "周日",
              "email": 210,
              "ads": 310,
              "video": 410
            }
          ]
        },
        "tooltip": {
          "trigger": "axis"
        },
        "legend": {
          "data": [
            "邮件营销",
            "联盟广告",
            "视频广告"
          ]
        },
        "xAxis": {
          "type": "category",
          "boundaryGap": false
        },
        "yAxis": {
          "type": "value"
        },
        "series": [
          {
            "name": "邮件营销",
            "type": "line",
            "stack": "总量",
            "areaStyle": {},
            "encode": {
              "x": "day",
              "y": "email"
            }
          },
          {
            "name": "联盟广告",
            "type": "line",
            "stack": "总量",
            "areaStyle": {},
            "encode": {
              "x": "day",
              "y": "ads"
            }
          },
          {
            "name": "视频广告",
            "type": "line",
            "stack": "总量",
            "areaStyle": {},
            "encode": {
              "x": "day",
              "y": "video"
            }
          }
        ]
      },
      "snippet": "<div class=\"wise-ppt-echart\" data-block-id=\"block.main\" data-renderer-kind=\"svg\" data-component-source=\"echarts\" data-component-id=\"echarts.line-stacked\" data-theme-adapter-id=\"paper-ink.echarts\" data-content-ref=\"item.traffic-by-channel\" data-dataset-id=\"dataset.line-stacked\" style=\"width:100%;height:100%\"><\/div>\n<script type=\"application/json\" data-wise-ppt-dataset=\"dataset.line-stacked\">{\"dimensions\":[\"day\",\"email\",\"ads\",\"video\"],\"source\":[{\"day\":\"周一\",\"email\":120,\"ads\":220,\"video\":150},{\"day\":\"周二\",\"email\":132,\"ads\":182,\"video\":232},{\"day\":\"周三\",\"email\":101,\"ads\":191,\"video\":201},{\"day\":\"周四\",\"email\":134,\"ads\":234,\"video\":154},{\"day\":\"周五\",\"email\":90,\"ads\":290,\"video\":190},{\"day\":\"周六\",\"email\":230,\"ads\":330,\"video\":330},{\"day\":\"周日\",\"email\":210,\"ads\":310,\"video\":410}]}<\/script>",
      "init_script": "<script>\n(function(){\n  var slide=document.currentScript.closest('.slide');\n  var target=slide.querySelector('[data-component-id=\"echarts.line-stacked\"]');\n  var option={\"dataset\":{\"dimensions\":[\"day\",\"email\",\"ads\",\"video\"],\"source\":[{\"day\":\"周一\",\"email\":120,\"ads\":220,\"video\":150},{\"day\":\"周二\",\"email\":132,\"ads\":182,\"video\":232},{\"day\":\"周三\",\"email\":101,\"ads\":191,\"video\":201},{\"day\":\"周四\",\"email\":134,\"ads\":234,\"video\":154},{\"day\":\"周五\",\"email\":90,\"ads\":290,\"video\":190},{\"day\":\"周六\",\"email\":230,\"ads\":330,\"video\":330},{\"day\":\"周日\",\"email\":210,\"ads\":310,\"video\":410}]},\"tooltip\":{\"trigger\":\"axis\"},\"legend\":{\"data\":[\"邮件营销\",\"联盟广告\",\"视频广告\"]},\"xAxis\":{\"type\":\"category\",\"boundaryGap\":false},\"yAxis\":{\"type\":\"value\"},\"series\":[{\"name\":\"邮件营销\",\"type\":\"line\",\"stack\":\"总量\",\"areaStyle\":{},\"encode\":{\"x\":\"day\",\"y\":\"email\"}},{\"name\":\"联盟广告\",\"type\":\"line\",\"stack\":\"总量\",\"areaStyle\":{},\"encode\":{\"x\":\"day\",\"y\":\"ads\"}},{\"name\":\"视频广告\",\"type\":\"line\",\"stack\":\"总量\",\"areaStyle\":{},\"encode\":{\"x\":\"day\",\"y\":\"video\"}}]};\n  WisePPT.createEChart(slide,target,option);\n})();\n<\/script>",
      "caveats": {},
      "notes": "堆叠的关键是三个 series 共享 stack 值 \"总量\" 并加 areaStyle。每条线通过 encode.y 引用各自列。原官方示例每个 series 自带 data，本版由 dataset 统一驱动。"
    },
    {
      "component_id": "echarts.bar-basic",
      "series_type": "bar",
      "name": "基础柱状图",
      "aliases": [
        "柱状图",
        "条形图",
        "bar"
      ],
      "tasks": [
        "comparison",
        "ranking"
      ],
      "roles": [
        "explain",
        "prove"
      ],
      "relations": [
        "comparison",
        "ranking"
      ],
      "primitives": [
        "coordinate-plot"
      ],
      "renderer_kinds": [
        "svg",
        "canvas"
      ],
      "component_sources": [
        "echarts"
      ],
      "dataset_mode": "direct",
      "example": "capabilities/vendors/echarts/examples/bar-basic.json",
      "selection_notes": "离散类别的数值比较或排序。",
      "group": "comparison",
      "group_label": "比较",
      "title": "基础柱状图",
      "chart_type": "bar",
      "source_url": "https://echarts.apache.org/examples/zh/index.html#chart-type-bar",
      "source_note": "改编自 Apache ECharts 官方示例 bar-background。柱状图用 xAxis.type=category；数据抽成 dataset + encode。",
      "upstream_license": "Apache-2.0",
      "render_plan_binding": {
        "renderer_kind": "svg",
        "component_source": "echarts",
        "component_id": "echarts.bar-basic",
        "theme_adapter_id": "paper-ink.echarts",
        "data_binding": {
          "data_ref": {
            "content_id": "item.product-sales",
            "json_pointer": "/structured_data/rows"
          },
          "dataset_id": "dataset.bar-basic",
          "encode": {
            "x": "product",
            "y": "sales"
          }
        }
      },
      "dataset_shape": {
        "dimensions": [
          "product",
          "sales"
        ],
        "source": [
          {
            "product": "奶茶",
            "sales": 58212
          },
          {
            "product": "抹茶拿铁",
            "sales": 78254
          },
          {
            "product": "芝士可可",
            "sales": 41032
          },
          {
            "product": "核桃布朗尼",
            "sales": 12755
          },
          {
            "product": "芝士蛋糕",
            "sales": 20145
          },
          {
            "product": "柠檬汁",
            "sales": 79146
          }
        ]
      },
      "option": {
        "dataset": {
          "dimensions": [
            "product",
            "sales"
          ],
          "source": [
            {
              "product": "奶茶",
              "sales": 58212
            },
            {
              "product": "抹茶拿铁",
              "sales": 78254
            },
            {
              "product": "芝士可可",
              "sales": 41032
            },
            {
              "product": "核桃布朗尼",
              "sales": 12755
            },
            {
              "product": "芝士蛋糕",
              "sales": 20145
            },
            {
              "product": "柠檬汁",
              "sales": 79146
            }
          ]
        },
        "tooltip": {
          "trigger": "axis",
          "axisPointer": {
            "type": "shadow"
          }
        },
        "xAxis": {
          "type": "category"
        },
        "yAxis": {
          "type": "value"
        },
        "series": [
          {
            "name": "销量",
            "type": "bar",
            "encode": {
              "x": "product",
              "y": "sales"
            },
            "showBackground": true,
            "backgroundStyle": {
              "color": "rgba(180, 180, 180, 0.2)"
            }
          }
        ]
      },
      "snippet": "<div class=\"wise-ppt-echart\" data-block-id=\"block.main\" data-renderer-kind=\"svg\" data-component-source=\"echarts\" data-component-id=\"echarts.bar-basic\" data-theme-adapter-id=\"paper-ink.echarts\" data-content-ref=\"item.product-sales\" data-dataset-id=\"dataset.bar-basic\" style=\"width:100%;height:100%\"><\/div>\n<script type=\"application/json\" data-wise-ppt-dataset=\"dataset.bar-basic\">{\"dimensions\":[\"product\",\"sales\"],\"source\":[{\"product\":\"奶茶\",\"sales\":58212},{\"product\":\"抹茶拿铁\",\"sales\":78254},{\"product\":\"芝士可可\",\"sales\":41032},{\"product\":\"核桃布朗尼\",\"sales\":12755},{\"product\":\"芝士蛋糕\",\"sales\":20145},{\"product\":\"柠檬汁\",\"sales\":79146}]}<\/script>",
      "init_script": "<script>\n(function(){\n  var slide=document.currentScript.closest('.slide');\n  var target=slide.querySelector('[data-component-id=\"echarts.bar-basic\"]');\n  var option={\"dataset\":{\"dimensions\":[\"product\",\"sales\"],\"source\":[{\"product\":\"奶茶\",\"sales\":58212},{\"product\":\"抹茶拿铁\",\"sales\":78254},{\"product\":\"芝士可可\",\"sales\":41032},{\"product\":\"核桃布朗尼\",\"sales\":12755},{\"product\":\"芝士蛋糕\",\"sales\":20145},{\"product\":\"柠檬汁\",\"sales\":79146}]},\"tooltip\":{\"trigger\":\"axis\",\"axisPointer\":{\"type\":\"shadow\"}},\"xAxis\":{\"type\":\"category\"},\"yAxis\":{\"type\":\"value\"},\"series\":[{\"name\":\"销量\",\"type\":\"bar\",\"encode\":{\"x\":\"product\",\"y\":\"sales\"},\"showBackground\":true,\"backgroundStyle\":{\"color\":\"rgba(180, 180, 180, 0.2)\"}}]};\n  WisePPT.createEChart(slide,target,option);\n})();\n<\/script>",
      "caveats": {},
      "notes": "柱状图的标准 dataset 形式：xAxis.category 由 dataset.product 维度提供类目，series.bar.encode.y 指向 sales 数值列。"
    },
    {
      "component_id": "echarts.bar-dynamic-sort",
      "series_type": "bar",
      "name": "动态排序柱状图",
      "aliases": [
        "条形图竞赛",
        "动态排名",
        "bar race"
      ],
      "tasks": [
        "ranking",
        "animation",
        "time-series"
      ],
      "roles": [
        "explain",
        "prove"
      ],
      "relations": [
        "ranking",
        "change"
      ],
      "primitives": [
        "coordinate-plot"
      ],
      "renderer_kinds": [
        "svg",
        "canvas"
      ],
      "component_sources": [
        "echarts"
      ],
      "dataset_mode": "runtime-update",
      "example": "capabilities/vendors/echarts/examples/bar-dynamic-sort.json",
      "selection_notes": "排名随时间变化；静态交付只显示初始帧，完整动画需增量 setOption。",
      "group": "comparison",
      "group_label": "比较",
      "title": "动态排序柱状图",
      "chart_type": "bar",
      "source_url": "https://echarts.apache.org/examples/zh/index.html#chart-type-bar",
      "source_note": "改编自 Apache ECharts 官方示例 bar-race。动态排序（bar race）依赖运行时按周期更新数据并重设 option；本文件提供初始 option + dataset，动画时序需 deck JS 额外实现。",
      "upstream_license": "Apache-2.0",
      "render_plan_binding": {
        "renderer_kind": "svg",
        "component_source": "echarts",
        "component_id": "echarts.bar-dynamic-sort",
        "theme_adapter_id": "paper-ink.echarts",
        "data_binding": {
          "data_ref": {
            "content_id": "item.product-race",
            "json_pointer": "/structured_data/rows"
          },
          "dataset_id": "dataset.bar-dynamic-sort",
          "encode": {
            "y": "product",
            "x": "value"
          }
        }
      },
      "dataset_shape": {
        "dimensions": [
          "year",
          "product",
          "value"
        ],
        "source": [
          {
            "year": "2000",
            "product": "可可脂",
            "value": 162
          },
          {
            "year": "2000",
            "product": "奶粉",
            "value": 143
          },
          {
            "year": "2000",
            "product": "炼乳",
            "value": 137
          },
          {
            "year": "2000",
            "product": "果葡糖浆",
            "value": 127
          },
          {
            "year": "2000",
            "product": "蔗糖",
            "value": 105
          },
          {
            "year": "2000",
            "product": "蜂蜜",
            "value": 95
          },
          {
            "year": "2000",
            "product": "枫糖浆",
            "value": 82
          }
        ]
      },
      "option": {
        "dataset": {
          "dimensions": [
            "year",
            "product",
            "value"
          ],
          "source": [
            {
              "year": "2000",
              "product": "可可脂",
              "value": 162
            },
            {
              "year": "2000",
              "product": "奶粉",
              "value": 143
            },
            {
              "year": "2000",
              "product": "炼乳",
              "value": 137
            },
            {
              "year": "2000",
              "product": "果葡糖浆",
              "value": 127
            },
            {
              "year": "2000",
              "product": "蔗糖",
              "value": 105
            },
            {
              "year": "2000",
              "product": "蜂蜜",
              "value": 95
            },
            {
              "year": "2000",
              "product": "枫糖浆",
              "value": 82
            }
          ]
        },
        "tooltip": {
          "trigger": "axis",
          "axisPointer": {
            "type": "shadow"
          }
        },
        "xAxis": {
          "type": "value",
          "max": "dataMax"
        },
        "yAxis": {
          "type": "category",
          "inverse": true,
          "max": 6
        },
        "series": [
          {
            "name": "产量",
            "type": "bar",
            "encode": {
              "x": "value",
              "y": "product"
            },
            "realtimeSort": true,
            "label": {
              "show": true,
              "position": "right",
              "valueAnimation": true
            }
          }
        ]
      },
      "snippet": "<div class=\"wise-ppt-echart\" data-block-id=\"block.main\" data-renderer-kind=\"svg\" data-component-source=\"echarts\" data-component-id=\"echarts.bar-dynamic-sort\" data-theme-adapter-id=\"paper-ink.echarts\" data-content-ref=\"item.product-race\" data-dataset-id=\"dataset.bar-dynamic-sort\" style=\"width:100%;height:100%\"><\/div>\n<script type=\"application/json\" data-wise-ppt-dataset=\"dataset.bar-dynamic-sort\">{\"dimensions\":[\"year\",\"product\",\"value\"],\"source\":[{\"year\":\"2000\",\"product\":\"可可脂\",\"value\":162},{\"year\":\"2000\",\"product\":\"奶粉\",\"value\":143},{\"year\":\"2000\",\"product\":\"炼乳\",\"value\":137},{\"year\":\"2000\",\"product\":\"果葡糖浆\",\"value\":127},{\"year\":\"2000\",\"product\":\"蔗糖\",\"value\":105},{\"year\":\"2000\",\"product\":\"蜂蜜\",\"value\":95},{\"year\":\"2000\",\"product\":\"枫糖浆\",\"value\":82}]}<\/script>",
      "init_script": "<script>\n(function(){\n  var slide=document.currentScript.closest('.slide');\n  var target=slide.querySelector('[data-component-id=\"echarts.bar-dynamic-sort\"]');\n  var option={\"dataset\":{\"dimensions\":[\"year\",\"product\",\"value\"],\"source\":[{\"year\":\"2000\",\"product\":\"可可脂\",\"value\":162},{\"year\":\"2000\",\"product\":\"奶粉\",\"value\":143},{\"year\":\"2000\",\"product\":\"炼乳\",\"value\":137},{\"year\":\"2000\",\"product\":\"果葡糖浆\",\"value\":127},{\"year\":\"2000\",\"product\":\"蔗糖\",\"value\":105},{\"year\":\"2000\",\"product\":\"蜂蜜\",\"value\":95},{\"year\":\"2000\",\"product\":\"枫糖浆\",\"value\":82}]},\"tooltip\":{\"trigger\":\"axis\",\"axisPointer\":{\"type\":\"shadow\"}},\"xAxis\":{\"type\":\"value\",\"max\":\"dataMax\"},\"yAxis\":{\"type\":\"category\",\"inverse\":true,\"max\":6},\"series\":[{\"name\":\"产量\",\"type\":\"bar\",\"encode\":{\"x\":\"value\",\"y\":\"product\"},\"realtimeSort\":true,\"label\":{\"show\":true,\"position\":\"right\",\"valueAnimation\":true}}]};\n  WisePPT.createEChart(slide,target,option);\n})();\n<\/script>",
      "caveats": {
        "animation_notes": "⚠️ 动态排序的完整效果依赖运行时按周期（如每年）更新 dataset 并调用 chart.setOption 增量刷新。wise-ppt 的 createEChart 只调用一次 setOption，因此本 option 渲染的是初始年份（2000）的静态排序。若要呈现完整 bar race 动画，需在 deck JS 中：① 准备多年的数据序列；② 用 setInterval 周期更新 option.dataset.source 并调用 chart.setOption(option)。render_plan_binding.data_binding 只能声明初始 dataset 与一个 encode；多年数据应放在 content.json 的完整数据集里，由 deck JS 按年切片喂给 setOption。"
      },
      "notes": "横向柱状图（xAxis.value + yAxis.category.inverse）配合 series.realtimeSort=true 自动按值排序。本示例数据为初始状态，仅展示 2000 年排序结果。"
    },
    {
      "component_id": "echarts.pie-access-source",
      "series_type": "pie",
      "name": "访问来源饼图",
      "aliases": [
        "饼图",
        "构成图",
        "pie",
        "donut"
      ],
      "tasks": [
        "composition",
        "share-of-total"
      ],
      "roles": [
        "explain",
        "prove"
      ],
      "relations": [
        "composition"
      ],
      "primitives": [
        "radial-partition"
      ],
      "renderer_kinds": [
        "svg",
        "canvas"
      ],
      "component_sources": [
        "echarts"
      ],
      "dataset_mode": "direct",
      "example": "capabilities/vendors/echarts/examples/pie-access-source.json",
      "selection_notes": "少量类别的整体构成；类别过多时改用条形图。",
      "group": "composition",
      "group_label": "构成",
      "title": "某站点用户访问来源",
      "chart_type": "pie",
      "source_url": "https://echarts.apache.org/examples/zh/index.html#chart-type-pie",
      "source_note": "改编自 Apache ECharts 官方示例 pie-rose-type / doc-example/pie-simple。饼图无坐标系，用 series.encode.itemName + value 映射 dataset 列。",
      "upstream_license": "Apache-2.0",
      "render_plan_binding": {
        "renderer_kind": "svg",
        "component_source": "echarts",
        "component_id": "echarts.pie-access-source",
        "theme_adapter_id": "paper-ink.echarts",
        "data_binding": {
          "data_ref": {
            "content_id": "item.access-source",
            "json_pointer": "/structured_data/rows"
          },
          "dataset_id": "dataset.pie-access-source",
          "encode": {
            "itemName": "source",
            "value": "count"
          }
        }
      },
      "dataset_shape": {
        "dimensions": [
          "source",
          "count"
        ],
        "source": [
          {
            "source": "直接访问",
            "count": 335
          },
          {
            "source": "邮件营销",
            "count": 310
          },
          {
            "source": "联盟广告",
            "count": 234
          },
          {
            "source": "视频广告",
            "count": 135
          },
          {
            "source": "搜索引擎",
            "count": 1548
          }
        ]
      },
      "option": {
        "dataset": {
          "dimensions": [
            "source",
            "count"
          ],
          "source": [
            {
              "source": "直接访问",
              "count": 335
            },
            {
              "source": "邮件营销",
              "count": 310
            },
            {
              "source": "联盟广告",
              "count": 234
            },
            {
              "source": "视频广告",
              "count": 135
            },
            {
              "source": "搜索引擎",
              "count": 1548
            }
          ]
        },
        "tooltip": {
          "trigger": "item"
        },
        "legend": {
          "orient": "vertical",
          "left": "left"
        },
        "series": [
          {
            "name": "访问来源",
            "type": "pie",
            "encode": {
              "itemName": "source",
              "value": "count"
            },
            "radius": "60%",
            "label": {
              "formatter": "{b}: {d}%"
            }
          }
        ]
      },
      "snippet": "<div class=\"wise-ppt-echart\" data-block-id=\"block.main\" data-renderer-kind=\"svg\" data-component-source=\"echarts\" data-component-id=\"echarts.pie-access-source\" data-theme-adapter-id=\"paper-ink.echarts\" data-content-ref=\"item.access-source\" data-dataset-id=\"dataset.pie-access-source\" style=\"width:100%;height:100%\"><\/div>\n<script type=\"application/json\" data-wise-ppt-dataset=\"dataset.pie-access-source\">{\"dimensions\":[\"source\",\"count\"],\"source\":[{\"source\":\"直接访问\",\"count\":335},{\"source\":\"邮件营销\",\"count\":310},{\"source\":\"联盟广告\",\"count\":234},{\"source\":\"视频广告\",\"count\":135},{\"source\":\"搜索引擎\",\"count\":1548}]}<\/script>",
      "init_script": "<script>\n(function(){\n  var slide=document.currentScript.closest('.slide');\n  var target=slide.querySelector('[data-component-id=\"echarts.pie-access-source\"]');\n  var option={\"dataset\":{\"dimensions\":[\"source\",\"count\"],\"source\":[{\"source\":\"直接访问\",\"count\":335},{\"source\":\"邮件营销\",\"count\":310},{\"source\":\"联盟广告\",\"count\":234},{\"source\":\"视频广告\",\"count\":135},{\"source\":\"搜索引擎\",\"count\":1548}]},\"tooltip\":{\"trigger\":\"item\"},\"legend\":{\"orient\":\"vertical\",\"left\":\"left\"},\"series\":[{\"name\":\"访问来源\",\"type\":\"pie\",\"encode\":{\"itemName\":\"source\",\"value\":\"count\"},\"radius\":\"60%\",\"label\":{\"formatter\":\"{b}: {d}%\"}}]};\n  WisePPT.createEChart(slide,target,option);\n})();\n<\/script>",
      "caveats": {},
      "notes": "饼图没有 xAxis/yAxis，dataset 通过 series.encode.itemName（类目）和 value（数值）映射。encode 的 key 与折线/柱状的 x/y 不同。"
    },
    {
      "component_id": "echarts.scatter-basic",
      "series_type": "scatter",
      "name": "基础散点图",
      "aliases": [
        "散点图",
        "气泡图",
        "scatter",
        "bubble"
      ],
      "tasks": [
        "distribution",
        "correlation"
      ],
      "roles": [
        "explore",
        "prove"
      ],
      "relations": [
        "distribution",
        "correlation"
      ],
      "primitives": [
        "coordinate-plot"
      ],
      "renderer_kinds": [
        "svg",
        "canvas"
      ],
      "component_sources": [
        "echarts"
      ],
      "dataset_mode": "direct",
      "example": "capabilities/vendors/echarts/examples/scatter-basic.json",
      "selection_notes": "两个或三个数值变量的分布、相关与异常点。",
      "group": "distribution",
      "group_label": "分布",
      "title": "基础散点图",
      "chart_type": "scatter",
      "source_url": "https://echarts.apache.org/examples/zh/index.html#chart-type-scatter",
      "source_note": "改编自 Apache ECharts 官方示例 scatter-simple。散点图 xAxis/yAxis 都是 value 类型；dataset 两列分别映射到 x、y。",
      "upstream_license": "Apache-2.0",
      "render_plan_binding": {
        "renderer_kind": "svg",
        "component_source": "echarts",
        "component_id": "echarts.scatter-basic",
        "theme_adapter_id": "paper-ink.echarts",
        "data_binding": {
          "data_ref": {
            "content_id": "item.height-weight",
            "json_pointer": "/structured_data/rows"
          },
          "dataset_id": "dataset.scatter-basic",
          "encode": {
            "x": "height",
            "y": "weight"
          }
        }
      },
      "dataset_shape": {
        "dimensions": [
          "height",
          "weight"
        ],
        "source": [
          {
            "height": 161.2,
            "weight": 51.6
          },
          {
            "height": 167.5,
            "weight": 59.0
          },
          {
            "height": 159.5,
            "weight": 49.2
          },
          {
            "height": 157.0,
            "weight": 63.0
          },
          {
            "height": 155.8,
            "weight": 53.6
          },
          {
            "height": 170.0,
            "weight": 59.0
          },
          {
            "height": 176.2,
            "weight": 66.2
          },
          {
            "height": 160.2,
            "weight": 52.1
          },
          {
            "height": 172.5,
            "weight": 62.0
          },
          {
            "height": 170.9,
            "weight": 63.4
          }
        ]
      },
      "option": {
        "dataset": {
          "dimensions": [
            "height",
            "weight"
          ],
          "source": [
            {
              "height": 161.2,
              "weight": 51.6
            },
            {
              "height": 167.5,
              "weight": 59.0
            },
            {
              "height": 159.5,
              "weight": 49.2
            },
            {
              "height": 157.0,
              "weight": 63.0
            },
            {
              "height": 155.8,
              "weight": 53.6
            },
            {
              "height": 170.0,
              "weight": 59.0
            },
            {
              "height": 176.2,
              "weight": 66.2
            },
            {
              "height": 160.2,
              "weight": 52.1
            },
            {
              "height": 172.5,
              "weight": 62.0
            },
            {
              "height": 170.9,
              "weight": 63.4
            }
          ]
        },
        "tooltip": {
          "trigger": "item",
          "formatter": "身高 {c|{c}} cm<br/>体重 {c1|{c}} kg",
          "position": "top"
        },
        "xAxis": {
          "type": "value",
          "scale": true,
          "name": "身高",
          "nameLocation": "middle",
          "nameGap": 30
        },
        "yAxis": {
          "type": "value",
          "scale": true,
          "name": "体重",
          "nameLocation": "middle",
          "nameGap": 30
        },
        "series": [
          {
            "name": "样本",
            "type": "scatter",
            "encode": {
              "x": "height",
              "y": "weight"
            },
            "symbolSize": 12
          }
        ]
      },
      "snippet": "<div class=\"wise-ppt-echart\" data-block-id=\"block.main\" data-renderer-kind=\"svg\" data-component-source=\"echarts\" data-component-id=\"echarts.scatter-basic\" data-theme-adapter-id=\"paper-ink.echarts\" data-content-ref=\"item.height-weight\" data-dataset-id=\"dataset.scatter-basic\" style=\"width:100%;height:100%\"><\/div>\n<script type=\"application/json\" data-wise-ppt-dataset=\"dataset.scatter-basic\">{\"dimensions\":[\"height\",\"weight\"],\"source\":[{\"height\":161.2,\"weight\":51.6},{\"height\":167.5,\"weight\":59.0},{\"height\":159.5,\"weight\":49.2},{\"height\":157.0,\"weight\":63.0},{\"height\":155.8,\"weight\":53.6},{\"height\":170.0,\"weight\":59.0},{\"height\":176.2,\"weight\":66.2},{\"height\":160.2,\"weight\":52.1},{\"height\":172.5,\"weight\":62.0},{\"height\":170.9,\"weight\":63.4}]}<\/script>",
      "init_script": "<script>\n(function(){\n  var slide=document.currentScript.closest('.slide');\n  var target=slide.querySelector('[data-component-id=\"echarts.scatter-basic\"]');\n  var option={\"dataset\":{\"dimensions\":[\"height\",\"weight\"],\"source\":[{\"height\":161.2,\"weight\":51.6},{\"height\":167.5,\"weight\":59.0},{\"height\":159.5,\"weight\":49.2},{\"height\":157.0,\"weight\":63.0},{\"height\":155.8,\"weight\":53.6},{\"height\":170.0,\"weight\":59.0},{\"height\":176.2,\"weight\":66.2},{\"height\":160.2,\"weight\":52.1},{\"height\":172.5,\"weight\":62.0},{\"height\":170.9,\"weight\":63.4}]},\"tooltip\":{\"trigger\":\"item\",\"formatter\":\"身高 {c|{c}} cm<br/>体重 {c1|{c}} kg\",\"position\":\"top\"},\"xAxis\":{\"type\":\"value\",\"scale\":true,\"name\":\"身高\",\"nameLocation\":\"middle\",\"nameGap\":30},\"yAxis\":{\"type\":\"value\",\"scale\":true,\"name\":\"体重\",\"nameLocation\":\"middle\",\"nameGap\":30},\"series\":[{\"name\":\"样本\",\"type\":\"scatter\",\"encode\":{\"x\":\"height\",\"y\":\"weight\"},\"symbolSize\":12}]};\n  WisePPT.createEChart(slide,target,option);\n})();\n<\/script>",
      "caveats": {},
      "notes": "散点图两个轴都是 value 类型（连续数值），encode.x/encode.y 分别映射身高和体重。原官方示例用二维数组 data: [[161.2,51.6],...]，本版用行式对象 dataset。"
    },
    {
      "component_id": "echarts.scatter-to-bar-anim",
      "series_type": "scatter",
      "name": "散点聚合柱状动画",
      "aliases": [
        "散点转柱状",
        "聚合动画",
        "scatter to bar"
      ],
      "tasks": [
        "distribution",
        "aggregation",
        "animation"
      ],
      "roles": [
        "explain",
        "prove"
      ],
      "relations": [
        "distribution",
        "transformation"
      ],
      "primitives": [
        "coordinate-plot"
      ],
      "renderer_kinds": [
        "svg",
        "canvas"
      ],
      "component_sources": [
        "echarts"
      ],
      "dataset_mode": "runtime-update",
      "example": "capabilities/vendors/echarts/examples/scatter-to-bar-anim.json",
      "selection_notes": "展示从离散点到聚合柱的变化；完整动画需增量 setOption。",
      "group": "distribution",
      "group_label": "分布",
      "title": "散点图聚合为柱状图动画",
      "chart_type": "scatter",
      "source_url": "https://echarts.apache.org/examples/zh/index.html#chart-type-scatter",
      "source_note": "改编自 Apache ECharts 官方示例 scatter-cluster。该效果把散点按类聚合动画过渡为柱状图，依赖运行时切换 series.type 并 setOption 刷新；本文件提供初始散点 option + dataset。",
      "upstream_license": "Apache-2.0",
      "render_plan_binding": {
        "renderer_kind": "svg",
        "component_source": "echarts",
        "component_id": "echarts.scatter-to-bar-anim",
        "theme_adapter_id": "paper-ink.echarts",
        "data_binding": {
          "data_ref": {
            "content_id": "item.cluster-points",
            "json_pointer": "/structured_data/rows"
          },
          "dataset_id": "dataset.scatter-to-bar-anim",
          "encode": {
            "x": "x",
            "y": "y"
          }
        }
      },
      "dataset_shape": {
        "dimensions": [
          "group",
          "x",
          "y"
        ],
        "source": [
          {
            "group": "A",
            "x": 2.5,
            "y": 3.2
          },
          {
            "group": "A",
            "x": 3.1,
            "y": 2.8
          },
          {
            "group": "A",
            "x": 2.8,
            "y": 3.5
          },
          {
            "group": "B",
            "x": 6.5,
            "y": 7.2
          },
          {
            "group": "B",
            "x": 7.1,
            "y": 6.8
          },
          {
            "group": "B",
            "x": 6.8,
            "y": 7.5
          },
          {
            "group": "C",
            "x": 9.5,
            "y": 4.2
          },
          {
            "group": "C",
            "x": 10.1,
            "y": 3.8
          },
          {
            "group": "C",
            "x": 9.8,
            "y": 4.5
          }
        ]
      },
      "option": {
        "dataset": {
          "dimensions": [
            "group",
            "x",
            "y"
          ],
          "source": [
            {
              "group": "A",
              "x": 2.5,
              "y": 3.2
            },
            {
              "group": "A",
              "x": 3.1,
              "y": 2.8
            },
            {
              "group": "A",
              "x": 2.8,
              "y": 3.5
            },
            {
              "group": "B",
              "x": 6.5,
              "y": 7.2
            },
            {
              "group": "B",
              "x": 7.1,
              "y": 6.8
            },
            {
              "group": "B",
              "x": 6.8,
              "y": 7.5
            },
            {
              "group": "C",
              "x": 9.5,
              "y": 4.2
            },
            {
              "group": "C",
              "x": 10.1,
              "y": 3.8
            },
            {
              "group": "C",
              "x": 9.8,
              "y": 4.5
            }
          ]
        },
        "tooltip": {
          "trigger": "item"
        },
        "xAxis": {
          "type": "value",
          "scale": true
        },
        "yAxis": {
          "type": "value",
          "scale": true
        },
        "series": [
          {
            "name": "点簇",
            "type": "scatter",
            "encode": {
              "x": "x",
              "y": "y"
            },
            "symbolSize": 14
          }
        ]
      },
      "snippet": "<div class=\"wise-ppt-echart\" data-block-id=\"block.main\" data-renderer-kind=\"svg\" data-component-source=\"echarts\" data-component-id=\"echarts.scatter-to-bar-anim\" data-theme-adapter-id=\"paper-ink.echarts\" data-content-ref=\"item.cluster-points\" data-dataset-id=\"dataset.scatter-to-bar-anim\" style=\"width:100%;height:100%\"><\/div>\n<script type=\"application/json\" data-wise-ppt-dataset=\"dataset.scatter-to-bar-anim\">{\"dimensions\":[\"group\",\"x\",\"y\"],\"source\":[{\"group\":\"A\",\"x\":2.5,\"y\":3.2},{\"group\":\"A\",\"x\":3.1,\"y\":2.8},{\"group\":\"A\",\"x\":2.8,\"y\":3.5},{\"group\":\"B\",\"x\":6.5,\"y\":7.2},{\"group\":\"B\",\"x\":7.1,\"y\":6.8},{\"group\":\"B\",\"x\":6.8,\"y\":7.5},{\"group\":\"C\",\"x\":9.5,\"y\":4.2},{\"group\":\"C\",\"x\":10.1,\"y\":3.8},{\"group\":\"C\",\"x\":9.8,\"y\":4.5}]}<\/script>",
      "init_script": "<script>\n(function(){\n  var slide=document.currentScript.closest('.slide');\n  var target=slide.querySelector('[data-component-id=\"echarts.scatter-to-bar-anim\"]');\n  var option={\"dataset\":{\"dimensions\":[\"group\",\"x\",\"y\"],\"source\":[{\"group\":\"A\",\"x\":2.5,\"y\":3.2},{\"group\":\"A\",\"x\":3.1,\"y\":2.8},{\"group\":\"A\",\"x\":2.8,\"y\":3.5},{\"group\":\"B\",\"x\":6.5,\"y\":7.2},{\"group\":\"B\",\"x\":7.1,\"y\":6.8},{\"group\":\"B\",\"x\":6.8,\"y\":7.5},{\"group\":\"C\",\"x\":9.5,\"y\":4.2},{\"group\":\"C\",\"x\":10.1,\"y\":3.8},{\"group\":\"C\",\"x\":9.8,\"y\":4.5}]},\"tooltip\":{\"trigger\":\"item\"},\"xAxis\":{\"type\":\"value\",\"scale\":true},\"yAxis\":{\"type\":\"value\",\"scale\":true},\"series\":[{\"name\":\"点簇\",\"type\":\"scatter\",\"encode\":{\"x\":\"x\",\"y\":\"y\"},\"symbolSize\":14}]};\n  WisePPT.createEChart(slide,target,option);\n})();\n<\/script>",
      "caveats": {
        "animation_notes": "⚠️ 「散点聚合为柱状图」的完整动画依赖运行时：① 初始渲染散点（type:scatter）；② 按数据触发，将同一 group 的点聚合并切换为柱状（type:bar + 聚合后的统计 dataset）；③ 用 chart.setOption(option, { merge: false }) 刷新。wise-ppt 的 createEChart 只调用一次 setOption，因此本 option 渲染的是初始散点状态。若要呈现聚合动画，需在 deck JS 中：准备聚合后的 dataset（每个 group 的均值/计数），在动画时点切换 series.type 并 setOption。聚合后的 dataset 仍需与页面 <script> 数据块一致（或为独立 dataset_id）。"
      },
      "notes": "初始状态是按 (x,y) 分布的散点，group 列用于聚合分组。聚合后通常用 group 作为 xAxis 类目、y 作为聚合值（均值/计数）。"
    },
    {
      "component_id": "echarts.radar-basic",
      "series_type": "radar",
      "name": "基础雷达图",
      "aliases": [
        "雷达图",
        "能力图",
        "radar"
      ],
      "tasks": [
        "profile",
        "multi-metric-comparison"
      ],
      "roles": [
        "compare",
        "explain"
      ],
      "relations": [
        "comparison",
        "profile"
      ],
      "primitives": [
        "radial-axis"
      ],
      "renderer_kinds": [
        "svg",
        "canvas"
      ],
      "component_sources": [
        "echarts"
      ],
      "dataset_mode": "derived",
      "example": "capabilities/vendors/echarts/examples/radar-basic.json",
      "selection_notes": "同一量纲体系下的少量对象多指标轮廓；indicator 与值数组需同步。",
      "group": "relationship",
      "group_label": "关系",
      "title": "基础雷达图",
      "chart_type": "radar",
      "source_url": "https://echarts.apache.org/examples/zh/index.html#chart-type-radar",
      "source_note": "改编自 Apache ECharts 官方示例 radar。雷达图的维度定义在 radar.indicator，series 通过 dataset + encode.value 取数。",
      "upstream_license": "Apache-2.0",
      "render_plan_binding": {
        "renderer_kind": "svg",
        "component_source": "echarts",
        "component_id": "echarts.radar-basic",
        "theme_adapter_id": "paper-ink.echarts",
        "data_binding": {
          "data_ref": {
            "content_id": "item.budget-vs-actual",
            "json_pointer": "/structured_data/rows"
          },
          "dataset_id": "dataset.radar-basic",
          "encode": {
            "dimension": "dimension",
            "value": [
              "budget",
              "actual"
            ]
          }
        }
      },
      "dataset_shape": {
        "dimensions": [
          "dimension",
          "budget",
          "actual"
        ],
        "source": [
          {
            "dimension": "销售",
            "budget": 4300,
            "actual": 5000
          },
          {
            "dimension": "管理",
            "budget": 10000,
            "actual": 14000
          },
          {
            "dimension": "信息技术",
            "budget": 28000,
            "actual": 28000
          },
          {
            "dimension": "客服",
            "budget": 35000,
            "actual": 31000
          },
          {
            "dimension": "研发",
            "budget": 50000,
            "actual": 42000
          },
          {
            "dimension": "市场",
            "budget": 19000,
            "actual": 21000
          }
        ]
      },
      "option": {
        "dataset": {
          "dimensions": [
            "dimension",
            "budget",
            "actual"
          ],
          "source": [
            {
              "dimension": "销售",
              "budget": 4300,
              "actual": 5000
            },
            {
              "dimension": "管理",
              "budget": 10000,
              "actual": 14000
            },
            {
              "dimension": "信息技术",
              "budget": 28000,
              "actual": 28000
            },
            {
              "dimension": "客服",
              "budget": 35000,
              "actual": 31000
            },
            {
              "dimension": "研发",
              "budget": 50000,
              "actual": 42000
            },
            {
              "dimension": "市场",
              "budget": 19000,
              "actual": 21000
            }
          ]
        },
        "tooltip": {
          "trigger": "axis"
        },
        "legend": {
          "data": [
            "预算",
            "实际"
          ]
        },
        "radar": {
          "indicator": [
            {
              "name": "销售",
              "max": 6500
            },
            {
              "name": "管理",
              "max": 16000
            },
            {
              "name": "信息技术",
              "max": 30000
            },
            {
              "name": "客服",
              "max": 38000
            },
            {
              "name": "研发",
              "max": 52000
            },
            {
              "name": "市场",
              "max": 25000
            }
          ]
        },
        "series": [
          {
            "name": "预算 vs 实际",
            "type": "radar",
            "data": [
              {
                "name": "预算",
                "value": [
                  4300,
                  10000,
                  28000,
                  35000,
                  50000,
                  19000
                ]
              },
              {
                "name": "实际",
                "value": [
                  5000,
                  14000,
                  28000,
                  31000,
                  42000,
                  21000
                ]
              }
            ]
          }
        ]
      },
      "snippet": "<div class=\"wise-ppt-echart\" data-block-id=\"block.main\" data-renderer-kind=\"svg\" data-component-source=\"echarts\" data-component-id=\"echarts.radar-basic\" data-theme-adapter-id=\"paper-ink.echarts\" data-content-ref=\"item.budget-vs-actual\" data-dataset-id=\"dataset.radar-basic\" style=\"width:100%;height:100%\"><\/div>\n<script type=\"application/json\" data-wise-ppt-dataset=\"dataset.radar-basic\">{\"dimensions\":[\"dimension\",\"budget\",\"actual\"],\"source\":[{\"dimension\":\"销售\",\"budget\":4300,\"actual\":5000},{\"dimension\":\"管理\",\"budget\":10000,\"actual\":14000},{\"dimension\":\"信息技术\",\"budget\":28000,\"actual\":28000},{\"dimension\":\"客服\",\"budget\":35000,\"actual\":31000},{\"dimension\":\"研发\",\"budget\":50000,\"actual\":42000},{\"dimension\":\"市场\",\"budget\":19000,\"actual\":21000}]}<\/script>",
      "init_script": "<script>\n(function(){\n  var slide=document.currentScript.closest('.slide');\n  var target=slide.querySelector('[data-component-id=\"echarts.radar-basic\"]');\n  var option={\"dataset\":{\"dimensions\":[\"dimension\",\"budget\",\"actual\"],\"source\":[{\"dimension\":\"销售\",\"budget\":4300,\"actual\":5000},{\"dimension\":\"管理\",\"budget\":10000,\"actual\":14000},{\"dimension\":\"信息技术\",\"budget\":28000,\"actual\":28000},{\"dimension\":\"客服\",\"budget\":35000,\"actual\":31000},{\"dimension\":\"研发\",\"budget\":50000,\"actual\":42000},{\"dimension\":\"市场\",\"budget\":19000,\"actual\":21000}]},\"tooltip\":{\"trigger\":\"axis\"},\"legend\":{\"data\":[\"预算\",\"实际\"]},\"radar\":{\"indicator\":[{\"name\":\"销售\",\"max\":6500},{\"name\":\"管理\",\"max\":16000},{\"name\":\"信息技术\",\"max\":30000},{\"name\":\"客服\",\"max\":38000},{\"name\":\"研发\",\"max\":52000},{\"name\":\"市场\",\"max\":25000}]},\"series\":[{\"name\":\"预算 vs 实际\",\"type\":\"radar\",\"data\":[{\"name\":\"预算\",\"value\":[4300,10000,28000,35000,50000,19000]},{\"name\":\"实际\",\"value\":[5000,14000,28000,31000,42000,21000]}]}]};\n  WisePPT.createEChart(slide,target,option);\n})();\n<\/script>",
      "caveats": {
        "radar_dataset_caveat": "ECharts 雷达图需要 indicator 与多维 value 数组。本配方可直接渲染，但 dataset.source、radar.indicator、预算 value、实际 value 四处具有派生关系；替换业务数据时必须同步生成，不能只改其中一处。render_plan_binding.encode 保留 dimension/value 列名供合同校验。"
      },
      "notes": "雷达图的特殊性：维度需要在 radar.indicator 显式声明 name 和 max，series.data 的每个 value 数组顺序必须与 indicator 完全一致。"
    },
    {
      "component_id": "echarts.tree-lr",
      "series_type": "tree",
      "name": "从左到右树状图",
      "aliases": [
        "树图",
        "层级树",
        "tree"
      ],
      "tasks": [
        "hierarchy",
        "decomposition"
      ],
      "roles": [
        "explain"
      ],
      "relations": [
        "hierarchy",
        "decomposition"
      ],
      "primitives": [
        "node-link"
      ],
      "renderer_kinds": [
        "svg",
        "canvas"
      ],
      "component_sources": [
        "echarts"
      ],
      "dataset_mode": "derived",
      "example": "capabilities/vendors/echarts/examples/tree-lr.json",
      "selection_notes": "有唯一父节点的层级结构；扁平 node/parent 表需同步为嵌套树。",
      "group": "relationship",
      "group_label": "关系",
      "title": "从左到右树状图",
      "chart_type": "tree",
      "source_url": "https://echarts.apache.org/examples/zh/index.html#chart-type-tree",
      "source_note": "改编自 Apache ECharts 官方示例 tree-basic。树图使用嵌套层级数据 series.data，而非表格 dataset；本文件用扁平化表描述节点供 content 追踪，option 保留层级结构。",
      "upstream_license": "Apache-2.0",
      "render_plan_binding": {
        "renderer_kind": "svg",
        "component_source": "echarts",
        "component_id": "echarts.tree-lr",
        "theme_adapter_id": "paper-ink.echarts",
        "data_binding": {
          "data_ref": {
            "content_id": "item.arch-tree",
            "json_pointer": "/structured_data/rows"
          },
          "dataset_id": "dataset.tree-lr",
          "encode": {
            "nodeName": "node",
            "parentName": "parent"
          }
        }
      },
      "dataset_shape": {
        "dimensions": [
          "node",
          "parent"
        ],
        "source": [
          {
            "node": "软件架构",
            "parent": null
          },
          {
            "node": "前端",
            "parent": "软件架构"
          },
          {
            "node": "后端",
            "parent": "软件架构"
          },
          {
            "node": "基础设施",
            "parent": "软件架构"
          },
          {
            "node": "Web",
            "parent": "前端"
          },
          {
            "node": "移动端",
            "parent": "前端"
          },
          {
            "node": "API",
            "parent": "后端"
          },
          {
            "node": "数据库",
            "parent": "后端"
          },
          {
            "node": "容器",
            "parent": "基础设施"
          },
          {
            "node": "监控",
            "parent": "基础设施"
          }
        ]
      },
      "option": {
        "dataset": {
          "dimensions": [
            "node",
            "parent"
          ],
          "source": [
            {
              "node": "软件架构",
              "parent": null
            },
            {
              "node": "前端",
              "parent": "软件架构"
            },
            {
              "node": "后端",
              "parent": "软件架构"
            },
            {
              "node": "基础设施",
              "parent": "软件架构"
            },
            {
              "node": "Web",
              "parent": "前端"
            },
            {
              "node": "移动端",
              "parent": "前端"
            },
            {
              "node": "API",
              "parent": "后端"
            },
            {
              "node": "数据库",
              "parent": "后端"
            },
            {
              "node": "容器",
              "parent": "基础设施"
            },
            {
              "node": "监控",
              "parent": "基础设施"
            }
          ]
        },
        "tooltip": {
          "trigger": "item",
          "triggerOn": "mousemove"
        },
        "series": [
          {
            "type": "tree",
            "data": [
              {
                "name": "软件架构",
                "children": [
                  {
                    "name": "前端",
                    "children": [
                      {
                        "name": "Web"
                      },
                      {
                        "name": "移动端"
                      }
                    ]
                  },
                  {
                    "name": "后端",
                    "children": [
                      {
                        "name": "API"
                      },
                      {
                        "name": "数据库"
                      }
                    ]
                  },
                  {
                    "name": "基础设施",
                    "children": [
                      {
                        "name": "容器"
                      },
                      {
                        "name": "监控"
                      }
                    ]
                  }
                ]
              }
            ],
            "left": "10%",
            "right": "20%",
            "top": "8%",
            "bottom": "8%",
            "symbolSize": 8,
            "orient": "LR",
            "label": {
              "position": "left",
              "verticalAlign": "middle",
              "align": "right"
            },
            "leaves": {
              "label": {
                "position": "right",
                "verticalAlign": "middle",
                "align": "left"
              }
            },
            "emphasis": {
              "focus": "descendant"
            },
            "expandAndCollapse": true,
            "animationDuration": 550,
            "animationDurationUpdate": 750
          }
        ]
      },
      "snippet": "<div class=\"wise-ppt-echart\" data-block-id=\"block.main\" data-renderer-kind=\"svg\" data-component-source=\"echarts\" data-component-id=\"echarts.tree-lr\" data-theme-adapter-id=\"paper-ink.echarts\" data-content-ref=\"item.arch-tree\" data-dataset-id=\"dataset.tree-lr\" style=\"width:100%;height:100%\"><\/div>\n<script type=\"application/json\" data-wise-ppt-dataset=\"dataset.tree-lr\">{\"dimensions\":[\"node\",\"parent\"],\"source\":[{\"node\":\"软件架构\",\"parent\":null},{\"node\":\"前端\",\"parent\":\"软件架构\"},{\"node\":\"后端\",\"parent\":\"软件架构\"},{\"node\":\"基础设施\",\"parent\":\"软件架构\"},{\"node\":\"Web\",\"parent\":\"前端\"},{\"node\":\"移动端\",\"parent\":\"前端\"},{\"node\":\"API\",\"parent\":\"后端\"},{\"node\":\"数据库\",\"parent\":\"后端\"},{\"node\":\"容器\",\"parent\":\"基础设施\"},{\"node\":\"监控\",\"parent\":\"基础设施\"}]}<\/script>",
      "init_script": "<script>\n(function(){\n  var slide=document.currentScript.closest('.slide');\n  var target=slide.querySelector('[data-component-id=\"echarts.tree-lr\"]');\n  var option={\"dataset\":{\"dimensions\":[\"node\",\"parent\"],\"source\":[{\"node\":\"软件架构\",\"parent\":null},{\"node\":\"前端\",\"parent\":\"软件架构\"},{\"node\":\"后端\",\"parent\":\"软件架构\"},{\"node\":\"基础设施\",\"parent\":\"软件架构\"},{\"node\":\"Web\",\"parent\":\"前端\"},{\"node\":\"移动端\",\"parent\":\"前端\"},{\"node\":\"API\",\"parent\":\"后端\"},{\"node\":\"数据库\",\"parent\":\"后端\"},{\"node\":\"容器\",\"parent\":\"基础设施\"},{\"node\":\"监控\",\"parent\":\"基础设施\"}]},\"tooltip\":{\"trigger\":\"item\",\"triggerOn\":\"mousemove\"},\"series\":[{\"type\":\"tree\",\"data\":[{\"name\":\"软件架构\",\"children\":[{\"name\":\"前端\",\"children\":[{\"name\":\"Web\"},{\"name\":\"移动端\"}]},{\"name\":\"后端\",\"children\":[{\"name\":\"API\"},{\"name\":\"数据库\"}]},{\"name\":\"基础设施\",\"children\":[{\"name\":\"容器\"},{\"name\":\"监控\"}]}]}],\"left\":\"10%\",\"right\":\"20%\",\"top\":\"8%\",\"bottom\":\"8%\",\"symbolSize\":8,\"orient\":\"LR\",\"label\":{\"position\":\"left\",\"verticalAlign\":\"middle\",\"align\":\"right\"},\"leaves\":{\"label\":{\"position\":\"right\",\"verticalAlign\":\"middle\",\"align\":\"left\"}},\"emphasis\":{\"focus\":\"descendant\"},\"expandAndCollapse\":true,\"animationDuration\":550,\"animationDurationUpdate\":750}]};\n  WisePPT.createEChart(slide,target,option);\n})();\n<\/script>",
      "caveats": {
        "tree_dataset_caveat": "⚠️ ECharts tree 系列使用嵌套层级 data（series.data 是 {name, children:[...]} 的树），不直接消费行式 dataset。本文件的 dataset.source（扁平化节点表）用于：① content.json 数据可追溯；② render_plan_binding 的 encode 校验列名合法。但 option.series[0].data 是手工维护的层级结构，与扁平表语义等价但不自动同步。若数据更新，需同时改 dataset.source（扁平表）和 series.data（层级树）。"
      },
      "notes": "树图 orient:'LR' 表示从左到右展开。扁平表用 node/parent 描述父子关系，层级树 series.data 是其展开形式。两者必须保持一致。"
    },
    {
      "component_id": "echarts.sankey-basic",
      "series_type": "sankey",
      "name": "基础桑基图",
      "aliases": [
        "桑基图",
        "流向图",
        "sankey"
      ],
      "tasks": [
        "flow",
        "allocation"
      ],
      "roles": [
        "explain",
        "prove"
      ],
      "relations": [
        "flow"
      ],
      "primitives": [
        "weighted-node-link"
      ],
      "renderer_kinds": [
        "svg",
        "canvas"
      ],
      "component_sources": [
        "echarts"
      ],
      "dataset_mode": "derived",
      "example": "capabilities/vendors/echarts/examples/sankey-basic.json",
      "selection_notes": "带权重的多阶段流量分配；nodes 与 links 从关系表派生。",
      "group": "relationship",
      "group_label": "关系",
      "title": "基础桑基图",
      "chart_type": "sankey",
      "source_url": "https://echarts.apache.org/examples/zh/index.html#chart-type-sankey",
      "source_note": "改编自 Apache ECharts 官方示例 sankey-energy。桑基图需要 nodes 与 links 两类数据；本文件用一张行式表描述 link 流向（source→target→value），nodes 从 link 端点推导。",
      "upstream_license": "Apache-2.0",
      "render_plan_binding": {
        "renderer_kind": "svg",
        "component_source": "echarts",
        "component_id": "echarts.sankey-basic",
        "theme_adapter_id": "paper-ink.echarts",
        "data_binding": {
          "data_ref": {
            "content_id": "item.energy-flow",
            "json_pointer": "/structured_data/rows"
          },
          "dataset_id": "dataset.sankey-basic",
          "encode": {
            "source": "source",
            "target": "target",
            "value": "value"
          }
        }
      },
      "dataset_shape": {
        "dimensions": [
          "source",
          "target",
          "value"
        ],
        "source": [
          {
            "source": "原始能源",
            "target": "电力",
            "value": 5
          },
          {
            "source": "原始能源",
            "target": "损耗",
            "value": 1
          },
          {
            "source": "电力",
            "target": "工业",
            "value": 2
          },
          {
            "source": "电力",
            "target": "民用",
            "value": 2
          },
          {
            "source": "电力",
            "target": "损耗",
            "value": 1
          },
          {
            "source": "工业",
            "target": "最终消费",
            "value": 2
          },
          {
            "source": "民用",
            "target": "最终消费",
            "value": 2
          }
        ]
      },
      "option": {
        "dataset": {
          "dimensions": [
            "source",
            "target",
            "value"
          ],
          "source": [
            {
              "source": "原始能源",
              "target": "电力",
              "value": 5
            },
            {
              "source": "原始能源",
              "target": "损耗",
              "value": 1
            },
            {
              "source": "电力",
              "target": "工业",
              "value": 2
            },
            {
              "source": "电力",
              "target": "民用",
              "value": 2
            },
            {
              "source": "电力",
              "target": "损耗",
              "value": 1
            },
            {
              "source": "工业",
              "target": "最终消费",
              "value": 2
            },
            {
              "source": "民用",
              "target": "最终消费",
              "value": 2
            }
          ]
        },
        "tooltip": {
          "trigger": "item",
          "triggerOn": "mousemove"
        },
        "series": [
          {
            "type": "sankey",
            "data": [
              {
                "name": "原始能源"
              },
              {
                "name": "电力"
              },
              {
                "name": "损耗"
              },
              {
                "name": "工业"
              },
              {
                "name": "民用"
              },
              {
                "name": "最终消费"
              }
            ],
            "links": [
              {
                "source": "原始能源",
                "target": "电力",
                "value": 5
              },
              {
                "source": "原始能源",
                "target": "损耗",
                "value": 1
              },
              {
                "source": "电力",
                "target": "工业",
                "value": 2
              },
              {
                "source": "电力",
                "target": "民用",
                "value": 2
              },
              {
                "source": "电力",
                "target": "损耗",
                "value": 1
              },
              {
                "source": "工业",
                "target": "最终消费",
                "value": 2
              },
              {
                "source": "民用",
                "target": "最终消费",
                "value": 2
              }
            ],
            "emphasis": {
              "focus": "adjacency"
            },
            "lineStyle": {
              "color": "gradient",
              "curveness": 0.5
            }
          }
        ]
      },
      "snippet": "<div class=\"wise-ppt-echart\" data-block-id=\"block.main\" data-renderer-kind=\"svg\" data-component-source=\"echarts\" data-component-id=\"echarts.sankey-basic\" data-theme-adapter-id=\"paper-ink.echarts\" data-content-ref=\"item.energy-flow\" data-dataset-id=\"dataset.sankey-basic\" style=\"width:100%;height:100%\"><\/div>\n<script type=\"application/json\" data-wise-ppt-dataset=\"dataset.sankey-basic\">{\"dimensions\":[\"source\",\"target\",\"value\"],\"source\":[{\"source\":\"原始能源\",\"target\":\"电力\",\"value\":5},{\"source\":\"原始能源\",\"target\":\"损耗\",\"value\":1},{\"source\":\"电力\",\"target\":\"工业\",\"value\":2},{\"source\":\"电力\",\"target\":\"民用\",\"value\":2},{\"source\":\"电力\",\"target\":\"损耗\",\"value\":1},{\"source\":\"工业\",\"target\":\"最终消费\",\"value\":2},{\"source\":\"民用\",\"target\":\"最终消费\",\"value\":2}]}<\/script>",
      "init_script": "<script>\n(function(){\n  var slide=document.currentScript.closest('.slide');\n  var target=slide.querySelector('[data-component-id=\"echarts.sankey-basic\"]');\n  var option={\"dataset\":{\"dimensions\":[\"source\",\"target\",\"value\"],\"source\":[{\"source\":\"原始能源\",\"target\":\"电力\",\"value\":5},{\"source\":\"原始能源\",\"target\":\"损耗\",\"value\":1},{\"source\":\"电力\",\"target\":\"工业\",\"value\":2},{\"source\":\"电力\",\"target\":\"民用\",\"value\":2},{\"source\":\"电力\",\"target\":\"损耗\",\"value\":1},{\"source\":\"工业\",\"target\":\"最终消费\",\"value\":2},{\"source\":\"民用\",\"target\":\"最终消费\",\"value\":2}]},\"tooltip\":{\"trigger\":\"item\",\"triggerOn\":\"mousemove\"},\"series\":[{\"type\":\"sankey\",\"data\":[{\"name\":\"原始能源\"},{\"name\":\"电力\"},{\"name\":\"损耗\"},{\"name\":\"工业\"},{\"name\":\"民用\"},{\"name\":\"最终消费\"}],\"links\":[{\"source\":\"原始能源\",\"target\":\"电力\",\"value\":5},{\"source\":\"原始能源\",\"target\":\"损耗\",\"value\":1},{\"source\":\"电力\",\"target\":\"工业\",\"value\":2},{\"source\":\"电力\",\"target\":\"民用\",\"value\":2},{\"source\":\"电力\",\"target\":\"损耗\",\"value\":1},{\"source\":\"工业\",\"target\":\"最终消费\",\"value\":2},{\"source\":\"民用\",\"target\":\"最终消费\",\"value\":2}],\"emphasis\":{\"focus\":\"adjacency\"},\"lineStyle\":{\"color\":\"gradient\",\"curveness\":0.5}}]};\n  WisePPT.createEChart(slide,target,option);\n})();\n<\/script>",
      "caveats": {
        "sankey_dataset_caveat": "⚠️ ECharts sankey 系列需要 series.data（nodes 列表）和 series.links（流向列表）两个独立结构，不直接消费行式 dataset。本文件的 dataset.source 是 link 流向表；option.series[0].data（nodes）从 link 的端点推导得出，links 直接复制 link 表。三者必须保持一致：dataset.source == option.series[0].links，nodes 覆盖所有 link 端点。"
      },
      "notes": "桑基图描述流量/能量流转。行式表用 source/target/value 描述每条流，nodes 列表是去重的节点名集合。data 与 links 不自动同步，数据更新时三处都要改。"
    },
    {
      "component_id": "echarts.calendar-basic",
      "series_type": "heatmap",
      "name": "日历热力图",
      "aliases": [
        "日历图",
        "热力图",
        "calendar",
        "heatmap"
      ],
      "tasks": [
        "density",
        "calendar-activity"
      ],
      "roles": [
        "explore",
        "prove"
      ],
      "relations": [
        "distribution",
        "time-series"
      ],
      "primitives": [
        "matrix-cells"
      ],
      "renderer_kinds": [
        "svg",
        "canvas"
      ],
      "component_sources": [
        "echarts"
      ],
      "dataset_mode": "direct",
      "example": "capabilities/vendors/echarts/examples/calendar-basic.json",
      "selection_notes": "日历活跃度；calendar 是坐标系，实际 series 类型为 heatmap。",
      "group": "calendar",
      "group_label": "时间密度",
      "title": "日历图",
      "chart_type": "calendar",
      "source_url": "https://echarts.apache.org/examples/zh/index.html#chart-type-calendar",
      "source_note": "改编自 Apache ECharts 官方示例 calendar-heatmap。日历热力图数据是 {date,value} 表，适合行式 dataset + series.calendar.heatmap。",
      "upstream_license": "Apache-2.0",
      "render_plan_binding": {
        "renderer_kind": "svg",
        "component_source": "echarts",
        "component_id": "echarts.calendar-basic",
        "theme_adapter_id": "paper-ink.echarts",
        "data_binding": {
          "data_ref": {
            "content_id": "item.commit-calendar",
            "json_pointer": "/structured_data/rows"
          },
          "dataset_id": "dataset.calendar-basic",
          "encode": {
            "value": [
              "date",
              "value"
            ]
          }
        }
      },
      "dataset_shape": {
        "dimensions": [
          "date",
          "value"
        ],
        "source": [
          {
            "date": "2026-01-01",
            "value": 12
          },
          {
            "date": "2026-01-08",
            "value": 24
          },
          {
            "date": "2026-01-15",
            "value": 8
          },
          {
            "date": "2026-01-22",
            "value": 31
          },
          {
            "date": "2026-02-05",
            "value": 17
          },
          {
            "date": "2026-02-19",
            "value": 28
          },
          {
            "date": "2026-03-05",
            "value": 22
          },
          {
            "date": "2026-03-19",
            "value": 14
          },
          {
            "date": "2026-04-02",
            "value": 35
          },
          {
            "date": "2026-04-16",
            "value": 19
          },
          {
            "date": "2026-05-07",
            "value": 26
          },
          {
            "date": "2026-05-21",
            "value": 11
          },
          {
            "date": "2026-06-04",
            "value": 33
          },
          {
            "date": "2026-06-18",
            "value": 20
          }
        ]
      },
      "option": {
        "dataset": {
          "dimensions": [
            "date",
            "value"
          ],
          "source": [
            {
              "date": "2026-01-01",
              "value": 12
            },
            {
              "date": "2026-01-08",
              "value": 24
            },
            {
              "date": "2026-01-15",
              "value": 8
            },
            {
              "date": "2026-01-22",
              "value": 31
            },
            {
              "date": "2026-02-05",
              "value": 17
            },
            {
              "date": "2026-02-19",
              "value": 28
            },
            {
              "date": "2026-03-05",
              "value": 22
            },
            {
              "date": "2026-03-19",
              "value": 14
            },
            {
              "date": "2026-04-02",
              "value": 35
            },
            {
              "date": "2026-04-16",
              "value": 19
            },
            {
              "date": "2026-05-07",
              "value": 26
            },
            {
              "date": "2026-05-21",
              "value": 11
            },
            {
              "date": "2026-06-04",
              "value": 33
            },
            {
              "date": "2026-06-18",
              "value": 20
            }
          ]
        },
        "tooltip": {
          "trigger": "item",
          "formatter": "{c}"
        },
        "visualMap": {
          "min": 0,
          "max": 40,
          "calculable": true,
          "orient": "horizontal",
          "left": "center",
          "top": "top"
        },
        "calendar": {
          "top": 90,
          "left": 40,
          "right": 40,
          "cellSize": [
            "auto",
            16
          ],
          "range": "2026",
          "itemStyle": {
            "borderWidth": 0.5
          },
          "yearLabel": {
            "show": true
          }
        },
        "series": [
          {
            "type": "heatmap",
            "coordinateSystem": "calendar",
            "data": [
              [
                "2026-01-01",
                12
              ],
              [
                "2026-01-08",
                24
              ],
              [
                "2026-01-15",
                8
              ],
              [
                "2026-01-22",
                31
              ],
              [
                "2026-02-05",
                17
              ],
              [
                "2026-02-19",
                28
              ],
              [
                "2026-03-05",
                22
              ],
              [
                "2026-03-19",
                14
              ],
              [
                "2026-04-02",
                35
              ],
              [
                "2026-04-16",
                19
              ],
              [
                "2026-05-07",
                26
              ],
              [
                "2026-05-21",
                11
              ],
              [
                "2026-06-04",
                33
              ],
              [
                "2026-06-18",
                20
              ]
            ]
          }
        ]
      },
      "snippet": "<div class=\"wise-ppt-echart\" data-block-id=\"block.main\" data-renderer-kind=\"svg\" data-component-source=\"echarts\" data-component-id=\"echarts.calendar-basic\" data-theme-adapter-id=\"paper-ink.echarts\" data-content-ref=\"item.commit-calendar\" data-dataset-id=\"dataset.calendar-basic\" style=\"width:100%;height:100%\"><\/div>\n<script type=\"application/json\" data-wise-ppt-dataset=\"dataset.calendar-basic\">{\"dimensions\":[\"date\",\"value\"],\"source\":[{\"date\":\"2026-01-01\",\"value\":12},{\"date\":\"2026-01-08\",\"value\":24},{\"date\":\"2026-01-15\",\"value\":8},{\"date\":\"2026-01-22\",\"value\":31},{\"date\":\"2026-02-05\",\"value\":17},{\"date\":\"2026-02-19\",\"value\":28},{\"date\":\"2026-03-05\",\"value\":22},{\"date\":\"2026-03-19\",\"value\":14},{\"date\":\"2026-04-02\",\"value\":35},{\"date\":\"2026-04-16\",\"value\":19},{\"date\":\"2026-05-07\",\"value\":26},{\"date\":\"2026-05-21\",\"value\":11},{\"date\":\"2026-06-04\",\"value\":33},{\"date\":\"2026-06-18\",\"value\":20}]}<\/script>",
      "init_script": "<script>\n(function(){\n  var slide=document.currentScript.closest('.slide');\n  var target=slide.querySelector('[data-component-id=\"echarts.calendar-basic\"]');\n  var option={\"dataset\":{\"dimensions\":[\"date\",\"value\"],\"source\":[{\"date\":\"2026-01-01\",\"value\":12},{\"date\":\"2026-01-08\",\"value\":24},{\"date\":\"2026-01-15\",\"value\":8},{\"date\":\"2026-01-22\",\"value\":31},{\"date\":\"2026-02-05\",\"value\":17},{\"date\":\"2026-02-19\",\"value\":28},{\"date\":\"2026-03-05\",\"value\":22},{\"date\":\"2026-03-19\",\"value\":14},{\"date\":\"2026-04-02\",\"value\":35},{\"date\":\"2026-04-16\",\"value\":19},{\"date\":\"2026-05-07\",\"value\":26},{\"date\":\"2026-05-21\",\"value\":11},{\"date\":\"2026-06-04\",\"value\":33},{\"date\":\"2026-06-18\",\"value\":20}]},\"tooltip\":{\"trigger\":\"item\",\"formatter\":\"{c}\"},\"visualMap\":{\"min\":0,\"max\":40,\"calculable\":true,\"orient\":\"horizontal\",\"left\":\"center\",\"top\":\"top\"},\"calendar\":{\"top\":90,\"left\":40,\"right\":40,\"cellSize\":[\"auto\",16],\"range\":\"2026\",\"itemStyle\":{\"borderWidth\":0.5},\"yearLabel\":{\"show\":true}},\"series\":[{\"type\":\"heatmap\",\"coordinateSystem\":\"calendar\",\"data\":[[\"2026-01-01\",12],[\"2026-01-08\",24],[\"2026-01-15\",8],[\"2026-01-22\",31],[\"2026-02-05\",17],[\"2026-02-19\",28],[\"2026-03-05\",22],[\"2026-03-19\",14],[\"2026-04-02\",35],[\"2026-04-16\",19],[\"2026-05-07\",26],[\"2026-05-21\",11],[\"2026-06-04\",33],[\"2026-06-18\",20]]}]};\n  WisePPT.createEChart(slide,target,option);\n})();\n<\/script>",
      "caveats": {
        "calendar_dataset_caveat": "⚠️ 已实测确认：ECharts calendar 坐标系的 heatmap 不消费 dataset（encode 任何写法都渲染空系列），必须使用 series.data: [[date, value], ...] 二维数组。option.dataset 仍保留为数据绑定合同（与 dataset_shape、页面 JSON 数据块逐值相等）；series.data 由同一来源派生，替换数据时两处必须同步。visualMap 的 min/max 应与实际数据范围匹配。"
      },
      "notes": "日历热力图：calendar.range 指定年份，series.heatmap.coordinateSystem='calendar'。数据是 {date,value} 行式表，date 须为 YYYY-MM-DD 字符串。"
    }
  ]
};
