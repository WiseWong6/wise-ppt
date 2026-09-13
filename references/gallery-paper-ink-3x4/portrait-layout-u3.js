(function () {
  'use strict';
  var svg=document.querySelector('.scene'),NS='http://www.w3.org/2000/svg';
  var INK='var(--ink)',INK70='var(--ink-70)',INK45='var(--ink-45)',PAPER='var(--paper)',PANEL='var(--paper-panel)',SANS='var(--sans)',MONO='var(--mono)';
  function el(tag,attrs,parent){var n=document.createElementNS(NS,tag);Object.keys(attrs||{}).forEach(function(k){n.setAttribute(k,attrs[k]);});(parent||svg).appendChild(n);return n;}
  function text(v,x,y,attrs,parent){var n=el('text',Object.assign({x:x,y:y,fill:INK,'font-family':SANS,'font-weight':300},attrs||{}),parent);n.textContent=v;return n;}
  function line(x1,y1,x2,y2,attrs,parent){return el('line',Object.assign({x1:x1,y1:y1,x2:x2,y2:y2,stroke:INK,'stroke-width':1},attrs||{}),parent);}
  function drawU3(){
  var defs=el('defs',{}),pattern=el('pattern',{id:'u3-pivot-hatch',width:8,height:8,patternUnits:'userSpaceOnUse',patternTransform:'rotate(45)'},defs);line(0,0,0,8,{stroke:INK,'stroke-width':.7,opacity:.18},pattern);
  var g=el('g',{'data-layout-zone':'u3.lever','data-fixed-quantity':'2','data-lever-slope-adjustment':'right-down-30-percent'});
  el('path',{id:'lever-beam',d:'M 188 792.625 L 888 460.125 L 902 480.125 L 202 812.625 Z',fill:PANEL,stroke:INK,'stroke-width':1.3,'stroke-linejoin':'round'},g);
  el('circle',{id:'lever-stock-node',cx:195,cy:802.625,r:10,fill:PAPER,stroke:INK,'stroke-width':1.2},g);el('circle',{id:'lever-outcome-node',cx:895,cy:470.125,r:10,fill:PAPER,stroke:INK,'stroke-width':1.2},g);
  var stock=el('g',{'data-item-index':'0'},g);el('rect',{x:90,y:838,width:360,height:136,fill:PAPER},stock);text('STOCK',270,876,{'font-family':MONO,'font-size':13,'letter-spacing':2,'text-anchor':'middle',fill:INK45},stock);text('内容生产能力',270,923,{'font-size':27,'text-anchor':'middle'},stock);text('模型、流程与交付复用',270,960,{'font-size':17,'text-anchor':'middle',fill:INK70},stock);
  var outcome=el('g',{'data-item-index':'1'},g);el('rect',{x:720,y:312,width:270,height:132,fill:PAPER},outcome);text('OUTCOME',855,350,{'font-family':MONO,'font-size':13,'letter-spacing':2,'text-anchor':'middle',fill:INK45},outcome);text('新增订阅收入',855,402,{id:'lever-outcome-title','data-xp-anchor':'lever','font-size':27,'text-anchor':'middle'},outcome);
  var action=el('g',{'data-layout-zone':'u3.action'},g);el('rect',{x:175,y:300,width:280,height:102,fill:PAPER},action);text('ACTION',198,330,{'font-family':MONO,'font-size':12,'letter-spacing':2,fill:INK45},action);text('场景化封装',198,374,{id:'lever-transform-label','font-size':25},action);line(315,402,315,714,{'stroke-dasharray':'5 7','stroke-width':1.1},action);el('path',{d:'M 306 700 L 315 716 L 324 700',fill:'none',stroke:INK,'stroke-width':1.2,'stroke-linejoin':'round'},action);
  var pivot=el('g',{'data-layout-zone':'u3.pivot','data-pivot-shape':'low-wide-isosceles'},g);el('path',{id:'lever-pivot',d:'M 630 596 L 790 880 L 470 880 Z',fill:'url(#u3-pivot-hatch)',stroke:INK,'stroke-width':1.1,'stroke-linejoin':'round'},pivot);el('circle',{cx:630,cy:596,r:14,fill:PAPER,stroke:INK,'stroke-width':1.2},pivot);el('circle',{cx:630,cy:596,r:4,fill:INK},pivot);text('PIVOT',630,790,{'font-family':MONO,'font-size':13,'letter-spacing':2,'text-anchor':'middle',fill:INK45},pivot);text('产品化支点',630,832,{'data-xp-anchor':'lever','font-size':24,'text-anchor':'middle'},pivot);
  line(955,470.125,955,348.125,{},g);el('path',{d:'M 946 364.125 L 955 346.125 L 964 364.125',fill:'none',stroke:INK,'stroke-width':1.2,'stroke-linejoin':'round'},g);
  document.documentElement.dataset.renderPending='false';stageFit();
  }
  drawU3();
})();
