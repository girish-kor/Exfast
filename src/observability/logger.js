"use strict";

const pino = require("pino");
const pinoHttp = require("pino-http");

function createLogger(config = {}) {
  const logger = pino({
    level: config.logLevel || process.env.LOG_LEVEL || "info",
    base: { service: config.serviceName || "exfast" },
    timestamp: pino.stdTimeFunctions.isoTime,
    formatters: {
      level(label) {
        return { level: label };
      },
    },
  });
  return logger;
}

function httpLogger(logger) {
  return pinoHttp({ logger });
}

module.exports = { createLogger, httpLogger };
