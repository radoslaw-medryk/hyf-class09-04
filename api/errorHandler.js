var { ValidationError } = require('express-json-validator-middleware');
var AlreadyExistsError = require("./errors/AlreadyExistsError");

const errorHandler = function (err, req, res, next) {
    let errorResponse;
    if (err instanceof ValidationError) {
      console.log("err", err);
      console.log("req", req.body);
      errorResponse = {
        errorType: "validation",
        field: err.validationErrors.body[0].dataPath,
        message: err.validationErrors.body[0].message
      };
    }
    else if (err instanceof AlreadyExistsError) {
      errorResponse = {
        errorType: "already_exists",
        message: `${err.entityName} already exists.`
      };
    } else {
      console.log(err);
      errorResponse = {
        errorType: "other",
        message: "Unknown error occured"
      };
    }
  
    res.status(400).send(errorResponse)
  }

module.exports = errorHandler;