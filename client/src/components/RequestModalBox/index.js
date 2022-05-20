import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import './modal.css';

import { setRequestPending } from '../../actions';

export default function RequestModalBox() {


  const dispatch = useDispatch();

  const socket = useSelector(state => state.socket);
  const requestPending = useSelector(state => state.requestPending);

  const [challengeData, setChallengeData] = useState({});

  if (socket) {
    socket.on("sentChallenge", data => {
      setChallengeData({ ...data })
    })
  }

  function handleAccept(e) {
    socket.emit('challengeResponse', challengeData, true);
    setChallengeData({});
  }

  function handleReject(e) {
    dispatch(setRequestPending(false));
    socket.emit('challengeResponse', challengeData, false);
    setChallengeData({});
  }

  function categoryParse(category) {
    switch (parseInt(category)) {
      case 17:
        return "Science & Nature"
      case 18:
        return "Science: Computer"
      case 19:
        return "Science: Mathematics"
      case 22:
        return "Geography"
      case 23:
        return "History"
      default:
        return "Loading..."
    }
  }

  return (
    <>

      <Modal size="lg"
        centered
        show={requestPending}
        backdrop="static"
        keyboard={false}>

        <h3>{challengeData.requesterUsername} has challenged you to a duel!</h3>

        <h5>Category: {categoryParse(challengeData.category)}</h5>
        <h5>Difficulty: {challengeData.difficulty}</h5>

        <div className='d-grid gap-2'>
          <Button onClick={handleAccept} className='accept-button' role="button" size="md">ACCEPT</Button>
          <Button onClick={handleReject} className='reject-button' role="button" size="md">REJECT</Button>
        </div>

      </Modal>


    </>
  )
}
