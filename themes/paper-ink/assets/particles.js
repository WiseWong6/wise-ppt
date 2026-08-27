/* ============================================================
   Paper Ink · 共享粒子工具库
   语言规则：
   - 画面主体全部由粒子构成，字体只作离屏采样轮廓
   - 秩序网格粒子 = 正确/结构；坠落缺粒 = 错误/异常
   - 颜色只读取 design-tokens.css
   ============================================================ */
var PART = (function () {
  var INK = getComputedStyle(document.documentElement).getPropertyValue('--ink').trim();
  if (!INK) throw new Error('paper-ink 缺少 --ink token');

  /* 种子随机：样张粒子必须可复现 —— 同一帧任何时刻打开都是同一张墨迹，
     file:// 直开、catalog iframe、缩略图与居中门禁量测全部一致，AI 参考才不漂移。
     种子取路径末三段：跨 file:///Users/... 与 http://127.0.0.1/ 两种打开方式
     稳定同值，帧与帧互不相同；PART.seed(n) 可显式覆写。 */
  var initialSeed = (function () {
    var path = '';
    try { path = location.pathname.split('/').slice(-3).join('/'); } catch (e) { path = 'paper-ink'; }
    var h = 2166136261;
    for (var i = 0; i < path.length; i++) { h ^= path.charCodeAt(i); h = Math.imul(h, 16777619); }
    return (h >>> 0) || 1;
  })();
  var randState = initialSeed;
  function seed(next) { randState = (next >>> 0) || 1; }
  function reset() { randState = initialSeed; }
  function rand() {
    /* mulberry32 */
    randState |= 0; randState = (randState + 0x6D2B79F5) | 0;
    var t = Math.imul(randState ^ (randState >>> 15), 1 | randState);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  function dot(ctx, x, y, r, a) {
    ctx.globalAlpha = a;
    ctx.fillStyle = INK;
    ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.fill();
    ctx.globalAlpha = 1;
  }

  function gauss() { return (rand() + rand() + rand() - 1.5) / 1.5; }

  /* 高斯点簇：token/节点的主角形态 */
  function cluster(ctx, x, y, r, n, aMax) {
    for (var i = 0; i < n; i++) {
      var rr = Math.abs(gauss()) * r;
      var an = rand() * 6.2832;
      dot(ctx, x + Math.cos(an) * rr, y + Math.sin(an) * rr * .85,
          .8 + rand() * 1.5, .3 + rand() * (aMax || .55));
    }
  }

  /* 尘埃：氛围/碎屑 */
  function dust(ctx, x, y, w, h, n, aMax) {
    for (var i = 0; i < n; i++) {
      dot(ctx, x + rand() * w, y + rand() * h,
          .5 + rand() * 1.3, .05 + rand() * (aMax || .22));
    }
  }

  /* 点流弧：沿二次贝塞尔撒点；density 粒/100px，width 横向抖动 */
  function arc(ctx, x1, y1, x2, y2, lift, density, alpha, width) {
    var mx = (x1 + x2) / 2, cy = y1 - Math.abs(x2 - x1) * lift;
    var steps = Math.max(40, density * Math.abs(x2 - x1) / 3);
    for (var t = 0; t <= 1; t += 1 / steps) {
      var bx = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * mx + t * t * x2;
      var by = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * cy + t * t * y2;
      dot(ctx, bx + (rand() - .5) * (width || 3),
              by + (rand() - .5) * (width || 3),
              .8 + rand() * 1.4, alpha * (.6 + rand() * .4));
    }
  }

  /* 断弧：走到 tEnd 断掉，断口向下散落 */
  function brokenArc(ctx, x1, y1, x2, y2, lift, tEnd) {
    var mx = (x1 + x2) / 2, cy = y1 - Math.abs(x2 - x1) * lift;
    var ex = 0, ey = 0;
    for (var t = 0; t <= tEnd; t += .004) {
      var bx = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * mx + t * t * x2;
      var by = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * cy + t * t * y2;
      dot(ctx, bx, by, .9 + rand() * 1.4, .75);
      ex = bx; ey = by;
    }
    for (var i = 0; i < 110; i++) {
      var d = rand();
      dot(ctx, ex + d * d * 150 * (rand() - .3), ey + d * d * 210 + rand() * 26,
          .6 + rand() * 1.4, .5 * (1 - d) + .08);
    }
  }

  /* 文字采样 → 粒子坐标数组（字体仅作离屏轮廓源） */
  function textPoints(text, x, y, font, gap) {
    var off = document.createElement('canvas');
    off.width = 1920; off.height = 1080;
    var octx = off.getContext('2d');
    octx.font = font;
    octx.textAlign = 'left';
    octx.textBaseline = 'middle';
    octx.fillStyle = INK;
    octx.fillText(text, x, y);
    var img = octx.getImageData(0, 0, 1920, 1080).data;
    var pts = [];
    gap = gap || 5;
    for (var py = 0; py < 1080; py += gap) {
      for (var px = 0; px < 1920; px += gap) {
        if (img[(py * 1920 + px) * 4 + 3] > 90) pts.push({ x: px, y: py });
      }
    }
    return pts;
  }

  function measure(text, font) {
    var off = document.createElement('canvas');
    var octx = off.getContext('2d');
    octx.font = font;
    return octx.measureText(text).width;
  }

  return { INK: INK, seed: seed, reset: reset, rand: rand, dot: dot, gauss: gauss, cluster: cluster, dust: dust,
           arc: arc, brokenArc: brokenArc, textPoints: textPoints, measure: measure };
})();

/* Canvas / ECharts 不能直接消费 CSS var；统一从共享字阶取数值。 */
function paperInkTypeSize(role) {
  var allowed = [
    'display-mark', 'particle-sample', 'display', 'hero', 'title', 'metric',
    'heading', 'emphasis', 'caption', 'subheading', 'body', 'body-small',
    'micro-secondary', 'label', 'meta'
  ];
  if (allowed.indexOf(role) < 0) throw new Error('未知 paper-ink 字阶: ' + role);
  var raw = getComputedStyle(document.documentElement).getPropertyValue('--type-' + role).trim();
  var value = Number.parseFloat(raw);
  if (!Number.isFinite(value)) throw new Error('paper-ink 字阶未定义: --type-' + role);
  return value;
}

/*
 * Gallery 独立样页 readiness 协议。正式 slide 使用 WisePPT.markSlideReady(slide)。
 */
function markRenderReady() {
  var done = false;
  function finish() {
    if (done) return;
    done = true;
    /* 强制一次同步布局，避免 headless --dump-dom 不调度 requestAnimationFrame。 */
    document.documentElement.getBoundingClientRect();
    delete document.documentElement.dataset.renderPending;
    document.documentElement.dataset.renderReady = 'true';
  }
  var fonts = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
  var images = Array.prototype.map.call(document.images || [], function (img) {
    if (img.complete) return Promise.resolve();
    return new Promise(function (resolve) {
      img.addEventListener('load', resolve, {once:true});
      img.addEventListener('error', resolve, {once:true});
    });
  });
  Promise.all([fonts].concat(images)).then(finish);
  /* 某些 file:// + headless 组合不会完成 FontFaceSet promise；固定上限防止假死。
     异步图表只有在组件完成后才调用本函数，因此这里不会提前放行图表页。 */
  setTimeout(finish, 3000);
}
