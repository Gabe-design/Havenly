const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { ValidationError } = require('sequelize');


const { environment } = require('./config');
const isProduction = environment === 'production';

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

if (!isProduction) {
  app.use(cors());
}

app.use(
  helmet.crossOriginResourcePolicy({
    policy: 'cross-origin'
  })
);

// Applying CSRF middleware before Using `req.csrfToken()`
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction ? 'Lax' : 'Strict',
      httpOnly: true
    }
  })
);

// Allow CSRF token restore route to be accessible
app.get('/api/csrf/restore', (req, res) => {
  res.cookie("XSRF-TOKEN", req.csrfToken()); 
  res.status(200).json({ "XSRF-Token": req.csrfToken() });
});

// Load routes
const routes = require('./routes');
app.use(routes);

//catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = { message: "The requested resource couldn't be found." };
  err.status = 404;
  next(err);
});

// Process sequelize errors
app.use((err, _req, _res, next) => {
  if ( err instanceof ValidationError) {
    let errors = {};
    for ( let error of err.errors) {
      errors[error.path] = error.message;

    };
    err.title = 'Validation error';
    err.errors = errors;
  };
  next(err)

});

// Error formatter
app.use((err, _req, res, next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors || null, 
    stack: isProduction ? null : err.stack // Hide stack trace in production
  });
});
 
module.exports = app;
