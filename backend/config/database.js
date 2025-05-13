//backend/config/database.js

// Imports configuration settings from index.js in the same folder
const config = require( './index' );

// Exports the configuration object for different eviroments (dev and prod)
module.exports = {
  // Configuration settings used when running the app in dev mode
  development: {
    // Path to the sqlite db file, taken from config/index.js
    storage: config.dbFile, 
    // Specifies the type of db used, which is sqlite for dev
    dialect: "sqlite", 
     // Stores info about db seed files using sequalize
    seederStorage: "sequelize",
     // Logs the values passed in queries for debugging purposes 
    logQueryParameters: true,
    // Ensures that the data types passed to sequelize match the model definitions
    typeValidation: true 
  },
  // Configuration settings used when running the app in prod mode ( render ) 
  production: {
    // Reads the psql db connection URL from an environment variable
    use_env_variable: 'DATABASE_URL', 
     // specifies the type of db used, which is psql in prod
    dialect: 'postgres',
    // Stores info about seed files using sequalize in prod also
    seederStorage: 'sequelize', 
    dialectOptions: {
      // secures db connections
      ssl: {
        // Require SSL for connecting to the db
        require: true,
        // Allows self-signed certificates or unverified certificates
        rejectUnauthorized: false
      }
    },
    define: {
      schema: process.env.SCHEMA // Specifies the name of the db schema to use ( from env variables )
    }
  }
};
