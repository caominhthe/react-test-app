import React from 'react'


const ScoreTable = ({ totalRound, currentRound, players }) => {
  return (
    <div className="score-table">
      <span>{currentRound}/{totalRound}</span>
      <div>{
        players.map(player => (
          <div key={player.id}>
            <span>{player.name}</span>
            <span>{player.point}</span>
          </div>
        ))
      }</div>
    </div>
  )
}

export default ScoreTable