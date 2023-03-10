import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {RootState, useAppDispatch} from '../redux-store/store';
import {useSelector, useDispatch} from 'react-redux';

import {
   drawCards,
   getFromLocalStorage,
   useGlobalState,
} from '../helpers/CRUD/read';
import {useLocation, useParams} from 'react-router-dom';
import {createNewDeck, setToLocalStorage} from '../helpers/CRUD/create';
import {calcHighestRank} from '../helpers/calculate';

export default function DevMenu() {
   const location = useLocation();
   const {currentDeck, currentDraw, gameData} = useGlobalState();
   const dispatch = useAppDispatch();

   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
   const open = Boolean(anchorEl);
   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };

   const [inpValue, setInpValue] = React.useState('');

   return (
      <div
         style={{
            position: 'fixed',
            bottom: '0',
            right: '0',
            backgroundColor: 'orange',
            zIndex: '6000',
         }}
      >
         <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={e => handleClick(e)}
         >
            DevMenu
         </Button>
         <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
               'aria-labelledby': 'basic-button',
            }}
            sx={{zIndex: '7000'}}
         >
            <MenuItem
               onClick={() => {
                  dispatch(createNewDeck());
                  //   console.log(addToDo('test'));
               }}
            >
               Create new deck
            </MenuItem>
            <MenuItem
               onClick={() => {
                  console.log(
                     'global state',
                     currentDeck,
                     currentDraw,
                     gameData
                  );
               }}
            >
               Read global state
            </MenuItem>
            <MenuItem
               onClick={() => {
                  console.log(currentDeck);
               }}
            >
               Read current deck from state
            </MenuItem>
            <MenuItem
               onClick={() => {
                  console.log(currentDraw);
               }}
            >
               Read current draw from state
            </MenuItem>
            <MenuItem
               onClick={() => {
                  dispatch(drawCards(currentDeck.deck_id));
               }}
            >
               Fetch new draw
            </MenuItem>

            <MenuItem
               onClick={() => {
                  console.log(location);
               }}
            >
               Get current page route
            </MenuItem>

            <MenuItem
               onClick={() => {
                  let res = calcHighestRank(
                     currentDraw.cards[0].code[0],
                     currentDraw.cards[1].code[0]
                  );
                  console.log(res);
               }}
            >
               Calculate highest rank
            </MenuItem>

            <MenuItem
               onClick={() => {
                  console.log(getFromLocalStorage());
               }}
            >
               Get from local storage
            </MenuItem>

            <MenuItem
               onClick={() => {
                  console.log(setToLocalStorage(inpValue));
               }}
            >
               Set to local storage
            </MenuItem>
            <MenuItem onClick={() => {}}>Push to decks array</MenuItem>

            <center>
               <input
                  placeholder="universal input"
                  value={inpValue}
                  onChange={e => {
                     setInpValue(e.target.value);
                  }}
               ></input>
            </center>
         </Menu>
      </div>
   );
}
