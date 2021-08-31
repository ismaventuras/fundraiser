/**
 * React
 */
import React from 'react';
import ReactDOM from 'react-dom';
/**
 * Styles
 */
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootswatch/dist/spacelab/bootstrap.min.css";
import './index.scss';
/**
 * App
 */
import App from './App';

/**
 * web3
 */
import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3';

/**
 * Function to get the provider from metamask
 * @param {*} provider 
 * @returns 
 */
function getLibrary(provider){
  const library = new Web3(provider)
  return library
}


/**
 * Run the app
 */
ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <App />
  </Web3ReactProvider>,
  document.getElementById('root')
)