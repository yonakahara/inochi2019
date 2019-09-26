$(document).ready(function(){
  $(document).on('click', '.yes input', function() {
    if ($(this).val() == 0) {
      $(this).val(1);
      $(this).attr('src', '/static/yagisan/img/lesson/3/4/yes_selected.png');
      $(this).closest('tr').find('.no input').attr('src', '/static/yagisan/img/lesson/3/4/no.png');
      $(this).closest('tr').find('.no input').val(0);
    }
  });

  $(document).on('click', '.no input', function() {
    if ($(this).val() == 0) {
      $(this).val(1);
      $(this).attr('src', '/static/yagisan/img/lesson/3/4/no_selected.png');
      $(this).closest('tr').find('.yes input').attr('src', '/static/yagisan/img/lesson/3/4/yes.png');
      $(this).closest('tr').find('.yes input').val(0);
    }
  });

  $(document).on('click', 'input', function() {
    $('#lesson_navi_button_post').closest('a').attr('href', '/lesson/3/5');
  });

  $(document).on('click', '#lesson_navi_button_post', function() {
    var check = 0;
    var how_many_yes = 0;
    $('tr').each(function(index){
      if ($(this).find('.yes input').val() == 0 && $(this).find('.no input').val() == 0) {
        check = 1;
      }
      if ($(this).find('.yes input').val() == 1) {
        how_many_yes += 1;
      }
    });

    if (check == 1) {
      $('#lesson_navi_button_post').closest('a').attr('href', '#');
    } else {
      $('#lesson_navi_button_post').closest('a').attr('href', '/lesson/3/5?how_many_yes=' + how_many_yes);
    }

    if ($(this).closest('a').attr('href') == '#') {
      alert('アサーション度チェックリストのすべての設問に回答してください');
    }
  });
});
