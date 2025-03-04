// backend/utils/authMiddleware.js

const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models');

const { secret } = jwtConfig;

/**
 * Middleware to check if a user is authenticated.
 */
const requireAuth = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const user = await User.findByPk(decoded.id, {
      attributes: ['id', 'username', 'email']
    });

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    req.user = user; // Attach user data to request object
    next(); // Proceed to next middleware or route handler
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized: Token is invalid' });
  }
};

module.exports = { requireAuth };
