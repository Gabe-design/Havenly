//backend/utils/validation.js
const { validationResult } = require('express-validator');

//moiddleware for formatting validation errors 
const handleValidationErrors = (req, _res, next) => {
    const validationErrors = validationResult(red);

    if (!validationErrors.isEmpty()) {
        const errors = {};
        validationErrors.array().forEach(error => errors[error.path] = error.msg);

        const err = Error("Bad request.");
        err.errors = errors;
        err,status = 400;
        err.title = "Bad request.";
        next(err);

    }
    next();

};

module.exports = {
    handleValidationErrors
};