"use strict";

const contractRegistry = require("./contractRegistry");

function inputValidator(contractName) {
  return function validate(req, res, next) {
    const validate = contractRegistry.get(contractName);
    const valid = validate(req.body);
    if (!valid) {
      const err = new Error("Input validation failed");
      err.status = 422;
      err.details = validate.errors;
      return next(err);
    }
    next();
  };
}

module.exports = inputValidator;
