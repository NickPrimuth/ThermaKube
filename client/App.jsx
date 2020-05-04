import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Cookies from 'js-cookie';

import Dashboard from './components/Dashboard.jsx';
import Main_Container from './containers/Main_Container';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Eks from './components/Eks.jsx';


const App = () => {
  let [mainCont, setMainCont] = useState();

  useEffect(() => {
    const token = Cookies.get('token'); //undefined if not logged in
    if(token) { //if token exists, render cluster page paths
      setMainCont(
        <Route
          path='/'
          children={(routeProps) => (
            <Main_Container {...routeProps} path={path} />
          )}
        /> 
      );
    }
    else { //else login path 
      setMainCont(
        <Route exact path='/login' component={Login} />
      );
    }

  }, [])


  //get current pathname for each
  const path = window.location.pathname;
  return (
    <Router>
      <Dashboard />
      <div className='appContainer' id='app'>
        <Switch>
          <Route exact path='/' component={Home} />
          {/* <Route exact path='/login' component={Login} /> */}
          <Route exact path='/eks' component={Eks} />
          {mainCont}
        </Switch>
      </div>
    </Router>
  );
};

export default App;
