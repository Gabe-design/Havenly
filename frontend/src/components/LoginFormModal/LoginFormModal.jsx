// frontend/src/components/LoginFormModal/LoginFormModal.jsx

import { useState } from "react";
import { useDispatch /*useSelector*/ } from 'react-redux';
// import { Navigate } from 'react-router-dom';
import { useModal } from "../../context/ModalContext";
import * as sessionActions from '../../store/session';
import './LoginForm.css';

// This displays a login form and handles login logic
function LoginFormModal() {
    const dispatch = useDispatch();

    // This will pull the current session user from the redux store
    // const sessionUser = useSelector(( state ) => state.session.user);

    // The local state to keep track of form inputs

    // for the username/email
    const [ credential, setCredential ] = useState('');
    // For the user password
    const [ password, setPassword ] = useState('');
    // For displaying the errors
    const [ errors, setErrors ] = useState({});
    const { closeModal } = useModal();

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
      })
    };

    // This is for logging in the demo user with the button
    const handleDemoLogin = async ( e ) => {
      // This stops the page from reloading
      e.preventDefault();
      // This is so the login uses the demo user credentials
      return dispatch( sessionActions.login({ 
        credential: 'Demo-lition', 
        password: 'password' 
      }))
      // This will close the modal on a login
      .then( closeModal )
      .catch( async ( res ) => {
        // So if the login fails itll show the errors
        const data = await res.json();
        if ( data && data.errors ) {
          setErrors( data.errors );
        }
      })
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
            
            { /* Error message for invalid credential */ }

            { errors.credential && <p>{ errors.credential }</p> }
    
            <button type="submit">
              Log In
              </button>
            <button onClick={ handleDemoLogin }>
              Log In As Demo User
            </button>

          </form>
        </section>
    );
}

// Exporting the component so it can be used in other files
export default LoginFormModal;