// frontend/src/components/Navigation/ProfileButton.jsx

// This is what displays the profile image and user info

// This allows sending actions to rdux
import { useDispatch } from "react-redux";
// This imports the profile image 
import { FaUserCircle } from 'react-icons/fa';
// This imports the logout action
import * as sessionActions from '../../store/session';
// This is to track the dropdown open and close
import { useState, useEffect, useRef } from "react";

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    // To track if the menu is open or not
    const [ showMenu, setShowMenu ] = useState( false );
    const ulRef = useRef();
  
    // Toggles dropdown
    const toggleMenu = (e) => {
        // Keep click from bubbling up to document and triggering closeMenu
        e.stopPropagation();
        setShowMenu(!showMenu);
    };

    // Closes the dropdown
    useEffect(() => {
        if (!showMenu) return;
    
        const closeMenu = (e) => {
          if (ulRef.current && !ulRef.current.contains(e.target)) {
            setShowMenu(false);
          }
        };
    
        document.addEventListener('click', closeMenu);
    
        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    // This is the logout button to logout a user
    const logout = (e) => {
      e.preventDefault();
      dispatch(sessionActions.logout());
    };

    // This is the to toggel hidden menu
    const ulClassName = 
    "profile-dropdown" + 
    (showMenu ? "" : " hidden");
  
    return (
        // This is the profile button
      <>
        <button onClick={toggleMenu}>
          <FaUserCircle />
        </button>
        <ul className = { ulClassName } ref = { ulRef }>
          <li>{ user.username }</li>
          <li>{ user.firstName } { user.lastName }</li>
          <li>{ user.email }</li>
          <li>
            <button onClick = { logout }>Log Out</button>
          </li>
        </ul>
      </>
      );
}

// Exports Profile for nav
export default ProfileButton;