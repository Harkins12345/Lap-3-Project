import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import './style.css'

const RegisterForm = () => {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [err, setError] = useState("");

    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const validateUsername = (username) => username.match(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi) ? false : true;

    const handleRegister = (e) => {
        e.preventDefault()
        if (username && password && email && confPassword && validateEmail(email) && validateUsername(username) && password === confPassword && password.length >= 5 && username.length <= 20) {
            const data = {
                email: email,
                username: username,
                password: password
            }

            axios.post(`${window.location.origin}/signup`, data)
                .then(res => console.log(res.data))
                .catch(error => console.log(error))

        } else if (password !== confPassword) {
            setError("Passwords do not match, please try again.")
        } else if (!validateEmail(email)) {
            setError("Invalid email, please try again.")
        } else if (password.length < 5) {
            setError("Password must be longer than 5 characters, please try again.")
        } else if (username.length > 20) {
            setError("Username cannot be longer than 20 characters, please try again.")
        } else if (!validateUsername(username)) {
            setError("Username cannot contain special characters, please try again.")
        } else {
            setError("An error occurred, please try again.")
        }
        setEmail('');
        setUsername('');
        setPassword('');
        setConfPassword('');
    }

    const updateEmail = e => {
        const input = e.target.value
        setEmail(input)
    }

    const updateUsername = e => {
        const input = e.target.value
        setUsername(input)
    }

    const updatePassword = e => {
        const input = e.target.value
        setPassword(input)
    }

    const updateConfPassword = e => {
        const input = e.target.value
        setConfPassword(input)
    }


    return (
        <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3"
                >
                    <Form.Control onChange={updateEmail} value={email} required className='keepBottomBorder' type="email" placeholder="name@example.com" />
                </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicUsername">
                <FloatingLabel
                    controlId="floatingInput"
                    label="Username"
                    className="mb-3"
                >
                    <Form.Control onChange={updateUsername} value={username} required className='keepBottomBorder' type="text" placeholder="Username" />
                </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control onChange={updatePassword} value={password} required className='keepBottomBorder' type="password" placeholder="Password" />
                </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <FloatingLabel controlId="floatingPassword" label="Confirm Password">
                    <Form.Control onChange={updateConfPassword} value={confPassword} required className='keepBottomBorder' type="password" placeholder="Confirm Password" />
                </FloatingLabel>
                <Form.Text className="text-muted">
                    We'll never share your information with anyone else.
                </Form.Text>
                {err && <><br></br><Form.Text className="error-text">{err}</Form.Text></>}
            </Form.Group>
            <Button className='loginSubmitButton' variant="dark" type="submit">
                Register
            </Button>
        </Form>
    );
}

export default RegisterForm;
