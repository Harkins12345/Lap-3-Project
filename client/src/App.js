import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { NavBar } from './components';

import * as Pages from './pages';

import './index.css';


function App() {
  return (
    <div id='app' className='container'>
      <NavBar />
      <main>
        <Routes>
            <Route path="/" element={<Pages.LandingPage />}/>
            <Route path="/" element={<Pages.ChallengePage />}/>

        </Routes>




      </main>
    </div>
  );
}

export default App;
