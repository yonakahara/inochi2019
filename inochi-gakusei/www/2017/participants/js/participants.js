/*-------------------------------------------------------------------------------
Modal Scripts
--------------------------------------------------------------------------------*/
function modal1(){
  document.getElementById("modal").style.display = "block";
  document.getElementById("content_box1").style.display = "block";  
  $('#modal').click(function(){
    document.getElementById("modal").style.display = "none";
    document.getElementById("content_box1").style.display = "none";
  });
};

function modal2(){
  document.getElementById("modal").style.display = "block";
  document.getElementById("content_box2").style.display = "block";  
  $('#modal').click(function(){
    document.getElementById("modal").style.display = "none";
    document.getElementById("content_box2").style.display = "none";
  });
};

function modal_back(){
  document.getElementById("modal").style.display = "none";
  document.getElementById("content_box1").style.display = "none";
  document.getElementById("content_box2").style.display = "none";
};

function checkChara(_type,_str){
    var tmp = _str.split("");
    for(var cnt=0;cnt<tmp.length;cnt++){
        switch(_type){
            case "katakana":
                if(tmp[cnt].match(/^[ァ-ヶー]*$/)==null){
                    tmp[cnt] = "";
                }
            break;
            case "hankaku":
                if(tmp[cnt].match(/^[a-zA-Z0-9!-/:-@¥[-`{-~]+$/)==null){
                    tmp[cnt] = "";
                }
            break;
            case "number":
                if(tmp[cnt].match(/^[0-9]+$/)==null){
                    tmp[cnt] = "";
                }
            break;
        }
    }
    return tmp.join("");
}
$(document).ready(function(e) {
    $("#displayname").change(function(e) {
        $(this).val(checkChara("hankaku",$(this).val()));
    });
});


/*-------------------------------------------------------------------------------
Count Down Scripts
--------------------------------------------------------------------------------*/
jQuery(function($){
  $('#clock').flipcountdown();
  $('#timer').flipcountdown({
    size:'md',
    beforeDateTime:'12/23/2016 13:00:00'
  });
  $('#timer2').flipcountdown({
    size:'md',
    beforeDateTime:'12/23/2016 13:00:00'
  });  
});

/*-------------------------------------------------------------------------------
Video Thumbnails Scripts
--------------------------------------------------------------------------------*/
$(document).ready(function(){
  $(document).on('mouseover','.thumbnail_',function(){
    var query = $(this).attr('src');
    console.log(query);
    query = query.substr(0,query.length - 4) + "_on.png";
    console.log(query);
      $(this).attr("src",query);
      $(this).css('opacity','0.1');
      $(this).animate({opacity:1},1000);
    return false;
  });

  $(document).on('mouseout','.thumbnail_',function(){
    var query = $(this).attr('src');
    query = query.substr(0,query.length - 7) + ".png";
      $(this).attr("src",query);
      $(this).css('opacity','0.1');
      $(this).animate({opacity:1},1000);
    return false;
  });
});


/*-------------------------------------------------------------------------------
Firebase Scripts
--------------------------------------------------------------------------------*/
function toggleSignOut() {
  if (firebase.auth().currentUser) {
    // [START signout]
    firebase.auth().signOut();
    // [END signout]
  }
  document.getElementById('quickstart-sign-in').disabled = true;
}

function sendPasswordReset() {
  var email = document.getElementById('email').value;
  // [START sendpasswordemail]
  firebase.auth().sendPasswordResetEmail(email).then(function() {
    // Password Reset Email Sent!
    // [START_EXCLUDE]
    alert('Password Reset Email Sent!');
    // [END_EXCLUDE]
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode == 'auth/invalid-email') {
      alert(errorMessage);
    } else if (errorCode == 'auth/user-not-found') {
      alert(errorMessage);
    }
    console.log(error);
    // [END_EXCLUDE]
  });
  // [END sendpasswordemail];
}

function changeName() {
  firebase.auth().onAuthStateChanged(function(user) {
    // [set displayName]
    var currentdisplayName = document.getElementById('displayname').value;
    console.log(currentdisplayName);
    if (currentdisplayName !== '') {
      user.updateProfile({
          displayName: currentdisplayName
      }).then(function() {
          // Update successful.
          alert('displayName has been changed!');
          console.log(firebase.User.displayName);
          initApp();
      }, function(error) {
          // An error happened.
          alert('error happened.');
      });          
    }; 
  });
}

function initApp() {
  // Listening for auth state changes.
  // [START authstatelistener]
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      document.getElementById('quickstart-sign-in').textContent = 'Sign out';
      console.log(user.displayName);
      if (user.displayName !== undefined) {
        document.getElementById('username').textContent = user.displayName;
      };
      console.log('ここでもサインインしてるよ');
      $("input[name='name']").val(user.displayName);    
      // [END_EXCLUDE]
    } else {
      // User is signed out.      
        var currentUrl = window.location.href;
      console.log(currentUrl.match('lectures'));
      if (currentUrl.match('lectures')) {
        window.location.href = "../../login.html"
      }else{
        window.location.href = "../login.html"
         };
      // [START_EXCLUDE silent]
      document.getElementById('quickstart-sign-in').textContent = 'Sign in';
      // [END_EXCLUDE]
    }
    // [START_EXCLUDE silent]
    document.getElementById('quickstart-sign-in').disabled = false;
    // [END_EXCLUDE]
  });
  // [END authstatelistener]

  document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignOut, false);
  document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);
}


window.onload = function() {
  initApp();
};



/*-------------------------------------------
Translation
-------------------------------------------*/
$(document).ready(function(){
  var v = $('#trans').attr('src');
  num = 0;

  $('#trans').on("click",function(){
    if (num == 0){
      $('#trans').attr('src','../img/translation_toja2.png');
      $('#trans').error(function(){
        $('#trans').attr('src','../../img/translation_toja2.png');
      });
      $('.JPcontents').css('display','none');
      $('.ENcontents').css('display','block');
      openHCB();
      num = 1;
      console.log('hi');
    } else {
      $('#trans').attr('src','../img/translation_toen2.png');
      $('#trans').error(function(){
        $('#trans').attr('src','../../img/translation_toen2.png');
      });
      $('.ENcontents').css('display','none');
      $('.JPcontents').css('display','block');
      openHCB();
      num = 0;
      console.log('hihi');      
    }
  });
  $('#trans').on("mouseover",function(){
    v = $('#trans').attr('src');
    var v_on = v.substr(0,v.length - 4) +'2.png';
    $(this).attr('src',v_on);
  });
  $('#trans').on("mouseout",function(){
    v = $('#trans').attr('src');
    var v_on = v.substr(0,v.length - 5) +'.png';
    $(this).attr('src',v_on);
  });

});

