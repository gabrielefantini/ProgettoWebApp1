import React from 'react';
import API from '../../api/API';
import { Table, Button, Row, Col, Navbar as SecondaryNavbar, Nav } from 'react-bootstrap';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import SecondaryWindow from '../../utils/SecondaryWindow';

export default function UserRentHistory(){

    const history = useHistory();
    const [rents, setRents] = React.useState([]);

    React.useEffect(()=>{
        API.getRentsHistory()
        .then((res) => {
            setRents(res);
        })
        .catch((err) => {
            if(err.status === 401)
                history.push('/login');
            else
                console.log(err);
        });
    }, [history]);

    const deleteRent = (rentId) => {
        API.deleteRent(rentId)
        .then(  
            API.getRentsHistory()
            .then((res) => {
                setRents(res);
             })
            .catch((err) => {
                if(err.status === 401)
                    history.push('/login');
                else
                    console.log(err);
            }))
        .catch((err) => {
            console.log(err); //TODO
        })
    }

    return(
        <>
            <SecondaryNavbar bg="light" variant="light">
                    <Nav className="mr-auto">
                        <Nav.Link onClick={()=> history.push("/user/")}>Noleggia</Nav.Link>
                        <Nav.Link active >Storico Noleggi</Nav.Link>
                    </Nav>
            </SecondaryNavbar>
            <SecondaryWindow title="Storico Noleggi">
                <HistoryList rents={rents} deleteRent={deleteRent}/>
            </SecondaryWindow>
        </>
    );
}

function HistoryList({rents, ...rest}){
    const history = useHistory();
    return(
        <>
            {rents.length!==0?(
                <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Data Inizio Noleggio</th>
                        <th>Data Fine Noleggio</th>
                        <th>Costo</th>
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
                            <Button block onClick={()=> history.push("/user/")}>Noleggia Auto</Button>
                        </Col>
                    </Row>)
            }
        </>
    );
}

function HistoryListElement({id, startDate, endDate, coast, deleteRent, ...rest}){
    
    const start = moment(startDate).format("DD-MM-YYYY");
    const end = moment(endDate).format("DD-MM-YYYY");

    const isCancellable = () => {
        return moment(startDate).isAfter(moment());
    }

    const handleCancellation = (event) => {
        event.preventDefault();
        deleteRent(id);
    }

    return(
        <tr>  
            <td>{start}</td>
            <td>{end}</td>
            <td>{coast}</td>
            <td>
                <Button variant="danger" disabled={!isCancellable()} onClick={(event)=>handleCancellation(event)}>
                    Revoca Noleggio
                </Button>
            </td>
        </tr>
    );
}