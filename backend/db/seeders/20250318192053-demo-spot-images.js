'use strict';

const { Spot } = require('../models'); // Import Spot model

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = 'SpotImages';

module.exports = {
  async up(queryInterface, Sequelize) {
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
    return queryInterface.bulkDelete(options, null, {});
  }
};
