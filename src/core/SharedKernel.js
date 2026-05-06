"use strict";

const config = require("../config");
const { registry, lifecycle } = require("../container");
const conventions = require("../conventions/conventionResolver");
const errors = require("../errors");

class SharedKernel {
  constructor() {
    this.config = config;
    this.registry = registry;
    this.lifecycle = lifecycle;
    this.conventions = conventions;
    this.errors = errors;
  }

  mergeConfig(overrides) {
    return this.config.mergeConfig(overrides);
  }
}

module.exports = new SharedKernel();
