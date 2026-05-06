"use strict";

const helmet = require("helmet");

function SecureHeaders(options = {}) {
  return helmet({
    contentSecurityPolicy: options.csp !== false,
    crossOriginEmbedderPolicy: options.coep !== false,
    hsts:
      options.hsts !== false
        ? { maxAge: 31536000, includeSubDomains: true }
        : false,
    ...options.helmet,
  });
}

module.exports = SecureHeaders;
