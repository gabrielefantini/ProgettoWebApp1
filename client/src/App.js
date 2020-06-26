import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import User from './components/User/User';
import './App.css';


function App() {

  //categorie e marchi disponibili
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

  return (
      <Router>
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
              <Login></Login>
            )}
          />
          <Route
            path="/user"
            render={(props) => (
              <User categories={cat}></User>
            )}
          />
          <Route>
            <Redirect to="/"/>
          </Route>
        </Switch>  
      </Router>
  );
}

export default App;
