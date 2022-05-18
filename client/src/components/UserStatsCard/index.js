import React from 'react';
import { Card } from 'react-bootstrap';
import monkey from '../../images/monkey.png';
import './userStats.css';


const UserStatsCard = () => {
    return (
        <Card className="stats-card">
        <Card.Body className="stats-card-body">
            <Card.Img src={monkey} className="avatar" width="100" height="100" alt="User Image" />
            <Card.Text>
              <h2>Battles: 578 </h2>
              <h4>Current Score: 25, 567</h4>
              <h4>Categories: 
                  <ul>
                    <li>Science & Nature</li>
                    <li>History</li>
                    <li>Georgraphy</li>
                  </ul> 
              </h4>
            </Card.Text>
        </Card.Body>
        <Card.Header className="stats-card-header">
          <h2>USERNAME</h2></Card.Header>
          
    </Card>
    )
}

export default UserStatsCard;