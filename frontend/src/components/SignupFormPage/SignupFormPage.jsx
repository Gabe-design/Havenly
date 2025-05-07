// frontend/src/components/SignupFormPage/SignupFormPage.jsx

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormPage() {
    const dispatch = useDispatch();

    // This gets the current user from the redux store ( if the user is logged in, it will redirect )
    const sessionUser = useSelector(( state ) => state.session.user );

    // To track the values typed into each input 
    const [ email, setEmail ] = useState( "" );
    const [ username, setUsername ] = useState( "" );
    const [ firstName, setFirstName ] = useState( "" );
    const [ lastName, setLastName ] = useState( "" );
    const [ password, setPassword ] = useState( "" );
    const [ confirmPassword, setConfirmPassword ] = useState( "" );

    // This state holds any validations or error messages
    const [ errors, setErrors ] = useState({});

    // If the user is already logged in, it will redirect them to the home page
    if ( sessionUser ) return <Navigate to = "/" replace = { true } />;

    // When the form is submitted this will handle the logic
    const handleSubmit = (e) => {
        // This prevents the default form submission behavior
        e.preventDefault();

        // This confirms that both password fields match
        if (password === confirmPassword) {
            // This clears the previous errors
            setErrors({});

            // Dispatchs the signup action with the form data
            return dispatch(
                sessionActions.signup({ email, username, firstName, lastName, password })
            ).catch(async (res) => { 
                // If the signup fails it will try to get and show error messages
                const data = await res.json();
                if ( data?.errors ) setErrors( data.errors );
            });
        }

        // If the passwords dont match it will show this error message
        return setErrors({
            confirmPassword: "Confirm Password field must match Password."
        });
    };

    return (
        <>
      <h1>Sign Up</h1>
      <form onSubmit = {handleSubmit }>
        { /* Email Input Field */ }
        <label>
          Email
          <input
            type = "text"
            value = { email }
            onChange = {( e ) => setEmail( e.target.value )}
            required
          />
        </label>
        { errors.email && <p>{ errors.email }</p>}

        { /* Username Input Field */ }
        <label>
          Username
          <input
            type = "text"
            value = { username }
            onChange = {( e ) => setUsername( e.target.value )}
            required
          />
        </label>
        { errors.username && <p>{ errors.username }</p>}

        { /* First Name Input Field */ }
        <label>
          First Name
          <input
            type = "text"
            value = { firstName }
            onChange = {( e ) => setFirstName( e.target.value )}
            required
          />
        </label>
        { errors.firstName && <p>{ errors.firstName }</p>}

        { /* Last Name Input Field */ }
        <label>
          Last Name
          <input
            type = "text"
            value = { lastName }
            onChange = {( e ) => setLastName( e.target.value )}
            required
          />
        </label>
        { errors.lastName && <p>{ errors.lastName }</p>}

        { /* Password Input Field */ }
        <label>
          Password
          <input
            type = "password"
            value = { password }
            onChange = {( e ) => setPassword ( e.target.value )}
            required
          />
        </label>
        { errors.password && <p>{ errors.password }</p>}

        { /* Confirm Password Input Field */ }
        <label>
          Confirm Password
          <input
            type = "password"
            value = { confirmPassword }
            onChange = {( e ) => setConfirmPassword( e.target.value )}
            required
          />
        </label>
        { errors.confirmPassword && <p>{ errors.confirmPassword }</p>}

        { /* Submit Button - submits the form to trigger signup */ }
        <button type = "submit">Sign Up</button>
      </form>
    </>
    );
}

export default SignupFormPage;