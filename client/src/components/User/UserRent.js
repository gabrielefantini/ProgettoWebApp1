import React from 'react';
import { Container, Col, Row, DropdownButton, Dropdown, Navbar as SecondaryNavbar, Nav, Form} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import API from '../../api/API';
import SecondaryWindow from '../../utils/SecondaryWindow';
import Payment from '../../utils/Payment';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";



export default function UserRent({...rest}){
    /*
    const filter = {
        startDate:"11-12-2015",
        endDate:"15-12-2015",
        category:"A",
        driverAge:"10-12-1997",
        additionalDrivers: 3,
        dailyKm: 100,
        extraInsurance:false
    }
    */

    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState();
    const [category, setCategory] = React.useState("ScegliCategoria");
    const [driverAge, setDriverAge] = React.useState();
    const [additionalDrivers, setAdditionalDrivers] = React.useState("0");
    const [dailyKm, setDailyKm] = React.useState("20");
    const [extraInsurance, setExtraInsurance] = React.useState(false);
    
    const [rentProposal, setRentProposal] = React.useState({});

    const history = useHistory();

    const handleForm = (input) => {
        let start = startDate; let end = endDate; let cat = category; let driver = driverAge; let additional = additionalDrivers; let daily = dailyKm; let extra = extraInsurance;
        if(input.startDate) start = input.startDate; // deve essere maggiore di quella attuale 
        if(input.endDate) end = input.endDate; // deve essere maggiore di quella di inizio
        if(input.category) cat = input.category;
        if(input.driverAge) driver = input.driverAge; //deve essere >18 anni
        if(input.additionalDrivers) additional = input.additionalDrivers; //deve essere un numero intero positivo
        if(input.dailyKm) daily = input.dailyKm; //deve essere un intero positivo maggiore di zero
        if(input.extraInsurance !== undefined) extra = input.extraInsurance; //valore booleano
        setStartDate(start);
        setEndDate(end);
        setCategory(cat);
        setDriverAge(driver);
        setAdditionalDrivers(additional);
        setDailyKm(daily);
        setExtraInsurance(extra);
    }

    const formValues = {startDate, endDate, category, driverAge, additionalDrivers, dailyKm, extraInsurance};


    React.useEffect(()=>{
        //converto le date affinchè siano compatibili con il formato usato su sqlite3
        const newStartDate = moment(startDate).format('YYYY-MM-DD 00:00:00');
        const newEndDate = moment(endDate).format('YYYY-MM-DD 00:00:00');
        const newDriverAge = moment(driverAge).format('YYYY-MM-DD 00:00:00');
        if(startDate && endDate && category && driverAge && additionalDrivers && dailyKm){
            API.getRentProposal({startDate:newStartDate, endDate:newEndDate, category, driverAge:newDriverAge, additionalDrivers, dailyKm, extraInsurance})
            .then((res) => {setRentProposal(res); console.log(res);})
            .catch((err)=> {
                            if(err.status === 401)
                                history.push('/login');
                            else 
                                console.log(err);
                            });//TODO
        }
    },[startDate, endDate, category, driverAge, additionalDrivers, dailyKm, extraInsurance, history]);

    return(
        <>
            <SecondaryNavbar bg="light" variant="light">
                    <Nav className="mr-auto">
                        <Nav.Link active >Noleggia</Nav.Link>
                        <Nav.Link onClick={()=> history.push("/user/history")} >Storico Noleggi</Nav.Link>
                    </Nav>
            </SecondaryNavbar>
            <SecondaryWindow title="Noleggia una macchina">
                <RentForm handleForm={handleForm} {...formValues} {...rest} />
                <RentResult rentProposal={rentProposal} />
            </SecondaryWindow>
        </>
    );
}

function RentForm({handleForm, categories, 
                    startDate, endDate, category, driverAge, additionalDrivers, dailyKm, extraInsurance,
                    ...rest}){

    return(
        <Container>
            <Row>
                <Col>
                    <Form>
                        <Form.Group>
                            <Form.Label>Data di inizio noleggio</Form.Label>
                            <DatePicker
                                selected={startDate} 
                                minDate={new Date()}
                                maxDate={endDate}
                                onChange={date => handleForm({startDate:date})}/>
                        </Form.Group>  
                    </Form>
                </Col>
                <Col>
                    <Form>
                        <Form.Group>
                            <Form.Label>Data di fine noleggio</Form.Label>
                            <DatePicker 
                                selected={endDate}
                                minDate={startDate}
                                onChange={date => handleForm({endDate:date})} />
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form>
                        <Form.Group>
                            <Form.Label>Scegli una categoria di auto</Form.Label>
                            <DropdownButton id="dropdown-categories" title={category}>
                                {categories? (
                                    categories.map((el, index) => (
                                    <Dropdown.Item key={index} as="category" onClick={()=> handleForm({category:el.name})} >{el.name}</Dropdown.Item>))
                                    ) : (<p>categories not found</p>)
                                }
                            </DropdownButton>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form>
                        <Form.Group>
                        <Form.Label>Data di nascita del conducente</Form.Label>
                        <DatePicker 
                            selected={driverAge}
                            maxDate={new Date().setFullYear(new Date().getFullYear() - 18)}
                            onChange={date => handleForm({driverAge: date})} />
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form>
                        <Form.Group>
                            <Form.Label>Guidatori Aggiuntivi</Form.Label>
                            <DropdownButton 
                                id="dropdown-drivers" 
                                title={additionalDrivers==='0'? '0' : 'almeno 1'}>
                                    <Dropdown.Item as="driver" onClick={()=> handleForm({additionalDrivers:'0'})}>0</Dropdown.Item>
                                    <Dropdown.Item as="driver" onClick={()=> handleForm({additionalDrivers:'1'})}>almeno 1</Dropdown.Item>
                            </DropdownButton>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form>
                        <Form.Group>
                            <Form.Label>Percorrenza Giornaliera Stimata</Form.Label>
                            <DropdownButton 
                                id="dropdown-dailyKm" 
                                title={dailyKm==='20'?('Inferiore a 50Km'):(
                                        dailyKm==='100'?('Tra 50Km e 150Km'):('Superiore a 150Km'))
                                        }>
                                    <Dropdown.Item as="daylyKm" onClick={()=> handleForm({dailyKm:'20'})}>Inferiore a 50Km</Dropdown.Item>
                                    <Dropdown.Item as="daylyKm" onClick={()=> handleForm({dailyKm:'100'})}>Tra 50Km e 150Km</Dropdown.Item>
                                    <Dropdown.Item as="daylyKm" onClick={()=> handleForm({dailyKm:'200'})}>Superiore a 150Km</Dropdown.Item>
                            </DropdownButton>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>Assicurazione Extra</p>
                     <Form.Check checked={extraInsurance} onChange={() => handleForm({extraInsurance: !extraInsurance})} />
                </Col>
            </Row>    
        </Container>
        
        );
}

function RentResult({rentProposal, ...rest}){ //TODO va modificata!!!!!!!!!!!!!!!!!!!!!
    return(
        <Row className="border border-dark">
            <Col>
                <p>Costo: €{rentProposal.coast}</p> <br></br>
                <p>Disponibilità: {rentProposal.availability}</p>
            </Col>
            <Col>
                <Payment {...rentProposal}></Payment>
            </Col>
        </Row>
    );
}

