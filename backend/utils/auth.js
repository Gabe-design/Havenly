// backend/uitls/auth.js

const jwt = require( 'jsonwebtoken' );
const { jwtConfig } = require( '../config' );
const { User } = require( '../db/models' );
// Destructure JWT config for secret key and expiration time
const { secret, expiresIn } = jwtConfig;

// sets a cookie on the response object containing a JWT token
// Token represents the authenticated user and is stored in the broswer
const setTokenCookie = (  res, user ) => {
    // Construct a safe user object with non-sensitive data only
    const safeUser = {
      id: user.id,
      email: user.email,
      username: user.username,
    };
    
    // Create the token with the safe user data
    const token = jwt.sign(
      { data: safeUser },
      secret,
      // set expiration in seconds
      { expiresIn: parseInt( expiresIn ) }
    );

    const isProduction = process.env.NODE_ENV === "production";

    // set the token for potential use in server-side logic
    res.cookie( 'token', token, {
      maxAge: expiresIn * 1000,
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction && "Lax"
    });
    
    // Return the token for potential use in server-side logic
    return token;
  };

// middleware to restore the user ased on the JWT stored in cookie
// If valid, sets req.user to the found user from the database
// If invalid or user deleted, clears the token cookie

  const restoreUser = ( req, res, next ) => {
    const { token } = req.cookies;
    // Default to no user
    req.user = null;

    return jwt.verify( token, secret, null, async ( err, jwtPayload ) => {
      if ( err ) {
        // Token invalid or missing
        return next();
      }
      try {
        // Get user Id from payload and fetch user db
        const { id } = jwtPayload.data;
        req.user = await User.findByPk( id, {
          attributes: {
            // Add additional fields to the user object
            include: [ 'email', 'createdAt', 'updatedAt' ]
          }
        });
      } catch ( e ) {
        // If any error fetching user ( user was deleted ), clear token
        res.clearCookie( 'token' );
        return next();
      }
      // If user not found, ensure token is cleared
      if ( !req.user ) res.clearCookie( 'token' );
      return next();
    });
  };

  //Middleware to protect endpoints that require a logged-in user
  // Ensures req.user exists or responds with a 401 error
  
  const requireAuth = function ( req, _res, next ) {
    // Allow if authenticated 
    if ( req.user ) return next();

    // If not authenticated, return error
    const err = new Error( 'Authentication required' );
    err.title = 'Authentication required';
    err.errors = { message: 'Authentication required' };
    err.status = 401;
    return next( err );
  }

  // Export the utils for use in other files
  module.exports = { setTokenCookie, restoreUser, requireAuth };