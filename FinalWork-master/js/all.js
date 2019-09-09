jQuery(document).ready(function($) {
	//手機版上方漢堡選單設定
	$('.burgermenu').on('click', function(e){
		e.preventDefault();
		$('body').toggleClass('menu-show');
	})

  //login&register切換
  var slide_time = 400;
  $('.registerbtn').click(function(e) {
    $('.login').slideUp(slide_time);
    $('.register').slideDown(slide_time);
  });

  $('.tologin').click(function(e) {
    $('.register').slideUp(slide_time);
    $('.login').slideDown(slide_time);
  });

  //register確認密碼
  $('.checkbtn').click(function(e) {
    var password = document.getElementById('Password').value;
    var retypepassword = document.getElementById('Retypepassword').value;
    if (password != retypepassword) {
      alert('兩次密碼不符，請重新輸入');
    }
    else {
      location.href = "#";
    }
  });

  var product = db.search();
  show_menu();
  show_product(0);
  var x = 0;
  
  //cart搜尋設定
  $('.searchbtn').click(function(e) {
    e.preventDefault();
    var something = document.getElementById('search').value;
    product = db.search(something);
    show_menu();
    show_product(0);
  });

  //cart aside篩選設定
  function show_menu() {
    var pdname = db.get_category_list();
    var category = document.getElementById('category');
    category.innerHTML ="";
    for (var i = 0; i < product.length; i++){
      if ( product[i].length > 0 || i == 0 ) {
        category.innerHTML += '<li id="ct' + i + '"><a href="#">' + pdname[i] + " (" + product[i].length + ")" + '</a></li>';
      } 
    }

    //cart aside按鈕呼叫product設定
    for (let i = 0; i < product.length; i++) {
      if ( product[i].length > 0 ) {
        $('#ct'+ i).click(function(e) {
          e.preventDefault();
          $(this).find('a').toggleClass('active');
          $(this).siblings().find('a').removeClass('active');
          show_product(i);
        });
      }
    }
  }

  //cart product設定
  function show_product(c) {
    var cantfind = document.getElementsByClassName('product');
    cantfind[0].innerHTML = '<ul id="product"></ul>';
    var pdlist = document.getElementById('product');
    for (var i = 0; i < product[c].length; i++) {
        pdlist.innerHTML += cook(product[c][i]);
    }

    if (product[0].length == 0) {
      cantfind[0].innerHTML += '<h2>找不到符合項目</h2>';
    }
        
    //cart like設定
    $('.like').click(function(e) {
      e.preventDefault();
      $(this).toggleClass('change');
    });

    //cart count設定
    $('.buybtn').click(function (){
      x = x + 1;
      $('.count').show();
      if (x > 9){
        $('.count').text('9+');
      } else {
        $('.count').text(x);
      }
    });
  }

  //product產品組合
  function cook(dish){
    var html = "";
    html += '<li><a class="like" href="#">like</a>';
    if (dish.hotsale === true) 
      html += '<div class="hotsale"><p>熱銷美食</p></div>';
      html += '<div class="productpic"><img src="img/' + dish.img + '" alt="' + dish.cname + '"></div>';
      html += '<h4>' + dish.cname + '</h4><p>' + dish.ename + '</p><hr><h5>＄' + dish.price + '</h5>';
      html += '<button class="btn buybtn"><i class="fas fa-shopping-cart"></i> 加入購物車</button></li>';
    return html;
  }
  
});