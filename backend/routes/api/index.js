// api routes
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const { restoreUser } = require("../../utils/auth.js");

router.use(restoreUser);
router.use('/session', sessionRouter);
router.use('/users', usersRouter);

// test route to verify api router is working
router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
});

module.exports = router;
