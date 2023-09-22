$("#btnRegister").on('click', function() {
  requestToServerPOST({
    url: "/signup",
    firstname: $('input[name="firstname"]').val(),
    email: $('input[name="email"]').val(),
    password: $('input[name="password"]').val(),
    confirmpassword: $('input[name="confirmpassword"]').val()
  }, function(res) {
    if (res.error == null)
    {
      location.href = "/";
    }
    else
    {
      alert(res.error);
      console.log("Error:", res.error);
    }
  });
});
