import React from 'react';
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

const RegisterForm = () => {
    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3"
                >
                    <Form.Control required className='keepBottomBorder' type="email" placeholder="name@example.com" />
                </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicUsername">
                <FloatingLabel
                    controlId="floatingInput"
                    label="Username"
                    className="mb-3"
                >
                    <Form.Control required className='keepBottomBorder' type="text" placeholder="Username" />
                </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control required className='keepBottomBorder' type="password" placeholder="Password" />
                </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <FloatingLabel controlId="floatingPassword" label="Confirm Password">
                    <Form.Control required className='keepBottomBorder' type="password" placeholder="Confirm Password" />
                </FloatingLabel>
                <Form.Text className="text-muted">
                    We'll never share your information with anyone else.
                </Form.Text>
            </Form.Group>
            <Button className='loginSubmitButton' variant="dark" type="submit">
                Register
            </Button>
        </Form>
    );
}

export default RegisterForm;
