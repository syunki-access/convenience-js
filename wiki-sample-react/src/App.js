import { 
  BrowserRouter, 
  Route, 
  Link, 
  Routes 
} from 'react-router-dom';
import Access from './access/index';
import NotFound from './not_found/index';

const App = (props) => {
  return (<BrowserRouter>
    <div id="header"></div>
    <div className="main-content">
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
    </div>
    <div id="footer"></div>
  </BrowserRouter>)
};

export default App;