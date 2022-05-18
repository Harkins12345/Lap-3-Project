import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';
import { QuestionBox } from '../../containers';
import './style.css';

function GameRoomPage() {

    const socket = useSelector(state => state.socket)

    const [score, setScore] = useState(0);
    const [timeLeft, setTime] = useState(0);

    useEffect(() => {
        if (socket){
            socket.on('sendScore', data => setScore(data));
            socket.on('tickTimer', time => setTime());
        }
    }, [])
   
    return (
        <div className="main-container">

            {/* ------- LIVE COUNTDOWN TIMER ------- */}
            <div className="left-container">

                <Card className="timer">
                    <Card.Header>Your Score: {score}</Card.Header>
                    <Card.Body className="timer-container">
                        <h1>Time left</h1>
                        <h1>{timeLeft}</h1>

                    </Card.Body>
                </Card>

            </div>

            <div className="right-container">
                <QuestionBox />
            </div>
        </div>

    )
}

export default GameRoomPage;
