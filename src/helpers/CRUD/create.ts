import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {NEW_SHUFFLED_DECK} from '../consts';

export const createNewDeck = createAsyncThunk(
   'cards/newShuffledDeck',
   async () => {
      const response = await axios.get(NEW_SHUFFLED_DECK);
      // console.log(response.data);
      return response.data;
   }
);

export function setToLocalStorage(obj: any) {
   localStorage.setItem('gameData', JSON.stringify(obj));
}
