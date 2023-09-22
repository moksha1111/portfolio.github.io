var onOffBtn = document.getElementById('onOffBtn');
var lightOn = document.getElementById('light');

onOffBtn.onclick = function () {
  onOffBtn.classList.toggle('activeBtn');
  lightOn.classList.toggle('lightOn');
}