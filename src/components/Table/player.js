import React from 'react';
import Controller from './controller';

const Player = props => {
  const position = props.position;
  return (
    <div className={`base-player ${position}`} >
    </div>
  );
};

export default Player;
