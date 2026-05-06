"use strict";

function context(container) {
  return function contextMiddleware(req, res, next) {
    req.container = container;
    req.startTime = Date.now();
    next();
  };
}

module.exports = context;
