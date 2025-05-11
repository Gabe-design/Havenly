// frontend/src/compenents/ManageSpotsForm/ManageSpotsForm.jsx

//Tools
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Links to edit or detail page 
import { Link, useNavigate } from "react-router-dom";
// This is the thunk to get current user spots
import { fetchUserSpots } from "../../store/spots";
import './ManageSpots.css'
import OpenModalButton from "../OpenModalButton";
import DeleteSpotModal from "../DeleteSpotModal/DeleteSpotModal";

// To show the spots owned by the current user
function ManageSpotsForm() {
    const dispatch = useDispatch();
    const nav = useNavigate();
    // Pulls the spots from the store
    const spots = useSelector( state => state.spots );
    const spotArr = spots ? Object.values( spots ) : [];
    // This will load the users spots
    useEffect(() => {
        dispatch(fetchUserSpots());
    }, [ dispatch ]);

    return (
        <section className="manage-spots-container">
            <h1>Manage Spots</h1>

            {/*Gonna add a message if there is not spots*/}
            { spotArr.length === 0 && (
                <div>
                    <p>You dont have any spots yet - ready to list your first Haven? Click below to get started!</p>
                    <button onClick={() => nav( `/spots/new` )}>
                        Start Something Havenly.
                    </button>
                </div>
            )}

            {/*If theres no spots*/}
            { spotArr.map( spot => (
                <div key={ spot.id } className="spot-tile">
                    <Link to={ `/spots/${ spot.id }` } className="spot-link">
                    <img src={ spot.previewImage } alt={ spot.name }/>
                    <div>
                        <div>
                            { spot.city }, { spot.state }
                        </div>
                        <div>
                            { spot.name }
                        </div>
                        <div>
                            ${ spot.price } night
                        </div>
                    </div>
                    </Link>

                    {/*The update button*/}
                    <button onClick={() => nav( `/spots/${ spot.id }/edit` )}>
                        Update
                    </button>

                    {/*The delete button*/}
                    <OpenModalButton
                    buttonText="Delete"
                    modalComponent={<DeleteSpotModal spotId={ spot.id } />}
                    />
                </div>
            ))}
        </section>
    )

}

// Export
export default ManageSpotsForm;