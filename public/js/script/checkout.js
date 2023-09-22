$("#btnCheckout").on('click', function() {
  requestToServerPOST({
    url: "/checkout",
    fullName: $('input[name="fullname"]').val(),
    phoneNumber: $('input[name="phonenumber"]').val(),
    streetAddress: $('input[name="streetaddress"]').val(),
    buildingOrFloor: $('input[name="buildingfloor"]').val(),
    paymentMethod: $('input[name="fav_language"]').val(),
    comment: $('textarea[name="comment"]').val()
  }, function(res) {
    if (res.error == null || res.error == undefined)
    {
      location.href = "/";
    }
    else
    {
      alert(res.error);
      console.log("Error:", res);
    }
  });
});
