$.ajax({
    url: '/comments',
    type: 'get',
    success: function (response) {
        console.log(response)
        var html = template('bbTpl', response)
        $("#bbBox").html(html)
        var page = template('pTpl', response)
        $("#pBox").html(page)

    }
})


// 分页方法
function changePage(page) {
    $.ajax({
        url: '/comments',
        type: 'get',
        data: {
            page: page
        },
        success: function (response) {
            console.log(response)
            var html = template('bbTpl', response)
            $("#bbBox").html(html)
            var page = template('pTpl', response)
            $("#pBox").html(page)

        }
    })
}

function formateDate(date) {
    // 将日期时间字符串转换成日期对象
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}

$("#bbBox").on('click', '#laoda', function () {
    var state = $(this).attr('attr-state')

    var id = $(this).attr('attr-id')
    $.ajax({
        url: '/comments/' + id,
        type: 'put',
        data: {
            state: state == 1 ? 0 : 1
        },
        success: function () {
            location.reload()
        }
    })
})

// 删除评论
$("#bbBox").on('click', '#xiaobai', function () {
    var id = $(this).attr('attr-id')
    if (confirm('您真的要删除该条评论吗')) {
        $.ajax({
            url: '/comments/' + id,
            type: 'DELETE',
            success: function (response) {
                location.reload();

            }
        })
    }
})
