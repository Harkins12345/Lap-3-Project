import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function QuestionBox() {
    const socket = useSelector(state => state.socket);
    const roomId = useSelector(state => state.roomId);

    useEffect(() => {
        if (socket){
            socket.on('sendQuestion', question => {
                setQuestionData(question);
                setSelect(null);
                setCorrect(null);
            })
            socket.on('validatedAnswer', answer => setCorrect(answer))
        }
    }, [])

    const [questionData, setQuestionData] = useState({
        question: "Hello world?",
        answers: ["Hello", "World", "Yes", "No"]
    });

    const [correct, setCorrect] = useState("Hello");
    const [select, setSelect] = useState(null);

    const handleClick = (e) => {
        setSelect(e.target.value)
        socket.emit('checkAnswer', roomId)
        questionData.answers.at(e.target.value) === correct ? e.target.variant = 'success' : e.target.variant = 'danger'
    }

    const handleVariant = (id) => {
        if(select && questionData.answers.at(id) === correct){
            return 'success'
        } else if (select && parseInt(select) === id && questionData.answers.at(id) !== correct) {
            return 'danger'
        } else {
            return 'outline-dark'
        }
    }

    return (
        <Card>
            { questionData.question ? <Card.Header>{questionData.question}</Card.Header> : <Card.Header>Loading Question...</Card.Header> }
            <Card.Body>
                {questionData.answers ? questionData.answers.map((answer, index) => 
                <Button 
                key={index} 
                value={index} 
                onClick={handleClick}
                size='lg' 
                className='answerSelect'
                disabled={select ? true : false}
                variant={handleVariant(index)}>{answer}</Button>) : <h1>Loading Answers...</h1>}
            </Card.Body>
        </Card>
    );
};

export default QuestionBox;