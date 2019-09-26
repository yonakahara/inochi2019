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
	
	
	
	
	/*モーダル*/
	
	
	$('.btn1').click(function(){
		$('.modal-1').fadeIn();
	});
	$('.btn2').click(function(){
		$('.modal-2').fadeIn();
	});
	$('.btn3').click(function(){
		$('.modal-3').fadeIn();
	});
	$('.btn4').click(function(){
		$('.modal-4').fadeIn();
	});
	$('.btn5').click(function(){
		$('.modal-5').fadeIn();
	});
	$('.btn6').click(function(){
		$('.modal-6').fadeIn();
	});
	$('.btn7').click(function(){
		$('.modal-7').fadeIn();
	});
	$('.btn8').click(function(){
		$('.modal-8').fadeIn();
	});
	$('.btn9').click(function(){
		$('.modal-9').fadeIn();
	});
	$('.btn10').click(function(){
		$('.modal-10').fadeIn();
	});
	$('.btn11').click(function(){
		$('.modal-11').fadeIn();
	});
	$('.btn12').click(function(){
		$('.modal-12').fadeIn();
	});
	$('.btn13').click(function(){
		$('.modal-13').fadeIn();
	});
	$('.btn14').click(function(){
		$('.modal-14').fadeIn();
	});
	$('.btn15').click(function(){
		$('.modal-15').fadeIn();
	});
	$('.btn16').click(function(){
		$('.modal-16').fadeIn();
	});
	$('.btn17').click(function(){
		$('.modal-17').fadeIn();
	});
	$('.btn18').click(function(){
		$('.modal-18').fadeIn();
	});
	$('.btn19').click(function(){
		$('.modal-19').fadeIn();
	});
	$('.btn20').click(function(){
		$('.modal-20').fadeIn();
	});
	$('.btn21').click(function(){
		$('.modal-21').fadeIn();
	});
	$('.btn22').click(function(){
		$('.modal-22').fadeIn();
	});
	$('.btn23').click(function(){
		$('.modal-23').fadeIn();
	});
	$('.btn24').click(function(){
		$('.modal-24').fadeIn();
	});
	$('.btn25').click(function(){
		$('.modal-25').fadeIn();
	});
	$('.btn26').click(function(){
		$('.modal-26').fadeIn();
	});
	$('.btn27').click(function(){
		$('.modal-27').fadeIn();
	});
	$('.btn28').click(function(){
		$('.modal-28').fadeIn();
	});
	$('.btn29').click(function(){
		$('.modal-29').fadeIn();
	});
	$('.btn30').click(function(){
		$('.modal-30').fadeIn();
	});
	$('.btn31').click(function(){
		$('.modal-31').fadeIn();
	});
	$('.btn32').click(function(){
		$('.modal-32').fadeIn();
	});
	$('.btn33').click(function(){
		$('.modal-33').fadeIn();
	});
	$('.btn34').click(function(){
		$('.modal-34').fadeIn();
	});
	$('.btn35').click(function(){
		$('.modal-35').fadeIn();
	});
	$('.btn36').click(function(){
		$('.modal-36').fadeIn();
	});
	$('.btn37').click(function(){
		$('.modal-37').fadeIn();
	});
	$('.btn38').click(function(){
		$('.modal-38').fadeIn();
	});
	$('.btn39').click(function(){
		$('.modal-39').fadeIn();
	});
	$('.btn40').click(function(){
		$('.modal-40').fadeIn();
	});
	$('.btn41').click(function(){
		$('.modal-41').fadeIn();
	});
	$('.btn42').click(function(){
		$('.modal-42').fadeIn();
	});
	$('.btn43').click(function(){
		$('.modal-43').fadeIn();
	});
	$('.btn44').click(function(){
		$('.modal-44').fadeIn();
	});
	$('.btn45').click(function(){
		$('.modal-45').fadeIn();
	});
	$('.btn46').click(function(){
		$('.modal-46').fadeIn();
	});
	$('.btn47').click(function(){
		$('.modal-47').fadeIn();
	});
	$('.btn48').click(function(){
		$('.modal-48').fadeIn();
	});
	$('.btn49').click(function(){
		$('.modal-49').fadeIn();
	});
	$('.btn50').click(function(){
		$('.modal-50').fadeIn();
	});
	
	
	
	$('.btn1').click(function(){
		$('.modal-1').fadeIn();
	});
	
	/*モーダル*/
	
	
	
	$('.fa-window-close').click(function(){
		$('.modal-wrapper').fadeOut();
	});
	
});








var hover = function() {
    $(window).on('load resize orientationchange', function() {
        if($(window).width()<=768) {
            $('.team-contents-btn').removeClass('btn-hover');
			$('.menu-link').removeClass('menu-hover');
			$('.year').removeClass('year-hover');
			$('.pageLink').removeClass('font-hover');
        } else {
            $('.team-contents-btn').addClass('btn-hover');
			$('.year').addClass('year-hover');
			$('.pageLink').addClass('font-hover');
        }
    });
}

$(function(){
    hover();
});
