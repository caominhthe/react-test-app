import React from 'react'

const Player = ({ player, isReveal }) => {
  return (
    <div className={`player player__${player.id}`}>
      <div className="player__name">{player.name}</div>
      {<div className="player__cards">{player.cards.map(card => (
        <div key={card.code} className="player__cards__item">
          <img src={card.image} alt="image card" className={`${isReveal? 'is-reveal' : 'hide-card'}`}/>
          {/* <span>{card.value}</span> */}
        </div>
      ))}
      </div>
      }
      {/* {isReveal && <div className="player__score"><span>{player.currentPoint}</span></div>} */}
    </div>
  )
}

export default Player