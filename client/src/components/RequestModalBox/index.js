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

  if(socket){
    socket.on("sentChallenge", data => {
      setChallengeData({...data})
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

  return (
    <>

      <Modal show={requestPending}>

        <h3>Awaiting challenge to be accepted</h3>

        <div className='d-grid gap-2'>
          <Button onClick={handleAccept} className='accept-button' size="md">ACCEPT</Button>
          <Button onClick={handleReject} className='reject-button' size="md">REJECT</Button>
        </div>

      </Modal>


    </>
  )
}
