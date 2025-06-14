// frontend/src/store/reviews.js

import { csrfFetch } from "./csrf";
// import spotsReducer from "./spots";

// These are the action types

// This sets all reviews 
const SET_REVIEWS = 'spots/setReviews';
// This adds a new review
const ADD_REVIEW = 'reviews/addReview';
// This updates a spot
//const UPDATE_SPOT = 'spots/updateSpot';
// This removes a review
const REMOVE_REVIEW = 'reviews/removeReview';

// These are the action creators

// This sets already existing reviews from backend
const setReviews = ( reviews ) => ({
    type: SET_REVIEWS,
    payload: reviews
});

// This adds a new spot
const addReview = ( review ) => {
    return {
        type: ADD_REVIEW,
        payload: review
    }
};

// This removes a spot by its ID
const removeReview = ( reviewId ) => {
    return {
        type: REMOVE_REVIEW,
        payload: reviewId
    }
};


// Creating the thunk actions

// This thunk will get the current users reviews
export const loadCurrentUserReviews = () => async ( dispatch ) => {
    // This is the GET request that fetches the current user reveiws
    const res = await csrfFetch( '/api/reviews/current' );
    const data = await res.json();

    // This is to normalize reviews into an object keyed by id
    const reviews = {};
    data.Reviews.forEach(( review ) => {
        reviews[ review.id ] = review;
    })

    // This is the dispatch to store the reviews
    dispatch( setReviews( reviews ));
    return res;
}

// This thunk fetches a review by the spot ID
export const loadReviewsForSpot = ( spotId ) => async ( dispatch ) => {
    // This is the GET that fetches the reviews for a specefic spot
    const res = await csrfFetch( `/api/spots/${ spotId }/reviews` );
    const data = await res.json();

    // This is to normalize the reviews
    const reviews = {};
    data.Reviews.forEach( review => {
        reviews[ review.id ] = review;
    })

    // This is the dispatch to store
    dispatch( setReviews( reviews ));

};

// This thunk creates a new review 
export const createReview = ( spotId, reviewData ) => async ( dispatch ) => {
    // This is the POST request that creates a review
    const res = await csrfFetch( `/api/spots/${ spotId }/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( reviewData )
    })

    const data = await res.json();
    // This is dispatch adds to the store
    dispatch( addReview( data ));
    return data;
};

// This thunk updates the review
export const updateReview = ( reviewId, reviewData ) => async ( dispatch ) => {
    // This is the PUT request that updates the review
    const res = await csrfFetch( `/api/reviews/${ reviewId }`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( reviewData )
    })

    const data = await res.json();
    // This is the dispatch that updates the store
    dispatch( addReview( data ));
    return data;
};

// And this thunk deletes/removes the review 
export const deleteReview = ( reviewId ) => async ( dispatch ) => {
    // This is the DELETE request that removes a review
    const res = await csrfFetch( `/api/reviews/${ reviewId }`, {
        method: "DELETE"
    })

    // This dispatch removes the review from the store
    dispatch( removeReview( reviewId ));
    return res;
}


// This is the initial state, its what the store will start with 
const initialState = {};

// These is the reducer function, decides how the store changes by the actions
const reviewReducer = ( state = initialState, action ) => {
    switch ( action.type ) {

        // This sets already existing reviews from backend
        case SET_REVIEWS: {
            return { ...action.payload };
        }

        // This adds a review
        case ADD_REVIEW: {
            return {
                ...state,
                [ action.payload.id ]: action.payload
            }
        }
        
        // This removes a review
        case REMOVE_REVIEW: {
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
export default reviewReducer;
export { setReviews, addReview, removeReview };


