$(document).ready(function(){
    ;  $('.carousel__inner').slick({
      adaptiveHeight: true,
      speed:1200,
      prevArrow: '<button type="button" class="slick-prev"><img src="../icons/logo/left.svg"></button>',
      nextArrow: '<button type="button" class="slick-next"><img src="../icons/logo/right.svg"></button>',
      responsive: [
          {
            breakpoint: 992,
            settings: {
              dots: true,
              arrows: false,
              /* infinite: false,  */
            }
          }
      ]
    });
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });
  
    
      /* function toggleSlide(item){
          $(item).each(function(i){
              $(this).on('click',function(e){
                  e.preventDevault();
                  $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                  $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
              })
              });
      };
      toggleSlide('.catalog-item__link');
      toggleSlide('.catalog-item__back'); */
  
    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };
  
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

      //Modal window
    $('[data-modal=consultation]').on('click', function(){
        $('.overlay,#consultation').fadeIn();
    });
    $('.modal__close').on('click', function(){
        $('.overlay,#consultation,#order,#thanks').fadeOut();
    });

    $('[data-modal=order]').each(function(i){
        $(this).on('click', function(){
            $('#order .modal__description').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay,#order').fadeIn();
        });
    });
    function validateForms(form){
        $(form).validate({
            rules:{
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true,
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите своё имя",
                    minlength: jQuery.validator.format("Минимум {0} символа")
                },
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                    required: "Пожалуйста, введите свой почтовый адрес",
                    email: "Ваш почтовый адрес введён некорректно, нужный формат: name@domain.com"
                }
            }
        });
    };
    validateForms('#main-form');
    validateForms('#consultation form');
    validateForms('#order form');

    $('input[name=phone]').mask("+7 (999) 999-99-99");

    $('form').submit(function(e){
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function(){
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay,#thanks').fadeIn();
            $('form').trigger('reset');
        });
        return false;
    });

    //Scroll
    $(window).scroll(function(){
        if($(this).scrollTop()>1150){
            $('.pageup').fadeIn();
        }
        else{
            $('.pageup').fadeOut();
        }
    });
    $("a[href^='#arrow']").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });
    
    new WOW().init();
});