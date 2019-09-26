window.onload = $(function(){
	$("head").width($("body").width());
	$("h1").width($("body").width()-15);
	$('h1').removeAttr('style');

	$('.animation_in').css('visibility','hidden');
	$(window).scroll(function(){
	 var windowHeight = $(window).height(),
	     topWindow = $(window).scrollTop();
	 $('.animation_in').each(function(){
	  var targetPosition = $(this).offset().top;
	  if(topWindow > targetPosition - windowHeight + 230){
	   $(this).addClass("fadeInDown");
	  }
	 });
	});

});

$(function(){
   $('a[href^=#]').click(function() {
      var speed = 600;
      var href= $(this).attr("href");
      var target = $(href == "#" || href == "" ? 'html' : href);
      var position = target.offset().top - 30;
      $('body,html').animate({scrollTop:position}, speed, 'swing');
      return false;
   });
});





