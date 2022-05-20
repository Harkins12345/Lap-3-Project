import React from 'react';
import { Card } from 'react-bootstrap';
import monkey from '../../images/monkey.png';
import './userStats.css';


const UserStatsCard = ({ username, totalGames, totalScore, totalWins, totalLosses, totalDraws }) => {
  return (
    <Card className="stats-card">
      <Card.Body className="stats-card-body">
        <Card.Img src={monkey} className="avatar" width="100" height="100" alt="User Image" />
        <Card.Text>
          <h2>Duels: {totalGames}</h2>
          <h4>Total Score: {totalScore}</h4>
          <h4>Wins: {totalWins}</h4>
          <h4>Losses: {totalLosses}</h4>
          <h4>Draws: {totalDraws}</h4>
        </Card.Text>
      </Card.Body>
      <Card.Header className="stats-card-header">
        <h2>{username}</h2></Card.Header>

    </Card>
  )
}

export default UserStatsCard;