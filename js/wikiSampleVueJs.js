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
  
  //Vueプラグイン起動
  Vue.use(VueScrollTo, {
    container:'body',
  });
  
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
    },
  });
};

//メインコンテンツ追加
function createMainContents(_args){
  var _callback = _args.callback;
  //Vueインスタンス生成
  var _vm = new Vue({
    'el':'#mainContentsWrapper',
    'data':{
      'main':[],
    },
  });
  //コンテンツ用json読み込み
  var _jsonPath = '../json/wikiSample.json';
  Convenience.getJsonData({
    'jsonPath':_jsonPath,
    'callBack':function(json){
      if (json) {
        _vm.main = json.main;
      };
      _vm.$nextTick(function(){
        _callback();//コールバック実行
      });
    },
  })
};//createMainContents

//目次自動生成
function createMokujiList(_args){
  var _mokujiData = [];
  $('.contents').each(function(index, elem){
    _mokujiData.push({
      'innerId':$(elem).attr('id'),
      'index':index+1,
      'text':$(elem).find('.title-text').text(),
    });
  });
  new Vue({
    'el':'#mokujiListUl',
    'data':{
      'mokuji':_mokujiData,
    },
  });
};//createMokujiList
