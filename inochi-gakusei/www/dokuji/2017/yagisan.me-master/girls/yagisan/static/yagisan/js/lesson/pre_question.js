$(document).ready(function(){

  var is_last = $('input[name=is_last]').val();

  if (is_last == 1) {
    console.log('and here is last_question.');
    $('#question_desc').html('Lessonを受けた後に');
    $('#graph_button').html('次へ');
    var user_sex = $('input[name=user_sex]').val();
    var disable_sex = (user_sex == 1) ? 2 : 1;
    $('#first_question_button[answer="' + disable_sex + '"]').addClass('disable');
  }

  var progressValue = 0;
  $("#progressbar").progressbar({ value: progressValue });

  var getFirstQuestion = function(group, number) {
    $.ajax({
      'url': '/question/get_first',
      'type': 'POST',
      'data': {
        'group': group,
        'number': number,
      },
      'dataType': 'json',
      'success': function(response) {
        console.log('get first question successed.');
        $('#question_sentence').html(response.sentence);
        $('#question_sentence').attr('group', response.group);
        $('#question_sentence').attr('number', response.number);
        $('#group_desc').html(response.group_desc);
        $('.question_button[answer=1]').html(response.first);
        $('.question_button[answer=2]').html(response.second);
        $('.question_button[answer=3]').html(response.third);
        $('.question_button[answer=4]').html(response.fourth);
        $('#question').fadeIn();
        return false;
      },
      'error': function(response) {
        console.log('get first question failed. logs are:');
        console.log(response);
        return false;
      },
    });
  };

  var drawGraph = function() {
    // Getting Data
    $.ajax({
      'url': '/question/result',
      'type': 'POST',
      'data': {
        is_last: 0,
      },
      'dataType': 'json',
      'success': function(response) {
        console.log('set/get question successed.');
        var results = response.result
        var first_1 = 0;
        var first_2 = 0;
        var first_3 = 0;
        var first_4 = 0;
        var first_5 = 0;
        var first_6 = 0;
        var first_7 = 0;
        var first_8 = 0;
        var first_9 = 0;
        var second_1 = 0;
        var second_2 = 0;
        var second_3 = 0;
        var second_4 = 0;
        var second_5 = 0;
        var second_6 = 0;
        var third_1 = 0;
        var third_2 = 0;
        var third_3 = 0;
        var third_4 = 0;
        $.each(results, function(index, result) {
          if (result.question >= 1 && result.question <= 3 ) {
            first_1 += result.answer;
          } else if (result.question >= 4 && result.question <= 6 ) {
            first_2 += result.answer;
          } else if (result.question == 7) {
            first_3 += result.answer;
          } else if (result.question >= 12 && result.question <= 13) {
            first_4 += result.answer;
          } else if (result.question == 14) {
            first_4 += (5 - result.answer);
          } else if (result.question == 15) {
            first_5 += result.answer;
          } else if (result.question >= 8 && result.question <= 10) {
            first_6 += result.answer;
          } else if (result.question == 11) {
            first_7 += (5 - result.answer);
          } else if (result.question == 16) {
            first_8 += (5 - result.answer);
          } else if (result.question == 17) {
            first_9 += (5 - result.answer);
          } else if (result.question >= 18 && result.question <= 20) {
            second_1 += result.answer;
          } else if (result.question >= 21 && result.question <= 23) {
            second_2 += result.answer;
          } else if (result.question >= 24 && result.question <= 26) {
            second_3 += result.answer;
          } else if (result.question >= 27 && result.question <= 29) {
            second_4 += result.answer;
          } else if (result.question >= 30 && result.question <= 35) {
            second_5 += result.answer;
          } else if (result.question >= 36 && result.question <= 46) {
            second_6 += result.answer;
          } else if (result.question == 47 || result.question == 50 || result.question == 53) {
            third_1 += result.answer;
          } else if (result.question == 48 || result.question == 51 || result.question == 54) {
            third_2 += result.answer;
          } else if (result.question == 49 || result.question == 52 || result.question == 55) {
            third_3 += result.answer;
          } else if (result.question >= 56 && result.question <= 57) {
            third_4 += result.answer;
          }
        });
        first_1 = (first_1 >= 11) ? 1 : (first_1 >= 9) ? 2 : (first_1 >= 6) ? 3 : (first_1 >= 4) ? 4 : 5;
        first_2 = (first_2 >= 11) ? 1 : (first_2 >= 9) ? 2 : (first_2 >= 7) ? 3 : (first_2 >= 5) ? 4 : 5;
        first_3 = (first_3 >= 4) ? 2 : (first_3 >= 3) ? 3 : (first_3 >= 2) ? 4 : 5;
        first_4 = (first_4 >= 12) ? 1 : (first_4 >= 10) ? 2 : (first_4 >= 8) ? 3 : (first_4 >= 6) ? 4 : 5;
        first_5 = (first_5 >= 4) ? 1 : (first_5 >= 3) ? 3 : (first_5 >= 2) ? 4 : 5;
        first_6 = (first_6 >= 12) ? 1 : (first_6 >= 10) ? 2 : (first_6 >= 7) ? 3 : (first_6 >= 5) ? 4 : 5;
        first_7 = first_7;
        first_8 = (first_8 >= 4) ? 1 : (first_8 >= 3) ? 2 : (first_8 >= 2) ? 3 : 5;
        first_9 = (first_9 >= 4) ? 1 : (first_9 >= 3) ? 2 : (first_9 >= 2) ? 3 : 5;
        second_1 = (second_1 <= 3) ? 1 : (second_1 <= 5) ? 2 : (second_1 <= 7) ? 3 : (second_1 <= 9) ? 4 : 5;
        second_2 = (second_2 <= 3) ? 1 : (second_2 <= 5) ? 2 : (second_2 <= 8) ? 3 : (second_2 <= 10) ? 4 : 5;
        second_3 = (second_3 <= 3) ? 1 : (second_3 <= 5) ? 2 : (second_3 <= 8) ? 3 : (second_3 <= 11) ? 4 : 5;
        second_4 = (second_4 <= 3) ? 1 : (second_4 <= 4) ? 2 : (second_4 <= 7) ? 3 : (second_4 <= 10) ? 4 : 5;
        second_5 = (second_5 <= 6) ? 1 : (second_5 <= 8) ? 2 : (second_5 <= 12) ? 3 : (second_5 <= 17) ? 4 : 5;
        second_6 = (second_6 <= 13) ? 1 : (second_6 <= 17) ? 2 : (second_6 <= 23) ? 3 : (second_6 <= 29) ? 4 : 5;
        third_1 = (third_1 >= 12) ? 1 : (third_1 >= 10) ? 2 : (third_1 >= 8) ? 3 : (third_1 >= 5) ? 4 : 5;
        third_2 = (third_2 >= 10) ? 1 : (third_2 >= 8) ? 2 : (third_2 >= 6) ? 3 : (third_2 >= 4) ? 4 : 5;
        third_3 = (third_3 >= 9) ? 1 : (third_3 >= 7) ? 2 : (third_3 >= 6) ? 3 : (third_3 >= 4) ? 4 : 5;
        third_4 = (third_4 >= 7) ? 1 : (third_4 >= 6) ? 2 : (third_4 >= 4) ? 3 : (third_4 >= 3) ? 4 : 5;
        var first = new Object();
        first.data = {
          labels: [
            '心理的な仕事の負担（量）',
            '心理的な仕事の負担（質',
            '自覚的な身体的負担度',
            '職場の対人関係でのストレス',
            '職場環境によるストレス',
            '仕事のコントロール度',
            'あなたの技能の活用度',
            'あなたが感じている仕事の適性度',
            '働き甲斐',
          ],
          datasets: [
            {
              data: [first_1, first_2, first_3, first_4, first_5, first_6, first_7, first_8, first_9],
              backgroundColor: 'rgba(255, 0, 0, 0.2)',
              borderColor: 'rgba(255, 0, 0, 0.5)',
            },
            {
              data: [5, 5, 5, 5, 5, 5, 5, 5, 5],
              backgroundColor: 'rgba(0, 0, 0, 0)',
              borderColor: 'rgba(0, 0, 0, 0)',
              pointRadius: 0,
            },
            {
              data: [1, 1, 1, 1, 1, 1, 1, 1, 1],
              pointRadius: 0,
            },
            {
              data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
              backgroundColor: 'rgba(0, 0, 0, 0)',
              borderColor: 'rgba(0, 0, 0, 0)',
              pointRadius: 0,
            }
          ],
        };
        first.options = {
          legend: {
            display: false,
          },
        };
        var second = new Object();
        second.data = {
          labels: [
            '活気',
            'イライラ感',
            '疲労感',
            '不安感',
            '抑うつ感',
            '身体愁訴',
          ],
          datasets: [
            {
              data: [second_1, second_2, second_3, second_4, second_5, second_6],
              backgroundColor: 'rgba(0, 255, 0, 0.2)',
              borderColor: 'rgba(0, 255, 0, 0.5)',
            },
            {
              data: [5, 5, 5, 5, 5, 5],
              backgroundColor: 'rgba(0, 0, 0, 0)',
              borderColor: 'rgba(0, 0, 0, 0)',
              pointRadius: 0,
            },
            {
              data: [1, 1, 1, 1, 1, 1],
              pointRadius: 0,
            },
            {
              data: [0, 0, 0, 0, 0, 0],
              backgroundColor: 'rgba(0, 0, 0, 0)',
              borderColor: 'rgba(0, 0, 0, 0)',
              pointRadius: 0,
            }
          ],
        };
        second.options = {
          legend: {
            display: false,
          },
        };
        var third = new Object();
        third.data = {
          labels: [
            '上司からのサポート',
            '同僚からのサポート',
            '家族や友人からのサポート',
            '仕事や生活の満足度',
          ],
          datasets: [
            {
              data: [third_1, third_2, third_3, third_4],
              backgroundColor: 'rgba(0, 0, 255, 0.2)',
              borderColor: 'rgba(0, 0, 255, 0.5)',
            },
            {
              data: [5, 5, 5, 5],
              backgroundColor: 'rgba(0, 0, 0, 0)',
              borderColor: 'rgba(0, 0, 0, 0)',
              pointRadius: 0,
            },
            {
              data: [1, 1, 1, 1],
              pointRadius: 0,
            },
            {
              data: [0, 0, 0, 0],
              backgroundColor: 'rgba(0, 0, 0, 0)',
              borderColor: 'rgba(0, 0, 0, 0)',
              pointRadius: 0,
            }
          ],
        };
        third.options = {
          legend: {
            display: false,
          },
        };
        // Drawing Chartts
        var firstCtx = $("#first_graph");
        var firstChart = new Chart(firstCtx, {
          type: 'radar',
          data: first.data,
          options: first.options,
        });
        var secondCtx = $("#second_graph");
        var secondChart = new Chart(secondCtx, {
          type: 'radar',
          data: second.data,
          options: second.options,
        });
        var thirdCtx = $("#third_graph");
        var thirdChart = new Chart(thirdCtx, {
          type: 'radar',
          data: third.data,
          options: third.options,
        });
      },
    });
  };

  $(document).on('click', '#first_question_button', function(ev) {
    ev.preventDefault;
    if ($(this).hasClass('disable')) {
      return false;
    }
    if (is_last == 1) {
      $('#first_question').hide();
      $('#question').fadeIn();
      var group = $('#question_sentence').attr('group');
      var number = $('#question_sentence').attr('number');
      getFirstQuestion(group, number);
      return false;
    }
    var sex = Number($(this).attr('answer'));
    $.ajax({
      'url': '/user/set_sex',
      'type': 'POST',
      'data': {
        'sex': sex,
      },
      'dataType': 'json',
      'success': function(response) {
        console.log('set sex successed.');
        $('#first_question').hide();
        $('#pre_question').show();
        return false;
      },
      'error': function(response) {
        console.log('set sex failed. logs are:');
        console.log(response);
        return false;
      },
    });
    return false;
  });

  $(document).on('click', '#pre_questions_button', function(ev) {
    ev.preventDefault;
    var answers = [];
    var flg = false;
    $('#pre_questions .pre_question').each(function(ev) {
      var question_id = $(this).find('select').attr('name');
      var choice_id = $(this).find('select').val();
      if (!choice_id) {
        alert('未選択の質問があります');
        flg = true;
        return false;
      }
      answers.push({'question_id': question_id, 'choice_id': choice_id});
    });
    if (flg) {
      return false;
    }
    $.ajax({
      'url': '/user/set_answers',
      'type': 'POST',
      'data': {
        'answers': JSON.stringify(answers),
      },
      'dataType': 'json',
      'success': function(response) {
        console.log('set answers successed.');
        console.log(response);
        var group = $('#question_sentence').attr('group');
        var number = $('#question_sentence').attr('number');
        $('#pre_question').hide();
        $('#question').fadeIn();
        getFirstQuestion(group, number);
      },
      'error': function(response) {
        console.log('set answers failed. logs are:');
        console.log(response);
        return false;
      },
    });
    return false;
  });

  $(document).on('click', '#question_button', function(ev) {
    ev.preventDefault;
    var answer = $(this).attr('answer');
    var group = $('#question_sentence').attr('group');
    var number = $('#question_sentence').attr('number');
    var data = {
      'answer': answer,
      'group': group,
      'number': number,
    };
    if (is_last == 1 ) {
      data.is_last = 1;
    } else {
      data.is_last = 0;
    }
    $('#question #group_desc').hide();
    $('#question #question_sentence').hide();
    $('#question #question_buttons').hide();
    $.ajax({
      'url': '/question/set_and_get',
      'type': 'POST',
      'data': data,
      'dataType': 'json',
      'success': function(response) {
        console.log('set/get question successed.');
        if (response.result == 'finish') {
          $('#question').hide();
          $('.graphs').fadeIn();
          drawGraph();
          return false;
        }
        $('#question_sentence').html(response.sentence);
        $('#question_sentence').attr('group', response.group);
        $('#question_sentence').attr('number', response.number);
        $('#group_desc').html(response.group_desc);
        $('.question_button[answer=1]').html(response.first);
        $('.question_button[answer=2]').html(response.second);
        $('.question_button[answer=3]').html(response.third);
        $('.question_button[answer=4]').html(response.fourth);
        progressValue += 100/57;
        $('#progressbar').progressbar({ value: progressValue });
        $('#question #group_desc').fadeIn();
        $('#question #question_sentence').fadeIn();
        $('#question #question_buttons').fadeIn();
        return false;
      },
      'error': function(response) {
        console.log('set/gte question failed. logs are:');
        console.log(response);
        return false;
      },
    });
    return false;
  });

  $(document).on('click', '#graph_button', function(ev) {
    ev.preventDefault;
    if (is_last == 1) {
      window.location.href = "/lesson/6/8";
    } else {
      window.location.href = "/lesson";
    }
  });
});
