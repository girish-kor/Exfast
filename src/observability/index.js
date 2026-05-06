"use strict";

const { createLogger, httpLogger } = require("./logger");
const metrics = require("./metrics");
const { addCheck, healthMiddleware } = require("./health");

function serve(app, config = {}) {
  const logger = createLogger(config);
  app.use(httpLogger(logger));
  app.get("/health", healthMiddleware);
  app.get("/metrics", (req, res) => res.json(metrics.snapshot()));
  return logger;
}

module.exports = {
  createLogger,
  httpLogger,
  metrics,
  addCheck,
  healthMiddleware,
  serve,
};
