'use strict';

const review = require('../models/review');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Reviews', [
      {
        spotId: 1, 
        userId: 2, 
        review: "Amazing place! Would visit again.",
        stars: 5, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 1,
        userId: 3, 
        review: "Pretty good, but a bit noisy.",
        stars: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 2, 
        userId: 1, 
        review: "Not as described, very disappointed.",
        stars: 2, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 3, 
        userId: 2, 
        review: "Nice and quiet, great for a weekend retreat.",
        stars: 5, 
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Reviews', null, {});
  }
};
