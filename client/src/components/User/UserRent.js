import React from 'react';
import {} from 'react-bootstrap';
import SecondaryWindow from '../../utils/SecondaryWindow';
import DatePicker from 'react-datepicker';

export default function UserRent(props){
    return(
        <SecondaryWindow title="Noleggia una macchina">
            <RentForm></RentForm>
        </SecondaryWindow>
    );
}

function RentForm(props){
    const [startDate, setStartDate] = React.useState(new Date());
    return(
        <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
        );
}

function RentResults(props){

}

