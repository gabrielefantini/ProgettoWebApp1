import React from 'react';
import { Container, Col, Row, DropdownButton, Dropdown, FormControl} from 'react-bootstrap';
import SecondaryWindow from '../../utils/SecondaryWindow';
import List from '../../utils/List';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";



export default function UserRent({rentResults,...rest}){

    return(
        <SecondaryWindow title="Noleggia una macchina">
            <RentForm {...rest} />
            <RentResults results={rentResults} />
        </SecondaryWindow>
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
                            <Dropdown.Item key={index} as="button" onClick={()=> setCategory(category)} >{category}</Dropdown.Item>))
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
                    <p>Km che si desidera percorrere durante il noleggio</p>
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

