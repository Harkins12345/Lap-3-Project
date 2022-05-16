import React, {useState} from 'react';
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const LoginForm = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const handleLogin = (e) => {
        e.preventDefault()
        if (username !== '' && username !== undefined && password !== '' && password !== undefined) {
            //axios.post(`${window.location.origin}/`)
        }
        setUsername('');
        setPassword('');
    }

    const updateUsername = e => {
        const input = e.target.value
        setUsername(input)
    }

    const updatePassword = e => {
        const input = e.target.value
        setPassword(input)
    }

    return (
        <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3"
                >
                    <Form.Control onChange={updateUsername} required className='keepBottomBorder' type="email" placeholder="name@example.com" />
                </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control onChange={updatePassword} required className='keepBottomBorder' type="password" placeholder="Password" />
                </FloatingLabel>
            </Form.Group>
            <Button className='loginSubmitButton' variant="dark" type="submit">
                Login
            </Button>
        </Form>
    );
}

export default LoginForm;
