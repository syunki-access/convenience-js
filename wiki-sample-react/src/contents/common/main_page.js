import { 
  useState, 
  useEffect 
} from 'react';
import { 
  makeStyles,  
} from '@material-ui/core/styles';
import getData from 'lib/get_data';

//各パーツ
import HeaderTitleText from './header_title_text';
import ProfileList from './profile_list';
import HeaderDescriptionText from './header_description_text';
import MainContents from './main_contents';

//文字装飾スタイル
//ymlファイルにクラス名を定義すると使える
const StylesObj = () => {
  return {
    'mainSec':{
      '& .blackShadow':{
        'text-shadow': '0.1em 0.1em 0.2em black',
        color: '#FFFFFF',
      },
      '& .blackBordering':{
        'text-shadow': '2px 2px 1px #666, -2px  2px 1px #666, 2px -2px 1px #666, -2px -2px 1px #666,  2px  0px 1px #666, 0px  2px 1px #666, -2px  0px 1px #666, 0px -2px 1px #666',
        color: '#FFFFFF',
        'letter-spacing': '0.1em',
      },
      '& .thick':{
        'font-weight': 'bold',
      },
      '& .underline':{
        'background': 'linear-gradient(transparent 30%, #ff8282 90%)',
      },
    },
  }
};

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
  // useEffect定義
  useEffect(() => {
    getContentsData({
      url:props.url,
      callBack:(props) => {
        //state更新
        setHeader(props.data.header);
        setProflist(props.data.proflist);
        setMain(props.data.main);
      },
    });
    return () => {
      //componentWillUnmount
    }
  }, []);
  //スタイル適用
  const useStyles = () => {
    return makeStyles(
      StylesObj()
    )();
  };
  const classes = useStyles();
  //描画
  return (<div className={classes.mainSec}>
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
    <MainContents 
      mainList={main}
    />
  </div>)
};

MainPage.defaultProps = {
  url:'/yml/data_not_found.yml', //not_found用
};

export default MainPage;
