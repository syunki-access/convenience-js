import Router from '../functional/router';

const App = (props) => {
  return (<>
    <div id="header"></div>
    <div className="main-content">
      <Router />
    </div>
    <div id="footer"></div>
  </>)
};

export default App;