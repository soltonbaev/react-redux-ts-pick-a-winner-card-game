import {Container, Grid, IconButton, Tooltip, Typography} from '@mui/material';
import {Box} from '@mui/system';
import React from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {createNewDeck} from '../../helpers/CRUD/create';
import {useAppDispatch} from '../../redux-store/store';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Logo from './Logo';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import CasinoIcon from '@mui/icons-material/Casino';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {shuffleDeck} from '../../helpers/CRUD/update';
import {useGlobalState} from '../../helpers/CRUD/read';
import {setLogOut} from '../../redux-store/RootReducer';

const Header = () => {
   const {pathname} = useLocation();
   const navigate = useNavigate();
   const dispatch = useAppDispatch();
   const {currentDeck, gameData} = useGlobalState();
   return (
      <Box
         sx={{
            backdropFilter: 'blur(5px)',
            position: 'fixed',
            top: '0',
            zIndex: '1000',
            width: '100%',
            borderBottomStyle: 'solid',
            borderBottomColor: 'brown',
            borderBottomWidth: '1px',
         }}
      >
         <Container maxWidth="lg">
            <Grid
               container
               sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.5rem',
               }}
            >
               <Logo />
               <Grid item sx={{display: 'flex', alignItems: 'center'}}>
                  {gameData.loggedIn && (
                     <Grid
                        item
                        sx={{
                           display: 'flex',
                           alignItems: 'center',
                           // cursor: 'pointer',
                           marginRight: '1rem',
                        }}
                        // onClick={() => {
                        //    dispatch(shuffleDeck());
                        // }}
                     >
                        <>
                           <MonetizationOnOutlinedIcon />
                           <Typography>
                              My balance:{gameData.balance} $
                           </Typography>
                        </>
                     </Grid>
                  )}
                  {pathname === '/' && gameData.loggedIn && (
                     <>
                        <Grid
                           item
                           sx={{
                              display: 'flex',
                              alignItems: 'center',
                              cursor: 'pointer',
                              marginRight: '1rem',
                           }}
                           onClick={() => {
                              dispatch(createNewDeck());
                              navigate(`decks/${currentDeck.deck_id}`);
                           }}
                        >
                           <CasinoIcon />
                           <Typography>Start new game</Typography>
                        </Grid>
                     </>
                  )}
                  {pathname === '/' ? (
                     <Grid
                        item
                        sx={{
                           display: 'flex',
                           alignItems: 'center',
                           cursor: 'pointer',
                        }}
                     >
                        <Tooltip title="About the app">
                           <IconButton
                              sx={{color: 'white'}}
                              onClick={() => {
                                 navigate('/about');
                              }}
                           >
                              <InfoOutlinedIcon></InfoOutlinedIcon>
                           </IconButton>
                        </Tooltip>

                        {/* <Link to="/about">About the app</Link> */}
                     </Grid>
                  ) : (
                     <Grid
                        item
                        sx={{
                           display: 'flex',
                           alignItems: 'center',
                           cursor: 'pointer',
                        }}
                     >
                        <Tooltip title="Back to the homepage">
                           <IconButton
                              sx={{color: 'white'}}
                              onClick={() => {
                                 navigate('/');
                              }}
                           >
                              <HomeOutlinedIcon></HomeOutlinedIcon>
                           </IconButton>
                        </Tooltip>
                     </Grid>
                  )}
                  <Tooltip title="Logout">
                     <IconButton
                        sx={{color: 'white'}}
                        onClick={() => {
                           dispatch(setLogOut());
                           navigate('/');
                        }}
                     >
                        <LogoutIcon></LogoutIcon>
                     </IconButton>
                  </Tooltip>
               </Grid>
            </Grid>
         </Container>
      </Box>
   );
};

export default Header;
