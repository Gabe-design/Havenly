// backend/db/models/user.js

'use strict';

// This model file define the User model which stiores user information including credentials
// Includes validations and relationships with other models like spot and review

const { Model, Validator } = require( 'sequelize' );

module.exports = ( sequelize, DataTypes ) => {
  class User extends Model {

    // Called automatically by models/index.js

    static associate( models ) {
      // A user can own many spots 
      User.hasMany( models.Spot, {
        foreignKey: 'ownerId',
        onDelete: 'CASCADE',
      });

      // A user can lave many reviews
      User.hasMany( models.Review, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
    }
  }

  // Initialize User model and define its attributes and validations
  User.init(
    {
      firstName: {
        // Users first name
        type: DataTypes.STRING,
        // Required field
        allowNull: false,
        validate: {
          // Cannot be empty
          notEmpty: true
        }
      },
      lastName: {
        // Users last name
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      username: {
        // Users unique username
        type: DataTypes.STRING,
        allowNull: false,
        // Cannot be reused
        unique: true,
        validate: {
          // Username must be a min of 4 and max of 30 characters
          len: [ 4, 30 ],
          isNotEmail( value ) { // Username cannnot be an email
            if ( Validator.isEmail( value )) {
              throw new Error( 'Cannot be an email.' );
            }
          },
        },
      },
      email: {
        // Users email address
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          // Email must be a min of 3 and max of 256 characters
          len: [ 3, 256 ],
          // Email must be unique/valid
          isEmail: true,
        },
      },
      hashedPassword: {
        // Users stored hashed password
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          // Password must be 60 characters
          len: [ 60, 60 ],
        },
      },
    },
    {
      // Sequelize instance
      sequelize,
      // Model name
      modelName: 'User',
      defaultScope: {
        attributes: {
          // Hides sensitive info from the default query
          exclude: [ 'hashedPassword', 'email', 'createdAt', 'updatedAt' ],
        },
      },
    } 
  );
  return User;
};

