import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../../redux-store/store';
import {BASE_URL} from '../consts';
import {GlobalState} from '../types';
import {setToLocalStorage} from './create';

export const useGlobalState = () => {
   return useSelector((state: RootState) => {
      return state;
   });
};

export const drawCards = createAsyncThunk(
   'deck/drawCards',
   async (deck_id: string | undefined) => {
      const response = await axios.get(BASE_URL + deck_id + '/draw/?count=2 ');
      console.log(response.data);
      return response.data;
   }
);

export const getDeck = createAsyncThunk(
   'deck/getDeck',
   async (deck_id: string | undefined) => {
      const response = await axios.get(BASE_URL + deck_id);
      console.log(response.data);
      return response.data;
   }
);

export async function fetchDeck(deck_id: string | undefined) {
   try {
      const response = await axios.get(BASE_URL + deck_id);
      console.log(response.data);
      return response.data;
   } catch (error) {
      console.log(error);
      return error;
   }
}

export function getFromLocalStorage() {
   const gameDataObj = {
      loggedIn: false,
      decks: [],
      balance: 10000,
   };
   let gameData: any = localStorage.getItem('gameData');
   if (!gameData) {
      setToLocalStorage(gameDataObj);
      gameData = localStorage.getItem('gameData');
   }

   return JSON.parse(gameData);
}
