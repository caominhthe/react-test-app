import React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import './styles.scss';

const Player = ({ player, isReveal }) => (
  <div className={`Player-wrapper player__${player.id}`}>
    <div className='user-name'>
      <Icon icon='user' className='icon' />
      <div className="name">{player.name}</div>
    </div>
    <div className="cards">
      {
        /* eslint-disable */
        player.cards.map(card => (
          <div key={card.code} className="item">
            <img
              src={card.image}
              alt="image card"
              className={`${isReveal? 'is-reveal' : 'hide-card'}`}
            />
          </div>
        ))
      }
    </div>
  </div>
);

export default Player