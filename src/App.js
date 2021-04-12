import React, { useEffect } from 'react'
import {Route, Switch} from 'react-router-dom';
import Loginpage from './container/loginPage';
import Registerpage from './container/registerPage';
import Aboutpage from './container/aboutPage';
import Contactpae from './container/contactPage';
import Homepage from './container/homePage';
import Newsfeed from './container/newsFeed';
import Profilepage from './container/profilePage';
import PrivateRoute from './component/hoc';

import {isUserLoggedIn} from './actions/authAction';
import { useDispatch, useSelector } from 'react-redux';


function App() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if(!auth.authenticate){ 
      dispatch(isUserLoggedIn());
    }
  })

  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Homepage}/>
        <Route path="/login" component={Loginpage}/>
        <Route path="/register" component={Registerpage}/>
        <PrivateRoute path="/profile" component={Profilepage}/>
        <PrivateRoute path="/newsfeed" component={Newsfeed}/>
        <PrivateRoute path="/about" component={Aboutpage}/>
        <PrivateRoute path="/contact" component={Contactpae}/>
      </Switch>
    </div>
  );
}

export default App;