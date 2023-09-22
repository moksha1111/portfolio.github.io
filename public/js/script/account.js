$("#btnChangePassword").on('click', function() { 
  requestToServerPOST({
    url: "/account",
    session: Cookies.get('session'),
    oldpassword: $('input[name="oldpassword"]').val(),
    newpassword: $('input[name="newpassword"]').val(),
    cnewpassword: $('input[name="cnewpassword"]').val()
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