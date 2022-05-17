import React from 'react';
import { LoginRegister } from '../../containers';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import landingGif from '../../images/landingpage.gif'

const LandingPage = () => {
    return (
        <Container>
            <Row>
                <Col><Image roundedCircle={true} fluid={true} src={landingGif} /></Col>
                <Col></Col>
                <Col><LoginRegister /></Col>
            </Row>
        </Container>
    )
}

export default LandingPage;