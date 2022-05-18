import React, { useState } from 'react';
import { Container } from 'react-bootstrap';

import './style.css';
import { HighScoresCard, UserStatsCard } from '../../components';



function MyStatsPage() {

  return (

      <div className="stats-main-container">

    
          <div className="stats-left-container">
              
             <UserStatsCard  />
                
          </div>


          <div className='stats-right-container'>

            <Container fluid>
            <h2 className="stats-h2"> TOP USERS </h2>
              
              <HighScoresCard />
             
            </Container>    
            

          </div>
            
              
      </div>
  )


}


export default MyStatsPage;