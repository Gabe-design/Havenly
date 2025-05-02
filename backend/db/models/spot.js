// backend/db/models/spot.js

'use strict';

// This model file defines the Spot model and its associations

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    
    // Called automatically by models/index.js

    static associate(models) {
      // A sopt belongs to a specific user
        Spot.belongsTo(models.User, {
          foreignKey: 'ownerId',
          onDelete: 'CASCADE'
        });

        // A spot can have many images
        Spot.hasMany(
        models.SpotImage,
        {
          foreignKey: "spotId",
          onDelete: 'CASCADE',
        });

        // A spot can have many reviews
        Spot.hasMany(
        models.Review,
        {
          foreignKey: "spotId",
          onDelete: 'CASCADE',
        });
    }
  }

  // Initialize Spot model and define its attributes and validations
  Spot.init({
    ownerId: {
      // Id of the user who owns the spot
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true
      }
    },
    address: {
      // Address of the spot
      type: DataTypes.STRING(255),
      allowNull: false,
      validate:
      {
        notEmpty: true,
        len: [1, 255],
      }
    },
    city: {
      // City where the spot is located
      type: DataTypes.STRING(100),
      allowNull: false,
      validate:
      {
        notEmpty: true,
        len: [1, 100],
      }
    },
    state: {
      // State where the spot is located
     type: DataTypes.STRING(50),
     allowNull: false,
     validate:
     {
       notEmpty: true,
       len: [1, 50],
     }
    },
    country: {
      // Country where the spot is located
      type: DataTypes.STRING(50),
      allowNull: false,
      validate:
      {
        notEmpty: true,
        len: [1, 50],
      }
     },
    lat: {
      // Latitude of the spot
    type: DataTypes.FLOAT(10,7),
    allowNull: false,
    validate: {
      isFloat: true,
      min: -90,
      max: 90
    }
    },
    lng: {
      // Longitude of the spot 
      type: DataTypes.FLOAT(10,7),
      allowNull: false,
      validate: {
        isFloat: true,
        min: -180,
        max: 180
    }
    },
    name: {
      // Name of the spot
      type: DataTypes.STRING(50),
      allowNull: false,
      validate:
      {
        notEmpty: true,
        len: [1, 50]
      }
    },
    description: {
      // Description of the spot
      type: DataTypes.TEXT,
      allowNull: false,
      validate:
      {
        notEmpty: true,
      }
    },
    price: {
      // Price per night of the spot
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
      validate: {
      isDecimal: true,
      min: 1
      }
    },
  }, {
    // Sequelize instance
    sequelize,
    // Model name
    modelName: 'Spot',
  });
  return Spot;
};

