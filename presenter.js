document.addEventListener('DOMContentLoaded', initialise);

function initialise() {
  window.addEventListener('resize', setUIpos);
  document.getElementById('toggleCar').addEventListener('click', toggleCarousel);
  setUIpos();
  loadSlide();
}

function setUIpos() {
  document.getElementById('toggleCar').style.fontSize = document.getElementById('toggleCar').offsetHeight*0.7 + 'px';
  document.getElementById('config').style.fontSize = document.getElementById('config').offsetHeight*0.7 + 'px';
  addCSSRules(['.slideCarousel {width:' + document.getElementById('carousel').offsetHeight*0.9 *4/3 + 'px}']);
  var size = fitSlideToParent(document.getElementById('slideContainer'));
  addCSSRules(['.slideMain {width:' + size.width + 'px; height:' + size.height + 'px}']);
}

function loadSlide() {
  var json = getJSON('./doc1.json');
  for (var i = 0; i < json.length; i++) {
    var divMain = createSlideDiv(json[i], 'slideMain');
    divMain.id = i;
    var divCarousel = createSlideDiv(json[i], 'slideCarousel');
    divCarousel.id = i;
    divCarousel.addEventListener('click', switchToSlide);
    document.getElementById('slideContainer').appendChild(divMain);
    document.getElementById('carousel').appendChild(divCarousel);
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
  var allSlide = document.getElementsByClassName('slideMain');
  for (var i = 0; i < allSlide.length; i++) {
    allSlide[i].style.display = (i == this.id) ? 'block' : 'none';
  }
}

function addCSSRules(rules) {
  var styleNew = document.createElement('style');
  document.head.appendChild(styleNew);
  for (var i = 0; i < rules.length; i++) {
    styleNew.sheet.insertRule(rules[i], styleNew.sheet.cssRules.length);
  }
}

function fitSlideToParent(parent) {
  if (parent.offsetHeight*4/3 > parent.offsetWidth) {
    return {
      height: parent.offsetWidth*3/4,
      width: parent.offsetWidth
    }
  } else {
    return {
      height: parent.offsetHeight,
      width: parent.offsetHeight*4/3
    }
  }
}