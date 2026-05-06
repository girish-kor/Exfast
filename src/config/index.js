"use strict";

const defaults = require("./defaults");
const loadEnv = require("./env");

function mergeConfig(overrides = {}) {
  const env = loadEnv();
  const envFiltered = Object.fromEntries(
    Object.entries(env).filter(([, v]) => v !== undefined),
  );
  const merged = Object.assign({}, defaults, envFiltered, overrides);
  return validate(merged);
}

function validate(config) {
  if (
    typeof config.port !== "number" ||
    config.port < 1 ||
    config.port > 65535
  ) {
    throw new Error("Config validation failed: port must be 1-65535");
  }
  return config;
}

module.exports = { mergeConfig, validate };
