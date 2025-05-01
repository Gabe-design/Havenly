//backend/db/migrations/spot-image.js
'use strict';

/* 
- This migration creates the 'SpotImages' table, which stores image URLs for each spot.
- includes a foreign key reference to the 'Spots' table and a boolean flag for preview images.
*/

/** @type {import('sequelize-cli').Migration} */

const { sequelize } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // add schema in production
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SpotImages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      spotId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Spots', key: 'id' }, // foreign key to Spots table
        onDelete: 'CASCADE' // delete images when spot is deleted
      },
      url: {
        type: Sequelize.STRING, // tmage URL
        allowNull: false
      },
      preview: {
        type: Sequelize.BOOLEAN, // flag to mark if image is used as a preview
        allowNull: false,
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
    }, options);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SpotImages', options); // drop SpotImages table
  }
};
