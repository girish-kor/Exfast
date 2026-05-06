"use strict";

const rateLimit = require("express-rate-limit");

function RateLimiter(options = {}) {
  return rateLimit({
    windowMs: options.windowMs || 60 * 1000,
    max: options.max || 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: { code: "RATE_LIMITED", message: "Too many requests" } },
    keyGenerator: options.keyGenerator || ((req) => req.ip),
  });
}

module.exports = RateLimiter;
