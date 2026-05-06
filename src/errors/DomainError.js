"use strict";

class DomainError extends Error {
  constructor(message, code, meta = {}) {
    super(message);
    this.name = "DomainError";
    this.code = code;
    this.meta = meta;
    this.status = 400;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = DomainError;
