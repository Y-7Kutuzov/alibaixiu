$.ajax({
    url: '/posts',
    type: 'get',
    success: function (response) {
        console.log(response)
        var html = template('suibianTpl', { data: response })
        $("#suibianbox").html(html)
        var page = template('pageTpl', response)
        $("#ulBox").html(page)
    }
})

// 索要分类数据
$.ajax({
    url: '/categories',
    type: 'get',
    success: function (response) {
        var html = template('fenleiTpl', { data: response })
        $("#fenli").html(html)
    }
})

$("#ccstate").on('submit', function () {

    var formData = $(this).serialize();

    $.ajax({
        url: '/posts',
        type: 'get',
        data: formData,
        success: function (response) {
            var html = template('suibianTpl', { data: response })
            $("#suibianbox").html(html)
            var page = template('pageTpl', response)
            $("#ulBox").html(page)
        }
    })

    return false;
})

// 处理时间格式
// 处理日期时间格式
function formateDate(date) {
    // 将日期时间字符串转换成日期对象
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}


// 分页
function changePage(page) {
    $.ajax({
        url: '/posts',
        type: 'get',
        data: { page: page },
        success: function (response) {
            console.log(response)
            var html = template('suibianTpl', { data: response })
            $("#suibianbox").html(html)
            var page = template('pageTpl', response)
            $("#ulBox").html(page)
        }
    })
}

// 删除内容
$("#suibianbox").on('click', '#btn', function () {
    var id = $(this).attr('data-id')
    if (confirm('您真的要删除该文章吗')) {
        $.ajax({
            url: '/posts/' + id,
            type: 'DELETE',
            success: function (response) {
                location.reload()
            }
        })
    }

})

