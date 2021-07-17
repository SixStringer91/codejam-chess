import React from 'react';
import './App.css';
import Header from './components/header/header';
import Main from './components/main/main';
import Footer from './components/footer/footer';
import Popup from './components/popup/popup';

function App() {
  return (
    <>
      <Popup />
      <Header />
      <Main />
      <Footer />
    </>
  );
}

export default App;
