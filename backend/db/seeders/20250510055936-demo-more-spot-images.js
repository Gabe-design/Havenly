// backend/db/seeders/demo-more-spot-images.js
'use strict';

// Seeder to populate SpotImages table with demo inmages for each spot
const { Spot, SpotImage, User } = require( '../models' ); 

let options = {};
if ( process.env.NODE_ENV === 'production' ) {
  options.schema = process.env.SCHEMA; // Set the schema in prod
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up ( queryInterface, Sequelize ) {
 
  // Insert demo images associated with specific spots into SpotImages table

  await SpotImage.bulkCreate([
    {
      spotId: 4,
      url: 'https://images.pexels.com/photos/16792627/pexels-photo-16792627/free-photo-of-facade-of-traditional-house.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      preview: true
    },
    {
      spotId: 4,
      url: 'https://example.com/spot1-2.jpg',
      preview: false
    },
    {
      spotId: 5,
      url: 'https://cdn.pixabay.com/photo/2019/12/16/05/08/opera-house-4698516_1280.jpg',
      preview: true
    },
    {
      spotId: 5,
      url: 'https://example.com/spot2-2.jpg',
      preview: false
    },
    {
      spotId: 6,
      url: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      preview: true
    },
    {
      spotId: 6,
      url: 'https://example.com/spot3-2.jpg',
      preview: false
    },
    {
      spotId: 7,
      url: 'https://cdn.pixabay.com/photo/2014/08/06/10/38/tunisia-411438_1280.jpg',
      preview: true
    },
    {
      spotId: 7,
      url: 'https://example.com/spot4-2.jpg',
      preview: false
    },
    {
      spotId: 8,
      url: 'https://cdn.pixabay.com/photo/2020/04/02/18/51/italy-4996326_1280.jpg',
      preview: true
    },
    {
      spotId: 8,
      url: 'https://example.com/spot5-2.jpg',
      preview: false
    }
  ], 
  { // Ensures the data follows model validations
    validate: true 
  });
},

  async down ( queryInterface, Sequelize ) {
    
    // Remove all entries from SpotImages table

    options.tableName = 'SpotImages';
    await queryInterface.bulkDelete( options, null, {});
  }
};
