import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Content from './components/content/Content';
import Footer from './components/Footer';
import {Provider} from 'react-redux';
import {store} from './redux-store/store';
import DevMenu from './dev/devMenu';
import RenderError from './errors/RenderError';
import boardBg from './boardbg.jpeg';
import {Box} from '@mui/system';

function App() {
   return (
      <Box
         sx={{
            backgroundImage: `url(${boardBg})`,
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            height: '100vh',
         }}
      >
         <Provider store={store}>
            <Header />
            <Content />
            <RenderError />
            <Footer />
            <DevMenu />
         </Provider>
      </Box>
   );
}

export default App;
