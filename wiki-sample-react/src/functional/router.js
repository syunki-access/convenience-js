import { 
  BrowserRouter, 
  Route, 
  Link, 
  Routes 
} from 'react-router-dom';
import Access from '../contents/pages/access/index';
import NotFound from '../contents/pages/not_found/index';

const Router = (props) => {
  return (<BrowserRouter>
    <Routes>
      <Route 
        path="/" 
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