// backend/db/migrations/spot.js
'use strict';

/** @type {import('sequelize-cli').Migration} */

/* 
- this migration script creates the 'Spots' table with various fields describing a rental spot.
- fields include ownerId (foreign key), location data, description, price, average rating, and preview image.
*/

let options = {};

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // add schema in production
}
// spots migration
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Spots',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        ownerId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'Users', key: 'id' }, // Foreign key to Users table
          onDelete: 'CASCADE' // delete spots if the owner is deleted
        },
        address: {
          type: Sequelize.STRING,
          allowNull: false
        },
        city: {
          type: Sequelize.STRING,
          allowNull: false
        },
        state: {
          type: Sequelize.STRING,
          allowNull: false
        },
        country: {
          type: Sequelize.STRING,
          allowNull: false
        },
        lat: {
          type: Sequelize.DECIMAL(10, 7),
          allowNull: false
        },
        lng: {
          type: Sequelize.DECIMAL(10, 7),
          allowNull: false
        },
        name: {
          type: Sequelize.STRING(50),
          allowNull: false
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        price: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false
        },
        avgRating: {
          type: Sequelize.DECIMAL(3, 2), // average rating out of 5
          allowNull: false,
          defaultValue: 0.0
        },
        previewImage: {
          type: Sequelize.STRING, // optional preview image URL
          allowNull: true,
          defaultValue: null
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
      },
      options );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Spots', options); // drop the Spots table
  }
};