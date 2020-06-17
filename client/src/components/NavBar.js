import React from 'react';
import { Navbar, Nav, Form, Button} from 'react-bootstrap';

export default function NavBar({logged, username, logout, ...rest}){
    return(
        <Navbar variant="dark" bg="dark">
            <Navbar.Brand href="#home">AutoNoleggio</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                {logged?(
                    <>
                        <Navbar.Text>
                            Signed in as: {username}
                        </Navbar.Text>
                        <Button variant="danger">Logout</Button>
                    </>
                ):(<Button>Login</Button>)}
            </Navbar.Collapse>
        </Navbar>
    );
}