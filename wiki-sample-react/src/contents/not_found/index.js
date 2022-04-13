import MainPage from "contents/common/main_page";
import { 
  makeStyles,
} from '@material-ui/core/styles';

const useStyles = makeStyles({
  mainSec: {
    '& .notFoundTitle':{
      'font-style': 'italic',
    },
  }
});

const NotFound = (props) => {
  const classes = useStyles();
  return (<div className={classes.mainSec}>
    <MainPage 
      url="/yml/data_not_found.yml" 
    />
  </div>)
};

export default NotFound;
