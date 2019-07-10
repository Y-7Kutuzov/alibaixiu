$("#userForm").on('submit', function () {
    const formData = $(this).serialize();

    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function (data) {
            // 刷新页面
            location.reload();
        },
        error: function () {
            alert('添加用户失败')
        }
    })
    return false;
})


$('#modifyBox').on('change', "#avatar", function () {
    // 创建formdata表单对象 进行二进制文件上传

    const formData = new FormData();

    formData.append('avatar', this.files[0])

    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 告诉$.ajax方法不要解析请求参数
        processData: false,
        // 告诉$.ajax方法不要设置请求参数的类型
        contentType: false,
        success: function (data) {
            $('#preview').attr('src', data[0].avatar)
            $('#hiddenAvatar').val(data[0].avatar)

        }
    })
})
// 渲染页面
$.ajax({
    url: '/users',
    type: 'get',
    success: function (response) {
        var html = template('userTpl', { data: response });
        $('#userBox').html(html)
    }
})

// 编辑用户
$('#userBox').on('click', '.edit', function () {
    var id = $(this).attr('data-id')
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function (response) {
            console.log(response)
            var html = template('modifyTpl', response)
            $('#modifyBox').html(html)
        }
    })
})

// 编辑页面修改用户
$("#modifyBox").on('submit', '#modifyForm', function () {

    const formData = $(this).serialize()];
    console.log(formData)
    var id = $(this).attr('data-id')
    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: formData,
        success: function (response) {
            location.reload();
        }
    })
    return false;
})

// 删除用户
$("#userBox").on('click', '.delete', function () {
    var isConfirm = confirm('您确定要删除这个用户吗')
    var id = $(this).attr('data-id')
    console.log(id)
    if (isConfirm) {
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function (response) {
                location.reload()
            }
        })

    }
})


// 全选按钮
var selectAll = $("#selectAll")
// 批量删除按钮
var deleteMany = $('#deleteMany')
selectAll.on('change', function () {
    var status = $(this).prop('checked')
    if (status) {
        deleteMany.show()
    } else {
        deleteMany.hide()
    }
    // 获取到所有用户
    $('#userBox').find('input').prop('checked', status)
    var nihao = $('#userBox').find('input').prop('checked')
})

$("#userBox").on('change', '.userStatus', function () {
    var inputs = $('#userBox').find('input')

    if (inputs.length == inputs.filter(':checked').length) {
        $("#selectAll").prop('checked', true)
    } else {
        $("#selectAll").prop('checked', false)
    }

    if (inputs.filter(':checked').length > 0) {
        deleteMany.show()
    } else {
        deleteMany.hide()
    }
})

deleteMany.on('click', function () {
    var ids = [];
    // 选中的用户
    var checkedUser = $('#userBox').find('input').filter(':checked')

    checkedUser.each(function (index, element) {
        ids.push($(element).attr('data-id'))
    });

    if (confirm('您真的要删除这些用户吗')) {
        $.ajax({
            type: 'delete',
            url: '/users/' + ids.join('-'),
            success: function (response) {
                location.reload()
            }
        })
    }
});
