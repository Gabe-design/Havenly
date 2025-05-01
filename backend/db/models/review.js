// backend/db/models/review.js
'use strict';
/**
- Defines the Review model.
- A review is associated with a user and a spot, and can have multiple images.
*/
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      // define association here
      // belongs to a user and a spot
      // has many review images
      Review.belongsTo(models.User, { foreignKey: "userId" });
      Review.belongsTo(models.Spot, { foreignKey: "spotId" });
      Review.hasMany(models.ReviewImage, { 
        foreignKey: "reviewId", 
        onDelete: "CASCADE", 
        hooks: true }); // Enable hooks to ensure cascading deletes
    }
  }
  Review.init({
    spotId: { 
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    review: {
      type: DataTypes.TEXT, // Text content of the review
      allowNull: false
    },
    stars: {
      type: DataTypes.INTEGER, // Rating from 1 to 5
      allowNull: false,
      validate: { min: 1, max: 5 } // Ensure valid star rating
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};