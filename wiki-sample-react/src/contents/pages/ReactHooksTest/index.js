import { createContext, useEffect, useReducer, useRef, useState } from "react";
import UseContextTest01 from "./useContextTest01";
import { type } from "@testing-library/user-event/dist/type";

//スタイル呼び出し
import "./index.scss";

//useContextのテスト用データ
let propsDataOrg = {
  name: 'あいうえお',
  data1: 'カキクケコ',
  data2: 'さしすせそ',
  count: 0,
  handleClick: () => {
    console.log('元handleClickです');
  },
}
//createContextで定義しておく
export const PropsDataContext = createContext(propsDataOrg);

//useReducer用の関数
const reducer = (state, action) => {
  switch (action.type) {
    case 'plus':
      return state + 1;
    case 'minus':
      return state - 1;
    default:
      return state;
  }
};

const ReactHooksTest = (props) => {
  //let count = 0;
  const [count, setCount] = useState(0);

  const handleClick = (_args) => {
    let _count = propsDataOrg.count;
    if(_args == 'plus'){
      _count = _count + 1;
    }else if(_args == 'minus'){
      _count = _count - 1;
    };
    setCount(_count);
    console.log('count', _count);
    //useContext用データも更新
    propsDataOrg.count = _count;
    console.log('propsData.count', propsDataOrg.count);
  };

  useEffect(() => {
    console.log('useEffect起動した');
    propsDataOrg.handleClick(); //最初に実行しておく
    //handleClickを持っていく
    propsDataOrg.handleClick = handleClick;
  }, []);

  //useRefを定義しておくことでjqueryのセレクタみたくいろんな値を参照することができる
  const inputText = useRef();
  const handleRef = () => {
    console.log('inputText', inputText);
    console.log('inputText.current.value', inputText.current.value);
  };

  //useReducerサンプル
  //やってることは↑の「handleClick」と変わらない
  //こういう書き方もできることを覚えておけば大丈夫
  const [state, dispatch] = useReducer(
    reducer,
    0
  )

  //タイトル色変更
  const mainTitle = useRef();
  const changeTitleColor = (_args) => {
    mainTitle.current.className = 'title ' + _args;
  };

  //リストサンプル
  const [listData, setListData] = useState([
    {
      id: 1,
      text: 'あいうえお',
    },
    {
      id: 2,
      text: 'かきくけこ',
    },
    {
      id: 3,
      text: 'さしすせそ',
    },
    {
      id: 4,
      text: 'なにぬねの',
    },
    {
      id: 5,
      text: 'はひふへほ',
    },
  ])
  const listMainRef = useRef();
  const changeNextList = () => {
    //liのclassを元に戻す
    listData.map((value, index) => {
      listMainRef.current.children[index].className = 'list';
    });
    let _list = [];
    listData.map((value, index) => {
      _list.push(
        {
          id: value.id+1,
          text: value.text+(value.id+1)
        }
      )
    });
    setListData(_list);
  };
  const changeBg = (e) => {
    //console.log('target', e.target);
    //console.log('currentTarget', e.currentTarget);
    //クリックイベントを記述してある場所は【 currentTarget 】で取得
    //背景色変更
    e.currentTarget.className = e.currentTarget.className + ' bgSet';
  };

  return (<div className="main">
    <h1 className="title" ref={mainTitle}>ReactHooksのお勉強</h1>
    <hr/>
    <h2>タイトル色変更</h2>
    <button onClick={() => changeTitleColor('black')}>black</button>
    <button onClick={() => changeTitleColor('red')}>red</button>
    <button onClick={() => changeTitleColor('burlywood')}>burlywood</button>
    <button onClick={() => changeTitleColor('')}>元に戻す</button>
    <hr/>
    <h2>useState・useEffect</h2>
    <button onClick={() => handleClick('plus')}>＋</button>
    <button onClick={() => handleClick('minus')}>−</button>
    <p>{count}</p>

    <hr/>
    <PropsDataContext.Provider value={propsDataOrg}>
      <h2>useContext</h2>
      <UseContextTest01 />
    </PropsDataContext.Provider>

    <hr/>
    <h2>useRef</h2>
    <input type="text" ref={inputText} />
    <button onClick={handleRef}>UseRef</button>

    <hr/>
    <h2>useReducer</h2>
    <p>カウント：{state}</p>
    <button onClick={() => dispatch({
      type: 'plus'
    })}>＋:プラス</button>
    <button onClick={() => dispatch({
      type: 'minus'
    })}>＋:マイナス</button>

    <hr/>
    <h2>リストサンプル</h2>
    <ul className="listMain" ref={listMainRef}>
      {
        listData.map((value, index) => {
          return (<div key={value.id} className="list" onClick={(e) => changeBg(e)}>
            <li>{value.id}:{value.text}</li>
          </div>);
        })
      }
    </ul>
    <button onClick={() => changeNextList()}>次のリストへ</button>
  </div>)
};

export default ReactHooksTest;