import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function QuestionBox() {
    const socket = useSelector(state => state.socket);

    const [questionData, setQuestionData] = useState([])
    const [select, setSelect] = useState({
        correct: null,
        selected: false
    })

    const handleClick = () => {

    }

    socket.on('getQuestion', data => setQuestionData(data));

    return (
        <Card>
            { questionData.question ? <Card.Header>{questionData.question}</Card.Header> : <Card.Header>Loading...</Card.Header> }
            <Card.Body>
                {questionData.answers ? questionData.answers.map(answer => <Button variant="outline-dark">{answer}</Button>) : <h1>Loading Questions...</h1>}
            </Card.Body>
        </Card>
    );
};

export default QuestionBox;