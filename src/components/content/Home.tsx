import {Masonry} from '@mui/lab';
import {Container, Grid, Typography} from '@mui/material';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useGlobalState} from '../../helpers/CRUD/read';
import {RootState, useAppDispatch} from '../../redux-store/store';
import RenderDeck from './RenderDeck';

const Home = () => {
   const dispatch = useAppDispatch();
   // const globalState = useGlobalState();
   useEffect(() => {}, []);
   const {gameData} = useGlobalState();

   return (
      <Container maxWidth="lg" sx={{minHeight: '75vh', paddingTop: '6rem'}}>
         {gameData.decks.length === 0 ? (
            <Typography variant="h4">
               You don't have any decks. Click 'Start new game' to add one
            </Typography>
         ) : (
            <Typography variant="h4">Here are your decks</Typography>
         )}
         <Grid container spacing={3} sx={{marginTop: '1rem'}}>
            {gameData.decks?.map((deck: any) => {
               return <RenderDeck key={deck.deckId} deckId={deck.deckId} />;
            })}
         </Grid>
      </Container>
   );
};

export default Home;
