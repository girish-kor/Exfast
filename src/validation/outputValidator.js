"use strict";

const contractRegistry = require("./contractRegistry");

function outputValidator(contractName) {
  return function validate(req, res, next) {
    const originalJson = res.json.bind(res);
    res.json = function (body) {
      const validate = contractRegistry.get(contractName);
      const valid = validate(body);
      if (!valid) {
        const err = new Error("Output contract violation");
        err.status = 500;
        err.details = validate.errors;
        return next(err);
      }
      return originalJson(body);
    };
    next();
  };
}

module.exports = outputValidator;
