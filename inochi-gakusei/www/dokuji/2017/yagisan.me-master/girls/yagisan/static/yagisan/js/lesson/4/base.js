$(document).ready(function(){

  var sendDialogues = function(is_shared) {
    var dialogues = [];
    var flg = false;
    $('.dialogue_input').each(function(ev) {
      var dialogue_sex = $(this).attr('dialogue_sex');
      var dialogue_to = $(this).attr('dialogue_to');
      var dialogue_type = $(this).attr('dialogue_type');
      var dialogue = $(this).val();
      if (dialogue == '') {
        alert('空欄があります');
        flg = true;
        return false;
      }
      dialogues.push({
        'dialogue_sex': dialogue_sex,
        'dialogue_to': dialogue_to,
        'dialogue_type': dialogue_type,
        'dialogue': dialogue
      });
    });
    if (flg) {
      return false;
    }
    $.ajax({
      'url': '/dialogue/set',
      'type': 'POST',
      'data': {
        'dialogues': JSON.stringify(dialogues),
      },
      'dataType': 'json',
      'success': function(response) {
        console.log('set dialogues successed.');
        var url = location.href;
        console.log(url.split(/\/4\//));
        var page = url.split(/\/4\//)[1];
        url = url.split(/\/4\//)[0];
        page = Number(page)+1;
        url = url+'/4/'+page;
        window.location.href = url;
        return false;
      },
      'error': function(response) {
        console.log('set dialogues failed. logs are:');
        console.log(response);
        return false;
      },
    });
  }

  $(document).on('click', '#share_button', function(ev) {
    var is_shared = 1;
    sendDialogues(is_shared);
  });

  $(document).on('click', '#lesson_navi_button_post', function(ev) {
    if ($('#share_button').length) {
      $(this).closest('a').attr('href', 'javascript:void(0)');
      var is_shared = 0;
      sendDialogues(is_shared);
    }
  });

  $(document).on('click', '#lesson_navi_button_pre', function(ev) {
    if ($('#kind').length) {
      $(this).closest('a').attr('href', 'javascript:void(0)');
      window.location.href = "/lesson/4/4";
    }
  });

  if ($('#others_answer').length) {
    var dialogue_sex = $('input[name=dialogue_sex]').val();
    var dialogue_to = $('input[name=dialogue_to]').val();
    $.ajax({
      'url': '/dialogue/get_others',
      'type': 'POST',
      'data': {
        'dialogue_sex': dialogue_sex,
        'dialogue_to': dialogue_to,
      },
      'dataType': 'json',
      'success': function(response) {
        console.log('get others\' dialogues successed.');
        var results = response.results;
        results.forEach(function(dialogues, dialogues_index) {
          if (dialogues_index % 2 == 0) {
            var dialogueWrap = $('#dialogue_wrap').clone();
            dialogueWrap.removeClass('offscreen');
            dialogues.forEach(function(dialogue, dialogue_index) {
              dialogueWrap.find('#dialogue_first #dialogue_type_'+Number(dialogue_index+1)).find('span').html(dialogue.dialogue);
            });
            if (results[dialogues_index+1] !== undefined) {
              results[dialogues_index+1].forEach(function(dialogue, dialogue_index) {
                dialogueWrap.find('#dialogue_second #dialogue_type_'+Number(dialogue_index+1)).find('span').html(dialogue.dialogue);
              });
            } else {
              dialogueWrap.find('#dialogue_second').addClass('offscreen');
            }
            $('#dialogues').append(dialogueWrap);
          }
        });
        return false;
      },
      'error': function(response) {
        console.log('get others\' dialogues failed. logs are:');
        console.log(response);
        return false;
      },
    });
    $('#lesson_navi_button_close').show();
    $('#lesson_navi_button_return').show();
    $('#lesson_navi_button_post').hide();
    return true;
  }
});
