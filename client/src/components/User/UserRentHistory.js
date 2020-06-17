import React from 'react';
import { Table, Button, Row, Col } from 'react-bootstrap';
import SecondaryWindow from '../../utils/SecondaryWindow';

export default function UserRentHistory({...rest}){
    return(
        <SecondaryWindow title="Storico Noleggi">
            <HistoryList {...rest}/>
        </SecondaryWindow>
    );
}

function HistoryList({setCurrentPage, rents, ...rest}){
    return(
        <>
            {rents?(
                <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Modello</th>
                        <th>Marca</th>
                        <th>Data Inizio Noleggio</th>
                        <th>Data Fine Noleggio</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {rents.map((rent, index) => (<HistoryListElement key={index} {...rent} {...rest}/>))}
                </tbody>
                </Table> 
                ):( <Row>
                        <Col md={12} className="text-center"><h4>Nessun Noleggio Trovato</h4></Col>
                        <Col md={{span:6, offset:3}}>
                            <Button block 
                                onClick={(event) => {
                                    event.preventDefault();
                                    setCurrentPage('rent');
                                }}
                            >Noleggia Auto</Button>
                        </Col>
                    </Row>)
            }
        </>
    );
}

function HistoryListElement({name, brand, rentStartDate, rentEndDate, cancellation, ...rest}){
    
    const isCancellable = () => {
        const now = new Date();
        return rentEndDate > now;
    }

    const handleCancellation = (event) => {
        event.preventDefault();
        //cancellation()
    }

    return(
        <tr>
            <td>{name}</td>
            <td>{brand}</td>
            <td>{rentStartDate}</td>
            <td>{rentEndDate}</td>
            <td>
                <Button variant="danger" disabled={!isCancellable()} onClick={(event)=>handleCancellation(event)}>
                    Revoca Noleggio
                </Button>
            </td>
        </tr>
    );
}