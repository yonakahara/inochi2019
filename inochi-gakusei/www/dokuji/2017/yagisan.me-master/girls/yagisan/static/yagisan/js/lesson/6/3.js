$(document).ready(function(){
  $(document).on('click', '.status_bar', function(e){
    var percentage = Math.round(e.offsetX / 4);
    $(this).find('.purple').width(percentage + '%');
    $(this).find('.percentage').html(percentage + '%');

    if ($(this).parent('div').hasClass('expression_first')) {
      $('.six .expression_first .purple').width(percentage + '%');
      $('.six .expression_first .percentage').html(percentage + '%');
    } else if ($(this).parent('div').hasClass('expression_second')) {
      $('.six .expression_second .purple').width(percentage + '%');
      $('.six .expression_second .percentage').html(percentage + '%');
    } else if ($(this).parent('div').hasClass('expression_third')) {
      $('.six .expression_third .purple').width(percentage + '%');
      $('.six .expression_third .percentage').html(percentage + '%');
    }
  });

  $(document).on('mousemove', '.status_bar', function(e){
    if (e.which == 1) { // clickされていたら
      var percentage = Math.round(e.offsetX / 4);
      $(this).find('.purple').width(percentage + '%');
      $(this).find('.percentage').html(percentage + '%');

      if ($(this).parent('div').hasClass('expression_first')) {
        $('.six .expression_first .purple').width(percentage + '%');
        $('.six .expression_first .percentage').html(percentage + '%');
      } else if ($(this).parent('div').hasClass('expression_second')) {
        $('.six .expression_second .purple').width(percentage + '%');
        $('.six .expression_second .percentage').html(percentage + '%');
      } else if ($(this).parent('div').hasClass('expression_third')) {
        $('.six .expression_third .purple').width(percentage + '%');
        $('.six .expression_third .percentage').html(percentage + '%');
      }
    }
  });
});
