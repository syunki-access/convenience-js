import React from "react";

//サブタイトル
const SetSubTitle = (props) => {
  const _text = props.value.value;
  return (<>
    <h3 className="subtitle-text">{_text}</h3>
  </>)
};

//リスト
const SetList = (props) => {
  const _value = props.value;
  const _listClass = _value.listClass;
  const _list = _value.value;
  return (<>
    <ul className={_listClass+" list-unstyled"}>
      {_list.map((__val, __index) => {
        return (<React.Fragment key={__index}>
          <li>{__val}</li>
        </React.Fragment>)
      })}
    </ul>
  </>)
};

const MainContents = (props) => {
  const _list = props.mainList;
  return (<>
    {_list.map((__val, __index) => { //reactの「map」は配列にしか使えない！！
      return (<React.Fragment key={__index}>
        <div className="main-box contents" id={__val.titleId}>
          <h2 className="title-text">{__val.titleText}</h2>
          <div className="main-text">
            {__val.contents.map((__val2, __index2) => {
              //各それぞれのtagを生成
              if(__val2.type == 'subTitle'){
                return (<React.Fragment key={__index2}>
                  <SetSubTitle 
                    value={__val2}
                  />
                </React.Fragment>)
              }else if(__val2.type == 'list'){
                return (<React.Fragment key={__index2}>
                  <SetList 
                    value={__val2}
                  />
                </React.Fragment>)
              }else{
              
              };
              
            })}
          </div>
          <div className="content-footer">
            <span className="anker">▲ ページトップに戻る ▲</span>
          </div>
        </div>
      </React.Fragment>)
    })}
  </>)
};

MainContents.defaultProps = {
  mainList:[], 
};

export default MainContents;
