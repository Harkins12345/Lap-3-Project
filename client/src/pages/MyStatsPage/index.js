import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Container } from 'react-bootstrap';

import './style.css';
import { HighScoresCard, UserStatsCard } from '../../components';



function MyStatsPage() {

  const username = useSelector(state => state.username);
  const socket = useSelector(state => state.socket);

  const [statsData, setStatsData] = useState({});

  if(socket){
    socket.on('sendStats', data => {
      setStatsData({...statsData,
        totalGames: data.totalGames,
        totalScore: data.totalScore,
        totalWins: data.totalWins,
        totalLosses: data.totalLosses,
        totalDraws: data.totalDraws,
        topPlayers: data.topPlayers
        }
      )
    })
  }

  useEffect(() => {
    socket.emit('getStats');
  }, [])

  return (

      <div className="stats-main-container">

    
          <div className="stats-left-container">
              
             <UserStatsCard username={username} totalGames={statsData.totalGames} totalScore={statsData.totalScore} totalWins={statsData.totalWins} totalLosses={statsData.totalLosses} totalDraws={statsData.totalDraws}  />
          </div>


          <div className='stats-right-container'>

            <Container fluid>
            <h2 className="stats-h2"> TOP USERS </h2>
              
              {statsData.topPlayers ? statsData.topPlayers.map(player => <HighScoresCard username={player.gameInfo.username} totalGames={player.gameInfo.totalGames} totalScore={player.gameInfo.totalScore}/>) : <h1>Loading...</h1>}
             
            </Container>    
            

          </div>
            
              
      </div>
  )


}


export default MyStatsPage;