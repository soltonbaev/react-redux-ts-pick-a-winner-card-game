import {Box, Grid, Typography} from '@mui/material';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import LogoImg from './logo.png';
const Logo = () => {
   const navigate = useNavigate();
   return (
      <>
         <Grid
            item
            sx={{
               cursor: 'pointer',
               fontSize: '2.5rem',
            }}
            onClick={() => {
               navigate('/');
            }}
         >
            {/* <Typography variant="h2">Pick a winner</Typography> */}
            <img style={{marginTop: '0.4rem', width: '20rem'}} src={LogoImg} />
         </Grid>
      </>
   );
};

export default Logo;
