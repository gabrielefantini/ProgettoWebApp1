import React from 'react';
import API from '../api/API';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link, Redirect, useHistory } from "react-router-dom";
import SecondaryWindow from '../utils/SecondaryWindow';
import NavBar from './NavBar';

export default function Login(){
    
    const history = useHistory();
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isErr, setErr] = React.useState(false);

    const postLogin = () => {
        API.userLogin(username, password)
        .then( result => {
            history.push({pathname:"/user"});
        })
        .catch((errorObj) => {
            console.log(errorObj);
            setErr(true);
        });
    }

    React.useEffect(() => {
        API.isAuthenticated()
        .then( result => {
            history.push({pathname:"/user"});
        })
    }, [history]);

    return(
        <>
            <NavBar location={"/login"}></NavBar>
            <SecondaryWindow title="Login">
                <Row>
                    <Col md={{span:6, offset:3}}>
                        <LoginForm username={username} password={password} handleUsername={setUsername} handlePassword={setPassword} postLogin={postLogin}></LoginForm>
                        { isErr &&<p>Parametri sbagliati</p> }
                    </Col>
                </Row>
            </SecondaryWindow>
        </>
        );
}

function LoginForm({postLogin, username, password, handleUsername, handlePassword, ...rest}){
    
    const validateForm = () => {
        return username.length>0 && password.length>0;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        //() => handleLogin(username, password);
        postLogin();
    }

    return(
        <Form method="POST" onSubmit={(event) => handleSubmit(event)}>
            <Form.Group controlId="username">
                <Form.Label>Nome Utente</Form.Label>
                <Form.Control 
                    type="username" 
                    placeholder="Inserire nome utente" 
                    value={username}
                    onChange={ e => handleUsername(e.target.value)}
                    />
            </Form.Group>
            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password" 
                    value={password}
                    onChange={ e => handlePassword(e.target.value)} 
                    />
            </Form.Group>
            <Button variant="primary" disabled={!validateForm()} type="submit">
                Accedi
            </Button>
        </Form>
    );
}

