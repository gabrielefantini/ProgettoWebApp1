import React from 'react';
import { Container, Row, Col, Form, Button, Collapse } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import API from '../api/API';
import SecondaryWindow from '../utils/SecondaryWindow';
import List from '../utils/List';
import NavBar from './NavBar';
import "./Home.css";

export default function Home({cat, bran, ...rest}){

  const [cars, setCars] = React.useState([]);
  const location = useHistory().location;

  
    React.useEffect(() => {
      API.getPublicCars()
      .then((res)=>{
          setCars(res);
          setCarsToBeDisplayed(res);
      }).catch((err) =>{
        console.log(err); //TODO
      });
    }, [location]);


  //gestione delle macchine mostrate sulla home
  const [categories, setCategories] = React.useState(cat);
  const [brands, setBrands] = React.useState(bran);
  const [carsToBeDisplayed, setCarsToBeDisplayed] = React.useState([]);

  //cosa succede se viene selezionato un filtro tipo categoria
  const handleCategories = (name, isChecked) => {
    let x = [...categories];
    x.map((el) => {
        if(el.name === name) 
          el.isChecked = !isChecked;
        return el;
      });
    
    setCategories(x);
    setBrands(brands);
    filterCars();
  }
  //cosa succede se viene selezionato un filtro tipo marca
  const handleBrands = (name, isChecked) => {
    let x = [...brands];
    x.map((el) => {
        if(el.name === name) 
          el.isChecked = !isChecked;
        return el;
    });
    setCategories(categories);
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
      return cat;
    });

    let selectedBrands = [];
    brands.map((bran) => {
      if(bran.isChecked)
        selectedBrands.push(bran.name)
      return bran;
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
  //fine della gestione degli input

    return(
        <>
            <NavBar location={location.pathname}></NavBar>
            <Container fluid >
                <Row >
                    <Col md={4} sm={4} className="border border-dark">
                            <SecondaryWindow title={"Filtri"}>
                                <MainFilter name="Categoria" secondaryFilters={categories} handleCheck={handleCategories}>
                                </MainFilter>
                                <MainFilter name="Marca" secondaryFilters={brands} handleCheck={handleBrands}>
                                </MainFilter>
                            </SecondaryWindow>
                    </Col>
                    <Col md={8} sm={8} >
                        <SecondaryWindow title={"Risultati Ricerca"} >
                            <List cars={carsToBeDisplayed}/>
                        </SecondaryWindow>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

function MainFilter({name, secondaryFilters, ...rest}){
    const [open, setOpen] = React.useState(false);
    //N.B. in <Collapse> l'uso dell'id è segnalato come deprecato, chiedere al Prof
    
    return(
       <Row>
           <Col md={12}>
                <Button 
                    onClick={() => setOpen(!open)}
                    aria-controls="filters"
                    aria-expanded={open}>
                        {name}+
                    </Button>
           </Col>
            <Collapse in={open}>
                <Col id="filters">
                    {secondaryFilters.map((filter, index) => (
                        <SecondaryFilter key={index} {...filter} {...rest} />
                    ))}
                </Col>
            </Collapse>
       </Row>
    );
}

function SecondaryFilter({name, handleCheck, isChecked, ...rest}){
    return(
        <Row>
            <Col className="text-center">
                {name}
            </Col>
            <Col>
                <Form.Check checked={isChecked} onChange={() => handleCheck(name, isChecked)} />
            </Col>
        </Row>
    );
}
