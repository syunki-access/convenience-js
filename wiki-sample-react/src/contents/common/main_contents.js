import React from "react";


const MainContents = (props) => {
  const _list = props.mainList;
  console.log('_list', _list);
  return (<>
    {_list.map((val, index) => {
      return (<React.Fragment key={index}>
        <div class="main-box contents" id={val.titleId}>
          <h2 class="title-text">{val.titleText}</h2>
          <div class="main-text">
            コンテンツの中身です
          </div>
          <div class="content-footer">
            <span class="anker">▲ ページトップに戻る ▲</span>
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
