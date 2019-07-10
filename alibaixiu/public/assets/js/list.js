

// 获取地址栏中的categoryId参数
var categoryId = getUrlParams('categoryId')


$.ajax({
    url: '/categories',
    type: 'get',
    success: function (response) {
        var wudu = `
          {{each data}}
          <li><a href="list.html?categoryId={{$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>        
          {{/each}}
          `;
        var lsi = template.render(wudu, { data: response })
        $("#geng").html(lsi)
        $("#de").html(lsi)
    }
})

$.ajax({
    url: '/posts/category/' + categoryId,
    type: 'get',
    success: function (response) {
        console.log(response)
        var duode = template('huiTpl', { data: response })
        $("#duode").html(duode)
    }
})

$.ajax({
    url: '/categories/' + categoryId,
    type: 'get',
    success: function (response) {
        $("#huishenghuo").html(response.title)
    }
})