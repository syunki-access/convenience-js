import { useContext } from "react";
import { PropsDataContext } from ".";

const useContextTest02 = () => {
  const propsData = useContext(PropsDataContext)
  return (<>
    <h3>useContextTest02</h3>
    <div>
      データ2<br />
      <p>名前: {propsData.name}</p>
      <p>データ1: {propsData.data1}</p>
      <p>データ2: {propsData.data2}</p>
      <p>カウント: {propsData.count}</p>
    </div>
  </>)
};

export default useContextTest02;
