import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Card, Dropdown, DropdownButton, Button, Stack, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import './challenge.css';

import avatar1 from '../../images/avatar1.png';
import { UserOnlineCard } from '../../components';
import { setChallengePending } from '../../actions';



function ChallengePage() {


    const socket = useSelector(state => state.socket);


    // ------ uncomment useEffect once socket is running
    useEffect(() => {
        socket.emit("getOnlineUsers")
        socket.on("sendOnlineUsers", populateUsers)
    }, [])


    const [ username, setUsername ] = useState("");
    const [ category, setCategory ] = useState("");
    const [ difficulty, setDifficulty ] = useState("");

    // --- users to get all online, selected it the challengee user
    const [ users, setUsers ] = useState([]);
    const [ selectedUser, setSelectedUser ] = useState("");

    const dispatch = useDispatch();
   
    // ---- e is event | take value from event, to set category
    function handleCategory(e) {
        setCategory(e.target.value);
    }

    function handleDifficulty(e) {
        setDifficulty(e.target.value);
    }

    // ---- to get online users
   function populateUsers(data) {
       setUsers(data);
   } 

   // ----- for selected user / challengeee
   function handleSelectedUser(e) {
       setSelectedUser(e.target.value);
   }


  function handleSubmit()  {
       const data = {
           currentUser: username,
           challengedUser: selectedUser,
           category: category,
           difficulty: difficulty
       }

       if (socket) {
        socket.on('sendChallenge', data => console.log(data));
        }
        dispatch(setChallengePending()); 
    }


    const radios = [
        { name: 'EASY', value: '1', className: "easy-button" },
        { name: 'MEDIUM', value: '2', className: "medium-button" },
        { name: 'HARD', value: '3', className: "hard-button" },
    ];



    return (


        <div className="main-container">


          
            <div className="left-container">

                {/* ------------------ ONLINE USERS ------------- */}
                <Stack value={selectedUser} direction="horizontal" gap={2}>
                    <div className="stack">

                        {/* --------- INSIDE STACK, CREATE NEW CARD FOR EACH USER ONLINE ----- */}
                        {users.map(u => <UserOnlineCard onClick={handleSelectedUser} />)}

                       
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

                    <h1 className="online-status">Currently Online</h1>

                </div>

            </div>



            <div className='right-container'>

                {/* ----- SELECT CATEGORY ----- */}
                <div className="category-row row">

                            
                    <DropdownButton onClick={handleCategory} id="category-button" title="CATEGORY" size="lg" className='d-grid gap-2'>


                        <Dropdown.Item as="button" value={17} >Science & Nature</Dropdown.Item>
                        <Dropdown.Item as="button" value={18} >Science: Computer</Dropdown.Item>
                        <Dropdown.Item as="button" value={19} >Science: Mathematics</Dropdown.Item>
                        <Dropdown.Item as="button" value={22} >Geography</Dropdown.Item>
                        <Dropdown.Item as="button" value={23} >History</Dropdown.Item>



                    </DropdownButton >

                </div>

                {/* ----- SELECT LEVEL ----- */}
                <div className="level-row row">



                    <ToggleButtonGroup onClick={handleDifficulty} value={difficulty} name="toggle" size="lg">

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