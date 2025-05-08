// frontend/src/store/spots.js

import { csrfFetch } from "./csrf";

// These are the action types

// This sets all spots 
const SET_SPOTS = 'spots/setSpots';
// This adds a new spot
const ADD_SPOT = 'spots/addSpot';
// This updates a spot
const UPDATE_SPOT = 'spots/updateSpot';
// This removes a spot
const REMOVE_SPOT = 'spots/removeSpot';

// These are the action creators

// This sets multiple spots
const setSpots = ( spots) => {
    return {
        type: SET_SPOTS,
        payload: spots
    }
};

// This adds a new spot
const addSpot = ( spot ) => {
    return {
        type: ADD_SPOT,
        payload: spot
    }
};

// This updates a spot
const updateSpotAction = ( spot ) => {
    return {
        type: UPDATE_SPOT,
        payload: spot
    }
};

// This removes a spot by its ID
const removeSpot = ( spotId ) => {
    return {
        type: REMOVE_SPOT,
        payload: spotId
    }
};

// These are the thunks actions

// This thunk is to fetch all spots from the backend
export const fetchSpots = () => async ( dispatch ) => {
    const res = await csrfFetch( "/api/spots" );
    const data = await res.json();
    dispatch( setSpots( data.spots ));
    return res;
}

// This thunk will get the current users spots
export const fetchUserSpots = () => async ( dispatch ) => {
    const res = await csrfFetch( '/api/spots/current' );
    const data = await res.json;
    dispatch( setSpots( data.spots ));
    return res;
}

// This thunk fetches a spot by the ID
export const fetchSpotById = ( id ) => async ( dispatch ) => {
    const res = await csrfFetch( `/api/spots/${ id }` );
    const data = await res.json();
    dispatch( addSpot( data ));
    return res;
};

// This thunk creates a new spot 
export const createSpot = ( spot ) => async ( dispatch ) => {
    const res = await csrfFetch( "/api/spots", {
        method: "POST",
        body: JSON.stringify( spot )
    })

    const data = await res.json();
    dispatch( addSpot( data ));
    return res;
};

// This thunk updates the spot
export const updateSpot = ( spot ) => async ( dispatch ) => {
    const res = await csrfFetch( `/api/spots/${ spot.id }`, {
        method: "PUT",
        body: JSON.stringify( spot )
    })

    const data = await res.json();
    dispatch( updateSpotAction( data ));
    return res;
};

// And this thunk deletes/removes the spot 
export const deleteSpot = ( spotId ) => async ( dispatch ) => {
    const res = await csrfFetch( `/api/spots/${ spotId }`, {
        method: "DELETE"
    })

    dispatch( removeSpot( spotId ));
    return res;
}

// This is the initial state, its what the store will start with 
const initialState = {};

// These is the reducer function, decides how the store changes by the actions
const spotsReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        // This replaces spots 
        case SET_SPOTS: {
            const spotsState = {};
            action.payload.forEach( spot => {
                spotsState[ spot.id ] = spot;
            })

            return spotsState;
        }
        
        // To update a spot
        case UPDATE_SPOT: {
            return {
                ...state,
                [ action.payload.id ]: action.payload
            }
        }
        
        // This removes a spot
        case REMOVE_SPOT: {
            const newState = { ...state };
            delete newState[ action.payload ];
            return newState;
        }

        // To return the default state
        default:
            return state;
    }
};

// Exports
export default spotsReducer;
export { setSpots, addSpot, updateSpotAction, removeSpot };


