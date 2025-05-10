// frontend/src/components/UpdateSpotForm/UpdateSpotForm.jsx

// Tools
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

// The thunks
import { updateSpot, fetchSpotById } from "../../store/spots.js"
// Styles 
import "./UpdateSpot.css";

function UpdateSpotForm() {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const { id } = useParams();

    // This is gonna pull the current user data
    const spot = useSelector( state => state.spots[ id ]);

    // Will prefill the form inputs
    const [ country, setCountry ] = useState( '' );
    const [ address, setAddress ] = useState( '' );
    const [ city, setCity ] = useState( '' );
    const [ state, setState ] = useState( '' );
    const [ description, setDescription ] = useState( '' );
    const [ name, setName ] = useState( '' );
    const [ price, setPrice ] = useState( '' );
    const [ previewImage, setPreviewImage ] = useState( '' );

    // This will have any errors from the backend
    const [ errors, setErrors ] = useState({});

    // This will load the spot data if its not in the store yet
    useEffect(() => {
        if ( !spot ) dispatch( fetchSpotById( id ));
    }, [ dispatch, id, spot, ]);

    // This will set the fields wiht existing values when the spot is loaded
    useEffect(() => {
        if ( spot ) {
            setCountry( spot.country || '' );
            setAddress( spot.address || '' );
            setCity( spot.city || '' );
            setState( spot.state || '' );
            setDescription( spot.description || '' );
            setName( spot.name || '' );
            setPrice( spot.price || '' );
            setPreviewImage( spot.previewImage || '' );
        }
    }, [ spot ]);

    // This will run when create spot is clicked
    const handleSubmit = async ( e ) => {
        // Stops the page from reloading
        e.preventDefault();
        // This resets errrors
        setErrors({});

        // Going to add validation errors for better design
        const validationErrors = {};
        if ( description.length < 30 ) validationErrors.description = "Description must be at least 30 characters."
        if ( isNaN( price ) || Number( price ) <= 0 ) validationErrors.price = "Price must be more than 0."
        // and if any errors exist, it will set them and stop the form from submitting
        if ( Object.keys( validationErrors ).length ) {
            setErrors( validationErrors );
            return;
        }


        // This gets all the values from the form into an object
        const newSpot = {
            country,
            address, 
            city, 
            state,
            previewImage,
            name,
            description,  
            price
        }

        try {
            // Creates a new spot
            const res = await dispatch( updateSpot( ...newSpot, id ));
            const data = await res.json();
            // This is if there is any validation errros it will show them
            if ( data?.errors ) {
                setErrors( data.errors );
            } else {
                
                // This is if the create spot works, it will take the user to the new spots details
                nav( `/spots/${ data.id }` );

            }
        } catch ( err ) {
            console.error( err );
        }

    }

    // While the spot is loading, want it to say Loading Haven
    if ( !spot ) return <p>Loading Haven...</p>;

    return (
        <section>
            <h1>Update Your Haven</h1>

            {/*This is the form users fill to update a spot*/}
            <form onSubmit = { handleSubmit }>

                {/*Country*/}
                <label>
                    Country
                    <input
                    type="text"
                    value={ country }
                    onChange={( e ) => setCountry( e.target.value )}
                    required
                    />
                </label>
                { errors.country && <p> { errors.country }</p>}

                {/*Address*/}
                <label>
                    Street Address
                    <input
                    type="text"
                    value={ address }
                    onChange={( e ) => setAddress( e.target.value )}
                    required
                    />
                </label>
                { errors.address && <p> { errors.address }</p>}

                {/*City*/}
                <label>
                    City
                    <input
                    type="text"
                    value={ city }
                    onChange={( e ) => setCity( e.target.value )}
                    required
                    />
                </label>
                { errors.city && <p> { errors.city }</p>}

                {/*State*/}
                <label>
                    State
                    <input
                    type="text"
                    value={ state }
                    onChange={( e ) => setState( e.target.value )}
                    required
                    />
                </label>
                { errors.state && <p> { errors.state }</p>}

                {/*Preview img*/}
                <label>
                    Preview Image URL
                    <input
                    type="text"
                    value={ previewImage }
                    onChange={( e ) => setPreviewImage( e.target.value )}
                    placeholder="Preview Image URL"
                    required
                    />
                </label>
                { errors.previewImage && <p> { errors.previewImage }</p>}

                {/*Title*/}
                <label>
                    Title
                    <input
                    type="text"
                    value={ name }
                    onChange={( e ) => setName( e.target.value )}
                    placeholder="Name Your Haven"
                    required
                    />
                </label>
                { errors.name && <p> { errors.name }</p>}

                {/*Description*/}
                <label>
                    Description
                    <textarea
                    value={ description }
                    onChange={( e ) => setDescription( e.target.value )}
                    placeholder="Describe Your Updated Heaven"
                    required
                    />
                </label>
                { errors.description && <p> { errors.description }</p>}

                {/*Price*/}
                <label>
                    Price Per Night - USD
                    <input
                    type="text"
                    value={ price }
                    onChange={( e) => setPrice( e.target.value )}
                    placeholder = "Set Your Price"
                    required
                    />
                </label>
                { errors.price && <p> { errors.price }</p>}

                {/*Submit button*/}
                <button type="submit">Make It Havenly</button>
                </form>
                </section>


    )
}


// Export
export default UpdateSpotForm;