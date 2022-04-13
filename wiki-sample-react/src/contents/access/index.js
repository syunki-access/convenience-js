import { 
  useState, 
  useEffect 
} from 'react';
import { 
  makeStyles,
} from '@material-ui/core/styles';
import getData from 'lib/get_data';

import pageContents from './page.json';

const useStyles = makeStyles({
  mainSec: {
    '& .Ssize':{
      fontSize: "50%",
    },
    '& .Msize':{
      fontSize: "100%",
    },
    '& .Lsize':{
      fontSize: "200%",
    },
  }
});

const getContentsData = (props) => {
  let _data;
  const _getData = getData();
  _getData.yml({
    'url':'./yml/access/data.yml',
    'callBack':function(yml){
      _data = jsyaml.load(yml);
      console.log('_data', _data);
    },
  });
  return _data;
};

const Access = (props) => {
  useEffect(() => {
    const _data = getContentsData({});
    return () => {
      //componentWillUnmount
    }
  }, []);
  console.log('pageContents', pageContents);
  const classes = useStyles();
  return (<div className={classes.mainSec}>
    <h1>accessのページあいうえおかきくけこ</h1>
    <div>
      <p className='Ssize'>Ssizeの文字ですよ。</p><br />
      <p className='Msize'>Msizeの文字ですよ。</p><br />
      <p className='Lsize'>Lsizeの文字ですよ。</p><br />
    </div>
  </div>)
};

export default Access;
