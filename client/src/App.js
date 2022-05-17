import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { NavBar } from './components';

import * as Pages from './pages';

import './index.css';


function App() {
  return (
    <div id='app' className='container'>
      <main>
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
