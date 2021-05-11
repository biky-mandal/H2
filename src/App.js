import React, { useEffect } from 'react'
import {Route, Switch} from 'react-router-dom';
import Loginpage from './container/loginPage';
import Registerpage from './container/registerPage';
import Aboutpage from './container/aboutPage';
import Homepage from './container/homePage';
import Newsfeed from './container/newsFeed';
import Profilepage from './container/profilePage';
import BatchPage from './container/batchPage';
import Academic from './container/academic';


import PrivateRoute from './component/hoc';

import {isUserLoggedIn} from './actions/authAction';
import { useDispatch, useSelector } from 'react-redux';
import { GetProfileAction } from './actions/profileAction';
import { GetPostAction } from './actions/postAction';


function App() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if(!auth.authenticate){ 
      dispatch(isUserLoggedIn());
    }
  })
  useEffect(() => {
    if(auth.authenticate){
      dispatch(GetProfileAction());
      dispatch(GetPostAction());
    }
  })

  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Homepage}/>
        <Route path="/login" component={Loginpage}/>
        <Route path="/register" component={Registerpage}/>
        
        <PrivateRoute path="/newsfeed" component={Newsfeed}/>

        <PrivateRoute path="/academic" component={Academic}/>

        <PrivateRoute path="/about" component={Aboutpage}/>

        <PrivateRoute path="/profile" component={Profilepage}/>
        <PrivateRoute path="/batchmate" component={BatchPage}/>
      </Switch>
    </div>
  );
}

export default App;