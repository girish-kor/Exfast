"use strict";

const metrics = require("./metrics");

const checks = new Map();

function addCheck(name, fn) {
  checks.set(name, fn);
}

async function healthMiddleware(req, res) {
  const results = {};
  let status = "ok";

  for (const [name, fn] of checks.entries()) {
    try {
      results[name] = await fn();
    } catch (err) {
      results[name] = { status: "error", message: err.message };
      status = "degraded";
    }
  }

  const code = status === "ok" ? 200 : 503;
  res
    .status(code)
    .json({ status, checks: results, metrics: metrics.snapshot() });
}

module.exports = { addCheck, healthMiddleware };
