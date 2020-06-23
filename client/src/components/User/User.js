import React from 'react';
import { Route, useHistory, Switch, Redirect } from "react-router-dom";
import API from '../../api/API';
import NavBar from '../NavBar';
import UserRent from './UserRent';
import UserRentHistory from './UserRentHistory';


export default function User({...rest}){
    const [username, setUsername] = React.useState("");
    /*
    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date());
    const [birthDate, setBirthDate] = React.useState(new Date());
    const [category, setCategory] = React.useState("ScegliCategoria");
    const [distance, setDistance] = React.useState(0);
    */
   
    const history = useHistory();
  
    React.useEffect(() => {
      API.isAuthenticated()
      .then((user) => {
        setUsername(user.username);
      }).catch((err) => {
        history.push({pathname:"/login"});
      })
    }, [history]);
    
    return(
        <>
            <NavBar location={"/user"} username={username}></NavBar>
            <Switch>
                <Route exact path="/user/" 
                    render={(props) => (
                        <UserRent {...rest}></UserRent>
                    )}
                />
                <Route path="/user/history" component={UserRentHistory}/>
                <Route><Redirect to="/user/"/></Route>
            </Switch>
        </>
    );
}
