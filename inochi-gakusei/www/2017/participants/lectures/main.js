/*-------------------------------------------------------------------------------
Animation Scripts
--------------------------------------------------------------------------------*/
$(window).onload = $(function(){
	$('.animation_in').css('visibility','hidden');
	$(window).scroll(function(){
	 var windowHeight = $(window).height(),
	     topWindow = $(window).scrollTop();
	 $('.animation_in').each(function(){
	  var targetPosition = $(this).offset().top;
	  if(topWindow > targetPosition - windowHeight + 500){
	   $(this).addClass("fadeInDown");
	  }
	 });
	});
});

$(document).ready(function(){
	  	var sw = 1;
  $(document).on('click','#op_cl',function(){
	var op_cl = $(this).attr('src');  	
  	if (sw == 1) {
	      $(this).attr("src",'../img/open.png');
	      $('#slide_').css({'opacity':'0','display':'none'});
	      $('#slide > p').css('opacity','0');
	      $('#slide > p > #slide_title').text('View Slides');
	      $('#slide > p > #link').css('display','none');
	      $('#slide > p > img').css('width','40px');
	      $('#slide > p').animate({opacity:1},1500);
	    sw = 0;
	} else {
	      $(this).attr("src",'../img/close.png');
	      $('#slide_').css({'opacity':'0','display':'block'});
	      $('#slide > p').css('opacity','0');
	      $('#slide > p > #slide_title').text('Presentation Slides (You can resize slide on bottom-right.)');
	      $('#slide > p > #link').css('display','inline');
	      $('#slide > p > img').css('width','20px');
	      $('#slide_').animate({opacity:1},1500);
	      $('#slide > p').animate({opacity:1},1500);
	    sw = 1;
	};
  });


});