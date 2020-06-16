import React from 'react';
import UserRent from './UserRent';

export default function User(props){
    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date());
    const [birthDate, setBirthDate] = React.useState(new Date());
    const [category, setCategory] = React.useState("ScegliCategoria");
    const [distance, setDistance] = React.useState(0);
    const categories = ["A","B","C","Z"];

    return(
        <UserRent></UserRent>
    );
}