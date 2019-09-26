// MouseHover
var mouseHover = {
  mouseenter: function () {
    if ($(this).find(".default").hasClass("disable")) {
      return false;
    }
    $(this).find(".default").addClass("offscreen");
    $(this).find(".over").removeClass("offscreen");
  },
  mouseleave: function () {
    if ($(this).find(".default").hasClass("disable")) {
      return false;
    }
    $(this).find(".default").removeClass("offscreen");
    $(this).find(".over").addClass("offscreen");
  }
};

// HtmlEscape
var escapeHtml = function(string) {
  if (typeof string !== 'string') {
    return string;
  }
  return string.replace(/[&'`"<>]/g, function(match) {
    return {
      '&': '&amp;',
      "'": '&#x27;',
      '`': '&#x60;',
      '"': '&quot;',
      '<': '&lt;',
      '>': '&gt;',
    }[match]
  });
}

// Session
var checkSession = function() {
  var user_id = $("input[name=user_id]").val();
  var user_nickname = $("input[name=user_nickname]").val();
  if (user_id == '' || user_nickname == '') {
    return false;
  }
  return user_id;
}

// OpenLesson
var openLesson = function() {
  window.open("/lesson",
              "Lesson",
              "width=1024,height=768,resizable=yes,scrollbars=yes");
  return false;
}

// Scroll
var scrollOffsetY = -100;
var scrollTime = 500;
var scrollTo = function(to) {
  $('html,body').animate({scrollTop: to}, scrollTime, 'swing');
  window.history.pushState(null, null, this.hash);
  return false;
}

$(document).ready(function(){

  // CSRF for Ajax
  var csrftoken = $("input[name=csrfmiddlewaretoken]").val();
  function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
  }
  $.ajaxSetup({
    beforeSend: function(xhr, settings) {
      if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
        xhr.setRequestHeader("X-CSRFToken", csrftoken);
      }
    }
  });

  // Assets
  var assets = $('input[name=assets]').attr('value');
  if (assets) {
    console.log('Here is '+assets+'.');
  }

  // FixedHeader
  var nav = $("#header");
  var navDummy = $("#headerdummy");
  var offset = nav.offset();
  $(window).scroll(function () {
    if (assets != 'index') {
      return false;
    }
    if ($(window).scrollTop() > offset.top) {
      nav.addClass("fixed");
      nav.find("#header_items").addClass("fixed");
      navDummy.removeClass("offscreen")
    } else {
      nav.removeClass("fixed");
      nav.find("#header_items").removeClass("fixed");
      navDummy.addClass("offscreen")
    }
    return false;
  });

  // Scroll/OpenNewWindows
  $(document).on("click", "a", function() {
    if ($(this).attr("href").match(/^#/)) {
      var target = $(this.hash);
      if (!target.length) return;
      var targetY = target.offset().top + scrollOffsetY;
      scrollTo(targetY);
    } else {
      if ($(this).attr("href").match(/^\/lesson$/)) {
        openLesson();
      }
      return true;
    }
  });

});
