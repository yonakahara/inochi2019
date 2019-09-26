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



$(function(){
	var request = [
		'https://www.youtube.com/watch?v=5BnEYHmAFaE',
		'https://www.youtube.com/watch?v=0bWHBlMMrXA',
		'https://www.youtube.com/watch?v=aAyqFEHYfeo',
		'https://www.youtube.com/watch?v=3SusNyyJ2Ms',
		'https://www.youtube.com/watch?v=_36gCJY-onA',
		'https://www.youtube.com/watch?v=a84hoUjYobk',
		'https://www.youtube.com/watch?v=owQost95Qyw',
		'https://www.youtube.com/watch?v=leii-uXjo54',
		'https://www.youtube.com/watch?v=V64BrrUeM8c',
		'https://www.youtube.com/watch?v=BV-3kH_QQVc',
		'https://www.youtube.com/watch?v=VpYthBeiy8o',
		'https://www.youtube.com/watch?v=-LqRpuFvPns'	
	];

	for (var i = 0; i < request.length; i++) {
		(function(i){
			$.ajax({
				url: 'http://graph.facebook.com/?id=' + encodeURIComponent( request[i] ) ,
				dataType: 'jsonp' ,
				success:function( obj )	{
					var count = 0 ;

					if( obj.share.share_count ) {
						count = obj.share.share_count ;
					}

					num = i + 1;
					var result = '#result_' + num;
					$(result).html( count ) ;
				} ,

				error:function() {
					alert("通信に失敗しました…。");

				} ,

				complete:function() {
					return false ;
				}

			}) ;
		})(i);
	}
});




