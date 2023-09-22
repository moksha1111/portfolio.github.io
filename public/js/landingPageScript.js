history.scrollRestoration = 'manual';
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
} else {
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }
}

// toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = function () {
  menuIcon.classList.toggle('bx-x')
  navbar.classList.toggle('active')
}

// scroll sections
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {

  sections.forEach(function (sec) {
    var top = window.scrollY;
    var offset = sec.offsetTop - 100;
    var height = sec.offsetHeight;
    var id = sec.getAttribute('id');

    if (top >= offset && top < offset + height){
      navLinks.forEach(function (links){
        links.classList.remove('active');
        document.querySelector('header nav a[href*=' + id + ']').classList.add('active')
      });
    }
  });

  // sticky header
  var header = document.querySelector('header');

  header.classList.toggle('sticky', window.scrollY > 100)
  
  // remove toggle icon and navbar when click navbar links (scroll)
  
  menuIcon.classList.remove('bx-x')
  navbar.classList.remove('active')

  // animation footer on scroll

}
