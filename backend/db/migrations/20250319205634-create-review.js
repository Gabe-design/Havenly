//backend/db/migrations/review.js

'use strict';

// This migartion creates the reviews table for reviews for spots
// Includes text, star rating, and forgien keys linking spots and users

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // Set the schema in prod
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create the reviews table
    await queryInterface.createTable('Reviews', {
      id: {
        // Cannot be null
        allowNull: false,
        // Automactically increments integer
        autoIncrement: true,
        // Primary key for table
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      spotId: {
        // Foreign key to spots table
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          // Links to the spots table
          model: 'Spots',
          key: 'id'
        },
        // Delete review if related sopt is deleted
        onDelete: 'CASCADE'
      },
      userId: {
        // Foreign key to uses table
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          // Links to the users table
          model: 'Users',
          key: 'id'
        },
        // Delete review if related user is deleted
        onDelete: 'CASCADE'
      },
      review: {
        // Text of the review
        type: Sequelize.TEXT,
        allowNull: false
      },
      stars: {
        // Star rating for the review ( 1-5 )
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        // Timestamp of creation
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        // Timestamp of last update
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
      // options is an object that contains the schema name
    }, options);
  },
  async down(queryInterface, Sequelize) {
    // this will drop the Review table
    // Sets table name explicitly in options object
    options.tableName = 'Reviews';
    // Drops the reviews table using options object
  return queryInterface.dropTable(options);
  }
};
