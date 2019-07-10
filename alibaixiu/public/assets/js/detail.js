var postId = getUrlParams('id')

$.ajax({
    url: '/posts/' + postId,
    type: 'get',
    success: function (response) {
        var html = template('diyi', response)
        $("#dire").html(html)
    }
})