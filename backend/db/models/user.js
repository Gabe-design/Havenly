'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Define associations here if needed
    }
  }

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, //  Ensure unique usernames
        validate: {
          notEmpty: true
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true //  Ensure it's a valid email
        }
      },
      hashedPassword: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true //  Ensure password is hashed and not empty
        }
      }
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users'
    }
  );

  return User;
};
