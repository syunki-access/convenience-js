//便利関数をobj化しておく
function convenienceCollection(){
  var _convenience = {};
  _convenience.g_move_span = 0;
  _convenience.g_move_span_limit = 10;
  
  //ローカルかどうか
  _convenience.isLocal = true;
  
  //共通実行関数
  _convenience.init = function(){
    // userAgent.
    var uaMatch = function() {
      const ua = navigator.userAgent.toLowerCase();
      for (var i = 0; i < arguments.length; i++) {
        if (ua.match(arguments[i])) {
          return true;
        }
      }
      return false;
    };
    var ua = {
      ios: uaMatch('ipad', 'iphone', 'ipod'),
      ipad: uaMatch('ipad'),
      ipod: uaMatch('ipod'),
      android: uaMatch('android'),
    };
    
    //タッチイベント制御
    _convenience.te = {};
    _convenience.te.tap = (function(){
      if (!ua.ios && !ua.android) {
        return 'click'; // pc browser.
      }
      return 'touchend'; // スマホ用
    })();
    _convenience.te.touchstart = (function(){
      if (!ua.ios && !ua.android) {
        return 'mousedown'; // pc browser.
      }
      return 'touchstart'; // スマホ用
    })();
    _convenience.te.touchmove = (function(){
      if (!ua.ios && !ua.android) {
        return 'mousemove'; // pc browser.
      }
      return 'touchmove'; // スマホ用
    })();
    _convenience.te.touchend = (function(){
      if (!ua.ios && !ua.android) {
        return 'mouseup'; // pc browser.
      }
      return 'touchend'; // スマホ用
    })();
    
    //toucheventの座標取得をひとつにまとめる
    var spanX = 0;
    var spanY = 0;
    var posX1 = 0;
    var posY1 = 0;
    document.addEventListener("touchstart",documentTouchStart,true);
    document.addEventListener("touchmove",documentTouchMove,true);
    document.addEventListener("touchend",documentTouchEnd,true);
    var touchTime = 0;
    function documentTouchStart(e){
      _convenience.g_move_span = 0;
      posX1 = e.changedTouches[0].pageX;
      posY1 = e.changedTouches[0].pageY;
    }//documentTouchStart
    function documentTouchMove(e){
      spanX = posX1 - e.changedTouches[0].pageX;
      spanY = posY1 - e.changedTouches[0].pageY;
      spanX = (spanX < 0) ? -spanX : spanX;
      spanY = (spanY < 0) ? -spanY : spanY;
      _convenience.g_move_span = (spanY - spanX > 0) ? spanY : spanX;
    }//documentTouchMove
    function documentTouchEnd(e){
      spanX = posX1 - e.changedTouches[0].pageX;
      spanY = posY1 - e.changedTouches[0].pageY;
      spanX = (spanX < 0) ? -spanX : spanX;
      spanY = (spanY < 0) ? -spanY : spanY;
      _convenience.g_move_span = (spanY - spanX > 0) ? spanY : spanX;
      //ダブルタップ禁止
      var nowTime = new Date().getTime();
      if(touchTime != 0){
        if(nowTime - touchTime < 500){
          e.preventDefault();
          return;
        }
      }
      touchTime = nowTime;
    }//documentTouchEnd
    
    //btnクラス制御
    $('.btn')
      .bind(_convenience.te.touchstart, function(){
        $(this).addClass('active');
    }).bind(_convenience.te.touchend, function(){
        $(this).removeClass('active');
    });
    
    //ローカル判定
    if (location.href.match(/http/)) {
      _convenience.isLocal = false;
    }
    if (location.href.match(/localhost/)) {
      _convenience.isLocal = true;
    }
    console.log('isLocal', _convenience.isLocal)
  }//init
  _convenience.init();
  
  //underscore.jsの機能まとめ
  _convenience.underscoreFunc = function(){
    var func = {};
    //template機能の短縮版
    //modelはmodel.hogeの形にすること
    func.temp = function(_args){
      var __tempSelector = _args.tempSelector;
      var __addSelector = _args.addSelector;
      var __model = _args.model;
      var __type = 'replace'; //指定がない時は差替
      if(_args.type && _args.type == 'add'){
        __type = _args.type;
      }
      var _temp = _.template($(__tempSelector).html());
      var _addElm = $(__addSelector);
      if(__type == 'add'){ //addのみ通す
        _addElm.append(_temp({
          'model':__model,
        }));
      }else{
        _addElm.html(_temp({
          'model':__model,
        }));
      }
    }//func.temp
    return func;
  }//underscoreFunc
  //内部的に使うために実行しておく
  _convenience.us = new _convenience.underscoreFunc();
  
  //非同期通信用関数
  _convenience.isLoading = false;
  //GET用
  _convenience.getJsonData = function(_args){
    var _jsonPath = _args.jsonPath;
    var _callBack = _args.callBack;
    var _errorCallBack = function(){
      console.log('json受信失敗')
    }
    if(_args.errorCallBack){
      _errorCallBack = _args.errorCallBack;
    }
    var _joinStr = '?';
    if(_jsonPath.indexOf('?') !== -1){
      _joinStr = '&';
    }
    _jsonPath = _jsonPath + _joinStr +'timestamp=' + new Date().getTime();
    // 通信中は次の通信は実行できない
    if(_convenience.isLoading){
      return;
    }
    // JSON取得実行
    $.ajax({
      'url':_jsonPath,
      'type':'GET',
      'dataType':'json',
    })
    // JSON取得成功
    .done(function(_json){
      _convenience.isLoading = false;
      _callBack(_json);//コールバックに渡す
    })
    // JSON取得失敗
    .fail(function(){
      _convenience.isLoading = false;
      _errorCallBack();
    })
    // 完了
    .always(function(){
      //この場合完了は定義しない
      _convenience.isLoading = false;
    });
    _convenience.isLoading = true;
  }//gGetJsonDataPost
  
  //タッチイベント制御関数
  //addするときにちゃんと前のイベントを自動で消してくれる
  // var tem = new gTouchEventManager();
  // tem.addEvent({
  //  'selector':'',
  //  'func':'',
  //  'isOnlyOne':'',
  // })
  // みたいに使う。
  _convenience.touchEventManager = function(){
    var _manager = {};
    _manager.removeEventList = {};
    //タッチイベント付与
    _manager.addEvent = function(_args){
      var __selector = _args.selector //selector
      var __jqElm = $(__selector); //touchさせるjQueryのElm
      var __eventType = _convenience.te.tap;
      var __isExe = false; //実行済みかどうか
      var __isOnlyOne = false;
      if(_args.isOnlyOne){ //一回限りの時
        __isOnlyOne = _args.isOnlyOne;
      }
      if(_args.eventType){ //イベントを指定する時
        __eventType = _args.eventType;
      }
      var __func = function(){
        if(_convenience.g_move_span > _convenience.g_move_span_limit) return; //移動したら起動させない
        if(__isOnlyOne && __isExe){ //連打をさせない
          return;
        }
        _args.func(); //実行させる関数
        event.stopPropagation(); //イベント伝播止める
        __isExe = true;
      };
      if(_manager.removeEventList[__selector]){ //存在してたら一度Event削除
        _manager.removeEventList[__selector]['elm'].off(__eventType, _manager.removeEventList[__selector]['func']);
      }
      __jqElm.on(__eventType, __func); //Event付与
      _manager.removeEventList[__selector] = {};
      _manager.removeEventList[__selector]['elm'] = __jqElm;
      _manager.removeEventList[__selector]['func'] = __func;
    }//addEvent
    //イベント削除
    _manager.removeEvent = function(_args){
      var __selector = _args.selector //selector
      if(_manager.removeEventList[__selector]){ //存在してたらEvent削除
        _manager.removeEventList[__selector]['elm'].off(__eventType, _manager.removeEventList[__selector]['func']);
      }
    }//removeEvent
    return _manager;
  }//touchEventManager
  //内部的に使うために実行しておく
  _convenience.tem = new _convenience.touchEventManager();
  
  //location.hrefの代替関数 連打対策
  // var link = new gLinkManager();
  // link.locationHref({
  //  'link':'',
  // })
  // みたいに使う。
  _convenience.linkManager = function(){
    var _manager = {};
    _manager.isTouch = true;
    _manager.locationHref = function(_args){
      var _link = _args.link;
      if(_manager.isTouch){
        location.href = _link;
        _manager.isTouch = false;
      }
    }//locationHref
    return _manager;
  }//gLinkManager
  
  //URLパラメータ取得
  _convenience.getURLParameter = function(_args){
    var arg = new Object;
    var pair = location.search.substring(1).split('&');
    for(var i=0;pair[i];i++) {
      var kv = pair[i].split('=');
      arg[decodeURIComponent(kv[0])]=decodeURIComponent(kv[1]);
    }
    return arg;
  }//_convenience.getURLParameter
  
  //日時取得
  _convenience.getDateShortening = function(_args){
    var _date = {};
    var _dateOrg = new Date(_args.date);
    _date.yobi = ["日", "月", "火", "水", "木", "金", "土"][_dateOrg.getDay()];
    _date.yr = _dateOrg.getFullYear();
    //月日は0をつけない
    _date.mo = (""+(_dateOrg.getMonth()+1)).slice(-2);
    _date.da = (""+_dateOrg.getDate()).slice(-2);
    _date.ho = ("0"+_dateOrg.getHours()).slice(-2);
    _date.mi = ("0"+_dateOrg.getMinutes()).slice(-2);
    _date.se = ("0"+_dateOrg.getSeconds()).slice(-2);
    return _date;
  }//gGetDateShortening
  
  //モーダルウィンドウ
  //htmlが存在していることが前提
  _convenience.modalWindowOpen = function(_args){
    var _message = _args.message
    _convenience.us.temp({
      'tempSelector':'#tempModalWindow',
      'addSelector':'.modal .message',
      'model':_args,
    });
    _convenience.tem.addEvent({
      'selector':'.modal .js-modal-close',
      'func':function(){
        $('.js-modal').fadeOut();
      },
    });
    $('.js-modal').fadeIn();
  }//modalWindowOpen
  
  //getParameterコンバート
  _convenience.convertGetParameter = function(_args){
    var _object = _args.object;
    var _parameter = '?';
    _.each(_object, function(val, key) {
      _parameter += '&'+key+'='+val;
    });
    _parameter = _parameter.replace('&', '');
    return _parameter;
  }//convertGetParameter
  
  //URLからクエリパラメータ削除
  _convenience.deleteURLParameter = function(_args){
    var _url_org = _args.url;
    var _url = _url_org.replace(/\?.*$/,"");
    return _url;
  }//deleteURLParameter
  
  //カウントダウン関数
  //currentTime, endTime は必ず「 0000/00/00 00:00:00 」の形式にする
  _convenience.countDownTimerManager = function(_args){
    var _callback = _args.callback;
    var _endTime = new Date(_args.endTime);
    var _currentTime = new Date(_args.currentTime);
    var _setSelector = _args.setSelector;
    var _isDispH = true; //H時間を表示するかどうか
    if(_args.isDispH != undefined){ //存在してれば
      _isDispH = _args.isDispH;
    }
    var _timer;
    var _countNum = 1000;
    var _secondCount = 0;
    var _count = function(){
      var spanS = _endTime - _currentTime - (_secondCount*_countNum);
      if(spanS < 0){//時間が過ぎたら
        clearInterval(_timer);
        _callback();//コールバック実行
        return;
      }
      var s = Math.floor(spanS / 1000);
      var m = Math.floor(s / 60);
      var h = Math.floor(m / 60);
      m %= 60;
      s %= 60;
      s = String(s + 100).substr(1, 2);
      m = String(m + 100).substr(1, 2);
      h = String(h + 100).substr(1, 2);
      var __h = '';
      if(_isDispH){
        __h = h + ":";
      }
      $(_setSelector).html(__h + m + ":" + s);
      _secondCount = _secondCount+1;
    }
    var _manager = {};
    _manager.start = function(){
      _count();
      _timer = setInterval(_count, _countNum);
    }
    _manager.stop = function(){
      clearInterval(_timer);
    }
    return _manager;
  }//countDownTimerManager
  
  return _convenience;
}//convenienceCollection

//すべて「Convenience」で使える
var Convenience = new convenienceCollection();
