import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, Modal, Button } from 'react-bootstrap';
import { QuestionBox } from '../../containers';
import './style.css';

function GameRoomPage() {

    const socket = useSelector(state => state.socket);
    const username = useSelector(state => state.username);
    const goto = useNavigate();

    const [score, setScore] = useState(0);
    const [timeLeft, setTime] = useState(10);
    const [resultData, setResultData] = useState({
        winner: null,
        loser: null,
        draw: false,
        gameOver: false
    });

    function handleClick(){
        goto('/challenge');
    }

    useEffect(() => {
        console.log(resultData);
    }, [resultData])


    if (socket){
        socket.on('sendScore', data => setScore(data));
        socket.on('tickTimer', time => setTime(time));
        socket.on('gameOver', (winner, loser, draw) => {
            setResultData({...resultData,
                winner: winner,
                loser: loser,
                draw: draw,
                gameOver: true
            })
        })
    }
   
    return (
        <><Modal size="lg"
        centered
        show={resultData.gameOver}
        backdrop="static"
        keyboard={false}>
        
        <h3>{!resultData.draw ? `${resultData.winner} is the winner!` : "It's a draw!"}</h3>
        <h3>{resultData.winner === username && !resultData.draw ? "Congratulations!" : "Better luck next time!"}</h3>

        <div className='d-grid gap-2'>
          <Button onClick={handleClick} variant="outline-dark" size="md">Return to challenges</Button>
        </div></Modal>
        
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
    </>


    )
}

export default GameRoomPage;
