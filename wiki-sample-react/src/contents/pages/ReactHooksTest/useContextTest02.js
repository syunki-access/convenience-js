import { useContext } from "react";
import { PropsDataContext } from ".";

const useContextTest02 = () => {
  //Context用データ
  let propsData = useContext(PropsDataContext);
  //操作関数
  //呼び出されるコンポーネントでも親の値を更新できる
  const tapButton = (_args) => {
    propsData.handleClick(_args);
    console.log('useContextTest02.propsData.count', propsData.count);
  };

  return (<>
    <h3>useContextTest02</h3>
    <div>
      データ2<br />
      <p>名前: {propsData.name}</p>
      <p>データ1: {propsData.data1}</p>
      <p>データ2: {propsData.data2}</p>
      <p>カウント: {propsData.count}</p>
    </div>
    <div>
      カウント操作：
      {
        // jsx内で関数を呼び出して引数を持たせたいときは
        // 即時関数 () => hoge('') を使う
      }
      <button onClick={() => tapButton('plus')}>＋</button>
      <button onClick={() => tapButton('minus')}>−</button>
    </div>
  </>)
};

export default useContextTest02;
