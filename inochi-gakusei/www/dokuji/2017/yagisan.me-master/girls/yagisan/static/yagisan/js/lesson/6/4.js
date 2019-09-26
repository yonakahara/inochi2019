$(document).ready(function(){
  $(document).on('click', '.status_bar', function(e){
    var percentage = Math.round(e.offsetX / 4);
    $(this).find('.purple').width(percentage + '%');
    $(this).find('.percentage').html(percentage);

    if ($(this).parent('div').hasClass('expression_first')) {
      $('.six .expression_first .purple').width(percentage + '%');
      $('.six .expression_first .percentage').html(percentage);
    } else if ($(this).parent('div').hasClass('expression_second')) {
      $('.six .expression_second .purple').width(percentage + '%');
      $('.six .expression_second .percentage').html(percentage);
    } else if ($(this).parent('div').hasClass('expression_third')) {
      $('.six .expression_third .purple').width(percentage + '%');
      $('.six .expression_third .percentage').html(percentage);
    }
  });

  $(document).on('mousemove', '.status_bar', function(e){
    if (e.which == 1) { // clickされていたら
      var percentage = Math.round(e.offsetX / 4);
      $(this).find('.purple').width(percentage + '%');
      $(this).find('.percentage').html(percentage);

      if ($(this).parent('div').hasClass('expression_first')) {
        $('.six .expression_first .purple').width(percentage + '%');
        $('.six .expression_first .percentage').html(percentage);
      } else if ($(this).parent('div').hasClass('expression_second')) {
        $('.six .expression_second .purple').width(percentage + '%');
        $('.six .expression_second .percentage').html(percentage);
      } else if ($(this).parent('div').hasClass('expression_third')) {
        $('.six .expression_third .purple').width(percentage + '%');
        $('.six .expression_third .percentage').html(percentage);
      }
    }
  });

  $(document).on('keyup', '.two input', function(){
    var expression = $(this).val();
    var whichclass = $(this).attr('class').split(' ')[0];
    $('.six .' + whichclass).html(expression);
  });

  $(document).on('keyup', '.four textarea', function(){
    var content = $(this).val();
    content = content.replace(/\r\n/g, '\n');
    content = content.replace(/\r/g, '\n');
    var lines = content.split('\n');
    var replacedText = lines.join('<br>');

    var whichclass = $(this).attr('class').split(' ')[0];
    if (whichclass == 'reason') {
      $('.four .buts .left_but p').html(replacedText);
    } else if (whichclass == 'contradiction') {
      $('.four .buts .right_but p').html(replacedText);
    }
  });

  $(document).on('click', '#lesson_navi_button_post', function(ev){
    var situation = $('.one textarea').val();

    console.log(situation);

    var expressions = [];

    expressions.push({'expression': $('.two .expression_first_text').val(), 'strength': Number($('.two .expression_first .percentage').text())});
    expressions.push({'expression': $('.two .expression_second_text').val(), 'strength': Number($('.two .expression_second .percentage').text())});
    expressions.push({'expression': $('.two .expression_third_text').val(), 'strength': Number($('.two .expression_third .percentage').text())});

    console.log(expressions);

    var moment_idea_text = $('.three textarea').val();
    var moment_idea_strength = Number($('.three .percentage').text());

    console.log(moment_idea_text, moment_idea_strength);

    var reason = $('.four .left textarea').val();
    var contradiction = $('.four .right textarea').val();

    console.log(reason, contradiction);

    var adaptive_thinking = $('.five textarea').val();

    console.log(adaptive_thinking);

    var after_expressions_strength = [];

    after_expressions_strength.push(Number($('.six .expression_first .percentage').text()));
    after_expressions_strength.push(Number($('.six .expression_second .percentage').text()));
    after_expressions_strength.push(Number($('.six .expression_third .percentage').text()));

    console.log(after_expressions_strength);

    var answers = {'situation': situation, 'expressions': expressions, 'moment_idea_text': moment_idea_text, 'moment_idea_strength': moment_idea_strength,
                  'reason': reason, 'contradiction': contradiction, 'adaptive_thinking': adaptive_thinking, 'after_expressions_strength': after_expressions_strength};

    console.log(answers);

    // if (situation.length == 0 || expressions[0]['expression'] == '' || moment_idea_text.length == 0 || reason.length == 0 || contradiction.length == 0 || adaptive_thinking.length == 0) {
    if (situation.length == 0 || expressions[0]['expression'] == '') {
      alert('未記入の項目があります');
      ev.preventDefault();
      ev.stopPropagation();
      return false;
    }

    $.ajax({
      'url': '/lesson/set_mails',
      'type': 'POST',
      'data': {
        'answers': JSON.stringify(answers),
      },
      'dataType': 'json',
      'success': function(response) {
        console.log('set mails successed.');
      },
      'error': function(response) {
        console.log('set mails failed. logs are:');
        console.log(response);
        return false;
      },
    });
  });
});
