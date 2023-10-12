// $(document).ready(function(){
//     // color option style
//     $(".bi-gear").click(function(){
//         $(".color-option").toggle();
//     });

//     // change color on click
//     $(".color-option ul li")
//     .eq(0).css("backgroundColor","red").end()
//     .eq(1).css("backgroundColor","cyan").end()
//     .eq(2).css("backgroundColor","green").end()
//     .eq(3).css("backgroundColor","purple");

//     $(".color-option ul li").click(function(){
//         $("link[href*='theme']").attr("href",$(this).attr("data-value"))
//     })
// });

// window.onload = function() {document.body.scrollTop = document.documentElement.scrollTop = 0;};

history.scrollRestoration = 'manual';
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
} else {
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }
}


// FOR BUTTON TO MOVE TOP

let btn = document.querySelector("#mybtn");

window.onscroll = function () {
  if (window.scrollY >= 400){
    btn.style.display = "block"
  }
  else {
    btn.style.display = "none"
  }
}

btn.onclick = function (){
  window.scrollTo({
    left: 0,
    top:0 ,
    behavior: "smooth"
  })
};

// FOR MAKING DIV APPEAR AFTER CERTAIN HEIGTH OF THE PAGE

var containers = document.querySelectorAll(".box");

window.addEventListener('scroll', checkContainer);
checkContainer();
function checkContainer() {
  var triggerBottom = window.innerHeight * 0.7;
  containers.forEach(container => {
  var containerTop = container.getBoundingClientRect().top;
    if (containerTop < triggerBottom) {
      container.classList.add('show')
    } else {
      container.classList.remove('show')
    }
  })
}

// SERVER POST REQUEST

function requestToServerPOST(params, callback) {
  $.ajax({
    url: params.url,
    method: 'POST',
    data: params,
      success: function (result) {
        callback(result);
      },
      error: function (err) {
        console.log('Error during request to server:', err);
      }
    }
  );
}

$("#btnLogout").on('click', function() {
  requestToServerPOST({
    url: "/logout",
    session: Cookies.get('session')
  }, function(res) {
    if (res.error == null)
    {
      Cookies.remove('session');
      location.href = "/";
    }
    else
    {
      alert(res.error);
      console.log("Error:", res.error);
    }
  });
});

var navLinks = document.querySelectorAll(".nav-link");

var dropdown = document.querySelectorAll(".dropdown-content");
var windowPathname = window.location.pathname;

navLinks.forEach(navLink => {
  var navLinkPathname = new URL(navLink.href).pathname
  if (windowPathname === navLinkPathname){
    navLink.classList.add('activeLink');
  }
});

// var accInformation = document.querySelectorAll(".accInfo"); 
// accInformation.forEach(accInfo => {
//   var navLinkPathname = new URL(accInfo.href).pathname
//   if (windowPathname === navLinkPathname){
//     accInfo.classList.add('accountStyle');
//   }
// });

// navLinks.forEach(navLink => {
//   if (navLink.href.includes(`${windowPathname}`)) {
//     navLink.classList.add('activeLink');
//   }
// })

var dropownMenuArrow = document.getElementById("btnAccount"); 
// var testPsuedo = window.getComputedStyle(dropownMenuArrow, "::before");
// console.log(testPsuedo.color);
var headerColor = document.getElementById("header"); 
navLinks.forEach(navLink => {
  if (windowPathname != "/drugs" && windowPathname != "/about"){
    // navLink.classList.add('forBlackLinksOfOtherPages');
    // dropownMenuArrow.style.setProperty('--beforeBack', 'black');
    headerColor.setAttribute('style', 
    'background-image: url("/images/medicine-capsules-global-health-with-geometric-pattern-digital-remix.jpg");' + 
    'background-repeat: no-repeat;' +
    'background-size: cover;' +
    'background-position: center');
    // headerColor.setAttribute('style', 'background-color: #cbcbcb !important') // in this method i can use !important feature
    // testBtn.style.backgroundColor = "green"; // does not work because it should contain !important feature which is done by previous method
  }
});


// toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbarMenuMobile = document.querySelector('.navbarMenuMobile');

menuIcon.onclick = function () {
  menuIcon.classList.toggle('bx-x')
  navbarMenuMobile.classList.toggle('active')
}