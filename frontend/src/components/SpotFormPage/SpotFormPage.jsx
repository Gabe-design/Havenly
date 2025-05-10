// frontend/src/componnets/SpotFormPage/SpotFormPage.jsx

// React tools
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/ModalContext.jsx"
// Thunk action
import { createSpot } from '../../store/spots.js';
// Styles
import './SpotForm.css'

// This will show the form to create a new spot 
function SpotFormPage() {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const { closeModal } = useModal();

    // These are to track whats typed
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
            description, 
            name, 
            price, 
            previewImage,
        }

        try {
            // Creates a new spot
            const data = await dispatch( createSpot( newSpot));
            // This is if there is any validation errros it will show them
            if ( data?.errors ) {
                setErrors( data.errors );
            } else {
                closeModal();
                // This is if the create spot works, it will take the user to the new spots details
                nav( `/spots/${ data.id }` );

            }
        } catch ( err ) {
            console.error( err );
        }

    }

    return (
        <section>
            <h1>List Your Haven</h1>

            {/*This is the form users fill for a new spot*/}
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
                    placeholder="Describe Your Heaven"
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
export default SpotFormPage;