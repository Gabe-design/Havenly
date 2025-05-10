// backend/app.js

// Import the Express framework
const express = require('express');
// Automatically catches errors in async route handlers
require('express-async-errors');
// HTTP request logger middleware for development
const morgan = require('morgan');
// Middleware for handling cross origin requests (used only in dev)
const cors = require('cors');
// Middleware for CSRF token protection
const csurf = require('csurf');
// Middleware for setting secure HTTP headers
const helmet = require('helmet');
// Parses cookies attached to client requests
const cookieParser = require('cookie-parser');
// Sequelize specific error handler for validation errors
const { ValidationError } = require('sequelize');
// Load environment variables from config file
const { environment } = require('./config');
// Boolean check if app is running in production
const isProduction = environment === 'production';
// Create a new express application
const app = express();
// Import all route handlers
const routes = require('./routes');

// Logging HTTP requests to the console
app.use(morgan('dev'));

// Parse cookies from the request
app.use(cookieParser());

// Parse incoming JSON requests into req.body
app.use(express.json());

// Enable CORS only in development environment
if (!isProduction) {
  app.use(cors());
}

// Set security headers using Helmet
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
  })
);

// Set up CSRF protection middleware
app.use(
  csurf({
    cookie: {
      // Use secure cookies in production
      secure: isProduction,
      // Restrict cross-site usage
      sameSite: isProduction && "Lax",
      // Prevent access from client-side JavaScript
      httpOnly: true
    }
  })
);


// Connect API routes after middleware setup
app.use(routes);

// Catch-all handler for unrecognized routes (404 Not Found)
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});

// Handle Sequelize validation errors and format them
app.use((err, _req, _res, next) => {
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
    err.title = 'Validation error';
  }
  next(err);
});

// General error handler for formatting all errors consistently
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  // Log error stack for debugging
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    // Hide stack trace in production
    stack: isProduction ? null : err.stack 
  });
});

module.exports = app;
