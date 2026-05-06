"use strict";

class RedisAdapter {
  constructor(config = {}) {
    this._config = config;
    this._client = null;
  }

  async connect() {
    throw new Error(
      "RedisAdapter.connect() must be implemented by a concrete adapter",
    );
  }

  async disconnect() {
    throw new Error("RedisAdapter.disconnect() must be implemented");
  }

  async get(_key) {
    throw new Error("RedisAdapter.get() must be implemented");
  }

  async set(_key, _value, _ttl) {
    throw new Error("RedisAdapter.set() must be implemented");
  }

  async del(_key) {
    throw new Error("RedisAdapter.del() must be implemented");
  }

  async exists(_key) {
    throw new Error("RedisAdapter.exists() must be implemented");
  }

  isConnected() {
    return this._client !== null;
  }
}

module.exports = RedisAdapter;
