import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import './modal.css';

export default function  RequestModalBox() {


    
  
    const requestPending = useSelector(state => state.requestPending);
    const challengePending = useSelector(state => state.challengePending);
    const inGame = useSelector(state => state.inGame);



    function handleAccept(e){
        inGame(true);
    }

    function handleReject(e){
        challengePending(false);
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
