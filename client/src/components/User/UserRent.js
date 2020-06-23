import React from 'react';
import { Container, Col, Row, DropdownButton, Dropdown, FormControl, Navbar as SecondaryNavbar, Nav} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import API from '../../api/API';
import SecondaryWindow from '../../utils/SecondaryWindow';
import List from '../../utils/List';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";



export default function UserRent({...rest}){
    const filter = {
        startDate:"11-12-2015",
        endDate:"15-12-2015",
        category:"A",
        driverAge:"10-12-1997",
        additionalDrivers: 3,
        dailyKm: 100,
        extraInsurance:false
    }

    const history = useHistory();

    React.useEffect(()=>{
        API.getAvaibleRents(filter)
        .then()
        .catch()
    },[]);

    return(
        <>
            <SecondaryNavbar bg="light" variant="light">
                    <Nav className="mr-auto">
                        <Nav.Link active >Noleggia</Nav.Link>
                        <Nav.Link onClick={()=> history.push("/user/history")} >Storico Noleggi</Nav.Link>
                    </Nav>
            </SecondaryNavbar>
            <SecondaryWindow title="Noleggia una macchina">
                <RentForm {...rest} />
                <RentResults results={[]} />
            </SecondaryWindow>
        </>
    );
}

function RentForm({startDate,endDate,birthDate,category,distance,categories,
                    setStartDate, setEndDate, setBirthDate, setCategory, setDistance,...rest}){

    return(
        <Container>
            <Row>
                <Col>
                    <p>Data di inizio noleggio</p>
                    <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
                </Col>
                <Col>
                    <p>Data di fine noleggio</p>
                    <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>Scegli una categoria di auto</p>
                    <DropdownButton id="dropdown-item-button" title={category}>
                        {categories? (
                            categories.map((category, index) => (
                            <Dropdown.Item key={index} as="button" onClick={()=> setCategory(category)} >{category.name}</Dropdown.Item>))
                            ) : (<p>categories not found</p>)
                        }
                    </DropdownButton>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>Data di nascita del conducente</p>
                    <DatePicker selected={birthDate} onChange={date => setBirthDate(date)} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>Percorrenza giornaliera stimata (in Km)</p>
                    <FormControl value={distance} onChange={(e)=>setDistance(e.target.value)}/>
                </Col>
            </Row>
        </Container>
        
        );
}

function RentResults({results,...rest}){
    return(
        <List listElements={results}/>
    );
}

