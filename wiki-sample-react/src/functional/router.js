import { 
  BrowserRouter, 
  Route, 
  Link, 
  Routes 
} from 'react-router-dom';

// ページ用インポート
import 
  Index
from '../contents/pages/index/index';
import 
  Access
from '../contents/pages/access/index';
import 
  NotFound
from '../contents/pages/not_found/index';

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
        path="*" 
        element={<NotFound />} 
      />
    </Routes>
  </BrowserRouter>)
};

export default Router;