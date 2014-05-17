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
  var styleNew = document.createElement('style');
  document.head.appendChild(styleNew);
  styleNew.sheet.insertRule('.slideCarousel {width:' + document.getElementById('carousel').offsetHeight*0.9 *4/3 + 'px}', styleNew.sheet.cssRules.length);
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