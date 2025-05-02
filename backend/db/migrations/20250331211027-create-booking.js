// backend/db/migrations/bookings.js

'use strict';

// This migration creates the Booking table in the db
// Each booking includes a user, spot, start date, and end date

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // Set the schema in prod
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create the Booking table
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        // Automactically increments integer
        autoIncrement: true,
        // Unique identifier for each booking
        // Primary key
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      spotId: {
        // Foreign key to Spots table
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Spots', key: 'id' }, 
        // Delete booking if associated spot is deleted
        onDelete: 'CASCADE' 
      },
      userId: {
        // Foriegn key to Users table
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' }, 
        // Delete booking if associated user is deleted
        onDelete: 'CASCADE' 
      },
      startDate: {
        // Start date of booking
        type: Sequelize.DATEONLY, 
        allowNull: false
      },
      endDate: {
        // End date of booking
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      createdAt: {
        // Timestamp of when booking was created
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        // Timestamp of when booking was updated
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
      // options is an object that contains the schema name
    }, options);
  },

  async down(queryInterface, Sequelize) {
    // this will drop the Bookings table
    // Sets table name explicitly in options object
    await queryInterface.dropTable('Bookings'); 
    // Drops the Bookings table using options object
    return queryInterface.dropTable(options);
  }
};
