"use strict";

const DomainError = require("./DomainError");
const InfraError = require("./InfraError");

const catalog = {
  NOT_FOUND: (msg = "Resource not found") => {
    const e = new DomainError(msg, "NOT_FOUND");
    e.status = 404;
    return e;
  },
  UNAUTHORIZED: (msg = "Unauthorized") => {
    const e = new DomainError(msg, "UNAUTHORIZED");
    e.status = 401;
    return e;
  },
  FORBIDDEN: (msg = "Forbidden") => {
    const e = new DomainError(msg, "FORBIDDEN");
    e.status = 403;
    return e;
  },
  CONFLICT: (msg = "Resource conflict") => {
    const e = new DomainError(msg, "CONFLICT");
    e.status = 409;
    return e;
  },
  VALIDATION: (msg = "Validation error", details) => {
    const e = new DomainError(msg, "VALIDATION");
    e.status = 422;
    e.details = details;
    return e;
  },
  DB_UNAVAILABLE: (msg = "Database unavailable") =>
    new InfraError(msg, "DB_UNAVAILABLE"),
  CACHE_UNAVAILABLE: (msg = "Cache unavailable") =>
    new InfraError(msg, "CACHE_UNAVAILABLE"),
};

module.exports = catalog;
