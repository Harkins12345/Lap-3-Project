import React from 'react';
import { Card } from 'react-bootstrap';
import avatar from '../../images/avatar.png';
import './userOnline.css';


const UserOnlineCard = () => {
    return (
        <Card className="online-card">
            <Card.Body className="card-body">
                <Card.Img src={avatar} className="avatar" width="100" height="100" alt="User Image" />
                <Card.Text>Science: Computing</Card.Text>
            </Card.Body>
            <Card.Header className="card-header">USERNAME</Card.Header>
        </Card>
    )
}

export default UserOnlineCard;