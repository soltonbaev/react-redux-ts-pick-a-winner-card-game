import {Button, TextField, Typography} from '@mui/material';
import {Container} from '@mui/system';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {setLogin, setLoginError} from '../../redux-store/RootReducer';
import {useAppDispatch} from '../../redux-store/store';

const Login = () => {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   function handleLogin() {
      if (username === 'admin' && password === '123456') {
         dispatch(setLogin());
         navigate('/');
      } else {
         dispatch(setLoginError());
      }
   }
   return (
      <Container
         maxWidth="xs"
         sx={{
            paddingTop: '6rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
         }}
      >
         <Typography variant="h4" sx={{textAlign: 'center'}}>
            Welcome to <br></br>`Pick a winner` <br></br>card game
         </Typography>
         <Typography>
            Pick a winning card out of two random ones to win cash! Login to
            proceed:
         </Typography>
         <TextField
            sx={{backgroundColor: 'white'}}
            value={username}
            onChange={e => {
               setUsername(e.target.value);
            }}
            placeholder="username"
         ></TextField>
         <TextField
            sx={{backgroundColor: 'white'}}
            value={password}
            onChange={e => {
               setPassword(e.target.value);
            }}
            placeholder="password"
         ></TextField>
         <Button
            variant="contained"
            onClick={() => {
               console.log('login button pressed');
               handleLogin();
            }}
         >
            Login
         </Button>
      </Container>
   );
};

export default Login;
