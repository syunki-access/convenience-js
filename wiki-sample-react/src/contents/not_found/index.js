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

const NotFound = (props) => {
  const classes = useStyles();
  return (<div className={classes.mainSec}>
    <h1>そんなページはありません。。。</h1>
    <p className='Ssize'>てすとテキストてすとテキストてすとテキストてすとテキストてすとテキストてすとテキスト</p>
  </div>)
};

export default NotFound;
