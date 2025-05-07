// frontend/src/components/Navigation/Navigation.jsx

// This component is what shows the navigation bar at the top

// To create the nav links
import { NavLink } from 'react-router-dom';
// To access and update redux 
import { useSelector } from 'react-redux';
// A profile button for logged in users
import ProfileButton from './ProfileButton';
// Modal button 
import OpenModalButton from '../OpenModalButton';
// The LoginFormModal
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

// Takes in prop isloaded to make sure the session info is ready
function Navigation({ isLoaded }) {
    // This gets the current user from the redux store
  const sessionUser = useSelector( state => state.session.user );
  // sends actions to the redux store

  /* 
  const dispatch = useDispatch();

  // This runs when the logout button is clicked
  const logout = (e) => {
    // This prevents a page reload
    e.preventDefault();
    // This dispatches a logout action to update the state and server
    dispatch(sessionActions.logout());
  }; 
  */

  // This decides what links to show (depends on if a person is logged in or not)
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
          modalComponent={<LoginFormModal />}
        />
      </li>
      <li>
        <NavLink to = "/signup" >Sign Up</NavLink>
      </li>
    </>
  );
  // This is the layou of the nav bar
  return (
    <ul>
      <li>
        <NavLink to = "/" >Home</NavLink>
      </li>
      { isLoaded && sessionLinks }
    </ul>
  );
}
 // Exporting the Nav
export default Navigation;