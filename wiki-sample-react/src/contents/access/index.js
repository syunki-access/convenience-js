import pageContents from './page.json';
import { 
  makeStyles,
} from '@material-ui/core/styles';

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

const Access = (props) => {
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
