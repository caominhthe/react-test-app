import React from 'react';
import Controller from './controller';
import Player from './player';
import { DeckApi } from '../../apis/deck';
import ScoreBoard from './scoreboard';
import { connect } from 'react-redux'
import * as actionCreators from '../../actions';
import { STRAIGH_WIN } from '../../constants/general';
import { NEXT_ROUND } from '../../constants/actionTypes';
import { join } from 'path';


class Table extends React.Component {

  state = {
    isReveal: false,
    isInGame: false,
    currentRound: 0
  }

  componentDidMount() {
      this.props.fetchDeck();
  }

  _onShuffleClick = async () => {
    try {
      const { deck, shuffleDeck } = this.props
      await shuffleDeck(deck.deck_id)
    } catch (error) {
      console.log(error)
    }
  }

  _straightWinCheck() {
    const { players } = this.props;
    if (players.find(player => player.currentPoint == STRAIGH_WIN)) {
      this._onRevealClick();
    }
  }

  _onDrawClick = async () => {
    this.setState({
      isReveal: false,
      isInGame: true
    })

    try {
      const { deck, drawCard, nextRound } = this.props
      if (deck.remaining < 12 ) {
        alert('Not enough card for next round, please Shuffle to continue');
        return;
      }
      nextRound();
      await drawCard(deck.deck_id)
      this._straightWinCheck();
    } catch (error) {
      console.log(error)
    }
  }

  _findWinners(players) {
    const maxPoint = Math.max(...players.map(player => player.currentPoint))
    return players.filter(player => player.currentPoint === maxPoint)
  }

  _onRevealClick = () => {
    const { players, addPointWinners, defaultBet } = this.props

    if (!this.state.isInGame) {
      alert('Draw cards first please');
    } ;

    this.setState({
      isReveal: true,
      isInGame: false
    })
    
    setTimeout(() => {
      const winners = this._findWinners(players)
      const winPoint = Math.floor((defaultBet * players.length) / winners.length)
      addPointWinners(winners, winPoint);
      this._findFinalWinner();
    }, 1000)
  }

  _findFinalWinner = () => {
    const { players, currentRound, totalRound } = this.props
    if (currentRound < totalRound) return;
    const maxPoint = Math.max(...players.map(player => player.point));
    const finalWinner = players.filter(player => player.point === maxPoint)
    if (finalWinner.length > 0) {
      alert(`Final winner is: ${finalWinner.map(player => player.name).join(', ')} , continue draw for next game`);
    }
  }

  render() {

    const { players, currentRound } = this.props

    return (
      <div className="board-game">
        <div>
          <ScoreBoard
            currentRound={currentRound}
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
                isReveal={this.state.isReveal}
              />
            ))
          }
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDeck: async () => dispatch(actionCreators.fetchDeck()),
    shuffleDeck: async (deckId) => dispatch(actionCreators.shuffleDeck(deckId)),
    drawCard: async (playerId) => dispatch(actionCreators.drawCard(playerId)),
    addPointWinners: (winners, points) => dispatch(actionCreators.addPointWinners(winners, points)),
    nextRound: () => dispatch({ type: NEXT_ROUND }),
  }
}
const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, mapDispatchToProps)(Table)