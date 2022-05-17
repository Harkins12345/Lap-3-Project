import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import io from 'socket.io-client';
import { setSocket } from '../../actions';

const LoginForm = () => {

    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setError] = useState("");
    
    const handleLogin = (e) => {
        e.preventDefault()
        if (email && password) {
            const data = {
                email: email,
                password: password
            }

            axios.post(`${window.location.origin}/login`, data)
            .then(res => res.data)
            .then(data => {
                if (data.user) {
                    const socket = io(window.location.origin);
                    socket.emit('setUsername', data.user);
                    dispatch(setSocket(socket));
                }
            })
            .catch(error => console.log(`An error has occurred: ${error}`))
        }
        setEmail('');
        setPassword('');
    }

    const updateEmail = e => {
        const input = e.target.value
        setEmail(input)
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
                    <Form.Control onChange={updateEmail} value={email} required className='keepBottomBorder' type="email" placeholder="name@example.com" />
                </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control onChange={updatePassword} value={password} required className='keepBottomBorder' type="password" placeholder="Password" />
                </FloatingLabel>
            </Form.Group>
            <Button className='loginSubmitButton' variant="dark" type="submit">
                Login
            </Button>
        </Form>
    );
}

export default LoginForm;
