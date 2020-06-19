import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import NoMatch from './NoMatch';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Login from './components/Login';
import User from './components/User/User';
import './App.css';
import PrivateRoute from './PrivateRoute';
import { AuthContext } from './context/auth';
import API from './api/API';


function App() {
  const cat=[
      {name:"A", isChecked:false},
      {name:"B", isChecked:false},
      {name:"C", isChecked:false},
      {name:"D", isChecked:false},
      {name:"E", isChecked:false}
    ];
  const bran=[
      {name:"Audi", isChecked:false},
      {name:"Fiat", isChecked:false},
      {name:"Ferrari", isChecked:false},
      {name:"Lamborghini", isChecked:false}
    ];
  /*
  const ca=[
    {brand:"fiat", name:"punto", category:"A"},
    {brand:"audi", name:"panda", category:"A"},
    {brand:"fiat", name:"punto", category:"B"},
    {brand:"audi", name:"panda", category:"A"},
    {brand:"fiat", name:"punto", category:"B"},
    {brand:"lamborghini", name:"panda", category:"A"}
  ];
  */
  
  
  //Login input props mokup
  const handleLogin = (a,b) => console.log(a,b);

  return (
    <AuthContext.Provider value={false}>
      <Router>
        <NavBar></NavBar>
        <Switch>
          <Route 
            exact path="/" 
            render={(props) => (
              <Home cat={cat} bran={bran}></Home>
            )}
          />
          <Route 
            path="/login"
            render={(props) => (
              <Login handleLogin={handleLogin}></Login>
            )}
          />
          <PrivateRoute
            path="/user"
            component={User}
          />
          <Route>
            <NoMatch/>
          </Route>
        </Switch>  
      </Router>
    </AuthContext.Provider>
  );

 
  //end of Login input props mokup

  /*return(
    <Login handleLogin={handleLogin}></Login>
  );*/
  
  /*
  return(
      <>
        <NavBar></NavBar>
        <User ></User>
      </>
  );
  */
}

export default App;
