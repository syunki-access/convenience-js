import { createContext, useEffect, useRef, useState } from "react";
import UseContextTest01 from "./useContextTest01";

// useContextのテスト用データ
let propsDataOrg = {
  name: 'あいうえお',
  data1: 'カキクケコ',
  data2: 'さしすせそ',
  count: 0,
  handleClick: () => {
    console.log('元handleClickです');
  },
}
// createContextで定義しておく
export const PropsDataContext = createContext(propsDataOrg);

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
    // useContext用データも更新
    propsDataOrg.count = _count;
    console.log('propsData.count', propsDataOrg.count);
  };

  useEffect(() => {
    console.log('useEffect起動した');
    propsDataOrg.handleClick(); //最初に実行しておく
    //handleClickを持っていく
    propsDataOrg.handleClick = handleClick;
  }, []);

  // useRefを定義しておくことでjqueryのセレクタみたくいろんな値を参照することができる
  const inputText = useRef();
  const handleRef = () => {
    console.log('inputText', inputText);
    console.log('inputText.current.value', inputText.current.value);
  };

  return (<>
    <h1>ReactHooksのお勉強</h1>

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
  </>)
};

export default ReactHooksTest;