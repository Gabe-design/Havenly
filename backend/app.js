const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { environment } = require('./config');
const isProduction = environment === 'production';

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

// Enable CORS only in development
if (!isProduction) {
  app.use(cors());
}

// Security headers
app.use(
  helmet.crossOriginResourcePolicy({
    policy: 'cross-origin'
  })
);

// Apply CSRF Middleware BEFORE routes
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction ? 'Lax' : 'Strict',
      httpOnly: true
    }
  })
);

// Allow CSRF Token Restore Route to be accessible
app.get('/api/csrf/restore', (req, res) => {
  res.cookie('XSRF-TOKEN', req.csrfToken()); 
  res.status(200).json({ "XSRF-Token": req.csrfToken() });
});

//  Load Routes after CSRF Middleware
const routes = require('./routes');
app.use(routes);


// Global Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message || 'Internal Server Error',
    status: err.status || 500,
    stack: isProduction ? null : err.stack // Hide stack trace in production
  });
});

// Export the app
module.exports = app;
