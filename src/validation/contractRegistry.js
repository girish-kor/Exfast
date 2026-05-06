"use strict";

const schemaBuilder = require("./schemaBuilder");

class ContractRegistry {
  constructor() {
    this._contracts = new Map();
  }

  define(name, schema) {
    const validate = schemaBuilder.build(schema);
    this._contracts.set(name, validate);
    return this;
  }

  get(name) {
    if (!this._contracts.has(name)) {
      throw new Error(`Contract not found: ${name}`);
    }
    return this._contracts.get(name);
  }
}

module.exports = new ContractRegistry();
