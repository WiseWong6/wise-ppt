#!/usr/bin/env node
import{createHash}from"node:crypto";import{getPdfPageCount}from"#wise-pdf-reader";import{lstat,mkdir,readFile,readdir,writeFile}from"node:fs/promises";import path from"node:path";import{setTimeout as sleep}from"node:timers/promises";import{fileURLToPath}from"node:url";const DELIVERY_FORMAT="wise-ppt-delivery@3",DECK_CONTRACT_VERSION="9",GEOMETRY_TOLERANCE_PX=1,RASTER_RMSE_THRESHOLD_PCT=2.5,RASTER_CAPTURE_SCALE=.25,RASTER_CAPTURE_WIDTH=1920,RASTER_CAPTURE_HEIGHT=1080,RASTER_BLUR_RADIUS_PX=1,REQUIRED_ROOT_FILES=["index.html","deck-spec.json","deck-plan.json","source-ledger.json","component-receipts.json","geometry-contracts.json","build-manifest.json"],REQUIRED_TREES=["assets","runtime"],JSON_ROOT_FILES=REQUIRED_ROOT_FILES.filter(name=>name.endsWith(".json")),ROOT_CONTRACTS=Object.freeze({"deck-spec.json":"wise-ppt-deck@9","deck-plan.json":"wise-ppt-deck-plan@5","source-ledger.json":"wise-ppt-source-ledger@4","component-receipts.json":"wise-ppt-component-receipts@3","geometry-contracts.json":"wise-ppt-geometry-contracts@3","build-manifest.json":"wise-ppt-build@6"});function fail(message){throw new Error(message)}function usage(){return["用法:","  node export-deck.mjs export --deck <目录> --url <file-url> --port <CDP端口> --pdf <临时PDF> --manifest <临时manifest>","  node export-deck.mjs experimental --deck <目录> --url <file-url> --port <CDP端口> --pdf <临时PDF>","  node export-deck.mjs check --deck <目录>"].join(`
`)}function parseArgs(argv){const[mode,...rest]=argv;["export","experimental","check"].includes(mode)||fail(usage());const values={};for(let i=0;i<rest.length;i+=1){const key=rest[i];(!key.startsWith("--")||i+1>=rest.length)&&fail(`非法参数: ${key}
${usage()}`),values[key.slice(2)]=rest[++i]}return{mode,values}}function sha256(buffer){return createHash("sha256").update(buffer).digest("hex")}async function shaFile(filePath){const bytes=await readFile(filePath);return{sha256:sha256(bytes),bytes:bytes.length}}function isHiddenRelative(relativePath){return relativePath.split(path.sep).some(part=>part.startsWith("."))}function isExcludedDeliveryFile(relativePath){const name=path.basename(relativePath).toLowerCase();return name==="delivery-manifest.json"||name.endsWith(".pdf")}async function collectTree(deckDir,relativeDir){const root=path.join(deckDir,relativeDir);(await lstat(root).catch(()=>null))?.isDirectory()||fail(`Wise PPT 缺少目录: ${relativeDir}/`);const files=[];async function visit(current,currentRelative){const entries=await readdir(current,{withFileTypes:!0});entries.sort((a,b)=>a.name.localeCompare(b.name,"en"));for(const entry of entries){const relativePath=path.join(currentRelative,entry.name);if(isHiddenRelative(relativePath)||isExcludedDeliveryFile(relativePath))continue;const absolutePath=path.join(current,entry.name);entry.isSymbolicLink()&&fail(`冻结产物禁止符号链接: ${relativePath}`),entry.isDirectory()?await visit(absolutePath,relativePath):entry.isFile()?files.push(relativePath):fail(`冻结产物包含不支持的文件类型: ${relativePath}`)}}return await visit(root,relativeDir),files.length||fail(`Wise PPT 目录不能为空: ${relativeDir}/`),files}async function validateJsonFiles(deckDir){const parsed={};for(const file of JSON_ROOT_FILES){const filePath=path.join(deckDir,file);try{parsed[file]=JSON.parse(await readFile(filePath,"utf8"))}catch(error){fail(`${file} 不是有效 JSON: ${error.message}`)}const expectedContract=ROOT_CONTRACTS[file];(!parsed[file]||Array.isArray(parsed[file])||parsed[file].contract!==expectedContract)&&fail(`${file} 必须声明当前合同 ${expectedContract}`)}return parsed}async function captureFrozenSnapshot(deckDir){const rootFiles=[];for(const relativePath of REQUIRED_ROOT_FILES){const absolutePath=path.join(deckDir,relativePath);(await lstat(absolutePath).catch(()=>null))?.isFile()||fail(`Wise PPT 缺少根产物: ${relativePath}`),rootFiles.push(relativePath)}await validateJsonFiles(deckDir);const treeFiles=[];for(const relativeDir of REQUIRED_TREES)treeFiles.push(...await collectTree(deckDir,relativeDir));const relativeFiles=[...rootFiles,...treeFiles].sort((a,b)=>a.localeCompare(b,"en")),files=[];for(const relativePath of relativeFiles){const digest=await shaFile(path.join(deckDir,relativePath));files.push({path:relativePath.split(path.sep).join("/"),...digest})}const treeMaterial=files.map(file=>`${file.path}\0${file.sha256}\0${file.bytes}
`).join(""),byPath=Object.fromEntries(files.map(file=>[file.path,file]));return{sha256:sha256(Buffer.from(treeMaterial)),files,html:byPath["index.html"],spec:byPath["deck-spec.json"]}}function readHtmlAttribute(html,name){const tag=html.match(/<html\b([^>]*)>/i)?.[1]||"",escaped=name.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");return tag.match(new RegExp(`\\b${escaped}\\s*=\\s*(["'])(.*?)\\1`,"i"))?.[2]?.trim()||""}async function readDeckMetadata(deckDir){const html=await readFile(path.join(deckDir,"index.html"),"utf8"),metadata={deck_contract_version:readHtmlAttribute(html,"data-deck-contract-version"),build_id:readHtmlAttribute(html,"data-build-id"),layout_registry_version:readHtmlAttribute(html,"data-layout-registry-version"),runtime_version:readHtmlAttribute(html,"data-runtime-version")};metadata.deck_contract_version!==DECK_CONTRACT_VERSION&&fail(`index.html 必须声明 data-deck-contract-version="${DECK_CONTRACT_VERSION}"`);for(const key of["build_id","layout_registry_version","runtime_version"])metadata[key]||fail(`index.html 缺少 ${key.replaceAll("_","-")}`);return metadata}function countSourceSlides(html){let count=0;const sectionPattern=/<section\b([^>]*)>/gi;for(const match of html.matchAll(sectionPattern)){const attrs=match[1],classValue=attrs.match(/\bclass\s*=\s*(["'])(.*?)\1/i)?.[2]||"",pageId=attrs.match(/\bdata-page-id\s*=\s*(["'])(.*?)\1/i)?.[2]||"";classValue.split(/\s+/).includes("slide")&&pageId&&(count+=1)}return count}async function pdfPageCount(pdfPath){try{const count=await getPdfPageCount(await readFile(pdfPath));return(!Number.isInteger(count)||count<1)&&fail("PDF 未返回有效页数"),count}catch(error){fail(`PDF 结构解析失败: ${error.message}`)}}class CdpClient{constructor(socket){this.socket=socket,this.nextId=0,this.pending=new Map,socket.onmessage=event=>{const message=JSON.parse(event.data);if(!message.id||!this.pending.has(message.id))return;const pending=this.pending.get(message.id);this.pending.delete(message.id),clearTimeout(pending.timer),message.error?pending.reject(new Error(message.error.message)):pending.resolve(message.result)},socket.onclose=event=>{const waiting=[...this.pending.values()].map(pending=>pending.method).join(", "),closeDetails=[Number.isInteger(event?.code)?`code=${event.code}`:"",event?.reason?`reason=${event.reason}`:"",waiting?`等待 ${waiting}`:""].filter(Boolean).join("；");for(const pending of this.pending.values())clearTimeout(pending.timer),pending.reject(new Error(`CDP WebSocket 已关闭${closeDetails?`（${closeDetails}）`:""}`));this.pending.clear()}}send(method,params={},timeoutMs=3e4){return new Promise((resolve,reject)=>{const id=++this.nextId,timer=setTimeout(()=>{this.pending.delete(id),reject(new Error(`CDP 超时: ${method}`))},timeoutMs);this.pending.set(id,{method,resolve,reject,timer}),this.socket.send(JSON.stringify({id,method,params}))})}async evaluate(expression,{awaitPromise=!1}={}){const result=await this.send("Runtime.evaluate",{expression,awaitPromise,returnByValue:!0});if(result.exceptionDetails){const detail=result.exceptionDetails.exception?.description||result.exceptionDetails.text||"页面脚本异常";fail(detail)}return result.result?.value}close(){this.socket.close()}}async function connectCdp(port){let websocketUrl="";for(let attempt=0;attempt<100;attempt+=1){try{const page=(await(await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find(target=>target.type==="page");if(page?.webSocketDebuggerUrl){websocketUrl=page.webSocketDebuggerUrl;break}}catch{}await sleep(100)}websocketUrl||fail(`CDP 不可达: 127.0.0.1:${port}`);const socket=new WebSocket(websocketUrl);return await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(new Error("连接 CDP WebSocket 超时")),1e4);socket.onopen=()=>{clearTimeout(timer),resolve()},socket.onerror=()=>{clearTimeout(timer),reject(new Error("连接 CDP WebSocket 失败"))}}),new CdpClient(socket)}const CAPTURE_EXPRESSION=String.raw`(() => {
  const round = value => Number(value.toFixed(3));
  const rectOf = (element, slideRect) => {
    const rect = element.getBoundingClientRect();
    return {
      left: round(rect.left - slideRect.left),
      top: round(rect.top - slideRect.top),
      width: round(rect.width),
      height: round(rect.height),
    };
  };
  const slides = Array.from(document.querySelectorAll('#track > .slide'));
  const nodes = [];
  const anchors = [];
  const fonts = [];
  slides.forEach((slide, slideIndex) => {
    const pageId = slide.getAttribute('data-page-id') || ('slide-' + (slideIndex + 1));
    const slideRect = slide.getBoundingClientRect();
    const descendants = [slide, ...slide.querySelectorAll('*')];
    descendants.forEach((element, nodeIndex) => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      const visible = style.display !== 'none' && style.visibility !== 'hidden' && Number.parseFloat(style.opacity || '1') > 0 && rect.width > 0 && rect.height > 0;
      const key = pageId + '::' + nodeIndex;
      nodes.push({
        key,
        tag: element.tagName.toLowerCase(),
        visible,
        rect: rectOf(element, slideRect),
      });
      const anchorId = element.getAttribute('data-anchor-id');
      if (anchorId && visible) {
        anchors.push({ page_id: pageId, anchor_id: anchorId, rect: rectOf(element, slideRect) });
      }
      const ownText = element.tagName === 'TEXT' || Array.from(element.childNodes).some(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
      if (ownText && visible && !['SCRIPT', 'STYLE'].includes(element.tagName)) {
        fonts.push({
          key,
          page_id: pageId,
          anchor_id: anchorId || '',
          family: style.fontFamily,
          size: style.fontSize,
          weight: style.fontWeight,
          style: style.fontStyle,
          line_height: style.lineHeight,
          letter_spacing: style.letterSpacing,
        });
      }
    });
  });
  return {
    metadata: {
      deck_contract_version: document.documentElement.dataset.deckContractVersion || '',
      build_id: document.documentElement.dataset.buildId || '',
      layout_registry_version: document.documentElement.dataset.layoutRegistryVersion || '',
      runtime_version: document.documentElement.dataset.runtimeVersion || '',
    },
    slide_count: slides.length,
    page_ids: slides.map((slide, index) => slide.getAttribute('data-page-id') || ('slide-' + (index + 1))),
    nodes,
    anchors,
    fonts,
  };
})()`;function fontSignature(font){return[font.family,font.size,font.weight,font.style,font.line_height,font.letter_spacing].join("\0")}async function settleFrames(cdp){await cdp.evaluate(String.raw`new Promise(resolve => {
    requestAnimationFrame(() => requestAnimationFrame(resolve));
  })`,{awaitPromise:!0})}async function captureSlidePng(cdp,clip){const result=await cdp.send("Page.captureScreenshot",{format:"png",fromSurface:!0,captureBeyondViewport:!0,clip:{x:clip.x,y:clip.y,width:clip.width,height:clip.height,scale:RASTER_CAPTURE_SCALE}},6e4);return result.data||fail("Page.captureScreenshot 未返回 PNG 数据"),result.data}async function captureStableScreenSlidePng(cdp,clip,pageId){let previous=null,previousSha256="";for(let attempt=1;attempt<=6;attempt+=1){const current=await captureSlidePng(cdp,clip),currentSha256=sha256(Buffer.from(current,"base64"));if(previous&&currentSha256===previousSha256)return current;previous=current,previousSha256=currentSha256,await settleFrames(cdp)}fail(`screen 栅格截图未在 6 次内稳定: ${pageId}`)}async function captureScreenRasters(cdp,state){const rasters=[],originalInlineStyles=await cdp.evaluate(String.raw`(() => {
    const deck = document.getElementById('deck');
    const deckStage = document.getElementById('deck-stage');
    const track = document.getElementById('track');
    const controls = document.getElementById('presentation-controls');
    return {
      deck: deck ? deck.getAttribute('style') : null,
      deckStage: deckStage ? deckStage.getAttribute('style') : null,
      track: track ? track.getAttribute('style') : null,
      controls: controls ? controls.getAttribute('style') : null,
    };
  })()`);await cdp.evaluate(String.raw`(() => {
    const deck = document.getElementById('deck');
    const deckStage = document.getElementById('deck-stage');
    const track = document.getElementById('track');
    const controls = document.getElementById('presentation-controls');
    if (!deck || !deckStage || !track) throw new Error('screen 栅格截图缺少 deck/deck-stage/track');
    // Compare the natural slide raster in both media modes.  The presentation
    // transform uses translate3d, which creates a composited layer and changes
    // Chrome's antialiasing even when the translation is zero; print has no
    // transform, so capturing that layer would measure the shell, not content.
    deck.style.setProperty('overflow', 'visible', 'important');
    deckStage.style.setProperty('overflow', 'visible', 'important');
    track.style.setProperty('transition', 'none', 'important');
    track.style.setProperty('transform', 'none', 'important');
    if (controls) controls.style.setProperty('visibility', 'hidden', 'important');
  })()`),await settleFrames(cdp);for(let pageIndex=0;pageIndex<state.slide_count;pageIndex+=1){const clip=await cdp.evaluate(`(() => {
      const slides = Array.from(document.querySelectorAll('#track > .slide'));
      const slide = slides[${pageIndex}];
      if (!slide) throw new Error('screen 栅格截图缺少目标 slide');
      const rect = slide.getBoundingClientRect();
      return { x: rect.left + scrollX, y: rect.top + scrollY, width: rect.width, height: rect.height };
    })()`);(Math.abs(clip.width-RASTER_CAPTURE_WIDTH)>GEOMETRY_TOLERANCE_PX||Math.abs(clip.height-RASTER_CAPTURE_HEIGHT)>GEOMETRY_TOLERANCE_PX)&&fail(`screen 栅格截图尺寸异常: ${state.page_ids[pageIndex]} ${clip.width}x${clip.height}`);const pngBase64=await captureStableScreenSlidePng(cdp,clip,state.page_ids[pageIndex]);rasters.push({page_id:state.page_ids[pageIndex],page_index:pageIndex,png_base64:pngBase64,sha256:sha256(Buffer.from(pngBase64,"base64"))})}return await cdp.evaluate(`(() => {
    const restore = (element, value) => {
      if (!element) return;
      if (value === null) element.removeAttribute('style');
      else element.setAttribute('style', value);
    };
    restore(document.getElementById('deck'), ${JSON.stringify(originalInlineStyles.deck)});
    restore(document.getElementById('deck-stage'), ${JSON.stringify(originalInlineStyles.deckStage)});
    restore(document.getElementById('track'), ${JSON.stringify(originalInlineStyles.track)});
    restore(document.getElementById('presentation-controls'), ${JSON.stringify(originalInlineStyles.controls)});
  })()`),await settleFrames(cdp),rasters}async function blurredRgbRmsePct(cdp,screenPngBase64,printPngBase64){const expression=`(async () => {
    const load = source => new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error('栅格证据 PNG 解码失败'));
      image.src = source;
    });
    const [screenImage, printImage] = await Promise.all([
      load(${JSON.stringify(`data:image/png;base64,${screenPngBase64}`)}),
      load(${JSON.stringify(`data:image/png;base64,${printPngBase64}`)}),
    ]);
    if (screenImage.width !== printImage.width || screenImage.height !== printImage.height) {
      throw new Error('screen/print 栅格尺寸变化: ' + screenImage.width + 'x' + screenImage.height + ' != ' + printImage.width + 'x' + printImage.height);
    }
    const readBlurred = image => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext('2d', { willReadFrequently: true });
      context.filter = 'blur(${RASTER_BLUR_RADIUS_PX}px)';
      context.drawImage(image, 0, 0);
      return context.getImageData(0, 0, canvas.width, canvas.height).data;
    };
    const screenPixels = readBlurred(screenImage);
    const printPixels = readBlurred(printImage);
    let squaredError = 0;
    let channelCount = 0;
    for (let offset = 0; offset < screenPixels.length; offset += 4) {
      for (let channel = 0; channel < 3; channel += 1) {
        const delta = screenPixels[offset + channel] - printPixels[offset + channel];
        squaredError += delta * delta;
        channelCount += 1;
      }
    }
    return {
      width: screenImage.width,
      height: screenImage.height,
      rmse_pct: Math.sqrt(squaredError / channelCount) / 255 * 100,
    };
  })()`;return cdp.evaluate(expression,{awaitPromise:!0})}async function compareRasterStates(cdp,screenRasters,printState,variant){screenRasters.length!==printState.slide_count&&fail(`${variant} screen/print 栅格页数变化: ${screenRasters.length} != ${printState.slide_count}`);const pages=[];let worst=null;for(let pageIndex=0;pageIndex<printState.slide_count;pageIndex+=1){const pageId=printState.page_ids[pageIndex],screenRaster=screenRasters[pageIndex];screenRaster.page_id!==pageId&&fail(`${variant} screen/print 栅格页序变化: ${screenRaster.page_id} != ${pageId}`);const clip=await cdp.evaluate(`(() => {
      const slide = document.querySelectorAll('#track > .slide')[${pageIndex}];
      if (!slide) throw new Error('print 栅格截图缺少目标 slide');
      const rect = slide.getBoundingClientRect();
      return { x: rect.left + scrollX, y: rect.top + scrollY, width: rect.width, height: rect.height };
    })()`);(Math.abs(clip.width-RASTER_CAPTURE_WIDTH)>GEOMETRY_TOLERANCE_PX||Math.abs(clip.height-RASTER_CAPTURE_HEIGHT)>GEOMETRY_TOLERANCE_PX)&&fail(`print 栅格截图尺寸异常: ${pageId} ${clip.width}x${clip.height}`);const printPngBase64=await captureSlidePng(cdp,clip),comparison=await blurredRgbRmsePct(cdp,screenRaster.png_base64,printPngBase64),rmsePct=Number(comparison.rmse_pct.toFixed(6)),evidence={page_id:pageId,page_index:pageIndex,width_px:comparison.width,height_px:comparison.height,screen_png_sha256:screenRaster.sha256,print_png_sha256:sha256(Buffer.from(printPngBase64,"base64")),blurred_rgb_rmse_pct:rmsePct};pages.push(evidence),(!worst||rmsePct>worst.blurred_rgb_rmse_pct)&&(worst=evidence),rmsePct>RASTER_RMSE_THRESHOLD_PCT&&fail(`${variant} 模糊栅格 RMSE ${rmsePct.toFixed(6)}% > ${RASTER_RMSE_THRESHOLD_PCT}%: ${pageId}`)}return{max_blurred_rgb_rmse_pct:worst?.blurred_rgb_rmse_pct||0,worst_page:worst?{page_id:worst.page_id,page_index:worst.page_index,blurred_rgb_rmse_pct:worst.blurred_rgb_rmse_pct}:null,pages}}function rasterParityEvidence(normal,accent){const worst=[normal.worst_page?{variant:"normal",...normal.worst_page}:null,accent.worst_page?{variant:"accent",...accent.worst_page}:null].filter(Boolean).sort((a,b)=>b.blurred_rgb_rmse_pct-a.blurred_rgb_rmse_pct)[0]||null;return{format:"blurred-rgb-rmse@1",threshold_pct:RASTER_RMSE_THRESHOLD_PCT,capture:{source_width_px:RASTER_CAPTURE_WIDTH,source_height_px:RASTER_CAPTURE_HEIGHT,scale:RASTER_CAPTURE_SCALE,width_px:RASTER_CAPTURE_WIDTH*RASTER_CAPTURE_SCALE,height_px:RASTER_CAPTURE_HEIGHT*RASTER_CAPTURE_SCALE,blur_radius_px:RASTER_BLUR_RADIUS_PX,compared_channels:["r","g","b"]},max_blurred_rgb_rmse_pct:worst?.blurred_rgb_rmse_pct||0,worst_page:worst,variants:{normal,accent}}}function compareRenderStates(screen,print){screen.slide_count!==print.slide_count&&fail(`screen/print slide 数变化: ${screen.slide_count} != ${print.slide_count}`),screen.nodes.length!==print.nodes.length&&fail(`screen/print DOM 子级数变化: ${screen.nodes.length} != ${print.nodes.length}`);const printNodes=new Map(print.nodes.map(node=>[node.key,node]));let maxDelta=0,maxDetail=null;for(const screenNode of screen.nodes){const printNode=printNodes.get(screenNode.key);if(printNode||fail(`print 缺少 screen 节点: ${screenNode.key}`),screenNode.tag!==printNode.tag&&fail(`screen/print 节点顺序变化: ${screenNode.key}`),screenNode.visible!==printNode.visible&&fail(`screen/print 可见性变化: ${screenNode.key} <${screenNode.tag}>`),!!screenNode.visible)for(const field of["left","top","width","height"]){const delta=Math.abs(screenNode.rect[field]-printNode.rect[field]);delta>maxDelta&&(maxDelta=delta,maxDetail={key:screenNode.key,tag:screenNode.tag,field,screen:screenNode.rect[field],print:printNode.rect[field]})}}maxDelta>GEOMETRY_TOLERANCE_PX&&fail(`screen/print 子级几何偏差 ${maxDelta.toFixed(3)}px > ${GEOMETRY_TOLERANCE_PX}px: ${JSON.stringify(maxDetail)}`);const printFonts=new Map(print.fonts.map(font=>[font.key,font]));for(const screenFont of screen.fonts){const printFont=printFonts.get(screenFont.key);printFont||fail(`print 缺少 screen 文字节点: ${screenFont.key}`),fontSignature(screenFont)!==fontSignature(printFont)&&fail(`screen/print computed font 变化: ${screenFont.key}`)}return screen.fonts.length!==print.fonts.length&&fail(`screen/print 文字节点数变化: ${screen.fonts.length} != ${print.fonts.length}`),{max_geometry_delta_px:Number(maxDelta.toFixed(3)),max_detail:maxDetail}}function variantUrl(baseUrl,{accent,print}){const url=new URL(baseUrl);return url.searchParams.delete("accent"),url.searchParams.delete("print"),url.searchParams.delete("board"),url.searchParams.delete("selftest"),print?url.searchParams.set("print","1"):url.searchParams.set("board","0"),url.searchParams.set("accent",accent?"1":"0"),url.hash="",url.href}function variantEvidence(state,urlState){return{url_state:urlState,slide_count:state.slide_count,compared_descendants:state.nodes.length,anchor_count:state.anchors.length,computed_font_count:state.fonts.length,anchors_sha256:sha256(Buffer.from(JSON.stringify(state.anchors))),computed_fonts_sha256:sha256(Buffer.from(JSON.stringify(state.fonts)))}}async function waitUntilReady(cdp){for(let attempt=0;attempt<200;attempt+=1){const state=await cdp.evaluate(String.raw`(() => {
      const root = document.documentElement;
      if (!root) return { ready: false, deck_error: '', runtime_error: '', font_check: '', render_errors: [] };
      return {
        ready: document.readyState === 'complete' && document.fonts.status === 'loaded' && root.dataset.deckReady === 'true',
        deck_error: root.dataset.deckError || '',
        runtime_error: root.dataset.runtimeCheckError || '',
        font_check: root.dataset.fontCheck || '',
        render_errors: Array.from(document.querySelectorAll('#track > .slide[data-render-error]')).map((slide) => ({
          page_id: slide.dataset.pageId || slide.id || '',
          error: slide.dataset.renderError || '',
        })),
      };
    })()`);if(state.deck_error){const detail=state.runtime_error||(state.render_errors?.length?JSON.stringify(state.render_errors):"")||`deck_error=${state.deck_error}; font_check=${state.font_check||"unknown"}`;fail(`deck runtime 报错: ${detail}`)}if(state.ready)return;await sleep(100)}fail("deck 未在 20 秒内达到 data-deck-ready=true 且字体 loaded")}async function readRuntimeSelfTestContext(deckDir){let spec,sourceLedger;try{spec=JSON.parse(await readFile(path.join(deckDir,"deck-spec.json"),"utf8")),sourceLedger=JSON.parse(await readFile(path.join(deckDir,"source-ledger.json"),"utf8"))}catch(error){fail(`runtime selftest 无法读取 deck-spec/source-ledger: ${error.message}`)}return{must:Array.isArray(spec.must)?spec.must:[],source_ledger:sourceLedger}}async function runRuntimeSelfTest(cdp,context,variant){const contextLiteral=JSON.stringify(context),result=await cdp.evaluate(`(() => {
    const runtime = window.WisePPTRuntime;
    if (!runtime || typeof runtime.selfTest !== 'function') {
      return { status: 'missing', error: 'window.WisePPTRuntime.selfTest 缺失' };
    }
    if (runtime.selfTestContract !== 'wise-ppt-runtime-selftest@2') {
      return { status: 'missing', error: 'runtime selftest contract 缺失或版本不匹配' };
    }
    try {
      const returned = runtime.selfTest(${contextLiteral});
      const root = document.documentElement;
      return Object.assign({}, returned || {}, {
        status: root.dataset.runtimeCheck || (returned && returned.status) || '',
        error: root.dataset.runtimeCheckError || (returned && returned.error) || '',
        deck_contract_check: root.dataset.deckContractCheck || '',
        content_check: root.dataset.vnextContentCheck || '',
        fit_check: root.dataset.vnextFitCheck || '',
        typography_check: root.dataset.vnextTypographyCheck || '',
        overflow_check: root.dataset.vnextOverflowCheck || '',
        safe_area_check: root.dataset.vnextSafeAreaCheck || '',
        source_visibility_check: root.dataset.vnextSourceVisibilityCheck || '',
        ledger_check: root.dataset.vnextLedgerCheck || '',
        font_check: root.dataset.fontCheck || '',
      });
    } catch (error) {
      return { status: 'fail', error: error && error.message ? error.message : String(error) };
    }
  })()`);(!result||result.status==="missing")&&fail(`${variant} runtime selftest 缺失: ${result?.error||"未返回结果"}`);const requiredChecks=["deck_contract_check","content_check","fit_check","typography_check","overflow_check","safe_area_check","source_visibility_check","ledger_check","font_check"],failedChecks=requiredChecks.filter(key=>result[key]!=="pass");if(result.status!=="pass"||failedChecks.length){const detail=result.error||`未通过: ${failedChecks.join(", ")}`;fail(`${variant} runtime selftest 失败: ${detail}`)}return{contract:"wise-ppt-runtime-selftest@2",status:"pass",checks:Object.fromEntries(requiredChecks.map(key=>[key,result[key]]))}}async function settle(cdp){await cdp.evaluate(String.raw`new Promise(resolve => {
    document.fonts.ready.then(() => requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(resolve, 60))));
  })`,{awaitPromise:!0})}async function openScreenVariant(cdp,baseUrl,accent,diskMetadata,selfTestContext){const screenUrl=variantUrl(baseUrl,{accent,print:!1});await cdp.send("Emulation.setEmulatedMedia",{media:"screen"}),await cdp.send("Page.navigate",{url:screenUrl}),await waitUntilReady(cdp);const selftest=await runRuntimeSelfTest(cdp,selfTestContext,accent?"accent_screen":"normal_screen");await cdp.evaluate(String.raw`(() => {
    document.documentElement.classList.remove('print-mode');
    document.body.classList.remove('mode-board');
    document.body.classList.add('mode-deck');
    if (window.WisePPTRuntime) {
      window.WisePPTRuntime.fit();
      window.WisePPTRuntime.go(0, false);
    }
  })()`),await settle(cdp);const state=await cdp.evaluate(CAPTURE_EXPRESSION);return state.slide_count<1&&fail("index.html 中没有 #track > .slide"),JSON.stringify(state.metadata)!==JSON.stringify(diskMetadata)&&fail("浏览器中的 Wise PPT 元数据与冻结 index.html 不一致"),await cdp.evaluate("document.documentElement.classList.contains('accent')")!==accent&&fail(`${accent?"accent":"normal"} URL 未得到对应根 class`),{state,url:screenUrl,selftest}}async function switchToPrintVariant(cdp,baseUrl,accent,diskMetadata){const printUrl=variantUrl(baseUrl,{accent,print:!0});await cdp.evaluate(`(() => {
    history.replaceState(null, '', ${JSON.stringify(printUrl)});
    document.documentElement.classList.add('print-mode');
    document.body.classList.remove('mode-board');
    document.body.classList.add('mode-deck');
  })()`),await cdp.send("Emulation.setEmulatedMedia",{media:"print"}),await settle(cdp);const state=await cdp.evaluate(CAPTURE_EXPRESSION);return JSON.stringify(state.metadata)!==JSON.stringify(diskMetadata)&&fail("print-mode 中的 Wise PPT 元数据与冻结 index.html 不一致"),{state,url:printUrl}}async function exportDeck({deckDir,url,port,pdfPath,manifestPath}){const before=await captureFrozenSnapshot(deckDir),diskMetadata=await readDeckMetadata(deckDir),selfTestContext=await readRuntimeSelfTestContext(deckDir),cdp=await connectCdp(port);try{const browserVersion=await cdp.send("Browser.getVersion");await cdp.send("Emulation.setDeviceMetricsOverride",{width:1920,height:1080,deviceScaleFactor:1,mobile:!1});const normalScreen=await openScreenVariant(cdp,url,!1,diskMetadata,selfTestContext),normalScreenRasters=await captureScreenRasters(cdp,normalScreen.state),normalPrint=await switchToPrintVariant(cdp,url,!1,diskMetadata),normalParity=compareRenderStates(normalScreen.state,normalPrint.state),normalRasterParity=await compareRasterStates(cdp,normalScreenRasters,normalPrint.state,"normal");normalScreenRasters.length=0;const accentScreen=await openScreenVariant(cdp,url,!0,diskMetadata,selfTestContext),accentScreenRasters=await captureScreenRasters(cdp,accentScreen.state),accentPrint=await switchToPrintVariant(cdp,url,!0,diskMetadata),accentParity=compareRenderStates(accentScreen.state,accentPrint.state),accentRasterParity=await compareRasterStates(cdp,accentScreenRasters,accentPrint.state,"accent");accentScreenRasters.length=0;const rasterParity=rasterParityEvidence(normalRasterParity,accentRasterParity),printed=await cdp.send("Page.printToPDF",{displayHeaderFooter:!1,printBackground:!0,preferCSSPageSize:!0,generateTaggedPDF:!0},12e4);printed.data||fail("Page.printToPDF 未返回 PDF 数据");const pdfBytes=Buffer.from(printed.data,"base64");pdfBytes.subarray(0,5).toString()!=="%PDF-"&&fail("Page.printToPDF 返回无效 PDF"),await mkdir(path.dirname(pdfPath),{recursive:!0}),await writeFile(pdfPath,pdfBytes);const pageCount=await pdfPageCount(pdfPath);pageCount!==normalScreen.state.slide_count&&fail(`PDF 页数 ${pageCount} 与 slide 数 ${normalScreen.state.slide_count} 不一致`);const sourceHtml=await readFile(path.join(deckDir,"index.html"),"utf8"),sourceSlideCount=countSourceSlides(sourceHtml);sourceSlideCount!==normalScreen.state.slide_count&&fail(`源 HTML slide 数 ${sourceSlideCount} 与浏览器 DOM ${normalScreen.state.slide_count} 不一致`);const after=await captureFrozenSnapshot(deckDir);before.sha256!==after.sha256&&fail("导出期间 index/spec/assets/runtime 发生变化，拒绝写入交付物");const pdfDigest=await shaFile(pdfPath),manifest={format:DELIVERY_FORMAT,generated_at:new Date().toISOString(),build_id:diskMetadata.build_id,versions:{deck_contract:diskMetadata.deck_contract_version,layout_registry:diskMetadata.layout_registry_version,runtime:diskMetadata.runtime_version},renderer:{product:browserVersion.product||"",revision:browserVersion.revision||"",protocol_version:browserVersion.protocolVersion||"",user_agent:browserVersion.userAgent||"",js_version:browserVersion.jsVersion||""},checks:{renderer_evidence:"pass"},page_count:pageCount,artifacts:{spec:{path:"deck-spec.json",sha256:before.spec.sha256,bytes:before.spec.bytes},html:{path:"index.html",sha256:before.html.sha256,bytes:before.html.bytes},assets:{scope:[...REQUIRED_ROOT_FILES,"assets/**","runtime/**"],excludes:["**/*.pdf","**/delivery-manifest.json","**/.*"],sha256:before.sha256,files:before.files},pdf:{path:"deck.pdf",sha256:pdfDigest.sha256,bytes:pdfDigest.bytes}},render_contract:{browser_session:"single-cdp-page",pdf_variant:"accent_print",runtime_selftest:{normal_screen:normalScreen.selftest,accent_screen:accentScreen.selftest},checked_variants:["normal_screen","normal_print","accent_screen","accent_print"],geometry_tolerance_px:GEOMETRY_TOLERANCE_PX,max_geometry_delta_px:Math.max(normalParity.max_geometry_delta_px,accentParity.max_geometry_delta_px),parity:{normal:normalParity,accent:accentParity},raster_parity:rasterParity,variants:{normal_screen:variantEvidence(normalScreen.state,new URL(normalScreen.url).search),normal_print:variantEvidence(normalPrint.state,new URL(normalPrint.url).search),accent_screen:variantEvidence(accentScreen.state,new URL(accentScreen.url).search),accent_print:variantEvidence(accentPrint.state,new URL(accentPrint.url).search)},screen_anchors:normalScreen.state.anchors,computed_fonts:normalScreen.state.fonts}};return await mkdir(path.dirname(manifestPath),{recursive:!0}),await writeFile(manifestPath,`${JSON.stringify(manifest,null,2)}
`),manifest}finally{cdp.close()}}async function exportExperimentalDeck({deckDir,url,port,pdfPath}){const sourceHtml=await readFile(path.join(deckDir,"index.html"),"utf8"),sourceSlideCount=countSourceSlides(sourceHtml);sourceSlideCount<1&&fail("实验 index.html 中没有 section.slide[data-page-id]");const cdp=await connectCdp(port);try{const browserVersion=await cdp.send("Browser.getVersion");await cdp.send("Emulation.setDeviceMetricsOverride",{width:1920,height:1080,deviceScaleFactor:1,mobile:!1}),await cdp.send("Emulation.setEmulatedMedia",{media:"print"}),await cdp.send("Page.navigate",{url}),await waitUntilReady(cdp),await cdp.evaluate(String.raw`(() => {
      document.documentElement.classList.add('print-mode');
      document.body.classList.remove('mode-board');
      document.body.classList.add('mode-deck');
    })()`),await settle(cdp);const state=await cdp.evaluate(String.raw`(() => {
      const slides = Array.from(document.querySelectorAll('#track > .slide'));
      const pages = slides.map((slide, index) => {
        const experimentalMarker = slide.getAttribute('data-wise-ppt-experimental-delivery') === 'true';
        const redraw = slide.getAttribute('data-layout-source') === 'experimental-redraw';
        const slideRect = slide.getBoundingClientRect();
        const visibleElement = (node) => {
          const style = getComputedStyle(node);
          const rect = node.getBoundingClientRect();
          return style.display !== 'none' && style.visibility !== 'hidden'
            && Number.parseFloat(style.opacity || '1') > 0 && rect.width > 0 && rect.height > 0;
        };
        const claimNodes = Array.from(slide.querySelectorAll('[data-experimental-claim="true"]'));
        const visibleClaims = claimNodes.filter(visibleElement);
        let requiredVisible = [];
        try {
          requiredVisible = JSON.parse(slide.getAttribute('data-experimental-required-visible') || '[]');
        } catch (_error) {
          requiredVisible = ['(invalid data-experimental-required-visible)'];
        }
        const visibleTextElements = Array.from(slide.querySelectorAll('*')).filter(visibleElement);
        const missingRequiredVisible = requiredVisible.filter((required) => !visibleTextElements.some((node) => (
          typeof required === 'string' && (node.innerText || '').includes(required)
        )));
        const textNodes = Array.from(slide.querySelectorAll('*')).filter((node) => {
          const ownText = Array.from(node.childNodes).some((child) => (
            child.nodeType === Node.TEXT_NODE && child.textContent.trim()
          ));
          return ownText && visibleElement(node);
        });
        const smallText = textNodes
          .map((node) => ({
            text: node.textContent.trim().slice(0, 80),
            size: Number.parseFloat(getComputedStyle(node).fontSize || '0'),
          }))
          .filter((item) => item.size < 18);
        const inkNodes = Array.from(new Set([
          ...textNodes,
          ...slide.querySelectorAll('img,svg,canvas,video,object,iframe,[data-experimental-claim="true"]'),
        ])).filter(visibleElement);
        const outOfBounds = inkNodes
          .map((node) => {
            const rect = node.getBoundingClientRect();
            return {
              tag: node.tagName.toLowerCase(),
              left: rect.left - slideRect.left,
              top: rect.top - slideRect.top,
              right: rect.right - slideRect.left,
              bottom: rect.bottom - slideRect.top,
            };
          })
          .filter((rect) => (
            rect.left < -1 || rect.top < -1
            || rect.right > slideRect.width + 1 || rect.bottom > slideRect.height + 1
          ));
        return {
          page_id: slide.getAttribute('data-page-id') || ('slide-' + (index + 1)),
          experimental_marker: experimentalMarker,
          redraw,
          width: slideRect.width,
          height: slideRect.height,
          claim_count: claimNodes.length,
          visible_claim_count: visibleClaims.length,
          missing_required_visible: missingRequiredVisible,
          small_text: smallText,
          out_of_bounds: outOfBounds,
        };
      });
      const incompleteImages = Array.from(document.images)
        .filter((image) => !image.complete || image.naturalWidth < 1)
        .map((image) => image.currentSrc || image.src || '(unknown)');
      return {
        ready_state: document.readyState,
        fonts_status: document.fonts.status,
        deck_ready: document.documentElement.dataset.deckReady || '',
        slide_count: slides.length,
        pages,
        incomplete_images: incompleteImages,
      };
    })()`);(state.ready_state!=="complete"||state.fonts_status!=="loaded"||state.deck_ready!=="true")&&fail(`实验 HTML 未完成浏览器加载: ${JSON.stringify(state)}`),state.slide_count!==sourceSlideCount&&fail(`实验源 HTML slide 数 ${sourceSlideCount} 与浏览器 DOM ${state.slide_count} 不一致`);const invalidMarkers=state.pages.filter(page=>!page.experimental_marker);invalidMarkers.length&&fail(`实验页缺少非视觉实验标记: ${JSON.stringify(invalidMarkers)}`);const invalidRedraw=state.pages.filter(page=>page.redraw&&(Math.abs(page.width-1920)>1||Math.abs(page.height-1080)>1||page.claim_count!==1||page.visible_claim_count!==1||page.missing_required_visible.length>0||page.small_text.length>0||page.out_of_bounds.length>0));invalidRedraw.length&&fail(`实验重绘页未通过 16:9/claim/证据/最小字号/边界检查: ${JSON.stringify(invalidRedraw)}`),state.incomplete_images.length&&fail(`实验 HTML 有未加载图片: ${JSON.stringify(state.incomplete_images)}`);const printed=await cdp.send("Page.printToPDF",{displayHeaderFooter:!1,printBackground:!0,preferCSSPageSize:!0,generateTaggedPDF:!0},12e4);printed.data||fail("实验 Page.printToPDF 未返回 PDF 数据");const pdfBytes=Buffer.from(printed.data,"base64");return pdfBytes.subarray(0,5).toString()!=="%PDF-"&&fail("实验 Page.printToPDF 返回无效 PDF"),await mkdir(path.dirname(pdfPath),{recursive:!0}),await writeFile(pdfPath,pdfBytes),{page_count:state.slide_count,experimental_marker_count:state.pages.length,renderer:{product:browserVersion.product,revision:browserVersion.revision,protocol_version:browserVersion.protocolVersion,user_agent:browserVersion.userAgent,js_version:browserVersion.jsVersion}}}finally{cdp.close()}}function validateRasterParityEvidence(manifest){const raster=manifest.render_contract?.raster_parity;raster?.format!=="blurred-rgb-rmse@1"&&fail("delivery manifest 缺少模糊栅格 RMSE 证据"),raster.threshold_pct!==RASTER_RMSE_THRESHOLD_PCT&&fail(`delivery manifest 栅格 RMSE 阈值必须为 ${RASTER_RMSE_THRESHOLD_PCT}%`),(raster.capture?.scale!==RASTER_CAPTURE_SCALE||raster.capture?.width_px!==RASTER_CAPTURE_WIDTH*RASTER_CAPTURE_SCALE||raster.capture?.height_px!==RASTER_CAPTURE_HEIGHT*RASTER_CAPTURE_SCALE||raster.capture?.blur_radius_px!==RASTER_BLUR_RADIUS_PX)&&fail("delivery manifest 栅格截图/模糊参数不一致");const candidates=[];for(const variant of["normal","accent"]){const evidence=raster.variants?.[variant];(!evidence||!Array.isArray(evidence.pages)||evidence.pages.length!==manifest.page_count)&&fail(`delivery manifest ${variant} 栅格逐页证据不完整`);for(let pageIndex=0;pageIndex<evidence.pages.length;pageIndex+=1){const page=evidence.pages[pageIndex];(page.page_index!==pageIndex||!page.page_id)&&fail(`delivery manifest ${variant} 栅格页序无效`),(!/^[a-f0-9]{64}$/.test(page.screen_png_sha256||"")||!/^[a-f0-9]{64}$/.test(page.print_png_sha256||""))&&fail(`delivery manifest ${variant} 栅格哈希无效: ${page.page_id}`),(!Number.isFinite(page.blurred_rgb_rmse_pct)||page.blurred_rgb_rmse_pct>RASTER_RMSE_THRESHOLD_PCT)&&fail(`delivery manifest ${variant} 栅格 RMSE 超限: ${page.page_id}`),candidates.push({variant,...page})}}const worst=candidates.sort((a,b)=>b.blurred_rgb_rmse_pct-a.blurred_rgb_rmse_pct)[0];(!worst||Math.abs(worst.blurred_rgb_rmse_pct-raster.max_blurred_rgb_rmse_pct)>1e-6)&&fail("delivery manifest 最大栅格 RMSE 与逐页证据不一致"),(raster.worst_page?.variant!==worst.variant||raster.worst_page?.page_id!==worst.page_id||raster.worst_page?.page_index!==worst.page_index)&&fail("delivery manifest 最差栅格页与逐页证据不一致")}function validateRuntimeSelfTestEvidence(manifest){const evidence=manifest.render_contract?.runtime_selftest,requiredChecks=["deck_contract_check","content_check","fit_check","typography_check","overflow_check","safe_area_check","source_visibility_check","ledger_check","font_check"];for(const variant of["normal_screen","accent_screen"]){const item=evidence?.[variant];(item?.contract!=="wise-ppt-runtime-selftest@2"||item.status!=="pass")&&fail(`delivery manifest 缺少 ${variant} runtime selftest 通过证据`);const failed=requiredChecks.filter(key=>item.checks?.[key]!=="pass");failed.length&&fail(`delivery manifest ${variant} runtime selftest 证据不完整: ${failed.join(", ")}`)}}async function checkDelivery({deckDir}){const manifestFile=path.join(deckDir,"delivery-manifest.json");let manifest;try{manifest=JSON.parse(await readFile(manifestFile,"utf8"))}catch(error){fail(`无法读取 delivery-manifest.json: ${error.message}`)}manifest.format!==DELIVERY_FORMAT&&fail(`未知 delivery manifest: ${manifest.format||"(empty)"}`),/^Chrome\//.test(String(manifest.renderer?.product||"").replace(/^Google /,""))||fail("delivery manifest 缺少 Google Chrome 渲染器证据"),(!manifest.renderer?.protocol_version||!manifest.renderer?.user_agent)&&fail("delivery manifest Chrome 渲染器证据不完整"),manifest.checks?.renderer_evidence!=="pass"&&fail("delivery manifest 未声明渲染器证据通过"),validateRuntimeSelfTestEvidence(manifest),validateRasterParityEvidence(manifest);const snapshot=await captureFrozenSnapshot(deckDir),metadata=await readDeckMetadata(deckDir),expected=manifest.artifacts||{};snapshot.spec.sha256!==expected.spec?.sha256&&fail("STALE deck-spec.json 已改变，PDF 过期"),snapshot.html.sha256!==expected.html?.sha256&&fail("STALE index.html 已改变，PDF 过期"),snapshot.sha256!==expected.assets?.sha256&&fail("STALE assets/runtime/编译产物已改变，PDF 过期"),metadata.build_id!==manifest.build_id&&fail("STALE data-build-id 与 delivery manifest 不一致"),metadata.deck_contract_version!==String(manifest.versions?.deck_contract||"")&&fail("STALE deck contract version 已改变"),metadata.layout_registry_version!==manifest.versions?.layout_registry&&fail("STALE layout registry version 已改变"),metadata.runtime_version!==manifest.versions?.runtime&&fail("STALE runtime version 已改变");const pdfStoredPath=expected.pdf?.path;pdfStoredPath!=="deck.pdf"&&fail("delivery manifest PDF 路径必须固定为 deck.pdf");const pdfPath=path.join(deckDir,"deck.pdf"),pdfDigest=await shaFile(pdfPath).catch(()=>null);pdfDigest||fail(`delivery manifest 指向的 PDF 不存在: ${pdfStoredPath}`),(pdfDigest.sha256!==expected.pdf.sha256||pdfDigest.bytes!==expected.pdf.bytes)&&fail("STALE PDF 文件与 delivery manifest 不一致");const pageCount=await pdfPageCount(pdfPath);pageCount!==manifest.page_count&&fail(`STALE PDF 页数 ${pageCount} != ${manifest.page_count}`);const html=await readFile(path.join(deckDir,"index.html"),"utf8"),slideCount=countSourceSlides(html);return slideCount!==manifest.page_count&&fail(`STALE HTML slide 数 ${slideCount} != ${manifest.page_count}`),{page_count:pageCount,pdf_path:pdfPath,build_id:manifest.build_id}}async function main(){const{mode,values}=parseArgs(process.argv.slice(2));values.deck||fail(`缺少 --deck
${usage()}`);const deckDir=path.resolve(values.deck);if(mode==="export"){const allowed=new Set(["deck","url","port","pdf","manifest"]),unknown=Object.keys(values).filter(key=>!allowed.has(key));unknown.length&&fail(`export 含未登记参数: ${unknown.map(key=>`--${key}`).join(", ")}
${usage()}`);for(const key of["url","port","pdf","manifest"])values[key]||fail(`export 缺少 --${key}
${usage()}`);const result=await exportDeck({deckDir,url:values.url,port:Number(values.port),pdfPath:path.resolve(values.pdf),manifestPath:path.resolve(values.manifest)});process.stdout.write(`PASS Wise PPT render pages=${result.page_count} max_delta=${result.render_contract.max_geometry_delta_px}px max_rmse=${result.render_contract.raster_parity.max_blurred_rgb_rmse_pct}%
`)}else if(mode==="experimental"){const allowed=new Set(["deck","url","port","pdf"]),unknown=Object.keys(values).filter(key=>!allowed.has(key));unknown.length&&fail(`experimental 含未登记参数: ${unknown.map(key=>`--${key}`).join(", ")}
${usage()}`);for(const key of["url","port","pdf"])values[key]||fail(`experimental 缺少 --${key}
${usage()}`);const result=await exportExperimentalDeck({deckDir,url:values.url,port:Number(values.port),pdfPath:path.resolve(values.pdf)});process.stdout.write(`PASS Wise PPT experimental render pages=${result.page_count} markers=${result.experimental_marker_count}
`)}else{const allowed=new Set(["deck"]),unknown=Object.keys(values).filter(key=>!allowed.has(key));unknown.length&&fail(`check 含未登记参数: ${unknown.map(key=>`--${key}`).join(", ")}
${usage()}`);const result=await checkDelivery({deckDir});process.stdout.write(`PASS Wise PPT delivery current pages=${result.page_count} build_id=${result.build_id} pdf=${result.pdf_path}
`)}}process.argv[1]&&path.basename(process.argv[1])==="export-deck.mjs"&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)&&main().catch(error=>{process.stderr.write(`FAIL Wise PPT export: ${error.message}
`),process.exitCode=1});export{captureStableScreenSlidePng,checkDelivery,exportDeck,exportExperimentalDeck};
