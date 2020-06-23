import React from 'react';
import { Navbar, Button} from 'react-bootstrap';
import API from '../api/API';
import { Link, useHistory } from 'react-router-dom';

export default function NavBar({username, logout, location, ...rest}){
    const history = useHistory();

    const handleLogout = (event) => {
        API.userLogout()
        .then( result => history.push({pathname:"/"}))
        .catch( err => console.log(err));
    }
    return(
        <Navbar variant="dark" bg="dark"> 
                {location==="/user"?(
                <Navbar.Brand>
                    AutoNoleggio
                
                </Navbar.Brand>
            ):(
                <Link to="/">
                <Navbar.Brand>
                    AutoNoleggio
                
                </Navbar.Brand>
            </Link>
            )}
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                {username?(
                    <>
                        <Navbar.Text>
                        Signed in as: {username}
                        </Navbar.Text>
                        <Button variant="danger" onClick={(event) => handleLogout(event)}>Logout</Button>
                    </>
                ):(location==="/"?(
                    <Link to="/login">
                        <Button>Login</Button>
                    </Link>):(<div></div>))}
            </Navbar.Collapse>
        </Navbar>
    );
}