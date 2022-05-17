import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { QuestionBox } from '../../containers';
import './style.css';

function GameRoomPage() {

    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);

    var timer;
    useEffect(() => {

    timer = setInterval(() => {

        setSeconds(seconds+1);

            if(seconds === 59){
                setMinutes(minutes+1);
                setSeconds(0);
            }
        }, 1000)

        return () => clearInterval(timer);

    })

    const restart = () => {

        setSeconds(0);
        setSeconds(0);
    }

    const stopTimer = () => {

        clearInterval(timer);
    }
   
    return (
        <div className="main-container">

            {/* ------- LIVE COUNTDOWN TIMER ------- */}
            <div className="left-container">

                <Card className="timer">
                    <Card.Body className="timer-container">
                        <h1>Time left</h1>
                        <h1>{minutes < 10 ? "0" + minutes : minutes} : 
                            {seconds < 10 ? "0" + seconds : seconds} </h1>

                        <button className="restart" onClick={restart}>RESTART</button>
                        <button className="stop" onClick={stopTimer}>STOP</button>

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
