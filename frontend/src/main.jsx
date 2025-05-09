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
import * as sessionActions from './store/session';
import { ModalProvider } from './context/ModalContext';
import { Modal } from './context/Modal';


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
  window.sessionActions = sessionActions;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <App />
        <Modal />
      </ModalProvider>
    </Provider>
  </React.StrictMode>
);
