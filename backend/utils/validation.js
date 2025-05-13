// backend/utils/validation.js

// Import validationResult to gather any validation errors
const { validationResult } = require( 'express-validator' );

// Middleware to handle validation errors from express-validator
// Checks if request has validation errors
// If errors exist, it formats and returns a structured 400 error response
// If no errors, it continues to next middleware or route

const handleValidationErrors = ( req, _res, next ) => {
  // Extract validation errors from request
  const validationErrors = validationResult( req );

  // If there are errors, convert them into an object with field as key and message as value
  if ( !validationErrors.isEmpty()) {
    const errors = {};
    validationErrors.array().forEach( error => {
      errors[ error.path ] = error.msg;
    });

    // Create error object and pass to error-handling middleware
    const err = Error( "Bad request." );
     // Add errors object to error
    err.errors = errors;
     // Set status code to 400 ( Bad Request )
    err.status = 400;
    err.title = "Bad request.";
    // Pass error to Express error handler
    return next( err );
  }

  // If no validation errors, move to the next middleware/route handler
  next();
};

// Export middleware so it can be reused across routes
module.exports = {
  handleValidationErrors
};
