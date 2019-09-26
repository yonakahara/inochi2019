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


function initialize() {
  var latlng = new google.maps.LatLng(34.705897, 135.494451);
  var myOptions = {
    zoom: 18,/*拡大比率*/
    center: latlng,/*表示枠内の中心点*/
    mapTypeControlOptions: { mapTypeIds: ['sample', google.maps.MapTypeId.ROADMAP] }/*表示タイプの指定*/
  };
  var map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);
 
  /*アイコン設定▼*/
  var icon = new google.maps.MarkerImage('../img/ico.png',
    new google.maps.Size(55,72),/*アイコンサイズ設定*/
    new google.maps.Point(0,0)/*アイコン位置設定*/
    );
  var markerOptions = {
    position: latlng,
    map: map,
    icon: icon,
    title: 'inochi学生フォーラム'
  };
  var marker = new google.maps.Marker(markerOptions);
　/*アイコン設定ここまで▲*/
 
  /*取得スタイルの貼り付け*/
  var styleOptions = [
  {
    "stylers": [
    { "saturation": -100 },
    { "visibility": "simplified" },
    { "lightness": 22 }
    ]
  }
  ];
  var styledMapOptions = { name: 'inochi学生フォーラム' }
  var sampleType = new google.maps.StyledMapType(styleOptions, styledMapOptions);
  map.mapTypes.set('sample', sampleType);
  map.setMapTypeId('sample');
}
google.maps.event.addDomListener(window, 'load', initialize);



