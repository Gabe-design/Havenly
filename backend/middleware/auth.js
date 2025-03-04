const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models');

const { secret } = jwtConfig;

// Middleware to verify JWT and attach user to `req.user`
const requireAuth = async (req, res, next) => {
  const token = req.cookies.token; // Get token from cookies

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, secret);
    const user = await User.findByPk(decoded.id, { attributes: ['id', 'username', 'email'] });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    req.user = user; // Attach user to request
    next(); // Proceed to next middleware
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

module.exports = { requireAuth };
