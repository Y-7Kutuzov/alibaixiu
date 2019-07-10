$("#file").on("change", function () {
    var file = this.files[0]
    var formData = new FormData();

    formData.append('image', file)
    $.ajax({
        url: '/upload',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            $("#image").val(response[0].image)
        }
    })
})

// 
$("#lunbo").on('submit', function () {
    var formData = $(this).serialize();

    $.ajax({
        url: '/slides',
        type: 'post',
        data: formData,
        success: function () {
            location.reload();
        }
    })

    return false;
})

$.ajax({
    url: '/slides',
    type: 'get',
    success: function (response) {
        console.log(response)
        var lunbo = template('lunboTpl', { data: response })
        $("#lunBox").html(lunbo)

    }
})

$("#lunBox").on('click', '#lunBtn', function () {
    var id = $(this).attr('data-id')

    if (confirm('您真的要删除该轮播图吗')) {
        $.ajax({
            url: '/slides/' + id,
            type: 'DELETE',
            success: function () {
                location.reload();
            }
        })
    }
})