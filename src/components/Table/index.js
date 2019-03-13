import React from 'react';
import { connect } from 'react-redux'
import {
  drawCard,
  fetchDeck,
  shuffleDeck,
  addPointWinners,
  actionTypes,
} from '../../actions';
import { STRAIGH_WIN } from '../../constants/general';
import Player from '../Player';
import Controller from '../Controller';
import ScoreBoard from '../Scoreboard';
import './styles.scss';

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
    if (players.find(player => player.currentPoint === STRAIGH_WIN)) {
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
      <div className="Table-wrapper">
        <div className="Table-playground">
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
        <div className="Table-actions">
          <ScoreBoard
            currentRound={currentRound}
            totalRound={5}
            players={players}
          />
          <Controller
            onShuffle={this._onShuffleClick}
            onDraw={this._onDrawClick}
            onReveal={this._onRevealClick}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDeck: async () => dispatch(fetchDeck()),
  shuffleDeck: async deckId => dispatch(shuffleDeck(deckId)),
  drawCard: async playerId => dispatch(drawCard(playerId)),
  addPointWinners: (winners, points) => dispatch(addPointWinners(winners, points)),
  nextRound: () => dispatch({ type: actionTypes.NEXT_ROUND }),
});

const mapStateToProps = state => state;

export default connect(mapStateToProps, mapDispatchToProps)(Table)