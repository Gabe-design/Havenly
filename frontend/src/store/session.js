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
const setUser = ( user ) => {
    return {
        type: SET_USER,
        payload: user
    }
};

// Will return a action taht removes a user
const removeUser = () => {
    return {
        type: REMOVE_USER
    }
};

// These are thunk actions 

// Thunk is a function that does async operations such as calling backend
// The login thunk to send POST request to /api/session with credentials
export const login = ({ credential, password }) => async(dispatch) => {
    // Sends login credentials to backend by csrfFetch
    const res = await csrfFetch( "api/session", {
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

// This is the signup thunk POST /api/users that the backend route uses to sign up a user.
export const signup = ( user ) => async ( dispatch ) => {
    // This gets the user details needed for signup
    const { username, firstName, lastName, email, password } = user;
    
    // This sends the signup request to the backend /api/users
    const res = await csrfFetch( "/api/users", {
        method: "POST", 
        body: JSON.stringify({ username, firstName, lastName, email, password })
    });

    // This gets the user data from the res body
    const data = await res.json();
    // This updates the redux store with the new session user
    dispatch(setUser( data.user ));
    return res;
};

// Thunk action to restore session user if logged in
export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch("/api/session");
    const data = await response.json();
    // This adds the session user back to store after a refresh
    dispatch(setUser(data.user));
    return response;
};

// These is the intial state

// The intial session state when a user is not logged in =
const initialState = { user: null };

// These is the reducer function

// Reducer to handle the session state based on actions
const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        // Sets the user to the one from the action payload(logged in)
        case SET_USER:
            return { ...state, user: action.payload };
        // This resets the user to null/undefined(logged out)
        case REMOVE_USER:
             return { ...state, user: null };
        // Now if the action is not known, it will return the current state unchanged
        default: return state;
    }
};




export default sessionReducer;
// Export actions for testing/debugging in dev
export { setUser, removeUser };
