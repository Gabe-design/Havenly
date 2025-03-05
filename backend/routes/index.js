const express = require('express');
const router = express.Router();

//  Correctly define CSRF route
router.get("/api/csrf/restore", (req, res) => {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  res.status(200).json({ 
    "XSRF-Token": req.csrfToken() });
});

//  Import authentication routes
const authRouter = require('./auth');
router.use('/auth', authRouter);

//  Test route
router.get('/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

//  Debugging: Log all registered routes
const expressListRoutes = require('express-list-routes');
expressListRoutes(router);

module.exports = router;
