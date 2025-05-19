// frontend/src/componnets/CreateSpotPage/CreateSpotPage.jsx

// React tools
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/ModalContext.jsx"
// Thunk action
import { createSpot } from '../../store/spots.js';
// Styles
import './CreateSpot.css'

// This will show the form to create a new spot 
function CreateSpotPage() {
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
    // This is for the four extra image url text inputs that arent required that im adding following the scorecard 
    const [ image1, setImage1 ] = useState( '' );
    const [ image2, setImage2 ] = useState( '' );
    const [ image3, setImage3 ] = useState( '' );
    const [ image4, setImage4 ] = useState( '' );

    // This will have any errors from the backend
    const [ errors, setErrors ] = useState({});
    // This will run when create spot is clicked
    const handleSubmit = async ( e ) => {
        // Stops the page from reloading
        e.preventDefault();
        // debbugging 
        console.log( "Form submitted" );
       // This is for the errors
        const validationErrors = {};
        
        // The required field checks in the form
        if ( !country.trim()) validationErrors.country = "Country is required";
        if ( !address.trim()) validationErrors.address = "Address is required";
        if ( !city.trim()) validationErrors.city = "City is required";
        if ( !state.trim()) validationErrors.state = "State is required";
        if ( !name.trim()) validationErrors.name = "Title is required";
        if ( !description.trim()) { 
            validationErrors.description = "Description is required";

        } else if ( description.length < 30 ) {
            validationErrors.description = "Description must be at least 30 characters";

        }
        if ( !price || isNaN( price ) || Number( price ) <=0 ) {
            validationErrors.price = "Price must be more than 0";
        }

        // Now this is the img url check
        const validImageExtensions = /\.(png|jpg|jpeg)$/i;
        if ( !previewImage.trim()) {
            validationErrors.previewImage = "Preview Image URL is required";

        } else if ( !validImageExtensions.test( previewImage )) {
            validationErrors.previewImage = "Image URL needs to end in .png, .jpg, or .jpeg";
        }

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
            lat: 37.7749,
            lng: -122.4194
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
            {/*I made it in the order of listing a loction like the actual AirBnB app does*/}
            <form onSubmit = { handleSubmit }>
                {/*Im adding this first section to match the scorecard*/}
                <h3>1. Wheres your place located?</h3>
                <p>disclaimer: Guests will only get your exact address once they have booked a reservation.</p>
                {/*Country*/}
                <label>
                    Country
                    <input
                    type="text"
                    value={ country }
                    onChange={( e ) => setCountry( e.target.value )}
                    placeholder="Country"
                    required
                    />
                </label>
                { errors.country && <p className="error"> { errors.country }</p>}

                {/*Address*/}
                <label>
                    Street Address
                    <input
                    type="text"
                    value={ address }
                    onChange={( e ) => setAddress( e.target.value )}
                    placeholder="Street Address"
                    required
                    />
                </label>
                { errors.address && <p className="error"> { errors.address }</p>}

                {/*City*/}
                <label>
                    City
                    <input
                    type="text"
                    value={ city }
                    onChange={( e ) => setCity( e.target.value )}
                    placeholder="City"
                    required
                    />
                </label>
                { errors.city && <p className="error"> { errors.city }</p>}

                {/*State*/}
                <label>
                    State
                    <input
                    type="text"
                    value={ state }
                    onChange={( e ) => setState( e.target.value )}
                    placeholder="State"
                    required
                    />
                </label>
                { errors.state && <p className="error"> { errors.state }</p>}

                {/*Im adding this second section to match the scorecard*/}
                <h3>2. Liven up your haven with photos!</h3>
                <p>Submit a link to at least one photo to publish your haven.</p>

                {/*Preview img*/}
                <label>
                    {/*Preview Image URL*/}
                    <input
                    type="text"
                    value={ previewImage }
                    onChange={( e ) => setPreviewImage( e.target.value )}
                    placeholder="preview image URL"
                    required
                    />
                </label>
                {/* This is for the four extra image url text inputs that arent required that im adding following the scorecard */ }
                { errors.previewImage && <p className="error"> { errors.previewImage }</p>}
                <label>
                    <input
                    type="text"
                    value={ image1 } 
                    onChange={( e ) => setImage1( e.target.value )} 
                    placeholder="image URL"
                    />
                </label>
                <label>
                    <input
                    type="text"
                    value={ image2 } 
                    onChange={( e ) => setImage2( e.target.value )} 
                    placeholder="image URL"
                    />
                </label>
                <label>
                    <input
                    type="text"
                    value={ image3 } 
                    onChange={( e ) => setImage3( e.target.value )} 
                    placeholder="image URL"
                    />
                </label>
                <label>
                    <input
                    type="text"
                    value={ image4 } 
                    onChange={( e ) => setImage4( e.target.value )} 
                    placeholder="image URL"
                    />
                </label>
                {/*Im adding this third section to match the scorecard*/}
                <h3>3. Create a title for your Haven!</h3>
                <p>Catch guests attention with a spot title that highlights what makes your place special.</p>

                {/*Title*/}
                <label>
                    {/*Title*/}
                    <input
                    type="text"
                    value={ name }
                    onChange={( e ) => setName( e.target.value )}
                    placeholder="name your haven"
                    required
                    />
                </label>
                { errors.name && <p className="error"> { errors.name }</p>}

                {/*Im adding this fourth section to match the scorecard*/}
                <h3>4. Describe your place to guests!</h3>
                <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the nieghborhood.</p>

                {/*Description*/}
                <label>
                   {/*Description*/}
                    <textarea
                    value={ description }
                    onChange={( e ) => setDescription( e.target.value )}
                    placeholder="please write at least 30 characters"
                    required
                    />
                </label>
                { errors.description && <p className="error"> { errors.description }</p>}

                {/*Im adding this fifth and final section to match the scorecard*/}
                <h3>5. Set a base price for your haven!</h3>
                <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>

                {/*Price*/}
                <label>
                    {/*Price Per Night - USD*/}
                    <input
                    type="text"
                    value={ price }
                    onChange={( e) => setPrice( e.target.value )}
                    placeholder = "set your price (USD)"
                    required
                    />
                </label>
                { errors.price && <p className="error"> { errors.price }</p>}

                {/*Submit button*/}
                <button type="submit">Make It Havenly</button>
            </form>
        </section>


    )
}


// Export
export default CreateSpotPage;