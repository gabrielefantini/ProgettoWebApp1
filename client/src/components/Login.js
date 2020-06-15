import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import SecondaryWindow from '../utils/SecondaryWindow';

export default function Login({...rest}){
    return(
        <SecondaryWindow title="Login">
            <Row>
                <Col md={{span:6, offset:3}}>
                    <LoginForm {...rest}></LoginForm>
                </Col>
            </Row>
        </SecondaryWindow>
        );
}

function LoginForm({handleLogin,...rest}){

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    
    const validateForm = () => {
        return username.length>0 && password.length>0;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        //() => handleLogin(username, password);
        handleLogin(username, password);
    }

    return(
        <Form onSubmit={(event) => handleSubmit(event)}>
            <Form.Group controlId="username">
                <Form.Label>Nome Utente</Form.Label>
                <Form.Control 
                    type="username" 
                    placeholder="Inserire nome utente" 
                    value={username}
                    onChange={ e => setUsername(e.target.value)}
                    />
            </Form.Group>
            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password" 
                    value={password}
                    onChange={ e => setPassword(e.target.value)} 
                    />
            </Form.Group>
            <Button variant="primary" disabled={!validateForm()} type="submit">
                Accedi
            </Button>
        </Form>
    );
}

