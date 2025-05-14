// frontend/src/compenents/ManageSpotsForm/ManageSpotsForm.jsx

//Tools
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Links to edit or detail page 
import { useNavigate } from "react-router-dom";
// This is the thunk to get current user spots
import { fetchUserSpots } from "../../store/spots";
import './ManageSpots.css'
import OpenModalButton from "../OpenModalButton";
import DeleteSpotModal from "../DeleteSpotModal";

// To show the spots owned by the current user
function ManageSpotsForm() {
    const dispatch = useDispatch();
    const nav = useNavigate();
    // Pulls the spots from the store
    const spots = useSelector( state => state.spots );
    const userSpots = spots ? Object.values( spots ) : [];

    // I want to add this is the tooltip state for better design to match woth the landing page
    const [ tooltip, setToolTip ] = useState({
        text: '',
        x: 0,
        y: 0,
        visible: false
    })

    // This will load the users spots
    useEffect(() => {
        dispatch(fetchUserSpots());
    }, [ dispatch ]);

    // I also wnat it to show this loading state if nothing loaded yet
    if ( !spots ) return <div>Loaing Havens Please Wait...</div>;

    return (
        <section className="manage-spots-container">
            <h1>Manage Havens</h1>

            {/*Gonna add a message if there is not spots*/}
            { userSpots.length === 0 && (
                <div className="no-spots-message">
                    <p>
                        You dont have any spots yet - ready to list your first Haven? Click below to get started!
                    </p>
                    <button onClick={() => nav( `/spots/new` )}>
                        Start Something Havenly.
                    </button>
                </div>
            )}

            {/*If theres no spots*/}
            <div className="spot-list-container">
                { userSpots.map( spot => (
                    <div
                    key={ spot.id }
                    className="spot-tile"
                    data-name={ spot.name }
                    onMouseEnter={ ( e ) => setToolTip({
                        text: spot.name,
                        x: e.clientX,
                        y: e.clientY,
                        visible: true
                    })}
                    onMouseMove={ (e ) => setToolTip( prev => ({
                        ...prev,
                        x: e.clientX,
                        y: e.clientY,
                    }))}
                    onMouseLeave={ () => setToolTip( prev => ({
                        ...prev,
                        visible: false
                    }))}
                    >
                        <div className="spot-img-wrapper">
                            <img src={ spot.previewImage } alt={ spot.name || "Spot preveiw" } />

                        </div>
                        <div className="spot-tile-text">
                            <div className="spot-location">
                                { spot.city }, { spot.state }
                            </div>
                            <div className="spot-name">
                                { spot.name }
                            </div>
                            <div className="spot-price">
                                ${ spot.price } <span>night</span>
                            </div>
                            <div className="spot-rating">
                                <i className="fa fa-star"/>
                                { spot.avgRating ? `${ spot.avgRating.toFixed(1)}` : 'New' }
                            </div>
                        </div>

                        {/*The update button*/}
                        <div className="spot-actions">
                            <button onClick={() => nav( `/spots/${ spot.id }/edit` )}>
                                Update
                            </button>
                            
                            {/*The delete button*/}
                            <OpenModalButton
                            buttonText="Delete"
                            modalComponent={<DeleteSpotModal spotId={ spot.id } />}
                            />
                    </div>
                </div>
            ))}
            </div>

            {/* Adding this beacuse I want the tooltip so its a better design and matching lading page*/}
            { tooltip.visible && (
                <div 
                className="floating-tooltip" 
                style={{ 
                    top: tooltip.y, 
                    left: tooltip.x 
                }}
                >
                    { tooltip.text }
                </div>
            )}
        </section>
    )

}

// Export
export default ManageSpotsForm;