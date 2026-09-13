(function () {
  'use strict';
  var p = window.PortraitNonRelation;
  function drawD11() {
  var wall = p.group({'data-layout-zone':'d11.poster-wall','data-fixed-quantity':'10'});
  var cards = [
    [100,180,280,280,-4],[400,170,280,300,4],[700,190,280,280,-3],
    [100,480,210,300,5],[325,470,210,300,-5],[550,480,210,300,4],[775,470,205,300,-4],
    [100,800,280,320,-4],[400,810,280,310,5],[700,800,280,320,-4]
  ];
  cards.forEach(function (c,index) {
    var g=p.group({transform:'rotate('+c[4]+' '+(c[0]+c[2]/2)+' '+(c[1]+c[3]/2)+')','data-repeat-unit':'poster-plate','data-bind-index':index},wall);
    p.rect(c[0],c[1],c[2],c[3],{rx:10,fill:'var(--paper-panel)',stroke:'var(--ink-80)','stroke-width':1.1,opacity:.62},g);
    p.rect(c[0]+8,c[1]+8,c[2]-16,c[3]-16,{rx:7,fill:'none',stroke:'var(--ink-45)','stroke-width':.55,opacity:.5},g);
    var cx=c[0]+c[2]/2,cy=c[1]+c[3]/2-12;
    if(index%3===0){
      p.circle(cx,cy-28,30,{fill:'none',stroke:'var(--ink)','stroke-width':1,opacity:.55},g);
      p.path('M '+(cx-46)+' '+(cy+62)+' Q '+cx+' '+(cy+8)+' '+(cx+46)+' '+(cy+62),{fill:'none',stroke:'var(--ink)','stroke-width':1,opacity:.52},g);
    }else if(index%3===1){
      p.rect(cx-64,cy-38,128,78,{rx:5,fill:'none',stroke:'var(--ink)','stroke-width':1,opacity:.55},g);
      p.line(cx-44,cy-16,cx+44,cy-16,{stroke:'var(--ink)',opacity:.42},g);
      p.line(cx,cy+40,cx,cy+76,{stroke:'var(--ink)',opacity:.45},g);
    }else{
      p.rect(cx-58,cy-20,76,58,{rx:4,fill:'none',stroke:'var(--ink)','stroke-width':1,opacity:.52},g);
      p.circle(cx+48,cy-30,14,{fill:'none',stroke:'var(--ink)',opacity:.48},g);
      p.path('M '+(cx-36)+' '+(cy+60)+' L '+(cx+6)+' '+(cy+60)+' L '+(cx+44)+' '+(cy+84),{fill:'none',stroke:'var(--ink)',opacity:.46},g);
    }
    if(index!==4)p.label('PLATE '+String(index+1).padStart(2,'0'),c[0]+18,c[1]+c[3]-18,{'font-size':11,opacity:.42},g);
  });
  p.rect(90,160,900,980,{fill:'var(--paper)',opacity:.72,'data-path-mask':'1'},wall);
  p.rect(90,360,650,600,{fill:'var(--paper)',opacity:.32},wall);
  var title=p.group({'data-layout-zone':'d11.title'});
  p.label('PRODUCT REVIEW — 2026 SUMMER',110,542,{fill:'var(--ink-70)'},title);
  p.text('版本复盘与增长验证',110,670,{'data-xp-anchor':'title','font-family':'var(--serif)','font-size':70,'font-weight':500,'letter-spacing':3},title);
  p.line(110,724,690,724,{'data-xp-anchor':'title-rule',stroke:'var(--ink)','stroke-width':2.2},title);
  p.label('2026 · 06 · 24',110,790,{'font-size':17,fill:'var(--ink-70)'},title);
  p.finish();
  }
  drawD11();
})();
