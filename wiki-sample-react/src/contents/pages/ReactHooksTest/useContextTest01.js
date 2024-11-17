import { useContext } from "react";
import UseContextTest02 from "./useContextTest02";
import { PropsDataContext } from ".";

const useContextTest01 = () => {
  const propsData = useContext(PropsDataContext);
  return (<>
    <h3>useContextTest01</h3>
    <div>
      データ1<br />
      <p>名前: {propsData.name}</p>
      <p>データ1: {propsData.data1}</p>
      <p>データ2: {propsData.data2}</p>
      <p>カウント: {propsData.count}</p>
    </div>
    <div>
      ▼▼▼▼ 孫コンポーネント呼び出し ▼▼▼▼
      <UseContextTest02 />
    </div>
  </>)
};

export default useContextTest01;
