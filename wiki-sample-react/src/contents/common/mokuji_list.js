import React from "react";
import $ from "jquery";

const MoveInnerPage = (e) => { //イベントオブジェクトを取得する
  const _innerId = e.currentTarget.getAttribute("data-mokuji_id");
  $('html,body').animate({ scrollTop:$('#'+_innerId).offset().top-20 }, 'fast');
};

const MokujiList = (props) => {
  const _list = props.list;
  return (<>
    {_list.map((__index, __val) => { //引数はjqueryのリスト
      //カスタム属性の追加時には大文字は使えない
      return (<React.Fragment key={__index}>
        <li>
          <span className="anker" data-mokuji_id={$(__val).attr('id')} onClick={MoveInnerPage}>
            <span className="tocnumber">{Number(__index)+1}.</span>
            <span className="toctext">
              {$(__val).find('.title-text').text()}
            </span>
          </span>
        </li>
      </React.Fragment>)
    })}
  </>)
};

MokujiList.defaultProps = {
  list:[],
};

export default MokujiList;
