// backend/db/migrations/user.js

'use strict';

// This migartion creates the Users table in the db
// For prod environments ( render ) the schema name must be set to use su-databases

let options = {};
if ( process.env.NODE_ENV === 'production' ) {
  // set schema in prod for env varaibles
  options.schema = process.env.SCHEMA;  
}

module.exports = {
  async up( queryInterface, Sequelize ) {
    // Creates the Users table with defined columns and options 
    await queryInterface.createTable( 'Users', {
      id: {
        // This column cannot be null
        allowNull: false,
        // Automatically increments on each new entry 
        autoIncrement: true,
        // This is the primary key
        primaryKey: true,
        // Integer data type 
        type: Sequelize.INTEGER
      },
      firstName: {
        // Text field for first name
        type: Sequelize.STRING,
        // Cannot be null
        allowNull: false
      },
      lastName: {
        // Text field for last name
        type: Sequelize.STRING,
        // Cannot be null
        allowNull: false
      },
      username: {
        // Strings max length of 30 characters
        type: Sequelize.STRING( 30 ),
        // Required field
        allowNull: false,
        // Value must be unigue across the Users table
        unique: true,
        // Cannot be an empty string
        notEmpty: true
      },
      email: {
        // Strings max length of 256 characters
        type: Sequelize.STRING( 256 ),
        // Reduired field
        allowNull: false,
        // Value must be unique across the Users table
        unique: true,
        // value myst be a valid email address/format
        isEmail: true,
        // Cannot be an empty string
        notEmpty: true
      },
      hashedPassword: {
        // Binary string for securely Storing hashed password
        type: Sequelize.STRING.BINARY,
        // Required field
        allowNull: false,
        // Cannot be an empty string
        notEmpty: true
      },
      createdAt: {
        // Required field
        allowNull: false,
        // Date field
        type: Sequelize.DATE,
        // Default to the current timestamp 
        defaultValue: Sequelize.literal( 'CURRENT_TIMESTAMP' )
      },
      updatedAt: {
        // Required field
        allowNull: false,
        // Date field
        type: Sequelize.DATE,
        // Default to the current timestamp
        defaultValue: Sequelize.literal( 'CURRENT_TIMESTAMP' )
      }
    // options is an object that contains the schema name
    }, options );
  },

  async down( queryInterface, Sequelize ) {
    // this will drop the user table
    // Sets table name explicitly in options object
    options.tableName = "Users";
    // Drops the Users table using options object
    return queryInterface.dropTable( options );
  }
};
