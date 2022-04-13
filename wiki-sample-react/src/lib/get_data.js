import $ from 'jquery';

let isLoading = false;

const getDataBase = (props) => {
  let _url = props.url; //urlは必須
  let _dataType = props.dataType;
  let _type = props.type;
  let _callBack = props.callBack;
  //それぞれデフォルトを設定
  if(!_dataType){
    _dataType = 'json';
  }
  if(!_type){
    _type = 'GET';
  }
  if(!_callBack){
    _callBack = function(){
      //何もしない
    };
  }
  let _errorCallBack = function(){
    console.log('json受信失敗')
  }
  if(props.errorCallBack){
    _errorCallBack = props.errorCallBack;
  }
  let urlStr = '?';
  if(_url.indexOf('?') !== -1){
    urlStr = '&';
  }
  _url = _url + urlStr +'timestamp=' + new Date().getTime();
  // 通信中は次の通信は実行できない
  if(isLoading){
    return;
  }
  // data取得実行
  $.ajax({
    'url':_url,
    'type':_type,
    'dataType':_dataType,
  })
  // data取得成功
  .done(function(_data){
    isLoading = false;
    _callBack(_data);//コールバックに渡す
  })
  // data取得失敗
  .fail(function(){
    isLoading = false;
    _errorCallBack();
  })
  // 完了
  .always(function(){
    //この場合完了は定義しない
    isLoading = false;
  });
  isLoading = true; 
};

const getData = (props) => {
  let _getDataObj = {};
  //json用
  _getDataObj.json = (_props) => {
    getDataBase({
      'url':_props.url,
      'dataType':'json',
      'type':'GET',
      'callBack':_props.callBack,
      'errorCallBack':_props.errorCallBack,
    })
  };
  //yml用
  _getDataObj.yml = (_props) => {
    getDataBase({
      'url':_props.url,
      'dataType':'text',
      'type':'GET',
      'callBack':_props.callBack,
      'errorCallBack':_props.errorCallBack,
    })
  };
  return _getDataObj;
};

export default getData;