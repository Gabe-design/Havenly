// frontend/src/components/Navigation/ProfileButton.jsx

// This is what displays the profile image and user info
// Adding manage spots to the profile button

// This allows sending actions to rdux
import { useDispatch } from "react-redux";
// This imports the profile image 
import { FaUserCircle } from 'react-icons/fa';
// This imports the logout action
import * as sessionActions from '../../store/session';
// This is to track the dropdown open and close
import { useState, useEffect, useRef } from "react";
// The link import
import { Link } from 'react-router-dom';
// Imports OpenModalButton
// import OpenModalButton from "../OpenModalButton";
// Imports LoginFormModal
import LoginFormModal from "../LoginFormModal";
// Imports SignupFormModal
import SignupFormModal from "../SignupFormModal";
// Imports OpenModalMenuItem
import OpenModalMenuItem from "./OpenModalMenuItem";

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    // To track if the menu is open or not
    const [ showMenu, setShowMenu ] = useState( false );
    const ulRef = useRef();
  
    // Toggles dropdown
    const toggleMenu = (e) => {
        e.stopPropagation();
        setShowMenu( !showMenu );
    };

    // Closes the dropdown
    useEffect(() => {
        if ( !showMenu ) return;
    
        const closeMenu = ( e ) => {
          if ( !ulRef.current.contains( e.target )) {
            setShowMenu( false );
          }
        };
    
        document.addEventListener( 'click', closeMenu );
    
        return () => document.removeEventListener( 'click', closeMenu );
    }, [ showMenu ]);

    const closeMenu = () => setShowMenu( false );

    // This is the logout button to logout a user
    const logout = ( e ) => {
      e.preventDefault();
      dispatch( sessionActions.logout());
      closeMenu();
    };

    // This is the to toggel hidden menu
    const ulClassName = 
    "profile-dropdown" + 
    (showMenu ? "" : " hidden");
  
    return (
        <>
          <button type="button" onClick={ toggleMenu }>
            <FaUserCircle />
          </button>
          <ul className={ ulClassName } ref={ ulRef }>
            {user ? (
              <>
                <li>{ user.username }</li>
                <li>{ user.firstName } { user.lastName }</li>
                <li>{ user.email }</li>
                <li>
                  {/*The manage spots button*/}
                  <Link to={ "/spots/manage" } onClick={ closeMenu }>
                  Manage Havens
                  </Link>
                </li>
                <li>
                  {/*The logout button*/}
                  <button onClick={ logout }>Log Out</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  {/*The login button*/}
                  <OpenModalMenuItem
                    buttonText="Log In"
                    modalComponent={ <LoginFormModal />}
                    onItemClick={ closeMenu }
                  />
                </li>
                <li>
                  {/*The signup button*/}
                  <OpenModalMenuItem
                    buttonText="Sign Up"
                    modalComponent={ <SignupFormModal />}
                    onItemClick={ closeMenu }
                  />
                </li>
              </>
            )}
          </ul>
        </>
    );
}

// Exports Profile for nav
export default ProfileButton;