$(document).ready(function(){

  var lessons = $('input[name=lessons]').val();
  console.log(lessons);
  console.log(JSON.parse(lessons));
  lessons = JSON.parse(lessons);
  console.log(lessons);
  $.each(lessons, function(index, val) {
    $('#lesson_button_'+val).find('img').removeClass('disable');
  });
  $("#lesson_button_first").on(mouseHover);
  $("#lesson_button_second").on(mouseHover);
  $("#lesson_button_third").on(mouseHover);
  $("#lesson_button_fourth").on(mouseHover);
  $("#lesson_button_fifth").on(mouseHover);
  $("#lesson_button_sixth").on(mouseHover);
  $(document).on('click', '#lesson_close', function() {
    window.open('about:blank','_self').close();
  });

  $(document).on('click', 'a.lesson_link', function(ev) {
    if ($(this).find('img.over').hasClass('disable')) {
      ev.preventDefault;
      return false;
    }
    return true;
  });

});
