import {Container, Typography} from '@mui/material';
import React from 'react';

const Footer = () => {
   return (
      <Container
         maxWidth="lg"
         sx={{
            marginBottom: '2rem',
            marginTop: '2rem',
         }}
      >
         <Typography sx={{textAlign: 'center'}}>
            &copy; 2023 crafted by{' '}
            <a target="_blank" href="https://soltonbaev.com">
               Ibraim Soltonbaev
            </a>
         </Typography>
      </Container>
   );
};

export default Footer;
