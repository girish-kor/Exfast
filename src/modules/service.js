"use strict";

class BaseService {
  constructor(dependencies = {}) {
    this._deps = dependencies;
  }

  get logger() {
    return this._deps.logger || console;
  }

  get repository() {
    return this._deps.repository || null;
  }
}

module.exports = BaseService;
