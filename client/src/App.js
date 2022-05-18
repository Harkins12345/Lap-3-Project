import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { NavBar, ModalBox } from './components';
import { setUsername, setSocket } from './actions';
import io from 'socket.io-client';
import axios from 'axios';

import * as Pages from './pages';

import './index.css';


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const options = {
      headers: new Headers({ 'Authorization': `Bearer ${localStorage.getItem('token')}` })
    }

    axios.post(`${window.location.origin}/validate`, options)
      .then(res => {
        if (res.status === 200) {
          console.log('Hello world')
          const socket = io(window.location.origin);
          socket.emit('setUsername', res.data.username);
          dispatch(setUsername(res.data.username));
          dispatch(setSocket(socket));
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
          <Route path="/" element={<Pages.LandingPage />} />
          <Route path="/challenge" element={<Pages.ChallengePage />} />
          <Route path="/stats" element={<Pages.MyStatsPage />} />
          <Route path="/gameroom" element={<Pages.GameRoomPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
