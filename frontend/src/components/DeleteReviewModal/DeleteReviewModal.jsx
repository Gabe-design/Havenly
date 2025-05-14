// frontend/src/components/DeleteReviewModals/DeleteReviewModals.jsx

// import { useState } from "react";
import { useDispatch /*useSelector*/ } from 'react-redux';
// import { Navigate } from 'react-router-dom';
import { useModal } from "../../context/ModalContext";
// import * as sessionActions from '../../store/session';
import { deleteReview } from "../../store/reviews";
// Styles
import "./DeleteReview.css"

// This displays a delete review form and handles delete review logic
function DeleteReviewModal({ reviewId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
   


    // This will run when the user does delete
    const handleDelete = async ( e ) => {
        e.preventDefault();
        return dispatch( deleteReview( reviewId ))
        .then( closeModal );
    };


    /*
    // for the username/email
    const [ credential, setCredential ] = useState('');
    // For the user password
    const [ password, setPassword ] = useState('');
    // For displaying the errors
    const [ errors, setErrors ] = useState({});
    const { closeModal } = useModal();
    */

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

    return (
        <section>
            <h1>Confirm Delete</h1>
            <p> Are you sure you want to remove review?</p>
             <button onClick={ handleDelete } className="confirm-delete">
                Yes ( Delete Review )
            </button>
            <button onClick={ closeModal } className="cancel-delete">
                No ( Keep Review )
            </button>
        </section>
    )
}

// Exporting the component so it can be used in other files
export default DeleteReviewModal;