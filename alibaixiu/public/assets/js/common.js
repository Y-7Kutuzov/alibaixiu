$('#anniu').on('click', function () {
  var isConfirm = confirm('您真的要退出吗')

  if (isConfirm) {
    $.ajax({
      url: '/logout',
      type: 'post',
      success: function () {
        location.href = 'login.html'
      },
      error: function () {
        alert('退出失败')
      }
    })
  }

})

$.ajax({
  url: '/users/' + userId,
  type: 'get',
  success: function (response) {
    console.log(response)
    $(".avatar").attr('src', response.avatar)
    $(".profile .name").html(response.nickName)
  }
})