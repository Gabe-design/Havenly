// backend/db/migrations/bookings.js
'use strict';

/** @type {import('sequelize-cli').Migration} */

/*
- this migration creates the 'Bookings' table.
- each booking links a user to a spot with start and end dates.
*/

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // add schema in production
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      spotId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Spots', key: 'id' }, // foreign key to spots table
        onDelete: 'CASCADE' // delete booking if the spot is deleted
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' }, // foreign key to users table
        onDelete: 'CASCADE' // delete booking if the user is deleted
      },
      startDate: {
        type: Sequelize.DATEONLY, // start date of booking
        allowNull: false
      },
      endDate: {
        type: Sequelize.DATEONLY, // end date of booking
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, options);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bookings', options); // drop Bookings table
  }
};
