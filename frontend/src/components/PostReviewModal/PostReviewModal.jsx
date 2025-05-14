// frontend/src/components/PostReviewModal/PostReviewModal.jsx

import { useState } from "react";
import { useDispatch /*useSelector*/ } from 'react-redux';
// import { Navigate } from 'react-router-dom';
import { useModal } from "../../context/ModalContext";
// import * as sessionActions from '../../store/session';
import { createReview } from "../../store/reviews";
import './PostReview.css';

// This displays a post review form and handles post review logic
function PostReviewModal({ spotId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    // For the form inputs
    const [ review, setReview ] = useState( "" );
    const [ stars, setStars ] = useState( 0 );
    const [ errors, setErrors ] = useState([]);

    const handleSubmit = async (e) => {
        // Prevents the page reload on a form submit
        e.preventDefault();
        // Clears any previous errors
        setErrors([]);

        // The review payload
        const payload = {
            review, 
            stars,
        }

        return dispatch( createReview( spotId, payload ))
        // closes on successful login
      .then(closeModal)
      .catch(async (res) => {
        // If the login doesnt work it will show errors
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
      
    };

    /*
    // for the username/email
    const [ credential, setCredential ] = useState('');
    // For the user password
    const [ password, setPassword ] = useState('');
    // For displaying the errors
    const [ errors, setErrors ] = useState({});
    const { closeModal } = useModal();
    /*
    

    /*
    // If the user is already logged in it will redirect to the home page
    // if ( sessionUser ) return <Navigate to="/" replace={ true } />;

    // The function that handles the form submissions
    const handleSubmit = async (e) => {
        // Prevents the page reload on a form submit
        e.preventDefault();
        // Clears any previous errors
        setErrors([]);

        return dispatch(sessionActions.login({ credential, password }))
        // closes on successful login
      .then(closeModal)
      .catch(async (res) => {
        // If the login doesnt work it will show errors
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
      
    };
    

    // This renders the login form with any errors
    return (
    <section>
        <h1>Log In</h1>
        <form onSubmit={ handleSubmit }>
            <label>
                Username or Email
                <input
                type="text"
                value={ credential }
                // This updates credential state
                onChange={( e ) => setCredential( e.target.value )}
                // A required field to fill before submitting
                required
                />
            </label>
    
            <label>
                Password
                <input
                type="password"
                value={ password }
                // This updates credential state
                onChange={( e ) => setPassword( e.target.value )}
                // A required field to fill before submitting
                required
                />
            </label>
            
            { /* Error message for invalid credential * }

            { errors.credential && <p>{ errors.credential }</p> }
    
            <button type="submit">Log In</button>

          </form>
        </section>
    );
    */

    // This is the review form
    return (
        <section>
            <h1>How was your stay?</h1>
            <form onSubmit={ handleSubmit }>
                {/*This will show any server errors*/}
                { errors.length > 0 && (
                    <ul>
                        { errors.map(( error, idx ) => (
                            <li key={ idx }>
                                { error }
                            </li>
                        ))}
                    </ul>
                )}
                
                <label>
                    {/*This is for the review text*/}
                    <textarea
                    placeholder="Leave your review here..."
                    value={ review }
                    onChange={( e ) => setReview( e.target.value )}
                    required
                    />
                </label>

                <label>
                    Stars
                    {/*For the stars rating 1-5*/}
                    <input
                    type="number"
                    min={ "1" }
                    max={ "5" }
                    value={ stars }
                    onChange={( e ) => setStars( parseInt( e.target.value ))}
                    required
                    />
                </label>

                {/*Finally this is for the submit button and its not going to work unless review is more than 10 characters and has stars selected*/}
                <button
                type="submit"
                disabled={ review.length < 10 || stars === 0 }
                >
                    Submit Your Review
                </button>
            </form>
        </section>
    )

}

// Exporting the component so it can be used in other files
export default PostReviewModal;