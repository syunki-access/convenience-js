import { createContext, useEffect, useState } from "react";
import UseContextTest01 from "./useContextTest01";

// useContextのテスト用データ
const propsData = {
  name: 'あいうえお',
  data1: 'カキクケコ',
  data2: 'さしすせそ',
  count: 0,
}
// createContextで定義しておく
export const PropsDataContext = createContext(propsData);

const ReactHooksTest = (props) => {
  //let count = 0;
  const [count, setCount] = useState(0);

  const handleClick = () => {
    let _count = count + 1;
    setCount(_count);
    console.log('count', _count);
    // useContext用データも更新
    propsData.count = _count;
    console.log('propsData.count', propsData.count);
  };
  useEffect(() => {
    console.log('useEffect起動した');
  }, [count]);
  
  return (<>
    <h1>ReactHooksのお勉強</h1>
    <hr/>
    <h2>useState・useEffect</h2>
    <button onClick={handleClick}>＋</button>
    <p>{count}</p>
    <hr/>
    <PropsDataContext.Provider value={propsData}>
      <h2>useContext</h2>
      <UseContextTest01 />
    </PropsDataContext.Provider>
  </>)
};

export default ReactHooksTest;