// frontend/src/App.jsx

//import React from "react";

// Importing the login form page component
import LoginFormPage from './components/LoginFormPage';
// Importing routign tools from the react router
import {
  createBrowserRouter,
  RouterProvider,
  //Route,
} 
from "react-router-dom";

// Creating a home component to show on the root path
const Home = () => <h1>Welcome!</h1>;
// Sets up the application routes
const router = createBrowserRouter([
  {
    // This is the main homepage route
    path: "/",
    // This will show Welcome!
    element: <Home/>  
  },
  {
    // This is the login route
    path: "/login",
    // This will show the login form
    element: <LoginFormPage/>
  }
]);

// This is the main app component taht provides the routing context
function App() {
  // This renders based on the current route
  return <RouterProvider router = { router } />;
}

// This exports the app so it can be used in the main.jsx
export default App;
