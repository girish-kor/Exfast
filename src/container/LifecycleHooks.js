"use strict";

class LifecycleHooks {
  constructor() {
    this._onInit = [];
    this._onDestroy = [];
  }

  onInit(fn) {
    this._onInit.push(fn);
    return this;
  }

  onDestroy(fn) {
    this._onDestroy.push(fn);
    return this;
  }

  async runInit() {
    for (const fn of this._onInit) await fn();
  }

  async runDestroy() {
    for (const fn of this._onDestroy) await fn();
  }
}

module.exports = LifecycleHooks;
