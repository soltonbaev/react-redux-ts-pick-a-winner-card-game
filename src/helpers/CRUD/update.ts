import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {BASE_URL} from '../consts';
import {useGlobalState} from './read';

export const shuffleDeck = createAsyncThunk('deck/shuffleDeck', async () => {
   const {currentDeck} = useGlobalState();
   const response = await axios(
      BASE_URL + currentDeck.deck_id + '/shuffle/?remaining=true'
   );
   console.log(response.data);
   return response.data;
});
