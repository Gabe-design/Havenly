// backend/db/seeders/demo-spot-images.js
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
      spotId: 1,
      url: 'https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      preview: true
    },
    {
      spotId: 1,
      url: 'http://example.com/spot1-2.jpg',
      preview: false
    },
    {
      spotId: 2,
      url: 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      preview: true
    },
    {
      spotId: 2,
      url: 'https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      preview: false
    },
    {
      spotId: 3,
      url: 'https://images.pexels.com/photos/1488327/pexels-photo-1488327.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      preview: true
    },
    {
      spotId: 3,
      url: 'http://example.com/spot3-2.jpg',
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
