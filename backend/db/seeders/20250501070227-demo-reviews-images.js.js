// backend/db/seeders/demo-review-images.js

'use strict';

// Seeder to populate the ReviewImages table with image URLs linked to reviews
const { User, Spot, SpotImage, Review, ReviewImage } = require( '../models' ); 

let options = {};
if ( process.env.NODE_ENV === 'production' ) {
  options.schema = process.env.SCHEMA;  // Set the schema in prod
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up ( queryInterface, Sequelize ) {
    
    // Insert demo review images associated with seeded reviews into reviewImages table
    
    await ReviewImage.bulkCreate([
      {
        reviewId: 1,
        url: 'https://example.com/images/image_url1.jpg',
      },
      {
        reviewId: 2,
        url: 'https://example.com/images/image_url2.jpg',
      },
      {
        reviewId: 3,
        url: 'https://example.com/images/image_url3.jpg',
      },
      {
        reviewId: 4,
        url: 'https://example.com/images/image_url4.jpg',
      },
      {
        reviewId: 1,
        url: 'https://example.com/images/image_url1-1.jpg',
      },
      {
        reviewId: 2,
        url: 'https://example.com/images/image_url2-2.jpg',
      }
    ], // Ensures the models foollows the validations
    { validate: true 

    });
  },

    async down ( queryInterface, Sequelize ) {
     
      // Remove all entries from ReviewImages table

      options.tableName = 'ReviewImages';
      await queryInterface.bulkDelete( options, null, {});
    }
  };
