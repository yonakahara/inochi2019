

/****************************************************************
 *
 *  NumUtil [update:2016/05/13]
 *
 ****************************************************************/
var NumUtil = (function() {
    function NumUtil() {}


    //==================================================
    // 数値をカンマ付き文字列に変換
    //==================================================
    NumUtil.convertCommaString = function(num){
        return num.toString().replace(/(\d)(?=(\d{3})+$)/g , '$1,');
    }

    //==================================================
    // カンマ付き＆単位付き数字を、数値に変換 ( "24px":string → 24:int )
    //==================================================
    NumUtil.convertInt = function(str){
        var str1 = str.replace(/,/g, "");
        var str2 = parseInt(str1, 10);
        return str2;
    }

    //==================================================
    // 足りない桁に0を追加する　( 12:number → 012:string )
    //==================================================
    NumUtil.convertDigitNum = function(num, figures){
        var str = String(num);
        while (str.length < figures) {
          str = "0"+str;
        }
        return str;
    }

    return NumUtil;
})();



/****************************************************************
 *
 *  ImgUtil [update:2015/12/10]
 *
 ****************************************************************/
var ImgUtil = (function() {
    function ImgUtil() {}

    //==================================================
    // .cover>img をcover表示する
    //==================================================
    ImgUtil.clipImages = function(){
        $(".cover").each(function(){
            var clip = $(this);
            var img  = clip.find("img");
            var imgSrc = img.attr("src");
            img.css({display:"none"});
            clip.css({
                backgroundImage:"url(" + imgSrc +")",
                backgroundRepeat:"no-repeat",
                backgroundPosition: "center center",
                backgroundSize: "cover"
            });
        });
    }

    //==================================================
    //　.contain>img を内包表示する
    //==================================================
    ImgUtil.containImages = function(){
        $(".contain").each(function(){
            var clip = $(this);
            var img  = clip.find("img");
            var imgSrc = img.attr("src");
            img.css({display:"none"});
            clip.css({
                backgroundImage:"url(" + imgSrc +")",
                backgroundRepeat:"no-repeat",
                backgroundPosition: "center center",
                backgroundSize: "contain"
            });
        });
    }


    return ImgUtil;
})();


/****************************************************************
 *
 *  BrowserUtil [update:2015/12/10]
 *
 ****************************************************************/
var BrowserUtil = (function() {
    function BrowserUtil() {}
	
	
    //==========================================================
    // ■ スクロール禁止（スマホ）
    // http://qiita.com/kokushin/items/ef96194bd0fa7c145d7b
    //==========================================================
    BrowserUtil.noActiveScroll = function(){
        $(window).on('touchmove.noScroll', function(e) {
    		e.preventDefault();
		});
	}
	BrowserUtil.activeSccroll = function(){
        $(window).off('.noScroll');
	}
	
	
    //==========================================================
    // ■ imgタグのみ Retina対応
    // http://writing-mode.com/20140304/retina/
    //==========================================================
    BrowserUtil.setRetina = function(){
        // 高解像度ディスプレイの時だけ実行
        if(window.devicePixelRatio > 1) {
            $('img').each(function() {
                var src = $(this).attr('src');
                $(this).attr('src', src.replace(/(.jpg|.png)/gi,'@2x$1')).error(function(){
                    $(this).attr('src', src); // @2xの画像がない場合は元画像を表示
                });
            });
        };
    }

    //==========================================================
    // ■スマホページ用サイズ自動調整(320px基準)
    //==========================================================
    BrowserUtil.setScaleZoomFit = function(){
        var _resizeHandler = function(){
            var zoomRatio = $(window).width()/320;
            $('#wrapper').css("zoom", zoomRatio );
            $('#guide').css("zoom", zoomRatio );
        }
        $(window).resize(_resizeHandler);
        _resizeHandler();
    };

    //==========================================================
    // ■接尾辞の付いたファイル名を返す
    //==========================================================
    BrowserUtil.getImgSrc = function( imgDefSrc, suffix ){
        var _temp = imgDefSrc.split("/");
        var _numSlashes = _temp.length;
        var baseSrc = "";
        for(var i=0; i <_temp.length-1; i++ ){  baseSrc += (_temp[i]+"/");  }
        var extension = _temp[_numSlashes-1].match(/.gif$|.jpg$|.png$/);
        var _temp2 = extension.input.split(".");
        var fileName = _temp2[0] + suffix + "." + _temp2[1];
        return baseSrc + fileName;
    };

    //==========================================================
    // ■IE判定と、IEのversion判定(IEでない場合:999)
    //==========================================================
    BrowserUtil.isIE = function(){   return /*@cc_on!@*/false;  }
    BrowserUtil.getIEVersionNum = function(){
        var v =999;
        if ( /*@cc_on!@*/false ) {
            var undef,
                v = 3,
                div = document.createElement('div'),
                all = div.getElementsByTagName('i');
            while (
                div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
                    all[0]
                );
            return v > 4 ? v : undef;
        }
        return v;
    }

    //=============================================================
    // ■ウインドウサイズを取得 (object型 / width:幅, height:高さ )
    //=============================================================
    BrowserUtil.getWindowSize= function(){
        var obj = new Object();
        if(window.innerWidth != undefined){
            obj.width = window.innerWidth;
            obj.height = window.innerHeight;
            return obj;
        }else if( document.documentElement && document.documentElement.clientHeight != 0 ){
            obj.width = document.documentElement.clientWidth;
            obj.height = document.documentElement.clientHeight;
            return obj;
        }else if(document.body){
            obj.width = document.body.clientWidth;
            obj.height = document.body.clientHeight;
            return obj;
        }
    }

    //=============================================================
    // ■ドキュメントサイズ（ページサイズ）を取得 (object型 / width:幅, height:高さ )
    //=============================================================
    BrowserUtil.getDocumentSize= function(){
        var obj = new Object();
        obj.width = document.documentElement.scrollWidth || document.body.scrollWidth;;
        obj.height = document.documentElement.scrollHeight || document.body.scrollHeight;;
        return obj;
    }

    //=============================================================
    // ■スクロール位置を取得 (object型 / top:縦値, left:横値 )
    //=============================================================
    BrowserUtil.getScrollPosition = function() {
        var obj = new Object();
        obj.top = document.documentElement.scrollTop  || document.body.scrollTop;
        obj.left = document.documentElement.scrollLeft || document.body.scrollLeft;
        return obj;
    }

    //==========================================================
    // ■ブラウザにとって有効な"html"or"body"のjQueryObjectを返す
    // （jquery.mousewheel.js 使う際に）
    // http://less.carbonfairy.org/post/941824993
    //==========================================================
    BrowserUtil.getRoot = function(){
        var html = $('html'), top = html.scrollTop();
        var el = $('<div/>').height(10000).prependTo('body');
        html.scrollTop(10000);
        var rs = !!html.scrollTop();
        html.scrollTop(top);
        el.remove();
        return $( rs ? 'html':'body' );
    };


    return BrowserUtil;
})();



/****************************************************************
 *
 *  DeviceUtil [update:2015/08/17]
 *
 ****************************************************************/
var DeviceUtil = (function() {
    function DeviceUtil() {}

    //============================================================
    //  [powered by device.js]
    //  https://github.com/matthewhudson/device.js
    //　http://coliss.com/articles/build-websites/operation/javascript/js-devicejs.html
    //============================================================

    // ■デバイス名を返す
    // "smartphone", "tablet", "desktop"
    //--------------------------------------------------------------
    DeviceUtil.getType = function(){
        var deviceType = "unknown";
        if( device.mobile() ){          deviceType = "smartphone";      }
        else if( device.tablet() ){     deviceType = "tablet";          }
        else{                           deviceType = "desktop";         }
        return deviceType;
    }

    // ■OS名を返す
    // "ios", "android", "windows", "blackberry", "unknown"
    //--------------------------------------------------------------
    DeviceUtil.getOs = function(){
        var osType = "unknown";
        if( device.ios() ){             osType = "ios";          }
        else if( device.android() ){    osType = "android";      }
        else if( device.windows() ){    osType = "windows";      }
        else if( device.blackberry() ){ osType = "blackberry";   }
        return osType;
    }

    // ■向きを返す
    // "landscape(横)", "portrait(縦)", "unknown（不明：PC等）"
    //--------------------------------------------------------------
    DeviceUtil.getDirection = function(){
        var directType = "unknown";
        if( device.landscape() ){       directType = "landscape";     }
        else if( device.portrait() ){   directType = "portrait";      }
        return directType;
    }


    return DeviceUtil;
})();