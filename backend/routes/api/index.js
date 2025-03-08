// api routes
const router = require('express').Router();

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