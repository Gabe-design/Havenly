// frontend/src/components/Navigation/Navigation.jsx

// This component is what shows the navigation bar at the top

// To create the nav links
import { NavLink } from 'react-router-dom';
// To access and update redux 
import { useSelector, useDispatch } from 'react-redux';
// This is to import actions
import * as sessionActions from '../../store/session'
// A profile button for logged in users
import ProfileButton from './ProfileButton';
// Modal button 
// import OpenModalButton from '../OpenModalButton';
// The LoginFormModal
// import LoginFormModal from '../LoginFormModal';
// The SignupFormModal
// import SignupFormModal from '../SignupFormModal/SignupFormModal';
import './Navigation.css';

// Takes in prop isloaded to make sure the session info is ready
function Navigation({ isLoaded }) {
    // This gets the current user from the redux store
  const sessionUser = useSelector( state => state.session.user );
  
  // sends actions to the redux store

  
  const dispatch = useDispatch();
/*
  // This runs when the logout button is clicked
  const logout = (e) => {
    // This prevents a page reload
    e.preventDefault();
    // This dispatches a logout action to update the state and server
    dispatch(sessionActions.logout());
  }; 
  */

  // This decides what links to show (depends on if a person is logged in or not)
  /*
  const sessionLinks = sessionUser ? (
    // If a person is logged in it will show the profile and logout button
    <>
      <li>
        <ProfileButton user = { sessionUser } />
      </li>
    </>
  ) : (
    // If theres nobody logged in it will show the lingks to log in or sign up
    <>
      <li>
        <OpenModalButton
          buttonText="Log In"
          modalComponent={< LoginFormModal />}
        />
      </li>
      <li>
        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={< SignupFormModal />}
        />
      </li>
    </>
  );
  */

  // This is the demo user login handler
  const handleDemoLogin = ( e ) => {
    // This stops the page from reloading
    e.preventDefault();
    // This dispatches the demo user credentials 
    return dispatch( sessionActions.login({
      credential: 'Demo-lition',
      password: 'password'
    }))
  }

  // This is the layout of the nav bar
  return (
    <nav className='nav-container'>
    
      {/*This is so the logo is on the left side*/}
      <div className='nav-left'>
        
            <NavLink to={ "/" }>
            <img src='/favicon.ico' alt='Logo' className='logo-img'/>
             Havenly
            </NavLink>
      
      </div>
      
      {/*This is so the user actions is on the right side*/}
      <div className='nav-right'>
          {/*This will only show if a user is loggin in*/}
            { sessionUser && (
                <NavLink to={ "/spots/new" }>
                Start Something Havenly
                </NavLink>
            )}

          {/*Alwyas will show if a user is logged in*/}
          {isLoaded && (
          
              <ProfileButton user={sessionUser} />
          
          )}

          {/*This is for the log in demo user and itll only show if nobodys logged in*/}
          {isLoaded && !sessionUser && (
            <button className='demo-login' onClick={ handleDemoLogin }>
              Log In As Demo User
            </button>
          )}
      </div>
  
    </nav>
  );
}

 // Exporting the Nav
export default Navigation;