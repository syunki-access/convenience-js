import CreateSimpleTable from "./create_simple_table";
import ConvertHtml from "lib/convert_html";

const ProfileList = (props) => {
  const _proflist = props.proflist;
  // それぞれデフォルト値設定
  if(!_proflist.name){
    _proflist.name = '---';
  };
  if(!_proflist.profImg){
    _proflist.profImg = '/img/common/no-img.png';
  };
  if(!_proflist.list){
    _proflist.list = [];
  };
  return (<>
    <div id="profList" className="infobox gcard proflist">
      <div id="profListName" className="name">
        <h3>
          <ConvertHtml 
            text={_proflist.name} 
          />
        </h3>
      </div>
      <div id="profListImg">
        <img className="img-responsive prof-img" src={_proflist.profImg} />
      </div>
      <div id="profListDescription" className="description">
        <CreateSimpleTable 
          tableData={_proflist.list} 
        />
      </div>
    </div>
  </>)
};

ProfileList.defaultProps = {
  proflist:{
    name:'---',
    profImg:'/img/common/no-img.png', 
    list:[],
  },
};

export default ProfileList;
