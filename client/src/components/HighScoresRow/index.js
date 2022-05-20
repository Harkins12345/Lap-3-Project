import React from 'react';
import { Row, Col } from 'react-bootstrap';
import monkey from '../../images/monkey.png';
import './highScores.css';


const HighScoresRow = ({username, totalGames, totalScore}) => {
    return (
        
        <Row>
            <Col md={4} className="stats-image-on-left">
            <img src={monkey} className="avatar" width="100" height="100" alt="User Image" />
                    
            </Col>

            <Col md={8} className="stats-text-on-right">
                <div className='stats-column'>
                        
                    <h3>{username}</h3>
                    <h5>Duels: {totalGames}</h5>
                    <h6>Current Score: {totalScore}</h6>   
                </div>
            </Col>
        </Row>   
    
    )
}

export default HighScoresRow;