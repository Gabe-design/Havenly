// backend/db/models/booking.js
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /*
    - helper method for defining associations.
    - this method is not a part of Sequelize lifecycle.
    - the `models/index` file will call this method automatically.
    */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User, { foreignKey: 'userId' });
      Booking.belongsTo(models.Spot, { foreignKey: 'spotId' });
    }
  }
  Booking.init(
    {
      spotId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATEONLY, // start date of booking
        allowNull: false,
        validate: {
          isDate: true,// ensures valid date
        },
      },
      endDate: {
        type: DataTypes.DATEONLY, // end date of booking
        allowNull: false,
        validate: {
          isDate: true, // ensures valid date 
          isAfterStart(value) {
            if (value <= this.startDate) {
              throw new Error('endDate must be after startDate'); // custom validation
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Booking',
    }
  );
  return Booking;
};
