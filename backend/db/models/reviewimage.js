// backend/db/models/reviewimage.js

'use strict';

// This model file defines the ReviewImage model and its associations

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ReviewImage extends Model {
    
    // This method is called automatically by models/index.js

    static associate(models) {
      // Each review image is linked to one review
      ReviewImage.belongsTo( models.Review, {
        // Foreign key to review
          foreignKey: 'reviewId',
          // Delete image if associated review is deleted
          onDelete: 'CASCADE' 
        });
    }
  }

  // Initialize ReviewImage model and define its attributes and validations
  ReviewImage.init({
    reviewId: {
      // Links to Review model
      type: DataTypes.INTEGER,
      // Required field
      allowNull: false
    },
    url: {
      // Image URL string
      type: DataTypes.STRING, 
      // Required field
      allowNull: false,
      validate: {
        // URL must not be empty
        notEmpty: true, 
        // Must be a valid URL format
        isUrl: true 
      }
    },
  }, {
    // Sequelize instance
    sequelize,
    // Model name
    modelName: 'ReviewImage',
  });
  return ReviewImage;
};
