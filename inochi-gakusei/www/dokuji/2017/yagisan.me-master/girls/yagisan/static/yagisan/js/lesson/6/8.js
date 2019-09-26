$(document).ready(function(){

  $.ajax({
    'url': '/lesson/get_questionnaires',
    'type': 'POST',
    'data': { },
    'dataType': 'json',
    'success': function(results) {
      console.log('get questionnaires successed.');

      questionnaires = results.questionnaires;
      questionnaire_choices = results.questionnaire_choices;
      questionnaire_users = results.questionnaire_users;

      console.log(questionnaire_users);

      $.each(questionnaires, function(index, element){
        question_id = element.id;
        $('table').append(
          '<tr id=' + question_id + '>' +
          '<td class="question">' + element.sentence + '</td>' +
          '<td class="answer"></td>' +
          '</tr>'
        );
      });

      $.each(questionnaire_choices, function(index, element){
        questionnaire = element.questionnaire;
        answer_id = element.id;
        if (questionnaire != 5) {
          $('table tr#' + questionnaire + ' td.answer').append(
            '<div class="question_button" data-answer_id=' + answer_id + '>' +
            element.sentence +
            '</div>'
          );
        }
      });

      yagisan_numbers = [1, 2, 3, 4, 5, 6];
      $.each(yagisan_numbers, function(index, element){
        yagisan_src = '/static/yagisan/img/lesson/6/8/yagisan_'+ element +'.png';
        data_answer_id = Number(element) + 18;
        $('table tr#' + 5 + ' td.answer').append(
          '<div class="question_yagisan" data-answer_id=' + data_answer_id + '>' +
          '<img src=' + yagisan_src + '>' +
          '</div>'
        );
      });

      $.each(questionnaire_users, function(index, element){
        index += 1;
        $('tr#' + index + ' td.answer div[data-answer_id=' + element.questionnaire_choice + ']').trigger('click');
      });
    },
    'error': function(results) {
      console.log('get questionnaires failed. logs are:');
      console.log(results);
      return false;
    },
  });

  BasePink = '#f18b9c';
  BaseOrange = '#FF9966';
  $(document).on('click', '.question_button', function(){
    $(this).closest('td').find('.question_button').css('background-color', BasePink);
    $(this).closest('td').find('.question_button').removeClass('selected');
    $(this).css('background-color', BaseOrange);
    $(this).addClass('selected');
  });

  $(document).on('click', '.question_yagisan', function(){
    $(this).closest('td').find('.question_yagisan').css('border', 'none');
    $(this).css('border', 'solid 1px ' + BasePink);
    $(this).closest('td').find('.question_yagisan').removeClass('selected');
    $(this).addClass('selected');
  });

  // POST
  $(document).on('click', '#lesson_navi_button_post', function(ev){
    $(this).closest('a').attr('href', 'javascript:void(0)');
    var answers = {};

    question_ids = [1, 2, 3, 4, 5];
    $.each(question_ids, function(index, element){
      var key = 'question_' + element;
      var value = $('tr#' + element + ' div.selected').attr('data-answer_id');
      answers[key] = value;
      console.log(answers);
    });

    var answer_check = 0;
    $.each(Object.keys(answers), function(index, element){
      if (answers[element] == undefined) {
        answer_check = 1;
      }
    });
    if (answer_check == 1) {
      alert('未記入の項目があります');
      ev.preventDefault();
      ev.stopPropagation();
      return false;
    }

    $.ajax({
      'url': '/lesson/set_questionnaires',
      'type': 'POST',
      'data': {
        'answers': JSON.stringify(answers),
      },
      'dataType': 'json',
      'success': function(response) {
        console.log('set questionnaires successed.');
        window.location.href = '/lesson/6/9'
      },
      'error': function(response) {
        console.log('set questionnaires failed. logs are:');
        console.log(response);
        return false;
      },
    });
  });
});
