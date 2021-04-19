$(document).ready(function () {
  $('.scroll').click(function (e) {
    event.preventDefault();
    var id = $(this).attr('href'),
      top = $(id).offset().top;

    $('body,html').animate({
      scrollTop: top - 90
    }, 500);

  });
  $('.head-slider').slick({
    arrows: false,
    dots: false,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    adaptiveHeight: false,
    //    fade: true,
    autoplay: true,
    autoplaySpeed: 5000,
    //    cssEase: 'linear'
  });
/*  $('.partners-carousel').slick({
    arrows: false,
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 6,
    adaptiveHeight: false,
    variableWidth: true,
    centerMode: true,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
    {
      breakpoint: 768,
      settings: {
        variableWidth: false,
        arrows: false,
        slidesToShow: 4
      }
    },
    {
      breakpoint: 480,
      settings: {
        variableWidth: false,
        slidesToShow: 1,
        margin: 20,
      }
    }
  ]
    //    cssEase: 'linear'
  });*/

  var widthLi = 170;

  $('.slider-nav li').click(function () {
    var goToThisIndex = $(this).data("slickIndex");
    $('.slider-nav li').removeClass('active');

    $(this).addClass('active');
    $('.head-slider').slick('slickGoTo', goToThisIndex, false);

    /*    if($(window).width() < 968 ){
          widthLi = widthLi + $(this).width();
          
          if($(this).next().length == 0) {
            widthLi = 0;
          }
          $(this).parent().css({
            "transform" : "translateX(-"+widthLi+"px)"
          })
        }*/
  });


  // On before slide change
  /*  $('.head-slider').on('afterChange', function (event, slick, currentSlide, nextSlide) {

      $('.slider-nav li').removeClass('active');

      $('.slider-nav li[data-slick-index="' + currentSlide + '"]').addClass('active');
    });*/

  $('.head-slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    $('.slider-nav li').removeClass('active');

    $('.slider-nav li[data-slick-index="' + nextSlide + '"]').addClass('active');
  });

  $(window).scroll(function () {
    return $('.nav').toggleClass("fixed", $(window).scrollTop() > 0);
  });

  if ($(window).scrollTop() > 30) {
    $('.nav').addClass('fixed');
  }




  $('.section_map-nav li ').click(function (e) {
    e.preventDefault();
    var $this = $(this);
    $('.section_map-content .item').removeClass(' fadeIn').addClass('fadeOut');
    $('.section_map-point').removeClass('fadeIn').addClass('fadeOut');

    setTimeout(function () {
      $('.section_map-nav li').removeClass('active');
      $('.section_map-content .item').removeClass(' fadeOut active');
      $('.section_map-point').removeClass('fadeOut active');


      $this.addClass('active');
      $($this.find('a').attr('href')).addClass('active visible animated fadeIn');
      $('[data-tab="' + $this.find('a').attr('href') + '"]').addClass('active visible animated fadeIn');
    }, 500)


    /* 
     $(this).addClass('active visible animated fadeIn');
     $($(this).find('a').attr('href')).addClass('active visible animated fadeIn');
     $('[data-tab="'+$(this).find('a').attr('href')+'"]').addClass('active visible animated fadeIn');
     
     */
  })







  function initMap() {
    var element = document.getElementById('map');

    if ($(window).width() > 1023) {
      var options = {
        zoom: 15,
        /*panControl: false,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        overviewMapControl: false,
        rotateControl: false,*/
        fullscreenControl: false,
        center: {
          lat: 34.6958132,
          lng: 33.0831445
        }

      };

    } else {
      var options = {
        zoom: 17,
//        disableDefaultUI: true,
        fullscreenControl: false,
        center: {
          lat: 34.6984635,
          lng: 33.0629015
        }

      };
    }


    var myMap = new google.maps.Map(element, options);

    var markers = [

      {
        coordinates: {
          lat: 34.698464,
          lng: 33.062902
        },
        info: '<h6>Agiou Athanasiou 62-201, BG WayWin Plaza, 4102 Limassol, Cyprus</h6> '
                    }];

    for (var i = 0; i < markers.length; i++) {
      addMarker(markers[i]);
    }

    function addMarker(properties) {
      var marker = new google.maps.Marker({
        position: properties.coordinates,
        icon: 'images/point.svg',
        visible: true,
        map: myMap
      });

      if (properties.image) {
        marker.setIcon(properties.image);
      }

      if (properties.info) {
        var InfoWindow = new google.maps.InfoWindow({
          content: properties.info,
          //            pixelOffset: new google.maps.Size(180, 140),
        });




        marker.addListener('click', function () {
          InfoWindow.open(myMap, marker);
        });
        //        InfoWindow.open(myMap, marker);

      }


      function jump_to_marker(markerPosition) {
        myMap.panTo(markerPosition);
        myMap.setZoom(17);
        marker.setAnimation(google.maps.Animation.DROP);
      }



    }

  }


  if ($('div').hasClass('map')) {
    initMap();
  }


  $('#nav-icon, #menu li a').click(function () {
    $('.hamburger').toggleClass('is-active')
    $('.nav').toggleClass('menu-open')

    $(this).toggleClass('open');
    $(this).parents('nav').toggleClass('open');
    $('#menu').toggleClass('open');
    $('header, main,footer').toggleClass('blur');
    $('body').toggleClass('overflow-hidden')

  });


  $.fn.make_carousel = function ($flag) {
    var speed = 0;
    var scroll = 0;
    var container = $(this);
    var container_w = container.width();
    var max_scroll = container[0].scrollWidth - container.outerWidth();
    var prev_frame = new Date().getTime();
    container.on('mousemove', function (e) {
      var mouse_x = e.pageX - container.offset().left;
      var mouseperc = 100 * mouse_x / container_w;
      speed = mouseperc - 50;
    }).on('mouseleave', function () {
      speed = 0;
    });

    function updatescroll() {
      var cur_frame = new Date().getTime();
      var time_elapsed = cur_frame - prev_frame;
      prev_frame = cur_frame;
      if (speed !== 0) {
        scroll += speed * time_elapsed / 50;
        if (scroll < 0) scroll = 0;
        if (scroll > max_scroll) scroll = max_scroll;
        container.scrollLeft(scroll);
      }
      window.requestAnimationFrame(updatescroll);
    }
    window.requestAnimationFrame(updatescroll);
  }

  $(window).resize(function () {
    if ($(window).width() > 1200 ) {
      $("#brands").make_carousel();

    }



    if ($(window).width() < 1100) {
      $('.section_map-points li').click(function () {
        $('.section_map-points li .info').hide();
        $(this).find('.info').show();
      })
    } else {
      $('.section_map-points li .info').show();
    }

    if ($('div').hasClass('map')) {
      initMap();
    }

  })

  if ($(window).width() > 1200  ) {
    $("#brands").make_carousel();

  }
  if ($(window).width() < 768) {
    $('#menu').prepend('<li id="mobli"><a href="#top" class="scroll">Home</a></li>')

  } else {
    $('#mobli').remove();
  }

  if ($(window).width() < 1100) {

    $('.section_map-points li').click(function () {
      $('.section_map-points li .info').hide(200);
      $(this).find('.info').show(200);
    })
  }

  setTimeout(function () {
    $('.section_map-nav li.active').next().trigger('click');

  }, 10000);

  var mapInterval = setInterval(function () {
    $('.section_map-nav li.active').prev().trigger('click');

    setTimeout(function () {
      $('.section_map-nav li.active').next().trigger('click');

    }, 10000)
  }, 20000)


  $('.section_map-points').hover(function () {
      clearInterval(mapInterval)
      console.log('clear')
    },
    function () {
      console.log('clear_false')
      mapInterval = setInterval(function () {
        $('.section_map-nav li.active').next().trigger('click');

        setTimeout(function () {
          $('.section_map-nav li.active').prev().trigger('click');

        }, 10000)
      }, 20000)
    })


  $('.footer-right').click(function () {
    window.open($(this).find('a').attr('href'));

  })

  
  
  /* form valid*/
  var alertImage = '<svg style="width: 20px; position:absolute;top: 50%;transform: translateY(-50%); right: 23px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 286.1 286.1"><path d="M143 0C64 0 0 64 0 143c0 79 64 143 143 143 79 0 143-64 143-143C286.1 64 222 0 143 0zM143 259.2c-64.2 0-116.2-52-116.2-116.2S78.8 26.8 143 26.8s116.2 52 116.2 116.2S207.2 259.2 143 259.2zM143 62.7c-10.2 0-18 5.3-18 14v79.2c0 8.6 7.8 14 18 14 10 0 18-5.6 18-14V76.7C161 68.3 153 62.7 143 62.7zM143 187.7c-9.8 0-17.9 8-17.9 17.9 0 9.8 8 17.8 17.9 17.8s17.8-8 17.8-17.8C160.9 195.7 152.9 187.7 143 187.7z" fill="#E2574C"/></svg>';
  var error;
  $('.submit').click(function (e) {
    e.preventDefault();
    var ref = $(this).closest('form').find('[required]');
    $(ref).each(function () {
      if ($(this).val() == '') {
        var errorfield = $(this);
        if ($(this).attr("type") == 'email') {
          var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
          if (!pattern.test($(this).val())) {
            $("input[name=email]").val('');
            $(this).addClass('error').parent('.label').append('<div class="allert">' + alertImage + '</div>');
            error = 1;
            $(":input.error:first").focus();
            return false;
          }
        } else if ($(this).attr("type") == 'tel') {
          var patterntel = /^()[- +()0-9]{9,18}/i;
          if (!patterntel.test($(this).val())) {
            $("input[name=phone]").val('');
            $(this).addClass('error').parent('.label').append('<div class="allert">' + alertImage + '</div>');
            error = 1;
            $(":input.error:first").focus();
            return false;
          }
        } else {
          $(this).addClass('error').parent('.label').append('<div class="allert">' + alertImage + '</div>');
          error = 1;
          $(":input.error:first").focus();
          return false;
        }
        error = 1;
        return false;
      } else {
        error = 0;
        $(this).addClass('error').parent('.label').find('.allert').remove();
      }
    });
    if (error !== 1) {
      $(this).unbind('submit').submit();
    }
  });

  function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
      vars[key] = value;
    });
    return vars;
  }
  $('input[name="utm_source"]').val(getUrlVars()["utm_source"]);
  $('input[name="utm_campaign"]').val(getUrlVars()["utm_campaign"]);
  $('input[name="utm_medium"]').val(getUrlVars()["utm_medium"]);
  $('input[name="utm_term"]').val(getUrlVars()["utm_term"]);
  $('input[name="utm_content"]').val(getUrlVars()["utm_content"]);
  $('input[name="click_id"]').val(getUrlVars()["aff_sub"]);
  $('input[name="affiliate_id"]').val(getUrlVars()["aff_id"]);
  $('input[name="user_agent"]').val(navigator.userAgent);
  $('input[name="ref"]').val(document.referrer);
  $('input[name="page_url"]').val(window.location);

  $.get("https://ipinfo.io", function (response) {
    $('input[name="ip_address"]').val(response.ip);
    $('input[name="city"]').val(response.city);
    $('input[name="country"]').val(response.country);
    $('input[name="region"]').val(response.region);
  }, "jsonp");

   $('input[name="phone"]').inputmask("+9{1,15}");
  
  

  function readCookie(name) {
    var n = name + "=";
    var cookie = document.cookie.split(';');
    for (var i = 0; i < cookie.length; i++) {
      var c = cookie[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(n) == 0) {
        return c.substring(n.length, c.length);
      }
    }
    return null;
  }
  setTimeout(function () {
    $('.gclid_field').val(readCookie('gclid'));
    if ($('.gclid_field').val() == '') {
      $('.gclid_field').val(readCookie('_gid'));
    }
  }, 2000);




  $('form').on('submit', function (e) {
    e.preventDefault();
    var $form = $(this);
    $form.find('.submit').addClass('inactive');
    $form.find('.submit').prop('disabled', true);



    $.ajax({
      type: 'POST',
      url: 'mail.php',
      dataType: 'json',
      data: $form.serialize(),
      success: function (response) {}
    });


    setTimeout(function () {
      window.location.href = "";
    }, 1000);

  });



});
