// frontend/src/App.jsx

//import React from "react";

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from './store/session';
// Importing modal button 
// import OpenModalButton from './components/OpenModalButton';
// Importing the Nav
import Navigation from './components/Navigation';
// Importing the signup form page component
import SignupFormPage from './components/SignupFormPage';
// Importing the login form page component
// import LoginFormModal from './components/LoginFormModal';
// Importing routign tools from the react router
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
  //Route,
} 
from "react-router-dom";

// Creating a home component to show on the root path
const Home = () => <h1>Welcome!</h1>;

// The layout component ensures user is restored before rendering 
function Layout() {
  const dispatch = useDispatch();
  // This tracks if session restore is done
  const [ isLoaded, setIsLoaded ] = useState( false );

  useEffect(() => {
    // This runs once on mount
    dispatch( sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [ dispatch ]);

  return (
    <>
      < Navigation isLoaded = { isLoaded } /> 
      { isLoaded && <Outlet /> } {/* Only show content when user is restored */}
    </>
  );
}

// This sets up the application routes
const router = createBrowserRouter([
  {
    // This is the root layout that handles user restoration
    element: <Layout />,
    children: [
      {
        // This is the main homepage route
        path: '/',
        // This will show Welcome!
        element: <Home />
      },
      {
        // This is the signup route
        path: '/signup',
        // This will show the signup form
        element: <SignupFormPage />
      }
    ]
  }
]);

// This is the main app component taht provides the routing context
function App() {
  // This renders based on the current route
  return <RouterProvider router = { router } />;
}

// This exports the app so it can be used in the main.jsx
export default App;
