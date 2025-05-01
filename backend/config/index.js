// backend/config/index.js
// contains db configs 

module.exports = {
  environment: process.env.NODE_ENV || 'development', // Current environment mode
  port: process.env.PORT || 8000, // port the server will listen on
  dbFile: process.env.DB_FILE || './db/dev.db', // path to the SQLite database file
  jwtConfig: {
    secret: process.env.JWT_SECRET, // secret key for signing JWTs
    expiresIn: process.env.JWT_EXPIRES_IN // expiration time for JWT tokens
  }
};
