<?php
// カウント数取得関数
function get_count($file) {
	$filename = 'data/'.$file.'.dat';
	$fp = @fopen($filename, 'r');
	if ($fp) {
		$vote = fgets($fp, 9182);
	} else {
		$vote = 0;
	}
	return $vote;
}
?>


<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
 	<meta name="description" content="inochiを救う大学生のアイデアに投票しよう!!向き合おう、inochiと―。inochi学生フォーラム2016は「日本の心臓突然死を減らす」というテーマの問題解決型実施プログラム。大学生アイデアWeb投票中!!">
 	<meta name="keywords" content="inochi学生フォーラム,inochi,学生,フォーラム,プロジェクト,2016,阪大,京大,医療,ヘルスケア,若者,関西,心臓突然死">
 	<meta property="og:image" content="http://inochi-gakusei.com/2016/img/share.png">
 	<meta property="og:description" content="inochiを救う大学生のアイデアに投票しよう!!向き合おう、inochiと―。inochi学生フォーラム2016は「日本の心臓突然死を減らす」というテーマの問題解決型実施プログラム。大学生アイデアWeb投票中!!">
    <title>投票ページ inochi学生フォーラム2016</title>
    <link rel="shortcut icon" href="http://inochi-gakusei.com/2016/img/favicon.ico" />
    <!-- read Bootstrap　CSS -->
    <link href="../css/bootstrap.min.css" rel="stylesheet">
    <link href="../css/jquery.bxslider.css" rel="stylesheet" />
    <!-- read jQuery -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <!-- read Bootstrap JS -->
    <script src="../js/bootstrap.min.js"></script>
    <script src="js/main.js"></script>
    <script src="../js/jquery.bxslider.min.js"></script>
    <script src="js/js.cookie.js"></script>
    <script type="text/javascript">
    $(document).ready(function(){
    	var sliderImg = $('.bxslider li.box').length;
    	if(sliderImg > 1){
	      $('.bxslider').bxSlider({
	      	auto: 'true',
	      	speed: 1000,
	      	pause: 8000,
	      	easing: 'liner'
	      });
  		}
    });
    </script>
	<script>
	$(function() {
		for (var i = 1; i <= 12; i++) {
			button_id = "vote_" + i;
			if (Cookies.get(button_id) == 1) {
				sel_button_id = "#" + button_id;
				$(sel_button_id).toggleClass('on',true);
			}
		}
	});

	function Check(id, like) {
		if (like == 'like') {
			Cookies.set(id, 1, { expires: 1 });
			console.log('button has been set!')
			console.log(Cookies.get(id))
		} else {
			Cookies.remove(id);
		}
	};
	
	$(function() {
		$('.btn_vote').click(function() {
			allowAjax = true;
			if (allowAjax) {
				allowAjax = false;
				$(this).toggleClass('on');
				var id = $(this).attr('id');
				$(this).hasClass('on') ? Vote(id, 'plus') : Vote(id, 'minus');
				$(this).hasClass('on') ? Check(id, 'like') : Check(id, 'unlike');
			}
			console.log(allowAjax)
		});
	});
	function Vote(id, plus) {
		cls = $('.' + id);
		target = "http://inochi-gakusei.com/2016/voting/data/" + id + ".dat";
		var cls_num;
		$.ajax({
			url: target,
			success: function(data){
			console.log(data)
			cls_num = data;
			console.log(cls_num)
			},
			async: false
		});
		setTimeout(function(){
			cls_num = Number(cls_num);console.log(cls_num)
			current = Number(cls.html());
			console.log(current)
			count = plus == 'minus' ? cls_num - 1 : cls_num + 1;
			console.log(count)
			$.post('vote.php', {'file': id, 'count': count, 'sub_count': current }, function(data) {
				if (data == 'success') {
					//cls.html(count);
				}
				setTimeout(function() {
					allowAjax = true;
				}, 200);

			});
		},200);
	}
	</script>    

    <link rel="stylesheet" href="../css/main.css">
    <link rel="stylesheet" href="css/voting.css">  
    <!--Analytics-->
	<script>
	  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
	  ga('create', 'UA-78321708-1', 'auto');
	  ga('send', 'pageview');
	</script>
  </head>
  <body id="body">
    <div id="fb-root"></div>
	<script>(function(d, s, id) {
	  var js, fjs = d.getElementsByTagName(s)[0];
	  if (d.getElementById(id)) return;
	  js = d.createElement(s); js.id = id;
	  js.src = "//connect.facebook.net/ja_JP/sdk.js#xfbml=1&version=v2.6";
	  fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));</script>

  	<header>
  		<div class="fadeInDown">
			<h1 class="top-title"><img src="../img/title3.png" alt="title" /></h1>
		    <p class="header" id="message">心原性心肺機能停止で救急搬送される人数=年間で中学校228校分<br>市民による心肺蘇生やAEDの使用で、救える命がまだまだある。<br>関西、日本、そして世界から。中高生、大学生が立ち上がった。<br>「心臓突然死を減らす」その課題解決のための国内・海外の大学生によるプラン。<br>得票数が多く、審査員の評価が高いチームは、12/23のinochi学生フォーラム(@グランフロント大阪)にてプレゼンテーションを行います。</p>
	    </div>
		<div class="social center" style="width:20%;position:absolute; top:50px; right:20px;">
			<a href="https://twitter.com/share" class="twitter-share-button" data-text="「心臓突然死減少へ」若者がデザイン思考とテクノロジーを使って挑む教育&amp;プラン実現プログラム【inochi学生フォーラム】" data-hashtags="inochi_gakusei">Tweet</a>
			<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
			<div class="fb-like" id="facebook" data-href="http://inochi-gakusei.com/2016" data-layout="button_count" data-action="like" data-show-faces="false" data-share="true"></div>
		</div>	    
	</header>

	<nav class="navbar navbar-fixed-top" role="navigation">
		<div class="container-fluid">

			<!-- for SP -->
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#nav-menu-4">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
			</div>
			<div class="collapse navbar-collapse" id="nav-menu-4">
				<ul class="nav nav-pills nav-justified">
					<li><a href="#top">TOP</a></li>
					<li><a href="#ranking">RANKING</a></li>
					<li><a href="#how_to_vote">HowToVote</a></li>				
					<li><a href="#about">ABOUT</a></li>
					<li><a href="#voting">VOTING</a></li>
					<li><a href="#organize">ORGANIZE</a></li>					
				</ul>
			</div>
		</div>
	</nav>


	<!--floating contents-->
	<!--
	<span class="anchor2">
		<a href="en/index.html">
			<img src="../img/translation_toen.png" onmouseover="this.src='../img/translation_toen2.png'" onmouseout="this.src='../img/translation_toen.png'">
		</a>
	</span>
	-->


	<!--main contents-->
  	<div class="container-fluid">

  		<!--ranking-->
    	<div class="row row_n" id="ranking" style="display:none;">
    	</div>

  		<!--how to vote-->
    	<div class="row row_n" id="how_to_vote">
    		<div class="col-sm-2"></div>
    		<div class="col-sm-8">
    			<h1>How To Vote</h1>
    			<div class="col-sm-6 center">
    				<img src="../img/facebook.svg" alt="facebook" width="125px">
    				<h3><strong>Facebook投票ボタンでシェアして投票</strong></h3>
    				<p><br><strong>[1アカウント1回限りの投票]</strong><br>Facebookアカウントをお持ちの方は、<br>1アカウント1回限り、シェアボタンで動画をシェアすることで<br>チームのアイデアに投票することができます。<br>*シェアした投稿に対する「いいね」もカウントされます。</p>
    			</div>
    			<div class="col-sm-6 center">
    				<img src="../img/tap.svg" alt="voting" width="125px">
    				<h3><strong>投票ボタンで投票</strong></h3>
    				<p><br><strong>[1人1日1回限りの投票]</strong><br>Facebook投票ボタンの隣の投票ボタンからも投票可能。<br>こちらでは1日1回限り、何度でも投票できます。<br>ぜひ特に気に入ったアイデアには毎日投票してみてください。</p>
    			</div>
    		</div>
    	</div>

  		<!--about-->
    	<div class="row row_w" id="about">
	    	<div class="col-sm-2"></div>
	    	<div class="col-sm-8" id="about_area">
	    		<h1>ABOUT</h1>
	    		<h4>inochi学生フォーラムとは</h4>
	    		<h4 class="animation_in ani_exception" id="theme">THEME:<br class="br_sp"> <strong><span style="color:#cc2f1f;">心</span>臓突然死を<span class="br_pc">、</span>減らせ<span class="br_pc">。</span></strong></h4>
	    		<div class="row row_w animation_in" id="glid">
		    		<div class="col-sm-5" id="situation"></div>
		    		<div class="col-sm-3" id="lecpic_contain"><div class="lecpic" id="lecpic1"></div><div class="lecpic" id="lecpic2"></div></div>
		    		<div class="col-sm-4 lecpic" id="lecpic3"></div>
	    		</div>
	    		<div class="row row_w animation_in" id="glid">
		    		<div class="col-sm-3 lecpic" id="lecpic4"></div>
		    		<div class="col-sm-2" id="lecpic_contain2"><div class="lecpic" id="lecpic5"></div><div class="lecpic" id="lecpic6"></div></div>
		    		<div class="col-sm-7" id="explanation"></div>
	    		</div>
	    		<div class="center">
	    		    <a href="http://inochi-gakusei.com/2016"><div id="simulation"><h3 id="simulation"><strong>フォーラム公式サイトへ</strong></h3></div></a>
	    		</div>
    		</div>
    		<div class="col-sm-2"></div>
    	</div>
    	<div class="row row_w" id="about">
	    	<div class="col-sm-2"></div>
	    	<div class="col-sm-8" id="about_area">
	    		<h4>これまでの歩み</h4>
	    		<img src="../img/process.png" alt="これまでの流れ" style="margin-bottom:100px;">
	    	</div>
	    	<div class="col-sm-2"></div>
	    </div>

  		<!--supporters-->
    	<div class="row row_w" id="voting">
	    	<div class="col-sm-2"></div>
	    	<div class="col-sm-8">    	
    			<h1>VOTING</h1>
    			<div class="col-sm-12 center" id="voting_ex">
    				<p>「心臓突然死減少」アイデアを提出した計12の大学生チーム(国内8、世界4)の動画・アイデアシートを見て、良いと思ったアイデアに投票してください。<br>(複数チームに投票しても構いません。もちろん、一つのチーム複数回投票することもできます。)<br><br>▼<br><br>得票数の多かった6チームが選抜。その後、有識者による審査で、そのうちからinochi学生フォーラム当日の発表チームとして3チームが決定されます。<br><br>*プラン提出順に掲載しております。　　*各チームのプレゼン動画内の著作権の取り扱いに関してはinochi学生プロジェクトは一切責任を負わないものとします。</p>
    			</div>
    			<div class="col-sm-12 voting">    				
    				<img src="../img/voting_team4.png" class="team_pic">
    				<div id="presen">
    					<h3 style="display:inline-block;">TEAM 4</h3>
    					<p>[意気込み]<br>１分の動画と、６分の説明からなるプレゼンです！動画では植村くんが現場さながらの心肺蘇生を行っています。<br>私たちの、AEDがダメなら地図を増やそうという一歩引いた視点の発想をお楽しみください！</p>
    					<iframe id="presen_video" style="" src="https://www.youtube.com/embed/5BnEYHmAFaE" frameborder="0" allowfullscreen></iframe>
    					<img src="../img/voting_idea4.png" alt="idea4" id="presen_idea">
    				</div>
    				<!--
    				<div class="center">
    					<a href="https://www.facebook.com/sharer/sharer.php?u=https://www.youtube.com/watch?v=5BnEYHmAFaE" onclick="window.open(this.href, 'FBwindow', 'width=650, height=450, menubar=no, toolbar=no, scrollbars=yes'); return false;">
							<img src='../img/fb_vote.png' alt='いいね！' class="fb_button"><span class="result" id="result_1">?</span>
						</a>
						<div class="btn_area">
							<img src="img/button.png" class="btn_vote" id="vote_1" width='220' height='200'>
							<span class="ico_heart vote_1"><?= get_count('vote_1'); ?> ?</span>
						</div>						
    				</div> -->
    			</div>
    			<div class="col-sm-12 voting">    				
    				<img src="../img/voting_team8.png" class="team_pic">
    				<div id="presen">
    					<h3 style="display:inline-block;">TEAM 8 (Wild Idea)</h3>
    					<p>[意気込み]<br>食欲の秋、牛丼屋では並盛だと足りませんね。私たちの意気込みも並々ならぬものです。<br>沢山の方からの協力を無駄にしてはいけないと、全身全霊をかけて妄想の実現化に向けて取り組んでいます。伝わりますよう…!</p>
    					<iframe id="presen_video" style="" src="https://www.youtube.com/embed/0bWHBlMMrXA" frameborder="0" allowfullscreen></iframe>
    					<img src="../img/voting_idea8.png" alt="idea8" id="presen_idea">
    				</div>
    				<!--
    				<div class="center">
    					<a href="https://www.facebook.com/sharer/sharer.php?u=https://www.youtube.com/watch?v=0bWHBlMMrXA" onclick="window.open(this.href, 'FBwindow', 'width=650, height=450, menubar=no, toolbar=no, scrollbars=yes'); return false;">
							<img src='../img/fb_vote.png' alt='いいね！' class="fb_button"><span class="result" id="result_2">?</span>
						</a>
						<div class="btn_area">
							<img src="img/button.png" class="btn_vote" id="vote_2" width='220' height='200'>
							<span class="ico_heart vote_2"><?= get_count('vote_2'); ?> ?</span>
						</div>					
    				</div> -->
    			</div>
    			<div class="col-sm-12 voting">    				
    				<img src="../img/voting_team11.png" class="team_pic">
    				<div id="presen">
    					<h3 style="display:inline-block;">TEAM 11 (Team T.M.)</h3>
    					<p>[意気込み]<br>私たちは新機能の低下を予防するため三重県の東紀州地域への健康ツアーを提案します。それぞれの専門分野を生かして世界を変えるためのアイデアをチーム一丸となって考えました。やるからには優勝を目指します！</p>
    					<iframe id="presen_video" style="" src="https://www.youtube.com/embed/aAyqFEHYfeo" frameborder="0" allowfullscreen></iframe>
    					<img src="../img/voting_idea11.png" alt="idea11" id="presen_idea">
    				</div>
    				<!--
    				<div class="center">
    					<a href="https://www.facebook.com/sharer/sharer.php?u=https://www.youtube.com/watch?v=aAyqFEHYfeo" onclick="window.open(this.href, 'FBwindow', 'width=650, height=450, menubar=no, toolbar=no, scrollbars=yes'); return false;">
							<img src='../img/fb_vote.png' alt='いいね！' class="fb_button"><span class="result" id="result_3">?</span>
						</a>
						<div class="btn_area">
							<img src="img/button.png" class="btn_vote" id="vote_3" width='220' height='200'>
							<span class="ico_heart vote_3"><?= get_count('vote_3'); ?> ?</span>
						</div>
    				</div>-->				
    			</div>
    			<div class="col-sm-12 voting">    				
    				<img src="../img/voting_teamB.png" class="team_pic">
    				<div id="presen">
    					<h3 style="display:inline-block;">TEAM B (Hippocrater)</h3>
    					<p>[意気込み]<br>Actually for this forum, we made a great many efforts, we are medical student, so we want our project to be closed to professional aspects as much as possible.So we made questionnaires, we made statistics analysis, we made application and platform development etc. We really made a lot. We want to conclude what we think and we have done into a video within 10 minutes, but we have to say, 10minutes is far from enough. Anyway, we just hope if there is any possibility for us , we will have enough time to demonstrate the great idea from the bottom of our hearts to you completely, We hope the dream could come true!</p>
    					<iframe id="presen_video" style="" src="https://www.youtube.com/embed/3SusNyyJ2Ms" frameborder="0" allowfullscreen></iframe>
    					<img src="../img/voting_ideaB.png" alt="ideaB" id="presen_idea">
    				</div>
    				<!--
    				<div class="center">
    					<a href="https://www.facebook.com/sharer/sharer.php?u=https://www.youtube.com/watch?v=3SusNyyJ2Ms" onclick="window.open(this.href, 'FBwindow', 'width=650, height=450, menubar=no, toolbar=no, scrollbars=yes'); return false;">
							<img src='../img/fb_vote.png' alt='いいね！' class="fb_button"><span class="result" id="result_4">?</span>
						</a>
						<div class="btn_area">
							<img src="img/button.png" class="btn_vote" id="vote_4" width='220' height='200'>
							<span class="ico_heart vote_4"><?= get_count('vote_4'); ?> ?</span>
						</div>
    				</div> -->				
    			</div>
    			<div class="col-sm-12 voting">    				
    				<img src="../img/voting_team3.png" class="team_pic">
    				<div id="presen">
    					<h3 style="display:inline-block;">TEAM 3 (チーム風早)</h3>
    					<p>[意気込み]<br>おっすオラ悟空！行政や民間も巻き込んで、既存のAEDを有効活用できるワクワクするようなプランを考えたぞ！神龍に頼ってばかりじゃなくてオラ達が周りの人の命を救えるようになればいいよな！絶対に見てくれよな☆</p>
    					<iframe id="presen_video" style="" src="https://www.youtube.com/embed/_36gCJY-onA" frameborder="0" allowfullscreen></iframe>
    					<img src="../img/voting_idea3.png" alt="idea3" id="presen_idea">
    				</div>
    				<!--
    				<div class="center">
    					<a href="https://www.facebook.com/sharer/sharer.php?u=https://www.youtube.com/watch?v=_36gCJY-onA" onclick="window.open(this.href, 'FBwindow', 'width=650, height=450, menubar=no, toolbar=no, scrollbars=yes'); return false;">
							<img src='../img/fb_vote.png' alt='いいね！' class="fb_button"><span class="result" id="result_5">?</span>
						</a>
						<div class="btn_area">
							<img src="img/button.png" class="btn_vote" id="vote_5" width='220' height='200'>
							<span class="ico_heart vote_5"><?= get_count('vote_5'); ?> ?</span>
						</div>
    				</div> -->				
    			</div>
    			<div class="col-sm-12 voting">    				
    				<img src="../img/voting_teamA.png" class="team_pic">
    				<div id="presen">
    					<h3 style="display:inline-block;">TEAM A (Land of Smiles)</h3>
    					<p>[意気込み]<br>Hi!<br>We are second year students from Faculty of Medicine Siriraj Hospital, Mahidol University, Thailand. Our members are Lanlalit, Pawitthorn, Phakhanan, and Sutthiphat. Nice to meet you all!<br>Cardiac arrest seems unlikely to happen to us very soon. Unfortunately, it occurs more often than it seems. Luckily, early defibrillation using AED, along with immediate cardiopulmonary resuscitation (CPR) is the key treatment towards survival.<br>However, several life-saving opportunities were lost because people do not know how to help. That inspires our project: ensuring that people can use AED and provide CPR properly. We use modern tools like social network and interactive contents to boost engagements from viewers. And the result is great! Participants get engaged and do gain knowledge.<br>We will do our best to give patients better lifes.<br>Please support us!<br>Thank you!</p>
    					<iframe id="presen_video" style="" src="https://www.youtube.com/embed/a84hoUjYobk" frameborder="0" allowfullscreen></iframe>
    					<img src="../img/voting_ideaA.png" alt="ideaA" id="presen_idea">
    				</div>
    				<!--
    				<div class="center">
    					<a href="https://www.facebook.com/sharer/sharer.php?u=https://www.youtube.com/watch?v=a84hoUjYobk" onclick="window.open(this.href, 'FBwindow', 'width=650, height=450, menubar=no, toolbar=no, scrollbars=yes'); return false;">
							<img src='../img/fb_vote.png' alt='いいね！' class="fb_button"><span class="result" id="result_6">?</span>
						</a>
						<div class="btn_area">
							<img src="img/button.png" class="btn_vote" id="vote_6" width='220' height='200'>
							<span class="ico_heart vote_6"><?= get_count('vote_6'); ?> ?</span>
						</div>						
    				</div> -->
    			</div>
    			<div class="col-sm-12 voting">    				
    				<img src="../img/voting_team1.png" class="team_pic">
    				<div id="presen">
    					<h3 style="display:inline-block;">TEAM 1 (Th!nk)</h3>
    					<p>[意気込み]<br>"もしも目の前で人が倒れたら、私達はどうするのかを常に考えチームで試行錯誤しました。<br>緊急時にパニックになってしまっても、人の心に寄り添い助けることができるアイデアを生み出すことができました。実現可能性には圧倒的な自信があります。"</p>
    					<iframe id="presen_video" style="" src="https://www.youtube.com/embed/owQost95Qyw" frameborder="0" allowfullscreen></iframe>
    					<img src="../img/voting_idea1.png" alt="idea1" id="presen_idea">
    				</div>
    				<!--
    				<div class="center">
    					<a href="https://www.facebook.com/sharer/sharer.php?u=https://www.youtube.com/watch?v=owQost95Qyw" onclick="window.open(this.href, 'FBwindow', 'width=650, height=450, menubar=no, toolbar=no, scrollbars=yes'); return false;">
							<img src='../img/fb_vote.png' alt='いいね！' class="fb_button"><span class="result" id="result_7">?</span>
						</a>
						<div class="btn_area">
							<img src="img/button.png" class="btn_vote" id="vote_7" width='220' height='200'>
							<span class="ico_heart vote_7"><?= get_count('vote_7'); ?> ?</span>
						</div>						
    				</div> -->    				
    			</div>
    			<div class="col-sm-12 voting">    				
    				<img src="../img/voting_team5.png" class="team_pic">
    				<div id="presen">
    					<h3 style="display:inline-block;">TEAM 5</h3>
    					<p>[意気込み]<br>大阪大学在学の一回生３人でチームを作りました。<br>まだ経験の浅い私たちですが、この問題に対して、身近なものを使って解決できないかと考えてみました。いいなと思ったら投票してください。</p>
    					<iframe id="presen_video" style="" src="https://www.youtube.com/embed/leii-uXjo54" frameborder="0" allowfullscreen></iframe>
    					<img src="../img/voting_idea5.png" alt="idea5" id="presen_idea">
    				</div>
    				<!--
    				<div class="center">
    					<a href="https://www.facebook.com/sharer/sharer.php?u=https://www.youtube.com/watch?v=leii-uXjo54" onclick="window.open(this.href, 'FBwindow', 'width=650, height=450, menubar=no, toolbar=no, scrollbars=yes'); return false;">
							<img src='../img/fb_vote.png' alt='いいね！' class="fb_button"><span class="result" id="result_8">?</span>
						</a>
						<div class="btn_area">
							<img src="img/button.png" class="btn_vote" id="vote_8" width='220' height='200'>
							<span class="ico_heart vote_8"><?= get_count('vote_8'); ?> ?</span>
						</div>
    				</div> -->				
    			</div>    			    			    			    			
    			<div class="col-sm-12 voting">    				
    				<img src="../img/voting_team12.png" class="team_pic">
    				<div id="presen">
    					<h3 style="display:inline-block;">TEAM 12</h3>
    					<p>[意気込み]<br>私達は大学内の救急サークルにてワークショップに参加する中で気になった内容について、アンケートを実施しました。さらにサークルの枠組みから出て講習会の実施計画も立てております??よろしくお願いいたします！</p>
    					<iframe id="presen_video" style="" src="https://www.youtube.com/embed/V64BrrUeM8c" frameborder="0" allowfullscreen></iframe>
    					<img src="../img/voting_idea12.png" alt="idea12" id="presen_idea">
    				</div>
    				<!--
    				<div class="center">
    					<a href="https://www.facebook.com/sharer/sharer.php?u=https://www.youtube.com/watch?v=V64BrrUeM8c" onclick="window.open(this.href, 'FBwindow', 'width=650, height=450, menubar=no, toolbar=no, scrollbars=yes'); return false;">
							<img src='../img/fb_vote.png' alt='いいね！' class="fb_button"><span class="result" id="result_9">?</span>
						</a>
						<div class="btn_area">
							<img src="img/button.png" class="btn_vote" id="vote_9" width='220' height='200'>
							<span class="ico_heart vote_9"><?= get_count('vote_9'); ?> ?</span>
						</div>
    				</div> -->				
    			</div>
    			<div class="col-sm-12 voting">    				
    				<img src="../img/voting_teamE.png" class="team_pic">
    				<div id="presen">
    					<h3 style="display:inline-block;">TEAM E</h3>
    					<p>[意気込み]<br>"If you light a lamp for somebody, it will also brighten your path.”– Buddha<br><br>We hope this idea will brighten the path to tackle sudden cardiac arrest in Japan.  We have learnt so much over the time, and this has been an amazing opportunity to collaborate, innovate and experience an aspect of what we hope to do in the future.  Helping those in need is the reason why we have all chosen our respective professions with future aims of working in public health.  To speak at the Inochi forum would be an amazing opportunity to continue realising our dream; and after watching our video we hope you think our idea is worth it.  Enjoy the video and don’t forget to vote!!  <br>Kwarteng Sarfo"</p>
    					<iframe id="presen_video" style="" src="https://www.youtube.com/embed/BV-3kH_QQVc" frameborder="0" allowfullscreen></iframe>
    					<img src="../img/voting_ideaE.png" alt="ideaE" id="presen_idea">
    				</div>
    				<!--
    				<div class="center">
    					<a href="https://www.facebook.com/sharer/sharer.php?u=https://www.youtube.com/watch?v=BV-3kH_QQVc" onclick="window.open(this.href, 'FBwindow', 'width=650, height=450, menubar=no, toolbar=no, scrollbars=yes'); return false;">
							<img src='../img/fb_vote.png' alt='いいね！' class="fb_button"><span class="result" id="result_10">?</span>
						</a>
						<div class="btn_area">
							<img src="img/button.png" class="btn_vote" id="vote_10" width='220' height='200'>
							<span class="ico_heart vote_10"><?= get_count('vote_10'); ?> ?</span>
						</div>
    				</div> -->				
    			</div>
    			<div class="col-sm-12 voting">    				
    				<img src="../img/voting_teamC.png" class="team_pic">
    				<div id="presen">
    					<h3 style="display:inline-block;">TEAM C (どりむ3)</h3>
    					<p>[意気込み]<br>心臓発作がおきた際、1分1秒でも早い処置により多くの命が助かります。そこで、どこにでもあるタクシーにＡＥＤを積み、救急車やＡＥＤを待つ時間を減らすというアイデアを考えました。投票よろしくお願いします。</p>
    					<iframe id="presen_video" style="" src="https://www.youtube.com/embed/VpYthBeiy8o" frameborder="0" allowfullscreen></iframe>
    					<img src="../img/voting_ideaC.png" alt="ideaC" id="presen_idea">
    				</div>
    				<!--
    				<div class="center">
    					<a href="https://www.facebook.com/sharer/sharer.php?u=https://www.youtube.com/watch?v=VpYthBeiy8o" onclick="window.open(this.href, 'FBwindow', 'width=650, height=450, menubar=no, toolbar=no, scrollbars=yes'); return false;">
							<img src='../img/fb_vote.png' alt='いいね！' class="fb_button"><span class="result" id="result_11">?</span>
						</a>
						<div class="btn_area">
							<img src="img/button.png" class="btn_vote" id="vote_11" width='220' height='200'>
							<span class="ico_heart vote_11"><?= get_count('vote_11'); ?> ?</span>
						</div>
    				</div> -->				
    			</div>
    			<div class="col-sm-12 voting">    				
    				<img src="../img/voting_team10.png" class="team_pic">
    				<div id="presen">
    					<h3 style="display:inline-block;">TEAM 10 (信州大学チーム)</h3>
    					<p>[意気込み]<br>今回、参加できて良かった。それは命を助ける方法を諦めずに考え続ける自分を実感できたからだ。<br>またたとえ今回は他にもっと良いアイデアがあっても、より人を助けられる社会になるよう力を尽くしていく覚悟が固まったので良かった。</p>
    					<iframe id="presen_video" style="" src="https://www.youtube.com/embed/-LqRpuFvPns" frameborder="0" allowfullscreen></iframe>
    					<img src="../img/voting_idea10.png" alt="idea10" id="presen_idea">
    				</div>
    				<!--
    				<div class="center">
    					<a href="https://www.facebook.com/sharer/sharer.php?u=https://www.youtube.com/watch?v=-LqRpuFvPns" onclick="window.open(this.href, 'FBwindow', 'width=650, height=450, menubar=no, toolbar=no, scrollbars=yes'); return false;">
							<img src='../img/fb_vote.png' alt='いいね！' class="fb_button"><span class="result" id="result_12">?</span>
						</a>
						<div class="btn_area">
							<img src="img/button.png" class="btn_vote" id="vote_12">
							<span class="ico_heart vote_12"><?= get_count('vote_12'); ?> ?</span>
						</div>
    				</div> -->				
    			</div>    			    			    			    			
    		</div>
    	</div>

  		<!--organize-->
    	<div class="row row_w" id="organize">
	    	<div class="col-sm-2"></div>
	    	<div class="col-sm-8" id="organize_area">
	    		<h1>ORGANIZER</h1>
	    		<h3>運営団体・共催団体について</h3>
	    		<h4>主催団体inochi学生プロジェクトについて</h4>
	    		<div class="row row_W">
	    			<div class="col-sm-1"></div>
	    			<div class="col-sm-3"><img src="../img/inochiGlogo2.png" id="inochilogo"></div>
	    			<div class="col-sm-7" style="vertical-align:middle;"><p class="mid">一般社団法人inochi未来プロジェクトと連携しながら、「若者の力でヘルスケアの問題を解決する」という目的の下活動する京都大学・大阪大学の学生が中心となって動いている自主プロジェクトです。<br/>活動の軸は‘若者の力でヘルスケア問題を解決すること’<br/>新しい技術のヘルスケアへの応用模索と地域のヘルスケア問題の解決に取り組みながら真に‘ innovative’なイノベーションを生み出すことのできる若手人材を生み出すことを目標としています。</p>
    				</div>
	    			<div class="col-sm-1"></div>
	    		</div>
	    		<h4>共催団体inochi未来プロジェクトについて</h4>
	    		<div class="row row_W">
	    			<div class="col-sm-1"></div>
	    			<div class="col-sm-3"><img src="../img/inochiMlogo.png" id="inochilogo"></div>
	    			<div class="col-sm-7" style="vertical-align:middle;"><p class="mid">「みんなでinochiの大切さと未来について考え、行動するプロジェクト」。<br/>医療者・企業・行政そして市民と患者も。関西・日本が、みんなでささえあいながら、健康で長生きできる街・国になることをめざします。<br/>2014年6月にinochi未来プロジェクト実行委員会を立ち上げ、今後、関西発の健康・医療イノベーションを加速させるべく2015年11月に一般社団法人inochi未来プロジェクトへと発展いたしました。<br/><br/><a href="http://inochi-expo.com/">inochi未来プロジェクトWebサイト</a></p></div>
	    			<div class="col-sm-1"></div>
	    		</div>
				<div class="social" id="social_footer">
					<a href="https://twitter.com/share" class="twitter-share-button" data-text="「心臓突然死減少へ」若者がデザイン思考とテクノロジーを使って挑む教育&プラン実現プログラム【inochi学生フォーラム】" data-hashtags="inochi-gakusei">Tweet</a>
		<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
					<div class="fb-like" id="facebook" data-href="http://inochi-gakusei.com/2016" data-layout="button_count" data-action="like" data-show-faces="false" data-share="true"></div>
				</div>
    		</div>
    		<div class="col-sm-2"></div>
    	</div>
    </div>

  	<!--footer-->
    <footer class="container-fluid">
    	<div class="col-sm-2"></div>
    	<div class="col-sm-8" id="footer">
    		<div id="footer2">
    			<p id="footer">
    			<p style="display:inline-block; vertical-align:top;">
	    		<img src="../img/inochiGlogo.png" width="150px">
	    		<img src="../img/inochiMlogo.png" width="100px">
	    		</p>
	    		<p style="display:inline-block;vertical-align:middle; text-align:left;margin-left:40px;">
	    		<a href="#about">inochi学生フォーラムについて</a><br><a href="#supporters">inochi学生フォーラムサポーター</a><br><a href="#sponsors">協賛企業一覧</a><br><a href="#schedule">inochi学生フォーラムスケジュール</a><br><a href="#entry">応募要項</a><br><a href="#faq">よくあるご質問</a></p>
	    		<p style="display:inline-block;vertical-align:top; text-align:left;margin-left:40px;">
	    		<strong>【後援】<br><br>関西広域連合<br><br>近畿経済産業局</strong></p></p>
    		</div>
    		<p id="footer2">&copy;Copyrights 2016 inochi学生プロジェクト</p>
    	</div>
    	<div class="col-sm-2"></div>
    </footer>

  </body>
</html>





