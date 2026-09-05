(function () {
  'use strict';

  var NS = 'http://www.w3.org/2000/svg';
  var FUNCTIONAL = 'var(--wp-color-functional)';

  function el(tag, attrs, parent) {
    var node = document.createElementNS(NS, tag);
    Object.keys(attrs || {}).forEach(function (key) { node.setAttribute(key, attrs[key]); });
    parent.appendChild(node);
    return node;
  }

  function svgCoordinates(rect, svg) {
    var matrix = svg.getScreenCTM();
    if (!matrix) return null;
    var inverse = matrix.inverse();
    var topLeft = new DOMPoint(rect.left, rect.top).matrixTransform(inverse);
    var bottomRight = new DOMPoint(rect.right, rect.bottom).matrixTransform(inverse);
    return {
      left: topLeft.x,
      top: topLeft.y,
      width: bottomRight.x - topLeft.x,
      height: bottomRight.y - topLeft.y
    };
  }

  function drawAnnotation() {
    var group = document.getElementById('a1-annotation');
    var wrong = document.getElementById('wrong');
    var answer = document.getElementById('a1-answer-start');
    var stage = document.querySelector('.stage');
    var scene = group && group.ownerSVGElement;
    if (!group || !wrong || !answer || !stage || !scene) return;

    var stageRect = stage.getBoundingClientRect();
    var wrongRect = wrong.getBoundingClientRect();
    var answerRect = answer.getBoundingClientRect();
    if (!Number.isFinite(stageRect.width) || stageRect.width <= 0 ||
        !Number.isFinite(wrongRect.width) || wrongRect.width <= 0 ||
        !Number.isFinite(answerRect.width) || answerRect.width <= 0) return false;

    group.replaceChildren();
    var wrongBox = svgCoordinates(wrongRect, scene);
    var answerBox = svgCoordinates(answerRect, scene);
    if (!wrongBox || !answerBox) return false;
    var centerX = wrongBox.left + wrongBox.width / 2;
    var centerY = wrongBox.top + wrongBox.height / 2;
    var targetX = answerBox.left + answerBox.width / 2;
    var targetY = answerBox.top - 8;

    el('ellipse', {
      id: 'a1-ring', cx: centerX, cy: centerY,
      rx: wrongBox.width * .82, ry: wrongBox.height * .95,
      fill: 'none', stroke: FUNCTIONAL, 'stroke-width': 2.2,
      transform: 'rotate(-5 ' + centerX + ' ' + centerY + ')',
      'data-content-ref': 'sample.a1.a1-focus',
      'data-emphasis-role': 'outline'
    }, group);
    el('ellipse', {
      cx: centerX + 3, cy: centerY + 2,
      rx: wrongBox.width * .9, ry: wrongBox.height * 1.03,
      fill: 'none', stroke: FUNCTIONAL, 'stroke-width': 1,
      opacity: .42,
      transform: 'rotate(7 ' + centerX + ' ' + centerY + ')'
    }, group);
    el('path', {
      d: 'M ' + (centerX + 8) + ' ' + (centerY + 34) +
        ' C ' + (centerX + 44) + ' ' + (centerY + 150) +
        ' ' + (targetX - 86) + ' ' + (targetY - 92) +
        ' ' + targetX + ' ' + targetY,
      fill: 'none', stroke: FUNCTIONAL, 'stroke-width': 1.6,
      'stroke-linecap': 'round', 'marker-end': 'url(#a1-note-arrow)',
      'data-layout-zone': 'a1.annotation-link'
    }, group);
    return true;
  }

  function bindFocus() {
    var wrong = document.getElementById('wrong');
    var ring = document.getElementById('a1-ring');
    if (wrong) {
      wrong.dataset.contentRef = 'sample.a1.a1-focus';
      wrong.dataset.emphasisRole = 'value';
    }
    if (ring) {
      ring.dataset.contentRef = 'sample.a1.a1-focus';
      ring.dataset.emphasisRole = 'outline';
    }
    if (window.WisePPTStageFit && window.WisePPTStageFit.bindSpecimenEmphasis) {
      window.WisePPTStageFit.bindSpecimenEmphasis(document.documentElement);
    }
  }

  function redrawWhenVisible(attempt) {
    if (drawAnnotation()) {
      bindFocus();
      return true;
    }
    if (attempt < 8) {
      window.requestAnimationFrame(function () { redrawWhenVisible(attempt + 1); });
    }
    return false;
  }

  function renderA1() {
    redrawWhenVisible(0);
    document.documentElement.dataset.renderPending = 'false';
    stageFit();
  }

  renderA1();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () {
      redrawWhenVisible(0);
    });
  }
  window.addEventListener('resize', function () { redrawWhenVisible(0); });
  if (window.WisePPTStageFit && window.WisePPTStageFit.registerGalleryStateRenderer) {
    window.WisePPTStageFit.registerGalleryStateRenderer(function () {
      redrawWhenVisible(0);
    });
  }
})();
