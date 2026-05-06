"use strict";

class ServiceFactory {
  constructor(registry) {
    this._registry = registry;
    this._resolving = new Set();
  }

  resolve(token) {
    const descriptor = this._registry.getDescriptor(token);
    if (descriptor.options.singleton && descriptor.instance !== null) {
      return descriptor.instance;
    }
    if (this._resolving.has(token)) {
      throw new Error(`Circular dependency detected for: ${String(token)}`);
    }
    this._resolving.add(token);
    const instance = descriptor.factory(this);
    this._resolving.delete(token);
    if (descriptor.options.singleton) {
      descriptor.instance = instance;
    }
    return instance;
  }
}

module.exports = ServiceFactory;
