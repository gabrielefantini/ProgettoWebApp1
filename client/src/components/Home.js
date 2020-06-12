import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SecondaryWindow from '../utils/SecondaryWindow';


export default function Home(props){
    return(
        <Container fluid >
            <Row >
                <Col md={4} sm={4} className="border border-dark">
                        <SecondaryWindow title={"Filtri"}>
                            <MainFilter>
                                <SecondaryFilter/>
                            </MainFilter>
                        </SecondaryWindow>
                </Col>
                <Col md={8} sm={8} >
                    <SecondaryWindow title={"Risultati Ricerca"} >
                        <List/>
                    </SecondaryWindow>
                </Col>
            </Row>
        </Container>
    );
}

function MainFilter(props){
    return(<p>prova</p>);
}

function SecondaryFilter(props){
    return(<p>prova</p>);
}

function List(props){
    return(
        <>
            <p>prova</p>
            <ListElement/>
        </>
        );
}

function ListElement(props){
    return(<p>prova</p>);
}