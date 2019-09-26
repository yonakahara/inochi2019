/* =====================================
  Preloader
======================================*/
$(window).on('load', function() {
  $('#status').fadeOut();
  $('#preloader').delay(350).fadeOut('slow');
});

/* =====================================
  Navbar
======================================*/

// show & hide white navbar
$(function() {

  //on page load
  showHideNav();

  //on scroll
  $(window).scroll(function() {
    showHideNav()
  });

  //show and hide white navbar
  function showHideNav() {
    if ($(window).scrollTop() > 50) {
      //show
      $("nav").addClass("white-navbar");

      $(".navbar-brand img:first").attr("src", "img/logo/logo-white.png");
      $(".navbar-brand img:first").hover(
        function(){
          $(this).attr("src", "img/logo/logo.png");
        },
        function(){
          $(this).attr("src", "img/logo/logo-white.png");
        }
      )


      //Back to Top button
      $("#back-to-top").fadeIn();
    } else {
      //hide
      $("nav").removeClass("white-navbar");

      $(".navbar-brand img:first").attr("src", "img/logo/logo.png");

      //Back to Top button
      $("#back-to-top").fadeOut();
    }
  }
});

//smooth scrolling
$(function() {
  $("a.smooth-scroll").click(function(event) {
    event.preventDefault();
    //get section id like #about, #services etc...
    var section_id = $(this).attr("href");
    $("html, body").animate({
      scrollTop: $(section_id).offset().top - 64
    }, 1250, "easeInOutExpo");
  });
});

/* =====================================
  Google Map
======================================*/

$(window).on('load', function() {

  var addressString = "コングレコンベンションセンター";
  var myLatLng = {
    lat: 34.705345,
    lng: 135.494593
  };

  // render map
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: myLatLng
  });

  // add marker
  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: "Click to see address",
  });

  // add info window
  var infoWindow = new google.maps.InfoWindow({
    content: addressString
  });

  // show info window when user clicks marker
  marker.addListener('click', function() {
    infoWindow.open(map, marker);
  });

  // resize
  google.maps.event.addDomListener(window, 'resize', function() {
    var center = map.getCenter();
    google.maps.event.trigger(map, 'resize');
    map.setCenter(center);
  });
});


/* =====================================
  Other guests
======================================*/
// if window's width >= 1200, don't owlCarousel

$(function() {
  $(".presenters").owlCarousel({
    items: 3,
    autoplay: true,
    smartspeed: 700,
    loop: true,
    autoplayHoverPause: true,
    nav: true,
    navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
    dots: false,
    responsive: {
      //breakpoint from 0 up
      0: {
        items: 1,
      },
      //breakpoint from 400 up
      768: {
        items: 3,
      }
    },
  });
});

$(function() {
  $(".other-guests").owlCarousel({
    items: 3,
    autoplay: true,
    smartspeed: 700,
    loop: true,
    autoplayHoverPause: true,
    nav: true,
    navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
    dots: false,
    responsive: {
      //breakpoint from 0 up
      0: {
        items: 3,
      },
      //breakpoint from 400 up
      768: {
        items: 4,
      }
    },
  });
});

/* =====================================
  Animation
======================================*/
// animate on scroll
$(function() {
  new WOW().init();
});

// home animation on page load
$(window).on('load', function() {
  $('#home-heading-1').addClass("animated fadeIn");
  $('#home-heading-2').addClass("animated fadeIn");
  $('#home-btn').addClass("animated zoomIn");
  $('#arrow-down i').addClass("animated fadeInDown infinite");
});
