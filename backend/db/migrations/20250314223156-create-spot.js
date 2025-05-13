// backend/db/migrations/spot.js

'use strict';

// This Migration file creates the Sopts table in the db 

let options = {};
if ( process.env.NODE_ENV === 'production' ) {
  options.schema = process.env.SCHEMA;  // Set the schema in prod
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up( queryInterface, Sequelize ) {
    // Create the Spots table with specified columns and constraints
    await queryInterface.createTable( 'Spots', {
      id: {
        // Primary key for the table
        primaryKey: true,
        // Automactically increments integer
        autoIncrement: true,
        // Cannot be null
        allowNull: false,
        // Interger type
        type: Sequelize.INTEGER
      },
      ownerId: {
        // Foreign key to Users table 
        type: Sequelize.INTEGER,
        // Requireed field 
        allowNull: false,
      
        references: {
          // Refrences the Users table
          model: 'Users',
          // Uses the id from users table 
          key: 'id'
        },
        // Delete spot if associated user is deleted
        onDelete: 'CASCADE'
      },
      address: {
        // Address fo the spot
        // string with max of 225 characters
        type: Sequelize.STRING( 255 ),
        allowNull: false,

      },
      city: {
        // City where the spot is located
        // String with max of 100 characters
        type: Sequelize.STRING( 100 ),
        allowNull: false,
      },
      state: {
        // State or region
        // String with max of 50 characters
        type: Sequelize.STRING( 50 ),
        allowNull: false,
      },
      country: {
        // Country name
        // String with max of 50 characters
        type: Sequelize.STRING( 50 ),
        allowNull: false,
      },
      lat: {
        // Latitude of the spot
        // Float with 10 digits and 7 decimal places
        type: Sequelize.FLOAT( 10,7 ),
        allowNull: false,
      },
      lng: {
        // Longitude of the spot
        // Float with 10 digits and 7 decimal places
        type: Sequelize.FLOAT( 10,7 ),
        allowNull: false,
      },
      name: {
        // Name of the spot
        // String with max of 50 characters
        type: Sequelize.STRING( 50 ),
        allowNull: false
      },
      description: {
        // Description of the spot
        type: Sequelize.TEXT,
        allowNull: false
      },
      price: {
        // Price per night
        // Decimal with 10 digits and 2 decimal places
        type: Sequelize.DECIMAL( 10,2 ),
        allowNull: false
      },
      createdAt: {
        // Timestamp when record was created 
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal( 'CURRENT_TIMESTAMP' )
      },
      updatedAt: {
        // Timestamp when record was last updated
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal( 'CURRENT_TIMESTAMP' )
      }
      // options is an object that contains the schema name
    }, options );
  },

async down( queryInterface, Sequelize ) {
  // this will drop the Spots table
  // Sets table name explicitly in options object
  options.tableName = "Spots";
  // Drops the Spots table using options object
  return queryInterface.dropTable( options );
}};
