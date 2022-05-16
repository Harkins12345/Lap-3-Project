import React from 'react';
import './index.css';
import { NavBar } from './components';
import { Routes, Route } from 'react-router-dom';
import * as Pages from './pages'

function App() {
  return (
    <div id='app' className='container'>
      <NavBar />
      <main>
                <Routes>
                    <Route path="/" element={<Pages.LandingPage />} />
                </Routes>
            </main>
    </div>
  );
}

export default App;
