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
}

function loadSlide() {
  var json = getJSON('./doc1.json');
  for (var i = 0; i < json.length; i++) {
    createSlideDiv(json[i], 'slideMain');
    document.getElementById('carousel').appendChild(createSlideDiv(json[i], 'slideCarousel'));
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