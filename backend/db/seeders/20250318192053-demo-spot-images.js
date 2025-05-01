// backend/db/seeders/demo-spot-images.js
'use strict';

const { Spot, SpotImage, User } = require('../models'); // If you're using the Spot model
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
 
  await SpotImage.bulkCreate([
    {
      spotId: 1,
      url: 'https://example.com/spot1-1.jpg',
      preview: true
    },
    {
      spotId: 1,
      url: 'https://example.com/spot1-2.jpg',
      preview: false
    },
    {
      spotId: 2,
      url: 'https://example.com/spot2-1.jpg',
      preview: true
    },
    {
      spotId: 2,
      url: 'https://example.com/spot2-2.jpg',
      preview: false
    },
    {
      spotId: 3,
      url: 'https://example.com/spot3-1.jpg',
      preview: true
    },
    {
      spotId: 3,
      url: 'https://example.com/spot3-2.jpg',
      preview: false
    }
  ], { validate: true });
},

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await queryInterface.bulkDelete(options, null, {});
  }
};


/*'use strict';

const { Spot } = require('../models'); // Import Spot model

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // Add schema in production
}


module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';

    // Fetch all existing spots from the database
    const spots = await Spot.findAll();

    if (spots.length === 0) {
      throw new Error("Cannot seed SpotImages because no Spots exist! Please seed Spots first.");
    }

    // Debugging: Log existing Spot IDs
    console.log("Spot IDs Found in DB:", spots.map(spot => spot.id));

    // Ensure we only insert images for spots that exist
    const spotImages = [];

    if (spots.length >= 1) {
      spotImages.push(
        { spotId: spots[0].id, url: 'https://example.com/spot1-1.jpg', preview: true, createdAt: new Date(), updatedAt: new Date() },
        { spotId: spots[0].id, url: 'https://example.com/spot1-2.jpg', preview: false, createdAt: new Date(), updatedAt: new Date() }
      );
    }

    if (spots.length >= 2) {
      spotImages.push(
        { spotId: spots[1].id, url: 'https://example.com/spot2-1.jpg', preview: true, createdAt: new Date(), updatedAt: new Date() }
      );
    }

    if (spots.length >= 3) {
      spotImages.push(
        { spotId: spots[2].id, url: 'https://example.com/spot3-1.jpg', preview: true, createdAt: new Date(), updatedAt: new Date() },
        { spotId: spots[2].id, url: 'https://example.com/spot3-2.jpg', preview: false, createdAt: new Date(), updatedAt: new Date() }
      );
    }

    console.log("SpotImages to Insert:", spotImages); // Debugging: Print final insert data

    return queryInterface.bulkInsert(options, spotImages);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkDelete(options, null, {});
  }
};
*/