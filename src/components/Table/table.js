import React from 'react';
import Controller from './controller';
import Player from './player';
import {TablePosition} from '../../constants/general'


const Table = ({}) => {

state = {
    deckId: ''
  }

async componentDidMount() {
  }

  return (
    <div className="table">
        <Controller></Controller>
        <Player position={TablePosition.FRONT}/>
        <Player position={TablePosition.LEFT}/>
        <Player position={TablePosition.RIGHT}/>
        <Player position={TablePosition.MainPlayer}/>
    </div>
  );
};

export default Table;

