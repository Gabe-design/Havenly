//backend/db/migrations/review.js
'use strict';

/** @type {import('sequelize-cli').Migration} */

/* 
- this migration creates the 'Reviews' table.
- each review is associated with a user and a spot and includes the review text and a star rating.
*/

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // add schema in production
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      spotId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Spots", key: "id" }, // foreign key to users table
        onDelete: "CASCADE" // delete reviews when the related spot is deleted
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Users", key: "id" }, // foreign key to users table
        onDelete: "CASCADE" // delete reviews when the related user is deleted
      },
      review: {
        type: Sequelize.TEXT, // review text content
        allowNull: false
      },
      stars: {
        type: Sequelize.INTEGER, // star rating (1-5)
        allowNull: false,
        validate: {
          min: 1,
          max: 5
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") 
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      }
    }, options);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Reviews', options); // drop Reviews table
  }
};