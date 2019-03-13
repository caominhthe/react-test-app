import axios from 'axios';

export class DeckApi {
  getDeck = async() => {
    return await axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
  }

  draw = async(id) => {
    return await axios.get(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=3`);
  }

  shuffle = async(id) => {
    return await axios.get(`https://deckofcardsapi.com/api/deck/${id}/shuffle/`);
  }
}
