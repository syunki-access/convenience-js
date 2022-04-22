import CreateSimpleTable from "./create_simple_table";
import ConvertHtml from "lib/convert_html";

const ProfileList = (props) => {
  const _proflist = props.proflist;
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
    profImg:'/img/no-img.png', 
    list:[],
  },
};

export default ProfileList;
