// backend/db/models/index.js

'use strict';

// This model index file initializes all sequelize models dynamically
// and sets up associatiopns between them

// File system module to read files
const fs = require('fs');
// Pathe moduule to work with file paths
const path = require('path');
// Sequelize module to interact with the db
const Sequelize = require('sequelize');
// Node.js process module to acces env variables
const process = require('process');
// Current file name ( Index.js )
const basename = path.basename(__filename);
// Get current env ( dev, test, prod )
const env = process.env.NODE_ENV || 'development';
// Load db config based on env
const config = require(__dirname + '/../../config/database.js')[env];
// Object store all loaded models
const db = {};

// sequelize instance
let sequelize;
// Use connection string from env variables if provided
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  // Otherwise use the indiviual db config values
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Read all model files in this directory ( not including hidden files, index.js, and test files)
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      // Skip hidden files
      file.indexOf('.') !== 0 &&
      // Skpi this file ( Index.js )
      file !== basename &&
      // Only process .js files
      file.slice(-3) === '.js' &&
      // skip test files
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    // Dynamically import and initialize each model file
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    // Add model to db object
    db[model.name] = model;
  });

// Call associate method on each model to set up associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    // Pass all models to associate method
    db[modelName].associate(db);
  }
});

// Attach the sequelize instance and class to the db object
// Export the db object for use throughout the app

// Sequelize instance for db operations
db.sequelize = sequelize;
// Sequelize library itself for model creation
db.Sequelize = Sequelize;

// Exports all models and sequelize instance
module.exports = db;

