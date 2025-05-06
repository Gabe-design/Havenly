// frontend/src/components/LoginFormPage/LoginFormPage.jsx

import /*React,*/ { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import * as sessionActions from '../../store/session';

// This displays a login form and handles login logic
function LoginFormPage() {
    const dispatch = useDispatch();

    // This will pull the current session user from the redux store
    const sessionUser = useSelector(( state ) => state.session.user);

    // The local state to keep track of form inputs

    // for the username/email
    const [ credential, setCredential ] = useState('');
    // For the user password
    const [ password, setPassword ] = useState('');
    // For displaying the errors
    const [ errors, setErrors ] = useState({});

    // If the user is already logged in it will redirect to the home page
    if ( sessionUser ) return <Navigate to="/" replace={ true } />;

    // The function that handles the form submissions
    const handleSubmit = async (e) => {
        // Prevents the page reload on a form submit
        e.preventDefault();
        // Clears any previous errors
        setErrors([]);

        // This is the dispatch login thunk with form credentials
        return dispatch( sessionActions.login({ credential, password })).catch(
            async ( res ) => {
                const data = await res.json();
                if ( data?.errors) setErrors( data.errors );
            }
        )
    };

    // This renders the login form with any errors
    return (
    <section>
        <h1>Log In</h1>
        <form onSubmit = { handleSubmit }>
            <label>
                Username or Email
                <input
                type = "text"
                value = { credential }
                onChange = {( e ) => setCredential( e.target.value )}
                required
                />
            </label>
    
            <label>
                Password
                <input
                type = "password"
                value = { password }
                onChange={( e ) => setPassword( e.target.value )}
                required
                />
            </label>
            
            { /* Error message for invalid credential */ }

            { errors.credential && <p>{ errors.credential }</p> }
    
            <button type = "submit">Log In</button>

          </form>
        </section>
    );
}

// Exporting the component so it can be used in other files
export default LoginFormPage;