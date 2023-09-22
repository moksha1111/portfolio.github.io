history.scrollRestoration = 'manual';
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
} else {
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }
}

function imgSlider(anything) {
  document.querySelector('.starbucks').src = anything;
}

function changeCircleColor(color) {
  var circle = document.querySelector('.circle');
  circle.style.background = color
}