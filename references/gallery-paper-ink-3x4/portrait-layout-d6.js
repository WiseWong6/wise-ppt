(function () {
  'use strict';
  var p = window.PortraitNonRelation;

  var QR_PAYLOAD = 'http://weixin.qq.com/r/mp/sDgNFUrEMRdOrQ52922i';
  var QR_DATA = [
    '1111111010010100111110000000001111111',
    '1000001001100110110101011011001000001',
    '1011101000101010011001110000001011101',
    '1011101001001100100110110011101011101',
    '1011101010100101110011011100101011101',
    '1000001010001111001110000111101000001',
    '1111111010101010101010101010101111111',
    '0000000001111001111011100100100000000',
    '0111111101100100100011100010100110001',
    '1100010101110110010111010001001111101',
    '0100101000010100011000000111101010011',
    '1010110110001010111001010011001111000',
    '1101001101101110011000011111001001010',
    '0110110100111100111101110100110101110',
    '0001111010011101101101001111010011011',
    '1000010010111000010111101010010000011',
    '1000011111111110100101010111111010101',
    '0001010101010101010110101100100101000',
    '0000001101101001001000100111111110011',
    '0011100100100010010011001010111001000',
    '1001101010100100110010000110011111110',
    '0011000010111010111111011010001100000',
    '1101101101001011100111100001101001111',
    '0010010000000100100011001010111100000',
    '0001111000110011011100101000001100001',
    '1000100100010010110000011011111000101',
    '1011111011010111010101001010000101111',
    '1001010111011101011011101010100000110',
    '1100101101010000010100000110111111011',
    '0000000010101100010000110100100010010',
    '1111111011110000100000100011101011011',
    '1000001011010011111000001010100010000',
    '1011101011010111011011111111111110110',
    '1011101011110000101001000010001110100',
    '1011101010100011100010011100100101101',
    '1000001010000100100001010001110100001',
    '1111111001101010101010010011011101111'
  ];

  function drawMap() {
    var map = p.group({'data-layout-zone': 'd6.map', 'data-layout-part': 'contact-map'});
    p.rect(90, 244, 900, 414, {'data-xp-anchor': 'photo',
      fill: 'none', stroke: 'var(--ink-25)', 'stroke-width': .8, 'stroke-dasharray': '3 7'
    }, map);
    [[90,244],[990,244],[90,658],[990,658]].forEach(function (point) {
      p.cross(point[0], point[1], 9, .42, map);
    });

    p.path('M 733 244 C 803 343, 733 441, 850 520 C 909 559, 943 618, 932 658', {
      fill: 'none', stroke: 'var(--ink-45)', 'stroke-width': .9
    }, map);
    p.path('M 763 244 C 833 343, 763 441, 881 520 C 939 559, 973 618, 961 658', {
      fill: 'none', stroke: 'var(--ink-45)', 'stroke-width': .9
    }, map);
    p.label('ABSTRACT TRACE', 610, 410, {'font-size': 10, 'letter-spacing': 1.5}, map);

    p.path('M 90 333 C 335 319, 662 347, 990 329', {
      fill: 'none', stroke: 'var(--ink-80)', 'stroke-width': 1.2
    }, map);
    p.path('M 90 473 C 382 465, 686 481, 990 469', {
      fill: 'none', stroke: 'var(--ink-70)', 'stroke-width': .7
    }, map);
    p.path('M 90 589 C 359 599, 686 581, 990 593', {
      fill: 'none', stroke: 'var(--ink-70)', 'stroke-width': .7
    }, map);
    p.path('M 300 244 C 293 382, 307 520, 298 658', {
      fill: 'none', stroke: 'var(--ink-70)', 'stroke-width': .7
    }, map);
    p.path('M 569 244 C 576 362, 562 540, 571 658', {
      fill: 'none', stroke: 'var(--ink-80)', 'stroke-width': 1.2
    }, map);

    p.label('CONTACT GRID', 144, 313, {'font-size': 12, 'letter-spacing': 1.8}, map);
    p.label('LINK PATH', 612, 278, {'font-size': 11, 'letter-spacing': 1.6}, map);

    var campus = p.group({'data-layout-part': 'contact-campus'}, map);
    p.rect(359, 368, 175, 91, {
      fill: 'var(--paper-panel)', stroke: 'var(--ink)', 'stroke-width': .9
    }, campus);
    p.rect(365, 374, 163, 79, {
      fill: 'none', stroke: 'var(--ink-25)', 'stroke-width': .6
    }, campus);
    p.label('WISE', 447, 414, {
      'font-size': 13, 'letter-spacing': 2.8, 'text-anchor': 'middle', fill: 'var(--ink-70)'
    }, campus);
    p.label('CONTACT', 447, 437, {
      'font-size': 13, 'letter-spacing': 2.8, 'text-anchor': 'middle', fill: 'var(--ink-70)'
    }, campus);

    p.circle(569, 473, 12, {fill: 'none', stroke: 'var(--ink)', 'stroke-width': 1.2}, map);
    p.circle(569, 473, 17, {fill: 'none', stroke: 'var(--ink-45)', 'stroke-width': .6}, map);
    p.circle(569, 473, 4, {fill: 'var(--ink)'}, map);
    p.path('M 569 490 L 569 523 L 611 523', {
      fill: 'none', stroke: 'var(--ink-45)', 'stroke-width': .8
    }, map);
    p.label('WISE · SHENZHEN', 623, 528, {
      'font-size': 13, 'letter-spacing': 1.8, fill: 'var(--ink-70)'
    }, map);

    p.line(125, 634, 242, 634, {stroke: 'var(--ink-70)', 'stroke-width': 1}, map);
    p.line(125, 628, 125, 640, {stroke: 'var(--ink-70)', 'stroke-width': 1}, map);
    p.line(242, 628, 242, 640, {stroke: 'var(--ink-70)', 'stroke-width': 1}, map);
    p.label('NOT TO SCALE', 322, 638, {'font-size': 11, 'letter-spacing': 1.8}, map);
  }

  function drawQr(parent, x, y, cell, pad) {
    var qr = p.group({
      'data-layout-part': 'wechat-qr',
      'data-qr-payload': QR_PAYLOAD,
      'shape-rendering': 'crispEdges'
    }, parent);
    p.rect(x - pad, y - pad, QR_DATA.length * cell + pad * 2, QR_DATA.length * cell + pad * 2, {
      fill: 'var(--paper-panel)', stroke: 'var(--ink-70)', 'stroke-width': .8
    }, qr);
    QR_DATA.forEach(function (row, rowIndex) {
      for (var columnIndex = 0; columnIndex < row.length; columnIndex += 1) {
        if (row[columnIndex] !== '1') continue;
        p.rect(x + columnIndex * cell, y + rowIndex * cell, cell, cell, {fill: 'var(--ink)'}, qr);
      }
    });
  }

  function drawCard() {
    var card = p.doublePanel(90, 714, 900, 454, {
      'data-layout-zone': 'd6.card', 'data-layout-part': 'contact-card'
    });
    p.label('WISE — CONTACT', 132, 768, {'font-size': 17}, card);
    p.text('歪斯 Wise', 132, 842, {'font-size': 46, 'font-weight': 400}, card);
    p.label('@歪斯WISE', 134, 882, {'font-size': 16, fill: 'var(--ink-70)'}, card);
    p.line(132, 918, 948, 918, {stroke: 'var(--ink-25)', 'stroke-width': .8}, card);

    var rows = [
      ['小红书', '@歪斯Wise'],
      ['微信搜一搜', '歪斯Wise'],
      ['WEB', 'wisewong.com'],
      ['ADDR', 'SHENZHEN']
    ];
    rows.forEach(function (row, index) {
      var y = 962 + index * 42;
      p.label(row[0], 132, y, Object.assign({'font-size': 13}, index === 0 ? {
        'data-d6-primary-contact': 'true'
      } : {}), card);
      p.text(row[1], 304, y, {
        'font-family': 'var(--mono)', 'font-size': 17, 'letter-spacing': .8, fill: 'var(--ink)',
        'data-d6-primary-contact': index === 0 ? 'true' : 'false'
      }, card);
      if (index < rows.length - 1) {
        p.line(132, y + 18, 724, y + 18, {stroke: 'var(--ink-25)', 'stroke-width': .6}, card);
      }
    });

    drawQr(card, 780, 946, 4, 16);
    p.text('扫码或微信搜一搜“歪斯Wise”', 132, 1134, {
      'font-size': 15, fill: 'var(--ink-70)'
    }, card);
    p.label('WECHAT SEARCH · 歪斯WISE', 132, 1158, {
      'font-size': 11, 'letter-spacing': 1.8
    }, card);
  }

  function drawD6() {
    p.label('CONTACT / SHENZHEN', 90, 206, {fill: 'var(--ink-70)'});
    drawMap();
    drawCard();
  }

  drawD6();
  p.finish();
})();
