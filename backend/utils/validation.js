const { validationResult } = require('express-validator');

// moiddleware for formatting validation errors
const handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = {};
    validationErrors.array().forEach(error => {
      errors[error.path] = error.msg; 
    });

    return res.status(400).json({
      title: "Bad request",
      message: "Bad request.",
      errors
    });
  }

  next();
};

module.exports = {
  handleValidationErrors
};