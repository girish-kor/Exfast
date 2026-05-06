"use strict";

module.exports = {
  port: 3000,
  env: "development",
  logLevel: "info",
  requestTimeout: 30000,
  bodyLimit: "1mb",
  cors: { origin: "*" },
  rateLimit: { windowMs: 60000, max: 100 },
};
