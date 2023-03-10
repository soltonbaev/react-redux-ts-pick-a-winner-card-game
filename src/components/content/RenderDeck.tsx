import {Button, Grid, Paper, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {fetchDeck, getDeck} from '../../helpers/CRUD/read';

const RenderDeck = ({deckId}: any) => {
   const navigate = useNavigate();
   const [deck, setDeck] = useState({remaining: ''});
   useEffect(() => {
      fetchDeck(deckId).then(res => {
         console.log(res);
         setDeck(res);
      });
   }, []);
   return (
      <Grid item lg={3}>
         <Paper
            elevation={5}
            sx={{minHeight: '15rem', padding: '1rem', position: 'relative'}}
         >
            <Typography variant="h6">Deck: {deckId}</Typography>
            <Typography>Cards remaining in deck: {deck.remaining}</Typography>
            <Button
               variant="outlined"
               sx={{position: 'absolute', left: '1rem', bottom: '1rem'}}
               onClick={() => {
                  navigate(`/decks/${deckId}`);
               }}
            >
               Play this deck
            </Button>
         </Paper>
      </Grid>
   );
};

export default RenderDeck;
