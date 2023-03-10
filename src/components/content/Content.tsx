import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {useGlobalState} from '../../helpers/CRUD/read';
import About from './About';
import CurrentDeck from './CurrentDeck';
import Home from './Home';
import Login from './Login';

const Content = () => {
   const {gameData} = useGlobalState();

   return (
      <Routes>
         <Route path="/" element={gameData.loggedIn ? <Home /> : <Login />} />
         <Route path="/login" element={<Login />} />
         <Route path="/about" element={<About />} />
         <Route path="/decks/:id" element={<CurrentDeck />} />
      </Routes>
   );
};

export default Content;
