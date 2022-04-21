import CreateSimpleTable from "./create_simple_table";

const ProfileList = (props) => {
  const _proflist = props.proflist;
  return (<>
    <div id="profList" className="infobox gcard proflist">
      <div id="profListName" className="name">
        <h3 dangerouslySetInnerHTML={{__html: _proflist.name}}/>
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
