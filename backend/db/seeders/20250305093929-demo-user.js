// backend/db/seeders/demo-user.js

'use strict';

// Seeder to populate table with demo users during dev
const { User } = require( '../models' );
const bcrypt = require( "bcryptjs" );

let options = {};
if ( process.env.NODE_ENV === 'production' ) {
  options.schema = process.env.SCHEMA; // Set the schema in prod
}

module.exports = {
  async up ( queryInterface, Sequelize ) {
    // Add demo users to Users table using sequelizes bulkCreate method
    await User.bulkCreate([
     {
       email: 'demo@user.io',
       username: 'Demo-lition',
       // Hashed password
       hashedPassword: bcrypt.hashSync( 'password' ),
       firstName: 'Demo',
       lastName: 'User',
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        // Hashed password
        hashedPassword: bcrypt.hashSync( 'password2' ),
        firstName: 'Fake',
        lastName: 'User1',
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        // Hashed password
        hashedPassword: bcrypt.hashSync( 'password3' ),
        firstName: 'Fake',
        lastName: 'User2',
      }
      // 
    ], 
    { // Runs the validations on each object before testing
      validate: true 
    }
  );
},

async down ( queryInterface, Sequelize ) {
  // Remove demo users using their usernames
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete( options, {
      username: { [ Op.in ]: [ 'Demo-lition', 'FakeUser1', 'FakeUser2' ] }
    }, {});
  }
};
