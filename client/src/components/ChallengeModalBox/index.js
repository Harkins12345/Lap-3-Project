import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import './modal.css';

export default function ChallengeModalBox() {
  // ----- MODAL GETTING INFO IF PCHALLENGE IS PENDING
  const challengePending = useSelector(state => state.challengePending);

  return (
    <>

      <Modal size="lg"
        centered
        show={challengePending}
        backdrop="static"
        keyboard={false}>


        <h3>Awaiting challenge to be accepted</h3>



      </Modal>


    </>
  )
}
