//backend/config/database.js
/* conatains db configurations
  contains env variables*/
const config = require('./index'); // Load environment variables from index.js

module.exports = {
  development: {
    // where to look for db
    storage: config.dbFile, // SQLite file path from environment config
    // 
    dialect: "sqlite", // Use SQLite for development
    seederStorage: "sequelize", // Use Sequelize to track seed files
    logQueryParameters: true, // Enable logging for query parameters
    typeValidation: true // Enable type validation for models
  },
  production: {
    use_env_variable: 'DATABASE_URL', // Use DATABASE_URL from environment variables
    dialect: 'postgres', // Use PostgreSQL for production
    seederStorage: 'sequelize', // Track seeds using Sequelize
    dialectOptions: {
      ssl: {
        require: true, // Force SSL connection
        rejectUnauthorized: false // Allow self-signed certificates
      }
    },
    define: {
      schema: process.env.SCHEMA } // Use schema defined in environment variables
  }
}
