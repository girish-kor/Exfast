"use strict";

const express = require("express");
const { mergeConfig } = require("../config");
const { requestId, inputParser, context } = require("../middleware");
const { responseSender } = require("../output");
const { errorHandler } = require("../errors");
const { SecureHeaders, RateLimiter } = require("../security");
const SharedKernel = require("./SharedKernel");
const { AutowirePolicies, POLICIES } = require("./AutowirePolicies");

function createApp(options = {}) {
  const config = mergeConfig(options.config || {});
  const app = express();

  app.use(SecureHeaders());
  app.use(
    RateLimiter({
      windowMs: config.rateLimit.windowMs,
      max: config.rateLimit.max,
    }),
  );
  app.use(requestId);
  app.use(context({ config, kernel: SharedKernel }));
  app.use(inputParser);
  app.use(responseSender);

  app.use(errorHandler);

  app._config = config;
  return app;
}

module.exports = { createApp, SharedKernel, AutowirePolicies, POLICIES };
