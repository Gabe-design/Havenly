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
    // This fetches all the spots
    const res = await csrfFetch( "/api/spots" );
    const data = await res.json();

    // debugging
    console.log( "api response:", data );
    console.log( "data.Spots:", data.Spots );

    // This is dispatch to store them
    dispatch( setSpots( data.Spots ));
    return res;
}

// This thunk will get the current users spots
export const fetchUserSpots = () => async ( dispatch ) => {
    // This fetches the current users spots
    const res = await csrfFetch( '/api/spots/current' );
    const data = await res.json();

    // This is dispatch to store them
    dispatch( setSpots( data.Spots ));
    return res;
}

// This thunk fetches a spot by the ID
export const fetchSpotById = ( id ) => async ( dispatch ) => {
    // This fetches the spot by its id
    const res = await csrfFetch( `/api/spots/${ id }` );
    const data = await res.json();

    // This is to get the image when creating the new spot
    const spotData = {
    ...data.Spots,
    previewImage: data.Spots.SpotImages?.find(img => img.preview)?.url || null
    }

    // This adds the fetched spot to the store 
    dispatch( addSpot( spotData ));
    return res;
};


// This thunk creates a new spot 
export const createSpot = ( spot ) => async ( dispatch ) => {
    try {
        // Destructive previewImage out to be added seperately
        const { previewImage, ...spotData } = spot;

        // This creates the spot without the image first to avoid errors
        const res = await csrfFetch( "/api/spots", {
            // POST request to create new spot
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify( spotData )
        })

        const createdSpot = await res.json();
        if ( !res.ok ) return createSpot;

        // Then this will add the prview image to the created spot
        const imageRes = await csrfFetch( `/api/spots/${createdSpot.id}/images`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                url: previewImage,
                preview: true,
            }),
        })

        const imageData = await imageRes.json();

        // This gets the full spot with the image url
        const fullSpot = {
            ...createSpot,
            previewImage: imageData.url,
        }

        // This adds the new spot with the image to the store
        dispatch( addSpot( fullSpot ));
        return fullSpot;
    } catch ( err ) {
        console.error( "Create new spot error:", err );
        throw err;
    }
};


// This thunk updates the spot
export const updateSpot = ( spot ) => async ( dispatch ) => {
    // This is the PUT reuest to update a spot 
    const res = await csrfFetch( `/api/spots/${ spot.id }`, {
        method: "PUT",
        body: JSON.stringify( spot )
    })

    const data = await res.json();

    // This is the dispatch to update the spot in the store
    dispatch( updateSpotAction( data ));
    return data;
};

// And this thunk deletes/removes the spot 
export const deleteSpot = ( spotId ) => async ( dispatch ) => {
    // This is the DELETE request to remove the spot
    const res = await csrfFetch( `/api/spots/${ spotId }`, {
        method: "DELETE"
    })

     // And this is the dispatch to remove the spot from the store
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

        // This adds spots
        case ADD_SPOT: {
            return {
                ...state,
                [ action.payload.id ]: action.payload
            }
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

// Exports for reducer and actions
export default spotsReducer;
export { setSpots, addSpot, updateSpotAction, removeSpot };


