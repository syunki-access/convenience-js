//共通変数定義
var tem;
var lm;
var us;
var te;

//処理開始
window.onload = function(){
  //共通変数一覧
  tem = new Convenience.touchEventManager(); //タッチイベント制御モジュール
  lm = new Convenience.linkManager(); //リンクモジュール
  us = new Convenience.underscoreFunc(); //underscore.jsまとめ
  te = Convenience.te;
  //起動
  init({});
};

//コンストラクタ
function init(_args) {
  //メインコンテンツ追加
  createMainContents({
    'callback':function(){
      //目次自動生成
      createMokujiList({});
      //content-footer生成
      createContentFooter({});
    },
  });
};

//メインコンテンツ追加
function createMainContents(_args){
  var _callback = _args.callback;
  //コンテンツ用json読み込み
  Convenience.getJsonData({
    'jsonPath':'../json/wikiSample.json',
    'callBack':function(json){
      if (json.main) {
        _.each(json.main, function(val, index) {
          us.temp({
            'type':'add',
            'tempSelector':'#tempMainContent',
            'addSelector':'#mainContentsWrapper',
            'model':val,
          });
          createContentsHTML({
            'contents':val.contents,
            'addSelector':'#'+val.titleId,
          });
        });
      }
      _callback();//コールバック実行
    },
  })
};//createMainContents

//各コンテンツHTMLを生成する
function createContentsHTML(_args) {
  var _contents = _args.contents;
  var _addSelector = _args.addSelector
  _addSelector = _addSelector+' .main-text';
  _.each(_contents, function(val, index) {
    if(val.type == 'text'){
      us.temp({
        'type':'add',
        'tempSelector':'#tempTextContent',
        'addSelector':_addSelector,
        'model':val,
      });
    }else if(val.type == 'list'){
      
    }
  });
}//createContentsHTML


//目次自動生成
function createMokujiList(_args){
  $('.contents').each(function(index, elem){
    us.temp({
      'type':'add',
      'tempSelector':'#tempMokujiList',
      'addSelector':'#mokujiListUl',
      'model':{
        'innerId':$(elem).attr('id'),
        'index':index+1,
        'text':$(elem).find('.title-text').text(),
      },
    });
    tem.addEvent({
      'selector':'#mokuji_'+$(elem).attr('id'),
      'func':function() {
        moveInnerPage({
          'inner_id':'#'+$(elem).attr('id'),
        });
      },
    });
  });
};//createMokujiList

//content-footer生成
function createContentFooter(_args){
  $('.contents').each(function(index, elem){
    us.temp({
      'type':'add',
      'tempSelector':'#tempContentFooter',
      'addSelector':'#'+$(elem).attr('id'),
      'model':{},
    });
    tem.addEvent({
      'selector':'.content-footer .anker',
      'func':function() {
        moveInnerPage({
          'inner_id':'#header',
        });
      },
    });
  });
};//createContentFooter

//ページ内リンク
function moveInnerPage(_args){
  var _inner_id = _args.inner_id;
  $('html,body').animate({ scrollTop:$(_inner_id).offset().top-20 }, 'fast');
};
