import React from 'react';
import Home from './components/Home';
import Login from './components/Login';
import './App.css';

function App() {
  //Home input props mokup
  const categorie=[
    {name:"A", isChecked:false},
    {name:"B", isChecked:true}
  ];
  const marche=[
    {name:"audi", isChecked:true},
    {name:"fiat", isChecked:false}
  ];
  const handleChek = (name) => console.log(name);

  const cars=[
    {brand:"fiat", name:"punto", coast:30000000},
    {brand:"audi", name:"panda", coast:3000},
    {brand:"fiat", name:"punto", coast:30000000},
    {brand:"audi", name:"panda", coast:3000},
    {brand:"fiat", name:"punto", coast:30000000},
    {brand:"audi", name:"panda", coast:3000},
    {brand:"fiat", name:"punto", coast:30000000},
    {brand:"audi", name:"panda", coast:3000},
    {brand:"fiat", name:"punto", coast:30000000},
    {brand:"audi", name:"panda", coast:3000},
  ];
  //end of home input props mokup
  
  /*return (
    <Home category={categorie} brand={marche} handleCheck={handleChek} cars={cars}></Home>
  ); */
  return(
    <Login></Login>
  );
}

export default App;
