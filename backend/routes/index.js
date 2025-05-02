// backend/routes/index.js

const express = require('express');
const router = express.Router();

// Import the API routes
const apiRouter = require('./api');
router.use('/api', apiRouter); // Only use API router


// CSRF endpoint to restore the CSRF token and send it as a cookie and in Json
router.get("/api/csrf/restore", (req, res) => {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  res.status(200).json({ "XSRF-Token": req.csrfToken() });
});


// Test endpoint to verify the server is up
router.get('/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

//  Log all the routes
const expressListRoutes = require('express-list-routes');
expressListRoutes(router);

module.exports = router;
