// backend/db/models/index.js
'use strict';

/*
- This file initializes all Sequelize models and sets up associations.
- It dynamically loads all model definitions and connects them to the Sequelize instance.
*/

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '../../config/database'))[env]; // Ensure correct path
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config); // Use env var connection string
} else {
  sequelize = new Sequelize(config); // Use object config
}
// Dynamically import all model files except index.js and test files
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model; // Register model to db object
  });
// Set up model associations if defined
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize; // Sequelize instance
db.Sequelize = Sequelize; // Sequelize class reference

module.exports = db;
