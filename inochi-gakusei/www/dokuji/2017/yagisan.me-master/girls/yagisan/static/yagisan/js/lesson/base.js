$(document).ready(function(){

  var groupId = Number($('input[name=group_id]').val());
  var pageId = Number($('input[name=page_id]').val());
  var pageMax = Number($('input[name=page_max]').val());
  console.log('Here is Lesson '+groupId+' '+pageId+'/'+pageMax+'.');

  // buttons
  $(document).on('click', 'a.disable', function(){
    return false;
  });
  if (pageId > 1) {
    var prePageId = pageId-1;
    $('#lesson_navi_button_pre').closest('a').attr('href', '/lesson/'+groupId+'/'+prePageId);
  } else {
    $('#lesson_navi_button_pre').closest('a').addClass('disable');
    $('#lesson_navi_button_pre').find('img').addClass('disable');
  }
  if (pageId < pageMax) {
    var postPageId = pageId+1;
    $('#lesson_navi_button_post').closest('a').attr('href', '/lesson/'+groupId+'/'+postPageId);
  } else {
    $('#lesson_navi_button_post').closest('a').addClass('disable');
    $('#lesson_navi_button_post').find('img').addClass('disable');
    $('#lesson_navi_button_return').show();
    $('#lesson_navi_button_close').show();
  }
  $('#lesson_navi_button_pre').on(mouseHover);
  $('#lesson_navi_button_post').on(mouseHover);
  $('#lesson_navi_button_return').on(mouseHover);
  $('#lesson_navi_button_close').on(mouseHover);
  $(document).on('click', '#lesson_navi_button_return', function() {
    location.href = '/lesson';
  });
  $(document).on('click', '#lesson_navi_button_close', function() {
    window.open('about:blank','_self').close();
  });

});
