import React,{useState,useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './Login';
// import Registration from './Registration';
import HomeHeader from './HomeHeader';
import Register from "./Register1"
import { auth } from './firebase';
import Sidebar from './Sidebar';
import Sidebar2 from './Sidebar2';
import Posts from './Posts';
import Profile from './Profile';
import Messenger from './Messenger';
import {Provider} from 'react-redux';
import store from './store';
function App() {
  const [user,setUser]=useState("")
  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser)
      {
        setUser(authUser)
      }
      else{
        setUser(false)
      }
    })
  },[])
  return (
    <Provider store={store}>
    <div className="">
      <Router>
        <Switch>
          <Route exact path="/" component={Login}></Route>
          {/* <Route path="/login"> */}
          {/* <Route path="/login">

            <Login/>

          </Route> */}
          <Route path="/messenger">
            {/* <Registration/> */}
            <HomeHeader user={user}/>
            <Messenger/>
          </Route>
          <Route path="/register">
            {/* <Registration/> */}
            <Register/>
          </Route>
          <Route path="/:username/:uid">
              <HomeHeader user={user} />
              <Profile user={user} />
            </Route>
          <Route path="/ab">
            <HomeHeader user={user} selected/>
            <div className="app__page">
              <Sidebar user={user}/>
                <div className="app__posts">
                  <Posts user={user}/>
                </div>
              <Sidebar2 user={user}/>
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
    </Provider>
  );
}

export default App;
