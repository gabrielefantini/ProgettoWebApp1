import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import SecondaryWindow from '../../utils/SecondaryWindow';

export default function UserHome({username,...rest}){
    return(
        <SecondaryWindow title={`Bentornato${username}`}>
            <Row>
                <Col md={{span:6, offset:3}}>
                    <Button block>Noleggia Auto</Button>
                </Col>
            </Row>
            <Row>
                <Col md={{span:6, offset:3}}>
                    <Button block>Storico Noleggi</Button>
                </Col>
            </Row>
        </SecondaryWindow>
    );
}