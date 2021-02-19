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
    if($(window).width() < 968 ){
      $('#menu').prepend('<li><a href="/">Home</a></li>')
    }

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
    $(this).addClass('active');

    $($(this).find('a').attr('href')).addClass('active');
  })




  /*  $('.partners').mousemove(function (event) {
      event = event || window.event; // кроссбраузерность

      $('#brand').scrollLeft(event.offsetX)

      console.log(event.offsetX);


    })*/







  function initMap() {
    var element = document.getElementById('map');
    var options = {
      zoom: 16,
      center: {
        lat: 34.6981856,
        lng: 33.0682552
      }

    };


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

  $mq = $('.marquee').marquee({
    //duration in milliseconds of the marquee
    duration: 15000,
    //gap in pixels between the tickers
    gap: 50,
    //time in milliseconds before the marquee will start animating
    startVisible: true,
    delayBeforeStart: 0,
    //'left' or 'right'
    direction: 'left',
    //true or false - should the marquee be duplicated to show an effect of continues flow
    duplicated: true
  });


  //stop
  $mq.marquee('resume');

  //on hover start
  $mq.hover(function () {

    $mq.marquee('pause');
  }, function () {
    // $mq.marquee('pause');
    $mq.marquee('resume');
  })



  $('#nav-icon').click(function () {
    $('.hamburger').toggleClass('is-active')
    $('.nav').toggleClass('menu-open')

    $(this).toggleClass('open');
    $(this).parents('nav').toggleClass('open');
    $('#menu').toggleClass('open');
    $('header, main,footer').toggleClass('blur');
    $('body').toggleClass('overflow-hidden')

  });


});