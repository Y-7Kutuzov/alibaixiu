$("#formData").on('submit', function () {

	const formData = $(this).serialize()

	$.ajax({
		url: '/categories',
		type: 'post',
		data: formData,
		success: function () {
			location.reload();
		}
	})

	return false;
})

$.ajax({
	url: '/categories',
	type: 'GET',
	success: function (response) {

		console.log(response)

		var html = template('shiTpl', { data: response });

		$('#tbodyBox').html(html)
	}
})

$('#tbodyBox').on('click', '#compile', function () {

	var id = $(this).attr('data-id')

	$.ajax({
		url: "/categories/" + id,
		type: 'get',
		success: function (response) {
			var html = template('xiugaiTpl', response)
			$("#formBox").html(html)
		}
	})

})

// 修改表单也是我们用模板拼接过来的  用事件委派 找父级

$('#formBox').on('submit', '#modfiyData', function () {

	var message = $(this).serialize()

	const id = $(this).attr('data-id')

	$.ajax({

		url: '/categories/' + id,
		type: 'put',
		data: message,
		success: function () {
			location.reload();
		}

	})

	return false;
})

$('#tbodyBox').on('click', '#del', function () {

	var id = $(this).attr('data-id')

	if (confirm('您真的要删除该分类吗')) {
		$.ajax({
			url: '/categories/' + id,
			type: 'DELETE',
			success: function (response) {
				location.reload();
			}
		})
	}

})