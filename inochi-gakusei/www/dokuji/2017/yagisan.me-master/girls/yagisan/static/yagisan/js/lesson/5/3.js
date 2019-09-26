$(document).ready(function(){
  $.ajax({
    'url': '/lesson/get_fifthquestions',
    'type': 'POST',
    'data': { },
    'dataType': 'json',
    'success': function(questions) {
      console.log('get fifthquestions successed.');
      console.log('-----------------------------');
      console.log(questions.results);
      console.log('-----------------------------');
      $.ajax({
        'url': '/lesson/get_fifthquestion_answers',
        'type': 'POST',
        'data': { },
        'dataType': 'json',
        'success': function(answers) {
          console.log('get fifthquestion answers successed.');
          console.log('-----------------------------');
          console.log(answers.results);
          console.log('-----------------------------');

          $.each(questions.results, function(index, element){
            var element_clone = $('#tr_template').clone().removeClass('offscreen').removeAttr('id').attr('data-id', element.id);
            $(element_clone.find('td.first')).html(element.id + '.' + element.sentence);
            if (Object.keys(answers.results).length == 0) {
              element_clone.attr('value', 0);
            } else {
              var answer_value = answers.results[element.id - 1].answer
              element_clone.attr('value', answer_value);
              if (answer_value == 1) {
                element_clone.find('.second img').attr('src', '/static/yagisan/img/lesson/5/3/1_on.png');
                element_clone.closest('tr').find('.third img').attr('src', '/static/yagisan/img/lesson/5/3/2.png');
                element_clone.closest('tr').find('.fourth img').attr('src', '/static/yagisan/img/lesson/5/3/3.png');
                element_clone.closest('tr').find('.fifth img').attr('src', '/static/yagisan/img/lesson/5/3/4.png');
              } else if (answer_value == 2) {
                element_clone.find('.second img').attr('src', '/static/yagisan/img/lesson/5/3/1.png');
                element_clone.closest('tr').find('.third img').attr('src', '/static/yagisan/img/lesson/5/3/2_on.png');
                element_clone.closest('tr').find('.fourth img').attr('src', '/static/yagisan/img/lesson/5/3/3.png');
                element_clone.closest('tr').find('.fifth img').attr('src', '/static/yagisan/img/lesson/5/3/4.png');
              } else if (answer_value == 3) {
                element_clone.find('.second img').attr('src', '/static/yagisan/img/lesson/5/3/1.png');
                element_clone.closest('tr').find('.third img').attr('src', '/static/yagisan/img/lesson/5/3/2.png');
                element_clone.closest('tr').find('.fourth img').attr('src', '/static/yagisan/img/lesson/5/3/3_on.png');
                element_clone.closest('tr').find('.fifth img').attr('src', '/static/yagisan/img/lesson/5/3/4.png');
              } else if (answer_value == 4) {
                element_clone.find('.second img').attr('src', '/static/yagisan/img/lesson/5/3/1.png');
                element_clone.closest('tr').find('.third img').attr('src', '/static/yagisan/img/lesson/5/3/2.png');
                element_clone.closest('tr').find('.fourth img').attr('src', '/static/yagisan/img/lesson/5/3/3.png');
                element_clone.closest('tr').find('.fifth img').attr('src', '/static/yagisan/img/lesson/5/3/4_on.png');
              }
            }
            $('table').append(element_clone);
          });
        },
        'error': function(response) {
          console.log('get fifthquestion answers failed. logs are:');
          console.log(response);
          return false;
        },
      });
    },
    'error': function(response) {
      console.log('get fifthquestions failed. logs are:');
      console.log(response);
      return false;
    },
  });

  $(document).on('click', '.second img', function(){
    $(this).closest('tr').attr('value', 1);
    $(this).closest('tr').find('.second img').attr('src', '/static/yagisan/img/lesson/5/3/1_on.png');
    $(this).closest('tr').find('.third img').attr('src', '/static/yagisan/img/lesson/5/3/2.png');
    $(this).closest('tr').find('.fourth img').attr('src', '/static/yagisan/img/lesson/5/3/3.png');
    $(this).closest('tr').find('.fifth img').attr('src', '/static/yagisan/img/lesson/5/3/4.png');
  });
  $(document).on('click', '.third img', function(){
    $(this).closest('tr').attr('value', 2);
    $(this).closest('tr').find('.second img').attr('src', '/static/yagisan/img/lesson/5/3/1.png');
    $(this).closest('tr').find('.third img').attr('src', '/static/yagisan/img/lesson/5/3/2_on.png');
    $(this).closest('tr').find('.fourth img').attr('src', '/static/yagisan/img/lesson/5/3/3.png');
    $(this).closest('tr').find('.fifth img').attr('src', '/static/yagisan/img/lesson/5/3/4.png');
  });
  $(document).on('click', '.fourth img', function(){
    $(this).closest('tr').attr('value', 3);
    $(this).closest('tr').find('.second img').attr('src', '/static/yagisan/img/lesson/5/3/1.png');
    $(this).closest('tr').find('.third img').attr('src', '/static/yagisan/img/lesson/5/3/2.png');
    $(this).closest('tr').find('.fourth img').attr('src', '/static/yagisan/img/lesson/5/3/3_on.png');
    $(this).closest('tr').find('.fifth img').attr('src', '/static/yagisan/img/lesson/5/3/4.png');
  });
  $(document).on('click', '.fifth img', function(){
    $(this).closest('tr').attr('value', 4);
    $(this).closest('tr').find('.second img').attr('src', '/static/yagisan/img/lesson/5/3/1.png');
    $(this).closest('tr').find('.third img').attr('src', '/static/yagisan/img/lesson/5/3/2.png');
    $(this).closest('tr').find('.fourth img').attr('src', '/static/yagisan/img/lesson/5/3/3.png');
    $(this).closest('tr').find('.fifth img').attr('src', '/static/yagisan/img/lesson/5/3/4_on.png');
  });

  $(document).on('click', '#lesson_navi_button_post', function(ev){
    var answers = [];

    $('tr').each(function (index, element) {
      if ($(element).attr('data-id') != 0) {
        var question_id = $(element).attr('data-id');
        var choice = $(element).attr('value');

        if (choice == 0) {
          alert('未選択の質問があります');
          ev.preventDefault();
          ev.stopPropagation();
          return false;
        }
        answers.push({'question_id': question_id, 'choice': choice});
      }
    });

    $.ajax({
      'url': '/lesson/set_fifthquestion_answers',
      'type': 'POST',
      'data': {
        'answers': JSON.stringify(answers),
      },
      'dataType': 'json',
      'success': function(response) {
        console.log('set fifthquestion answers successed.');
      },
      'error': function(response) {
        console.log('set fifthquestion answers failed. logs are:');
        console.log(response);
        return false;
      },
    });
  });
});
