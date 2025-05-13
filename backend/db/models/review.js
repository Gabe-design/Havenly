// backend/db/models/review.js

'use strict';

// This model file defines the Review model and its associations

const { Model } = require( 'sequelize' );

module.exports = ( sequelize, DataTypes ) => {
  class Review extends Model {

    // This method is called automatically by models/index.js

    static associate( models ) {
      // A review belongs to a specific spot 
      Review.belongsTo(
        models.Spot,
        {
          foreignKey: "spotId",
          // Delete review if sopt is deleted
          onDelete: 'CASCADE'
        });
        // A review belongs to a specific user
      Review.belongsTo(
        models.User,
        {
          foreignKey: "userId",
          // Delete review if user is deleted
          onDelete: 'CASCADE'
        });
        // A review can have multiple images
      Review.hasMany(
        models.ReviewImage,
        {
          foreignKey: 'reviewId',
          // Delete image if review is deleted
          onDelete: 'CASCADE'
        });
    }
  }

  // Initialize rview model and define its attributes and validations
  Review.init({
    spotId: {
      // Id of the spot being reviewed
      type: DataTypes.INTEGER,
      // Required field 
      allowNull: false
    },
    userId: {
      // Id of the user who wrote the review
      type: DataTypes.INTEGER,
      // Required field
      allowNull: false
    },
    review: {
      // Text content of the review
      type: DataTypes.TEXT,
      // Cannot be empty 
      allowNull: false,
      validate: {
        // Must contain some text
       notEmpty: true
      }
    },
    stars: {
      // Star rating from 1-5
      type: DataTypes.INTEGER,
      // Required field
      allowNull: false,
      validate: {
        // Min 1 star, Max 5 stars
        min: 1,
        max: 5,
        // Must be an integer
        isInt: true,
      }
    },
  }, {
    // Sequelize instance
    sequelize,
    // Model name
    modelName: 'Review',
  });
  return Review;
};
