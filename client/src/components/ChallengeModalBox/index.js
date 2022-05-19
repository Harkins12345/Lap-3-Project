import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { setChallengePending } from '../../actions';
import './modal.css';

export default function ChallengeModalBox() {

  const dispatch = useDispatch();
  // ----- MODAL GETTING INFO IF PCHALLENGE IS PENDING
  const socket = useSelector(state => state.socket);
  const challengePending = useSelector(state => state.challengePending);

  return (
    <>

      <Modal show={challengePending}>


        <h3>Awaiting challenge to be accepted</h3>



      </Modal>


    </>
  )
}
