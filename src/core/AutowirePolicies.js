"use strict";

const POLICIES = {
  SINGLETON: "singleton",
  TRANSIENT: "transient",
  SCOPED: "scoped",
};

class AutowirePolicies {
  constructor() {
    this._bindings = new Map();
  }

  bind(token, policy = POLICIES.SINGLETON) {
    this._bindings.set(token, policy);
    return this;
  }

  getPolicy(token) {
    return this._bindings.get(token) || POLICIES.TRANSIENT;
  }

  isSingleton(token) {
    return this.getPolicy(token) === POLICIES.SINGLETON;
  }
}

module.exports = { AutowirePolicies: new AutowirePolicies(), POLICIES };
