import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { NavBar, ChallengeModalBox, RequestModalBox } from './components';

import { setUsername, setSocket, setInGame, setChallengePending, setRequestPending, setGameData } from './actions';
import io from 'socket.io-client';
import axios from 'axios';

import * as Pages from './pages';

import './index.css';


function App() {

  const dispatch = useDispatch();
  const goto = useNavigate();

  const username = useSelector(state => state.username);
  const inGame = useSelector(state => state.inGame);
  const socket = useSelector(state => state.socket);

  useEffect(() => {

    //dispatch(setUsername("khari"));

    const options = {
      headers: new Headers({ 'Authorization': `Bearer ${localStorage.getItem('token')}` })
    }

    axios.post(`${window.location.origin}/validate`, options)
      .then(res => {
        if (res.status === 200) {

          const socket = io(window.location.origin);
          socket.emit('setUsername', res.data.username);

          dispatch(setUsername(res.data.username));
          dispatch(setSocket(socket));
        }
      })
      .catch(error => console.log(error))


  }, []);

  useEffect(() => {
    if(socket){
      socket.on("sentChallenge", data => {
        dispatch(setRequestPending(true))
      })
  
      socket.on("challengeNotAccepted", data => {
        console.log("Not accepted")
        dispatch(setChallengePending(false))
      })
      
      socket.on("gameStarted", gameData => {
        console.log('Starting game client...')
        dispatch(setInGame(true))
        dispatch(setGameData(gameData))
        dispatch(setRequestPending(false))
        dispatch(setChallengePending(false))
        goto('/gameroom', {replace:true})
      })
    }
  }, [socket])



  return (
    <div id='app' className='container'>

      <main>

      <ChallengeModalBox />

      <RequestModalBox />

        <NavBar />

        <Routes>
          <Route path="/" element={username ? <Navigate to="/challenge" replace={true} /> : <Pages.LandingPage />} />
          <Route path="/challenge" element={username ? <Pages.ChallengePage /> : <Navigate to="/" replace={true} />} />
          <Route path="/stats" element={username ? <Pages.MyStatsPage /> : <Navigate to="/" replace={true} />} />
          <Route path="/gameroom" element={username && inGame ? <Pages.GameRoomPage /> : <Navigate to="/challenge" replace={true} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
