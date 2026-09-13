(function () {
  'use strict';
  var svg=document.querySelector('.scene'),NS='http://www.w3.org/2000/svg';
  var INK='var(--ink)',INK70='var(--ink-70)',INK45='var(--ink-45)',PAPER='var(--paper)',FUNCTIONAL='var(--wp-color-functional)',SANS='var(--sans)',MONO='var(--mono)';
  function el(tag,attrs,parent){var n=document.createElementNS(NS,tag);Object.keys(attrs||{}).forEach(function(k){n.setAttribute(k,attrs[k]);});(parent||svg).appendChild(n);return n;}
  function text(v,x,y,attrs,parent){var n=el('text',Object.assign({x:x,y:y,fill:INK,'font-family':SANS,'font-weight':300},attrs||{}),parent);n.textContent=v;return n;}
  function line(x1,y1,x2,y2,attrs,parent){return el('line',Object.assign({x1:x1,y1:y1,x2:x2,y2:y2,stroke:INK,'stroke-width':1},attrs||{}),parent);}
  function band(y,version,kpi,id,parent){
    text('VERSION '+version+' / PORTAL',90,y,{'font-family':MONO,'font-size':11,'letter-spacing':2.5,fill:INK45},parent);
    text(version+' 版本',90,y+34,{'font-size':22},parent);
    line(90,y+48,232,y+48,{opacity:.42,'stroke-width':.8},parent);
    text(kpi,520,y+38,{id:id,'font-size':54,'font-weight':400,'text-anchor':'middle'},parent);
    text('PORTAL 页面曝光 UV',990,y+10,{'font-family':MONO,'font-size':12,'letter-spacing':1.6,'text-anchor':'end',fill:INK70},parent);
    text('同期 6/16-6/21',990,y+36,{'font-size':13,'text-anchor':'end',fill:INK45},parent);
  }
  function matrix(y,titleEn,titleCn,headers,rows,parent){
    text(titleEn,90,y,{'font-family':MONO,'font-size':10.5,'letter-spacing':2.4,fill:INK45},parent);
    text(titleCn,250,y,{'font-size':18},parent);
    line(90,y+18,990,y+18,{opacity:.34,'stroke-width':.75},parent);
    var labelW=190,colW=(900-labelW)/headers.length;
    headers.forEach(function(v,i){text(v,90+labelW+colW*(i+.5),y+50,{'font-size':14,'text-anchor':'middle',fill:INK45},parent);});
    rows.forEach(function(row,r){var yy=y+92+r*48;el('rect',{x:92,y:yy-13,width:12,height:12,fill:row[0]==='1.6 版本'?INK:'none',stroke:INK,'stroke-width':1},parent);text(row[0],118,yy,{'font-size':14,fill:row[0]==='1.6 版本'?INK:INK70},parent);row[1].forEach(function(v,i){text(v,90+labelW+colW*(i+.5),yy,{'font-family':MONO,'font-size':18,'text-anchor':'middle'},parent);});line(90,yy+17,990,yy+17,{opacity:.12,'stroke-width':.5},parent);});
  }
  function bars(y,titleEn,titleCn,categories,current,previous,max,parent){
    text(titleEn,90,y,{'font-family':MONO,'font-size':10.5,'letter-spacing':2.4,fill:INK45},parent);text(titleCn,250,y,{'font-size':18},parent);
    el('rect',{x:760,y:y-12,width:12,height:12,fill:INK},parent);text('1.6',780,y-1,{'font-family':MONO,'font-size':11,fill:INK70},parent);el('rect',{x:840,y:y-12,width:12,height:12,fill:'none',stroke:INK,'stroke-width':1},parent);text('1.5',860,y-1,{'font-family':MONO,'font-size':11,fill:INK70},parent);
    var left=120,right=960,top=y+35,bottom=y+160,step=(right-left)/categories.length;line(left,bottom,right,bottom,{opacity:.42,'stroke-width':.8},parent);
    categories.forEach(function(label,i){var cx=left+step*(i+.5),bw=Math.min(23,step*.22),ha=(bottom-top)*current[i]/max,hb=(bottom-top)*previous[i]/max;el('rect',{x:cx-bw-2,y:bottom-ha,width:bw,height:ha,fill:INK,opacity:.82},parent);el('rect',{x:cx+2,y:bottom-hb,width:bw,height:hb,fill:'none',stroke:INK,'stroke-width':1},parent);text(label,cx,bottom+24,{'font-size':12.5,'text-anchor':'middle',fill:INK70},parent);});
  }
  function drawU1(){
  var top=el('g',{'data-layout-zone':'u1.version-1-6','data-slot-id':'band-a'});band(184,'1.6','651w','u1-kpi-a',top);matrix(286,'GENDER','性别构成',['男性','女性'],[['1.5 版本',['54%','46%']],['1.6 版本',['52%','48%']]],top);matrix(474,'AGE BANDS','年龄比例',['18岁以下','19-30岁','30岁+'],[['1.5 版本',['23%','49%','28%']],['1.6 版本',['22%','48%','30%']]],top);
  el('circle',{cx:540,cy:681,r:31,fill:FUNCTIONAL});text('VS',540,688,{'data-xp-anchor':'vs','font-family':MONO,'font-size':17,'font-weight':500,'text-anchor':'middle','letter-spacing':2,fill:'var(--paper)'});
  var bottom=el('g',{'data-layout-zone':'u1.version-1-5','data-slot-id':'band-b'});bars(728,'EDUCATION','学历分布',['博士','硕士','本科','高中','初中','小学','大专'],[0,1,31,18,25,17,7],[0,1,30,19,26,17,7],34,bottom);bars(936,'CITY TIER','城市分布',['一线','二线','三线','四线','五线','新一线'],[6,20,21,18,12,23],[6,20,21,18,13,23],25,bottom);band(1180,'1.5','596w','u1-kpi-b',bottom);
  document.documentElement.dataset.renderPending='false';stageFit();
  }
  drawU1();
})();
