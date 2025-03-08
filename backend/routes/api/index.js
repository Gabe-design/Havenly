// api routes
const router = require('express').Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');

router.use(restoreUser);

router.use('/session', sessionRouter);
router.use('/users', usersRouter);

// test route to verify api router is working
router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
});

// Test setting a token cookie
router.get('/set-token-cookie', async (_req, res) => {
    const user = await User.findOne({ where: { username: 'Demo-lition' } });
    setTokenCookie(res, user);
    return res.json({ user });
  });
  
  // Test restoring a user
  router.get('/restore-user', (req, res) => {
    return res.json(req.user);
  });
  
  // Test requiring authentication
  router.get('/require-auth', requireAuth, (req, res) => {
    return res.json(req.user);
  });

module.exports = router;