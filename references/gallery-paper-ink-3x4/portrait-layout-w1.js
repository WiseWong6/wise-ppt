(function () {
  'use strict';
  var svg=document.querySelector('.scene'),NS='http://www.w3.org/2000/svg';
  var INK='var(--ink)',FUNCTIONAL='var(--wp-color-functional)',INK70='var(--ink-70)',INK45='var(--ink-45)',SANS='var(--sans)',MONO='var(--mono)';
  function el(tag,attrs,parent){var n=document.createElementNS(NS,tag);Object.keys(attrs||{}).forEach(function(k){n.setAttribute(k,attrs[k]);});(parent||svg).appendChild(n);return n;}
  function text(v,x,y,attrs,parent){var n=el('text',Object.assign({x:x,y:y,fill:INK,'font-family':SANS,'font-weight':300},attrs||{}),parent);n.textContent=v;return n;}
  function line(x1,y1,x2,y2,attrs,parent){return el('line',Object.assign({x1:x1,y1:y1,x2:x2,y2:y2,stroke:INK,'stroke-width':1},attrs||{}),parent);}
  function drawW1(){
  var orbit=el('g',{'data-layout-zone':'w1.orbit','data-slot-id':'orbit'}),details=el('g',{'data-layout-zone':'w1.details','data-slot-id':'details'});
  var CX=180,CY=660,R=380,R2=520,ROWS=[360,560,760,960];
  function arcX(radius,y){return CX+Math.sqrt(radius*radius-(CY-y)*(CY-y));}
  el('circle',{id:'w1-focus-hub',cx:CX,cy:CY,r:86,fill:'none',stroke:INK,'stroke-width':.6,opacity:.45},orbit);el('circle',{cx:CX,cy:CY,r:76,fill:'none',stroke:INK,'stroke-width':1.5},orbit);text('制造中台',CX,CY-5,{id:'w1-focus-hub-title','data-xp-anchor':'hub','font-size':25,'font-weight':400,'letter-spacing':2,'text-anchor':'middle'},orbit);text('OPS CORE',CX,CY+30,{'font-family':MONO,'font-size':11,'letter-spacing':3,'text-anchor':'middle',fill:INK45},orbit);
  var ext=120;el('path',{id:'w1-inner-arc',d:'M '+arcX(R,ROWS[0])+' '+ROWS[0]+' A '+R+' '+R+' 0 0 1 '+arcX(R,ROWS[3])+' '+ROWS[3],fill:'none',stroke:INK,'stroke-width':1.2,opacity:.65,'stroke-dasharray':'5 7'},orbit);el('path',{id:'w1-outer-arc',d:'M '+arcX(R2,ROWS[0]-ext)+' '+(ROWS[0]-ext)+' A '+R2+' '+R2+' 0 0 1 '+arcX(R2,ROWS[3]+ext)+' '+(ROWS[3]+ext),fill:'none',stroke:INK,'stroke-width':1.2,opacity:.65,'stroke-dasharray':'5 7'},orbit);
  var sats=[['资质背书','更可信'],['自有平台','更普惠'],['数据闭环','更精准'],['生态协同','更开放']];var info=[['国家级认证与行业白名单资质齐备','牵头两项行业标准起草'],['自营平台服务用户超过一亿','四大线上系统支撑日常运营'],['全链路数据回流沉淀业务资产','关键指标次日即可回看'],['上下游伙伴共享同一入口','覆盖生产到消费的完整闭环']];
  ROWS.forEach(function(y,i){var ix=arcX(R,y),dx=arcX(R2,y),mid=(ix+dx)/2,item=el('g',{'data-layout-role':'satellite','data-repeat-unit':'branch','data-bind-index':i},orbit),titleAttrs={'font-size':20,'font-weight':400,'text-anchor':'end'};if(i===2||i===3){titleAttrs.id=i===2?'w1-focus-data-loop':'w1-focus-ecosystem';titleAttrs['data-w1-focus-capability']='true';}text(sats[i][0],ix-14,y+7,titleAttrs,item);text(sats[i][1],mid,y+5,{'font-size':15,'text-anchor':'middle',fill:INK70},item);el('circle',{cx:dx,cy:y,r:4.2,fill:FUNCTIONAL},item);el('circle',{cx:dx,cy:y,r:9,fill:'none',stroke:INK,'stroke-width':.6,opacity:.35},item);var divider=Math.max(724,dx+28);line(dx+12,y,divider-8,y,{opacity:.34,'stroke-width':.7,'stroke-dasharray':'3 5'},details);el('circle',{cx:divider-8,cy:y,r:2.1,fill:INK,opacity:.6},details);line(divider,y-53,divider,y+39,{opacity:.48,'stroke-width':.8},details);var row=el('g',{'data-layout-role':'detail-row'},details);text(String(i+1).padStart(2,'0'),758,y-28,{'font-family':MONO,'font-size':11,'letter-spacing':1.8,fill:'var(--wp-color-primary)'},row);text(info[i][0],758,y+3,{'font-size':15},row);text(info[i][1],758,y+29,{'font-size':15,fill:INK70},row);});
  document.documentElement.dataset.renderPending='false';stageFit();
  }
  drawW1();
})();
