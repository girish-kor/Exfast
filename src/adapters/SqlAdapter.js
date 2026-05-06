"use strict";

class SqlAdapter {
  constructor(config = {}) {
    this._config = config;
    this._client = null;
  }

  async connect() {
    throw new Error(
      "SqlAdapter.connect() must be implemented by a concrete adapter",
    );
  }

  async disconnect() {
    throw new Error("SqlAdapter.disconnect() must be implemented");
  }

  async query(sql, _params = []) {
    throw new Error("SqlAdapter.query() must be implemented");
  }

  async beginTransaction() {
    return this.query("BEGIN");
  }

  async commit() {
    return this.query("COMMIT");
  }

  async rollback() {
    return this.query("ROLLBACK");
  }

  isConnected() {
    return this._client !== null;
  }
}

module.exports = SqlAdapter;
