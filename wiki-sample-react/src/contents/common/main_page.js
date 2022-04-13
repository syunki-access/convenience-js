import { 
  useState, 
  useEffect 
} from 'react';
import getData from 'lib/get_data';

const getContentsData = (props) => {
  let _data;
  const _getData = getData();
  _getData.yml({
    'url':props.url,
    'callBack':function(yml){
      // jsyaml は外部呼び出しで使うlibなので eslint を無視する
      _data = jsyaml.load(yml); // eslint-disable-line no-undef
      console.log('_data', _data);
    },
  });
  return _data;
};

const MainPage = (props) => {
  useEffect(() => {
    const _data = getContentsData({
      url:props.url,
    });
    return () => {
      //componentWillUnmount
    }
  }, []);
  return (<>
    <div className="main-box">
  <h2 id="titleText" className="title-text">
access (音楽ユニット)【yml版】
</h2>
<div className="main-text">

<div id="profList" className="infobox gcard proflist">
  <div id="profListName" className="name">
<h3>access</h3>
</div>
  <div id="profListImg">
  <img className="img-responsive prof-img" src="../img/TEAR'S LIBERATION.jpg" />
</div>
  <div id="profListDescription" className="description">
  
<table className="tableProfListDescription">
<tbody>

<tr className=" tr0">
<th className="td0">別名</th>

<td className="td1">AXS</td>
</tr>

<tr className=" tr1">
<th className="td0">ジャンル</th>

<td className="td1">J-POP</td>
</tr>

<tr className=" tr2">
<th className="td0">活動期間</th>

<td className="td1">1992年 〜 1995年<br />2002年 〜</td>
</tr>

<tr className=" tr3">
<th className="td0"><hr /></th>

<td className="td1"><hr /></td>
</tr>

<tr className=" tr4">
<th className="td0">メンバー</th>

<td className="td1">浅倉大介（キーボード）<br />貴水博之（ボーカル）</td>
</tr>
</tbody>
</table>
</div>
</div>

<p id="descriptionText">
access（アクセス）は、キーボーディスト浅倉大介とボーカリスト貴水博之による日本の音楽ユニット。1992年にデビュー。1995年より活動を休止するが2002年に活動再開。<br />
所属レーベルはSony Music Associated Records。所属事務所はDarwin（浅倉）、Guan Barl（貴水）。
</p>

<div className="mokuji-list">
  <h2>目次</h2>
  <ul id="mokujiListUl">
  
<li>
<span className="anker" id="mokuji_memberSec">
<span className="tocnumber">1.</span>
<span className="toctext">メンバー</span>
</span>
</li>
</ul>
</div>

</div>
</div>
  </>)
};

MainPage.defaultProps = {
  url:'/yml/data_not_found.yml', //not_found用
};

export default MainPage;
