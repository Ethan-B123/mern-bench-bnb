import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//Components
import configureStore from './store/store';
import App from './App.jsx';
import registerServiceWorker from './registerServiceWorker';

document.addEventListener('DOMContentLoaded', () => {
  let store = configureStore();
  const root = document.getElementById('root');
  ReactDOM.render(<App store={store} />, root);
  registerServiceWorker();
});
