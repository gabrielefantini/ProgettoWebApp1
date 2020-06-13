import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';


export default function List({listElements,...rest}){
    return(
        <Row>
            {listElements.map((element, index) => (
                <Col md={6} lg={4} xl={2} >
                    <ListElement key={index} {...element}/>
                </Col>
            ))}
        </Row>
    );
}

function ListElement({brand, name, coast, ...rest}){
    return(
        <Card>
            <Card.Body>
            <Card.Subtitle className="mb-2 text-muted">{brand}</Card.Subtitle>
            <Card.Title>{name}</Card.Title>
            {coast? (
                <Card.Text>
            ‎       €{coast}
                </Card.Text>
            ):(<div></div>)}
            </Card.Body>
        </Card>
    );
}