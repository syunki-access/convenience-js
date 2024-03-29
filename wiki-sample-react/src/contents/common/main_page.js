import { 
  useState, 
  useEffect 
} from 'react';
import getData from 'lib/get_data';
import $ from 'jquery';

//各パーツ
import HeaderTitleText from './header_title_text';
import ProfileList from './profile_list';
import HeaderDescriptionText from './header_description_text';
import MainContents from './main_contents';
import MokujiList from './mokuji_list';

const getContentsData = (props) => {
  const _getData = getData();
  _getData.yml({
    'url':props.url,
    'callBack':(yml) => {
      // jsyaml は外部呼び出しで使うlibなので eslint を無視する
      const _data = jsyaml.load(yml); // eslint-disable-line no-undef
      props.callBack({
        data:_data,
      })
    },
  });
};

const MainPage = (props) => {
  // useState定義
  const [header, setHeader] = useState({});
  const [proflist, setProflist] = useState({});
  const [main, setMain] = useState([]);
  const [mokujiList, setMokujiList] = useState($('.contents'));
  // useEffect定義
  useEffect(() => {
    getContentsData({
      url:props.url,
      callBack:(props) => {
        //state更新
        setHeader(props.data.header);
        setProflist(props.data.proflist);
        setMain(props.data.main);
        //描画終了後に実行
        setTimeout(() => {
          setMokujiList($('.contents'))
        }, 10);
      },
    });
    return () => {
      //componentWillUnmount
    }
  }, []);
  
  //描画
  return (<>
    <div className="main-box">
      <div className="main-text">
        <HeaderTitleText 
          titleText={header.titleText} 
        />
        <ProfileList 
          proflist={proflist} 
        />
        <HeaderDescriptionText 
          descriptionText={header.descriptionText} 
        />
        <div className="mokuji-list">
          <h2>目次</h2>
          <ul id="mokujiListUl">
            <MokujiList 
              list={mokujiList}
            />
          </ul>
        </div>
      </div>
    </div>
    <MainContents 
      mainList={main}
    />
  </>)
};

MainPage.defaultProps = {
  url:'/yml/common/data_not_found.yml', //not_found用
};

export default MainPage;
