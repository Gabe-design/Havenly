//  backend/db/seeders/demo-reviews.js

'use strict';

// Seeder to populate the Reviews table with user reviews for seeded spots
const { User, Spot, SpotImage, Review, ReviewImage } = require('../models'); // If you're using the Spot model

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // Set the schema in prod
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    // Fetch existing users ny usernames
   const user1 = await User.findOne({ where: { username: 'Demo-lition' } });

   const user2 = await User.findOne({ where: { username: 'FakeUser1' } });

   const user3 = await User.findOne({ where: { username: 'FakeUser2' } });

   // Fetch existing seeded spots by id
   const spot1 = await Spot.findByPk(1);

   const spot2 = await Spot.findByPk(2);

   const spot3 = await Spot.findByPk(3);

   // Insert multiple reviews from user to dofferent spots 
   await Review.bulkCreate([
    {
      userId: user1.id,
      spotId: spot1.id,
      review: 'An amazing place to learn and study!',
      stars: 5
    },
    {
      userId: user1.id,
      spotId: spot2.id,
      review: 'Such a great place.',
      stars: 3
    },
    {
      userId: user1.id,
      spotId: spot3.id,
      review: 'It was alright.',
      stars: 1
    },
    {
      userId: user2.id,
      spotId: spot1.id,
      review: 'Okay place, good space I guess.',
      stars: 2
    },
    {
      userId: user2.id,
      spotId: spot2.id,
      review: 'Loved the Views!',
      stars: 4
    }, 
    {
      userId: user3.id,
      spotId: spot3.id,
      review: 'Great beach access and I love the beach!',
      stars: 5
    }
  ], 
  { // Ensures the model validations are followed/inserted
    validate: true 
  });
},

async down (queryInterface, Sequelize) {

  // Remove all entries from Reviews table

  options.tableName = 'Reviews';
  await queryInterface.bulkDelete(options, null, {});
}
};