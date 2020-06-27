import React from 'react';
import API from '../api/API';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import SecondaryWindow from '../utils/SecondaryWindow';
import NavBar from './NavBar';

export default function Login(){
    
    const history = useHistory();
    
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [errMsg, setErrMsg] = React.useState("");

    const postLogin = () => {
        API.userLogin(username, password)
        .then( result => {
            history.push({pathname:"/user"});
        })
        .catch((errorObj) => {
            console.log(errorObj);
            //Se fallisce l'autenticazione
            if(errorObj.errors)
                setErrMsg(errorObj.errors[0].msg);
        });
    }

    React.useEffect(() => {
        API.isAuthenticated()
        .then( (user) => {
            history.push({pathname:"/user"});
        })
        .catch((err) => {
            //Do nothing
            console.log(err);
        });
    }, [history]);

    const handleUsername = (value) => {
        setUsername(value);
        setPassword(password);
    }
    const handlePassword = (value) => {
        setUsername(username);
        setPassword(value);
    }

    return(
        <>
            <NavBar location={"/login"}></NavBar>
            <SecondaryWindow title="Login">
                <Row>
                    <Col md={{span:6, offset:3}}>
                        <LoginForm username={username} password={password} handleUsername={handleUsername} handlePassword={handlePassword} postLogin={postLogin}></LoginForm>
                        { errMsg }
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

