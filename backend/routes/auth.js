const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const { User } = require('../db/models');
const { jwtConfig } = require('../config');

const router = express.Router();
const { secret, expiresIn } = jwtConfig;

//  User Signup Route
router.post(
  '/signup',
  [
    check('username').notEmpty().withMessage('Username is required'),
    check('email').isEmail().withMessage('Enter a valid email'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ],
  async (req, res) => {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract user data
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in DB
    const user = await User.create({ username, email, hashedPassword });

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, secret, { expiresIn });

    // Set cookie with token
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    return res.json({ token, user: { id: user.id, email, username: user.username } });
  }
);

//  User Login Route
router.post(
  '/login',
  [
    check('email').isEmail().withMessage('Enter a valid email'),
    check('password').notEmpty().withMessage('Password is required')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    // Check user exists & password matches
    if (!user || !bcrypt.compareSync(password, user.hashedPassword)) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, secret, { expiresIn });

    // Set cookie with token
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    return res.json({ token, user: { id: user.id, email, username: user.username } });
  }
);

//  User Logout Route
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({ message: 'Logged out successfully' });
});

// Get Current Logged-in User
router.get('/me', async (req, res) => {
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const user = await User.findByPk(decoded.id, {
      attributes: ['id', 'username', 'email']
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(user);
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = router;
