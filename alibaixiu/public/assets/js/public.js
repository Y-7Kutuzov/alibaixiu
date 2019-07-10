$.ajax({
  url: '/posts/random',
  type: 'get',
  success: function (response) {
    var moban = `
        {{each data}}
        <li>
            <a href="detail.html?id={{$value._id}}">
                <p class="title">{{$value.title}}</p>
                <p class="reading">阅读{{$value.meta.views}}</p>
                <div class="pic">
                <img src="{{$value.thumbnail}}" alt="">
            </div>
        </a>
        </li>
      {{/each}}
        `;
    var html = template.render(moban, { data: response })
    $("#nihaomoban").html(html)
  }
})

$.ajax({
  url: '/comments/lasted',
  type: 'get',
  success: function (response) {
    var wukong = `
        {{each data}}
      <li>
        <a href="javascript:;">
          <div class="avatar">
            <img src="{{$value.author.avatar}}" alt="">
          </div>
          <div class="txt">
            <p>
              <span>{{$value.author.nickName}}</span>{{$imports.formateDate($value.createAt)}}
            </p>
            <p>{{$value.content}}</p>
          </div>
        </a>
      </li>
      {{/each}}
        `;
    var xixi = template.render(wukong, { data: response })
    $("#beijita").html(xixi)
  }
})

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
    $("#yehua").html(lsi)
    $("#nihaobu").html(lsi)
  }
})

function formateDate(date) {
  // 将日期时间字符串转换成日期对象
  date = new Date(date);
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}

function getUrlParams(name) {
  var nihao = location.search.substr(1).split('&')
  for (let i = 0; i < nihao.length; i++) {
    if (nihao[i].split('=')[0] == name) {
      return nihao[i].split('=')[1]
    }
  }

}

$("#sousuocc").on('submit', function () {
  var keys = $(this).find('.keys').val();

  location.href = '/search.html?key=' + keys

  return false;
})