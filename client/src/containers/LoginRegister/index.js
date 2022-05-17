import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import LoginForm from '../../components/LoginForm';
import RegisterForm from '../../components/RegisterForm'
import './style.css'

function LoginRegister() {
    const [mode, setMode] = useState("login")

    const radios = [
        { name: 'Login', value: 'login' },
        { name: 'Register', value: 'register' }
    ];

    return (
        <>
            <Card className='loginRegisterContainer shadow-2-strong'>
                <Card.Header>
                    <Container>
                        <Row>
                            <Col>
                                <ButtonGroup className='loginRegisterRadios'>
                                    {radios.map((radio, idx) => (
                                        <ToggleButton
                                            key={idx}
                                            id={`radio-${idx}`}
                                            type="radio"
                                            variant="outline-dark"
                                            name="radio"
                                            className="noBorder"
                                            value={radio.value}
                                            checked={mode === radio.value}
                                            onChange={(e) => setMode(e.currentTarget.value)}
                                        >
                                            {radio.name}
                                        </ToggleButton>
                                    ))}
                                </ButtonGroup>
                            </Col>
                            <Col></Col>
                        </Row>
                    </Container>
                </Card.Header>
                <Card.Body>
                    {mode === 'login' ? <LoginForm/> : <RegisterForm/>}
                </Card.Body>
            </Card>
        </>
    );
}

export default LoginRegister
