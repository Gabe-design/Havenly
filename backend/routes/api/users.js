// backend/routes/api/users.js
const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { OP, where } = require('sequelize')


const router = express.Router();

// Validation middleware for signup 
const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .notEmpty()
      .withMessage("Invalid email"),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .notEmpty()
      .withMessage("Username is required"),
    check('firstName')
      .notEmpty()
      .withMessage("First Name is required"),
    check('lastName')
      .notEmpty()
      .withMessage("Last Name is required"),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];

// Sign up a user
router.post( '/', validateSignup, async (req, res) => {
      const { email, password, username, firstName, lastName } = req.body;
      
      // Check if the provided email alr exists
      const existingEmail = await User.findOne({
        where: { email }
      });

     // Check if provided email alr exists
      const existingUsername = await User.findOne({
        where: { username }
      });

       // If user alr exists by email or unsername, it will return a 500 with detailed error messages
      if (existingEmail || existingUsername) {
        return res.status(500).json({
          message: "User already exists",
          errors: {
            ...(existingEmail ? { email: "User with that email already exists" } : {}),
            ...(existingUsername ? { username: "User with that username already exists" } : {})
          }
        });
      }

      // Encrpt the users password
      const hashedPassword = bcrypt.hashSync(password);
      // Create the new user in the db
      const user = await User.create({ email, username, hashedPassword, firstName, lastName });
      // creates a safe version of the user object to return in the reponse
      const safeUser = {
        firstName: user.firstName,
        lastName: user.lastName,
        id: user.id,
        email: user.email,
        username: user.username,
      };
      // Sets the token cookie for the user
      await setTokenCookie(res, safeUser);
      // returns the created user
      return res.status(201).json({
        user: safeUser
      });
    }
  );

module.exports = router;