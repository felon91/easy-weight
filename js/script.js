$(document).ready(function () {
  let owl = $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 0,
    nav: true,
    dots: true,
    items: 1,
    navText: ['', ''],
    autoHeight: true
  });

  owl.owlCarousel();

  $('select').styler();


  $(window).scroll(function (e) {

    if (window.innerWidth >= 980) {

      if ($(this).scrollTop() > 100) {
        $('.fixed-menu').slideDown();
        return false;
      }
      else {
        $('.fixed-menu').slideUp();
      }

    }

  });

  $(window).resize(function () {

    if (window.innerWidth <= 980) {

      $('.fixed-menu').removeAttr('style');

    }

  });


  let hamburger = document.querySelector('.hamburger');
  let fixedMenu = document.querySelector('.fixed-menu');
  let fixedMenuClose = document.querySelector('.fixed-menu__close');

  if (hamburger) {
    hamburger.addEventListener('click', function (e) {
      fixedMenu.classList.add('fixed-menu--active');
    });
  }

  if (fixedMenuClose) {
    fixedMenuClose.addEventListener('click', function (e) {
      fixedMenu.classList.remove('fixed-menu--active');
    });
  }

  $('.fixed-menu--scroll .fixed-menu__item a, .footer__menu-item a, .header__link--scroll').on('click', function (e) {
    e.preventDefault();
    let target = $(this).attr('href');
    $('html, body').stop().animate({scrollTop: $(target).offset().top}, 1000);
    return false;
  });

  $('.container').on("click", '.author__link', function (e) {
    e.preventDefault();
    let id = $(this).attr('data-id');
    $.ajax({
      url: "/wp-admin/admin-ajax.php", //url, к которому обращаемся
      type: "POST",
      data: "action=popup&id=" + id, //данные, которые передаем. Обязательно для action указываем имя нашего хука
      success: function(data){
        //возвращаемые данные попадают в переменную data
        let responseData = jQuery.parseJSON(data);
        $('.modal .modal__info').prepend(responseData['meta_value']);
        $('.modal').addClass('modal--active');
      }
    });
  });

  let modalClose = document.querySelector('.modal__close');
  let modal = document.querySelector('.modal');

  if (modalClose) {
    modalClose.addEventListener('click', function (e) {
      e.preventDefault();
      modal.classList.remove('modal--active');
      $('.modal .modal__info > *').remove();
    });
  }

  $('.container').on("click", '.course__button', function (e) {
    e.preventDefault();
    let type = $(this).attr('data-type');
    let name = '';

    if (type === 'basic') {
      name = 'Базовый курс';
    } else if(type === 'standart') {
      name = 'Стандартный курс';
    } else if(type === 'premium') {
      name = 'Премиум курс';
    }

    $('.form-modal__type').val(name);
    $('.form-modal__title').html(name);
    $('.form-modal').addClass('form-modal--active');

  });

  $('.container').on("click", '.form-modal__close', function (e) {
    $('.form-modal').removeClass('form-modal--active');
  });

});