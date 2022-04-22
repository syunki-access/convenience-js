import React from "react";
import $ from 'jquery';
import ConvertHtml from "lib/convert_html";

//サブタイトル
const SetSubTitle = (props) => {
  const _text = props.value.value;
  return (<>
    <h3 className="subtitle-text">
      <ConvertHtml 
        text={_text} 
      />
    </h3>
  </>)
};

//カテゴリータイトル
const SetCategoryTitle = (props) => {
  const _text = props.value.value;
  return (<>
    <h4 className="categorye-text">
      <ConvertHtml 
        text={_text} 
      />
    </h4>
  </>)
};

//テキスト
const SetText = (props) => {
  const _text = props.value.value;
  return (<p>
    <ConvertHtml 
      text={_text} 
    />
  </p>)
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
          <li>
            <ConvertHtml 
              text={__val} 
            />
          </li>
        </React.Fragment>)
      })}
    </ul>
  </>)
};

//テーブル
const SetTable = (props) => {
  const _value = props.value;
  const _tableData = _value.value;
  return (<table className="table table-bordered">
    <tbody>
    {_tableData.map((__val, __index) => {
      let __class = '';
      if(__index == 0){
        __class = 'table-title';
      };
      return (<React.Fragment key={__index}>
        <tr className={__class}>
          {__val.list.map((__val2, __index2) => {
            return (<React.Fragment key={__index2}>
              {(() => {
                if(__index == 0){
                  return (<th>
                    <ConvertHtml 
                      text={__val2} 
                    />
                  </th>)
                }else{
                  return (<td>
                    <ConvertHtml 
                      text={__val2} 
                    />
                  </td>)
                };
              })()}
            </React.Fragment>)
          })}
        </tr>
      </React.Fragment>)
    })}
    </tbody>
  </table>)
};

//ページトップに戻るリンク制御
const tapToTopLink = (props) => {
  console.log('トップに戻るボタンタップしたよ', );
  $('html,body').animate({ scrollTop:$('#header').offset().top-20 }, 'fast');
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
              }else if(__val2.type == 'categoryTitle'){
                return (<React.Fragment key={__index2}>
                  <SetCategoryTitle 
                    value={__val2}
                  />
                </React.Fragment>)
              }else if(__val2.type == 'text'){
                return (<React.Fragment key={__index2}>
                  <SetText 
                    value={__val2}
                  />
                </React.Fragment>)
              }else if(__val2.type == 'list'){
                return (<React.Fragment key={__index2}>
                  <SetList 
                    value={__val2}
                  />
                </React.Fragment>)
              }else if(__val2.type == 'table'){
                return (<React.Fragment key={__index2}>
                  <SetTable 
                    value={__val2}
                  />
                </React.Fragment>)
              }else{
                //指定以外は描画しない
                return (<React.Fragment key={__index2}>
                </React.Fragment>)
              };
            })}
          </div>
          <div className="content-footer">
            <span className="anker" onClick={tapToTopLink}>▲ ページトップに戻る ▲</span>
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
