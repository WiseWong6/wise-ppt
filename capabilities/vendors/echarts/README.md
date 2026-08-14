# ECharts Runtime

本目录保存 Wise PPT 在本地 `file://` 页面中使用的 ECharts 锁版运行时。

- 锁定版本：`echarts@6.1.0`
- 目标文件：`capabilities/vendors/echarts/echarts.min.js`
- 上游文件：npm 包中的 `dist/echarts.min.js`
- 上游来源：`https://www.npmjs.com/package/echarts/v/6.1.0`
- 许可证：`Apache-2.0`
- 本地许可证：`capabilities/vendors/echarts/LICENSE`
- 运行时 SHA-256：`b66b25aeb4df84e33199dc21694014d336d222cbd9deb0e5a7c14bd6aa0d0fd0`

只从锁定版本的官方 npm 包复制目标文件，不使用 CDN，不自行修改压缩产物。更新版本时必须同时更新 `capabilities/registry.json`、本文件和运行时文件，并重新执行 JSON、manifest 与本地 `file://` 加载检查。

运行时文件落盘后，用以下命令记录并复核实际字节的 SHA-256：

```bash
shasum -a 256 capabilities/vendors/echarts/echarts.min.js
```
