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
  var _jsonPath = '../json/wikiSample.json';
  Convenience.getJsonData({
    'jsonPath':_jsonPath,
    'callBack':function(json){
      if (json.main) {
        new Vue({
          'el':'#mainContentsWrapper',
          'data':json,
        });
      }
      //_callback();//コールバック実行
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
      var __listId = 'list'+index;
      us.temp({
        'type':'add',
        'tempSelector':'#tempListContent',
        'addSelector':_addSelector,
        'model':{
          "listClass":val.listClass,
          "listId":__listId,
        },
      });
      _.each(val.value, function(listVal, listIndex) {
        us.temp({
          'type':'add',
          'tempSelector':'#tempListTag',
          'addSelector':_addSelector+' .'+__listId,
          'model':{
            'value':listVal,
          },
        });
      });
    }else if(val.type == 'subTitle'){
      us.temp({
        'type':'add',
        'tempSelector':'#tempSubTitleContent',
        'addSelector':_addSelector,
        'model':val,
      });
    }else if(val.type == 'categoryTitle'){
      us.temp({
        'type':'add',
        'tempSelector':'#tempCategoryTitleContent',
        'addSelector':_addSelector,
        'model':val,
      });
    }else if(val.type == 'table'){
      var __tableId = 'table'+index;
      us.temp({
        'type':'add',
        'tempSelector':'#tempTableContent',
        'addSelector':_addSelector,
        'model':{
          "tableId":__tableId,
        },
      });
      _.each(val.value, function(tableVal, tableIndex) {
        us.temp({
          'type':'add',
          'tempSelector':'#tempTableTagTr',
          'addSelector':_addSelector+' .'+__tableId+' tbody',
          'model':{
            'trClass':tableVal.trClass,
            'trId':'tr'+tableIndex,
          },
        });
        _.each(tableVal.list, function(listVal, listIndex) {
          us.temp({
            'type':'add',
            'tempSelector':'#'+tableVal.tdTemplate,
            'addSelector':_addSelector+' .'+__tableId+' tbody .tr'+tableIndex,
            'model':{
              'value':listVal,
              'tdId':'td'+listIndex,
            },
          });
          //属性変更対応 配列に存在するものだけ適用
          if(tableVal.tdAttribute && tableVal.tdAttribute[listIndex]){
            var __selector = _addSelector+' .'+__tableId+' tbody .tr'+tableIndex+' .td'+listIndex;
            var __attr = tableVal.tdAttribute[listIndex].attr;
            var __value = tableVal.tdAttribute[listIndex].value;
            $(__selector).attr(__attr, __value);
          }
        });
      });
    };
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
