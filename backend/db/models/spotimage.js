// backend/db/models/spotimage.js

'use strict';

// This model file defines the SpotImage, which stores image URLs associated with a spot
// Each image belongs to a single spot and can be marked as a preview image

const { Model } = require( 'sequelize' );

module.exports = ( sequelize, DataTypes ) => {
  class SpotImage extends Model {
    
    // This method is called automatically by models/index.js

    static associate( models ) {
      // Each image belongs to one spot
      SpotImage.belongsTo( models.Spot, {
        // Link image to a spot
        foreignKey: 'spotId',
        // Delete image if associated spot is deleted
        onDelete: 'CASCADE' 
      });
    }
  }

  // Initialize SpotImage model and define its attributes and validations
  SpotImage.init({
    spotId: {
      // Foreign key to a spot
      type: DataTypes.INTEGER,
      // Required field
      allowNull: false,
      validate: {
        // Must be an integer
        isInt: true 
      }
    },
    url:{
      // Image URL string
      type: DataTypes.STRING,
      // Required field
      allowNull: false,
      validate: {
        // Must be valid URL format
        isUrl: true 
      }
    },
    preview: {
      // Whether this image is the preview image for the spot
      type: DataTypes.BOOLEAN, 
      // Required
      allowNull: false,
      // Default is false
      defaultValue: false
    },
  }, {
    // Sequelize instance
    sequelize,
    // Model name
    modelName: 'SpotImage',
  });
  return SpotImage;
};
