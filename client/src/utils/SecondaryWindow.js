import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './SecondaryWindow.css'

export default function SecondaryWindow({title,...rest}){
    return(
        <Container fluid>
            <Row>
                <Col>
                    <h1>{title}</h1>
                </Col>
            </Row>
            {rest.children}
        </Container>
    );
}