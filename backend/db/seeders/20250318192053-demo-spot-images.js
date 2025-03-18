'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('SpotImages', [
      { spotId: 1, url: 'https://example.com/spot1-1.jpg', preview: true, createdAt: new Date(), updatedAt: new Date() },
      { spotId: 1, url: 'https://example.com/spot1-2.jpg', preview: false, createdAt: new Date(), updatedAt: new Date() },
      { spotId: 2, url: 'https://example.com/spot2-1.jpg', preview: true, createdAt: new Date(), updatedAt: new Date() },
      { spotId: 3, url: 'https://example.com/spot3-1.jpg', preview: true, createdAt: new Date(), updatedAt: new Date() },
      { spotId: 3, url: 'https://example.com/spot3-2.jpg', preview: false, createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('SpotImages', null, {});
  }
};
