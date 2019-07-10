
$("#logo").on('change', function () {

    var formData = new FormData();

    formData.append('logo', this.files[0])

    $.ajax({
        url: '/upload',
        type: 'post',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            console.log(response)
            $("#hiddenLogo").val(response[0].logo)
            $("#img").attr('src', response[0].logo)

        }
    })

})

$("#formData").on('submit', function () {

    var biao = $(this).itheimaSerialize();
    console.log(biao, 'biao');


    $.ajax({
        type: 'post',
        url: '/settings',
        data: biao,
        success: function () {
            location.reload();
        }
    })

    return false
})

$.fn.itheimaSerialize = function () {
    var arr = this.serializeArray();
    var $input = $('input[type=radio],input[type=checkbox]', this);
    var obj = {};
    $.each($input, function () {
        if (!obj.hasOwnProperty(this.name)) {
            if ($("input[name='" + this.name + "']:checked").length == 0) {
                obj[this.name] = "false";
                arr.push({ name: this.name, value: "false" });
            }
        }
    });
    return $.param(arr);
};

$.ajax({
    url: '/settings',
    type: 'get',
    success: function (response) {
        if (response) {
            console.log(response)
            $("#hiddenLogo").val(response.logo)
            $("#img").attr('src', response.logo)
            $("#site_name").val(response.title)
            $("#site_description").val(response.description)
            $("#site_keywords").val(response.keywords)
            $("#comment_status").prop('checked', response.comment)
            $("#comment_reviewed").prop('checked', response.review)
        }
    }
})