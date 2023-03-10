import React from 'react';
import {createAsyncThunk, createSlice, current} from '@reduxjs/toolkit';
import axios from 'axios';

import {GlobalState, Todo} from '../helpers/types';
import {createNewDeck, setToLocalStorage} from '../helpers/CRUD/create';
import {drawCards, getDeck, getFromLocalStorage} from '../helpers/CRUD/read';

const initialState: GlobalState = {
   currentDeck: {},
   currentDraw: {},
   info: {},
   gameData: {loggedIn: false, decks: [], balance: 10000},
};

export const RootReducer = createSlice({
   name: 'todo_app',
   initialState,
   reducers: {
      setGameData(state) {
         state.info = {
            switchModalOn: true,
            type: 'success',
            message: 'Successfully authorized',
         };
      },

      setBalance(state, action) {
         state.gameData.balance = action.payload.balance;
         state.info = {
            switchModalOn: true,
            type: action.payload.type,
            message: action.payload.message,
         };
         setToLocalStorage(state.gameData);
      },

      setLogin(state) {
         state.gameData = getFromLocalStorage();
         state.gameData.loggedIn = true;
         state.info = {
            switchModalOn: true,
            type: 'success',
            message: 'Successfully authorized',
         };
      },
      setLogOut(state) {
         state.gameData.loggedIn = false;
         state.info = {
            switchModalOn: true,
            type: 'success',
            message: 'Successfully logged out',
         };
      },
      setLoginError(state) {
         state.info = {
            switchModalOn: true,
            type: 'error',
            message:
               'Unable to authorize. Please check your username and/or password',
         };
      },
   },
   extraReducers(builder) {
      // get existing deck
      builder.addCase(getDeck.rejected, (state, action) => {
         state.info = {
            switchModalOn: true,
            type: 'error',
            message: 'Unable to fetch deck. Server or internet down',
         };
      });
      builder.addCase(getDeck.pending, (state, action) => {
         state.info = {
            switchModalOn: true,
            type: 'warning',
            message: 'Fetching existing deck. Please wait...',
         };
      });
      builder.addCase(getDeck.fulfilled, (state, action) => {
         state.currentDeck = action.payload;

         // state.info = {
         //    switchModalOn: false,
         //    // type: 'success',
         //    // message: 'Deck generated',
         // };
      });
      // new deck cases
      builder.addCase(createNewDeck.rejected, (state, action) => {
         state.info = {
            switchModalOn: true,
            type: 'error',
            message: 'Unable to create deck. Server or internet down',
         };
      });
      builder.addCase(createNewDeck.pending, (state, action) => {
         state.info = {
            switchModalOn: true,
            type: 'warning',
            message: 'Generating deck. Please wait...',
         };
      });
      builder.addCase(createNewDeck.fulfilled, (state, action) => {
         state.currentDeck = action.payload;
         state.info = {
            switchModalOn: false,
            type: 'success',
            message: 'Deck generated',
         };
         state.gameData.decks.push({
            deckId: action.payload.deck_id,
         });
         setToLocalStorage(state.gameData);
      });
      // draw cards cases
      builder.addCase(drawCards.fulfilled, (state, action) => {
         state.currentDraw = action.payload;
         state.currentDeck.remaining = action.payload.remaining;
         // state.info = {
         //    switchModalOn: false,
         //    type: 'success',
         //    message: 'Cards drawn',
         // };
      });
      builder.addCase(drawCards.pending, (state, action) => {
         state.info = {
            switchModalOn: true,
            type: 'warning',
            message: 'Drawing a pair of cards...',
         };
      });
      builder.addCase(drawCards.rejected, (state, action) => {
         state.info = {
            switchModalOn: true,
            type: 'error',
            message: 'Cards could not be drawn. Check your connection',
         };
         console.log('drawCards.rejected payload', action.payload);
      });
   },
});

export const getInfoObj = (state: any) => state.info;

export const {setLogin} = RootReducer.actions;

export const {setLogOut} = RootReducer.actions;

export const {setLoginError} = RootReducer.actions;
export const {setBalance} = RootReducer.actions;
export default RootReducer.reducer;
