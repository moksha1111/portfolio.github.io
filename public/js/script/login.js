$("#btnLogin").on('click', function() {
  requestToServerPOST({
    url: "/login",
    email: $('input[name="email"]').val(),
    password: $('input[name="password"]').val(),
  }, function(res) {
    if (res.error == null)
    {
      // todo setup cookie
      Cookies.set('session', res.session);
      location.href = "/";
    }
    else
    {
      alert(res.error);
      console.log("Error:", res.error);
    }
  });
});