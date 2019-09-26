/*
 * ===================================================================
 *	jquery.layerBoard.js
 *	@auther:kiyoty
 *	@URI:http://www.idea-clippin.com
 *	@create:2012/12/30
 * 	@License:MIT License(X11 License、X License)
 * ===================================================================
 *	
 * -------------------------------------------------------------------
 *	opition
 * -------------------------------------------------------------------
 * delayTime		//表示までの待ち時間
 * fadeTime			//表示のフェード時間
 * alpha				//レイヤーの透明度
 * limitMin			//何分経過後に再度表示するか
 * easing				//イージング
 * limitCookie	//cookie保存期間
 *	
 * -------------------------------------------------------------------
 *	Example
 *	$('#layer_board_area').layerBoard({alpha:0.5});
 * -------------------------------------------------------------------
*/

(function($) {
	
  $.fn.layerBoard = function(option) {
  	
		var elements = this;
		
		elements.each(function(){
			
			option = $.extend({
				delayTime: 200,						//表示までの待ち時間
				fadeTime : 500,						//表示のフェード時間
				alpha : 0.5,							//レイヤーの透明度
				
				limitMin : 1,							//何分経過後に再度表示するか
				
				easing: 'linear',					//イージング
				
					//cookie保存期間
			}, option);
							
				

			
			/*----------------------------------------
				表示処理
			 ----------------------------------------*/
			function LayerBoardFunc () {
				
				
				$('.layer_board_bg', elements).show().animate({opacity: 0},0).delay(option.delayTime).animate({opacity: option.alpha},option.fadeTime,function(){
					$('.layer_board', elements).fadeIn(option.fadeTime);																																					
				})
					
			}
			
			
			/*----------------------------------------
				非表示処理
			 ----------------------------------------*/
			$('.layer_board_bg', elements).click(function() {
				
				$('.layer_board', elements).fadeOut(option.fadeTime);
				$(this).fadeOut(option.fadeTime);
				
				
			});
			
			
			//closeボタンの場合
			$('.btn_close', elements).click(function() {
				
				$('.layer_board', elements).fadeOut(option.fadeTime);
				$('.layer_board_bg', elements).fadeOut(option.fadeTime);
				
				
			});

			
			
			/*----------------------------------------
				ボタンによる表示処理
			 ----------------------------------------*/
			$('.layer_board_btn').click(function() {
				
				$('.layer_board_bg', elements).show().animate({opacity: 0},0).delay(option.delayTime).animate({opacity: option.alpha},option.fadeTime,function(){
					$('.layer_board', elements).fadeIn(option.fadeTime);																																					
				});
				
			});
	
		});
		
		return this;		
		
	};
	
})( jQuery );


