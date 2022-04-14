
const ProfileList = (props) => {
  const _proflist = props.proflist;
  return (<>
    <div id="profList" className="infobox gcard proflist">
      <div id="profListName" className="name">
      <h3>{_proflist.name}</h3>
      </div>
      <div id="profListImg">
        <img className="img-responsive prof-img" src={_proflist.profImg} />
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
  </>)
};

ProfileList.defaultProps = {
  proflist:{
    name:'---',
    profImg:'/img/no-img.png', 
  },
};

export default ProfileList;
