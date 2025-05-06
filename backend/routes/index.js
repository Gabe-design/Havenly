// backend/routes/index.js

const express = require('express');
const router = express.Router();

// Import the API routes
const apiRouter = require('./api');
router.use('/api', apiRouter); // Only use API router

// Static routes
// Serve React build files in production
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  // Serve the frontend's index.html file at the root route
  router.get('/', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.sendFile(
      path.resolve(__dirname, '../../frontend', 'dist', 'index.html')
    );
  });

  // Serve the static assets in the frontend's build folder
  router.use(express.static(path.resolve(__dirname, '../../frontend/dist')));

  // Serve the frontend's index.html file at all other routes NOT starting with /api
  router.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.sendFile(
      path.resolve(__dirname, '../../frontend', 'dist', 'index.html')
    );
  });
}

// CSRF endpoint to restore the CSRF token and send it as a cookie and in Json
router.get("/api/csrf/restore", (req, res) => {
  // So the token is called once and not twice
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken );
  res.status(200).json({ "XSRF-Token": csrfToken });
});

//  Log all the routes
const expressListRoutes = require('express-list-routes');
expressListRoutes(router);

// Test endpoint to verify the server is up
router.get('/test', (req, res) => {
  res.json({ message: 'API is working!' });
});


module.exports = router;
