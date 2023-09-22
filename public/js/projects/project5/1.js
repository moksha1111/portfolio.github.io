var btns = document.querySelectorAll('.nav-btn');
var videoSlides = document.querySelectorAll('.video-slide');
var homeContents = document.querySelectorAll('.home-content');



var sliderNav = function (manual) {
  btns.forEach((btn) => {
    btn.classList.remove('active');
  })


  videoSlides.forEach((videoSlide) => {
    videoSlide.classList.remove('active');
  })

  homeContents.forEach((homeContent) => {
    homeContent.classList.remove('active');
  })

  btns[manual].classList.add('active');
  videoSlides[manual].classList.add('active');
  homeContents[manual].classList.add('active');
}

btns.forEach((btn, i) => {
  btn.addEventListener('click', () => {
    sliderNav(i);
  })
})