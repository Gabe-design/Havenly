// frontend/src/store/store.js

// This file creates the redux store used in my react application

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
// This deals with the login/logout session
import sessionReducer from './session';
// This will deal with the spots
import spotsReducer from './spots';
// Importing reviews 
import reviewReducer from './reviews';

/* 
Each key becomes a key in the redux store
This also puts all the reducers together in a single root reducer
*/
const rootReducer = combineReducers({
  // ADD REDUCERS HERE
  session: sessionReducer,
  spots: spotsReducer,
  reviews: reviewReducer
});

// This sets up the middleware
let enhancer;
if (import.meta.env.MODE === "production") {
  // In prod this only applys thunk middleware to handle async actions
  enhancer = applyMiddleware(thunk);
} else {
  /* 
  In dev this adds redux-logger to print actions in the console
  This also enables the redux dev tools for degungging in the browser
  */
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
  // Uses dev tools of they're available
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

/*
This creates the redux store instance
This also takes in optional preloadedState
*/
const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

// This exports the store factory function
export default configureStore;
