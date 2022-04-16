import React from "react";


const MainContents = (props) => {
  const _list = props.mainList;
  return (<>
    {_list.map((__val, __index) => { //reactの「map」は配列にしか使えない！！
      return (<React.Fragment key={__index}>
        <div className="main-box contents" id={__val.titleId}>
          <h2 className="title-text">{__val.titleText}</h2>
          <div className="main-text">
            コンテンツの中身です
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
