$(document).ready(function(){
  split_array = $(location).attr('search').split('=');
  how_many_yes = Number(split_array[1]);

  if (how_many_yes < 10) {
    $('.bad').removeClass('offscreen');
  } else {
    console.log(1);
    $('.good').removeClass('offscreen');
  }
});
