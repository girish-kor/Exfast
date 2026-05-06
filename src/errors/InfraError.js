"use strict";

class InfraError extends Error {
  constructor(message, code, meta = {}) {
    super(message);
    this.name = "InfraError";
    this.code = code;
    this.meta = meta;
    this.status = 503;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = InfraError;
