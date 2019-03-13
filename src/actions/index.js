import axios from 'axios'
import {
  REQUEST_SHUFFLE_DECK_START,
  REQUEST_SHUFFLE_DECK_SUCCESS,
  REQUEST_SHUFFLE_DECK_ERROR,

  REQUEST_DRAW_CARD_START,
  REQUEST_DRAW_CARD_SUCCESS,
  REQUEST_DRAW_CARD_ERROR,

  REQUEST_FETCH_DECK_START,
  REQUEST_FETCH_DECK_SUCCESS,
  REQUEST_FETCH_DECK_ERROR,

  ADD_POINT_WINNERS
} from '../constants/actionTypes'

import {
  BASE_URL, STRAIGH_WIN
} from '../constants/general'
import { DeckApi } from '../apis/deck';

const JQK = ['JACK', 'QUEEN', 'KING'];

export const fetchDeck = () => async dispatch => {
  try {
    const deckApi = new DeckApi();
    dispatch({ type: REQUEST_FETCH_DECK_START })
    const dataResponse = await deckApi.getDeck();
    const deck = dataResponse.data

    dispatch({
      type: REQUEST_FETCH_DECK_SUCCESS,
      deck,
    })
  } catch (error) {
    dispatch({
      type: REQUEST_FETCH_DECK_ERROR,
      error
    })
  }
}

export const shuffleDeck = (deckId) => async dispatch => {
  try {
    const deckApi = new DeckApi();
    dispatch({ type: REQUEST_SHUFFLE_DECK_START })
    const dataResponse = await deckApi.shuffle(deckId);
    const deck = dataResponse.data
    alert('Suffle success');

    dispatch({
      type: REQUEST_SHUFFLE_DECK_SUCCESS,
      deck
    })
  } catch (error) {

    dispatch({
      type: REQUEST_SHUFFLE_DECK_ERROR,
      error
    })
  }
}

const _calculatePoint = (cards) => {
  if (cards.every(elem => JQK.includes(elem.value.toUpperCase()))) {
    return STRAIGH_WIN;
  }
  return cards.reduce((res, cur) => {
    const valueCard = JQK.includes(cur.value.toUpperCase()) ? 10 : (cur.value.toUpperCase() === 'ACE' ? 1 : Number(cur.value))
    return res + valueCard
  }, 0) % 10
}

export const drawCard = (deckId) => async (dispatch, getState) => {
  try {
    const deckApi = new DeckApi();

    dispatch({ type: REQUEST_DRAW_CARD_START })

    const { players, deck } = getState()
    const clonePlayers = [...players]

    for (let i = 0; i < clonePlayers.length; i++) {
      const dataResponse = await deckApi.draw(deckId);
      const { cards, remaining } = dataResponse.data
      clonePlayers[i].cards = cards
      clonePlayers[i].currentPoint = _calculatePoint(cards);
      deck.remaining = remaining
    }

    console.log(clonePlayers);

    dispatch({
      type: REQUEST_DRAW_CARD_SUCCESS,
      players: clonePlayers,
      deck
    })

  } catch (error) {
    dispatch({
      type: REQUEST_DRAW_CARD_ERROR,
      error
    })
  }
}

export const addPointWinners = (winners, points) => ({
  type: ADD_POINT_WINNERS,
  winners,
  points
})