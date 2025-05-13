// backend/db/models/booking.js

'use strict';

const { Model } = require( 'sequelize' );

// define and export the booking model
module.exports = ( sequelize, DataTypes ) => {
  class Booking extends Model {
   
    // Define relationships between models
    // called automactically by sequelize\

    static associate( models ) {
      // A booking belongs to one user
      Booking.belongsTo( models.User, { foreignKey: 'userId' });
      // A booking belongs to one spot
      Booking.belongsTo( models.Spot, { foreignKey: 'spotId' });
    }
  }

  // Define the nooking model
  Booking.init(
    {
      spotId: {
        // References the spot being booked
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        // References the user making the booking
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      startDate: {
        // Booking start date
        type: DataTypes.DATEONLY, 
        allowNull: false,
        validate: {
          // Ensures value is a valid date
          isDate: true,
        },
      },
      endDate: {
        // Booking end date
        type: DataTypes.DATEONLY, 
        allowNull: false,
        validate: {
          // Ensures valid date
          isDate: true, 
          // Custom validation to ensure end date is after start date
          isAfterStart( value ) {
            if ( value <= this.startDate ) {
              throw new Error( 'endDate must be after startDate' );
            }
          },
        },
      },
    },
    {
      // Pass the sequelize instance
      sequelize,
      // Name of the model
      modelName: 'Booking',
    }
  );
  return Booking;
};
