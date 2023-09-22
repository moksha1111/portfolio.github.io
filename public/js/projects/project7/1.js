$(document).ready(function(){
    // color option style
    $(".bi-gear").click(function(){
        $(".color-option").toggle();
    });

    // change color on click
    $(".color-option ul li")
    .eq(0).css("backgroundColor","red").end()
    .eq(1).css("backgroundColor","cyan").end()
    .eq(2).css("backgroundColor","green").end()
    .eq(3).css("backgroundColor","purple");

    $(".color-option ul li").click(function(){
        $("link[href*='theme']").attr("href",$(this).attr("data-value"))
    })
})


let btn = document.querySelector("#mybtn")

window.onscroll = function () {
    if (window.scrollY >= 600){
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
}