import React from 'react';
import { Card, Row, Col} from 'react-bootstrap';
import Payment from './Payment';

export default function List({listElements,...rest}){
    return(
        <Row>
            {listElements? ( 
                listElements.map((element, index) => (
                    <Col md={6} lg={4} xl={2}  key={index}>
                        <ListElement {...element} {...rest}/>
                    </Col>))
                ):(<p>no element found</p>)
            }
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
                <div>
                    <Card.Text>
                ‎       €{coast}
                    </Card.Text>
                    <Payment coast={coast} brand={brand} name={name} {...rest} />
                </div>
            ):(<div></div>)}
            </Card.Body>
        </Card>
    );
}

