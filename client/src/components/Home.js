import React from 'react';
import { Container, Row, Col, Form, Button, Collapse } from 'react-bootstrap';
import SecondaryWindow from '../utils/SecondaryWindow';
import List from '../utils/List';
import "./Home.css";

export default function Home({category, brand, handleCheck, cars, ...rest}){

    return(
        <Container fluid >
            <Row >
                <Col md={4} sm={4} className="border border-dark">
                        <SecondaryWindow title={"Filtri"}>
                            <MainFilter name="Categoria" secondaryFilters={category} handleCheck={handleCheck}>
                            </MainFilter>
                            <MainFilter name="Marca" secondaryFilters={brand} handleCheck={handleCheck}>
                            </MainFilter>
                        </SecondaryWindow>
                </Col>
                <Col md={8} sm={8} >
                    <SecondaryWindow title={"Risultati Ricerca"} >
                        <List listElements={cars}/>
                    </SecondaryWindow>
                </Col>
            </Row>
        </Container>
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
                        <SecondaryFilter key={index} {...filter} {...rest}/>
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
                <Form.Check checked={isChecked} onChange={() => handleCheck(name)} />
            </Col>
        </Row>
    );
}
