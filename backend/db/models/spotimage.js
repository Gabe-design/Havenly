// backend/db/models/spotimage.js
// manni's code
'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/database.js')[env];
const db = {};
// const { Model, Validator } = require('sequelize');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SpotImage extends Model {
    /*
    - Helper method for defining associations.
    - This method is not a part of Sequelize lifecycle.
    - The `models/index` file will call this method automatically.
    */
    static associate(models) {
      // define association here
      SpotImage.belongsTo(models.Spot, {
        foreignKey: 'spotId',
        onDelete: 'CASCADE' // deletes image when spot is deleted
      });
    }
  }
  SpotImage.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true // ensures spotid is an integer
      }
    },
    url:{
      type: DataTypes.STRING, // image url
      allowNull: false,
      validate: {
        isUrl: true // ensures url is valid
      }
    },
    preview: {
      type: DataTypes.BOOLEAN, 
      allowNull: false,
      defaultValue: false
    },
  }, {
    sequelize,
    modelName: 'SpotImage',
  });
  return SpotImage;
};
