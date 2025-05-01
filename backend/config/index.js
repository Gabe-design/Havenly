// backend/config/index.js
// contains db configs 

module.exports = {
  environment: process.env.NODE_ENV || 'development', // Current environment mode
  port: process.env.PORT || 8000, // Port the server will listen on
  dbFile: process.env.DB_FILE || './db/dev.db', // Path to the SQLite database file
  jwtConfig: {
    secret: process.env.JWT_SECRET, // Secret key for signing JWTs
    expiresIn: process.env.JWT_EXPIRES_IN // Expiration time for JWT tokens
  }
};
