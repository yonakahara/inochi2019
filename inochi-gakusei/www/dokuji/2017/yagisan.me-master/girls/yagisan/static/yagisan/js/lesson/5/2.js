$(document).ready(function(){
  $(document).on('click', '.detail', function(){
    $(this).closest('td').find('.explain_detail').removeClass('offscreen');
  });
});
