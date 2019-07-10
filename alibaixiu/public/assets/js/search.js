var key = getUrlParams('key')
$.ajax({
    url: 'get',
    type: '/posts/search/' + key,
    success: function (response) {
        console.log(response)
    }
})