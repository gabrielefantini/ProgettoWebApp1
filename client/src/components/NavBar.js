import React from 'react';
import { Navbar, Nav, Form, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default function NavBar({logged, username, logout, ...rest}){
    return(
        <Navbar variant="dark" bg="dark"> 
            <Link to="/">
                <Navbar.Brand>
                    AutoNoleggio
                
                </Navbar.Brand>
            </Link>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                {logged?(
                    <>
                        <Navbar.Text>
                            Signed in as: {username}
                        </Navbar.Text>
                        <Button variant="danger">Logout</Button>
                    </>
                ):(
                <Link to="/login">
                    <Button>Login</Button>
                </Link>)}
            </Navbar.Collapse>
        </Navbar>
    );
}