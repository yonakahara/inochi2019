// JavaScript Document
$(function() {
	
	
	$('.header-modal-hover').hover(
		function(){
			$(this).children('.menu-slideDown-zone').slideDown();
		},function(){
			$(this).children('.menu-slideDown-zone').slideUp();
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
});




var hover = function() {
    $(window).on('load resize orientationchange', function() {
        if($(window).width()<=768) {
            
			$('.menu-link').removeClass('menu-hover');
			$('.pageLink').removeClass('font-hover');
        } else {
           
			$('.menu-link').addClass('menu-hover');
			$('.pageLink').addClass('font-hover');
        }
    });
}

$(function(){
    hover();
});
