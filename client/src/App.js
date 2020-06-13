import React from 'react';
import Home from './components/Home';
import './App.css';

function App() {
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
    {brand:"fiat", name:"punto", coast:30000000}
  ];

  return (
    <Home category={categorie} brand={marche} handleCheck={handleChek} cars={cars}></Home>
  );
}

export default App;
