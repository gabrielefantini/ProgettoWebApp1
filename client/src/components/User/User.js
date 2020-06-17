import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import UserHome from './UserHome';
import UserRent from './UserRent';
import UserRentHistory from './UserRentHistory';


export default function User(props){
    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date());
    const [birthDate, setBirthDate] = React.useState(new Date());
    const [category, setCategory] = React.useState("ScegliCategoria");
    const [distance, setDistance] = React.useState(0);
    const categories = ["A","B","C","Z"];

    const [currentPage, setCurrentPage] = React.useState("home");

    return(
        <Tabs
            id="userNavBar"
            activeKey={currentPage}
            onSelect={(k) => setCurrentPage(k)}
        >
            <Tab eventKey="home" title="Home">
                <UserHome setCurrentPage={setCurrentPage} />
            </Tab>
            <Tab eventKey="rent" title="Noleggia">
                <UserRent/>
            </Tab>
            <Tab eventKey="rentHistory" title="StoricoNoleggi">
                <UserRentHistory setCurrentPage={setCurrentPage}/>
            </Tab>
        </Tabs>
    );
}
