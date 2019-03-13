import React from 'react'


const ScoreTable = ({ totalRound, currentRound, players }) => {
  return (
    <div className="score-table">
      <span className="round">Round: {currentRound}/{totalRound}</span>
      <div>{
        players.map(player => (
          <div className="player"key={player.id}>
            <span className="player-name">{player.name}:</span>
            <span className="player-point">{player.point}</span>
          </div>
        ))
      }</div>
    </div>
  )
}

export default ScoreTable