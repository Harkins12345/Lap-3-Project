import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function QuestionBox() {
    const socket = useSelector(state => state.socket);

    const [questionData, setQuestionData] = useState([]);
    const [select, setSelect] = useState({
        correct: null,
        selected: false
    })

    const handleClick = () => {

    }

    socket.on('sendQuestion', data => setQuestionData(data));

    return (
        <Card>
            { questionData.question ? <Card.Header>{questionData.question}</Card.Header> : <Card.Header>Loading Question...</Card.Header> }
            <Card.Body>
                {questionData.answers ? questionData.answers.map((answer, index) => <Button variant="outline-dark">{answer}</Button>) : <h1>Loading Answers...</h1>}
            </Card.Body>
        </Card>
    );
};

export default QuestionBox;