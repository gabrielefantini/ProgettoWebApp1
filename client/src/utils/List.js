import React from 'react';
import { Card, Row, Col} from 'react-bootstrap';

export default function List({cars, ...rest}){
    return(
        <Row>
            {cars? ( 
                cars.map((element, index) => (
                    <Col md={6} lg={4} xl={2}  key={index}>
                        <ListElement car={element} {...rest}/>
                    </Col>))):(<p>no element found</p>)}
        </Row>
    );
}

function ListElement({car, ...rest}){
    return(
        <Card>
            <Card.Body>
                <Card.Subtitle className="mb-2 text-muted">{car.brand}</Card.Subtitle>
                <Card.Title>{car.name}</Card.Title>
            </Card.Body>
        </Card>
    );
}

