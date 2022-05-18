import React from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import './modal.css';

export default function  ChallengeModalBox() {


    // ----- MODAL GETTING INFO IF PCHALLENGE IS PENDING
    const challengePending = useSelector(state => state.challengePending);


    return (
     <>

        <Modal show={challengePending}>
           
        
          <h3>Awaiting challenge to be accepted</h3>


        
        </Modal>

        
      </>
    )
}
