$(document).ready(function () {

  $('.head-slider').slick({
    arrows: false,
    dots: false,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    adaptiveHeight: false,
    fade: true,
    cssEase: 'linear'
  });

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
  $('.head-slider').on('afterChange', function (event, slick, currentSlide, nextSlide) {

    $('.slider-nav li').removeClass('active');

    $('.slider-nav li[data-slick-index="' + currentSlide + '"]').addClass('active');
  });



  $(window).scroll(function () {
    return $('.nav').toggleClass("fixed", $(window).scrollTop() > 0);
  });

  if ($(window).scrollTop() > 0) {
    $('.nav').addClass('fixed');
  }

  $('.scroll').click(function (e) {
    event.preventDefault();
    var id = $(this).attr('href'),
      top = $(id).offset().top;

    $('body,html').animate({
      scrollTop: top - 80
    }, 1500);

  });


  $('.section_map-nav li ').click(function (e) {
    e.preventDefault();
    $('.section_map-nav li').removeClass('active');
    $('.section_map-content .item').removeClass('active');
    $('.section_map-point').removeClass('active');
    $(this).addClass('active');

    $($(this).find('a').attr('href')).addClass('active');
    $('[data-tab="'+$(this).find('a').attr('href')+'"]').addClass('active');
  })







  function initMap() {
    var element = document.getElementById('map');
    
    if ($(window).width() > 1023) {
      var options = {
        zoom: 16,
        center: {
          lat: 34.6981856,
          lng: 33.0682552
        }

      };
      
    }else {
      var options = {
        zoom: 17,
        center: {
           lat: 34.6984635,
          lng: 33.0607128
        }

      };
    }


    var myMap = new google.maps.Map(element, options);

    var markers = [

      {
        coordinates: {
          lat: 34.6984635,
          lng: 33.0607128
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


  $('#nav-icon').click(function () {
    $('.hamburger').toggleClass('is-active')
    $('.nav').toggleClass('menu-open')

    $(this).toggleClass('open');
    $(this).parents('nav').toggleClass('open');
    $('#menu').toggleClass('open');
    $('header, main,footer').toggleClass('blur');
    $('body').toggleClass('overflow-hidden')

  });

  
  $.fn.make_carousel = function() {
    var speed = 0;
    var scroll = 0;
    var container = $(this);
    var container_w = container.width();
    var max_scroll = container[0].scrollWidth - container.outerWidth();
    var prev_frame = new Date().getTime();
    container.on('mousemove', function(e) {
        var mouse_x = e.pageX - container.offset().left;
        var mouseperc = 100 * mouse_x / container_w;
        speed = mouseperc - 50;
    }).on ( 'mouseleave', function() {
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
      if($(window).width() > 1200 ){
        $("#brands").make_carousel();
        
      }
      if($(window).width() < 768 ){
      $('#menu').prepend('<li><a href="/">Home</a></li>')
    }

});