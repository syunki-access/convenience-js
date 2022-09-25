import { 
  BrowserRouter, 
  Route, 
  Link, 
  Routes 
} from 'react-router-dom';

// 共通ページ用インポート
import 
  Index
from '../contents/pages/index/index';
import 
  NotFound
from '../contents/pages/not_found/index';

// 各ページ用インポート
import 
  Access
from '../contents/pages/access/index';
import 
  Zyyg
from '../contents/pages/zyyg/index';

// ルーター設定
const Router = (props) => {
  return (<BrowserRouter>
    <Routes>
      <Route 
        path="/" 
        element={<Index />} 
      />
      <Route 
        path="/access" 
        element={<Access />} 
      />
      <Route 
        path="/zyyg" 
        element={<Zyyg />} 
      />
      <Route 
        path="*" 
        element={<NotFound />} 
      />
    </Routes>
  </BrowserRouter>)
};

export default Router;