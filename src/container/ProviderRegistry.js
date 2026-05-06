"use strict";

class ProviderRegistry {
  constructor() {
    this._providers = new Map();
  }

  register(token, factory, options = {}) {
    this._providers.set(token, { factory, options, instance: null });
    return this;
  }

  has(token) {
    return this._providers.has(token);
  }

  getDescriptor(token) {
    if (!this._providers.has(token)) {
      throw new Error(`Provider not registered: ${String(token)}`);
    }
    return this._providers.get(token);
  }

  all() {
    return Array.from(this._providers.entries());
  }
}

module.exports = ProviderRegistry;
