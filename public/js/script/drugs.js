$(".addToCart").on('click', function() {  
  requestToServerPOST({
    url: "/addToCartOrIncreaseQuantity",
    session: Cookies.get('session'),
    drugId: $(".drugIdDiv").html()
  }, function(res) {
    if (res.error == null)
    {
      // $(".forHiding").css("display", "none");
      // $(".forShowing").css("display", "grid");
      $(".qtyNumber").html(res.result.newQuantity);
      $(".addToCartToggle").toggle();
    }
    else
    {
      alert(res.error);
      location.href="/login"
      console.log("Error:", res.error);
    }
  });
});


$(".qtyIncrease").on('click', function() {  
  requestToServerPOST({
    url: "/addToCartOrIncreaseQuantity",
    session: Cookies.get('session'),
    drugId: $(".drugIdDiv").html()
  }, function(res) {
    if (res.error == null)
    {
      $(".qtyNumber").html(res.result.newQuantity);
      if (!res.result.plusAllowed) {
        $('.qtyIncrease').prop('disabled', true);
      }
    }
    else
    {
      alert(res.error);
      console.log("Error:", res.error);
    }
  });
});


$(".qtyDecrease").on('click', function() {  
  requestToServerPOST({
    url: "/removeFromCartOrDecreaseQuantity",
    session: Cookies.get('session'),
    drugId: $(".drugIdDiv").html()
  }, function(res) {
    if (res.error == null)
    {
      if (res.result.newQuantity < 1) {
        $(".addToCartToggle").toggle();
      } else {
        $(".qtyNumber").html(res.result.newQuantity);
        if (res.result.plusAllowed) {
          $('.qtyIncrease').prop('disabled', false);
        }
      }
    }
    else
    {
      alert(res.error);
      console.log("Error:", res.error);
    }
  });
});
