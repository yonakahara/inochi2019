$(document).ready(function(){

  // Top
  var relocate = function() {
    var topRegisterTop = $("#top_background img").height() * 0.82;
    var topRegisterLeft = $("#top_background img").width() * 0.545 - $("#top_register img").width() * 0.5;
    $("#top_register").css("top", topRegisterTop+"px")
                      .css("left", topRegisterLeft+"px");
  };
  $(window).on('load resize', function() {
    relocate();
  });
  relocate();
  $("#top_login").on(mouseHover);
  $("#top_register").on(mouseHover);
  /* $(document).on("click", "#top_login, #top_register", function() {
   *   $("#lesson_register").removeClass("offscreen");
   *   $("#lesson").css("height", "1000px");
   * });
   */
  // About
  $("#about_more").on(mouseHover);

  // Lesson
  $("#lesson_start").on(mouseHover);
  /* $(document).on("click", "#lesson_register_submit", function(ev) {
   *   ev.preventDefault();
   *   that = this;
   *   var name = $(this).closest("form").find("input[name=name]").val();
   *   name = escapeHtml(name);
   *   var email = $(this).closest("form").find("input[name=email]").val();
   *   email = escapeHtml(email);
   *   if (name == "" || email == "") {
   *     alert("フォームに正しく値を入力してください");
   *     return false;
   *   }
   *   var _subject = "【八木さん】" + name + "さんがユーザー登録しました";
   *   $.post("http://mailthis.to/yagisan", {
   *     name: name,
   *     email: email,
   *     _subject: _subject
   *   }, function(data) {
   *     alert("登録を完了しました。");
   *     $(that).closest("form").find("input[type=text]").val("");
   *     $(that).closest("form").find("input[type=email]").val("");
   *   });
   * });
   * $(document).on("click", "#lesson_start", function() {
   *   $("#lesson_register").removeClass("offscreen");
   *   $("#lesson").css("height", "1000px");
   * }); */
  $(document).on("click", "#top_register, #lesson_start", function() {
    user_id = checkSession();
    if (Number(user_id) > 0) {
      // has session
      openLesson();
    } else {
      // no session
      scrollTo(0);
      modalOpen();
    }
  });

  // Column
  $("#column_index").on(mouseHover);

  // Professor
  $("#professor_introduce").on(mouseHover);

  // Contactus
  $("#contact_info").on(mouseHover);

  // Modal
  var modalOpen = function() {
    $("#modal").fadeIn();
    $(".modalOpen").addClass("open");
    return false;
  }
  var modalClose = function() {
    $("#modal").fadeOut();
    $(".modalOpen").removeClass("open");
    return false;
  }
  $(document).on('click', ".modalOpen", function(){
    modalOpen();
  });
  $(document).on('click', "#modalClose", function(){
    modalClose();
  });

  // ModalLogin
  $(document).on('click', '#modal_change_register', function() {
    $('#modal_login_form').hide();
    $('#modal img').addClass('register');
    $('#modal .inner').addClass('register');
    $('#modal_register_form').fadeIn();
  });
  $(document).on('click', '#modal_change_login', function() {
    $('#modal_register_form').hide();
    $('#modal img').removeClass('register');
    $('#modal .inner').removeClass('register');
    $('#modal_login_form').fadeIn();
  });
  $(document).on('click', '#modal_login_submit', function(ev) {
    ev.preventDefault;
    var email = $(this).closest('form').find('input[name=email]').val();
    var password = $(this).closest('form').find('input[name=password]').val();
    $.ajax({
      'url': '/user/login',
      'type': 'POST',
      'data': {
        'email': email,
        'password': password,
      },
      'dataType': 'json',
      'success': function(response) {
        user_id = response.id;
        user_nickname = response.nickname;
        $("input[name=user_id]").val(user_id);
        $("input[name=user_nickname]").val(user_nickname);
        console.log('login successed as '+user_nickname+'.');
        var html =
          '<div id="top_logined_name" class="top_logined_name">ようこそ、' + user_nickname + 'さん</div>' +
          '<div id="top_logout" class="top_logout offscreen">ログアウトする</div>';
        $("#top_login").html(html)
                       .addClass("top_logined")
                       .removeClass("top_login");
        modalClose();
      },
      'error': function(response) {
        console.log('login failed. logs are:');
        console.log(response);
        return false;
      },
    });
    return false;
  });
  $(document).on('click', '#modal_register_submit', function(ev) {
    ev.preventDefault;
    var last_name = $(this).closest('form').find('input[name=last_name]').val();
    var first_name = $(this).closest('form').find('input[name=first_name]').val();
    var nickname = $(this).closest('form').find('input[name=nickname]').val();
    var email = $(this).closest('form').find('input[name=email]').val();
    var password = $(this).closest('form').find('input[name=password]').val();
    $.ajax({
      'url': '/user/register',
      'type': 'POST',
      'data': {
        'last_name': last_name,
        'first_name': first_name,
        'nickname': nickname,
        'email': email,
        'password': password,
      },
      'dataType': 'json',
      'success': function(response) {
        user_id = response.id;
        user_nickname = response.nickname;
        $("input[name=user_id]").val(user_id);
        $("input[name=user_nickname]").val(user_nickname);
        console.log('register successed as '+user_nickname+'.');
        var html =
          '<div id="top_logined_name" class="top_logined_name">ようこそ、' + user_nickname + 'さん</div>' +
          '<div id="top_logout" class="top_logout offscreen">ログアウトする</div>';
        $("#top_login").html(html)
                       .addClass("top_logined")
                       .removeClass("top_login");
        modalClose();
      },
      'error': function(response) {
        console.log('register failed. logs are:');
        console.log(response);
        return false;
      },
    });
    return false;
  });

  // Logout
  $(document).on({
    "mouseenter": function() {
      $("#top_logout").fadeIn('fast');
    },
    "mouseleave": function( ){
      $("#top_logout").fadeOut('fast');
    }
  }, ".top_logined");
  $(document).on('click', '#top_logout', function(ev) {
    ev.preventDefault;
    if (!confirm('ログアウトしますか？')) {
      return false;
    }
    var user_id = $('input[name=user_id]').val();
    $.ajax({
      'url': '/user/logout',
      'type': 'POST',
      'data': {
      },
      'dataType': 'json',
      'success': function(response) {
        console.log('logout successed.');
        window.location.href = '/';
      },
      'error': function(response) {
        console.log('logout failed. logs are:');
        console.log(response);
        return false;
      },
    });
    return false;
  });

});
