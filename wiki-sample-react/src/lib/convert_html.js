import { 
  makeStyles,  
} from '@material-ui/core/styles';

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

const ConvertReturnToBrTag = (props) => {
  const _text = props.text;
  const _convertText = String(_text).replace(/(\r\n|\n|\r)/gm, '<br>');
  return _convertText;
};

const ConvertHtml = (props) => {
  const _textOrg = props.text;
  const _html = ConvertReturnToBrTag({
    text: _textOrg,
  });
  //スタイル適用
  const useStyles = () => {
    return makeStyles(
      StylesObj()
    )();
  };
  const classes = useStyles();
  return (<span className={classes.mainSec}>
    <span dangerouslySetInnerHTML={{__html: _html}}/>
  </span>)
};

export default ConvertHtml;