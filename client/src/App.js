import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { NavBar, ModalBox } from './components';

import { setUsername, setSocket, setChallengePending, setInGame, setRequestPending } from './actions';
import io from 'socket.io-client';
import axios from 'axios';

import * as Pages from './pages';

import './index.css';


function App() {

  const dispatch = useDispatch();

  const username = useSelector(state => state.username);
  const inGame = useSelector(state => state.inGame);

  useEffect(() => {

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
          socket.on('sentChallenge', )
          socket.on("gameStarted", data => {

          })
        }
      })
      .catch(error => console.log(error))


  }, []);



  return (
    <div id='app' className='container'>

      <main>

      <ModalBox />

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
