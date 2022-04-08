//共通変数定義
var tem;
var lm;
var us;
var te;

//Vue用インスタンス
var _vi = {};

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
  //Vueインスタンス生成
  createVueInstance({});
  //ページデータ読込
  getPageData({
    'callback':function(_args){
      __callback(_args)
    },
  });
  function __callback(_args){
    //ヘッダーコンテンツ追加
    createHeaderContents({
      'data':_args.data,
    });
    //プロフィールコンテンツ追加
    createProfileContents({
      'data':_args.data,
    });
    //メインコンテンツ追加
    createMainContents({
      'data':_args.data,
      'callback':function(){
        //目次自動生成
        createMokujiList({});
      },
    });
  };
};

//Vueインスタンス生成
function createVueInstance(_args){
  _vi.mainContents = new Vue({
    'el':'#mainContentsWrapper',
    'data':{
      'main':[],
    },
  });
  _vi.titleText = new Vue({
    'el':'#titleText',
    'data':{
      'titleText':'',
    },
  });
  _vi.descriptionText = new Vue({
    'el':'#descriptionText',
    'data':{
      'descriptionText':'',
    },
  });
  _vi.proflist = new Vue({
    'el':'#proflist',
    'data':{
      'proflist':{
        'name':'',
        'profImg':'../img/no-img.png',
        'list':[],
      },
    },
  });
};

//ページデータ読込
function getPageData(_args){
  var _callback = _args.callback;
  //コンテンツ用json読み込み
  var _url = '../json/wikiSample.json';
  Convenience.getJsonData({
    'url':_url,
    'callBack':function(json){
      _callback({
        'data':json,
      });
    },
  });
};

//メインコンテンツ追加
function createMainContents(_args){
  var _data = _args.data;
  var _callback = _args.callback;
  _vi.mainContents.main = _data.main;
  _vi.mainContents.$nextTick(function(){
    _callback();//コールバック実行
  });
};//createMainContents

//ヘッダーコンテンツ追加
function createHeaderContents(_args){
  var _data = _args.data;
  _vi.titleText.titleText = _data.header.titleText;
  _vi.descriptionText.descriptionText = _data.header.descriptionText;
};//createHeaderContents

//プロフィールコンテンツ追加
function createProfileContents(_args){
  var _data = _args.data;
  _vi.proflist.proflist = _data.proflist;
};//createProfileContents

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
