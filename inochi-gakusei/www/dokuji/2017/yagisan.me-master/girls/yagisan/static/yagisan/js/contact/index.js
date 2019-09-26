$(document).ready(function(){

  $("#contact_form_submit").on(mouseHover);
  $(document).on("click", "#contact_form_submit", function(ev) {
    ev.preventDefault();
    that = this;
    var name = $(this).closest("form").find("input[name=name]").val();
    name = escapeHtml(name);
    var email = $(this).closest("form").find("input[name=email]").val();
    email = escapeHtml(email);
    var content = $(this).closest("form").find("textarea[name=content]").val();
    content = escapeHtml(content);
    if (name == "" || email == "" || content == "") {
      alert("フォームに正しく値を入力してください");
      return false;
    }
    var _subject = "【八木さん】" + name + "さんからの問い合わせです";
    $.post("http://mailthis.to/yagisan", {
      name: name,
      email: email,
      content: content,
      _subject: _subject
    }, function(data) {
      alert("送信を完了しました。");
      $(that).closest("form").find("input[type=text]").val("");
      $(that).closest("form").find("input[type=email]").val("");
      $(that).closest("form").find("textarea[type=content]").html("");
    });
  });

});
