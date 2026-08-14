# 本地地理数据

`guangdong-geo.json` 是广东省地级市边界数据，供 Gallery 的地理分布样张离线演示。

`guangdong-geo.js` 由 `scripts/generate-gallery.py` 从 JSON 确定性生成，只把数据登记到 `window.WISE_GUANGDONG_GEO`，使 `file://` 页面无需 `fetch` 或外网即可加载。

数据来源：DataV GeoAtlas（行政区划代码 `440000`）。样张必须保留来源标注；不要把该演示数据当成实时或权威业务数据。
