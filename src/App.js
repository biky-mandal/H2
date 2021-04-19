import React, { useEffect } from 'react'
import {Route, Switch} from 'react-router-dom';
import Loginpage from './container/loginPage';
import Registerpage from './container/registerPage';
import Aboutpage from './container/aboutPage';
import Contactpage from './container/contactPage';
import Homepage from './container/homePage';
import Newsfeed from './container/newsFeed';
import Profilepage from './container/profilePage';
import NotePage from './container/notespage';
import BookPage from './container/booksPage';
import SyllabusPage from './container/syllabusPage';
import BatchPage from './container/batchPage';


import PrivateRoute from './component/hoc';

import {isUserLoggedIn} from './actions/authAction';
import { useDispatch, useSelector } from 'react-redux';
import { GetProfileAction } from './actions/profileAction';


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
    }
  })

  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Homepage}/>
        <Route path="/login" component={Loginpage}/>
        <Route path="/register" component={Registerpage}/>
        
        <PrivateRoute path="/newsfeed" component={Newsfeed}/>

        <PrivateRoute path="/note" component={NotePage}/>
        <PrivateRoute path="/book" component={BookPage}/>
        <PrivateRoute path="/syllabus" component={SyllabusPage}/>

        <PrivateRoute path="/about" component={Aboutpage}/>
        <PrivateRoute path="/contact" component={Contactpage}/>

        <PrivateRoute path="/profile" component={Profilepage}/>
        <PrivateRoute path="/batchmate" component={BatchPage}/>
      </Switch>
    </div>
  );
}

export default App;