// backend/db/migrations/review-image.js
'use strict';

/** @type {import('sequelize-cli').Migration} */

/*This migration creates the 'ReviewImages' table.
- Each image is associated with a review and stores a URL.
*/

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // Add schema in production
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ReviewImages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      reviewId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Reviews", key: "id" }, // FK to Reviews table
        onDelete: "CASCADE" // Delete image if associated review is deleted
      },
      url: {
        type: Sequelize.STRING, // URL for the image
        allowNull: false
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
    await queryInterface.dropTable('ReviewImages', options); // drop ReviewImages table
  }
};