// backend/db/seeders/demo-more-spot-images.js
'use strict';

// Seeder to populate SpotImages table with demo inmages for each spot
const { Spot, SpotImage, User } = require('../models'); 

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // Set the schema in prod
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
 
  // Insert demo images associated with specific spots into SpotImages table

  await SpotImage.bulkCreate([
    {
      spotId: 4,
      url: 'https://shorturl.at/tz5Fg',
      preview: true
    },
    {
      spotId: 4,
      url: 'https://example.com/spot1-2.jpg',
      preview: false
    },
    {
      spotId: 5,
      url: 'https://shorturl.at/3dZ2R',
      preview: true
    },
    {
      spotId: 5,
      url: 'https://example.com/spot2-2.jpg',
      preview: false
    },
    {
      spotId: 6,
      url: 'https://t.ly/_P23s',
      preview: true
    },
    {
      spotId: 6,
      url: 'https://example.com/spot2-2.jpg',
      preview: false
    },
    {
      spotId: 7,
      url: 'https://shorturl.at/flu6n',
      preview: true
    },
    {
      spotId: 7,
      url: 'https://example.com/spot2-2.jpg',
      preview: false
    },
    {
      spotId: 8,
      url: 'https://t.ly/3wlCQ',
      preview: true
    },
    {
      spotId: 8,
      url: 'https://example.com/spot3-2.jpg',
      preview: false
    }
  ], 
  { // Ensures the data follows model validations
    validate: true 
  });
},

  async down (queryInterface, Sequelize) {
    
    // Remove all entries from SpotImages table

    options.tableName = 'SpotImages';
    await queryInterface.bulkDelete(options, null, {});
  }
};
