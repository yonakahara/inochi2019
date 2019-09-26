// JavaScript Document
var hover = function() {
    $(window).on('load resize orientationchange', function() {
        if($(window).width() <= 1024) {
//            $('.inochi-mirai-link').removeClass('mirai-hover');
//			$('.menu-link').removeClass('menu-hover');
//			$('.index-btn').removeClass('btn-hover');
//			$('.slider-link-box').removeClass('slider-link-box-hover');
//			$('.pageLink').removeClass('font-hover');
        } else {
//            $('.inochi-mirai-link').addClass('mirai-hover');
//			$('.menu-link').addClass('menu-hover');
//			$('.index-btn').addClass('btn-hover');
//			$('.slider-link-box').addClass('slider-link-box-hover');
//			$('.pageLink').addClass('font-hover');
        }
    });
}

$(function(){
    hover();
});





$(function() {
	
	$('.slider-link-box-hover').hover(
		function(){
			$(this).css('background-size','140%');
			$(this).find('.slider-black-zoom').fadeIn(300);
		},function(){
			$(this).css('background-size','cover');
			$(this).find('.slider-black-zoom').fadeOut(300);
		},'300');
	
	$('.header-modal-hover').hover(
		function(){
			$(this).children('.menu-slideDown-zone').slideDown(50);
		},function(){
			$(this).children('.menu-slideDown-zone').slideUp(50);
		},'0');
	
	/*$('.contact-hover').hover(
		function(){
			$(this).parent().css({'color':'#fff','background-color':'#CC2F1F'});
			$(this).css({'color':'#fff'});
		},function(){
			$(this).parent().css({'color':'#000','background-color':'#fff'});
			$(this).css({'color':'#000'});
		},'300');*/
	$('.link-box').hover(
		function(){
			$(this).find('.black-zoom').fadeIn();
			$(this).css({'background-size':'150%'});
		},function(){
			$('.black-zoom').fadeOut();
			$(this).css({'background-size':'100%'});
		},'300');
	
	
	
	
	$('.fa-bars').click(function(){
		$(this).fadeOut(0);
		$('.toggle-back').fadeIn(0);
		$('.toggle-menus').slideDown(300);
		$('.fa-times').fadeIn(0);
	});
	
	$('.fa-times').click(function(){
		$('.fa-times').fadeOut(0);
		$('.toggle-back').fadeOut(0);
		$('.toggle-menus').slideUp(300);
		
		$('.fa-bars').fadeIn(0);
	});
	
	
	$('.pageLink').click(function(){
		
		var link = $(this).attr('href');
		var linkPosition = $(link).offset().top;
		
		$('html,body').animate({
			'scrollTop':linkPosition
		},500);
		
	});
	
	$('.toggle-menus a').click(function(){
		$('.fa-times').fadeOut(0);
		$('.toggle-back').fadeOut(0);
		$('.toggle-menus').slideUp(300);
		
		$('.fa-bars').fadeIn(0);
		
	});
	
	
	function toggleChangeBtn() {
    var slideIndex = $('.slide').index($('.active'));
    $('.change-btn').show();
    if (slideIndex == 0) {
      $('.prev-btn').hide();
    // 「3」の部分を、lengthメソッドを用いて書き換えてください
    } else if ($('.slide').length-1) {
      $('.next-btn').hide();
    }
  }
  
  $('.index-btn').click(function() {
    $('.active').removeClass('active');
    var clickedIndex = $('.index-btn').index($(this));
    $('.slide').eq(clickedIndex).addClass('active');
    toggleChangeBtn();
  });
  
  $('.change-btn').click(function() {
    var $displaySlide = $('.active');
    $displaySlide.removeClass('active');
    if ($(this).hasClass('next-btn')) {
      $displaySlide.next().addClass('active');
    } else {
      $displaySlide.prev().addClass('active');
    }
    toggleChangeBtn();
  });
	
	
	$('.carousel').slick({
    dots: true,
    autoplay: true,
    centerMode: true,
    centerPadding: '20px',
  });

	
});

