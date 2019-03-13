import { actionTypes } from '../actions';

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

const initialState = {
  deck: null,
  players: PLAYERS,
  totalRound: 5,
  currentRound: 0,
  defaultBet: 5000,
  isLoading: false,
  error: null
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REQUEST_FETCH_DECK_START: {
      return {
        ...state,
        isLoading: true,
        error: null
      }
    }
    case actionTypes.REQUEST_FETCH_DECK_SUCCESS: {
      return {
        ...state,
        deck: action.deck,
        isLoading: false,
        error: null
      }
    }
    case actionTypes.REQUEST_FETCH_DECK_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    }
    case actionTypes.REQUEST_SHUFFLE_DECK_START: {
      return {
        ...state,
        isLoading: true,
        error: null
      }
    }
    case actionTypes.REQUEST_SHUFFLE_DECK_SUCCESS: {
      return {
        ...state,
        deck: action.deck,
        isLoading: false,
        error: null
      }
    }
    case actionTypes.REQUEST_SHUFFLE_DECK_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    }

    case actionTypes.REQUEST_DRAW_CARD_START: {
      return {
        ...state,
        isLoading: true,
        error: null
      }
    }
    case actionTypes.REQUEST_DRAW_CARD_SUCCESS: {
      return {
        ...state,
        players: action.players,
        deck: action.deck,
        isLoading: false,
        error: null
      }
    }
    case actionTypes.REQUEST_DRAW_CARD_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    }
    case actionTypes.ADD_POINT_WINNERS: {
      const { winners, points } = action
      const players = [...state.players]
      for (let i = 0; i < winners.length; i++) {
        for (let j = 0; j < players.length; j++) {
          if (winners[i].id === players[j].id) {
            players[j].point += points
          }
        }
      }

      return {
        ...state,
        players,
      }
    }
    case actionTypes.NEXT_ROUND: {
      let nextRound
      const players = [...state.players]
      if (state.currentRound === state.totalRound) {
        nextRound = 1;
        
        players.forEach(player => player.point = 0);
      } else {
        nextRound = state.currentRound + 1;
      }
      return {
        ...state,
        currentRound: nextRound,
        players
      }
    }

    default: {
      return state
    }
  }
}

export default rootReducer