$("#formBox").on('submit', function () {

    const formData = $(this).serialize();

    $.ajax({
        url: '/users/password',
        type: 'put',
        data: formData,
        success: function () {
            location.href = "/admin/login.html"
        } 
    })

    // if (!($('#password').val() == $("#confirm").val())) {
    //     alert('您两次输入的密码不一致')
    // }else{

    // }

    return false;
})