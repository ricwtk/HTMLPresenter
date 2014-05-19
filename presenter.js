document.addEventListener('DOMContentLoaded', initialise);

var uiStyle = document.createElement('style');
document.head.appendChild(uiStyle);

function initialise() {
  createConfig();
  document.getElementById('config').addEventListener('click', showConfig);
  window.addEventListener('resize', function(){setUIpos();});
  document.getElementById('toggleCar').addEventListener('click', toggleCarousel);
  document.getElementById('prev').addEventListener('click', function(e) {goToSlide(-1);});
  document.getElementById('next').addEventListener('click', function(e) {goToSlide(+1);});
  loadSlide();
  setUIpos();
}

function setUIpos() {
  document.getElementById('toggleCar').style.fontSize = document.getElementById('toggleCar').offsetHeight*0.7 + 'px';
  document.getElementById('config').style.fontSize = document.getElementById('config').offsetHeight*0.7 + 'px';
  var slideCarouselScale = (document.getElementsByClassName('slideCarouselHolder')[0].offsetHeight / 768);
  var slideCarouselWidth = 1024 * slideCarouselScale;
  var size = fitSlideToParent(document.getElementById('slideContainer'));
  addCSSRules(uiStyle, ['.slideCarouselHolder {\
                  width:' + slideCarouselWidth + 'px;\
                }',
                '.slideCarousel {\
                  transform: scale(' + slideCarouselScale + ');\
                  -webkit-transform: scale(' + slideCarouselScale + ');\
                }',
                '.slideMainHolder {\
                  width:' + size.width + 'px; \
                  height:' + size.height + 'px; \
                  top:' + size.top + 'px; \
                  left:' + size.left + 'px \
                }',
                '.slideMain {\
                  transform: scale('+ size.scale + '); \
                  -webkit-transform: scale('+ size.scale + '); \
                }']);
  setConfigUI();
}

function loadSlide() {
  var json = getJSON('./doc1.json');
  for (var i = 0; i < json.length; i++) {
    var divMain = createSlideDiv(json[i], 'slideMain');
    divMain.id = i;
    divMain.style.display = (i == 0) ? 'block' : 'none';
    var divCarousel = createSlideDiv(json[i], 'slideCarousel');
    var divCarouselCover = document.createElement('div');
    divCarouselCover.style.position = 'absolute';
    divCarouselCover.style.width = '100%';
    divCarouselCover.style.height = '100%';
    divCarouselCover.style.left = '0';
    divCarouselCover.style.top = '0';
    divCarouselCover.style.background = 'rgba(255,255,255,0)';
    divCarousel.appendChild(divCarouselCover);
    divCarousel.style.boxShadow = (i == 0) ? slideShadow(1) : slideShadow(0);
    divCarousel.id = i;
    divCarousel.addEventListener('click', switchToSlide);
    document.getElementById('slideContainer').appendChild(divMain);
    document.getElementById('carousel').appendChild(divCarousel);
  }
}

function goToSlide(inc) {
  var allSlide = document.getElementsByClassName('slideMain');
  for (var i = 0; i < allSlide.length; i++) {
    if (allSlide[i].style.display !== 'none') {
      allSlide[i].style.display = 'none';
      var slideNow = Math.min(allSlide.length-1, Math.max(0, i+inc));
      allSlide[slideNow].style.display = 'block';
      scrollToSlide(slideNow);
      break;
    }
  }
}

function toggleCarousel(e) {
  var control = document.getElementById('control');
  if (control.style.bottom == '0px') {
    control.style.bottom = '-27%';
    this.innerHTML = 'Show slides';
  } else {
    control.style.bottom = '0px';
    this.innerHTML = 'Hide slides';
  }
}

function switchToSlide(e) {
  var allSlide = document.getElementsByClassName('slideMainHolder');
  for (var i = 0; i < allSlide.length; i++) {
    allSlide[i].style.display = (i == this.id) ? 'block' : 'none';
  }
  scrollToSlide(this.id);
}

function addCSSRules(CSS, rules) {
  removeAllRules(CSS);
  for (var i = 0; i < rules.length; i++) {
    console.log(CSS.sheet.cssRules.length);
    CSS.sheet.insertRule(rules[i], CSS.sheet.cssRules.length);
  }
}

function removeAllRules(CSS) {
  for (var i = 0; i < CSS.sheet.cssRules.length; i++) {
    CSS.sheet.deleteRule(i);
  }
}

function fitSlideToParent(parent) {
  if (parent.offsetHeight*4/3 > parent.offsetWidth) {
    return {
      height: parent.offsetWidth*3/4,
      width: parent.offsetWidth,
      top: 0.5*(parent.offsetHeight - parent.offsetWidth*3/4),
      left: 0,
      scale: parent.offsetWidth/1024
    }
  } else {
    return {
      height: parent.offsetHeight,
      width: parent.offsetHeight*4/3,
      top: 0,
      left: 0.5*(parent.offsetWidth - parent.offsetHeight*4/3),
      scale: parent.offsetHeight/768
    }
  }
}

function scrollToSlide(id) {
  var carousel = document.getElementById('carousel');
  var allSlideCarousel = document.getElementsByClassName('slideCarouselHolder');
  var slideMargin = parseFloat(window.getComputedStyle(allSlideCarousel[id]).marginLeft);
  carousel.scrollLeft = allSlideCarousel[id].offsetLeft - slideMargin;
  for (var i = 0; i < allSlideCarousel.length; i++) {
    allSlideCarousel[i].style.boxShadow = (i == id) ? slideShadow(1) : slideShadow(0);
  }
}