// frontend/src/compenents/SpotDetailPage/SpotDetailPage.jsx

// tools 
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// The spot fetching thunk
import { fetchSpotById } from "../../store/spots";
// The review fetching thunk
import { loadReviewsForSpot } from "../../store/reviews";
// The reviews component
import ReviewSection from "../ReviewSection";
//styles 
import './SpotDetail.css'

// This shows the detials for a spot
function SpotDetailPage() {
    const dispatch = useDispatch();
    // gets the spot id
    const { id } = useParams();
    // Gets the spot data
    const spot = useSelector( state => state.spots[ id ]);
    // const user = useSelector( state => state.session.user );

    // These are going to be for the review values that are pulled from the spot object
    const avgRating = spot?.avgRating;
    const numReviews = spot?.numReviews || 0;

    // fetches spot details 
    useEffect(() => {
        dispatch( fetchSpotById( id ));
        dispatch( loadReviewsForSpot( id ));
    }, [ dispatch, id ]);

    // This will show a lodaing message when a spot is fetched
    if (!spot) return <p>Loading Havens Please Wait...</p>;

    // Checks if the current user is the owner of the haven
    // const isOwner = user && spot.Owner && user.id === spot.Owner.id;

    return (
        <div className="spot-detail-container">
            {/*Spot title*/}
            <h1>{ spot.name }</h1>
            
            {/*The spot location*/}
            <p className="spot-location">
                location: { spot.city }, { spot.state }, { spot.country }
            </p>

            {/*The spot image*/}
            <div className="spot-images">
                <img
                className="preview-img"
                src={ spot.previewImage }
                alt={ spot.name }
                />

            </div>

            {/*The host info*/}
            <div className="spot-host">
                Hosted by { spot.Owner?.firstName } { spot.Owner?.lastName }
            </div>

            {/*The description*/}
            <p className="spot-description">
                { spot.description }
            </p>

            {/* Making changes so theres a callout box and it matches the wireframes visually */}

            {/*The callout section with price and acxtion*/}
            <div className="spot-callout-box">
                <div className="price-and-rating">
                    <div className="spot-price">
                        ${ spot.price } night 
                    </div>
                    
                {/* This will be for the review summary */}
                <div className="spot-callout-review-summary">
                    <i className="fa-solid fa-star"/> 
                    { avgRating ? ` ${ avgRating.toFixed( 2 )}` : ' New' }
                    { numReviews > 0 && (
                        <>
                        <span className="dot"> · </span>
                        <span> { numReviews } { numReviews === 1 ? 'Review' : 'Reviews' }</span>
                        </>
                    )}
                </div>
                </div>

                <button onClick={() => alert( "Feature coming soon" )}>
                    Reserve
                </button>
            </div>
            
            {/*This will show the review section*/}
            <ReviewSection spot={ spot }/>
        </div>
    )
}

// Export
export default SpotDetailPage;