
$.ajax({
    url: '/posts/count',
    type: 'get',
    success: function (response) {
        $("#post").html('<strong>' + response.postCount + '</strong>篇文章（<strong>' + response.draftCount + '</strong>篇草稿）')
    }
})

$.ajax({
    url: '/categories/count',
    type: 'get',
    success: function (response) {

        $("#xiexie").html('<strong>' + response.categoryCount + '</strong>个分类')
    }
})

$.ajax({
    url: '/comments/count',
    type: 'get',
    success: function (response) {
        console.log(response)
        $("#nigazhabie").html('<strong>' + response.commentCount + '</strong>条评论')
    }
})

