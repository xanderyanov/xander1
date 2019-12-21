$(function () {

  if ($('.functionHeight').length) {
    var windowH = $(window).height();
    console.log('windowH ' + windowH);

    var headerH = $('.site__header').outerHeight();
    console.log('headerH ' + headerH);

    var centerH = $('.site__center').outerHeight();
    console.log('centerH ' + centerH);

    var footerH = $('.site__footer').outerHeight();
    console.log('footerH ' + footerH);

    var siteH = headerH + centerH + footerH;
    console.log('siteH ' + siteH);

    if (siteH < windowH) {
      var difH = windowH - siteH;
      var newCenterH = centerH + difH;
      $('.page__area').css('height', newCenterH);
      console.log(newCenterH);
    }
  }
  ;

  // $('.topMenu li:has(ul) > a').addClass('hasInner');
  // $('.leftMenu li:has(ul) > a').addClass('hasInnerLm');

  $('.topMenu li:has(ul) > a').addClass('hasInner').append('<div class="goInner"></div>');
  $('.leftMenu li:has(ul) > a').addClass('hasInnerLm').append('<div class="goInnerLm"></div>');


  $('.menuButton').click(function () {
    $(this).toggleClass('open');
    $('.adaptiveMenu__area').slideToggle();
  });

  $('.adaptiveMenu li:has(ul)').addClass('has-sub');
  // $('#cssmenu li:has(ul)').addClass('has-sub');
  $('.adaptiveMenu li>a').on('click', function (e) {
    if ($(this).parent().find('ul').length > 0) {
      e.preventDefault();
      var element = $(this).parent('li');
      if (element.hasClass('open')) {
        element.removeClass('open');
        element.find('li').removeClass('open');
        element.find('ul').slideUp();
      } else {
        element.addClass('open');
        element.children('ul').slideDown();
        element.siblings('li').children('ul').slideUp();
        element.siblings('li').removeClass('open');
        element.siblings('li').find('li').removeClass('open');
        element.siblings('li').find('ul').slideUp();
      }
    }
  });
  $('.adaptiveMenu li.has-sub>a').append('<span class="holder"><i class="icon-down2"></i></span>');


  if ($('.swiper-container1').length) {
    var mySwiper1 = new Swiper('.swiper-container1', {
      slidesPerView: 1,
      loop: true,
      autoplay: {
        delay: 5500,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination1',
        type: 'bullets',
        dynamicBullets: true,
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next1',
        prevEl: '.swiper-button-prev1',
      },
      on: {
        slideChange: function () {
          $('.swiper-slide').children('.swiper__cadr')
            .removeClass('animationBaretsky1')
            .fadeOut(500);

          setTimeout(function () {
            $('.swiper-slide-active').children('.swiper__cadr')
              .fadeIn(500)
              .addClass('animated')
              .addClass('animationBaretsky1');
          }, 500);
        },
      }
    });

  }


  if ($('.serv__area').length) {
    $('.serv').masonry({
      itemSelector: '.serv__itemOuter'
    });
  }

  if ($('.reviews__area').length) {
    $('.reviews').masonry({
      itemSelector: '.reviews__itemOuter'
    });
  }

  $(".phoneZ").mask("+7 (999) 999-9999");
  $(".phone1").mask("+7 (999) 999-9999");
  $(".phone2").mask("+7 (999) 999-9999");

  $('table').wrap('<div class="table_outer"></div>');

  $('.toTop').hide();
  $(window).scroll(function () {
    if ($(this).scrollTop() > 0) {
      $('.toTop').fadeIn();
    } else {
      $('.toTop').fadeOut();
    }
  });
  $('.toTop').click(function () {
    $('body,html').animate({scrollTop: 0}, 400);
    return false;
  });


  $('a[data-fancybox]').fancybox({
    closeBtn: false,
    arrows: true,
    keyboard: true,
    nextClick: true,
    infobar: true,
    protect: true,
    nextEffect: 'elastic',
    prevEffect: 'elastic',
    padding: 0,
    loop: true,
    animationEffect: "zoom-in-out",
    transitionEffect: "slide",
    touch: {
      vertical: true,  // Allow to drag content vertically
      momentum: true   // Continue movement after releasing mouse/touch when panning
    },
  });

  $('.form1').on('click', '.submit1', function (e) {
    e.preventDefault();
    var name = $('.name1').val();
    var phone = $('.phone1').val();
    var email = $('.email1').val();
    var workemail = $('.work_email1').val();
    var message = $('.message1').val();
    var r = /^[\w\.\d-_]+@[\w\.\d-_]+\.\w{2,4}$/i;
    if (name == '') {
      swal({title: "Поле Имя пустое", text: "Заполните поле имя", type: "error", confirmButtonText: "ок"});
      $('.name1').addClass('error');
      setTimeout(function () {
        $('.name1').removeClass('error');
      }, 3000);
    } else if (phone == '') {
      swal({
        title: "Поле Телефон пустое",
        text: "Заполните поле телефон",
        type: "error",
        confirmButtonText: "ок"
      });
      $('.phone1').addClass('error');
      setTimeout(function () {
        $('.phone1').removeClass('error');
      }, 3000);
    } else if (email == '') {
      swal({title: "Ошибка Email", text: "Заполните поле Email", type: "error", confirmButtonText: "ок"});
      $('.email1').addClass('error');
      setTimeout(function () {
        $('.email1').removeClass('error');
      }, 3000);
    } else if (!r.test(email)) {
      swal({title: "Ошибка", text: "Корректно заполните поле e-mail", type: "error", confirmButtonText: "ок"});
      $('.email1').addClass('error');
      setTimeout(function () {
        $('.email1').removeClass('error');
      }, 3000);
    } else if (message == '') {
      swal({
        title: "Пустое сообщение",
        text: "Заполните текст сообщения",
        type: "error",
        confirmButtonText: "ок"
      });
      $('.message1').addClass('error');
      setTimeout(function () {
        $('.message1').removeClass('error');
      }, 3000);
    } else if (workemail != '') {
      swal({title: "Ах ты жулик", text: "Уберите робота от компьютера", type: "error", confirmButtonText: "ок"});

    } else {
      $.post('mail.php', {
        name: name,
        phone: phone,
        email: email,
        message: message
      }, function () {
        swal({title: "Спасибо", text: "Ваше сообщение отправлено", type: "success", confirmButtonText: "ок"});
        $('.name1').val('').removeClass('error');
        $('.phone1').val('').removeClass('error');
        $('.email1').val('').removeClass('error');
        $('.message1').val('').removeClass('error');
      });
    }
  });



});


//################ likeBlock

var share_url = window.location;
var share_title = document.getElementsByTagName("title")[0].innerHTML;
var share_desc = 'Главная';
var share_image = '';
var share_text = 'Главная';
var share_popup_width = 650;
var share_popup_height = 450;

// var share_links_container = document.getElementById('my_share');


var share_links_container = $('.likeBlock');

if (share_links_container != 'NULL') {

  if (typeof (share_popup_width) != 'number' || typeof (share_popup_height) != 'number') {
    share_popup_width = 626;
    share_popup_height = 436;
  }

  share = {
    twitter: function (purl, ptitle) {
      url = 'http://twitter.com/share?';
      url += 'text=' + encodeURIComponent(ptitle);
      url += '&url=' + encodeURIComponent(purl);
      url += '&counturl=' + encodeURIComponent(purl);
      share.popup(url);
      return false;
    },
    gp: function (purl, ptitle, pimg, text) {
      url = 'https://plus.google.com/share?';
      url += 'url=' + encodeURIComponent(purl);
      share.popup(url);
      return false;
    },
    mail: function (purl, ptitle, pimg, text) {
      url = 'http://connect.mail.ru/share?';
      url += 'url=' + encodeURIComponent(purl);
      url += '&title=' + encodeURIComponent(ptitle);
      url += '&description=' + encodeURIComponent(text);
      url += '&imageurl=' + encodeURIComponent(pimg);
      share.popup(url);
      return false;
    },
    vk: function (purl, ptitle, pimg, text) {
      url = 'http://vkontakte.ru/share.php?';
      url += 'url=' + encodeURIComponent(purl);
      url += '&title=' + encodeURIComponent(ptitle);
      url += '&description=' + encodeURIComponent(text);
      url += '&image=' + encodeURIComponent(pimg);
      url += '&noparse=true';
      share.popup(url);
      return false;
    },
    ok: function (purl, text) {
      url = 'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1';
      url += '&st.comments=' + encodeURIComponent(text);
      url += '&st._surl=' + encodeURIComponent(purl);
      share.popup(url);
      return false;
    },
    fb: function (purl, ptitle, pimg, text) {
      url = 'http://www.facebook.com/sharer.php?s=100';
      url += '&p[title]=' + encodeURIComponent(ptitle);
      url += '&p[summary]=' + encodeURIComponent(text);
      url += '&p[url]=' + encodeURIComponent(purl);
      url += '&p[images][0]=' + encodeURIComponent(pimg);
      share.popup(url);
      return false;
    },


    popup: function (url, width, height) {
      window.open(url, '', 'toolbar=0,status=0,width=' + share_popup_width + ',height=' + share_popup_height);
      return false;
    }
  };
}


var isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};

if ($(".map__area").length) {
  ymaps.ready(init);

  function init() {

    var myMap = new ymaps.Map("map", {
      center: [51.45123437116421,46.0940517033576],
      zoom: 15,
      controls: ['zoomControl']
    });

    myMap.behaviors.disable('scrollZoom');
    if (isMobile.any()) {
      myMap.behaviors.disable('drag');
    }

    var myGeoObjects = [];

    myGeoObjects[0] = new ymaps.Placemark([51.45123437116421,46.0940517033576], {

      // Зададим содержимое заголовка балуна.
      balloonContentHeader: '<div class="baloon__top">Выездные мастер-классы</div>' +
        '<div class="baloon__description">Студия "Креатив"</div>',
      // Зададим содержимое основной части балуна.
      balloonContentBody: '<div class="baloon__content"><img src="assets/img/logo1.png" height="67" width="200">' +
        '<a href="tel:+79297700214">8-929-770-02-14</a>',
      // Зададим содержимое нижней части балуна.
      balloonContentFooter: '<div class="baloon__footer">город Энгельс,<br>улица Краснознаменная, 41а</div>',
      clusterCaption: 'Выездные мастер-классы',
      // Зададим содержимое всплывающей подсказки.
      hintContent: '<div class="baloon__top">Студия "Креатив"</div>'

    }, {
      // Необходимо указать данный тип макета.
      iconLayout: 'default#image',
      iconImageHref: 'assets/img/marker.png',
      // Размеры метки.
      iconImageSize: [31, 50],
      // Смещение левого верхнего угла иконки относительно
      // её «ножки» (точки привязки).
      iconImageOffset: [-15, -50]
    });

    // myGeoObjects[1] = new ymaps.Placemark([51.53278464377675, 46.00511899140164], {
    //   // Зададим содержимое заголовка балуна.
    //   balloonContentHeader: '<div class="baloon__top">Каркас 64</div>' +
    //   '<div class="baloon__description">каркасное строительство</div>',
    //   // Зададим содержимое основной части балуна.
    //   balloonContentBody: '<div class="baloon__content"><img src="assets/img/logo1c.png" height="83" width="150">' +
    //   '<a href="tel:778801">77-88-01</a>',
    //   // Зададим содержимое нижней части балуна.
    //   balloonContentFooter: '<div class="baloon__footer">Саратов, улица Слонова, 1</div>',
    //   clusterCaption: 'Каркас64',
    //   // Зададим содержимое всплывающей подсказки.
    //   hintContent: '<div class="baloon__top">Мы в Саратове</div>'
    // }, {
    //   // Необходимо указать данный тип макета.
    //   iconLayout: 'default#image',
    //   //iconImageHref: 'assets/img/mapmarker2.png',
    //   // Размеры метки.
    //   //iconImageSize: [30, 45],
    //   // Смещение левого верхнего угла иконки относительно
    //   // её «ножки» (точки привязки).
    //   //iconImageOffset: [-20, -47]
    // });

    var clusterIcons = [{
      href: '/images/pointer.png',
      size: [31, 40],
      offset: [0, 0]
    }];

    var clusterer = new ymaps.Clusterer({
      clusterDisableClickZoom: false,
      clusterOpenBalloonOnClick: false,
      // Устанавливаем стандартный макет балуна кластера "Карусель".
      clusterBalloonContentLayout: 'cluster#balloonCarousel',
      // Устанавливаем собственный макет.
      //clusterBalloonItemContentLayout: customItemContentLayout,
      // Устанавливаем режим открытия балуна.
      // В данном примере балун никогда не будет открываться в режиме панели.
      clusterBalloonPanelMaxMapArea: 0,
      // Устанавливаем размеры макета контента балуна (в пикселях).
      clusterBalloonContentLayoutWidth: 300,
      clusterBalloonContentLayoutHeight: 200,
      // Устанавливаем максимальное количество элементов в нижней панели на одной странице
      clusterBalloonPagerSize: 5,
      // Настройка внешего вида нижней панели.
      // Режим marker рекомендуется использовать с небольшим количеством элементов.
      clusterBalloonPagerType: 'marker',
      // Можно отключить зацикливание списка при навигации при помощи боковых стрелок.
      // clusterBalloonCycling: false,
      // Можно отключить отображение меню навигации.
      // clusterBalloonPagerVisible: false
    });

    clusterer.add(myGeoObjects);
    myMap.geoObjects.add(clusterer);
  }

}

