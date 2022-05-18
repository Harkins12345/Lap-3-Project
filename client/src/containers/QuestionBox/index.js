import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function QuestionBox() {
    const socket = useSelector(state => state.socket);

    const [questionData, setQuestionData] = useState({
        question: "Hello world?",
        answers: ['Yes', 'No', 'Maybe', 'Hello!']
    });

    const [correct, setCorrect] = useState("Yes");

    const [select, setSelect] = useState(null);

    const handleClick = (e) => {
        setSelect(e.target.value)
        console.log(questionData.answers.at(e.target.value))
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

    //socket.on('sendQuestion', data => setQuestionData(data));

    return (
        <Card>
            { questionData.question ? <Card.Header>{questionData.question}</Card.Header> : <Card.Header>Loading Question...</Card.Header> }
            <Card.Body>
                {questionData.answers ? questionData.answers.map((answer, index) => 
                <Button 
                key={index} 
                value={index} 
                onClick={handleClick} 
                className='answerSelect'
                disabled={select ? true : false}
                variant={handleVariant(index)}>{answer}</Button>) : <h1>Loading Answers...</h1>}
            </Card.Body>
        </Card>
    );
};

export default QuestionBox;