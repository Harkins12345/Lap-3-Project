import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { NavBar } from './components';
<<<<<<< HEAD
import { Routes, Route } from 'react-router-dom';
import * as Pages from './pages'
=======

import * as Pages from './pages';

import './index.css';

>>>>>>> 4b0fcbf8f79dc506e66e24cb21850005b6d91823

function App() {
  return (
    <div id='app' className='container'>
      <NavBar />
      <main>
<<<<<<< HEAD
                <Routes>
                    <Route path="/" element={<Pages.LandingPage />} />
                </Routes>
            </main>
=======
        <Routes>
            <Route path="/" element={<Pages.LandingPage />}/>
            <Route path="/challenge" element={<Pages.ChallengePage />}/>
            <Route path="/gameroom" element={<Pages.GameRoomPage />}/>

        </Routes>




      </main>
>>>>>>> 4b0fcbf8f79dc506e66e24cb21850005b6d91823
    </div>
  );
}

export default App;
