document.addEventListener('DOMContentLoaded', initialise);

function initialise() {
  document.getElementById('toggleCar').addEventListener('click', toggleCarousel);
}

function toggleCarousel(e) {
  var control = document.getElementById('control');
  console.log(control.offsetTop+control.offsetHeight , window.innerHeight);
  if (control.style.bottom == '0px') {
    control.style.bottom = '-' + control.offsetHeight*0.9 + 'px';
    this.innerHTML = 'Show slides';
  } else {
    control.style.bottom = '0px';
    this.innerHTML = 'Hide slides';
  }
}