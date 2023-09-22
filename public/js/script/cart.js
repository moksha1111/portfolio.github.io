$(".qtyIncrease").on('click', function() {  
  var productId =  $($(this).parent().parent().parent().children()[0]).html();
  var productQuantityDiv = $($(this).parent().parent().children()[1]);
  var productPrice = parseFloat($($(this).parent().parent().parent().children()[1]).html());
  var priceOfAmountedProductsDiv = $($(this).parent().parent().parent().children()[5].children[0]);
  var btnForEnableDisableThis = $(this);
  requestToServerPOST({
    url: "/addToCartOrIncreaseQuantity",
    session: Cookies.get('session'),
    drugId: productId
  }, function(res) {
    if (res.error == null)
    {
      productQuantityDiv.html(res.result.newQuantity);
      if (!res.result.plusAllowed) {
        btnForEnableDisableThis.prop('disabled', true);
      }
      recalculateSingleDrugSubtotal(productPrice, parseFloat(productQuantityDiv.html()), priceOfAmountedProductsDiv);
      recalculateSubtotal();
    }
    else
    {
      alert(res.error);
      console.log("Error:", res.error);
    }
  });
});

$(".qtyDecrease").on('click', function() {  
  var productId =  $($(this).parent().parent().parent().children()[0]).html();
  var productQuantityDiv = $($(this).parent().parent().children()[1]);
  var productPrice = parseFloat($($(this).parent().parent().parent().children()[1]).html());
  var priceOfAmountedProductsDiv = $($(this).parent().parent().parent().children()[5].children[0]);
  var btnForEnableDisableThis = $($($(this).parent().parent().children()[2]).children()[0]);
  var rowDiv = $($(this).parent().parent().parent());
  requestToServerPOST({
    url: "/removeFromCartOrDecreaseQuantity",
    session: Cookies.get('session'),
    drugId: productId,
    deleteFromCart: false
  }, function(res) {
    if (res.error == null)
    {
      if (res.result.newQuantity == 0) {
        rowDiv.remove();
        recalculateSingleDrugSubtotal(productPrice, parseFloat(productQuantityDiv.html()), priceOfAmountedProductsDiv);
        recalculateSubtotal();
      } else {
        productQuantityDiv.html(res.result.newQuantity);
        if (res.result.plusAllowed) {
          btnForEnableDisableThis.prop('disabled', false);
        }
        recalculateSingleDrugSubtotal(productPrice, parseFloat(productQuantityDiv.html()), priceOfAmountedProductsDiv);
        recalculateSubtotal();
      }
    }
    else
    {
      alert(res.error);
      console.log("Error:", res.error);
    }
  });
});

$(".deleteFromCart").on('click', function() {
  var rowDiv = $($(this).parent().parent());
  var productId =  $($(this).parent().parent().children()[0]).html();
  requestToServerPOST({
    url: "/removeFromCartOrDecreaseQuantity",
    session: Cookies.get('session'),
    drugId: productId,
    deleteFromCart: true
  }, function(res) {
    if (res.error == null)
    {
      rowDiv.remove();
      recalculateSubtotal();
    }
    else
    {
      alert(res.error);
      console.log("Error:", res.error);
    }
  });
});


function recalculateSingleDrugSubtotal (price, quantity, priceOfAmountedProducts) {
  var total = quantity * price;
  priceOfAmountedProducts.html(total + " EGP");
}


function recalculateSubtotal () {
  var subtotal = 0;
  for (var i = 0; i < $('.priceOfAmountedProducts').length; i++) {
    var price = $($('.priceOfAmountedProducts')[i]).html();
    price = parseFloat(price);
    subtotal += price;
  }
  $("#subTotal").html("Subtotal: " + subtotal + " EGP");
  if (subtotal <= 0) {
    $(".cartSummaryContainer").remove();
  }
}

