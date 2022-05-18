import React from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export default function  ModalBox() {

    // ----- MODAL GETTING INFO IF PCHALLENGE IS PENDING
    const challengePending = useSelector(state => state.challengePending);

    return (
      <>
      <div>I am div</div>

        <Modal show={challengePending}>
           
           I AM HOPING TO BE ALIVE 

        
        </Modal>

        </>

    )
}
