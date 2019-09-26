window.onload = $(function(){
	$("head").width($("body").width());
	$("h1").width($("body").width()-15);
	document.getElementById("aud").volume = 0.3;
	// ここに処理を記述します
	$(window).scroll(function (){
		var nY = $(window).scrollTop();
		//
		{
		var nav = 	$('.navbar');
			if(nY >= 1270){
				$(".navbar").addClass("navbar-fixed-top");
				$('.navbar-fixed-top').width($(body).width());
			}else{
				$(".navbar").removeClass("navbar-fixed-top");
			}
		};
		{
		var aud = document.getElementById("aud");
		var controler = Math.pow((nY-1800)/100,1/3)*0.18
			if(nY >= 1800 & controler <=0.5){
					aud.volume = 0.5 - controler;
					console.log(aud.volume);
					if (aud.volume <= 0.02) {
						aud.volume=0;
					}
			}
		};
	});

	$(function() {
    var w = $(window).width();
    var x = 768;
    if (w <= x) {
        $('#aud').remove();
        $('#video').remove();
        $('#bgm').remove();
        $('#animation').css("display","block");
        $('h1').css("font-size","7.0rem")
    }
	});

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


	function mute() {
		var TARGET = document.getElementById("aud");
		var TARGET2 = document.getElementById("bgm");
	    if(TARGET.muted){
        TARGET.muted = false;
        TARGET2.innerHTML = "BGM OFF X";
    	}else{
        TARGET.muted = true;
        TARGET2.innerHTML = "BGM ON";
    	}
	};

console.log(screen.width);

console.log(window.innerWidth);

console.log($('.navbar-fixed-top').width());


