$(document).ready(function(){
  $.ajax({
    'url': '/lesson/get_fifthquestion_answers',
    'type': 'POST',
    'data': {},
    'dataType': 'json',
    'success': function(response) {
      console.log('get fifthquestion answers successed.');

      var opinionated = ['opinionated', 0];
      var white_black = ['white_black', 0];
      var regret = ['regret', 0];
      var blame_yourself = ['blame_yourself', 0];
      var read_deep = ['read_deep', 0];
      var prefetch = ['prefetch', 0];

      $.each(response.results, function(index, element){
        if (element.fifthquestion == 6 || element.fifthquestion == 11 || element.fifthquestion == 15) {
          opinionated[1] += parseInt(element.answer);
        }
        if (element.fifthquestion == 7 || element.fifthquestion == 13 || element.fifthquestion == 16) {
          white_black[1] += parseInt(element.answer);
        }
        if (element.fifthquestion == 8 || element.fifthquestion == 9 || element.fifthquestion == 17) {
          regret[1] += parseInt(element.answer);
        }
        if (element.fifthquestion == 5 || element.fifthquestion == 12 || element.fifthquestion == 18) {
          blame_yourself[1] += parseInt(element.answer);
        }
        if (element.fifthquestion == 2 || element.fifthquestion == 4 || element.fifthquestion == 14) {
          read_deep[1] += parseInt(element.answer);
        }
        if (element.fifthquestion == 1 || element.fifthquestion == 3 || element.fifthquestion == 10) {
          prefetch[1] += parseInt(element.answer);
        }
      });

      // 最大のキーを取る
      var data = [opinionated[1], white_black[1], regret[1], blame_yourself[1], read_deep[1], prefetch[1]];
      var max_value = Math.max(...data);
      var habit_list = [opinionated, white_black, regret, blame_yourself, read_deep, prefetch];
      var labels = $.map(habit_list, function(habit, index){
        var text = $('.habits').find('.'+habit[0]).find('h4').text().replace('【', '').replace('】', '');
        if (text.length > 6) {
          text = text.substring(0, 6)+'...';
        }
        return (text);
      });
      var high_opacity_list = [];
      if (max_value < 6) {
        $('p.first_message').html("あなたには特に強い考え方のクセはないようです。");
        return false;
      } else {
        $.each(habit_list, function(index, element){
          if (element[1] == max_value) {
            high_opacity_list.push(element);
          }
        });

        $.each(high_opacity_list, function(index, element){
          $('.' + element[0]).removeClass('low_opacity');
        });

        // Graph
        var ctx = $("#graph");
        var myChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              data: data,
              backgroundColor: [
                'rgba(255, 0, 0, 0.2)',
                'rgba(0, 0, 0, 0.2)',
                'rgba(129, 0, 255, 0.2)',
                'rgba(255, 129, 0, 0.2)',
                'rgba(0, 129, 255, 0.2)',
                'rgba(129, 255, 0, 0.2)'
              ],
              borderColor: [
                'rgba(255, 0, 0, 1)',
                'rgba(0, 0, 0, 1)',
                'rgba(129, 0, 255, 1)',
                'rgba(255, 129, 0, 1)',
                'rgba(0, 129, 255, 1)',
                'rgba(129, 255, 0, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true,
                }
              }],
            },
            legend: {
              display: false,
            },
          }
        });
      }
    },
    'error': function(response) {
      console.log('get fifthquestion answers failed. logs are:');
      console.log(response);
      return false;
    },
  });

  $(document).on('click', '.detail', function(){
    $(this).closest('td').find('.explain_detail').removeClass('offscreen');
  });
});
