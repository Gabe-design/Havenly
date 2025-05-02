// backend/db/migrations/review-image.js

'use strict';

// This migration creates the ReviewImages table in the db

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // Set the schema in prod
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create the reviewImages table
    await queryInterface.createTable('ReviewImages', {
      id: {
        allowNull: false,
        // Automatically incremkents integer
        autoIncrement: true,
        // Primary key
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      reviewId: {
        // Forgien key to reviews table
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          // Link to the reviews table
          model: 'Reviews',
          key: 'id'
        },
        // Delete image if the associated review is deleted
        onDelete: 'CASCADE'

      },
      url: {
        // URL of the image
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        // Timestamp of when image was created
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        // Timestamp of when image was updated
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
      // options is an object that contains the schema name
    }, options);
  },
  async down(queryInterface, Sequelize) {
    // this will drop the ReviewImages table
    // Sets table name explicitly in options object
    options.tableName = 'ReviewImages';
    // Drops the ReviewsImages table using options object
  return queryInterface.dropTable(options);
  }
};