
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Card, Dropdown, DropdownButton, Button, Stack, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import './style.css';

import avatar from '../../images/avatar.png';
import avatar1 from '../../images/avatar1.png';
// import Modal from '../../components/Modal';



function ChallengePage() {

    const socket = useSelector(state => state.socket);

    const [ username, setUsername ] = useState("");
    const [ category, setCategory ] = useState("");
    const [ difficulty, setDifficulty ] = useState("");
    const [ selectedUser, setSelectedUser ] = useState("");

    const dispatch = useDispatch();
   
  function handleSubmit()  {
       const data = {
           currentUser: username,
           challengedUser: selectedUser,
           category: category,
           difficulty: difficulty
       }

       dispatch(socket.emit("sendRequestChallenge", data))
       
    }

   

    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [usersArray, setUsers] = useState([]);

    if (socket) {
        socket.on('sentChallenge', data => console.log(data));
        socket.on('sendOnlineUsers', users => setUsers(users))
    }

    // --------- UPDATES STATE OF CATEGORY & DIFICULTY ----- //
    const updateCategory = e => {
        const selectedCategory = e.target.value
        setCategory(selectedCategory);
    }

    const updateDifficulty = e => {
        const selectedDifficulty = e.target.value
        setDifficulty(selectedDifficulty);
    };

    // ---------- DISPATCHES THE RESULTS USING ACTIONS TO STORE ------ //
    // ---------- NEED TO DEFINE & IMPORT ACTIONS ------ //
    const handleSubmit = ({ selectedItems }) => {
        //socket.emit()

    }

    const populateUsers = (users) => {
        return users.map(user => <></>)
    }




    const radios = [
        { name: 'EASY', value: '1', className: "easy-button" },
        { name: 'MEDIUM', value: '2', className: "medium-button" },
        { name: 'HARD', value: '3', className: "hard-button" },
    ];



    return (

        // TERNARY STATEMENT --> if pending then show modal box (state.challengePending display modal if not display entire page)
        // modal box to be created 

        <div className="main-container">


            {/* <Modal /> */}
    


            {/* ----- ONLINE USER COLUMN ----- */}
            <div className="left-container">

                {/* ----- ONLINE USERS ----- */}
                <Stack value={selectedUser} direction="horizontal" gap={2}>
                    <div className="stack">
                        <Card className="online-card">
                            <Card.Body className="card-body">
                                <Card.Img src={avatar} className="avatar" width="100" height="100" alt="User Image" />
                                <Card.Text>Science: Computing</Card.Text>
                            </Card.Body>
                            <Card.Header className="card-header">USERNAME</Card.Header>
                        </Card>
                    </div>
                    <div className="stack">
                        <Card className="online-card">
                            <Card.Body className="card-body">
                                <Card.Img src={avatar1} className="avatar" width="100" height="100" alt="User Image" />
                                <Card.Text>Science: Mathematics</Card.Text>
                            </Card.Body>
                            <Card.Header className="card-header">USERNAME</Card.Header>
                        </Card>
                    </div>


                </Stack>

                <div className="text-row row">
                    <h1>Currently Online</h1>
                    {usersArray && populateUsers(usersArray)}
                </div>

            </div>



            <div className='right-container'>

                {/* ----- SELECT CATEGORY ----- */}
                <div className="category-row row">
                            
                    <DropdownButton onClick={category} id="category-button" title="CATEGORY" size="lg" className='d-grid gap-2'>

                        <Dropdown.Item as="button" value={17} >Science & Nature</Dropdown.Item>
                        <Dropdown.Item as="button" value={18} >Science: Computer</Dropdown.Item>
                        <Dropdown.Item as="button" value={19} >Science: Mathematics</Dropdown.Item>
                        <Dropdown.Item as="button" value={22} >Geography</Dropdown.Item>
                        <Dropdown.Item as="button" value={23} >History</Dropdown.Item>
                        
                                


                    <DropdownButton onClick={updateCategory} value={category} id="category-button" title="CATEGORY" size="lg" className='d-grid gap-2'>

                        <Dropdown.Item as="button">Science: Computer</Dropdown.Item>
                        <Dropdown.Item as="button">Science: Mathematics</Dropdown.Item>
                        <Dropdown.Item as="button">Science & Nature</Dropdown.Item>
                        <Dropdown.Item as="button">History</Dropdown.Item>
                        <Dropdown.Item as="button">Geography</Dropdown.Item>


                    </DropdownButton >

                </div>

                {/* ----- SELECT LEVEL ----- */}
                <div className="level-row row">
     
                    <ToggleButtonGroup onClick={difficulty} name="toggle" size="lg">


                    <ToggleButtonGroup onClick={updateDifficulty} value={difficulty} name="toggle" size="lg">

                        {radios.map((radio, idx) => (
                            <ToggleButton
                                key={idx}
                                id={`radio-${idx}`}
                                className={radio.className}
                                type="radio"
                                name="radio"
                                value={radio.value}
                                checked={difficulty === radio.value}
                                onChange={(e) => setDifficulty(e.currentTarget.value)}
                            >
                                {radio.name}
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>

                </div>

                {/* ----- START CHALLENGE ----- */}
                <div className="start-row row">

                    <div className='d-grid gap-2'>
                        <Button onClick={handleSubmit} className='start-button' size="lg"> START THE CHALLENGE</Button>
                    </div>

                </div>

            </div>

        </div>
    )


}




export default ChallengePage;