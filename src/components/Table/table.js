import React from 'react';
import Controller from './controller';
import Player from './player';
import { TablePosition } from '../../constants/general'
import { DeckApi } from '../../apis/deck';
import ScoreBoard from './scoreboard';
import { finished } from 'stream';


const DEFAULT_BET = 5000
const TOTAL_POINT = 20000
const STRAIGH_WIN = 9999;

const JQK = ['JACK', 'QUEEN', 'KING'];


const PLAYERS = [
  {
    id: 1,
    name: 'You',
    point: 0,
    cards: [],
    currentPoint: 0
  },
  {
    id: 2,
    name: 'Player 2',
    point: 0,
    cards: [],
    currentPoint: 0
  },
  {
    id: 3,
    name: 'Player 3',
    point: 0,
    cards: [],
    currentPoint: 0
  },
  {
    id: 4,
    name: 'Player 4',
    point: 0,
    cards: [],
    currentPoint: 0
  }
]

class Table extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isReveal: false,
      deck: null,
      players: PLAYERS,
      currentRound: 0
    }
  }

  async componentDidMount() {
    try {
      const deckApi = new DeckApi();
      const dataResponse = await deckApi.getDeck();
      const deck = dataResponse.data

      console.log(deck);
      this.setState({
        deck
      })
    } catch (error) {
      console.log(error)
    }
  }

  _onShuffleClick = async () => {
    try {
      const deckId = this.state.deck_id;
      const deckApi = new DeckApi();
      await deckApi.shuffle(deckId);
    } catch (error) {
      console.log(error)
    }
  }

  calculatePoint = (cards) => {
    if (cards.every(elem => JQK.includes(elem.value.toUpperCase()))) {
      return STRAIGH_WIN;
    }
    return cards.reduce((res, cur) => {
      const valueCard = JQK.includes(cur.value.toUpperCase()) ? 10 : (cur.value.toUpperCase() === 'ACE' ? 1 : Number(cur.value))
      return res + valueCard
    }, 0) % 10

  }

  straightWinCheck() {
    const { players } = this.state;
    if (players.find(player => player.currentPoint == STRAIGH_WIN)) {
      this._onRevealClick();
    }
  }

  _onDrawClick = async () => {
    this.setState({
      isReveal: false
    })

    try {
      const { deck, players } = this.state;
      console.log(deck);
      const deckId = deck.deck_id;
      const clonedPlayers = [...players]

      const deckApi = new DeckApi();
      for (let i = 0; i < players.length; i++) {
        const dataResponse = await deckApi.draw(deckId);
        const { cards } = dataResponse.data
        clonedPlayers[i].cards = cards
        clonedPlayers[i].currentPoint = this.calculatePoint(cards);
      }

      this.straightWinCheck();

      this.setState({
        players: clonedPlayers
      })

      console.log('Draw completed')
    } catch (error) {
      console.log(error)
    }
  }

  _onRevealClick = () => {
    const { players } = this.state

    const maxPoint = Math.max(...players.map(player => player.currentPoint))
    const winners = players.filter(player => player.currentPoint === maxPoint)

    const clonedPlayers = [...players]

    for (let i = 0; i < winners.length; i++) {
      for (let j = 0; j < clonedPlayers.length; j++) {
        if (winners[i].id === clonedPlayers[j].id) {
          clonedPlayers[j].point += Math.floor((4 * DEFAULT_BET / winners.length));
        }
      }
    }

    this.setState({
      isReveal: true,
      players: clonedPlayers
    })

    setTimeout(
      () => {
        alert(`The winner at round is: ${winners.map(winner => winner.name).join(', ')}`)
      }, 1000)
  }

  render() {
    const { players, isReveal } = this.state

    return (
      <div className="board-game">
        <div>
          <ScoreBoard
            currentRound={0}
            totalRound={5}
            players={players}
          />
          <Controller
            shuffle={this._onShuffleClick}
            draw={this._onDrawClick}
            reveal={this._onRevealClick} />
        </div>

        <div className="player-list">
          {
            players.map(player => (
              <Player
                key={player.id}
                player={player}
                isReveal={isReveal}
              />
            ))
          }
        </div>
      </div>
    );
  }
}

export default Table


