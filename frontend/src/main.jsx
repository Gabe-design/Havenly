// frontend/src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
// Gives all the react components access to redux
import { Provider } from 'react-redux';
// Main component that will render the app
import App from './App';
// The global styles
import './index.css';
// The function to create the redux store
import configureStore from './store';
// Handles the CSRF tokens
import { restoreCSRF, csrfFetch } from './store/csrf';
// Imports the session login and logout actions
import * as sessionActions from './store/session'; // <-- ADD THIS LINE

// This creates the redux store
const store = configureStore();

// The dev-only setup
if (import.meta.env.MODE !== 'production') {
  // Asks the backend to send the CSRF token
  restoreCSRF();

  // Exposes these helpers for manual testing in the dev tools
  window.csrfFetch = csrfFetch;
  window.store = store;
  // For testing login
  window.sessionActions = sessionActions; // <-- ADD THIS LINE
}

// Starts the react app and gives it access to redux 
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
