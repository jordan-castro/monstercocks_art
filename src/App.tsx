import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppRouter from './view/router';
import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'

function getLibrary(provider) {
  return new Web3(provider);
}

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <AppRouter />
    </Web3ReactProvider>
  );
}

export default App;
