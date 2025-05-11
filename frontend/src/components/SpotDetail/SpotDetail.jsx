// frontend/src/compenents/SpotDetail/SpotDetail.jsx

// tools 
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// The spot fetching thunk
import { fetchSpotById } from "../../store/spots";
//styles 
import './SpotDetail.css'

// This shows the detials for a spot
function SpotDetail() {
    const dispatch = useDispatch();
    // gets the spot id
    const { id } = useParams();
    // Gets the spot data
    const spot = useSelector( state => state.spots[ id ]);
    const user = useSelector( state => state.session.user );
    const reviews = spot?.reviews || [];
    // fetches spot details 
    useEffect(() => {
        dispatch( fetchSpotById( id ));
    }, [ dispatch, id ]);

    // This will show a lodaing message when a spot is fetched
    if (!spot) return <p>Loading...Loading...</p>;

    return (
        <div className="spot-detail-container">
            {/*Spot title*/}
            <h1>{ spot.name }</h1>
            
            {/*The spot location*/}
            <p className="spot-location">
                location: { spot.city }, { spot.state }, { spot.country }
            </p>

            {/* The rating and reviews count */}
            <div className="spot-rating-summary">
                <i className="fa fa-star" />
                { spot.avgRating ? spot.avgRating.toFixed( 1 ) : 'New' } Star Rating - { reviews.length } review{ reviews.length !== 1 ? 's' : '' }
            </div>

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

            {/*The callout section with price and acxtion*/}
            <div className="spot-callout-box">
                <div className="spot-price">
                    ${ spot.price } night 
                </div>
                <button onClick={() => alert( "Feature coming soon" )}>
                    Reserve
                </button>
            </div>

            {/* The review button for logged in people*/}
            { user && (
                <button className="post-review-button">
                    Post Your Review
                </button>
            )}

            {/*This will be for the luist of reviews*/}
            <div className="spot-reviews">
                { reviews.map( review => (
                    <div key={ review.id } className="review-item">
                        <div className="review-header">
                            <strong>{ review.User?.firstName }</strong>
                            <span className="review-date">
                                { new Date( review.createdAt ).toLocaleDateString( undefined, { month: 'long', year: 'numeric' })}
                            </span>
                        </div>
                        <p className="review-text">{ review.review }</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

// export
export default SpotDetail;