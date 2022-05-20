import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function QuestionBox() {
    const socket = useSelector(state => state.socket);
    const roomId = useSelector(state => state.gameRoomId);
    const username = useSelector(state => state.username);

    const [questionData, setQuestionData] = useState({});

    const [gameState, setGameState] = useState({
        correct: null,
        select: false,
    });

    if (socket){
        socket.on('sendQuestion', question => {
            setQuestionData({...question});
            setGameState({...gameState,
                select: false,
                correct: null
            })
        })
        socket.on('validatedAnswer', answer => {
            setGameState({...gameState,
            correct: answer
        })
    })
    }

    useEffect(() => {
        if(gameState.correct){
            if(gameState.correct === questionData.answers.at(gameState.select)){
                socket.emit("correctAnswer", username)
            }
        }
    }, [questionData, gameState])

    const handleClick = (e) => {
        setGameState({...gameState,
            select: e.target.value
        })
        socket.emit('checkAnswer', roomId)
    }

    const handleVariant = (id) => {
        if(gameState.select && questionData.answers.at(id) === gameState.correct){
            return 'success'
        } else if (gameState.select && parseInt(gameState.select) === id && questionData.answers.at(id) !== gameState.correct) {
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
                disabled={gameState.select ? true : false}
                variant={handleVariant(index)}>{answer}</Button>) : <h1>Loading Answers...</h1>}
            </Card.Body>
        </Card>
    );
};

export default QuestionBox;