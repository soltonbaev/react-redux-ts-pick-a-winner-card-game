import {Button, Container, Grid, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useLocation, useParams} from 'react-router-dom';
import {calcHighestRank} from '../../helpers/calculate';
import {drawCards, getDeck, useGlobalState} from '../../helpers/CRUD/read';
import {setBalance} from '../../redux-store/RootReducer';
import {useAppDispatch} from '../../redux-store/store';
import cardBack from './back_of_a_card.png';

const CurrentDeck = () => {
   const [gameOn, setGameOn] = useState(false);
   const [cardsShown, setCardsShown] = useState(false);
   const [buttonShown, setButtonShown] = useState(true);
   const [deckRemaining, setDeckRemaining] = useState(null);
   const [outcome, setOutcome] = useState({
      hasWon: 'undecided',
      chosenCard: 'none',
   });
   const {currentDeck, currentDraw, gameData} = useGlobalState();
   const params = useParams();
   const location = useLocation();
   const dispatch = useAppDispatch();
   useEffect(() => {
      dispatch(getDeck(params.id));
   }, []);

   useEffect(() => {
      setDeckRemaining(currentDeck.remaining);
   }, [currentDeck.remaining]);

   function handleDraw(card: string) {
      console.log('card id', card);
      let winner = calcHighestRank(
         currentDraw.cards[0].code[0],
         currentDraw.cards[1].code[0]
      );

      let currentBalance = gameData.balance;

      if (card === winner) {
         setOutcome({hasWon: 'true', chosenCard: card});
         dispatch(
            setBalance({
               balance: currentBalance + 20,
               type: 'success',
               message: 'You earned 10$!',
            })
         );
      } else {
         setOutcome({hasWon: 'false', chosenCard: card});
         dispatch(
            setBalance({
               balance: currentBalance,
               type: 'error',
               message: 'You lost your bet of 10$',
            })
         );
      }
   }

   return (
      <Container maxWidth="lg" sx={{paddingTop: '6rem'}}>
         <Typography sx={{textAlign: 'center'}}>
            Deck id: {currentDeck.deck_id}
         </Typography>
         <Typography sx={{textAlign: 'center'}}>
            Cards remaining in deck: {currentDeck.remaining}
         </Typography>
         <Grid container>
            <Grid
               item
               sm={4}
               md={4}
               lg={4}
               sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '70vh',
               }}
            >
               {gameOn || (
                  <img
                     style={{
                        width: '226px',
                        height: '314px',
                        borderRadius: '10px',
                        boxShadow: '3px 3px 20px black',
                        // cursor: 'pointer',
                     }}
                     src={cardBack}
                  />
               )}
               {gameOn && (
                  <>
                     {cardsShown ? (
                        <img
                           style={{
                              width: '226px',
                              height: '314px',
                              cursor: 'pointer',
                              borderRadius: '10px',
                              boxShadow: '3px 3px 20px black',
                           }}
                           src={currentDraw.cards[0].images.png}
                        />
                     ) : (
                        <>
                           {currentDraw.success && (
                              <img
                                 id={currentDraw.cards[0].code[0]}
                                 style={{
                                    width: '226px',
                                    height: '314px',
                                    borderRadius: '10px',
                                    boxShadow: '3px 3px 20px black',
                                 }}
                                 src={cardBack}
                                 onClick={e => {
                                    const target =
                                       e.target as HTMLButtonElement;
                                    console.log(target.id);
                                    handleDraw(target.id);
                                    setCardsShown(true);
                                    setButtonShown(true);
                                 }}
                              />
                           )}
                        </>
                     )}
                  </>
               )}
            </Grid>
            {deckRemaining === 0 ? (
               <Grid
                  item
                  sm={4}
                  md={4}
                  lg={4}
                  sx={{
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                     minHeight: '70vh',
                  }}
               >
                  There are no more cards in the deck! Please start a new game
               </Grid>
            ) : (
               <Grid
                  item
                  sm={4}
                  md={4}
                  lg={4}
                  sx={{
                     display: 'flex',
                     flexDirection: 'column',
                     alignItems: 'center',
                     justifyContent: 'space-evenly',
                  }}
               >
                  {buttonShown ? (
                     <>
                        {outcome.hasWon === 'true' && (
                           <Typography
                              variant="h3"
                              sx={{color: 'orange', textAlign: 'center'}}
                           >
                              Congrats! You won!
                           </Typography>
                        )}
                        {outcome.hasWon === 'false' && (
                           <Typography
                              variant="h3"
                              sx={{color: 'red', textAlign: 'center'}}
                           >
                              Sorry, good luck next time
                           </Typography>
                        )}
                        <>
                           <Typography variant="h4">Feeling lucky?</Typography>
                           <Button
                              onClick={() => {
                                 const currentBalance = gameData.balance;
                                 dispatch(drawCards(params.id));
                                 dispatch(
                                    setBalance({
                                       balance: currentBalance - 10,
                                       type: 'warning',
                                       message:
                                          'You placed a bet of 10$. Your balance has been deducted',
                                    })
                                 );
                                 setGameOn(true);
                                 setCardsShown(false);
                                 setButtonShown(false);
                              }}
                              variant="contained"
                           >
                              Play!
                           </Button>
                           <Typography>
                              Click to draw cards randomly. 10$ will be
                              substracted from your account. If you win, your
                              bet will be returned to you plus the amount of
                              your bet will be added to your account (x2)
                           </Typography>
                        </>
                     </>
                  ) : (
                     <>
                        <Typography variant="h6">
                           Click on the left or right card
                        </Typography>
                     </>
                  )}
               </Grid>
            )}

            <Grid
               item
               sm={4}
               md={4}
               lg={4}
               sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
               }}
            >
               {gameOn || (
                  <img
                     style={{
                        width: '226px',
                        height: '314px',
                        borderRadius: '10px',
                        boxShadow: '3px 3px 20px black',
                        // cursor: 'pointer',
                     }}
                     src={cardBack}
                  />
               )}
               {gameOn && (
                  <>
                     {cardsShown ? (
                        <img
                           style={{
                              width: '226px',
                              height: '314px',
                              cursor: 'pointer',
                              borderRadius: '10px',
                              boxShadow: '3px 3px 20px black',
                           }}
                           src={currentDraw.cards[1].images.png}
                        />
                     ) : (
                        <>
                           {currentDraw.success && (
                              <img
                                 id={currentDraw.cards[1].code[0]}
                                 style={{
                                    width: '226px',
                                    height: '314px',
                                    borderRadius: '10px',
                                    boxShadow: '3px 3px 20px black',
                                 }}
                                 src={cardBack}
                                 onClick={e => {
                                    const target =
                                       e.target as HTMLButtonElement;
                                    console.log(target.id);
                                    handleDraw(target.id);
                                    setCardsShown(true);
                                    setButtonShown(true);
                                 }}
                              />
                           )}
                        </>
                     )}
                  </>
               )}
            </Grid>
         </Grid>
      </Container>
   );
};

export default CurrentDeck;
