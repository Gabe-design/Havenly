// backend/routes/api/session.js

const express = require('express');
// Sequelize for matching username/email
const { Op } = require('sequelize');
// For password comparison
const bcrypt = require('bcryptjs');
// For request validation
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
// Auth helpers
const { setTokenCookie, restoreUser } = require('../../utils/auth');
// User model
const { User } = require('../../db/models');

const router = express.Router();

// Middleware to validate login credentials in request body
const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Email or username is required"),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage("Password is required"),
    // Forwards errors to error-handling middleware
  handleValidationErrors
];


// Log in a User
router.post(
    '/', validateLogin, async (req, res, next) => {
        // credentials username or password
      const { credential, password } = req.body;

      // Find user by either username or email
      const user = await User.unscoped().findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });


      // Validate user exists and password matches hash
      if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = { credential:  "Invalid credentials" };
        // Sends error to error handler
        return next(err);
      }

      // Remove sensitive data from response
      const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
      };

      // Set the JWT cookkie
      await setTokenCookie(res, safeUser);
      // Send the user info to client
      return res.json({
        user: safeUser
      });
    }
  );

  // Log out user
    router.delete(
    '/',
    (_req, res) => {
      // Remove token cookie
      res.clearCookie('token');
     return res.json({ message: 'success' });
    }
  );

  // Restore session user from token
  router.get(
    '/',
    (req, res) => {
      // check for user req
      const { user } = req;
      if (user) {
        // User found on cookie
        const safeUser = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          username: user.username,
        };
        return res.json({
          user: safeUser
        });
        // No user logged in, sends null
      } else return res.json({ user: null });
    }
  );

module.exports = router;

/* complete db reset

npx sequelize-cli db:seed:undo:all
npx sequelize-cli db:migrate:undo:all

rm db/dev.db

DROP SCHEMA IF EXISTS airbnb_schema CASCADE; CREATE SCHEMA airbnb_schema;

npm run build   # runs psql-setup-script.js to ensure schema exists

npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

*/