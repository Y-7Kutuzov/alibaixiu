// 查询分类列表
$.ajax({
    url: '/categories',
    type: 'get',
    success: function (response) {
        var html = template('affiliationTpl', { data: response })
        $("#category").html(html)
    }
})

// 当提交文件表单出现变化时
$("#feature").on('change', function () {

    // 把表单转换成表单对象 用来实现二进制转换
    var formData = new FormData();

    // FormData 接口的append() 方法 会添加一个新值到 FormData 对象内的一个已存在的键中，如果键不存在则会添加该键
    formData.append('avatar', this.files[0])

    // 调用ajax请求  让一个input表单的隐藏域里有val 值是文件的路径
    $.ajax({
        url: '/upload',
        type: 'post',
        data: formData,
        // 告诉$.ajax方法不要解析请求参数
        processData: false,
        // 告诉$.ajax方法不要设置请求参数的类型
        contentType: false,
        success: function (response) {
            $("#thumbnail").val(response[0].avatar)
        }
    })
})

$("#formbox").on('submit', function () {

    var formData = $(this).serialize()

    $.ajax({
        type: 'post',
        url: '/posts',
        data: formData,
        success: function () {
            // 文章添加成功 跳转到文章列表页面
            location.href = '/admin/posts.html'
        }
    })


    return false;

})

// 'id'是函数里面return出来的形参， 然后我们用变量接着
var id = getUrlParams('id')

if (id != undefined) {
    $.ajax({
        url: '/posts/' + id,
        type: 'get',
        success: function (response) {
            // 查询分类列表
            $.ajax({
                url: '/categories',
                type: 'get',
                success: function (categories) {
                    response.categories = categories;
                    var mod = template('modTpl', response)
                    console.log(response)
                    $("#parentBox").html(mod)
                }
            })

        }
    })
}
// 编辑内容修改
$("#parentBox").on('submit', "#modbox", function () {

    var formData = $(this).serialize();

    var id = $(this).attr('data-id')
    console.log(id)

    $.ajax({
        url: '/posts/' + id,
        type: 'put',
        data: formData,
        success: function (response) {
            location.href = '/admin/posts.html'

        }
    })

    return false;
})

// 删除内容


function getUrlParams(name) {
    var nihao = location.search.substr(1).split('&')
    for (let i = 0; i < nihao.length; i++) {
        if (nihao[i].split('=')[0] == name) {
            return nihao[i].split('=')[1]
        }
    }

}   