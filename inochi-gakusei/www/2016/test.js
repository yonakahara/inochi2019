var data = {"himitsu":["上司の○○を見返してやる","松波君のことがすき","夏までに三キロ痩せる","かおりちゃんのことが好き","本当は萌アニメがだいすき","櫻井君と結婚したい","毎日4時間は勉強するぞ","年間300冊読書するぞ","実は○○と付き合ってるんだよね","右目が疼く・・・","サッカー選手になりたい","あのオーディション受かりたい"]};

window.onload = $(function(){
	var i = Math.floor( Math.random()*12 );
	var con_test = data.himitsu[i];
	console.log(con_test);
	document.getElementById("content").innerHTML = con_test;
});