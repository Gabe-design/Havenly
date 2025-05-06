// frontend/src/store/session.js

import { csrfFetch } from "./csrf";

// These are the action types

// The action for logging in (sets the user data)
const SET_USER = 'session/setUser'
// The action for logging out (removes the user data)
const REMOVE_USER = 'session/removeUser';

// These are action creators 

// creates an action object that describe what happened
// Takes a user object and returns a action to store a user
const setUser = (user) => ({
    type: SET_USER,
    payload: user
});

// Will return a action taht removes a user
const removeUser = () => ({
    type: REMOVE_USER
});

// These are thunk actions 

// Thunk is a function that does async operations such as calling backend
// The login thunk to send POST request to /api/session with credentials
export const login = ({ credential, password }) => async(dispatch) => {
    // Sends login credentials to backend by csrfFetch
    const res = await csrfFetch( 'api/session', {
        method: 'POST',
        body: JSON.stringify({ credential, password })
    });
    //Parses tha response body to get user info
    const data = await res.json();
    // Dispatches action to store user info 
    dispatch(setUser(data.user));
    // Returns the response in case its needed
    return res;
};

// These is the intial state

// The intial session state when a user is not logged in =
const intialState = { user: null };

// These is the reducer function

// This decides how the redux state should change based on the action dispatched
export default function sessionReducer( state = intialState, action ) {
    switch( action.type ) {
        // Sets the user to the one from the action payload(logged in)
        case SET_USER:
            return { user: action.payload };
        // This resets the user to null/undefined(logged out)
        case REMOVE_USER:
            return { user: null };
        // Now if the action is not known, it will return the current state unchanged
        return state;

    };
};