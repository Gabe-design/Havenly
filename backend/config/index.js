// backend/config/index.js

// Contains db configs 
module.exports = {
  // Current environment mode
  environment: process.env.NODE_ENV || 'development', 
  // Port the server will listen on
  port: process.env.PORT || 8000, 
  // Path to the SQLite database file
  dbFile: process.env.DB_FILE || './db/dev.db', 
  jwtConfig: {
    // Secret key for signing JWTs
    secret: process.env.JWT_SECRET, 
    // Expiration time for JWT tokens
    expiresIn: process.env.JWT_EXPIRES_IN 
  }
};
