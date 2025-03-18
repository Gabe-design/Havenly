'use strict';

const { query } = require('express');
const { Spot } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {async up (queryInterface, Sequelize) {
  try {
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: '123 Main St',
        city: 'San Francisco',
        state: 'CA',
        country: 'USA',
        lat: 37.7749,
        lng: -122.4194,
        name: 'App Academy SF',
        description: 'A great place to learn coding!',
        price: 200,
        avgRating: 4.5,
        previewImage: 'https://example.com/spot1.jpg'
      },
      {
        ownerId: 2,
        address: '456 Beach Ave',
        city: 'Miami',
        state: 'FL',
        country: 'USA',
        lat: 25.7617,
        lng: -80.1918,
        name: 'Beach House',
        description: 'A cozy beachside retreat.',
        price: 350,
        avgRating: 4.8,
        previewImage: 'https://example.com/spot2.jpg'
      },
      {
        ownerId: 3,
        address: '789 Mountain Rd',
        city: 'Denver',
        state: 'CO',
        country: 'USA',
        lat: 39.7392,
        lng: -104.9903,
        name: 'Mountain Cabin',
        description: 'Escape into nature.',
        price: 180,
        avgRating: 4.6,
        previewImage: 'https://example.com/spot3.jpg'
      }
    ]);
  } catch (error) {
    console.error("SEED ERROR:", error); // < will print validation errors
    throw error;
  }
},

async down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Spots', null, {})
}
};