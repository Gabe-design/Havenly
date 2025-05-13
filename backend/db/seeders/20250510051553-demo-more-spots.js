// backend/db/seeders/demo-more-spots.js

'use strict';

// Seeder to populate Spote table with sample data
const { Spot, SpotImage } = require( '../models' ); 

let options = {};
if ( process.env.NODE_ENV === 'production' ) {
  options.schema = process.env.SCHEMA;  // Set the schema in prod
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up ( queryInterface, Sequelize ) {
   
    // Insert demo spot listings into the spots table

    await Spot.bulkCreate([
      {
          ownerId: 1,
          address: "501st Sakura Street",
          city: "Kyoto",
          state: "Kansai",
          country: "Japan",
          lat: 35.0116,
          lng: 135.7681,
          name: "Zen Escape",
          description: "This is the traditional ryokan featureing a beautiful serene garden.",
          price: 700.00
        },
      {
        ownerId: 2,
        address: "8 Harbourview Rd",
        city: "Sydney",
        state: "New South Wales",
        country: "Australia",
        lat: -33.8688,
        lng: 151.2093,
        name: "Opera House Views",
        description: "A modern flat with a great balcony view of the famous Sydney Opera House.",
        price: 450.00
      },
      {
        ownerId: 3,
        address: "45 Oceanside Dr",
        city: "Malibu",
        state: "California",
        country: "USA",
        lat: 34.0259,
        lng: -118.7798,
        name: "Super Villian Beachfront",
        description: "Luxary at its finest with a beautifal beach access and hiking trail.",
        price: 1000.00
      },
      {
        ownerId: 1,
        address: "123 Tatooine Dune",
        city: "Mos Eisley",
        state: "Outer Rim",
        country: "Tatooine",
        lat: 21.3069,
        lng: 157.8583,
        name: "The Twin Sunset Hideout",
        description: "An outlaw escape with twin suns and occasional droid visits.",
        price: 135.00
      },
      {
        ownerId: 2,
        address: "Lake Como Villa 77",
        city: "Como",
        state: "Lombardy",
        country: "Italy",
        lat: 45.9855,
        lng: 9.2572,
        name: "Galactic Refuge",
        description: "Scenic lakefront where Anakin and Padme once hid away in style",
        price: 670.00
      }
    ], 
  { // Runs the model validations before insert
    validate: true 
  }); 
},

  async down ( queryInterface, Sequelize ) {

    // Remove all entries from the Spots table

    options.tableName = 'Spots';
    await queryInterface.bulkDelete( options, null, {});
  }
};
