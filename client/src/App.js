import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch, useLocation} from "react-router-dom";
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
  const [cars, setCars] = React.useState([]);
  const location = useLocation();

  
    React.useEffect(() => {
      API.getPublicCars()
      .then((res)=>{
          setCars(res);
          setCarsToBeDisplayed(res);
      });
    }, [location]);

  //fine parte di mokup

  //gestione delle macchine mostrate sulla home
  const [categories, setCategories] = React.useState(cat);
  const [brands, setBrands] = React.useState(bran);
  const [CarsToBeDisplayed, setCarsToBeDisplayed] = React.useState([]);

  //cosa succede se viene selezionato un filtro tipo categoria
  const handleCategories = (name, isChecked) => {
    let x = [...categories];
    x.map((el) => {
      if(el.name === name) 
        el.isChecked = !isChecked;
      });
    
    setCategories(x);
    filterCars();
  }
  //cosa succede se viene selezionato un filtro tipo marca
  const handleBrands = (name, isChecked) => {
    let x = [...brands];
    x.map((el) => {
      if(el.name === name) 
        el.isChecked = !isChecked;
      });

    setBrands(x);
    filterCars();
  }

  //filtro tutte le macchine in base ai filtri attualmente attivi
  //N.B. ogni volta filtro il pool originale di macchine!!!

  const filterCars = () => {
    let selectedCategories = [];
    categories.map((cat) => {
      if(cat.isChecked)
        selectedCategories.push(cat.name)
      });

    let selectedBrands = [];
    brands.map((bran) => {
      if(bran.isChecked)
        selectedBrands.push(bran.name)
      });
    
    let selectedCars = cars;

    if(selectedCategories.length !== 0){
      selectedCars = selectedCars.filter((car) => {
        return (selectedCategories.includes(car.category));
      });
    }
    if(selectedBrands.length !== 0){
      selectedCars = selectedCars.filter((car) => {
        return (selectedBrands.includes(car.brand));
      });
    }
    setCarsToBeDisplayed(selectedCars);
  }
  //fine della gestione degli input del componente home
  
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
              <Home category={categories} brand={brands} handleCheck={[handleCategories, handleBrands]} cars={CarsToBeDisplayed}></Home>
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
