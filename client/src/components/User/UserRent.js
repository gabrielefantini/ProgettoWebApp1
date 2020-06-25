import React from 'react';
import { Container, Col, Row, DropdownButton, Dropdown, FormControl, Navbar as SecondaryNavbar, Nav, Form} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import API from '../../api/API';
import SecondaryWindow from '../../utils/SecondaryWindow';
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
    const [endDate, setEndDate] = React.useState(new Date());
    const [category, setCategory] = React.useState("ScegliCategoria");
    const [driverAge, setDriverAge] = React.useState(new Date());
    const [additionalDrivers, setAdditionalDrivers] = React.useState("");
    const [dailyKm, setDailyKm] = React.useState("");
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
        console.log(newDriverAge);
        API.getRentProposal({startDate:newStartDate, endDate:newEndDate, category, driverAge:newDriverAge, additionalDrivers, dailyKm, extraInsurance})
        .then((res) => setRentProposal(res))
        .catch((err)=> console.log(err));//TODO
    },[startDate, endDate, category, driverAge, additionalDrivers, dailyKm, extraInsurance]);

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
                <RentResult result={rentProposal} />
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
                    <p>Data di inizio noleggio</p>
                    <DatePicker selected={startDate} onChange={date => handleForm({startDate:date})}/>
                </Col>
                <Col>
                    <p>Data di fine noleggio</p>
                    <DatePicker selected={endDate} onChange={date => handleForm({endDate:date})} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>Scegli una categoria di auto</p>
                    <DropdownButton id="dropdown-item-button" title={category}>
                        {categories? (
                            categories.map((el, index) => (
                            <Dropdown.Item key={index} as="button" onClick={()=> handleForm({category:el.name})} >{el.name}</Dropdown.Item>))
                            ) : (<p>categories not found</p>)
                        }
                    </DropdownButton>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>Data di nascita del conducente</p>
                    <DatePicker selected={driverAge} onChange={date => handleForm({driverAge: date})} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>Guidatori aggiuntivi</p>
                    <FormControl value={additionalDrivers} onChange={(e)=>handleForm({additionalDrivers:e.target.value})}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>Percorrenza giornaliera stimata (in Km)</p>
                    <FormControl value={dailyKm} onChange={(e)=>handleForm({dailyKm: e.target.value})}/>
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

function RentResult({result,...rest}){ //TODO va modificata!!!!!!!!!!!!!!!!!!!!!
    return(
        <Row>
            {result.coast}
        </Row>
    );
}

