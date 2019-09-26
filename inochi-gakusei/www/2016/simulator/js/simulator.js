
const PARAMS = [
  // PART1
  {origin:76141,  min:71141,  max:76141,  value:76141,  step:1},  //心原性心肺機能停止数(年間)
  {origin:332,    min:332,    max:1000,   value:332,    step:1},  //一般市民による目撃率
  {origin:542,    min:542,    max:1000,   value:542,    step:1},  //目撃した一般市民による心肺蘇生実施率
  {origin:75,     min:75,     max:1000,   value:75,     step:1},  //心肺蘇生のうち、除細動(AED)実施率
  {origin:467,    min:467,    max:1000,   value:467,    step:1},  //心肺停止から救急隊員による心肺蘇生までの時間(10分以内到着率)

  // PART2
  {origin:76141,  min:71141,  max:76141,  value:76141,  step:1},
  {origin:332,    min:332,    max:1000,   value:332,    step:1},
  {origin:542,    min:542,    max:1000,   value:542,    step:1},
  {origin:75,     min:75,     max:1000,   value:75,     step:1}
];


//===========================================================
jQuery(function($){

  _setupSlider();
  _setupAccordion();
  _updateSingleFactors();
  _updateVariableFactors();

  // スタート時の表示
  $('.single-factor-container dl').eq(0).addClass("is-opened");
});


/*--------------------------------------------------
 Slider
 --------------------------------------------------*/
var _setupSlider = function(){

  $sliders          = $('.js-slider');
  $sliderValueTfs   = $('.value .num');
  $sliderOriginTfs  = $('.measure .origin .num');
  $sliderMaxTfs     = $('.measure .max .num');

  // [1]スライダー初期化
  for(var i=0; i<PARAMS.length; i++){
    var $s = $sliders.eq(i);
    var p  = PARAMS[i];
    $s.attr('value', p.value);
    $s.attr('step', p.step);
    $s.attr('min', p.min);
    $s.attr('max', p.max);

    if(i == 0 || i == 5){//「件数」
      $sliderValueTfs.eq(i).text(_convertNumToString(p.value));
      $sliderOriginTfs.eq(i).text(_convertNumToString(p.min));
      $sliderMaxTfs.eq(i).text(_convertNumToString(p.max));
    }else{//「％」
      $sliderValueTfs.eq(i).text(_convertNumToString(p.value/10));
      $sliderOriginTfs.eq(i).text(_convertNumToString(p.min/10));
      $sliderMaxTfs.eq(i).text(_convertNumToString(p.max/10));
    }
  }

  // [2]スライダーイベント設定
  $sliders.each(function(i){
    var $slider = $sliders.eq(i);
    var $output = $sliderValueTfs.eq(i);
    $slider.on("input change", function(){
      var valueNum  = NumUtil.convertInt($(this).val());

      if(i == 0 || i == 5){//「件数」
        $output.text(_convertNumToString(valueNum));
      }else{//「％」
        $output.text(_convertNumToString(valueNum/10));
      }

      if( i <= 4 )  _updateSingleFactors();   //STEP1
      else          _updateVariableFactors(); //STEP2
    });
  });

  // [3]rangeslider.js反映
  $sliders.rangeslider({
    polyfill: false
  });
}

// SingleFactor の画面表示を更新
//----------------------------------------------
var _updateSingleFactors = function(){

  var baseNum;
  var singleParams  = [];//{valueNum, numRescue, numRecovery, numRescueIcon, numRecoveryIcon}
  var $singleItems  = $(".single-factor-container dl");

  // [1] スライダーのvalue値を収集
  $singleItems.each(function(i){
    var obj = new Object();
    var valueNum = NumUtil.convertInt($(this).find('.value .num').eq(0).html());
    obj.valueNum = valueNum;
    singleParams.push(obj);
  });

  // [2] 演算
  // 1:心原性心肺機能停止数
  baseNum = singleParams[0].valueNum;
  singleParams[0].numRescue       = (76141-baseNum)+(Math.floor((Math.floor(baseNum*0.332*0.542)-Math.floor(baseNum*0.332*0.542*0.075))*0.125+(baseNum*0.332*0.542*0.075)*0.504)-Math.floor((Math.floor(76141*0.332*0.542)-Math.floor(76141*0.332*0.542*0.075))*0.125+(76141*0.332*0.542*0.075)*0.504));;
  singleParams[0].numRecovery     = (76141-baseNum)+(Math.floor((Math.floor(baseNum*0.332*0.542)-Math.floor(baseNum*0.332*0.542*0.075))*0.081+(baseNum*0.332*0.542*0.075)*0.433)-Math.floor((Math.floor(76141*0.332*0.542)-Math.floor(76141*0.332*0.542*0.075))*0.081+(76141*0.332*0.542*0.075)*0.433));;
  singleParams[0].numRescueIcon   = Math.floor(singleParams[0].numRescue / 100);
  singleParams[0].numRecoveryIcon = Math.floor(singleParams[0].numRecovery / 100);

  // 2:一般市民による目撃数
  baseNum = singleParams[1].valueNum/100;
  singleParams[1].numRescue       = Math.floor((Math.floor(76141*baseNum*0.542)-Math.floor(76141*baseNum*0.542*0.075))*0.125+(76141*baseNum*0.542*0.075)*0.504)-Math.floor((Math.floor(76141*0.332*0.542)-Math.floor(76141*0.332*0.542*0.075))*0.125+(76141*0.332*0.542*0.075)*0.504);
  singleParams[1].numRecovery     = Math.floor((Math.floor(76141*baseNum*0.542)-Math.floor(76141*baseNum*0.542*0.075))*0.081+(76141*baseNum*0.542*0.075)*0.433)-Math.floor((Math.floor(76141*0.332*0.542)-Math.floor(76141*0.332*0.542*0.075))*0.081+(76141*0.332*0.542*0.075)*0.433);
  singleParams[1].numRescueIcon   = Math.floor(singleParams[1].numRescue / 100);
  singleParams[1].numRecoveryIcon = Math.floor(singleParams[1].numRecovery / 100);

  // 3:一般市民による心配組成率
  baseNum = singleParams[2].valueNum/100;
  singleParams[2].numRescue       = Math.floor((Math.floor(76141*0.332*baseNum)-Math.floor(76141*0.332*baseNum*0.075))*0.125+(76141*0.332*baseNum*0.075)*0.504)-Math.floor((Math.floor(76141*0.332*0.542)-Math.floor(76141*0.332*0.542*0.075))*0.125+(76141*0.332*0.542*0.075)*0.504);
  singleParams[2].numRecovery     = Math.floor((Math.floor(76141*0.332*baseNum)-Math.floor(76141*0.332*baseNum*0.075))*0.081+(76141*0.332*baseNum*0.075)*0.433)-Math.floor((Math.floor(76141*0.332*0.542)-Math.floor(76141*0.332*0.542*0.075))*0.081+(76141*0.332*0.542*0.075)*0.433);
  singleParams[2].numRescueIcon   = Math.floor(singleParams[2].numRescue / 100);
  singleParams[2].numRecoveryIcon = Math.floor(singleParams[2].numRecovery / 100);

  // 4:AED実施率
  baseNum = singleParams[3].valueNum/100;
  singleParams[3].numRescue       = Math.floor((Math.floor(76141*0.332*0.542)-Math.floor(76141*0.332*0.542*baseNum))*0.125+(76141*0.332*0.542*baseNum)*0.504)-Math.floor((Math.floor(76141*0.332*0.542)-Math.floor(76141*0.332*0.542*0.075))*0.125+(76141*0.332*0.542*0.075)*0.504);
  singleParams[3].numRecovery     = Math.floor((Math.floor(76141*0.332*0.542)-Math.floor(76141*0.332*0.542*baseNum))*0.081+(76141*0.332*0.542*baseNum)*0.433)-Math.floor((Math.floor(76141*0.332*0.542)-Math.floor(76141*0.332*0.542*0.075))*0.081+(76141*0.332*0.542*0.075)*0.433);
  singleParams[3].numRescueIcon   = Math.floor(singleParams[3].numRescue / 100);
  singleParams[3].numRecoveryIcon = Math.floor(singleParams[3].numRecovery / 100);

  // 5:救急隊
  baseNum = singleParams[4].valueNum/100;
  singleParams[4].numRescue       = Math.floor((Math.floor(25255*baseNum)*0.135+(25255*(1-baseNum))*0.071)-Math.floor((Math.floor(25255*0.467)*0.135+(25255*0.533)*0.071)));
  singleParams[4].numRecovery     = Math.floor((Math.floor(25255*baseNum)*0.082+(25255*(1-baseNum))*0.04)-Math.floor((Math.floor(25255*0.467)*0.082+(25255*0.533)*0.04)));
  singleParams[4].numRescueIcon   = Math.floor(singleParams[4].numRescue / 100);
  singleParams[4].numRecoveryIcon = Math.floor(singleParams[4].numRecovery / 100);

  // [3]更新
  var i;
  var html;
  var liTag = "<li></li>";

  $singleItems.each(function(index){
    var numRescueStr    = ( singleParams[index].numRescue < 0 ) ? "+0" : "+" + NumUtil.convertCommaString(singleParams[index].numRescue);
    var numRecoveryStr  = ( singleParams[index].numRecovery < 0 ) ? "+0" : "+" + NumUtil.convertCommaString(singleParams[index].numRecovery);
    $(this).find('.rescue-box .result .add').text( numRescueStr );
    $(this).find('.recovery-box .result .add').text( numRecoveryStr );

    // アイコンの数でfont-sizeが変動させる
    var $rescueAddNumText = $(this).find('.rescue-box .result .add');
    var numRescueIcon = singleParams[index].numRescueIcon;
    $rescueAddNumText.removeClass('level1');  $rescueAddNumText.removeClass('level2');  $rescueAddNumText.removeClass('level3');  $rescueAddNumText.removeClass('level4');  $rescueAddNumText.removeClass('level5');
    if( numRescueIcon < 3 )       $rescueAddNumText.addClass('level1');
    else if( numRescueIcon < 10 )  $rescueAddNumText.addClass('level2');
    else if( numRescueIcon < 20 ) $rescueAddNumText.addClass('level3');
    else if( numRescueIcon < 40 ) $rescueAddNumText.addClass('level4');
    else                          $rescueAddNumText.addClass('level5');
    var $recoveryAddNumText = $(this).find('.recovery-box .result .add');
    var numRecoveryIcon = singleParams[index].numRecoveryIcon;
    $recoveryAddNumText.removeClass('level1');  $recoveryAddNumText.removeClass('level2');  $recoveryAddNumText.removeClass('level3');  $recoveryAddNumText.removeClass('level4');  $recoveryAddNumText.removeClass('level5');
    if( numRecoveryIcon < 3 )       $recoveryAddNumText.addClass('level1');
    else if( numRecoveryIcon < 10 ) $recoveryAddNumText.addClass('level2');
    else if( numRecoveryIcon < 20 ) $recoveryAddNumText.addClass('level3');
    else if( numRecoveryIcon < 40 ) $recoveryAddNumText.addClass('level4');
    else                            $recoveryAddNumText.addClass('level5');

    // アイコン表示反映
    html = "";
    for(i=0; i< singleParams[index].numRescueIcon; i++){   html += liTag;   }
    $singleItems.eq(index).find('.rescue-box .icon-list').html(html);
    html = "";
    for(i=0; i< singleParams[index].numRecoveryIcon; i++){ html += liTag;  }
    $singleItems.eq(index).find('.recovery-box .icon-list').html(html);
  });
}

// VariableFactors の画面表示を更新
//----------------------------------------------
var _updateVariableFactors = function(){

  var baseNum1;
  var baseNum2;
  var baseNum3;
  var baseNum4;
  var numRescue;
  var numRecovery;
  var numRescueIcon;
  var numRecoveryIcon;
  var variableParams  = [];//{totalNum}
  var $variableItems  = $(".variable-factor-container .factor-list > li");

  // [1] スライダーのvalue値を収集
  $variableItems.each(function(i){
    var obj = new Object();
    var valueNum = NumUtil.convertInt($(this).find('.value .num').eq(0).html());
    obj.valueNum = valueNum;
    variableParams.push(obj);
  });

  // [2] 演算
  baseNum1 = variableParams[0].valueNum;
  baseNum2 = variableParams[1].valueNum/100;
  baseNum3 = variableParams[2].valueNum/100;
  baseNum4 = variableParams[3].valueNum/100;
  numRescue       = (76141-baseNum1)+(Math.floor((Math.floor(baseNum1*baseNum2*baseNum3)-Math.floor(baseNum1*baseNum2*baseNum3*baseNum4))*0.125+(baseNum1*baseNum2*baseNum3*baseNum4)*0.504)-Math.floor((Math.floor(76141*0.332*0.542)-Math.floor(76141*0.332*0.542*0.075))*0.125+(76141*0.332*0.542*0.075)*0.504));
  numRecovery     = (76141-baseNum1)+(Math.floor((Math.floor(baseNum1*baseNum2*baseNum3)-Math.floor(baseNum1*baseNum2*baseNum3*baseNum4))*0.081+(baseNum1*baseNum2*baseNum3*baseNum4)*0.433)-Math.floor((Math.floor(76141*0.332*0.542)-Math.floor(76141*0.332*0.542*0.075))*0.081+(76141*0.332*0.542*0.075)*0.433));
  numRescueIcon   = Math.floor(numRescue / 1000);
  numRecoveryIcon = Math.floor(numRecovery / 1000);

  // [3]更新
  var numRescueStr    = ( numRescue < 0 ) ? "+0" : "+" + NumUtil.convertCommaString(numRescue);
  var numRecoveryStr  = ( numRecovery < 0 ) ? "+0" : "+" + NumUtil.convertCommaString(numRecovery);
  var $con = $('.monitor-container');
  $con.find('.rescue-box .result .add').text( numRescueStr );
  $con.find('.recovery-box .result .add').text( numRecoveryStr );

  // アイコンの数でfont-sizeが変動させる
  var $rescueAddNumText = $con.find('.rescue-box .result .add');
  $rescueAddNumText.removeClass('level1');  $rescueAddNumText.removeClass('level2');  $rescueAddNumText.removeClass('level3');  $rescueAddNumText.removeClass('level4');  $rescueAddNumText.removeClass('level5');
  if( numRescueIcon < 1 )       $rescueAddNumText.addClass('level1');
  else if( numRescueIcon < 4 )  $rescueAddNumText.addClass('level2');
  else if( numRescueIcon < 7 )  $rescueAddNumText.addClass('level3');
  else if( numRescueIcon < 10 ) $rescueAddNumText.addClass('level4');
  else                          $rescueAddNumText.addClass('level5');
  var $recoveryAddNumText = $con.find('.recovery-box .result .add');
  $recoveryAddNumText.removeClass('level1');  $recoveryAddNumText.removeClass('level2');  $recoveryAddNumText.removeClass('level3');  $recoveryAddNumText.removeClass('level4');  $recoveryAddNumText.removeClass('level5');
  if( numRecoveryIcon < 1 )       $recoveryAddNumText.addClass('level1');
  else if( numRecoveryIcon < 4 )  $recoveryAddNumText.addClass('level2');
  else if( numRecoveryIcon < 7 )  $recoveryAddNumText.addClass('level3');
  else if( numRecoveryIcon < 10 ) $recoveryAddNumText.addClass('level4');
  else                            $recoveryAddNumText.addClass('level5');

  // アイコン表示反映
  var i;
  var liTag = "<li></li>";
  var html = "";
  for(i=0; i< numRescueIcon; i++){   html += liTag;  }
  $con.find('.rescue-box .icon-list').html(html);
  html = "";
  for(i=0; i< numRecoveryIcon; i++){   html += liTag;  }
  $con.find('.recovery-box .icon-list').html(html);

}



/*--------------------------------------------------
 Accordion
 --------------------------------------------------*/
var _setupAccordion = function(){

  var $singleContainer = $('.single-factor-container');
  var $items           = $singleContainer.find('dl');
  var $itemTitles      = $singleContainer.find('dt');
  var $itemInners      = $singleContainer.find('dd');
  var i;

  $itemTitles.each(function(){
    $(this).on("click", function(){
      var indexNum = $(this).index('.single-factor-container dt');
      $($itemInners[indexNum]).slideToggle(300);
      $($items[indexNum]).toggleClass("is-opened");
    });
  });
}


//===========================================================
// helper
//===========================================================

// 数字を適切な表記にする
// ４桁以上→カンマ、２桁以下→小数点、０→”0”
//--------------------------------------------------
var _convertNumToString = function(num){
  if(num == 0)        out = "0";
  else if(num > 1000) out = NumUtil.convertCommaString(num);
  else if(num < 100)  out = num.toFixed(1);
  else                out = num+"";
  return out;
}



$(document).ready( function(){
  //キーボード操作などにより、オーバーレイが多重起動するのを防止する
  //$(this).blur() ;  //ボタンからフォーカスを外す
  if($("#modal-overlay")[0]) return false ;   //新しくモーダルウィンドウを起動しない [下とどちらか選択]
  //if($("#modal-overlay")[0]) $("#modal-overlay").remove() ;   //現在のモーダルウィンドウを削除して新しく起動する [上とどちらか選択]

  //オーバーレイ用のHTMLコードを、[body]内の最後に生成する
  $("body").append('<div id="modal-overlay"></div>');

  //[$modal-overlay]をフェードインさせる
  $("#modal-overlay").fadeIn("slow");
});

