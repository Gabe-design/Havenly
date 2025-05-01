//backend/config/database.js
/* 
- conatains db configurations
- contains env variables
*/
const config = require('./index'); // load environment variables from index.js

module.exports = {
  development: {
    // where to look for db
    storage: config.dbFile, // SQLite file path from environment config
    // 
    dialect: "sqlite", // Use SQLite for development
    seederStorage: "sequelize", // use Sequelize to track seed files
    logQueryParameters: true, // enable logging for query parameters
    typeValidation: true // enable type validation for models
  },
  production: {
    use_env_variable: 'DATABASE_URL', // use DATABASE_URL from environment variables
    dialect: 'postgres', // Use PostgreSQL for production
    seederStorage: 'sequelize', // track seeds using Sequelize
    dialectOptions: {
      ssl: {
        require: true, // ssl connection required
        rejectUnauthorized: false // allow self-signed certificates
      }
    },
    define: {
      schema: process.env.SCHEMA } // use schema defined in environment variables
  }
}
