import React from 'react';
import './styles.scss';

const ScoreBoard = ({ totalRound, currentRound, players }) => (
  <div className="Scoreboard-wrapper">
    <div className="round">{currentRound}/{totalRound}</div>
    <div>
      {
        players.map(player => (
          <div className="player" key={player.id}>
            <div className="name">{player.name} :</div>
            <div className="point">{player.point}</div>
          </div>
        ))
      }
    </div>
  </div>
);

export default ScoreBoard;
