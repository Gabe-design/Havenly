//backend/db/migrations/spot-image.js

'use strict';

// This migration creates the SpotImages table in the db

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // Set the schema in prod
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Table SpotImages
    await queryInterface.createTable('SpotImages', {
      id: {
        // Cannot be null
        allowNull: false, 
        // Automactically increments integer
        autoIncrement: true,
        // Primary key
        primaryKey: true,
        // integer 
        type: Sequelize.INTEGER
      },
      spotId: {
        // Integer to reference the spot
        type: Sequelize.INTEGER,
        // Cannot be null
        allowNull: false,
        references: {
          // References the Spots table
          model: 'Spots',
          // Uses the id from the spots as a foreign key
          key: 'id'
        },
        // Delete associated image if the spot is deleted
        onDelete: 'CASCADE'
      },
      url: {
        // URL of the image
        type: Sequelize.TEXT,
        // Required field
        allowNull: false
      },
      preview: {
        // Whether this image is the sopts preview image
        type: Sequelize.BOOLEAN,
        // required field
        allowNull: false,
        // default is false if not specified
        defaultValue: false
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
      // options is an object that contains the schema name
  }, options);
},
  async down(queryInterface, Sequelize) {
    // this will drop the SpotImages table
    // Sets table name explicitly in options object
    options.tableName = 'SpotImages';
    return queryInterface.dropTable(options);
    // Drops the SpotImages table using options object
  }
};
